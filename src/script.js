/* global trackEvent */
/* global layoutBtn1, layoutBtn2, layoutBtn3, helpModal, notificationsModal, addLibraryModal,
onboardModal, layoutBtn1, layoutBtn2, layoutBtn3, layoutBtn4, onboardModal, onboardModal,
addLibraryModal, addLibraryModal, notificationsBtn, notificationsModal, notificationsModal,
notificationsModal, notificationsBtn, codepenBtn, saveHtmlBtn, saveBtn,
onboardModal, settingsModal, notificationsBtn, onboardShowInTabOptionBtn, editorThemeLinkTag,
onboardDontShowInTabOptionBtn, TextareaAutoComplete, savedItemCountEl, indentationSizeValueEl,
runBtn, searchInput, consoleEl, consoleLogEl, logCountEl, fontStyleTag, fontStyleTemplate,
customEditorFontInput, cssSettingsModal, cssSettingsBtn, acssSettingsTextarea,
globalConsoleContainerEl, externalLibrarySearchInput, keyboardShortcutsModal, headerAvatarImg,
loginModal, profileModal, profileAvatarImg, profileUserName
*/
/* eslint-disable no-extra-semi */
(function(alertsService, itemService) {
	/* eslint-enable no-extra-semi */
	var scope = scope || {};
	var version = '2.9.6';

	if (window.DEBUG) {
		window.scope = scope;
	}

	const defaultSettings = {
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
		lineWrap: true
	};
	var HtmlModes = {
		HTML: 'html',
		MARKDOWN: 'markdown',
		JADE: 'jade' // unsafe eval is put in manifest for this file
	};
	var CssModes = {
		CSS: 'css',
		SCSS: 'scss',
		SASS: 'sass',
		LESS: 'less',
		STYLUS: 'stylus',
		ACSS: 'acss'
	};
	var JsModes = {
		JS: 'js',
		ES6: 'es6',
		COFFEESCRIPT: 'coffee',
		TS: 'typescript'
	};
	var modes = {};
	modes[HtmlModes.HTML] = {
		label: 'HTML',
		cmMode: 'htmlmixed',
		codepenVal: 'none'
	};
	modes[HtmlModes.MARKDOWN] = {
		label: 'Markdown',
		cmMode: 'markdown',
		codepenVal: 'markdown'
	};
	modes[HtmlModes.JADE] = { label: 'Pug', cmMode: 'pug', codepenVal: 'pug' };
	modes[JsModes.JS] = { label: 'JS', cmMode: 'javascript', codepenVal: 'none' };
	modes[JsModes.COFFEESCRIPT] = {
		label: 'CoffeeScript',
		cmMode: 'coffeescript',
		codepenVal: 'coffeescript'
	};
	modes[JsModes.ES6] = {
		label: 'ES6 (Babel)',
		cmMode: 'jsx',
		codepenVal: 'babel'
	};
	modes[JsModes.TS] = {
		label: 'TypeScript',
		cmPath: 'jsx',
		cmMode: 'text/typescript-jsx',
		codepenVal: 'typescript'
	};
	modes[CssModes.CSS] = {
		label: 'CSS',
		cmPath: 'css',
		cmMode: 'css',
		codepenVal: 'none'
	};
	modes[CssModes.SCSS] = {
		label: 'SCSS',
		cmPath: 'css',
		cmMode: 'text/x-scss',
		codepenVal: 'scss'
	};
	modes[CssModes.SASS] = { label: 'SASS', cmMode: 'sass', codepenVal: 'sass' };
	modes[CssModes.LESS] = {
		label: 'LESS',
		cmPath: 'css',
		cmMode: 'text/x-less',
		codepenVal: 'less'
	};
	modes[CssModes.STYLUS] = {
		label: 'Stylus',
		cmMode: 'stylus',
		codepenVal: 'stylus'
	};
	modes[CssModes.ACSS] = {
		label: 'Atomic CSS',
		cmPath: 'css',
		cmMode: 'css',
		codepenVal: 'notsupported',
		cmDisable: true,
		hasSettings: true
	};

	const AUTO_SAVE_INTERVAL = 15000; // 15 seconds
	const BASE_PATH = chrome.extension ? '/' : '/app';
	const DEFAULT_PROFILE_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='#ccc' d='M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z' /%3E%3C/svg%3E";

	var updateTimer,
		updateDelay = 500,
		autoSaveInterval,
		unsavedEditWarningCount = 15,
		currentLayoutMode,
		hasSeenNotifications = true,
		htmlMode = HtmlModes.HTML,
		jsMode = JsModes.JS,
		cssMode = CssModes.CSS,
		sass,
		currentItem,
		unsavedEditCount,
		savedItems,
		minCodeWrapSize = 33,
		mainSplitInstance,
		codeSplitInstance,
		prefs = {},
		codeInPreview = { html: null, css: null, js: null },
		isSavedItemsPaneOpen = false,
		editorWithFocus,
		logCount = 0,
		isAutoSavingEnabled,
		// DOM nodes
		frame = $('#demo-frame'),
		htmlCode = $('#js-html-code'),
		cssCode = $('#js-css-code'),
		jsCode = $('#js-js-code'),
		codepenForm = $('#js-codepen-form'),
		savedItemsPane = $('#js-saved-items-pane'),
		savedItemsPaneCloseBtn = $('#js-saved-items-pane-close-btn'),
		htmlModelLabel = $('#js-html-mode-label'),
		cssModelLabel = $('#js-css-mode-label'),
		jsModelLabel = $('#js-js-mode-label'),
		titleInput = $('#js-title-input'),
		addLibrarySelect = $('#js-add-library-select'),
		externalJsTextarea = $('#js-external-js'),
		externalCssTextarea = $('#js-external-css');

	scope.cm = {};
	scope.frame = frame;
	scope.demoFrameDocument =
		frame.contentDocument || frame.contentWindow.document;

	// Check all the code wrap if they are minimized or maximized
	function updateCodeWrapCollapseStates() {
		// This is debounced!
		clearTimeout(updateCodeWrapCollapseStates.timeout);
		updateCodeWrapCollapseStates.timeout = setTimeout(function() {
			const prop = currentLayoutMode === 2 ? 'width' : 'height';
			[htmlCode, cssCode, jsCode].forEach(function(el) {
				const bounds = el.getBoundingClientRect();
				const size = bounds[prop];
				if (size < 100) {
					el.classList.add('is-minimized');
				} else {
					el.classList.remove('is-minimized');
				}
				if (el.style[prop].indexOf(`100% - ${minCodeWrapSize * 2}px`) !== -1) {
					el.classList.add('is-maximized');
				} else {
					el.classList.remove('is-maximized');
				}
			});
		}, 50);
	}

	function toggleCodeWrapCollapse(codeWrapEl) {
		if (
			codeWrapEl.classList.contains('is-minimized') ||
			codeWrapEl.classList.contains('is-maximized')
		) {
			codeWrapEl.classList.remove('is-minimized');
			codeWrapEl.classList.remove('is-maximized');
			codeSplitInstance.setSizes([33.3, 33.3, 33.3]);
		} else {
			const id = parseInt(codeWrapEl.dataset.codeWrapId, 10);
			var arr = [
				`${minCodeWrapSize}px`,
				`${minCodeWrapSize}px`,
				`${minCodeWrapSize}px`
			];
			arr[id] = `calc(100% - ${minCodeWrapSize * 2}px)`;

			codeSplitInstance.setSizes(arr);
			codeWrapEl.classList.add('is-maximized');
		}
	}
	// Returns the sizes of main code & preview panes.
	function getMainSplitSizesToApply() {
		var mainSplitSizes;
		if (currentItem && currentItem.mainSizes) {
			// For layout mode 3, main panes are reversed using flex-direction.
			// So we need to apply the saved sizes in reverse order.
			mainSplitSizes =
				currentLayoutMode === 3
					? [currentItem.mainSizes[1], currentItem.mainSizes[0]]
					: currentItem.mainSizes;
		} else {
			mainSplitSizes = [50, 50];
		}
		return mainSplitSizes;
	}

	function resetSplitting() {
		if (codeSplitInstance) {
			codeSplitInstance.destroy();
		}
		if (mainSplitInstance) {
			mainSplitInstance.destroy();
		}

		var options = {
			direction: currentLayoutMode === 2 ? 'horizontal' : 'vertical',
			minSize: minCodeWrapSize,
			gutterSize: 6,
			onDragStart: function() {
				document.body.classList.add('is-dragging');
			},
			onDragEnd: function() {
				updateCodeWrapCollapseStates();
				document.body.classList.remove('is-dragging');
			}
		};
		if (currentItem && currentItem.sizes) {
			options.sizes = currentItem.sizes;
		} else {
			options.sizes = [33.33, 33.33, 33.33];
		}

		codeSplitInstance = Split(
			['#js-html-code', '#js-css-code', '#js-js-code'],
			options
		);
		mainSplitInstance = Split(['#js-code-side', '#js-demo-side'], {
			direction: currentLayoutMode === 2 ? 'vertical' : 'horizontal',
			minSize: 150,
			gutterSize: 6,
			sizes: getMainSplitSizesToApply(),
			onDragEnd: function() {
				if (prefs.refreshOnResize) {
					// Running preview updation in next call stack, so that error there
					// doesn't affect this dragend listener.
					setTimeout(function() {
						scope.setPreviewContent(true);
					}, 1);
				}
			}
		});
	}
	function toggleLayout(mode) {
		if (currentLayoutMode === mode) {
			mainSplitInstance.setSizes(getMainSplitSizesToApply());
			codeSplitInstance.setSizes(currentItem.sizes || [33.33, 33.33, 33.33]);
			currentLayoutMode = mode;
			return;
		}
		currentLayoutMode = mode;
		layoutBtn1.classList.remove('selected');
		layoutBtn2.classList.remove('selected');
		layoutBtn3.classList.remove('selected');
		layoutBtn4.classList.remove('selected');
		$('#layoutBtn' + mode).classList.add('selected');
		document.body.classList.remove('layout-1');
		document.body.classList.remove('layout-2');
		document.body.classList.remove('layout-3');
		document.body.classList.remove('layout-4');
		document.body.classList.add('layout-' + mode);

		resetSplitting();
		scope.setPreviewContent(true);
	}

	function onExternalLibChange() {
		utils.log('onExternalLibChange');
		updateExternalLibUi();
		scope.setPreviewContent(true);
		alertsService.add('Libraries updated.');
	}

	function updateExternalLibUi() {
		// Calculate no. of external libs
		var noOfExternalLibs = 0;
		noOfExternalLibs += externalJsTextarea.value
			.split('\n')
			.filter(lib => !!lib).length;
		noOfExternalLibs += externalCssTextarea.value
			.split('\n')
			.filter(lib => !!lib).length;
		if (noOfExternalLibs) {
			$('#js-external-lib-count').textContent = noOfExternalLibs;
			$('#js-external-lib-count').style.display = 'inline';
		} else {
			$('#js-external-lib-count').style.display = 'none';
		}
	}

	function saveSetting(setting, value) {
		const d = deferred();
		const obj = {
			[setting]: value
		};
		db.local.set(obj, d.resolve);
		return d.promise;
	}

	// Save current item to storage
	function saveItem() {
		var isNewItem = !currentItem.id;
		currentItem.id = currentItem.id || 'item-' + utils.generateRandomId();
		saveCode().then(() => {
			// If this is the first save, and auto-saving settings is enabled,
			// then start auto-saving from now on.
			// This is done in `saveCode()` completion so that the
			// auto-save notification overrides the `saveCode` function's notification.
			if (!isAutoSavingEnabled && prefs.autoSave) {
				isAutoSavingEnabled = true;
				alertsService.add('Auto-save enabled.');
			}
		});
		// Push into the items hash if its a new item being saved
		if (isNewItem) {
			itemService.setItemForUser(currentItem.id);
		}
	}

	// Keeps getting called after certain interval to auto-save current creation
	// if it needs to be.
	function autoSaveLoop() {
		if (isAutoSavingEnabled && unsavedEditCount) {
			saveItem();
		}
	}

	// Calculates the sizes of html, css & js code panes.
	function getCodePaneSizes() {
		var sizes;
		var dimensionProperty = currentLayoutMode === 2 ? 'width' : 'height';
		try {
			sizes = [
				htmlCode.style[dimensionProperty],
				cssCode.style[dimensionProperty],
				jsCode.style[dimensionProperty]
			];
		} catch (e) {
			sizes = [33.33, 33.33, 33.33];
		} finally {
			/* eslint-disable no-unsafe-finally */
			return sizes;

			/* eslint-enable no-unsafe-finally */
		}
	}

	// Calculates the current sizes of code & preview panes.
	function getMainPaneSizes() {
		var sizes;
		var dimensionProperty = currentLayoutMode === 2 ? 'height' : 'width';
		try {
			sizes = [
				+$('#js-code-side').style[dimensionProperty].match(/([\d.]+)%/)[1],
				+$('#js-demo-side').style[dimensionProperty].match(/([\d.]+)%/)[1]
			];
		} catch (e) {
			sizes = [50, 50];
		} finally {
			/* eslint-disable no-unsafe-finally */
			return sizes;

			/* eslint-enable no-unsafe-finally */
		}
	}

	function saveCode(key) {
		currentItem.title = titleInput.value;
		currentItem.html = scope.cm.html.getValue();
		currentItem.css = scope.cm.css.getValue();
		currentItem.js = scope.cm.js.getValue();
		currentItem.htmlMode = htmlMode;
		currentItem.cssMode = cssMode;
		currentItem.jsMode = jsMode;
		if (modes[cssMode].hasSettings) {
			currentItem.cssSettings = {
				acssConfig: scope.acssSettingsCm.getValue()
			};
		}
		currentItem.updatedOn = Date.now();
		currentItem.layoutMode = currentLayoutMode;
		currentItem.externalLibs = {
			js: externalJsTextarea.value,
			css: externalCssTextarea.value
		};

		currentItem.sizes = getCodePaneSizes();
		currentItem.mainSizes = getMainPaneSizes();

		utils.log('saving key', key || currentItem.id, currentItem);
		saveSetting(key || currentItem.id, currentItem);
		// If key is `code`, this is a call on unloadbefore to save the last open thing.
		// Do not presist that on remote.
		if (key === 'code') {
			// No deferred required here as this gets called on unloadbefore
			return false;
		}
		return itemService.setItem(key || currentItem.id, currentItem).then(() => {
			alertsService.add('Item saved.');
			unsavedEditCount = 0;
			saveBtn.classList.remove('is-marked');
		});
	}

	function populateItemsInSavedPane(items) {
		var html = '';
		if (items.length) {
			// TODO: sort desc. by updation date
			items.sort(function(a, b) {
				return b.updatedOn - a.updatedOn;
			});
			items.forEach(function(item) {
				html +=
					'<div class="js-saved-item-tile saved-item-tile" data-item-id="' +
					item.id +
					'">' +
					'<div class="saved-item-tile__btns"><a class="js-saved-item-tile__fork-btn  saved-item-tile__btn hint--left hint--medium" aria-label="Creates a duplicate of this creation (Ctrl/⌘ + F)">Fork<span class="show-when-selected">(Ctrl/⌘ + F)</span></a><a class="js-saved-item-tile__remove-btn  saved-item-tile__btn hint--left" aria-label="Remove">X</a></div>' +
					'<h3 class="saved-item-tile__title">' +
					item.title +
					'</h3><span class="saved-item-tile__meta">Last updated: ' +
					utils.getHumanDate(item.updatedOn) +
					'</span></div>';
			});
			savedItemCountEl.textContent = '(' + items.length + ')';
			savedItemCountEl.style.display = 'inline';
		} else {
			html += '<h2 class="opacity--30">Nothing saved here.</h2>';
			savedItemCountEl.style.display = 'none';
		}
		savedItemsPane.querySelector('#js-saved-items-wrap').innerHTML = html;
		toggleSavedItemsPane();
		// HACK: Set overflow after sometime so that the items can animate without getting cropped.
		// setTimeout(() => $('#js-saved-items-wrap').style.overflowY = 'auto', 1000);
	}

	function toggleSavedItemsPane(shouldOpen) {
		if (shouldOpen === false) {
			savedItemsPane.classList.remove('is-open');
		} else {
			savedItemsPane.classList.toggle('is-open');
		}
		isSavedItemsPaneOpen = savedItemsPane.classList.contains('is-open');
		if (isSavedItemsPaneOpen) {
			searchInput.focus();
		} else {
			searchInput.value = '';
			// Give last focused editor, focus again
			if (editorWithFocus) {
				editorWithFocus.focus();
			}
		}
		document.body.classList[isSavedItemsPaneOpen ? 'add' : 'remove'](
			'overlay-visible'
		);
	}

	/**
	 * Fetches all items from storage
	 * @param  {boolean} shouldSaveGlobally Whether to store the fetched items in global arr for later use.
	 * @return {promise}                    Promise.
	 */
	async function fetchItems(shouldSaveGlobally) {
		var d = deferred();
		savedItems = savedItems || {};
		var items = [];
		if (!window.IS_EXTENSION && window.user) {
			items = await itemService.getAllItems();

			if (shouldSaveGlobally) {
				items.forEach(item => {
					savedItems[item.id] = item;
				});
			}
			d.resolve(items);
			return d.promise;
		}
		db.local.get('items', function(result) {
			var itemIds = Object.getOwnPropertyNames(result.items || {});
			if (!itemIds.length) {
				d.resolve([]);
			}

			trackEvent('fn', 'fetchItems', itemIds.length);
			for (let i = 0; i < itemIds.length; i++) {
				/* eslint-disable no-loop-func */
				db.local.get(itemIds[i], function(itemResult) {
					if (shouldSaveGlobally) {
						savedItems[itemIds[i]] = itemResult[itemIds[i]];
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

	function openSavedItemsPane() {
		fetchItems(true).then(function(items) {
			populateItemsInSavedPane(items);
		});
	}
	function setCurrentItem(item) {
		currentItem = item;
		utils.log('Current Item set', item);

		// Reset auto-saving flag
		isAutoSavingEnabled = false;
		// Reset unsaved count, in UI also.
		unsavedEditCount = 0;
		saveBtn.classList.remove('is-marked');
	}
	// Creates a new item with passed item's contents
	function forkItem(sourceItem) {
		if (unsavedEditCount) {
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
		setCurrentItem(fork);
		refreshEditor();
		alertsService.add(`"${sourceItem.title}" was forked`);
		trackEvent('fn', 'itemForked');
	}
	function createNewItem() {
		var d = new Date();
		setCurrentItem({
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
			layoutMode: currentLayoutMode
		});
		refreshEditor();
		alertsService.add('New item created');
	}
	function openItem(itemId) {
		setCurrentItem(savedItems[itemId]);
		refreshEditor();
		alertsService.add('Saved item loaded');
	}
	function removeItem(itemId) {
		var itemTile = document.querySelector(
			'.js-saved-item-tile[data-item-id="' + itemId + '"]'
		);
		var answer = confirm(
			`Are you sure you want to delete "${savedItems[itemId].title}"?`
		);
		if (!answer) {
			return;
		}

		itemTile.remove();
		// Remove from items list
		itemService.unsetItemForUser(itemId);

		// Remove individual item too.
		itemService.removeItem(itemId).then(() => {
			alertsService.add('Item removed.');
			// This item is open in the editor. Lets open a new one.
			if (currentItem.id === itemId) {
				createNewItem();
			}
		});

		// Remove from cached list
		delete savedItems[itemId];

		trackEvent('fn', 'itemRemoved');
	}

	function refreshEditor() {
		titleInput.value = currentItem.title || 'Untitled';
		externalJsTextarea.value =
			(currentItem.externalLibs && currentItem.externalLibs.js) || '';
		externalCssTextarea.value =
			(currentItem.externalLibs && currentItem.externalLibs.css) || '';

		utils.log('refresh editor');
		// Set the modes manually here, so that the preview refresh triggered by the `setValue`
		// statements below, operate on correct modes.
		htmlMode = currentItem.htmlMode || prefs.htmlMode || HtmlModes.HTML;
		cssMode = currentItem.cssMode || prefs.cssMode || CssModes.CSS;
		jsMode = currentItem.jsMode || prefs.jsMode || JsModes.JS;

		scope.cm.html.setValue(currentItem.html);
		scope.cm.css.setValue(currentItem.css);
		scope.cm.js.setValue(currentItem.js);
		scope.cm.html.refresh();
		scope.cm.css.refresh();
		scope.cm.js.refresh();

		scope.acssSettingsCm.setValue(
			currentItem.cssSettings ? currentItem.cssSettings.acssConfig : ''
		);
		scope.acssSettingsCm.refresh();

		scope.clearConsole();

		// To have the library count updated
		updateExternalLibUi();

		// Set preview only when all modes are updated so that preview doesn't generate on partially
		// correct modes and also doesn't happen 3 times.
		Promise.all([
			updateHtmlMode(htmlMode),
			updateCssMode(cssMode),
			updateJsMode(jsMode)
		]).then(() => scope.setPreviewContent(true));

		toggleLayout(currentItem.layoutMode || prefs.layoutMode);
	}

	function closeAllOverlays() {
		helpModal.classList.remove('is-modal-visible');
		notificationsModal.classList.remove('is-modal-visible');
		addLibraryModal.classList.remove('is-modal-visible');
		onboardModal.classList.remove('is-modal-visible');
		settingsModal.classList.remove('is-modal-visible');
		cssSettingsModal.classList.remove('is-modal-visible');
		keyboardShortcutsModal.classList.remove('is-modal-visible');
		loginModal.classList.remove('is-modal-visible');
		profileModal.classList.remove('is-modal-visible');
		toggleSavedItemsPane(false);
		document.dispatchEvent(new Event('overlaysClosed'));
	}

	/**
	 * Loaded the code comiler based on the mode selected
	 */
	function handleModeRequirements(mode) {
		const baseTranspilerPath = 'lib/transpilers';
		// Exit if already loaded
		var d = deferred();
		if (modes[mode].hasLoaded) {
			d.resolve();
			return d.promise;
		}

		function setLoadedFlag() {
			modes[mode].hasLoaded = true;
			d.resolve();
		}

		if (mode === HtmlModes.JADE) {
			loadJS(`${baseTranspilerPath}/jade.js`).then(setLoadedFlag);
		} else if (mode === HtmlModes.MARKDOWN) {
			loadJS(`${baseTranspilerPath}/marked.js`).then(setLoadedFlag);
		} else if (mode === CssModes.LESS) {
			loadJS(`${baseTranspilerPath}/less.min.js`).then(setLoadedFlag);
		} else if (mode === CssModes.SCSS || mode === CssModes.SASS) {
			loadJS(`${baseTranspilerPath}/sass.js`).then(function() {
				sass = new Sass(`${baseTranspilerPath}/sass.worker.js`);
				setLoadedFlag();
			});
		} else if (mode === CssModes.STYLUS) {
			loadJS(`${baseTranspilerPath}/stylus.min.js`).then(setLoadedFlag);
		} else if (mode === CssModes.ACSS) {
			loadJS(`${baseTranspilerPath}/atomizer.browser.js`).then(setLoadedFlag);
		} else if (mode === JsModes.COFFEESCRIPT) {
			loadJS(`${baseTranspilerPath}/coffee-script.js`).then(setLoadedFlag);
		} else if (mode === JsModes.ES6) {
			loadJS(`${baseTranspilerPath}/babel.min.js`).then(setLoadedFlag);
		} else if (mode === JsModes.TS) {
			loadJS(`${baseTranspilerPath}/typescript.js`).then(setLoadedFlag);
		} else {
			d.resolve();
		}

		return d.promise;
	}

	function updateHtmlMode(value) {
		htmlMode = value;
		htmlModelLabel.textContent = modes[value].label;
		// FIXME - use a better selector for the mode selectbox
		htmlModelLabel.parentElement.querySelector('select').value = value;
		scope.cm.html.setOption('mode', modes[value].cmMode);
		CodeMirror.autoLoadMode(
			scope.cm.html,
			modes[value].cmPath || modes[value].cmMode
		);
		return handleModeRequirements(value);
	}
	function updateCssMode(value) {
		cssMode = value;
		cssModelLabel.textContent = modes[value].label;
		// FIXME - use a better selector for the mode selectbox
		cssModelLabel.parentElement.querySelector('select').value = value;
		scope.cm.css.setOption('mode', modes[value].cmMode);
		scope.cm.css.setOption('readOnly', modes[value].cmDisable);
		cssSettingsBtn.classList[modes[value].hasSettings ? 'remove' : 'add'](
			'hide'
		);
		CodeMirror.autoLoadMode(
			scope.cm.css,
			modes[value].cmPath || modes[value].cmMode
		);
		return handleModeRequirements(value);
	}
	function updateJsMode(value) {
		jsMode = value;
		jsModelLabel.textContent = modes[value].label;
		// FIXME - use a better selector for the mode selectbox
		jsModelLabel.parentElement.querySelector('select').value = value;
		scope.cm.js.setOption('mode', modes[value].cmMode);
		CodeMirror.autoLoadMode(
			scope.cm.js,
			modes[value].cmPath || modes[value].cmMode
		);
		return handleModeRequirements(value);
	}

	// computeHtml, computeCss & computeJs evaluate the final code according
	// to whatever mode is selected and resolve the returned promise with the code.
	function computeHtml() {
		var d = deferred();
		var code = scope.cm.html.getValue();
		if (htmlMode === HtmlModes.HTML) {
			d.resolve(code);
		} else if (htmlMode === HtmlModes.MARKDOWN) {
			d.resolve(marked ? marked(code) : code);
		} else if (htmlMode === HtmlModes.JADE) {
			d.resolve(window.jade ? jade.render(code) : code);
		}

		return d.promise;
	}
	function computeCss() {
		var d = deferred();
		var code = scope.cm.css.getValue();
		cleanupErrors('css');

		if (cssMode === CssModes.CSS) {
			d.resolve(code);
		} else if (cssMode === CssModes.SCSS || cssMode === CssModes.SASS) {
			if (sass && code) {
				sass.compile(
					code,
					{ indentedSyntax: cssMode === CssModes.SASS },
					function(result) {
						// Something was wrong
						if (result.line && result.message) {
							showErrors('css', [
								{ lineNumber: result.line - 1, message: result.message }
							]);
						}
						d.resolve(result.text);
					}
				);
			} else {
				d.resolve(code);
			}
		} else if (cssMode === CssModes.LESS) {
			less.render(code).then(
				function(result) {
					d.resolve(result.css);
				},
				function(error) {
					showErrors('css', [
						{ lineNumber: error.line, message: error.message }
					]);
				}
			);
		} else if (cssMode === CssModes.STYLUS) {
			stylus(code).render(function(error, result) {
				if (error) {
					window.err = error;
					// Last line of message is the actual message
					var tempArr = error.message.split('\n');
					tempArr.pop(); // This is empty string in the end
					showErrors('css', [
						{
							lineNumber: +error.message.match(/stylus:(\d+):/)[1] - 298,
							message: tempArr.pop()
						}
					]);
				}
				d.resolve(result);
			});
		} else if (cssMode === CssModes.ACSS) {
			if (!window.atomizer) {
				d.resolve('');
			} else {
				const html = scope.cm.html.getValue();
				const foundClasses = atomizer.findClassNames(html);
				var finalConfig;
				try {
					finalConfig = atomizer.getConfig(
						foundClasses,
						JSON.parse(scope.acssSettingsCm.getValue())
					);
				} catch (e) {
					finalConfig = atomizer.getConfig(foundClasses, {});
				}
				const acss = atomizer.getCss(finalConfig);
				scope.cm.css.setValue(acss);
				d.resolve(acss);
			}
		}

		return d.promise;
	}
	function computeJs(shouldPreventInfiniteLoops) {
		var d = deferred();
		var code = scope.cm.js.getValue();

		cleanupErrors('js');
		if (!code) {
			d.resolve('');
			return d.promise;
		}

		if (jsMode === JsModes.JS) {
			try {
				esprima.parse(code, {
					tolerant: true
				});
			} catch (e) {
				showErrors('js', [
					{ lineNumber: e.lineNumber - 1, message: e.description }
				]);
			} finally {
				if (shouldPreventInfiniteLoops !== false) {
					code = utils.addInfiniteLoopProtection(code);
				}
				d.resolve(code);
			}
		} else if (jsMode === JsModes.COFFEESCRIPT) {
			var coffeeCode;
			if (!window.CoffeeScript) {
				d.resolve('');
				return d.promise;
			}
			try {
				coffeeCode = CoffeeScript.compile(code, { bare: true });
			} catch (e) {
				showErrors('js', [
					{ lineNumber: e.location.first_line, message: e.message }
				]);
			} finally {
				if (shouldPreventInfiniteLoops !== false) {
					code = utils.addInfiniteLoopProtection(coffeeCode);
				}
				d.resolve(code);
			}
		} else if (jsMode === JsModes.ES6) {
			if (!window.Babel) {
				d.resolve('');
				return d.promise;
			}
			try {
				esprima.parse(code, {
					tolerant: true,
					jsx: true
				});
			} catch (e) {
				showErrors('js', [
					{ lineNumber: e.lineNumber - 1, message: e.description }
				]);
			} finally {
				code = Babel.transform(code, {
					presets: ['latest', 'stage-2', 'react']
				}).code;
				if (shouldPreventInfiniteLoops !== false) {
					code = utils.addInfiniteLoopProtection(code);
				}
				d.resolve(code);
			}
		} else if (jsMode === JsModes.TS) {
			try {
				if (!window.ts) {
					d.resolve('');
					return d.promise;
				}
				code = ts.transpileModule(code, {
					reportDiagnostics: true,
					compilerOptions: {
						noEmitOnError: true,
						diagnostics: true,
						module: ts.ModuleKind.ES2015
					}
				});
				if (code.diagnostics.length) {
					/* eslint-disable no-throw-literal */
					throw {
						description: code.diagnostics[0].messageText,
						lineNumber: ts.getLineOfLocalPosition(
							code.diagnostics[0].file,
							code.diagnostics[0].start
						)
					};
				}
				if (shouldPreventInfiniteLoops !== false) {
					code = utils.addInfiniteLoopProtection(code.outputText);
				}
				d.resolve(code);
			} catch (e) {
				showErrors('js', [
					{ lineNumber: e.lineNumber - 1, message: e.description }
				]);
			}
		}

		return d.promise;
	}

	window.previewException = function(error) {
		console.error('Possible infinite loop detected.', error.stack);
		window.onMessageFromConsole(
			'Possible infinite loop detected.',
			error.stack
		);
	};
	window.onunload = function() {
		saveCode('code');
		if (scope.detachedWindow) {
			scope.detachedWindow.close();
		}
	};

	function cleanupErrors(lang) {
		scope.cm[lang].clearGutter('error-gutter');
	}
	function showErrors(lang, errors) {
		var editor = scope.cm[lang];
		errors.forEach(function(e) {
			editor.operation(function() {
				var n = document.createElement('div');
				n.setAttribute('data-title', e.message);
				n.classList.add('gutter-error-marker');
				editor.setGutterMarker(e.lineNumber, 'error-gutter', n);
			});
		});
	}

	/* eslint max-params: ["error", 4] */
	function getCompleteHtml(html, css, js, isForExport) {
		var externalJs = externalJsTextarea.value
			.split('\n')
			.reduce(function(scripts, url) {
				return scripts + (url ? '\n<script src="' + url + '"></script>' : '');
			}, '');
		var externalCss = externalCssTextarea.value
			.split('\n')
			.reduce(function(links, url) {
				return (
					links +
					(url ? '\n<link rel="stylesheet" href="' + url + '"></link>' : '')
				);
			}, '');
		var contents =
			'<!DOCTYPE html>\n' +
			'<html>\n<head>\n' +
			'<meta charset="UTF-8" />\n' +
			externalCss +
			'\n' +
			'<style id="webmakerstyle">\n' +
			css +
			'\n</style>\n' +
			'</head>\n' +
			'<body>\n' +
			html +
			'\n' +
			externalJs +
			'\n';

		if (!isForExport) {
			contents +=
				'<script src="' +
				(chrome.extension
					? chrome.extension.getURL('lib/screenlog.js')
					: `${location.origin}${BASE_PATH}/lib/screenlog.js`) +
				'"></script>';
		}

		if (jsMode === JsModes.ES6) {
			contents +=
				'<script src="' +
				chrome.extension.getURL('lib/transpilers/babel-polyfill.min.js') +
				'"></script>';
		}

		if (typeof js === 'string') {
			contents += '<script>\n' + js + '\n//# sourceURL=userscript.js';
		} else {
			var origin = chrome.i18n.getMessage()
				? `chrome-extension://${chrome.i18n.getMessage('@@extension_id')}`
				: `${location.origin}`;
			contents +=
				'<script src="' + `filesystem:${origin}/temporary/script.js` + '">';
		}
		contents += '\n</script>\n</body>\n</html>';

		return contents;
	}

	function writeFile(name, blob, cb) {
		var fileWritten = false;
		function getErrorHandler(type) {
			return function() {
				utils.log(arguments);
				trackEvent('fn', 'error', type);
				// When there are too many write errors, show a message.
				writeFile.errorCount = (writeFile.errorCount || 0) + 1;
				if (writeFile.errorCount === 4) {
					setTimeout(function() {
						alert(
							"Oops! Seems like your preview isn't updating. Please try the following steps until it fixes:\n - Refresh Web Maker\n - Restart browser\n - Update browser\n - Reinstall Web Maker (don't forget to export all your creations from saved items pane (click the OPEN button) before reinstalling)\n\nIf nothing works, please tweet out to @webmakerApp."
						);
						trackEvent('ui', 'writeFileMessageSeen');
					}, 1000);
				}
			};
		}

		// utils.log('writing file ', name);
		window.webkitRequestFileSystem(
			window.TEMPORARY,
			1024 * 1024 * 5,
			function(fs) {
				fs.root.getFile(
					name,
					{ create: true },
					function(fileEntry) {
						fileEntry.createWriter(fileWriter => {
							function onWriteComplete() {
								if (fileWritten) {
									// utils.log('file written ', name);
									return cb();
								}
								fileWritten = true;
								// Set the write pointer to starting of file
								fileWriter.seek(0);
								fileWriter.write(blob);
								return false;
							}
							fileWriter.onwriteend = onWriteComplete;
							// Empty the file contents
							fileWriter.truncate(0);
							// utils.log('truncating file ', name);
						}, getErrorHandler('createWriterFail'));
					},
					getErrorHandler('getFileFail')
				);
			},
			getErrorHandler('webkitRequestFileSystemFail')
		);
	}

	function createPreviewFile(html, css, js) {
		const shouldInlineJs =
			!window.webkitRequestFileSystem || !window.IS_EXTENSION;
		var contents = getCompleteHtml(html, css, shouldInlineJs ? js : null);
		var blob = new Blob([contents], { type: 'text/plain;charset=UTF-8' });
		var blobjs = new Blob([js], { type: 'text/plain;charset=UTF-8' });

		// Track if people have written code.
		if (!trackEvent.hasTrackedCode && (html || css || js)) {
			trackEvent('fn', 'hasCode');
			trackEvent.hasTrackedCode = true;
		}

		if (shouldInlineJs) {
			frame.src = frame.src;
			setTimeout(() => {
				frame.contentDocument.open();
				frame.contentDocument.write(contents);
				frame.contentDocument.close();
			}, 10);
		} else {
			// we need to store user script in external JS file to prevent inline-script
			// CSP from affecting it.
			writeFile('script.js', blobjs, function() {
				writeFile('preview.html', blob, function() {
					var origin = chrome.i18n.getMessage()
						? `chrome-extension://${chrome.i18n.getMessage('@@extension_id')}`
						: `${location.origin}`;
					var src = `filesystem:${origin}/temporary/preview.html`;
					if (scope.detachedWindow) {
						scope.detachedWindow.postMessage(src, '*');
					} else {
						frame.src = src;
					}
				});
			});
		}
	}

	scope.setPreviewContent = function(isForced) {
		if (!prefs.preserveConsoleLogs) {
			scope.clearConsole();
		}

		var currentCode = {
			html: scope.cm.html.getValue(),
			css: scope.cm.css.getValue(),
			js: scope.cm.js.getValue()
		};
		utils.log('🔎 setPreviewContent', isForced);
		const targetFrame = scope.detachedWindow
			? scope.detachedWindow.document.querySelector('iframe')
			: frame;

		// If just CSS was changed (and everything shudn't be empty),
		// change the styles inside the iframe.
		if (
			!isForced &&
			currentCode.html === codeInPreview.html &&
			currentCode.js === codeInPreview.js
		) {
			computeCss().then(function(css) {
				if (targetFrame.contentDocument.querySelector('#webmakerstyle')) {
					targetFrame.contentDocument.querySelector(
						'#webmakerstyle'
					).textContent = css;
				}
			});
		} else {
			var htmlPromise = computeHtml();
			var cssPromise = computeCss();
			var jsPromise = computeJs();
			Promise.all([htmlPromise, cssPromise, jsPromise]).then(function(result) {
				createPreviewFile(result[0], result[1], result[2]);
			});
		}

		codeInPreview.html = currentCode.html;
		codeInPreview.css = currentCode.css;
		codeInPreview.js = currentCode.js;
	};

	function saveFile() {
		var htmlPromise = computeHtml();
		var cssPromise = computeCss();
		var jsPromise = computeJs(false);
		Promise.all([htmlPromise, cssPromise, jsPromise]).then(function(result) {
			var html = result[0],
				css = result[1],
				js = result[2];

			var fileContent = getCompleteHtml(html, css, js, true);

			var d = new Date();
			var fileName = [
				'web-maker',
				d.getFullYear(),
				d.getMonth() + 1,
				d.getDate(),
				d.getHours(),
				d.getMinutes(),
				d.getSeconds()
			].join('-');
			fileName += '.html';

			if (currentItem.title) {
				fileName = currentItem.title;
			}

			var blob = new Blob([fileContent], { type: 'text/html;charset=UTF-8' });
			utils.downloadFile(fileName, blob);

			trackEvent('fn', 'saveFileComplete');
		});
	}

	function initEditor(element, options) {
		var cm = CodeMirror(element, {
			mode: options.mode,
			lineNumbers: true,
			lineWrapping: true,
			autofocus: options.autofocus || false,
			autoCloseBrackets: true,
			autoCloseTags: true,
			matchBrackets: true,
			matchTags: options.matchTags || false,
			tabMode: 'indent',
			keyMap: 'sublime',
			theme: 'monokai',
			lint: !!options.lint,
			tabSize: 2,
			foldGutter: true,
			styleActiveLine: true,
			gutters: options.gutters || [],
			// cursorScrollMargin: '20', has issue with scrolling
			profile: options.profile || '',
			extraKeys: {
				Up: function(editor) {
					// Stop up/down keys default behavior when saveditempane is open
					if (isSavedItemsPaneOpen) {
						return;
					}
					CodeMirror.commands.goLineUp(editor);
				},
				Down: function(editor) {
					if (isSavedItemsPaneOpen) {
						return;
					}
					CodeMirror.commands.goLineDown(editor);
				},
				'Shift-Tab': function(editor) {
					CodeMirror.commands.indentAuto(editor);
				},
				Tab: function(editor) {
					if (options.emmet) {
						const didEmmetWork = editor.execCommand('emmetExpandAbbreviation');
						if (didEmmetWork === true) {
							return;
						}
					}
					const input = $('[data-setting=indentWith]:checked');
					if (
						!editor.somethingSelected() &&
						(!input || input.value === 'spaces')
					) {
						// softtabs adds spaces. This is required because by default tab key will put tab, but we want
						// to indent with spaces if `spaces` is preferred mode of indentation.
						// `somethingSelected` needs to be checked otherwise, all selected code is replaced with softtab.
						CodeMirror.commands.insertSoftTab(editor);
					} else {
						CodeMirror.commands.defaultTab(editor);
					}
				},
				'Enter': 'emmetInsertLineBreak'
			}
		});
		cm.on('focus', editor => {
			editorWithFocus = editor;
		});
		cm.on('change', function onChange(editor, change) {
			clearTimeout(updateTimer);

			updateTimer = setTimeout(function() {
				// This is done so that multiple simultaneous setValue don't trigger too many preview refreshes
				// and in turn too many file writes on a single file (eg. preview.html).
				if (change.origin !== 'setValue') {
					// Specifically checking for false so that the condition doesn't get true even
					// on absent key - possible when the setting key hasn't been fetched yet.
					if (prefs.autoPreview !== false) {
						scope.setPreviewContent();
					}

					saveBtn.classList.add('is-marked');
					unsavedEditCount += 1;
					if (
						unsavedEditCount % unsavedEditWarningCount === 0 &&
						unsavedEditCount >= unsavedEditWarningCount
					) {
						saveBtn.classList.add('animated');
						saveBtn.classList.add('wobble');
						saveBtn.addEventListener('animationend', () => {
							saveBtn.classList.remove('animated');
							saveBtn.classList.remove('wobble');
						});
					}

					// Track when people actually are working.
					trackEvent.previewCount = (trackEvent.previewCount || 0) + 1;
					if (trackEvent.previewCount === 4) {
						trackEvent('fn', 'usingPreview');
					}
				}
			}, updateDelay);
		});
		cm.addKeyMap({
			'Ctrl-Space': 'autocomplete'
		});
		if (!options.noAutocomplete) {
			cm.on('inputRead', function onChange(editor, input) {
				if (
					!prefs.autoComplete ||
					input.origin !== '+input' ||
					input.text[0] === ';' ||
					input.text[0] === ',' ||
					input.text[0] === ' '
				) {
					return;
				}
				CodeMirror.commands.autocomplete(cm, null, { completeSingle: false });
			});
		}
		return cm;
	}

	scope.cm.html = initEditor(htmlCode, {
		mode: 'htmlmixed',
		profile: 'xhtml',
		gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
		noAutocomplete: true,
		matchTags: { bothTags: true },
		emmet: true
	});
	scope.cm.css = initEditor(cssCode, {
		mode: 'css',
		gutters: ['error-gutter', 'CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
		emmet: true
	});
	Inlet(scope.cm.css);
	scope.cm.js = initEditor(jsCode, {
		mode: 'javascript',
		gutters: ['error-gutter', 'CodeMirror-linenumbers', 'CodeMirror-foldgutter']
	});
	Inlet(scope.cm.js);

	// Initialize codemirror in console
	scope.consoleCm = CodeMirror(consoleLogEl, {
		mode: 'javascript',
		lineWrapping: true,
		theme: 'monokai',
		foldGutter: true,
		readOnly: true,
		gutters: ['CodeMirror-foldgutter']
	});

	// DEPRECATED
	function openSettings() {
		scope.toggleModal(settingsModal);

		/* if (chrome.runtime.openOptionsPage) {
			// New way to open options pages, if supported (Chrome 42+).
			// Bug: https://bugs.chromium.org/p/chromium/issues/detail?id=601997
			// Until this bug fixes, use the
			// fallback.
			chrome.runtime.openOptionsPage();
		} else {
			// Fallback.
			chrome.tabs.create({
				url: 'chrome://extensions?options=' + chrome.i18n.getMessage('@@extension_id')
			});
		} */
	}

	scope.onModalSettingsLinkClick = function onModalSettingsLinkClick() {
		openSettings();
		trackEvent('ui', 'onboardSettingsBtnClick');
	};

	scope.onShowInTabClicked = function onShowInTabClicked() {
		onboardDontShowInTabOptionBtn.classList.remove('selected');
		onboardShowInTabOptionBtn.classList.add('selected');
		trackEvent('ui', 'onboardShowInTabClick');
	};
	scope.onDontShowInTabClicked = function onDontShowInTabClicked() {
		onboardDontShowInTabOptionBtn.classList.add('selected');
		onboardShowInTabOptionBtn.classList.remove('selected');
		trackEvent('ui', 'onboardDontShowInTabClick');
	};

	scope.exportItems = function exportItems(e) {
		handleDownloadsPermission().then(() => {
			fetchItems().then(function(items) {
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

				utils.downloadFile(fileName, blob);

				trackEvent('ui', 'exportBtnClicked');
			});
		});
		e.preventDefault();
	};

	function mergeImportedItems(items) {
		var existingItemIds = [];
		var toMergeItems = {};
		items.forEach(item => {
			// We can access `savedItems` here because this gets set when user
			// opens the saved creations panel. And import option is available
			// inside the saved items panel.
			if (savedItems[item.id]) {
				// Item already exists
				existingItemIds.push(item.id);
			} else {
				utils.log('merging', item.id);
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
				utils.log('shouldreplace', shouldReplace);
				items.forEach(item => {
					toMergeItems[item.id] = item;
				});
				mergedItemCount = items.length;
			}
		}
		if (mergedItemCount) {
			itemService.saveItems(toMergeItems).then(() => {
				alertsService.add(
					mergedItemCount + ' creations imported successfully.'
				);
				trackEvent('fn', 'itemsImported', mergedItemCount);
			});
		}
		// FIXME: Move from here
		toggleSavedItemsPane(false);
	}

	function onImportFileChange(e) {
		var file = e.target.files[0];
		// if (!f.type.match('image.*')) {
		// 		continue;
		// }

		var reader = new FileReader();
		reader.onload = function(progressEvent) {
			var items;
			try {
				items = JSON.parse(progressEvent.target.result);
				utils.log(items);
				mergeImportedItems(items);
			} catch (exception) {
				utils.log(exception);
				alert(
					'Oops! Selected file is corrupted. Please select a file that was generated by clicking the "Export" button.'
				);
			}
		};

		reader.readAsText(file, 'utf-8');
	}

	scope.onImportBtnClicked = function exportItems(e) {
		var input = document.createElement('input');
		input.type = 'file';
		input.style.display = 'none';
		input.accept = 'accept="application/json';
		document.body.appendChild(input);
		input.addEventListener('change', onImportFileChange);
		input.click();
		trackEvent('ui', 'importBtnClicked');
		e.preventDefault();
	};

	function saveScreenshot(dataURI) {
		// convert base64 to raw binary data held in a string
		// doesn't handle URLEncoded DataURIs
		var byteString = atob(dataURI.split(',')[1]);

		// separate out the mime component
		var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

		// write the bytes of the string to an ArrayBuffer
		var ab = new ArrayBuffer(byteString.length);
		var ia = new Uint8Array(ab);
		for (var i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}

		// create a blob for writing to a file
		var blob = new Blob([ab], { type: mimeString });
		var size = blob.size + 1024 / 2;

		var d = new Date();
		var fileName = [
			'web-maker-screenshot',
			d.getFullYear(),
			d.getMonth() + 1,
			d.getDate(),
			d.getHours(),
			d.getMinutes(),
			d.getSeconds()
		].join('-');
		fileName += '.png';

		function onWriteEnd() {
			var filePath =
				'filesystem:chrome-extension://' +
				chrome.i18n.getMessage('@@extension_id') +
				'/temporary/' +
				fileName;

			chrome.downloads.download(
				{
					url: filePath
				},
				function() {
					// If there was an error, just open the screenshot in a tab.
					// This happens in incognito mode where extension cannot access filesystem.
					if (chrome.runtime.lastError) {
						window.open(filePath);
					}
				}
			);
		}

		function errorHandler(e) {
			utils.log(e);
		}

		// create a blob for writing to a file
		window.webkitRequestFileSystem(
			window.TEMPORARY,
			size,
			fs => {
				fs.root.getFile(
					fileName,
					{ create: true },
					fileEntry => {
						fileEntry.createWriter(fileWriter => {
							fileWriter.onwriteend = onWriteEnd;
							fileWriter.write(blob);
						}, errorHandler);
					},
					errorHandler
				);
			},
			errorHandler
		);
	}

	function handleDownloadsPermission() {
		var d = deferred();
		if (!window.IS_EXTENSION) {
			d.resolve();
			return d.promise;
		}
		chrome.permissions.contains(
			{
				permissions: ['downloads']
			},
			function(result) {
				if (result) {
					d.resolve();
				} else {
					chrome.permissions.request(
						{
							permissions: ['downloads']
						},
						function(granted) {
							if (granted) {
								trackEvent('fn', 'downloadsPermGiven');
								d.resolve();
							} else {
								d.reject();
							}
						}
					);
				}
			}
		);
		return d.promise;
	}

	scope.takeScreenshot = function(e) {
		handleDownloadsPermission().then(() => {
			// Hide tooltips so that they don't show in the screenshot
			var s = document.createElement('style');
			s.textContent =
				'[class*="hint"]:after, [class*="hint"]:before { display: none!important; }';
			document.body.appendChild(s);

			function onImgLoad(image) {
				var c = document.createElement('canvas');
				var iframeBounds = frame.getBoundingClientRect();
				c.width = iframeBounds.width;
				c.height = iframeBounds.height;
				var ctx = c.getContext('2d');
				var devicePixelRatio = window.devicePixelRatio || 1;

				ctx.drawImage(
					image,
					iframeBounds.left * devicePixelRatio,
					iframeBounds.top * devicePixelRatio,
					iframeBounds.width * devicePixelRatio,
					iframeBounds.height * devicePixelRatio,
					0,
					0,
					iframeBounds.width,
					iframeBounds.height
				);
				image.removeEventListener('load', onImgLoad);
				saveScreenshot(c.toDataURL());
			}

			setTimeout(() => {
				chrome.tabs.captureVisibleTab(
					null,
					{ format: 'png', quality: 100 },
					function(dataURI) {
						s.remove();
						if (dataURI) {
							var image = new Image();
							image.src = dataURI;
							image.addEventListener('load', () => onImgLoad(image, dataURI));
						}
					}
				);
			}, 50);

			trackEvent('ui', 'takeScreenshotBtnClick');
		});

		e.preventDefault();
	};

	// Populate the settings in the settings UI
	function updateSettingsInUi() {
		$('[data-setting=preserveLastCode]').checked = prefs.preserveLastCode;
		$('[data-setting=replaceNewTab]').checked = prefs.replaceNewTab;
		$('[data-setting=htmlMode]').value = prefs.htmlMode;
		$('[data-setting=cssMode]').value = prefs.cssMode;
		$('[data-setting=jsMode]').value = prefs.jsMode;
		$('[data-setting=indentSize]').value = prefs.indentSize;
		indentationSizeValueEl.textContent = prefs.indentSize;
		$(
			'[data-setting=indentWith][value=' + (prefs.indentWith || 'spaces') + ']'
		).checked = true;
		$('[data-setting=isCodeBlastOn]').checked = prefs.isCodeBlastOn;
		$('[data-setting=editorTheme]').value = prefs.editorTheme;
		$(
			'[data-setting=keymap][value=' + (prefs.keymap || 'sublime') + ']'
		).checked = true;
		$('[data-setting=fontSize]').value = prefs.fontSize || 16;
		$('[data-setting=refreshOnResize]').checked = prefs.refreshOnResize;
		$('[data-setting=autoPreview]').checked = prefs.autoPreview;
		$('[data-setting=editorFont]').value = prefs.editorFont;
		$('[data-setting=editorCustomFont]').value = prefs.editorCustomFont;
		$('[data-setting=autoSave]').checked = prefs.autoSave;
		$('[data-setting=autoComplete]').checked = prefs.autoComplete;
		$('[data-setting=preserveConsoleLogs]').checked = prefs.preserveConsoleLogs;
		$('[data-setting=lightVersion]').checked = prefs.lightVersion;
		$('[data-setting=lineWrap]').checked = prefs.lineWrap;
	}

	/**
	 * Handles all user triggered preference changes in the UI.
	 */
	scope.updateSetting = function updateSetting(e) {
		// If this was triggered from user interaction, save the setting
		if (e) {
			var settingName = e.target.dataset.setting;
			var obj = {};
			var el = e.target;
			utils.log(settingName, el.type === 'checkbox' ? el.checked : el.value);
			prefs[settingName] = el.type === 'checkbox' ? el.checked : el.value;
			obj[settingName] = prefs[settingName];

			// In case of !extension, we save in localstorage so that it gets fetched
			// faster on future loads.
			db.sync.set(obj, function() {
				alertsService.add('Setting saved');
			});
			if (!window.IS_EXTENSION) {
				window.db.getDb().then(remoteDb => {
					remoteDb
						.collection('users')
						.doc(window.user.uid)
						.update({
							[`settings.${settingName}`]: prefs[settingName]
						})
						.then(arg => {
							utils.log(`Setting "${settingName}" for user`, arg);
						})
						.catch(error => utils.log(error));
				});
			}
			trackEvent('ui', 'updatePref-' + settingName, prefs[settingName]);
		}

		// Show/hide RUN button based on autoPreview setting.
		runBtn.classList[prefs.autoPreview ? 'add' : 'remove']('hide');

		htmlCode.querySelector('.CodeMirror').style.fontSize = prefs.fontSize;
		cssCode.querySelector('.CodeMirror').style.fontSize = prefs.fontSize;
		jsCode.querySelector('.CodeMirror').style.fontSize = prefs.fontSize;
		consoleEl.querySelector('.CodeMirror').style.fontSize = prefs.fontSize;

		// Update indentation count when slider is updated
		indentationSizeValueEl.textContent = $('[data-setting=indentSize]').value;

		// Replace correct css file in LINK tags's href
		editorThemeLinkTag.href = `lib/codemirror/theme/${prefs.editorTheme}.css`;
		fontStyleTag.textContent = fontStyleTemplate.textContent.replace(
			/fontname/g,
			(prefs.editorFont === 'other'
				? prefs.editorCustomFont
				: prefs.editorFont) || 'FiraCode'
		);
		customEditorFontInput.classList[
			prefs.editorFont === 'other' ? 'remove' : 'add'
		]('hide');

		['html', 'js', 'css'].forEach(type => {
			scope.cm[type].setOption(
				'indentWithTabs',
				$('[data-setting=indentWith]:checked').value !== 'spaces'
			);
			scope.cm[type].setOption(
				'blastCode',
				$('[data-setting=isCodeBlastOn]').checked
					? { effect: 2, shake: false }
					: false
			);
			scope.cm[type].setOption(
				'indentUnit',
				+$('[data-setting=indentSize]').value
			);
			scope.cm[type].setOption(
				'tabSize',
				+$('[data-setting=indentSize]').value
			);
			scope.cm[type].setOption('theme', $('[data-setting=editorTheme]').value);

			scope.cm[type].setOption(
				'keyMap',
				$('[data-setting=keymap]:checked').value
			);
			scope.cm[type].setOption(
				'lineWrapping',
				$('[data-setting=lineWrap]').checked
			);
			scope.cm[type].refresh();
		});
		scope.consoleCm.setOption('theme', $('[data-setting=editorTheme]').value);
		scope.acssSettingsCm.setOption(
			'theme',
			$('[data-setting=editorTheme]').value
		);
		if (prefs.autoSave) {
			if (!autoSaveInterval) {
				autoSaveInterval = setInterval(autoSaveLoop, AUTO_SAVE_INTERVAL);
			}
		} else {
			clearInterval(autoSaveInterval);
			autoSaveInterval = null;
		}

		document.body.classList[prefs.lightVersion ? 'add' : 'remove'](
			'light-version'
		);
	};

	scope.onNewBtnClick = function() {
		trackEvent('ui', 'newBtnClick');
		if (unsavedEditCount) {
			var shouldDiscard = confirm(
				'You have unsaved changes. Do you still want to create something new?'
			);
			if (shouldDiscard) {
				createNewItem();
			}
		} else {
			createNewItem();
		}
	};
	scope.onOpenBtnClick = function() {
		trackEvent('ui', 'openBtnClick');
		openSavedItemsPane();
	};
	scope.onSaveBtnClick = function() {
		trackEvent('ui', 'saveBtnClick', currentItem.id ? 'saved' : 'new');
		saveItem();
	};

	/**
	 * Toggles a modal and logs an event.
	 * @param  {Node} modal     modal to be toggled
	 */
	scope.toggleModal = function(modal) {
		modal.classList.toggle('is-modal-visible');
		document.body.classList[
			modal.classList.contains('is-modal-visible') ? 'add' : 'remove'
		]('overlay-visible');
	};
	scope.onSearchInputChange = function(e) {
		const text = e.target.value;
		let el;
		for (const [itemId, item] of Object.entries(savedItems)) {
			el = $(`#js-saved-items-pane [data-item-id=${itemId}]`);
			if (item.title.toLowerCase().indexOf(text) === -1) {
				el.classList.add('hide');
			} else {
				el.classList.remove('hide');
			}
		}
		trackEvent('ui', 'searchInputType');
	};

	scope.toggleConsole = function() {
		consoleEl.classList.toggle('is-minimized');
		trackEvent('ui', 'consoleToggle');
	};
	// `clearConsole` is on window because it gets called from inside iframe also.
	scope.clearConsole = window.clearConsole = function() {
		scope.consoleCm.setValue('');
		logCount = 0;
		logCountEl.textContent = logCount;
	};
	scope.onClearConsoleBtnClick = function() {
		scope.clearConsole();
		trackEvent('ui', 'consoleClearBtnClick');
	};
	scope.evalConsoleExpr = function(e) {
		// Clear console on CTRL + L
		if ((e.which === 76 || e.which === 12) && e.ctrlKey) {
			scope.clearConsole();
			trackEvent('ui', 'consoleClearKeyboardShortcut');
		} else if (e.which === 13) {
			window.onMessageFromConsole('> ' + e.target.value);

			/* eslint-disable no-underscore-dangle */
			frame.contentWindow._wmEvaluate(e.target.value);

			/* eslint-enable no-underscore-dangle */

			e.target.value = '';
			trackEvent('fn', 'evalConsoleExpr');
		}
	};
	window.onMessageFromConsole = function() {
		/* eslint-disable no-param-reassign */
		[...arguments].forEach(function(arg) {
			if (
				arg &&
				arg.indexOf &&
				arg.indexOf('filesystem:chrome-extension') !== -1
			) {
				arg = arg.replace(
					/filesystem:chrome-extension.*\.js:(\d+):*(\d*)/g,
					'script $1:$2'
				);
			}
			try {
				scope.consoleCm.replaceRange(
					arg +
						' ' +
						((arg + '').match(/\[object \w+]/) ? JSON.stringify(arg) : '') +
						'\n',
					{ line: Infinity }
				);
			} catch (e) {
				scope.consoleCm.replaceRange('🌀\n', { line: Infinity });
			}
			scope.consoleCm.scrollTo(0, Infinity);
			logCount++;
		});
		logCountEl.textContent = logCount;

		/* eslint-enable no-param-reassign */
	};

	/**
	 * Compiles directives on the given node
	 * @param {Node} root The element on which compilation is required
	 */
	function compileNodes(root) {
		if (!(root instanceof Node)) {
			/* eslint-disable no-param-reassign */
			root = document;
			/* eslint-enable no-param-reassign */
		}
		// Create a querySelectorAll function bound to the passed `root` Node
		const query = selector => [...root.querySelectorAll(selector)];

		function attachListenerForEvent(eventName) {
			const nodes = query(`[d-${eventName}]`);
			nodes.forEach(function(el) {
				el.addEventListener(eventName, function(e) {
					scope[el.getAttribute(`d-${eventName}`)].call(window, e);
				});
			});
		}
		attachListenerForEvent('click');
		attachListenerForEvent('change');
		attachListenerForEvent('input');
		attachListenerForEvent('keyup');

		// Compile d-open-modal directive
		const modalTriggers = query(`[d-open-modal]`);
		modalTriggers.forEach(function(el) {
			utils.onButtonClick(el, function() {
				scope.toggleModal(window[el.getAttribute('d-open-modal')]);
				trackEvent(
					el.getAttribute('data-event-category'),
					el.getAttribute('data-event-action')
				);
			});
		});

		// Compile d-html directive
		const dHtmlNodes = query(`[d-html]`);
		dHtmlNodes.forEach(function(el) {
			fetch(el.getAttribute('d-html')).then(response => {
				// Stop further compilation because of future recursion, by removing attribute.
				el.removeAttribute('d-html');
				response.text().then(html => {
					requestIdleCallback(() => {
						el.innerHTML = html;
						// Now compile this newly inserted HTML also.
						compileNodes(el);
					});
				});
			});
		});
	}

	scope.openDetachedPreview = function() {
		trackEvent('ui', 'detachPreviewBtnClick');

		if (scope.detachedWindow) {
			scope.detachedWindow.focus();
			return;
		}
		var iframeBounds = frame.getBoundingClientRect();
		const iframeWidth = iframeBounds.width;
		const iframeHeight = iframeBounds.height;
		document.body.classList.add('is-detached-mode');
		globalConsoleContainerEl.insertBefore(consoleEl, null);

		scope.detachedWindow = window.open(
			'./preview.html',
			'Web Maker',
			`width=${iframeWidth},height=${iframeHeight},resizable,scrollbars=yes,status=1`
		);
		setTimeout(() => {
			scope.detachedWindow.postMessage(frame.src, '*');
		}, 1000);
		function checkWindow() {
			if (scope.detachedWindow && scope.detachedWindow.closed) {
				clearInterval(intervalID);
				document.body.classList.remove('is-detached-mode');
				$('#js-demo-side').insertBefore(consoleEl, null);
				scope.detachedWindow = null;
				// Update main frame preview
				scope.setPreviewContent(true);
			}
		}
		var intervalID = window.setInterval(checkWindow, 500);
	};

	scope.openCssSettingsModal = function() {
		scope.toggleModal(cssSettingsModal);
		setTimeout(() => {
			// Refresh is required because codemirror gets scaled inside modal and loses alignement.
			scope.acssSettingsCm.refresh();
			scope.acssSettingsCm.focus();
		}, 500);
		trackEvent('ui', 'cssSettingsBtnClick');
	};

	scope.onModalCloseBtnClick = function(e) {
		closeAllOverlays();
		e.preventDefault();
	};

	scope.updateProfileUi = () => {
		if (window.user) {
			document.body.classList.add('is-logged-in');
			headerAvatarImg.src = profileAvatarImg.src = window.user.photoURL || DEFAULT_PROFILE_IMG;
			profileUserName.textContent = window.user.displayName || 'Anonymous Creator';
		} else {
			document.body.classList.remove('is-logged-in');
			headerAvatarImg.src = profileAvatarImg.src = '';
			profileUserName.textContent = 'Anonymous Creator';
		}
	};

	scope.login = e => {
		const provider = e.target.dataset.authProvider;
		window.login(provider);
		if (e) {
			e.preventDefault();
		}
	};
	scope.logout = e => {
		e.preventDefault();
		if (unsavedEditCount) {
			var shouldDiscard = confirm(
				'You have unsaved changes. Do you still want to logout?'
			);
			if (!shouldDiscard) { return; }
		}
		window.logout();
	}

	function init() {
		var config = {
			apiKey: 'AIzaSyBl8Dz7ZOE7aP75mipYl2zKdLSRzBU2fFc',
			authDomain: 'web-maker-app.firebaseapp.com',
			databaseURL: 'https://web-maker-app.firebaseio.com',
			projectId: 'web-maker-app',
			storageBucket: 'web-maker-app.appspot.com',
			messagingSenderId: '560473480645'
		};
		firebase.initializeApp(config);

		firebase.auth().onAuthStateChanged(function(user) {
			scope.closeAllOverlays();
			if (user) {
				utils.log('You are -> ', user);
				alertsService.add('You are now logged in!');
				scope.user = window.user = user;
				window.db.getUser(user.uid).then(customUser => {
					if (customUser) {
						Object.assign(prefs, user.settings);
						updateSettingsInUi();
						scope.updateSetting();
					}
				});
			} else {
				delete window.user;
				// User is signed out.
			}
			scope.updateProfileUi();
		});

		var lastCode;

		CodeMirror.modeURL = `lib/codemirror/mode/%N/%N.js`;

		function getToggleLayoutButtonListener(mode) {
			return function() {
				saveSetting('layoutMode', mode);
				trackEvent('ui', 'toggleLayoutClick', mode);
				toggleLayout(mode);
				return false;
			};
		}
		layoutBtn1.addEventListener('click', getToggleLayoutButtonListener(1));
		layoutBtn2.addEventListener('click', getToggleLayoutButtonListener(2));
		layoutBtn3.addEventListener('click', getToggleLayoutButtonListener(3));
		layoutBtn4.addEventListener('click', getToggleLayoutButtonListener(4));

		notificationsBtn.addEventListener('click', function() {
			scope.toggleModal(notificationsModal);

			if (
				notificationsModal.classList.contains('is-modal-visible') &&
				!hasSeenNotifications
			) {
				hasSeenNotifications = true;
				notificationsBtn.classList.remove('has-new');
				window.db.setUserLastSeenVersion(version);
			}
			trackEvent('ui', 'notificationButtonClick', version);
			return false;
		});

		codepenBtn.addEventListener('click', function(e) {
			if (cssMode === CssModes.ACSS) {
				alert("Oops! CodePen doesn't supports Atomic CSS currently.");
				e.preventDefault();
				return;
			}
			var json = {
				title: 'A Web Maker experiment',
				html: scope.cm.html.getValue(),
				css: scope.cm.css.getValue(),
				js: scope.cm.js.getValue(),

				/* eslint-disable camelcase */
				html_pre_processor: modes[htmlMode].codepenVal,
				css_pre_processor: modes[cssMode].codepenVal,
				js_pre_processor: modes[jsMode].codepenVal,

				css_external: externalCssTextarea.value.split('\n').join(';'),
				js_external: externalJsTextarea.value.split('\n').join(';')

				/* eslint-enable camelcase */
			};
			if (!currentItem.title.match(/Untitled\s\d\d*-\d/)) {
				json.title = currentItem.title;
			}
			json = JSON.stringify(json);
			codepenForm.querySelector('input').value = json;
			codepenForm.submit();
			trackEvent('ui', 'openInCodepen');
			e.preventDefault();
		});

		utils.onButtonClick(saveHtmlBtn, function() {
			saveFile();
			trackEvent('ui', 'saveHtmlClick');
		});

		utils.onButtonClick(savedItemsPaneCloseBtn, toggleSavedItemsPane);
		utils.onButtonClick(savedItemsPane, function(e) {
			// TODO: warn about unsaved changes in current item
			if (e.target.classList.contains('js-saved-item-tile')) {
				setTimeout(function() {
					openItem(e.target.dataset.itemId);
				}, 350);
				toggleSavedItemsPane();
			}
			if (e.target.classList.contains('js-saved-item-tile__remove-btn')) {
				removeItem(e.target.parentElement.parentElement.dataset.itemId);
			} else if (e.target.classList.contains('js-saved-item-tile__fork-btn')) {
				toggleSavedItemsPane();
				setTimeout(function() {
					forkItem(
						savedItems[e.target.parentElement.parentElement.dataset.itemId]
					);
				}, 350);
			}
		});

		titleInput.addEventListener('blur', function() {
			if (currentItem.id) {
				saveItem();
				trackEvent('ui', 'titleChanged');
			}
		});

		// Attach listeners on mode change menu items
		$all('.js-mode-select').forEach(selectBox => {
			selectBox.addEventListener('change', function(e) {
				var mode = e.target.value;
				var type = e.target.dataset.type;
				var currentMode =
					type === 'html' ? htmlMode : type === 'css' ? cssMode : jsMode;
				if (currentMode !== mode) {
					if (type === 'html') {
						updateHtmlMode(mode).then(() => scope.setPreviewContent(true));
					} else if (type === 'js') {
						updateJsMode(mode).then(() => scope.setPreviewContent(true));
					} else if (type === 'css') {
						updateCssMode(mode).then(() => scope.setPreviewContent(true));
					}
					trackEvent('ui', 'updateCodeMode', mode);
				}
			});
		});

		// Collapse btn event listeners
		var collapseBtns = $all('.js-code-collapse-btn');
		collapseBtns.forEach(function(btn) {
			btn.addEventListener('click', function(e) {
				var codeWrapParent =
					e.currentTarget.parentElement.parentElement.parentElement;
				toggleCodeWrapCollapse(codeWrapParent);
				trackEvent('ui', 'paneCollapseBtnClick', codeWrapParent.dataset.type);
				return false;
			});
		});

		// Update code wrap collapse states whenever any of them transitions due to any
		// reason.
		[htmlCode, cssCode, jsCode].forEach(function(el) {
			el.addEventListener('transitionend', function() {
				updateCodeWrapCollapseStates();
			});
		});

		// Editor keyboard shortucuts
		window.addEventListener('keydown', function(event) {
			var selectedItemElement;
			// TODO: refactor common listener code
			// Ctrl/⌘ + S
			if ((event.ctrlKey || event.metaKey) && event.keyCode === 83) {
				event.preventDefault();
				saveItem();
				trackEvent('ui', 'saveItemKeyboardShortcut');
			}
			// Ctrl/⌘ + Shift + 5
			if (
				(event.ctrlKey || event.metaKey) &&
				event.shiftKey &&
				event.keyCode === 53
			) {
				event.preventDefault();
				scope.setPreviewContent(true);
				trackEvent('ui', 'previewKeyboardShortcut');
			} else if ((event.ctrlKey || event.metaKey) && event.keyCode === 79) {
				// Ctrl/⌘ + O
				event.preventDefault();
				openSavedItemsPane();
				trackEvent('ui', 'openCreationKeyboardShortcut');
			} else if (
				(event.ctrlKey || event.metaKey) &&
				event.shiftKey &&
				event.keyCode === 191
			) {
				// Ctrl/⌘ + Shift + ?
				event.preventDefault();
				scope.toggleModal(keyboardShortcutsModal);
				trackEvent('ui', 'showKeyboardShortcutsShortcut');
			} else if (event.keyCode === 27) {
				closeAllOverlays();
			}
			if (event.keyCode === 40 && isSavedItemsPaneOpen) {
				// Return if no items present.
				if (!$all('.js-saved-item-tile').length) {
					return;
				}
				selectedItemElement = $('.js-saved-item-tile.selected');
				if (selectedItemElement) {
					selectedItemElement.classList.remove('selected');
					selectedItemElement
						.nextUntil('.js-saved-item-tile:not(.hide)')
						.classList.add('selected');
				} else {
					$('.js-saved-item-tile:not(.hide)').classList.add('selected');
				}
				$('.js-saved-item-tile.selected').scrollIntoView(false);
			} else if (event.keyCode === 38 && isSavedItemsPaneOpen) {
				if (!$all('.js-saved-item-tile').length) {
					return;
				}
				selectedItemElement = $('.js-saved-item-tile.selected');
				if (selectedItemElement) {
					selectedItemElement.classList.remove('selected');
					selectedItemElement
						.previousUntil('.js-saved-item-tile:not(.hide)')
						.classList.add('selected');
				} else {
					$('.js-saved-item-tile:not(.hide)').classList.add('selected');
				}
				$('.js-saved-item-tile.selected').scrollIntoView(false);
			} else if (event.keyCode === 13 && isSavedItemsPaneOpen) {
				selectedItemElement = $('.js-saved-item-tile.selected');
				if (!selectedItemElement) {
					return;
				}
				setTimeout(function() {
					openItem(selectedItemElement.dataset.itemId);
				}, 350);
				toggleSavedItemsPane();
			}

			// Fork shortcut inside saved creations panel with Ctrl/⌘ + F
			if (
				isSavedItemsPaneOpen &&
				(event.ctrlKey || event.metaKey) &&
				event.keyCode === 70
			) {
				event.preventDefault();
				selectedItemElement = $('.js-saved-item-tile.selected');
				setTimeout(function() {
					forkItem(savedItems[selectedItemElement.dataset.itemId]);
				}, 350);
				toggleSavedItemsPane();
				trackEvent('ui', 'forkKeyboardShortcut');
			}
		});

		window.addEventListener('click', function(e) {
			if (typeof e.target.className !== 'string') {
				return;
			}
			if (e.target.className.indexOf('modal-overlay') !== -1) {
				closeAllOverlays();
			}
		});
		window.addEventListener('dblclick', function(e) {
			var target = e.target;
			if (target.classList.contains('js-console__header')) {
				scope.toggleConsole();
				trackEvent('ui', 'consoleToggleDblClick');
			}
			if (target.classList.contains('js-code-wrap__header')) {
				var codeWrapParent = target.parentElement;
				toggleCodeWrapCollapse(codeWrapParent);
				trackEvent('ui', 'paneHeaderDblClick', codeWrapParent.dataset.type);
			}
		});

		// Initialize add library select box
		var libOptions = window.jsLibs.reduce(
			(html, lib) =>
				html +
				`<option data-type="${lib.type}" value="${lib.url}">${lib.label}</option>`,
			''
		);
		addLibrarySelect.children[1].innerHTML = libOptions;
		libOptions = window.cssLibs.reduce(
			(html, lib) =>
				html +
				`<option data-type="${lib.type}" value="${lib.url}">${lib.label}</option>`,
			''
		);
		addLibrarySelect.children[2].innerHTML = libOptions;
		addLibrarySelect.addEventListener('change', function onSelectChange(e) {
			var target = e.target;
			if (!target.value) {
				return;
			}
			$('#js-external-' + target.selectedOptions[0].dataset.type).value +=
				'\n' + target.value;
			trackEvent('ui', 'addLibrarySelect', target.selectedOptions[0].label);
			onExternalLibChange();
			// Reset the select to the default value
			target.value = '';
		});
		externalJsTextarea.addEventListener('blur', onExternalLibChange);
		externalCssTextarea.addEventListener('blur', onExternalLibChange);

		new TextareaAutoComplete(externalJsTextarea, {
			filter: obj => obj.latest.match(/\.js$/)
		});
		new TextareaAutoComplete(externalCssTextarea, {
			filter: obj => obj.latest.match(/\.css$/)
		});
		new TextareaAutoComplete(externalLibrarySearchInput, {
			selectedCallback: value => {
				const textarea = value.match(/\.js$/)
					? externalJsTextarea
					: externalCssTextarea;
				textarea.value = `${textarea.value}\n${value}`;
				externalLibrarySearchInput.value = '';
			}
		});

		// Console header drag resize logic
		var consoleHeaderDragStartY;
		var consoleInitialHeight;
		function onConsoleHeaderDrag(e) {
			consoleEl.style.height =
				consoleInitialHeight + consoleHeaderDragStartY - e.pageY + 'px';
		}
		$('.js-console__header').addEventListener('mousedown', e => {
			consoleHeaderDragStartY = e.pageY;
			consoleInitialHeight = consoleEl.getBoundingClientRect().height;
			$('#demo-frame').classList.add('pointer-none');
			window.addEventListener('mousemove', onConsoleHeaderDrag);
		});
		$('.js-console__header').addEventListener('mouseup', () => {
			window.removeEventListener('mousemove', onConsoleHeaderDrag);
			$('#demo-frame').classList.remove('pointer-none');
		});

		db.local.get(
			{
				layoutMode: 1,
				code: ''
			},
			function localGetCallback(result) {
				toggleLayout(result.layoutMode);
				prefs.layoutMode = result.layoutMode;
				if (result.code) {
					lastCode = result.code;
				}
			}
		);

		// Get synced `preserveLastCode` setting to get back last code (or not).
		db.getSettings(defaultSettings).then(result => {
			if (result.preserveLastCode && lastCode) {
				unsavedEditCount = 0;
				if (lastCode.id) {
					// Ignore for remote db
					db.local.get(lastCode.id, function(itemResult) {
						if (itemResult[lastCode.id]) {
							utils.log('Load item ', lastCode.id);
							currentItem = itemResult[lastCode.id];
							refreshEditor();
						}
					});
				} else {
					utils.log('Load last unsaved item', lastCode);
					currentItem = lastCode;
					refreshEditor();
				}
			} else {
				createNewItem();
			}
			Object.assign(prefs, result);

			updateSettingsInUi();
			scope.updateSetting();
		});

		// Check for new version notifications
		db.getUserLastSeenVersion().then(lastSeenVersion => {
			// Check if new user
			if (!lastSeenVersion) {
				onboardModal.classList.add('is-modal-visible');
				if (document.cookie.indexOf('onboarded') === -1) {
					trackEvent('ui', 'onboardModalSeen', version);
					document.cookie = 'onboarded=1';
				}
				window.db.setUserLastSeenVersion(version);
				// set some initial preferences on closing the onboard modal
				// Old onboarding.
				// utils.once(document, 'overlaysClosed', function() {});
			}
			if (
				!lastSeenVersion ||
				utils.semverCompare(lastSeenVersion, version) === -1
			) {
				notificationsBtn.classList.add('has-new');
				hasSeenNotifications = false;
			}
		});

		scope.acssSettingsCm = CodeMirror.fromTextArea(acssSettingsTextarea, {
			mode: 'application/ld+json'
		});
		scope.acssSettingsCm.on('blur', () => {
			scope.setPreviewContent(true);
		});

		var options = '';
		[
			'3024-day',
			'3024-night',
			'abcdef',
			'ambiance',
			'base2tone-meadow-dark',
			'base16-dark',
			'base16-light',
			'bespin',
			'blackboard',
			'cobalt',
			'colorforth',
			'dracula',
			'duotone-dark',
			'duotone-light',
			'eclipse',
			'elegant',
			'erlang-dark',
			'hopscotch',
			'icecoder',
			'isotope',
			'lesser-dark',
			'liquibyte',
			'material',
			'mbo',
			'mdn-like',
			'midnight',
			'monokai',
			'neat',
			'neo',
			'night',
			'panda-syntax',
			'paraiso-dark',
			'paraiso-light',
			'pastel-on-dark',
			'railscasts',
			'rubyblue',
			'seti',
			'solarized dark',
			'solarized light',
			'the-matrix',
			'tomorrow-night-bright',
			'tomorrow-night-eighties',
			'ttcn',
			'twilight',
			'vibrant-ink',
			'xq-dark',
			'xq-light',
			'yeti',
			'zenburn'
		].forEach(theme => {
			options += '<option value="' + theme + '">' + theme + '</option>';
		});
		document.querySelector('[data-setting="editorTheme"]').innerHTML = options;

		requestAnimationFrame(compileNodes);
	}

	// Set few stuff on a 'scope' object so that they can be referenced dynamically.
	scope.closeAllOverlays = closeAllOverlays;

	init();
})(window.alertsService, window.itemService);
