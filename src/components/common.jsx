import { h, Component } from 'preact';
import { trackEvent } from '../analytics';

class Clickable extends Component {
	handleClick(e) {
		const el = e.currentTarget;
		trackEvent(
			el.getAttribute('data-event-category'),
			el.getAttribute('data-event-action')
		);
		this.props.onClick(e);
	}
	render() {
		/* eslint-disable no-unused-vars */
		const { onClick, Tag, ...props } = this.props;
		/* eslint-enable no-unused-vars */

		return <Tag onClick={this.handleClick.bind(this)} {...props} />;
	}
}

export function A(props) {
	return <Clickable Tag={'a'} {...props} />;
}

export function Button(props) {
	return <Clickable Tag={'button'} {...props} />;
}
