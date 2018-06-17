import { h, Component } from 'preact';
import Modal from './Modal';
import CodeMirrorBox from './CodeMirrorBox';

export default class CssSettingsModal extends Component {
	componentDidUpdate() {
		if (this.props.show) {
			setTimeout(() => {
				if (this.props.settings) {
					this.cm.setValue(this.props.settings.acssConfig);
				}

				// Refresh is required because codemirror gets scaled inside modal and loses alignement.
				this.cm.refresh();
				this.cm.focus();
			}, 500);
		}
	}
	render() {
		return (
			<Modal show={this.props.show} closeHandler={this.props.closeHandler}>
				<h1>Atomic CSS Settings</h1>
				<h3>
					Configure Atomizer settings.{' '}
					<a
						href="https://github.com/acss-io/atomizer#api"
						target="_blank"
						rel="noopener noreferrer"
					>
						Read more
					</a>{' '}
					about available settings.
				</h3>
				<div style="height: calc(100vh - 350px);">
					<CodeMirrorBox
						options={{
							mode: 'application/ld+json',
							theme: this.props.editorTheme
						}}
						onCreation={cm => (this.cm = cm)}
						onBlur={cm => this.props.onChange(cm.getValue())}
					/>
				</div>
				<div class="flex flex-h-end">
					<button class="btn btn--primary" onClick={this.props.closeHandler}>
						Apply and Close
					</button>
				</div>
			</Modal>
		);
	}
}
