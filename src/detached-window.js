window.addEventListener('message', e => {
	document.querySelector('iframe').src = e.data;
});
