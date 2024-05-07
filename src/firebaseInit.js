import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const config = {
	apiKey: 'AIzaSyBl8Dz7ZOE7aP75mipYl2zKdLSRzBU2fFc',
	authDomain: 'web-maker-app.firebaseapp.com',
	databaseURL: 'https://web-maker-app.firebaseio.com',
	projectId: 'web-maker-app',
	storageBucket: 'web-maker-app.appspot.com',
	messagingSenderId: '560473480645'
};

const configStaging = {
	apiKey: 'AIzaSyCU3X3p0MJHF7PUIGUJV2ipfuFx3-d9Y1I',
	authDomain: 'web-maker-staging.firebaseapp.com',
	projectId: 'web-maker-staging',
	storageBucket: 'web-maker-staging.appspot.com',
	messagingSenderId: '365859090303',
	appId: '1:365859090303:web:1becf81ce3374e5f97b44a'
};

const app = initializeApp(configStaging);
export { app };

export const auth = getAuth(app);
export const db = getFirestore(app);
