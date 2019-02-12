window.addEventListener('message', e => {
	// Web app
	if (e.data && e.data.contents && e.data.contents.match(/<html/)) {
		const frame = document.querySelector('iframe');
		frame.src = frame.src;
		setTimeout(() => {
			frame.contentDocument.open();
			frame.contentDocument.write(e.data.contents);
			frame.contentDocument.close();
		}, 10);
	} else if (e.data && e.data.match(/preview\.html/)) {
		// Chrome extension
		document.querySelector('iframe').src = e.data;
	}
});
