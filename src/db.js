(() => {
	const FAUX_DELAY = 1;

	var db;
	var dbPromise;

	async function getDb() {
		if (dbPromise) {
			return dbPromise;
		}
		dbPromise = new Promise((resolve, reject) => {
			if (db) {
				return resolve(db);
			}
			firebase
				.firestore()
				.enablePersistence()
				.then(function() {
					// Initialize Cloud Firestore through firebase
					db = firebase.firestore();
					console.log('firebase db ready', db);
					resolve(db);
				})
				.catch(function(err) {
					reject(err.code);
					if (err.code === 'failed-precondition') {
						// Multiple tabs open, persistence can only be enabled
						// in one tab at a a time.
						// ...
					} else if (err.code === 'unimplemented') {
						// The current browser does not support all of the
						// features required to enable persistence
						// ...
					}
				});
		});
		return dbPromise;
	}

	var local = {
		get: (obj, cb) => {
			const retVal = {};
			if (typeof obj === 'string') {
				retVal[obj] = JSON.parse(window.localStorage.getItem(obj));
				setTimeout(() => cb(retVal), FAUX_DELAY);
			} else {
				Object.keys(obj).forEach(key => {
					const val = window.localStorage.getItem(key);
					retVal[key] =
						val === undefined || val === null ? obj[key] : JSON.parse(val);
				});
				setTimeout(() => cb(retVal), FAUX_DELAY);
			}
		},
		set: (obj, cb) => {
			Object.keys(obj).forEach(key => {
				window.localStorage.setItem(key, JSON.stringify(obj[key]));
			});
			setTimeout(() => {
				if (cb) {
					cb();
				}
			}, FAUX_DELAY);
		}
	};
	window.db = {
		getDb,
		local: chrome && chrome.storage ? chrome.storage.local : local,
		sync: chrome && chrome.storage ? chrome.storage.sync : local
	};
})();
