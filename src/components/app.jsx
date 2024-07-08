/* global htmlCodeEl, cssCodeEl, jsCodeEl
 */

import { h, Component } from 'preact';
import { route } from 'preact-router';
// import '../service-worker-registration';
import { MainHeader } from './MainHeader.jsx';
import ContentWrap from './ContentWrap.jsx';
import ContentWrapFiles from './ContentWrapFiles.jsx';
import { Footer } from './Footer.jsx';
import SavedItemPane from './SavedItemPane.jsx';
import AddLibrary from './AddLibrary.jsx';
import Modal from './Modal.jsx';
import Login from './Login.jsx';
import { computeHtml, computeCss, computeJs } from '../computes';
import {
	log,
	generateRandomId,
	semverCompare,
	saveAsHtml,
	handleDownloadsPermission,
	downloadFile,
	getCompleteHtml,
	getFilenameFromUrl,
	prettify,
	sanitizeSplitSizes,
	persistAuthUserLocally
} from '../utils';
import {
	linearizeFiles,
	assignFilePaths,
	getFileFromPath,
	removeFileAtPath,
	doesFileExistInFolder,
	importGithubRepo
} from '../fileUtils';

import { itemService } from '../itemService';
import '../db';
import { Changelog } from './Changelog';
import Settings from './Settings.jsx';
import { modes, HtmlModes, CssModes, JsModes } from '../codeModes';
import { trackEvent } from '../analytics';
import { deferred } from '../deferred';
import { alertsService } from '../notifications';
import { auth } from '../firebaseInit';
import { onAuthStateChanged } from 'firebase/auth';
import { Profile } from './Profile';
import { authh } from '../auth';
import { SupportDeveloperModal } from './SupportDeveloperModal';
import { KeyboardShortcutsModal } from './KeyboardShortcutsModal';
import { takeScreenshot } from '../takeScreenshot';
import { AskToImportModal } from './AskToImportModal';
import { Alerts } from './Alerts';
import Portal from './Portal';
import { HelpModal } from './HelpModal';
import { OnboardingModal } from './OnboardingModal';
import { Js13KModal } from './Js13KModal';
import { CreateNewModal } from './CreateNewModal';
import { Icons } from './Icons';
import JSZip from 'jszip';
import { CommandPalette } from './CommandPalette';
import {
	OPEN_SAVED_CREATIONS_EVENT,
	SAVE_EVENT,
	OPEN_SETTINGS_EVENT,
	NEW_CREATION_EVENT,
	SHOW_KEYBOARD_SHORTCUTS_EVENT
} from '../commands';
import { commandPaletteService } from '../commandPaletteService';

import { I18nProvider } from '@lingui/react';
import { Assets } from './Assets.jsx';
import { LocalStorageKeys } from '../constants.js';
import { Share } from './Share.jsx';
import { Pro } from './Pro.jsx';
import { VStack } from './Stack.jsx';
import { ProBadge } from './ProBadge.jsx';
import { Text } from './Text.jsx';
import { ProOnAppModal } from './ProOnAppModal.js';

if (module.hot) {
	require('preact/debug');
}

const UNSAVED_WARNING_COUNT = 15;
const version = '6.4.0';

// Read forced settings as query parameters
window.forcedSettings = {};
window.codeHtml = '';
window.codeCss = '';
if (location.search) {
	let match = location.search.replace(/^\?/, '').match(/settings=([^=]*)/);
	if (match) {
		match = match[1];
		match.split(',').map(pair => {
			pair = pair.split(':');
			if (pair[1] === 'true') pair[1] = true;
			else if (pair[1] === 'false') pair[1] = false;
			window.forcedSettings[pair[0]] = pair[1];
		});
	}

	const params = new URLSearchParams(location.search);
	window.codeHtml = params.get('html') || '';
	window.codeCss = params.get('css') || '';
}

function customRoute(path) {
	// we don't /create redirections on extension since SPA paths don't work there.
	if (window.IS_EXTENSION) return;

	// And also for logged out users, since it will send them to /create/ID and refreshing
	// that will try to find that creation in their database, which doesn't exist. LOgged out
	// users anyways can't do anything with the urls.
	// Exception is /create. this is needed because a logged out user can visit a /create/ID
	// of some other user and then create a new item...at which point they shud come back
	// to /create
	if (!window.user && path !== '/create') return;
	else {
		route(path);
	}
}

export default class App extends Component {
	constructor() {
		super();
		this.AUTO_SAVE_INTERVAL = 15000; // 15 seconds
		const savedUser = window.localStorage.getItem('user');
		this.modalDefaultStates = {
			isModalOpen: false,
			isAddLibraryModalOpen: false,
			isSettingsModalOpen: false,
			isHelpModalOpen: false,
			isNotificationsModalOpen: false,
			isLoginModalOpen: false,
			isProfileModalOpen: false,
			isSupportDeveloperModalOpen: false,
			isKeyboardShortcutsModalOpen: false,
			isAskToImportModalOpen: false,
			isOnboardModalOpen: false,
			isJs13KModalOpen: false,
			isCreateNewModalOpen: false,
			isCommandPaletteOpen: false,
			isAssetsOpen: false,
			isShareModalOpen: false,
			isProModalOpen: false,
			isFilesLimitModalOpen: false,
			isProOnAppModalOpen: false
		};
		this.state = {
			isSavedItemPaneOpen: false,
			...this.modalDefaultStates,
			prefs: {},
			currentItem: {
				title: '',
				externalLibs: { js: '', css: '' },
				html: window.codeHtml,
				css: window.codeCss
			},
			catalogs: {},
			user: savedUser
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
			layoutMode: 2,
			isJs13kModeOn: false,
			autoCloseTags: true,
			lang: 'en',
			isMonacoEditorOn: false,
			previewDelay: 500
		};
		this.prefs = {};

		if (savedUser) {
			window.user = savedUser;
		}

		onAuthStateChanged(auth, authUser => {
			this.setState({ isLoginModalOpen: false });
			if (authUser) {
				log('You are -> ', authUser);
				alertsService.add('You are now logged in!');

				let newUser = {
					uid: authUser.uid,
					photoURL: authUser.photoURL
				};
				// port some keys from localstorage user to new auth user
				const keysToPort = ['isPro', 'displayName', 'settings'];
				keysToPort.forEach(key => {
					if (this.state.user && this.state.user[key] !== undefined) {
						newUser[key] = this.state.user[key];
					}
				});
				// storing actual firebase user object for accessing functions like updateProfile
				newUser.firebaseUser = authUser;

				this.setState({ user: newUser });
				window.user = newUser;
				// window.localStorage.setItem('user', authUser);

				if (!window.localStorage[LocalStorageKeys.ASKED_TO_IMPORT_CREATIONS]) {
					this.fetchItems(false, true).then(items => {
						if (!items.length) {
							return;
						}
						this.oldSavedItems = items;
						this.oldSavedCreationsCount = items.length;
						this.setState({
							isAskToImportModalOpen: true
						});
						trackEvent('ui', 'askToImportModalSeen');
					});
				}

				window.db.getUser(authUser.uid).then(customUser => {
					if (customUser) {
						const prefs = { ...this.state.prefs };
						Object.assign(prefs, customUser.settings);

						// spreading authUser doesn't work below anymore because the required properties are
						// not enumerable anymore
						newUser = {
							...newUser,
							isPro: false,
							...customUser
						};
						window.user = newUser;
						this.setState({ user: newUser, prefs }, this.updateSetting);
					}
					persistAuthUserLocally(newUser);
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
			if (this.detachedWindow) {
				this.detachedWindow.close();
			}
		};
		window.onbeforeunload = event => {
			if (this.state.unsavedEditCount) {
				event.preventDefault();
				// Chrome requires returnValue to be set.
				event.returnValue = '';
			}
		};

		db.local.get(
			{
				layoutMode: 1,
				code: ''
			},
			result => {
				this.toggleLayout(result.layoutMode);
				this.state.prefs.layoutMode = result.layoutMode;
				if (result.code) {
					lastCode = result.code;
				}
			}
		);

		// Get synced `preserveLastCode` setting to get back last code (or not).
		db.getSettings(this.defaultSettings).then(result => {
			if (window.codeHtml || window.codeCss) {
				log('Load item from query params', lastCode);
				this.prettifyHandler('html');
				this.prettifyHandler('css');
				this.setCurrentItem(this.state.currentItem).then(() => {
					this.refreshEditor();
				});
			} else if (this.props.itemId) {
				window.db
					.fetchItem(this.props.itemId)
					.then(item => {
						this.setCurrentItem(item).then(() => this.refreshEditor());
					})
					.catch(err => {
						alert('No such creation found!');
						this.createNewItem();

						// route('/');
					});
			} else if (result.preserveLastCode && lastCode) {
				this.setState({ unsavedEditCount: 0 });
				log('Load last unsaved item', lastCode);
				this.setCurrentItem(lastCode).then(() => this.refreshEditor());
			} else {
				this.createNewItem();
			}
			Object.assign(this.state.prefs, result);
			this.setState({ prefs: { ...this.state.prefs } }, this.updateSetting);
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
				//once(document, 'overlaysClosed', function() {});
			}
			// If its an upgrade
			if (
				lastSeenVersion &&
				semverCompare(lastSeenVersion, version) === -1 &&
				!window.localStorage.pledgeModalSeen
			) {
				// this.openSupportDeveloperModal();
				// window.localStorage.pledgeModalSeen = true;
			}

			if (!lastSeenVersion || semverCompare(lastSeenVersion, version) === -1) {
				this.setState({ hasUnseenChangelog: true });
				this.hasSeenNotifications = false;
			}
		});
	}

	async loadLanguage(lang) {
		log('🇯🇲 fetching defninition');

		const catalog = await import(
			/* webpackMode: "lazy", webpackChunkName: "i18n-[index]" */ `../locales/${lang}/messages.js`
		);

		this.setState(state => ({
			catalogs: {
				...state.catalogs,
				[lang]: catalog.default
			}
		}));
	}

	incrementUnsavedChanges() {
		this.setState(prevState => {
			const newCount = prevState.unsavedEditCount + 1;

			if (
				newCount % UNSAVED_WARNING_COUNT === 0 &&
				newCount >= UNSAVED_WARNING_COUNT
			) {
				window.saveBtn.classList.add('animated');
				window.saveBtn.classList.add('wobble');
				window.saveBtn.addEventListener('animationend', () => {
					window.saveBtn.classList.remove('animated');
					window.saveBtn.classList.remove('wobble');
				});
			}

			return { unsavedEditCount: newCount };
		});
	}

	updateProfileUi() {
		this.setState(prevState => {
			if (prevState.user) {
				document.body.classList.add('is-logged-in');
			} else {
				document.body.classList.remove('is-logged-in');
			}
			return null;
		});
	}

	refreshEditor() {
		this.toggleLayout(
			this.state.currentItem.layoutMode || this.state.prefs.layoutMode
		);
		this.updateExternalLibCount();
		this.contentWrap.refreshEditor();
	}
	askForUnsavedChanges() {
		return confirm(
			'You have unsaved changes in your current work. Do you want to discard unsaved changes and continue?'
		);
	}
	// Creates a new item with passed item's contents
	forkItem(sourceItem) {
		if (this.state.unsavedEditCount) {
			var shouldDiscard = this.askForUnsavedChanges();
			if (!shouldDiscard) {
				return;
			}
		}
		const fork = JSON.parse(JSON.stringify(sourceItem));
		delete fork.id;
		delete fork.createdBy;
		delete fork.isPublic;
		fork.title = '(Forked) ' + sourceItem.title;
		fork.updatedOn = Date.now();
		this.setCurrentItem(fork).then(() => this.refreshEditor());
		customRoute('/create');
		alertsService.add(`"${sourceItem.title}" was forked`);
		trackEvent('fn', 'itemForked');
	}
	createNewItem(isFileMode = false, files) {
		const d = new Date();
		let item = {
			title:
				'Untitled ' +
				d.getDate() +
				'-' +
				(d.getMonth() + 1) +
				'-' +
				d.getHours() +
				':' +
				d.getMinutes(),
			createdOn: +d,
			content: ''
		};
		if (isFileMode) {
			item = {
				...item,
				files: assignFilePaths(
					files || [
						{
							name: 'index.html',
							content: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Webmaker untitled 1</title>
    <link rel="stylesheet" href="styles/style.css" />
  </head>
  <body>
    Hello World
    <script src="script.js"></script>
  </body>
</html>`
						},
						{
							name: 'styles',
							isFolder: true,
							children: [{ name: 'style.css', content: '' }]
						},
						{ name: 'script.js', content: '' }
					]
				)
			};
		} else {
			item = {
				...item,
				html: '',
				css: '',
				js: '',
				externalLibs: { js: '', css: '' },
				layoutMode: this.state.currentLayoutMode
			};
		}
		this.setCurrentItem(item).then(() => this.refreshEditor());
		customRoute('/create');
		alertsService.add('New item created');
	}
	openItem(item) {
		this.setCurrentItem(item).then(() => this.refreshEditor());
		customRoute(`/create/${item.id}`);
		alertsService.add('Saved item loaded');
	}
	removeItem(item) {
		var answer = confirm(`Are you sure you want to delete "${item.title}"?`);
		if (!answer) {
			return;
		}

		// Remove from items list
		itemService.unsetItemForUser(item.id);

		// Remove individual item too.
		itemService.removeItem(item.id).then(() => {
			alertsService.add('Item removed.', item);
			// This item is open in the editor. Lets open a new one.
			if (this.state.currentItem.id === item.id) {
				this.createNewItem();
			}
		});

		// Remove from cached list
		delete this.state.savedItems[item.id];
		this.setState({
			savedItems: { ...this.state.savedItems }
		});

		trackEvent('fn', 'itemRemoved');
	}
	setCurrentItem(item) {
		const d = deferred();
		// TODO: remove later
		if (!item.files) {
			item.htmlMode =
				item.htmlMode || this.state.prefs.htmlMode || HtmlModes.HTML;
			item.cssMode = item.cssMode || this.state.prefs.cssMode || CssModes.CSS;
			item.jsMode = item.jsMode || this.state.prefs.jsMode || JsModes.JS;
		}

		this.setState({ currentItem: item }, () => {
			d.resolve();
			// savecode will try to get split sizes from DOM, and DOM
			// will update after sometime. so delay the saving
			setTimeout(() => {
				// Save locally so that something which is simply opened (or created newly) and closed without save can opened the next time
				this.saveCode('code');
			}, 2000);
		});

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
		// TODO: sort desc. by updation date
		// this.setState({
		// 	savedItems: { ...this.state.savedItems }
		// });

		this.toggleSavedItemsPane();
		// HACK: Set overflow after sometime so that the items can animate without getting cropped.
		// setTimeout(() => $('#js-saved-items-wrap').style.overflowY = 'auto', 1000);
	}
	toggleSavedItemsPane(shouldOpen) {
		this.setState(prevState => {
			const isSavedItemPaneOpen =
				shouldOpen === undefined ? !prevState.isSavedItemPaneOpen : shouldOpen;

			document.body.classList[isSavedItemPaneOpen ? 'add' : 'remove'](
				'overlay-visible'
			);

			return {
				isSavedItemPaneOpen
			};
		});
	}

	/**
	 * Fetches all items from storage
	 * @param  {boolean} shouldSaveGlobally Whether to store the fetched items in global arr for later use.
	 * @param  {boolean} shouldFetchLocally Intentionally get local items. Used when importing local items to account.
	 * @return {promise}                    Promise.
	 */
	async fetchItems(shouldSaveGlobally, shouldFetchLocally) {
		var items = [];
		const savedItems = {};

		items = await itemService.getAllItems(shouldFetchLocally);
		trackEvent('fn', 'fetchItems', items.length);
		if (shouldSaveGlobally) {
			items.forEach(item => {
				savedItems[item.id] = item;
			});
			this.setState({
				savedItems
			});
		}
		return items;
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
	assetsBtnClickHandler() {
		this.setState({ isAssetsOpen: true });
	}
	closeSavedItemsPane() {
		this.setState({
			isSavedItemPaneOpen: false
		});
		document.body.classList.remove('overlay-visible');

		if (this.editorWithFocus) {
			this.editorWithFocus.focus();
		}
	}
	openSettings() {
		this.setState({ isSettingsModalOpen: true });
	}
	openKeyboardShortcuts() {
		this.setState({ isKeyboardShortcutsModalOpen: true });
	}

	componentDidMount() {
		function setBodySize() {
			document.body.style.height = `${window.innerHeight}px`;
		}
		window.addEventListener('resize', () => {
			setBodySize();
		});

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
			} else if (
				event.keyCode === 27 &&
				(event.target.tagName !== 'INPUT' || event.target.id === 'searchInput')
			) {
				// ESCAPE
				// TODO: whats written next doesn't make sense. Review it.
				// We might be listening on keydown for some input inside the app, UNLESS its
				// the search input in saved items pane. In that case
				// we don't want this to trigger which in turn focuses back the last editor.
				this.closeSavedItemsPane();
			} else if ((event.ctrlKey || event.metaKey) && event.keyCode === 80) {
				// cmd+shift+P and this is Firefox, do nothing
				if (event.shiftKey && navigator.userAgent.match(/Firefox/)) {
					return true;
				}
				this.setState({
					isCommandPaletteOpen: true,
					isCommandPaletteInCommandMode: !!event.shiftKey
				});
				trackEvent(
					'ui',
					'openCommandPaletteKeyboardShortcut',
					!!event.shiftKey ? 'command' : 'files'
				);
				event.preventDefault();
			} else if (event.key === 'F1' && navigator.userAgent.match(/Firefox/)) {
				// On firefox, open command palette with F1 because Cmd+Shift+P
				// is for opening private window
				this.setState({
					isCommandPaletteOpen: true,
					isCommandPaletteInCommandMode: true
				});
				trackEvent('ui', 'openCommandPaletteKeyboardShortcut', 'command');
				event.preventDefault();
			}
		});

		// Basic Focus trapping
		window.addEventListener('focusin', e => {
			if (document.body.classList.contains('overlay-visible')) {
				const modal = $('.is-modal-visible');
				if (!modal) {
					return;
				}
				if (!modal.contains(e.target)) {
					e.preventDefault();
					modal.querySelector('.js-modal__close-btn').focus();
				}
			}
		});
		const commandPalleteHooks = {
			[NEW_CREATION_EVENT]: () => {
				this.openNewCreationModal();
			},
			[OPEN_SAVED_CREATIONS_EVENT]: () => {
				this.openSavedItemsPane();
			},
			[SAVE_EVENT]: () => {
				this.saveItem();
			},
			[OPEN_SETTINGS_EVENT]: () => {
				this.openSettings();
			},
			[SHOW_KEYBOARD_SHORTCUTS_EVENT]: () => {
				this.openKeyboardShortcuts();
			}
		};
		for (let eventName in commandPalleteHooks) {
			commandPaletteService.subscribe(
				eventName,
				commandPalleteHooks[eventName]
			);
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		const { catalogs } = nextState;
		const { lang } = nextState.prefs;

		if (lang && lang !== 'en' && !catalogs[lang]) {
			this.loadLanguage(lang);
		}

		return true;
	}

	closeAllOverlays() {
		if (this.state.isSavedItemPaneOpen) {
			this.closeSavedItemsPane();
		}

		this.setState({
			...this.modalDefaultStates
		});
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
		if (!this.state.currentItem.externalLibs) {
			return;
		}
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
		mode = window.innerWidth < 600 ? 2 : mode;

		if (this.state.currentLayoutMode === mode) {
			this.contentWrap.resetSplitting();
			// mainSplitInstance.setSizes(getMainSplitSizesToApply());
			// codeSplitInstance.setSizes(currentItem.sizes || [33.33, 33.33, 33.33]);
			this.setState({ currentLayoutMode: mode });
			return;
		}
		// Remove all layout classes
		[1, 2, 3, 4, 5].forEach(layoutNumber => {
			window[`layoutBtn${layoutNumber}`].classList.remove('selected');
			document.body.classList.remove(`layout-${layoutNumber}`);
		});
		$('#layoutBtn' + mode).classList.add('selected');
		document.body.classList.add('layout-' + mode);

		this.setState({ currentLayoutMode: mode }, () => {
			this.contentWrap.resetSplitting();
			this.contentWrap.setPreviewContent(true);
		});
	}

	layoutBtnClickHandler(layoutId) {
		if (layoutId === this.state.currentLayoutMode) {
			layoutId = 2;
		}
		this.saveSetting('layoutMode', layoutId);
		trackEvent('ui', 'toggleLayoutClick', layoutId);
		this.toggleLayout(layoutId);
	}

	// Calculates the sizes of html, css & js code panes.
	getCodePaneSizes() {
		var sizes;
		const currentLayoutMode = this.state.currentLayoutMode;
		var dimensionProperty =
			currentLayoutMode === 2 || currentLayoutMode === 5 ? 'width' : 'height';
		try {
			sizes = [
				htmlCodeEl.style[dimensionProperty],
				cssCodeEl.style[dimensionProperty],
				jsCodeEl.style[dimensionProperty]
			];
		} catch (e) {
			sizes = [33.33, 33.33, 33.33];
		} finally {
			/* eslint-disable no-unsafe-finally */
			return sanitizeSplitSizes(sizes);

			/* eslint-enable no-unsafe-finally */
		}
	}

	// Calculates the current sizes of code & preview panes.
	getMainPaneSizes() {
		let sizes;

		function getPercentFromDimension(el, dimension = 'width') {
			const match = el.style[dimension].match(/[\d.]+(%|px)/);
			if (match) {
				return match[0];
			}
			return null;
		}

		// File mode
		if (this.state.currentItem && this.state.currentItem.files) {
			const sidebarWidth = 200;

			sizes = [
				getPercentFromDimension($('#js-sidebar')),
				getPercentFromDimension($('#js-code-side')),
				getPercentFromDimension($('#js-demo-side'))
			];

			// Check if anything was returned falsy, reset in that case
			if (sizes.filter(s => s).length !== 3) {
				sizes = [
					`${sidebarWidth}px`,
					`calc(50% - ${sidebarWidth / 2}px)`,
					`calc(50% - ${sidebarWidth / 2}px)`
				];
			}
			return sanitizeSplitSizes(sizes);
		}

		const currentLayoutMode = this.state.currentLayoutMode;
		var dimensionProperty = currentLayoutMode === 2 ? 'height' : 'width';
		try {
			sizes = [
				getPercentFromDimension($('#js-code-side'), dimensionProperty),
				getPercentFromDimension($('#js-demo-side'), dimensionProperty)
			];

			if (sizes.filter(s => s).length !== 2) {
				sizes = [50, 50];
			}
		} catch (e) {
			sizes = [50, 50];
		} finally {
			/* eslint-disable no-unsafe-finally */
			return sanitizeSplitSizes(sizes);

			/* eslint-enable no-unsafe-finally */
		}
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
		const { currentItem } = this.state;
		currentItem.updatedOn = Date.now();
		currentItem.layoutMode = this.state.currentLayoutMode;

		currentItem.mainSizes = this.getMainPaneSizes();
		if (!currentItem.files) {
			currentItem.sizes = this.getCodePaneSizes();
		}

		log('saving key', key || currentItem.id, currentItem);

		function onSaveComplete() {
			// No feedback on saving `code` key. Its just to silently preserve
			// last written code.
			if (key === 'code') {
				return;
			}
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
			.setItem(key || currentItem.id, currentItem)
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
				this.closeAllOverlays();
				this.setState({ isLoginModalOpen: true });
				return;
			}
			trackEvent('ui', LocalStorageKeys.LOGIN_AND_SAVE_MESSAGE_SEEN, 'local');
		}
		var isNewItem = !this.state.currentItem.id;
		this.state.currentItem.id = this.state.currentItem.id || generateRandomId();
		if (
			this.state.currentItem.createdBy &&
			this.state.currentItem.createdBy !== this.state.user.uid
		) {
			alertsService.add(
				'You cannot save this item as it was created by someone else. Fork it to save it as your own.'
			);
			return;
		}
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
		if (this.state.currentItem.files) {
			linearizeFiles(this.state.currentItem.files).map(file => {
				if (file.path === type.path) {
					file.content = code;
				}
			});
		} else {
			this.state.currentItem[type] = code;
		}
		if (isUserChange) {
			this.incrementUnsavedChanges();
		}
		if (this.state.prefs.isJs13kModeOn) {
			// Throttling codesize calculation
			if (this.codeSizeCalculationTimeout) {
				clearTimeout(this.codeSizeCalculationTimeout);
			}
			this.codeSizeCalculationTimeout = setTimeout(() => {
				this.calculateCodeSize();
				this.codeSizeCalculationTimeout = null;
			}, 1000);
		}
	}
	onCodeSettingsChange(type, settings) {
		this.state.currentItem[`${type}Settings`] = {
			acssConfig: settings
		};
	}

	titleInputBlurHandler(e) {
		this.setState(
			{
				currentItem: { ...this.state.currentItem, title: e.target.value }
			},
			() => {
				if (this.state.currentItem.id) {
					this.saveItem();
					trackEvent('ui', 'titleChanged');
				}
			}
		);
	}

	/**
	 * Handles all user triggered preference changes in the UI.
	 */
	updateSetting(settingName, value) {
		const prefs = { ...this.state.prefs };

		// If this was triggered from user interaction, save the setting
		if (settingName) {
			// var settingName = e.target.dataset.setting;
			var obj = {};
			log(settingName, value);
			// const prefs = { ...this.state.prefs };
			prefs[settingName] = value;
			obj[settingName] = prefs[settingName];
			this.setState({ prefs });

			// We always save locally so that it gets fetched
			// faster on future loads.
			db.sync.set(obj, function () {
				alertsService.add('Setting saved');
			});
			debugger;
			if (window.user) {
				db.updateUserSetting(window.user.uid, settingName, value)
					.then(arg => {
						log(`Setting "${settingName}" saved`, arg);
					})
					.catch(error => log(error));
			}
			trackEvent('ui', 'updatePref-' + settingName, prefs[settingName]);
		}

		this.contentWrap.applyCodemirrorSettings(prefs);

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
		authh.logout();
		this.setState({ isProfileModalOpen: false });
		this.createNewItem();
		alertsService.add('Log out successfull');
	}

	itemClickHandler(item) {
		setTimeout(() => {
			this.openItem(item);
		}, 350);
		this.toggleSavedItemsPane();
	}
	itemRemoveBtnClickHandler(item) {
		this.removeItem(item);
	}
	itemForkBtnClickHandler(item) {
		this.toggleSavedItemsPane();
		setTimeout(() => {
			this.forkItem(item);
		}, 350);
	}
	openNewCreationModal() {
		if (this.state.unsavedEditCount) {
			var shouldDiscard = confirm(
				'You have unsaved changes. Do you still want to create something new?'
			);
			if (shouldDiscard) {
				this.setState({
					isCreateNewModalOpen: true
				});
			}
		} else {
			this.setState({
				isCreateNewModalOpen: true
			});
		}
	}
	newBtnClickHandler() {
		trackEvent('ui', 'newBtnClick');
		this.openNewCreationModal();
	}
	openBtnClickHandler() {
		trackEvent('ui', 'openBtnClick');
		this.openSavedItemsPane();
	}
	shareBtnClickHandler() {
		trackEvent('ui', 'shareBtnClick');
		if (!window.user || this.state.currentItem.id) {
			this.setState({ isShareModalOpen: true });
		} else {
			alertsService.add('Please save your creation before sharing.');
		}
	}
	detachedPreviewBtnHandler() {
		trackEvent('ui', 'detachPreviewBtnClick');

		this.contentWrap.detachPreview();
	}
	notificationsBtnClickHandler() {
		this.setState({ isNotificationsModalOpen: true });

		if (!this.state.isNotificationsModalOpen && !this.hasSeenNotifications) {
			this.hasSeenNotifications = true;
			this.setState({ hasUnseenChangelog: false });
			window.db.setUserLastSeenVersion(version);
		}
		trackEvent('ui', 'notificationButtonClick', version);
		return false;
	}
	proBtnClickHandler() {
		if (this.state.user?.isPro) {
			this.setState({ isProfileModalOpen: true });
			trackEvent('ui', 'manageProBtnClick');
		} else {
			this.setState({ isProModalOpen: true });
			trackEvent('ui', 'proBtnClick');
		}
	}
	codepenBtnClickHandler(e) {
		if (this.state.currentItem.cssMode === CssModes.ACSS) {
			alert(
				"Oops! CodePen doesn't supports Atomic CSS currently. \nHere is something you can still do -> https://medium.com/web-maker/sharing-your-atomic-css-work-on-codepen-a402001b26ab"
			);
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
	saveHtmlBtnClickHandler(inlineAssets) {
		saveAsHtml(this.state.currentItem, { inlineAssets });
		trackEvent('ui', 'saveHtmlClick');
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
	screenshotBtnClickHandler(e) {
		this.contentWrap.getDemoFrame(frame => {
			takeScreenshot(frame.getBoundingClientRect());
		});
		e.preventDefault();
	}
	openSupportDeveloperModal() {
		this.closeAllOverlays();
		this.setState({
			isSupportDeveloperModalOpen: true
		});
	}
	supportDeveloperBtnClickHandler(e) {
		this.openSupportDeveloperModal(e);
	}

	/**
	 * Called from inside ask-to-import-modal
	 */
	dontAskToImportAnymore(e) {
		this.setState({ isAskToImportModalOpen: false });
		window.localStorage[LocalStorageKeys.ASKED_TO_IMPORT_CREATIONS] = true;
		if (e) {
			trackEvent('ui', 'dontAskToImportBtnClick');
		}
	}

	mergeImportedItems(items, isMergingToCloud = false) {
		var existingItemIds = [];
		var toMergeItems = {};
		const d = deferred();
		const { savedItems } = this.state;
		items.forEach(item => {
			// We can access `savedItems` here because this gets set when user
			// opens the saved creations panel. And import option is available
			// inside the saved items panel.

			// When we are merging to cloud, savedItems contains the local items. And if we start matching,
			// all items will match with themselves and nothing would import :P
			if (!isMergingToCloud && savedItems[item.id]) {
				// Item already exists
				existingItemIds.push(item.id);
			} else {
				// log('merging', item.id);
				toMergeItems[item.id] = item;
			}
		});
		var mergedItemCount = items.length - existingItemIds.length;
		if (existingItemIds.length) {
			var shouldReplace = confirm(
				existingItemIds.length +
					' creations already exist. Do you want to replace them?'
			);
			if (shouldReplace) {
				log('shouldreplace', shouldReplace);
				items.forEach(item => {
					toMergeItems[item.id] = item;
				});
				mergedItemCount = items.length;
			}
		}
		if (mergedItemCount) {
			alertsService.add(
				`Importing ${mergedItemCount} creation(s) in the background...`
			);
			itemService.saveItems(toMergeItems).then(() => {
				d.resolve();
				alertsService.add(
					`${mergedItemCount} creation(s) imported successfully.`
				);
				trackEvent('fn', 'itemsImported', mergedItemCount);
			});
		} else {
			d.resolve();
		}
		this.closeSavedItemsPane();
		return d.promise;
	}

	/**
	 * Called from inside ask-to-import-modal
	 */
	importCreationsAndSettingsIntoApp() {
		this.mergeImportedItems(this.oldSavedItems, true).then(() => {
			trackEvent('fn', 'oldItemsImported');
			this.dontAskToImportAnymore();
		});
	}

	editorFocusHandler(editor) {
		this.editorWithFocus = editor;
	}
	modalOverlayClickHandler() {
		this.closeAllOverlays();
	}

	splitUpdateHandler(sizes) {
		const { currentItem } = this.state;
		if (!sizes) {
			currentItem.mainSizes = this.getMainPaneSizes();
			currentItem.sizes = this.getCodePaneSizes();
			return;
		}
		// Not using setState to avoid re-render
		if (sizes.length === 3) {
			if (currentItem.files) {
				currentItem.mainSizes = sizes;
			} else {
				currentItem.sizes = sizes;
			}
		} else {
			currentItem.mainSizes = sizes;
		}
	}

	/**
	 * Calculate byte size of a text snippet
	 * @author Lea Verou
	 * MIT License
	 */
	calculateTextSize(text) {
		if (!text) {
			return 0;
		}
		var crlf = /(\r?\n|\r)/g,
			whitespace = /(\r?\n|\r|\s+)/g;

		const ByteSize = {
			count: function (text, options) {
				// Set option defaults
				options = options || {};
				options.lineBreaks = options.lineBreaks || 1;
				options.ignoreWhitespace = options.ignoreWhitespace || false;

				var length = text.length,
					nonAscii = length - text.replace(/[\u0100-\uFFFF]/g, '').length,
					lineBreaks = length - text.replace(crlf, '').length;

				if (options.ignoreWhitespace) {
					// Strip whitespace
					text = text.replace(whitespace, '');

					return text.length + nonAscii;
				} else {
					return (
						length +
						nonAscii +
						Math.max(0, options.lineBreaks * (lineBreaks - 1))
					);
				}
			},

			format: function (count, plainText) {
				var level = 0;

				while (count > 1024) {
					count /= 1024;
					level++;
				}

				// Round to 2 decimals
				count = Math.round(count * 100) / 100;

				level = ['', 'K', 'M', 'G', 'T'][level];

				return (
					(plainText ? count : '<strong>' + count + '</strong>') +
					' ' +
					level +
					'B'
				);
			}
		};

		return ByteSize.count(text);
	}
	getExternalLibCode() {
		const item = this.state.currentItem;
		var libs = (item.externalLibs && item.externalLibs.js) || '';
		libs += ('\n' + item.externalLibs && item.externalLibs.css) || '';
		libs = libs.split('\n').filter(lib => lib);
		return libs.map(lib =>
			fetch(lib)
				.then(res => res.text())
				.then(data => {
					return {
						code: data,
						fileName: getFilenameFromUrl(lib)
					};
				})
		);
	}
	calculateCodeSize() {
		const item = this.state.currentItem;
		var htmlPromise = computeHtml(item.html, item.htmlMode);
		var cssPromise = computeCss(item.css, item.cssMode);
		var jsPromise = computeJs(item.js, item.jsMode, false);
		Promise.all([
			htmlPromise,
			cssPromise,
			jsPromise,
			...this.getExternalLibCode()
		]).then(result => {
			var html = result[0].code || '',
				css = result[1].code || '',
				js = result[2].code || '';

			var fileContent = getCompleteHtml(html, css, js, item, true);

			// Replace external lib urls with local relative urls (picked from zip)
			fileContent = fileContent.replace(
				/<script src="(.*\/)([^/<]*?)"/g,
				'<script src="$2"'
			);

			var zip = new JSZip();
			zip.file('index.html', fileContent);
			for (let i = 3; i < result.length; i++) {
				const externalLib = result[i];
				zip.file(externalLib.fileName, externalLib.code);
			}

			var promise = null;
			if (0 && JSZip.support.uint8array) {
				promise = zip.generateAsync({ type: 'uint8array' });
			} else {
				promise = zip.generateAsync({
					type: 'base64',
					compression: 'DEFLATE',
					compressionOptions: {
						level: 9
					}
				});
			}

			promise.then(data => {
				const zipContent = data;
				const size = this.calculateTextSize(atob(data));
				this.setState({
					codeSize: size
				});
				this.currentItemZipBase64Data = data;
			});
		});
	}

	js13KHelpBtnClickHandler() {
		this.setState({
			isJs13KModalOpen: true
		});
	}
	js13KDownloadBtnClickHandler() {
		const a = document.createElement('a');
		a.setAttribute('download', this.state.currentItem.title);
		a.href = 'data:application/zip;base64,' + this.currentItemZipBase64Data;
		document.body.appendChild(a);
		a.click();
		a.remove();
	}
	blankTemplateSelectHandler() {
		this.createNewItem();
		this.setState({ isCreateNewModalOpen: false });
	}
	blankFileTemplateSelectHandler() {
		const create = () => {
			this.createNewItem(true);
			this.setState({ isCreateNewModalOpen: false });
		};
		if (this.state.user?.isPro) {
			create();
			return;
		}
		itemService.getCountOfFileModeItems().then(count => {
			if (count < 2) {
				create();
			} else {
				trackEvent('ui', 'FileModeCreationLimitMessageSeen');
				// this.closeAllOverlays();
				this.setState({ isFilesLimitModalOpen: true });
				// return alert(
				// 	'"Files mode" is currently in beta and is limited to only 2 creations per user. You have already made 2 creations in Files mode.\n\nNote: You can choose to delete old ones to create new.'
				// );
			}
		});
	}

	templateSelectHandler(template, isFileMode) {
		const create = () => {
			fetch(
				`templates/template-${isFileMode ? 'files-' : ''}${template.id}.json`
			)
				.then(res => res.json())
				.then(json => {
					this.forkItem(json);
				});
			this.setState({ isCreateNewModalOpen: false });
		};

		if (isFileMode) {
			if (this.state.user?.isPro) {
				create();
				return;
			}

			itemService.getCountOfFileModeItems().then(count => {
				if (count < 2) {
					create();
				} else {
					trackEvent('ui', 'FileModeCreationLimitMessageSeen');
					this.setState({ isFilesLimitModalOpen: true });
				}
			});
		} else {
			fetch(
				`templates/template-${isFileMode ? 'files-' : ''}${template.id}.json`
			)
				.then(res => res.json())
				.then(json => {
					this.forkItem(json);
				});
			this.setState({ isCreateNewModalOpen: false });
		}
	}
	importGithubRepoSelectHandler(repoUrl) {
		importGithubRepo(repoUrl).then(files => {
			this.createNewItem(true, files);
			this.setState({ isCreateNewModalOpen: false });
		});
	}
	addFileHandler(fileName, isFolder) {
		let newEntry = { name: fileName, content: '' };
		if (isFolder) {
			newEntry = {
				...newEntry,
				isFolder: true,
				children: [],
				isCollapsed: true
			};
		}
		let currentItem = {
			...this.state.currentItem,
			files: [...this.state.currentItem.files, newEntry]
		};
		assignFilePaths(currentItem.files);

		this.setState({ currentItem });
		this.incrementUnsavedChanges();
	}
	removeFileHandler(filePath) {
		const currentItem = {
			...this.state.currentItem,
			files: [...this.state.currentItem.files]
		};
		removeFileAtPath(currentItem.files, filePath);

		this.setState({ currentItem });
		this.incrementUnsavedChanges();
	}
	renameFileHandler(oldFilePath, newFileName) {
		const currentItem = {
			...this.state.currentItem,
			files: [...this.state.currentItem.files]
		};
		const { file } = getFileFromPath(currentItem.files, oldFilePath);
		file.name = newFileName;
		assignFilePaths(currentItem.files);

		this.setState({ currentItem });
		this.incrementUnsavedChanges();
	}
	fileDropHandler(sourceFilePath, destinationFolder) {
		let { currentItem } = this.state;
		const { file } = getFileFromPath(currentItem.files, sourceFilePath);
		if (doesFileExistInFolder(destinationFolder, file.name)) {
			alert(
				`File with name "${file.name}" already exists in the destination folder.`
			);
			return;
		}

		if (file) {
			destinationFolder.children.push(file);
			removeFileAtPath(currentItem.files, sourceFilePath);
			currentItem = {
				...currentItem,
				files: [...currentItem.files]
			};
			assignFilePaths(currentItem.files);

			this.setState({ currentItem });
			this.incrementUnsavedChanges();
		}
	}

	folderSelectHandler(folder) {
		// Following will make the change in the existing currentItem
		folder.isCollapsed = !folder.isCollapsed;

		const currentItem = {
			...this.state.currentItem,
			files: [...this.state.currentItem.files]
		};
		this.setState({
			currentItem
		});
	}

	getRootClasses() {
		const classes = [];
		if (this.state.currentItem && this.state.currentItem.files) {
			classes.push('is-file-mode');
		}
		return classes.join(' ');
	}

	prettifyHandler(what) {
		// 3 pane mode
		if (typeof what === 'string') {
			prettify({
				content: this.state.currentItem[what] || '',
				type: { html: 'html', js: 'js', css: 'css' }[what]
			}).then(formattedContent => {
				if (this.state.currentItem[what] === formattedContent) {
					return;
				}
				this.state.currentItem[what] = formattedContent;
				this.setState({ currentItem: { ...this.state.currentItem } }, () => {
					// TODO: This is not right way. Editors should refresh automatically
					// on state change.
					this.contentWrap.refreshEditor();
				});
				this.incrementUnsavedChanges();
			});
			return;
		}
		const selectedFile = what;
		const currentItem = {
			...this.state.currentItem,
			files: [...this.state.currentItem.files]
		};

		prettify({ file: selectedFile }).then(formattedContent => {
			if (formattedContent !== selectedFile.content) {
				selectedFile.content = formattedContent;
				this.incrementUnsavedChanges();
				this.setState({ currentItem });
			}
		});
	}

	render(props, { catalogs = {}, prefs = {} }) {
		return (
			<I18nProvider language={this.state.prefs.lang} catalogs={catalogs}>
				<div class={this.getRootClasses()}>
					<div class="main-container">
						<MainHeader
							externalLibCount={this.state.externalLibCount}
							openBtnHandler={this.openBtnClickHandler.bind(this)}
							newBtnHandler={this.newBtnClickHandler.bind(this)}
							saveBtnHandler={this.saveBtnClickHandler.bind(this)}
							loginBtnHandler={this.loginBtnClickHandler.bind(this)}
							profileBtnHandler={this.profileBtnClickHandler.bind(this)}
							addLibraryBtnHandler={this.openAddLibrary.bind(this)}
							assetsBtnHandler={this.assetsBtnClickHandler.bind(this)}
							shareBtnHandler={this.shareBtnClickHandler.bind(this)}
							runBtnClickHandler={this.runBtnClickHandler.bind(this)}
							isFetchingItems={this.state.isFetchingItems}
							isSaving={this.state.isSaving}
							currentItem={this.state.currentItem}
							titleInputBlurHandler={this.titleInputBlurHandler.bind(this)}
							user={this.state.user}
							isAutoPreviewOn={this.state.prefs.autoPreview}
							unsavedEditCount={this.state.unsavedEditCount}
							isFileMode={
								this.state.currentItem && this.state.currentItem.files
							}
							onItemFork={() => {
								this.forkItem(this.state.currentItem);
							}}
						/>
						{this.state.currentItem && this.state.currentItem.files ? (
							<ContentWrapFiles
								currentItem={this.state.currentItem}
								onCodeChange={this.onCodeChange.bind(this)}
								onCodeSettingsChange={this.onCodeSettingsChange.bind(this)}
								onCodeModeChange={this.onCodeModeChange.bind(this)}
								onRef={comp => (this.contentWrap = comp)}
								prefs={this.state.prefs}
								onEditorFocus={this.editorFocusHandler.bind(this)}
								onSplitUpdate={this.splitUpdateHandler.bind(this)}
								onAddFile={this.addFileHandler.bind(this)}
								onRemoveFile={this.removeFileHandler.bind(this)}
								onRenameFile={this.renameFileHandler.bind(this)}
								onFileDrop={this.fileDropHandler.bind(this)}
								onFolderSelect={this.folderSelectHandler.bind(this)}
								onPrettifyBtnClick={this.prettifyHandler.bind(this)}
							/>
						) : (
							<ContentWrap
								currentLayoutMode={this.state.currentLayoutMode}
								currentItem={this.state.currentItem}
								onCodeChange={this.onCodeChange.bind(this)}
								onCodeSettingsChange={this.onCodeSettingsChange.bind(this)}
								onCodeModeChange={this.onCodeModeChange.bind(this)}
								onRef={comp => (this.contentWrap = comp)}
								prefs={this.state.prefs}
								onEditorFocus={this.editorFocusHandler.bind(this)}
								onSplitUpdate={this.splitUpdateHandler.bind(this)}
								onPrettifyBtnClick={this.prettifyHandler.bind(this)}
							/>
						)}

						<Footer
							prefs={this.state.prefs}
							user={this.state.user}
							layoutBtnClickHandler={this.layoutBtnClickHandler.bind(this)}
							helpBtnClickHandler={() =>
								this.setState({ isHelpModalOpen: true })
							}
							settingsBtnClickHandler={this.openSettings.bind(this)}
							notificationsBtnClickHandler={this.notificationsBtnClickHandler.bind(
								this
							)}
							supportDeveloperBtnClickHandler={this.supportDeveloperBtnClickHandler.bind(
								this
							)}
							detachedPreviewBtnHandler={this.detachedPreviewBtnHandler.bind(
								this
							)}
							codepenBtnClickHandler={this.codepenBtnClickHandler.bind(this)}
							saveHtmlBtnClickHandler={this.saveHtmlBtnClickHandler.bind(this)}
							keyboardShortcutsBtnClickHandler={this.openKeyboardShortcuts.bind(
								this
							)}
							screenshotBtnClickHandler={this.screenshotBtnClickHandler.bind(
								this
							)}
							onJs13KHelpBtnClick={this.js13KHelpBtnClickHandler.bind(this)}
							onJs13KDownloadBtnClick={this.js13KDownloadBtnClickHandler.bind(
								this
							)}
							proBtnClickHandler={this.proBtnClickHandler.bind(this)}
							hasUnseenChangelog={this.state.hasUnseenChangelog}
							codeSize={this.state.codeSize}
						/>
					</div>
					<SavedItemPane
						itemsMap={this.state.savedItems}
						isOpen={this.state.isSavedItemPaneOpen}
						closeHandler={this.closeSavedItemsPane.bind(this)}
						onItemSelect={this.itemClickHandler.bind(this)}
						onItemRemove={this.itemRemoveBtnClickHandler.bind(this)}
						onItemFork={this.itemForkBtnClickHandler.bind(this)}
						onExport={this.exportBtnClickHandler.bind(this)}
						mergeImportedItems={this.mergeImportedItems.bind(this)}
					/>
					<Alerts />
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
						<Changelog
							onSupportBtnClick={this.openSupportDeveloperModal.bind(this)}
						/>
					</Modal>
					<Modal
						extraClasses="modal--settings"
						show={this.state.isSettingsModalOpen}
						closeHandler={() => this.setState({ isSettingsModalOpen: false })}
					>
						<Settings
							prefs={this.state.prefs}
							onChange={this.updateSetting.bind(this)}
						/>
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
					<Modal
						show={this.state.isAssetsOpen}
						closeHandler={() => this.setState({ isAssetsOpen: false })}
					>
						<Assets
							onProBtnClick={() => {
								this.setState({ isAssetsOpen: false });
								this.proBtnClickHandler();
							}}
							onLoginBtnClick={() => {
								this.closeAllOverlays();
								this.loginBtnClickHandler();
							}}
						/>
					</Modal>
					<Modal
						show={this.state.isShareModalOpen}
						closeHandler={() => this.setState({ isShareModalOpen: false })}
					>
						<Share
							user={this.state.user}
							item={this.state.currentItem}
							onVisibilityChange={visibility => {
								const item = {
									...this.state.currentItem,
									isPublic: visibility
								};
								this.setState({ currentItem: item });
							}}
							onLoginBtnClick={() => {
								this.closeAllOverlays();
								this.loginBtnClickHandler();
							}}
							onProBtnClick={() => {
								this.closeAllOverlays();
								this.proBtnClickHandler();
							}}
						/>
					</Modal>
					<Modal
						show={this.state.isProModalOpen}
						closeHandler={() => this.setState({ isProModalOpen: false })}
						extraClasses="pro-modal"
					>
						<Pro
							user={this.state.user}
							onLoginClick={() => {
								this.closeAllOverlays();
								this.loginBtnClickHandler();
							}}
							onBuyFromExtensionClick={() => {
								this.closeAllOverlays();
								this.setState({ isProOnAppModalOpen: true });
							}}
						/>
					</Modal>
					{/* Login modal is intentionally kept here after assets & share modal because 
					they trigger this modal and if order isn't maintainer, the modal overlay doesn't
					show properly */}
					<Modal
						extraClasses="login-modal"
						show={this.state.isLoginModalOpen}
						closeHandler={() => this.setState({ isLoginModalOpen: false })}
					>
						<Login />
					</Modal>
					<HelpModal
						show={this.state.isHelpModalOpen}
						closeHandler={() => this.setState({ isHelpModalOpen: false })}
						onSupportBtnClick={this.openSupportDeveloperModal.bind(this)}
						version={version}
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
					<AskToImportModal
						show={this.state.isAskToImportModalOpen}
						closeHandler={() =>
							this.setState({ isAskToImportModalOpen: false })
						}
						oldSavedCreationsCount={this.oldSavedCreationsCount}
						importBtnClickHandler={this.importCreationsAndSettingsIntoApp.bind(
							this
						)}
						dontAskBtnClickHandler={this.dontAskToImportAnymore.bind(this)}
					/>
					<OnboardingModal
						show={this.state.isOnboardModalOpen}
						closeHandler={() => this.setState({ isOnboardModalOpen: false })}
					/>
					<Js13KModal
						show={this.state.isJs13KModalOpen}
						closeHandler={() => this.setState({ isJs13KModalOpen: false })}
					/>
					<CreateNewModal
						show={this.state.isCreateNewModalOpen}
						closeHandler={() => this.setState({ isCreateNewModalOpen: false })}
						onBlankTemplateSelect={this.blankTemplateSelectHandler.bind(this)}
						onBlankFileTemplateSelect={this.blankFileTemplateSelectHandler.bind(
							this
						)}
						onTemplateSelect={this.templateSelectHandler.bind(this)}
						onImportGithubRepoSelect={this.importGithubRepoSelectHandler.bind(
							this
						)}
					/>
					<ProOnAppModal
						show={this.state.isProOnAppModalOpen}
						closeHandler={() => this.setState({ isProOnAppModalOpen: false })}
					/>
					<Modal
						extraClasses=""
						show={this.state.isFilesLimitModalOpen}
						closeHandler={() => this.setState({ isFilesLimitModalOpen: false })}
					>
						<VStack align="stretch" gap={2}>
							<Text tag="p">
								You have used your quota of 2 'Files mode' creations in Free
								plan.
							</Text>
							<Text tag="p">
								You can choose to delete old ones to free quota or upgrade to{' '}
								<ProBadge />.{' '}
							</Text>
						</VStack>
					</Modal>
					<CommandPalette
						show={this.state.isCommandPaletteOpen}
						files={linearizeFiles(this.state.currentItem.files || [])}
						isCommandMode={this.state.isCommandPaletteInCommandMode}
						closeHandler={() => this.setState({ isCommandPaletteOpen: false })}
					/>
					<Portal into="#portal">
						<div
							class="modal-overlay"
							onClick={this.modalOverlayClickHandler.bind(this)}
						/>
					</Portal>
					<Icons />
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
							value='{"title": "New Pen!", "html": "<div>Hello, World!</div>"}'
						/>
					</form>
				</div>
			</I18nProvider>
		);
	}
}
