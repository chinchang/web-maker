(() => {
	window.itemService = {
		async getItem(id) {
			var db = await window.db.getDb();
			return db.doc(`items/${id}`).get().then(doc => {
				return doc.data();
			});
		},

		async getAllItems() {
			var d = deferred();
			var remoteDb = await window.db.getDb();

			remoteDb
				.doc(`users/${window.user.uid}`)
				.get()
				.then(doc => {
					return doc.data().items;
				})
				.then(itemIdsObj => {
					var itemIds = Object.getOwnPropertyNames(itemIdsObj || {});
					console.log('itemids', itemIds);

					if (!itemIds.length) {
						d.resolve([]);
					}

					var items = [];
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
					return items;
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
			var remoteDb = await window.db.getDb();
			console.log(`Starting to save item ${id}`);
			return remoteDb
				.collection('items')
				.doc(id)
				.set(item, {
					merge: true
				})
				.then(arg => {
					console.log('Document written', arg);
				})
				.catch(error => console.log(error));
		},

		async removeItem(id) {
			if (window.IS_EXTENSION) {
				var d = deferred();
				db.local.remove(id, d.resolve);
				return d.promise;
			}
			const remoteDb = await window.db.getDb();
			console.log(`Starting to save item ${id}`);
			return remoteDb
				.collection('items')
				.doc(id)
				.delete()
				.then(arg => {
					console.log('Document removed', arg);
				})
				.catch(error => console.log(error));
		},

		async setItemForUser(itemId) {
			var remoteDb = await window.db.getDb();
			return remoteDb
				.collection('users')
				.doc(window.user.uid)
				.update({
					[`items.${itemId}`]: true
				})
				.then(arg => {
					console.log(`Item ${itemId} set for user`, arg);
				})
				.catch(error => console.log(error));
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
					console.log(`Item ${itemId} unset for user`, arg);
				})
				.catch(error => console.log(error));
		}
	};
})();
