;(function () {

	editur = window.editur || {};

	var $ = document.querySelector.bind(document);
	var $all = document.querySelectorAll.bind(document);

	var updateTimer,
		updateDelay = 500,
		currentLayoutMode,
		frame = $('#demo-frame'),
		htmlCode = $('#js-html-code'),
		cssCode = $('#js-css-code'),
		jsCode = $('#js-js-code');
		layoutBtn1 = $('#js-layout-btn-1');
		layoutBtn2 = $('#js-layout-btn-2');
		layoutBtn3 = $('#js-layout-btn-3');


	editur.cm = {};
	editur.demoFrameDocument = frame.contentDocument || frame.contentWindow.document;

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
			direction: (currentLayoutMode === 2 ? 'horizontal' : 'vertical')
		});
		Split(['#js-code-side', '#js-demo-side' ], {
			direction: (currentLayoutMode === 2 ? 'vertical' : 'horizontal')
		});
	}
	window.toggleLayout = function (mode) {
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
	window.onunload = function () {
		// editur.saveContent(editur.cm.getValue());
	};

	editur.saveContent = function (content) {
		window.localStorage.editur = content;
	};

	editur.getLastSavedContent = function () {
		return window.localStorage.editur || "";
	};

	editur.setPreviewContent = function () {
		var self = this;
		var html = editur.cm.html.getValue();
		var css = editur.cm.css.getValue();
		var js = editur.cm.js.getValue();

		self.demoFrameDocument.open(html);
		self.demoFrameDocument.write(html);
		self.demoFrameDocument.close();

		var scriptTag = document.createElement('script');
		scriptTag.textContent = js;
		self.demoFrameDocument.body.appendChild(scriptTag);

		var styleTag = self.demoFrameDocument.head.children.namedItem('css');
		if (styleTag) {
			styleTag.textContent = content;
		}
		else {
			styleTag = document.createElement('style');
			styleTag.textContent = css;
			self.demoFrameDocument.head.appendChild(styleTag);
		}
	};

	function initEditor(element, options) {
		var cm = CodeMirror(element, {
			lineNumbers: true,
			mode: options.mode,
			lineWrapping: true,
			autofocus: options.autofocus || false,
			tabMode: 'indent',
			theme: 'monokai'
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
		autofocus: true
	});
	editur.cm.css = initEditor(cssCode, {
		mode: 'css'
	});
	editur.cm.js = initEditor(jsCode, {
		mode: 'javascript'
	});

	function init () {
		layoutBtn1.addEventListener('click', function () { saveSetting('layoutMode', 1); toggleLayout(1); });
		layoutBtn2.addEventListener('click', function () { saveSetting('layoutMode', 2); toggleLayout(2); });
		layoutBtn3.addEventListener('click', function () { saveSetting('layoutMode', 3); toggleLayout(3); });

		chrome.storage.local.get('layoutMode', function localGetCallback(result) {
			if (result.layoutMode) {
				toggleLayout(result.layoutMode);
			} else {
				toggleLayout(1);
			}
		});

		function attachResizeListners () {
			function mouseMoveListener (e) {
				ui.codeMirrorContainer.style.width = e.pageX + 'px';
			}
			ui.separator.on('mousedown', function mouseDownListener(e) {
				e.preventDefault();
				// stop events on iframe, so it doesnt interfere during mousemove
				ui.demoFrame.style.pointerEvents = 'none';
				document.on('mousemove', mouseMoveListener);
				document.on('mouseup', function mouseUpListener(e) {
					ui.demoFrame.style.pointerEvents = 'auto';
					document.removeEventListener('mousemove', mouseMoveListener);
					document.removeEventListener('mouseup', mouseUpListener);
					editur.cm.refresh();
					// trigger a redraw
					editur.setPreviewContent(editur.cm.getValue());
				});
			});
		}
		return;

		var content = editur.getLastSavedContent();

		// load demo content for new user
		if (!content) {
			var reqListener = function () {
				content = this.responseText;
				editur.cm.setValue(content);
				editur.cm.refresh();
				editur.setPreviewContent(content);
			};

			var oReq = new XMLHttpRequest();
			oReq.onload = reqListener;
			oReq.open("get", "demo.html", true);
			oReq.send();
		}
		// load saved content for returning user
		else {
			editur.setPreviewContent(content);
			editur.cm.setValue(content);
			editur.cm.refresh();
		}
	}

	init();

})();