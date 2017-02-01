// textarea-autocomplete.js
(function() {

	var timeout;
	var t, list;
	var isShowingSuggestions = false;

	class TextareaAutoComplete {

		constructor (textarea, filter) {
			this.t = textarea;
			this.filter =  filter;
			var wrap = document.createElement('div');
			wrap.classList.add('btn-group');
			textarea.parentElement.insertBefore(wrap, textarea);
			wrap.insertBefore(textarea, null);
			this.list = document.createElement('ul');
			this.list.classList.add('dropdown__menu');
			this.list.classList.add('autocomplete-dropdown');
			wrap.insertBefore(this.list, null);

			this.t.addEventListener('input', e => this.onInput(e));
			this.t.addEventListener('keydown', e => this.onKeyDown(e));
			this.t.addEventListener('blur', e => this.closeSuggestions())
		}

		get currentLineNumber() {
			return this.t.value.substr(0, this.t.selectionStart).split('\n').length;
		}
		get currentLine() {
			var line = this.currentLineNumber;
			return this.t.value.split('\n')[line - 1];
		}
		closeSuggestions() {
			this.list.parentElement.classList.remove('open');
			this.isShowingSuggestions = false;
		}
		getList(input) {
			// return new Promise((resolve) => {
			// 	resolve([
			// 		{ name: 'asdsd', latest: 'dsfdsfsdf/sdf/sd/f/df'},
			// 		{ name: 'asdsd', latest: 'dsfdsfsdf/sdf/sd/f/df'},
			// 		{ name: 'asdsd', latest: 'dsfdsfsdf/sdf/sd/f/df'},
			// 		{ name: 'asdsd', latest: 'dsfdsfsdf/sdf/sd/f/df'},
			// 		{ name: 'asdsd', latest: 'dsfdsfsdf/sdf/sd/f/df'},
			// 		{ name: 'asdsd', latest: 'dsfdsfsdf/sdf/sd/f/df'},
			// 		{ name: 'asdsd', latest: 'dsfdsfsdf/sdf/sd/f/df'},
			// 		{ name: 'asdsd', latest: 'dsfdsfsdf/sdf/sd/f/df'},
			// 		{ name: 'asdsd', latest: 'dsfdsfsdf/sdf/sd/f/df'},
			// 		 ])
			// })
			var url = 'https://api.cdnjs.com/libraries?search=';
			return fetch(url + input)
			.then(response => {
				return response.json().then(json => json.results);
			});
		}
		replaceCurrentLine(val) {
			var lines = this.t.value.split('\n');
			lines.splice(this.currentLineNumber - 1, 1, val)
			this.t.value = lines.join('\n');
		}
		onInput() {
			var currentLine = this.currentLine;
			if (currentLine) {
				clearTimeout(this.timeout);
				this.timeout = setTimeout(() => {
					this.getList(currentLine).then(arr => {
						if (!arr.length) {
							this.closeSuggestions();
							return;
						}
						this.list.innerHTML = '';
						if (this.filter) {
							arr = arr.filter(this.filter);
						}
						for (var i = 0; i < Math.min(arr.length, 10); i++) {
							this.list.innerHTML += `<li data-url="${arr[i].latest}"><a>${arr[i].name}</a></li>`;
						}
						this.list.parentElement.classList.add('open');
						this.isShowingSuggestions = true;
					});
				}, 500);
			}
		}
		onKeyDown(event) {
			if (event.keyCode === 27) {
				this.closeSuggestions();
				event.stopPropagation();
			}
			if (event.keyCode === 40 && this.isShowingSuggestions) {
				var selectedItemElement = this.list.querySelector('.selected');
				if (selectedItemElement) {
					selectedItemElement.classList.remove('selected');
					selectedItemElement.nextElementSibling.classList.add('selected');
				} else {
					this.list.querySelector('li:first-child').classList.add('selected');
				}
				event.preventDefault();
			} else if (event.keyCode === 38 && this.isShowingSuggestions) {
				var selectedItemElement = this.list.querySelector('.selected');
				if (selectedItemElement) {
					selectedItemElement.classList.remove('selected');
					selectedItemElement.previousElementSibling.classList.add('selected');
				} else {
					this.list.querySelector('li:first-child').classList.add('selected');
				}
				event.preventDefault();
			} else if (event.keyCode === 13 && this.isShowingSuggestions) {
				var selectedItemElement = this.list.querySelector('.selected');
				this.replaceCurrentLine(selectedItemElement.dataset.url)
				this.closeSuggestions();
			}
		}
	}

	window.TextareaAutoComplete = TextareaAutoComplete;

})();