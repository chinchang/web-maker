import { h, Component } from 'preact';
import Split from 'split.js';

export class SplitPane extends Component {
	componentDidMount() {
		this.updateSplit();
	}

	componentDidUpdate(prevProps) {
		if (this.hasGutter() && !this.hasPropsChanged(prevProps, this.props)) {
			return;
		}
		this.updateSplit();
	}
	hasGutter() {
		return (
			[...this.parent.children].indexOf(
				this.parent.querySelector('.gutter')
			) !== -1
		);
	}
	hasPropsChanged(a, b) {
		return (
			a.direction !== b.direction ||
			(a.sizes && b.sizes && a.sizes.join('') !== b.sizes.join(''))
		);
	}
	updateSplit() {
		const { children, ...options } = this.props;
		options.gutterSize = 6;

		if (this.splitInstance && this.hasGutter()) {
			this.splitInstance.destroy();
		}

		/* eslint-disable new-cap */
		this.splitInstance = Split([...this.parent.children], options);

		/* eslint-enable new-cap */

		if (this.props.onSplit) {
			this.props.onSplit(this.splitInstance);
		}
	}
	render() {
		/* eslint-disable no-unused-vars */
		const { children, ...props } = this.props;
		/* eslint-enable no-unused-vars */

		return (
			<div ref={el => (this.parent = el)} {...props}>
				{this.props.children}
			</div>
		);
	}
}
