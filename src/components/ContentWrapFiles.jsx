import { h, Component } from 'preact';
import CodeEditor from './CodeEditor';
import { modes, HtmlModes, CssModes, JsModes } from '../codeModes';
import { log, loadJS, BASE_PATH } from '../utils';

import {
	linearizeFiles,
	assignFilePaths,
	getFileFromPath,
	getExtensionFromFileName
} from '../fileUtils';

import { SplitPane } from './SplitPane';
import { trackEvent } from '../analytics';
import CodeMirror from '../CodeMirror';
import 'codemirror/mode/meta';
import { deferred } from '../deferred';
import { SidePane } from './SidePane';
import { Console } from './Console';
import { SWITCH_FILE_EVENT } from '../commands';
import { commandPaletteService } from '../commandPaletteService';
import { PreviewDimension } from './PreviewDimension';
import { FileIcon } from './FileIcon';

const minCodeWrapSize = 33;
const PREVIEW_FRAME_HOST = window.DEBUG
	? 'http://localhost:7888'
	: `https://preview.${location.host}`;

/* global htmlCodeEl
 */
export default class ContentWrapFiles extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isConsoleOpen: false,
			isCssSettingsModalOpen: false,
			logs: [],
			editorOptions: this.getEditorOptions()
		};

		this.fileBuffers = {};
		this.updateTimer = null;
		this.htmlMode = HtmlModes.HTML;
		this.prefs = {};
		this.cmCodes = { html: props.currentItem.html, css: '', js: '' };

		window.onMessageFromConsole = this.onMessageFromConsole.bind(this);
		window.previewException = this.previewException.bind(this);
		// `clearConsole` is on window because it gets called from inside iframe also.
		window.clearConsole = this.clearConsole.bind(this);

		this.consoleHeaderDblClickHandler = this.consoleHeaderDblClickHandler.bind(
			this
		);
		this.clearConsoleBtnClickHandler = this.clearConsoleBtnClickHandler.bind(
			this
		);
		this.toggleConsole = this.toggleConsole.bind(this);
		this.evalConsoleExpr = this.evalConsoleExpr.bind(this);
	}
	shouldComponentUpdate(nextProps, nextState) {
		return (
			this.state.isConsoleOpen !== nextState.isConsoleOpen ||
			this.state.isCssSettingsModalOpen !== nextState.isCssSettingsModalOpen ||
			this.state.logs !== nextState.logs ||
			this.state.mainSplitSizes !== nextState.mainSplitSizes ||
			this.state.selectedFile !== nextState.selectedFile ||
			this.props.currentLayoutMode !== nextProps.currentLayoutMode ||
			this.props.currentItem !== nextProps.currentItem ||
			this.props.prefs !== nextProps.prefs
		);
	}
	componentWillUpdate(nextProps) {
		// TODO: REMOVE AS THIS LIFECYCLE HOOK IS DEPRECATED

		// If we get a new Item, clear file buffers and currently selected file.
		if (
			this.props.currentItem.createdOn !== nextProps.currentItem.createdOn ||
			this.props.currentItem.id !== nextProps.currentItem.id
		) {
			this.fileBuffers = {};
			this.state.selectedFile = null;
		}

		// If selectedFile got deleted
		if (
			this.state.selectedFile &&
			!getFileFromPath(
				nextProps.currentItem.files,
				this.state.selectedFile.path
			).file
		) {
			this.state.selectedFile = null;
		}

		// If the files have changed and we have a selected file (even after previous condition),
		// update the buffer with new file content (may be it got prettified?)
		if (
			nextProps.currentItem.files !== this.props.currentItem.files &&
			this.state.selectedFile &&
			this.fileBuffers[this.state.selectedFile.path]
		) {
			this.fileBuffers[this.state.selectedFile.path].model.setValue(
				getFileFromPath(
					nextProps.currentItem.files,
					this.state.selectedFile.path
				).file.content
			);
		}
	}
	componentDidUpdate() {
		const { currentItem } = this.props;
		const linearFiles = linearizeFiles(currentItem.files);

		// Select a new file if nothing is selected already or the selected file exists no more.
		if (
			currentItem &&
			currentItem.files &&
			(!this.state.selectedFile ||
				!linearFiles.includes(this.state.selectedFile))
		) {
			this.fileSelectHandler(linearFiles[0]);
		}

		// log('🚀', 'didupdate', this.props.currentItem);
		// if (this.isValidItem(this.props.currentItem)) {
		// this.refreshEditor();
		// }
	}
	componentDidMount() {
		this.props.onRef(this);

		// Listen for logs from preview frame
		window.addEventListener('message', e => {
			if (e.data && e.data.logs) {
				this.onMessageFromConsole(...e.data.logs);
			}
		});
		this.commandPaletteSubscriptions = [];
		this.commandPaletteSubscriptions.push(
			commandPaletteService.subscribe(SWITCH_FILE_EVENT, file => {
				const targetFile = getFileFromPath(
					this.props.currentItem.files,
					file.path
				);
				if (targetFile.file) {
					this.fileSelectHandler(targetFile.file);
				}
			})
		);
	}
	componentWillUnmount() {
		this.commandPaletteSubscriptions.forEach(unsubscribeFn => unsubscribeFn());
	}

	getEditorOptions(fileName = '') {
		let options = {
			gutters: [
				'error-gutter',
				'CodeMirror-linenumbers',
				'CodeMirror-foldgutter'
			],
			emmet: true
		};
		if (fileName.match(/\.css$/)) {
		} else if (fileName.match(/\.js$/)) {
			delete options.emmet;
		} else if (fileName.match(/\.html$/)) {
			// HTML
			options = {
				...options,
				noAutocomplete: true,
				matchTags: { bothTags: true }
			};
		}

		return options;
	}

	createEditorDoc(file) {
		const detectedMode = CodeMirror.findModeByExtension(
			getExtensionFromFileName(file.name)
		);
		let mode, mime;
		if (detectedMode) {
			mode = detectedMode.mode;
			mime = detectedMode.mimes ? detectedMode.mimes[0] : detectedMode.mime;

			CodeMirror.autoLoadMode(this.cm, mode);
		}
		if (mime === 'application/json') {
			mime = this.props.prefs.isMonacoEditorOn ? 'json' : 'application/ld+json';
		}
		if (!this.props.prefs.isMonacoEditorOn) {
			this.fileBuffers[file.path] = {
				model: CodeMirror.Doc(
					file.content || '',
					detectedMode ? mime : 'text/plain'
				)
			};
		} else {
			this.fileBuffers[file.path] = {
				model: monaco.editor.createModel(
					file.content || '',
					mime || 'javascript'
				)
			};
		}
	}

	onHtmlCodeChange(editor, change) {
		this.cmCodes.html = editor.getValue();

		this.props.onCodeChange(
			this.state.selectedFile,
			this.cmCodes.html,
			change.origin !== 'setValue'
		);
		this.onCodeChange(change);
	}

	onCodeChange(change) {
		clearTimeout(this.updateTimer);

		this.updateTimer = setTimeout(() => {
			// This is done so that multiple simultaneous setValue don't trigger too many preview refreshes
			// and in turn too many file writes on a single file (eg. preview.html).
			if (change.origin !== 'setValue') {
				this.setPreviewContent();

				// Track when people actually are working.
				trackEvent.previewCount = (trackEvent.previewCount || 0) + 1;
				if (trackEvent.previewCount === 4) {
					trackEvent('fn', 'usingPreview');
				}
			}
		}, this.props.prefs.previewDelay);
	}

	createPreviewFile() {
		var obj = {};
		const duplicateFiles = JSON.parse(
			JSON.stringify(this.props.currentItem.files)
		);
		// Namespace all file paths to '/user' because thats what the service worker
		// recognizes.
		const files = linearizeFiles(assignFilePaths(duplicateFiles, ''));

		files.forEach(file => {
			obj[file.path] = file.content || '';

			// Add screenlog to index.html
			if (file.name === 'index.html') {
				obj[file.path] =
					'<script src="' +
					(chrome.extension
						? chrome.extension.getURL('lib/screenlog.js')
						: `${location.origin}${
								window.DEBUG ? '' : BASE_PATH
						  }/lib/screenlog.js`) +
					'"></script>' +
					obj[file.path];
			}
		});

		// navigator.serviceWorker.controller.postMessage(obj);
		window.talkFrame.contentWindow.postMessage(obj, '*');

		if (this.detachedWindow) {
			log('✉️ Sending message to detached window');
			this.detachedWindow.postMessage(
				{ url: `${PREVIEW_FRAME_HOST}/index.html` },
				'*'
			);
		} else {
			setTimeout(() => {
				this.frame.src = `${PREVIEW_FRAME_HOST}/index.html`;
			}, 10);
		}
	}
	cleanupErrors() {
		this.editor.clearGutter('error-gutter');
	}

	showErrors(errors) {
		this.editor.showErrors(errors);
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
			this.clearConsole();
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
	}
	isValidItem(item) {
		return !!item.title;
	}
	refreshEditor() {
		if (this.state.selectedFile) {
			this.editor.setValue(this.state.selectedFile.content);
		}
		if (this.editor) {
			// this.editor.refresh();
		}
		window.cm = this.cm;

		this.clearConsole();

		// Set preview only when all modes are updated so that preview doesn't generate on partially
		// correct modes and also doesn't happen 3 times.
		Promise.all([this.updateHtmlMode(this.props.currentItem.htmlMode)]).then(
			() => this.setPreviewContent(true)
		);
	}
	applyCodemirrorSettings(prefs) {
		document.documentElement.style.setProperty(
			'--code-font-size',
			`${parseInt(prefs.fontSize, 10)}px`
		);

		// Replace correct css file in LINK tags's href
		if (prefs.editorTheme) {
			window.editorThemeLinkTag.href = `lib/codemirror/theme/${
				prefs.editorTheme
			}.css`;
		}

		window.fontStyleTag.textContent = window.fontStyleTemplate.textContent.replace(
			/fontname/g,
			(prefs.editorFont === 'other'
				? prefs.editorCustomFont
				: prefs.editorFont) || 'FiraCode'
		);
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
		const sidebarWidth = 200;
		const { currentItem, currentLayoutMode } = this.props;
		if (currentItem && currentItem.mainSizes) {
			mainSplitSizes = currentItem.mainSizes;
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
	mainSplitDragHandler() {
		this.previewDimension.update({
			w: this.frame.clientWidth,
			h: this.frame.clientHeight
		});
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
		if (file.isFolder) {
			this.props.onFolderSelect(file);
			return;
		}

		if (!this.fileBuffers[file.path]) {
			this.createEditorDoc(file);
		}

		const currentState = this.editor.saveViewState();
		if (currentState && this.state.selectedFile) {
			this.fileBuffers[this.state.selectedFile.path].state = currentState;
		}
		this.setState({
			editorOptions: this.getEditorOptions(file.name),
			selectedFile: file
		});

		this.editor.setModel(this.fileBuffers[file.path].model);
		if (this.fileBuffers[file.path].state) {
			this.editor.restoreViewState(this.fileBuffers[file.path].state);
		}

		this.editor.focus();
	}

	detachPreview() {
		if (this.detachedWindow) {
			this.detachedWindow.focus();
			return;
		}
		const iframeBounds = this.frame.getBoundingClientRect();
		const iframeWidth = iframeBounds.width;
		const iframeHeight = iframeBounds.height;
		document.body.classList.add('is-detached-mode');

		this.detachedWindow = window.open(
			'./preview.html',
			'Web Maker',
			`width=${iframeWidth},height=${iframeHeight},resizable,scrollbars=yes,status=1`
		);
		// Trigger initial render in detached window
		setTimeout(() => {
			this.setPreviewContent(true);
		}, 1500);

		var intervalID = window.setInterval(checkWindow => {
			if (this.detachedWindow && this.detachedWindow.closed) {
				clearInterval(intervalID);
				document.body.classList.remove('is-detached-mode');
				this.detachedWindow = null;
				// Update main frame preview to get latest changes (which were not
				// getting reflected while detached window was open)
				this.setPreviewContent(true);
			}
		}, 500);
	}

	onMessageFromConsole() {
		const logs = [...arguments].map(arg => {
			if (
				arg &&
				arg.indexOf &&
				arg.indexOf('filesystem:chrome-extension') !== -1
			) {
				return arg.replace(
					/filesystem:chrome-extension.*\.js:(\d+):*(\d*)/g,
					'script $1:$2'
				);
			}
			return arg;
		});
		this.setState({
			logs: [...this.state.logs, ...logs]
		});
	}

	previewException(error) {
		console.error('Possible infinite loop detected.', error.stack);
		this.onMessageFromConsole('Possible infinite loop detected.', error.stack);
	}

	toggleConsole() {
		this.setState({
			isConsoleOpen: !this.state.isConsoleOpen
		});
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
		this.setState({ logs: [] });
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
			this.frame.contentWindow.postMessage({ exprToEval: e.target.value }, '*');

			/* eslint-enable no-underscore-dangle */

			e.target.value = '';
			trackEvent('fn', 'evalConsoleExpr');
		}
	}

	prettifyBtnClickHandler() {
		this.props.onPrettifyBtnClick(this.state.selectedFile);
		trackEvent('ui', 'prettifyBtnClick');
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
				onDrag={this.mainSplitDragHandler.bind(this)}
				onDragEnd={this.mainSplitDragEndHandler.bind(this)}
			>
				<div id="js-sidebar">
					<SidePane
						files={this.props.currentItem.files || []}
						selectedFile={this.state.selectedFile}
						onFileSelect={this.fileSelectHandler.bind(this)}
						onAddFile={this.props.onAddFile}
						onRemoveFile={this.props.onRemoveFile}
						onRenameFile={this.props.onRenameFile}
						onFileDrop={this.props.onFileDrop}
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
						<div class="js-code-wrap__header  code-wrap__header">
							<div class="flex flex-v-center">
								<FileIcon file={this.state.selectedFile} />
								{this.state.selectedFile ? this.state.selectedFile.name : ''}
							</div>
							<div class="code-wrap__header-right-options">
								<button
									class="btn btn--dark"
									aria-label="Format code"
									title="Format Code"
									onClick={this.prettifyBtnClickHandler.bind(this)}
								>
									<svg>
										<use xlinkHref="#code-brace-icon" />
									</svg>
								</button>
								<a
									class="js-code-collapse-btn  code-wrap__header-btn  code-wrap__collapse-btn"
									title="Toggle code pane"
								/>
							</div>
						</div>
						<CodeEditor
							type={this.props.prefs.isMonacoEditorOn ? 'monaco' : 'codemirror'}
							value={
								this.state.selectedFile ? this.state.selectedFile.content : ''
							}
							options={this.state.editorOptions}
							prefs={this.props.prefs}
							onChange={this.onHtmlCodeChange.bind(this)}
							ref={editor => (this.editor = editor)}
							onFocus={this.editorFocusHandler.bind(this)}
						/>
					</div>
				</div>
				<div class="demo-side" id="js-demo-side" style="">
					<iframe
						ref={el => (this.frame = el)}
						src={`${PREVIEW_FRAME_HOST}/index.html`}
						frameborder="0"
						id="demo-frame"
						allowfullscreen
					/>
					<iframe src={`${PREVIEW_FRAME_HOST}/talk.html`} id="talkFrame" />
					<PreviewDimension ref={comp => (this.previewDimension = comp)} />
					<Console
						logs={this.state.logs}
						isConsoleOpen={this.state.isConsoleOpen}
						onConsoleHeaderDblClick={this.consoleHeaderDblClickHandler}
						onClearConsoleBtnClick={this.clearConsoleBtnClickHandler}
						toggleConsole={this.toggleConsole}
						onEvalInputKeyup={this.evalConsoleExpr}
					/>
				</div>
			</SplitPane>
		);
	}
}
2;
