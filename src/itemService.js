(() => {
	window.itemService = {
		async getItem(id) {
			var db = await window.db.getDb();
			return db.doc(`items/${id}`).get().then(doc => {
				return doc.data();
			});
		},

		async getAllItems() {
			var db = await window.db.getDb();

			return db
				.doc(`users/${window.user.uid}`)
				.get()
				.then(doc => {
					return doc.data().items;
				})
				.then(async itemIds => {
					console.log('itemids', itemIds);
					var items = [];
					for (var id in itemIds) {
						var item = await this.getItem(id);
						items.push(item);
					}
					return items;
				});
		},

		async setUser() {
			var db = await window.db.getDb();
			return db.doc(`users/${window.user.uid}`).set({
				items: {}
			});
		},

		async setItem(id, item) {
			var db = await window.db.getDb();
			console.log(`Starting to save item ${id}`);
			return db
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

		async setItemForUser(itemId) {
			var db = await window.db.getDb();
			return db
				.collection('users')
				.doc(window.user.uid)
				.update({
					[`items.${itemId}`]: true
				})
				.then(arg => {
					console.log(`Item ${itemId} set for user`, arg);
				})
				.catch(error => console.log(error));
		}
	};
})();
