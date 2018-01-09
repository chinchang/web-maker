(() => {
	const FAUX_DELAY = 1;

	var db;
	var dbPromise;

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
			/* eslint-disable consistent-return */
			setTimeout(() => {
				if (cb) {
					return cb();
				}
			}, FAUX_DELAY);
			/* eslint-enable consistent-return */
		}
	};
	const dbLocalAlias = chrome && chrome.storage ? chrome.storage.local : local;
	const dbSyncAlias = chrome && chrome.storage ? chrome.storage.sync : local;

	async function getDb() {
		if (dbPromise) {
			return dbPromise;
		}
		utils.log('Initializing firestore');
		dbPromise = new Promise((resolve, reject) => {
			if (db) {
				return resolve(db);
			}
			return firebase
				.firestore()
				.enablePersistence()
				.then(function() {
					// Initialize Cloud Firestore through firebase
					db = firebase.firestore();
					utils.log('firebase db ready', db);
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

	async function getUserLastSeenVersion() {
		const d = deferred();
		// Will be chrome.storage.sync in extension environment,
		// otherwise will fallback to localstorage
		dbSyncAlias.get(
			{
				lastSeenVersion: ''
			},
			result => {
				d.resolve(result.lastSeenVersion);
			}
		);
		return d.promise;
		// Might consider getting actual value from remote db.
		// Not critical right now.
	}

	async function setUserLastSeenVersion(version) {
		if (window.IS_EXTENSION) {
			chrome.storage.sync.set(
				{
					lastSeenVersion: version
				},
				function() {}
			);
			return;
		}
		// Settings the lastSeenVersion in localStorage also because next time we need
		// to fetch it irrespective of the user being logged in or out
		local.set({ lastSeenVersion: version });
		if (window.user) {
			const remoteDb = await getDb();
			remoteDb
				.doc(`users/${window.user.uid}`)
				.update({ lastSeenVersion: version });
		}
	}

	async function getUser(userId) {
		const remoteDb = await getDb();
		return remoteDb.doc(`users/${userId}`).get().then(doc => {
			if (!doc.exists)
				return remoteDb.doc(`users/${userId}`).set({}, { merge: true });
			const user = doc.data();
			Object.assign(window.user, user);
			return user;
		});
	}

	function getSettings(defaultSettings) {
		const d = deferred();
		// Will be chrome.storage.sync in extension environment,
		// otherwise will fallback to localstorage
		dbSyncAlias.get(defaultSettings, result => {
			d.resolve(result);
		});
		return d.promise;
	}

	window.db = {
		getDb,
		getUser,
		getUserLastSeenVersion,
		setUserLastSeenVersion,
		getSettings,
		local: dbLocalAlias,
		sync: dbSyncAlias
	};
})();
