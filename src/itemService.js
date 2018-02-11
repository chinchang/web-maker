(() => {
	window.itemService = {
		async getItem(id) {
			var remoteDb = await window.db.getDb();
			return remoteDb
				.doc(`items/${id}`)
				.get()
				.then(doc => {
					return doc.data();
				});
		},
		async getUserItemIds() {
			if (window.user) {
				return new Promise(resolve => {
					resolve(window.user.items || {});
				});
			}
			var remoteDb = await window.db.getDb();
			return remoteDb
				.doc(`users/${window.user.uid}`)
				.get()
				.then(doc => {
					if (!doc.exists) {
						return {};
					}
					return doc.data().items;
				});
		},

		async getAllItems() {
			var t=Date.now()
			var d = deferred();
			let itemIds = await this.getUserItemIds();
			itemIds = Object.getOwnPropertyNames(itemIds || {});
			utils.log('itemids', itemIds);

			if (!itemIds.length) {
				d.resolve([]);
			}
			var remoteDb = await window.db.getDb();
			const items = [];
			remoteDb
				.collection('items')
				.where('createdBy', '==', window.user.uid)
				.onSnapshot(function(querySnapshot) {
					querySnapshot.forEach(function(doc) {
						items.push(doc.data());
					});
					utils.log('Items fetched in ', Date.now()-t, 'ms')

					d.resolve(items);
				}, function() {
					d.resolve([])
				});
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
			var remotePromise;
			// TODO: check why we need to save locally always?
			const obj = {
				[id]: item
			};
			db.local.set(obj, () => {
				// Is extension OR is app but logged out OR is logged in but offline
				// If logged in but offline, resolve immediately so
				// that you see the feedback msg immediately and not wait for
				// later sync.
				if (window.IS_EXTENSION || !window.user || !navigator.onLine) {
					d.resolve();
				}
			});

			// If `id` is `code`, this is a call on unloadbefore to save the last open thing.
			// Do not presist that on remote.
			if (id === 'code') {
				// No deferred required here as this gets called on unloadbefore
				return false;
			}
			if (window.user) {
				var remoteDb = await window.db.getDb();
				utils.log(`Starting to save item ${id}`);
				item.createdBy = window.user.uid;
				remotePromise = remoteDb
					.collection('items')
					.doc(id)
					.set(item, {
						merge: true
					})
					.then(arg => {
						utils.log('Document written', arg);
						d.resolve();
					})
					.catch(d.reject);
			}

			return window.user && navigator.onLine ? remotePromise : d.promise;
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
				db.local.remove(id, d.resolve);
				return d.promise;
			}
			const remoteDb = await window.db.getDb();
			utils.log(`Starting to save item ${id}`);
			return remoteDb
				.collection('items')
				.doc(id)
				.delete()
				.then(arg => {
					utils.log('Document removed', arg);
				})
				.catch(error => utils.log(error));
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
					utils.log(`Item ${itemId} set for user`, arg);
					window.user.items = window.user.items || {};
					window.user.items[itemId] = true;
				})
				.catch(error => utils.log(error));
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
						db.local.set({
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
					utils.log(`Item ${itemId} unset for user`, arg);
				})
				.catch(error => utils.log(error));
		}
	};
})();
