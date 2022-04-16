import { h } from 'preact';
import { createPortal, useEffect, useRef } from 'preact/compat';

const Portal = ({ children, into }) => {
	const container = document.querySelector(into);
	return createPortal(children, container);
};

const Modal = ({
	show,
	extraClasses,
	small,
	hideCloseButton,
	closeHandler,
	noOverlay,
	children
}) => {
	const focusGrabberRef = useRef();
	const overlayRef = useRef();

	const onKeyDownHandler = e => {
		if (e.keyCode === 27) {
			closeHandler();
		}
	};
	const onOverlayClick = e => {
		if (e.target === overlayRef.current) {
			closeHandler();
		}
	};
	useEffect(() => {
		window.addEventListener('keydown', onKeyDownHandler);
		return () => {
			window.removeEventListener('keydown', onKeyDownHandler.bind(this));
			if (focusGrabberRef.current) {
				focusGrabberRef.current.remove();
				focusGrabberRef.current = null;
			}
		};
	}, []);

	useEffect(() => {
		if (!noOverlay) {
			document.body.classList[show ? 'add' : 'remove']('overlay-visible');
		}
		if (show) {
			// HACK: refs will evaluate on next tick due to portals
			setTimeout(() => {
				const closeButton = overlayRef.current.querySelector(
					'.js-modal__close-btn'
				);
				if (closeButton) {
					closeButton.focus();
				}
			}, 0);

			/* We insert a dummy hidden input which will take focus as soon as focus
			 * escapes the modal, instead of focus going outside modal because modal
			 * is last focusable element.
			 */
			focusGrabberRef.current = document.createElement('input');
			focusGrabberRef.current.setAttribute(
				'style',
				'height:0;opacity:0;overflow:hidden;width:0;'
			);
			setTimeout(() => {
				document.body.appendChild(focusGrabberRef.current);
			}, 10);
		} else {
			if (focusGrabberRef.current) {
				focusGrabberRef.current.remove();
				focusGrabberRef.current = null;
			}
		}
	}, [show]);

	if (!show) return null;

	return (
		<Portal into={`body`}>
			<div
				role="dialog"
				class={`${extraClasses || ''} modal is-modal-visible ${
					small ? 'modal--small' : ''
				}`}
				ref={overlayRef}
				onClick={onOverlayClick}
			>
				<div class="modal__content">
					{hideCloseButton ? null : (
						<button
							type="button"
							onClick={closeHandler}
							aria-label="Close modal"
							data-testid="closeModalButton"
							title="Close"
							class="js-modal__close-btn modal__close-btn"
						>
							Close
						</button>
					)}
					{children}
				</div>
			</div>
		</Portal>
	);
};

export default Modal;
