import { trackEvent } from './analytics';

import { computeHtml, computeCss, computeJs } from './computes';
import { JsModes } from './codeModes';
import { deferred } from './deferred';
import { getExtensionFromFileName } from './fileUtils';
const esprima = require('esprima');

window.DEBUG = document.cookie.indexOf('wmdebug') > -1;
window.$ = document.querySelector.bind(document);

window.chrome = window.chrome || {};
window.chrome.i18n = {
	getMessage: () => {}
};

window.$all = selector => [...document.querySelectorAll(selector)];
window.IS_EXTENSION = !!window.chrome.extension;

/* eslint-disable no-process-env */
export const BASE_PATH =
	window.chrome.extension ||
	window.DEBUG ||
	process.env.NODE_ENV === 'development'
		? '/'
		: '/app';
/* eslint-enable no-process-env */

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
export function semverCompare(a, b) {
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

export function generateRandomId(len) {
	var length = len || 10;
	var id = '';
	for (var i = length; i--; ) {
		id += alphaNum[~~(Math.random() * alphaNum.length)];
	}
	return id;
}

export function onButtonClick(btn, listener) {
	btn.addEventListener('click', function buttonClickListener(e) {
		listener(e);
		return false;
	});
}

export function log() {
	if (window.DEBUG) {
		const err = new Error();
		console.log(
			parseInt(
				Date.now()
					.toString()
					.substr(4),
				10
			),
			...arguments,
			err.stack.split('\n')[2].replace(/\(.*\)/, '')
		);
	}
}

/**
 * Adds timed limit on the loops found in the passed code.
 * Contributed by Ariya Hidayat!
 * @param code {string}	Code to be protected from infinite loops.
 */
export function addInfiniteLoopProtection(code, { timeout }) {
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

export function getHumanDate(timestamp) {
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
export function once(node, type, callback) {
	// create event
	node.addEventListener(type, function(e) {
		// remove event
		e.target.removeEventListener(type, arguments.callee);
		// call handler
		return callback(e);
	});
}

export function downloadFile(fileName, blob) {
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

export function writeFile(name, blob, cb) {
	var fileWritten = false;

	function getErrorHandler(type) {
		return function() {
			log(arguments);
			trackEvent('fn', 'error', type);
			// When there are too many write errors, show a message.
			writeFile.errorCount = (writeFile.errorCount || 0) + 1;
			if (writeFile.errorCount === 4) {
				setTimeout(function() {
					alert(
						"Oops! Seems like your preview isn't updating. It's recommended to switch to the web app: https://webmaker.app/app/.\n\n If you still want to get the extension working, please try the following steps until it fixes:\n - Refresh Web Maker\n - Restart browser\n - Update browser\n - Reinstall Web Maker (don't forget to export all your creations from saved items pane (click the OPEN button) before reinstalling)\n\nIf nothing works, please tweet out to @webmakerApp."
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

export function loadJS(src) {
	var d = deferred();
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

export function loadCss({ url, id }) {
	var d = deferred();
	var style = window.document.createElement('link');
	style.setAttribute('href', url);
	style.setAttribute('rel', 'stylesheet');
	if (id) {
		style.setAttribute('id', id);
	}
	document.head.appendChild(style);
	style.onload = function() {
		d.resolve();
	};
	return d.promise;
}

/* eslint-disable max-params */
export function getCompleteHtml(html, css, js, item, isForExport) {
	/* eslint-enable max-params */

	if (!item) {
		return '';
	}
	var externalJs = '',
		externalCss = '';
	if (item.externalLibs) {
		externalJs = item.externalLibs.js
			.split('\n')
			.reduce(function(scripts, url) {
				return scripts + (url ? '\n<script src="' + url + '"></script>' : '');
			}, '');
		externalCss = item.externalLibs.css
			.split('\n')
			.reduce(function(links, url) {
				return (
					links +
					(url ? '\n<link rel="stylesheet" href="' + url + '"></link>' : '')
				);
			}, '');
	}
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
				: `${location.origin}${
						window.DEBUG ? '' : BASE_PATH
				  }/lib/screenlog.js`) +
			'"></script>';
	}

	if (item.jsMode === JsModes.ES6) {
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
		var origin = chrome.i18n.getMessage()
			? `chrome-extension://${chrome.i18n.getMessage('@@extension_id')}`
			: `${location.origin}`;
		contents +=
			'<script src="' + `filesystem:${origin}/temporary/script.js` + '">';
	}
	contents += '\n</script>\n</body>\n</html>';

	return contents;
}

export function saveAsHtml(item) {
	var htmlPromise = computeHtml(item.html, item.htmlMode);
	var cssPromise = computeCss(item.css, item.cssMode);
	var jsPromise = computeJs(item.js, item.jsMode, false);
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

		trackEvent('fn', 'saveFileComplete');
	});
}

export function handleDownloadsPermission() {
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

/**
 * Return the filename from a passed url.
 * http://a.com/path/file.png  -> file.png
 */
export function getFilenameFromUrl(url) {
	if (!url) {
		return '';
	}
	return url.match(/\/([^/]*)$/)[1];
}

export function prettify({ file, content, type }) {
	const d = deferred();
	if (file) {
		type = getExtensionFromFileName(file.name);
		content = file.content;
	}
	const worker = new Worker(
		chrome.extension
			? chrome.extension.getURL('lib/prettier-worker.js')
			: `${BASE_PATH !== '/' ? BASE_PATH : ''}/lib/prettier-worker.js`
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
