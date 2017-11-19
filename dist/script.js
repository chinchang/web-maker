(function() {
	window.DEBUG = document.cookie.indexOf('wmdebug') > -1;

	window.$ = document.querySelector.bind(document);
	window.$all = selector => [...document.querySelectorAll(selector)];
	var alphaNum =
		'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

	/**
	 * The following 2 functions are supposed to find the next/previous sibling until the
	 * passed `selector` is matched. But for now it actually finds the next/previous
	 * element of `this` element in the list of `selector` matched element inside `this`'s
	 * parent.
	 * @param  Selector that should match for next siblings
	 * @return element Next element that mathes `selector`
	 */
	Node.prototype.nextUntil = function(selector) {
		const siblings = [...this.parentNode.querySelectorAll(selector)];
		const index = siblings.indexOf(this);
		return siblings[index + 1];
	};

	/*
	 * @param  Selector that should match for next siblings
	 * @return element Next element that mathes `selector`
	 */
	Node.prototype.previousUntil = function(selector) {
		const siblings = [...this.parentNode.querySelectorAll(selector)];
		const index = siblings.indexOf(this);
		return siblings[index - 1];
	};

	// https://github.com/substack/semver-compare/blob/master/index.js
	function semverCompare(a, b) {
		var pa = a.split('.');
		var pb = b.split('.');
		for (var i = 0; i < 3; i++) {
			var na = Number(pa[i]);
			var nb = Number(pb[i]);
			if (na > nb) {
				return 1;
			}
			if (nb > na) {
				return -1;
			}
			if (!isNaN(na) && isNaN(nb)) {
				return 1;
			}
			if (isNaN(na) && !isNaN(nb)) {
				return -1;
			}
		}
		return 0;
	}

	function generateRandomId(len) {
		var length = len || 10;
		var id = '';
		for (var i = length; i--; ) {
			id += alphaNum[~~(Math.random() * alphaNum.length)];
		}
		return id;
	}

	function onButtonClick(btn, listener) {
		btn.addEventListener('click', function buttonClickListener(e) {
			listener(e);
			return false;
		});
	}

	function log() {
		if (window.DEBUG) {
			console.log(...arguments);
		}
	}

	/**
	 * Adds timed limit on the loops found in the passed code.
	 * Contributed by Ariya Hidayat!
	 * @param code {string}	Code to be protected from infinite loops.
	 */
	function addInfiniteLoopProtection(code) {
		var loopId = 1;
		var patches = [];
		var varPrefix = '_wmloopvar';
		var varStr = 'var %d = Date.now();\n';
		var checkStr =
			'\nif (Date.now() - %d > 1000) { window.top.previewException(new Error("Infinite loop")); break;}\n';

		esprima.parse(code, { tolerant: true, range: true, jsx: true }, function(
			node
		) {
			switch (node.type) {
				case 'DoWhileStatement':
				case 'ForStatement':
				case 'ForInStatement':
				case 'ForOfStatement':
				case 'WhileStatement':
					var start = 1 + node.body.range[0];
					var end = node.body.range[1];
					var prolog = checkStr.replace('%d', varPrefix + loopId);
					var epilog = '';

					if (node.body.type !== 'BlockStatement') {
						// `while(1) doThat()` becomes `while(1) {doThat()}`
						prolog = '{' + prolog;
						epilog = '}';
						--start;
					}

					patches.push({ pos: start, str: prolog });
					patches.push({ pos: end, str: epilog });
					patches.push({
						pos: node.range[0],
						str: varStr.replace('%d', varPrefix + loopId)
					});
					++loopId;
					break;

				default:
					break;
			}
		});

		/* eslint-disable no-param-reassign */
		patches
			.sort(function(a, b) {
				return b.pos - a.pos;
			})
			.forEach(function(patch) {
				code = code.slice(0, patch.pos) + patch.str + code.slice(patch.pos);
			});

		/* eslint-disable no-param-reassign */
		return code;
	}

	function getHumanDate(timestamp) {
		var d = new Date(timestamp);
		var retVal =
			d.getDate() +
			' ' +
			[
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December'
			][d.getMonth()] +
			' ' +
			d.getFullYear();
		return retVal;
	}

	// create a one-time event
	function once(node, type, callback) {
		// create event
		node.addEventListener(type, function(e) {
			// remove event
			e.target.removeEventListener(type, arguments.callee);
			// call handler
			return callback(e);
		});
	}

	window.utils = {
		semverCompare: semverCompare,
		generateRandomId: generateRandomId,
		onButtonClick: onButtonClick,
		addInfiniteLoopProtection: addInfiniteLoopProtection,
		getHumanDate: getHumanDate,
		log: log,
		once: once
	};

	window.chrome = window.chrome || {};
	window.chrome.i18n = { getMessage: () => {} };
})();

(() => {
	const FAUX_DELAY = 1;
	var local = {
		get: (obj, cb) => {
			if (typeof obj === 'string') {
				const retVal = {};
				retVal[obj] = JSON.parse(window.localStorage.getItem(obj));
				setTimeout(() => cb(retVal), FAUX_DELAY);
			} else {
				const retVal = {};
				Object.keys(obj).forEach(key => {
					let val = window.localStorage.getItem(key);
					retVal[key] =
						val === undefined || val === null ? obj[key] : JSON.parse(val);
				});
				setTimeout(() => cb(retVal), FAUX_DELAY);
			}
		},
		set: (obj, cb) => {
			Object.keys(obj).forEach(key => {
				window.localStorage.setItem(key, JSON.stringify(obj[key]));
			});
			setTimeout(() => {
				if (cb) cb();
			}, FAUX_DELAY);
		}
	};
	window.db = {
		local: chrome && chrome.storage ? chrome.storage.local : local,
		sync: chrome && chrome.storage ? chrome.storage.sync : local
	};
})();

/* global ga */
// eslint-disable-next-line max-params
window.trackEvent = function(category, action, label, value) {
	if (window.DEBUG) {
		utils.log('trackevent', category, action, label, value);
		return;
	}
	if (window.ga) {
		ga('send', 'event', category, action, label, value);
	}
};

// if online, load after sometime
if (navigator.onLine && !window.DEBUG) {
	/* eslint-disable */

	// prettier-ignore
	setTimeout(function() {
		(function(i,s,o,g,r,a,m){
			i['GoogleAnalyticsObject']=r;
			i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

		ga('create', 'UA-87786708-1', {'cookieDomain': 'none'});
		// required for chrome extension protocol
		ga('set', 'checkProtocolTask', function(){ /* nothing */ });
		ga('send', 'pageview');
	}, 100);

	/* eslint-enable */
}

(function() {
	window.deferred = function() {
		var d = {};
		var promise = new Promise(function(resolve, reject) {
			d.resolve = resolve;
			d.reject = reject;
		});

		// Add the native promise as a key on deferred object.
		d.promise = promise;
		// Also move all props/methods of native promise on the deferred obj.
		return Object.assign(d, promise);
	};
})();

(function(w) {
	window.loadJS = function(src) {
		var d = deferred();
		var ref = w.document.getElementsByTagName('script')[0];
		var script = w.document.createElement('script');
		script.src = src;
		script.async = true;
		ref.parentNode.insertBefore(script, ref);
		script.onload = function() {
			d.resolve();
		};
		return d.promise;
	};
})(window);

(function() {
	const noticationContainerEL = $('#js-alerts-container');
	var hideTimeout;

	function addNotification(msg) {
		// var n = document.createElement('div');
		// div.textContent = msg;
		// noticationContainerEL.appendChild(n);
		noticationContainerEL.textContent = msg;
		noticationContainerEL.classList.add('is-active');

		clearTimeout(hideTimeout);
		hideTimeout = setTimeout(function() {
			noticationContainerEL.classList.remove('is-active');
		}, 2000);
	}

	window.alertsService = {
		add: addNotification
	};
})();

window.jsLibs = [
	{
		url: 'https://code.jquery.com/jquery-3.2.1.min.js',
		label: 'jQuery',
		type: 'js'
	},
	{
		url: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
		label: 'Bootstrap 3',
		type: 'js'
	},
	{
		url:
			'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js',
		label: 'Bootstrap 4β',
		type: 'js'
	},
	{
		url:
			'https://cdnjs.cloudflare.com/ajax/libs/foundation/6.4.3/js/foundation.min.js',
		label: 'Foundation',
		type: 'js'
	},
	{
		url: 'https://semantic-ui.com/dist/semantic.min.js',
		label: 'Semantic UI',
		type: 'js'
	},
	{
		url: 'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js',
		label: 'Angular',
		type: 'js'
	},
	{
		url: 'https://cdnjs.cloudflare.com/ajax/libs/react/15.5.4/react.min.js',
		label: 'React',
		type: 'js'
	},
	{
		url: 'https://cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react-dom.min.js',
		label: 'React DOM',
		type: 'js'
	},
	{
		url: 'https://unpkg.com/vue@2.5.0/dist/vue.min.js',
		label: 'Vue.js',
		type: 'js'
	},
	{
		url: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/85/three.min.js',
		label: 'Three.js',
		type: 'js'
	},
	{
		url: 'https://cdnjs.cloudflare.com/ajax/libs/d3/4.10.2/d3.min.js',
		label: 'D3',
		type: 'js'
	},
	{
		url:
			'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js',
		label: 'Underscore',
		type: 'js'
	},
	{
		url: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.1/TweenMax.min.js',
		label: 'Greensock TweenMax',
		type: 'js'
	},
	{
		url: 'https://cdnjs.cloudflare.com/ajax/libs/uikit/2.27.4/js/uikit.min.js',
		label: 'UIkit 2',
		type: 'js'
	},
	{
		url:
			'https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-beta.31/js/uikit.min.js',
		label: 'UIkit 3',
		type: 'js'
	}
];
window.cssLibs = [
	{
		url:
			'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
		label: 'Bootstrap 3',
		type: 'css'
	},
	{
		url:
			'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css',
		label: 'Bootstrap 4β',
		type: 'css'
	},
	{
		url:
			'https://cdnjs.cloudflare.com/ajax/libs/foundation/6.4.3/css/foundation.min.css',
		label: 'Foundation',
		type: 'css'
	},
	{
		url: 'https://semantic-ui.com/dist/semantic.min.css',
		label: 'Semantic UI',
		type: 'css'
	},
	{
		url: 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.0/css/bulma.min.css',
		label: 'Bulma',
		type: 'css'
	},

	{
		url: 'https://cdnjs.cloudflare.com/ajax/libs/hint.css/2.5.0/hint.min.css',
		label: 'Hint.css',
		type: 'css'
	},
	{
		url:
			'https://cdnjs.cloudflare.com/ajax/libs/uikit/2.27.4/css/uikit.min.css',
		label: 'UIkit 2',
		type: 'css'
	},
	{
		url:
			'https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-beta.31/css/uikit.min.css',
		label: 'UIkit 3',
		type: 'css'
	},
	{
		url:
			'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css',
		label: 'Animate.css',
		type: 'css'
	},
	{
		url:
			'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
		label: 'FontAwesome',
		type: 'css'
	}
];

// textarea-autocomplete.js
(function() {
	class TextareaAutoComplete {
		constructor(textarea, filter) {
			this.t = textarea;
			this.filter = filter;
			var wrap = document.createElement('div');
			wrap.classList.add('btn-group');
			textarea.parentElement.insertBefore(wrap, textarea);
			wrap.insertBefore(textarea, null);
			this.list = document.createElement('ul');
			this.list.classList.add('dropdown__menu');
			this.list.classList.add('autocomplete-dropdown');
			wrap.insertBefore(this.list, null);

			this.loader = document.createElement('div');
			this.loader.classList.add('loader');
			this.loader.classList.add('autocomplete__loader');
			this.loader.style.display = 'none';
			wrap.insertBefore(this.loader, null);

			// after list is insrted into the DOM, we put it in the body
			// fixed at same position
			setTimeout(() => {
				requestIdleCallback(() => {
					document.body.appendChild(this.list);
					this.list.style.position = 'fixed';
				});
			}, 100);

			this.t.addEventListener('input', e => this.onInput(e));
			this.t.addEventListener('keydown', e => this.onKeyDown(e));
			this.t.addEventListener('blur', e => this.closeSuggestions(e));
			this.list.addEventListener('mousedown', e => this.onListMouseDown(e));
		}

		get currentLineNumber() {
			return this.t.value.substr(0, this.t.selectionStart).split('\n').length;
		}
		get currentLine() {
			var line = this.currentLineNumber;
			return this.t.value.split('\n')[line - 1];
		}
		closeSuggestions() {
			this.list.classList.remove('is-open');
			this.isShowingSuggestions = false;
		}
		getList(input) {
			var url = 'https://api.cdnjs.com/libraries?search=';
			return fetch(url + input).then(response => {
				return response.json().then(json => json.results);
			});
		}
		replaceCurrentLine(val) {
			var lines = this.t.value.split('\n');
			lines.splice(this.currentLineNumber - 1, 1, val);
			this.t.value = lines.join('\n');
		}
		onInput() {
			var currentLine = this.currentLine;
			if (currentLine) {
				if (
					currentLine.indexOf('/') !== -1 ||
					currentLine.match(/https*:\/\//)
				) {
					return;
				}
				clearTimeout(this.timeout);
				this.timeout = setTimeout(() => {
					this.loader.style.display = 'block';
					this.getList(currentLine).then(arr => {
						this.loader.style.display = 'none';
						if (!arr.length) {
							this.closeSuggestions();
							return;
						}
						this.list.innerHTML = '';
						if (this.filter) {
							/* eslint-disable no-param-reassign */
							arr = arr.filter(this.filter);
						}
						for (var i = 0; i < Math.min(arr.length, 10); i++) {
							this.list.innerHTML += `<li data-url="${arr[i].latest}"><a>${arr[
								i
							].name}</a></li>`;
						}
						this.isShowingSuggestions = true;
						if (!this.textareaBounds) {
							this.textareaBounds = this.t.getBoundingClientRect();
							this.list.style.top = this.textareaBounds.bottom + 'px';
							this.list.style.left = this.textareaBounds.left + 'px';
							this.list.style.width = this.textareaBounds.width + 'px';
						}
						this.list.classList.add('is-open');
					});
				}, 500);
			}
		}
		onKeyDown(event) {
			var selectedItemElement;
			if (!this.isShowingSuggestions) {
				return;
			}

			if (event.keyCode === 27) {
				this.closeSuggestions();
				event.stopPropagation();
			}
			if (event.keyCode === 40 && this.isShowingSuggestions) {
				selectedItemElement = this.list.querySelector('.selected');
				if (selectedItemElement) {
					selectedItemElement.classList.remove('selected');
					selectedItemElement.nextElementSibling.classList.add('selected');
				} else {
					this.list.querySelector('li:first-child').classList.add('selected');
				}
				this.list.querySelector('.selected').scrollIntoView(false);
				event.preventDefault();
			} else if (event.keyCode === 38 && this.isShowingSuggestions) {
				selectedItemElement = this.list.querySelector('.selected');
				if (selectedItemElement) {
					selectedItemElement.classList.remove('selected');
					selectedItemElement.previousElementSibling.classList.add('selected');
				} else {
					this.list.querySelector('li:first-child').classList.add('selected');
				}
				this.list.querySelector('.selected').scrollIntoView(false);
				event.preventDefault();
			} else if (event.keyCode === 13 && this.isShowingSuggestions) {
				selectedItemElement = this.list.querySelector('.selected');
				this.replaceCurrentLine(selectedItemElement.dataset.url);
				this.closeSuggestions();
			}
		}
		onListMouseDown(event) {
			var target = event.target;
			if (target.parentElement.dataset.url) {
				this.replaceCurrentLine(target.parentElement.dataset.url);
				this.closeSuggestions();
			}
		}
	}

	window.TextareaAutoComplete = TextareaAutoComplete;
})();

/* global trackEvent */
/* global layoutBtn1, layoutBtn2, layoutBtn3, helpModal, notificationsModal, addLibraryModal,
onboardModal, layoutBtn1, layoutBtn2, layoutBtn3, layoutBtn4, onboardModal, onboardModal,
addLibraryModal, addLibraryModal, notificationsBtn, notificationsModal, notificationsModal,
notificationsModal, notificationsBtn, codepenBtn, saveHtmlBtn, saveBtn,
onboardModal, settingsModal, notificationsBtn, onboardShowInTabOptionBtn, editorThemeLinkTag,
onboardDontShowInTabOptionBtn, TextareaAutoComplete, savedItemCountEl, indentationSizeValueEl,
runBtn, searchInput, consoleEl, consoleLogEl, logCountEl, fontStyleTag, fontStyleTemplate,
customEditorFontInput, cssSettingsModal, cssSettingsBtn, acssSettingsTextarea,
globalConsoleContainerEl
*/
/* eslint-disable no-extra-semi */
(function(alertsService) {
	/* eslint-enable no-extra-semi */
	var scope = scope || {};
	var version = '2.9.3';

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
	const BASE_PATH = chrome.extension ? '/' : '/dist/';

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

	// Check all the code wrap if they are minimized or not
	function updateCodeWrapCollapseStates() {
		clearTimeout(updateCodeWrapCollapseStates.timeout);
		updateCodeWrapCollapseStates.timeout = setTimeout(function() {
			[htmlCode, cssCode, jsCode].forEach(function(el) {
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
			codeSplitInstance.setSizes([33.3, 33.3, 33.3]);
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
		var obj = {};
		obj[setting] = value;
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
			db.local.get(
				{
					items: {}
				},
				function(result) {
					result.items[currentItem.id] = true;
					db.local.set({
						items: result.items
					});
				}
			);
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
				+htmlCode.style[dimensionProperty].match(/([\d.]+)%/)[1],
				+cssCode.style[dimensionProperty].match(/([\d.]+)%/)[1],
				+jsCode.style[dimensionProperty].match(/([\d.]+)%/)[1]
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
		return saveSetting(key || currentItem.id, currentItem).then(() => {
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
	function fetchItems(shouldSaveGlobally) {
		var d = deferred();
		db.local.get('items', function(result) {
			var itemIds = Object.getOwnPropertyNames(result.items || {}),
				items = [];
			if (!itemIds.length) {
				d.resolve([]);
			}

			savedItems = savedItems || {};
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
		db.local.get(
			{
				items: {}
			},
			function(result) {
				delete result.items[itemId];
				db.local.set({
					items: result.items
				});
			}
		);

		// Remove individual item too.
		db.local.remove(itemId, function() {
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
			loadJS('lib/sass.js').then(function() {
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

	function getCompleteHtml(html, css, js) {
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

		contents +=
			'<script src="' +
			(chrome.extension
				? chrome.extension.getURL('lib/screenlog.js')
				: `${location.origin}/${BASE_PATH}/lib/screenlog.js`) +
			'"></script>';

		if (jsMode === JsModes.ES6) {
			contents +=
				'<script src="' +
				chrome.extension.getURL('lib/babel-polyfill.min.js') +
				'"></script>';
		}

		if (js !== undefined) {
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
		const shouldInlineJs = !window.webkitRequestFileSystem;
		var contents = getCompleteHtml(html, css, shouldInlineJs ? js : '');
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

			var fileContent = getCompleteHtml(html, css, js);

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

			var a = document.createElement('a');
			var blob = new Blob([fileContent], { type: 'text/html;charset=UTF-8' });
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
					var input = $('[data-setting=indentWith]:checked');
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
				}
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
		matchTags: { bothTags: true }
	});
	emmetCodeMirror(scope.cm.html);
	scope.cm.css = initEditor(cssCode, {
		mode: 'css',
		gutters: ['error-gutter', 'CodeMirror-linenumbers', 'CodeMirror-foldgutter']
	});
	emmetCodeMirror(scope.cm.css);
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

				chrome.downloads.download(
					{
						url: window.URL.createObjectURL(blob),
						filename: fileName,
						saveAs: true
					},
					function() {
						// If there was an error, just download the file using ANCHOR method.
						if (chrome.runtime.lastError) {
							var a = document.createElement('a');
							a.href = window.URL.createObjectURL(blob);
							a.download = fileName;
							a.style.display = 'none';
							document.body.appendChild(a);
							a.click();
							a.remove();
						}
					}
				);

				trackEvent('ui', 'exportBtnClicked');
			});
		});
		e.preventDefault();
	};

	function mergeImportedItems(items) {
		var existingItemIds = [];
		var toMergeItems = {};
		items.forEach(item => {
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
			// save new items
			db.local.set(toMergeItems, function() {
				alertsService.add(
					mergedItemCount + ' creations imported successfully.'
				);
			});
			// Push in new item IDs
			db.local.get(
				{
					items: {}
				},
				function(result) {
					/* eslint-disable guard-for-in */
					for (var id in toMergeItems) {
						result.items[id] = true;
					}
					db.local.set({
						items: result.items
					});
					trackEvent('fn', 'itemsImported', mergedItemCount);

					/* eslint-enable guard-for-in */
				}
			);
			alertsService.add(mergedItemCount + ' creations imported successfully.');
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
			} catch (ex) {
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
			db.sync.set(obj, function() {
				alertsService.add('Setting saved');
			});
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
		editorThemeLinkTag.href =
			`lib/codemirror/theme/${prefs.editorTheme}.css`;
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
			scope.consoleCm.replaceRange(
				arg +
					' ' +
					((arg + '').match(/\[object \w+]/) ? JSON.stringify(arg) : '') +
					'\n',
				{ line: Infinity }
			);
			scope.consoleCm.scrollTo(0, Infinity);
			logCount++;
		});
		logCountEl.textContent = logCount;

		/* eslint-enable no-param-reassign */
	};

	function compileNodes() {
		function attachListenerForEvent(eventName) {
			const nodes = $all(`[d-${eventName}]`);
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
		const modalTriggers = $all(`[d-open-modal]`);
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
		const dHtmlNodes = $all(`[d-html]`);
		dHtmlNodes.forEach(function(el) {
			fetch(el.getAttribute('d-html')).then(response => {
				// Stop further compilation because of future recursion by removing attribute.
				el.removeAttribute('d-html');
				response.text().then(html => {
					requestIdleCallback(() => {
						el.innerHTML = html;
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

	function init() {
		var lastCode;

		CodeMirror.modeURL = `${BASE_PATH}/lib/codemirror/mode/%N/%N.js`;

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
				db.sync.set(
					{
						lastSeenVersion: version
					},
					function() {}
				);
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

		new TextareaAutoComplete(externalJsTextarea, obj =>
			obj.latest.match(/\.js$/)
		);
		new TextareaAutoComplete(externalCssTextarea, obj =>
			obj.latest.match(/\.css$/)
		);

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
		db.sync.get(
			{
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
			},
			function syncGetCallback(result) {
				if (result.preserveLastCode && lastCode) {
					unsavedEditCount = 0;
					if (lastCode.id) {
						db.local.get(lastCode.id, function(itemResult) {
							utils.log('Load item ', lastCode.id);
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
				prefs.editorFont = result.editorFont;
				prefs.editorCustomFont = result.editorCustomFont;
				prefs.autoSave = result.autoSave;
				prefs.autoComplete = result.autoComplete;
				prefs.preserveConsoleLogs = result.preserveConsoleLogs;
				prefs.lightVersion = result.lightVersion;
				prefs.lineWrap = result.lineWrap;

				updateSettingsInUi();
				scope.updateSetting();
			}
		);

		// Check for new version notifications
		db.sync.get(
			{
				lastSeenVersion: ''
			},
			function syncGetCallback(result) {
				// Check if new user
				if (!result.lastSeenVersion) {
					onboardModal.classList.add('is-modal-visible');
					if (document.cookie.indexOf('onboarded') === -1) {
						trackEvent('ui', 'onboardModalSeen', version);
						document.cookie = 'onboarded=1';
					}
					db.sync.set(
						{
							lastSeenVersion: version
						},
						function() {}
					);
					// set some initial preferences on closing the onboard modal
					utils.once(document, 'overlaysClosed', function() {
						db.sync.set(
							{
								replaceNewTab: onboardShowInTabOptionBtn.classList.contains(
									'selected'
								)
							},
							function() {
								trackEvent(
									'fn',
									'setReplaceNewTabFromOnboard',
									onboardShowInTabOptionBtn.classList.contains('selected')
								);
							}
						);
					});
				}
				if (
					!result.lastSeenVersion ||
					utils.semverCompare(result.lastSeenVersion, version) === -1
				) {
					notificationsBtn.classList.add('has-new');
					hasSeenNotifications = false;
				}
			}
		);

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
})(window.alertsService);

// Dropdown.js

(function($all) {
	var openDropdown;

	// Closes all dropdowns except the passed one.
	function closeOpenDropdown(except) {
		if (openDropdown && (!except || except !== openDropdown)) {
			openDropdown.classList.remove('open');
			openDropdown = null;
		}
	}
	function init() {
		var dropdowns = $all('[dropdown]');
		dropdowns.forEach(function(dropdown) {
			dropdown.addEventListener('click', function(e) {
				closeOpenDropdown(e.currentTarget);
				e.currentTarget.classList.toggle('open');
				openDropdown = e.currentTarget;
				e.stopPropagation();
			});
		});

		document.addEventListener('click', function() {
			closeOpenDropdown();
		});
	}

	init();
})($all);
