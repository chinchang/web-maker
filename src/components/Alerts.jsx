import { h, Component } from 'preact';

export class Alerts extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return false;
	}

	render() {
		return <div class="alerts-container" id="js-alerts-container" />;
	}
}
