import { deferred } from './deferred';
import { log } from './utils';
import {
	doc,
	updateDoc,
	deleteField,
	arrayUnion,
	arrayRemove
} from 'firebase/firestore';

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
						result.collections[collectionId].items || [];
					if (!result.collections[collectionId].items.includes(itemId)) {
						result.collections[collectionId].items.push(itemId);
					}
				}
				db.local.set({ collections: result.collections }, d.resolve);
			});
			return d.promise;
		}
		const remoteDb = window.db.getDb();
		return updateDoc(doc(remoteDb, `users/${window.user.uid}`), {
			[`collections.${collectionId}.items`]: arrayUnion(itemId)
		}).then(() => {
			const col = window.user.collections[collectionId];
			col.items = col.items || [];
			if (!col.items.includes(itemId)) {
				col.items.push(itemId);
			}
			log(`Item ${itemId} added to collection ${collectionId}`);
		});
	},

	async removeItemFromCollection(collectionId, itemId) {
		if (!window.user) {
			const d = deferred();
			db.local.get({ collections: {} }, result => {
				if (
					result.collections[collectionId] &&
					Array.isArray(result.collections[collectionId].items)
				) {
					result.collections[collectionId].items = result.collections[
						collectionId
					].items.filter(id => id !== itemId);
				}
				db.local.set({ collections: result.collections }, d.resolve);
			});
			return d.promise;
		}
		const remoteDb = window.db.getDb();
		return updateDoc(doc(remoteDb, `users/${window.user.uid}`), {
			[`collections.${collectionId}.items`]: arrayRemove(itemId)
		}).then(() => {
			const col = window.user.collections[collectionId];
			if (Array.isArray(col.items)) {
				col.items = col.items.filter(id => id !== itemId);
			}
			log(`Item ${itemId} removed from collection ${collectionId}`);
		});
	},

	async removeItemFromAllCollections(itemId) {
		if (!window.user) {
			const d = deferred();
			db.local.get({ collections: {} }, result => {
				Object.keys(result.collections).forEach(cId => {
					if (Array.isArray(result.collections[cId].items)) {
						result.collections[cId].items = result.collections[
							cId
						].items.filter(id => id !== itemId);
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
			if (
				Array.isArray(collections[cId].items) &&
				collections[cId].items.includes(itemId)
			) {
				updates[`collections.${cId}.items`] = arrayRemove(itemId);
				collections[cId].items = collections[cId].items.filter(
					id => id !== itemId
				);
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
