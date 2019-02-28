window.addEventListener('message', e => {
	// Recieving from app window
	if (e.data && e.data.contents) {
		const frame = document.querySelector('iframe');
		frame.src = frame.src;
		setTimeout(() => {
			frame.contentDocument.open();
			frame.contentDocument.write(e.data.contents);
			frame.contentDocument.close();
		}, 10);
	}
	if (e.data && e.data.url) {
		document.querySelector('iframe').src = e.data.url;
	}

	// Recieving from preview iframe
	if (e.data && e.data.logs) {
		window.opener.postMessage(e.data, '*');
	}
});
