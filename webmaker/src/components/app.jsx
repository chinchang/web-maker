import { h, Component } from 'preact';
import { Router } from 'preact-router';

import MainHeader from './MainHeader.jsx';
import ContentWrap from './ContentWrap.jsx';
import Footer from './Footer.jsx';
import SavedItemPane from './SavedItemPane.jsx';
import AddLibrary from './AddLibrary.jsx';
import Modal from './Modal.jsx';
import HelpModal from './HelpModal.jsx';
import Login from './Login.jsx';
import {
	log,
	generateRandomId,
	semverCompare,
	saveAsHtml,
	handleDownloadsPermission,
	downloadFile
} from '../utils';
import { itemService } from '../itemService';
import '../db';
import Notifications from './Notifications';
import Settings from './Settings.jsx';
import { modes, HtmlModes, CssModes, JsModes } from '../codeModes';
import { trackEvent } from '../analytics';
import { deferred } from '../deferred';
import { alertsService } from '../notifications';
import firebase from 'firebase/app';
import 'firebase/auth';
import Profile from './Profile';
import { auth } from '../auth';
import SupportDeveloperModal from './SupportDeveloperModal';
import KeyboardShortcutsModal from './KeyboardShortcutsModal';

if (module.hot) {
	require('preact/debug');
}

const LocalStorageKeys = {
	LOGIN_AND_SAVE_MESSAGE_SEEN: 'loginAndsaveMessageSeen',
	ASKED_TO_IMPORT_CREATIONS: 'askedToImportCreations'
};
const UNSAVED_WARNING_COUNT = 15;
const version = '3.2.0';

export default class App extends Component {
	constructor() {
		super();
		this.AUTO_SAVE_INTERVAL = 15000; // 15 seconds

		this.state = {
			isSavedItemPaneOpen: false,
			isModalOpen: false,
			isAddLibraryModalOpen: false,
			isHelpModalOpen: false,
			isNotificationsModalOpen: false,
			isLoginModalOpen: false,
			isProfileModalOpen: false,
			isSupportDeveloperModalOpen: false,
			isKeyboardShortcutsModalOpen: false,
			prefs: {},
			currentItem: {
				title: '',
				externalLibs: { js: '', css: '' }
			}
		};
		this.defaultSettings = {
			preserveLastCode: true,
			replaceNewTab: false,
			htmlMode: 'html',
			jsMode: 'js',
			cssMode: 'css',
			isCodeBlastOn: false,
			indentWith: 'spaces',
			indentSize: 2,
			editorTheme: 'monokai',
			keymap: 'sublime',
			fontSize: 16,
			refreshOnResize: false,
			autoPreview: true,
			editorFont: 'FiraCode',
			editorCustomFont: '',
			autoSave: true,
			autoComplete: true,
			preserveConsoleLogs: true,
			lightVersion: false,
			lineWrap: true,
			infiniteLoopTimeout: 1000,
			layoutMode: 2
		};
		this.prefs = {};

		firebase.auth().onAuthStateChanged(user => {
			this.setState({ isLoginModalOpen: false });
			if (user) {
				log('You are -> ', user);
				alertsService.add('You are now logged in!');
				this.setState({ user });
				window.user = user;
				if (
					!window.localStorage[LocalStorageKeys.ASKED_TO_IMPORT_CREATIONS] &&
					window.oldSavedCreationsCountEl
				) {
					this.fetchItems(false, true).then(items => {
						if (!items.length) {
							return;
						}
						this.oldSavedItems = items;
						// window.oldSavedCreationsCountEl.textContent = items.length;
						this.setState({
							isAskToImportModalOpen: true
						});
						trackEvent('ui', 'askToImportModalSeen');
					});
				}
				window.db.getUser(user.uid).then(customUser => {
					if (customUser) {
						const prefs = { ...this.state.prefs };
						Object.assign(prefs, user.settings);
						this.setState({ prefs: prefs });
						this.updateSetting();
					}
				});
			} else {
				// User is signed out.
				this.setState({ user: undefined });
				delete window.user;
			}
			this.updateProfileUi();
		});
	}
	componentWillMount() {
		var lastCode;
		window.onunload = () => {
			this.saveCode('code');
			if (this.detachedWindow) {
				this.detachedWindow.close();
			}
		};

		db.local.get(
			{
				layoutMode: 1,
				code: ''
			},
			result => {
				// this.toggleLayout(result.layoutMode);
				this.state.prefs.layoutMode = result.layoutMode;
				if (result.code) {
					lastCode = result.code;
				}
			}
		);
		// Get synced `preserveLastCode` setting to get back last code (or not).
		db.getSettings(this.defaultSettings).then(result => {
			if (result.preserveLastCode && lastCode) {
				this.setState({ unsavedEditCount: 0 });

				// For web app environment we don't fetch item from localStorage,
				// because the item isn't stored in the localStorage.
				if (lastCode.id && window.IS_EXTENSION) {
					db.local.get(lastCode.id, itemResult => {
						if (itemResult[lastCode.id]) {
							log('Load item ', lastCode.id);
							this.setCurrentItem(itemResult[lastCode.id]).then(() =>
								this.refreshEditor()
							);
						}
					});
				} else {
					log('Load last unsaved item', lastCode);
					this.setCurrentItem(lastCode).then(() => this.refreshEditor());
				}
			} else {
				this.createNewItem();
			}
			Object.assign(this.state.prefs, result);
			this.setState({ prefs: this.state.prefs });
			this.updateSetting();
		});

		// Check for new version notifications
		db.getUserLastSeenVersion().then(lastSeenVersion => {
			// Check if new user
			if (!lastSeenVersion) {
				this.setState({
					isOnboardModalOpen: true
				});
				if (document.cookie.indexOf('onboarded') === -1) {
					trackEvent('ui', 'onboardModalSeen', version);
					document.cookie = 'onboarded=1';
				}
				window.db.setUserLastSeenVersion(version);
				// set some initial preferences on closing the onboard modal
				// Old onboarding.
				// utils.once(document, 'overlaysClosed', function() {});
			}
			// If its an upgrade
			if (
				lastSeenVersion &&
				semverCompare(lastSeenVersion, version) === -1 &&
				!window.localStorage.pledgeModalSeen
			) {
				scope.openSupportDeveloperModal();
				window.localStorage.pledgeModalSeen = true;
			}

			if (!lastSeenVersion || semverCompare(lastSeenVersion, version) === -1) {
				this.setState({ hasUnseenChangelog: true });
				this.hasSeenNotifications = false;
			}
		});
	}
	updateProfileUi() {
		if (this.state.user) {
			document.body.classList.add('is-logged-in');
		} else {
			document.body.classList.remove('is-logged-in');
		}
	}

	refreshEditor() {
		this.toggleLayout(
			this.state.currentItem.layoutMode || this.state.prefs.layoutMode
		);
		this.contentWrap.refreshEditor();
	}
	// Creates a new item with passed item's contents
	forkItem(sourceItem) {
		if (this.state.unsavedEditCount) {
			var shouldDiscard = confirm(
				'You have unsaved changes in your current work. Do you want to discard unsaved changes and continue?'
			);
			if (!shouldDiscard) {
				return;
			}
		}
		const fork = JSON.parse(JSON.stringify(sourceItem));
		delete fork.id;
		fork.title = '(Forked) ' + sourceItem.title;
		fork.updatedOn = Date.now();
		this.setCurrentItem(fork).then(() => this.refreshEditor());
		alertsService.add(`"${sourceItem.title}" was forked`);
		trackEvent('fn', 'itemForked');
	}
	createNewItem() {
		var d = new Date();
		this.setCurrentItem({
			title:
				'Untitled ' +
				d.getDate() +
				'-' +
				(d.getMonth() + 1) +
				'-' +
				d.getHours() +
				':' +
				d.getMinutes(),
			html: '',
			css: '',
			js: '',
			externalLibs: { js: '', css: '' },
			layoutMode: this.state.currentLayoutMode
		}).then(() => this.refreshEditor());
		alertsService.add('New item created');
	}
	openItem(item) {
		this.setCurrentItem(item).then(() => this.refreshEditor());
		alertsService.add('Saved item loaded');
	}
	removeItem(itemId) {
		var answer = confirm(
			`Are you sure you want to delete "${savedItems[itemId].title}"?`
		);
		if (!answer) {
			return;
		}

		// Remove from items list
		itemService.unsetItemForUser(itemId);

		// Remove individual item too.
		itemService.removeItem(itemId).then(() => {
			alertsService.add('Item removed.');
			// This item is open in the editor. Lets open a new one.
			if (this.state.currentItem.id === itemId) {
				this.createNewItem();
			}
		});

		// Remove from cached list
		delete this.state.savedItems[itemId];
		this.setState({
			savedItems: { ...this.state.savedItems }
		});

		trackEvent('fn', 'itemRemoved');
	}
	setCurrentItem(item) {
		const d = deferred();
		// TODO: remove later
		item.htmlMode =
			item.htmlMode || this.state.prefs.htmlMode || HtmlModes.HTML;
		item.cssMode = item.cssMode || this.state.prefs.cssMode || CssModes.CSS;
		item.jsMode = item.jsMode || this.state.prefs.jsMode || JsModes.JS;

		this.setState({ currentItem: item }, d.resolve);

		// Reset auto-saving flag
		this.isAutoSavingEnabled = false;

		// Reset unsaved count, in UI also.
		this.setState({ unsavedEditCount: 0 });
		return d.promise;
	}
	saveBtnClickHandler() {
		trackEvent(
			'ui',
			'saveBtnClick',
			this.state.currentItem.id ? 'saved' : 'new'
		);
		this.saveItem();
	}

	populateItemsInSavedPane(items) {
		const savedItemsPane = $('#js-saved-items-pane');
		// TODO: sort desc. by updation date
		this.setState({
			savedItems: items.sort(function(a, b) {
				return b.updatedOn - a.updatedOn;
			})
		});

		this.toggleSavedItemsPane();
		// HACK: Set overflow after sometime so that the items can animate without getting cropped.
		// setTimeout(() => $('#js-saved-items-wrap').style.overflowY = 'auto', 1000);
	}
	toggleSavedItemsPane(shouldOpen) {
		this.setState({ isSavedItemPaneOpen: !this.state.isSavedItemPaneOpen });

		if (this.state.isSavedItemPaneOpen) {
			window.searchInput.focus();
		} else {
			window.searchInput.value = '';
			// Give last focused editor, focus again
			// if (editorWithFocus) {
			// editorWithFocus.focus();
			// }
		}
		document.body.classList[this.state.isSavedItemPaneOpen ? 'add' : 'remove'](
			'overlay-visible'
		);
	}

	/**
	 * Fetches all items from storage
	 * @param  {boolean} shouldSaveGlobally Whether to store the fetched items in global arr for later use.
	 * @return {promise}                    Promise.
	 */
	async fetchItems(shouldSaveGlobally, shouldFetchLocally) {
		var d = deferred();
		this.state.savedItems = {};
		var items = [];
		if (window.user && !shouldFetchLocally) {
			items = await itemService.getAllItems();
			utils.log('got items');
			if (shouldSaveGlobally) {
				items.forEach(item => {
					this.state.savedItems[item.id] = item;
				});
			}
			d.resolve(items);
			return d.promise;
		}
		db.local.get('items', result => {
			var itemIds = Object.getOwnPropertyNames(result.items || {});
			if (!itemIds.length) {
				d.resolve([]);
			}

			trackEvent('fn', 'fetchItems', itemIds.length);
			for (let i = 0; i < itemIds.length; i++) {
				/* eslint-disable no-loop-func */
				db.local.get(itemIds[i], itemResult => {
					if (shouldSaveGlobally) {
						this.state.savedItems[itemIds[i]] = itemResult[itemIds[i]];
					}
					items.push(itemResult[itemIds[i]]);
					// Check if we have all items now.
					if (itemIds.length === items.length) {
						d.resolve(items);
					}
				});

				/* eslint-enable no-loop-func */
			}
		});
		return d.promise;
	}

	openSavedItemsPane() {
		this.setState({
			isFetchingItems: true
		});
		this.fetchItems(true).then(items => {
			this.setState({
				isFetchingItems: false
			});
			this.populateItemsInSavedPane(items);
		});
	}
	openAddLibrary() {
		this.setState({ isAddLibraryModalOpen: true });
	}
	closeSavedItemsPane() {
		this.setState({
			isSavedItemPaneOpen: false
		});
	}
	componentDidMount() {
		// Editor keyboard shortucuts
		window.addEventListener('keydown', event => {
			// TODO: refactor common listener code
			// Ctrl/⌘ + S
			if ((event.ctrlKey || event.metaKey) && event.keyCode === 83) {
				event.preventDefault();
				this.saveItem();
				trackEvent('ui', 'saveItemKeyboardShortcut');
			}
			// Ctrl/⌘ + Shift + 5
			if (
				(event.ctrlKey || event.metaKey) &&
				event.shiftKey &&
				event.keyCode === 53
			) {
				event.preventDefault();
				this.contentWrap.setPreviewContent(true, true);
				trackEvent('ui', 'previewKeyboardShortcut');
			} else if ((event.ctrlKey || event.metaKey) && event.keyCode === 79) {
				// Ctrl/⌘ + O
				event.preventDefault();
				this.openSavedItemsPane();
				trackEvent('ui', 'openCreationKeyboardShortcut');
			} else if (
				(event.ctrlKey || event.metaKey) &&
				event.shiftKey &&
				event.keyCode === 191
			) {
				// Ctrl/⌘ + Shift + ?
				event.preventDefault();
				this.setState({
					isKeyboardShortcutsModalOpen: !this.state.isKeyboardShortcutsModalOpen
				});
				trackEvent('ui', 'showKeyboardShortcutsShortcut');
			} else if (event.keyCode === 27) {
				this.closeAllOverlays();
			}
		});
	}

	closeAllOverlays() {
		if (this.state.isSavedItemPaneOpen) {
			this.setState({ isSavedItemPaneOpen: false });
		}
	}
	onExternalLibChange(newValues) {
		log('onExternalLibChange');
		this.state.currentItem.externalLibs = {
			js: newValues.js,
			css: newValues.css
		};
		this.updateExternalLibCount();
		this.setState({
			currentItem: { ...this.state.currentItem }
		});
		this.contentWrap.setPreviewContent(true);
		alertsService.add('Libraries updated.');
	}
	updateExternalLibCount() {
		// Calculate no. of external libs
		var noOfExternalLibs = 0;
		noOfExternalLibs += this.state.currentItem.externalLibs.js
			.split('\n')
			.filter(lib => !!lib).length;
		noOfExternalLibs += this.state.currentItem.externalLibs.css
			.split('\n')
			.filter(lib => !!lib).length;
		this.setState({
			externalLibCount: noOfExternalLibs
		});
	}
	toggleLayout(mode) {
		/* eslint-disable no-param-reassign */
		mode = window.innerWidth < 500 ? 2 : mode;

		if (this.state.currentLayoutMode === mode) {
			// mainSplitInstance.setSizes(getMainSplitSizesToApply());
			// codeSplitInstance.setSizes(currentItem.sizes || [33.33, 33.33, 33.33]);
			this.setState({ currentLayoutMode: mode });
			return;
		}
		this.setState({ currentLayoutMode: mode });
		// Remove all layout classes
		[1, 2, 3, 4, 5].forEach(layoutNumber => {
			window[`layoutBtn${layoutNumber}`].classList.remove('selected');
			document.body.classList.remove(`layout-${layoutNumber}`);
		});
		$('#layoutBtn' + mode).classList.add('selected');
		document.body.classList.add('layout-' + mode);

		this.contentWrap.resetSplitting();
		this.contentWrap.setPreviewContent(true);
	}

	layoutBtnClickHandler(layoutId) {
		this.saveSetting('layoutMode', layoutId);
		trackEvent('ui', 'toggleLayoutClick', layoutId);
		this.toggleLayout(layoutId);
	}
	saveSetting(setting, value) {
		const d = deferred();
		const obj = {
			[setting]: value
		};
		db.local.set(obj, d.resolve);
		return d.promise;
	}

	saveCode(key) {
		// currentItem.htmlMode = htmlMode;
		// currentItem.cssMode = cssMode;
		// currentItem.jsMode = jsMode;
		if (modes['css' || cssMode].hasSettings) {
			this.state.currentItem.cssSettings = {
				acssConfig: scope.acssSettingsCm.getValue()
			};
		}
		this.state.currentItem.updatedOn = Date.now();
		this.state.currentItem.layoutMode = this.state.currentLayoutMode;

		// currentItem.sizes = getCodePaneSizes();
		// currentItem.mainSizes = getMainPaneSizes();

		log('saving key', key || this.state.currentItem.id, this.state.currentItem);

		function onSaveComplete() {
			if (window.user && !navigator.onLine) {
				alertsService.add(
					'Item saved locally. Will save to account when you are online.'
				);
			} else {
				alertsService.add('Item saved.');
			}
			this.setState({ unsavedEditCount: 0 });
		}

		return itemService
			.setItem(key || this.state.currentItem.id, this.state.currentItem)
			.then(onSaveComplete.bind(this));
	}

	// Save current item to storage
	saveItem() {
		if (
			!window.user &&
			!window.localStorage[LocalStorageKeys.LOGIN_AND_SAVE_MESSAGE_SEEN]
		) {
			const answer = confirm(
				'Saving without signing in will save your work only on this machine and this browser. If you want it to be secure & available anywhere, please login in your account and then save.\n\nDo you still want to continue saving locally?'
			);
			window.localStorage[LocalStorageKeys.LOGIN_AND_SAVE_MESSAGE_SEEN] = true;
			if (!answer) {
				trackEvent('ui', LocalStorageKeys.LOGIN_AND_SAVE_MESSAGE_SEEN, 'login');
				closeAllOverlays();
				loginModal.classList.add('is-modal-visible');
				return;
			}
			trackEvent('ui', LocalStorageKeys.LOGIN_AND_SAVE_MESSAGE_SEEN, 'local');
		}
		var isNewItem = !this.state.currentItem.id;
		this.state.currentItem.id =
			this.state.currentItem.id || 'item-' + generateRandomId();
		this.setState({
			isSaving: true
		});
		this.saveCode().then(() => {
			this.setState({
				isSaving: false
			});
			// TODO: May be setState with currentItem

			// If this is the first save, and auto-saving settings is enabled,
			// then start auto-saving from now on.
			// This is done in `saveCode()` completion so that the
			// auto-save notification overrides the `saveCode` function's notification.
			if (!this.isAutoSavingEnabled && this.state.prefs.autoSave) {
				this.isAutoSavingEnabled = true;
				alertsService.add('Auto-save enabled.');
			}
		});
		// Push into the items hash if its a new item being saved
		if (isNewItem) {
			itemService.setItemForUser(this.state.currentItem.id);
		}
	}
	onCodeModeChange(ofWhat, mode) {
		const item = { ...this.state.currentItem };
		item[`${ofWhat}Mode`] = mode;
		this.setState({ currentItem: item });
	}
	onCodeChange(type, code, isUserChange) {
		this.state.currentItem[type] = code;
		if (isUserChange) {
			this.setState({ unsavedEditCount: this.state.unsavedEditCount + 1 });

			if (
				this.state.unsavedEditCount % UNSAVED_WARNING_COUNT === 0 &&
				this.state.unsavedEditCount >= UNSAVED_WARNING_COUNT
			) {
				window.saveBtn.classList.add('animated');
				window.saveBtn.classList.add('wobble');
				window.saveBtn.addEventListener('animationend', () => {
					window.saveBtn.classList.remove('animated');
					window.saveBtn.classList.remove('wobble');
				});
			}
		}
	}

	titleInputBlurHandler(e) {
		this.state.currentItem.title = e.target.value;

		if (this.state.currentItem.id) {
			this.saveItem();
			trackEvent('ui', 'titleChanged');
		}
	}

	/**
	 * Handles all user triggered preference changes in the UI.
	 */
	updateSetting(e) {
		// If this was triggered from user interaction, save the setting
		if (e) {
			var settingName = e.target.dataset.setting;
			var obj = {};
			var el = e.target;
			log(settingName, el.type === 'checkbox' ? el.checked : el.value);
			const prefs = { ...this.state.prefs };
			prefs[settingName] = el.type === 'checkbox' ? el.checked : el.value;
			obj[settingName] = prefs[settingName];
			this.setState({ prefs });

			// We always save locally so that it gets fetched
			// faster on future loads.
			db.sync.set(obj, function() {
				alertsService.add('Setting saved');
			});
			if (window.user) {
				window.db.getDb().then(remoteDb => {
					remoteDb
						.collection('users')
						.doc(window.user.uid)
						.update({
							[`settings.${settingName}`]: this.state.prefs[settingName]
						})
						.then(arg => {
							utils.log(`Setting "${settingName}" for user`, arg);
						})
						.catch(error => utils.log(error));
				});
			}
			trackEvent('ui', 'updatePref-' + settingName, prefs[settingName]);
		}

		const prefs = this.state.prefs;
		// Show/hide RUN button based on autoPreview setting.
		runBtn.classList[prefs.autoPreview ? 'add' : 'remove']('hide');

		this.contentWrap.applyCodemirrorSettings(this.state.prefs);

		/*
		scope.acssSettingsCm.setOption(
			'theme',
			$('[data-setting=editorTheme]').value
		); */
		if (prefs.autoSave) {
			if (!this.autoSaveInterval) {
				this.autoSaveInterval = setInterval(() => {
					this.autoSaveLoop();
				}, this.AUTO_SAVE_INTERVAL);
			}
		} else {
			clearInterval(this.autoSaveInterval);
			this.autoSaveInterval = null;
		}

		document.body.classList[prefs.lightVersion ? 'add' : 'remove'](
			'light-version'
		);
	}

	// Keeps getting called after certain interval to auto-save current creation
	// if it needs to be.
	autoSaveLoop() {
		if (this.isAutoSavingEnabled && this.state.unsavedEditCount) {
			this.saveItem();
		}
	}

	loginBtnClickHandler() {
		this.setState({ isLoginModalOpen: true });
	}
	profileBtnClickHandler() {
		this.setState({ isProfileModalOpen: true });
	}

	logout() {
		if (this.state.unsavedEditCount) {
			var shouldDiscard = confirm(
				'You have unsaved changes. Do you still want to logout?'
			);
			if (!shouldDiscard) {
				return;
			}
		}
		trackEvent('fn', 'loggedOut');
		auth.logout();
	}

	itemClickHandler(item) {
		setTimeout(() => {
			this.openItem(item);
		}, 350);
		this.toggleSavedItemsPane();
	}
	itemRemoveBtnClickHandler(itemId) {
		this.removeItem(itemId);
	}
	itemForkBtnClickHandler(item) {
		this.toggleSavedItemsPane();
		setTimeout(() => {
			this.forkItem(item);
		}, 350);
	}
	newBtnClickHandler() {
		trackEvent('ui', 'newBtnClick');
		if (this.state.unsavedEditCount) {
			var shouldDiscard = confirm(
				'You have unsaved changes. Do you still want to create something new?'
			);
			if (shouldDiscard) {
				this.createNewItem();
			}
		} else {
			this.createNewItem();
		}
	}
	openBtnClickHandler() {
		trackEvent('ui', 'openBtnClick');
		this.openSavedItemsPane();
	}
	detachedPreviewBtnHandler() {
		trackEvent('ui', 'detachPreviewBtnClick');

		this.contentWrap.detachPreview();
	}
	notificationsBtnClickHandler() {
		this.setState({ isNotificationsModalOpen: true });

		if (this.state.isNotificationsModalOpen && !this.hasSeenNotifications) {
			this.hasSeenNotifications = true;
			this.setState({ hasUnseenChangelog: false });
			window.db.setUserLastSeenVersion(version);
		}
		trackEvent('ui', 'notificationButtonClick', version);
		return false;
	}
	codepenBtnClickHandler(e) {
		debugger;
		if (this.state.currentItem.cssMode === CssModes.ACSS) {
			alert("Oops! CodePen doesn't supports Atomic CSS currently.");
			e.preventDefault();
			return;
		}
		var json = {
			title: 'A Web Maker experiment',
			html: this.state.currentItem.html,
			css: this.state.currentItem.css,
			js: this.state.currentItem.js,

			/* eslint-disable camelcase */
			html_pre_processor: modes[this.state.currentItem.htmlMode].codepenVal,
			css_pre_processor: modes[this.state.currentItem.cssMode].codepenVal,
			js_pre_processor: modes[this.state.currentItem.jsMode].codepenVal,

			css_external: this.state.currentItem.externalLibs.css
				.split('\n')
				.join(';'),
			js_external: this.state.currentItem.externalLibs.js.split('\n').join(';')

			/* eslint-enable camelcase */
		};
		if (!this.state.currentItem.title.match(/Untitled\s\d\d*-\d/)) {
			json.title = this.state.currentItem.title;
		}
		json = JSON.stringify(json);
		window.codepenForm.querySelector('input').value = json;
		window.codepenForm.submit();
		trackEvent('ui', 'openInCodepen');
		e.preventDefault();
	}
	saveHtmlBtnClickHandler(e) {
		saveAsHtml(this.state.currentItem);
		trackEvent('ui', 'saveHtmlClick');
		e.preventDefault();
	}
	runBtnClickHandler() {
		this.contentWrap.setPreviewContent(true, true);
		trackEvent('ui', 'runBtnClick');
	}
	exportItems() {
		handleDownloadsPermission().then(() => {
			this.fetchItems().then(items => {
				var d = new Date();
				var fileName = [
					'web-maker-export',
					d.getFullYear(),
					d.getMonth() + 1,
					d.getDate(),
					d.getHours(),
					d.getMinutes(),
					d.getSeconds()
				].join('-');
				fileName += '.json';
				var blob = new Blob([JSON.stringify(items, false, 2)], {
					type: 'application/json;charset=UTF-8'
				});

				downloadFile(fileName, blob);

				trackEvent('fn', 'exportItems');
			});
		});
	}
	exportBtnClickHandler(e) {
		this.exportItems();
		e.preventDefault();
		trackEvent('ui', 'exportBtnClicked');
	}

	render() {
		return (
			<div>
				<div class="main-container">
					<MainHeader
						externalLibCount={this.state.externalLibCount}
						openBtnHandler={this.openBtnClickHandler.bind(this)}
						newBtnHandler={this.newBtnClickHandler.bind(this)}
						saveBtnHandler={this.saveBtnClickHandler.bind(this)}
						loginBtnHandler={this.loginBtnClickHandler.bind(this)}
						profileBtnHandler={this.profileBtnClickHandler.bind(this)}
						addLibraryBtnHandler={this.openAddLibrary.bind(this)}
						runBtnClickHandler={this.runBtnClickHandler.bind(this)}
						isFetchingItems={this.state.isFetchingItems}
						isSaving={this.state.isSaving}
						title={this.state.currentItem.title}
						titleInputBlurHandler={this.titleInputBlurHandler.bind(this)}
						user={this.state.user}
						unsavedEditCount={this.state.unsavedEditCount}
					/>
					<ContentWrap
						currentLayoutMode={this.state.currentLayoutMode}
						currentItem={this.state.currentItem}
						onCodeChange={this.onCodeChange.bind(this)}
						onCodeModeChange={this.onCodeModeChange.bind(this)}
						onRef={comp => (this.contentWrap = comp)}
						prefs={this.state.prefs}
					/>
					<div class="global-console-container" id="globalConsoleContainerEl" />
					<Footer
						layoutBtnClickHandler={this.layoutBtnClickHandler.bind(this)}
						helpBtnClickHandler={() => this.setState({ isHelpModalOpen: true })}
						settingsBtnClickHandler={() =>
							this.setState({ isSettingsModalOpen: true })
						}
						notificationsBtnClickHandler={() =>
							this.setState({ notificationsBtnClickHandler: true })
						}
						supportDeveloperBtnClickHandler={() =>
							this.setState({
								isSupportDeveloperModalOpen: true
							})
						}
						detachedPreviewBtnHandler={this.detachedPreviewBtnHandler.bind(
							this
						)}
						codepenBtnClickHandler={this.codepenBtnClickHandler.bind(this)}
						saveHtmlBtnClickHandler={this.saveHtmlBtnClickHandler.bind(this)}
						keyboardShortcutsBtnClickHandler={() =>
							this.setState({ isKeyboardShortcutsModalOpen: true })
						}
						hasUnseenChangelog={this.state.hasUnseenChangelog}
					/>
				</div>

				<SavedItemPane
					items={this.state.savedItems}
					isOpen={this.state.isSavedItemPaneOpen}
					closeHandler={this.closeSavedItemsPane.bind(this)}
					itemClickHandler={this.itemClickHandler.bind(this)}
					itemRemoveBtnClickHandler={this.itemRemoveBtnClickHandler.bind(this)}
					itemForkBtnClickHandler={this.itemForkBtnClickHandler.bind(this)}
					exportBtnClickHandler={this.exportBtnClickHandler.bind(this)}
				/>
				<div class="alerts-container" id="js-alerts-container" />
				<form
					style="display:none;"
					action="https://codepen.io/pen/define"
					method="POST"
					target="_blank"
					id="js-codepen-form"
				>
					<input
						type="hidden"
						name="data"
						value="{&quot;title&quot;: &quot;New Pen!&quot;, &quot;html&quot;: &quot;<div>Hello, World!</div>&quot;}"
					/>
				</form>

				<Modal
					show={this.state.isAddLibraryModalOpen}
					closeHandler={() => this.setState({ isAddLibraryModalOpen: false })}
				>
					<AddLibrary
						js={
							this.state.currentItem.externalLibs
								? this.state.currentItem.externalLibs.js
								: ''
						}
						css={
							this.state.currentItem.externalLibs
								? this.state.currentItem.externalLibs.css
								: ''
						}
						onChange={this.onExternalLibChange.bind(this)}
					/>
				</Modal>
				<Modal
					show={this.state.isNotificationsModalOpen}
					closeHandler={() =>
						this.setState({ isNotificationsModalOpen: false })
					}
				>
					<Notifications />
				</Modal>
				<Modal
					show={this.state.isSettingsModalOpen}
					closeHandler={() => this.setState({ isSettingsModalOpen: false })}
				>
					<Settings
						prefs={this.state.prefs}
						onChange={this.updateSetting.bind(this)}
					/>
				</Modal>
				<Modal
					show={this.state.isLoginModalOpen}
					closeHandler={() => this.setState({ isLoginModalOpen: false })}
				>
					<Login />
				</Modal>
				<Modal
					show={this.state.isProfileModalOpen}
					closeHandler={() => this.setState({ isProfileModalOpen: false })}
				>
					<Profile
						user={this.state.user}
						logoutBtnHandler={this.logout.bind(this)}
					/>
				</Modal>
				<HelpModal
					show={this.state.isHelpModalOpen}
					closeHandler={() => this.setState({ isHelpModalOpen: false })}
				/>
				<SupportDeveloperModal
					show={this.state.isSupportDeveloperModalOpen}
					closeHandler={() =>
						this.setState({ isSupportDeveloperModalOpen: false })
					}
				/>
				<KeyboardShortcutsModal
					show={this.state.isKeyboardShortcutsModalOpen}
					closeHandler={() =>
						this.setState({ isKeyboardShortcutsModalOpen: false })
					}
				/>

				<div class="modal-overlay" />

				<svg
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					style={{ display: 'none' }}
				>
					<symbol id="logo" viewBox="-145 -2 372 175">
						<g
							stroke="none"
							strokeWidth={1}
							fill="none"
							fillRule="evenodd"
							transform="translate(-145.000000, -1.000000)"
						>
							<polygon
								id="Path-1"
								fill="#FF4600"
								points="31 0 232 0 132 173.310547"
							/>
							<polygon
								id="Path-1"
								fill="#FF6C00"
								points="0 0 201 0 101 173.310547"
							/>
							<polygon
								id="Path-1"
								fill="#FF6C00"
								transform="translate(271.500000, 86.500000) scale(1, -1) translate(-271.500000, -86.500000) "
								points="171 0 372 0 272 173.310547"
							/>
							<polygon
								id="Path-1"
								fill="#FF4600"
								transform="translate(241.500000, 86.500000) scale(1, -1) translate(-241.500000, -86.500000) "
								points="141 0 342 0 242 173.310547"
							/>
						</g>
					</symbol>
					<symbol id="bug-icon" viewBox="0 0 24 24">
						<path d="M14,12H10V10H14M14,16H10V14H14M20,8H17.19C16.74,7.22 16.12,6.55 15.37,6.04L17,4.41L15.59,3L13.42,5.17C12.96,5.06 12.5,5 12,5C11.5,5 11.04,5.06 10.59,5.17L8.41,3L7,4.41L8.62,6.04C7.88,6.55 7.26,7.22 6.81,8H4V10H6.09C6.04,10.33 6,10.66 6,11V12H4V14H6V15C6,15.34 6.04,15.67 6.09,16H4V18H6.81C7.85,19.79 9.78,21 12,21C14.22,21 16.15,19.79 17.19,18H20V16H17.91C17.96,15.67 18,15.34 18,15V14H20V12H18V11C18,10.66 17.96,10.33 17.91,10H20V8Z" />
					</symbol>
					<symbol id="google-icon" viewBox="0 0 24 24">
						<path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z" />
					</symbol>
					<symbol id="fb-icon" viewBox="0 0 24 24">
						<path d="M17,2V2H17V6H15C14.31,6 14,6.81 14,7.5V10H14L17,10V14H14V22H10V14H7V10H10V6A4,4 0 0,1 14,2H17Z" />
					</symbol>
					<symbol id="github-icon" viewBox="0 0 24 24">
						<path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
					</symbol>
					<symbol id="settings-icon" viewBox="0 0 24 24">
						<path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
					</symbol>
					<symbol id="twitter-icon" viewBox="0 0 16 16">
						<path d="M15.969,3.058c-0.586,0.26-1.217,0.436-1.878,0.515c0.675-0.405,1.194-1.045,1.438-1.809 c-0.632,0.375-1.332,0.647-2.076,0.793c-0.596-0.636-1.446-1.033-2.387-1.033c-1.806,0-3.27,1.464-3.27,3.27 c0,0.256,0.029,0.506,0.085,0.745C5.163,5.404,2.753,4.102,1.14,2.124C0.859,2.607,0.698,3.168,0.698,3.767 c0,1.134,0.577,2.135,1.455,2.722C1.616,6.472,1.112,6.325,0.671,6.08c0,0.014,0,0.027,0,0.041c0,1.584,1.127,2.906,2.623,3.206 C3.02,9.402,2.731,9.442,2.433,9.442c-0.211,0-0.416-0.021-0.615-0.059c0.416,1.299,1.624,2.245,3.055,2.271 c-1.119,0.877-2.529,1.4-4.061,1.4c-0.264,0-0.524-0.015-0.78-0.046c1.447,0.928,3.166,1.469,5.013,1.469 c6.015,0,9.304-4.983,9.304-9.304c0-0.142-0.003-0.283-0.009-0.423C14.976,4.29,15.531,3.714,15.969,3.058z" />
					</symbol>
					<symbol id="heart-icon" viewBox="0 0 24 24">
						<path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
					</symbol>
					<symbol id="play-icon" viewBox="0 0 24 24">
						<svg>
							<path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
						</svg>
					</symbol>
					<symbol id="cancel-icon" viewBox="0 0 24 24">
						<svg>
							<path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12C4,13.85 4.63,15.55 5.68,16.91L16.91,5.68C15.55,4.63 13.85,4 12,4M12,20A8,8 0 0,0 20,12C20,10.15 19.37,8.45 18.32,7.09L7.09,18.32C8.45,19.37 10.15,20 12,20Z" />
						</svg>
					</symbol>
					<symbol id="chevron-icon" viewBox="0 0 24 24">
						<svg>
							<path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
						</svg>
					</symbol>
					<symbol id="chat-icon" viewBox="0 0 24 24">
						<path d="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M8,14H6V12H8V14M8,11H6V9H8V11M8,8H6V6H8V8M15,14H10V12H15V14M18,11H10V9H18V11M18,8H10V6H18V8Z" />
					</symbol>
					<symbol id="gift-icon" viewBox="0 0 24 24">
						<path d="M22,12V20A2,2 0 0,1 20,22H4A2,2 0 0,1 2,20V12A1,1 0 0,1 1,11V8A2,2 0 0,1 3,6H6.17C6.06,5.69 6,5.35 6,5A3,3 0 0,1 9,2C10,2 10.88,2.5 11.43,3.24V3.23L12,4L12.57,3.23V3.24C13.12,2.5 14,2 15,2A3,3 0 0,1 18,5C18,5.35 17.94,5.69 17.83,6H21A2,2 0 0,1 23,8V11A1,1 0 0,1 22,12M4,20H11V12H4V20M20,20V12H13V20H20M9,4A1,1 0 0,0 8,5A1,1 0 0,0 9,6A1,1 0 0,0 10,5A1,1 0 0,0 9,4M15,4A1,1 0 0,0 14,5A1,1 0 0,0 15,6A1,1 0 0,0 16,5A1,1 0 0,0 15,4M3,8V10H11V8H3M13,8V10H21V8H13Z" />
						<symbol id="gift-icon" viewBox="0 0 24 24" />
						<symbol id="cross-icon" viewBox="0 0 24 24">
							<path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
						</symbol>
						<symbol id="keyboard-icon" viewBox="0 0 24 24">
							<path d="M19,10H17V8H19M19,13H17V11H19M16,10H14V8H16M16,13H14V11H16M16,17H8V15H16M7,10H5V8H7M7,13H5V11H7M8,11H10V13H8M8,8H10V10H8M11,11H13V13H11M11,8H13V10H11M20,5H4C2.89,5 2,5.89 2,7V17A2,2 0 0,0 4,19H20A2,2 0 0,0 22,17V7C22,5.89 21.1,5 20,5Z" />
						</symbol>
						<symbol id="mode-icon" viewBox="0 0 100 100">
							<g>
								<rect x={0} y={0} width={28} height={47} />
								<rect x={36} y={0} width={28} height={47} />
								<rect x={72} y={0} width={28} height={47} />
								<rect x={0} y={53} width={100} height={47} />
							</g>
						</symbol>
						<symbol id="vertical-mode-icon" viewBox="0 0 100 100">
							<g>
								<rect x={0} y={0} width={20} height={100} />
								<rect x={23} y={0} width={20} height={100} />
								<rect x={46} y={0} width={20} height={100} />
								<rect x={69} y={0} width={32} height={100} />
							</g>
						</symbol>
						<symbol id="loader-icon" viewBox="0 0 44 44">
							{'{'}/* By Sam Herbert (@sherb), for everyone. More @
							http://goo.gl/7AJzbL */{'}'}
							<g fill="none" fillRule="evenodd" strokeWidth={10}>
								<circle cx={22} cy={22} r={1}>
									<animate
										attributeName="r"
										begin="0s"
										dur="1.8s"
										values="1; 20"
										calcMode="spline"
										keyTimes="0; 1"
										keySplines="0.165, 0.84, 0.44, 1"
										repeatCount="indefinite"
									/>
									<animate
										attributeName="stroke-opacity"
										begin="0s"
										dur="1.8s"
										values="1; 0"
										calcMode="spline"
										keyTimes="0; 1"
										keySplines="0.3, 0.61, 0.355, 1"
										repeatCount="indefinite"
									/>
								</circle>
								<circle cx={22} cy={22} r={1}>
									<animate
										attributeName="r"
										begin="-0.9s"
										dur="1.8s"
										values="1; 20"
										calcMode="spline"
										keyTimes="0; 1"
										keySplines="0.165, 0.84, 0.44, 1"
										repeatCount="indefinite"
									/>
									<animate
										attributeName="stroke-opacity"
										begin="-0.9s"
										dur="1.8s"
										values="1; 0"
										calcMode="spline"
										keyTimes="0; 1"
										keySplines="0.3, 0.61, 0.355, 1"
										repeatCount="indefinite"
									/>
								</circle>
							</g>
						</symbol>
					</symbol>
				</svg>
				<form
					style="display:none;"
					action="https://codepen.io/pen/define"
					method="POST"
					target="_blank"
					id="codepenForm"
				>
					<input
						type="hidden"
						name="data"
						value="{&quot;title&quot;: &quot;New Pen!&quot;, &quot;html&quot;: &quot;<div>Hello, World!</div>&quot;}"
					/>
				</form>
			</div>
		);
	}
}
