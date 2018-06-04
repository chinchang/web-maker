window.addEventListener('message', e => {
	if (e.data && e.data.contents) {
		const frame = document.querySelector('iframe');
		frame.src = frame.src;
		setTimeout(() => {
			frame.contentDocument.open();
			frame.contentDocument.write(e.data.contents);
			frame.contentDocument.close();
		}, 10);
	} else {
		document.querySelector('iframe').src = e.data;
	}
});
