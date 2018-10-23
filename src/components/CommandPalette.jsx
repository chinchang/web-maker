import { h, Component } from 'preact';
import Modal from './Modal';
import { AutoFocusInput } from './common';
import { commands } from '../commands';
import {
	commandPaletteService,
	SWITCH_FILE_EVENT
} from '../commandPaletteService';
import { FileIcon } from './FileIcon';

function getFolder(filePath) {
	const split = filePath.split('/');
	if (split.length > 1) {
		split.length = split.length - 1;
		return split.join('/');
	}
	return '';
}
function Row({ item, onClick }) {
	return (
		<li>
			<button style="background:0;border:0;" onClick={onClick}>
				{item.path ? <FileIcon file={item} /> : null}
				{item.name}
				{item.path ? (
					<span style="color:#ccc;margin-left:10px;font-size:0.8em;">
						{getFolder(item.path)}
					</span>
				) : null}
			</button>
		</li>
	);
}
export class CommandPalette extends Component {
	state = { list: [], search: '' };
	componentDidUpdate(previousProps) {
		if (this.props.show && !previousProps.show) {
			this.state.search = '';

			this.isCommandMode = this.props.isCommandMode;
			if (this.isCommandMode) {
				this.setState({ search: '>' });
			}

			this.setState({
				list: this.getFilteredList()
			});
		}
	}

	getFilteredList(search = '') {
		const list = this.isCommandMode ? commands : this.props.files;
		return list.filter(
			item =>
				item.name
					.toLowerCase()
					.indexOf(this.isCommandMode ? search.substr(1) : search) !== -1
		);
	}

	inputHandler(e) {
		const search = e.target.value;
		this.setState({ search });
		if (search.indexOf('>') === 0) {
			this.isCommandMode = true;
		}
		this.setState({
			list: this.getFilteredList(search)
		});
	}
	optionClickHandler(option) {
		commandPaletteService.publish(
			option.path ? SWITCH_FILE_EVENT : option.event,
			option
		);
		this.props.closeHandler();
	}
	render() {
		return (
			<Modal show={this.props.show} closeHandler={this.props.closeHandler}>
				<AutoFocusInput
					value={this.state.search}
					onInput={this.inputHandler.bind(this)}
				/>
				<ul style="padding:0;list-style:none;">
					{this.state.list.map(item => (
						<Row
							item={item}
							onClick={this.optionClickHandler.bind(this, item)}
						/>
					))}
				</ul>
			</Modal>
		);
	}
}
