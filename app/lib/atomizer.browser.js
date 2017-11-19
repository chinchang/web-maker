require = (function e(t, n, r) {
	function s(o, u) {
		if (!n[o]) {
			if (!t[o]) {
				var a = typeof require == 'function' && require;
				if (!u && a) return a(o, !0);
				if (i) return i(o, !0);
				var f = new Error("Cannot find module '" + o + "'");
				throw ((f.code = 'MODULE_NOT_FOUND'), f);
			}
			var l = (n[o] = { exports: {} });
			t[o][0].call(
				l.exports,
				function(e) {
					var n = t[o][1][e];
					return s(n ? n : e);
				},
				l,
				l.exports,
				e,
				t,
				n,
				r
			);
		}
		return n[o].exports;
	}
	var i = typeof require == 'function' && require;
	for (var o = 0; o < r.length; o++) s(r[o]);
	return s;
})(
	{
		1: [
			function(require, module, exports) {
				(function(global) {
					/**
 * @license
 * lodash 3.10.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern -d -o ./index.js`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
					(function() {
						/** Used as a safe reference for `undefined` in pre-ES5 environments. */
						var undefined;

						/** Used as the semantic version number. */
						var VERSION = '3.10.1';

						/** Used to compose bitmasks for wrapper metadata. */
						var BIND_FLAG = 1,
							BIND_KEY_FLAG = 2,
							CURRY_BOUND_FLAG = 4,
							CURRY_FLAG = 8,
							CURRY_RIGHT_FLAG = 16,
							PARTIAL_FLAG = 32,
							PARTIAL_RIGHT_FLAG = 64,
							ARY_FLAG = 128,
							REARG_FLAG = 256;

						/** Used as default options for `_.trunc`. */
						var DEFAULT_TRUNC_LENGTH = 30,
							DEFAULT_TRUNC_OMISSION = '...';

						/** Used to detect when a function becomes hot. */
						var HOT_COUNT = 150,
							HOT_SPAN = 16;

						/** Used as the size to enable large array optimizations. */
						var LARGE_ARRAY_SIZE = 200;

						/** Used to indicate the type of lazy iteratees. */
						var LAZY_FILTER_FLAG = 1,
							LAZY_MAP_FLAG = 2;

						/** Used as the `TypeError` message for "Functions" methods. */
						var FUNC_ERROR_TEXT = 'Expected a function';

						/** Used as the internal argument placeholder. */
						var PLACEHOLDER = '__lodash_placeholder__';

						/** `Object#toString` result references. */
						var argsTag = '[object Arguments]',
							arrayTag = '[object Array]',
							boolTag = '[object Boolean]',
							dateTag = '[object Date]',
							errorTag = '[object Error]',
							funcTag = '[object Function]',
							mapTag = '[object Map]',
							numberTag = '[object Number]',
							objectTag = '[object Object]',
							regexpTag = '[object RegExp]',
							setTag = '[object Set]',
							stringTag = '[object String]',
							weakMapTag = '[object WeakMap]';

						var arrayBufferTag = '[object ArrayBuffer]',
							float32Tag = '[object Float32Array]',
							float64Tag = '[object Float64Array]',
							int8Tag = '[object Int8Array]',
							int16Tag = '[object Int16Array]',
							int32Tag = '[object Int32Array]',
							uint8Tag = '[object Uint8Array]',
							uint8ClampedTag = '[object Uint8ClampedArray]',
							uint16Tag = '[object Uint16Array]',
							uint32Tag = '[object Uint32Array]';

						/** Used to match empty string literals in compiled template source. */
						var reEmptyStringLeading = /\b__p \+= '';/g,
							reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
							reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

						/** Used to match HTML entities and HTML characters. */
						var reEscapedHtml = /&(?:amp|lt|gt|quot|#39|#96);/g,
							reUnescapedHtml = /[&<>"'`]/g,
							reHasEscapedHtml = RegExp(reEscapedHtml.source),
							reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

						/** Used to match template delimiters. */
						var reEscape = /<%-([\s\S]+?)%>/g,
							reEvaluate = /<%([\s\S]+?)%>/g,
							reInterpolate = /<%=([\s\S]+?)%>/g;

						/** Used to match property names within property paths. */
						var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
							reIsPlainProp = /^\w*$/,
							rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;

						/**
   * Used to match `RegExp` [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns)
   * and those outlined by [`EscapeRegExpPattern`](http://ecma-international.org/ecma-262/6.0/#sec-escaperegexppattern).
   */
						var reRegExpChars = /^[:!,]|[\\^$.*+?()[\]{}|\/]|(^[0-9a-fA-Fnrtuvx])|([\n\r\u2028\u2029])/g,
							reHasRegExpChars = RegExp(reRegExpChars.source);

						/** Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks). */
						var reComboMark = /[\u0300-\u036f\ufe20-\ufe23]/g;

						/** Used to match backslashes in property paths. */
						var reEscapeChar = /\\(\\)?/g;

						/** Used to match [ES template delimiters](http://ecma-international.org/ecma-262/6.0/#sec-template-literal-lexical-components). */
						var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

						/** Used to match `RegExp` flags from their coerced string values. */
						var reFlags = /\w*$/;

						/** Used to detect hexadecimal string values. */
						var reHasHexPrefix = /^0[xX]/;

						/** Used to detect host constructors (Safari > 5). */
						var reIsHostCtor = /^\[object .+?Constructor\]$/;

						/** Used to detect unsigned integer values. */
						var reIsUint = /^\d+$/;

						/** Used to match latin-1 supplementary letters (excluding mathematical operators). */
						var reLatin1 = /[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g;

						/** Used to ensure capturing order of template delimiters. */
						var reNoMatch = /($^)/;

						/** Used to match unescaped characters in compiled string literals. */
						var reUnescapedString = /['\n\r\u2028\u2029\\]/g;

						/** Used to match words to create compound words. */
						var reWords = (function() {
							var upper = '[A-Z\\xc0-\\xd6\\xd8-\\xde]',
								lower = '[a-z\\xdf-\\xf6\\xf8-\\xff]+';

							return RegExp(
								upper +
									'+(?=' +
									upper +
									lower +
									')|' +
									upper +
									'?' +
									lower +
									'|' +
									upper +
									'+|[0-9]+',
								'g'
							);
						})();

						/** Used to assign default `context` object properties. */
						var contextProps = [
							'Array',
							'ArrayBuffer',
							'Date',
							'Error',
							'Float32Array',
							'Float64Array',
							'Function',
							'Int8Array',
							'Int16Array',
							'Int32Array',
							'Math',
							'Number',
							'Object',
							'RegExp',
							'Set',
							'String',
							'_',
							'clearTimeout',
							'isFinite',
							'parseFloat',
							'parseInt',
							'setTimeout',
							'TypeError',
							'Uint8Array',
							'Uint8ClampedArray',
							'Uint16Array',
							'Uint32Array',
							'WeakMap'
						];

						/** Used to make template sourceURLs easier to identify. */
						var templateCounter = -1;

						/** Used to identify `toStringTag` values of typed arrays. */
						var typedArrayTags = {};
						typedArrayTags[float32Tag] = typedArrayTags[
							float64Tag
						] = typedArrayTags[int8Tag] = typedArrayTags[
							int16Tag
						] = typedArrayTags[int32Tag] = typedArrayTags[
							uint8Tag
						] = typedArrayTags[uint8ClampedTag] = typedArrayTags[
							uint16Tag
						] = typedArrayTags[uint32Tag] = true;
						typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[
							arrayBufferTag
						] = typedArrayTags[boolTag] = typedArrayTags[
							dateTag
						] = typedArrayTags[errorTag] = typedArrayTags[
							funcTag
						] = typedArrayTags[mapTag] = typedArrayTags[
							numberTag
						] = typedArrayTags[objectTag] = typedArrayTags[
							regexpTag
						] = typedArrayTags[setTag] = typedArrayTags[
							stringTag
						] = typedArrayTags[weakMapTag] = false;

						/** Used to identify `toStringTag` values supported by `_.clone`. */
						var cloneableTags = {};
						cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[
							arrayBufferTag
						] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[
							float32Tag
						] = cloneableTags[float64Tag] = cloneableTags[
							int8Tag
						] = cloneableTags[int16Tag] = cloneableTags[
							int32Tag
						] = cloneableTags[numberTag] = cloneableTags[
							objectTag
						] = cloneableTags[regexpTag] = cloneableTags[
							stringTag
						] = cloneableTags[uint8Tag] = cloneableTags[
							uint8ClampedTag
						] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
						cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[
							mapTag
						] = cloneableTags[setTag] = cloneableTags[weakMapTag] = false;

						/** Used to map latin-1 supplementary letters to basic latin letters. */
						var deburredLetters = {
							À: 'A',
							Á: 'A',
							Â: 'A',
							Ã: 'A',
							Ä: 'A',
							Å: 'A',
							à: 'a',
							á: 'a',
							â: 'a',
							ã: 'a',
							ä: 'a',
							å: 'a',
							Ç: 'C',
							ç: 'c',
							Ð: 'D',
							ð: 'd',
							È: 'E',
							É: 'E',
							Ê: 'E',
							Ë: 'E',
							è: 'e',
							é: 'e',
							ê: 'e',
							ë: 'e',
							Ì: 'I',
							Í: 'I',
							Î: 'I',
							Ï: 'I',
							ì: 'i',
							í: 'i',
							î: 'i',
							ï: 'i',
							Ñ: 'N',
							ñ: 'n',
							Ò: 'O',
							Ó: 'O',
							Ô: 'O',
							Õ: 'O',
							Ö: 'O',
							Ø: 'O',
							ò: 'o',
							ó: 'o',
							ô: 'o',
							õ: 'o',
							ö: 'o',
							ø: 'o',
							Ù: 'U',
							Ú: 'U',
							Û: 'U',
							Ü: 'U',
							ù: 'u',
							ú: 'u',
							û: 'u',
							ü: 'u',
							Ý: 'Y',
							ý: 'y',
							ÿ: 'y',
							Æ: 'Ae',
							æ: 'ae',
							Þ: 'Th',
							þ: 'th',
							ß: 'ss'
						};

						/** Used to map characters to HTML entities. */
						var htmlEscapes = {
							'&': '&amp;',
							'<': '&lt;',
							'>': '&gt;',
							'"': '&quot;',
							"'": '&#39;',
							'`': '&#96;'
						};

						/** Used to map HTML entities to characters. */
						var htmlUnescapes = {
							'&amp;': '&',
							'&lt;': '<',
							'&gt;': '>',
							'&quot;': '"',
							'&#39;': "'",
							'&#96;': '`'
						};

						/** Used to determine if values are of the language type `Object`. */
						var objectTypes = {
							function: true,
							object: true
						};

						/** Used to escape characters for inclusion in compiled regexes. */
						var regexpEscapes = {
							'0': 'x30',
							'1': 'x31',
							'2': 'x32',
							'3': 'x33',
							'4': 'x34',
							'5': 'x35',
							'6': 'x36',
							'7': 'x37',
							'8': 'x38',
							'9': 'x39',
							A: 'x41',
							B: 'x42',
							C: 'x43',
							D: 'x44',
							E: 'x45',
							F: 'x46',
							a: 'x61',
							b: 'x62',
							c: 'x63',
							d: 'x64',
							e: 'x65',
							f: 'x66',
							n: 'x6e',
							r: 'x72',
							t: 'x74',
							u: 'x75',
							v: 'x76',
							x: 'x78'
						};

						/** Used to escape characters for inclusion in compiled string literals. */
						var stringEscapes = {
							'\\': '\\',
							"'": "'",
							'\n': 'n',
							'\r': 'r',
							'\u2028': 'u2028',
							'\u2029': 'u2029'
						};

						/** Detect free variable `exports`. */
						var freeExports =
							objectTypes[typeof exports] &&
							exports &&
							!exports.nodeType &&
							exports;

						/** Detect free variable `module`. */
						var freeModule =
							objectTypes[typeof module] &&
							module &&
							!module.nodeType &&
							module;

						/** Detect free variable `global` from Node.js. */
						var freeGlobal =
							freeExports &&
							freeModule &&
							typeof global == 'object' &&
							global &&
							global.Object &&
							global;

						/** Detect free variable `self`. */
						var freeSelf =
							objectTypes[typeof self] && self && self.Object && self;

						/** Detect free variable `window`. */
						var freeWindow =
							objectTypes[typeof window] && window && window.Object && window;

						/** Detect the popular CommonJS extension `module.exports`. */
						var moduleExports =
							freeModule && freeModule.exports === freeExports && freeExports;

						/**
   * Used as a reference to the global object.
   *
   * The `this` value is used if it's the global object to avoid Greasemonkey's
   * restricted `window` object, otherwise the `window` object is used.
   */
						var root =
							freeGlobal ||
							(freeWindow !== (this && this.window) && freeWindow) ||
							freeSelf ||
							this;

						/*--------------------------------------------------------------------------*/

						/**
   * The base implementation of `compareAscending` which compares values and
   * sorts them in ascending order without guaranteeing a stable sort.
   *
   * @private
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {number} Returns the sort order indicator for `value`.
   */
						function baseCompareAscending(value, other) {
							if (value !== other) {
								var valIsNull = value === null,
									valIsUndef = value === undefined,
									valIsReflexive = value === value;

								var othIsNull = other === null,
									othIsUndef = other === undefined,
									othIsReflexive = other === other;

								if (
									(value > other && !othIsNull) ||
									!valIsReflexive ||
									(valIsNull && !othIsUndef && othIsReflexive) ||
									(valIsUndef && othIsReflexive)
								) {
									return 1;
								}
								if (
									(value < other && !valIsNull) ||
									!othIsReflexive ||
									(othIsNull && !valIsUndef && valIsReflexive) ||
									(othIsUndef && valIsReflexive)
								) {
									return -1;
								}
							}
							return 0;
						}

						/**
   * The base implementation of `_.findIndex` and `_.findLastIndex` without
   * support for callback shorthands and `this` binding.
   *
   * @private
   * @param {Array} array The array to search.
   * @param {Function} predicate The function invoked per iteration.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
						function baseFindIndex(array, predicate, fromRight) {
							var length = array.length,
								index = fromRight ? length : -1;

							while (fromRight ? index-- : ++index < length) {
								if (predicate(array[index], index, array)) {
									return index;
								}
							}
							return -1;
						}

						/**
   * The base implementation of `_.indexOf` without support for binary searches.
   *
   * @private
   * @param {Array} array The array to search.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
						function baseIndexOf(array, value, fromIndex) {
							if (value !== value) {
								return indexOfNaN(array, fromIndex);
							}
							var index = fromIndex - 1,
								length = array.length;

							while (++index < length) {
								if (array[index] === value) {
									return index;
								}
							}
							return -1;
						}

						/**
   * The base implementation of `_.isFunction` without support for environments
   * with incorrect `typeof` results.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
   */
						function baseIsFunction(value) {
							// Avoid a Chakra JIT bug in compatibility modes of IE 11.
							// See https://github.com/jashkenas/underscore/issues/1621 for more details.
							return typeof value == 'function' || false;
						}

						/**
   * Converts `value` to a string if it's not one. An empty string is returned
   * for `null` or `undefined` values.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   */
						function baseToString(value) {
							return value == null ? '' : value + '';
						}

						/**
   * Used by `_.trim` and `_.trimLeft` to get the index of the first character
   * of `string` that is not found in `chars`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @param {string} chars The characters to find.
   * @returns {number} Returns the index of the first character not found in `chars`.
   */
						function charsLeftIndex(string, chars) {
							var index = -1,
								length = string.length;

							while (
								++index < length &&
								chars.indexOf(string.charAt(index)) > -1
							) {}
							return index;
						}

						/**
   * Used by `_.trim` and `_.trimRight` to get the index of the last character
   * of `string` that is not found in `chars`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @param {string} chars The characters to find.
   * @returns {number} Returns the index of the last character not found in `chars`.
   */
						function charsRightIndex(string, chars) {
							var index = string.length;

							while (index-- && chars.indexOf(string.charAt(index)) > -1) {}
							return index;
						}

						/**
   * Used by `_.sortBy` to compare transformed elements of a collection and stable
   * sort them in ascending order.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @returns {number} Returns the sort order indicator for `object`.
   */
						function compareAscending(object, other) {
							return (
								baseCompareAscending(object.criteria, other.criteria) ||
								object.index - other.index
							);
						}

						/**
   * Used by `_.sortByOrder` to compare multiple properties of a value to another
   * and stable sort them.
   *
   * If `orders` is unspecified, all valuess are sorted in ascending order. Otherwise,
   * a value is sorted in ascending order if its corresponding order is "asc", and
   * descending if "desc".
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {boolean[]} orders The order to sort by for each property.
   * @returns {number} Returns the sort order indicator for `object`.
   */
						function compareMultiple(object, other, orders) {
							var index = -1,
								objCriteria = object.criteria,
								othCriteria = other.criteria,
								length = objCriteria.length,
								ordersLength = orders.length;

							while (++index < length) {
								var result = baseCompareAscending(
									objCriteria[index],
									othCriteria[index]
								);
								if (result) {
									if (index >= ordersLength) {
										return result;
									}
									var order = orders[index];
									return result * (order === 'asc' || order === true ? 1 : -1);
								}
							}
							// Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
							// that causes it, under certain circumstances, to provide the same value for
							// `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
							// for more details.
							//
							// This also ensures a stable sort in V8 and other engines.
							// See https://code.google.com/p/v8/issues/detail?id=90 for more details.
							return object.index - other.index;
						}

						/**
   * Used by `_.deburr` to convert latin-1 supplementary letters to basic latin letters.
   *
   * @private
   * @param {string} letter The matched letter to deburr.
   * @returns {string} Returns the deburred letter.
   */
						function deburrLetter(letter) {
							return deburredLetters[letter];
						}

						/**
   * Used by `_.escape` to convert characters to HTML entities.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @returns {string} Returns the escaped character.
   */
						function escapeHtmlChar(chr) {
							return htmlEscapes[chr];
						}

						/**
   * Used by `_.escapeRegExp` to escape characters for inclusion in compiled regexes.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @param {string} leadingChar The capture group for a leading character.
   * @param {string} whitespaceChar The capture group for a whitespace character.
   * @returns {string} Returns the escaped character.
   */
						function escapeRegExpChar(chr, leadingChar, whitespaceChar) {
							if (leadingChar) {
								chr = regexpEscapes[chr];
							} else if (whitespaceChar) {
								chr = stringEscapes[chr];
							}
							return '\\' + chr;
						}

						/**
   * Used by `_.template` to escape characters for inclusion in compiled string literals.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @returns {string} Returns the escaped character.
   */
						function escapeStringChar(chr) {
							return '\\' + stringEscapes[chr];
						}

						/**
   * Gets the index at which the first occurrence of `NaN` is found in `array`.
   *
   * @private
   * @param {Array} array The array to search.
   * @param {number} fromIndex The index to search from.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {number} Returns the index of the matched `NaN`, else `-1`.
   */
						function indexOfNaN(array, fromIndex, fromRight) {
							var length = array.length,
								index = fromIndex + (fromRight ? 0 : -1);

							while (fromRight ? index-- : ++index < length) {
								var other = array[index];
								if (other !== other) {
									return index;
								}
							}
							return -1;
						}

						/**
   * Checks if `value` is object-like.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   */
						function isObjectLike(value) {
							return !!value && typeof value == 'object';
						}

						/**
   * Used by `trimmedLeftIndex` and `trimmedRightIndex` to determine if a
   * character code is whitespace.
   *
   * @private
   * @param {number} charCode The character code to inspect.
   * @returns {boolean} Returns `true` if `charCode` is whitespace, else `false`.
   */
						function isSpace(charCode) {
							return (
								(charCode <= 160 && (charCode >= 9 && charCode <= 13)) ||
								charCode == 32 ||
								charCode == 160 ||
								charCode == 5760 ||
								charCode == 6158 ||
								(charCode >= 8192 &&
									(charCode <= 8202 ||
										charCode == 8232 ||
										charCode == 8233 ||
										charCode == 8239 ||
										charCode == 8287 ||
										charCode == 12288 ||
										charCode == 65279))
							);
						}

						/**
   * Replaces all `placeholder` elements in `array` with an internal placeholder
   * and returns an array of their indexes.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {*} placeholder The placeholder to replace.
   * @returns {Array} Returns the new array of placeholder indexes.
   */
						function replaceHolders(array, placeholder) {
							var index = -1,
								length = array.length,
								resIndex = -1,
								result = [];

							while (++index < length) {
								if (array[index] === placeholder) {
									array[index] = PLACEHOLDER;
									result[++resIndex] = index;
								}
							}
							return result;
						}

						/**
   * An implementation of `_.uniq` optimized for sorted arrays without support
   * for callback shorthands and `this` binding.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Function} [iteratee] The function invoked per iteration.
   * @returns {Array} Returns the new duplicate-value-free array.
   */
						function sortedUniq(array, iteratee) {
							var seen,
								index = -1,
								length = array.length,
								resIndex = -1,
								result = [];

							while (++index < length) {
								var value = array[index],
									computed = iteratee ? iteratee(value, index, array) : value;

								if (!index || seen !== computed) {
									seen = computed;
									result[++resIndex] = value;
								}
							}
							return result;
						}

						/**
   * Used by `_.trim` and `_.trimLeft` to get the index of the first non-whitespace
   * character of `string`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {number} Returns the index of the first non-whitespace character.
   */
						function trimmedLeftIndex(string) {
							var index = -1,
								length = string.length;

							while (++index < length && isSpace(string.charCodeAt(index))) {}
							return index;
						}

						/**
   * Used by `_.trim` and `_.trimRight` to get the index of the last non-whitespace
   * character of `string`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {number} Returns the index of the last non-whitespace character.
   */
						function trimmedRightIndex(string) {
							var index = string.length;

							while (index-- && isSpace(string.charCodeAt(index))) {}
							return index;
						}

						/**
   * Used by `_.unescape` to convert HTML entities to characters.
   *
   * @private
   * @param {string} chr The matched character to unescape.
   * @returns {string} Returns the unescaped character.
   */
						function unescapeHtmlChar(chr) {
							return htmlUnescapes[chr];
						}

						/*--------------------------------------------------------------------------*/

						/**
   * Create a new pristine `lodash` function using the given `context` object.
   *
   * @static
   * @memberOf _
   * @category Utility
   * @param {Object} [context=root] The context object.
   * @returns {Function} Returns a new `lodash` function.
   * @example
   *
   * _.mixin({ 'foo': _.constant('foo') });
   *
   * var lodash = _.runInContext();
   * lodash.mixin({ 'bar': lodash.constant('bar') });
   *
   * _.isFunction(_.foo);
   * // => true
   * _.isFunction(_.bar);
   * // => false
   *
   * lodash.isFunction(lodash.foo);
   * // => false
   * lodash.isFunction(lodash.bar);
   * // => true
   *
   * // using `context` to mock `Date#getTime` use in `_.now`
   * var mock = _.runInContext({
   *   'Date': function() {
   *     return { 'getTime': getTimeMock };
   *   }
   * });
   *
   * // or creating a suped-up `defer` in Node.js
   * var defer = _.runInContext({ 'setTimeout': setImmediate }).defer;
   */
						function runInContext(context) {
							// Avoid issues with some ES3 environments that attempt to use values, named
							// after built-in constructors like `Object`, for the creation of literals.
							// ES5 clears this up by stating that literals must use built-in constructors.
							// See https://es5.github.io/#x11.1.5 for more details.
							context = context
								? _.defaults(root.Object(), context, _.pick(root, contextProps))
								: root;

							/** Native constructor references. */
							var Array = context.Array,
								Date = context.Date,
								Error = context.Error,
								Function = context.Function,
								Math = context.Math,
								Number = context.Number,
								Object = context.Object,
								RegExp = context.RegExp,
								String = context.String,
								TypeError = context.TypeError;

							/** Used for native method references. */
							var arrayProto = Array.prototype,
								objectProto = Object.prototype,
								stringProto = String.prototype;

							/** Used to resolve the decompiled source of functions. */
							var fnToString = Function.prototype.toString;

							/** Used to check objects for own properties. */
							var hasOwnProperty = objectProto.hasOwnProperty;

							/** Used to generate unique IDs. */
							var idCounter = 0;

							/**
     * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
     * of values.
     */
							var objToString = objectProto.toString;

							/** Used to restore the original `_` reference in `_.noConflict`. */
							var oldDash = root._;

							/** Used to detect if a method is native. */
							var reIsNative = RegExp(
								'^' +
									fnToString
										.call(hasOwnProperty)
										.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
										.replace(
											/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
											'$1.*?'
										) +
									'$'
							);

							/** Native method references. */
							var ArrayBuffer = context.ArrayBuffer,
								clearTimeout = context.clearTimeout,
								parseFloat = context.parseFloat,
								pow = Math.pow,
								propertyIsEnumerable = objectProto.propertyIsEnumerable,
								Set = getNative(context, 'Set'),
								setTimeout = context.setTimeout,
								splice = arrayProto.splice,
								Uint8Array = context.Uint8Array,
								WeakMap = getNative(context, 'WeakMap');

							/* Native method references for those with the same name as other `lodash` methods. */
							var nativeCeil = Math.ceil,
								nativeCreate = getNative(Object, 'create'),
								nativeFloor = Math.floor,
								nativeIsArray = getNative(Array, 'isArray'),
								nativeIsFinite = context.isFinite,
								nativeKeys = getNative(Object, 'keys'),
								nativeMax = Math.max,
								nativeMin = Math.min,
								nativeNow = getNative(Date, 'now'),
								nativeParseInt = context.parseInt,
								nativeRandom = Math.random;

							/** Used as references for `-Infinity` and `Infinity`. */
							var NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY,
								POSITIVE_INFINITY = Number.POSITIVE_INFINITY;

							/** Used as references for the maximum length and index of an array. */
							var MAX_ARRAY_LENGTH = 4294967295,
								MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1,
								HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;

							/**
     * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
     * of an array-like value.
     */
							var MAX_SAFE_INTEGER = 9007199254740991;

							/** Used to store function metadata. */
							var metaMap = WeakMap && new WeakMap();

							/** Used to lookup unminified function names. */
							var realNames = {};

							/*------------------------------------------------------------------------*/

							/**
     * Creates a `lodash` object which wraps `value` to enable implicit chaining.
     * Methods that operate on and return arrays, collections, and functions can
     * be chained together. Methods that retrieve a single value or may return a
     * primitive value will automatically end the chain returning the unwrapped
     * value. Explicit chaining may be enabled using `_.chain`. The execution of
     * chained methods is lazy, that is, execution is deferred until `_#value`
     * is implicitly or explicitly called.
     *
     * Lazy evaluation allows several methods to support shortcut fusion. Shortcut
     * fusion is an optimization strategy which merge iteratee calls; this can help
     * to avoid the creation of intermediate data structures and greatly reduce the
     * number of iteratee executions.
     *
     * Chaining is supported in custom builds as long as the `_#value` method is
     * directly or indirectly included in the build.
     *
     * In addition to lodash methods, wrappers have `Array` and `String` methods.
     *
     * The wrapper `Array` methods are:
     * `concat`, `join`, `pop`, `push`, `reverse`, `shift`, `slice`, `sort`,
     * `splice`, and `unshift`
     *
     * The wrapper `String` methods are:
     * `replace` and `split`
     *
     * The wrapper methods that support shortcut fusion are:
     * `compact`, `drop`, `dropRight`, `dropRightWhile`, `dropWhile`, `filter`,
     * `first`, `initial`, `last`, `map`, `pluck`, `reject`, `rest`, `reverse`,
     * `slice`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, `toArray`,
     * and `where`
     *
     * The chainable wrapper methods are:
     * `after`, `ary`, `assign`, `at`, `before`, `bind`, `bindAll`, `bindKey`,
     * `callback`, `chain`, `chunk`, `commit`, `compact`, `concat`, `constant`,
     * `countBy`, `create`, `curry`, `debounce`, `defaults`, `defaultsDeep`,
     * `defer`, `delay`, `difference`, `drop`, `dropRight`, `dropRightWhile`,
     * `dropWhile`, `fill`, `filter`, `flatten`, `flattenDeep`, `flow`, `flowRight`,
     * `forEach`, `forEachRight`, `forIn`, `forInRight`, `forOwn`, `forOwnRight`,
     * `functions`, `groupBy`, `indexBy`, `initial`, `intersection`, `invert`,
     * `invoke`, `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`,
     * `matchesProperty`, `memoize`, `merge`, `method`, `methodOf`, `mixin`,
     * `modArgs`, `negate`, `omit`, `once`, `pairs`, `partial`, `partialRight`,
     * `partition`, `pick`, `plant`, `pluck`, `property`, `propertyOf`, `pull`,
     * `pullAt`, `push`, `range`, `rearg`, `reject`, `remove`, `rest`, `restParam`,
     * `reverse`, `set`, `shuffle`, `slice`, `sort`, `sortBy`, `sortByAll`,
     * `sortByOrder`, `splice`, `spread`, `take`, `takeRight`, `takeRightWhile`,
     * `takeWhile`, `tap`, `throttle`, `thru`, `times`, `toArray`, `toPlainObject`,
     * `transform`, `union`, `uniq`, `unshift`, `unzip`, `unzipWith`, `values`,
     * `valuesIn`, `where`, `without`, `wrap`, `xor`, `zip`, `zipObject`, `zipWith`
     *
     * The wrapper methods that are **not** chainable by default are:
     * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clone`, `cloneDeep`,
     * `deburr`, `endsWith`, `escape`, `escapeRegExp`, `every`, `find`, `findIndex`,
     * `findKey`, `findLast`, `findLastIndex`, `findLastKey`, `findWhere`, `first`,
     * `floor`, `get`, `gt`, `gte`, `has`, `identity`, `includes`, `indexOf`,
     * `inRange`, `isArguments`, `isArray`, `isBoolean`, `isDate`, `isElement`,
     * `isEmpty`, `isEqual`, `isError`, `isFinite` `isFunction`, `isMatch`,
     * `isNative`, `isNaN`, `isNull`, `isNumber`, `isObject`, `isPlainObject`,
     * `isRegExp`, `isString`, `isUndefined`, `isTypedArray`, `join`, `kebabCase`,
     * `last`, `lastIndexOf`, `lt`, `lte`, `max`, `min`, `noConflict`, `noop`,
     * `now`, `pad`, `padLeft`, `padRight`, `parseInt`, `pop`, `random`, `reduce`,
     * `reduceRight`, `repeat`, `result`, `round`, `runInContext`, `shift`, `size`,
     * `snakeCase`, `some`, `sortedIndex`, `sortedLastIndex`, `startCase`,
     * `startsWith`, `sum`, `template`, `trim`, `trimLeft`, `trimRight`, `trunc`,
     * `unescape`, `uniqueId`, `value`, and `words`
     *
     * The wrapper method `sample` will return a wrapped value when `n` is provided,
     * otherwise an unwrapped value is returned.
     *
     * @name _
     * @constructor
     * @category Chain
     * @param {*} value The value to wrap in a `lodash` instance.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var wrapped = _([1, 2, 3]);
     *
     * // returns an unwrapped value
     * wrapped.reduce(function(total, n) {
     *   return total + n;
     * });
     * // => 6
     *
     * // returns a wrapped value
     * var squares = wrapped.map(function(n) {
     *   return n * n;
     * });
     *
     * _.isArray(squares);
     * // => false
     *
     * _.isArray(squares.value());
     * // => true
     */
							function lodash(value) {
								if (
									isObjectLike(value) &&
									!isArray(value) &&
									!(value instanceof LazyWrapper)
								) {
									if (value instanceof LodashWrapper) {
										return value;
									}
									if (
										hasOwnProperty.call(value, '__chain__') &&
										hasOwnProperty.call(value, '__wrapped__')
									) {
										return wrapperClone(value);
									}
								}
								return new LodashWrapper(value);
							}

							/**
     * The function whose prototype all chaining wrappers inherit from.
     *
     * @private
     */
							function baseLodash() {
								// No operation performed.
							}

							/**
     * The base constructor for creating `lodash` wrapper objects.
     *
     * @private
     * @param {*} value The value to wrap.
     * @param {boolean} [chainAll] Enable chaining for all wrapper methods.
     * @param {Array} [actions=[]] Actions to peform to resolve the unwrapped value.
     */
							function LodashWrapper(value, chainAll, actions) {
								this.__wrapped__ = value;
								this.__actions__ = actions || [];
								this.__chain__ = !!chainAll;
							}

							/**
     * An object environment feature flags.
     *
     * @static
     * @memberOf _
     * @type Object
     */
							var support = (lodash.support = {});

							/**
     * By default, the template delimiters used by lodash are like those in
     * embedded Ruby (ERB). Change the following template settings to use
     * alternative delimiters.
     *
     * @static
     * @memberOf _
     * @type Object
     */
							lodash.templateSettings = {
								/**
       * Used to detect `data` property values to be HTML-escaped.
       *
       * @memberOf _.templateSettings
       * @type RegExp
       */
								escape: reEscape,

								/**
       * Used to detect code to be evaluated.
       *
       * @memberOf _.templateSettings
       * @type RegExp
       */
								evaluate: reEvaluate,

								/**
       * Used to detect `data` property values to inject.
       *
       * @memberOf _.templateSettings
       * @type RegExp
       */
								interpolate: reInterpolate,

								/**
       * Used to reference the data object in the template text.
       *
       * @memberOf _.templateSettings
       * @type string
       */
								variable: '',

								/**
       * Used to import variables into the compiled template.
       *
       * @memberOf _.templateSettings
       * @type Object
       */
								imports: {
									/**
         * A reference to the `lodash` function.
         *
         * @memberOf _.templateSettings.imports
         * @type Function
         */
									_: lodash
								}
							};

							/*------------------------------------------------------------------------*/

							/**
     * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
     *
     * @private
     * @param {*} value The value to wrap.
     */
							function LazyWrapper(value) {
								this.__wrapped__ = value;
								this.__actions__ = [];
								this.__dir__ = 1;
								this.__filtered__ = false;
								this.__iteratees__ = [];
								this.__takeCount__ = POSITIVE_INFINITY;
								this.__views__ = [];
							}

							/**
     * Creates a clone of the lazy wrapper object.
     *
     * @private
     * @name clone
     * @memberOf LazyWrapper
     * @returns {Object} Returns the cloned `LazyWrapper` object.
     */
							function lazyClone() {
								var result = new LazyWrapper(this.__wrapped__);
								result.__actions__ = arrayCopy(this.__actions__);
								result.__dir__ = this.__dir__;
								result.__filtered__ = this.__filtered__;
								result.__iteratees__ = arrayCopy(this.__iteratees__);
								result.__takeCount__ = this.__takeCount__;
								result.__views__ = arrayCopy(this.__views__);
								return result;
							}

							/**
     * Reverses the direction of lazy iteration.
     *
     * @private
     * @name reverse
     * @memberOf LazyWrapper
     * @returns {Object} Returns the new reversed `LazyWrapper` object.
     */
							function lazyReverse() {
								if (this.__filtered__) {
									var result = new LazyWrapper(this);
									result.__dir__ = -1;
									result.__filtered__ = true;
								} else {
									result = this.clone();
									result.__dir__ *= -1;
								}
								return result;
							}

							/**
     * Extracts the unwrapped value from its lazy wrapper.
     *
     * @private
     * @name value
     * @memberOf LazyWrapper
     * @returns {*} Returns the unwrapped value.
     */
							function lazyValue() {
								var array = this.__wrapped__.value(),
									dir = this.__dir__,
									isArr = isArray(array),
									isRight = dir < 0,
									arrLength = isArr ? array.length : 0,
									view = getView(0, arrLength, this.__views__),
									start = view.start,
									end = view.end,
									length = end - start,
									index = isRight ? end : start - 1,
									iteratees = this.__iteratees__,
									iterLength = iteratees.length,
									resIndex = 0,
									takeCount = nativeMin(length, this.__takeCount__);

								if (
									!isArr ||
									arrLength < LARGE_ARRAY_SIZE ||
									(arrLength == length && takeCount == length)
								) {
									return baseWrapperValue(
										isRight && isArr ? array.reverse() : array,
										this.__actions__
									);
								}
								var result = [];

								outer: while (length-- && resIndex < takeCount) {
									index += dir;

									var iterIndex = -1,
										value = array[index];

									while (++iterIndex < iterLength) {
										var data = iteratees[iterIndex],
											iteratee = data.iteratee,
											type = data.type,
											computed = iteratee(value);

										if (type == LAZY_MAP_FLAG) {
											value = computed;
										} else if (!computed) {
											if (type == LAZY_FILTER_FLAG) {
												continue outer;
											} else {
												break outer;
											}
										}
									}
									result[resIndex++] = value;
								}
								return result;
							}

							/*------------------------------------------------------------------------*/

							/**
     * Creates a cache object to store key/value pairs.
     *
     * @private
     * @static
     * @name Cache
     * @memberOf _.memoize
     */
							function MapCache() {
								this.__data__ = {};
							}

							/**
     * Removes `key` and its value from the cache.
     *
     * @private
     * @name delete
     * @memberOf _.memoize.Cache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed successfully, else `false`.
     */
							function mapDelete(key) {
								return this.has(key) && delete this.__data__[key];
							}

							/**
     * Gets the cached value for `key`.
     *
     * @private
     * @name get
     * @memberOf _.memoize.Cache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the cached value.
     */
							function mapGet(key) {
								return key == '__proto__' ? undefined : this.__data__[key];
							}

							/**
     * Checks if a cached value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf _.memoize.Cache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
							function mapHas(key) {
								return (
									key != '__proto__' && hasOwnProperty.call(this.__data__, key)
								);
							}

							/**
     * Sets `value` to `key` of the cache.
     *
     * @private
     * @name set
     * @memberOf _.memoize.Cache
     * @param {string} key The key of the value to cache.
     * @param {*} value The value to cache.
     * @returns {Object} Returns the cache object.
     */
							function mapSet(key, value) {
								if (key != '__proto__') {
									this.__data__[key] = value;
								}
								return this;
							}

							/*------------------------------------------------------------------------*/

							/**
     *
     * Creates a cache object to store unique values.
     *
     * @private
     * @param {Array} [values] The values to cache.
     */
							function SetCache(values) {
								var length = values ? values.length : 0;

								this.data = { hash: nativeCreate(null), set: new Set() };
								while (length--) {
									this.push(values[length]);
								}
							}

							/**
     * Checks if `value` is in `cache` mimicking the return signature of
     * `_.indexOf` by returning `0` if the value is found, else `-1`.
     *
     * @private
     * @param {Object} cache The cache to search.
     * @param {*} value The value to search for.
     * @returns {number} Returns `0` if `value` is found, else `-1`.
     */
							function cacheIndexOf(cache, value) {
								var data = cache.data,
									result =
										typeof value == 'string' || isObject(value)
											? data.set.has(value)
											: data.hash[value];

								return result ? 0 : -1;
							}

							/**
     * Adds `value` to the cache.
     *
     * @private
     * @name push
     * @memberOf SetCache
     * @param {*} value The value to cache.
     */
							function cachePush(value) {
								var data = this.data;
								if (typeof value == 'string' || isObject(value)) {
									data.set.add(value);
								} else {
									data.hash[value] = true;
								}
							}

							/*------------------------------------------------------------------------*/

							/**
     * Creates a new array joining `array` with `other`.
     *
     * @private
     * @param {Array} array The array to join.
     * @param {Array} other The other array to join.
     * @returns {Array} Returns the new concatenated array.
     */
							function arrayConcat(array, other) {
								var index = -1,
									length = array.length,
									othIndex = -1,
									othLength = other.length,
									result = Array(length + othLength);

								while (++index < length) {
									result[index] = array[index];
								}
								while (++othIndex < othLength) {
									result[index++] = other[othIndex];
								}
								return result;
							}

							/**
     * Copies the values of `source` to `array`.
     *
     * @private
     * @param {Array} source The array to copy values from.
     * @param {Array} [array=[]] The array to copy values to.
     * @returns {Array} Returns `array`.
     */
							function arrayCopy(source, array) {
								var index = -1,
									length = source.length;

								array || (array = Array(length));
								while (++index < length) {
									array[index] = source[index];
								}
								return array;
							}

							/**
     * A specialized version of `_.forEach` for arrays without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns `array`.
     */
							function arrayEach(array, iteratee) {
								var index = -1,
									length = array.length;

								while (++index < length) {
									if (iteratee(array[index], index, array) === false) {
										break;
									}
								}
								return array;
							}

							/**
     * A specialized version of `_.forEachRight` for arrays without support for
     * callback shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns `array`.
     */
							function arrayEachRight(array, iteratee) {
								var length = array.length;

								while (length--) {
									if (iteratee(array[length], length, array) === false) {
										break;
									}
								}
								return array;
							}

							/**
     * A specialized version of `_.every` for arrays without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if all elements pass the predicate check,
     *  else `false`.
     */
							function arrayEvery(array, predicate) {
								var index = -1,
									length = array.length;

								while (++index < length) {
									if (!predicate(array[index], index, array)) {
										return false;
									}
								}
								return true;
							}

							/**
     * A specialized version of `baseExtremum` for arrays which invokes `iteratee`
     * with one argument: (value).
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} comparator The function used to compare values.
     * @param {*} exValue The initial extremum value.
     * @returns {*} Returns the extremum value.
     */
							function arrayExtremum(array, iteratee, comparator, exValue) {
								var index = -1,
									length = array.length,
									computed = exValue,
									result = computed;

								while (++index < length) {
									var value = array[index],
										current = +iteratee(value);

									if (comparator(current, computed)) {
										computed = current;
										result = value;
									}
								}
								return result;
							}

							/**
     * A specialized version of `_.filter` for arrays without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     */
							function arrayFilter(array, predicate) {
								var index = -1,
									length = array.length,
									resIndex = -1,
									result = [];

								while (++index < length) {
									var value = array[index];
									if (predicate(value, index, array)) {
										result[++resIndex] = value;
									}
								}
								return result;
							}

							/**
     * A specialized version of `_.map` for arrays without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     */
							function arrayMap(array, iteratee) {
								var index = -1,
									length = array.length,
									result = Array(length);

								while (++index < length) {
									result[index] = iteratee(array[index], index, array);
								}
								return result;
							}

							/**
     * Appends the elements of `values` to `array`.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {Array} values The values to append.
     * @returns {Array} Returns `array`.
     */
							function arrayPush(array, values) {
								var index = -1,
									length = values.length,
									offset = array.length;

								while (++index < length) {
									array[offset + index] = values[index];
								}
								return array;
							}

							/**
     * A specialized version of `_.reduce` for arrays without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @param {boolean} [initFromArray] Specify using the first element of `array`
     *  as the initial value.
     * @returns {*} Returns the accumulated value.
     */
							function arrayReduce(
								array,
								iteratee,
								accumulator,
								initFromArray
							) {
								var index = -1,
									length = array.length;

								if (initFromArray && length) {
									accumulator = array[++index];
								}
								while (++index < length) {
									accumulator = iteratee(
										accumulator,
										array[index],
										index,
										array
									);
								}
								return accumulator;
							}

							/**
     * A specialized version of `_.reduceRight` for arrays without support for
     * callback shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @param {boolean} [initFromArray] Specify using the last element of `array`
     *  as the initial value.
     * @returns {*} Returns the accumulated value.
     */
							function arrayReduceRight(
								array,
								iteratee,
								accumulator,
								initFromArray
							) {
								var length = array.length;
								if (initFromArray && length) {
									accumulator = array[--length];
								}
								while (length--) {
									accumulator = iteratee(
										accumulator,
										array[length],
										length,
										array
									);
								}
								return accumulator;
							}

							/**
     * A specialized version of `_.some` for arrays without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     */
							function arraySome(array, predicate) {
								var index = -1,
									length = array.length;

								while (++index < length) {
									if (predicate(array[index], index, array)) {
										return true;
									}
								}
								return false;
							}

							/**
     * A specialized version of `_.sum` for arrays without support for callback
     * shorthands and `this` binding..
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {number} Returns the sum.
     */
							function arraySum(array, iteratee) {
								var length = array.length,
									result = 0;

								while (length--) {
									result += +iteratee(array[length]) || 0;
								}
								return result;
							}

							/**
     * Used by `_.defaults` to customize its `_.assign` use.
     *
     * @private
     * @param {*} objectValue The destination object property value.
     * @param {*} sourceValue The source object property value.
     * @returns {*} Returns the value to assign to the destination object.
     */
							function assignDefaults(objectValue, sourceValue) {
								return objectValue === undefined ? sourceValue : objectValue;
							}

							/**
     * Used by `_.template` to customize its `_.assign` use.
     *
     * **Note:** This function is like `assignDefaults` except that it ignores
     * inherited property values when checking if a property is `undefined`.
     *
     * @private
     * @param {*} objectValue The destination object property value.
     * @param {*} sourceValue The source object property value.
     * @param {string} key The key associated with the object and source values.
     * @param {Object} object The destination object.
     * @returns {*} Returns the value to assign to the destination object.
     */
							function assignOwnDefaults(
								objectValue,
								sourceValue,
								key,
								object
							) {
								return objectValue === undefined ||
								!hasOwnProperty.call(object, key)
									? sourceValue
									: objectValue;
							}

							/**
     * A specialized version of `_.assign` for customizing assigned values without
     * support for argument juggling, multiple sources, and `this` binding `customizer`
     * functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {Function} customizer The function to customize assigned values.
     * @returns {Object} Returns `object`.
     */
							function assignWith(object, source, customizer) {
								var index = -1,
									props = keys(source),
									length = props.length;

								while (++index < length) {
									var key = props[index],
										value = object[key],
										result = customizer(
											value,
											source[key],
											key,
											object,
											source
										);

									if (
										(result === result ? result !== value : value === value) ||
										(value === undefined && !(key in object))
									) {
										object[key] = result;
									}
								}
								return object;
							}

							/**
     * The base implementation of `_.assign` without support for argument juggling,
     * multiple sources, and `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @returns {Object} Returns `object`.
     */
							function baseAssign(object, source) {
								return source == null
									? object
									: baseCopy(source, keys(source), object);
							}

							/**
     * The base implementation of `_.at` without support for string collections
     * and individual key arguments.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {number[]|string[]} props The property names or indexes of elements to pick.
     * @returns {Array} Returns the new array of picked elements.
     */
							function baseAt(collection, props) {
								var index = -1,
									isNil = collection == null,
									isArr = !isNil && isArrayLike(collection),
									length = isArr ? collection.length : 0,
									propsLength = props.length,
									result = Array(propsLength);

								while (++index < propsLength) {
									var key = props[index];
									if (isArr) {
										result[index] = isIndex(key, length)
											? collection[key]
											: undefined;
									} else {
										result[index] = isNil ? undefined : collection[key];
									}
								}
								return result;
							}

							/**
     * Copies properties of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy properties from.
     * @param {Array} props The property names to copy.
     * @param {Object} [object={}] The object to copy properties to.
     * @returns {Object} Returns `object`.
     */
							function baseCopy(source, props, object) {
								object || (object = {});

								var index = -1,
									length = props.length;

								while (++index < length) {
									var key = props[index];
									object[key] = source[key];
								}
								return object;
							}

							/**
     * The base implementation of `_.callback` which supports specifying the
     * number of arguments to provide to `func`.
     *
     * @private
     * @param {*} [func=_.identity] The value to convert to a callback.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {number} [argCount] The number of arguments to provide to `func`.
     * @returns {Function} Returns the callback.
     */
							function baseCallback(func, thisArg, argCount) {
								var type = typeof func;
								if (type == 'function') {
									return thisArg === undefined
										? func
										: bindCallback(func, thisArg, argCount);
								}
								if (func == null) {
									return identity;
								}
								if (type == 'object') {
									return baseMatches(func);
								}
								return thisArg === undefined
									? property(func)
									: baseMatchesProperty(func, thisArg);
							}

							/**
     * The base implementation of `_.clone` without support for argument juggling
     * and `this` binding `customizer` functions.
     *
     * @private
     * @param {*} value The value to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @param {Function} [customizer] The function to customize cloning values.
     * @param {string} [key] The key of `value`.
     * @param {Object} [object] The object `value` belongs to.
     * @param {Array} [stackA=[]] Tracks traversed source objects.
     * @param {Array} [stackB=[]] Associates clones with source counterparts.
     * @returns {*} Returns the cloned value.
     */
							function baseClone(
								value,
								isDeep,
								customizer,
								key,
								object,
								stackA,
								stackB
							) {
								var result;
								if (customizer) {
									result = object
										? customizer(value, key, object)
										: customizer(value);
								}
								if (result !== undefined) {
									return result;
								}
								if (!isObject(value)) {
									return value;
								}
								var isArr = isArray(value);
								if (isArr) {
									result = initCloneArray(value);
									if (!isDeep) {
										return arrayCopy(value, result);
									}
								} else {
									var tag = objToString.call(value),
										isFunc = tag == funcTag;

									if (
										tag == objectTag ||
										tag == argsTag ||
										(isFunc && !object)
									) {
										result = initCloneObject(isFunc ? {} : value);
										if (!isDeep) {
											return baseAssign(result, value);
										}
									} else {
										return cloneableTags[tag]
											? initCloneByTag(value, tag, isDeep)
											: object ? value : {};
									}
								}
								// Check for circular references and return its corresponding clone.
								stackA || (stackA = []);
								stackB || (stackB = []);

								var length = stackA.length;
								while (length--) {
									if (stackA[length] == value) {
										return stackB[length];
									}
								}
								// Add the source value to the stack of traversed objects and associate it with its clone.
								stackA.push(value);
								stackB.push(result);

								// Recursively populate clone (susceptible to call stack limits).
								(isArr ? arrayEach : baseForOwn)(value, function(
									subValue,
									key
								) {
									result[key] = baseClone(
										subValue,
										isDeep,
										customizer,
										key,
										value,
										stackA,
										stackB
									);
								});
								return result;
							}

							/**
     * The base implementation of `_.create` without support for assigning
     * properties to the created object.
     *
     * @private
     * @param {Object} prototype The object to inherit from.
     * @returns {Object} Returns the new object.
     */
							var baseCreate = (function() {
								function object() {}
								return function(prototype) {
									if (isObject(prototype)) {
										object.prototype = prototype;
										var result = new object();
										object.prototype = undefined;
									}
									return result || {};
								};
							})();

							/**
     * The base implementation of `_.delay` and `_.defer` which accepts an index
     * of where to slice the arguments to provide to `func`.
     *
     * @private
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay invocation.
     * @param {Object} args The arguments provide to `func`.
     * @returns {number} Returns the timer id.
     */
							function baseDelay(func, wait, args) {
								if (typeof func != 'function') {
									throw new TypeError(FUNC_ERROR_TEXT);
								}
								return setTimeout(function() {
									func.apply(undefined, args);
								}, wait);
							}

							/**
     * The base implementation of `_.difference` which accepts a single array
     * of values to exclude.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Array} values The values to exclude.
     * @returns {Array} Returns the new array of filtered values.
     */
							function baseDifference(array, values) {
								var length = array ? array.length : 0,
									result = [];

								if (!length) {
									return result;
								}
								var index = -1,
									indexOf = getIndexOf(),
									isCommon = indexOf == baseIndexOf,
									cache =
										isCommon && values.length >= LARGE_ARRAY_SIZE
											? createCache(values)
											: null,
									valuesLength = values.length;

								if (cache) {
									indexOf = cacheIndexOf;
									isCommon = false;
									values = cache;
								}
								outer: while (++index < length) {
									var value = array[index];

									if (isCommon && value === value) {
										var valuesIndex = valuesLength;
										while (valuesIndex--) {
											if (values[valuesIndex] === value) {
												continue outer;
											}
										}
										result.push(value);
									} else if (indexOf(values, value, 0) < 0) {
										result.push(value);
									}
								}
								return result;
							}

							/**
     * The base implementation of `_.forEach` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array|Object|string} Returns `collection`.
     */
							var baseEach = createBaseEach(baseForOwn);

							/**
     * The base implementation of `_.forEachRight` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array|Object|string} Returns `collection`.
     */
							var baseEachRight = createBaseEach(baseForOwnRight, true);

							/**
     * The base implementation of `_.every` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if all elements pass the predicate check,
     *  else `false`
     */
							function baseEvery(collection, predicate) {
								var result = true;
								baseEach(collection, function(value, index, collection) {
									result = !!predicate(value, index, collection);
									return result;
								});
								return result;
							}

							/**
     * Gets the extremum value of `collection` invoking `iteratee` for each value
     * in `collection` to generate the criterion by which the value is ranked.
     * The `iteratee` is invoked with three arguments: (value, index|key, collection).
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} comparator The function used to compare values.
     * @param {*} exValue The initial extremum value.
     * @returns {*} Returns the extremum value.
     */
							function baseExtremum(collection, iteratee, comparator, exValue) {
								var computed = exValue,
									result = computed;

								baseEach(collection, function(value, index, collection) {
									var current = +iteratee(value, index, collection);
									if (
										comparator(current, computed) ||
										(current === exValue && current === result)
									) {
										computed = current;
										result = value;
									}
								});
								return result;
							}

							/**
     * The base implementation of `_.fill` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to fill.
     * @param {*} value The value to fill `array` with.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns `array`.
     */
							function baseFill(array, value, start, end) {
								var length = array.length;

								start = start == null ? 0 : +start || 0;
								if (start < 0) {
									start = -start > length ? 0 : length + start;
								}
								end = end === undefined || end > length ? length : +end || 0;
								if (end < 0) {
									end += length;
								}
								length = start > end ? 0 : end >>> 0;
								start >>>= 0;

								while (start < length) {
									array[start++] = value;
								}
								return array;
							}

							/**
     * The base implementation of `_.filter` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     */
							function baseFilter(collection, predicate) {
								var result = [];
								baseEach(collection, function(value, index, collection) {
									if (predicate(value, index, collection)) {
										result.push(value);
									}
								});
								return result;
							}

							/**
     * The base implementation of `_.find`, `_.findLast`, `_.findKey`, and `_.findLastKey`,
     * without support for callback shorthands and `this` binding, which iterates
     * over `collection` using the provided `eachFunc`.
     *
     * @private
     * @param {Array|Object|string} collection The collection to search.
     * @param {Function} predicate The function invoked per iteration.
     * @param {Function} eachFunc The function to iterate over `collection`.
     * @param {boolean} [retKey] Specify returning the key of the found element
     *  instead of the element itself.
     * @returns {*} Returns the found element or its key, else `undefined`.
     */
							function baseFind(collection, predicate, eachFunc, retKey) {
								var result;
								eachFunc(collection, function(value, key, collection) {
									if (predicate(value, key, collection)) {
										result = retKey ? key : value;
										return false;
									}
								});
								return result;
							}

							/**
     * The base implementation of `_.flatten` with added support for restricting
     * flattening and specifying the start index.
     *
     * @private
     * @param {Array} array The array to flatten.
     * @param {boolean} [isDeep] Specify a deep flatten.
     * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
     * @param {Array} [result=[]] The initial result value.
     * @returns {Array} Returns the new flattened array.
     */
							function baseFlatten(array, isDeep, isStrict, result) {
								result || (result = []);

								var index = -1,
									length = array.length;

								while (++index < length) {
									var value = array[index];
									if (
										isObjectLike(value) &&
										isArrayLike(value) &&
										(isStrict || isArray(value) || isArguments(value))
									) {
										if (isDeep) {
											// Recursively flatten arrays (susceptible to call stack limits).
											baseFlatten(value, isDeep, isStrict, result);
										} else {
											arrayPush(result, value);
										}
									} else if (!isStrict) {
										result[result.length] = value;
									}
								}
								return result;
							}

							/**
     * The base implementation of `baseForIn` and `baseForOwn` which iterates
     * over `object` properties returned by `keysFunc` invoking `iteratee` for
     * each property. Iteratee functions may exit iteration early by explicitly
     * returning `false`.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @returns {Object} Returns `object`.
     */
							var baseFor = createBaseFor();

							/**
     * This function is like `baseFor` except that it iterates over properties
     * in the opposite order.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @returns {Object} Returns `object`.
     */
							var baseForRight = createBaseFor(true);

							/**
     * The base implementation of `_.forIn` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */
							function baseForIn(object, iteratee) {
								return baseFor(object, iteratee, keysIn);
							}

							/**
     * The base implementation of `_.forOwn` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */
							function baseForOwn(object, iteratee) {
								return baseFor(object, iteratee, keys);
							}

							/**
     * The base implementation of `_.forOwnRight` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */
							function baseForOwnRight(object, iteratee) {
								return baseForRight(object, iteratee, keys);
							}

							/**
     * The base implementation of `_.functions` which creates an array of
     * `object` function property names filtered from those provided.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Array} props The property names to filter.
     * @returns {Array} Returns the new array of filtered property names.
     */
							function baseFunctions(object, props) {
								var index = -1,
									length = props.length,
									resIndex = -1,
									result = [];

								while (++index < length) {
									var key = props[index];
									if (isFunction(object[key])) {
										result[++resIndex] = key;
									}
								}
								return result;
							}

							/**
     * The base implementation of `get` without support for string paths
     * and default values.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array} path The path of the property to get.
     * @param {string} [pathKey] The key representation of path.
     * @returns {*} Returns the resolved value.
     */
							function baseGet(object, path, pathKey) {
								if (object == null) {
									return;
								}
								if (pathKey !== undefined && pathKey in toObject(object)) {
									path = [pathKey];
								}
								var index = 0,
									length = path.length;

								while (object != null && index < length) {
									object = object[path[index++]];
								}
								return index && index == length ? object : undefined;
							}

							/**
     * The base implementation of `_.isEqual` without support for `this` binding
     * `customizer` functions.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @param {Function} [customizer] The function to customize comparing values.
     * @param {boolean} [isLoose] Specify performing partial comparisons.
     * @param {Array} [stackA] Tracks traversed `value` objects.
     * @param {Array} [stackB] Tracks traversed `other` objects.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     */
							function baseIsEqual(
								value,
								other,
								customizer,
								isLoose,
								stackA,
								stackB
							) {
								if (value === other) {
									return true;
								}
								if (
									value == null ||
									other == null ||
									(!isObject(value) && !isObjectLike(other))
								) {
									return value !== value && other !== other;
								}
								return baseIsEqualDeep(
									value,
									other,
									baseIsEqual,
									customizer,
									isLoose,
									stackA,
									stackB
								);
							}

							/**
     * A specialized version of `baseIsEqual` for arrays and objects which performs
     * deep comparisons and tracks traversed objects enabling objects with circular
     * references to be compared.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Function} [customizer] The function to customize comparing objects.
     * @param {boolean} [isLoose] Specify performing partial comparisons.
     * @param {Array} [stackA=[]] Tracks traversed `value` objects.
     * @param {Array} [stackB=[]] Tracks traversed `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
							function baseIsEqualDeep(
								object,
								other,
								equalFunc,
								customizer,
								isLoose,
								stackA,
								stackB
							) {
								var objIsArr = isArray(object),
									othIsArr = isArray(other),
									objTag = arrayTag,
									othTag = arrayTag;

								if (!objIsArr) {
									objTag = objToString.call(object);
									if (objTag == argsTag) {
										objTag = objectTag;
									} else if (objTag != objectTag) {
										objIsArr = isTypedArray(object);
									}
								}
								if (!othIsArr) {
									othTag = objToString.call(other);
									if (othTag == argsTag) {
										othTag = objectTag;
									} else if (othTag != objectTag) {
										othIsArr = isTypedArray(other);
									}
								}
								var objIsObj = objTag == objectTag,
									othIsObj = othTag == objectTag,
									isSameTag = objTag == othTag;

								if (isSameTag && !(objIsArr || objIsObj)) {
									return equalByTag(object, other, objTag);
								}
								if (!isLoose) {
									var objIsWrapped =
											objIsObj && hasOwnProperty.call(object, '__wrapped__'),
										othIsWrapped =
											othIsObj && hasOwnProperty.call(other, '__wrapped__');

									if (objIsWrapped || othIsWrapped) {
										return equalFunc(
											objIsWrapped ? object.value() : object,
											othIsWrapped ? other.value() : other,
											customizer,
											isLoose,
											stackA,
											stackB
										);
									}
								}
								if (!isSameTag) {
									return false;
								}
								// Assume cyclic values are equal.
								// For more information on detecting circular references see https://es5.github.io/#JO.
								stackA || (stackA = []);
								stackB || (stackB = []);

								var length = stackA.length;
								while (length--) {
									if (stackA[length] == object) {
										return stackB[length] == other;
									}
								}
								// Add `object` and `other` to the stack of traversed objects.
								stackA.push(object);
								stackB.push(other);

								var result = (objIsArr ? equalArrays : equalObjects)(
									object,
									other,
									equalFunc,
									customizer,
									isLoose,
									stackA,
									stackB
								);

								stackA.pop();
								stackB.pop();

								return result;
							}

							/**
     * The base implementation of `_.isMatch` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Array} matchData The propery names, values, and compare flags to match.
     * @param {Function} [customizer] The function to customize comparing objects.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     */
							function baseIsMatch(object, matchData, customizer) {
								var index = matchData.length,
									length = index,
									noCustomizer = !customizer;

								if (object == null) {
									return !length;
								}
								object = toObject(object);
								while (index--) {
									var data = matchData[index];
									if (
										noCustomizer && data[2]
											? data[1] !== object[data[0]]
											: !(data[0] in object)
									) {
										return false;
									}
								}
								while (++index < length) {
									data = matchData[index];
									var key = data[0],
										objValue = object[key],
										srcValue = data[1];

									if (noCustomizer && data[2]) {
										if (objValue === undefined && !(key in object)) {
											return false;
										}
									} else {
										var result = customizer
											? customizer(objValue, srcValue, key)
											: undefined;
										if (
											!(result === undefined
												? baseIsEqual(srcValue, objValue, customizer, true)
												: result)
										) {
											return false;
										}
									}
								}
								return true;
							}

							/**
     * The base implementation of `_.map` without support for callback shorthands
     * and `this` binding.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     */
							function baseMap(collection, iteratee) {
								var index = -1,
									result = isArrayLike(collection)
										? Array(collection.length)
										: [];

								baseEach(collection, function(value, key, collection) {
									result[++index] = iteratee(value, key, collection);
								});
								return result;
							}

							/**
     * The base implementation of `_.matches` which does not clone `source`.
     *
     * @private
     * @param {Object} source The object of property values to match.
     * @returns {Function} Returns the new function.
     */
							function baseMatches(source) {
								var matchData = getMatchData(source);
								if (matchData.length == 1 && matchData[0][2]) {
									var key = matchData[0][0],
										value = matchData[0][1];

									return function(object) {
										if (object == null) {
											return false;
										}
										return (
											object[key] === value &&
											(value !== undefined || key in toObject(object))
										);
									};
								}
								return function(object) {
									return baseIsMatch(object, matchData);
								};
							}

							/**
     * The base implementation of `_.matchesProperty` which does not clone `srcValue`.
     *
     * @private
     * @param {string} path The path of the property to get.
     * @param {*} srcValue The value to compare.
     * @returns {Function} Returns the new function.
     */
							function baseMatchesProperty(path, srcValue) {
								var isArr = isArray(path),
									isCommon = isKey(path) && isStrictComparable(srcValue),
									pathKey = path + '';

								path = toPath(path);
								return function(object) {
									if (object == null) {
										return false;
									}
									var key = pathKey;
									object = toObject(object);
									if ((isArr || !isCommon) && !(key in object)) {
										object =
											path.length == 1
												? object
												: baseGet(object, baseSlice(path, 0, -1));
										if (object == null) {
											return false;
										}
										key = last(path);
										object = toObject(object);
									}
									return object[key] === srcValue
										? srcValue !== undefined || key in object
										: baseIsEqual(srcValue, object[key], undefined, true);
								};
							}

							/**
     * The base implementation of `_.merge` without support for argument juggling,
     * multiple sources, and `this` binding `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {Function} [customizer] The function to customize merged values.
     * @param {Array} [stackA=[]] Tracks traversed source objects.
     * @param {Array} [stackB=[]] Associates values with source counterparts.
     * @returns {Object} Returns `object`.
     */
							function baseMerge(object, source, customizer, stackA, stackB) {
								if (!isObject(object)) {
									return object;
								}
								var isSrcArr =
										isArrayLike(source) &&
										(isArray(source) || isTypedArray(source)),
									props = isSrcArr ? undefined : keys(source);

								arrayEach(props || source, function(srcValue, key) {
									if (props) {
										key = srcValue;
										srcValue = source[key];
									}
									if (isObjectLike(srcValue)) {
										stackA || (stackA = []);
										stackB || (stackB = []);
										baseMergeDeep(
											object,
											source,
											key,
											baseMerge,
											customizer,
											stackA,
											stackB
										);
									} else {
										var value = object[key],
											result = customizer
												? customizer(value, srcValue, key, object, source)
												: undefined,
											isCommon = result === undefined;

										if (isCommon) {
											result = srcValue;
										}
										if (
											(result !== undefined ||
												(isSrcArr && !(key in object))) &&
											(isCommon ||
												(result === result
													? result !== value
													: value === value))
										) {
											object[key] = result;
										}
									}
								});
								return object;
							}

							/**
     * A specialized version of `baseMerge` for arrays and objects which performs
     * deep merges and tracks traversed objects enabling objects with circular
     * references to be merged.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {string} key The key of the value to merge.
     * @param {Function} mergeFunc The function to merge values.
     * @param {Function} [customizer] The function to customize merged values.
     * @param {Array} [stackA=[]] Tracks traversed source objects.
     * @param {Array} [stackB=[]] Associates values with source counterparts.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
							function baseMergeDeep(
								object,
								source,
								key,
								mergeFunc,
								customizer,
								stackA,
								stackB
							) {
								var length = stackA.length,
									srcValue = source[key];

								while (length--) {
									if (stackA[length] == srcValue) {
										object[key] = stackB[length];
										return;
									}
								}
								var value = object[key],
									result = customizer
										? customizer(value, srcValue, key, object, source)
										: undefined,
									isCommon = result === undefined;

								if (isCommon) {
									result = srcValue;
									if (
										isArrayLike(srcValue) &&
										(isArray(srcValue) || isTypedArray(srcValue))
									) {
										result = isArray(value)
											? value
											: isArrayLike(value) ? arrayCopy(value) : [];
									} else if (isPlainObject(srcValue) || isArguments(srcValue)) {
										result = isArguments(value)
											? toPlainObject(value)
											: isPlainObject(value) ? value : {};
									} else {
										isCommon = false;
									}
								}
								// Add the source value to the stack of traversed objects and associate
								// it with its merged value.
								stackA.push(srcValue);
								stackB.push(result);

								if (isCommon) {
									// Recursively merge objects and arrays (susceptible to call stack limits).
									object[key] = mergeFunc(
										result,
										srcValue,
										customizer,
										stackA,
										stackB
									);
								} else if (
									result === result ? result !== value : value === value
								) {
									object[key] = result;
								}
							}

							/**
     * The base implementation of `_.property` without support for deep paths.
     *
     * @private
     * @param {string} key The key of the property to get.
     * @returns {Function} Returns the new function.
     */
							function baseProperty(key) {
								return function(object) {
									return object == null ? undefined : object[key];
								};
							}

							/**
     * A specialized version of `baseProperty` which supports deep paths.
     *
     * @private
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new function.
     */
							function basePropertyDeep(path) {
								var pathKey = path + '';
								path = toPath(path);
								return function(object) {
									return baseGet(object, path, pathKey);
								};
							}

							/**
     * The base implementation of `_.pullAt` without support for individual
     * index arguments and capturing the removed elements.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {number[]} indexes The indexes of elements to remove.
     * @returns {Array} Returns `array`.
     */
							function basePullAt(array, indexes) {
								var length = array ? indexes.length : 0;
								while (length--) {
									var index = indexes[length];
									if (index != previous && isIndex(index)) {
										var previous = index;
										splice.call(array, index, 1);
									}
								}
								return array;
							}

							/**
     * The base implementation of `_.random` without support for argument juggling
     * and returning floating-point numbers.
     *
     * @private
     * @param {number} min The minimum possible value.
     * @param {number} max The maximum possible value.
     * @returns {number} Returns the random number.
     */
							function baseRandom(min, max) {
								return min + nativeFloor(nativeRandom() * (max - min + 1));
							}

							/**
     * The base implementation of `_.reduce` and `_.reduceRight` without support
     * for callback shorthands and `this` binding, which iterates over `collection`
     * using the provided `eachFunc`.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {*} accumulator The initial value.
     * @param {boolean} initFromCollection Specify using the first or last element
     *  of `collection` as the initial value.
     * @param {Function} eachFunc The function to iterate over `collection`.
     * @returns {*} Returns the accumulated value.
     */
							function baseReduce(
								collection,
								iteratee,
								accumulator,
								initFromCollection,
								eachFunc
							) {
								eachFunc(collection, function(value, index, collection) {
									accumulator = initFromCollection
										? ((initFromCollection = false), value)
										: iteratee(accumulator, value, index, collection);
								});
								return accumulator;
							}

							/**
     * The base implementation of `setData` without support for hot loop detection.
     *
     * @private
     * @param {Function} func The function to associate metadata with.
     * @param {*} data The metadata.
     * @returns {Function} Returns `func`.
     */
							var baseSetData = !metaMap
								? identity
								: function(func, data) {
										metaMap.set(func, data);
										return func;
									};

							/**
     * The base implementation of `_.slice` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */
							function baseSlice(array, start, end) {
								var index = -1,
									length = array.length;

								start = start == null ? 0 : +start || 0;
								if (start < 0) {
									start = -start > length ? 0 : length + start;
								}
								end = end === undefined || end > length ? length : +end || 0;
								if (end < 0) {
									end += length;
								}
								length = start > end ? 0 : (end - start) >>> 0;
								start >>>= 0;

								var result = Array(length);
								while (++index < length) {
									result[index] = array[index + start];
								}
								return result;
							}

							/**
     * The base implementation of `_.some` without support for callback shorthands
     * and `this` binding.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     */
							function baseSome(collection, predicate) {
								var result;

								baseEach(collection, function(value, index, collection) {
									result = predicate(value, index, collection);
									return !result;
								});
								return !!result;
							}

							/**
     * The base implementation of `_.sortBy` which uses `comparer` to define
     * the sort order of `array` and replaces criteria objects with their
     * corresponding values.
     *
     * @private
     * @param {Array} array The array to sort.
     * @param {Function} comparer The function to define sort order.
     * @returns {Array} Returns `array`.
     */
							function baseSortBy(array, comparer) {
								var length = array.length;

								array.sort(comparer);
								while (length--) {
									array[length] = array[length].value;
								}
								return array;
							}

							/**
     * The base implementation of `_.sortByOrder` without param guards.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
     * @param {boolean[]} orders The sort orders of `iteratees`.
     * @returns {Array} Returns the new sorted array.
     */
							function baseSortByOrder(collection, iteratees, orders) {
								var callback = getCallback(),
									index = -1;

								iteratees = arrayMap(iteratees, function(iteratee) {
									return callback(iteratee);
								});

								var result = baseMap(collection, function(value) {
									var criteria = arrayMap(iteratees, function(iteratee) {
										return iteratee(value);
									});
									return { criteria: criteria, index: ++index, value: value };
								});

								return baseSortBy(result, function(object, other) {
									return compareMultiple(object, other, orders);
								});
							}

							/**
     * The base implementation of `_.sum` without support for callback shorthands
     * and `this` binding.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {number} Returns the sum.
     */
							function baseSum(collection, iteratee) {
								var result = 0;
								baseEach(collection, function(value, index, collection) {
									result += +iteratee(value, index, collection) || 0;
								});
								return result;
							}

							/**
     * The base implementation of `_.uniq` without support for callback shorthands
     * and `this` binding.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee] The function invoked per iteration.
     * @returns {Array} Returns the new duplicate-value-free array.
     */
							function baseUniq(array, iteratee) {
								var index = -1,
									indexOf = getIndexOf(),
									length = array.length,
									isCommon = indexOf == baseIndexOf,
									isLarge = isCommon && length >= LARGE_ARRAY_SIZE,
									seen = isLarge ? createCache() : null,
									result = [];

								if (seen) {
									indexOf = cacheIndexOf;
									isCommon = false;
								} else {
									isLarge = false;
									seen = iteratee ? [] : result;
								}
								outer: while (++index < length) {
									var value = array[index],
										computed = iteratee ? iteratee(value, index, array) : value;

									if (isCommon && value === value) {
										var seenIndex = seen.length;
										while (seenIndex--) {
											if (seen[seenIndex] === computed) {
												continue outer;
											}
										}
										if (iteratee) {
											seen.push(computed);
										}
										result.push(value);
									} else if (indexOf(seen, computed, 0) < 0) {
										if (iteratee || isLarge) {
											seen.push(computed);
										}
										result.push(value);
									}
								}
								return result;
							}

							/**
     * The base implementation of `_.values` and `_.valuesIn` which creates an
     * array of `object` property values corresponding to the property names
     * of `props`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array} props The property names to get values for.
     * @returns {Object} Returns the array of property values.
     */
							function baseValues(object, props) {
								var index = -1,
									length = props.length,
									result = Array(length);

								while (++index < length) {
									result[index] = object[props[index]];
								}
								return result;
							}

							/**
     * The base implementation of `_.dropRightWhile`, `_.dropWhile`, `_.takeRightWhile`,
     * and `_.takeWhile` without support for callback shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to query.
     * @param {Function} predicate The function invoked per iteration.
     * @param {boolean} [isDrop] Specify dropping elements instead of taking them.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Array} Returns the slice of `array`.
     */
							function baseWhile(array, predicate, isDrop, fromRight) {
								var length = array.length,
									index = fromRight ? length : -1;

								while (
									(fromRight ? index-- : ++index < length) &&
									predicate(array[index], index, array)
								) {}
								return isDrop
									? baseSlice(
											array,
											fromRight ? 0 : index,
											fromRight ? index + 1 : length
										)
									: baseSlice(
											array,
											fromRight ? index + 1 : 0,
											fromRight ? length : index
										);
							}

							/**
     * The base implementation of `wrapperValue` which returns the result of
     * performing a sequence of actions on the unwrapped `value`, where each
     * successive action is supplied the return value of the previous.
     *
     * @private
     * @param {*} value The unwrapped value.
     * @param {Array} actions Actions to peform to resolve the unwrapped value.
     * @returns {*} Returns the resolved value.
     */
							function baseWrapperValue(value, actions) {
								var result = value;
								if (result instanceof LazyWrapper) {
									result = result.value();
								}
								var index = -1,
									length = actions.length;

								while (++index < length) {
									var action = actions[index];
									result = action.func.apply(
										action.thisArg,
										arrayPush([result], action.args)
									);
								}
								return result;
							}

							/**
     * Performs a binary search of `array` to determine the index at which `value`
     * should be inserted into `array` in order to maintain its sort order.
     *
     * @private
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {boolean} [retHighest] Specify returning the highest qualified index.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     */
							function binaryIndex(array, value, retHighest) {
								var low = 0,
									high = array ? array.length : low;

								if (
									typeof value == 'number' &&
									value === value &&
									high <= HALF_MAX_ARRAY_LENGTH
								) {
									while (low < high) {
										var mid = (low + high) >>> 1,
											computed = array[mid];

										if (
											(retHighest ? computed <= value : computed < value) &&
											computed !== null
										) {
											low = mid + 1;
										} else {
											high = mid;
										}
									}
									return high;
								}
								return binaryIndexBy(array, value, identity, retHighest);
							}

							/**
     * This function is like `binaryIndex` except that it invokes `iteratee` for
     * `value` and each element of `array` to compute their sort ranking. The
     * iteratee is invoked with one argument; (value).
     *
     * @private
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {boolean} [retHighest] Specify returning the highest qualified index.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     */
							function binaryIndexBy(array, value, iteratee, retHighest) {
								value = iteratee(value);

								var low = 0,
									high = array ? array.length : 0,
									valIsNaN = value !== value,
									valIsNull = value === null,
									valIsUndef = value === undefined;

								while (low < high) {
									var mid = nativeFloor((low + high) / 2),
										computed = iteratee(array[mid]),
										isDef = computed !== undefined,
										isReflexive = computed === computed;

									if (valIsNaN) {
										var setLow = isReflexive || retHighest;
									} else if (valIsNull) {
										setLow =
											isReflexive && isDef && (retHighest || computed != null);
									} else if (valIsUndef) {
										setLow = isReflexive && (retHighest || isDef);
									} else if (computed == null) {
										setLow = false;
									} else {
										setLow = retHighest ? computed <= value : computed < value;
									}
									if (setLow) {
										low = mid + 1;
									} else {
										high = mid;
									}
								}
								return nativeMin(high, MAX_ARRAY_INDEX);
							}

							/**
     * A specialized version of `baseCallback` which only supports `this` binding
     * and specifying the number of arguments to provide to `func`.
     *
     * @private
     * @param {Function} func The function to bind.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {number} [argCount] The number of arguments to provide to `func`.
     * @returns {Function} Returns the callback.
     */
							function bindCallback(func, thisArg, argCount) {
								if (typeof func != 'function') {
									return identity;
								}
								if (thisArg === undefined) {
									return func;
								}
								switch (argCount) {
									case 1:
										return function(value) {
											return func.call(thisArg, value);
										};
									case 3:
										return function(value, index, collection) {
											return func.call(thisArg, value, index, collection);
										};
									case 4:
										return function(accumulator, value, index, collection) {
											return func.call(
												thisArg,
												accumulator,
												value,
												index,
												collection
											);
										};
									case 5:
										return function(value, other, key, object, source) {
											return func.call(
												thisArg,
												value,
												other,
												key,
												object,
												source
											);
										};
								}
								return function() {
									return func.apply(thisArg, arguments);
								};
							}

							/**
     * Creates a clone of the given array buffer.
     *
     * @private
     * @param {ArrayBuffer} buffer The array buffer to clone.
     * @returns {ArrayBuffer} Returns the cloned array buffer.
     */
							function bufferClone(buffer) {
								var result = new ArrayBuffer(buffer.byteLength),
									view = new Uint8Array(result);

								view.set(new Uint8Array(buffer));
								return result;
							}

							/**
     * Creates an array that is the composition of partially applied arguments,
     * placeholders, and provided arguments into a single array of arguments.
     *
     * @private
     * @param {Array|Object} args The provided arguments.
     * @param {Array} partials The arguments to prepend to those provided.
     * @param {Array} holders The `partials` placeholder indexes.
     * @returns {Array} Returns the new array of composed arguments.
     */
							function composeArgs(args, partials, holders) {
								var holdersLength = holders.length,
									argsIndex = -1,
									argsLength = nativeMax(args.length - holdersLength, 0),
									leftIndex = -1,
									leftLength = partials.length,
									result = Array(leftLength + argsLength);

								while (++leftIndex < leftLength) {
									result[leftIndex] = partials[leftIndex];
								}
								while (++argsIndex < holdersLength) {
									result[holders[argsIndex]] = args[argsIndex];
								}
								while (argsLength--) {
									result[leftIndex++] = args[argsIndex++];
								}
								return result;
							}

							/**
     * This function is like `composeArgs` except that the arguments composition
     * is tailored for `_.partialRight`.
     *
     * @private
     * @param {Array|Object} args The provided arguments.
     * @param {Array} partials The arguments to append to those provided.
     * @param {Array} holders The `partials` placeholder indexes.
     * @returns {Array} Returns the new array of composed arguments.
     */
							function composeArgsRight(args, partials, holders) {
								var holdersIndex = -1,
									holdersLength = holders.length,
									argsIndex = -1,
									argsLength = nativeMax(args.length - holdersLength, 0),
									rightIndex = -1,
									rightLength = partials.length,
									result = Array(argsLength + rightLength);

								while (++argsIndex < argsLength) {
									result[argsIndex] = args[argsIndex];
								}
								var offset = argsIndex;
								while (++rightIndex < rightLength) {
									result[offset + rightIndex] = partials[rightIndex];
								}
								while (++holdersIndex < holdersLength) {
									result[offset + holders[holdersIndex]] = args[argsIndex++];
								}
								return result;
							}

							/**
     * Creates a `_.countBy`, `_.groupBy`, `_.indexBy`, or `_.partition` function.
     *
     * @private
     * @param {Function} setter The function to set keys and values of the accumulator object.
     * @param {Function} [initializer] The function to initialize the accumulator object.
     * @returns {Function} Returns the new aggregator function.
     */
							function createAggregator(setter, initializer) {
								return function(collection, iteratee, thisArg) {
									var result = initializer ? initializer() : {};
									iteratee = getCallback(iteratee, thisArg, 3);

									if (isArray(collection)) {
										var index = -1,
											length = collection.length;

										while (++index < length) {
											var value = collection[index];
											setter(
												result,
												value,
												iteratee(value, index, collection),
												collection
											);
										}
									} else {
										baseEach(collection, function(value, key, collection) {
											setter(
												result,
												value,
												iteratee(value, key, collection),
												collection
											);
										});
									}
									return result;
								};
							}

							/**
     * Creates a `_.assign`, `_.defaults`, or `_.merge` function.
     *
     * @private
     * @param {Function} assigner The function to assign values.
     * @returns {Function} Returns the new assigner function.
     */
							function createAssigner(assigner) {
								return restParam(function(object, sources) {
									var index = -1,
										length = object == null ? 0 : sources.length,
										customizer = length > 2 ? sources[length - 2] : undefined,
										guard = length > 2 ? sources[2] : undefined,
										thisArg = length > 1 ? sources[length - 1] : undefined;

									if (typeof customizer == 'function') {
										customizer = bindCallback(customizer, thisArg, 5);
										length -= 2;
									} else {
										customizer =
											typeof thisArg == 'function' ? thisArg : undefined;
										length -= customizer ? 1 : 0;
									}
									if (guard && isIterateeCall(sources[0], sources[1], guard)) {
										customizer = length < 3 ? undefined : customizer;
										length = 1;
									}
									while (++index < length) {
										var source = sources[index];
										if (source) {
											assigner(object, source, customizer);
										}
									}
									return object;
								});
							}

							/**
     * Creates a `baseEach` or `baseEachRight` function.
     *
     * @private
     * @param {Function} eachFunc The function to iterate over a collection.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */
							function createBaseEach(eachFunc, fromRight) {
								return function(collection, iteratee) {
									var length = collection ? getLength(collection) : 0;
									if (!isLength(length)) {
										return eachFunc(collection, iteratee);
									}
									var index = fromRight ? length : -1,
										iterable = toObject(collection);

									while (fromRight ? index-- : ++index < length) {
										if (iteratee(iterable[index], index, iterable) === false) {
											break;
										}
									}
									return collection;
								};
							}

							/**
     * Creates a base function for `_.forIn` or `_.forInRight`.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */
							function createBaseFor(fromRight) {
								return function(object, iteratee, keysFunc) {
									var iterable = toObject(object),
										props = keysFunc(object),
										length = props.length,
										index = fromRight ? length : -1;

									while (fromRight ? index-- : ++index < length) {
										var key = props[index];
										if (iteratee(iterable[key], key, iterable) === false) {
											break;
										}
									}
									return object;
								};
							}

							/**
     * Creates a function that wraps `func` and invokes it with the `this`
     * binding of `thisArg`.
     *
     * @private
     * @param {Function} func The function to bind.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @returns {Function} Returns the new bound function.
     */
							function createBindWrapper(func, thisArg) {
								var Ctor = createCtorWrapper(func);

								function wrapper() {
									var fn =
										this && this !== root && this instanceof wrapper
											? Ctor
											: func;
									return fn.apply(thisArg, arguments);
								}
								return wrapper;
							}

							/**
     * Creates a `Set` cache object to optimize linear searches of large arrays.
     *
     * @private
     * @param {Array} [values] The values to cache.
     * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
     */
							function createCache(values) {
								return nativeCreate && Set ? new SetCache(values) : null;
							}

							/**
     * Creates a function that produces compound words out of the words in a
     * given string.
     *
     * @private
     * @param {Function} callback The function to combine each word.
     * @returns {Function} Returns the new compounder function.
     */
							function createCompounder(callback) {
								return function(string) {
									var index = -1,
										array = words(deburr(string)),
										length = array.length,
										result = '';

									while (++index < length) {
										result = callback(result, array[index], index);
									}
									return result;
								};
							}

							/**
     * Creates a function that produces an instance of `Ctor` regardless of
     * whether it was invoked as part of a `new` expression or by `call` or `apply`.
     *
     * @private
     * @param {Function} Ctor The constructor to wrap.
     * @returns {Function} Returns the new wrapped function.
     */
							function createCtorWrapper(Ctor) {
								return function() {
									// Use a `switch` statement to work with class constructors.
									// See http://ecma-international.org/ecma-262/6.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
									// for more details.
									var args = arguments;
									switch (args.length) {
										case 0:
											return new Ctor();
										case 1:
											return new Ctor(args[0]);
										case 2:
											return new Ctor(args[0], args[1]);
										case 3:
											return new Ctor(args[0], args[1], args[2]);
										case 4:
											return new Ctor(args[0], args[1], args[2], args[3]);
										case 5:
											return new Ctor(
												args[0],
												args[1],
												args[2],
												args[3],
												args[4]
											);
										case 6:
											return new Ctor(
												args[0],
												args[1],
												args[2],
												args[3],
												args[4],
												args[5]
											);
										case 7:
											return new Ctor(
												args[0],
												args[1],
												args[2],
												args[3],
												args[4],
												args[5],
												args[6]
											);
									}
									var thisBinding = baseCreate(Ctor.prototype),
										result = Ctor.apply(thisBinding, args);

									// Mimic the constructor's `return` behavior.
									// See https://es5.github.io/#x13.2.2 for more details.
									return isObject(result) ? result : thisBinding;
								};
							}

							/**
     * Creates a `_.curry` or `_.curryRight` function.
     *
     * @private
     * @param {boolean} flag The curry bit flag.
     * @returns {Function} Returns the new curry function.
     */
							function createCurry(flag) {
								function curryFunc(func, arity, guard) {
									if (guard && isIterateeCall(func, arity, guard)) {
										arity = undefined;
									}
									var result = createWrapper(
										func,
										flag,
										undefined,
										undefined,
										undefined,
										undefined,
										undefined,
										arity
									);
									result.placeholder = curryFunc.placeholder;
									return result;
								}
								return curryFunc;
							}

							/**
     * Creates a `_.defaults` or `_.defaultsDeep` function.
     *
     * @private
     * @param {Function} assigner The function to assign values.
     * @param {Function} customizer The function to customize assigned values.
     * @returns {Function} Returns the new defaults function.
     */
							function createDefaults(assigner, customizer) {
								return restParam(function(args) {
									var object = args[0];
									if (object == null) {
										return object;
									}
									args.push(customizer);
									return assigner.apply(undefined, args);
								});
							}

							/**
     * Creates a `_.max` or `_.min` function.
     *
     * @private
     * @param {Function} comparator The function used to compare values.
     * @param {*} exValue The initial extremum value.
     * @returns {Function} Returns the new extremum function.
     */
							function createExtremum(comparator, exValue) {
								return function(collection, iteratee, thisArg) {
									if (
										thisArg &&
										isIterateeCall(collection, iteratee, thisArg)
									) {
										iteratee = undefined;
									}
									iteratee = getCallback(iteratee, thisArg, 3);
									if (iteratee.length == 1) {
										collection = isArray(collection)
											? collection
											: toIterable(collection);
										var result = arrayExtremum(
											collection,
											iteratee,
											comparator,
											exValue
										);
										if (!(collection.length && result === exValue)) {
											return result;
										}
									}
									return baseExtremum(
										collection,
										iteratee,
										comparator,
										exValue
									);
								};
							}

							/**
     * Creates a `_.find` or `_.findLast` function.
     *
     * @private
     * @param {Function} eachFunc The function to iterate over a collection.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new find function.
     */
							function createFind(eachFunc, fromRight) {
								return function(collection, predicate, thisArg) {
									predicate = getCallback(predicate, thisArg, 3);
									if (isArray(collection)) {
										var index = baseFindIndex(collection, predicate, fromRight);
										return index > -1 ? collection[index] : undefined;
									}
									return baseFind(collection, predicate, eachFunc);
								};
							}

							/**
     * Creates a `_.findIndex` or `_.findLastIndex` function.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new find function.
     */
							function createFindIndex(fromRight) {
								return function(array, predicate, thisArg) {
									if (!(array && array.length)) {
										return -1;
									}
									predicate = getCallback(predicate, thisArg, 3);
									return baseFindIndex(array, predicate, fromRight);
								};
							}

							/**
     * Creates a `_.findKey` or `_.findLastKey` function.
     *
     * @private
     * @param {Function} objectFunc The function to iterate over an object.
     * @returns {Function} Returns the new find function.
     */
							function createFindKey(objectFunc) {
								return function(object, predicate, thisArg) {
									predicate = getCallback(predicate, thisArg, 3);
									return baseFind(object, predicate, objectFunc, true);
								};
							}

							/**
     * Creates a `_.flow` or `_.flowRight` function.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new flow function.
     */
							function createFlow(fromRight) {
								return function() {
									var wrapper,
										length = arguments.length,
										index = fromRight ? length : -1,
										leftIndex = 0,
										funcs = Array(length);

									while (fromRight ? index-- : ++index < length) {
										var func = (funcs[leftIndex++] = arguments[index]);
										if (typeof func != 'function') {
											throw new TypeError(FUNC_ERROR_TEXT);
										}
										if (
											!wrapper &&
											LodashWrapper.prototype.thru &&
											getFuncName(func) == 'wrapper'
										) {
											wrapper = new LodashWrapper([], true);
										}
									}
									index = wrapper ? -1 : length;
									while (++index < length) {
										func = funcs[index];

										var funcName = getFuncName(func),
											data = funcName == 'wrapper' ? getData(func) : undefined;

										if (
											data &&
											isLaziable(data[0]) &&
											data[1] ==
												(ARY_FLAG | CURRY_FLAG | PARTIAL_FLAG | REARG_FLAG) &&
											!data[4].length &&
											data[9] == 1
										) {
											wrapper = wrapper[getFuncName(data[0])].apply(
												wrapper,
												data[3]
											);
										} else {
											wrapper =
												func.length == 1 && isLaziable(func)
													? wrapper[funcName]()
													: wrapper.thru(func);
										}
									}
									return function() {
										var args = arguments,
											value = args[0];

										if (
											wrapper &&
											args.length == 1 &&
											isArray(value) &&
											value.length >= LARGE_ARRAY_SIZE
										) {
											return wrapper.plant(value).value();
										}
										var index = 0,
											result = length ? funcs[index].apply(this, args) : value;

										while (++index < length) {
											result = funcs[index].call(this, result);
										}
										return result;
									};
								};
							}

							/**
     * Creates a function for `_.forEach` or `_.forEachRight`.
     *
     * @private
     * @param {Function} arrayFunc The function to iterate over an array.
     * @param {Function} eachFunc The function to iterate over a collection.
     * @returns {Function} Returns the new each function.
     */
							function createForEach(arrayFunc, eachFunc) {
								return function(collection, iteratee, thisArg) {
									return typeof iteratee == 'function' &&
									thisArg === undefined &&
									isArray(collection)
										? arrayFunc(collection, iteratee)
										: eachFunc(collection, bindCallback(iteratee, thisArg, 3));
								};
							}

							/**
     * Creates a function for `_.forIn` or `_.forInRight`.
     *
     * @private
     * @param {Function} objectFunc The function to iterate over an object.
     * @returns {Function} Returns the new each function.
     */
							function createForIn(objectFunc) {
								return function(object, iteratee, thisArg) {
									if (typeof iteratee != 'function' || thisArg !== undefined) {
										iteratee = bindCallback(iteratee, thisArg, 3);
									}
									return objectFunc(object, iteratee, keysIn);
								};
							}

							/**
     * Creates a function for `_.forOwn` or `_.forOwnRight`.
     *
     * @private
     * @param {Function} objectFunc The function to iterate over an object.
     * @returns {Function} Returns the new each function.
     */
							function createForOwn(objectFunc) {
								return function(object, iteratee, thisArg) {
									if (typeof iteratee != 'function' || thisArg !== undefined) {
										iteratee = bindCallback(iteratee, thisArg, 3);
									}
									return objectFunc(object, iteratee);
								};
							}

							/**
     * Creates a function for `_.mapKeys` or `_.mapValues`.
     *
     * @private
     * @param {boolean} [isMapKeys] Specify mapping keys instead of values.
     * @returns {Function} Returns the new map function.
     */
							function createObjectMapper(isMapKeys) {
								return function(object, iteratee, thisArg) {
									var result = {};
									iteratee = getCallback(iteratee, thisArg, 3);

									baseForOwn(object, function(value, key, object) {
										var mapped = iteratee(value, key, object);
										key = isMapKeys ? mapped : key;
										value = isMapKeys ? value : mapped;
										result[key] = value;
									});
									return result;
								};
							}

							/**
     * Creates a function for `_.padLeft` or `_.padRight`.
     *
     * @private
     * @param {boolean} [fromRight] Specify padding from the right.
     * @returns {Function} Returns the new pad function.
     */
							function createPadDir(fromRight) {
								return function(string, length, chars) {
									string = baseToString(string);
									return (
										(fromRight ? string : '') +
										createPadding(string, length, chars) +
										(fromRight ? '' : string)
									);
								};
							}

							/**
     * Creates a `_.partial` or `_.partialRight` function.
     *
     * @private
     * @param {boolean} flag The partial bit flag.
     * @returns {Function} Returns the new partial function.
     */
							function createPartial(flag) {
								var partialFunc = restParam(function(func, partials) {
									var holders = replaceHolders(
										partials,
										partialFunc.placeholder
									);
									return createWrapper(
										func,
										flag,
										undefined,
										partials,
										holders
									);
								});
								return partialFunc;
							}

							/**
     * Creates a function for `_.reduce` or `_.reduceRight`.
     *
     * @private
     * @param {Function} arrayFunc The function to iterate over an array.
     * @param {Function} eachFunc The function to iterate over a collection.
     * @returns {Function} Returns the new each function.
     */
							function createReduce(arrayFunc, eachFunc) {
								return function(collection, iteratee, accumulator, thisArg) {
									var initFromArray = arguments.length < 3;
									return typeof iteratee == 'function' &&
									thisArg === undefined &&
									isArray(collection)
										? arrayFunc(
												collection,
												iteratee,
												accumulator,
												initFromArray
											)
										: baseReduce(
												collection,
												getCallback(iteratee, thisArg, 4),
												accumulator,
												initFromArray,
												eachFunc
											);
								};
							}

							/**
     * Creates a function that wraps `func` and invokes it with optional `this`
     * binding of, partial application, and currying.
     *
     * @private
     * @param {Function|string} func The function or method name to reference.
     * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to prepend to those provided to the new function.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [partialsRight] The arguments to append to those provided to the new function.
     * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
							function createHybridWrapper(
								func,
								bitmask,
								thisArg,
								partials,
								holders,
								partialsRight,
								holdersRight,
								argPos,
								ary,
								arity
							) {
								var isAry = bitmask & ARY_FLAG,
									isBind = bitmask & BIND_FLAG,
									isBindKey = bitmask & BIND_KEY_FLAG,
									isCurry = bitmask & CURRY_FLAG,
									isCurryBound = bitmask & CURRY_BOUND_FLAG,
									isCurryRight = bitmask & CURRY_RIGHT_FLAG,
									Ctor = isBindKey ? undefined : createCtorWrapper(func);

								function wrapper() {
									// Avoid `arguments` object use disqualifying optimizations by
									// converting it to an array before providing it to other functions.
									var length = arguments.length,
										index = length,
										args = Array(length);

									while (index--) {
										args[index] = arguments[index];
									}
									if (partials) {
										args = composeArgs(args, partials, holders);
									}
									if (partialsRight) {
										args = composeArgsRight(args, partialsRight, holdersRight);
									}
									if (isCurry || isCurryRight) {
										var placeholder = wrapper.placeholder,
											argsHolders = replaceHolders(args, placeholder);

										length -= argsHolders.length;
										if (length < arity) {
											var newArgPos = argPos ? arrayCopy(argPos) : undefined,
												newArity = nativeMax(arity - length, 0),
												newsHolders = isCurry ? argsHolders : undefined,
												newHoldersRight = isCurry ? undefined : argsHolders,
												newPartials = isCurry ? args : undefined,
												newPartialsRight = isCurry ? undefined : args;

											bitmask |= isCurry ? PARTIAL_FLAG : PARTIAL_RIGHT_FLAG;
											bitmask &= ~(isCurry ? PARTIAL_RIGHT_FLAG : PARTIAL_FLAG);

											if (!isCurryBound) {
												bitmask &= ~(BIND_FLAG | BIND_KEY_FLAG);
											}
											var newData = [
													func,
													bitmask,
													thisArg,
													newPartials,
													newsHolders,
													newPartialsRight,
													newHoldersRight,
													newArgPos,
													ary,
													newArity
												],
												result = createHybridWrapper.apply(undefined, newData);

											if (isLaziable(func)) {
												setData(result, newData);
											}
											result.placeholder = placeholder;
											return result;
										}
									}
									var thisBinding = isBind ? thisArg : this,
										fn = isBindKey ? thisBinding[func] : func;

									if (argPos) {
										args = reorder(args, argPos);
									}
									if (isAry && ary < args.length) {
										args.length = ary;
									}
									if (this && this !== root && this instanceof wrapper) {
										fn = Ctor || createCtorWrapper(func);
									}
									return fn.apply(thisBinding, args);
								}
								return wrapper;
							}

							/**
     * Creates the padding required for `string` based on the given `length`.
     * The `chars` string is truncated if the number of characters exceeds `length`.
     *
     * @private
     * @param {string} string The string to create padding for.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the pad for `string`.
     */
							function createPadding(string, length, chars) {
								var strLength = string.length;
								length = +length;

								if (strLength >= length || !nativeIsFinite(length)) {
									return '';
								}
								var padLength = length - strLength;
								chars = chars == null ? ' ' : chars + '';
								return repeat(
									chars,
									nativeCeil(padLength / chars.length)
								).slice(0, padLength);
							}

							/**
     * Creates a function that wraps `func` and invokes it with the optional `this`
     * binding of `thisArg` and the `partials` prepended to those provided to
     * the wrapper.
     *
     * @private
     * @param {Function} func The function to partially apply arguments to.
     * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {Array} partials The arguments to prepend to those provided to the new function.
     * @returns {Function} Returns the new bound function.
     */
							function createPartialWrapper(func, bitmask, thisArg, partials) {
								var isBind = bitmask & BIND_FLAG,
									Ctor = createCtorWrapper(func);

								function wrapper() {
									// Avoid `arguments` object use disqualifying optimizations by
									// converting it to an array before providing it `func`.
									var argsIndex = -1,
										argsLength = arguments.length,
										leftIndex = -1,
										leftLength = partials.length,
										args = Array(leftLength + argsLength);

									while (++leftIndex < leftLength) {
										args[leftIndex] = partials[leftIndex];
									}
									while (argsLength--) {
										args[leftIndex++] = arguments[++argsIndex];
									}
									var fn =
										this && this !== root && this instanceof wrapper
											? Ctor
											: func;
									return fn.apply(isBind ? thisArg : this, args);
								}
								return wrapper;
							}

							/**
     * Creates a `_.ceil`, `_.floor`, or `_.round` function.
     *
     * @private
     * @param {string} methodName The name of the `Math` method to use when rounding.
     * @returns {Function} Returns the new round function.
     */
							function createRound(methodName) {
								var func = Math[methodName];
								return function(number, precision) {
									precision = precision === undefined ? 0 : +precision || 0;
									if (precision) {
										precision = pow(10, precision);
										return func(number * precision) / precision;
									}
									return func(number);
								};
							}

							/**
     * Creates a `_.sortedIndex` or `_.sortedLastIndex` function.
     *
     * @private
     * @param {boolean} [retHighest] Specify returning the highest qualified index.
     * @returns {Function} Returns the new index function.
     */
							function createSortedIndex(retHighest) {
								return function(array, value, iteratee, thisArg) {
									var callback = getCallback(iteratee);
									return iteratee == null && callback === baseCallback
										? binaryIndex(array, value, retHighest)
										: binaryIndexBy(
												array,
												value,
												callback(iteratee, thisArg, 1),
												retHighest
											);
								};
							}

							/**
     * Creates a function that either curries or invokes `func` with optional
     * `this` binding and partially applied arguments.
     *
     * @private
     * @param {Function|string} func The function or method name to reference.
     * @param {number} bitmask The bitmask of flags.
     *  The bitmask may be composed of the following flags:
     *     1 - `_.bind`
     *     2 - `_.bindKey`
     *     4 - `_.curry` or `_.curryRight` of a bound function
     *     8 - `_.curry`
     *    16 - `_.curryRight`
     *    32 - `_.partial`
     *    64 - `_.partialRight`
     *   128 - `_.rearg`
     *   256 - `_.ary`
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to be partially applied.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
							function createWrapper(
								func,
								bitmask,
								thisArg,
								partials,
								holders,
								argPos,
								ary,
								arity
							) {
								var isBindKey = bitmask & BIND_KEY_FLAG;
								if (!isBindKey && typeof func != 'function') {
									throw new TypeError(FUNC_ERROR_TEXT);
								}
								var length = partials ? partials.length : 0;
								if (!length) {
									bitmask &= ~(PARTIAL_FLAG | PARTIAL_RIGHT_FLAG);
									partials = holders = undefined;
								}
								length -= holders ? holders.length : 0;
								if (bitmask & PARTIAL_RIGHT_FLAG) {
									var partialsRight = partials,
										holdersRight = holders;

									partials = holders = undefined;
								}
								var data = isBindKey ? undefined : getData(func),
									newData = [
										func,
										bitmask,
										thisArg,
										partials,
										holders,
										partialsRight,
										holdersRight,
										argPos,
										ary,
										arity
									];

								if (data) {
									mergeData(newData, data);
									bitmask = newData[1];
									arity = newData[9];
								}
								newData[9] =
									arity == null
										? isBindKey ? 0 : func.length
										: nativeMax(arity - length, 0) || 0;

								if (bitmask == BIND_FLAG) {
									var result = createBindWrapper(newData[0], newData[2]);
								} else if (
									(bitmask == PARTIAL_FLAG ||
										bitmask == (BIND_FLAG | PARTIAL_FLAG)) &&
									!newData[4].length
								) {
									result = createPartialWrapper.apply(undefined, newData);
								} else {
									result = createHybridWrapper.apply(undefined, newData);
								}
								var setter = data ? baseSetData : setData;
								return setter(result, newData);
							}

							/**
     * A specialized version of `baseIsEqualDeep` for arrays with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Array} array The array to compare.
     * @param {Array} other The other array to compare.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Function} [customizer] The function to customize comparing arrays.
     * @param {boolean} [isLoose] Specify performing partial comparisons.
     * @param {Array} [stackA] Tracks traversed `value` objects.
     * @param {Array} [stackB] Tracks traversed `other` objects.
     * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
     */
							function equalArrays(
								array,
								other,
								equalFunc,
								customizer,
								isLoose,
								stackA,
								stackB
							) {
								var index = -1,
									arrLength = array.length,
									othLength = other.length;

								if (
									arrLength != othLength &&
									!(isLoose && othLength > arrLength)
								) {
									return false;
								}
								// Ignore non-index properties.
								while (++index < arrLength) {
									var arrValue = array[index],
										othValue = other[index],
										result = customizer
											? customizer(
													isLoose ? othValue : arrValue,
													isLoose ? arrValue : othValue,
													index
												)
											: undefined;

									if (result !== undefined) {
										if (result) {
											continue;
										}
										return false;
									}
									// Recursively compare arrays (susceptible to call stack limits).
									if (isLoose) {
										if (
											!arraySome(other, function(othValue) {
												return (
													arrValue === othValue ||
													equalFunc(
														arrValue,
														othValue,
														customizer,
														isLoose,
														stackA,
														stackB
													)
												);
											})
										) {
											return false;
										}
									} else if (
										!(
											arrValue === othValue ||
											equalFunc(
												arrValue,
												othValue,
												customizer,
												isLoose,
												stackA,
												stackB
											)
										)
									) {
										return false;
									}
								}
								return true;
							}

							/**
     * A specialized version of `baseIsEqualDeep` for comparing objects of
     * the same `toStringTag`.
     *
     * **Note:** This function only supports comparing values with tags of
     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {string} tag The `toStringTag` of the objects to compare.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
							function equalByTag(object, other, tag) {
								switch (tag) {
									case boolTag:
									case dateTag:
										// Coerce dates and booleans to numbers, dates to milliseconds and booleans
										// to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
										return +object == +other;

									case errorTag:
										return (
											object.name == other.name &&
											object.message == other.message
										);

									case numberTag:
										// Treat `NaN` vs. `NaN` as equal.
										return object != +object
											? other != +other
											: object == +other;

									case regexpTag:
									case stringTag:
										// Coerce regexes to strings and treat strings primitives and string
										// objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
										return object == other + '';
								}
								return false;
							}

							/**
     * A specialized version of `baseIsEqualDeep` for objects with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Function} [customizer] The function to customize comparing values.
     * @param {boolean} [isLoose] Specify performing partial comparisons.
     * @param {Array} [stackA] Tracks traversed `value` objects.
     * @param {Array} [stackB] Tracks traversed `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
							function equalObjects(
								object,
								other,
								equalFunc,
								customizer,
								isLoose,
								stackA,
								stackB
							) {
								var objProps = keys(object),
									objLength = objProps.length,
									othProps = keys(other),
									othLength = othProps.length;

								if (objLength != othLength && !isLoose) {
									return false;
								}
								var index = objLength;
								while (index--) {
									var key = objProps[index];
									if (
										!(isLoose ? key in other : hasOwnProperty.call(other, key))
									) {
										return false;
									}
								}
								var skipCtor = isLoose;
								while (++index < objLength) {
									key = objProps[index];
									var objValue = object[key],
										othValue = other[key],
										result = customizer
											? customizer(
													isLoose ? othValue : objValue,
													isLoose ? objValue : othValue,
													key
												)
											: undefined;

									// Recursively compare objects (susceptible to call stack limits).
									if (
										!(result === undefined
											? equalFunc(
													objValue,
													othValue,
													customizer,
													isLoose,
													stackA,
													stackB
												)
											: result)
									) {
										return false;
									}
									skipCtor || (skipCtor = key == 'constructor');
								}
								if (!skipCtor) {
									var objCtor = object.constructor,
										othCtor = other.constructor;

									// Non `Object` object instances with different constructors are not equal.
									if (
										objCtor != othCtor &&
										('constructor' in object && 'constructor' in other) &&
										!(
											typeof objCtor == 'function' &&
											objCtor instanceof objCtor &&
											typeof othCtor == 'function' &&
											othCtor instanceof othCtor
										)
									) {
										return false;
									}
								}
								return true;
							}

							/**
     * Gets the appropriate "callback" function. If the `_.callback` method is
     * customized this function returns the custom method, otherwise it returns
     * the `baseCallback` function. If arguments are provided the chosen function
     * is invoked with them and its result is returned.
     *
     * @private
     * @returns {Function} Returns the chosen function or its result.
     */
							function getCallback(func, thisArg, argCount) {
								var result = lodash.callback || callback;
								result = result === callback ? baseCallback : result;
								return argCount ? result(func, thisArg, argCount) : result;
							}

							/**
     * Gets metadata for `func`.
     *
     * @private
     * @param {Function} func The function to query.
     * @returns {*} Returns the metadata for `func`.
     */
							var getData = !metaMap
								? noop
								: function(func) {
										return metaMap.get(func);
									};

							/**
     * Gets the name of `func`.
     *
     * @private
     * @param {Function} func The function to query.
     * @returns {string} Returns the function name.
     */
							function getFuncName(func) {
								var result = func.name,
									array = realNames[result],
									length = array ? array.length : 0;

								while (length--) {
									var data = array[length],
										otherFunc = data.func;
									if (otherFunc == null || otherFunc == func) {
										return data.name;
									}
								}
								return result;
							}

							/**
     * Gets the appropriate "indexOf" function. If the `_.indexOf` method is
     * customized this function returns the custom method, otherwise it returns
     * the `baseIndexOf` function. If arguments are provided the chosen function
     * is invoked with them and its result is returned.
     *
     * @private
     * @returns {Function|number} Returns the chosen function or its result.
     */
							function getIndexOf(collection, target, fromIndex) {
								var result = lodash.indexOf || indexOf;
								result = result === indexOf ? baseIndexOf : result;
								return collection
									? result(collection, target, fromIndex)
									: result;
							}

							/**
     * Gets the "length" property value of `object`.
     *
     * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
     * that affects Safari on at least iOS 8.1-8.3 ARM64.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {*} Returns the "length" value.
     */
							var getLength = baseProperty('length');

							/**
     * Gets the propery names, values, and compare flags of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the match data of `object`.
     */
							function getMatchData(object) {
								var result = pairs(object),
									length = result.length;

								while (length--) {
									result[length][2] = isStrictComparable(result[length][1]);
								}
								return result;
							}

							/**
     * Gets the native function at `key` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the method to get.
     * @returns {*} Returns the function if it's native, else `undefined`.
     */
							function getNative(object, key) {
								var value = object == null ? undefined : object[key];
								return isNative(value) ? value : undefined;
							}

							/**
     * Gets the view, applying any `transforms` to the `start` and `end` positions.
     *
     * @private
     * @param {number} start The start of the view.
     * @param {number} end The end of the view.
     * @param {Array} transforms The transformations to apply to the view.
     * @returns {Object} Returns an object containing the `start` and `end`
     *  positions of the view.
     */
							function getView(start, end, transforms) {
								var index = -1,
									length = transforms.length;

								while (++index < length) {
									var data = transforms[index],
										size = data.size;

									switch (data.type) {
										case 'drop':
											start += size;
											break;
										case 'dropRight':
											end -= size;
											break;
										case 'take':
											end = nativeMin(end, start + size);
											break;
										case 'takeRight':
											start = nativeMax(start, end - size);
											break;
									}
								}
								return { start: start, end: end };
							}

							/**
     * Initializes an array clone.
     *
     * @private
     * @param {Array} array The array to clone.
     * @returns {Array} Returns the initialized clone.
     */
							function initCloneArray(array) {
								var length = array.length,
									result = new array.constructor(length);

								// Add array properties assigned by `RegExp#exec`.
								if (
									length &&
									typeof array[0] == 'string' &&
									hasOwnProperty.call(array, 'index')
								) {
									result.index = array.index;
									result.input = array.input;
								}
								return result;
							}

							/**
     * Initializes an object clone.
     *
     * @private
     * @param {Object} object The object to clone.
     * @returns {Object} Returns the initialized clone.
     */
							function initCloneObject(object) {
								var Ctor = object.constructor;
								if (!(typeof Ctor == 'function' && Ctor instanceof Ctor)) {
									Ctor = Object;
								}
								return new Ctor();
							}

							/**
     * Initializes an object clone based on its `toStringTag`.
     *
     * **Note:** This function only supports cloning values with tags of
     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
     *
     * @private
     * @param {Object} object The object to clone.
     * @param {string} tag The `toStringTag` of the object to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the initialized clone.
     */
							function initCloneByTag(object, tag, isDeep) {
								var Ctor = object.constructor;
								switch (tag) {
									case arrayBufferTag:
										return bufferClone(object);

									case boolTag:
									case dateTag:
										return new Ctor(+object);

									case float32Tag:
									case float64Tag:
									case int8Tag:
									case int16Tag:
									case int32Tag:
									case uint8Tag:
									case uint8ClampedTag:
									case uint16Tag:
									case uint32Tag:
										var buffer = object.buffer;
										return new Ctor(
											isDeep ? bufferClone(buffer) : buffer,
											object.byteOffset,
											object.length
										);

									case numberTag:
									case stringTag:
										return new Ctor(object);

									case regexpTag:
										var result = new Ctor(object.source, reFlags.exec(object));
										result.lastIndex = object.lastIndex;
								}
								return result;
							}

							/**
     * Invokes the method at `path` on `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the method to invoke.
     * @param {Array} args The arguments to invoke the method with.
     * @returns {*} Returns the result of the invoked method.
     */
							function invokePath(object, path, args) {
								if (object != null && !isKey(path, object)) {
									path = toPath(path);
									object =
										path.length == 1
											? object
											: baseGet(object, baseSlice(path, 0, -1));
									path = last(path);
								}
								var func = object == null ? object : object[path];
								return func == null ? undefined : func.apply(object, args);
							}

							/**
     * Checks if `value` is array-like.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
     */
							function isArrayLike(value) {
								return value != null && isLength(getLength(value));
							}

							/**
     * Checks if `value` is a valid array-like index.
     *
     * @private
     * @param {*} value The value to check.
     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
     */
							function isIndex(value, length) {
								value =
									typeof value == 'number' || reIsUint.test(value)
										? +value
										: -1;
								length = length == null ? MAX_SAFE_INTEGER : length;
								return value > -1 && value % 1 == 0 && value < length;
							}

							/**
     * Checks if the provided arguments are from an iteratee call.
     *
     * @private
     * @param {*} value The potential iteratee value argument.
     * @param {*} index The potential iteratee index or key argument.
     * @param {*} object The potential iteratee object argument.
     * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
     */
							function isIterateeCall(value, index, object) {
								if (!isObject(object)) {
									return false;
								}
								var type = typeof index;
								if (
									type == 'number'
										? isArrayLike(object) && isIndex(index, object.length)
										: type == 'string' && index in object
								) {
									var other = object[index];
									return value === value ? value === other : other !== other;
								}
								return false;
							}

							/**
     * Checks if `value` is a property name and not a property path.
     *
     * @private
     * @param {*} value The value to check.
     * @param {Object} [object] The object to query keys on.
     * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
     */
							function isKey(value, object) {
								var type = typeof value;
								if (
									(type == 'string' && reIsPlainProp.test(value)) ||
									type == 'number'
								) {
									return true;
								}
								if (isArray(value)) {
									return false;
								}
								var result = !reIsDeepProp.test(value);
								return result || (object != null && value in toObject(object));
							}

							/**
     * Checks if `func` has a lazy counterpart.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` has a lazy counterpart, else `false`.
     */
							function isLaziable(func) {
								var funcName = getFuncName(func);
								if (!(funcName in LazyWrapper.prototype)) {
									return false;
								}
								var other = lodash[funcName];
								if (func === other) {
									return true;
								}
								var data = getData(other);
								return !!data && func === data[0];
							}

							/**
     * Checks if `value` is a valid array-like length.
     *
     * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
     */
							function isLength(value) {
								return (
									typeof value == 'number' &&
									value > -1 &&
									value % 1 == 0 &&
									value <= MAX_SAFE_INTEGER
								);
							}

							/**
     * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` if suitable for strict
     *  equality comparisons, else `false`.
     */
							function isStrictComparable(value) {
								return value === value && !isObject(value);
							}

							/**
     * Merges the function metadata of `source` into `data`.
     *
     * Merging metadata reduces the number of wrappers required to invoke a function.
     * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
     * may be applied regardless of execution order. Methods like `_.ary` and `_.rearg`
     * augment function arguments, making the order in which they are executed important,
     * preventing the merging of metadata. However, we make an exception for a safe
     * common case where curried functions have `_.ary` and or `_.rearg` applied.
     *
     * @private
     * @param {Array} data The destination metadata.
     * @param {Array} source The source metadata.
     * @returns {Array} Returns `data`.
     */
							function mergeData(data, source) {
								var bitmask = data[1],
									srcBitmask = source[1],
									newBitmask = bitmask | srcBitmask,
									isCommon = newBitmask < ARY_FLAG;

								var isCombo =
									(srcBitmask == ARY_FLAG && bitmask == CURRY_FLAG) ||
									(srcBitmask == ARY_FLAG &&
										bitmask == REARG_FLAG &&
										data[7].length <= source[8]) ||
									(srcBitmask == (ARY_FLAG | REARG_FLAG) &&
										bitmask == CURRY_FLAG);

								// Exit early if metadata can't be merged.
								if (!(isCommon || isCombo)) {
									return data;
								}
								// Use source `thisArg` if available.
								if (srcBitmask & BIND_FLAG) {
									data[2] = source[2];
									// Set when currying a bound function.
									newBitmask |= bitmask & BIND_FLAG ? 0 : CURRY_BOUND_FLAG;
								}
								// Compose partial arguments.
								var value = source[3];
								if (value) {
									var partials = data[3];
									data[3] = partials
										? composeArgs(partials, value, source[4])
										: arrayCopy(value);
									data[4] = partials
										? replaceHolders(data[3], PLACEHOLDER)
										: arrayCopy(source[4]);
								}
								// Compose partial right arguments.
								value = source[5];
								if (value) {
									partials = data[5];
									data[5] = partials
										? composeArgsRight(partials, value, source[6])
										: arrayCopy(value);
									data[6] = partials
										? replaceHolders(data[5], PLACEHOLDER)
										: arrayCopy(source[6]);
								}
								// Use source `argPos` if available.
								value = source[7];
								if (value) {
									data[7] = arrayCopy(value);
								}
								// Use source `ary` if it's smaller.
								if (srcBitmask & ARY_FLAG) {
									data[8] =
										data[8] == null ? source[8] : nativeMin(data[8], source[8]);
								}
								// Use source `arity` if one is not provided.
								if (data[9] == null) {
									data[9] = source[9];
								}
								// Use source `func` and merge bitmasks.
								data[0] = source[0];
								data[1] = newBitmask;

								return data;
							}

							/**
     * Used by `_.defaultsDeep` to customize its `_.merge` use.
     *
     * @private
     * @param {*} objectValue The destination object property value.
     * @param {*} sourceValue The source object property value.
     * @returns {*} Returns the value to assign to the destination object.
     */
							function mergeDefaults(objectValue, sourceValue) {
								return objectValue === undefined
									? sourceValue
									: merge(objectValue, sourceValue, mergeDefaults);
							}

							/**
     * A specialized version of `_.pick` which picks `object` properties specified
     * by `props`.
     *
     * @private
     * @param {Object} object The source object.
     * @param {string[]} props The property names to pick.
     * @returns {Object} Returns the new object.
     */
							function pickByArray(object, props) {
								object = toObject(object);

								var index = -1,
									length = props.length,
									result = {};

								while (++index < length) {
									var key = props[index];
									if (key in object) {
										result[key] = object[key];
									}
								}
								return result;
							}

							/**
     * A specialized version of `_.pick` which picks `object` properties `predicate`
     * returns truthy for.
     *
     * @private
     * @param {Object} object The source object.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {Object} Returns the new object.
     */
							function pickByCallback(object, predicate) {
								var result = {};
								baseForIn(object, function(value, key, object) {
									if (predicate(value, key, object)) {
										result[key] = value;
									}
								});
								return result;
							}

							/**
     * Reorder `array` according to the specified indexes where the element at
     * the first index is assigned as the first element, the element at
     * the second index is assigned as the second element, and so on.
     *
     * @private
     * @param {Array} array The array to reorder.
     * @param {Array} indexes The arranged array indexes.
     * @returns {Array} Returns `array`.
     */
							function reorder(array, indexes) {
								var arrLength = array.length,
									length = nativeMin(indexes.length, arrLength),
									oldArray = arrayCopy(array);

								while (length--) {
									var index = indexes[length];
									array[length] = isIndex(index, arrLength)
										? oldArray[index]
										: undefined;
								}
								return array;
							}

							/**
     * Sets metadata for `func`.
     *
     * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
     * period of time, it will trip its breaker and transition to an identity function
     * to avoid garbage collection pauses in V8. See [V8 issue 2070](https://code.google.com/p/v8/issues/detail?id=2070)
     * for more details.
     *
     * @private
     * @param {Function} func The function to associate metadata with.
     * @param {*} data The metadata.
     * @returns {Function} Returns `func`.
     */
							var setData = (function() {
								var count = 0,
									lastCalled = 0;

								return function(key, value) {
									var stamp = now(),
										remaining = HOT_SPAN - (stamp - lastCalled);

									lastCalled = stamp;
									if (remaining > 0) {
										if (++count >= HOT_COUNT) {
											return key;
										}
									} else {
										count = 0;
									}
									return baseSetData(key, value);
								};
							})();

							/**
     * A fallback implementation of `Object.keys` which creates an array of the
     * own enumerable property names of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
							function shimKeys(object) {
								var props = keysIn(object),
									propsLength = props.length,
									length = propsLength && object.length;

								var allowIndexes =
									!!length &&
									isLength(length) &&
									(isArray(object) || isArguments(object));

								var index = -1,
									result = [];

								while (++index < propsLength) {
									var key = props[index];
									if (
										(allowIndexes && isIndex(key, length)) ||
										hasOwnProperty.call(object, key)
									) {
										result.push(key);
									}
								}
								return result;
							}

							/**
     * Converts `value` to an array-like object if it's not one.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {Array|Object} Returns the array-like object.
     */
							function toIterable(value) {
								if (value == null) {
									return [];
								}
								if (!isArrayLike(value)) {
									return values(value);
								}
								return isObject(value) ? value : Object(value);
							}

							/**
     * Converts `value` to an object if it's not one.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {Object} Returns the object.
     */
							function toObject(value) {
								return isObject(value) ? value : Object(value);
							}

							/**
     * Converts `value` to property path array if it's not one.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {Array} Returns the property path array.
     */
							function toPath(value) {
								if (isArray(value)) {
									return value;
								}
								var result = [];
								baseToString(value).replace(rePropName, function(
									match,
									number,
									quote,
									string
								) {
									result.push(
										quote ? string.replace(reEscapeChar, '$1') : number || match
									);
								});
								return result;
							}

							/**
     * Creates a clone of `wrapper`.
     *
     * @private
     * @param {Object} wrapper The wrapper to clone.
     * @returns {Object} Returns the cloned wrapper.
     */
							function wrapperClone(wrapper) {
								return wrapper instanceof LazyWrapper
									? wrapper.clone()
									: new LodashWrapper(
											wrapper.__wrapped__,
											wrapper.__chain__,
											arrayCopy(wrapper.__actions__)
										);
							}

							/*------------------------------------------------------------------------*/

							/**
     * Creates an array of elements split into groups the length of `size`.
     * If `collection` can't be split evenly, the final chunk will be the remaining
     * elements.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to process.
     * @param {number} [size=1] The length of each chunk.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Array} Returns the new array containing chunks.
     * @example
     *
     * _.chunk(['a', 'b', 'c', 'd'], 2);
     * // => [['a', 'b'], ['c', 'd']]
     *
     * _.chunk(['a', 'b', 'c', 'd'], 3);
     * // => [['a', 'b', 'c'], ['d']]
     */
							function chunk(array, size, guard) {
								if (guard ? isIterateeCall(array, size, guard) : size == null) {
									size = 1;
								} else {
									size = nativeMax(nativeFloor(size) || 1, 1);
								}
								var index = 0,
									length = array ? array.length : 0,
									resIndex = -1,
									result = Array(nativeCeil(length / size));

								while (index < length) {
									result[++resIndex] = baseSlice(array, index, (index += size));
								}
								return result;
							}

							/**
     * Creates an array with all falsey values removed. The values `false`, `null`,
     * `0`, `""`, `undefined`, and `NaN` are falsey.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to compact.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.compact([0, 1, false, 2, '', 3]);
     * // => [1, 2, 3]
     */
							function compact(array) {
								var index = -1,
									length = array ? array.length : 0,
									resIndex = -1,
									result = [];

								while (++index < length) {
									var value = array[index];
									if (value) {
										result[++resIndex] = value;
									}
								}
								return result;
							}

							/**
     * Creates an array of unique `array` values not included in the other
     * provided arrays using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...Array} [values] The arrays of values to exclude.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.difference([1, 2, 3], [4, 2]);
     * // => [1, 3]
     */
							var difference = restParam(function(array, values) {
								return isObjectLike(array) && isArrayLike(array)
									? baseDifference(array, baseFlatten(values, false, true))
									: [];
							});

							/**
     * Creates a slice of `array` with `n` elements dropped from the beginning.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to drop.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.drop([1, 2, 3]);
     * // => [2, 3]
     *
     * _.drop([1, 2, 3], 2);
     * // => [3]
     *
     * _.drop([1, 2, 3], 5);
     * // => []
     *
     * _.drop([1, 2, 3], 0);
     * // => [1, 2, 3]
     */
							function drop(array, n, guard) {
								var length = array ? array.length : 0;
								if (!length) {
									return [];
								}
								if (guard ? isIterateeCall(array, n, guard) : n == null) {
									n = 1;
								}
								return baseSlice(array, n < 0 ? 0 : n);
							}

							/**
     * Creates a slice of `array` with `n` elements dropped from the end.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to drop.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.dropRight([1, 2, 3]);
     * // => [1, 2]
     *
     * _.dropRight([1, 2, 3], 2);
     * // => [1]
     *
     * _.dropRight([1, 2, 3], 5);
     * // => []
     *
     * _.dropRight([1, 2, 3], 0);
     * // => [1, 2, 3]
     */
							function dropRight(array, n, guard) {
								var length = array ? array.length : 0;
								if (!length) {
									return [];
								}
								if (guard ? isIterateeCall(array, n, guard) : n == null) {
									n = 1;
								}
								n = length - (+n || 0);
								return baseSlice(array, 0, n < 0 ? 0 : n);
							}

							/**
     * Creates a slice of `array` excluding elements dropped from the end.
     * Elements are dropped until `predicate` returns falsey. The predicate is
     * bound to `thisArg` and invoked with three arguments: (value, index, array).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that match the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.dropRightWhile([1, 2, 3], function(n) {
     *   return n > 1;
     * });
     * // => [1]
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.pluck(_.dropRightWhile(users, { 'user': 'pebbles', 'active': false }), 'user');
     * // => ['barney', 'fred']
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.pluck(_.dropRightWhile(users, 'active', false), 'user');
     * // => ['barney']
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.dropRightWhile(users, 'active'), 'user');
     * // => ['barney', 'fred', 'pebbles']
     */
							function dropRightWhile(array, predicate, thisArg) {
								return array && array.length
									? baseWhile(
											array,
											getCallback(predicate, thisArg, 3),
											true,
											true
										)
									: [];
							}

							/**
     * Creates a slice of `array` excluding elements dropped from the beginning.
     * Elements are dropped until `predicate` returns falsey. The predicate is
     * bound to `thisArg` and invoked with three arguments: (value, index, array).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.dropWhile([1, 2, 3], function(n) {
     *   return n < 3;
     * });
     * // => [3]
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.pluck(_.dropWhile(users, { 'user': 'barney', 'active': false }), 'user');
     * // => ['fred', 'pebbles']
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.pluck(_.dropWhile(users, 'active', false), 'user');
     * // => ['pebbles']
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.dropWhile(users, 'active'), 'user');
     * // => ['barney', 'fred', 'pebbles']
     */
							function dropWhile(array, predicate, thisArg) {
								return array && array.length
									? baseWhile(array, getCallback(predicate, thisArg, 3), true)
									: [];
							}

							/**
     * Fills elements of `array` with `value` from `start` up to, but not
     * including, `end`.
     *
     * **Note:** This method mutates `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to fill.
     * @param {*} value The value to fill `array` with.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [1, 2, 3];
     *
     * _.fill(array, 'a');
     * console.log(array);
     * // => ['a', 'a', 'a']
     *
     * _.fill(Array(3), 2);
     * // => [2, 2, 2]
     *
     * _.fill([4, 6, 8], '*', 1, 2);
     * // => [4, '*', 8]
     */
							function fill(array, value, start, end) {
								var length = array ? array.length : 0;
								if (!length) {
									return [];
								}
								if (
									start &&
									typeof start != 'number' &&
									isIterateeCall(array, value, start)
								) {
									start = 0;
									end = length;
								}
								return baseFill(array, value, start, end);
							}

							/**
     * This method is like `_.find` except that it returns the index of the first
     * element `predicate` returns truthy for instead of the element itself.
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to search.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {number} Returns the index of the found element, else `-1`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * _.findIndex(users, function(chr) {
     *   return chr.user == 'barney';
     * });
     * // => 0
     *
     * // using the `_.matches` callback shorthand
     * _.findIndex(users, { 'user': 'fred', 'active': false });
     * // => 1
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.findIndex(users, 'active', false);
     * // => 0
     *
     * // using the `_.property` callback shorthand
     * _.findIndex(users, 'active');
     * // => 2
     */
							var findIndex = createFindIndex();

							/**
     * This method is like `_.findIndex` except that it iterates over elements
     * of `collection` from right to left.
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to search.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {number} Returns the index of the found element, else `-1`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * _.findLastIndex(users, function(chr) {
     *   return chr.user == 'pebbles';
     * });
     * // => 2
     *
     * // using the `_.matches` callback shorthand
     * _.findLastIndex(users, { 'user': 'barney', 'active': true });
     * // => 0
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.findLastIndex(users, 'active', false);
     * // => 2
     *
     * // using the `_.property` callback shorthand
     * _.findLastIndex(users, 'active');
     * // => 0
     */
							var findLastIndex = createFindIndex(true);

							/**
     * Gets the first element of `array`.
     *
     * @static
     * @memberOf _
     * @alias head
     * @category Array
     * @param {Array} array The array to query.
     * @returns {*} Returns the first element of `array`.
     * @example
     *
     * _.first([1, 2, 3]);
     * // => 1
     *
     * _.first([]);
     * // => undefined
     */
							function first(array) {
								return array ? array[0] : undefined;
							}

							/**
     * Flattens a nested array. If `isDeep` is `true` the array is recursively
     * flattened, otherwise it is only flattened a single level.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to flatten.
     * @param {boolean} [isDeep] Specify a deep flatten.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * _.flatten([1, [2, 3, [4]]]);
     * // => [1, 2, 3, [4]]
     *
     * // using `isDeep`
     * _.flatten([1, [2, 3, [4]]], true);
     * // => [1, 2, 3, 4]
     */
							function flatten(array, isDeep, guard) {
								var length = array ? array.length : 0;
								if (guard && isIterateeCall(array, isDeep, guard)) {
									isDeep = false;
								}
								return length ? baseFlatten(array, isDeep) : [];
							}

							/**
     * Recursively flattens a nested array.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to recursively flatten.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * _.flattenDeep([1, [2, 3, [4]]]);
     * // => [1, 2, 3, 4]
     */
							function flattenDeep(array) {
								var length = array ? array.length : 0;
								return length ? baseFlatten(array, true) : [];
							}

							/**
     * Gets the index at which the first occurrence of `value` is found in `array`
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * for equality comparisons. If `fromIndex` is negative, it is used as the offset
     * from the end of `array`. If `array` is sorted providing `true` for `fromIndex`
     * performs a faster binary search.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to search.
     * @param {*} value The value to search for.
     * @param {boolean|number} [fromIndex=0] The index to search from or `true`
     *  to perform a binary search on a sorted array.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.indexOf([1, 2, 1, 2], 2);
     * // => 1
     *
     * // using `fromIndex`
     * _.indexOf([1, 2, 1, 2], 2, 2);
     * // => 3
     *
     * // performing a binary search
     * _.indexOf([1, 1, 2, 2], 2, true);
     * // => 2
     */
							function indexOf(array, value, fromIndex) {
								var length = array ? array.length : 0;
								if (!length) {
									return -1;
								}
								if (typeof fromIndex == 'number') {
									fromIndex =
										fromIndex < 0
											? nativeMax(length + fromIndex, 0)
											: fromIndex;
								} else if (fromIndex) {
									var index = binaryIndex(array, value);
									if (
										index < length &&
										(value === value
											? value === array[index]
											: array[index] !== array[index])
									) {
										return index;
									}
									return -1;
								}
								return baseIndexOf(array, value, fromIndex || 0);
							}

							/**
     * Gets all but the last element of `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.initial([1, 2, 3]);
     * // => [1, 2]
     */
							function initial(array) {
								return dropRight(array, 1);
							}

							/**
     * Creates an array of unique values that are included in all of the provided
     * arrays using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of shared values.
     * @example
     * _.intersection([1, 2], [4, 2], [2, 1]);
     * // => [2]
     */
							var intersection = restParam(function(arrays) {
								var othLength = arrays.length,
									othIndex = othLength,
									caches = Array(length),
									indexOf = getIndexOf(),
									isCommon = indexOf == baseIndexOf,
									result = [];

								while (othIndex--) {
									var value = (arrays[othIndex] = isArrayLike(
										(value = arrays[othIndex])
									)
										? value
										: []);
									caches[othIndex] =
										isCommon && value.length >= 120
											? createCache(othIndex && value)
											: null;
								}
								var array = arrays[0],
									index = -1,
									length = array ? array.length : 0,
									seen = caches[0];

								outer: while (++index < length) {
									value = array[index];
									if (
										(seen
											? cacheIndexOf(seen, value)
											: indexOf(result, value, 0)) < 0
									) {
										var othIndex = othLength;
										while (--othIndex) {
											var cache = caches[othIndex];
											if (
												(cache
													? cacheIndexOf(cache, value)
													: indexOf(arrays[othIndex], value, 0)) < 0
											) {
												continue outer;
											}
										}
										if (seen) {
											seen.push(value);
										}
										result.push(value);
									}
								}
								return result;
							});

							/**
     * Gets the last element of `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @returns {*} Returns the last element of `array`.
     * @example
     *
     * _.last([1, 2, 3]);
     * // => 3
     */
							function last(array) {
								var length = array ? array.length : 0;
								return length ? array[length - 1] : undefined;
							}

							/**
     * This method is like `_.indexOf` except that it iterates over elements of
     * `array` from right to left.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to search.
     * @param {*} value The value to search for.
     * @param {boolean|number} [fromIndex=array.length-1] The index to search from
     *  or `true` to perform a binary search on a sorted array.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.lastIndexOf([1, 2, 1, 2], 2);
     * // => 3
     *
     * // using `fromIndex`
     * _.lastIndexOf([1, 2, 1, 2], 2, 2);
     * // => 1
     *
     * // performing a binary search
     * _.lastIndexOf([1, 1, 2, 2], 2, true);
     * // => 3
     */
							function lastIndexOf(array, value, fromIndex) {
								var length = array ? array.length : 0;
								if (!length) {
									return -1;
								}
								var index = length;
								if (typeof fromIndex == 'number') {
									index =
										(fromIndex < 0
											? nativeMax(length + fromIndex, 0)
											: nativeMin(fromIndex || 0, length - 1)) + 1;
								} else if (fromIndex) {
									index = binaryIndex(array, value, true) - 1;
									var other = array[index];
									if (value === value ? value === other : other !== other) {
										return index;
									}
									return -1;
								}
								if (value !== value) {
									return indexOfNaN(array, index, true);
								}
								while (index--) {
									if (array[index] === value) {
										return index;
									}
								}
								return -1;
							}

							/**
     * Removes all provided values from `array` using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * **Note:** Unlike `_.without`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to modify.
     * @param {...*} [values] The values to remove.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [1, 2, 3, 1, 2, 3];
     *
     * _.pull(array, 2, 3);
     * console.log(array);
     * // => [1, 1]
     */
							function pull() {
								var args = arguments,
									array = args[0];

								if (!(array && array.length)) {
									return array;
								}
								var index = 0,
									indexOf = getIndexOf(),
									length = args.length;

								while (++index < length) {
									var fromIndex = 0,
										value = args[index];

									while ((fromIndex = indexOf(array, value, fromIndex)) > -1) {
										splice.call(array, fromIndex, 1);
									}
								}
								return array;
							}

							/**
     * Removes elements from `array` corresponding to the given indexes and returns
     * an array of the removed elements. Indexes may be specified as an array of
     * indexes or as individual arguments.
     *
     * **Note:** Unlike `_.at`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to modify.
     * @param {...(number|number[])} [indexes] The indexes of elements to remove,
     *  specified as individual indexes or arrays of indexes.
     * @returns {Array} Returns the new array of removed elements.
     * @example
     *
     * var array = [5, 10, 15, 20];
     * var evens = _.pullAt(array, 1, 3);
     *
     * console.log(array);
     * // => [5, 15]
     *
     * console.log(evens);
     * // => [10, 20]
     */
							var pullAt = restParam(function(array, indexes) {
								indexes = baseFlatten(indexes);

								var result = baseAt(array, indexes);
								basePullAt(array, indexes.sort(baseCompareAscending));
								return result;
							});

							/**
     * Removes all elements from `array` that `predicate` returns truthy for
     * and returns an array of the removed elements. The predicate is bound to
     * `thisArg` and invoked with three arguments: (value, index, array).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * **Note:** Unlike `_.filter`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the new array of removed elements.
     * @example
     *
     * var array = [1, 2, 3, 4];
     * var evens = _.remove(array, function(n) {
     *   return n % 2 == 0;
     * });
     *
     * console.log(array);
     * // => [1, 3]
     *
     * console.log(evens);
     * // => [2, 4]
     */
							function remove(array, predicate, thisArg) {
								var result = [];
								if (!(array && array.length)) {
									return result;
								}
								var index = -1,
									indexes = [],
									length = array.length;

								predicate = getCallback(predicate, thisArg, 3);
								while (++index < length) {
									var value = array[index];
									if (predicate(value, index, array)) {
										result.push(value);
										indexes.push(index);
									}
								}
								basePullAt(array, indexes);
								return result;
							}

							/**
     * Gets all but the first element of `array`.
     *
     * @static
     * @memberOf _
     * @alias tail
     * @category Array
     * @param {Array} array The array to query.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.rest([1, 2, 3]);
     * // => [2, 3]
     */
							function rest(array) {
								return drop(array, 1);
							}

							/**
     * Creates a slice of `array` from `start` up to, but not including, `end`.
     *
     * **Note:** This method is used instead of `Array#slice` to support node
     * lists in IE < 9 and to ensure dense arrays are returned.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */
							function slice(array, start, end) {
								var length = array ? array.length : 0;
								if (!length) {
									return [];
								}
								if (
									end &&
									typeof end != 'number' &&
									isIterateeCall(array, start, end)
								) {
									start = 0;
									end = length;
								}
								return baseSlice(array, start, end);
							}

							/**
     * Uses a binary search to determine the lowest index at which `value` should
     * be inserted into `array` in order to maintain its sort order. If an iteratee
     * function is provided it is invoked for `value` and each element of `array`
     * to compute their sort ranking. The iteratee is bound to `thisArg` and
     * invoked with one argument; (value).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * _.sortedIndex([30, 50], 40);
     * // => 1
     *
     * _.sortedIndex([4, 4, 5, 5], 5);
     * // => 2
     *
     * var dict = { 'data': { 'thirty': 30, 'forty': 40, 'fifty': 50 } };
     *
     * // using an iteratee function
     * _.sortedIndex(['thirty', 'fifty'], 'forty', function(word) {
     *   return this.data[word];
     * }, dict);
     * // => 1
     *
     * // using the `_.property` callback shorthand
     * _.sortedIndex([{ 'x': 30 }, { 'x': 50 }], { 'x': 40 }, 'x');
     * // => 1
     */
							var sortedIndex = createSortedIndex();

							/**
     * This method is like `_.sortedIndex` except that it returns the highest
     * index at which `value` should be inserted into `array` in order to
     * maintain its sort order.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * _.sortedLastIndex([4, 4, 5, 5], 5);
     * // => 4
     */
							var sortedLastIndex = createSortedIndex(true);

							/**
     * Creates a slice of `array` with `n` elements taken from the beginning.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to take.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.take([1, 2, 3]);
     * // => [1]
     *
     * _.take([1, 2, 3], 2);
     * // => [1, 2]
     *
     * _.take([1, 2, 3], 5);
     * // => [1, 2, 3]
     *
     * _.take([1, 2, 3], 0);
     * // => []
     */
							function take(array, n, guard) {
								var length = array ? array.length : 0;
								if (!length) {
									return [];
								}
								if (guard ? isIterateeCall(array, n, guard) : n == null) {
									n = 1;
								}
								return baseSlice(array, 0, n < 0 ? 0 : n);
							}

							/**
     * Creates a slice of `array` with `n` elements taken from the end.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to take.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.takeRight([1, 2, 3]);
     * // => [3]
     *
     * _.takeRight([1, 2, 3], 2);
     * // => [2, 3]
     *
     * _.takeRight([1, 2, 3], 5);
     * // => [1, 2, 3]
     *
     * _.takeRight([1, 2, 3], 0);
     * // => []
     */
							function takeRight(array, n, guard) {
								var length = array ? array.length : 0;
								if (!length) {
									return [];
								}
								if (guard ? isIterateeCall(array, n, guard) : n == null) {
									n = 1;
								}
								n = length - (+n || 0);
								return baseSlice(array, n < 0 ? 0 : n);
							}

							/**
     * Creates a slice of `array` with elements taken from the end. Elements are
     * taken until `predicate` returns falsey. The predicate is bound to `thisArg`
     * and invoked with three arguments: (value, index, array).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.takeRightWhile([1, 2, 3], function(n) {
     *   return n > 1;
     * });
     * // => [2, 3]
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.pluck(_.takeRightWhile(users, { 'user': 'pebbles', 'active': false }), 'user');
     * // => ['pebbles']
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.pluck(_.takeRightWhile(users, 'active', false), 'user');
     * // => ['fred', 'pebbles']
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.takeRightWhile(users, 'active'), 'user');
     * // => []
     */
							function takeRightWhile(array, predicate, thisArg) {
								return array && array.length
									? baseWhile(
											array,
											getCallback(predicate, thisArg, 3),
											false,
											true
										)
									: [];
							}

							/**
     * Creates a slice of `array` with elements taken from the beginning. Elements
     * are taken until `predicate` returns falsey. The predicate is bound to
     * `thisArg` and invoked with three arguments: (value, index, array).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.takeWhile([1, 2, 3], function(n) {
     *   return n < 3;
     * });
     * // => [1, 2]
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false},
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.pluck(_.takeWhile(users, { 'user': 'barney', 'active': false }), 'user');
     * // => ['barney']
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.pluck(_.takeWhile(users, 'active', false), 'user');
     * // => ['barney', 'fred']
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.takeWhile(users, 'active'), 'user');
     * // => []
     */
							function takeWhile(array, predicate, thisArg) {
								return array && array.length
									? baseWhile(array, getCallback(predicate, thisArg, 3))
									: [];
							}

							/**
     * Creates an array of unique values, in order, from all of the provided arrays
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of combined values.
     * @example
     *
     * _.union([1, 2], [4, 2], [2, 1]);
     * // => [1, 2, 4]
     */
							var union = restParam(function(arrays) {
								return baseUniq(baseFlatten(arrays, false, true));
							});

							/**
     * Creates a duplicate-free version of an array, using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * for equality comparisons, in which only the first occurence of each element
     * is kept. Providing `true` for `isSorted` performs a faster search algorithm
     * for sorted arrays. If an iteratee function is provided it is invoked for
     * each element in the array to generate the criterion by which uniqueness
     * is computed. The `iteratee` is bound to `thisArg` and invoked with three
     * arguments: (value, index, array).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @alias unique
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {boolean} [isSorted] Specify the array is sorted.
     * @param {Function|Object|string} [iteratee] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array} Returns the new duplicate-value-free array.
     * @example
     *
     * _.uniq([2, 1, 2]);
     * // => [2, 1]
     *
     * // using `isSorted`
     * _.uniq([1, 1, 2], true);
     * // => [1, 2]
     *
     * // using an iteratee function
     * _.uniq([1, 2.5, 1.5, 2], function(n) {
     *   return this.floor(n);
     * }, Math);
     * // => [1, 2.5]
     *
     * // using the `_.property` callback shorthand
     * _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }, { 'x': 2 }]
     */
							function uniq(array, isSorted, iteratee, thisArg) {
								var length = array ? array.length : 0;
								if (!length) {
									return [];
								}
								if (isSorted != null && typeof isSorted != 'boolean') {
									thisArg = iteratee;
									iteratee = isIterateeCall(array, isSorted, thisArg)
										? undefined
										: isSorted;
									isSorted = false;
								}
								var callback = getCallback();
								if (!(iteratee == null && callback === baseCallback)) {
									iteratee = callback(iteratee, thisArg, 3);
								}
								return isSorted && getIndexOf() == baseIndexOf
									? sortedUniq(array, iteratee)
									: baseUniq(array, iteratee);
							}

							/**
     * This method is like `_.zip` except that it accepts an array of grouped
     * elements and creates an array regrouping the elements to their pre-zip
     * configuration.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array of grouped elements to process.
     * @returns {Array} Returns the new array of regrouped elements.
     * @example
     *
     * var zipped = _.zip(['fred', 'barney'], [30, 40], [true, false]);
     * // => [['fred', 30, true], ['barney', 40, false]]
     *
     * _.unzip(zipped);
     * // => [['fred', 'barney'], [30, 40], [true, false]]
     */
							function unzip(array) {
								if (!(array && array.length)) {
									return [];
								}
								var index = -1,
									length = 0;

								array = arrayFilter(array, function(group) {
									if (isArrayLike(group)) {
										length = nativeMax(group.length, length);
										return true;
									}
								});
								var result = Array(length);
								while (++index < length) {
									result[index] = arrayMap(array, baseProperty(index));
								}
								return result;
							}

							/**
     * This method is like `_.unzip` except that it accepts an iteratee to specify
     * how regrouped values should be combined. The `iteratee` is bound to `thisArg`
     * and invoked with four arguments: (accumulator, value, index, group).
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array of grouped elements to process.
     * @param {Function} [iteratee] The function to combine regrouped values.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array} Returns the new array of regrouped elements.
     * @example
     *
     * var zipped = _.zip([1, 2], [10, 20], [100, 200]);
     * // => [[1, 10, 100], [2, 20, 200]]
     *
     * _.unzipWith(zipped, _.add);
     * // => [3, 30, 300]
     */
							function unzipWith(array, iteratee, thisArg) {
								var length = array ? array.length : 0;
								if (!length) {
									return [];
								}
								var result = unzip(array);
								if (iteratee == null) {
									return result;
								}
								iteratee = bindCallback(iteratee, thisArg, 4);
								return arrayMap(result, function(group) {
									return arrayReduce(group, iteratee, undefined, true);
								});
							}

							/**
     * Creates an array excluding all provided values using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to filter.
     * @param {...*} [values] The values to exclude.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.without([1, 2, 1, 3], 1, 2);
     * // => [3]
     */
							var without = restParam(function(array, values) {
								return isArrayLike(array) ? baseDifference(array, values) : [];
							});

							/**
     * Creates an array of unique values that is the [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
     * of the provided arrays.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of values.
     * @example
     *
     * _.xor([1, 2], [4, 2]);
     * // => [1, 4]
     */
							function xor() {
								var index = -1,
									length = arguments.length;

								while (++index < length) {
									var array = arguments[index];
									if (isArrayLike(array)) {
										var result = result
											? arrayPush(
													baseDifference(result, array),
													baseDifference(array, result)
												)
											: array;
									}
								}
								return result ? baseUniq(result) : [];
							}

							/**
     * Creates an array of grouped elements, the first of which contains the first
     * elements of the given arrays, the second of which contains the second elements
     * of the given arrays, and so on.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {...Array} [arrays] The arrays to process.
     * @returns {Array} Returns the new array of grouped elements.
     * @example
     *
     * _.zip(['fred', 'barney'], [30, 40], [true, false]);
     * // => [['fred', 30, true], ['barney', 40, false]]
     */
							var zip = restParam(unzip);

							/**
     * The inverse of `_.pairs`; this method returns an object composed from arrays
     * of property names and values. Provide either a single two dimensional array,
     * e.g. `[[key1, value1], [key2, value2]]` or two arrays, one of property names
     * and one of corresponding values.
     *
     * @static
     * @memberOf _
     * @alias object
     * @category Array
     * @param {Array} props The property names.
     * @param {Array} [values=[]] The property values.
     * @returns {Object} Returns the new object.
     * @example
     *
     * _.zipObject([['fred', 30], ['barney', 40]]);
     * // => { 'fred': 30, 'barney': 40 }
     *
     * _.zipObject(['fred', 'barney'], [30, 40]);
     * // => { 'fred': 30, 'barney': 40 }
     */
							function zipObject(props, values) {
								var index = -1,
									length = props ? props.length : 0,
									result = {};

								if (length && !values && !isArray(props[0])) {
									values = [];
								}
								while (++index < length) {
									var key = props[index];
									if (values) {
										result[key] = values[index];
									} else if (key) {
										result[key[0]] = key[1];
									}
								}
								return result;
							}

							/**
     * This method is like `_.zip` except that it accepts an iteratee to specify
     * how grouped values should be combined. The `iteratee` is bound to `thisArg`
     * and invoked with four arguments: (accumulator, value, index, group).
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {...Array} [arrays] The arrays to process.
     * @param {Function} [iteratee] The function to combine grouped values.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array} Returns the new array of grouped elements.
     * @example
     *
     * _.zipWith([1, 2], [10, 20], [100, 200], _.add);
     * // => [111, 222]
     */
							var zipWith = restParam(function(arrays) {
								var length = arrays.length,
									iteratee = length > 2 ? arrays[length - 2] : undefined,
									thisArg = length > 1 ? arrays[length - 1] : undefined;

								if (length > 2 && typeof iteratee == 'function') {
									length -= 2;
								} else {
									iteratee =
										length > 1 && typeof thisArg == 'function'
											? (--length, thisArg)
											: undefined;
									thisArg = undefined;
								}
								arrays.length = length;
								return unzipWith(arrays, iteratee, thisArg);
							});

							/*------------------------------------------------------------------------*/

							/**
     * Creates a `lodash` object that wraps `value` with explicit method
     * chaining enabled.
     *
     * @static
     * @memberOf _
     * @category Chain
     * @param {*} value The value to wrap.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36 },
     *   { 'user': 'fred',    'age': 40 },
     *   { 'user': 'pebbles', 'age': 1 }
     * ];
     *
     * var youngest = _.chain(users)
     *   .sortBy('age')
     *   .map(function(chr) {
     *     return chr.user + ' is ' + chr.age;
     *   })
     *   .first()
     *   .value();
     * // => 'pebbles is 1'
     */
							function chain(value) {
								var result = lodash(value);
								result.__chain__ = true;
								return result;
							}

							/**
     * This method invokes `interceptor` and returns `value`. The interceptor is
     * bound to `thisArg` and invoked with one argument; (value). The purpose of
     * this method is to "tap into" a method chain in order to perform operations
     * on intermediate results within the chain.
     *
     * @static
     * @memberOf _
     * @category Chain
     * @param {*} value The value to provide to `interceptor`.
     * @param {Function} interceptor The function to invoke.
     * @param {*} [thisArg] The `this` binding of `interceptor`.
     * @returns {*} Returns `value`.
     * @example
     *
     * _([1, 2, 3])
     *  .tap(function(array) {
     *    array.pop();
     *  })
     *  .reverse()
     *  .value();
     * // => [2, 1]
     */
							function tap(value, interceptor, thisArg) {
								interceptor.call(thisArg, value);
								return value;
							}

							/**
     * This method is like `_.tap` except that it returns the result of `interceptor`.
     *
     * @static
     * @memberOf _
     * @category Chain
     * @param {*} value The value to provide to `interceptor`.
     * @param {Function} interceptor The function to invoke.
     * @param {*} [thisArg] The `this` binding of `interceptor`.
     * @returns {*} Returns the result of `interceptor`.
     * @example
     *
     * _('  abc  ')
     *  .chain()
     *  .trim()
     *  .thru(function(value) {
     *    return [value];
     *  })
     *  .value();
     * // => ['abc']
     */
							function thru(value, interceptor, thisArg) {
								return interceptor.call(thisArg, value);
							}

							/**
     * Enables explicit method chaining on the wrapper object.
     *
     * @name chain
     * @memberOf _
     * @category Chain
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 }
     * ];
     *
     * // without explicit chaining
     * _(users).first();
     * // => { 'user': 'barney', 'age': 36 }
     *
     * // with explicit chaining
     * _(users).chain()
     *   .first()
     *   .pick('user')
     *   .value();
     * // => { 'user': 'barney' }
     */
							function wrapperChain() {
								return chain(this);
							}

							/**
     * Executes the chained sequence and returns the wrapped result.
     *
     * @name commit
     * @memberOf _
     * @category Chain
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var array = [1, 2];
     * var wrapped = _(array).push(3);
     *
     * console.log(array);
     * // => [1, 2]
     *
     * wrapped = wrapped.commit();
     * console.log(array);
     * // => [1, 2, 3]
     *
     * wrapped.last();
     * // => 3
     *
     * console.log(array);
     * // => [1, 2, 3]
     */
							function wrapperCommit() {
								return new LodashWrapper(this.value(), this.__chain__);
							}

							/**
     * Creates a new array joining a wrapped array with any additional arrays
     * and/or values.
     *
     * @name concat
     * @memberOf _
     * @category Chain
     * @param {...*} [values] The values to concatenate.
     * @returns {Array} Returns the new concatenated array.
     * @example
     *
     * var array = [1];
     * var wrapped = _(array).concat(2, [3], [[4]]);
     *
     * console.log(wrapped.value());
     * // => [1, 2, 3, [4]]
     *
     * console.log(array);
     * // => [1]
     */
							var wrapperConcat = restParam(function(values) {
								values = baseFlatten(values);
								return this.thru(function(array) {
									return arrayConcat(
										isArray(array) ? array : [toObject(array)],
										values
									);
								});
							});

							/**
     * Creates a clone of the chained sequence planting `value` as the wrapped value.
     *
     * @name plant
     * @memberOf _
     * @category Chain
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var array = [1, 2];
     * var wrapped = _(array).map(function(value) {
     *   return Math.pow(value, 2);
     * });
     *
     * var other = [3, 4];
     * var otherWrapped = wrapped.plant(other);
     *
     * otherWrapped.value();
     * // => [9, 16]
     *
     * wrapped.value();
     * // => [1, 4]
     */
							function wrapperPlant(value) {
								var result,
									parent = this;

								while (parent instanceof baseLodash) {
									var clone = wrapperClone(parent);
									if (result) {
										previous.__wrapped__ = clone;
									} else {
										result = clone;
									}
									var previous = clone;
									parent = parent.__wrapped__;
								}
								previous.__wrapped__ = value;
								return result;
							}

							/**
     * Reverses the wrapped array so the first element becomes the last, the
     * second element becomes the second to last, and so on.
     *
     * **Note:** This method mutates the wrapped array.
     *
     * @name reverse
     * @memberOf _
     * @category Chain
     * @returns {Object} Returns the new reversed `lodash` wrapper instance.
     * @example
     *
     * var array = [1, 2, 3];
     *
     * _(array).reverse().value()
     * // => [3, 2, 1]
     *
     * console.log(array);
     * // => [3, 2, 1]
     */
							function wrapperReverse() {
								var value = this.__wrapped__;

								var interceptor = function(value) {
									return wrapped && wrapped.__dir__ < 0
										? value
										: value.reverse();
								};
								if (value instanceof LazyWrapper) {
									var wrapped = value;
									if (this.__actions__.length) {
										wrapped = new LazyWrapper(this);
									}
									wrapped = wrapped.reverse();
									wrapped.__actions__.push({
										func: thru,
										args: [interceptor],
										thisArg: undefined
									});
									return new LodashWrapper(wrapped, this.__chain__);
								}
								return this.thru(interceptor);
							}

							/**
     * Produces the result of coercing the unwrapped value to a string.
     *
     * @name toString
     * @memberOf _
     * @category Chain
     * @returns {string} Returns the coerced string value.
     * @example
     *
     * _([1, 2, 3]).toString();
     * // => '1,2,3'
     */
							function wrapperToString() {
								return this.value() + '';
							}

							/**
     * Executes the chained sequence to extract the unwrapped value.
     *
     * @name value
     * @memberOf _
     * @alias run, toJSON, valueOf
     * @category Chain
     * @returns {*} Returns the resolved unwrapped value.
     * @example
     *
     * _([1, 2, 3]).value();
     * // => [1, 2, 3]
     */
							function wrapperValue() {
								return baseWrapperValue(this.__wrapped__, this.__actions__);
							}

							/*------------------------------------------------------------------------*/

							/**
     * Creates an array of elements corresponding to the given keys, or indexes,
     * of `collection`. Keys may be specified as individual arguments or as arrays
     * of keys.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {...(number|number[]|string|string[])} [props] The property names
     *  or indexes of elements to pick, specified individually or in arrays.
     * @returns {Array} Returns the new array of picked elements.
     * @example
     *
     * _.at(['a', 'b', 'c'], [0, 2]);
     * // => ['a', 'c']
     *
     * _.at(['barney', 'fred', 'pebbles'], 0, 2);
     * // => ['barney', 'pebbles']
     */
							var at = restParam(function(collection, props) {
								return baseAt(collection, baseFlatten(props));
							});

							/**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` through `iteratee`. The corresponding value
     * of each key is the number of times the key was returned by `iteratee`.
     * The `iteratee` is bound to `thisArg` and invoked with three arguments:
     * (value, index|key, collection).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * _.countBy([4.3, 6.1, 6.4], function(n) {
     *   return Math.floor(n);
     * });
     * // => { '4': 1, '6': 2 }
     *
     * _.countBy([4.3, 6.1, 6.4], function(n) {
     *   return this.floor(n);
     * }, Math);
     * // => { '4': 1, '6': 2 }
     *
     * _.countBy(['one', 'two', 'three'], 'length');
     * // => { '3': 2, '5': 1 }
     */
							var countBy = createAggregator(function(result, value, key) {
								hasOwnProperty.call(result, key)
									? ++result[key]
									: (result[key] = 1);
							});

							/**
     * Checks if `predicate` returns truthy for **all** elements of `collection`.
     * The predicate is bound to `thisArg` and invoked with three arguments:
     * (value, index|key, collection).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @alias all
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {boolean} Returns `true` if all elements pass the predicate check,
     *  else `false`.
     * @example
     *
     * _.every([true, 1, null, 'yes'], Boolean);
     * // => false
     *
     * var users = [
     *   { 'user': 'barney', 'active': false },
     *   { 'user': 'fred',   'active': false }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.every(users, { 'user': 'barney', 'active': false });
     * // => false
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.every(users, 'active', false);
     * // => true
     *
     * // using the `_.property` callback shorthand
     * _.every(users, 'active');
     * // => false
     */
							function every(collection, predicate, thisArg) {
								var func = isArray(collection) ? arrayEvery : baseEvery;
								if (thisArg && isIterateeCall(collection, predicate, thisArg)) {
									predicate = undefined;
								}
								if (typeof predicate != 'function' || thisArg !== undefined) {
									predicate = getCallback(predicate, thisArg, 3);
								}
								return func(collection, predicate);
							}

							/**
     * Iterates over elements of `collection`, returning an array of all elements
     * `predicate` returns truthy for. The predicate is bound to `thisArg` and
     * invoked with three arguments: (value, index|key, collection).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @alias select
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the new filtered array.
     * @example
     *
     * _.filter([4, 5, 6], function(n) {
     *   return n % 2 == 0;
     * });
     * // => [4, 6]
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': true },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.pluck(_.filter(users, { 'age': 36, 'active': true }), 'user');
     * // => ['barney']
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.pluck(_.filter(users, 'active', false), 'user');
     * // => ['fred']
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.filter(users, 'active'), 'user');
     * // => ['barney']
     */
							function filter(collection, predicate, thisArg) {
								var func = isArray(collection) ? arrayFilter : baseFilter;
								predicate = getCallback(predicate, thisArg, 3);
								return func(collection, predicate);
							}

							/**
     * Iterates over elements of `collection`, returning the first element
     * `predicate` returns truthy for. The predicate is bound to `thisArg` and
     * invoked with three arguments: (value, index|key, collection).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @alias detect
     * @category Collection
     * @param {Array|Object|string} collection The collection to search.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {*} Returns the matched element, else `undefined`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36, 'active': true },
     *   { 'user': 'fred',    'age': 40, 'active': false },
     *   { 'user': 'pebbles', 'age': 1,  'active': true }
     * ];
     *
     * _.result(_.find(users, function(chr) {
     *   return chr.age < 40;
     * }), 'user');
     * // => 'barney'
     *
     * // using the `_.matches` callback shorthand
     * _.result(_.find(users, { 'age': 1, 'active': true }), 'user');
     * // => 'pebbles'
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.result(_.find(users, 'active', false), 'user');
     * // => 'fred'
     *
     * // using the `_.property` callback shorthand
     * _.result(_.find(users, 'active'), 'user');
     * // => 'barney'
     */
							var find = createFind(baseEach);

							/**
     * This method is like `_.find` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to search.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {*} Returns the matched element, else `undefined`.
     * @example
     *
     * _.findLast([1, 2, 3, 4], function(n) {
     *   return n % 2 == 1;
     * });
     * // => 3
     */
							var findLast = createFind(baseEachRight, true);

							/**
     * Performs a deep comparison between each element in `collection` and the
     * source object, returning the first element that has equivalent property
     * values.
     *
     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
     * numbers, `Object` objects, regexes, and strings. Objects are compared by
     * their own, not inherited, enumerable properties. For comparing a single
     * own or inherited property value see `_.matchesProperty`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to search.
     * @param {Object} source The object of property values to match.
     * @returns {*} Returns the matched element, else `undefined`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': true },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * _.result(_.findWhere(users, { 'age': 36, 'active': true }), 'user');
     * // => 'barney'
     *
     * _.result(_.findWhere(users, { 'age': 40, 'active': false }), 'user');
     * // => 'fred'
     */
							function findWhere(collection, source) {
								return find(collection, baseMatches(source));
							}

							/**
     * Iterates over elements of `collection` invoking `iteratee` for each element.
     * The `iteratee` is bound to `thisArg` and invoked with three arguments:
     * (value, index|key, collection). Iteratee functions may exit iteration early
     * by explicitly returning `false`.
     *
     * **Note:** As with other "Collections" methods, objects with a "length" property
     * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
     * may be used for object iteration.
     *
     * @static
     * @memberOf _
     * @alias each
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array|Object|string} Returns `collection`.
     * @example
     *
     * _([1, 2]).forEach(function(n) {
     *   console.log(n);
     * }).value();
     * // => logs each value from left to right and returns the array
     *
     * _.forEach({ 'a': 1, 'b': 2 }, function(n, key) {
     *   console.log(n, key);
     * });
     * // => logs each value-key pair and returns the object (iteration order is not guaranteed)
     */
							var forEach = createForEach(arrayEach, baseEach);

							/**
     * This method is like `_.forEach` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @alias eachRight
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array|Object|string} Returns `collection`.
     * @example
     *
     * _([1, 2]).forEachRight(function(n) {
     *   console.log(n);
     * }).value();
     * // => logs each value from right to left and returns the array
     */
							var forEachRight = createForEach(arrayEachRight, baseEachRight);

							/**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` through `iteratee`. The corresponding value
     * of each key is an array of the elements responsible for generating the key.
     * The `iteratee` is bound to `thisArg` and invoked with three arguments:
     * (value, index|key, collection).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * _.groupBy([4.2, 6.1, 6.4], function(n) {
     *   return Math.floor(n);
     * });
     * // => { '4': [4.2], '6': [6.1, 6.4] }
     *
     * _.groupBy([4.2, 6.1, 6.4], function(n) {
     *   return this.floor(n);
     * }, Math);
     * // => { '4': [4.2], '6': [6.1, 6.4] }
     *
     * // using the `_.property` callback shorthand
     * _.groupBy(['one', 'two', 'three'], 'length');
     * // => { '3': ['one', 'two'], '5': ['three'] }
     */
							var groupBy = createAggregator(function(result, value, key) {
								if (hasOwnProperty.call(result, key)) {
									result[key].push(value);
								} else {
									result[key] = [value];
								}
							});

							/**
     * Checks if `value` is in `collection` using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * for equality comparisons. If `fromIndex` is negative, it is used as the offset
     * from the end of `collection`.
     *
     * @static
     * @memberOf _
     * @alias contains, include
     * @category Collection
     * @param {Array|Object|string} collection The collection to search.
     * @param {*} target The value to search for.
     * @param {number} [fromIndex=0] The index to search from.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.reduce`.
     * @returns {boolean} Returns `true` if a matching element is found, else `false`.
     * @example
     *
     * _.includes([1, 2, 3], 1);
     * // => true
     *
     * _.includes([1, 2, 3], 1, 2);
     * // => false
     *
     * _.includes({ 'user': 'fred', 'age': 40 }, 'fred');
     * // => true
     *
     * _.includes('pebbles', 'eb');
     * // => true
     */
							function includes(collection, target, fromIndex, guard) {
								var length = collection ? getLength(collection) : 0;
								if (!isLength(length)) {
									collection = values(collection);
									length = collection.length;
								}
								if (
									typeof fromIndex != 'number' ||
									(guard && isIterateeCall(target, fromIndex, guard))
								) {
									fromIndex = 0;
								} else {
									fromIndex =
										fromIndex < 0
											? nativeMax(length + fromIndex, 0)
											: fromIndex || 0;
								}
								return typeof collection == 'string' ||
								(!isArray(collection) && isString(collection))
									? fromIndex <= length &&
										collection.indexOf(target, fromIndex) > -1
									: !!length && getIndexOf(collection, target, fromIndex) > -1;
							}

							/**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` through `iteratee`. The corresponding value
     * of each key is the last element responsible for generating the key. The
     * iteratee function is bound to `thisArg` and invoked with three arguments:
     * (value, index|key, collection).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * var keyData = [
     *   { 'dir': 'left', 'code': 97 },
     *   { 'dir': 'right', 'code': 100 }
     * ];
     *
     * _.indexBy(keyData, 'dir');
     * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
     *
     * _.indexBy(keyData, function(object) {
     *   return String.fromCharCode(object.code);
     * });
     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
     *
     * _.indexBy(keyData, function(object) {
     *   return this.fromCharCode(object.code);
     * }, String);
     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
     */
							var indexBy = createAggregator(function(result, value, key) {
								result[key] = value;
							});

							/**
     * Invokes the method at `path` of each element in `collection`, returning
     * an array of the results of each invoked method. Any additional arguments
     * are provided to each invoked method. If `methodName` is a function it is
     * invoked for, and `this` bound to, each element in `collection`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Array|Function|string} path The path of the method to invoke or
     *  the function invoked per iteration.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {Array} Returns the array of results.
     * @example
     *
     * _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
     * // => [[1, 5, 7], [1, 2, 3]]
     *
     * _.invoke([123, 456], String.prototype.split, '');
     * // => [['1', '2', '3'], ['4', '5', '6']]
     */
							var invoke = restParam(function(collection, path, args) {
								var index = -1,
									isFunc = typeof path == 'function',
									isProp = isKey(path),
									result = isArrayLike(collection)
										? Array(collection.length)
										: [];

								baseEach(collection, function(value) {
									var func = isFunc
										? path
										: isProp && value != null ? value[path] : undefined;
									result[++index] = func
										? func.apply(value, args)
										: invokePath(value, path, args);
								});
								return result;
							});

							/**
     * Creates an array of values by running each element in `collection` through
     * `iteratee`. The `iteratee` is bound to `thisArg` and invoked with three
     * arguments: (value, index|key, collection).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * Many lodash methods are guarded to work as iteratees for methods like
     * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
     *
     * The guarded methods are:
     * `ary`, `callback`, `chunk`, `clone`, `create`, `curry`, `curryRight`,
     * `drop`, `dropRight`, `every`, `fill`, `flatten`, `invert`, `max`, `min`,
     * `parseInt`, `slice`, `sortBy`, `take`, `takeRight`, `template`, `trim`,
     * `trimLeft`, `trimRight`, `trunc`, `random`, `range`, `sample`, `some`,
     * `sum`, `uniq`, and `words`
     *
     * @static
     * @memberOf _
     * @alias collect
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array} Returns the new mapped array.
     * @example
     *
     * function timesThree(n) {
     *   return n * 3;
     * }
     *
     * _.map([1, 2], timesThree);
     * // => [3, 6]
     *
     * _.map({ 'a': 1, 'b': 2 }, timesThree);
     * // => [3, 6] (iteration order is not guaranteed)
     *
     * var users = [
     *   { 'user': 'barney' },
     *   { 'user': 'fred' }
     * ];
     *
     * // using the `_.property` callback shorthand
     * _.map(users, 'user');
     * // => ['barney', 'fred']
     */
							function map(collection, iteratee, thisArg) {
								var func = isArray(collection) ? arrayMap : baseMap;
								iteratee = getCallback(iteratee, thisArg, 3);
								return func(collection, iteratee);
							}

							/**
     * Creates an array of elements split into two groups, the first of which
     * contains elements `predicate` returns truthy for, while the second of which
     * contains elements `predicate` returns falsey for. The predicate is bound
     * to `thisArg` and invoked with three arguments: (value, index|key, collection).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the array of grouped elements.
     * @example
     *
     * _.partition([1, 2, 3], function(n) {
     *   return n % 2;
     * });
     * // => [[1, 3], [2]]
     *
     * _.partition([1.2, 2.3, 3.4], function(n) {
     *   return this.floor(n) % 2;
     * }, Math);
     * // => [[1.2, 3.4], [2.3]]
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36, 'active': false },
     *   { 'user': 'fred',    'age': 40, 'active': true },
     *   { 'user': 'pebbles', 'age': 1,  'active': false }
     * ];
     *
     * var mapper = function(array) {
     *   return _.pluck(array, 'user');
     * };
     *
     * // using the `_.matches` callback shorthand
     * _.map(_.partition(users, { 'age': 1, 'active': false }), mapper);
     * // => [['pebbles'], ['barney', 'fred']]
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.map(_.partition(users, 'active', false), mapper);
     * // => [['barney', 'pebbles'], ['fred']]
     *
     * // using the `_.property` callback shorthand
     * _.map(_.partition(users, 'active'), mapper);
     * // => [['fred'], ['barney', 'pebbles']]
     */
							var partition = createAggregator(
								function(result, value, key) {
									result[key ? 0 : 1].push(value);
								},
								function() {
									return [[], []];
								}
							);

							/**
     * Gets the property value of `path` from all elements in `collection`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Array|string} path The path of the property to pluck.
     * @returns {Array} Returns the property values.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 }
     * ];
     *
     * _.pluck(users, 'user');
     * // => ['barney', 'fred']
     *
     * var userIndex = _.indexBy(users, 'user');
     * _.pluck(userIndex, 'age');
     * // => [36, 40] (iteration order is not guaranteed)
     */
							function pluck(collection, path) {
								return map(collection, property(path));
							}

							/**
     * Reduces `collection` to a value which is the accumulated result of running
     * each element in `collection` through `iteratee`, where each successive
     * invocation is supplied the return value of the previous. If `accumulator`
     * is not provided the first element of `collection` is used as the initial
     * value. The `iteratee` is bound to `thisArg` and invoked with four arguments:
     * (accumulator, value, index|key, collection).
     *
     * Many lodash methods are guarded to work as iteratees for methods like
     * `_.reduce`, `_.reduceRight`, and `_.transform`.
     *
     * The guarded methods are:
     * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `sortByAll`,
     * and `sortByOrder`
     *
     * @static
     * @memberOf _
     * @alias foldl, inject
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {*} Returns the accumulated value.
     * @example
     *
     * _.reduce([1, 2], function(total, n) {
     *   return total + n;
     * });
     * // => 3
     *
     * _.reduce({ 'a': 1, 'b': 2 }, function(result, n, key) {
     *   result[key] = n * 3;
     *   return result;
     * }, {});
     * // => { 'a': 3, 'b': 6 } (iteration order is not guaranteed)
     */
							var reduce = createReduce(arrayReduce, baseEach);

							/**
     * This method is like `_.reduce` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @alias foldr
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {*} Returns the accumulated value.
     * @example
     *
     * var array = [[0, 1], [2, 3], [4, 5]];
     *
     * _.reduceRight(array, function(flattened, other) {
     *   return flattened.concat(other);
     * }, []);
     * // => [4, 5, 2, 3, 0, 1]
     */
							var reduceRight = createReduce(arrayReduceRight, baseEachRight);

							/**
     * The opposite of `_.filter`; this method returns the elements of `collection`
     * that `predicate` does **not** return truthy for.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the new filtered array.
     * @example
     *
     * _.reject([1, 2, 3, 4], function(n) {
     *   return n % 2 == 0;
     * });
     * // => [1, 3]
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': false },
     *   { 'user': 'fred',   'age': 40, 'active': true }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.pluck(_.reject(users, { 'age': 40, 'active': true }), 'user');
     * // => ['barney']
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.pluck(_.reject(users, 'active', false), 'user');
     * // => ['fred']
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.reject(users, 'active'), 'user');
     * // => ['barney']
     */
							function reject(collection, predicate, thisArg) {
								var func = isArray(collection) ? arrayFilter : baseFilter;
								predicate = getCallback(predicate, thisArg, 3);
								return func(collection, function(value, index, collection) {
									return !predicate(value, index, collection);
								});
							}

							/**
     * Gets a random element or `n` random elements from a collection.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to sample.
     * @param {number} [n] The number of elements to sample.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {*} Returns the random sample(s).
     * @example
     *
     * _.sample([1, 2, 3, 4]);
     * // => 2
     *
     * _.sample([1, 2, 3, 4], 2);
     * // => [3, 1]
     */
							function sample(collection, n, guard) {
								if (guard ? isIterateeCall(collection, n, guard) : n == null) {
									collection = toIterable(collection);
									var length = collection.length;
									return length > 0
										? collection[baseRandom(0, length - 1)]
										: undefined;
								}
								var index = -1,
									result = toArray(collection),
									length = result.length,
									lastIndex = length - 1;

								n = nativeMin(n < 0 ? 0 : +n || 0, length);
								while (++index < n) {
									var rand = baseRandom(index, lastIndex),
										value = result[rand];

									result[rand] = result[index];
									result[index] = value;
								}
								result.length = n;
								return result;
							}

							/**
     * Creates an array of shuffled values, using a version of the
     * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to shuffle.
     * @returns {Array} Returns the new shuffled array.
     * @example
     *
     * _.shuffle([1, 2, 3, 4]);
     * // => [4, 1, 3, 2]
     */
							function shuffle(collection) {
								return sample(collection, POSITIVE_INFINITY);
							}

							/**
     * Gets the size of `collection` by returning its length for array-like
     * values or the number of own enumerable properties for objects.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to inspect.
     * @returns {number} Returns the size of `collection`.
     * @example
     *
     * _.size([1, 2, 3]);
     * // => 3
     *
     * _.size({ 'a': 1, 'b': 2 });
     * // => 2
     *
     * _.size('pebbles');
     * // => 7
     */
							function size(collection) {
								var length = collection ? getLength(collection) : 0;
								return isLength(length) ? length : keys(collection).length;
							}

							/**
     * Checks if `predicate` returns truthy for **any** element of `collection`.
     * The function returns as soon as it finds a passing value and does not iterate
     * over the entire collection. The predicate is bound to `thisArg` and invoked
     * with three arguments: (value, index|key, collection).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @alias any
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     * @example
     *
     * _.some([null, 0, 'yes', false], Boolean);
     * // => true
     *
     * var users = [
     *   { 'user': 'barney', 'active': true },
     *   { 'user': 'fred',   'active': false }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.some(users, { 'user': 'barney', 'active': false });
     * // => false
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.some(users, 'active', false);
     * // => true
     *
     * // using the `_.property` callback shorthand
     * _.some(users, 'active');
     * // => true
     */
							function some(collection, predicate, thisArg) {
								var func = isArray(collection) ? arraySome : baseSome;
								if (thisArg && isIterateeCall(collection, predicate, thisArg)) {
									predicate = undefined;
								}
								if (typeof predicate != 'function' || thisArg !== undefined) {
									predicate = getCallback(predicate, thisArg, 3);
								}
								return func(collection, predicate);
							}

							/**
     * Creates an array of elements, sorted in ascending order by the results of
     * running each element in a collection through `iteratee`. This method performs
     * a stable sort, that is, it preserves the original sort order of equal elements.
     * The `iteratee` is bound to `thisArg` and invoked with three arguments:
     * (value, index|key, collection).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array} Returns the new sorted array.
     * @example
     *
     * _.sortBy([1, 2, 3], function(n) {
     *   return Math.sin(n);
     * });
     * // => [3, 1, 2]
     *
     * _.sortBy([1, 2, 3], function(n) {
     *   return this.sin(n);
     * }, Math);
     * // => [3, 1, 2]
     *
     * var users = [
     *   { 'user': 'fred' },
     *   { 'user': 'pebbles' },
     *   { 'user': 'barney' }
     * ];
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.sortBy(users, 'user'), 'user');
     * // => ['barney', 'fred', 'pebbles']
     */
							function sortBy(collection, iteratee, thisArg) {
								if (collection == null) {
									return [];
								}
								if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
									iteratee = undefined;
								}
								var index = -1;
								iteratee = getCallback(iteratee, thisArg, 3);

								var result = baseMap(collection, function(
									value,
									key,
									collection
								) {
									return {
										criteria: iteratee(value, key, collection),
										index: ++index,
										value: value
									};
								});
								return baseSortBy(result, compareAscending);
							}

							/**
     * This method is like `_.sortBy` except that it can sort by multiple iteratees
     * or property names.
     *
     * If a property name is provided for an iteratee the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If an object is provided for an iteratee the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {...(Function|Function[]|Object|Object[]|string|string[])} iteratees
     *  The iteratees to sort by, specified as individual values or arrays of values.
     * @returns {Array} Returns the new sorted array.
     * @example
     *
     * var users = [
     *   { 'user': 'fred',   'age': 48 },
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 42 },
     *   { 'user': 'barney', 'age': 34 }
     * ];
     *
     * _.map(_.sortByAll(users, ['user', 'age']), _.values);
     * // => [['barney', 34], ['barney', 36], ['fred', 42], ['fred', 48]]
     *
     * _.map(_.sortByAll(users, 'user', function(chr) {
     *   return Math.floor(chr.age / 10);
     * }), _.values);
     * // => [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
     */
							var sortByAll = restParam(function(collection, iteratees) {
								if (collection == null) {
									return [];
								}
								var guard = iteratees[2];
								if (
									guard &&
									isIterateeCall(iteratees[0], iteratees[1], guard)
								) {
									iteratees.length = 1;
								}
								return baseSortByOrder(collection, baseFlatten(iteratees), []);
							});

							/**
     * This method is like `_.sortByAll` except that it allows specifying the
     * sort orders of the iteratees to sort by. If `orders` is unspecified, all
     * values are sorted in ascending order. Otherwise, a value is sorted in
     * ascending order if its corresponding order is "asc", and descending if "desc".
     *
     * If a property name is provided for an iteratee the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If an object is provided for an iteratee the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
     * @param {boolean[]} [orders] The sort orders of `iteratees`.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.reduce`.
     * @returns {Array} Returns the new sorted array.
     * @example
     *
     * var users = [
     *   { 'user': 'fred',   'age': 48 },
     *   { 'user': 'barney', 'age': 34 },
     *   { 'user': 'fred',   'age': 42 },
     *   { 'user': 'barney', 'age': 36 }
     * ];
     *
     * // sort by `user` in ascending order and by `age` in descending order
     * _.map(_.sortByOrder(users, ['user', 'age'], ['asc', 'desc']), _.values);
     * // => [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
     */
							function sortByOrder(collection, iteratees, orders, guard) {
								if (collection == null) {
									return [];
								}
								if (guard && isIterateeCall(iteratees, orders, guard)) {
									orders = undefined;
								}
								if (!isArray(iteratees)) {
									iteratees = iteratees == null ? [] : [iteratees];
								}
								if (!isArray(orders)) {
									orders = orders == null ? [] : [orders];
								}
								return baseSortByOrder(collection, iteratees, orders);
							}

							/**
     * Performs a deep comparison between each element in `collection` and the
     * source object, returning an array of all elements that have equivalent
     * property values.
     *
     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
     * numbers, `Object` objects, regexes, and strings. Objects are compared by
     * their own, not inherited, enumerable properties. For comparing a single
     * own or inherited property value see `_.matchesProperty`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to search.
     * @param {Object} source The object of property values to match.
     * @returns {Array} Returns the new filtered array.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': false, 'pets': ['hoppy'] },
     *   { 'user': 'fred',   'age': 40, 'active': true, 'pets': ['baby puss', 'dino'] }
     * ];
     *
     * _.pluck(_.where(users, { 'age': 36, 'active': false }), 'user');
     * // => ['barney']
     *
     * _.pluck(_.where(users, { 'pets': ['dino'] }), 'user');
     * // => ['fred']
     */
							function where(collection, source) {
								return filter(collection, baseMatches(source));
							}

							/*------------------------------------------------------------------------*/

							/**
     * Gets the number of milliseconds that have elapsed since the Unix epoch
     * (1 January 1970 00:00:00 UTC).
     *
     * @static
     * @memberOf _
     * @category Date
     * @example
     *
     * _.defer(function(stamp) {
     *   console.log(_.now() - stamp);
     * }, _.now());
     * // => logs the number of milliseconds it took for the deferred function to be invoked
     */
							var now =
								nativeNow ||
								function() {
									return new Date().getTime();
								};

							/*------------------------------------------------------------------------*/

							/**
     * The opposite of `_.before`; this method creates a function that invokes
     * `func` once it is called `n` or more times.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {number} n The number of calls before `func` is invoked.
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * var saves = ['profile', 'settings'];
     *
     * var done = _.after(saves.length, function() {
     *   console.log('done saving!');
     * });
     *
     * _.forEach(saves, function(type) {
     *   asyncSave({ 'type': type, 'complete': done });
     * });
     * // => logs 'done saving!' after the two async saves have completed
     */
							function after(n, func) {
								if (typeof func != 'function') {
									if (typeof n == 'function') {
										var temp = n;
										n = func;
										func = temp;
									} else {
										throw new TypeError(FUNC_ERROR_TEXT);
									}
								}
								n = nativeIsFinite((n = +n)) ? n : 0;
								return function() {
									if (--n < 1) {
										return func.apply(this, arguments);
									}
								};
							}

							/**
     * Creates a function that accepts up to `n` arguments ignoring any
     * additional arguments.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to cap arguments for.
     * @param {number} [n=func.length] The arity cap.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Function} Returns the new function.
     * @example
     *
     * _.map(['6', '8', '10'], _.ary(parseInt, 1));
     * // => [6, 8, 10]
     */
							function ary(func, n, guard) {
								if (guard && isIterateeCall(func, n, guard)) {
									n = undefined;
								}
								n = func && n == null ? func.length : nativeMax(+n || 0, 0);
								return createWrapper(
									func,
									ARY_FLAG,
									undefined,
									undefined,
									undefined,
									undefined,
									n
								);
							}

							/**
     * Creates a function that invokes `func`, with the `this` binding and arguments
     * of the created function, while it is called less than `n` times. Subsequent
     * calls to the created function return the result of the last `func` invocation.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {number} n The number of calls at which `func` is no longer invoked.
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * jQuery('#add').on('click', _.before(5, addContactToList));
     * // => allows adding up to 4 contacts to the list
     */
							function before(n, func) {
								var result;
								if (typeof func != 'function') {
									if (typeof n == 'function') {
										var temp = n;
										n = func;
										func = temp;
									} else {
										throw new TypeError(FUNC_ERROR_TEXT);
									}
								}
								return function() {
									if (--n > 0) {
										result = func.apply(this, arguments);
									}
									if (n <= 1) {
										func = undefined;
									}
									return result;
								};
							}

							/**
     * Creates a function that invokes `func` with the `this` binding of `thisArg`
     * and prepends any additional `_.bind` arguments to those provided to the
     * bound function.
     *
     * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
     * may be used as a placeholder for partially applied arguments.
     *
     * **Note:** Unlike native `Function#bind` this method does not set the "length"
     * property of bound functions.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to bind.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new bound function.
     * @example
     *
     * var greet = function(greeting, punctuation) {
     *   return greeting + ' ' + this.user + punctuation;
     * };
     *
     * var object = { 'user': 'fred' };
     *
     * var bound = _.bind(greet, object, 'hi');
     * bound('!');
     * // => 'hi fred!'
     *
     * // using placeholders
     * var bound = _.bind(greet, object, _, '!');
     * bound('hi');
     * // => 'hi fred!'
     */
							var bind = restParam(function(func, thisArg, partials) {
								var bitmask = BIND_FLAG;
								if (partials.length) {
									var holders = replaceHolders(partials, bind.placeholder);
									bitmask |= PARTIAL_FLAG;
								}
								return createWrapper(func, bitmask, thisArg, partials, holders);
							});

							/**
     * Binds methods of an object to the object itself, overwriting the existing
     * method. Method names may be specified as individual arguments or as arrays
     * of method names. If no method names are provided all enumerable function
     * properties, own and inherited, of `object` are bound.
     *
     * **Note:** This method does not set the "length" property of bound functions.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Object} object The object to bind and assign the bound methods to.
     * @param {...(string|string[])} [methodNames] The object method names to bind,
     *  specified as individual method names or arrays of method names.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var view = {
     *   'label': 'docs',
     *   'onClick': function() {
     *     console.log('clicked ' + this.label);
     *   }
     * };
     *
     * _.bindAll(view);
     * jQuery('#docs').on('click', view.onClick);
     * // => logs 'clicked docs' when the element is clicked
     */
							var bindAll = restParam(function(object, methodNames) {
								methodNames = methodNames.length
									? baseFlatten(methodNames)
									: functions(object);

								var index = -1,
									length = methodNames.length;

								while (++index < length) {
									var key = methodNames[index];
									object[key] = createWrapper(object[key], BIND_FLAG, object);
								}
								return object;
							});

							/**
     * Creates a function that invokes the method at `object[key]` and prepends
     * any additional `_.bindKey` arguments to those provided to the bound function.
     *
     * This method differs from `_.bind` by allowing bound functions to reference
     * methods that may be redefined or don't yet exist.
     * See [Peter Michaux's article](http://peter.michaux.ca/articles/lazy-function-definition-pattern)
     * for more details.
     *
     * The `_.bindKey.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Object} object The object the method belongs to.
     * @param {string} key The key of the method.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new bound function.
     * @example
     *
     * var object = {
     *   'user': 'fred',
     *   'greet': function(greeting, punctuation) {
     *     return greeting + ' ' + this.user + punctuation;
     *   }
     * };
     *
     * var bound = _.bindKey(object, 'greet', 'hi');
     * bound('!');
     * // => 'hi fred!'
     *
     * object.greet = function(greeting, punctuation) {
     *   return greeting + 'ya ' + this.user + punctuation;
     * };
     *
     * bound('!');
     * // => 'hiya fred!'
     *
     * // using placeholders
     * var bound = _.bindKey(object, 'greet', _, '!');
     * bound('hi');
     * // => 'hiya fred!'
     */
							var bindKey = restParam(function(object, key, partials) {
								var bitmask = BIND_FLAG | BIND_KEY_FLAG;
								if (partials.length) {
									var holders = replaceHolders(partials, bindKey.placeholder);
									bitmask |= PARTIAL_FLAG;
								}
								return createWrapper(key, bitmask, object, partials, holders);
							});

							/**
     * Creates a function that accepts one or more arguments of `func` that when
     * called either invokes `func` returning its result, if all `func` arguments
     * have been provided, or returns a function that accepts one or more of the
     * remaining `func` arguments, and so on. The arity of `func` may be specified
     * if `func.length` is not sufficient.
     *
     * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
     * may be used as a placeholder for provided arguments.
     *
     * **Note:** This method does not set the "length" property of curried functions.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to curry.
     * @param {number} [arity=func.length] The arity of `func`.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Function} Returns the new curried function.
     * @example
     *
     * var abc = function(a, b, c) {
     *   return [a, b, c];
     * };
     *
     * var curried = _.curry(abc);
     *
     * curried(1)(2)(3);
     * // => [1, 2, 3]
     *
     * curried(1, 2)(3);
     * // => [1, 2, 3]
     *
     * curried(1, 2, 3);
     * // => [1, 2, 3]
     *
     * // using placeholders
     * curried(1)(_, 3)(2);
     * // => [1, 2, 3]
     */
							var curry = createCurry(CURRY_FLAG);

							/**
     * This method is like `_.curry` except that arguments are applied to `func`
     * in the manner of `_.partialRight` instead of `_.partial`.
     *
     * The `_.curryRight.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for provided arguments.
     *
     * **Note:** This method does not set the "length" property of curried functions.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to curry.
     * @param {number} [arity=func.length] The arity of `func`.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Function} Returns the new curried function.
     * @example
     *
     * var abc = function(a, b, c) {
     *   return [a, b, c];
     * };
     *
     * var curried = _.curryRight(abc);
     *
     * curried(3)(2)(1);
     * // => [1, 2, 3]
     *
     * curried(2, 3)(1);
     * // => [1, 2, 3]
     *
     * curried(1, 2, 3);
     * // => [1, 2, 3]
     *
     * // using placeholders
     * curried(3)(1, _)(2);
     * // => [1, 2, 3]
     */
							var curryRight = createCurry(CURRY_RIGHT_FLAG);

							/**
     * Creates a debounced function that delays invoking `func` until after `wait`
     * milliseconds have elapsed since the last time the debounced function was
     * invoked. The debounced function comes with a `cancel` method to cancel
     * delayed invocations. Provide an options object to indicate that `func`
     * should be invoked on the leading and/or trailing edge of the `wait` timeout.
     * Subsequent calls to the debounced function return the result of the last
     * `func` invocation.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
     * on the trailing edge of the timeout only if the the debounced function is
     * invoked more than once during the `wait` timeout.
     *
     * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
     * for details over the differences between `_.debounce` and `_.throttle`.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to debounce.
     * @param {number} [wait=0] The number of milliseconds to delay.
     * @param {Object} [options] The options object.
     * @param {boolean} [options.leading=false] Specify invoking on the leading
     *  edge of the timeout.
     * @param {number} [options.maxWait] The maximum time `func` is allowed to be
     *  delayed before it is invoked.
     * @param {boolean} [options.trailing=true] Specify invoking on the trailing
     *  edge of the timeout.
     * @returns {Function} Returns the new debounced function.
     * @example
     *
     * // avoid costly calculations while the window size is in flux
     * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
     *
     * // invoke `sendMail` when the click event is fired, debouncing subsequent calls
     * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
     *   'leading': true,
     *   'trailing': false
     * }));
     *
     * // ensure `batchLog` is invoked once after 1 second of debounced calls
     * var source = new EventSource('/stream');
     * jQuery(source).on('message', _.debounce(batchLog, 250, {
     *   'maxWait': 1000
     * }));
     *
     * // cancel a debounced call
     * var todoChanges = _.debounce(batchLog, 1000);
     * Object.observe(models.todo, todoChanges);
     *
     * Object.observe(models, function(changes) {
     *   if (_.find(changes, { 'user': 'todo', 'type': 'delete'})) {
     *     todoChanges.cancel();
     *   }
     * }, ['delete']);
     *
     * // ...at some point `models.todo` is changed
     * models.todo.completed = true;
     *
     * // ...before 1 second has passed `models.todo` is deleted
     * // which cancels the debounced `todoChanges` call
     * delete models.todo;
     */
							function debounce(func, wait, options) {
								var args,
									maxTimeoutId,
									result,
									stamp,
									thisArg,
									timeoutId,
									trailingCall,
									lastCalled = 0,
									maxWait = false,
									trailing = true;

								if (typeof func != 'function') {
									throw new TypeError(FUNC_ERROR_TEXT);
								}
								wait = wait < 0 ? 0 : +wait || 0;
								if (options === true) {
									var leading = true;
									trailing = false;
								} else if (isObject(options)) {
									leading = !!options.leading;
									maxWait =
										'maxWait' in options &&
										nativeMax(+options.maxWait || 0, wait);
									trailing =
										'trailing' in options ? !!options.trailing : trailing;
								}

								function cancel() {
									if (timeoutId) {
										clearTimeout(timeoutId);
									}
									if (maxTimeoutId) {
										clearTimeout(maxTimeoutId);
									}
									lastCalled = 0;
									maxTimeoutId = timeoutId = trailingCall = undefined;
								}

								function complete(isCalled, id) {
									if (id) {
										clearTimeout(id);
									}
									maxTimeoutId = timeoutId = trailingCall = undefined;
									if (isCalled) {
										lastCalled = now();
										result = func.apply(thisArg, args);
										if (!timeoutId && !maxTimeoutId) {
											args = thisArg = undefined;
										}
									}
								}

								function delayed() {
									var remaining = wait - (now() - stamp);
									if (remaining <= 0 || remaining > wait) {
										complete(trailingCall, maxTimeoutId);
									} else {
										timeoutId = setTimeout(delayed, remaining);
									}
								}

								function maxDelayed() {
									complete(trailing, timeoutId);
								}

								function debounced() {
									args = arguments;
									stamp = now();
									thisArg = this;
									trailingCall = trailing && (timeoutId || !leading);

									if (maxWait === false) {
										var leadingCall = leading && !timeoutId;
									} else {
										if (!maxTimeoutId && !leading) {
											lastCalled = stamp;
										}
										var remaining = maxWait - (stamp - lastCalled),
											isCalled = remaining <= 0 || remaining > maxWait;

										if (isCalled) {
											if (maxTimeoutId) {
												maxTimeoutId = clearTimeout(maxTimeoutId);
											}
											lastCalled = stamp;
											result = func.apply(thisArg, args);
										} else if (!maxTimeoutId) {
											maxTimeoutId = setTimeout(maxDelayed, remaining);
										}
									}
									if (isCalled && timeoutId) {
										timeoutId = clearTimeout(timeoutId);
									} else if (!timeoutId && wait !== maxWait) {
										timeoutId = setTimeout(delayed, wait);
									}
									if (leadingCall) {
										isCalled = true;
										result = func.apply(thisArg, args);
									}
									if (isCalled && !timeoutId && !maxTimeoutId) {
										args = thisArg = undefined;
									}
									return result;
								}
								debounced.cancel = cancel;
								return debounced;
							}

							/**
     * Defers invoking the `func` until the current call stack has cleared. Any
     * additional arguments are provided to `func` when it is invoked.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to defer.
     * @param {...*} [args] The arguments to invoke the function with.
     * @returns {number} Returns the timer id.
     * @example
     *
     * _.defer(function(text) {
     *   console.log(text);
     * }, 'deferred');
     * // logs 'deferred' after one or more milliseconds
     */
							var defer = restParam(function(func, args) {
								return baseDelay(func, 1, args);
							});

							/**
     * Invokes `func` after `wait` milliseconds. Any additional arguments are
     * provided to `func` when it is invoked.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay invocation.
     * @param {...*} [args] The arguments to invoke the function with.
     * @returns {number} Returns the timer id.
     * @example
     *
     * _.delay(function(text) {
     *   console.log(text);
     * }, 1000, 'later');
     * // => logs 'later' after one second
     */
							var delay = restParam(function(func, wait, args) {
								return baseDelay(func, wait, args);
							});

							/**
     * Creates a function that returns the result of invoking the provided
     * functions with the `this` binding of the created function, where each
     * successive invocation is supplied the return value of the previous.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {...Function} [funcs] Functions to invoke.
     * @returns {Function} Returns the new function.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var addSquare = _.flow(_.add, square);
     * addSquare(1, 2);
     * // => 9
     */
							var flow = createFlow();

							/**
     * This method is like `_.flow` except that it creates a function that
     * invokes the provided functions from right to left.
     *
     * @static
     * @memberOf _
     * @alias backflow, compose
     * @category Function
     * @param {...Function} [funcs] Functions to invoke.
     * @returns {Function} Returns the new function.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var addSquare = _.flowRight(square, _.add);
     * addSquare(1, 2);
     * // => 9
     */
							var flowRight = createFlow(true);

							/**
     * Creates a function that memoizes the result of `func`. If `resolver` is
     * provided it determines the cache key for storing the result based on the
     * arguments provided to the memoized function. By default, the first argument
     * provided to the memoized function is coerced to a string and used as the
     * cache key. The `func` is invoked with the `this` binding of the memoized
     * function.
     *
     * **Note:** The cache is exposed as the `cache` property on the memoized
     * function. Its creation may be customized by replacing the `_.memoize.Cache`
     * constructor with one whose instances implement the [`Map`](http://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-map-prototype-object)
     * method interface of `get`, `has`, and `set`.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to have its output memoized.
     * @param {Function} [resolver] The function to resolve the cache key.
     * @returns {Function} Returns the new memoizing function.
     * @example
     *
     * var upperCase = _.memoize(function(string) {
     *   return string.toUpperCase();
     * });
     *
     * upperCase('fred');
     * // => 'FRED'
     *
     * // modifying the result cache
     * upperCase.cache.set('fred', 'BARNEY');
     * upperCase('fred');
     * // => 'BARNEY'
     *
     * // replacing `_.memoize.Cache`
     * var object = { 'user': 'fred' };
     * var other = { 'user': 'barney' };
     * var identity = _.memoize(_.identity);
     *
     * identity(object);
     * // => { 'user': 'fred' }
     * identity(other);
     * // => { 'user': 'fred' }
     *
     * _.memoize.Cache = WeakMap;
     * var identity = _.memoize(_.identity);
     *
     * identity(object);
     * // => { 'user': 'fred' }
     * identity(other);
     * // => { 'user': 'barney' }
     */
							function memoize(func, resolver) {
								if (
									typeof func != 'function' ||
									(resolver && typeof resolver != 'function')
								) {
									throw new TypeError(FUNC_ERROR_TEXT);
								}
								var memoized = function() {
									var args = arguments,
										key = resolver ? resolver.apply(this, args) : args[0],
										cache = memoized.cache;

									if (cache.has(key)) {
										return cache.get(key);
									}
									var result = func.apply(this, args);
									memoized.cache = cache.set(key, result);
									return result;
								};
								memoized.cache = new memoize.Cache();
								return memoized;
							}

							/**
     * Creates a function that runs each argument through a corresponding
     * transform function.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to wrap.
     * @param {...(Function|Function[])} [transforms] The functions to transform
     * arguments, specified as individual functions or arrays of functions.
     * @returns {Function} Returns the new function.
     * @example
     *
     * function doubled(n) {
     *   return n * 2;
     * }
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var modded = _.modArgs(function(x, y) {
     *   return [x, y];
     * }, square, doubled);
     *
     * modded(1, 2);
     * // => [1, 4]
     *
     * modded(5, 10);
     * // => [25, 20]
     */
							var modArgs = restParam(function(func, transforms) {
								transforms = baseFlatten(transforms);
								if (
									typeof func != 'function' ||
									!arrayEvery(transforms, baseIsFunction)
								) {
									throw new TypeError(FUNC_ERROR_TEXT);
								}
								var length = transforms.length;
								return restParam(function(args) {
									var index = nativeMin(args.length, length);
									while (index--) {
										args[index] = transforms[index](args[index]);
									}
									return func.apply(this, args);
								});
							});

							/**
     * Creates a function that negates the result of the predicate `func`. The
     * `func` predicate is invoked with the `this` binding and arguments of the
     * created function.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} predicate The predicate to negate.
     * @returns {Function} Returns the new function.
     * @example
     *
     * function isEven(n) {
     *   return n % 2 == 0;
     * }
     *
     * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
     * // => [1, 3, 5]
     */
							function negate(predicate) {
								if (typeof predicate != 'function') {
									throw new TypeError(FUNC_ERROR_TEXT);
								}
								return function() {
									return !predicate.apply(this, arguments);
								};
							}

							/**
     * Creates a function that is restricted to invoking `func` once. Repeat calls
     * to the function return the value of the first call. The `func` is invoked
     * with the `this` binding and arguments of the created function.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * var initialize = _.once(createApplication);
     * initialize();
     * initialize();
     * // `initialize` invokes `createApplication` once
     */
							function once(func) {
								return before(2, func);
							}

							/**
     * Creates a function that invokes `func` with `partial` arguments prepended
     * to those provided to the new function. This method is like `_.bind` except
     * it does **not** alter the `this` binding.
     *
     * The `_.partial.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * **Note:** This method does not set the "length" property of partially
     * applied functions.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to partially apply arguments to.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new partially applied function.
     * @example
     *
     * var greet = function(greeting, name) {
     *   return greeting + ' ' + name;
     * };
     *
     * var sayHelloTo = _.partial(greet, 'hello');
     * sayHelloTo('fred');
     * // => 'hello fred'
     *
     * // using placeholders
     * var greetFred = _.partial(greet, _, 'fred');
     * greetFred('hi');
     * // => 'hi fred'
     */
							var partial = createPartial(PARTIAL_FLAG);

							/**
     * This method is like `_.partial` except that partially applied arguments
     * are appended to those provided to the new function.
     *
     * The `_.partialRight.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * **Note:** This method does not set the "length" property of partially
     * applied functions.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to partially apply arguments to.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new partially applied function.
     * @example
     *
     * var greet = function(greeting, name) {
     *   return greeting + ' ' + name;
     * };
     *
     * var greetFred = _.partialRight(greet, 'fred');
     * greetFred('hi');
     * // => 'hi fred'
     *
     * // using placeholders
     * var sayHelloTo = _.partialRight(greet, 'hello', _);
     * sayHelloTo('fred');
     * // => 'hello fred'
     */
							var partialRight = createPartial(PARTIAL_RIGHT_FLAG);

							/**
     * Creates a function that invokes `func` with arguments arranged according
     * to the specified indexes where the argument value at the first index is
     * provided as the first argument, the argument value at the second index is
     * provided as the second argument, and so on.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to rearrange arguments for.
     * @param {...(number|number[])} indexes The arranged argument indexes,
     *  specified as individual indexes or arrays of indexes.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var rearged = _.rearg(function(a, b, c) {
     *   return [a, b, c];
     * }, 2, 0, 1);
     *
     * rearged('b', 'c', 'a')
     * // => ['a', 'b', 'c']
     *
     * var map = _.rearg(_.map, [1, 0]);
     * map(function(n) {
     *   return n * 3;
     * }, [1, 2, 3]);
     * // => [3, 6, 9]
     */
							var rearg = restParam(function(func, indexes) {
								return createWrapper(
									func,
									REARG_FLAG,
									undefined,
									undefined,
									undefined,
									baseFlatten(indexes)
								);
							});

							/**
     * Creates a function that invokes `func` with the `this` binding of the
     * created function and arguments from `start` and beyond provided as an array.
     *
     * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var say = _.restParam(function(what, names) {
     *   return what + ' ' + _.initial(names).join(', ') +
     *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
     * });
     *
     * say('hello', 'fred', 'barney', 'pebbles');
     * // => 'hello fred, barney, & pebbles'
     */
							function restParam(func, start) {
								if (typeof func != 'function') {
									throw new TypeError(FUNC_ERROR_TEXT);
								}
								start = nativeMax(
									start === undefined ? func.length - 1 : +start || 0,
									0
								);
								return function() {
									var args = arguments,
										index = -1,
										length = nativeMax(args.length - start, 0),
										rest = Array(length);

									while (++index < length) {
										rest[index] = args[start + index];
									}
									switch (start) {
										case 0:
											return func.call(this, rest);
										case 1:
											return func.call(this, args[0], rest);
										case 2:
											return func.call(this, args[0], args[1], rest);
									}
									var otherArgs = Array(start + 1);
									index = -1;
									while (++index < start) {
										otherArgs[index] = args[index];
									}
									otherArgs[start] = rest;
									return func.apply(this, otherArgs);
								};
							}

							/**
     * Creates a function that invokes `func` with the `this` binding of the created
     * function and an array of arguments much like [`Function#apply`](https://es5.github.io/#x15.3.4.3).
     *
     * **Note:** This method is based on the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator).
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to spread arguments over.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var say = _.spread(function(who, what) {
     *   return who + ' says ' + what;
     * });
     *
     * say(['fred', 'hello']);
     * // => 'fred says hello'
     *
     * // with a Promise
     * var numbers = Promise.all([
     *   Promise.resolve(40),
     *   Promise.resolve(36)
     * ]);
     *
     * numbers.then(_.spread(function(x, y) {
     *   return x + y;
     * }));
     * // => a Promise of 76
     */
							function spread(func) {
								if (typeof func != 'function') {
									throw new TypeError(FUNC_ERROR_TEXT);
								}
								return function(array) {
									return func.apply(this, array);
								};
							}

							/**
     * Creates a throttled function that only invokes `func` at most once per
     * every `wait` milliseconds. The throttled function comes with a `cancel`
     * method to cancel delayed invocations. Provide an options object to indicate
     * that `func` should be invoked on the leading and/or trailing edge of the
     * `wait` timeout. Subsequent calls to the throttled function return the
     * result of the last `func` call.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
     * on the trailing edge of the timeout only if the the throttled function is
     * invoked more than once during the `wait` timeout.
     *
     * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
     * for details over the differences between `_.throttle` and `_.debounce`.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to throttle.
     * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
     * @param {Object} [options] The options object.
     * @param {boolean} [options.leading=true] Specify invoking on the leading
     *  edge of the timeout.
     * @param {boolean} [options.trailing=true] Specify invoking on the trailing
     *  edge of the timeout.
     * @returns {Function} Returns the new throttled function.
     * @example
     *
     * // avoid excessively updating the position while scrolling
     * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
     *
     * // invoke `renewToken` when the click event is fired, but not more than once every 5 minutes
     * jQuery('.interactive').on('click', _.throttle(renewToken, 300000, {
     *   'trailing': false
     * }));
     *
     * // cancel a trailing throttled call
     * jQuery(window).on('popstate', throttled.cancel);
     */
							function throttle(func, wait, options) {
								var leading = true,
									trailing = true;

								if (typeof func != 'function') {
									throw new TypeError(FUNC_ERROR_TEXT);
								}
								if (options === false) {
									leading = false;
								} else if (isObject(options)) {
									leading = 'leading' in options ? !!options.leading : leading;
									trailing =
										'trailing' in options ? !!options.trailing : trailing;
								}
								return debounce(func, wait, {
									leading: leading,
									maxWait: +wait,
									trailing: trailing
								});
							}

							/**
     * Creates a function that provides `value` to the wrapper function as its
     * first argument. Any additional arguments provided to the function are
     * appended to those provided to the wrapper function. The wrapper is invoked
     * with the `this` binding of the created function.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {*} value The value to wrap.
     * @param {Function} wrapper The wrapper function.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var p = _.wrap(_.escape, function(func, text) {
     *   return '<p>' + func(text) + '</p>';
     * });
     *
     * p('fred, barney, & pebbles');
     * // => '<p>fred, barney, &amp; pebbles</p>'
     */
							function wrap(value, wrapper) {
								wrapper = wrapper == null ? identity : wrapper;
								return createWrapper(
									wrapper,
									PARTIAL_FLAG,
									undefined,
									[value],
									[]
								);
							}

							/*------------------------------------------------------------------------*/

							/**
     * Creates a clone of `value`. If `isDeep` is `true` nested objects are cloned,
     * otherwise they are assigned by reference. If `customizer` is provided it is
     * invoked to produce the cloned values. If `customizer` returns `undefined`
     * cloning is handled by the method instead. The `customizer` is bound to
     * `thisArg` and invoked with two argument; (value [, index|key, object]).
     *
     * **Note:** This method is loosely based on the
     * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
     * The enumerable properties of `arguments` objects and objects created by
     * constructors other than `Object` are cloned to plain `Object` objects. An
     * empty object is returned for uncloneable values such as functions, DOM nodes,
     * Maps, Sets, and WeakMaps.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @param {Function} [customizer] The function to customize cloning values.
     * @param {*} [thisArg] The `this` binding of `customizer`.
     * @returns {*} Returns the cloned value.
     * @example
     *
     * var users = [
     *   { 'user': 'barney' },
     *   { 'user': 'fred' }
     * ];
     *
     * var shallow = _.clone(users);
     * shallow[0] === users[0];
     * // => true
     *
     * var deep = _.clone(users, true);
     * deep[0] === users[0];
     * // => false
     *
     * // using a customizer callback
     * var el = _.clone(document.body, function(value) {
     *   if (_.isElement(value)) {
     *     return value.cloneNode(false);
     *   }
     * });
     *
     * el === document.body
     * // => false
     * el.nodeName
     * // => BODY
     * el.childNodes.length;
     * // => 0
     */
							function clone(value, isDeep, customizer, thisArg) {
								if (
									isDeep &&
									typeof isDeep != 'boolean' &&
									isIterateeCall(value, isDeep, customizer)
								) {
									isDeep = false;
								} else if (typeof isDeep == 'function') {
									thisArg = customizer;
									customizer = isDeep;
									isDeep = false;
								}
								return typeof customizer == 'function'
									? baseClone(
											value,
											isDeep,
											bindCallback(customizer, thisArg, 1)
										)
									: baseClone(value, isDeep);
							}

							/**
     * Creates a deep clone of `value`. If `customizer` is provided it is invoked
     * to produce the cloned values. If `customizer` returns `undefined` cloning
     * is handled by the method instead. The `customizer` is bound to `thisArg`
     * and invoked with two argument; (value [, index|key, object]).
     *
     * **Note:** This method is loosely based on the
     * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
     * The enumerable properties of `arguments` objects and objects created by
     * constructors other than `Object` are cloned to plain `Object` objects. An
     * empty object is returned for uncloneable values such as functions, DOM nodes,
     * Maps, Sets, and WeakMaps.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to deep clone.
     * @param {Function} [customizer] The function to customize cloning values.
     * @param {*} [thisArg] The `this` binding of `customizer`.
     * @returns {*} Returns the deep cloned value.
     * @example
     *
     * var users = [
     *   { 'user': 'barney' },
     *   { 'user': 'fred' }
     * ];
     *
     * var deep = _.cloneDeep(users);
     * deep[0] === users[0];
     * // => false
     *
     * // using a customizer callback
     * var el = _.cloneDeep(document.body, function(value) {
     *   if (_.isElement(value)) {
     *     return value.cloneNode(true);
     *   }
     * });
     *
     * el === document.body
     * // => false
     * el.nodeName
     * // => BODY
     * el.childNodes.length;
     * // => 20
     */
							function cloneDeep(value, customizer, thisArg) {
								return typeof customizer == 'function'
									? baseClone(value, true, bindCallback(customizer, thisArg, 1))
									: baseClone(value, true);
							}

							/**
     * Checks if `value` is greater than `other`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is greater than `other`, else `false`.
     * @example
     *
     * _.gt(3, 1);
     * // => true
     *
     * _.gt(3, 3);
     * // => false
     *
     * _.gt(1, 3);
     * // => false
     */
							function gt(value, other) {
								return value > other;
							}

							/**
     * Checks if `value` is greater than or equal to `other`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is greater than or equal to `other`, else `false`.
     * @example
     *
     * _.gte(3, 1);
     * // => true
     *
     * _.gte(3, 3);
     * // => true
     *
     * _.gte(1, 3);
     * // => false
     */
							function gte(value, other) {
								return value >= other;
							}

							/**
     * Checks if `value` is classified as an `arguments` object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isArguments(function() { return arguments; }());
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */
							function isArguments(value) {
								return (
									isObjectLike(value) &&
									isArrayLike(value) &&
									hasOwnProperty.call(value, 'callee') &&
									!propertyIsEnumerable.call(value, 'callee')
								);
							}

							/**
     * Checks if `value` is classified as an `Array` object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isArray([1, 2, 3]);
     * // => true
     *
     * _.isArray(function() { return arguments; }());
     * // => false
     */
							var isArray =
								nativeIsArray ||
								function(value) {
									return (
										isObjectLike(value) &&
										isLength(value.length) &&
										objToString.call(value) == arrayTag
									);
								};

							/**
     * Checks if `value` is classified as a boolean primitive or object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isBoolean(false);
     * // => true
     *
     * _.isBoolean(null);
     * // => false
     */
							function isBoolean(value) {
								return (
									value === true ||
									value === false ||
									(isObjectLike(value) && objToString.call(value) == boolTag)
								);
							}

							/**
     * Checks if `value` is classified as a `Date` object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isDate(new Date);
     * // => true
     *
     * _.isDate('Mon April 23 2012');
     * // => false
     */
							function isDate(value) {
								return (
									isObjectLike(value) && objToString.call(value) == dateTag
								);
							}

							/**
     * Checks if `value` is a DOM element.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
     * @example
     *
     * _.isElement(document.body);
     * // => true
     *
     * _.isElement('<body>');
     * // => false
     */
							function isElement(value) {
								return (
									!!value &&
									value.nodeType === 1 &&
									isObjectLike(value) &&
									!isPlainObject(value)
								);
							}

							/**
     * Checks if `value` is empty. A value is considered empty unless it is an
     * `arguments` object, array, string, or jQuery-like collection with a length
     * greater than `0` or an object with own enumerable properties.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {Array|Object|string} value The value to inspect.
     * @returns {boolean} Returns `true` if `value` is empty, else `false`.
     * @example
     *
     * _.isEmpty(null);
     * // => true
     *
     * _.isEmpty(true);
     * // => true
     *
     * _.isEmpty(1);
     * // => true
     *
     * _.isEmpty([1, 2, 3]);
     * // => false
     *
     * _.isEmpty({ 'a': 1 });
     * // => false
     */
							function isEmpty(value) {
								if (value == null) {
									return true;
								}
								if (
									isArrayLike(value) &&
									(isArray(value) ||
										isString(value) ||
										isArguments(value) ||
										(isObjectLike(value) && isFunction(value.splice)))
								) {
									return !value.length;
								}
								return !keys(value).length;
							}

							/**
     * Performs a deep comparison between two values to determine if they are
     * equivalent. If `customizer` is provided it is invoked to compare values.
     * If `customizer` returns `undefined` comparisons are handled by the method
     * instead. The `customizer` is bound to `thisArg` and invoked with three
     * arguments: (value, other [, index|key]).
     *
     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
     * numbers, `Object` objects, regexes, and strings. Objects are compared by
     * their own, not inherited, enumerable properties. Functions and DOM nodes
     * are **not** supported. Provide a customizer function to extend support
     * for comparing other values.
     *
     * @static
     * @memberOf _
     * @alias eq
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @param {Function} [customizer] The function to customize value comparisons.
     * @param {*} [thisArg] The `this` binding of `customizer`.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'user': 'fred' };
     * var other = { 'user': 'fred' };
     *
     * object == other;
     * // => false
     *
     * _.isEqual(object, other);
     * // => true
     *
     * // using a customizer callback
     * var array = ['hello', 'goodbye'];
     * var other = ['hi', 'goodbye'];
     *
     * _.isEqual(array, other, function(value, other) {
     *   if (_.every([value, other], RegExp.prototype.test, /^h(?:i|ello)$/)) {
     *     return true;
     *   }
     * });
     * // => true
     */
							function isEqual(value, other, customizer, thisArg) {
								customizer =
									typeof customizer == 'function'
										? bindCallback(customizer, thisArg, 3)
										: undefined;
								var result = customizer ? customizer(value, other) : undefined;
								return result === undefined
									? baseIsEqual(value, other, customizer)
									: !!result;
							}

							/**
     * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
     * `SyntaxError`, `TypeError`, or `URIError` object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
     * @example
     *
     * _.isError(new Error);
     * // => true
     *
     * _.isError(Error);
     * // => false
     */
							function isError(value) {
								return (
									isObjectLike(value) &&
									typeof value.message == 'string' &&
									objToString.call(value) == errorTag
								);
							}

							/**
     * Checks if `value` is a finite primitive number.
     *
     * **Note:** This method is based on [`Number.isFinite`](http://ecma-international.org/ecma-262/6.0/#sec-number.isfinite).
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
     * @example
     *
     * _.isFinite(10);
     * // => true
     *
     * _.isFinite('10');
     * // => false
     *
     * _.isFinite(true);
     * // => false
     *
     * _.isFinite(Object(10));
     * // => false
     *
     * _.isFinite(Infinity);
     * // => false
     */
							function isFinite(value) {
								return typeof value == 'number' && nativeIsFinite(value);
							}

							/**
     * Checks if `value` is classified as a `Function` object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     *
     * _.isFunction(/abc/);
     * // => false
     */
							function isFunction(value) {
								// The use of `Object#toString` avoids issues with the `typeof` operator
								// in older versions of Chrome and Safari which return 'function' for regexes
								// and Safari 8 equivalents which return 'object' for typed array constructors.
								return isObject(value) && objToString.call(value) == funcTag;
							}

							/**
     * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
     * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(1);
     * // => false
     */
							function isObject(value) {
								// Avoid a V8 JIT bug in Chrome 19-20.
								// See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
								var type = typeof value;
								return !!value && (type == 'object' || type == 'function');
							}

							/**
     * Performs a deep comparison between `object` and `source` to determine if
     * `object` contains equivalent property values. If `customizer` is provided
     * it is invoked to compare values. If `customizer` returns `undefined`
     * comparisons are handled by the method instead. The `customizer` is bound
     * to `thisArg` and invoked with three arguments: (value, other, index|key).
     *
     * **Note:** This method supports comparing properties of arrays, booleans,
     * `Date` objects, numbers, `Object` objects, regexes, and strings. Functions
     * and DOM nodes are **not** supported. Provide a customizer function to extend
     * support for comparing other values.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property values to match.
     * @param {Function} [customizer] The function to customize value comparisons.
     * @param {*} [thisArg] The `this` binding of `customizer`.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     * @example
     *
     * var object = { 'user': 'fred', 'age': 40 };
     *
     * _.isMatch(object, { 'age': 40 });
     * // => true
     *
     * _.isMatch(object, { 'age': 36 });
     * // => false
     *
     * // using a customizer callback
     * var object = { 'greeting': 'hello' };
     * var source = { 'greeting': 'hi' };
     *
     * _.isMatch(object, source, function(value, other) {
     *   return _.every([value, other], RegExp.prototype.test, /^h(?:i|ello)$/) || undefined;
     * });
     * // => true
     */
							function isMatch(object, source, customizer, thisArg) {
								customizer =
									typeof customizer == 'function'
										? bindCallback(customizer, thisArg, 3)
										: undefined;
								return baseIsMatch(object, getMatchData(source), customizer);
							}

							/**
     * Checks if `value` is `NaN`.
     *
     * **Note:** This method is not the same as [`isNaN`](https://es5.github.io/#x15.1.2.4)
     * which returns `true` for `undefined` and other non-numeric values.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
     * @example
     *
     * _.isNaN(NaN);
     * // => true
     *
     * _.isNaN(new Number(NaN));
     * // => true
     *
     * isNaN(undefined);
     * // => true
     *
     * _.isNaN(undefined);
     * // => false
     */
							function isNaN(value) {
								// An `NaN` primitive is the only value that is not equal to itself.
								// Perform the `toStringTag` check first to avoid errors with some host objects in IE.
								return isNumber(value) && value != +value;
							}

							/**
     * Checks if `value` is a native function.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
     * @example
     *
     * _.isNative(Array.prototype.push);
     * // => true
     *
     * _.isNative(_);
     * // => false
     */
							function isNative(value) {
								if (value == null) {
									return false;
								}
								if (isFunction(value)) {
									return reIsNative.test(fnToString.call(value));
								}
								return isObjectLike(value) && reIsHostCtor.test(value);
							}

							/**
     * Checks if `value` is `null`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
     * @example
     *
     * _.isNull(null);
     * // => true
     *
     * _.isNull(void 0);
     * // => false
     */
							function isNull(value) {
								return value === null;
							}

							/**
     * Checks if `value` is classified as a `Number` primitive or object.
     *
     * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are classified
     * as numbers, use the `_.isFinite` method.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isNumber(8.4);
     * // => true
     *
     * _.isNumber(NaN);
     * // => true
     *
     * _.isNumber('8.4');
     * // => false
     */
							function isNumber(value) {
								return (
									typeof value == 'number' ||
									(isObjectLike(value) && objToString.call(value) == numberTag)
								);
							}

							/**
     * Checks if `value` is a plain object, that is, an object created by the
     * `Object` constructor or one with a `[[Prototype]]` of `null`.
     *
     * **Note:** This method assumes objects created by the `Object` constructor
     * have no inherited enumerable properties.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * _.isPlainObject(new Foo);
     * // => false
     *
     * _.isPlainObject([1, 2, 3]);
     * // => false
     *
     * _.isPlainObject({ 'x': 0, 'y': 0 });
     * // => true
     *
     * _.isPlainObject(Object.create(null));
     * // => true
     */
							function isPlainObject(value) {
								var Ctor;

								// Exit early for non `Object` objects.
								if (
									!(
										isObjectLike(value) &&
										objToString.call(value) == objectTag &&
										!isArguments(value)
									) ||
									(!hasOwnProperty.call(value, 'constructor') &&
										(
											(Ctor = value.constructor),
											typeof Ctor == 'function' && !(Ctor instanceof Ctor)
										))
								) {
									return false;
								}
								// IE < 9 iterates inherited properties before own properties. If the first
								// iterated property is an object's own property then there are no inherited
								// enumerable properties.
								var result;
								// In most environments an object's own properties are iterated before
								// its inherited properties. If the last iterated property is an object's
								// own property then there are no inherited enumerable properties.
								baseForIn(value, function(subValue, key) {
									result = key;
								});
								return (
									result === undefined || hasOwnProperty.call(value, result)
								);
							}

							/**
     * Checks if `value` is classified as a `RegExp` object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isRegExp(/abc/);
     * // => true
     *
     * _.isRegExp('/abc/');
     * // => false
     */
							function isRegExp(value) {
								return isObject(value) && objToString.call(value) == regexpTag;
							}

							/**
     * Checks if `value` is classified as a `String` primitive or object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isString('abc');
     * // => true
     *
     * _.isString(1);
     * // => false
     */
							function isString(value) {
								return (
									typeof value == 'string' ||
									(isObjectLike(value) && objToString.call(value) == stringTag)
								);
							}

							/**
     * Checks if `value` is classified as a typed array.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isTypedArray(new Uint8Array);
     * // => true
     *
     * _.isTypedArray([]);
     * // => false
     */
							function isTypedArray(value) {
								return (
									isObjectLike(value) &&
									isLength(value.length) &&
									!!typedArrayTags[objToString.call(value)]
								);
							}

							/**
     * Checks if `value` is `undefined`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
     * @example
     *
     * _.isUndefined(void 0);
     * // => true
     *
     * _.isUndefined(null);
     * // => false
     */
							function isUndefined(value) {
								return value === undefined;
							}

							/**
     * Checks if `value` is less than `other`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is less than `other`, else `false`.
     * @example
     *
     * _.lt(1, 3);
     * // => true
     *
     * _.lt(3, 3);
     * // => false
     *
     * _.lt(3, 1);
     * // => false
     */
							function lt(value, other) {
								return value < other;
							}

							/**
     * Checks if `value` is less than or equal to `other`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is less than or equal to `other`, else `false`.
     * @example
     *
     * _.lte(1, 3);
     * // => true
     *
     * _.lte(3, 3);
     * // => true
     *
     * _.lte(3, 1);
     * // => false
     */
							function lte(value, other) {
								return value <= other;
							}

							/**
     * Converts `value` to an array.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {Array} Returns the converted array.
     * @example
     *
     * (function() {
     *   return _.toArray(arguments).slice(1);
     * }(1, 2, 3));
     * // => [2, 3]
     */
							function toArray(value) {
								var length = value ? getLength(value) : 0;
								if (!isLength(length)) {
									return values(value);
								}
								if (!length) {
									return [];
								}
								return arrayCopy(value);
							}

							/**
     * Converts `value` to a plain object flattening inherited enumerable
     * properties of `value` to own properties of the plain object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {Object} Returns the converted plain object.
     * @example
     *
     * function Foo() {
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.assign({ 'a': 1 }, new Foo);
     * // => { 'a': 1, 'b': 2 }
     *
     * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
     * // => { 'a': 1, 'b': 2, 'c': 3 }
     */
							function toPlainObject(value) {
								return baseCopy(value, keysIn(value));
							}

							/*------------------------------------------------------------------------*/

							/**
     * Recursively merges own enumerable properties of the source object(s), that
     * don't resolve to `undefined` into the destination object. Subsequent sources
     * overwrite property assignments of previous sources. If `customizer` is
     * provided it is invoked to produce the merged values of the destination and
     * source properties. If `customizer` returns `undefined` merging is handled
     * by the method instead. The `customizer` is bound to `thisArg` and invoked
     * with five arguments: (objectValue, sourceValue, key, object, source).
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @param {Function} [customizer] The function to customize assigned values.
     * @param {*} [thisArg] The `this` binding of `customizer`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var users = {
     *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
     * };
     *
     * var ages = {
     *   'data': [{ 'age': 36 }, { 'age': 40 }]
     * };
     *
     * _.merge(users, ages);
     * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
     *
     * // using a customizer callback
     * var object = {
     *   'fruits': ['apple'],
     *   'vegetables': ['beet']
     * };
     *
     * var other = {
     *   'fruits': ['banana'],
     *   'vegetables': ['carrot']
     * };
     *
     * _.merge(object, other, function(a, b) {
     *   if (_.isArray(a)) {
     *     return a.concat(b);
     *   }
     * });
     * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
     */
							var merge = createAssigner(baseMerge);

							/**
     * Assigns own enumerable properties of source object(s) to the destination
     * object. Subsequent sources overwrite property assignments of previous sources.
     * If `customizer` is provided it is invoked to produce the assigned values.
     * The `customizer` is bound to `thisArg` and invoked with five arguments:
     * (objectValue, sourceValue, key, object, source).
     *
     * **Note:** This method mutates `object` and is based on
     * [`Object.assign`](http://ecma-international.org/ecma-262/6.0/#sec-object.assign).
     *
     * @static
     * @memberOf _
     * @alias extend
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @param {Function} [customizer] The function to customize assigned values.
     * @param {*} [thisArg] The `this` binding of `customizer`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
     * // => { 'user': 'fred', 'age': 40 }
     *
     * // using a customizer callback
     * var defaults = _.partialRight(_.assign, function(value, other) {
     *   return _.isUndefined(value) ? other : value;
     * });
     *
     * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
     * // => { 'user': 'barney', 'age': 36 }
     */
							var assign = createAssigner(function(object, source, customizer) {
								return customizer
									? assignWith(object, source, customizer)
									: baseAssign(object, source);
							});

							/**
     * Creates an object that inherits from the given `prototype` object. If a
     * `properties` object is provided its own enumerable properties are assigned
     * to the created object.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} prototype The object to inherit from.
     * @param {Object} [properties] The properties to assign to the object.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Object} Returns the new object.
     * @example
     *
     * function Shape() {
     *   this.x = 0;
     *   this.y = 0;
     * }
     *
     * function Circle() {
     *   Shape.call(this);
     * }
     *
     * Circle.prototype = _.create(Shape.prototype, {
     *   'constructor': Circle
     * });
     *
     * var circle = new Circle;
     * circle instanceof Circle;
     * // => true
     *
     * circle instanceof Shape;
     * // => true
     */
							function create(prototype, properties, guard) {
								var result = baseCreate(prototype);
								if (guard && isIterateeCall(prototype, properties, guard)) {
									properties = undefined;
								}
								return properties ? baseAssign(result, properties) : result;
							}

							/**
     * Assigns own enumerable properties of source object(s) to the destination
     * object for all destination properties that resolve to `undefined`. Once a
     * property is set, additional values of the same property are ignored.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @example
     *
     * _.defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
     * // => { 'user': 'barney', 'age': 36 }
     */
							var defaults = createDefaults(assign, assignDefaults);

							/**
     * This method is like `_.defaults` except that it recursively assigns
     * default properties.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @example
     *
     * _.defaultsDeep({ 'user': { 'name': 'barney' } }, { 'user': { 'name': 'fred', 'age': 36 } });
     * // => { 'user': { 'name': 'barney', 'age': 36 } }
     *
     */
							var defaultsDeep = createDefaults(merge, mergeDefaults);

							/**
     * This method is like `_.find` except that it returns the key of the first
     * element `predicate` returns truthy for instead of the element itself.
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to search.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {string|undefined} Returns the key of the matched element, else `undefined`.
     * @example
     *
     * var users = {
     *   'barney':  { 'age': 36, 'active': true },
     *   'fred':    { 'age': 40, 'active': false },
     *   'pebbles': { 'age': 1,  'active': true }
     * };
     *
     * _.findKey(users, function(chr) {
     *   return chr.age < 40;
     * });
     * // => 'barney' (iteration order is not guaranteed)
     *
     * // using the `_.matches` callback shorthand
     * _.findKey(users, { 'age': 1, 'active': true });
     * // => 'pebbles'
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.findKey(users, 'active', false);
     * // => 'fred'
     *
     * // using the `_.property` callback shorthand
     * _.findKey(users, 'active');
     * // => 'barney'
     */
							var findKey = createFindKey(baseForOwn);

							/**
     * This method is like `_.findKey` except that it iterates over elements of
     * a collection in the opposite order.
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to search.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {string|undefined} Returns the key of the matched element, else `undefined`.
     * @example
     *
     * var users = {
     *   'barney':  { 'age': 36, 'active': true },
     *   'fred':    { 'age': 40, 'active': false },
     *   'pebbles': { 'age': 1,  'active': true }
     * };
     *
     * _.findLastKey(users, function(chr) {
     *   return chr.age < 40;
     * });
     * // => returns `pebbles` assuming `_.findKey` returns `barney`
     *
     * // using the `_.matches` callback shorthand
     * _.findLastKey(users, { 'age': 36, 'active': true });
     * // => 'barney'
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.findLastKey(users, 'active', false);
     * // => 'fred'
     *
     * // using the `_.property` callback shorthand
     * _.findLastKey(users, 'active');
     * // => 'pebbles'
     */
							var findLastKey = createFindKey(baseForOwnRight);

							/**
     * Iterates over own and inherited enumerable properties of an object invoking
     * `iteratee` for each property. The `iteratee` is bound to `thisArg` and invoked
     * with three arguments: (value, key, object). Iteratee functions may exit
     * iteration early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forIn(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => logs 'a', 'b', and 'c' (iteration order is not guaranteed)
     */
							var forIn = createForIn(baseFor);

							/**
     * This method is like `_.forIn` except that it iterates over properties of
     * `object` in the opposite order.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forInRight(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => logs 'c', 'b', and 'a' assuming `_.forIn ` logs 'a', 'b', and 'c'
     */
							var forInRight = createForIn(baseForRight);

							/**
     * Iterates over own enumerable properties of an object invoking `iteratee`
     * for each property. The `iteratee` is bound to `thisArg` and invoked with
     * three arguments: (value, key, object). Iteratee functions may exit iteration
     * early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forOwn(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => logs 'a' and 'b' (iteration order is not guaranteed)
     */
							var forOwn = createForOwn(baseForOwn);

							/**
     * This method is like `_.forOwn` except that it iterates over properties of
     * `object` in the opposite order.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forOwnRight(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => logs 'b' and 'a' assuming `_.forOwn` logs 'a' and 'b'
     */
							var forOwnRight = createForOwn(baseForOwnRight);

							/**
     * Creates an array of function property names from all enumerable properties,
     * own and inherited, of `object`.
     *
     * @static
     * @memberOf _
     * @alias methods
     * @category Object
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns the new array of property names.
     * @example
     *
     * _.functions(_);
     * // => ['after', 'ary', 'assign', ...]
     */
							function functions(object) {
								return baseFunctions(object, keysIn(object));
							}

							/**
     * Gets the property value at `path` of `object`. If the resolved value is
     * `undefined` the `defaultValue` is used in its place.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.get(object, 'a[0].b.c');
     * // => 3
     *
     * _.get(object, ['a', '0', 'b', 'c']);
     * // => 3
     *
     * _.get(object, 'a.b.c', 'default');
     * // => 'default'
     */
							function get(object, path, defaultValue) {
								var result =
									object == null
										? undefined
										: baseGet(object, toPath(path), path + '');
								return result === undefined ? defaultValue : result;
							}

							/**
     * Checks if `path` is a direct property.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @returns {boolean} Returns `true` if `path` is a direct property, else `false`.
     * @example
     *
     * var object = { 'a': { 'b': { 'c': 3 } } };
     *
     * _.has(object, 'a');
     * // => true
     *
     * _.has(object, 'a.b.c');
     * // => true
     *
     * _.has(object, ['a', 'b', 'c']);
     * // => true
     */
							function has(object, path) {
								if (object == null) {
									return false;
								}
								var result = hasOwnProperty.call(object, path);
								if (!result && !isKey(path)) {
									path = toPath(path);
									object =
										path.length == 1
											? object
											: baseGet(object, baseSlice(path, 0, -1));
									if (object == null) {
										return false;
									}
									path = last(path);
									result = hasOwnProperty.call(object, path);
								}
								return (
									result ||
									(isLength(object.length) &&
										isIndex(path, object.length) &&
										(isArray(object) || isArguments(object)))
								);
							}

							/**
     * Creates an object composed of the inverted keys and values of `object`.
     * If `object` contains duplicate values, subsequent values overwrite property
     * assignments of previous values unless `multiValue` is `true`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to invert.
     * @param {boolean} [multiValue] Allow multiple values per key.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Object} Returns the new inverted object.
     * @example
     *
     * var object = { 'a': 1, 'b': 2, 'c': 1 };
     *
     * _.invert(object);
     * // => { '1': 'c', '2': 'b' }
     *
     * // with `multiValue`
     * _.invert(object, true);
     * // => { '1': ['a', 'c'], '2': ['b'] }
     */
							function invert(object, multiValue, guard) {
								if (guard && isIterateeCall(object, multiValue, guard)) {
									multiValue = undefined;
								}
								var index = -1,
									props = keys(object),
									length = props.length,
									result = {};

								while (++index < length) {
									var key = props[index],
										value = object[key];

									if (multiValue) {
										if (hasOwnProperty.call(result, value)) {
											result[value].push(key);
										} else {
											result[value] = [key];
										}
									} else {
										result[value] = key;
									}
								}
								return result;
							}

							/**
     * Creates an array of the own enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects. See the
     * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
     * for more details.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keys(new Foo);
     * // => ['a', 'b'] (iteration order is not guaranteed)
     *
     * _.keys('hi');
     * // => ['0', '1']
     */
							var keys = !nativeKeys
								? shimKeys
								: function(object) {
										var Ctor = object == null ? undefined : object.constructor;
										if (
											(typeof Ctor == 'function' &&
												Ctor.prototype === object) ||
											(typeof object != 'function' && isArrayLike(object))
										) {
											return shimKeys(object);
										}
										return isObject(object) ? nativeKeys(object) : [];
									};

							/**
     * Creates an array of the own and inherited enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keysIn(new Foo);
     * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
     */
							function keysIn(object) {
								if (object == null) {
									return [];
								}
								if (!isObject(object)) {
									object = Object(object);
								}
								var length = object.length;
								length =
									(length &&
										isLength(length) &&
										(isArray(object) || isArguments(object)) &&
										length) ||
									0;

								var Ctor = object.constructor,
									index = -1,
									isProto =
										typeof Ctor == 'function' && Ctor.prototype === object,
									result = Array(length),
									skipIndexes = length > 0;

								while (++index < length) {
									result[index] = index + '';
								}
								for (var key in object) {
									if (
										!(skipIndexes && isIndex(key, length)) &&
										!(
											key == 'constructor' &&
											(isProto || !hasOwnProperty.call(object, key))
										)
									) {
										result.push(key);
									}
								}
								return result;
							}

							/**
     * The opposite of `_.mapValues`; this method creates an object with the
     * same values as `object` and keys generated by running each own enumerable
     * property of `object` through `iteratee`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns the new mapped object.
     * @example
     *
     * _.mapKeys({ 'a': 1, 'b': 2 }, function(value, key) {
     *   return key + value;
     * });
     * // => { 'a1': 1, 'b2': 2 }
     */
							var mapKeys = createObjectMapper(true);

							/**
     * Creates an object with the same keys as `object` and values generated by
     * running each own enumerable property of `object` through `iteratee`. The
     * iteratee function is bound to `thisArg` and invoked with three arguments:
     * (value, key, object).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns the new mapped object.
     * @example
     *
     * _.mapValues({ 'a': 1, 'b': 2 }, function(n) {
     *   return n * 3;
     * });
     * // => { 'a': 3, 'b': 6 }
     *
     * var users = {
     *   'fred':    { 'user': 'fred',    'age': 40 },
     *   'pebbles': { 'user': 'pebbles', 'age': 1 }
     * };
     *
     * // using the `_.property` callback shorthand
     * _.mapValues(users, 'age');
     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
     */
							var mapValues = createObjectMapper();

							/**
     * The opposite of `_.pick`; this method creates an object composed of the
     * own and inherited enumerable properties of `object` that are not omitted.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The source object.
     * @param {Function|...(string|string[])} [predicate] The function invoked per
     *  iteration or property names to omit, specified as individual property
     *  names or arrays of property names.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'user': 'fred', 'age': 40 };
     *
     * _.omit(object, 'age');
     * // => { 'user': 'fred' }
     *
     * _.omit(object, _.isNumber);
     * // => { 'user': 'fred' }
     */
							var omit = restParam(function(object, props) {
								if (object == null) {
									return {};
								}
								if (typeof props[0] != 'function') {
									var props = arrayMap(baseFlatten(props), String);
									return pickByArray(
										object,
										baseDifference(keysIn(object), props)
									);
								}
								var predicate = bindCallback(props[0], props[1], 3);
								return pickByCallback(object, function(value, key, object) {
									return !predicate(value, key, object);
								});
							});

							/**
     * Creates a two dimensional array of the key-value pairs for `object`,
     * e.g. `[[key1, value1], [key2, value2]]`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the new array of key-value pairs.
     * @example
     *
     * _.pairs({ 'barney': 36, 'fred': 40 });
     * // => [['barney', 36], ['fred', 40]] (iteration order is not guaranteed)
     */
							function pairs(object) {
								object = toObject(object);

								var index = -1,
									props = keys(object),
									length = props.length,
									result = Array(length);

								while (++index < length) {
									var key = props[index];
									result[index] = [key, object[key]];
								}
								return result;
							}

							/**
     * Creates an object composed of the picked `object` properties. Property
     * names may be specified as individual arguments or as arrays of property
     * names. If `predicate` is provided it is invoked for each property of `object`
     * picking the properties `predicate` returns truthy for. The predicate is
     * bound to `thisArg` and invoked with three arguments: (value, key, object).
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The source object.
     * @param {Function|...(string|string[])} [predicate] The function invoked per
     *  iteration or property names to pick, specified as individual property
     *  names or arrays of property names.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'user': 'fred', 'age': 40 };
     *
     * _.pick(object, 'user');
     * // => { 'user': 'fred' }
     *
     * _.pick(object, _.isString);
     * // => { 'user': 'fred' }
     */
							var pick = restParam(function(object, props) {
								if (object == null) {
									return {};
								}
								return typeof props[0] == 'function'
									? pickByCallback(object, bindCallback(props[0], props[1], 3))
									: pickByArray(object, baseFlatten(props));
							});

							/**
     * This method is like `_.get` except that if the resolved value is a function
     * it is invoked with the `this` binding of its parent object and its result
     * is returned.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to resolve.
     * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
     *
     * _.result(object, 'a[0].b.c1');
     * // => 3
     *
     * _.result(object, 'a[0].b.c2');
     * // => 4
     *
     * _.result(object, 'a.b.c', 'default');
     * // => 'default'
     *
     * _.result(object, 'a.b.c', _.constant('default'));
     * // => 'default'
     */
							function result(object, path, defaultValue) {
								var result = object == null ? undefined : object[path];
								if (result === undefined) {
									if (object != null && !isKey(path, object)) {
										path = toPath(path);
										object =
											path.length == 1
												? object
												: baseGet(object, baseSlice(path, 0, -1));
										result = object == null ? undefined : object[last(path)];
									}
									result = result === undefined ? defaultValue : result;
								}
								return isFunction(result) ? result.call(object) : result;
							}

							/**
     * Sets the property value of `path` on `object`. If a portion of `path`
     * does not exist it is created.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to augment.
     * @param {Array|string} path The path of the property to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.set(object, 'a[0].b.c', 4);
     * console.log(object.a[0].b.c);
     * // => 4
     *
     * _.set(object, 'x[0].y.z', 5);
     * console.log(object.x[0].y.z);
     * // => 5
     */
							function set(object, path, value) {
								if (object == null) {
									return object;
								}
								var pathKey = path + '';
								path =
									object[pathKey] != null || isKey(path, object)
										? [pathKey]
										: toPath(path);

								var index = -1,
									length = path.length,
									lastIndex = length - 1,
									nested = object;

								while (nested != null && ++index < length) {
									var key = path[index];
									if (isObject(nested)) {
										if (index == lastIndex) {
											nested[key] = value;
										} else if (nested[key] == null) {
											nested[key] = isIndex(path[index + 1]) ? [] : {};
										}
									}
									nested = nested[key];
								}
								return object;
							}

							/**
     * An alternative to `_.reduce`; this method transforms `object` to a new
     * `accumulator` object which is the result of running each of its own enumerable
     * properties through `iteratee`, with each invocation potentially mutating
     * the `accumulator` object. The `iteratee` is bound to `thisArg` and invoked
     * with four arguments: (accumulator, value, key, object). Iteratee functions
     * may exit iteration early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Array|Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The custom accumulator value.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {*} Returns the accumulated value.
     * @example
     *
     * _.transform([2, 3, 4], function(result, n) {
     *   result.push(n *= n);
     *   return n % 2 == 0;
     * });
     * // => [4, 9]
     *
     * _.transform({ 'a': 1, 'b': 2 }, function(result, n, key) {
     *   result[key] = n * 3;
     * });
     * // => { 'a': 3, 'b': 6 }
     */
							function transform(object, iteratee, accumulator, thisArg) {
								var isArr = isArray(object) || isTypedArray(object);
								iteratee = getCallback(iteratee, thisArg, 4);

								if (accumulator == null) {
									if (isArr || isObject(object)) {
										var Ctor = object.constructor;
										if (isArr) {
											accumulator = isArray(object) ? new Ctor() : [];
										} else {
											accumulator = baseCreate(
												isFunction(Ctor) ? Ctor.prototype : undefined
											);
										}
									} else {
										accumulator = {};
									}
								}
								(isArr ? arrayEach : baseForOwn)(object, function(
									value,
									index,
									object
								) {
									return iteratee(accumulator, value, index, object);
								});
								return accumulator;
							}

							/**
     * Creates an array of the own enumerable property values of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property values.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.values(new Foo);
     * // => [1, 2] (iteration order is not guaranteed)
     *
     * _.values('hi');
     * // => ['h', 'i']
     */
							function values(object) {
								return baseValues(object, keys(object));
							}

							/**
     * Creates an array of the own and inherited enumerable property values
     * of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property values.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.valuesIn(new Foo);
     * // => [1, 2, 3] (iteration order is not guaranteed)
     */
							function valuesIn(object) {
								return baseValues(object, keysIn(object));
							}

							/*------------------------------------------------------------------------*/

							/**
     * Checks if `n` is between `start` and up to but not including, `end`. If
     * `end` is not specified it is set to `start` with `start` then set to `0`.
     *
     * @static
     * @memberOf _
     * @category Number
     * @param {number} n The number to check.
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @returns {boolean} Returns `true` if `n` is in the range, else `false`.
     * @example
     *
     * _.inRange(3, 2, 4);
     * // => true
     *
     * _.inRange(4, 8);
     * // => true
     *
     * _.inRange(4, 2);
     * // => false
     *
     * _.inRange(2, 2);
     * // => false
     *
     * _.inRange(1.2, 2);
     * // => true
     *
     * _.inRange(5.2, 4);
     * // => false
     */
							function inRange(value, start, end) {
								start = +start || 0;
								if (end === undefined) {
									end = start;
									start = 0;
								} else {
									end = +end || 0;
								}
								return (
									value >= nativeMin(start, end) &&
									value < nativeMax(start, end)
								);
							}

							/**
     * Produces a random number between `min` and `max` (inclusive). If only one
     * argument is provided a number between `0` and the given number is returned.
     * If `floating` is `true`, or either `min` or `max` are floats, a floating-point
     * number is returned instead of an integer.
     *
     * @static
     * @memberOf _
     * @category Number
     * @param {number} [min=0] The minimum possible value.
     * @param {number} [max=1] The maximum possible value.
     * @param {boolean} [floating] Specify returning a floating-point number.
     * @returns {number} Returns the random number.
     * @example
     *
     * _.random(0, 5);
     * // => an integer between 0 and 5
     *
     * _.random(5);
     * // => also an integer between 0 and 5
     *
     * _.random(5, true);
     * // => a floating-point number between 0 and 5
     *
     * _.random(1.2, 5.2);
     * // => a floating-point number between 1.2 and 5.2
     */
							function random(min, max, floating) {
								if (floating && isIterateeCall(min, max, floating)) {
									max = floating = undefined;
								}
								var noMin = min == null,
									noMax = max == null;

								if (floating == null) {
									if (noMax && typeof min == 'boolean') {
										floating = min;
										min = 1;
									} else if (typeof max == 'boolean') {
										floating = max;
										noMax = true;
									}
								}
								if (noMin && noMax) {
									max = 1;
									noMax = false;
								}
								min = +min || 0;
								if (noMax) {
									max = min;
									min = 0;
								} else {
									max = +max || 0;
								}
								if (floating || min % 1 || max % 1) {
									var rand = nativeRandom();
									return nativeMin(
										min +
											rand *
												(max -
													min +
													parseFloat('1e-' + ((rand + '').length - 1))),
										max
									);
								}
								return baseRandom(min, max);
							}

							/*------------------------------------------------------------------------*/

							/**
     * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the camel cased string.
     * @example
     *
     * _.camelCase('Foo Bar');
     * // => 'fooBar'
     *
     * _.camelCase('--foo-bar');
     * // => 'fooBar'
     *
     * _.camelCase('__foo_bar__');
     * // => 'fooBar'
     */
							var camelCase = createCompounder(function(result, word, index) {
								word = word.toLowerCase();
								return (
									result +
									(index ? word.charAt(0).toUpperCase() + word.slice(1) : word)
								);
							});

							/**
     * Capitalizes the first character of `string`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to capitalize.
     * @returns {string} Returns the capitalized string.
     * @example
     *
     * _.capitalize('fred');
     * // => 'Fred'
     */
							function capitalize(string) {
								string = baseToString(string);
								return (
									string && string.charAt(0).toUpperCase() + string.slice(1)
								);
							}

							/**
     * Deburrs `string` by converting [latin-1 supplementary letters](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
     * to basic latin letters and removing [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to deburr.
     * @returns {string} Returns the deburred string.
     * @example
     *
     * _.deburr('déjà vu');
     * // => 'deja vu'
     */
							function deburr(string) {
								string = baseToString(string);
								return (
									string &&
									string
										.replace(reLatin1, deburrLetter)
										.replace(reComboMark, '')
								);
							}

							/**
     * Checks if `string` ends with the given target string.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to search.
     * @param {string} [target] The string to search for.
     * @param {number} [position=string.length] The position to search from.
     * @returns {boolean} Returns `true` if `string` ends with `target`, else `false`.
     * @example
     *
     * _.endsWith('abc', 'c');
     * // => true
     *
     * _.endsWith('abc', 'b');
     * // => false
     *
     * _.endsWith('abc', 'b', 2);
     * // => true
     */
							function endsWith(string, target, position) {
								string = baseToString(string);
								target = target + '';

								var length = string.length;
								position =
									position === undefined
										? length
										: nativeMin(position < 0 ? 0 : +position || 0, length);

								position -= target.length;
								return (
									position >= 0 && string.indexOf(target, position) == position
								);
							}

							/**
     * Converts the characters "&", "<", ">", '"', "'", and "\`", in `string` to
     * their corresponding HTML entities.
     *
     * **Note:** No other characters are escaped. To escape additional characters
     * use a third-party library like [_he_](https://mths.be/he).
     *
     * Though the ">" character is escaped for symmetry, characters like
     * ">" and "/" don't need escaping in HTML and have no special meaning
     * unless they're part of a tag or unquoted attribute value.
     * See [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
     * (under "semi-related fun fact") for more details.
     *
     * Backticks are escaped because in Internet Explorer < 9, they can break out
     * of attribute values or HTML comments. See [#59](https://html5sec.org/#59),
     * [#102](https://html5sec.org/#102), [#108](https://html5sec.org/#108), and
     * [#133](https://html5sec.org/#133) of the [HTML5 Security Cheatsheet](https://html5sec.org/)
     * for more details.
     *
     * When working with HTML you should always [quote attribute values](http://wonko.com/post/html-escaping)
     * to reduce XSS vectors.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to escape.
     * @returns {string} Returns the escaped string.
     * @example
     *
     * _.escape('fred, barney, & pebbles');
     * // => 'fred, barney, &amp; pebbles'
     */
							function escape(string) {
								// Reset `lastIndex` because in IE < 9 `String#replace` does not.
								string = baseToString(string);
								return string && reHasUnescapedHtml.test(string)
									? string.replace(reUnescapedHtml, escapeHtmlChar)
									: string;
							}

							/**
     * Escapes the `RegExp` special characters "\", "/", "^", "$", ".", "|", "?",
     * "*", "+", "(", ")", "[", "]", "{" and "}" in `string`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to escape.
     * @returns {string} Returns the escaped string.
     * @example
     *
     * _.escapeRegExp('[lodash](https://lodash.com/)');
     * // => '\[lodash\]\(https:\/\/lodash\.com\/\)'
     */
							function escapeRegExp(string) {
								string = baseToString(string);
								return string && reHasRegExpChars.test(string)
									? string.replace(reRegExpChars, escapeRegExpChar)
									: string || '(?:)';
							}

							/**
     * Converts `string` to [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the kebab cased string.
     * @example
     *
     * _.kebabCase('Foo Bar');
     * // => 'foo-bar'
     *
     * _.kebabCase('fooBar');
     * // => 'foo-bar'
     *
     * _.kebabCase('__foo_bar__');
     * // => 'foo-bar'
     */
							var kebabCase = createCompounder(function(result, word, index) {
								return result + (index ? '-' : '') + word.toLowerCase();
							});

							/**
     * Pads `string` on the left and right sides if it's shorter than `length`.
     * Padding characters are truncated if they can't be evenly divided by `length`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.pad('abc', 8);
     * // => '  abc   '
     *
     * _.pad('abc', 8, '_-');
     * // => '_-abc_-_'
     *
     * _.pad('abc', 3);
     * // => 'abc'
     */
							function pad(string, length, chars) {
								string = baseToString(string);
								length = +length;

								var strLength = string.length;
								if (strLength >= length || !nativeIsFinite(length)) {
									return string;
								}
								var mid = (length - strLength) / 2,
									leftLength = nativeFloor(mid),
									rightLength = nativeCeil(mid);

								chars = createPadding('', rightLength, chars);
								return chars.slice(0, leftLength) + string + chars;
							}

							/**
     * Pads `string` on the left side if it's shorter than `length`. Padding
     * characters are truncated if they exceed `length`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.padLeft('abc', 6);
     * // => '   abc'
     *
     * _.padLeft('abc', 6, '_-');
     * // => '_-_abc'
     *
     * _.padLeft('abc', 3);
     * // => 'abc'
     */
							var padLeft = createPadDir();

							/**
     * Pads `string` on the right side if it's shorter than `length`. Padding
     * characters are truncated if they exceed `length`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.padRight('abc', 6);
     * // => 'abc   '
     *
     * _.padRight('abc', 6, '_-');
     * // => 'abc_-_'
     *
     * _.padRight('abc', 3);
     * // => 'abc'
     */
							var padRight = createPadDir(true);

							/**
     * Converts `string` to an integer of the specified radix. If `radix` is
     * `undefined` or `0`, a `radix` of `10` is used unless `value` is a hexadecimal,
     * in which case a `radix` of `16` is used.
     *
     * **Note:** This method aligns with the [ES5 implementation](https://es5.github.io/#E)
     * of `parseInt`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} string The string to convert.
     * @param {number} [radix] The radix to interpret `value` by.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.parseInt('08');
     * // => 8
     *
     * _.map(['6', '08', '10'], _.parseInt);
     * // => [6, 8, 10]
     */
							function parseInt(string, radix, guard) {
								// Firefox < 21 and Opera < 15 follow ES3 for `parseInt`.
								// Chrome fails to trim leading <BOM> whitespace characters.
								// See https://code.google.com/p/v8/issues/detail?id=3109 for more details.
								if (
									guard ? isIterateeCall(string, radix, guard) : radix == null
								) {
									radix = 0;
								} else if (radix) {
									radix = +radix;
								}
								string = trim(string);
								return nativeParseInt(
									string,
									radix || (reHasHexPrefix.test(string) ? 16 : 10)
								);
							}

							/**
     * Repeats the given string `n` times.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to repeat.
     * @param {number} [n=0] The number of times to repeat the string.
     * @returns {string} Returns the repeated string.
     * @example
     *
     * _.repeat('*', 3);
     * // => '***'
     *
     * _.repeat('abc', 2);
     * // => 'abcabc'
     *
     * _.repeat('abc', 0);
     * // => ''
     */
							function repeat(string, n) {
								var result = '';
								string = baseToString(string);
								n = +n;
								if (n < 1 || !string || !nativeIsFinite(n)) {
									return result;
								}
								// Leverage the exponentiation by squaring algorithm for a faster repeat.
								// See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
								do {
									if (n % 2) {
										result += string;
									}
									n = nativeFloor(n / 2);
									string += string;
								} while (n);

								return result;
							}

							/**
     * Converts `string` to [snake case](https://en.wikipedia.org/wiki/Snake_case).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the snake cased string.
     * @example
     *
     * _.snakeCase('Foo Bar');
     * // => 'foo_bar'
     *
     * _.snakeCase('fooBar');
     * // => 'foo_bar'
     *
     * _.snakeCase('--foo-bar');
     * // => 'foo_bar'
     */
							var snakeCase = createCompounder(function(result, word, index) {
								return result + (index ? '_' : '') + word.toLowerCase();
							});

							/**
     * Converts `string` to [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the start cased string.
     * @example
     *
     * _.startCase('--foo-bar');
     * // => 'Foo Bar'
     *
     * _.startCase('fooBar');
     * // => 'Foo Bar'
     *
     * _.startCase('__foo_bar__');
     * // => 'Foo Bar'
     */
							var startCase = createCompounder(function(result, word, index) {
								return (
									result +
									(index ? ' ' : '') +
									(word.charAt(0).toUpperCase() + word.slice(1))
								);
							});

							/**
     * Checks if `string` starts with the given target string.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to search.
     * @param {string} [target] The string to search for.
     * @param {number} [position=0] The position to search from.
     * @returns {boolean} Returns `true` if `string` starts with `target`, else `false`.
     * @example
     *
     * _.startsWith('abc', 'a');
     * // => true
     *
     * _.startsWith('abc', 'b');
     * // => false
     *
     * _.startsWith('abc', 'b', 1);
     * // => true
     */
							function startsWith(string, target, position) {
								string = baseToString(string);
								position =
									position == null
										? 0
										: nativeMin(
												position < 0 ? 0 : +position || 0,
												string.length
											);

								return string.lastIndexOf(target, position) == position;
							}

							/**
     * Creates a compiled template function that can interpolate data properties
     * in "interpolate" delimiters, HTML-escape interpolated data properties in
     * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
     * properties may be accessed as free variables in the template. If a setting
     * object is provided it takes precedence over `_.templateSettings` values.
     *
     * **Note:** In the development build `_.template` utilizes
     * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
     * for easier debugging.
     *
     * For more information on precompiling templates see
     * [lodash's custom builds documentation](https://lodash.com/custom-builds).
     *
     * For more information on Chrome extension sandboxes see
     * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The template string.
     * @param {Object} [options] The options object.
     * @param {RegExp} [options.escape] The HTML "escape" delimiter.
     * @param {RegExp} [options.evaluate] The "evaluate" delimiter.
     * @param {Object} [options.imports] An object to import into the template as free variables.
     * @param {RegExp} [options.interpolate] The "interpolate" delimiter.
     * @param {string} [options.sourceURL] The sourceURL of the template's compiled source.
     * @param {string} [options.variable] The data object variable name.
     * @param- {Object} [otherOptions] Enables the legacy `options` param signature.
     * @returns {Function} Returns the compiled template function.
     * @example
     *
     * // using the "interpolate" delimiter to create a compiled template
     * var compiled = _.template('hello <%= user %>!');
     * compiled({ 'user': 'fred' });
     * // => 'hello fred!'
     *
     * // using the HTML "escape" delimiter to escape data property values
     * var compiled = _.template('<b><%- value %></b>');
     * compiled({ 'value': '<script>' });
     * // => '<b>&lt;script&gt;</b>'
     *
     * // using the "evaluate" delimiter to execute JavaScript and generate HTML
     * var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
     * compiled({ 'users': ['fred', 'barney'] });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // using the internal `print` function in "evaluate" delimiters
     * var compiled = _.template('<% print("hello " + user); %>!');
     * compiled({ 'user': 'barney' });
     * // => 'hello barney!'
     *
     * // using the ES delimiter as an alternative to the default "interpolate" delimiter
     * var compiled = _.template('hello ${ user }!');
     * compiled({ 'user': 'pebbles' });
     * // => 'hello pebbles!'
     *
     * // using custom template delimiters
     * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
     * var compiled = _.template('hello {{ user }}!');
     * compiled({ 'user': 'mustache' });
     * // => 'hello mustache!'
     *
     * // using backslashes to treat delimiters as plain text
     * var compiled = _.template('<%= "\\<%- value %\\>" %>');
     * compiled({ 'value': 'ignored' });
     * // => '<%- value %>'
     *
     * // using the `imports` option to import `jQuery` as `jq`
     * var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
     * var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
     * compiled({ 'users': ['fred', 'barney'] });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // using the `sourceURL` option to specify a custom sourceURL for the template
     * var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
     * compiled(data);
     * // => find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector
     *
     * // using the `variable` option to ensure a with-statement isn't used in the compiled template
     * var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
     * compiled.source;
     * // => function(data) {
     * //   var __t, __p = '';
     * //   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
     * //   return __p;
     * // }
     *
     * // using the `source` property to inline compiled templates for meaningful
     * // line numbers in error messages and a stack trace
     * fs.writeFileSync(path.join(cwd, 'jst.js'), '\
     *   var JST = {\
     *     "main": ' + _.template(mainText).source + '\
     *   };\
     * ');
     */
							function template(string, options, otherOptions) {
								// Based on John Resig's `tmpl` implementation (http://ejohn.org/blog/javascript-micro-templating/)
								// and Laura Doktorova's doT.js (https://github.com/olado/doT).
								var settings = lodash.templateSettings;

								if (
									otherOptions &&
									isIterateeCall(string, options, otherOptions)
								) {
									options = otherOptions = undefined;
								}
								string = baseToString(string);
								options = assignWith(
									baseAssign({}, otherOptions || options),
									settings,
									assignOwnDefaults
								);

								var imports = assignWith(
										baseAssign({}, options.imports),
										settings.imports,
										assignOwnDefaults
									),
									importsKeys = keys(imports),
									importsValues = baseValues(imports, importsKeys);

								var isEscaping,
									isEvaluating,
									index = 0,
									interpolate = options.interpolate || reNoMatch,
									source = "__p += '";

								// Compile the regexp to match each delimiter.
								var reDelimiters = RegExp(
									(options.escape || reNoMatch).source +
										'|' +
										interpolate.source +
										'|' +
										(interpolate === reInterpolate ? reEsTemplate : reNoMatch)
											.source +
										'|' +
										(options.evaluate || reNoMatch).source +
										'|$',
									'g'
								);

								// Use a sourceURL for easier debugging.
								var sourceURL =
									'//# sourceURL=' +
									('sourceURL' in options
										? options.sourceURL
										: 'lodash.templateSources[' + ++templateCounter + ']') +
									'\n';

								string.replace(reDelimiters, function(
									match,
									escapeValue,
									interpolateValue,
									esTemplateValue,
									evaluateValue,
									offset
								) {
									interpolateValue || (interpolateValue = esTemplateValue);

									// Escape characters that can't be included in string literals.
									source += string
										.slice(index, offset)
										.replace(reUnescapedString, escapeStringChar);

									// Replace delimiters with snippets.
									if (escapeValue) {
										isEscaping = true;
										source += "' +\n__e(" + escapeValue + ") +\n'";
									}
									if (evaluateValue) {
										isEvaluating = true;
										source += "';\n" + evaluateValue + ";\n__p += '";
									}
									if (interpolateValue) {
										source +=
											"' +\n((__t = (" +
											interpolateValue +
											")) == null ? '' : __t) +\n'";
									}
									index = offset + match.length;

									// The JS engine embedded in Adobe products requires returning the `match`
									// string in order to produce the correct `offset` value.
									return match;
								});

								source += "';\n";

								// If `variable` is not specified wrap a with-statement around the generated
								// code to add the data object to the top of the scope chain.
								var variable = options.variable;
								if (!variable) {
									source = 'with (obj) {\n' + source + '\n}\n';
								}
								// Cleanup code by stripping empty strings.
								source = (isEvaluating
									? source.replace(reEmptyStringLeading, '')
									: source)
									.replace(reEmptyStringMiddle, '$1')
									.replace(reEmptyStringTrailing, '$1;');

								// Frame code as the function body.
								source =
									'function(' +
									(variable || 'obj') +
									') {\n' +
									(variable ? '' : 'obj || (obj = {});\n') +
									"var __t, __p = ''" +
									(isEscaping ? ', __e = _.escape' : '') +
									(isEvaluating
										? ', __j = Array.prototype.join;\n' +
											"function print() { __p += __j.call(arguments, '') }\n"
										: ';\n') +
									source +
									'return __p\n}';

								var result = attempt(function() {
									return Function(
										importsKeys,
										sourceURL + 'return ' + source
									).apply(undefined, importsValues);
								});

								// Provide the compiled function's source by its `toString` method or
								// the `source` property as a convenience for inlining compiled templates.
								result.source = source;
								if (isError(result)) {
									throw result;
								}
								return result;
							}

							/**
     * Removes leading and trailing whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trim('  abc  ');
     * // => 'abc'
     *
     * _.trim('-_-abc-_-', '_-');
     * // => 'abc'
     *
     * _.map(['  foo  ', '  bar  '], _.trim);
     * // => ['foo', 'bar']
     */
							function trim(string, chars, guard) {
								var value = string;
								string = baseToString(string);
								if (!string) {
									return string;
								}
								if (
									guard ? isIterateeCall(value, chars, guard) : chars == null
								) {
									return string.slice(
										trimmedLeftIndex(string),
										trimmedRightIndex(string) + 1
									);
								}
								chars = chars + '';
								return string.slice(
									charsLeftIndex(string, chars),
									charsRightIndex(string, chars) + 1
								);
							}

							/**
     * Removes leading whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trimLeft('  abc  ');
     * // => 'abc  '
     *
     * _.trimLeft('-_-abc-_-', '_-');
     * // => 'abc-_-'
     */
							function trimLeft(string, chars, guard) {
								var value = string;
								string = baseToString(string);
								if (!string) {
									return string;
								}
								if (
									guard ? isIterateeCall(value, chars, guard) : chars == null
								) {
									return string.slice(trimmedLeftIndex(string));
								}
								return string.slice(charsLeftIndex(string, chars + ''));
							}

							/**
     * Removes trailing whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trimRight('  abc  ');
     * // => '  abc'
     *
     * _.trimRight('-_-abc-_-', '_-');
     * // => '-_-abc'
     */
							function trimRight(string, chars, guard) {
								var value = string;
								string = baseToString(string);
								if (!string) {
									return string;
								}
								if (
									guard ? isIterateeCall(value, chars, guard) : chars == null
								) {
									return string.slice(0, trimmedRightIndex(string) + 1);
								}
								return string.slice(0, charsRightIndex(string, chars + '') + 1);
							}

							/**
     * Truncates `string` if it's longer than the given maximum string length.
     * The last characters of the truncated string are replaced with the omission
     * string which defaults to "...".
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to truncate.
     * @param {Object|number} [options] The options object or maximum string length.
     * @param {number} [options.length=30] The maximum string length.
     * @param {string} [options.omission='...'] The string to indicate text is omitted.
     * @param {RegExp|string} [options.separator] The separator pattern to truncate to.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {string} Returns the truncated string.
     * @example
     *
     * _.trunc('hi-diddly-ho there, neighborino');
     * // => 'hi-diddly-ho there, neighbo...'
     *
     * _.trunc('hi-diddly-ho there, neighborino', 24);
     * // => 'hi-diddly-ho there, n...'
     *
     * _.trunc('hi-diddly-ho there, neighborino', {
     *   'length': 24,
     *   'separator': ' '
     * });
     * // => 'hi-diddly-ho there,...'
     *
     * _.trunc('hi-diddly-ho there, neighborino', {
     *   'length': 24,
     *   'separator': /,? +/
     * });
     * // => 'hi-diddly-ho there...'
     *
     * _.trunc('hi-diddly-ho there, neighborino', {
     *   'omission': ' [...]'
     * });
     * // => 'hi-diddly-ho there, neig [...]'
     */
							function trunc(string, options, guard) {
								if (guard && isIterateeCall(string, options, guard)) {
									options = undefined;
								}
								var length = DEFAULT_TRUNC_LENGTH,
									omission = DEFAULT_TRUNC_OMISSION;

								if (options != null) {
									if (isObject(options)) {
										var separator =
											'separator' in options ? options.separator : separator;
										length =
											'length' in options ? +options.length || 0 : length;
										omission =
											'omission' in options
												? baseToString(options.omission)
												: omission;
									} else {
										length = +options || 0;
									}
								}
								string = baseToString(string);
								if (length >= string.length) {
									return string;
								}
								var end = length - omission.length;
								if (end < 1) {
									return omission;
								}
								var result = string.slice(0, end);
								if (separator == null) {
									return result + omission;
								}
								if (isRegExp(separator)) {
									if (string.slice(end).search(separator)) {
										var match,
											newEnd,
											substring = string.slice(0, end);

										if (!separator.global) {
											separator = RegExp(
												separator.source,
												(reFlags.exec(separator) || '') + 'g'
											);
										}
										separator.lastIndex = 0;
										while ((match = separator.exec(substring))) {
											newEnd = match.index;
										}
										result = result.slice(0, newEnd == null ? end : newEnd);
									}
								} else if (string.indexOf(separator, end) != end) {
									var index = result.lastIndexOf(separator);
									if (index > -1) {
										result = result.slice(0, index);
									}
								}
								return result + omission;
							}

							/**
     * The inverse of `_.escape`; this method converts the HTML entities
     * `&amp;`, `&lt;`, `&gt;`, `&quot;`, `&#39;`, and `&#96;` in `string` to their
     * corresponding characters.
     *
     * **Note:** No other HTML entities are unescaped. To unescape additional HTML
     * entities use a third-party library like [_he_](https://mths.be/he).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to unescape.
     * @returns {string} Returns the unescaped string.
     * @example
     *
     * _.unescape('fred, barney, &amp; pebbles');
     * // => 'fred, barney, & pebbles'
     */
							function unescape(string) {
								string = baseToString(string);
								return string && reHasEscapedHtml.test(string)
									? string.replace(reEscapedHtml, unescapeHtmlChar)
									: string;
							}

							/**
     * Splits `string` into an array of its words.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to inspect.
     * @param {RegExp|string} [pattern] The pattern to match words.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Array} Returns the words of `string`.
     * @example
     *
     * _.words('fred, barney, & pebbles');
     * // => ['fred', 'barney', 'pebbles']
     *
     * _.words('fred, barney, & pebbles', /[^, ]+/g);
     * // => ['fred', 'barney', '&', 'pebbles']
     */
							function words(string, pattern, guard) {
								if (guard && isIterateeCall(string, pattern, guard)) {
									pattern = undefined;
								}
								string = baseToString(string);
								return string.match(pattern || reWords) || [];
							}

							/*------------------------------------------------------------------------*/

							/**
     * Attempts to invoke `func`, returning either the result or the caught error
     * object. Any additional arguments are provided to `func` when it is invoked.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Function} func The function to attempt.
     * @returns {*} Returns the `func` result or error object.
     * @example
     *
     * // avoid throwing errors for invalid selectors
     * var elements = _.attempt(function(selector) {
     *   return document.querySelectorAll(selector);
     * }, '>_>');
     *
     * if (_.isError(elements)) {
     *   elements = [];
     * }
     */
							var attempt = restParam(function(func, args) {
								try {
									return func.apply(undefined, args);
								} catch (e) {
									return isError(e) ? e : new Error(e);
								}
							});

							/**
     * Creates a function that invokes `func` with the `this` binding of `thisArg`
     * and arguments of the created function. If `func` is a property name the
     * created callback returns the property value for a given element. If `func`
     * is an object the created callback returns `true` for elements that contain
     * the equivalent object properties, otherwise it returns `false`.
     *
     * @static
     * @memberOf _
     * @alias iteratee
     * @category Utility
     * @param {*} [func=_.identity] The value to convert to a callback.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Function} Returns the callback.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 }
     * ];
     *
     * // wrap to create custom callback shorthands
     * _.callback = _.wrap(_.callback, function(callback, func, thisArg) {
     *   var match = /^(.+?)__([gl]t)(.+)$/.exec(func);
     *   if (!match) {
     *     return callback(func, thisArg);
     *   }
     *   return function(object) {
     *     return match[2] == 'gt'
     *       ? object[match[1]] > match[3]
     *       : object[match[1]] < match[3];
     *   };
     * });
     *
     * _.filter(users, 'age__gt36');
     * // => [{ 'user': 'fred', 'age': 40 }]
     */
							function callback(func, thisArg, guard) {
								if (guard && isIterateeCall(func, thisArg, guard)) {
									thisArg = undefined;
								}
								return isObjectLike(func)
									? matches(func)
									: baseCallback(func, thisArg);
							}

							/**
     * Creates a function that returns `value`.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {*} value The value to return from the new function.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var object = { 'user': 'fred' };
     * var getter = _.constant(object);
     *
     * getter() === object;
     * // => true
     */
							function constant(value) {
								return function() {
									return value;
								};
							}

							/**
     * This method returns the first argument provided to it.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {*} value Any value.
     * @returns {*} Returns `value`.
     * @example
     *
     * var object = { 'user': 'fred' };
     *
     * _.identity(object) === object;
     * // => true
     */
							function identity(value) {
								return value;
							}

							/**
     * Creates a function that performs a deep comparison between a given object
     * and `source`, returning `true` if the given object has equivalent property
     * values, else `false`.
     *
     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
     * numbers, `Object` objects, regexes, and strings. Objects are compared by
     * their own, not inherited, enumerable properties. For comparing a single
     * own or inherited property value see `_.matchesProperty`.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Object} source The object of property values to match.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': true },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * _.filter(users, _.matches({ 'age': 40, 'active': false }));
     * // => [{ 'user': 'fred', 'age': 40, 'active': false }]
     */
							function matches(source) {
								return baseMatches(baseClone(source, true));
							}

							/**
     * Creates a function that compares the property value of `path` on a given
     * object to `value`.
     *
     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
     * numbers, `Object` objects, regexes, and strings. Objects are compared by
     * their own, not inherited, enumerable properties.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Array|string} path The path of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var users = [
     *   { 'user': 'barney' },
     *   { 'user': 'fred' }
     * ];
     *
     * _.find(users, _.matchesProperty('user', 'fred'));
     * // => { 'user': 'fred' }
     */
							function matchesProperty(path, srcValue) {
								return baseMatchesProperty(path, baseClone(srcValue, true));
							}

							/**
     * Creates a function that invokes the method at `path` on a given object.
     * Any additional arguments are provided to the invoked method.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Array|string} path The path of the method to invoke.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var objects = [
     *   { 'a': { 'b': { 'c': _.constant(2) } } },
     *   { 'a': { 'b': { 'c': _.constant(1) } } }
     * ];
     *
     * _.map(objects, _.method('a.b.c'));
     * // => [2, 1]
     *
     * _.invoke(_.sortBy(objects, _.method(['a', 'b', 'c'])), 'a.b.c');
     * // => [1, 2]
     */
							var method = restParam(function(path, args) {
								return function(object) {
									return invokePath(object, path, args);
								};
							});

							/**
     * The opposite of `_.method`; this method creates a function that invokes
     * the method at a given path on `object`. Any additional arguments are
     * provided to the invoked method.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Object} object The object to query.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var array = _.times(3, _.constant),
     *     object = { 'a': array, 'b': array, 'c': array };
     *
     * _.map(['a[2]', 'c[0]'], _.methodOf(object));
     * // => [2, 0]
     *
     * _.map([['a', '2'], ['c', '0']], _.methodOf(object));
     * // => [2, 0]
     */
							var methodOf = restParam(function(object, args) {
								return function(path) {
									return invokePath(object, path, args);
								};
							});

							/**
     * Adds all own enumerable function properties of a source object to the
     * destination object. If `object` is a function then methods are added to
     * its prototype as well.
     *
     * **Note:** Use `_.runInContext` to create a pristine `lodash` function to
     * avoid conflicts caused by modifying the original.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Function|Object} [object=lodash] The destination object.
     * @param {Object} source The object of functions to add.
     * @param {Object} [options] The options object.
     * @param {boolean} [options.chain=true] Specify whether the functions added
     *  are chainable.
     * @returns {Function|Object} Returns `object`.
     * @example
     *
     * function vowels(string) {
     *   return _.filter(string, function(v) {
     *     return /[aeiou]/i.test(v);
     *   });
     * }
     *
     * _.mixin({ 'vowels': vowels });
     * _.vowels('fred');
     * // => ['e']
     *
     * _('fred').vowels().value();
     * // => ['e']
     *
     * _.mixin({ 'vowels': vowels }, { 'chain': false });
     * _('fred').vowels();
     * // => ['e']
     */
							function mixin(object, source, options) {
								if (options == null) {
									var isObj = isObject(source),
										props = isObj ? keys(source) : undefined,
										methodNames =
											props && props.length
												? baseFunctions(source, props)
												: undefined;

									if (!(methodNames ? methodNames.length : isObj)) {
										methodNames = false;
										options = source;
										source = object;
										object = this;
									}
								}
								if (!methodNames) {
									methodNames = baseFunctions(source, keys(source));
								}
								var chain = true,
									index = -1,
									isFunc = isFunction(object),
									length = methodNames.length;

								if (options === false) {
									chain = false;
								} else if (isObject(options) && 'chain' in options) {
									chain = options.chain;
								}
								while (++index < length) {
									var methodName = methodNames[index],
										func = source[methodName];

									object[methodName] = func;
									if (isFunc) {
										object.prototype[methodName] = (function(func) {
											return function() {
												var chainAll = this.__chain__;
												if (chain || chainAll) {
													var result = object(this.__wrapped__),
														actions = (result.__actions__ = arrayCopy(
															this.__actions__
														));

													actions.push({
														func: func,
														args: arguments,
														thisArg: object
													});
													result.__chain__ = chainAll;
													return result;
												}
												return func.apply(
													object,
													arrayPush([this.value()], arguments)
												);
											};
										})(func);
									}
								}
								return object;
							}

							/**
     * Reverts the `_` variable to its previous value and returns a reference to
     * the `lodash` function.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @returns {Function} Returns the `lodash` function.
     * @example
     *
     * var lodash = _.noConflict();
     */
							function noConflict() {
								root._ = oldDash;
								return this;
							}

							/**
     * A no-operation function that returns `undefined` regardless of the
     * arguments it receives.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @example
     *
     * var object = { 'user': 'fred' };
     *
     * _.noop(object) === undefined;
     * // => true
     */
							function noop() {
								// No operation performed.
							}

							/**
     * Creates a function that returns the property value at `path` on a
     * given object.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var objects = [
     *   { 'a': { 'b': { 'c': 2 } } },
     *   { 'a': { 'b': { 'c': 1 } } }
     * ];
     *
     * _.map(objects, _.property('a.b.c'));
     * // => [2, 1]
     *
     * _.pluck(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
     * // => [1, 2]
     */
							function property(path) {
								return isKey(path)
									? baseProperty(path)
									: basePropertyDeep(path);
							}

							/**
     * The opposite of `_.property`; this method creates a function that returns
     * the property value at a given path on `object`.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Object} object The object to query.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var array = [0, 1, 2],
     *     object = { 'a': array, 'b': array, 'c': array };
     *
     * _.map(['a[2]', 'c[0]'], _.propertyOf(object));
     * // => [2, 0]
     *
     * _.map([['a', '2'], ['c', '0']], _.propertyOf(object));
     * // => [2, 0]
     */
							function propertyOf(object) {
								return function(path) {
									return baseGet(object, toPath(path), path + '');
								};
							}

							/**
     * Creates an array of numbers (positive and/or negative) progressing from
     * `start` up to, but not including, `end`. If `end` is not specified it is
     * set to `start` with `start` then set to `0`. If `end` is less than `start`
     * a zero-length range is created unless a negative `step` is specified.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @param {number} [step=1] The value to increment or decrement by.
     * @returns {Array} Returns the new array of numbers.
     * @example
     *
     * _.range(4);
     * // => [0, 1, 2, 3]
     *
     * _.range(1, 5);
     * // => [1, 2, 3, 4]
     *
     * _.range(0, 20, 5);
     * // => [0, 5, 10, 15]
     *
     * _.range(0, -4, -1);
     * // => [0, -1, -2, -3]
     *
     * _.range(1, 4, 0);
     * // => [1, 1, 1]
     *
     * _.range(0);
     * // => []
     */
							function range(start, end, step) {
								if (step && isIterateeCall(start, end, step)) {
									end = step = undefined;
								}
								start = +start || 0;
								step = step == null ? 1 : +step || 0;

								if (end == null) {
									end = start;
									start = 0;
								} else {
									end = +end || 0;
								}
								// Use `Array(length)` so engines like Chakra and V8 avoid slower modes.
								// See https://youtu.be/XAqIpGU8ZZk#t=17m25s for more details.
								var index = -1,
									length = nativeMax(
										nativeCeil((end - start) / (step || 1)),
										0
									),
									result = Array(length);

								while (++index < length) {
									result[index] = start;
									start += step;
								}
								return result;
							}

							/**
     * Invokes the iteratee function `n` times, returning an array of the results
     * of each invocation. The `iteratee` is bound to `thisArg` and invoked with
     * one argument; (index).
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {number} n The number of times to invoke `iteratee`.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array} Returns the array of results.
     * @example
     *
     * var diceRolls = _.times(3, _.partial(_.random, 1, 6, false));
     * // => [3, 6, 4]
     *
     * _.times(3, function(n) {
     *   mage.castSpell(n);
     * });
     * // => invokes `mage.castSpell(n)` three times with `n` of `0`, `1`, and `2`
     *
     * _.times(3, function(n) {
     *   this.cast(n);
     * }, mage);
     * // => also invokes `mage.castSpell(n)` three times
     */
							function times(n, iteratee, thisArg) {
								n = nativeFloor(n);

								// Exit early to avoid a JSC JIT bug in Safari 8
								// where `Array(0)` is treated as `Array(1)`.
								if (n < 1 || !nativeIsFinite(n)) {
									return [];
								}
								var index = -1,
									result = Array(nativeMin(n, MAX_ARRAY_LENGTH));

								iteratee = bindCallback(iteratee, thisArg, 1);
								while (++index < n) {
									if (index < MAX_ARRAY_LENGTH) {
										result[index] = iteratee(index);
									} else {
										iteratee(index);
									}
								}
								return result;
							}

							/**
     * Generates a unique ID. If `prefix` is provided the ID is appended to it.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {string} [prefix] The value to prefix the ID with.
     * @returns {string} Returns the unique ID.
     * @example
     *
     * _.uniqueId('contact_');
     * // => 'contact_104'
     *
     * _.uniqueId();
     * // => '105'
     */
							function uniqueId(prefix) {
								var id = ++idCounter;
								return baseToString(prefix) + id;
							}

							/*------------------------------------------------------------------------*/

							/**
     * Adds two numbers.
     *
     * @static
     * @memberOf _
     * @category Math
     * @param {number} augend The first number to add.
     * @param {number} addend The second number to add.
     * @returns {number} Returns the sum.
     * @example
     *
     * _.add(6, 4);
     * // => 10
     */
							function add(augend, addend) {
								return (+augend || 0) + (+addend || 0);
							}

							/**
     * Calculates `n` rounded up to `precision`.
     *
     * @static
     * @memberOf _
     * @category Math
     * @param {number} n The number to round up.
     * @param {number} [precision=0] The precision to round up to.
     * @returns {number} Returns the rounded up number.
     * @example
     *
     * _.ceil(4.006);
     * // => 5
     *
     * _.ceil(6.004, 2);
     * // => 6.01
     *
     * _.ceil(6040, -2);
     * // => 6100
     */
							var ceil = createRound('ceil');

							/**
     * Calculates `n` rounded down to `precision`.
     *
     * @static
     * @memberOf _
     * @category Math
     * @param {number} n The number to round down.
     * @param {number} [precision=0] The precision to round down to.
     * @returns {number} Returns the rounded down number.
     * @example
     *
     * _.floor(4.006);
     * // => 4
     *
     * _.floor(0.046, 2);
     * // => 0.04
     *
     * _.floor(4060, -2);
     * // => 4000
     */
							var floor = createRound('floor');

							/**
     * Gets the maximum value of `collection`. If `collection` is empty or falsey
     * `-Infinity` is returned. If an iteratee function is provided it is invoked
     * for each value in `collection` to generate the criterion by which the value
     * is ranked. The `iteratee` is bound to `thisArg` and invoked with three
     * arguments: (value, index, collection).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Math
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {*} Returns the maximum value.
     * @example
     *
     * _.max([4, 2, 8, 6]);
     * // => 8
     *
     * _.max([]);
     * // => -Infinity
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 }
     * ];
     *
     * _.max(users, function(chr) {
     *   return chr.age;
     * });
     * // => { 'user': 'fred', 'age': 40 }
     *
     * // using the `_.property` callback shorthand
     * _.max(users, 'age');
     * // => { 'user': 'fred', 'age': 40 }
     */
							var max = createExtremum(gt, NEGATIVE_INFINITY);

							/**
     * Gets the minimum value of `collection`. If `collection` is empty or falsey
     * `Infinity` is returned. If an iteratee function is provided it is invoked
     * for each value in `collection` to generate the criterion by which the value
     * is ranked. The `iteratee` is bound to `thisArg` and invoked with three
     * arguments: (value, index, collection).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Math
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {*} Returns the minimum value.
     * @example
     *
     * _.min([4, 2, 8, 6]);
     * // => 2
     *
     * _.min([]);
     * // => Infinity
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 }
     * ];
     *
     * _.min(users, function(chr) {
     *   return chr.age;
     * });
     * // => { 'user': 'barney', 'age': 36 }
     *
     * // using the `_.property` callback shorthand
     * _.min(users, 'age');
     * // => { 'user': 'barney', 'age': 36 }
     */
							var min = createExtremum(lt, POSITIVE_INFINITY);

							/**
     * Calculates `n` rounded to `precision`.
     *
     * @static
     * @memberOf _
     * @category Math
     * @param {number} n The number to round.
     * @param {number} [precision=0] The precision to round to.
     * @returns {number} Returns the rounded number.
     * @example
     *
     * _.round(4.006);
     * // => 4
     *
     * _.round(4.006, 2);
     * // => 4.01
     *
     * _.round(4060, -2);
     * // => 4100
     */
							var round = createRound('round');

							/**
     * Gets the sum of the values in `collection`.
     *
     * @static
     * @memberOf _
     * @category Math
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {number} Returns the sum.
     * @example
     *
     * _.sum([4, 6]);
     * // => 10
     *
     * _.sum({ 'a': 4, 'b': 6 });
     * // => 10
     *
     * var objects = [
     *   { 'n': 4 },
     *   { 'n': 6 }
     * ];
     *
     * _.sum(objects, function(object) {
     *   return object.n;
     * });
     * // => 10
     *
     * // using the `_.property` callback shorthand
     * _.sum(objects, 'n');
     * // => 10
     */
							function sum(collection, iteratee, thisArg) {
								if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
									iteratee = undefined;
								}
								iteratee = getCallback(iteratee, thisArg, 3);
								return iteratee.length == 1
									? arraySum(
											isArray(collection) ? collection : toIterable(collection),
											iteratee
										)
									: baseSum(collection, iteratee);
							}

							/*------------------------------------------------------------------------*/

							// Ensure wrappers are instances of `baseLodash`.
							lodash.prototype = baseLodash.prototype;

							LodashWrapper.prototype = baseCreate(baseLodash.prototype);
							LodashWrapper.prototype.constructor = LodashWrapper;

							LazyWrapper.prototype = baseCreate(baseLodash.prototype);
							LazyWrapper.prototype.constructor = LazyWrapper;

							// Add functions to the `Map` cache.
							MapCache.prototype['delete'] = mapDelete;
							MapCache.prototype.get = mapGet;
							MapCache.prototype.has = mapHas;
							MapCache.prototype.set = mapSet;

							// Add functions to the `Set` cache.
							SetCache.prototype.push = cachePush;

							// Assign cache to `_.memoize`.
							memoize.Cache = MapCache;

							// Add functions that return wrapped values when chaining.
							lodash.after = after;
							lodash.ary = ary;
							lodash.assign = assign;
							lodash.at = at;
							lodash.before = before;
							lodash.bind = bind;
							lodash.bindAll = bindAll;
							lodash.bindKey = bindKey;
							lodash.callback = callback;
							lodash.chain = chain;
							lodash.chunk = chunk;
							lodash.compact = compact;
							lodash.constant = constant;
							lodash.countBy = countBy;
							lodash.create = create;
							lodash.curry = curry;
							lodash.curryRight = curryRight;
							lodash.debounce = debounce;
							lodash.defaults = defaults;
							lodash.defaultsDeep = defaultsDeep;
							lodash.defer = defer;
							lodash.delay = delay;
							lodash.difference = difference;
							lodash.drop = drop;
							lodash.dropRight = dropRight;
							lodash.dropRightWhile = dropRightWhile;
							lodash.dropWhile = dropWhile;
							lodash.fill = fill;
							lodash.filter = filter;
							lodash.flatten = flatten;
							lodash.flattenDeep = flattenDeep;
							lodash.flow = flow;
							lodash.flowRight = flowRight;
							lodash.forEach = forEach;
							lodash.forEachRight = forEachRight;
							lodash.forIn = forIn;
							lodash.forInRight = forInRight;
							lodash.forOwn = forOwn;
							lodash.forOwnRight = forOwnRight;
							lodash.functions = functions;
							lodash.groupBy = groupBy;
							lodash.indexBy = indexBy;
							lodash.initial = initial;
							lodash.intersection = intersection;
							lodash.invert = invert;
							lodash.invoke = invoke;
							lodash.keys = keys;
							lodash.keysIn = keysIn;
							lodash.map = map;
							lodash.mapKeys = mapKeys;
							lodash.mapValues = mapValues;
							lodash.matches = matches;
							lodash.matchesProperty = matchesProperty;
							lodash.memoize = memoize;
							lodash.merge = merge;
							lodash.method = method;
							lodash.methodOf = methodOf;
							lodash.mixin = mixin;
							lodash.modArgs = modArgs;
							lodash.negate = negate;
							lodash.omit = omit;
							lodash.once = once;
							lodash.pairs = pairs;
							lodash.partial = partial;
							lodash.partialRight = partialRight;
							lodash.partition = partition;
							lodash.pick = pick;
							lodash.pluck = pluck;
							lodash.property = property;
							lodash.propertyOf = propertyOf;
							lodash.pull = pull;
							lodash.pullAt = pullAt;
							lodash.range = range;
							lodash.rearg = rearg;
							lodash.reject = reject;
							lodash.remove = remove;
							lodash.rest = rest;
							lodash.restParam = restParam;
							lodash.set = set;
							lodash.shuffle = shuffle;
							lodash.slice = slice;
							lodash.sortBy = sortBy;
							lodash.sortByAll = sortByAll;
							lodash.sortByOrder = sortByOrder;
							lodash.spread = spread;
							lodash.take = take;
							lodash.takeRight = takeRight;
							lodash.takeRightWhile = takeRightWhile;
							lodash.takeWhile = takeWhile;
							lodash.tap = tap;
							lodash.throttle = throttle;
							lodash.thru = thru;
							lodash.times = times;
							lodash.toArray = toArray;
							lodash.toPlainObject = toPlainObject;
							lodash.transform = transform;
							lodash.union = union;
							lodash.uniq = uniq;
							lodash.unzip = unzip;
							lodash.unzipWith = unzipWith;
							lodash.values = values;
							lodash.valuesIn = valuesIn;
							lodash.where = where;
							lodash.without = without;
							lodash.wrap = wrap;
							lodash.xor = xor;
							lodash.zip = zip;
							lodash.zipObject = zipObject;
							lodash.zipWith = zipWith;

							// Add aliases.
							lodash.backflow = flowRight;
							lodash.collect = map;
							lodash.compose = flowRight;
							lodash.each = forEach;
							lodash.eachRight = forEachRight;
							lodash.extend = assign;
							lodash.iteratee = callback;
							lodash.methods = functions;
							lodash.object = zipObject;
							lodash.select = filter;
							lodash.tail = rest;
							lodash.unique = uniq;

							// Add functions to `lodash.prototype`.
							mixin(lodash, lodash);

							/*------------------------------------------------------------------------*/

							// Add functions that return unwrapped values when chaining.
							lodash.add = add;
							lodash.attempt = attempt;
							lodash.camelCase = camelCase;
							lodash.capitalize = capitalize;
							lodash.ceil = ceil;
							lodash.clone = clone;
							lodash.cloneDeep = cloneDeep;
							lodash.deburr = deburr;
							lodash.endsWith = endsWith;
							lodash.escape = escape;
							lodash.escapeRegExp = escapeRegExp;
							lodash.every = every;
							lodash.find = find;
							lodash.findIndex = findIndex;
							lodash.findKey = findKey;
							lodash.findLast = findLast;
							lodash.findLastIndex = findLastIndex;
							lodash.findLastKey = findLastKey;
							lodash.findWhere = findWhere;
							lodash.first = first;
							lodash.floor = floor;
							lodash.get = get;
							lodash.gt = gt;
							lodash.gte = gte;
							lodash.has = has;
							lodash.identity = identity;
							lodash.includes = includes;
							lodash.indexOf = indexOf;
							lodash.inRange = inRange;
							lodash.isArguments = isArguments;
							lodash.isArray = isArray;
							lodash.isBoolean = isBoolean;
							lodash.isDate = isDate;
							lodash.isElement = isElement;
							lodash.isEmpty = isEmpty;
							lodash.isEqual = isEqual;
							lodash.isError = isError;
							lodash.isFinite = isFinite;
							lodash.isFunction = isFunction;
							lodash.isMatch = isMatch;
							lodash.isNaN = isNaN;
							lodash.isNative = isNative;
							lodash.isNull = isNull;
							lodash.isNumber = isNumber;
							lodash.isObject = isObject;
							lodash.isPlainObject = isPlainObject;
							lodash.isRegExp = isRegExp;
							lodash.isString = isString;
							lodash.isTypedArray = isTypedArray;
							lodash.isUndefined = isUndefined;
							lodash.kebabCase = kebabCase;
							lodash.last = last;
							lodash.lastIndexOf = lastIndexOf;
							lodash.lt = lt;
							lodash.lte = lte;
							lodash.max = max;
							lodash.min = min;
							lodash.noConflict = noConflict;
							lodash.noop = noop;
							lodash.now = now;
							lodash.pad = pad;
							lodash.padLeft = padLeft;
							lodash.padRight = padRight;
							lodash.parseInt = parseInt;
							lodash.random = random;
							lodash.reduce = reduce;
							lodash.reduceRight = reduceRight;
							lodash.repeat = repeat;
							lodash.result = result;
							lodash.round = round;
							lodash.runInContext = runInContext;
							lodash.size = size;
							lodash.snakeCase = snakeCase;
							lodash.some = some;
							lodash.sortedIndex = sortedIndex;
							lodash.sortedLastIndex = sortedLastIndex;
							lodash.startCase = startCase;
							lodash.startsWith = startsWith;
							lodash.sum = sum;
							lodash.template = template;
							lodash.trim = trim;
							lodash.trimLeft = trimLeft;
							lodash.trimRight = trimRight;
							lodash.trunc = trunc;
							lodash.unescape = unescape;
							lodash.uniqueId = uniqueId;
							lodash.words = words;

							// Add aliases.
							lodash.all = every;
							lodash.any = some;
							lodash.contains = includes;
							lodash.eq = isEqual;
							lodash.detect = find;
							lodash.foldl = reduce;
							lodash.foldr = reduceRight;
							lodash.head = first;
							lodash.include = includes;
							lodash.inject = reduce;

							mixin(
								lodash,
								(function() {
									var source = {};
									baseForOwn(lodash, function(func, methodName) {
										if (!lodash.prototype[methodName]) {
											source[methodName] = func;
										}
									});
									return source;
								})(),
								false
							);

							/*------------------------------------------------------------------------*/

							// Add functions capable of returning wrapped and unwrapped values when chaining.
							lodash.sample = sample;

							lodash.prototype.sample = function(n) {
								if (!this.__chain__ && n == null) {
									return sample(this.value());
								}
								return this.thru(function(value) {
									return sample(value, n);
								});
							};

							/*------------------------------------------------------------------------*/

							/**
     * The semantic version number.
     *
     * @static
     * @memberOf _
     * @type string
     */
							lodash.VERSION = VERSION;

							// Assign default placeholders.
							arrayEach(
								[
									'bind',
									'bindKey',
									'curry',
									'curryRight',
									'partial',
									'partialRight'
								],
								function(methodName) {
									lodash[methodName].placeholder = lodash;
								}
							);

							// Add `LazyWrapper` methods for `_.drop` and `_.take` variants.
							arrayEach(['drop', 'take'], function(methodName, index) {
								LazyWrapper.prototype[methodName] = function(n) {
									var filtered = this.__filtered__;
									if (filtered && !index) {
										return new LazyWrapper(this);
									}
									n = n == null ? 1 : nativeMax(nativeFloor(n) || 0, 0);

									var result = this.clone();
									if (filtered) {
										result.__takeCount__ = nativeMin(result.__takeCount__, n);
									} else {
										result.__views__.push({
											size: n,
											type: methodName + (result.__dir__ < 0 ? 'Right' : '')
										});
									}
									return result;
								};

								LazyWrapper.prototype[methodName + 'Right'] = function(n) {
									return this.reverse()[methodName](n).reverse();
								};
							});

							// Add `LazyWrapper` methods that accept an `iteratee` value.
							arrayEach(['filter', 'map', 'takeWhile'], function(
								methodName,
								index
							) {
								var type = index + 1,
									isFilter = type != LAZY_MAP_FLAG;

								LazyWrapper.prototype[methodName] = function(
									iteratee,
									thisArg
								) {
									var result = this.clone();
									result.__iteratees__.push({
										iteratee: getCallback(iteratee, thisArg, 1),
										type: type
									});
									result.__filtered__ = result.__filtered__ || isFilter;
									return result;
								};
							});

							// Add `LazyWrapper` methods for `_.first` and `_.last`.
							arrayEach(['first', 'last'], function(methodName, index) {
								var takeName = 'take' + (index ? 'Right' : '');

								LazyWrapper.prototype[methodName] = function() {
									return this[takeName](1).value()[0];
								};
							});

							// Add `LazyWrapper` methods for `_.initial` and `_.rest`.
							arrayEach(['initial', 'rest'], function(methodName, index) {
								var dropName = 'drop' + (index ? '' : 'Right');

								LazyWrapper.prototype[methodName] = function() {
									return this.__filtered__
										? new LazyWrapper(this)
										: this[dropName](1);
								};
							});

							// Add `LazyWrapper` methods for `_.pluck` and `_.where`.
							arrayEach(['pluck', 'where'], function(methodName, index) {
								var operationName = index ? 'filter' : 'map',
									createCallback = index ? baseMatches : property;

								LazyWrapper.prototype[methodName] = function(value) {
									return this[operationName](createCallback(value));
								};
							});

							LazyWrapper.prototype.compact = function() {
								return this.filter(identity);
							};

							LazyWrapper.prototype.reject = function(predicate, thisArg) {
								predicate = getCallback(predicate, thisArg, 1);
								return this.filter(function(value) {
									return !predicate(value);
								});
							};

							LazyWrapper.prototype.slice = function(start, end) {
								start = start == null ? 0 : +start || 0;

								var result = this;
								if (result.__filtered__ && (start > 0 || end < 0)) {
									return new LazyWrapper(result);
								}
								if (start < 0) {
									result = result.takeRight(-start);
								} else if (start) {
									result = result.drop(start);
								}
								if (end !== undefined) {
									end = +end || 0;
									result =
										end < 0 ? result.dropRight(-end) : result.take(end - start);
								}
								return result;
							};

							LazyWrapper.prototype.takeRightWhile = function(
								predicate,
								thisArg
							) {
								return this.reverse().takeWhile(predicate, thisArg).reverse();
							};

							LazyWrapper.prototype.toArray = function() {
								return this.take(POSITIVE_INFINITY);
							};

							// Add `LazyWrapper` methods to `lodash.prototype`.
							baseForOwn(LazyWrapper.prototype, function(func, methodName) {
								var checkIteratee = /^(?:filter|map|reject)|While$/.test(
										methodName
									),
									retUnwrapped = /^(?:first|last)$/.test(methodName),
									lodashFunc =
										lodash[
											retUnwrapped
												? 'take' + (methodName == 'last' ? 'Right' : '')
												: methodName
										];

								if (!lodashFunc) {
									return;
								}
								lodash.prototype[methodName] = function() {
									var args = retUnwrapped ? [1] : arguments,
										chainAll = this.__chain__,
										value = this.__wrapped__,
										isHybrid = !!this.__actions__.length,
										isLazy = value instanceof LazyWrapper,
										iteratee = args[0],
										useLazy = isLazy || isArray(value);

									if (
										useLazy &&
										checkIteratee &&
										typeof iteratee == 'function' &&
										iteratee.length != 1
									) {
										// Avoid lazy use if the iteratee has a "length" value other than `1`.
										isLazy = useLazy = false;
									}
									var interceptor = function(value) {
										return retUnwrapped && chainAll
											? lodashFunc(value, 1)[0]
											: lodashFunc.apply(undefined, arrayPush([value], args));
									};

									var action = {
											func: thru,
											args: [interceptor],
											thisArg: undefined
										},
										onlyLazy = isLazy && !isHybrid;

									if (retUnwrapped && !chainAll) {
										if (onlyLazy) {
											value = value.clone();
											value.__actions__.push(action);
											return func.call(value);
										}
										return lodashFunc.call(undefined, this.value())[0];
									}
									if (!retUnwrapped && useLazy) {
										value = onlyLazy ? value : new LazyWrapper(this);
										var result = func.apply(value, args);
										result.__actions__.push(action);
										return new LodashWrapper(result, chainAll);
									}
									return this.thru(interceptor);
								};
							});

							// Add `Array` and `String` methods to `lodash.prototype`.
							arrayEach(
								[
									'join',
									'pop',
									'push',
									'replace',
									'shift',
									'sort',
									'splice',
									'split',
									'unshift'
								],
								function(methodName) {
									var func = (/^(?:replace|split)$/.test(methodName)
											? stringProto
											: arrayProto)[methodName],
										chainName = /^(?:push|sort|unshift)$/.test(methodName)
											? 'tap'
											: 'thru',
										retUnwrapped = /^(?:join|pop|replace|shift)$/.test(
											methodName
										);

									lodash.prototype[methodName] = function() {
										var args = arguments;
										if (retUnwrapped && !this.__chain__) {
											return func.apply(this.value(), args);
										}
										return this[chainName](function(value) {
											return func.apply(value, args);
										});
									};
								}
							);

							// Map minified function names to their real names.
							baseForOwn(LazyWrapper.prototype, function(func, methodName) {
								var lodashFunc = lodash[methodName];
								if (lodashFunc) {
									var key = lodashFunc.name,
										names = realNames[key] || (realNames[key] = []);

									names.push({ name: methodName, func: lodashFunc });
								}
							});

							realNames[createHybridWrapper(undefined, BIND_KEY_FLAG).name] = [
								{ name: 'wrapper', func: undefined }
							];

							// Add functions to the lazy wrapper.
							LazyWrapper.prototype.clone = lazyClone;
							LazyWrapper.prototype.reverse = lazyReverse;
							LazyWrapper.prototype.value = lazyValue;

							// Add chaining functions to the `lodash` wrapper.
							lodash.prototype.chain = wrapperChain;
							lodash.prototype.commit = wrapperCommit;
							lodash.prototype.concat = wrapperConcat;
							lodash.prototype.plant = wrapperPlant;
							lodash.prototype.reverse = wrapperReverse;
							lodash.prototype.toString = wrapperToString;
							lodash.prototype.run = lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;

							// Add function aliases to the `lodash` wrapper.
							lodash.prototype.collect = lodash.prototype.map;
							lodash.prototype.head = lodash.prototype.first;
							lodash.prototype.select = lodash.prototype.filter;
							lodash.prototype.tail = lodash.prototype.rest;

							return lodash;
						}

						/*--------------------------------------------------------------------------*/

						// Export lodash.
						var _ = runInContext();

						// Some AMD build optimizers like r.js check for condition patterns like the following:
						if (
							typeof define == 'function' &&
							typeof define.amd == 'object' &&
							define.amd
						) {
							// Expose lodash to the global object when an AMD loader is present to avoid
							// errors in cases where lodash is loaded by a script tag and not intended
							// as an AMD module. See http://requirejs.org/docs/errors.html#mismatch for
							// more details.
							root._ = _;

							// Define as an anonymous module so, through path mapping, it can be
							// referenced as the "underscore" module.
							define(function() {
								return _;
							});
						} else if (freeExports && freeModule) {
							// Check for `exports` after `define` in case a build optimizer adds an `exports` object.
							// Export for Node.js or RingoJS.
							if (moduleExports) {
								(freeModule.exports = _)._ = _;
							} else {
								// Export for Rhino with CommonJS support.
								freeExports._ = _;
							}
						} else {
							// Export for a browser or Rhino.
							root._ = _;
						}
					}.call(this));
				}.call(
					this,
					typeof global !== 'undefined'
						? global
						: typeof self !== 'undefined'
							? self
							: typeof window !== 'undefined' ? window : {}
				));
			},
			{}
		],
		2: [
			function(require, module, exports) {
				'use strict';
				var propIsEnumerable = Object.prototype.propertyIsEnumerable;

				function ToObject(val) {
					if (val == null) {
						throw new TypeError(
							'Object.assign cannot be called with null or undefined'
						);
					}

					return Object(val);
				}

				function ownEnumerableKeys(obj) {
					var keys = Object.getOwnPropertyNames(obj);

					if (Object.getOwnPropertySymbols) {
						keys = keys.concat(Object.getOwnPropertySymbols(obj));
					}

					return keys.filter(function(key) {
						return propIsEnumerable.call(obj, key);
					});
				}

				module.exports =
					Object.assign ||
					function(target, source) {
						var from;
						var keys;
						var to = ToObject(target);

						for (var s = 1; s < arguments.length; s++) {
							from = arguments[s];
							keys = ownEnumerableKeys(Object(from));

							for (var i = 0; i < keys.length; i++) {
								to[keys[i]] = from[keys[i]];
							}
						}

						return to;
					};
			},
			{}
		],
		3: [
			function(require, module, exports) {
				/***** xregexp.js *****/

				/*!
 * XRegExp v2.0.0
 * (c) 2007-2012 Steven Levithan <http://xregexp.com/>
 * MIT License
 */

				/**
 * XRegExp provides augmented, extensible JavaScript regular expressions. You get new syntax,
 * flags, and methods beyond what browsers support natively. XRegExp is also a regex utility belt
 * with tools to make your client-side grepping simpler and more powerful, while freeing you from
 * worrying about pesky cross-browser inconsistencies and the dubious `lastIndex` property. See
 * XRegExp's documentation (http://xregexp.com/) for more details.
 * @module xregexp
 * @requires N/A
 */
				var XRegExp;

				// Avoid running twice; that would reset tokens and could break references to native globals
				XRegExp =
					XRegExp ||
					(function(undef) {
						'use strict';

						/*--------------------------------------
 *  Private variables
 *------------------------------------*/

						var self,
							addToken,
							add,
							// Optional features; can be installed and uninstalled
							features = {
								natives: false,
								extensibility: false
							},
							// Store native methods to use and restore ("native" is an ES3 reserved keyword)
							nativ = {
								exec: RegExp.prototype.exec,
								test: RegExp.prototype.test,
								match: String.prototype.match,
								replace: String.prototype.replace,
								split: String.prototype.split
							},
							// Storage for fixed/extended native methods
							fixed = {},
							// Storage for cached regexes
							cache = {},
							// Storage for addon tokens
							tokens = [],
							// Token scopes
							defaultScope = 'default',
							classScope = 'class',
							// Regexes that match native regex syntax
							nativeTokens = {
								// Any native multicharacter token in default scope (includes octals, excludes character classes)
								default: /^(?:\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9]\d*|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|c[A-Za-z]|[\s\S])|\(\?[:=!]|[?*+]\?|{\d+(?:,\d*)?}\??)/,
								// Any native multicharacter token in character class scope (includes octals)
								class: /^(?:\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|c[A-Za-z]|[\s\S]))/
							},
							// Any backreference in replacement strings
							replacementToken = /\$(?:{([\w$]+)}|(\d\d?|[\s\S]))/g,
							// Any character with a later instance in the string
							duplicateFlags = /([\s\S])(?=[\s\S]*\1)/g,
							// Any greedy/lazy quantifier
							quantifier = /^(?:[?*+]|{\d+(?:,\d*)?})\??/,
							// Check for correct `exec` handling of nonparticipating capturing groups
							compliantExecNpcg = nativ.exec.call(/()??/, '')[1] === undef,
							// Check for flag y support (Firefox 3+)
							hasNativeY = RegExp.prototype.sticky !== undef,
							// Used to kill infinite recursion during XRegExp construction
							isInsideConstructor = false,
							// Storage for known flags, including addon flags
							registeredFlags = 'gim' + (hasNativeY ? 'y' : '');

						/*--------------------------------------
 *  Private helper functions
 *------------------------------------*/

						/**
 * Attaches XRegExp.prototype properties and named capture supporting data to a regex object.
 * @private
 * @param {RegExp} regex Regex to augment.
 * @param {Array} captureNames Array with capture names, or null.
 * @param {Boolean} [isNative] Whether the regex was created by `RegExp` rather than `XRegExp`.
 * @returns {RegExp} Augmented regex.
 */
						function augment(regex, captureNames, isNative) {
							var p;
							// Can't auto-inherit these since the XRegExp constructor returns a nonprimitive value
							for (p in self.prototype) {
								if (self.prototype.hasOwnProperty(p)) {
									regex[p] = self.prototype[p];
								}
							}
							regex.xregexp = {
								captureNames: captureNames,
								isNative: !!isNative
							};
							return regex;
						}

						/**
 * Returns native `RegExp` flags used by a regex object.
 * @private
 * @param {RegExp} regex Regex to check.
 * @returns {String} Native flags in use.
 */
						function getNativeFlags(regex) {
							//return nativ.exec.call(/\/([a-z]*)$/i, String(regex))[1];
							return (
								(regex.global ? 'g' : '') +
								(regex.ignoreCase ? 'i' : '') +
								(regex.multiline ? 'm' : '') +
								(regex.extended ? 'x' : '') + // Proposed for ES6, included in AS3
								(regex.sticky ? 'y' : '')
							); // Proposed for ES6, included in Firefox 3+
						}

						/**
 * Copies a regex object while preserving special properties for named capture and augmenting with
 * `XRegExp.prototype` methods. The copy has a fresh `lastIndex` property (set to zero). Allows
 * adding and removing flags while copying the regex.
 * @private
 * @param {RegExp} regex Regex to copy.
 * @param {String} [addFlags] Flags to be added while copying the regex.
 * @param {String} [removeFlags] Flags to be removed while copying the regex.
 * @returns {RegExp} Copy of the provided regex, possibly with modified flags.
 */
						function copy(regex, addFlags, removeFlags) {
							if (!self.isRegExp(regex)) {
								throw new TypeError('type RegExp expected');
							}
							var flags = nativ.replace.call(
								getNativeFlags(regex) + (addFlags || ''),
								duplicateFlags,
								''
							);
							if (removeFlags) {
								// Would need to escape `removeFlags` if this was public
								flags = nativ.replace.call(
									flags,
									new RegExp('[' + removeFlags + ']+', 'g'),
									''
								);
							}
							if (regex.xregexp && !regex.xregexp.isNative) {
								// Compiling the current (rather than precompilation) source preserves the effects of nonnative source flags
								regex = augment(
									self(regex.source, flags),
									regex.xregexp.captureNames
										? regex.xregexp.captureNames.slice(0)
										: null
								);
							} else {
								// Augment with `XRegExp.prototype` methods, but use native `RegExp` (avoid searching for special tokens)
								regex = augment(new RegExp(regex.source, flags), null, true);
							}
							return regex;
						}

						/*
 * Returns the last index at which a given value can be found in an array, or `-1` if it's not
 * present. The array is searched backwards.
 * @private
 * @param {Array} array Array to search.
 * @param {*} value Value to locate in the array.
 * @returns {Number} Last zero-based index at which the item is found, or -1.
 */
						function lastIndexOf(array, value) {
							var i = array.length;
							if (Array.prototype.lastIndexOf) {
								return array.lastIndexOf(value); // Use the native method if available
							}
							while (i--) {
								if (array[i] === value) {
									return i;
								}
							}
							return -1;
						}

						/**
 * Determines whether an object is of the specified type.
 * @private
 * @param {*} value Object to check.
 * @param {String} type Type to check for, in lowercase.
 * @returns {Boolean} Whether the object matches the type.
 */
						function isType(value, type) {
							return (
								Object.prototype.toString.call(value).toLowerCase() ===
								'[object ' + type + ']'
							);
						}

						/**
 * Prepares an options object from the given value.
 * @private
 * @param {String|Object} value Value to convert to an options object.
 * @returns {Object} Options object.
 */
						function prepareOptions(value) {
							value = value || {};
							if (value === 'all' || value.all) {
								value = { natives: true, extensibility: true };
							} else if (isType(value, 'string')) {
								value = self.forEach(
									value,
									/[^\s,]+/,
									function(m) {
										this[m] = true;
									},
									{}
								);
							}
							return value;
						}

						/**
 * Runs built-in/custom tokens in reverse insertion order, until a match is found.
 * @private
 * @param {String} pattern Original pattern from which an XRegExp object is being built.
 * @param {Number} pos Position to search for tokens within `pattern`.
 * @param {Number} scope Current regex scope.
 * @param {Object} context Context object assigned to token handler functions.
 * @returns {Object} Object with properties `output` (the substitution string returned by the
 *   successful token handler) and `match` (the token's match array), or null.
 */
						function runTokens(pattern, pos, scope, context) {
							var i = tokens.length,
								result = null,
								match,
								t;
							// Protect against constructing XRegExps within token handler and trigger functions
							isInsideConstructor = true;
							// Must reset `isInsideConstructor`, even if a `trigger` or `handler` throws
							try {
								while (i--) {
									// Run in reverse order
									t = tokens[i];
									if (
										(t.scope === 'all' || t.scope === scope) &&
										(!t.trigger || t.trigger.call(context))
									) {
										t.pattern.lastIndex = pos;
										match = fixed.exec.call(t.pattern, pattern); // Fixed `exec` here allows use of named backreferences, etc.
										if (match && match.index === pos) {
											result = {
												output: t.handler.call(context, match, scope),
												match: match
											};
											break;
										}
									}
								}
							} catch (err) {
								throw err;
							} finally {
								isInsideConstructor = false;
							}
							return result;
						}

						/**
 * Enables or disables XRegExp syntax and flag extensibility.
 * @private
 * @param {Boolean} on `true` to enable; `false` to disable.
 */
						function setExtensibility(on) {
							self.addToken = addToken[on ? 'on' : 'off'];
							features.extensibility = on;
						}

						/**
 * Enables or disables native method overrides.
 * @private
 * @param {Boolean} on `true` to enable; `false` to disable.
 */
						function setNatives(on) {
							RegExp.prototype.exec = (on ? fixed : nativ).exec;
							RegExp.prototype.test = (on ? fixed : nativ).test;
							String.prototype.match = (on ? fixed : nativ).match;
							String.prototype.replace = (on ? fixed : nativ).replace;
							String.prototype.split = (on ? fixed : nativ).split;
							features.natives = on;
						}

						/*--------------------------------------
 *  Constructor
 *------------------------------------*/

						/**
 * Creates an extended regular expression object for matching text with a pattern. Differs from a
 * native regular expression in that additional syntax and flags are supported. The returned object
 * is in fact a native `RegExp` and works with all native methods.
 * @class XRegExp
 * @constructor
 * @param {String|RegExp} pattern Regex pattern string, or an existing `RegExp` object to copy.
 * @param {String} [flags] Any combination of flags:
 *   <li>`g` - global
 *   <li>`i` - ignore case
 *   <li>`m` - multiline anchors
 *   <li>`n` - explicit capture
 *   <li>`s` - dot matches all (aka singleline)
 *   <li>`x` - free-spacing and line comments (aka extended)
 *   <li>`y` - sticky (Firefox 3+ only)
 *   Flags cannot be provided when constructing one `RegExp` from another.
 * @returns {RegExp} Extended regular expression object.
 * @example
 *
 * // With named capture and flag x
 * date = XRegExp('(?<year>  [0-9]{4}) -?  # year  \n\
 *                 (?<month> [0-9]{2}) -?  # month \n\
 *                 (?<day>   [0-9]{2})     # day   ', 'x');
 *
 * // Passing a regex object to copy it. The copy maintains special properties for named capture,
 * // is augmented with `XRegExp.prototype` methods, and has a fresh `lastIndex` property (set to
 * // zero). Native regexes are not recompiled using XRegExp syntax.
 * XRegExp(/regex/);
 */
						self = function(pattern, flags) {
							if (self.isRegExp(pattern)) {
								if (flags !== undef) {
									throw new TypeError(
										"can't supply flags when constructing one RegExp from another"
									);
								}
								return copy(pattern);
							}
							// Tokens become part of the regex construction process, so protect against infinite recursion
							// when an XRegExp is constructed within a token handler function
							if (isInsideConstructor) {
								throw new Error(
									"can't call the XRegExp constructor within token definition functions"
								);
							}

							var output = [],
								scope = defaultScope,
								tokenContext = {
									hasNamedCapture: false,
									captureNames: [],
									hasFlag: function(flag) {
										return flags.indexOf(flag) > -1;
									}
								},
								pos = 0,
								tokenResult,
								match,
								chr;
							pattern = pattern === undef ? '' : String(pattern);
							flags = flags === undef ? '' : String(flags);

							if (nativ.match.call(flags, duplicateFlags)) {
								// Don't use test/exec because they would update lastIndex
								throw new SyntaxError(
									'invalid duplicate regular expression flag'
								);
							}
							// Strip/apply leading mode modifier with any combination of flags except g or y: (?imnsx)
							pattern = nativ.replace.call(pattern, /^\(\?([\w$]+)\)/, function(
								$0,
								$1
							) {
								if (nativ.test.call(/[gy]/, $1)) {
									throw new SyntaxError(
										"can't use flag g or y in mode modifier"
									);
								}
								flags = nativ.replace.call(flags + $1, duplicateFlags, '');
								return '';
							});
							self.forEach(flags, /[\s\S]/, function(m) {
								if (registeredFlags.indexOf(m[0]) < 0) {
									throw new SyntaxError(
										'invalid regular expression flag ' + m[0]
									);
								}
							});

							while (pos < pattern.length) {
								// Check for custom tokens at the current position
								tokenResult = runTokens(pattern, pos, scope, tokenContext);
								if (tokenResult) {
									output.push(tokenResult.output);
									pos += tokenResult.match[0].length || 1;
								} else {
									// Check for native tokens (except character classes) at the current position
									match = nativ.exec.call(
										nativeTokens[scope],
										pattern.slice(pos)
									);
									if (match) {
										output.push(match[0]);
										pos += match[0].length;
									} else {
										chr = pattern.charAt(pos);
										if (chr === '[') {
											scope = classScope;
										} else if (chr === ']') {
											scope = defaultScope;
										}
										// Advance position by one character
										output.push(chr);
										++pos;
									}
								}
							}

							return augment(
								new RegExp(
									output.join(''),
									nativ.replace.call(flags, /[^gimy]+/g, '')
								),
								tokenContext.hasNamedCapture ? tokenContext.captureNames : null
							);
						};

						/*--------------------------------------
 *  Public methods/properties
 *------------------------------------*/

						// Installed and uninstalled states for `XRegExp.addToken`
						addToken = {
							on: function(regex, handler, options) {
								options = options || {};
								if (regex) {
									tokens.push({
										pattern: copy(regex, 'g' + (hasNativeY ? 'y' : '')),
										handler: handler,
										scope: options.scope || defaultScope,
										trigger: options.trigger || null
									});
								}
								// Providing `customFlags` with null `regex` and `handler` allows adding flags that do
								// nothing, but don't throw an error
								if (options.customFlags) {
									registeredFlags = nativ.replace.call(
										registeredFlags + options.customFlags,
										duplicateFlags,
										''
									);
								}
							},
							off: function() {
								throw new Error(
									'extensibility must be installed before using addToken'
								);
							}
						};

						/**
 * Extends or changes XRegExp syntax and allows custom flags. This is used internally and can be
 * used to create XRegExp addons. `XRegExp.install('extensibility')` must be run before calling
 * this function, or an error is thrown. If more than one token can match the same string, the last
 * added wins.
 * @memberOf XRegExp
 * @param {RegExp} regex Regex object that matches the new token.
 * @param {Function} handler Function that returns a new pattern string (using native regex syntax)
 *   to replace the matched token within all future XRegExp regexes. Has access to persistent
 *   properties of the regex being built, through `this`. Invoked with two arguments:
 *   <li>The match array, with named backreference properties.
 *   <li>The regex scope where the match was found.
 * @param {Object} [options] Options object with optional properties:
 *   <li>`scope` {String} Scopes where the token applies: 'default', 'class', or 'all'.
 *   <li>`trigger` {Function} Function that returns `true` when the token should be applied; e.g.,
 *     if a flag is set. If `false` is returned, the matched string can be matched by other tokens.
 *     Has access to persistent properties of the regex being built, through `this` (including
 *     function `this.hasFlag`).
 *   <li>`customFlags` {String} Nonnative flags used by the token's handler or trigger functions.
 *     Prevents XRegExp from throwing an invalid flag error when the specified flags are used.
 * @example
 *
 * // Basic usage: Adds \a for ALERT character
 * XRegExp.addToken(
 *   /\\a/,
 *   function () {return '\\x07';},
 *   {scope: 'all'}
 * );
 * XRegExp('\\a[\\a-\\n]+').test('\x07\n\x07'); // -> true
 */
						self.addToken = addToken.off;

						/**
 * Caches and returns the result of calling `XRegExp(pattern, flags)`. On any subsequent call with
 * the same pattern and flag combination, the cached copy is returned.
 * @memberOf XRegExp
 * @param {String} pattern Regex pattern string.
 * @param {String} [flags] Any combination of XRegExp flags.
 * @returns {RegExp} Cached XRegExp object.
 * @example
 *
 * while (match = XRegExp.cache('.', 'gs').exec(str)) {
 *   // The regex is compiled once only
 * }
 */
						self.cache = function(pattern, flags) {
							var key = pattern + '/' + (flags || '');
							return cache[key] || (cache[key] = self(pattern, flags));
						};

						/**
 * Escapes any regular expression metacharacters, for use when matching literal strings. The result
 * can safely be used at any point within a regex that uses any flags.
 * @memberOf XRegExp
 * @param {String} str String to escape.
 * @returns {String} String with regex metacharacters escaped.
 * @example
 *
 * XRegExp.escape('Escaped? <.>');
 * // -> 'Escaped\?\ <\.>'
 */
						self.escape = function(str) {
							return nativ.replace.call(
								str,
								/[-[\]{}()*+?.,\\^$|#\s]/g,
								'\\$&'
							);
						};

						/**
 * Executes a regex search in a specified string. Returns a match array or `null`. If the provided
 * regex uses named capture, named backreference properties are included on the match array.
 * Optional `pos` and `sticky` arguments specify the search start position, and whether the match
 * must start at the specified position only. The `lastIndex` property of the provided regex is not
 * used, but is updated for compatibility. Also fixes browser bugs compared to the native
 * `RegExp.prototype.exec` and can be used reliably cross-browser.
 * @memberOf XRegExp
 * @param {String} str String to search.
 * @param {RegExp} regex Regex to search with.
 * @param {Number} [pos=0] Zero-based index at which to start the search.
 * @param {Boolean|String} [sticky=false] Whether the match must start at the specified position
 *   only. The string `'sticky'` is accepted as an alternative to `true`.
 * @returns {Array} Match array with named backreference properties, or null.
 * @example
 *
 * // Basic use, with named backreference
 * var match = XRegExp.exec('U+2620', XRegExp('U\\+(?<hex>[0-9A-F]{4})'));
 * match.hex; // -> '2620'
 *
 * // With pos and sticky, in a loop
 * var pos = 2, result = [], match;
 * while (match = XRegExp.exec('<1><2><3><4>5<6>', /<(\d)>/, pos, 'sticky')) {
 *   result.push(match[1]);
 *   pos = match.index + match[0].length;
 * }
 * // result -> ['2', '3', '4']
 */
						self.exec = function(str, regex, pos, sticky) {
							var r2 = copy(
									regex,
									'g' + (sticky && hasNativeY ? 'y' : ''),
									sticky === false ? 'y' : ''
								),
								match;
							r2.lastIndex = pos = pos || 0;
							match = fixed.exec.call(r2, str); // Fixed `exec` required for `lastIndex` fix, etc.
							if (sticky && match && match.index !== pos) {
								match = null;
							}
							if (regex.global) {
								regex.lastIndex = match ? r2.lastIndex : 0;
							}
							return match;
						};

						/**
 * Executes a provided function once per regex match.
 * @memberOf XRegExp
 * @param {String} str String to search.
 * @param {RegExp} regex Regex to search with.
 * @param {Function} callback Function to execute for each match. Invoked with four arguments:
 *   <li>The match array, with named backreference properties.
 *   <li>The zero-based match index.
 *   <li>The string being traversed.
 *   <li>The regex object being used to traverse the string.
 * @param {*} [context] Object to use as `this` when executing `callback`.
 * @returns {*} Provided `context` object.
 * @example
 *
 * // Extracts every other digit from a string
 * XRegExp.forEach('1a2345', /\d/, function (match, i) {
 *   if (i % 2) this.push(+match[0]);
 * }, []);
 * // -> [2, 4]
 */
						self.forEach = function(str, regex, callback, context) {
							var pos = 0,
								i = -1,
								match;
							while ((match = self.exec(str, regex, pos))) {
								callback.call(context, match, ++i, str, regex);
								pos = match.index + (match[0].length || 1);
							}
							return context;
						};

						/**
 * Copies a regex object and adds flag `g`. The copy maintains special properties for named
 * capture, is augmented with `XRegExp.prototype` methods, and has a fresh `lastIndex` property
 * (set to zero). Native regexes are not recompiled using XRegExp syntax.
 * @memberOf XRegExp
 * @param {RegExp} regex Regex to globalize.
 * @returns {RegExp} Copy of the provided regex with flag `g` added.
 * @example
 *
 * var globalCopy = XRegExp.globalize(/regex/);
 * globalCopy.global; // -> true
 */
						self.globalize = function(regex) {
							return copy(regex, 'g');
						};

						/**
 * Installs optional features according to the specified options.
 * @memberOf XRegExp
 * @param {Object|String} options Options object or string.
 * @example
 *
 * // With an options object
 * XRegExp.install({
 *   // Overrides native regex methods with fixed/extended versions that support named
 *   // backreferences and fix numerous cross-browser bugs
 *   natives: true,
 *
 *   // Enables extensibility of XRegExp syntax and flags
 *   extensibility: true
 * });
 *
 * // With an options string
 * XRegExp.install('natives extensibility');
 *
 * // Using a shortcut to install all optional features
 * XRegExp.install('all');
 */
						self.install = function(options) {
							options = prepareOptions(options);
							if (!features.natives && options.natives) {
								setNatives(true);
							}
							if (!features.extensibility && options.extensibility) {
								setExtensibility(true);
							}
						};

						/**
 * Checks whether an individual optional feature is installed.
 * @memberOf XRegExp
 * @param {String} feature Name of the feature to check. One of:
 *   <li>`natives`
 *   <li>`extensibility`
 * @returns {Boolean} Whether the feature is installed.
 * @example
 *
 * XRegExp.isInstalled('natives');
 */
						self.isInstalled = function(feature) {
							return !!features[feature];
						};

						/**
 * Returns `true` if an object is a regex; `false` if it isn't. This works correctly for regexes
 * created in another frame, when `instanceof` and `constructor` checks would fail.
 * @memberOf XRegExp
 * @param {*} value Object to check.
 * @returns {Boolean} Whether the object is a `RegExp` object.
 * @example
 *
 * XRegExp.isRegExp('string'); // -> false
 * XRegExp.isRegExp(/regex/i); // -> true
 * XRegExp.isRegExp(RegExp('^', 'm')); // -> true
 * XRegExp.isRegExp(XRegExp('(?s).')); // -> true
 */
						self.isRegExp = function(value) {
							return isType(value, 'regexp');
						};

						/**
 * Retrieves the matches from searching a string using a chain of regexes that successively search
 * within previous matches. The provided `chain` array can contain regexes and objects with `regex`
 * and `backref` properties. When a backreference is specified, the named or numbered backreference
 * is passed forward to the next regex or returned.
 * @memberOf XRegExp
 * @param {String} str String to search.
 * @param {Array} chain Regexes that each search for matches within preceding results.
 * @returns {Array} Matches by the last regex in the chain, or an empty array.
 * @example
 *
 * // Basic usage; matches numbers within <b> tags
 * XRegExp.matchChain('1 <b>2</b> 3 <b>4 a 56</b>', [
 *   XRegExp('(?is)<b>.*?</b>'),
 *   /\d+/
 * ]);
 * // -> ['2', '4', '56']
 *
 * // Passing forward and returning specific backreferences
 * html = '<a href="http://xregexp.com/api/">XRegExp</a>\
 *         <a href="http://www.google.com/">Google</a>';
 * XRegExp.matchChain(html, [
 *   {regex: /<a href="([^"]+)">/i, backref: 1},
 *   {regex: XRegExp('(?i)^https?://(?<domain>[^/?#]+)'), backref: 'domain'}
 * ]);
 * // -> ['xregexp.com', 'www.google.com']
 */
						self.matchChain = function(str, chain) {
							return (function recurseChain(values, level) {
								var item = chain[level].regex
										? chain[level]
										: { regex: chain[level] },
									matches = [],
									addMatch = function(match) {
										matches.push(
											item.backref ? match[item.backref] || '' : match[0]
										);
									},
									i;
								for (i = 0; i < values.length; ++i) {
									self.forEach(values[i], item.regex, addMatch);
								}
								return level === chain.length - 1 || !matches.length
									? matches
									: recurseChain(matches, level + 1);
							})([str], 0);
						};

						/**
 * Returns a new string with one or all matches of a pattern replaced. The pattern can be a string
 * or regex, and the replacement can be a string or a function to be called for each match. To
 * perform a global search and replace, use the optional `scope` argument or include flag `g` if
 * using a regex. Replacement strings can use `${n}` for named and numbered backreferences.
 * Replacement functions can use named backreferences via `arguments[0].name`. Also fixes browser
 * bugs compared to the native `String.prototype.replace` and can be used reliably cross-browser.
 * @memberOf XRegExp
 * @param {String} str String to search.
 * @param {RegExp|String} search Search pattern to be replaced.
 * @param {String|Function} replacement Replacement string or a function invoked to create it.
 *   Replacement strings can include special replacement syntax:
 *     <li>$$ - Inserts a literal '$'.
 *     <li>$&, $0 - Inserts the matched substring.
 *     <li>$` - Inserts the string that precedes the matched substring (left context).
 *     <li>$' - Inserts the string that follows the matched substring (right context).
 *     <li>$n, $nn - Where n/nn are digits referencing an existent capturing group, inserts
 *       backreference n/nn.
 *     <li>${n} - Where n is a name or any number of digits that reference an existent capturing
 *       group, inserts backreference n.
 *   Replacement functions are invoked with three or more arguments:
 *     <li>The matched substring (corresponds to $& above). Named backreferences are accessible as
 *       properties of this first argument.
 *     <li>0..n arguments, one for each backreference (corresponding to $1, $2, etc. above).
 *     <li>The zero-based index of the match within the total search string.
 *     <li>The total string being searched.
 * @param {String} [scope='one'] Use 'one' to replace the first match only, or 'all'. If not
 *   explicitly specified and using a regex with flag `g`, `scope` is 'all'.
 * @returns {String} New string with one or all matches replaced.
 * @example
 *
 * // Regex search, using named backreferences in replacement string
 * var name = XRegExp('(?<first>\\w+) (?<last>\\w+)');
 * XRegExp.replace('John Smith', name, '${last}, ${first}');
 * // -> 'Smith, John'
 *
 * // Regex search, using named backreferences in replacement function
 * XRegExp.replace('John Smith', name, function (match) {
 *   return match.last + ', ' + match.first;
 * });
 * // -> 'Smith, John'
 *
 * // Global string search/replacement
 * XRegExp.replace('RegExp builds RegExps', 'RegExp', 'XRegExp', 'all');
 * // -> 'XRegExp builds XRegExps'
 */
						self.replace = function(str, search, replacement, scope) {
							var isRegex = self.isRegExp(search),
								search2 = search,
								result;
							if (isRegex) {
								if (scope === undef && search.global) {
									scope = 'all'; // Follow flag g when `scope` isn't explicit
								}
								// Note that since a copy is used, `search`'s `lastIndex` isn't updated *during* replacement iterations
								search2 = copy(
									search,
									scope === 'all' ? 'g' : '',
									scope === 'all' ? '' : 'g'
								);
							} else if (scope === 'all') {
								search2 = new RegExp(self.escape(String(search)), 'g');
							}
							result = fixed.replace.call(String(str), search2, replacement); // Fixed `replace` required for named backreferences, etc.
							if (isRegex && search.global) {
								search.lastIndex = 0; // Fixes IE, Safari bug (last tested IE 9, Safari 5.1)
							}
							return result;
						};

						/**
 * Splits a string into an array of strings using a regex or string separator. Matches of the
 * separator are not included in the result array. However, if `separator` is a regex that contains
 * capturing groups, backreferences are spliced into the result each time `separator` is matched.
 * Fixes browser bugs compared to the native `String.prototype.split` and can be used reliably
 * cross-browser.
 * @memberOf XRegExp
 * @param {String} str String to split.
 * @param {RegExp|String} separator Regex or string to use for separating the string.
 * @param {Number} [limit] Maximum number of items to include in the result array.
 * @returns {Array} Array of substrings.
 * @example
 *
 * // Basic use
 * XRegExp.split('a b c', ' ');
 * // -> ['a', 'b', 'c']
 *
 * // With limit
 * XRegExp.split('a b c', ' ', 2);
 * // -> ['a', 'b']
 *
 * // Backreferences in result array
 * XRegExp.split('..word1..', /([a-z]+)(\d+)/i);
 * // -> ['..', 'word', '1', '..']
 */
						self.split = function(str, separator, limit) {
							return fixed.split.call(str, separator, limit);
						};

						/**
 * Executes a regex search in a specified string. Returns `true` or `false`. Optional `pos` and
 * `sticky` arguments specify the search start position, and whether the match must start at the
 * specified position only. The `lastIndex` property of the provided regex is not used, but is
 * updated for compatibility. Also fixes browser bugs compared to the native
 * `RegExp.prototype.test` and can be used reliably cross-browser.
 * @memberOf XRegExp
 * @param {String} str String to search.
 * @param {RegExp} regex Regex to search with.
 * @param {Number} [pos=0] Zero-based index at which to start the search.
 * @param {Boolean|String} [sticky=false] Whether the match must start at the specified position
 *   only. The string `'sticky'` is accepted as an alternative to `true`.
 * @returns {Boolean} Whether the regex matched the provided value.
 * @example
 *
 * // Basic use
 * XRegExp.test('abc', /c/); // -> true
 *
 * // With pos and sticky
 * XRegExp.test('abc', /c/, 0, 'sticky'); // -> false
 */
						self.test = function(str, regex, pos, sticky) {
							// Do this the easy way :-)
							return !!self.exec(str, regex, pos, sticky);
						};

						/**
 * Uninstalls optional features according to the specified options.
 * @memberOf XRegExp
 * @param {Object|String} options Options object or string.
 * @example
 *
 * // With an options object
 * XRegExp.uninstall({
 *   // Restores native regex methods
 *   natives: true,
 *
 *   // Disables additional syntax and flag extensions
 *   extensibility: true
 * });
 *
 * // With an options string
 * XRegExp.uninstall('natives extensibility');
 *
 * // Using a shortcut to uninstall all optional features
 * XRegExp.uninstall('all');
 */
						self.uninstall = function(options) {
							options = prepareOptions(options);
							if (features.natives && options.natives) {
								setNatives(false);
							}
							if (features.extensibility && options.extensibility) {
								setExtensibility(false);
							}
						};

						/**
 * Returns an XRegExp object that is the union of the given patterns. Patterns can be provided as
 * regex objects or strings. Metacharacters are escaped in patterns provided as strings.
 * Backreferences in provided regex objects are automatically renumbered to work correctly. Native
 * flags used by provided regexes are ignored in favor of the `flags` argument.
 * @memberOf XRegExp
 * @param {Array} patterns Regexes and strings to combine.
 * @param {String} [flags] Any combination of XRegExp flags.
 * @returns {RegExp} Union of the provided regexes and strings.
 * @example
 *
 * XRegExp.union(['a+b*c', /(dogs)\1/, /(cats)\1/], 'i');
 * // -> /a\+b\*c|(dogs)\1|(cats)\2/i
 *
 * XRegExp.union([XRegExp('(?<pet>dogs)\\k<pet>'), XRegExp('(?<pet>cats)\\k<pet>')]);
 * // -> XRegExp('(?<pet>dogs)\\k<pet>|(?<pet>cats)\\k<pet>')
 */
						self.union = function(patterns, flags) {
							var parts = /(\()(?!\?)|\\([1-9]\d*)|\\[\s\S]|\[(?:[^\\\]]|\\[\s\S])*]/g,
								numCaptures = 0,
								numPriorCaptures,
								captureNames,
								rewrite = function(match, paren, backref) {
									var name = captureNames[numCaptures - numPriorCaptures];
									if (paren) {
										// Capturing group
										++numCaptures;
										if (name) {
											// If the current capture has a name
											return '(?<' + name + '>';
										}
									} else if (backref) {
										// Backreference
										return '\\' + (+backref + numPriorCaptures);
									}
									return match;
								},
								output = [],
								pattern,
								i;
							if (!(isType(patterns, 'array') && patterns.length)) {
								throw new TypeError('patterns must be a nonempty array');
							}
							for (i = 0; i < patterns.length; ++i) {
								pattern = patterns[i];
								if (self.isRegExp(pattern)) {
									numPriorCaptures = numCaptures;
									captureNames =
										(pattern.xregexp && pattern.xregexp.captureNames) || [];
									// Rewrite backreferences. Passing to XRegExp dies on octals and ensures patterns
									// are independently valid; helps keep this simple. Named captures are put back
									output.push(
										self(pattern.source).source.replace(parts, rewrite)
									);
								} else {
									output.push(self.escape(pattern));
								}
							}
							return self(output.join('|'), flags);
						};

						/**
 * The XRegExp version number.
 * @static
 * @memberOf XRegExp
 * @type String
 */
						self.version = '2.0.0';

						/*--------------------------------------
 *  Fixed/extended native methods
 *------------------------------------*/

						/**
 * Adds named capture support (with backreferences returned as `result.name`), and fixes browser
 * bugs in the native `RegExp.prototype.exec`. Calling `XRegExp.install('natives')` uses this to
 * override the native method. Use via `XRegExp.exec` without overriding natives.
 * @private
 * @param {String} str String to search.
 * @returns {Array} Match array with named backreference properties, or null.
 */
						fixed.exec = function(str) {
							var match, name, r2, origLastIndex, i;
							if (!this.global) {
								origLastIndex = this.lastIndex;
							}
							match = nativ.exec.apply(this, arguments);
							if (match) {
								// Fix browsers whose `exec` methods don't consistently return `undefined` for
								// nonparticipating capturing groups
								if (
									!compliantExecNpcg &&
									match.length > 1 &&
									lastIndexOf(match, '') > -1
								) {
									r2 = new RegExp(
										this.source,
										nativ.replace.call(getNativeFlags(this), 'g', '')
									);
									// Using `str.slice(match.index)` rather than `match[0]` in case lookahead allowed
									// matching due to characters outside the match
									nativ.replace.call(
										String(str).slice(match.index),
										r2,
										function() {
											var i;
											for (i = 1; i < arguments.length - 2; ++i) {
												if (arguments[i] === undef) {
													match[i] = undef;
												}
											}
										}
									);
								}
								// Attach named capture properties
								if (this.xregexp && this.xregexp.captureNames) {
									for (i = 1; i < match.length; ++i) {
										name = this.xregexp.captureNames[i - 1];
										if (name) {
											match[name] = match[i];
										}
									}
								}
								// Fix browsers that increment `lastIndex` after zero-length matches
								if (
									this.global &&
									!match[0].length &&
									this.lastIndex > match.index
								) {
									this.lastIndex = match.index;
								}
							}
							if (!this.global) {
								this.lastIndex = origLastIndex; // Fixes IE, Opera bug (last tested IE 9, Opera 11.6)
							}
							return match;
						};

						/**
 * Fixes browser bugs in the native `RegExp.prototype.test`. Calling `XRegExp.install('natives')`
 * uses this to override the native method.
 * @private
 * @param {String} str String to search.
 * @returns {Boolean} Whether the regex matched the provided value.
 */
						fixed.test = function(str) {
							// Do this the easy way :-)
							return !!fixed.exec.call(this, str);
						};

						/**
 * Adds named capture support (with backreferences returned as `result.name`), and fixes browser
 * bugs in the native `String.prototype.match`. Calling `XRegExp.install('natives')` uses this to
 * override the native method.
 * @private
 * @param {RegExp} regex Regex to search with.
 * @returns {Array} If `regex` uses flag g, an array of match strings or null. Without flag g, the
 *   result of calling `regex.exec(this)`.
 */
						fixed.match = function(regex) {
							if (!self.isRegExp(regex)) {
								regex = new RegExp(regex); // Use native `RegExp`
							} else if (regex.global) {
								var result = nativ.match.apply(this, arguments);
								regex.lastIndex = 0; // Fixes IE bug
								return result;
							}
							return fixed.exec.call(regex, this);
						};

						/**
 * Adds support for `${n}` tokens for named and numbered backreferences in replacement text, and
 * provides named backreferences to replacement functions as `arguments[0].name`. Also fixes
 * browser bugs in replacement text syntax when performing a replacement using a nonregex search
 * value, and the value of a replacement regex's `lastIndex` property during replacement iterations
 * and upon completion. Note that this doesn't support SpiderMonkey's proprietary third (`flags`)
 * argument. Calling `XRegExp.install('natives')` uses this to override the native method. Use via
 * `XRegExp.replace` without overriding natives.
 * @private
 * @param {RegExp|String} search Search pattern to be replaced.
 * @param {String|Function} replacement Replacement string or a function invoked to create it.
 * @returns {String} New string with one or all matches replaced.
 */
						fixed.replace = function(search, replacement) {
							var isRegex = self.isRegExp(search),
								captureNames,
								result,
								str,
								origLastIndex;
							if (isRegex) {
								if (search.xregexp) {
									captureNames = search.xregexp.captureNames;
								}
								if (!search.global) {
									origLastIndex = search.lastIndex;
								}
							} else {
								search += '';
							}
							if (isType(replacement, 'function')) {
								result = nativ.replace.call(String(this), search, function() {
									var args = arguments,
										i;
									if (captureNames) {
										// Change the `arguments[0]` string primitive to a `String` object that can store properties
										args[0] = new String(args[0]);
										// Store named backreferences on the first argument
										for (i = 0; i < captureNames.length; ++i) {
											if (captureNames[i]) {
												args[0][captureNames[i]] = args[i + 1];
											}
										}
									}
									// Update `lastIndex` before calling `replacement`.
									// Fixes IE, Chrome, Firefox, Safari bug (last tested IE 9, Chrome 17, Firefox 11, Safari 5.1)
									if (isRegex && search.global) {
										search.lastIndex = args[args.length - 2] + args[0].length;
									}
									return replacement.apply(null, args);
								});
							} else {
								str = String(this); // Ensure `args[args.length - 1]` will be a string when given nonstring `this`
								result = nativ.replace.call(str, search, function() {
									var args = arguments; // Keep this function's `arguments` available through closure
									return nativ.replace.call(
										String(replacement),
										replacementToken,
										function($0, $1, $2) {
											var n;
											// Named or numbered backreference with curly brackets
											if ($1) {
												/* XRegExp behavior for `${n}`:
                         * 1. Backreference to numbered capture, where `n` is 1+ digits. `0`, `00`, etc. is the entire match.
                         * 2. Backreference to named capture `n`, if it exists and is not a number overridden by numbered capture.
                         * 3. Otherwise, it's an error.
                         */
												n = +$1; // Type-convert; drop leading zeros
												if (n <= args.length - 3) {
													return args[n] || '';
												}
												n = captureNames ? lastIndexOf(captureNames, $1) : -1;
												if (n < 0) {
													throw new SyntaxError(
														'backreference to undefined group ' + $0
													);
												}
												return args[n + 1] || '';
											}
											// Else, special variable or numbered backreference (without curly brackets)
											if ($2 === '$') return '$';
											if ($2 === '&' || +$2 === 0) return args[0]; // $&, $0 (not followed by 1-9), $00
											if ($2 === '`')
												return args[args.length - 1].slice(
													0,
													args[args.length - 2]
												);
											if ($2 === "'")
												return args[args.length - 1].slice(
													args[args.length - 2] + args[0].length
												);
											// Else, numbered backreference (without curly brackets)
											$2 = +$2; // Type-convert; drop leading zero
											/* XRegExp behavior:
                     * - Backreferences without curly brackets end after 1 or 2 digits. Use `${..}` for more digits.
                     * - `$1` is an error if there are no capturing groups.
                     * - `$10` is an error if there are less than 10 capturing groups. Use `${1}0` instead.
                     * - `$01` is equivalent to `$1` if a capturing group exists, otherwise it's an error.
                     * - `$0` (not followed by 1-9), `$00`, and `$&` are the entire match.
                     * Native behavior, for comparison:
                     * - Backreferences end after 1 or 2 digits. Cannot use backreference to capturing group 100+.
                     * - `$1` is a literal `$1` if there are no capturing groups.
                     * - `$10` is `$1` followed by a literal `0` if there are less than 10 capturing groups.
                     * - `$01` is equivalent to `$1` if a capturing group exists, otherwise it's a literal `$01`.
                     * - `$0` is a literal `$0`. `$&` is the entire match.
                     */
											if (!isNaN($2)) {
												if ($2 > args.length - 3) {
													throw new SyntaxError(
														'backreference to undefined group ' + $0
													);
												}
												return args[$2] || '';
											}
											throw new SyntaxError('invalid token ' + $0);
										}
									);
								});
							}
							if (isRegex) {
								if (search.global) {
									search.lastIndex = 0; // Fixes IE, Safari bug (last tested IE 9, Safari 5.1)
								} else {
									search.lastIndex = origLastIndex; // Fixes IE, Opera bug (last tested IE 9, Opera 11.6)
								}
							}
							return result;
						};

						/**
 * Fixes browser bugs in the native `String.prototype.split`. Calling `XRegExp.install('natives')`
 * uses this to override the native method. Use via `XRegExp.split` without overriding natives.
 * @private
 * @param {RegExp|String} separator Regex or string to use for separating the string.
 * @param {Number} [limit] Maximum number of items to include in the result array.
 * @returns {Array} Array of substrings.
 */
						fixed.split = function(separator, limit) {
							if (!self.isRegExp(separator)) {
								return nativ.split.apply(this, arguments); // use faster native method
							}
							var str = String(this),
								origLastIndex = separator.lastIndex,
								output = [],
								lastLastIndex = 0,
								lastLength;
							/* Values for `limit`, per the spec:
         * If undefined: pow(2,32) - 1
         * If 0, Infinity, or NaN: 0
         * If positive number: limit = floor(limit); if (limit >= pow(2,32)) limit -= pow(2,32);
         * If negative number: pow(2,32) - floor(abs(limit))
         * If other: Type-convert, then use the above rules
         */
							limit = (limit === undef ? -1 : limit) >>> 0;
							self.forEach(str, separator, function(match) {
								if (match.index + match[0].length > lastLastIndex) {
									// != `if (match[0].length)`
									output.push(str.slice(lastLastIndex, match.index));
									if (match.length > 1 && match.index < str.length) {
										Array.prototype.push.apply(output, match.slice(1));
									}
									lastLength = match[0].length;
									lastLastIndex = match.index + lastLength;
								}
							});
							if (lastLastIndex === str.length) {
								if (!nativ.test.call(separator, '') || lastLength) {
									output.push('');
								}
							} else {
								output.push(str.slice(lastLastIndex));
							}
							separator.lastIndex = origLastIndex;
							return output.length > limit ? output.slice(0, limit) : output;
						};

						/*--------------------------------------
 *  Built-in tokens
 *------------------------------------*/

						// Shortcut
						add = addToken.on;

						/* Letter identity escapes that natively match literal characters: \p, \P, etc.
 * Should be SyntaxErrors but are allowed in web reality. XRegExp makes them errors for cross-
 * browser consistency and to reserve their syntax, but lets them be superseded by XRegExp addons.
 */
						add(
							/\\([ABCE-RTUVXYZaeg-mopqyz]|c(?![A-Za-z])|u(?![\dA-Fa-f]{4})|x(?![\dA-Fa-f]{2}))/,
							function(match, scope) {
								// \B is allowed in default scope only
								if (match[1] === 'B' && scope === defaultScope) {
									return match[0];
								}
								throw new SyntaxError('invalid escape ' + match[0]);
							},
							{ scope: 'all' }
						);

						/* Empty character class: [] or [^]
 * Fixes a critical cross-browser syntax inconsistency. Unless this is standardized (per the spec),
 * regex syntax can't be accurately parsed because character class endings can't be determined.
 */
						add(/\[(\^?)]/, function(match) {
							// For cross-browser compatibility with ES3, convert [] to \b\B and [^] to [\s\S].
							// (?!) should work like \b\B, but is unreliable in Firefox
							return match[1] ? '[\\s\\S]' : '\\b\\B';
						});

						/* Comment pattern: (?# )
 * Inline comments are an alternative to the line comments allowed in free-spacing mode (flag x).
 */
						add(/(?:\(\?#[^)]*\))+/, function(match) {
							// Keep tokens separated unless the following token is a quantifier
							return nativ.test.call(
								quantifier,
								match.input.slice(match.index + match[0].length)
							)
								? ''
								: '(?:)';
						});

						/* Named backreference: \k<name>
 * Backreference names can use the characters A-Z, a-z, 0-9, _, and $ only.
 */
						add(/\\k<([\w$]+)>/, function(match) {
							var index = isNaN(match[1])
									? lastIndexOf(this.captureNames, match[1]) + 1
									: +match[1],
								endIndex = match.index + match[0].length;
							if (!index || index > this.captureNames.length) {
								throw new SyntaxError(
									'backreference to undefined group ' + match[0]
								);
							}
							// Keep backreferences separate from subsequent literal numbers
							return (
								'\\' +
								index +
								(endIndex === match.input.length ||
								isNaN(match.input.charAt(endIndex))
									? ''
									: '(?:)')
							);
						});

						/* Whitespace and line comments, in free-spacing mode (aka extended mode, flag x) only.
 */
						add(
							/(?:\s+|#.*)+/,
							function(match) {
								// Keep tokens separated unless the following token is a quantifier
								return nativ.test.call(
									quantifier,
									match.input.slice(match.index + match[0].length)
								)
									? ''
									: '(?:)';
							},
							{
								trigger: function() {
									return this.hasFlag('x');
								},
								customFlags: 'x'
							}
						);

						/* Dot, in dotall mode (aka singleline mode, flag s) only.
 */
						add(
							/\./,
							function() {
								return '[\\s\\S]';
							},
							{
								trigger: function() {
									return this.hasFlag('s');
								},
								customFlags: 's'
							}
						);

						/* Named capturing group; match the opening delimiter only: (?<name>
 * Capture names can use the characters A-Z, a-z, 0-9, _, and $ only. Names can't be integers.
 * Supports Python-style (?P<name> as an alternate syntax to avoid issues in recent Opera (which
 * natively supports the Python-style syntax). Otherwise, XRegExp might treat numbered
 * backreferences to Python-style named capture as octals.
 */
						add(/\(\?P?<([\w$]+)>/, function(match) {
							if (!isNaN(match[1])) {
								// Avoid incorrect lookups, since named backreferences are added to match arrays
								throw new SyntaxError(
									"can't use integer as capture name " + match[0]
								);
							}
							this.captureNames.push(match[1]);
							this.hasNamedCapture = true;
							return '(';
						});

						/* Numbered backreference or octal, plus any following digits: \0, \11, etc.
 * Octals except \0 not followed by 0-9 and backreferences to unopened capture groups throw an
 * error. Other matches are returned unaltered. IE <= 8 doesn't support backreferences greater than
 * \99 in regex syntax.
 */
						add(
							/\\(\d+)/,
							function(match, scope) {
								if (
									!(
										scope === defaultScope &&
										/^[1-9]/.test(match[1]) &&
										+match[1] <= this.captureNames.length
									) &&
									match[1] !== '0'
								) {
									throw new SyntaxError(
										"can't use octal escape or backreference to undefined group " +
											match[0]
									);
								}
								return match[0];
							},
							{ scope: 'all' }
						);

						/* Capturing group; match the opening parenthesis only.
 * Required for support of named capturing groups. Also adds explicit capture mode (flag n).
 */
						add(
							/\((?!\?)/,
							function() {
								if (this.hasFlag('n')) {
									return '(?:';
								}
								this.captureNames.push(null);
								return '(';
							},
							{ customFlags: 'n' }
						);

						/*--------------------------------------
 *  Expose XRegExp
 *------------------------------------*/

						// For CommonJS enviroments
						if (typeof exports !== 'undefined') {
							exports.XRegExp = self;
						}

						return self;
					})();

				/***** unicode-base.js *****/

				/*!
 * XRegExp Unicode Base v1.0.0
 * (c) 2008-2012 Steven Levithan <http://xregexp.com/>
 * MIT License
 * Uses Unicode 6.1 <http://unicode.org/>
 */

				/**
 * Adds support for the `\p{L}` or `\p{Letter}` Unicode category. Addon packages for other Unicode
 * categories, scripts, blocks, and properties are available separately. All Unicode tokens can be
 * inverted using `\P{..}` or `\p{^..}`. Token names are case insensitive, and any spaces, hyphens,
 * and underscores are ignored.
 * @requires XRegExp
 */
				(function(XRegExp) {
					'use strict';

					var unicode = {};

					/*--------------------------------------
 *  Private helper functions
 *------------------------------------*/

					// Generates a standardized token name (lowercase, with hyphens, spaces, and underscores removed)
					function slug(name) {
						return name.replace(/[- _]+/g, '').toLowerCase();
					}

					// Expands a list of Unicode code points and ranges to be usable in a regex character class
					function expand(str) {
						return str.replace(/\w{4}/g, '\\u$&');
					}

					// Adds leading zeros if shorter than four characters
					function pad4(str) {
						while (str.length < 4) {
							str = '0' + str;
						}
						return str;
					}

					// Converts a hexadecimal number to decimal
					function dec(hex) {
						return parseInt(hex, 16);
					}

					// Converts a decimal number to hexadecimal
					function hex(dec) {
						return parseInt(dec, 10).toString(16);
					}

					// Inverts a list of Unicode code points and ranges
					function invert(range) {
						var output = [],
							lastEnd = -1,
							start;
						XRegExp.forEach(range, /\\u(\w{4})(?:-\\u(\w{4}))?/, function(m) {
							start = dec(m[1]);
							if (start > lastEnd + 1) {
								output.push('\\u' + pad4(hex(lastEnd + 1)));
								if (start > lastEnd + 2) {
									output.push('-\\u' + pad4(hex(start - 1)));
								}
							}
							lastEnd = dec(m[2] || m[1]);
						});
						if (lastEnd < 0xffff) {
							output.push('\\u' + pad4(hex(lastEnd + 1)));
							if (lastEnd < 0xfffe) {
								output.push('-\\uFFFF');
							}
						}
						return output.join('');
					}

					// Generates an inverted token on first use
					function cacheInversion(item) {
						return (
							unicode['^' + item] ||
							(unicode['^' + item] = invert(unicode[item]))
						);
					}

					/*--------------------------------------
 *  Core functionality
 *------------------------------------*/

					XRegExp.install('extensibility');

					/**
 * Adds to the list of Unicode properties that XRegExp regexes can match via \p{..} or \P{..}.
 * @memberOf XRegExp
 * @param {Object} pack Named sets of Unicode code points and ranges.
 * @param {Object} [aliases] Aliases for the primary token names.
 * @example
 *
 * XRegExp.addUnicodePackage({
 *   XDigit: '0030-00390041-00460061-0066' // 0-9A-Fa-f
 * }, {
 *   XDigit: 'Hexadecimal'
 * });
 */
					XRegExp.addUnicodePackage = function(pack, aliases) {
						var p;
						if (!XRegExp.isInstalled('extensibility')) {
							throw new Error(
								'extensibility must be installed before adding Unicode packages'
							);
						}
						if (pack) {
							for (p in pack) {
								if (pack.hasOwnProperty(p)) {
									unicode[slug(p)] = expand(pack[p]);
								}
							}
						}
						if (aliases) {
							for (p in aliases) {
								if (aliases.hasOwnProperty(p)) {
									unicode[slug(aliases[p])] = unicode[slug(p)];
								}
							}
						}
					};

					/* Adds data for the Unicode `Letter` category. Addon packages include other categories, scripts,
 * blocks, and properties.
 */
					XRegExp.addUnicodePackage(
						{
							L:
								'0041-005A0061-007A00AA00B500BA00C0-00D600D8-00F600F8-02C102C6-02D102E0-02E402EC02EE0370-037403760377037A-037D03860388-038A038C038E-03A103A3-03F503F7-0481048A-05270531-055605590561-058705D0-05EA05F0-05F20620-064A066E066F0671-06D306D506E506E606EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA07F407F507FA0800-0815081A082408280840-085808A008A2-08AC0904-0939093D09500958-09610971-09770979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10CF10CF20D05-0D0C0D0E-0D100D12-0D3A0D3D0D4E0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E460E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EC60EDC-0EDF0F000F40-0F470F49-0F6C0F88-0F8C1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10A0-10C510C710CD10D0-10FA10FC-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317D717DC1820-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541AA71B05-1B331B45-1B4B1B83-1BA01BAE1BAF1BBA-1BE51C00-1C231C4D-1C4F1C5A-1C7D1CE9-1CEC1CEE-1CF11CF51CF61D00-1DBF1E00-1F151F18-1F1D1F20-1F451F48-1F4D1F50-1F571F591F5B1F5D1F5F-1F7D1F80-1FB41FB6-1FBC1FBE1FC2-1FC41FC6-1FCC1FD0-1FD31FD6-1FDB1FE0-1FEC1FF2-1FF41FF6-1FFC2071207F2090-209C21022107210A-211321152119-211D212421262128212A-212D212F-2139213C-213F2145-2149214E218321842C00-2C2E2C30-2C5E2C60-2CE42CEB-2CEE2CF22CF32D00-2D252D272D2D2D30-2D672D6F2D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE2E2F300530063031-3035303B303C3041-3096309D-309F30A1-30FA30FC-30FF3105-312D3131-318E31A0-31BA31F0-31FF3400-4DB54E00-9FCCA000-A48CA4D0-A4FDA500-A60CA610-A61FA62AA62BA640-A66EA67F-A697A6A0-A6E5A717-A71FA722-A788A78B-A78EA790-A793A7A0-A7AAA7F8-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2A9CFAA00-AA28AA40-AA42AA44-AA4BAA60-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADB-AADDAAE0-AAEAAAF2-AAF4AB01-AB06AB09-AB0EAB11-AB16AB20-AB26AB28-AB2EABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA6DFA70-FAD9FB00-FB06FB13-FB17FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF21-FF3AFF41-FF5AFF66-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC'
						},
						{
							L: 'Letter'
						}
					);

					/* Adds Unicode property syntax to XRegExp: \p{..}, \P{..}, \p{^..}
 */
					XRegExp.addToken(
						/\\([pP]){(\^?)([^}]*)}/,
						function(match, scope) {
							var inv = match[1] === 'P' || match[2] ? '^' : '',
								item = slug(match[3]);
							// The double negative \P{^..} is invalid
							if (match[1] === 'P' && match[2]) {
								throw new SyntaxError('invalid double negation \\P{^');
							}
							if (!unicode.hasOwnProperty(item)) {
								throw new SyntaxError(
									'invalid or unknown Unicode property ' + match[0]
								);
							}
							return scope === 'class'
								? inv ? cacheInversion(item) : unicode[item]
								: '[' + inv + unicode[item] + ']';
						},
						{ scope: 'all' }
					);
				})(XRegExp);

				/***** unicode-categories.js *****/

				/*!
 * XRegExp Unicode Categories v1.2.0
 * (c) 2010-2012 Steven Levithan <http://xregexp.com/>
 * MIT License
 * Uses Unicode 6.1 <http://unicode.org/>
 */

				/**
 * Adds support for all Unicode categories (aka properties) E.g., `\p{Lu}` or
 * `\p{Uppercase Letter}`. Token names are case insensitive, and any spaces, hyphens, and
 * underscores are ignored.
 * @requires XRegExp, XRegExp Unicode Base
 */
				(function(XRegExp) {
					'use strict';

					if (!XRegExp.addUnicodePackage) {
						throw new ReferenceError(
							'Unicode Base must be loaded before Unicode Categories'
						);
					}

					XRegExp.install('extensibility');

					XRegExp.addUnicodePackage(
						{
							//L: "", // Included in the Unicode Base addon
							Ll:
								'0061-007A00B500DF-00F600F8-00FF01010103010501070109010B010D010F01110113011501170119011B011D011F01210123012501270129012B012D012F01310133013501370138013A013C013E014001420144014601480149014B014D014F01510153015501570159015B015D015F01610163016501670169016B016D016F0171017301750177017A017C017E-0180018301850188018C018D019201950199-019B019E01A101A301A501A801AA01AB01AD01B001B401B601B901BA01BD-01BF01C601C901CC01CE01D001D201D401D601D801DA01DC01DD01DF01E101E301E501E701E901EB01ED01EF01F001F301F501F901FB01FD01FF02010203020502070209020B020D020F02110213021502170219021B021D021F02210223022502270229022B022D022F02310233-0239023C023F0240024202470249024B024D024F-02930295-02AF037103730377037B-037D039003AC-03CE03D003D103D5-03D703D903DB03DD03DF03E103E303E503E703E903EB03ED03EF-03F303F503F803FB03FC0430-045F04610463046504670469046B046D046F04710473047504770479047B047D047F0481048B048D048F04910493049504970499049B049D049F04A104A304A504A704A904AB04AD04AF04B104B304B504B704B904BB04BD04BF04C204C404C604C804CA04CC04CE04CF04D104D304D504D704D904DB04DD04DF04E104E304E504E704E904EB04ED04EF04F104F304F504F704F904FB04FD04FF05010503050505070509050B050D050F05110513051505170519051B051D051F05210523052505270561-05871D00-1D2B1D6B-1D771D79-1D9A1E011E031E051E071E091E0B1E0D1E0F1E111E131E151E171E191E1B1E1D1E1F1E211E231E251E271E291E2B1E2D1E2F1E311E331E351E371E391E3B1E3D1E3F1E411E431E451E471E491E4B1E4D1E4F1E511E531E551E571E591E5B1E5D1E5F1E611E631E651E671E691E6B1E6D1E6F1E711E731E751E771E791E7B1E7D1E7F1E811E831E851E871E891E8B1E8D1E8F1E911E931E95-1E9D1E9F1EA11EA31EA51EA71EA91EAB1EAD1EAF1EB11EB31EB51EB71EB91EBB1EBD1EBF1EC11EC31EC51EC71EC91ECB1ECD1ECF1ED11ED31ED51ED71ED91EDB1EDD1EDF1EE11EE31EE51EE71EE91EEB1EED1EEF1EF11EF31EF51EF71EF91EFB1EFD1EFF-1F071F10-1F151F20-1F271F30-1F371F40-1F451F50-1F571F60-1F671F70-1F7D1F80-1F871F90-1F971FA0-1FA71FB0-1FB41FB61FB71FBE1FC2-1FC41FC61FC71FD0-1FD31FD61FD71FE0-1FE71FF2-1FF41FF61FF7210A210E210F2113212F21342139213C213D2146-2149214E21842C30-2C5E2C612C652C662C682C6A2C6C2C712C732C742C76-2C7B2C812C832C852C872C892C8B2C8D2C8F2C912C932C952C972C992C9B2C9D2C9F2CA12CA32CA52CA72CA92CAB2CAD2CAF2CB12CB32CB52CB72CB92CBB2CBD2CBF2CC12CC32CC52CC72CC92CCB2CCD2CCF2CD12CD32CD52CD72CD92CDB2CDD2CDF2CE12CE32CE42CEC2CEE2CF32D00-2D252D272D2DA641A643A645A647A649A64BA64DA64FA651A653A655A657A659A65BA65DA65FA661A663A665A667A669A66BA66DA681A683A685A687A689A68BA68DA68FA691A693A695A697A723A725A727A729A72BA72DA72F-A731A733A735A737A739A73BA73DA73FA741A743A745A747A749A74BA74DA74FA751A753A755A757A759A75BA75DA75FA761A763A765A767A769A76BA76DA76FA771-A778A77AA77CA77FA781A783A785A787A78CA78EA791A793A7A1A7A3A7A5A7A7A7A9A7FAFB00-FB06FB13-FB17FF41-FF5A',
							Lu:
								'0041-005A00C0-00D600D8-00DE01000102010401060108010A010C010E01100112011401160118011A011C011E01200122012401260128012A012C012E01300132013401360139013B013D013F0141014301450147014A014C014E01500152015401560158015A015C015E01600162016401660168016A016C016E017001720174017601780179017B017D018101820184018601870189-018B018E-0191019301940196-0198019C019D019F01A001A201A401A601A701A901AC01AE01AF01B1-01B301B501B701B801BC01C401C701CA01CD01CF01D101D301D501D701D901DB01DE01E001E201E401E601E801EA01EC01EE01F101F401F6-01F801FA01FC01FE02000202020402060208020A020C020E02100212021402160218021A021C021E02200222022402260228022A022C022E02300232023A023B023D023E02410243-02460248024A024C024E03700372037603860388-038A038C038E038F0391-03A103A3-03AB03CF03D2-03D403D803DA03DC03DE03E003E203E403E603E803EA03EC03EE03F403F703F903FA03FD-042F04600462046404660468046A046C046E04700472047404760478047A047C047E0480048A048C048E04900492049404960498049A049C049E04A004A204A404A604A804AA04AC04AE04B004B204B404B604B804BA04BC04BE04C004C104C304C504C704C904CB04CD04D004D204D404D604D804DA04DC04DE04E004E204E404E604E804EA04EC04EE04F004F204F404F604F804FA04FC04FE05000502050405060508050A050C050E05100512051405160518051A051C051E05200522052405260531-055610A0-10C510C710CD1E001E021E041E061E081E0A1E0C1E0E1E101E121E141E161E181E1A1E1C1E1E1E201E221E241E261E281E2A1E2C1E2E1E301E321E341E361E381E3A1E3C1E3E1E401E421E441E461E481E4A1E4C1E4E1E501E521E541E561E581E5A1E5C1E5E1E601E621E641E661E681E6A1E6C1E6E1E701E721E741E761E781E7A1E7C1E7E1E801E821E841E861E881E8A1E8C1E8E1E901E921E941E9E1EA01EA21EA41EA61EA81EAA1EAC1EAE1EB01EB21EB41EB61EB81EBA1EBC1EBE1EC01EC21EC41EC61EC81ECA1ECC1ECE1ED01ED21ED41ED61ED81EDA1EDC1EDE1EE01EE21EE41EE61EE81EEA1EEC1EEE1EF01EF21EF41EF61EF81EFA1EFC1EFE1F08-1F0F1F18-1F1D1F28-1F2F1F38-1F3F1F48-1F4D1F591F5B1F5D1F5F1F68-1F6F1FB8-1FBB1FC8-1FCB1FD8-1FDB1FE8-1FEC1FF8-1FFB21022107210B-210D2110-211221152119-211D212421262128212A-212D2130-2133213E213F214521832C00-2C2E2C602C62-2C642C672C692C6B2C6D-2C702C722C752C7E-2C802C822C842C862C882C8A2C8C2C8E2C902C922C942C962C982C9A2C9C2C9E2CA02CA22CA42CA62CA82CAA2CAC2CAE2CB02CB22CB42CB62CB82CBA2CBC2CBE2CC02CC22CC42CC62CC82CCA2CCC2CCE2CD02CD22CD42CD62CD82CDA2CDC2CDE2CE02CE22CEB2CED2CF2A640A642A644A646A648A64AA64CA64EA650A652A654A656A658A65AA65CA65EA660A662A664A666A668A66AA66CA680A682A684A686A688A68AA68CA68EA690A692A694A696A722A724A726A728A72AA72CA72EA732A734A736A738A73AA73CA73EA740A742A744A746A748A74AA74CA74EA750A752A754A756A758A75AA75CA75EA760A762A764A766A768A76AA76CA76EA779A77BA77DA77EA780A782A784A786A78BA78DA790A792A7A0A7A2A7A4A7A6A7A8A7AAFF21-FF3A',
							Lt: '01C501C801CB01F21F88-1F8F1F98-1F9F1FA8-1FAF1FBC1FCC1FFC',
							Lm:
								'02B0-02C102C6-02D102E0-02E402EC02EE0374037A0559064006E506E607F407F507FA081A0824082809710E460EC610FC17D718431AA71C78-1C7D1D2C-1D6A1D781D9B-1DBF2071207F2090-209C2C7C2C7D2D6F2E2F30053031-3035303B309D309E30FC-30FEA015A4F8-A4FDA60CA67FA717-A71FA770A788A7F8A7F9A9CFAA70AADDAAF3AAF4FF70FF9EFF9F',
							Lo:
								'00AA00BA01BB01C0-01C3029405D0-05EA05F0-05F20620-063F0641-064A066E066F0671-06D306D506EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA0800-08150840-085808A008A2-08AC0904-0939093D09500958-09610972-09770979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10CF10CF20D05-0D0C0D0E-0D100D12-0D3A0D3D0D4E0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E450E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EDC-0EDF0F000F40-0F470F49-0F6C0F88-0F8C1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10D0-10FA10FD-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317DC1820-18421844-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541B05-1B331B45-1B4B1B83-1BA01BAE1BAF1BBA-1BE51C00-1C231C4D-1C4F1C5A-1C771CE9-1CEC1CEE-1CF11CF51CF62135-21382D30-2D672D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE3006303C3041-3096309F30A1-30FA30FF3105-312D3131-318E31A0-31BA31F0-31FF3400-4DB54E00-9FCCA000-A014A016-A48CA4D0-A4F7A500-A60BA610-A61FA62AA62BA66EA6A0-A6E5A7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2AA00-AA28AA40-AA42AA44-AA4BAA60-AA6FAA71-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADBAADCAAE0-AAEAAAF2AB01-AB06AB09-AB0EAB11-AB16AB20-AB26AB28-AB2EABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA6DFA70-FAD9FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF66-FF6FFF71-FF9DFFA0-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC',
							M:
								'0300-036F0483-04890591-05BD05BF05C105C205C405C505C70610-061A064B-065F067006D6-06DC06DF-06E406E706E806EA-06ED07110730-074A07A6-07B007EB-07F30816-0819081B-08230825-08270829-082D0859-085B08E4-08FE0900-0903093A-093C093E-094F0951-0957096209630981-098309BC09BE-09C409C709C809CB-09CD09D709E209E30A01-0A030A3C0A3E-0A420A470A480A4B-0A4D0A510A700A710A750A81-0A830ABC0ABE-0AC50AC7-0AC90ACB-0ACD0AE20AE30B01-0B030B3C0B3E-0B440B470B480B4B-0B4D0B560B570B620B630B820BBE-0BC20BC6-0BC80BCA-0BCD0BD70C01-0C030C3E-0C440C46-0C480C4A-0C4D0C550C560C620C630C820C830CBC0CBE-0CC40CC6-0CC80CCA-0CCD0CD50CD60CE20CE30D020D030D3E-0D440D46-0D480D4A-0D4D0D570D620D630D820D830DCA0DCF-0DD40DD60DD8-0DDF0DF20DF30E310E34-0E3A0E47-0E4E0EB10EB4-0EB90EBB0EBC0EC8-0ECD0F180F190F350F370F390F3E0F3F0F71-0F840F860F870F8D-0F970F99-0FBC0FC6102B-103E1056-1059105E-10601062-10641067-106D1071-10741082-108D108F109A-109D135D-135F1712-17141732-1734175217531772177317B4-17D317DD180B-180D18A91920-192B1930-193B19B0-19C019C819C91A17-1A1B1A55-1A5E1A60-1A7C1A7F1B00-1B041B34-1B441B6B-1B731B80-1B821BA1-1BAD1BE6-1BF31C24-1C371CD0-1CD21CD4-1CE81CED1CF2-1CF41DC0-1DE61DFC-1DFF20D0-20F02CEF-2CF12D7F2DE0-2DFF302A-302F3099309AA66F-A672A674-A67DA69FA6F0A6F1A802A806A80BA823-A827A880A881A8B4-A8C4A8E0-A8F1A926-A92DA947-A953A980-A983A9B3-A9C0AA29-AA36AA43AA4CAA4DAA7BAAB0AAB2-AAB4AAB7AAB8AABEAABFAAC1AAEB-AAEFAAF5AAF6ABE3-ABEAABECABEDFB1EFE00-FE0FFE20-FE26',
							Mn:
								'0300-036F0483-04870591-05BD05BF05C105C205C405C505C70610-061A064B-065F067006D6-06DC06DF-06E406E706E806EA-06ED07110730-074A07A6-07B007EB-07F30816-0819081B-08230825-08270829-082D0859-085B08E4-08FE0900-0902093A093C0941-0948094D0951-095709620963098109BC09C1-09C409CD09E209E30A010A020A3C0A410A420A470A480A4B-0A4D0A510A700A710A750A810A820ABC0AC1-0AC50AC70AC80ACD0AE20AE30B010B3C0B3F0B41-0B440B4D0B560B620B630B820BC00BCD0C3E-0C400C46-0C480C4A-0C4D0C550C560C620C630CBC0CBF0CC60CCC0CCD0CE20CE30D41-0D440D4D0D620D630DCA0DD2-0DD40DD60E310E34-0E3A0E47-0E4E0EB10EB4-0EB90EBB0EBC0EC8-0ECD0F180F190F350F370F390F71-0F7E0F80-0F840F860F870F8D-0F970F99-0FBC0FC6102D-10301032-10371039103A103D103E10581059105E-10601071-1074108210851086108D109D135D-135F1712-17141732-1734175217531772177317B417B517B7-17BD17C617C9-17D317DD180B-180D18A91920-19221927192819321939-193B1A171A181A561A58-1A5E1A601A621A65-1A6C1A73-1A7C1A7F1B00-1B031B341B36-1B3A1B3C1B421B6B-1B731B801B811BA2-1BA51BA81BA91BAB1BE61BE81BE91BED1BEF-1BF11C2C-1C331C361C371CD0-1CD21CD4-1CE01CE2-1CE81CED1CF41DC0-1DE61DFC-1DFF20D0-20DC20E120E5-20F02CEF-2CF12D7F2DE0-2DFF302A-302D3099309AA66FA674-A67DA69FA6F0A6F1A802A806A80BA825A826A8C4A8E0-A8F1A926-A92DA947-A951A980-A982A9B3A9B6-A9B9A9BCAA29-AA2EAA31AA32AA35AA36AA43AA4CAAB0AAB2-AAB4AAB7AAB8AABEAABFAAC1AAECAAEDAAF6ABE5ABE8ABEDFB1EFE00-FE0FFE20-FE26',
							Mc:
								'0903093B093E-09400949-094C094E094F0982098309BE-09C009C709C809CB09CC09D70A030A3E-0A400A830ABE-0AC00AC90ACB0ACC0B020B030B3E0B400B470B480B4B0B4C0B570BBE0BBF0BC10BC20BC6-0BC80BCA-0BCC0BD70C01-0C030C41-0C440C820C830CBE0CC0-0CC40CC70CC80CCA0CCB0CD50CD60D020D030D3E-0D400D46-0D480D4A-0D4C0D570D820D830DCF-0DD10DD8-0DDF0DF20DF30F3E0F3F0F7F102B102C10311038103B103C105610571062-10641067-106D108310841087-108C108F109A-109C17B617BE-17C517C717C81923-19261929-192B193019311933-193819B0-19C019C819C91A19-1A1B1A551A571A611A631A641A6D-1A721B041B351B3B1B3D-1B411B431B441B821BA11BA61BA71BAA1BAC1BAD1BE71BEA-1BEC1BEE1BF21BF31C24-1C2B1C341C351CE11CF21CF3302E302FA823A824A827A880A881A8B4-A8C3A952A953A983A9B4A9B5A9BAA9BBA9BD-A9C0AA2FAA30AA33AA34AA4DAA7BAAEBAAEEAAEFAAF5ABE3ABE4ABE6ABE7ABE9ABEAABEC',
							Me: '0488048920DD-20E020E2-20E4A670-A672',
							N:
								'0030-003900B200B300B900BC-00BE0660-066906F0-06F907C0-07C90966-096F09E6-09EF09F4-09F90A66-0A6F0AE6-0AEF0B66-0B6F0B72-0B770BE6-0BF20C66-0C6F0C78-0C7E0CE6-0CEF0D66-0D750E50-0E590ED0-0ED90F20-0F331040-10491090-10991369-137C16EE-16F017E0-17E917F0-17F91810-18191946-194F19D0-19DA1A80-1A891A90-1A991B50-1B591BB0-1BB91C40-1C491C50-1C5920702074-20792080-20892150-21822185-21892460-249B24EA-24FF2776-27932CFD30073021-30293038-303A3192-31953220-32293248-324F3251-325F3280-328932B1-32BFA620-A629A6E6-A6EFA830-A835A8D0-A8D9A900-A909A9D0-A9D9AA50-AA59ABF0-ABF9FF10-FF19',
							Nd:
								'0030-00390660-066906F0-06F907C0-07C90966-096F09E6-09EF0A66-0A6F0AE6-0AEF0B66-0B6F0BE6-0BEF0C66-0C6F0CE6-0CEF0D66-0D6F0E50-0E590ED0-0ED90F20-0F291040-10491090-109917E0-17E91810-18191946-194F19D0-19D91A80-1A891A90-1A991B50-1B591BB0-1BB91C40-1C491C50-1C59A620-A629A8D0-A8D9A900-A909A9D0-A9D9AA50-AA59ABF0-ABF9FF10-FF19',
							Nl: '16EE-16F02160-21822185-218830073021-30293038-303AA6E6-A6EF',
							No:
								'00B200B300B900BC-00BE09F4-09F90B72-0B770BF0-0BF20C78-0C7E0D70-0D750F2A-0F331369-137C17F0-17F919DA20702074-20792080-20892150-215F21892460-249B24EA-24FF2776-27932CFD3192-31953220-32293248-324F3251-325F3280-328932B1-32BFA830-A835',
							P:
								'0021-00230025-002A002C-002F003A003B003F0040005B-005D005F007B007D00A100A700AB00B600B700BB00BF037E0387055A-055F0589058A05BE05C005C305C605F305F40609060A060C060D061B061E061F066A-066D06D40700-070D07F7-07F90830-083E085E0964096509700AF00DF40E4F0E5A0E5B0F04-0F120F140F3A-0F3D0F850FD0-0FD40FD90FDA104A-104F10FB1360-13681400166D166E169B169C16EB-16ED1735173617D4-17D617D8-17DA1800-180A194419451A1E1A1F1AA0-1AA61AA8-1AAD1B5A-1B601BFC-1BFF1C3B-1C3F1C7E1C7F1CC0-1CC71CD32010-20272030-20432045-20512053-205E207D207E208D208E2329232A2768-277527C527C627E6-27EF2983-299829D8-29DB29FC29FD2CF9-2CFC2CFE2CFF2D702E00-2E2E2E30-2E3B3001-30033008-30113014-301F3030303D30A030FBA4FEA4FFA60D-A60FA673A67EA6F2-A6F7A874-A877A8CEA8CFA8F8-A8FAA92EA92FA95FA9C1-A9CDA9DEA9DFAA5C-AA5FAADEAADFAAF0AAF1ABEBFD3EFD3FFE10-FE19FE30-FE52FE54-FE61FE63FE68FE6AFE6BFF01-FF03FF05-FF0AFF0C-FF0FFF1AFF1BFF1FFF20FF3B-FF3DFF3FFF5BFF5DFF5F-FF65',
							Pd:
								'002D058A05BE140018062010-20152E172E1A2E3A2E3B301C303030A0FE31FE32FE58FE63FF0D',
							Ps:
								'0028005B007B0F3A0F3C169B201A201E2045207D208D23292768276A276C276E27702772277427C527E627E827EA27EC27EE2983298529872989298B298D298F299129932995299729D829DA29FC2E222E242E262E283008300A300C300E3010301430163018301A301DFD3EFE17FE35FE37FE39FE3BFE3DFE3FFE41FE43FE47FE59FE5BFE5DFF08FF3BFF5BFF5FFF62',
							Pe:
								'0029005D007D0F3B0F3D169C2046207E208E232A2769276B276D276F27712773277527C627E727E927EB27ED27EF298429862988298A298C298E2990299229942996299829D929DB29FD2E232E252E272E293009300B300D300F3011301530173019301B301E301FFD3FFE18FE36FE38FE3AFE3CFE3EFE40FE42FE44FE48FE5AFE5CFE5EFF09FF3DFF5DFF60FF63',
							Pi: '00AB2018201B201C201F20392E022E042E092E0C2E1C2E20',
							Pf: '00BB2019201D203A2E032E052E0A2E0D2E1D2E21',
							Pc: '005F203F20402054FE33FE34FE4D-FE4FFF3F',
							Po:
								'0021-00230025-0027002A002C002E002F003A003B003F0040005C00A100A700B600B700BF037E0387055A-055F058905C005C305C605F305F40609060A060C060D061B061E061F066A-066D06D40700-070D07F7-07F90830-083E085E0964096509700AF00DF40E4F0E5A0E5B0F04-0F120F140F850FD0-0FD40FD90FDA104A-104F10FB1360-1368166D166E16EB-16ED1735173617D4-17D617D8-17DA1800-18051807-180A194419451A1E1A1F1AA0-1AA61AA8-1AAD1B5A-1B601BFC-1BFF1C3B-1C3F1C7E1C7F1CC0-1CC71CD3201620172020-20272030-2038203B-203E2041-20432047-205120532055-205E2CF9-2CFC2CFE2CFF2D702E002E012E06-2E082E0B2E0E-2E162E182E192E1B2E1E2E1F2E2A-2E2E2E30-2E393001-3003303D30FBA4FEA4FFA60D-A60FA673A67EA6F2-A6F7A874-A877A8CEA8CFA8F8-A8FAA92EA92FA95FA9C1-A9CDA9DEA9DFAA5C-AA5FAADEAADFAAF0AAF1ABEBFE10-FE16FE19FE30FE45FE46FE49-FE4CFE50-FE52FE54-FE57FE5F-FE61FE68FE6AFE6BFF01-FF03FF05-FF07FF0AFF0CFF0EFF0FFF1AFF1BFF1FFF20FF3CFF61FF64FF65',
							S:
								'0024002B003C-003E005E0060007C007E00A2-00A600A800A900AC00AE-00B100B400B800D700F702C2-02C502D2-02DF02E5-02EB02ED02EF-02FF03750384038503F60482058F0606-0608060B060E060F06DE06E906FD06FE07F609F209F309FA09FB0AF10B700BF3-0BFA0C7F0D790E3F0F01-0F030F130F15-0F170F1A-0F1F0F340F360F380FBE-0FC50FC7-0FCC0FCE0FCF0FD5-0FD8109E109F1390-139917DB194019DE-19FF1B61-1B6A1B74-1B7C1FBD1FBF-1FC11FCD-1FCF1FDD-1FDF1FED-1FEF1FFD1FFE20442052207A-207C208A-208C20A0-20B9210021012103-21062108210921142116-2118211E-2123212521272129212E213A213B2140-2144214A-214D214F2190-2328232B-23F32400-24262440-244A249C-24E92500-26FF2701-27672794-27C427C7-27E527F0-29822999-29D729DC-29FB29FE-2B4C2B50-2B592CE5-2CEA2E80-2E992E9B-2EF32F00-2FD52FF0-2FFB300430123013302030363037303E303F309B309C319031913196-319F31C0-31E33200-321E322A-324732503260-327F328A-32B032C0-32FE3300-33FF4DC0-4DFFA490-A4C6A700-A716A720A721A789A78AA828-A82BA836-A839AA77-AA79FB29FBB2-FBC1FDFCFDFDFE62FE64-FE66FE69FF04FF0BFF1C-FF1EFF3EFF40FF5CFF5EFFE0-FFE6FFE8-FFEEFFFCFFFD',
							Sm:
								'002B003C-003E007C007E00AC00B100D700F703F60606-060820442052207A-207C208A-208C21182140-2144214B2190-2194219A219B21A021A321A621AE21CE21CF21D221D421F4-22FF2308-230B23202321237C239B-23B323DC-23E125B725C125F8-25FF266F27C0-27C427C7-27E527F0-27FF2900-29822999-29D729DC-29FB29FE-2AFF2B30-2B442B47-2B4CFB29FE62FE64-FE66FF0BFF1C-FF1EFF5CFF5EFFE2FFE9-FFEC',
							Sc:
								'002400A2-00A5058F060B09F209F309FB0AF10BF90E3F17DB20A0-20B9A838FDFCFE69FF04FFE0FFE1FFE5FFE6',
							Sk:
								'005E006000A800AF00B400B802C2-02C502D2-02DF02E5-02EB02ED02EF-02FF0375038403851FBD1FBF-1FC11FCD-1FCF1FDD-1FDF1FED-1FEF1FFD1FFE309B309CA700-A716A720A721A789A78AFBB2-FBC1FF3EFF40FFE3',
							So:
								'00A600A900AE00B00482060E060F06DE06E906FD06FE07F609FA0B700BF3-0BF80BFA0C7F0D790F01-0F030F130F15-0F170F1A-0F1F0F340F360F380FBE-0FC50FC7-0FCC0FCE0FCF0FD5-0FD8109E109F1390-1399194019DE-19FF1B61-1B6A1B74-1B7C210021012103-210621082109211421162117211E-2123212521272129212E213A213B214A214C214D214F2195-2199219C-219F21A121A221A421A521A7-21AD21AF-21CD21D021D121D321D5-21F32300-2307230C-231F2322-2328232B-237B237D-239A23B4-23DB23E2-23F32400-24262440-244A249C-24E92500-25B625B8-25C025C2-25F72600-266E2670-26FF2701-27672794-27BF2800-28FF2B00-2B2F2B452B462B50-2B592CE5-2CEA2E80-2E992E9B-2EF32F00-2FD52FF0-2FFB300430123013302030363037303E303F319031913196-319F31C0-31E33200-321E322A-324732503260-327F328A-32B032C0-32FE3300-33FF4DC0-4DFFA490-A4C6A828-A82BA836A837A839AA77-AA79FDFDFFE4FFE8FFEDFFEEFFFCFFFD',
							Z: '002000A01680180E2000-200A20282029202F205F3000',
							Zs: '002000A01680180E2000-200A202F205F3000',
							Zl: '2028',
							Zp: '2029',
							C:
								'0000-001F007F-009F00AD03780379037F-0383038B038D03A20528-05300557055805600588058B-058E059005C8-05CF05EB-05EF05F5-0605061C061D06DD070E070F074B074C07B2-07BF07FB-07FF082E082F083F085C085D085F-089F08A108AD-08E308FF097809800984098D098E0991099209A909B109B3-09B509BA09BB09C509C609C909CA09CF-09D609D8-09DB09DE09E409E509FC-0A000A040A0B-0A0E0A110A120A290A310A340A370A3A0A3B0A3D0A43-0A460A490A4A0A4E-0A500A52-0A580A5D0A5F-0A650A76-0A800A840A8E0A920AA90AB10AB40ABA0ABB0AC60ACA0ACE0ACF0AD1-0ADF0AE40AE50AF2-0B000B040B0D0B0E0B110B120B290B310B340B3A0B3B0B450B460B490B4A0B4E-0B550B58-0B5B0B5E0B640B650B78-0B810B840B8B-0B8D0B910B96-0B980B9B0B9D0BA0-0BA20BA5-0BA70BAB-0BAD0BBA-0BBD0BC3-0BC50BC90BCE0BCF0BD1-0BD60BD8-0BE50BFB-0C000C040C0D0C110C290C340C3A-0C3C0C450C490C4E-0C540C570C5A-0C5F0C640C650C70-0C770C800C810C840C8D0C910CA90CB40CBA0CBB0CC50CC90CCE-0CD40CD7-0CDD0CDF0CE40CE50CF00CF3-0D010D040D0D0D110D3B0D3C0D450D490D4F-0D560D58-0D5F0D640D650D76-0D780D800D810D840D97-0D990DB20DBC0DBE0DBF0DC7-0DC90DCB-0DCE0DD50DD70DE0-0DF10DF5-0E000E3B-0E3E0E5C-0E800E830E850E860E890E8B0E8C0E8E-0E930E980EA00EA40EA60EA80EA90EAC0EBA0EBE0EBF0EC50EC70ECE0ECF0EDA0EDB0EE0-0EFF0F480F6D-0F700F980FBD0FCD0FDB-0FFF10C610C8-10CC10CE10CF1249124E124F12571259125E125F1289128E128F12B112B612B712BF12C112C612C712D7131113161317135B135C137D-137F139A-139F13F5-13FF169D-169F16F1-16FF170D1715-171F1737-173F1754-175F176D17711774-177F17DE17DF17EA-17EF17FA-17FF180F181A-181F1878-187F18AB-18AF18F6-18FF191D-191F192C-192F193C-193F1941-1943196E196F1975-197F19AC-19AF19CA-19CF19DB-19DD1A1C1A1D1A5F1A7D1A7E1A8A-1A8F1A9A-1A9F1AAE-1AFF1B4C-1B4F1B7D-1B7F1BF4-1BFB1C38-1C3A1C4A-1C4C1C80-1CBF1CC8-1CCF1CF7-1CFF1DE7-1DFB1F161F171F1E1F1F1F461F471F4E1F4F1F581F5A1F5C1F5E1F7E1F7F1FB51FC51FD41FD51FDC1FF01FF11FF51FFF200B-200F202A-202E2060-206F20722073208F209D-209F20BA-20CF20F1-20FF218A-218F23F4-23FF2427-243F244B-245F27002B4D-2B4F2B5A-2BFF2C2F2C5F2CF4-2CF82D262D28-2D2C2D2E2D2F2D68-2D6E2D71-2D7E2D97-2D9F2DA72DAF2DB72DBF2DC72DCF2DD72DDF2E3C-2E7F2E9A2EF4-2EFF2FD6-2FEF2FFC-2FFF3040309730983100-3104312E-3130318F31BB-31BF31E4-31EF321F32FF4DB6-4DBF9FCD-9FFFA48D-A48FA4C7-A4CFA62C-A63FA698-A69EA6F8-A6FFA78FA794-A79FA7AB-A7F7A82C-A82FA83A-A83FA878-A87FA8C5-A8CDA8DA-A8DFA8FC-A8FFA954-A95EA97D-A97FA9CEA9DA-A9DDA9E0-A9FFAA37-AA3FAA4EAA4FAA5AAA5BAA7C-AA7FAAC3-AADAAAF7-AB00AB07AB08AB0FAB10AB17-AB1FAB27AB2F-ABBFABEEABEFABFA-ABFFD7A4-D7AFD7C7-D7CAD7FC-F8FFFA6EFA6FFADA-FAFFFB07-FB12FB18-FB1CFB37FB3DFB3FFB42FB45FBC2-FBD2FD40-FD4FFD90FD91FDC8-FDEFFDFEFDFFFE1A-FE1FFE27-FE2FFE53FE67FE6C-FE6FFE75FEFD-FF00FFBF-FFC1FFC8FFC9FFD0FFD1FFD8FFD9FFDD-FFDFFFE7FFEF-FFFBFFFEFFFF',
							Cc: '0000-001F007F-009F',
							Cf:
								'00AD0600-060406DD070F200B-200F202A-202E2060-2064206A-206FFEFFFFF9-FFFB',
							Co: 'E000-F8FF',
							Cs: 'D800-DFFF',
							Cn:
								'03780379037F-0383038B038D03A20528-05300557055805600588058B-058E059005C8-05CF05EB-05EF05F5-05FF0605061C061D070E074B074C07B2-07BF07FB-07FF082E082F083F085C085D085F-089F08A108AD-08E308FF097809800984098D098E0991099209A909B109B3-09B509BA09BB09C509C609C909CA09CF-09D609D8-09DB09DE09E409E509FC-0A000A040A0B-0A0E0A110A120A290A310A340A370A3A0A3B0A3D0A43-0A460A490A4A0A4E-0A500A52-0A580A5D0A5F-0A650A76-0A800A840A8E0A920AA90AB10AB40ABA0ABB0AC60ACA0ACE0ACF0AD1-0ADF0AE40AE50AF2-0B000B040B0D0B0E0B110B120B290B310B340B3A0B3B0B450B460B490B4A0B4E-0B550B58-0B5B0B5E0B640B650B78-0B810B840B8B-0B8D0B910B96-0B980B9B0B9D0BA0-0BA20BA5-0BA70BAB-0BAD0BBA-0BBD0BC3-0BC50BC90BCE0BCF0BD1-0BD60BD8-0BE50BFB-0C000C040C0D0C110C290C340C3A-0C3C0C450C490C4E-0C540C570C5A-0C5F0C640C650C70-0C770C800C810C840C8D0C910CA90CB40CBA0CBB0CC50CC90CCE-0CD40CD7-0CDD0CDF0CE40CE50CF00CF3-0D010D040D0D0D110D3B0D3C0D450D490D4F-0D560D58-0D5F0D640D650D76-0D780D800D810D840D97-0D990DB20DBC0DBE0DBF0DC7-0DC90DCB-0DCE0DD50DD70DE0-0DF10DF5-0E000E3B-0E3E0E5C-0E800E830E850E860E890E8B0E8C0E8E-0E930E980EA00EA40EA60EA80EA90EAC0EBA0EBE0EBF0EC50EC70ECE0ECF0EDA0EDB0EE0-0EFF0F480F6D-0F700F980FBD0FCD0FDB-0FFF10C610C8-10CC10CE10CF1249124E124F12571259125E125F1289128E128F12B112B612B712BF12C112C612C712D7131113161317135B135C137D-137F139A-139F13F5-13FF169D-169F16F1-16FF170D1715-171F1737-173F1754-175F176D17711774-177F17DE17DF17EA-17EF17FA-17FF180F181A-181F1878-187F18AB-18AF18F6-18FF191D-191F192C-192F193C-193F1941-1943196E196F1975-197F19AC-19AF19CA-19CF19DB-19DD1A1C1A1D1A5F1A7D1A7E1A8A-1A8F1A9A-1A9F1AAE-1AFF1B4C-1B4F1B7D-1B7F1BF4-1BFB1C38-1C3A1C4A-1C4C1C80-1CBF1CC8-1CCF1CF7-1CFF1DE7-1DFB1F161F171F1E1F1F1F461F471F4E1F4F1F581F5A1F5C1F5E1F7E1F7F1FB51FC51FD41FD51FDC1FF01FF11FF51FFF2065-206920722073208F209D-209F20BA-20CF20F1-20FF218A-218F23F4-23FF2427-243F244B-245F27002B4D-2B4F2B5A-2BFF2C2F2C5F2CF4-2CF82D262D28-2D2C2D2E2D2F2D68-2D6E2D71-2D7E2D97-2D9F2DA72DAF2DB72DBF2DC72DCF2DD72DDF2E3C-2E7F2E9A2EF4-2EFF2FD6-2FEF2FFC-2FFF3040309730983100-3104312E-3130318F31BB-31BF31E4-31EF321F32FF4DB6-4DBF9FCD-9FFFA48D-A48FA4C7-A4CFA62C-A63FA698-A69EA6F8-A6FFA78FA794-A79FA7AB-A7F7A82C-A82FA83A-A83FA878-A87FA8C5-A8CDA8DA-A8DFA8FC-A8FFA954-A95EA97D-A97FA9CEA9DA-A9DDA9E0-A9FFAA37-AA3FAA4EAA4FAA5AAA5BAA7C-AA7FAAC3-AADAAAF7-AB00AB07AB08AB0FAB10AB17-AB1FAB27AB2F-ABBFABEEABEFABFA-ABFFD7A4-D7AFD7C7-D7CAD7FC-D7FFFA6EFA6FFADA-FAFFFB07-FB12FB18-FB1CFB37FB3DFB3FFB42FB45FBC2-FBD2FD40-FD4FFD90FD91FDC8-FDEFFDFEFDFFFE1A-FE1FFE27-FE2FFE53FE67FE6C-FE6FFE75FEFDFEFEFF00FFBF-FFC1FFC8FFC9FFD0FFD1FFD8FFD9FFDD-FFDFFFE7FFEF-FFF8FFFEFFFF'
						},
						{
							//L: "Letter", // Included in the Unicode Base addon
							Ll: 'Lowercase_Letter',
							Lu: 'Uppercase_Letter',
							Lt: 'Titlecase_Letter',
							Lm: 'Modifier_Letter',
							Lo: 'Other_Letter',
							M: 'Mark',
							Mn: 'Nonspacing_Mark',
							Mc: 'Spacing_Mark',
							Me: 'Enclosing_Mark',
							N: 'Number',
							Nd: 'Decimal_Number',
							Nl: 'Letter_Number',
							No: 'Other_Number',
							P: 'Punctuation',
							Pd: 'Dash_Punctuation',
							Ps: 'Open_Punctuation',
							Pe: 'Close_Punctuation',
							Pi: 'Initial_Punctuation',
							Pf: 'Final_Punctuation',
							Pc: 'Connector_Punctuation',
							Po: 'Other_Punctuation',
							S: 'Symbol',
							Sm: 'Math_Symbol',
							Sc: 'Currency_Symbol',
							Sk: 'Modifier_Symbol',
							So: 'Other_Symbol',
							Z: 'Separator',
							Zs: 'Space_Separator',
							Zl: 'Line_Separator',
							Zp: 'Paragraph_Separator',
							C: 'Other',
							Cc: 'Control',
							Cf: 'Format',
							Co: 'Private_Use',
							Cs: 'Surrogate',
							Cn: 'Unassigned'
						}
					);
				})(XRegExp);

				/***** unicode-scripts.js *****/

				/*!
 * XRegExp Unicode Scripts v1.2.0
 * (c) 2010-2012 Steven Levithan <http://xregexp.com/>
 * MIT License
 * Uses Unicode 6.1 <http://unicode.org/>
 */

				/**
 * Adds support for all Unicode scripts in the Basic Multilingual Plane (U+0000-U+FFFF).
 * E.g., `\p{Latin}`. Token names are case insensitive, and any spaces, hyphens, and underscores
 * are ignored.
 * @requires XRegExp, XRegExp Unicode Base
 */
				(function(XRegExp) {
					'use strict';

					if (!XRegExp.addUnicodePackage) {
						throw new ReferenceError(
							'Unicode Base must be loaded before Unicode Scripts'
						);
					}

					XRegExp.install('extensibility');

					XRegExp.addUnicodePackage({
						Arabic:
							'0600-06040606-060B060D-061A061E0620-063F0641-064A0656-065E066A-066F0671-06DC06DE-06FF0750-077F08A008A2-08AC08E4-08FEFB50-FBC1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFCFE70-FE74FE76-FEFC',
						Armenian: '0531-05560559-055F0561-0587058A058FFB13-FB17',
						Balinese: '1B00-1B4B1B50-1B7C',
						Bamum: 'A6A0-A6F7',
						Batak: '1BC0-1BF31BFC-1BFF',
						Bengali:
							'0981-09830985-098C098F09900993-09A809AA-09B009B209B6-09B909BC-09C409C709C809CB-09CE09D709DC09DD09DF-09E309E6-09FB',
						Bopomofo: '02EA02EB3105-312D31A0-31BA',
						Braille: '2800-28FF',
						Buginese: '1A00-1A1B1A1E1A1F',
						Buhid: '1740-1753',
						Canadian_Aboriginal: '1400-167F18B0-18F5',
						Cham: 'AA00-AA36AA40-AA4DAA50-AA59AA5C-AA5F',
						Cherokee: '13A0-13F4',
						Common:
							'0000-0040005B-0060007B-00A900AB-00B900BB-00BF00D700F702B9-02DF02E5-02E902EC-02FF0374037E038503870589060C061B061F06400660-066906DD096409650E3F0FD5-0FD810FB16EB-16ED173517361802180318051CD31CE11CE9-1CEC1CEE-1CF31CF51CF62000-200B200E-2064206A-20702074-207E2080-208E20A0-20B92100-21252127-2129212C-21312133-214D214F-215F21892190-23F32400-24262440-244A2460-26FF2701-27FF2900-2B4C2B50-2B592E00-2E3B2FF0-2FFB3000-300430063008-30203030-3037303C-303F309B309C30A030FB30FC3190-319F31C0-31E33220-325F327F-32CF3358-33FF4DC0-4DFFA700-A721A788-A78AA830-A839FD3EFD3FFDFDFE10-FE19FE30-FE52FE54-FE66FE68-FE6BFEFFFF01-FF20FF3B-FF40FF5B-FF65FF70FF9EFF9FFFE0-FFE6FFE8-FFEEFFF9-FFFD',
						Coptic: '03E2-03EF2C80-2CF32CF9-2CFF',
						Cyrillic: '0400-04840487-05271D2B1D782DE0-2DFFA640-A697A69F',
						Devanagari: '0900-09500953-09630966-09770979-097FA8E0-A8FB',
						Ethiopic:
							'1200-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A135D-137C1380-13992D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDEAB01-AB06AB09-AB0EAB11-AB16AB20-AB26AB28-AB2E',
						Georgian: '10A0-10C510C710CD10D0-10FA10FC-10FF2D00-2D252D272D2D',
						Glagolitic: '2C00-2C2E2C30-2C5E',
						Greek:
							'0370-03730375-0377037A-037D038403860388-038A038C038E-03A103A3-03E103F0-03FF1D26-1D2A1D5D-1D611D66-1D6A1DBF1F00-1F151F18-1F1D1F20-1F451F48-1F4D1F50-1F571F591F5B1F5D1F5F-1F7D1F80-1FB41FB6-1FC41FC6-1FD31FD6-1FDB1FDD-1FEF1FF2-1FF41FF6-1FFE2126',
						Gujarati:
							'0A81-0A830A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABC-0AC50AC7-0AC90ACB-0ACD0AD00AE0-0AE30AE6-0AF1',
						Gurmukhi:
							'0A01-0A030A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A3C0A3E-0A420A470A480A4B-0A4D0A510A59-0A5C0A5E0A66-0A75',
						Han:
							'2E80-2E992E9B-2EF32F00-2FD5300530073021-30293038-303B3400-4DB54E00-9FCCF900-FA6DFA70-FAD9',
						Hangul:
							'1100-11FF302E302F3131-318E3200-321E3260-327EA960-A97CAC00-D7A3D7B0-D7C6D7CB-D7FBFFA0-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC',
						Hanunoo: '1720-1734',
						Hebrew:
							'0591-05C705D0-05EA05F0-05F4FB1D-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FB4F',
						Hiragana: '3041-3096309D-309F',
						Inherited:
							'0300-036F04850486064B-0655065F0670095109521CD0-1CD21CD4-1CE01CE2-1CE81CED1CF41DC0-1DE61DFC-1DFF200C200D20D0-20F0302A-302D3099309AFE00-FE0FFE20-FE26',
						Javanese: 'A980-A9CDA9CF-A9D9A9DEA9DF',
						Kannada:
							'0C820C830C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBC-0CC40CC6-0CC80CCA-0CCD0CD50CD60CDE0CE0-0CE30CE6-0CEF0CF10CF2',
						Katakana:
							'30A1-30FA30FD-30FF31F0-31FF32D0-32FE3300-3357FF66-FF6FFF71-FF9D',
						Kayah_Li: 'A900-A92F',
						Khmer: '1780-17DD17E0-17E917F0-17F919E0-19FF',
						Lao:
							'0E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB90EBB-0EBD0EC0-0EC40EC60EC8-0ECD0ED0-0ED90EDC-0EDF',
						Latin:
							'0041-005A0061-007A00AA00BA00C0-00D600D8-00F600F8-02B802E0-02E41D00-1D251D2C-1D5C1D62-1D651D6B-1D771D79-1DBE1E00-1EFF2071207F2090-209C212A212B2132214E2160-21882C60-2C7FA722-A787A78B-A78EA790-A793A7A0-A7AAA7F8-A7FFFB00-FB06FF21-FF3AFF41-FF5A',
						Lepcha: '1C00-1C371C3B-1C491C4D-1C4F',
						Limbu: '1900-191C1920-192B1930-193B19401944-194F',
						Lisu: 'A4D0-A4FF',
						Malayalam:
							'0D020D030D05-0D0C0D0E-0D100D12-0D3A0D3D-0D440D46-0D480D4A-0D4E0D570D60-0D630D66-0D750D79-0D7F',
						Mandaic: '0840-085B085E',
						Meetei_Mayek: 'AAE0-AAF6ABC0-ABEDABF0-ABF9',
						Mongolian: '1800180118041806-180E1810-18191820-18771880-18AA',
						Myanmar: '1000-109FAA60-AA7B',
						New_Tai_Lue: '1980-19AB19B0-19C919D0-19DA19DE19DF',
						Nko: '07C0-07FA',
						Ogham: '1680-169C',
						Ol_Chiki: '1C50-1C7F',
						Oriya:
							'0B01-0B030B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3C-0B440B470B480B4B-0B4D0B560B570B5C0B5D0B5F-0B630B66-0B77',
						Phags_Pa: 'A840-A877',
						Rejang: 'A930-A953A95F',
						Runic: '16A0-16EA16EE-16F0',
						Samaritan: '0800-082D0830-083E',
						Saurashtra: 'A880-A8C4A8CE-A8D9',
						Sinhala:
							'0D820D830D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60DCA0DCF-0DD40DD60DD8-0DDF0DF2-0DF4',
						Sundanese: '1B80-1BBF1CC0-1CC7',
						Syloti_Nagri: 'A800-A82B',
						Syriac: '0700-070D070F-074A074D-074F',
						Tagalog: '1700-170C170E-1714',
						Tagbanwa: '1760-176C176E-177017721773',
						Tai_Le: '1950-196D1970-1974',
						Tai_Tham: '1A20-1A5E1A60-1A7C1A7F-1A891A90-1A991AA0-1AAD',
						Tai_Viet: 'AA80-AAC2AADB-AADF',
						Tamil:
							'0B820B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BBE-0BC20BC6-0BC80BCA-0BCD0BD00BD70BE6-0BFA',
						Telugu:
							'0C01-0C030C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D-0C440C46-0C480C4A-0C4D0C550C560C580C590C60-0C630C66-0C6F0C78-0C7F',
						Thaana: '0780-07B1',
						Thai: '0E01-0E3A0E40-0E5B',
						Tibetan:
							'0F00-0F470F49-0F6C0F71-0F970F99-0FBC0FBE-0FCC0FCE-0FD40FD90FDA',
						Tifinagh: '2D30-2D672D6F2D702D7F',
						Vai: 'A500-A62B',
						Yi: 'A000-A48CA490-A4C6'
					});
				})(XRegExp);

				/***** unicode-blocks.js *****/

				/*!
 * XRegExp Unicode Blocks v1.2.0
 * (c) 2010-2012 Steven Levithan <http://xregexp.com/>
 * MIT License
 * Uses Unicode 6.1 <http://unicode.org/>
 */

				/**
 * Adds support for all Unicode blocks in the Basic Multilingual Plane (U+0000-U+FFFF). Unicode
 * blocks use the prefix "In". E.g., `\p{InBasicLatin}`. Token names are case insensitive, and any
 * spaces, hyphens, and underscores are ignored.
 * @requires XRegExp, XRegExp Unicode Base
 */
				(function(XRegExp) {
					'use strict';

					if (!XRegExp.addUnicodePackage) {
						throw new ReferenceError(
							'Unicode Base must be loaded before Unicode Blocks'
						);
					}

					XRegExp.install('extensibility');

					XRegExp.addUnicodePackage({
						InBasic_Latin: '0000-007F',
						InLatin_1_Supplement: '0080-00FF',
						InLatin_Extended_A: '0100-017F',
						InLatin_Extended_B: '0180-024F',
						InIPA_Extensions: '0250-02AF',
						InSpacing_Modifier_Letters: '02B0-02FF',
						InCombining_Diacritical_Marks: '0300-036F',
						InGreek_and_Coptic: '0370-03FF',
						InCyrillic: '0400-04FF',
						InCyrillic_Supplement: '0500-052F',
						InArmenian: '0530-058F',
						InHebrew: '0590-05FF',
						InArabic: '0600-06FF',
						InSyriac: '0700-074F',
						InArabic_Supplement: '0750-077F',
						InThaana: '0780-07BF',
						InNKo: '07C0-07FF',
						InSamaritan: '0800-083F',
						InMandaic: '0840-085F',
						InArabic_Extended_A: '08A0-08FF',
						InDevanagari: '0900-097F',
						InBengali: '0980-09FF',
						InGurmukhi: '0A00-0A7F',
						InGujarati: '0A80-0AFF',
						InOriya: '0B00-0B7F',
						InTamil: '0B80-0BFF',
						InTelugu: '0C00-0C7F',
						InKannada: '0C80-0CFF',
						InMalayalam: '0D00-0D7F',
						InSinhala: '0D80-0DFF',
						InThai: '0E00-0E7F',
						InLao: '0E80-0EFF',
						InTibetan: '0F00-0FFF',
						InMyanmar: '1000-109F',
						InGeorgian: '10A0-10FF',
						InHangul_Jamo: '1100-11FF',
						InEthiopic: '1200-137F',
						InEthiopic_Supplement: '1380-139F',
						InCherokee: '13A0-13FF',
						InUnified_Canadian_Aboriginal_Syllabics: '1400-167F',
						InOgham: '1680-169F',
						InRunic: '16A0-16FF',
						InTagalog: '1700-171F',
						InHanunoo: '1720-173F',
						InBuhid: '1740-175F',
						InTagbanwa: '1760-177F',
						InKhmer: '1780-17FF',
						InMongolian: '1800-18AF',
						InUnified_Canadian_Aboriginal_Syllabics_Extended: '18B0-18FF',
						InLimbu: '1900-194F',
						InTai_Le: '1950-197F',
						InNew_Tai_Lue: '1980-19DF',
						InKhmer_Symbols: '19E0-19FF',
						InBuginese: '1A00-1A1F',
						InTai_Tham: '1A20-1AAF',
						InBalinese: '1B00-1B7F',
						InSundanese: '1B80-1BBF',
						InBatak: '1BC0-1BFF',
						InLepcha: '1C00-1C4F',
						InOl_Chiki: '1C50-1C7F',
						InSundanese_Supplement: '1CC0-1CCF',
						InVedic_Extensions: '1CD0-1CFF',
						InPhonetic_Extensions: '1D00-1D7F',
						InPhonetic_Extensions_Supplement: '1D80-1DBF',
						InCombining_Diacritical_Marks_Supplement: '1DC0-1DFF',
						InLatin_Extended_Additional: '1E00-1EFF',
						InGreek_Extended: '1F00-1FFF',
						InGeneral_Punctuation: '2000-206F',
						InSuperscripts_and_Subscripts: '2070-209F',
						InCurrency_Symbols: '20A0-20CF',
						InCombining_Diacritical_Marks_for_Symbols: '20D0-20FF',
						InLetterlike_Symbols: '2100-214F',
						InNumber_Forms: '2150-218F',
						InArrows: '2190-21FF',
						InMathematical_Operators: '2200-22FF',
						InMiscellaneous_Technical: '2300-23FF',
						InControl_Pictures: '2400-243F',
						InOptical_Character_Recognition: '2440-245F',
						InEnclosed_Alphanumerics: '2460-24FF',
						InBox_Drawing: '2500-257F',
						InBlock_Elements: '2580-259F',
						InGeometric_Shapes: '25A0-25FF',
						InMiscellaneous_Symbols: '2600-26FF',
						InDingbats: '2700-27BF',
						InMiscellaneous_Mathematical_Symbols_A: '27C0-27EF',
						InSupplemental_Arrows_A: '27F0-27FF',
						InBraille_Patterns: '2800-28FF',
						InSupplemental_Arrows_B: '2900-297F',
						InMiscellaneous_Mathematical_Symbols_B: '2980-29FF',
						InSupplemental_Mathematical_Operators: '2A00-2AFF',
						InMiscellaneous_Symbols_and_Arrows: '2B00-2BFF',
						InGlagolitic: '2C00-2C5F',
						InLatin_Extended_C: '2C60-2C7F',
						InCoptic: '2C80-2CFF',
						InGeorgian_Supplement: '2D00-2D2F',
						InTifinagh: '2D30-2D7F',
						InEthiopic_Extended: '2D80-2DDF',
						InCyrillic_Extended_A: '2DE0-2DFF',
						InSupplemental_Punctuation: '2E00-2E7F',
						InCJK_Radicals_Supplement: '2E80-2EFF',
						InKangxi_Radicals: '2F00-2FDF',
						InIdeographic_Description_Characters: '2FF0-2FFF',
						InCJK_Symbols_and_Punctuation: '3000-303F',
						InHiragana: '3040-309F',
						InKatakana: '30A0-30FF',
						InBopomofo: '3100-312F',
						InHangul_Compatibility_Jamo: '3130-318F',
						InKanbun: '3190-319F',
						InBopomofo_Extended: '31A0-31BF',
						InCJK_Strokes: '31C0-31EF',
						InKatakana_Phonetic_Extensions: '31F0-31FF',
						InEnclosed_CJK_Letters_and_Months: '3200-32FF',
						InCJK_Compatibility: '3300-33FF',
						InCJK_Unified_Ideographs_Extension_A: '3400-4DBF',
						InYijing_Hexagram_Symbols: '4DC0-4DFF',
						InCJK_Unified_Ideographs: '4E00-9FFF',
						InYi_Syllables: 'A000-A48F',
						InYi_Radicals: 'A490-A4CF',
						InLisu: 'A4D0-A4FF',
						InVai: 'A500-A63F',
						InCyrillic_Extended_B: 'A640-A69F',
						InBamum: 'A6A0-A6FF',
						InModifier_Tone_Letters: 'A700-A71F',
						InLatin_Extended_D: 'A720-A7FF',
						InSyloti_Nagri: 'A800-A82F',
						InCommon_Indic_Number_Forms: 'A830-A83F',
						InPhags_pa: 'A840-A87F',
						InSaurashtra: 'A880-A8DF',
						InDevanagari_Extended: 'A8E0-A8FF',
						InKayah_Li: 'A900-A92F',
						InRejang: 'A930-A95F',
						InHangul_Jamo_Extended_A: 'A960-A97F',
						InJavanese: 'A980-A9DF',
						InCham: 'AA00-AA5F',
						InMyanmar_Extended_A: 'AA60-AA7F',
						InTai_Viet: 'AA80-AADF',
						InMeetei_Mayek_Extensions: 'AAE0-AAFF',
						InEthiopic_Extended_A: 'AB00-AB2F',
						InMeetei_Mayek: 'ABC0-ABFF',
						InHangul_Syllables: 'AC00-D7AF',
						InHangul_Jamo_Extended_B: 'D7B0-D7FF',
						InHigh_Surrogates: 'D800-DB7F',
						InHigh_Private_Use_Surrogates: 'DB80-DBFF',
						InLow_Surrogates: 'DC00-DFFF',
						InPrivate_Use_Area: 'E000-F8FF',
						InCJK_Compatibility_Ideographs: 'F900-FAFF',
						InAlphabetic_Presentation_Forms: 'FB00-FB4F',
						InArabic_Presentation_Forms_A: 'FB50-FDFF',
						InVariation_Selectors: 'FE00-FE0F',
						InVertical_Forms: 'FE10-FE1F',
						InCombining_Half_Marks: 'FE20-FE2F',
						InCJK_Compatibility_Forms: 'FE30-FE4F',
						InSmall_Form_Variants: 'FE50-FE6F',
						InArabic_Presentation_Forms_B: 'FE70-FEFF',
						InHalfwidth_and_Fullwidth_Forms: 'FF00-FFEF',
						InSpecials: 'FFF0-FFFF'
					});
				})(XRegExp);

				/***** unicode-properties.js *****/

				/*!
 * XRegExp Unicode Properties v1.0.0
 * (c) 2012 Steven Levithan <http://xregexp.com/>
 * MIT License
 * Uses Unicode 6.1 <http://unicode.org/>
 */

				/**
 * Adds Unicode properties necessary to meet Level 1 Unicode support (detailed in UTS#18 RL1.2).
 * Includes code points from the Basic Multilingual Plane (U+0000-U+FFFF) only. Token names are
 * case insensitive, and any spaces, hyphens, and underscores are ignored.
 * @requires XRegExp, XRegExp Unicode Base
 */
				(function(XRegExp) {
					'use strict';

					if (!XRegExp.addUnicodePackage) {
						throw new ReferenceError(
							'Unicode Base must be loaded before Unicode Properties'
						);
					}

					XRegExp.install('extensibility');

					XRegExp.addUnicodePackage({
						Alphabetic:
							'0041-005A0061-007A00AA00B500BA00C0-00D600D8-00F600F8-02C102C6-02D102E0-02E402EC02EE03450370-037403760377037A-037D03860388-038A038C038E-03A103A3-03F503F7-0481048A-05270531-055605590561-058705B0-05BD05BF05C105C205C405C505C705D0-05EA05F0-05F20610-061A0620-06570659-065F066E-06D306D5-06DC06E1-06E806ED-06EF06FA-06FC06FF0710-073F074D-07B107CA-07EA07F407F507FA0800-0817081A-082C0840-085808A008A2-08AC08E4-08E908F0-08FE0900-093B093D-094C094E-09500955-09630971-09770979-097F0981-09830985-098C098F09900993-09A809AA-09B009B209B6-09B909BD-09C409C709C809CB09CC09CE09D709DC09DD09DF-09E309F009F10A01-0A030A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A3E-0A420A470A480A4B0A4C0A510A59-0A5C0A5E0A70-0A750A81-0A830A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD-0AC50AC7-0AC90ACB0ACC0AD00AE0-0AE30B01-0B030B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D-0B440B470B480B4B0B4C0B560B570B5C0B5D0B5F-0B630B710B820B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BBE-0BC20BC6-0BC80BCA-0BCC0BD00BD70C01-0C030C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D-0C440C46-0C480C4A-0C4C0C550C560C580C590C60-0C630C820C830C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD-0CC40CC6-0CC80CCA-0CCC0CD50CD60CDE0CE0-0CE30CF10CF20D020D030D05-0D0C0D0E-0D100D12-0D3A0D3D-0D440D46-0D480D4A-0D4C0D4E0D570D60-0D630D7A-0D7F0D820D830D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60DCF-0DD40DD60DD8-0DDF0DF20DF30E01-0E3A0E40-0E460E4D0E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB90EBB-0EBD0EC0-0EC40EC60ECD0EDC-0EDF0F000F40-0F470F49-0F6C0F71-0F810F88-0F970F99-0FBC1000-10361038103B-103F1050-10621065-1068106E-1086108E109C109D10A0-10C510C710CD10D0-10FA10FC-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A135F1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA16EE-16F01700-170C170E-17131720-17331740-17531760-176C176E-1770177217731780-17B317B6-17C817D717DC1820-18771880-18AA18B0-18F51900-191C1920-192B1930-19381950-196D1970-19741980-19AB19B0-19C91A00-1A1B1A20-1A5E1A61-1A741AA71B00-1B331B35-1B431B45-1B4B1B80-1BA91BAC-1BAF1BBA-1BE51BE7-1BF11C00-1C351C4D-1C4F1C5A-1C7D1CE9-1CEC1CEE-1CF31CF51CF61D00-1DBF1E00-1F151F18-1F1D1F20-1F451F48-1F4D1F50-1F571F591F5B1F5D1F5F-1F7D1F80-1FB41FB6-1FBC1FBE1FC2-1FC41FC6-1FCC1FD0-1FD31FD6-1FDB1FE0-1FEC1FF2-1FF41FF6-1FFC2071207F2090-209C21022107210A-211321152119-211D212421262128212A-212D212F-2139213C-213F2145-2149214E2160-218824B6-24E92C00-2C2E2C30-2C5E2C60-2CE42CEB-2CEE2CF22CF32D00-2D252D272D2D2D30-2D672D6F2D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE2DE0-2DFF2E2F3005-30073021-30293031-30353038-303C3041-3096309D-309F30A1-30FA30FC-30FF3105-312D3131-318E31A0-31BA31F0-31FF3400-4DB54E00-9FCCA000-A48CA4D0-A4FDA500-A60CA610-A61FA62AA62BA640-A66EA674-A67BA67F-A697A69F-A6EFA717-A71FA722-A788A78B-A78EA790-A793A7A0-A7AAA7F8-A801A803-A805A807-A80AA80C-A827A840-A873A880-A8C3A8F2-A8F7A8FBA90A-A92AA930-A952A960-A97CA980-A9B2A9B4-A9BFA9CFAA00-AA36AA40-AA4DAA60-AA76AA7AAA80-AABEAAC0AAC2AADB-AADDAAE0-AAEFAAF2-AAF5AB01-AB06AB09-AB0EAB11-AB16AB20-AB26AB28-AB2EABC0-ABEAAC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA6DFA70-FAD9FB00-FB06FB13-FB17FB1D-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF21-FF3AFF41-FF5AFF66-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC',
						Uppercase:
							'0041-005A00C0-00D600D8-00DE01000102010401060108010A010C010E01100112011401160118011A011C011E01200122012401260128012A012C012E01300132013401360139013B013D013F0141014301450147014A014C014E01500152015401560158015A015C015E01600162016401660168016A016C016E017001720174017601780179017B017D018101820184018601870189-018B018E-0191019301940196-0198019C019D019F01A001A201A401A601A701A901AC01AE01AF01B1-01B301B501B701B801BC01C401C701CA01CD01CF01D101D301D501D701D901DB01DE01E001E201E401E601E801EA01EC01EE01F101F401F6-01F801FA01FC01FE02000202020402060208020A020C020E02100212021402160218021A021C021E02200222022402260228022A022C022E02300232023A023B023D023E02410243-02460248024A024C024E03700372037603860388-038A038C038E038F0391-03A103A3-03AB03CF03D2-03D403D803DA03DC03DE03E003E203E403E603E803EA03EC03EE03F403F703F903FA03FD-042F04600462046404660468046A046C046E04700472047404760478047A047C047E0480048A048C048E04900492049404960498049A049C049E04A004A204A404A604A804AA04AC04AE04B004B204B404B604B804BA04BC04BE04C004C104C304C504C704C904CB04CD04D004D204D404D604D804DA04DC04DE04E004E204E404E604E804EA04EC04EE04F004F204F404F604F804FA04FC04FE05000502050405060508050A050C050E05100512051405160518051A051C051E05200522052405260531-055610A0-10C510C710CD1E001E021E041E061E081E0A1E0C1E0E1E101E121E141E161E181E1A1E1C1E1E1E201E221E241E261E281E2A1E2C1E2E1E301E321E341E361E381E3A1E3C1E3E1E401E421E441E461E481E4A1E4C1E4E1E501E521E541E561E581E5A1E5C1E5E1E601E621E641E661E681E6A1E6C1E6E1E701E721E741E761E781E7A1E7C1E7E1E801E821E841E861E881E8A1E8C1E8E1E901E921E941E9E1EA01EA21EA41EA61EA81EAA1EAC1EAE1EB01EB21EB41EB61EB81EBA1EBC1EBE1EC01EC21EC41EC61EC81ECA1ECC1ECE1ED01ED21ED41ED61ED81EDA1EDC1EDE1EE01EE21EE41EE61EE81EEA1EEC1EEE1EF01EF21EF41EF61EF81EFA1EFC1EFE1F08-1F0F1F18-1F1D1F28-1F2F1F38-1F3F1F48-1F4D1F591F5B1F5D1F5F1F68-1F6F1FB8-1FBB1FC8-1FCB1FD8-1FDB1FE8-1FEC1FF8-1FFB21022107210B-210D2110-211221152119-211D212421262128212A-212D2130-2133213E213F21452160-216F218324B6-24CF2C00-2C2E2C602C62-2C642C672C692C6B2C6D-2C702C722C752C7E-2C802C822C842C862C882C8A2C8C2C8E2C902C922C942C962C982C9A2C9C2C9E2CA02CA22CA42CA62CA82CAA2CAC2CAE2CB02CB22CB42CB62CB82CBA2CBC2CBE2CC02CC22CC42CC62CC82CCA2CCC2CCE2CD02CD22CD42CD62CD82CDA2CDC2CDE2CE02CE22CEB2CED2CF2A640A642A644A646A648A64AA64CA64EA650A652A654A656A658A65AA65CA65EA660A662A664A666A668A66AA66CA680A682A684A686A688A68AA68CA68EA690A692A694A696A722A724A726A728A72AA72CA72EA732A734A736A738A73AA73CA73EA740A742A744A746A748A74AA74CA74EA750A752A754A756A758A75AA75CA75EA760A762A764A766A768A76AA76CA76EA779A77BA77DA77EA780A782A784A786A78BA78DA790A792A7A0A7A2A7A4A7A6A7A8A7AAFF21-FF3A',
						Lowercase:
							'0061-007A00AA00B500BA00DF-00F600F8-00FF01010103010501070109010B010D010F01110113011501170119011B011D011F01210123012501270129012B012D012F01310133013501370138013A013C013E014001420144014601480149014B014D014F01510153015501570159015B015D015F01610163016501670169016B016D016F0171017301750177017A017C017E-0180018301850188018C018D019201950199-019B019E01A101A301A501A801AA01AB01AD01B001B401B601B901BA01BD-01BF01C601C901CC01CE01D001D201D401D601D801DA01DC01DD01DF01E101E301E501E701E901EB01ED01EF01F001F301F501F901FB01FD01FF02010203020502070209020B020D020F02110213021502170219021B021D021F02210223022502270229022B022D022F02310233-0239023C023F0240024202470249024B024D024F-02930295-02B802C002C102E0-02E40345037103730377037A-037D039003AC-03CE03D003D103D5-03D703D903DB03DD03DF03E103E303E503E703E903EB03ED03EF-03F303F503F803FB03FC0430-045F04610463046504670469046B046D046F04710473047504770479047B047D047F0481048B048D048F04910493049504970499049B049D049F04A104A304A504A704A904AB04AD04AF04B104B304B504B704B904BB04BD04BF04C204C404C604C804CA04CC04CE04CF04D104D304D504D704D904DB04DD04DF04E104E304E504E704E904EB04ED04EF04F104F304F504F704F904FB04FD04FF05010503050505070509050B050D050F05110513051505170519051B051D051F05210523052505270561-05871D00-1DBF1E011E031E051E071E091E0B1E0D1E0F1E111E131E151E171E191E1B1E1D1E1F1E211E231E251E271E291E2B1E2D1E2F1E311E331E351E371E391E3B1E3D1E3F1E411E431E451E471E491E4B1E4D1E4F1E511E531E551E571E591E5B1E5D1E5F1E611E631E651E671E691E6B1E6D1E6F1E711E731E751E771E791E7B1E7D1E7F1E811E831E851E871E891E8B1E8D1E8F1E911E931E95-1E9D1E9F1EA11EA31EA51EA71EA91EAB1EAD1EAF1EB11EB31EB51EB71EB91EBB1EBD1EBF1EC11EC31EC51EC71EC91ECB1ECD1ECF1ED11ED31ED51ED71ED91EDB1EDD1EDF1EE11EE31EE51EE71EE91EEB1EED1EEF1EF11EF31EF51EF71EF91EFB1EFD1EFF-1F071F10-1F151F20-1F271F30-1F371F40-1F451F50-1F571F60-1F671F70-1F7D1F80-1F871F90-1F971FA0-1FA71FB0-1FB41FB61FB71FBE1FC2-1FC41FC61FC71FD0-1FD31FD61FD71FE0-1FE71FF2-1FF41FF61FF72071207F2090-209C210A210E210F2113212F21342139213C213D2146-2149214E2170-217F218424D0-24E92C30-2C5E2C612C652C662C682C6A2C6C2C712C732C742C76-2C7D2C812C832C852C872C892C8B2C8D2C8F2C912C932C952C972C992C9B2C9D2C9F2CA12CA32CA52CA72CA92CAB2CAD2CAF2CB12CB32CB52CB72CB92CBB2CBD2CBF2CC12CC32CC52CC72CC92CCB2CCD2CCF2CD12CD32CD52CD72CD92CDB2CDD2CDF2CE12CE32CE42CEC2CEE2CF32D00-2D252D272D2DA641A643A645A647A649A64BA64DA64FA651A653A655A657A659A65BA65DA65FA661A663A665A667A669A66BA66DA681A683A685A687A689A68BA68DA68FA691A693A695A697A723A725A727A729A72BA72DA72F-A731A733A735A737A739A73BA73DA73FA741A743A745A747A749A74BA74DA74FA751A753A755A757A759A75BA75DA75FA761A763A765A767A769A76BA76DA76F-A778A77AA77CA77FA781A783A785A787A78CA78EA791A793A7A1A7A3A7A5A7A7A7A9A7F8-A7FAFB00-FB06FB13-FB17FF41-FF5A',
						White_Space:
							'0009-000D0020008500A01680180E2000-200A20282029202F205F3000',
						Noncharacter_Code_Point: 'FDD0-FDEFFFFEFFFF',
						Default_Ignorable_Code_Point:
							'00AD034F115F116017B417B5180B-180D200B-200F202A-202E2060-206F3164FE00-FE0FFEFFFFA0FFF0-FFF8',
						// \p{Any} matches a code unit. To match any code point via surrogate pairs, use (?:[\0-\uD7FF\uDC00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF])
						Any: '0000-FFFF', // \p{^Any} compiles to [^\u0000-\uFFFF]; [\p{^Any}] to []
						Ascii: '0000-007F',
						// \p{Assigned} is equivalent to \p{^Cn}
						//Assigned: XRegExp("[\\p{^Cn}]").source.replace(/[[\]]|\\u/g, "") // Negation inside a character class triggers inversion
						Assigned:
							'0000-0377037A-037E0384-038A038C038E-03A103A3-05270531-05560559-055F0561-05870589058A058F0591-05C705D0-05EA05F0-05F40600-06040606-061B061E-070D070F-074A074D-07B107C0-07FA0800-082D0830-083E0840-085B085E08A008A2-08AC08E4-08FE0900-09770979-097F0981-09830985-098C098F09900993-09A809AA-09B009B209B6-09B909BC-09C409C709C809CB-09CE09D709DC09DD09DF-09E309E6-09FB0A01-0A030A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A3C0A3E-0A420A470A480A4B-0A4D0A510A59-0A5C0A5E0A66-0A750A81-0A830A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABC-0AC50AC7-0AC90ACB-0ACD0AD00AE0-0AE30AE6-0AF10B01-0B030B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3C-0B440B470B480B4B-0B4D0B560B570B5C0B5D0B5F-0B630B66-0B770B820B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BBE-0BC20BC6-0BC80BCA-0BCD0BD00BD70BE6-0BFA0C01-0C030C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D-0C440C46-0C480C4A-0C4D0C550C560C580C590C60-0C630C66-0C6F0C78-0C7F0C820C830C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBC-0CC40CC6-0CC80CCA-0CCD0CD50CD60CDE0CE0-0CE30CE6-0CEF0CF10CF20D020D030D05-0D0C0D0E-0D100D12-0D3A0D3D-0D440D46-0D480D4A-0D4E0D570D60-0D630D66-0D750D79-0D7F0D820D830D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60DCA0DCF-0DD40DD60DD8-0DDF0DF2-0DF40E01-0E3A0E3F-0E5B0E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB90EBB-0EBD0EC0-0EC40EC60EC8-0ECD0ED0-0ED90EDC-0EDF0F00-0F470F49-0F6C0F71-0F970F99-0FBC0FBE-0FCC0FCE-0FDA1000-10C510C710CD10D0-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A135D-137C1380-139913A0-13F41400-169C16A0-16F01700-170C170E-17141720-17361740-17531760-176C176E-1770177217731780-17DD17E0-17E917F0-17F91800-180E1810-18191820-18771880-18AA18B0-18F51900-191C1920-192B1930-193B19401944-196D1970-19741980-19AB19B0-19C919D0-19DA19DE-1A1B1A1E-1A5E1A60-1A7C1A7F-1A891A90-1A991AA0-1AAD1B00-1B4B1B50-1B7C1B80-1BF31BFC-1C371C3B-1C491C4D-1C7F1CC0-1CC71CD0-1CF61D00-1DE61DFC-1F151F18-1F1D1F20-1F451F48-1F4D1F50-1F571F591F5B1F5D1F5F-1F7D1F80-1FB41FB6-1FC41FC6-1FD31FD6-1FDB1FDD-1FEF1FF2-1FF41FF6-1FFE2000-2064206A-20712074-208E2090-209C20A0-20B920D0-20F02100-21892190-23F32400-24262440-244A2460-26FF2701-2B4C2B50-2B592C00-2C2E2C30-2C5E2C60-2CF32CF9-2D252D272D2D2D30-2D672D6F2D702D7F-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE2DE0-2E3B2E80-2E992E9B-2EF32F00-2FD52FF0-2FFB3000-303F3041-30963099-30FF3105-312D3131-318E3190-31BA31C0-31E331F0-321E3220-32FE3300-4DB54DC0-9FCCA000-A48CA490-A4C6A4D0-A62BA640-A697A69F-A6F7A700-A78EA790-A793A7A0-A7AAA7F8-A82BA830-A839A840-A877A880-A8C4A8CE-A8D9A8E0-A8FBA900-A953A95F-A97CA980-A9CDA9CF-A9D9A9DEA9DFAA00-AA36AA40-AA4DAA50-AA59AA5C-AA7BAA80-AAC2AADB-AAF6AB01-AB06AB09-AB0EAB11-AB16AB20-AB26AB28-AB2EABC0-ABEDABF0-ABF9AC00-D7A3D7B0-D7C6D7CB-D7FBD800-FA6DFA70-FAD9FB00-FB06FB13-FB17FB1D-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBC1FBD3-FD3FFD50-FD8FFD92-FDC7FDF0-FDFDFE00-FE19FE20-FE26FE30-FE52FE54-FE66FE68-FE6BFE70-FE74FE76-FEFCFEFFFF01-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDCFFE0-FFE6FFE8-FFEEFFF9-FFFD'
					});
				})(XRegExp);

				/***** matchrecursive.js *****/

				/*!
 * XRegExp.matchRecursive v0.2.0
 * (c) 2009-2012 Steven Levithan <http://xregexp.com/>
 * MIT License
 */

				(function(XRegExp) {
					'use strict';

					/**
 * Returns a match detail object composed of the provided values.
 * @private
 */
					function row(value, name, start, end) {
						return { value: value, name: name, start: start, end: end };
					}

					/**
 * Returns an array of match strings between outermost left and right delimiters, or an array of
 * objects with detailed match parts and position data. An error is thrown if delimiters are
 * unbalanced within the data.
 * @memberOf XRegExp
 * @param {String} str String to search.
 * @param {String} left Left delimiter as an XRegExp pattern.
 * @param {String} right Right delimiter as an XRegExp pattern.
 * @param {String} [flags] Flags for the left and right delimiters. Use any of: `gimnsxy`.
 * @param {Object} [options] Lets you specify `valueNames` and `escapeChar` options.
 * @returns {Array} Array of matches, or an empty array.
 * @example
 *
 * // Basic usage
 * var str = '(t((e))s)t()(ing)';
 * XRegExp.matchRecursive(str, '\\(', '\\)', 'g');
 * // -> ['t((e))s', '', 'ing']
 *
 * // Extended information mode with valueNames
 * str = 'Here is <div> <div>an</div></div> example';
 * XRegExp.matchRecursive(str, '<div\\s*>', '</div>', 'gi', {
 *   valueNames: ['between', 'left', 'match', 'right']
 * });
 * // -> [
 * // {name: 'between', value: 'Here is ',       start: 0,  end: 8},
 * // {name: 'left',    value: '<div>',          start: 8,  end: 13},
 * // {name: 'match',   value: ' <div>an</div>', start: 13, end: 27},
 * // {name: 'right',   value: '</div>',         start: 27, end: 33},
 * // {name: 'between', value: ' example',       start: 33, end: 41}
 * // ]
 *
 * // Omitting unneeded parts with null valueNames, and using escapeChar
 * str = '...{1}\\{{function(x,y){return y+x;}}';
 * XRegExp.matchRecursive(str, '{', '}', 'g', {
 *   valueNames: ['literal', null, 'value', null],
 *   escapeChar: '\\'
 * });
 * // -> [
 * // {name: 'literal', value: '...', start: 0, end: 3},
 * // {name: 'value',   value: '1',   start: 4, end: 5},
 * // {name: 'literal', value: '\\{', start: 6, end: 8},
 * // {name: 'value',   value: 'function(x,y){return y+x;}', start: 9, end: 35}
 * // ]
 *
 * // Sticky mode via flag y
 * str = '<1><<<2>>><3>4<5>';
 * XRegExp.matchRecursive(str, '<', '>', 'gy');
 * // -> ['1', '<<2>>', '3']
 */
					XRegExp.matchRecursive = function(str, left, right, flags, options) {
						flags = flags || '';
						options = options || {};
						var global = flags.indexOf('g') > -1,
							sticky = flags.indexOf('y') > -1,
							basicFlags = flags.replace(/y/g, ''), // Flag y controlled internally
							escapeChar = options.escapeChar,
							vN = options.valueNames,
							output = [],
							openTokens = 0,
							delimStart = 0,
							delimEnd = 0,
							lastOuterEnd = 0,
							outerStart,
							innerStart,
							leftMatch,
							rightMatch,
							esc;
						left = XRegExp(left, basicFlags);
						right = XRegExp(right, basicFlags);

						if (escapeChar) {
							if (escapeChar.length > 1) {
								throw new SyntaxError(
									"can't use more than one escape character"
								);
							}
							escapeChar = XRegExp.escape(escapeChar);
							// Using XRegExp.union safely rewrites backreferences in `left` and `right`
							esc = new RegExp(
								'(?:' +
									escapeChar +
									'[\\S\\s]|(?:(?!' +
									XRegExp.union([left, right]).source +
									')[^' +
									escapeChar +
									'])+)+',
								flags.replace(/[^im]+/g, '') // Flags gy not needed here; flags nsx handled by XRegExp
							);
						}

						while (true) {
							// If using an escape character, advance to the delimiter's next starting position,
							// skipping any escaped characters in between
							if (escapeChar) {
								delimEnd += (XRegExp.exec(str, esc, delimEnd, 'sticky') || [
									''
								])[0].length;
							}
							leftMatch = XRegExp.exec(str, left, delimEnd);
							rightMatch = XRegExp.exec(str, right, delimEnd);
							// Keep the leftmost match only
							if (leftMatch && rightMatch) {
								if (leftMatch.index <= rightMatch.index) {
									rightMatch = null;
								} else {
									leftMatch = null;
								}
							}
							/* Paths (LM:leftMatch, RM:rightMatch, OT:openTokens):
            LM | RM | OT | Result
            1  | 0  | 1  | loop
            1  | 0  | 0  | loop
            0  | 1  | 1  | loop
            0  | 1  | 0  | throw
            0  | 0  | 1  | throw
            0  | 0  | 0  | break
            * Doesn't include the sticky mode special case
            * Loop ends after the first completed match if `!global` */
							if (leftMatch || rightMatch) {
								delimStart = (leftMatch || rightMatch).index;
								delimEnd = delimStart + (leftMatch || rightMatch)[0].length;
							} else if (!openTokens) {
								break;
							}
							if (sticky && !openTokens && delimStart > lastOuterEnd) {
								break;
							}
							if (leftMatch) {
								if (!openTokens) {
									outerStart = delimStart;
									innerStart = delimEnd;
								}
								++openTokens;
							} else if (rightMatch && openTokens) {
								if (!--openTokens) {
									if (vN) {
										if (vN[0] && outerStart > lastOuterEnd) {
											output.push(
												row(
													vN[0],
													str.slice(lastOuterEnd, outerStart),
													lastOuterEnd,
													outerStart
												)
											);
										}
										if (vN[1]) {
											output.push(
												row(
													vN[1],
													str.slice(outerStart, innerStart),
													outerStart,
													innerStart
												)
											);
										}
										if (vN[2]) {
											output.push(
												row(
													vN[2],
													str.slice(innerStart, delimStart),
													innerStart,
													delimStart
												)
											);
										}
										if (vN[3]) {
											output.push(
												row(
													vN[3],
													str.slice(delimStart, delimEnd),
													delimStart,
													delimEnd
												)
											);
										}
									} else {
										output.push(str.slice(innerStart, delimStart));
									}
									lastOuterEnd = delimEnd;
									if (!global) {
										break;
									}
								}
							} else {
								throw new Error('string contains unbalanced delimiters');
							}
							// If the delimiter matched an empty string, avoid an infinite loop
							if (delimStart === delimEnd) {
								++delimEnd;
							}
						}

						if (global && !sticky && vN && vN[0] && str.length > lastOuterEnd) {
							output.push(
								row(vN[0], str.slice(lastOuterEnd), lastOuterEnd, str.length)
							);
						}

						return output;
					};
				})(XRegExp);

				/***** build.js *****/

				/*!
 * XRegExp.build v0.1.0
 * (c) 2012 Steven Levithan <http://xregexp.com/>
 * MIT License
 * Inspired by RegExp.create by Lea Verou <http://lea.verou.me/>
 */

				(function(XRegExp) {
					'use strict';

					var subparts = /(\()(?!\?)|\\([1-9]\d*)|\\[\s\S]|\[(?:[^\\\]]|\\[\s\S])*]/g,
						parts = XRegExp.union(
							[/\({{([\w$]+)}}\)|{{([\w$]+)}}/, subparts],
							'g'
						);

					/**
 * Strips a leading `^` and trailing unescaped `$`, if both are present.
 * @private
 * @param {String} pattern Pattern to process.
 * @returns {String} Pattern with edge anchors removed.
 */
					function deanchor(pattern) {
						var startAnchor = /^(?:\(\?:\))?\^/, // Leading `^` or `(?:)^` (handles /x cruft)
							endAnchor = /\$(?:\(\?:\))?$/; // Trailing `$` or `$(?:)` (handles /x cruft)
						if (endAnchor.test(pattern.replace(/\\[\s\S]/g, ''))) {
							// Ensure trailing `$` isn't escaped
							return pattern.replace(startAnchor, '').replace(endAnchor, '');
						}
						return pattern;
					}

					/**
 * Converts the provided value to an XRegExp.
 * @private
 * @param {String|RegExp} value Value to convert.
 * @returns {RegExp} XRegExp object with XRegExp syntax applied.
 */
					function asXRegExp(value) {
						return XRegExp.isRegExp(value)
							? value.xregexp && !value.xregexp.isNative
								? value
								: XRegExp(value.source)
							: XRegExp(value);
					}

					/**
 * Builds regexes using named subpatterns, for readability and pattern reuse. Backreferences in the
 * outer pattern and provided subpatterns are automatically renumbered to work correctly. Native
 * flags used by provided subpatterns are ignored in favor of the `flags` argument.
 * @memberOf XRegExp
 * @param {String} pattern XRegExp pattern using `{{name}}` for embedded subpatterns. Allows
 *   `({{name}})` as shorthand for `(?<name>{{name}})`. Patterns cannot be embedded within
 *   character classes.
 * @param {Object} subs Lookup object for named subpatterns. Values can be strings or regexes. A
 *   leading `^` and trailing unescaped `$` are stripped from subpatterns, if both are present.
 * @param {String} [flags] Any combination of XRegExp flags.
 * @returns {RegExp} Regex with interpolated subpatterns.
 * @example
 *
 * var time = XRegExp.build('(?x)^ {{hours}} ({{minutes}}) $', {
 *   hours: XRegExp.build('{{h12}} : | {{h24}}', {
 *     h12: /1[0-2]|0?[1-9]/,
 *     h24: /2[0-3]|[01][0-9]/
 *   }, 'x'),
 *   minutes: /^[0-5][0-9]$/
 * });
 * time.test('10:59'); // -> true
 * XRegExp.exec('10:59', time).minutes; // -> '59'
 */
					XRegExp.build = function(pattern, subs, flags) {
						var inlineFlags = /^\(\?([\w$]+)\)/.exec(pattern),
							data = {},
							numCaps = 0, // Caps is short for captures
							numPriorCaps,
							numOuterCaps = 0,
							outerCapsMap = [0],
							outerCapNames,
							sub,
							p;

						// Add flags within a leading mode modifier to the overall pattern's flags
						if (inlineFlags) {
							flags = flags || '';
							inlineFlags[1].replace(/./g, function(flag) {
								flags += flags.indexOf(flag) > -1 ? '' : flag; // Don't add duplicates
							});
						}

						for (p in subs) {
							if (subs.hasOwnProperty(p)) {
								// Passing to XRegExp enables entended syntax for subpatterns provided as strings
								// and ensures independent validity, lest an unescaped `(`, `)`, `[`, or trailing
								// `\` breaks the `(?:)` wrapper. For subpatterns provided as regexes, it dies on
								// octals and adds the `xregexp` property, for simplicity
								sub = asXRegExp(subs[p]);
								// Deanchoring allows embedding independently useful anchored regexes. If you
								// really need to keep your anchors, double them (i.e., `^^...$$`)
								data[p] = {
									pattern: deanchor(sub.source),
									names: sub.xregexp.captureNames || []
								};
							}
						}

						// Passing to XRegExp dies on octals and ensures the outer pattern is independently valid;
						// helps keep this simple. Named captures will be put back
						pattern = asXRegExp(pattern);
						outerCapNames = pattern.xregexp.captureNames || [];
						pattern = pattern.source.replace(parts, function(
							$0,
							$1,
							$2,
							$3,
							$4
						) {
							var subName = $1 || $2,
								capName,
								intro;
							if (subName) {
								// Named subpattern
								if (!data.hasOwnProperty(subName)) {
									throw new ReferenceError('undefined property ' + $0);
								}
								if ($1) {
									// Named subpattern was wrapped in a capturing group
									capName = outerCapNames[numOuterCaps];
									outerCapsMap[++numOuterCaps] = ++numCaps;
									// If it's a named group, preserve the name. Otherwise, use the subpattern name
									// as the capture name
									intro = '(?<' + (capName || subName) + '>';
								} else {
									intro = '(?:';
								}
								numPriorCaps = numCaps;
								return (
									intro +
									data[subName].pattern.replace(subparts, function(
										match,
										paren,
										backref
									) {
										if (paren) {
											// Capturing group
											capName = data[subName].names[numCaps - numPriorCaps];
											++numCaps;
											if (capName) {
												// If the current capture has a name, preserve the name
												return '(?<' + capName + '>';
											}
										} else if (backref) {
											// Backreference
											return '\\' + (+backref + numPriorCaps); // Rewrite the backreference
										}
										return match;
									}) +
									')'
								);
							}
							if ($3) {
								// Capturing group
								capName = outerCapNames[numOuterCaps];
								outerCapsMap[++numOuterCaps] = ++numCaps;
								if (capName) {
									// If the current capture has a name, preserve the name
									return '(?<' + capName + '>';
								}
							} else if ($4) {
								// Backreference
								return '\\' + outerCapsMap[+$4]; // Rewrite the backreference
							}
							return $0;
						});

						return XRegExp(pattern, flags);
					};
				})(XRegExp);

				/***** prototypes.js *****/

				/*!
 * XRegExp Prototype Methods v1.0.0
 * (c) 2012 Steven Levithan <http://xregexp.com/>
 * MIT License
 */

				/**
 * Adds a collection of methods to `XRegExp.prototype`. RegExp objects copied by XRegExp are also
 * augmented with any `XRegExp.prototype` methods. Hence, the following work equivalently:
 *
 * XRegExp('[a-z]', 'ig').xexec('abc');
 * XRegExp(/[a-z]/ig).xexec('abc');
 * XRegExp.globalize(/[a-z]/i).xexec('abc');
 */
				(function(XRegExp) {
					'use strict';

					/**
 * Copy properties of `b` to `a`.
 * @private
 * @param {Object} a Object that will receive new properties.
 * @param {Object} b Object whose properties will be copied.
 */
					function extend(a, b) {
						for (var p in b) {
							if (b.hasOwnProperty(p)) {
								a[p] = b[p];
							}
						}
						//return a;
					}

					extend(XRegExp.prototype, {
						/**
 * Implicitly calls the regex's `test` method with the first value in the provided arguments array.
 * @memberOf XRegExp.prototype
 * @param {*} context Ignored. Accepted only for congruity with `Function.prototype.apply`.
 * @param {Array} args Array with the string to search as its first value.
 * @returns {Boolean} Whether the regex matched the provided value.
 * @example
 *
 * XRegExp('[a-z]').apply(null, ['abc']); // -> true
 */
						apply: function(context, args) {
							return this.test(args[0]);
						},

						/**
 * Implicitly calls the regex's `test` method with the provided string.
 * @memberOf XRegExp.prototype
 * @param {*} context Ignored. Accepted only for congruity with `Function.prototype.call`.
 * @param {String} str String to search.
 * @returns {Boolean} Whether the regex matched the provided value.
 * @example
 *
 * XRegExp('[a-z]').call(null, 'abc'); // -> true
 */
						call: function(context, str) {
							return this.test(str);
						},

						/**
 * Implicitly calls {@link #XRegExp.forEach}.
 * @memberOf XRegExp.prototype
 * @example
 *
 * XRegExp('\\d').forEach('1a2345', function (match, i) {
 *   if (i % 2) this.push(+match[0]);
 * }, []);
 * // -> [2, 4]
 */
						forEach: function(str, callback, context) {
							return XRegExp.forEach(str, this, callback, context);
						},

						/**
 * Implicitly calls {@link #XRegExp.globalize}.
 * @memberOf XRegExp.prototype
 * @example
 *
 * var globalCopy = XRegExp('regex').globalize();
 * globalCopy.global; // -> true
 */
						globalize: function() {
							return XRegExp.globalize(this);
						},

						/**
 * Implicitly calls {@link #XRegExp.exec}.
 * @memberOf XRegExp.prototype
 * @example
 *
 * var match = XRegExp('U\\+(?<hex>[0-9A-F]{4})').xexec('U+2620');
 * match.hex; // -> '2620'
 */
						xexec: function(str, pos, sticky) {
							return XRegExp.exec(str, this, pos, sticky);
						},

						/**
 * Implicitly calls {@link #XRegExp.test}.
 * @memberOf XRegExp.prototype
 * @example
 *
 * XRegExp('c').xtest('abc'); // -> true
 */
						xtest: function(str, pos, sticky) {
							return XRegExp.test(str, this, pos, sticky);
						}
					});
				})(XRegExp);
			},
			{}
		],
		4: [
			function(require, module, exports) {
				module.exports = {
					t: 'transparent',
					cc: 'currentColor',
					n: 'none',
					aliceblue: 'aliceblue',
					antiquewhite: 'antiquewhite',
					aqua: 'aqua',
					aquamarine: 'aquamarine',
					azure: 'azure',
					beige: 'beige',
					bisque: 'bisque',
					black: 'black',
					blanchedalmond: 'blanchedalmond',
					blue: 'blue',
					blueviolet: 'blueviolet',
					brown: 'brown',
					burlywood: 'burlywood',
					cadetblue: 'cadetblue',
					chartreuse: 'chartreuse',
					chocolate: 'chocolate',
					coral: 'coral',
					cornflowerblue: 'cornflowerblue',
					cornsilk: 'cornsilk',
					crimson: 'crimson',
					cyan: 'cyan',
					darkblue: 'darkblue',
					darkcyan: 'darkcyan',
					darkgoldenrod: 'darkgoldenrod',
					darkgray: 'darkgray',
					darkgreen: 'darkgreen',
					darkgrey: 'darkgrey',
					darkkhaki: 'darkkhaki',
					darkmagenta: 'darkmagenta',
					darkolivegreen: 'darkolivegreen',
					darkorange: 'darkorange',
					darkorchid: 'darkorchid',
					darkred: 'darkred',
					darksalmon: 'darksalmon',
					darkseagreen: 'darkseagreen',
					darkslateblue: 'darkslateblue',
					darkslategray: 'darkslategray',
					darkslategrey: 'darkslategrey',
					darkturquoise: 'darkturquoise',
					darkviolet: 'darkviolet',
					deeppink: 'deeppink',
					deepskyblue: 'deepskyblue',
					dimgray: 'dimgray',
					dimgrey: 'dimgrey',
					dodgerblue: 'dodgerblue',
					firebrick: 'firebrick',
					floralwhite: 'floralwhite',
					forestgreen: 'forestgreen',
					fuchsia: 'fuchsia',
					gainsboro: 'gainsboro',
					ghostwhite: 'ghostwhite',
					gold: 'gold',
					goldenrod: 'goldenrod',
					gray: 'gray',
					green: 'green',
					greenyellow: 'greenyellow',
					grey: 'grey',
					honeydew: 'honeydew',
					hotpink: 'hotpink',
					indianred: 'indianred',
					indigo: 'indigo',
					ivory: 'ivory',
					khaki: 'khaki',
					lavender: 'lavender',
					lavenderblush: 'lavenderblush',
					lawngreen: 'lawngreen',
					lemonchiffon: 'lemonchiffon',
					lightblue: 'lightblue',
					lightcoral: 'lightcoral',
					lightcyan: 'lightcyan',
					lightgoldenrodyellow: 'lightgoldenrodyellow',
					lightgray: 'lightgray',
					lightgreen: 'lightgreen',
					lightgrey: 'lightgrey',
					lightpink: 'lightpink',
					lightsalmon: 'lightsalmon',
					lightseagreen: 'lightseagreen',
					lightskyblue: 'lightskyblue',
					lightslategray: 'lightslategray',
					lightslategrey: 'lightslategrey',
					lightsteelblue: 'lightsteelblue',
					lightyellow: 'lightyellow',
					lime: 'lime',
					limegreen: 'limegreen',
					linen: 'linen',
					magenta: 'magenta',
					maroon: 'maroon',
					mediumaquamarine: 'mediumaquamarine',
					mediumblue: 'mediumblue',
					mediumorchid: 'mediumorchid',
					mediumpurple: 'mediumpurple',
					mediumseagreen: 'mediumseagreen',
					mediumslateblue: 'mediumslateblue',
					mediumspringgreen: 'mediumspringgreen',
					mediumturquoise: 'mediumturquoise',
					mediumvioletred: 'mediumvioletred',
					midnightblue: 'midnightblue',
					mintcream: 'mintcream',
					mistyrose: 'mistyrose',
					moccasin: 'moccasin',
					navajowhite: 'navajowhite',
					navy: 'navy',
					oldlace: 'oldlace',
					olive: 'olive',
					olivedrab: 'olivedrab',
					orange: 'orange',
					orangered: 'orangered',
					orchid: 'orchid',
					palegoldenrod: 'palegoldenrod',
					palegreen: 'palegreen',
					paleturquoise: 'paleturquoise',
					palevioletred: 'palevioletred',
					papayawhip: 'papayawhip',
					peachpuff: 'peachpuff',
					peru: 'peru',
					pink: 'pink',
					plum: 'plum',
					powderblue: 'powderblue',
					purple: 'purple',
					red: 'red',
					rosybrown: 'rosybrown',
					royalblue: 'royalblue',
					saddlebrown: 'saddlebrown',
					salmon: 'salmon',
					sandybrown: 'sandybrown',
					seagreen: 'seagreen',
					seashell: 'seashell',
					sienna: 'sienna',
					silver: 'silver',
					skyblue: 'skyblue',
					slateblue: 'slateblue',
					slategray: 'slategray',
					slategrey: 'slategrey',
					snow: 'snow',
					springgreen: 'springgreen',
					steelblue: 'steelblue',
					tan: 'tan',
					teal: 'teal',
					thistle: 'thistle',
					tomato: 'tomato',
					turquoise: 'turquoise',
					violet: 'violet',
					wheat: 'wheat',
					white: 'white',
					whitesmoke: 'whitesmoke',
					yellow: 'yellow',
					yellowgreen: 'yellowgreen'
				};
			},
			{}
		],
		5: [
			function(require, module, exports) {
				/**
 * ----------------------------------------------------
 * Copyright (c) 2015, Yahoo Inc. All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 * ----------------------------------------------------
 *
 * These are helper classes in Atomic.
 * These classes are tailored to help with common styling patterns in CSS.
 * You can either use the helpers offered by Atomic or create your own
 * set of helper classes.
 *
 * Read more about helper classes here:
 * http://acss.io/guides/helper-classes.html
 **/

				module.exports = [
					/**
    ==================================================================
    Borders
    1px solid borders
    ==================================================================
    */
					// all edges
					{
						type: 'helper',
						name: 'Border',
						matcher: 'Bd',
						noParams: true,
						styles: {
							'border-width': '1px',
							'border-style': 'solid'
						}
					},
					// X axis
					{
						type: 'helper',
						name: 'Border X 1px solid',
						matcher: 'BdX',
						noParams: true,
						styles: {
							'border-top-width': 0,
							'border-right-width': '1px',
							'border-bottom-width': 0,
							'border-left-width': '1px',
							'border-style': 'solid'
						}
					},
					// Y axis
					{
						type: 'helper',
						name: 'Border Y 1px solid',
						matcher: 'BdY',
						noParams: true,
						styles: {
							'border-top-width': '1px',
							'border-right-width': 0,
							'border-bottom-width': '1px',
							'border-left-width': 0,
							'border-style': 'solid'
						}
					},
					// top
					{
						type: 'helper',
						name: 'Border Top 1px solid',
						matcher: 'BdT',
						noParams: true,
						styles: {
							'border-top-width': '1px',
							'border-right-width': 0,
							'border-bottom-width': 0,
							'border-left-width': 0,
							'border-style': 'solid'
						}
					},
					// end
					{
						type: 'helper',
						name: 'Border End 1px solid',
						matcher: 'BdEnd',
						noParams: true,
						styles: {
							'border-top-width': 0,
							'border-__END__-width': '1px',
							'border-bottom-width': 0,
							'border-__START__-width': 0,
							'border-style': 'solid'
						}
					},
					// bottom
					{
						type: 'helper',
						name: 'Border Bottom 1px solid',
						matcher: 'BdB',
						noParams: true,
						styles: {
							'border-top-width': 0,
							'border-right-width': 0,
							'border-bottom-width': '1px',
							'border-left-width': 0,
							'border-style': 'solid'
						}
					},
					// start
					{
						type: 'helper',
						name: 'Border Start 1px solid',
						matcher: 'BdStart',
						noParams: true,
						styles: {
							'border-top-width': 0,
							'border-__END__-width': 0,
							'border-bottom-width': 0,
							'border-__START__-width': '1px',
							'border-style': 'solid'
						}
					},
					/**
    ==================================================================
    BfcHack
    1. this is a hack, it does not make the box grow up to 1600px, just enough
       to fill the container.
    ==================================================================
    */
					{
						type: 'helper',
						name: 'BfcHack',
						matcher: 'BfcHack',
						noParams: true,
						styles: {
							display: 'table-cell',
							width: '1600px' /* 1 */,
							'*width': 'auto',
							zoom: 1
						}
					},
					/**
    ==================================================================
    Clearfix
    ==================================================================
    */
					{
						type: 'helper',
						name: 'Clearfix',
						matcher: 'Cf',
						noParams: true,
						styles: {
							zoom: 1
						},
						rules: {
							'.Cf:before, .Cf:after': {
								content: '" "',
								display: 'table'
							},
							'.Cf:after': {
								clear: 'both'
							}
						}
					},
					/**
    ==================================================================
    Ellipsis
    Single line with ellipsis (see also LineClamp below)
    ==================================================================
    */
					{
						type: 'helper',
						name: 'Ellipsis',
						matcher: 'Ell',
						noParams: true,
						styles: {
							'max-width': '100%',
							'white-space': 'nowrap',
							overflow: 'hidden',
							'text-overflow': 'ellipsis',
							hyphens: 'none'
						},
						rules: {
							'.Ell:after': {
								content: '"."',
								'font-size': 0,
								visibility: 'hidden',
								display: 'inline-block',
								overflow: 'hidden',
								height: 0,
								width: 0
							}
						}
					},
					/**
    ==================================================================
    Hidden
    Hides content from sighted users (accessible to SR users)
    ==================================================================
    */
					{
						type: 'helper',
						name: 'Hidden',
						matcher: 'Hidden',
						noParams: true,
						styles: {
							position: 'absolute !important',
							'*clip': 'rect(1px 1px 1px 1px)',
							clip: 'rect(1px,1px,1px,1px)',
							padding: '0 !important',
							border: '0 !important',
							height: '1px !important',
							width: '1px !important',
							overflow: 'hidden'
						}
					},
					/**
    ==================================================================
    IbBox
    'shortcut' for inline-block construct
    ==================================================================
    */
					{
						type: 'helper',
						name: 'IbBox',
						matcher: 'IbBox',
						noParams: true,
						styles: {
							display: 'inline-block',
							'*display': 'inline',
							zoom: 1,
							'vertical-align': 'top'
						}
					},
					/**
    ==================================================================
    LineClamp
    Truncates multiple line of text across browsers.
    Arguments:
       1. the number of lines you want to display
       2. the max-height to use for the box
    ==================================================================
    */
					{
						type: 'helper',
						name: 'Line clamp',
						matcher: 'LineClamp',
						styles: {
							'-webkit-line-clamp': '$0',
							'max-height': '$1'
						},
						rules: {
							'[class*=LineClamp]': {
								display: '-webkit-box',
								'-webkit-box-orient': 'vertical',
								overflow: 'hidden'
							},
							'a[class*=LineClamp]': {
								display: 'inline-block',
								'display ': '-webkit-box',
								'*display': 'inline',
								zoom: 1
							},
							/**
            * Fix WebKit bug that displays ellipsis in middle of text inside *LINKS*
            * see: https://twitter.com/thierrykoblentz/status/443899465842176000
            * 1. removes that hack out of the flow (bug reported by Fonda)
            */
							'a[class*=LineClamp]:after': {
								content: '"."',
								'font-size': 0,
								visibility: 'hidden',
								display: 'inline-block' /* 1 */,
								overflow: 'hidden' /* 1 */,
								height: 0 /* 1 */,
								width: 0 /* 1 */
							}
						}
					},
					/**
    ==================================================================
    Row
    Meant to contain boxes on a row (from left to right of containing box)
    See: http://cssmojo.com/row_for_grids/
    ==================================================================
    */
					{
						type: 'helper',
						name: 'Row',
						matcher: 'Row',
						noParams: true,
						styles: {
							clear: 'both',
							display: 'inline-block',
							'vertical-align': 'top',
							width: '100%',
							'box-sizing': 'border-box',
							'*display': 'block',
							'*width': 'auto',
							zoom: 1
						}
					},
					/**
    ==================================================================
    StretchedBox
    Stretches a box inside its 'containing block'
    ==================================================================
    */
					{
						type: 'helper',
						name: 'StretchedBox',
						matcher: 'StretchedBox',
						noParams: true,
						styles: {
							position: 'absolute',
							top: 0,
							right: 0,
							bottom: 0,
							left: 0
						}
					},
					/**
    ==================================================================
    Zoom
    hack for oldIE to create a "block-formatting context"
    ==================================================================
    */
					{
						type: 'helper',
						name: 'Zoom',
						matcher: 'Zoom',
						noParams: true,
						styles: {
							zoom: '1'
						}
					}
				];
			},
			{}
		],
		6: [
			function(require, module, exports) {
				'use strict';

				var _ = require('lodash');
				var XRegExp = require('xregexp').XRegExp;

				var PSEUDOS = {
					':active': ':a',
					':checked': ':c',
					':default': ':d',
					':disabled': ':di',
					':empty': ':e',
					':enabled': ':en',
					':first': ':fi',
					':first-child': ':fc',
					':first-of-type': ':fot',
					':fullscreen': ':fs',
					':focus': ':f',
					':hover': ':h',
					':indeterminate': ':ind',
					':in-range': ':ir',
					':invalid': ':inv',
					':last-child': ':lc',
					':last-of-type': ':lot',
					':left': ':l',
					':link': ':li',
					':only-child': ':oc',
					':only-of-type': ':oot',
					':optional': ':o',
					':out-of-range': ':oor',
					':read-only': ':ro',
					':read-write': ':rw',
					':required': ':req',
					':right': ':r',
					':root': ':rt',
					':scope': ':s',
					':target': ':t',
					':valid': ':va',
					':visited': ':vi'
				};

				var PSEUDOS_INVERTED = _.invert(PSEUDOS);
				var PSEUDO_REGEX = [];
				for (var pseudo in PSEUDOS) {
					PSEUDO_REGEX.push(pseudo);
					PSEUDO_REGEX.push(PSEUDOS[pseudo]);
				}
				PSEUDO_REGEX = '(?:' + PSEUDO_REGEX.join('|') + ')(?![a-z])';

				// regular grammar to match valid atomic classes
				var GRAMMAR = {
					BOUNDARY: '(?:^|\\s|"|\'|{|})',
					PARENT: '[a-zA-Z][-_a-zA-Z0-9]+?',
					PARENT_SEP: '[>_+]',
					// all characters allowed to be a prop
					PROP: '[A-Za-z]+',
					// all character allowed to be in values
					VALUES: '[-_,.#$/%0-9a-zA-Z]+',
					FRACTION: '(?<numerator>[0-9]+)\\/(?<denominator>[1-9](?:[0-9]+)?)',
					PARAMS: '\\((?<params>[^)]*)\\)',
					NUMBER: '-?[0-9]+(?:.[0-9]+)?|\\.[0-9]+',
					UNIT: '[a-zA-Z%]+',
					HEX: '#[0-9a-f]{3}(?:[0-9a-f]{3})?',
					ALPHA: '\\.\\d{1,2}',
					IMPORTANT: '!',
					// https://regex101.com/r/mM2vT9/8
					NAMED: '([\\w$]+(?:(?:-(?!\\-))?\\w*)*)',
					PSEUDO: PSEUDO_REGEX,
					PSEUDO_SIMPLE: ':[a-z]+',
					BREAKPOINT: '--(?<breakPoint>[a-z0-9]+)'
				};

				GRAMMAR.PARENT_SELECTOR = [
					// parent (any character that is not a space)
					'(?<parent>',
					GRAMMAR.PARENT,
					')',
					// followed by optional pseudo class
					'(?<parentPseudo>',
					GRAMMAR.PSEUDO,
					')?',
					// followed by either a descendant or direct symbol
					'(?<parentSep>',
					GRAMMAR.PARENT_SEP,
					')'
				].join('');

				GRAMMAR.PARENT_SELECTOR_SIMPLE = [
					// parent (any character that is not a space)
					'(?<parent>',
					GRAMMAR.PARENT,
					')',
					// followed by optional pseudo class
					'(?<parentPseudo>',
					GRAMMAR.PSEUDO_SIMPLE,
					')?',
					// followed by either a descendant or direct symbol
					'(?<parentSep>',
					GRAMMAR.PARENT_SEP,
					')'
				].join('');

				var VALUE_SYNTAXE = XRegExp(
					[
						'(?<fraction>',
						GRAMMAR.FRACTION,
						')',
						'|',
						'(?:',
						'(?<hex>',
						GRAMMAR.HEX,
						')',
						'(?<alpha>',
						GRAMMAR.ALPHA,
						')?',
						'(?!',
						GRAMMAR.UNIT,
						')',
						')',
						'|',
						'(?<number>',
						GRAMMAR.NUMBER,
						')',
						'(?<unit>',
						GRAMMAR.UNIT,
						')?',
						'|',
						'(?<named>',
						GRAMMAR.NAMED,
						')'
					].join('')
				);

				/**
 * sort matchers by descending alphabetical order
 * this is important so "B" doesn't match "Bgc"
 * e.g. Use (Bgc|B) instead of (B|Bgc)
 */
				function getSortedKeys(arr) {
					return arr.length > 1
						? arr
								.sort(function(a, b) {
									return a > b ? -1 : 1;
								})
								.join('|')
						: arr.toString();
				}

				function buildRegex(matchersParams, matchersNoParams) {
					matchersParams = matchersParams
						? '(?<atomicSelector>' +
							matchersParams +
							')\\((?<atomicValues>' +
							GRAMMAR.VALUES +
							')\\)'
						: '';
					matchersNoParams = matchersNoParams
						? '(?<selector>' + matchersNoParams + ')'
						: '';
					return '(?:' + [matchersParams, matchersNoParams].join('|') + ')';
				}

				function Grammar(rules) {
					var matchersParams = [];
					var matchersNoParams = [];
					var matchersParamsStr;
					var matchersNoParamsStr;

					rules.forEach(function(rule) {
						if (rule.noParams) {
							matchersNoParams.push(rule.matcher);
						} else {
							matchersParams.push(rule.matcher);
						}
					});

					matchersParamsStr = getSortedKeys(matchersParams);
					matchersNoParamsStr = getSortedKeys(matchersNoParams);

					this.simpleSyntax = buildRegex(GRAMMAR.PROP, matchersNoParamsStr);
					this.complexSyntax = buildRegex(
						matchersParamsStr,
						matchersNoParamsStr
					);
				}

				/**
 * get non abbreviated pseudo class string given abbreviated or non abbreviated form
 */
				Grammar.getPseudo = function getPseudo(pseudoName) /*:string*/ {
					return PSEUDOS[pseudoName]
						? pseudoName
						: PSEUDOS_INVERTED[pseudoName];
				};

				Grammar.matchValue = function matchValue(value) {
					return XRegExp.exec(value, VALUE_SYNTAXE);
				};

				Grammar.prototype.getSyntax = function getSyntax(isSimple) /*:string*/ {
					var syntax = [
						// word boundary
						GRAMMAR.BOUNDARY,
						'(',
						// optional parent
						'(?<parentSelector>',
						isSimple ? GRAMMAR.PARENT_SELECTOR_SIMPLE : GRAMMAR.PARENT_SELECTOR,
						')?',
						// the main syntax
						isSimple ? this.simpleSyntax : this.complexSyntax,
						'(?<important>',
						GRAMMAR.IMPORTANT,
						')?',
						// optional pseudo
						'(?<valuePseudo>',
						isSimple ? GRAMMAR.PSEUDO_SIMPLE : GRAMMAR.PSEUDO,
						')?',
						// optional modifier
						'(?:',
						GRAMMAR.BREAKPOINT,
						')?',
						')'
					].join('');

					return XRegExp(syntax, 'g');
				};

				module.exports = Grammar;
			},
			{ lodash: 1, xregexp: 3 }
		],
		7: [
			function(require, module, exports) {
				/**
 * Utility functions to handle JSS objects (JS literal objects with similar CSS structure)
 */
				var utils = require('./utils');
				var JSS = {};

				// returns a new JSS with flattened selectors
				JSS.flattenSelectors = function(
					newJss /*:Jss*/,
					jss /*:Jss*/,
					parent /*:string*/
				) {
					var props;
					var value;
					var selector;

					parent = parent || '';
					selector = parent;

					for (var rule in jss) {
						props = jss[rule];
						for (var prop in props) {
							value = props[prop];
							// prop is not a prop
							if (typeof value === 'object') {
								// prop is a media query
								if (/^@media/.test(prop)) {
									if (!newJss[prop]) {
										newJss[prop] = {};
									}
									newJss[prop][parent ? parent + ' ' + rule : rule] = value;
								} else {
									JSS.flattenSelectors(
										newJss,
										props,
										parent ? parent + ' ' + rule : rule
									);
								}
							} else {
								// prop is prop
								/*if (typeof value === 'string' || typeof value === 'number')*/ selector = parent
									? parent + ' ' + rule
									: rule;
								if (!newJss[selector]) {
									newJss[selector] = {};
								}
								newJss[selector][prop] = value;
							}
						}
					}
					return newJss;
				};

				// read a flat JSS and build an Extracted object
				JSS.extractProperties = function(
					extracted /*:Extracted*/,
					jss /*:JssFlat*/,
					block /*:string*/
				) /*:Extracted*/ {
					var props;
					var prop;
					var extract;

					block = block || 'main';

					for (var selector in jss) {
						props = jss[selector];
						// if selector is a media query
						if (/^@media/.test(selector)) {
							JSS.extractProperties(extracted, props, selector);
						} else {
							for (prop in props) {
								if (!extracted[block]) {
									extracted[block] = [];
								}
								extracted[block].push({
									selector: selector,
									prop: prop,
									value: props[prop]
								});
							}
						}
					}

					return extracted;
				};

				// combine selectors in an extracted object
				JSS.combineSelectors = function(
					extracted /*:Extracted*/
				) /*:Extracted*/ {
					var extracts;
					for (var block in extracted) {
						extracts = extracted[block];
						for (var i = 0, l = extracts.length; i < l; i += 1) {
							// If this selector has an escaped colon, we can't safely combine it
							// with another selector since it will break in IE < 8
							if (
								extracts[i].selector &&
								extracts[i].selector.indexOf(':') > -1
							) {
								continue;
							}
							for (var j = i + 1; j < l; j += 1) {
								// If this selector has an escaped colon, we can't safely combine it
								// with another selector since it will break in IE < 8
								if (
									extracts[j].selector &&
									extracts[j].selector.indexOf(':') > -1
								) {
									continue;
								}
								// combine if prop and value match
								if (
									extracts[i].prop === extracts[j].prop &&
									extracts[i].value === extracts[j].value
								) {
									if (extracts[j].selector) {
										extracts[i].selector += ', ' + extracts[j].selector;
									} else {
										extracts[i].selector = false;
									}
									extracts[j].selector = false; // marking for removal
								}
							}
						}
					}
					return extracted;
				};

				JSS.extractedToStylesheet = function(
					extracted /*:Extracted*/
				) /*:Stylesheet*/ {
					var stylesheet = {};

					for (var block in extracted) {
						extracted[block].forEach(function(extracts) {
							if (extracts.selector) {
								if (!stylesheet[block]) {
									stylesheet[block] = {};
								}
								if (!stylesheet[block][extracts.selector]) {
									stylesheet[block][extracts.selector] = {};
								}
								stylesheet[block][extracts.selector][extracts.prop] =
									extracts.value;
							}
						});
					}

					return stylesheet;
				};

				// transforms jss to css
				JSS.jssToCss = function(jss /*:Jss*/, options /*:Options*/) {
					var css = [];
					var extracted /*:Extracted*/;
					var stylesheet /*:Stylesheet*/;
					var tab =
						(options &&
							options.tabWidth &&
							utils.repeatString(' ', parseInt(options.tabWidth, 10))) ||
						utils.repeatString(' ', 2);
					var ruleTab = '';

					// flatten nested selectors
					jss = JSS.flattenSelectors({}, jss);

					// extract properties
					extracted = JSS.extractProperties({}, jss);

					// combine the selectors in the stylesheet
					extracted = JSS.combineSelectors(extracted);

					// build stylesheet object from extract
					stylesheet = JSS.extractedToStylesheet(extracted);

					// finally, write css
					for (var block in stylesheet) {
						if (block !== 'main') {
							ruleTab = tab;
							css.push(block + ' {');
						}
						for (var selector in stylesheet[block]) {
							css.push(ruleTab + selector + ' {');
							for (var prop in stylesheet[block][selector]) {
								css.push(
									ruleTab +
										tab +
										prop +
										': ' +
										stylesheet[block][selector][prop] +
										';'
								);
							}
							css.push(ruleTab + '}');
						}
						if (block !== 'main') {
							css.push('}');
						}
					}

					css = css.length > 0 ? css.join('\n') + '\n' : '';

					return css;
				};

				module.exports = JSS;
			},
			{ './utils': 8 }
		],
		8: [
			function(require, module, exports) {
				var _ = require('lodash');

				var utils = {};

				// hex value to rgb object
				utils.hexToRgb = function(hex /*:string*/) /*:Rgb*/ {
					var result;

					// shorthand to full form
					hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(
						m,
						r,
						g,
						b
					) {
						return r + r + g + g + b + b;
					});

					result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
					return result
						? {
								r: parseInt(result[1], 16),
								g: parseInt(result[2], 16),
								b: parseInt(result[3], 16)
							}
						: null;
				};

				/**
 * helper function to handle merging array of strings
 * @param  {mixed} a Data of the first merge param
 * @param  {mixed} b Data of the second merge param
 * @return {mixed}   The merged array
 */
				utils.handleMergeArrays = function(a, b) {
					if (_.isArray(a) && _.isArray(b)) {
						return _.union(a, b);
					}
				};

				// merge atomizer configs into a single config
				utils.mergeConfigs = function(configs /*:Config[]*/) /*:Config*/ {
					// TODO: Offer option to warn on conflicts
					return _.merge.apply(null, configs.concat(utils.handleMergeArrays));
				};

				// returns a repeated string by X amount
				utils.repeatString = function(pattern /*:string*/, count /*:integer*/) {
					var result = '';
					if (count < 1) {
						return result;
					}
					while (count > 1) {
						if (count & 1) {
							result += pattern;
						}
						(count >>= 1), (pattern += pattern);
					}
					return result + pattern;
				};

				module.exports = utils;
			},
			{ lodash: 1 }
		],
		9: [
			function(require, module, exports) {
				/**
 * ----------------------------------------------------
 * Copyright (c) 2015, Yahoo Inc. All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 * ----------------------------------------------------
 *
 * These are the main Atomic CSS rules.
 * By default, all rules accept "inh" ("inherit").
 *
 * Please submit a PR if you find any missing rule.
 *
 * Most abbreviations are based on Emmet:
 * http://docs.emmet.io/cheat-sheet/
 *
 * Read more about abbreviations here:
 * http://acss.io/guides/syntax.html
 *
 * NOTES:
 *
 * Depending on the selector you use to namespace these rules (id versus class),
 * their style weight will be either 0,1,1,0 or 0,0,2,0. We suggest using an id
 * for the extra specificity.
 *
 * - look for top/right/bottom/left rules in the "offset" section.
 * - we do *not* use left and right as keywords for class names, instead we use
 *   "start" and "end".
 * - Rules is written as an array because ORDER is important for the CSS generation.
 **/

				var colors = require('./colors');

				module.exports = [
					/**
    ==================================================================
    ANIMATION
    ==================================================================
    */
					{
						type: 'pattern',
						id: 'animation',
						name: 'Animation',
						matcher: 'Anim',
						allowParamToValue: true,
						styles: {
							animation: '$0'
						}
					},
					{
						type: 'pattern',
						id: 'animation-delay',
						name: 'Animation delay',
						matcher: 'Animdel',
						allowParamToValue: true,
						styles: {
							'animation-delay': '$0'
						}
					},
					{
						type: 'pattern',
						id: 'animation-direction',
						name: 'Animation direction',
						matcher: 'Animdir',
						allowParamToValue: false,
						styles: {
							'animation-direction': '$0'
						},
						arguments: [
							{
								a: 'alternate',
								ar: 'alternate-reverse',
								n: 'normal',
								r: 'reverse'
							}
						]
					},
					{
						type: 'pattern',
						id: 'animation-duration',
						name: 'Animation duration',
						matcher: 'Animdur',
						allowParamToValue: true,
						styles: {
							'animation-duration': '$0'
						}
					},
					{
						type: 'pattern',
						id: 'animation-fill-mode',
						name: 'Animation fill mode',
						matcher: 'Animfm',
						allowParamToValue: false,
						styles: {
							'animation-fill-mode': '$0'
						},
						arguments: [
							{
								b: 'backwards',
								bo: 'both',
								f: 'forwards',
								n: 'none'
							}
						]
					},
					{
						type: 'pattern',
						id: 'animation-iteration-count',
						name: 'Animation iteration count',
						matcher: 'Animic',
						allowParamToValue: true,
						styles: {
							'animation-iteration-count': '$0'
						},
						arguments: [
							{
								i: 'infinite'
							}
						]
					},
					{
						type: 'pattern',
						id: 'animation-name',
						name: 'Animation name',
						matcher: 'Animn',
						allowParamToValue: true,
						styles: {
							'animation-name': '$0'
						},
						arguments: [
							{
								n: 'none'
							}
						]
					},
					{
						type: 'pattern',
						id: 'animation-play-state',
						name: 'Animation play state',
						matcher: 'Animps',
						allowParamToValue: false,
						styles: {
							'animation-play-state': '$0'
						},
						arguments: [
							{
								p: 'paused',
								r: 'running'
							}
						]
					},
					{
						type: 'pattern',
						id: 'animation-timing-function',
						name: 'Animation timing function',
						matcher: 'Animtf',
						allowParamToValue: false,
						styles: {
							'animation-timing-function': '$0'
						},
						arguments: [
							{
								e: 'ease',
								ei: 'ease-in',
								eo: 'ease-out',
								eio: 'ease-in-out',
								l: 'linear',
								se: 'step-end',
								ss: 'step-start'
							}
						]
					},
					/**
    ==================================================================
    BORDERS
    ==================================================================
    */
					// all edges
					{
						type: 'pattern',
						name: 'Border',
						matcher: 'Bd',
						allowParamToValue: false,
						styles: {
							border: '$0'
						},
						arguments: [
							{
								'0': 0,
								n: 'none'
							}
						]
					},
					// X axis
					{
						type: 'pattern',
						name: 'Border X',
						matcher: 'Bdx',
						allowParamToValue: false,
						styles: {
							'border-__START__': '$0',
							'border-__END__': '$0'
						}
					},
					// Y axis
					{
						type: 'pattern',
						name: 'Border Y',
						matcher: 'Bdy',
						allowParamToValue: false,
						styles: {
							'border-top': '$0',
							'border-bottom': '$0'
						}
					},
					// top
					{
						type: 'pattern',
						name: 'Border top',
						matcher: 'Bdt',
						allowParamToValue: false,
						styles: {
							'border-top': '$0'
						}
					},
					// end
					{
						type: 'pattern',
						name: 'Border end',
						matcher: 'Bdend',
						allowParamToValue: false,
						styles: {
							'border-__END__': '$0'
						}
					},
					// bottom
					{
						type: 'pattern',
						name: 'Border bottom',
						matcher: 'Bdb',
						allowParamToValue: false,
						styles: {
							'border-bottom': '$0'
						}
					},
					// start
					{
						type: 'pattern',
						name: 'Border start',
						matcher: 'Bdstart',
						allowParamToValue: false,
						styles: {
							'border-__START__': '$0'
						}
					},
					/**
    ==================================================================
    BORDER COLOR
    ==================================================================
    */
					// all edges
					{
						type: 'pattern',
						name: 'Border color',
						matcher: 'Bdc',
						allowParamToValue: true,
						styles: {
							'border-color': '$0'
						},
						arguments: [colors]
					},
					// top
					{
						type: 'pattern',
						name: 'Border top color',
						matcher: 'Bdtc',
						allowParamToValue: true,
						styles: {
							'border-top-color': '$0'
						},
						arguments: [colors]
					},
					// end
					{
						type: 'pattern',
						name: 'Border end color',
						matcher: 'Bdendc',
						allowParamToValue: true,
						styles: {
							'border-__END__-color': '$0'
						},
						arguments: [colors]
					},
					// bottom
					{
						type: 'pattern',
						name: 'Border bottom color',
						matcher: 'Bdbc',
						allowParamToValue: true,
						styles: {
							'border-bottom-color': '$0'
						},
						arguments: [colors]
					},
					// start
					{
						type: 'pattern',
						name: 'Border start color',
						matcher: 'Bdstartc',
						allowParamToValue: true,
						styles: {
							'border-__START__-color': '$0'
						},
						arguments: [colors]
					},
					/**
    ==================================================================
    BORDER SPACING
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Border spacing',
						matcher: 'Bdsp',
						allowParamToValue: true,
						styles: {
							'border-spacing': '$0 $1'
						},
						arguments: [
							{
								i: 'inherit'
							}
						]
					},
					/**
    ==================================================================
    BORDER STYLE
    ==================================================================
    */
					// all edges
					{
						type: 'pattern',
						name: 'Border style',
						matcher: 'Bds',
						allowParamToValue: false,
						styles: {
							'border-style': '$0'
						},
						arguments: [
							{
								d: 'dotted',
								da: 'dashed',
								do: 'double',
								g: 'groove',
								h: 'hidden',
								i: 'inset',
								n: 'none',
								o: 'outset',
								r: 'ridge',
								s: 'solid'
							}
						]
					},
					// top
					{
						type: 'pattern',
						name: 'Border top style',
						matcher: 'Bdts',
						allowParamToValue: false,
						styles: {
							'border-top-style': '$0'
						},
						arguments: [
							{
								d: 'dotted',
								da: 'dashed',
								do: 'double',
								g: 'groove',
								h: 'hidden',
								i: 'inset',
								n: 'none',
								o: 'outset',
								r: 'ridge',
								s: 'solid'
							}
						]
					},
					// end
					{
						type: 'pattern',
						name: 'Border end style',
						matcher: 'Bdends',
						allowParamToValue: false,
						styles: {
							'border-__END__-style': '$0'
						},
						arguments: [
							{
								d: 'dotted',
								da: 'dashed',
								do: 'double',
								g: 'groove',
								h: 'hidden',
								i: 'inset',
								n: 'none',
								o: 'outset',
								r: 'ridge',
								s: 'solid'
							}
						]
					},
					// bottom
					{
						type: 'pattern',
						name: 'Border bottom style',
						matcher: 'Bdbs',
						allowParamToValue: false,
						styles: {
							'border-bottom-style': '$0'
						},
						arguments: [
							{
								d: 'dotted',
								da: 'dashed',
								do: 'double',
								g: 'groove',
								h: 'hidden',
								i: 'inset',
								n: 'none',
								o: 'outset',
								r: 'ridge',
								s: 'solid'
							}
						]
					},
					// start
					{
						type: 'pattern',
						name: 'Border start style',
						matcher: 'Bdstarts',
						allowParamToValue: false,
						styles: {
							'border-__START__-style': '$0'
						},
						arguments: [
							{
								d: 'dotted',
								da: 'dashed',
								do: 'double',
								g: 'groove',
								h: 'hidden',
								i: 'inset',
								n: 'none',
								o: 'outset',
								r: 'ridge',
								s: 'solid'
							}
						]
					},
					/**
    ==================================================================
    BORDER WIDTH
    ==================================================================
    */
					// all edges
					{
						type: 'pattern',
						name: 'Border width',
						matcher: 'Bdw',
						allowParamToValue: true,
						styles: {
							'border-width': '$0'
						},
						arguments: [
							{
								m: 'medium',
								t: 'thin',
								th: 'thick'
							}
						]
					},
					// top
					{
						type: 'pattern',
						name: 'Border top width',
						matcher: 'Bdtw',
						allowParamToValue: true,
						styles: {
							'border-top-width': '$0'
						},
						arguments: [
							{
								m: 'medium',
								t: 'thin',
								th: 'thick'
							}
						]
					},
					// end
					{
						type: 'pattern',
						name: 'Border end width',
						matcher: 'Bdendw',
						allowParamToValue: true,
						styles: {
							'border-__END__-width': '$0'
						},
						arguments: [
							{
								m: 'medium',
								t: 'thin',
								th: 'thick'
							}
						]
					},
					// bottom
					{
						type: 'pattern',
						name: 'Border bottom width',
						matcher: 'Bdbw',
						allowParamToValue: true,
						styles: {
							'border-bottom-width': '$0'
						},
						arguments: [
							{
								m: 'medium',
								t: 'thin',
								th: 'thick'
							}
						]
					},
					// start
					{
						type: 'pattern',
						name: 'Border start width',
						matcher: 'Bdstartw',
						allowParamToValue: true,
						styles: {
							'border-__START__-width': '$0'
						},
						arguments: [
							{
								m: 'medium',
								t: 'thin',
								th: 'thick'
							}
						]
					},
					/**
    ==================================================================
    BORDER RADIUS
    ==================================================================
    */
					// all corners
					{
						type: 'pattern',
						name: 'Border radius',
						matcher: 'Bdrs',
						allowParamToValue: true,
						styles: {
							'border-radius': '$0'
						}
					},
					// top-right
					{
						type: 'pattern',
						name: 'Border radius top right',
						matcher: 'Bdrstend',
						allowParamToValue: true,
						styles: {
							'border-top-__END__-radius': '$0'
						}
					},
					// bottom-right
					{
						type: 'pattern',
						name: 'Border radius bottom right',
						matcher: 'Bdrsbend',
						allowParamToValue: true,
						styles: {
							'border-bottom-__END__-radius': '$0'
						}
					},
					// bottom-left
					{
						type: 'pattern',
						name: 'Border radius bottom left',
						matcher: 'Bdrsbstart',
						allowParamToValue: true,
						styles: {
							'border-bottom-__START__-radius': '$0'
						}
					},
					// top-left
					{
						type: 'pattern',
						name: 'Border radius top left',
						matcher: 'Bdrststart',
						allowParamToValue: true,
						styles: {
							'border-top-__START__-radius': '$0'
						}
					},
					/**
    ==================================================================
    BACKGROUNDS
    ==================================================================
    */
					// background
					{
						type: 'pattern',
						name: 'Background',
						matcher: 'Bg',
						allowParamToValue: false,
						styles: {
							background: '$0'
						},
						arguments: [
							{
								n: 'none',
								t: 'transparent'
							}
						]
					},
					// background-image
					{
						type: 'pattern',
						name: 'Background image',
						matcher: 'Bgi',
						allowParamToValue: false,
						styles: {
							'background-image': '$0'
						},
						arguments: [
							{
								n: 'none'
							}
						]
					},
					// background-color
					{
						type: 'pattern',
						name: 'Background color',
						matcher: 'Bgc',
						allowParamToValue: true,
						styles: {
							'background-color': '$0'
						},
						arguments: [colors]
					},
					// background-clip
					{
						type: 'pattern',
						name: 'Background clip',
						matcher: 'Bgcp',
						allowParamToValue: false,
						styles: {
							'background-clip': '$0'
						},
						arguments: [
							{
								bb: 'border-box',
								cb: 'content-box',
								pb: 'padding-box'
							}
						]
					},
					// background-origin
					{
						type: 'pattern',
						name: 'Background origin',
						matcher: 'Bgo',
						allowParamToValue: false,
						styles: {
							'background-origin': '$0'
						},
						arguments: [
							{
								bb: 'border-box',
								cb: 'content-box',
								pb: 'padding-box'
							}
						]
					},
					// background-size
					{
						type: 'pattern',
						name: 'Background size',
						matcher: 'Bgz',
						allowParamToValue: true,
						styles: {
							'background-size': '$0'
						},
						arguments: [
							{
								a: 'auto',
								ct: 'contain',
								cv: 'cover'
							}
						]
					},
					// background-attachment
					{
						type: 'pattern',
						name: 'Background attachment',
						matcher: 'Bga',
						allowParamToValue: false,
						styles: {
							'background-attachment': '$0'
						},
						arguments: [
							{
								f: 'fixed',
								l: 'local',
								s: 'scroll'
							}
						]
					},
					// background-position
					{
						type: 'pattern',
						name: 'Background position',
						matcher: 'Bgp',
						allowParamToValue: true,
						styles: {
							'background-position': '$0 $1'
						},
						arguments: [
							{
								start_t: '__START__ 0',
								end_t: '__END__ 0',
								start_b: '__START__ 100%',
								end_b: '__END__ 100%',
								start_c: '__START__ center',
								c_t: 'center 0',
								c: 'center'
							}
						]
					},
					// background-position-x
					{
						type: 'pattern',
						name: 'Background position (X axis)',
						matcher: 'Bgpx',
						allowParamToValue: true,
						styles: {
							'background-position-x': '$0'
						},
						arguments: [
							{
								start: '__START__',
								end: '__END__',
								c: '50%'
							}
						]
					},
					// background-position-y
					{
						type: 'pattern',
						name: 'Background position (Y axis)',
						matcher: 'Bgpy',
						allowParamToValue: true,
						styles: {
							'background-position-y': '$0'
						},
						arguments: [
							{
								t: '0',
								b: '100%',
								c: '50%'
							}
						]
					},
					// background-repeat
					{
						type: 'pattern',
						name: 'Background repeat',
						matcher: 'Bgr',
						allowParamToValue: false,
						styles: {
							'background-repeat': '$0'
						},
						arguments: [
							{
								nr: 'no-repeat',
								rx: 'repeat-x',
								ry: 'repeat-y',
								r: 'repeat',
								s: 'space',
								ro: 'round'
							}
						]
					},
					/**
    ==================================================================
    BORDER-COLLAPSE
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Border collapse',
						matcher: 'Bdcl',
						allowParamToValue: false,
						styles: {
							'border-collapse': '$0'
						},
						arguments: [
							{
								c: 'collapse',
								s: 'separate'
							}
						]
					},
					/**
    ==================================================================
    BOX-SIZING
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Box sizing',
						matcher: 'Bxz',
						allowParamToValue: false,
						styles: {
							'box-sizing': '$0'
						},
						arguments: [
							{
								cb: 'content-box',
								pb: 'padding-box',
								bb: 'border-box'
							}
						]
					},
					/**
    ==================================================================
    BOX-SHADOW
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Box shadow',
						matcher: 'Bxsh',
						allowParamToValue: false,
						styles: {
							'box-shadow': '$0'
						},
						arguments: [
							{
								n: 'none'
							}
						]
					},
					/**
    ==================================================================
    CLEAR
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Clear',
						matcher: 'Cl',
						allowParamToValue: false,
						styles: {
							clear: '$0'
						},
						arguments: [
							{
								n: 'none',
								b: 'both',
								start: '__START__',
								end: '__END__'
							}
						]
					},
					/**
    ==================================================================
    COLOR
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Color',
						matcher: 'C',
						allowParamToValue: true,
						styles: {
							color: '$0'
						},
						arguments: [colors]
					},
					/**
    ==================================================================
    CURSOR
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Cursor',
						matcher: 'Cur',
						allowParamToValue: false,
						styles: {
							cursor: '$0'
						},
						arguments: [
							{
								a: 'auto',
								as: 'all-scroll',
								c: 'cell',
								cr: 'col-resize',
								co: 'copy',
								cro: 'crosshair',
								d: 'default',
								er: 'e-resize',
								ewr: 'ew-resize',
								g: 'grab',
								gr: 'grabbing',
								h: 'help',
								m: 'move',
								n: 'none',
								nd: 'no-drop',
								na: 'not-allowed',
								nr: 'n-resize',
								ner: 'ne-resize',
								neswr: 'nesw-resize',
								nwser: 'nwse-resize',
								nsr: 'ns-resize',
								nwr: 'nw-resize',
								p: 'pointer',
								pr: 'progress',
								rr: 'row-resize',
								sr: 's-resize',
								ser: 'se-resize',
								swr: 'sw-resize',
								t: 'text',
								vt: 'vertical-text',
								w: 'wait',
								wr: 'w-resize',
								zi: 'zoom-in',
								zo: 'zoom-out'
							}
						]
					},
					/**
    ==================================================================
    DISPLAY
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Display',
						matcher: 'D',
						allowParamToValue: false,
						styles: {
							display: '$0'
						},
						arguments: [
							{
								n: 'none',
								b: 'block',
								f: 'flex',
								i: 'inline',
								ib: 'inline-block',
								tb: 'table',
								tbr: 'table-row',
								tbc: 'table-cell',
								li: 'list-item',
								ri: 'run-in',
								cp: 'compact',
								itb: 'inline-table',
								tbcl: 'table-column',
								tbclg: 'table-column-group',
								tbhg: 'table-header-group',
								tbfg: 'table-footer-group',
								tbrg: 'table-row-group'
							}
						]
					},
					/**
    ==================================================================
    FILTER FUNCTIONS
    http://www.w3.org/TR/filter-effects-1/#FilterProperty
    ==================================================================
    */
					// filter for custom
					{
						type: 'pattern',
						name: 'Filter',
						matcher: 'Fil',
						allowParamToValue: false,
						styles: {
							filter: '$0'
						},
						arguments: [
							{
								n: 'none'
							}
						]
					},
					// blur
					{
						type: 'pattern',
						name: 'Blur (filter)',
						matcher: 'Blur',
						allowParamToValue: true,
						styles: {
							filter: 'blur($0)'
						}
					},
					// brightness
					{
						type: 'pattern',
						name: 'Brightness (filter)',
						matcher: 'Brightness',
						allowParamToValue: true,
						styles: {
							filter: 'brightness($0)'
						}
					},
					// contrast
					{
						type: 'pattern',
						name: 'Contrast (filter)',
						matcher: 'Contrast',
						allowParamToValue: true,
						styles: {
							filter: 'contrast($0)'
						}
					},
					// contrast (only custom)
					{
						type: 'pattern',
						name: 'Drop shadow (filter)',
						matcher: 'Dropshadow',
						allowParamToValue: false,
						styles: {
							filter: 'drop-shadow($0)'
						}
					},
					// grayscale
					{
						type: 'pattern',
						name: 'Grayscale (filter)',
						matcher: 'Grayscale',
						allowParamToValue: true,
						styles: {
							filter: 'grayscale($0)'
						}
					},
					// hue-rotate
					{
						type: 'pattern',
						name: 'Hue Rotate (filter)',
						matcher: 'HueRotate',
						allowParamToValue: true,
						styles: {
							filter: 'hue-rotate($0)'
						}
					},
					// invert
					{
						type: 'pattern',
						name: 'Invert (filter)',
						matcher: 'Invert',
						allowParamToValue: true,
						styles: {
							filter: 'invert($0)'
						}
					},
					// opacity
					{
						type: 'pattern',
						name: 'Opacity (filter)',
						matcher: 'Opacity',
						allowParamToValue: true,
						styles: {
							filter: 'opacity($0)'
						}
					},
					// saturate
					{
						type: 'pattern',
						name: 'Saturate (filter)',
						matcher: 'Saturate',
						allowParamToValue: true,
						styles: {
							filter: 'saturate($0)'
						}
					},
					// sepia
					{
						type: 'pattern',
						name: 'Sepia (filter)',
						matcher: 'Sepia',
						allowParamToValue: true,
						styles: {
							filter: 'sepia($0)'
						}
					},
					/**
    ==================================================================
    FLEX RELATED PROPS
    ==================================================================
    */
					// flex shorthand
					{
						type: 'pattern',
						name: 'Flex',
						matcher: 'Flx',
						allowParamToValue: false,
						styles: {
							flex: '$0'
						},
						arguments: [
							{
								a: 'auto',
								n: 'none'
							}
						]
					},
					// flex-grow
					{
						type: 'pattern',
						name: 'Flex grow',
						matcher: 'Flxg',
						allowParamToValue: true,
						styles: {
							'flex-grow': '$0'
						}
					},
					// flex-shrink
					{
						type: 'pattern',
						name: 'Flex',
						matcher: 'Flxs',
						allowParamToValue: true,
						styles: {
							'flex-shrink': '$0'
						}
					},
					// flex-basis
					{
						type: 'pattern',
						name: 'Flex',
						matcher: 'Flxb',
						allowParamToValue: true,
						styles: {
							'flex-basis': '$0'
						},
						arguments: [
							{
								a: 'auto',
								n: 'none'
							}
						]
					},
					// align-self (previously flex-align)
					// Previous version: http://www.w3.org/TR/2012/WD-css3-flexbox-20120322/#flex-align
					// Latest version: http://www.w3.org/TR/css3-flexbox/#align-items-property
					{
						type: 'pattern',
						name: 'Align self',
						matcher: 'As',
						allowParamToValue: false,
						styles: {
							'align-self': '$0'
						},
						arguments: [
							{
								a: 'auto',
								fs: 'flex-start',
								fe: 'flex-end',
								c: 'center',
								b: 'baseline',
								st: 'stretch'
							}
						]
					},
					// flex-direction
					{
						type: 'pattern',
						name: 'Flex direction',
						matcher: 'Fld',
						allowParamToValue: false,
						styles: {
							'flex-direction': '$0'
						},
						arguments: [
							{
								r: 'row',
								rr: 'row-reverse',
								c: 'column',
								cr: 'column-reverse'
							}
						]
					},
					// flex-flow
					{
						type: 'pattern',
						name: 'Flex flow',
						matcher: 'Flf',
						allowParamToValue: false,
						styles: {
							'flex-flow': '$0'
						},
						arguments: [
							{
								r: 'row',
								rr: 'row-reverse',
								c: 'column',
								cr: 'column-reverse',
								nw: 'nowrap',
								w: 'wrap',
								wr: 'wrap-reverse'
							}
						]
					},
					// align-items (previously flex-item-align)
					// Previous version: http://www.w3.org/TR/2012/WD-css3-flexbox-20120322/#flex-align
					// Latest version: http://www.w3.org/TR/css3-flexbox/#align-items-property
					{
						type: 'pattern',
						name: 'Align items',
						matcher: 'Ai',
						allowParamToValue: false,
						styles: {
							'align-items': '$0'
						},
						arguments: [
							{
								fs: 'flex-start',
								fe: 'flex-end',
								c: 'center',
								b: 'baseline',
								st: 'stretch'
							}
						]
					},
					// align-content (previously flex-line-pack)
					// Source: http://msdn.microsoft.com/en-us/library/ie/jj127302%28v=vs.85%29.aspx
					// Previous version: http://www.w3.org/TR/2012/WD-css3-flexbox-20120322/#flex-line-pack
					// Latest version: http://www.w3.org/TR/css3-flexbox/#align-content-property
					{
						type: 'pattern',
						name: 'Align content',
						matcher: 'Ac',
						allowParamToValue: false,
						styles: {
							'align-content': '$0'
						},
						arguments: [
							{
								fs: 'flex-start',
								fe: 'flex-end',
								c: 'center',
								sb: 'space-between',
								sa: 'space-around',
								st: 'stretch'
							}
						]
					},
					// order (previously flex-order)
					// Previous version: http://www.w3.org/TR/2012/WD-css3-flexbox-20120322/#flex-order
					// Latest version: http://www.w3.org/TR/css3-flexbox/#order-property
					{
						type: 'pattern',
						name: 'Order',
						matcher: 'Or',
						allowParamToValue: true,
						styles: {
							order: '$0'
						}
					},
					// justify-content (previously flex-pack)
					// Previous version: http://www.w3.org/TR/2012/WD-css3-flexbox-20120322/#flex-pack
					// Latest version: http://www.w3.org/TR/css3-flexbox/#justify-content-property
					{
						type: 'pattern',
						name: 'Justify content',
						matcher: 'Jc',
						allowParamToValue: false,
						styles: {
							'justify-content': '$0'
						},
						arguments: [
							{
								fs: 'flex-start',
								fe: 'flex-end',
								c: 'center',
								sb: 'space-between',
								sa: 'space-around'
							}
						]
					},
					// flex-wrap
					{
						type: 'pattern',
						name: 'Flex-wrap',
						matcher: 'Flw',
						allowParamToValue: false,
						styles: {
							'flex-wrap': '$0'
						},
						arguments: [
							{
								nw: 'nowrap',
								w: 'wrap',
								wr: 'wrap-reverse'
							}
						]
					},
					/**
    ==================================================================
    FLOAT
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Float',
						allowParamToValue: false,
						matcher: 'Fl',
						styles: {
							float: '$0'
						},
						arguments: [
							{
								n: 'none',
								start: '__START__',
								end: '__END__'
							}
						]
					},
					/**
    ==================================================================
    FONT FAMILY param matches generic font-family
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Font family',
						matcher: 'Ff',
						allowParamToValue: false,
						styles: {
							'font-family': '$0'
						},
						arguments: [
							{
								c: '"Monotype Corsiva", "Comic Sans MS", cursive',
								f: 'Capitals, Impact, fantasy',
								m: 'Monaco, "Courier New", monospace',
								s: 'Georgia, "Times New Roman", serif',
								ss: 'Helvetica, Arial, sans-serif'
							}
						]
					},
					/**
    ==================================================================
    FONT-WEIGHT
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Font weight',
						matcher: 'Fw',
						allowParamToValue: false,
						styles: {
							'font-weight': '$0'
						},
						arguments: [
							{
								'100': '100',
								'200': '200',
								'300': '300',
								'400': '400',
								'500': '500',
								'600': '600',
								'700': '700',
								'800': '800',
								'900': '900',
								b: 'bold',
								br: 'bolder',
								lr: 'lighter',
								n: 'normal'
							}
						]
					},
					/**
    ==================================================================
    FONT-SIZE
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Font size',
						matcher: 'Fz',
						allowParamToValue: true,
						styles: {
							'font-size': '$0'
						}
					},
					/**
     ==================================================================
     FONT-STYLE
     ==================================================================
     */
					{
						type: 'pattern',
						name: 'Font style',
						matcher: 'Fs',
						allowParamToValue: false,
						styles: {
							'font-style': '$0'
						},
						arguments: [
							{
								n: 'normal',
								i: 'italic',
								o: 'oblique'
							}
						]
					},
					/**
    ==================================================================
    FONT-VARIANT
    ==================================================================
    */
					// TODO: This rule has a lot more acceptable values.
					// http://dev.w3.org/csswg/css-fonts/#propdef-font-variant
					// https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant
					{
						type: 'pattern',
						name: 'Font variant',
						matcher: 'Fv',
						allowParamToValue: false,
						styles: {
							'font-variant': '$0'
						},
						arguments: [
							{
								n: 'normal',
								sc: 'small-caps'
							}
						]
					},
					/**
    ==================================================================
    HEIGHT
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Height',
						matcher: 'H',
						allowParamToValue: true,
						styles: {
							height: '$0'
						},
						arguments: [
							{
								'0': '0',
								a: 'auto',
								av: 'available',
								bb: 'border-box',
								cb: 'content-box',
								fc: 'fit-content',
								maxc: 'max-content',
								minc: 'min-content'
							}
						]
					},
					/**
    ==================================================================
    HYPHENS
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Hyphens',
						matcher: 'Hy',
						allowParamToValue: false,
						styles: {
							hyphens: '$0'
						},
						arguments: [
							{
								a: 'auto',
								n: 'normal',
								m: 'manual'
							}
						]
					},
					/**
    ==================================================================
    LETTER-SPACING
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Letter spacing',
						matcher: 'Lts',
						allowParamToValue: true,
						styles: {
							'letter-spacing': '$0'
						},
						arguments: [
							{
								n: 'normal'
							}
						]
					},
					/**
    ==================================================================
    LIST-STYLE-TYPE
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'List style type',
						matcher: 'List',
						allowParamToValue: false,
						styles: {
							'list-style-type': '$0'
						},
						arguments: [
							{
								n: 'none',
								d: 'disc',
								c: 'circle',
								s: 'square',
								dc: 'decimal',
								dclz: 'decimal-leading-zero',
								lr: 'lower-roman',
								lg: 'lower-greek',
								ll: 'lower-latin',
								ur: 'upper-roman',
								ul: 'upper-latin',
								a: 'armenian',
								g: 'georgian',
								la: 'lower-alpha',
								ua: 'upper-alpha'
							}
						]
					},
					/**
    ==================================================================
    LIST-STYLE-POSITION
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'List style position',
						matcher: 'Lisp',
						allowParamToValue: false,
						styles: {
							'list-style-position': '$0'
						},
						arguments: [
							{
								i: 'inside',
								o: 'outside'
							}
						]
					},
					/**
    ==================================================================
    LIST-STYLE-IMAGE
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'List style image',
						matcher: 'Lisi',
						allowParamToValue: false,
						styles: {
							'list-style-image': '$0'
						},
						arguments: [
							{
								n: 'none'
							}
						]
					},
					/**
    ==================================================================
    LINE-HEIGHT
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Line height',
						matcher: 'Lh',
						allowParamToValue: true,
						styles: {
							'line-height': '$0'
						},
						arguments: [
							{
								n: 'normal'
							}
						]
					},
					/**
    ==================================================================
    MARGINS
    ==================================================================
    */
					// all edges
					{
						type: 'pattern',
						name: 'Margin (all edges)',
						matcher: 'M',
						allowParamToValue: true,
						styles: {
							margin: '$0'
						},
						arguments: [
							{
								'0': '0',
								a: 'auto'
							}
						]
					},
					// X axis
					{
						type: 'pattern',
						name: 'Margin (X axis)',
						matcher: 'Mx',
						allowParamToValue: true,
						styles: {
							'margin-__START__': '$0',
							'margin-__END__': '$0'
						},
						arguments: [
							{
								'0': '0',
								a: 'auto'
							}
						]
					},
					// Y axis
					{
						type: 'pattern',
						name: 'Margin (Y axis)',
						matcher: 'My',
						allowParamToValue: true,
						styles: {
							'margin-top': '$0',
							'margin-bottom': '$0'
						},
						arguments: [
							{
								'0': '0',
								a: 'auto'
							}
						]
					},
					// top
					{
						type: 'pattern',
						name: 'Margin top',
						matcher: 'Mt',
						allowParamToValue: true,
						styles: {
							'margin-top': '$0'
						},
						arguments: [
							{
								'0': '0',
								a: 'auto'
							}
						]
					},
					// end
					{
						type: 'pattern',
						name: 'Margin end',
						matcher: 'Mend',
						allowParamToValue: true,
						styles: {
							'margin-__END__': '$0'
						},
						arguments: [
							{
								'0': '0',
								a: 'auto'
							}
						]
					},
					// bottom
					{
						type: 'pattern',
						name: 'Margin bottom',
						matcher: 'Mb',
						allowParamToValue: true,
						styles: {
							'margin-bottom': '$0'
						},
						arguments: [
							{
								'0': '0',
								a: 'auto'
							}
						]
					},
					// start
					{
						type: 'pattern',
						name: 'Margin start',
						matcher: 'Mstart',
						allowParamToValue: true,
						styles: {
							'margin-__START__': '$0'
						},
						arguments: [
							{
								'0': '0',
								a: 'auto'
							}
						]
					},
					/**
    ==================================================================
    MAX-HEIGHT
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Max height',
						matcher: 'Mah',
						allowParamToValue: true,
						styles: {
							'max-height': '$0'
						},
						arguments: [
							{
								a: 'auto',
								maxc: 'max-content',
								minc: 'min-content',
								fa: 'fill-available',
								fc: 'fit-content'
							}
						]
					},
					/**
    ==================================================================
    MAX-WIDTH
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Max width',
						matcher: 'Maw',
						allowParamToValue: true,
						styles: {
							'max-width': '$0'
						},
						arguments: [
							{
								a: 'auto',
								fa: 'fill-available',
								fc: 'fit-content',
								maxc: 'max-content',
								minc: 'min-content'
							}
						]
					},
					/**
    ==================================================================
    MIN-HEIGHT
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Min height',
						matcher: 'Mih',
						allowParamToValue: true,
						styles: {
							'min-height': '$0'
						},
						arguments: [
							{
								a: 'auto',
								fa: 'fill-available',
								fc: 'fit-content',
								maxc: 'max-content',
								minc: 'min-content'
							}
						]
					},
					/**
    ==================================================================
    MIN-WIDTH
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Min width',
						matcher: 'Miw',
						allowParamToValue: true,
						styles: {
							'min-width': '$0'
						},
						arguments: [
							{
								a: 'auto',
								fa: 'fill-available',
								fc: 'fit-content',
								maxc: 'max-content',
								minc: 'min-content'
							}
						]
					},
					/**
    ==================================================================
    OUTLINE
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Outline',
						matcher: 'O',
						allowParamToValue: false,
						styles: {
							outline: '$0'
						},
						arguments: [
							{
								'0': '0',
								n: 'none'
							}
						]
					},
					/**
    ==================================================================
    OFFSETS
    ==================================================================
    */
					// top
					{
						type: 'pattern',
						name: 'Top',
						matcher: 'T',
						allowParamToValue: true,
						styles: {
							top: '$0'
						},
						arguments: [
							{
								a: 'auto'
							}
						]
					},
					// end
					{
						type: 'pattern',
						name: 'End',
						matcher: 'End',
						allowParamToValue: true,
						styles: {
							__END__: '$0'
						},
						arguments: [
							{
								a: 'auto'
							}
						]
					},
					// bottom
					{
						type: 'pattern',
						name: 'Bottom',
						matcher: 'B',
						allowParamToValue: true,
						styles: {
							bottom: '$0'
						},
						arguments: [
							{
								a: 'auto'
							}
						]
					},
					// start
					{
						type: 'pattern',
						name: 'Start',
						matcher: 'Start',
						allowParamToValue: true,
						styles: {
							__START__: '$0'
						},
						arguments: [
							{
								a: 'auto'
							}
						]
					},
					/**
    ==================================================================
    OPACITY
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Opacity',
						matcher: 'Op',
						allowParamToValue: true,
						styles: {
							opacity: '$0'
						},
						arguments: [
							{
								'0': '0',
								'1': '1'
							}
						]
					},
					/**
    ==================================================================
    OVERFLOW
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Overflow',
						matcher: 'Ov',
						allowParamToValue: false,
						styles: {
							overflow: '$0'
						},
						arguments: [
							{
								a: 'auto',
								h: 'hidden',
								s: 'scroll',
								v: 'visible'
							}
						]
					},
					/**
    ==================================================================
    OVERFLOW-X
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Overflow (X axis)',
						matcher: 'Ovx',
						allowParamToValue: false,
						styles: {
							'overflow-x': '$0'
						},
						arguments: [
							{
								a: 'auto',
								h: 'hidden',
								s: 'scroll',
								v: 'visible'
							}
						]
					},
					/**
    ==================================================================
    OVERFLOW-Y
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Overflow (Y axis)',
						matcher: 'Ovy',
						allowParamToValue: false,
						styles: {
							'overflow-y': '$0'
						},
						arguments: [
							{
								a: 'auto',
								h: 'hidden',
								s: 'scroll',
								v: 'visible'
							}
						]
					},
					/**
    ==================================================================
    OVERFLOW-SCROLLING (-webkit-)
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Overflow scrolling',
						matcher: 'Ovs',
						allowParamToValue: false,
						styles: {
							'-webkit-overflow-scrolling': '$0'
						},
						arguments: [
							{
								a: 'auto',
								touch: 'touch'
							}
						]
					},
					/**
    ==================================================================
    PADDING
    ==================================================================
    */
					// all edges
					{
						type: 'pattern',
						name: 'Padding (all edges)',
						matcher: 'P',
						allowParamToValue: true,
						styles: {
							padding: '$0'
						}
					},
					// X axis
					{
						type: 'pattern',
						name: 'Padding (X axis)',
						matcher: 'Px',
						allowParamToValue: true,
						styles: {
							'padding-__START__': '$0',
							'padding-__END__': '$0'
						}
					},
					// Y axis
					{
						type: 'pattern',
						name: 'Padding (Y axis)',
						matcher: 'Py',
						allowParamToValue: true,
						styles: {
							'padding-top': '$0',
							'padding-bottom': '$0'
						}
					},
					// top
					{
						type: 'pattern',
						name: 'Padding top',
						matcher: 'Pt',
						allowParamToValue: true,
						styles: {
							'padding-top': '$0'
						}
					},
					// end
					{
						type: 'pattern',
						name: 'Padding end',
						matcher: 'Pend',
						allowParamToValue: true,
						styles: {
							'padding-__END__': '$0'
						}
					},
					// bottom
					{
						type: 'pattern',
						name: 'Padding bottom',
						matcher: 'Pb',
						allowParamToValue: true,
						styles: {
							'padding-bottom': '$0'
						}
					},
					// start
					{
						type: 'pattern',
						name: 'Padding start',
						matcher: 'Pstart',
						allowParamToValue: true,
						styles: {
							'padding-__START__': '$0'
						}
					},
					/**
    ==================================================================
    POINTER-EVENTS
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Pointer events',
						matcher: 'Pe',
						allowParamToValue: false,
						styles: {
							'pointer-events': '$0'
						},
						arguments: [
							{
								a: 'auto',
								all: 'all',
								f: 'fill',
								n: 'none',
								p: 'painted',
								s: 'stroke',
								v: 'visible',
								vf: 'visibleFill',
								vp: 'visiblePainted',
								vs: 'visibleStroke'
							}
						]
					},
					/**
    ==================================================================
    POSITION
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Position',
						matcher: 'Pos',
						allowParamToValue: false,
						styles: {
							position: '$0'
						},
						arguments: [
							{
								a: 'absolute',
								f: 'fixed',
								r: 'relative',
								s: 'static',
								st: 'sticky'
							}
						]
					},
					/**
    ==================================================================
    TABLE-LAYOUT (checked)
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Table layout',
						matcher: 'Tbl',
						allowParamToValue: false,
						styles: {
							'table-layout': '$0'
						},
						arguments: [
							{
								a: 'auto',
								f: 'fixed'
							}
						]
					},
					/**
    ==================================================================
    TEXT-ALIGN
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Text align',
						matcher: 'Ta',
						allowParamToValue: false,
						styles: {
							'text-align': '$0'
						},
						arguments: [
							{
								c: 'center',
								e: 'end',
								end: '__END__',
								j: 'justify',
								mp: 'match-parent',
								s: 'start',
								start: '__START__'
							}
						]
					},
					/**
    ==================================================================
    TEXT-ALIGN-LAST
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Text align last',
						matcher: 'Tal',
						allowParamToValue: false,
						styles: {
							'text-align-last': '$0'
						},
						arguments: [
							{
								a: 'auto',
								c: 'center',
								e: 'end',
								end: '__END__',
								j: 'justify',
								s: 'start',
								start: '__START__'
							}
						]
					},
					/**
    ==================================================================
    TEXT-DECORATION
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Text decoration',
						matcher: 'Td',
						allowParamToValue: false,
						styles: {
							'text-decoration': '$0'
						},
						arguments: [
							{
								lt: 'line-through',
								n: 'none',
								o: 'overline',
								u: 'underline'
							}
						]
					},
					/**
    ==================================================================
    TEXT-INDENT
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Text indent',
						matcher: 'Ti',
						allowParamToValue: true,
						styles: {
							'text-indent': '$0'
						}
					},
					/**
    ==================================================================
    TEXT-OVERFLOW
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Text overflow',
						matcher: 'Tov',
						allowParamToValue: false,
						styles: {
							'text-overflow': '$0'
						},
						arguments: [
							{
								c: 'clip',
								e: 'ellipsis'
							}
						]
					},
					/**
    ==================================================================
    TEXT-RENDERING
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Text rendering',
						matcher: 'Tren',
						allowParamToValue: false,
						styles: {
							'text-rendering': '$0'
						},
						arguments: [
							{
								a: 'auto',
								os: 'optimizeSpeed',
								ol: 'optimizeLegibility',
								gp: 'geometricPrecision'
							}
						]
					},
					/**
    ==================================================================
    TEXT-REPLACE
    http://www.w3.org/TR/2007/WD-css3-gcpm-20070504/
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Text replace',
						matcher: 'Tr',
						allowParamToValue: false,
						styles: {
							'text-replace': '$0'
						},
						arguments: [
							{
								n: 'none'
							}
						]
					},
					/**
    ==================================================================
    TEXT-TRANSFORM
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Text transform',
						matcher: 'Tt',
						allowParamToValue: false,
						styles: {
							'text-transform': '$0'
						},
						arguments: [
							{
								n: 'none',
								c: 'capitalize',
								u: 'uppercase',
								l: 'lowercase'
							}
						]
					},
					/**
    ==================================================================
    TEXT-SHADOW
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Text shadow',
						matcher: 'Tsh',
						allowParamToValue: false,
						styles: {
							'text-shadow': '$0'
						},
						arguments: [
							{
								n: 'none'
							}
						]
					},
					/**
    ==================================================================
    TRANSFORM
    http://www.w3.org/TR/css3-3d-transforms/
    ==================================================================
    */
					// transform for custom
					{
						type: 'pattern',
						name: 'Transform',
						matcher: 'Trf',
						allowParamToValue: false,
						styles: {
							transform: '$0'
						}
					},
					// transform-origin
					{
						type: 'pattern',
						name: 'Transform origin',
						matcher: 'Trfo',
						allowParamToValue: true,
						styles: {
							'transform-origin': '$0 $1'
						},
						arguments: [
							{
								t: 'top',
								end: '__END__',
								bottom: 'bottom',
								start: '__START__',
								c: 'center'
							},
							{
								t: 'top',
								end: '__END__',
								bottom: 'bottom',
								start: '__START__',
								c: 'center'
							}
						]
					},
					// transform-style
					{
						type: 'pattern',
						name: 'Transform style',
						matcher: 'Trfs',
						allowParamToValue: false,
						styles: {
							'transform-style': '$0'
						},
						arguments: [
							{
								f: 'flat',
								p: 'preserve-3d'
							}
						]
					},
					// perspective
					{
						type: 'pattern',
						name: 'Perspective',
						matcher: 'Prs',
						allowParamToValue: true,
						styles: {
							perspective: '$0'
						},
						arguments: [
							{
								n: 'none'
							}
						]
					},
					// perspective-origin
					{
						type: 'pattern',
						name: 'Perspective origin',
						matcher: 'Prso',
						allowParamToValue: true,
						styles: {
							'perspective-origin': '$0 $1'
						},
						arguments: [
							{
								t: 'top',
								end: '__END__',
								bottom: 'bottom',
								start: '__START__',
								c: 'center'
							},
							{
								t: 'top',
								end: '__END__',
								bottom: 'bottom',
								start: '__START__',
								c: 'center'
							}
						]
					},
					// backface-visibility
					{
						type: 'pattern',
						name: 'Backface visibility',
						matcher: 'Bfv',
						allowParamToValue: false,
						styles: {
							'backface-visibility': '$0'
						},
						arguments: [
							{
								h: 'hidden',
								v: 'visible'
							}
						]
					},
					// matrix
					{
						type: 'pattern',
						name: 'Matrix (transform)',
						matcher: 'Matrix',
						allowParamToValue: false,
						styles: {
							transform: 'matrix($0)'
						}
					},
					// matrix3d
					{
						type: 'pattern',
						name: 'Matrix 3d (transform)',
						matcher: 'Matrix3d',
						allowParamToValue: false,
						styles: {
							transform: 'matrix($0)'
						}
					},
					// rotate
					{
						type: 'pattern',
						name: 'Rotate (transform)',
						matcher: 'Rotate',
						allowParamToValue: true,
						styles: {
							transform: 'rotate($0)'
						}
					},
					// rotate3d
					{
						type: 'pattern',
						name: 'Rotate 3d (transform)',
						matcher: 'Rotate3d',
						allowParamToValue: true,
						styles: {
							transform: 'rotate3d($0,$1,$2,$3)'
						}
					},
					// rotateX
					{
						type: 'pattern',
						name: 'RotateX (transform)',
						matcher: 'RotateX',
						allowParamToValue: true,
						styles: {
							transform: 'rotateX($0)'
						}
					},
					// rotateY
					{
						type: 'pattern',
						name: 'RotateY (transform)',
						matcher: 'RotateY',
						allowParamToValue: true,
						styles: {
							transform: 'rotateY($0)'
						}
					},
					// rotateZ
					{
						type: 'pattern',
						name: 'RotateZ (transform)',
						matcher: 'RotateZ',
						allowParamToValue: true,
						styles: {
							transform: 'rotateZ($0)'
						}
					},
					// scale
					{
						type: 'pattern',
						name: 'Scale (transform)',
						matcher: 'Scale',
						allowParamToValue: true,
						styles: {
							transform: 'scale($0,$1)'
						}
					},
					// scale3d
					{
						type: 'pattern',
						name: 'Scale 3d (transform)',
						matcher: 'Scale3d',
						allowParamToValue: true,
						styles: {
							transform: 'scale3d($0,$1,$2)'
						}
					},
					// scaleX
					{
						type: 'pattern',
						name: 'ScaleX (transform)',
						matcher: 'ScaleX',
						allowParamToValue: true,
						styles: {
							transform: 'scaleX($0)'
						}
					},
					// scaleY
					{
						type: 'pattern',
						name: 'ScaleY (transform)',
						matcher: 'ScaleY',
						allowParamToValue: true,
						styles: {
							transform: 'scaleY($0)'
						}
					},
					// skew
					{
						type: 'pattern',
						name: 'Skew (transform)',
						matcher: 'Skew',
						allowParamToValue: true,
						styles: {
							transform: 'skew($0,$1)'
						}
					},
					// skewX
					{
						type: 'pattern',
						name: 'SkewX (transform)',
						matcher: 'SkewX',
						allowParamToValue: true,
						styles: {
							transform: 'skewX($0)'
						}
					},
					// skewY
					{
						type: 'pattern',
						name: 'SkewY (transform)',
						matcher: 'SkewY',
						allowParamToValue: true,
						styles: {
							transform: 'skewY($0)'
						}
					},
					// translate
					{
						type: 'pattern',
						name: 'Translate (transform)',
						matcher: 'Translate',
						allowParamToValue: true,
						styles: {
							transform: 'translate($0,$1)'
						}
					},
					// translate3d
					{
						type: 'pattern',
						name: 'Translate 3d (transform)',
						matcher: 'Translate3d',
						allowParamToValue: true,
						styles: {
							transform: 'translate3d($0,$1,$2)'
						}
					},
					// translateX
					{
						type: 'pattern',
						name: 'Translate X (transform)',
						matcher: 'TranslateX',
						allowParamToValue: true,
						styles: {
							transform: 'translateX($0)'
						}
					},
					// translateY
					{
						type: 'pattern',
						name: 'Translate Y (transform)',
						matcher: 'TranslateY',
						allowParamToValue: true,
						styles: {
							transform: 'translateY($0)'
						}
					},
					// translateZ
					{
						type: 'pattern',
						name: 'Translate Z (transform)',
						matcher: 'TranslateZ',
						allowParamToValue: true,
						styles: {
							transform: 'translateZ($0)'
						}
					},
					/**
    ==================================================================
    TRANSITION
    ==================================================================
    */
					// transition shorthand
					{
						type: 'pattern',
						name: 'Transition',
						matcher: 'Trs',
						allowParamToValue: false,
						styles: {
							transition: '$0'
						}
					},
					// transition-delay
					{
						type: 'pattern',
						name: 'Transition delay',
						matcher: 'Trsde',
						allowParamToValue: true,
						styles: {
							'transition-delay': '$0'
						},
						arguments: [
							{
								i: 'initial'
							}
						]
					},
					// transition-duration
					{
						type: 'pattern',
						name: 'Transition duration',
						matcher: 'Trsdu',
						allowParamToValue: true,
						styles: {
							'transition-duration': '$0'
						}
					},
					// transition-property
					{
						type: 'pattern',
						name: 'Transition property',
						matcher: 'Trsp',
						allowParamToValue: true,
						styles: {
							'transition-property': '$0'
						},
						arguments: [
							{
								a: 'all'
							}
						]
					},
					// transition-timing-function
					{
						type: 'pattern',
						name: 'Transition timing function',
						matcher: 'Trstf',
						allowParamToValue: false,
						styles: {
							'transition-timing-function': '$0'
						},
						arguments: [
							{
								e: 'ease',
								ei: 'ease-in',
								eo: 'ease-out',
								eio: 'ease-in-out',
								l: 'linear',
								ss: 'step-start',
								se: 'step-end'
							}
						]
					},
					/**
    ==================================================================
    USER-SELECT
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'User select',
						matcher: 'Us',
						allowParamToValue: false,
						styles: {
							'user-select': '$0'
						},
						arguments: [
							{
								a: 'all',
								el: 'element',
								els: 'elements',
								n: 'none',
								t: 'text',
								to: 'toggle'
							}
						]
					},
					/**
    ==================================================================
    VERTICAL-ALIGN
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Vertical align',
						matcher: 'Va',
						allowParamToValue: false,
						styles: {
							'vertical-align': '$0'
						},
						arguments: [
							{
								b: 'bottom',
								bl: 'baseline',
								m: 'middle',
								sub: 'sub',
								sup: 'super',
								t: 'top',
								tb: 'text-bottom',
								tt: 'text-top'
							}
						]
					},
					/**
    ==================================================================
    VISIBILITY
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Visibility',
						matcher: 'V',
						allowParamToValue: false,
						styles: {
							visibility: '$0'
						},
						arguments: [
							{
								v: 'visible',
								h: 'hidden',
								c: 'collapse'
							}
						]
					},
					/**
    ==================================================================
    WHITE-SPACE
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'White space',
						matcher: 'Whs',
						allowParamToValue: false,
						styles: {
							'white-space': '$0'
						},
						arguments: [
							{
								n: 'normal',
								p: 'pre',
								nw: 'nowrap',
								pw: 'pre-wrap',
								pl: 'pre-line'
							}
						]
					},
					/**
    ==================================================================
    WHITE-SPACE-COLLAPSE
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'White space collapse',
						matcher: 'Whsc',
						allowParamToValue: false,
						styles: {
							'white-space-collapse': '$0'
						},
						arguments: [
							{
								n: 'normal',
								ka: 'keep-all',
								l: 'loose',
								bs: 'break-strict',
								ba: 'break-all'
							}
						]
					},
					/**
    ==================================================================
    WIDTH
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Width',
						matcher: 'W',
						allowParamToValue: true,
						styles: {
							width: '$0'
						},
						arguments: [
							{
								'0': '0',
								a: 'auto',
								bb: 'border-box',
								cb: 'content-box',
								av: 'available',
								minc: 'min-content',
								maxc: 'max-content',
								fc: 'fit-content'
							}
						]
					},
					/**
    ==================================================================
    WORD-BREAK
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Word break',
						matcher: 'Wob',
						allowParamToValue: false,
						styles: {
							'word-break': '$0'
						},
						arguments: [
							{
								ba: 'break-all',
								ka: 'keep-all',
								n: 'normal'
							}
						]
					},
					/**
    ==================================================================
    WORD-WRAP (not part of the spec)
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Word wrap',
						matcher: 'Wow',
						allowParamToValue: false,
						styles: {
							'word-wrap': '$0'
						},
						arguments: [
							{
								bw: 'break-word',
								n: 'normal'
							}
						]
					},
					/**
    ==================================================================
    Z-INDEX
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Z index',
						matcher: 'Z',
						allowParamToValue: true,
						styles: {
							'z-index': '$0'
						},
						arguments: [
							{
								a: 'auto'
							}
						]
					},
					/**
    ==================================================================
    SVG
    ==================================================================
    */
					{
						type: 'pattern',
						name: 'Fill (SVG)',
						matcher: 'Fill',
						allowParamToValue: false,
						styles: {
							fill: '$0'
						},
						arguments: [colors]
					},
					{
						type: 'pattern',
						name: 'Stroke (SVG)',
						matcher: 'Stk',
						allowParamToValue: false,
						styles: {
							stroke: '$0'
						},
						arguments: [colors]
					},
					{
						type: 'pattern',
						name: 'Stroke width (SVG)',
						matcher: 'Stkw',
						allowParamToValue: true,
						styles: {
							'stroke-width': '$0'
						},
						arguments: [
							{
								i: 'inherit'
							}
						]
					},
					{
						type: 'pattern',
						name: 'Stroke linecap (SVG)',
						matcher: 'Stklc',
						allowParamToValue: false,
						styles: {
							'stroke-linecap': '$0'
						},
						arguments: [
							{
								i: 'inherit',
								b: 'butt',
								r: 'round',
								s: 'square'
							}
						]
					},
					{
						type: 'pattern',
						name: 'Stroke linejoin (SVG)',
						matcher: 'Stklj',
						allowParamToValue: false,
						styles: {
							'stroke-linejoin': '$0'
						},
						arguments: [
							{
								i: 'inherit',
								b: 'bevel',
								r: 'round',
								m: 'miter'
							}
						]
					}
				];
			},
			{ './colors': 4 }
		],
		Atomizer: [
			function(require, module, exports) {
				/*
 * Copyright (c) 2015, Yahoo Inc. All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

				'use strict';

				var _ = require('lodash');
				var utils = require('./lib/utils');
				var JSS = require('./lib/jss');
				var Grammar = require('./lib/grammar');
				var objectAssign = require('object-assign');
				var XRegExp = require('xregexp').XRegExp;

				var RULES = require('./rules.js').concat(require('./helpers.js'));

				/**
 * constructor
 */
				function Atomizer(
					options /*:AtomizerOptions*/,
					rules /*:AtomizerRules*/
				) {
					this.verbose = (options && options.verbose) || false;
					this.rules = [];
					// we have two different objects to avoid name collision
					this.rulesMap = {};
					this.helpersMap = {};

					// add rules
					this.addRules(rules || RULES);
				}

				/**
 * addRules
 * @public
 */
				Atomizer.prototype.addRules = function(
					rules /*:AtomizerRules*/
				) /*:void*/ {
					rules.forEach(function(rule) {
						var ruleFound =
							rule.type === 'pattern' &&
							this.rulesMap.hasOwnProperty(rule.matcher);
						var helperFound =
							rule.type === 'helper' &&
							this.helpersMap.hasOwnProperty(rule.matcher);

						if (
							(ruleFound &&
								!_.isEqual(this.rules[this.rulesMap[rule.matcher]], rule)) ||
							(helperFound &&
								!_.isEqual(this.rules[this.helpersMap[rule.matcher]], rule))
						) {
							throw new Error(
								'Rule ' +
									rule.matcher +
									' already exists with a different defintion.'
							);
						}

						if (!ruleFound && !helperFound) {
							// push new rule to this.rules and update rulesMap
							this.rules.push(rule);

							if (rule.type === 'pattern') {
								this.rulesMap[rule.matcher] = this.rules.length - 1;
							} else {
								this.helpersMap[rule.matcher] = this.rules.length - 1;
							}
						}
					}, this);

					// invalidates syntax
					this.syntax = null;
					this.syntaxSimple = null;
				};

				/**
 * getClassNameSyntax()
 * @private
 */
				Atomizer.prototype.getSyntax = function(isSimple) /*:string*/ {
					if (isSimple && !this.syntaxSimple) {
						this.syntaxSimple = new Grammar(this.rules).getSyntax(true);
					}
					if (!isSimple && !this.syntax) {
						// All Grammar and syntax parsing  should be in the Grammar class
						this.syntax = new Grammar(this.rules).getSyntax();
					}

					return isSimple ? this.syntaxSimple : this.syntax;
				};

				/**
 * findClassNames
 */
				Atomizer.prototype.findClassNames = function(
					src /*:string*/
				) /*:string[]*/ {
					// using object to remove dupes
					var classNamesObj = {};
					var className;
					var classNameSyntax = this.getSyntax();
					var match = classNameSyntax.exec(src);

					while (match !== null) {
						// strip boundary character
						className = match[1];

						// assign to classNamesObj as key and give it a counter
						classNamesObj[className] = (classNamesObj[className] || 0) + 1;

						// run regex again
						match = classNameSyntax.exec(src);
					}

					// return an array of the matched class names
					return _.keys(classNamesObj);
				};

				/**
 * Get Atomizer config given an array of class names and an optional config object
 * examples:
 *
 * getConfig(['Op(1)', 'D(n):h', 'Fz(heading)'], {
 *     custom: {
 *         heading: '80px'
 *     },
 *     breakPoints: {
 *         'sm': '@media(min-width:500px)',
 *         'md': '@media(min-width:900px)',
 *         'lg': '@media(min-width:1200px)'
 *     },
 *     classNames: ['D(b)']
 * }, {
 *     rtl: true
 * });
 *
 * getConfig(['Op(1)', 'D(n):h']);
 */
				Atomizer.prototype.getConfig = function(
					classNames /*:string[]*/,
					config /*:AtomizerConfig*/
				) /*:AtomizerConfig*/ {
					config = config || { classNames: [] };
					// merge classnames with config
					config.classNames = _.union(classNames || [], config.classNames);
					return config;
				};

				/**
 * return a parsed tree given a config and css options
 */
				Atomizer.prototype.parseConfig = function(
					config /*:AtomizerConfig*/,
					options /*:CSSOptions*/
				) /*:Tree*/ {
					var tree = {};
					var classNameSyntax = this.getSyntax(true);
					var warnings = [];
					var isVerbose = !!this.verbose;
					var classNames = config.classNames;

					if (!_.isArray(config.classNames)) {
						return tree;
					}
					options = options || {};

					if ('exclude' in config) {
						classNames = _.difference(classNames, config.exclude);
					}

					classNames.forEach(function(className) {
						var match = XRegExp.exec(className, classNameSyntax);
						var rule;
						var ruleIndex;
						var treeo;
						var rgb;
						var values;

						if (!match || (!match.atomicSelector && !match.selector)) {
							// no match, no op
							return;
						}

						// check where this rule belongs to
						// atomicSelector is the class name before the params: e.g. className(param)
						// selector is the class name if params is not required
						// we look both in rules and in helpers where this class belongs to
						if (this.rulesMap.hasOwnProperty(match.atomicSelector)) {
							ruleIndex = this.rulesMap[match.atomicSelector];
						} else if (this.helpersMap.hasOwnProperty(match.atomicSelector)) {
							// the atomicSelector can also be a helper that requires params
							ruleIndex = this.helpersMap[match.atomicSelector];
						} else if (this.helpersMap.hasOwnProperty(match.selector)) {
							// or it can be just a class with no params required
							// this is only possible for helper classes as param is required for
							// all atomic classes in rulesMap.
							ruleIndex = this.helpersMap[match.selector];
						} else {
							// not a valid class, no op
							return;
						}

						// get the rule that this class name belongs to.
						// this is why we created the dictionary
						// as it will return the index given a matcher.
						rule = this.rules[ruleIndex];

						treeo = {
							className: match[1],
							declarations: _.cloneDeep(rule.styles)
						};

						if (!tree[rule.matcher]) {
							tree[rule.matcher] = [];
						}

						if (match.parentSelector) {
							treeo.parentSelector = match.parentSelector;
						}
						if (match.parent) {
							treeo.parent = match.parent;
						}
						if (match.parentPseudo) {
							treeo.parentPseudo = match.parentPseudo;
						}
						if (match.parentSep) {
							treeo.parentSep = match.parentSep;
						}

						// given values, return their valid form
						if (match.atomicValues) {
							values = match.atomicValues;

							// values can be separated by a comma
							// parse them and return a valid value
							values = values.split(',').map(function(value, index) {
								var matchVal = Grammar.matchValue(value);
								var propAndValue;

								if (matchVal.number) {
									if (rule.allowParamToValue || rule.type === 'helper') {
										value = matchVal.number;
										if (matchVal.unit) {
											value += matchVal.unit;
										}
									} else {
										// treat as if we matched a named value
										matchVal.named = [matchVal.number, matchVal.unit].join('');
									}
								}
								if (matchVal.fraction) {
									// multiplying by 100 then by 10000 on purpose (instead of just multiplying by 1M),
									// making clear the steps involved:
									// percentage: (numerator / denominator * 100)
									// 4 decimal places:  (Math.round(percentage * 10000) / 10000)
									value =
										Math.round(
											matchVal.numerator / matchVal.denominator * 100 * 10000
										) /
											10000 +
										'%';
								}
								if (matchVal.hex) {
									if (matchVal.alpha) {
										rgb = utils.hexToRgb(matchVal.hex);
										value = [
											'rgba(',
											rgb.r,
											',',
											rgb.g,
											',',
											rgb.b,
											',',
											matchVal.alpha,
											')'
										].join('');
									} else {
										value = matchVal.hex;
									}
								}
								if (matchVal.named) {
									// first check if 'inh' is the value
									if (matchVal.named === 'inh') {
										value = 'inherit';
									} else if (
										rule.arguments &&
										index < rule.arguments.length &&
										Object.keys(rule.arguments[index]).indexOf(
											matchVal.named
										) >= 0
									) {
										// check if the named value matches any of the values
										// registered in arguments.
										value = rule.arguments[index][matchVal.named];
									} else {
										// now check if named value was passed in the config
										propAndValue = [
											match.atomicSelector,
											'(',
											matchVal.named,
											')'
										].join('');

										// no custom, warn it
										if (!config.custom) {
											warnings.push(propAndValue);
											// set to null so we don't write it to the css
											value = null;
										} else if (config.custom.hasOwnProperty(propAndValue)) {
											// as prop + value
											value = config.custom[propAndValue];
										} else if (config.custom.hasOwnProperty(matchVal.named)) {
											// as value
											value = config.custom[matchVal.named];
										} else {
											// we have custom but we could not find the named class name there
											warnings.push(propAndValue);
											// set to null so we don't write it to the css
											value = null;
										}
									}
								}
								return value;
							});
						}

						if (match.valuePseudo) {
							treeo.valuePseudo = match.valuePseudo;
						}

						if (match.breakPoint) {
							treeo.breakPoint = match.breakPoint;
						}

						// before we assign, let's take care of the declarations
						// iterate declarations so we can replace values with their valid form
						for (var prop in treeo.declarations) {
							if (values) {
								values.forEach(function(value, index) {
									// plug IE hacks for know properties
									if (options.ie) {
										// block formatting context on old IE
										/* istanbul ignore else  */
										if (
											(prop === 'display' && value === 'inline-block') ||
											(prop === 'overflow' && value !== 'visible')
										) {
											treeo.declarations.zoom = 1;
										}
										/* istanbul ignore else  */
										if (prop === 'display' && value === 'inline-block') {
											treeo.declarations['*display'] = 'inline';
										}
										/* istanbul ignore else  */
										if (prop === 'opacity') {
											treeo.declarations.filter =
												'alpha(opacity=' + parseFloat(value, 10) * 100 + ')';
										}
									}
									if (value !== null) {
										// value could be an object for custom classes with breakPoints
										// e.g.
										// 'custom': {
										//     'P($gutter)': {
										//         default: '10px',
										//         sm: '12px',
										//         md: '14px',
										//         lg: '20px'
										//     }
										// }
										if (_.isObject(value)) {
											Object.keys(value).forEach(function(bp) {
												// don't continue if we can't find the breakPoint in the declaration
												if (
													!config.hasOwnProperty('breakPoints') ||
													!config.breakPoints.hasOwnProperty(bp)
												) {
													return;
												}
												treeo.declarations[config.breakPoints[bp]] = {};
												treeo.declarations[config.breakPoints[bp]][
													prop
												] = treeo.declarations[prop].replace(
													'$' + index,
													value[bp]
												);
											});
											// handle default value in the custom class
											if (!value.hasOwnProperty('default')) {
												// default has not been passed, make sure we delete it
												delete treeo.declarations[prop];
											} else {
												treeo.declarations[prop] = treeo.declarations[
													prop
												].replace('$' + index, value.default);
											}
										} else {
											treeo.declarations[prop] = treeo.declarations[
												prop
											].replace('$' + index, value);
										}
									} else {
										treeo.declarations = null;
									}
								});
								// If any of the arguments in the declaration weren't replaced, then we need to clean them up
								if (
									treeo.declarations &&
									treeo.declarations[prop] &&
									treeo.declarations[prop].indexOf('$') >= 0
								) {
									treeo.declarations[prop] = treeo.declarations[prop].replace(
										/[,\s]?\$\d+/g,
										''
									);
								}
							}

							// add important for the following cases:
							//    - `!` was used in the class name
							//    - rule has a parent class, a namespace was given and the rule is not a helper [1]
							// [1] rules with a parent class won't have a namespace attached to the selector since
							//     it prevents people from using the parent class at the root element (<html>). But
							//     to give it extra specificity (to make sure it has more weight than normal atomic
							//     classes) we add important to them. Helper classes don't need it because they do
							//     not share the same namespace.
							if (
								treeo.declarations &&
								(match.important ||
									(match.parent && options.namespace && rule.type !== 'helper'))
							) {
								treeo.declarations[prop] += ' !important';
							}
						}

						tree[rule.matcher].push(treeo);
					}, this);

					// throw warnings
					if (isVerbose && warnings.length > 0) {
						warnings.forEach(function(className) {
							console.warn(
								[
									'Warning: Class `' +
										className +
										'` is ambiguous, and must be manually added to your config file:',
									'"custom": {',
									'    "' + className + '": <YOUR-CUSTOM-VALUE>',
									'}'
								].join('\n')
							);
						});
					}

					return tree;
				};

				/**
 * Get CSS given an array of class names, a config and css options.
 * examples:
 *
 * getCss({
 *     custom: {
 *         heading: '80px'
 *     },
 *     breakPoints: {
 *         'sm': '@media(min-width:500px)',
 *         'md': '@media(min-width:900px)',
 *         'lg': '@media(min-width:1200px)'
 *     },
 *     classNames: ['D(b)', 'Op(1)', 'D(n):h', 'Fz(heading)']
 * }, {
 *     rtl: true
 * });
 *
 * @public
 */
				Atomizer.prototype.getCss = function(
					config /*:AtomizerConfig*/,
					options /*:CSSOptions*/
				) /*:string*/ {
					var jss = {};
					var tree;
					var content = '';
					var breakPoints;

					options = objectAssign(
						{},
						{
							// require: [],
							// morph: null,
							banner: '',
							namespace: null,
							rtl: false,
							ie: false
						},
						options
					);

					// validate config.breakPoints
					if (config && config.breakPoints) {
						if (!_.isObject(config.breakPoints)) {
							throw new TypeError('`config.breakPoints` must be an Object');
						}
						/* istanbul ignore else  */
						if (_.size(config.breakPoints) > 0) {
							for (var bp in config.breakPoints) {
								if (!/^@media/.test(config.breakPoints[bp])) {
									throw new Error(
										'Breakpoint `' + bp + '` must start with `@media`.'
									);
								} else {
									breakPoints = config.breakPoints;
								}
							}
						}
					}

					// make sense of the config
					tree = this.parseConfig(config, options);

					// write JSS
					// start by iterating rules (we need to follow the order that the rules were declared)
					this.rules.forEach(function(rule) {
						// check if we have a class name that matches this rule
						if (tree[rule.matcher]) {
							tree[rule.matcher].forEach(function(treeo) {
								var breakPoint;
								var selector;

								// if we were not able to find the declaration then don't write anything
								if (!treeo.declarations) {
									return;
								}

								breakPoint = breakPoints && breakPoints[treeo.breakPoint];

								// this is where we start writing the selector
								selector = Atomizer.escapeSelector(treeo.className);

								// handle parent classname
								if (treeo.parentSelector) {
									selector = [
										Atomizer.escapeSelector(treeo.parent),
										Grammar.getPseudo(treeo.parentPseudo),
										treeo.parentSep === '_'
											? ' '
											: [' ', treeo.parentSep, ' '].join(''),
										'.',
										selector
									].join('');
								}

								// handle pseudo in values
								if (treeo.valuePseudo) {
									selector = [
										selector,
										Grammar.getPseudo(treeo.valuePseudo)
									].join('');
								}

								// add the dot for the class
								selector = ['.', selector].join('');

								// add the namespace only if we don't have a parent selector
								if (!treeo.parent) {
									if (rule.type === 'helper' && options.helpersNamespace) {
										selector = [options.helpersNamespace, ' ', selector].join(
											''
										);
									} else if (rule.type !== 'helper' && options.namespace) {
										selector = [options.namespace, ' ', selector].join('');
									}
								}

								// rules are companion classes to the main atomic class
								if (rule.rules) {
									_.merge(jss, rule.rules);
								}

								// finaly, write the final parts
								// put the declaration to the JSS object with the associated class name
								/* istanbul ignore else */
								if (!jss[selector]) {
									jss[selector] = {};
								}
								if (breakPoint) {
									jss[selector][breakPoint] = treeo.declarations;
								} else {
									jss[selector] = treeo.declarations;
								}
							});
						}
					});

					// convert JSS to CSS
					content = options.banner + JSS.jssToCss(jss);

					// fix the comma problem in Absurd
					content = Atomizer.replaceConstants(content, options.rtl);

					return content;
				};

				/**
 * Escape CSS selectors with a backslash
 * e.g. ".W-100%" => ".W-100\%"
 */
				Atomizer.escapeSelector = function(str /*:string*/) /*:string*/ {
					if (!str && str !== 0) {
						throw new TypeError('str must be present');
					}

					if (str.constructor !== String) {
						return str;
					}

					// TODO: maybe find a better regex? (-?) is here because '-' is considered a word boundary
					// so we get it and put it back to the string.
					return str.replace(/\b(-?)([^-_a-zA-Z0-9\s]+)/g, function(
						str,
						dash,
						characters
					) {
						return (
							dash +
							characters
								.split('')
								.map(function(character) {
									return ['\\', character].join('');
								})
								.join('')
						);
					});
				};

				/**
 * Replace LTR/RTL placeholders with actual left/right strings
 */
				Atomizer.replaceConstants = function(
					str /*:string*/,
					rtl /*:boolean*/
				) {
					var start = rtl ? 'right' : 'left';
					var end = rtl ? 'left' : 'right';

					if (!str || str.constructor !== String) {
						return str;
					}

					return str.replace(/__START__/g, start).replace(/__END__/g, end);
				};

				module.exports = Atomizer;
			},
			{
				'./helpers.js': 5,
				'./lib/grammar': 6,
				'./lib/jss': 7,
				'./lib/utils': 8,
				'./rules.js': 9,
				lodash: 1,
				'object-assign': 2,
				xregexp: 3
			}
		]
	},
	{},
	[]
);

var Atomizer = require('Atomizer');
var atomizer = new Atomizer();
