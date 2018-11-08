import { h, Component } from 'preact';

export default class Switch extends Component {
	render() {
		return (
			<label class="check-switch">
				<input role="switch" type="checkbox" checked={this.props.checked} />
				<div class="check-switch__toggle-wrap">
					<span
						aria-hidden="true"
						class="check-switch__status"
						style={`visibility:${this.props.checked ? 'hidden' : 'visible'}`}
					>
						Off
					</span>
					<span aria-hidden="true" class="check-switch__toggle" />
					<span
						aria-hidden="true"
						class="check-switch__status"
						style={`visibility:${this.props.checked ? 'visible' : 'hidden'}`}
					>
						On
					</span>
				</div>

				{this.props.children}
			</label>
		);
	}
}
