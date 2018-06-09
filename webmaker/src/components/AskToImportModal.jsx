import { h, Component } from 'preact';
import Modal from './Modal';

export default class AskToImportModal extends Component {
	render() {
		return (
			<Modal
				extraClasses="ask-to-import-modal"
				show={this.props.show}
				closeHandler={this.props.closeHandler}
			>
				<h2>Import your creations in your account</h2>

				<div>
					<p>
						You have <span>{this.props.oldSavedCreationsCount}</span> creations
						saved in your local machine. Do you want to import those creations
						in your account so they are more secure and accessible anywhere?
					</p>
					<p>
						It's okay if you don't want to. You can simply logout and access
						them anytime on this browser.
					</p>
					<div class="flex flex-h-end">
						<button d-click="dontAskToImportAnymore" class="btn">
							Don't ask me again
						</button>
						<button
							d-click="importCreationsAndSettingsIntoApp"
							class="btn btn--primary ml-1"
						>
							Yes, please import
						</button>
					</div>
				</div>
			</Modal>
		);
	}
}
