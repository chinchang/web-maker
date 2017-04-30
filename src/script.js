/* global trackEvent */
/* global layoutBtn1, layoutBtn2, layoutBtn3, helpModal, notificationsModal, addLibraryModal,
onboardModal, layoutBtn1, layoutBtn2, layoutBtn3, layoutBtn4, helpBtn, onboardModal, onboardModal,
addLibraryModal, addLibraryModal, notificationsBtn, notificationsModal, notificationsModal,
notificationsModal, notificationsBtn, codepenBtn, saveHtmlBtn, saveBtn, settingsBtn,
onboardModal, settingsModal, notificationsBtn, onboardShowInTabOptionBtn, editorThemeLinkTag,
onboardDontShowInTabOptionBtn, TextareaAutoComplete, savedItemCountEl, indentationSizeValueEl,
runBtn, searchInput
*/
/* eslint-disable no-extra-semi */
;(function (alertsService) {

/* eslint-enable no-extra-semi */
	var scope = scope || {};
	var version = '2.4.2';

	if (window.DEBUG) {
		window.scope = scope;
	}

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
	modes[HtmlModes.HTML] = { label: 'HTML', cmMode: 'htmlmixed', codepenVal: 'none' };
	modes[HtmlModes.MARKDOWN] = { label: 'Markdown', cmMode: 'markdown', codepenVal: 'markdown' };
	modes[HtmlModes.JADE] = { label: 'Pug', cmMode: 'pug', codepenVal: 'pug' };
	modes[JsModes.JS] = { label: 'JS', cmMode: 'javascript', codepenVal: 'none' };
	modes[JsModes.COFFEESCRIPT] = { label: 'CoffeeScript', cmMode: 'coffeescript', codepenVal: 'coffeescript' };
	modes[JsModes.ES6] = { label: 'ES6 (Babel)', cmMode: 'jsx', codepenVal: 'babel' };
	modes[JsModes.TS] = { label: 'TypeScript', cmPath: 'jsx', cmMode: 'text/typescript-jsx', codepenVal: 'typescript' };
	modes[CssModes.CSS] = { label: 'CSS', cmPath: 'css', cmMode: 'css', codepenVal: 'none' };
	modes[CssModes.SCSS] = { label: 'SCSS', cmPath: 'css', cmMode: 'text/x-scss', codepenVal: 'scss' };
	modes[CssModes.SASS] = { label: 'SASS', cmMode: 'sass', codepenVal: 'sass' };
	modes[CssModes.LESS] = { label: 'LESS', cmPath: 'css', cmMode: 'text/x-less', codepenVal: 'less' };
	modes[CssModes.STYLUS] = { label: 'Stylus', cmMode: 'stylus', codepenVal: 'stylus' };
	modes[CssModes.ACSS] = { label: 'Atomic CSS', cmPath: 'css', cmMode: 'css', codepenVal: 'notsupported', cmDisable: true };

	var updateTimer
		, updateDelay = 500
		, unsavedEditWarningCount = 15
		, currentLayoutMode
		, hasSeenNotifications = true
		, htmlMode = HtmlModes.HTML
		, jsMode = JsModes.JS
		, cssMode = CssModes.CSS
		, sass
		, currentItem
		, unsavedEditCount
		, savedItems
		, minCodeWrapSize = 33
		, mainSplitInstance
		, codeSplitInstance
		, prefs = {}
		, codeInPreview = { html: null, css: null, js: null }
		, isSavedItemsPaneOpen = false
		, editorWithFocus

		// DOM nodes
		, frame = $('#demo-frame')
		, htmlCode = $('#js-html-code')
		, cssCode = $('#js-css-code')
		, jsCode = $('#js-js-code')
		, codepenForm = $('#js-codepen-form')
		, savedItemsPane = $('#js-saved-items-pane')
		, savedItemsPaneCloseBtn = $('#js-saved-items-pane-close-btn')
		, htmlModelLabel = $('#js-html-mode-label')
		, cssModelLabel = $('#js-css-mode-label')
		, jsModelLabel = $('#js-js-mode-label')
		, titleInput = $('#js-title-input')
		, addLibrarySelect = $('#js-add-library-select')
		, addLibraryBtn = $('#js-add-library-btn')
		, externalJsTextarea = $('#js-external-js')
		, externalCssTextarea = $('#js-external-css')
		;

	scope.cm = {};
	scope.demoFrameDocument = frame.contentDocument || frame.contentWindow.document;

	// Check all the code wrap if they are minimized or not
	function updateCodeWrapCollapseStates() {
		clearTimeout(updateCodeWrapCollapseStates.timeout);
		updateCodeWrapCollapseStates.timeout = setTimeout(function () {
			[ htmlCode, cssCode, jsCode ].forEach(function (el) {
				var bounds = el.getBoundingClientRect();
				if (bounds[currentLayoutMode === 2 ? 'width' : 'height'] < 100) {
					el.classList.add('is-minimized');
				} else {
					el.classList.remove('is-minimized');
				}
			});
		}, 50);
	}

	function toggleCodeWrapCollapse(codeWrapEl) {
		if (codeWrapEl.classList.contains('is-minimized')) {
			codeWrapEl.classList.remove('is-minimized');
			codeSplitInstance.setSizes([ 33.3, 33.3, 33.3 ]);
		} else {
			codeSplitInstance.collapse(parseInt(codeWrapEl.dataset.codeWrapId, 10));
			codeWrapEl.classList.add('is-minimized');
		}
	}
	// Returns the sizes of main code & preview panes.
	function getMainSplitSizesToApply() {
		var mainSplitSizes;
		if (currentItem && currentItem.mainSizes) {
			// For layout mode 3, main panes are reversed using flex-direction.
			// So we need to apply the saved sizes in reverse order.
			mainSplitSizes = currentLayoutMode === 3 ? [ currentItem.mainSizes[1], currentItem.mainSizes[0] ] : currentItem.mainSizes;
		} else {
			mainSplitSizes = [ 50, 50];
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
			direction: (currentLayoutMode === 2 ? 'horizontal' : 'vertical'),
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
			options.sizes = [ 33.33, 33.33, 33.33 ];
		}

		codeSplitInstance = Split(['#js-html-code', '#js-css-code', '#js-js-code'], options);
		mainSplitInstance = Split(['#js-code-side', '#js-demo-side' ], {
			direction: (currentLayoutMode === 2 ? 'vertical' : 'horizontal'),
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
	function toggleLayout(mode) {
		if (currentLayoutMode === mode) {
			utils.log('setMainsize', currentItem.mainSizes || [ 50, 50 ]);
			utils.log('setsize', currentItem.sizes || [ 33.33, 33.33, 33.33 ]);
			mainSplitInstance.setSizes(getMainSplitSizesToApply());
			codeSplitInstance.setSizes(currentItem.sizes || [ 33.33, 33.33, 33.33 ]);
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
	}

	function updateExternalLibUi() {
		// Calculate no. of external libs
		var noOfExternalLibs = 0;
		noOfExternalLibs += externalJsTextarea.value.split('\n').filter((lib) => !!lib).length;
		noOfExternalLibs += externalCssTextarea.value.split('\n').filter((lib) => !!lib).length;
		if (noOfExternalLibs) {
			$('#js-external-lib-count').textContent = noOfExternalLibs;
			$('#js-external-lib-count').style.display = 'inline';
		} else {
			$('#js-external-lib-count').style.display = 'none';
		}
	}

	function saveSetting(setting, value, cb) {
		var obj = {};
		obj[setting] = value;
		chrome.storage.local.set(obj, cb || function(){});
	}

	// Save current item to storage
	function saveItem() {
		var isNewItem = !currentItem.id;
		currentItem.id = currentItem.id || ('item-' + utils.generateRandomId());
		saveCode();

		// Push into the items hash if its a new item being saved
		if (isNewItem) {
			chrome.storage.local.get({
				items: {}
			}, function (result) {
				result.items[currentItem.id] = true;
				chrome.storage.local.set({
					items: result.items
				});
			});
		}
	}

	// Calculates the sizes of html, css & js code panes.
	function getCodePaneSizes() {
		var sizes;
		var dimensionProperty = currentLayoutMode === 2 ? 'width' : 'height';
		try {
			sizes = [
				+htmlCode.style[dimensionProperty].match(/([\d.]+)%/)[1],
				+cssCode.style[dimensionProperty].match(/([\d.]+)%/)[1],
				+jsCode.style[dimensionProperty].match(/([\d.]+)%/)[1]
			];
		} catch (e) {
			sizes = [ 33.33, 33.33, 33.33 ]
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
			sizes = [ 50, 50 ]
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
		currentItem.updatedOn = Date.now();
		currentItem.layoutMode = currentLayoutMode;
		currentItem.externalLibs = { js: externalJsTextarea.value, css: externalCssTextarea.value };

		currentItem.sizes = getCodePaneSizes();
		currentItem.mainSizes = getMainPaneSizes();

		utils.log('saving key', key || currentItem.id, currentItem)
		saveSetting(key || currentItem.id, currentItem, function () {
			alertsService.add('Item saved.');
			unsavedEditCount = 0;
			saveBtn.classList.remove('is-marked');
		});
	}

	function populateItemsInSavedPane(items) {
		var html = '';
		if (items.length) {
			// TODO: sort desc. by updation date
			items.sort(function (a, b) {
				return b.updatedOn - a.updatedOn;
			});
			items.forEach(function (item) {
				html += '<div class="js-saved-item-tile saved-item-tile" data-item-id="' + item.id + '">'
					+ '<a class="js-saved-item-tile__close-btn  saved-item-tile__close-btn hint--left" aria-label="Remove">X</a>'
					+ '<h3 class="saved-item-tile__title">' + item.title + '</h3><span class="saved-item-tile__meta">Last updated: ' + utils.getHumanDate(item.updatedOn) + '</span></div>';
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
		document.body.classList[isSavedItemsPaneOpen ? 'add' : 'remove']('overlay-visible');
	}

	/**
	 * Fetches all items from storage
	 * @param  {boolean} shouldSaveGlobally Whether to store the fetched items in global arr for later use.
	 * @return {promise}                    Promise.
	 */
	function fetchItems(shouldSaveGlobally) {
		var d = deferred();
		chrome.storage.local.get('items', function (result) {
			var itemIds = Object.getOwnPropertyNames(result.items || {}),
				items = [];
			if (!itemIds.length) {
				d.resolve([]);
			}

			savedItems = savedItems || {};
			trackEvent('fn', 'fetchItems', itemIds.length);
			for (let i = 0; i < itemIds.length; i++) {

				/* eslint-disable no-loop-func */
				chrome.storage.local.get(itemIds[i], function (itemResult) {
					if (shouldSaveGlobally) {
						savedItems[itemIds[i]] = itemResult[itemIds[i]];
					}
					items.push(itemResult[itemIds[i]]);
					// Check if we have all items now.
					if (itemIds.length === items.length) {
						d.resolve(items)
					}
				});

				/* eslint-enable no-loop-func */
			}
		});
		return d.promise;
	}

	function openSavedItemsPane() {
		fetchItems(true).then(function (items) {
			populateItemsInSavedPane(items);
		});
	}
	function setCurrentItem(item) {
		currentItem = item;
		// Reset unsaved count, in UI also.
		unsavedEditCount = 0;
		saveBtn.classList.remove('is-marked');
	}
	function createNewItem() {
		var d = new Date();
		setCurrentItem({
			title: 'Untitled ' + d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getHours() + ':' + d.getMinutes(),
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
		var itemTile = document.querySelector('.js-saved-item-tile[data-item-id="' + itemId + '"]');
		var answer = confirm(`Are you sure you want to delete "${savedItems[itemId].title}"?`);
		if (!answer) { return; }

		itemTile.remove();
		// Remove from items list
		chrome.storage.local.get({
			items: {}
		}, function (result) {
			delete result.items[itemId]
			chrome.storage.local.set({
				items: result.items
			});
		});

		// Remove individual item too.
		chrome.storage.local.remove(itemId, function () {
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
		externalJsTextarea.value = (currentItem.externalLibs && currentItem.externalLibs.js) || '';
		externalCssTextarea.value = (currentItem.externalLibs && currentItem.externalLibs.css) || '';

		utils.log('refresh editor')
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
		toggleSavedItemsPane(false);
		document.dispatchEvent(new Event('overlaysClosed'));
	}

	/**
	 * Loaded the code comiler based on the mode selected
	 */
	function handleModeRequirements(mode) {
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
			loadJS('lib/jade.js').then(setLoadedFlag);
		} else if (mode === HtmlModes.MARKDOWN) {
			loadJS('lib/marked.js').then(setLoadedFlag);
		} else if (mode === CssModes.LESS) {
			loadJS('lib/less.min.js').then(setLoadedFlag);
		} else if (mode === CssModes.SCSS || mode === CssModes.SASS) {
			loadJS('lib/sass.js').then(function () {
				sass = new Sass('lib/sass.worker.js');
				setLoadedFlag();
			});
		} else if (mode === CssModes.STYLUS) {
			loadJS('lib/stylus.min.js').then(setLoadedFlag);
		} else if (mode === CssModes.ACSS) {
			loadJS('lib/atomizer.browser.js').then(setLoadedFlag);
		} else if (mode === JsModes.COFFEESCRIPT) {
			loadJS('lib/coffee-script.js').then(setLoadedFlag);
		} else if (mode === JsModes.ES6) {
			loadJS('lib/babel.min.js').then(setLoadedFlag);
		} else if (mode === JsModes.TS) {
			loadJS('lib/typescript.js').then(setLoadedFlag);
		} else {
			d.resolve();
		}

		return d.promise;
	}

	function updateHtmlMode(value) {
		htmlMode = value;
		htmlModelLabel.textContent = modes[value].label;
		scope.cm.html.setOption('mode', modes[value].cmMode);
		CodeMirror.autoLoadMode(scope.cm.html, modes[value].cmPath || modes[value].cmMode);
		return handleModeRequirements(value);
	}
	function updateCssMode(value) {
		cssMode = value;
		cssModelLabel.textContent = modes[value].label;
		scope.cm.css.setOption('mode', modes[value].cmMode);
		scope.cm.css.setOption('readOnly', modes[value].cmDisable);
		CodeMirror.autoLoadMode(scope.cm.css, modes[value].cmPath || modes[value].cmMode);
		return handleModeRequirements(value);
	}
	function updateJsMode(value) {
		jsMode = value;
		jsModelLabel.textContent = modes[value].label;
		scope.cm.js.setOption('mode', modes[value].cmMode);
		CodeMirror.autoLoadMode(scope.cm.js, modes[value].cmPath || modes[value].cmMode);
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
				sass.compile(code, { indentedSyntax: cssMode === CssModes.SASS }, function(result) {
					// Something was wrong
					if (result.line && result.message) {
						showErrors('css', [ { lineNumber: result.line - 1, message: result.message } ]);
					}
					d.resolve(result.text);
				});
			} else {
				d.resolve(code);
			}
		} else if (cssMode === CssModes.LESS) {
			less.render(code).then(function (result) {
				d.resolve(result.css);
			}, function (error) {
				showErrors('css', [ { lineNumber: error.line, message: error.message } ]);
			});
		} else if (cssMode === CssModes.STYLUS) {
			stylus(code).render(function (error, result) {
				if (error) {
					window.err = error;
					// Last line of message is the actual message
					var tempArr = error.message.split('\n');
					tempArr.pop(); // This is empty string in the end
					showErrors('css', [ { lineNumber: +error.message.match(/stylus:(\d+):/)[1] - 298, message: tempArr.pop() } ]);
				}
				d.resolve(result);
			});
		} else if (cssMode === CssModes.ACSS) {
			var html = scope.cm.html.getValue();
			var foundClasses = atomizer.findClassNames(html);
			var finalConfig = atomizer.getConfig(foundClasses, {});
			var acss = atomizer.getCss(finalConfig);
			scope.cm.css.setValue(acss);
			d.resolve(acss)
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
				showErrors('js', [ { lineNumber: e.lineNumber - 1, message: e.description } ]);
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
				showErrors('js', [ { lineNumber: e.location.first_line, message: e.message } ]);
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
				showErrors('js', [ { lineNumber: e.lineNumber - 1, message: e.description } ]);
			} finally {
				code = Babel.transform(code, { presets: ['latest', 'stage-2', 'react'] }).code;
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
				code = ts.transpileModule(code, { reportDiagnostics: true, compilerOptions: { noEmitOnError: true, diagnostics: true, module: ts.ModuleKind.ES2015 } });
				if (code.diagnostics.length) {

					/* eslint-disable no-throw-literal */
					throw ({ description: code.diagnostics[0].messageText, lineNumber: ts.getLineOfLocalPosition(code.diagnostics[0].file,code.diagnostics[0].start) });
				}
				if (shouldPreventInfiniteLoops !== false) {
					code = utils.addInfiniteLoopProtection(code.outputText);
				}
				d.resolve(code);
			} catch (e) {
				showErrors('js', [ { lineNumber: e.lineNumber - 1, message: e.description } ]);
			}
		}

		return d.promise;
	}

	window.previewException = function (error) {
		console.error('Possible infinite loop detected.', error.stack)
	}
	window.onunload = function () {
		saveCode('code');
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

	function getCompleteHtml(html, css, js) {
		var externalJs = externalJsTextarea.value.split('\n').reduce(function (scripts, url) {
			return scripts + (url ? '\n<script src="' + url + '"></script>' : '');
		}, '');
		var externalCss = externalCssTextarea.value.split('\n').reduce(function (links, url) {
			return links + (url ? '\n<link rel="stylesheet" href="' + url + '"></link>' : '');
		}, '');
		var contents = '<html>\n<head>\n'
			+ externalCss + '\n'
			+ '<style id="webmakerstyle">\n' + css + '\n</style>\n'
			+ '</head>\n'
			+ '<body>\n' + html + '\n'
			+ externalJs + '\n';

		if (js) {
			contents += '<script>\n' + js + '\n//# sourceURL=userscript.js';
		} else {
			contents += '<script src="'
				+ 'filesystem:chrome-extension://'
				+ chrome.i18n.getMessage('@@extension_id') + '/temporary/' + 'script.js' + '">'
		}
		contents += '\n</script>\n</body>\n</html>';

		return contents;
	}

	function writeFile(name, blob, cb) {
		var fileWritten = false;
		function errorHandler() { utils.log(arguments); }

		// utils.log('writing file ', name);
		window.webkitRequestFileSystem(window.TEMPORARY, 1024 * 1024 * 5, function(fs){
			fs.root.getFile(name, { create: true }, function(fileEntry) {
				fileEntry.createWriter(function(fileWriter) {
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

				}, errorHandler);
			}, errorHandler);
		}, errorHandler);

	}

	function createPreviewFile(html, css, js) {
		var contents = getCompleteHtml(html, css);
		var blob = new Blob([ contents ], { type: "text/plain;charset=UTF-8" });
		var blobjs = new Blob([ js ], { type: "text/plain;charset=UTF-8" });

		// Track if people have written code.
		if (!trackEvent.hasTrackedCode && (html || css || js)) {
			trackEvent('fn', 'hasCode');
			trackEvent.hasTrackedCode = true;
		}

		// we need to store user script in external JS file to prevent inline-script
		// CSP from affecting it.
		writeFile('script.js', blobjs, function () {
			writeFile('preview.html', blob, function () {
				frame.src = 'filesystem:chrome-extension://'
					+ chrome.i18n.getMessage('@@extension_id') + '/temporary/' + 'preview.html';
			});
		});
	}

	scope.setPreviewContent = function (isForced) {
		var currentCode = {
			html: scope.cm.html.getValue(),
			css: scope.cm.css.getValue(),
			js: scope.cm.js.getValue()
		};
		utils.log('🔎 setPreviewContent', isForced)
		// If just CSS was changed (and everything shudn't be empty),
		// change the styles inside the iframe.
		if (!isForced && currentCode.html === codeInPreview.html && currentCode.js === codeInPreview.js) {
			computeCss().then(function (css) {
				if (frame.contentDocument.querySelector('#webmakerstyle')) {
					frame.contentDocument.querySelector('#webmakerstyle').textContent = css;
				}
			});
		} else {
			var htmlPromise = computeHtml();
			var cssPromise = computeCss();
			var jsPromise = computeJs();
			Promise.all([htmlPromise, cssPromise, jsPromise]).then(function (result) {
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
		Promise.all([htmlPromise, cssPromise, jsPromise]).then(function (result) {
			var html = result[0],
				css = result[1],
				js = result[2];

			var fileContent = getCompleteHtml(html, css, js);

			var d = new Date();
			var fileName = [ 'web-maker', d.getFullYear(), (d.getMonth() + 1), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds() ].join('-');
			fileName += '.html';

			if (currentItem.title) {
				fileName = currentItem.title;
			}

			var a = document.createElement('a');
			var blob = new Blob([ fileContent ], { type: "text/html;charset=UTF-8" });
			a.href = window.URL.createObjectURL(blob);
			a.download = fileName;
			a.style.display = 'none';
			document.body.appendChild(a);
			a.click();
			a.remove();
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
				'Up': function (editor) {
					// Stop up/down keys default behavior when saveditempane is open
					if (isSavedItemsPaneOpen) { return; }
					CodeMirror.commands.goLineUp(editor);
				},
				'Down': function (editor) {
					if (isSavedItemsPaneOpen) { return; }
					CodeMirror.commands.goLineDown(editor);
				},
				'Shift-Tab': function(editor) {
					CodeMirror.commands.indentAuto(editor);
				},
				'Tab': function(editor) {
					var input = $('[data-setting=indentWith]:checked');
					if (!editor.somethingSelected() && (!input || input.value === 'spaces')) {
						// softtabs adds spaces. This is required because by default tab key will put tab, but we want
						// to indent with spaces if `spaces` is preferred mode of indentation.
						// `somethingSelected` needs to be checked otherwise, all selected code is replaced with softtab.
						CodeMirror.commands.insertSoftTab(editor);
					} else {
						CodeMirror.commands.defaultTab(editor);
					}
				}
			}
		});
		cm.on('focus', (editor) => {
			editorWithFocus = editor;
		});
		cm.on('change', function onChange(editor, change) {
			clearTimeout(updateTimer);

			updateTimer = setTimeout(function () {
				// This is done so that multiple simultaneous setValue don't trigger too many preview refreshes
				// and in turn too many file writes on a single file (eg. preview.html).
				if (change.origin !== 'setValue') {
					if (prefs.autoPreview !== false) {
						scope.setPreviewContent();
					}

					saveBtn.classList.add('is-marked');
					unsavedEditCount += 1;
					if (unsavedEditCount % unsavedEditWarningCount === 0 && unsavedEditCount >= unsavedEditWarningCount) {
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
		if (options.noAutocomplete) {
			cm.addKeyMap({
				'Ctrl-Space': 'autocomplete'
			});
		} else {
			cm.on('inputRead', function onChange(editor, input) {
				if (input.text[0] === ';' || input.text[0] === ' ') { return; }
				CodeMirror.commands.autocomplete(cm, null, { completeSingle: false })
			});
		}
		return cm;
	}

	scope.cm.html = initEditor(htmlCode, {
		mode: 'htmlmixed',
		profile: 'xhtml',
		gutters: [ 'CodeMirror-linenumbers', 'CodeMirror-foldgutter' ],
		noAutocomplete: true
	});
	emmetCodeMirror(scope.cm.html);
	scope.cm.css = initEditor(cssCode, {
		mode: 'css',
		gutters: [ 'error-gutter', 'CodeMirror-linenumbers', 'CodeMirror-foldgutter' ]
	});
	emmetCodeMirror(scope.cm.css);
	Inlet(scope.cm.css);
	scope.cm.js = initEditor(jsCode, {
		mode: 'javascript',
		gutters: [ 'error-gutter', 'CodeMirror-linenumbers', 'CodeMirror-foldgutter' ]
	});
	Inlet(scope.cm.js);

	function openSettings() {
		settingsModal.classList.toggle('is-modal-visible');

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
	}

	scope.onShowInTabClicked = function onShowInTabClicked() {
		onboardDontShowInTabOptionBtn.classList.remove('selected');
		onboardShowInTabOptionBtn.classList.add('selected');
		trackEvent('ui', 'onboardShowInTabClick');
	}
	scope.onDontShowInTabClicked = function onDontShowInTabClicked() {
		onboardDontShowInTabOptionBtn.classList.add('selected');
		onboardShowInTabOptionBtn.classList.remove('selected');
		trackEvent('ui', 'onboardDontShowInTabClick');
	}

	scope.exportItems = function exportItems(e) {
		fetchItems().then(function (items) {
			utils.log(9, items);
			var d = new Date();
			var fileName = [ 'web-maker-export', d.getFullYear(), (d.getMonth() + 1), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds() ].join('-');
			fileName += '.json';
			var blob = new Blob([ JSON.stringify(items,false,2) ], { type: "application/json;charset=UTF-8" });
			var a = document.createElement('a');
			a.href = window.URL.createObjectURL(blob);
			a.download = fileName;
			a.style.display = 'none';
			document.body.appendChild(a);
			a.click();
			a.remove();
			trackEvent('ui', 'exportBtnClicked');
		});
		e.preventDefault();
	}

	function mergeImportedItems(items) {
		var existingItemIds = [];
		var toMergeItems = {};
		items.forEach((item) => {
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
			var shouldReplace = confirm(existingItemIds.length + ' creations already exist. Do you want to replace them?');
			if (shouldReplace) {
				utils.log('shouldreplace', shouldReplace);
				items.forEach((item) => {
					toMergeItems[item.id] = item;
				});
				mergedItemCount = items.length;
			}
		}
		if (mergedItemCount) {
			// save new items
			chrome.storage.local.set(toMergeItems, function () {
				alertsService.add(mergedItemCount + ' creations imported successfully.');
			});
			// Push in new item IDs
			chrome.storage.local.get({
				items: {}
			}, function (result) {

				/* eslint-disable guard-for-in */
				for (var id in toMergeItems) {
					result.items[id] = true;
				}
				chrome.storage.local.set({
					items: result.items
				});
				trackEvent('fn', 'itemsImported', mergedItemCount);

				/* eslint-enable guard-for-in */
			});
			alertsService.add(mergedItemCount + ' creations imported successfully.');
		}
		// FIXME: Move from here
		toggleSavedItemsPane(false);
	}

	function onImportFileChange(e) {
		var file = e.target.files[0];
		// if (!f.type.match('image.*')) {
			// continue;
		// }

		var reader = new FileReader();
		reader.onload = function(progressEvent) {
			var items;
			try {
				items = JSON.parse(progressEvent.target.result);
				utils.log(items);
				mergeImportedItems(items);
			} catch (ex) {
				alert('Oops! Select file is corrupted.')
			}
		};

		reader.readAsText(file, 'utf-8');
	}

	scope.onImportBtnClicked = function exportItems(e) {
		var input = document.createElement('input');
		input.type = 'file';
		input.style.display = 'none';
		input.accept = 'accept="application/json';
		document.body.appendChild(input)
		input.addEventListener('change', onImportFileChange);
		input.click();
		trackEvent('ui', 'importBtnClicked');
		e.preventDefault();
	}

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
		var size = blob.size + (1024 / 2);

		var d = new Date();
		var fileName = [ 'web-maker-screenshot', d.getFullYear(), (d.getMonth() + 1), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds() ].join('-');
		fileName += '.png';

		function onWriteEnd() {
			var filePath = 'filesystem:chrome-extension://' + chrome.i18n.getMessage('@@extension_id') + '/temporary/' + fileName;

			chrome.downloads.download({
				url: filePath
			}, function() {
				// If there was an error, just open the screenshot in a tab.
				// This happens in incognito mode where extension cannot access filesystem.
				if (chrome.runtime.lastError) {
					window.open(filePath);
				}
			});
		}

		function errorHandler(e) {
			utils.log(e);
		}

		// create a blob for writing to a file
		window.webkitRequestFileSystem(window.TEMPORARY, size, (fs) => {
			fs.root.getFile(fileName, { create: true }, (fileEntry) => {
				fileEntry.createWriter((fileWriter) => {
					fileWriter.onwriteend = onWriteEnd;
					fileWriter.write(blob);
				}, errorHandler);
			}, errorHandler);
		}, errorHandler);
	}

	scope.takeScreenshot = function (e) {
		// Hide tooltips so that they don't show in the screenshot
		var s = document.createElement('style');
		s.textContent = '[class*="hint"]:after, [class*="hint"]:before { display: none!important; }';
		document.body.appendChild(s);

		function onImgLoad(image) {
			var c = document.createElement('canvas');
			var iframeBounds = frame.getBoundingClientRect();
			c.width = iframeBounds.width;
			c.height = iframeBounds.height;
			var ctx = c.getContext('2d');
			ctx.drawImage(image,
				iframeBounds.left, iframeBounds.top, iframeBounds.width, iframeBounds.height,
				0, 0, iframeBounds.width, iframeBounds.height);
			image.removeEventListener('load', onImgLoad);
			saveScreenshot(c.toDataURL());
		}

		setTimeout(() => {
			chrome.tabs.captureVisibleTab(null, { format: 'png', quality: 100 }, function(dataURI) {
				s.remove();
				if (dataURI) {
					var image = new Image();
					image.src = dataURI;
					image.addEventListener('load', () => onImgLoad(image, dataURI));
				}
			});
		}, 50);

		trackEvent('ui', 'takeScreenshotBtnClick');
		e.preventDefault();
	}

	// Populate the settings in the settings UI
	function updateSettingsInUi() {
		$('[data-setting=preserveLastCode]').checked = prefs.preserveLastCode;
		$('[data-setting=replaceNewTab]').checked = prefs.replaceNewTab;
		$('[data-setting=htmlMode]').value = prefs.htmlMode;
		$('[data-setting=cssMode]').value = prefs.cssMode;
		$('[data-setting=jsMode]').value = prefs.jsMode;
		$('[data-setting=indentSize]').value = prefs.indentSize;
		indentationSizeValueEl.textContent = prefs.indentSize;
		$('[data-setting=indentWith][value=' + (prefs.indentWith || 'spaces') + ']').checked = true;
		$('[data-setting=isCodeBlastOn]').checked = prefs.isCodeBlastOn;
		$('[data-setting=editorTheme]').value = prefs.editorTheme;
		$('[data-setting=keymap][value=' + (prefs.keymap || 'sublime') + ']').checked = true;
		$('[data-setting=fontSize]').value = prefs.fontSize || 16;
		$('[data-setting=refreshOnResize]').checked = prefs.refreshOnResize;
		$('[data-setting=autoPreview]').checked = prefs.autoPreview;
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
			utils.log(settingName, (el.type === 'checkbox') ? el.checked : el.value);
			prefs[settingName] = el.type === 'checkbox' ? el.checked : el.value;
			obj[settingName] = prefs[settingName];
			chrome.storage.sync.set(obj, function() {
				alertsService.add('setting saved');
			});
			trackEvent('ui', 'updatePref-' + settingName, prefs[settingName]);
		}

		// Show/hide RUN button based on autoPreview setting.
		runBtn.classList[prefs.autoPreview ? 'add' : 'remove']('hide');

		htmlCode.querySelector('.CodeMirror').style.fontSize = prefs.fontSize;
		cssCode.querySelector('.CodeMirror').style.fontSize = prefs.fontSize;
		jsCode.querySelector('.CodeMirror').style.fontSize = prefs.fontSize;

		// Update indentation count when slider is updated
		indentationSizeValueEl.textContent = $('[data-setting=indentSize]').value;

		['html', 'js', 'css'].forEach((type) => {
			scope.cm[type].setOption(
				'indentWithTabs',
				$('[data-setting=indentWith]:checked').value !== 'spaces'
			);

			scope.cm[type].setOption('blastCode', $('[data-setting=isCodeBlastOn]').checked ? { effect: 2, shake: false } : false);
			scope.cm[type].setOption('indentUnit', +$('[data-setting=indentSize]').value);
			scope.cm[type].setOption('tabSize', +$('[data-setting=indentSize]').value);
			scope.cm[type].setOption('theme', $('[data-setting=editorTheme]').value);
			// Replace correct css file in LINK tags's href
			editorThemeLinkTag.href = '/lib/codemirror/theme/' + prefs.editorTheme + '.css';

			scope.cm[type].setOption('keyMap', $('[data-setting=keymap]:checked').value);
			scope.cm[type].refresh();
		});
	};

	scope.onNewBtnClick = function () {
		trackEvent('ui', 'newBtnClick');
		if (unsavedEditCount) {
			var shouldDiscard = confirm('You have unsaved changes. Do you still want to create something new?');
			if (shouldDiscard) {
				createNewItem();
			}
		} else {
			createNewItem();
		}
	};
	scope.onOpenBtnClick = function () {
		trackEvent('ui', 'openBtnClick');
		openSavedItemsPane();
	};
	scope.onSaveBtnClick = function () {
		trackEvent('ui', 'saveBtnClick', currentItem.id ? 'saved' : 'new');
		saveItem();
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
	};

	function compileNodes() {

		function attachListenerForEvent(eventName) {
			var nodes;
			nodes = $all(`[d-${eventName}]`);
			nodes.forEach(function (el) {
				el.addEventListener(eventName, function (e) {
					scope[el.getAttribute(`d-${eventName}`)].call(window, e)
				});
			});
		}
		attachListenerForEvent('click');
		attachListenerForEvent('change');
		attachListenerForEvent('input');
	}

	function init () {
		var lastCode;

		CodeMirror.modeURL = "lib/codemirror/mode/%N/%N.js";

		function getToggleLayoutButtonListener(mode) {
			return function () {
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

		utils.onButtonClick(helpBtn, function () {
			helpModal.classList.toggle('is-modal-visible');
			document.body.classList[helpModal.classList.contains('is-modal-visible') ? 'add' : 'remove']('overlay-visible');
			trackEvent('ui', 'helpButtonClick');
		});
		utils.onButtonClick(addLibraryBtn, function () {
			addLibraryModal.classList.toggle('is-modal-visible');
			document.body.classList[addLibraryModal.classList.contains('is-modal-visible') ? 'add' : 'remove']('overlay-visible');
			trackEvent('ui', 'addLibraryButtonClick');
		});

		notificationsBtn.addEventListener('click', function () {
			notificationsModal.classList.toggle('is-modal-visible');
			document.body.classList[notificationsModal.classList.contains('is-modal-visible') ? 'add' : 'remove']('overlay-visible');
			if (notificationsModal.classList.contains('is-modal-visible') && !hasSeenNotifications) {
				hasSeenNotifications = true;
				notificationsBtn.classList.remove('has-new');
				chrome.storage.sync.set({
					lastSeenVersion: version
				}, function () {});
			}
			trackEvent('ui', 'notificationButtonClick', version);
			return false;
		});

		codepenBtn.addEventListener('click', function (e) {
			var json = {
				title: 'A Web Maker experiment',
				html: scope.cm.html.getValue(),
				css: scope.cm.css.getValue(),
				js: scope.cm.js.getValue(),

				/* eslint-disable camelcase */
				html_pre_processor: modes[htmlMode].codepenVal,
				css_pre_processor: modes[cssMode].codepenVal,
				js_pre_processor: modes[jsMode].codepenVal

				/* eslint-enable camelcase */
			};
			if (!currentItem.title.match(/Untitled\s\d\d*-\d/)) {
				json.title = currentItem.title;
			}
			json = JSON.stringify(json)
				.replace(/"/g, "&​quot;")
				.replace(/'/g, "&apos;")
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
			if (e.target.classList.contains('js-saved-item-tile')) {
				setTimeout(function () {
					openItem(e.target.dataset.itemId);
				}, 350);
				toggleSavedItemsPane();
			}
			if (e.target.classList.contains('js-saved-item-tile__close-btn')) {
				removeItem(e.target.parentElement.dataset.itemId);
			}
		});

		titleInput.addEventListener('blur', function () {
			if (currentItem.id) {
				saveItem();
				trackEvent('ui', 'titleChanged');
			}
		});

		// Attach listeners on mode change menu items
		var modeItems = $all('.js-modes-menu a');
		modeItems.forEach(function (item) {
			item.addEventListener('click', function (e) {
				var mode = e.currentTarget.dataset.mode;
				var type = e.currentTarget.dataset.type;
				var currentMode = type === 'html' ? htmlMode : (type === 'css' ? cssMode : jsMode);
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
		collapseBtns.forEach(function (btn) {
			btn.addEventListener('click', function (e) {
				var codeWrapParent = e.currentTarget.parentElement.parentElement.parentElement;
				toggleCodeWrapCollapse(codeWrapParent);
				trackEvent('ui', 'paneCollapseBtnClick', codeWrapParent.dataset.type);
				return false;
			});
		});

		// Update code wrap collapse states whenever any of them transitions due to any
		// reason.
		[ htmlCode, cssCode, jsCode ].forEach(function (el) {
			el.addEventListener('transitionend', function() {
				updateCodeWrapCollapseStates();
			});
		});

		window.addEventListener('keydown', function (event) {
			var selectedItemElement;
			// Ctrl/⌘ + S
			if ((event.ctrlKey || event.metaKey) && (event.keyCode === 83)) {
				event.preventDefault();
				saveItem();
				trackEvent('ui', 'saveItemKeyboardShortcut');
			}
			// Ctrl/⌘ + Shift + 5
			if (!prefs.autoPreview && (event.ctrlKey || event.metaKey) && event.shiftKey && (event.keyCode === 53)) {
				event.preventDefault();
				scope.setPreviewContent();
				trackEvent('ui', 'previewKeyboardShortcut');
			}
			// Ctrl/⌘ + O
			else if ((event.ctrlKey || event.metaKey) && (event.keyCode === 79)) {
				event.preventDefault();
				openSavedItemsPane();
				trackEvent('ui', 'openCreationKeyboardShortcut');
			}
			else if (event.keyCode === 27) {
				closeAllOverlays();
			}
			if (event.keyCode === 40 && isSavedItemsPaneOpen) {
				selectedItemElement = $('.js-saved-item-tile.selected');
				if (selectedItemElement) {
					selectedItemElement.classList.remove('selected');
					selectedItemElement.nextUntil('.js-saved-item-tile:not(.hide)').classList.add('selected');
				} else {
					$('.js-saved-item-tile:not(.hide)').classList.add('selected');
				}
				$('.js-saved-item-tile.selected').scrollIntoView(false);
			} else if (event.keyCode === 38 && isSavedItemsPaneOpen) {
				selectedItemElement = $('.js-saved-item-tile.selected');
				if (selectedItemElement) {
					selectedItemElement.classList.remove('selected');
					selectedItemElement.previousElementSibling.classList.add('selected');
				} else {
					$('.js-saved-item-tile:not(.hide)').classList.add('selected');
				}
				$('.js-saved-item-tile.selected').scrollIntoView(false);
			} else if (event.keyCode === 13 && isSavedItemsPaneOpen) {
				selectedItemElement = $('.js-saved-item-tile.selected');
				setTimeout(function () {
					openItem(selectedItemElement.dataset.itemId);
				}, 350);
				toggleSavedItemsPane();
			}
		});

		window.addEventListener('click', function(e) {
			if (typeof e.target.className === 'string' && e.target.className.indexOf('modal-overlay') !== -1) {
				closeAllOverlays();
			}
		});
		window.addEventListener('dblclick', function(e) {
			var target = e.target;
			if (target.classList.contains('js-code-wrap__header')) {
				var codeWrapParent = target.parentElement;
				toggleCodeWrapCollapse(codeWrapParent);
				trackEvent('ui', 'paneHeaderDblClick', codeWrapParent.dataset.type);
			}
		});

		utils.onButtonClick(settingsBtn, function() {
			openSettings();
			trackEvent('ui', 'settingsBtnClick');
		});

		// Initialize add library select box
		var libOptions = window.jsLibs.reduce(
			(html, lib) => html + `<option data-type="${lib.type}" value="${lib.url}">${lib.label}</option>`,
			'');
		addLibrarySelect.children[1].innerHTML = libOptions;
		libOptions = window.cssLibs.reduce(
			(html, lib) => html + `<option data-type="${lib.type}" value="${lib.url}">${lib.label}</option>`,
			'');
		addLibrarySelect.children[2].innerHTML = libOptions;
		addLibrarySelect.addEventListener('change', function onSelectChange(e) {
			var target = e.target;
			$('#js-external-' + target.selectedOptions[0].dataset.type).value += '\n' + target.value;
			trackEvent('ui', 'addLibrarySelect', target.selectedOptions[0].label);
			onExternalLibChange();
		});
		externalJsTextarea.addEventListener('blur', onExternalLibChange);
		externalCssTextarea.addEventListener('blur', onExternalLibChange);

		new TextareaAutoComplete(externalJsTextarea, (obj) => obj.latest.match(/\.js$/));
		new TextareaAutoComplete(externalCssTextarea, (obj) => obj.latest.match(/\.css$/));

		chrome.storage.local.get({
			layoutMode: 1,
			code: ''
		}, function localGetCallback(result) {
			toggleLayout(result.layoutMode);
			prefs.layoutMode = result.layoutMode;
			if (result.code) {
				lastCode = result.code;
			}
		});

		// Get synced `preserveLastCode` setting to get back last code (or not).
		chrome.storage.sync.get({
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
			autoPreview: true
		}, function syncGetCallback(result) {
			if (result.preserveLastCode && lastCode) {
				unsavedEditCount = 0;
				if (lastCode.id) {
					chrome.storage.local.get(lastCode.id, function (itemResult) {
						utils.log('Load item ', lastCode.id)
						currentItem = itemResult[lastCode.id];
						refreshEditor();
					});
				} else {
					utils.log('Load last unsaved item');
					currentItem = lastCode;
					refreshEditor();
				}
			} else {
				createNewItem();
			}
			prefs.preserveLastCode = result.preserveLastCode;
			prefs.replaceNewTab = result.replaceNewTab;
			prefs.htmlMode = result.htmlMode;
			prefs.cssMode = result.cssMode;
			prefs.jsMode = result.jsMode;
			prefs.isCodeBlastOn = result.isCodeBlastOn;
			prefs.indentSize = result.indentSize;
			prefs.indentWith = result.indentWith;
			prefs.editorTheme = result.editorTheme;
			prefs.keymap = result.keymap;
			prefs.fontSize = result.fontSize;
			prefs.refreshOnResize = result.refreshOnResize;
			prefs.autoPreview = result.autoPreview;

			updateSettingsInUi();
			scope.updateSetting();
		});

		// Check for new version notifications
		chrome.storage.sync.get({
			lastSeenVersion: ''
		}, function syncGetCallback(result) {
			// Check if new user
			if (!result.lastSeenVersion) {
				onboardModal.classList.add('is-modal-visible');
				trackEvent('ui', 'onboardModalSeen');
				// set the current version as seen on closing the onboard modal
				utils.once(document, 'overlaysClosed', function () {
					chrome.storage.sync.set({
						lastSeenVersion: version
					}, function () {});

					chrome.storage.sync.set({
						replaceNewTab: onboardShowInTabOptionBtn.classList.contains('selected')
					}, function () {
						trackEvent('fn', 'setReplaceNewTabFromOnboard', onboardShowInTabOptionBtn.classList.contains('selected'));
					});
				});
			}
			if (!result.lastSeenVersion || utils.semverCompare(result.lastSeenVersion, version) === -1) {
				notificationsBtn.classList.add('has-new');
				hasSeenNotifications = false;
			}
		});

		var options = '';
		[
			'3024-day',
			'3024-night',
			'abcdef',
			'ambiance',
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
		].forEach((theme) => { options += '<option value="' + theme + '">' + theme + '</option>'; });
		document.querySelector('[data-setting="editorTheme"]').innerHTML = options;

		requestAnimationFrame(compileNodes);
	}

	// Set few stuff on a 'scope' object so that they can be referenced dynamically.
	scope.closeAllOverlays = closeAllOverlays;

	init();

})(window.alertsService);
