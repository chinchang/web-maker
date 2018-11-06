import { h, Component } from 'preact';

export default class Switch extends Component {
	render() {
		return (
			<label class="check-switch">
				{this.props.children}
				<input role="switch" type="checkbox" checked={this.props.checked} />
				<span aria-hidden="true" class="check-switch__toggle" />
				<span aria-hidden="true" class="check-switch__status">
					{this.props.checked ? 'on' : 'off'}
				</span>
			</label>
		);
	}
}
