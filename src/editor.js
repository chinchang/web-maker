class Editor {
	constructor(mode, el, options, onChange) {
		this.mode = mode;
		this.el = el;
		if (mode === 'cm') {
			this.instance = CodeMirror(el, {
				mode: options.mode,
				lineNumbers: true,
				lineWrapping: true,
				autofocus: options.autofocus || false,
				autoCloseBrackets: true,
				autoCloseTags: true,
				matchBrackets: true,
				matchTags: options.matchTags || false,
				tabMode: 'indent',
				keyMap: 'sublime',
				theme: 'monokai',
				lint: !!options.lint,
				tabSize: 2,
				foldGutter: true,
				styleActiveLine: true,
				gutters: options.gutters || [],
				// cursorScrollMargin: '20', has issue with scrolling
				profile: options.profile || '',
				extraKeys: {
					Up: function(editor) {
						// Stop up/down keys default behavior when saveditempane is open
						if (isSavedItemsPaneOpen) {
							return;
						}
						CodeMirror.commands.goLineUp(editor);
					},
					Down: function(editor) {
						if (isSavedItemsPaneOpen) {
							return;
						}
						CodeMirror.commands.goLineDown(editor);
					},
					'Shift-Tab': function(editor) {
						CodeMirror.commands.indentAuto(editor);
					},
					Tab: function(editor) {
						if (options.emmet) {
							const didEmmetWork = editor.execCommand(
								'emmetExpandAbbreviation'
							);
							if (didEmmetWork === true) {
								return;
							}
						}
						const input = $('[data-setting=indentWith]:checked');
						if (
							!editor.somethingSelected() &&
							(!input || input.value === 'spaces')
						) {
							// softtabs adds spaces. This is required because by default tab key will put tab, but we want
							// to indent with spaces if `spaces` is preferred mode of indentation.
							// `somethingSelected` needs to be checked otherwise, all selected code is replaced with softtab.
							CodeMirror.commands.insertSoftTab(editor);
						} else {
							CodeMirror.commands.defaultTab(editor);
						}
					},
					Enter: 'emmetInsertLineBreak'
				}
			});
			this.instance.on('change', onChange);
		} else {
			this.instance = monaco.editor.create(el, {
				language: options.language,
				roundedSelection: false,
				scrollBeyondLastLine: false,
				theme: 'vs-dark',
				fontSize: 16,
				minimap: {
					enabled: false
				},
				wordWrap: 'on',
				fontLigatures: true
			});

			this.instance.onDidChangeModelContent(onChange);
		}
	}
	setValue(value) {
		return this.instance.setValue(value);
	}
	getValue() {
		return this.instance.getValue();
	}
	setOption(optionName, optionValue) {
		if (this.mode === 'cm') {
			this.instance.setOption(optionName, optionValue);
		} else {
			this.instance.updateOptions(optionName, optionValue);
		}
	}
	clearGutter(gutter) {
		if (this.mode === 'cm') {
			this.instance.clearGutter(gutter);
		}
	}
	refresh() {
		utils.log('💦 Editor refreshed');
		if (this.mode === 'cm') {
			this.instance.refresh();
		} else {
			this.instance.layout();
		}
	}
	setFontSize(size) {
		if (this.mode === 'cm') {
			this.el.querySelector('.CodeMirror').style.fontSize = size;
		} else {
			this.instance.updateOptions({ fontSize: size });
		}
	}
	setLanguage(language) {
		if (this.mode === 'cm') {
			this.instance.setOption('mode', language);
		} else {
			this.instance.updateOptions({ language: language });
		}
	}
}
window.editor = {
	init(mode, el, options, onChange) {
		return new Editor(mode, el, options, onChange);
	}
};
