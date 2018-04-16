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

	// Safari doesn't have this!
	window.requestIdleCallback =
		window.requestIdleCallback ||
		function(fn) {
			setTimeout(fn, 10);
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
        var infoForEachLoop = [];
        var popupStatements = [];

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

                    infoForEachLoop.push({ start: start, end: end, varName: varPrefix + loopId });

					patches.push({ pos: start, str: prolog });
					patches.push({ pos: end, str: epilog });
					patches.push({
						pos: node.range[0],
						str: varStr.replace('%d', varPrefix + loopId)
					});
					++loopId;
					break;

                case 'ExpressionStatement':
                    [
                        "alert",
                        "confirm",
                        "prompt"
                    ].forEach(function(functionName){
                        if (node.expression.callee.name === functionName || (Object.prototype.hasOwnProperty.call(node.expression.callee, "object") && node.expression.callee.object.name === 'window' && node.expression.callee.property.name === functionName)){
                            popupStatements.push(node);
                        }
                    });
                    break;

				default:
					break;
			}
		});

        popupStatements.forEach(function(node){
            infoForEachLoop.forEach(function(loop){
                if (node.range[0]>=loop.start && node.range[0]<=loop.end){
                    patches.push({
                        pos: node.range[1],
                        str: '\n%d = Date.now();\n'.replace('%d', loop.varName)
                    });
                }
            });
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
		if (window.IS_EXTENSION) {
			chrome.downloads.download(
				{
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
		}
	}

	window.utils = {
		semverCompare,
		generateRandomId,
		onButtonClick,
		addInfiniteLoopProtection,
		getHumanDate,
		log,
		once,
		downloadFile
	};

	window.chrome = window.chrome || {};
	window.chrome.i18n = { getMessage: () => {} };

	window.IS_EXTENSION = !!window.chrome.extension;
	if (window.IS_EXTENSION) {
		document.body.classList.add('is-extension');
	} else {
		document.body.classList.add('is-app');
	}
})();
