import { Component } from 'preact';
import { ProductVersionAnonymous } from './ProductVersionAnonymous';

export class ProductVersionInfo extends Component {
	isAnonymous() {
		return !this.props.user;
	}

	render() {
		let view = null;
		if (this.isAnonymous()) {
			view = <ProductVersionAnonymous />;
		} else {
			view = this.productInfo();
		}
		return view;
	}
	productInfo() {
		return (<ProductVersionAnonymous />);
	}
}
