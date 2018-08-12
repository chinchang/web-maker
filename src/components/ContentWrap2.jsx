import { h, Component } from 'preact';
import UserCodeMirror from './UserCodeMirror.jsx';
import { computeHtml, computeCss, computeJs } from '../computes';
import { modes, HtmlModes, CssModes, JsModes } from '../codeModes';
import { log, writeFile, loadJS, getCompleteHtml } from '../utils';
import { SplitPane } from './SplitPane.jsx';
import { trackEvent } from '../analytics';
import CodeMirror from '../CodeMirror';
import CodeMirrorBox from './CodeMirrorBox';
import { deferred } from '../deferred';
const minCodeWrapSize = 33;

/* global htmlCodeEl, jsCodeEl, cssCodeEl, logCountEl
*/
class Sidebar extends Component {
	render() {
		return (
			<div class="sidebar">
				Sidebar
				{this.props.files.map(file => (
					<div>
						<button
							class="sidebar__file"
							type="button"
							onClick={this.props.onFileSelect.bind(null, file)}
						>
							{file.name}
						</button>
					</div>
				))}
			</div>
		);
	}
}

export default class ContentWrap2 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isConsoleOpen: false,
			isCssSettingsModalOpen: false,
			files: [
				{ name: 'index.html' },
				{ name: 'style.css' },
				{ name: 'script.js' }
			]
		};
		this.state.selectedFile = this.state.files[0];
		this.updateTimer = null;
		this.updateDelay = 500;
		this.htmlMode = HtmlModes.HTML;
		this.prefs = {};
		this.codeInPreview = { html: null, css: null, js: null };
		this.cmCodes = { html: props.currentItem.html, css: '', js: '' };
		this.cm = {};
		this.logCount = 0;
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
	componentDidUpdate() {
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

	onHtmlCodeChange(editor, change) {
		this.cmCodes.html = editor.getValue();
		this.state.selectedFile.content = editor.getValue();
		this.props.onCodeChange(
			'html',
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
		const shouldInlineJs =
			!window.webkitRequestFileSystem || !window.IS_EXTENSION;
		var contents = getCompleteHtml(
			html,
			css,
			shouldInlineJs ? js : null,
			this.props.currentItem
		);
		var blob = new Blob([contents], { type: 'text/plain;charset=UTF-8' });
		var blobjs = new Blob([js], { type: 'text/plain;charset=UTF-8' });

		// Track if people have written code.
		if (!trackEvent.hasTrackedCode && (html || css || js)) {
			trackEvent('fn', 'hasCode');
			trackEvent.hasTrackedCode = true;
		}

		if (shouldInlineJs) {
			if (this.detachedWindow) {
				log('✉️ Sending message to detached window');
				this.detachedWindow.postMessage({ contents }, '*');
			} else {
				var obj = {};
				this.state.files.forEach(file => {
					obj[`/user/${file.name}`] = file.content || '';
				});
				// obj[`/user/index.html`] = this.cmCodes.html;

				navigator.serviceWorker.controller.postMessage(obj);
				this.frame.src = '/user/index.html';
			}
		} else {
			// we need to store user script in external JS file to prevent inline-script
			// CSP from affecting it.
			writeFile('script.js', blobjs, () => {
				writeFile('preview.html', blob, () => {
					var origin = chrome.i18n.getMessage()
						? `chrome-extension://${chrome.i18n.getMessage('@@extension_id')}`
						: `${location.origin}`;
					var src = `filesystem:${origin}/temporary/preview.html`;
					if (this.detachedWindow) {
						this.detachedWindow.postMessage(src, '*');
					} else {
						this.frame.src = src;
					}
				});
			});
		}
	}
	cleanupErrors(lang) {
		this.cm[lang].clearGutter('error-gutter');
	}

	showErrors(lang, errors) {
		var editor = this.cm[lang];
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
		this.cleanupErrors('html');
		// this.cleanupErrors('css');
		// this.cleanupErrors('js');

		var currentCode = {
			html: this.cmCodes.html,
			css: this.cmCodes.css,
			js: this.cmCodes.js
		};
		log('🔎 setPreviewContent', isForced);
		const targetFrame = this.detachedWindow
			? this.detachedWindow.document.querySelector('iframe')
			: this.frame;

		const cssMode = this.props.currentItem.cssMode;
		var htmlPromise = computeHtml(
			currentCode.html,
			this.props.currentItem.htmlMode
		);
		var cssPromise = computeCss(
			cssMode === CssModes.ACSS ? currentCode.html : currentCode.css,
			cssMode,
			this.props.currentItem.cssSettings
		);
		var jsPromise = computeJs(
			currentCode.js,
			this.props.currentItem.jsMode,
			true,
			this.props.prefs.infiniteLoopTimeout
		);
		Promise.all([htmlPromise, cssPromise, jsPromise]).then(result => {
			if (cssMode === CssModes.ACSS) {
				this.cm.css.setValue(result[1].code || '');
			}

			this.createPreviewFile(
				result[0].code || '',
				result[1].code || '',
				result[2].code || ''
			);
			result.forEach(resultItem => {
				if (resultItem.errors) {
					this.showErrors(resultItem.errors.lang, resultItem.errors.data);
				}
			});
		});

		this.codeInPreview.html = currentCode.html;
		this.codeInPreview.css = currentCode.css;
		this.codeInPreview.js = currentCode.js;
	}
	isValidItem(item) {
		return !!item.title;
	}
	refreshEditor() {
		this.cmCodes.html = this.props.currentItem.html;
		this.cm.html.setValue(this.cmCodes.html || '');
		this.cm.html.refresh();

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

		['html'].forEach(type => {
			this.cm[type].setOption('indentWithTabs', prefs.indentWith !== 'spaces');
			this.cm[type].setOption(
				'blastCode',
				prefs.isCodeBlastOn ? { effect: 2, shake: false } : false
			);
			this.cm[type].setOption('indentUnit', +prefs.indentSize);
			this.cm[type].setOption('tabSize', +prefs.indentSize);
			this.cm[type].setOption('theme', prefs.editorTheme);

			this.cm[type].setOption('keyMap', prefs.keymap);
			this.cm[type].setOption('lineWrapping', prefs.lineWrap);
			this.cm[type].refresh();
		});
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
		this.cm.html.setOption('mode', modes[value].cmMode);
		CodeMirror.autoLoadMode(
			this.cm.html,
			modes[value].cmPath || modes[value].cmMode
		);
		return this.handleModeRequirements(value);
	}
	updateCssMode(value) {
		// this.props.onCodeModeChange('css', value);
		// this.props.currentItem.cssMode = value;
		this.cm.html.setOption('mode', modes[value].cmMode);
		this.cm.html.setOption('readOnly', modes[value].cmDisable);
		/* window.cssSettingsBtn.classList[
			modes[value].hasSettings ? 'remove' : 'add'
		]('hide'); */
		CodeMirror.autoLoadMode(
			this.cm.html,
			modes[value].cmPath || modes[value].cmMode
		);
		return this.handleModeRequirements(value);
	}
	updateJsMode(value) {
		this.cm.html.setOption('mode', modes[value].cmMode);
		CodeMirror.autoLoadMode(
			this.cm.html,
			modes[value].cmPath || modes[value].cmMode
		);
		return this.handleModeRequirements(value);
	}
	codeModeChangeHandler(e) {
		var mode = e.target.value;
		var type = e.target.dataset.type;
		var currentMode = this.props.currentItem[
			type === 'html' ? 'htmlMode' : type === 'css' ? 'cssMode' : 'jsMode'
		];
		if (currentMode !== mode) {
			if (type === 'html') {
				this.updateHtmlMode(mode).then(() => this.setPreviewContent(true));
			}
			trackEvent('ui', 'updateCodeMode', mode);
		}
	}

	getDemoFrame(callback) {
		callback(this.frame);
	}
	editorFocusHandler(editor) {
		this.props.onEditorFocus(editor);
	}
	fileSelectHandler(file) {
		this.setState({ selectedFile: file });
		var cmMode = 'html';
		if (file.name.match(/\.css$/)) {
			this.updateCssMode('css');
		} else if (file.name.match(/\.js$/)) {
			this.updateCssMode('js');
		} else {
			this.updateCssMode('html');
		}
		this.cm.html.setValue(file.content || '');
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
					<Sidebar
						files={this.state.files}
						onFileSelect={this.fileSelectHandler.bind(this)}
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
								{this.state.selectedFile.name}
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
							onCreation={el => (this.cm.html = el)}
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
				</div>
			</SplitPane>
		);
	}
}
