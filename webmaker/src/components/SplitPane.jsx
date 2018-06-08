import { h, Component } from 'preact';
import Split from 'split.js';
import { log } from '../utils';

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
		// debugger;
		// log('SIZE UPDATED', options);

		this.splitInstance = Split(
			this.props.children.map(node => '#' + node.attributes.id),
			options
		);
		if (this.props.onSplit) {
			this.props.onSplit(this.splitInstance);
		}
	}
	render() {
		const { children, ...props } = this.props;
		return <div {...props}>{this.props.children}</div>;
	}
}
