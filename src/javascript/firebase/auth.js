import firebase from 'firebase/app';
import 'firebase/auth';
import { log } from '../../utils';
import { alertsService } from '../../notifications';
import { trackEvent } from '../../analytics';
import { LocalStorageKeys } from '../app/config';

function firebaseAuthIntegration(app) {
	const firestore = firebase.firestore();
	const settings = { timestampsInSnapshots: true };
	firestore.settings(settings);
	firebase.auth().onAuthStateChanged(user => {
		app.setState({ isLoginModalOpen: false });
		if (user) {
			log('You are -> ', user);
			alertsService.add('You are now logged in!');
			app.setState({ user });
			window.user = user;
			if (!window.localStorage[LocalStorageKeys.ASKED_TO_IMPORT_CREATIONS]) {
				app.fetchItems(false, true).then(items => {
					if (!items.length) {
						return;
					}
					app.oldSavedItems = items;
					app.oldSavedCreationsCount = items.length;
					app.setState({
						isAskToImportModalOpen: true
					});
					trackEvent('ui', 'askToImportModalSeen');
				});
			}
			window.db.getUser(user.uid).then(customUser => {
				if (customUser) {
					const prefs = { ...app.state.prefs };
					Object.assign(prefs, user.settings);
					app.setState({ prefs: prefs });
					app.updateSetting();
				}

				if (app.onUserItemsResolved) {
					app.onUserItemsResolved(user.items);
				}
			});
		} else {
			// User is signed out.
			app.setState({ user: undefined });
			delete window.user;

			if (app.onUserItemsResolved) {
				app.onUserItemsResolved(null);
			}
		}
		app.updateProfileUi();
	});
}


export { firebaseAuthIntegration };
