/* global trackEvent */
/* eslint-disable no-extra-semi */
;(function () {

/* eslint-enable no-extra-semi */
	var editur = window.editur || {};
	var version = '1.7.1';

	window.$ = document.querySelector.bind(document);
	window.$all = document.querySelectorAll.bind(document);

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

		, frame = $('#demo-frame')
		, htmlCode = $('#js-html-code')
		, cssCode = $('#js-css-code')
		, jsCode = $('#js-js-code')
		, layoutBtn1 = $('#js-layout-btn-1')
		, layoutBtn2 = $('#js-layout-btn-2')
		, layoutBtn3 = $('#js-layout-btn-3')
		, helpBtn = $('#js-help-btn')
		, helpModal = $('#js-help-modal')
		, codepenBtn = $('#js-codepen-btn')
		, codepenForm = $('#js-codepen-form')
		, saveHtmlBtn = $('#js-save-html')
		, settingsBtn = $('#js-settings-btn')
		, notificationsBtn = $('#js-notifications-btn')
		, notificationsModal = $('#js-notifications-modal')
		, htmlModelLabel = $('#js-html-mode-label')
		, cssModelLabel = $('#js-css-mode-label')
		, jsModelLabel = $('#js-js-mode-label')
		;

	editur.cm = {};
	editur.demoFrameDocument = frame.contentDocument || frame.contentWindow.document;

	// https://github.com/substack/semver-compare/blob/master/index.js
	function semverCompare (a, b) {
		var pa = a.split('.');
		var pb = b.split('.');
		for (var i = 0; i < 3; i++) {
			var na = Number(pa[i]);
			var nb = Number(pb[i]);
			if (na > nb) { return 1; }
			if (nb > na) { return -1; }
			if (!isNaN(na) && isNaN(nb)) { return 1; }
			if (isNaN(na) && !isNaN(nb)) { return -1; }
		}
		return 0;
	}

	function resetSplitting() {
		var gutters = $all('.gutter');
		for (var i = gutters.length; i--;) {
			gutters[i].remove();
		}
		$('#js-html-code').setAttribute('style', '');
		$('#js-css-code').setAttribute('style', '');
		$('#js-js-code').setAttribute('style', '');
		$('#js-code-side').setAttribute('style', '');
		$('#js-demo-side').setAttribute('style', '');

		Split(['#js-html-code', '#js-css-code', '#js-js-code'], {
			direction: (currentLayoutMode === 2 ? 'horizontal' : 'vertical'),
			minSize: 34,
			gutterSize: 6
		});
		Split(['#js-code-side', '#js-demo-side' ], {
			direction: (currentLayoutMode === 2 ? 'vertical' : 'horizontal'),
			minSize: 34,
			gutterSize: 6
		});
	}
	function toggleLayout(mode) {
		currentLayoutMode = mode;
		$('#js-layout-btn-1').classList.remove('selected');
		$('#js-layout-btn-2').classList.remove('selected');
		$('#js-layout-btn-3').classList.remove('selected');
		$('#js-layout-btn-' + mode).classList.add('selected');
		document.body.classList.remove('layout-1');
		document.body.classList.remove('layout-2');
		document.body.classList.remove('layout-3');
		document.body.classList.add('layout-' + mode);

		resetSplitting();
	}

	function saveSetting(setting, value) {
		var obj = {};
		obj[setting] = value;
		chrome.storage.local.set(obj, function() {
		});
	}

	function saveCode() {
		var code = {
			html: editur.cm.html.getValue(),
			css: editur.cm.css.getValue(),
			js: editur.cm.js.getValue()
		};
		saveSetting('code', code);
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
		editur.cm.html.setOption('mode', modes[value].cmMode);
		CodeMirror.autoLoadMode(editur.cm.html, modes[value].cmMode);
		chrome.storage.sync.set({
			htmlMode: value
		}, function () {});
		trackEvent('ui', 'updateCodeMode', 'html', value);
	}
	function updateCssMode(value) {
		cssMode = value;
		cssModelLabel.textContent = modes[value].label;
		handleModeRequirements(value);
		editur.cm.css.setOption('mode', modes[value].cmMode);
		CodeMirror.autoLoadMode(editur.cm.css, modes[value].cmMode);
		chrome.storage.sync.set({
			cssMode: value
		}, function () {});
		trackEvent('ui', 'updateCodeMode', 'css', value);
	}
	function updateJsMode(value) {
		jsMode = value;
		jsModelLabel.textContent = modes[value].label;
		handleModeRequirements(value);
		editur.cm.js.setOption('mode', modes[value].cmMode);
		CodeMirror.autoLoadMode(editur.cm.js, modes[value].cmMode);
		chrome.storage.sync.set({
			jsMode: value
		}, function () {});
		trackEvent('ui', 'updateCodeMode', 'js', value);
	}

	// computeHtml, computeCss & computeJs evaluate the final code according
	// to whatever mode is selected and resolve the returned promise with the code.
	function computeHtml() {
		var d = deferred();
		var code = editur.cm.html.getValue();
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
		var code = editur.cm.css.getValue();
		if (cssMode === CssModes.CSS) {
			d.resolve(code);
		} else if (cssMode === CssModes.SCSS) {
			sass.compile(code, function(result) {
				d.resolve(result.text);
			});
		} else if (cssMode === CssModes.LESS) {
			less.render(code).then(function (result) {
				d.resolve(result.css);
			});
		}

		return d.promise;
	}
	function computeJs() {
		var d = deferred();
		var code = editur.cm.js.getValue();
		if (jsMode === JsModes.JS) {
			d.resolve(code);
		} else if (jsMode === JsModes.COFFEESCRIPT) {
			d.resolve(CoffeeScript.compile(code, { bare: true }));
		} else if (jsMode === JsModes.ES6) {
			d.resolve(Babel.transform(editur.cm.js.getValue(), { presets: ['es2015'] }).code);
		}

		return d.promise;
	}

	window.onunload = function () {
		saveCode();
	};

	function createPreviewFile(html, css, js) {
		var contents = '<html>\n<head>\n<style>\n' + css + '\n</style>\n</head>\n<body>\n' + html + '\n<script>\n' + js + '\n</script></body>\n</html>';

		// Track if people are actually writing code.
		if (!trackEvent.hasTrackedCode && (html || css || js)) {
			trackEvent('fn', 'hasCode');
			trackEvent.hasTrackedCode = true;
		}
		// Track when people actually are working
		trackEvent.previewCount = (trackEvent.previewCount || 0) + 1;
		if (trackEvent.previewCount === 4) {
			trackEvent('fn', 'usingPreview');
		}
		var fileWritten = false;

		var blob = new Blob([ contents ], { type: "text/plain;charset=UTF-8" });

		function errorHandler() { console.log(arguments); }

		window.webkitRequestFileSystem(window.TEMPORARY, 1024 * 1024 * 5, function(fs){
			fs.root.getFile('preview.html', { create: true }, function(fileEntry) {
				fileEntry.createWriter(function(fileWriter) {
					function onWriteComplete() {
						if (fileWritten) {
							frame.src = 'filesystem:chrome-extension://' + chrome.i18n.getMessage('@@extension_id') + '/temporary/' + 'preview.html';
						}
						else {
							fileWritten = true;
							fileWriter.seek(0);
							fileWriter.write(blob);
						}
					}
					fileWriter.onwriteend = onWriteComplete;
					fileWriter.truncate(0)
				}, errorHandler);
			}, errorHandler);
		}, errorHandler);
	}

	editur.setPreviewContent = function () {
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
		var jsPromise = computeJs();
		Promise.all([htmlPromise, cssPromise, jsPromise]).then(function (result) {
			var html = result[0],
				css = result[1],
				js = result[2];

			var fileContent = '<html><head>\n<style>\n'
				+ css + '\n</style>\n</head>\n<body>\n'
				+ html + '\n<script>\n' + js + '\n</script>\n\n</body>\n</html>';

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
			// cursorScrollMargin: '20', has issue with scrolling
			profile: options.profile || ''
		});
		cm.on('change', function onChange() {
			clearTimeout(updateTimer);
			updateTimer = setTimeout(function () {
				editur.setPreviewContent();
			}, updateDelay);
		});
		return cm;
	}

	editur.cm.html = initEditor(htmlCode, {
		mode: 'htmlmixed',
		profile: 'xhtml'
	});
	emmetCodeMirror(editur.cm.html);
	editur.cm.css = initEditor(cssCode, {
		mode: 'css'
	});
	editur.cm.js = initEditor(jsCode, {
		mode: 'javascript'
	});

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

		helpBtn.addEventListener('click', function () {
			helpModal.classList.toggle('is-modal-visible');
			trackEvent('ui', 'helpButtonClick');
			return false;
		});

		notificationsBtn.addEventListener('click', function () {
			notificationsModal.classList.toggle('is-modal-visible');
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
				html: editur.cm.html.getValue(),
				css: editur.cm.css.getValue(),
				js: editur.cm.js.getValue(),

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

		saveHtmlBtn.addEventListener('click', function () {
			trackEvent('ui', 'saveHtmlClick');
			saveFile();
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

		window.addEventListener('keydown', function (event) {
			if ((event.ctrlKey || event.metaKey) && (event.keyCode === 83)){
				event.preventDefault();
				trackEvent('ui', 'saveFileKeyboardShortcut');
				saveFile();
			}
		});

		window.addEventListener('click', function(e) {
			if (typeof e.target.className === 'string' && e.target.className.indexOf('modal-overlay') !== -1) {
				helpModal.classList.remove('is-modal-visible');
				notificationsModal.classList.remove('is-modal-visible');
			}
		});

		settingsBtn.addEventListener('click', function() {
			if (!chrome.runtime.openOptionsPage) {
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
			trackEvent('ui', 'settingsBtnClick');
			return false;
		});


		chrome.storage.local.get({
			layoutMode: 1,
			code: ''
		}, function localGetCallback(result) {
			toggleLayout(result.layoutMode);
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
				editur.cm.html.setValue(lastCode.html);
				editur.cm.css.setValue(lastCode.css);
				editur.cm.js.setValue(lastCode.js);
				editur.cm.html.refresh();
				editur.cm.css.refresh();
				editur.cm.js.refresh();
			}
			updateHtmlMode(result.htmlMode);
			updateJsMode(result.jsMode);
			updateCssMode(result.cssMode);
		});

		// Check for new version notifications
		chrome.storage.sync.get({
			lastSeenVersion: ''
		}, function syncGetCallback(result) {
			// console.log(result, hasSeenNotifications, version);
			if (!result.lastSeenVersion || semverCompare(result.lastSeenVersion, version) === -1) {
				notificationsBtn.classList.add('has-new');
				hasSeenNotifications = false;
			}
		});
	}

	init();

})();