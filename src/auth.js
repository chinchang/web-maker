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
	linkWithPopup,
	reauthenticateWithPopup,
	GithubAuthProvider,
	GoogleAuthProvider
} from 'firebase/auth';

export const authh = {
	logout() {
		signOut(auth);
	},
	async login(providerName) {
		const onSuccess = () => {
			trackEvent(
				'fn',
				'loggedIn',
				providerName,
				window.IS_EXTENSION ? 'extension' : 'web'
			);

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

/**
 * Triggers a GitHub OAuth popup with the `gist` scope and returns the access
 * token. Does NOT persist it — callers are expected to store it themselves.
 *
 * Behavior depends on current Firebase auth state:
 *  - Signed out: signInWithPopup (also signs the user in via GitHub).
 *  - Signed in via Google: linkWithPopup so the Firebase session is preserved.
 *  - Signed in via GitHub: reauthenticateWithPopup with the extra scope.
 *
 * Not supported in the extension build — returns NOT_SUPPORTED_ON_EXTENSION
 * because the offscreen/iframe auth path doesn't propagate scope changes.
 */
export async function connectGithubForGist() {
	if (window.IS_EXTENSION) {
		const err = new Error(
			'Gist export is only available on the web version of Web-Maker.'
		);
		err.code = 'NOT_SUPPORTED_ON_EXTENSION';
		throw err;
	}

	const provider = new GithubAuthProvider();
	provider.addScope('gist');

	const current = auth.currentUser;
	const hasGithubProvider =
		!!current && current.providerData.some(p => p.providerId === 'github.com');

	let result;
	try {
		if (current && hasGithubProvider) {
			result = await reauthenticateWithPopup(current, provider);
		} else if (current) {
			result = await linkWithPopup(current, provider);
		} else {
			result = await signInWithPopup(auth, provider);
		}
	} catch (error) {
		log(error);
		if (error.code === 'auth/credential-already-in-use') {
			const e = new Error(
				'This GitHub account is registered with a different Web-Maker account. Sign out and sign back in with GitHub to export.'
			);
			e.code = 'CREDENTIAL_IN_USE';
			throw e;
		}
		if (error.code === 'auth/popup-closed-by-user') {
			const e = new Error('GitHub connection cancelled.');
			e.code = 'POPUP_CLOSED';
			throw e;
		}
		throw error;
	}

	const credential = GithubAuthProvider.credentialFromResult(result);
	const accessToken = credential && credential.accessToken;
	if (!accessToken) {
		const e = new Error('Could not retrieve GitHub access token.');
		e.code = 'NO_TOKEN';
		throw e;
	}
	trackEvent('fn', 'gistConnectSuccess');
	return accessToken;
}
