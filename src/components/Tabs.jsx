import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';

class Tabs extends Component {
	static propTypes = {
		children: PropTypes.instanceOf(Array).isRequired,
	}

	constructor(props) {
		super(props);
		this.onInit();
	}

	onInit = () => {
		this.state = {
			activeTab: this.props.children[0].props.label,
		};
	}
	onClickTabItem = (tab) => {
		this.setState({ activeTab: tab });
	}

	static modifyChildren(child, visible) {
		const className = [child.props.className, visible ? '' : 'hide'].join(' ');

		const props = {
			className
		};

		return React.cloneElement(child, props);
	}
	render() {
		const {
			onClickTabItem,
			props: {
				children,
			},
			state: {
				activeTab,
			}
		} = this;
		return (
			<div className="tabs">
				<ol className="tab-list">
					{children.map((child) => {
						const { label } = child.props;

						return (
							<Tab
								activeTab={activeTab}
								key={label}
								label={label}
								onClick={onClickTabItem}
							/>
						);
					})}
				</ol>
				<div className="tab-content">
					{children.map((child) => {
						if (child.props.label !== activeTab) {
							return child.props.children.map(c => Tabs.modifyChildren(c, false))
						}
						return child.props.children;
					})}
				</div>
			</div>
		);
	}
}

export default Tabs;
