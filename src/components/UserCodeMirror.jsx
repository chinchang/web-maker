import { h, Component } from 'preact';
import CodeMirror from '../CodeMirror';

import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/edit/matchtags.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/edit/closetag.js';
import 'codemirror/addon/comment/comment.js';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/xml-fold.js';
import 'codemirror/addon/fold/indent-fold.js';
import 'codemirror/addon/fold/comment-fold.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/javascript-hint.js';
import 'codemirror/addon/hint/xml-hint.js';
import 'codemirror/addon/hint/html-hint.js';
import 'codemirror/addon/hint/css-hint.js';
import 'codemirror/addon/selection/active-line.js';
import 'codemirror/addon/search/searchcursor.js';
import 'codemirror/addon/search/search.js';
import 'codemirror/addon/dialog/dialog.js';
import 'codemirror/addon/search/jump-to-line.js';

import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import 'codemirror/keymap/sublime.js';
import 'codemirror/keymap/vim.js';
import 'code-blast-codemirror/code-blast.js';

import emmet from '@emmetio/codemirror-plugin';

emmet(CodeMirror);

export default class UserCodeMirror extends Component {
	componentDidMount() {
		this.initEditor();
	}
	shouldComponentUpdate() {
		return false;
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
					// if (isSavedItemsPaneOpen) {
					// return;
					// }
					CodeMirror.commands.goLineUp(editor);
				},
				Down: function(editor) {
					// if (isSavedItemsPaneOpen) {
					// return;
					// }
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
			if (typeof this.props.onFocus === 'function') this.props.onFocus(editor);
		});
		this.cm.on('change', this.props.onChange);
		this.cm.addKeyMap({
			'Ctrl-Space': 'autocomplete'
		});
		if (!options.noAutocomplete) {
			this.cm.on('inputRead', (editor, input) => {
				if (
					!this.props.prefs.autoComplete ||
					input.origin !== '+input' ||
					input.text[0] === ';' ||
					input.text[0] === ',' ||
					input.text[0] === ' '
				) {
					return;
				}
				CodeMirror.commands.autocomplete(this.cm, null, {
					completeSingle: false
				});
			});
		}
		this.props.onCreation(this.cm);
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
