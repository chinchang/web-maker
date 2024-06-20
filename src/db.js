// import './firebaseInit';
import 'firebase/firestore';
import { db } from './firebaseInit';
import {
	getDoc,
	getDocs,
	doc,
	updateDoc,
	setDoc,
	where,
	collection,
	getCountFromServer,
	query
} from 'firebase/firestore';
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

	function getDb() {
		log('Initializing firestore');
		return db;
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
			updateDoc(doc(db, `users/${window.user.uid}`), {
				lastSeenVersion: version
			});
		}
	}

	async function getUser(userId) {
		return getDoc(doc(db, `users/${userId}`)).then(doc => {
			if (!doc.exists()) {
				// return setDoc(doc(db, `users/${userId}`), {}, { merge: true });
				return {};
			}

			const user = doc.data();
			// Object.assign(window.user, user);
			return user;
		});
	}

	async function fetchItem(itemId) {
		return getDoc(doc(db, `items/${itemId}`)).then(doc => {
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
		const q = query(
			collection(db, 'items'),
			where('createdBy', '==', userId),
			where('isPublic', '==', true)
		);
		const snapshot = await getCountFromServer(q);
		return snapshot.data().count;
	}

	async function getUserSubscriptionEvents(userId) {
		const q = query(
			collection(db, 'subscriptions'),
			where('userId', '==', userId)
		);

		return getDocs(q).then(getArrayFromQuerySnapshot);
	}

	async function updateUserSetting(userId, settingName, settingValue) {
		return updateDoc(doc(db, `users/${userId}`), {
			[`settings.${settingName}`]: settingValue
		});
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
		updateUserSetting,
		local: dbLocalAlias,
		sync: dbSyncAlias
	};
})();
