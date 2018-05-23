import { h, Component } from 'preact';
import CodeMirror from 'codemirror';

export default class UserCodeMirror extends Component {
	componentDidMount() {
		this.initEditor();
	}

	initEditor() {
		const options = this.props.options;
		this.cm = CodeMirror.fromTextArea(this.textarea, {
			mode: options.mode,
			lineNumbers: true,
			lineWrapping: true,
			autofocus: options.autofocus || false,
			autoCloseBrackets: true,
			autoCloseTags: true,
			matchBrackets: true,
			matchTags: options.matchTags || false,
			tabMode: 'indent',
			// keyMap: 'sublime',
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
						const didEmmetWork = editor.execCommand('emmetExpandAbbreviation');
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
		this.cm.on('focus', editor => {
			// editorWithFocus = editor;
		});
		this.cm.on('change', this.props.onChange);
		this.cm.addKeyMap({
			'Ctrl-Space': 'autocomplete'
		});
		if (!options.noAutocomplete) {
			this.cm.on('inputRead', function onChange(editor, input) {
				if (
					!prefs.autoComplete ||
					input.origin !== '+input' ||
					input.text[0] === ';' ||
					input.text[0] === ',' ||
					input.text[0] === ' '
				) {
					return;
				}
				CodeMirror.commands.autocomplete(cm, null, { completeSingle: false });
			});
		}
	}

	render() {
		return (
			<textarea
				ref={el => (this.textarea = el)}
				name=""
				id=""
				cols="30"
				rows="10"
			/>
		);
	}
}
