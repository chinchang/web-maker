import { h } from 'preact';
import { PureComponent } from 'preact-compat';

/**
 * This component udpates not through props or state, but by some parent
 * component calling a method of this component directly. This is because
 * using the state/prop way causes a huge unnnecessary rendering as this
 * component gets updated on drag event.
 */
const HIDE_AFTER_MILLISECONDS = 1000;
export class PreviewDimension extends PureComponent {
	constructor(props) {
		super(props);
		this.state = { w: 0, h: 0, isVisible: false };
	}
	update(dimensions) {
		this.setState({ isVisible: true, ...dimensions });
		if (this.hideTimer) {
			clearTimeout(this.hideTimer);
		}

		/**
		 * Automatically hide this commponent after sometime and also show
		 * when its updated (code above).
		 */
		this.hideTimer = setTimeout(() => {
			this.setState({ isVisible: false });
		}, HIDE_AFTER_MILLISECONDS);
	}
	render() {
		if (!this.state.isVisible) return null;
		return (
			<div class="preview-dimension">
				{this.state.w}px ⨯ {this.state.h}px
			</div>
		);
	}
}
