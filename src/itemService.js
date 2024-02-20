import { deferred } from './deferred';
import { log } from './utils';
import {
	collection,
	deleteField,
	where,
	getDoc,
	query,
	setDoc,
	writeBatch,
	doc,
	deleteDoc,
	updateDoc,
	getDocs
} from 'firebase/firestore';

export const itemService = {
	async getItem(id) {
		var remoteDb = await window.db.getDb();
		return getDoc(doc(remoteDb, `items/${id}`))
			.then(doc => {
				return doc.data();
			})
			.catch(error => log(error));
	},

	/**
	 * Fetches all item ids of current user
	 * @param {boolean} shouldFetchLocally Should forcefully fetch locally?
	 */
	async getUserItemIds(shouldFetchLocally) {
		if (window.user && !shouldFetchLocally) {
			return new Promise(resolve => {
				resolve(window.user.items || {});
			});
		}
		return new Promise(resolve => {
			db.local.get('items', result => {
				resolve(result.items || {});
			});
		});
	},

	/**
	 * Fetches all items.
	 * @param {boolean} shouldFetchLocally Should forcefully fetch locally?
	 */
	async getAllItems(shouldFetchLocally) {
		var t = Date.now();
		var d = deferred();
		let itemIds = await this.getUserItemIds(shouldFetchLocally);
		itemIds = Object.getOwnPropertyNames(itemIds || {});
		// log('itemids', itemIds);

		if (!itemIds.length) {
			d.resolve([]);
		}
		const items = [];

		if (window.user && !shouldFetchLocally) {
			var remoteDb = await window.db.getDb();
			// console.log(query, window.user.uid);
			// d.resolve([]);

			const q = query(
				collection(remoteDb, 'items'),
				where('createdBy', '==', window.user.uid)
			);
			getDocs(q)
				.then(querySnapshot => {
					querySnapshot.forEach(doc => {
						items.push(doc.data());
					});
					log(`${items.length} items fetched in `, Date.now() - t, 'ms');
					d.resolve(items);
				})
				.catch(() => {
					d.resolve([]);
				});
		} else {
			for (let i = 0; i < itemIds.length; i++) {
				/* eslint-disable no-loop-func */
				window.db.local.get(itemIds[i], itemResult => {
					items.push(itemResult[itemIds[i]]);
					// Check if we have all items now.
					if (itemIds.length === items.length) {
						d.resolve(items);
					}
				});

				/* eslint-enable no-loop-func */
			}
		}
		return d.promise;
	},

	async setUser() {
		const remoteDb = await window.db.getDb();
		return setDoc(doc(remoteDb, `users/${window.user.uid}`), {
			items: {}
		});
	},

	async setItem(id, item) {
		const d = deferred();
		log(`Starting to save item "${id}"`);

		// Always persist in `code` key for `preserveLastOpenItem` setting.
		// This key is used to retrieve content of last open item.
		db.local.set({ code: item }, () => {});
		if (id === 'code') {
			return Promise.resolve();
		}

		// NOT LOGGED IN
		if (!window.user) {
			const obj = {
				[id]: item
			};
			db.local.set(obj, () => {
				d.resolve();
			});
			return d.promise;
		}

		// LOGGED IN
		var remoteDb = await window.db.getDb();
		item.createdBy = window.user.uid;
		setDoc(doc(remoteDb, `items/${id}`), item, {
			merge: true
		})
			.then(() => {
				log(`Document written`);
				d.resolve();
			})
			.catch(d.reject);

		// logged in but offline, we resolve immediately so
		// that you see the feedback msg immediately and not wait for
		// later sync.
		if (!navigator.onLine) return Promise.resolve();
		return d.promise;
	},

	/**
	 * Saves the passed items in the database.
	 * @param {Array} items to be saved in DB
	 */
	saveItems(items) {
		var d = deferred();
		// When not logged in
		if (!window.user) {
			// save new items
			window.db.local.set(items, d.resolve);
			// Push in new item IDs
			window.db.local.get(
				{
					items: {}
				},
				function (result) {
					/* eslint-disable guard-for-in */
					for (var id in items) {
						result.items[id] = true;
					}
					window.db.local.set({
						items: result.items
					});
					/* eslint-enable guard-for-in */
				}
			);
		} else {
			window.db.getDb().then(remoteDb => {
				const batch = writeBatch(remoteDb);
				/* eslint-disable guard-for-in */
				for (var id in items) {
					items[id].createdBy = window.user.uid;
					batch.set(doc(remoteDb, `items/${id}`), items[id]);
					batch.update(doc(remoteDb, `users/${window.user.uid}`), {
						[`items.${id}`]: true
					});
					batch.update(doc(remoteDb, `users/${window.user.uid}`), {
						[`items.${id}`]: true
					});
					// Set these items on our cached user object too
					window.user.items = window.user.items || {};
					window.user.items[id] = true;
				}
				batch.commit().then(d.resolve);
				/* eslint-enable guard-for-in */
			});
		}
		return d.promise;
	},

	async removeItem(id) {
		// When not logged in
		if (!window.user) {
			var d = deferred();
			window.db.local.remove(id, d.resolve);
			return d.promise;
		}
		const remoteDb = await window.db.getDb();
		log(`Starting to save item ${id}`);
		return deleteDoc(doc(remoteDb, `items/${id}`))
			.then(() => {
				log('Document removed');
			})
			.catch(error => log(error));
	},

	async setItemForUser(itemId) {
		// When not logged in
		if (!window.user) {
			return window.db.local.get(
				{
					items: {}
				},
				function (result) {
					result.items[itemId] = true;
					window.db.local.set({
						items: result.items
					});
				}
			);
		}
		const remoteDb = await window.db.getDb();
		return updateDoc(doc(remoteDb, `users/${window.user.uid}`), {
			[`items.${itemId}`]: true
		})
			.then(arg => {
				log(`Item ${itemId} set for user`, arg);
				window.user.items = window.user.items || {};
				window.user.items[itemId] = true;
			})
			.catch(error => log(error));
	},

	async unsetItemForUser(itemId) {
		// When not logged in
		if (!window.user) {
			return window.db.local.get(
				{
					items: {}
				},
				function (result) {
					delete result.items[itemId];
					window.db.local.set({
						items: result.items
					});
				}
			);
		}
		const remoteDb = await window.db.getDb();
		return updateDoc(doc(remoteDb, `users/${window.user.uid}`), {
			[`items.${itemId}`]: deleteField()
		})
			.then(arg => {
				log(`Item ${itemId} unset for user`, arg);
				delete window.user.items[itemId];
			})
			.catch(error => log(error));
	},

	async getCountOfFileModeItems() {
		const items = await this.getAllItems();
		return items.reduce((count, item) => {
			if (item.files) return count + 1;
			return count;
		}, 0);
	}
};
