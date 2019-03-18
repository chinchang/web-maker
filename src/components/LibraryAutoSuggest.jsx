import { h, Component } from 'preact';
import { trackEvent } from '../analytics';

export class LibraryAutoSuggest extends Component {
	componentDidMount() {
		this.t = this.wrap.querySelector('input,textarea');
		this.filter = this.props.filter;
		this.selectedCallback = this.props.onSelect;

		// after list is insrted into the DOM, we put it in the body
		// fixed at same position
		setTimeout(() => {
			requestIdleCallback(() => {
				document.body.appendChild(this.list);
				this.list.style.position = 'fixed';
			});
		}, 100);

		this.t.addEventListener('input', e => this.onInput(e));
		this.t.addEventListener('keydown', e => this.onKeyDown(e));
		this.t.addEventListener('blur', e => this.closeSuggestions(e));
	}
	componentWillUnmount() {
		this.t.removeEventListener('input', e => this.onInput(e));
		this.t.removeEventListener('keydown', e => this.onKeyDown(e));
		this.t.removeEventListener('blur', e => this.closeSuggestions(e));
	}

	get currentLineNumber() {
		return this.t.value.substr(0, this.t.selectionStart).split('\n').length;
	}
	get currentLine() {
		var line = this.currentLineNumber;
		return this.t.value.split('\n')[line - 1];
	}
	listMouseDownHandler() {}
	closeSuggestions() {
		this.list.classList.remove('is-open');
		this.isShowingSuggestions = false;
	}
	getList(input) {
		var url = 'https://api.cdnjs.com/libraries?search=';
		return fetch(url + input).then(response => {
			return response.json().then(json => json.results);
		});
	}
	replaceCurrentLine(val) {
		var lines = this.t.value.split('\n');
		lines.splice(this.currentLineNumber - 1, 1, val);
		this.t.value = lines.join('\n');
	}
	onInput() {
		var currentLine = this.currentLine;
		if (currentLine) {
			if (currentLine.indexOf('/') !== -1 || currentLine.match(/https*:\/\//)) {
				return;
			}
			clearTimeout(this.timeout);
			this.timeout = setTimeout(() => {
				this.loader.style.display = 'block';
				this.getList(currentLine).then(arr => {
					this.loader.style.display = 'none';
					if (!arr.length) {
						this.closeSuggestions();
						return;
					}
					this.list.innerHTML = '';
					if (this.filter) {
						/* eslint-disable no-param-reassign */
						arr = arr.filter(this.filter);
					}
					for (var i = 0; i < Math.min(arr.length, 10); i++) {
						this.list.innerHTML += `<li data-url="${arr[i].latest}"><a>${
							arr[i].name
						}</a></li>`;
					}
					this.isShowingSuggestions = true;
					// if (!this.textareaBounds) {
					this.textareaBounds = this.t.getBoundingClientRect();
					this.list.style.top = this.textareaBounds.bottom + 'px';
					this.list.style.left = this.textareaBounds.left + 'px';
					this.list.style.width = this.textareaBounds.width + 'px';
					// }
					this.list.classList.add('is-open');
				});
			}, 500);
		}
	}
	onKeyDown(event) {
		var selectedItemElement;
		if (!this.isShowingSuggestions) {
			return;
		}

		if (event.keyCode === 27) {
			this.closeSuggestions();
			event.stopPropagation();
		}
		if (event.keyCode === 40 && this.isShowingSuggestions) {
			selectedItemElement = this.list.querySelector('.selected');
			if (selectedItemElement) {
				selectedItemElement.classList.remove('selected');
				selectedItemElement.nextElementSibling.classList.add('selected');
			} else {
				this.list.querySelector('li:first-child').classList.add('selected');
			}
			this.list.querySelector('.selected').scrollIntoView(false);
			event.preventDefault();
		} else if (event.keyCode === 38 && this.isShowingSuggestions) {
			selectedItemElement = this.list.querySelector('.selected');
			if (selectedItemElement) {
				selectedItemElement.classList.remove('selected');
				selectedItemElement.previousElementSibling.classList.add('selected');
			} else {
				this.list.querySelector('li:first-child').classList.add('selected');
			}
			this.list.querySelector('.selected').scrollIntoView(false);
			event.preventDefault();
		} else if (event.keyCode === 13 && this.isShowingSuggestions) {
			selectedItemElement = this.list.querySelector('.selected');
			this.selectSuggestion(selectedItemElement.dataset.url);
			this.closeSuggestions();
		}
	}
	listMouseDownHandler(event) {
		var target = event.target;
		if (target.parentElement.dataset.url) {
			this.selectSuggestion(target.parentElement.dataset.url);
		}
	}

	selectSuggestion(value) {
		// Return back the focus which is getting lost for some reason

		this.t.focus();
		trackEvent('ui', 'autoSuggestionLibSelected', value);
		if (this.selectedCallback) {
			this.selectedCallback.call(null, value);
		} else {
			this.replaceCurrentLine(value);
		}
		this.closeSuggestions();
	}
	render() {
		return (
			<div
				class={`btn-group ${this.props.fullWidth ? 'flex-grow' : ''}`}
				ref={el => (this.wrap = el)}
			>
				{this.props.children}
				<ul
					ref={el => (this.list = el)}
					class="dropdown__menu autocomplete-dropdown"
					onMouseDown={this.listMouseDownHandler.bind(this)}
				/>
				<div
					ref={el => (this.loader = el)}
					class="loader autocomplete__loader"
					style="display:none"
				/>
			</div>
		);
	}
}
