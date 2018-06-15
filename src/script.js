/**
 * Compiles directives on the given node
 * @param {Node} root The element on which compilation is required
 */
function compileNodes(root) {
	if (!(root instanceof Node)) {
		/* eslint-disable no-param-reassign */
		root = document;
		/* eslint-enable no-param-reassign */
	}
	// Create a querySelectorAll function bound to the passed `root` Node
	const query = selector => [...root.querySelectorAll(selector)];


	// Compile d-open-modal directive
	const modalTriggers = query(`[d-open-modal]`);
	modalTriggers.forEach(function (el) {
		utils.onButtonClick(el, function () {
			scope.toggleModal(window[el.getAttribute('d-open-modal')]);
			trackEvent(
				el.getAttribute('data-event-category'),
				el.getAttribute('data-event-action')
			);
		});
	});
}

function init() {
	new TextareaAutoComplete(externalJsTextarea, {
		filter: obj => obj.latest.match(/\.js$/)
	});
	new TextareaAutoComplete(externalCssTextarea, {
		filter: obj => obj.latest.match(/\.css$/)
	});
	new TextareaAutoComplete(externalLibrarySearchInput, {
		selectedCallback: value => {
			const textarea = value.match(/\.js$/) ?
				externalJsTextarea :
				externalCssTextarea;
			textarea.value = `${textarea.value}\n${value}`;
			externalLibrarySearchInput.value = '';
		}
	});

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
}
