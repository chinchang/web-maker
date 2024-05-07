import { trackEvent } from './analytics';
import { auth } from './firebaseInit';
import {
	GithubAuthProvider,
	TwitterAuthProvider,
	GoogleAuthProvider,
	signInWithPopup,
	signInWithCredential,
	signOut
} from 'firebase/auth/web-extension';
import { log } from './utils';

export const authh = {
	logout() {
		signOut();
	},
	login(providerName) {
		const ru = chrome.identity.getRedirectURL('');
		console.log(111, ru);
		chrome.identity.launchWebAuthFlow(
			{
				interactive: true,
				url: `https://github.com/login/oauth/authorize?client_id=5d26b6d331c0e1a66656&redirect_uri=${ru}&scope=user:email&response_type=token`
			},
			function (responseUrl) {
				const tokenMatch = responseUrl.match(/code=(.*)/);
				console.log({ responseUrl }, tokenMatch[1]);
				const token = tokenMatch ? tokenMatch[1] : null;
				if (!token) {
					console.error('No token found');
					return;
				}
				const credential = GithubAuthProvider.credential('');
				signInWithCredential(auth, credential)
					.then(result => {
						console.log('Success!!!');
						console.log(result);
					})
					.catch(error => {
						// You can handle errors here
						console.log(88, error);
					});
			}
		);
		return;

		chrome.identity.getAuthToken({ interactive: true }, function (token) {
			//Token:  This requests an OAuth token from the Chrome Identity API.
			if (chrome.runtime.lastError) {
				console.error(chrome.runtime.lastError);
			} else if (token) {
				console.error(222, token);
				// Follows: https://firebase.google.com/docs/auth/web/google-signin
				// Authorize Firebase with the OAuth Access Token.
				// console.log("TOKEN:")
				// console.log(token)
				// Builds Firebase credential with the Google ID token.
				const credential = GoogleAuthProvider.credential(null, token);
				signInWithCredential(auth, credential)
					.then(result => {
						console.log('Success!!!');
						console.log(result);
					})
					.catch(error => {
						// You can handle errors here
						console.log(error);
					});
			} else {
				console.error('The OAuth token was null');
			}
		});

		// chrome.identity.getAuthToken({}, token => {
		// 	console.log(7777, token);
		// 	let credential = GoogleAuthProvider.credential(null, token);
		// 	console.log(277, credential);

		// 	signInWithCredential(credential)
		// 		.then(userCredential => {
		// 			console.log(999, userCredential);
		// 		})
		// 		.catch(error => {
		// 			console.error(error);
		// 		});
		// });

		return;

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
