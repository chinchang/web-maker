import {
	signInWithPopup,
	GithubAuthProvider,
	GoogleAuthProvider,
	getAuth
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { config } from './firebaseConfig.js';

const app = initializeApp(config);
const auth = getAuth();

// This code runs inside of an iframe in the extension's offscreen document.
// This gives you a reference to the parent frame, i.e. the offscreen document.
// You will need this to assign the targetOrigin for postMessage.
const PARENT_FRAME = document.location.ancestorOrigins[0];

function sendResponse(result) {
	globalThis.parent.self.postMessage(JSON.stringify(result), PARENT_FRAME);
}

globalThis.addEventListener('message', function ({ data }) {
	if (data.initAuth) {
		const { providerName } = data;
		let provider;
		if (providerName === 'google') {
			provider = new GoogleAuthProvider();
			provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
		} else {
			provider = new GithubAuthProvider();
		}

		// Opens the Google sign-in page in a popup, inside of an iframe in the
		// extension's offscreen document.
		// To centralize logic, all respones are forwarded to the parent frame,
		// which goes on to forward them to the extension's service worker.
		signInWithPopup(auth, provider).then(sendResponse).catch(sendResponse);
	}
});
