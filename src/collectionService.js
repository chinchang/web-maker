import { deferred } from './deferred';
import { log } from './utils';
import { doc, updateDoc, deleteField } from 'firebase/firestore';

export const collectionService = {
	async getAllCollections() {
		if (window.user) {
			// Collections are stored as a field on the user document
			return window.user.collections || {};
		}
		const d = deferred();
		db.local.get({ collections: {} }, result => {
			d.resolve(result.collections || {});
		});
		return d.promise;
	},

	async setCollection(collectionId, collection) {
		if (!window.user) {
			const d = deferred();
			db.local.get({ collections: {} }, result => {
				result.collections[collectionId] = collection;
				db.local.set({ collections: result.collections }, d.resolve);
			});
			return d.promise;
		}
		const remoteDb = window.db.getDb();
		return updateDoc(doc(remoteDb, `users/${window.user.uid}`), {
			[`collections.${collectionId}`]: collection
		}).then(() => {
			window.user.collections = window.user.collections || {};
			window.user.collections[collectionId] = collection;
			log(`Collection ${collectionId} saved`);
		});
	},

	async removeCollection(collectionId) {
		if (!window.user) {
			const d = deferred();
			db.local.get({ collections: {} }, result => {
				delete result.collections[collectionId];
				db.local.set({ collections: result.collections }, d.resolve);
			});
			return d.promise;
		}
		const remoteDb = window.db.getDb();
		return updateDoc(doc(remoteDb, `users/${window.user.uid}`), {
			[`collections.${collectionId}`]: deleteField()
		}).then(() => {
			delete window.user.collections[collectionId];
			log(`Collection ${collectionId} removed`);
		});
	},

	async addItemToCollection(collectionId, itemId) {
		if (!window.user) {
			const d = deferred();
			db.local.get({ collections: {} }, result => {
				if (result.collections[collectionId]) {
					result.collections[collectionId].items =
						result.collections[collectionId].items || {};
					result.collections[collectionId].items[itemId] = true;
				}
				db.local.set({ collections: result.collections }, d.resolve);
			});
			return d.promise;
		}
		const remoteDb = window.db.getDb();
		return updateDoc(doc(remoteDb, `users/${window.user.uid}`), {
			[`collections.${collectionId}.items.${itemId}`]: true
		}).then(() => {
			window.user.collections[collectionId].items[itemId] = true;
			log(`Item ${itemId} added to collection ${collectionId}`);
		});
	},

	async removeItemFromCollection(collectionId, itemId) {
		if (!window.user) {
			const d = deferred();
			db.local.get({ collections: {} }, result => {
				if (
					result.collections[collectionId] &&
					result.collections[collectionId].items
				) {
					delete result.collections[collectionId].items[itemId];
				}
				db.local.set({ collections: result.collections }, d.resolve);
			});
			return d.promise;
		}
		const remoteDb = window.db.getDb();
		return updateDoc(doc(remoteDb, `users/${window.user.uid}`), {
			[`collections.${collectionId}.items.${itemId}`]: deleteField()
		}).then(() => {
			delete window.user.collections[collectionId].items[itemId];
			log(`Item ${itemId} removed from collection ${collectionId}`);
		});
	},

	async removeItemFromAllCollections(itemId) {
		if (!window.user) {
			const d = deferred();
			db.local.get({ collections: {} }, result => {
				Object.keys(result.collections).forEach(cId => {
					if (
						result.collections[cId].items &&
						result.collections[cId].items[itemId]
					) {
						delete result.collections[cId].items[itemId];
					}
				});
				db.local.set({ collections: result.collections }, d.resolve);
			});
			return d.promise;
		}
		const remoteDb = window.db.getDb();
		const updates = {};
		const collections = window.user.collections || {};
		Object.keys(collections).forEach(cId => {
			if (collections[cId].items && collections[cId].items[itemId]) {
				updates[`collections.${cId}.items.${itemId}`] = deleteField();
				delete window.user.collections[cId].items[itemId];
			}
		});
		if (Object.keys(updates).length === 0) return Promise.resolve();
		return updateDoc(doc(remoteDb, `users/${window.user.uid}`), updates).then(
			() => {
				log(`Item ${itemId} removed from all collections`);
			}
		);
	}
};
