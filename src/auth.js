import { trackEvent } from './analytics';
import firebase from 'firebase/app';
import { log } from './utils';

export const auth = {
	logout() {
		firebase.auth().signOut();
	},
	login(providerName) {
		var provider;
		if (providerName === 'facebook') {
			provider = new firebase.auth.FacebookAuthProvider();
		} else if (providerName === 'twitter') {
			provider = new firebase.auth.TwitterAuthProvider();
		} else if (providerName === 'google') {
			provider = new firebase.auth.GoogleAuthProvider();
			provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
		} else {
			provider = new firebase.auth.GithubAuthProvider();
		}

		return firebase
			.auth()
			.signInWithPopup(provider)
			.then(function() {
				trackEvent('fn', 'loggedIn', providerName);
				// Save to recommend next time
				window.db.local.set({
					lastAuthProvider: providerName
				});
			})
			.catch(function(error) {
				log(error);
				if (error.code === 'auth/account-exists-with-different-credential') {
					alert(
						'You have already signed up with the same email using different social login'
					);
				}
			});
	}
};
