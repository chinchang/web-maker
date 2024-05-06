// import './firebaseInit';
import 'firebase/firestore';
import { db } from './firebaseInit';
import { getDoc, getDocs, doc, updateDoc, setDoc } from 'firebase/firestore';
import { deferred } from './deferred';
import { trackEvent } from './analytics';
import { log } from './utils';

/**
 * Converts a firestore query snapshot into native array
 * @param {snapshot} querySnapshot Snapshot object returned by a firestore query
 */
function getArrayFromQuerySnapshot(querySnapshot) {
	const arr = [];
	querySnapshot.forEach(doc => {
		// doc.data() has to be after doc.id because docs can have `id` key in them which
		// should override the explicit `id` being set
		arr.push({
			id: doc.id,
			...doc.data()
		});
		//   documentCache[doc.id] = doc.data()
	});
	return arr;
}

(() => {
	const FAUX_DELAY = 1;

	// var db;
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
		},
		remove: (key, cb) => {
			window.localStorage.removeItem(key);
			setTimeout(() => cb(), FAUX_DELAY);
		}
	};
	const dbLocalAlias = chrome && chrome.storage ? chrome.storage.local : local;
	const dbSyncAlias = chrome && chrome.storage ? chrome.storage.sync : local;

	async function getDb() {
		if (dbPromise) {
			return dbPromise;
		}
		log('Initializing firestore');
		dbPromise = new Promise((resolve, reject) => {
			if (db) {
				return resolve(db);
			}
			const firestoreInstance = db;

			return firestoreInstance
				.enablePersistence({ experimentalTabSynchronization: true })
				.then(function () {
					// Initialize Cloud Firestore through firebase
					// db = firebase.firestore();
					// const settings = {
					// 	timestampsInSnapshots: true
					// };
					// db.settings(settings);
					log('firebase db ready', db);
					resolve(db);
				})
				.catch(function (err) {
					reject(err.code);
					if (err.code === 'failed-precondition') {
						// Multiple tabs open, persistence can only be enabled
						// in one tab at a a time.
						alert(
							"Opening Web Maker web app in multiple tabs isn't supported at present and it seems like you already have it opened in another tab. Please use in one tab."
						);
						trackEvent('fn', 'multiTabError');
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
		// Setting the `lastSeenVersion` in localStorage(sync for extension) always
		// because next time we need to fetch it irrespective of the user being
		// logged in or out quickly from local storage.
		dbSyncAlias.set(
			{
				lastSeenVersion: version
			},
			function () {}
		);
		if (window.user) {
			const remoteDb = await getDb();
			updateDoc(doc(remoteDb, `users/${window.user.uid}`), {
				lastSeenVersion: version
			});
		}
	}

	async function getUser(userId) {
		const remoteDb = await getDb();

		return getDoc(doc(remoteDb, `users/${userId}`)).then(doc => {
			if (!doc.exists()) {
				// return setDoc(doc(remoteDb, `users/${userId}`), {}, { merge: true });
				return {};
			}

			const user = doc.data();
			// Object.assign(window.user, user);
			return user;
		});
	}

	async function fetchItem(itemId) {
		const remoteDb = await getDb();
		return remoteDb
			.doc(`items/${itemId}`)
			.get()
			.then(doc => {
				if (!doc.exists) return {};
				const data = doc.data();
				return data;
			});
	}

	// Fetch user settings.
	// This isn't hitting the remote db because remote settings
	// get fetch asynchronously (in user/) and update the envioronment.
	function getSettings(defaultSettings) {
		const d = deferred();
		// Will be chrome.storage.sync in extension environment,
		// otherwise will fallback to localstorage
		dbSyncAlias.get(defaultSettings, result => {
			d.resolve(result);
		});
		return d.promise;
	}

	async function getPublicItemCount(userId) {
		const remoteDb = await getDb();
		return remoteDb
			.collection('items')
			.where('createdBy', '==', userId)
			.where('isPublic', '==', true)
			.get()
			.then(snapShot => {
				return snapShot.size;
			});
	}

	async function getUserSubscriptionEvents(userId) {
		const remoteDb = await getDb();
		return remoteDb
			.collection('subscriptions')
			.where('userId', '==', userId)
			.get()
			.then(getArrayFromQuerySnapshot);
	}

	window.db = {
		getDb,
		getUser,
		getUserLastSeenVersion,
		setUserLastSeenVersion,
		getSettings,
		fetchItem,
		getPublicItemCount,
		getUserSubscriptionEvents,
		local: dbLocalAlias,
		sync: dbSyncAlias
	};
})();
