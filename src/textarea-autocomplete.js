// textarea-autocomplete.js
(function() {
	class TextareaAutoComplete {
		constructor(textarea, filter) {
			this.t = textarea;
			this.filter = filter;
			var wrap = document.createElement('div');
			wrap.classList.add('btn-group');
			textarea.parentElement.insertBefore(wrap, textarea);
			wrap.insertBefore(textarea, null);
			this.list = document.createElement('ul');
			this.list.classList.add('dropdown__menu');
			this.list.classList.add('autocomplete-dropdown');
			wrap.insertBefore(this.list, null);

			this.loader = document.createElement('div');
			this.loader.classList.add('loader');
			this.loader.classList.add('autocomplete__loader');
			this.loader.style.display = 'none';
			wrap.insertBefore(this.loader, null);

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
			this.list.addEventListener('mousedown', e => this.onListMouseDown(e));
		}

		get currentLineNumber() {
			return this.t.value.substr(0, this.t.selectionStart).split('\n').length;
		}
		get currentLine() {
			var line = this.currentLineNumber;
			return this.t.value.split('\n')[line - 1];
		}
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
				if (
					currentLine.indexOf('/') !== -1 ||
					currentLine.match(/https*:\/\//)
				) {
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
							this.list.innerHTML += `<li data-url="${arr[i].latest}"><a>${arr[
								i
							].name}</a></li>`;
						}
						this.isShowingSuggestions = true;
						if (!this.textareaBounds) {
							this.textareaBounds = this.t.getBoundingClientRect();
							this.list.style.top = this.textareaBounds.bottom + 'px';
							this.list.style.left = this.textareaBounds.left + 'px';
							this.list.style.width = this.textareaBounds.width + 'px';
						}
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
				this.replaceCurrentLine(selectedItemElement.dataset.url);
				this.closeSuggestions();
			}
		}
		onListMouseDown(event) {
			var target = event.target;
			if (target.parentElement.dataset.url) {
				this.replaceCurrentLine(target.parentElement.dataset.url);
				this.closeSuggestions();
			}
		}
	}

	window.TextareaAutoComplete = TextareaAutoComplete;
})();
