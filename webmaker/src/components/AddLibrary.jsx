import { h, Component } from 'preact';
import { jsLibs, cssLibs } from '../libraryList';

export default class AddLibrary extends Component {
	constructor(props) {
		super(props);
		this.state = {
			css: props.css || '',
			js: props.js || ''
		};
	}
	onSelectChange(e) {
		const target = e.target;
		if (!target.value) {
			return;
		}
		const type = target.selectedOptions[0].dataset.type;
		if (type === 'js') {
			this.setState({
				js: `${this.state.js}\n${target.value}`
			});
		}

		// trackEvent('ui', 'addLibrarySelect', target.selectedOptions[0].label);
		this.props.onChange({ js: this.state.js, css: this.state.css });
		// Reset the select to the default value
		target.value = '';
	}
	render() {
		return (
			<div>
				<h1>Add Library</h1>

				<input
					type="text"
					id="externalLibrarySearchInput"
					class="full-width"
					placeholder="Type here to search libraries"
				/>
				<div class="tar opacity--70">
					<small>Powered by cdnjs</small>
				</div>
				<div style="margin:20px 0;">
					Choose from popular libraries:
					<select
						name=""
						id="js-add-library-select"
						onChange={this.onSelectChange.bind(this)}
					>
						<option value="">-------</option>
						<optgroup label="JavaScript Libraries">
							{jsLibs.map(lib => (
								<option data-type={lib.type} value={lib.url}>
									{lib.label}
								</option>
							))}
						</optgroup>
						<optgroup label="CSS Libraries">
							{cssLibs.map(lib => (
								<option data-type={lib.type} value={lib.url}>
									{lib.label}
								</option>
							))}
						</optgroup>
					</select>
				</div>

				<h3>JavaScript</h3>
				<p style="font-size: 0.8em;" class="show-when-extension opacity--70">
					Note: You can load external scripts from following domains: localhost,
					https://ajax.googleapis.com, https://code.jquery.com,
					https://cdnjs.cloudflare.com, https://unpkg.com, https://maxcdn.com,
					https://cdn77.com, https://maxcdn.bootstrapcdn.com,
					https://cdn.jsdelivr.net/, https://rawgit.com, https://wzrd.in
				</p>

				<textarea
					onBlur={this.props.onChange}
					class="full-width"
					id=""
					cols="30"
					rows="5"
					placeholder="Start typing name of a library. Put each library in new line"
					value={this.state.js}
				/>

				<h3>CSS</h3>
				<textarea
					onBlur={this.props.onChange}
					class="full-width"
					id=""
					cols="30"
					rows="5"
					placeholder="Start typing name of a library. Put each library in new line"
				/>
			</div>
		);
	}
}
