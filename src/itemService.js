import { deferred } from './deferred';
import { log } from 'util';
import firebase from 'firebase/app';

export const itemService = {
	async getItem(id) {
		var remoteDb = await window.db.getDb();
		return remoteDb
			.doc(`items/${id}`)
			.get()
			.then(doc => {
				return doc.data();
			});
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
		log('itemids', itemIds);

		if (!itemIds.length) {
			d.resolve([]);
		}
		const items = [];

		if (window.user && !shouldFetchLocally) {
			var remoteDb = await window.db.getDb();
			remoteDb
				.collection('items')
				.where('createdBy', '==', window.user.uid)
				.onSnapshot(
					function(querySnapshot) {
						querySnapshot.forEach(function(doc) {
							items.push(doc.data());
						});
						log('Items fetched in ', Date.now() - t, 'ms');

						d.resolve(items);
					},
					function() {
						d.resolve([]);
					}
				);
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
		return remoteDb.doc(`users/${window.user.uid}`).set({
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
		remoteDb
			.collection('items')
			.doc(id)
			.set(item, {
				merge: true
			})
			.then(arg => {
				log('Document written', arg);
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
				function(result) {
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
				const batch = remoteDb.batch();
				/* eslint-disable guard-for-in */
				for (var id in items) {
					items[id].createdBy = window.user.uid;
					batch.set(remoteDb.doc(`items/${id}`), items[id]);
					batch.update(remoteDb.doc(`users/${window.user.uid}`), {
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
		return remoteDb
			.collection('items')
			.doc(id)
			.delete()
			.then(arg => {
				log('Document removed', arg);
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
				function(result) {
					result.items[itemId] = true;
					window.db.local.set({
						items: result.items
					});
				}
			);
		}
		const remoteDb = await window.db.getDb();
		return remoteDb
			.collection('users')
			.doc(window.user.uid)
			.update({
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
				function(result) {
					delete result.items[itemId];
					window.db.local.set({
						items: result.items
					});
				}
			);
		}
		const remoteDb = await window.db.getDb();
		return remoteDb
			.collection('users')
			.doc(window.user.uid)
			.update({
				[`items.${itemId}`]: firebase.firestore.FieldValue.delete()
			})
			.then(arg => {
				delete window.user.items[itemId];
				log(`Item ${itemId} unset for user`, arg);
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
