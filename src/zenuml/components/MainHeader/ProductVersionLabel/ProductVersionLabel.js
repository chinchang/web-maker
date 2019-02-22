import { Component } from 'preact';
import { ProductVersionLabelAnonymous } from './ProductVersionLabelAnonymous';

export class ProductVersionLabel extends Component {
	isAnonymous() {
		return !this.props.user;
	}

	render() {
		let view = null;
		if (this.isAnonymous()) {
			view = <ProductVersionLabelAnonymous clickHandler={this.props.clickHandler}/>;
		} else {
			view = this.productInfo();
		}
		return view;
	}
	productInfo() {
		return null;
	}
}
