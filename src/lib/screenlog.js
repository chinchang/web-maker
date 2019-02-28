let mainWindow = window.parent;

function sanitizeDomNode(node) {
	const fakeNode = {
		nodeName: node.nodeName,
		nodeType: node.nodeType,
		tagName: node.tagName,
		childNodes: [...node.childNodes].map(child => sanitizeDomNode(child)),
		textContent: node.textContent
	}
	if(node.attributes) {
		fakeNode.attributes = [...node.attributes].map(attribute => ({name:attribute.name, value:attribute.value}))
	}
	return fakeNode;
}
function sendLog(...args) {
	const sanitizedArgs = [...args].map(arg => {
		if(arg && arg instanceof HTMLElement) {
			return sanitizeDomNode(arg)
		}
		return arg;
	})
	mainWindow.postMessage({ logs: sanitizedArgs },"*");
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
	window.addEventListener('error', function() {
		genericLogger(_options.errorColor).call(null, arguments[0].error.stack);
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
	sendLog(result)
};
window.addEventListener('message', e => {
	if(e.data && e.data.exprToEval) {
		_wmEvaluate(e.data.exprToEval);
	}
})
