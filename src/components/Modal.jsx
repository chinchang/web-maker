import { h, Component } from 'preact';
import Portal from 'preact-portal';

export default class Modal extends Component {
	componentDidMount() {
		window.addEventListener('keydown', this.onKeyDownHandler.bind(this));
	}
	componentWillUnmount() {
		window.removeEventListener('keydown', this.onKeyDownHandler.bind(this));
		if (this.focusGrabber) {
			this.focusGrabber.remove();
			this.focusGrabber = null;
		}
	}
	onKeyDownHandler(e) {
		if (e.keyCode === 27) {
			this.props.closeHandler();
		}
	}
	onOverlayClick(e) {
		if (e.target === this.overlayEl) {
			this.props.closeHandler();
		}
	}
	componentDidUpdate(prevProps) {
		if (this.props.show !== prevProps.show) {
			if (!this.props.noOverlay) {
				document.body.classList[this.props.show ? 'add' : 'remove'](
					'overlay-visible'
				);
			}
			if (this.props.show) {
				// HACK: refs will evaluate on next tick due to portals
				setTimeout(() => {
					const closeButton = this.overlayEl.querySelector(
						'.js-modal__close-btn'
					);
					if (closeButton) {
						closeButton.focus();
					}
				}, 0);

				/* We insert a dummy hidden input which will take focus as soon as focus
				escapes the modal, instead of focus going outside modal because modal
				is last focusable element. */
				this.focusGrabber = document.createElement('input');
				this.focusGrabber.setAttribute(
					'style',
					'height:0;opacity:0;overflow:hidden;width:0;'
				);
				setTimeout(() => {
					document.body.appendChild(this.focusGrabber);
				}, 10);
			} else {
				this.focusGrabber.remove();
				this.focusGrabber = null;
			}
		}
	}
	render() {
		if (!this.props.show) return null;

		return (
			<Portal into="body">
				<div
					role="dialog"
					class={`${this.props.extraClasses || ''} modal is-modal-visible ${
						this.props.small ? 'modal--small' : ''
					}`}
					ref={el => (this.overlayEl = el)}
					onClick={this.onOverlayClick.bind(this)}
				>
					<div class="modal__content">
						{this.props.hideCloseButton ? null : (
							<button
								type="button"
								onClick={this.props.closeHandler}
								aria-label="Close modal"
								title="Close"
								class="js-modal__close-btn modal__close-btn"
							>
								Close
							</button>
						)}
						{this.props.children}
					</div>
				</div>
			</Portal>
		);
	}
}
