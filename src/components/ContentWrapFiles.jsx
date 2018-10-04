import { h, Component } from 'preact';
import UserCodeMirror from './UserCodeMirror';
import { modes, HtmlModes, CssModes, JsModes } from '../codeModes';
import { log, loadJS } from '../utils';
import { SplitPane } from './SplitPane';
import { trackEvent } from '../analytics';
import CodeMirror from '../CodeMirror';
import { deferred } from '../deferred';
import { SidePane } from './SidePane';
import { Console } from './Console';

const minCodeWrapSize = 33;

/* global htmlCodeEl, jsCodeEl, cssCodeEl, logCountEl
*/
export default class ContentWrapFiles extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isConsoleOpen: false,
			isCssSettingsModalOpen: false
		};

		this.fileBuffers = {};
		this.updateTimer = null;
		this.updateDelay = 500;
		this.htmlMode = HtmlModes.HTML;
		this.prefs = {};
		this.codeInPreview = { html: null, css: null, js: null };
		this.cmCodes = { html: props.currentItem.html, css: '', js: '' };
		this.logCount = 0;

		window.onMessageFromConsole = this.onMessageFromConsole.bind(this);
		window.previewException = this.previewException.bind(this);
		// `clearConsole` is on window because it gets called from inside iframe also.
		window.clearConsole = this.clearConsole.bind(this);
	}
	shouldComponentUpdate(nextProps, nextState) {
		return (
			this.state.isConsoleOpen !== nextState.isConsoleOpen ||
			this.state.isCssSettingsModalOpen !== nextState.isCssSettingsModalOpen ||
			this.state.mainSplitSizes !== nextState.mainSplitSizes ||
			this.state.selectedFile !== nextState.selectedFile ||
			this.props.currentLayoutMode !== nextProps.currentLayoutMode ||
			this.props.currentItem !== nextProps.currentItem ||
			this.props.prefs !== nextProps.prefs
		);
	}
	componentWillUpdate(nextProps) {
		if (
			this.props.currentItem.createdOn !== nextProps.currentItem.createdOn ||
			this.props.currentItem.id !== nextProps.currentItem.id
		) {
			this.fileBuffers = {};
			this.state.selectedFile = null;
		}
	}
	componentDidUpdate() {
		const { currentItem } = this.props;

		// Select a new file if nothing is selected already or the selected file exists no more.
		if (
			currentItem &&
			currentItem.files &&
			(!this.state.selectedFile ||
				!currentItem.files.includes(this.state.selectedFile))
		) {
			this.fileSelectHandler(this.props.currentItem.files[0]);
		}
		// HACK: becuase its a DOM manipulation
		// window.logCountEl.textContent = this.logCount;
		// log('🚀', 'didupdate', this.props.currentItem);
		// if (this.isValidItem(this.props.currentItem)) {
		// this.refreshEditor();
		// }
	}
	componentDidMount() {
		this.props.onRef(this);
	}

	createEditorDoc(file) {
		let mode;
		if (file.name.match(/\.css$/)) {
			mode = modes[CssModes.CSS].cmMode;
		} else if (file.name.match(/\.js$/)) {
			mode = modes[JsModes.JS].cmMode;
		} else {
			mode = modes[HtmlModes.HTML].cmMode;
		}
		console.log('mode', mode);
		this.fileBuffers[file.name] = CodeMirror.Doc(file.content || '', mode);
	}

	onHtmlCodeChange(editor, change) {
		this.cmCodes.html = editor.getValue();

		this.props.onCodeChange(
			this.state.selectedFile,
			this.cmCodes.html,
			change.origin !== 'setValue'
		);
		this.onCodeChange(editor, change);
	}

	onCodeChange(editor, change) {
		clearTimeout(this.updateTimer);

		this.updateTimer = setTimeout(() => {
			// This is done so that multiple simultaneous setValue don't trigger too many preview refreshes
			// and in turn too many file writes on a single file (eg. preview.html).
			if (change.origin !== 'setValue') {
				// Specifically checking for false so that the condition doesn't get true even
				// on absent key - possible when the setting key hasn't been fetched yet.
				if (this.prefs.autoPreview !== false) {
					this.setPreviewContent();
				}

				// Track when people actually are working.
				trackEvent.previewCount = (trackEvent.previewCount || 0) + 1;
				if (trackEvent.previewCount === 4) {
					trackEvent('fn', 'usingPreview');
				}
			}
		}, this.updateDelay);
	}

	createPreviewFile(html, css, js) {
		// Track if people have written code.
		if (!trackEvent.hasTrackedCode && (html || css || js)) {
			trackEvent('fn', 'hasCode');
			trackEvent.hasTrackedCode = true;
		}

		var obj = {};
		this.props.currentItem.files.forEach(file => {
			obj[`/user/${file.name}`] = file.content || '';

			// Add screenlog to index.html
			if (file.name === 'index.html') {
				obj[`/user/${file.name}`] =
					'<script src="' +
					(chrome.extension
						? chrome.extension.getURL('lib/screenlog.js')
						: `${location.origin}${
								window.DEBUG ? '' : BASE_PATH
						  }/lib/screenlog.js`) +
					'"></script>' +
					obj[`/user/${file.name}`];
			}
		});

		navigator.serviceWorker.controller.postMessage(obj);

		if (this.detachedWindow) {
			log('✉️ Sending message to detached window');
			this.detachedWindow.postMessage({ contents: '/user/index.html' }, '*');
		} else {
			this.frame.src = '/user/index.html';
		}
	}
	cleanupErrors() {
		this.cm.clearGutter('error-gutter');
	}

	showErrors(lang, errors) {
		var editor = this.cm;
		errors.forEach(function(e) {
			editor.operation(function() {
				var n = document.createElement('div');
				n.setAttribute('data-title', e.message);
				n.classList.add('gutter-error-marker');
				editor.setGutterMarker(e.lineNumber, 'error-gutter', n);
			});
		});
	}

	/**
	 * Generates the preview from the current code.
	 * @param {boolean} isForced Should refresh everything without any check or not
	 * @param {boolean} isManual Is this a manual preview request from user?
	 */
	setPreviewContent(isForced, isManual) {
		if (!this.props.prefs.autoPreview && !isManual) {
			return;
		}

		if (!this.props.prefs.preserveConsoleLogs) {
			// this.clearConsole();
		}
		this.cleanupErrors();

		var currentCode = {
			html: this.cmCodes.html,
			css: this.cmCodes.css,
			js: this.cmCodes.js
		};
		log('🔎 setPreviewContent', isForced);
		const targetFrame = this.detachedWindow
			? this.detachedWindow.document.querySelector('iframe')
			: this.frame;

		this.createPreviewFile();
		// result.forEach(resultItem => {
		// 	if (resultItem.errors) {
		// 		this.showErrors(resultItem.errors.lang, resultItem.errors.data);
		// 	}
		// });

		this.codeInPreview.html = currentCode.html;
		this.codeInPreview.css = currentCode.css;
		this.codeInPreview.js = currentCode.js;
	}
	isValidItem(item) {
		return !!item.title;
	}
	refreshEditor() {
		this.cmCodes.html = this.props.currentItem.html;
		if (this.state.selectedFile) {
			this.cm.setValue(this.state.selectedFile.content);
		}
		this.cm.refresh();
		window.cm = this.cm;

		// this.clearConsole();

		// Set preview only when all modes are updated so that preview doesn't generate on partially
		// correct modes and also doesn't happen 3 times.
		Promise.all([this.updateHtmlMode(this.props.currentItem.htmlMode)]).then(
			() => this.setPreviewContent(true)
		);
	}
	applyCodemirrorSettings(prefs) {
		if (!this.cm) {
			return;
		}
		htmlCodeEl.querySelector('.CodeMirror').style.fontSize = `${parseInt(
			prefs.fontSize,
			10
		)}px`;

		// Replace correct css file in LINK tags's href
		window.editorThemeLinkTag.href = `lib/codemirror/theme/${
			prefs.editorTheme
		}.css`;
		window.fontStyleTag.textContent = window.fontStyleTemplate.textContent.replace(
			/fontname/g,
			(prefs.editorFont === 'other'
				? prefs.editorCustomFont
				: prefs.editorFont) || 'FiraCode'
		);
		// window.customEditorFontInput.classList[
		// 	prefs.editorFont === 'other' ? 'remove' : 'add'
		// ]('hide');
		// this.consoleCm.setOption('theme', prefs.editorTheme);

		this.cm.setOption('indentWithTabs', prefs.indentWith !== 'spaces');
		this.cm.setOption(
			'blastCode',
			prefs.isCodeBlastOn ? { effect: 2, shake: false } : false
		);
		this.cm.setOption('indentUnit', +prefs.indentSize);
		this.cm.setOption('tabSize', +prefs.indentSize);
		this.cm.setOption('theme', prefs.editorTheme);

		this.cm.setOption('keyMap', prefs.keymap);
		this.cm.setOption('lineWrapping', prefs.lineWrap);
		this.cm.refresh();
	}

	// Check all the code wrap if they are minimized or maximized
	updateCodeWrapCollapseStates() {
		// This is debounced!
		clearTimeout(this.updateCodeWrapCollapseStates.timeout);
		this.updateCodeWrapCollapseStates.timeout = setTimeout(() => {
			const { currentLayoutMode } = this.props;
			const prop =
				currentLayoutMode === 2 || currentLayoutMode === 5 ? 'width' : 'height';
			[htmlCodeEl].forEach(function(el) {
				const bounds = el.getBoundingClientRect();
				const size = bounds[prop];
				if (size < 100) {
					el.classList.add('is-minimized');
				} else {
					el.classList.remove('is-minimized');
				}
				if (el.style[prop].indexOf(`100% - ${minCodeWrapSize * 2}px`) !== -1) {
					el.classList.add('is-maximized');
				} else {
					el.classList.remove('is-maximized');
				}
			});
		}, 50);
	}

	resetSplitting() {
		this.setState({
			mainSplitSizes: this.getMainSplitSizesToApply()
		});
	}
	updateSplits() {
		this.props.onSplitUpdate();
		// Not using setState to avoid re-render
		this.state.mainSplitSizes = this.props.currentItem.mainSizes;
	}

	// Returns the sizes of main code & preview panes.
	getMainSplitSizesToApply() {
		var mainSplitSizes;
		const sidebarWidth = 160;
		const { currentItem, currentLayoutMode } = this.props;
		if (false && currentItem && currentItem.mainSizes) {
			// For layout mode 3, main panes are reversed using flex-direction.
			// So we need to apply the saved sizes in reverse order.
			mainSplitSizes =
				currentLayoutMode === 3
					? [currentItem.mainSizes[1], currentItem.mainSizes[0]]
					: currentItem.mainSizes;
		} else {
			mainSplitSizes = [
				`${sidebarWidth}px`,
				`calc(50% - ${sidebarWidth / 2}px)`,
				`calc(50% - ${sidebarWidth / 2}px)`
			];
		}
		return mainSplitSizes;
	}

	mainSplitDragEndHandler() {
		if (this.props.prefs.refreshOnResize) {
			// Running preview updation in next call stack, so that error there
			// doesn't affect this dragend listener.
			setTimeout(() => {
				this.setPreviewContent(true);
			}, 1);
		}
		this.updateSplits();
	}

	/**
	 * Loaded the code comiler based on the mode selected
	 */
	handleModeRequirements(mode) {
		const baseTranspilerPath = 'lib/transpilers';
		// Exit if already loaded
		var d = deferred();
		if (modes[mode].hasLoaded) {
			d.resolve();
			return d.promise;
		}

		function setLoadedFlag() {
			modes[mode].hasLoaded = true;
			d.resolve();
		}

		if (mode === HtmlModes.JADE) {
			loadJS(`${baseTranspilerPath}/jade.js`).then(setLoadedFlag);
		} else if (mode === HtmlModes.MARKDOWN) {
			loadJS(`${baseTranspilerPath}/marked.js`).then(setLoadedFlag);
		} else if (mode === CssModes.LESS) {
			loadJS(`${baseTranspilerPath}/less.min.js`).then(setLoadedFlag);
		} else if (mode === CssModes.SCSS || mode === CssModes.SASS) {
			loadJS(`${baseTranspilerPath}/sass.js`).then(function() {
				window.sass = new Sass(`${baseTranspilerPath}/sass.worker.js`);
				setLoadedFlag();
			});
		} else if (mode === CssModes.STYLUS) {
			loadJS(`${baseTranspilerPath}/stylus.min.js`).then(setLoadedFlag);
		} else if (mode === CssModes.ACSS) {
			loadJS(`${baseTranspilerPath}/atomizer.browser.js`).then(setLoadedFlag);
		} else if (mode === JsModes.COFFEESCRIPT) {
			loadJS(`${baseTranspilerPath}/coffee-script.js`).then(setLoadedFlag);
		} else if (mode === JsModes.ES6) {
			loadJS(`${baseTranspilerPath}/babel.min.js`).then(setLoadedFlag);
		} else if (mode === JsModes.TS) {
			loadJS(`${baseTranspilerPath}/typescript.js`).then(setLoadedFlag);
		} else {
			d.resolve();
		}

		return d.promise;
	}

	updateHtmlMode(value) {
		// this.props.onCodeModeChange('html', value);
		// this.props.currentItem.htmlMode = value;
		// this.cm.setOption('mode', modes[value].cmMode);
		// CodeMirror.autoLoadMode(
		// 	this.cm,
		// 	modes[value].cmPath || modes[value].cmMode
		// );
		// return this.handleModeRequirements(value);
	}
	updateCssMode(value) {
		// this.props.onCodeModeChange('css', value);
		// this.props.currentItem.cssMode = value;
		this.cm.setOption('mode', modes[value].cmMode);
		this.cm.setOption('readOnly', modes[value].cmDisable);
		/* window.cssSettingsBtn.classList[
			modes[value].hasSettings ? 'remove' : 'add'
		]('hide'); */
		CodeMirror.autoLoadMode(
			this.cm,
			modes[value].cmPath || modes[value].cmMode
		);
		return this.handleModeRequirements(value);
	}
	updateJsMode(value) {
		this.cm.setOption('mode', modes[value].cmMode);
		CodeMirror.autoLoadMode(
			this.cm,
			modes[value].cmPath || modes[value].cmMode
		);
		return this.handleModeRequirements(value);
	}

	getDemoFrame(callback) {
		callback(this.frame);
	}
	editorFocusHandler(editor) {
		this.props.onEditorFocus(editor);
	}
	fileSelectHandler(file) {
		this.setState({ selectedFile: file });
		if (!this.fileBuffers[file.name]) {
			this.createEditorDoc(file);
		}
		this.cm.swapDoc(this.fileBuffers[file.name]);

		// var cmMode = 'html';
		// if (file.name.match(/\.css$/)) {
		// 	this.updateCssMode('css');
		// } else if (file.name.match(/\.js$/)) {
		// 	this.updateCssMode('js');
		// } else {
		// 	this.updateCssMode('html');
		// }
		// this.cm.setValue(file.content || '');
		this.cm.focus();
	}

	updateLogCount() {
		if (window.logCountEl) {
			logCountEl.textContent = this.logCount;
		}
	}

	onMessageFromConsole() {
		/* eslint-disable no-param-reassign */
		[...arguments].forEach(arg => {
			if (
				arg &&
				arg.indexOf &&
				arg.indexOf('filesystem:chrome-extension') !== -1
			) {
				arg = arg.replace(
					/filesystem:chrome-extension.*\.js:(\d+):*(\d*)/g,
					'script $1:$2'
				);
			}
			try {
				this.consoleCm.replaceRange(
					arg +
						' ' +
						((arg + '').match(/\[object \w+]/) ? JSON.stringify(arg) : '') +
						'\n',
					{
						line: Infinity
					}
				);
			} catch (e) {
				this.consoleCm.replaceRange('🌀\n', {
					line: Infinity
				});
			}
			this.consoleCm.scrollTo(0, Infinity);
			this.logCount++;
		});
		this.updateLogCount();

		/* eslint-enable no-param-reassign */
	}

	previewException(error) {
		console.error('Possible infinite loop detected.', error.stack);
		this.onMessageFromConsole('Possible infinite loop detected.', error.stack);
	}

	toggleConsole() {
		this.setState({ isConsoleOpen: !this.state.isConsoleOpen });
		trackEvent('ui', 'consoleToggle');
	}
	consoleHeaderDblClickHandler(e) {
		if (!e.target.classList.contains('js-console__header')) {
			return;
		}
		trackEvent('ui', 'consoleToggleDblClick');
		this.toggleConsole();
	}
	clearConsole() {
		this.consoleCm.setValue('');
		this.logCount = 0;
		this.updateLogCount();
	}
	clearConsoleBtnClickHandler() {
		this.clearConsole();
		trackEvent('ui', 'consoleClearBtnClick');
	}

	evalConsoleExpr(e) {
		// Clear console on CTRL + L
		if ((e.which === 76 || e.which === 12) && e.ctrlKey) {
			this.clearConsole();
			trackEvent('ui', 'consoleClearKeyboardShortcut');
		} else if (e.which === 13) {
			this.onMessageFromConsole('> ' + e.target.value);

			/* eslint-disable no-underscore-dangle */
			this.frame.contentWindow._wmEvaluate(e.target.value);

			/* eslint-enable no-underscore-dangle */

			e.target.value = '';
			trackEvent('fn', 'evalConsoleExpr');
		}
	}

	render() {
		return (
			<SplitPane
				class="content-wrap  flex  flex-grow"
				sizes={this.state.mainSplitSizes}
				minSize={150}
				style=""
				direction={
					this.props.currentLayoutMode === 2 ? 'vertical' : 'horizontal'
				}
				onDragEnd={this.mainSplitDragEndHandler.bind(this)}
			>
				<div id="js-sidebar">
					<SidePane
						files={this.props.currentItem.files || []}
						selectedFile={this.state.selectedFile}
						onFileSelect={this.fileSelectHandler.bind(this)}
						onAddFile={this.props.onAddFile}
						onRemoveFile={this.props.onRemoveFile}
					/>
				</div>
				<div class="code-side" id="js-code-side">
					<div
						data-code-wrap-id="0"
						id="htmlCodeEl"
						data-type="html"
						class="code-wrap"
						onTransitionEnd={this.updateCodeWrapCollapseStates.bind(this)}
					>
						<div
							class="js-code-wrap__header  code-wrap__header"
							title="Double click to toggle code pane"
						>
							<label class="btn-group" dropdow title="Click to change">
								{this.state.selectedFile ? this.state.selectedFile.name : ''}
							</label>
							<div class="code-wrap__header-right-options">
								<a
									class="js-code-collapse-btn  code-wrap__header-btn  code-wrap__collapse-btn"
									title="Toggle code pane"
								/>
							</div>
						</div>
						<UserCodeMirror
							options={{
								mode: 'htmlmixed',
								profile: 'xhtml',
								gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
								noAutocomplete: true,
								matchTags: { bothTags: true },
								emmet: true
							}}
							prefs={this.props.prefs}
							onChange={this.onHtmlCodeChange.bind(this)}
							onCreation={editor => (this.cm = editor)}
							onFocus={this.editorFocusHandler.bind(this)}
						/>
					</div>
				</div>
				<div class="demo-side" id="js-demo-side" style="">
					<iframe
						ref={el => (this.frame = el)}
						src="/user/index.html"
						frameborder="0"
						id="demo-frame"
						allowfullscreen
					/>
					<Console
						isConsoleOpen={this.state.isConsoleOpen}
						onConsoleHeaderDblClick={this.consoleHeaderDblClickHandler.bind(
							this
						)}
						onClearConsoleBtnClick={this.clearConsoleBtnClickHandler.bind(this)}
						toggleConsole={this.toggleConsole.bind(this)}
						onEvalInputKeyup={this.evalConsoleExpr.bind(this)}
						onReady={el => (this.consoleCm = el)}
					/>
				</div>
			</SplitPane>
		);
	}
}
