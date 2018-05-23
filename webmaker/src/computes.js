import {
	deferred
} from './deferred';
import {
	HtmlModes,
	CssModes,
	JsModes
} from './codeModes';

// computeHtml, computeCss & computeJs evaluate the final code according
// to whatever mode is selected and resolve the returned promise with the code.
export function computeHtml(code, mode) {
	var d = deferred();
	if (mode === HtmlModes.HTML) {
		d.resolve(code);
	} else if (mode === HtmlModes.MARKDOWN) {
		d.resolve(marked ? marked(code) : code);
	} else if (mode === HtmlModes.JADE) {
		d.resolve(window.jade ? jade.render(code) : code);
	}

	return d.promise;
}
export function computeCss(code, mode) {
	var d = deferred();
	// cleanupErrors('css');

	if (mode === CssModes.CSS) {
		d.resolve(code);
	} else if (mode === CssModes.SCSS || mode === CssModes.SASS) {
		if (sass && code) {
			sass.compile(
				code, {
					indentedSyntax: cssMode === CssModes.SASS
				},
				function (result) {
					// Something was wrong
					if (result.line && result.message) {
						showErrors('css', [{
							lineNumber: result.line - 1,
							message: result.message
						}]);
					}
					d.resolve(result.text);
				}
			);
		} else {
			d.resolve(code);
		}
	} else if (mode === CssModes.LESS) {
		less.render(code).then(
			function (result) {
				d.resolve(result.css);
			},
			function (error) {
				showErrors('css', [{
					lineNumber: error.line,
					message: error.message
				}]);
			}
		);
	} else if (mode === CssModes.STYLUS) {
		stylus(code).render(function (error, result) {
			if (error) {
				window.err = error;
				// Last line of message is the actual message
				var tempArr = error.message.split('\n');
				tempArr.pop(); // This is empty string in the end
				showErrors('css', [{
					lineNumber: +error.message.match(/stylus:(\d+):/)[1] - 298,
					message: tempArr.pop()
				}]);
			}
			d.resolve(result);
		});
	} else if (mode === CssModes.ACSS) {
		if (!window.atomizer) {
			d.resolve('');
		} else {
			const html = scope.cm.html.getValue();
			const foundClasses = atomizer.findClassNames(html);
			var finalConfig;
			try {
				finalConfig = atomizer.getConfig(
					foundClasses,
					JSON.parse(scope.acssSettingsCm.getValue())
				);
			} catch (e) {
				finalConfig = atomizer.getConfig(foundClasses, {});
			}
			const acss = atomizer.getCss(finalConfig);
			scope.cm.css.setValue(acss);
			d.resolve(acss);
		}
	}

	return d.promise;
}
export function computeJs(code, mode, shouldPreventInfiniteLoops) {
	var d = deferred();

	// cleanupErrors('js');
	if (!code) {
		d.resolve('');
		return d.promise;
	}

	if (mode === JsModes.JS) {
		d.resolve(code);
		return d.promise;

		try {
			esprima.parse(code, {
				tolerant: true
			});
		} catch (e) {
			showErrors('js', [{
				lineNumber: e.lineNumber - 1,
				message: e.description
			}]);
		} finally {
			if (shouldPreventInfiniteLoops !== false) {
				code = utils.addInfiniteLoopProtection(code, {
					timeout: prefs.infiniteLoopTimeout
				});
			}
			d.resolve(code);
		}
	} else if (mode === JsModes.COFFEESCRIPT) {
		if (!window.CoffeeScript) {
			d.resolve('');
			return d.promise;
		}
		try {
			code = CoffeeScript.compile(code, {
				bare: true
			});
		} catch (e) {
			showErrors('js', [{
				lineNumber: e.location.first_line,
				message: e.message
			}]);
		} finally {
			if (shouldPreventInfiniteLoops !== false) {
				code = utils.addInfiniteLoopProtection(code, {
					timeout: prefs.infiniteLoopTimeout
				});
			}
			d.resolve(code);
		}
	} else if (mode === JsModes.ES6) {
		if (!window.Babel) {
			d.resolve('');
			return d.promise;
		}
		try {
			esprima.parse(code, {
				tolerant: true,
				jsx: true
			});
		} catch (e) {
			showErrors('js', [{
				lineNumber: e.lineNumber - 1,
				message: e.description
			}]);
		} finally {
			code = Babel.transform(code, {
				presets: ['latest', 'stage-2', 'react']
			}).code;
			if (shouldPreventInfiniteLoops !== false) {
				code = utils.addInfiniteLoopProtection(code, {
					timeout: prefs.infiniteLoopTimeout
				});
			}
			d.resolve(code);
		}
	} else if (mode === JsModes.TS) {
		try {
			if (!window.ts) {
				d.resolve('');
				return d.promise;
			}
			code = ts.transpileModule(code, {
				reportDiagnostics: true,
				compilerOptions: {
					noEmitOnError: true,
					diagnostics: true,
					module: ts.ModuleKind.ES2015
				}
			});
			if (code.diagnostics.length) {
				/* eslint-disable no-throw-literal */
				throw {
					description: code.diagnostics[0].messageText,
					lineNumber: ts.getLineOfLocalPosition(
						code.diagnostics[0].file,
						code.diagnostics[0].start
					)
				};
			}
			if (shouldPreventInfiniteLoops !== false) {
				code = utils.addInfiniteLoopProtection(code.outputText, {
					timeout: prefs.infiniteLoopTimeout
				});
			}
			d.resolve(code);
		} catch (e) {
			showErrors('js', [{
				lineNumber: e.lineNumber - 1,
				message: e.description
			}]);
		}
	}

	return d.promise;
}
