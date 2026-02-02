# Saving and Resuming Creations in Web-Maker

This document provides a comprehensive technical analysis of how creations are saved, loaded, and resumed in Web-Maker across all scenarios.

## Table of Contents

1. [Storage Strategy Overview](#storage-strategy-overview)
2. [Data Structures](#data-structures)
3. [Save Flow](#save-flow)
4. [Load/Resume Flow](#loadresume-flow)
5. [Logged In vs Logged Out Behavior](#logged-in-vs-logged-out-behavior)
6. [New vs Existing Creations](#new-vs-existing-creations)
7. [Auto-Save Functionality](#auto-save-functionality)
8. [Firebase/Cloud Sync](#firebasecloud-sync)
9. [Local Storage Mechanism](#local-storage-mechanism)
10. [Startup Decision Tree](#startup-decision-tree)
11. [Edge Cases & Special Behaviors](#edge-cases--special-behaviors)
12. [Complete Flow Diagrams](#complete-flow-diagrams)

---

## Storage Strategy Overview

Web-Maker uses a dual storage strategy:

| Storage Type      | Purpose                                                              | When Used                                                     |
| ----------------- | -------------------------------------------------------------------- | ------------------------------------------------------------- |
| **Local Storage** | Browser's `localStorage` (web) or `chrome.storage.local` (extension) | Always - as primary for logged-out, as fallback for logged-in |
| **Cloud Storage** | Firebase Firestore                                                   | Only when user is logged in                                   |

### Key Files Involved

- `src/itemService.js` - Core save/load operations
- `src/db.js` - Storage abstraction layer
- `src/components/app.jsx` - Application state management
- `src/firebaseInit.js` - Firebase/Firestore initialization
- `src/auth.js` - Authentication handling

---

## Data Structures

### Item Object (Complete Structure)

```javascript
{
  // Identity
  id: "random-uuid",                    // Only set on first save
  createdBy: "firebase-uid",            // Set when saving if logged in
  createdOn: 1234567890,                // Timestamp on creation
  updatedOn: 1234567890,                // Updated on each save

  // Metadata
  title: "My Creation",
  isPublic: false,                      // For public sharing

  // Content (3-pane mode)
  html: "<div>...</div>",
  css: "body { ... }",
  js: "console.log(...)",
  externalLibs: { js: "url1\nurl2", css: "url1" },

  // Preprocessor Modes
  htmlMode: "html",                     // "html" | "pug" | "markdown" | "nunjucks"
  cssMode: "css",                       // "css" | "scss" | "less" | "acss" | "sass"
  jsMode: "js",                         // "js" | "typescript" | "babel" | "coffeescript"
  htmlSettings?: { acssConfig: {...} }, // Optional preprocessor settings
  cssSettings?: { acssConfig: {...} },

  // UI Layout
  layoutMode: 2,                        // 1-5 representing different split layouts
  mainSizes: ["50%", "50%"],            // Code/preview pane sizes
  sizes: ["33.33%", "33.33%", "33.33%"], // HTML/CSS/JS pane sizes

  // File Mode (mutually exclusive with html/css/js above)
  files: [                              // Only present in file mode
    { name: 'index.html', content: '...' },
    { name: 'styles', isFolder: true, children: [...], isCollapsed: true },
    { name: 'script.js', content: '...' }
  ]
}
```

### User Document Structure (Firestore)

```
users/{userId}
├─ items: { itemId1: true, itemId2: true, ... }
├─ settings: { ... }
├─ lastSeenVersion: "6.5.0"
├─ displayName: "John Doe"
├─ photoURL: "..."
└─ isPro: boolean
```

### LocalStorage Keys

| Key                       | Content                          | Purpose                                 |
| ------------------------- | -------------------------------- | --------------------------------------- |
| `code`                    | Full item object                 | Preserves last opened item for recovery |
| `itemId1`, `itemId2`, ... | Full item objects                | Individual saved creations              |
| `items`                   | `{itemId1: true, itemId2: true}` | Index of all saved item IDs             |
| `user`                    | User object                      | Cached authentication user              |
| `layoutMode`              | Number 1-5                       | Last used layout                        |
| `lastSeenVersion`         | "6.5.0"                          | For changelog notifications             |

---

## Save Flow

### Logged Out Users

```
User clicks Save (Ctrl+S)
    ↓
saveItem() in app.jsx
    ↓
Shows confirmation warning (first time)
    ↓
saveCode()
    ↓
itemService.setItem(id, item)
    ↓
db.local.set(item)
    ↓
window.localStorage.setItem(key, JSON.stringify(item))
```

### Logged In Users

```
User clicks Save (Ctrl+S)
    ↓
saveItem() in app.jsx
    ↓
saveCode()
    ↓
itemService.setItem(id, item)
    ├─> Always: db.local.set({ code: item })  // Safety backup
    └─> Also: setDoc(doc(firestore, `items/${id}`), item, { merge: true })
        ├─> item.createdBy = window.user.uid
        └─> Updates Firestore with merge option
```

### Key Code Reference

See `itemService.js:103-142` for the core `setItem` implementation:

- Always saves to `code` key locally (preserves unsaved work)
- If ID is `code`, returns after local save
- For logged-in users, saves to Firestore with merge option
- Handles offline gracefully - returns immediately to avoid UI freeze

---

## Load/Resume Flow

### Startup Sequence (app.jsx componentWillMount)

1. Load last code + settings from local storage

   ```javascript
   db.local.get({ layoutMode: 1, code: '' });
   ```

2. Check `preserveLastCode` setting

   ```javascript
   db.getSettings(this.defaultSettings).then(result => {...})
   ```

3. Determine which item to load (priority order):
   - **URL params exist** (html/css) → Load from query parameters, prettify
   - **itemId in route** (/create/itemId) → Fetch from Firestore
   - **preserveLastCode enabled + lastCode exists** → Load from 'code' key
   - **Otherwise** → Create new item

### Load by Route ID

When URL contains an item ID (e.g., `/create/abc123`):

```javascript
window.db.fetchItem(this.props.itemId)
    ↓
getDoc(doc(db, `items/${itemId}`))
    ↓
setCurrentItem(item)
```

### Load from Local Recovery

When loading last session's work:

```javascript
db.local.get({ code: '' })
    ↓
if (preserveLastCode && lastCode) {
    setCurrentItem(lastCode)
}
```

---

## Logged In vs Logged Out Behavior

### Logged Out Users

| Aspect            | Behavior                                            |
| ----------------- | --------------------------------------------------- |
| **Save location** | Only localStorage via `db.local.set()`              |
| **Load source**   | Only localStorage                                   |
| **Item tracking** | `{ items: {id1: true, id2: true} }` in localStorage |
| **Limitation**    | Work stays on single machine/browser                |
| **Warning**       | Shows confirmation before first save                |
| **Recovery**      | `code` key preserves last opened item               |

### Logged In Users

| Aspect            | Behavior                                             |
| ----------------- | ---------------------------------------------------- |
| **Save location** | Both localStorage AND Firestore                      |
| **Load source**   | Firestore (falls back to local if offline)           |
| **Item tracking** | `users/{uid}/items: { id1: true, ... }` in Firestore |
| **Sync**          | Automatic via Firestore persistent cache             |
| **Multi-tab**     | Changes sync across browser tabs                     |
| **Migration**     | On login, prompts to import local items              |

---

## New vs Existing Creations

### Creating New Creations

```javascript
createNewItem(isFileMode = false, files) {
  // Generate title with date/time: "Untitled 5-12-14:30"
  item = {
    title: "Untitled " + date.getDate() + "-" + (date.getMonth() + 1) +
           "-" + date.getHours() + ":" + date.getMinutes(),
    createdOn: +date,
    content: '',
    html: '', css: '', js: '',
    externalLibs: { js: '', css: '' },
    layoutMode: currentLayoutMode
  }

  setCurrentItem(item)
  customRoute('/create')
  // Note: No ID yet! ID is generated on first save
}
```

### First Save of New Item

```javascript
var isNewItem = !this.state.currentItem.id;
this.state.currentItem.id = this.state.currentItem.id || generateRandomId();

if (isNewItem) {
	itemService.setItemForUser(this.state.currentItem.id);
	// Adds to users/{uid}/items.${id}: true
}
```

### Editing Existing Creations

- Already have an `id` field
- Can be edited and saved (updates `updatedOn` timestamp)
- Can be deleted via `itemService.removeItem()` and `itemService.unsetItemForUser()`
- Can be forked (creates copy without ID, becomes new item on save)

---

## Auto-Save Functionality

### Configuration

```javascript
this.AUTO_SAVE_INTERVAL = 15000; // 15 seconds
```

### Auto-Save Loop

```javascript
autoSaveLoop() {
  if (this.isAutoSavingEnabled && this.state.unsavedEditCount) {
    this.saveItem()
  }
}
```

### Enabling Auto-Save

```javascript
if (prefs.autoSave) {
	if (!this.autoSaveInterval) {
		this.autoSaveInterval = setInterval(() => {
			this.autoSaveLoop();
		}, this.AUTO_SAVE_INTERVAL);
	}
}
```

### Behavior

- **Trigger**: `autoSave: true` in preferences (default enabled)
- **Activation**: First save of an item activates it (`isAutoSavingEnabled = true`)
- **Frequency**: Runs every 15 seconds if there are unsaved changes
- **Detection**: `unsavedEditCount > 0` triggers save
- **Continuous**: `saveCode('code')` called after setCurrentItem with 2-second delay

---

## Firebase/Cloud Sync

### Firestore Configuration

```javascript
// firebaseInit.js
const db = initializeFirestore(app, {
	localCache: persistentLocalCache({
		tabManager: persistentMultipleTabManager() // Multi-tab sync!
	})
});
```

### Cloud Save Flow

```
saveItem()
    ├─ Generate ID if new: generateRandomId()
    ├─ Prevent saving items created by others (fork them instead)
    └─ itemService.setItem(id, item)
        ├─ Always: db.local.set({ code: item })
        └─ If logged in: setDoc(doc(firestore, `items/${id}`), item, { merge: true })
            ├─ Set createdBy = window.user.uid
            └─ Use merge: true for partial updates
```

### Loading from Cloud

```javascript
itemService.getAllItems()
    ├─ If logged in: Query Firestore
    │   └─ query(collection(db, 'items'), where('createdBy', '==', window.user.uid))
    └─ If logged out: Load from localStorage
        └─ db.local.get('items') → Load each item by ID
```

### Offline Handling

- Firestore persistent cache handles offline saves automatically
- Shows alert: "Item saved locally. Will save to account when you are online"
- Uses `navigator.onLine` check to avoid waiting for response

### Import Conflict Resolution

When user logs in with existing local items:

1. Detects ID conflict (same ID, different `createdBy`)
2. Calls `refreshItemIds()` to generate new UUIDs
3. Re-saves with new IDs
4. Updates user's items map with new IDs

---

## Local Storage Mechanism

### Storage Abstraction (db.js)

```javascript
// Web apps use window.localStorage
const local = {
	get: (obj, cb) => {
		const retVal = {};
		if (typeof obj === 'string') {
			retVal[obj] = JSON.parse(window.localStorage.getItem(obj));
		} else {
			Object.keys(obj).forEach(key => {
				const val = window.localStorage.getItem(key);
				retVal[key] = val === null ? obj[key] : JSON.parse(val);
			});
		}
		setTimeout(() => cb(retVal), 1); // Fake async for consistency
	},
	set: (obj, cb) => {
		Object.keys(obj).forEach(key => {
			window.localStorage.setItem(key, JSON.stringify(obj[key]));
		});
		setTimeout(() => {
			cb && cb();
		}, 1);
	},
	remove: (key, cb) => {
		window.localStorage.removeItem(key);
		setTimeout(() => cb(), 1);
	}
};

// Extension uses chrome.storage.local (same API pattern)
const dbLocalAlias = chrome && chrome.storage ? chrome.storage.local : local;
const dbSyncAlias = chrome && chrome.storage ? chrome.storage.sync : local;
```

### Storage Limits

| Platform  | Storage Type         | Limit     |
| --------- | -------------------- | --------- |
| Web App   | localStorage         | 5-10MB    |
| Extension | chrome.storage.local | ~10MB     |
| Extension | chrome.storage.sync  | ~100KB    |
| Cloud     | Firestore            | Unlimited |

---

## Startup Decision Tree

```
┌─────────────────────────────────────┐
│       componentWillMount()          │
└─────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────┐
│ Load settings & last code from      │
│ localStorage                        │
└─────────────────────────────────────┘
                  ↓
        ┌─────────────────┐
        │ URL has params? │
        │ (html/css)      │
        └─────────────────┘
         │              │
        YES            NO
         ↓              ↓
    Load from     ┌─────────────────┐
    params &      │ Route has itemId?│
    setCurrentItem│ (/create/abc123) │
         │        └─────────────────┘
         │         │              │
         │        YES            NO
         │         ↓              ↓
         │    Fetch from    ┌─────────────────┐
         │    Firestore &   │ preserveLastCode │
         │    setCurrentItem│ && lastCode?     │
         │         │        └─────────────────┘
         │         │         │              │
         │         │        YES            NO
         │         │         ↓              ↓
         │         │    Load from     createNewItem()
         │         │    localStorage
         │         │    'code' key
         │         │         │              │
         └─────────┴─────────┴──────────────┘
                           ↓
                  Item is now loaded
                           ↓
              Auto-save 'code' key after 2s
```

---

## Edge Cases & Special Behaviors

### 1. Login with Local Items (Migration)

When a user logs in and has local items from previous sessions:

- System asks if user wants to import local creations
- Decision stored in `localStorage[ASKED_TO_IMPORT_CREATIONS]`
- Calls `mergeImportedItems()` which avoids duplicates
- If conflict (ID exists), offers to replace or skip

### 2. Forking Items

When forking another user's creation:

```javascript
// Copies item, removes ownership data
delete item.id;
delete item.createdBy;
delete item.isPublic;
item.title = '(Forked) ' + item.title;
item.updatedOn = Date.now();
// Becomes new item on first save
```

### 3. Unsaved Changes Warning

Shows warning dialog if `unsavedEditCount > 0` when:

- Creating new item
- Loading different item
- Logging out
- User can dismiss and lose changes

### 4. File Mode Items Limit

- Free users limited to 2 file-mode creations
- Checked via `itemService.getCountOfFileModeItems()`
- Shows "files limit" modal for non-Pro users

### 5. Preventing Overwrite of Others' Items

```javascript
// In saveItem()
if (item.createdBy && item.createdBy !== window.user.uid) {
	// Cannot save - must fork instead
	alert("You cannot save changes to someone else's creation. Fork it first.");
}
```

---

## Complete Flow Diagrams

### Save Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                USER CREATES/EDITS CREATION                   │
└─────────────────────────────────────────────────────────────┘
                              ↓
    ┌──────────────────────────────────────────┐
    │ Code changes increment unsavedEditCount   │
    │ UI shows "unsaved" indicator             │
    └──────────────────────────────────────────┘
                              ↓
              ┌───────────────────────────┐
              │ User clicks Save (Ctrl+S) │
              └───────────────────────────┘
                              ↓
    ┌─────────────────────────────────────┐
    │     saveItem() is called            │
    │  ├─ Generate ID if new              │
    │  ├─ Call saveCode()                 │
    │  └─ Call itemService.setItem()      │
    └─────────────────────────────────────┘
                              ↓
        ┌───────────────────────────────────┐
        │   Is user logged in?              │
        └───────────────────────────────────┘
         │                                   │
         NO                                 YES
         ↓                                   ↓
    ┌────────────┐              ┌──────────────────────┐
    │ Save to:   │              │ Save to:             │
    │ local:     │              │ 1. localStorage      │
    │ - code     │              │ 2. Firestore items   │
    │ - itemId   │              │ 3. Update user/items │
    │ - items[]  │              │ 4. Handle offline    │
    └────────────┘              └──────────────────────┘
         │                                   │
         └───────────────────────────────────┘
                              ↓
            ┌──────────────────────────────┐
            │ Show "Item saved" alert      │
            │ Reset unsavedEditCount to 0  │
            │ Start auto-save loop if on   │
            └──────────────────────────────┘
```

### Load Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│              USER OPENS SAVED CREATIONS                      │
└─────────────────────────────────────────────────────────────┘
                              ↓
            ┌────────────────────────────┐
            │ Click Open button (Ctrl+O) │
            └────────────────────────────┘
                              ↓
            ┌────────────────────────────┐
            │  openSavedItemsPane()      │
            │  Set isFetchingItems=true  │
            └────────────────────────────┘
                              ↓
            ┌────────────────────────────┐
            │  fetchItems()              │
            │  itemService.getAllItems() │
            └────────────────────────────┘
                              ↓
        ┌───────────────────────────────────┐
        │   Is user logged in?              │
        └───────────────────────────────────┘
         │                                   │
         NO                                 YES
         ↓                                   ↓
    ┌────────────┐              ┌──────────────────┐
    │ Load from: │              │ Query Firestore: │
    │ 1. items[] │              │ where createdBy  │
    │ 2. Load    │              │ == user.uid      │
    │    each    │              │ Returns docs     │
    │    itemId  │              └──────────────────┘
    │ from local │                         │
    └────────────┘                         │
         │                                 │
         └─────────────────────────────────┘
                              ↓
            ┌────────────────────────────┐
            │ SavedItemPane shows items  │
            │ User clicks item to open   │
            └────────────────────────────┘
                              ↓
            ┌────────────────────────────┐
            │  openItem(item)            │
            │  setCurrentItem(item)      │
            │  route('/create/{id}')     │
            └────────────────────────────┘
```

---

## Summary

### Persistence Strategy

| Context                | Primary Storage      | Backup               | Sync              |
| ---------------------- | -------------------- | -------------------- | ----------------- |
| Web App (logged out)   | localStorage         | -                    | None              |
| Web App (logged in)    | Firestore            | localStorage         | Via Firestore SDK |
| Extension (logged out) | chrome.storage.local | -                    | None              |
| Extension (logged in)  | Firestore            | chrome.storage.local | Via Firestore SDK |

### Recovery Mechanisms

1. **`code` key**: Last opened item always preserved locally
2. **`items` index**: Can browse all saved items
3. **Cloud backup**: All items synced to Firestore for logged-in users
4. **Multi-tab sync**: Changes visible across browser tabs (Firestore)

### Key Takeaways

- Local storage provides immediate, offline-first saving
- Cloud sync adds backup and cross-device access for logged-in users
- The `code` key acts as a safety net for unsaved work
- Auto-save runs every 15 seconds when enabled
- New items don't get IDs until first explicit save
- Forking creates copies that become new items
