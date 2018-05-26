import { h, Component } from 'preact';

export default class Modal extends Component {
	componentDidMount() {
		window.addEventListener('keydown', this.onKeyDownHandler);
	}
	componentWillUnmount() {
		window.removeEventListener('keydown', this.onKeyDownHandler);
	}
	onKeyDownHandler(event) {
		if (event.keyCode === 27) {
			this.props.closeHandler();
		}
	}
	render() {
		if (!this.props.show) return null;

		return (
			<div class="modal is-modal-visible">
				<div class="modal__content">
					<button
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
