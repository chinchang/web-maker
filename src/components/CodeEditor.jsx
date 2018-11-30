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
import { prettify } from '../utils';
import { modes } from '../codeModes';

import '../lib/monaco/monaco.bundle';
import '../lib/monaco/monaco.css';

emmet(CodeMirror);
window.MonacoEnvironment = {
	getWorkerUrl(moduleId, label) {
		switch (label) {
			case 'html':
				return 'lib/monaco/workers/html.worker.bundle.js';
			case 'json':
				return 'lib/monaco/workers/json.worker.bundle.js';
			case 'css':
			case 'scss':
			case 'less':
				return 'lib/monaco/workers/css.worker.bundle.js';
			case 'typescript':
			case 'javascript':
				return 'lib/monaco/workers/ts.worker.bundle.js';
			default:
				return 'lib/monaco/workers/editor.worker.bundle.js';
		}
	}
};

export default class CodeEditor extends Component {
	componentDidMount() {
		this.initEditor();
	}
	shouldComponentUpdate(nextProps) {
		if (nextProps.prefs !== this.props.prefs) {
			const { prefs } = nextProps;

			if (this.props.type === 'monaco') {
				this.instance.updateOptions({ fontSize: prefs.fontSize });
			} else {
				this.instance.setOption(
					'indentWithTabs',
					prefs.indentWith !== 'spaces'
				);
				this.instance.setOption(
					'blastCode',
					prefs.isCodeBlastOn ? { effect: 2, shake: false } : false
				);
				this.instance.setOption('theme', prefs.editorTheme);

				this.instance.setOption('indentUnit', +prefs.indentSize);
				this.instance.setOption('tabSize', +prefs.indentSize);

				this.instance.setOption('keyMap', prefs.keymap);
				this.instance.setOption('lineWrapping', prefs.lineWrap);
				this.instance.setOption('lineWrapping', prefs.autoCloseTags);

				this.instance.refresh();
			}
		}

		if (nextProps.type !== this.props.type) {
			// debugger;
			if (
				this.node.parentElement.querySelector('.monaco-editor, .CodeMirror')
			) {
				this.node.parentElement
					.querySelector('.monaco-editor, .CodeMirror')
					.remove();
			}
			console.log('CODEEDITOR SHOULD UPDATE');

			return true;
		}

		return false;
	}
	componentDidUpdate(prevProps) {
		console.log('CODEEDITOR UPDATED');
		this.initEditor();
	}
	setModel(model) {
		this.instance.swapDoc
			? this.instance.swapDoc(model)
			: this.instance.setModel(model);
	}
	setValue(value) {
		if (this.props.type === 'monaco') {
			window.monacoSetValTriggered = true;
			setTimeout(() => {
				window.monacoSetValTriggered = false;
			}, 1);
		}
		this.instance.setValue(value);
	}
	getValue() {
		return this.instance.getValue();
	}
	saveViewState() {
		if (this.props.type === 'monaco') {
			return this.instance.saveViewState();
		}
	}
	restoreViewState(state) {
		if (this.props.type === 'monaco') {
			this.instance.restoreViewState(state);
		}
	}
	setOption(option, value) {}
	setLanguage(value) {
		console.log('setting', this.props.type, modes[value].cmMode);
		if (this.props.type === 'monaco') {
			monaco.editor.setModelLanguage(
				this.instance.getModel(),
				this.getMonacoLanguageFromMode(modes[value].cmMode)
			);
		} else {
			this.instance.setOption('mode', modes[value].cmMode);
			CodeMirror.autoLoadMode(
				this.instance,
				modes[value].cmPath || modes[value].cmMode
			);
		}
	}

	clearGutter(gutterName) {}

	refresh() {
		this.instance.refresh ? this.instance.refresh() : this.instance.layout();
	}
	focus() {
		this.instance.focus();
	}

	getMonacoLanguageFromMode(mode) {
		if (['htmlmixed'].includes(mode)) {
			return 'html';
		}
		if (['css', 'sass', 'scss', 'less', 'stylus'].includes(mode)) {
			return 'css';
		}
		if (['javascript', 'text/typescript-jsx', 'jsx'].includes(mode)) {
			return 'javascript';
		}
		return mode;
	}

	initEditor() {
		const { options, prefs } = this.props;
		console.log(this.props.type);
		if (this.props.type === 'monaco') {
			this.instance = monaco.editor.create(this.node, {
				language: this.getMonacoLanguageFromMode(options.mode),
				roundedSelection: false,
				scrollBeyondLastLine: false,
				theme: 'vs-dark',
				fontSize: prefs.fontSize,
				minimap: {
					enabled: false
				},
				wordWrap: 'on',
				renderWhitespace: 'all',
				fontLigatures: true,
				automaticLayout: true
			});
			window.monacoInstance = this.instance;
			this.instance.onDidChangeModelContent(change => {
				this.props.onChange(this.instance, {
					...change,
					origin: window.monacoSetValTriggered ? 'setValue' : '+input'
				});
			});
			this.instance.addCommand(
				monaco.KeyMod.WinCtrl | monaco.KeyMod.Shift | monaco.KeyCode.KEY_F,
				() => {
					if (options.prettier) {
						prettify({
							content: this.instance.getValue(),
							type: options.prettierParser
						}).then(formattedCode => this.instance.setValue(formattedCode));
					}
				}
			);
		} else {
			this.instance = CodeMirror.fromTextArea(this.node, {
				mode: options.mode,
				lineNumbers: true,
				lineWrapping: !!prefs.lineWrap,
				autofocus: options.autofocus || false,
				autoCloseBrackets: true,
				autoCloseTags: !!prefs.autoCloseTags,
				matchBrackets: true,
				matchTags: options.matchTags || false,
				tabMode: 'indent',
				keyMap: prefs.keyMap || 'sublime',
				theme: prefs.editorTheme || 'monokai',
				lint: !!options.lint,
				tabSize: +prefs.indentSize || 2,
				indentWithTabs: prefs.indentWith !== 'spaces',
				indentUnit: +prefs.indentSize,
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
					'Shift-Ctrl-F': function(editor) {
						if (options.prettier) {
							prettify({
								content: editor.getValue(),
								type: options.prettierParser
							}).then(formattedCode => editor.setValue(formattedCode));
						}
					},
					Tab: function(editor) {
						if (options.emmet) {
							const didEmmetWork = editor.execCommand(
								'emmetExpandAbbreviation'
							);
							if (didEmmetWork === true) {
								return;
							}
							const input = $('[data-setting=indentWith]:checked');
							if (
								!editor.somethingSelected() &&
								(!prefs.indentWith || prefs.indentWith === 'spaces')
							) {
								// softtabs adds spaces. This is required because by default tab key will put tab, but we want
								// to indent with spaces if `spaces` is preferred mode of indentation.
								// `somethingSelected` needs to be checked otherwise, all selected code is replaced with softtab.
								CodeMirror.commands.insertSoftTab(editor);
							} else {
								CodeMirror.commands.defaultTab(editor);
							}
						}
					},
					Enter: 'emmetInsertLineBreak'
				}
			});
			this.instance.on('focus', editor => {
				if (typeof this.props.onFocus === 'function')
					this.props.onFocus(editor);
			});
			this.instance.on('change', this.props.onChange);
			this.instance.addKeyMap({
				'Ctrl-Space': 'autocomplete'
			});
			this.instance.on('inputRead', (editor, input) => {
				// Process further If this has autocompletition on and also the global
				// autocomplete setting is on.
				if (
					!this.props.options.noAutocomplete &&
					this.props.prefs.autoComplete
				) {
					if (
						input.origin !== '+input' ||
						input.text[0] === ';' ||
						input.text[0] === ',' ||
						input.text[0] === ' '
					) {
						return;
					}
					CodeMirror.commands.autocomplete(editor, null, {
						completeSingle: false
					});
				}
			});
		}

		// this.props.onCreation(this.instance);
	}

	render() {
		const node =
			this.props.type === 'monaco' ? (
				<div ref={el => (this.node = el)} style="width:100%;height:100%;" />
			) : (
				<textarea ref={el => (this.node = el)} />
			);
		return node;
	}
}
