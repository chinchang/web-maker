import { trackEvent } from './analytics';
import { auth } from './firebaseInit';
import { log } from './utils';
import {
	GithubAuthProvider as ExtensionGithubAuthProvider,
	GoogleAuthProvider as ExtensionGoogleAuthProvider,
	signOut,
	signInWithCredential
} from 'firebase/auth/web-extension';
import {
	signInWithPopup,
	GithubAuthProvider,
	GoogleAuthProvider
} from 'firebase/auth';

export const authh = {
	logout() {
		signOut(auth);
	},
	async login(providerName) {
		const onSuccess = () => {
			trackEvent('fn', 'loggedIn', providerName);
			// Save to recommend next time
			window.db.local.set({
				lastAuthProvider: providerName
			});
		};

		if (window.IS_EXTENSION) {
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
					credential = ExtensionGoogleAuthProvider.credentialFromResult(result);
					break;
				case 'github':
					credential = ExtensionGithubAuthProvider.credentialFromResult(result);
					break;
			}

			// authenticationObject is of the type UserCredentialImpl. Use it to authenticate here
			return signInWithCredential(auth, credential).then(onSuccess);
		}

		var provider;
		if (providerName === 'google') {
			provider = new GoogleAuthProvider();
			provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
		} else {
			provider = new GithubAuthProvider();
		}

		return signInWithPopup(auth, provider)
			.then(onSuccess)
			.catch(function (error) {
				log(error);
				if (error.code === 'auth/account-exists-with-different-credential') {
					alert(
						'You have already signed up with the same email using different social login'
					);
				}
			});
	}
};
