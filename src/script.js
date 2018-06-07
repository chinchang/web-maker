/* eslint-disable no-extra-semi */
(function (alertsService, itemService) {
	/* eslint-enable no-extra-semi */
	var scope = scope || {};
	var version = '3.2.0';

	if (window.DEBUG) {
		window.scope = scope;
	}



	const BASE_PATH = chrome.extension || window.DEBUG ? '/' : '/app';
	const DEFAULT_PROFILE_IMG =
		"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='#ccc' d='M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z' /%3E%3C/svg%3E";

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
		editorWithFocus,
		logCount = 0,




		// Returns the sizes of main code & preview panes.
		function getMainSplitSizesToApply() {
			var mainSplitSizes;
			if (currentItem && currentItem.mainSizes) {
				// For layout mode 3, main panes are reversed using flex-direction.
				// So we need to apply the saved sizes in reverse order.
				mainSplitSizes =
					currentLayoutMode === 3 ? [currentItem.mainSizes[1], currentItem.mainSizes[0]] :
					currentItem.mainSizes;
			} else {
				mainSplitSizes = currentLayoutMode === 5 ? [75, 25] : [50, 50];
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
			direction: currentLayoutMode === 2 || currentLayoutMode === 5 ?
				'horizontal' : 'vertical',
			minSize: minCodeWrapSize,
			gutterSize: 6,
			onDragStart: function () {
				document.body.classList.add('is-dragging');
			},
			onDragEnd: function () {
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
			onDragEnd: function () {
				if (prefs.refreshOnResize) {
					// Running preview updation in next call stack, so that error there
					// doesn't affect this dragend listener.
					setTimeout(function () {
						scope.setPreviewContent(true);
					}, 1);
				}
			}
		});
	}


	function saveSetting(setting, value) {
		const d = deferred();
		const obj = {
			[setting]: value
		};
		db.local.set(obj, d.resolve);
		return d.promise;
	}



	// Calculates the sizes of html, css & js code panes.
	function getCodePaneSizes() {
		var sizes;
		var dimensionProperty =
			currentLayoutMode === 2 || currentLayoutMode === 5 ? 'width' : 'height';
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
			sizes = [+$('#js-code-side').style[dimensionProperty].match(/([\d.]+)%/)[1], +$('#js-demo-side').style[dimensionProperty].match(/([\d.]+)%/)[1]];
		} catch (e) {
			sizes = [50, 50];
		} finally {
			/* eslint-disable no-unsafe-finally */
			return sizes;

			/* eslint-enable no-unsafe-finally */
		}
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
		pledgeModal.classList.remove('is-modal-visible');
		askToImportModal.classList.remove('is-modal-visible');
		toggleSavedItemsPane(false);
		document.dispatchEvent(new Event('overlaysClosed'));
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



	window.previewException = function (error) {
		console.error('Possible infinite loop detected.', error.stack);
		window.onMessageFromConsole(
			'Possible infinite loop detected.',
			error.stack
		);
	};
	window.onunload = function () {
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
		errors.forEach(function (e) {
			editor.operation(function () {
				var n = document.createElement('div');
				n.setAttribute('data-title', e.message);
				n.classList.add('gutter-error-marker');
				editor.setGutterMarker(e.lineNumber, 'error-gutter', n);
			});
		});
	}



	function saveFile() {
		var htmlPromise = computeHtml();
		var cssPromise = computeCss();
		var jsPromise = computeJs(false);
		Promise.all([htmlPromise, cssPromise, jsPromise]).then(function (result) {
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

			if (currentItem.title) {
				fileName = currentItem.title;
			}
			fileName += '.html';

			var blob = new Blob([fileContent], {
				type: 'text/html;charset=UTF-8'
			});
			utils.downloadFile(fileName, blob);

			trackEvent('fn', 'saveFileComplete');
		});
	}


	// Initialize codemirror in console
	scope.consoleCm = CodeMirror(consoleLogEl, {
		mode: 'javascript',
		lineWrapping: true,
		theme: 'monokai',
		foldGutter: true,
		readOnly: true,
		gutters: ['CodeMirror-foldgutter']
	});


	scope.onModalSettingsLinkClick = function onModalSettingsLinkClick() {
		openSettings();
		trackEvent('ui', 'onboardSettingsBtnClick');
	};

	scope.onShowInTabClicked = function onShowInTabClicked() {
		trackEvent('ui', 'onboardShowInTabClick');
	};
	scope.onDontShowInTabClicked = function onDontShowInTabClicked() {
		trackEvent('ui', 'onboardDontShowInTabClick');
	};

	scope.exportItems = function exportItems(e) {
		handleDownloadsPermission().then(() => {
			fetchItems().then(function (items) {
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
		const d = deferred();
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
				d.resolve();
				alertsService.add(
					mergedItemCount + ' creations imported successfully.'
				);
				trackEvent('fn', 'itemsImported', mergedItemCount);
			});
		} else {
			d.resolve();
		}
		// FIXME: Move from here
		toggleSavedItemsPane(false);

		return d.promise;
	}

	function onImportFileChange(e) {
		var file = e.target.files[0];

		var reader = new FileReader();
		reader.onload = function (progressEvent) {
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
		var mimeString = dataURI
			.split(',')[0]
			.split(':')[1]
			.split(';')[0];

		// write the bytes of the string to an ArrayBuffer
		var ab = new ArrayBuffer(byteString.length);
		var ia = new Uint8Array(ab);
		for (var i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}

		// create a blob for writing to a file
		var blob = new Blob([ab], {
			type: mimeString
		});
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

			chrome.downloads.download({
					url: filePath
				},
				function () {
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
					fileName, {
						create: true
					},
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
		chrome.permissions.contains({
				permissions: ['downloads']
			},
			function (result) {
				if (result) {
					d.resolve();
				} else {
					chrome.permissions.request({
							permissions: ['downloads']
						},
						function (granted) {
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

	scope.takeScreenshot = function (e) {
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
					null, {
						format: 'png',
						quality: 100
					},
					function (dataURI) {
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



	scope.onSaveBtnClick = function () {
		trackEvent('ui', 'saveBtnClick', currentItem.id ? 'saved' : 'new');
		saveItem();
	};

	/**
	 * Toggles a modal and logs an event.
	 * @param  {Node} modal     modal to be toggled
	 */
	scope.toggleModal = function (modal) {
		modal.classList.toggle('is-modal-visible');
		const hasOpened = modal.classList.contains('is-modal-visible');
		document.body.classList[hasOpened ? 'add' : 'remove']('overlay-visible');

		if (hasOpened) {
			/* eslint-disable no-inner-declarations */
			function onTransitionEnd() {
				modal.querySelector('.js-modal__close-btn').focus();
				modal
					.querySelector('.modal__content')
					.removeEventListener('transitionend', onTransitionEnd);
			}
			/* eslint-enable no-inner-declarations */

			modal
				.querySelector('.modal__content')
				.addEventListener('transitionend', onTransitionEnd);
		}
	};
	scope.onSearchInputChange = function (e) {
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

	scope.toggleConsole = function () {
		consoleEl.classList.toggle('is-minimized');
		trackEvent('ui', 'consoleToggle');
	};
	// `clearConsole` is on window because it gets called from inside iframe also.
	scope.clearConsole = window.clearConsole = function () {
		scope.consoleCm.setValue('');
		logCount = 0;
		logCountEl.textContent = logCount;
	};
	scope.onClearConsoleBtnClick = function () {
		scope.clearConsole();
		trackEvent('ui', 'consoleClearBtnClick');
	};
	scope.evalConsoleExpr = function (e) {
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
	window.onMessageFromConsole = function () {
		/* eslint-disable no-param-reassign */
		[...arguments].forEach(function (arg) {
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
					'\n', {
						line: Infinity
					}
				);
			} catch (e) {
				scope.consoleCm.replaceRange('🌀\n', {
					line: Infinity
				});
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
			nodes.forEach(function (el) {
				el.addEventListener(eventName, function (e) {
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
		modalTriggers.forEach(function (el) {
			utils.onButtonClick(el, function () {
				scope.toggleModal(window[el.getAttribute('d-open-modal')]);
				trackEvent(
					el.getAttribute('data-event-category'),
					el.getAttribute('data-event-action')
				);
			});
		});

		// Compile d-html directive
		const dHtmlNodes = query(`[d-html]`);
		dHtmlNodes.forEach(function (el) {
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

	scope.onRunBtnClick = function () {
		scope.setPreviewContent(true, true);
		trackEvent('ui', 'runBtnClick');
	};


	scope.openCssSettingsModal = function () {
		scope.toggleModal(cssSettingsModal);
		setTimeout(() => {
			// Refresh is required because codemirror gets scaled inside modal and loses alignement.
			scope.acssSettingsCm.refresh();
			scope.acssSettingsCm.focus();
		}, 500);
		trackEvent('ui', 'cssSettingsBtnClick');
	};


	scope.openSupportDeveloperModal = function (e) {
		closeAllOverlays();
		scope.toggleModal(pledgeModal);
		if (e) {
			trackEvent('ui', e.target.dataset.eventAction);
		}
	};



	/**
	 * Called from inside ask-to-import-modal
	 */
	scope.dontAskToImportAnymore = e => {
		scope.toggleModal(askToImportModal);
		window.localStorage[LocalStorageKeys.ASKED_TO_IMPORT_CREATIONS] = true;
		if (e) {
			trackEvent('ui', 'dontAskToImportBtnClick');
		}
	};

	/**
	 * Called from inside ask-to-import-modal
	 */
	scope.importCreationsAndSettingsIntoApp = () => {
		mergeImportedItems(scope.oldSavedItems).then(() => {
			trackEvent('fn', 'oldItemsImported');
			scope.dontAskToImportAnymore();
		});
	};

	function init() {



		var lastCode;

		window.db.local.get({
			lastAuthProvider: ''
		}, result => {
			if (result.lastAuthProvider) {
				document.body.classList.add(`last-login-${result.lastAuthProvider}`);
			}
		});

		document.body.style.height = `${window.innerHeight}px`;



		notificationsBtn.addEventListener('click', function () {
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

		codepenBtn.addEventListener('click', function (e) {
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

		utils.onButtonClick(saveHtmlBtn, function () {
			saveFile();
			trackEvent('ui', 'saveHtmlClick');
		});

		utils.onButtonClick(savedItemsPaneCloseBtn, toggleSavedItemsPane);
		utils.onButtonClick(savedItemsPane, function (e) {
			// TODO: warn about unsaved changes in current item
			if (e.target.classList.contains('js-saved-item-tile')) {
				setTimeout(function () {
					openItem(e.target.dataset.itemId);
				}, 350);
				toggleSavedItemsPane();
			}
			if (e.target.classList.contains('js-saved-item-tile__remove-btn')) {
				removeItem(e.target.parentElement.parentElement.dataset.itemId);
			} else if (e.target.classList.contains('js-saved-item-tile__fork-btn')) {
				toggleSavedItemsPane();
				setTimeout(function () {
					forkItem(
						savedItems[e.target.parentElement.parentElement.dataset.itemId]
					);
				}, 350);
			}
		});


		// Collapse btn event listeners
		var collapseBtns = $all('.js-code-collapse-btn');
		collapseBtns.forEach(function (btn) {
			btn.addEventListener('click', function (e) {
				var codeWrapParent =
					e.currentTarget.parentElement.parentElement.parentElement;
				toggleCodeWrapCollapse(codeWrapParent);
				trackEvent('ui', 'paneCollapseBtnClick', codeWrapParent.dataset.type);
				return false;
			});
		});

		// Update code wrap collapse states whenever any of them transitions due to any
		// reason.
		[htmlCode, cssCode, jsCode].forEach(function (el) {
			el.addEventListener('transitionend', function () {
				updateCodeWrapCollapseStates();
			});
		});

		// Editor keyboard shortucuts
		window.addEventListener('keydown', function (event) {
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
				scope.setPreviewContent(true, true);
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
		});

		savedItemsPane.addEventListener('keydown', function (event) {
			if (!isSavedItemsPaneOpen) {
				return;
			}

			const isCtrlOrMetaPressed = event.ctrlKey || event.metaKey;
			const isForkKeyPressed = isCtrlOrMetaPressed && event.keyCode === 70;
			const isDownKeyPressed = event.keyCode === 40;
			const isUpKeyPressed = event.keyCode === 38;
			const isEnterKeyPressed = event.keyCode === 13;

			const selectedItemElement = $('.js-saved-item-tile.selected');
			const havePaneItems = $all('.js-saved-item-tile').length !== 0;

			if ((isDownKeyPressed || isUpKeyPressed) && havePaneItems) {
				const method = isDownKeyPressed ? 'nextUntil' : 'previousUntil';

				if (selectedItemElement) {
					selectedItemElement.classList.remove('selected');
					selectedItemElement[method](
						'.js-saved-item-tile:not(.hide)'
					).classList.add('selected');
				} else {
					$('.js-saved-item-tile:not(.hide)').classList.add('selected');
				}
				$('.js-saved-item-tile.selected').scrollIntoView(false);
			}

			if (isEnterKeyPressed && selectedItemElement) {
				setTimeout(function () {
					openItem(selectedItemElement.dataset.itemId);
				}, 350);
				toggleSavedItemsPane();
			}

			// Fork shortcut inside saved creations panel with Ctrl/⌘ + F
			if (isForkKeyPressed) {
				event.preventDefault();
				setTimeout(function () {
					forkItem(savedItems[selectedItemElement.dataset.itemId]);
				}, 350);
				toggleSavedItemsPane();
				trackEvent('ui', 'forkKeyboardShortcut');
			}
		});

		window.addEventListener('click', function (e) {
			if (typeof e.target.className !== 'string') {
				return;
			}
			if (
				e.target.classList.contains('modal-overlay') ||
				e.target.classList.contains('modal')
			) {
				closeAllOverlays();
			}
		});
		window.addEventListener('dblclick', function (e) {
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
			`<option data-type="${lib.type}" value="${lib.url}">${
					lib.label
				}</option>`,
			''
		);
		addLibrarySelect.children[1].innerHTML = libOptions;
		libOptions = window.cssLibs.reduce(
			(html, lib) =>
			html +
			`<option data-type="${lib.type}" value="${lib.url}">${
					lib.label
				}</option>`,
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
				const textarea = value.match(/\.js$/) ?
					externalJsTextarea :
					externalCssTextarea;
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





		scope.acssSettingsCm = CodeMirror.fromTextArea(acssSettingsTextarea, {
			mode: 'application/ld+json'
		});
		scope.acssSettingsCm.on('blur', () => {
			scope.setPreviewContent(true);
		});


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
	}


	init();
})(window.alertsService, window.itemService);
