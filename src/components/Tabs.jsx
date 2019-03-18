import { h, Component } from 'preact';

function hyphenate(text) {
	if (text.replace) {
		return text.replace(/\s/g, '-');
	}
	return '';
}
const ID_PREFIX = 'tab-panel-';

export function TabPanel({ label }) {
	return (
		<div
			class="tabs__tabpanel"
			role="tabpanel"
			id={`${ID_PREFIX}${hyphenate(label)}`}
		>
			{this.props.children}
		</div>
	);
}
function Tab({ label, isSelected, onKeyUp, onClick }) {
	return (
		<button
			class={`tabs__tab ${isSelected ? 'tabs__tab--selected' : ''}`}
			role="tab"
			tabindex={isSelected ? null : -1}
			aria-selected={`${isSelected}`}
			aria-controls={`${ID_PREFIX}${hyphenate(label)}`}
			onKeyUp={onKeyUp}
			onClick={onClick}
		>
			{label}
		</button>
	);
}
export default class Tabs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTab: 0
		};
		this.switchTab = this.switchTab.bind(this);
	}
	isSelected(index) {
		return this.state.selectedTab === index;
	}
	switchTab(selectedTab) {
		this.setState({ selectedTab: selectedTab });
		this.tabListEl.querySelectorAll('[role=tab]')[selectedTab].focus();
		if (this.props.onChange) {
			this.props.onChange(this.state.selectedTab);
		}
	}
	keyUpHandler(e) {
		let { selectedTab } = this.state;
		if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
			selectedTab--;
			selectedTab =
				selectedTab < 0 ? this.props.children.length - 1 : selectedTab;
			this.switchTab(selectedTab);
			e.preventDefault();
		} else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
			selectedTab++;
			selectedTab %= this.props.children.length;
			this.switchTab(selectedTab);
			e.preventDefault();
		}
	}
	render() {
		const tabs = this.props.children;
		return (
			<div class={`tabs ${this.props.horizontal ? 'tabs--horizontal' : ''}`}>
				<div
					class="tabs__tablist"
					role="tablist"
					ref={el => (this.tabListEl = el)}
				>
					{tabs.map((child, index) => (
						<Tab
							isSelected={this.isSelected(index)}
							label={child.props.label}
							onKeyUp={this.keyUpHandler.bind(this)}
							onClick={() => this.switchTab(index)}
						/>
					))}
				</div>
				<div class="tabs__tabpanel-wrap">
					{tabs.map((child, index) =>
						this.state.selectedTab === index ? child : null
					)}
				</div>
			</div>
		);
	}
}
