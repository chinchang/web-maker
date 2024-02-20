import { trackEvent } from './analytics';
import { auth } from './firebaseInit';
import {
	GithubAuthProvider,
	TwitterAuthProvider,
	GoogleAuthProvider,
	signInWithPopup,
	signOut
} from 'firebase/auth';
import { log } from './utils';

export const authh = {
	logout() {
		signOut();
	},
	login(providerName) {
		var provider;
		if (providerName === 'facebook') {
			provider = new FacebookAuthProvider();
		} else if (providerName === 'twitter') {
			provider = new TwitterAuthProvider();
		} else if (providerName === 'google') {
			provider = new GoogleAuthProvider();
			provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
		} else {
			provider = new GithubAuthProvider();
		}

		return signInWithPopup(auth, provider)
			.then(function () {
				trackEvent('fn', 'loggedIn', providerName);
				// Save to recommend next time
				window.db.local.set({
					lastAuthProvider: providerName
				});
			})
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
