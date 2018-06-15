import { h, Component } from 'preact';

export default class Modal extends Component {
	componentDidMount() {
		window.addEventListener('keydown', this.onKeyDownHandler.bind(this));
	}
	componentWillUnmount() {
		window.removeEventListener('keydown', this.onKeyDownHandler.bind(this));
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
		document.body.classList[this.props.show ? 'add' : 'remove'](
			'overlay-visible'
		);

		if (this.props.show && !prevProps.show) {
			this.overlayEl.querySelector('.js-modal__close-btn').focus();
		}
	}
	render() {
		if (!this.props.show) return null;

		return (
			<div
				class={`${this.props.extraClasses || ''} modal is-modal-visible`}
				ref={el => (this.overlayEl = el)}
				onClick={this.onOverlayClick.bind(this)}
			>
				<div class="modal__content">
					<button
						type="button"
						onClick={this.props.closeHandler}
						aria-label="Close modal"
						title="Close"
						class="js-modal__close-btn  modal__close-btn"
					>
						Close
					</button>
					{this.props.children}
				</div>
			</div>
		);
	}
}
