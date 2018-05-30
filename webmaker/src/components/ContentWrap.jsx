import { h, Component } from 'preact';
import UserCodeMirror from './UserCodeMirror.jsx';
import { computeHtml, computeCss, computeJs } from '../computes';
import { HtmlModes, CssModes, JsModes } from '../codeModes';

const BASE_PATH = chrome.extension || window.DEBUG ? '/' : '/app';

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
		// utils.log('🔎 setPreviewContent', isForced);
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
		this.cm.html.setValue(this.cmCodes.html);
		this.cm.css.setValue(this.cmCodes.css);
		this.cm.js.setValue(this.cmCodes.js);
		this.setPreviewContent(true);
		console.log('componentdidupdate', this.props.currentItem);
	}

	render() {
		return (
			<div class="content-wrap  flex  flex-grow">
				<div class="code-side" id="js-code-side">
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
				</div>
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
			</div>
		);
	}
}
