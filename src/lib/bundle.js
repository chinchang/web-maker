/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = trackEvent;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(3);


/* global ga */

// eslint-disable-next-line max-params
function trackEvent(category, action, label, value) {
	if (window.DEBUG) {
		Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* log */])('trackevent', category, action, label, value);
		return;
	}
	if (window.ga) {
		ga('send', 'event', category, action, label, value);
	}
}

// if online, load after sometime
if (navigator.onLine && !window.DEBUG) {
	/* eslint-disable */

	// prettier-ignore
	setTimeout(function () {
		(function (i, s, o, g, r, a, m) {
			i['GoogleAnalyticsObject'] = r;
			i[r] = i[r] || function () {
				(i[r].q = i[r].q || []).push(arguments)
			}, i[r].l = 1 * new Date();
			a = s.createElement(o),
				m = s.getElementsByTagName(o)[0];
			a.async = 1;
			a.src = g;
			m.parentNode.insertBefore(a, m)
		})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

		if (location.href.indexOf('chrome-extension://') === -1) {
			ga('create', 'UA-1211588-20');
		} else {
			ga('create', 'UA-1211588-20', {
				'cookieDomain': 'none'
			});
			// required for chrome extension protocol
			ga('set', 'checkProtocolTask', function () { /* nothing */ });
		}
		ga('send', 'pageview', 'extension');
	}, 100);

	/* eslint-enable */
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export semverCompare */
/* unused harmony export generateRandomId */
/* unused harmony export onButtonClick */
/* harmony export (immutable) */ __webpack_exports__["b"] = log;
/* harmony export (immutable) */ __webpack_exports__["a"] = addInfiniteLoopProtection;
/* unused harmony export getHumanDate */
/* unused harmony export once */
/* unused harmony export downloadFile */
/* unused harmony export writeFile */
/* unused harmony export loadJS */
/* unused harmony export getCompleteHtml */
/* unused harmony export saveAsHtml */
/* unused harmony export handleDownloadsPermission */
/* unused harmony export getFilenameFromUrl */
/* unused harmony export prettify */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__analytics__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__computes__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__codeModes__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__deferred__ = __webpack_require__(4);





const esprima = __webpack_require__(6);

window.DEBUG = document.cookie.indexOf('wmdebug') > -1;
window.$ = document.querySelector.bind(document);

window.chrome = window.chrome || {};
window.chrome.i18n = {
	getMessage: () => {}
};

window.$all = selector => [...document.querySelectorAll(selector)];
window.IS_EXTENSION = !!window.chrome.extension;
const BASE_PATH = '';
/* unused harmony export BASE_PATH */


var alphaNum = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

/**
 * The following 2 functions are supposed to find the next/previous sibling until the
 * passed `selector` is matched. But for now it actually finds the next/previous
 * element of `this` element in the list of `selector` matched element inside `this`'s
 * parent.
 * @param  Selector that should match for next siblings
 * @return element Next element that mathes `selector`
 */
Node.prototype.nextUntil = function(selector) {
	const siblings = Array.from(this.parentNode.querySelectorAll(selector));
	const index = siblings.indexOf(this);
	return siblings[index + 1];
};

/*
 * @param  Selector that should match for next siblings
 * @return element Next element that mathes `selector`
 */
Node.prototype.previousUntil = function(selector) {
	const siblings = Array.from(this.parentNode.querySelectorAll(selector));
	const index = siblings.indexOf(this);
	return siblings[index - 1];
};

// Safari doesn't have this!
window.requestIdleCallback =
	window.requestIdleCallback ||
	function(fn) {
		setTimeout(fn, 10);
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
		console.log(Date.now(), ...arguments);
	}
}

/**
 * Adds timed limit on the loops found in the passed code.
 * Contributed by Ariya Hidayat!
 * @param code {string}	Code to be protected from infinite loops.
 */
function addInfiniteLoopProtection(code, { timeout }) {
	var loopId = 1;
	var patches = [];
	var varPrefix = '_wmloopvar';
	var varStr = 'var %d = Date.now();\n';
	var checkStr = `\nif (Date.now() - %d > ${timeout}) { window.top.previewException(new Error("Infinite loop")); break;}\n`;

	esprima.parse(
		code,
		{
			tolerant: true,
			range: true,
			jsx: true
		},
		function(node) {
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

					patches.push({
						pos: start,
						str: prolog
					});
					patches.push({
						pos: end,
						str: epilog
					});
					patches.push({
						pos: node.range[0],
						str: varStr.replace('%d', varPrefix + loopId)
					});
					++loopId;
					break;

				default:
					break;
			}
		}
	);

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

function downloadFile(fileName, blob) {
	function downloadWithAnchor() {
		var a = document.createElement('a');
		a.href = window.URL.createObjectURL(blob);
		a.download = fileName;
		a.style.display = 'none';
		document.body.appendChild(a);
		a.click();
		a.remove();
	}

	// HACK: because chrome.downloads isn't working on optional permissions
	// anymore.
	downloadWithAnchor();

	/* if (false && window.IS_EXTENSION) {
		chrome.downloads.download({
				url: window.URL.createObjectURL(blob),
				filename: fileName,
				saveAs: true
			},
			() => {
				// If there was an error, just download the file using ANCHOR method.
				if (chrome.runtime.lastError) {
					downloadWithAnchor();
				}
			}
		);
	} else {
		downloadWithAnchor();
	} */
}

function writeFile(name, blob, cb) {
	var fileWritten = false;

	function getErrorHandler(type) {
		return function() {
			log(arguments);
			Object(__WEBPACK_IMPORTED_MODULE_0__analytics__["a" /* trackEvent */])('fn', 'error', type);
			// When there are too many write errors, show a message.
			writeFile.errorCount = (writeFile.errorCount || 0) + 1;
			if (writeFile.errorCount === 4) {
				setTimeout(function() {
					alert(
						"Oops! Seems like your preview isn't updating. It's recommended to switch to the web app: https://webmakerapp.com/app/.\n\n If you still want to get the extension working, please try the following steps until it fixes:\n - Refresh Web Maker\n - Restart browser\n - Update browser\n - Reinstall Web Maker (don't forget to export all your creations from saved items pane (click the OPEN button) before reinstalling)\n\nIf nothing works, please tweet out to @webmakerApp."
					);
					Object(__WEBPACK_IMPORTED_MODULE_0__analytics__["a" /* trackEvent */])('ui', 'writeFileMessageSeen');
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
				{
					create: true
				},
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

function loadJS(src) {
	var d = Object(__WEBPACK_IMPORTED_MODULE_3__deferred__["a" /* deferred */])();
	var ref = window.document.getElementsByTagName('script')[0];
	var script = window.document.createElement('script');
	script.src = src;
	script.async = true;
	ref.parentNode.insertBefore(script, ref);
	script.onload = function() {
		d.resolve();
	};
	return d.promise;
}

/* eslint-disable max-params */
function getCompleteHtml(html, css, js, item, isForExport) {
	/* eslint-enable max-params */

	if (!item) {
		return '';
	}

	var	externalCss = [			(chrome.extension
				? chrome.extension.getURL('lib/vue-sequence-ext.css')
				: `${location.origin}${
					window.DEBUG ? '' : BASE_PATH
					}/lib/vue-sequence-ext.css`),
		'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css']
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
		'\n';

	if (!isForExport) {
		contents +=
			'<script src="' +
			(chrome.extension
				? chrome.extension.getURL('lib/screenlog.js')
				: `${location.origin}${
						window.DEBUG ? '' : BASE_PATH
				  }/lib/screenlog.js`) +
			'"></script>';
	}
	contents +=
		'<script src="' +
		(chrome.extension
			? chrome.extension.getURL('lib/bundle.js')
			: `${location.origin}${BASE_PATH}/lib/bundle.js`)+
		'"></script>';

	if (item.jsMode === __WEBPACK_IMPORTED_MODULE_2__codeModes__["c" /* JsModes */].ES6) {
		contents +=
			'<script src="' +
			(chrome.extension
				? chrome.extension.getURL('lib/transpilers/babel-polyfill.min.js')
				: `${
						location.origin
				  }${BASE_PATH}/lib/transpilers/babel-polyfill.min.js`) +
			'"></script>';
	}

	if (typeof js === 'string') {
		contents += '<script>\n' + js + '\n//# sourceURL=userscript.js';
	} else {
		var origin = chrome.i18n.getMessage
			? `chrome-extension://${chrome.i18n.getMessage('@@extension_id')}`
			: `${location.origin}`;
		contents +=
			'<script src="' + `filesystem:${origin}/temporary/script.js` + '">';
	}
	contents += '\n</script>\n</body>\n</html>';

	return contents;
}

function saveAsHtml(item) {
	var htmlPromise = Object(__WEBPACK_IMPORTED_MODULE_1__computes__["b" /* computeHtml */])(item.html, item.htmlMode);
	var cssPromise = Object(__WEBPACK_IMPORTED_MODULE_1__computes__["a" /* computeCss */])(item.css, item.cssMode);
	var jsPromise = Object(__WEBPACK_IMPORTED_MODULE_1__computes__["c" /* computeJs */])(item.js, item.jsMode, false);
	Promise.all([htmlPromise, cssPromise, jsPromise]).then(result => {
		var html = result[0].code,
			css = result[1].code,
			js = result[2].code;

		var fileContent = getCompleteHtml(html, css, js, item, true);

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

		if (item.title) {
			fileName = item.title;
		}
		fileName += '.html';

		var blob = new Blob([fileContent], {
			type: 'text/html;charset=UTF-8'
		});
		downloadFile(fileName, blob);

		Object(__WEBPACK_IMPORTED_MODULE_0__analytics__["a" /* trackEvent */])('fn', 'saveFileComplete');
	});
}

function handleDownloadsPermission() {
	var d = Object(__WEBPACK_IMPORTED_MODULE_3__deferred__["a" /* deferred */])();
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
							Object(__WEBPACK_IMPORTED_MODULE_0__analytics__["a" /* trackEvent */])('fn', 'downloadsPermGiven');
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

/**
 * Return the filename from a passed url.
 * http://a.com/path/file.png  -> file.png
 */
function getFilenameFromUrl(url) {
	if (!url) {
		return '';
	}
	return url.match(/\/([^/]*)$/)[1];
}

function prettify(content, type = 'js') {
	const d = Object(__WEBPACK_IMPORTED_MODULE_3__deferred__["a" /* deferred */])();
	const worker = new Worker(
		chrome.extension
			? chrome.extension.getURL('lib/prettier-worker.js')
			: `${BASE_PATH === '/' ? '' : BASE_PATH}/lib/prettier-worker.js`
	);
	worker.postMessage({ content, type });
	worker.addEventListener('message', e => {
		d.resolve(e.data);
		worker.terminate();
	});
	return d.promise;
}

if (window.IS_EXTENSION) {
	document.body.classList.add('is-extension');
} else {
	document.body.classList.add('is-app');
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = deferred;
function deferred() {
	var d = {};
	var promise = new Promise(function (resolve, reject) {
		d.resolve = resolve;
		d.reject = reject;
	});

	// Add the native promise as a key on deferred object.
	d.promise = promise;
	// Also move all props/methods of native promise on the deferred obj.
	return Object.assign(d, promise);
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const HtmlModes = {
	HTML: 'html',
	MARKDOWN: 'markdown',
	JADE: 'jade' // unsafe eval is put in manifest for this file
};
/* harmony export (immutable) */ __webpack_exports__["b"] = HtmlModes;

const CssModes = {
	CSS: 'css',
	SCSS: 'scss',
	SASS: 'sass',
	LESS: 'less',
	STYLUS: 'stylus',
	ACSS: 'acss'
};
/* harmony export (immutable) */ __webpack_exports__["a"] = CssModes;

const JsModes = {
	JS: 'js',
	ES6: 'es6',
	COFFEESCRIPT: 'coffee',
	TS: 'typescript'
};
/* harmony export (immutable) */ __webpack_exports__["c"] = JsModes;

const modes = {};
/* unused harmony export modes */

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
modes[HtmlModes.JADE] = {
	label: 'Pug',
	cmMode: 'pug',
	codepenVal: 'pug'
};
modes[JsModes.JS] = {
	label: 'ZenUML',
	cmMode: 'javascript',
	codepenVal: 'none'
};
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
modes[CssModes.SASS] = {
	label: 'SASS',
	cmMode: 'sass',
	codepenVal: 'sass'
};
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


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
/* istanbul ignore next */
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
/* istanbul ignore next */
	else if(typeof exports === 'object')
		exports["esprima"] = factory();
	else
		root["esprima"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/* istanbul ignore if */
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/*
	  Copyright JS Foundation and other contributors, https://js.foundation/

	  Redistribution and use in source and binary forms, with or without
	  modification, are permitted provided that the following conditions are met:

	    * Redistributions of source code must retain the above copyright
	      notice, this list of conditions and the following disclaimer.
	    * Redistributions in binary form must reproduce the above copyright
	      notice, this list of conditions and the following disclaimer in the
	      documentation and/or other materials provided with the distribution.

	  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
	  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
	  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
	  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
	  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
	  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
	  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
	  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
	  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/
	Object.defineProperty(exports, "__esModule", { value: true });
	var comment_handler_1 = __webpack_require__(1);
	var jsx_parser_1 = __webpack_require__(3);
	var parser_1 = __webpack_require__(8);
	var tokenizer_1 = __webpack_require__(15);
	function parse(code, options, delegate) {
	    var commentHandler = null;
	    var proxyDelegate = function (node, metadata) {
	        if (delegate) {
	            delegate(node, metadata);
	        }
	        if (commentHandler) {
	            commentHandler.visit(node, metadata);
	        }
	    };
	    var parserDelegate = (typeof delegate === 'function') ? proxyDelegate : null;
	    var collectComment = false;
	    if (options) {
	        collectComment = (typeof options.comment === 'boolean' && options.comment);
	        var attachComment = (typeof options.attachComment === 'boolean' && options.attachComment);
	        if (collectComment || attachComment) {
	            commentHandler = new comment_handler_1.CommentHandler();
	            commentHandler.attach = attachComment;
	            options.comment = true;
	            parserDelegate = proxyDelegate;
	        }
	    }
	    var isModule = false;
	    if (options && typeof options.sourceType === 'string') {
	        isModule = (options.sourceType === 'module');
	    }
	    var parser;
	    if (options && typeof options.jsx === 'boolean' && options.jsx) {
	        parser = new jsx_parser_1.JSXParser(code, options, parserDelegate);
	    }
	    else {
	        parser = new parser_1.Parser(code, options, parserDelegate);
	    }
	    var program = isModule ? parser.parseModule() : parser.parseScript();
	    var ast = program;
	    if (collectComment && commentHandler) {
	        ast.comments = commentHandler.comments;
	    }
	    if (parser.config.tokens) {
	        ast.tokens = parser.tokens;
	    }
	    if (parser.config.tolerant) {
	        ast.errors = parser.errorHandler.errors;
	    }
	    return ast;
	}
	exports.parse = parse;
	function parseModule(code, options, delegate) {
	    var parsingOptions = options || {};
	    parsingOptions.sourceType = 'module';
	    return parse(code, parsingOptions, delegate);
	}
	exports.parseModule = parseModule;
	function parseScript(code, options, delegate) {
	    var parsingOptions = options || {};
	    parsingOptions.sourceType = 'script';
	    return parse(code, parsingOptions, delegate);
	}
	exports.parseScript = parseScript;
	function tokenize(code, options, delegate) {
	    var tokenizer = new tokenizer_1.Tokenizer(code, options);
	    var tokens;
	    tokens = [];
	    try {
	        while (true) {
	            var token = tokenizer.getNextToken();
	            if (!token) {
	                break;
	            }
	            if (delegate) {
	                token = delegate(token);
	            }
	            tokens.push(token);
	        }
	    }
	    catch (e) {
	        tokenizer.errorHandler.tolerate(e);
	    }
	    if (tokenizer.errorHandler.tolerant) {
	        tokens.errors = tokenizer.errors();
	    }
	    return tokens;
	}
	exports.tokenize = tokenize;
	var syntax_1 = __webpack_require__(2);
	exports.Syntax = syntax_1.Syntax;
	// Sync with *.json manifests.
	exports.version = '4.0.0';


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var syntax_1 = __webpack_require__(2);
	var CommentHandler = (function () {
	    function CommentHandler() {
	        this.attach = false;
	        this.comments = [];
	        this.stack = [];
	        this.leading = [];
	        this.trailing = [];
	    }
	    CommentHandler.prototype.insertInnerComments = function (node, metadata) {
	        //  innnerComments for properties empty block
	        //  `function a() {/** comments **\/}`
	        if (node.type === syntax_1.Syntax.BlockStatement && node.body.length === 0) {
	            var innerComments = [];
	            for (var i = this.leading.length - 1; i >= 0; --i) {
	                var entry = this.leading[i];
	                if (metadata.end.offset >= entry.start) {
	                    innerComments.unshift(entry.comment);
	                    this.leading.splice(i, 1);
	                    this.trailing.splice(i, 1);
	                }
	            }
	            if (innerComments.length) {
	                node.innerComments = innerComments;
	            }
	        }
	    };
	    CommentHandler.prototype.findTrailingComments = function (metadata) {
	        var trailingComments = [];
	        if (this.trailing.length > 0) {
	            for (var i = this.trailing.length - 1; i >= 0; --i) {
	                var entry_1 = this.trailing[i];
	                if (entry_1.start >= metadata.end.offset) {
	                    trailingComments.unshift(entry_1.comment);
	                }
	            }
	            this.trailing.length = 0;
	            return trailingComments;
	        }
	        var entry = this.stack[this.stack.length - 1];
	        if (entry && entry.node.trailingComments) {
	            var firstComment = entry.node.trailingComments[0];
	            if (firstComment && firstComment.range[0] >= metadata.end.offset) {
	                trailingComments = entry.node.trailingComments;
	                delete entry.node.trailingComments;
	            }
	        }
	        return trailingComments;
	    };
	    CommentHandler.prototype.findLeadingComments = function (metadata) {
	        var leadingComments = [];
	        var target;
	        while (this.stack.length > 0) {
	            var entry = this.stack[this.stack.length - 1];
	            if (entry && entry.start >= metadata.start.offset) {
	                target = entry.node;
	                this.stack.pop();
	            }
	            else {
	                break;
	            }
	        }
	        if (target) {
	            var count = target.leadingComments ? target.leadingComments.length : 0;
	            for (var i = count - 1; i >= 0; --i) {
	                var comment = target.leadingComments[i];
	                if (comment.range[1] <= metadata.start.offset) {
	                    leadingComments.unshift(comment);
	                    target.leadingComments.splice(i, 1);
	                }
	            }
	            if (target.leadingComments && target.leadingComments.length === 0) {
	                delete target.leadingComments;
	            }
	            return leadingComments;
	        }
	        for (var i = this.leading.length - 1; i >= 0; --i) {
	            var entry = this.leading[i];
	            if (entry.start <= metadata.start.offset) {
	                leadingComments.unshift(entry.comment);
	                this.leading.splice(i, 1);
	            }
	        }
	        return leadingComments;
	    };
	    CommentHandler.prototype.visitNode = function (node, metadata) {
	        if (node.type === syntax_1.Syntax.Program && node.body.length > 0) {
	            return;
	        }
	        this.insertInnerComments(node, metadata);
	        var trailingComments = this.findTrailingComments(metadata);
	        var leadingComments = this.findLeadingComments(metadata);
	        if (leadingComments.length > 0) {
	            node.leadingComments = leadingComments;
	        }
	        if (trailingComments.length > 0) {
	            node.trailingComments = trailingComments;
	        }
	        this.stack.push({
	            node: node,
	            start: metadata.start.offset
	        });
	    };
	    CommentHandler.prototype.visitComment = function (node, metadata) {
	        var type = (node.type[0] === 'L') ? 'Line' : 'Block';
	        var comment = {
	            type: type,
	            value: node.value
	        };
	        if (node.range) {
	            comment.range = node.range;
	        }
	        if (node.loc) {
	            comment.loc = node.loc;
	        }
	        this.comments.push(comment);
	        if (this.attach) {
	            var entry = {
	                comment: {
	                    type: type,
	                    value: node.value,
	                    range: [metadata.start.offset, metadata.end.offset]
	                },
	                start: metadata.start.offset
	            };
	            if (node.loc) {
	                entry.comment.loc = node.loc;
	            }
	            node.type = type;
	            this.leading.push(entry);
	            this.trailing.push(entry);
	        }
	    };
	    CommentHandler.prototype.visit = function (node, metadata) {
	        if (node.type === 'LineComment') {
	            this.visitComment(node, metadata);
	        }
	        else if (node.type === 'BlockComment') {
	            this.visitComment(node, metadata);
	        }
	        else if (this.attach) {
	            this.visitNode(node, metadata);
	        }
	    };
	    return CommentHandler;
	}());
	exports.CommentHandler = CommentHandler;


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Syntax = {
	    AssignmentExpression: 'AssignmentExpression',
	    AssignmentPattern: 'AssignmentPattern',
	    ArrayExpression: 'ArrayExpression',
	    ArrayPattern: 'ArrayPattern',
	    ArrowFunctionExpression: 'ArrowFunctionExpression',
	    AwaitExpression: 'AwaitExpression',
	    BlockStatement: 'BlockStatement',
	    BinaryExpression: 'BinaryExpression',
	    BreakStatement: 'BreakStatement',
	    CallExpression: 'CallExpression',
	    CatchClause: 'CatchClause',
	    ClassBody: 'ClassBody',
	    ClassDeclaration: 'ClassDeclaration',
	    ClassExpression: 'ClassExpression',
	    ConditionalExpression: 'ConditionalExpression',
	    ContinueStatement: 'ContinueStatement',
	    DoWhileStatement: 'DoWhileStatement',
	    DebuggerStatement: 'DebuggerStatement',
	    EmptyStatement: 'EmptyStatement',
	    ExportAllDeclaration: 'ExportAllDeclaration',
	    ExportDefaultDeclaration: 'ExportDefaultDeclaration',
	    ExportNamedDeclaration: 'ExportNamedDeclaration',
	    ExportSpecifier: 'ExportSpecifier',
	    ExpressionStatement: 'ExpressionStatement',
	    ForStatement: 'ForStatement',
	    ForOfStatement: 'ForOfStatement',
	    ForInStatement: 'ForInStatement',
	    FunctionDeclaration: 'FunctionDeclaration',
	    FunctionExpression: 'FunctionExpression',
	    Identifier: 'Identifier',
	    IfStatement: 'IfStatement',
	    ImportDeclaration: 'ImportDeclaration',
	    ImportDefaultSpecifier: 'ImportDefaultSpecifier',
	    ImportNamespaceSpecifier: 'ImportNamespaceSpecifier',
	    ImportSpecifier: 'ImportSpecifier',
	    Literal: 'Literal',
	    LabeledStatement: 'LabeledStatement',
	    LogicalExpression: 'LogicalExpression',
	    MemberExpression: 'MemberExpression',
	    MetaProperty: 'MetaProperty',
	    MethodDefinition: 'MethodDefinition',
	    NewExpression: 'NewExpression',
	    ObjectExpression: 'ObjectExpression',
	    ObjectPattern: 'ObjectPattern',
	    Program: 'Program',
	    Property: 'Property',
	    RestElement: 'RestElement',
	    ReturnStatement: 'ReturnStatement',
	    SequenceExpression: 'SequenceExpression',
	    SpreadElement: 'SpreadElement',
	    Super: 'Super',
	    SwitchCase: 'SwitchCase',
	    SwitchStatement: 'SwitchStatement',
	    TaggedTemplateExpression: 'TaggedTemplateExpression',
	    TemplateElement: 'TemplateElement',
	    TemplateLiteral: 'TemplateLiteral',
	    ThisExpression: 'ThisExpression',
	    ThrowStatement: 'ThrowStatement',
	    TryStatement: 'TryStatement',
	    UnaryExpression: 'UnaryExpression',
	    UpdateExpression: 'UpdateExpression',
	    VariableDeclaration: 'VariableDeclaration',
	    VariableDeclarator: 'VariableDeclarator',
	    WhileStatement: 'WhileStatement',
	    WithStatement: 'WithStatement',
	    YieldExpression: 'YieldExpression'
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
/* istanbul ignore next */
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var character_1 = __webpack_require__(4);
	var JSXNode = __webpack_require__(5);
	var jsx_syntax_1 = __webpack_require__(6);
	var Node = __webpack_require__(7);
	var parser_1 = __webpack_require__(8);
	var token_1 = __webpack_require__(13);
	var xhtml_entities_1 = __webpack_require__(14);
	token_1.TokenName[100 /* Identifier */] = 'JSXIdentifier';
	token_1.TokenName[101 /* Text */] = 'JSXText';
	// Fully qualified element name, e.g. <svg:path> returns "svg:path"
	function getQualifiedElementName(elementName) {
	    var qualifiedName;
	    switch (elementName.type) {
	        case jsx_syntax_1.JSXSyntax.JSXIdentifier:
	            var id = elementName;
	            qualifiedName = id.name;
	            break;
	        case jsx_syntax_1.JSXSyntax.JSXNamespacedName:
	            var ns = elementName;
	            qualifiedName = getQualifiedElementName(ns.namespace) + ':' +
	                getQualifiedElementName(ns.name);
	            break;
	        case jsx_syntax_1.JSXSyntax.JSXMemberExpression:
	            var expr = elementName;
	            qualifiedName = getQualifiedElementName(expr.object) + '.' +
	                getQualifiedElementName(expr.property);
	            break;
	        /* istanbul ignore next */
	        default:
	            break;
	    }
	    return qualifiedName;
	}
	var JSXParser = (function (_super) {
	    __extends(JSXParser, _super);
	    function JSXParser(code, options, delegate) {
	        return _super.call(this, code, options, delegate) || this;
	    }
	    JSXParser.prototype.parsePrimaryExpression = function () {
	        return this.match('<') ? this.parseJSXRoot() : _super.prototype.parsePrimaryExpression.call(this);
	    };
	    JSXParser.prototype.startJSX = function () {
	        // Unwind the scanner before the lookahead token.
	        this.scanner.index = this.startMarker.index;
	        this.scanner.lineNumber = this.startMarker.line;
	        this.scanner.lineStart = this.startMarker.index - this.startMarker.column;
	    };
	    JSXParser.prototype.finishJSX = function () {
	        // Prime the next lookahead.
	        this.nextToken();
	    };
	    JSXParser.prototype.reenterJSX = function () {
	        this.startJSX();
	        this.expectJSX('}');
	        // Pop the closing '}' added from the lookahead.
	        if (this.config.tokens) {
	            this.tokens.pop();
	        }
	    };
	    JSXParser.prototype.createJSXNode = function () {
	        this.collectComments();
	        return {
	            index: this.scanner.index,
	            line: this.scanner.lineNumber,
	            column: this.scanner.index - this.scanner.lineStart
	        };
	    };
	    JSXParser.prototype.createJSXChildNode = function () {
	        return {
	            index: this.scanner.index,
	            line: this.scanner.lineNumber,
	            column: this.scanner.index - this.scanner.lineStart
	        };
	    };
	    JSXParser.prototype.scanXHTMLEntity = function (quote) {
	        var result = '&';
	        var valid = true;
	        var terminated = false;
	        var numeric = false;
	        var hex = false;
	        while (!this.scanner.eof() && valid && !terminated) {
	            var ch = this.scanner.source[this.scanner.index];
	            if (ch === quote) {
	                break;
	            }
	            terminated = (ch === ';');
	            result += ch;
	            ++this.scanner.index;
	            if (!terminated) {
	                switch (result.length) {
	                    case 2:
	                        // e.g. '&#123;'
	                        numeric = (ch === '#');
	                        break;
	                    case 3:
	                        if (numeric) {
	                            // e.g. '&#x41;'
	                            hex = (ch === 'x');
	                            valid = hex || character_1.Character.isDecimalDigit(ch.charCodeAt(0));
	                            numeric = numeric && !hex;
	                        }
	                        break;
	                    default:
	                        valid = valid && !(numeric && !character_1.Character.isDecimalDigit(ch.charCodeAt(0)));
	                        valid = valid && !(hex && !character_1.Character.isHexDigit(ch.charCodeAt(0)));
	                        break;
	                }
	            }
	        }
	        if (valid && terminated && result.length > 2) {
	            // e.g. '&#x41;' becomes just '#x41'
	            var str = result.substr(1, result.length - 2);
	            if (numeric && str.length > 1) {
	                result = String.fromCharCode(parseInt(str.substr(1), 10));
	            }
	            else if (hex && str.length > 2) {
	                result = String.fromCharCode(parseInt('0' + str.substr(1), 16));
	            }
	            else if (!numeric && !hex && xhtml_entities_1.XHTMLEntities[str]) {
	                result = xhtml_entities_1.XHTMLEntities[str];
	            }
	        }
	        return result;
	    };
	    // Scan the next JSX token. This replaces Scanner#lex when in JSX mode.
	    JSXParser.prototype.lexJSX = function () {
	        var cp = this.scanner.source.charCodeAt(this.scanner.index);
	        // < > / : = { }
	        if (cp === 60 || cp === 62 || cp === 47 || cp === 58 || cp === 61 || cp === 123 || cp === 125) {
	            var value = this.scanner.source[this.scanner.index++];
	            return {
	                type: 7 /* Punctuator */,
	                value: value,
	                lineNumber: this.scanner.lineNumber,
	                lineStart: this.scanner.lineStart,
	                start: this.scanner.index - 1,
	                end: this.scanner.index
	            };
	        }
	        // " '
	        if (cp === 34 || cp === 39) {
	            var start = this.scanner.index;
	            var quote = this.scanner.source[this.scanner.index++];
	            var str = '';
	            while (!this.scanner.eof()) {
	                var ch = this.scanner.source[this.scanner.index++];
	                if (ch === quote) {
	                    break;
	                }
	                else if (ch === '&') {
	                    str += this.scanXHTMLEntity(quote);
	                }
	                else {
	                    str += ch;
	                }
	            }
	            return {
	                type: 8 /* StringLiteral */,
	                value: str,
	                lineNumber: this.scanner.lineNumber,
	                lineStart: this.scanner.lineStart,
	                start: start,
	                end: this.scanner.index
	            };
	        }
	        // ... or .
	        if (cp === 46) {
	            var n1 = this.scanner.source.charCodeAt(this.scanner.index + 1);
	            var n2 = this.scanner.source.charCodeAt(this.scanner.index + 2);
	            var value = (n1 === 46 && n2 === 46) ? '...' : '.';
	            var start = this.scanner.index;
	            this.scanner.index += value.length;
	            return {
	                type: 7 /* Punctuator */,
	                value: value,
	                lineNumber: this.scanner.lineNumber,
	                lineStart: this.scanner.lineStart,
	                start: start,
	                end: this.scanner.index
	            };
	        }
	        // `
	        if (cp === 96) {
	            // Only placeholder, since it will be rescanned as a real assignment expression.
	            return {
	                type: 10 /* Template */,
	                value: '',
	                lineNumber: this.scanner.lineNumber,
	                lineStart: this.scanner.lineStart,
	                start: this.scanner.index,
	                end: this.scanner.index
	            };
	        }
	        // Identifer can not contain backslash (char code 92).
	        if (character_1.Character.isIdentifierStart(cp) && (cp !== 92)) {
	            var start = this.scanner.index;
	            ++this.scanner.index;
	            while (!this.scanner.eof()) {
	                var ch = this.scanner.source.charCodeAt(this.scanner.index);
	                if (character_1.Character.isIdentifierPart(ch) && (ch !== 92)) {
	                    ++this.scanner.index;
	                }
	                else if (ch === 45) {
	                    // Hyphen (char code 45) can be part of an identifier.
	                    ++this.scanner.index;
	                }
	                else {
	                    break;
	                }
	            }
	            var id = this.scanner.source.slice(start, this.scanner.index);
	            return {
	                type: 100 /* Identifier */,
	                value: id,
	                lineNumber: this.scanner.lineNumber,
	                lineStart: this.scanner.lineStart,
	                start: start,
	                end: this.scanner.index
	            };
	        }
	        return this.scanner.lex();
	    };
	    JSXParser.prototype.nextJSXToken = function () {
	        this.collectComments();
	        this.startMarker.index = this.scanner.index;
	        this.startMarker.line = this.scanner.lineNumber;
	        this.startMarker.column = this.scanner.index - this.scanner.lineStart;
	        var token = this.lexJSX();
	        this.lastMarker.index = this.scanner.index;
	        this.lastMarker.line = this.scanner.lineNumber;
	        this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
	        if (this.config.tokens) {
	            this.tokens.push(this.convertToken(token));
	        }
	        return token;
	    };
	    JSXParser.prototype.nextJSXText = function () {
	        this.startMarker.index = this.scanner.index;
	        this.startMarker.line = this.scanner.lineNumber;
	        this.startMarker.column = this.scanner.index - this.scanner.lineStart;
	        var start = this.scanner.index;
	        var text = '';
	        while (!this.scanner.eof()) {
	            var ch = this.scanner.source[this.scanner.index];
	            if (ch === '{' || ch === '<') {
	                break;
	            }
	            ++this.scanner.index;
	            text += ch;
	            if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
	                ++this.scanner.lineNumber;
	                if (ch === '\r' && this.scanner.source[this.scanner.index] === '\n') {
	                    ++this.scanner.index;
	                }
	                this.scanner.lineStart = this.scanner.index;
	            }
	        }
	        this.lastMarker.index = this.scanner.index;
	        this.lastMarker.line = this.scanner.lineNumber;
	        this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
	        var token = {
	            type: 101 /* Text */,
	            value: text,
	            lineNumber: this.scanner.lineNumber,
	            lineStart: this.scanner.lineStart,
	            start: start,
	            end: this.scanner.index
	        };
	        if ((text.length > 0) && this.config.tokens) {
	            this.tokens.push(this.convertToken(token));
	        }
	        return token;
	    };
	    JSXParser.prototype.peekJSXToken = function () {
	        var state = this.scanner.saveState();
	        this.scanner.scanComments();
	        var next = this.lexJSX();
	        this.scanner.restoreState(state);
	        return next;
	    };
	    // Expect the next JSX token to match the specified punctuator.
	    // If not, an exception will be thrown.
	    JSXParser.prototype.expectJSX = function (value) {
	        var token = this.nextJSXToken();
	        if (token.type !== 7 /* Punctuator */ || token.value !== value) {
	            this.throwUnexpectedToken(token);
	        }
	    };
	    // Return true if the next JSX token matches the specified punctuator.
	    JSXParser.prototype.matchJSX = function (value) {
	        var next = this.peekJSXToken();
	        return next.type === 7 /* Punctuator */ && next.value === value;
	    };
	    JSXParser.prototype.parseJSXIdentifier = function () {
	        var node = this.createJSXNode();
	        var token = this.nextJSXToken();
	        if (token.type !== 100 /* Identifier */) {
	            this.throwUnexpectedToken(token);
	        }
	        return this.finalize(node, new JSXNode.JSXIdentifier(token.value));
	    };
	    JSXParser.prototype.parseJSXElementName = function () {
	        var node = this.createJSXNode();
	        var elementName = this.parseJSXIdentifier();
	        if (this.matchJSX(':')) {
	            var namespace = elementName;
	            this.expectJSX(':');
	            var name_1 = this.parseJSXIdentifier();
	            elementName = this.finalize(node, new JSXNode.JSXNamespacedName(namespace, name_1));
	        }
	        else if (this.matchJSX('.')) {
	            while (this.matchJSX('.')) {
	                var object = elementName;
	                this.expectJSX('.');
	                var property = this.parseJSXIdentifier();
	                elementName = this.finalize(node, new JSXNode.JSXMemberExpression(object, property));
	            }
	        }
	        return elementName;
	    };
	    JSXParser.prototype.parseJSXAttributeName = function () {
	        var node = this.createJSXNode();
	        var attributeName;
	        var identifier = this.parseJSXIdentifier();
	        if (this.matchJSX(':')) {
	            var namespace = identifier;
	            this.expectJSX(':');
	            var name_2 = this.parseJSXIdentifier();
	            attributeName = this.finalize(node, new JSXNode.JSXNamespacedName(namespace, name_2));
	        }
	        else {
	            attributeName = identifier;
	        }
	        return attributeName;
	    };
	    JSXParser.prototype.parseJSXStringLiteralAttribute = function () {
	        var node = this.createJSXNode();
	        var token = this.nextJSXToken();
	        if (token.type !== 8 /* StringLiteral */) {
	            this.throwUnexpectedToken(token);
	        }
	        var raw = this.getTokenRaw(token);
	        return this.finalize(node, new Node.Literal(token.value, raw));
	    };
	    JSXParser.prototype.parseJSXExpressionAttribute = function () {
	        var node = this.createJSXNode();
	        this.expectJSX('{');
	        this.finishJSX();
	        if (this.match('}')) {
	            this.tolerateError('JSX attributes must only be assigned a non-empty expression');
	        }
	        var expression = this.parseAssignmentExpression();
	        this.reenterJSX();
	        return this.finalize(node, new JSXNode.JSXExpressionContainer(expression));
	    };
	    JSXParser.prototype.parseJSXAttributeValue = function () {
	        return this.matchJSX('{') ? this.parseJSXExpressionAttribute() :
	            this.matchJSX('<') ? this.parseJSXElement() : this.parseJSXStringLiteralAttribute();
	    };
	    JSXParser.prototype.parseJSXNameValueAttribute = function () {
	        var node = this.createJSXNode();
	        var name = this.parseJSXAttributeName();
	        var value = null;
	        if (this.matchJSX('=')) {
	            this.expectJSX('=');
	            value = this.parseJSXAttributeValue();
	        }
	        return this.finalize(node, new JSXNode.JSXAttribute(name, value));
	    };
	    JSXParser.prototype.parseJSXSpreadAttribute = function () {
	        var node = this.createJSXNode();
	        this.expectJSX('{');
	        this.expectJSX('...');
	        this.finishJSX();
	        var argument = this.parseAssignmentExpression();
	        this.reenterJSX();
	        return this.finalize(node, new JSXNode.JSXSpreadAttribute(argument));
	    };
	    JSXParser.prototype.parseJSXAttributes = function () {
	        var attributes = [];
	        while (!this.matchJSX('/') && !this.matchJSX('>')) {
	            var attribute = this.matchJSX('{') ? this.parseJSXSpreadAttribute() :
	                this.parseJSXNameValueAttribute();
	            attributes.push(attribute);
	        }
	        return attributes;
	    };
	    JSXParser.prototype.parseJSXOpeningElement = function () {
	        var node = this.createJSXNode();
	        this.expectJSX('<');
	        var name = this.parseJSXElementName();
	        var attributes = this.parseJSXAttributes();
	        var selfClosing = this.matchJSX('/');
	        if (selfClosing) {
	            this.expectJSX('/');
	        }
	        this.expectJSX('>');
	        return this.finalize(node, new JSXNode.JSXOpeningElement(name, selfClosing, attributes));
	    };
	    JSXParser.prototype.parseJSXBoundaryElement = function () {
	        var node = this.createJSXNode();
	        this.expectJSX('<');
	        if (this.matchJSX('/')) {
	            this.expectJSX('/');
	            var name_3 = this.parseJSXElementName();
	            this.expectJSX('>');
	            return this.finalize(node, new JSXNode.JSXClosingElement(name_3));
	        }
	        var name = this.parseJSXElementName();
	        var attributes = this.parseJSXAttributes();
	        var selfClosing = this.matchJSX('/');
	        if (selfClosing) {
	            this.expectJSX('/');
	        }
	        this.expectJSX('>');
	        return this.finalize(node, new JSXNode.JSXOpeningElement(name, selfClosing, attributes));
	    };
	    JSXParser.prototype.parseJSXEmptyExpression = function () {
	        var node = this.createJSXChildNode();
	        this.collectComments();
	        this.lastMarker.index = this.scanner.index;
	        this.lastMarker.line = this.scanner.lineNumber;
	        this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
	        return this.finalize(node, new JSXNode.JSXEmptyExpression());
	    };
	    JSXParser.prototype.parseJSXExpressionContainer = function () {
	        var node = this.createJSXNode();
	        this.expectJSX('{');
	        var expression;
	        if (this.matchJSX('}')) {
	            expression = this.parseJSXEmptyExpression();
	            this.expectJSX('}');
	        }
	        else {
	            this.finishJSX();
	            expression = this.parseAssignmentExpression();
	            this.reenterJSX();
	        }
	        return this.finalize(node, new JSXNode.JSXExpressionContainer(expression));
	    };
	    JSXParser.prototype.parseJSXChildren = function () {
	        var children = [];
	        while (!this.scanner.eof()) {
	            var node = this.createJSXChildNode();
	            var token = this.nextJSXText();
	            if (token.start < token.end) {
	                var raw = this.getTokenRaw(token);
	                var child = this.finalize(node, new JSXNode.JSXText(token.value, raw));
	                children.push(child);
	            }
	            if (this.scanner.source[this.scanner.index] === '{') {
	                var container = this.parseJSXExpressionContainer();
	                children.push(container);
	            }
	            else {
	                break;
	            }
	        }
	        return children;
	    };
	    JSXParser.prototype.parseComplexJSXElement = function (el) {
	        var stack = [];
	        while (!this.scanner.eof()) {
	            el.children = el.children.concat(this.parseJSXChildren());
	            var node = this.createJSXChildNode();
	            var element = this.parseJSXBoundaryElement();
	            if (element.type === jsx_syntax_1.JSXSyntax.JSXOpeningElement) {
	                var opening = element;
	                if (opening.selfClosing) {
	                    var child = this.finalize(node, new JSXNode.JSXElement(opening, [], null));
	                    el.children.push(child);
	                }
	                else {
	                    stack.push(el);
	                    el = { node: node, opening: opening, closing: null, children: [] };
	                }
	            }
	            if (element.type === jsx_syntax_1.JSXSyntax.JSXClosingElement) {
	                el.closing = element;
	                var open_1 = getQualifiedElementName(el.opening.name);
	                var close_1 = getQualifiedElementName(el.closing.name);
	                if (open_1 !== close_1) {
	                    this.tolerateError('Expected corresponding JSX closing tag for %0', open_1);
	                }
	                if (stack.length > 0) {
	                    var child = this.finalize(el.node, new JSXNode.JSXElement(el.opening, el.children, el.closing));
	                    el = stack[stack.length - 1];
	                    el.children.push(child);
	                    stack.pop();
	                }
	                else {
	                    break;
	                }
	            }
	        }
	        return el;
	    };
	    JSXParser.prototype.parseJSXElement = function () {
	        var node = this.createJSXNode();
	        var opening = this.parseJSXOpeningElement();
	        var children = [];
	        var closing = null;
	        if (!opening.selfClosing) {
	            var el = this.parseComplexJSXElement({ node: node, opening: opening, closing: closing, children: children });
	            children = el.children;
	            closing = el.closing;
	        }
	        return this.finalize(node, new JSXNode.JSXElement(opening, children, closing));
	    };
	    JSXParser.prototype.parseJSXRoot = function () {
	        // Pop the opening '<' added from the lookahead.
	        if (this.config.tokens) {
	            this.tokens.pop();
	        }
	        this.startJSX();
	        var element = this.parseJSXElement();
	        this.finishJSX();
	        return element;
	    };
	    JSXParser.prototype.isStartOfExpression = function () {
	        return _super.prototype.isStartOfExpression.call(this) || this.match('<');
	    };
	    return JSXParser;
	}(parser_1.Parser));
	exports.JSXParser = JSXParser;


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	// See also tools/generate-unicode-regex.js.
	var Regex = {
	    // Unicode v8.0.0 NonAsciiIdentifierStart:
	    NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,
	    // Unicode v8.0.0 NonAsciiIdentifierPart:
	    NonAsciiIdentifierPart: /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
	};
	exports.Character = {
	    /* tslint:disable:no-bitwise */
	    fromCodePoint: function (cp) {
	        return (cp < 0x10000) ? String.fromCharCode(cp) :
	            String.fromCharCode(0xD800 + ((cp - 0x10000) >> 10)) +
	                String.fromCharCode(0xDC00 + ((cp - 0x10000) & 1023));
	    },
	    // https://tc39.github.io/ecma262/#sec-white-space
	    isWhiteSpace: function (cp) {
	        return (cp === 0x20) || (cp === 0x09) || (cp === 0x0B) || (cp === 0x0C) || (cp === 0xA0) ||
	            (cp >= 0x1680 && [0x1680, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A, 0x202F, 0x205F, 0x3000, 0xFEFF].indexOf(cp) >= 0);
	    },
	    // https://tc39.github.io/ecma262/#sec-line-terminators
	    isLineTerminator: function (cp) {
	        return (cp === 0x0A) || (cp === 0x0D) || (cp === 0x2028) || (cp === 0x2029);
	    },
	    // https://tc39.github.io/ecma262/#sec-names-and-keywords
	    isIdentifierStart: function (cp) {
	        return (cp === 0x24) || (cp === 0x5F) ||
	            (cp >= 0x41 && cp <= 0x5A) ||
	            (cp >= 0x61 && cp <= 0x7A) ||
	            (cp === 0x5C) ||
	            ((cp >= 0x80) && Regex.NonAsciiIdentifierStart.test(exports.Character.fromCodePoint(cp)));
	    },
	    isIdentifierPart: function (cp) {
	        return (cp === 0x24) || (cp === 0x5F) ||
	            (cp >= 0x41 && cp <= 0x5A) ||
	            (cp >= 0x61 && cp <= 0x7A) ||
	            (cp >= 0x30 && cp <= 0x39) ||
	            (cp === 0x5C) ||
	            ((cp >= 0x80) && Regex.NonAsciiIdentifierPart.test(exports.Character.fromCodePoint(cp)));
	    },
	    // https://tc39.github.io/ecma262/#sec-literals-numeric-literals
	    isDecimalDigit: function (cp) {
	        return (cp >= 0x30 && cp <= 0x39); // 0..9
	    },
	    isHexDigit: function (cp) {
	        return (cp >= 0x30 && cp <= 0x39) ||
	            (cp >= 0x41 && cp <= 0x46) ||
	            (cp >= 0x61 && cp <= 0x66); // a..f
	    },
	    isOctalDigit: function (cp) {
	        return (cp >= 0x30 && cp <= 0x37); // 0..7
	    }
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var jsx_syntax_1 = __webpack_require__(6);
	/* tslint:disable:max-classes-per-file */
	var JSXClosingElement = (function () {
	    function JSXClosingElement(name) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXClosingElement;
	        this.name = name;
	    }
	    return JSXClosingElement;
	}());
	exports.JSXClosingElement = JSXClosingElement;
	var JSXElement = (function () {
	    function JSXElement(openingElement, children, closingElement) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXElement;
	        this.openingElement = openingElement;
	        this.children = children;
	        this.closingElement = closingElement;
	    }
	    return JSXElement;
	}());
	exports.JSXElement = JSXElement;
	var JSXEmptyExpression = (function () {
	    function JSXEmptyExpression() {
	        this.type = jsx_syntax_1.JSXSyntax.JSXEmptyExpression;
	    }
	    return JSXEmptyExpression;
	}());
	exports.JSXEmptyExpression = JSXEmptyExpression;
	var JSXExpressionContainer = (function () {
	    function JSXExpressionContainer(expression) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXExpressionContainer;
	        this.expression = expression;
	    }
	    return JSXExpressionContainer;
	}());
	exports.JSXExpressionContainer = JSXExpressionContainer;
	var JSXIdentifier = (function () {
	    function JSXIdentifier(name) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXIdentifier;
	        this.name = name;
	    }
	    return JSXIdentifier;
	}());
	exports.JSXIdentifier = JSXIdentifier;
	var JSXMemberExpression = (function () {
	    function JSXMemberExpression(object, property) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXMemberExpression;
	        this.object = object;
	        this.property = property;
	    }
	    return JSXMemberExpression;
	}());
	exports.JSXMemberExpression = JSXMemberExpression;
	var JSXAttribute = (function () {
	    function JSXAttribute(name, value) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXAttribute;
	        this.name = name;
	        this.value = value;
	    }
	    return JSXAttribute;
	}());
	exports.JSXAttribute = JSXAttribute;
	var JSXNamespacedName = (function () {
	    function JSXNamespacedName(namespace, name) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXNamespacedName;
	        this.namespace = namespace;
	        this.name = name;
	    }
	    return JSXNamespacedName;
	}());
	exports.JSXNamespacedName = JSXNamespacedName;
	var JSXOpeningElement = (function () {
	    function JSXOpeningElement(name, selfClosing, attributes) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXOpeningElement;
	        this.name = name;
	        this.selfClosing = selfClosing;
	        this.attributes = attributes;
	    }
	    return JSXOpeningElement;
	}());
	exports.JSXOpeningElement = JSXOpeningElement;
	var JSXSpreadAttribute = (function () {
	    function JSXSpreadAttribute(argument) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXSpreadAttribute;
	        this.argument = argument;
	    }
	    return JSXSpreadAttribute;
	}());
	exports.JSXSpreadAttribute = JSXSpreadAttribute;
	var JSXText = (function () {
	    function JSXText(value, raw) {
	        this.type = jsx_syntax_1.JSXSyntax.JSXText;
	        this.value = value;
	        this.raw = raw;
	    }
	    return JSXText;
	}());
	exports.JSXText = JSXText;


/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.JSXSyntax = {
	    JSXAttribute: 'JSXAttribute',
	    JSXClosingElement: 'JSXClosingElement',
	    JSXElement: 'JSXElement',
	    JSXEmptyExpression: 'JSXEmptyExpression',
	    JSXExpressionContainer: 'JSXExpressionContainer',
	    JSXIdentifier: 'JSXIdentifier',
	    JSXMemberExpression: 'JSXMemberExpression',
	    JSXNamespacedName: 'JSXNamespacedName',
	    JSXOpeningElement: 'JSXOpeningElement',
	    JSXSpreadAttribute: 'JSXSpreadAttribute',
	    JSXText: 'JSXText'
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var syntax_1 = __webpack_require__(2);
	/* tslint:disable:max-classes-per-file */
	var ArrayExpression = (function () {
	    function ArrayExpression(elements) {
	        this.type = syntax_1.Syntax.ArrayExpression;
	        this.elements = elements;
	    }
	    return ArrayExpression;
	}());
	exports.ArrayExpression = ArrayExpression;
	var ArrayPattern = (function () {
	    function ArrayPattern(elements) {
	        this.type = syntax_1.Syntax.ArrayPattern;
	        this.elements = elements;
	    }
	    return ArrayPattern;
	}());
	exports.ArrayPattern = ArrayPattern;
	var ArrowFunctionExpression = (function () {
	    function ArrowFunctionExpression(params, body, expression) {
	        this.type = syntax_1.Syntax.ArrowFunctionExpression;
	        this.id = null;
	        this.params = params;
	        this.body = body;
	        this.generator = false;
	        this.expression = expression;
	        this.async = false;
	    }
	    return ArrowFunctionExpression;
	}());
	exports.ArrowFunctionExpression = ArrowFunctionExpression;
	var AssignmentExpression = (function () {
	    function AssignmentExpression(operator, left, right) {
	        this.type = syntax_1.Syntax.AssignmentExpression;
	        this.operator = operator;
	        this.left = left;
	        this.right = right;
	    }
	    return AssignmentExpression;
	}());
	exports.AssignmentExpression = AssignmentExpression;
	var AssignmentPattern = (function () {
	    function AssignmentPattern(left, right) {
	        this.type = syntax_1.Syntax.AssignmentPattern;
	        this.left = left;
	        this.right = right;
	    }
	    return AssignmentPattern;
	}());
	exports.AssignmentPattern = AssignmentPattern;
	var AsyncArrowFunctionExpression = (function () {
	    function AsyncArrowFunctionExpression(params, body, expression) {
	        this.type = syntax_1.Syntax.ArrowFunctionExpression;
	        this.id = null;
	        this.params = params;
	        this.body = body;
	        this.generator = false;
	        this.expression = expression;
	        this.async = true;
	    }
	    return AsyncArrowFunctionExpression;
	}());
	exports.AsyncArrowFunctionExpression = AsyncArrowFunctionExpression;
	var AsyncFunctionDeclaration = (function () {
	    function AsyncFunctionDeclaration(id, params, body) {
	        this.type = syntax_1.Syntax.FunctionDeclaration;
	        this.id = id;
	        this.params = params;
	        this.body = body;
	        this.generator = false;
	        this.expression = false;
	        this.async = true;
	    }
	    return AsyncFunctionDeclaration;
	}());
	exports.AsyncFunctionDeclaration = AsyncFunctionDeclaration;
	var AsyncFunctionExpression = (function () {
	    function AsyncFunctionExpression(id, params, body) {
	        this.type = syntax_1.Syntax.FunctionExpression;
	        this.id = id;
	        this.params = params;
	        this.body = body;
	        this.generator = false;
	        this.expression = false;
	        this.async = true;
	    }
	    return AsyncFunctionExpression;
	}());
	exports.AsyncFunctionExpression = AsyncFunctionExpression;
	var AwaitExpression = (function () {
	    function AwaitExpression(argument) {
	        this.type = syntax_1.Syntax.AwaitExpression;
	        this.argument = argument;
	    }
	    return AwaitExpression;
	}());
	exports.AwaitExpression = AwaitExpression;
	var BinaryExpression = (function () {
	    function BinaryExpression(operator, left, right) {
	        var logical = (operator === '||' || operator === '&&');
	        this.type = logical ? syntax_1.Syntax.LogicalExpression : syntax_1.Syntax.BinaryExpression;
	        this.operator = operator;
	        this.left = left;
	        this.right = right;
	    }
	    return BinaryExpression;
	}());
	exports.BinaryExpression = BinaryExpression;
	var BlockStatement = (function () {
	    function BlockStatement(body) {
	        this.type = syntax_1.Syntax.BlockStatement;
	        this.body = body;
	    }
	    return BlockStatement;
	}());
	exports.BlockStatement = BlockStatement;
	var BreakStatement = (function () {
	    function BreakStatement(label) {
	        this.type = syntax_1.Syntax.BreakStatement;
	        this.label = label;
	    }
	    return BreakStatement;
	}());
	exports.BreakStatement = BreakStatement;
	var CallExpression = (function () {
	    function CallExpression(callee, args) {
	        this.type = syntax_1.Syntax.CallExpression;
	        this.callee = callee;
	        this.arguments = args;
	    }
	    return CallExpression;
	}());
	exports.CallExpression = CallExpression;
	var CatchClause = (function () {
	    function CatchClause(param, body) {
	        this.type = syntax_1.Syntax.CatchClause;
	        this.param = param;
	        this.body = body;
	    }
	    return CatchClause;
	}());
	exports.CatchClause = CatchClause;
	var ClassBody = (function () {
	    function ClassBody(body) {
	        this.type = syntax_1.Syntax.ClassBody;
	        this.body = body;
	    }
	    return ClassBody;
	}());
	exports.ClassBody = ClassBody;
	var ClassDeclaration = (function () {
	    function ClassDeclaration(id, superClass, body) {
	        this.type = syntax_1.Syntax.ClassDeclaration;
	        this.id = id;
	        this.superClass = superClass;
	        this.body = body;
	    }
	    return ClassDeclaration;
	}());
	exports.ClassDeclaration = ClassDeclaration;
	var ClassExpression = (function () {
	    function ClassExpression(id, superClass, body) {
	        this.type = syntax_1.Syntax.ClassExpression;
	        this.id = id;
	        this.superClass = superClass;
	        this.body = body;
	    }
	    return ClassExpression;
	}());
	exports.ClassExpression = ClassExpression;
	var ComputedMemberExpression = (function () {
	    function ComputedMemberExpression(object, property) {
	        this.type = syntax_1.Syntax.MemberExpression;
	        this.computed = true;
	        this.object = object;
	        this.property = property;
	    }
	    return ComputedMemberExpression;
	}());
	exports.ComputedMemberExpression = ComputedMemberExpression;
	var ConditionalExpression = (function () {
	    function ConditionalExpression(test, consequent, alternate) {
	        this.type = syntax_1.Syntax.ConditionalExpression;
	        this.test = test;
	        this.consequent = consequent;
	        this.alternate = alternate;
	    }
	    return ConditionalExpression;
	}());
	exports.ConditionalExpression = ConditionalExpression;
	var ContinueStatement = (function () {
	    function ContinueStatement(label) {
	        this.type = syntax_1.Syntax.ContinueStatement;
	        this.label = label;
	    }
	    return ContinueStatement;
	}());
	exports.ContinueStatement = ContinueStatement;
	var DebuggerStatement = (function () {
	    function DebuggerStatement() {
	        this.type = syntax_1.Syntax.DebuggerStatement;
	    }
	    return DebuggerStatement;
	}());
	exports.DebuggerStatement = DebuggerStatement;
	var Directive = (function () {
	    function Directive(expression, directive) {
	        this.type = syntax_1.Syntax.ExpressionStatement;
	        this.expression = expression;
	        this.directive = directive;
	    }
	    return Directive;
	}());
	exports.Directive = Directive;
	var DoWhileStatement = (function () {
	    function DoWhileStatement(body, test) {
	        this.type = syntax_1.Syntax.DoWhileStatement;
	        this.body = body;
	        this.test = test;
	    }
	    return DoWhileStatement;
	}());
	exports.DoWhileStatement = DoWhileStatement;
	var EmptyStatement = (function () {
	    function EmptyStatement() {
	        this.type = syntax_1.Syntax.EmptyStatement;
	    }
	    return EmptyStatement;
	}());
	exports.EmptyStatement = EmptyStatement;
	var ExportAllDeclaration = (function () {
	    function ExportAllDeclaration(source) {
	        this.type = syntax_1.Syntax.ExportAllDeclaration;
	        this.source = source;
	    }
	    return ExportAllDeclaration;
	}());
	exports.ExportAllDeclaration = ExportAllDeclaration;
	var ExportDefaultDeclaration = (function () {
	    function ExportDefaultDeclaration(declaration) {
	        this.type = syntax_1.Syntax.ExportDefaultDeclaration;
	        this.declaration = declaration;
	    }
	    return ExportDefaultDeclaration;
	}());
	exports.ExportDefaultDeclaration = ExportDefaultDeclaration;
	var ExportNamedDeclaration = (function () {
	    function ExportNamedDeclaration(declaration, specifiers, source) {
	        this.type = syntax_1.Syntax.ExportNamedDeclaration;
	        this.declaration = declaration;
	        this.specifiers = specifiers;
	        this.source = source;
	    }
	    return ExportNamedDeclaration;
	}());
	exports.ExportNamedDeclaration = ExportNamedDeclaration;
	var ExportSpecifier = (function () {
	    function ExportSpecifier(local, exported) {
	        this.type = syntax_1.Syntax.ExportSpecifier;
	        this.exported = exported;
	        this.local = local;
	    }
	    return ExportSpecifier;
	}());
	exports.ExportSpecifier = ExportSpecifier;
	var ExpressionStatement = (function () {
	    function ExpressionStatement(expression) {
	        this.type = syntax_1.Syntax.ExpressionStatement;
	        this.expression = expression;
	    }
	    return ExpressionStatement;
	}());
	exports.ExpressionStatement = ExpressionStatement;
	var ForInStatement = (function () {
	    function ForInStatement(left, right, body) {
	        this.type = syntax_1.Syntax.ForInStatement;
	        this.left = left;
	        this.right = right;
	        this.body = body;
	        this.each = false;
	    }
	    return ForInStatement;
	}());
	exports.ForInStatement = ForInStatement;
	var ForOfStatement = (function () {
	    function ForOfStatement(left, right, body) {
	        this.type = syntax_1.Syntax.ForOfStatement;
	        this.left = left;
	        this.right = right;
	        this.body = body;
	    }
	    return ForOfStatement;
	}());
	exports.ForOfStatement = ForOfStatement;
	var ForStatement = (function () {
	    function ForStatement(init, test, update, body) {
	        this.type = syntax_1.Syntax.ForStatement;
	        this.init = init;
	        this.test = test;
	        this.update = update;
	        this.body = body;
	    }
	    return ForStatement;
	}());
	exports.ForStatement = ForStatement;
	var FunctionDeclaration = (function () {
	    function FunctionDeclaration(id, params, body, generator) {
	        this.type = syntax_1.Syntax.FunctionDeclaration;
	        this.id = id;
	        this.params = params;
	        this.body = body;
	        this.generator = generator;
	        this.expression = false;
	        this.async = false;
	    }
	    return FunctionDeclaration;
	}());
	exports.FunctionDeclaration = FunctionDeclaration;
	var FunctionExpression = (function () {
	    function FunctionExpression(id, params, body, generator) {
	        this.type = syntax_1.Syntax.FunctionExpression;
	        this.id = id;
	        this.params = params;
	        this.body = body;
	        this.generator = generator;
	        this.expression = false;
	        this.async = false;
	    }
	    return FunctionExpression;
	}());
	exports.FunctionExpression = FunctionExpression;
	var Identifier = (function () {
	    function Identifier(name) {
	        this.type = syntax_1.Syntax.Identifier;
	        this.name = name;
	    }
	    return Identifier;
	}());
	exports.Identifier = Identifier;
	var IfStatement = (function () {
	    function IfStatement(test, consequent, alternate) {
	        this.type = syntax_1.Syntax.IfStatement;
	        this.test = test;
	        this.consequent = consequent;
	        this.alternate = alternate;
	    }
	    return IfStatement;
	}());
	exports.IfStatement = IfStatement;
	var ImportDeclaration = (function () {
	    function ImportDeclaration(specifiers, source) {
	        this.type = syntax_1.Syntax.ImportDeclaration;
	        this.specifiers = specifiers;
	        this.source = source;
	    }
	    return ImportDeclaration;
	}());
	exports.ImportDeclaration = ImportDeclaration;
	var ImportDefaultSpecifier = (function () {
	    function ImportDefaultSpecifier(local) {
	        this.type = syntax_1.Syntax.ImportDefaultSpecifier;
	        this.local = local;
	    }
	    return ImportDefaultSpecifier;
	}());
	exports.ImportDefaultSpecifier = ImportDefaultSpecifier;
	var ImportNamespaceSpecifier = (function () {
	    function ImportNamespaceSpecifier(local) {
	        this.type = syntax_1.Syntax.ImportNamespaceSpecifier;
	        this.local = local;
	    }
	    return ImportNamespaceSpecifier;
	}());
	exports.ImportNamespaceSpecifier = ImportNamespaceSpecifier;
	var ImportSpecifier = (function () {
	    function ImportSpecifier(local, imported) {
	        this.type = syntax_1.Syntax.ImportSpecifier;
	        this.local = local;
	        this.imported = imported;
	    }
	    return ImportSpecifier;
	}());
	exports.ImportSpecifier = ImportSpecifier;
	var LabeledStatement = (function () {
	    function LabeledStatement(label, body) {
	        this.type = syntax_1.Syntax.LabeledStatement;
	        this.label = label;
	        this.body = body;
	    }
	    return LabeledStatement;
	}());
	exports.LabeledStatement = LabeledStatement;
	var Literal = (function () {
	    function Literal(value, raw) {
	        this.type = syntax_1.Syntax.Literal;
	        this.value = value;
	        this.raw = raw;
	    }
	    return Literal;
	}());
	exports.Literal = Literal;
	var MetaProperty = (function () {
	    function MetaProperty(meta, property) {
	        this.type = syntax_1.Syntax.MetaProperty;
	        this.meta = meta;
	        this.property = property;
	    }
	    return MetaProperty;
	}());
	exports.MetaProperty = MetaProperty;
	var MethodDefinition = (function () {
	    function MethodDefinition(key, computed, value, kind, isStatic) {
	        this.type = syntax_1.Syntax.MethodDefinition;
	        this.key = key;
	        this.computed = computed;
	        this.value = value;
	        this.kind = kind;
	        this.static = isStatic;
	    }
	    return MethodDefinition;
	}());
	exports.MethodDefinition = MethodDefinition;
	var Module = (function () {
	    function Module(body) {
	        this.type = syntax_1.Syntax.Program;
	        this.body = body;
	        this.sourceType = 'module';
	    }
	    return Module;
	}());
	exports.Module = Module;
	var NewExpression = (function () {
	    function NewExpression(callee, args) {
	        this.type = syntax_1.Syntax.NewExpression;
	        this.callee = callee;
	        this.arguments = args;
	    }
	    return NewExpression;
	}());
	exports.NewExpression = NewExpression;
	var ObjectExpression = (function () {
	    function ObjectExpression(properties) {
	        this.type = syntax_1.Syntax.ObjectExpression;
	        this.properties = properties;
	    }
	    return ObjectExpression;
	}());
	exports.ObjectExpression = ObjectExpression;
	var ObjectPattern = (function () {
	    function ObjectPattern(properties) {
	        this.type = syntax_1.Syntax.ObjectPattern;
	        this.properties = properties;
	    }
	    return ObjectPattern;
	}());
	exports.ObjectPattern = ObjectPattern;
	var Property = (function () {
	    function Property(kind, key, computed, value, method, shorthand) {
	        this.type = syntax_1.Syntax.Property;
	        this.key = key;
	        this.computed = computed;
	        this.value = value;
	        this.kind = kind;
	        this.method = method;
	        this.shorthand = shorthand;
	    }
	    return Property;
	}());
	exports.Property = Property;
	var RegexLiteral = (function () {
	    function RegexLiteral(value, raw, pattern, flags) {
	        this.type = syntax_1.Syntax.Literal;
	        this.value = value;
	        this.raw = raw;
	        this.regex = { pattern: pattern, flags: flags };
	    }
	    return RegexLiteral;
	}());
	exports.RegexLiteral = RegexLiteral;
	var RestElement = (function () {
	    function RestElement(argument) {
	        this.type = syntax_1.Syntax.RestElement;
	        this.argument = argument;
	    }
	    return RestElement;
	}());
	exports.RestElement = RestElement;
	var ReturnStatement = (function () {
	    function ReturnStatement(argument) {
	        this.type = syntax_1.Syntax.ReturnStatement;
	        this.argument = argument;
	    }
	    return ReturnStatement;
	}());
	exports.ReturnStatement = ReturnStatement;
	var Script = (function () {
	    function Script(body) {
	        this.type = syntax_1.Syntax.Program;
	        this.body = body;
	        this.sourceType = 'script';
	    }
	    return Script;
	}());
	exports.Script = Script;
	var SequenceExpression = (function () {
	    function SequenceExpression(expressions) {
	        this.type = syntax_1.Syntax.SequenceExpression;
	        this.expressions = expressions;
	    }
	    return SequenceExpression;
	}());
	exports.SequenceExpression = SequenceExpression;
	var SpreadElement = (function () {
	    function SpreadElement(argument) {
	        this.type = syntax_1.Syntax.SpreadElement;
	        this.argument = argument;
	    }
	    return SpreadElement;
	}());
	exports.SpreadElement = SpreadElement;
	var StaticMemberExpression = (function () {
	    function StaticMemberExpression(object, property) {
	        this.type = syntax_1.Syntax.MemberExpression;
	        this.computed = false;
	        this.object = object;
	        this.property = property;
	    }
	    return StaticMemberExpression;
	}());
	exports.StaticMemberExpression = StaticMemberExpression;
	var Super = (function () {
	    function Super() {
	        this.type = syntax_1.Syntax.Super;
	    }
	    return Super;
	}());
	exports.Super = Super;
	var SwitchCase = (function () {
	    function SwitchCase(test, consequent) {
	        this.type = syntax_1.Syntax.SwitchCase;
	        this.test = test;
	        this.consequent = consequent;
	    }
	    return SwitchCase;
	}());
	exports.SwitchCase = SwitchCase;
	var SwitchStatement = (function () {
	    function SwitchStatement(discriminant, cases) {
	        this.type = syntax_1.Syntax.SwitchStatement;
	        this.discriminant = discriminant;
	        this.cases = cases;
	    }
	    return SwitchStatement;
	}());
	exports.SwitchStatement = SwitchStatement;
	var TaggedTemplateExpression = (function () {
	    function TaggedTemplateExpression(tag, quasi) {
	        this.type = syntax_1.Syntax.TaggedTemplateExpression;
	        this.tag = tag;
	        this.quasi = quasi;
	    }
	    return TaggedTemplateExpression;
	}());
	exports.TaggedTemplateExpression = TaggedTemplateExpression;
	var TemplateElement = (function () {
	    function TemplateElement(value, tail) {
	        this.type = syntax_1.Syntax.TemplateElement;
	        this.value = value;
	        this.tail = tail;
	    }
	    return TemplateElement;
	}());
	exports.TemplateElement = TemplateElement;
	var TemplateLiteral = (function () {
	    function TemplateLiteral(quasis, expressions) {
	        this.type = syntax_1.Syntax.TemplateLiteral;
	        this.quasis = quasis;
	        this.expressions = expressions;
	    }
	    return TemplateLiteral;
	}());
	exports.TemplateLiteral = TemplateLiteral;
	var ThisExpression = (function () {
	    function ThisExpression() {
	        this.type = syntax_1.Syntax.ThisExpression;
	    }
	    return ThisExpression;
	}());
	exports.ThisExpression = ThisExpression;
	var ThrowStatement = (function () {
	    function ThrowStatement(argument) {
	        this.type = syntax_1.Syntax.ThrowStatement;
	        this.argument = argument;
	    }
	    return ThrowStatement;
	}());
	exports.ThrowStatement = ThrowStatement;
	var TryStatement = (function () {
	    function TryStatement(block, handler, finalizer) {
	        this.type = syntax_1.Syntax.TryStatement;
	        this.block = block;
	        this.handler = handler;
	        this.finalizer = finalizer;
	    }
	    return TryStatement;
	}());
	exports.TryStatement = TryStatement;
	var UnaryExpression = (function () {
	    function UnaryExpression(operator, argument) {
	        this.type = syntax_1.Syntax.UnaryExpression;
	        this.operator = operator;
	        this.argument = argument;
	        this.prefix = true;
	    }
	    return UnaryExpression;
	}());
	exports.UnaryExpression = UnaryExpression;
	var UpdateExpression = (function () {
	    function UpdateExpression(operator, argument, prefix) {
	        this.type = syntax_1.Syntax.UpdateExpression;
	        this.operator = operator;
	        this.argument = argument;
	        this.prefix = prefix;
	    }
	    return UpdateExpression;
	}());
	exports.UpdateExpression = UpdateExpression;
	var VariableDeclaration = (function () {
	    function VariableDeclaration(declarations, kind) {
	        this.type = syntax_1.Syntax.VariableDeclaration;
	        this.declarations = declarations;
	        this.kind = kind;
	    }
	    return VariableDeclaration;
	}());
	exports.VariableDeclaration = VariableDeclaration;
	var VariableDeclarator = (function () {
	    function VariableDeclarator(id, init) {
	        this.type = syntax_1.Syntax.VariableDeclarator;
	        this.id = id;
	        this.init = init;
	    }
	    return VariableDeclarator;
	}());
	exports.VariableDeclarator = VariableDeclarator;
	var WhileStatement = (function () {
	    function WhileStatement(test, body) {
	        this.type = syntax_1.Syntax.WhileStatement;
	        this.test = test;
	        this.body = body;
	    }
	    return WhileStatement;
	}());
	exports.WhileStatement = WhileStatement;
	var WithStatement = (function () {
	    function WithStatement(object, body) {
	        this.type = syntax_1.Syntax.WithStatement;
	        this.object = object;
	        this.body = body;
	    }
	    return WithStatement;
	}());
	exports.WithStatement = WithStatement;
	var YieldExpression = (function () {
	    function YieldExpression(argument, delegate) {
	        this.type = syntax_1.Syntax.YieldExpression;
	        this.argument = argument;
	        this.delegate = delegate;
	    }
	    return YieldExpression;
	}());
	exports.YieldExpression = YieldExpression;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var assert_1 = __webpack_require__(9);
	var error_handler_1 = __webpack_require__(10);
	var messages_1 = __webpack_require__(11);
	var Node = __webpack_require__(7);
	var scanner_1 = __webpack_require__(12);
	var syntax_1 = __webpack_require__(2);
	var token_1 = __webpack_require__(13);
	var ArrowParameterPlaceHolder = 'ArrowParameterPlaceHolder';
	var Parser = (function () {
	    function Parser(code, options, delegate) {
	        if (options === void 0) { options = {}; }
	        this.config = {
	            range: (typeof options.range === 'boolean') && options.range,
	            loc: (typeof options.loc === 'boolean') && options.loc,
	            source: null,
	            tokens: (typeof options.tokens === 'boolean') && options.tokens,
	            comment: (typeof options.comment === 'boolean') && options.comment,
	            tolerant: (typeof options.tolerant === 'boolean') && options.tolerant
	        };
	        if (this.config.loc && options.source && options.source !== null) {
	            this.config.source = String(options.source);
	        }
	        this.delegate = delegate;
	        this.errorHandler = new error_handler_1.ErrorHandler();
	        this.errorHandler.tolerant = this.config.tolerant;
	        this.scanner = new scanner_1.Scanner(code, this.errorHandler);
	        this.scanner.trackComment = this.config.comment;
	        this.operatorPrecedence = {
	            ')': 0,
	            ';': 0,
	            ',': 0,
	            '=': 0,
	            ']': 0,
	            '||': 1,
	            '&&': 2,
	            '|': 3,
	            '^': 4,
	            '&': 5,
	            '==': 6,
	            '!=': 6,
	            '===': 6,
	            '!==': 6,
	            '<': 7,
	            '>': 7,
	            '<=': 7,
	            '>=': 7,
	            '<<': 8,
	            '>>': 8,
	            '>>>': 8,
	            '+': 9,
	            '-': 9,
	            '*': 11,
	            '/': 11,
	            '%': 11
	        };
	        this.lookahead = {
	            type: 2 /* EOF */,
	            value: '',
	            lineNumber: this.scanner.lineNumber,
	            lineStart: 0,
	            start: 0,
	            end: 0
	        };
	        this.hasLineTerminator = false;
	        this.context = {
	            isModule: false,
	            await: false,
	            allowIn: true,
	            allowStrictDirective: true,
	            allowYield: true,
	            firstCoverInitializedNameError: null,
	            isAssignmentTarget: false,
	            isBindingElement: false,
	            inFunctionBody: false,
	            inIteration: false,
	            inSwitch: false,
	            labelSet: {},
	            strict: false
	        };
	        this.tokens = [];
	        this.startMarker = {
	            index: 0,
	            line: this.scanner.lineNumber,
	            column: 0
	        };
	        this.lastMarker = {
	            index: 0,
	            line: this.scanner.lineNumber,
	            column: 0
	        };
	        this.nextToken();
	        this.lastMarker = {
	            index: this.scanner.index,
	            line: this.scanner.lineNumber,
	            column: this.scanner.index - this.scanner.lineStart
	        };
	    }
	    Parser.prototype.throwError = function (messageFormat) {
	        var values = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            values[_i - 1] = arguments[_i];
	        }
	        var args = Array.prototype.slice.call(arguments, 1);
	        var msg = messageFormat.replace(/%(\d)/g, function (whole, idx) {
	            assert_1.assert(idx < args.length, 'Message reference must be in range');
	            return args[idx];
	        });
	        var index = this.lastMarker.index;
	        var line = this.lastMarker.line;
	        var column = this.lastMarker.column + 1;
	        throw this.errorHandler.createError(index, line, column, msg);
	    };
	    Parser.prototype.tolerateError = function (messageFormat) {
	        var values = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            values[_i - 1] = arguments[_i];
	        }
	        var args = Array.prototype.slice.call(arguments, 1);
	        var msg = messageFormat.replace(/%(\d)/g, function (whole, idx) {
	            assert_1.assert(idx < args.length, 'Message reference must be in range');
	            return args[idx];
	        });
	        var index = this.lastMarker.index;
	        var line = this.scanner.lineNumber;
	        var column = this.lastMarker.column + 1;
	        this.errorHandler.tolerateError(index, line, column, msg);
	    };
	    // Throw an exception because of the token.
	    Parser.prototype.unexpectedTokenError = function (token, message) {
	        var msg = message || messages_1.Messages.UnexpectedToken;
	        var value;
	        if (token) {
	            if (!message) {
	                msg = (token.type === 2 /* EOF */) ? messages_1.Messages.UnexpectedEOS :
	                    (token.type === 3 /* Identifier */) ? messages_1.Messages.UnexpectedIdentifier :
	                        (token.type === 6 /* NumericLiteral */) ? messages_1.Messages.UnexpectedNumber :
	                            (token.type === 8 /* StringLiteral */) ? messages_1.Messages.UnexpectedString :
	                                (token.type === 10 /* Template */) ? messages_1.Messages.UnexpectedTemplate :
	                                    messages_1.Messages.UnexpectedToken;
	                if (token.type === 4 /* Keyword */) {
	                    if (this.scanner.isFutureReservedWord(token.value)) {
	                        msg = messages_1.Messages.UnexpectedReserved;
	                    }
	                    else if (this.context.strict && this.scanner.isStrictModeReservedWord(token.value)) {
	                        msg = messages_1.Messages.StrictReservedWord;
	                    }
	                }
	            }
	            value = token.value;
	        }
	        else {
	            value = 'ILLEGAL';
	        }
	        msg = msg.replace('%0', value);
	        if (token && typeof token.lineNumber === 'number') {
	            var index = token.start;
	            var line = token.lineNumber;
	            var lastMarkerLineStart = this.lastMarker.index - this.lastMarker.column;
	            var column = token.start - lastMarkerLineStart + 1;
	            return this.errorHandler.createError(index, line, column, msg);
	        }
	        else {
	            var index = this.lastMarker.index;
	            var line = this.lastMarker.line;
	            var column = this.lastMarker.column + 1;
	            return this.errorHandler.createError(index, line, column, msg);
	        }
	    };
	    Parser.prototype.throwUnexpectedToken = function (token, message) {
	        throw this.unexpectedTokenError(token, message);
	    };
	    Parser.prototype.tolerateUnexpectedToken = function (token, message) {
	        this.errorHandler.tolerate(this.unexpectedTokenError(token, message));
	    };
	    Parser.prototype.collectComments = function () {
	        if (!this.config.comment) {
	            this.scanner.scanComments();
	        }
	        else {
	            var comments = this.scanner.scanComments();
	            if (comments.length > 0 && this.delegate) {
	                for (var i = 0; i < comments.length; ++i) {
	                    var e = comments[i];
	                    var node = void 0;
	                    node = {
	                        type: e.multiLine ? 'BlockComment' : 'LineComment',
	                        value: this.scanner.source.slice(e.slice[0], e.slice[1])
	                    };
	                    if (this.config.range) {
	                        node.range = e.range;
	                    }
	                    if (this.config.loc) {
	                        node.loc = e.loc;
	                    }
	                    var metadata = {
	                        start: {
	                            line: e.loc.start.line,
	                            column: e.loc.start.column,
	                            offset: e.range[0]
	                        },
	                        end: {
	                            line: e.loc.end.line,
	                            column: e.loc.end.column,
	                            offset: e.range[1]
	                        }
	                    };
	                    this.delegate(node, metadata);
	                }
	            }
	        }
	    };
	    // From internal representation to an external structure
	    Parser.prototype.getTokenRaw = function (token) {
	        return this.scanner.source.slice(token.start, token.end);
	    };
	    Parser.prototype.convertToken = function (token) {
	        var t = {
	            type: token_1.TokenName[token.type],
	            value: this.getTokenRaw(token)
	        };
	        if (this.config.range) {
	            t.range = [token.start, token.end];
	        }
	        if (this.config.loc) {
	            t.loc = {
	                start: {
	                    line: this.startMarker.line,
	                    column: this.startMarker.column
	                },
	                end: {
	                    line: this.scanner.lineNumber,
	                    column: this.scanner.index - this.scanner.lineStart
	                }
	            };
	        }
	        if (token.type === 9 /* RegularExpression */) {
	            var pattern = token.pattern;
	            var flags = token.flags;
	            t.regex = { pattern: pattern, flags: flags };
	        }
	        return t;
	    };
	    Parser.prototype.nextToken = function () {
	        var token = this.lookahead;
	        this.lastMarker.index = this.scanner.index;
	        this.lastMarker.line = this.scanner.lineNumber;
	        this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
	        this.collectComments();
	        if (this.scanner.index !== this.startMarker.index) {
	            this.startMarker.index = this.scanner.index;
	            this.startMarker.line = this.scanner.lineNumber;
	            this.startMarker.column = this.scanner.index - this.scanner.lineStart;
	        }
	        var next = this.scanner.lex();
	        this.hasLineTerminator = (token.lineNumber !== next.lineNumber);
	        if (next && this.context.strict && next.type === 3 /* Identifier */) {
	            if (this.scanner.isStrictModeReservedWord(next.value)) {
	                next.type = 4 /* Keyword */;
	            }
	        }
	        this.lookahead = next;
	        if (this.config.tokens && next.type !== 2 /* EOF */) {
	            this.tokens.push(this.convertToken(next));
	        }
	        return token;
	    };
	    Parser.prototype.nextRegexToken = function () {
	        this.collectComments();
	        var token = this.scanner.scanRegExp();
	        if (this.config.tokens) {
	            // Pop the previous token, '/' or '/='
	            // This is added from the lookahead token.
	            this.tokens.pop();
	            this.tokens.push(this.convertToken(token));
	        }
	        // Prime the next lookahead.
	        this.lookahead = token;
	        this.nextToken();
	        return token;
	    };
	    Parser.prototype.createNode = function () {
	        return {
	            index: this.startMarker.index,
	            line: this.startMarker.line,
	            column: this.startMarker.column
	        };
	    };
	    Parser.prototype.startNode = function (token) {
	        return {
	            index: token.start,
	            line: token.lineNumber,
	            column: token.start - token.lineStart
	        };
	    };
	    Parser.prototype.finalize = function (marker, node) {
	        if (this.config.range) {
	            node.range = [marker.index, this.lastMarker.index];
	        }
	        if (this.config.loc) {
	            node.loc = {
	                start: {
	                    line: marker.line,
	                    column: marker.column,
	                },
	                end: {
	                    line: this.lastMarker.line,
	                    column: this.lastMarker.column
	                }
	            };
	            if (this.config.source) {
	                node.loc.source = this.config.source;
	            }
	        }
	        if (this.delegate) {
	            var metadata = {
	                start: {
	                    line: marker.line,
	                    column: marker.column,
	                    offset: marker.index
	                },
	                end: {
	                    line: this.lastMarker.line,
	                    column: this.lastMarker.column,
	                    offset: this.lastMarker.index
	                }
	            };
	            this.delegate(node, metadata);
	        }
	        return node;
	    };
	    // Expect the next token to match the specified punctuator.
	    // If not, an exception will be thrown.
	    Parser.prototype.expect = function (value) {
	        var token = this.nextToken();
	        if (token.type !== 7 /* Punctuator */ || token.value !== value) {
	            this.throwUnexpectedToken(token);
	        }
	    };
	    // Quietly expect a comma when in tolerant mode, otherwise delegates to expect().
	    Parser.prototype.expectCommaSeparator = function () {
	        if (this.config.tolerant) {
	            var token = this.lookahead;
	            if (token.type === 7 /* Punctuator */ && token.value === ',') {
	                this.nextToken();
	            }
	            else if (token.type === 7 /* Punctuator */ && token.value === ';') {
	                this.nextToken();
	                this.tolerateUnexpectedToken(token);
	            }
	            else {
	                this.tolerateUnexpectedToken(token, messages_1.Messages.UnexpectedToken);
	            }
	        }
	        else {
	            this.expect(',');
	        }
	    };
	    // Expect the next token to match the specified keyword.
	    // If not, an exception will be thrown.
	    Parser.prototype.expectKeyword = function (keyword) {
	        var token = this.nextToken();
	        if (token.type !== 4 /* Keyword */ || token.value !== keyword) {
	            this.throwUnexpectedToken(token);
	        }
	    };
	    // Return true if the next token matches the specified punctuator.
	    Parser.prototype.match = function (value) {
	        return this.lookahead.type === 7 /* Punctuator */ && this.lookahead.value === value;
	    };
	    // Return true if the next token matches the specified keyword
	    Parser.prototype.matchKeyword = function (keyword) {
	        return this.lookahead.type === 4 /* Keyword */ && this.lookahead.value === keyword;
	    };
	    // Return true if the next token matches the specified contextual keyword
	    // (where an identifier is sometimes a keyword depending on the context)
	    Parser.prototype.matchContextualKeyword = function (keyword) {
	        return this.lookahead.type === 3 /* Identifier */ && this.lookahead.value === keyword;
	    };
	    // Return true if the next token is an assignment operator
	    Parser.prototype.matchAssign = function () {
	        if (this.lookahead.type !== 7 /* Punctuator */) {
	            return false;
	        }
	        var op = this.lookahead.value;
	        return op === '=' ||
	            op === '*=' ||
	            op === '**=' ||
	            op === '/=' ||
	            op === '%=' ||
	            op === '+=' ||
	            op === '-=' ||
	            op === '<<=' ||
	            op === '>>=' ||
	            op === '>>>=' ||
	            op === '&=' ||
	            op === '^=' ||
	            op === '|=';
	    };
	    // Cover grammar support.
	    //
	    // When an assignment expression position starts with an left parenthesis, the determination of the type
	    // of the syntax is to be deferred arbitrarily long until the end of the parentheses pair (plus a lookahead)
	    // or the first comma. This situation also defers the determination of all the expressions nested in the pair.
	    //
	    // There are three productions that can be parsed in a parentheses pair that needs to be determined
	    // after the outermost pair is closed. They are:
	    //
	    //   1. AssignmentExpression
	    //   2. BindingElements
	    //   3. AssignmentTargets
	    //
	    // In order to avoid exponential backtracking, we use two flags to denote if the production can be
	    // binding element or assignment target.
	    //
	    // The three productions have the relationship:
	    //
	    //   BindingElements ⊆ AssignmentTargets ⊆ AssignmentExpression
	    //
	    // with a single exception that CoverInitializedName when used directly in an Expression, generates
	    // an early error. Therefore, we need the third state, firstCoverInitializedNameError, to track the
	    // first usage of CoverInitializedName and report it when we reached the end of the parentheses pair.
	    //
	    // isolateCoverGrammar function runs the given parser function with a new cover grammar context, and it does not
	    // effect the current flags. This means the production the parser parses is only used as an expression. Therefore
	    // the CoverInitializedName check is conducted.
	    //
	    // inheritCoverGrammar function runs the given parse function with a new cover grammar context, and it propagates
	    // the flags outside of the parser. This means the production the parser parses is used as a part of a potential
	    // pattern. The CoverInitializedName check is deferred.
	    Parser.prototype.isolateCoverGrammar = function (parseFunction) {
	        var previousIsBindingElement = this.context.isBindingElement;
	        var previousIsAssignmentTarget = this.context.isAssignmentTarget;
	        var previousFirstCoverInitializedNameError = this.context.firstCoverInitializedNameError;
	        this.context.isBindingElement = true;
	        this.context.isAssignmentTarget = true;
	        this.context.firstCoverInitializedNameError = null;
	        var result = parseFunction.call(this);
	        if (this.context.firstCoverInitializedNameError !== null) {
	            this.throwUnexpectedToken(this.context.firstCoverInitializedNameError);
	        }
	        this.context.isBindingElement = previousIsBindingElement;
	        this.context.isAssignmentTarget = previousIsAssignmentTarget;
	        this.context.firstCoverInitializedNameError = previousFirstCoverInitializedNameError;
	        return result;
	    };
	    Parser.prototype.inheritCoverGrammar = function (parseFunction) {
	        var previousIsBindingElement = this.context.isBindingElement;
	        var previousIsAssignmentTarget = this.context.isAssignmentTarget;
	        var previousFirstCoverInitializedNameError = this.context.firstCoverInitializedNameError;
	        this.context.isBindingElement = true;
	        this.context.isAssignmentTarget = true;
	        this.context.firstCoverInitializedNameError = null;
	        var result = parseFunction.call(this);
	        this.context.isBindingElement = this.context.isBindingElement && previousIsBindingElement;
	        this.context.isAssignmentTarget = this.context.isAssignmentTarget && previousIsAssignmentTarget;
	        this.context.firstCoverInitializedNameError = previousFirstCoverInitializedNameError || this.context.firstCoverInitializedNameError;
	        return result;
	    };
	    Parser.prototype.consumeSemicolon = function () {
	        if (this.match(';')) {
	            this.nextToken();
	        }
	        else if (!this.hasLineTerminator) {
	            if (this.lookahead.type !== 2 /* EOF */ && !this.match('}')) {
	                this.throwUnexpectedToken(this.lookahead);
	            }
	            this.lastMarker.index = this.startMarker.index;
	            this.lastMarker.line = this.startMarker.line;
	            this.lastMarker.column = this.startMarker.column;
	        }
	    };
	    // https://tc39.github.io/ecma262/#sec-primary-expression
	    Parser.prototype.parsePrimaryExpression = function () {
	        var node = this.createNode();
	        var expr;
	        var token, raw;
	        switch (this.lookahead.type) {
	            case 3 /* Identifier */:
	                if ((this.context.isModule || this.context.await) && this.lookahead.value === 'await') {
	                    this.tolerateUnexpectedToken(this.lookahead);
	                }
	                expr = this.matchAsyncFunction() ? this.parseFunctionExpression() : this.finalize(node, new Node.Identifier(this.nextToken().value));
	                break;
	            case 6 /* NumericLiteral */:
	            case 8 /* StringLiteral */:
	                if (this.context.strict && this.lookahead.octal) {
	                    this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.StrictOctalLiteral);
	                }
	                this.context.isAssignmentTarget = false;
	                this.context.isBindingElement = false;
	                token = this.nextToken();
	                raw = this.getTokenRaw(token);
	                expr = this.finalize(node, new Node.Literal(token.value, raw));
	                break;
	            case 1 /* BooleanLiteral */:
	                this.context.isAssignmentTarget = false;
	                this.context.isBindingElement = false;
	                token = this.nextToken();
	                raw = this.getTokenRaw(token);
	                expr = this.finalize(node, new Node.Literal(token.value === 'true', raw));
	                break;
	            case 5 /* NullLiteral */:
	                this.context.isAssignmentTarget = false;
	                this.context.isBindingElement = false;
	                token = this.nextToken();
	                raw = this.getTokenRaw(token);
	                expr = this.finalize(node, new Node.Literal(null, raw));
	                break;
	            case 10 /* Template */:
	                expr = this.parseTemplateLiteral();
	                break;
	            case 7 /* Punctuator */:
	                switch (this.lookahead.value) {
	                    case '(':
	                        this.context.isBindingElement = false;
	                        expr = this.inheritCoverGrammar(this.parseGroupExpression);
	                        break;
	                    case '[':
	                        expr = this.inheritCoverGrammar(this.parseArrayInitializer);
	                        break;
	                    case '{':
	                        expr = this.inheritCoverGrammar(this.parseObjectInitializer);
	                        break;
	                    case '/':
	                    case '/=':
	                        this.context.isAssignmentTarget = false;
	                        this.context.isBindingElement = false;
	                        this.scanner.index = this.startMarker.index;
	                        token = this.nextRegexToken();
	                        raw = this.getTokenRaw(token);
	                        expr = this.finalize(node, new Node.RegexLiteral(token.regex, raw, token.pattern, token.flags));
	                        break;
	                    default:
	                        expr = this.throwUnexpectedToken(this.nextToken());
	                }
	                break;
	            case 4 /* Keyword */:
	                if (!this.context.strict && this.context.allowYield && this.matchKeyword('yield')) {
	                    expr = this.parseIdentifierName();
	                }
	                else if (!this.context.strict && this.matchKeyword('let')) {
	                    expr = this.finalize(node, new Node.Identifier(this.nextToken().value));
	                }
	                else {
	                    this.context.isAssignmentTarget = false;
	                    this.context.isBindingElement = false;
	                    if (this.matchKeyword('function')) {
	                        expr = this.parseFunctionExpression();
	                    }
	                    else if (this.matchKeyword('this')) {
	                        this.nextToken();
	                        expr = this.finalize(node, new Node.ThisExpression());
	                    }
	                    else if (this.matchKeyword('class')) {
	                        expr = this.parseClassExpression();
	                    }
	                    else {
	                        expr = this.throwUnexpectedToken(this.nextToken());
	                    }
	                }
	                break;
	            default:
	                expr = this.throwUnexpectedToken(this.nextToken());
	        }
	        return expr;
	    };
	    // https://tc39.github.io/ecma262/#sec-array-initializer
	    Parser.prototype.parseSpreadElement = function () {
	        var node = this.createNode();
	        this.expect('...');
	        var arg = this.inheritCoverGrammar(this.parseAssignmentExpression);
	        return this.finalize(node, new Node.SpreadElement(arg));
	    };
	    Parser.prototype.parseArrayInitializer = function () {
	        var node = this.createNode();
	        var elements = [];
	        this.expect('[');
	        while (!this.match(']')) {
	            if (this.match(',')) {
	                this.nextToken();
	                elements.push(null);
	            }
	            else if (this.match('...')) {
	                var element = this.parseSpreadElement();
	                if (!this.match(']')) {
	                    this.context.isAssignmentTarget = false;
	                    this.context.isBindingElement = false;
	                    this.expect(',');
	                }
	                elements.push(element);
	            }
	            else {
	                elements.push(this.inheritCoverGrammar(this.parseAssignmentExpression));
	                if (!this.match(']')) {
	                    this.expect(',');
	                }
	            }
	        }
	        this.expect(']');
	        return this.finalize(node, new Node.ArrayExpression(elements));
	    };
	    // https://tc39.github.io/ecma262/#sec-object-initializer
	    Parser.prototype.parsePropertyMethod = function (params) {
	        this.context.isAssignmentTarget = false;
	        this.context.isBindingElement = false;
	        var previousStrict = this.context.strict;
	        var previousAllowStrictDirective = this.context.allowStrictDirective;
	        this.context.allowStrictDirective = params.simple;
	        var body = this.isolateCoverGrammar(this.parseFunctionSourceElements);
	        if (this.context.strict && params.firstRestricted) {
	            this.tolerateUnexpectedToken(params.firstRestricted, params.message);
	        }
	        if (this.context.strict && params.stricted) {
	            this.tolerateUnexpectedToken(params.stricted, params.message);
	        }
	        this.context.strict = previousStrict;
	        this.context.allowStrictDirective = previousAllowStrictDirective;
	        return body;
	    };
	    Parser.prototype.parsePropertyMethodFunction = function () {
	        var isGenerator = false;
	        var node = this.createNode();
	        var previousAllowYield = this.context.allowYield;
	        this.context.allowYield = false;
	        var params = this.parseFormalParameters();
	        var method = this.parsePropertyMethod(params);
	        this.context.allowYield = previousAllowYield;
	        return this.finalize(node, new Node.FunctionExpression(null, params.params, method, isGenerator));
	    };
	    Parser.prototype.parsePropertyMethodAsyncFunction = function () {
	        var node = this.createNode();
	        var previousAllowYield = this.context.allowYield;
	        var previousAwait = this.context.await;
	        this.context.allowYield = false;
	        this.context.await = true;
	        var params = this.parseFormalParameters();
	        var method = this.parsePropertyMethod(params);
	        this.context.allowYield = previousAllowYield;
	        this.context.await = previousAwait;
	        return this.finalize(node, new Node.AsyncFunctionExpression(null, params.params, method));
	    };
	    Parser.prototype.parseObjectPropertyKey = function () {
	        var node = this.createNode();
	        var token = this.nextToken();
	        var key;
	        switch (token.type) {
	            case 8 /* StringLiteral */:
	            case 6 /* NumericLiteral */:
	                if (this.context.strict && token.octal) {
	                    this.tolerateUnexpectedToken(token, messages_1.Messages.StrictOctalLiteral);
	                }
	                var raw = this.getTokenRaw(token);
	                key = this.finalize(node, new Node.Literal(token.value, raw));
	                break;
	            case 3 /* Identifier */:
	            case 1 /* BooleanLiteral */:
	            case 5 /* NullLiteral */:
	            case 4 /* Keyword */:
	                key = this.finalize(node, new Node.Identifier(token.value));
	                break;
	            case 7 /* Punctuator */:
	                if (token.value === '[') {
	                    key = this.isolateCoverGrammar(this.parseAssignmentExpression);
	                    this.expect(']');
	                }
	                else {
	                    key = this.throwUnexpectedToken(token);
	                }
	                break;
	            default:
	                key = this.throwUnexpectedToken(token);
	        }
	        return key;
	    };
	    Parser.prototype.isPropertyKey = function (key, value) {
	        return (key.type === syntax_1.Syntax.Identifier && key.name === value) ||
	            (key.type === syntax_1.Syntax.Literal && key.value === value);
	    };
	    Parser.prototype.parseObjectProperty = function (hasProto) {
	        var node = this.createNode();
	        var token = this.lookahead;
	        var kind;
	        var key = null;
	        var value = null;
	        var computed = false;
	        var method = false;
	        var shorthand = false;
	        var isAsync = false;
	        if (token.type === 3 /* Identifier */) {
	            var id = token.value;
	            this.nextToken();
	            computed = this.match('[');
	            isAsync = !this.hasLineTerminator && (id === 'async') &&
	                !this.match(':') && !this.match('(') && !this.match('*');
	            key = isAsync ? this.parseObjectPropertyKey() : this.finalize(node, new Node.Identifier(id));
	        }
	        else if (this.match('*')) {
	            this.nextToken();
	        }
	        else {
	            computed = this.match('[');
	            key = this.parseObjectPropertyKey();
	        }
	        var lookaheadPropertyKey = this.qualifiedPropertyName(this.lookahead);
	        if (token.type === 3 /* Identifier */ && !isAsync && token.value === 'get' && lookaheadPropertyKey) {
	            kind = 'get';
	            computed = this.match('[');
	            key = this.parseObjectPropertyKey();
	            this.context.allowYield = false;
	            value = this.parseGetterMethod();
	        }
	        else if (token.type === 3 /* Identifier */ && !isAsync && token.value === 'set' && lookaheadPropertyKey) {
	            kind = 'set';
	            computed = this.match('[');
	            key = this.parseObjectPropertyKey();
	            value = this.parseSetterMethod();
	        }
	        else if (token.type === 7 /* Punctuator */ && token.value === '*' && lookaheadPropertyKey) {
	            kind = 'init';
	            computed = this.match('[');
	            key = this.parseObjectPropertyKey();
	            value = this.parseGeneratorMethod();
	            method = true;
	        }
	        else {
	            if (!key) {
	                this.throwUnexpectedToken(this.lookahead);
	            }
	            kind = 'init';
	            if (this.match(':') && !isAsync) {
	                if (!computed && this.isPropertyKey(key, '__proto__')) {
	                    if (hasProto.value) {
	                        this.tolerateError(messages_1.Messages.DuplicateProtoProperty);
	                    }
	                    hasProto.value = true;
	                }
	                this.nextToken();
	                value = this.inheritCoverGrammar(this.parseAssignmentExpression);
	            }
	            else if (this.match('(')) {
	                value = isAsync ? this.parsePropertyMethodAsyncFunction() : this.parsePropertyMethodFunction();
	                method = true;
	            }
	            else if (token.type === 3 /* Identifier */) {
	                var id = this.finalize(node, new Node.Identifier(token.value));
	                if (this.match('=')) {
	                    this.context.firstCoverInitializedNameError = this.lookahead;
	                    this.nextToken();
	                    shorthand = true;
	                    var init = this.isolateCoverGrammar(this.parseAssignmentExpression);
	                    value = this.finalize(node, new Node.AssignmentPattern(id, init));
	                }
	                else {
	                    shorthand = true;
	                    value = id;
	                }
	            }
	            else {
	                this.throwUnexpectedToken(this.nextToken());
	            }
	        }
	        return this.finalize(node, new Node.Property(kind, key, computed, value, method, shorthand));
	    };
	    Parser.prototype.parseObjectInitializer = function () {
	        var node = this.createNode();
	        this.expect('{');
	        var properties = [];
	        var hasProto = { value: false };
	        while (!this.match('}')) {
	            properties.push(this.parseObjectProperty(hasProto));
	            if (!this.match('}')) {
	                this.expectCommaSeparator();
	            }
	        }
	        this.expect('}');
	        return this.finalize(node, new Node.ObjectExpression(properties));
	    };
	    // https://tc39.github.io/ecma262/#sec-template-literals
	    Parser.prototype.parseTemplateHead = function () {
	        assert_1.assert(this.lookahead.head, 'Template literal must start with a template head');
	        var node = this.createNode();
	        var token = this.nextToken();
	        var raw = token.value;
	        var cooked = token.cooked;
	        return this.finalize(node, new Node.TemplateElement({ raw: raw, cooked: cooked }, token.tail));
	    };
	    Parser.prototype.parseTemplateElement = function () {
	        if (this.lookahead.type !== 10 /* Template */) {
	            this.throwUnexpectedToken();
	        }
	        var node = this.createNode();
	        var token = this.nextToken();
	        var raw = token.value;
	        var cooked = token.cooked;
	        return this.finalize(node, new Node.TemplateElement({ raw: raw, cooked: cooked }, token.tail));
	    };
	    Parser.prototype.parseTemplateLiteral = function () {
	        var node = this.createNode();
	        var expressions = [];
	        var quasis = [];
	        var quasi = this.parseTemplateHead();
	        quasis.push(quasi);
	        while (!quasi.tail) {
	            expressions.push(this.parseExpression());
	            quasi = this.parseTemplateElement();
	            quasis.push(quasi);
	        }
	        return this.finalize(node, new Node.TemplateLiteral(quasis, expressions));
	    };
	    // https://tc39.github.io/ecma262/#sec-grouping-operator
	    Parser.prototype.reinterpretExpressionAsPattern = function (expr) {
	        switch (expr.type) {
	            case syntax_1.Syntax.Identifier:
	            case syntax_1.Syntax.MemberExpression:
	            case syntax_1.Syntax.RestElement:
	            case syntax_1.Syntax.AssignmentPattern:
	                break;
	            case syntax_1.Syntax.SpreadElement:
	                expr.type = syntax_1.Syntax.RestElement;
	                this.reinterpretExpressionAsPattern(expr.argument);
	                break;
	            case syntax_1.Syntax.ArrayExpression:
	                expr.type = syntax_1.Syntax.ArrayPattern;
	                for (var i = 0; i < expr.elements.length; i++) {
	                    if (expr.elements[i] !== null) {
	                        this.reinterpretExpressionAsPattern(expr.elements[i]);
	                    }
	                }
	                break;
	            case syntax_1.Syntax.ObjectExpression:
	                expr.type = syntax_1.Syntax.ObjectPattern;
	                for (var i = 0; i < expr.properties.length; i++) {
	                    this.reinterpretExpressionAsPattern(expr.properties[i].value);
	                }
	                break;
	            case syntax_1.Syntax.AssignmentExpression:
	                expr.type = syntax_1.Syntax.AssignmentPattern;
	                delete expr.operator;
	                this.reinterpretExpressionAsPattern(expr.left);
	                break;
	            default:
	                // Allow other node type for tolerant parsing.
	                break;
	        }
	    };
	    Parser.prototype.parseGroupExpression = function () {
	        var expr;
	        this.expect('(');
	        if (this.match(')')) {
	            this.nextToken();
	            if (!this.match('=>')) {
	                this.expect('=>');
	            }
	            expr = {
	                type: ArrowParameterPlaceHolder,
	                params: [],
	                async: false
	            };
	        }
	        else {
	            var startToken = this.lookahead;
	            var params = [];
	            if (this.match('...')) {
	                expr = this.parseRestElement(params);
	                this.expect(')');
	                if (!this.match('=>')) {
	                    this.expect('=>');
	                }
	                expr = {
	                    type: ArrowParameterPlaceHolder,
	                    params: [expr],
	                    async: false
	                };
	            }
	            else {
	                var arrow = false;
	                this.context.isBindingElement = true;
	                expr = this.inheritCoverGrammar(this.parseAssignmentExpression);
	                if (this.match(',')) {
	                    var expressions = [];
	                    this.context.isAssignmentTarget = false;
	                    expressions.push(expr);
	                    while (this.lookahead.type !== 2 /* EOF */) {
	                        if (!this.match(',')) {
	                            break;
	                        }
	                        this.nextToken();
	                        if (this.match(')')) {
	                            this.nextToken();
	                            for (var i = 0; i < expressions.length; i++) {
	                                this.reinterpretExpressionAsPattern(expressions[i]);
	                            }
	                            arrow = true;
	                            expr = {
	                                type: ArrowParameterPlaceHolder,
	                                params: expressions,
	                                async: false
	                            };
	                        }
	                        else if (this.match('...')) {
	                            if (!this.context.isBindingElement) {
	                                this.throwUnexpectedToken(this.lookahead);
	                            }
	                            expressions.push(this.parseRestElement(params));
	                            this.expect(')');
	                            if (!this.match('=>')) {
	                                this.expect('=>');
	                            }
	                            this.context.isBindingElement = false;
	                            for (var i = 0; i < expressions.length; i++) {
	                                this.reinterpretExpressionAsPattern(expressions[i]);
	                            }
	                            arrow = true;
	                            expr = {
	                                type: ArrowParameterPlaceHolder,
	                                params: expressions,
	                                async: false
	                            };
	                        }
	                        else {
	                            expressions.push(this.inheritCoverGrammar(this.parseAssignmentExpression));
	                        }
	                        if (arrow) {
	                            break;
	                        }
	                    }
	                    if (!arrow) {
	                        expr = this.finalize(this.startNode(startToken), new Node.SequenceExpression(expressions));
	                    }
	                }
	                if (!arrow) {
	                    this.expect(')');
	                    if (this.match('=>')) {
	                        if (expr.type === syntax_1.Syntax.Identifier && expr.name === 'yield') {
	                            arrow = true;
	                            expr = {
	                                type: ArrowParameterPlaceHolder,
	                                params: [expr],
	                                async: false
	                            };
	                        }
	                        if (!arrow) {
	                            if (!this.context.isBindingElement) {
	                                this.throwUnexpectedToken(this.lookahead);
	                            }
	                            if (expr.type === syntax_1.Syntax.SequenceExpression) {
	                                for (var i = 0; i < expr.expressions.length; i++) {
	                                    this.reinterpretExpressionAsPattern(expr.expressions[i]);
	                                }
	                            }
	                            else {
	                                this.reinterpretExpressionAsPattern(expr);
	                            }
	                            var parameters = (expr.type === syntax_1.Syntax.SequenceExpression ? expr.expressions : [expr]);
	                            expr = {
	                                type: ArrowParameterPlaceHolder,
	                                params: parameters,
	                                async: false
	                            };
	                        }
	                    }
	                    this.context.isBindingElement = false;
	                }
	            }
	        }
	        return expr;
	    };
	    // https://tc39.github.io/ecma262/#sec-left-hand-side-expressions
	    Parser.prototype.parseArguments = function () {
	        this.expect('(');
	        var args = [];
	        if (!this.match(')')) {
	            while (true) {
	                var expr = this.match('...') ? this.parseSpreadElement() :
	                    this.isolateCoverGrammar(this.parseAssignmentExpression);
	                args.push(expr);
	                if (this.match(')')) {
	                    break;
	                }
	                this.expectCommaSeparator();
	                if (this.match(')')) {
	                    break;
	                }
	            }
	        }
	        this.expect(')');
	        return args;
	    };
	    Parser.prototype.isIdentifierName = function (token) {
	        return token.type === 3 /* Identifier */ ||
	            token.type === 4 /* Keyword */ ||
	            token.type === 1 /* BooleanLiteral */ ||
	            token.type === 5 /* NullLiteral */;
	    };
	    Parser.prototype.parseIdentifierName = function () {
	        var node = this.createNode();
	        var token = this.nextToken();
	        if (!this.isIdentifierName(token)) {
	            this.throwUnexpectedToken(token);
	        }
	        return this.finalize(node, new Node.Identifier(token.value));
	    };
	    Parser.prototype.parseNewExpression = function () {
	        var node = this.createNode();
	        var id = this.parseIdentifierName();
	        assert_1.assert(id.name === 'new', 'New expression must start with `new`');
	        var expr;
	        if (this.match('.')) {
	            this.nextToken();
	            if (this.lookahead.type === 3 /* Identifier */ && this.context.inFunctionBody && this.lookahead.value === 'target') {
	                var property = this.parseIdentifierName();
	                expr = new Node.MetaProperty(id, property);
	            }
	            else {
	                this.throwUnexpectedToken(this.lookahead);
	            }
	        }
	        else {
	            var callee = this.isolateCoverGrammar(this.parseLeftHandSideExpression);
	            var args = this.match('(') ? this.parseArguments() : [];
	            expr = new Node.NewExpression(callee, args);
	            this.context.isAssignmentTarget = false;
	            this.context.isBindingElement = false;
	        }
	        return this.finalize(node, expr);
	    };
	    Parser.prototype.parseAsyncArgument = function () {
	        var arg = this.parseAssignmentExpression();
	        this.context.firstCoverInitializedNameError = null;
	        return arg;
	    };
	    Parser.prototype.parseAsyncArguments = function () {
	        this.expect('(');
	        var args = [];
	        if (!this.match(')')) {
	            while (true) {
	                var expr = this.match('...') ? this.parseSpreadElement() :
	                    this.isolateCoverGrammar(this.parseAsyncArgument);
	                args.push(expr);
	                if (this.match(')')) {
	                    break;
	                }
	                this.expectCommaSeparator();
	                if (this.match(')')) {
	                    break;
	                }
	            }
	        }
	        this.expect(')');
	        return args;
	    };
	    Parser.prototype.parseLeftHandSideExpressionAllowCall = function () {
	        var startToken = this.lookahead;
	        var maybeAsync = this.matchContextualKeyword('async');
	        var previousAllowIn = this.context.allowIn;
	        this.context.allowIn = true;
	        var expr;
	        if (this.matchKeyword('super') && this.context.inFunctionBody) {
	            expr = this.createNode();
	            this.nextToken();
	            expr = this.finalize(expr, new Node.Super());
	            if (!this.match('(') && !this.match('.') && !this.match('[')) {
	                this.throwUnexpectedToken(this.lookahead);
	            }
	        }
	        else {
	            expr = this.inheritCoverGrammar(this.matchKeyword('new') ? this.parseNewExpression : this.parsePrimaryExpression);
	        }
	        while (true) {
	            if (this.match('.')) {
	                this.context.isBindingElement = false;
	                this.context.isAssignmentTarget = true;
	                this.expect('.');
	                var property = this.parseIdentifierName();
	                expr = this.finalize(this.startNode(startToken), new Node.StaticMemberExpression(expr, property));
	            }
	            else if (this.match('(')) {
	                var asyncArrow = maybeAsync && (startToken.lineNumber === this.lookahead.lineNumber);
	                this.context.isBindingElement = false;
	                this.context.isAssignmentTarget = false;
	                var args = asyncArrow ? this.parseAsyncArguments() : this.parseArguments();
	                expr = this.finalize(this.startNode(startToken), new Node.CallExpression(expr, args));
	                if (asyncArrow && this.match('=>')) {
	                    for (var i = 0; i < args.length; ++i) {
	                        this.reinterpretExpressionAsPattern(args[i]);
	                    }
	                    expr = {
	                        type: ArrowParameterPlaceHolder,
	                        params: args,
	                        async: true
	                    };
	                }
	            }
	            else if (this.match('[')) {
	                this.context.isBindingElement = false;
	                this.context.isAssignmentTarget = true;
	                this.expect('[');
	                var property = this.isolateCoverGrammar(this.parseExpression);
	                this.expect(']');
	                expr = this.finalize(this.startNode(startToken), new Node.ComputedMemberExpression(expr, property));
	            }
	            else if (this.lookahead.type === 10 /* Template */ && this.lookahead.head) {
	                var quasi = this.parseTemplateLiteral();
	                expr = this.finalize(this.startNode(startToken), new Node.TaggedTemplateExpression(expr, quasi));
	            }
	            else {
	                break;
	            }
	        }
	        this.context.allowIn = previousAllowIn;
	        return expr;
	    };
	    Parser.prototype.parseSuper = function () {
	        var node = this.createNode();
	        this.expectKeyword('super');
	        if (!this.match('[') && !this.match('.')) {
	            this.throwUnexpectedToken(this.lookahead);
	        }
	        return this.finalize(node, new Node.Super());
	    };
	    Parser.prototype.parseLeftHandSideExpression = function () {
	        assert_1.assert(this.context.allowIn, 'callee of new expression always allow in keyword.');
	        var node = this.startNode(this.lookahead);
	        var expr = (this.matchKeyword('super') && this.context.inFunctionBody) ? this.parseSuper() :
	            this.inheritCoverGrammar(this.matchKeyword('new') ? this.parseNewExpression : this.parsePrimaryExpression);
	        while (true) {
	            if (this.match('[')) {
	                this.context.isBindingElement = false;
	                this.context.isAssignmentTarget = true;
	                this.expect('[');
	                var property = this.isolateCoverGrammar(this.parseExpression);
	                this.expect(']');
	                expr = this.finalize(node, new Node.ComputedMemberExpression(expr, property));
	            }
	            else if (this.match('.')) {
	                this.context.isBindingElement = false;
	                this.context.isAssignmentTarget = true;
	                this.expect('.');
	                var property = this.parseIdentifierName();
	                expr = this.finalize(node, new Node.StaticMemberExpression(expr, property));
	            }
	            else if (this.lookahead.type === 10 /* Template */ && this.lookahead.head) {
	                var quasi = this.parseTemplateLiteral();
	                expr = this.finalize(node, new Node.TaggedTemplateExpression(expr, quasi));
	            }
	            else {
	                break;
	            }
	        }
	        return expr;
	    };
	    // https://tc39.github.io/ecma262/#sec-update-expressions
	    Parser.prototype.parseUpdateExpression = function () {
	        var expr;
	        var startToken = this.lookahead;
	        if (this.match('++') || this.match('--')) {
	            var node = this.startNode(startToken);
	            var token = this.nextToken();
	            expr = this.inheritCoverGrammar(this.parseUnaryExpression);
	            if (this.context.strict && expr.type === syntax_1.Syntax.Identifier && this.scanner.isRestrictedWord(expr.name)) {
	                this.tolerateError(messages_1.Messages.StrictLHSPrefix);
	            }
	            if (!this.context.isAssignmentTarget) {
	                this.tolerateError(messages_1.Messages.InvalidLHSInAssignment);
	            }
	            var prefix = true;
	            expr = this.finalize(node, new Node.UpdateExpression(token.value, expr, prefix));
	            this.context.isAssignmentTarget = false;
	            this.context.isBindingElement = false;
	        }
	        else {
	            expr = this.inheritCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
	            if (!this.hasLineTerminator && this.lookahead.type === 7 /* Punctuator */) {
	                if (this.match('++') || this.match('--')) {
	                    if (this.context.strict && expr.type === syntax_1.Syntax.Identifier && this.scanner.isRestrictedWord(expr.name)) {
	                        this.tolerateError(messages_1.Messages.StrictLHSPostfix);
	                    }
	                    if (!this.context.isAssignmentTarget) {
	                        this.tolerateError(messages_1.Messages.InvalidLHSInAssignment);
	                    }
	                    this.context.isAssignmentTarget = false;
	                    this.context.isBindingElement = false;
	                    var operator = this.nextToken().value;
	                    var prefix = false;
	                    expr = this.finalize(this.startNode(startToken), new Node.UpdateExpression(operator, expr, prefix));
	                }
	            }
	        }
	        return expr;
	    };
	    // https://tc39.github.io/ecma262/#sec-unary-operators
	    Parser.prototype.parseAwaitExpression = function () {
	        var node = this.createNode();
	        this.nextToken();
	        var argument = this.parseUnaryExpression();
	        return this.finalize(node, new Node.AwaitExpression(argument));
	    };
	    Parser.prototype.parseUnaryExpression = function () {
	        var expr;
	        if (this.match('+') || this.match('-') || this.match('~') || this.match('!') ||
	            this.matchKeyword('delete') || this.matchKeyword('void') || this.matchKeyword('typeof')) {
	            var node = this.startNode(this.lookahead);
	            var token = this.nextToken();
	            expr = this.inheritCoverGrammar(this.parseUnaryExpression);
	            expr = this.finalize(node, new Node.UnaryExpression(token.value, expr));
	            if (this.context.strict && expr.operator === 'delete' && expr.argument.type === syntax_1.Syntax.Identifier) {
	                this.tolerateError(messages_1.Messages.StrictDelete);
	            }
	            this.context.isAssignmentTarget = false;
	            this.context.isBindingElement = false;
	        }
	        else if (this.context.await && this.matchContextualKeyword('await')) {
	            expr = this.parseAwaitExpression();
	        }
	        else {
	            expr = this.parseUpdateExpression();
	        }
	        return expr;
	    };
	    Parser.prototype.parseExponentiationExpression = function () {
	        var startToken = this.lookahead;
	        var expr = this.inheritCoverGrammar(this.parseUnaryExpression);
	        if (expr.type !== syntax_1.Syntax.UnaryExpression && this.match('**')) {
	            this.nextToken();
	            this.context.isAssignmentTarget = false;
	            this.context.isBindingElement = false;
	            var left = expr;
	            var right = this.isolateCoverGrammar(this.parseExponentiationExpression);
	            expr = this.finalize(this.startNode(startToken), new Node.BinaryExpression('**', left, right));
	        }
	        return expr;
	    };
	    // https://tc39.github.io/ecma262/#sec-exp-operator
	    // https://tc39.github.io/ecma262/#sec-multiplicative-operators
	    // https://tc39.github.io/ecma262/#sec-additive-operators
	    // https://tc39.github.io/ecma262/#sec-bitwise-shift-operators
	    // https://tc39.github.io/ecma262/#sec-relational-operators
	    // https://tc39.github.io/ecma262/#sec-equality-operators
	    // https://tc39.github.io/ecma262/#sec-binary-bitwise-operators
	    // https://tc39.github.io/ecma262/#sec-binary-logical-operators
	    Parser.prototype.binaryPrecedence = function (token) {
	        var op = token.value;
	        var precedence;
	        if (token.type === 7 /* Punctuator */) {
	            precedence = this.operatorPrecedence[op] || 0;
	        }
	        else if (token.type === 4 /* Keyword */) {
	            precedence = (op === 'instanceof' || (this.context.allowIn && op === 'in')) ? 7 : 0;
	        }
	        else {
	            precedence = 0;
	        }
	        return precedence;
	    };
	    Parser.prototype.parseBinaryExpression = function () {
	        var startToken = this.lookahead;
	        var expr = this.inheritCoverGrammar(this.parseExponentiationExpression);
	        var token = this.lookahead;
	        var prec = this.binaryPrecedence(token);
	        if (prec > 0) {
	            this.nextToken();
	            this.context.isAssignmentTarget = false;
	            this.context.isBindingElement = false;
	            var markers = [startToken, this.lookahead];
	            var left = expr;
	            var right = this.isolateCoverGrammar(this.parseExponentiationExpression);
	            var stack = [left, token.value, right];
	            var precedences = [prec];
	            while (true) {
	                prec = this.binaryPrecedence(this.lookahead);
	                if (prec <= 0) {
	                    break;
	                }
	                // Reduce: make a binary expression from the three topmost entries.
	                while ((stack.length > 2) && (prec <= precedences[precedences.length - 1])) {
	                    right = stack.pop();
	                    var operator = stack.pop();
	                    precedences.pop();
	                    left = stack.pop();
	                    markers.pop();
	                    var node = this.startNode(markers[markers.length - 1]);
	                    stack.push(this.finalize(node, new Node.BinaryExpression(operator, left, right)));
	                }
	                // Shift.
	                stack.push(this.nextToken().value);
	                precedences.push(prec);
	                markers.push(this.lookahead);
	                stack.push(this.isolateCoverGrammar(this.parseExponentiationExpression));
	            }
	            // Final reduce to clean-up the stack.
	            var i = stack.length - 1;
	            expr = stack[i];
	            markers.pop();
	            while (i > 1) {
	                var node = this.startNode(markers.pop());
	                var operator = stack[i - 1];
	                expr = this.finalize(node, new Node.BinaryExpression(operator, stack[i - 2], expr));
	                i -= 2;
	            }
	        }
	        return expr;
	    };
	    // https://tc39.github.io/ecma262/#sec-conditional-operator
	    Parser.prototype.parseConditionalExpression = function () {
	        var startToken = this.lookahead;
	        var expr = this.inheritCoverGrammar(this.parseBinaryExpression);
	        if (this.match('?')) {
	            this.nextToken();
	            var previousAllowIn = this.context.allowIn;
	            this.context.allowIn = true;
	            var consequent = this.isolateCoverGrammar(this.parseAssignmentExpression);
	            this.context.allowIn = previousAllowIn;
	            this.expect(':');
	            var alternate = this.isolateCoverGrammar(this.parseAssignmentExpression);
	            expr = this.finalize(this.startNode(startToken), new Node.ConditionalExpression(expr, consequent, alternate));
	            this.context.isAssignmentTarget = false;
	            this.context.isBindingElement = false;
	        }
	        return expr;
	    };
	    // https://tc39.github.io/ecma262/#sec-assignment-operators
	    Parser.prototype.checkPatternParam = function (options, param) {
	        switch (param.type) {
	            case syntax_1.Syntax.Identifier:
	                this.validateParam(options, param, param.name);
	                break;
	            case syntax_1.Syntax.RestElement:
	                this.checkPatternParam(options, param.argument);
	                break;
	            case syntax_1.Syntax.AssignmentPattern:
	                this.checkPatternParam(options, param.left);
	                break;
	            case syntax_1.Syntax.ArrayPattern:
	                for (var i = 0; i < param.elements.length; i++) {
	                    if (param.elements[i] !== null) {
	                        this.checkPatternParam(options, param.elements[i]);
	                    }
	                }
	                break;
	            case syntax_1.Syntax.ObjectPattern:
	                for (var i = 0; i < param.properties.length; i++) {
	                    this.checkPatternParam(options, param.properties[i].value);
	                }
	                break;
	            default:
	                break;
	        }
	        options.simple = options.simple && (param instanceof Node.Identifier);
	    };
	    Parser.prototype.reinterpretAsCoverFormalsList = function (expr) {
	        var params = [expr];
	        var options;
	        var asyncArrow = false;
	        switch (expr.type) {
	            case syntax_1.Syntax.Identifier:
	                break;
	            case ArrowParameterPlaceHolder:
	                params = expr.params;
	                asyncArrow = expr.async;
	                break;
	            default:
	                return null;
	        }
	        options = {
	            simple: true,
	            paramSet: {}
	        };
	        for (var i = 0; i < params.length; ++i) {
	            var param = params[i];
	            if (param.type === syntax_1.Syntax.AssignmentPattern) {
	                if (param.right.type === syntax_1.Syntax.YieldExpression) {
	                    if (param.right.argument) {
	                        this.throwUnexpectedToken(this.lookahead);
	                    }
	                    param.right.type = syntax_1.Syntax.Identifier;
	                    param.right.name = 'yield';
	                    delete param.right.argument;
	                    delete param.right.delegate;
	                }
	            }
	            else if (asyncArrow && param.type === syntax_1.Syntax.Identifier && param.name === 'await') {
	                this.throwUnexpectedToken(this.lookahead);
	            }
	            this.checkPatternParam(options, param);
	            params[i] = param;
	        }
	        if (this.context.strict || !this.context.allowYield) {
	            for (var i = 0; i < params.length; ++i) {
	                var param = params[i];
	                if (param.type === syntax_1.Syntax.YieldExpression) {
	                    this.throwUnexpectedToken(this.lookahead);
	                }
	            }
	        }
	        if (options.message === messages_1.Messages.StrictParamDupe) {
	            var token = this.context.strict ? options.stricted : options.firstRestricted;
	            this.throwUnexpectedToken(token, options.message);
	        }
	        return {
	            simple: options.simple,
	            params: params,
	            stricted: options.stricted,
	            firstRestricted: options.firstRestricted,
	            message: options.message
	        };
	    };
	    Parser.prototype.parseAssignmentExpression = function () {
	        var expr;
	        if (!this.context.allowYield && this.matchKeyword('yield')) {
	            expr = this.parseYieldExpression();
	        }
	        else {
	            var startToken = this.lookahead;
	            var token = startToken;
	            expr = this.parseConditionalExpression();
	            if (token.type === 3 /* Identifier */ && (token.lineNumber === this.lookahead.lineNumber) && token.value === 'async') {
	                if (this.lookahead.type === 3 /* Identifier */ || this.matchKeyword('yield')) {
	                    var arg = this.parsePrimaryExpression();
	                    this.reinterpretExpressionAsPattern(arg);
	                    expr = {
	                        type: ArrowParameterPlaceHolder,
	                        params: [arg],
	                        async: true
	                    };
	                }
	            }
	            if (expr.type === ArrowParameterPlaceHolder || this.match('=>')) {
	                // https://tc39.github.io/ecma262/#sec-arrow-function-definitions
	                this.context.isAssignmentTarget = false;
	                this.context.isBindingElement = false;
	                var isAsync = expr.async;
	                var list = this.reinterpretAsCoverFormalsList(expr);
	                if (list) {
	                    if (this.hasLineTerminator) {
	                        this.tolerateUnexpectedToken(this.lookahead);
	                    }
	                    this.context.firstCoverInitializedNameError = null;
	                    var previousStrict = this.context.strict;
	                    var previousAllowStrictDirective = this.context.allowStrictDirective;
	                    this.context.allowStrictDirective = list.simple;
	                    var previousAllowYield = this.context.allowYield;
	                    var previousAwait = this.context.await;
	                    this.context.allowYield = true;
	                    this.context.await = isAsync;
	                    var node = this.startNode(startToken);
	                    this.expect('=>');
	                    var body = void 0;
	                    if (this.match('{')) {
	                        var previousAllowIn = this.context.allowIn;
	                        this.context.allowIn = true;
	                        body = this.parseFunctionSourceElements();
	                        this.context.allowIn = previousAllowIn;
	                    }
	                    else {
	                        body = this.isolateCoverGrammar(this.parseAssignmentExpression);
	                    }
	                    var expression = body.type !== syntax_1.Syntax.BlockStatement;
	                    if (this.context.strict && list.firstRestricted) {
	                        this.throwUnexpectedToken(list.firstRestricted, list.message);
	                    }
	                    if (this.context.strict && list.stricted) {
	                        this.tolerateUnexpectedToken(list.stricted, list.message);
	                    }
	                    expr = isAsync ? this.finalize(node, new Node.AsyncArrowFunctionExpression(list.params, body, expression)) :
	                        this.finalize(node, new Node.ArrowFunctionExpression(list.params, body, expression));
	                    this.context.strict = previousStrict;
	                    this.context.allowStrictDirective = previousAllowStrictDirective;
	                    this.context.allowYield = previousAllowYield;
	                    this.context.await = previousAwait;
	                }
	            }
	            else {
	                if (this.matchAssign()) {
	                    if (!this.context.isAssignmentTarget) {
	                        this.tolerateError(messages_1.Messages.InvalidLHSInAssignment);
	                    }
	                    if (this.context.strict && expr.type === syntax_1.Syntax.Identifier) {
	                        var id = expr;
	                        if (this.scanner.isRestrictedWord(id.name)) {
	                            this.tolerateUnexpectedToken(token, messages_1.Messages.StrictLHSAssignment);
	                        }
	                        if (this.scanner.isStrictModeReservedWord(id.name)) {
	                            this.tolerateUnexpectedToken(token, messages_1.Messages.StrictReservedWord);
	                        }
	                    }
	                    if (!this.match('=')) {
	                        this.context.isAssignmentTarget = false;
	                        this.context.isBindingElement = false;
	                    }
	                    else {
	                        this.reinterpretExpressionAsPattern(expr);
	                    }
	                    token = this.nextToken();
	                    var operator = token.value;
	                    var right = this.isolateCoverGrammar(this.parseAssignmentExpression);
	                    expr = this.finalize(this.startNode(startToken), new Node.AssignmentExpression(operator, expr, right));
	                    this.context.firstCoverInitializedNameError = null;
	                }
	            }
	        }
	        return expr;
	    };
	    // https://tc39.github.io/ecma262/#sec-comma-operator
	    Parser.prototype.parseExpression = function () {
	        var startToken = this.lookahead;
	        var expr = this.isolateCoverGrammar(this.parseAssignmentExpression);
	        if (this.match(',')) {
	            var expressions = [];
	            expressions.push(expr);
	            while (this.lookahead.type !== 2 /* EOF */) {
	                if (!this.match(',')) {
	                    break;
	                }
	                this.nextToken();
	                expressions.push(this.isolateCoverGrammar(this.parseAssignmentExpression));
	            }
	            expr = this.finalize(this.startNode(startToken), new Node.SequenceExpression(expressions));
	        }
	        return expr;
	    };
	    // https://tc39.github.io/ecma262/#sec-block
	    Parser.prototype.parseStatementListItem = function () {
	        var statement;
	        this.context.isAssignmentTarget = true;
	        this.context.isBindingElement = true;
	        if (this.lookahead.type === 4 /* Keyword */) {
	            switch (this.lookahead.value) {
	                case 'export':
	                    if (!this.context.isModule) {
	                        this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.IllegalExportDeclaration);
	                    }
	                    statement = this.parseExportDeclaration();
	                    break;
	                case 'import':
	                    if (!this.context.isModule) {
	                        this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.IllegalImportDeclaration);
	                    }
	                    statement = this.parseImportDeclaration();
	                    break;
	                case 'const':
	                    statement = this.parseLexicalDeclaration({ inFor: false });
	                    break;
	                case 'function':
	                    statement = this.parseFunctionDeclaration();
	                    break;
	                case 'class':
	                    statement = this.parseClassDeclaration();
	                    break;
	                case 'let':
	                    statement = this.isLexicalDeclaration() ? this.parseLexicalDeclaration({ inFor: false }) : this.parseStatement();
	                    break;
	                default:
	                    statement = this.parseStatement();
	                    break;
	            }
	        }
	        else {
	            statement = this.parseStatement();
	        }
	        return statement;
	    };
	    Parser.prototype.parseBlock = function () {
	        var node = this.createNode();
	        this.expect('{');
	        var block = [];
	        while (true) {
	            if (this.match('}')) {
	                break;
	            }
	            block.push(this.parseStatementListItem());
	        }
	        this.expect('}');
	        return this.finalize(node, new Node.BlockStatement(block));
	    };
	    // https://tc39.github.io/ecma262/#sec-let-and-const-declarations
	    Parser.prototype.parseLexicalBinding = function (kind, options) {
	        var node = this.createNode();
	        var params = [];
	        var id = this.parsePattern(params, kind);
	        if (this.context.strict && id.type === syntax_1.Syntax.Identifier) {
	            if (this.scanner.isRestrictedWord(id.name)) {
	                this.tolerateError(messages_1.Messages.StrictVarName);
	            }
	        }
	        var init = null;
	        if (kind === 'const') {
	            if (!this.matchKeyword('in') && !this.matchContextualKeyword('of')) {
	                if (this.match('=')) {
	                    this.nextToken();
	                    init = this.isolateCoverGrammar(this.parseAssignmentExpression);
	                }
	                else {
	                    this.throwError(messages_1.Messages.DeclarationMissingInitializer, 'const');
	                }
	            }
	        }
	        else if ((!options.inFor && id.type !== syntax_1.Syntax.Identifier) || this.match('=')) {
	            this.expect('=');
	            init = this.isolateCoverGrammar(this.parseAssignmentExpression);
	        }
	        return this.finalize(node, new Node.VariableDeclarator(id, init));
	    };
	    Parser.prototype.parseBindingList = function (kind, options) {
	        var list = [this.parseLexicalBinding(kind, options)];
	        while (this.match(',')) {
	            this.nextToken();
	            list.push(this.parseLexicalBinding(kind, options));
	        }
	        return list;
	    };
	    Parser.prototype.isLexicalDeclaration = function () {
	        var state = this.scanner.saveState();
	        this.scanner.scanComments();
	        var next = this.scanner.lex();
	        this.scanner.restoreState(state);
	        return (next.type === 3 /* Identifier */) ||
	            (next.type === 7 /* Punctuator */ && next.value === '[') ||
	            (next.type === 7 /* Punctuator */ && next.value === '{') ||
	            (next.type === 4 /* Keyword */ && next.value === 'let') ||
	            (next.type === 4 /* Keyword */ && next.value === 'yield');
	    };
	    Parser.prototype.parseLexicalDeclaration = function (options) {
	        var node = this.createNode();
	        var kind = this.nextToken().value;
	        assert_1.assert(kind === 'let' || kind === 'const', 'Lexical declaration must be either let or const');
	        var declarations = this.parseBindingList(kind, options);
	        this.consumeSemicolon();
	        return this.finalize(node, new Node.VariableDeclaration(declarations, kind));
	    };
	    // https://tc39.github.io/ecma262/#sec-destructuring-binding-patterns
	    Parser.prototype.parseBindingRestElement = function (params, kind) {
	        var node = this.createNode();
	        this.expect('...');
	        var arg = this.parsePattern(params, kind);
	        return this.finalize(node, new Node.RestElement(arg));
	    };
	    Parser.prototype.parseArrayPattern = function (params, kind) {
	        var node = this.createNode();
	        this.expect('[');
	        var elements = [];
	        while (!this.match(']')) {
	            if (this.match(',')) {
	                this.nextToken();
	                elements.push(null);
	            }
	            else {
	                if (this.match('...')) {
	                    elements.push(this.parseBindingRestElement(params, kind));
	                    break;
	                }
	                else {
	                    elements.push(this.parsePatternWithDefault(params, kind));
	                }
	                if (!this.match(']')) {
	                    this.expect(',');
	                }
	            }
	        }
	        this.expect(']');
	        return this.finalize(node, new Node.ArrayPattern(elements));
	    };
	    Parser.prototype.parsePropertyPattern = function (params, kind) {
	        var node = this.createNode();
	        var computed = false;
	        var shorthand = false;
	        var method = false;
	        var key;
	        var value;
	        if (this.lookahead.type === 3 /* Identifier */) {
	            var keyToken = this.lookahead;
	            key = this.parseVariableIdentifier();
	            var init = this.finalize(node, new Node.Identifier(keyToken.value));
	            if (this.match('=')) {
	                params.push(keyToken);
	                shorthand = true;
	                this.nextToken();
	                var expr = this.parseAssignmentExpression();
	                value = this.finalize(this.startNode(keyToken), new Node.AssignmentPattern(init, expr));
	            }
	            else if (!this.match(':')) {
	                params.push(keyToken);
	                shorthand = true;
	                value = init;
	            }
	            else {
	                this.expect(':');
	                value = this.parsePatternWithDefault(params, kind);
	            }
	        }
	        else {
	            computed = this.match('[');
	            key = this.parseObjectPropertyKey();
	            this.expect(':');
	            value = this.parsePatternWithDefault(params, kind);
	        }
	        return this.finalize(node, new Node.Property('init', key, computed, value, method, shorthand));
	    };
	    Parser.prototype.parseObjectPattern = function (params, kind) {
	        var node = this.createNode();
	        var properties = [];
	        this.expect('{');
	        while (!this.match('}')) {
	            properties.push(this.parsePropertyPattern(params, kind));
	            if (!this.match('}')) {
	                this.expect(',');
	            }
	        }
	        this.expect('}');
	        return this.finalize(node, new Node.ObjectPattern(properties));
	    };
	    Parser.prototype.parsePattern = function (params, kind) {
	        var pattern;
	        if (this.match('[')) {
	            pattern = this.parseArrayPattern(params, kind);
	        }
	        else if (this.match('{')) {
	            pattern = this.parseObjectPattern(params, kind);
	        }
	        else {
	            if (this.matchKeyword('let') && (kind === 'const' || kind === 'let')) {
	                this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.LetInLexicalBinding);
	            }
	            params.push(this.lookahead);
	            pattern = this.parseVariableIdentifier(kind);
	        }
	        return pattern;
	    };
	    Parser.prototype.parsePatternWithDefault = function (params, kind) {
	        var startToken = this.lookahead;
	        var pattern = this.parsePattern(params, kind);
	        if (this.match('=')) {
	            this.nextToken();
	            var previousAllowYield = this.context.allowYield;
	            this.context.allowYield = true;
	            var right = this.isolateCoverGrammar(this.parseAssignmentExpression);
	            this.context.allowYield = previousAllowYield;
	            pattern = this.finalize(this.startNode(startToken), new Node.AssignmentPattern(pattern, right));
	        }
	        return pattern;
	    };
	    // https://tc39.github.io/ecma262/#sec-variable-statement
	    Parser.prototype.parseVariableIdentifier = function (kind) {
	        var node = this.createNode();
	        var token = this.nextToken();
	        if (token.type === 4 /* Keyword */ && token.value === 'yield') {
	            if (this.context.strict) {
	                this.tolerateUnexpectedToken(token, messages_1.Messages.StrictReservedWord);
	            }
	            else if (!this.context.allowYield) {
	                this.throwUnexpectedToken(token);
	            }
	        }
	        else if (token.type !== 3 /* Identifier */) {
	            if (this.context.strict && token.type === 4 /* Keyword */ && this.scanner.isStrictModeReservedWord(token.value)) {
	                this.tolerateUnexpectedToken(token, messages_1.Messages.StrictReservedWord);
	            }
	            else {
	                if (this.context.strict || token.value !== 'let' || kind !== 'var') {
	                    this.throwUnexpectedToken(token);
	                }
	            }
	        }
	        else if ((this.context.isModule || this.context.await) && token.type === 3 /* Identifier */ && token.value === 'await') {
	            this.tolerateUnexpectedToken(token);
	        }
	        return this.finalize(node, new Node.Identifier(token.value));
	    };
	    Parser.prototype.parseVariableDeclaration = function (options) {
	        var node = this.createNode();
	        var params = [];
	        var id = this.parsePattern(params, 'var');
	        if (this.context.strict && id.type === syntax_1.Syntax.Identifier) {
	            if (this.scanner.isRestrictedWord(id.name)) {
	                this.tolerateError(messages_1.Messages.StrictVarName);
	            }
	        }
	        var init = null;
	        if (this.match('=')) {
	            this.nextToken();
	            init = this.isolateCoverGrammar(this.parseAssignmentExpression);
	        }
	        else if (id.type !== syntax_1.Syntax.Identifier && !options.inFor) {
	            this.expect('=');
	        }
	        return this.finalize(node, new Node.VariableDeclarator(id, init));
	    };
	    Parser.prototype.parseVariableDeclarationList = function (options) {
	        var opt = { inFor: options.inFor };
	        var list = [];
	        list.push(this.parseVariableDeclaration(opt));
	        while (this.match(',')) {
	            this.nextToken();
	            list.push(this.parseVariableDeclaration(opt));
	        }
	        return list;
	    };
	    Parser.prototype.parseVariableStatement = function () {
	        var node = this.createNode();
	        this.expectKeyword('var');
	        var declarations = this.parseVariableDeclarationList({ inFor: false });
	        this.consumeSemicolon();
	        return this.finalize(node, new Node.VariableDeclaration(declarations, 'var'));
	    };
	    // https://tc39.github.io/ecma262/#sec-empty-statement
	    Parser.prototype.parseEmptyStatement = function () {
	        var node = this.createNode();
	        this.expect(';');
	        return this.finalize(node, new Node.EmptyStatement());
	    };
	    // https://tc39.github.io/ecma262/#sec-expression-statement
	    Parser.prototype.parseExpressionStatement = function () {
	        var node = this.createNode();
	        var expr = this.parseExpression();
	        this.consumeSemicolon();
	        return this.finalize(node, new Node.ExpressionStatement(expr));
	    };
	    // https://tc39.github.io/ecma262/#sec-if-statement
	    Parser.prototype.parseIfClause = function () {
	        if (this.context.strict && this.matchKeyword('function')) {
	            this.tolerateError(messages_1.Messages.StrictFunction);
	        }
	        return this.parseStatement();
	    };
	    Parser.prototype.parseIfStatement = function () {
	        var node = this.createNode();
	        var consequent;
	        var alternate = null;
	        this.expectKeyword('if');
	        this.expect('(');
	        var test = this.parseExpression();
	        if (!this.match(')') && this.config.tolerant) {
	            this.tolerateUnexpectedToken(this.nextToken());
	            consequent = this.finalize(this.createNode(), new Node.EmptyStatement());
	        }
	        else {
	            this.expect(')');
	            consequent = this.parseIfClause();
	            if (this.matchKeyword('else')) {
	                this.nextToken();
	                alternate = this.parseIfClause();
	            }
	        }
	        return this.finalize(node, new Node.IfStatement(test, consequent, alternate));
	    };
	    // https://tc39.github.io/ecma262/#sec-do-while-statement
	    Parser.prototype.parseDoWhileStatement = function () {
	        var node = this.createNode();
	        this.expectKeyword('do');
	        var previousInIteration = this.context.inIteration;
	        this.context.inIteration = true;
	        var body = this.parseStatement();
	        this.context.inIteration = previousInIteration;
	        this.expectKeyword('while');
	        this.expect('(');
	        var test = this.parseExpression();
	        if (!this.match(')') && this.config.tolerant) {
	            this.tolerateUnexpectedToken(this.nextToken());
	        }
	        else {
	            this.expect(')');
	            if (this.match(';')) {
	                this.nextToken();
	            }
	        }
	        return this.finalize(node, new Node.DoWhileStatement(body, test));
	    };
	    // https://tc39.github.io/ecma262/#sec-while-statement
	    Parser.prototype.parseWhileStatement = function () {
	        var node = this.createNode();
	        var body;
	        this.expectKeyword('while');
	        this.expect('(');
	        var test = this.parseExpression();
	        if (!this.match(')') && this.config.tolerant) {
	            this.tolerateUnexpectedToken(this.nextToken());
	            body = this.finalize(this.createNode(), new Node.EmptyStatement());
	        }
	        else {
	            this.expect(')');
	            var previousInIteration = this.context.inIteration;
	            this.context.inIteration = true;
	            body = this.parseStatement();
	            this.context.inIteration = previousInIteration;
	        }
	        return this.finalize(node, new Node.WhileStatement(test, body));
	    };
	    // https://tc39.github.io/ecma262/#sec-for-statement
	    // https://tc39.github.io/ecma262/#sec-for-in-and-for-of-statements
	    Parser.prototype.parseForStatement = function () {
	        var init = null;
	        var test = null;
	        var update = null;
	        var forIn = true;
	        var left, right;
	        var node = this.createNode();
	        this.expectKeyword('for');
	        this.expect('(');
	        if (this.match(';')) {
	            this.nextToken();
	        }
	        else {
	            if (this.matchKeyword('var')) {
	                init = this.createNode();
	                this.nextToken();
	                var previousAllowIn = this.context.allowIn;
	                this.context.allowIn = false;
	                var declarations = this.parseVariableDeclarationList({ inFor: true });
	                this.context.allowIn = previousAllowIn;
	                if (declarations.length === 1 && this.matchKeyword('in')) {
	                    var decl = declarations[0];
	                    if (decl.init && (decl.id.type === syntax_1.Syntax.ArrayPattern || decl.id.type === syntax_1.Syntax.ObjectPattern || this.context.strict)) {
	                        this.tolerateError(messages_1.Messages.ForInOfLoopInitializer, 'for-in');
	                    }
	                    init = this.finalize(init, new Node.VariableDeclaration(declarations, 'var'));
	                    this.nextToken();
	                    left = init;
	                    right = this.parseExpression();
	                    init = null;
	                }
	                else if (declarations.length === 1 && declarations[0].init === null && this.matchContextualKeyword('of')) {
	                    init = this.finalize(init, new Node.VariableDeclaration(declarations, 'var'));
	                    this.nextToken();
	                    left = init;
	                    right = this.parseAssignmentExpression();
	                    init = null;
	                    forIn = false;
	                }
	                else {
	                    init = this.finalize(init, new Node.VariableDeclaration(declarations, 'var'));
	                    this.expect(';');
	                }
	            }
	            else if (this.matchKeyword('const') || this.matchKeyword('let')) {
	                init = this.createNode();
	                var kind = this.nextToken().value;
	                if (!this.context.strict && this.lookahead.value === 'in') {
	                    init = this.finalize(init, new Node.Identifier(kind));
	                    this.nextToken();
	                    left = init;
	                    right = this.parseExpression();
	                    init = null;
	                }
	                else {
	                    var previousAllowIn = this.context.allowIn;
	                    this.context.allowIn = false;
	                    var declarations = this.parseBindingList(kind, { inFor: true });
	                    this.context.allowIn = previousAllowIn;
	                    if (declarations.length === 1 && declarations[0].init === null && this.matchKeyword('in')) {
	                        init = this.finalize(init, new Node.VariableDeclaration(declarations, kind));
	                        this.nextToken();
	                        left = init;
	                        right = this.parseExpression();
	                        init = null;
	                    }
	                    else if (declarations.length === 1 && declarations[0].init === null && this.matchContextualKeyword('of')) {
	                        init = this.finalize(init, new Node.VariableDeclaration(declarations, kind));
	                        this.nextToken();
	                        left = init;
	                        right = this.parseAssignmentExpression();
	                        init = null;
	                        forIn = false;
	                    }
	                    else {
	                        this.consumeSemicolon();
	                        init = this.finalize(init, new Node.VariableDeclaration(declarations, kind));
	                    }
	                }
	            }
	            else {
	                var initStartToken = this.lookahead;
	                var previousAllowIn = this.context.allowIn;
	                this.context.allowIn = false;
	                init = this.inheritCoverGrammar(this.parseAssignmentExpression);
	                this.context.allowIn = previousAllowIn;
	                if (this.matchKeyword('in')) {
	                    if (!this.context.isAssignmentTarget || init.type === syntax_1.Syntax.AssignmentExpression) {
	                        this.tolerateError(messages_1.Messages.InvalidLHSInForIn);
	                    }
	                    this.nextToken();
	                    this.reinterpretExpressionAsPattern(init);
	                    left = init;
	                    right = this.parseExpression();
	                    init = null;
	                }
	                else if (this.matchContextualKeyword('of')) {
	                    if (!this.context.isAssignmentTarget || init.type === syntax_1.Syntax.AssignmentExpression) {
	                        this.tolerateError(messages_1.Messages.InvalidLHSInForLoop);
	                    }
	                    this.nextToken();
	                    this.reinterpretExpressionAsPattern(init);
	                    left = init;
	                    right = this.parseAssignmentExpression();
	                    init = null;
	                    forIn = false;
	                }
	                else {
	                    if (this.match(',')) {
	                        var initSeq = [init];
	                        while (this.match(',')) {
	                            this.nextToken();
	                            initSeq.push(this.isolateCoverGrammar(this.parseAssignmentExpression));
	                        }
	                        init = this.finalize(this.startNode(initStartToken), new Node.SequenceExpression(initSeq));
	                    }
	                    this.expect(';');
	                }
	            }
	        }
	        if (typeof left === 'undefined') {
	            if (!this.match(';')) {
	                test = this.parseExpression();
	            }
	            this.expect(';');
	            if (!this.match(')')) {
	                update = this.parseExpression();
	            }
	        }
	        var body;
	        if (!this.match(')') && this.config.tolerant) {
	            this.tolerateUnexpectedToken(this.nextToken());
	            body = this.finalize(this.createNode(), new Node.EmptyStatement());
	        }
	        else {
	            this.expect(')');
	            var previousInIteration = this.context.inIteration;
	            this.context.inIteration = true;
	            body = this.isolateCoverGrammar(this.parseStatement);
	            this.context.inIteration = previousInIteration;
	        }
	        return (typeof left === 'undefined') ?
	            this.finalize(node, new Node.ForStatement(init, test, update, body)) :
	            forIn ? this.finalize(node, new Node.ForInStatement(left, right, body)) :
	                this.finalize(node, new Node.ForOfStatement(left, right, body));
	    };
	    // https://tc39.github.io/ecma262/#sec-continue-statement
	    Parser.prototype.parseContinueStatement = function () {
	        var node = this.createNode();
	        this.expectKeyword('continue');
	        var label = null;
	        if (this.lookahead.type === 3 /* Identifier */ && !this.hasLineTerminator) {
	            var id = this.parseVariableIdentifier();
	            label = id;
	            var key = '$' + id.name;
	            if (!Object.prototype.hasOwnProperty.call(this.context.labelSet, key)) {
	                this.throwError(messages_1.Messages.UnknownLabel, id.name);
	            }
	        }
	        this.consumeSemicolon();
	        if (label === null && !this.context.inIteration) {
	            this.throwError(messages_1.Messages.IllegalContinue);
	        }
	        return this.finalize(node, new Node.ContinueStatement(label));
	    };
	    // https://tc39.github.io/ecma262/#sec-break-statement
	    Parser.prototype.parseBreakStatement = function () {
	        var node = this.createNode();
	        this.expectKeyword('break');
	        var label = null;
	        if (this.lookahead.type === 3 /* Identifier */ && !this.hasLineTerminator) {
	            var id = this.parseVariableIdentifier();
	            var key = '$' + id.name;
	            if (!Object.prototype.hasOwnProperty.call(this.context.labelSet, key)) {
	                this.throwError(messages_1.Messages.UnknownLabel, id.name);
	            }
	            label = id;
	        }
	        this.consumeSemicolon();
	        if (label === null && !this.context.inIteration && !this.context.inSwitch) {
	            this.throwError(messages_1.Messages.IllegalBreak);
	        }
	        return this.finalize(node, new Node.BreakStatement(label));
	    };
	    // https://tc39.github.io/ecma262/#sec-return-statement
	    Parser.prototype.parseReturnStatement = function () {
	        if (!this.context.inFunctionBody) {
	            this.tolerateError(messages_1.Messages.IllegalReturn);
	        }
	        var node = this.createNode();
	        this.expectKeyword('return');
	        var hasArgument = !this.match(';') && !this.match('}') &&
	            !this.hasLineTerminator && this.lookahead.type !== 2 /* EOF */;
	        var argument = hasArgument ? this.parseExpression() : null;
	        this.consumeSemicolon();
	        return this.finalize(node, new Node.ReturnStatement(argument));
	    };
	    // https://tc39.github.io/ecma262/#sec-with-statement
	    Parser.prototype.parseWithStatement = function () {
	        if (this.context.strict) {
	            this.tolerateError(messages_1.Messages.StrictModeWith);
	        }
	        var node = this.createNode();
	        var body;
	        this.expectKeyword('with');
	        this.expect('(');
	        var object = this.parseExpression();
	        if (!this.match(')') && this.config.tolerant) {
	            this.tolerateUnexpectedToken(this.nextToken());
	            body = this.finalize(this.createNode(), new Node.EmptyStatement());
	        }
	        else {
	            this.expect(')');
	            body = this.parseStatement();
	        }
	        return this.finalize(node, new Node.WithStatement(object, body));
	    };
	    // https://tc39.github.io/ecma262/#sec-switch-statement
	    Parser.prototype.parseSwitchCase = function () {
	        var node = this.createNode();
	        var test;
	        if (this.matchKeyword('default')) {
	            this.nextToken();
	            test = null;
	        }
	        else {
	            this.expectKeyword('case');
	            test = this.parseExpression();
	        }
	        this.expect(':');
	        var consequent = [];
	        while (true) {
	            if (this.match('}') || this.matchKeyword('default') || this.matchKeyword('case')) {
	                break;
	            }
	            consequent.push(this.parseStatementListItem());
	        }
	        return this.finalize(node, new Node.SwitchCase(test, consequent));
	    };
	    Parser.prototype.parseSwitchStatement = function () {
	        var node = this.createNode();
	        this.expectKeyword('switch');
	        this.expect('(');
	        var discriminant = this.parseExpression();
	        this.expect(')');
	        var previousInSwitch = this.context.inSwitch;
	        this.context.inSwitch = true;
	        var cases = [];
	        var defaultFound = false;
	        this.expect('{');
	        while (true) {
	            if (this.match('}')) {
	                break;
	            }
	            var clause = this.parseSwitchCase();
	            if (clause.test === null) {
	                if (defaultFound) {
	                    this.throwError(messages_1.Messages.MultipleDefaultsInSwitch);
	                }
	                defaultFound = true;
	            }
	            cases.push(clause);
	        }
	        this.expect('}');
	        this.context.inSwitch = previousInSwitch;
	        return this.finalize(node, new Node.SwitchStatement(discriminant, cases));
	    };
	    // https://tc39.github.io/ecma262/#sec-labelled-statements
	    Parser.prototype.parseLabelledStatement = function () {
	        var node = this.createNode();
	        var expr = this.parseExpression();
	        var statement;
	        if ((expr.type === syntax_1.Syntax.Identifier) && this.match(':')) {
	            this.nextToken();
	            var id = expr;
	            var key = '$' + id.name;
	            if (Object.prototype.hasOwnProperty.call(this.context.labelSet, key)) {
	                this.throwError(messages_1.Messages.Redeclaration, 'Label', id.name);
	            }
	            this.context.labelSet[key] = true;
	            var body = void 0;
	            if (this.matchKeyword('class')) {
	                this.tolerateUnexpectedToken(this.lookahead);
	                body = this.parseClassDeclaration();
	            }
	            else if (this.matchKeyword('function')) {
	                var token = this.lookahead;
	                var declaration = this.parseFunctionDeclaration();
	                if (this.context.strict) {
	                    this.tolerateUnexpectedToken(token, messages_1.Messages.StrictFunction);
	                }
	                else if (declaration.generator) {
	                    this.tolerateUnexpectedToken(token, messages_1.Messages.GeneratorInLegacyContext);
	                }
	                body = declaration;
	            }
	            else {
	                body = this.parseStatement();
	            }
	            delete this.context.labelSet[key];
	            statement = new Node.LabeledStatement(id, body);
	        }
	        else {
	            this.consumeSemicolon();
	            statement = new Node.ExpressionStatement(expr);
	        }
	        return this.finalize(node, statement);
	    };
	    // https://tc39.github.io/ecma262/#sec-throw-statement
	    Parser.prototype.parseThrowStatement = function () {
	        var node = this.createNode();
	        this.expectKeyword('throw');
	        if (this.hasLineTerminator) {
	            this.throwError(messages_1.Messages.NewlineAfterThrow);
	        }
	        var argument = this.parseExpression();
	        this.consumeSemicolon();
	        return this.finalize(node, new Node.ThrowStatement(argument));
	    };
	    // https://tc39.github.io/ecma262/#sec-try-statement
	    Parser.prototype.parseCatchClause = function () {
	        var node = this.createNode();
	        this.expectKeyword('catch');
	        this.expect('(');
	        if (this.match(')')) {
	            this.throwUnexpectedToken(this.lookahead);
	        }
	        var params = [];
	        var param = this.parsePattern(params);
	        var paramMap = {};
	        for (var i = 0; i < params.length; i++) {
	            var key = '$' + params[i].value;
	            if (Object.prototype.hasOwnProperty.call(paramMap, key)) {
	                this.tolerateError(messages_1.Messages.DuplicateBinding, params[i].value);
	            }
	            paramMap[key] = true;
	        }
	        if (this.context.strict && param.type === syntax_1.Syntax.Identifier) {
	            if (this.scanner.isRestrictedWord(param.name)) {
	                this.tolerateError(messages_1.Messages.StrictCatchVariable);
	            }
	        }
	        this.expect(')');
	        var body = this.parseBlock();
	        return this.finalize(node, new Node.CatchClause(param, body));
	    };
	    Parser.prototype.parseFinallyClause = function () {
	        this.expectKeyword('finally');
	        return this.parseBlock();
	    };
	    Parser.prototype.parseTryStatement = function () {
	        var node = this.createNode();
	        this.expectKeyword('try');
	        var block = this.parseBlock();
	        var handler = this.matchKeyword('catch') ? this.parseCatchClause() : null;
	        var finalizer = this.matchKeyword('finally') ? this.parseFinallyClause() : null;
	        if (!handler && !finalizer) {
	            this.throwError(messages_1.Messages.NoCatchOrFinally);
	        }
	        return this.finalize(node, new Node.TryStatement(block, handler, finalizer));
	    };
	    // https://tc39.github.io/ecma262/#sec-debugger-statement
	    Parser.prototype.parseDebuggerStatement = function () {
	        var node = this.createNode();
	        this.expectKeyword('debugger');
	        this.consumeSemicolon();
	        return this.finalize(node, new Node.DebuggerStatement());
	    };
	    // https://tc39.github.io/ecma262/#sec-ecmascript-language-statements-and-declarations
	    Parser.prototype.parseStatement = function () {
	        var statement;
	        switch (this.lookahead.type) {
	            case 1 /* BooleanLiteral */:
	            case 5 /* NullLiteral */:
	            case 6 /* NumericLiteral */:
	            case 8 /* StringLiteral */:
	            case 10 /* Template */:
	            case 9 /* RegularExpression */:
	                statement = this.parseExpressionStatement();
	                break;
	            case 7 /* Punctuator */:
	                var value = this.lookahead.value;
	                if (value === '{') {
	                    statement = this.parseBlock();
	                }
	                else if (value === '(') {
	                    statement = this.parseExpressionStatement();
	                }
	                else if (value === ';') {
	                    statement = this.parseEmptyStatement();
	                }
	                else {
	                    statement = this.parseExpressionStatement();
	                }
	                break;
	            case 3 /* Identifier */:
	                statement = this.matchAsyncFunction() ? this.parseFunctionDeclaration() : this.parseLabelledStatement();
	                break;
	            case 4 /* Keyword */:
	                switch (this.lookahead.value) {
	                    case 'break':
	                        statement = this.parseBreakStatement();
	                        break;
	                    case 'continue':
	                        statement = this.parseContinueStatement();
	                        break;
	                    case 'debugger':
	                        statement = this.parseDebuggerStatement();
	                        break;
	                    case 'do':
	                        statement = this.parseDoWhileStatement();
	                        break;
	                    case 'for':
	                        statement = this.parseForStatement();
	                        break;
	                    case 'function':
	                        statement = this.parseFunctionDeclaration();
	                        break;
	                    case 'if':
	                        statement = this.parseIfStatement();
	                        break;
	                    case 'return':
	                        statement = this.parseReturnStatement();
	                        break;
	                    case 'switch':
	                        statement = this.parseSwitchStatement();
	                        break;
	                    case 'throw':
	                        statement = this.parseThrowStatement();
	                        break;
	                    case 'try':
	                        statement = this.parseTryStatement();
	                        break;
	                    case 'var':
	                        statement = this.parseVariableStatement();
	                        break;
	                    case 'while':
	                        statement = this.parseWhileStatement();
	                        break;
	                    case 'with':
	                        statement = this.parseWithStatement();
	                        break;
	                    default:
	                        statement = this.parseExpressionStatement();
	                        break;
	                }
	                break;
	            default:
	                statement = this.throwUnexpectedToken(this.lookahead);
	        }
	        return statement;
	    };
	    // https://tc39.github.io/ecma262/#sec-function-definitions
	    Parser.prototype.parseFunctionSourceElements = function () {
	        var node = this.createNode();
	        this.expect('{');
	        var body = this.parseDirectivePrologues();
	        var previousLabelSet = this.context.labelSet;
	        var previousInIteration = this.context.inIteration;
	        var previousInSwitch = this.context.inSwitch;
	        var previousInFunctionBody = this.context.inFunctionBody;
	        this.context.labelSet = {};
	        this.context.inIteration = false;
	        this.context.inSwitch = false;
	        this.context.inFunctionBody = true;
	        while (this.lookahead.type !== 2 /* EOF */) {
	            if (this.match('}')) {
	                break;
	            }
	            body.push(this.parseStatementListItem());
	        }
	        this.expect('}');
	        this.context.labelSet = previousLabelSet;
	        this.context.inIteration = previousInIteration;
	        this.context.inSwitch = previousInSwitch;
	        this.context.inFunctionBody = previousInFunctionBody;
	        return this.finalize(node, new Node.BlockStatement(body));
	    };
	    Parser.prototype.validateParam = function (options, param, name) {
	        var key = '$' + name;
	        if (this.context.strict) {
	            if (this.scanner.isRestrictedWord(name)) {
	                options.stricted = param;
	                options.message = messages_1.Messages.StrictParamName;
	            }
	            if (Object.prototype.hasOwnProperty.call(options.paramSet, key)) {
	                options.stricted = param;
	                options.message = messages_1.Messages.StrictParamDupe;
	            }
	        }
	        else if (!options.firstRestricted) {
	            if (this.scanner.isRestrictedWord(name)) {
	                options.firstRestricted = param;
	                options.message = messages_1.Messages.StrictParamName;
	            }
	            else if (this.scanner.isStrictModeReservedWord(name)) {
	                options.firstRestricted = param;
	                options.message = messages_1.Messages.StrictReservedWord;
	            }
	            else if (Object.prototype.hasOwnProperty.call(options.paramSet, key)) {
	                options.stricted = param;
	                options.message = messages_1.Messages.StrictParamDupe;
	            }
	        }
	        /* istanbul ignore next */
	        if (typeof Object.defineProperty === 'function') {
	            Object.defineProperty(options.paramSet, key, { value: true, enumerable: true, writable: true, configurable: true });
	        }
	        else {
	            options.paramSet[key] = true;
	        }
	    };
	    Parser.prototype.parseRestElement = function (params) {
	        var node = this.createNode();
	        this.expect('...');
	        var arg = this.parsePattern(params);
	        if (this.match('=')) {
	            this.throwError(messages_1.Messages.DefaultRestParameter);
	        }
	        if (!this.match(')')) {
	            this.throwError(messages_1.Messages.ParameterAfterRestParameter);
	        }
	        return this.finalize(node, new Node.RestElement(arg));
	    };
	    Parser.prototype.parseFormalParameter = function (options) {
	        var params = [];
	        var param = this.match('...') ? this.parseRestElement(params) : this.parsePatternWithDefault(params);
	        for (var i = 0; i < params.length; i++) {
	            this.validateParam(options, params[i], params[i].value);
	        }
	        options.simple = options.simple && (param instanceof Node.Identifier);
	        options.params.push(param);
	    };
	    Parser.prototype.parseFormalParameters = function (firstRestricted) {
	        var options;
	        options = {
	            simple: true,
	            params: [],
	            firstRestricted: firstRestricted
	        };
	        this.expect('(');
	        if (!this.match(')')) {
	            options.paramSet = {};
	            while (this.lookahead.type !== 2 /* EOF */) {
	                this.parseFormalParameter(options);
	                if (this.match(')')) {
	                    break;
	                }
	                this.expect(',');
	                if (this.match(')')) {
	                    break;
	                }
	            }
	        }
	        this.expect(')');
	        return {
	            simple: options.simple,
	            params: options.params,
	            stricted: options.stricted,
	            firstRestricted: options.firstRestricted,
	            message: options.message
	        };
	    };
	    Parser.prototype.matchAsyncFunction = function () {
	        var match = this.matchContextualKeyword('async');
	        if (match) {
	            var state = this.scanner.saveState();
	            this.scanner.scanComments();
	            var next = this.scanner.lex();
	            this.scanner.restoreState(state);
	            match = (state.lineNumber === next.lineNumber) && (next.type === 4 /* Keyword */) && (next.value === 'function');
	        }
	        return match;
	    };
	    Parser.prototype.parseFunctionDeclaration = function (identifierIsOptional) {
	        var node = this.createNode();
	        var isAsync = this.matchContextualKeyword('async');
	        if (isAsync) {
	            this.nextToken();
	        }
	        this.expectKeyword('function');
	        var isGenerator = isAsync ? false : this.match('*');
	        if (isGenerator) {
	            this.nextToken();
	        }
	        var message;
	        var id = null;
	        var firstRestricted = null;
	        if (!identifierIsOptional || !this.match('(')) {
	            var token = this.lookahead;
	            id = this.parseVariableIdentifier();
	            if (this.context.strict) {
	                if (this.scanner.isRestrictedWord(token.value)) {
	                    this.tolerateUnexpectedToken(token, messages_1.Messages.StrictFunctionName);
	                }
	            }
	            else {
	                if (this.scanner.isRestrictedWord(token.value)) {
	                    firstRestricted = token;
	                    message = messages_1.Messages.StrictFunctionName;
	                }
	                else if (this.scanner.isStrictModeReservedWord(token.value)) {
	                    firstRestricted = token;
	                    message = messages_1.Messages.StrictReservedWord;
	                }
	            }
	        }
	        var previousAllowAwait = this.context.await;
	        var previousAllowYield = this.context.allowYield;
	        this.context.await = isAsync;
	        this.context.allowYield = !isGenerator;
	        var formalParameters = this.parseFormalParameters(firstRestricted);
	        var params = formalParameters.params;
	        var stricted = formalParameters.stricted;
	        firstRestricted = formalParameters.firstRestricted;
	        if (formalParameters.message) {
	            message = formalParameters.message;
	        }
	        var previousStrict = this.context.strict;
	        var previousAllowStrictDirective = this.context.allowStrictDirective;
	        this.context.allowStrictDirective = formalParameters.simple;
	        var body = this.parseFunctionSourceElements();
	        if (this.context.strict && firstRestricted) {
	            this.throwUnexpectedToken(firstRestricted, message);
	        }
	        if (this.context.strict && stricted) {
	            this.tolerateUnexpectedToken(stricted, message);
	        }
	        this.context.strict = previousStrict;
	        this.context.allowStrictDirective = previousAllowStrictDirective;
	        this.context.await = previousAllowAwait;
	        this.context.allowYield = previousAllowYield;
	        return isAsync ? this.finalize(node, new Node.AsyncFunctionDeclaration(id, params, body)) :
	            this.finalize(node, new Node.FunctionDeclaration(id, params, body, isGenerator));
	    };
	    Parser.prototype.parseFunctionExpression = function () {
	        var node = this.createNode();
	        var isAsync = this.matchContextualKeyword('async');
	        if (isAsync) {
	            this.nextToken();
	        }
	        this.expectKeyword('function');
	        var isGenerator = isAsync ? false : this.match('*');
	        if (isGenerator) {
	            this.nextToken();
	        }
	        var message;
	        var id = null;
	        var firstRestricted;
	        var previousAllowAwait = this.context.await;
	        var previousAllowYield = this.context.allowYield;
	        this.context.await = isAsync;
	        this.context.allowYield = !isGenerator;
	        if (!this.match('(')) {
	            var token = this.lookahead;
	            id = (!this.context.strict && !isGenerator && this.matchKeyword('yield')) ? this.parseIdentifierName() : this.parseVariableIdentifier();
	            if (this.context.strict) {
	                if (this.scanner.isRestrictedWord(token.value)) {
	                    this.tolerateUnexpectedToken(token, messages_1.Messages.StrictFunctionName);
	                }
	            }
	            else {
	                if (this.scanner.isRestrictedWord(token.value)) {
	                    firstRestricted = token;
	                    message = messages_1.Messages.StrictFunctionName;
	                }
	                else if (this.scanner.isStrictModeReservedWord(token.value)) {
	                    firstRestricted = token;
	                    message = messages_1.Messages.StrictReservedWord;
	                }
	            }
	        }
	        var formalParameters = this.parseFormalParameters(firstRestricted);
	        var params = formalParameters.params;
	        var stricted = formalParameters.stricted;
	        firstRestricted = formalParameters.firstRestricted;
	        if (formalParameters.message) {
	            message = formalParameters.message;
	        }
	        var previousStrict = this.context.strict;
	        var previousAllowStrictDirective = this.context.allowStrictDirective;
	        this.context.allowStrictDirective = formalParameters.simple;
	        var body = this.parseFunctionSourceElements();
	        if (this.context.strict && firstRestricted) {
	            this.throwUnexpectedToken(firstRestricted, message);
	        }
	        if (this.context.strict && stricted) {
	            this.tolerateUnexpectedToken(stricted, message);
	        }
	        this.context.strict = previousStrict;
	        this.context.allowStrictDirective = previousAllowStrictDirective;
	        this.context.await = previousAllowAwait;
	        this.context.allowYield = previousAllowYield;
	        return isAsync ? this.finalize(node, new Node.AsyncFunctionExpression(id, params, body)) :
	            this.finalize(node, new Node.FunctionExpression(id, params, body, isGenerator));
	    };
	    // https://tc39.github.io/ecma262/#sec-directive-prologues-and-the-use-strict-directive
	    Parser.prototype.parseDirective = function () {
	        var token = this.lookahead;
	        var node = this.createNode();
	        var expr = this.parseExpression();
	        var directive = (expr.type === syntax_1.Syntax.Literal) ? this.getTokenRaw(token).slice(1, -1) : null;
	        this.consumeSemicolon();
	        return this.finalize(node, directive ? new Node.Directive(expr, directive) : new Node.ExpressionStatement(expr));
	    };
	    Parser.prototype.parseDirectivePrologues = function () {
	        var firstRestricted = null;
	        var body = [];
	        while (true) {
	            var token = this.lookahead;
	            if (token.type !== 8 /* StringLiteral */) {
	                break;
	            }
	            var statement = this.parseDirective();
	            body.push(statement);
	            var directive = statement.directive;
	            if (typeof directive !== 'string') {
	                break;
	            }
	            if (directive === 'use strict') {
	                this.context.strict = true;
	                if (firstRestricted) {
	                    this.tolerateUnexpectedToken(firstRestricted, messages_1.Messages.StrictOctalLiteral);
	                }
	                if (!this.context.allowStrictDirective) {
	                    this.tolerateUnexpectedToken(token, messages_1.Messages.IllegalLanguageModeDirective);
	                }
	            }
	            else {
	                if (!firstRestricted && token.octal) {
	                    firstRestricted = token;
	                }
	            }
	        }
	        return body;
	    };
	    // https://tc39.github.io/ecma262/#sec-method-definitions
	    Parser.prototype.qualifiedPropertyName = function (token) {
	        switch (token.type) {
	            case 3 /* Identifier */:
	            case 8 /* StringLiteral */:
	            case 1 /* BooleanLiteral */:
	            case 5 /* NullLiteral */:
	            case 6 /* NumericLiteral */:
	            case 4 /* Keyword */:
	                return true;
	            case 7 /* Punctuator */:
	                return token.value === '[';
	            default:
	                break;
	        }
	        return false;
	    };
	    Parser.prototype.parseGetterMethod = function () {
	        var node = this.createNode();
	        var isGenerator = false;
	        var previousAllowYield = this.context.allowYield;
	        this.context.allowYield = false;
	        var formalParameters = this.parseFormalParameters();
	        if (formalParameters.params.length > 0) {
	            this.tolerateError(messages_1.Messages.BadGetterArity);
	        }
	        var method = this.parsePropertyMethod(formalParameters);
	        this.context.allowYield = previousAllowYield;
	        return this.finalize(node, new Node.FunctionExpression(null, formalParameters.params, method, isGenerator));
	    };
	    Parser.prototype.parseSetterMethod = function () {
	        var node = this.createNode();
	        var isGenerator = false;
	        var previousAllowYield = this.context.allowYield;
	        this.context.allowYield = false;
	        var formalParameters = this.parseFormalParameters();
	        if (formalParameters.params.length !== 1) {
	            this.tolerateError(messages_1.Messages.BadSetterArity);
	        }
	        else if (formalParameters.params[0] instanceof Node.RestElement) {
	            this.tolerateError(messages_1.Messages.BadSetterRestParameter);
	        }
	        var method = this.parsePropertyMethod(formalParameters);
	        this.context.allowYield = previousAllowYield;
	        return this.finalize(node, new Node.FunctionExpression(null, formalParameters.params, method, isGenerator));
	    };
	    Parser.prototype.parseGeneratorMethod = function () {
	        var node = this.createNode();
	        var isGenerator = true;
	        var previousAllowYield = this.context.allowYield;
	        this.context.allowYield = true;
	        var params = this.parseFormalParameters();
	        this.context.allowYield = false;
	        var method = this.parsePropertyMethod(params);
	        this.context.allowYield = previousAllowYield;
	        return this.finalize(node, new Node.FunctionExpression(null, params.params, method, isGenerator));
	    };
	    // https://tc39.github.io/ecma262/#sec-generator-function-definitions
	    Parser.prototype.isStartOfExpression = function () {
	        var start = true;
	        var value = this.lookahead.value;
	        switch (this.lookahead.type) {
	            case 7 /* Punctuator */:
	                start = (value === '[') || (value === '(') || (value === '{') ||
	                    (value === '+') || (value === '-') ||
	                    (value === '!') || (value === '~') ||
	                    (value === '++') || (value === '--') ||
	                    (value === '/') || (value === '/='); // regular expression literal
	                break;
	            case 4 /* Keyword */:
	                start = (value === 'class') || (value === 'delete') ||
	                    (value === 'function') || (value === 'let') || (value === 'new') ||
	                    (value === 'super') || (value === 'this') || (value === 'typeof') ||
	                    (value === 'void') || (value === 'yield');
	                break;
	            default:
	                break;
	        }
	        return start;
	    };
	    Parser.prototype.parseYieldExpression = function () {
	        var node = this.createNode();
	        this.expectKeyword('yield');
	        var argument = null;
	        var delegate = false;
	        if (!this.hasLineTerminator) {
	            var previousAllowYield = this.context.allowYield;
	            this.context.allowYield = false;
	            delegate = this.match('*');
	            if (delegate) {
	                this.nextToken();
	                argument = this.parseAssignmentExpression();
	            }
	            else if (this.isStartOfExpression()) {
	                argument = this.parseAssignmentExpression();
	            }
	            this.context.allowYield = previousAllowYield;
	        }
	        return this.finalize(node, new Node.YieldExpression(argument, delegate));
	    };
	    // https://tc39.github.io/ecma262/#sec-class-definitions
	    Parser.prototype.parseClassElement = function (hasConstructor) {
	        var token = this.lookahead;
	        var node = this.createNode();
	        var kind = '';
	        var key = null;
	        var value = null;
	        var computed = false;
	        var method = false;
	        var isStatic = false;
	        var isAsync = false;
	        if (this.match('*')) {
	            this.nextToken();
	        }
	        else {
	            computed = this.match('[');
	            key = this.parseObjectPropertyKey();
	            var id = key;
	            if (id.name === 'static' && (this.qualifiedPropertyName(this.lookahead) || this.match('*'))) {
	                token = this.lookahead;
	                isStatic = true;
	                computed = this.match('[');
	                if (this.match('*')) {
	                    this.nextToken();
	                }
	                else {
	                    key = this.parseObjectPropertyKey();
	                }
	            }
	            if ((token.type === 3 /* Identifier */) && !this.hasLineTerminator && (token.value === 'async')) {
	                var punctuator = this.lookahead.value;
	                if (punctuator !== ':' && punctuator !== '(' && punctuator !== '*') {
	                    isAsync = true;
	                    token = this.lookahead;
	                    key = this.parseObjectPropertyKey();
	                    if (token.type === 3 /* Identifier */) {
	                        if (token.value === 'get' || token.value === 'set') {
	                            this.tolerateUnexpectedToken(token);
	                        }
	                        else if (token.value === 'constructor') {
	                            this.tolerateUnexpectedToken(token, messages_1.Messages.ConstructorIsAsync);
	                        }
	                    }
	                }
	            }
	        }
	        var lookaheadPropertyKey = this.qualifiedPropertyName(this.lookahead);
	        if (token.type === 3 /* Identifier */) {
	            if (token.value === 'get' && lookaheadPropertyKey) {
	                kind = 'get';
	                computed = this.match('[');
	                key = this.parseObjectPropertyKey();
	                this.context.allowYield = false;
	                value = this.parseGetterMethod();
	            }
	            else if (token.value === 'set' && lookaheadPropertyKey) {
	                kind = 'set';
	                computed = this.match('[');
	                key = this.parseObjectPropertyKey();
	                value = this.parseSetterMethod();
	            }
	        }
	        else if (token.type === 7 /* Punctuator */ && token.value === '*' && lookaheadPropertyKey) {
	            kind = 'init';
	            computed = this.match('[');
	            key = this.parseObjectPropertyKey();
	            value = this.parseGeneratorMethod();
	            method = true;
	        }
	        if (!kind && key && this.match('(')) {
	            kind = 'init';
	            value = isAsync ? this.parsePropertyMethodAsyncFunction() : this.parsePropertyMethodFunction();
	            method = true;
	        }
	        if (!kind) {
	            this.throwUnexpectedToken(this.lookahead);
	        }
	        if (kind === 'init') {
	            kind = 'method';
	        }
	        if (!computed) {
	            if (isStatic && this.isPropertyKey(key, 'prototype')) {
	                this.throwUnexpectedToken(token, messages_1.Messages.StaticPrototype);
	            }
	            if (!isStatic && this.isPropertyKey(key, 'constructor')) {
	                if (kind !== 'method' || !method || (value && value.generator)) {
	                    this.throwUnexpectedToken(token, messages_1.Messages.ConstructorSpecialMethod);
	                }
	                if (hasConstructor.value) {
	                    this.throwUnexpectedToken(token, messages_1.Messages.DuplicateConstructor);
	                }
	                else {
	                    hasConstructor.value = true;
	                }
	                kind = 'constructor';
	            }
	        }
	        return this.finalize(node, new Node.MethodDefinition(key, computed, value, kind, isStatic));
	    };
	    Parser.prototype.parseClassElementList = function () {
	        var body = [];
	        var hasConstructor = { value: false };
	        this.expect('{');
	        while (!this.match('}')) {
	            if (this.match(';')) {
	                this.nextToken();
	            }
	            else {
	                body.push(this.parseClassElement(hasConstructor));
	            }
	        }
	        this.expect('}');
	        return body;
	    };
	    Parser.prototype.parseClassBody = function () {
	        var node = this.createNode();
	        var elementList = this.parseClassElementList();
	        return this.finalize(node, new Node.ClassBody(elementList));
	    };
	    Parser.prototype.parseClassDeclaration = function (identifierIsOptional) {
	        var node = this.createNode();
	        var previousStrict = this.context.strict;
	        this.context.strict = true;
	        this.expectKeyword('class');
	        var id = (identifierIsOptional && (this.lookahead.type !== 3 /* Identifier */)) ? null : this.parseVariableIdentifier();
	        var superClass = null;
	        if (this.matchKeyword('extends')) {
	            this.nextToken();
	            superClass = this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
	        }
	        var classBody = this.parseClassBody();
	        this.context.strict = previousStrict;
	        return this.finalize(node, new Node.ClassDeclaration(id, superClass, classBody));
	    };
	    Parser.prototype.parseClassExpression = function () {
	        var node = this.createNode();
	        var previousStrict = this.context.strict;
	        this.context.strict = true;
	        this.expectKeyword('class');
	        var id = (this.lookahead.type === 3 /* Identifier */) ? this.parseVariableIdentifier() : null;
	        var superClass = null;
	        if (this.matchKeyword('extends')) {
	            this.nextToken();
	            superClass = this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
	        }
	        var classBody = this.parseClassBody();
	        this.context.strict = previousStrict;
	        return this.finalize(node, new Node.ClassExpression(id, superClass, classBody));
	    };
	    // https://tc39.github.io/ecma262/#sec-scripts
	    // https://tc39.github.io/ecma262/#sec-modules
	    Parser.prototype.parseModule = function () {
	        this.context.strict = true;
	        this.context.isModule = true;
	        var node = this.createNode();
	        var body = this.parseDirectivePrologues();
	        while (this.lookahead.type !== 2 /* EOF */) {
	            body.push(this.parseStatementListItem());
	        }
	        return this.finalize(node, new Node.Module(body));
	    };
	    Parser.prototype.parseScript = function () {
	        var node = this.createNode();
	        var body = this.parseDirectivePrologues();
	        while (this.lookahead.type !== 2 /* EOF */) {
	            body.push(this.parseStatementListItem());
	        }
	        return this.finalize(node, new Node.Script(body));
	    };
	    // https://tc39.github.io/ecma262/#sec-imports
	    Parser.prototype.parseModuleSpecifier = function () {
	        var node = this.createNode();
	        if (this.lookahead.type !== 8 /* StringLiteral */) {
	            this.throwError(messages_1.Messages.InvalidModuleSpecifier);
	        }
	        var token = this.nextToken();
	        var raw = this.getTokenRaw(token);
	        return this.finalize(node, new Node.Literal(token.value, raw));
	    };
	    // import {<foo as bar>} ...;
	    Parser.prototype.parseImportSpecifier = function () {
	        var node = this.createNode();
	        var imported;
	        var local;
	        if (this.lookahead.type === 3 /* Identifier */) {
	            imported = this.parseVariableIdentifier();
	            local = imported;
	            if (this.matchContextualKeyword('as')) {
	                this.nextToken();
	                local = this.parseVariableIdentifier();
	            }
	        }
	        else {
	            imported = this.parseIdentifierName();
	            local = imported;
	            if (this.matchContextualKeyword('as')) {
	                this.nextToken();
	                local = this.parseVariableIdentifier();
	            }
	            else {
	                this.throwUnexpectedToken(this.nextToken());
	            }
	        }
	        return this.finalize(node, new Node.ImportSpecifier(local, imported));
	    };
	    // {foo, bar as bas}
	    Parser.prototype.parseNamedImports = function () {
	        this.expect('{');
	        var specifiers = [];
	        while (!this.match('}')) {
	            specifiers.push(this.parseImportSpecifier());
	            if (!this.match('}')) {
	                this.expect(',');
	            }
	        }
	        this.expect('}');
	        return specifiers;
	    };
	    // import <foo> ...;
	    Parser.prototype.parseImportDefaultSpecifier = function () {
	        var node = this.createNode();
	        var local = this.parseIdentifierName();
	        return this.finalize(node, new Node.ImportDefaultSpecifier(local));
	    };
	    // import <* as foo> ...;
	    Parser.prototype.parseImportNamespaceSpecifier = function () {
	        var node = this.createNode();
	        this.expect('*');
	        if (!this.matchContextualKeyword('as')) {
	            this.throwError(messages_1.Messages.NoAsAfterImportNamespace);
	        }
	        this.nextToken();
	        var local = this.parseIdentifierName();
	        return this.finalize(node, new Node.ImportNamespaceSpecifier(local));
	    };
	    Parser.prototype.parseImportDeclaration = function () {
	        if (this.context.inFunctionBody) {
	            this.throwError(messages_1.Messages.IllegalImportDeclaration);
	        }
	        var node = this.createNode();
	        this.expectKeyword('import');
	        var src;
	        var specifiers = [];
	        if (this.lookahead.type === 8 /* StringLiteral */) {
	            // import 'foo';
	            src = this.parseModuleSpecifier();
	        }
	        else {
	            if (this.match('{')) {
	                // import {bar}
	                specifiers = specifiers.concat(this.parseNamedImports());
	            }
	            else if (this.match('*')) {
	                // import * as foo
	                specifiers.push(this.parseImportNamespaceSpecifier());
	            }
	            else if (this.isIdentifierName(this.lookahead) && !this.matchKeyword('default')) {
	                // import foo
	                specifiers.push(this.parseImportDefaultSpecifier());
	                if (this.match(',')) {
	                    this.nextToken();
	                    if (this.match('*')) {
	                        // import foo, * as foo
	                        specifiers.push(this.parseImportNamespaceSpecifier());
	                    }
	                    else if (this.match('{')) {
	                        // import foo, {bar}
	                        specifiers = specifiers.concat(this.parseNamedImports());
	                    }
	                    else {
	                        this.throwUnexpectedToken(this.lookahead);
	                    }
	                }
	            }
	            else {
	                this.throwUnexpectedToken(this.nextToken());
	            }
	            if (!this.matchContextualKeyword('from')) {
	                var message = this.lookahead.value ? messages_1.Messages.UnexpectedToken : messages_1.Messages.MissingFromClause;
	                this.throwError(message, this.lookahead.value);
	            }
	            this.nextToken();
	            src = this.parseModuleSpecifier();
	        }
	        this.consumeSemicolon();
	        return this.finalize(node, new Node.ImportDeclaration(specifiers, src));
	    };
	    // https://tc39.github.io/ecma262/#sec-exports
	    Parser.prototype.parseExportSpecifier = function () {
	        var node = this.createNode();
	        var local = this.parseIdentifierName();
	        var exported = local;
	        if (this.matchContextualKeyword('as')) {
	            this.nextToken();
	            exported = this.parseIdentifierName();
	        }
	        return this.finalize(node, new Node.ExportSpecifier(local, exported));
	    };
	    Parser.prototype.parseExportDeclaration = function () {
	        if (this.context.inFunctionBody) {
	            this.throwError(messages_1.Messages.IllegalExportDeclaration);
	        }
	        var node = this.createNode();
	        this.expectKeyword('export');
	        var exportDeclaration;
	        if (this.matchKeyword('default')) {
	            // export default ...
	            this.nextToken();
	            if (this.matchKeyword('function')) {
	                // export default function foo () {}
	                // export default function () {}
	                var declaration = this.parseFunctionDeclaration(true);
	                exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
	            }
	            else if (this.matchKeyword('class')) {
	                // export default class foo {}
	                var declaration = this.parseClassDeclaration(true);
	                exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
	            }
	            else if (this.matchContextualKeyword('async')) {
	                // export default async function f () {}
	                // export default async function () {}
	                // export default async x => x
	                var declaration = this.matchAsyncFunction() ? this.parseFunctionDeclaration(true) : this.parseAssignmentExpression();
	                exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
	            }
	            else {
	                if (this.matchContextualKeyword('from')) {
	                    this.throwError(messages_1.Messages.UnexpectedToken, this.lookahead.value);
	                }
	                // export default {};
	                // export default [];
	                // export default (1 + 2);
	                var declaration = this.match('{') ? this.parseObjectInitializer() :
	                    this.match('[') ? this.parseArrayInitializer() : this.parseAssignmentExpression();
	                this.consumeSemicolon();
	                exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
	            }
	        }
	        else if (this.match('*')) {
	            // export * from 'foo';
	            this.nextToken();
	            if (!this.matchContextualKeyword('from')) {
	                var message = this.lookahead.value ? messages_1.Messages.UnexpectedToken : messages_1.Messages.MissingFromClause;
	                this.throwError(message, this.lookahead.value);
	            }
	            this.nextToken();
	            var src = this.parseModuleSpecifier();
	            this.consumeSemicolon();
	            exportDeclaration = this.finalize(node, new Node.ExportAllDeclaration(src));
	        }
	        else if (this.lookahead.type === 4 /* Keyword */) {
	            // export var f = 1;
	            var declaration = void 0;
	            switch (this.lookahead.value) {
	                case 'let':
	                case 'const':
	                    declaration = this.parseLexicalDeclaration({ inFor: false });
	                    break;
	                case 'var':
	                case 'class':
	                case 'function':
	                    declaration = this.parseStatementListItem();
	                    break;
	                default:
	                    this.throwUnexpectedToken(this.lookahead);
	            }
	            exportDeclaration = this.finalize(node, new Node.ExportNamedDeclaration(declaration, [], null));
	        }
	        else if (this.matchAsyncFunction()) {
	            var declaration = this.parseFunctionDeclaration();
	            exportDeclaration = this.finalize(node, new Node.ExportNamedDeclaration(declaration, [], null));
	        }
	        else {
	            var specifiers = [];
	            var source = null;
	            var isExportFromIdentifier = false;
	            this.expect('{');
	            while (!this.match('}')) {
	                isExportFromIdentifier = isExportFromIdentifier || this.matchKeyword('default');
	                specifiers.push(this.parseExportSpecifier());
	                if (!this.match('}')) {
	                    this.expect(',');
	                }
	            }
	            this.expect('}');
	            if (this.matchContextualKeyword('from')) {
	                // export {default} from 'foo';
	                // export {foo} from 'foo';
	                this.nextToken();
	                source = this.parseModuleSpecifier();
	                this.consumeSemicolon();
	            }
	            else if (isExportFromIdentifier) {
	                // export {default}; // missing fromClause
	                var message = this.lookahead.value ? messages_1.Messages.UnexpectedToken : messages_1.Messages.MissingFromClause;
	                this.throwError(message, this.lookahead.value);
	            }
	            else {
	                // export {foo};
	                this.consumeSemicolon();
	            }
	            exportDeclaration = this.finalize(node, new Node.ExportNamedDeclaration(null, specifiers, source));
	        }
	        return exportDeclaration;
	    };
	    return Parser;
	}());
	exports.Parser = Parser;


/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	// Ensure the condition is true, otherwise throw an error.
	// This is only to have a better contract semantic, i.e. another safety net
	// to catch a logic error. The condition shall be fulfilled in normal case.
	// Do NOT use this to enforce a certain condition on any user input.
	Object.defineProperty(exports, "__esModule", { value: true });
	function assert(condition, message) {
	    /* istanbul ignore if */
	    if (!condition) {
	        throw new Error('ASSERT: ' + message);
	    }
	}
	exports.assert = assert;


/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	/* tslint:disable:max-classes-per-file */
	Object.defineProperty(exports, "__esModule", { value: true });
	var ErrorHandler = (function () {
	    function ErrorHandler() {
	        this.errors = [];
	        this.tolerant = false;
	    }
	    ErrorHandler.prototype.recordError = function (error) {
	        this.errors.push(error);
	    };
	    ErrorHandler.prototype.tolerate = function (error) {
	        if (this.tolerant) {
	            this.recordError(error);
	        }
	        else {
	            throw error;
	        }
	    };
	    ErrorHandler.prototype.constructError = function (msg, column) {
	        var error = new Error(msg);
	        try {
	            throw error;
	        }
	        catch (base) {
	            /* istanbul ignore else */
	            if (Object.create && Object.defineProperty) {
	                error = Object.create(base);
	                Object.defineProperty(error, 'column', { value: column });
	            }
	        }
	        /* istanbul ignore next */
	        return error;
	    };
	    ErrorHandler.prototype.createError = function (index, line, col, description) {
	        var msg = 'Line ' + line + ': ' + description;
	        var error = this.constructError(msg, col);
	        error.index = index;
	        error.lineNumber = line;
	        error.description = description;
	        return error;
	    };
	    ErrorHandler.prototype.throwError = function (index, line, col, description) {
	        throw this.createError(index, line, col, description);
	    };
	    ErrorHandler.prototype.tolerateError = function (index, line, col, description) {
	        var error = this.createError(index, line, col, description);
	        if (this.tolerant) {
	            this.recordError(error);
	        }
	        else {
	            throw error;
	        }
	    };
	    return ErrorHandler;
	}());
	exports.ErrorHandler = ErrorHandler;


/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	// Error messages should be identical to V8.
	exports.Messages = {
	    BadGetterArity: 'Getter must not have any formal parameters',
	    BadSetterArity: 'Setter must have exactly one formal parameter',
	    BadSetterRestParameter: 'Setter function argument must not be a rest parameter',
	    ConstructorIsAsync: 'Class constructor may not be an async method',
	    ConstructorSpecialMethod: 'Class constructor may not be an accessor',
	    DeclarationMissingInitializer: 'Missing initializer in %0 declaration',
	    DefaultRestParameter: 'Unexpected token =',
	    DuplicateBinding: 'Duplicate binding %0',
	    DuplicateConstructor: 'A class may only have one constructor',
	    DuplicateProtoProperty: 'Duplicate __proto__ fields are not allowed in object literals',
	    ForInOfLoopInitializer: '%0 loop variable declaration may not have an initializer',
	    GeneratorInLegacyContext: 'Generator declarations are not allowed in legacy contexts',
	    IllegalBreak: 'Illegal break statement',
	    IllegalContinue: 'Illegal continue statement',
	    IllegalExportDeclaration: 'Unexpected token',
	    IllegalImportDeclaration: 'Unexpected token',
	    IllegalLanguageModeDirective: 'Illegal \'use strict\' directive in function with non-simple parameter list',
	    IllegalReturn: 'Illegal return statement',
	    InvalidEscapedReservedWord: 'Keyword must not contain escaped characters',
	    InvalidHexEscapeSequence: 'Invalid hexadecimal escape sequence',
	    InvalidLHSInAssignment: 'Invalid left-hand side in assignment',
	    InvalidLHSInForIn: 'Invalid left-hand side in for-in',
	    InvalidLHSInForLoop: 'Invalid left-hand side in for-loop',
	    InvalidModuleSpecifier: 'Unexpected token',
	    InvalidRegExp: 'Invalid regular expression',
	    LetInLexicalBinding: 'let is disallowed as a lexically bound name',
	    MissingFromClause: 'Unexpected token',
	    MultipleDefaultsInSwitch: 'More than one default clause in switch statement',
	    NewlineAfterThrow: 'Illegal newline after throw',
	    NoAsAfterImportNamespace: 'Unexpected token',
	    NoCatchOrFinally: 'Missing catch or finally after try',
	    ParameterAfterRestParameter: 'Rest parameter must be last formal parameter',
	    Redeclaration: '%0 \'%1\' has already been declared',
	    StaticPrototype: 'Classes may not have static property named prototype',
	    StrictCatchVariable: 'Catch variable may not be eval or arguments in strict mode',
	    StrictDelete: 'Delete of an unqualified identifier in strict mode.',
	    StrictFunction: 'In strict mode code, functions can only be declared at top level or inside a block',
	    StrictFunctionName: 'Function name may not be eval or arguments in strict mode',
	    StrictLHSAssignment: 'Assignment to eval or arguments is not allowed in strict mode',
	    StrictLHSPostfix: 'Postfix increment/decrement may not have eval or arguments operand in strict mode',
	    StrictLHSPrefix: 'Prefix increment/decrement may not have eval or arguments operand in strict mode',
	    StrictModeWith: 'Strict mode code may not include a with statement',
	    StrictOctalLiteral: 'Octal literals are not allowed in strict mode.',
	    StrictParamDupe: 'Strict mode function may not have duplicate parameter names',
	    StrictParamName: 'Parameter name eval or arguments is not allowed in strict mode',
	    StrictReservedWord: 'Use of future reserved word in strict mode',
	    StrictVarName: 'Variable name may not be eval or arguments in strict mode',
	    TemplateOctalLiteral: 'Octal literals are not allowed in template strings.',
	    UnexpectedEOS: 'Unexpected end of input',
	    UnexpectedIdentifier: 'Unexpected identifier',
	    UnexpectedNumber: 'Unexpected number',
	    UnexpectedReserved: 'Unexpected reserved word',
	    UnexpectedString: 'Unexpected string',
	    UnexpectedTemplate: 'Unexpected quasi %0',
	    UnexpectedToken: 'Unexpected token %0',
	    UnexpectedTokenIllegal: 'Unexpected token ILLEGAL',
	    UnknownLabel: 'Undefined label \'%0\'',
	    UnterminatedRegExp: 'Invalid regular expression: missing /'
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var assert_1 = __webpack_require__(9);
	var character_1 = __webpack_require__(4);
	var messages_1 = __webpack_require__(11);
	function hexValue(ch) {
	    return '0123456789abcdef'.indexOf(ch.toLowerCase());
	}
	function octalValue(ch) {
	    return '01234567'.indexOf(ch);
	}
	var Scanner = (function () {
	    function Scanner(code, handler) {
	        this.source = code;
	        this.errorHandler = handler;
	        this.trackComment = false;
	        this.length = code.length;
	        this.index = 0;
	        this.lineNumber = (code.length > 0) ? 1 : 0;
	        this.lineStart = 0;
	        this.curlyStack = [];
	    }
	    Scanner.prototype.saveState = function () {
	        return {
	            index: this.index,
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart
	        };
	    };
	    Scanner.prototype.restoreState = function (state) {
	        this.index = state.index;
	        this.lineNumber = state.lineNumber;
	        this.lineStart = state.lineStart;
	    };
	    Scanner.prototype.eof = function () {
	        return this.index >= this.length;
	    };
	    Scanner.prototype.throwUnexpectedToken = function (message) {
	        if (message === void 0) { message = messages_1.Messages.UnexpectedTokenIllegal; }
	        return this.errorHandler.throwError(this.index, this.lineNumber, this.index - this.lineStart + 1, message);
	    };
	    Scanner.prototype.tolerateUnexpectedToken = function (message) {
	        if (message === void 0) { message = messages_1.Messages.UnexpectedTokenIllegal; }
	        this.errorHandler.tolerateError(this.index, this.lineNumber, this.index - this.lineStart + 1, message);
	    };
	    // https://tc39.github.io/ecma262/#sec-comments
	    Scanner.prototype.skipSingleLineComment = function (offset) {
	        var comments = [];
	        var start, loc;
	        if (this.trackComment) {
	            comments = [];
	            start = this.index - offset;
	            loc = {
	                start: {
	                    line: this.lineNumber,
	                    column: this.index - this.lineStart - offset
	                },
	                end: {}
	            };
	        }
	        while (!this.eof()) {
	            var ch = this.source.charCodeAt(this.index);
	            ++this.index;
	            if (character_1.Character.isLineTerminator(ch)) {
	                if (this.trackComment) {
	                    loc.end = {
	                        line: this.lineNumber,
	                        column: this.index - this.lineStart - 1
	                    };
	                    var entry = {
	                        multiLine: false,
	                        slice: [start + offset, this.index - 1],
	                        range: [start, this.index - 1],
	                        loc: loc
	                    };
	                    comments.push(entry);
	                }
	                if (ch === 13 && this.source.charCodeAt(this.index) === 10) {
	                    ++this.index;
	                }
	                ++this.lineNumber;
	                this.lineStart = this.index;
	                return comments;
	            }
	        }
	        if (this.trackComment) {
	            loc.end = {
	                line: this.lineNumber,
	                column: this.index - this.lineStart
	            };
	            var entry = {
	                multiLine: false,
	                slice: [start + offset, this.index],
	                range: [start, this.index],
	                loc: loc
	            };
	            comments.push(entry);
	        }
	        return comments;
	    };
	    Scanner.prototype.skipMultiLineComment = function () {
	        var comments = [];
	        var start, loc;
	        if (this.trackComment) {
	            comments = [];
	            start = this.index - 2;
	            loc = {
	                start: {
	                    line: this.lineNumber,
	                    column: this.index - this.lineStart - 2
	                },
	                end: {}
	            };
	        }
	        while (!this.eof()) {
	            var ch = this.source.charCodeAt(this.index);
	            if (character_1.Character.isLineTerminator(ch)) {
	                if (ch === 0x0D && this.source.charCodeAt(this.index + 1) === 0x0A) {
	                    ++this.index;
	                }
	                ++this.lineNumber;
	                ++this.index;
	                this.lineStart = this.index;
	            }
	            else if (ch === 0x2A) {
	                // Block comment ends with '*/'.
	                if (this.source.charCodeAt(this.index + 1) === 0x2F) {
	                    this.index += 2;
	                    if (this.trackComment) {
	                        loc.end = {
	                            line: this.lineNumber,
	                            column: this.index - this.lineStart
	                        };
	                        var entry = {
	                            multiLine: true,
	                            slice: [start + 2, this.index - 2],
	                            range: [start, this.index],
	                            loc: loc
	                        };
	                        comments.push(entry);
	                    }
	                    return comments;
	                }
	                ++this.index;
	            }
	            else {
	                ++this.index;
	            }
	        }
	        // Ran off the end of the file - the whole thing is a comment
	        if (this.trackComment) {
	            loc.end = {
	                line: this.lineNumber,
	                column: this.index - this.lineStart
	            };
	            var entry = {
	                multiLine: true,
	                slice: [start + 2, this.index],
	                range: [start, this.index],
	                loc: loc
	            };
	            comments.push(entry);
	        }
	        this.tolerateUnexpectedToken();
	        return comments;
	    };
	    Scanner.prototype.scanComments = function () {
	        var comments;
	        if (this.trackComment) {
	            comments = [];
	        }
	        var start = (this.index === 0);
	        while (!this.eof()) {
	            var ch = this.source.charCodeAt(this.index);
	            if (character_1.Character.isWhiteSpace(ch)) {
	                ++this.index;
	            }
	            else if (character_1.Character.isLineTerminator(ch)) {
	                ++this.index;
	                if (ch === 0x0D && this.source.charCodeAt(this.index) === 0x0A) {
	                    ++this.index;
	                }
	                ++this.lineNumber;
	                this.lineStart = this.index;
	                start = true;
	            }
	            else if (ch === 0x2F) {
	                ch = this.source.charCodeAt(this.index + 1);
	                if (ch === 0x2F) {
	                    this.index += 2;
	                    var comment = this.skipSingleLineComment(2);
	                    if (this.trackComment) {
	                        comments = comments.concat(comment);
	                    }
	                    start = true;
	                }
	                else if (ch === 0x2A) {
	                    this.index += 2;
	                    var comment = this.skipMultiLineComment();
	                    if (this.trackComment) {
	                        comments = comments.concat(comment);
	                    }
	                }
	                else {
	                    break;
	                }
	            }
	            else if (start && ch === 0x2D) {
	                // U+003E is '>'
	                if ((this.source.charCodeAt(this.index + 1) === 0x2D) && (this.source.charCodeAt(this.index + 2) === 0x3E)) {
	                    // '-->' is a single-line comment
	                    this.index += 3;
	                    var comment = this.skipSingleLineComment(3);
	                    if (this.trackComment) {
	                        comments = comments.concat(comment);
	                    }
	                }
	                else {
	                    break;
	                }
	            }
	            else if (ch === 0x3C) {
	                if (this.source.slice(this.index + 1, this.index + 4) === '!--') {
	                    this.index += 4; // `<!--`
	                    var comment = this.skipSingleLineComment(4);
	                    if (this.trackComment) {
	                        comments = comments.concat(comment);
	                    }
	                }
	                else {
	                    break;
	                }
	            }
	            else {
	                break;
	            }
	        }
	        return comments;
	    };
	    // https://tc39.github.io/ecma262/#sec-future-reserved-words
	    Scanner.prototype.isFutureReservedWord = function (id) {
	        switch (id) {
	            case 'enum':
	            case 'export':
	            case 'import':
	            case 'super':
	                return true;
	            default:
	                return false;
	        }
	    };
	    Scanner.prototype.isStrictModeReservedWord = function (id) {
	        switch (id) {
	            case 'implements':
	            case 'interface':
	            case 'package':
	            case 'private':
	            case 'protected':
	            case 'public':
	            case 'static':
	            case 'yield':
	            case 'let':
	                return true;
	            default:
	                return false;
	        }
	    };
	    Scanner.prototype.isRestrictedWord = function (id) {
	        return id === 'eval' || id === 'arguments';
	    };
	    // https://tc39.github.io/ecma262/#sec-keywords
	    Scanner.prototype.isKeyword = function (id) {
	        switch (id.length) {
	            case 2:
	                return (id === 'if') || (id === 'in') || (id === 'do');
	            case 3:
	                return (id === 'var') || (id === 'for') || (id === 'new') ||
	                    (id === 'try') || (id === 'let');
	            case 4:
	                return (id === 'this') || (id === 'else') || (id === 'case') ||
	                    (id === 'void') || (id === 'with') || (id === 'enum');
	            case 5:
	                return (id === 'while') || (id === 'break') || (id === 'catch') ||
	                    (id === 'throw') || (id === 'const') || (id === 'yield') ||
	                    (id === 'class') || (id === 'super');
	            case 6:
	                return (id === 'return') || (id === 'typeof') || (id === 'delete') ||
	                    (id === 'switch') || (id === 'export') || (id === 'import');
	            case 7:
	                return (id === 'default') || (id === 'finally') || (id === 'extends');
	            case 8:
	                return (id === 'function') || (id === 'continue') || (id === 'debugger');
	            case 10:
	                return (id === 'instanceof');
	            default:
	                return false;
	        }
	    };
	    Scanner.prototype.codePointAt = function (i) {
	        var cp = this.source.charCodeAt(i);
	        if (cp >= 0xD800 && cp <= 0xDBFF) {
	            var second = this.source.charCodeAt(i + 1);
	            if (second >= 0xDC00 && second <= 0xDFFF) {
	                var first = cp;
	                cp = (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
	            }
	        }
	        return cp;
	    };
	    Scanner.prototype.scanHexEscape = function (prefix) {
	        var len = (prefix === 'u') ? 4 : 2;
	        var code = 0;
	        for (var i = 0; i < len; ++i) {
	            if (!this.eof() && character_1.Character.isHexDigit(this.source.charCodeAt(this.index))) {
	                code = code * 16 + hexValue(this.source[this.index++]);
	            }
	            else {
	                return null;
	            }
	        }
	        return String.fromCharCode(code);
	    };
	    Scanner.prototype.scanUnicodeCodePointEscape = function () {
	        var ch = this.source[this.index];
	        var code = 0;
	        // At least, one hex digit is required.
	        if (ch === '}') {
	            this.throwUnexpectedToken();
	        }
	        while (!this.eof()) {
	            ch = this.source[this.index++];
	            if (!character_1.Character.isHexDigit(ch.charCodeAt(0))) {
	                break;
	            }
	            code = code * 16 + hexValue(ch);
	        }
	        if (code > 0x10FFFF || ch !== '}') {
	            this.throwUnexpectedToken();
	        }
	        return character_1.Character.fromCodePoint(code);
	    };
	    Scanner.prototype.getIdentifier = function () {
	        var start = this.index++;
	        while (!this.eof()) {
	            var ch = this.source.charCodeAt(this.index);
	            if (ch === 0x5C) {
	                // Blackslash (U+005C) marks Unicode escape sequence.
	                this.index = start;
	                return this.getComplexIdentifier();
	            }
	            else if (ch >= 0xD800 && ch < 0xDFFF) {
	                // Need to handle surrogate pairs.
	                this.index = start;
	                return this.getComplexIdentifier();
	            }
	            if (character_1.Character.isIdentifierPart(ch)) {
	                ++this.index;
	            }
	            else {
	                break;
	            }
	        }
	        return this.source.slice(start, this.index);
	    };
	    Scanner.prototype.getComplexIdentifier = function () {
	        var cp = this.codePointAt(this.index);
	        var id = character_1.Character.fromCodePoint(cp);
	        this.index += id.length;
	        // '\u' (U+005C, U+0075) denotes an escaped character.
	        var ch;
	        if (cp === 0x5C) {
	            if (this.source.charCodeAt(this.index) !== 0x75) {
	                this.throwUnexpectedToken();
	            }
	            ++this.index;
	            if (this.source[this.index] === '{') {
	                ++this.index;
	                ch = this.scanUnicodeCodePointEscape();
	            }
	            else {
	                ch = this.scanHexEscape('u');
	                if (ch === null || ch === '\\' || !character_1.Character.isIdentifierStart(ch.charCodeAt(0))) {
	                    this.throwUnexpectedToken();
	                }
	            }
	            id = ch;
	        }
	        while (!this.eof()) {
	            cp = this.codePointAt(this.index);
	            if (!character_1.Character.isIdentifierPart(cp)) {
	                break;
	            }
	            ch = character_1.Character.fromCodePoint(cp);
	            id += ch;
	            this.index += ch.length;
	            // '\u' (U+005C, U+0075) denotes an escaped character.
	            if (cp === 0x5C) {
	                id = id.substr(0, id.length - 1);
	                if (this.source.charCodeAt(this.index) !== 0x75) {
	                    this.throwUnexpectedToken();
	                }
	                ++this.index;
	                if (this.source[this.index] === '{') {
	                    ++this.index;
	                    ch = this.scanUnicodeCodePointEscape();
	                }
	                else {
	                    ch = this.scanHexEscape('u');
	                    if (ch === null || ch === '\\' || !character_1.Character.isIdentifierPart(ch.charCodeAt(0))) {
	                        this.throwUnexpectedToken();
	                    }
	                }
	                id += ch;
	            }
	        }
	        return id;
	    };
	    Scanner.prototype.octalToDecimal = function (ch) {
	        // \0 is not octal escape sequence
	        var octal = (ch !== '0');
	        var code = octalValue(ch);
	        if (!this.eof() && character_1.Character.isOctalDigit(this.source.charCodeAt(this.index))) {
	            octal = true;
	            code = code * 8 + octalValue(this.source[this.index++]);
	            // 3 digits are only allowed when string starts
	            // with 0, 1, 2, 3
	            if ('0123'.indexOf(ch) >= 0 && !this.eof() && character_1.Character.isOctalDigit(this.source.charCodeAt(this.index))) {
	                code = code * 8 + octalValue(this.source[this.index++]);
	            }
	        }
	        return {
	            code: code,
	            octal: octal
	        };
	    };
	    // https://tc39.github.io/ecma262/#sec-names-and-keywords
	    Scanner.prototype.scanIdentifier = function () {
	        var type;
	        var start = this.index;
	        // Backslash (U+005C) starts an escaped character.
	        var id = (this.source.charCodeAt(start) === 0x5C) ? this.getComplexIdentifier() : this.getIdentifier();
	        // There is no keyword or literal with only one character.
	        // Thus, it must be an identifier.
	        if (id.length === 1) {
	            type = 3 /* Identifier */;
	        }
	        else if (this.isKeyword(id)) {
	            type = 4 /* Keyword */;
	        }
	        else if (id === 'null') {
	            type = 5 /* NullLiteral */;
	        }
	        else if (id === 'true' || id === 'false') {
	            type = 1 /* BooleanLiteral */;
	        }
	        else {
	            type = 3 /* Identifier */;
	        }
	        if (type !== 3 /* Identifier */ && (start + id.length !== this.index)) {
	            var restore = this.index;
	            this.index = start;
	            this.tolerateUnexpectedToken(messages_1.Messages.InvalidEscapedReservedWord);
	            this.index = restore;
	        }
	        return {
	            type: type,
	            value: id,
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    // https://tc39.github.io/ecma262/#sec-punctuators
	    Scanner.prototype.scanPunctuator = function () {
	        var start = this.index;
	        // Check for most common single-character punctuators.
	        var str = this.source[this.index];
	        switch (str) {
	            case '(':
	            case '{':
	                if (str === '{') {
	                    this.curlyStack.push('{');
	                }
	                ++this.index;
	                break;
	            case '.':
	                ++this.index;
	                if (this.source[this.index] === '.' && this.source[this.index + 1] === '.') {
	                    // Spread operator: ...
	                    this.index += 2;
	                    str = '...';
	                }
	                break;
	            case '}':
	                ++this.index;
	                this.curlyStack.pop();
	                break;
	            case ')':
	            case ';':
	            case ',':
	            case '[':
	            case ']':
	            case ':':
	            case '?':
	            case '~':
	                ++this.index;
	                break;
	            default:
	                // 4-character punctuator.
	                str = this.source.substr(this.index, 4);
	                if (str === '>>>=') {
	                    this.index += 4;
	                }
	                else {
	                    // 3-character punctuators.
	                    str = str.substr(0, 3);
	                    if (str === '===' || str === '!==' || str === '>>>' ||
	                        str === '<<=' || str === '>>=' || str === '**=') {
	                        this.index += 3;
	                    }
	                    else {
	                        // 2-character punctuators.
	                        str = str.substr(0, 2);
	                        if (str === '&&' || str === '||' || str === '==' || str === '!=' ||
	                            str === '+=' || str === '-=' || str === '*=' || str === '/=' ||
	                            str === '++' || str === '--' || str === '<<' || str === '>>' ||
	                            str === '&=' || str === '|=' || str === '^=' || str === '%=' ||
	                            str === '<=' || str === '>=' || str === '=>' || str === '**') {
	                            this.index += 2;
	                        }
	                        else {
	                            // 1-character punctuators.
	                            str = this.source[this.index];
	                            if ('<>=!+-*%&|^/'.indexOf(str) >= 0) {
	                                ++this.index;
	                            }
	                        }
	                    }
	                }
	        }
	        if (this.index === start) {
	            this.throwUnexpectedToken();
	        }
	        return {
	            type: 7 /* Punctuator */,
	            value: str,
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    // https://tc39.github.io/ecma262/#sec-literals-numeric-literals
	    Scanner.prototype.scanHexLiteral = function (start) {
	        var num = '';
	        while (!this.eof()) {
	            if (!character_1.Character.isHexDigit(this.source.charCodeAt(this.index))) {
	                break;
	            }
	            num += this.source[this.index++];
	        }
	        if (num.length === 0) {
	            this.throwUnexpectedToken();
	        }
	        if (character_1.Character.isIdentifierStart(this.source.charCodeAt(this.index))) {
	            this.throwUnexpectedToken();
	        }
	        return {
	            type: 6 /* NumericLiteral */,
	            value: parseInt('0x' + num, 16),
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    Scanner.prototype.scanBinaryLiteral = function (start) {
	        var num = '';
	        var ch;
	        while (!this.eof()) {
	            ch = this.source[this.index];
	            if (ch !== '0' && ch !== '1') {
	                break;
	            }
	            num += this.source[this.index++];
	        }
	        if (num.length === 0) {
	            // only 0b or 0B
	            this.throwUnexpectedToken();
	        }
	        if (!this.eof()) {
	            ch = this.source.charCodeAt(this.index);
	            /* istanbul ignore else */
	            if (character_1.Character.isIdentifierStart(ch) || character_1.Character.isDecimalDigit(ch)) {
	                this.throwUnexpectedToken();
	            }
	        }
	        return {
	            type: 6 /* NumericLiteral */,
	            value: parseInt(num, 2),
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    Scanner.prototype.scanOctalLiteral = function (prefix, start) {
	        var num = '';
	        var octal = false;
	        if (character_1.Character.isOctalDigit(prefix.charCodeAt(0))) {
	            octal = true;
	            num = '0' + this.source[this.index++];
	        }
	        else {
	            ++this.index;
	        }
	        while (!this.eof()) {
	            if (!character_1.Character.isOctalDigit(this.source.charCodeAt(this.index))) {
	                break;
	            }
	            num += this.source[this.index++];
	        }
	        if (!octal && num.length === 0) {
	            // only 0o or 0O
	            this.throwUnexpectedToken();
	        }
	        if (character_1.Character.isIdentifierStart(this.source.charCodeAt(this.index)) || character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
	            this.throwUnexpectedToken();
	        }
	        return {
	            type: 6 /* NumericLiteral */,
	            value: parseInt(num, 8),
	            octal: octal,
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    Scanner.prototype.isImplicitOctalLiteral = function () {
	        // Implicit octal, unless there is a non-octal digit.
	        // (Annex B.1.1 on Numeric Literals)
	        for (var i = this.index + 1; i < this.length; ++i) {
	            var ch = this.source[i];
	            if (ch === '8' || ch === '9') {
	                return false;
	            }
	            if (!character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
	                return true;
	            }
	        }
	        return true;
	    };
	    Scanner.prototype.scanNumericLiteral = function () {
	        var start = this.index;
	        var ch = this.source[start];
	        assert_1.assert(character_1.Character.isDecimalDigit(ch.charCodeAt(0)) || (ch === '.'), 'Numeric literal must start with a decimal digit or a decimal point');
	        var num = '';
	        if (ch !== '.') {
	            num = this.source[this.index++];
	            ch = this.source[this.index];
	            // Hex number starts with '0x'.
	            // Octal number starts with '0'.
	            // Octal number in ES6 starts with '0o'.
	            // Binary number in ES6 starts with '0b'.
	            if (num === '0') {
	                if (ch === 'x' || ch === 'X') {
	                    ++this.index;
	                    return this.scanHexLiteral(start);
	                }
	                if (ch === 'b' || ch === 'B') {
	                    ++this.index;
	                    return this.scanBinaryLiteral(start);
	                }
	                if (ch === 'o' || ch === 'O') {
	                    return this.scanOctalLiteral(ch, start);
	                }
	                if (ch && character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
	                    if (this.isImplicitOctalLiteral()) {
	                        return this.scanOctalLiteral(ch, start);
	                    }
	                }
	            }
	            while (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
	                num += this.source[this.index++];
	            }
	            ch = this.source[this.index];
	        }
	        if (ch === '.') {
	            num += this.source[this.index++];
	            while (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
	                num += this.source[this.index++];
	            }
	            ch = this.source[this.index];
	        }
	        if (ch === 'e' || ch === 'E') {
	            num += this.source[this.index++];
	            ch = this.source[this.index];
	            if (ch === '+' || ch === '-') {
	                num += this.source[this.index++];
	            }
	            if (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
	                while (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
	                    num += this.source[this.index++];
	                }
	            }
	            else {
	                this.throwUnexpectedToken();
	            }
	        }
	        if (character_1.Character.isIdentifierStart(this.source.charCodeAt(this.index))) {
	            this.throwUnexpectedToken();
	        }
	        return {
	            type: 6 /* NumericLiteral */,
	            value: parseFloat(num),
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    // https://tc39.github.io/ecma262/#sec-literals-string-literals
	    Scanner.prototype.scanStringLiteral = function () {
	        var start = this.index;
	        var quote = this.source[start];
	        assert_1.assert((quote === '\'' || quote === '"'), 'String literal must starts with a quote');
	        ++this.index;
	        var octal = false;
	        var str = '';
	        while (!this.eof()) {
	            var ch = this.source[this.index++];
	            if (ch === quote) {
	                quote = '';
	                break;
	            }
	            else if (ch === '\\') {
	                ch = this.source[this.index++];
	                if (!ch || !character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
	                    switch (ch) {
	                        case 'u':
	                            if (this.source[this.index] === '{') {
	                                ++this.index;
	                                str += this.scanUnicodeCodePointEscape();
	                            }
	                            else {
	                                var unescaped_1 = this.scanHexEscape(ch);
	                                if (unescaped_1 === null) {
	                                    this.throwUnexpectedToken();
	                                }
	                                str += unescaped_1;
	                            }
	                            break;
	                        case 'x':
	                            var unescaped = this.scanHexEscape(ch);
	                            if (unescaped === null) {
	                                this.throwUnexpectedToken(messages_1.Messages.InvalidHexEscapeSequence);
	                            }
	                            str += unescaped;
	                            break;
	                        case 'n':
	                            str += '\n';
	                            break;
	                        case 'r':
	                            str += '\r';
	                            break;
	                        case 't':
	                            str += '\t';
	                            break;
	                        case 'b':
	                            str += '\b';
	                            break;
	                        case 'f':
	                            str += '\f';
	                            break;
	                        case 'v':
	                            str += '\x0B';
	                            break;
	                        case '8':
	                        case '9':
	                            str += ch;
	                            this.tolerateUnexpectedToken();
	                            break;
	                        default:
	                            if (ch && character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
	                                var octToDec = this.octalToDecimal(ch);
	                                octal = octToDec.octal || octal;
	                                str += String.fromCharCode(octToDec.code);
	                            }
	                            else {
	                                str += ch;
	                            }
	                            break;
	                    }
	                }
	                else {
	                    ++this.lineNumber;
	                    if (ch === '\r' && this.source[this.index] === '\n') {
	                        ++this.index;
	                    }
	                    this.lineStart = this.index;
	                }
	            }
	            else if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
	                break;
	            }
	            else {
	                str += ch;
	            }
	        }
	        if (quote !== '') {
	            this.index = start;
	            this.throwUnexpectedToken();
	        }
	        return {
	            type: 8 /* StringLiteral */,
	            value: str,
	            octal: octal,
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    // https://tc39.github.io/ecma262/#sec-template-literal-lexical-components
	    Scanner.prototype.scanTemplate = function () {
	        var cooked = '';
	        var terminated = false;
	        var start = this.index;
	        var head = (this.source[start] === '`');
	        var tail = false;
	        var rawOffset = 2;
	        ++this.index;
	        while (!this.eof()) {
	            var ch = this.source[this.index++];
	            if (ch === '`') {
	                rawOffset = 1;
	                tail = true;
	                terminated = true;
	                break;
	            }
	            else if (ch === '$') {
	                if (this.source[this.index] === '{') {
	                    this.curlyStack.push('${');
	                    ++this.index;
	                    terminated = true;
	                    break;
	                }
	                cooked += ch;
	            }
	            else if (ch === '\\') {
	                ch = this.source[this.index++];
	                if (!character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
	                    switch (ch) {
	                        case 'n':
	                            cooked += '\n';
	                            break;
	                        case 'r':
	                            cooked += '\r';
	                            break;
	                        case 't':
	                            cooked += '\t';
	                            break;
	                        case 'u':
	                            if (this.source[this.index] === '{') {
	                                ++this.index;
	                                cooked += this.scanUnicodeCodePointEscape();
	                            }
	                            else {
	                                var restore = this.index;
	                                var unescaped_2 = this.scanHexEscape(ch);
	                                if (unescaped_2 !== null) {
	                                    cooked += unescaped_2;
	                                }
	                                else {
	                                    this.index = restore;
	                                    cooked += ch;
	                                }
	                            }
	                            break;
	                        case 'x':
	                            var unescaped = this.scanHexEscape(ch);
	                            if (unescaped === null) {
	                                this.throwUnexpectedToken(messages_1.Messages.InvalidHexEscapeSequence);
	                            }
	                            cooked += unescaped;
	                            break;
	                        case 'b':
	                            cooked += '\b';
	                            break;
	                        case 'f':
	                            cooked += '\f';
	                            break;
	                        case 'v':
	                            cooked += '\v';
	                            break;
	                        default:
	                            if (ch === '0') {
	                                if (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
	                                    // Illegal: \01 \02 and so on
	                                    this.throwUnexpectedToken(messages_1.Messages.TemplateOctalLiteral);
	                                }
	                                cooked += '\0';
	                            }
	                            else if (character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
	                                // Illegal: \1 \2
	                                this.throwUnexpectedToken(messages_1.Messages.TemplateOctalLiteral);
	                            }
	                            else {
	                                cooked += ch;
	                            }
	                            break;
	                    }
	                }
	                else {
	                    ++this.lineNumber;
	                    if (ch === '\r' && this.source[this.index] === '\n') {
	                        ++this.index;
	                    }
	                    this.lineStart = this.index;
	                }
	            }
	            else if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
	                ++this.lineNumber;
	                if (ch === '\r' && this.source[this.index] === '\n') {
	                    ++this.index;
	                }
	                this.lineStart = this.index;
	                cooked += '\n';
	            }
	            else {
	                cooked += ch;
	            }
	        }
	        if (!terminated) {
	            this.throwUnexpectedToken();
	        }
	        if (!head) {
	            this.curlyStack.pop();
	        }
	        return {
	            type: 10 /* Template */,
	            value: this.source.slice(start + 1, this.index - rawOffset),
	            cooked: cooked,
	            head: head,
	            tail: tail,
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    // https://tc39.github.io/ecma262/#sec-literals-regular-expression-literals
	    Scanner.prototype.testRegExp = function (pattern, flags) {
	        // The BMP character to use as a replacement for astral symbols when
	        // translating an ES6 "u"-flagged pattern to an ES5-compatible
	        // approximation.
	        // Note: replacing with '\uFFFF' enables false positives in unlikely
	        // scenarios. For example, `[\u{1044f}-\u{10440}]` is an invalid
	        // pattern that would not be detected by this substitution.
	        var astralSubstitute = '\uFFFF';
	        var tmp = pattern;
	        var self = this;
	        if (flags.indexOf('u') >= 0) {
	            tmp = tmp
	                .replace(/\\u\{([0-9a-fA-F]+)\}|\\u([a-fA-F0-9]{4})/g, function ($0, $1, $2) {
	                var codePoint = parseInt($1 || $2, 16);
	                if (codePoint > 0x10FFFF) {
	                    self.throwUnexpectedToken(messages_1.Messages.InvalidRegExp);
	                }
	                if (codePoint <= 0xFFFF) {
	                    return String.fromCharCode(codePoint);
	                }
	                return astralSubstitute;
	            })
	                .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, astralSubstitute);
	        }
	        // First, detect invalid regular expressions.
	        try {
	            RegExp(tmp);
	        }
	        catch (e) {
	            this.throwUnexpectedToken(messages_1.Messages.InvalidRegExp);
	        }
	        // Return a regular expression object for this pattern-flag pair, or
	        // `null` in case the current environment doesn't support the flags it
	        // uses.
	        try {
	            return new RegExp(pattern, flags);
	        }
	        catch (exception) {
	            /* istanbul ignore next */
	            return null;
	        }
	    };
	    Scanner.prototype.scanRegExpBody = function () {
	        var ch = this.source[this.index];
	        assert_1.assert(ch === '/', 'Regular expression literal must start with a slash');
	        var str = this.source[this.index++];
	        var classMarker = false;
	        var terminated = false;
	        while (!this.eof()) {
	            ch = this.source[this.index++];
	            str += ch;
	            if (ch === '\\') {
	                ch = this.source[this.index++];
	                // https://tc39.github.io/ecma262/#sec-literals-regular-expression-literals
	                if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
	                    this.throwUnexpectedToken(messages_1.Messages.UnterminatedRegExp);
	                }
	                str += ch;
	            }
	            else if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
	                this.throwUnexpectedToken(messages_1.Messages.UnterminatedRegExp);
	            }
	            else if (classMarker) {
	                if (ch === ']') {
	                    classMarker = false;
	                }
	            }
	            else {
	                if (ch === '/') {
	                    terminated = true;
	                    break;
	                }
	                else if (ch === '[') {
	                    classMarker = true;
	                }
	            }
	        }
	        if (!terminated) {
	            this.throwUnexpectedToken(messages_1.Messages.UnterminatedRegExp);
	        }
	        // Exclude leading and trailing slash.
	        return str.substr(1, str.length - 2);
	    };
	    Scanner.prototype.scanRegExpFlags = function () {
	        var str = '';
	        var flags = '';
	        while (!this.eof()) {
	            var ch = this.source[this.index];
	            if (!character_1.Character.isIdentifierPart(ch.charCodeAt(0))) {
	                break;
	            }
	            ++this.index;
	            if (ch === '\\' && !this.eof()) {
	                ch = this.source[this.index];
	                if (ch === 'u') {
	                    ++this.index;
	                    var restore = this.index;
	                    var char = this.scanHexEscape('u');
	                    if (char !== null) {
	                        flags += char;
	                        for (str += '\\u'; restore < this.index; ++restore) {
	                            str += this.source[restore];
	                        }
	                    }
	                    else {
	                        this.index = restore;
	                        flags += 'u';
	                        str += '\\u';
	                    }
	                    this.tolerateUnexpectedToken();
	                }
	                else {
	                    str += '\\';
	                    this.tolerateUnexpectedToken();
	                }
	            }
	            else {
	                flags += ch;
	                str += ch;
	            }
	        }
	        return flags;
	    };
	    Scanner.prototype.scanRegExp = function () {
	        var start = this.index;
	        var pattern = this.scanRegExpBody();
	        var flags = this.scanRegExpFlags();
	        var value = this.testRegExp(pattern, flags);
	        return {
	            type: 9 /* RegularExpression */,
	            value: '',
	            pattern: pattern,
	            flags: flags,
	            regex: value,
	            lineNumber: this.lineNumber,
	            lineStart: this.lineStart,
	            start: start,
	            end: this.index
	        };
	    };
	    Scanner.prototype.lex = function () {
	        if (this.eof()) {
	            return {
	                type: 2 /* EOF */,
	                value: '',
	                lineNumber: this.lineNumber,
	                lineStart: this.lineStart,
	                start: this.index,
	                end: this.index
	            };
	        }
	        var cp = this.source.charCodeAt(this.index);
	        if (character_1.Character.isIdentifierStart(cp)) {
	            return this.scanIdentifier();
	        }
	        // Very common: ( and ) and ;
	        if (cp === 0x28 || cp === 0x29 || cp === 0x3B) {
	            return this.scanPunctuator();
	        }
	        // String literal starts with single quote (U+0027) or double quote (U+0022).
	        if (cp === 0x27 || cp === 0x22) {
	            return this.scanStringLiteral();
	        }
	        // Dot (.) U+002E can also start a floating-point number, hence the need
	        // to check the next character.
	        if (cp === 0x2E) {
	            if (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index + 1))) {
	                return this.scanNumericLiteral();
	            }
	            return this.scanPunctuator();
	        }
	        if (character_1.Character.isDecimalDigit(cp)) {
	            return this.scanNumericLiteral();
	        }
	        // Template literals start with ` (U+0060) for template head
	        // or } (U+007D) for template middle or template tail.
	        if (cp === 0x60 || (cp === 0x7D && this.curlyStack[this.curlyStack.length - 1] === '${')) {
	            return this.scanTemplate();
	        }
	        // Possible identifier start in a surrogate pair.
	        if (cp >= 0xD800 && cp < 0xDFFF) {
	            if (character_1.Character.isIdentifierStart(this.codePointAt(this.index))) {
	                return this.scanIdentifier();
	            }
	        }
	        return this.scanPunctuator();
	    };
	    return Scanner;
	}());
	exports.Scanner = Scanner;


/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.TokenName = {};
	exports.TokenName[1 /* BooleanLiteral */] = 'Boolean';
	exports.TokenName[2 /* EOF */] = '<end>';
	exports.TokenName[3 /* Identifier */] = 'Identifier';
	exports.TokenName[4 /* Keyword */] = 'Keyword';
	exports.TokenName[5 /* NullLiteral */] = 'Null';
	exports.TokenName[6 /* NumericLiteral */] = 'Numeric';
	exports.TokenName[7 /* Punctuator */] = 'Punctuator';
	exports.TokenName[8 /* StringLiteral */] = 'String';
	exports.TokenName[9 /* RegularExpression */] = 'RegularExpression';
	exports.TokenName[10 /* Template */] = 'Template';


/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	// Generated by generate-xhtml-entities.js. DO NOT MODIFY!
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.XHTMLEntities = {
	    quot: '\u0022',
	    amp: '\u0026',
	    apos: '\u0027',
	    gt: '\u003E',
	    nbsp: '\u00A0',
	    iexcl: '\u00A1',
	    cent: '\u00A2',
	    pound: '\u00A3',
	    curren: '\u00A4',
	    yen: '\u00A5',
	    brvbar: '\u00A6',
	    sect: '\u00A7',
	    uml: '\u00A8',
	    copy: '\u00A9',
	    ordf: '\u00AA',
	    laquo: '\u00AB',
	    not: '\u00AC',
	    shy: '\u00AD',
	    reg: '\u00AE',
	    macr: '\u00AF',
	    deg: '\u00B0',
	    plusmn: '\u00B1',
	    sup2: '\u00B2',
	    sup3: '\u00B3',
	    acute: '\u00B4',
	    micro: '\u00B5',
	    para: '\u00B6',
	    middot: '\u00B7',
	    cedil: '\u00B8',
	    sup1: '\u00B9',
	    ordm: '\u00BA',
	    raquo: '\u00BB',
	    frac14: '\u00BC',
	    frac12: '\u00BD',
	    frac34: '\u00BE',
	    iquest: '\u00BF',
	    Agrave: '\u00C0',
	    Aacute: '\u00C1',
	    Acirc: '\u00C2',
	    Atilde: '\u00C3',
	    Auml: '\u00C4',
	    Aring: '\u00C5',
	    AElig: '\u00C6',
	    Ccedil: '\u00C7',
	    Egrave: '\u00C8',
	    Eacute: '\u00C9',
	    Ecirc: '\u00CA',
	    Euml: '\u00CB',
	    Igrave: '\u00CC',
	    Iacute: '\u00CD',
	    Icirc: '\u00CE',
	    Iuml: '\u00CF',
	    ETH: '\u00D0',
	    Ntilde: '\u00D1',
	    Ograve: '\u00D2',
	    Oacute: '\u00D3',
	    Ocirc: '\u00D4',
	    Otilde: '\u00D5',
	    Ouml: '\u00D6',
	    times: '\u00D7',
	    Oslash: '\u00D8',
	    Ugrave: '\u00D9',
	    Uacute: '\u00DA',
	    Ucirc: '\u00DB',
	    Uuml: '\u00DC',
	    Yacute: '\u00DD',
	    THORN: '\u00DE',
	    szlig: '\u00DF',
	    agrave: '\u00E0',
	    aacute: '\u00E1',
	    acirc: '\u00E2',
	    atilde: '\u00E3',
	    auml: '\u00E4',
	    aring: '\u00E5',
	    aelig: '\u00E6',
	    ccedil: '\u00E7',
	    egrave: '\u00E8',
	    eacute: '\u00E9',
	    ecirc: '\u00EA',
	    euml: '\u00EB',
	    igrave: '\u00EC',
	    iacute: '\u00ED',
	    icirc: '\u00EE',
	    iuml: '\u00EF',
	    eth: '\u00F0',
	    ntilde: '\u00F1',
	    ograve: '\u00F2',
	    oacute: '\u00F3',
	    ocirc: '\u00F4',
	    otilde: '\u00F5',
	    ouml: '\u00F6',
	    divide: '\u00F7',
	    oslash: '\u00F8',
	    ugrave: '\u00F9',
	    uacute: '\u00FA',
	    ucirc: '\u00FB',
	    uuml: '\u00FC',
	    yacute: '\u00FD',
	    thorn: '\u00FE',
	    yuml: '\u00FF',
	    OElig: '\u0152',
	    oelig: '\u0153',
	    Scaron: '\u0160',
	    scaron: '\u0161',
	    Yuml: '\u0178',
	    fnof: '\u0192',
	    circ: '\u02C6',
	    tilde: '\u02DC',
	    Alpha: '\u0391',
	    Beta: '\u0392',
	    Gamma: '\u0393',
	    Delta: '\u0394',
	    Epsilon: '\u0395',
	    Zeta: '\u0396',
	    Eta: '\u0397',
	    Theta: '\u0398',
	    Iota: '\u0399',
	    Kappa: '\u039A',
	    Lambda: '\u039B',
	    Mu: '\u039C',
	    Nu: '\u039D',
	    Xi: '\u039E',
	    Omicron: '\u039F',
	    Pi: '\u03A0',
	    Rho: '\u03A1',
	    Sigma: '\u03A3',
	    Tau: '\u03A4',
	    Upsilon: '\u03A5',
	    Phi: '\u03A6',
	    Chi: '\u03A7',
	    Psi: '\u03A8',
	    Omega: '\u03A9',
	    alpha: '\u03B1',
	    beta: '\u03B2',
	    gamma: '\u03B3',
	    delta: '\u03B4',
	    epsilon: '\u03B5',
	    zeta: '\u03B6',
	    eta: '\u03B7',
	    theta: '\u03B8',
	    iota: '\u03B9',
	    kappa: '\u03BA',
	    lambda: '\u03BB',
	    mu: '\u03BC',
	    nu: '\u03BD',
	    xi: '\u03BE',
	    omicron: '\u03BF',
	    pi: '\u03C0',
	    rho: '\u03C1',
	    sigmaf: '\u03C2',
	    sigma: '\u03C3',
	    tau: '\u03C4',
	    upsilon: '\u03C5',
	    phi: '\u03C6',
	    chi: '\u03C7',
	    psi: '\u03C8',
	    omega: '\u03C9',
	    thetasym: '\u03D1',
	    upsih: '\u03D2',
	    piv: '\u03D6',
	    ensp: '\u2002',
	    emsp: '\u2003',
	    thinsp: '\u2009',
	    zwnj: '\u200C',
	    zwj: '\u200D',
	    lrm: '\u200E',
	    rlm: '\u200F',
	    ndash: '\u2013',
	    mdash: '\u2014',
	    lsquo: '\u2018',
	    rsquo: '\u2019',
	    sbquo: '\u201A',
	    ldquo: '\u201C',
	    rdquo: '\u201D',
	    bdquo: '\u201E',
	    dagger: '\u2020',
	    Dagger: '\u2021',
	    bull: '\u2022',
	    hellip: '\u2026',
	    permil: '\u2030',
	    prime: '\u2032',
	    Prime: '\u2033',
	    lsaquo: '\u2039',
	    rsaquo: '\u203A',
	    oline: '\u203E',
	    frasl: '\u2044',
	    euro: '\u20AC',
	    image: '\u2111',
	    weierp: '\u2118',
	    real: '\u211C',
	    trade: '\u2122',
	    alefsym: '\u2135',
	    larr: '\u2190',
	    uarr: '\u2191',
	    rarr: '\u2192',
	    darr: '\u2193',
	    harr: '\u2194',
	    crarr: '\u21B5',
	    lArr: '\u21D0',
	    uArr: '\u21D1',
	    rArr: '\u21D2',
	    dArr: '\u21D3',
	    hArr: '\u21D4',
	    forall: '\u2200',
	    part: '\u2202',
	    exist: '\u2203',
	    empty: '\u2205',
	    nabla: '\u2207',
	    isin: '\u2208',
	    notin: '\u2209',
	    ni: '\u220B',
	    prod: '\u220F',
	    sum: '\u2211',
	    minus: '\u2212',
	    lowast: '\u2217',
	    radic: '\u221A',
	    prop: '\u221D',
	    infin: '\u221E',
	    ang: '\u2220',
	    and: '\u2227',
	    or: '\u2228',
	    cap: '\u2229',
	    cup: '\u222A',
	    int: '\u222B',
	    there4: '\u2234',
	    sim: '\u223C',
	    cong: '\u2245',
	    asymp: '\u2248',
	    ne: '\u2260',
	    equiv: '\u2261',
	    le: '\u2264',
	    ge: '\u2265',
	    sub: '\u2282',
	    sup: '\u2283',
	    nsub: '\u2284',
	    sube: '\u2286',
	    supe: '\u2287',
	    oplus: '\u2295',
	    otimes: '\u2297',
	    perp: '\u22A5',
	    sdot: '\u22C5',
	    lceil: '\u2308',
	    rceil: '\u2309',
	    lfloor: '\u230A',
	    rfloor: '\u230B',
	    loz: '\u25CA',
	    spades: '\u2660',
	    clubs: '\u2663',
	    hearts: '\u2665',
	    diams: '\u2666',
	    lang: '\u27E8',
	    rang: '\u27E9'
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var error_handler_1 = __webpack_require__(10);
	var scanner_1 = __webpack_require__(12);
	var token_1 = __webpack_require__(13);
	var Reader = (function () {
	    function Reader() {
	        this.values = [];
	        this.curly = this.paren = -1;
	    }
	    // A function following one of those tokens is an expression.
	    Reader.prototype.beforeFunctionExpression = function (t) {
	        return ['(', '{', '[', 'in', 'typeof', 'instanceof', 'new',
	            'return', 'case', 'delete', 'throw', 'void',
	            // assignment operators
	            '=', '+=', '-=', '*=', '**=', '/=', '%=', '<<=', '>>=', '>>>=',
	            '&=', '|=', '^=', ',',
	            // binary/unary operators
	            '+', '-', '*', '**', '/', '%', '++', '--', '<<', '>>', '>>>', '&',
	            '|', '^', '!', '~', '&&', '||', '?', ':', '===', '==', '>=',
	            '<=', '<', '>', '!=', '!=='].indexOf(t) >= 0;
	    };
	    // Determine if forward slash (/) is an operator or part of a regular expression
	    // https://github.com/mozilla/sweet.js/wiki/design
	    Reader.prototype.isRegexStart = function () {
	        var previous = this.values[this.values.length - 1];
	        var regex = (previous !== null);
	        switch (previous) {
	            case 'this':
	            case ']':
	                regex = false;
	                break;
	            case ')':
	                var keyword = this.values[this.paren - 1];
	                regex = (keyword === 'if' || keyword === 'while' || keyword === 'for' || keyword === 'with');
	                break;
	            case '}':
	                // Dividing a function by anything makes little sense,
	                // but we have to check for that.
	                regex = false;
	                if (this.values[this.curly - 3] === 'function') {
	                    // Anonymous function, e.g. function(){} /42
	                    var check = this.values[this.curly - 4];
	                    regex = check ? !this.beforeFunctionExpression(check) : false;
	                }
	                else if (this.values[this.curly - 4] === 'function') {
	                    // Named function, e.g. function f(){} /42/
	                    var check = this.values[this.curly - 5];
	                    regex = check ? !this.beforeFunctionExpression(check) : true;
	                }
	                break;
	            default:
	                break;
	        }
	        return regex;
	    };
	    Reader.prototype.push = function (token) {
	        if (token.type === 7 /* Punctuator */ || token.type === 4 /* Keyword */) {
	            if (token.value === '{') {
	                this.curly = this.values.length;
	            }
	            else if (token.value === '(') {
	                this.paren = this.values.length;
	            }
	            this.values.push(token.value);
	        }
	        else {
	            this.values.push(null);
	        }
	    };
	    return Reader;
	}());
	var Tokenizer = (function () {
	    function Tokenizer(code, config) {
	        this.errorHandler = new error_handler_1.ErrorHandler();
	        this.errorHandler.tolerant = config ? (typeof config.tolerant === 'boolean' && config.tolerant) : false;
	        this.scanner = new scanner_1.Scanner(code, this.errorHandler);
	        this.scanner.trackComment = config ? (typeof config.comment === 'boolean' && config.comment) : false;
	        this.trackRange = config ? (typeof config.range === 'boolean' && config.range) : false;
	        this.trackLoc = config ? (typeof config.loc === 'boolean' && config.loc) : false;
	        this.buffer = [];
	        this.reader = new Reader();
	    }
	    Tokenizer.prototype.errors = function () {
	        return this.errorHandler.errors;
	    };
	    Tokenizer.prototype.getNextToken = function () {
	        if (this.buffer.length === 0) {
	            var comments = this.scanner.scanComments();
	            if (this.scanner.trackComment) {
	                for (var i = 0; i < comments.length; ++i) {
	                    var e = comments[i];
	                    var value = this.scanner.source.slice(e.slice[0], e.slice[1]);
	                    var comment = {
	                        type: e.multiLine ? 'BlockComment' : 'LineComment',
	                        value: value
	                    };
	                    if (this.trackRange) {
	                        comment.range = e.range;
	                    }
	                    if (this.trackLoc) {
	                        comment.loc = e.loc;
	                    }
	                    this.buffer.push(comment);
	                }
	            }
	            if (!this.scanner.eof()) {
	                var loc = void 0;
	                if (this.trackLoc) {
	                    loc = {
	                        start: {
	                            line: this.scanner.lineNumber,
	                            column: this.scanner.index - this.scanner.lineStart
	                        },
	                        end: {}
	                    };
	                }
	                var startRegex = (this.scanner.source[this.scanner.index] === '/') && this.reader.isRegexStart();
	                var token = startRegex ? this.scanner.scanRegExp() : this.scanner.lex();
	                this.reader.push(token);
	                var entry = {
	                    type: token_1.TokenName[token.type],
	                    value: this.scanner.source.slice(token.start, token.end)
	                };
	                if (this.trackRange) {
	                    entry.range = [token.start, token.end];
	                }
	                if (this.trackLoc) {
	                    loc.end = {
	                        line: this.scanner.lineNumber,
	                        column: this.scanner.index - this.scanner.lineStart
	                    };
	                    entry.loc = loc;
	                }
	                if (token.type === 9 /* RegularExpression */) {
	                    var pattern = token.pattern;
	                    var flags = token.flags;
	                    entry.regex = { pattern: pattern, flags: flags };
	                }
	                this.buffer.push(entry);
	            }
	        }
	        return this.buffer.shift();
	    };
	    return Tokenizer;
	}());
	exports.Tokenizer = Tokenizer;


/***/ }
/******/ ])
});
;

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_analytics__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_sequence__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_sequence___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_vue_sequence__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_sequence_dist_vue_sequence_css__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_sequence_dist_vue_sequence_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_vue_sequence_dist_vue_sequence_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_dom_to_image__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_dom_to_image___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_dom_to_image__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_file_saver__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_file_saver___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_file_saver__);
/* eslint-disable sort-imports */











__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */])
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component('seq-diagram', __WEBPACK_IMPORTED_MODULE_3_vue_sequence__["SeqDiagram"])

const store = new __WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */].Store({
  modules: {
    Store: __WEBPACK_IMPORTED_MODULE_3_vue_sequence__["Store"]
  }
})

/* eslint-disable */
window.app = new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
  el: '#demo',
  store
})

window.domtoimage = __WEBPACK_IMPORTED_MODULE_5_dom_to_image___default.a
window.saveAs = __WEBPACK_IMPORTED_MODULE_6_file_saver___default.a.saveAs

function downloadPng() {
	var node = document.getElementById('diagram')
	__WEBPACK_IMPORTED_MODULE_5_dom_to_image___default.a.toBlob(document.getElementById('diagram'), {bgcolor: 'white'})
		.then(function (blob) {
			window.saveAs(blob, 'zenuml.png');
			Object(__WEBPACK_IMPORTED_MODULE_2__src_analytics__["a" /* trackEvent */])('ui', 'downloadPng');
		});
}
window.downloadPng = downloadPng
console.log('Using vue-sequence', __WEBPACK_IMPORTED_MODULE_3_vue_sequence__["Version"])

document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('btnDownloadPng').addEventListener('click', downloadPng);
});


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global, setImmediate) {/*!
 * Vue.js v2.5.16
 * (c) 2014-2018 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value e.g. [object Object]
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it... e.g.
 * PhantomJS 1.x. Technically we don't need this anymore since native bind is
 * now more performant in most browsers, but removing it would be breaking for
 * code that was able to run in PhantomJS 1.x, so this must be kept for
 * backwards compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: process.env.NODE_ENV !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
})

/*  */

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (process.env.NODE_ENV !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm || {};
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */


var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  if (!getter && arguments.length === 2) {
    val = obj[key];
  }
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (process.env.NODE_ENV !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    process.env.NODE_ENV !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!/^[a-zA-Z][\w-]*$/.test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'can only contain alphanumeric characters and the hyphen, ' +
      'and must start with a letter.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (process.env.NODE_ENV !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    process.env.NODE_ENV !== 'production' &&
    // skip validation for weex recycle-list child component props
    !(false && isObject(value) && ('@binding' in value))
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (process.env.NODE_ENV !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      "Invalid prop: type check failed for prop \"" + name + "\"." +
      " Expected " + (expectedTypes.map(capitalize).join(', ')) +
      ", got " + (toRawType(value)) + ".",
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

/*  */

function handleError (err, vm, info) {
  if (vm) {
    var cur = vm;
    while ((cur = cur.$parent)) {
      var hooks = cur.$options.errorCaptured;
      if (hooks) {
        for (var i = 0; i < hooks.length; i++) {
          try {
            var capture = hooks[i].call(cur, err, vm, info) === false;
            if (capture) { return }
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook');
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info);
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      logError(e, null, 'config.errorHandler');
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (process.env.NODE_ENV !== 'production') {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */
/* globals MessageChannel */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using both microtasks and (macro) tasks.
// In < 2.4 we used microtasks everywhere, but there are some scenarios where
// microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using (macro) tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use microtask by default, but expose a way to force (macro) task when
// needed (e.g. in event handlers attached by v-on).
var microTimerFunc;
var macroTimerFunc;
var useMacroTask = false;

// Determine (macro) task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  // PhantomJS
  MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = function () {
    port.postMessage(1);
  };
} else {
  /* istanbul ignore next */
  macroTimerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

// Determine microtask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  microTimerFunc = function () {
    p.then(flushCallbacks);
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a (macro) task instead of a microtask.
 */
function withMacroTask (fn) {
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true;
    var res = fn.apply(null, arguments);
    useMacroTask = false;
    return res
  })
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

var mark;
var measure;

if (process.env.NODE_ENV !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (process.env.NODE_ENV !== 'production') {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, def, cur, old, event;
  for (name in on) {
    def = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    /* istanbul ignore if */
    if (isUndef(cur)) {
      process.env.NODE_ENV !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (process.env.NODE_ENV !== 'production') {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      process.env.NODE_ENV !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                process.env.NODE_ENV !== 'production'
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once) {
  if (once) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    if (fn) {
      // specific handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1);
          break
        }
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (process.env.NODE_ENV !== 'production') {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, null, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (process.env.NODE_ENV !== 'production') {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$1 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$1; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = process.env.NODE_ENV !== 'production'
    ? expOrFn.toString()
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      process.env.NODE_ENV !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {
      defineReactive(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (process.env.NODE_ENV !== 'production' && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : userDef;
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  if (process.env.NODE_ENV !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (process.env.NODE_ENV !== 'production') {
      if (methods[key] == null) {
        warn(
          "Method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        defineReactive(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {
        defineReactive(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject).filter(function (key) {
        /* istanbul ignore next */
        return Object.getOwnPropertyDescriptor(inject, key).enumerable
      })
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (process.env.NODE_ENV !== 'production') {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if (process.env.NODE_ENV !== 'production' && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes) {
      if (process.env.NODE_ENV !== 'production' && slotNodes._rendered) {
        warn(
          "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
          "- this will likely cause render errors.",
          this
        );
      }
      slotNodes._rendered = true;
    }
    nodes = slotNodes || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () { return resolveSlots(children, parent); };

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = data.scopedSlots || emptyObject;
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */




// Register the component hook to weex native render engine.
// The hook will be triggered by native, not javascript.


// Updates the state of the component to weex native render engine.

/*  */

// https://github.com/Hanks10100/weex-native-directive/tree/master/component

// listening on native callback

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  // Weex specific: invoke recycle-list optimized @render function for
  // extracting cell-slot template.
  // https://github.com/Hanks10100/weex-native-directive/tree/master/component
  /* istanbul ignore if */
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var options = {
    _isComponent: true,
    parent: parent,
    _parentVnode: vnode,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    hooks[key] = componentVNodeHooks[key];
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    process.env.NODE_ENV !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (process.env.NODE_ENV !== 'production' &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    // reset _rendered flag on slots for duplicate slot check
    if (process.env.NODE_ENV !== 'production') {
      for (var key in vm.$slots) {
        // $flow-disable-line
        vm.$slots[key]._rendered = false;
      }
    }

    if (_parentVnode) {
      vm.$scopedSlots = _parentVnode.data.scopedSlots || emptyObject;
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } catch (e) {
            handleError(e, vm, "renderError");
            vnode = vm._vnode;
          }
        } else {
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (process.env.NODE_ENV !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache, key, this$1.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
}

var builtInComponents = {
  KeepAlive: KeepAlive
}

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.5.16';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      process.env.NODE_ENV !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setStyleScope (node, scopeId) {
  node.setAttribute(scopeId, '');
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setStyleScope: setStyleScope
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
}

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!isDef(key)) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove () {
      if (--remove.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove.listeners = listeners;
    return remove
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;

  function createElm (
    vnode,
    insertedVnodeQueue,
    parentElm,
    refElm,
    nested,
    ownerArray,
    index
  ) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (process.env.NODE_ENV !== 'production') {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }

      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if (process.env.NODE_ENV !== 'production') {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    if (process.env.NODE_ENV !== 'production') {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    if (process.env.NODE_ENV !== 'production') {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (process.env.NODE_ENV !== 'production') {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
}

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
]

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr (el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.
    /* istanbul ignore if */
    if (
      isIE && !isIE9 &&
      el.tagName === 'TEXTAREA' &&
      key === 'placeholder' && !el.__ieph
    ) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };
      el.addEventListener('input', blocker);
      // $flow-disable-line
      el.__ieph = true; /* IE placeholder patched */
    }
    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
}

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
}

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + (args !== ')' ? ',' + args : args))
  }
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue compiler]: " + msg));
}

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
  el.plain = false;
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
  el.plain = false;
}

// add a raw attr (use this in preTransforms)
function addRawAttr (el, name, value) {
  el.attrsMap[name] = value;
  el.attrsList.push({ name: name, value: value });
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
  el.plain = false;
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn
) {
  modifiers = modifiers || emptyObject;
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    process.env.NODE_ENV !== 'production' && warn &&
    modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.'
    );
  }

  // check capture modifier
  if (modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  /* istanbul ignore if */
  if (modifiers.passive) {
    delete modifiers.passive;
    name = '&' + name; // mark the event as passive
  }

  // normalize click.right and click.middle since they don't actually fire
  // this is technically browser-specific, but at least for now browsers are
  // the only target envs that have right/middle clicks.
  if (name === 'click') {
    if (modifiers.right) {
      name = 'contextmenu';
      delete modifiers.right;
    } else if (modifiers.middle) {
      name = 'mouseup';
    }
  }

  var events;
  if (modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }

  var newHandler = {
    value: value.trim()
  };
  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers;
  }

  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }

  el.plain = false;
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.
function getAndRemoveAttr (
  el,
  name,
  removeFromMap
) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  if (removeFromMap) {
    delete el.attrsMap[name];
  }
  return val
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
      "? " + baseValueExpression + ".trim()" +
      ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: ("\"" + value + "\""),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var res = parseModel(value);
  if (res.key === null) {
    return (value + "=" + assignment)
  } else {
    return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
  }
}

/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */

var len;
var str;
var chr;
var index$1;
var expressionPos;
var expressionEndPos;



function parseModel (val) {
  // Fix https://github.com/vuejs/vue/pull/7730
  // allow v-model="obj.val " (trailing whitespace)
  val = val.trim();
  len = val.length;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    index$1 = val.lastIndexOf('.');
    if (index$1 > -1) {
      return {
        exp: val.slice(0, index$1),
        key: '"' + val.slice(index$1 + 1) + '"'
      }
    } else {
      return {
        exp: val,
        key: null
      }
    }
  }

  str = val;
  index$1 = expressionPos = expressionEndPos = 0;

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  if (process.env.NODE_ENV !== 'production') {
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead."
      );
    }
  }

  if (el.component) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (process.env.NODE_ENV !== 'production') {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.'
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
    "?_i(" + value + "," + valueBinding + ")>-1" + (
      trueValueBinding === 'true'
        ? (":(" + value + ")")
        : (":_q(" + value + "," + trueValueBinding + ")")
    )
  );
  addHandler(el, 'change',
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$el.checked){$$i<0&&(" + (genAssignmentCode(value, '$$a.concat([$$v])')) + ")}" +
      "else{$$i>-1&&(" + (genAssignmentCode(value, '$$a.slice(0,$$i).concat($$a.slice($$i+1))')) + ")}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;

  // warn if v-bind:value conflicts with v-model
  // except for inputs with v-bind:type
  if (process.env.NODE_ENV !== 'production') {
    var value$1 = el.attrsMap['v-bind:value'] || el.attrsMap[':value'];
    var typeBinding = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    if (value$1 && !typeBinding) {
      var binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value';
      warn$1(
        binding + "=\"" + value$1 + "\" conflicts with v-model on the same element " +
        'because the latter already expands to a value binding internally'
      );
    }
  }

  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler (handler, event, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  handler = withMacroTask(handler);
  if (once$$1) { handler = createOnceHandler(handler, event, capture); }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    event,
    handler._withTask || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
}

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.lazy) {
      // inputs with lazy should only be updated when not in focus
      return false
    }
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
}

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def) {
  if (!def) {
    return
  }
  /* istanbul ignore else */
  if (typeof def === 'object') {
    var res = {};
    if (def.css !== false) {
      extend(res, autoCssTransition(def.name || 'v'));
    }
    extend(res, def);
    return res
  } else if (typeof def === 'string') {
    return autoCssTransition(def)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled) {
        addTransitionClass(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {}

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
]

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd);
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    process.env.NODE_ENV !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (!value === !oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
}

var platformDirectives = {
  model: directive,
  show: show
}

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (process.env.NODE_ENV !== 'production' &&
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
}

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (process.env.NODE_ENV !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
}

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
}

/*  */

// install platform specific utils
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else if (
        process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'test' &&
        isChrome
      ) {
        console[console.info ? 'info' : 'log'](
          'Download the Vue Devtools extension for a better development experience:\n' +
          'https://github.com/vuejs/vue-devtools'
        );
      }
    }
    if (process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      config.productionTip !== false &&
      typeof console !== 'undefined'
    ) {
      console[console.info ? 'info' : 'log'](
        "You are running Vue in development mode.\n" +
        "Make sure to turn on production mode when deploying for production.\n" +
        "See more tips at https://vuejs.org/guide/deployment.html"
      );
    }
  }, 0);
}

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});



function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var rawTokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index, tokenValue;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      rawTokens.push(tokenValue = text.slice(lastIndex, index));
      tokens.push(JSON.stringify(tokenValue));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    rawTokens.push({ '@binding': exp });
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex));
    tokens.push(JSON.stringify(tokenValue));
  }
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if (process.env.NODE_ENV !== 'production' && staticClass) {
    var res = parseText(staticClass, options.delimiters);
    if (res) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.'
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData
}

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      var res = parseText(staticStyle, options.delimiters);
      if (res) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.'
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$1
}

/*  */

var decoder;

var he = {
  decode: function decode (html) {
    decoder = decoder || document.createElement('div');
    decoder.innerHTML = html;
    return decoder.textContent
  }
}

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// Regular Expressions for parsing tags and attributes
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp(("^<" + qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
var doctype = /^<!DOCTYPE [^>]+>/i;
// #7298: escape - to avoid being pased as HTML comment when inlined in page
var comment = /^<!\--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10|#9);/g;

// #5992
var isIgnoreNewlineTag = makeMap('pre,textarea', true);
var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd));
            }
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          if (shouldIgnoreFirstNewline(lastTag, html)) {
            advance(1);
          }
          continue
        }
      }

      var text = (void 0), rest = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest = html.slice(textEnd);
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!\--([\s\S]*?)-->/g, '$1') // #7298
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if (process.env.NODE_ENV !== 'production' && !stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3]; }
        if (args[4] === '') { delete args[4]; }
        if (args[5] === '') { delete args[5]; }
      }
      var value = args[3] || args[4] || args[5] || '';
      var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
        ? options.shouldDecodeNewlinesForHref
        : options.shouldDecodeNewlines;
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if (process.env.NODE_ENV !== 'production' &&
          (i > pos || !tagName) &&
          options.warn
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /([^]*?)\s+(?:in|of)\s+([^]*)/;
var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var stripParensRE = /^\(|\)$/g;

var argRE = /:(.*)$/;
var bindRE = /^:|^v-bind:/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(he.decode);

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;



function createASTElement (
  tag,
  attrs,
  parent
) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    parent: parent,
    children: []
  }
}

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;

  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;

  transforms = pluckModuleFunction(options.modules, 'transformNode');
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg) {
    if (!warned) {
      warned = true;
      warn$2(msg);
    }
  }

  function closeElement (element) {
    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
    // apply post-transforms
    for (var i = 0; i < postTransforms.length; i++) {
      postTransforms[i](element, options);
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    start: function start (tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = createASTElement(tag, attrs, currentParent);
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        process.env.NODE_ENV !== 'production' && warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.'
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element;
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else if (!element.processed) {
        // structural directives
        processFor(element);
        processIf(element);
        processOnce(element);
        // element-scope stuff
        processElement(element, options);
      }

      function checkRootConstraints (el) {
        if (process.env.NODE_ENV !== 'production') {
          if (el.tag === 'slot' || el.tag === 'template') {
            warnOnce(
              "Cannot use <" + (el.tag) + "> as component root element because it may " +
              'contain multiple nodes.'
            );
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warnOnce(
              'Cannot use v-for on stateful component root element because ' +
              'it renders multiple elements.'
            );
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else if (process.env.NODE_ENV !== 'production') {
          warnOnce(
            "Component template should contain exactly one root element. " +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead."
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) { // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        closeElement(element);
      }
    },

    end: function end () {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      closeElement(element);
    },

    chars: function chars (text) {
      if (!currentParent) {
        if (process.env.NODE_ENV !== 'production') {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.'
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored.")
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      text = inPre || text.trim()
        ? isTextTag(currentParent) ? text : decodeHTMLCached(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var res;
        if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
          children.push({
            type: 2,
            expression: res.expression,
            tokens: res.tokens,
            text: text
          });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          children.push({
            type: 3,
            text: text
          });
        }
      }
    },
    comment: function comment (text) {
      currentParent.children.push({
        type: 3,
        text: text,
        isComment: true
      });
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processElement (element, options) {
  processKey(element);

  // determine whether this is a plain element after
  // removing structural attributes
  element.plain = !element.key && !element.attrsList.length;

  processRef(element);
  processSlot(element);
  processComponent(element);
  for (var i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element;
  }
  processAttrs(element);
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if (process.env.NODE_ENV !== 'production' && el.tag === 'template') {
      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var res = parseFor(exp);
    if (res) {
      extend(el, res);
    } else if (process.env.NODE_ENV !== 'production') {
      warn$2(
        ("Invalid v-for expression: " + exp)
      );
    }
  }
}



function parseFor (exp) {
  var inMatch = exp.match(forAliasRE);
  if (!inMatch) { return }
  var res = {};
  res.for = inMatch[2].trim();
  var alias = inMatch[1].trim().replace(stripParensRE, '');
  var iteratorMatch = alias.match(forIteratorRE);
  if (iteratorMatch) {
    res.alias = alias.replace(forIteratorRE, '');
    res.iterator1 = iteratorMatch[1].trim();
    if (iteratorMatch[2]) {
      res.iterator2 = iteratorMatch[2].trim();
    }
  } else {
    res.alias = alias;
  }
  return res
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else if (process.env.NODE_ENV !== 'production') {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if."
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if (process.env.NODE_ENV !== 'production' && children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored."
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

function processSlot (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if (process.env.NODE_ENV !== 'production' && el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead."
      );
    }
  } else {
    var slotScope;
    if (el.tag === 'template') {
      slotScope = getAndRemoveAttr(el, 'scope');
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && slotScope) {
        warn$2(
          "the \"scope\" attribute for scoped slots have been deprecated and " +
          "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " +
          "can also be used on plain elements in addition to <template> to " +
          "denote scoped slots.",
          true
        );
      }
      el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
    } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && el.attrsMap['v-for']) {
        warn$2(
          "Ambiguous combined usage of slot-scope and v-for on <" + (el.tag) + "> " +
          "(v-for takes higher priority). Use a wrapper <template> for the " +
          "scoped slot to make it clearer.",
          true
        );
      }
      el.slotScope = slotScope;
    }
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
      // preserve slot as an attribute for native shadow DOM compat
      // only for non-scoped slots.
      if (el.tag !== 'template' && !el.slotScope) {
        addAttr(el, 'slot', slotTarget);
      }
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            addHandler(
              el,
              ("update:" + (camelize(name))),
              genAssignmentCode(value, "$event")
            );
          }
        }
        if (isProp || (
          !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
        )) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers, false, warn$2);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        if (process.env.NODE_ENV !== 'production' && name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      if (process.env.NODE_ENV !== 'production') {
        var res = parseText(value, delimiters);
        if (res) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.'
          );
        }
      }
      addAttr(el, name, JSON.stringify(value));
      // #6887 firefox doesn't update muted state if set via attribute
      // even immediately after element creation
      if (!el.component &&
          name === 'muted' &&
          platformMustUseProp(el.tag, el.attrsMap.type, name)) {
        addProp(el, name, 'true');
      }
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      process.env.NODE_ENV !== 'production' &&
      map[attrs[i].name] && !isIE && !isEdge
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead."
      );
    }
    _el = _el.parent;
  }
}

/*  */

/**
 * Expand input[v-model] with dyanmic type bindings into v-if-else chains
 * Turn this:
 *   <input v-model="data[type]" :type="type">
 * into this:
 *   <input v-if="type === 'checkbox'" type="checkbox" v-model="data[type]">
 *   <input v-else-if="type === 'radio'" type="radio" v-model="data[type]">
 *   <input v-else :type="type" v-model="data[type]">
 */

function preTransformNode (el, options) {
  if (el.tag === 'input') {
    var map = el.attrsMap;
    if (!map['v-model']) {
      return
    }

    var typeBinding;
    if (map[':type'] || map['v-bind:type']) {
      typeBinding = getBindingAttr(el, 'type');
    }
    if (!map.type && !typeBinding && map['v-bind']) {
      typeBinding = "(" + (map['v-bind']) + ").type";
    }

    if (typeBinding) {
      var ifCondition = getAndRemoveAttr(el, 'v-if', true);
      var ifConditionExtra = ifCondition ? ("&&(" + ifCondition + ")") : "";
      var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
      var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
      // 1. checkbox
      var branch0 = cloneASTElement(el);
      // process for on the main node
      processFor(branch0);
      addRawAttr(branch0, 'type', 'checkbox');
      processElement(branch0, options);
      branch0.processed = true; // prevent it from double-processed
      branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
      addIfCondition(branch0, {
        exp: branch0.if,
        block: branch0
      });
      // 2. add radio else-if condition
      var branch1 = cloneASTElement(el);
      getAndRemoveAttr(branch1, 'v-for', true);
      addRawAttr(branch1, 'type', 'radio');
      processElement(branch1, options);
      addIfCondition(branch0, {
        exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
        block: branch1
      });
      // 3. other
      var branch2 = cloneASTElement(el);
      getAndRemoveAttr(branch2, 'v-for', true);
      addRawAttr(branch2, ':type', typeBinding);
      processElement(branch2, options);
      addIfCondition(branch0, {
        exp: ifCondition,
        block: branch2
      });

      if (hasElse) {
        branch0.else = true;
      } else if (elseIfCondition) {
        branch0.elseif = elseIfCondition;
      }

      return branch0
    }
  }
}

function cloneASTElement (el) {
  return createASTElement(el.tag, el.attrsList.slice(), el.parent)
}

var model$2 = {
  preTransformNode: preTransformNode
}

var modules$1 = [
  klass$1,
  style$1,
  model$2
]

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
}

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic$1(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;

// KeyboardEvent.keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// KeyboardEvent.key aliases
var keyNames = {
  esc: 'Escape',
  tab: 'Tab',
  enter: 'Enter',
  space: ' ',
  // #7806: IE11 uses key names without `Arrow` prefix for arrow keys.
  up: ['Up', 'ArrowUp'],
  left: ['Left', 'ArrowLeft'],
  right: ['Right', 'ArrowRight'],
  down: ['Down', 'ArrowDown'],
  'delete': ['Backspace', 'Delete']
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative,
  warn
) {
  var res = isNative ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    res += "\"" + name + "\":" + (genHandler(name, events[name])) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) {
    if (isMethodPath || isFunctionExpression) {
      return handler.value
    }
    /* istanbul ignore if */
    return ("function($event){" + (handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else if (key === 'exact') {
        var modifiers = (handler.modifiers);
        genModifierCode += genGuard(
          ['ctrl', 'shift', 'alt', 'meta']
            .filter(function (keyModifier) { return !modifiers[keyModifier]; })
            .map(function (keyModifier) { return ("$event." + keyModifier + "Key"); })
            .join('||')
        );
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? ("return " + (handler.value) + "($event)")
      : isFunctionExpression
        ? ("return (" + (handler.value) + ")($event)")
        : handler.value;
    /* istanbul ignore if */
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var keyCode = keyCodes[key];
  var keyName = keyNames[key];
  return (
    "_k($event.keyCode," +
    (JSON.stringify(key)) + "," +
    (JSON.stringify(keyCode)) + "," +
    "$event.key," +
    "" + (JSON.stringify(keyName)) +
    ")"
  )
}

/*  */

function on (el, dir) {
  if (process.env.NODE_ENV !== 'production' && dir.modifiers) {
    warn("v-on without argument does not support modifiers.");
  }
  el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop
}

/*  */

var CodegenState = function CodegenState (options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;
  this.maybeComponent = function (el) { return !isReservedTag(el.tag); };
  this.onceId = 0;
  this.staticRenderFns = [];
};



function generate (
  ast,
  options
) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: state.staticRenderFns
  }
}

function genElement (el, state) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data = el.plain ? undefined : genData$2(el, state);

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el, state) {
  el.staticProcessed = true;
  state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
  return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      process.env.NODE_ENV !== 'production' && state.warn(
        "v-once can only be used inside v-for that is keyed. "
      );
      return genElement(el, state)
    }
    return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + "," + key + ")")
  } else {
    return genStatic(el, state)
  }
}

function genIf (
  el,
  state,
  altGen,
  altEmpty
) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions (
  conditions,
  state,
  altGen,
  altEmpty
) {
  if (!conditions.length) {
    return altEmpty || '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}

function genFor (
  el,
  state,
  altGen,
  altHelper
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if (process.env.NODE_ENV !== 'production' &&
    state.maybeComponent(el) &&
    el.tag !== 'slot' &&
    el.tag !== 'template' &&
    !el.key
  ) {
    state.warn(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + ((altGen || genElement)(el, state)) +
    '})'
}

function genData$2 (el, state) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el, state);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false, state.warn)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true, state.warn)) + ",";
  }
  // slot target
  // only for non-scoped slots
  if (el.slotTarget && !el.slotScope) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots, state)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  // v-on data wrap
  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }
  return data
}

function genDirectives (el, state) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el, state) {
  var ast = el.children[0];
  if (process.env.NODE_ENV !== 'production' && (
    el.children.length !== 1 || ast.type !== 1
  )) {
    state.warn('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (
  slots,
  state
) {
  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) {
      return genScopedSlot(key, slots[key], state)
    }).join(',')) + "])")
}

function genScopedSlot (
  key,
  el,
  state
) {
  if (el.for && !el.forProcessed) {
    return genForScopedSlot(key, el, state)
  }
  var fn = "function(" + (String(el.slotScope)) + "){" +
    "return " + (el.tag === 'template'
      ? el.if
        ? ((el.if) + "?" + (genChildren(el, state) || 'undefined') + ":undefined")
        : genChildren(el, state) || 'undefined'
      : genElement(el, state)) + "}";
  return ("{key:" + key + ",fn:" + fn + "}")
}

function genForScopedSlot (
  key,
  el,
  state
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genScopedSlot(key, el, state)) +
    '})'
}

function genChildren (
  el,
  state,
  checkSkip,
  altGenElement,
  altGenNode
) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      return (altGenElement || genElement)(el$1, state)
    }
    var normalizationType = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0;
    var gen = altGenNode || genNode;
    return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (
  children,
  maybeComponent
) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function genNode (node, state) {
  if (node.type === 1) {
    return genElement(node, state)
  } if (node.type === 3 && node.isComment) {
    return genComment(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genComment (comment) {
  return ("_e(" + (JSON.stringify(comment.text)) + ")")
}

function genSlot (el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (
  componentName,
  el,
  state
) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    /* istanbul ignore if */
    {
      res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
    }
  }
  return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors
}

function checkNode (node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), errors);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), errors);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkEvent (exp, text, errors) {
  var stipped = exp.replace(stripStringRE, '');
  var keywordMatch = stipped.match(unaryOperatorsRE);
  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    errors.push(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
    );
  }
  checkExpression(exp, text, errors);
}

function checkFor (node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier (
  ident,
  type,
  text,
  errors
) {
  if (typeof ident === 'string') {
    try {
      new Function(("var " + ident + "=_"));
    } catch (e) {
      errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
    }
  }
}

function checkExpression (exp, text, errors) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\"\n  Raw expression: " + (text.trim())
      );
    } else {
      errors.push(
        "invalid expression: " + (e.message) + " in\n\n" +
        "    " + exp + "\n\n" +
        "  Raw expression: " + (text.trim()) + "\n"
      );
    }
  }
}

/*  */

function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompileToFunctionFn (compile) {
  var cache = Object.create(null);

  return function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = extend({}, options);
    var warn$$1 = options.warn || warn;
    delete options.warn;

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn$$1(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    if (process.env.NODE_ENV !== 'production') {
      if (compiled.errors && compiled.errors.length) {
        warn$$1(
          "Error compiling template:\n\n" + template + "\n\n" +
          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
          vm
        );
      }
      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors)
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn$$1(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (cache[key] = res)
  }
}

/*  */

function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options
    ) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];
      finalOptions.warn = function (msg, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules);
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives || null),
            options.directives
          );
        }
        // copy other options
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      var compiled = baseCompile(template, finalOptions);
      if (process.env.NODE_ENV !== 'production') {
        errors.push.apply(errors, detectErrors(compiled.ast));
      }
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}

/*  */

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
var createCompiler = createCompilerCreator(function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  if (options.optimize !== false) {
    optimize(ast, options);
  }
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
});

/*  */

var ref$1 = createCompiler(baseOptions);
var compileToFunctions = ref$1.compileToFunctions;

/*  */

// check whether current browser encodes a char inside attribute values
var div;
function getShouldDecode (href) {
  div = div || document.createElement('div');
  div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
  return div.innerHTML.indexOf('&#10;') > 0
}

// #3663: IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
// #6828: chrome encodes content in a[href]
var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue.prototype.$mount;
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile end');
        measure(("vue " + (this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue.compile = compileToFunctions;

/* harmony default export */ __webpack_exports__["a"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0), __webpack_require__(1), __webpack_require__(9).setImmediate))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(10);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(0)))

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* unused harmony export Store */
/* unused harmony export install */
/* unused harmony export mapState */
/* unused harmony export mapMutations */
/* unused harmony export mapGetters */
/* unused harmony export mapActions */
/* unused harmony export createNamespacedHelpers */
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (process.env.NODE_ENV !== 'production') {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (process.env.NODE_ENV !== 'production') {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (process.env.NODE_ENV !== 'production') {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    process.env.NODE_ENV !== 'production' &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (process.env.NODE_ENV !== 'production') {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (process.env.NODE_ENV !== 'production') {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (process.env.NODE_ENV !== 'production' && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (process.env.NODE_ENV !== 'production' && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (process.env.NODE_ENV !== 'production') {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (process.env.NODE_ENV !== 'production' && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (process.env.NODE_ENV !== 'production' && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["a"] = (index_esm);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = computeHtml;
/* harmony export (immutable) */ __webpack_exports__["a"] = computeCss;
/* harmony export (immutable) */ __webpack_exports__["c"] = computeJs;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__deferred__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__codeModes__ = __webpack_require__(5);




const esprima = __webpack_require__(6);

// computeHtml, computeCss & computeJs evaluate the final code according
// to whatever mode is selected and resolve the returned promise with the code.
function computeHtml(userCode, mode) {
	var code =
		'<main id="demo">\n' + '<button id="btnDownloadPng" class="button hide-on-mobile"><div></div><i class="fa fa-file-image-o"></i> \n' +
		'  Export as PNG\n' +
		'</button>' + ' <div id="diagram">   <seq-diagram></seq-diagram>\n </div>' + '  </main>';

	var d = Object(__WEBPACK_IMPORTED_MODULE_0__deferred__["a" /* deferred */])();
	if (mode === __WEBPACK_IMPORTED_MODULE_2__codeModes__["b" /* HtmlModes */].HTML) {
		d.resolve({
			code
		});
	} else if (mode === __WEBPACK_IMPORTED_MODULE_2__codeModes__["b" /* HtmlModes */].MARKDOWN) {
		d.resolve(
			window.marked
				? {
						code: marked(code)
				  }
				: {
						code
				  }
		);
	} else if (mode === __WEBPACK_IMPORTED_MODULE_2__codeModes__["b" /* HtmlModes */].JADE) {
		d.resolve(
			window.jade
				? {
						code: jade.render(code)
				  }
				: {
						code
				  }
		);
	}

	return d.promise;
}
function computeCss(userCode, mode, settings) {
	var code = userCode;

	var d = Object(__WEBPACK_IMPORTED_MODULE_0__deferred__["a" /* deferred */])();
	var errors;

	if (mode === __WEBPACK_IMPORTED_MODULE_2__codeModes__["a" /* CssModes */].CSS) {
		d.resolve({
			code
		});
	} else if (mode === __WEBPACK_IMPORTED_MODULE_2__codeModes__["a" /* CssModes */].SCSS || mode === __WEBPACK_IMPORTED_MODULE_2__codeModes__["a" /* CssModes */].SASS) {
		if (window.sass && code) {
			window.sass.compile(
				code,
				{
					indentedSyntax: mode === __WEBPACK_IMPORTED_MODULE_2__codeModes__["a" /* CssModes */].SASS
				},
				function(result) {
					// Something was wrong
					if (result.line && result.message) {
						errors = {
							lang: 'css',
							data: [
								{
									lineNumber: result.line - 1,
									message: result.message
								}
							]
						};
					}
					d.resolve({
						code: result.text,
						errors
					});
				}
			);
		} else {
			d.resolve({
				code
			});
		}
	} else if (mode === __WEBPACK_IMPORTED_MODULE_2__codeModes__["a" /* CssModes */].LESS) {
		less.render(code).then(
			function(result) {
				d.resolve({
					code: result.css
				});
			},
			function(error) {
				errors = {
					lang: 'css',
					data: [
						{
							lineNumber: error.line,
							message: error.message
						}
					]
				};
				d.resolve({
					code: '',
					errors
				});
			}
		);
	} else if (mode === __WEBPACK_IMPORTED_MODULE_2__codeModes__["a" /* CssModes */].STYLUS) {
		stylus(code).render(function(error, result) {
			if (error) {
				window.err = error;
				// Last line of message is the actual message
				var tempArr = error.message.split('\n');
				tempArr.pop(); // This is empty string in the end
				errors = {
					lang: 'css',
					data: [
						{
							lineNumber: +error.message.match(/stylus:(\d+):/)[1] - 298,
							message: tempArr.pop()
						}
					]
				};
			}
			d.resolve({
				code: result,
				errors
			});
		});
	} else if (mode === __WEBPACK_IMPORTED_MODULE_2__codeModes__["a" /* CssModes */].ACSS) {
		if (!window.atomizer) {
			d.resolve({
				code: ''
			});
		} else {
			const html = code;
			const foundClasses = atomizer.findClassNames(html);
			var finalConfig;
			try {
				finalConfig = atomizer.getConfig(
					foundClasses,
					JSON.parse(settings.acssConfig)
				);
			} catch (e) {
				finalConfig = atomizer.getConfig(foundClasses, {});
			}
			const acss = atomizer.getCss(finalConfig);
			d.resolve({
				code: acss
			});
		}
	}

	return d.promise;
}

/* eslint-disable max-params */
/* eslint-disable complexity */
function computeJs(
	userCode,
	mode,
	shouldPreventInfiniteLoops,
	infiniteLoopTimeout
) {
	// var code = userCode;
	console.log('code:', JSON.stringify(userCode))
	let code = 'app.$store.commit(\'code\', ' + JSON.stringify(userCode) + ');';
	var d = Object(__WEBPACK_IMPORTED_MODULE_0__deferred__["a" /* deferred */])();
	var errors;

	if (!code) {
		d.resolve('');
		return d.promise;
	}

	if (mode === __WEBPACK_IMPORTED_MODULE_2__codeModes__["c" /* JsModes */].JS) {
		try {
			esprima.parse(code, {
				tolerant: true
			});
		} catch (e) {
			errors = {
				lang: 'js',
				data: [
					{
						lineNumber: e.lineNumber - 1,
						message: e.description
					}
				]
			};
		} finally {
			if (shouldPreventInfiniteLoops !== false) {
				// If errors are found in last parse, we don't run infinite loop
				// protection otherwise it will again throw error.
				code = errors
					? code
					: Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* addInfiniteLoopProtection */])(code, {
							timeout: infiniteLoopTimeout
					  });
			}

			d.resolve({
				code,
				errors
			});
		}
	} else if (mode === __WEBPACK_IMPORTED_MODULE_2__codeModes__["c" /* JsModes */].COFFEESCRIPT) {
		if (!window.CoffeeScript) {
			d.resolve('');
			return d.promise;
		}
		try {
			code = CoffeeScript.compile(code, {
				bare: true
			});
		} catch (e) {
			errors = {
				lang: 'js',
				data: [
					{
						lineNumber: e.location.first_line,
						message: e.message
					}
				]
			};
		} finally {
			if (shouldPreventInfiniteLoops !== false) {
				code = errors
					? code
					: Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* addInfiniteLoopProtection */])(code, {
							timeout: infiniteLoopTimeout
					  });
			}
			d.resolve({
				code,
				errors
			});
		}
	} else if (mode === __WEBPACK_IMPORTED_MODULE_2__codeModes__["c" /* JsModes */].ES6) {
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
			errors = {
				lang: 'js',
				data: [
					{
						lineNumber: e.lineNumber - 1,
						message: e.description
					}
				]
			};
		} finally {
			code = Babel.transform(code, {
				presets: ['latest', 'stage-2', 'react']
			}).code;
			if (shouldPreventInfiniteLoops !== false) {
				code = errors
					? code
					: Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* addInfiniteLoopProtection */])(code, {
							timeout: infiniteLoopTimeout
					  });
			}
			d.resolve({
				code,
				errors
			});
		}
	} else if (mode === __WEBPACK_IMPORTED_MODULE_2__codeModes__["c" /* JsModes */].TS) {
		try {
			if (!window.ts) {
				d.resolve({
					code: ''
				});
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
				errors = {
					lang: 'js',
					data: [
						{
							message: code.diagnostics[0].messageText,
							lineNumber:
								ts.getLineOfLocalPosition(
									code.diagnostics[0].file,
									code.diagnostics[0].start
								) - 1
						}
					]
				};
			}
			code = code.outputText;
			if (shouldPreventInfiniteLoops !== false && !errors) {
				code = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* addInfiniteLoopProtection */])(code, {
					timeout: infiniteLoopTimeout
				});
			}
			d.resolve({
				code,
				errors
			});
		} catch (e) {}
	}

	return d.promise;
}
/* eslint-enable max-params */
/* eslint-enable complexity */


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports["vue-sequence"]=e():t["vue-sequence"]=e()}("undefined"!=typeof self?self:this,function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s="+xUi")}({"+rLv":function(t,e,n){var r=n("dyZX").document;t.exports=r&&r.documentElement},"+xUi":function(t,e,n){"use strict";n.r(e),n("HrLf");var r=n("1X7h"),o=n.n(r),i=n("sFTC"),s=n.n(i),a=(n("rGqo"),n("k5VM")),c=n("L2JU"),u={name:"life-line",props:["entity"],computed:Object(a.a)({},Object(c.a)(["firstInvocations"]),{top:function(){return this.firstInvocationIsCreation?this.firstInvocations[this.entity].top-3:0},firstInvocationIsCreation:function(){return this.firstInvocations[this.entity]&&"creation"===this.firstInvocations[this.entity].type}})},p=(n("Ptq6"),n("KHd+")),l=Object(p.a)(u,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"lifeline",style:{paddingTop:this.top+"px"},attrs:{id:this.entity}},[e("div",{staticClass:"participant"},[e("label",{staticClass:"name"},[this._v(this._s(this.entity))])]),e("div",{staticClass:"line"})])},[],!1,null,"3a05119c",null).exports,h={name:"life-line-layer",computed:Object(a.a)({},Object(c.a)(["starter"]),Object(c.a)({entities:"participants"}),{lifeLineHidden:function(){return"Starter"===this.starter},entities:function(){var t=this;return this.$store.getters.participants.filter(function(e){return e!==t.starter})}}),mounted:function(){this.emitDimensions()},updated:function(){this.emitDimensions()},methods:{emitDimensions:function(){var t=this,e={},n=this.$refs[this.starter].$el;e[this.starter]={left:n.offsetLeft,width:n.offsetWidth},this.entities.forEach(function(n){var r=t.$refs[n][0].$el;e[n]={left:r.offsetLeft,width:r.offsetWidth}}),this.$store.commit("onLifeLineLayerMountedOrUpdated",e)}},components:{LifeLine:l}},f=(n("QRQd"),Object(p.a)(h,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"life-line-layer"},[e("life-line",{ref:this.starter,staticClass:"starter",class:{hidden:this.lifeLineHidden},attrs:{entity:this.starter}}),this._l(this.entities,function(t){return e("life-line",{key:t,ref:t,refInFor:!0,attrs:{entity:t}})})],2)},[],!1,null,"03874a59",null).exports),d=(n("rE2o"),n("ioFf"),n("f3/d"),n("Lv7l")),y={name:"message-layer",computed:Object(a.a)({},Object(c.a)(["rootContext","starter","centerOf"]),{paddingLeft:function(){return this.centerOf(this.starter)}}),mounted:function(){},updated:function(){this.emitFirstInvocations()},methods:{emitFirstInvocations:function(){var t=this,e={};this.$store.getters.participants.forEach(function(n){e[n]=t.firstInvocation(n)}),this.$store.commit("onMessageLayerMountedOrUpdated",e)},firstInvocation:function(t){var e=this.$el.getBoundingClientRect();return function n(r){var o=r.$options.name;if("message"===o||"self-invocation"===o){var i=r.$parent;if((i.to||i.source||i.target)===t){var s=r.$el.getBoundingClientRect();return{type:r.$parent.$options.name,top:s.y-e.y}}}var a=!0,c=!1,u=void 0;try{for(var p,l=r.$children[Symbol.iterator]();!(a=(p=l.next()).done);a=!0){var h=n(p.value);if(h)return h}}catch(t){c=!0,u=t}finally{try{a||null==l.return||l.return()}finally{if(c)throw u}}return null}(this)}},components:{Block:d.default}},g=(n("U3/g"),n("M0kH"),{name:"seq-diagram",components:{LifeLineLayer:f,MessageLayer:Object(p.a)(y,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"message-layer"},[e("block",{style:{"padding-left":this.paddingLeft+"px"},attrs:{context:this.rootContext.block(),from:this.starter}})],1)},[],!1,null,"6909fd0d",null).exports}}),x=(n("I1Q4"),Object(p.a)(g,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"sequence-diagram"},[e("life-line-layer"),e("message-layer")],1)},[],!1,null,null,null).exports),m=(n("DTEb"),{state:{lifeLineDimensions:{},firstInvocations:{},code:"",events:[]},getters:{firstInvocations:function(t){return t.firstInvocations},starter:function(t,e){var n=e.rootContext.starterExp();return n&&n.starter()&&n.starter().getCode()||"Starter"},rootContext:function(t){return o.a.RootContext(t.code)},participants:function(t,e){return o.a.Participants(e.rootContext)},centerOf:function(t){return function(e){return t.lifeLineDimensions[e]&&t.lifeLineDimensions[e].left+t.lifeLineDimensions[e].width/2}},leftOf:function(t){return function(e){return t.lifeLineDimensions[e]&&t.lifeLineDimensions[e].left}},rightOf:function(t){return function(e){return t.lifeLineDimensions[e]&&t.lifeLineDimensions[e].left+t.lifeLineDimensions[e].width}},widthOf:function(t){return function(e){return t.lifeLineDimensions[e]&&t.lifeLineDimensions[e].width}},distance:function(t,e){return function(t,n){return e.centerOf(t)-e.centerOf(n)}}},mutations:{code:function(t,e){t.code=e},event:function(t,e){t.events.push(e)},onLifeLineLayerMountedOrUpdated:function(t,e){t.lifeLineDimensions=e},onMessageLayerMountedOrUpdated:function(t,e){t.firstInvocations=e}},actions:{updateCode:function(t,e){t.commit("code",e.code)}},strict:!1,plugins:[s()()]});n.d(e,"Version",function(){return"0.6.3"}),n.d(e,"Store",function(){return m}),n.d(e,"SeqDiagram",function(){return x}),e.default=void 0},"0/R4":function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},"0jhs":function(t,e,n){"use strict";var r=n("odjl");n.n(r).a},"1MBn":function(t,e,n){var r=n("DVgA"),o=n("JiEa"),i=n("UqcF");t.exports=function(t){var e=r(t),n=o.f;if(n)for(var s,a=n(t),c=i.f,u=0;a.length>u;)c.call(t,s=a[u++])&&e.push(s);return e}},"1TsA":function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},"1X7h":function(t,e,n){t.exports=function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=51)}([function(t,e){function n(t){return"["+t.join(", ")+"]"}function r(t,e){return t.equals(e)}function o(t){return t.hashCode()}function i(t,e){return this.data={},this.hashFunction=t||o,this.equalsFunction=e||r,this}function s(){return this.data=[],this}function a(t,e){return this.data={},this.hashFunction=t||o,this.equalsFunction=e||r,this}function c(){return this.data={},this}function u(){return this}function p(){return this.count=0,this.hash=0,this}String.prototype.seed=String.prototype.seed||Math.round(Math.random()*Math.pow(2,32)),String.prototype.hashCode=function(){var t,e,n,r,o,i,s,a,c=this.toString();for(t=3&c.length,e=c.length-t,n=String.prototype.seed,o=3432918353,i=461845907,a=0;a<e;)s=255&c.charCodeAt(a)|(255&c.charCodeAt(++a))<<8|(255&c.charCodeAt(++a))<<16|(255&c.charCodeAt(++a))<<24,++a,n=27492+(65535&(r=5*(65535&(n=(n^=s=(65535&(s=(s=(65535&s)*o+(((s>>>16)*o&65535)<<16)&4294967295)<<15|s>>>17))*i+(((s>>>16)*i&65535)<<16)&4294967295)<<13|n>>>19))+((5*(n>>>16)&65535)<<16)&4294967295))+((58964+(r>>>16)&65535)<<16);switch(s=0,t){case 3:s^=(255&c.charCodeAt(a+2))<<16;case 2:s^=(255&c.charCodeAt(a+1))<<8;case 1:n^=s=(65535&(s=(s=(65535&(s^=255&c.charCodeAt(a)))*o+(((s>>>16)*o&65535)<<16)&4294967295)<<15|s>>>17))*i+(((s>>>16)*i&65535)<<16)&4294967295}return n^=c.length,n=2246822507*(65535&(n^=n>>>16))+((2246822507*(n>>>16)&65535)<<16)&4294967295,n=3266489909*(65535&(n^=n>>>13))+((3266489909*(n>>>16)&65535)<<16)&4294967295,(n^=n>>>16)>>>0},Object.defineProperty(i.prototype,"length",{get:function(){var t=0;for(var e in this.data)0===e.indexOf("hash_")&&(t+=this.data[e].length);return t}}),i.prototype.add=function(t){var e="hash_"+this.hashFunction(t);if(e in this.data){for(var n=this.data[e],r=0;r<n.length;r++)if(this.equalsFunction(t,n[r]))return n[r];return n.push(t),t}return this.data[e]=[t],t},i.prototype.contains=function(t){return null!=this.get(t)},i.prototype.get=function(t){var e="hash_"+this.hashFunction(t);if(e in this.data)for(var n=this.data[e],r=0;r<n.length;r++)if(this.equalsFunction(t,n[r]))return n[r];return null},i.prototype.values=function(){var t=[];for(var e in this.data)0===e.indexOf("hash_")&&(t=t.concat(this.data[e]));return t},i.prototype.toString=function(){return n(this.values())},s.prototype.add=function(t){this.data[t]=!0},s.prototype.or=function(t){var e=this;Object.keys(t.data).map(function(t){e.add(t)})},s.prototype.remove=function(t){delete this.data[t]},s.prototype.contains=function(t){return!0===this.data[t]},s.prototype.values=function(){return Object.keys(this.data)},s.prototype.minValue=function(){return Math.min.apply(null,this.values())},s.prototype.hashCode=function(){var t=new p;return t.update(this.values()),t.finish()},s.prototype.equals=function(t){return t instanceof s&&this.hashCode()===t.hashCode()},Object.defineProperty(s.prototype,"length",{get:function(){return this.values().length}}),s.prototype.toString=function(){return"{"+this.values().join(", ")+"}"},Object.defineProperty(a.prototype,"length",{get:function(){var t=0;for(var e in this.data)0===e.indexOf("hash_")&&(t+=this.data[e].length);return t}}),a.prototype.put=function(t,e){var n="hash_"+this.hashFunction(t);if(n in this.data){for(var r=this.data[n],o=0;o<r.length;o++){var i=r[o];if(this.equalsFunction(t,i.key)){var s=i.value;return i.value=e,s}}return r.push({key:t,value:e}),e}return this.data[n]=[{key:t,value:e}],e},a.prototype.containsKey=function(t){var e="hash_"+this.hashFunction(t);if(e in this.data)for(var n=this.data[e],r=0;r<n.length;r++){var o=n[r];if(this.equalsFunction(t,o.key))return!0}return!1},a.prototype.get=function(t){var e="hash_"+this.hashFunction(t);if(e in this.data)for(var n=this.data[e],r=0;r<n.length;r++){var o=n[r];if(this.equalsFunction(t,o.key))return o.value}return null},a.prototype.entries=function(){var t=[];for(var e in this.data)0===e.indexOf("hash_")&&(t=t.concat(this.data[e]));return t},a.prototype.getKeys=function(){return this.entries().map(function(t){return t.key})},a.prototype.getValues=function(){return this.entries().map(function(t){return t.value})},a.prototype.toString=function(){return"["+this.entries().map(function(t){return"{"+t.key+":"+t.value+"}"}).join(", ")+"]"},c.prototype.get=function(t){return(t="k-"+t)in this.data?this.data[t]:null},c.prototype.put=function(t,e){t="k-"+t,this.data[t]=e},c.prototype.values=function(){var t=this.data;return Object.keys(this.data).map(function(e){return t[e]})},p.prototype.update=function(){for(var t=0;t<arguments.length;t++){var e=arguments[t];if(null!=e)if(Array.isArray(e))this.update.apply(e);else{var n=0;switch(typeof e){case"undefined":case"function":continue;case"number":case"boolean":n=e;break;case"string":n=e.hashCode();break;default:e.updateHashCode(this);continue}n=(n*=3432918353)<<15|n>>>17,n*=461845907,this.count=this.count+1;var r=this.hash^n;r=5*(r=r<<13|r>>>19)+3864292196,this.hash=r}}},p.prototype.finish=function(){var t=this.hash^4*this.count;return t^=t>>>16,t*=2246822507,t^=t>>>13,t*=3266489909,t^t>>>16},u.prototype.get=function(t,e){var n=this[t]||null;return null===n?null:n[e]||null},u.prototype.set=function(t,e,n){var r=this[t]||null;null===r&&(r={},this[t]=r),r[e]=n},e.Hash=p,e.Set=i,e.Map=a,e.BitSet=s,e.AltDict=c,e.DoubleDict=u,e.hashStuff=function(){var t=new p;return t.update.apply(arguments),t.finish()},e.escapeWhitespace=function(t,e){return t=t.replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r"),e&&(t=t.replace(/ /g,"·")),t},e.arrayToString=n,e.titleCase=function(t){return t.replace(/\w\S*/g,function(t){return t.charAt(0).toUpperCase()+t.substr(1)})},e.equalArrays=function(t,e){if(!Array.isArray(t)||!Array.isArray(e))return!1;if(t==e)return!0;if(t.length!=e.length)return!1;for(var n=0;n<t.length;n++)if(t[n]!=e[n]&&!t[n].equals(e[n]))return!1;return!0}},function(t,e){function n(){return this.source=null,this.type=null,this.channel=null,this.start=null,this.stop=null,this.tokenIndex=null,this.line=null,this.column=null,this._text=null,this}function r(t,e,o,i,s){return n.call(this),this.source=void 0!==t?t:r.EMPTY_SOURCE,this.type=void 0!==e?e:null,this.channel=void 0!==o?o:n.DEFAULT_CHANNEL,this.start=void 0!==i?i:-1,this.stop=void 0!==s?s:-1,this.tokenIndex=-1,null!==this.source[0]?(this.line=t[0].line,this.column=t[0].column):this.column=-1,this}n.INVALID_TYPE=0,n.EPSILON=-2,n.MIN_USER_TOKEN_TYPE=1,n.EOF=-1,n.DEFAULT_CHANNEL=0,n.HIDDEN_CHANNEL=1,Object.defineProperty(n.prototype,"text",{get:function(){return this._text},set:function(t){this._text=t}}),n.prototype.getTokenSource=function(){return this.source[0]},n.prototype.getInputStream=function(){return this.source[1]},r.prototype=Object.create(n.prototype),r.prototype.constructor=r,r.EMPTY_SOURCE=[null,null],r.prototype.clone=function(){var t=new r(this.source,this.type,this.channel,this.start,this.stop);return t.tokenIndex=this.tokenIndex,t.line=this.line,t.column=this.column,t.text=this.text,t},Object.defineProperty(r.prototype,"text",{get:function(){if(null!==this._text)return this._text;var t=this.getInputStream();if(null===t)return null;var e=t.size;return this.start<e&&this.stop<e?t.getText(this.start,this.stop):"<EOF>"},set:function(t){this._text=t}}),r.prototype.toString=function(){var t=this.text;return t=null!==t?t.replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/\t/g,"\\t"):"<no text>","[@"+this.tokenIndex+","+this.start+":"+this.stop+"='"+t+"',<"+this.type+">"+(this.channel>0?",channel="+this.channel:"")+","+this.line+":"+this.column+"]"},e.Token=n,e.CommonToken=r},function(t,e,n){var r=n(1).Token;function o(t,e){return this.start=t,this.stop=e,this}function i(){this.intervals=null,this.readOnly=!1}o.prototype.contains=function(t){return t>=this.start&&t<this.stop},o.prototype.toString=function(){return this.start===this.stop-1?this.start.toString():this.start.toString()+".."+(this.stop-1).toString()},Object.defineProperty(o.prototype,"length",{get:function(){return this.stop-this.start}}),i.prototype.first=function(t){return null===this.intervals||0===this.intervals.length?r.INVALID_TYPE:this.intervals[0].start},i.prototype.addOne=function(t){this.addInterval(new o(t,t+1))},i.prototype.addRange=function(t,e){this.addInterval(new o(t,e+1))},i.prototype.addInterval=function(t){if(null===this.intervals)this.intervals=[],this.intervals.push(t);else{for(var e=0;e<this.intervals.length;e++){var n=this.intervals[e];if(t.stop<n.start)return void this.intervals.splice(e,0,t);if(t.stop===n.start)return void(this.intervals[e].start=t.start);if(t.start<=n.stop)return this.intervals[e]=new o(Math.min(n.start,t.start),Math.max(n.stop,t.stop)),void this.reduce(e)}this.intervals.push(t)}},i.prototype.addSet=function(t){if(null!==t.intervals)for(var e=0;e<t.intervals.length;e++){var n=t.intervals[e];this.addInterval(new o(n.start,n.stop))}return this},i.prototype.reduce=function(t){if(t<this.intervalslength-1){var e=this.intervals[t],n=this.intervals[t+1];e.stop>=n.stop?(this.intervals.pop(t+1),this.reduce(t)):e.stop>=n.start&&(this.intervals[t]=new o(e.start,n.stop),this.intervals.pop(t+1))}},i.prototype.complement=function(t,e){var n=new i;n.addInterval(new o(t,e+1));for(var r=0;r<this.intervals.length;r++)n.removeRange(this.intervals[r]);return n},i.prototype.contains=function(t){if(null===this.intervals)return!1;for(var e=0;e<this.intervals.length;e++)if(this.intervals[e].contains(t))return!0;return!1},Object.defineProperty(i.prototype,"length",{get:function(){var t=0;return this.intervals.map(function(e){t+=e.length}),t}}),i.prototype.removeRange=function(t){if(t.start===t.stop-1)this.removeOne(t.start);else if(null!==this.intervals)for(var e=0,n=0;n<this.intervals.length;n++){var r=this.intervals[e];if(t.stop<=r.start)return;if(t.start>r.start&&t.stop<r.stop){this.intervals[e]=new o(r.start,t.start);var i=new o(t.stop,r.stop);return void this.intervals.splice(e,0,i)}t.start<=r.start&&t.stop>=r.stop?(this.intervals.splice(e,1),e-=1):t.start<r.stop?this.intervals[e]=new o(r.start,t.start):t.stop<r.stop&&(this.intervals[e]=new o(t.stop,r.stop)),e+=1}},i.prototype.removeOne=function(t){if(null!==this.intervals)for(var e=0;e<this.intervals.length;e++){var n=this.intervals[e];if(t<n.start)return;if(t===n.start&&t===n.stop-1)return void this.intervals.splice(e,1);if(t===n.start)return void(this.intervals[e]=new o(n.start+1,n.stop));if(t===n.stop-1)return void(this.intervals[e]=new o(n.start,n.stop-1));if(t<n.stop-1){var r=new o(n.start,t);return n.start=t+1,void this.intervals.splice(e,0,r)}}},i.prototype.toString=function(t,e,n){return t=t||null,e=e||null,n=n||!1,null===this.intervals?"{}":null!==t||null!==e?this.toTokenString(t,e):n?this.toCharString():this.toIndexString()},i.prototype.toCharString=function(){for(var t=[],e=0;e<this.intervals.length;e++){var n=this.intervals[e];n.stop===n.start+1?n.start===r.EOF?t.push("<EOF>"):t.push("'"+String.fromCharCode(n.start)+"'"):t.push("'"+String.fromCharCode(n.start)+"'..'"+String.fromCharCode(n.stop-1)+"'")}return t.length>1?"{"+t.join(", ")+"}":t[0]},i.prototype.toIndexString=function(){for(var t=[],e=0;e<this.intervals.length;e++){var n=this.intervals[e];n.stop===n.start+1?n.start===r.EOF?t.push("<EOF>"):t.push(n.start.toString()):t.push(n.start.toString()+".."+(n.stop-1).toString())}return t.length>1?"{"+t.join(", ")+"}":t[0]},i.prototype.toTokenString=function(t,e){for(var n=[],r=0;r<this.intervals.length;r++)for(var o=this.intervals[r],i=o.start;i<o.stop;i++)n.push(this.elementName(t,e,i));return n.length>1?"{"+n.join(", ")+"}":n[0]},i.prototype.elementName=function(t,e,n){return n===r.EOF?"<EOF>":n===r.EPSILON?"<EPSILON>":t[n]||e[n]},e.Interval=o,e.IntervalSet=i},function(t,e,n){var r=n(7).PredicateTransition;function o(t){return Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,o):(new Error).stack,this.message=t.message,this.recognizer=t.recognizer,this.input=t.input,this.ctx=t.ctx,this.offendingToken=null,this.offendingState=-1,null!==this.recognizer&&(this.offendingState=this.recognizer.state),this}function i(t,e,n,r){return o.call(this,{message:"",recognizer:t,input:e,ctx:null}),this.startIndex=n,this.deadEndConfigs=r,this}function s(t,e,n,r,i,s){s=s||t._ctx,r=r||t.getCurrentToken(),n=n||t.getCurrentToken(),e=e||t.getInputStream(),o.call(this,{message:"",recognizer:t,input:e,ctx:s}),this.deadEndConfigs=i,this.startToken=n,this.offendingToken=r}function a(t){o.call(this,{message:"",recognizer:t,input:t.getInputStream(),ctx:t._ctx}),this.offendingToken=t.getCurrentToken()}function c(t,e,n){o.call(this,{message:this.formatMessage(e,n||null),recognizer:t,input:t.getInputStream(),ctx:t._ctx});var i=t._interp.atn.states[t.state].transitions[0];return i instanceof r?(this.ruleIndex=i.ruleIndex,this.predicateIndex=i.predIndex):(this.ruleIndex=0,this.predicateIndex=0),this.predicate=e,this.offendingToken=t.getCurrentToken(),this}function u(){return Error.call(this),Error.captureStackTrace(this,u),this}o.prototype=Object.create(Error.prototype),o.prototype.constructor=o,o.prototype.getExpectedTokens=function(){return null!==this.recognizer?this.recognizer.atn.getExpectedTokens(this.offendingState,this.ctx):null},o.prototype.toString=function(){return this.message},i.prototype=Object.create(o.prototype),i.prototype.constructor=i,i.prototype.toString=function(){var t="";return this.startIndex>=0&&this.startIndex<this.input.size&&(t=this.input.getText((this.startIndex,this.startIndex))),"LexerNoViableAltException"+t},s.prototype=Object.create(o.prototype),s.prototype.constructor=s,a.prototype=Object.create(o.prototype),a.prototype.constructor=a,c.prototype=Object.create(o.prototype),c.prototype.constructor=c,c.prototype.formatMessage=function(t,e){return null!==e?e:"failed predicate: {"+t+"}?"},u.prototype=Object.create(Error.prototype),u.prototype.constructor=u,e.RecognitionException=o,e.NoViableAltException=s,e.LexerNoViableAltException=i,e.InputMismatchException=a,e.FailedPredicateException=c,e.ParseCancellationException=u},function(t,e,n){var r=n(1).Token,o=n(2).Interval,i=new o(-1,-2);function s(){return this}function a(){return s.call(this),this}function c(){return a.call(this),this}function u(){return c.call(this),this}function p(){return c.call(this),this}function l(){return p.call(this),this}function h(){return this}function f(){return this}function d(t){return p.call(this),this.parentCtx=null,this.symbol=t,this}function y(t){return d.call(this,t),this}function g(){return this}n(0),a.prototype=Object.create(s.prototype),a.prototype.constructor=a,c.prototype=Object.create(a.prototype),c.prototype.constructor=c,u.prototype=Object.create(c.prototype),u.prototype.constructor=u,p.prototype=Object.create(c.prototype),p.prototype.constructor=p,l.prototype=Object.create(p.prototype),l.prototype.constructor=l,h.prototype.visit=function(t){return Array.isArray(t)?t.map(function(t){return t.accept(this)},this):t.accept(this)},h.prototype.visitChildren=function(t){return this.visit(t.children)},h.prototype.visitTerminal=function(t){},h.prototype.visitErrorNode=function(t){},f.prototype.visitTerminal=function(t){},f.prototype.visitErrorNode=function(t){},f.prototype.enterEveryRule=function(t){},f.prototype.exitEveryRule=function(t){},d.prototype=Object.create(p.prototype),d.prototype.constructor=d,d.prototype.getChild=function(t){return null},d.prototype.getSymbol=function(){return this.symbol},d.prototype.getParent=function(){return this.parentCtx},d.prototype.getPayload=function(){return this.symbol},d.prototype.getSourceInterval=function(){if(null===this.symbol)return i;var t=this.symbol.tokenIndex;return new o(t,t)},d.prototype.getChildCount=function(){return 0},d.prototype.accept=function(t){return t.visitTerminal(this)},d.prototype.getText=function(){return this.symbol.text},d.prototype.toString=function(){return this.symbol.type===r.EOF?"<EOF>":this.symbol.text},y.prototype=Object.create(d.prototype),y.prototype.constructor=y,y.prototype.isErrorNode=function(){return!0},y.prototype.accept=function(t){return t.visitErrorNode(this)},g.prototype.walk=function(t,e){if(e instanceof l||void 0!==e.isErrorNode&&e.isErrorNode())t.visitErrorNode(e);else if(e instanceof p)t.visitTerminal(e);else{this.enterRule(t,e);for(var n=0;n<e.getChildCount();n++){var r=e.getChild(n);this.walk(t,r)}this.exitRule(t,e)}},g.prototype.enterRule=function(t,e){var n=e.getRuleContext();t.enterEveryRule(n),n.enterRule(t)},g.prototype.exitRule=function(t,e){var n=e.getRuleContext();n.exitRule(t),t.exitEveryRule(n)},g.DEFAULT=new g,e.RuleNode=u,e.ErrorNode=l,e.TerminalNode=p,e.ErrorNodeImpl=y,e.TerminalNodeImpl=d,e.ParseTreeListener=f,e.ParseTreeVisitor=h,e.ParseTreeWalker=g,e.INVALID_INTERVAL=i},function(t,e){function n(){return this.atn=null,this.stateNumber=n.INVALID_STATE_NUMBER,this.stateType=null,this.ruleIndex=0,this.epsilonOnlyTransitions=!1,this.transitions=[],this.nextTokenWithinRule=null,this}function r(){return n.call(this),this.stateType=n.BASIC,this}function o(){return n.call(this),this.decision=-1,this.nonGreedy=!1,this}function i(){return o.call(this),this.endState=null,this}function s(){return i.call(this),this.stateType=n.BLOCK_START,this}function a(){return n.call(this),this.stateType=n.BLOCK_END,this.startState=null,this}function c(){return n.call(this),this.stateType=n.RULE_STOP,this}function u(){return n.call(this),this.stateType=n.RULE_START,this.stopState=null,this.isPrecedenceRule=!1,this}function p(){return o.call(this),this.stateType=n.PLUS_LOOP_BACK,this}function l(){return i.call(this),this.stateType=n.PLUS_BLOCK_START,this.loopBackState=null,this}function h(){return i.call(this),this.stateType=n.STAR_BLOCK_START,this}function f(){return n.call(this),this.stateType=n.STAR_LOOP_BACK,this}function d(){return o.call(this),this.stateType=n.STAR_LOOP_ENTRY,this.loopBackState=null,this.isPrecedenceDecision=null,this}function y(){return n.call(this),this.stateType=n.LOOP_END,this.loopBackState=null,this}function g(){return o.call(this),this.stateType=n.TOKEN_START,this}n.INVALID_TYPE=0,n.BASIC=1,n.RULE_START=2,n.BLOCK_START=3,n.PLUS_BLOCK_START=4,n.STAR_BLOCK_START=5,n.TOKEN_START=6,n.RULE_STOP=7,n.BLOCK_END=8,n.STAR_LOOP_BACK=9,n.STAR_LOOP_ENTRY=10,n.PLUS_LOOP_BACK=11,n.LOOP_END=12,n.serializationNames=["INVALID","BASIC","RULE_START","BLOCK_START","PLUS_BLOCK_START","STAR_BLOCK_START","TOKEN_START","RULE_STOP","BLOCK_END","STAR_LOOP_BACK","STAR_LOOP_ENTRY","PLUS_LOOP_BACK","LOOP_END"],n.INVALID_STATE_NUMBER=-1,n.prototype.toString=function(){return this.stateNumber},n.prototype.equals=function(t){return t instanceof n&&this.stateNumber===t.stateNumber},n.prototype.isNonGreedyExitState=function(){return!1},n.prototype.addTransition=function(t,e){void 0===e&&(e=-1),0===this.transitions.length?this.epsilonOnlyTransitions=t.isEpsilon:this.epsilonOnlyTransitions!==t.isEpsilon&&(this.epsilonOnlyTransitions=!1),-1===e?this.transitions.push(t):this.transitions.splice(e,1,t)},r.prototype=Object.create(n.prototype),r.prototype.constructor=r,o.prototype=Object.create(n.prototype),o.prototype.constructor=o,i.prototype=Object.create(o.prototype),i.prototype.constructor=i,s.prototype=Object.create(i.prototype),s.prototype.constructor=s,a.prototype=Object.create(n.prototype),a.prototype.constructor=a,c.prototype=Object.create(n.prototype),c.prototype.constructor=c,u.prototype=Object.create(n.prototype),u.prototype.constructor=u,p.prototype=Object.create(o.prototype),p.prototype.constructor=p,l.prototype=Object.create(i.prototype),l.prototype.constructor=l,h.prototype=Object.create(i.prototype),h.prototype.constructor=h,f.prototype=Object.create(n.prototype),f.prototype.constructor=f,d.prototype=Object.create(o.prototype),d.prototype.constructor=d,y.prototype=Object.create(n.prototype),y.prototype.constructor=y,g.prototype=Object.create(o.prototype),g.prototype.constructor=g,e.ATNState=n,e.BasicState=r,e.DecisionState=o,e.BlockStartState=i,e.BlockEndState=a,e.LoopEndState=y,e.RuleStartState=u,e.RuleStopState=c,e.TokensStartState=g,e.PlusLoopbackState=p,e.StarLoopbackState=f,e.StarLoopEntryState=d,e.PlusBlockStartState=l,e.StarBlockStartState=h,e.BasicBlockStartState=s},function(t,e,n){var r=n(15).RuleContext,o=n(0).Hash;function i(t){this.cachedHashCode=t}function s(){return this.cache={},this}function a(t,e){var n=0;if(null!==t){var r=new o;r.update(t,e),n=r.finish()}i.call(this,n),this.parentCtx=t,this.returnState=e}function c(){return a.call(this,null,i.EMPTY_RETURN_STATE),this}function u(t,e){var n=new o;n.update(t,e);var r=n.finish();return i.call(this,r),this.parents=t,this.returnStates=e,this}i.EMPTY=null,i.EMPTY_RETURN_STATE=2147483647,i.globalNodeCount=1,i.id=i.globalNodeCount,i.prototype.isEmpty=function(){return this===i.EMPTY},i.prototype.hasEmptyPath=function(){return this.getReturnState(this.length-1)===i.EMPTY_RETURN_STATE},i.prototype.hashCode=function(){return this.cachedHashCode},i.prototype.updateHashCode=function(t){t.update(this.cachedHashCode)},s.prototype.add=function(t){if(t===i.EMPTY)return i.EMPTY;var e=this.cache[t]||null;return null!==e?e:(this.cache[t]=t,t)},s.prototype.get=function(t){return this.cache[t]||null},Object.defineProperty(s.prototype,"length",{get:function(){return this.cache.length}}),a.prototype=Object.create(i.prototype),a.prototype.contructor=a,a.create=function(t,e){return e===i.EMPTY_RETURN_STATE&&null===t?i.EMPTY:new a(t,e)},Object.defineProperty(a.prototype,"length",{get:function(){return 1}}),a.prototype.getParent=function(t){return this.parentCtx},a.prototype.getReturnState=function(t){return this.returnState},a.prototype.equals=function(t){return this===t||t instanceof a&&this.hashCode()===t.hashCode()&&this.returnState===t.returnState&&(null==this.parentCtx?null==t.parentCtx:this.parentCtx.equals(t.parentCtx))},a.prototype.toString=function(){var t=null===this.parentCtx?"":this.parentCtx.toString();return 0===t.length?this.returnState===i.EMPTY_RETURN_STATE?"$":""+this.returnState:this.returnState+" "+t},c.prototype=Object.create(a.prototype),c.prototype.constructor=c,c.prototype.isEmpty=function(){return!0},c.prototype.getParent=function(t){return null},c.prototype.getReturnState=function(t){return this.returnState},c.prototype.equals=function(t){return this===t},c.prototype.toString=function(){return"$"},i.EMPTY=new c,u.prototype=Object.create(i.prototype),u.prototype.constructor=u,u.prototype.isEmpty=function(){return this.returnStates[0]===i.EMPTY_RETURN_STATE},Object.defineProperty(u.prototype,"length",{get:function(){return this.returnStates.length}}),u.prototype.getParent=function(t){return this.parents[t]},u.prototype.getReturnState=function(t){return this.returnStates[t]},u.prototype.equals=function(t){return this===t||t instanceof u&&this.hashCode()===t.hashCode()&&this.returnStates===t.returnStates&&this.parents===t.parents},u.prototype.toString=function(){if(this.isEmpty())return"[]";for(var t="[",e=0;e<this.returnStates.length;e++)e>0&&(t+=", "),this.returnStates[e]!==i.EMPTY_RETURN_STATE?(t+=this.returnStates[e],null!==this.parents[e]?t=t+" "+this.parents[e]:t+="null"):t+="$";return t+"]"},e.merge=function t(e,n,r,o){if(e===n)return e;if(e instanceof a&&n instanceof a)return function(e,n,r,o){if(null!==o){var s=o.get(e,n);if(null!==s)return s;if(null!==(s=o.get(n,e)))return s}var c=function(t,e,n){if(n){if(t===i.EMPTY)return i.EMPTY;if(e===i.EMPTY)return i.EMPTY}else{if(t===i.EMPTY&&e===i.EMPTY)return i.EMPTY;if(t===i.EMPTY){var r=[e.returnState,i.EMPTY_RETURN_STATE],o=[e.parentCtx,null];return new u(o,r)}if(e===i.EMPTY){r=[t.returnState,i.EMPTY_RETURN_STATE],o=[t.parentCtx,null];return new u(o,r)}}return null}(e,n,r);if(null!==c)return null!==o&&o.set(e,n,c),c;if(e.returnState===n.returnState){var p=t(e.parentCtx,n.parentCtx,r,o);if(p===e.parentCtx)return e;if(p===n.parentCtx)return n;var l=a.create(p,e.returnState);return null!==o&&o.set(e,n,l),l}var h=null;if((e===n||null!==e.parentCtx&&e.parentCtx===n.parentCtx)&&(h=e.parentCtx),null!==h){var f=[e.returnState,n.returnState];e.returnState>n.returnState&&(f[0]=n.returnState,f[1]=e.returnState);var d=[h,h],y=new u(d,f);return null!==o&&o.set(e,n,y),y}f=[e.returnState,n.returnState],d=[e.parentCtx,n.parentCtx];e.returnState>n.returnState&&(f[0]=n.returnState,f[1]=e.returnState,d=[n.parentCtx,e.parentCtx]);var g=new u(d,f);return null!==o&&o.set(e,n,g),g}(e,n,r,o);if(r){if(e instanceof c)return e;if(n instanceof c)return n}return e instanceof a&&(e=new u([e.getParent()],[e.returnState])),n instanceof a&&(n=new u([n.getParent()],[n.returnState])),function(e,n,r,o){if(null!==o){var s=o.get(e,n);if(null!==s)return s;if(null!==(s=o.get(n,e)))return s}for(var c=0,p=0,l=0,h=[],f=[];c<e.returnStates.length&&p<n.returnStates.length;){var d=e.parents[c],y=n.parents[p];if(e.returnStates[c]===n.returnStates[p]){var g=e.returnStates[c],x=g===i.EMPTY_RETURN_STATE&&null===d&&null===y,m=null!==d&&null!==y&&d===y;if(x||m)f[l]=d,h[l]=g;else{var v=t(d,y,r,o);f[l]=v,h[l]=g}c+=1,p+=1}else e.returnStates[c]<n.returnStates[p]?(f[l]=d,h[l]=e.returnStates[c],c+=1):(f[l]=y,h[l]=n.returnStates[p],p+=1);l+=1}if(c<e.returnStates.length)for(var E=c;E<e.returnStates.length;E++)f[l]=e.parents[E],h[l]=e.returnStates[E],l+=1;else for(E=p;E<n.returnStates.length;E++)f[l]=n.parents[E],h[l]=n.returnStates[E],l+=1;if(l<f.length){if(1===l){var T=a.create(f[0],h[0]);return null!==o&&o.set(e,n,T),T}f=f.slice(0,l),h=h.slice(0,l)}var _=new u(f,h);return _===e?(null!==o&&o.set(e,n,e),e):_===n?(null!==o&&o.set(e,n,n),n):(function(t){for(var e={},n=0;n<t.length;n++){var r=t[n];r in e||(e[r]=r)}for(var o=0;o<t.length;o++)t[o]=e[t[o]]}(f),null!==o&&o.set(e,n,_),_)}(e,n,r,o)},e.PredictionContext=i,e.PredictionContextCache=s,e.SingletonPredictionContext=a,e.predictionContextFromRuleContext=function t(e,n){if(void 0!==n&&null!==n||(n=r.EMPTY),null===n.parentCtx||n===r.EMPTY)return i.EMPTY;var o=t(e,n.parentCtx),s=e.states[n.invokingState].transitions[0];return a.create(o,s.followState.stateNumber)},e.getCachedPredictionContext=function t(e,n,r){if(e.isEmpty())return e;var o=r[e]||null;if(null!==o)return o;if(null!==(o=n.get(e)))return r[e]=o,o;for(var s=!1,c=[],p=0;p<c.length;p++){var l=t(e.getParent(p),n,r);if(s||l!==e.getParent(p)){if(!s){c=[];for(var h=0;h<e.length;h++)c[h]=e.getParent(h);s=!0}c[p]=l}}if(!s)return n.add(e),r[e]=e,e;var f=null;return f=0===c.length?i.EMPTY:1===c.length?a.create(c[0],e.getReturnState(0)):new u(c,e.returnStates),n.add(f),r[f]=f,r[e]=f,f}},function(t,e,n){var r=n(1).Token,o=(n(2).Interval,n(2).IntervalSet),i=n(11).Predicate,s=n(11).PrecedencePredicate;function a(t){if(void 0===t||null===t)throw"target cannot be null.";return this.target=t,this.isEpsilon=!1,this.label=null,this}function c(t,e){return a.call(this,t),this.label_=e,this.label=this.makeLabel(),this.serializationType=a.ATOM,this}function u(t,e,n,r){return a.call(this,t),this.ruleIndex=e,this.precedence=n,this.followState=r,this.serializationType=a.RULE,this.isEpsilon=!0,this}function p(t,e){return a.call(this,t),this.serializationType=a.EPSILON,this.isEpsilon=!0,this.outermostPrecedenceReturn=e,this}function l(t,e,n){return a.call(this,t),this.serializationType=a.RANGE,this.start=e,this.stop=n,this.label=this.makeLabel(),this}function h(t){return a.call(this,t),this}function f(t,e,n,r){return h.call(this,t),this.serializationType=a.PREDICATE,this.ruleIndex=e,this.predIndex=n,this.isCtxDependent=r,this.isEpsilon=!0,this}function d(t,e,n,r){return a.call(this,t),this.serializationType=a.ACTION,this.ruleIndex=e,this.actionIndex=void 0===n?-1:n,this.isCtxDependent=void 0!==r&&r,this.isEpsilon=!0,this}function y(t,e){return a.call(this,t),this.serializationType=a.SET,void 0!==e&&null!==e?this.label=e:(this.label=new o,this.label.addOne(r.INVALID_TYPE)),this}function g(t,e){return y.call(this,t,e),this.serializationType=a.NOT_SET,this}function x(t){return a.call(this,t),this.serializationType=a.WILDCARD,this}function m(t,e){return h.call(this,t),this.serializationType=a.PRECEDENCE,this.precedence=e,this.isEpsilon=!0,this}a.EPSILON=1,a.RANGE=2,a.RULE=3,a.PREDICATE=4,a.ATOM=5,a.ACTION=6,a.SET=7,a.NOT_SET=8,a.WILDCARD=9,a.PRECEDENCE=10,a.serializationNames=["INVALID","EPSILON","RANGE","RULE","PREDICATE","ATOM","ACTION","SET","NOT_SET","WILDCARD","PRECEDENCE"],a.serializationTypes={EpsilonTransition:a.EPSILON,RangeTransition:a.RANGE,RuleTransition:a.RULE,PredicateTransition:a.PREDICATE,AtomTransition:a.ATOM,ActionTransition:a.ACTION,SetTransition:a.SET,NotSetTransition:a.NOT_SET,WildcardTransition:a.WILDCARD,PrecedencePredicateTransition:a.PRECEDENCE},c.prototype=Object.create(a.prototype),c.prototype.constructor=c,c.prototype.makeLabel=function(){var t=new o;return t.addOne(this.label_),t},c.prototype.matches=function(t,e,n){return this.label_===t},c.prototype.toString=function(){return this.label_},u.prototype=Object.create(a.prototype),u.prototype.constructor=u,u.prototype.matches=function(t,e,n){return!1},p.prototype=Object.create(a.prototype),p.prototype.constructor=p,p.prototype.matches=function(t,e,n){return!1},p.prototype.toString=function(){return"epsilon"},l.prototype=Object.create(a.prototype),l.prototype.constructor=l,l.prototype.makeLabel=function(){var t=new o;return t.addRange(this.start,this.stop),t},l.prototype.matches=function(t,e,n){return t>=this.start&&t<=this.stop},l.prototype.toString=function(){return"'"+String.fromCharCode(this.start)+"'..'"+String.fromCharCode(this.stop)+"'"},h.prototype=Object.create(a.prototype),h.prototype.constructor=h,f.prototype=Object.create(h.prototype),f.prototype.constructor=f,f.prototype.matches=function(t,e,n){return!1},f.prototype.getPredicate=function(){return new i(this.ruleIndex,this.predIndex,this.isCtxDependent)},f.prototype.toString=function(){return"pred_"+this.ruleIndex+":"+this.predIndex},d.prototype=Object.create(a.prototype),d.prototype.constructor=d,d.prototype.matches=function(t,e,n){return!1},d.prototype.toString=function(){return"action_"+this.ruleIndex+":"+this.actionIndex},y.prototype=Object.create(a.prototype),y.prototype.constructor=y,y.prototype.matches=function(t,e,n){return this.label.contains(t)},y.prototype.toString=function(){return this.label.toString()},g.prototype=Object.create(y.prototype),g.prototype.constructor=g,g.prototype.matches=function(t,e,n){return t>=e&&t<=n&&!y.prototype.matches.call(this,t,e,n)},g.prototype.toString=function(){return"~"+y.prototype.toString.call(this)},x.prototype=Object.create(a.prototype),x.prototype.constructor=x,x.prototype.matches=function(t,e,n){return t>=e&&t<=n},x.prototype.toString=function(){return"."},m.prototype=Object.create(h.prototype),m.prototype.constructor=m,m.prototype.matches=function(t,e,n){return!1},m.prototype.getPredicate=function(){return new s(this.precedence)},m.prototype.toString=function(){return this.precedence+" >= _p"},e.Transition=a,e.AtomTransition=c,e.SetTransition=y,e.NotSetTransition=g,e.RuleTransition=u,e.ActionTransition=d,e.EpsilonTransition=p,e.RangeTransition=l,e.WildcardTransition=x,e.PredicateTransition=f,e.PrecedencePredicateTransition=m,e.AbstractPredicateTransition=h},function(t,e,n){var r=n(49).LL1Analyzer,o=n(2).IntervalSet;function i(t,e){return this.grammarType=t,this.maxTokenType=e,this.states=[],this.decisionToState=[],this.ruleToStartState=[],this.ruleToStopState=null,this.modeNameToStartState={},this.ruleToTokenType=null,this.lexerActions=null,this.modeToStartState=[],this}i.prototype.nextTokensInContext=function(t,e){return new r(this).LOOK(t,null,e)},i.prototype.nextTokensNoContext=function(t){return null!==t.nextTokenWithinRule?t.nextTokenWithinRule:(t.nextTokenWithinRule=this.nextTokensInContext(t,null),t.nextTokenWithinRule.readOnly=!0,t.nextTokenWithinRule)},i.prototype.nextTokens=function(t,e){return void 0===e?this.nextTokensNoContext(t):this.nextTokensInContext(t,e)},i.prototype.addState=function(t){null!==t&&(t.atn=this,t.stateNumber=this.states.length),this.states.push(t)},i.prototype.removeState=function(t){this.states[t.stateNumber]=null},i.prototype.defineDecisionState=function(t){return this.decisionToState.push(t),t.decision=this.decisionToState.length-1,t.decision},i.prototype.getDecisionState=function(t){return 0===this.decisionToState.length?null:this.decisionToState[t]};var s=n(1).Token;i.prototype.getExpectedTokens=function(t,e){if(t<0||t>=this.states.length)throw"Invalid state number.";var n=this.states[t],r=this.nextTokens(n);if(!r.contains(s.EPSILON))return r;var i=new o;for(i.addSet(r),i.removeOne(s.EPSILON);null!==e&&e.invokingState>=0&&r.contains(s.EPSILON);){var a=this.states[e.invokingState].transitions[0];r=this.nextTokens(a.followState),i.addSet(r),i.removeOne(s.EPSILON),e=e.parentCtx}return r.contains(s.EPSILON)&&i.addOne(s.EOF),i},i.INVALID_ALT_NUMBER=0,e.ATN=i},function(t,e,n){var r=n(8).ATN,o=n(0),i=o.Hash,s=o.Set,a=n(11).SemanticContext,c=n(6).merge;function u(t){return t.hashCodeForConfigSet()}function p(t,e){return t===e||null!==t&&null!==e&&t.equalsForConfigSet(e)}function l(t){return this.configLookup=new s(u,p),this.fullCtx=void 0===t||t,this.readOnly=!1,this.configs=[],this.uniqueAlt=0,this.conflictingAlts=null,this.hasSemanticContext=!1,this.dipsIntoOuterContext=!1,this.cachedHashCode=-1,this}function h(){return l.call(this),this.configLookup=new s,this}l.prototype.add=function(t,e){if(void 0===e&&(e=null),this.readOnly)throw"This set is readonly";t.semanticContext!==a.NONE&&(this.hasSemanticContext=!0),t.reachesIntoOuterContext>0&&(this.dipsIntoOuterContext=!0);var n=this.configLookup.add(t);if(n===t)return this.cachedHashCode=-1,this.configs.push(t),!0;var r=!this.fullCtx,o=c(n.context,t.context,r,e);return n.reachesIntoOuterContext=Math.max(n.reachesIntoOuterContext,t.reachesIntoOuterContext),t.precedenceFilterSuppressed&&(n.precedenceFilterSuppressed=!0),n.context=o,!0},l.prototype.getStates=function(){for(var t=new s,e=0;e<this.configs.length;e++)t.add(this.configs[e].state);return t},l.prototype.getPredicates=function(){for(var t=[],e=0;e<this.configs.length;e++){var n=this.configs[e].semanticContext;n!==a.NONE&&t.push(n.semanticContext)}return t},Object.defineProperty(l.prototype,"items",{get:function(){return this.configs}}),l.prototype.optimizeConfigs=function(t){if(this.readOnly)throw"This set is readonly";if(0!==this.configLookup.length)for(var e=0;e<this.configs.length;e++){var n=this.configs[e];n.context=t.getCachedContext(n.context)}},l.prototype.addAll=function(t){for(var e=0;e<t.length;e++)this.add(t[e]);return!1},l.prototype.equals=function(t){return this===t||t instanceof l&&o.equalArrays(this.configs,t.configs)&&this.fullCtx===t.fullCtx&&this.uniqueAlt===t.uniqueAlt&&this.conflictingAlts===t.conflictingAlts&&this.hasSemanticContext===t.hasSemanticContext&&this.dipsIntoOuterContext===t.dipsIntoOuterContext},l.prototype.hashCode=function(){var t=new i;return this.updateHashCode(t),t.finish()},l.prototype.updateHashCode=function(t){this.readOnly?(-1===this.cachedHashCode&&((t=new i).update(this.configs),this.cachedHashCode=t.finish()),t.update(this.cachedHashCode)):t.update(this.configs)},Object.defineProperty(l.prototype,"length",{get:function(){return this.configs.length}}),l.prototype.isEmpty=function(){return 0===this.configs.length},l.prototype.contains=function(t){if(null===this.configLookup)throw"This method is not implemented for readonly sets.";return this.configLookup.contains(t)},l.prototype.containsFast=function(t){if(null===this.configLookup)throw"This method is not implemented for readonly sets.";return this.configLookup.containsFast(t)},l.prototype.clear=function(){if(this.readOnly)throw"This set is readonly";this.configs=[],this.cachedHashCode=-1,this.configLookup=new s},l.prototype.setReadonly=function(t){this.readOnly=t,t&&(this.configLookup=null)},l.prototype.toString=function(){return o.arrayToString(this.configs)+(this.hasSemanticContext?",hasSemanticContext="+this.hasSemanticContext:"")+(this.uniqueAlt!==r.INVALID_ALT_NUMBER?",uniqueAlt="+this.uniqueAlt:"")+(null!==this.conflictingAlts?",conflictingAlts="+this.conflictingAlts:"")+(this.dipsIntoOuterContext?",dipsIntoOuterContext":"")},h.prototype=Object.create(l.prototype),h.prototype.constructor=h,e.ATNConfigSet=l,e.OrderedATNConfigSet=h},function(t,e,n){var r=n(9).ATNConfigSet,o=n(0),i=o.Hash,s=o.Set;function a(t,e){return this.alt=e,this.pred=t,this}function c(t,e){return null===t&&(t=-1),null===e&&(e=new r),this.stateNumber=t,this.configs=e,this.edges=null,this.isAcceptState=!1,this.prediction=0,this.lexerActionExecutor=null,this.requiresFullContext=!1,this.predicates=null,this}a.prototype.toString=function(){return"("+this.pred+", "+this.alt+")"},c.prototype.getAltSet=function(){var t=new s;if(null!==this.configs)for(var e=0;e<this.configs.length;e++){var n=this.configs[e];t.add(n.alt)}return 0===t.length?null:t},c.prototype.equals=function(t){return this===t||t instanceof c&&this.configs.equals(t.configs)},c.prototype.toString=function(){var t=this.stateNumber+":"+this.configs;return this.isAcceptState&&(t+="=>",null!==this.predicates?t+=this.predicates:t+=this.prediction),t},c.prototype.hashCode=function(){var t=new i;return t.update(this.configs),this.isAcceptState&&(null!==this.predicates?t.update(this.predicates):t.update(this.prediction)),t.finish()},e.DFAState=c,e.PredPrediction=a},function(t,e,n){var r=n(0).Set,o=n(0).Hash;function i(){return this}function s(t,e,n){return i.call(this),this.ruleIndex=void 0===t?-1:t,this.predIndex=void 0===e?-1:e,this.isCtxDependent=void 0!==n&&n,this}function a(t){i.call(this),this.precedence=void 0===t?0:t}function c(t,e){i.call(this);var n=new r;t instanceof c?t.opnds.map(function(t){n.add(t)}):n.add(t),e instanceof c?e.opnds.map(function(t){n.add(t)}):n.add(e);var o=a.filterPrecedencePredicates(n);if(o.length>0){var s=null;o.map(function(t){(null===s||t.precedence<s.precedence)&&(s=t)}),n.add(s)}return this.opnds=n.values(),this}function u(t,e){i.call(this);var n=new r;t instanceof u?t.opnds.map(function(t){n.add(t)}):n.add(t),e instanceof u?e.opnds.map(function(t){n.add(t)}):n.add(e);var o=a.filterPrecedencePredicates(n);if(o.length>0){var s=o.sort(function(t,e){return t.compareTo(e)}),c=s[s.length-1];n.add(c)}return this.opnds=n.values(),this}i.prototype.hashCode=function(){var t=new o;return this.updateHashCode(t),t.finish()},i.prototype.evaluate=function(t,e){},i.prototype.evalPrecedence=function(t,e){return this},i.andContext=function(t,e){if(null===t||t===i.NONE)return e;if(null===e||e===i.NONE)return t;var n=new c(t,e);return 1===n.opnds.length?n.opnds[0]:n},i.orContext=function(t,e){if(null===t)return e;if(null===e)return t;if(t===i.NONE||e===i.NONE)return i.NONE;var n=new u(t,e);return 1===n.opnds.length?n.opnds[0]:n},s.prototype=Object.create(i.prototype),s.prototype.constructor=s,i.NONE=new s,s.prototype.evaluate=function(t,e){var n=this.isCtxDependent?e:null;return t.sempred(n,this.ruleIndex,this.predIndex)},s.prototype.updateHashCode=function(t){t.update(this.ruleIndex,this.predIndex,this.isCtxDependent)},s.prototype.equals=function(t){return this===t||t instanceof s&&this.ruleIndex===t.ruleIndex&&this.predIndex===t.predIndex&&this.isCtxDependent===t.isCtxDependent},s.prototype.toString=function(){return"{"+this.ruleIndex+":"+this.predIndex+"}?"},a.prototype=Object.create(i.prototype),a.prototype.constructor=a,a.prototype.evaluate=function(t,e){return t.precpred(e,this.precedence)},a.prototype.evalPrecedence=function(t,e){return t.precpred(e,this.precedence)?i.NONE:null},a.prototype.compareTo=function(t){return this.precedence-t.precedence},a.prototype.updateHashCode=function(t){t.update(31)},a.prototype.equals=function(t){return this===t||t instanceof a&&this.precedence===t.precedence},a.prototype.toString=function(){return"{"+this.precedence+">=prec}?"},a.filterPrecedencePredicates=function(t){var e=[];return t.values().map(function(t){t instanceof a&&e.push(t)}),e},c.prototype=Object.create(i.prototype),c.prototype.constructor=c,c.prototype.equals=function(t){return this===t||t instanceof c&&this.opnds===t.opnds},c.prototype.updateHashCode=function(t){t.update(this.opnds,"AND")},c.prototype.evaluate=function(t,e){for(var n=0;n<this.opnds.length;n++)if(!this.opnds[n].evaluate(t,e))return!1;return!0},c.prototype.evalPrecedence=function(t,e){for(var n=!1,r=[],o=0;o<this.opnds.length;o++){var s=this.opnds[o],a=s.evalPrecedence(t,e);if(n|=a!==s,null===a)return null;a!==i.NONE&&r.push(a)}if(!n)return this;if(0===r.length)return i.NONE;var c=null;return r.map(function(t){c=null===c?t:i.andContext(c,t)}),c},c.prototype.toString=function(){var t="";return this.opnds.map(function(e){t+="&& "+e.toString()}),t.length>3?t.slice(3):t},u.prototype=Object.create(i.prototype),u.prototype.constructor=u,u.prototype.constructor=function(t){return this===t||t instanceof u&&this.opnds===t.opnds},u.prototype.updateHashCode=function(t){t.update(this.opnds,"OR")},u.prototype.evaluate=function(t,e){for(var n=0;n<this.opnds.length;n++)if(this.opnds[n].evaluate(t,e))return!0;return!1},u.prototype.evalPrecedence=function(t,e){for(var n=!1,r=[],o=0;o<this.opnds.length;o++){var s=this.opnds[o],a=s.evalPrecedence(t,e);if(n|=a!==s,a===i.NONE)return i.NONE;null!==a&&r.push(a)}return n?0===r.length?null:(r.map(function(t){return t}),null):this},u.prototype.toString=function(){var t="";return this.opnds.map(function(e){t+="|| "+e.toString()}),t.length>3?t.slice(3):t},e.SemanticContext=i,e.PrecedencePredicate=a,e.Predicate=s},function(t,e){function n(t,e,n){return this.dfa=t,this.literalNames=e||[],this.symbolicNames=n||[],this}function r(t){return n.call(this,t,null),this}n.prototype.toString=function(){if(null===this.dfa.s0)return null;for(var t="",e=this.dfa.sortedStates(),n=0;n<e.length;n++){var r=e[n];if(null!==r.edges)for(var o=r.edges.length,i=0;i<o;i++){var s=r.edges[i]||null;null!==s&&2147483647!==s.stateNumber&&(t=(t=(t=(t=(t=(t=t.concat(this.getStateString(r))).concat("-")).concat(this.getEdgeLabel(i))).concat("->")).concat(this.getStateString(s))).concat("\n"))}}return 0===t.length?null:t},n.prototype.getEdgeLabel=function(t){return 0===t?"EOF":null!==this.literalNames||null!==this.symbolicNames?this.literalNames[t-1]||this.symbolicNames[t-1]:String.fromCharCode(t-1)},n.prototype.getStateString=function(t){var e=(t.isAcceptState?":":"")+"s"+t.stateNumber+(t.requiresFullContext?"^":"");return t.isAcceptState?null!==t.predicates?e+"=>"+t.predicates.toString():e+"=>"+t.prediction.toString():e},r.prototype=Object.create(n.prototype),r.prototype.constructor=r,r.prototype.getEdgeLabel=function(t){return"'"+String.fromCharCode(t)+"'"},e.DFASerializer=n,e.LexerDFASerializer=r},function(t,e){function n(){return this}function r(){return n.call(this),this}function o(t){if(n.call(this),null===t)throw"delegates";return this.delegates=t,this}n.prototype.syntaxError=function(t,e,n,r,o,i){},n.prototype.reportAmbiguity=function(t,e,n,r,o,i,s){},n.prototype.reportAttemptingFullContext=function(t,e,n,r,o,i){},n.prototype.reportContextSensitivity=function(t,e,n,r,o,i){},r.prototype=Object.create(n.prototype),r.prototype.constructor=r,r.INSTANCE=new r,r.prototype.syntaxError=function(t,e,n,r,o,i){console.error("line "+n+":"+r+" "+o)},o.prototype=Object.create(n.prototype),o.prototype.constructor=o,o.prototype.syntaxError=function(t,e,n,r,o,i){this.delegates.map(function(s){s.syntaxError(t,e,n,r,o,i)})},o.prototype.reportAmbiguity=function(t,e,n,r,o,i,s){this.delegates.map(function(a){a.reportAmbiguity(t,e,n,r,o,i,s)})},o.prototype.reportAttemptingFullContext=function(t,e,n,r,o,i){this.delegates.map(function(s){s.reportAttemptingFullContext(t,e,n,r,o,i)})},o.prototype.reportContextSensitivity=function(t,e,n,r,o,i){this.delegates.map(function(s){s.reportContextSensitivity(t,e,n,r,o,i)})},e.ErrorListener=n,e.ConsoleErrorListener=r,e.ProxyErrorListener=o},function(t,e,n){var r=n(1).Token,o=n(27).Recognizer,i=n(46).CommonTokenFactory,s=n(3).RecognitionException,a=n(3).LexerNoViableAltException;function c(t){return o.call(this),this._input=t,this._factory=i.DEFAULT,this._tokenFactorySourcePair=[this,t],this._interp=null,this._token=null,this._tokenStartCharIndex=-1,this._tokenStartLine=-1,this._tokenStartColumn=-1,this._hitEOF=!1,this._channel=r.DEFAULT_CHANNEL,this._type=r.INVALID_TYPE,this._modeStack=[],this._mode=c.DEFAULT_MODE,this._text=null,this}c.prototype=Object.create(o.prototype),c.prototype.constructor=c,c.DEFAULT_MODE=0,c.MORE=-2,c.SKIP=-3,c.DEFAULT_TOKEN_CHANNEL=r.DEFAULT_CHANNEL,c.HIDDEN=r.HIDDEN_CHANNEL,c.MIN_CHAR_VALUE=0,c.MAX_CHAR_VALUE=1114111,c.prototype.reset=function(){null!==this._input&&this._input.seek(0),this._token=null,this._type=r.INVALID_TYPE,this._channel=r.DEFAULT_CHANNEL,this._tokenStartCharIndex=-1,this._tokenStartColumn=-1,this._tokenStartLine=-1,this._text=null,this._hitEOF=!1,this._mode=c.DEFAULT_MODE,this._modeStack=[],this._interp.reset()},c.prototype.nextToken=function(){if(null===this._input)throw"nextToken requires a non-null input stream.";var t=this._input.mark();try{for(;;){if(this._hitEOF)return this.emitEOF(),this._token;this._token=null,this._channel=r.DEFAULT_CHANNEL,this._tokenStartCharIndex=this._input.index,this._tokenStartColumn=this._interp.column,this._tokenStartLine=this._interp.line,this._text=null;for(var e=!1;;){this._type=r.INVALID_TYPE;var n=c.SKIP;try{n=this._interp.match(this._input,this._mode)}catch(t){if(!(t instanceof s))throw console.log(t.stack),t;this.notifyListeners(t),this.recover(t)}if(this._input.LA(1)===r.EOF&&(this._hitEOF=!0),this._type===r.INVALID_TYPE&&(this._type=n),this._type===c.SKIP){e=!0;break}if(this._type!==c.MORE)break}if(!e)return null===this._token&&this.emit(),this._token}}finally{this._input.release(t)}},c.prototype.skip=function(){this._type=c.SKIP},c.prototype.more=function(){this._type=c.MORE},c.prototype.mode=function(t){this._mode=t},c.prototype.pushMode=function(t){this._interp.debug&&console.log("pushMode "+t),this._modeStack.push(this._mode),this.mode(t)},c.prototype.popMode=function(){if(0===this._modeStack.length)throw"Empty Stack";return this._interp.debug&&console.log("popMode back to "+this._modeStack.slice(0,-1)),this.mode(this._modeStack.pop()),this._mode},Object.defineProperty(c.prototype,"inputStream",{get:function(){return this._input},set:function(t){this._input=null,this._tokenFactorySourcePair=[this,this._input],this.reset(),this._input=t,this._tokenFactorySourcePair=[this,this._input]}}),Object.defineProperty(c.prototype,"sourceName",{get:function(){return this._input.sourceName}}),c.prototype.emitToken=function(t){this._token=t},c.prototype.emit=function(){var t=this._factory.create(this._tokenFactorySourcePair,this._type,this._text,this._channel,this._tokenStartCharIndex,this.getCharIndex()-1,this._tokenStartLine,this._tokenStartColumn);return this.emitToken(t),t},c.prototype.emitEOF=function(){var t=this.column,e=this.line,n=this._factory.create(this._tokenFactorySourcePair,r.EOF,null,r.DEFAULT_CHANNEL,this._input.index,this._input.index-1,e,t);return this.emitToken(n),n},Object.defineProperty(c.prototype,"type",{get:function(){return this.type},set:function(t){this._type=t}}),Object.defineProperty(c.prototype,"line",{get:function(){return this._interp.line},set:function(t){this._interp.line=t}}),Object.defineProperty(c.prototype,"column",{get:function(){return this._interp.column},set:function(t){this._interp.column=t}}),c.prototype.getCharIndex=function(){return this._input.index},Object.defineProperty(c.prototype,"text",{get:function(){return null!==this._text?this._text:this._interp.getText(this._input)},set:function(t){this._text=t}}),c.prototype.getAllTokens=function(){for(var t=[],e=this.nextToken();e.type!==r.EOF;)t.push(e),e=this.nextToken();return t},c.prototype.notifyListeners=function(t){var e=this._tokenStartCharIndex,n=this._input.index,r=this._input.getText(e,n),o="token recognition error at: '"+this.getErrorDisplay(r)+"'";this.getErrorListenerDispatch().syntaxError(this,null,this._tokenStartLine,this._tokenStartColumn,o,t)},c.prototype.getErrorDisplay=function(t){for(var e=[],n=0;n<t.length;n++)e.push(t[n]);return e.join("")},c.prototype.getErrorDisplayForChar=function(t){return t.charCodeAt(0)===r.EOF?"<EOF>":"\n"===t?"\\n":"\t"===t?"\\t":"\r"===t?"\\r":t},c.prototype.getCharErrorDisplay=function(t){return"'"+this.getErrorDisplayForChar(t)+"'"},c.prototype.recover=function(t){this._input.LA(1)!==r.EOF&&(t instanceof a?this._interp.consume(this._input):this._input.consume())},e.Lexer=c},function(t,e,n){var r=n(4).RuleNode,o=n(4).INVALID_INTERVAL,i=n(8).INVALID_ALT_NUMBER;function s(t,e){return r.call(this),this.parentCtx=t||null,this.invokingState=e||-1,this}s.prototype=Object.create(r.prototype),s.prototype.constructor=s,s.prototype.depth=function(){for(var t=0,e=this;null!==e;)e=e.parentCtx,t+=1;return t},s.prototype.isEmpty=function(){return-1===this.invokingState},s.prototype.getSourceInterval=function(){return o},s.prototype.getRuleContext=function(){return this},s.prototype.getPayload=function(){return this},s.prototype.getText=function(){return 0===this.getChildCount()?"":this.children.map(function(t){return t.getText()}).join("")},s.prototype.getAltNumber=function(){return i},s.prototype.setAltNumber=function(t){},s.prototype.getChild=function(t){return null},s.prototype.getChildCount=function(){return 0},s.prototype.accept=function(t){return t.visitChildren(this)},e.RuleContext=s;var a=n(31).Trees;s.prototype.toStringTree=function(t,e){return a.toStringTree(this,t,e)},s.prototype.toString=function(t,e){t=t||null,e=e||null;for(var n=this,r="[";null!==n&&n!==e;){if(null===t)n.isEmpty()||(r+=n.invokingState);else{var o=n.ruleIndex;r+=o>=0&&o<t.length?t[o]:""+o}null===n.parentCtx||null===t&&n.parentCtx.isEmpty()||(r+=" "),n=n.parentCtx}return r+"]"}},function(t,e,n){var r=n(5).DecisionState,o=n(11).SemanticContext,i=n(0).Hash;function s(t,e){if(null===t){var n={state:null,alt:null,context:null,semanticContext:null};return e&&(n.reachesIntoOuterContext=0),n}var r={};return r.state=t.state||null,r.alt=void 0===t.alt?null:t.alt,r.context=t.context||null,r.semanticContext=t.semanticContext||null,e&&(r.reachesIntoOuterContext=t.reachesIntoOuterContext||0,r.precedenceFilterSuppressed=t.precedenceFilterSuppressed||!1),r}function a(t,e){return this.checkContext(t,e),t=s(t),e=s(e,!0),this.state=null!==t.state?t.state:e.state,this.alt=null!==t.alt?t.alt:e.alt,this.context=null!==t.context?t.context:e.context,this.semanticContext=null!==t.semanticContext?t.semanticContext:null!==e.semanticContext?e.semanticContext:o.NONE,this.reachesIntoOuterContext=e.reachesIntoOuterContext,this.precedenceFilterSuppressed=e.precedenceFilterSuppressed,this}function c(t,e){a.call(this,t,e);var n=t.lexerActionExecutor||null;return this.lexerActionExecutor=n||(null!==e?e.lexerActionExecutor:null),this.passedThroughNonGreedyDecision=null!==e&&this.checkNonGreedyDecision(e,this.state),this}a.prototype.checkContext=function(t,e){null!==t.context&&void 0!==t.context||null!==e&&null!==e.context&&void 0!==e.context||(this.context=null)},a.prototype.hashCode=function(){var t=new i;return this.updateHashCode(t),t.finish()},a.prototype.updateHashCode=function(t){t.update(this.state.stateNumber,this.alt,this.context,this.semanticContext)},a.prototype.equals=function(t){return this===t||t instanceof a&&this.state.stateNumber===t.state.stateNumber&&this.alt===t.alt&&(null===this.context?null===t.context:this.context.equals(t.context))&&this.semanticContext.equals(t.semanticContext)&&this.precedenceFilterSuppressed===t.precedenceFilterSuppressed},a.prototype.hashCodeForConfigSet=function(){var t=new i;return t.update(this.state.stateNumber,this.alt,this.semanticContext),t.finish()},a.prototype.equalsForConfigSet=function(t){return this===t||t instanceof a&&this.state.stateNumber===t.state.stateNumber&&this.alt===t.alt&&this.semanticContext.equals(t.semanticContext)},a.prototype.toString=function(){return"("+this.state+","+this.alt+(null!==this.context?",["+this.context.toString()+"]":"")+(this.semanticContext!==o.NONE?","+this.semanticContext.toString():"")+(this.reachesIntoOuterContext>0?",up="+this.reachesIntoOuterContext:"")+")"},c.prototype=Object.create(a.prototype),c.prototype.constructor=c,c.prototype.updateHashCode=function(t){t.update(this.state.stateNumber,this.alt,this.context,this.semanticContext,this.passedThroughNonGreedyDecision,this.lexerActionExecutor)},c.prototype.equals=function(t){return this===t||t instanceof c&&this.passedThroughNonGreedyDecision==t.passedThroughNonGreedyDecision&&(this.lexerActionExecutor?this.lexerActionExecutor.equals(t.lexerActionExecutor):!t.lexerActionExecutor)&&a.prototype.equals.call(this,t)},c.prototype.hashCodeForConfigSet=c.prototype.hashCode,c.prototype.equalsForConfigSet=c.prototype.equals,c.prototype.checkNonGreedyDecision=function(t,e){return t.passedThroughNonGreedyDecision||e instanceof r&&e.nonGreedy},e.ATNConfig=a,e.LexerATNConfig=c},function(t,e,n){e.atn=n(50),e.codepointat=n(24),e.dfa=n(43),e.fromcodepoint=n(23),e.tree=n(41),e.error=n(40),e.Token=n(1).Token,e.CharStreams=n(38).CharStreams,e.CommonToken=n(1).CommonToken,e.InputStream=n(18).InputStream,e.FileStream=n(37).FileStream,e.CommonTokenStream=n(36).CommonTokenStream,e.Lexer=n(14).Lexer,e.Parser=n(34).Parser;var r=n(6);e.PredictionContextCache=r.PredictionContextCache,e.ParserRuleContext=n(19).ParserRuleContext,e.Interval=n(2).Interval,e.Utils=n(0)},function(t,e,n){var r=n(1).Token;function o(t,e){return this.name="<empty>",this.strdata=t,this.decodeToUnicodeCodePoints=e||!1,function(t,e){if(t._index=0,t.data=[],t.decodeToUnicodeCodePoints)for(var n=0;n<t.strdata.length;){var r=t.strdata.codePointAt(n);t.data.push(r),n+=r<=65535?1:2}else for(n=0;n<t.strdata.length;n++){var o=t.strdata.charCodeAt(n);t.data.push(o)}t._size=t.data.length}(this),this}n(24),n(23),Object.defineProperty(o.prototype,"index",{get:function(){return this._index}}),Object.defineProperty(o.prototype,"size",{get:function(){return this._size}}),o.prototype.reset=function(){this._index=0},o.prototype.consume=function(){if(this._index>=this._size)throw"cannot consume EOF";this._index+=1},o.prototype.LA=function(t){if(0===t)return 0;t<0&&(t+=1);var e=this._index+t-1;return e<0||e>=this._size?r.EOF:this.data[e]},o.prototype.LT=function(t){return this.LA(t)},o.prototype.mark=function(){return-1},o.prototype.release=function(t){},o.prototype.seek=function(t){t<=this._index?this._index=t:this._index=Math.min(t,this._size)},o.prototype.getText=function(t,e){if(e>=this._size&&(e=this._size-1),t>=this._size)return"";if(this.decodeToUnicodeCodePoints){for(var n="",r=t;r<=e;r++)n+=String.fromCodePoint(this.data[r]);return n}return this.strdata.slice(t,e+1)},o.prototype.toString=function(){return this.strdata},e.InputStream=o},function(t,e,n){var r=n(15).RuleContext,o=n(4),i=o.INVALID_INTERVAL,s=o.TerminalNode,a=o.TerminalNodeImpl,c=o.ErrorNodeImpl,u=n(2).Interval;function p(t,e){t=t||null,e=e||null,r.call(this,t,e),this.ruleIndex=-1,this.children=null,this.start=null,this.stop=null,this.exception=null}function l(t,e,n){return p.call(t,e),this.ruleIndex=n,this}p.prototype=Object.create(r.prototype),p.prototype.constructor=p,p.prototype.copyFrom=function(t){this.parentCtx=t.parentCtx,this.invokingState=t.invokingState,this.children=null,this.start=t.start,this.stop=t.stop,t.children&&(this.children=[],t.children.map(function(t){t instanceof c&&(this.children.push(t),t.parentCtx=this)},this))},p.prototype.enterRule=function(t){},p.prototype.exitRule=function(t){},p.prototype.addChild=function(t){return null===this.children&&(this.children=[]),this.children.push(t),t},p.prototype.removeLastChild=function(){null!==this.children&&this.children.pop()},p.prototype.addTokenNode=function(t){var e=new a(t);return this.addChild(e),e.parentCtx=this,e},p.prototype.addErrorNode=function(t){var e=new c(t);return this.addChild(e),e.parentCtx=this,e},p.prototype.getChild=function(t,e){if(e=e||null,null===this.children||t<0||t>=this.children.length)return null;if(null===e)return this.children[t];for(var n=0;n<this.children.length;n++){var r=this.children[n];if(r instanceof e){if(0===t)return r;t-=1}}return null},p.prototype.getToken=function(t,e){if(null===this.children||e<0||e>=this.children.length)return null;for(var n=0;n<this.children.length;n++){var r=this.children[n];if(r instanceof s&&r.symbol.type===t){if(0===e)return r;e-=1}}return null},p.prototype.getTokens=function(t){if(null===this.children)return[];for(var e=[],n=0;n<this.children.length;n++){var r=this.children[n];r instanceof s&&r.symbol.type===t&&e.push(r)}return e},p.prototype.getTypedRuleContext=function(t,e){return this.getChild(e,t)},p.prototype.getTypedRuleContexts=function(t){if(null===this.children)return[];for(var e=[],n=0;n<this.children.length;n++){var r=this.children[n];r instanceof t&&e.push(r)}return e},p.prototype.getChildCount=function(){return null===this.children?0:this.children.length},p.prototype.getSourceInterval=function(){return null===this.start||null===this.stop?i:new u(this.start.tokenIndex,this.stop.tokenIndex)},r.EMPTY=new p,l.prototype=Object.create(p.prototype),l.prototype.constructor=l,e.ParserRuleContext=p},function(t,e,n){var r=n(17);function o(){return r.tree.ParseTreeListener.call(this),this}o.prototype=Object.create(r.tree.ParseTreeListener.prototype),o.prototype.constructor=o,o.prototype.enterProg=function(t){},o.prototype.exitProg=function(t){},o.prototype.enterDescription=function(t){},o.prototype.exitDescription=function(t){},o.prototype.enterTheme=function(t){},o.prototype.exitTheme=function(t){},o.prototype.enterThemeName=function(t){},o.prototype.exitThemeName=function(t){},o.prototype.enterStarterExp=function(t){},o.prototype.exitStarterExp=function(t){},o.prototype.enterStarter=function(t){},o.prototype.exitStarter=function(t){},o.prototype.enterParticipant=function(t){},o.prototype.exitParticipant=function(t){},o.prototype.enterBlock=function(t){},o.prototype.exitBlock=function(t){},o.prototype.enterRet=function(t){},o.prototype.exitRet=function(t){},o.prototype.enterValue=function(t){},o.prototype.exitValue=function(t){},o.prototype.enterStat=function(t){},o.prototype.exitStat=function(t){},o.prototype.enterComment=function(t){},o.prototype.exitComment=function(t){},o.prototype.enterCreation=function(t){},o.prototype.exitCreation=function(t){},o.prototype.enterMessage=function(t){},o.prototype.exitMessage=function(t){},o.prototype.enterFunc=function(t){},o.prototype.exitFunc=function(t){},o.prototype.enterSignature=function(t){},o.prototype.exitSignature=function(t){},o.prototype.enterAssignment=function(t){},o.prototype.exitAssignment=function(t){},o.prototype.enterAsyncMessage=function(t){},o.prototype.exitAsyncMessage=function(t){},o.prototype.enterContent=function(t){},o.prototype.exitContent=function(t){},o.prototype.enterSource=function(t){},o.prototype.exitSource=function(t){},o.prototype.enterTarget=function(t){},o.prototype.exitTarget=function(t){},o.prototype.enterConstructor=function(t){},o.prototype.exitConstructor=function(t){},o.prototype.enterType=function(t){},o.prototype.exitType=function(t){},o.prototype.enterAssignee=function(t){},o.prototype.exitAssignee=function(t){},o.prototype.enterTo=function(t){},o.prototype.exitTo=function(t){},o.prototype.enterMethodName=function(t){},o.prototype.exitMethodName=function(t){},o.prototype.enterParameters=function(t){},o.prototype.exitParameters=function(t){},o.prototype.enterParameter=function(t){},o.prototype.exitParameter=function(t){},o.prototype.enterAlt=function(t){},o.prototype.exitAlt=function(t){},o.prototype.enterIfBlock=function(t){},o.prototype.exitIfBlock=function(t){},o.prototype.enterElseIfBlock=function(t){},o.prototype.exitElseIfBlock=function(t){},o.prototype.enterElseBlock=function(t){},o.prototype.exitElseBlock=function(t){},o.prototype.enterBraceBlock=function(t){},o.prototype.exitBraceBlock=function(t){},o.prototype.enterLoop=function(t){},o.prototype.exitLoop=function(t){},o.prototype.enterNotExpr=function(t){},o.prototype.exitNotExpr=function(t){},o.prototype.enterFuncExpr=function(t){},o.prototype.exitFuncExpr=function(t){},o.prototype.enterUnaryMinusExpr=function(t){},o.prototype.exitUnaryMinusExpr=function(t){},o.prototype.enterMultiplicationExpr=function(t){},o.prototype.exitMultiplicationExpr=function(t){},o.prototype.enterAtomExpr=function(t){},o.prototype.exitAtomExpr=function(t){},o.prototype.enterOrExpr=function(t){},o.prototype.exitOrExpr=function(t){},o.prototype.enterAdditiveExpr=function(t){},o.prototype.exitAdditiveExpr=function(t){},o.prototype.enterRelationalExpr=function(t){},o.prototype.exitRelationalExpr=function(t){},o.prototype.enterEqualityExpr=function(t){},o.prototype.exitEqualityExpr=function(t){},o.prototype.enterAndExpr=function(t){},o.prototype.exitAndExpr=function(t){},o.prototype.enterNumberAtom=function(t){},o.prototype.exitNumberAtom=function(t){},o.prototype.enterBooleanAtom=function(t){},o.prototype.exitBooleanAtom=function(t){},o.prototype.enterIdAtom=function(t){},o.prototype.exitIdAtom=function(t){},o.prototype.enterStringAtom=function(t){},o.prototype.exitStringAtom=function(t){},o.prototype.enterNilAtom=function(t){},o.prototype.exitNilAtom=function(t){},o.prototype.enterParExpr=function(t){},o.prototype.exitParExpr=function(t){},e.sequenceParserListener=o},function(t,e){},function(t,e,n){var r=n(1).Token,o=n(3),i=o.NoViableAltException,s=o.InputMismatchException,a=o.FailedPredicateException,c=o.ParseCancellationException,u=n(5).ATNState,p=n(2).Interval,l=n(2).IntervalSet;function h(){}function f(){return h.call(this),this.errorRecoveryMode=!1,this.lastErrorIndex=-1,this.lastErrorStates=null,this}function d(){return f.call(this),this}h.prototype.reset=function(t){},h.prototype.recoverInline=function(t){},h.prototype.recover=function(t,e){},h.prototype.sync=function(t){},h.prototype.inErrorRecoveryMode=function(t){},h.prototype.reportError=function(t){},f.prototype=Object.create(h.prototype),f.prototype.constructor=f,f.prototype.reset=function(t){this.endErrorCondition(t)},f.prototype.beginErrorCondition=function(t){this.errorRecoveryMode=!0},f.prototype.inErrorRecoveryMode=function(t){return this.errorRecoveryMode},f.prototype.endErrorCondition=function(t){this.errorRecoveryMode=!1,this.lastErrorStates=null,this.lastErrorIndex=-1},f.prototype.reportMatch=function(t){this.endErrorCondition(t)},f.prototype.reportError=function(t,e){this.inErrorRecoveryMode(t)||(this.beginErrorCondition(t),e instanceof i?this.reportNoViableAlternative(t,e):e instanceof s?this.reportInputMismatch(t,e):e instanceof a?this.reportFailedPredicate(t,e):(console.log("unknown recognition error type: "+e.constructor.name),console.log(e.stack),t.notifyErrorListeners(e.getOffendingToken(),e.getMessage(),e)))},f.prototype.recover=function(t,e){this.lastErrorIndex===t.getInputStream().index&&null!==this.lastErrorStates&&this.lastErrorStates.indexOf(t.state)>=0&&t.consume(),this.lastErrorIndex=t._input.index,null===this.lastErrorStates&&(this.lastErrorStates=[]),this.lastErrorStates.push(t.state);var n=this.getErrorRecoverySet(t);this.consumeUntil(t,n)},f.prototype.sync=function(t){if(!this.inErrorRecoveryMode(t)){var e=t._interp.atn.states[t.state],n=t.getTokenStream().LA(1),o=t.atn.nextTokens(e);if(!o.contains(r.EPSILON)&&!o.contains(n))switch(e.stateType){case u.BLOCK_START:case u.STAR_BLOCK_START:case u.PLUS_BLOCK_START:case u.STAR_LOOP_ENTRY:if(null!==this.singleTokenDeletion(t))return;throw new s(t);case u.PLUS_LOOP_BACK:case u.STAR_LOOP_BACK:this.reportUnwantedToken(t);var i=new l;i.addSet(t.getExpectedTokens());var a=i.addSet(this.getErrorRecoverySet(t));this.consumeUntil(t,a)}}},f.prototype.reportNoViableAlternative=function(t,e){var n,o=t.getTokenStream();n=null!==o?e.startToken.type===r.EOF?"<EOF>":o.getText(new p(e.startToken.tokenIndex,e.offendingToken.tokenIndex)):"<unknown input>";var i="no viable alternative at input "+this.escapeWSAndQuote(n);t.notifyErrorListeners(i,e.offendingToken,e)},f.prototype.reportInputMismatch=function(t,e){var n="mismatched input "+this.getTokenErrorDisplay(e.offendingToken)+" expecting "+e.getExpectedTokens().toString(t.literalNames,t.symbolicNames);t.notifyErrorListeners(n,e.offendingToken,e)},f.prototype.reportFailedPredicate=function(t,e){var n="rule "+t.ruleNames[t._ctx.ruleIndex]+" "+e.message;t.notifyErrorListeners(n,e.offendingToken,e)},f.prototype.reportUnwantedToken=function(t){if(!this.inErrorRecoveryMode(t)){this.beginErrorCondition(t);var e=t.getCurrentToken(),n="extraneous input "+this.getTokenErrorDisplay(e)+" expecting "+this.getExpectedTokens(t).toString(t.literalNames,t.symbolicNames);t.notifyErrorListeners(n,e,null)}},f.prototype.reportMissingToken=function(t){if(!this.inErrorRecoveryMode(t)){this.beginErrorCondition(t);var e=t.getCurrentToken(),n="missing "+this.getExpectedTokens(t).toString(t.literalNames,t.symbolicNames)+" at "+this.getTokenErrorDisplay(e);t.notifyErrorListeners(n,e,null)}},f.prototype.recoverInline=function(t){var e=this.singleTokenDeletion(t);if(null!==e)return t.consume(),e;if(this.singleTokenInsertion(t))return this.getMissingSymbol(t);throw new s(t)},f.prototype.singleTokenInsertion=function(t){var e=t.getTokenStream().LA(1),n=t._interp.atn,r=n.states[t.state].transitions[0].target;return!!n.nextTokens(r,t._ctx).contains(e)&&(this.reportMissingToken(t),!0)},f.prototype.singleTokenDeletion=function(t){var e=t.getTokenStream().LA(2);if(this.getExpectedTokens(t).contains(e)){this.reportUnwantedToken(t),t.consume();var n=t.getCurrentToken();return this.reportMatch(t),n}return null},f.prototype.getMissingSymbol=function(t){var e,n=t.getCurrentToken(),o=this.getExpectedTokens(t).first();e=o===r.EOF?"<missing EOF>":"<missing "+t.literalNames[o]+">";var i=n,s=t.getTokenStream().LT(-1);return i.type===r.EOF&&null!==s&&(i=s),t.getTokenFactory().create(i.source,o,e,r.DEFAULT_CHANNEL,-1,-1,i.line,i.column)},f.prototype.getExpectedTokens=function(t){return t.getExpectedTokens()},f.prototype.getTokenErrorDisplay=function(t){if(null===t)return"<no token>";var e=t.text;return null===e&&(e=t.type===r.EOF?"<EOF>":"<"+t.type+">"),this.escapeWSAndQuote(e)},f.prototype.escapeWSAndQuote=function(t){return"'"+(t=(t=(t=t.replace(/\n/g,"\\n")).replace(/\r/g,"\\r")).replace(/\t/g,"\\t"))+"'"},f.prototype.getErrorRecoverySet=function(t){for(var e=t._interp.atn,n=t._ctx,o=new l;null!==n&&n.invokingState>=0;){var i=e.states[n.invokingState].transitions[0],s=e.nextTokens(i.followState);o.addSet(s),n=n.parentCtx}return o.removeOne(r.EPSILON),o},f.prototype.consumeUntil=function(t,e){for(var n=t.getTokenStream().LA(1);n!==r.EOF&&!e.contains(n);)t.consume(),n=t.getTokenStream().LA(1)},d.prototype=Object.create(f.prototype),d.prototype.constructor=d,d.prototype.recover=function(t,e){for(var n=t._ctx;null!==n;)n.exception=e,n=n.parentCtx;throw new c(e)},d.prototype.recoverInline=function(t){this.recover(t,new s(t))},d.prototype.sync=function(t){},e.BailErrorStrategy=d,e.DefaultErrorStrategy=f},function(t,e){
/*! https://mths.be/fromcodepoint v0.2.1 by @mathias */
String.fromCodePoint||function(){var t=function(){try{var t={},e=Object.defineProperty,n=e(t,t,t)&&e}catch(t){}return n}(),e=String.fromCharCode,n=Math.floor,r=function(t){var r,o,i=[],s=-1,a=arguments.length;if(!a)return"";for(var c="";++s<a;){var u=Number(arguments[s]);if(!isFinite(u)||u<0||u>1114111||n(u)!=u)throw RangeError("Invalid code point: "+u);u<=65535?i.push(u):(r=55296+((u-=65536)>>10),o=u%1024+56320,i.push(r,o)),(s+1==a||i.length>16384)&&(c+=e.apply(null,i),i.length=0)}return c};t?t(String,"fromCodePoint",{value:r,configurable:!0,writable:!0}):String.fromCodePoint=r}()},function(t,e){
/*! https://mths.be/codepointat v0.2.0 by @mathias */
String.prototype.codePointAt||function(){"use strict";var t=function(){try{var t={},e=Object.defineProperty,n=e(t,t,t)&&e}catch(t){}return n}(),e=function(t){if(null==this)throw TypeError();var e=String(this),n=e.length,r=t?Number(t):0;if(r!=r&&(r=0),!(r<0||r>=n)){var o,i=e.charCodeAt(r);return i>=55296&&i<=56319&&n>r+1&&(o=e.charCodeAt(r+1))>=56320&&o<=57343?1024*(i-55296)+o-56320+65536:i}};t?t(String.prototype,"codePointAt",{value:e,configurable:!0,writable:!0}):String.prototype.codePointAt=e}()},function(t,e,n){n(0).Set;var r=n(0).Map,o=n(0).BitSet,i=n(0).AltDict,s=n(8).ATN,a=n(5).RuleStopState,c=n(9).ATNConfigSet,u=n(16).ATNConfig,p=n(11).SemanticContext,l=(n(0).Hash,n(0).hashStuff);function h(){return this}n(0).equalArrays,h.SLL=0,h.LL=1,h.LL_EXACT_AMBIG_DETECTION=2,h.hasSLLConflictTerminatingPrediction=function(t,e){if(h.allConfigsInRuleStopStates(e))return!0;if(t===h.SLL&&e.hasSemanticContext){for(var n=new c,r=0;r<e.items.length;r++){var o=e.items[r];o=new u({semanticContext:p.NONE},o),n.add(o)}e=n}var i=h.getConflictingAltSubsets(e);return h.hasConflictingAltSet(i)&&!h.hasStateAssociatedWithOneAlt(e)},h.hasConfigInRuleStopState=function(t){for(var e=0;e<t.items.length;e++)if(t.items[e].state instanceof a)return!0;return!1},h.allConfigsInRuleStopStates=function(t){for(var e=0;e<t.items.length;e++)if(!(t.items[e].state instanceof a))return!1;return!0},h.resolvesToJustOneViableAlt=function(t){return h.getSingleViableAlt(t)},h.allSubsetsConflict=function(t){return!h.hasNonConflictingAltSet(t)},h.hasNonConflictingAltSet=function(t){for(var e=0;e<t.length;e++)if(1===t[e].length)return!0;return!1},h.hasConflictingAltSet=function(t){for(var e=0;e<t.length;e++)if(t[e].length>1)return!0;return!1},h.allSubsetsEqual=function(t){for(var e=null,n=0;n<t.length;n++){var r=t[n];if(null===e)e=r;else if(r!==e)return!1}return!0},h.getUniqueAlt=function(t){var e=h.getAlts(t);return 1===e.length?e.minValue():s.INVALID_ALT_NUMBER},h.getAlts=function(t){var e=new o;return t.map(function(t){e.or(t)}),e},h.getConflictingAltSubsets=function(t){var e=new r;return e.hashFunction=function(t){l(t.state.stateNumber,t.context)},e.equalsFunction=function(t,e){return t.state.stateNumber==e.state.stateNumber&&t.context.equals(e.context)},t.items.map(function(t){var n=e.get(t);null===n&&(n=new o,e.put(t,n)),n.add(t.alt)}),e.getValues()},h.getStateToAltMap=function(t){var e=new i;return t.items.map(function(t){var n=e.get(t.state);null===n&&(n=new o,e.put(t.state,n)),n.add(t.alt)}),e},h.hasStateAssociatedWithOneAlt=function(t){for(var e=h.getStateToAltMap(t).values(),n=0;n<e.length;n++)if(1===e[n].length)return!0;return!1},h.getSingleViableAlt=function(t){for(var e=null,n=0;n<t.length;n++){var r=t[n].minValue();if(null===e)e=r;else if(e!==r)return s.INVALID_ALT_NUMBER}return e},e.PredictionMode=h},function(t,e,n){var r=n(10).DFAState,o=n(9).ATNConfigSet,i=n(6).getCachedPredictionContext;function s(t,e){return this.atn=t,this.sharedContextCache=e,this}s.ERROR=new r(2147483647,new o),s.prototype.getCachedContext=function(t){return null===this.sharedContextCache?t:i(t,this.sharedContextCache,{})},e.ATNSimulator=s},function(t,e,n){var r=n(1).Token,o=n(13).ConsoleErrorListener,i=n(13).ProxyErrorListener;function s(){return this._listeners=[o.INSTANCE],this._interp=null,this._stateNumber=-1,this}s.tokenTypeMapCache={},s.ruleIndexMapCache={},s.prototype.checkVersion=function(t){"4.7.1"!==t&&console.log("ANTLR runtime and generated code versions disagree: 4.7.1!="+t)},s.prototype.addErrorListener=function(t){this._listeners.push(t)},s.prototype.removeErrorListeners=function(){this._listeners=[]},s.prototype.getTokenTypeMap=function(){var t=this.getTokenNames();if(null===t)throw"The current recognizer does not provide a list of token names.";var e=this.tokenTypeMapCache[t];return void 0===e&&((e=t.reduce(function(t,e,n){t[e]=n})).EOF=r.EOF,this.tokenTypeMapCache[t]=e),e},s.prototype.getRuleIndexMap=function(){var t=this.ruleNames;if(null===t)throw"The current recognizer does not provide a list of rule names.";var e=this.ruleIndexMapCache[t];return void 0===e&&(e=t.reduce(function(t,e,n){t[e]=n}),this.ruleIndexMapCache[t]=e),e},s.prototype.getTokenType=function(t){var e=this.getTokenTypeMap()[t];return void 0!==e?e:r.INVALID_TYPE},s.prototype.getErrorHeader=function(t){return"line "+t.getOffendingToken().line+":"+t.getOffendingToken().column},s.prototype.getTokenErrorDisplay=function(t){if(null===t)return"<no token>";var e=t.text;return null===e&&(e=t.type===r.EOF?"<EOF>":"<"+t.type+">"),"'"+(e=e.replace("\n","\\n").replace("\r","\\r").replace("\t","\\t"))+"'"},s.prototype.getErrorListenerDispatch=function(){return new i(this._listeners)},s.prototype.sempred=function(t,e,n){return!0},s.prototype.precpred=function(t,e){return!0},Object.defineProperty(s.prototype,"state",{get:function(){return this._stateNumber},set:function(t){this._stateNumber=t}}),e.Recognizer=s},function(t,e){function n(){}function r(t){return this.actionType=t,this.isPositionDependent=!1,this}function o(){return r.call(this,n.SKIP),this}function i(t){return r.call(this,n.TYPE),this.type=t,this}function s(t){return r.call(this,n.PUSH_MODE),this.mode=t,this}function a(){return r.call(this,n.POP_MODE),this}function c(){return r.call(this,n.MORE),this}function u(t){return r.call(this,n.MODE),this.mode=t,this}function p(t,e){return r.call(this,n.CUSTOM),this.ruleIndex=t,this.actionIndex=e,this.isPositionDependent=!0,this}function l(t){return r.call(this,n.CHANNEL),this.channel=t,this}function h(t,e){return r.call(this,e.actionType),this.offset=t,this.action=e,this.isPositionDependent=!0,this}n.CHANNEL=0,n.CUSTOM=1,n.MODE=2,n.MORE=3,n.POP_MODE=4,n.PUSH_MODE=5,n.SKIP=6,n.TYPE=7,r.prototype.hashCode=function(){var t=new Hash;return this.updateHashCode(t),t.finish()},r.prototype.updateHashCode=function(t){t.update(this.actionType)},r.prototype.equals=function(t){return this===t},o.prototype=Object.create(r.prototype),o.prototype.constructor=o,o.INSTANCE=new o,o.prototype.execute=function(t){t.skip()},o.prototype.toString=function(){return"skip"},i.prototype=Object.create(r.prototype),i.prototype.constructor=i,i.prototype.execute=function(t){t.type=this.type},i.prototype.updateHashCode=function(t){t.update(this.actionType,this.type)},i.prototype.equals=function(t){return this===t||t instanceof i&&this.type===t.type},i.prototype.toString=function(){return"type("+this.type+")"},s.prototype=Object.create(r.prototype),s.prototype.constructor=s,s.prototype.execute=function(t){t.pushMode(this.mode)},s.prototype.updateHashCode=function(t){t.update(this.actionType,this.mode)},s.prototype.equals=function(t){return this===t||t instanceof s&&this.mode===t.mode},s.prototype.toString=function(){return"pushMode("+this.mode+")"},a.prototype=Object.create(r.prototype),a.prototype.constructor=a,a.INSTANCE=new a,a.prototype.execute=function(t){t.popMode()},a.prototype.toString=function(){return"popMode"},c.prototype=Object.create(r.prototype),c.prototype.constructor=c,c.INSTANCE=new c,c.prototype.execute=function(t){t.more()},c.prototype.toString=function(){return"more"},u.prototype=Object.create(r.prototype),u.prototype.constructor=u,u.prototype.execute=function(t){t.mode(this.mode)},u.prototype.updateHashCode=function(t){t.update(this.actionType,this.mode)},u.prototype.equals=function(t){return this===t||t instanceof u&&this.mode===t.mode},u.prototype.toString=function(){return"mode("+this.mode+")"},p.prototype=Object.create(r.prototype),p.prototype.constructor=p,p.prototype.execute=function(t){t.action(null,this.ruleIndex,this.actionIndex)},p.prototype.updateHashCode=function(t){t.update(this.actionType,this.ruleIndex,this.actionIndex)},p.prototype.equals=function(t){return this===t||t instanceof p&&this.ruleIndex===t.ruleIndex&&this.actionIndex===t.actionIndex},l.prototype=Object.create(r.prototype),l.prototype.constructor=l,l.prototype.execute=function(t){t._channel=this.channel},l.prototype.updateHashCode=function(t){t.update(this.actionType,this.channel)},l.prototype.equals=function(t){return this===t||t instanceof l&&this.channel===t.channel},l.prototype.toString=function(){return"channel("+this.channel+")"},h.prototype=Object.create(r.prototype),h.prototype.constructor=h,h.prototype.execute=function(t){this.action.execute(t)},h.prototype.updateHashCode=function(t){t.update(this.actionType,this.offset,this.action)},h.prototype.equals=function(t){return this===t||t instanceof h&&this.offset===t.offset&&this.action===t.action},e.LexerActionType=n,e.LexerSkipAction=o,e.LexerChannelAction=l,e.LexerCustomAction=p,e.LexerIndexedCustomAction=h,e.LexerMoreAction=c,e.LexerTypeAction=i,e.LexerPushModeAction=s,e.LexerPopModeAction=a,e.LexerModeAction=u},function(t,e){function n(t){return void 0===t&&(t=null),this.readOnly=!1,this.verifyATN=null===t||t.verifyATN,this.generateRuleBypassTransitions=null!==t&&t.generateRuleBypassTransitions,this}n.defaultOptions=new n,n.defaultOptions.readOnly=!0,e.ATNDeserializationOptions=n},function(t,e,n){var r=n(1).Token,o=n(8).ATN,i=n(48).ATNType,s=n(5),a=s.ATNState,c=s.BasicState,u=s.DecisionState,p=s.BlockStartState,l=s.BlockEndState,h=s.LoopEndState,f=s.RuleStartState,d=s.RuleStopState,y=s.TokensStartState,g=s.PlusLoopbackState,x=s.StarLoopbackState,m=s.StarLoopEntryState,v=s.PlusBlockStartState,E=s.StarBlockStartState,T=s.BasicBlockStartState,_=n(7),C=_.Transition,S=_.AtomTransition,R=_.SetTransition,A=_.NotSetTransition,O=_.RuleTransition,L=_.RangeTransition,N=_.ActionTransition,b=_.EpsilonTransition,I=_.WildcardTransition,k=_.PredicateTransition,P=_.PrecedencePredicateTransition,w=n(2).IntervalSet,D=(n(2).Interval,n(29).ATNDeserializationOptions),M=n(28),F=M.LexerActionType,U=M.LexerSkipAction,j=M.LexerChannelAction,B=M.LexerCustomAction,H=M.LexerMoreAction,V=M.LexerTypeAction,$=M.LexerPushModeAction,q=M.LexerPopModeAction,W=M.LexerModeAction,G="59627784-3BE5-417A-B9EB-8131A7286089",z=["AADB8D7E-AEEF-4415-AD2B-8204D6CF042E",G];function K(t,e){var n=[];return n[t-1]=e,n.map(function(t){return e})}function Y(t){return void 0!==t&&null!==t||(t=D.defaultOptions),this.deserializationOptions=t,this.stateFactories=null,this.actionFactories=null,this}Y.prototype.isFeatureSupported=function(t,e){var n=z.indexOf(t);return!(n<0)&&z.indexOf(e)>=n},Y.prototype.deserialize=function(t){this.reset(t),this.checkVersion(),this.checkUUID();var e=this.readATN();this.readStates(e),this.readRules(e),this.readModes(e);var n=[];return this.readSets(e,n,this.readInt.bind(this)),this.isFeatureSupported(G,this.uuid)&&this.readSets(e,n,this.readInt32.bind(this)),this.readEdges(e,n),this.readDecisions(e),this.readLexerActions(e),this.markPrecedenceDecisions(e),this.verifyATN(e),this.deserializationOptions.generateRuleBypassTransitions&&e.grammarType===i.PARSER&&(this.generateRuleBypassTransitions(e),this.verifyATN(e)),e},Y.prototype.reset=function(t){var e=t.split("").map(function(t){var e=t.charCodeAt(0);return e>1?e-2:e+65533});e[0]=t.charCodeAt(0),this.data=e,this.pos=0},Y.prototype.checkVersion=function(){var t=this.readInt();if(3!==t)throw"Could not deserialize ATN with version "+t+" (expected 3)."},Y.prototype.checkUUID=function(){var t=this.readUUID();if(z.indexOf(t)<0)throw"59627784-3BE5-417A-B9EB-8131A7286089";this.uuid=t},Y.prototype.readATN=function(){var t=this.readInt(),e=this.readInt();return new o(t,e)},Y.prototype.readStates=function(t){for(var e,n,r,o=[],i=[],s=this.readInt(),c=0;c<s;c++){var u=this.readInt();if(u!==a.INVALID_TYPE){var l=this.readInt();65535===l&&(l=-1);var h=this.stateFactory(u,l);if(u===a.LOOP_END){var f=this.readInt();o.push([h,f])}else if(h instanceof p){var d=this.readInt();i.push([h,d])}t.addState(h)}else t.addState(null)}for(e=0;e<o.length;e++)(n=o[e])[0].loopBackState=t.states[n[1]];for(e=0;e<i.length;e++)(n=i[e])[0].endState=t.states[n[1]];var y=this.readInt();for(e=0;e<y;e++)r=this.readInt(),t.states[r].nonGreedy=!0;var g=this.readInt();for(e=0;e<g;e++)r=this.readInt(),t.states[r].isPrecedenceRule=!0},Y.prototype.readRules=function(t){var e,n=this.readInt();for(t.grammarType===i.LEXER&&(t.ruleToTokenType=K(n,0)),t.ruleToStartState=K(n,0),e=0;e<n;e++){var o=this.readInt(),s=t.states[o];if(t.ruleToStartState[e]=s,t.grammarType===i.LEXER){var a=this.readInt();65535===a&&(a=r.EOF),t.ruleToTokenType[e]=a}}for(t.ruleToStopState=K(n,0),e=0;e<t.states.length;e++){var c=t.states[e];c instanceof d&&(t.ruleToStopState[c.ruleIndex]=c,t.ruleToStartState[c.ruleIndex].stopState=c)}},Y.prototype.readModes=function(t){for(var e=this.readInt(),n=0;n<e;n++){var r=this.readInt();t.modeToStartState.push(t.states[r])}},Y.prototype.readSets=function(t,e,n){for(var r=this.readInt(),o=0;o<r;o++){var i=new w;e.push(i);var s=this.readInt();0!==this.readInt()&&i.addOne(-1);for(var a=0;a<s;a++){var c=n(),u=n();i.addRange(c,u)}}},Y.prototype.readEdges=function(t,e){var n,r,o,i,s,a=this.readInt();for(n=0;n<a;n++){var c=this.readInt(),u=this.readInt(),l=this.readInt(),h=this.readInt(),f=this.readInt(),d=this.readInt();i=this.edgeFactory(t,l,c,u,h,f,d,e),t.states[c].addTransition(i)}for(n=0;n<t.states.length;n++)for(o=t.states[n],r=0;r<o.transitions.length;r++){var y=o.transitions[r];if(y instanceof O){var E=-1;t.ruleToStartState[y.target.ruleIndex].isPrecedenceRule&&0===y.precedence&&(E=y.target.ruleIndex),i=new b(y.followState,E),t.ruleToStopState[y.target.ruleIndex].addTransition(i)}}for(n=0;n<t.states.length;n++){if((o=t.states[n])instanceof p){if(null===o.endState)throw"IllegalState";if(null!==o.endState.startState)throw"IllegalState";o.endState.startState=o}if(o instanceof g)for(r=0;r<o.transitions.length;r++)(s=o.transitions[r].target)instanceof v&&(s.loopBackState=o);else if(o instanceof x)for(r=0;r<o.transitions.length;r++)(s=o.transitions[r].target)instanceof m&&(s.loopBackState=o)}},Y.prototype.readDecisions=function(t){for(var e=this.readInt(),n=0;n<e;n++){var r=this.readInt(),o=t.states[r];t.decisionToState.push(o),o.decision=n}},Y.prototype.readLexerActions=function(t){if(t.grammarType===i.LEXER){var e=this.readInt();t.lexerActions=K(e,null);for(var n=0;n<e;n++){var r=this.readInt(),o=this.readInt();65535===o&&(o=-1);var s=this.readInt();65535===s&&(s=-1);var a=this.lexerActionFactory(r,o,s);t.lexerActions[n]=a}}},Y.prototype.generateRuleBypassTransitions=function(t){var e,n=t.ruleToStartState.length;for(e=0;e<n;e++)t.ruleToTokenType[e]=t.maxTokenType+e+1;for(e=0;e<n;e++)this.generateRuleBypassTransition(t,e)},Y.prototype.generateRuleBypassTransition=function(t,e){var n,r,o=new T;o.ruleIndex=e,t.addState(o);var i=new l;i.ruleIndex=e,t.addState(i),o.endState=i,t.defineDecisionState(o),i.startState=o;var s=null,a=null;if(t.ruleToStartState[e].isPrecedenceRule){for(a=null,n=0;n<t.states.length;n++)if(r=t.states[n],this.stateIsEndStateFor(r,e)){a=r,s=r.loopBackState.transitions[0];break}if(null===s)throw"Couldn't identify final state of the precedence rule prefix section."}else a=t.ruleToStopState[e];for(n=0;n<t.states.length;n++){r=t.states[n];for(var u=0;u<r.transitions.length;u++){var p=r.transitions[u];p!==s&&p.target===a&&(p.target=i)}}for(var h=t.ruleToStartState[e],f=h.transitions.length;f>0;)o.addTransition(h.transitions[f-1]),h.transitions=h.transitions.slice(-1);t.ruleToStartState[e].addTransition(new b(o)),i.addTransition(new b(a));var d=new c;t.addState(d),d.addTransition(new S(i,t.ruleToTokenType[e])),o.addTransition(new b(d))},Y.prototype.stateIsEndStateFor=function(t,e){if(t.ruleIndex!==e)return null;if(!(t instanceof m))return null;var n=t.transitions[t.transitions.length-1].target;return n instanceof h&&n.epsilonOnlyTransitions&&n.transitions[0].target instanceof d?t:null},Y.prototype.markPrecedenceDecisions=function(t){for(var e=0;e<t.states.length;e++){var n=t.states[e];if(n instanceof m&&t.ruleToStartState[n.ruleIndex].isPrecedenceRule){var r=n.transitions[n.transitions.length-1].target;r instanceof h&&r.epsilonOnlyTransitions&&r.transitions[0].target instanceof d&&(n.isPrecedenceDecision=!0)}}},Y.prototype.verifyATN=function(t){if(this.deserializationOptions.verifyATN)for(var e=0;e<t.states.length;e++){var n=t.states[e];if(null!==n)if(this.checkCondition(n.epsilonOnlyTransitions||n.transitions.length<=1),n instanceof v)this.checkCondition(null!==n.loopBackState);else if(n instanceof m)if(this.checkCondition(null!==n.loopBackState),this.checkCondition(2===n.transitions.length),n.transitions[0].target instanceof E)this.checkCondition(n.transitions[1].target instanceof h),this.checkCondition(!n.nonGreedy);else{if(!(n.transitions[0].target instanceof h))throw"IllegalState";this.checkCondition(n.transitions[1].target instanceof E),this.checkCondition(n.nonGreedy)}else n instanceof x?(this.checkCondition(1===n.transitions.length),this.checkCondition(n.transitions[0].target instanceof m)):n instanceof h?this.checkCondition(null!==n.loopBackState):n instanceof f?this.checkCondition(null!==n.stopState):n instanceof p?this.checkCondition(null!==n.endState):n instanceof l?this.checkCondition(null!==n.startState):n instanceof u?this.checkCondition(n.transitions.length<=1||n.decision>=0):this.checkCondition(n.transitions.length<=1||n instanceof d)}},Y.prototype.checkCondition=function(t,e){if(!t)throw void 0!==e&&null!==e||(e="IllegalState"),e},Y.prototype.readInt=function(){return this.data[this.pos++]},Y.prototype.readInt32=function(){return this.readInt()|this.readInt()<<16},Y.prototype.readLong=function(){return 4294967295&this.readInt32()|this.readInt32()<<32};var Q=function(){for(var t=[],e=0;e<256;e++)t[e]=(e+256).toString(16).substr(1).toUpperCase();return t}();Y.prototype.readUUID=function(){for(var t=[],e=7;e>=0;e--){var n=this.readInt();t[2*e+1]=255&n,t[2*e]=n>>8&255}return Q[t[0]]+Q[t[1]]+Q[t[2]]+Q[t[3]]+"-"+Q[t[4]]+Q[t[5]]+"-"+Q[t[6]]+Q[t[7]]+"-"+Q[t[8]]+Q[t[9]]+"-"+Q[t[10]]+Q[t[11]]+Q[t[12]]+Q[t[13]]+Q[t[14]]+Q[t[15]]},Y.prototype.edgeFactory=function(t,e,n,o,i,s,a,c){var u=t.states[o];switch(e){case C.EPSILON:return new b(u);case C.RANGE:return new L(u,0!==a?r.EOF:i,s);case C.RULE:return new O(t.states[i],s,a,u);case C.PREDICATE:return new k(u,i,s,0!==a);case C.PRECEDENCE:return new P(u,i);case C.ATOM:return new S(u,0!==a?r.EOF:i);case C.ACTION:return new N(u,i,s,0!==a);case C.SET:return new R(u,c[i]);case C.NOT_SET:return new A(u,c[i]);case C.WILDCARD:return new I(u);default:throw"The specified transition type: "+e+" is not valid."}},Y.prototype.stateFactory=function(t,e){if(null===this.stateFactories){var n=[];n[a.INVALID_TYPE]=null,n[a.BASIC]=function(){return new c},n[a.RULE_START]=function(){return new f},n[a.BLOCK_START]=function(){return new T},n[a.PLUS_BLOCK_START]=function(){return new v},n[a.STAR_BLOCK_START]=function(){return new E},n[a.TOKEN_START]=function(){return new y},n[a.RULE_STOP]=function(){return new d},n[a.BLOCK_END]=function(){return new l},n[a.STAR_LOOP_BACK]=function(){return new x},n[a.STAR_LOOP_ENTRY]=function(){return new m},n[a.PLUS_LOOP_BACK]=function(){return new g},n[a.LOOP_END]=function(){return new h},this.stateFactories=n}if(t>this.stateFactories.length||null===this.stateFactories[t])throw"The specified state type "+t+" is not valid.";var r=this.stateFactories[t]();if(null!==r)return r.ruleIndex=e,r},Y.prototype.lexerActionFactory=function(t,e,n){if(null===this.actionFactories){var r=[];r[F.CHANNEL]=function(t,e){return new j(t)},r[F.CUSTOM]=function(t,e){return new B(t,e)},r[F.MODE]=function(t,e){return new W(t)},r[F.MORE]=function(t,e){return H.INSTANCE},r[F.POP_MODE]=function(t,e){return q.INSTANCE},r[F.PUSH_MODE]=function(t,e){return new $(t)},r[F.SKIP]=function(t,e){return U.INSTANCE},r[F.TYPE]=function(t,e){return new V(t)},this.actionFactories=r}if(t>this.actionFactories.length||null===this.actionFactories[t])throw"The specified lexer action type "+t+" is not valid.";return this.actionFactories[t](e,n)},e.ATNDeserializer=Y},function(t,e,n){var r=n(0),o=n(1).Token,i=(n(4).RuleNode,n(4).ErrorNode),s=n(4).TerminalNode,a=n(19).ParserRuleContext,c=n(15).RuleContext,u=n(8).INVALID_ALT_NUMBER;function p(){}p.toStringTree=function(t,e,n){e=e||null,null!==(n=n||null)&&(e=n.ruleNames);var o=p.getNodeText(t,e);o=r.escapeWhitespace(o,!1);var i=t.getChildCount();if(0===i)return o;var s="("+o+" ";i>0&&(o=p.toStringTree(t.getChild(0),e),s=s.concat(o));for(var a=1;a<i;a++)o=p.toStringTree(t.getChild(a),e),s=s.concat(" "+o);return s.concat(")")},p.getNodeText=function(t,e,n){if(e=e||null,null!==(n=n||null)&&(e=n.ruleNames),null!==e){if(t instanceof c){var r=t.getAltNumber();return r!=u?e[t.ruleIndex]+":"+r:e[t.ruleIndex]}if(t instanceof i)return t.toString();if(t instanceof s&&null!==t.symbol)return t.symbol.text}var a=t.getPayload();return a instanceof o?a.text:t.getPayload().toString()},p.getChildren=function(t){for(var e=[],n=0;n<t.getChildCount();n++)e.push(t.getChild(n));return e},p.getAncestors=function(t){var e=[];for(t=t.getParent();null!==t;)e=[t].concat(e),t=t.getParent();return e},p.findAllTokenNodes=function(t,e){return p.findAllNodes(t,e,!0)},p.findAllRuleNodes=function(t,e){return p.findAllNodes(t,e,!1)},p.findAllNodes=function(t,e,n){var r=[];return p._findAllNodes(t,e,n,r),r},p._findAllNodes=function(t,e,n,r){n&&t instanceof s?t.symbol.type===e&&r.push(t):!n&&t instanceof a&&t.ruleIndex===e&&r.push(t);for(var o=0;o<t.getChildCount();o++)p._findAllNodes(t.getChild(o),e,n,r)},p.descendants=function(t){for(var e=[t],n=0;n<t.getChildCount();n++)e=e.concat(p.descendants(t.getChild(n)));return e},e.Trees=p},function(t,e,n){var r=n(17),o=n(20).sequenceParserListener,i=["а훑舆괭䐗껱趀ꫝ","2Ŝ\t\t\t","\t\t\t","\b\t\b\t\t\t\n\t\n\v\t\v\f\t\f","\r\t\r\t\t\t","\t\t\t\t","\t\t\t","\t\t\t\t","\t\t\t",'\t \t !\t!"\t"#\t#$\t$',"%\t%&\t&N\n","Q\nT\n\fW\v","Z\n","^\nc\n","\rdh\n","n\n","u\n","{\n","\b\b\n\b","\b\b\t\t\n\t\f\t\t\v\t","\t\t\n\t\n\n\n\n\n\n","\v\v\v\n\v\f\f","\n\f\f\f\f\n\f\f\f\f¡","\n\f\f\f\f¥\n\f\f\f\f©","\n\f\f\f\f\f®\n\f\r\r±","\n\r\r\r\r²¶\n","¼\n","¿\n","Æ\n","É\n","Ñ\n","Ö\n","Ý\n","à\nã\n","","í\n","","","þ\n","","ć\n\fĊ\v","Ď\n","Ē\n\fĕ\v","Ę\n",'     !!!"','"""####$$$',"$$$$$ĵ\n$$$$","$$$$$$$$$$","$$$$$$$$$Ō\n$\f","$$ŏ\v$%%%%%%Ŗ","\n%&&&&&F'",'\b\n\f "$&(*',",.02468:<>@BDFHJ\b\r","\t\f\b)*","űMb","g\bq\nt","\f~","","­","°µ","ÈÕ",' Ù"â',"$ç&î","(ð*ò",",ô.ö0ø","2ý4ā","6ă8č",":ď<ę",">ĝ@Ģ","BĥDĩFĴ","HŕJŗ","LNML","MNNPOQ","POPQQU","RT\bSRTW","USUV","VYWUXZ\n","YXYZZ[","[]\t\\^\r]\\","]^^__`","`ac,","bacddb","deefh","\rgfghh","iijjk&","kmln\bml","mnnoop","pqr(r\t","su\rts","tuuvvw","wx%xzy{\f","zyz{{|","|}}\v","~(\r","\r","","(","\f","","","\n","","#","\v","","H%","(","","\r","®",":\r","","®D#¡\r","  ¡","¡¢¢®","£¥\r¤£","¤¥¥¦","¦®$§©\r¨","§¨©©","ªª®«","¬.¬®\b\f­","­­ ","­¤­¨","­«®","¯±,°¯","±²²°","²³³",'´¶"µ´',"µ¶¶·","·¸$¸¾",",¹»º¼","6»º»¼","¼½½¿","¾¹¾¿","¿ÅÀÆ","ÁÂÂÃ","\tÃÄÄÆ","ÅÀÅÁ","ÅÆÆ",'ÇÉ"ÈÇ',"ÈÉÉÊ","ÊÐËÑ","ÌÍÍÎ","\tÎÏÏÑ","ÐËÐÌ","ÐÑÑ","ÒÓ2ÓÔ","'ÔÖÕÒ","ÕÖÖ×","×Ø Ø","Ùß4ÚÜ","ÛÝ6ÜÛ","ÜÝÝÞ","ÞàßÚ","ßàà!","áã.âá","âããä","äå0åæ","æ#çè","(èééê","*êì&ëí1","ìëìí","í%îï0","ï'ðñ(ñ",")òó/ó+","ôõ(õ-","ö÷(÷/","øù(ù1","úû(ûþ","üþýú","ýüýþ","þÿÿĀ(","Ā3āĂ(Ă","5ăĈ8Ąą","ąć8ĆĄ","ćĊĈĆ","Ĉĉĉ7","ĊĈċĎ","(ČĎH%čċ","čČĎ9","ďē<ĐĒ> ","đĐĒĕ","ēđēĔ","Ĕėĕē","ĖĘ@!ėĖė","ĘĘ;ę","Ě ĚěJ&ěĜ",'B"Ĝ=ĝĞ!',"Ğğ ğĠJ&Ġġ",'B"ġ?Ģģ!','ģĤB"ĤAĥ',"ĦĦħ\tħ","ĨĨCĩ",'Ī"ĪīJ&īĬ','B"ĬEĭĮ\b$',"ĮįįĵF$\rİı","ıĵF$\fĲĵ","ĳĵH%Ĵĭ","ĴİĴĲ","Ĵĳĵō","Ķķ\f\vķĸ\t","ĸŌF$\fĹĺ\f\nĺĻ\t","ĻŌF$\vļĽ\f\tĽ","ľ\tľŌF$\nĿŀ\f\b","ŀŁ\tŁŌF$\tłŃ","\fŃńńŌ","F$\bŅņ\fņŇ","ŇŌF$ňŉ\fŉ","ŊŊŌF$ŋĶ","ŋĹŋļ","ŋĿŋł","ŋŅŋň","Ōŏōŋ","ōŎŎG","ŏōŐŖ","\tőŖ\tŒŖ","(œŖ+ŔŖ","ŕŐŕő","ŕŒŕœ","ŕŔŖI","ŗŘŘřF","$řŚŚK",",MPUY]dgmtz ¤","¨­²µ»¾ÅÈÐÕÜß","âìýĈčēėĴŋōŕ"].join(""),s=(new r.atn.ATNDeserializer).deserialize(i),a=s.decisionToState.map(function(t,e){return new r.dfa.DFA(t,e)}),c=new r.PredictionContextCache,u=[null,"'->'","'@'","'||'","'&&'","'=='","'!='","'>'","'<'","'>='","'<='","'+'","'-'","'*'","'/'","'%'","'^'","'!'","':'","'::'","';'","','","'='","'('","')'","'{'","'}'","'true'","'false'","'nil'","'if'","'else'",null,"'return'","'new'","'Starter'","'Theme'","'.'"],p=[null,"ARROW","AT","OR","AND","EQ","NEQ","GT","LT","GTEQ","LTEQ","PLUS","MINUS","MULT","DIV","MOD","POW","NOT","COL","DOUBLECOL","SCOL","COMMA","ASSIGN","OPAR","CPAR","OBRACE","CBRACE","TRUE","FALSE","NIL","IF","ELSE","WHILE","RETURN","NEW","STARTER","THEME","DOT","ID","INT","FLOAT","STRING","COMMENT","SPACE","OTHER","NAME","CONTENT","NEWLINE","WS"],l=["prog","description","theme","themeName","starterExp","starter","participant","block","ret","value","stat","comment","creation","message","func","signature","assignment","asyncMessage","content","source","target","constructor","type","assignee","to","methodName","parameters","parameter","alt","ifBlock","elseIfBlock","elseBlock","braceBlock","loop","expr","atom","parExpr"];function h(t){return r.Parser.call(this,t),this._interp=new r.atn.ParserATNSimulator(this,s,a,c),this.ruleNames=l,this.literalNames=u,this.symbolicNames=p,this}function f(t,e,n){return void 0===e&&(e=null),void 0!==n&&null!==n||(n=-1),r.ParserRuleContext.call(this,e,n),this.parser=t,this.ruleIndex=h.RULE_prog,this}function d(t,e,n){return void 0===e&&(e=null),void 0!==n&&null!==n||(n=-1),r.ParserRuleContext.call(this,e,n),this.parser=t,this.ruleIndex=h.RULE_description,this}function y(t,e,n){return void 0===e&&(e=null),void 0!==n&&null!==n||(n=-1),r.ParserRuleContext.call(this,e,n),this.parser=t,this.ruleIndex=h.RULE_theme,this}function g(t,e,n){return void 0===e&&(e=null),void 0!==n&&null!==n||(n=-1),r.ParserRuleContext.call(this,e,n),this.parser=t,this.ruleIndex=h.RULE_themeName,this}function x(t,e,n){return void 0===e&&(e=null),void 0!==n&&null!==n||(n=-1),r.ParserRuleContext.call(this,e,n),this.parser=t,this.ruleIndex=h.RULE_starterExp,this}function m(t,e,n){return void 0===e&&(e=null),void 0!==n&&null!==n||(n=-1),r.ParserRuleContext.call(this,e,n),this.parser=t,this.ruleIndex=h.RULE_starter,this}function v(t,e,n){return void 0===e&&(e=null),void 0!==n&&null!==n||(n=-1),r.ParserRuleContext.call(this,e,n),this.parser=t,this.ruleIndex=h.RULE_participant,this}function E(t,e,n){return void 0===e&&(e=null),void 0!==n&&null!==n||(n=-1),r.ParserRuleContext.call(this,e,n),this.parser=t,this.ruleIndex=h.RULE_block,this}function T(t,e,n){return void 0===e&&(e=null),void 0!==n&&null!==n||(n=-1),r.ParserRuleContext.call(this,e,n),this.parser=t,this.ruleIndex=h.RULE_ret,this}function _(t,e,n){return void 0===e&&(e=null),void 0!==n&&null!==n||(n=-1),r.ParserRuleContext.call(this,e,n),this.parser=t,this.ruleIndex=h.RULE_value,this}function C(t,e,n){return void 0===e&&(e=null),void 0!==n&&null!==n||(n=-1),r.ParserRuleContext.call(this,e,n),this.parser=t,this.ruleIndex=h.RULE_stat,this._OTHER=null,this}function S(t,e,n){return void 0===e&&(e=null),void 0!==n&&null!==n||(n=-1),r.ParserRuleContext.call(this,e,n),this.parser=t,this.ruleIndex=h.RULE_comment,this}function R(t,e,n){return void 0===e&&(e=null),void 0!==n&&null!==n||(n=-1),r.ParserRuleContext.call(this,e,n),this.parser=t,this.ruleIndex=h.RULE_creation,this}function A(t,e,n){return void 0===e&&(e=null),void 0!==n&&null!==n||(n=-1),r.ParserRuleContext.call(this,e,n),this.parser=t,this.ruleIndex=h.RULE_message,this}function O(t,e,n){return void 0===e&&(e=null),void 0!==n&&null!==n||(n=-1),r.ParserRuleContext.call(this,e,n),this.parser=t,this.ruleIndex=h.RULE_func,this}function L(t,e,n){return void 0===e&&(e=null),void 0!==n&&null!==n||(n=-1),r.ParserRuleContext.call(this,e,n),this.parser=t,this.ruleIndex=h.RULE_signature,this}function N(t,e,n){return void 0===e&&(e=null),void 0!==n&&null!==n||(n=-1),r.ParserRuleContext.call(this,e,n),this.parser=t,this.ruleIndex=h.RULE_assignment,this}function b(t,e,n){return void 0===e&&(e=null),void 0!==n&&null!==n||(n=-1),r.ParserRuleContext.call(this,e,n),this.parser=t,this.ruleIndex=h.RULE_asyncMessage,this}function I(t,e,n){return void 0===e&&(e=null),void 0!==n&&null!==n||(n=-1),r.ParserRuleContext.call(this,e,n),this.parser=t,this.ruleIndex=h.RULE_content,this}function k(t,e,n){return void 0===e&&(e=null),void 0!==n&&null!==n||(n=-1),r.ParserRuleContext.call(this,e,n),this.parser=t,this.ruleIndex=h.RULE_source,this}function P(t,e,n){return void 0===e&&(e=null),void 0!==n&&null!==n||(n=-1),r.ParserRuleContext.call(this,e,n),this.parser=t,this.ruleIndex=h.RULE_target,this}function w(t,e,n){return void 0===e&&(e=null),void 0!==n&&null!==n||(n=-1),r.ParserRuleContext.call(this,e,n),this.parser=t,this.ruleIndex=h.RULE_constructor,this}function D(t,e,n){return void 0===e&&(e=null),void 0!==n&&null!==n||(n=-1),r.ParserRuleContext.call(this,e,n),this.parser=t,this.ruleIndex=h.RULE_type,this}function M(t,e,n){return void 0===e&&(e=null),void 0!==n&&null!==n||(n=-1),r.ParserRuleContext.call(this,e,n),this.parser=t,this.ruleIndex=h.RULE_assignee,this}function F(t,e,n){return void 0===e&&(e=null),void 0!==n&&null!==n||(n=-1),r.ParserRuleContext.call(this,e,n),this.parser=t,this.ruleIndex=h.RULE_to,this}function U(t,e,n){return void 0===e&&(e=null),void 0!==n&&null!==n||(n=-1),r.ParserRuleContext.call(this,e,n),this.parser=t,this.ruleIndex=h.RULE_methodName,this}function j(t,e,n){return void 0===e&&(e=null),void 0!==n&&null!==n||(n=-1),r.ParserRuleContext.call(this,e,n),this.parser=t,this.ruleIndex=h.RULE_parameters,this}function B(t,e,n){return void 0===e&&(e=null),void 0!==n&&null!==n||(n=-1),r.ParserRuleContext.call(this,e,n),this.parser=t,this.ruleIndex=h.RULE_parameter,this}function H(t,e,n){return void 0===e&&(e=null),void 0!==n&&null!==n||(n=-1),r.ParserRuleContext.call(this,e,n),this.parser=t,this.ruleIndex=h.RULE_alt,this}function V(t,e,n){return void 0===e&&(e=null),void 0!==n&&null!==n||(n=-1),r.ParserRuleContext.call(this,e,n),this.parser=t,this.ruleIndex=h.RULE_ifBlock,this}function $(t,e,n){return void 0===e&&(e=null),void 0!==n&&null!==n||(n=-1),r.ParserRuleContext.call(this,e,n),this.parser=t,this.ruleIndex=h.RULE_elseIfBlock,this}function q(t,e,n){return void 0===e&&(e=null),void 0!==n&&null!==n||(n=-1),r.ParserRuleContext.call(this,e,n),this.parser=t,this.ruleIndex=h.RULE_elseBlock,this}function W(t,e,n){return void 0===e&&(e=null),void 0!==n&&null!==n||(n=-1),r.ParserRuleContext.call(this,e,n),this.parser=t,this.ruleIndex=h.RULE_braceBlock,this}function G(t,e,n){return void 0===e&&(e=null),void 0!==n&&null!==n||(n=-1),r.ParserRuleContext.call(this,e,n),this.parser=t,this.ruleIndex=h.RULE_loop,this}function z(t,e,n){return void 0===e&&(e=null),void 0!==n&&null!==n||(n=-1),r.ParserRuleContext.call(this,e,n),this.parser=t,this.ruleIndex=h.RULE_expr,this}function K(t,e){return z.call(this,t),z.prototype.copyFrom.call(this,e),this}function Y(t,e){return z.call(this,t),z.prototype.copyFrom.call(this,e),this}function Q(t,e){return z.call(this,t),z.prototype.copyFrom.call(this,e),this}function X(t,e){return z.call(this,t),this.op=null,z.prototype.copyFrom.call(this,e),this}function J(t,e){return z.call(this,t),z.prototype.copyFrom.call(this,e),this}function Z(t,e){return z.call(this,t),z.prototype.copyFrom.call(this,e),this}function tt(t,e){return z.call(this,t),this.op=null,z.prototype.copyFrom.call(this,e),this}function et(t,e){return z.call(this,t),this.op=null,z.prototype.copyFrom.call(this,e),this}function nt(t,e){return z.call(this,t),this.op=null,z.prototype.copyFrom.call(this,e),this}function rt(t,e){return z.call(this,t),z.prototype.copyFrom.call(this,e),this}function ot(t,e,n){return void 0===e&&(e=null),void 0!==n&&null!==n||(n=-1),r.ParserRuleContext.call(this,e,n),this.parser=t,this.ruleIndex=h.RULE_atom,this}function it(t,e){return ot.call(this,t),ot.prototype.copyFrom.call(this,e),this}function st(t,e){return ot.call(this,t),ot.prototype.copyFrom.call(this,e),this}function at(t,e){return ot.call(this,t),ot.prototype.copyFrom.call(this,e),this}function ct(t,e){return ot.call(this,t),ot.prototype.copyFrom.call(this,e),this}function ut(t,e){return ot.call(this,t),ot.prototype.copyFrom.call(this,e),this}function pt(t,e,n){return void 0===e&&(e=null),void 0!==n&&null!==n||(n=-1),r.ParserRuleContext.call(this,e,n),this.parser=t,this.ruleIndex=h.RULE_parExpr,this}h.prototype=Object.create(r.Parser.prototype),h.prototype.constructor=h,Object.defineProperty(h.prototype,"atn",{get:function(){return s}}),h.EOF=r.Token.EOF,h.ARROW=1,h.AT=2,h.OR=3,h.AND=4,h.EQ=5,h.NEQ=6,h.GT=7,h.LT=8,h.GTEQ=9,h.LTEQ=10,h.PLUS=11,h.MINUS=12,h.MULT=13,h.DIV=14,h.MOD=15,h.POW=16,h.NOT=17,h.COL=18,h.DOUBLECOL=19,h.SCOL=20,h.COMMA=21,h.ASSIGN=22,h.OPAR=23,h.CPAR=24,h.OBRACE=25,h.CBRACE=26,h.TRUE=27,h.FALSE=28,h.NIL=29,h.IF=30,h.ELSE=31,h.WHILE=32,h.RETURN=33,h.NEW=34,h.STARTER=35,h.THEME=36,h.DOT=37,h.ID=38,h.INT=39,h.FLOAT=40,h.STRING=41,h.COMMENT=42,h.SPACE=43,h.OTHER=44,h.NAME=45,h.CONTENT=46,h.NEWLINE=47,h.WS=48,h.RULE_prog=0,h.RULE_description=1,h.RULE_theme=2,h.RULE_themeName=3,h.RULE_starterExp=4,h.RULE_starter=5,h.RULE_participant=6,h.RULE_block=7,h.RULE_ret=8,h.RULE_value=9,h.RULE_stat=10,h.RULE_comment=11,h.RULE_creation=12,h.RULE_message=13,h.RULE_func=14,h.RULE_signature=15,h.RULE_assignment=16,h.RULE_asyncMessage=17,h.RULE_content=18,h.RULE_source=19,h.RULE_target=20,h.RULE_constructor=21,h.RULE_type=22,h.RULE_assignee=23,h.RULE_to=24,h.RULE_methodName=25,h.RULE_parameters=26,h.RULE_parameter=27,h.RULE_alt=28,h.RULE_ifBlock=29,h.RULE_elseIfBlock=30,h.RULE_elseBlock=31,h.RULE_braceBlock=32,h.RULE_loop=33,h.RULE_expr=34,h.RULE_atom=35,h.RULE_parExpr=36,f.prototype=Object.create(r.ParserRuleContext.prototype),f.prototype.constructor=f,f.prototype.block=function(){return this.getTypedRuleContext(E,0)},f.prototype.EOF=function(){return this.getToken(h.EOF,0)},f.prototype.description=function(){return this.getTypedRuleContext(d,0)},f.prototype.theme=function(){return this.getTypedRuleContext(y,0)},f.prototype.participant=function(t){return void 0===t&&(t=null),null===t?this.getTypedRuleContexts(v):this.getTypedRuleContext(v,t)},f.prototype.starterExp=function(){return this.getTypedRuleContext(x,0)},f.prototype.comment=function(){return this.getTypedRuleContext(S,0)},f.prototype.enterRule=function(t){t instanceof o&&t.enterProg(this)},f.prototype.exitRule=function(t){t instanceof o&&t.exitProg(this)},h.ProgContext=f,h.prototype.prog=function(){var t=new f(this,this._ctx,this.state);this.enterRule(t,0,h.RULE_prog);try{this.enterOuterAlt(t,1),this.state=75,this._errHandler.sync(this),1===this._interp.adaptivePredict(this._input,0,this._ctx)&&(this.state=74,this.description()),this.state=78,this._errHandler.sync(this),1===this._interp.adaptivePredict(this._input,1,this._ctx)&&(this.state=77,this.theme()),this.state=83,this._errHandler.sync(this);for(var e=this._interp.adaptivePredict(this._input,2,this._ctx);2!=e&&e!=r.atn.ATN.INVALID_ALT_NUMBER;)1===e&&(this.state=80,this.participant()),this.state=85,this._errHandler.sync(this),e=this._interp.adaptivePredict(this._input,2,this._ctx);this.state=87,this._errHandler.sync(this),1===this._interp.adaptivePredict(this._input,3,this._ctx)&&(this.state=86,this.starterExp()),this.state=89,this.block(),this.state=91,this._input.LA(1)===h.COMMENT&&(this.state=90,this.comment()),this.state=93,this.match(h.EOF)}catch(e){if(!(e instanceof r.error.RecognitionException))throw e;t.exception=e,this._errHandler.reportError(this,e),this._errHandler.recover(this,e)}finally{this.exitRule()}return t},d.prototype=Object.create(r.ParserRuleContext.prototype),d.prototype.constructor=d,d.prototype.COMMENT=function(t){return void 0===t&&(t=null),null===t?this.getTokens(h.COMMENT):this.getToken(h.COMMENT,t)},d.prototype.enterRule=function(t){t instanceof o&&t.enterDescription(this)},d.prototype.exitRule=function(t){t instanceof o&&t.exitDescription(this)},h.DescriptionContext=d,h.prototype.description=function(){var t=new d(this,this._ctx,this.state);this.enterRule(t,2,h.RULE_description);try{this.enterOuterAlt(t,1),this.state=96,this._errHandler.sync(this);var e=1;do{switch(e){case 1:this.state=95,this.match(h.COMMENT);break;default:throw new r.error.NoViableAltException(this)}this.state=98,this._errHandler.sync(this),e=this._interp.adaptivePredict(this._input,5,this._ctx)}while(2!=e&&e!=r.atn.ATN.INVALID_ALT_NUMBER)}catch(e){if(!(e instanceof r.error.RecognitionException))throw e;t.exception=e,this._errHandler.reportError(this,e),this._errHandler.recover(this,e)}finally{this.exitRule()}return t},y.prototype=Object.create(r.ParserRuleContext.prototype),y.prototype.constructor=y,y.prototype.AT=function(){return this.getToken(h.AT,0)},y.prototype.THEME=function(){return this.getToken(h.THEME,0)},y.prototype.OPAR=function(){return this.getToken(h.OPAR,0)},y.prototype.CPAR=function(){return this.getToken(h.CPAR,0)},y.prototype.comment=function(){return this.getTypedRuleContext(S,0)},y.prototype.themeName=function(){return this.getTypedRuleContext(g,0)},y.prototype.enterRule=function(t){t instanceof o&&t.enterTheme(this)},y.prototype.exitRule=function(t){t instanceof o&&t.exitTheme(this)},h.ThemeContext=y,h.prototype.theme=function(){var t=new y(this,this._ctx,this.state);this.enterRule(t,4,h.RULE_theme);try{this.enterOuterAlt(t,1),this.state=101,this._input.LA(1)===h.COMMENT&&(this.state=100,this.comment()),this.state=103,this.match(h.AT),this.state=104,this.match(h.THEME),this.state=105,this.match(h.OPAR),this.state=107,this._input.LA(1)===h.ID&&(this.state=106,this.themeName()),this.state=109,this.match(h.CPAR)}catch(e){if(!(e instanceof r.error.RecognitionException))throw e;t.exception=e,this._errHandler.reportError(this,e),this._errHandler.recover(this,e)}finally{this.exitRule()}return t},g.prototype=Object.create(r.ParserRuleContext.prototype),g.prototype.constructor=g,g.prototype.ID=function(){return this.getToken(h.ID,0)},g.prototype.enterRule=function(t){t instanceof o&&t.enterThemeName(this)},g.prototype.exitRule=function(t){t instanceof o&&t.exitThemeName(this)},h.ThemeNameContext=g,h.prototype.themeName=function(){var t=new g(this,this._ctx,this.state);this.enterRule(t,6,h.RULE_themeName);try{this.enterOuterAlt(t,1),this.state=111,this.match(h.ID)}catch(e){if(!(e instanceof r.error.RecognitionException))throw e;t.exception=e,this._errHandler.reportError(this,e),this._errHandler.recover(this,e)}finally{this.exitRule()}return t},x.prototype=Object.create(r.ParserRuleContext.prototype),x.prototype.constructor=x,x.prototype.AT=function(){return this.getToken(h.AT,0)},x.prototype.STARTER=function(){return this.getToken(h.STARTER,0)},x.prototype.OPAR=function(){return this.getToken(h.OPAR,0)},x.prototype.CPAR=function(){return this.getToken(h.CPAR,0)},x.prototype.comment=function(){return this.getTypedRuleContext(S,0)},x.prototype.starter=function(){return this.getTypedRuleContext(m,0)},x.prototype.enterRule=function(t){t instanceof o&&t.enterStarterExp(this)},x.prototype.exitRule=function(t){t instanceof o&&t.exitStarterExp(this)},h.StarterExpContext=x,h.prototype.starterExp=function(){var t=new x(this,this._ctx,this.state);this.enterRule(t,8,h.RULE_starterExp);try{this.enterOuterAlt(t,1),this.state=114,this._input.LA(1)===h.COMMENT&&(this.state=113,this.comment()),this.state=116,this.match(h.AT),this.state=117,this.match(h.STARTER),this.state=118,this.match(h.OPAR),this.state=120,this._input.LA(1)===h.ID&&(this.state=119,this.starter()),this.state=122,this.match(h.CPAR)}catch(e){if(!(e instanceof r.error.RecognitionException))throw e;t.exception=e,this._errHandler.reportError(this,e),this._errHandler.recover(this,e)}finally{this.exitRule()}return t},m.prototype=Object.create(r.ParserRuleContext.prototype),m.prototype.constructor=m,m.prototype.ID=function(){return this.getToken(h.ID,0)},m.prototype.enterRule=function(t){t instanceof o&&t.enterStarter(this)},m.prototype.exitRule=function(t){t instanceof o&&t.exitStarter(this)},h.StarterContext=m,h.prototype.starter=function(){var t=new m(this,this._ctx,this.state);this.enterRule(t,10,h.RULE_starter);try{this.enterOuterAlt(t,1),this.state=124,this.match(h.ID)}catch(e){if(!(e instanceof r.error.RecognitionException))throw e;t.exception=e,this._errHandler.reportError(this,e),this._errHandler.recover(this,e)}finally{this.exitRule()}return t},v.prototype=Object.create(r.ParserRuleContext.prototype),v.prototype.constructor=v,v.prototype.ID=function(){return this.getToken(h.ID,0)},v.prototype.comment=function(){return this.getTypedRuleContext(S,0)},v.prototype.enterRule=function(t){t instanceof o&&t.enterParticipant(this)},v.prototype.exitRule=function(t){t instanceof o&&t.exitParticipant(this)},h.ParticipantContext=v,h.prototype.participant=function(){var t=new v(this,this._ctx,this.state);this.enterRule(t,12,h.RULE_participant);try{this.enterOuterAlt(t,1),this.state=127,this._input.LA(1)===h.COMMENT&&(this.state=126,this.comment()),this.state=129,this.match(h.ID)}catch(e){if(!(e instanceof r.error.RecognitionException))throw e;t.exception=e,this._errHandler.reportError(this,e),this._errHandler.recover(this,e)}finally{this.exitRule()}return t},E.prototype=Object.create(r.ParserRuleContext.prototype),E.prototype.constructor=E,E.prototype.stat=function(t){return void 0===t&&(t=null),null===t?this.getTypedRuleContexts(C):this.getTypedRuleContext(C,t)},E.prototype.ret=function(){return this.getTypedRuleContext(T,0)},E.prototype.enterRule=function(t){t instanceof o&&t.enterBlock(this)},E.prototype.exitRule=function(t){t instanceof o&&t.exitBlock(this)},h.BlockContext=E,h.prototype.block=function(){var t=new E(this,this._ctx,this.state);this.enterRule(t,14,h.RULE_block);try{this.enterOuterAlt(t,1),this.state=134,this._errHandler.sync(this);for(var e=this._interp.adaptivePredict(this._input,11,this._ctx);2!=e&&e!=r.atn.ATN.INVALID_ALT_NUMBER;)1===e&&(this.state=131,this.stat()),this.state=136,this._errHandler.sync(this),e=this._interp.adaptivePredict(this._input,11,this._ctx);this.state=138,this._input.LA(1)===h.RETURN&&(this.state=137,this.ret())}catch(e){if(!(e instanceof r.error.RecognitionException))throw e;t.exception=e,this._errHandler.reportError(this,e),this._errHandler.recover(this,e)}finally{this.exitRule()}return t},T.prototype=Object.create(r.ParserRuleContext.prototype),T.prototype.constructor=T,T.prototype.RETURN=function(){return this.getToken(h.RETURN,0)},T.prototype.value=function(){return this.getTypedRuleContext(_,0)},T.prototype.SCOL=function(){return this.getToken(h.SCOL,0)},T.prototype.enterRule=function(t){t instanceof o&&t.enterRet(this)},T.prototype.exitRule=function(t){t instanceof o&&t.exitRet(this)},h.RetContext=T,h.prototype.ret=function(){var t=new T(this,this._ctx,this.state);this.enterRule(t,16,h.RULE_ret);try{this.enterOuterAlt(t,1),this.state=140,this.match(h.RETURN),this.state=141,this.value(),this.state=143,this._input.LA(1)===h.SCOL&&(this.state=142,this.match(h.SCOL))}catch(e){if(!(e instanceof r.error.RecognitionException))throw e;t.exception=e,this._errHandler.reportError(this,e),this._errHandler.recover(this,e)}finally{this.exitRule()}return t},_.prototype=Object.create(r.ParserRuleContext.prototype),_.prototype.constructor=_,_.prototype.atom=function(){return this.getTypedRuleContext(ot,0)},_.prototype.ID=function(){return this.getToken(h.ID,0)},_.prototype.enterRule=function(t){t instanceof o&&t.enterValue(this)},_.prototype.exitRule=function(t){t instanceof o&&t.exitValue(this)},h.ValueContext=_,h.prototype.value=function(){var t=new _(this,this._ctx,this.state);this.enterRule(t,18,h.RULE_value);try{switch(this.enterOuterAlt(t,1),this.state=147,this._errHandler.sync(this),this._interp.adaptivePredict(this._input,14,this._ctx)){case 1:this.state=145,this.atom();break;case 2:this.state=146,this.match(h.ID)}}catch(e){if(!(e instanceof r.error.RecognitionException))throw e;t.exception=e,this._errHandler.reportError(this,e),this._errHandler.recover(this,e)}finally{this.exitRule()}return t},C.prototype=Object.create(r.ParserRuleContext.prototype),C.prototype.constructor=C,C.prototype.alt=function(){return this.getTypedRuleContext(H,0)},C.prototype.comment=function(){return this.getTypedRuleContext(S,0)},C.prototype.loop=function(){return this.getTypedRuleContext(G,0)},C.prototype.creation=function(){return this.getTypedRuleContext(R,0)},C.prototype.asyncMessage=function(){return this.getTypedRuleContext(b,0)},C.prototype.message=function(){return this.getTypedRuleContext(A,0)},C.prototype.OTHER=function(){return this.getToken(h.OTHER,0)},C.prototype.enterRule=function(t){t instanceof o&&t.enterStat(this)},C.prototype.exitRule=function(t){t instanceof o&&t.exitStat(this)},h.StatContext=C,h.prototype.stat=function(){var t=new C(this,this._ctx,this.state);this.enterRule(t,20,h.RULE_stat);try{switch(this.state=171,this._errHandler.sync(this),this._interp.adaptivePredict(this._input,20,this._ctx)){case 1:this.enterOuterAlt(t,1),this.state=150,this._input.LA(1)===h.COMMENT&&(this.state=149,this.comment()),this.state=152,this.alt();break;case 2:this.enterOuterAlt(t,2),this.state=154,this._input.LA(1)===h.COMMENT&&(this.state=153,this.comment()),this.state=156,this.loop();break;case 3:this.enterOuterAlt(t,3),this.state=158,this._input.LA(1)===h.COMMENT&&(this.state=157,this.comment()),this.state=160,this.creation();break;case 4:this.enterOuterAlt(t,4),this.state=162,this._input.LA(1)===h.COMMENT&&(this.state=161,this.comment()),this.state=164,this.asyncMessage();break;case 5:this.enterOuterAlt(t,5),this.state=166,this._input.LA(1)===h.COMMENT&&(this.state=165,this.comment()),this.state=168,this.message();break;case 6:this.enterOuterAlt(t,6),this.state=169,t._OTHER=this.match(h.OTHER),console.log("unknown char: "+(null===t._OTHER?null:t._OTHER.text))}}catch(e){if(!(e instanceof r.error.RecognitionException))throw e;t.exception=e,this._errHandler.reportError(this,e),this._errHandler.recover(this,e)}finally{this.exitRule()}return t},S.prototype=Object.create(r.ParserRuleContext.prototype),S.prototype.constructor=S,S.prototype.COMMENT=function(t){return void 0===t&&(t=null),null===t?this.getTokens(h.COMMENT):this.getToken(h.COMMENT,t)},S.prototype.enterRule=function(t){t instanceof o&&t.enterComment(this)},S.prototype.exitRule=function(t){t instanceof o&&t.exitComment(this)},h.CommentContext=S,h.prototype.comment=function(){var t=new S(this,this._ctx,this.state);this.enterRule(t,22,h.RULE_comment);var e=0;try{this.enterOuterAlt(t,1),this.state=174,this._errHandler.sync(this),e=this._input.LA(1);do{this.state=173,this.match(h.COMMENT),this.state=176,this._errHandler.sync(this),e=this._input.LA(1)}while(e===h.COMMENT)}catch(e){if(!(e instanceof r.error.RecognitionException))throw e;t.exception=e,this._errHandler.reportError(this,e),this._errHandler.recover(this,e)}finally{this.exitRule()}return t},R.prototype=Object.create(r.ParserRuleContext.prototype),R.prototype.constructor=R,R.prototype.NEW=function(){return this.getToken(h.NEW,0)},R.prototype.constructor=function(){return this.getTypedRuleContext(w,0)},R.prototype.assignment=function(){return this.getTypedRuleContext(N,0)},R.prototype.OPAR=function(){return this.getToken(h.OPAR,0)},R.prototype.CPAR=function(){return this.getToken(h.CPAR,0)},R.prototype.SCOL=function(){return this.getToken(h.SCOL,0)},R.prototype.OBRACE=function(){return this.getToken(h.OBRACE,0)},R.prototype.block=function(){return this.getTypedRuleContext(E,0)},R.prototype.CBRACE=function(){return this.getToken(h.CBRACE,0)},R.prototype.parameters=function(){return this.getTypedRuleContext(j,0)},R.prototype.enterRule=function(t){t instanceof o&&t.enterCreation(this)},R.prototype.exitRule=function(t){t instanceof o&&t.exitCreation(this)},h.CreationContext=R,h.prototype.creation=function(){var t=new R(this,this._ctx,this.state);this.enterRule(t,24,h.RULE_creation);var e=0;try{switch(this.enterOuterAlt(t,1),this.state=179,(e=this._input.LA(1))===h.ID&&(this.state=178,this.assignment()),this.state=181,this.match(h.NEW),this.state=182,this.constructor(),this.state=188,(e=this._input.LA(1))===h.OPAR&&(this.state=183,this.match(h.OPAR),this.state=185,0==((e=this._input.LA(1))-27&-32)&&0!=(1<<e-27&(1<<h.TRUE-27|1<<h.FALSE-27|1<<h.NIL-27|1<<h.ID-27|1<<h.INT-27|1<<h.FLOAT-27|1<<h.STRING-27))&&(this.state=184,this.parameters()),this.state=187,this.match(h.CPAR)),this.state=195,this._input.LA(1)){case h.SCOL:this.state=190,this.match(h.SCOL);break;case h.OBRACE:this.state=191,this.match(h.OBRACE),this.state=192,this.block(),this.state=193,this.match(h.CBRACE);break;case h.EOF:case h.COL:case h.CBRACE:case h.IF:case h.WHILE:case h.RETURN:case h.NEW:case h.ID:case h.COMMENT:case h.OTHER:break;default:throw new r.error.NoViableAltException(this)}}catch(e){if(!(e instanceof r.error.RecognitionException))throw e;t.exception=e,this._errHandler.reportError(this,e),this._errHandler.recover(this,e)}finally{this.exitRule()}return t},A.prototype=Object.create(r.ParserRuleContext.prototype),A.prototype.constructor=A,A.prototype.func=function(){return this.getTypedRuleContext(O,0)},A.prototype.assignment=function(){return this.getTypedRuleContext(N,0)},A.prototype.SCOL=function(){return this.getToken(h.SCOL,0)},A.prototype.OBRACE=function(){return this.getToken(h.OBRACE,0)},A.prototype.block=function(){return this.getTypedRuleContext(E,0)},A.prototype.CBRACE=function(){return this.getToken(h.CBRACE,0)},A.prototype.enterRule=function(t){t instanceof o&&t.enterMessage(this)},A.prototype.exitRule=function(t){t instanceof o&&t.exitMessage(this)},h.MessageContext=A,h.prototype.message=function(){var t=new A(this,this._ctx,this.state);this.enterRule(t,26,h.RULE_message);try{switch(this.enterOuterAlt(t,1),this.state=198,this._errHandler.sync(this),1===this._interp.adaptivePredict(this._input,26,this._ctx)&&(this.state=197,this.assignment()),this.state=200,this.func(),this.state=206,this._input.LA(1)){case h.SCOL:this.state=201,this.match(h.SCOL);break;case h.OBRACE:this.state=202,this.match(h.OBRACE),this.state=203,this.block(),this.state=204,this.match(h.CBRACE);break;case h.EOF:case h.COL:case h.CBRACE:case h.IF:case h.WHILE:case h.RETURN:case h.NEW:case h.ID:case h.COMMENT:case h.OTHER:break;default:throw new r.error.NoViableAltException(this)}}catch(e){if(!(e instanceof r.error.RecognitionException))throw e;t.exception=e,this._errHandler.reportError(this,e),this._errHandler.recover(this,e)}finally{this.exitRule()}return t},O.prototype=Object.create(r.ParserRuleContext.prototype),O.prototype.constructor=O,O.prototype.signature=function(){return this.getTypedRuleContext(L,0)},O.prototype.to=function(){return this.getTypedRuleContext(F,0)},O.prototype.DOT=function(){return this.getToken(h.DOT,0)},O.prototype.enterRule=function(t){t instanceof o&&t.enterFunc(this)},O.prototype.exitRule=function(t){t instanceof o&&t.exitFunc(this)},h.FuncContext=O,h.prototype.func=function(){var t=new O(this,this._ctx,this.state);this.enterRule(t,28,h.RULE_func);try{this.enterOuterAlt(t,1),this.state=211,this._errHandler.sync(this),1===this._interp.adaptivePredict(this._input,28,this._ctx)&&(this.state=208,this.to(),this.state=209,this.match(h.DOT)),this.state=213,this.signature()}catch(e){if(!(e instanceof r.error.RecognitionException))throw e;t.exception=e,this._errHandler.reportError(this,e),this._errHandler.recover(this,e)}finally{this.exitRule()}return t},L.prototype=Object.create(r.ParserRuleContext.prototype),L.prototype.constructor=L,L.prototype.methodName=function(){return this.getTypedRuleContext(U,0)},L.prototype.OPAR=function(){return this.getToken(h.OPAR,0)},L.prototype.CPAR=function(){return this.getToken(h.CPAR,0)},L.prototype.parameters=function(){return this.getTypedRuleContext(j,0)},L.prototype.enterRule=function(t){t instanceof o&&t.enterSignature(this)},L.prototype.exitRule=function(t){t instanceof o&&t.exitSignature(this)},h.SignatureContext=L,h.prototype.signature=function(){var t=new L(this,this._ctx,this.state);this.enterRule(t,30,h.RULE_signature);var e=0;try{this.enterOuterAlt(t,1),this.state=215,this.methodName(),this.state=221,this._errHandler.sync(this),1===this._interp.adaptivePredict(this._input,30,this._ctx)&&(this.state=216,this.match(h.OPAR),this.state=218,0==((e=this._input.LA(1))-27&-32)&&0!=(1<<e-27&(1<<h.TRUE-27|1<<h.FALSE-27|1<<h.NIL-27|1<<h.ID-27|1<<h.INT-27|1<<h.FLOAT-27|1<<h.STRING-27))&&(this.state=217,this.parameters()),this.state=220,this.match(h.CPAR))}catch(e){if(!(e instanceof r.error.RecognitionException))throw e;t.exception=e,this._errHandler.reportError(this,e),this._errHandler.recover(this,e)}finally{this.exitRule()}return t},N.prototype=Object.create(r.ParserRuleContext.prototype),N.prototype.constructor=N,N.prototype.assignee=function(){return this.getTypedRuleContext(M,0)},N.prototype.ASSIGN=function(){return this.getToken(h.ASSIGN,0)},N.prototype.type=function(){return this.getTypedRuleContext(D,0)},N.prototype.enterRule=function(t){t instanceof o&&t.enterAssignment(this)},N.prototype.exitRule=function(t){t instanceof o&&t.exitAssignment(this)},h.AssignmentContext=N,h.prototype.assignment=function(){var t=new N(this,this._ctx,this.state);this.enterRule(t,32,h.RULE_assignment);try{this.enterOuterAlt(t,1),this.state=224,this._errHandler.sync(this),1===this._interp.adaptivePredict(this._input,31,this._ctx)&&(this.state=223,this.type()),this.state=226,this.assignee(),this.state=227,this.match(h.ASSIGN)}catch(e){if(!(e instanceof r.error.RecognitionException))throw e;t.exception=e,this._errHandler.reportError(this,e),this._errHandler.recover(this,e)}finally{this.exitRule()}return t},b.prototype=Object.create(r.ParserRuleContext.prototype),b.prototype.constructor=b,b.prototype.source=function(){return this.getTypedRuleContext(k,0)},b.prototype.ARROW=function(){return this.getToken(h.ARROW,0)},b.prototype.target=function(){return this.getTypedRuleContext(P,0)},b.prototype.content=function(){return this.getTypedRuleContext(I,0)},b.prototype.NEWLINE=function(){return this.getToken(h.NEWLINE,0)},b.prototype.enterRule=function(t){t instanceof o&&t.enterAsyncMessage(this)},b.prototype.exitRule=function(t){t instanceof o&&t.exitAsyncMessage(this)},h.AsyncMessageContext=b,h.prototype.asyncMessage=function(){var t=new b(this,this._ctx,this.state);this.enterRule(t,34,h.RULE_asyncMessage);try{this.enterOuterAlt(t,1),this.state=229,this.source(),this.state=230,this.match(h.ARROW),this.state=231,this.target(),this.state=232,this.content(),this.state=234,this._input.LA(1)===h.NEWLINE&&(this.state=233,this.match(h.NEWLINE))}catch(e){if(!(e instanceof r.error.RecognitionException))throw e;t.exception=e,this._errHandler.reportError(this,e),this._errHandler.recover(this,e)}finally{this.exitRule()}return t},I.prototype=Object.create(r.ParserRuleContext.prototype),I.prototype.constructor=I,I.prototype.CONTENT=function(){return this.getToken(h.CONTENT,0)},I.prototype.enterRule=function(t){t instanceof o&&t.enterContent(this)},I.prototype.exitRule=function(t){t instanceof o&&t.exitContent(this)},h.ContentContext=I,h.prototype.content=function(){var t=new I(this,this._ctx,this.state);this.enterRule(t,36,h.RULE_content);try{this.enterOuterAlt(t,1),this.state=236,this.match(h.CONTENT)}catch(e){if(!(e instanceof r.error.RecognitionException))throw e;t.exception=e,this._errHandler.reportError(this,e),this._errHandler.recover(this,e)}finally{this.exitRule()}return t},k.prototype=Object.create(r.ParserRuleContext.prototype),k.prototype.constructor=k,k.prototype.ID=function(){return this.getToken(h.ID,0)},k.prototype.enterRule=function(t){t instanceof o&&t.enterSource(this)},k.prototype.exitRule=function(t){t instanceof o&&t.exitSource(this)},h.SourceContext=k,h.prototype.source=function(){var t=new k(this,this._ctx,this.state);this.enterRule(t,38,h.RULE_source);try{this.enterOuterAlt(t,1),this.state=238,this.match(h.ID)}catch(e){if(!(e instanceof r.error.RecognitionException))throw e;t.exception=e,this._errHandler.reportError(this,e),this._errHandler.recover(this,e)}finally{this.exitRule()}return t},P.prototype=Object.create(r.ParserRuleContext.prototype),P.prototype.constructor=P,P.prototype.NAME=function(){return this.getToken(h.NAME,0)},P.prototype.enterRule=function(t){t instanceof o&&t.enterTarget(this)},P.prototype.exitRule=function(t){t instanceof o&&t.exitTarget(this)},h.TargetContext=P,h.prototype.target=function(){var t=new P(this,this._ctx,this.state);this.enterRule(t,40,h.RULE_target);try{this.enterOuterAlt(t,1),this.state=240,this.match(h.NAME)}catch(e){if(!(e instanceof r.error.RecognitionException))throw e;t.exception=e,this._errHandler.reportError(this,e),this._errHandler.recover(this,e)}finally{this.exitRule()}return t},w.prototype=Object.create(r.ParserRuleContext.prototype),w.prototype.constructor=w,w.prototype.ID=function(){return this.getToken(h.ID,0)},w.prototype.enterRule=function(t){t instanceof o&&t.enterConstructor(this)},w.prototype.exitRule=function(t){t instanceof o&&t.exitConstructor(this)},h.ConstructorContext=w,h.prototype.constructor=function(){var t=new w(this,this._ctx,this.state);this.enterRule(t,42,h.RULE_constructor);try{this.enterOuterAlt(t,1),this.state=242,this.match(h.ID)}catch(e){if(!(e instanceof r.error.RecognitionException))throw e;t.exception=e,this._errHandler.reportError(this,e),this._errHandler.recover(this,e)}finally{this.exitRule()}return t},D.prototype=Object.create(r.ParserRuleContext.prototype),D.prototype.constructor=D,D.prototype.ID=function(){return this.getToken(h.ID,0)},D.prototype.enterRule=function(t){t instanceof o&&t.enterType(this)},D.prototype.exitRule=function(t){t instanceof o&&t.exitType(this)},h.TypeContext=D,h.prototype.type=function(){var t=new D(this,this._ctx,this.state);this.enterRule(t,44,h.RULE_type);try{this.enterOuterAlt(t,1),this.state=244,this.match(h.ID)}catch(e){if(!(e instanceof r.error.RecognitionException))throw e;t.exception=e,this._errHandler.reportError(this,e),this._errHandler.recover(this,e)}finally{this.exitRule()}return t},M.prototype=Object.create(r.ParserRuleContext.prototype),M.prototype.constructor=M,M.prototype.ID=function(){return this.getToken(h.ID,0)},M.prototype.enterRule=function(t){t instanceof o&&t.enterAssignee(this)},M.prototype.exitRule=function(t){t instanceof o&&t.exitAssignee(this)},h.AssigneeContext=M,h.prototype.assignee=function(){var t=new M(this,this._ctx,this.state);this.enterRule(t,46,h.RULE_assignee);try{this.enterOuterAlt(t,1),this.state=246,this.match(h.ID)}catch(e){if(!(e instanceof r.error.RecognitionException))throw e;t.exception=e,this._errHandler.reportError(this,e),this._errHandler.recover(this,e)}finally{this.exitRule()}return t},F.prototype=Object.create(r.ParserRuleContext.prototype),F.prototype.constructor=F,F.prototype.ID=function(t){return void 0===t&&(t=null),null===t?this.getTokens(h.ID):this.getToken(h.ID,t)},F.prototype.COL=function(){return this.getToken(h.COL,0)},F.prototype.enterRule=function(t){t instanceof o&&t.enterTo(this)},F.prototype.exitRule=function(t){t instanceof o&&t.exitTo(this)},h.ToContext=F,h.prototype.to=function(){var t=new F(this,this._ctx,this.state);this.enterRule(t,48,h.RULE_to);try{this.enterOuterAlt(t,1),this.state=251,this._errHandler.sync(this);var e=this._interp.adaptivePredict(this._input,33,this._ctx);1===e?(this.state=248,this.match(h.ID),this.state=249,this.match(h.COL)):2===e&&(this.state=250,this.match(h.COL)),this.state=253,this.match(h.ID)}catch(e){if(!(e instanceof r.error.RecognitionException))throw e;t.exception=e,this._errHandler.reportError(this,e),this._errHandler.recover(this,e)}finally{this.exitRule()}return t},U.prototype=Object.create(r.ParserRuleContext.prototype),U.prototype.constructor=U,U.prototype.ID=function(){return this.getToken(h.ID,0)},U.prototype.enterRule=function(t){t instanceof o&&t.enterMethodName(this)},U.prototype.exitRule=function(t){t instanceof o&&t.exitMethodName(this)},h.MethodNameContext=U,h.prototype.methodName=function(){var t=new U(this,this._ctx,this.state);this.enterRule(t,50,h.RULE_methodName);try{this.enterOuterAlt(t,1),this.state=255,this.match(h.ID)}catch(e){if(!(e instanceof r.error.RecognitionException))throw e;t.exception=e,this._errHandler.reportError(this,e),this._errHandler.recover(this,e)}finally{this.exitRule()}return t},j.prototype=Object.create(r.ParserRuleContext.prototype),j.prototype.constructor=j,j.prototype.parameter=function(t){return void 0===t&&(t=null),null===t?this.getTypedRuleContexts(B):this.getTypedRuleContext(B,t)},j.prototype.COMMA=function(t){return void 0===t&&(t=null),null===t?this.getTokens(h.COMMA):this.getToken(h.COMMA,t)},j.prototype.enterRule=function(t){t instanceof o&&t.enterParameters(this)},j.prototype.exitRule=function(t){t instanceof o&&t.exitParameters(this)},h.ParametersContext=j,h.prototype.parameters=function(){var t=new j(this,this._ctx,this.state);this.enterRule(t,52,h.RULE_parameters);var e=0;try{for(this.enterOuterAlt(t,1),this.state=257,this.parameter(),this.state=262,this._errHandler.sync(this),e=this._input.LA(1);e===h.COMMA;)this.state=258,this.match(h.COMMA),this.state=259,this.parameter(),this.state=264,this._errHandler.sync(this),e=this._input.LA(1)}catch(e){if(!(e instanceof r.error.RecognitionException))throw e;t.exception=e,this._errHandler.reportError(this,e),this._errHandler.recover(this,e)}finally{this.exitRule()}return t},B.prototype=Object.create(r.ParserRuleContext.prototype),B.prototype.constructor=B,B.prototype.ID=function(){return this.getToken(h.ID,0)},B.prototype.atom=function(){return this.getTypedRuleContext(ot,0)},B.prototype.enterRule=function(t){t instanceof o&&t.enterParameter(this)},B.prototype.exitRule=function(t){t instanceof o&&t.exitParameter(this)},h.ParameterContext=B,h.prototype.parameter=function(){var t=new B(this,this._ctx,this.state);this.enterRule(t,54,h.RULE_parameter);try{switch(this.state=267,this._errHandler.sync(this),this._interp.adaptivePredict(this._input,35,this._ctx)){case 1:this.enterOuterAlt(t,1),this.state=265,this.match(h.ID);break;case 2:this.enterOuterAlt(t,2),this.state=266,this.atom()}}catch(e){if(!(e instanceof r.error.RecognitionException))throw e;t.exception=e,this._errHandler.reportError(this,e),this._errHandler.recover(this,e)}finally{this.exitRule()}return t},H.prototype=Object.create(r.ParserRuleContext.prototype),H.prototype.constructor=H,H.prototype.ifBlock=function(){return this.getTypedRuleContext(V,0)},H.prototype.elseIfBlock=function(t){return void 0===t&&(t=null),null===t?this.getTypedRuleContexts($):this.getTypedRuleContext($,t)},H.prototype.elseBlock=function(){return this.getTypedRuleContext(q,0)},H.prototype.enterRule=function(t){t instanceof o&&t.enterAlt(this)},H.prototype.exitRule=function(t){t instanceof o&&t.exitAlt(this)},h.AltContext=H,h.prototype.alt=function(){var t=new H(this,this._ctx,this.state);this.enterRule(t,56,h.RULE_alt);try{this.enterOuterAlt(t,1),this.state=269,this.ifBlock(),this.state=273,this._errHandler.sync(this);for(var e=this._interp.adaptivePredict(this._input,36,this._ctx);2!=e&&e!=r.atn.ATN.INVALID_ALT_NUMBER;)1===e&&(this.state=270,this.elseIfBlock()),this.state=275,this._errHandler.sync(this),e=this._interp.adaptivePredict(this._input,36,this._ctx);this.state=277,this._input.LA(1)===h.ELSE&&(this.state=276,this.elseBlock())}catch(e){if(!(e instanceof r.error.RecognitionException))throw e;t.exception=e,this._errHandler.reportError(this,e),this._errHandler.recover(this,e)}finally{this.exitRule()}return t},V.prototype=Object.create(r.ParserRuleContext.prototype),V.prototype.constructor=V,V.prototype.IF=function(){return this.getToken(h.IF,0)},V.prototype.parExpr=function(){return this.getTypedRuleContext(pt,0)},V.prototype.braceBlock=function(){return this.getTypedRuleContext(W,0)},V.prototype.enterRule=function(t){t instanceof o&&t.enterIfBlock(this)},V.prototype.exitRule=function(t){t instanceof o&&t.exitIfBlock(this)},h.IfBlockContext=V,h.prototype.ifBlock=function(){var t=new V(this,this._ctx,this.state);this.enterRule(t,58,h.RULE_ifBlock);try{this.enterOuterAlt(t,1),this.state=279,this.match(h.IF),this.state=280,this.parExpr(),this.state=281,this.braceBlock()}catch(e){if(!(e instanceof r.error.RecognitionException))throw e;t.exception=e,this._errHandler.reportError(this,e),this._errHandler.recover(this,e)}finally{this.exitRule()}return t},$.prototype=Object.create(r.ParserRuleContext.prototype),$.prototype.constructor=$,$.prototype.ELSE=function(){return this.getToken(h.ELSE,0)},$.prototype.IF=function(){return this.getToken(h.IF,0)},$.prototype.parExpr=function(){return this.getTypedRuleContext(pt,0)},$.prototype.braceBlock=function(){return this.getTypedRuleContext(W,0)},$.prototype.enterRule=function(t){t instanceof o&&t.enterElseIfBlock(this)},$.prototype.exitRule=function(t){t instanceof o&&t.exitElseIfBlock(this)},h.ElseIfBlockContext=$,h.prototype.elseIfBlock=function(){var t=new $(this,this._ctx,this.state);this.enterRule(t,60,h.RULE_elseIfBlock);try{this.enterOuterAlt(t,1),this.state=283,this.match(h.ELSE),this.state=284,this.match(h.IF),this.state=285,this.parExpr(),this.state=286,this.braceBlock()}catch(e){if(!(e instanceof r.error.RecognitionException))throw e;t.exception=e,this._errHandler.reportError(this,e),this._errHandler.recover(this,e)}finally{this.exitRule()}return t},q.prototype=Object.create(r.ParserRuleContext.prototype),q.prototype.constructor=q,q.prototype.ELSE=function(){return this.getToken(h.ELSE,0)},q.prototype.braceBlock=function(){return this.getTypedRuleContext(W,0)},q.prototype.enterRule=function(t){t instanceof o&&t.enterElseBlock(this)},q.prototype.exitRule=function(t){t instanceof o&&t.exitElseBlock(this)},h.ElseBlockContext=q,h.prototype.elseBlock=function(){var t=new q(this,this._ctx,this.state);this.enterRule(t,62,h.RULE_elseBlock);try{this.enterOuterAlt(t,1),this.state=288,this.match(h.ELSE),this.state=289,this.braceBlock()}catch(e){if(!(e instanceof r.error.RecognitionException))throw e;t.exception=e,this._errHandler.reportError(this,e),this._errHandler.recover(this,e)}finally{this.exitRule()}return t},W.prototype=Object.create(r.ParserRuleContext.prototype),W.prototype.constructor=W,W.prototype.OBRACE=function(){return this.getToken(h.OBRACE,0)},W.prototype.block=function(){return this.getTypedRuleContext(E,0)},W.prototype.CBRACE=function(){return this.getToken(h.CBRACE,0)},W.prototype.enterRule=function(t){t instanceof o&&t.enterBraceBlock(this)},W.prototype.exitRule=function(t){t instanceof o&&t.exitBraceBlock(this)},h.BraceBlockContext=W,h.prototype.braceBlock=function(){var t=new W(this,this._ctx,this.state);this.enterRule(t,64,h.RULE_braceBlock);try{this.enterOuterAlt(t,1),this.state=291,this.match(h.OBRACE),this.state=292,this.block(),this.state=293,this.match(h.CBRACE)}catch(e){if(!(e instanceof r.error.RecognitionException))throw e;t.exception=e,this._errHandler.reportError(this,e),this._errHandler.recover(this,e)}finally{this.exitRule()}return t},G.prototype=Object.create(r.ParserRuleContext.prototype),G.prototype.constructor=G,G.prototype.WHILE=function(){return this.getToken(h.WHILE,0)},G.prototype.parExpr=function(){return this.getTypedRuleContext(pt,0)},G.prototype.braceBlock=function(){return this.getTypedRuleContext(W,0)},G.prototype.enterRule=function(t){t instanceof o&&t.enterLoop(this)},G.prototype.exitRule=function(t){t instanceof o&&t.exitLoop(this)},h.LoopContext=G,h.prototype.loop=function(){var t=new G(this,this._ctx,this.state);this.enterRule(t,66,h.RULE_loop);try{this.enterOuterAlt(t,1),this.state=295,this.match(h.WHILE),this.state=296,this.parExpr(),this.state=297,this.braceBlock()}catch(e){if(!(e instanceof r.error.RecognitionException))throw e;t.exception=e,this._errHandler.reportError(this,e),this._errHandler.recover(this,e)}finally{this.exitRule()}return t},z.prototype=Object.create(r.ParserRuleContext.prototype),z.prototype.constructor=z,z.prototype.copyFrom=function(t){r.ParserRuleContext.prototype.copyFrom.call(this,t)},K.prototype=Object.create(z.prototype),K.prototype.constructor=K,h.NotExprContext=K,K.prototype.NOT=function(){return this.getToken(h.NOT,0)},K.prototype.expr=function(){return this.getTypedRuleContext(z,0)},K.prototype.enterRule=function(t){t instanceof o&&t.enterNotExpr(this)},K.prototype.exitRule=function(t){t instanceof o&&t.exitNotExpr(this)},Y.prototype=Object.create(z.prototype),Y.prototype.constructor=Y,h.FuncExprContext=Y,Y.prototype.func=function(){return this.getTypedRuleContext(O,0)},Y.prototype.enterRule=function(t){t instanceof o&&t.enterFuncExpr(this)},Y.prototype.exitRule=function(t){t instanceof o&&t.exitFuncExpr(this)},Q.prototype=Object.create(z.prototype),Q.prototype.constructor=Q,h.UnaryMinusExprContext=Q,Q.prototype.MINUS=function(){return this.getToken(h.MINUS,0)},Q.prototype.expr=function(){return this.getTypedRuleContext(z,0)},Q.prototype.enterRule=function(t){t instanceof o&&t.enterUnaryMinusExpr(this)},Q.prototype.exitRule=function(t){t instanceof o&&t.exitUnaryMinusExpr(this)},X.prototype=Object.create(z.prototype),X.prototype.constructor=X,h.MultiplicationExprContext=X,X.prototype.expr=function(t){return void 0===t&&(t=null),null===t?this.getTypedRuleContexts(z):this.getTypedRuleContext(z,t)},X.prototype.MULT=function(){return this.getToken(h.MULT,0)},X.prototype.DIV=function(){return this.getToken(h.DIV,0)},X.prototype.MOD=function(){return this.getToken(h.MOD,0)},X.prototype.enterRule=function(t){t instanceof o&&t.enterMultiplicationExpr(this)},X.prototype.exitRule=function(t){t instanceof o&&t.exitMultiplicationExpr(this)},J.prototype=Object.create(z.prototype),J.prototype.constructor=J,h.AtomExprContext=J,J.prototype.atom=function(){return this.getTypedRuleContext(ot,0)},J.prototype.enterRule=function(t){t instanceof o&&t.enterAtomExpr(this)},J.prototype.exitRule=function(t){t instanceof o&&t.exitAtomExpr(this)},Z.prototype=Object.create(z.prototype),Z.prototype.constructor=Z,h.OrExprContext=Z,Z.prototype.expr=function(t){return void 0===t&&(t=null),null===t?this.getTypedRuleContexts(z):this.getTypedRuleContext(z,t)},Z.prototype.OR=function(){return this.getToken(h.OR,0)},Z.prototype.enterRule=function(t){t instanceof o&&t.enterOrExpr(this)},Z.prototype.exitRule=function(t){t instanceof o&&t.exitOrExpr(this)},tt.prototype=Object.create(z.prototype),tt.prototype.constructor=tt,h.AdditiveExprContext=tt,tt.prototype.expr=function(t){return void 0===t&&(t=null),null===t?this.getTypedRuleContexts(z):this.getTypedRuleContext(z,t)},tt.prototype.PLUS=function(){return this.getToken(h.PLUS,0)},tt.prototype.MINUS=function(){return this.getToken(h.MINUS,0)},tt.prototype.enterRule=function(t){t instanceof o&&t.enterAdditiveExpr(this)},tt.prototype.exitRule=function(t){t instanceof o&&t.exitAdditiveExpr(this)},et.prototype=Object.create(z.prototype),et.prototype.constructor=et,h.RelationalExprContext=et,et.prototype.expr=function(t){return void 0===t&&(t=null),null===t?this.getTypedRuleContexts(z):this.getTypedRuleContext(z,t)},et.prototype.LTEQ=function(){return this.getToken(h.LTEQ,0)},et.prototype.GTEQ=function(){return this.getToken(h.GTEQ,0)},et.prototype.LT=function(){return this.getToken(h.LT,0)},et.prototype.GT=function(){return this.getToken(h.GT,0)},et.prototype.enterRule=function(t){t instanceof o&&t.enterRelationalExpr(this)},et.prototype.exitRule=function(t){t instanceof o&&t.exitRelationalExpr(this)},nt.prototype=Object.create(z.prototype),nt.prototype.constructor=nt,h.EqualityExprContext=nt,nt.prototype.expr=function(t){return void 0===t&&(t=null),null===t?this.getTypedRuleContexts(z):this.getTypedRuleContext(z,t)},nt.prototype.EQ=function(){return this.getToken(h.EQ,0)},nt.prototype.NEQ=function(){return this.getToken(h.NEQ,0)},nt.prototype.enterRule=function(t){t instanceof o&&t.enterEqualityExpr(this)},nt.prototype.exitRule=function(t){t instanceof o&&t.exitEqualityExpr(this)},rt.prototype=Object.create(z.prototype),rt.prototype.constructor=rt,h.AndExprContext=rt,rt.prototype.expr=function(t){return void 0===t&&(t=null),null===t?this.getTypedRuleContexts(z):this.getTypedRuleContext(z,t)},rt.prototype.AND=function(){return this.getToken(h.AND,0)},rt.prototype.enterRule=function(t){t instanceof o&&t.enterAndExpr(this)},rt.prototype.exitRule=function(t){t instanceof o&&t.exitAndExpr(this)},h.prototype.expr=function(t){void 0===t&&(t=0);var e=this._ctx,n=this.state,o=new z(this,this._ctx,n);this.enterRecursionRule(o,68,h.RULE_expr,t);var i=0;try{switch(this.enterOuterAlt(o,1),this.state=306,this._errHandler.sync(this),this._interp.adaptivePredict(this._input,38,this._ctx)){case 1:o=new Q(this,o),this._ctx=o,this.state=300,this.match(h.MINUS),this.state=301,this.expr(11);break;case 2:o=new K(this,o),this._ctx=o,this.state=302,this.match(h.NOT),this.state=303,this.expr(10);break;case 3:o=new Y(this,o),this._ctx=o,this.state=304,this.func();break;case 4:o=new J(this,o),this._ctx=o,this.state=305,this.atom()}this._ctx.stop=this._input.LT(-1),this.state=331,this._errHandler.sync(this);for(var s=this._interp.adaptivePredict(this._input,40,this._ctx);2!=s&&s!=r.atn.ATN.INVALID_ALT_NUMBER;){if(1===s)switch(null!==this._parseListeners&&this.triggerExitRuleEvent(),this.state=329,this._errHandler.sync(this),this._interp.adaptivePredict(this._input,39,this._ctx)){case 1:if(o=new X(this,new z(this,e,n)),this.pushNewRecursionContext(o,68,h.RULE_expr),this.state=308,!this.precpred(this._ctx,9))throw new r.error.FailedPredicateException(this,"this.precpred(this._ctx, 9)");this.state=309,o.op=this._input.LT(1),0!=(-32&(i=this._input.LA(1)))||0==(1<<i&(1<<h.MULT|1<<h.DIV|1<<h.MOD))?o.op=this._errHandler.recoverInline(this):this.consume(),this.state=310,this.expr(10);break;case 2:if(o=new tt(this,new z(this,e,n)),this.pushNewRecursionContext(o,68,h.RULE_expr),this.state=311,!this.precpred(this._ctx,8))throw new r.error.FailedPredicateException(this,"this.precpred(this._ctx, 8)");this.state=312,o.op=this._input.LT(1),(i=this._input.LA(1))!==h.PLUS&&i!==h.MINUS?o.op=this._errHandler.recoverInline(this):this.consume(),this.state=313,this.expr(9);break;case 3:if(o=new et(this,new z(this,e,n)),this.pushNewRecursionContext(o,68,h.RULE_expr),this.state=314,!this.precpred(this._ctx,7))throw new r.error.FailedPredicateException(this,"this.precpred(this._ctx, 7)");this.state=315,o.op=this._input.LT(1),0!=(-32&(i=this._input.LA(1)))||0==(1<<i&(1<<h.GT|1<<h.LT|1<<h.GTEQ|1<<h.LTEQ))?o.op=this._errHandler.recoverInline(this):this.consume(),this.state=316,this.expr(8);break;case 4:if(o=new nt(this,new z(this,e,n)),this.pushNewRecursionContext(o,68,h.RULE_expr),this.state=317,!this.precpred(this._ctx,6))throw new r.error.FailedPredicateException(this,"this.precpred(this._ctx, 6)");this.state=318,o.op=this._input.LT(1),(i=this._input.LA(1))!==h.EQ&&i!==h.NEQ?o.op=this._errHandler.recoverInline(this):this.consume(),this.state=319,this.expr(7);break;case 5:if(o=new rt(this,new z(this,e,n)),this.pushNewRecursionContext(o,68,h.RULE_expr),this.state=320,!this.precpred(this._ctx,5))throw new r.error.FailedPredicateException(this,"this.precpred(this._ctx, 5)");this.state=321,this.match(h.AND),this.state=322,this.expr(6);break;case 6:if(o=new Z(this,new z(this,e,n)),this.pushNewRecursionContext(o,68,h.RULE_expr),this.state=323,!this.precpred(this._ctx,4))throw new r.error.FailedPredicateException(this,"this.precpred(this._ctx, 4)");this.state=324,this.match(h.OR),this.state=325,this.expr(5);break;case 7:if(o=new Z(this,new z(this,e,n)),this.pushNewRecursionContext(o,68,h.RULE_expr),this.state=326,!this.precpred(this._ctx,3))throw new r.error.FailedPredicateException(this,"this.precpred(this._ctx, 3)");this.state=327,this.match(h.OR),this.state=328,this.expr(4)}this.state=333,this._errHandler.sync(this),s=this._interp.adaptivePredict(this._input,40,this._ctx)}}catch(t){if(!(t instanceof r.error.RecognitionException))throw t;o.exception=t,this._errHandler.reportError(this,t),this._errHandler.recover(this,t)}finally{this.unrollRecursionContexts(e)}return o},ot.prototype=Object.create(r.ParserRuleContext.prototype),ot.prototype.constructor=ot,ot.prototype.copyFrom=function(t){r.ParserRuleContext.prototype.copyFrom.call(this,t)},it.prototype=Object.create(ot.prototype),it.prototype.constructor=it,h.BooleanAtomContext=it,it.prototype.TRUE=function(){return this.getToken(h.TRUE,0)},it.prototype.FALSE=function(){return this.getToken(h.FALSE,0)},it.prototype.enterRule=function(t){t instanceof o&&t.enterBooleanAtom(this)},it.prototype.exitRule=function(t){t instanceof o&&t.exitBooleanAtom(this)},st.prototype=Object.create(ot.prototype),st.prototype.constructor=st,h.IdAtomContext=st,st.prototype.ID=function(){return this.getToken(h.ID,0)},st.prototype.enterRule=function(t){t instanceof o&&t.enterIdAtom(this)},st.prototype.exitRule=function(t){t instanceof o&&t.exitIdAtom(this)},at.prototype=Object.create(ot.prototype),at.prototype.constructor=at,h.StringAtomContext=at,at.prototype.STRING=function(){return this.getToken(h.STRING,0)},at.prototype.enterRule=function(t){t instanceof o&&t.enterStringAtom(this)},at.prototype.exitRule=function(t){t instanceof o&&t.exitStringAtom(this)},ct.prototype=Object.create(ot.prototype),ct.prototype.constructor=ct,h.NilAtomContext=ct,ct.prototype.NIL=function(){return this.getToken(h.NIL,0)},ct.prototype.enterRule=function(t){t instanceof o&&t.enterNilAtom(this)},ct.prototype.exitRule=function(t){t instanceof o&&t.exitNilAtom(this)},ut.prototype=Object.create(ot.prototype),ut.prototype.constructor=ut,h.NumberAtomContext=ut,ut.prototype.INT=function(){return this.getToken(h.INT,0)},ut.prototype.FLOAT=function(){return this.getToken(h.FLOAT,0)},ut.prototype.enterRule=function(t){t instanceof o&&t.enterNumberAtom(this)},ut.prototype.exitRule=function(t){t instanceof o&&t.exitNumberAtom(this)},h.AtomContext=ot,h.prototype.atom=function(){var t=new ot(this,this._ctx,this.state);this.enterRule(t,70,h.RULE_atom);var e=0;try{switch(this.state=339,this._input.LA(1)){case h.INT:case h.FLOAT:t=new ut(this,t),this.enterOuterAlt(t,1),this.state=334,(e=this._input.LA(1))!==h.INT&&e!==h.FLOAT?this._errHandler.recoverInline(this):this.consume();break;case h.TRUE:case h.FALSE:t=new it(this,t),this.enterOuterAlt(t,2),this.state=335,(e=this._input.LA(1))!==h.TRUE&&e!==h.FALSE?this._errHandler.recoverInline(this):this.consume();break;case h.ID:t=new st(this,t),this.enterOuterAlt(t,3),this.state=336,this.match(h.ID);break;case h.STRING:t=new at(this,t),this.enterOuterAlt(t,4),this.state=337,this.match(h.STRING);break;case h.NIL:t=new ct(this,t),this.enterOuterAlt(t,5),this.state=338,this.match(h.NIL);break;default:throw new r.error.NoViableAltException(this)}}catch(e){if(!(e instanceof r.error.RecognitionException))throw e;t.exception=e,this._errHandler.reportError(this,e),this._errHandler.recover(this,e)}finally{this.exitRule()}return t},pt.prototype=Object.create(r.ParserRuleContext.prototype),pt.prototype.constructor=pt,pt.prototype.OPAR=function(){return this.getToken(h.OPAR,0)},pt.prototype.expr=function(){return this.getTypedRuleContext(z,0)},pt.prototype.CPAR=function(){return this.getToken(h.CPAR,0)},pt.prototype.enterRule=function(t){t instanceof o&&t.enterParExpr(this)},pt.prototype.exitRule=function(t){t instanceof o&&t.exitParExpr(this)},h.ParExprContext=pt,h.prototype.parExpr=function(){var t=new pt(this,this._ctx,this.state);this.enterRule(t,72,h.RULE_parExpr);try{this.enterOuterAlt(t,1),this.state=341,this.match(h.OPAR),this.state=342,this.expr(0),this.state=343,this.match(h.CPAR)}catch(e){if(!(e instanceof r.error.RecognitionException))throw e;t.exception=e,this._errHandler.reportError(this,e),this._errHandler.recover(this,e)}finally{this.exitRule()}return t},h.prototype.sempred=function(t,e,n){switch(e){case 34:return this.expr_sempred(t,n);default:throw"No predicate with index:"+e}},h.prototype.expr_sempred=function(t,e){switch(e){case 0:return this.precpred(this._ctx,9);case 1:return this.precpred(this._ctx,8);case 2:return this.precpred(this._ctx,7);case 3:return this.precpred(this._ctx,6);case 4:return this.precpred(this._ctx,5);case 5:return this.precpred(this._ctx,4);case 6:return this.precpred(this._ctx,3);default:throw"No predicate with index:"+e}},e.sequenceParser=h},function(t,e,n){var r=n(17),o=["а훑舆괭䐗껱趀ꫝ","2Ŀ\b\b\t\t","\t\t\t","\t\b\t\b\t\t\t\n\t\n\v\t\v","\f\t\f\r\t\r\t\t","\t\t\t\t","\t\t\t","\t\t\t\t","\t\t\t",'\t\t \t !\t!"\t"#',"\t#$\t$%\t%&\t&'\t'(\t()\t)","*\t*+\t+,\t,-\t-.\t./\t/0\t0","1\t1","","","\b\b\t\t\n\n","\n\v\v\v\f\f\r","\r","","","","","","","","     !!!!!","!!!!!!!!!!","!!!!!!!!!!",'!!Ô\n!""""""','"####$$$$$',"$$$%%%%%%&","&'''ó\n'\f''ö\v'","((ù\n(\r((ú))þ\n)\r))ÿ",")))Ą\n)\f))ć\v)))",")ċ\n)\r))Č)ď\n)**","***ĕ\n*\f**Ę\v***","+++++Ġ\n+\f++ģ\v+",",,,,--...ĭ\n.\f","..İ\v.///Ĵ\n/\r//ĵ","00001111","2\b\n\f\b\t","\n\v\f\r ",'"$&(*,.02',"468:<> @!B\"D#F$H%J&L'N(P)R*T+V,X-Z.","\\/^0`1b2\tC\\aac|2;C\\aa","c|2;\f\f$$\f\f",'\v\f""""Ō',"","\b\n\f","","","",""," ",'"$',"&(","*,",".0","246","8:","<>","@B","DF","HJL","NP","RT","VX","Z\\","^`b","di","\bk\nn\f","qtw","y{","~",""," ",'"$',"&(","*,.","02","46 ","8¢:§","<­>±","@´BÓDÕ","FÜHà","JèLî","NðPø","RĎTĐ","VěXĤZĨ","\\Ī^ı","`ķbĻ","de/ef@fg","gh\bhij","Bjkl~","lm~m\tno(","op(p\vqr?","rs?s\rtu#","uv?vwx@","xyz>z","{|@|}?}","~>","?","-","/",",","1","'!","`##","%<","'<","<)","=+",".-?","/*","1+","3}5"," ¡¡7","¢£v£¤","t¤¥w¥¦g","¦9§¨h","¨©c©ªnª","«u«¬g¬;","­®p®¯","k¯°n°=","±²k²³h","³?´µgµ","¶n¶·u·¸","g¸A¹º","yº»j»¼k","¼½n½Ôg","¾¿h¿ÀqÀ","ÔtÁÂhÂÃ","qÃÄtÄÅ","gÅÆcÆÇe","ÇÔjÈÉh","ÉÊqÊËtË","ÌGÌÍcÍÎ","eÎÔjÏÐ","nÐÑqÑÒq","ÒÔrÓ¹","Ó¾ÓÁ","ÓÈÓÏ","ÔCÕÖt","Ö×g×ØvØ","ÙwÙÚtÚÛ","pÛEÜÝ","pÝÞgÞßy","ßGàáU","áâvâãcã","ätäåvåæ","gæçtçI","èéVéêj","êëgëìo","ìígíKî","ï0ïMðô","\tñó\tòñ","óöôò","ôõõO","öô÷ù\t","ø÷ùú","úøúû","ûQüþ\t","ýüþÿ","ÿýÿĀ","Āāāą0","ĂĄ\tăĂ","Ąćąă","ąĆĆď","ćąĈĊ0","ĉċ\tĊĉ","ċČČĊ","Čččď","ĎýĎĈ","ďSĐĖ$","đĕ\nĒē$","ēĕ$Ĕđ","ĔĒĕĘ","ĖĔĖė","ėęĘĖ","ęĚ$ĚUě","Ĝ1Ĝĝ1ĝġ","ĞĠ\nğĞ","Ġģġğ","ġĢĢW","ģġĤĥ","\tĥĦĦħ","\b,ħYĨĩ\v","ĩ[ĪĮ\t","īĭ\tĬī","ĭİĮĬ","Įįį]","İĮıĳ<","ĲĴ\nĳĲ","Ĵĵĵĳ","ĵĶĶ_","ķĸ\tĸĹ","Ĺĺ\b0ĺaĻ","ļ\t\bļĽĽľ","\b1ľcÓ","ôúÿąČĎĔĖġĮĵ",""].join(""),i=(new r.atn.ATNDeserializer).deserialize(o),s=i.decisionToState.map(function(t,e){return new r.dfa.DFA(t,e)});function a(t){return r.Lexer.call(this,t),this._interp=new r.atn.LexerATNSimulator(this,i,s,new r.PredictionContextCache),this}a.prototype=Object.create(r.Lexer.prototype),a.prototype.constructor=a,a.EOF=r.Token.EOF,a.ARROW=1,a.AT=2,a.OR=3,a.AND=4,a.EQ=5,a.NEQ=6,a.GT=7,a.LT=8,a.GTEQ=9,a.LTEQ=10,a.PLUS=11,a.MINUS=12,a.MULT=13,a.DIV=14,a.MOD=15,a.POW=16,a.NOT=17,a.COL=18,a.DOUBLECOL=19,a.SCOL=20,a.COMMA=21,a.ASSIGN=22,a.OPAR=23,a.CPAR=24,a.OBRACE=25,a.CBRACE=26,a.TRUE=27,a.FALSE=28,a.NIL=29,a.IF=30,a.ELSE=31,a.WHILE=32,a.RETURN=33,a.NEW=34,a.STARTER=35,a.THEME=36,a.DOT=37,a.ID=38,a.INT=39,a.FLOAT=40,a.STRING=41,a.COMMENT=42,a.SPACE=43,a.OTHER=44,a.NAME=45,a.CONTENT=46,a.NEWLINE=47,a.WS=48,a.ASYNC=1,a.modeNames=["DEFAULT_MODE","ASYNC"],a.literalNames=[null,"'->'","'@'","'||'","'&&'","'=='","'!='","'>'","'<'","'>='","'<='","'+'","'-'","'*'","'/'","'%'","'^'","'!'","':'","'::'","';'","','","'='","'('","')'","'{'","'}'","'true'","'false'","'nil'","'if'","'else'",null,"'return'","'new'","'Starter'","'Theme'","'.'"],a.symbolicNames=[null,"ARROW","AT","OR","AND","EQ","NEQ","GT","LT","GTEQ","LTEQ","PLUS","MINUS","MULT","DIV","MOD","POW","NOT","COL","DOUBLECOL","SCOL","COMMA","ASSIGN","OPAR","CPAR","OBRACE","CBRACE","TRUE","FALSE","NIL","IF","ELSE","WHILE","RETURN","NEW","STARTER","THEME","DOT","ID","INT","FLOAT","STRING","COMMENT","SPACE","OTHER","NAME","CONTENT","NEWLINE","WS"],a.ruleNames=["ARROW","AT","OR","AND","EQ","NEQ","GT","LT","GTEQ","LTEQ","PLUS","MINUS","MULT","DIV","MOD","POW","NOT","COL","DOUBLECOL","SCOL","COMMA","ASSIGN","OPAR","CPAR","OBRACE","CBRACE","TRUE","FALSE","NIL","IF","ELSE","WHILE","RETURN","NEW","STARTER","THEME","DOT","ID","INT","FLOAT","STRING","COMMENT","SPACE","OTHER","NAME","CONTENT","NEWLINE","WS"],a.grammarFileName="sequenceLexer.g4",e.sequenceLexer=a},function(t,e,n){var r=n(1).Token,o=n(4).ParseTreeListener,i=n(27).Recognizer,s=n(22).DefaultErrorStrategy,a=n(30).ATNDeserializer,c=n(29).ATNDeserializationOptions,u=n(4).TerminalNode,p=n(4).ErrorNode;function l(t){return o.call(this),this.parser=t,this}function h(t){return i.call(this),this._input=null,this._errHandler=new s,this._precedenceStack=[],this._precedenceStack.push(0),this._ctx=null,this.buildParseTrees=!0,this._tracer=null,this._parseListeners=null,this._syntaxErrors=0,this.setInputStream(t),this}l.prototype=Object.create(o.prototype),l.prototype.constructor=l,l.prototype.enterEveryRule=function(t){console.log("enter   "+this.parser.ruleNames[t.ruleIndex]+", LT(1)="+this.parser._input.LT(1).text)},l.prototype.visitTerminal=function(t){console.log("consume "+t.symbol+" rule "+this.parser.ruleNames[this.parser._ctx.ruleIndex])},l.prototype.exitEveryRule=function(t){console.log("exit    "+this.parser.ruleNames[t.ruleIndex]+", LT(1)="+this.parser._input.LT(1).text)},h.prototype=Object.create(i.prototype),h.prototype.contructor=h,h.bypassAltsAtnCache={},h.prototype.reset=function(){null!==this._input&&this._input.seek(0),this._errHandler.reset(this),this._ctx=null,this._syntaxErrors=0,this.setTrace(!1),this._precedenceStack=[],this._precedenceStack.push(0),null!==this._interp&&this._interp.reset()},h.prototype.match=function(t){var e=this.getCurrentToken();return e.type===t?(this._errHandler.reportMatch(this),this.consume()):(e=this._errHandler.recoverInline(this),this.buildParseTrees&&-1===e.tokenIndex&&this._ctx.addErrorNode(e)),e},h.prototype.matchWildcard=function(){var t=this.getCurrentToken();return t.type>0?(this._errHandler.reportMatch(this),this.consume()):(t=this._errHandler.recoverInline(this),this._buildParseTrees&&-1===t.tokenIndex&&this._ctx.addErrorNode(t)),t},h.prototype.getParseListeners=function(){return this._parseListeners||[]},h.prototype.addParseListener=function(t){if(null===t)throw"listener";null===this._parseListeners&&(this._parseListeners=[]),this._parseListeners.push(t)},h.prototype.removeParseListener=function(t){if(null!==this._parseListeners){var e=this._parseListeners.indexOf(t);e>=0&&this._parseListeners.splice(e,1),0===this._parseListeners.length&&(this._parseListeners=null)}},h.prototype.removeParseListeners=function(){this._parseListeners=null},h.prototype.triggerEnterRuleEvent=function(){if(null!==this._parseListeners){var t=this._ctx;this._parseListeners.map(function(e){e.enterEveryRule(t),t.enterRule(e)})}},h.prototype.triggerExitRuleEvent=function(){if(null!==this._parseListeners){var t=this._ctx;this._parseListeners.slice(0).reverse().map(function(e){t.exitRule(e),e.exitEveryRule(t)})}},h.prototype.getTokenFactory=function(){return this._input.tokenSource._factory},h.prototype.setTokenFactory=function(t){this._input.tokenSource._factory=t},h.prototype.getATNWithBypassAlts=function(){var t=this.getSerializedATN();if(null===t)throw"The current parser does not support an ATN with bypass alternatives.";var e=this.bypassAltsAtnCache[t];if(null===e){var n=new c;n.generateRuleBypassTransitions=!0,e=new a(n).deserialize(t),this.bypassAltsAtnCache[t]=e}return e};var f=n(14).Lexer;h.prototype.compileParseTreePattern=function(t,e,n){if(null===(n=n||null)&&null!==this.getTokenStream()){var r=this.getTokenStream().tokenSource;r instanceof f&&(n=r)}if(null===n)throw"Parser can't discover a lexer to use";return new ParseTreePatternMatcher(n,this).compile(t,e)},h.prototype.getInputStream=function(){return this.getTokenStream()},h.prototype.setInputStream=function(t){this.setTokenStream(t)},h.prototype.getTokenStream=function(){return this._input},h.prototype.setTokenStream=function(t){this._input=null,this.reset(),this._input=t},h.prototype.getCurrentToken=function(){return this._input.LT(1)},h.prototype.notifyErrorListeners=function(t,e,n){e=e||null,n=n||null,null===e&&(e=this.getCurrentToken()),this._syntaxErrors+=1;var r=e.line,o=e.column;this.getErrorListenerDispatch().syntaxError(this,e,r,o,t,n)},h.prototype.consume=function(){var t=this.getCurrentToken();t.type!==r.EOF&&this.getInputStream().consume();var e,n=null!==this._parseListeners&&this._parseListeners.length>0;return(this.buildParseTrees||n)&&((e=this._errHandler.inErrorRecoveryMode(this)?this._ctx.addErrorNode(t):this._ctx.addTokenNode(t)).invokingState=this.state,n&&this._parseListeners.map(function(t){e instanceof p||void 0!==e.isErrorNode&&e.isErrorNode()?t.visitErrorNode(e):e instanceof u&&t.visitTerminal(e)})),t},h.prototype.addContextToParseTree=function(){null!==this._ctx.parentCtx&&this._ctx.parentCtx.addChild(this._ctx)},h.prototype.enterRule=function(t,e,n){this.state=e,this._ctx=t,this._ctx.start=this._input.LT(1),this.buildParseTrees&&this.addContextToParseTree(),null!==this._parseListeners&&this.triggerEnterRuleEvent()},h.prototype.exitRule=function(){this._ctx.stop=this._input.LT(-1),null!==this._parseListeners&&this.triggerExitRuleEvent(),this.state=this._ctx.invokingState,this._ctx=this._ctx.parentCtx},h.prototype.enterOuterAlt=function(t,e){t.setAltNumber(e),this.buildParseTrees&&this._ctx!==t&&null!==this._ctx.parentCtx&&(this._ctx.parentCtx.removeLastChild(),this._ctx.parentCtx.addChild(t)),this._ctx=t},h.prototype.getPrecedence=function(){return 0===this._precedenceStack.length?-1:this._precedenceStack[this._precedenceStack.length-1]},h.prototype.enterRecursionRule=function(t,e,n,r){this.state=e,this._precedenceStack.push(r),this._ctx=t,this._ctx.start=this._input.LT(1),null!==this._parseListeners&&this.triggerEnterRuleEvent()},h.prototype.pushNewRecursionContext=function(t,e,n){var r=this._ctx;r.parentCtx=t,r.invokingState=e,r.stop=this._input.LT(-1),this._ctx=t,this._ctx.start=r.start,this.buildParseTrees&&this._ctx.addChild(r),null!==this._parseListeners&&this.triggerEnterRuleEvent()},h.prototype.unrollRecursionContexts=function(t){this._precedenceStack.pop(),this._ctx.stop=this._input.LT(-1);var e=this._ctx;if(null!==this._parseListeners)for(;this._ctx!==t;)this.triggerExitRuleEvent(),this._ctx=this._ctx.parentCtx;else this._ctx=t;e.parentCtx=t,this.buildParseTrees&&null!==t&&t.addChild(e)},h.prototype.getInvokingContext=function(t){for(var e=this._ctx;null!==e;){if(e.ruleIndex===t)return e;e=e.parentCtx}return null},h.prototype.precpred=function(t,e){return e>=this._precedenceStack[this._precedenceStack.length-1]},h.prototype.inContext=function(t){return!1},h.prototype.isExpectedToken=function(t){var e=this._interp.atn,n=this._ctx,o=e.states[this.state],i=e.nextTokens(o);if(i.contains(t))return!0;if(!i.contains(r.EPSILON))return!1;for(;null!==n&&n.invokingState>=0&&i.contains(r.EPSILON);){var s=e.states[n.invokingState].transitions[0];if((i=e.nextTokens(s.followState)).contains(t))return!0;n=n.parentCtx}return!(!i.contains(r.EPSILON)||t!==r.EOF)},h.prototype.getExpectedTokens=function(){return this._interp.atn.getExpectedTokens(this.state,this._ctx)},h.prototype.getExpectedTokensWithinCurrentRule=function(){var t=this._interp.atn,e=t.states[this.state];return t.nextTokens(e)},h.prototype.getRuleIndex=function(t){var e=this.getRuleIndexMap()[t];return null!==e?e:-1},h.prototype.getRuleInvocationStack=function(t){null===(t=t||null)&&(t=this._ctx);for(var e=[];null!==t;){var n=t.ruleIndex;n<0?e.push("n/a"):e.push(this.ruleNames[n]),t=t.parentCtx}return e},h.prototype.getDFAStrings=function(){return this._interp.decisionToDFA.toString()},h.prototype.dumpDFA=function(){for(var t=!1,e=0;e<this._interp.decisionToDFA.length;e++){var n=this._interp.decisionToDFA[e];n.states.length>0&&(t&&console.log(),this.printer.println("Decision "+n.decision+":"),this.printer.print(n.toString(this.literalNames,this.symbolicNames)),t=!0)}},h.prototype.getSourceName=function(){return this._input.sourceName},h.prototype.setTrace=function(t){t?(null!==this._tracer&&this.removeParseListener(this._tracer),this._tracer=new l(this),this.addParseListener(this._tracer)):(this.removeParseListener(this._tracer),this._tracer=null)},e.Parser=h},function(t,e,n){var r=n(1).Token,o=n(14).Lexer,i=n(2).Interval;function s(){return this}function a(t){return s.call(this),this.tokenSource=t,this.tokens=[],this.index=-1,this.fetchedEOF=!1,this}a.prototype=Object.create(s.prototype),a.prototype.constructor=a,a.prototype.mark=function(){return 0},a.prototype.release=function(t){},a.prototype.reset=function(){this.seek(0)},a.prototype.seek=function(t){this.lazyInit(),this.index=this.adjustSeekIndex(t)},a.prototype.get=function(t){return this.lazyInit(),this.tokens[t]},a.prototype.consume=function(){if(!(this.index>=0&&(this.fetchedEOF?this.index<this.tokens.length-1:this.index<this.tokens.length))&&this.LA(1)===r.EOF)throw"cannot consume EOF";this.sync(this.index+1)&&(this.index=this.adjustSeekIndex(this.index+1))},a.prototype.sync=function(t){var e=t-this.tokens.length+1;return!(e>0)||this.fetch(e)>=e},a.prototype.fetch=function(t){if(this.fetchedEOF)return 0;for(var e=0;e<t;e++){var n=this.tokenSource.nextToken();if(n.tokenIndex=this.tokens.length,this.tokens.push(n),n.type===r.EOF)return this.fetchedEOF=!0,e+1}return t},a.prototype.getTokens=function(t,e,n){if(void 0===n&&(n=null),t<0||e<0)return null;this.lazyInit();var o=[];e>=this.tokens.length&&(e=this.tokens.length-1);for(var i=t;i<e;i++){var s=this.tokens[i];if(s.type===r.EOF)break;(null===n||n.contains(s.type))&&o.push(s)}return o},a.prototype.LA=function(t){return this.LT(t).type},a.prototype.LB=function(t){return this.index-t<0?null:this.tokens[this.index-t]},a.prototype.LT=function(t){if(this.lazyInit(),0===t)return null;if(t<0)return this.LB(-t);var e=this.index+t-1;return this.sync(e),e>=this.tokens.length?this.tokens[this.tokens.length-1]:this.tokens[e]},a.prototype.adjustSeekIndex=function(t){return t},a.prototype.lazyInit=function(){-1===this.index&&this.setup()},a.prototype.setup=function(){this.sync(0),this.index=this.adjustSeekIndex(0)},a.prototype.setTokenSource=function(t){this.tokenSource=t,this.tokens=[],this.index=-1,this.fetchedEOF=!1},a.prototype.nextTokenOnChannel=function(t,e){if(this.sync(t),t>=this.tokens.length)return-1;for(var n=this.tokens[t];n.channel!==this.channel;){if(n.type===r.EOF)return-1;t+=1,this.sync(t),n=this.tokens[t]}return t},a.prototype.previousTokenOnChannel=function(t,e){for(;t>=0&&this.tokens[t].channel!==e;)t-=1;return t},a.prototype.getHiddenTokensToRight=function(t,e){if(void 0===e&&(e=-1),this.lazyInit(),t<0||t>=this.tokens.length)throw t+" not in 0.."+this.tokens.length-1;var n=this.nextTokenOnChannel(t+1,o.DEFAULT_TOKEN_CHANNEL),r=t+1,i=-1===n?this.tokens.length-1:n;return this.filterForChannel(r,i,e)},a.prototype.getHiddenTokensToLeft=function(t,e){if(void 0===e&&(e=-1),this.lazyInit(),t<0||t>=this.tokens.length)throw t+" not in 0.."+this.tokens.length-1;var n=this.previousTokenOnChannel(t-1,o.DEFAULT_TOKEN_CHANNEL);if(n===t-1)return null;var r=n+1,i=t-1;return this.filterForChannel(r,i,e)},a.prototype.filterForChannel=function(t,e,n){for(var r=[],i=t;i<e+1;i++){var s=this.tokens[i];-1===n?s.channel!==o.DEFAULT_TOKEN_CHANNEL&&r.push(s):s.channel===n&&r.push(s)}return 0===r.length?null:r},a.prototype.getSourceName=function(){return this.tokenSource.getSourceName()},a.prototype.getText=function(t){this.lazyInit(),this.fill(),void 0!==t&&null!==t||(t=new i(0,this.tokens.length-1));var e=t.start;e instanceof r&&(e=e.tokenIndex);var n=t.stop;if(n instanceof r&&(n=n.tokenIndex),null===e||null===n||e<0||n<0)return"";n>=this.tokens.length&&(n=this.tokens.length-1);for(var o="",s=e;s<n+1;s++){var a=this.tokens[s];if(a.type===r.EOF)break;o+=a.text}return o},a.prototype.fill=function(){for(this.lazyInit();1e3===this.fetch(1e3););},e.BufferedTokenStream=a},function(t,e,n){var r=n(1).Token,o=n(35).BufferedTokenStream;function i(t,e){return o.call(this,t),this.channel=void 0===e?r.DEFAULT_CHANNEL:e,this}i.prototype=Object.create(o.prototype),i.prototype.constructor=i,i.prototype.adjustSeekIndex=function(t){return this.nextTokenOnChannel(t,this.channel)},i.prototype.LB=function(t){if(0===t||this.index-t<0)return null;for(var e=this.index,n=1;n<=t;)e=this.previousTokenOnChannel(e-1,this.channel),n+=1;return e<0?null:this.tokens[e]},i.prototype.LT=function(t){if(this.lazyInit(),0===t)return null;if(t<0)return this.LB(-t);for(var e=this.index,n=1;n<t;)this.sync(e+1)&&(e=this.nextTokenOnChannel(e+1,this.channel)),n+=1;return this.tokens[e]},i.prototype.getNumberOfOnChannelTokens=function(){var t=0;this.fill();for(var e=0;e<this.tokens.length;e++){var n=this.tokens[e];if(n.channel===this.channel&&(t+=1),n.type===r.EOF)break}return t},e.CommonTokenStream=i},function(t,e,n){var r=n(18).InputStream,o="undefined"==typeof window&&"undefined"==typeof importScripts?n(21):null;function i(t,e){var n=o.readFileSync(t,"utf8");return r.call(this,n,e),this.fileName=t,this}i.prototype=Object.create(r.prototype),i.prototype.constructor=i,e.FileStream=i},function(t,e,n){var r=n(18).InputStream,o="undefined"==typeof window&&"undefined"==typeof importScripts?n(21):null,i={fromString:function(t){return new r(t,!0)},fromBlob:function(t,e,n,o){var i=FileReader();i.onload=function(t){var e=new r(t.target.result,!0);n(e)},i.onerror=o,i.readAsText(t,e)},fromBuffer:function(t,e){return new r(t.toString(e),!0)},fromPath:function(t,e,n){o.readFile(t,e,function(t,e){var o=null;null!==e&&(o=new r(e,!0)),n(t,o)})},fromPathSync:function(t,e){var n=o.readFileSync(t,e);return new r(n,!0)}};e.CharStreams=i},function(t,e,n){var r=n(0).BitSet,o=n(13).ErrorListener,i=n(2).Interval;function s(t){return o.call(this),t=t||!0,this.exactOnly=t,this}s.prototype=Object.create(o.prototype),s.prototype.constructor=s,s.prototype.reportAmbiguity=function(t,e,n,r,o,s,a){if(!this.exactOnly||o){var c="reportAmbiguity d="+this.getDecisionDescription(t,e)+": ambigAlts="+this.getConflictingAlts(s,a)+", input='"+t.getTokenStream().getText(new i(n,r))+"'";t.notifyErrorListeners(c)}},s.prototype.reportAttemptingFullContext=function(t,e,n,r,o,s){var a="reportAttemptingFullContext d="+this.getDecisionDescription(t,e)+", input='"+t.getTokenStream().getText(new i(n,r))+"'";t.notifyErrorListeners(a)},s.prototype.reportContextSensitivity=function(t,e,n,r,o,s){var a="reportContextSensitivity d="+this.getDecisionDescription(t,e)+", input='"+t.getTokenStream().getText(new i(n,r))+"'";t.notifyErrorListeners(a)},s.prototype.getDecisionDescription=function(t,e){var n=e.decision,r=e.atnStartState.ruleIndex,o=t.ruleNames;if(r<0||r>=o.length)return""+n;var i=o[r]||null;return null===i||0===i.length?""+n:n+" ("+i+")"},s.prototype.getConflictingAlts=function(t,e){if(null!==t)return t;for(var n=new r,o=0;o<e.items.length;o++)n.add(e.items[o].alt);return"{"+n.values().join(", ")+"}"},e.DiagnosticErrorListener=s},function(t,e,n){e.RecognitionException=n(3).RecognitionException,e.NoViableAltException=n(3).NoViableAltException,e.LexerNoViableAltException=n(3).LexerNoViableAltException,e.InputMismatchException=n(3).InputMismatchException,e.FailedPredicateException=n(3).FailedPredicateException,e.DiagnosticErrorListener=n(39).DiagnosticErrorListener,e.BailErrorStrategy=n(22).BailErrorStrategy,e.ErrorListener=n(13).ErrorListener},function(t,e,n){var r=n(4);e.Trees=n(31).Trees,e.RuleNode=r.RuleNode,e.ParseTreeListener=r.ParseTreeListener,e.ParseTreeVisitor=r.ParseTreeVisitor,e.ParseTreeWalker=r.ParseTreeWalker},function(t,e,n){var r=n(0).Set,o=n(10).DFAState,i=n(5).StarLoopEntryState,s=n(9).ATNConfigSet,a=n(12).DFASerializer,c=n(12).LexerDFASerializer;function u(t,e){if(void 0===e&&(e=0),this.atnStartState=t,this.decision=e,this._states=new r,this.s0=null,this.precedenceDfa=!1,t instanceof i&&t.isPrecedenceDecision){this.precedenceDfa=!0;var n=new o(null,new s);n.edges=[],n.isAcceptState=!1,n.requiresFullContext=!1,this.s0=n}return this}u.prototype.getPrecedenceStartState=function(t){if(!this.precedenceDfa)throw"Only precedence DFAs may contain a precedence start state.";return t<0||t>=this.s0.edges.length?null:this.s0.edges[t]||null},u.prototype.setPrecedenceStartState=function(t,e){if(!this.precedenceDfa)throw"Only precedence DFAs may contain a precedence start state.";t<0||(this.s0.edges[t]=e)},u.prototype.setPrecedenceDfa=function(t){if(this.precedenceDfa!==t){if(this._states=new DFAStatesSet,t){var e=new o(null,new s);e.edges=[],e.isAcceptState=!1,e.requiresFullContext=!1,this.s0=e}else this.s0=null;this.precedenceDfa=t}},Object.defineProperty(u.prototype,"states",{get:function(){return this._states}}),u.prototype.sortedStates=function(){return this._states.values().sort(function(t,e){return t.stateNumber-e.stateNumber})},u.prototype.toString=function(t,e){return t=t||null,e=e||null,null===this.s0?"":new a(this,t,e).toString()},u.prototype.toLexerString=function(){return null===this.s0?"":new c(this).toString()},e.DFA=u},function(t,e,n){e.DFA=n(42).DFA,e.DFASerializer=n(12).DFASerializer,e.LexerDFASerializer=n(12).LexerDFASerializer,e.PredPrediction=n(10).PredPrediction},function(t,e,n){var r=n(0),o=r.Set,i=r.BitSet,s=r.DoubleDict,a=n(8).ATN,c=n(5).ATNState,u=n(16).ATNConfig,p=n(9).ATNConfigSet,l=n(1).Token,h=n(10).DFAState,f=n(10).PredPrediction,d=n(26).ATNSimulator,y=n(25).PredictionMode,g=n(15).RuleContext,x=(n(19).ParserRuleContext,n(11).SemanticContext),m=(n(5).StarLoopEntryState,n(5).RuleStopState),v=n(6).PredictionContext,E=n(2).Interval,T=n(7),_=T.Transition,C=T.SetTransition,S=T.NotSetTransition,R=T.RuleTransition,A=T.ActionTransition,O=n(3).NoViableAltException,L=n(6).SingletonPredictionContext,N=n(6).predictionContextFromRuleContext;function b(t,e,n,r){return d.call(this,e,r),this.parser=t,this.decisionToDFA=n,this.predictionMode=y.LL,this._input=null,this._startIndex=0,this._outerContext=null,this._dfa=null,this.mergeCache=null,this}b.prototype=Object.create(d.prototype),b.prototype.constructor=b,b.prototype.debug=!1,b.prototype.debug_closure=!1,b.prototype.debug_add=!1,b.prototype.debug_list_atn_decisions=!1,b.prototype.dfa_debug=!1,b.prototype.retry_debug=!1,b.prototype.reset=function(){},b.prototype.adaptivePredict=function(t,e,n){(this.debug||this.debug_list_atn_decisions)&&console.log("adaptivePredict decision "+e+" exec LA(1)=="+this.getLookaheadName(t)+" line "+t.LT(1).line+":"+t.LT(1).column),this._input=t,this._startIndex=t.index,this._outerContext=n;var r=this.decisionToDFA[e];this._dfa=r;var o=t.mark(),i=t.index;try{var s;if(null===(s=r.precedenceDfa?r.getPrecedenceStartState(this.parser.getPrecedence()):r.s0)){null===n&&(n=g.EMPTY),(this.debug||this.debug_list_atn_decisions)&&console.log("predictATN decision "+r.decision+" exec LA(1)=="+this.getLookaheadName(t)+", outerContext="+n.toString(this.parser.ruleNames));var a=this.computeStartState(r.atnStartState,g.EMPTY,!1);r.precedenceDfa?(r.s0.configs=a,a=this.applyPrecedenceFilter(a),s=this.addDFAState(r,new h(null,a)),r.setPrecedenceStartState(this.parser.getPrecedence(),s)):(s=this.addDFAState(r,new h(null,a)),r.s0=s)}var c=this.execATN(r,s,t,i,n);return this.debug&&console.log("DFA after predictATN: "+r.toString(this.parser.literalNames)),c}finally{this._dfa=null,this.mergeCache=null,t.seek(i),t.release(o)}},b.prototype.execATN=function(t,e,n,r,o){var i;(this.debug||this.debug_list_atn_decisions)&&console.log("execATN decision "+t.decision+" exec LA(1)=="+this.getLookaheadName(n)+" line "+n.LT(1).line+":"+n.LT(1).column);var s=e;this.debug&&console.log("s0 = "+e);for(var c=n.LA(1);;){var u=this.getExistingTargetState(s,c);if(null===u&&(u=this.computeTargetState(t,s,c)),u===d.ERROR){var p=this.noViableAlt(n,o,s.configs,r);if(n.seek(r),(i=this.getSynValidOrSemInvalidAltThatFinishedDecisionEntryRule(s.configs,o))!==a.INVALID_ALT_NUMBER)return i;throw p}if(u.requiresFullContext&&this.predictionMode!==y.SLL){var h=null;if(null!==u.predicates){this.debug&&console.log("DFA state has preds in DFA sim LL failover");var f=n.index;if(f!==r&&n.seek(r),1===(h=this.evalSemanticContext(u.predicates,o,!0)).length)return this.debug&&console.log("Full LL avoided"),h.minValue();f!==r&&n.seek(f)}this.dfa_debug&&console.log("ctx sensitive state "+o+" in "+u);var g=this.computeStartState(t.atnStartState,o,!0);return this.reportAttemptingFullContext(t,h,u.configs,r,n.index),this.execATNWithFullContext(t,u,g,n,r,o)}if(u.isAcceptState){if(null===u.predicates)return u.prediction;var x=n.index;n.seek(r);var m=this.evalSemanticContext(u.predicates,o,!0);if(0===m.length)throw this.noViableAlt(n,o,u.configs,r);return 1===m.length?m.minValue():(this.reportAmbiguity(t,u,r,x,!1,m,u.configs),m.minValue())}s=u,c!==l.EOF&&(n.consume(),c=n.LA(1))}},b.prototype.getExistingTargetState=function(t,e){var n=t.edges;return null===n?null:n[e+1]||null},b.prototype.computeTargetState=function(t,e,n){var o=this.computeReachSet(e.configs,n,!1);if(null===o)return this.addDFAEdge(t,e,n,d.ERROR),d.ERROR;var i=new h(null,o),s=this.getUniqueAlt(o);if(this.debug){var c=y.getConflictingAltSubsets(o);console.log("SLL altSubSets="+r.arrayToString(c)+", previous="+e.configs+", configs="+o+", predict="+s+", allSubsetsConflict="+y.allSubsetsConflict(c)+", conflictingAlts="+this.getConflictingAlts(o))}return s!==a.INVALID_ALT_NUMBER?(i.isAcceptState=!0,i.configs.uniqueAlt=s,i.prediction=s):y.hasSLLConflictTerminatingPrediction(this.predictionMode,o)&&(i.configs.conflictingAlts=this.getConflictingAlts(o),i.requiresFullContext=!0,i.isAcceptState=!0,i.prediction=i.configs.conflictingAlts.minValue()),i.isAcceptState&&i.configs.hasSemanticContext&&(this.predicateDFAState(i,this.atn.getDecisionState(t.decision)),null!==i.predicates&&(i.prediction=a.INVALID_ALT_NUMBER)),this.addDFAEdge(t,e,n,i)},b.prototype.predicateDFAState=function(t,e){var n=e.transitions.length,r=this.getConflictingAltsOrUniqueAlt(t.configs),o=this.getPredsForAmbigAlts(r,t.configs,n);null!==o?(t.predicates=this.getPredicatePredictions(r,o),t.prediction=a.INVALID_ALT_NUMBER):t.prediction=r.minValue()},b.prototype.execATNWithFullContext=function(t,e,n,r,o,i){(this.debug||this.debug_list_atn_decisions)&&console.log("execATNWithFullContext "+n);var s=!1,c=null,u=n;r.seek(o);for(var p=r.LA(1),h=-1;;){if(null===(c=this.computeReachSet(u,p,!0))){var f=this.noViableAlt(r,i,u,o);r.seek(o);var d=this.getSynValidOrSemInvalidAltThatFinishedDecisionEntryRule(u,i);if(d!==a.INVALID_ALT_NUMBER)return d;throw f}var g=y.getConflictingAltSubsets(c);if(this.debug&&console.log("LL altSubSets="+g+", predict="+y.getUniqueAlt(g)+", resolvesToJustOneViableAlt="+y.resolvesToJustOneViableAlt(g)),c.uniqueAlt=this.getUniqueAlt(c),c.uniqueAlt!==a.INVALID_ALT_NUMBER){h=c.uniqueAlt;break}if(this.predictionMode!==y.LL_EXACT_AMBIG_DETECTION){if((h=y.resolvesToJustOneViableAlt(g))!==a.INVALID_ALT_NUMBER)break}else if(y.allSubsetsConflict(g)&&y.allSubsetsEqual(g)){s=!0,h=y.getSingleViableAlt(g);break}u=c,p!==l.EOF&&(r.consume(),p=r.LA(1))}return c.uniqueAlt!==a.INVALID_ALT_NUMBER?(this.reportContextSensitivity(t,h,c,o,r.index),h):(this.reportAmbiguity(t,e,o,r.index,s,null,c),h)},b.prototype.computeReachSet=function(t,e,n){this.debug&&console.log("in computeReachSet, starting closure: "+t),null===this.mergeCache&&(this.mergeCache=new s);for(var r=new p(n),i=null,c=0;c<t.items.length;c++){var h=t.items[c];if(this.debug_add&&console.log("testing "+this.getTokenName(e)+" at "+h),h.state instanceof m)(n||e===l.EOF)&&(null===i&&(i=[]),i.push(h),this.debug_add&&console.log("added "+h+" to skippedStopStates"));else for(var f=0;f<h.state.transitions.length;f++){var d=h.state.transitions[f],g=this.getReachableTarget(d,e);if(null!==g){var x=new u({state:g},h);r.add(x,this.mergeCache),this.debug_add&&console.log("added "+x+" to intermediate")}}}var v=null;if(null===i&&e!==l.EOF&&(1===r.items.length?v=r:this.getUniqueAlt(r)!==a.INVALID_ALT_NUMBER&&(v=r)),null===v){v=new p(n);for(var E=new o,T=e===l.EOF,_=0;_<r.items.length;_++)this.closure(r.items[_],v,E,!1,n,T)}if(e===l.EOF&&(v=this.removeAllConfigsNotInRuleStopState(v,v===r)),!(null===i||n&&y.hasConfigInRuleStopState(v)))for(var C=0;C<i.length;C++)v.add(i[C],this.mergeCache);return 0===v.items.length?null:v},b.prototype.removeAllConfigsNotInRuleStopState=function(t,e){if(y.allConfigsInRuleStopStates(t))return t;for(var n=new p(t.fullCtx),r=0;r<t.items.length;r++){var o=t.items[r];if(o.state instanceof m)n.add(o,this.mergeCache);else if(e&&o.state.epsilonOnlyTransitions&&this.atn.nextTokens(o.state).contains(l.EPSILON)){var i=this.atn.ruleToStopState[o.state.ruleIndex];n.add(new u({state:i},o),this.mergeCache)}}return n},b.prototype.computeStartState=function(t,e,n){for(var r=N(this.atn,e),i=new p(n),s=0;s<t.transitions.length;s++){var a=t.transitions[s].target,c=new u({state:a,alt:s+1,context:r},null),l=new o;this.closure(c,i,l,!0,n,!1)}return i},b.prototype.applyPrecedenceFilter=function(t){for(var e,n=[],r=new p(t.fullCtx),o=0;o<t.items.length;o++)if(1===(e=t.items[o]).alt){var i=e.semanticContext.evalPrecedence(this.parser,this._outerContext);null!==i&&(n[e.state.stateNumber]=e.context,i!==e.semanticContext?r.add(new u({semanticContext:i},e),this.mergeCache):r.add(e,this.mergeCache))}for(o=0;o<t.items.length;o++)if(1!==(e=t.items[o]).alt){if(!e.precedenceFilterSuppressed){var s=n[e.state.stateNumber]||null;if(null!==s&&s.equals(e.context))continue}r.add(e,this.mergeCache)}return r},b.prototype.getReachableTarget=function(t,e){return t.matches(e,0,this.atn.maxTokenType)?t.target:null},b.prototype.getPredsForAmbigAlts=function(t,e,n){for(var o=[],i=0;i<e.items.length;i++){var s=e.items[i];t.contains(s.alt)&&(o[s.alt]=x.orContext(o[s.alt]||null,s.semanticContext))}var a=0;for(i=1;i<n+1;i++){var c=o[i]||null;null===c?o[i]=x.NONE:c!==x.NONE&&(a+=1)}return 0===a&&(o=null),this.debug&&console.log("getPredsForAmbigAlts result "+r.arrayToString(o)),o},b.prototype.getPredicatePredictions=function(t,e){for(var n=[],r=!1,o=1;o<e.length;o++){var i=e[o];null!==t&&t.contains(o)&&n.push(new f(i,o)),i!==x.NONE&&(r=!0)}return r?n:null},b.prototype.getSynValidOrSemInvalidAltThatFinishedDecisionEntryRule=function(t,e){var n=this.splitAccordingToSemanticValidity(t,e),r=n[0],o=n[1],i=this.getAltThatFinishedDecisionEntryRule(r);return i!==a.INVALID_ALT_NUMBER?i:o.items.length>0&&(i=this.getAltThatFinishedDecisionEntryRule(o))!==a.INVALID_ALT_NUMBER?i:a.INVALID_ALT_NUMBER},b.prototype.getAltThatFinishedDecisionEntryRule=function(t){for(var e=[],n=0;n<t.items.length;n++){var r=t.items[n];(r.reachesIntoOuterContext>0||r.state instanceof m&&r.context.hasEmptyPath())&&e.indexOf(r.alt)<0&&e.push(r.alt)}return 0===e.length?a.INVALID_ALT_NUMBER:Math.min.apply(null,e)},b.prototype.splitAccordingToSemanticValidity=function(t,e){for(var n=new p(t.fullCtx),r=new p(t.fullCtx),o=0;o<t.items.length;o++){var i=t.items[o];i.semanticContext!==x.NONE?i.semanticContext.evaluate(this.parser,e)?n.add(i):r.add(i):n.add(i)}return[n,r]},b.prototype.evalSemanticContext=function(t,e,n){for(var r=new i,o=0;o<t.length;o++){var s=t[o];if(s.pred!==x.NONE){var a=s.pred.evaluate(this.parser,e);if((this.debug||this.dfa_debug)&&console.log("eval pred "+s+"="+a),a&&((this.debug||this.dfa_debug)&&console.log("PREDICT "+s.alt),r.add(s.alt),!n))break}else if(r.add(s.alt),!n)break}return r},b.prototype.closure=function(t,e,n,r,o,i){this.closureCheckingStopState(t,e,n,r,o,0,i)},b.prototype.closureCheckingStopState=function(t,e,n,r,o,i,s){if((this.debug||this.debug_closure)&&(console.log("closure("+t.toString(this.parser,!0)+")"),t.reachesIntoOuterContext>50))throw"problem";if(t.state instanceof m){if(!t.context.isEmpty()){for(var a=0;a<t.context.length;a++)if(t.context.getReturnState(a)!==v.EMPTY_RETURN_STATE){var c=this.atn.states[t.context.getReturnState(a)],p=t.context.getParent(a),l={state:c,alt:t.alt,context:p,semanticContext:t.semanticContext},h=new u(l,null);h.reachesIntoOuterContext=t.reachesIntoOuterContext,this.closureCheckingStopState(h,e,n,r,o,i-1,s)}else{if(o){e.add(new u({state:t.state,context:v.EMPTY},t),this.mergeCache);continue}this.debug&&console.log("FALLING off rule "+this.getRuleName(t.state.ruleIndex)),this.closure_(t,e,n,r,o,i,s)}return}if(o)return void e.add(t,this.mergeCache);this.debug&&console.log("FALLING off rule "+this.getRuleName(t.state.ruleIndex))}this.closure_(t,e,n,r,o,i,s)},b.prototype.closure_=function(t,e,n,r,o,i,s){var a=t.state;a.epsilonOnlyTransitions||e.add(t,this.mergeCache);for(var c=0;c<a.transitions.length;c++)if(0!=c||!this.canDropLoopEntryEdgeInLeftRecursiveRule(t)){var u=a.transitions[c],p=r&&!(u instanceof A),l=this.getEpsilonTarget(t,u,p,0===i,o,s);if(null!==l){if(!u.isEpsilon&&n.add(l)!==l)continue;var h=i;if(t.state instanceof m){if(n.add(l)!==l)continue;null!==this._dfa&&this._dfa.precedenceDfa&&u.outermostPrecedenceReturn===this._dfa.atnStartState.ruleIndex&&(l.precedenceFilterSuppressed=!0),l.reachesIntoOuterContext+=1,e.dipsIntoOuterContext=!0,h-=1,this.debug&&console.log("dips into outer ctx: "+l)}else u instanceof R&&h>=0&&(h+=1);this.closureCheckingStopState(l,e,n,p,o,h,s)}}},b.prototype.canDropLoopEntryEdgeInLeftRecursiveRule=function(t){var e=t.state;if(e.stateType!=c.STAR_LOOP_ENTRY)return!1;if(e.stateType!=c.STAR_LOOP_ENTRY||!e.isPrecedenceDecision||t.context.isEmpty()||t.context.hasEmptyPath())return!1;for(var n=t.context.length,r=0;r<n;r++)if((s=this.atn.states[t.context.getReturnState(r)]).ruleIndex!=e.ruleIndex)return!1;var o=e.transitions[0].target.endState.stateNumber,i=this.atn.states[o];for(r=0;r<n;r++){var s,a=t.context.getReturnState(r);if(1!=(s=this.atn.states[a]).transitions.length||!s.transitions[0].isEpsilon)return!1;var u=s.transitions[0].target;if(!(s.stateType==c.BLOCK_END&&u==e||s==i||u==i||u.stateType==c.BLOCK_END&&1==u.transitions.length&&u.transitions[0].isEpsilon&&u.transitions[0].target==e))return!1}return!0},b.prototype.getRuleName=function(t){return null!==this.parser&&t>=0?this.parser.ruleNames[t]:"<rule "+t+">"},b.prototype.getEpsilonTarget=function(t,e,n,r,o,i){switch(e.serializationType){case _.RULE:return this.ruleTransition(t,e);case _.PRECEDENCE:return this.precedenceTransition(t,e,n,r,o);case _.PREDICATE:return this.predTransition(t,e,n,r,o);case _.ACTION:return this.actionTransition(t,e);case _.EPSILON:return new u({state:e.target},t);case _.ATOM:case _.RANGE:case _.SET:return i&&e.matches(l.EOF,0,1)?new u({state:e.target},t):null;default:return null}},b.prototype.actionTransition=function(t,e){if(this.debug){var n=-1==e.actionIndex?65535:e.actionIndex;console.log("ACTION edge "+e.ruleIndex+":"+n)}return new u({state:e.target},t)},b.prototype.precedenceTransition=function(t,e,n,o,i){this.debug&&(console.log("PRED (collectPredicates="+n+") "+e.precedence+">=_p, ctx dependent=true"),null!==this.parser&&console.log("context surrounding pred is "+r.arrayToString(this.parser.getRuleInvocationStack())));var s=null;if(n&&o)if(i){var a=this._input.index;this._input.seek(this._startIndex);var c=e.getPredicate().evaluate(this.parser,this._outerContext);this._input.seek(a),c&&(s=new u({state:e.target},t))}else{var p=x.andContext(t.semanticContext,e.getPredicate());s=new u({state:e.target,semanticContext:p},t)}else s=new u({state:e.target},t);return this.debug&&console.log("config from pred transition="+s),s},b.prototype.predTransition=function(t,e,n,o,i){this.debug&&(console.log("PRED (collectPredicates="+n+") "+e.ruleIndex+":"+e.predIndex+", ctx dependent="+e.isCtxDependent),null!==this.parser&&console.log("context surrounding pred is "+r.arrayToString(this.parser.getRuleInvocationStack())));var s=null;if(n&&(e.isCtxDependent&&o||!e.isCtxDependent))if(i){var a=this._input.index;this._input.seek(this._startIndex);var c=e.getPredicate().evaluate(this.parser,this._outerContext);this._input.seek(a),c&&(s=new u({state:e.target},t))}else{var p=x.andContext(t.semanticContext,e.getPredicate());s=new u({state:e.target,semanticContext:p},t)}else s=new u({state:e.target},t);return this.debug&&console.log("config from pred transition="+s),s},b.prototype.ruleTransition=function(t,e){this.debug&&console.log("CALL rule "+this.getRuleName(e.target.ruleIndex)+", ctx="+t.context);var n=e.followState,r=L.create(t.context,n.stateNumber);return new u({state:e.target,context:r},t)},b.prototype.getConflictingAlts=function(t){var e=y.getConflictingAltSubsets(t);return y.getAlts(e)},b.prototype.getConflictingAltsOrUniqueAlt=function(t){var e=null;return t.uniqueAlt!==a.INVALID_ALT_NUMBER?(e=new i).add(t.uniqueAlt):e=t.conflictingAlts,e},b.prototype.getTokenName=function(t){if(t===l.EOF)return"EOF";if(null!==this.parser&&null!==this.parser.literalNames){if(!(t>=this.parser.literalNames.length&&t>=this.parser.symbolicNames.length))return(this.parser.literalNames[t]||this.parser.symbolicNames[t])+"<"+t+">";console.log(t+" ttype out of range: "+this.parser.literalNames),console.log(""+this.parser.getInputStream().getTokens())}return""+t},b.prototype.getLookaheadName=function(t){return this.getTokenName(t.LA(1))},b.prototype.dumpDeadEndConfigs=function(t){console.log("dead end configs: ");for(var e=t.getDeadEndConfigs(),n=0;n<e.length;n++){var r=e[n],o="no edges";if(r.state.transitions.length>0){var i=r.state.transitions[0];i instanceof AtomTransition?o="Atom "+this.getTokenName(i.label):i instanceof C&&(o=(i instanceof S?"~":"")+"Set "+i.set)}console.error(r.toString(this.parser,!0)+":"+o)}},b.prototype.noViableAlt=function(t,e,n,r){return new O(this.parser,t,t.get(r),t.LT(1),n,e)},b.prototype.getUniqueAlt=function(t){for(var e=a.INVALID_ALT_NUMBER,n=0;n<t.items.length;n++){var r=t.items[n];if(e===a.INVALID_ALT_NUMBER)e=r.alt;else if(r.alt!==e)return a.INVALID_ALT_NUMBER}return e},b.prototype.addDFAEdge=function(t,e,n,r){if(this.debug&&console.log("EDGE "+e+" -> "+r+" upon "+this.getTokenName(n)),null===r)return null;if(r=this.addDFAState(t,r),null===e||n<-1||n>this.atn.maxTokenType)return r;if(null===e.edges&&(e.edges=[]),e.edges[n+1]=r,this.debug){var o=null===this.parser?null:this.parser.literalNames,i=null===this.parser?null:this.parser.symbolicNames;console.log("DFA=\n"+t.toString(o,i))}return r},b.prototype.addDFAState=function(t,e){if(e==d.ERROR)return e;var n=t.states.get(e);return null!==n?n:(e.stateNumber=t.states.length,e.configs.readOnly||(e.configs.optimizeConfigs(this),e.configs.setReadonly(!0)),t.states.add(e),this.debug&&console.log("adding new DFA state: "+e),e)},b.prototype.reportAttemptingFullContext=function(t,e,n,r,o){if(this.debug||this.retry_debug){var i=new E(r,o+1);console.log("reportAttemptingFullContext decision="+t.decision+":"+n+", input="+this.parser.getTokenStream().getText(i))}null!==this.parser&&this.parser.getErrorListenerDispatch().reportAttemptingFullContext(this.parser,t,r,o,e,n)},b.prototype.reportContextSensitivity=function(t,e,n,r,o){if(this.debug||this.retry_debug){var i=new E(r,o+1);console.log("reportContextSensitivity decision="+t.decision+":"+n+", input="+this.parser.getTokenStream().getText(i))}null!==this.parser&&this.parser.getErrorListenerDispatch().reportContextSensitivity(this.parser,t,r,o,e,n)},b.prototype.reportAmbiguity=function(t,e,n,r,o,i,s){if(this.debug||this.retry_debug){var a=new E(n,r+1);console.log("reportAmbiguity "+i+":"+s+", input="+this.parser.getTokenStream().getText(a))}null!==this.parser&&this.parser.getErrorListenerDispatch().reportAmbiguity(this.parser,t,n,r,o,i,s)},e.ParserATNSimulator=b},function(t,e,n){var r=n(0).hashStuff,o=n(28).LexerIndexedCustomAction;function i(t){return this.lexerActions=null===t?[]:t,this.cachedHashCode=r(t),this}i.append=function(t,e){return new i(null===t?[e]:t.lexerActions.concat([e]))},i.prototype.fixOffsetBeforeMatch=function(t){for(var e=null,n=0;n<this.lexerActions.length;n++)!this.lexerActions[n].isPositionDependent||this.lexerActions[n]instanceof o||(null===e&&(e=this.lexerActions.concat([])),e[n]=new o(t,this.lexerActions[n]));return null===e?this:new i(e)},i.prototype.execute=function(t,e,n){var r=!1,i=e.index;try{for(var s=0;s<this.lexerActions.length;s++){var a=this.lexerActions[s];if(a instanceof o){var c=a.offset;e.seek(n+c),a=a.action,r=n+c!==i}else a.isPositionDependent&&(e.seek(i),r=!1);a.execute(t)}}finally{r&&e.seek(i)}},i.prototype.hashCode=function(){return this.cachedHashCode},i.prototype.updateHashCode=function(t){t.update(this.cachedHashCode)},i.prototype.equals=function(t){if(this===t)return!0;if(t instanceof i){if(this.cachedHashCode!=t.cachedHashCode)return!1;if(this.lexerActions.length!=t.lexerActions.length)return!1;for(var e=this.lexerActions.length,n=0;n<e;++n)if(!this.lexerActions[n].equals(t.lexerActions[n]))return!1;return!0}return!1},e.LexerActionExecutor=i},function(t,e,n){var r=n(1).CommonToken;function o(){return this}function i(t){return o.call(this),this.copyText=void 0!==t&&t,this}i.prototype=Object.create(o.prototype),i.prototype.constructor=i,i.DEFAULT=new i,i.prototype.create=function(t,e,n,o,i,s,a,c){var u=new r(t,e,o,i,s);return u.line=a,u.column=c,null!==n?u.text=n:this.copyText&&null!==t[1]&&(u.text=t[1].getText(i,s)),u},i.prototype.createThin=function(t,e){var n=new r(null,t);return n.text=e,n},e.CommonTokenFactory=i},function(t,e,n){var r=n(1).Token,o=n(14).Lexer,i=n(8).ATN,s=n(26).ATNSimulator,a=n(10).DFAState,c=(n(9).ATNConfigSet,n(9).OrderedATNConfigSet),u=n(6).PredictionContext,p=n(6).SingletonPredictionContext,l=n(5).RuleStopState,h=n(16).LexerATNConfig,f=n(7).Transition,d=n(45).LexerActionExecutor,y=n(3).LexerNoViableAltException;function g(t){t.index=-1,t.line=0,t.column=-1,t.dfaState=null}function x(){return g(this),this}function m(t,e,n,r){return s.call(this,e,r),this.decisionToDFA=n,this.recog=t,this.startIndex=-1,this.line=1,this.column=0,this.mode=o.DEFAULT_MODE,this.prevAccept=new x,this}x.prototype.reset=function(){g(this)},m.prototype=Object.create(s.prototype),m.prototype.constructor=m,m.debug=!1,m.dfa_debug=!1,m.MIN_DFA_EDGE=0,m.MAX_DFA_EDGE=127,m.match_calls=0,m.prototype.copyState=function(t){this.column=t.column,this.line=t.line,this.mode=t.mode,this.startIndex=t.startIndex},m.prototype.match=function(t,e){this.match_calls+=1,this.mode=e;var n=t.mark();try{this.startIndex=t.index,this.prevAccept.reset();var r=this.decisionToDFA[e];return null===r.s0?this.matchATN(t):this.execATN(t,r.s0)}finally{t.release(n)}},m.prototype.reset=function(){this.prevAccept.reset(),this.startIndex=-1,this.line=1,this.column=0,this.mode=o.DEFAULT_MODE},m.prototype.matchATN=function(t){var e=this.atn.modeToStartState[this.mode];m.debug&&console.log("matchATN mode "+this.mode+" start: "+e);var n=this.mode,r=this.computeStartState(t,e),o=r.hasSemanticContext;r.hasSemanticContext=!1;var i=this.addDFAState(r);o||(this.decisionToDFA[this.mode].s0=i);var s=this.execATN(t,i);return m.debug&&console.log("DFA after matchATN: "+this.decisionToDFA[n].toLexerString()),s},m.prototype.execATN=function(t,e){m.debug&&console.log("start state closure="+e.configs),e.isAcceptState&&this.captureSimState(this.prevAccept,t,e);for(var n=t.LA(1),o=e;;){m.debug&&console.log("execATN loop starting closure: "+o.configs);var i=this.getExistingTargetState(o,n);if(null===i&&(i=this.computeTargetState(t,o,n)),i===s.ERROR)break;if(n!==r.EOF&&this.consume(t),i.isAcceptState&&(this.captureSimState(this.prevAccept,t,i),n===r.EOF))break;n=t.LA(1),o=i}return this.failOrAccept(this.prevAccept,t,o.configs,n)},m.prototype.getExistingTargetState=function(t,e){if(null===t.edges||e<m.MIN_DFA_EDGE||e>m.MAX_DFA_EDGE)return null;var n=t.edges[e-m.MIN_DFA_EDGE];return void 0===n&&(n=null),m.debug&&null!==n&&console.log("reuse state "+t.stateNumber+" edge to "+n.stateNumber),n},m.prototype.computeTargetState=function(t,e,n){var r=new c;return this.getReachableConfigSet(t,e.configs,r,n),0===r.items.length?(r.hasSemanticContext||this.addDFAEdge(e,n,s.ERROR),s.ERROR):this.addDFAEdge(e,n,null,r)},m.prototype.failOrAccept=function(t,e,n,o){if(null!==this.prevAccept.dfaState){var i=t.dfaState.lexerActionExecutor;return this.accept(e,i,this.startIndex,t.index,t.line,t.column),t.dfaState.prediction}if(o===r.EOF&&e.index===this.startIndex)return r.EOF;throw new y(this.recog,e,this.startIndex,n)},m.prototype.getReachableConfigSet=function(t,e,n,o){for(var s=i.INVALID_ALT_NUMBER,a=0;a<e.items.length;a++){var c=e.items[a],u=c.alt===s;if(!u||!c.passedThroughNonGreedyDecision){m.debug&&console.log("testing %s at %s\n",this.getTokenName(o),c.toString(this.recog,!0));for(var p=0;p<c.state.transitions.length;p++){var l=c.state.transitions[p],f=this.getReachableTarget(l,o);if(null!==f){var d=c.lexerActionExecutor;null!==d&&(d=d.fixOffsetBeforeMatch(t.index-this.startIndex));var y=o===r.EOF,g=new h({state:f,lexerActionExecutor:d},c);this.closure(t,g,n,u,!0,y)&&(s=c.alt)}}}}},m.prototype.accept=function(t,e,n,r,o,i){m.debug&&console.log("ACTION %s\n",e),t.seek(r),this.line=o,this.column=i,null!==e&&null!==this.recog&&e.execute(this.recog,t,n)},m.prototype.getReachableTarget=function(t,e){return t.matches(e,0,o.MAX_CHAR_VALUE)?t.target:null},m.prototype.computeStartState=function(t,e){for(var n=u.EMPTY,r=new c,o=0;o<e.transitions.length;o++){var i=e.transitions[o].target,s=new h({state:i,alt:o+1,context:n},null);this.closure(t,s,r,!1,!1,!1)}return r},m.prototype.closure=function(t,e,n,r,o,i){var s=null;if(m.debug&&console.log("closure("+e.toString(this.recog,!0)+")"),e.state instanceof l){if(m.debug&&(null!==this.recog?console.log("closure at %s rule stop %s\n",this.recog.ruleNames[e.state.ruleIndex],e):console.log("closure at rule stop %s\n",e)),null===e.context||e.context.hasEmptyPath()){if(null===e.context||e.context.isEmpty())return n.add(e),!0;n.add(new h({state:e.state,context:u.EMPTY},e)),r=!0}if(null!==e.context&&!e.context.isEmpty())for(var a=0;a<e.context.length;a++)if(e.context.getReturnState(a)!==u.EMPTY_RETURN_STATE){var c=e.context.getParent(a),p=this.atn.states[e.context.getReturnState(a)];s=new h({state:p,context:c},e),r=this.closure(t,s,n,r,o,i)}return r}e.state.epsilonOnlyTransitions||r&&e.passedThroughNonGreedyDecision||n.add(e);for(var f=0;f<e.state.transitions.length;f++){var d=e.state.transitions[f];null!==(s=this.getEpsilonTarget(t,e,d,n,o,i))&&(r=this.closure(t,s,n,r,o,i))}return r},m.prototype.getEpsilonTarget=function(t,e,n,i,s,a){var c=null;if(n.serializationType===f.RULE){var u=p.create(e.context,n.followState.stateNumber);c=new h({state:n.target,context:u},e)}else{if(n.serializationType===f.PRECEDENCE)throw"Precedence predicates are not supported in lexers.";if(n.serializationType===f.PREDICATE)m.debug&&console.log("EVAL rule "+n.ruleIndex+":"+n.predIndex),i.hasSemanticContext=!0,this.evaluatePredicate(t,n.ruleIndex,n.predIndex,s)&&(c=new h({state:n.target},e));else if(n.serializationType===f.ACTION)if(null===e.context||e.context.hasEmptyPath()){var l=d.append(e.lexerActionExecutor,this.atn.lexerActions[n.actionIndex]);c=new h({state:n.target,lexerActionExecutor:l},e)}else c=new h({state:n.target},e);else n.serializationType===f.EPSILON?c=new h({state:n.target},e):n.serializationType!==f.ATOM&&n.serializationType!==f.RANGE&&n.serializationType!==f.SET||a&&n.matches(r.EOF,0,o.MAX_CHAR_VALUE)&&(c=new h({state:n.target},e))}return c},m.prototype.evaluatePredicate=function(t,e,n,r){if(null===this.recog)return!0;if(!r)return this.recog.sempred(null,e,n);var o=this.column,i=this.line,s=t.index,a=t.mark();try{return this.consume(t),this.recog.sempred(null,e,n)}finally{this.column=o,this.line=i,t.seek(s),t.release(a)}},m.prototype.captureSimState=function(t,e,n){t.index=e.index,t.line=this.line,t.column=this.column,t.dfaState=n},m.prototype.addDFAEdge=function(t,e,n,r){if(void 0===n&&(n=null),void 0===r&&(r=null),null===n&&null!==r){var o=r.hasSemanticContext;if(r.hasSemanticContext=!1,n=this.addDFAState(r),o)return n}return e<m.MIN_DFA_EDGE||e>m.MAX_DFA_EDGE?n:(m.debug&&console.log("EDGE "+t+" -> "+n+" upon "+e),null===t.edges&&(t.edges=[]),t.edges[e-m.MIN_DFA_EDGE]=n,n)},m.prototype.addDFAState=function(t){for(var e=new a(null,t),n=null,r=0;r<t.items.length;r++){var o=t.items[r];if(o.state instanceof l){n=o;break}}null!==n&&(e.isAcceptState=!0,e.lexerActionExecutor=n.lexerActionExecutor,e.prediction=this.atn.ruleToTokenType[n.state.ruleIndex]);var i=this.decisionToDFA[this.mode],s=i.states.get(e);if(null!==s)return s;var c=e;return c.stateNumber=i.states.length,t.setReadonly(!0),c.configs=t,i.states.add(c),c},m.prototype.getDFA=function(t){return this.decisionToDFA[t]},m.prototype.getText=function(t){return t.getText(this.startIndex,t.index-1)},m.prototype.consume=function(t){t.LA(1)==="\n".charCodeAt(0)?(this.line+=1,this.column=0):this.column+=1,t.consume()},m.prototype.getTokenName=function(t){return-1===t?"EOF":"'"+String.fromCharCode(t)+"'"},e.LexerATNSimulator=m},function(t,e){function n(){}n.LEXER=0,n.PARSER=1,e.ATNType=n},function(t,e,n){var r=n(0).Set,o=n(0).BitSet,i=n(1).Token,s=n(16).ATNConfig,a=(n(2).Interval,n(2).IntervalSet),c=n(5).RuleStopState,u=n(7).RuleTransition,p=n(7).NotSetTransition,l=n(7).WildcardTransition,h=n(7).AbstractPredicateTransition,f=n(6),d=f.predictionContextFromRuleContext,y=f.PredictionContext,g=f.SingletonPredictionContext;function x(t){this.atn=t}x.HIT_PRED=i.INVALID_TYPE,x.prototype.getDecisionLookahead=function(t){if(null===t)return null;for(var e=t.transitions.length,n=[],i=0;i<e;i++){n[i]=new a;var s=new r;this._LOOK(t.transition(i).target,null,y.EMPTY,n[i],s,new o,!1,!1),(0===n[i].length||n[i].contains(x.HIT_PRED))&&(n[i]=null)}return n},x.prototype.LOOK=function(t,e,n){var i=new a,s=null!==(n=n||null)?d(t.atn,n):null;return this._LOOK(t,e,s,i,new r,new o,!0,!0),i},x.prototype._LOOK=function(t,e,n,r,o,a,f,d){var m=new s({state:t,alt:0,context:n},null);if(!o.contains(m)){if(o.add(m),t===e){if(null===n)return void r.addOne(i.EPSILON);if(n.isEmpty()&&d)return void r.addOne(i.EOF)}if(t instanceof c){if(null===n)return void r.addOne(i.EPSILON);if(n.isEmpty()&&d)return void r.addOne(i.EOF);if(n!==y.EMPTY){for(var v=0;v<n.length;v++){var E=this.atn.states[n.getReturnState(v)],T=a.contains(E.ruleIndex);try{a.remove(E.ruleIndex),this._LOOK(E,e,n.getParent(v),r,o,a,f,d)}finally{T&&a.add(E.ruleIndex)}}return}}for(var _=0;_<t.transitions.length;_++){var C=t.transitions[_];if(C.constructor===u){if(a.contains(C.target.ruleIndex))continue;var S=g.create(n,C.followState.stateNumber);try{a.add(C.target.ruleIndex),this._LOOK(C.target,e,S,r,o,a,f,d)}finally{a.remove(C.target.ruleIndex)}}else if(C instanceof h)f?this._LOOK(C.target,e,n,r,o,a,f,d):r.addOne(x.HIT_PRED);else if(C.isEpsilon)this._LOOK(C.target,e,n,r,o,a,f,d);else if(C.constructor===l)r.addRange(i.MIN_USER_TOKEN_TYPE,this.atn.maxTokenType);else{var R=C.label;null!==R&&(C instanceof p&&(R=R.complement(i.MIN_USER_TOKEN_TYPE,this.atn.maxTokenType)),r.addSet(R))}}}},e.LL1Analyzer=x},function(t,e,n){e.ATN=n(8).ATN,e.ATNDeserializer=n(30).ATNDeserializer,e.LexerATNSimulator=n(47).LexerATNSimulator,e.ParserATNSimulator=n(44).ParserATNSimulator,e.PredictionMode=n(25).PredictionMode},function(t,e,n){var r=n(17),o=n(33),i=n(32),s=n(20),a=function(){return s.sequenceParserListener.call(this),this};(a.prototype=Object.create(s.sequenceParserListener.prototype)).constructor=a;var c=new Set;a.prototype.enterParticipant=function(t){c.add(t.getText())},a.prototype.enterTo=function(t){c.add(t.getText())},a.prototype.enterSource=function(t){c.add(t.getText())},a.prototype.enterTarget=function(t){c.add(t.getText())},a.prototype.enterCreation=function(t){var e=t.assignment()&&t.assignment().assignee().getText(),n=t.constructor().getText(),r=e?e+":"+n:n;c.add(r)};const u=r.tree.ParseTreeWalker.DEFAULT;a.prototype.getAllTos=function(t){return function(e){return c=new Set,u.walk(t,e),Array.from(c)}};var p=new a,l=function(){return s.sequenceParserListener.call(this),this};(l.prototype=Object.create(s.sequenceParserListener.prototype)).constructor=l;var h=0,f=0;l.prototype.enterAlt=function(t){h++},l.prototype.enterLoop=function(t){h++},l.prototype.exitAlt=function(t){f=Math.max(f,h),h--},l.prototype.exitLoop=function(t){f=Math.max(f,h),h--},l.prototype.depth=function(t){return function(e){return h=0,f=0,e.children.map(function(e){u.walk(t,e)}),f}};var d=new l,y=function(){return s.sequenceParserListener.call(this),this};(y.prototype=Object.create(s.sequenceParserListener.prototype)).constructor=y;var g=!1;function x(){g=!0}y.prototype.enterMessage=x,y.prototype.enterCreation=x,y.prototype.hasSyncMessage=function(t){return function(e){return u.walk(t,e),g}};var m=new y;r.ParserRuleContext.prototype.getCode=function(){return this.parser.getTokenStream().getText(this.getSourceInterval())},r.ParserRuleContext.prototype.returnedValue=function(){return this.block().ret().value()},t.exports={RootContext:function(t){var e=new r.InputStream(t),n=new o.sequenceLexer(e),s=new r.CommonTokenStream(n),a=new i.sequenceParser(s);return a._syntaxErrors?null:a.prog()},Participants:p.getAllTos(p),Depth:d.depth(d),HasSyncMessage:m.hasSyncMessage(m)}}])},"2OiF":function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},"3KLX":function(t,e,n){"use strict";var r=n("78NW");n.n(r).a},"4R4u":function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},"6FMO":function(t,e,n){var r=n("0/R4"),o=n("EWmC"),i=n("K0xU")("species");t.exports=function(t){var e;return o(t)&&("function"!=typeof(e=t.constructor)||e!==Array&&!o(e.prototype)||(e=void 0),r(e)&&null===(e=e[i])&&(e=void 0)),void 0===e?Array:e}},"78NW":function(t,e,n){},"80y7":function(t,e,n){"use strict";var r=n("Zklo");n.n(r).a},"8Eia":function(t,e,n){},"8WSN":function(t,e,n){"use strict";var r=n("G7NO");n.n(r).a},Afnz:function(t,e,n){"use strict";var r=n("LQAc"),o=n("XKFU"),i=n("KroJ"),s=n("Mukb"),a=n("hPIQ"),c=n("QaDb"),u=n("fyDq"),p=n("OP3Y"),l=n("K0xU")("iterator"),h=!([].keys&&"next"in[].keys()),f=function(){return this};t.exports=function(t,e,n,d,y,g,x){c(n,e,d);var m,v,E,T=function(t){if(!h&&t in R)return R[t];switch(t){case"keys":case"values":return function(){return new n(this,t)}}return function(){return new n(this,t)}},_=e+" Iterator",C="values"==y,S=!1,R=t.prototype,A=R[l]||R["@@iterator"]||y&&R[y],O=A||T(y),L=y?C?T("entries"):O:void 0,N="Array"==e&&R.entries||A;if(N&&(E=p(N.call(new t)))!==Object.prototype&&E.next&&(u(E,_,!0),r||"function"==typeof E[l]||s(E,l,f)),C&&A&&"values"!==A.name&&(S=!0,O=function(){return A.call(this)}),r&&!x||!h&&!S&&R[l]||s(R,l,O),a[e]=O,a[_]=f,y)if(m={values:C?O:T("values"),keys:g?O:T("keys"),entries:L},x)for(v in m)v in R||i(R,v,m[v]);else o(o.P+o.F*(h||S),e,m);return m}},BUIJ:function(t,e,n){},Bm5G:function(t,e,n){},CkkT:function(t,e,n){var r=n("m0Pp"),o=n("Ymqv"),i=n("S/j/"),s=n("ne8i"),a=n("zRwo");t.exports=function(t,e){var n=1==t,c=2==t,u=3==t,p=4==t,l=6==t,h=5==t||l,f=e||a;return function(e,a,d){for(var y,g,x=i(e),m=o(x),v=r(a,d,3),E=s(m.length),T=0,_=n?f(e,E):c?f(e,0):void 0;E>T;T++)if((h||T in m)&&(g=v(y=m[T],T,x),t))if(n)_[T]=g;else if(g)switch(t){case 3:return!0;case 5:return y;case 6:return T;case 2:_.push(y)}else if(p)return!1;return l?-1:u||p?p:_}}},DTEb:function(t,e,n){},DVgA:function(t,e,n){var r=n("zhAb"),o=n("4R4u");t.exports=Object.keys||function(t){return r(t,o)}},EWmC:function(t,e,n){var r=n("LZWt");t.exports=Array.isArray||function(t){return"Array"==r(t)}},EemH:function(t,e,n){var r=n("UqcF"),o=n("RjD/"),i=n("aCFj"),s=n("apmT"),a=n("aagx"),c=n("xpql"),u=Object.getOwnPropertyDescriptor;e.f=n("nh4g")?u:function(t,e){if(t=i(t),e=s(e,!0),c)try{return u(t,e)}catch(t){}if(a(t,e))return o(!r.f.call(t,e),t[e])}},FJW5:function(t,e,n){var r=n("hswa"),o=n("y3w9"),i=n("DVgA");t.exports=n("nh4g")?Object.defineProperties:function(t,e){o(t);for(var n,s=i(e),a=s.length,c=0;a>c;)r.f(t,n=s[c++],e[n]);return t}},G7NO:function(t,e,n){},Gf3Y:function(t,e,n){"use strict";var r=n("QvVo");n.n(r).a},HrLf:function(t,e,n){if("undefined"!=typeof window){let t;(t=window.document.currentScript)&&(t=t.src.match(/(.+\/)[^/]+\.js$/))&&(n.p=t[1])}},I1Q4:function(t,e,n){"use strict";var r=n("wrKd");n.n(r).a},IG9S:function(t,e,n){"use strict";var r=n("QNdV");n.n(r).a},"IU+Z":function(t,e,n){"use strict";var r=n("Mukb"),o=n("KroJ"),i=n("eeVq"),s=n("vhPU"),a=n("K0xU");t.exports=function(t,e,n){var c=a(t),u=n(s,c,""[t]),p=u[0],l=u[1];i(function(){var e={};return e[c]=function(){return 7},7!=""[t](e)})&&(o(String.prototype,t,p),r(RegExp.prototype,c,2==e?function(t,e){return l.call(t,this,e)}:function(t){return l.call(t,this)}))}},Iw71:function(t,e,n){var r=n("0/R4"),o=n("dyZX").document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},JiEa:function(t,e){e.f=Object.getOwnPropertySymbols},K0xU:function(t,e,n){var r=n("VTer")("wks"),o=n("ylqs"),i=n("dyZX").Symbol,s="function"==typeof i;(t.exports=function(t){return r[t]||(r[t]=s&&i[t]||(s?i:o)("Symbol."+t))}).store=r},"KHd+":function(t,e,n){"use strict";function r(t,e,n,r,o,i,s,a){var c,u="function"==typeof t?t.options:t;if(e&&(u.render=e,u.staticRenderFns=n,u._compiled=!0),r&&(u.functional=!0),i&&(u._scopeId="data-v-"+i),s?(c=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(s)},u._ssrRegister=c):o&&(c=a?function(){o.call(this,this.$root.$options.shadowRoot)}:o),c)if(u.functional){u._injectStyles=c;var p=u.render;u.render=function(t,e){return c.call(e),p(t,e)}}else{var l=u.beforeCreate;u.beforeCreate=l?[].concat(l,c):[c]}return{exports:t,options:u}}n.d(e,"a",function(){return r})},KroJ:function(t,e,n){var r=n("dyZX"),o=n("Mukb"),i=n("aagx"),s=n("ylqs")("src"),a=Function.toString,c=(""+a).split("toString");n("g3g5").inspectSource=function(t){return a.call(t)},(t.exports=function(t,e,n,a){var u="function"==typeof n;u&&(i(n,"name")||o(n,"name",e)),t[e]!==n&&(u&&(i(n,s)||o(n,s,t[e]?""+t[e]:c.join(String(e)))),t===r?t[e]=n:a?t[e]?t[e]=n:o(t,e,n):(delete t[e],o(t,e,n)))})(Function.prototype,"toString",function(){return"function"==typeof this&&this[s]||a.call(this)})},Kuth:function(t,e,n){var r=n("y3w9"),o=n("FJW5"),i=n("4R4u"),s=n("YTvA")("IE_PROTO"),a=function(){},c=function(){var t,e=n("Iw71")("iframe"),r=i.length;for(e.style.display="none",n("+rLv").appendChild(e),e.src="javascript:",(t=e.contentWindow.document).open(),t.write("<script>document.F=Object<\/script>"),t.close(),c=t.F;r--;)delete c.prototype[i[r]];return c()};t.exports=Object.create||function(t,e){var n;return null!==t?(a.prototype=r(t),n=new a,a.prototype=null,n[s]=t):n=c(),void 0===e?n:o(n,e)}},L2JU:function(t,e,n){"use strict";n.d(e,"a",function(){return v});
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var r=function(t){if(Number(t.version.split(".")[0])>=2)t.mixin({beforeCreate:n});else{var e=t.prototype._init;t.prototype._init=function(t){void 0===t&&(t={}),t.init=t.init?[n].concat(t.init):n,e.call(this,t)}}function n(){var t=this.$options;t.store?this.$store="function"==typeof t.store?t.store():t.store:t.parent&&t.parent.$store&&(this.$store=t.parent.$store)}},o="undefined"!=typeof window&&window.__VUE_DEVTOOLS_GLOBAL_HOOK__;function i(t,e){Object.keys(t).forEach(function(n){return e(t[n],n)})}var s=function(t,e){this.runtime=e,this._children=Object.create(null),this._rawModule=t;var n=t.state;this.state=("function"==typeof n?n():n)||{}},a={namespaced:{configurable:!0}};a.namespaced.get=function(){return!!this._rawModule.namespaced},s.prototype.addChild=function(t,e){this._children[t]=e},s.prototype.removeChild=function(t){delete this._children[t]},s.prototype.getChild=function(t){return this._children[t]},s.prototype.update=function(t){this._rawModule.namespaced=t.namespaced,t.actions&&(this._rawModule.actions=t.actions),t.mutations&&(this._rawModule.mutations=t.mutations),t.getters&&(this._rawModule.getters=t.getters)},s.prototype.forEachChild=function(t){i(this._children,t)},s.prototype.forEachGetter=function(t){this._rawModule.getters&&i(this._rawModule.getters,t)},s.prototype.forEachAction=function(t){this._rawModule.actions&&i(this._rawModule.actions,t)},s.prototype.forEachMutation=function(t){this._rawModule.mutations&&i(this._rawModule.mutations,t)},Object.defineProperties(s.prototype,a);var c,u=function(t){this.register([],t,!1)};u.prototype.get=function(t){return t.reduce(function(t,e){return t.getChild(e)},this.root)},u.prototype.getNamespace=function(t){var e=this.root;return t.reduce(function(t,n){return t+((e=e.getChild(n)).namespaced?n+"/":"")},"")},u.prototype.update=function(t){!function t(e,n,r){if(n.update(r),r.modules)for(var o in r.modules){if(!n.getChild(o))return;t(e.concat(o),n.getChild(o),r.modules[o])}}([],this.root,t)},u.prototype.register=function(t,e,n){var r=this;void 0===n&&(n=!0);var o=new s(e,n);0===t.length?this.root=o:this.get(t.slice(0,-1)).addChild(t[t.length-1],o),e.modules&&i(e.modules,function(e,o){r.register(t.concat(o),e,n)})},u.prototype.unregister=function(t){var e=this.get(t.slice(0,-1)),n=t[t.length-1];e.getChild(n).runtime&&e.removeChild(n)};var p=function(t){var e=this;void 0===t&&(t={}),!c&&"undefined"!=typeof window&&window.Vue&&m(window.Vue);var n=t.plugins;void 0===n&&(n=[]);var r=t.strict;void 0===r&&(r=!1);var i=t.state;void 0===i&&(i={}),"function"==typeof i&&(i=i()||{}),this._committing=!1,this._actions=Object.create(null),this._actionSubscribers=[],this._mutations=Object.create(null),this._wrappedGetters=Object.create(null),this._modules=new u(t),this._modulesNamespaceMap=Object.create(null),this._subscribers=[],this._watcherVM=new c;var s=this,a=this.dispatch,p=this.commit;this.dispatch=function(t,e){return a.call(s,t,e)},this.commit=function(t,e,n){return p.call(s,t,e,n)},this.strict=r,y(this,i,[],this._modules.root),d(this,i),n.forEach(function(t){return t(e)}),c.config.devtools&&function(t){o&&(t._devtoolHook=o,o.emit("vuex:init",t),o.on("vuex:travel-to-state",function(e){t.replaceState(e)}),t.subscribe(function(t,e){o.emit("vuex:mutation",t,e)}))}(this)},l={state:{configurable:!0}};function h(t,e){return e.indexOf(t)<0&&e.push(t),function(){var n=e.indexOf(t);n>-1&&e.splice(n,1)}}function f(t,e){t._actions=Object.create(null),t._mutations=Object.create(null),t._wrappedGetters=Object.create(null),t._modulesNamespaceMap=Object.create(null);var n=t.state;y(t,n,[],t._modules.root,!0),d(t,n,e)}function d(t,e,n){var r=t._vm;t.getters={};var o={};i(t._wrappedGetters,function(e,n){o[n]=function(){return e(t)},Object.defineProperty(t.getters,n,{get:function(){return t._vm[n]},enumerable:!0})});var s=c.config.silent;c.config.silent=!0,t._vm=new c({data:{$$state:e},computed:o}),c.config.silent=s,t.strict&&function(t){t._vm.$watch(function(){return this._data.$$state},function(){},{deep:!0,sync:!0})}(t),r&&(n&&t._withCommit(function(){r._data.$$state=null}),c.nextTick(function(){return r.$destroy()}))}function y(t,e,n,r,o){var i=!n.length,s=t._modules.getNamespace(n);if(r.namespaced&&(t._modulesNamespaceMap[s]=r),!i&&!o){var a=g(e,n.slice(0,-1)),u=n[n.length-1];t._withCommit(function(){c.set(a,u,r.state)})}var p=r.context=function(t,e,n){var r=""===e,o={dispatch:r?t.dispatch:function(n,r,o){var i=x(n,r,o),s=i.payload,a=i.options,c=i.type;return a&&a.root||(c=e+c),t.dispatch(c,s)},commit:r?t.commit:function(n,r,o){var i=x(n,r,o),s=i.payload,a=i.options,c=i.type;a&&a.root||(c=e+c),t.commit(c,s,a)}};return Object.defineProperties(o,{getters:{get:r?function(){return t.getters}:function(){return function(t,e){var n={},r=e.length;return Object.keys(t.getters).forEach(function(o){if(o.slice(0,r)===e){var i=o.slice(r);Object.defineProperty(n,i,{get:function(){return t.getters[o]},enumerable:!0})}}),n}(t,e)}},state:{get:function(){return g(t.state,n)}}}),o}(t,s,n);r.forEachMutation(function(e,n){!function(t,e,n,r){(t._mutations[e]||(t._mutations[e]=[])).push(function(e){n.call(t,r.state,e)})}(t,s+n,e,p)}),r.forEachAction(function(e,n){var r=e.root?n:s+n,o=e.handler||e;!function(t,e,n,r){(t._actions[e]||(t._actions[e]=[])).push(function(e,o){var i,s=n.call(t,{dispatch:r.dispatch,commit:r.commit,getters:r.getters,state:r.state,rootGetters:t.getters,rootState:t.state},e,o);return(i=s)&&"function"==typeof i.then||(s=Promise.resolve(s)),t._devtoolHook?s.catch(function(e){throw t._devtoolHook.emit("vuex:error",e),e}):s})}(t,r,o,p)}),r.forEachGetter(function(e,n){!function(t,e,n,r){t._wrappedGetters[e]||(t._wrappedGetters[e]=function(t){return n(r.state,r.getters,t.state,t.getters)})}(t,s+n,e,p)}),r.forEachChild(function(r,i){y(t,e,n.concat(i),r,o)})}function g(t,e){return e.length?e.reduce(function(t,e){return t[e]},t):t}function x(t,e,n){var r;return null!==(r=t)&&"object"==typeof r&&t.type&&(n=e,e=t,t=t.type),{type:t,payload:e,options:n}}function m(t){c&&t===c||r(c=t)}l.state.get=function(){return this._vm._data.$$state},l.state.set=function(t){},p.prototype.commit=function(t,e,n){var r=this,o=x(t,e,n),i=o.type,s=o.payload,a=(o.options,{type:i,payload:s}),c=this._mutations[i];c&&(this._withCommit(function(){c.forEach(function(t){t(s)})}),this._subscribers.forEach(function(t){return t(a,r.state)}))},p.prototype.dispatch=function(t,e){var n=this,r=x(t,e),o=r.type,i=r.payload,s={type:o,payload:i},a=this._actions[o];if(a)return this._actionSubscribers.forEach(function(t){return t(s,n.state)}),a.length>1?Promise.all(a.map(function(t){return t(i)})):a[0](i)},p.prototype.subscribe=function(t){return h(t,this._subscribers)},p.prototype.subscribeAction=function(t){return h(t,this._actionSubscribers)},p.prototype.watch=function(t,e,n){var r=this;return this._watcherVM.$watch(function(){return t(r.state,r.getters)},e,n)},p.prototype.replaceState=function(t){var e=this;this._withCommit(function(){e._vm._data.$$state=t})},p.prototype.registerModule=function(t,e,n){void 0===n&&(n={}),"string"==typeof t&&(t=[t]),this._modules.register(t,e),y(this,this.state,t,this._modules.get(t),n.preserveState),d(this,this.state)},p.prototype.unregisterModule=function(t){var e=this;"string"==typeof t&&(t=[t]),this._modules.unregister(t),this._withCommit(function(){var n=g(e.state,t.slice(0,-1));c.delete(n,t[t.length-1])}),f(this)},p.prototype.hotUpdate=function(t){this._modules.update(t),f(this,!0)},p.prototype._withCommit=function(t){var e=this._committing;this._committing=!0,t(),this._committing=e},Object.defineProperties(p.prototype,l),T(function(t,e){var n={};return E(e).forEach(function(e){var r=e.key,o=e.val;n[r]=function(){var e=this.$store.state,n=this.$store.getters;if(t){var r=_(this.$store,"mapState",t);if(!r)return;e=r.context.state,n=r.context.getters}return"function"==typeof o?o.call(this,e,n):e[o]},n[r].vuex=!0}),n}),T(function(t,e){var n={};return E(e).forEach(function(e){var r=e.key,o=e.val;n[r]=function(){for(var e=[],n=arguments.length;n--;)e[n]=arguments[n];var r=this.$store.commit;if(t){var i=_(this.$store,"mapMutations",t);if(!i)return;r=i.context.commit}return"function"==typeof o?o.apply(this,[r].concat(e)):r.apply(this.$store,[o].concat(e))}}),n});var v=T(function(t,e){var n={};return E(e).forEach(function(e){var r=e.key,o=e.val;o=t+o,n[r]=function(){if(!t||_(this.$store,"mapGetters",t))return this.$store.getters[o]},n[r].vuex=!0}),n});function E(t){return Array.isArray(t)?t.map(function(t){return{key:t,val:t}}):Object.keys(t).map(function(e){return{key:e,val:t[e]}})}function T(t){return function(e,n){return"string"!=typeof e?(n=e,e=""):"/"!==e.charAt(e.length-1)&&(e+="/"),t(e,n)}}function _(t,e,n){return t._modulesNamespaceMap[n]}T(function(t,e){var n={};return E(e).forEach(function(e){var r=e.key,o=e.val;n[r]=function(){for(var e=[],n=arguments.length;n--;)e[n]=arguments[n];var r=this.$store.dispatch;if(t){var i=_(this.$store,"mapActions",t);if(!i)return;r=i.context.dispatch}return"function"==typeof o?o.apply(this,[r].concat(e)):r.apply(this.$store,[o].concat(e))}}),n})},LQAc:function(t,e){t.exports=!1},LZWt:function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},Lv7l:function(t,e,n){"use strict";n.r(e),n("rGqo"),n("yt8O"),n("RW0V"),n("dRSK");var r=n("k5VM"),o=n("L2JU"),i=n("TqP/"),s={name:"point",props:["fill","rtl"]},a=(n("tauN"),n("KHd+")),c={name:"message",props:["content","rtl","type"],computed:{borderStyle:function(){switch(this.type){case"sync":case"async":case"creation":return"solid";case"return":return"dashed"}}},components:{Point:Object(a.a)(s,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"point",class:{fill:this.fill,"right-to-left":this.rtl}},[e("svg",{staticClass:"arrow",attrs:{height:"20"}},[e("polyline",{staticClass:"right",attrs:{points:"0,7 10,13 0,19"}}),e("polyline",{staticClass:"left",attrs:{points:"10,7 0,13 10,19"}})])])},[],!1,null,"102217b1",null).exports}},u=(n("3KLX"),Object(a.a)(c,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"message",style:{"border-bottom-style":this.borderStyle}},[e("div",{staticClass:"name"},[this._v(this._s(this.content))]),e("point",{attrs:{fill:"true",rtl:this.rtl}})],1)},[],!1,null,"50fe6874",null).exports),p={name:"occurrence",props:["context","participant","offset"],beforeCreate:function(){this.$options.components.Block=n("Lv7l").default}},l=(n("ge/6"),Object(a.a)(p,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"occurrence"},[this.context.block()?e("block",{attrs:{context:this.context.block(),from:this.participant,offset:this.offset}}):this._e()],1)},[],!1,null,"a0d3b81a",null).exports),h={name:"creation",props:["from","context","comment","offset"],computed:Object(r.a)({},Object(o.a)(["distance","centerOf","rightOf","leftOf","widthOf"]),{creation:function(){return this.context.creation()},interactionWidth:function(){var t=this.$store.getters.distance(this.to,this.from),e=this.offset||0;return Math.abs(t)-e},invocationWidth:function(){var t=this.offset||0;return this.rightToLeft?this.centerOf(this.from)-this.rightOf(this.to)-t+8:this.leftOf(this.to)-this.centerOf(this.from)-t-8},rightToLeft:function(){return this.distance(this.to,this.from)<0},signature:function(){var t=this.creation.parameters();return"«"+(t&&t.parameter()&&t.parameter().length>0?t.getCode():"create")+"»"},assignee:function(){function t(t){return t&&t.getCode()||""}var e=this.creation.assignment();if(!e)return"";var n=t(e.assignee()),r=t(e.type());return n+(r?":"+r:"")},to:function(){var t=this.creation.assignment()&&this.creation.assignment().assignee().getText(),e=this.creation.constructor().getText();return t?t+":"+e:e}}),components:{Comment:i.default,Occurrence:l,Message:u}},f=(n("80y7"),Object(a.a)(h,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"interaction creation sync",class:{"right-to-left":t.rightToLeft},style:{width:Math.abs(t.interactionWidth)+"px"},attrs:{signature:t.signature}},[t.comment?n("comment",{attrs:{comment:t.comment}}):t._e(),n("message",{staticClass:"invocation",style:{width:t.invocationWidth+"px"},attrs:{content:t.signature,rtl:t.rightToLeft,type:"creation"}}),n("div",{staticClass:"participant place-holder"},[n("label",{staticClass:"name"},[t._v(t._s(t.to))])]),n("occurrence",{attrs:{context:t.creation,participant:t.to}}),t.assignee?n("message",{staticClass:"return",attrs:{content:t.assignee,rtl:!t.rightToLeft,type:"return"}}):t._e()],1)},[],!1,null,"0c486a58",null).exports),d={name:"interaction",props:["from","context","comment","offset"],computed:{message:function(){return this.context.message()},interactionWidth:function(){var t=this.$store.getters.distance(this.to,this.from),e=this.offset||0;return t<0?Math.abs(t)+e:Math.abs(t)-e},occurrenceLeft:function(){return this.rightToLeft?-14:this.interactionWidth-14},rightToLeft:function(){return this.$store.getters.distance(this.to,this.from)<0},signature:function(){return this.message.func().signature().getCode()},assignee:function(){function t(t){return t&&t.getCode()||""}var e=this.message.assignment();if(!e)return"";var n=t(e.assignee()),r=t(e.type());return n+(r?":"+r:"")},to:function(){return this.message.func().to().getCode()}},components:{Message:u,Comment:i.default,Occurrence:l}},y=(n("Gf3Y"),Object(a.a)(d,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"interaction sync",class:{"right-to-left":t.rightToLeft},style:{width:t.interactionWidth+"px"},attrs:{signature:t.signature}},[t.comment?n("comment",{attrs:{comment:t.comment}}):t._e(),n("message",{attrs:{content:t.signature,rtl:t.rightToLeft,type:"sync"}}),n("occurrence",{attrs:{context:t.message,participant:t.to,offset:0}}),t.assignee?n("message",{staticClass:"return",attrs:{content:t.assignee,rtl:!t.rightToLeft,type:"return"}}):t._e()],1)},[],!1,null,"44cbabc4",null).exports),g=(n("pIFo"),{name:"interaction-async",props:["from","context","comment"],computed:{asyncMessage:function(){return this.context.asyncMessage()},interactionWidth:function(){return this.$store.getters.distance(this.target,this.source)},left:function(){return this.rightToLeft?this.$store.getters.distance(this.target,this.from):this.$store.getters.distance(this.source,this.from)},rightToLeft:function(){return this.$store.getters.distance(this.target,this.source)<0},signature:function(){return this.asyncMessage.content().getCode().replace(/^:+/g,"")},source:function(){return this.asyncMessage.source().getCode()},target:function(){return this.asyncMessage.target().getCode()}},components:{Comment:i.default,Message:u}}),x=(n("8WSN"),Object(a.a)(g,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"interaction async",class:{"right-to-left":t.rightToLeft},style:{width:Math.abs(t.interactionWidth)+"px",left:t.left+"px"},attrs:{signature:t.signature}},[t.comment?n("comment",{attrs:{comment:t.comment}}):t._e(),n("message",{attrs:{content:t.signature,rtl:t.rightToLeft,type:"async"}}),n("div",{staticClass:"invisible-occurrence"})],1)},[],!1,null,"99ae55c6",null).exports),m={name:"self-invocation",props:["signature","assignee"]},v=(n("0jhs"),Object(a.a)(m,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"message self"},[n("svg",{staticClass:"arrow",attrs:{width:"44",height:"34"}},[n("polyline",{attrs:{points:"0,2 28,2 28,25 14,25"}}),n("polyline",{staticClass:"head",attrs:{points:"18,19 8,25 18,31"}})]),n("div",{staticClass:"name"},[t.assignee?n("span",[t._v(t._s(t.assignee)+" = ")]):t._e(),t._v(" "+t._s(t.signature))])])},[],!1,null,"02eaff1a",null).exports),E={name:"self-interaction",props:["from","context","comment","offset"],computed:{message:function(){return this.context.message()},assignee:function(){function t(t){return t&&t.getCode()||""}var e=this.message.assignment();if(!e)return"";var n=t(e.assignee()),r=t(e.type());return n+(r?":"+r:"")},signature:function(){return this.message.func().signature().getCode()}},components:{Comment:i.default,SelfInvocation:v,Occurrence:l}},T=(n("dEcG"),Object(a.a)(E,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"interaction self sync",attrs:{signature:t.signature}},[t.comment?n("comment",{attrs:{comment:t.comment}}):t._e(),n("self-invocation",{attrs:{signature:t.signature,assignee:t.assignee}}),n("occurrence",{attrs:{context:t.message,participant:t.from,offset:(t.offset||0)+6}})],1)},[],!1,null,"7016ab63",null).exports),_={name:"self-invocation-async",props:["signature","assignee"]},C=(n("IG9S"),Object(a.a)(_,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"message self"},[n("svg",{staticClass:"arrow",attrs:{width:"44",height:"34"}},[n("polyline",{attrs:{points:"0,2 28,2 28,25 1,25"}}),n("polyline",{staticClass:"head",attrs:{points:"11,19 1,25 11,31"}})]),n("div",{staticClass:"name"},[t.assignee?n("span",[t._v(t._s(t.assignee)+" = ")]):t._e(),t._v(" "+t._s(t.signature))])])},[],!1,null,"448d144f",null).exports),S={name:"self-interaction-async",props:["from","context","comment"],computed:{asyncMessage:function(){return this.context.asyncMessage()},left:function(){return this.$store.getters.distance(this.to,this.from)},signature:function(){return this.asyncMessage.content().getCode().replace(/^:+/g,"")},to:function(){return this.asyncMessage.target().getCode()}},components:{Comment:i.default,SelfInvocationAsync:C,Occurrence:l}},R=(n("tHOU"),Object(a.a)(S,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"interaction self async",style:{left:this.left+"px"},attrs:{signature:this.signature}},[this.comment?e("comment",{attrs:{comment:this.comment}}):this._e(),e("self-invocation-async",{attrs:{signature:this.signature}})],1)},[],!1,null,"0442f319",null).exports);function A(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var O=n("1X7h"),L=n.n(O),N={computed:{boundary:function(){var t=this,e=[this.from].concat(A(L.a.Participants(this.context))).map(function(e){return t.$store.getters.leftOf(e)}),n=[this.from].concat(A(L.a.Participants(this.context))).map(function(e){return t.$store.getters.rightOf(e)}),r=Math.max(20,Math.min.apply(Math,A(e))),o=Math.max.apply(Math,A(n));return{min:r,max:o,width:Math.max(o-r,100)}},depth:function(){return L.a.Depth(this.context)},centerOfFrom:function(){return this.$store.getters.centerOf(this.from)},offsetX:function(){var t=10*this.depth;return this.centerOfFrom-this.boundary.min+t},fragmentStyle:function(){return{transform:"translateX("+-1*this.offsetX+"px)",width:this.boundary.width+20*this.depth+50+"px"}},blockStyle:function(){return{marginLeft:this.offsetX-1+"px"}}}},b={name:"fragment-alt",props:["from","context","comment","offset"],mixins:[N],computed:{alt:function(){return this.context.alt()},condition:function(){return this.alt.ifBlock().parExpr().expr().getCode()}},beforeCreate:function(){this.$options.components.Block=n("Lv7l").default,this.$options.components.Comment=n("TqP/").default}},I=(n("PMbx"),{name:"fragment-loop",props:["from","context","comment","offset"],mixins:[N],computed:{loop:function(){return this.context.loop()},condition:function(){return this.loop.parExpr().expr().getCode()}},beforeCreate:function(){this.$options.components.Block=n("Lv7l").default,this.$options.components.Comment=n("TqP/").default}}),k={name:"statement",props:["from","context","offset"],computed:{comment:function(){return this.context.comment()?this.context.comment().COMMENT().join("<br/>"):""},subStatement:function(){var t=this,e={loop:"FragmentLoop",alt:"FragmentAlt",creation:"Creation",message:function(){return t.context.message().func().to()&&t.context.message().func().to().getCode()!==t.from?"Interaction":"SelfInteraction"},asyncMessage:function(){return t.context.asyncMessage().source().getCode()===t.context.asyncMessage().target().getCode()?"SelfInteractionAsync":"InteractionAsync"}},n=e[Object.keys(e).find(function(e){return null!==t.context[e]()})];return"function"==typeof n?n():n}},components:{Creation:f,Interaction:y,InteractionAsync:x,SelfInteraction:T,SelfInteractionAsync:R,FragmentAlt:Object(a.a)(b,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"fragment alt",style:t.fragmentStyle},[t.comment?n("comment",{attrs:{comment:t.comment}}):t._e(),n("div",{staticClass:"header"},[t._m(0),n("label",{staticClass:"condition"},[t._v("["+t._s(t.condition)+"]")])]),n("block",{style:t.blockStyle,attrs:{context:t.alt.ifBlock().braceBlock().block(),from:t.from,offset:t.offset}}),t._l(t.alt.elseIfBlock(),function(e,r){return[n("div",{key:r,staticClass:"divider"}),n("div",{key:r+100,staticClass:"name"},[t._v("else if ["+t._s(e.parExpr().expr().getCode())+"]")]),n("block",{key:r+1e3,style:t.blockStyle,attrs:{context:e.braceBlock().block(),from:t.from,offset:t.offset}})]}),t.alt.elseBlock()?[n("div",{staticClass:"divider"}),n("div",{staticClass:"name"},[t._v("else")]),n("block",{style:t.blockStyle,attrs:{context:t.alt.elseBlock().braceBlock().block(),from:t.from,offset:t.offset}})]:t._e()],2)},[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"name"},[e("label",[this._v("Alt")])])}],!1,null,"55a4f15e",null).exports,FragmentLoop:Object(a.a)(I,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"fragment loop",style:t.fragmentStyle},[t.comment?n("comment",{attrs:{comment:t.comment}}):t._e(),n("div",{staticClass:"header"},[t._m(0),n("label",{staticClass:"condition"},[t._v("["+t._s(t.condition)+"]")])]),n("block",{style:t.blockStyle,attrs:{context:t.loop.braceBlock().block(),from:t.from,offset:t.offset}})],1)},[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"name"},[e("label",[this._v("Loop")])])}],!1,null,null,null).exports}},P=(n("MO1Y"),{name:"block",props:["from","context","offset"],computed:{statements:function(){return this.context&&this.context.stat()}},components:{Statement:Object(a.a)(k,function(){var t=this.$createElement;return(this._self._c||t)(this.subStatement,{tag:"component",attrs:{context:this.context,from:this.from,comment:this.comment,offset:this.offset}})},[],!1,null,null,null).exports}}),w=Object(a.a)(P,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",t._l(t.statements,function(e,r){return n("div",{key:r},[n("statement",{attrs:{context:e,from:t.from,offset:t.offset}})],1)}))},[],!1,null,null,null);e.default=w.exports},M0kH:function(t,e,n){"use strict";var r=n("fgLv");n.n(r).a},MO1Y:function(t,e,n){"use strict";var r=n("oIxk");n.n(r).a},Mukb:function(t,e,n){var r=n("hswa"),o=n("RjD/");t.exports=n("nh4g")?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},N8g3:function(t,e,n){e.f=n("K0xU")},OP3Y:function(t,e,n){var r=n("aagx"),o=n("S/j/"),i=n("YTvA")("IE_PROTO"),s=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),r(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?s:null}},OnI7:function(t,e,n){var r=n("dyZX"),o=n("g3g5"),i=n("LQAc"),s=n("N8g3"),a=n("hswa").f;t.exports=function(t){var e=o.Symbol||(o.Symbol=i?{}:r.Symbol||{});"_"==t.charAt(0)||t in e||a(e,t,{value:s.f(t)})}},PMbx:function(t,e,n){"use strict";var r=n("WwMs");n.n(r).a},Ptq6:function(t,e,n){"use strict";var r=n("swrk");n.n(r).a},QNdV:function(t,e,n){},QRQd:function(t,e,n){"use strict";var r=n("ZTe6");n.n(r).a},QaDb:function(t,e,n){"use strict";var r=n("Kuth"),o=n("RjD/"),i=n("fyDq"),s={};n("Mukb")(s,n("K0xU")("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=r(s,{next:o(1,n)}),i(t,e+" Iterator")}},QvVo:function(t,e,n){},RW0V:function(t,e,n){var r=n("S/j/"),o=n("DVgA");n("Xtr8")("keys",function(){return function(t){return o(r(t))}})},RYi7:function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},"RjD/":function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},"S/j/":function(t,e,n){var r=n("vhPU");t.exports=function(t){return Object(r(t))}},"TqP/":function(t,e,n){"use strict";n.r(e);var r={name:"comment",props:["comment"]},o=n("KHd+"),i=Object(o.a)(r,function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"comments",domProps:{innerHTML:this._s(this.comment)}})},[],!1,null,null,null);e.default=i.exports},"U3/g":function(t,e,n){"use strict";var r=n("tWPO");n.n(r).a},UqcF:function(t,e){e.f={}.propertyIsEnumerable},VTer:function(t,e,n){var r=n("g3g5"),o=n("dyZX"),i=o["__core-js_shared__"]||(o["__core-js_shared__"]={});(t.exports=function(t,e){return i[t]||(i[t]=void 0!==e?e:{})})("versions",[]).push({version:r.version,mode:n("LQAc")?"pure":"global",copyright:"© 2018 Denis Pushkarev (zloirock.ru)"})},WwMs:function(t,e,n){},XKFU:function(t,e,n){var r=n("dyZX"),o=n("g3g5"),i=n("Mukb"),s=n("KroJ"),a=n("m0Pp"),c=function(t,e,n){var u,p,l,h,f=t&c.F,d=t&c.G,y=t&c.S,g=t&c.P,x=t&c.B,m=d?r:y?r[e]||(r[e]={}):(r[e]||{}).prototype,v=d?o:o[e]||(o[e]={}),E=v.prototype||(v.prototype={});for(u in d&&(n=e),n)l=((p=!f&&m&&void 0!==m[u])?m:n)[u],h=x&&p?a(l,r):g&&"function"==typeof l?a(Function.call,l):l,m&&s(m,u,l,t&c.U),v[u]!=l&&i(v,u,h),g&&E[u]!=l&&(E[u]=l)};r.core=o,c.F=1,c.G=2,c.S=4,c.P=8,c.B=16,c.W=32,c.U=64,c.R=128,t.exports=c},Xtr8:function(t,e,n){var r=n("XKFU"),o=n("g3g5"),i=n("eeVq");t.exports=function(t,e){var n=(o.Object||{})[t]||Object[t],s={};s[t]=e(n),r(r.S+r.F*i(function(){n(1)}),"Object",s)}},YTvA:function(t,e,n){var r=n("VTer")("keys"),o=n("ylqs");t.exports=function(t){return r[t]||(r[t]=o(t))}},Ymqv:function(t,e,n){var r=n("LZWt");t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},Z6vF:function(t,e,n){var r=n("ylqs")("meta"),o=n("0/R4"),i=n("aagx"),s=n("hswa").f,a=0,c=Object.isExtensible||function(){return!0},u=!n("eeVq")(function(){return c(Object.preventExtensions({}))}),p=function(t){s(t,r,{value:{i:"O"+ ++a,w:{}}})},l=t.exports={KEY:r,NEED:!1,fastKey:function(t,e){if(!o(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!i(t,r)){if(!c(t))return"F";if(!e)return"E";p(t)}return t[r].i},getWeak:function(t,e){if(!i(t,r)){if(!c(t))return!0;if(!e)return!1;p(t)}return t[r].w},onFreeze:function(t){return u&&l.NEED&&c(t)&&!i(t,r)&&p(t),t}}},ZTe6:function(t,e,n){},Zklo:function(t,e,n){},aCFj:function(t,e,n){var r=n("Ymqv"),o=n("vhPU");t.exports=function(t){return r(o(t))}},aagx:function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},apmT:function(t,e,n){var r=n("0/R4");t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},"d/Gc":function(t,e,n){var r=n("RYi7"),o=Math.max,i=Math.min;t.exports=function(t,e){return(t=r(t))<0?o(t+e,0):i(t,e)}},dEcG:function(t,e,n){"use strict";var r=n("Bm5G");n.n(r).a},dRSK:function(t,e,n){"use strict";var r=n("XKFU"),o=n("CkkT")(5),i=!0;"find"in[]&&Array(1).find(function(){i=!1}),r(r.P+r.F*i,"Array",{find:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),n("nGyu")("find")},dyZX:function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},e7yV:function(t,e,n){var r=n("aCFj"),o=n("kJMx").f,i={}.toString,s="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];t.exports.f=function(t){return s&&"[object Window]"==i.call(t)?function(t){try{return o(t)}catch(t){return s.slice()}}(t):o(r(t))}},eeVq:function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},"f3/d":function(t,e,n){var r=n("hswa").f,o=Function.prototype,i=/^\s*function ([^ (]*)/;"name"in o||n("nh4g")&&r(o,"name",{configurable:!0,get:function(){try{return(""+this).match(i)[1]}catch(t){return""}}})},fgLv:function(t,e,n){},fyDq:function(t,e,n){var r=n("hswa").f,o=n("aagx"),i=n("K0xU")("toStringTag");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,i)&&r(t,i,{configurable:!0,value:e})}},g3g5:function(t,e){var n=t.exports={version:"2.5.7"};"number"==typeof __e&&(__e=n)},"ge/6":function(t,e,n){"use strict";var r=n("8Eia");n.n(r).a},hPIQ:function(t,e){t.exports={}},hswa:function(t,e,n){var r=n("y3w9"),o=n("xpql"),i=n("apmT"),s=Object.defineProperty;e.f=n("nh4g")?Object.defineProperty:function(t,e,n){if(r(t),e=i(e,!0),r(n),o)try{return s(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},ioFf:function(t,e,n){"use strict";var r=n("dyZX"),o=n("aagx"),i=n("nh4g"),s=n("XKFU"),a=n("KroJ"),c=n("Z6vF").KEY,u=n("eeVq"),p=n("VTer"),l=n("fyDq"),h=n("ylqs"),f=n("K0xU"),d=n("N8g3"),y=n("OnI7"),g=n("1MBn"),x=n("EWmC"),m=n("y3w9"),v=n("0/R4"),E=n("aCFj"),T=n("apmT"),_=n("RjD/"),C=n("Kuth"),S=n("e7yV"),R=n("EemH"),A=n("hswa"),O=n("DVgA"),L=R.f,N=A.f,b=S.f,I=r.Symbol,k=r.JSON,P=k&&k.stringify,w=f("_hidden"),D=f("toPrimitive"),M={}.propertyIsEnumerable,F=p("symbol-registry"),U=p("symbols"),j=p("op-symbols"),B=Object.prototype,H="function"==typeof I,V=r.QObject,$=!V||!V.prototype||!V.prototype.findChild,q=i&&u(function(){return 7!=C(N({},"a",{get:function(){return N(this,"a",{value:7}).a}})).a})?function(t,e,n){var r=L(B,e);r&&delete B[e],N(t,e,n),r&&t!==B&&N(B,e,r)}:N,W=function(t){var e=U[t]=C(I.prototype);return e._k=t,e},G=H&&"symbol"==typeof I.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof I},z=function(t,e,n){return t===B&&z(j,e,n),m(t),e=T(e,!0),m(n),o(U,e)?(n.enumerable?(o(t,w)&&t[w][e]&&(t[w][e]=!1),n=C(n,{enumerable:_(0,!1)})):(o(t,w)||N(t,w,_(1,{})),t[w][e]=!0),q(t,e,n)):N(t,e,n)},K=function(t,e){m(t);for(var n,r=g(e=E(e)),o=0,i=r.length;i>o;)z(t,n=r[o++],e[n]);return t},Y=function(t){var e=M.call(this,t=T(t,!0));return!(this===B&&o(U,t)&&!o(j,t))&&(!(e||!o(this,t)||!o(U,t)||o(this,w)&&this[w][t])||e)},Q=function(t,e){if(t=E(t),e=T(e,!0),t!==B||!o(U,e)||o(j,e)){var n=L(t,e);return!n||!o(U,e)||o(t,w)&&t[w][e]||(n.enumerable=!0),n}},X=function(t){for(var e,n=b(E(t)),r=[],i=0;n.length>i;)o(U,e=n[i++])||e==w||e==c||r.push(e);return r},J=function(t){for(var e,n=t===B,r=b(n?j:E(t)),i=[],s=0;r.length>s;)!o(U,e=r[s++])||n&&!o(B,e)||i.push(U[e]);return i};H||(a((I=function(){if(this instanceof I)throw TypeError("Symbol is not a constructor!");var t=h(arguments.length>0?arguments[0]:void 0),e=function(n){this===B&&e.call(j,n),o(this,w)&&o(this[w],t)&&(this[w][t]=!1),q(this,t,_(1,n))};return i&&$&&q(B,t,{configurable:!0,set:e}),W(t)}).prototype,"toString",function(){return this._k}),R.f=Q,A.f=z,n("kJMx").f=S.f=X,n("UqcF").f=Y,n("JiEa").f=J,i&&!n("LQAc")&&a(B,"propertyIsEnumerable",Y,!0),d.f=function(t){return W(f(t))}),s(s.G+s.W+s.F*!H,{Symbol:I});for(var Z="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),tt=0;Z.length>tt;)f(Z[tt++]);for(var et=O(f.store),nt=0;et.length>nt;)y(et[nt++]);s(s.S+s.F*!H,"Symbol",{for:function(t){return o(F,t+="")?F[t]:F[t]=I(t)},keyFor:function(t){if(!G(t))throw TypeError(t+" is not a symbol!");for(var e in F)if(F[e]===t)return e},useSetter:function(){$=!0},useSimple:function(){$=!1}}),s(s.S+s.F*!H,"Object",{create:function(t,e){return void 0===e?C(t):K(C(t),e)},defineProperty:z,defineProperties:K,getOwnPropertyDescriptor:Q,getOwnPropertyNames:X,getOwnPropertySymbols:J}),k&&s(s.S+s.F*(!H||u(function(){var t=I();return"[null]"!=P([t])||"{}"!=P({a:t})||"{}"!=P(Object(t))})),"JSON",{stringify:function(t){for(var e,n,r=[t],o=1;arguments.length>o;)r.push(arguments[o++]);if(n=e=r[1],(v(e)||void 0!==t)&&!G(t))return x(e)||(e=function(t,e){if("function"==typeof n&&(e=n.call(this,t,e)),!G(e))return e}),r[1]=e,P.apply(k,r)}}),I.prototype[D]||n("Mukb")(I.prototype,D,I.prototype.valueOf),l(I,"Symbol"),l(Math,"Math",!0),l(r.JSON,"JSON",!0)},k5VM:function(t,e,n){"use strict";function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function o(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},o=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),o.forEach(function(e){r(t,e,n[e])})}return t}n.d(e,"a",function(){return o})},kJMx:function(t,e,n){var r=n("zhAb"),o=n("4R4u").concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,o)}},m0Pp:function(t,e,n){var r=n("2OiF");t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},nGyu:function(t,e,n){var r=n("K0xU")("unscopables"),o=Array.prototype;void 0==o[r]&&n("Mukb")(o,r,{}),t.exports=function(t){o[r][t]=!0}},ne8i:function(t,e,n){var r=n("RYi7"),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},nh4g:function(t,e,n){t.exports=!n("eeVq")(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},oIxk:function(t,e,n){},odjl:function(t,e,n){},pIFo:function(t,e,n){n("IU+Z")("replace",2,function(t,e,n){return[function(r,o){"use strict";var i=t(this),s=void 0==r?void 0:r[e];return void 0!==s?s.call(r,i,o):n.call(String(i),r,o)},n]})},rE2o:function(t,e,n){n("OnI7")("asyncIterator")},rGqo:function(t,e,n){for(var r=n("yt8O"),o=n("DVgA"),i=n("KroJ"),s=n("dyZX"),a=n("Mukb"),c=n("hPIQ"),u=n("K0xU"),p=u("iterator"),l=u("toStringTag"),h=c.Array,f={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},d=o(f),y=0;y<d.length;y++){var g,x=d[y],m=f[x],v=s[x],E=v&&v.prototype;if(E&&(E[p]||a(E,p,h),E[l]||a(E,l,x),c[x]=h,m))for(g in r)E[g]||i(E,g,r[g],!0)}},sFTC:function(t,e,n){t.exports=function(){"use strict";function t(e,n){if(void 0===n&&(n=[]),null===e||"object"!=typeof e)return e;var r,o=(r=function(t){return t.original===e},n.filter(r)[0]);if(o)return o.copy;var i=Array.isArray(e)?[]:{};return n.push({original:e,copy:i}),Object.keys(e).forEach(function(r){i[r]=t(e[r],n)}),i}function e(t,e){return n="0",r=e-t.toString().length,new Array(r+1).join(n)+t;var n,r}return function(n){void 0===n&&(n={});var r=n.collapsed;void 0===r&&(r=!0);var o=n.filter;void 0===o&&(o=function(t,e,n){return!0});var i=n.transformer;void 0===i&&(i=function(t){return t});var s=n.mutationTransformer;void 0===s&&(s=function(t){return t});var a=n.logger;return void 0===a&&(a=console),function(n){var c=t(n.state);n.subscribe(function(n,u){if(void 0!==a){var p=t(u);if(o(n,c,p)){var l=new Date,h=" @ "+e(l.getHours(),2)+":"+e(l.getMinutes(),2)+":"+e(l.getSeconds(),2)+"."+e(l.getMilliseconds(),3),f=s(n),d="mutation "+n.type+h,y=r?a.groupCollapsed:a.group;try{y.call(a,d)}catch(t){console.log(d)}a.log("%c prev state","color: #9E9E9E; font-weight: bold",i(c)),a.log("%c mutation","color: #03A9F4; font-weight: bold",f),a.log("%c next state","color: #4CAF50; font-weight: bold",i(p));try{a.groupEnd()}catch(t){a.log("—— log end ——")}}c=p}})}}}()},scdI:function(t,e,n){},swrk:function(t,e,n){},tHOU:function(t,e,n){"use strict";var r=n("BUIJ");n.n(r).a},tWPO:function(t,e,n){},tauN:function(t,e,n){"use strict";var r=n("scdI");n.n(r).a},vhPU:function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},w2a5:function(t,e,n){var r=n("aCFj"),o=n("ne8i"),i=n("d/Gc");t.exports=function(t){return function(e,n,s){var a,c=r(e),u=o(c.length),p=i(s,u);if(t&&n!=n){for(;u>p;)if((a=c[p++])!=a)return!0}else for(;u>p;p++)if((t||p in c)&&c[p]===n)return t||p||0;return!t&&-1}}},wrKd:function(t,e,n){},xpql:function(t,e,n){t.exports=!n("nh4g")&&!n("eeVq")(function(){return 7!=Object.defineProperty(n("Iw71")("div"),"a",{get:function(){return 7}}).a})},y3w9:function(t,e,n){var r=n("0/R4");t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},ylqs:function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},yt8O:function(t,e,n){"use strict";var r=n("nGyu"),o=n("1TsA"),i=n("hPIQ"),s=n("aCFj");t.exports=n("Afnz")(Array,"Array",function(t,e){this._t=s(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,o(1)):o(0,"keys"==e?n:"values"==e?t[n]:[n,t[n]])},"values"),i.Arguments=i.Array,r("keys"),r("values"),r("entries")},zRwo:function(t,e,n){var r=n("6FMO");t.exports=function(t,e){return new(r(t))(e)}},zhAb:function(t,e,n){var r=n("aagx"),o=n("aCFj"),i=n("w2a5")(!1),s=n("YTvA")("IE_PROTO");t.exports=function(t,e){var n,a=o(t),c=0,u=[];for(n in a)n!=s&&r(a,n)&&u.push(n);for(;e.length>c;)r(a,n=e[c++])&&(~i(u,n)||u.push(n));return u}}})});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(15);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(17)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../css-loader/index.js!./vue-sequence.css", function() {
		var newContent = require("!!../../css-loader/index.js!./vue-sequence.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)(false);
// imports


// module
exports.push([module.i, ".lifeline[data-v-3a05119c]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;margin:0 20px}.lifeline .line[data-v-3a05119c]{-webkit-box-flex:1;-ms-flex:1;flex:1;margin-left:50%;border-left-width:1px}.lifeline>.participant[data-v-3a05119c]{z-index:100}.life-line-layer[data-v-03874a59]{display:-webkit-box;display:-ms-flexbox;display:flex;white-space:nowrap;position:absolute;height:100%}.lifeline.starter[data-v-03874a59]{-webkit-transform:translateX(6px);transform:translateX(6px)}.lifeline.starter.hidden[data-v-03874a59]{visibility:hidden;margin-left:-40px}.starter[data-v-03874a59] .participant{border-radius:50%}.point[data-v-102217b1]{position:absolute;margin-top:-12px;right:10px}.fill svg.arrow polyline[data-v-102217b1]{fill:gray}.async>.message>.point>svg.arrow>polyline[data-v-102217b1]{fill:none}.right-to-left.point[data-v-102217b1]{left:0;right:auto}.right-to-left.point>svg>polyline.right[data-v-102217b1]{display:none}.right-to-left.point>svg>polyline.left[data-v-102217b1]{display:inline}.point>svg>polyline.left[data-v-102217b1]{display:none}.message[data-v-50fe6874]{width:calc(100% - 16px);border-bottom-width:2px;white-space:nowrap}.sync>.message[data-v-50fe6874]{left:8px}.occurrence[data-v-a0d3b81a]{margin-top:-2px}.interaction.creation[data-v-0c486a58]{text-align:right}.interaction.creation.right-to-left[data-v-0c486a58]{-webkit-transform:translateX(-100%);transform:translateX(-100%);text-align:left}.participant.place-holder[data-v-0c486a58]{visibility:hidden;margin-top:-20px}.creation.right-to-left>.message.invocation[data-v-0c486a58]{left:-6px;margin-left:auto}.right-to-left>.occurrence[data-v-0c486a58]{left:-8px}.interaction.right-to-left[data-v-44cbabc4]{-webkit-transform:translateX(-100%);transform:translateX(-100%)}.interaction .invisible-occurrence[data-v-99ae55c6]{height:20px}.interaction.async[data-v-99ae55c6] .message{width:100%}.message.self[data-v-02eaff1a]{height:34px}.sync>.message.self[data-v-02eaff1a]{left:6px}.message .name[data-v-02eaff1a]{position:relative;left:30px;white-space:nowrap}.self>.message .name[data-v-02eaff1a]{text-align:left}.message.self svg.arrow polyline[data-v-02eaff1a]{fill:none}.message.self svg.arrow polyline.head[data-v-02eaff1a]{fill:gray}.message.self[data-v-448d144f]{height:34px}.sync>.message.self[data-v-448d144f]{left:6px}.message .name[data-v-448d144f]{position:relative;left:30px;white-space:nowrap}.self>.message .name[data-v-448d144f]{text-align:left}.message.self svg.arrow polyline.head[data-v-448d144f],.message.self svg.arrow polyline[data-v-448d144f]{fill:none}.self>.comments[data-v-0442f319]{-webkit-transform:translateY(-4px);transform:translateY(-4px)}.divider[data-v-55a4f15e]{border-bottom-width:1px;margin:10px 4px}.comments{position:relative;text-align:left;border:1px solid transparent;background:#fff;padding:5px;width:500px;font-size:.8em;font-style:italic;line-height:1em;opacity:.5}.comments:hover{color:#000}.fragment>.comments{width:100%;border-bottom:1px solid gray;border-top:none;border-left:none;border-right:none}.message-layer[data-v-6909fd0d]{padding-top:60px;padding-bottom:40px}.interaction{margin-top:10px;margin-bottom:5px}.interaction,.message{position:relative}.message.return{position:absolute;bottom:0}.message>.name{font-size:13px;text-align:center}.message svg{position:absolute;width:10px}.message.self svg{width:40px}.message svg.arrow polyline{stroke:gray;fill:none;stroke-width:1.5;stroke-linejoin:round}.occurrence{position:relative;width:16px;left:calc(100% - 8px);padding:16px 0;padding-left:6px;border-width:2px}.interaction.right-to-left>.occurrence{left:-8px}.interaction.self>.occurrence{left:-8px;margin-top:-10px;margin-left:6px}.fragment{border-width:1px;margin:2px 0}.fragment .header label{padding:0 10px}.fragment .header .name label{padding:0 10px;background:hsla(0,0%,67%,.1)}*,:after,:before{-webkit-box-sizing:inherit;box-sizing:inherit}.sequence-diagram{position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;line-height:normal;text-align:left}.participant{padding:8px 4px;min-width:88px;max-width:250px;text-align:center}.sequence-diagram{font-family:Helvetica,Verdana,serif;font-size:16px}.sequence-diagram .participant{font-weight:700;background:#fff}.sequence-diagram .occurrence,.sequence-diagram .participant{border:2px solid rgba(3,3,3,.05)}.sequence-diagram .message{border-bottom-color:gray}.sequence-diagram .occurrence{background-color:#d3d3d3}.sequence-diagram .fragment{border-style:solid;border-color:#aaa;border-radius:2px;background:hsla(0,0%,100%,.2);opacity:.9}.sequence-diagram .fragment .header .name label{color:#555;font-weight:700}.sequence-diagram .fragment.alt div.divider{border-bottom-style:dashed;border-bottom-color:#555}.sequence-diagram .lifeline .line{border-left-style:dashed;border-left-color:gray}", ""]);

// exports


/***/ }),
/* 16 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(18);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 18 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

(function (global) {
    'use strict';

    var util = newUtil();
    var inliner = newInliner();
    var fontFaces = newFontFaces();
    var images = newImages();

    // Default impl options
    var defaultOptions = {
        // Default is to fail on error, no placeholder
        imagePlaceholder: undefined,
        // Default cache bust is false, it will use the cache
        cacheBust: false
    };

    var domtoimage = {
        toSvg: toSvg,
        toPng: toPng,
        toJpeg: toJpeg,
        toBlob: toBlob,
        toPixelData: toPixelData,
        impl: {
            fontFaces: fontFaces,
            images: images,
            util: util,
            inliner: inliner,
            options: {}
        }
    };

    if (true)
        module.exports = domtoimage;
    else
        global.domtoimage = domtoimage;


    /**
     * @param {Node} node - The DOM Node object to render
     * @param {Object} options - Rendering options
     * @param {Function} options.filter - Should return true if passed node should be included in the output
     *          (excluding node means excluding it's children as well). Not called on the root node.
     * @param {String} options.bgcolor - color for the background, any valid CSS color value.
     * @param {Number} options.width - width to be applied to node before rendering.
     * @param {Number} options.height - height to be applied to node before rendering.
     * @param {Object} options.style - an object whose properties to be copied to node's style before rendering.
     * @param {Number} options.quality - a Number between 0 and 1 indicating image quality (applicable to JPEG only), defaults to 1.0.
     * @param {String} options.imagePlaceholder - dataURL to use as a placeholder for failed images, default behaviour is to fail fast on images we can't fetch
     * @param {Boolean} options.cacheBust - set to true to cache bust by appending the time to the request url
     * @return {Promise} - A promise that is fulfilled with a SVG image data URL
     * */
    function toSvg(node, options) {
        options = options || {};
        copyOptions(options);
        return Promise.resolve(node)
            .then(function (node) {
                return cloneNode(node, options.filter, true);
            })
            .then(embedFonts)
            .then(inlineImages)
            .then(applyOptions)
            .then(function (clone) {
                return makeSvgDataUri(clone,
                    options.width || util.width(node),
                    options.height || util.height(node)
                );
            });

        function applyOptions(clone) {
            if (options.bgcolor) clone.style.backgroundColor = options.bgcolor;

            if (options.width) clone.style.width = options.width + 'px';
            if (options.height) clone.style.height = options.height + 'px';

            if (options.style)
                Object.keys(options.style).forEach(function (property) {
                    clone.style[property] = options.style[property];
                });

            return clone;
        }
    }

    /**
     * @param {Node} node - The DOM Node object to render
     * @param {Object} options - Rendering options, @see {@link toSvg}
     * @return {Promise} - A promise that is fulfilled with a Uint8Array containing RGBA pixel data.
     * */
    function toPixelData(node, options) {
        return draw(node, options || {})
            .then(function (canvas) {
                return canvas.getContext('2d').getImageData(
                    0,
                    0,
                    util.width(node),
                    util.height(node)
                ).data;
            });
    }

    /**
     * @param {Node} node - The DOM Node object to render
     * @param {Object} options - Rendering options, @see {@link toSvg}
     * @return {Promise} - A promise that is fulfilled with a PNG image data URL
     * */
    function toPng(node, options) {
        return draw(node, options || {})
            .then(function (canvas) {
                return canvas.toDataURL();
            });
    }

    /**
     * @param {Node} node - The DOM Node object to render
     * @param {Object} options - Rendering options, @see {@link toSvg}
     * @return {Promise} - A promise that is fulfilled with a JPEG image data URL
     * */
    function toJpeg(node, options) {
        options = options || {};
        return draw(node, options)
            .then(function (canvas) {
                return canvas.toDataURL('image/jpeg', options.quality || 1.0);
            });
    }

    /**
     * @param {Node} node - The DOM Node object to render
     * @param {Object} options - Rendering options, @see {@link toSvg}
     * @return {Promise} - A promise that is fulfilled with a PNG image blob
     * */
    function toBlob(node, options) {
        return draw(node, options || {})
            .then(util.canvasToBlob);
    }

    function copyOptions(options) {
        // Copy options to impl options for use in impl
        if(typeof(options.imagePlaceholder) === 'undefined') {
            domtoimage.impl.options.imagePlaceholder = defaultOptions.imagePlaceholder;
        } else {
            domtoimage.impl.options.imagePlaceholder = options.imagePlaceholder;
        }

        if(typeof(options.cacheBust) === 'undefined') {
            domtoimage.impl.options.cacheBust = defaultOptions.cacheBust;
        } else {
            domtoimage.impl.options.cacheBust = options.cacheBust;
        }
    }

    function draw(domNode, options) {
        return toSvg(domNode, options)
            .then(util.makeImage)
            .then(util.delay(100))
            .then(function (image) {
                var canvas = newCanvas(domNode);
                var ctx = canvas.getContext('2d');
                ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
                ctx.drawImage(image, 0, 0);
                return canvas;
            });

        function newCanvas(domNode) {
            var canvas = document.createElement('canvas');
            canvas.width = options.width || window.devicePixelRatio * util.width(domNode);
            canvas.height = options.height || window.devicePixelRatio * util.height(domNode);

            if (options.bgcolor) {
                var ctx = canvas.getContext('2d');
                ctx.fillStyle = options.bgcolor;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            return canvas;
        }
    }

    function cloneNode(node, filter, root) {
        if (!root && filter && !filter(node)) return Promise.resolve();

        return Promise.resolve(node)
            .then(makeNodeCopy)
            .then(function (clone) {
                return cloneChildren(node, clone, filter);
            })
            .then(function (clone) {
                return processClone(node, clone);
            });

        function makeNodeCopy(node) {
            if (node instanceof HTMLCanvasElement) return util.makeImage(node.toDataURL());
            return node.cloneNode(false);
        }

        function cloneChildren(original, clone, filter) {
            var children = original.childNodes;
            if (children.length === 0) return Promise.resolve(clone);

            return cloneChildrenInOrder(clone, util.asArray(children), filter)
                .then(function () {
                    return clone;
                });

            function cloneChildrenInOrder(parent, children, filter) {
                var done = Promise.resolve();
                children.forEach(function (child) {
                    done = done
                        .then(function () {
                            return cloneNode(child, filter);
                        })
                        .then(function (childClone) {
                            if (childClone) parent.appendChild(childClone);
                        });
                });
                return done;
            }
        }

        function processClone(original, clone) {
            if (!(clone instanceof Element)) return clone;

            return Promise.resolve()
                .then(cloneStyle)
                .then(clonePseudoElements)
                .then(copyUserInput)
                .then(fixSvg)
                .then(function () {
                    return clone;
                });

            function cloneStyle() {
                copyStyle(window.getComputedStyle(original), clone.style);

                function copyStyle(source, target) {
                    target.fontStretch == '';
                    if (source.cssText) {
                        target.cssText = source.cssText;
                        target.font = source.font; // here, we re-assign the font prop.
                    } else {
                        copyProperties(source, target);
                    }
                    target.fontStretch = 'normal';

                    function copyProperties(source, target) {
                        util.asArray(source).forEach(function (name) {
                            target.setProperty(
                                name,
                                source.getPropertyValue(name),
                                source.getPropertyPriority(name)
                            );
                        });
                    }
                }
            }

            function clonePseudoElements() {
                [':before', ':after'].forEach(function (element) {
                    clonePseudoElement(element);
                });

                function clonePseudoElement(element) {
                    var style = window.getComputedStyle(original, element);
                    var content = style.getPropertyValue('content');

                    if (content === '' || content === 'none') return;

                    var className = util.uid();
                    clone.className = clone.className + ' ' + className;
                    var styleElement = document.createElement('style');
                    styleElement.appendChild(formatPseudoElementStyle(className, element, style));
                    clone.appendChild(styleElement);

                    function formatPseudoElementStyle(className, element, style) {
                        var selector = '.' + className + ':' + element;
                        var cssText = style.cssText ? formatCssText(style) : formatCssProperties(style);
                        return document.createTextNode(selector + '{' + cssText + '}');

                        function formatCssText(style) {
                            var content = style.getPropertyValue('content');
                            return style.cssText + ' content: ' + content + ';';
                        }

                        function formatCssProperties(style) {

                            return util.asArray(style)
                                .map(formatProperty)
                                .join('; ') + ';';

                            function formatProperty(name) {
                                return name + ': ' +
                                    style.getPropertyValue(name) +
                                    (style.getPropertyPriority(name) ? ' !important' : '');
                            }
                        }
                    }
                }
            }

            function copyUserInput() {
                if (original instanceof HTMLTextAreaElement) clone.innerHTML = original.value;
                if (original instanceof HTMLInputElement) clone.setAttribute("value", original.value);
            }

            function fixSvg() {
                if (!(clone instanceof SVGElement)) return;
                clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

                if (!(clone instanceof SVGRectElement)) return;
                ['width', 'height'].forEach(function (attribute) {
                    var value = clone.getAttribute(attribute);
                    if (!value) return;

                    clone.style.setProperty(attribute, value);
                });
            }
        }
    }

    function embedFonts(node) {
        return fontFaces.resolveAll()
            .then(function (cssText) {
                var styleNode = document.createElement('style');
                node.appendChild(styleNode);
                styleNode.appendChild(document.createTextNode(cssText));
                return node;
            });
    }

    function inlineImages(node) {
        return images.inlineAll(node)
            .then(function () {
                return node;
            });
    }

    function makeSvgDataUri(node, width, height) {
        return Promise.resolve(node)
            .then(function (node) {
                node.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
                return new XMLSerializer().serializeToString(node);
            })
            .then(util.escapeXhtml)
            .then(function (xhtml) {
                return '<foreignObject x="0" y="0" width="100%" height="100%">' + xhtml + '</foreignObject>';
            })
            .then(function (foreignObject) {
                return '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '">' +
                    foreignObject + '</svg>';
            })
            .then(function (svg) {
                return 'data:image/svg+xml;charset=utf-8,' + svg;
            });
    }

    function newUtil() {
        return {
            escape: escape,
            parseExtension: parseExtension,
            mimeType: mimeType,
            dataAsUrl: dataAsUrl,
            isDataUrl: isDataUrl,
			isSrcAsDataUrl: isSrcAsDataUrl,
			canvasToBlob: canvasToBlob,
            resolveUrl: resolveUrl,
            getAndEncode: getAndEncode,
            uid: uid(),
            delay: delay,
            asArray: asArray,
            escapeXhtml: escapeXhtml,
            makeImage: makeImage,
            width: width,
            height: height
        };

        function mimes() {
            /*
             * Only WOFF and EOT mime types for fonts are 'real'
             * see http://www.iana.org/assignments/media-types/media-types.xhtml
             */
            var WOFF = 'application/font-woff';
            var JPEG = 'image/jpeg';

            return {
                'woff': WOFF,
                'woff2': WOFF,
                'ttf': 'application/font-truetype',
                'eot': 'application/vnd.ms-fontobject',
                'png': 'image/png',
                'jpg': JPEG,
                'jpeg': JPEG,
                'gif': 'image/gif',
                'tiff': 'image/tiff',
                'svg': 'image/svg+xml'
            };
        }

        function parseExtension(url) {
            var match = /\.([^\.\/]*?)$/g.exec(url);
            if (match) return match[1];
            else return '';
        }

        function mimeType(url) {
            var extension = parseExtension(url).toLowerCase();
            return mimes()[extension] || '';
        }

        function isDataUrl(url) {
            return url.search(/^(data:)/) !== -1;
        }

		function isSrcAsDataUrl(text) {
			var DATA_URL_REGEX = /url\(['"]?(data:)([^'"]+?)['"]?\)/;

			return text.search(DATA_URL_REGEX) !== -1;
		}
        function toBlob(canvas) {
            return new Promise(function (resolve) {
                var binaryString = window.atob(canvas.toDataURL().split(',')[1]);
                var length = binaryString.length;
                var binaryArray = new Uint8Array(length);

                for (var i = 0; i < length; i++)
                    binaryArray[i] = binaryString.charCodeAt(i);

                resolve(new Blob([binaryArray], {
                    type: 'image/png'
                }));
            });
        }

        function canvasToBlob(canvas) {
            if (canvas.toBlob)
                return new Promise(function (resolve) {
                    canvas.toBlob(resolve);
                });

            return toBlob(canvas);
        }

        function resolveUrl(url, baseUrl) {
            var doc = document.implementation.createHTMLDocument();
            var base = doc.createElement('base');
            doc.head.appendChild(base);
            var a = doc.createElement('a');
            doc.body.appendChild(a);
            base.href = baseUrl;
            a.href = url;
            return a.href;
        }

        function uid() {
            var index = 0;

            return function () {
                return 'u' + fourRandomChars() + index++;

                function fourRandomChars() {
                    /* see http://stackoverflow.com/a/6248722/2519373 */
                    return ('0000' + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
                }
            };
        }

        function makeImage(uri) {
            return new Promise(function (resolve, reject) {
                var image = new Image();
                image.onload = function () {
                    resolve(image);
                };
                image.onerror = reject;
                image.src = uri;
            });
        }

        function getAndEncode(url) {
            var TIMEOUT = 30000;
            if(domtoimage.impl.options.cacheBust) {
                // Cache bypass so we dont have CORS issues with cached images
                // Source: https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Bypassing_the_cache
                url += ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime();
            }

            return new Promise(function (resolve) {
                var request = new XMLHttpRequest();

                request.onreadystatechange = done;
                request.ontimeout = timeout;
                request.responseType = 'blob';
                request.timeout = TIMEOUT;
                request.open('GET', url, true);
                request.send();

                var placeholder;
                if(domtoimage.impl.options.imagePlaceholder) {
                    var split = domtoimage.impl.options.imagePlaceholder.split(/,/);
                    if(split && split[1]) {
                        placeholder = split[1];
                    }
                }

                function done() {
                    if (request.readyState !== 4) return;

                    if (request.status !== 200) {
                        if(placeholder) {
                            resolve(placeholder);
                        } else {
                            fail('cannot fetch resource: ' + url + ', status: ' + request.status);
                        }

                        return;
                    }

                    var encoder = new FileReader();
                    encoder.onloadend = function () {
                        var content = encoder.result.split(/,/)[1];
                        resolve(content);
                    };
                    encoder.readAsDataURL(request.response);
                }

                function timeout() {
                    if(placeholder) {
                        resolve(placeholder);
                    } else {
                        fail('timeout of ' + TIMEOUT + 'ms occured while fetching resource: ' + url);
                    }
                }

                function fail(message) {
                    console.error(message);
                    resolve('');
                }
            });
        }

        function dataAsUrl(content, type) {
            return 'data:' + type + ';base64,' + content;
        }

        function escape(string) {
            return string.replace(/([.*+?^${}()|\[\]\/\\])/g, '\\$1');
        }

        function delay(ms) {
            return function (arg) {
                return new Promise(function (resolve) {
                    setTimeout(function () {
                        resolve(arg);
                    }, ms);
                });
            };
        }

        function asArray(arrayLike) {
            var array = [];
            var length = arrayLike.length;
            for (var i = 0; i < length; i++) array.push(arrayLike[i]);
            return array;
        }

        function escapeXhtml(string) {
            return string.replace(/#/g, '%23').replace(/\n/g, '%0A');
        }

        function width(node) {
            var leftBorder = px(node, 'border-left-width');
            var rightBorder = px(node, 'border-right-width');
            return node.scrollWidth + leftBorder + rightBorder;
        }

        function height(node) {
            var topBorder = px(node, 'border-top-width');
            var bottomBorder = px(node, 'border-bottom-width');
            return node.scrollHeight + topBorder + bottomBorder;
        }

        function px(node, styleProperty) {
            var value = window.getComputedStyle(node).getPropertyValue(styleProperty);
            return parseFloat(value.replace('px', ''));
        }
    }

    function newInliner() {
        var URL_REGEX = /url\(['"]?([^'"]+?)['"]?\)/g;

        return {
            inlineAll: inlineAll,
            shouldProcess: shouldProcess,
            impl: {
                readUrls: readUrls,
                inline: inline
            }
        };

        function shouldProcess(string) {
            return string.search(URL_REGEX) !== -1;
        }

        function readUrls(string) {
            var result = [];
            var match;
            while ((match = URL_REGEX.exec(string)) !== null) {
                result.push(match[1]);
            }
            return result.filter(function (url) {
                return !util.isDataUrl(url);
            });
        }

        function inline(string, url, baseUrl, get) {
            return Promise.resolve(url)
                .then(function (url) {
                    return baseUrl ? util.resolveUrl(url, baseUrl) : url;
                })
                .then(get || util.getAndEncode)
                .then(function (data) {
                    return util.dataAsUrl(data, util.mimeType(url));
                })
                .then(function (dataUrl) {
                    return string.replace(urlAsRegex(url), '$1' + dataUrl + '$3');
                });

            function urlAsRegex(url) {
                return new RegExp('(url\\([\'"]?)(' + util.escape(url) + ')([\'"]?\\))', 'g');
            }
        }

        function inlineAll(string, baseUrl, get) {
            if (nothingToInline() || util.isSrcAsDataUrl(string)) return Promise.resolve(string);

            return Promise.resolve(string)
                .then(readUrls)
                .then(function (urls) {
                    var done = Promise.resolve(string);
                    urls.forEach(function (url) {
                        done = done.then(function (string) {
                            return inline(string, url, baseUrl, get);
                        });
                    });
                    return done;
                });

            function nothingToInline() {
                return !shouldProcess(string);
            }
        }
    }

    function newFontFaces() {
        return {
            resolveAll: resolveAll,
            impl: {
                readAll: readAll
            }
        };

        function resolveAll() {
            return readAll(document)
                .then(function (webFonts) {
                    return Promise.all(
                        webFonts.map(function (webFont) {
                            return webFont.resolve();
                        })
                    );
                })
                .then(function (cssStrings) {
                    return cssStrings.join('\n');
                });
        }

        function readAll() {
            return Promise.resolve(util.asArray(document.styleSheets))
				.then(loadExternalStyleSheets)
                .then(getCssRules)
                .then(selectWebFontRules)
                .then(function (rules) {
                    return rules.map(newWebFont);
                });

            function selectWebFontRules(cssRules) {
                return cssRules
                    .filter(function (rule) {
                        return rule.type === CSSRule.FONT_FACE_RULE;
                    })
                    .filter(function (rule) {
                        return inliner.shouldProcess(rule.style.getPropertyValue('src'));
                    });
            }

			function loadExternalStyleSheets(styleSheets) {
				return Promise.all(
					styleSheets.map(function (sheet) {
						if (sheet.href) {
							return fetch(sheet.href)
								.then(toText)
								.then(setBaseHref(sheet.href))
								.then(toStyleSheet);
						} else {
							return Promise.resolve(sheet);
						}
					})
				);

				function toText(response) {
					return response.text();
				}

				function setBaseHref(base) {
					base = base.split('/');
					base.pop();
					base = base.join('/');

					return function(text) {
						return util.isSrcAsDataUrl(text) ? text : text.replace(
							/url\(['"]?([^'"]+?)['"]?\)/g,
							addBaseHrefToUrl
						);
					};

					function addBaseHrefToUrl(match, p1) {
						var url = /^http/i.test(p1) ?
							p1 : concatAndResolveUrl(base, p1)
						return 'url(\'' + url + '\')';
					}

					// Source: http://stackoverflow.com/a/2676231/3786856
					function concatAndResolveUrl(url, concat) {
						var url1 = url.split('/');
						var url2 = concat.split('/');
						var url3 = [ ];
						for (var i = 0, l = url1.length; i < l; i ++) {
							if (url1[i] == '..') {
								url3.pop();
							} else if (url1[i] == '.') {
								continue;
							} else {
								url3.push(url1[i]);
							}
						}
						for (var i = 0, l = url2.length; i < l; i ++) {
							if (url2[i] == '..') {
								url3.pop();
							} else if (url2[i] == '.') {
								continue;
							} else {
								url3.push(url2[i]);
							}
						}
						return url3.join('/');
					}
				}

				function toStyleSheet(text) {
					var doc = document.implementation.createHTMLDocument('');
					var styleElement = document.createElement('style');

					styleElement.textContent = text;
					doc.body.appendChild(styleElement);

					return styleElement.sheet;
				}
			}

            function getCssRules(styleSheets) {
                var cssRules = [];
                styleSheets.forEach(function (sheet) {
					if (sheet.cssRules && typeof sheet.cssRules === 'object') {
						try {
							util.asArray(sheet.cssRules || []).forEach(cssRules.push.bind(cssRules));
						} catch (e) {
							console.log('Error while reading CSS rules from ' + sheet.href, e.toString());
						}
					}
                });
                return cssRules;
            }

            function newWebFont(webFontRule) {
                return {
                    resolve: function resolve() {
                        var baseUrl = (webFontRule.parentStyleSheet || {}).href;
                        return inliner.inlineAll(webFontRule.cssText, baseUrl);
                    },
                    src: function () {
                        return webFontRule.style.getPropertyValue('src');
                    }
                };
            }
        }
    }

    function newImages() {
        return {
            inlineAll: inlineAll,
            impl: {
                newImage: newImage
            }
        };

        function newImage(element) {
            return {
                inline: inline
            };

            function inline(get) {
                if (util.isDataUrl(element.src)) return Promise.resolve();

                return Promise.resolve(element.src)
                    .then(get || util.getAndEncode)
                    .then(function (data) {
                        return util.dataAsUrl(data, util.mimeType(element.src));
                    })
                    .then(function (dataUrl) {
                        return new Promise(function (resolve, reject) {
                            element.onload = resolve;
                            element.onerror = reject;
                            element.src = dataUrl;
                        });
                    });
            }
        }

        function inlineAll(node) {
            if (!(node instanceof Element)) return Promise.resolve(node);

            return inlineBackground(node)
                .then(function () {
                    if (node instanceof HTMLImageElement)
                        return newImage(node).inline();
                    else
                        return Promise.all(
                            util.asArray(node.childNodes).map(function (child) {
                                return inlineAll(child);
                            })
                        );
                });

            function inlineBackground(node) {
                var background = node.style.getPropertyValue('background');

                if (!background) return Promise.resolve(node);

                return inliner.inlineAll(background)
                    .then(function (inlined) {
                        node.style.setProperty(
                            'background',
                            inlined,
                            node.style.getPropertyPriority('background')
                        );
                    })
                    .then(function () {
                        return node;
                    });
            }
        }
    }
})(this);


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/* FileSaver.js
 * A saveAs() FileSaver implementation.
 * 1.3.2
 * 2016-06-16 18:25:19
 *
 * By Eli Grey, http://eligrey.com
 * License: MIT
 *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
 */

/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

var saveAs = saveAs || (function(view) {
	"use strict";
	// IE <10 is explicitly unsupported
	if (typeof view === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
		return;
	}
	var
		  doc = view.document
		  // only get URL when necessary in case Blob.js hasn't overridden it yet
		, get_URL = function() {
			return view.URL || view.webkitURL || view;
		}
		, save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
		, can_use_save_link = "download" in save_link
		, click = function(node) {
			var event = new MouseEvent("click");
			node.dispatchEvent(event);
		}
		, is_safari = /constructor/i.test(view.HTMLElement) || view.safari
		, is_chrome_ios =/CriOS\/[\d]+/.test(navigator.userAgent)
		, throw_outside = function(ex) {
			(view.setImmediate || view.setTimeout)(function() {
				throw ex;
			}, 0);
		}
		, force_saveable_type = "application/octet-stream"
		// the Blob API is fundamentally broken as there is no "downloadfinished" event to subscribe to
		, arbitrary_revoke_timeout = 1000 * 40 // in ms
		, revoke = function(file) {
			var revoker = function() {
				if (typeof file === "string") { // file is an object URL
					get_URL().revokeObjectURL(file);
				} else { // file is a File
					file.remove();
				}
			};
			setTimeout(revoker, arbitrary_revoke_timeout);
		}
		, dispatch = function(filesaver, event_types, event) {
			event_types = [].concat(event_types);
			var i = event_types.length;
			while (i--) {
				var listener = filesaver["on" + event_types[i]];
				if (typeof listener === "function") {
					try {
						listener.call(filesaver, event || filesaver);
					} catch (ex) {
						throw_outside(ex);
					}
				}
			}
		}
		, auto_bom = function(blob) {
			// prepend BOM for UTF-8 XML and text/* types (including HTML)
			// note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
			if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
				return new Blob([String.fromCharCode(0xFEFF), blob], {type: blob.type});
			}
			return blob;
		}
		, FileSaver = function(blob, name, no_auto_bom) {
			if (!no_auto_bom) {
				blob = auto_bom(blob);
			}
			// First try a.download, then web filesystem, then object URLs
			var
				  filesaver = this
				, type = blob.type
				, force = type === force_saveable_type
				, object_url
				, dispatch_all = function() {
					dispatch(filesaver, "writestart progress write writeend".split(" "));
				}
				// on any filesys errors revert to saving with object URLs
				, fs_error = function() {
					if ((is_chrome_ios || (force && is_safari)) && view.FileReader) {
						// Safari doesn't allow downloading of blob urls
						var reader = new FileReader();
						reader.onloadend = function() {
							var url = is_chrome_ios ? reader.result : reader.result.replace(/^data:[^;]*;/, 'data:attachment/file;');
							var popup = view.open(url, '_blank');
							if(!popup) view.location.href = url;
							url=undefined; // release reference before dispatching
							filesaver.readyState = filesaver.DONE;
							dispatch_all();
						};
						reader.readAsDataURL(blob);
						filesaver.readyState = filesaver.INIT;
						return;
					}
					// don't create more object URLs than needed
					if (!object_url) {
						object_url = get_URL().createObjectURL(blob);
					}
					if (force) {
						view.location.href = object_url;
					} else {
						var opened = view.open(object_url, "_blank");
						if (!opened) {
							// Apple does not allow window.open, see https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/WorkingwithWindowsandTabs/WorkingwithWindowsandTabs.html
							view.location.href = object_url;
						}
					}
					filesaver.readyState = filesaver.DONE;
					dispatch_all();
					revoke(object_url);
				}
			;
			filesaver.readyState = filesaver.INIT;

			if (can_use_save_link) {
				object_url = get_URL().createObjectURL(blob);
				setTimeout(function() {
					save_link.href = object_url;
					save_link.download = name;
					click(save_link);
					dispatch_all();
					revoke(object_url);
					filesaver.readyState = filesaver.DONE;
				});
				return;
			}

			fs_error();
		}
		, FS_proto = FileSaver.prototype
		, saveAs = function(blob, name, no_auto_bom) {
			return new FileSaver(blob, name || blob.name || "download", no_auto_bom);
		}
	;
	// IE 10+ (native saveAs)
	if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
		return function(blob, name, no_auto_bom) {
			name = name || blob.name || "download";

			if (!no_auto_bom) {
				blob = auto_bom(blob);
			}
			return navigator.msSaveOrOpenBlob(blob, name);
		};
	}

	FS_proto.abort = function(){};
	FS_proto.readyState = FS_proto.INIT = 0;
	FS_proto.WRITING = 1;
	FS_proto.DONE = 2;

	FS_proto.error =
	FS_proto.onwritestart =
	FS_proto.onprogress =
	FS_proto.onwrite =
	FS_proto.onabort =
	FS_proto.onerror =
	FS_proto.onwriteend =
		null;

	return saveAs;
}(
	   typeof self !== "undefined" && self
	|| typeof window !== "undefined" && window
	|| this.content
));
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

if (typeof module !== "undefined" && module.exports) {
  module.exports.saveAs = saveAs;
} else if (("function" !== "undefined" && __webpack_require__(21) !== null) && (__webpack_require__(22) !== null)) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
    return saveAs;
  }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}


/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ })
/******/ ]);