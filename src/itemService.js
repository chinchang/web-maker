(() => {
	window.itemService = {
		async getItem(id) {
			var remoteDb = await window.db.getDb();
			return remoteDb.doc(`items/${id}`).get().then(doc => {
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
			return remoteDb.doc(`users/${window.user.uid}`).get().then(doc => {
				if (!doc.exists) {
					return {};
				}
				return doc.data().items;
			});
		},

		async getAllItems() {
			var d = deferred();
			let itemIds = await this.getUserItemIds();
			itemIds = Object.getOwnPropertyNames(itemIds || {});
			utils.log('itemids', itemIds);

			if (!itemIds.length) {
				d.resolve([]);
			}

			const items = [];
			for (let i = 0; i < itemIds.length; i++) {
				const id = itemIds[i];
				utils.log('Starting to fetch item ', id);
				this.getItem(id).then(item => {
					items.push(item);
					// Check if we have all items now.
					if (itemIds.length === items.length) {
						d.resolve(items);
					}
				});
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
			if (!window.user) {
				return new Promise(resolve => resolve());
			}
			var remoteDb = await window.db.getDb();
			utils.log(`Starting to save item ${id}`);
			item.createdBy = window.user.uid;
			return remoteDb
				.collection('items')
				.doc(id)
				.set(item, {
					merge: true
				})
				.then(arg => {
					utils.log('Document written', arg);
				})
				.catch(error => utils.log(error));
		},

		/**
		 * Saves the passed items in the database.
		 * @param {Array} items to be saved in DB
		 */
		saveItems(items) {
			var d = deferred();
			if (window.IS_EXTENSION) {
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
						// Set these items on out cached user object too
						window.user.items[id] = true;
					}
					batch.commit().then(d.resolve);
					/* eslint-enable guard-for-in */
				});
			}
			return d.promise;
		},

		async removeItem(id) {
			if (window.IS_EXTENSION) {
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
			if (window.IS_EXTENSION || !window.user) {
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
			if (window.IS_EXTENSION) {
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
					utils.log(`Item ${itemId} unset for user`, arg);
				})
				.catch(error => utils.log(error));
		}
	};
})();
