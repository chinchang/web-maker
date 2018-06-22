import { h, Component } from 'preact';
import Split from 'split.js';

export class SplitPane extends Component {
	// shouldComponentUpdate(nextProps, nextState) {
	// 	return (
	// 		nextProps.direction !== this.props.direction ||
	// 		nextProps.sizes.join('') !== this.props.sizes.join('')
	// 	);
	// }
	componentDidMount() {
		this.updateSplit();
	}
	componentWillUpdate() {
		if (this.splitInstance) {
			this.splitInstance.destroy();
		}
	}
	componentDidUpdate() {
		this.updateSplit();
	}
	updateSplit() {
		const options = {
			direction: this.props.direction,
			minSize: this.props.minSize,
			gutterSize: 6,
			sizes: this.props.sizes
		};
		if (this.props.onDragEnd) {
			options.onDragEnd = this.props.onDragEnd;
		}
		if (this.props.onDragStart) {
			options.onDragStart = this.props.onDragStart;
		}

		/* eslint-disable new-cap */
		this.splitInstance = Split(
			this.props.children.map(node => '#' + node.attributes.id),
			options
		);
		/* eslint-enable new-cap */

		if (this.props.onSplit) {
			this.props.onSplit(this.splitInstance);
		}
	}
	render() {
		/* eslint-disable no-unused-vars */
		const { children, ...props } = this.props;
		/* eslint-enable no-unused-vars */

		return <div {...props}>{this.props.children}</div>;
	}
}
