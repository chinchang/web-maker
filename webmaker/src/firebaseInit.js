import firebase from 'firebase/app';
// import 'firebase/firestore';
const config = {
	apiKey: 'AIzaSyBl8Dz7ZOE7aP75mipYl2zKdLSRzBU2fFc',
	authDomain: 'web-maker-app.firebaseapp.com',
	databaseURL: 'https://web-maker-app.firebaseio.com',
	projectId: 'web-maker-app',
	storageBucket: 'web-maker-app.appspot.com',
	messagingSenderId: '560473480645'
};
firebase.initializeApp(config);
