window.addEventListener('message', e => {
	// Recieving from app window
	if (e.data && e.data.isCssOnly) {
		const frame = document.querySelector('iframe');
		if (
			frame.contentDocument &&
			frame.contentDocument.querySelector('#webmakerstyle')
		) {
			frame.contentDocument.querySelector('#webmakerstyle').textContent =
				e.data.css;
		}
	} else if (e.data && e.data.contents && e.data.contents.match(/<html/)) {
		const frame = document.querySelector('iframe');

		frame.src = frame.src;
		setTimeout(() => {
			frame.contentDocument.open();
			frame.contentDocument.write(e.data.contents);
			frame.contentDocument.close();
		}, 10);
	}
	// for files mode
	if (e.data && e.data.url && e.data.url.match(/index\.html/)) {
		document.querySelector('iframe').src = e.data.url;
	}

	// Forward expression evaluation to inner iframe
	if (e.data && e.data.exprToEval) {
		const frame = document.querySelector('iframe');
		frame.contentWindow.postMessage(e.data, '*');
	}

	// Recieving from preview iframe
	if (e.data && e.data.logs) {
		(window.opener || window.top).postMessage(e.data, '*');
	}
});
