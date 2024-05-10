import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
	initializeFirestore,
	persistentLocalCache,
	persistentMultipleTabManager
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const config = {
	apiKey: 'AIzaSyBl8Dz7ZOE7aP75mipYl2zKdLSRzBU2fFc',
	authDomain: 'web-maker-app.firebaseapp.com',
	databaseURL: 'https://web-maker-app.firebaseio.com',
	projectId: 'web-maker-app',
	storageBucket: 'web-maker-app.appspot.com',
	messagingSenderId: '560473480645'
};

const app = initializeApp(config);
export { app };

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, {
	localCache: persistentLocalCache({
		tabManager: persistentMultipleTabManager()
	})
});
