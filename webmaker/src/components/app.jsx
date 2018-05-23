import { h, Component } from 'preact';
import { Router } from 'preact-router';

import MainHeader from './MainHeader.jsx';
import ContentWrap from './ContentWrap.jsx';
import Footer from './Footer.jsx';
import SavedItemPane from './SavedItemPane.jsx';
import Modal from './Modal.jsx';

if (module.hot) {
	require('preact/debug');
}

export default class App extends Component {
	getInitialState() {
		return { isSavedItemPaneOpen: false, isModalOpen: false };
	}
	openBtnHandler() {
		this.setState({ isSavedItemPaneOpen: true });
	}
	closeSavedItemsPane() {
		this.setState({
			isSavedItemPaneOpen: false
		});
	}

	render() {
		return (
			<div>
				<div class="main-container">
					<MainHeader openBtnHandler={this.openBtnHandler.bind(this)} />
					<ContentWrap />
					<div class="global-console-container" id="globalConsoleContainerEl" />
					<Footer />
				</div>

				<SavedItemPane
					isOpen={this.state.isSavedItemPaneOpen}
					closeHandler={this.closeSavedItemsPane.bind(this)}
				/>
				<div class="alerts-container" id="js-alerts-container" />
				<form
					style="display:none;"
					action="https://codepen.io/pen/define"
					method="POST"
					target="_blank"
					id="js-codepen-form"
				>
					<input
						type="hidden"
						name="data"
						value="{&quot;title&quot;: &quot;New Pen!&quot;, &quot;html&quot;: &quot;<div>Hello, World!</div>&quot;}"
					/>
				</form>
			</div>
		);
	}
}
