import { h, Component } from 'preact';
import UserCodeMirror from './UserCodeMirror.jsx';
import { computeHtml, computeCss, computeJs } from '../computes';
import { HtmlModes, CssModes, JsModes } from '../codeModes';
import { log } from '../utils';
import { SplitPane } from './SplitPane.jsx';

const BASE_PATH = chrome.extension || window.DEBUG ? '/' : '/app';
const minCodeWrapSize = 33;

export default class ContentWrap extends Component {
	constructor(props) {
		super(props);
		this.updateTimer = null;
		this.updateDelay = 500;
		this.htmlMode = HtmlModes.HTML;
		this.jsMode = HtmlModes.HTML;
		this.cssMode = CssModes.CSS;
		this.jsMode = JsModes.JS;
		this.prefs = {};
		this.codeInPreview = { html: null, css: null, js: null };
		this.cmCodes = { html: props.currentItem.html, css: '', js: '' };
		this.cm = {};
	}

	onHtmlCodeChange(editor, change) {
		this.cmCodes.html = editor.getValue();
		this.props.onCodeChange('html', this.cmCodes.html);
		this.onCodeChange(editor, change);
	}
	onCssCodeChange(editor, change) {
		this.cmCodes.css = editor.getValue();
		this.props.onCodeChange('css', this.cmCodes.css);
		this.onCodeChange(editor, change);
	}
	onJsCodeChange(editor, change) {
		this.cmCodes.js = editor.getValue();
		this.props.onCodeChange('js', this.cmCodes.js);
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

				/* saveBtn.classList.add('is-marked');
				this.unsavedEditCount += 1;
				if (
					this.unsavedEditCount % this.unsavedEditWarningCount === 0 &&
					this.unsavedEditCount >= this.unsavedEditWarningCount
				) {
					saveBtn.classList.add('animated');
					saveBtn.classList.add('wobble');
					saveBtn.addEventListener('animationend', () => {
						saveBtn.classList.remove('animated');
						saveBtn.classList.remove('wobble');
					});
				} */

				// Track when people actually are working.
				// trackEvent.previewCount = (trackEvent.previewCount || 0) + 1;
				// if (trackEvent.previewCount === 4) {
				// trackEvent('fn', 'usingPreview');
				// }
			}
		}, this.updateDelay);
	}
	clearConsole() {}

	/* eslint max-params: ["error", 4] */
	getCompleteHtml(html, css, js, isForExport) {
		if (!this.props.currentItem) {
			return '';
		}
		var externalJs = this.props.currentItem.externalLibs.js
			.split('\n')
			.reduce(function(scripts, url) {
				return scripts + (url ? '\n<script src="' + url + '"></script>' : '');
			}, '');
		var externalCss = this.props.currentItem.externalLibs.css
			.split('\n')
			.reduce(function(links, url) {
				return (
					links +
					(url ? '\n<link rel="stylesheet" href="' + url + '"></link>' : '')
				);
			}, '');
		var contents =
			'<!DOCTYPE html>\n' +
			'<html>\n<head>\n' +
			'<meta charset="UTF-8" />\n' +
			externalCss +
			'\n' +
			'<style id="webmakerstyle">\n' +
			css +
			'\n</style>\n' +
			'</head>\n' +
			'<body>\n' +
			html +
			'\n' +
			externalJs +
			'\n';

		if (!isForExport) {
			contents +=
				'<script src="' +
				(chrome.extension
					? chrome.extension.getURL('lib/screenlog.js')
					: `${location.origin}${BASE_PATH}/lib/screenlog.js`) +
				'"></script>';
		}

		if (this.jsMode === JsModes.ES6) {
			contents +=
				'<script src="' +
				(chrome.extension
					? chrome.extension.getURL('lib/transpilers/babel-polyfill.min.js')
					: `${
							location.origin
						}${BASE_PATH}/lib/transpilers/babel-polyfill.min.js`) +
				'"></script>';
		}

		if (typeof js === 'string') {
			contents += '<script>\n' + js + '\n//# sourceURL=userscript.js';
		} else {
			var origin = chrome.i18n.getMessage()
				? `chrome-extension://${chrome.i18n.getMessage('@@extension_id')}`
				: `${location.origin}`;
			contents +=
				'<script src="' + `filesystem:${origin}/temporary/script.js` + '">';
		}
		contents += '\n</script>\n</body>\n</html>';

		return contents;
	}

	writeFile(name, blob, cb) {
		var fileWritten = false;
		function getErrorHandler(type) {
			return function() {
				utils.log(arguments);
				trackEvent('fn', 'error', type);
				// When there are too many write errors, show a message.
				writeFile.errorCount = (writeFile.errorCount || 0) + 1;
				if (writeFile.errorCount === 4) {
					setTimeout(function() {
						alert(
							"Oops! Seems like your preview isn't updating. It's recommended to switch to the web app: https://webmakerapp.com/app/.\n\n If you still want to get the extension working, please try the following steps until it fixes:\n - Refresh Web Maker\n - Restart browser\n - Update browser\n - Reinstall Web Maker (don't forget to export all your creations from saved items pane (click the OPEN button) before reinstalling)\n\nIf nothing works, please tweet out to @webmakerApp."
						);
						trackEvent('ui', 'writeFileMessageSeen');
					}, 1000);
				}
			};
		}

		// utils.log('writing file ', name);
		window.webkitRequestFileSystem(
			window.TEMPORARY,
			1024 * 1024 * 5,
			function(fs) {
				fs.root.getFile(
					name,
					{ create: true },
					function(fileEntry) {
						fileEntry.createWriter(fileWriter => {
							function onWriteComplete() {
								if (fileWritten) {
									// utils.log('file written ', name);
									return cb();
								}
								fileWritten = true;
								// Set the write pointer to starting of file
								fileWriter.seek(0);
								fileWriter.write(blob);
								return false;
							}
							fileWriter.onwriteend = onWriteComplete;
							// Empty the file contents
							fileWriter.truncate(0);
							// utils.log('truncating file ', name);
						}, getErrorHandler('createWriterFail'));
					},
					getErrorHandler('getFileFail')
				);
			},
			getErrorHandler('webkitRequestFileSystemFail')
		);
	}

	createPreviewFile(html, css, js) {
		const shouldInlineJs =
			!window.webkitRequestFileSystem || !window.IS_EXTENSION;
		var contents = this.getCompleteHtml(html, css, shouldInlineJs ? js : null);
		var blob = new Blob([contents], { type: 'text/plain;charset=UTF-8' });
		var blobjs = new Blob([js], { type: 'text/plain;charset=UTF-8' });

		// Track if people have written code.
		// if (!trackEvent.hasTrackedCode && (html || css || js)) {
		// trackEvent('fn', 'hasCode');
		// trackEvent.hasTrackedCode = true;
		// }

		if (shouldInlineJs) {
			if (this.detachedWindow) {
				utils.log('✉️ Sending message to detached window');
				scope.detachedWindow.postMessage({ contents }, '*');
			} else {
				this.frame.src = this.frame.src;
				setTimeout(() => {
					this.frame.contentDocument.open();
					this.frame.contentDocument.write(contents);
					this.frame.contentDocument.close();
				}, 10);
			}
		} else {
			// we need to store user script in external JS file to prevent inline-script
			// CSP from affecting it.
			writeFile('script.js', blobjs, function() {
				writeFile('preview.html', blob, function() {
					var origin = chrome.i18n.getMessage()
						? `chrome-extension://${chrome.i18n.getMessage('@@extension_id')}`
						: `${location.origin}`;
					var src = `filesystem:${origin}/temporary/preview.html`;
					if (scope.detachedWindow) {
						scope.detachedWindow.postMessage(src, '*');
					} else {
						frame.src = src;
					}
				});
			});
		}
	}

	/**
	 * Generates the preview from the current code.
	 * @param {boolean} isForced Should refresh everything without any check or not
	 * @param {boolean} isManual Is this a manual preview request from user?
	 */
	setPreviewContent(isForced, isManual) {
		if (!this.prefs.autoPreview && !isManual) {
			// return;
		}

		if (!this.prefs.preserveConsoleLogs) {
			this.clearConsole();
		}

		var currentCode = {
			html: this.cmCodes.html,
			css: this.cmCodes.css,
			js: this.cmCodes.js
		};
		log('🔎 setPreviewContent', isForced);
		const targetFrame = this.detachedWindow
			? this.detachedWindow.document.querySelector('iframe')
			: this.frame;

		// If just CSS was changed (and everything shudn't be empty),
		// change the styles inside the iframe.
		if (
			!isForced &&
			currentCode.html === this.codeInPreview.html &&
			currentCode.js === this.codeInPreview.js
		) {
			computeCss(currentCode.css, this.cssMode).then(function(css) {
				if (targetFrame.contentDocument.querySelector('#webmakerstyle')) {
					targetFrame.contentDocument.querySelector(
						'#webmakerstyle'
					).textContent = css;
				}
			});
		} else {
			var htmlPromise = computeHtml(currentCode.html, this.htmlMode);
			var cssPromise = computeCss(currentCode.css, this.cssMode);
			var jsPromise = computeJs(currentCode.js, this.jsMode);
			Promise.all([htmlPromise, cssPromise, jsPromise]).then(result => {
				this.createPreviewFile(result[0], result[1], result[2]);
			});
		}

		this.codeInPreview.html = currentCode.html;
		this.codeInPreview.css = currentCode.css;
		this.codeInPreview.js = currentCode.js;
	}
	componentDidUpdate() {
		this.cmCodes.html = this.props.currentItem.html;
		this.cmCodes.css = this.props.currentItem.css;
		this.cmCodes.js = this.props.currentItem.js;
		this.cm.html.setValue(this.cmCodes.html || '');
		this.cm.css.setValue(this.cmCodes.css || '');
		this.cm.js.setValue(this.cmCodes.js || '');
		// this.setPreviewContent(true);
		// console.log('componentdidupdate', this.props.currentItem);
	}
	componentDidMount() {
		this.props.onRef(this);
	}
	applyCodemirrorSettings(prefs) {
		if (!this.cm) {
			return;
		}
		$('#js-html-code').querySelector('.CodeMirror').style.fontSize = $(
			'#js-css-code'
		).querySelector('.CodeMirror').style.fontSize = $(
			'#js-js-code'
		).querySelector('.CodeMirror').style.fontSize = `${parseInt(
			prefs.fontSize,
			10
		)}px`;

		// consoleEl.querySelector('.CodeMirror').style.fontSize = prefs.fontSize;

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

		['html', 'js', 'css'].forEach(type => {
			this.cm[type].setOption('indentWithTabs', prefs.indentWith !== 'spaces');
			this.cm[type].setOption(
				'blastCode',
				prefs.isCodeBlastOn ? { effect: 2, shake: false } : false
			);
			this.cm[type].setOption('indentUnit', +prefs.indentSize);
			this.cm[type].setOption('tabSize', +prefs.indentSize);
			this.cm[type].setOption('theme', prefs.editorTheme);

			// this.cm[type].setOption('keyMap', prefs.keymap);
			this.cm[type].setOption('lineWrapping', prefs.lineWrap);
			this.cm[type].refresh();
		});
	}

	// Returns the sizes of main code & preview panes.
	getMainSplitSizesToApply() {
		var mainSplitSizes;
		const { currentItem, currentLayoutMode } = this.props;
		if (currentItem && currentItem.mainSizes) {
			// For layout mode 3, main panes are reversed using flex-direction.
			// So we need to apply the saved sizes in reverse order.
			mainSplitSizes =
				currentLayoutMode === 3
					? [currentItem.mainSizes[1], currentItem.mainSizes[0]]
					: currentItem.mainSizes;
		} else {
			mainSplitSizes = currentLayoutMode === 5 ? [75, 25] : [50, 50];
		}
		return mainSplitSizes;
	}

	// Check all the code wrap if they are minimized or maximized
	updateCodeWrapCollapseStates() {
		// This is debounced!
		clearTimeout(this.updateCodeWrapCollapseStates.timeout);
		updateCodeWrapCollapseStates.timeout = setTimeout(function() {
			const prop =
				currentLayoutMode === 2 || currentLayoutMode === 5 ? 'width' : 'height';
			[htmlCode, cssCode, jsCode].forEach(function(el) {
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

	toggleCodeWrapCollapse(codeWrapEl) {
		if (
			codeWrapEl.classList.contains('is-minimized') ||
			codeWrapEl.classList.contains('is-maximized')
		) {
			codeWrapEl.classList.remove('is-minimized');
			codeWrapEl.classList.remove('is-maximized');
			this.codeSplitInstance.setSizes([33.3, 33.3, 33.3]);
		} else {
			const id = parseInt(codeWrapEl.dataset.codeWrapId, 10);
			var arr = [
				`${minCodeWrapSize}px`,
				`${minCodeWrapSize}px`,
				`${minCodeWrapSize}px`
			];
			arr[id] = `calc(100% - ${minCodeWrapSize * 2}px)`;

			this.codeSplitInstance.setSizes(arr);
			codeWrapEl.classList.add('is-maximized');
		}
	}

	collapseBtnHandler(e) {
		var codeWrapParent =
			e.currentTarget.parentElement.parentElement.parentElement;
		this.toggleCodeWrapCollapse(codeWrapParent);
		trackEvent('ui', 'paneCollapseBtnClick', codeWrapParent.dataset.type);
	}

	resetSplitting() {
		const codeSplitSizes = this.getCodeSplitSizes();
		this.setState({
			codeSplitSizes: this.codeSplitSizes
		});
	}
	getCodeSplitSizes() {
		if (this.props.currentItem && this.props.currentItem.sizes) {
			return this.props.currentItem.sizes;
		} else {
			return [33.33, 33.33, 33.33];
		}
	}

	mainSplitDragEndHandler() {
		if (this.props.prefs.refreshOnResize) {
			// Running preview updation in next call stack, so that error there
			// doesn't affect this dragend listener.
			setTimeout(() => {
				this.setPreviewContent(true);
			}, 1);
		}
	}
	codeSplitDragStart() {
		document.body.classList.add('is-dragging');
	}
	codeSplitDragEnd() {
		this.updateCodeWrapCollapseStates();
		document.body.classList.remove('is-dragging');
	}

	render() {
		return (
			<SplitPane
				class="content-wrap  flex  flex-grow"
				sizes={this.getMainSplitSizesToApply()}
				minSize={150}
				direction={
					this.props.currentLayoutMode === 2 ? 'vertical' : 'horizontal'
				}
				onDragEnd={this.mainSplitDragEndHandler.bind(this)}
			>
				<SplitPane
					class="code-side"
					id="js-code-side"
					sizes={this.state.codeSplitSizes}
					minSize={minCodeWrapSize}
					direction={
						this.props.currentLayoutMode === 2 ||
						this.props.currentLayoutMode === 5
							? 'horizontal'
							: 'vertical'
					}
					onDragStart={this.codeSplitDragStart.bind(this)}
					onDragend={this.codeSplitDragEnd.bind(this)}
					onSplit={splitInstance => (this.codeSplitInstance = splitInstance)}
				>
					<div
						data-code-wrap-id="0"
						id="js-html-code"
						data-type="html"
						class="code-wrap"
					>
						<div
							class="js-code-wrap__header  code-wrap__header"
							title="Double click to toggle code pane"
						>
							<label class="btn-group" dropdow title="Click to change">
								<span id="js-html-mode-label" class="code-wrap__header-label">
									HTML
								</span>
								<span class="caret" />
								<select
									data-type="html"
									class="js-mode-select  hidden-select"
									name=""
								>
									<option value="html">HTML</option>
									<option value="markdown">Markdown</option>
									<option value="jade">Pug</option>
								</select>
							</label>
							<div class="code-wrap__header-right-options">
								<a
									class="js-code-collapse-btn  code-wrap__header-btn  code-wrap__collapse-btn"
									title="Toggle code pane"
									onClick={this.collapseBtnHandler.bind(this)}
								/>
							</div>
						</div>
						<UserCodeMirror
							options={{
								mode: 'htmlmixed',
								profile: 'xhtml',
								gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
								noAutocomplete: true,
								matchTags: { bothTags: true }
							}}
							onChange={this.onHtmlCodeChange.bind(this)}
							onCreation={el => (this.cm.html = el)}
						/>
					</div>
					<div
						data-code-wrap-id="1"
						id="js-css-code"
						data-type="css"
						class="code-wrap"
					>
						<div
							class="js-code-wrap__header  code-wrap__header"
							title="Double click to toggle code pane"
						>
							<label class="btn-group" title="Click to change">
								<span id="js-css-mode-label" class="code-wrap__header-label">
									CSS
								</span>
								<span class="caret" />
								<select
									data-type="css"
									class="js-mode-select  hidden-select"
									name=""
								>
									<option value="css">CSS</option>
									<option value="scss">SCSS</option>
									<option value="sass">SASS</option>
									<option value="less">LESS</option>
									<option value="stylus">Stylus</option>
									<option value="acss">Atomic CSS</option>
								</select>
							</label>
							<div class="code-wrap__header-right-options">
								<a
									href="#"
									id="cssSettingsBtn"
									title="Atomic CSS configuration"
									d-click="openCssSettingsModal"
									class="code-wrap__header-btn hide"
								>
									Settings
								</a>
								<a
									class="js-code-collapse-btn  code-wrap__header-btn  code-wrap__collapse-btn"
									title="Toggle code pane"
									onClick={this.collapseBtnHandler.bind(this)}
								/>
							</div>
						</div>
						<UserCodeMirror
							options={{
								mode: 'css',
								gutters: [
									'error-gutter',
									'CodeMirror-linenumbers',
									'CodeMirror-foldgutter'
								],
								noAutocomplete: true

								// emmet: true
							}}
							onChange={this.onCssCodeChange.bind(this)}
							onCreation={el => (this.cm.css = el)}
						/>
					</div>
					<div
						data-code-wrap-id="2"
						id="js-js-code"
						data-type="js"
						class="code-wrap"
					>
						<div
							class="js-code-wrap__header  code-wrap__header"
							title="Double click to toggle code pane"
						>
							<label class="btn-group" title="Click to change">
								<span id="js-js-mode-label" class="code-wrap__header-label">
									JS
								</span>
								<span class="caret" />
								<select data-type="js" class="js-mode-select  hidden-select">
									<option value="js">JS</option>
									<option value="coffee">CoffeeScript</option>
									<option value="es6">ES6 (Babel)</option>
									<option value="typescript">TypeScript</option>
								</select>
							</label>
							<div class="code-wrap__header-right-options">
								<a
									class="js-code-collapse-btn  code-wrap__header-btn  code-wrap__collapse-btn"
									title="Toggle code pane"
									onClick={this.collapseBtnHandler.bind(this)}
								/>
							</div>
						</div>
						<UserCodeMirror
							options={{
								mode: 'javascript',
								gutters: [
									'error-gutter',
									'CodeMirror-linenumbers',
									'CodeMirror-foldgutter'
								],
								noAutocomplete: true
							}}
							onChange={this.onJsCodeChange.bind(this)}
							onCreation={el => (this.cm.js = el)}
						/>
					</div>
				</SplitPane>
				<div class="demo-side" id="js-demo-side">
					<iframe
						ref={el => (this.frame = el)}
						src="about://blank"
						frameborder="0"
						id="demo-frame"
						allowfullscreen
					/>
					<div id="consoleEl" class="console is-minimized">
						<div id="consoleLogEl" class="console__log" class="code">
							<div
								class="js-console__header  code-wrap__header"
								title="Double click to toggle console"
							>
								<span class="code-wrap__header-label">
									Console (<span id="logCountEl">0</span>)
								</span>
								<div class="code-wrap__header-right-options">
									<a
										class="code-wrap__header-btn"
										title="Clear console (CTRL + L)"
										d-click="onClearConsoleBtnClick"
									>
										<svg>
											<use xlinkHref="#cancel-icon" />
										</svg>
									</a>
									<a
										class="code-wrap__header-btn  code-wrap__collapse-btn"
										title="Toggle console"
										d-click="toggleConsole"
									/>
								</div>
							</div>
						</div>
						<div
							id="consolePromptEl"
							class="console__prompt flex flex-v-center"
						>
							<svg width="18" height="18" fill="#346fd2">
								Chevron
							</svg>
							<input d-keyup="evalConsoleExpr" class="console-exec-input" />
						</div>
					</div>
				</div>
			</SplitPane>
		);
	}
}
