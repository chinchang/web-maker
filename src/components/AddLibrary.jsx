import { h, Component } from 'preact';
import { jsLibs, cssLibs } from '../libraryList';
import { trackEvent } from '../analytics';
import { LibraryAutoSuggest } from './LibraryAutoSuggest';

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
		} else {
			this.setState({
				css: `${this.state.css}\n${target.value}`
			});
		}

		trackEvent('ui', 'addLibrarySelect', target.selectedOptions[0].label);
		this.props.onChange({ js: this.state.js, css: this.state.css });
		// Reset the select to the default value
		target.value = '';
	}
	textareaBlurHandler(e, textarea) {
		const target = e ? e.target : textarea;
		const type = target.dataset.lang;
		if (type === 'js') {
			this.setState({
				js: target.value || ''
			});
		} else {
			this.setState({
				css: target.value || ''
			});
		}

		// trackEvent('ui', 'addLibrarySelect', target.selectedOptions[0].label);
		this.props.onChange({ js: this.state.js, css: this.state.css });
	}
	suggestionSelectHandler(value) {
		const textarea = value.match(/\.js$/)
			? window.externalJsTextarea
			: window.externalCssTextarea;
		textarea.value = `${textarea.value}\n${value}`;
		window.externalLibrarySearchInput.value = '';
		this.textareaBlurHandler(null, textarea);
	}
	render() {
		return (
			<div>
				<h1>Add Library</h1>

				<div class="flex flex-v-center">
					<svg style="width: 30px; height: 30px;fill:rgb(255,255,255,0.5)">
						<use xlinkHref="#search" />
					</svg>
					<LibraryAutoSuggest
						fullWidth
						onSelect={this.suggestionSelectHandler.bind(this)}
					>
						<input
							type="text"
							id="externalLibrarySearchInput"
							class="full-width"
							placeholder="Type here to search libraries"
						/>
					</LibraryAutoSuggest>
				</div>
				<div class="tar opacity--70">
					<small>Powered by cdnjs</small>
				</div>
				<div style="margin:20px 0;">
					Choose from popular libraries:{' '}
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

				<h3 class="mb-0">JS</h3>
				<p class="mt-0 help-text">Put each library in new line</p>

				<p style="font-size: 0.8em;" class="show-when-extension opacity--70">
					Note: You can load external scripts from following domains: localhost,
					https://ajax.googleapis.com, https://code.jquery.com,
					https://cdnjs.cloudflare.com, https://unpkg.com, https://maxcdn.com,
					https://cdn77.com, https://maxcdn.bootstrapcdn.com,
					https://cdn.jsdelivr.net/, https://rawgit.com, https://wzrd.in
				</p>

				<textarea
					onBlur={this.textareaBlurHandler.bind(this)}
					data-lang="js"
					class="full-width"
					id="externalJsTextarea"
					cols="30"
					rows="5"
					value={this.state.js}
				/>

				<h3 class="mb-0">CSS</h3>
				<p class="mt-0 help-text">Put each library in new line</p>
				<textarea
					onBlur={this.textareaBlurHandler.bind(this)}
					data-lang="css"
					class="full-width"
					id="externalCssTextarea"
					cols="30"
					rows="5"
					value={this.state.css}
				/>
			</div>
		);
	}
}
