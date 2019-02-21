import { h, Component } from 'preact';
import { ProductVersionAnonymous } from './ProductVersionAnonymous';

export class ProductVersionInfo extends Component {
	isAnonymous() {
		return !this.props.user;
	}

	render() {
		let view = null;
		if (this.isAnonymous()) {
			view = this.anonymousProductInfo();
		} else {
			view = this.productInfo();
		}
		return view;
	}

	anonymousProductInfo() {
		return <ProductVersionAnonymous />;
	}

	productInfo() {
		return (<p>pro2</p>);
	}
}
