import { trackEvent } from './analytics';
import { auth } from './firebaseInit';
import { log } from './utils';
import {
	GithubAuthProvider,
	GoogleAuthProvider,
	signOut,
	signInWithCredential
} from 'firebase/auth/web-extension';

export const authh = {
	logout() {
		signOut(auth);
	},
	async login(providerName) {
		const result = await chrome.runtime.sendMessage({
			type: 'firebase-auth',
			providerName
		});

		if (
			result.name === 'FirebaseError' &&
			result.code === 'auth/account-exists-with-different-credential'
		) {
			alert(
				'You have already signed up with the same email using different social login'
			);
			return;
		}

		let credential;
		switch (providerName) {
			case 'google':
				credential = GoogleAuthProvider.credentialFromResult(result);
				break;
			case 'github':
				credential = GithubAuthProvider.credentialFromResult(result);
				break;
		}

		// authenticationObject is of the type UserCredentialImpl. Use it to authenticate here
		return signInWithCredential(auth, credential).then(() => {
			trackEvent('fn', 'loggedIn', providerName);
			// Save to recommend next time
			window.db.local.set({
				lastAuthProvider: providerName
			});
		});

		return signInWithPopup(auth, provider).catch(function (error) {
			log(error);
			if (error.code === 'auth/account-exists-with-different-credential') {
				alert(
					'You have already signed up with the same email using different social login'
				);
			}
		});
	}
};
