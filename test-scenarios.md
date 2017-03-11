## Editor

- Tab should insert tab when nothing selected,
- Tab should indent when something is selected.

## Logic

- `for`, `while` & `dowhile` loops should be instrumented in the generated JavaScript code.
- Import should confirm the overriding of existing items.
- Opening a smaller DOM item shouldn't show  left over HTML from a previously open bigger DOM item.

## Interface

- 'New' button should create a new item if no unsaved changes present, otherwise ask confirmation.
- 'Save' button click should save the current work with a notification.
- Ctrl/Cmd+S should save the current work with a notification.
- 'Open' button click should open saved creations panel.
- Ctrl/Cmd+O should open saved creations panel.
- Clicking on an item in saved items pane should open that item in the editor.
- Clicking the close button in the saved item tile should confirm first, and then remove that item from DOM & storage.
- If the item being removed is open in the editor, a new item should be created & opened after removal.
- Clicking the *export* button should download a JSON formatted export file of saved items.
- Clicking on *import* button should ask to select a JSON file to import.

## Settings

- Each setting change should update the corresponding key in chrome sync storage
- Changing fontSize, theme should reflect in the editor as soon as it is changed and focused out.
