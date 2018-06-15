// Console header drag resize logic
var consoleHeaderDragStartY;
var consoleInitialHeight;

function onConsoleHeaderDrag(e) {
	consoleEl.style.height =
		consoleInitialHeight + consoleHeaderDragStartY - e.pageY + 'px';
}
$('.js-console__header').addEventListener('mousedown', e => {
	consoleHeaderDragStartY = e.pageY;
	consoleInitialHeight = consoleEl.getBoundingClientRect().height;
	$('#demo-frame').classList.add('pointer-none');
	window.addEventListener('mousemove', onConsoleHeaderDrag);
});
$('.js-console__header').addEventListener('mouseup', () => {
	window.removeEventListener('mousemove', onConsoleHeaderDrag);
	$('#demo-frame').classList.remove('pointer-none');
});

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
