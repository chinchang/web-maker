const BASE_PATH = chrome.extension || window.DEBUG ? '/' : '/app';
const DEFAULT_PROFILE_IMG =
	"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='#ccc' d='M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z' /%3E%3C/svg%3E";



// Calculates the sizes of html, css & js code panes.
function getCodePaneSizes() {
	var sizes;
	var dimensionProperty =
		currentLayoutMode === 2 || currentLayoutMode === 5 ? 'width' : 'height';
	try {
		sizes = [
			htmlCode.style[dimensionProperty],
			cssCode.style[dimensionProperty],
			jsCode.style[dimensionProperty]
		];
	} catch (e) {
		sizes = [33.33, 33.33, 33.33];
	} finally {
		/* eslint-disable no-unsafe-finally */
		return sizes;

		/* eslint-enable no-unsafe-finally */
	}
}

// Calculates the current sizes of code & preview panes.
function getMainPaneSizes() {
	var sizes;
	var dimensionProperty = currentLayoutMode === 2 ? 'height' : 'width';
	try {
		sizes = [+$('#js-code-side').style[dimensionProperty].match(/([\d.]+)%/)[1], +$('#js-demo-side').style[dimensionProperty].match(/([\d.]+)%/)[1]];
	} catch (e) {
		sizes = [50, 50];
	} finally {
		/* eslint-disable no-unsafe-finally */
		return sizes;

		/* eslint-enable no-unsafe-finally */
	}
}



/**
 * Toggles a modal and logs an event.
 * @param  {Node} modal     modal to be toggled
 */
scope.toggleModal = function (modal) {


	if (hasOpened) {
		/* eslint-disable no-inner-declarations */
		function onTransitionEnd() {
			modal.querySelector('.js-modal__close-btn').focus();
			modal
				.querySelector('.modal__content')
				.removeEventListener('transitionend', onTransitionEnd);
		}
		/* eslint-enable no-inner-declarations */

		modal
			.querySelector('.modal__content')
			.addEventListener('transitionend', onTransitionEnd);
	}
};





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

	var lastCode;



	document.body.style.height = `${window.innerHeight}px`;




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
