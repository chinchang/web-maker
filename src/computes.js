import { deferred } from './deferred';
import { addInfiniteLoopProtection } from './utils';
import { HtmlModes, CssModes, JsModes } from './codeModes';

const esprima = require('esprima');

// computeHtml, computeCss & computeJs evaluate the final code according
// to whatever mode is selected and resolve the returned promise with the code.
export function computeHtml(userCode, mode) {
	var code = userCode;
	var d = deferred();
	if (mode === HtmlModes.HTML) {
		d.resolve({
			code
		});
	} else if (mode === HtmlModes.MARKDOWN) {
		d.resolve(
			window.marked
				? {
						code: marked(code)
				  }
				: {
						code
				  }
		);
	} else if (mode === HtmlModes.JADE) {
		d.resolve(
			window.jade
				? {
						code: jade.render(code)
				  }
				: {
						code
				  }
		);
	}

	return d.promise;
}
export function computeCss(userCode, mode, settings) {
	var code = userCode;

	var d = deferred();
	var errors;

	if (mode === CssModes.CSS) {
		d.resolve({
			code
		});
	} else if (mode === CssModes.SCSS || mode === CssModes.SASS) {
		if (window.sass && code) {
			window.sass.compile(
				code,
				{
					indentedSyntax: mode === CssModes.SASS
				},
				function(result) {
					// Something was wrong
					if (result.line && result.message) {
						errors = {
							lang: 'css',
							data: [
								{
									lineNumber: result.line - 1,
									message: result.message
								}
							]
						};
					}
					d.resolve({
						code: result.text,
						errors
					});
				}
			);
		} else {
			d.resolve({
				code
			});
		}
	} else if (mode === CssModes.LESS) {
		less.render(code).then(
			function(result) {
				d.resolve({
					code: result.css
				});
			},
			function(error) {
				errors = {
					lang: 'css',
					data: [
						{
							lineNumber: error.line,
							message: error.message
						}
					]
				};
				d.resolve({
					code: '',
					errors
				});
			}
		);
	} else if (mode === CssModes.STYLUS) {
		stylus(code).render(function(error, result) {
			if (error) {
				window.err = error;
				// Last line of message is the actual message
				var tempArr = error.message.split('\n');
				tempArr.pop(); // This is empty string in the end
				errors = {
					lang: 'css',
					data: [
						{
							lineNumber: +error.message.match(/stylus:(\d+):/)[1] - 298,
							message: tempArr.pop()
						}
					]
				};
			}
			d.resolve({
				code: result,
				errors
			});
		});
	} else if (mode === CssModes.ACSS) {
		if (!window.atomizer) {
			d.resolve({
				code: ''
			});
		} else {
			const html = code;
			const foundClasses = atomizer.findClassNames(html);
			var finalConfig;
			try {
				finalConfig = atomizer.getConfig(
					foundClasses,
					JSON.parse(settings.acssConfig)
				);
			} catch (e) {
				finalConfig = atomizer.getConfig(foundClasses, {});
			}
			const acss = atomizer.getCss(finalConfig);
			d.resolve({
				code: acss
			});
		}
	}

	return d.promise;
}

/* eslint-disable max-params */
/* eslint-disable complexity */
export function computeJs(
	userCode,
	mode,
	shouldPreventInfiniteLoops,
	infiniteLoopTimeout
) {
	var code = userCode;
	var d = deferred();
	var errors;

	if (!code) {
		d.resolve('');
		return d.promise;
	}

	if (mode === JsModes.JS) {
		try {
			esprima.parse(code, {
				tolerant: true
			});
		} catch (e) {
			errors = {
				lang: 'js',
				data: [
					{
						lineNumber: e.lineNumber - 1,
						message: e.description
					}
				]
			};
		} finally {
			if (shouldPreventInfiniteLoops !== false) {
				// If errors are found in last parse, we don't run infinite loop
				// protection otherwise it will again throw error.
				code = errors
					? code
					: addInfiniteLoopProtection(code, {
							timeout: infiniteLoopTimeout
					  });
			}

			d.resolve({
				code,
				errors
			});
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
			errors = {
				lang: 'js',
				data: [
					{
						lineNumber: e.location.first_line,
						message: e.message
					}
				]
			};
		} finally {
			if (shouldPreventInfiniteLoops !== false) {
				code = errors
					? code
					: addInfiniteLoopProtection(code, {
							timeout: infiniteLoopTimeout
					  });
			}
			d.resolve({
				code,
				errors
			});
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
			errors = {
				lang: 'js',
				data: [
					{
						lineNumber: e.lineNumber - 1,
						message: e.description
					}
				]
			};
		} finally {
			code = Babel.transform(code, {
				presets: ['latest', 'stage-2', 'react']
			}).code;
			if (shouldPreventInfiniteLoops !== false) {
				code = errors
					? code
					: addInfiniteLoopProtection(code, {
							timeout: infiniteLoopTimeout
					  });
			}
			d.resolve({
				code,
				errors
			});
		}
	} else if (mode === JsModes.TS) {
		try {
			if (!window.ts) {
				d.resolve({
					code: ''
				});
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
				errors = {
					lang: 'js',
					data: [
						{
							message: code.diagnostics[0].messageText,
							lineNumber:
								ts.getLineOfLocalPosition(
									code.diagnostics[0].file,
									code.diagnostics[0].start
								) - 1
						}
					]
				};
			}
			code = code.outputText;
			if (shouldPreventInfiniteLoops !== false && !errors) {
				code = addInfiniteLoopProtection(code, {
					timeout: infiniteLoopTimeout
				});
			}
			d.resolve({
				code,
				errors
			});
		} catch (e) {}
	}

	return d.promise;
}
/* eslint-enable max-params */
/* eslint-enable complexity */
