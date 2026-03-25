const DB_NAME = 'webmaker-local-assets';
const STORE_NAME = 'assets';
const DB_VERSION = 1;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

function openDB() {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION);
		request.onupgradeneeded = e => {
			const db = e.target.result;
			if (!db.objectStoreNames.contains(STORE_NAME)) {
				db.createObjectStore(STORE_NAME, { keyPath: 'name' });
			}
		};
		request.onsuccess = e => resolve(e.target.result);
		request.onerror = e => reject(e.target.error);
	});
}

export async function getAllAssets() {
	const db = await openDB();
	return new Promise((resolve, reject) => {
		const tx = db.transaction(STORE_NAME, 'readonly');
		const store = tx.objectStore(STORE_NAME);
		const request = store.getAll();
		request.onsuccess = () => resolve(request.result);
		request.onerror = e => reject(e.target.error);
	});
}

export async function addAsset(file) {
	if (file.size > MAX_FILE_SIZE) {
		throw new Error(`File size exceeds 5MB limit`);
	}

	const db = await openDB();

	// Check for duplicate name
	const existing = await new Promise((resolve, reject) => {
		const tx = db.transaction(STORE_NAME, 'readonly');
		const request = tx.objectStore(STORE_NAME).get(file.name);
		request.onsuccess = () => resolve(request.result);
		request.onerror = e => reject(e.target.error);
	});

	let name = file.name;
	if (existing) {
		const ext = name.lastIndexOf('.');
		const base = ext !== -1 ? name.slice(0, ext) : name;
		const extStr = ext !== -1 ? name.slice(ext) : '';
		let counter = 2;
		name = `${base}-${counter}${extStr}`;
		// Keep incrementing until we find a unique name
		const allAssets = await getAllAssets();
		const names = new Set(allAssets.map(a => a.name));
		while (names.has(name)) {
			counter++;
			name = `${base}-${counter}${extStr}`;
		}
	}

	const blob = file.slice(0, file.size, file.type);

	return new Promise((resolve, reject) => {
		const tx = db.transaction(STORE_NAME, 'readwrite');
		const store = tx.objectStore(STORE_NAME);
		const asset = { name, blob, type: file.type };
		const request = store.put(asset);
		request.onsuccess = () => resolve(asset);
		request.onerror = e => reject(e.target.error);
	});
}

export async function removeAsset(name) {
	const db = await openDB();
	return new Promise((resolve, reject) => {
		const tx = db.transaction(STORE_NAME, 'readwrite');
		const request = tx.objectStore(STORE_NAME).delete(name);
		request.onsuccess = () => resolve();
		request.onerror = e => reject(e.target.error);
	});
}

export const LOCAL_ASSET_PREFIX = '/local/';
