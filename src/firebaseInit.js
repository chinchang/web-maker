import firebase from 'firebase/app';
// import 'firebase/firestore';
const config = {
	apiKey: 'AIzaSyCBEg3VpY6UjXNnDzvXieSYx13Q63Rs-a0',
	authDomain: 'web-sequence-local.firebaseapp.com',
	databaseURL: 'https://web-sequence-local.firebaseio.com/',
	projectId: 'web-sequence-local',
	storageBucket: 'web-sequence-local.appspot.com',
	messagingSenderId: '542187884961'
};
firebase.initializeApp(config);
