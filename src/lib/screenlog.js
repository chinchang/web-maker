let mainWindow = window.parent === window ? window.opener : window.parent;

function sanitizeDomNode(node) {
	const fakeNode = {
		nodeName: node.nodeName,
		nodeType: node.nodeType,
		tagName: node.tagName,
		childNodes: [...node.childNodes].map(child => sanitizeDomNode(child)),
		textContent: node.textContent
	};
	if (node.attributes) {
		fakeNode.attributes = [...node.attributes].map(attribute => ({
			name: attribute.name,
			value: attribute.value
		}));
	}
	return fakeNode;
}

function sanitizeEvent(event) {
	const fakeEvent = {};

	// Doing this still does't show class name in inspector
	// fakeEvent.__proto__.constructor = event.constructor

	function isSerializable(thing) {
		try {
			JSON.stringify(thing);
		} catch (e) {
			return false;
		}
		return true;
	}
	const prohibitedKeys = ['srcElement', 'sourceCapabilities'];
	for (var key in event) {
		if (typeof event[key] === 'function' || prohibitedKeys.includes(key)) {
			continue;
		}

		if (
			event[key] instanceof HTMLElement ||
			event[key] instanceof HTMLHtmlElement
		) {
			fakeEvent[key] = sanitizeDomNode(event[key]);
			continue;
		} else if (event[key] instanceof Window) {
			fakeEvent[key] = 'Window';
			continue;
		} else if (event[key] instanceof Document) {
			fakeEvent[key] = 'Document';
			continue;
		}

		if (isSerializable(event[key])) {
			fakeEvent[key] = event[key];
		}
	}
	return fakeEvent;
}
// Deep-converts a value into something postMessage can clone. Functions,
// promises, symbols, DOM nodes etc. throw DataCloneError otherwise, which
// would break the user's code and drop the log.
function makeCloneable(value, seen = new WeakMap()) {
	const type = typeof value;
	if (type === 'function') {
		return `ƒ ${value.name || 'anonymous'}()`;
	}
	if (type === 'symbol') {
		return value.toString();
	}
	if (value === null || type !== 'object') {
		return value;
	}
	if (seen.has(value)) {
		return seen.get(value);
	}
	if (value instanceof Window) {
		return 'Window';
	}
	if (value instanceof Document) {
		return 'Document';
	}
	if (value instanceof Node) {
		return sanitizeDomNode(value);
	}
	if (value instanceof Event) {
		return sanitizeEvent(value);
	}
	if (value instanceof Promise) {
		return 'Promise {}';
	}
	if (
		value instanceof Date ||
		value instanceof RegExp ||
		value instanceof Error ||
		ArrayBuffer.isView(value) ||
		value instanceof ArrayBuffer
	) {
		return value;
	}
	if (value instanceof Map) {
		const copy = new Map();
		seen.set(value, copy);
		value.forEach((v, k) =>
			copy.set(makeCloneable(k, seen), makeCloneable(v, seen))
		);
		return copy;
	}
	if (value instanceof Set) {
		const copy = new Set();
		seen.set(value, copy);
		value.forEach(v => copy.add(makeCloneable(v, seen)));
		return copy;
	}
	if (
		Array.isArray(value) ||
		value instanceof NodeList ||
		value instanceof HTMLCollection
	) {
		const copy = [];
		seen.set(value, copy);
		for (let i = 0; i < value.length; i++) {
			copy.push(makeCloneable(value[i], seen));
		}
		return copy;
	}
	const copy = {};
	seen.set(value, copy);
	for (const key in value) {
		try {
			copy[key] = makeCloneable(value[key], seen);
		} catch (e) {
			// Some getters throw on access
		}
	}
	return copy;
}

function sendLog(...args) {
	const sanitizedArgs = [...args].map(arg => {
		if (arg && arg instanceof HTMLElement) {
			return sanitizeDomNode(arg);
		} else if (arg && arg instanceof Event) {
			return sanitizeEvent(arg);
		}
		return arg;
	});
	try {
		mainWindow.postMessage({ logs: sanitizedArgs }, '*');
	} catch (e) {
		mainWindow.postMessage(
			{ logs: sanitizedArgs.map(arg => makeCloneable(arg)) },
			'*'
		);
	}
}

(function() {
	var logEl,
		isInitialized = false,
		_console = {}; // backup console obj to contain references of overridden fns.
	_options = {
		bgColor: 'black',
		logColor: 'lightgreen',
		infoColor: 'blue',
		warnColor: 'orange',
		errorColor: 'red',
		freeConsole: false,
		css: '',
		autoScroll: true,
		proxyCallback: null,
		noUi: false
	};

	function createElement(tag, css) {
		var element = document.createElement(tag);
		element.style.cssText = css;
		return element;
	}

	function createPanel() {
		var div = createElement(
			'div',
			'z-index:2147483647;font-family:Helvetica,Arial,sans-serif;font-size:10px;font-weight:bold;padding:5px;text-align:left;opacity:0.8;position:fixed;right:0;top:0;min-width:200px;max-height:50vh;overflow:auto;background:' +
				_options.bgColor +
				';' +
				_options.css
		);
		return div;
	}

	function genericLogger(color) {
		return function() {
			if (_options.proxyCallback) {
				_options.proxyCallback.apply(null, arguments);
			}
			if (_options.noUi) {
				return;
			}
			var el = createElement(
				'div',
				'line-height:18px;min-height:18px;background:' +
					(logEl.children.length % 2 ? 'rgba(255,255,255,0.1)' : '') +
					';color:' +
					color
			); // zebra lines
			var val = [].slice.call(arguments).reduce(function(prev, arg) {
				return (
					prev + ' ' + (typeof arg === 'object' ? JSON.stringify(arg) : arg)
				);
			}, '');
			el.textContent = val;

			logEl.appendChild(el);

			// Scroll to last element, if autoScroll option is set.
			if (_options.autoScroll) {
				logEl.scrollTop = logEl.scrollHeight - logEl.clientHeight;
			}
		};
	}

	function clear() {
		if (_options.noUi) {
			mainWindow.clearConsole();
			return;
		}
		logEl.innerHTML = '';
	}

	function log() {
		return genericLogger(_options.logColor).apply(null, arguments);
	}

	function info() {
		return genericLogger(_options.infoColor).apply(null, arguments);
	}

	function warn() {
		return genericLogger(_options.warnColor).apply(null, arguments);
	}

	function error() {
		return genericLogger(_options.errorColor).apply(null, arguments);
	}

	function setOptions(options) {
		for (var i in options)
			if (options.hasOwnProperty(i) && _options.hasOwnProperty(i)) {
				_options[i] = options[i];
			}
	}

	function init(options) {
		if (isInitialized) {
			return;
		}

		isInitialized = true;

		if (options) {
			setOptions(options);
		}

		if (!_options.noUi) {
			logEl = createPanel();
			document.body.appendChild(logEl);
		}

		if (!_options.freeConsole) {
			// Backup actual fns to keep it working together
			_console.log = console.log;
			_console.clear = console.clear;
			_console.info = console.info;
			_console.warn = console.warn;
			_console.error = console.error;
			console.log = originalFnCallDecorator(log, 'log');
			console.clear = originalFnCallDecorator(clear, 'clear');
			console.info = originalFnCallDecorator(info, 'info');
			console.warn = originalFnCallDecorator(warn, 'warn');
			console.error = originalFnCallDecorator(error, 'error');
		}
	}

	function destroy() {
		isInitialized = false;
		console.log = _console.log;
		console.clear = _console.clear;
		console.info = _console.info;
		console.warn = _console.warn;
		console.error = _console.error;
		logEl.remove();
	}

	/**
	 * Checking if isInitialized is set
	 */
	function checkInitialized() {
		if (!isInitialized) {
			throw 'You need to call `screenLog.init()` first.';
		}
	}

	/**
	 * Decorator for checking if isInitialized is set
	 * @param  {Function} fn Fn to decorate
	 * @return {Function}      Decorated fn.
	 */
	function checkInitDecorator(fn) {
		return function() {
			checkInitialized();
			return fn.apply(this, arguments);
		};
	}

	/**
	 * Decorator for calling the original console's fn at the end of
	 * our overridden fn definitions.
	 * @param  {Function} fn Fn to decorate
	 * @param  {string} fn Name of original function
	 * @return {Function}      Decorated fn.
	 */
	function originalFnCallDecorator(fn, fnName) {
		return function() {
			fn.apply(this, arguments);
			if (typeof _console[fnName] === 'function') {
				_console[fnName].apply(console, arguments);
			}
		};
	}
	window.addEventListener('error', function(e) {
		// `error` is null for errors from cross-origin scripts
		genericLogger(_options.errorColor).call(
			null,
			e.error ? e.error.stack : e.message
		);
	});

	// Public API
	window.screenLog = {
		init: init,
		log: originalFnCallDecorator(checkInitDecorator(log), 'log'),
		clear: originalFnCallDecorator(checkInitDecorator(clear), 'clear'),
		info: originalFnCallDecorator(checkInitDecorator(clear), 'info'),
		warn: originalFnCallDecorator(checkInitDecorator(warn), 'warn'),
		error: originalFnCallDecorator(checkInitDecorator(error), 'error'),
		destroy: checkInitDecorator(destroy)
	};
})();
screenLog.init({
	noUi: true,
	proxyCallback: function(...args) {
		sendLog(...args);
	}
});
window._wmEvaluate = function _wmEvaluate(expr) {
	try {
		var result = eval(expr);
	} catch (e) {
		sendLog(e.stack || e.message);
		return;
	}
	sendLog(result);
};
window.addEventListener('message', e => {
	if (e.data && e.data.exprToEval) {
		_wmEvaluate(e.data.exprToEval);
	}
});