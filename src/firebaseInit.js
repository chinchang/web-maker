import firebase from 'firebase/app';
// import 'firebase/firestore';
const productionConfig = {
	apiKey: 'AIzaSyCBEg3VpY6UjXNnDzvXieSYx13Q63Rs-a0',
	authDomain: 'web-sequence-local.firebaseapp.com',
	databaseURL: 'https://web-sequence-local.firebaseio.com/',
	projectId: 'web-sequence-local',
	storageBucket: 'web-sequence-local.appspot.com',
	messagingSenderId: '542187884961'
};

const stagingConfig = {
    apiKey: "AIzaSyDNAc2qg27_9EzO_BQew9vzPNvcxn0go04",
    authDomain: "staging-zenuml.firebaseapp.com",
    databaseURL: "https://staging-zenuml.firebaseio.com",
    projectId: "staging-zenuml",
    storageBucket: "staging-zenuml.appspot.com",
    messagingSenderId: "337278161370"
};

//__PRODUCTION__ is a placeholder which will be replaced by Webpack
const config = __PRODUCTION__ ? productionConfig : stagingConfig; //eslint-disable-line
firebase.initializeApp(config);
