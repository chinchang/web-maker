/* global trackEvent */
/* global layoutBtn1, layoutBtn2, layoutBtn3, helpModal, notificationsModal, addLibraryModal,
onboardModal, layoutBtn1, layoutBtn2, layoutBtn3, helpBtn, onboardModal, onboardModal,
addLibraryModal, addLibraryModal, notificationsBtn, notificationsModal, notificationsModal,
notificationsModal, notificationsBtn, codepenBtn, saveHtmlBtn, openBtn, saveBtn, newBtn,
settingsBtn, onboardModal, notificationsBtn */
/* eslint-disable no-extra-semi */
;(function (alertsService) {

/* eslint-enable no-extra-semi */
	var scope = scope || {};
	var version = '2.0.0';

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
		LESS: 'less'
	};
	var JsModes = {
		JS: 'js',
		ES6: 'es6',
		COFFEESCRIPT: 'coffee'
	};
	var modes = {};
	modes[HtmlModes.HTML] = { label: 'HTML', cmMode: 'htmlmixed', codepenVal: 'none' };
	modes[HtmlModes.MARKDOWN] = { label: 'Markdown', cmMode: 'markdown', codepenVal: 'markdown' };
	modes[HtmlModes.JADE] = { label: 'Jade', cmMode: 'jade', codepenVal: 'jade' };
	modes[JsModes.JS] = { label: 'JS', cmMode: 'javascript', codepenVal: 'none' };
	modes[JsModes.COFFEESCRIPT] = { label: 'CoffeeScript', cmMode: 'coffeescript', codepenVal: 'coffeescript' };
	modes[JsModes.ES6] = { label: 'ES6 (Babel)', cmMode: 'javascript', codepenVal: 'babel' };
	modes[CssModes.CSS] = { label: 'CSS', cmMode: 'css', codepenVal: 'none' };
	modes[CssModes.SCSS] = { label: 'SCSS', cmMode: 'sass', codepenVal: 'scss' };
	modes[CssModes.LESS] = { label: 'LESS', cmMode: 'text/x-less', codepenVal: 'less' };

	var updateTimer
		, updateDelay = 500
		, currentLayoutMode
		, hasSeenNotifications = true
		, htmlMode = HtmlModes.HTML
		, jsMode = JsModes.JS
		, cssMode = CssModes.CSS
		, sass
		, currentItem
		, savedItems
		, minCodeWrapSize = 33
		, mainSplitInstance
		, codeSplitInstance
		// TODO: for legacy reasons when. Will be refactored as global preferences.
		, prefs = {}

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
		// utils.log('reset spliiting', options.sizes)
		codeSplitInstance = Split(['#js-html-code', '#js-css-code', '#js-js-code'], options);
		mainSplitInstance = Split(['#js-code-side', '#js-demo-side' ], {
			direction: (currentLayoutMode === 2 ? 'vertical' : 'horizontal'),
			minSize: 34,
			gutterSize: 6
		});
	}
	function toggleLayout(mode) {
		if (currentLayoutMode === mode) {
			utils.log('setsize', currentItem.sizes || [ 33.33, 33.33, 33.33 ]);
			codeSplitInstance.setSizes(currentItem.sizes || [ 33.33, 33.33, 33.33 ]);
			currentLayoutMode = mode;
			return;
		}
		currentLayoutMode = mode;
		layoutBtn1.classList.remove('selected');
		layoutBtn2.classList.remove('selected');
		layoutBtn3.classList.remove('selected');
		$('#layoutBtn' + mode).classList.add('selected');
		document.body.classList.remove('layout-1');
		document.body.classList.remove('layout-2');
		document.body.classList.remove('layout-3');
		document.body.classList.add('layout-' + mode);

		resetSplitting();
	}

	function onExternalLibChange() {
		utils.log('onExternalLibChange');
		updateExternalLibUi();
		scope.setPreviewContent();
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

		// debugger;
		var dimensionProperty = currentLayoutMode === 2 ? 'width' : 'height';

		var sizes;
		try {
			sizes = [
				+htmlCode.style[dimensionProperty].match(/([\d.]+)%/)[1],
				+cssCode.style[dimensionProperty].match(/([\d.]+)%/)[1],
				+jsCode.style[dimensionProperty].match(/([\d.]+)%/)[1]
			];
		} catch (e) {
			sizes = [ 33.33, 33.33, 33.33 ]
		} finally {

			currentItem.sizes = sizes;

			utils.log('saving key', key || currentItem.id, currentItem)
			saveSetting(key || currentItem.id, currentItem, function () {
				alertsService.add('Item saved.');
			});
		}
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
		} else {
			html += '<h2 class="opacity--30">Nothing saved here.</h2>'
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
		document.body.classList[savedItemsPane.classList.contains('is-open') ? 'add' : 'remove']('overlay-visible');
	}
	function openSavedItemsPane() {
		chrome.storage.local.get('items', function (result) {
			var itemIds = Object.getOwnPropertyNames(result.items || {}),
				items = [];
			if (!itemIds.length) {
				populateItemsInSavedPane([]);
				return;
			}

			savedItems = savedItems || [];
			trackEvent('fn', 'fetchItems', '', itemIds.length);
			for (let i = 0; i < itemIds.length; i++) {

				/* eslint-disable no-loop-func */
				chrome.storage.local.get(itemIds[i], function (itemResult) {
					savedItems[itemIds[i]] = itemResult[itemIds[i]];
					items.push(itemResult[itemIds[i]]);
					// Check if we have all items now.
					if (itemIds.length === items.length) {
						populateItemsInSavedPane(items);
					}
				});

				/* eslint-enable no-loop-func */
			}
		});
	}

	function createNewItem() {
		var d = new Date();
		currentItem = {
			title: 'Untitled ' + d.getDate() + '-' + d.getMonth() + '-' + d.getHours() + ':' + d.getMinutes(),
			html: '',
			css: '',
			js: '',
			externalLibs: { js: '', css: '' },
			layoutMode: currentLayoutMode
		};
		alertsService.add('New item created');
		refreshEditor();
	}
	function openItem(itemId) {
		currentItem = savedItems[itemId];
		// codeSplitInstance.setSizes([ 33.3, 33.3, 33.3 ]);
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
		trackEvent('fn', 'itemRemoved');
	}

	function refreshEditor() {
		titleInput.value = currentItem.title || 'Untitled';
		externalJsTextarea.value = (currentItem.externalLibs && currentItem.externalLibs.js) || '';
		externalCssTextarea.value = (currentItem.externalLibs && currentItem.externalLibs.css) || '';
		externalJsTextarea.dispatchEvent(new Event('change'));

		scope.cm.html.setValue(currentItem.html);
		scope.cm.css.setValue(currentItem.css);
		scope.cm.js.setValue(currentItem.js);
		scope.cm.html.refresh();
		scope.cm.css.refresh();
		scope.cm.js.refresh();

		updateHtmlMode(currentItem.htmlMode || prefs.htmlMode || HtmlModes.HTML);
		updateJsMode(currentItem.jsMode || prefs.jsMode || JsModes.JS);
		updateCssMode(currentItem.cssMode || prefs.cssMode || CssModes.CSS);

		toggleLayout(currentItem.layoutMode || prefs.layoutMode);
	}

	function closeAllOverlays() {
		helpModal.classList.remove('is-modal-visible');
		notificationsModal.classList.remove('is-modal-visible');
		addLibraryModal.classList.remove('is-modal-visible');
		onboardModal.classList.remove('is-modal-visible');
		toggleSavedItemsPane(false);
		document.dispatchEvent(new Event('overlaysClosed'));
	}

	/**
	 * Loaded the code comiler based on the mode selected
	 */
	function handleModeRequirements(mode) {
		// Exit if already loaded
		if (modes[mode].hasLoaded) { return; }

		function setLoadedFlag() {
			modes[mode].hasLoaded = true;
		}

		if (mode === HtmlModes.JADE) {
			loadJS('lib/jade.js').then(setLoadedFlag);
		} else if (mode === HtmlModes.MARKDOWN) {
			loadJS('lib/marked.js').then(setLoadedFlag);
		} else if (mode === CssModes.LESS) {
			loadJS('lib/less.min.js').then(setLoadedFlag);
		} else if (mode === CssModes.SCSS) {
			loadJS('lib/sass.js').then(function () {
				sass = new Sass('lib/sass.worker.js');
				setLoadedFlag();
			});
		} else if (mode === JsModes.COFFEESCRIPT) {
			loadJS('lib/coffee-script.js').then(setLoadedFlag);
		} else if (mode === JsModes.ES6) {
			loadJS('lib/babel.min.js').then(setLoadedFlag);
		}
	}

	function updateHtmlMode(value) {
		htmlMode = value;
		htmlModelLabel.textContent = modes[value].label;
		handleModeRequirements(value);
		scope.cm.html.setOption('mode', modes[value].cmMode);
		CodeMirror.autoLoadMode(scope.cm.html, modes[value].cmMode);
		trackEvent('ui', 'updateCodeMode', 'html', value);
	}
	function updateCssMode(value) {
		cssMode = value;
		cssModelLabel.textContent = modes[value].label;
		handleModeRequirements(value);
		scope.cm.css.setOption('mode', modes[value].cmMode);
		CodeMirror.autoLoadMode(scope.cm.css, modes[value].cmMode);
		trackEvent('ui', 'updateCodeMode', 'css', value);
	}
	function updateJsMode(value) {
		jsMode = value;
		jsModelLabel.textContent = modes[value].label;
		handleModeRequirements(value);
		scope.cm.js.setOption('mode', modes[value].cmMode);
		CodeMirror.autoLoadMode(scope.cm.js, modes[value].cmMode);
		trackEvent('ui', 'updateCodeMode', 'js', value);
		// FIXME: Will be saved as part of scope settings
		/*
		chrome.storage.sync.set({
			jsMode: value
		}, function () {});
		*/
	}

	// computeHtml, computeCss & computeJs evaluate the final code according
	// to whatever mode is selected and resolve the returned promise with the code.
	function computeHtml() {
		var d = deferred();
		var code = scope.cm.html.getValue();
		if (htmlMode === HtmlModes.HTML) {
			d.resolve(code);
		} else if (htmlMode === HtmlModes.MARKDOWN) {
			d.resolve(marked(code));
		} else if (htmlMode === HtmlModes.JADE) {
			d.resolve(jade.render(code));
		}

		return d.promise;
	}
	function computeCss() {
		var d = deferred();
		var code = scope.cm.css.getValue();
		cleanupErrors('css');

		if (cssMode === CssModes.CSS) {
			d.resolve(code);
		} else if (cssMode === CssModes.SCSS) {
			sass.compile(code, function(result) {
				// Something as wrong
				if (result.line && result.message) {
					showErrors('css', [ { lineNumber: result.line - 1, message: result.message } ]);
				}
				d.resolve(result.text);
			});
		} else if (cssMode === CssModes.LESS) {
			less.render(code).then(function (result) {
				d.resolve(result.css);
			}, function (error) {
				showErrors('css', [ { lineNumber: error.line, message: error.message } ]);
			});
		}

		return d.promise;
	}
	function computeJs(shouldPreventInfiniteLoops) {
		var d = deferred();
		var code = scope.cm.js.getValue();

		cleanupErrors('js');
		var ast;

		if (jsMode === JsModes.JS) {
			try {
				ast = esprima.parse(code, {
					tolerant: true
				});
			} catch (e) {
				showErrors('js', [ { lineNumber: e.lineNumber - 1, message: e.description } ]);
			} finally {
				if (shouldPreventInfiniteLoops !== false) {
					utils.addInfiniteLoopProtection(ast);
				}
				d.resolve(escodegen.generate(ast));
			}
		} else if (jsMode === JsModes.COFFEESCRIPT) {
			var coffeeCode;
			try {
				coffeeCode = CoffeeScript.compile(code, { bare: true });
			} catch (e) {
				showErrors('js', [ { lineNumber: e.location.first_line, message: e.message } ]);
			} finally {
				ast = esprima.parse(coffeeCode, {
					tolerant: true
				});
				if (shouldPreventInfiniteLoops !== false) {
					utils.addInfiniteLoopProtection(ast);
				}
				d.resolve(escodegen.generate(ast));
			}
		} else if (jsMode === JsModes.ES6) {
			try {
				ast = esprima.parse(code, {
					tolerant: true,
					jsx: true
				});
			} catch (e) {
				showErrors('js', [ { lineNumber: e.lineNumber - 1, message: e.description } ]);
			} finally {
				var result;
				try {
					result = escodegen.generate(ast);
					if (shouldPreventInfiniteLoops !== false) {
						utils.addInfiniteLoopProtection(ast);
					}
					d.resolve(Babel.transform(escodegen.generate(ast), { presets: ['es2015', 'react'] }).code);
				} catch (e) {
					// If we failed, means probably the AST contains JSX which cannot be parsed by escodegen.
					code = Babel.transform(code, { presets: ['es2015', 'react'] }).code;
					ast = esprima.parse(code, {
						tolerant: true
					});
					if (shouldPreventInfiniteLoops !== false) {
						utils.addInfiniteLoopProtection(ast);
					}
					d.resolve(escodegen.generate(ast));
				} finally {
				}

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
			+ '<style>\n' + css + '\n</style>\n'
			+ '</head>\n'
			+ '<body>\n' + html + '\n'
			+ externalJs + '\n<script src="'
			+ 'filesystem:chrome-extension://'
			+ chrome.i18n.getMessage('@@extension_id') + '/temporary/' + 'script.js' + '">\n'
			+ '</script></body>\n</html>';

		return contents;
	}

	function writeFile(name, blob, cb) {
		var fileWritten = false;
		function errorHandler() { utils.log(arguments); }

		window.webkitRequestFileSystem(window.TEMPORARY, 1024 * 1024 * 5, function(fs){
			fs.root.getFile(name, { create: true }, function(fileEntry) {
				fileEntry.createWriter(function(fileWriter) {
					function onWriteComplete() {
						if (fileWritten) {
							cb();
						}
						else {
							fileWritten = true;
							// Set the write pointer to starting of file
							fileWriter.seek(0);
							fileWriter.write(blob);
						}
					}
					fileWriter.onwriteend = onWriteComplete;
					// Empty the file contents
					fileWriter.truncate(0)
				}, errorHandler);
			}, errorHandler);
		}, errorHandler);

	}

	function createPreviewFile(html, css, js) {
		var contents = getCompleteHtml(html, css, js);
		var fileWritten = false;
		var blob = new Blob([ contents ], { type: "text/plain;charset=UTF-8" });
		var blobjs = new Blob([ js ], { type: "text/plain;charset=UTF-8" });

		// Track if people have written code.
		if (!trackEvent.hasTrackedCode && (html || css || js)) {
			trackEvent('fn', 'hasCode');
			trackEvent.hasTrackedCode = true;
		}
		// Track when people actually are working.
		trackEvent.previewCount = (trackEvent.previewCount || 0) + 1;
		if (trackEvent.previewCount === 4) {
			trackEvent('fn', 'usingPreview');
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

	scope.setPreviewContent = function () {
		var htmlPromise = computeHtml();
		var cssPromise = computeCss();
		var jsPromise = computeJs();
		Promise.all([htmlPromise, cssPromise, jsPromise]).then(function (result) {
			createPreviewFile(result[0], result[1], result[2]);
		});
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
			var fileName = [ 'web-maker', d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds() ].join('-');
			fileName += '.html';

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
			matchBrackets: true,
			tabMode: 'indent',
			keyMap: 'sublime',
			theme: 'monokai',
			lint: !!options.lint,
			gutters: options.gutters || [],
			// cursorScrollMargin: '20', has issue with scrolling
			profile: options.profile || ''
		});
		cm.on('change', function onChange() {
			clearTimeout(updateTimer);
			updateTimer = setTimeout(function () {
				scope.setPreviewContent();
			}, updateDelay);
		});
		return cm;
	}

	scope.cm.html = initEditor(htmlCode, {
		mode: 'htmlmixed',
		profile: 'xhtml'
	});
	emmetCodeMirror(scope.cm.html);
	scope.cm.css = initEditor(cssCode, {
		mode: 'css',
		gutters: [ 'error-gutter' ]
	});
	Inlet(scope.cm.css);
	scope.cm.js = initEditor(jsCode, {
		mode: 'javascript',
		gutters: [ 'error-gutter' ]
	});
	Inlet(scope.cm.js);

	function openSettings() {
		if (chrome.runtime.openOptionsPage) {
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
		}
	}

	scope.onModalSettingsLinkClick = function () {
		openSettings();
		trackEvent('ui', 'onboardSettingsBtnClick');
	}

	function compileNodes() {
		var nodes = [].slice.call($all('[d-click]'));
		nodes.forEach(function (el) {
			el.addEventListener('click', function (e) {
				scope[el.getAttribute('d-click')].call(window, e)
			});
		})
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
			trackEvent('ui', 'notificationButtonClick');
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
		utils.onButtonClick(openBtn, function () {
			openSavedItemsPane();
			trackEvent('ui', 'openBtnClick');
		});
		utils.onButtonClick(saveBtn, function () {
			trackEvent('ui', 'saveBtnClick', currentItem.id ? 'saved' : 'new');
			saveItem();
		});
		utils.onButtonClick(newBtn, function () {
			createNewItem();
			trackEvent('ui', 'newBtnClick');
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
				utils.log('removing', e.target.parentElement)
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
		var modeItems = [].slice.call($all('.js-modes-menu a'));
		modeItems.forEach(function (item) {
			item.addEventListener('click', function (e) {
				var mode = e.currentTarget.dataset.mode;
				var type = e.currentTarget.dataset.type;
				var currentMode = type === 'html' ? htmlMode : (type === 'css' ? cssMode : jsMode);
				if (currentMode !== mode) {
					if (type === 'html') {
						updateHtmlMode(mode);
					} else if (type === 'js') {
						updateJsMode(mode);
					} else if (type === 'css') {
						updateCssMode(mode);
					}
				}
			});
		});

		// Collapse btn event listeners
		var collapseBtns = [].slice.call($all('.js-code-collapse-btn'));
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
			// Ctrl/⌘ + S
			if ((event.ctrlKey || event.metaKey) && (event.keyCode === 83)) {
				event.preventDefault();
				saveItem();
				trackEvent('ui', 'saveItemKeyboardShortcut');
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
		externalJsTextarea.addEventListener('change', onExternalLibChange);
		externalCssTextarea.addEventListener('change', onExternalLibChange);

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
			htmlMode: 'html',
			jsMode: 'js',
			cssMode: 'css'
		}, function syncGetCallback(result) {
			if (result.preserveLastCode && lastCode) {
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
			prefs.htmlMode = result.htmlmode;
			prefs.cssMode = result.cssMode;
			prefs.jsMode = result.jsMode;
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
				});
			}
			// console.utils.log(result, hasSeenNotifications, version);
			if (!result.lastSeenVersion || utils.semverCompare(result.lastSeenVersion, version) === -1) {
				notificationsBtn.classList.add('has-new');
				hasSeenNotifications = false;
			}
		});

		requestAnimationFrame(compileNodes);
	}

	// Set few stuff on a 'scope' object so that they can be referenced dynamically.
	scope.closeAllOverlays = closeAllOverlays;

	init();

})(window.alertsService);
