/**
 * Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-env browser */

if (
	'serviceWorker' in navigator &&
	location.protocol === 'https:' &&
	location.href.indexOf('chrome-extension://') === -1 &&
	location.href.indexOf('192.168') === -1
) {
	// Delay registration until after the page has loaded, to ensure that our
	// precaching requests don't degrade the first visit experience.
	// See https://developers.google.com/web/fundamentals/instant-and-offline/service-worker/registration
	window.addEventListener('load', function() {
		// Your service-worker.js *must* be located at the top-level directory relative to your site.
		// It won't be able to control pages unless it's located at the same level or higher than them.
		// *Don't* register service worker file in, e.g., a scripts/ sub-directory!
		// See https://github.com/slightlyoff/ServiceWorker/issues/468
		navigator.serviceWorker
			.register('service-worker.js')
			.then(function(reg) {
				// updatefound is fired if service-worker.js changes.
				reg.onupdatefound = function() {
					// The updatefound event implies that reg.installing is set; see
					// https://w3c.github.io/ServiceWorker/#service-worker-registration-updatefound-event
					var installingWorker = reg.installing;

					installingWorker.onstatechange = function() {
						/* eslint-disable default-case */
						switch (installingWorker.state) {
							case 'installed':
								if (navigator.serviceWorker.controller) {
									// At this point, the old content will have been purged and the fresh content will
									// have been added to the cache.
									// It's the perfect time to display a "New content is available; please refresh."
									// message in the page's interface.
									console.log('New or updated content is available.');
									if (window.alertsService) {
										window.alertsService.add(
											'New version available. Please refresh the page.'
										);
									}
								} else {
									// At this point, everything has been precached.
									// It's the perfect time to display a "Content is cached for offline use." message.
									console.log('Content is now available offline!');
									if (window.alertsService) {
										window.alertsService.add(
											'Web Maker is now ready to be used offline.'
										);
									}
								}
								break;

							case 'redundant':
								console.error(
									'The installing service worker became redundant.'
								);
								break;
						}
					};
				};
			})
			.catch(function(e) {
				console.error('Error during service worker registration:', e);
			});
	});
}

webpackJsonp([1],{

/***/ 0:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "JkW7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ../node_modules/preact/dist/preact.min.js
var preact_min = __webpack_require__("KM04");
var preact_min_default = /*#__PURE__*/__webpack_require__.n(preact_min);

// EXTERNAL MODULE: ./service-worker-registration.js
var service_worker_registration = __webpack_require__("mGGS");
var service_worker_registration_default = /*#__PURE__*/__webpack_require__.n(service_worker_registration);

// CONCATENATED MODULE: ./deferred.js
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function deferred() {
	var d = {};
	var promise = new Promise(function (resolve, reject) {
		d.resolve = resolve;
		d.reject = reject;
	});

	// Add the native promise as a key on deferred object.
	d.promise = promise;
	// Also move all props/methods of native promise on the deferred obj.
	return _extends(d, promise);
}
// CONCATENATED MODULE: ./codeModes.js
const HtmlModes = {
	HTML: 'html',
	MARKDOWN: 'markdown',
	JADE: 'jade' // unsafe eval is put in manifest for this file
};
const CssModes = {
	CSS: 'css',
	SCSS: 'scss',
	SASS: 'sass',
	LESS: 'less',
	STYLUS: 'stylus',
	ACSS: 'acss'
};
const JsModes = {
	JS: 'js',
	ES6: 'es6',
	COFFEESCRIPT: 'coffee',
	TS: 'typescript'
};
const modes = {};
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
	label: 'JS',
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
// CONCATENATED MODULE: ./computes.js




const esprima = __webpack_require__("4E2n");

// computeHtml, computeCss & computeJs evaluate the final code according
// to whatever mode is selected and resolve the returned promise with the code.
function computeHtml(userCode, mode) {
	var code = userCode;
	var d = deferred();
	if (mode === HtmlModes.HTML) {
		d.resolve({
			code
		});
	} else if (mode === HtmlModes.MARKDOWN) {
		d.resolve(window.marked ? {
			code: marked(code)
		} : {
			code
		});
	} else if (mode === HtmlModes.JADE) {
		d.resolve(window.jade ? {
			code: jade.render(code)
		} : {
			code
		});
	}

	return d.promise;
}
function computeCss(userCode, mode, settings) {
	var code = userCode;

	var d = deferred();
	var errors;

	if (mode === CssModes.CSS) {
		d.resolve({
			code
		});
	} else if (mode === CssModes.SCSS || mode === CssModes.SASS) {
		if (window.sass && code) {
			window.sass.compile(code, {
				indentedSyntax: mode === CssModes.SASS
			}, function (result) {
				// Something was wrong
				if (result.line && result.message) {
					errors = {
						lang: 'css',
						data: [{
							lineNumber: result.line - 1,
							message: result.message
						}]
					};
				}
				d.resolve({
					code: result.text,
					errors
				});
			});
		} else {
			d.resolve({
				code
			});
		}
	} else if (mode === CssModes.LESS) {
		less.render(code).then(function (result) {
			d.resolve({
				code: result.css
			});
		}, function (error) {
			errors = {
				lang: 'css',
				data: [{
					lineNumber: error.line,
					message: error.message
				}]
			};
			d.resolve({
				code: '',
				errors
			});
		});
	} else if (mode === CssModes.STYLUS) {
		stylus(code).render(function (error, result) {
			if (error) {
				window.err = error;
				// Last line of message is the actual message
				var tempArr = error.message.split('\n');
				tempArr.pop(); // This is empty string in the end
				errors = {
					lang: 'css',
					data: [{
						lineNumber: +error.message.match(/stylus:(\d+):/)[1] - 298,
						message: tempArr.pop()
					}]
				};
			}
			d.resolve({
				code: result,
				errors
			});
		});
	} else if (mode === CssModes.ACSS) {
		if (!window.atomizer) {
			d.resolve({
				code: ''
			});
		} else {
			const html = code;
			const foundClasses = atomizer.findClassNames(html);
			var finalConfig;
			try {
				finalConfig = atomizer.getConfig(foundClasses, JSON.parse(settings.acssConfig));
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
function computeJs(userCode, mode, shouldPreventInfiniteLoops, infiniteLoopTimeout) {
	var code = userCode;
	var d = deferred();
	var errors;

	if (!code) {
		d.resolve('');
		return d.promise;
	}

	if (mode === JsModes.JS) {
		try {
			esprima.parse(code, {
				tolerant: true
			});
		} catch (e) {
			errors = {
				lang: 'js',
				data: [{
					lineNumber: e.lineNumber - 1,
					message: e.description
				}]
			};
		} finally {
			if (shouldPreventInfiniteLoops !== false) {
				// If errors are found in last parse, we don't run infinite loop
				// protection otherwise it will again throw error.
				code = errors ? code : addInfiniteLoopProtection(code, {
					timeout: infiniteLoopTimeout
				});
			}

			d.resolve({
				code,
				errors
			});
		}
	} else if (mode === JsModes.COFFEESCRIPT) {
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
				data: [{
					lineNumber: e.location.first_line,
					message: e.message
				}]
			};
		} finally {
			if (shouldPreventInfiniteLoops !== false) {
				code = errors ? code : addInfiniteLoopProtection(code, {
					timeout: infiniteLoopTimeout
				});
			}
			d.resolve({
				code,
				errors
			});
		}
	} else if (mode === JsModes.ES6) {
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
				data: [{
					lineNumber: e.lineNumber - 1,
					message: e.description
				}]
			};
		} finally {
			code = Babel.transform(code, {
				presets: ['latest', 'stage-2', 'react']
			}).code;
			if (shouldPreventInfiniteLoops !== false) {
				code = errors ? code : addInfiniteLoopProtection(code, {
					timeout: infiniteLoopTimeout
				});
			}
			d.resolve({
				code,
				errors
			});
		}
	} else if (mode === JsModes.TS) {
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
					data: [{
						message: code.diagnostics[0].messageText,
						lineNumber: ts.getLineOfLocalPosition(code.diagnostics[0].file, code.diagnostics[0].start) - 1
					}]
				};
			}
			code = code.outputText;
			if (shouldPreventInfiniteLoops !== false && !errors) {
				code = addInfiniteLoopProtection(code, {
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
// CONCATENATED MODULE: ./fileUtils.js
/**
 * Returns the extension from the file name.
 * @param {dtring} fileName File name
 */
function getExtensionFromFileName(fileName) {
	const type = fileName.match(/\.(\w+)$/);
	return type ? type[1] : '';
}

/**
 * Returns a linear file list from a nested file strcuture.
 * It excludes the folders from the returned list.
 * @param {array} files Nested file structure
 */
function linearizeFiles(files) {
	function reduceToLinearFiles(_files) {
		return _files.reduce((list, currentFile) => {
			if (currentFile.isFolder) {
				return [...list, ...reduceToLinearFiles(currentFile.children)];
			}
			return [...list, currentFile];
		}, []);
	}
	return reduceToLinearFiles(files);
}

/**
 * Recursively iterates and assigns the `path` property to the files in passed files
 * array.
 * @param {array} files files structure for an item
 * @param {string} parentPath Parent path to prefix with all processed files
 */
function assignFilePaths(files, parentPath = '') {
	files.forEach(file => {
		file.path = parentPath ? `${parentPath}/${file.name}` : file.name;
		if (file.isFolder) {
			assignFilePaths(file.children, parentPath ? `${parentPath}/${file.name}` : file.name);
		}
	});
	return files;
}

/**
 * Returns the file object and it's index that is direct child of passed files array with name as passed fileName.
 * If not found, returns -1
 * @param {array} files files structure for an item
 * @param {string} fileName File/folder name
 */
function getChildFileFromName(files, fileName) {
	const index = files.findIndex(file => file.name === fileName);
	return { index, file: files[index] };
}

/**
 * Returns the file object and it's index in its parent for the passed path.
 * If not found, returns {index:-1}
 * @param {array} files files structure for an item
 * @param {string} path Path of file to search
 */
function getFileFromPath(files, path) {
	let currentFolder = files;
	const pathPieces = path.split('/');
	while (pathPieces.length > 1) {
		const folderName = pathPieces.shift();
		currentFolder = getChildFileFromName(currentFolder, folderName).file.children;
	}
	// now we should be left with just one value in the pathPieces array - the actual file name
	return getChildFileFromName(currentFolder, pathPieces[0]);
}

/**
 * Returns the file object and it's index in its parent for the passed path.
 * If not found, returns {index:-1}
 * @param {array} files files structure for an item
 * @param {string} path Path of file to search
 */
function removeFileAtPath(files, path) {
	let currentFolder = files;
	const pathPieces = path.split('/');
	while (pathPieces.length > 1) {
		const folderName = pathPieces.shift();
		currentFolder = getChildFileFromName(currentFolder, folderName).file.children;
	}
	// now we should be left with just one value in the pathPieces array - the actual file name
	const { index } = getChildFileFromName(currentFolder, pathPieces[0]);
	currentFolder.splice(index, 1);
}

/**
 * Checks if a file with same name exists in the passed folder.
 * @param {object} folder Folder to search in
 * @param {string} fileName File name to search for
 */
function doesFileExistInFolder(folder, fileName) {
	const details = getChildFileFromName(folder.children, fileName);
	return !!details.file;
}

/**
 * Returns parent path of passed path
 * @param {string} path Path of file to find parent of
 */
function getParentPath(path) {
	const pathPieces = path.split('/');
	if (pathPieces.length > 1) {
		return pathPieces.slice(0, -1).join('/');
	}
	return '';
}

/**
 * Fetches the files from a github repo and returns a suitable file structure.
 * @param {Promise} Promise of completition. Resolves to the files structure.
 */
function importGithubRepo(repoUrl) {
	let repoSlug, match;
	if (match = repoUrl.match(/github\.com\/([^/]*\/[^/]*)/)) {
		repoSlug = match[1];
	} else {
		repoSlug = 'chinchang/github';
	}
	const queryString = '';
	function fetchFile(filepath) {
		return fetch(`https://api.github.com/repos/${repoSlug}/contents/${filepath}${queryString}`).then(response => response.json());
	}
	function fetchDir(path, currentDir) {
		return fetch(`https://api.github.com/repos/${repoSlug}/contents/${path}${queryString}`).then(response => response.json()).then(response => {
			if (!response) {
				return Promise.resolve([]);
			}
			return Promise.all(response.map(file => {
				if (file.type === 'file') {
					return fetchFile(`${file.path}`).then(actualFile => {
						currentDir.push({
							name: file.name,
							content: atob(actualFile.content)
						});
					});
				} else if (file.type === 'dir') {
					const newEntry = {
						name: file.name,
						children: [],
						isFolder: true
					};
					currentDir.push(newEntry);
					return fetchDir(`${file.path}`, newEntry.children);
				}
				return Promise.resolve();
			}));
		});
	}
	const files = [];
	return fetchDir('', files).then(() => {
		return files;
	});
}
// CONCATENATED MODULE: ./utils.js






const utils_esprima = __webpack_require__("4E2n");

window.DEBUG = document.cookie.indexOf('wmdebug') > -1;
window.$ = document.querySelector.bind(document);

window.chrome = window.chrome || {};
window.chrome.i18n = {
	getMessage: () => {}
};

window.$all = selector => [...document.querySelectorAll(selector)];
window.IS_EXTENSION = !!window.chrome.extension;
const BASE_PATH = window.chrome.extension || window.DEBUG || "production" === 'development' ? '/' : '/app';

var alphaNum = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

/**
 * The following 2 functions are supposed to find the next/previous sibling until the
 * passed `selector` is matched. But for now it actually finds the next/previous
 * element of `this` element in the list of `selector` matched element inside `this`'s
 * parent.
 * @param  Selector that should match for next siblings
 * @return element Next element that mathes `selector`
 */
Node.prototype.nextUntil = function (selector) {
	const siblings = Array.from(this.parentNode.querySelectorAll(selector));
	const index = siblings.indexOf(this);
	return siblings[index + 1];
};

/*
 * @param  Selector that should match for next siblings
 * @return element Next element that mathes `selector`
 */
Node.prototype.previousUntil = function (selector) {
	const siblings = Array.from(this.parentNode.querySelectorAll(selector));
	const index = siblings.indexOf(this);
	return siblings[index - 1];
};

// Safari doesn't have this!
window.requestIdleCallback = window.requestIdleCallback || function (fn) {
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
	for (var i = length; i--;) {
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

function utils_log() {
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

	utils_esprima.parse(code, {
		tolerant: true,
		range: true,
		jsx: true
	}, function (node) {
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
	});

	/* eslint-disable no-param-reassign */
	patches.sort(function (a, b) {
		return b.pos - a.pos;
	}).forEach(function (patch) {
		code = code.slice(0, patch.pos) + patch.str + code.slice(patch.pos);
	});

	/* eslint-disable no-param-reassign */
	return code;
}

function getHumanDate(timestamp) {
	var d = new Date(timestamp);
	var retVal = d.getDate() + ' ' + ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][d.getMonth()] + ' ' + d.getFullYear();
	return retVal;
}

// create a one-time event
function once(node, type, callback) {
	// create event
	node.addEventListener(type, function (e) {
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
		return function () {
			utils_log(arguments);
			trackEvent('fn', 'error', type);
			// When there are too many write errors, show a message.
			writeFile.errorCount = (writeFile.errorCount || 0) + 1;
			if (writeFile.errorCount === 4) {
				setTimeout(function () {
					alert("Oops! Seems like your preview isn't updating. It's recommended to switch to the web app: https://webmakerapp.com/app/.\n\n If you still want to get the extension working, please try the following steps until it fixes:\n - Refresh Web Maker\n - Restart browser\n - Update browser\n - Reinstall Web Maker (don't forget to export all your creations from saved items pane (click the OPEN button) before reinstalling)\n\nIf nothing works, please tweet out to @webmakerApp.");
					trackEvent('ui', 'writeFileMessageSeen');
				}, 1000);
			}
		};
	}

	// utils.log('writing file ', name);
	window.webkitRequestFileSystem(window.TEMPORARY, 1024 * 1024 * 5, function (fs) {
		fs.root.getFile(name, {
			create: true
		}, function (fileEntry) {
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
		}, getErrorHandler('getFileFail'));
	}, getErrorHandler('webkitRequestFileSystemFail'));
}

function loadJS(src) {
	var d = deferred();
	var ref = window.document.getElementsByTagName('script')[0];
	var script = window.document.createElement('script');
	script.src = src;
	script.async = true;
	ref.parentNode.insertBefore(script, ref);
	script.onload = function () {
		d.resolve();
	};
	return d.promise;
}

function loadCss({ url, id }) {
	var d = deferred();
	var style = window.document.createElement('link');
	style.setAttribute('href', url);
	style.setAttribute('rel', 'stylesheet');
	if (id) {
		style.setAttribute('id', id);
	}
	document.head.appendChild(style);
	style.onload = function () {
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
	var externalJs = '',
	    externalCss = '';
	if (item.externalLibs) {
		externalJs = item.externalLibs.js.split('\n').reduce(function (scripts, url) {
			return scripts + (url ? '\n<script src="' + url + '"></script>' : '');
		}, '');
		externalCss = item.externalLibs.css.split('\n').reduce(function (links, url) {
			return links + (url ? '\n<link rel="stylesheet" href="' + url + '"></link>' : '');
		}, '');
	}
	var contents = '<!DOCTYPE html>\n' + '<html>\n<head>\n' + '<meta charset="UTF-8" />\n' + externalCss + '\n' + '<style id="webmakerstyle">\n' + css + '\n</style>\n' + '</head>\n' + '<body>\n' + html + '\n' + externalJs + '\n';

	if (!isForExport) {
		contents += '<script src="' + (chrome.extension ? chrome.extension.getURL('lib/screenlog.js') : `${location.origin}${window.DEBUG ? '' : BASE_PATH}/lib/screenlog.js`) + '"></script>';
	}

	if (item.jsMode === JsModes.ES6) {
		contents += '<script src="' + (chrome.extension ? chrome.extension.getURL('lib/transpilers/babel-polyfill.min.js') : `${location.origin}${BASE_PATH}/lib/transpilers/babel-polyfill.min.js`) + '"></script>';
	}

	if (typeof js === 'string') {
		contents += '<script>\n' + js + '\n//# sourceURL=userscript.js';
	} else {
		var origin = chrome.i18n.getMessage() ? `chrome-extension://${chrome.i18n.getMessage('@@extension_id')}` : `${location.origin}`;
		contents += '<script src="' + `filesystem:${origin}/temporary/script.js` + '">';
	}
	contents += '\n</script>\n</body>\n</html>';

	return contents;
}

function saveAsHtml(item) {
	var htmlPromise = computeHtml(item.html, item.htmlMode);
	var cssPromise = computeCss(item.css, item.cssMode);
	var jsPromise = computeJs(item.js, item.jsMode, false);
	Promise.all([htmlPromise, cssPromise, jsPromise]).then(result => {
		var html = result[0].code,
		    css = result[1].code,
		    js = result[2].code;

		var fileContent = getCompleteHtml(html, css, js, item, true);

		var d = new Date();
		var fileName = ['web-maker', d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()].join('-');

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

function handleDownloadsPermission() {
	var d = deferred();
	if (!window.IS_EXTENSION) {
		d.resolve();
		return d.promise;
	}
	chrome.permissions.contains({
		permissions: ['downloads']
	}, function (result) {
		if (result) {
			d.resolve();
		} else {
			chrome.permissions.request({
				permissions: ['downloads']
			}, function (granted) {
				if (granted) {
					trackEvent('fn', 'downloadsPermGiven');
					d.resolve();
				} else {
					d.reject();
				}
			});
		}
	});
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

function prettify({ file, content, type }) {
	const d = deferred();
	if (file) {
		type = getExtensionFromFileName(file.name);
		content = file.content;
	}
	const worker = new Worker(chrome.extension ? chrome.extension.getURL('lib/prettier-worker.js') : `${BASE_PATH !== '/' ? BASE_PATH : ''}/lib/prettier-worker.js`);
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
// CONCATENATED MODULE: ./analytics.js


/* global ga */

// eslint-disable-next-line max-params
function trackEvent(category, action, label, value) {
	if (window.DEBUG) {
		utils_log('trackevent', category, action, label, value);
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
				(i[r].q = i[r].q || []).push(arguments);
			}, i[r].l = 1 * new Date();
			a = s.createElement(o), m = s.getElementsByTagName(o)[0];
			a.async = 1;
			a.src = g;
			m.parentNode.insertBefore(a, m);
		})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

		if (location.href.indexOf('chrome-extension://') === -1) {
			ga('create', 'UA-87786708-1');
		} else {
			ga('create', 'UA-87786708-1', {
				'cookieDomain': 'none'
			});
			// required for chrome extension protocol
			ga('set', 'checkProtocolTask', function () {/* nothing */});
		}
		ga('send', 'pageview');
	}, 100);

	/* eslint-enable */
}
// CONCATENATED MODULE: ./components/common.jsx
var common__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }




let common_Clickable = class Clickable extends preact_min["Component"] {
	handleClick(e) {
		const el = e.currentTarget;
		trackEvent(el.getAttribute('data-event-category'), el.getAttribute('data-event-action'));
		this.props.onClick(e);
	}
	render() {
		/* eslint-disable no-unused-vars */
		const _props = this.props,
		      { onClick, Tag } = _props,
		      props = _objectWithoutProperties(_props, ['onClick', 'Tag']);
		/* eslint-enable no-unused-vars */

		return Object(preact_min["h"])(Tag, common__extends({ onClick: this.handleClick.bind(this) }, props));
	}
};


function A(props) {
	return Object(preact_min["h"])(common_Clickable, common__extends({ Tag: 'a' }, props));
}

function Button(props) {
	return Object(preact_min["h"])(common_Clickable, common__extends({ Tag: 'button' }, props));
}

function AutoFocusInput(props) {
	return Object(preact_min["h"])('input', common__extends({ ref: el => el && setTimeout(() => el.focus(), 100) }, props));
}

var _ref = Object(preact_min["h"])('div', { 'class': 'divider' });

function Divider(props) {
	return _ref;
}
// EXTERNAL MODULE: ../node_modules/@lingui/react/index.js
var react = __webpack_require__("L5wL");
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// CONCATENATED MODULE: ./components/MainHeader.jsx






const DEFAULT_PROFILE_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='#ccc' d='M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z' /%3E%3C/svg%3E";

var MainHeader__ref = Object(preact_min["h"])(
	'svg',
	{ style: 'width: 14px; height: 14px;' },
	Object(preact_min["h"])('use', { xlinkHref: '#play-icon' })
);

var _ref2 = Object(preact_min["h"])(react["Trans"], {
	id: 'Run'
});

var _ref3 = Object(preact_min["h"])(react["Trans"], {
	id: 'Add library'
});

var MainHeader__ref4 = Object(preact_min["h"])(
	'svg',
	{
		style: 'vertical-align:middle;width:14px;height:14px',
		viewBox: '0 0 24 24'
	},
	Object(preact_min["h"])('path', { d: 'M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z' })
);

var _ref5 = Object(preact_min["h"])(react["Trans"], {
	id: 'New'
});

var _ref6 = Object(preact_min["h"])(
	'svg',
	{
		style: 'vertical-align:middle;width:14px;height:14px',
		viewBox: '0 0 24 24'
	},
	Object(preact_min["h"])('path', { d: 'M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z' })
);

var _ref7 = Object(preact_min["h"])(
	'svg',
	{ 'class': 'btn-loader', width: '15', height: '15', stroke: '#fff' },
	Object(preact_min["h"])('use', { xlinkHref: '#loader-icon' })
);

var _ref8 = Object(preact_min["h"])(react["Trans"], {
	id: 'Save'
});

var _ref9 = Object(preact_min["h"])(
	'svg',
	{
		style: 'width:14px;height:14px;vertical-align:middle;',
		viewBox: '0 0 24 24'
	},
	Object(preact_min["h"])('path', { d: 'M13,9V3.5L18.5,9M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z' })
);

var _ref10 = Object(preact_min["h"])(
	'svg',
	{ 'class': 'btn-loader', width: '15', height: '15', stroke: '#fff' },
	Object(preact_min["h"])('use', { xlinkHref: '#loader-icon' })
);

var _ref11 = Object(preact_min["h"])(react["Trans"], {
	id: 'Open'
});

var _ref12 = Object(preact_min["h"])(react["Trans"], {
	id: 'Login'
});

var _ref13 = Object(preact_min["h"])(react["Trans"], {
	id: 'Signup'
});

function MainHeader(props) {
	return Object(preact_min["h"])(
		react["I18n"],
		null,
		({ i18n }) => Object(preact_min["h"])(
			'div',
			{ 'class': 'main-header' },
			Object(preact_min["h"])('input', {
				type: 'text',
				id: 'titleInput',
				title: 'Click to edit',
				'class': 'item-title-input',
				value: props.title,
				onBlur: props.titleInputBlurHandler
			}),
			Object(preact_min["h"])(
				'div',
				{ 'class': 'main-header__btn-wrap  flex  flex-v-center' },
				Object(preact_min["h"])(
					'button',
					{
						id: 'runBtn',
						'class': 'hide btn--dark flex flex-v-center hint--rounded hint--bottom-left',
						'aria-label': 'Run preview (Ctrl/\u2318 + Shift + 5)',
						onClick: props.runBtnClickHandler
					},
					MainHeader__ref,
					_ref2
				),
				!this.props.isFileMode && Object(preact_min["h"])(
					Button,
					{
						onClick: props.addLibraryBtnHandler,
						'data-event-category': 'ui',
						'data-event-action': 'addLibraryButtonClick',
						'class': 'btn--dark flex-v-center hint--rounded hint--bottom-left',
						'aria-label': i18n._( /*i18n*/{
							id: 'Add a JS/CSS library'
						})
					},
					_ref3,
					' ',
					Object(preact_min["h"])(
						'span',
						{
							id: 'js-external-lib-count',
							style: `display:${props.externalLibCount ? 'inline' : 'none'}`,
							'class': 'count-label'
						},
						props.externalLibCount
					)
				),
				Object(preact_min["h"])(
					'button',
					{
						'class': 'btn--dark flex  flex-v-center hint--rounded hint--bottom-left',
						'aria-label': 'Start a new creation',
						onClick: props.newBtnHandler
					},
					MainHeader__ref4,
					_ref5
				),
				Object(preact_min["h"])(
					'button',
					{
						id: 'saveBtn',
						'class': `btn--dark flex  flex-v-center hint--rounded hint--bottom-left ${props.isSaving ? 'is-loading' : ''} ${props.unsavedEditCount ? 'is-marked' : 0}`,
						'aria-label': 'Save current creation (Ctrl/\u2318 + S)',
						onClick: props.saveBtnHandler
					},
					_ref6,
					_ref7,
					_ref8
				),
				Object(preact_min["h"])(
					'button',
					{
						id: 'openItemsBtn',
						'class': `btn--dark flex flex-v-center hint--rounded hint--bottom-left ${props.isFetchingItems ? 'is-loading' : ''}`,
						'aria-label': 'Open a saved creation (Ctrl/\u2318 + O)',
						onClick: props.openBtnHandler
					},
					_ref9,
					_ref10,
					_ref11
				),
				Object(preact_min["h"])(
					Button,
					{
						onClick: props.loginBtnHandler,
						'data-event-category': 'ui',
						'data-event-action': 'loginButtonClick',
						'class': 'hide-on-login btn--dark flex  flex-v-center  hint--rounded  hint--bottom-left',
						'aria-label': 'Login/Signup'
					},
					_ref12,
					'/',
					_ref13
				),
				Object(preact_min["h"])(
					Button,
					{
						onClick: props.profileBtnHandler,
						'data-event-category': 'ui',
						'data-event-action': 'headerAvatarClick',
						'aria-label': 'See profile or Logout',
						'class': 'hide-on-logout btn--dark hint--rounded  hint--bottom-left'
					},
					Object(preact_min["h"])('img', {
						id: 'headerAvatarImg',
						width: '20',
						src: props.user ? props.user.photoURL || DEFAULT_PROFILE_IMG : '',
						'class': 'main-header__avatar-img'
					})
				)
			)
		)
	);
}
// EXTERNAL MODULE: ../node_modules/codemirror/lib/codemirror.js
var codemirror = __webpack_require__("tQq4");
var codemirror_default = /*#__PURE__*/__webpack_require__.n(codemirror);

// CONCATENATED MODULE: ./CodeMirror.js
// Most of the code from this file comes from:
// https://github.com/codemirror/CodeMirror/blob/master/addon/mode/loadmode.js


// Make CodeMirror available globally so the modes' can register themselves.
window.CodeMirror = codemirror_default.a;

if (!codemirror_default.a.modeURL) codemirror_default.a.modeURL = 'lib/codemirror/mode/%N/%N.js';

var loading = {};

function splitCallback(cont, n) {
	var countDown = n;
	return function () {
		if (--countDown === 0) cont();
	};
}

function ensureDeps(mode, cont) {
	var deps = codemirror_default.a.modes[mode].dependencies;
	if (!deps) return cont();
	var missing = [];
	for (var i = 0; i < deps.length; ++i) {
		if (!codemirror_default.a.modes.hasOwnProperty(deps[i])) missing.push(deps[i]);
	}
	if (!missing.length) return cont();
	var split = splitCallback(cont, missing.length);
	for (i = 0; i < missing.length; ++i) codemirror_default.a.requireMode(missing[i], split);
}

codemirror_default.a.requireMode = function (mode, cont) {
	if (typeof mode !== 'string') mode = mode.name;
	if (codemirror_default.a.modes.hasOwnProperty(mode)) return ensureDeps(mode, cont);
	if (loading.hasOwnProperty(mode)) return loading[mode].push(cont);

	var file = codemirror_default.a.modeURL.replace(/%N/g, mode);

	var script = document.createElement('script');
	script.src = file;
	var others = document.getElementsByTagName('script')[0];
	var list = loading[mode] = [cont];

	codemirror_default.a.on(script, 'load', function () {
		ensureDeps(mode, function () {
			for (var i = 0; i < list.length; ++i) list[i]();
		});
	});

	others.parentNode.insertBefore(script, others);
};

codemirror_default.a.autoLoadMode = function (instance, mode) {
	if (codemirror_default.a.modes.hasOwnProperty(mode)) return;

	codemirror_default.a.requireMode(mode, function () {
		instance.setOption('mode', instance.getOption('mode'));
	});
};

/* harmony default export */ var CodeMirror = (codemirror_default.a);
// EXTERNAL MODULE: ../node_modules/codemirror/addon/edit/matchbrackets.js
var matchbrackets = __webpack_require__("uQIK");
var matchbrackets_default = /*#__PURE__*/__webpack_require__.n(matchbrackets);

// EXTERNAL MODULE: ../node_modules/codemirror/addon/edit/matchtags.js
var matchtags = __webpack_require__("xdvC");
var matchtags_default = /*#__PURE__*/__webpack_require__.n(matchtags);

// EXTERNAL MODULE: ../node_modules/codemirror/addon/edit/closebrackets.js
var closebrackets = __webpack_require__("pTe4");
var closebrackets_default = /*#__PURE__*/__webpack_require__.n(closebrackets);

// EXTERNAL MODULE: ../node_modules/codemirror/addon/edit/closetag.js
var closetag = __webpack_require__("BVSg");
var closetag_default = /*#__PURE__*/__webpack_require__.n(closetag);

// EXTERNAL MODULE: ../node_modules/codemirror/addon/comment/comment.js
var comment = __webpack_require__("X7my");
var comment_default = /*#__PURE__*/__webpack_require__.n(comment);

// EXTERNAL MODULE: ../node_modules/codemirror/addon/fold/foldcode.js
var foldcode = __webpack_require__("H+g/");
var foldcode_default = /*#__PURE__*/__webpack_require__.n(foldcode);

// EXTERNAL MODULE: ../node_modules/codemirror/addon/fold/foldgutter.js
var foldgutter = __webpack_require__("tMLt");
var foldgutter_default = /*#__PURE__*/__webpack_require__.n(foldgutter);

// EXTERNAL MODULE: ../node_modules/codemirror/addon/fold/xml-fold.js
var xml_fold = __webpack_require__("1JcR");
var xml_fold_default = /*#__PURE__*/__webpack_require__.n(xml_fold);

// EXTERNAL MODULE: ../node_modules/codemirror/addon/fold/indent-fold.js
var indent_fold = __webpack_require__("5gBI");
var indent_fold_default = /*#__PURE__*/__webpack_require__.n(indent_fold);

// EXTERNAL MODULE: ../node_modules/codemirror/addon/fold/comment-fold.js
var comment_fold = __webpack_require__("bU21");
var comment_fold_default = /*#__PURE__*/__webpack_require__.n(comment_fold);

// EXTERNAL MODULE: ../node_modules/codemirror/addon/fold/brace-fold.js
var brace_fold = __webpack_require__("zs1I");
var brace_fold_default = /*#__PURE__*/__webpack_require__.n(brace_fold);

// EXTERNAL MODULE: ../node_modules/codemirror/addon/hint/show-hint.js
var show_hint = __webpack_require__("rbVD");
var show_hint_default = /*#__PURE__*/__webpack_require__.n(show_hint);

// EXTERNAL MODULE: ../node_modules/codemirror/addon/hint/javascript-hint.js
var javascript_hint = __webpack_require__("6r0S");
var javascript_hint_default = /*#__PURE__*/__webpack_require__.n(javascript_hint);

// EXTERNAL MODULE: ../node_modules/codemirror/addon/hint/xml-hint.js
var xml_hint = __webpack_require__("LiPu");
var xml_hint_default = /*#__PURE__*/__webpack_require__.n(xml_hint);

// EXTERNAL MODULE: ../node_modules/codemirror/addon/hint/html-hint.js
var html_hint = __webpack_require__("IYZm");
var html_hint_default = /*#__PURE__*/__webpack_require__.n(html_hint);

// EXTERNAL MODULE: ../node_modules/codemirror/addon/hint/css-hint.js
var css_hint = __webpack_require__("SUmx");
var css_hint_default = /*#__PURE__*/__webpack_require__.n(css_hint);

// EXTERNAL MODULE: ../node_modules/codemirror/addon/selection/active-line.js
var active_line = __webpack_require__("gPKv");
var active_line_default = /*#__PURE__*/__webpack_require__.n(active_line);

// EXTERNAL MODULE: ../node_modules/codemirror/addon/search/searchcursor.js
var searchcursor = __webpack_require__("29F7");
var searchcursor_default = /*#__PURE__*/__webpack_require__.n(searchcursor);

// EXTERNAL MODULE: ../node_modules/codemirror/addon/search/search.js
var search_search = __webpack_require__("Jo/m");
var search_default = /*#__PURE__*/__webpack_require__.n(search_search);

// EXTERNAL MODULE: ../node_modules/codemirror/addon/dialog/dialog.js
var dialog = __webpack_require__("4e7A");
var dialog_default = /*#__PURE__*/__webpack_require__.n(dialog);

// EXTERNAL MODULE: ../node_modules/codemirror/addon/search/jump-to-line.js
var jump_to_line = __webpack_require__("ew/s");
var jump_to_line_default = /*#__PURE__*/__webpack_require__.n(jump_to_line);

// EXTERNAL MODULE: ../node_modules/codemirror/mode/xml/xml.js
var xml = __webpack_require__("HeB0");
var xml_default = /*#__PURE__*/__webpack_require__.n(xml);

// EXTERNAL MODULE: ../node_modules/codemirror/mode/css/css.js
var css_css = __webpack_require__("ggoL");
var css_default = /*#__PURE__*/__webpack_require__.n(css_css);

// EXTERNAL MODULE: ../node_modules/codemirror/mode/javascript/javascript.js
var javascript = __webpack_require__("qqFR");
var javascript_default = /*#__PURE__*/__webpack_require__.n(javascript);

// EXTERNAL MODULE: ../node_modules/codemirror/mode/htmlmixed/htmlmixed.js
var htmlmixed = __webpack_require__("AIXc");
var htmlmixed_default = /*#__PURE__*/__webpack_require__.n(htmlmixed);

// EXTERNAL MODULE: ../node_modules/codemirror/keymap/sublime.js
var sublime = __webpack_require__("Xc2M");
var sublime_default = /*#__PURE__*/__webpack_require__.n(sublime);

// EXTERNAL MODULE: ../node_modules/codemirror/keymap/vim.js
var vim = __webpack_require__("yLr7");
var vim_default = /*#__PURE__*/__webpack_require__.n(vim);

// EXTERNAL MODULE: ../node_modules/code-blast-codemirror/code-blast.js
var code_blast = __webpack_require__("AhD2");
var code_blast_default = /*#__PURE__*/__webpack_require__.n(code_blast);

// EXTERNAL MODULE: ../node_modules/@emmetio/codemirror-plugin/dist/emmet-codemirror-plugin.es.js + 23 modules
var emmet_codemirror_plugin_es = __webpack_require__("/QFk");

// CONCATENATED MODULE: ./components/CodeEditor.jsx
var CodeEditor__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };








































Object(emmet_codemirror_plugin_es["a" /* default */])(CodeMirror);
let monacoDepsDeferred;

window.MonacoEnvironment = {
	getWorkerUrl(moduleId, label) {
		switch (label) {
			case 'html':
				return 'lib/monaco/workers/html.worker.bundle.js';
			case 'json':
				return 'lib/monaco/workers/json.worker.bundle.js';
			case 'css':
			case 'scss':
			case 'less':
				return 'lib/monaco/workers/css.worker.bundle.js';
			case 'typescript':
			case 'javascript':
				return 'lib/monaco/workers/ts.worker.bundle.js';
			default:
				return 'lib/monaco/workers/editor.worker.bundle.js';
		}
	}
};

let CodeEditor_CodeEditor = class CodeEditor extends preact_min["Component"] {
	componentDidMount() {
		this.initEditor();
	}
	shouldComponentUpdate(nextProps) {
		if (nextProps.prefs !== this.props.prefs) {
			const { prefs } = nextProps;

			if (this.props.type === 'monaco') {
				this.instance.updateOptions({ fontSize: prefs.fontSize });
			} else {
				this.instance.setOption('indentWithTabs', prefs.indentWith !== 'spaces');
				this.instance.setOption('blastCode', prefs.isCodeBlastOn ? { effect: 2, shake: false } : false);
				this.instance.setOption('theme', prefs.editorTheme);

				this.instance.setOption('indentUnit', +prefs.indentSize);
				this.instance.setOption('tabSize', +prefs.indentSize);

				this.instance.setOption('keyMap', prefs.keymap);
				this.instance.setOption('lineWrapping', prefs.lineWrap);
				this.instance.setOption('lineWrapping', prefs.autoCloseTags);

				this.instance.refresh();
			}
		}

		// Only condition when this component updates is when prop.type changes
		if (nextProps.type !== this.props.type) {
			if (this.node.parentElement.querySelector('.monaco-editor, .CodeMirror')) {
				this.node.parentElement.querySelector('.monaco-editor, .CodeMirror').remove();
			}

			return true;
		}

		return false;
	}
	componentDidUpdate(prevProps) {
		// prop.type changed, reinit the editor
		this.initEditor();
	}
	setModel(model) {
		this.editorReadyDeferred.promise.then(() => {
			this.instance.swapDoc ? this.instance.swapDoc(model) : this.instance.setModel(model);
		});
	}
	setValue(value) {
		// HACK: We set a flag on window for an ultra-short duration, which 'change'
		// listener uses to set the change.origin to 'setValue', otherwise it's
		// '+input'
		if (this.props.type === 'monaco') {
			window.monacoSetValTriggered = true;
			setTimeout(() => {
				window.monacoSetValTriggered = false;
			}, 1);
		}
		this.instance.setValue(value);
		// We save last set value so that when editor type changes, we can
		// populate that last value
		this.lastSetValue = value;
		this.refresh();
	}
	getValue() {
		return this.instance.getValue();
	}
	saveViewState() {
		if (this.props.type === 'monaco') {
			return this.instance.saveViewState();
		}
	}
	restoreViewState(state) {
		if (this.props.type === 'monaco') {
			this.instance.restoreViewState(state);
		}
	}
	setOption(option, value) {
		if (this.props.type === 'monaco') {
			this.editorReadyDeferred.promise.then(() => {
				this.instance.updateOptions({ [option]: value });
			});
		} else {
			this.instance.setOption(option, value);
		}
	}
	setLanguage(value) {
		if (!window.monaco) return;

		this.editorReadyDeferred.promise.then(() => {
			if (this.props.type === 'monaco') {
				monaco.editor.setModelLanguage(this.instance.getModel(), this.getMonacoLanguageFromMode(modes[value].cmMode));
			} else {
				this.instance.setOption('mode', modes[value].cmMode);
				CodeMirror.autoLoadMode(this.instance, modes[value].cmPath || modes[value].cmMode);
			}
		});
	}

	clearGutter(gutterName) {
		this.editorReadyDeferred.promise.then(() => {
			if (this.instance.clearGutter) {
				this.instance.clearGutter(gutterName);
			}
		});
	}

	showErrors(errors) {
		if (this.props.type === 'codemirror') {
			errors.forEach(function (error) {
				this.instance.operation(function () {
					var n = document.createElement('div');
					n.setAttribute('data-title', error.message);
					n.classList.add('gutter-error-marker');
					editor.setGutterMarker(error.lineNumber, 'error-gutter', n);
				});
			});
		}
	}

	refresh() {
		this.editorReadyDeferred.promise.then(() => {
			this.instance.refresh ? this.instance.refresh() : this.instance.layout();
		});
	}
	focus() {
		this.editorReadyDeferred.promise.then(() => {
			this.instance.focus();
		});
	}

	/**
  * Converts codemirror mode value to monaco language values.
  * TODO: Refactor to not be codemirror related.
  * @param {string} mode Codemirror mode value
  */
	getMonacoLanguageFromMode(mode) {
		if (['htmlmixed'].includes(mode)) {
			return 'html';
		}
		if (['css', 'sass', 'scss', 'less', 'stylus'].includes(mode)) {
			return 'css';
		}
		if (['javascript', 'text/typescript-jsx', 'jsx'].includes(mode)) {
			return 'javascript';
		}
		return mode;
	}

	/**
  * Loads the asynchronous deps according to the editor type.
  */
	async loadDeps() {
		if (this.props.type === 'monaco') {
			if (!monacoDepsDeferred) {
				monacoDepsDeferred = deferred();
				loadCss({ url: 'lib/monaco/monaco.css', id: 'monaco-css' });
				__webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, "lbPO")).then(() => {
					monacoDepsDeferred.resolve();
				});
			}
			return monacoDepsDeferred.promise;
		}
		return Promise.resolve();
	}

	async initEditor() {
		console.log('init editor');

		this.editorReadyDeferred = deferred();
		await this.loadDeps();

		const { options, prefs } = this.props;
		if (this.props.type === 'monaco') {
			this.instance = monaco.editor.create(this.node, {
				language: this.getMonacoLanguageFromMode(options.mode),
				value: this.lastSetValue || '',
				roundedSelection: false,
				scrollBeyondLastLine: false,
				theme: 'vs-dark',
				fontSize: prefs.fontSize,
				minimap: {
					enabled: false
				},
				wordWrap: 'on',
				renderWhitespace: 'all',
				fontLigatures: true,
				automaticLayout: true
			});
			window.monacoInstance = this.instance;
			this.instance.onDidChangeModelContent(change => {
				this.props.onChange(this.instance, CodeEditor__extends({}, change, {
					origin: window.monacoSetValTriggered ? 'setValue' : '+input'
				}));
			});
			this.instance.addCommand(monaco.KeyMod.WinCtrl | monaco.KeyMod.Shift | monaco.KeyCode.KEY_F, () => {
				if (options.prettier) {
					prettify({
						content: this.instance.getValue(),
						type: options.prettierParser
					}).then(formattedCode => this.instance.setValue(formattedCode));
				}
			});
			this.editorReadyDeferred.resolve();
		} else {
			this.instance = CodeMirror.fromTextArea(this.node, {
				mode: options.mode,
				value: this.lastSetValue || '',
				lineNumbers: true,
				lineWrapping: !!prefs.lineWrap,
				autofocus: options.autofocus || false,
				autoCloseBrackets: true,
				autoCloseTags: !!prefs.autoCloseTags,
				matchBrackets: true,
				matchTags: options.matchTags || false,
				tabMode: 'indent',
				keyMap: prefs.keyMap || 'sublime',
				theme: prefs.editorTheme || 'monokai',
				lint: !!options.lint,
				tabSize: +prefs.indentSize || 2,
				indentWithTabs: prefs.indentWith !== 'spaces',
				indentUnit: +prefs.indentSize,
				foldGutter: true,
				styleActiveLine: true,
				gutters: options.gutters || [],
				// cursorScrollMargin: '20', has issue with scrolling
				profile: options.profile || '',
				extraKeys: {
					Up: function (editor) {
						// Stop up/down keys default behavior when saveditempane is open
						// if (isSavedItemsPaneOpen) {
						// return;
						// }
						CodeMirror.commands.goLineUp(editor);
					},
					Down: function (editor) {
						// if (isSavedItemsPaneOpen) {
						// return;
						// }
						CodeMirror.commands.goLineDown(editor);
					},
					'Shift-Tab': function (editor) {
						CodeMirror.commands.indentAuto(editor);
					},
					'Shift-Ctrl-F': function (editor) {
						if (options.prettier) {
							prettify({
								content: editor.getValue(),
								type: options.prettierParser
							}).then(formattedCode => editor.setValue(formattedCode));
						}
					},
					Tab: function (editor) {
						if (options.emmet) {
							const didEmmetWork = editor.execCommand('emmetExpandAbbreviation');
							if (didEmmetWork === true) {
								return;
							}
							const input = $('[data-setting=indentWith]:checked');
							if (!editor.somethingSelected() && (!prefs.indentWith || prefs.indentWith === 'spaces')) {
								// softtabs adds spaces. This is required because by default tab key will put tab, but we want
								// to indent with spaces if `spaces` is preferred mode of indentation.
								// `somethingSelected` needs to be checked otherwise, all selected code is replaced with softtab.
								CodeMirror.commands.insertSoftTab(editor);
							} else {
								CodeMirror.commands.defaultTab(editor);
							}
						}
					},
					Enter: 'emmetInsertLineBreak'
				}
			});
			this.editorReadyDeferred.resolve();

			this.instance.on('focus', editor => {
				if (typeof this.props.onFocus === 'function') this.props.onFocus(editor);
			});
			this.instance.on('change', this.props.onChange);
			this.instance.addKeyMap({
				'Ctrl-Space': 'autocomplete'
			});
			this.instance.on('inputRead', (editor, input) => {
				// Process further If this has autocompletition on and also the global
				// autocomplete setting is on.
				if (!this.props.options.noAutocomplete && this.props.prefs.autoComplete) {
					if (input.origin !== '+input' || input.text[0] === ';' || input.text[0] === ',' || input.text[0] === ' ') {
						return;
					}
					CodeMirror.commands.autocomplete(editor, null, {
						completeSingle: false
					});
				}
			});
		}

		// this.props.onCreation(this.instance);
	}

	render() {
		const node = this.props.type === 'monaco' ? Object(preact_min["h"])('div', { ref: el => this.node = el, style: 'width:100%;height:100%;' }) : Object(preact_min["h"])('textarea', { ref: el => this.node = el });
		return node;
	}
};

// EXTERNAL MODULE: ../node_modules/split.js/split.js
var split_js_split = __webpack_require__("mSND");
var split_default = /*#__PURE__*/__webpack_require__.n(split_js_split);

// CONCATENATED MODULE: ./components/SplitPane.jsx
var SplitPane__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



function SplitPane__objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }




let SplitPane_SplitPane = class SplitPane extends preact_min["Component"] {
	componentDidMount() {
		this.updateSplit();
	}
	componentWillUpdate() {
		if (this.splitInstance) {
			this.splitInstance.destroy();
		}
	}
	componentDidUpdate(prevProps) {
		if (this.hasGutter() && !this.hasPropsChanged(prevProps, this.props)) {
			return;
		}
		this.updateSplit();
	}
	componentWillUnmount() {
		this.splitInstance.destroy();
		delete this.splitInstance;
	}
	hasGutter() {
		return [...this.parent.children].indexOf(this.parent.querySelector('.gutter')) !== -1;
	}
	hasPropsChanged(a, b) {
		return a.direction !== b.direction || a.sizes && b.sizes && a.sizes.join('') !== b.sizes.join('');
	}
	updateSplit() {
		const _props = this.props,
		      { children } = _props,
		      options = SplitPane__objectWithoutProperties(_props, ['children']);
		options.gutterSize = 6;

		/* eslint-disable new-cap */
		this.splitInstance = split_default()([...this.parent.children], options);

		/* eslint-enable new-cap */

		if (this.props.onSplit) {
			this.props.onSplit(this.splitInstance);
		}
	}
	render() {
		/* eslint-disable no-unused-vars */
		const _props2 = this.props,
		      { children } = _props2,
		      props = SplitPane__objectWithoutProperties(_props2, ['children']);
		/* eslint-enable no-unused-vars */

		return Object(preact_min["h"])(
			'div',
			SplitPane__extends({ ref: el => this.parent = el }, props),
			this.props.children
		);
	}
};
// EXTERNAL MODULE: ../node_modules/react-inspector/lib/index.js
var react_inspector_lib = __webpack_require__("Hxgu");
var lib_default = /*#__PURE__*/__webpack_require__.n(react_inspector_lib);

// EXTERNAL MODULE: ../node_modules/preact-compat/dist/preact-compat.es.js
var preact_compat_es = __webpack_require__("eW0v");

// CONCATENATED MODULE: ./components/Console.jsx
var Console__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };








let Console_LogRow = class LogRow extends preact_min["Component"] {
	shouldComponentUpdate() {
		return false;
	}
	render() {
		const theme = Console__extends({}, react_inspector_lib["chromeDark"], {
			OBJECT_VALUE_STRING_COLOR: 'green',
			BASE_FONT_SIZE: '20px',
			TREENODE_FONT_SIZE: '20px'
		});

		return Object(preact_min["h"])(react_inspector_lib["Inspector"], { theme: theme, theme: 'chromeDark', data: this.props.data });
	}
};

var Console__ref = Object(preact_min["h"])(react["Trans"], {
	id: 'Console'
});

var Console__ref2 = Object(preact_min["h"])(
	'svg',
	null,
	Object(preact_min["h"])('use', { xlinkHref: '#cancel-icon' })
);

var Console__ref3 = Object(preact_min["h"])(
	'svg',
	{ width: '18', height: '18', fill: '#346fd2' },
	Object(preact_min["h"])('use', { xlinkHref: '#chevron-icon' })
);

let Console_Console = class Console extends preact_compat_es["PureComponent"] {
	componentWillUpdate(nextProps) {
		if (nextProps.logs != this.props.logs) {
			// Scroll down after new log dom is inserted
			setTimeout(() => {
				this.logContainerEl.scrollTop = this.logContainerEl.scrollHeight;
			}, 1);
		}
	}
	render() {
		const {
			logs,
			isConsoleOpen,
			onConsoleHeaderDblClick,
			onClearConsoleBtnClick,
			toggleConsole,
			onEvalInputKeyup
		} = this.props;

		return Object(preact_min["h"])(
			'div',
			{
				id: 'consoleEl',
				'class': `console ${isConsoleOpen ? '' : 'is-minimized'}`
			},
			Object(preact_min["h"])(
				'div',
				{ id: 'consoleLogEl', 'class': 'console__log' },
				Object(preact_min["h"])(
					'div',
					{
						'class': 'js-console__header  code-wrap__header',
						title: 'Double click to toggle console',
						onDblClick: onConsoleHeaderDblClick
					},
					Object(preact_min["h"])(
						'span',
						{ 'class': 'code-wrap__header-label' },
						Console__ref,
						' (',
						Object(preact_min["h"])(
							'span',
							null,
							logs.length
						),
						')'
					),
					Object(preact_min["h"])(
						'div',
						{ 'class': 'code-wrap__header-right-options' },
						Object(preact_min["h"])(
							'a',
							{
								'class': 'code-wrap__header-btn',
								title: 'Clear console (CTRL + L)',
								onClick: onClearConsoleBtnClick
							},
							Console__ref2
						),
						Object(preact_min["h"])('a', {
							'class': 'code-wrap__header-btn  code-wrap__collapse-btn',
							title: 'Toggle console',
							onClick: toggleConsole
						})
					)
				),
				Object(preact_min["h"])(
					'ul',
					{
						'class': 'console__items',
						ref: el => {
							this.logContainerEl = el;
						}
					},
					logs.map(log => Object(preact_min["h"])(Console_LogRow, { data: log }))
				)
			),
			Object(preact_min["h"])(
				'div',
				{
					id: 'consolePromptEl',
					'class': 'console__prompt flex flex-v-center flex-shrink-0'
				},
				Console__ref3,
				Object(preact_min["h"])('input', {
					tabIndex: isConsoleOpen ? 0 : -1,
					onKeyUp: onEvalInputKeyup,
					'class': 'console-exec-input'
				})
			)
		);
	}
};
// EXTERNAL MODULE: ../node_modules/preact-portal/dist/preact-portal.js
var preact_portal = __webpack_require__("q6qL");
var preact_portal_default = /*#__PURE__*/__webpack_require__.n(preact_portal);

// CONCATENATED MODULE: ./components/Modal.jsx




let Modal_Modal = class Modal extends preact_min["Component"] {
	componentDidMount() {
		window.addEventListener('keydown', this.onKeyDownHandler.bind(this));
	}
	componentWillUnmount() {
		window.removeEventListener('keydown', this.onKeyDownHandler.bind(this));
		if (this.focusGrabber) {
			this.focusGrabber.remove();
			this.focusGrabber = null;
		}
	}
	onKeyDownHandler(e) {
		if (e.keyCode === 27) {
			this.props.closeHandler();
		}
	}
	onOverlayClick(e) {
		if (e.target === this.overlayEl) {
			this.props.closeHandler();
		}
	}
	componentDidUpdate(prevProps) {
		if (this.props.show !== prevProps.show) {
			if (!this.props.noOverlay) {
				document.body.classList[this.props.show ? 'add' : 'remove']('overlay-visible');
			}
			if (this.props.show) {
				// HACK: refs will evaluate on next tick due to portals
				setTimeout(() => {
					const closeButton = this.overlayEl.querySelector('.js-modal__close-btn');
					if (closeButton) {
						closeButton.focus();
					}
				}, 0);

				/* We insert a dummy hidden input which will take focus as soon as focus
    escapes the modal, instead of focus going outside modal because modal
    is last focusable element. */
				this.focusGrabber = document.createElement('input');
				this.focusGrabber.setAttribute('style', 'height:0;opacity:0;overflow:hidden;width:0;');
				setTimeout(() => {
					document.body.appendChild(this.focusGrabber);
				}, 10);
			} else {
				this.focusGrabber.remove();
				this.focusGrabber = null;
			}
		}
	}
	render() {
		if (!this.props.show) return null;

		return Object(preact_min["h"])(
			preact_portal_default.a,
			{ into: 'body' },
			Object(preact_min["h"])(
				'div',
				{
					'class': `${this.props.extraClasses || ''} modal is-modal-visible ${this.props.small ? 'modal--small' : ''}`,
					ref: el => this.overlayEl = el,
					onClick: this.onOverlayClick.bind(this)
				},
				Object(preact_min["h"])(
					'div',
					{ 'class': 'modal__content' },
					this.props.hideCloseButton ? null : Object(preact_min["h"])(
						'button',
						{
							type: 'button',
							onClick: this.props.closeHandler,
							'aria-label': 'Close modal',
							title: 'Close',
							'class': 'js-modal__close-btn modal__close-btn'
						},
						'Close'
					),
					this.props.children
				)
			)
		);
	}
};

// CONCATENATED MODULE: ./components/CodeMirrorBox.jsx






let CodeMirrorBox_CodeMirrorBox = class CodeMirrorBox extends preact_min["Component"] {
	componentDidMount() {
		this.initEditor();
	}
	shouldComponentUpdate() {
		return false;
	}

	initEditor() {
		this.cm = CodeMirror.fromTextArea(this.textarea, this.props.options);
		if (this.props.onChange) {
			this.cm.on('change', this.props.onChange);
		}
		if (this.props.onBlur) {
			this.cm.on('blur', this.props.onBlur);
		}
		this.props.onCreation(this.cm);
	}

	render() {
		return Object(preact_min["h"])('textarea', {
			ref: el => this.textarea = el,
			name: '',
			id: '',
			cols: '30',
			rows: '10'
		});
	}
};

// CONCATENATED MODULE: ./components/CssSettingsModal.jsx





var CssSettingsModal__ref = Object(preact_min["h"])(
	'h1',
	null,
	'Atomic CSS Settings'
);

var CssSettingsModal__ref2 = Object(preact_min["h"])(
	'h3',
	null,
	'Configure Atomizer settings.',
	' ',
	Object(preact_min["h"])(
		'a',
		{
			href: 'https://github.com/acss-io/atomizer#api',
			target: '_blank',
			rel: 'noopener noreferrer'
		},
		'Read more'
	),
	' ',
	'about available settings.'
);

let CssSettingsModal_CssSettingsModal = class CssSettingsModal extends preact_min["Component"] {
	componentDidUpdate() {
		if (this.props.show) {
			setTimeout(() => {
				if (this.props.settings) {
					this.cm.setValue(this.props.settings.acssConfig);
				}

				// Refresh is required because codemirror gets scaled inside modal and loses alignement.
				this.cm.refresh();
				this.cm.focus();
			}, 500);
		}
	}
	render() {
		return Object(preact_min["h"])(
			Modal_Modal,
			{ show: this.props.show, closeHandler: this.props.closeHandler },
			CssSettingsModal__ref,
			CssSettingsModal__ref2,
			Object(preact_min["h"])(
				'div',
				{ style: 'height: calc(100vh - 350px);' },
				Object(preact_min["h"])(CodeMirrorBox_CodeMirrorBox, {
					options: {
						mode: 'application/ld+json',
						theme: this.props.editorTheme
					},
					onCreation: cm => this.cm = cm,
					onBlur: cm => this.props.onChange(cm.getValue())
				})
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': 'flex flex-h-end' },
				Object(preact_min["h"])(
					'button',
					{ 'class': 'btn btn--primary', onClick: this.props.closeHandler },
					'Apply and Close'
				)
			)
		);
	}
};

// CONCATENATED MODULE: ./components/PreviewDimension.jsx
var PreviewDimension__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





/**
 * This component udpates not through props or state, but by some parent
 * component calling a method of this component directly. This is because
 * using the state/prop way causes a huge unnnecessary rendering as this
 * component gets updated on drag event.
 */
const HIDE_AFTER_MILLISECONDS = 1000;
let PreviewDimension_PreviewDimension = class PreviewDimension extends preact_compat_es["PureComponent"] {
	constructor(props) {
		super(props);
		this.state = { w: 0, h: 0, isVisible: false };
	}
	update(dimensions) {
		this.setState(PreviewDimension__extends({ isVisible: true }, dimensions));
		if (this.hideTimer) {
			clearTimeout(this.hideTimer);
		}

		/**
   * Automatically hide this commponent after sometime and also show
   * when its updated (code above).
   */
		this.hideTimer = setTimeout(() => {
			this.setState({ isVisible: false });
		}, HIDE_AFTER_MILLISECONDS);
	}
	render() {
		if (!this.state.isVisible) return null;
		return Object(preact_min["h"])(
			'div',
			{ 'class': 'preview-dimension' },
			this.state.w,
			'px \u2A2F ',
			this.state.h,
			'px'
		);
	}
};
// CONCATENATED MODULE: ./components/ContentWrap.jsx













const minCodeWrapSize = 33;

/* global htmlCodeEl
 */

var ContentWrap__ref = Object(preact_min["h"])('span', { 'class': 'caret' });

var ContentWrap__ref2 = Object(preact_min["h"])(
	'option',
	{ value: 'html' },
	'HTML'
);

var ContentWrap__ref3 = Object(preact_min["h"])(
	'option',
	{ value: 'markdown' },
	'Markdown'
);

var ContentWrap__ref4 = Object(preact_min["h"])(
	'option',
	{ value: 'jade' },
	'Pug'
);

var ContentWrap__ref5 = Object(preact_min["h"])('span', { 'class': 'caret' });

var ContentWrap__ref6 = Object(preact_min["h"])(
	'option',
	{ value: 'css' },
	'CSS'
);

var ContentWrap__ref7 = Object(preact_min["h"])(
	'option',
	{ value: 'scss' },
	'SCSS'
);

var ContentWrap__ref8 = Object(preact_min["h"])(
	'option',
	{ value: 'sass' },
	'SASS'
);

var ContentWrap__ref9 = Object(preact_min["h"])(
	'option',
	{ value: 'less' },
	'LESS'
);

var ContentWrap__ref10 = Object(preact_min["h"])(
	'option',
	{ value: 'stylus' },
	'Stylus'
);

var ContentWrap__ref11 = Object(preact_min["h"])(
	'option',
	{ value: 'acss' },
	'Atomic CSS'
);

var ContentWrap__ref12 = Object(preact_min["h"])(
	'svg',
	null,
	Object(preact_min["h"])('use', { xlinkHref: '#settings-icon' })
);

var ContentWrap__ref13 = Object(preact_min["h"])('span', { 'class': 'caret' });

var _ref14 = Object(preact_min["h"])(
	'option',
	{ value: 'js' },
	'JS'
);

var _ref15 = Object(preact_min["h"])(
	'option',
	{ value: 'coffee' },
	'CoffeeScript'
);

var _ref16 = Object(preact_min["h"])(
	'option',
	{ value: 'es6' },
	'ES6 (Babel)'
);

var _ref17 = Object(preact_min["h"])(
	'option',
	{ value: 'typescript' },
	'TypeScript'
);

let ContentWrap_ContentWrap = class ContentWrap extends preact_min["Component"] {
	constructor(props) {
		super(props);
		this.state = {
			isConsoleOpen: false,
			isCssSettingsModalOpen: false,
			logs: []
		};

		this.updateTimer = null;
		this.updateDelay = 500;
		this.htmlMode = HtmlModes.HTML;
		this.jsMode = HtmlModes.HTML;
		this.cssMode = CssModes.CSS;
		this.jsMode = JsModes.JS;
		this.prefs = {};
		this.codeInPreview = { html: null, css: null, js: null };
		this.cmCodes = { html: props.currentItem.html, css: '', js: '' };
		this.cm = {};

		window.onMessageFromConsole = this.onMessageFromConsole.bind(this);
		window.previewException = this.previewException.bind(this);
		// `clearConsole` is on window because it gets called from inside iframe also.
		window.clearConsole = this.clearConsole.bind(this);

		this.consoleHeaderDblClickHandler = this.consoleHeaderDblClickHandler.bind(this);
		this.clearConsoleBtnClickHandler = this.clearConsoleBtnClickHandler.bind(this);
		this.toggleConsole = this.toggleConsole.bind(this);
		this.evalConsoleExpr = this.evalConsoleExpr.bind(this);
	}
	shouldComponentUpdate(nextProps, nextState) {
		return this.state.isConsoleOpen !== nextState.isConsoleOpen || this.state.isCssSettingsModalOpen !== nextState.isCssSettingsModalOpen || this.state.logs !== nextState.logs || this.state.codeSplitSizes !== nextState.codeSplitSizes || this.state.mainSplitSizes !== nextState.mainSplitSizes || this.props.currentLayoutMode !== nextProps.currentLayoutMode || this.props.currentItem !== nextProps.currentItem || this.props.prefs !== nextProps.prefs;
	}
	componentDidUpdate() {
		// log('🚀', 'didupdate', this.props.currentItem);
		// if (this.isValidItem(this.props.currentItem)) {
		// this.refreshEditor();
		// }
	}
	componentDidMount() {
		this.props.onRef(this);
	}

	onHtmlCodeChange(editor, change) {
		this.cmCodes.html = editor.getValue();
		this.props.onCodeChange('html', this.cmCodes.html, change.origin !== 'setValue');
		this.onCodeChange(editor, change);
	}
	onCssCodeChange(editor, change) {
		this.cmCodes.css = editor.getValue();
		this.props.onCodeChange('css', this.cmCodes.css, change.origin !== 'setValue');
		this.onCodeChange(editor, change);
	}
	onJsCodeChange(editor, change) {
		this.cmCodes.js = editor.getValue();
		this.props.onCodeChange('js', this.cmCodes.js, change.origin !== 'setValue');
		this.onCodeChange(editor, change);
	}
	onCodeChange(editor, change) {
		clearTimeout(this.updateTimer);

		this.updateTimer = setTimeout(() => {
			// This is done so that multiple simultaneous setValue don't trigger too many preview refreshes
			// and in turn too many file writes on a single file (eg. preview.html).
			if (change.origin !== 'setValue') {
				// Specifically checking for false so that the condition doesn't get true even
				// on absent key - possible when the setting key hasn't been fetched yet.
				if (this.prefs.autoPreview !== false) {
					this.setPreviewContent();
				}

				// Track when people actually are working.
				trackEvent.previewCount = (trackEvent.previewCount || 0) + 1;
				if (trackEvent.previewCount === 4) {
					trackEvent('fn', 'usingPreview');
				}
			}
		}, this.updateDelay);
	}

	createPreviewFile(html, css, js) {
		const shouldInlineJs = !window.webkitRequestFileSystem || !window.IS_EXTENSION;
		var contents = getCompleteHtml(html, css, shouldInlineJs ? js : null, this.props.currentItem);
		var blob = new Blob([contents], { type: 'text/plain;charset=UTF-8' });
		var blobjs = new Blob([js], { type: 'text/plain;charset=UTF-8' });

		// Track if people have written code.
		if (!trackEvent.hasTrackedCode && (html || css || js)) {
			trackEvent('fn', 'hasCode');
			trackEvent.hasTrackedCode = true;
		}

		if (shouldInlineJs) {
			if (this.detachedWindow) {
				utils_log('✉️ Sending message to detached window');
				this.detachedWindow.postMessage({ contents }, '*');
			} else {
				this.frame.src = this.frame.src;
				setTimeout(() => {
					this.frame.contentDocument.open();
					this.frame.contentDocument.write(contents);
					this.frame.contentDocument.close();
				}, 10);
			}
		} else {
			// we need to store user script in external JS file to prevent inline-script
			// CSP from affecting it.
			writeFile('script.js', blobjs, () => {
				writeFile('preview.html', blob, () => {
					var origin = chrome.i18n.getMessage() ? `chrome-extension://${chrome.i18n.getMessage('@@extension_id')}` : `${location.origin}`;
					var src = `filesystem:${origin}/temporary/preview.html`;
					if (this.detachedWindow) {
						this.detachedWindow.postMessage(src, '*');
					} else {
						this.frame.src = src;
					}
				});
			});
		}
	}
	cleanupErrors(lang) {
		this.cm[lang].clearGutter('error-gutter');
	}

	showErrors(lang, errors) {
		this.cm[lang].showErrors(errors);
	}

	/**
  * Generates the preview from the current code.
  * @param {boolean} isForced Should refresh everything without any check or not
  * @param {boolean} isManual Is this a manual preview request from user?
  */
	setPreviewContent(isForced, isManual) {
		if (!this.props.prefs.autoPreview && !isManual) {
			return;
		}

		if (!this.props.prefs.preserveConsoleLogs) {
			this.clearConsole();
		}
		this.cleanupErrors('html');
		this.cleanupErrors('css');
		this.cleanupErrors('js');

		var currentCode = {
			html: this.cmCodes.html,
			css: this.cmCodes.css,
			js: this.cmCodes.js
		};
		utils_log('🔎 setPreviewContent', isForced);
		const targetFrame = this.detachedWindow ? this.detachedWindow.document.querySelector('iframe') : this.frame;

		const cssMode = this.props.currentItem.cssMode;
		// If just CSS was changed (and everything shudn't be empty),
		// change the styles inside the iframe.
		if (!isForced && currentCode.html === this.codeInPreview.html && currentCode.js === this.codeInPreview.js) {
			computeCss(cssMode === CssModes.ACSS ? currentCode.html : currentCode.css, cssMode, this.props.currentItem.cssSettings).then(result => {
				if (cssMode === CssModes.ACSS) {
					this.cm.css.setValue(result.code || '');
				}
				if (targetFrame.contentDocument.querySelector('#webmakerstyle')) {
					targetFrame.contentDocument.querySelector('#webmakerstyle').textContent = result.code || '';
				}
			});
		} else {
			var htmlPromise = computeHtml(currentCode.html, this.props.currentItem.htmlMode);
			var cssPromise = computeCss(cssMode === CssModes.ACSS ? currentCode.html : currentCode.css, cssMode, this.props.currentItem.cssSettings);
			var jsPromise = computeJs(currentCode.js, this.props.currentItem.jsMode, true, this.props.prefs.infiniteLoopTimeout);
			Promise.all([htmlPromise, cssPromise, jsPromise]).then(result => {
				if (cssMode === CssModes.ACSS) {
					this.cm.css.setValue(result[1].code || '');
				}

				this.createPreviewFile(result[0].code || '', result[1].code || '', result[2].code || '');
				result.forEach(resultItem => {
					if (resultItem.errors) {
						this.showErrors(resultItem.errors.lang, resultItem.errors.data);
					}
				});
			});
		}

		this.codeInPreview.html = currentCode.html;
		this.codeInPreview.css = currentCode.css;
		this.codeInPreview.js = currentCode.js;
	}
	isValidItem(item) {
		return !!item.title;
	}
	refreshEditor() {
		this.cmCodes.html = this.props.currentItem.html;
		this.cmCodes.css = this.props.currentItem.css;
		this.cmCodes.js = this.props.currentItem.js;
		this.cm.html.setValue(this.cmCodes.html || '');
		this.cm.css.setValue(this.cmCodes.css || '');
		this.cm.js.setValue(this.cmCodes.js || '');
		this.cm.html.refresh();
		this.cm.css.refresh();
		this.cm.js.refresh();

		this.clearConsole();

		// Set preview only when all modes are updated so that preview doesn't generate on partially
		// correct modes and also doesn't happen 3 times.
		Promise.all([this.updateHtmlMode(this.props.currentItem.htmlMode), this.updateCssMode(this.props.currentItem.cssMode), this.updateJsMode(this.props.currentItem.jsMode)]).then(() => this.setPreviewContent(true));
	}
	applyCodemirrorSettings(prefs) {
		document.documentElement.style.setProperty('--code-font-size', `${parseInt(prefs.fontSize, 10)}px`);

		// Replace correct css file in LINK tags's href
		if (prefs.editorTheme) {
			window.editorThemeLinkTag.href = `lib/codemirror/theme/${prefs.editorTheme}.css`;
		}

		window.fontStyleTag.textContent = window.fontStyleTemplate.textContent.replace(/fontname/g, (prefs.editorFont === 'other' ? prefs.editorCustomFont : prefs.editorFont) || 'FiraCode');
	}

	// Check all the code wrap if they are minimized or maximized
	updateCodeWrapCollapseStates() {
		// This is debounced!
		clearTimeout(this.updateCodeWrapCollapseStates.timeout);
		this.updateCodeWrapCollapseStates.timeout = setTimeout(() => {
			const { currentLayoutMode } = this.props;
			const prop = currentLayoutMode === 2 || currentLayoutMode === 5 ? 'width' : 'height';
			[htmlCodeEl, cssCodeEl, jsCodeEl].forEach(function (el) {
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

	toggleCodeWrapCollapse(codeWrapEl) {
		if (codeWrapEl.classList.contains('is-minimized') || codeWrapEl.classList.contains('is-maximized')) {
			codeWrapEl.classList.remove('is-minimized');
			codeWrapEl.classList.remove('is-maximized');
			this.codeSplitInstance.setSizes([33.3, 33.3, 33.3]);
		} else {
			const id = parseInt(codeWrapEl.dataset.codeWrapId, 10);
			var arr = [`${minCodeWrapSize}px`, `${minCodeWrapSize}px`, `${minCodeWrapSize}px`];
			arr[id] = `calc(100% - ${minCodeWrapSize * 2}px)`;

			this.codeSplitInstance.setSizes(arr);
			codeWrapEl.classList.add('is-maximized');
		}
		this.updateSplits();
	}

	collapseBtnHandler(e) {
		var codeWrapParent = e.currentTarget.parentElement.parentElement.parentElement;
		this.toggleCodeWrapCollapse(codeWrapParent);
		trackEvent('ui', 'paneCollapseBtnClick', codeWrapParent.dataset.type);
	}
	codeWrapHeaderDblClickHandler(e) {
		if (!e.target.classList.contains('js-code-wrap__header')) {
			return;
		}
		const codeWrapParent = e.target.parentElement;
		this.toggleCodeWrapCollapse(codeWrapParent);
		trackEvent('ui', 'paneHeaderDblClick', codeWrapParent.dataset.type);
	}

	resetSplitting() {
		this.setState({
			codeSplitSizes: this.getCodeSplitSizes(),
			mainSplitSizes: this.getMainSplitSizesToApply()
		});
	}
	updateSplits() {
		this.props.onSplitUpdate();
		// Not using setState to avoid re-render
		this.state.codeSplitSizes = this.props.currentItem.sizes;
		this.state.mainSplitSizes = this.props.currentItem.mainSizes;
	}

	// Returns the sizes of main code & preview panes.
	getMainSplitSizesToApply() {
		var mainSplitSizes;
		const { currentItem, currentLayoutMode } = this.props;
		if (currentItem && currentItem.mainSizes) {
			// For layout mode 3, main panes are reversed using flex-direction.
			// So we need to apply the saved sizes in reverse order.
			mainSplitSizes = currentLayoutMode === 3 ? [currentItem.mainSizes[1], currentItem.mainSizes[0]] : currentItem.mainSizes;
		} else {
			mainSplitSizes = currentLayoutMode === 5 ? [75, 25] : [50, 50];
		}
		return mainSplitSizes;
	}

	getCodeSplitSizes() {
		if (this.props.currentItem && this.props.currentItem.sizes) {
			return this.props.currentItem.sizes;
		}
		return [33.33, 33.33, 33.33];
	}

	mainSplitDragEndHandler() {
		if (this.props.prefs.refreshOnResize) {
			// Running preview updation in next call stack, so that error there
			// doesn't affect this dragend listener.
			setTimeout(() => {
				this.setPreviewContent(true);
			}, 1);
		}
		this.updateSplits();
	}
	mainSplitDragHandler() {
		this.previewDimension.update({
			w: this.frame.clientWidth,
			h: this.frame.clientHeight
		});
	}
	codeSplitDragStart() {
		document.body.classList.add('is-dragging');
	}
	codeSplitDragEnd() {
		this.updateCodeWrapCollapseStates();
		document.body.classList.remove('is-dragging');
		this.updateSplits();
	}
	/**
  * Loaded the code comiler based on the mode selected
  */
	handleModeRequirements(mode) {
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
			loadJS(`${baseTranspilerPath}/sass.js`).then(function () {
				window.sass = new Sass(`${baseTranspilerPath}/sass.worker.js`);
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

	updateHtmlMode(value) {
		this.props.onCodeModeChange('html', value);
		this.props.currentItem.htmlMode = value;
		this.cm.html.setLanguage(value);
		return this.handleModeRequirements(value);
	}
	updateCssMode(value) {
		this.props.onCodeModeChange('css', value);
		this.props.currentItem.cssMode = value;
		this.cm.css.setOption('readOnly', modes[value].cmDisable);
		window.cssSettingsBtn.classList[modes[value].hasSettings ? 'remove' : 'add']('hide');
		this.cm.css.setLanguage(value);
		return this.handleModeRequirements(value);
	}
	updateJsMode(value) {
		this.props.onCodeModeChange('js', value);
		this.props.currentItem.jsMode = value;
		this.cm.js.setLanguage(value);
		return this.handleModeRequirements(value);
	}
	codeModeChangeHandler(e) {
		var mode = e.target.value;
		var type = e.target.dataset.type;
		var currentMode = this.props.currentItem[type === 'html' ? 'htmlMode' : type === 'css' ? 'cssMode' : 'jsMode'];
		if (currentMode !== mode) {
			if (type === 'html') {
				this.updateHtmlMode(mode).then(() => this.setPreviewContent(true));
			} else if (type === 'js') {
				this.updateJsMode(mode).then(() => this.setPreviewContent(true));
			} else if (type === 'css') {
				this.updateCssMode(mode).then(() => this.setPreviewContent(true));
			}
			trackEvent('ui', 'updateCodeMode', mode);
		}
	}

	detachPreview() {
		if (this.detachedWindow) {
			this.detachedWindow.focus();
			return;
		}
		const iframeBounds = this.frame.getBoundingClientRect();
		const iframeWidth = iframeBounds.width;
		const iframeHeight = iframeBounds.height;
		document.body.classList.add('is-detached-mode');

		this.detachedWindow = window.open('./preview.html', 'Web Maker', `width=${iframeWidth},height=${iframeHeight},resizable,scrollbars=yes,status=1`);
		// Trigger initial render in detached window
		setTimeout(() => {
			this.setPreviewContent(true);
		}, 1500);

		var intervalID = window.setInterval(checkWindow => {
			if (this.detachedWindow && this.detachedWindow.closed) {
				clearInterval(intervalID);
				document.body.classList.remove('is-detached-mode');
				this.detachedWindow = null;
				// Update main frame preview to get latest changes (which were not
				// getting reflected while detached window was open)
				this.setPreviewContent(true);
			}
		}, 500);
	}

	onMessageFromConsole() {
		const logs = [...arguments].map(arg => {
			if (arg && arg.indexOf && arg.indexOf('filesystem:chrome-extension') !== -1) {
				return arg.replace(/filesystem:chrome-extension.*\.js:(\d+):*(\d*)/g, 'script $1:$2');
			}
			return arg;
		});
		this.setState({ logs: [...this.state.logs, ...logs] });
	}

	previewException(error) {
		console.error('Possible infinite loop detected.', error.stack);
		this.onMessageFromConsole('Possible infinite loop detected.', error.stack);
	}

	toggleConsole() {
		this.setState({ isConsoleOpen: !this.state.isConsoleOpen });
		trackEvent('ui', 'consoleToggle');
	}
	consoleHeaderDblClickHandler(e) {
		if (!e.target.classList.contains('js-console__header')) {
			return;
		}
		trackEvent('ui', 'consoleToggleDblClick');
		this.toggleConsole();
	}
	clearConsole() {
		this.setState({ logs: [] });
	}
	clearConsoleBtnClickHandler() {
		this.clearConsole();
		trackEvent('ui', 'consoleClearBtnClick');
	}

	evalConsoleExpr(e) {
		// Clear console on CTRL + L
		if ((e.which === 76 || e.which === 12) && e.ctrlKey) {
			this.clearConsole();
			trackEvent('ui', 'consoleClearKeyboardShortcut');
		} else if (e.which === 13) {
			this.onMessageFromConsole('> ' + e.target.value);

			/* eslint-disable no-underscore-dangle */
			this.frame.contentWindow._wmEvaluate(e.target.value);

			/* eslint-enable no-underscore-dangle */

			e.target.value = '';
			trackEvent('fn', 'evalConsoleExpr');
		}
	}
	cssSettingsBtnClickHandler() {
		this.setState({ isCssSettingsModalOpen: true });
		trackEvent('ui', 'cssSettingsBtnClick');
	}
	cssSettingsChangeHandler(settings) {
		this.props.onCodeSettingsChange('css', settings);
		this.setPreviewContent(true);
	}
	getDemoFrame(callback) {
		callback(this.frame);
	}
	editorFocusHandler(editor) {
		this.props.onEditorFocus(editor);
	}

	render() {
		utils_log('contentwrap update');

		return Object(preact_min["h"])(
			SplitPane_SplitPane,
			{
				'class': 'content-wrap  flex  flex-grow',
				sizes: this.state.mainSplitSizes,
				minSize: 150,
				style: '',
				direction: this.props.currentLayoutMode === 2 ? 'vertical' : 'horizontal',
				onDrag: this.mainSplitDragHandler.bind(this),
				onDragEnd: this.mainSplitDragEndHandler.bind(this)
			},
			Object(preact_min["h"])(
				SplitPane_SplitPane,
				{
					'class': 'code-side',
					id: 'js-code-side',
					sizes: this.state.codeSplitSizes,
					minSize: minCodeWrapSize,
					direction: this.props.currentLayoutMode === 2 || this.props.currentLayoutMode === 5 ? 'horizontal' : 'vertical',
					onDragStart: this.codeSplitDragStart.bind(this),
					onDragEnd: this.codeSplitDragEnd.bind(this),
					onSplit: splitInstance => this.codeSplitInstance = splitInstance
				},
				Object(preact_min["h"])(
					'div',
					{
						'data-code-wrap-id': '0',
						id: 'htmlCodeEl',
						'data-type': 'html',
						'class': 'code-wrap',
						onTransitionEnd: this.updateCodeWrapCollapseStates.bind(this)
					},
					Object(preact_min["h"])(
						'div',
						{
							'class': 'js-code-wrap__header  code-wrap__header',
							title: 'Double click to toggle code pane',
							onDblClick: this.codeWrapHeaderDblClickHandler.bind(this)
						},
						Object(preact_min["h"])(
							'label',
							{ 'class': 'btn-group', dropdow: true, title: 'Click to change' },
							Object(preact_min["h"])(
								'span',
								{ 'class': 'code-wrap__header-label' },
								modes[this.props.currentItem.htmlMode || 'html'].label
							),
							ContentWrap__ref,
							Object(preact_min["h"])(
								'select',
								{
									'data-type': 'html',
									'class': 'js-mode-select  hidden-select',
									onChange: this.codeModeChangeHandler.bind(this),
									value: this.props.currentItem.htmlMode
								},
								ContentWrap__ref2,
								ContentWrap__ref3,
								ContentWrap__ref4
							)
						),
						Object(preact_min["h"])(
							'div',
							{ 'class': 'code-wrap__header-right-options' },
							Object(preact_min["h"])('a', {
								'class': 'js-code-collapse-btn  code-wrap__header-btn  code-wrap__collapse-btn',
								title: 'Toggle code pane',
								onClick: this.collapseBtnHandler.bind(this)
							})
						)
					),
					Object(preact_min["h"])(CodeEditor_CodeEditor, {
						type: this.props.prefs.isMonacoEditorOn ? 'monaco' : 'codemirror',
						options: {
							mode: 'htmlmixed',
							profile: 'xhtml',
							gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
							noAutocomplete: true,
							matchTags: { bothTags: true },
							prettier: true,
							prettierParser: 'html',
							emmet: true
						},
						prefs: this.props.prefs,
						onChange: this.onHtmlCodeChange.bind(this),
						ref: editor => this.cm.html = editor,
						onFocus: this.editorFocusHandler.bind(this)
					})
				),
				Object(preact_min["h"])(
					'div',
					{
						'data-code-wrap-id': '1',
						id: 'cssCodeEl',
						'data-type': 'css',
						'class': 'code-wrap',
						onTransitionEnd: this.updateCodeWrapCollapseStates.bind(this)
					},
					Object(preact_min["h"])(
						'div',
						{
							'class': 'js-code-wrap__header  code-wrap__header',
							title: 'Double click to toggle code pane',
							onDblClick: this.codeWrapHeaderDblClickHandler.bind(this)
						},
						Object(preact_min["h"])(
							'label',
							{ 'class': 'btn-group', title: 'Click to change' },
							Object(preact_min["h"])(
								'span',
								{ 'class': 'code-wrap__header-label' },
								modes[this.props.currentItem.cssMode || 'css'].label
							),
							ContentWrap__ref5,
							Object(preact_min["h"])(
								'select',
								{
									'data-type': 'css',
									'class': 'js-mode-select  hidden-select',
									onChange: this.codeModeChangeHandler.bind(this),
									value: this.props.currentItem.cssMode
								},
								ContentWrap__ref6,
								ContentWrap__ref7,
								ContentWrap__ref8,
								ContentWrap__ref9,
								ContentWrap__ref10,
								ContentWrap__ref11
							)
						),
						Object(preact_min["h"])(
							'div',
							{ 'class': 'code-wrap__header-right-options' },
							Object(preact_min["h"])(
								'a',
								{
									href: '#',
									id: 'cssSettingsBtn',
									title: 'Atomic CSS configuration',
									onClick: this.cssSettingsBtnClickHandler.bind(this),
									'class': 'code-wrap__header-btn hide'
								},
								ContentWrap__ref12
							),
							Object(preact_min["h"])('a', {
								'class': 'js-code-collapse-btn  code-wrap__header-btn  code-wrap__collapse-btn',
								title: 'Toggle code pane',
								onClick: this.collapseBtnHandler.bind(this)
							})
						)
					),
					Object(preact_min["h"])(CodeEditor_CodeEditor, {
						type: this.props.prefs.isMonacoEditorOn ? 'monaco' : 'codemirror',
						options: {
							mode: 'css',
							gutters: ['error-gutter', 'CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
							emmet: true,
							prettier: true,
							prettierParser: 'css'
						},
						prefs: this.props.prefs,
						onChange: this.onCssCodeChange.bind(this),
						ref: editor => this.cm.css = editor,
						onFocus: this.editorFocusHandler.bind(this)
					})
				),
				Object(preact_min["h"])(
					'div',
					{
						'data-code-wrap-id': '2',
						id: 'jsCodeEl',
						'data-type': 'js',
						'class': 'code-wrap',
						onTransitionEnd: this.updateCodeWrapCollapseStates.bind(this)
					},
					Object(preact_min["h"])(
						'div',
						{
							'class': 'js-code-wrap__header  code-wrap__header',
							title: 'Double click to toggle code pane',
							onDblClick: this.codeWrapHeaderDblClickHandler.bind(this)
						},
						Object(preact_min["h"])(
							'label',
							{ 'class': 'btn-group', title: 'Click to change' },
							Object(preact_min["h"])(
								'span',
								{ 'class': 'code-wrap__header-label' },
								modes[this.props.currentItem.jsMode || 'js'].label
							),
							ContentWrap__ref13,
							Object(preact_min["h"])(
								'select',
								{
									'data-type': 'js',
									'class': 'js-mode-select  hidden-select',
									onChange: this.codeModeChangeHandler.bind(this),
									value: this.props.currentItem.jsMode
								},
								_ref14,
								_ref15,
								_ref16,
								_ref17
							)
						),
						Object(preact_min["h"])(
							'div',
							{ 'class': 'code-wrap__header-right-options' },
							Object(preact_min["h"])('a', {
								'class': 'js-code-collapse-btn  code-wrap__header-btn  code-wrap__collapse-btn',
								title: 'Toggle code pane',
								onClick: this.collapseBtnHandler.bind(this)
							})
						)
					),
					Object(preact_min["h"])(CodeEditor_CodeEditor, {
						type: this.props.prefs.isMonacoEditorOn ? 'monaco' : 'codemirror',
						options: {
							mode: 'javascript',
							gutters: ['error-gutter', 'CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
							prettier: true,
							prettierParser: 'js'
						},
						prefs: this.props.prefs,
						autoComplete: this.props.prefs.autoComplete,
						onChange: this.onJsCodeChange.bind(this),
						ref: editor => this.cm.js = editor,
						onFocus: this.editorFocusHandler.bind(this)
					})
				)
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': 'demo-side', id: 'js-demo-side', style: '' },
				Object(preact_min["h"])('iframe', {
					ref: el => this.frame = el,
					src: 'about://blank',
					frameborder: '0',
					id: 'demo-frame',
					allowfullscreen: true
				}),
				Object(preact_min["h"])(PreviewDimension_PreviewDimension, { ref: comp => this.previewDimension = comp }),
				Object(preact_min["h"])(Console_Console, {
					logs: this.state.logs,
					isConsoleOpen: this.state.isConsoleOpen,
					onConsoleHeaderDblClick: this.consoleHeaderDblClickHandler,
					onClearConsoleBtnClick: this.clearConsoleBtnClickHandler,
					toggleConsole: this.toggleConsole,
					onEvalInputKeyup: this.evalConsoleExpr
				}),
				Object(preact_min["h"])(CssSettingsModal_CssSettingsModal, {
					show: this.state.isCssSettingsModalOpen,
					closeHandler: () => this.setState({ isCssSettingsModalOpen: false }),
					onChange: this.cssSettingsChangeHandler.bind(this),
					settings: this.props.currentItem.cssSettings,
					editorTheme: this.props.prefs.editorTheme
				})
			)
		);
	}
};

// EXTERNAL MODULE: ../node_modules/codemirror/mode/meta.js
var meta = __webpack_require__("87T5");
var meta_default = /*#__PURE__*/__webpack_require__.n(meta);

// CONCATENATED MODULE: ./components/FileIcon.jsx




var FileIcon__ref = Object(preact_min["h"])('path', {
	fill: 'currentColor',
	d: 'M20,18H4V8H20M20,6H12L10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6Z'
});

var FileIcon__ref2 = Object(preact_min["h"])('path', {
	fill: 'currentColor',
	d: 'M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z'
});

var FileIcon__ref3 = Object(preact_min["h"])('path', {
	fill: 'currentColor',
	d: 'M19,20H4C2.89,20 2,19.1 2,18V6C2,4.89 2.89,4 4,4H10L12,6H19A2,2 0 0,1 21,8H21L4,8V18L6.14,10H23.21L20.93,18.5C20.7,19.37 19.92,20 19,20Z'
});

var FileIcon__ref4 = Object(preact_min["h"])('path', {
	fill: 'rgb(225, 187, 21)',
	d: 'M14.6,16.6L19.2,12L14.6,7.4L16,6L22,12L16,18L14.6,16.6M9.4,16.6L4.8,12L9.4,7.4L8,6L2,12L8,18L9.4,16.6Z'
});

var FileIcon__ref5 = Object(preact_min["h"])('path', {
	fill: 'rgb(255, 165, 0)',
	d: 'M3,3H21V21H3V3M7.73,18.04C8.13,18.89 8.92,19.59 10.27,19.59C11.77,19.59 12.8,18.79 12.8,17.04V11.26H11.1V17C11.1,17.86 10.75,18.08 10.2,18.08C9.62,18.08 9.38,17.68 9.11,17.21L7.73,18.04M13.71,17.86C14.21,18.84 15.22,19.59 16.8,19.59C18.4,19.59 19.6,18.76 19.6,17.23C19.6,15.82 18.79,15.19 17.35,14.57L16.93,14.39C16.2,14.08 15.89,13.87 15.89,13.37C15.89,12.96 16.2,12.64 16.7,12.64C17.18,12.64 17.5,12.85 17.79,13.37L19.1,12.5C18.55,11.54 17.77,11.17 16.7,11.17C15.19,11.17 14.22,12.13 14.22,13.4C14.22,14.78 15.03,15.43 16.25,15.95L16.67,16.13C17.45,16.47 17.91,16.68 17.91,17.26C17.91,17.74 17.46,18.09 16.76,18.09C15.93,18.09 15.45,17.66 15.09,17.06L13.71,17.86Z'
});

var FileIcon__ref6 = Object(preact_min["h"])('path', {
	fill: '#2874C1',
	d: 'M3,3H21V21H3V3M13.71,17.86C14.21,18.84 15.22,19.59 16.8,19.59C18.4,19.59 19.6,18.76 19.6,17.23C19.6,15.82 18.79,15.19 17.35,14.57L16.93,14.39C16.2,14.08 15.89,13.87 15.89,13.37C15.89,12.96 16.2,12.64 16.7,12.64C17.18,12.64 17.5,12.85 17.79,13.37L19.1,12.5C18.55,11.54 17.77,11.17 16.7,11.17C15.19,11.17 14.22,12.13 14.22,13.4C14.22,14.78 15.03,15.43 16.25,15.95L16.67,16.13C17.45,16.47 17.91,16.68 17.91,17.26C17.91,17.74 17.46,18.09 16.76,18.09C15.93,18.09 15.45,17.66 15.09,17.06L13.71,17.86M13,11.25H8V12.75H9.5V20H11.25V12.75H13V11.25Z'
});

var FileIcon__ref7 = Object(preact_min["h"])('path', {
	fill: 'rgb(95, 158, 160)',
	d: 'M5,3L4.35,6.34H17.94L17.5,8.5H3.92L3.26,11.83H16.85L16.09,15.64L10.61,17.45L5.86,15.64L6.19,14H2.85L2.06,18L9.91,21L18.96,18L20.16,11.97L20.4,10.76L21.94,3H5Z'
});

var FileIcon__ref8 = Object(preact_min["h"])('path', {
	fill: '#CF649A',
	d: 'M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M10,15.33C10.16,15.87 10.14,16.37 10,16.83C10,16.88 9.96,16.93 9.94,17C9.92,17 9.9,17.07 9.87,17.12C9.76,17.36 9.6,17.59 9.41,17.79C8.83,18.43 8,18.67 7.67,18.47C7.29,18.25 7.5,17.35 8.16,16.64C8.88,15.88 9.92,15.38 9.92,15.38V15.38L10,15.33M18.27,6.28C17.82,4.5 14.87,3.92 12.09,4.91C10.43,5.5 8.63,6.42 7.34,7.63C5.81,9.07 5.56,10.32 5.66,10.84C6,12.68 8.54,13.89 9.58,14.78V14.79C9.28,14.94 7.04,16.07 6.5,17.23C5.96,18.45 6.6,19.33 7,19.45C8.34,19.81 9.69,19.16 10.41,18.07C11.11,17.03 11.06,15.68 10.75,15C11.17,14.9 11.66,14.85 12.28,14.92C14.04,15.13 14.38,16.22 14.31,16.68C14.25,17.14 13.88,17.39 13.76,17.47C13.64,17.54 13.6,17.57 13.61,17.63C13.62,17.71 13.68,17.71 13.78,17.69C13.93,17.66 14.71,17.32 14.74,16.47C14.78,15.39 13.75,14.19 11.93,14.22C11.18,14.24 10.71,14.31 10.37,14.44L10.29,14.35C9.16,13.15 7.08,12.3 7.17,10.68C7.2,10.09 7.4,8.55 11.17,6.67C14.25,5.13 16.72,5.55 17.15,6.5C17.76,7.83 15.83,10.32 12.63,10.68C11.41,10.82 10.76,10.34 10.6,10.17C10.43,10 10.41,9.97 10.35,10C10.24,10.07 10.31,10.23 10.35,10.33C10.44,10.58 10.84,11 11.5,11.24C12.09,11.43 13.53,11.54 15.26,10.87C17.2,10.12 18.72,8.03 18.27,6.28Z'
});

var FileIcon__ref9 = Object(preact_min["h"])('path', {
	fill: 'skyblue',
	d: 'M2,16V8H4L7,11L10,8H12V16H10V10.83L7,13.83L4,10.83V16H2M16,8H19V12H21.5L17.5,16.5L13.5,12H16V8Z'
});

var FileIcon__ref10 = Object(preact_min["h"])('path', {
	fill: 'crimson',
	d: 'M19,19H5V5H19M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M13.96,12.29L11.21,15.83L9.25,13.47L6.5,17H17.5L13.96,12.29Z'
});

var FileIcon__ref11 = Object(preact_min["h"])('path', {
	fill: 'orange',
	d: 'M5,3H7V5H5V10A2,2 0 0,1 3,12A2,2 0 0,1 5,14V19H7V21H5C3.93,20.73 3,20.1 3,19V15A2,2 0 0,0 1,13H0V11H1A2,2 0 0,0 3,9V5A2,2 0 0,1 5,3M19,3A2,2 0 0,1 21,5V9A2,2 0 0,0 23,11H24V13H23A2,2 0 0,0 21,15V19A2,2 0 0,1 19,21H17V19H19V14A2,2 0 0,1 21,12A2,2 0 0,1 19,10V5H17V3H19M12,15A1,1 0 0,1 13,16A1,1 0 0,1 12,17A1,1 0 0,1 11,16A1,1 0 0,1 12,15M8,15A1,1 0 0,1 9,16A1,1 0 0,1 8,17A1,1 0 0,1 7,16A1,1 0 0,1 8,15M16,15A1,1 0 0,1 17,16A1,1 0 0,1 16,17A1,1 0 0,1 15,16A1,1 0 0,1 16,15Z'
});

var FileIcon__ref12 = Object(preact_min["h"])('path', {
	fill: 'currentColor',
	d: 'M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6M6,4H13V9H18V20H6V4M8,12V14H16V12H8M8,16V18H13V16H8Z'
});

function FileIcon({ file }) {
	let path;
	if (file.isFolder) {
		if (!file.children.length) {
			path = FileIcon__ref;
		} else {
			path = file.isCollapsed ? FileIcon__ref2 : FileIcon__ref3;
		}
	} else {
		const type = getExtensionFromFileName(file.name);
		switch (type) {
			case 'html':
				path = FileIcon__ref4;
				break;

			case 'js':
				path = FileIcon__ref5;
				break;
			case 'ts':
				path: FileIcon__ref6;
				break;
			case 'css':
			case 'less':
				path = FileIcon__ref7;
				break;
			case 'scss':
			case 'sass':
				path = FileIcon__ref8;
				break;
			case 'md':
			case 'markdown':
				path = FileIcon__ref9;
				break;

			case 'jpg':
			case 'jpeg':
			case 'svg':
			case 'png':
				path = FileIcon__ref10;
				break;
			case 'json':
				path = FileIcon__ref11;
				break;
			default:
				path = FileIcon__ref12;
		}
	}
	return Object(preact_min["h"])(
		'svg',
		{ 'class': 'sidebar__file-icon', viewBox: '0 0 24 24' },
		path
	);
}
// CONCATENATED MODULE: ./components/SidePane.jsx
var SidePane__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };






const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

var SidePane__ref = Object(preact_min["h"])(
	'svg',
	{
		viewBox: '0 0 24 24',
		style: 'vertical-align:middle;width:14px;height:14px'
	},
	Object(preact_min["h"])('path', { d: 'M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z' })
);

var SidePane__ref2 = Object(preact_min["h"])(
	'svg',
	{
		viewBox: '0 0 24 24',
		style: 'vertical-align:middle;width:14px;height:14px'
	},
	Object(preact_min["h"])('path', { d: 'M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z' })
);

function File({
	file,
	selectedFile,
	fileBeingRenamed,
	onFileSelect,
	onRenameBtnClick,
	onRemoveBtnClick,
	onNameInputBlur,
	onNameInputKeyUp,
	onFileDrop
}) {
	function focusInput(el) {
		el && setTimeout(() => {
			el.focus();
		}, 1);
	}
	function dragStartHandler(e) {
		e.dataTransfer.setData('text/plain', file.path);
	}
	function dragOverHandler(e) {
		if (file.isFolder) {
			e.preventDefault();
			// e.stopPropagation();
			e.currentTarget.classList.add('is-being-dragged-over');
			e.currentTarget.style.outline = '1px dashed';
		}
	}
	function dragLeaveHandler(e) {
		if (file.isFolder) {
			e.preventDefault();
			e.currentTarget.style.outline = null;
		}
	}
	function dropHandler(e) {
		e.stopPropagation();
		if (file.isFolder) {
			e.preventDefault();
			onFileDrop(e.dataTransfer.getData('text/plain'), file);
			e.currentTarget.style.outline = null;
		}
	}
	return Object(preact_min["h"])(
		'div',
		{
			onDragOver: dragOverHandler,
			onDragLeave: dragLeaveHandler,
			onDrop: dropHandler
		},
		file === fileBeingRenamed ? Object(preact_min["h"])('input', {
			type: 'text',
			ref: focusInput,
			value: file.name,
			onBlur: onNameInputBlur,
			onKeyUp: onNameInputKeyUp
		}) : Object(preact_min["h"])(
			'button',
			{
				'class': `sidebar__file  ${selectedFile === file ? 'selected' : ''}`,
				type: 'button',
				draggable: file.name !== 'index.html',
				onDragStart: dragStartHandler,
				onClick: onFileSelect.bind(null, file)
			},
			Object(preact_min["h"])(
				'div',
				{ 'class': 'flex flex-v-center' },
				Object(preact_min["h"])(FileIcon, { file: file }),
				file.name
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': 'sidebar__file-options' },
				Object(preact_min["h"])(
					'button',
					{
						type: 'button',
						'class': 'btn btn--dark',
						onClick: onRenameBtnClick.bind(null, file)
					},
					SidePane__ref
				),
				Object(preact_min["h"])(
					'button',
					{
						type: 'button',
						'class': 'btn btn--dark',
						onClick: onRemoveBtnClick.bind(null, file)
					},
					SidePane__ref2
				)
			)
		)
	);
}
function Folder(props) {
	return Object(preact_min["h"])(
		'div',
		null,
		Object(preact_min["h"])(File, SidePane__extends({}, props, { file: props.file })),
		Object(preact_min["h"])(
			'div',
			{ 'class': 'sidebar__folder-wrap', 'data-collapsed': props.file.isCollapsed },
			props.file.children.map(childFile => childFile.isFolder ? Object(preact_min["h"])(Folder, SidePane__extends({}, props, { file: childFile })) : Object(preact_min["h"])(File, SidePane__extends({}, props, { file: childFile })))
		)
	);
}

var SidePane__ref3 = Object(preact_min["h"])(
	'svg',
	{
		viewBox: '0 0 24 24',
		style: 'vertical-align:middle;width:14px;height:14px'
	},
	Object(preact_min["h"])('path', { d: 'M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M11,15V12H9V15H6V17H9V20H11V17H14V15H11Z' })
);

var SidePane__ref4 = Object(preact_min["h"])(
	'svg',
	{
		viewBox: '0 0 24 24',
		style: 'vertical-align:middle;width:14px;height:14px'
	},
	Object(preact_min["h"])('path', { d: 'M10,4L12,6H20A2,2 0 0,1 22,8V18A2,2 0 0,1 20,20H4C2.89,20 2,19.1 2,18V6C2,4.89 2.89,4 4,4H10M15,9V12H12V14H15V17H17V14H20V12H17V9H15Z' })
);

let SidePane_SidePane = class SidePane extends preact_min["Component"] {
	addFileButtonClickHandler() {
		this.setState({ isAddingFile: true });
	}
	addFolderButtonClickHandler() {
		this.setState({ isAddingFolder: true });
	}
	/**
  * Checks if the passed filename already exists and if so, warns the user.
  * Also it passes false if the validation fails.
  * @param {string} newFileName New file name to validate
  */
	warnForExistingFileName(newFileName) {
		// We also check for fileBeingRenamed !== file because when a file being renamed is
		// asked to be set as same name, then that should not match and warn here.
		let newPath = this.state.fileBeingRenamed ? `${getParentPath(this.state.fileBeingRenamed.path)}/${newFileName}` : newFileName;
		// remove first slash
		newPath = newPath.replace(/^\//, '');
		const match = getFileFromPath(this.props.files, newPath);

		if (match.file && this.state.fileBeingRenamed !== match.file) {
			alert(`A file with name ${newFileName} already exists.`);
			return false;
		}
		return true;
	}

	addFile(e) {
		// This gets called twice when enter is pressed, because blur also fires.
		// So check `isAddingFile` before proceeding.
		if (!this.state.isAddingFile && !this.state.isAddingFolder) {
			return;
		}
		const newFileName = e.target.value;
		if (!this.warnForExistingFileName(newFileName)) {
			return;
		}
		if (newFileName) {
			this.props.onAddFile(newFileName, this.state.isAddingFolder);
		}
		this.setState({ isAddingFile: false, isAddingFolder: false });
	}
	newFileNameInputKeyDownHandler(e) {
		if (e.which === ENTER_KEY) {
			this.addFile(e);
		} else if (e.which === ESCAPE_KEY) {
			this.setState({ isAddingFile: false, isAddingFolder: false });
		}
	}
	removeFileClickHandler(file, e) {
		e.stopPropagation();
		const answer = confirm(`Are you sure you want to delete "${file.name}"?`);
		if (answer) {
			this.props.onRemoveFile(file.path);
		}
	}
	renameFile(e) {
		// This gets called twice when enter is pressed, because blur also fires.
		if (!e.target || !this.state.fileBeingRenamed) {
			return;
		}
		const newFileName = e.target.value;
		if (!this.warnForExistingFileName(newFileName)) {
			return;
		}
		if (newFileName) {
			this.props.onRenameFile(this.state.fileBeingRenamed.path, newFileName);
		}
		this.setState({ fileBeingRenamed: null });
	}
	renameFileNameInputKeyUpHandler(e) {
		if (e.which === ENTER_KEY) {
			this.renameFile(e);
		} else if (e.which === ESCAPE_KEY) {
			this.setState({ fileBeingRenamed: null });
		}
	}
	renameFileClickHandler(file, e) {
		e.stopPropagation();
		this.setState({
			fileBeingRenamed: file
		});
	}

	dragOverHandler(e) {
		e.preventDefault();
	}
	dropHandler(e) {
		e.preventDefault();
		// Object with `children` key is to simulate a folder structure for root folder
		this.props.onFileDrop(e.dataTransfer.getData('text/plain'), {
			children: this.props.files
		});
		// e.currentTarget.style.outline = null;
	}

	render() {
		const { files, onFileSelect, selectedFile, onRemoveFile } = this.props;
		const moreProps = {
			onRemoveBtnClick: this.removeFileClickHandler.bind(this),
			onRenameBtnClick: this.renameFileClickHandler.bind(this),
			onNameInputBlur: this.renameFile.bind(this),
			onNameInputKeyUp: this.renameFileNameInputKeyUpHandler.bind(this),
			fileBeingRenamed: this.state.fileBeingRenamed
		};

		return Object(preact_min["h"])(
			'div',
			{
				'class': 'sidebar',
				onDragOver: this.dragOverHandler.bind(this),
				onDrop: this.dropHandler.bind(this)
			},
			Object(preact_min["h"])(
				'div',
				{ 'class': 'flex jc-sb', style: 'padding: 5px 4px' },
				'Files',
				Object(preact_min["h"])(
					'div',
					{ 'class': 'flex flex-v-center' },
					Object(preact_min["h"])(
						'button',
						{
							type: 'button',
							'class': 'btn--dark',
							onClick: this.addFileButtonClickHandler.bind(this)
						},
						SidePane__ref3
					),
					Object(preact_min["h"])(
						'button',
						{
							type: 'button',
							'class': 'btn--dark',
							onClick: this.addFolderButtonClickHandler.bind(this)
						},
						SidePane__ref4
					)
				)
			),
			this.state.isAddingFile || this.state.isAddingFolder ? Object(preact_min["h"])(
				'div',
				null,
				Object(preact_min["h"])('input', {
					type: 'text',
					ref: el => {
						el && setTimeout(() => {
							el.focus();
						}, 1);
					},
					onBlur: this.addFile.bind(this),
					onKeyUp: this.newFileNameInputKeyDownHandler.bind(this)
				})
			) : null,
			files.map(file => file.isFolder ? Object(preact_min["h"])(Folder, SidePane__extends({}, this.props, moreProps, { file: file })) : Object(preact_min["h"])(File, SidePane__extends({}, this.props, moreProps, { file: file })))
		);
	}
};
// CONCATENATED MODULE: ./commands.js
const SWITCH_FILE_EVENT = 'switchFileEvent';
const NEW_CREATION_EVENT = 'newCreationEvent';
const OPEN_SAVED_CREATIONS_EVENT = 'openSavedCreationsEvent';
const SAVE_EVENT = 'saveEvent';
const OPEN_SETTINGS_EVENT = 'openSettingsEvent';
const SHOW_KEYBOARD_SHORTCUTS_EVENT = 'showKeyboardShortcutsEvent';

const commands = [{
	name: 'Start New Creation',
	event: NEW_CREATION_EVENT,
	keyboardShortcut: ''
}, {
	name: 'Open Creation',
	event: OPEN_SAVED_CREATIONS_EVENT,
	keyboardShortcut: 'Cmd+O'
}, {
	name: 'Save Creation',
	event: SAVE_EVENT,
	keyboardShortcut: 'Cmd+S'
}, {
	name: 'Open Settings',
	event: OPEN_SETTINGS_EVENT,
	keyboardShortcut: ''
}, {
	name: 'Show Keyboard Shortcuts',
	event: SHOW_KEYBOARD_SHORTCUTS_EVENT,
	keyboardShortcut: ''
}];
// CONCATENATED MODULE: ./commandPaletteService.js
const commandPaletteService = {
	subscriptions: {},
	subscribe(eventName, callback) {
		this.subscriptions[eventName] = this.subscriptions[eventName] || [];
		this.subscriptions[eventName].push(callback);
		return () => {
			this.subscriptions[eventName].splice(this.subscriptions[eventName].indexOf(callback), 1);
		};
	},
	publish(eventName, ...args) {
		const callbacks = this.subscriptions[eventName] || [];
		callbacks.forEach(callback => {
			callback(...args);
		});
	}
};
// CONCATENATED MODULE: ./components/ContentWrapFiles.jsx
var ContentWrapFiles__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




















const ContentWrapFiles_minCodeWrapSize = 33;

/* global htmlCodeEl
 */

var ContentWrapFiles__ref = Object(preact_min["h"])('a', {
	'class': 'js-code-collapse-btn  code-wrap__header-btn  code-wrap__collapse-btn',
	title: 'Toggle code pane'
});

let ContentWrapFiles_ContentWrapFiles = class ContentWrapFiles extends preact_min["Component"] {
	constructor(props) {
		super(props);
		this.state = {
			isConsoleOpen: false,
			isCssSettingsModalOpen: false,
			logs: [],
			editorOptions: this.getEditorOptions()
		};

		this.fileBuffers = {};
		this.updateTimer = null;
		this.updateDelay = 500;
		this.htmlMode = HtmlModes.HTML;
		this.prefs = {};
		this.cmCodes = { html: props.currentItem.html, css: '', js: '' };

		window.onMessageFromConsole = this.onMessageFromConsole.bind(this);
		window.previewException = this.previewException.bind(this);
		// `clearConsole` is on window because it gets called from inside iframe also.
		window.clearConsole = this.clearConsole.bind(this);

		this.consoleHeaderDblClickHandler = this.consoleHeaderDblClickHandler.bind(this);
		this.clearConsoleBtnClickHandler = this.clearConsoleBtnClickHandler.bind(this);
		this.toggleConsole = this.toggleConsole.bind(this);
		this.evalConsoleExpr = this.evalConsoleExpr.bind(this);
	}
	shouldComponentUpdate(nextProps, nextState) {
		return this.state.isConsoleOpen !== nextState.isConsoleOpen || this.state.isCssSettingsModalOpen !== nextState.isCssSettingsModalOpen || this.state.logs !== nextState.logs || this.state.mainSplitSizes !== nextState.mainSplitSizes || this.state.selectedFile !== nextState.selectedFile || this.props.currentLayoutMode !== nextProps.currentLayoutMode || this.props.currentItem !== nextProps.currentItem || this.props.prefs !== nextProps.prefs;
	}
	componentWillUpdate(nextProps) {
		// If we get a new Item, clear file buffers and currently selected file.
		if (this.props.currentItem.createdOn !== nextProps.currentItem.createdOn || this.props.currentItem.id !== nextProps.currentItem.id) {
			this.fileBuffers = {};
			this.state.selectedFile = null;
		}

		// If the files have changed and we have a selected file (even after previous condition),
		// update the buffer with new file content (may be it got prettified?)
		if (nextProps.currentItem.files !== this.props.currentItem.files && this.state.selectedFile && this.fileBuffers[this.state.selectedFile.path]) {
			this.fileBuffers[this.state.selectedFile.path].model.setValue(getFileFromPath(nextProps.currentItem.files, this.state.selectedFile.path).file.content);
		}
	}
	componentDidUpdate() {
		const { currentItem } = this.props;
		const linearFiles = linearizeFiles(currentItem.files);

		// Select a new file if nothing is selected already or the selected file exists no more.
		if (currentItem && currentItem.files && (!this.state.selectedFile || !linearFiles.includes(this.state.selectedFile))) {
			this.fileSelectHandler(linearFiles[0]);
		}

		// log('🚀', 'didupdate', this.props.currentItem);
		// if (this.isValidItem(this.props.currentItem)) {
		// this.refreshEditor();
		// }
	}
	componentDidMount() {
		this.props.onRef(this);
		this.commandPaletteSubscriptions = [];
		this.commandPaletteSubscriptions.push(commandPaletteService.subscribe(SWITCH_FILE_EVENT, file => {
			const targetFile = getFileFromPath(this.props.currentItem.files, file.path);
			if (targetFile.file) {
				this.fileSelectHandler(targetFile.file);
			}
		}));
	}
	componentWillUnmount() {
		this.commandPaletteSubscriptions.forEach(unsubscribeFn => unsubscribeFn());
	}

	getEditorOptions(fileName = '') {
		let options = {
			gutters: ['error-gutter', 'CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
			emmet: true
		};
		if (fileName.match(/\.css$/)) {} else if (fileName.match(/\.js$/)) {
			delete options.emmet;
		} else if (fileName.match(/\.html$/)) {
			// HTML
			options = ContentWrapFiles__extends({}, options, {
				noAutocomplete: true,
				matchTags: { bothTags: true }
			});
		}

		return options;
	}

	createEditorDoc(file) {
		const detectedMode = CodeMirror.findModeByExtension(getExtensionFromFileName(file.name));
		let mode, mime;
		if (detectedMode) {
			mode = detectedMode.mode;
			mime = detectedMode.mimes ? detectedMode.mimes[0] : detectedMode.mime;

			CodeMirror.autoLoadMode(this.cm, mode);
		}
		if (mime === 'application/json') {
			mime = this.props.prefs.isMonacoEditorOn ? 'json' : 'application/ld+json';
		}
		if (!this.props.prefs.isMonacoEditorOn) {
			this.fileBuffers[file.path] = {
				model: CodeMirror.Doc(file.content || '', detectedMode ? mime : 'text/plain')
			};
		} else {
			this.fileBuffers[file.path] = {
				model: monaco.editor.createModel(file.content || '', mime || 'javascript')
			};
		}
	}

	onHtmlCodeChange(editor, change) {
		this.cmCodes.html = editor.getValue();

		this.props.onCodeChange(this.state.selectedFile, this.cmCodes.html, change.origin !== 'setValue');
		this.onCodeChange(change);
	}

	onCodeChange(change) {
		clearTimeout(this.updateTimer);

		this.updateTimer = setTimeout(() => {
			// This is done so that multiple simultaneous setValue don't trigger too many preview refreshes
			// and in turn too many file writes on a single file (eg. preview.html).
			if (change.origin !== 'setValue') {
				// Specifically checking for false so that the condition doesn't get true even
				// on absent key - possible when the setting key hasn't been fetched yet.
				if (this.prefs.autoPreview !== false) {
					this.setPreviewContent();
				}

				// Track when people actually are working.
				trackEvent.previewCount = (trackEvent.previewCount || 0) + 1;
				if (trackEvent.previewCount === 4) {
					trackEvent('fn', 'usingPreview');
				}
			}
		}, this.updateDelay);
	}

	createPreviewFile() {
		var obj = {};
		const duplicateFiles = JSON.parse(JSON.stringify(this.props.currentItem.files));
		// Namespace all file paths to '/user' because thats what the service worker
		// recognizes.
		const files = linearizeFiles(assignFilePaths(duplicateFiles, '/user'));

		files.forEach(file => {
			obj[file.path] = file.content || '';

			// Add screenlog to index.html
			if (file.name === 'index.html') {
				obj[file.path] = '<script src="' + (chrome.extension ? chrome.extension.getURL('lib/screenlog.js') : `${location.origin}${window.DEBUG ? '' : BASE_PATH}/lib/screenlog.js`) + '"></script>' + obj[file.path];
			}
		});

		navigator.serviceWorker.controller.postMessage(obj);

		if (this.detachedWindow) {
			utils_log('✉️ Sending message to detached window');
			this.detachedWindow.postMessage({ contents: '/user/index.html' }, '*');
		} else {
			this.frame.src = '/user/index.html';
		}
	}
	cleanupErrors() {
		this.editor.clearGutter('error-gutter');
	}

	showErrors(errors) {
		this.editor.showErrors(errors);
	}

	/**
  * Generates the preview from the current code.
  * @param {boolean} isForced Should refresh everything without any check or not
  * @param {boolean} isManual Is this a manual preview request from user?
  */
	setPreviewContent(isForced, isManual) {
		if (!this.props.prefs.autoPreview && !isManual) {
			return;
		}

		if (!this.props.prefs.preserveConsoleLogs) {
			this.clearConsole();
		}
		this.cleanupErrors();

		var currentCode = {
			html: this.cmCodes.html,
			css: this.cmCodes.css,
			js: this.cmCodes.js
		};
		utils_log('🔎 setPreviewContent', isForced);
		const targetFrame = this.detachedWindow ? this.detachedWindow.document.querySelector('iframe') : this.frame;

		this.createPreviewFile();
		// result.forEach(resultItem => {
		// 	if (resultItem.errors) {
		// 		this.showErrors(resultItem.errors.lang, resultItem.errors.data);
		// 	}
		// });
	}
	isValidItem(item) {
		return !!item.title;
	}
	refreshEditor() {
		if (this.state.selectedFile) {
			this.editor.setValue(this.state.selectedFile.content);
		}
		if (this.editor) {
			// this.editor.refresh();
		}
		window.cm = this.cm;

		this.clearConsole();

		// Set preview only when all modes are updated so that preview doesn't generate on partially
		// correct modes and also doesn't happen 3 times.
		Promise.all([this.updateHtmlMode(this.props.currentItem.htmlMode)]).then(() => this.setPreviewContent(true));
	}
	applyCodemirrorSettings(prefs) {
		document.documentElement.style.setProperty('--code-font-size', `${parseInt(prefs.fontSize, 10)}px`);

		// Replace correct css file in LINK tags's href
		if (prefs.editorTheme) {
			window.editorThemeLinkTag.href = `lib/codemirror/theme/${prefs.editorTheme}.css`;
		}

		window.fontStyleTag.textContent = window.fontStyleTemplate.textContent.replace(/fontname/g, (prefs.editorFont === 'other' ? prefs.editorCustomFont : prefs.editorFont) || 'FiraCode');
	}

	// Check all the code wrap if they are minimized or maximized
	updateCodeWrapCollapseStates() {
		// This is debounced!
		clearTimeout(this.updateCodeWrapCollapseStates.timeout);
		this.updateCodeWrapCollapseStates.timeout = setTimeout(() => {
			const { currentLayoutMode } = this.props;
			const prop = currentLayoutMode === 2 || currentLayoutMode === 5 ? 'width' : 'height';
			[htmlCodeEl].forEach(function (el) {
				const bounds = el.getBoundingClientRect();
				const size = bounds[prop];
				if (size < 100) {
					el.classList.add('is-minimized');
				} else {
					el.classList.remove('is-minimized');
				}
				if (el.style[prop].indexOf(`100% - ${ContentWrapFiles_minCodeWrapSize * 2}px`) !== -1) {
					el.classList.add('is-maximized');
				} else {
					el.classList.remove('is-maximized');
				}
			});
		}, 50);
	}

	resetSplitting() {
		this.setState({
			mainSplitSizes: this.getMainSplitSizesToApply()
		});
	}
	updateSplits() {
		this.props.onSplitUpdate();
		// Not using setState to avoid re-render
		this.state.mainSplitSizes = this.props.currentItem.mainSizes;
	}

	// Returns the sizes of main code & preview panes.
	getMainSplitSizesToApply() {
		var mainSplitSizes;
		const sidebarWidth = 200;
		const { currentItem, currentLayoutMode } = this.props;
		if (currentItem && currentItem.mainSizes) {
			mainSplitSizes = currentItem.mainSizes;
		} else {
			mainSplitSizes = [`${sidebarWidth}px`, `calc(50% - ${sidebarWidth / 2}px)`, `calc(50% - ${sidebarWidth / 2}px)`];
		}
		return mainSplitSizes;
	}

	mainSplitDragEndHandler() {
		if (this.props.prefs.refreshOnResize) {
			// Running preview updation in next call stack, so that error there
			// doesn't affect this dragend listener.
			setTimeout(() => {
				this.setPreviewContent(true);
			}, 1);
		}
		this.updateSplits();
	}
	mainSplitDragHandler() {
		this.previewDimension.update({
			w: this.frame.clientWidth,
			h: this.frame.clientHeight
		});
	}

	/**
  * Loaded the code comiler based on the mode selected
  */
	handleModeRequirements(mode) {
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
			loadJS(`${baseTranspilerPath}/sass.js`).then(function () {
				window.sass = new Sass(`${baseTranspilerPath}/sass.worker.js`);
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

	updateHtmlMode(value) {
		// this.props.onCodeModeChange('html', value);
		// this.props.currentItem.htmlMode = value;
		// this.cm.setOption('mode', modes[value].cmMode);
		// CodeMirror.autoLoadMode(
		// 	this.cm,
		// 	modes[value].cmPath || modes[value].cmMode
		// );
		// return this.handleModeRequirements(value);
	}
	updateCssMode(value) {
		// this.props.onCodeModeChange('css', value);
		// this.props.currentItem.cssMode = value;
		this.cm.setOption('mode', modes[value].cmMode);
		this.cm.setOption('readOnly', modes[value].cmDisable);
		/* window.cssSettingsBtn.classList[
  	modes[value].hasSettings ? 'remove' : 'add'
  ]('hide'); */
		CodeMirror.autoLoadMode(this.cm, modes[value].cmPath || modes[value].cmMode);
		return this.handleModeRequirements(value);
	}
	updateJsMode(value) {
		this.cm.setOption('mode', modes[value].cmMode);
		CodeMirror.autoLoadMode(this.cm, modes[value].cmPath || modes[value].cmMode);
		return this.handleModeRequirements(value);
	}

	getDemoFrame(callback) {
		callback(this.frame);
	}
	editorFocusHandler(editor) {
		this.props.onEditorFocus(editor);
	}
	fileSelectHandler(file) {
		if (file.isFolder) {
			this.props.onFolderSelect(file);
			return;
		}

		if (!this.fileBuffers[file.path]) {
			this.createEditorDoc(file);
		}

		const currentState = this.editor.saveViewState();
		if (currentState && this.state.selectedFile) {
			this.fileBuffers[this.state.selectedFile.path].state = currentState;
		}
		this.setState({
			editorOptions: this.getEditorOptions(file.name),
			selectedFile: file
		});

		this.editor.setModel(this.fileBuffers[file.path].model);
		if (this.fileBuffers[file.path].state) {
			this.editor.restoreViewState(this.fileBuffers[file.path].state);
		}

		this.editor.focus();
	}

	onMessageFromConsole() {
		const logs = [...arguments].map(arg => {
			if (arg && arg.indexOf && arg.indexOf('filesystem:chrome-extension') !== -1) {
				return arg.replace(/filesystem:chrome-extension.*\.js:(\d+):*(\d*)/g, 'script $1:$2');
			}
			return arg;
		});
		this.setState({
			logs: [...this.state.logs, ...logs]
		});
	}

	previewException(error) {
		console.error('Possible infinite loop detected.', error.stack);
		this.onMessageFromConsole('Possible infinite loop detected.', error.stack);
	}

	toggleConsole() {
		this.setState({
			isConsoleOpen: !this.state.isConsoleOpen
		});
		trackEvent('ui', 'consoleToggle');
	}
	consoleHeaderDblClickHandler(e) {
		if (!e.target.classList.contains('js-console__header')) {
			return;
		}
		trackEvent('ui', 'consoleToggleDblClick');
		this.toggleConsole();
	}
	clearConsole() {
		this.setState({ logs: [] });
	}
	clearConsoleBtnClickHandler() {
		this.clearConsole();
		trackEvent('ui', 'consoleClearBtnClick');
	}

	evalConsoleExpr(e) {
		// Clear console on CTRL + L
		if ((e.which === 76 || e.which === 12) && e.ctrlKey) {
			this.clearConsole();
			trackEvent('ui', 'consoleClearKeyboardShortcut');
		} else if (e.which === 13) {
			this.onMessageFromConsole('> ' + e.target.value);

			/* eslint-disable no-underscore-dangle */
			this.frame.contentWindow._wmEvaluate(e.target.value);

			/* eslint-enable no-underscore-dangle */

			e.target.value = '';
			trackEvent('fn', 'evalConsoleExpr');
		}
	}

	prettifyBtnClickHandler() {
		this.props.onPrettifyBtnClick(this.state.selectedFile);
	}
	render() {
		return Object(preact_min["h"])(
			SplitPane_SplitPane,
			{
				'class': 'content-wrap  flex  flex-grow',
				sizes: this.state.mainSplitSizes,
				minSize: 150,
				style: '',
				direction: this.props.currentLayoutMode === 2 ? 'vertical' : 'horizontal',
				onDrag: this.mainSplitDragHandler.bind(this),
				onDragEnd: this.mainSplitDragEndHandler.bind(this)
			},
			Object(preact_min["h"])(
				'div',
				{ id: 'js-sidebar' },
				Object(preact_min["h"])(SidePane_SidePane, {
					files: this.props.currentItem.files || [],
					selectedFile: this.state.selectedFile,
					onFileSelect: this.fileSelectHandler.bind(this),
					onAddFile: this.props.onAddFile,
					onRemoveFile: this.props.onRemoveFile,
					onRenameFile: this.props.onRenameFile,
					onFileDrop: this.props.onFileDrop
				})
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': 'code-side', id: 'js-code-side' },
				Object(preact_min["h"])(
					'div',
					{
						'data-code-wrap-id': '0',
						id: 'htmlCodeEl',
						'data-type': 'html',
						'class': 'code-wrap',
						onTransitionEnd: this.updateCodeWrapCollapseStates.bind(this)
					},
					Object(preact_min["h"])(
						'div',
						{
							'class': 'js-code-wrap__header  code-wrap__header',
							title: 'Double click to toggle code pane'
						},
						Object(preact_min["h"])(
							'label',
							{ 'class': 'btn-group', dropdow: true, title: 'Click to change' },
							this.state.selectedFile ? this.state.selectedFile.name : ''
						),
						Object(preact_min["h"])(
							'div',
							{ 'class': 'code-wrap__header-right-options' },
							Object(preact_min["h"])(
								'button',
								{
									'class': 'btn btn--dark',
									onClick: this.prettifyBtnClickHandler.bind(this)
								},
								'Prettify'
							),
							ContentWrapFiles__ref
						)
					),
					Object(preact_min["h"])(CodeEditor_CodeEditor, {
						type: this.props.prefs.isMonacoEditorOn ? 'monaco' : 'codemirror',
						value: this.state.selectedFile ? this.state.selectedFile.content : '',
						options: this.state.editorOptions,
						prefs: this.props.prefs,
						onChange: this.onHtmlCodeChange.bind(this),
						ref: editor => this.editor = editor,
						onFocus: this.editorFocusHandler.bind(this)
					})
				)
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': 'demo-side', id: 'js-demo-side', style: '' },
				Object(preact_min["h"])('iframe', {
					ref: el => this.frame = el,
					src: '/user/index.html',
					frameborder: '0',
					id: 'demo-frame',
					allowfullscreen: true
				}),
				Object(preact_min["h"])(PreviewDimension_PreviewDimension, { ref: comp => this.previewDimension = comp }),
				Object(preact_min["h"])(Console_Console, {
					logs: this.state.logs,
					isConsoleOpen: this.state.isConsoleOpen,
					onConsoleHeaderDblClick: this.consoleHeaderDblClickHandler,
					onClearConsoleBtnClick: this.clearConsoleBtnClickHandler,
					toggleConsole: this.toggleConsole,
					onEvalInputKeyup: this.evalConsoleExpr
				})
			)
		);
	}
};

// CONCATENATED MODULE: ./components/Footer.jsx




var Footer__ref = Object(preact_min["h"])('img', { src: 'assets/js13kgames.png', alt: 'JS13K Games logo', height: '24' });

let Footer_JS13K = class JS13K extends preact_min["Component"] {
	constructor(props) {
		super(props);
		const compoDate = new Date('August 13 2018 11:00 GMT');
		var now = new Date();
		var daysLeft;
		if (+compoDate > +now) {
			daysLeft = Math.floor((compoDate - now) / 1000 / 3600 / 24);
		}
		this.setState({
			daysLeft
		});
	}

	render() {
		const codeSizeInKb = this.props.codeSize ? (this.props.codeSize / 1024).toFixed(2) : 0;
		return Object(preact_min["h"])(
			'div',
			{
				role: 'button',
				'class': 'flex flex-v-center',
				tabIndex: '0',
				onClick: this.props.onClick,
				onBlur: this.props.onBlur
			},
			Footer__ref,
			' ',
			Object(preact_min["h"])(
				'div',
				{ 'class': 'footer__js13k-days-left' },
				this.state.daysLeft,
				' days to go'
			),
			Object(preact_min["h"])(
				'div',
				{
					'class': 'footer__js13k-code-size',
					style: {
						color: codeSizeInKb > 10 ? 'crimson' : 'limegreen'
					}
				},
				codeSizeInKb,
				' KB/ 13KB'
			),
			Object(preact_min["h"])('span', {
				'class': 'caret',
				style: `transition:0.3s ease; transform-origin: center 2px; ${this.props.isOpen ? 'transform:rotate(180deg);' : ''}`
			})
		);
	}
};

var Footer__ref2 = Object(preact_min["h"])(
	'a',
	{
		href: 'https://webmakerapp.com/',
		target: '_blank',
		rel: 'noopener noreferrer'
	},
	Object(preact_min["h"])('div', { 'class': 'logo' })
);

var Footer__ref3 = Object(preact_min["h"])(
	'span',
	{ 'class': 'web-maker-with-tag' },
	'Web Maker'
);

var Footer__ref4 = Object(preact_min["h"])(
	'svg',
	{
		style: 'width:20px; height:20px; vertical-align:text-bottom',
		viewBox: '0 0 24 24'
	},
	Object(preact_min["h"])('path', { d: 'M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.67 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z' })
);

var Footer__ref5 = Object(preact_min["h"])('use', { xlinkHref: '#keyboard-icon' });

var Footer__ref6 = Object(preact_min["h"])('use', { xlinkHref: '#twitter-icon' });

var Footer__ref7 = Object(preact_min["h"])(
	'svg',
	{ viewBox: '0 0 24 24' },
	Object(preact_min["h"])('path', { d: 'M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z' })
);

var Footer__ref8 = Object(preact_min["h"])(
	'svg',
	{ style: 'display: none;', xmlns: 'http://www.w3.org/2000/svg' },
	Object(preact_min["h"])(
		'symbol',
		{ id: 'codepen-logo', viewBox: '0 0 120 120' },
		Object(preact_min["h"])('path', {
			'class': 'outer-ring',
			d: 'M60.048 0C26.884 0 0 26.9 0 60.048s26.884 60 60 60.047c33.163 0 60.047-26.883 60.047-60.047 S93.211 0 60 0z M60.048 110.233c-27.673 0-50.186-22.514-50.186-50.186S32.375 9.9 60 9.9 c27.672 0 50.2 22.5 50.2 50.186S87.72 110.2 60 110.233z'
		}),
		Object(preact_min["h"])('path', {
			'class': 'inner-box',
			d: 'M97.147 48.319c-0.007-0.047-0.019-0.092-0.026-0.139c-0.016-0.09-0.032-0.18-0.056-0.268 c-0.014-0.053-0.033-0.104-0.05-0.154c-0.025-0.078-0.051-0.156-0.082-0.232c-0.021-0.053-0.047-0.105-0.071-0.156 c-0.033-0.072-0.068-0.143-0.108-0.211c-0.029-0.051-0.061-0.1-0.091-0.148c-0.043-0.066-0.087-0.131-0.135-0.193 c-0.035-0.047-0.072-0.094-0.109-0.139c-0.051-0.059-0.104-0.117-0.159-0.172c-0.042-0.043-0.083-0.086-0.127-0.125 c-0.059-0.053-0.119-0.104-0.181-0.152c-0.048-0.037-0.095-0.074-0.145-0.109c-0.019-0.012-0.035-0.027-0.053-0.039L61.817 23.5 c-1.072-0.715-2.468-0.715-3.54 0L24.34 46.081c-0.018 0.012-0.034 0.027-0.053 0.039c-0.05 0.035-0.097 0.072-0.144 0.1 c-0.062 0.049-0.123 0.1-0.181 0.152c-0.045 0.039-0.086 0.082-0.128 0.125c-0.056 0.055-0.108 0.113-0.158 0.2 c-0.038 0.045-0.075 0.092-0.11 0.139c-0.047 0.062-0.092 0.127-0.134 0.193c-0.032 0.049-0.062 0.098-0.092 0.1 c-0.039 0.068-0.074 0.139-0.108 0.211c-0.024 0.051-0.05 0.104-0.071 0.156c-0.031 0.076-0.057 0.154-0.082 0.2 c-0.017 0.051-0.035 0.102-0.05 0.154c-0.023 0.088-0.039 0.178-0.056 0.268c-0.008 0.047-0.02 0.092-0.025 0.1 c-0.019 0.137-0.029 0.275-0.029 0.416V71.36c0 0.1 0 0.3 0 0.418c0.006 0 0 0.1 0 0.1 c0.017 0.1 0 0.2 0.1 0.268c0.015 0.1 0 0.1 0.1 0.154c0.025 0.1 0.1 0.2 0.1 0.2 c0.021 0.1 0 0.1 0.1 0.154c0.034 0.1 0.1 0.1 0.1 0.213c0.029 0 0.1 0.1 0.1 0.1 c0.042 0.1 0.1 0.1 0.1 0.193c0.035 0 0.1 0.1 0.1 0.139c0.05 0.1 0.1 0.1 0.2 0.2 c0.042 0 0.1 0.1 0.1 0.125c0.058 0.1 0.1 0.1 0.2 0.152c0.047 0 0.1 0.1 0.1 0.1 c0.019 0 0 0 0.1 0.039L58.277 96.64c0.536 0.4 1.2 0.5 1.8 0.537c0.616 0 1.233-0.18 1.77-0.537 l33.938-22.625c0.018-0.012 0.034-0.027 0.053-0.039c0.05-0.035 0.097-0.072 0.145-0.109c0.062-0.049 0.122-0.1 0.181-0.152 c0.044-0.039 0.085-0.082 0.127-0.125c0.056-0.055 0.108-0.113 0.159-0.172c0.037-0.045 0.074-0.09 0.109-0.139 c0.048-0.062 0.092-0.127 0.135-0.193c0.03-0.049 0.062-0.098 0.091-0.146c0.04-0.07 0.075-0.141 0.108-0.213 c0.024-0.051 0.05-0.102 0.071-0.154c0.031-0.078 0.057-0.156 0.082-0.234c0.017-0.051 0.036-0.102 0.05-0.154 c0.023-0.088 0.04-0.178 0.056-0.268c0.008-0.045 0.02-0.092 0.026-0.137c0.018-0.139 0.028-0.277 0.028-0.418V48.735 C97.176 48.6 97.2 48.5 97.1 48.319z M63.238 32.073l25.001 16.666L77.072 56.21l-13.834-9.254V32.073z M56.856 32.1 v14.883L43.023 56.21l-11.168-7.471L56.856 32.073z M29.301 54.708l7.983 5.34l-7.983 5.34V54.708z M56.856 88.022L31.855 71.4 l11.168-7.469l13.833 9.252V88.022z M60.048 67.597l-11.286-7.549l11.286-7.549l11.285 7.549L60.048 67.597z M63.238 88.022V73.14 l13.834-9.252l11.167 7.469L63.238 88.022z M90.794 65.388l-7.982-5.34l7.982-5.34V65.388z'
		})
	)
);

var Footer__ref9 = Object(preact_min["h"])(
	'svg',
	null,
	Object(preact_min["h"])('use', { xlinkHref: '#codepen-logo' })
);

var Footer__ref10 = Object(preact_min["h"])(
	'svg',
	{ style: 'width:24px;height:24px', viewBox: '0 0 24 24' },
	Object(preact_min["h"])('path', { d: 'M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z' })
);

var Footer__ref11 = Object(preact_min["h"])('div', { 'class': 'footer__separator hide-on-mobile' });

var Footer__ref12 = Object(preact_min["h"])(
	'svg',
	{ viewBox: '0 0 100 100', style: 'transform:rotate(-90deg)' },
	Object(preact_min["h"])('use', { xlinkHref: '#mode-icon' })
);

var Footer__ref13 = Object(preact_min["h"])(
	'svg',
	{ viewBox: '0 0 100 100' },
	Object(preact_min["h"])('use', { xlinkHref: '#mode-icon' })
);

var Footer__ref14 = Object(preact_min["h"])(
	'svg',
	{ viewBox: '0 0 100 100', style: 'transform:rotate(90deg)' },
	Object(preact_min["h"])('use', { xlinkHref: '#mode-icon' })
);

var Footer__ref15 = Object(preact_min["h"])(
	'svg',
	{ viewBox: '0 0 100 100' },
	Object(preact_min["h"])('use', { xlinkHref: '#vertical-mode-icon' })
);

var Footer__ref16 = Object(preact_min["h"])(
	'svg',
	{ viewBox: '0 0 100 100' },
	Object(preact_min["h"])('rect', { x: '0', y: '0', width: '100', height: '100' })
);

var Footer__ref17 = Object(preact_min["h"])(
	'svg',
	{ viewBox: '0 0 24 24' },
	Object(preact_min["h"])('path', { d: 'M22,17V7H6V17H22M22,5A2,2 0 0,1 24,7V17C24,18.11 23.1,19 22,19H16V21H18V23H10V21H12V19H6C4.89,19 4,18.11 4,17V7A2,2 0 0,1 6,5H22M2,3V15H0V3A2,2 0 0,1 2,1H20V3H2Z' })
);

var _ref18 = Object(preact_min["h"])('div', { 'class': 'footer__separator' });

var _ref19 = Object(preact_min["h"])(
	'svg',
	{ viewBox: '0 0 24 24' },
	Object(preact_min["h"])('path', { d: 'M14,20A2,2 0 0,1 12,22A2,2 0 0,1 10,20H14M12,2A1,1 0 0,1 13,3V4.08C15.84,4.56 18,7.03 18,10V16L21,19H3L6,16V10C6,7.03 8.16,4.56 11,4.08V3A1,1 0 0,1 12,2Z' })
);

var _ref20 = Object(preact_min["h"])('span', { 'class': 'notifications-btn__dot' });

var _ref21 = Object(preact_min["h"])(
	'svg',
	null,
	Object(preact_min["h"])('use', { xlinkHref: '#settings-icon' })
);

let Footer_Footer = class Footer extends preact_min["Component"] {
	constructor(props) {
		super(props);
		this.state = {
			isKeyboardShortcutsModalOpen: false,
			isJs13kDropdownOpen: false
		};
	}
	layoutBtnClickhandler(layoutId) {
		this.props.layoutBtnClickHandler(layoutId);
	}

	js13kClickHandler() {
		// console.log(999);
		this.setState({
			isJs13kDropdownOpen: !this.state.isJs13kDropdownOpen
		});
	}

	render() {
		return Object(preact_min["h"])(
			'div',
			{ id: 'footer', 'class': 'footer' },
			Object(preact_min["h"])(
				'div',
				null,
				Footer__ref2,
				'\xA9',
				Footer__ref3,
				' \xA0\xA0',
				Object(preact_min["h"])(
					Button,
					{
						onClick: this.props.helpBtnClickHandler,
						'data-event-category': 'ui',
						'data-event-action': 'helpButtonClick',
						'class': 'footer__link  hint--rounded  hint--top-right',
						'aria-label': 'Help'
					},
					Footer__ref4
				),
				Object(preact_min["h"])(
					Button,
					{
						onClick: this.props.keyboardShortcutsBtnClickHandler,
						'data-event-category': 'ui',
						'data-event-action': 'keyboardShortcutButtonClick',
						'class': 'footer__link hint--rounded  hint--top-right hide-on-mobile',
						'aria-label': 'Keyboard shortcuts'
					},
					Object(preact_min["h"])(
						'svg',
						{
							style: {
								width: '20px',
								height: '20px',
								verticalAlign: 'text-bottom'
							}
						},
						Footer__ref5
					)
				),
				Object(preact_min["h"])(
					'a',
					{
						'class': 'footer__link  hint--rounded  hint--top-right',
						'aria-label': 'Tweet about \'Web Maker\'',
						href: 'http://twitter.com/share?url=https://webmakerapp.com/&text=Web Maker - A blazing fast %26 offline web playground! via @webmakerApp&related=webmakerApp&hashtags=web,frontend,playground,offline',
						target: '_blank',
						rel: 'noopener noreferrer'
					},
					Object(preact_min["h"])(
						'svg',
						{
							style: {
								width: '20px',
								height: '20px',
								verticalAlign: 'text-bottom'
							}
						},
						Footer__ref6
					)
				),
				Object(preact_min["h"])(
					Button,
					{
						onClick: this.props.supportDeveloperBtnClickHandler,
						'data-event-category': 'ui',
						'data-event-action': 'supportDeveloperFooterBtnClick',
						'class': 'footer__link  ml-1  hint--rounded  hint--top-right hide-on-mobile support-link',
						'aria-label': 'Support the developer by pledging some amount'
					},
					'Donate'
				)
			),
			this.props.prefs.isJs13kModeOn ? Object(preact_min["h"])(
				'div',
				{ 'class': 'flex flex-v-center' },
				Object(preact_min["h"])(Footer_JS13K, {
					isOpen: this.state.isJs13kDropdownOpen,
					codeSize: this.props.codeSize,
					onClick: this.js13kClickHandler.bind(this),
					onBlur: () => setTimeout(() => this.setState({ isJs13kDropdownOpen: false }), 300)
				}),
				this.state.isJs13kDropdownOpen && Object(preact_min["h"])(
					'div',
					{ className: 'js13k__dropdown' },
					Object(preact_min["h"])(
						'button',
						{
							'class': 'btn',
							style: {
								width: '200px',
								display: 'block',
								marginBottom: '16px'
							},
							onClick: this.props.onJs13KDownloadBtnClick
						},
						'Download game as zip'
					),
					Object(preact_min["h"])(
						'a',
						{
							'class': 'btn',
							rel: 'noopener',
							style: {
								width: '200px',
								display: 'block',
								marginBottom: '16px'
							},
							href: 'https://pasteboard.co/',
							target: '_blank'
						},
						'Upload Image'
					),
					Object(preact_min["h"])(
						'button',
						{
							'class': 'btn',
							style: { width: '200px', display: 'block' },
							onClick: this.props.onJs13KHelpBtnClick
						},
						'Help'
					)
				)
			) : null,
			Object(preact_min["h"])(
				'div',
				{ 'class': 'footer__right' },
				Object(preact_min["h"])(
					'button',
					{
						onClick: this.props.saveHtmlBtnClickHandler,
						id: 'saveHtmlBtn',
						'class': 'mode-btn  hint--rounded  hint--top-left hide-on-mobile hide-in-file-mode',
						'aria-label': 'Save as HTML file'
					},
					Footer__ref7
				),
				Footer__ref8,
				Object(preact_min["h"])(
					'button',
					{
						onClick: this.props.codepenBtnClickHandler,
						id: 'codepenBtn',
						'class': 'mode-btn  hint--rounded  hint--top-left  hide-on-mobile hide-in-file-mode',
						'aria-label': 'Edit on CodePen'
					},
					Footer__ref9
				),
				Object(preact_min["h"])(
					'button',
					{
						id: 'screenshotBtn',
						'class': 'mode-btn  hint--rounded  hint--top-left show-when-extension',
						onClick: this.props.screenshotBtnClickHandler,
						'aria-label': 'Take screenshot of preview'
					},
					Footer__ref10
				),
				Footer__ref11,
				Object(preact_min["h"])(
					'button',
					{
						onClick: this.layoutBtnClickhandler.bind(this, 1),
						id: 'layoutBtn1',
						'class': 'mode-btn hide-on-mobile hide-in-file-mode',
						'aria-label': 'Switch to layout with preview on right'
					},
					Footer__ref12
				),
				Object(preact_min["h"])(
					'button',
					{
						onClick: this.layoutBtnClickhandler.bind(this, 2),
						id: 'layoutBtn2',
						'class': 'mode-btn hide-on-mobile hide-in-file-mode',
						'aria-label': 'Switch to layout with preview on bottom'
					},
					Footer__ref13
				),
				Object(preact_min["h"])(
					'button',
					{
						onClick: this.layoutBtnClickhandler.bind(this, 3),
						id: 'layoutBtn3',
						'class': 'mode-btn hide-on-mobile hide-in-file-mode',
						'aria-label': 'Switch to layout with preview on left'
					},
					Footer__ref14
				),
				Object(preact_min["h"])(
					'button',
					{
						onClick: this.layoutBtnClickhandler.bind(this, 5),
						id: 'layoutBtn5',
						'class': 'mode-btn hide-on-mobile hide-in-file-mode',
						'aria-label': 'Switch to layout with all vertical panes'
					},
					Footer__ref15
				),
				Object(preact_min["h"])(
					'button',
					{
						onClick: this.layoutBtnClickhandler.bind(this, 4),
						id: 'layoutBtn4',
						'class': 'mode-btn hint--top-left hint--rounded  hide-on-mobile',
						'aria-label': 'Switch to full screen preview'
					},
					Footer__ref16
				),
				Object(preact_min["h"])(
					'button',
					{
						'class': 'mode-btn hint--top-left hint--rounded hide-on-mobile',
						'aria-label': 'Detach Preview',
						onClick: this.props.detachedPreviewBtnHandler
					},
					Footer__ref17
				),
				_ref18,
				Object(preact_min["h"])(
					'button',
					{
						onClick: this.props.notificationsBtnClickHandler,
						id: 'notificationsBtn',
						'class': `notifications-btn  mode-btn  hint--top-left  hint--rounded ${this.props.hasUnseenChangelog ? 'has-new' : ''}`,
						'aria-label': 'See Changelog'
					},
					_ref19,
					_ref20
				),
				Object(preact_min["h"])(
					Button,
					{
						onClick: this.props.settingsBtnClickHandler,
						'data-event-category': 'ui',
						'data-event-action': 'settingsBtnClick',
						'class': 'mode-btn  hint--top-left  hint--rounded',
						'aria-label': 'Settings'
					},
					_ref21
				)
			)
		);
	}
};

// EXTERNAL MODULE: ../node_modules/util/util.js
var util = __webpack_require__("gfUn");
var util_default = /*#__PURE__*/__webpack_require__.n(util);

// CONCATENATED MODULE: ./itemService.js



const itemService = {
	async getItem(id) {
		var remoteDb = await window.db.getDb();
		return remoteDb.doc(`items/${id}`).get().then(doc => {
			return doc.data();
		});
	},
	async getUserItemIds() {
		if (window.user) {
			return new Promise(resolve => {
				resolve(window.user.items || {});
			});
		}
		var remoteDb = await window.db.getDb();
		return remoteDb.doc(`users/${window.user.uid}`).get().then(doc => {
			if (!doc.exists) {
				return {};
			}
			return doc.data().items;
		});
	},

	async getAllItems() {
		var t = Date.now();
		var d = deferred();
		let itemIds = await this.getUserItemIds();
		itemIds = Object.getOwnPropertyNames(itemIds || {});
		Object(util["log"])('itemids', itemIds);

		if (!itemIds.length) {
			d.resolve([]);
		}
		var remoteDb = await window.db.getDb();
		const items = [];
		remoteDb.collection('items').where('createdBy', '==', window.user.uid).onSnapshot(function (querySnapshot) {
			querySnapshot.forEach(function (doc) {
				items.push(doc.data());
			});
			Object(util["log"])('Items fetched in ', Date.now() - t, 'ms');

			d.resolve(items);
		}, function () {
			d.resolve([]);
		});
		return d.promise;
	},

	async setUser() {
		const remoteDb = await window.db.getDb();
		return remoteDb.doc(`users/${window.user.uid}`).set({
			items: {}
		});
	},

	async setItem(id, item) {
		const d = deferred();
		var remotePromise;
		// TODO: check why we need to save locally always?
		const obj = {
			[id]: item
		};
		db.local.set(obj, () => {
			// Is extension OR is app but logged out OR is logged in but offline
			// If logged in but offline, resolve immediately so
			// that you see the feedback msg immediately and not wait for
			// later sync.
			if (window.IS_EXTENSION || !window.user || !navigator.onLine) {
				d.resolve();
			}
		});

		// If `id` is `code`, this is a call on unloadbefore to save the last open thing.
		// Do not presist that on remote.
		if (id === 'code') {
			// No deferred required here as this gets called on unloadbefore
			return false;
		}
		if (window.user) {
			var remoteDb = await window.db.getDb();
			Object(util["log"])(`Starting to save item ${id}`);
			item.createdBy = window.user.uid;
			remotePromise = remoteDb.collection('items').doc(id).set(item, {
				merge: true
			}).then(arg => {
				Object(util["log"])('Document written', arg);
				d.resolve();
			}).catch(d.reject);
		}

		return window.user && navigator.onLine ? remotePromise : d.promise;
	},

	/**
  * Saves the passed items in the database.
  * @param {Array} items to be saved in DB
  */
	saveItems(items) {
		var d = deferred();
		// When not logged in
		if (!window.user) {
			// save new items
			window.db.local.set(items, d.resolve);
			// Push in new item IDs
			window.db.local.get({
				items: {}
			}, function (result) {
				/* eslint-disable guard-for-in */
				for (var id in items) {
					result.items[id] = true;
				}
				window.db.local.set({
					items: result.items
				});
				/* eslint-enable guard-for-in */
			});
		} else {
			window.db.getDb().then(remoteDb => {
				const batch = remoteDb.batch();
				/* eslint-disable guard-for-in */
				for (var id in items) {
					items[id].createdBy = window.user.uid;
					batch.set(remoteDb.doc(`items/${id}`), items[id]);
					batch.update(remoteDb.doc(`users/${window.user.uid}`), {
						[`items.${id}`]: true
					});
					// Set these items on our cached user object too
					window.user.items = window.user.items || {};
					window.user.items[id] = true;
				}
				batch.commit().then(d.resolve);
				/* eslint-enable guard-for-in */
			});
		}
		return d.promise;
	},

	async removeItem(id) {
		// When not logged in
		if (!window.user) {
			var d = deferred();
			window.db.local.remove(id, d.resolve);
			return d.promise;
		}
		const remoteDb = await window.db.getDb();
		Object(util["log"])(`Starting to save item ${id}`);
		return remoteDb.collection('items').doc(id).delete().then(arg => {
			Object(util["log"])('Document removed', arg);
		}).catch(error => Object(util["log"])(error));
	},

	async setItemForUser(itemId) {
		// When not logged in
		if (!window.user) {
			return window.db.local.get({
				items: {}
			}, function (result) {
				result.items[itemId] = true;
				window.db.local.set({
					items: result.items
				});
			});
		}
		const remoteDb = await window.db.getDb();
		return remoteDb.collection('users').doc(window.user.uid).update({
			[`items.${itemId}`]: true
		}).then(arg => {
			Object(util["log"])(`Item ${itemId} set for user`, arg);
			window.user.items = window.user.items || {};
			window.user.items[itemId] = true;
		}).catch(error => Object(util["log"])(error));
	},

	async unsetItemForUser(itemId) {
		// When not logged in
		if (!window.user) {
			return window.db.local.get({
				items: {}
			}, function (result) {
				delete result.items[itemId];
				window.db.local.set({
					items: result.items
				});
			});
		}
		const remoteDb = await window.db.getDb();
		return remoteDb.collection('users').doc(window.user.uid).update({
			[`items.${itemId}`]: firebase.firestore.FieldValue.delete()
		}).then(arg => {
			delete window.user.items[itemId];
			Object(util["log"])(`Item ${itemId} unset for user`, arg);
		}).catch(error => Object(util["log"])(error));
	}
};
// CONCATENATED MODULE: ./notifications.js
var hideTimeout;

function addNotification(msg) {
	const noticationContainerEL = $('#js-alerts-container');

	// var n = document.createElement('div');
	// div.textContent = msg;
	// noticationContainerEL.appendChild(n);
	noticationContainerEL.textContent = msg;
	noticationContainerEL.classList.add('is-active');

	clearTimeout(hideTimeout);
	hideTimeout = setTimeout(function () {
		noticationContainerEL.classList.remove('is-active');
	}, 2000);
}

const alertsService = {
	add: addNotification
};
window.alertsService = alertsService;
// CONCATENATED MODULE: ./components/ItemTile.jsx





var ItemTile__ref = Object(preact_min["h"])(
	'span',
	{ 'class': 'show-when-selected' },
	'(Ctrl/\u2318 + F)'
);

var ItemTile__ref2 = Object(preact_min["h"])(
	'svg',
	{ style: 'width:24px;height:24px', viewBox: '0 0 24 24' },
	Object(preact_min["h"])('path', {
		fill: 'currentColor',
		d: 'M15,7H20.5L15,1.5V7M8,0H16L22,6V18A2,2 0 0,1 20,20H8C6.89,20 6,19.1 6,18V2A2,2 0 0,1 8,0M4,4V22H20V24H4A2,2 0 0,1 2,22V4H4Z'
	})
);

function ItemTile({
	item,
	onClick,
	onForkBtnClick,
	onRemoveBtnClick,
	focusable,
	inline
}) {
	return Object(preact_min["h"])(
		'div',
		{
			role: focusable ? 'button' : null,
			tabindex: focusable ? 0 : null,
			'class': `js-saved-item-tile saved-item-tile ${inline ? 'saved-item-tile--inline' : ''}`,
			'data-item-id': item.id,
			onClick: onClick
		},
		Object(preact_min["h"])(
			'div',
			{ 'class': 'saved-item-tile__btns' },
			onForkBtnClick ? Object(preact_min["h"])(
				'a',
				{
					'class': 'js-saved-item-tile__fork-btn  saved-item-tile__btn hint--left hint--medium',
					'aria-label': 'Creates a duplicate of this creation (Ctrl/\u2318 + F)',
					onClick: onForkBtnClick
				},
				'Fork',
				ItemTile__ref
			) : null,
			onRemoveBtnClick ? Object(preact_min["h"])(
				'a',
				{
					'class': 'js-saved-item-tile__remove-btn  saved-item-tile__btn hint--left',
					'aria-label': 'Remove',
					onClick: onRemoveBtnClick
				},
				'X'
			) : null
		),
		Object(preact_min["h"])(
			'div',
			{ className: 'flex flex-v-center' },
			item.img ? Object(preact_min["h"])(
				'div',
				null,
				Object(preact_min["h"])('img', {
					'class': 'saved-item-tile__img',
					height: '40',
					src: item.img,
					alt: ''
				})
			) : null,
			Object(preact_min["h"])(
				'h3',
				{ 'class': 'saved-item-tile__title' },
				item.title
			),
			item.files ? ItemTile__ref2 : null
		),
		item.updatedOn ? Object(preact_min["h"])(
			'div',
			{ 'class': 'saved-item-tile__meta' },
			'Last updated: ',
			getHumanDate(item.updatedOn)
		) : null
	);
}
// CONCATENATED MODULE: ./components/SavedItemPane.jsx









var SavedItemPane__ref = Object(preact_min["h"])(
	'div',
	{ 'class': 'mt-1' },
	'No match found.'
);

var SavedItemPane__ref2 = Object(preact_min["h"])(
	'h2',
	{ 'class': 'opacity--30' },
	'Nothing saved here.'
);

let SavedItemPane_SavedItemPane = class SavedItemPane extends preact_min["Component"] {
	constructor(props) {
		super(props);
		this.items = [];
		this.state = {
			filteredItems: []
		};
	}
	componentWillUpdate(nextProps) {
		if (this.props.items !== nextProps.items) {
			this.items = Object.values(nextProps.items);
			this.items.sort(function (a, b) {
				return b.updatedOn - a.updatedOn;
			});
			this.setState({
				filteredItems: this.items
			});
		}
	}
	componentDidUpdate(prevProps) {
		if (this.props.isOpen && !prevProps.isOpen) {
			window.searchInput.value = '';
		}
	}
	onCloseIntent() {
		this.props.closeHandler();
	}
	itemClickHandler(item) {
		this.props.itemClickHandler(item);
	}
	itemRemoveBtnClickHandler(item, e) {
		e.stopPropagation();
		this.props.itemRemoveBtnClickHandler(item);
	}
	itemForkBtnClickHandler(item, e) {
		e.stopPropagation();
		this.props.itemForkBtnClickHandler(item);
	}
	keyDownHandler(event) {
		if (!this.props.isOpen) {
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
				selectedItemElement[method]('.js-saved-item-tile:not(.hide)').classList.add('selected');
			} else {
				$('.js-saved-item-tile:not(.hide)').classList.add('selected');
			}
			$('.js-saved-item-tile.selected').scrollIntoView(false);
		}

		if (isEnterKeyPressed && selectedItemElement) {
			const item = this.props.items[selectedItemElement.dataset.itemId];
			console.log('opening', item);
			this.props.itemClickHandler(item);
			trackEvent('ui', 'openItemKeyboardShortcut');
		}

		// Fork shortcut inside saved creations panel with Ctrl/⌘ + F
		if (isForkKeyPressed) {
			event.preventDefault();
			const item = this.props.items[selectedItemElement.dataset.itemId];
			this.props.itemForkBtnClickHandler(item);
			trackEvent('ui', 'forkKeyboardShortcut');
		}
	}

	importFileChangeHandler(e) {
		var file = e.target.files[0];

		var reader = new FileReader();
		reader.addEventListener('load', progressEvent => {
			var items;
			try {
				items = JSON.parse(progressEvent.target.result);
				utils_log(items);
				this.props.mergeImportedItems(items);
			} catch (exception) {
				utils_log(exception);
				alert('Oops! Selected file is corrupted. Please select a file that was generated by clicking the "Export" button.');
			}
		});

		reader.readAsText(file, 'utf-8');
	}

	importBtnClickHandler(e) {
		var input = document.createElement('input');
		input.type = 'file';
		input.style.display = 'none';
		input.accept = 'accept="application/json';
		document.body.appendChild(input);
		input.addEventListener('change', this.importFileChangeHandler.bind(this));
		input.click();
		trackEvent('ui', 'importBtnClicked');
		e.preventDefault();
	}

	searchInputHandler(e) {
		const text = e.target.value;
		if (!text) {
			this.setState({
				filteredItems: this.items
			});
		} else {
			this.setState({
				filteredItems: this.items.filter(item => item.title.toLowerCase().indexOf(text) !== -1)
			});
		}
		trackEvent('ui', 'searchInputType');
	}

	render() {
		return Object(preact_min["h"])(
			'div',
			{
				id: 'js-saved-items-pane',
				'class': `saved-items-pane ${this.props.isOpen ? 'is-open' : ''}`,
				onKeyDown: this.keyDownHandler.bind(this)
			},
			Object(preact_min["h"])(
				'button',
				{
					onClick: this.onCloseIntent.bind(this),
					'class': 'btn  saved-items-pane__close-btn',
					id: 'js-saved-items-pane-close-btn'
				},
				'X'
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': 'flex flex-v-center', style: 'justify-content: space-between;' },
				Object(preact_min["h"])(
					'h3',
					null,
					'My Library (',
					this.items.length,
					')'
				),
				Object(preact_min["h"])(
					'div',
					null,
					Object(preact_min["h"])(
						'button',
						{
							onClick: this.props.exportBtnClickHandler,
							'class': 'btn--dark hint--bottom-left hint--rounded hint--medium',
							'aria-label': 'Export all your creations into a single importable file.'
						},
						'Export'
					),
					Object(preact_min["h"])(
						'button',
						{
							onClick: this.importBtnClickHandler.bind(this),
							'class': 'btn--dark hint--bottom-left hint--rounded hint--medium',
							'aria-label': 'Import your creations. Only the file that you export through the \'Export\' button can be imported.'
						},
						'Import'
					)
				)
			),
			Object(preact_min["h"])('input', {
				type: 'search',
				id: 'searchInput',
				'class': 'search-input',
				onInput: this.searchInputHandler.bind(this),
				placeholder: 'Search your creations here...'
			}),
			Object(preact_min["h"])(
				'div',
				{ id: 'js-saved-items-wrap', 'class': 'saved-items-pane__container' },
				!this.state.filteredItems.length && this.items.length ? SavedItemPane__ref : null,
				this.state.filteredItems.map(item => Object(preact_min["h"])(ItemTile, {
					item: item,
					onClick: this.itemClickHandler.bind(this, item),
					onForkBtnClick: this.itemForkBtnClickHandler.bind(this, item),
					onRemoveBtnClick: this.itemRemoveBtnClickHandler.bind(this, item)
				})),
				!this.items.length ? SavedItemPane__ref2 : null
			)
		);
	}
};

// CONCATENATED MODULE: ./libraryList.js
const jsLibs = [{
	url: 'https://code.jquery.com/jquery-3.2.1.min.js',
	label: 'jQuery',
	type: 'js'
}, {
	url: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
	label: 'Bootstrap 3',
	type: 'js'
}, {
	url: 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js',
	label: 'Bootstrap 4',
	type: 'js'
}, {
	url: 'https://cdn.jsdelivr.net/npm/foundation-sites@6.5.0-rc.3/dist/js/foundation.min.js',
	label: 'Foundation',
	type: 'js'
}, {
	url: 'https://semantic-ui.com/dist/semantic.min.js',
	label: 'Semantic UI',
	type: 'js'
}, {
	url: 'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.5/angular.min.js',
	label: 'Angular',
	type: 'js'
}, {
	url: 'https://cdnjs.cloudflare.com/ajax/libs/react/16.2.0/umd/react.production.min.js',
	label: 'React',
	type: 'js'
}, {
	url: 'https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.2.0/umd/react-dom.production.min.js',
	label: 'React DOM',
	type: 'js'
}, {
	url: 'https://unpkg.com/vue/dist/vue.min.js',
	label: 'Vue.js',
	type: 'js'
}, {
	url: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/89/three.min.js',
	label: 'Three.js',
	type: 'js'
}, {
	url: 'https://d3js.org/d3.v5.min.js',
	label: 'D3',
	type: 'js'
}, {
	url: 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js',
	label: 'Underscore',
	type: 'js'
}, {
	url: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.3/TweenMax.min.js',
	label: 'Greensock TweenMax',
	type: 'js'
}, {
	url: 'https://cdnjs.cloudflare.com/ajax/libs/uikit/2.27.5/js/uikit.min.js',
	label: 'UIkit 2',
	type: 'js'
}, {
	url: 'https://getuikit.com/assets/uikit/dist/js/uikit.js',
	label: 'UIkit 3',
	type: 'js'
}, {
	url: 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/p5.min.js',
	label: 'p5.js',
	type: 'js'
}, {
	url: 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/addons/p5.dom.min.js',
	label: 'p5.js DOM',
	type: 'js'
}, {
	url: 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/addons/p5.sound.min.js',
	label: 'p5.js Sound',
	type: 'js'
}, {
	url: 'https://unpkg.com/rxjs/bundles/rxjs.umd.min.js',
	label: 'RxJS',
	type: 'js'
}];
const cssLibs = [{
	url: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
	label: 'Bootstrap 3',
	type: 'css'
}, {
	url: 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css',
	label: 'Bootstrap 4',
	type: 'css'
}, {
	url: 'https://cdn.jsdelivr.net/npm/foundation-sites@6.5.0-rc.3/dist/css/foundation.min.css',
	label: 'Foundation',
	type: 'css'
}, {
	url: 'https://semantic-ui.com/dist/semantic.min.css',
	label: 'Semantic UI',
	type: 'css'
}, {
	url: 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.min.css',
	label: 'Bulma',
	type: 'css'
}, {
	url: 'https://cdnjs.cloudflare.com/ajax/libs/hint.css/2.5.0/hint.min.css',
	label: 'Hint.css',
	type: 'css'
}, {
	url: 'https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css',
	label: 'Tailwind.css',
	type: 'css'
}, {
	url: 'https://cdnjs.cloudflare.com/ajax/libs/uikit/2.27.5/css/uikit.min.css',
	label: 'UIkit 2',
	type: 'css'
}, {
	url: 'https://getuikit.com/assets/uikit/dist/css/uikit.css',
	label: 'UIkit 3',
	type: 'css'
}, {
	url: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css',
	label: 'Animate.css',
	type: 'css'
}, {
	url: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
	label: 'FontAwesome 4',
	type: 'css'
}, {
	url: 'https://use.fontawesome.com/releases/v5.4.1/css/all.css',
	label: 'FontAwesome 5',
	type: 'css'
}];
// CONCATENATED MODULE: ./components/LibraryAutoSuggest.jsx




let LibraryAutoSuggest_LibraryAutoSuggest = class LibraryAutoSuggest extends preact_min["Component"] {
	componentDidMount() {
		this.t = this.wrap.querySelector('input,textarea');
		this.filter = this.props.filter;
		this.selectedCallback = this.props.onSelect;

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
	}
	componentWillUnmount() {
		this.t.removeEventListener('input', e => this.onInput(e));
		this.t.removeEventListener('keydown', e => this.onKeyDown(e));
		this.t.removeEventListener('blur', e => this.closeSuggestions(e));
	}

	get currentLineNumber() {
		return this.t.value.substr(0, this.t.selectionStart).split('\n').length;
	}
	get currentLine() {
		var line = this.currentLineNumber;
		return this.t.value.split('\n')[line - 1];
	}
	listMouseDownHandler() {}
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
			if (currentLine.indexOf('/') !== -1 || currentLine.match(/https*:\/\//)) {
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
						this.list.innerHTML += `<li data-url="${arr[i].latest}"><a>${arr[i].name}</a></li>`;
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
			this.selectSuggestion(selectedItemElement.dataset.url);
			this.closeSuggestions();
		}
	}
	listMouseDownHandler(event) {
		var target = event.target;
		if (target.parentElement.dataset.url) {
			this.selectSuggestion(target.parentElement.dataset.url);
		}
	}

	selectSuggestion(value) {
		// Return back the focus which is getting lost for some reason

		this.t.focus();
		trackEvent('ui', 'autoSuggestionLibSelected', value);
		if (this.selectedCallback) {
			this.selectedCallback.call(null, value);
		} else {
			this.replaceCurrentLine(value);
		}
		this.closeSuggestions();
	}
	render() {
		return Object(preact_min["h"])(
			'div',
			{
				'class': `btn-group ${this.props.fullWidth ? 'flex-grow' : ''}`,
				ref: el => this.wrap = el
			},
			this.props.children,
			Object(preact_min["h"])('ul', {
				ref: el => this.list = el,
				'class': 'dropdown__menu autocomplete-dropdown',
				onMouseDown: this.listMouseDownHandler.bind(this)
			}),
			Object(preact_min["h"])('div', {
				ref: el => this.loader = el,
				'class': 'loader autocomplete__loader',
				style: 'display:none'
			})
		);
	}
};
// CONCATENATED MODULE: ./components/AddLibrary.jsx






var AddLibrary__ref = Object(preact_min["h"])(
	'h1',
	null,
	'Add Library'
);

var AddLibrary__ref2 = Object(preact_min["h"])(
	'svg',
	{ style: 'width: 30px; height: 30px;fill:rgb(255,255,255,0.5)' },
	Object(preact_min["h"])('use', { xlinkHref: '#search' })
);

var AddLibrary__ref3 = Object(preact_min["h"])('input', {
	type: 'text',
	id: 'externalLibrarySearchInput',
	'class': 'full-width',
	placeholder: 'Type here to search libraries'
});

var AddLibrary__ref4 = Object(preact_min["h"])(
	'div',
	{ 'class': 'tar opacity--70' },
	Object(preact_min["h"])(
		'small',
		null,
		'Powered by cdnjs'
	)
);

var AddLibrary__ref5 = Object(preact_min["h"])(
	'option',
	{ value: '' },
	'-------'
);

var AddLibrary__ref6 = Object(preact_min["h"])(
	'h3',
	{ 'class': 'mb-0' },
	'JS'
);

var AddLibrary__ref7 = Object(preact_min["h"])(
	'p',
	{ 'class': 'mt-0 help-text' },
	'Put each library in new line'
);

var AddLibrary__ref8 = Object(preact_min["h"])(
	'p',
	{ style: 'font-size: 0.8em;', 'class': 'show-when-extension opacity--70' },
	'Note: You can load external scripts from following domains: localhost, https://ajax.googleapis.com, https://code.jquery.com, https://cdnjs.cloudflare.com, https://unpkg.com, https://maxcdn.com, https://cdn77.com, https://maxcdn.bootstrapcdn.com, https://cdn.jsdelivr.net/, https://rawgit.com, https://wzrd.in'
);

var AddLibrary__ref9 = Object(preact_min["h"])(
	'h3',
	{ 'class': 'mb-0' },
	'CSS'
);

var AddLibrary__ref10 = Object(preact_min["h"])(
	'p',
	{ 'class': 'mt-0 help-text' },
	'Put each library in new line'
);

let AddLibrary_AddLibrary = class AddLibrary extends preact_min["Component"] {
	constructor(props) {
		super(props);
		this.state = {
			css: props.css || '',
			js: props.js || ''
		};
	}
	onSelectChange(e) {
		const target = e.target;
		if (!target.value) {
			return;
		}
		const type = target.selectedOptions[0].dataset.type;
		if (type === 'js') {
			this.setState({
				js: `${this.state.js}\n${target.value}`
			});
		} else {
			this.setState({
				css: `${this.state.css}\n${target.value}`
			});
		}

		trackEvent('ui', 'addLibrarySelect', target.selectedOptions[0].label);
		this.props.onChange({ js: this.state.js, css: this.state.css });
		// Reset the select to the default value
		target.value = '';
	}
	textareaBlurHandler(e, textarea) {
		const target = e ? e.target : textarea;
		const type = target.dataset.lang;
		if (type === 'js') {
			this.setState({
				js: target.value || ''
			});
		} else {
			this.setState({
				css: target.value || ''
			});
		}

		// trackEvent('ui', 'addLibrarySelect', target.selectedOptions[0].label);
		this.props.onChange({ js: this.state.js, css: this.state.css });
	}
	suggestionSelectHandler(value) {
		const textarea = value.match(/\.js$/) ? window.externalJsTextarea : window.externalCssTextarea;
		textarea.value = `${textarea.value}\n${value}`;
		window.externalLibrarySearchInput.value = '';
		this.textareaBlurHandler(null, textarea);
	}
	render() {
		return Object(preact_min["h"])(
			'div',
			null,
			AddLibrary__ref,
			Object(preact_min["h"])(
				'div',
				{ 'class': 'flex flex-v-center' },
				AddLibrary__ref2,
				Object(preact_min["h"])(
					LibraryAutoSuggest_LibraryAutoSuggest,
					{
						fullWidth: true,
						onSelect: this.suggestionSelectHandler.bind(this)
					},
					AddLibrary__ref3
				)
			),
			AddLibrary__ref4,
			Object(preact_min["h"])(
				'div',
				{ style: 'margin:20px 0;' },
				'Choose from popular libraries:',
				' ',
				Object(preact_min["h"])(
					'select',
					{
						name: '',
						id: 'js-add-library-select',
						onChange: this.onSelectChange.bind(this)
					},
					AddLibrary__ref5,
					Object(preact_min["h"])(
						'optgroup',
						{ label: 'JavaScript Libraries' },
						jsLibs.map(lib => Object(preact_min["h"])(
							'option',
							{ 'data-type': lib.type, value: lib.url },
							lib.label
						))
					),
					Object(preact_min["h"])(
						'optgroup',
						{ label: 'CSS Libraries' },
						cssLibs.map(lib => Object(preact_min["h"])(
							'option',
							{ 'data-type': lib.type, value: lib.url },
							lib.label
						))
					)
				)
			),
			AddLibrary__ref6,
			AddLibrary__ref7,
			AddLibrary__ref8,
			Object(preact_min["h"])('textarea', {
				onBlur: this.textareaBlurHandler.bind(this),
				'data-lang': 'js',
				'class': 'full-width',
				id: 'externalJsTextarea',
				cols: '30',
				rows: '5',
				value: this.state.js
			}),
			AddLibrary__ref9,
			AddLibrary__ref10,
			Object(preact_min["h"])('textarea', {
				onBlur: this.textareaBlurHandler.bind(this),
				'data-lang': 'css',
				'class': 'full-width',
				id: 'externalCssTextarea',
				cols: '30',
				rows: '5',
				value: this.state.css
			})
		);
	}
};

// EXTERNAL MODULE: ../node_modules/firebase/app/dist/index.cjs.js
var index_cjs = __webpack_require__("ZUoI");
var index_cjs_default = /*#__PURE__*/__webpack_require__.n(index_cjs);

// CONCATENATED MODULE: ./auth.js




const auth = {
	logout() {
		index_cjs_default.a.auth().signOut();
	},
	login(providerName) {
		var provider;
		if (providerName === 'facebook') {
			provider = new index_cjs_default.a.auth.FacebookAuthProvider();
		} else if (providerName === 'twitter') {
			provider = new index_cjs_default.a.auth.TwitterAuthProvider();
		} else if (providerName === 'google') {
			provider = new index_cjs_default.a.auth.GoogleAuthProvider();
			provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
		} else {
			provider = new index_cjs_default.a.auth.GithubAuthProvider();
		}

		return index_cjs_default.a.auth().signInWithPopup(provider).then(function () {
			trackEvent('fn', 'loggedIn', providerName);
			// Save to recommend next time
			window.db.local.set({
				lastAuthProvider: providerName
			});
		}).catch(function (error) {
			utils_log(error);
			if (error.code === 'auth/account-exists-with-different-credential') {
				alert('You have already signed up with the same email using different social login');
			}
		});
	}
};
// CONCATENATED MODULE: ./components/Login.jsx





var Login__ref = Object(preact_min["h"])(
	'h2',
	null,
	'Login / Signup'
);

var Login__ref2 = Object(preact_min["h"])(
	'svg',
	null,
	Object(preact_min["h"])('use', { xlinkHref: '#github-icon' })
);

var Login__ref3 = Object(preact_min["h"])(
	'svg',
	null,
	Object(preact_min["h"])('use', { xlinkHref: '#google-icon' })
);

var Login__ref4 = Object(preact_min["h"])(
	'svg',
	null,
	Object(preact_min["h"])('use', { xlinkHref: '#fb-icon' })
);

var Login__ref5 = Object(preact_min["h"])(
	'p',
	null,
	'Join a community of 50,000+ Developers'
);

let Login_Login = class Login extends preact_min["Component"] {
	login(e) {
		const provider = e.target.dataset.authProvider;
		trackEvent('ui', 'loginProviderClick', provider);
		auth.login(provider);
	}
	componentDidMount() {
		window.db.local.get({
			lastAuthProvider: ''
		}, result => {
			if (result.lastAuthProvider) {
				document.body.classList.add(`last-login-${result.lastAuthProvider}`);
			}
		});
	}
	render() {
		return Object(preact_min["h"])(
			'div',
			null,
			Login__ref,
			Object(preact_min["h"])(
				'div',
				null,
				Object(preact_min["h"])(
					'p',
					null,
					Object(preact_min["h"])(
						'button',
						{
							type: 'button',
							onClick: this.login.bind(this),
							'class': 'social-login-btn social-login-btn--github  btn btn-icon btn--big full-width hint--right hint--always',
							'data-auth-provider': 'github',
							'data-hint': 'You logged in with Github last time'
						},
						Login__ref2,
						'Login with Github'
					)
				),
				Object(preact_min["h"])(
					'p',
					null,
					Object(preact_min["h"])(
						'button',
						{
							type: 'button',
							onClick: this.login.bind(this),
							'class': 'social-login-btn social-login-btn--google  btn btn-icon btn--big full-width hint--right hint--always',
							'data-auth-provider': 'google',
							'data-hint': 'You logged in with Google last time'
						},
						Login__ref3,
						'Login with Google'
					)
				),
				Object(preact_min["h"])(
					'p',
					{ 'class': 'mb-2' },
					Object(preact_min["h"])(
						'button',
						{
							type: 'button',
							onClick: this.login.bind(this),
							'class': 'social-login-btn social-login-btn--facebook  btn btn-icon btn--big full-width hint--right hint--always',
							'data-auth-provider': 'facebook',
							'data-hint': 'You logged in with Facebook last time'
						},
						Login__ref4,
						'Login with Facebook'
					)
				),
				Login__ref5
			)
		);
	}
};

// CONCATENATED MODULE: ./firebaseInit.js

// import 'firebase/firestore';
const config = {
	apiKey: 'AIzaSyBl8Dz7ZOE7aP75mipYl2zKdLSRzBU2fFc',
	authDomain: 'web-maker-app.firebaseapp.com',
	databaseURL: 'https://web-maker-app.firebaseio.com',
	projectId: 'web-maker-app',
	storageBucket: 'web-maker-app.appspot.com',
	messagingSenderId: '560473480645'
};
index_cjs_default.a.initializeApp(config);
// EXTERNAL MODULE: ../node_modules/firebase/firestore/dist/index.esm.js
var index_esm = __webpack_require__("7vHL");

// CONCATENATED MODULE: ./db.js
var db__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };








(() => {
	const FAUX_DELAY = 1;

	var db;
	var dbPromise;

	var local = {
		get: (obj, cb) => {
			const retVal = {};
			if (typeof obj === 'string') {
				retVal[obj] = JSON.parse(window.localStorage.getItem(obj));
				setTimeout(() => cb(retVal), FAUX_DELAY);
			} else {
				Object.keys(obj).forEach(key => {
					const val = window.localStorage.getItem(key);
					retVal[key] = val === undefined || val === null ? obj[key] : JSON.parse(val);
				});
				setTimeout(() => cb(retVal), FAUX_DELAY);
			}
		},
		set: (obj, cb) => {
			Object.keys(obj).forEach(key => {
				window.localStorage.setItem(key, JSON.stringify(obj[key]));
			});
			/* eslint-disable consistent-return */
			setTimeout(() => {
				if (cb) {
					return cb();
				}
			}, FAUX_DELAY);
			/* eslint-enable consistent-return */
		},
		remove: (key, cb) => {
			window.localStorage.removeItem(key);
			setTimeout(() => cb(), FAUX_DELAY);
		}
	};
	const dbLocalAlias = chrome && chrome.storage ? chrome.storage.local : local;
	const dbSyncAlias = chrome && chrome.storage ? chrome.storage.sync : local;

	async function getDb() {
		if (dbPromise) {
			return dbPromise;
		}
		utils_log('Initializing firestore');
		dbPromise = new Promise((resolve, reject) => {
			if (db) {
				return resolve(db);
			}
			const firestoreInstance = index_cjs_default.a.firestore();
			firestoreInstance.settings({ timestampsInSnapshots: true });
			return firestoreInstance.enablePersistence({ experimentalTabSynchronization: true }).then(function () {
				// Initialize Cloud Firestore through firebase
				db = index_cjs_default.a.firestore();
				// const settings = {
				// 	timestampsInSnapshots: true
				// };
				// db.settings(settings);
				utils_log('firebase db ready', db);
				resolve(db);
			}).catch(function (err) {
				reject(err.code);
				if (err.code === 'failed-precondition') {
					// Multiple tabs open, persistence can only be enabled
					// in one tab at a a time.
					alert("Opening Web Maker web app in multiple tabs isn't supported at present and it seems like you already have it opened in another tab. Please use in one tab.");
					trackEvent('fn', 'multiTabError');
				} else if (err.code === 'unimplemented') {
					// The current browser does not support all of the
					// features required to enable persistence
					// ...
				}
			});
		});
		return dbPromise;
	}

	async function getUserLastSeenVersion() {
		const d = deferred();
		// Will be chrome.storage.sync in extension environment,
		// otherwise will fallback to localstorage
		dbSyncAlias.get({
			lastSeenVersion: ''
		}, result => {
			d.resolve(result.lastSeenVersion);
		});
		return d.promise;
		// Might consider getting actual value from remote db.
		// Not critical right now.
	}

	async function setUserLastSeenVersion(version) {
		// Setting the `lastSeenVersion` in localStorage(sync for extension) always
		// because next time we need to fetch it irrespective of the user being
		// logged in or out quickly from local storage.
		dbSyncAlias.set({
			lastSeenVersion: version
		}, function () {});
		if (window.user) {
			const remoteDb = await getDb();
			remoteDb.doc(`users/${window.user.uid}`).update({
				lastSeenVersion: version
			});
		}
	}

	async function getUser(userId) {
		const remoteDb = await getDb();
		return remoteDb.doc(`users/${userId}`).get().then(doc => {
			if (!doc.exists) return remoteDb.doc(`users/${userId}`).set({}, {
				merge: true
			});
			const user = doc.data();
			db__extends(window.user, user);
			return user;
		});
	}

	// Fetch user settings.
	// This isn't hitting the remote db because remote settings
	// get fetch asynchronously (in user/) and update the envioronment.
	function getSettings(defaultSettings) {
		const d = deferred();
		// Will be chrome.storage.sync in extension environment,
		// otherwise will fallback to localstorage
		dbSyncAlias.get(defaultSettings, result => {
			d.resolve(result);
		});
		return d.promise;
	}

	window.db = {
		getDb,
		getUser,
		getUserLastSeenVersion,
		setUserLastSeenVersion,
		getSettings,
		local: dbLocalAlias,
		sync: dbSyncAlias
	};
})();
// CONCATENATED MODULE: ./components/Notifications.jsx
var Notifications__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



function Notifications__objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }




var Notifications__ref = Object(preact_min["h"])(
	'strong',
	null,
	'\uD83D\uDD27 Bugfix'
);

var Notifications__ref2 = Object(preact_min["h"])(
	'strong',
	null,
	'\u267F\uFE0F Accessibility'
);

var Notifications__ref3 = Object(preact_min["h"])(
	'strong',
	null,
	'\uD83D\uDDA5 Interface'
);

function NotificationItem({ type, children }) {
	var strongTag;
	if (type === 'bug') {
		strongTag = Notifications__ref;
	} else if (type === 'a11y') {
		strongTag = Notifications__ref2;
	} else if (type === 'ui') {
		strongTag = Notifications__ref3;
	}
	return Object(preact_min["h"])(
		'li',
		null,
		strongTag,
		': ',
		children
	);
}

function ThanksTo({ name, url }) {
	return Object(preact_min["h"])(
		'a',
		{ href: url, target: '_blank', rel: 'noopener noreferrer' },
		' ',
		name
	);
}

var Notifications__ref5 = Object(preact_min["h"])(
	'p',
	null,
	Object(preact_min["h"])(
		'strong',
		null,
		'\uD83D\uDE80 Announcement'
	),
	': Hi! I am Kushagra Gour (creator of Web Maker) and I have launched a',
	Object(preact_min["h"])(
		'a',
		{
			href: 'https://patreon.com/kushagra',
			target: '_blank',
			rel: 'noopener noreferrer'
		},
		' ',
		'Patreon campaign'
	),
	'. If you love Web Maker, consider pledging to',
	Object(preact_min["h"])(
		'a',
		{
			href: 'https://patreon.com/kushagra',
			target: '_blank',
			rel: 'noopener noreferrer'
		},
		' ',
		'support me'
	),
	' ',
	':)'
);

var Notifications__ref6 = Object(preact_min["h"])(
	'p',
	null,
	Object(preact_min["h"])(
		'a',
		{
			href: 'https://github.com/chinchang/web-maker/issues',
			target: '_blank',
			rel: 'noopener noreferrer'
		},
		'Suggest features or report bugs.'
	)
);

var Notifications__ref7 = Object(preact_min["h"])(
	'a',
	{
		href: 'https://chrome.google.com/webstore/detail/web-maker/lkfkkhfhhdkiemehlpkgjeojomhpccnh/reviews',
		target: '_blank',
		rel: 'noopener noreferrer',
		'class': 'btn'
	},
	'Please rate Web Maker ',
	Object(preact_min["h"])('span', { 'class': 'star' })
);

var Notifications__ref8 = Object(preact_min["h"])(
	'a',
	{
		href: 'http://twitter.com/share?url=https://webmakerapp.com/&text=Web Maker - A blazing fast %26 offline web playground! via @webmakerApp&related=webmakerApp&hashtags=web,editor,chrome,extension',
		target: '_blank',
		rel: 'noopener noreferrer',
		'class': 'btn'
	},
	'Share it'
);

function Notification(_ref4) {
	let { version, isLatest } = _ref4,
	    props = Notifications__objectWithoutProperties(_ref4, ['version', 'isLatest']);

	return Object(preact_min["h"])(
		'div',
		{ 'class': 'notification' },
		Object(preact_min["h"])(
			'span',
			{ 'class': 'notification__version' },
			version
		),
		Object(preact_min["h"])(
			'ul',
			null,
			props.children
		),
		isLatest ? Object(preact_min["h"])(
			'div',
			{ 'class': 'mt-2' },
			Notifications__ref5,
			Notifications__ref6,
			Object(preact_min["h"])(
				'p',
				null,
				'Web Maker now has more than 50K weekly active users! Thank you for being a part of this community of awesome developers. If you find Web Maker helpful,',
				' ',
				Notifications__ref7,
				'\xA0',
				Notifications__ref8,
				'\xA0',
				Object(preact_min["h"])(
					Button,
					{
						'aria-label': 'Support the developer',
						onClick: props.onSupportBtnClick,
						'data-event-action': 'supportDeveloperChangelogBtnClick',
						'data-event-category': 'ui',
						'class': 'btn btn-icon'
					},
					'Support the developer'
				)
			)
		) : null
	);
}

var Notifications__ref9 = Object(preact_min["h"])(
	'h1',
	null,
	'Whats new?'
);

var Notifications__ref10 = Object(preact_min["h"])(
	NotificationItem,
	{ type: 'bug' },
	'Failing to import local creations when logging in.'
);

var Notifications__ref11 = Object(preact_min["h"])(
	'li',
	null,
	Object(preact_min["h"])(
		'strong',
		null,
		'New Setting'
	),
	': Configure if you want to auto-close the tags in HTML. (#347)'
);

var Notifications__ref12 = Object(preact_min["h"])(
	'li',
	null,
	Object(preact_min["h"])(
		'strong',
		null,
		'Prettier'
	),
	': Prettier now works on HTML also! Also the keyboard shortcut has been changed to ',
	Object(preact_min["h"])(
		'kbd',
		null,
		'Ctrl'
	),
	' +',
	' ',
	Object(preact_min["h"])(
		'kbd',
		null,
		'Shift'
	),
	' + ',
	Object(preact_min["h"])(
		'kbd',
		null,
		'F'
	),
	'.'
);

var Notifications__ref13 = Object(preact_min["h"])(
	'li',
	null,
	'No more anonying alert on opening Web Maker in multiple tabs. Thanks team Firebase :) (#340)'
);

var Notifications__ref14 = Object(preact_min["h"])(
	'li',
	null,
	Object(preact_min["h"])(
		'strong',
		null,
		'\uD83D\uDD25 Web Maker 4.0 is coming!'
	),
	' Follow',
	' ',
	Object(preact_min["h"])(
		'a',
		{
			href: 'https://twitter.com/webmakerApp',
			target: '_blank',
			rel: 'noopener'
		},
		'Web Maker on Twitter'
	),
	' ',
	'to keep up with all the exciting updates.'
);

var Notifications__ref15 = Object(preact_min["h"])(
	'li',
	null,
	Object(preact_min["h"])(
		'strong',
		null,
		'Hidden Prettier'
	),
	': Selecting code and pressing Shift+Tab now uses Prettier to auto-format. This will improve UX wise in coming versions.'
);

var Notifications__ref16 = Object(preact_min["h"])(
	'li',
	null,
	Object(preact_min["h"])(
		'strong',
		null,
		'New Template'
	),
	': Template for Vue.js is available when you start a new creation. Thanks',
	' ',
	Object(preact_min["h"])(ThanksTo, { url: 'https://github.com/khamer', name: '@khamer' })
);

var Notifications__ref17 = Object(preact_min["h"])(
	'li',
	null,
	'\u2B06\uFE0F Popular libraries updated to latest versions. Thanks',
	Object(preact_min["h"])(ThanksTo, { url: 'https://github.com/diomed', name: '@diomed' })
);

var Notifications__ref18 = Object(preact_min["h"])(
	'li',
	null,
	'\uD83D\uDE80 RxJS added to popular libraries list. Thanks',
	Object(preact_min["h"])(ThanksTo, { url: 'https://github.com/jpsc', name: '@jpsc' })
);

var Notifications__ref19 = Object(preact_min["h"])(
	NotificationItem,
	{ type: 'bug' },
	'Not able to select libraries twice with mouse click in Add Library modal.'
);

var Notifications__ref20 = Object(preact_min["h"])(
	NotificationItem,
	{ type: 'bug' },
	'Console going outside the viewport on huge logs.'
);

var Notifications__ref21 = Object(preact_min["h"])(
	NotificationItem,
	{ type: 'bug' },
	'Console dissapearing in detached mode on changing layouts.'
);

var _ref22 = Object(preact_min["h"])(
	'li',
	null,
	Object(preact_min["h"])(
		'strong',
		null,
		'[Dev]'
	),
	': Improve',
	' ',
	Object(preact_min["h"])(
		'a',
		{
			href: 'https://github.com/chinchang/web-maker/blob/master/CONTRIBUTING.md',
			target: '_blank',
			rel: 'noopener'
		},
		'contribution guide'
	),
	' ',
	'and add issue template on Github.'
);

var _ref23 = Object(preact_min["h"])(
	'li',
	null,
	Object(preact_min["h"])(
		'strong',
		null,
		'Js13kGames Mode'
	),
	': Add image upload option using Pasteboard.co.',
	' ',
	Object(preact_min["h"])(
		'a',
		{
			href: 'https://medium.com/web-maker/js13kgames-jam-with-web-maker-a3389cf2cbb',
			target: '_blank',
			rel: 'noopener'
		},
		'Read more about it here.'
	)
);

var _ref24 = Object(preact_min["h"])(
	'li',
	null,
	Object(preact_min["h"])(
		'strong',
		null,
		'Kontra.js template'
	),
	': Update to latest 4.0.0.'
);

var _ref25 = Object(preact_min["h"])(
	NotificationItem,
	{ type: 'a11y' },
	'Fix color contrast for various texts.'
);

var _ref26 = Object(preact_min["h"])(
	NotificationItem,
	{ type: 'bug' },
	'Fix external script paths in downloaded zip in Js13KGame mode.'
);

var _ref27 = Object(preact_min["h"])(
	'li',
	null,
	Object(preact_min["h"])(
		'strong',
		null,
		'\uD83C\uDF89 Js13kGames Mode'
	),
	': For all you Js13kGames compo participants out there. Turn it on from Settings.',
	' ',
	Object(preact_min["h"])(
		'a',
		{
			href: 'https://medium.com/web-maker/js13kgames-jam-with-web-maker-a3389cf2cbb',
			target: '_blank',
			rel: 'noopener'
		},
		'Read more about it here.'
	)
);

var _ref28 = Object(preact_min["h"])(
	'li',
	null,
	Object(preact_min["h"])(
		'strong',
		null,
		'\uD83C\uDF89 Templates'
	),
	': Presenting, templates for major libraries and frameworks. Hit the "New" button to explore.'
);

var _ref29 = Object(preact_min["h"])(
	NotificationItem,
	{ type: 'a11y' },
	'Add missing focus rings around focusable element.'
);

var _ref30 = Object(preact_min["h"])(
	NotificationItem,
	{ type: 'ui' },
	'Migrate remaining interface elements to dark theme. Now complete app is in dark theme.'
);

var _ref31 = Object(preact_min["h"])(
	NotificationItem,
	{ type: 'bug' },
	'Fix "Save as HTML" and "Take Screenshot" features in Chrome extension.'
);

var _ref32 = Object(preact_min["h"])(
	NotificationItem,
	{ type: 'a11y' },
	'Improper links are now buttons with proper focus indication and screen-reader support. Thanks',
	' ',
	Object(preact_min["h"])(ThanksTo, { url: 'https://github.com/jpsc', name: '@jpsc' })
);

var _ref33 = Object(preact_min["h"])(
	NotificationItem,
	{ type: 'bug' },
	'Auto-complete suggestions are now working.'
);

var _ref34 = Object(preact_min["h"])(
	NotificationItem,
	{ type: 'bug' },
	'Fixes resetting pane sizes when opening any popup or console.'
);

var _ref35 = Object(preact_min["h"])(
	'li',
	null,
	Object(preact_min["h"])(
		'strong',
		null,
		'[Dev] Tests'
	),
	': We now have one running automated test :) More to come. Thanks',
	' ',
	Object(preact_min["h"])(ThanksTo, { url: 'https://github.com/DanielRuf', name: '@DanielRuf' })
);

var _ref36 = Object(preact_min["h"])(
	'li',
	null,
	Object(preact_min["h"])(
		'strong',
		null,
		'\uD83D\uDD25 [Dev] Code Refactor'
	),
	': I rewrote Web Maker. Yes, Web Maker\'s codebase has been ported from plain JS to',
	' ',
	Object(preact_min["h"])(
		'a',
		{
			href: 'https://preactjs.com/',
			target: '_blank',
			rel: 'noopener noreferrer'
		},
		'Preact'
	),
	'. What does this mean for you as a end-user? This means that now that the code is much smaller, more modular and maintainable. Hence, future features can be developed more rapidly. So fasten your seat belts, and get ready to use loads of new features coming your way in next releases!',
	Object(preact_min["h"])('br', null),
	Object(preact_min["h"])(
		'a',
		{
			href: 'https://medium.com/web-maker/web-maker-is-now-in-preact-85af98be8683',
			target: '_blank',
			rel: 'noopener noreferrer'
		},
		'Read more about this big code refactor'
	),
	'.'
);

var _ref37 = Object(preact_min["h"])(
	'li',
	null,
	Object(preact_min["h"])(
		'a',
		{ href: 'https://p5js.org/', target: '_blank', rel: 'noopener noreferrer' },
		'p5.js'
	),
	' ',
	'added to popular JS libraries list. Thanks',
	' ',
	Object(preact_min["h"])(ThanksTo, { url: 'https://github.com/nucliweb', name: '@nucliweb' }),
	'.'
);

var _ref38 = Object(preact_min["h"])(
	'li',
	null,
	Object(preact_min["h"])(
		'strong',
		null,
		'\uD83D\uDE80 Loop timeout setting'
	),
	': You now have a setting to tweak the maximum timeout of a loop iteration before it\'s marked as infinite loop.'
);

var _ref39 = Object(preact_min["h"])(
	NotificationItem,
	{ type: 'a11y' },
	'Modals now have proper keyboard navigation integrated.'
);

var _ref40 = Object(preact_min["h"])(
	NotificationItem,
	{ type: 'a11y' },
	'Color contrast improvements.'
);

var _ref41 = Object(preact_min["h"])(
	'li',
	null,
	'\uD83D\uDE80 Popular libraries list updated. Thanks',
	Object(preact_min["h"])(ThanksTo, { url: 'https://github.com/diomed', name: '@diomed' }),
	' &',
	' ',
	Object(preact_min["h"])(ThanksTo, {
		url: 'https://github.com/leninalbertolp',
		name: '@leninalbertolp'
	})
);

var _ref42 = Object(preact_min["h"])(
	NotificationItem,
	{ type: 'bug' },
	'Modal take up appropriate width instead of spanning full width.'
);

var _ref43 = Object(preact_min["h"])(
	NotificationItem,
	{ type: 'bug' },
	'Fix the "Run" button not refreshing the preview after release 3.0.4.'
);

var _ref44 = Object(preact_min["h"])(
	'li',
	null,
	Object(preact_min["h"])(
		'strong',
		null,
		'Mobile Support (app only).'
	),
	': Make the Web Maker app usable on mobile. This is only for web app as Chrome extensions don\'t run on mobile.'
);

var _ref45 = Object(preact_min["h"])(
	NotificationItem,
	{ type: 'bug' },
	'Guarantee code doesn\'t execute when "auto preview" is off.'
);

var _ref46 = Object(preact_min["h"])(
	'li',
	null,
	'Add link to our new',
	Object(preact_min["h"])(
		'a',
		{
			href: 'https://web-maker.slack.com',
			target: '_blank',
			rel: 'noopener noreferrer'
		},
		'Slack channel'
	),
	' ',
	'\uD83E\uDD17.'
);

var _ref47 = Object(preact_min["h"])(
	'li',
	null,
	Object(preact_min["h"])(
		'strong',
		null,
		'Bugfix (extension)'
	),
	': "Save as HTML" file saves with correct extension.'
);

var _ref48 = Object(preact_min["h"])(
	'div',
	{ 'class': 'notification' },
	Object(preact_min["h"])(
		'span',
		{ 'class': 'notification__version' },
		'3.0.1'
	),
	Object(preact_min["h"])(
		'ul',
		null,
		Object(preact_min["h"])(
			'li',
			null,
			'After months of work, here is Web Maker 3.0.',
			Object(preact_min["h"])(
				'a',
				{
					href: 'https://medium.com/web-maker/web-maker-3-0-is-here-f158a40eeaee',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				' ',
				'Read the blog post about it'
			),
			'.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			'Web Maker is no more just a Chrome extension, it is also available as web app that runs offline just like the extension! Checkout it out ->',
			Object(preact_min["h"])(
				'a',
				{
					href: 'https://webmakerapp.com/app/',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				'https://webmakerapp.com/app/'
			),
			'.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			'Now use Web Maker web app on any modern browser (tested with Chrome and Firefox).'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'User Accounts'
			),
			' - The much requested user accounts are here. Now maintain your account and store all your creations in the cloud and access them anywhere anytime.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'New layout mode'
			),
			' - One more layout mode, that lets you align all the panes vertically.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'No more restriction on scripts (Web app only)'
			),
			' - If you are using the web app, there is no more a restriction to load scripts from only specific domains. Load any script!'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Inline scripts (Web app only)'
			),
			' - The restriction of writing JavaScript only in JS pane is also removed.'
		)
	)
);

var _ref49 = Object(preact_min["h"])(
	'div',
	{ 'class': 'notification' },
	Object(preact_min["h"])(
		'span',
		{ 'class': 'notification__version' },
		'2.9.7'
	),
	Object(preact_min["h"])(
		'ul',
		null,
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'a',
				{
					href: 'https://tailwindcss.com/',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				'Tailwind CSS'
			),
			' ',
			'added to popular CSS libraries list. Thanks',
			' ',
			Object(preact_min["h"])(ThanksTo, { url: 'https://github.com/diomed', name: 'diomed' }),
			'.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			'Popular libraries list updated. Thanks',
			' ',
			Object(preact_min["h"])(ThanksTo, { url: 'https://github.com/diomed', name: 'diomed' }),
			'.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Dev'
			),
			': Bug fixes and code refactoring to make things simple.',
			' ',
			Object(preact_min["h"])(ThanksTo, {
				url: 'https://github.com/iamandrewluca',
				name: 'iamandrewluca'
			}),
			' ',
			'.'
		)
	)
);

var _ref50 = Object(preact_min["h"])(
	'div',
	{ 'class': 'notification' },
	Object(preact_min["h"])(
		'span',
		{ 'class': 'notification__version' },
		'2.9.6'
	),
	Object(preact_min["h"])(
		'ul',
		null,
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Bugfix'
			),
			': Fix close buttons not working in notifications and keyboard shortcuts modal.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Bugfix'
			),
			': Fix keyboard shortcut to see keyboard shortcuts :) Thanks',
			Object(preact_min["h"])(
				'a',
				{
					href: 'https://github.com/ClassicOldSong',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				'ClassicOldSong'
			),
			'.'
		)
	)
);

var _ref51 = Object(preact_min["h"])(
	'div',
	{ 'class': 'notification' },
	Object(preact_min["h"])(
		'span',
		{ 'class': 'notification__version' },
		'2.9.5'
	),
	Object(preact_min["h"])(
		'ul',
		null,
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'a',
				{
					href: 'https://medium.com/web-maker/release-2-9-5-add-library-search-pane-collapsing-ux-improvements-more-1085216c1301',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				'Read blog post about this release.'
			)
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Keyboard shortcuts panel'
			),
			': Add a list of all keyboard shotcuts. Access with',
			Object(preact_min["h"])(
				'code',
				null,
				' Ctrl/\u2318 + Shift + ?'
			),
			' or click keyboard button in footer.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Add external library'
			),
			': Better UX for searching third party libraries.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Improvement'
			),
			': Code panes now go fullscreen when double-clicked on their headers - which is much more intuitive behavior based on feedback from lot of developers.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Improvement'
			),
			': Add',
			Object(preact_min["h"])(
				'code',
				null,
				'allowfullscreen'
			),
			' attribute on iframes. Thanks',
			Object(preact_min["h"])(
				'a',
				{
					href: 'https://github.com/ClassicOldSong',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				'ClassicOldSong'
			),
			'.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Bugfix'
			),
			' - Stop screenlog.js from showing up in the exported HTML.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			'Popular external libraries list updated. Thanks',
			Object(preact_min["h"])(
				'a',
				{
					href: 'https://github.com/jlapitan',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				'jlapitan'
			),
			'.'
		)
	)
);

var _ref52 = Object(preact_min["h"])(
	'div',
	{ 'class': 'notification' },
	Object(preact_min["h"])(
		'span',
		{ 'class': 'notification__version' },
		'2.9.4'
	),
	Object(preact_min["h"])(
		'ul',
		null,
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Improvement'
			),
			': Atomic CSS (Atomizer) has been updated to latest version. Now you can do things like psuedo elements. Learn More.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Bugfix'
			),
			' - Logging circular objects is now possible. It won\'t show in the Web Maker console, but will show fine in browser\'s console.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Bugfix'
			),
			' - Console\'s z-index issue has been fixed.'
		)
	)
);

var _ref53 = Object(preact_min["h"])(
	'div',
	{ 'class': 'notification' },
	Object(preact_min["h"])(
		'span',
		{ 'class': 'notification__version' },
		'2.9.3'
	),
	Object(preact_min["h"])(
		'ul',
		null,
		Object(preact_min["h"])(
			'li',
			null,
			'Choose the save location while exporting your saved creations. Now easily sync them to your Dropbox or any cloud storage.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			'All modals inside the app now have a close button.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			'Checkbox that showed on clicking a boolean value is now removed. Thanks',
			Object(preact_min["h"])(
				'a',
				{
					href: 'https://github.com/gauravmuk',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				'Gaurav Nanda'
			),
			'.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Bugfix'
			),
			' - Screenshots on retina device are now correct. Thanks',
			Object(preact_min["h"])(
				'a',
				{
					href: 'https://github.com/AshBardhan',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				'Ashish Bardhan'
			),
			'.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Bugfix'
			),
			' - Double console log in detached mode fixed.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Bugfix'
			),
			' - Console.clear now works in detached mode too.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Bugfix'
			),
			' - DOCTYPE added in preview.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Bugfix'
			),
			' - Typo correction in README. Thanks',
			Object(preact_min["h"])(
				'a',
				{
					href: 'https://github.com/AdilMah',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				'Adil Mahmood'
			),
			'.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			'gstatic.com is available to load external JavaScripts from.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			'Popular libraries list updated. Thanks',
			Object(preact_min["h"])(
				'a',
				{
					href: 'https://github.com/diomed',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				'diomed'
			),
			'.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			'Added',
			Object(preact_min["h"])(
				'a',
				{
					href: 'https://github.com/chinchang/web-maker/blob/master/CONTRIBUTING.md',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				'contribution guidelines'
			),
			' ',
			'in the Github repository.'
		)
	)
);

var _ref54 = Object(preact_min["h"])(
	'div',
	{ 'class': 'notification' },
	Object(preact_min["h"])(
		'span',
		{ 'class': 'notification__version' },
		'2.9.2'
	),
	Object(preact_min["h"])(
		'ul',
		null,
		Object(preact_min["h"])(
			'li',
			null,
			'Minor bug fixes.'
		)
	)
);

var _ref55 = Object(preact_min["h"])(
	'div',
	{ 'class': 'notification' },
	Object(preact_min["h"])(
		'span',
		{ 'class': 'notification__version' },
		'2.9.1'
	),
	Object(preact_min["h"])(
		'ul',
		null,
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'a',
				{
					href: 'https://medium.com/web-maker/v2-9-lots-of-goodies-bd1e939571f6',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				'Read blog post about last release.'
			)
		),
		Object(preact_min["h"])(
			'li',
			null,
			'Use Ctrl/Cmd+D to select next occurence of matching selection.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			'Improve onboard experience.'
		)
	)
);

var _ref56 = Object(preact_min["h"])(
	'div',
	{ 'class': 'notification' },
	Object(preact_min["h"])(
		'span',
		{ 'class': 'notification__version' },
		'2.9.0'
	),
	Object(preact_min["h"])(
		'ul',
		null,
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'a',
				{
					href: 'https://medium.com/web-maker/v2-9-lots-of-goodies-bd1e939571f6',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				'Read blog post about this release.'
			)
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Detached Preview'
			),
			' - Yes, you read that correct! You can now detach your preview and send it to your secondary monitor.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Find & Replace'
			),
			' - Long awaited, now its there. Ctrl/Cmd+f to find and add Alt to replace.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Atomic CSS (Atomizer) configurations'
			),
			' - Add custom config for Atomic CSS.',
			Object(preact_min["h"])(
				'a',
				{
					href: 'https://github.com/acss-io/atomizer#api',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				'Read more'
			),
			'.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Light mode'
			),
			' - This new setting makes Web Maker drop some heavy effects like blur etc to gain more performance. Thanks',
			Object(preact_min["h"])(
				'a',
				{
					href: 'https://github.com/iamandrewluca',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				'Andrew'
			),
			'.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Preserve logs setting'
			),
			' - Choose whether or not to preserve logs across preview refreshes. Thanks',
			Object(preact_min["h"])(
				'a',
				{
					href: 'https://github.com/BasitAli',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				'Basit'
			),
			'.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Line wrap setting'
			),
			' - As the name says.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			'Semantic UI added to popular libraries.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			'Bootstrap, Vue, UI-Kit and more updated to latest versions in popular libraries.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			'UX improvements in settings UI'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Bugfix'
			),
			' - Trigger preview refresh anytime with Ctrl/\u2318 + Shift + 5. Even with auto-preview on.'
		)
	)
);

var _ref57 = Object(preact_min["h"])(
	'div',
	{ 'class': 'notification' },
	Object(preact_min["h"])(
		'span',
		{ 'class': 'notification__version' },
		'2.8.1'
	),
	Object(preact_min["h"])(
		'ul',
		null,
		Object(preact_min["h"])(
			'li',
			null,
			'Vue.js & UIKit version updated to latest version in \'Add Library\' list.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			'UTF-8 charset added to preview HTML to support universal characters.'
		)
	)
);

var _ref58 = Object(preact_min["h"])(
	'div',
	{ 'class': 'notification' },
	Object(preact_min["h"])(
		'span',
		{ 'class': 'notification__version' },
		'2.8.0'
	),
	Object(preact_min["h"])(
		'ul',
		null,
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'a',
				{
					href: 'https://medium.com/web-maker/release-v2-8-is-out-f44e6ea5d9c4',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				'Read blog post about this release.'
			)
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Auto Save'
			),
			' - Your creations now auto-save after your first manual save. This is configurable from settings.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Base2Tone-Meadow Editor Theme'
			),
			' - First user contributed theme. Thanks to Diomed.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Use System Fonts'
			),
			' - You can now use any of your existing system fonts in the editor!'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Matching Tag Highlight'
			),
			' - Cursor over any HTML tag would highlight the matching pair tag.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			'Auto-completion suggestion can now be switched off from settings.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Improvement'
			),
			' - Stop white flicker in editor when the app opens.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Bugfix'
			),
			' - Add Babel Polyfill to enable use of next-gen built-ins like Promise or WeakMap.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			'Vue.js version updated to 2.4.0 in popular library list.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			'Downloads permission is optional. Asked only when you take screenshot.'
		)
	)
);

var _ref59 = Object(preact_min["h"])(
	'div',
	{ 'class': 'notification' },
	Object(preact_min["h"])(
		'span',
		{ 'class': 'notification__version' },
		'2.7.2'
	),
	Object(preact_min["h"])(
		'ul',
		null,
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'External Libraries'
			),
			' - Add Foundation.js and update UIKit 3 to latest beta.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'rawgit.com'
			),
			' &',
			Object(preact_min["h"])(
				'strong',
				null,
				'wzrd.in'
			),
			' domains are now allowed for loading external libraries from.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			'Minor booting speed improvements'
		)
	)
);

var _ref60 = Object(preact_min["h"])(
	'div',
	{ 'class': 'notification' },
	Object(preact_min["h"])(
		'span',
		{ 'class': 'notification__version' },
		'2.7.1'
	),
	Object(preact_min["h"])(
		'ul',
		null,
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Framer.js support'
			),
			' - You can now load the latest framer.js library from',
			Object(preact_min["h"])(
				'a',
				{
					href: 'https://builds.framerjs.com/',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				'framer builds page'
			),
			' ',
			'and start coding framer prototypes.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Bugfix'
			),
			': Edit on CodePen is back in action.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Bugfix'
			),
			': Autocompletion menu doesn\'t show on cut and paste now.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Bugfix'
			),
			': Updated & fixed urls of some common external libraries to latest versions. UIKit3 & Bootstrap 4\u03B1 are now in the list.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			'Preprocessor selector are now more accessible.'
		)
	)
);

var _ref61 = Object(preact_min["h"])(
	'div',
	{ 'class': 'notification' },
	Object(preact_min["h"])(
		'span',
		{ 'class': 'notification__version' },
		'2.7.0'
	),
	Object(preact_min["h"])(
		'ul',
		null,
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Fork any creation!'
			),
			': Now you can fork any existing creation of yours to start a new work based on it. One big use case of this feature is "Templates"!',
			Object(preact_min["h"])(
				'a',
				{
					target: '_blank',
					rel: 'noopener noreferrer',
					href: 'https://kushagragour.in/blog/2017/05/web-maker-fork-templates/?utm_source=webmakerapp&utm_medium=referral'
				},
				'Read more about it'
			),
			'.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Fonts \uD83D\uDE0D '
			),
			': Super-awesome 4 fonts (mostly with ligature support) now available to choose from. Fira Code is the default font now.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			'Updated most used external libraries to latest versions.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Bugfix'
			),
			': Add missing Bootstrap JS file to most used external libraries list.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			'Several other minor bugfixes and improvements to make Web Maker awesome!'
		),
		Object(preact_min["h"])(
			'li',
			null,
			'Great news to share with you - Web Maker has been featured on the Chrome Webstore homepage! Thanks for all the love :)'
		)
	)
);

var _ref62 = Object(preact_min["h"])(
	'div',
	{ 'class': 'notification' },
	Object(preact_min["h"])(
		'span',
		{ 'class': 'notification__version' },
		'2.6.1'
	),
	Object(preact_min["h"])(
		'ul',
		null,
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Bugfix'
			),
			': Emojis vanishing while exporting to Codepen has been fixed.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Bugfix'
			),
			':',
			Object(preact_min["h"])(
				'code',
				null,
				'console.clear()'
			),
			' now doesn\'t error and clears the inbuilt console.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Bugfix'
			),
			': External libraries added to the creation are exported as well to Codepen.'
		)
	)
);

var _ref63 = Object(preact_min["h"])(
	'div',
	{ 'class': 'notification' },
	Object(preact_min["h"])(
		'span',
		{ 'class': 'notification__version' },
		'2.6.0'
	),
	Object(preact_min["h"])(
		'ul',
		null,
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'The "Console"'
			),
			': The most awaited feature is here! There is now an inbuilt console to see your logs, errors and for quickly evaluating JavaScript code inside your preview. Enjoy! I also a',
			Object(preact_min["h"])(
				'a',
				{
					href: 'https://kushagragour.in/blog/2017/05/web-maker-console-is-here/?utm_source=webmakerapp&utm_medium=referral',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				'blog post about it'
			),
			'.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			'Number slider which popped on clicking any number in the code has been removed due to poor user experience.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			'Minor usability improvements.'
		)
	)
);

var _ref64 = Object(preact_min["h"])(
	'div',
	{ 'class': 'notification' },
	Object(preact_min["h"])(
		'span',
		{ 'class': 'notification__version' },
		'2.5.0'
	),
	Object(preact_min["h"])(
		'ul',
		null,
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Atomic CSS'
			),
			': Use can now use Atomic CSS(ACSS) in your work!',
			Object(preact_min["h"])(
				'a',
				{
					href: 'https://acss.io/',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				'Read more about it here'
			),
			'.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Search your saved creations'
			),
			': Easily search through all your saved creations by title.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Configurable Auto-preview'
			),
			' - You can turn off the auto preview in settings if you don\'t want the preview to update as you type.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Configurable refresh on resize'
			),
			' - You can configure whether you want the preview to refresh when you resize the preview panel.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Bugfix'
			),
			' - Fix indentation',
			Object(preact_min["h"])(
				'a',
				{
					href: 'https://github.com/chinchang/web-maker/issues/104',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				'issue'
			),
			' ',
			'with custom indentation size.'
		)
	)
);

var _ref65 = Object(preact_min["h"])(
	'div',
	{ 'class': 'notification' },
	Object(preact_min["h"])(
		'span',
		{ 'class': 'notification__version' },
		'2.4.2'
	),
	Object(preact_min["h"])(
		'ul',
		null,
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Improved infinite loop protection'
			),
			': Infinite loop protection is now faster and more reliable. And works without the need of Escodegen. Thanks to Ariya Hidayat!'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Bugfix'
			),
			' - Default parameters not working in JavaScript is fixed.'
		)
	)
);

var _ref66 = Object(preact_min["h"])(
	'div',
	{ 'class': 'notification' },
	Object(preact_min["h"])(
		'span',
		{ 'class': 'notification__version' },
		'2.4.0'
	),
	Object(preact_min["h"])(
		'ul',
		null,
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Import/Export'
			),
			': Your creations are most important. Now export all your creations into a single file as a backup that can be imported anytime & anywhere.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Editor themes'
			),
			': You have been heard. Now you can choose from a huge list of wonderful editor themes!'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Identation settings'
			),
			': Not a spaces fan? Switch to tabs and set your indentation size.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Vim key bindings'
			),
			': Rejoice Vim lovers!'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Code blast'
			),
			': Why don\'t you try coding with this switched on from the settings? Go on...'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Important'
			),
			': Due to security policy changes from Chrome 57 onwards, Web Maker now allows loading external JavaScript libraries only from certain whitelisted domains (localhost, https://ajax.googleapis.com, https://code.jquery.com, https://cdnjs.cloudflare.com, https://unpkg.com, https://maxcdn.com, https://cdn77.com, https://maxcdn.bootstrapcdn.com, https://cdn.jsdelivr.net/)'
		),
		Object(preact_min["h"])(
			'li',
			null,
			'Save button now highlights when you have unsaved changes.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			'Jade is now called Pug. Just a name change.'
		)
	)
);

var _ref67 = Object(preact_min["h"])(
	'div',
	{ 'class': 'notification' },
	Object(preact_min["h"])(
		'span',
		{ 'class': 'notification__version' },
		'2.3.2'
	),
	Object(preact_min["h"])(
		'ul',
		null,
		Object(preact_min["h"])(
			'li',
			null,
			'Update Babel to support latest and coolest ES6 features.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			'Improve onboarding experience at first install.'
		)
	)
);

var _ref68 = Object(preact_min["h"])(
	'div',
	{ 'class': 'notification' },
	Object(preact_min["h"])(
		'span',
		{ 'class': 'notification__version' },
		'2.3.1'
	),
	Object(preact_min["h"])(
		'ul',
		null,
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Bugfix'
			),
			' - Splitting of code and preview panes is remembered by the editor.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			'Title of the creation is used for the file name when saving as HTML.'
		)
	)
);

var _ref69 = Object(preact_min["h"])(
	'div',
	{ 'class': 'notification' },
	Object(preact_min["h"])(
		'span',
		{ 'class': 'notification__version' },
		'2.3.0'
	),
	Object(preact_min["h"])(
		'ul',
		null,
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Add Library Autocompletion'
			),
			' - Just start typing the name of library and you\'ll be shown matching libraries from cdnjs.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Preview Screenshot Capture'
			),
			' - Want to grab a nice screenshot of your creation. You have it! Click and capture.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Auto Indent Code'
			),
			' - Select your code and hit Shift-Tab to auto-indent it!'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Keyboard Navigation in Saved List'
			),
			' - Now select your creation using arrow keys and hit ENTER to open it.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			'Highlight active line in code panes.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Bugfix'
			),
			' - Fix in generated title of new creation.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Bugfix'
			),
			' - HTML autocompletion is manual triggered now with Ctrl+Space.'
		)
	)
);

var _ref70 = Object(preact_min["h"])(
	'div',
	{ 'class': 'notification' },
	Object(preact_min["h"])(
		'span',
		{ 'class': 'notification__version' },
		'2.2.0'
	),
	Object(preact_min["h"])(
		'ul',
		null,
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Code Autocompletion'
			),
			' - See code suggestions while you type!'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Full Screen Preview'
			),
			' - Checkout your creation in a full-screen layout.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'SASS'
			),
			' - SASS support added for CSS.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Faster CSS update'
			),
			' - Preview updates instantly without refresh when just CSS is changed.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Bugfix'
			),
			' - Indentation fixed while going on new line.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Bugfix'
			),
			' - Works even in Chrome Canary now. Though libraries can be added only through CDNs.'
		)
	)
);

var _ref71 = Object(preact_min["h"])(
	'div',
	{ 'class': 'notification' },
	Object(preact_min["h"])(
		'span',
		{ 'class': 'notification__version' },
		'2.1.0'
	),
	Object(preact_min["h"])(
		'ul',
		null,
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'TypeScript'
			),
			' - Now you can code in TypeScript too!'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Stylus Preprocessor'
			),
			' - Stylus supported adding for CSS.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Code Folding'
			),
			' - Collapse large code blocks for easy editing.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Bugfix'
			),
			' - Support JSX in JavaScript.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			'Better onboarding for first time users.'
		)
	)
);

var _ref72 = Object(preact_min["h"])(
	'div',
	{ 'class': 'notification' },
	Object(preact_min["h"])(
		'span',
		{ 'class': 'notification__version' },
		'2.0.0'
	),
	Object(preact_min["h"])(
		'ul',
		null,
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Save and Load'
			),
			' - Long pending and super-useful, now you can save your creations and resume them anytime later.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Insert JS & CSS'
			),
			' - Load popular JavaScript & CSS libraries in your work without writing any code.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Collapsed Panes'
			),
			' - Collapse/uncollapse code panes with a single click. Your pane configuration is even saved with every creation!'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Quick color & number change'
			),
			' - Click on any color or number and experiment with quick values using a slider.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Linting'
			),
			' - See your code errors right where you are coding.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			'No more browser hang due to infinite loops!'
		)
	)
);

var _ref73 = Object(preact_min["h"])(
	'div',
	{ 'class': 'notification' },
	Object(preact_min["h"])(
		'span',
		{ 'class': 'notification__version' },
		'1.7.0'
	),
	Object(preact_min["h"])(
		'ul',
		null,
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'strong',
				null,
				'Preprocessors!'
			),
			' - Enjoy a whole list of preprocessors for HTML(Jade & markdown), CSS(SCSS & LESS) and JavaScript(CoffeeScript & Babel).'
		),
		Object(preact_min["h"])(
			'li',
			null,
			'More awesome font for code.'
		)
	)
);

var _ref74 = Object(preact_min["h"])(
	'div',
	{ 'class': 'notification' },
	Object(preact_min["h"])(
		'span',
		{ 'class': 'notification__version' },
		'1.6.0'
	),
	Object(preact_min["h"])(
		'ul',
		null,
		Object(preact_min["h"])(
			'li',
			null,
			'You can now configure Web-Maker to not replace new tab page from the settings. It is always accessible from the icon in the top-right.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			'Download current code as HTML file with Ctrl/\u2318 + S keyboard shortcut.'
		),
		Object(preact_min["h"])(
			'li',
			null,
			'New notifications panel added so you are always aware of the new changes in Web-Maker.'
		)
	)
);

function Notifications(props) {
	return Object(preact_min["h"])(
		'div',
		null,
		Notifications__ref9,
		Object(preact_min["h"])(
			Notification,
			Notifications__extends({ version: '3.6.1' }, props, { isLatest: true }),
			Notifications__ref10
		),
		Object(preact_min["h"])(
			Notification,
			Notifications__extends({ version: '3.6.0' }, props),
			Notifications__ref11,
			Notifications__ref12,
			Notifications__ref13,
			Notifications__ref14
		),
		Object(preact_min["h"])(
			Notification,
			Notifications__extends({ version: '3.5.1' }, props),
			Notifications__ref15
		),
		Object(preact_min["h"])(
			Notification,
			Notifications__extends({ version: '3.5.0' }, props),
			Notifications__ref16,
			Notifications__ref17
		),
		Object(preact_min["h"])(
			Notification,
			Notifications__extends({ version: '3.4.2' }, props),
			Notifications__ref18,
			Notifications__ref19,
			Notifications__ref20,
			Notifications__ref21,
			_ref22
		),
		Object(preact_min["h"])(
			Notification,
			Notifications__extends({ version: '3.4.1' }, props),
			_ref23,
			_ref24,
			_ref25,
			_ref26
		),
		Object(preact_min["h"])(
			Notification,
			Notifications__extends({ version: '3.4.0' }, props),
			_ref27,
			_ref28,
			_ref29,
			_ref30,
			_ref31
		),
		Object(preact_min["h"])(
			Notification,
			Notifications__extends({ version: '3.3.2' }, props),
			_ref32,
			_ref33,
			_ref34,
			_ref35
		),
		Object(preact_min["h"])(
			Notification,
			Notifications__extends({ version: '3.3.0' }, props),
			_ref36,
			_ref37
		),
		Object(preact_min["h"])(
			Notification,
			Notifications__extends({ version: '3.2.0' }, props),
			_ref38,
			_ref39,
			_ref40,
			_ref41,
			_ref42
		),
		Object(preact_min["h"])(
			Notification,
			Notifications__extends({ version: '3.1.1' }, props),
			_ref43
		),
		Object(preact_min["h"])(
			Notification,
			Notifications__extends({ version: '3.1.0' }, props),
			_ref44
		),
		Object(preact_min["h"])(
			Notification,
			Notifications__extends({ version: '3.0.4' }, props),
			_ref45,
			_ref46
		),
		Object(preact_min["h"])(
			Notification,
			Notifications__extends({ version: '3.0.3' }, props),
			_ref47
		),
		_ref48,
		_ref49,
		_ref50,
		_ref51,
		_ref52,
		_ref53,
		_ref54,
		_ref55,
		_ref56,
		_ref57,
		_ref58,
		_ref59,
		_ref60,
		_ref61,
		_ref62,
		_ref63,
		_ref64,
		_ref65,
		_ref66,
		_ref67,
		_ref68,
		_ref69,
		_ref70,
		_ref71,
		_ref72,
		_ref73,
		_ref74
	);
}
// CONCATENATED MODULE: ./editorThemes.js
const editorThemes = ['3024-day', '3024-night', 'abcdef', 'ambiance', 'base2tone-meadow-dark', 'base16-dark', 'base16-light', 'bespin', 'blackboard', 'cobalt', 'colorforth', 'dracula', 'duotone-dark', 'duotone-light', 'eclipse', 'elegant', 'erlang-dark', 'hopscotch', 'icecoder', 'isotope', 'lesser-dark', 'liquibyte', 'material', 'mbo', 'mdn-like', 'midnight', 'monokai', 'neat', 'neo', 'night', 'panda-syntax', 'paraiso-dark', 'paraiso-light', 'pastel-on-dark', 'railscasts', 'rubyblue', 'seti', 'solarized dark', 'solarized light', 'the-matrix', 'tomorrow-night-bright', 'tomorrow-night-eighties', 'ttcn', 'twilight', 'vibrant-ink', 'xq-dark', 'xq-light', 'yeti', 'zenburn'];
// CONCATENATED MODULE: ./components/Switch.jsx



var Switch__ref = Object(preact_min["h"])("span", { "aria-hidden": "true", "class": "check-switch__toggle" });

let Switch_Switch = class Switch extends preact_min["Component"] {
	render() {
		return Object(preact_min["h"])(
			"label",
			{ "class": "check-switch" },
			Object(preact_min["h"])("input", {
				role: "switch",
				type: "checkbox",
				checked: this.props.checked,
				onChange: this.props.onChange
			}),
			Object(preact_min["h"])(
				"div",
				{ "class": "check-switch__toggle-wrap" },
				Object(preact_min["h"])(
					"span",
					{
						"aria-hidden": "true",
						"class": "check-switch__status",
						style: `visibility:${this.props.checked ? 'hidden' : 'visible'}`
					},
					"Off"
				),
				Switch__ref,
				Object(preact_min["h"])(
					"span",
					{
						"aria-hidden": "true",
						"class": "check-switch__status",
						style: `visibility:${this.props.checked ? 'visible' : 'hidden'}`
					},
					"On"
				)
			),
			this.props.children
		);
	}
};

// CONCATENATED MODULE: ./components/Tabs.jsx



function hyphenate(text) {
	return text.replace(/\s/g, '-');
}
const ID_PREFIX = 'tab-panel-';

function TabPanel({ label }) {
	return Object(preact_min["h"])(
		'div',
		{
			'class': 'tabs__tabpanel',
			role: 'tabpanel',
			id: `${ID_PREFIX}${hyphenate(label)}`
		},
		this.props.children
	);
}
function Tab({ label, isSelected, onKeyUp, onClick }) {
	return Object(preact_min["h"])(
		'button',
		{
			'class': `tabs__tab ${isSelected ? 'tabs__tab--selected' : ''}`,
			role: 'tab',
			tabindex: isSelected ? null : -1,
			'aria-selected': `${isSelected}`,
			'aria-controls': `${ID_PREFIX}${hyphenate(label)}`,
			onKeyUp: onKeyUp,
			onClick: onClick
		},
		label
	);
}
let Tabs_Tabs = class Tabs extends preact_min["Component"] {
	constructor(props) {
		super(props);
		this.state = {
			selectedTab: 0
		};
	}
	isSelected(index) {
		return this.state.selectedTab === index;
	}
	switchTab(selectedTab) {
		this.setState({ selectedTab: selectedTab });
		this.tabListEl.querySelectorAll('[role=tab]')[selectedTab].focus();
	}
	keyUpHandler(e) {
		let { selectedTab } = this.state;
		if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
			selectedTab--;
			selectedTab = selectedTab < 0 ? this.props.children.length - 1 : selectedTab;
			this.switchTab(selectedTab);
			e.preventDefault();
		} else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
			selectedTab++;
			selectedTab %= this.props.children.length;
			this.switchTab(selectedTab);
			e.preventDefault();
		}
	}
	render() {
		const tabs = this.props.children;
		return Object(preact_min["h"])(
			'div',
			{ 'class': 'tabs' },
			Object(preact_min["h"])(
				'div',
				{
					'class': 'tabs__tablist',
					role: 'tablist',
					ref: el => this.tabListEl = el
				},
				tabs.map((child, index) => Object(preact_min["h"])(Tab, {
					isSelected: this.isSelected(index),
					label: child.props.label,
					onKeyUp: this.keyUpHandler.bind(this),
					onClick: () => this.setState({ selectedTab: index })
				}))
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': 'tabs__tabpanel-wrap' },
				tabs.map((child, index) => this.state.selectedTab === index ? child : null)
			)
		);
	}
};

// CONCATENATED MODULE: ./components/Settings.jsx







function CheckboxSetting({ label, onChange, pref }) {
	return Object(preact_min["h"])(
		Switch_Switch,
		{ checked: pref, onChange: onChange },
		label
	);
}
function HelpText({ children }) {
	return Object(preact_min["h"])(
		'p',
		{ 'class': 'help-text' },
		children
	);
}

var Settings__ref = Object(preact_min["h"])(
	'h1',
	null,
	'Settings'
);

var Settings__ref2 = Object(preact_min["h"])(
	HelpText,
	null,
	'Loads the last open creation when app starts'
);

var Settings__ref3 = Object(preact_min["h"])(Divider, null);

var Settings__ref4 = Object(preact_min["h"])(
	HelpText,
	null,
	'Switch to lighter version for better performance. Removes things like blur etc.'
);

var Settings__ref5 = Object(preact_min["h"])(Divider, null);

var Settings__ref6 = Object(preact_min["h"])(
	HelpText,
	null,
	'Refreshes the preview as you code. Otherwise use the \'Run\' button'
);

var Settings__ref7 = Object(preact_min["h"])(Divider, null);

var Settings__ref8 = Object(preact_min["h"])(
	HelpText,
	null,
	'Auto-save keeps saving your code at regular intervals after you hit save manually the first time'
);

var Settings__ref9 = Object(preact_min["h"])(Divider, null);

var Settings__ref10 = Object(preact_min["h"])(
	HelpText,
	null,
	'Preview will refresh when you resize the preview pane'
);

var Settings__ref11 = Object(preact_min["h"])(Divider, null);

var Settings__ref12 = Object(preact_min["h"])(
	HelpText,
	null,
	'Turning this on will start showing Web Maker in every new tab you open'
);

var Settings__ref13 = Object(preact_min["h"])(Divider, null);

var Settings__ref14 = Object(preact_min["h"])(
	HelpText,
	null,
	'Preserves the console logs across your preview refreshes'
);

var Settings__ref15 = Object(preact_min["h"])(
	'datalist',
	{ id: 'indentationSizeList' },
	Object(preact_min["h"])(
		'option',
		null,
		'1'
	),
	Object(preact_min["h"])(
		'option',
		null,
		'2'
	),
	Object(preact_min["h"])(
		'option',
		null,
		'3'
	),
	Object(preact_min["h"])(
		'option',
		null,
		'4'
	),
	Object(preact_min["h"])(
		'option',
		null,
		'5'
	),
	Object(preact_min["h"])(
		'option',
		null,
		'6'
	),
	Object(preact_min["h"])(
		'option',
		null,
		'7'
	)
);

var Settings__ref16 = Object(preact_min["h"])(
	HelpText,
	null,
	'(Experimental) Switches from CodeMirror to Monaco. Many other settings might not be available in Monaco.'
);

var Settings__ref17 = Object(preact_min["h"])(Divider, null);

var Settings__ref18 = Object(preact_min["h"])(
	'span',
	null,
	'Default Preprocessors'
);

var Settings__ref19 = Object(preact_min["h"])(
	'option',
	{ value: 'html' },
	'HTML'
);

var Settings__ref20 = Object(preact_min["h"])(
	'option',
	{ value: 'markdown' },
	'Markdown'
);

var Settings__ref21 = Object(preact_min["h"])(
	'option',
	{ value: 'jade' },
	'Pug'
);

var Settings__ref22 = Object(preact_min["h"])(
	'option',
	{ value: 'css' },
	'CSS'
);

var Settings__ref23 = Object(preact_min["h"])(
	'option',
	{ value: 'scss' },
	'SCSS'
);

var Settings__ref24 = Object(preact_min["h"])(
	'option',
	{ value: 'sass' },
	'SASS'
);

var Settings__ref25 = Object(preact_min["h"])(
	'option',
	{ value: 'less' },
	'LESS'
);

var Settings__ref26 = Object(preact_min["h"])(
	'option',
	{ value: 'stylus' },
	'Stylus'
);

var Settings__ref27 = Object(preact_min["h"])(
	'option',
	{ value: 'acss' },
	'Atomic CSS'
);

var Settings__ref28 = Object(preact_min["h"])(
	'option',
	{ value: 'js' },
	'JS'
);

var Settings__ref29 = Object(preact_min["h"])(
	'option',
	{ value: 'coffee' },
	'CoffeeScript'
);

var Settings__ref30 = Object(preact_min["h"])(
	'option',
	{ value: 'es6' },
	'ES6 (Babel)'
);

var Settings__ref31 = Object(preact_min["h"])(
	'option',
	{ value: 'typescript' },
	'TypeScript'
);

var Settings__ref32 = Object(preact_min["h"])(Divider, null);

var Settings__ref33 = Object(preact_min["h"])(Divider, null);

var Settings__ref34 = Object(preact_min["h"])(
	'option',
	{ value: 'FiraCode' },
	'Fira Code'
);

var Settings__ref35 = Object(preact_min["h"])(
	'option',
	{ value: 'Inconsolata' },
	'Inconsolata'
);

var Settings__ref36 = Object(preact_min["h"])(
	'option',
	{ value: 'Monoid' },
	'Monoid'
);

var Settings__ref37 = Object(preact_min["h"])(
	'option',
	{ value: 'FixedSys' },
	'FixedSys'
);

var Settings__ref38 = Object(preact_min["h"])(
	'option',
	{ disabled: 'disabled' },
	'----'
);

var Settings__ref39 = Object(preact_min["h"])(
	'option',
	{ value: 'other' },
	'Other font from system'
);

var Settings__ref40 = Object(preact_min["h"])(Divider, null);

var Settings__ref41 = Object(preact_min["h"])(Divider, null);

var Settings__ref42 = Object(preact_min["h"])(Divider, null);

var Settings__ref43 = Object(preact_min["h"])(Divider, null);

var Settings__ref44 = Object(preact_min["h"])(Divider, null);

var Settings__ref45 = Object(preact_min["h"])(
	HelpText,
	null,
	'Enjoy wonderful particle blasts while you type'
);

var Settings__ref46 = Object(preact_min["h"])(Divider, null);

var Settings__ref47 = Object(preact_min["h"])(
	HelpText,
	null,
	'Make the app ready to build some games for',
	' ',
	Object(preact_min["h"])(
		'a',
		{ href: 'https://js13kgames.com/', target: '_blank', rel: 'noopener' },
		'Js13kGames'
	),
	'.'
);

var Settings__ref48 = Object(preact_min["h"])(
	HelpText,
	null,
	'If any loop iteration takes more than the defined time, it is detected as a potential infinite loop and further iterations are stopped.'
);

var Settings__ref49 = Object(preact_min["h"])(Divider, null);

var Settings__ref50 = Object(preact_min["h"])(
	'option',
	{ value: 'en' },
	'English'
);

var Settings__ref51 = Object(preact_min["h"])(
	'option',
	{ value: 'hi' },
	'Hindi'
);

var Settings__ref52 = Object(preact_min["h"])(
	'option',
	{ value: 'ja' },
	'Japanese'
);

var Settings__ref53 = Object(preact_min["h"])(
	'option',
	{ value: 'sa' },
	'Sanskrit'
);

let Settings_Settings = class Settings extends preact_min["Component"] {
	updateSetting(e, settingName) {
		const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
		this.props.onChange(settingName, value);
	}
	shouldComponentUpdate() {
		// TODO: add check on prefs
		return true;
	}
	render() {
		const { prefs } = this.props;
		return Object(preact_min["h"])(
			'div',
			null,
			Settings__ref,
			Object(preact_min["h"])(
				Tabs_Tabs,
				null,
				Object(preact_min["h"])(
					TabPanel,
					{ label: 'General' },
					Object(preact_min["h"])(CheckboxSetting, {
						label: 'Preserve last written code',
						pref: prefs.preserveLastCode,
						onChange: e => this.updateSetting(e, 'preserveLastCode')
					}),
					Settings__ref2,
					Settings__ref3,
					Object(preact_min["h"])(CheckboxSetting, {
						label: 'Fast/light version',
						pref: prefs.lightVersion,
						onChange: e => this.updateSetting(e, 'lightVersion')
					}),
					Settings__ref4,
					Settings__ref5,
					Object(preact_min["h"])(CheckboxSetting, {
						label: 'Auto-preview',
						pref: prefs.autoPreview,
						onChange: e => this.updateSetting(e, 'autoPreview')
					}),
					Settings__ref6,
					Settings__ref7,
					Object(preact_min["h"])(CheckboxSetting, {
						label: 'Auto-save',
						pref: prefs.autoSave,
						onChange: e => this.updateSetting(e, 'autoSave')
					}),
					Settings__ref8,
					Settings__ref9,
					Object(preact_min["h"])(CheckboxSetting, {
						label: 'Refresh preview on resize',
						pref: prefs.refreshOnResize,
						onChange: e => this.updateSetting(e, 'refreshOnResize')
					}),
					Settings__ref10,
					Object(preact_min["h"])(
						'div',
						{ 'class': 'show-when-extension' },
						Settings__ref11,
						Object(preact_min["h"])(CheckboxSetting, {
							label: 'Replace new tab page',
							pref: prefs.replaceNewTab,
							onChange: e => this.updateSetting(e, 'replaceNewTab'),
							showWhenExtension: true
						}),
						Settings__ref12
					),
					Settings__ref13,
					Object(preact_min["h"])(CheckboxSetting, {
						label: 'Preserve console logs',
						pref: prefs.preserveConsoleLogs,
						onChange: e => this.updateSetting(e, 'preserveConsoleLogs')
					}),
					Settings__ref14
				),
				Object(preact_min["h"])(
					TabPanel,
					{ label: 'Indentation' },
					Object(preact_min["h"])(
						'div',
						{ 'class': 'line' },
						Object(preact_min["h"])(
							'div',
							null,
							Object(preact_min["h"])(
								'label',
								null,
								Object(preact_min["h"])('input', {
									type: 'radio',
									name: 'indentation',
									value: 'spaces',
									checked: prefs.indentWith === 'spaces',
									onChange: e => this.updateSetting(e, 'indentWith')
								}),
								' ',
								'Spaces'
							),
							Object(preact_min["h"])(
								'label',
								{ 'class': 'ml-1' },
								Object(preact_min["h"])('input', {
									type: 'radio',
									name: 'indentation',
									value: 'tabs',
									checked: prefs.indentWith === 'tabs',
									onChange: e => this.updateSetting(e, 'indentWith')
								}),
								' ',
								'Tabs'
							)
						)
					),
					Object(preact_min["h"])(
						'label',
						{ 'class': 'line', title: '' },
						'Indentation Size',
						Object(preact_min["h"])(
							'div',
							null,
							Object(preact_min["h"])('input', {
								type: 'range',
								'class': 'va-m ml-1',
								value: prefs.indentSize,
								min: '1',
								max: '7',
								list: 'indentationSizeList',
								onChange: e => this.updateSetting(e, 'indentSize')
							}),
							Object(preact_min["h"])(
								'span',
								{ id: 'indentationSizeValueEl' },
								prefs.indentSize
							),
							Settings__ref15
						)
					)
				),
				Object(preact_min["h"])(
					TabPanel,
					{ label: 'Editor' },
					Object(preact_min["h"])(
						'div',
						null,
						Object(preact_min["h"])(
							'div',
							null,
							Object(preact_min["h"])(CheckboxSetting, {
								title: 'Use experimental Monaco editor',
								label: 'Use Monaco Editor',
								pref: prefs.isMonacoEditorOn,
								onChange: e => this.updateSetting(e, 'isMonacoEditorOn')
							}),
							Settings__ref16,
							Settings__ref17,
							Object(preact_min["h"])(
								'div',
								{ 'class': 'line' },
								Settings__ref18,
								Object(preact_min["h"])(
									'div',
									{ 'class': 'flex' },
									Object(preact_min["h"])(
										'select',
										{
											'aria-label': 'Default HTML preprocessor',
											style: 'flex:1;margin-left:20px',
											value: prefs.htmlMode,
											onChange: e => this.updateSetting(e, 'htmlMode')
										},
										Settings__ref19,
										Settings__ref20,
										Settings__ref21
									),
									Object(preact_min["h"])(
										'select',
										{
											'aria-label': 'Default CSS preprocessor',
											style: 'flex:1;margin-left:20px',
											value: prefs.cssMode,
											onChange: e => this.updateSetting(e, 'cssMode')
										},
										Settings__ref22,
										Settings__ref23,
										Settings__ref24,
										Settings__ref25,
										Settings__ref26,
										Settings__ref27
									),
									Object(preact_min["h"])(
										'select',
										{
											'aria-label': 'Default JavaScript preprocessor',
											style: 'flex:1;margin-left:20px',
											value: prefs.jsMode,
											onChange: e => this.updateSetting(e, 'jsMode')
										},
										Settings__ref28,
										Settings__ref29,
										Settings__ref30,
										Settings__ref31
									)
								)
							),
							Settings__ref32,
							Object(preact_min["h"])(
								'label',
								{ 'class': 'line' },
								'Theme',
								Object(preact_min["h"])(
									'div',
									null,
									Object(preact_min["h"])(
										'select',
										{
											value: prefs.editorTheme,
											onChange: e => this.updateSetting(e, 'editorTheme')
										},
										editorThemes.map(theme => Object(preact_min["h"])(
											'option',
											{ value: theme },
											theme
										))
									)
								)
							),
							Settings__ref33,
							Object(preact_min["h"])(
								'label',
								{ 'class': 'line' },
								'Font',
								Object(preact_min["h"])(
									'div',
									null,
									Object(preact_min["h"])(
										'select',
										{
											value: prefs.editorFont,
											onChange: e => this.updateSetting(e, 'editorFont')
										},
										Settings__ref34,
										Settings__ref35,
										Settings__ref36,
										Settings__ref37,
										Settings__ref38,
										Settings__ref39
									),
									prefs.editorFont === 'other' && Object(preact_min["h"])('input', {
										style: 'margin-left:20px',
										id: 'customEditorFontInput',
										type: 'text',
										value: prefs.editorCustomFont,
										placeholder: 'Custom font name here',
										onChange: e => this.updateSetting(e, 'editorCustomFont')
									})
								)
							),
							Settings__ref40,
							Object(preact_min["h"])(
								'label',
								{ 'class': 'line' },
								'Font Size',
								Object(preact_min["h"])(
									'div',
									null,
									Object(preact_min["h"])('input', {
										style: 'width:70px',
										type: 'number',
										value: prefs.fontSize,
										onChange: e => this.updateSetting(e, 'fontSize')
									}),
									' ',
									'px'
								)
							),
							Settings__ref41,
							Object(preact_min["h"])(
								'div',
								{ 'class': 'line' },
								'Key bindings',
								Object(preact_min["h"])(
									'div',
									null,
									Object(preact_min["h"])(
										'label',
										{ 'class': 'ml-1' },
										Object(preact_min["h"])('input', {
											type: 'radio',
											name: 'keymap',
											value: 'sublime',
											checked: prefs.keymap === 'sublime',
											onChange: e => this.updateSetting(e, 'keymap')
										}),
										' ',
										'Sublime'
									),
									Object(preact_min["h"])(
										'label',
										{ 'class': 'ml-1' },
										Object(preact_min["h"])('input', {
											type: 'radio',
											name: 'keymap',
											value: 'vim',
											checked: prefs.keymap === 'vim',
											onChange: e => this.updateSetting(e, 'keymap')
										}),
										' ',
										'Vim'
									)
								)
							)
						),
						Settings__ref42,
						Object(preact_min["h"])(
							'div',
							{ 'class': 'flex-grow' },
							Object(preact_min["h"])(CheckboxSetting, {
								title: 'Toggle wrapping of long sentences onto new line',
								label: 'Line wrap',
								pref: prefs.lineWrap,
								onChange: e => this.updateSetting(e, 'lineWrap')
							}),
							Settings__ref43,
							Object(preact_min["h"])(CheckboxSetting, {
								title: 'Add the closing tag automatically on seeing an opening tag in HTML',
								label: 'Auto-close tags',
								pref: prefs.autoCloseTags,
								onChange: e => this.updateSetting(e, 'autoCloseTags')
							}),
							Settings__ref44,
							Object(preact_min["h"])(CheckboxSetting, {
								title: 'Turns on the auto-completion suggestions as you type',
								label: 'Auto-complete suggestions',
								pref: prefs.autoComplete,
								onChange: e => this.updateSetting(e, 'autoComplete')
							})
						)
					)
				),
				Object(preact_min["h"])(
					TabPanel,
					{ label: 'Fun' },
					Object(preact_min["h"])(CheckboxSetting, {
						label: 'Code blast!',
						pref: prefs.isCodeBlastOn,
						onChange: e => this.updateSetting(e, 'isCodeBlastOn')
					}),
					Settings__ref45,
					Settings__ref46,
					Object(preact_min["h"])(CheckboxSetting, {
						label: 'Js13kGames Mode',
						pref: prefs.isJs13kModeOn,
						onChange: e => this.updateSetting(e, 'isJs13kModeOn')
					}),
					Settings__ref47
				),
				Object(preact_min["h"])(
					TabPanel,
					{ label: 'Advanced' },
					Object(preact_min["h"])(
						'div',
						null,
						Object(preact_min["h"])(
							'label',
							{ 'class': 'line' },
							'Maximum time allowed in a loop iteration',
							Object(preact_min["h"])(
								'div',
								null,
								Object(preact_min["h"])('input', {
									type: 'number',
									style: 'width:120px',
									value: prefs.infiniteLoopTimeout,
									onChange: e => this.updateSetting(e, 'infiniteLoopTimeout')
								}),
								' ',
								'ms'
							)
						),
						Settings__ref48
					),
					Settings__ref49,
					Object(preact_min["h"])(
						'div',
						null,
						Object(preact_min["h"])(
							'label',
							{ 'class': 'line' },
							'Language',
							Object(preact_min["h"])(
								'select',
								{
									value: prefs.lang,
									onChange: e => this.updateSetting(e, 'lang')
								},
								Settings__ref50,
								Settings__ref51,
								Settings__ref52,
								Settings__ref53
							)
						)
					)
				)
			)
		);
	}
};

// EXTERNAL MODULE: ../node_modules/firebase/auth/dist/index.esm.js
var dist_index_esm = __webpack_require__("zKjx");

// CONCATENATED MODULE: ./components/Profile.jsx



const Profile_DEFAULT_PROFILE_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='#ccc' d='M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z' /%3E%3C/svg%3E";

function Profile({ user, logoutBtnHandler }) {
	return Object(preact_min["h"])(
		"div",
		{ "class": "tac" },
		Object(preact_min["h"])("img", {
			height: "80",
			"class": "profile-modal__avatar-img",
			src: user ? user.photoURL || Profile_DEFAULT_PROFILE_IMG : '',
			id: "profileAvatarImg",
			alt: "Profile image"
		}),
		Object(preact_min["h"])(
			"h3",
			{ id: "profileUserName", "class": "mb-2" },
			user && user.displayName ? user.displayName : 'Anonymous Creator'
		),
		Object(preact_min["h"])(
			"p",
			null,
			Object(preact_min["h"])(
				"button",
				{
					"class": "btn",
					"aria-label": "Logout from your account",
					onClick: logoutBtnHandler
				},
				"Logout"
			)
		)
	);
}
// CONCATENATED MODULE: ./components/SupportDeveloperModal.jsx




var SupportDeveloperModal__ref = Object(preact_min["h"])(
	'div',
	{ 'class': 'tac' },
	Object(preact_min["h"])(
		'h1',
		null,
		'Support the Developer'
	),
	Object(preact_min["h"])(
		'p',
		null,
		'Hi,',
		' ',
		Object(preact_min["h"])(
			'a',
			{
				href: 'https://kushagragour.in',
				target: '_blank',
				rel: 'noopener noreferrer'
			},
			'Kushagra'
		),
		' ',
		'here! Web Maker is a free and open-source project. To keep myself motivated for working on such open-source and free',
		' ',
		Object(preact_min["h"])(
			'a',
			{
				href: 'https://kushagragour.in/lab/',
				target: '_blank',
				rel: 'noopener noreferrer'
			},
			'side projects'
		),
		', I am accepting donations. Your pledge, no matter how small, will act as an appreciation towards my work and keep me going forward making Web Maker more awesome\uD83D\uDD25. So please consider donating. \uD83D\uDE4F\uD83C\uDFFC (could be as small as $1/month).'
	),
	Object(preact_min["h"])(
		'div',
		{
			'class': 'flex flex-h-center',
			id: 'onboardDontShowInTabOptionBtn',
			'd-click': 'onDontShowInTabClicked'
		},
		Object(preact_min["h"])(
			'a',
			{
				'class': 'onboard-selection',
				href: 'https://patreon.com/kushagra',
				target: '_blank',
				rel: 'noopener noreferrer',
				'aria-label': 'Make a monthly pledge on Patreon'
			},
			Object(preact_min["h"])('img', {
				src: 'assets/patreon.png',
				height: '60',
				alt: 'Become a patron image'
			}),
			Object(preact_min["h"])(
				'h3',
				{ 'class': 'onboard-selection-text' },
				'Make a monthly pledge on Patreon'
			)
		)
	),
	Object(preact_min["h"])(
		'a',
		{
			href: 'https://www.paypal.me/kushagragour',
			target: '_blank',
			rel: 'noopener noreferrer',
			'aria-label': 'Make a one time donation on Paypal'
		},
		'Or, make a one time donation'
	)
);

function SupportDeveloperModal({ show, closeHandler }) {
	return Object(preact_min["h"])(
		Modal_Modal,
		{ extraClasses: 'pledge-modal', show: show, closeHandler: closeHandler },
		SupportDeveloperModal__ref
	);
}
// CONCATENATED MODULE: ./components/KeyboardShortcutsModal.jsx




var KeyboardShortcutsModal__ref = Object(preact_min["h"])(
	'h1',
	null,
	'Keyboard Shortcuts'
);

var KeyboardShortcutsModal__ref2 = Object(preact_min["h"])(
	'div',
	{ 'class': 'flex' },
	Object(preact_min["h"])(
		'div',
		null,
		Object(preact_min["h"])(
			'h2',
			null,
			'Global'
		),
		Object(preact_min["h"])(
			'p',
			null,
			Object(preact_min["h"])(
				'span',
				{ 'class': 'kbd-shortcut__keys' },
				'Ctrl/\u2318 + Shift + ?'
			),
			Object(preact_min["h"])(
				'span',
				{ 'class': 'kbd-shortcut__details' },
				'See keyboard shortcuts'
			)
		),
		Object(preact_min["h"])(
			'p',
			null,
			Object(preact_min["h"])(
				'span',
				{ 'class': 'kbd-shortcut__keys' },
				'Ctrl/\u2318 + Shift + 5'
			),
			Object(preact_min["h"])(
				'span',
				{ 'class': 'kbd-shortcut__details' },
				'Refresh preview'
			)
		),
		Object(preact_min["h"])(
			'p',
			null,
			Object(preact_min["h"])(
				'span',
				{ 'class': 'kbd-shortcut__keys' },
				'Ctrl/\u2318 + S'
			),
			Object(preact_min["h"])(
				'span',
				{ 'class': 'kbd-shortcut__details' },
				'Save current creations'
			)
		),
		Object(preact_min["h"])(
			'p',
			null,
			Object(preact_min["h"])(
				'span',
				{ 'class': 'kbd-shortcut__keys' },
				'Ctrl/\u2318 + O'
			),
			Object(preact_min["h"])(
				'span',
				{ 'class': 'kbd-shortcut__details' },
				'Open list of saved creations'
			)
		),
		Object(preact_min["h"])(
			'p',
			null,
			Object(preact_min["h"])(
				'span',
				{ 'class': 'kbd-shortcut__keys' },
				'Ctrl + L'
			),
			Object(preact_min["h"])(
				'span',
				{ 'class': 'kbd-shortcut__details' },
				'Clear console (works when console input is focused)'
			)
		),
		Object(preact_min["h"])(
			'p',
			null,
			Object(preact_min["h"])(
				'span',
				{ 'class': 'kbd-shortcut__keys' },
				'Esc'
			),
			Object(preact_min["h"])(
				'span',
				{ 'class': 'kbd-shortcut__details' },
				'Close saved creations panel & modals'
			)
		)
	),
	Object(preact_min["h"])(
		'div',
		{ 'class': 'ml-2' },
		Object(preact_min["h"])(
			'h2',
			null,
			'Editor'
		),
		Object(preact_min["h"])(
			'p',
			null,
			Object(preact_min["h"])(
				'span',
				{ 'class': 'kbd-shortcut__keys' },
				'Ctrl/\u2318 + F'
			),
			Object(preact_min["h"])(
				'span',
				{ 'class': 'kbd-shortcut__details' },
				'Find'
			)
		),
		Object(preact_min["h"])(
			'p',
			null,
			Object(preact_min["h"])(
				'span',
				{ 'class': 'kbd-shortcut__keys' },
				'Ctrl/\u2318 + G'
			),
			Object(preact_min["h"])(
				'span',
				{ 'class': 'kbd-shortcut__details' },
				'Select next match'
			)
		),
		Object(preact_min["h"])(
			'p',
			null,
			Object(preact_min["h"])(
				'span',
				{ 'class': 'kbd-shortcut__keys' },
				'Ctrl/\u2318 + Shift + G'
			),
			Object(preact_min["h"])(
				'span',
				{ 'class': 'kbd-shortcut__details' },
				'Select previous match'
			)
		),
		Object(preact_min["h"])(
			'p',
			null,
			Object(preact_min["h"])(
				'span',
				{ 'class': 'kbd-shortcut__keys' },
				'Ctrl/\u2318 + Opt/Alt + F'
			),
			Object(preact_min["h"])(
				'span',
				{ 'class': 'kbd-shortcut__details' },
				'Find & replace'
			)
		),
		Object(preact_min["h"])(
			'p',
			null,
			Object(preact_min["h"])(
				'span',
				{ 'class': 'kbd-shortcut__keys' },
				'Shift + Tab'
			),
			Object(preact_min["h"])(
				'span',
				{ 'class': 'kbd-shortcut__details' },
				'Realign code'
			)
		),
		Object(preact_min["h"])(
			'p',
			null,
			Object(preact_min["h"])(
				'span',
				{ 'class': 'kbd-shortcut__keys' },
				'Ctrl/\u2318 + ]'
			),
			Object(preact_min["h"])(
				'span',
				{ 'class': 'kbd-shortcut__details' },
				'Indent code right'
			)
		),
		Object(preact_min["h"])(
			'p',
			null,
			Object(preact_min["h"])(
				'span',
				{ 'class': 'kbd-shortcut__keys' },
				'Ctrl/\u2318 + ['
			),
			Object(preact_min["h"])(
				'span',
				{ 'class': 'kbd-shortcut__details' },
				'Indent code left'
			)
		),
		Object(preact_min["h"])(
			'p',
			null,
			Object(preact_min["h"])(
				'span',
				{ 'class': 'kbd-shortcut__keys' },
				'Tab'
			),
			Object(preact_min["h"])(
				'span',
				{ 'class': 'kbd-shortcut__details' },
				'Emmet code completion',
				' ',
				Object(preact_min["h"])(
					'a',
					{
						href: 'https://emmet.io/',
						target: '_blank',
						rel: 'noopener noreferrer'
					},
					'Read more'
				)
			)
		),
		Object(preact_min["h"])(
			'p',
			null,
			Object(preact_min["h"])(
				'span',
				{ 'class': 'kbd-shortcut__keys' },
				'Ctrl/\u2318 + /'
			),
			Object(preact_min["h"])(
				'span',
				{ 'class': 'kbd-shortcut__details' },
				'Single line comment'
			)
		),
		Object(preact_min["h"])(
			'p',
			null,
			Object(preact_min["h"])(
				'span',
				{ 'class': 'kbd-shortcut__keys' },
				'Ctrl + Shift + F'
			),
			Object(preact_min["h"])(
				'span',
				{ 'class': 'kbd-shortcut__details' },
				'Run Prettier'
			)
		)
	)
);

function KeyboardShortcutsModal({ show, closeHandler }) {
	return Object(preact_min["h"])(
		Modal_Modal,
		{ show: show, closeHandler: closeHandler },
		KeyboardShortcutsModal__ref,
		KeyboardShortcutsModal__ref2
	);
}
// CONCATENATED MODULE: ./takeScreenshot.js



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
	var blob = new Blob([ab], {
		type: mimeString
	});
	var size = blob.size + 1024 / 2;

	var d = new Date();
	var fileName = ['web-maker-screenshot', d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()].join('-');
	fileName += '.png';

	function onWriteEnd() {
		var filePath = 'filesystem:chrome-extension://' + chrome.i18n.getMessage('@@extension_id') + '/temporary/' + fileName;

		// HACK: because chrome.downloads isn't working on optional permissions
		// anymore.
		return window.open(filePath);

		/* chrome.downloads.download(
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
  ); */
	}

	function errorHandler(e) {
		utils_log(e);
	}

	// create a blob for writing to a file
	window.webkitRequestFileSystem(window.TEMPORARY, size, fs => {
		fs.root.getFile(fileName, {
			create: true
		}, fileEntry => {
			fileEntry.createWriter(fileWriter => {
				fileWriter.onwriteend = onWriteEnd;
				fileWriter.write(blob);
			}, errorHandler);
		}, errorHandler);
	}, errorHandler);
}

function takeScreenshot(boundRect) {
	handleDownloadsPermission().then(() => {
		// Hide tooltips so that they don't show in the screenshot
		var s = document.createElement('style');
		s.textContent = '[class*="hint"]:after, [class*="hint"]:before { display: none!important; }';
		document.body.appendChild(s);

		function onImgLoad(image) {
			var c = document.createElement('canvas');
			var iframeBounds = boundRect;
			c.width = iframeBounds.width;
			c.height = iframeBounds.height;
			var ctx = c.getContext('2d');
			var devicePixelRatio = window.devicePixelRatio || 1;

			ctx.drawImage(image, iframeBounds.left * devicePixelRatio, iframeBounds.top * devicePixelRatio, iframeBounds.width * devicePixelRatio, iframeBounds.height * devicePixelRatio, 0, 0, iframeBounds.width, iframeBounds.height);
			image.removeEventListener('load', onImgLoad);
			saveScreenshot(c.toDataURL());
		}

		setTimeout(() => {
			chrome.tabs.captureVisibleTab(null, {
				format: 'png',
				quality: 100
			}, function (dataURI) {
				s.remove();
				if (dataURI) {
					var image = new Image();
					image.src = dataURI;
					image.addEventListener('load', () => onImgLoad(image, dataURI));
				}
			});
		}, 50);

		trackEvent('ui', 'takeScreenshotBtnClick');
	});
}
// CONCATENATED MODULE: ./components/AskToImportModal.jsx




var AskToImportModal__ref = Object(preact_min["h"])(
	'h2',
	null,
	'Import your creations in your account'
);

var AskToImportModal__ref2 = Object(preact_min["h"])(
	'p',
	null,
	'It\'s okay if you don\'t want to. You can simply logout and access them anytime on this browser.'
);

function AskToImportModal({
	show,
	closeHandler,
	oldSavedCreationsCount,
	dontAskBtnClickHandler,
	importBtnClickHandler
}) {
	return Object(preact_min["h"])(
		Modal_Modal,
		{
			extraClasses: 'ask-to-import-modal',
			show: show,
			closeHandler: closeHandler
		},
		AskToImportModal__ref,
		Object(preact_min["h"])(
			'div',
			null,
			Object(preact_min["h"])(
				'p',
				null,
				'You have ',
				Object(preact_min["h"])(
					'span',
					null,
					oldSavedCreationsCount
				),
				' creations saved in your local machine. Do you want to import those creations in your account so they are more secure and accessible anywhere?'
			),
			AskToImportModal__ref2,
			Object(preact_min["h"])(
				'div',
				{ 'class': 'flex flex-h-end' },
				Object(preact_min["h"])(
					'button',
					{ onClick: dontAskBtnClickHandler, 'class': 'btn' },
					'Don\'t ask me again'
				),
				Object(preact_min["h"])(
					'button',
					{ onClick: importBtnClickHandler, 'class': 'btn btn--primary ml-1' },
					'Yes, please import'
				)
			)
		)
	);
}
// CONCATENATED MODULE: ./components/Alerts.jsx



var Alerts__ref = Object(preact_min["h"])("div", { "class": "alerts-container", id: "js-alerts-container" });

let Alerts = class Alerts extends preact_min["Component"] {
	shouldComponentUpdate(nextProps, nextState) {
		return false;
	}

	render() {
		return Alerts__ref;
	}
};
// CONCATENATED MODULE: ./components/HelpModal.jsx





var HelpModal__ref = Object(preact_min["h"])(
	'div',
	{ 'class': 'web-maker-with-tag' },
	'Web Maker'
);

var HelpModal__ref2 = Object(preact_min["h"])(
	'p',
	null,
	'Made with ',
	Object(preact_min["h"])(
		'span',
		{ style: 'margin-right: 8px;' },
		'\uD83D\uDC96'
	),
	'&',
	' ',
	Object(preact_min["h"])(
		'span',
		{ style: 'margin-right: 8px;' },
		' \uD83D\uDE4C'
	),
	' by',
	' ',
	Object(preact_min["h"])(
		'a',
		{
			href: 'https://twitter.com/chinchang457',
			target: '_blank',
			rel: 'noopener noreferrer'
		},
		'Kushagra Gour'
	)
);

var HelpModal__ref3 = Object(preact_min["h"])(
	'p',
	null,
	Object(preact_min["h"])(
		'a',
		{ href: '/docs', target: '_blank', rel: 'noopener noreferrer' },
		'Read the documentation'
	),
	'.'
);

var HelpModal__ref4 = Object(preact_min["h"])(
	'p',
	null,
	'Tweet out your feature requests, comments & suggestions to',
	' ',
	Object(preact_min["h"])(
		'a',
		{
			target: '_blank',
			rel: 'noopener noreferrer',
			href: 'https://twitter.com/webmakerApp'
		},
		'@webmakerApp'
	),
	'.'
);

var HelpModal__ref5 = Object(preact_min["h"])(
	'p',
	{ 'class': 'show-when-extension' },
	'Like this extension? Please',
	' ',
	Object(preact_min["h"])(
		'a',
		{
			href: 'https://chrome.google.com/webstore/detail/web-maker/lkfkkhfhhdkiemehlpkgjeojomhpccnh/reviews',
			target: '_blank',
			rel: 'noopener noreferrer'
		},
		'rate it here'
	),
	'.'
);

var HelpModal__ref6 = Object(preact_min["h"])(
	'svg',
	null,
	Object(preact_min["h"])('use', { xlinkHref: '#gift-icon' })
);

var HelpModal__ref7 = Object(preact_min["h"])(
	'a',
	{
		'aria-label': 'Rate Web Maker',
		href: 'https://chrome.google.com/webstore/detail/web-maker/lkfkkhfhhdkiemehlpkgjeojomhpccnh/reviews',
		target: '_blank',
		rel: 'noopener noreferrer',
		'class': 'btn btn-icon'
	},
	Object(preact_min["h"])(
		'svg',
		null,
		Object(preact_min["h"])('use', { xlinkHref: '#heart-icon' })
	),
	'Review Web Maker'
);

var HelpModal__ref8 = Object(preact_min["h"])(
	'a',
	{
		'aria-label': 'Chat',
		href: 'https://spectrum.chat/web-maker',
		target: '_blank',
		rel: 'noopener noreferrer',
		'class': 'btn btn-icon'
	},
	Object(preact_min["h"])(
		'svg',
		null,
		Object(preact_min["h"])('use', { xlinkHref: '#chat-icon' })
	),
	'Chat'
);

var HelpModal__ref9 = Object(preact_min["h"])(
	'a',
	{
		'aria-label': 'Report a Bug',
		href: 'https://github.com/chinchang/web-maker/issues',
		target: '_blank',
		rel: 'noopener noreferrer',
		'class': 'btn btn-icon'
	},
	Object(preact_min["h"])(
		'svg',
		null,
		Object(preact_min["h"])('use', { xlinkHref: '#bug-icon' })
	),
	'Report a bug'
);

var HelpModal__ref10 = Object(preact_min["h"])(
	'p',
	null,
	Object(preact_min["h"])(
		'details',
		null,
		Object(preact_min["h"])(
			'summary',
			null,
			Object(preact_min["h"])(
				'h3',
				{ 'class': 'd-i' },
				'See awesome libraries used'
			)
		),
		Object(preact_min["h"])(
			'ul',
			null,
			Object(preact_min["h"])(
				'li',
				null,
				Object(preact_min["h"])(
					'a',
					{
						target: '_blank',
						rel: 'noopener noreferrer',
						href: 'https://kushagragour.in/lab/hint/'
					},
					'Hint.css'
				),
				' ',
				'&',
				Object(preact_min["h"])(
					'a',
					{
						target: '_blank',
						rel: 'noopener noreferrer',
						href: 'https://github.com/chinchang/screenlog.js'
					},
					' ',
					'Screenlog.js'
				),
				' ',
				'- By me :)'
			),
			Object(preact_min["h"])(
				'li',
				null,
				Object(preact_min["h"])(
					'a',
					{
						target: '_blank',
						rel: 'noopener noreferrer',
						href: 'https://nathancahill.github.io/Split.js/'
					},
					'Split.js'
				),
				' ',
				'- Nathan Cahill'
			),
			Object(preact_min["h"])(
				'li',
				null,
				Object(preact_min["h"])(
					'a',
					{
						target: '_blank',
						rel: 'noopener noreferrer',
						href: 'https://codemirror.net/'
					},
					'Codemirror'
				),
				' ',
				'- Marijn Haverbeke'
			),
			Object(preact_min["h"])(
				'li',
				null,
				Object(preact_min["h"])(
					'a',
					{
						target: '_blank',
						rel: 'noopener noreferrer',
						href: 'https://emmet.io/'
					},
					'Emmet'
				),
				' ',
				'- Sergey Chikuyonok'
			),
			Object(preact_min["h"])(
				'li',
				null,
				Object(preact_min["h"])(
					'a',
					{
						target: '_blank',
						rel: 'noopener noreferrer',
						href: 'http://esprima.org/'
					},
					'Esprima'
				),
				' ',
				'- Ariya Hidayat'
			),
			Object(preact_min["h"])(
				'li',
				null,
				Object(preact_min["h"])(
					'a',
					{
						target: '_blank',
						rel: 'noopener noreferrer',
						href: 'https://github.com/enjalot/Inlet'
					},
					'Inlet'
				),
				' ',
				'- Ian Johnson'
			),
			Object(preact_min["h"])(
				'li',
				null,
				Object(preact_min["h"])(
					'a',
					{
						target: '_blank',
						rel: 'noopener noreferrer',
						href: 'https://webmakerapp.com/'
					},
					'Web Maker!'
				),
				' ',
				'- whhat!'
			)
		)
	)
);

var HelpModal__ref11 = Object(preact_min["h"])(
	'p',
	null,
	Object(preact_min["h"])(
		'h3',
		null,
		'License'
	),
	'"Web Maker" is',
	' ',
	Object(preact_min["h"])(
		'a',
		{
			target: '_blank',
			rel: 'noopener noreferrer',
			href: 'https://github.com/chinchang/web-maker'
		},
		'open-source'
	),
	' ',
	'under the',
	' ',
	Object(preact_min["h"])(
		'a',
		{
			href: 'https://opensource.org/licenses/MIT',
			target: '_blank',
			rel: 'noopener noreferrer'
		},
		'MIT License'
	),
	'.'
);

function HelpModal(props) {
	return Object(preact_min["h"])(
		Modal_Modal,
		{ show: props.show, closeHandler: props.closeHandler },
		Object(preact_min["h"])(
			'h1',
			null,
			HelpModal__ref,
			Object(preact_min["h"])(
				'small',
				{ style: 'font-size:14px;' },
				props.version
			)
		),
		Object(preact_min["h"])(
			'div',
			null,
			HelpModal__ref2,
			HelpModal__ref3,
			HelpModal__ref4,
			HelpModal__ref5,
			Object(preact_min["h"])(
				'p',
				null,
				Object(preact_min["h"])(
					Button,
					{
						'aria-label': 'Support the developer',
						onClick: props.onSupportBtnClick,
						'data-event-action': 'supportDeveloperHelpBtnClick',
						'data-event-category': 'ui',
						'class': 'btn btn-icon'
					},
					HelpModal__ref6,
					'Support the developer'
				),
				' ',
				HelpModal__ref7,
				' ',
				HelpModal__ref8,
				' ',
				HelpModal__ref9
			),
			HelpModal__ref10,
			HelpModal__ref11
		)
	);
}
// CONCATENATED MODULE: ./components/OnboardingModal.jsx




var OnboardingModal__ref = Object(preact_min["h"])(
	'div',
	{ 'class': 'tac' },
	Object(preact_min["h"])(
		'svg',
		{ width: '130px', height: '50px', 'aria-hidden': 'true' },
		Object(preact_min["h"])('use', { xlinkHref: '#logo' })
	),
	Object(preact_min["h"])(
		'h1',
		{ style: 'margin-top:20px' },
		'Welcome to Web Maker'
	)
);

var OnboardingModal__ref2 = Object(preact_min["h"])(
	'div',
	{ 'class': 'flex--desk', style: 'margin-top:40px;' },
	Object(preact_min["h"])(
		'div',
		{ 'class': 'onboard-step show-when-app hide-on-mobile' },
		Object(preact_min["h"])(
			'div',
			{ 'class': 'tac' },
			Object(preact_min["h"])(
				'svg',
				{ 'class': 'onboard-step__icon', viewBox: '0 0 24 24' },
				Object(preact_min["h"])('path', { d: 'M13.64,21.97C13.14,22.21 12.54,22 12.31,21.5L10.13,16.76L7.62,18.78C7.45,18.92 7.24,19 7,19A1,1 0 0,1 6,18V3A1,1 0 0,1 7,2C7.24,2 7.47,2.09 7.64,2.23L7.65,2.22L19.14,11.86C19.57,12.22 19.62,12.85 19.27,13.27C19.12,13.45 18.91,13.57 18.7,13.61L15.54,14.23L17.74,18.96C18,19.46 17.76,20.05 17.26,20.28L13.64,21.97Z' })
			)
		),
		Object(preact_min["h"])(
			'p',
			null,
			'Open Web Maker anytime by visiting',
			' ',
			Object(preact_min["h"])(
				'a',
				null,
				'https://webmakerapp.com/app/'
			),
			' - Even when you are offline! It just works! \uD83D\uDE31 ',
			Object(preact_min["h"])(
				'strong',
				null,
				'Drag the following bookmarklet'
			),
			' on your bookmark bar to create a quick access shortcut:',
			Object(preact_min["h"])(
				'a',
				{ 'class': 'ml-1 bookmarklet', href: 'https://webmakerapp.com/app/' },
				Object(preact_min["h"])(
					'svg',
					{ width: '20', height: '20', 'aria-hidden': 'true' },
					Object(preact_min["h"])('use', { xlinkHref: '#logo' })
				),
				'Web Maker'
			)
		)
	),
	Object(preact_min["h"])(
		'div',
		{ 'class': 'onboard-step show-when-extension' },
		Object(preact_min["h"])(
			'div',
			{ 'class': 'tac' },
			Object(preact_min["h"])(
				'svg',
				{ 'class': 'onboard-step__icon', viewBox: '0 0 24 24' },
				Object(preact_min["h"])('path', { d: 'M13.64,21.97C13.14,22.21 12.54,22 12.31,21.5L10.13,16.76L7.62,18.78C7.45,18.92 7.24,19 7,19A1,1 0 0,1 6,18V3A1,1 0 0,1 7,2C7.24,2 7.47,2.09 7.64,2.23L7.65,2.22L19.14,11.86C19.57,12.22 19.62,12.85 19.27,13.27C19.12,13.45 18.91,13.57 18.7,13.61L15.54,14.23L17.74,18.96C18,19.46 17.76,20.05 17.26,20.28L13.64,21.97Z' })
			)
		),
		Object(preact_min["h"])(
			'p',
			null,
			'Open Web Maker anytime by clicking the',
			Object(preact_min["h"])(
				'svg',
				{ 'class': 'relative', style: 'top:5px;', width: '40', height: '30' },
				Object(preact_min["h"])('use', { xlinkHref: '#logo' })
			),
			' ',
			'button in top-right side of your browser.'
		)
	),
	Object(preact_min["h"])(
		'div',
		{ 'class': 'onboard-step' },
		Object(preact_min["h"])(
			'div',
			{ 'class': 'tac' },
			Object(preact_min["h"])(
				'svg',
				{ 'class': 'onboard-step__icon', viewBox: '0 0 24 24' },
				Object(preact_min["h"])('use', { xlinkHref: '#settings-icon' })
			)
		),
		Object(preact_min["h"])(
			'p',
			null,
			'Configure and customize settings by clicking the gear icon (',
			Object(preact_min["h"])(
				'svg',
				{
					style: 'width:18px;height:18px;position:relative;top:3px;fill:#888',
					viewBox: '0 0 24 24'
				},
				Object(preact_min["h"])('use', { xlinkHref: '#settings-icon' })
			),
			') in bottom right of the app.'
		)
	),
	Object(preact_min["h"])(
		'div',
		{ 'class': 'onboard-step' },
		Object(preact_min["h"])(
			'div',
			{ 'class': 'tac' },
			Object(preact_min["h"])(
				'svg',
				{ 'class': 'onboard-step__icon', style: 'stroke-width:0.3px;' },
				Object(preact_min["h"])('use', { xlinkHref: '#twitter-icon' })
			)
		),
		Object(preact_min["h"])(
			'p',
			null,
			'Follow',
			' ',
			Object(preact_min["h"])(
				'a',
				{
					href: 'https://twitter.com/intent/follow?screen_name=webmakerApp',
					targe: '_blank',
					rel: 'noopener noreferrer'
				},
				'@webmakerApp'
			),
			' ',
			'to know about the new upcoming features!'
		)
	)
);

var OnboardingModal__ref3 = Object(preact_min["h"])(
	'p',
	{ 'class': 'tac show-when-app' },
	'If you are an existing Chrome extension user, you can import your creations from there to here.',
	' ',
	Object(preact_min["h"])(
		'a',
		{
			href: 'https://medium.com/web-maker/importing-exporting-your-creations-d92e7de5c3dc',
			target: '_blank',
			rel: 'noopener noreferrer'
		},
		'Learn how to export/import'
	),
	'.'
);

function OnboardingModal(props) {
	return Object(preact_min["h"])(
		Modal_Modal,
		{ show: props.show, closeHandler: props.closeHandler },
		OnboardingModal__ref,
		OnboardingModal__ref2,
		OnboardingModal__ref3,
		Object(preact_min["h"])(
			'p',
			{ 'class': 'tac' },
			Object(preact_min["h"])(
				'button',
				{ 'class': 'btn btn--primary', onClick: props.closeHandler },
				'Lets start!'
			)
		)
	);
}
// CONCATENATED MODULE: ./components/Js13KModal.jsx




var Js13KModal__ref = Object(preact_min["h"])(
	'div',
	{ 'class': 'tac' },
	Object(preact_min["h"])(
		'div',
		{ className: 'flex flex-v-center flex-h-center ' },
		Object(preact_min["h"])('img', {
			src: '/icon-128.png',
			alt: 'Web Maker logo',
			height: '100',
			style: 'margin:0 0.5rem;'
		}),
		Object(preact_min["h"])(
			'h2',
			null,
			'Web Maker'
		),
		Object(preact_min["h"])(
			'span',
			{ style: 'font-size:3rem;margin:0 1rem;' },
			'+'
		),
		Object(preact_min["h"])(
			'h2',
			null,
			'JS13K Games'
		),
		Object(preact_min["h"])('img', {
			src: 'assets/js13kgames-square-logo.png',
			alt: 'JS13K Games logo',
			height: '100',
			style: 'margin:0 0.5rem;'
		})
	)
);

var Js13KModal__ref2 = Object(preact_min["h"])(
	'div',
	null,
	Object(preact_min["h"])(
		'p',
		null,
		Object(preact_min["h"])(
			'strong',
			null,
			'Js13kGames'
		),
		' is a JavaScript coding competition for',
		' ',
		Object(preact_min["h"])(
			'strong',
			null,
			'HTML5 Game Developers'
		),
		'. The fun part of the compo is the file size limit set to ',
		Object(preact_min["h"])(
			'strong',
			null,
			'13 kilobytes'
		),
		'. The competition will start at ',
		Object(preact_min["h"])(
			'strong',
			null,
			'13:00 CEST, 13th August'
		),
		' and will end at ',
		Object(preact_min["h"])(
			'strong',
			null,
			'13:00 CEST, 13th September 2018'
		),
		'.'
	),
	Object(preact_min["h"])(
		'p',
		null,
		'You have activated Web Maker\'s Js13kGames mode! This gives you some extra support to build your awesome game right here. Constantly see your game\'s zipped size in the footer. When you are done, download the zip.',
		' ',
		Object(preact_min["h"])(
			'a',
			{
				href: 'https://medium.com/web-maker/js13kgames-jam-with-web-maker-a3389cf2cbb',
				target: '_blank',
				rel: 'noopener'
			},
			'Read more about this collaboration'
		),
		'.'
	),
	Object(preact_min["h"])(
		'ul',
		null,
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'a',
				{
					href: 'https://gamedevelopment.tutsplus.com/articles/how-to-minify-your-html5-game-for-the-js13kgames-competition--cms-21883',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				'Read Tuts+ Gamedev intro article'
			)
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'a',
				{
					href: 'http://js13kgames.github.io/resources/',
					target: '_blank',
					rel: 'noopener'
				},
				'Resources and useful tools'
			)
		),
		Object(preact_min["h"])(
			'li',
			null,
			Object(preact_min["h"])(
				'a',
				{
					href: 'http://2018.js13kgames.com/#rules',
					target: '_blank',
					rel: 'noopener'
				},
				'Compo rules'
			)
		)
	),
	Object(preact_min["h"])(
		'p',
		null,
		'Have fun building games!'
	)
);

function Js13KModal({ show, closeHandler }) {
	return Object(preact_min["h"])(
		Modal_Modal,
		{ show: show, closeHandler: closeHandler, small: true },
		Js13KModal__ref,
		Js13KModal__ref2
	);
}
// CONCATENATED MODULE: ./templateList.js
/* harmony default export */ var templateList = ([{
	id: 'react',
	title: 'React',
	img: 'assets/react-logo.svg'
}, {
	id: 'vue',
	title: 'Vue',
	img: 'assets/vue-logo.svg'
}, {
	id: 'preact',
	title: 'Preact',
	img: 'assets/preact-logo.svg'
}, {
	id: 'kontra-game-engine',
	title: 'Kontra Game Engine',
	img: 'assets/html5-logo.svg'
}]);
// CONCATENATED MODULE: ./components/CreateNewModal.jsx






var CreateNewModal__ref = Object(preact_min["h"])('hr', null);

let CreateNewModal_CreateNewModal = class CreateNewModal extends preact_min["Component"] {
	render() {
		const {
			show,
			closeHandler,
			onBlankTemplateSelect,
			onBlankFileTemplateSelect,
			onImportGithubRepoSelect,
			onTemplateSelect
		} = this.props;
		return Object(preact_min["h"])(
			Modal_Modal,
			{ show: show, closeHandler: closeHandler },
			Object(preact_min["h"])(
				'div',
				{ 'class': 'tac' },
				Object(preact_min["h"])(
					'button',
					{ className: 'btn', onClick: onBlankTemplateSelect },
					'Start a blank creation'
				),
				Object(preact_min["h"])(
					'button',
					{ className: 'btn', onClick: onBlankFileTemplateSelect },
					'Start a blank files creation'
				),
				Object(preact_min["h"])(
					'p',
					null,
					Object(preact_min["h"])(
						'button',
						{
							className: 'btn',
							onClick: () => this.setState({
								isGhRepoInputVisible: true
							})
						},
						'Import Github Repository'
					),
					this.state.isGhRepoInputVisible ? Object(preact_min["h"])(
						'div',
						null,
						Object(preact_min["h"])('input', { ref: el => this.ghRepoInput = el }),
						Object(preact_min["h"])(
							'button',
							{
								className: 'btn',
								onClick: () => {
									onImportGithubRepoSelect(this.ghRepoInput.value);
								}
							},
							'Import'
						)
					) : null
				)
			),
			CreateNewModal__ref,
			'Or choose from a template:',
			Object(preact_min["h"])(
				'div',
				{ 'class': 'saved-items-pane__container' },
				templateList.map(template => Object(preact_min["h"])(ItemTile, {
					inline: true,
					item: template,
					focusable: true,
					onClick: onTemplateSelect.bind(null, template)
				}))
			)
		);
	}
};
// CONCATENATED MODULE: ./components/Icons.jsx



var Icons__ref = Object(preact_min["h"])(
	"symbol",
	{ id: "logo", viewBox: "-145 -2 372 175" },
	Object(preact_min["h"])(
		"g",
		{
			stroke: "none",
			strokeWidth: 1,
			fill: "none",
			fillRule: "evenodd",
			transform: "translate(-145.000000, -1.000000)"
		},
		Object(preact_min["h"])("polygon", {
			id: "Path-1",
			fill: "#FF4600",
			points: "31 0 232 0 132 173.310547"
		}),
		Object(preact_min["h"])("polygon", {
			id: "Path-1",
			fill: "#FF6C00",
			points: "0 0 201 0 101 173.310547"
		}),
		Object(preact_min["h"])("polygon", {
			id: "Path-1",
			fill: "#FF6C00",
			transform: "translate(271.500000, 86.500000) scale(1, -1) translate(-271.500000, -86.500000) ",
			points: "171 0 372 0 272 173.310547"
		}),
		Object(preact_min["h"])("polygon", {
			id: "Path-1",
			fill: "#FF4600",
			transform: "translate(241.500000, 86.500000) scale(1, -1) translate(-241.500000, -86.500000) ",
			points: "141 0 342 0 242 173.310547"
		})
	)
);

var Icons__ref2 = Object(preact_min["h"])(
	"symbol",
	{ id: "bug-icon", viewBox: "0 0 24 24" },
	Object(preact_min["h"])("path", { d: "M14,12H10V10H14M14,16H10V14H14M20,8H17.19C16.74,7.22 16.12,6.55 15.37,6.04L17,4.41L15.59,3L13.42,5.17C12.96,5.06 12.5,5 12,5C11.5,5 11.04,5.06 10.59,5.17L8.41,3L7,4.41L8.62,6.04C7.88,6.55 7.26,7.22 6.81,8H4V10H6.09C6.04,10.33 6,10.66 6,11V12H4V14H6V15C6,15.34 6.04,15.67 6.09,16H4V18H6.81C7.85,19.79 9.78,21 12,21C14.22,21 16.15,19.79 17.19,18H20V16H17.91C17.96,15.67 18,15.34 18,15V14H20V12H18V11C18,10.66 17.96,10.33 17.91,10H20V8Z" })
);

var Icons__ref3 = Object(preact_min["h"])(
	"symbol",
	{ id: "google-icon", viewBox: "0 0 24 24" },
	Object(preact_min["h"])("path", { d: "M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z" })
);

var Icons__ref4 = Object(preact_min["h"])(
	"symbol",
	{ id: "fb-icon", viewBox: "0 0 24 24" },
	Object(preact_min["h"])("path", { d: "M17,2V2H17V6H15C14.31,6 14,6.81 14,7.5V10H14L17,10V14H14V22H10V14H7V10H10V6A4,4 0 0,1 14,2H17Z" })
);

var Icons__ref5 = Object(preact_min["h"])(
	"symbol",
	{ id: "github-icon", viewBox: "0 0 24 24" },
	Object(preact_min["h"])("path", { d: "M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" })
);

var Icons__ref6 = Object(preact_min["h"])(
	"symbol",
	{ id: "settings-icon", viewBox: "0 0 24 24" },
	Object(preact_min["h"])("path", { d: "M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" })
);

var Icons__ref7 = Object(preact_min["h"])(
	"symbol",
	{ id: "twitter-icon", viewBox: "0 0 16 16" },
	Object(preact_min["h"])("path", { d: "M15.969,3.058c-0.586,0.26-1.217,0.436-1.878,0.515c0.675-0.405,1.194-1.045,1.438-1.809 c-0.632,0.375-1.332,0.647-2.076,0.793c-0.596-0.636-1.446-1.033-2.387-1.033c-1.806,0-3.27,1.464-3.27,3.27 c0,0.256,0.029,0.506,0.085,0.745C5.163,5.404,2.753,4.102,1.14,2.124C0.859,2.607,0.698,3.168,0.698,3.767 c0,1.134,0.577,2.135,1.455,2.722C1.616,6.472,1.112,6.325,0.671,6.08c0,0.014,0,0.027,0,0.041c0,1.584,1.127,2.906,2.623,3.206 C3.02,9.402,2.731,9.442,2.433,9.442c-0.211,0-0.416-0.021-0.615-0.059c0.416,1.299,1.624,2.245,3.055,2.271 c-1.119,0.877-2.529,1.4-4.061,1.4c-0.264,0-0.524-0.015-0.78-0.046c1.447,0.928,3.166,1.469,5.013,1.469 c6.015,0,9.304-4.983,9.304-9.304c0-0.142-0.003-0.283-0.009-0.423C14.976,4.29,15.531,3.714,15.969,3.058z" })
);

var Icons__ref8 = Object(preact_min["h"])(
	"symbol",
	{ id: "heart-icon", viewBox: "0 0 24 24" },
	Object(preact_min["h"])("path", { d: "M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" })
);

var Icons__ref9 = Object(preact_min["h"])(
	"symbol",
	{ id: "play-icon", viewBox: "0 0 24 24" },
	Object(preact_min["h"])(
		"svg",
		null,
		Object(preact_min["h"])("path", { d: "M8,5.14V19.14L19,12.14L8,5.14Z" })
	)
);

var Icons__ref10 = Object(preact_min["h"])(
	"symbol",
	{ id: "cancel-icon", viewBox: "0 0 24 24" },
	Object(preact_min["h"])(
		"svg",
		null,
		Object(preact_min["h"])("path", { d: "M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12C4,13.85 4.63,15.55 5.68,16.91L16.91,5.68C15.55,4.63 13.85,4 12,4M12,20A8,8 0 0,0 20,12C20,10.15 19.37,8.45 18.32,7.09L7.09,18.32C8.45,19.37 10.15,20 12,20Z" })
	)
);

var Icons__ref11 = Object(preact_min["h"])(
	"symbol",
	{ id: "chevron-icon", viewBox: "0 0 24 24" },
	Object(preact_min["h"])(
		"svg",
		null,
		Object(preact_min["h"])("path", { d: "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" })
	)
);

var Icons__ref12 = Object(preact_min["h"])(
	"symbol",
	{ id: "chat-icon", viewBox: "0 0 24 24" },
	Object(preact_min["h"])("path", { d: "M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M8,14H6V12H8V14M8,11H6V9H8V11M8,8H6V6H8V8M15,14H10V12H15V14M18,11H10V9H18V11M18,8H10V6H18V8Z" })
);

var Icons__ref13 = Object(preact_min["h"])("path", { d: "M22,12V20A2,2 0 0,1 20,22H4A2,2 0 0,1 2,20V12A1,1 0 0,1 1,11V8A2,2 0 0,1 3,6H6.17C6.06,5.69 6,5.35 6,5A3,3 0 0,1 9,2C10,2 10.88,2.5 11.43,3.24V3.23L12,4L12.57,3.23V3.24C13.12,2.5 14,2 15,2A3,3 0 0,1 18,5C18,5.35 17.94,5.69 17.83,6H21A2,2 0 0,1 23,8V11A1,1 0 0,1 22,12M4,20H11V12H4V20M20,20V12H13V20H20M9,4A1,1 0 0,0 8,5A1,1 0 0,0 9,6A1,1 0 0,0 10,5A1,1 0 0,0 9,4M15,4A1,1 0 0,0 14,5A1,1 0 0,0 15,6A1,1 0 0,0 16,5A1,1 0 0,0 15,4M3,8V10H11V8H3M13,8V10H21V8H13Z" });

var Icons__ref14 = Object(preact_min["h"])("symbol", { id: "gift-icon", viewBox: "0 0 24 24" });

var Icons__ref15 = Object(preact_min["h"])(
	"symbol",
	{ id: "cross-icon", viewBox: "0 0 24 24" },
	Object(preact_min["h"])("path", { d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" })
);

var Icons__ref16 = Object(preact_min["h"])(
	"symbol",
	{ id: "keyboard-icon", viewBox: "0 0 24 24" },
	Object(preact_min["h"])("path", { d: "M19,10H17V8H19M19,13H17V11H19M16,10H14V8H16M16,13H14V11H16M16,17H8V15H16M7,10H5V8H7M7,13H5V11H7M8,11H10V13H8M8,8H10V10H8M11,11H13V13H11M11,8H13V10H11M20,5H4C2.89,5 2,5.89 2,7V17A2,2 0 0,0 4,19H20A2,2 0 0,0 22,17V7C22,5.89 21.1,5 20,5Z" })
);

var Icons__ref17 = Object(preact_min["h"])(
	"symbol",
	{ id: "mode-icon", viewBox: "0 0 100 100" },
	Object(preact_min["h"])(
		"g",
		null,
		Object(preact_min["h"])("rect", { x: 0, y: 0, width: 28, height: 47 }),
		Object(preact_min["h"])("rect", { x: 36, y: 0, width: 28, height: 47 }),
		Object(preact_min["h"])("rect", { x: 72, y: 0, width: 28, height: 47 }),
		Object(preact_min["h"])("rect", { x: 0, y: 53, width: 100, height: 47 })
	)
);

var Icons__ref18 = Object(preact_min["h"])(
	"symbol",
	{ id: "vertical-mode-icon", viewBox: "0 0 100 100" },
	Object(preact_min["h"])(
		"g",
		null,
		Object(preact_min["h"])("rect", { x: 0, y: 0, width: 20, height: 100 }),
		Object(preact_min["h"])("rect", { x: 23, y: 0, width: 20, height: 100 }),
		Object(preact_min["h"])("rect", { x: 46, y: 0, width: 20, height: 100 }),
		Object(preact_min["h"])("rect", { x: 69, y: 0, width: 32, height: 100 })
	)
);

var Icons__ref19 = Object(preact_min["h"])(
	"symbol",
	{ id: "search", viewBox: "0 0 24 24" },
	Object(preact_min["h"])("path", { d: "M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" })
);

var Icons__ref20 = Object(preact_min["h"])(
	"g",
	{ fill: "none", fillRule: "evenodd", strokeWidth: 10 },
	Object(preact_min["h"])(
		"circle",
		{ cx: 22, cy: 22, r: 1 },
		Object(preact_min["h"])("animate", {
			attributeName: "r",
			begin: "0s",
			dur: "1.8s",
			values: "1; 20",
			calcMode: "spline",
			keyTimes: "0; 1",
			keySplines: "0.165, 0.84, 0.44, 1",
			repeatCount: "indefinite"
		}),
		Object(preact_min["h"])("animate", {
			attributeName: "stroke-opacity",
			begin: "0s",
			dur: "1.8s",
			values: "1; 0",
			calcMode: "spline",
			keyTimes: "0; 1",
			keySplines: "0.3, 0.61, 0.355, 1",
			repeatCount: "indefinite"
		})
	),
	Object(preact_min["h"])(
		"circle",
		{ cx: 22, cy: 22, r: 1 },
		Object(preact_min["h"])("animate", {
			attributeName: "r",
			begin: "-0.9s",
			dur: "1.8s",
			values: "1; 20",
			calcMode: "spline",
			keyTimes: "0; 1",
			keySplines: "0.165, 0.84, 0.44, 1",
			repeatCount: "indefinite"
		}),
		Object(preact_min["h"])("animate", {
			attributeName: "stroke-opacity",
			begin: "-0.9s",
			dur: "1.8s",
			values: "1; 0",
			calcMode: "spline",
			keyTimes: "0; 1",
			keySplines: "0.3, 0.61, 0.355, 1",
			repeatCount: "indefinite"
		})
	)
);

function Icons() {
	return Object(preact_min["h"])(
		"svg",
		{
			version: "1.1",
			xmlns: "http://www.w3.org/2000/svg",
			style: { display: 'none' }
		},
		Icons__ref,
		Icons__ref2,
		Icons__ref3,
		Icons__ref4,
		Icons__ref5,
		Icons__ref6,
		Icons__ref7,
		Icons__ref8,
		Icons__ref9,
		Icons__ref10,
		Icons__ref11,
		Icons__ref12,
		Object(preact_min["h"])(
			"symbol",
			{ id: "gift-icon", viewBox: "0 0 24 24" },
			Icons__ref13,
			Icons__ref14,
			Icons__ref15,
			Icons__ref16,
			Icons__ref17,
			Icons__ref18,
			Icons__ref19,
			Object(preact_min["h"])(
				"symbol",
				{ id: "loader-icon", viewBox: "0 0 44 44" },
				Icons__ref20
			)
		)
	);
}
// EXTERNAL MODULE: ../node_modules/jszip/lib/index.js
var jszip_lib = __webpack_require__("1miM");
var jszip_lib_default = /*#__PURE__*/__webpack_require__.n(jszip_lib);

// CONCATENATED MODULE: ./keyboardKeys.js
const keyboardKeys_ENTER_KEY = 13;
const keyboardKeys_ESCAPE_KEY = 27;
const LEFT_KEY = 37;
const UP_KEY = 38;
const RIGHT_KEY = 39;
const DOWN_KEY = 40;
// CONCATENATED MODULE: ./components/CommandPalette.jsx










function getFolder(filePath) {
	const split = filePath.split('/');
	if (split.length > 1) {
		split.length = split.length - 1;
		return split.join('/');
	}
	return '';
}
function Row({ item, onClick, isSelected }) {
	return Object(preact_min["h"])(
		'li',
		null,
		Object(preact_min["h"])(
			'button',
			{
				'class': `command-palette__option-row ${isSelected ? 'command-palette__option-row--selected' : ''}`,
				onClick: onClick
			},
			item.path ? Object(preact_min["h"])(FileIcon, { file: item }) : null,
			item.name,
			item.path ? Object(preact_min["h"])(
				'span',
				{ 'class': 'command-palette__option-subtitle' },
				getFolder(item.path)
			) : null
		)
	);
}
let CommandPalette_CommandPalette = class CommandPalette extends preact_min["Component"] {
	constructor(...args) {
		var _temp;

		return _temp = super(...args), this.state = { list: [], search: '', selectedIndex: 0 }, _temp;
	}

	componentDidUpdate(previousProps) {
		if (this.props.show && !previousProps.show) {
			this.state.search = '';

			this.isCommandMode = this.props.isCommandMode;
			if (this.isCommandMode) {
				this.setState({ search: '>' });
			}

			this.setState({
				list: this.getFilteredList()
			});
		}
	}

	getFilteredList(search = '') {
		const list = this.isCommandMode ? commands : this.props.files;
		return list.filter(item => item.name.toLowerCase().indexOf(this.isCommandMode ? search.substr(1) : search) !== -1);
	}

	keyDownHandler(e) {
		const diff = { [UP_KEY]: -1, [DOWN_KEY]: 1 }[e.which];
		if (diff) {
			this.setState({
				selectedIndex: (this.state.selectedIndex + diff) % this.state.list.length
			});
			return;
		}
		if (e.which === keyboardKeys_ENTER_KEY) {
			this.selectOption(this.state.list[this.state.selectedIndex]);
		}
	}
	inputHandler(e) {
		const search = e.target.value;
		this.setState({ search });
		this.isCommandMode = search.indexOf('>') === 0;
		this.setState({
			list: this.getFilteredList(search),
			selectedIndex: 0
		});
	}
	optionClickHandler(option) {
		this.selectOption(option);
	}
	selectOption(option) {
		commandPaletteService.publish(option.path ? SWITCH_FILE_EVENT : option.event, option);
		this.props.closeHandler();
	}
	render() {
		return Object(preact_min["h"])(
			Modal_Modal,
			{
				show: this.props.show,
				closeHandler: this.props.closeHandler,
				noOverlay: true,
				hideCloseButton: true
			},
			Object(preact_min["h"])(AutoFocusInput, {
				type: 'search',
				placeholder: 'Search',
				value: this.state.search,
				onInput: this.inputHandler.bind(this),
				onKeyUp: this.keyDownHandler.bind(this)
			}),
			Object(preact_min["h"])(
				'ul',
				{ 'class': 'command-palette__option-list' },
				this.state.list.map((item, index) => Object(preact_min["h"])(Row, {
					isSelected: this.state.selectedIndex === index,
					item: item,
					onClick: this.optionClickHandler.bind(this, item)
				}))
			)
		);
	}
};
// CONCATENATED MODULE: ./components/app.jsx
var app__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };


/* global htmlCodeEl, cssCodeEl, jsCodeEl, runBtn
 */













































if (false) {
	require('preact/debug');
}

const LocalStorageKeys = {
	LOGIN_AND_SAVE_MESSAGE_SEEN: 'loginAndsaveMessageSeen',
	ASKED_TO_IMPORT_CREATIONS: 'askedToImportCreations'
};
const UNSAVED_WARNING_COUNT = 15;
const app_version = '3.6.1';

var app__ref = Object(preact_min["h"])(Alerts, null);

var app__ref2 = Object(preact_min["h"])(Login_Login, null);

var app__ref3 = Object(preact_min["h"])(Icons, null);

var app__ref4 = Object(preact_min["h"])(
	'form',
	{
		style: 'display:none;',
		action: 'https://codepen.io/pen/define',
		method: 'POST',
		target: '_blank',
		id: 'codepenForm'
	},
	Object(preact_min["h"])('input', {
		type: 'hidden',
		name: 'data',
		value: '{"title": "New Pen!", "html": "<div>Hello, World!</div>"}'
	})
);

let app_App = class App extends preact_min["Component"] {
	constructor() {
		super();
		this.AUTO_SAVE_INTERVAL = 15000; // 15 seconds
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
			isCommandPaletteOpen: false
		};
		this.state = app__extends({
			isSavedItemPaneOpen: false
		}, this.modalDefaultStates, {
			prefs: {},
			currentItem: {
				title: '',
				externalLibs: { js: '', css: '' }
			}
		});
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
			isMonacoEditorOn: false
		};
		this.prefs = {};

		index_cjs_default.a.auth().onAuthStateChanged(user => {
			this.setState({ isLoginModalOpen: false });
			if (user) {
				utils_log('You are -> ', user);
				alertsService.add('You are now logged in!');
				this.setState({ user });
				window.user = user;
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
				window.db.getUser(user.uid).then(customUser => {
					if (customUser) {
						const prefs = app__extends({}, this.state.prefs);
						app__extends(prefs, user.settings);
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

		db.local.get({
			layoutMode: 1,
			code: ''
		}, result => {
			this.toggleLayout(result.layoutMode);
			this.state.prefs.layoutMode = result.layoutMode;
			if (result.code) {
				lastCode = result.code;
			}
		});
		// Get synced `preserveLastCode` setting to get back last code (or not).
		db.getSettings(this.defaultSettings).then(result => {
			if (result.preserveLastCode && lastCode) {
				this.setState({ unsavedEditCount: 0 });

				// For web app environment we don't fetch item from localStorage,
				// because the item isn't stored in the localStorage.
				if (lastCode.id && window.IS_EXTENSION) {
					db.local.get(lastCode.id, itemResult => {
						if (itemResult[lastCode.id]) {
							utils_log('Load item ', lastCode.id);
							this.setCurrentItem(itemResult[lastCode.id]).then(() => this.refreshEditor());
						}
					});
				} else {
					utils_log('Load last unsaved item', lastCode);
					this.setCurrentItem(lastCode).then(() => this.refreshEditor());
				}
			} else {
				this.createNewItem();
			}
			app__extends(this.state.prefs, result);
			this.setState({ prefs: app__extends({}, this.state.prefs) });
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
					trackEvent('ui', 'onboardModalSeen', app_version);
					document.cookie = 'onboarded=1';
				}
				window.db.setUserLastSeenVersion(app_version);
				// set some initial preferences on closing the onboard modal
				// Old onboarding.
				//once(document, 'overlaysClosed', function() {});
			}
			// If its an upgrade
			if (lastSeenVersion && semverCompare(lastSeenVersion, app_version) === -1 && !window.localStorage.pledgeModalSeen) {
				this.openSupportDeveloperModal();
				window.localStorage.pledgeModalSeen = true;
			}

			if (!lastSeenVersion || semverCompare(lastSeenVersion, app_version) === -1) {
				this.setState({ hasUnseenChangelog: true });
				this.hasSeenNotifications = false;
			}
		});
	}

	getLanguageDefinition() {
		// console.log('🇯🇲 fetching defninition');
		const { lang } = this.state.prefs;
		if (!lang || lang === 'en') {
			return {};
		} else if (lang === 'hi') {
			const def = __webpack_require__("yQJS");

			return { hi: def.default };
		} else if (lang === 'ja') {
			const def = __webpack_require__("xDmN");

			return { ja: def.default };
		}
	}

	incrementUnsavedChanges() {
		this.setState({ unsavedEditCount: this.state.unsavedEditCount + 1 });

		if (this.state.unsavedEditCount % UNSAVED_WARNING_COUNT === 0 && this.state.unsavedEditCount >= UNSAVED_WARNING_COUNT) {
			window.saveBtn.classList.add('animated');
			window.saveBtn.classList.add('wobble');
			window.saveBtn.addEventListener('animationend', () => {
				window.saveBtn.classList.remove('animated');
				window.saveBtn.classList.remove('wobble');
			});
		}
	}

	updateProfileUi() {
		if (this.state.user) {
			document.body.classList.add('is-logged-in');
		} else {
			document.body.classList.remove('is-logged-in');
		}
	}

	refreshEditor() {
		this.toggleLayout(this.state.currentItem.layoutMode || this.state.prefs.layoutMode);
		this.updateExternalLibCount();
		this.contentWrap.refreshEditor();
	}
	// Creates a new item with passed item's contents
	forkItem(sourceItem) {
		if (this.state.unsavedEditCount) {
			var shouldDiscard = confirm('You have unsaved changes in your current work. Do you want to discard unsaved changes and continue?');
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
	createNewItem(isFileMode = false, files) {
		const d = new Date();
		let item = {
			title: 'Untitled ' + d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getHours() + ':' + d.getMinutes(),
			createdOn: +d,
			content: ''
		};
		if (isFileMode) {
			item = app__extends({}, item, {
				files: assignFilePaths(files || [{
					name: 'index.html',
					content: 'hello\n<link rel="stylesheet" href="styles/style.css">\n<script src="script.js"></script>'
				}, {
					name: 'styles',
					isFolder: true,
					children: [{ name: 'style.css', content: '' }]
				}, { name: 'script.js', content: '' }, {
					name: 'tempo',
					isFolder: true,
					children: [{ name: 'main.css', content: '' }]
				}])
			});
		} else {
			item = app__extends({}, item, {
				html: '',
				css: '',
				js: '',
				externalLibs: { js: '', css: '' },
				layoutMode: this.state.currentLayoutMode
			});
		}
		this.setCurrentItem(item).then(() => this.refreshEditor());
		alertsService.add('New item created');
	}
	openItem(item) {
		this.setCurrentItem(item).then(() => this.refreshEditor());
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
			savedItems: app__extends({}, this.state.savedItems)
		});

		trackEvent('fn', 'itemRemoved');
	}
	setCurrentItem(item) {
		const d = deferred();
		// TODO: remove later
		if (!item.files) {
			item.htmlMode = item.htmlMode || this.state.prefs.htmlMode || HtmlModes.HTML;
			item.cssMode = item.cssMode || this.state.prefs.cssMode || CssModes.CSS;
			item.jsMode = item.jsMode || this.state.prefs.jsMode || JsModes.JS;
		}

		this.setState({ currentItem: item }, d.resolve);

		// Reset auto-saving flag
		this.isAutoSavingEnabled = false;

		// Reset unsaved count, in UI also.
		this.setState({ unsavedEditCount: 0 });
		return d.promise;
	}
	saveBtnClickHandler() {
		trackEvent('ui', 'saveBtnClick', this.state.currentItem.id ? 'saved' : 'new');
		this.saveItem();
	}

	populateItemsInSavedPane(items) {
		// TODO: sort desc. by updation date
		this.setState({
			savedItems: app__extends({}, this.state.savedItems)
		});

		this.toggleSavedItemsPane();
		// HACK: Set overflow after sometime so that the items can animate without getting cropped.
		// setTimeout(() => $('#js-saved-items-wrap').style.overflowY = 'auto', 1000);
	}
	toggleSavedItemsPane(shouldOpen) {
		this.setState({
			isSavedItemPaneOpen: shouldOpen === undefined ? !this.state.isSavedItemPaneOpen : shouldOpen
		});

		if (this.state.isSavedItemPaneOpen) {
			window.searchInput.focus();
		} else {
			window.searchInput.value = '';
		}
		document.body.classList[this.state.isSavedItemPaneOpen ? 'add' : 'remove']('overlay-visible');
	}

	/**
  * Fetches all items from storage
  * @param  {boolean} shouldSaveGlobally Whether to store the fetched items in global arr for later use.
  * @return {promise}                    Promise.
  */
	async fetchItems(shouldSaveGlobally, shouldFetchLocally) {
		var d = deferred();
		// HACK: This empty assignment is being used when importing locally saved items
		// to cloud, `fetchItems` runs once on account login which clears the
		// savedItems object and hence, while merging no saved item matches with itself.
		this.state.savedItems = {};
		var items = [];
		if (window.user && !shouldFetchLocally) {
			items = await itemService.getAllItems();
			utils_log('got items');
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
			if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.keyCode === 53) {
				event.preventDefault();
				this.contentWrap.setPreviewContent(true, true);
				trackEvent('ui', 'previewKeyboardShortcut');
			} else if ((event.ctrlKey || event.metaKey) && event.keyCode === 79) {
				// Ctrl/⌘ + O
				event.preventDefault();
				this.openSavedItemsPane();
				trackEvent('ui', 'openCreationKeyboardShortcut');
			} else if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.keyCode === 191) {
				// Ctrl/⌘ + Shift + ?
				event.preventDefault();
				this.setState({
					isKeyboardShortcutsModalOpen: !this.state.isKeyboardShortcutsModalOpen
				});
				trackEvent('ui', 'showKeyboardShortcutsShortcut');
			} else if (event.keyCode === 27 && event.target.tagName !== 'INPUT') {
				// We might be listening on keydown for some input inside the app. In that case
				// we don't want this to trigger which in turn focuses back the last editor.
				this.closeSavedItemsPane();
			} else if ((event.ctrlKey || event.metaKey) && event.keyCode === 80) {
				this.setState({
					isCommandPaletteOpen: true,
					isCommandPaletteInCommandMode: !!event.shiftKey
				});
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
			commandPaletteService.subscribe(eventName, commandPalleteHooks[eventName]);
		}
	}

	closeAllOverlays() {
		if (this.state.isSavedItemPaneOpen) {
			this.closeSavedItemsPane();
		}

		this.setState(app__extends({}, this.modalDefaultStates));
	}
	onExternalLibChange(newValues) {
		utils_log('onExternalLibChange');
		this.state.currentItem.externalLibs = {
			js: newValues.js,
			css: newValues.css
		};
		this.updateExternalLibCount();
		this.setState({
			currentItem: app__extends({}, this.state.currentItem)
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
		noOfExternalLibs += this.state.currentItem.externalLibs.js.split('\n').filter(lib => !!lib).length;
		noOfExternalLibs += this.state.currentItem.externalLibs.css.split('\n').filter(lib => !!lib).length;
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
		this.saveSetting('layoutMode', layoutId);
		trackEvent('ui', 'toggleLayoutClick', layoutId);
		this.toggleLayout(layoutId);
	}

	// Calculates the sizes of html, css & js code panes.
	getCodePaneSizes() {
		var sizes;
		const currentLayoutMode = this.state.currentLayoutMode;
		var dimensionProperty = currentLayoutMode === 2 || currentLayoutMode === 5 ? 'width' : 'height';
		try {
			sizes = [htmlCodeEl.style[dimensionProperty], cssCodeEl.style[dimensionProperty], jsCodeEl.style[dimensionProperty]];
		} catch (e) {
			sizes = [33.33, 33.33, 33.33];
		} finally {
			/* eslint-disable no-unsafe-finally */
			return sizes;

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

			sizes = [getPercentFromDimension($('#js-sidebar')), getPercentFromDimension($('#js-code-side')), getPercentFromDimension($('#js-demo-side'))];

			// Check if anything was returned falsy, reset in that case
			if (sizes.filter(s => s).length !== 3) {
				sizes = [`${sidebarWidth}px`, `calc(50% - ${sidebarWidth / 2}px)`, `calc(50% - ${sidebarWidth / 2}px)`];
			}
			return sizes;
		}

		const currentLayoutMode = this.state.currentLayoutMode;
		var dimensionProperty = currentLayoutMode === 2 ? 'height' : 'width';
		sizes = [getPercentFromDimension($('#js-code-side'), dimensionProperty), getPercentFromDimension($('#js-demo-side'), dimensionProperty)];

		if (sizes.filter(s => s).length !== 2) {
			sizes = [50, 50];
		}
		return sizes;
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

		utils_log('saving key', key || currentItem.id, currentItem);

		function onSaveComplete() {
			if (window.user && !navigator.onLine) {
				alertsService.add('Item saved locally. Will save to account when you are online.');
			} else {
				alertsService.add('Item saved.');
			}
			this.setState({ unsavedEditCount: 0 });
		}

		return itemService.setItem(key || currentItem.id, currentItem).then(onSaveComplete.bind(this));
	}

	// Save current item to storage
	saveItem() {
		if (!window.user && !window.localStorage[LocalStorageKeys.LOGIN_AND_SAVE_MESSAGE_SEEN]) {
			const answer = confirm('Saving without signing in will save your work only on this machine and this browser. If you want it to be secure & available anywhere, please login in your account and then save.\n\nDo you still want to continue saving locally?');
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
		this.state.currentItem.id = this.state.currentItem.id || 'item-' + generateRandomId();
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
		const item = app__extends({}, this.state.currentItem);
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
		this.state.currentItem.title = e.target.value;

		if (this.state.currentItem.id) {
			this.saveItem();
			trackEvent('ui', 'titleChanged');
		}
	}

	/**
  * Handles all user triggered preference changes in the UI.
  */
	updateSetting(settingName, value) {
		// If this was triggered from user interaction, save the setting
		if (settingName) {
			// var settingName = e.target.dataset.setting;
			var obj = {};
			utils_log(settingName, value);
			const prefs = app__extends({}, this.state.prefs);
			prefs[settingName] = value;
			obj[settingName] = prefs[settingName];
			this.setState({ prefs });

			// We always save locally so that it gets fetched
			// faster on future loads.
			db.sync.set(obj, function () {
				alertsService.add('Setting saved');
			});
			if (window.user) {
				window.db.getDb().then(remoteDb => {
					remoteDb.collection('users').doc(window.user.uid).update({
						[`settings.${settingName}`]: this.state.prefs[settingName]
					}).then(arg => {
						utils_log(`Setting "${settingName}" for user`, arg);
					}).catch(error => utils_log(error));
				});
			}
			trackEvent('ui', 'updatePref-' + settingName, prefs[settingName]);
		}

		const prefs = this.state.prefs;
		// Show/hide RUN button based on autoPreview setting.
		runBtn.classList[prefs.autoPreview ? 'add' : 'remove']('hide');

		this.contentWrap.applyCodemirrorSettings(this.state.prefs);

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

		document.body.classList[prefs.lightVersion ? 'add' : 'remove']('light-version');
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
			var shouldDiscard = confirm('You have unsaved changes. Do you still want to logout?');
			if (!shouldDiscard) {
				return;
			}
		}
		trackEvent('fn', 'loggedOut');
		auth.logout();
		this.setState({ isProfileModalOpen: false });
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
			var shouldDiscard = confirm('You have unsaved changes. Do you still want to create something new?');
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
	detachedPreviewBtnHandler() {
		trackEvent('ui', 'detachPreviewBtnClick');

		this.contentWrap.detachPreview();
	}
	notificationsBtnClickHandler() {
		this.setState({ isNotificationsModalOpen: true });

		if (this.state.isNotificationsModalOpen && !this.hasSeenNotifications) {
			this.hasSeenNotifications = true;
			this.setState({ hasUnseenChangelog: false });
			window.db.setUserLastSeenVersion(app_version);
		}
		trackEvent('ui', 'notificationButtonClick', app_version);
		return false;
	}
	codepenBtnClickHandler(e) {
		if (this.state.currentItem.cssMode === CssModes.ACSS) {
			alert("Oops! CodePen doesn't supports Atomic CSS currently. \nHere is something you can still do -> https://medium.com/web-maker/sharing-your-atomic-css-work-on-codepen-a402001b26ab");
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

			css_external: this.state.currentItem.externalLibs.css.split('\n').join(';'),
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
				var fileName = ['web-maker-export', d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()].join('-');
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

	mergeImportedItems(items) {
		var existingItemIds = [];
		var toMergeItems = {};
		const d = deferred();
		const { savedItems } = this.state;
		items.forEach(item => {
			// We can access `savedItems` here because this gets set when user
			// opens the saved creations panel. And import option is available
			// inside the saved items panel.
			// HACK: Also when this fn is called for importing locally saved items
			// to cloud, `fetchItems` runs once on account login which clears the
			// savedItems object and hence, no match happens for `existingItemIds`.
			if (savedItems[item.id]) {
				// Item already exists
				existingItemIds.push(item.id);
			} else {
				utils_log('merging', item.id);
				toMergeItems[item.id] = item;
			}
		});
		var mergedItemCount = items.length - existingItemIds.length;
		if (existingItemIds.length) {
			var shouldReplace = confirm(existingItemIds.length + ' creations already exist. Do you want to replace them?');
			if (shouldReplace) {
				utils_log('shouldreplace', shouldReplace);
				items.forEach(item => {
					toMergeItems[item.id] = item;
				});
				mergedItemCount = items.length;
			}
		}
		if (mergedItemCount) {
			itemService.saveItems(toMergeItems).then(() => {
				d.resolve();
				alertsService.add(mergedItemCount + ' creations imported successfully.');
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
		this.mergeImportedItems(this.oldSavedItems).then(() => {
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

	splitUpdateHandler(mainSplitInstance, codeSplitInstance) {
		// Not using setState to avoid re-render
		this.state.currentItem.sizes = this.getCodePaneSizes();
		this.state.currentItem.mainSizes = this.getMainPaneSizes();
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
					return length + nonAscii + Math.max(0, options.lineBreaks * (lineBreaks - 1));
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

				return (plainText ? count : '<strong>' + count + '</strong>') + ' ' + level + 'B';
			}
		};

		return ByteSize.count(text);
	}
	getExternalLibCode() {
		const item = this.state.currentItem;
		var libs = item.externalLibs && item.externalLibs.js || '';
		libs += '\n' + item.externalLibs && item.externalLibs.css || '';
		libs = libs.split('\n').filter(lib => lib);
		return libs.map(lib => fetch(lib).then(res => res.text()).then(data => {
			return {
				code: data,
				fileName: getFilenameFromUrl(lib)
			};
		}));
	}
	calculateCodeSize() {
		const item = this.state.currentItem;
		var htmlPromise = computeHtml(item.html, item.htmlMode);
		var cssPromise = computeCss(item.css, item.cssMode);
		var jsPromise = computeJs(item.js, item.jsMode, false);
		Promise.all([htmlPromise, cssPromise, jsPromise, ...this.getExternalLibCode()]).then(result => {
			var html = result[0].code || '',
			    css = result[1].code || '',
			    js = result[2].code || '';

			var fileContent = getCompleteHtml(html, css, js, item, true);

			// Replace external lib urls with local relative urls (picked from zip)
			fileContent = fileContent.replace(/<script src="(.*\/)([^/<]*?)"/g, '<script src="$2"');

			var zip = new jszip_lib_default.a();
			zip.file('index.html', fileContent);
			for (let i = 3; i < result.length; i++) {
				const externalLib = result[i];
				zip.file(externalLib.fileName, externalLib.code);
			}

			// console.log('ORIGINAL', this.calculateTextSize(fileContent));

			var promise = null;
			if (false) {
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
		this.createNewItem(true);
		this.setState({ isCreateNewModalOpen: false });
	}

	templateSelectHandler(template) {
		fetch(`templates/template-${template.id}.json`).then(res => res.json()).then(json => {
			this.forkItem(json);
		});
		this.setState({ isCreateNewModalOpen: false });
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
			newEntry = app__extends({}, newEntry, {
				isFolder: true,
				children: [],
				isCollapsed: true
			});
		}
		let currentItem = app__extends({}, this.state.currentItem, {
			files: [...this.state.currentItem.files, newEntry]
		});
		assignFilePaths(currentItem.files);

		this.setState({ currentItem });
		this.incrementUnsavedChanges();
	}
	removeFileHandler(filePath) {
		const currentItem = app__extends({}, this.state.currentItem, {
			files: [...this.state.currentItem.files]
		});
		removeFileAtPath(currentItem.files, filePath);

		this.setState({ currentItem });
		this.incrementUnsavedChanges();
	}
	renameFileHandler(oldFilePath, newFileName) {
		const currentItem = app__extends({}, this.state.currentItem, {
			files: [...this.state.currentItem.files]
		});
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
			alert(`File with name "${file.name}" already exists in the destination folder.`);
			return;
		}

		if (file) {
			destinationFolder.children.push(file);
			removeFileAtPath(currentItem.files, sourceFilePath);
			currentItem = app__extends({}, currentItem, {
				files: [...currentItem.files]
			});
			assignFilePaths(currentItem.files);

			this.setState({ currentItem });
			this.incrementUnsavedChanges();
		}
	}

	folderSelectHandler(folder) {
		// Following will make the change in the existing currentItem
		folder.isCollapsed = !folder.isCollapsed;

		const currentItem = app__extends({}, this.state.currentItem, {
			files: [...this.state.currentItem.files]
		});
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

	prettifyHandler(selectedFile) {
		const currentItem = app__extends({}, this.state.currentItem, {
			files: [...this.state.currentItem.files]
		});
		prettify({ file: selectedFile }).then(formattedContent => {
			if (formattedContent !== selectedFile.content) {
				selectedFile.content = formattedContent;
				this.incrementUnsavedChanges();
				this.setState({ currentItem });
			}
		});
	}

	render() {
		return Object(preact_min["h"])(
			react["I18nProvider"],
			{
				language: this.state.prefs.lang,
				catalogs: this.getLanguageDefinition()
			},
			Object(preact_min["h"])(
				'div',
				{ 'class': this.getRootClasses() },
				Object(preact_min["h"])(
					'div',
					{ 'class': 'main-container' },
					Object(preact_min["h"])(MainHeader, {
						externalLibCount: this.state.externalLibCount,
						openBtnHandler: this.openBtnClickHandler.bind(this),
						newBtnHandler: this.newBtnClickHandler.bind(this),
						saveBtnHandler: this.saveBtnClickHandler.bind(this),
						loginBtnHandler: this.loginBtnClickHandler.bind(this),
						profileBtnHandler: this.profileBtnClickHandler.bind(this),
						addLibraryBtnHandler: this.openAddLibrary.bind(this),
						runBtnClickHandler: this.runBtnClickHandler.bind(this),
						isFetchingItems: this.state.isFetchingItems,
						isSaving: this.state.isSaving,
						title: this.state.currentItem.title,
						titleInputBlurHandler: this.titleInputBlurHandler.bind(this),
						user: this.state.user,
						unsavedEditCount: this.state.unsavedEditCount,
						isFileMode: this.state.currentItem && this.state.currentItem.files
					}),
					this.state.currentItem && this.state.currentItem.files ? Object(preact_min["h"])(ContentWrapFiles_ContentWrapFiles, {
						currentItem: this.state.currentItem,
						onCodeChange: this.onCodeChange.bind(this),
						onCodeSettingsChange: this.onCodeSettingsChange.bind(this),
						onCodeModeChange: this.onCodeModeChange.bind(this),
						onRef: comp => this.contentWrap = comp,
						prefs: this.state.prefs,
						onEditorFocus: this.editorFocusHandler.bind(this),
						onSplitUpdate: this.splitUpdateHandler.bind(this),
						onAddFile: this.addFileHandler.bind(this),
						onRemoveFile: this.removeFileHandler.bind(this),
						onRenameFile: this.renameFileHandler.bind(this),
						onFileDrop: this.fileDropHandler.bind(this),
						onFolderSelect: this.folderSelectHandler.bind(this),
						onPrettifyBtnClick: this.prettifyHandler.bind(this)
					}) : Object(preact_min["h"])(ContentWrap_ContentWrap, {
						currentLayoutMode: this.state.currentLayoutMode,
						currentItem: this.state.currentItem,
						onCodeChange: this.onCodeChange.bind(this),
						onCodeSettingsChange: this.onCodeSettingsChange.bind(this),
						onCodeModeChange: this.onCodeModeChange.bind(this),
						onRef: comp => this.contentWrap = comp,
						prefs: this.state.prefs,
						onEditorFocus: this.editorFocusHandler.bind(this),
						onSplitUpdate: this.splitUpdateHandler.bind(this)
					}),
					Object(preact_min["h"])(Footer_Footer, {
						prefs: this.state.prefs,
						layoutBtnClickHandler: this.layoutBtnClickHandler.bind(this),
						helpBtnClickHandler: () => this.setState({ isHelpModalOpen: true }),
						settingsBtnClickHandler: this.openSettings.bind(this),
						notificationsBtnClickHandler: this.notificationsBtnClickHandler.bind(this),
						supportDeveloperBtnClickHandler: this.supportDeveloperBtnClickHandler.bind(this),
						detachedPreviewBtnHandler: this.detachedPreviewBtnHandler.bind(this),
						codepenBtnClickHandler: this.codepenBtnClickHandler.bind(this),
						saveHtmlBtnClickHandler: this.saveHtmlBtnClickHandler.bind(this),
						keyboardShortcutsBtnClickHandler: this.openKeyboardShortcuts.bind(this),
						screenshotBtnClickHandler: this.screenshotBtnClickHandler.bind(this),
						onJs13KHelpBtnClick: this.js13KHelpBtnClickHandler.bind(this),
						onJs13KDownloadBtnClick: this.js13KDownloadBtnClickHandler.bind(this),
						hasUnseenChangelog: this.state.hasUnseenChangelog,
						codeSize: this.state.codeSize
					})
				),
				Object(preact_min["h"])(SavedItemPane_SavedItemPane, {
					items: this.state.savedItems,
					isOpen: this.state.isSavedItemPaneOpen,
					closeHandler: this.closeSavedItemsPane.bind(this),
					itemClickHandler: this.itemClickHandler.bind(this),
					itemRemoveBtnClickHandler: this.itemRemoveBtnClickHandler.bind(this),
					itemForkBtnClickHandler: this.itemForkBtnClickHandler.bind(this),
					exportBtnClickHandler: this.exportBtnClickHandler.bind(this),
					mergeImportedItems: this.mergeImportedItems.bind(this)
				}),
				app__ref,
				Object(preact_min["h"])(
					Modal_Modal,
					{
						show: this.state.isAddLibraryModalOpen,
						closeHandler: () => this.setState({ isAddLibraryModalOpen: false })
					},
					Object(preact_min["h"])(AddLibrary_AddLibrary, {
						js: this.state.currentItem.externalLibs ? this.state.currentItem.externalLibs.js : '',
						css: this.state.currentItem.externalLibs ? this.state.currentItem.externalLibs.css : '',
						onChange: this.onExternalLibChange.bind(this)
					})
				),
				Object(preact_min["h"])(
					Modal_Modal,
					{
						show: this.state.isNotificationsModalOpen,
						closeHandler: () => this.setState({ isNotificationsModalOpen: false })
					},
					Object(preact_min["h"])(Notifications, {
						onSupportBtnClick: this.openSupportDeveloperModal.bind(this)
					})
				),
				Object(preact_min["h"])(
					Modal_Modal,
					{
						extraClasses: 'modal--settings',
						show: this.state.isSettingsModalOpen,
						closeHandler: () => this.setState({ isSettingsModalOpen: false })
					},
					Object(preact_min["h"])(Settings_Settings, {
						prefs: this.state.prefs,
						onChange: this.updateSetting.bind(this)
					})
				),
				Object(preact_min["h"])(
					Modal_Modal,
					{
						extraClasses: 'login-modal',
						show: this.state.isLoginModalOpen,
						closeHandler: () => this.setState({ isLoginModalOpen: false })
					},
					app__ref2
				),
				Object(preact_min["h"])(
					Modal_Modal,
					{
						show: this.state.isProfileModalOpen,
						closeHandler: () => this.setState({ isProfileModalOpen: false })
					},
					Object(preact_min["h"])(Profile, {
						user: this.state.user,
						logoutBtnHandler: this.logout.bind(this)
					})
				),
				Object(preact_min["h"])(HelpModal, {
					show: this.state.isHelpModalOpen,
					closeHandler: () => this.setState({ isHelpModalOpen: false }),
					onSupportBtnClick: this.openSupportDeveloperModal.bind(this),
					version: app_version
				}),
				Object(preact_min["h"])(SupportDeveloperModal, {
					show: this.state.isSupportDeveloperModalOpen,
					closeHandler: () => this.setState({ isSupportDeveloperModalOpen: false })
				}),
				Object(preact_min["h"])(KeyboardShortcutsModal, {
					show: this.state.isKeyboardShortcutsModalOpen,
					closeHandler: () => this.setState({ isKeyboardShortcutsModalOpen: false })
				}),
				Object(preact_min["h"])(AskToImportModal, {
					show: this.state.isAskToImportModalOpen,
					closeHandler: () => this.setState({ isAskToImportModalOpen: false }),
					oldSavedCreationsCount: this.oldSavedCreationsCount,
					importBtnClickHandler: this.importCreationsAndSettingsIntoApp.bind(this),
					dontAskBtnClickHandler: this.dontAskToImportAnymore.bind(this)
				}),
				Object(preact_min["h"])(OnboardingModal, {
					show: this.state.isOnboardModalOpen,
					closeHandler: () => this.setState({ isOnboardModalOpen: false })
				}),
				Object(preact_min["h"])(Js13KModal, {
					show: this.state.isJs13KModalOpen,
					closeHandler: () => this.setState({ isJs13KModalOpen: false })
				}),
				Object(preact_min["h"])(CreateNewModal_CreateNewModal, {
					show: this.state.isCreateNewModalOpen,
					closeHandler: () => this.setState({ isCreateNewModalOpen: false }),
					onBlankTemplateSelect: this.blankTemplateSelectHandler.bind(this),
					onBlankFileTemplateSelect: this.blankFileTemplateSelectHandler.bind(this),
					onTemplateSelect: this.templateSelectHandler.bind(this),
					onImportGithubRepoSelect: this.importGithubRepoSelectHandler.bind(this)
				}),
				Object(preact_min["h"])(CommandPalette_CommandPalette, {
					show: this.state.isCommandPaletteOpen,
					closeHandler: () => this.setState({ isCommandPaletteOpen: false }),
					files: linearizeFiles(this.state.currentItem.files || []),
					isCommandMode: this.state.isCommandPaletteInCommandMode,
					closeHandler: () => this.setState({ isCommandPaletteOpen: false })
				}),
				Object(preact_min["h"])(
					preact_portal_default.a,
					{ into: 'body' },
					Object(preact_min["h"])('div', {
						'class': 'modal-overlay',
						onClick: this.modalOverlayClickHandler.bind(this)
					})
				),
				app__ref3,
				app__ref4
			)
		);
	}
};

// CONCATENATED MODULE: ./index.js


/* harmony default export */ var index_0 = __webpack_exports__["default"] = (app_App);

/***/ }),

/***/ "mGGS":
/***/ (function(module, exports) {

/**
 * Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-env browser */

if ('serviceWorker' in navigator && location.protocol === 'https:' && location.href.indexOf('chrome-extension://') === -1 && location.href.indexOf('192.168') === -1) {
	// Delay registration until after the page has loaded, to ensure that our
	// precaching requests don't degrade the first visit experience.
	// See https://developers.google.com/web/fundamentals/instant-and-offline/service-worker/registration
	window.addEventListener('load', function () {
		// Your service-worker.js *must* be located at the top-level directory relative to your site.
		// It won't be able to control pages unless it's located at the same level or higher than them.
		// *Don't* register service worker file in, e.g., a scripts/ sub-directory!
		// See https://github.com/slightlyoff/ServiceWorker/issues/468
		navigator.serviceWorker.register('service-worker.js').then(function (reg) {
			// updatefound is fired if service-worker.js changes.
			reg.onupdatefound = function () {
				// The updatefound event implies that reg.installing is set; see
				// https://w3c.github.io/ServiceWorker/#service-worker-registration-updatefound-event
				var installingWorker = reg.installing;

				installingWorker.onstatechange = function () {
					/* eslint-disable default-case */
					switch (installingWorker.state) {
						case 'installed':
							if (navigator.serviceWorker.controller) {
								// At this point, the old content will have been purged and the fresh content will
								// have been added to the cache.
								// It's the perfect time to display a "New content is available; please refresh."
								// message in the page's interface.
								console.log('New or updated content is available.');
								if (window.alertsService) {
									window.alertsService.add('New version available. Please refresh the page.');
								}
							} else {
								// At this point, everything has been precached.
								// It's the perfect time to display a "Content is cached for offline use." message.
								console.log('Content is now available offline!');
								if (window.alertsService) {
									window.alertsService.add('Web Maker is now ready to be used offline.');
								}
							}
							break;

						case 'redundant':
							console.error('The installing service worker became redundant.');
							break;
					}
				};
			};
		}).catch(function (e) {
			console.error('Error during service worker registration:', e);
		});
	});
}

/***/ }),

/***/ "xDmN":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* eslint-disable *//* harmony default export */ __webpack_exports__["default"] = ({
	languageData: {
		plurals: function (n, ord) {
			if (ord) return 'other';
			return 'other';
		}
	},
	messages: {
		'Add a JS/CSS library': 'JS / CSS\u30E9\u30A4\u30D6\u30E9\u30EA\u3092\u8FFD\u52A0\u3059\u308B',
		'Add library': '\u30E9\u30A4\u30D6\u30E9\u30EA\u3092\u8FFD\u52A0',
		Console: '\u30B3\u30F3\u30BD\u30FC\u30EB',
		Login: '\u30ED\u30B0\u30A4\u30F3',
		New: '\u65B0\u3057\u3044',
		Open: '\u958B\u3044\u305F',
		Run: '\u8D70\u308B',
		Save: '\u4FDD\u5B58\u3059\u308B',
		Signup: '\u30B5\u30A4\u30F3\u30A2\u30C3\u30D7'
	}
});

/***/ }),

/***/ "yQJS":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* eslint-disable *//* harmony default export */ __webpack_exports__["default"] = ({
	languageData: {
		plurals: function (n, ord) {
			if (ord) return n == 1 ? 'one' : n == 2 || n == 3 ? 'two' : n == 4 ? 'few' : n == 6 ? 'many' : 'other';
			return n >= 0 && n <= 1 ? 'one' : 'other';
		}
	},
	messages: {
		'Add a JS/CSS library': 'JS/CSS \u0932\u093E\u0907\u092C\u094D\u0930\u0947\u0930\u0940 \u091C\u094B\u0921\u093C\u0947\u0902',
		'Add library': '\u0932\u093E\u0907\u092C\u094D\u0930\u0947\u0930\u0940 \u091C\u094B\u0921\u093C\u0947\u0902',
		Console: '\u0915\u0902\u0938\u094B\u0932',
		Login: '\u0932\u094B\u0917\u093F\u0928 \u0915\u0930\u0947\u0902',
		New: '\u0928\u092F\u0940 \u092C\u0928\u093E\u090F\u0901',
		Open: '\u0916\u094B\u0932\u0947\u0902',
		Run: '\u091A\u0932\u093E\u090F\u0901',
		Save: '\u0938\u0947\u0935 \u0915\u0930\u0947\u0902',
		Signup: '\u0938\u093E\u0907\u0928\u0905\u092A \u0915\u0930\u0947\u0902'
	}
});

/***/ })

},["pwNi"]);