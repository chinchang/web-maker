webpackJsonp([0],{

/***/ "+ZAi":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = undefined;

var _preact = __webpack_require__("KM04");

var _Modal = __webpack_require__("inAt");

var _Modal2 = _interopRequireDefault(_Modal);

var _CodeMirrorBox = __webpack_require__("CIHI");

var _CodeMirrorBox2 = _interopRequireDefault(_CodeMirrorBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ref = (0, _preact.h)(
	'h1',
	null,
	'Atomic CSS Settings'
);

var _ref2 = (0, _preact.h)(
	'h3',
	null,
	'Configure Atomizer settings.',
	' ',
	(0, _preact.h)(
		'a',
		{
			href: 'https://github.com/acss-io/atomizer#api',
			target: '_blank',
			rel: 'noopener noreferrer'
		},
		'Read more'
	),
	' ',
	'about available settings.'
);

var CssSettingsModal = function (_Component) {
	_inherits(CssSettingsModal, _Component);

	function CssSettingsModal() {
		_classCallCheck(this, CssSettingsModal);

		return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	CssSettingsModal.prototype.componentDidUpdate = function componentDidUpdate() {
		var _this2 = this;

		if (this.props.show) {
			setTimeout(function () {
				if (_this2.props.settings) {
					_this2.cm.setValue(_this2.props.settings.acssConfig);
				}

				// Refresh is required because codemirror gets scaled inside modal and loses alignement.
				_this2.cm.refresh();
				_this2.cm.focus();
			}, 500);
		}
	};

	CssSettingsModal.prototype.render = function render() {
		var _this3 = this;

		return (0, _preact.h)(
			_Modal2.default,
			{ show: this.props.show, closeHandler: this.props.closeHandler },
			_ref,
			_ref2,
			(0, _preact.h)(
				'div',
				{ style: 'height: calc(100vh - 350px);' },
				(0, _preact.h)(_CodeMirrorBox2.default, {
					options: {
						mode: 'application/ld+json',
						theme: this.props.editorTheme
					},
					onCreation: function onCreation(cm) {
						return _this3.cm = cm;
					},
					onBlur: function onBlur(cm) {
						return _this3.props.onChange(cm.getValue());
					}
				})
			),
			(0, _preact.h)(
				'div',
				{ 'class': 'flex flex-h-end' },
				(0, _preact.h)(
					'button',
					{ 'class': 'btn btn--primary', onClick: this.props.closeHandler },
					'Apply and Close'
				)
			)
		);
	};

	return CssSettingsModal;
}(_preact.Component);

exports.default = CssSettingsModal;

/***/ }),

/***/ "0job":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.Icons = Icons;

var _preact = __webpack_require__("KM04");

var _ref = (0, _preact.h)(
	"symbol",
	{ id: "logo", viewBox: "-145 -2 372 175" },
	(0, _preact.h)(
		"g",
		{
			stroke: "none",
			strokeWidth: 1,
			fill: "none",
			fillRule: "evenodd",
			transform: "translate(-145.000000, -1.000000)"
		},
		(0, _preact.h)("polygon", {
			id: "Path-1",
			fill: "#FF4600",
			points: "31 0 232 0 132 173.310547"
		}),
		(0, _preact.h)("polygon", {
			id: "Path-1",
			fill: "#FF6C00",
			points: "0 0 201 0 101 173.310547"
		}),
		(0, _preact.h)("polygon", {
			id: "Path-1",
			fill: "#FF6C00",
			transform: "translate(271.500000, 86.500000) scale(1, -1) translate(-271.500000, -86.500000) ",
			points: "171 0 372 0 272 173.310547"
		}),
		(0, _preact.h)("polygon", {
			id: "Path-1",
			fill: "#FF4600",
			transform: "translate(241.500000, 86.500000) scale(1, -1) translate(-241.500000, -86.500000) ",
			points: "141 0 342 0 242 173.310547"
		})
	)
);

var _ref2 = (0, _preact.h)(
	"symbol",
	{ id: "bug-icon", viewBox: "0 0 24 24" },
	(0, _preact.h)("path", { d: "M14,12H10V10H14M14,16H10V14H14M20,8H17.19C16.74,7.22 16.12,6.55 15.37,6.04L17,4.41L15.59,3L13.42,5.17C12.96,5.06 12.5,5 12,5C11.5,5 11.04,5.06 10.59,5.17L8.41,3L7,4.41L8.62,6.04C7.88,6.55 7.26,7.22 6.81,8H4V10H6.09C6.04,10.33 6,10.66 6,11V12H4V14H6V15C6,15.34 6.04,15.67 6.09,16H4V18H6.81C7.85,19.79 9.78,21 12,21C14.22,21 16.15,19.79 17.19,18H20V16H17.91C17.96,15.67 18,15.34 18,15V14H20V12H18V11C18,10.66 17.96,10.33 17.91,10H20V8Z" })
);

var _ref3 = (0, _preact.h)(
	"symbol",
	{ id: "google-icon", viewBox: "0 0 24 24" },
	(0, _preact.h)("path", { d: "M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z" })
);

var _ref4 = (0, _preact.h)(
	"symbol",
	{ id: "fb-icon", viewBox: "0 0 24 24" },
	(0, _preact.h)("path", { d: "M17,2V2H17V6H15C14.31,6 14,6.81 14,7.5V10H14L17,10V14H14V22H10V14H7V10H10V6A4,4 0 0,1 14,2H17Z" })
);

var _ref5 = (0, _preact.h)(
	"symbol",
	{ id: "github-icon", viewBox: "0 0 24 24" },
	(0, _preact.h)("path", { d: "M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" })
);

var _ref6 = (0, _preact.h)(
	"symbol",
	{ id: "settings-icon", viewBox: "0 0 24 24" },
	(0, _preact.h)("path", { d: "M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" })
);

var _ref7 = (0, _preact.h)(
	"symbol",
	{ id: "twitter-icon", viewBox: "0 0 16 16" },
	(0, _preact.h)("path", { d: "M15.969,3.058c-0.586,0.26-1.217,0.436-1.878,0.515c0.675-0.405,1.194-1.045,1.438-1.809 c-0.632,0.375-1.332,0.647-2.076,0.793c-0.596-0.636-1.446-1.033-2.387-1.033c-1.806,0-3.27,1.464-3.27,3.27 c0,0.256,0.029,0.506,0.085,0.745C5.163,5.404,2.753,4.102,1.14,2.124C0.859,2.607,0.698,3.168,0.698,3.767 c0,1.134,0.577,2.135,1.455,2.722C1.616,6.472,1.112,6.325,0.671,6.08c0,0.014,0,0.027,0,0.041c0,1.584,1.127,2.906,2.623,3.206 C3.02,9.402,2.731,9.442,2.433,9.442c-0.211,0-0.416-0.021-0.615-0.059c0.416,1.299,1.624,2.245,3.055,2.271 c-1.119,0.877-2.529,1.4-4.061,1.4c-0.264,0-0.524-0.015-0.78-0.046c1.447,0.928,3.166,1.469,5.013,1.469 c6.015,0,9.304-4.983,9.304-9.304c0-0.142-0.003-0.283-0.009-0.423C14.976,4.29,15.531,3.714,15.969,3.058z" })
);

var _ref8 = (0, _preact.h)(
	"symbol",
	{ id: "heart-icon", viewBox: "0 0 24 24" },
	(0, _preact.h)("path", { d: "M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" })
);

var _ref9 = (0, _preact.h)(
	"symbol",
	{ id: "play-icon", viewBox: "0 0 24 24" },
	(0, _preact.h)(
		"svg",
		null,
		(0, _preact.h)("path", { d: "M8,5.14V19.14L19,12.14L8,5.14Z" })
	)
);

var _ref10 = (0, _preact.h)(
	"symbol",
	{ id: "cancel-icon", viewBox: "0 0 24 24" },
	(0, _preact.h)(
		"svg",
		null,
		(0, _preact.h)("path", { d: "M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12C4,13.85 4.63,15.55 5.68,16.91L16.91,5.68C15.55,4.63 13.85,4 12,4M12,20A8,8 0 0,0 20,12C20,10.15 19.37,8.45 18.32,7.09L7.09,18.32C8.45,19.37 10.15,20 12,20Z" })
	)
);

var _ref11 = (0, _preact.h)(
	"symbol",
	{ id: "chevron-icon", viewBox: "0 0 24 24" },
	(0, _preact.h)(
		"svg",
		null,
		(0, _preact.h)("path", { d: "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" })
	)
);

var _ref12 = (0, _preact.h)(
	"symbol",
	{ id: "chat-icon", viewBox: "0 0 24 24" },
	(0, _preact.h)("path", { d: "M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M8,14H6V12H8V14M8,11H6V9H8V11M8,8H6V6H8V8M15,14H10V12H15V14M18,11H10V9H18V11M18,8H10V6H18V8Z" })
);

var _ref13 = (0, _preact.h)("path", { d: "M22,12V20A2,2 0 0,1 20,22H4A2,2 0 0,1 2,20V12A1,1 0 0,1 1,11V8A2,2 0 0,1 3,6H6.17C6.06,5.69 6,5.35 6,5A3,3 0 0,1 9,2C10,2 10.88,2.5 11.43,3.24V3.23L12,4L12.57,3.23V3.24C13.12,2.5 14,2 15,2A3,3 0 0,1 18,5C18,5.35 17.94,5.69 17.83,6H21A2,2 0 0,1 23,8V11A1,1 0 0,1 22,12M4,20H11V12H4V20M20,20V12H13V20H20M9,4A1,1 0 0,0 8,5A1,1 0 0,0 9,6A1,1 0 0,0 10,5A1,1 0 0,0 9,4M15,4A1,1 0 0,0 14,5A1,1 0 0,0 15,6A1,1 0 0,0 16,5A1,1 0 0,0 15,4M3,8V10H11V8H3M13,8V10H21V8H13Z" });

var _ref14 = (0, _preact.h)("symbol", { id: "gift-icon", viewBox: "0 0 24 24" });

var _ref15 = (0, _preact.h)(
	"symbol",
	{ id: "cross-icon", viewBox: "0 0 24 24" },
	(0, _preact.h)("path", { d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" })
);

var _ref16 = (0, _preact.h)(
	"symbol",
	{ id: "keyboard-icon", viewBox: "0 0 24 24" },
	(0, _preact.h)("path", { d: "M19,10H17V8H19M19,13H17V11H19M16,10H14V8H16M16,13H14V11H16M16,17H8V15H16M7,10H5V8H7M7,13H5V11H7M8,11H10V13H8M8,8H10V10H8M11,11H13V13H11M11,8H13V10H11M20,5H4C2.89,5 2,5.89 2,7V17A2,2 0 0,0 4,19H20A2,2 0 0,0 22,17V7C22,5.89 21.1,5 20,5Z" })
);

var _ref17 = (0, _preact.h)(
	"symbol",
	{ id: "mode-icon", viewBox: "0 0 100 100" },
	(0, _preact.h)(
		"g",
		null,
		(0, _preact.h)("rect", { x: 0, y: 0, width: 28, height: 47 }),
		(0, _preact.h)("rect", { x: 36, y: 0, width: 28, height: 47 }),
		(0, _preact.h)("rect", { x: 72, y: 0, width: 28, height: 47 }),
		(0, _preact.h)("rect", { x: 0, y: 53, width: 100, height: 47 })
	)
);

var _ref18 = (0, _preact.h)(
	"symbol",
	{ id: "vertical-mode-icon", viewBox: "0 0 100 100" },
	(0, _preact.h)(
		"g",
		null,
		(0, _preact.h)("rect", { x: 0, y: 0, width: 20, height: 100 }),
		(0, _preact.h)("rect", { x: 23, y: 0, width: 20, height: 100 }),
		(0, _preact.h)("rect", { x: 46, y: 0, width: 20, height: 100 }),
		(0, _preact.h)("rect", { x: 69, y: 0, width: 32, height: 100 })
	)
);

var _ref19 = (0, _preact.h)(
	"symbol",
	{ id: "search", viewBox: "0 0 24 24" },
	(0, _preact.h)("path", { d: "M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" })
);

var _ref20 = (0, _preact.h)(
	"g",
	{ fill: "none", fillRule: "evenodd", strokeWidth: 10 },
	(0, _preact.h)(
		"circle",
		{ cx: 22, cy: 22, r: 1 },
		(0, _preact.h)("animate", {
			attributeName: "r",
			begin: "0s",
			dur: "1.8s",
			values: "1; 20",
			calcMode: "spline",
			keyTimes: "0; 1",
			keySplines: "0.165, 0.84, 0.44, 1",
			repeatCount: "indefinite"
		}),
		(0, _preact.h)("animate", {
			attributeName: "stroke-opacity",
			begin: "0s",
			dur: "1.8s",
			values: "1; 0",
			calcMode: "spline",
			keyTimes: "0; 1",
			keySplines: "0.3, 0.61, 0.355, 1",
			repeatCount: "indefinite"
		})
	),
	(0, _preact.h)(
		"circle",
		{ cx: 22, cy: 22, r: 1 },
		(0, _preact.h)("animate", {
			attributeName: "r",
			begin: "-0.9s",
			dur: "1.8s",
			values: "1; 20",
			calcMode: "spline",
			keyTimes: "0; 1",
			keySplines: "0.165, 0.84, 0.44, 1",
			repeatCount: "indefinite"
		}),
		(0, _preact.h)("animate", {
			attributeName: "stroke-opacity",
			begin: "-0.9s",
			dur: "1.8s",
			values: "1; 0",
			calcMode: "spline",
			keyTimes: "0; 1",
			keySplines: "0.3, 0.61, 0.355, 1",
			repeatCount: "indefinite"
		})
	)
);

function Icons() {
	return (0, _preact.h)(
		"svg",
		{
			version: "1.1",
			xmlns: "http://www.w3.org/2000/svg",
			style: { display: 'none' }
		},
		_ref,
		_ref2,
		_ref3,
		_ref4,
		_ref5,
		_ref6,
		_ref7,
		_ref8,
		_ref9,
		_ref10,
		_ref11,
		_ref12,
		(0, _preact.h)(
			"symbol",
			{ id: "gift-icon", viewBox: "0 0 24 24" },
			_ref13,
			_ref14,
			_ref15,
			_ref16,
			_ref17,
			_ref18,
			_ref19,
			(0, _preact.h)(
				"symbol",
				{ id: "loader-icon", viewBox: "0 0 44 44" },
				_ref20
			)
		)
	);
}

/***/ }),

/***/ "0lUe":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.Notifications = Notifications;

var _preact = __webpack_require__("KM04");

var _common = __webpack_require__("f66c");

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _ref2 = (0, _preact.h)(
	'strong',
	null,
	'\uD83D\uDD27 Bugfix'
);

var _ref3 = (0, _preact.h)(
	'strong',
	null,
	'\u267F\uFE0F Accessibility'
);

function NotificationItem(_ref) {
	var type = _ref.type,
	    children = _ref.children;

	var strongTag;
	if (type === 'bug') {
		strongTag = _ref2;
	} else if (type === 'a11y') {
		strongTag = _ref3;
	}
	return (0, _preact.h)(
		'li',
		null,
		strongTag,
		': ',
		children
	);
}

function ThanksTo(_ref4) {
	var name = _ref4.name,
	    url = _ref4.url;

	return (0, _preact.h)(
		'a',
		{ href: url, target: '_blank', rel: 'noopener noreferrer' },
		' ',
		name
	);
}

var _ref6 = (0, _preact.h)(
	'p',
	null,
	(0, _preact.h)(
		'strong',
		null,
		'\uD83D\uDE80 Announcement'
	),
	': Hi! I am Kushagra Gour (creator of Web Maker) and I have launched a',
	(0, _preact.h)(
		'a',
		{
			href: 'https://patreon.com/kushagra',
			target: '_blank',
			rel: 'noopener noreferrer'
		},
		' ',
		'Patreon campaign'
	),
	'. If you love Web Maker, consider pledging to',
	(0, _preact.h)(
		'a',
		{
			href: 'https://patreon.com/kushagra',
			target: '_blank',
			rel: 'noopener noreferrer'
		},
		' ',
		'support me'
	),
	' ',
	':)'
);

var _ref7 = (0, _preact.h)(
	'p',
	null,
	(0, _preact.h)(
		'a',
		{
			href: 'https://github.com/chinchang/web-maker/issues',
			target: '_blank',
			rel: 'noopener noreferrer'
		},
		'Suggest features or report bugs.'
	)
);

var _ref8 = (0, _preact.h)(
	'a',
	{
		href: 'https://chrome.google.com/webstore/detail/web-maker/lkfkkhfhhdkiemehlpkgjeojomhpccnh/reviews',
		target: '_blank',
		rel: 'noopener noreferrer',
		'class': 'btn'
	},
	'Please rate Web Maker ',
	(0, _preact.h)('span', { 'class': 'star' })
);

var _ref9 = (0, _preact.h)(
	'a',
	{
		href: 'http://twitter.com/share?url=https://webmakerapp.com/&text=Web Maker - A blazing fast %26 offline web playground! via @webmakerApp&related=webmakerApp&hashtags=web,editor,chrome,extension',
		target: '_blank',
		rel: 'noopener noreferrer',
		'class': 'btn'
	},
	'Share it'
);

function Notification(_ref5) {
	var version = _ref5.version,
	    isLatest = _ref5.isLatest,
	    props = _objectWithoutProperties(_ref5, ['version', 'isLatest']);

	return (0, _preact.h)(
		'div',
		{ 'class': 'notification' },
		(0, _preact.h)(
			'span',
			{ 'class': 'notification__version' },
			version
		),
		(0, _preact.h)(
			'ul',
			null,
			props.children
		),
		isLatest ? (0, _preact.h)(
			'div',
			{ 'class': 'mt-2' },
			_ref6,
			_ref7,
			(0, _preact.h)(
				'p',
				null,
				'Web Maker now has more than 50K weekly active users! Thank you for being a part of this community of awesome developers. If you find Web Maker helpful,',
				' ',
				_ref8,
				'\xA0',
				_ref9,
				'\xA0',
				(0, _preact.h)(
					_common.Button,
					{
						'aria-label': 'Support the developer',
						onClick: props.onSupportBtnClick,
						'data-event-action': 'supportDeveloperChangelogBtnClick',
						'data-event-category': 'ui',
						'class': 'btn btn-icon'
					},
					'Support the developer'
				)
			)
		) : null
	);
}

var _ref10 = (0, _preact.h)(
	'h1',
	null,
	'Whats new?'
);

var _ref11 = (0, _preact.h)(
	NotificationItem,
	{ type: 'a11y' },
	'Improper links are now buttons with proper focus indication and screen-reader support. Thanks',
	' ',
	(0, _preact.h)(ThanksTo, { url: 'https://github.com/jpsc', name: '@jpsc' })
);

var _ref12 = (0, _preact.h)(
	NotificationItem,
	{ type: 'bug' },
	'Auto-complete suggestions are now working.'
);

var _ref13 = (0, _preact.h)(
	NotificationItem,
	{ type: 'bug' },
	'Fixes resetting pane sizes when opening any popup or console.'
);

var _ref14 = (0, _preact.h)(
	'li',
	null,
	(0, _preact.h)(
		'strong',
		null,
		'[Dev] Tests'
	),
	': We now have one running automated test :) More to come. Thanks',
	' ',
	(0, _preact.h)(ThanksTo, { url: 'https://github.com/DanielRuf', name: '@DanielRuf' })
);

var _ref15 = (0, _preact.h)(
	'li',
	null,
	(0, _preact.h)(
		'strong',
		null,
		'\uD83D\uDD25 [Dev] Code Refactor'
	),
	': I rewrote Web Maker. Yes, Web Maker\'s codebase has been ported from plain JS to',
	' ',
	(0, _preact.h)(
		'a',
		{
			href: 'https://preactjs.com/',
			target: '_blank',
			rel: 'noopener noreferrer'
		},
		'Preact'
	),
	'. What does this mean for you as a end-user? This means that now that the code is much smaller, more modular and maintainable. Hence, future features can be developed more rapidly. So fasten your seat belts, and get ready to use loads of new features coming your way in next releases!',
	(0, _preact.h)('br', null),
	(0, _preact.h)(
		'a',
		{
			href: 'https://medium.com/web-maker/web-maker-is-now-in-preact-85af98be8683',
			target: '_blank',
			rel: 'noopener noreferrer'
		},
		'Read more about this big code refactor'
	),
	'.'
);

var _ref16 = (0, _preact.h)(
	'li',
	null,
	(0, _preact.h)(
		'a',
		{ href: 'https://p5js.org/', target: '_blank', rel: 'noopener noreferrer' },
		'p5.js'
	),
	' ',
	'added to popular JS libraries list. Thanks',
	' ',
	(0, _preact.h)(ThanksTo, { url: 'https://github.com/nucliweb', name: '@nucliweb' }),
	'.'
);

var _ref17 = (0, _preact.h)(
	'li',
	null,
	(0, _preact.h)(
		'strong',
		null,
		'\uD83D\uDE80 Loop timeout setting'
	),
	': You now have a setting to tweak the maximum timeout of a loop iteration before it\'s marked as infinite loop.'
);

var _ref18 = (0, _preact.h)(
	NotificationItem,
	{ type: 'a11y' },
	'Modals now have proper keyboard navigation integrated.'
);

var _ref19 = (0, _preact.h)(
	NotificationItem,
	{ type: 'a11y' },
	'Color contrast improvements.'
);

var _ref20 = (0, _preact.h)(
	'li',
	null,
	'\uD83D\uDE80 Popular libraries list updated. Thanks',
	(0, _preact.h)(ThanksTo, { url: 'https://github.com/diomed', name: '@diomed' }),
	' &',
	' ',
	(0, _preact.h)(ThanksTo, {
		url: 'https://github.com/leninalbertolp',
		name: '@leninalbertolp'
	})
);

var _ref21 = (0, _preact.h)(
	NotificationItem,
	{ type: 'bug' },
	'Modal take up appropriate width instead of spanning full width.'
);

var _ref22 = (0, _preact.h)(
	NotificationItem,
	{ type: 'bug' },
	'Fix the "Run" button not refreshing the preview after release 3.0.4.'
);

var _ref23 = (0, _preact.h)(
	'li',
	null,
	(0, _preact.h)(
		'strong',
		null,
		'Mobile Support (app only).'
	),
	': Make the Web Maker app usable on mobile. This is only for web app as Chrome extensions don\'t run on mobile.'
);

var _ref24 = (0, _preact.h)(
	NotificationItem,
	{ type: 'bug' },
	'Guarantee code doesn\'t execute when "auto preview" is off.'
);

var _ref25 = (0, _preact.h)(
	'li',
	null,
	'Add link to our new',
	(0, _preact.h)(
		'a',
		{
			href: 'https://web-maker.slack.com',
			target: '_blank',
			rel: 'noopener noreferrer'
		},
		'Slack channel'
	),
	' ',
	'\uD83E\uDD17.'
);

var _ref26 = (0, _preact.h)(
	'li',
	null,
	(0, _preact.h)(
		'strong',
		null,
		'Bugfix (extension)'
	),
	': "Save as HTML" file saves with correct extension.'
);

var _ref27 = (0, _preact.h)(
	'div',
	{ 'class': 'notification' },
	(0, _preact.h)(
		'span',
		{ 'class': 'notification__version' },
		'3.0.1'
	),
	(0, _preact.h)(
		'ul',
		null,
		(0, _preact.h)(
			'li',
			null,
			'After months of work, here is Web Maker 3.0.',
			(0, _preact.h)(
				'a',
				{
					href: 'https://medium.com/web-maker/web-maker-3-0-is-here-f158a40eeaee',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				' ',
				'Read the blog post about it'
			),
			'.'
		),
		(0, _preact.h)(
			'li',
			null,
			'Web Maker is no more just a Chrome extension, it is also available as web app that runs offline just like the extension! Checkout it out ->',
			(0, _preact.h)(
				'a',
				{
					href: 'https://webmakerapp.com/app/',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				'https://webmakerapp.com/app/'
			),
			'.'
		),
		(0, _preact.h)(
			'li',
			null,
			'Now use Web Maker web app on any modern browser (tested with Chrome and Firefox).'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'User Accounts'
			),
			' - The much requested user accounts are here. Now maintain your account and store all your creations in the cloud and access them anywhere anytime.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'New layout mode'
			),
			' - One more layout mode, that lets you align all the panes vertically.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'No more restriction on scripts (Web app only)'
			),
			' - If you are using the web app, there is no more a restriction to load scripts from only specific domains. Load any script!'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Inline scripts (Web app only)'
			),
			' - The restriction of writing JavaScript only in JS pane is also removed.'
		)
	)
);

var _ref28 = (0, _preact.h)(
	'div',
	{ 'class': 'notification' },
	(0, _preact.h)(
		'span',
		{ 'class': 'notification__version' },
		'2.9.7'
	),
	(0, _preact.h)(
		'ul',
		null,
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'a',
				{
					href: 'https://tailwindcss.com/',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				'Tailwind CSS'
			),
			' ',
			'added to popular CSS libraries list. Thanks',
			' ',
			(0, _preact.h)(ThanksTo, { url: 'https://github.com/diomed', name: 'diomed' }),
			'.'
		),
		(0, _preact.h)(
			'li',
			null,
			'Popular libraries list updated. Thanks',
			' ',
			(0, _preact.h)(ThanksTo, { url: 'https://github.com/diomed', name: 'diomed' }),
			'.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Dev'
			),
			': Bug fixes and code refactoring to make things simple.',
			' ',
			(0, _preact.h)(ThanksTo, {
				url: 'https://github.com/iamandrewluca',
				name: 'iamandrewluca'
			}),
			' ',
			'.'
		)
	)
);

var _ref29 = (0, _preact.h)(
	'div',
	{ 'class': 'notification' },
	(0, _preact.h)(
		'span',
		{ 'class': 'notification__version' },
		'2.9.6'
	),
	(0, _preact.h)(
		'ul',
		null,
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Bugfix'
			),
			': Fix close buttons not working in notifications and keyboard shortcuts modal.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Bugfix'
			),
			': Fix keyboard shortcut to see keyboard shortcuts :) Thanks',
			(0, _preact.h)(
				'a',
				{
					href: 'https://github.com/ClassicOldSong',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				'ClassicOldSong'
			),
			'.'
		)
	)
);

var _ref30 = (0, _preact.h)(
	'div',
	{ 'class': 'notification' },
	(0, _preact.h)(
		'span',
		{ 'class': 'notification__version' },
		'2.9.5'
	),
	(0, _preact.h)(
		'ul',
		null,
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'a',
				{
					href: 'https://medium.com/web-maker/release-2-9-5-add-library-search-pane-collapsing-ux-improvements-more-1085216c1301',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				'Read blog post about this release.'
			)
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Keyboard shortcuts panel'
			),
			': Add a list of all keyboard shotcuts. Access with',
			(0, _preact.h)(
				'code',
				null,
				' Ctrl/\u2318 + Shift + ?'
			),
			' or click keyboard button in footer.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Add external library'
			),
			': Better UX for searching third party libraries.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Improvement'
			),
			': Code panes now go fullscreen when double-clicked on their headers - which is much more intuitive behavior based on feedback from lot of developers.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Improvement'
			),
			': Add',
			(0, _preact.h)(
				'code',
				null,
				'allowfullscreen'
			),
			' attribute on iframes. Thanks',
			(0, _preact.h)(
				'a',
				{
					href: 'https://github.com/ClassicOldSong',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				'ClassicOldSong'
			),
			'.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Bugfix'
			),
			' - Stop screenlog.js from showing up in the exported HTML.'
		),
		(0, _preact.h)(
			'li',
			null,
			'Popular external libraries list updated. Thanks',
			(0, _preact.h)(
				'a',
				{
					href: 'https://github.com/jlapitan',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				'jlapitan'
			),
			'.'
		)
	)
);

var _ref31 = (0, _preact.h)(
	'div',
	{ 'class': 'notification' },
	(0, _preact.h)(
		'span',
		{ 'class': 'notification__version' },
		'2.9.4'
	),
	(0, _preact.h)(
		'ul',
		null,
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Improvement'
			),
			': Atomic CSS (Atomizer) has been updated to latest version. Now you can do things like psuedo elements. Learn More.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Bugfix'
			),
			' - Logging circular objects is now possible. It won\'t show in the Web Maker console, but will show fine in browser\'s console.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Bugfix'
			),
			' - Console\'s z-index issue has been fixed.'
		)
	)
);

var _ref32 = (0, _preact.h)(
	'div',
	{ 'class': 'notification' },
	(0, _preact.h)(
		'span',
		{ 'class': 'notification__version' },
		'2.9.3'
	),
	(0, _preact.h)(
		'ul',
		null,
		(0, _preact.h)(
			'li',
			null,
			'Choose the save location while exporting your saved creations. Now easily sync them to your Dropbox or any cloud storage.'
		),
		(0, _preact.h)(
			'li',
			null,
			'All modals inside the app now have a close button.'
		),
		(0, _preact.h)(
			'li',
			null,
			'Checkbox that showed on clicking a boolean value is now removed. Thanks',
			(0, _preact.h)(
				'a',
				{
					href: 'https://github.com/gauravmuk',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				'Gaurav Nanda'
			),
			'.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Bugfix'
			),
			' - Screenshots on retina device are now correct. Thanks',
			(0, _preact.h)(
				'a',
				{
					href: 'https://github.com/AshBardhan',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				'Ashish Bardhan'
			),
			'.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Bugfix'
			),
			' - Double console log in detached mode fixed.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Bugfix'
			),
			' - Console.clear now works in detached mode too.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Bugfix'
			),
			' - DOCTYPE added in preview.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Bugfix'
			),
			' - Typo correction in README. Thanks',
			(0, _preact.h)(
				'a',
				{
					href: 'https://github.com/AdilMah',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				'Adil Mahmood'
			),
			'.'
		),
		(0, _preact.h)(
			'li',
			null,
			'gstatic.com is available to load external JavaScripts from.'
		),
		(0, _preact.h)(
			'li',
			null,
			'Popular libraries list updated. Thanks',
			(0, _preact.h)(
				'a',
				{
					href: 'https://github.com/diomed',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				'diomed'
			),
			'.'
		),
		(0, _preact.h)(
			'li',
			null,
			'Added',
			(0, _preact.h)(
				'a',
				{
					href: 'https://github.com/chinchang/web-maker/blob/master/CONTRIBUTING.md',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				'contribution guidelines'
			),
			' ',
			'in the Github repository.'
		)
	)
);

var _ref33 = (0, _preact.h)(
	'div',
	{ 'class': 'notification' },
	(0, _preact.h)(
		'span',
		{ 'class': 'notification__version' },
		'2.9.2'
	),
	(0, _preact.h)(
		'ul',
		null,
		(0, _preact.h)(
			'li',
			null,
			'Minor bug fixes.'
		)
	)
);

var _ref34 = (0, _preact.h)(
	'div',
	{ 'class': 'notification' },
	(0, _preact.h)(
		'span',
		{ 'class': 'notification__version' },
		'2.9.1'
	),
	(0, _preact.h)(
		'ul',
		null,
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'a',
				{
					href: 'https://medium.com/web-maker/v2-9-lots-of-goodies-bd1e939571f6',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				'Read blog post about last release.'
			)
		),
		(0, _preact.h)(
			'li',
			null,
			'Use Ctrl/Cmd+D to select next occurence of matching selection.'
		),
		(0, _preact.h)(
			'li',
			null,
			'Improve onboard experience.'
		)
	)
);

var _ref35 = (0, _preact.h)(
	'div',
	{ 'class': 'notification' },
	(0, _preact.h)(
		'span',
		{ 'class': 'notification__version' },
		'2.9.0'
	),
	(0, _preact.h)(
		'ul',
		null,
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'a',
				{
					href: 'https://medium.com/web-maker/v2-9-lots-of-goodies-bd1e939571f6',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				'Read blog post about this release.'
			)
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Detached Preview'
			),
			' - Yes, you read that correct! You can now detach your preview and send it to your secondary monitor.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Find & Replace'
			),
			' - Long awaited, now its there. Ctrl/Cmd+f to find and add Alt to replace.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Atomic CSS (Atomizer) configurations'
			),
			' - Add custom config for Atomic CSS.',
			(0, _preact.h)(
				'a',
				{
					href: 'https://github.com/acss-io/atomizer#api',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				'Read more'
			),
			'.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Light mode'
			),
			' - This new setting makes Web Maker drop some heavy effects like blur etc to gain more performance. Thanks',
			(0, _preact.h)(
				'a',
				{
					href: 'https://github.com/iamandrewluca',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				'Andrew'
			),
			'.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Preserve logs setting'
			),
			' - Choose whether or not to preserve logs across preview refreshes. Thanks',
			(0, _preact.h)(
				'a',
				{
					href: 'https://github.com/BasitAli',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				'Basit'
			),
			'.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Line wrap setting'
			),
			' - As the name says.'
		),
		(0, _preact.h)(
			'li',
			null,
			'Semantic UI added to popular libraries.'
		),
		(0, _preact.h)(
			'li',
			null,
			'Bootstrap, Vue, UI-Kit and more updated to latest versions in popular libraries.'
		),
		(0, _preact.h)(
			'li',
			null,
			'UX improvements in settings UI'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Bugfix'
			),
			' - Trigger preview refresh anytime with Ctrl/\u2318 + Shift + 5. Even with auto-preview on.'
		)
	)
);

var _ref36 = (0, _preact.h)(
	'div',
	{ 'class': 'notification' },
	(0, _preact.h)(
		'span',
		{ 'class': 'notification__version' },
		'2.8.1'
	),
	(0, _preact.h)(
		'ul',
		null,
		(0, _preact.h)(
			'li',
			null,
			'Vue.js & UIKit version updated to latest version in \'Add Library\' list.'
		),
		(0, _preact.h)(
			'li',
			null,
			'UTF-8 charset added to preview HTML to support universal characters.'
		)
	)
);

var _ref37 = (0, _preact.h)(
	'div',
	{ 'class': 'notification' },
	(0, _preact.h)(
		'span',
		{ 'class': 'notification__version' },
		'2.8.0'
	),
	(0, _preact.h)(
		'ul',
		null,
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'a',
				{
					href: 'https://medium.com/web-maker/release-v2-8-is-out-f44e6ea5d9c4',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				'Read blog post about this release.'
			)
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Auto Save'
			),
			' - Your creations now auto-save after your first manual save. This is configurable from settings.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Base2Tone-Meadow Editor Theme'
			),
			' - First user contributed theme. Thanks to Diomed.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Use System Fonts'
			),
			' - You can now use any of your existing system fonts in the editor!'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Matching Tag Highlight'
			),
			' - Cursor over any HTML tag would highlight the matching pair tag.'
		),
		(0, _preact.h)(
			'li',
			null,
			'Auto-completion suggestion can now be switched off from settings.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Improvement'
			),
			' - Stop white flicker in editor when the app opens.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Bugfix'
			),
			' - Add Babel Polyfill to enable use of next-gen built-ins like Promise or WeakMap.'
		),
		(0, _preact.h)(
			'li',
			null,
			'Vue.js version updated to 2.4.0 in popular library list.'
		),
		(0, _preact.h)(
			'li',
			null,
			'Downloads permission is optional. Asked only when you take screenshot.'
		)
	)
);

var _ref38 = (0, _preact.h)(
	'div',
	{ 'class': 'notification' },
	(0, _preact.h)(
		'span',
		{ 'class': 'notification__version' },
		'2.7.2'
	),
	(0, _preact.h)(
		'ul',
		null,
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'External Libraries'
			),
			' - Add Foundation.js and update UIKit 3 to latest beta.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'rawgit.com'
			),
			' &',
			(0, _preact.h)(
				'strong',
				null,
				'wzrd.in'
			),
			' domains are now allowed for loading external libraries from.'
		),
		(0, _preact.h)(
			'li',
			null,
			'Minor booting speed improvements'
		)
	)
);

var _ref39 = (0, _preact.h)(
	'div',
	{ 'class': 'notification' },
	(0, _preact.h)(
		'span',
		{ 'class': 'notification__version' },
		'2.7.1'
	),
	(0, _preact.h)(
		'ul',
		null,
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Framer.js support'
			),
			' - You can now load the latest framer.js library from',
			(0, _preact.h)(
				'a',
				{
					href: 'https://builds.framerjs.com/',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				'framer builds page'
			),
			' ',
			'and start coding framer prototypes.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Bugfix'
			),
			': Edit on CodePen is back in action.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Bugfix'
			),
			': Autocompletion menu doesn\'t show on cut and paste now.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Bugfix'
			),
			': Updated & fixed urls of some common external libraries to latest versions. UIKit3 & Bootstrap 4\u03B1 are now in the list.'
		),
		(0, _preact.h)(
			'li',
			null,
			'Preprocessor selector are now more accessible.'
		)
	)
);

var _ref40 = (0, _preact.h)(
	'div',
	{ 'class': 'notification' },
	(0, _preact.h)(
		'span',
		{ 'class': 'notification__version' },
		'2.7.0'
	),
	(0, _preact.h)(
		'ul',
		null,
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Fork any creation!'
			),
			': Now you can fork any existing creation of yours to start a new work based on it. One big use case of this feature is "Templates"!',
			(0, _preact.h)(
				'a',
				{
					target: '_blank',
					rel: 'noopener noreferrer',
					href: 'https://kushagragour.in/blog/2017/05/web-maker-fork-templates/?utm_source=webmakerapp&utm_medium=referral'
				},
				'Read more about it'
			),
			'.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Fonts \uD83D\uDE0D '
			),
			': Super-awesome 4 fonts (mostly with ligature support) now available to choose from. Fira Code is the default font now.'
		),
		(0, _preact.h)(
			'li',
			null,
			'Updated most used external libraries to latest versions.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Bugfix'
			),
			': Add missing Bootstrap JS file to most used external libraries list.'
		),
		(0, _preact.h)(
			'li',
			null,
			'Several other minor bugfixes and improvements to make Web Maker awesome!'
		),
		(0, _preact.h)(
			'li',
			null,
			'Great news to share with you - Web Maker has been featured on the Chrome Webstore homepage! Thanks for all the love :)'
		)
	)
);

var _ref41 = (0, _preact.h)(
	'div',
	{ 'class': 'notification' },
	(0, _preact.h)(
		'span',
		{ 'class': 'notification__version' },
		'2.6.1'
	),
	(0, _preact.h)(
		'ul',
		null,
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Bugfix'
			),
			': Emojis vanishing while exporting to Codepen has been fixed.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Bugfix'
			),
			':',
			(0, _preact.h)(
				'code',
				null,
				'console.clear()'
			),
			' now doesn\'t error and clears the inbuilt console.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Bugfix'
			),
			': External libraries added to the creation are exported as well to Codepen.'
		)
	)
);

var _ref42 = (0, _preact.h)(
	'div',
	{ 'class': 'notification' },
	(0, _preact.h)(
		'span',
		{ 'class': 'notification__version' },
		'2.6.0'
	),
	(0, _preact.h)(
		'ul',
		null,
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'The "Console"'
			),
			': The most awaited feature is here! There is now an inbuilt console to see your logs, errors and for quickly evaluating JavaScript code inside your preview. Enjoy! I also a',
			(0, _preact.h)(
				'a',
				{
					href: 'https://kushagragour.in/blog/2017/05/web-maker-console-is-here/?utm_source=webmakerapp&utm_medium=referral',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				'blog post about it'
			),
			'.'
		),
		(0, _preact.h)(
			'li',
			null,
			'Number slider which popped on clicking any number in the code has been removed due to poor user experience.'
		),
		(0, _preact.h)(
			'li',
			null,
			'Minor usability improvements.'
		)
	)
);

var _ref43 = (0, _preact.h)(
	'div',
	{ 'class': 'notification' },
	(0, _preact.h)(
		'span',
		{ 'class': 'notification__version' },
		'2.5.0'
	),
	(0, _preact.h)(
		'ul',
		null,
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Atomic CSS'
			),
			': Use can now use Atomic CSS(ACSS) in your work!',
			(0, _preact.h)(
				'a',
				{
					href: 'https://acss.io/',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				'Read more about it here'
			),
			'.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Search your saved creations'
			),
			': Easily search through all your saved creations by title.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Configurable Auto-preview'
			),
			' - You can turn off the auto preview in settings if you don\'t want the preview to update as you type.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Configurable refresh on resize'
			),
			' - You can configure whether you want the preview to refresh when you resize the preview panel.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Bugfix'
			),
			' - Fix indentation',
			(0, _preact.h)(
				'a',
				{
					href: 'https://github.com/chinchang/web-maker/issues/104',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				'issue'
			),
			' ',
			'with custom indentation size.'
		)
	)
);

var _ref44 = (0, _preact.h)(
	'div',
	{ 'class': 'notification' },
	(0, _preact.h)(
		'span',
		{ 'class': 'notification__version' },
		'2.4.2'
	),
	(0, _preact.h)(
		'ul',
		null,
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Improved infinite loop protection'
			),
			': Infinite loop protection is now faster and more reliable. And works without the need of Escodegen. Thanks to Ariya Hidayat!'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Bugfix'
			),
			' - Default parameters not working in JavaScript is fixed.'
		)
	)
);

var _ref45 = (0, _preact.h)(
	'div',
	{ 'class': 'notification' },
	(0, _preact.h)(
		'span',
		{ 'class': 'notification__version' },
		'2.4.0'
	),
	(0, _preact.h)(
		'ul',
		null,
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Import/Export'
			),
			': Your creations are most important. Now export all your creations into a single file as a backup that can be imported anytime & anywhere.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Editor themes'
			),
			': You have been heard. Now you can choose from a huge list of wonderful editor themes!'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Identation settings'
			),
			': Not a spaces fan? Switch to tabs and set your indentation size.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Vim key bindings'
			),
			': Rejoice Vim lovers!'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Code blast'
			),
			': Why don\'t you try coding with this switched on from the settings? Go on...'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Important'
			),
			': Due to security policy changes from Chrome 57 onwards, Web Maker now allows loading external JavaScript libraries only from certain whitelisted domains (localhost, https://ajax.googleapis.com, https://code.jquery.com, https://cdnjs.cloudflare.com, https://unpkg.com, https://maxcdn.com, https://cdn77.com, https://maxcdn.bootstrapcdn.com, https://cdn.jsdelivr.net/)'
		),
		(0, _preact.h)(
			'li',
			null,
			'Save button now highlights when you have unsaved changes.'
		),
		(0, _preact.h)(
			'li',
			null,
			'Jade is now called Pug. Just a name change.'
		)
	)
);

var _ref46 = (0, _preact.h)(
	'div',
	{ 'class': 'notification' },
	(0, _preact.h)(
		'span',
		{ 'class': 'notification__version' },
		'2.3.2'
	),
	(0, _preact.h)(
		'ul',
		null,
		(0, _preact.h)(
			'li',
			null,
			'Update Babel to support latest and coolest ES6 features.'
		),
		(0, _preact.h)(
			'li',
			null,
			'Improve onboarding experience at first install.'
		)
	)
);

var _ref47 = (0, _preact.h)(
	'div',
	{ 'class': 'notification' },
	(0, _preact.h)(
		'span',
		{ 'class': 'notification__version' },
		'2.3.1'
	),
	(0, _preact.h)(
		'ul',
		null,
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Bugfix'
			),
			' - Splitting of code and preview panes is remembered by the editor.'
		),
		(0, _preact.h)(
			'li',
			null,
			'Title of the creation is used for the file name when saving as HTML.'
		)
	)
);

var _ref48 = (0, _preact.h)(
	'div',
	{ 'class': 'notification' },
	(0, _preact.h)(
		'span',
		{ 'class': 'notification__version' },
		'2.3.0'
	),
	(0, _preact.h)(
		'ul',
		null,
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Add Library Autocompletion'
			),
			' - Just start typing the name of library and you\'ll be shown matching libraries from cdnjs.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Preview Screenshot Capture'
			),
			' - Want to grab a nice screenshot of your creation. You have it! Click and capture.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Auto Indent Code'
			),
			' - Select your code and hit Shift-Tab to auto-indent it!'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Keyboard Navigation in Saved List'
			),
			' - Now select your creation using arrow keys and hit ENTER to open it.'
		),
		(0, _preact.h)(
			'li',
			null,
			'Highlight active line in code panes.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Bugfix'
			),
			' - Fix in generated title of new creation.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Bugfix'
			),
			' - HTML autocompletion is manual triggered now with Ctrl+Space.'
		)
	)
);

var _ref49 = (0, _preact.h)(
	'div',
	{ 'class': 'notification' },
	(0, _preact.h)(
		'span',
		{ 'class': 'notification__version' },
		'2.2.0'
	),
	(0, _preact.h)(
		'ul',
		null,
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Code Autocompletion'
			),
			' - See code suggestions while you type!'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Full Screen Preview'
			),
			' - Checkout your creation in a full-screen layout.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'SASS'
			),
			' - SASS support added for CSS.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Faster CSS update'
			),
			' - Preview updates instantly without refresh when just CSS is changed.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Bugfix'
			),
			' - Indentation fixed while going on new line.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Bugfix'
			),
			' - Works even in Chrome Canary now. Though libraries can be added only through CDNs.'
		)
	)
);

var _ref50 = (0, _preact.h)(
	'div',
	{ 'class': 'notification' },
	(0, _preact.h)(
		'span',
		{ 'class': 'notification__version' },
		'2.1.0'
	),
	(0, _preact.h)(
		'ul',
		null,
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'TypeScript'
			),
			' - Now you can code in TypeScript too!'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Stylus Preprocessor'
			),
			' - Stylus supported adding for CSS.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Code Folding'
			),
			' - Collapse large code blocks for easy editing.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Bugfix'
			),
			' - Support JSX in JavaScript.'
		),
		(0, _preact.h)(
			'li',
			null,
			'Better onboarding for first time users.'
		)
	)
);

var _ref51 = (0, _preact.h)(
	'div',
	{ 'class': 'notification' },
	(0, _preact.h)(
		'span',
		{ 'class': 'notification__version' },
		'2.0.0'
	),
	(0, _preact.h)(
		'ul',
		null,
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Save and Load'
			),
			' - Long pending and super-useful, now you can save your creations and resume them anytime later.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Insert JS & CSS'
			),
			' - Load popular JavaScript & CSS libraries in your work without writing any code.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Collapsed Panes'
			),
			' - Collapse/uncollapse code panes with a single click. Your pane configuration is even saved with every creation!'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Quick color & number change'
			),
			' - Click on any color or number and experiment with quick values using a slider.'
		),
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Linting'
			),
			' - See your code errors right where you are coding.'
		),
		(0, _preact.h)(
			'li',
			null,
			'No more browser hang due to infinite loops!'
		)
	)
);

var _ref52 = (0, _preact.h)(
	'div',
	{ 'class': 'notification' },
	(0, _preact.h)(
		'span',
		{ 'class': 'notification__version' },
		'1.7.0'
	),
	(0, _preact.h)(
		'ul',
		null,
		(0, _preact.h)(
			'li',
			null,
			(0, _preact.h)(
				'strong',
				null,
				'Preprocessors!'
			),
			' - Enjoy a whole list of preprocessors for HTML(Jade & markdown), CSS(SCSS & LESS) and JavaScript(CoffeeScript & Babel).'
		),
		(0, _preact.h)(
			'li',
			null,
			'More awesome font for code.'
		)
	)
);

var _ref53 = (0, _preact.h)(
	'div',
	{ 'class': 'notification' },
	(0, _preact.h)(
		'span',
		{ 'class': 'notification__version' },
		'1.6.0'
	),
	(0, _preact.h)(
		'ul',
		null,
		(0, _preact.h)(
			'li',
			null,
			'You can now configure Web-Maker to not replace new tab page from the settings. It is always accessible from the icon in the top-right.'
		),
		(0, _preact.h)(
			'li',
			null,
			'Download current code as HTML file with Ctrl/\u2318 + S keyboard shortcut.'
		),
		(0, _preact.h)(
			'li',
			null,
			'New notifications panel added so you are always aware of the new changes in Web-Maker.'
		)
	)
);

function Notifications(props) {
	return (0, _preact.h)(
		'div',
		null,
		_ref10,
		(0, _preact.h)(
			Notification,
			_extends({ version: '3.3.2', isLatest: true }, props),
			_ref11,
			_ref12,
			_ref13,
			_ref14
		),
		(0, _preact.h)(
			Notification,
			_extends({ version: '3.3.0' }, props),
			_ref15,
			_ref16
		),
		(0, _preact.h)(
			Notification,
			_extends({ version: '3.2.0' }, props),
			_ref17,
			_ref18,
			_ref19,
			_ref20,
			_ref21
		),
		(0, _preact.h)(
			Notification,
			_extends({ version: '3.1.1' }, props),
			_ref22
		),
		(0, _preact.h)(
			Notification,
			_extends({ version: '3.1.0' }, props),
			_ref23
		),
		(0, _preact.h)(
			Notification,
			_extends({ version: '3.0.4' }, props),
			_ref24,
			_ref25
		),
		(0, _preact.h)(
			Notification,
			_extends({ version: '3.0.3' }, props),
			_ref26
		),
		_ref27,
		_ref28,
		_ref29,
		_ref30,
		_ref31,
		_ref32,
		_ref33,
		_ref34,
		_ref35,
		_ref36,
		_ref37,
		_ref38,
		_ref39,
		_ref40,
		_ref41,
		_ref42,
		_ref43,
		_ref44,
		_ref45,
		_ref46,
		_ref47,
		_ref48,
		_ref49,
		_ref50,
		_ref51,
		_ref52,
		_ref53
	);
}

/***/ }),

/***/ "18yn":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.Profile = Profile;

var _preact = __webpack_require__("KM04");

var DEFAULT_PROFILE_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='#ccc' d='M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z' /%3E%3C/svg%3E";

function Profile(_ref) {
	var user = _ref.user,
	    logoutBtnHandler = _ref.logoutBtnHandler;

	return (0, _preact.h)(
		"div",
		{ "class": "tac" },
		(0, _preact.h)("img", {
			height: "80",
			"class": "profile-modal__avatar-img",
			src: user ? user.photoURL || DEFAULT_PROFILE_IMG : '',
			id: "profileAvatarImg",
			alt: "Profile image"
		}),
		(0, _preact.h)(
			"h3",
			{ id: "profileUserName", "class": "mb-2" },
			user && user.displayName ? user.displayName : 'Anonymous Creator'
		),
		(0, _preact.h)(
			"p",
			null,
			(0, _preact.h)(
				"button",
				{
					"class": "btn",
					"aria-label": "Logout from your account",
					onClick: logoutBtnHandler
				},
				"Logout"
			)
		)
	);
}

/***/ }),

/***/ "1IZv":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.KeyboardShortcutsModal = KeyboardShortcutsModal;

var _preact = __webpack_require__("KM04");

var _Modal = __webpack_require__("inAt");

var _Modal2 = _interopRequireDefault(_Modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref2 = (0, _preact.h)(
	'h1',
	null,
	'Keyboard Shortcuts'
);

var _ref3 = (0, _preact.h)(
	'div',
	{ 'class': 'flex' },
	(0, _preact.h)(
		'div',
		null,
		(0, _preact.h)(
			'h2',
			null,
			'Global'
		),
		(0, _preact.h)(
			'p',
			null,
			(0, _preact.h)(
				'span',
				{ 'class': 'kbd-shortcut__keys' },
				'Ctrl/\u2318 + Shift + ?'
			),
			(0, _preact.h)(
				'span',
				{ 'class': 'kbd-shortcut__details' },
				'See keyboard shortcuts'
			)
		),
		(0, _preact.h)(
			'p',
			null,
			(0, _preact.h)(
				'span',
				{ 'class': 'kbd-shortcut__keys' },
				'Ctrl/\u2318 + Shift + 5'
			),
			(0, _preact.h)(
				'span',
				{ 'class': 'kbd-shortcut__details' },
				'Refresh preview'
			)
		),
		(0, _preact.h)(
			'p',
			null,
			(0, _preact.h)(
				'span',
				{ 'class': 'kbd-shortcut__keys' },
				'Ctrl/\u2318 + S'
			),
			(0, _preact.h)(
				'span',
				{ 'class': 'kbd-shortcut__details' },
				'Save current creations'
			)
		),
		(0, _preact.h)(
			'p',
			null,
			(0, _preact.h)(
				'span',
				{ 'class': 'kbd-shortcut__keys' },
				'Ctrl/\u2318 + O'
			),
			(0, _preact.h)(
				'span',
				{ 'class': 'kbd-shortcut__details' },
				'Open list of saved creations'
			)
		),
		(0, _preact.h)(
			'p',
			null,
			(0, _preact.h)(
				'span',
				{ 'class': 'kbd-shortcut__keys' },
				'Ctrl + L'
			),
			(0, _preact.h)(
				'span',
				{ 'class': 'kbd-shortcut__details' },
				'Clear console (works when console input is focused)'
			)
		),
		(0, _preact.h)(
			'p',
			null,
			(0, _preact.h)(
				'span',
				{ 'class': 'kbd-shortcut__keys' },
				'Esc'
			),
			(0, _preact.h)(
				'span',
				{ 'class': 'kbd-shortcut__details' },
				'Close saved creations panel & modals'
			)
		)
	),
	(0, _preact.h)(
		'div',
		{ 'class': 'ml-2' },
		(0, _preact.h)(
			'h2',
			null,
			'Editor'
		),
		(0, _preact.h)(
			'p',
			null,
			(0, _preact.h)(
				'span',
				{ 'class': 'kbd-shortcut__keys' },
				'Ctrl/\u2318 + F'
			),
			(0, _preact.h)(
				'span',
				{ 'class': 'kbd-shortcut__details' },
				'Find'
			)
		),
		(0, _preact.h)(
			'p',
			null,
			(0, _preact.h)(
				'span',
				{ 'class': 'kbd-shortcut__keys' },
				'Ctrl/\u2318 + G'
			),
			(0, _preact.h)(
				'span',
				{ 'class': 'kbd-shortcut__details' },
				'Select next match'
			)
		),
		(0, _preact.h)(
			'p',
			null,
			(0, _preact.h)(
				'span',
				{ 'class': 'kbd-shortcut__keys' },
				'Ctrl/\u2318 + Shift + G'
			),
			(0, _preact.h)(
				'span',
				{ 'class': 'kbd-shortcut__details' },
				'Select previous match'
			)
		),
		(0, _preact.h)(
			'p',
			null,
			(0, _preact.h)(
				'span',
				{ 'class': 'kbd-shortcut__keys' },
				'Ctrl/\u2318 + Opt/Alt + F'
			),
			(0, _preact.h)(
				'span',
				{ 'class': 'kbd-shortcut__details' },
				'Find & replace'
			)
		),
		(0, _preact.h)(
			'p',
			null,
			(0, _preact.h)(
				'span',
				{ 'class': 'kbd-shortcut__keys' },
				'Shift + Tab'
			),
			(0, _preact.h)(
				'span',
				{ 'class': 'kbd-shortcut__details' },
				'Realign code'
			)
		),
		(0, _preact.h)(
			'p',
			null,
			(0, _preact.h)(
				'span',
				{ 'class': 'kbd-shortcut__keys' },
				'Ctrl/\u2318 + ]'
			),
			(0, _preact.h)(
				'span',
				{ 'class': 'kbd-shortcut__details' },
				'Indent code right'
			)
		),
		(0, _preact.h)(
			'p',
			null,
			(0, _preact.h)(
				'span',
				{ 'class': 'kbd-shortcut__keys' },
				'Ctrl/\u2318 + ['
			),
			(0, _preact.h)(
				'span',
				{ 'class': 'kbd-shortcut__details' },
				'Indent code left'
			)
		),
		(0, _preact.h)(
			'p',
			null,
			(0, _preact.h)(
				'span',
				{ 'class': 'kbd-shortcut__keys' },
				'Tab'
			),
			(0, _preact.h)(
				'span',
				{ 'class': 'kbd-shortcut__details' },
				'Emmet code completion',
				' ',
				(0, _preact.h)(
					'a',
					{
						href: 'https://emmet.io/',
						target: '_blank',
						rel: 'noopener noreferrer'
					},
					'Read more'
				)
			)
		),
		(0, _preact.h)(
			'p',
			null,
			(0, _preact.h)(
				'span',
				{ 'class': 'kbd-shortcut__keys' },
				'Ctrl/\u2318 + /'
			),
			(0, _preact.h)(
				'span',
				{ 'class': 'kbd-shortcut__details' },
				'Single line comment'
			)
		)
	)
);

function KeyboardShortcutsModal(_ref) {
	var show = _ref.show,
	    closeHandler = _ref.closeHandler;

	return (0, _preact.h)(
		_Modal2.default,
		{ show: show, closeHandler: closeHandler },
		_ref2,
		_ref3
	);
}

/***/ }),

/***/ "3Z4F":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.deferred = deferred;
function deferred() {
	var d = {};
	var promise = new Promise(function (resolve, reject) {
		d.resolve = resolve;
		d.reject = reject;
	});

	// Add the native promise as a key on deferred object.
	d.promise = promise;
	// Also move all props/methods of native promise on the deferred obj.
	return _extends(d, promise);
}

/***/ }),

/***/ "6Ptt":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.BASE_PATH = undefined;
exports.semverCompare = semverCompare;
exports.generateRandomId = generateRandomId;
exports.onButtonClick = onButtonClick;
exports.log = log;
exports.addInfiniteLoopProtection = addInfiniteLoopProtection;
exports.getHumanDate = getHumanDate;
exports.once = once;
exports.downloadFile = downloadFile;
exports.writeFile = writeFile;
exports.loadJS = loadJS;
exports.getCompleteHtml = getCompleteHtml;
exports.saveAsHtml = saveAsHtml;
exports.handleDownloadsPermission = handleDownloadsPermission;

var _analytics = __webpack_require__("qV3Q");

var _computes = __webpack_require__("E5zE");

var _codeModes = __webpack_require__("y5h4");

var _deferred = __webpack_require__("3Z4F");

var esprima = __webpack_require__("4E2n");

window.DEBUG = document.cookie.indexOf('wmdebug') > -1;
window.$ = document.querySelector.bind(document);

window.chrome = window.chrome || {};
window.chrome.i18n = {
	getMessage: function getMessage() {}
};

window.$all = function (selector) {
	return [].concat(document.querySelectorAll(selector));
};
window.IS_EXTENSION = !!window.chrome.extension;
var BASE_PATH = exports.BASE_PATH = '';

var alphaNum = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

/**
 * The following 2 functions are supposed to find the next/previous sibling until the
 * passed `selector` is matched. But for now it actually finds the next/previous
 * element of `this` element in the list of `selector` matched element inside `this`'s
 * parent.
 * @param  Selector that should match for next siblings
 * @return element Next element that mathes `selector`
 */
Node.prototype.nextUntil = function (selector) {
	var siblings = Array.from(this.parentNode.querySelectorAll(selector));
	var index = siblings.indexOf(this);
	return siblings[index + 1];
};

/*
 * @param  Selector that should match for next siblings
 * @return element Next element that mathes `selector`
 */
Node.prototype.previousUntil = function (selector) {
	var siblings = Array.from(this.parentNode.querySelectorAll(selector));
	var index = siblings.indexOf(this);
	return siblings[index - 1];
};

// Safari doesn't have this!
window.requestIdleCallback = window.requestIdleCallback || function (fn) {
	setTimeout(fn, 10);
};

// https://github.com/substack/semver-compare/blob/master/index.js
function semverCompare(a, b) {
	var pa = a.split('.');
	var pb = b.split('.');
	for (var i = 0; i < 3; i++) {
		var na = Number(pa[i]);
		var nb = Number(pb[i]);
		if (na > nb) {
			return 1;
		}
		if (nb > na) {
			return -1;
		}
		if (!isNaN(na) && isNaN(nb)) {
			return 1;
		}
		if (isNaN(na) && !isNaN(nb)) {
			return -1;
		}
	}
	return 0;
}

function generateRandomId(len) {
	var length = len || 10;
	var id = '';
	for (var i = length; i--;) {
		id += alphaNum[~~(Math.random() * alphaNum.length)];
	}
	return id;
}

function onButtonClick(btn, listener) {
	btn.addEventListener('click', function buttonClickListener(e) {
		listener(e);
		return false;
	});
}

function log() {
	if (window.DEBUG) {
		var _console;

		(_console = console).log.apply(_console, [Date.now()].concat(Array.prototype.slice.call(arguments)));
	}
}

/**
 * Adds timed limit on the loops found in the passed code.
 * Contributed by Ariya Hidayat!
 * @param code {string}	Code to be protected from infinite loops.
 */
function addInfiniteLoopProtection(code, _ref) {
	var timeout = _ref.timeout;

	var loopId = 1;
	var patches = [];
	var varPrefix = '_wmloopvar';
	var varStr = 'var %d = Date.now();\n';
	var checkStr = '\nif (Date.now() - %d > ' + timeout + ') { window.top.previewException(new Error("Infinite loop")); break;}\n';

	esprima.parse(code, {
		tolerant: true,
		range: true,
		jsx: true
	}, function (node) {
		switch (node.type) {
			case 'DoWhileStatement':
			case 'ForStatement':
			case 'ForInStatement':
			case 'ForOfStatement':
			case 'WhileStatement':
				var start = 1 + node.body.range[0];
				var end = node.body.range[1];
				var prolog = checkStr.replace('%d', varPrefix + loopId);
				var epilog = '';

				if (node.body.type !== 'BlockStatement') {
					// `while(1) doThat()` becomes `while(1) {doThat()}`
					prolog = '{' + prolog;
					epilog = '}';
					--start;
				}

				patches.push({
					pos: start,
					str: prolog
				});
				patches.push({
					pos: end,
					str: epilog
				});
				patches.push({
					pos: node.range[0],
					str: varStr.replace('%d', varPrefix + loopId)
				});
				++loopId;
				break;

			default:
				break;
		}
	});

	/* eslint-disable no-param-reassign */
	patches.sort(function (a, b) {
		return b.pos - a.pos;
	}).forEach(function (patch) {
		code = code.slice(0, patch.pos) + patch.str + code.slice(patch.pos);
	});

	/* eslint-disable no-param-reassign */
	return code;
}

function getHumanDate(timestamp) {
	var d = new Date(timestamp);
	var retVal = d.getDate() + ' ' + ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][d.getMonth()] + ' ' + d.getFullYear();
	return retVal;
}

// create a one-time event
function once(node, type, callback) {
	// create event
	node.addEventListener(type, function (e) {
		// remove event
		e.target.removeEventListener(type, arguments.callee);
		// call handler
		return callback(e);
	});
}

function downloadFile(fileName, blob) {
	function downloadWithAnchor() {
		var a = document.createElement('a');
		a.href = window.URL.createObjectURL(blob);
		a.download = fileName;
		a.style.display = 'none';
		document.body.appendChild(a);
		a.click();
		a.remove();
	}
	if (window.IS_EXTENSION) {
		chrome.downloads.download({
			url: window.URL.createObjectURL(blob),
			filename: fileName,
			saveAs: true
		}, function () {
			// If there was an error, just download the file using ANCHOR method.
			if (chrome.runtime.lastError) {
				downloadWithAnchor();
			}
		});
	} else {
		downloadWithAnchor();
	}
}

function writeFile(name, blob, cb) {
	var fileWritten = false;

	function getErrorHandler(type) {
		return function () {
			log(arguments);
			(0, _analytics.trackEvent)('fn', 'error', type);
			// When there are too many write errors, show a message.
			writeFile.errorCount = (writeFile.errorCount || 0) + 1;
			if (writeFile.errorCount === 4) {
				setTimeout(function () {
					alert("Oops! Seems like your preview isn't updating. It's recommended to switch to the web app: https://webmakerapp.com/app/.\n\n If you still want to get the extension working, please try the following steps until it fixes:\n - Refresh Web Maker\n - Restart browser\n - Update browser\n - Reinstall Web Maker (don't forget to export all your creations from saved items pane (click the OPEN button) before reinstalling)\n\nIf nothing works, please tweet out to @webmakerApp.");
					(0, _analytics.trackEvent)('ui', 'writeFileMessageSeen');
				}, 1000);
			}
		};
	}

	// utils.log('writing file ', name);
	window.webkitRequestFileSystem(window.TEMPORARY, 1024 * 1024 * 5, function (fs) {
		fs.root.getFile(name, {
			create: true
		}, function (fileEntry) {
			fileEntry.createWriter(function (fileWriter) {
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
		}, getErrorHandler('getFileFail'));
	}, getErrorHandler('webkitRequestFileSystemFail'));
}

function loadJS(src) {
	var d = (0, _deferred.deferred)();
	var ref = window.document.getElementsByTagName('script')[0];
	var script = window.document.createElement('script');
	script.src = src;
	script.async = true;
	ref.parentNode.insertBefore(script, ref);
	script.onload = function () {
		d.resolve();
	};
	return d.promise;
}

/* eslint-disable max-params */
function getCompleteHtml(html, css, js, item, isForExport) {
	/* eslint-enable max-params */

	if (!item) {
		return '';
	}
	var externalJs = '',
	    externalCss = '';
	if (item.externalLibs) {
		externalJs = item.externalLibs.js.split('\n').reduce(function (scripts, url) {
			return scripts + (url ? '\n<script src="' + url + '"></script>' : '');
		}, '');
		externalCss = item.externalLibs.css.split('\n').reduce(function (links, url) {
			return links + (url ? '\n<link rel="stylesheet" href="' + url + '"></link>' : '');
		}, '');
	}
	var contents = '<!DOCTYPE html>\n' + '<html>\n<head>\n' + '<meta charset="UTF-8" />\n' + externalCss + '\n' + '<style id="webmakerstyle">\n' + css + '\n</style>\n' + '</head>\n' + '<body>\n' + html + '\n' + externalJs + '\n';

	if (!isForExport) {
		contents += '<script src="' + (chrome.extension ? chrome.extension.getURL('lib/screenlog.js') : '' + location.origin + BASE_PATH + '/lib/screenlog.js') + '"></script>';
	}
	contents += '<script src="' + (chrome.extension ? chrome.extension.getURL('lib/bundle.js') : '' + location.origin + BASE_PATH + '/lib/bundle.js') + '"></script>';

	if (item.jsMode === _codeModes.JsModes.ES6) {
		contents += '<script src="' + (chrome.extension ? chrome.extension.getURL('lib/transpilers/babel-polyfill.min.js') : '' + location.origin + BASE_PATH + '/lib/transpilers/babel-polyfill.min.js') + '"></script>';
	}

	if (typeof js === 'string') {
		contents += '<script>\n' + js + '\n//# sourceURL=userscript.js';
	} else {
		var origin = chrome.i18n.getMessage() ? 'chrome-extension://' + chrome.i18n.getMessage('@@extension_id') : '' + location.origin;
		contents += '<script src="' + ('filesystem:' + origin + '/temporary/script.js') + '">';
	}
	contents += '\n</script>\n</body>\n</html>';

	return contents;
}

function saveAsHtml(item) {
	var htmlPromise = (0, _computes.computeHtml)(item.html, item.htmlMode);
	var cssPromise = (0, _computes.computeCss)(item.css, item.cssMode);
	var jsPromise = (0, _computes.computeJs)(item.js, item.jsMode, false);
	Promise.all([htmlPromise, cssPromise, jsPromise]).then(function (result) {
		var html = result[0].code,
		    css = result[1].code,
		    js = result[2].code;

		var fileContent = getCompleteHtml(html, css, js, item, true);

		var d = new Date();
		var fileName = ['web-maker', d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()].join('-');

		if (item.title) {
			fileName = item.title;
		}
		fileName += '.html';

		var blob = new Blob([fileContent], {
			type: 'text/html;charset=UTF-8'
		});
		downloadFile(fileName, blob);

		(0, _analytics.trackEvent)('fn', 'saveFileComplete');
	});
}

function handleDownloadsPermission() {
	var d = (0, _deferred.deferred)();
	if (!window.IS_EXTENSION) {
		d.resolve();
		return d.promise;
	}
	chrome.permissions.contains({
		permissions: ['downloads']
	}, function (result) {
		if (result) {
			d.resolve();
		} else {
			chrome.permissions.request({
				permissions: ['downloads']
			}, function (granted) {
				if (granted) {
					(0, _analytics.trackEvent)('fn', 'downloadsPermGiven');
					d.resolve();
				} else {
					d.reject();
				}
			});
		}
	});
	return d.promise;
}

if (window.IS_EXTENSION) {
	document.body.classList.add('is-extension');
} else {
	document.body.classList.add('is-app');
}

/***/ }),

/***/ "6Vka":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = undefined;

var _preact = __webpack_require__("KM04");

var _libraryList = __webpack_require__("eNb1");

var _analytics = __webpack_require__("qV3Q");

var _LibraryAutoSuggest = __webpack_require__("9VU0");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ref = (0, _preact.h)(
	'h1',
	null,
	'Add Library'
);

var _ref2 = (0, _preact.h)(
	'svg',
	{ style: 'width: 30px; height: 30px;fill:#999' },
	(0, _preact.h)('use', { xlinkHref: '#search' })
);

var _ref3 = (0, _preact.h)('input', {
	type: 'text',
	id: 'externalLibrarySearchInput',
	'class': 'full-width',
	placeholder: 'Type here to search libraries'
});

var _ref4 = (0, _preact.h)(
	'div',
	{ 'class': 'tar opacity--70' },
	(0, _preact.h)(
		'small',
		null,
		'Powered by cdnjs'
	)
);

var _ref5 = (0, _preact.h)(
	'option',
	{ value: '' },
	'-------'
);

var _ref6 = (0, _preact.h)(
	'h3',
	{ 'class': 'mb-0' },
	'JS'
);

var _ref7 = (0, _preact.h)(
	'p',
	{ 'class': 'mt-0 help-text' },
	'Put each library in new line'
);

var _ref8 = (0, _preact.h)(
	'p',
	{ style: 'font-size: 0.8em;', 'class': 'show-when-extension opacity--70' },
	'Note: You can load external scripts from following domains: localhost, https://ajax.googleapis.com, https://code.jquery.com, https://cdnjs.cloudflare.com, https://unpkg.com, https://maxcdn.com, https://cdn77.com, https://maxcdn.bootstrapcdn.com, https://cdn.jsdelivr.net/, https://rawgit.com, https://wzrd.in'
);

var _ref9 = (0, _preact.h)(
	'h3',
	{ 'class': 'mb-0' },
	'CSS'
);

var _ref10 = (0, _preact.h)(
	'p',
	{ 'class': 'mt-0 help-text' },
	'Put each library in new line'
);

var AddLibrary = function (_Component) {
	_inherits(AddLibrary, _Component);

	function AddLibrary(props) {
		_classCallCheck(this, AddLibrary);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.state = {
			css: props.css || '',
			js: props.js || ''
		};
		return _this;
	}

	AddLibrary.prototype.onSelectChange = function onSelectChange(e) {
		var target = e.target;
		if (!target.value) {
			return;
		}
		var type = target.selectedOptions[0].dataset.type;
		if (type === 'js') {
			this.setState({
				js: this.state.js + '\n' + target.value
			});
		} else {
			this.setState({
				css: this.state.css + '\n' + target.value
			});
		}

		(0, _analytics.trackEvent)('ui', 'addLibrarySelect', target.selectedOptions[0].label);
		this.props.onChange({ js: this.state.js, css: this.state.css });
		// Reset the select to the default value
		target.value = '';
	};

	AddLibrary.prototype.textareaBlurHandler = function textareaBlurHandler(e, textarea) {
		var target = e ? e.target : textarea;
		var type = target.dataset.lang;
		if (type === 'js') {
			this.setState({
				js: target.value || ''
			});
		} else {
			this.setState({
				css: target.value || ''
			});
		}

		// trackEvent('ui', 'addLibrarySelect', target.selectedOptions[0].label);
		this.props.onChange({ js: this.state.js, css: this.state.css });
	};

	AddLibrary.prototype.suggestionSelectHandler = function suggestionSelectHandler(value) {
		var textarea = value.match(/\.js$/) ? window.externalJsTextarea : window.externalCssTextarea;
		textarea.value = textarea.value + '\n' + value;
		window.externalLibrarySearchInput.value = '';
		this.textareaBlurHandler(null, textarea);
	};

	AddLibrary.prototype.render = function render() {
		return (0, _preact.h)(
			'div',
			null,
			_ref,
			(0, _preact.h)(
				'div',
				{ 'class': 'flex' },
				_ref2,
				(0, _preact.h)(
					_LibraryAutoSuggest.LibraryAutoSuggest,
					{
						fullWidth: true,
						onSelect: this.suggestionSelectHandler.bind(this)
					},
					_ref3
				)
			),
			_ref4,
			(0, _preact.h)(
				'div',
				{ style: 'margin:20px 0;' },
				'Choose from popular libraries:',
				' ',
				(0, _preact.h)(
					'select',
					{
						name: '',
						id: 'js-add-library-select',
						onChange: this.onSelectChange.bind(this)
					},
					_ref5,
					(0, _preact.h)(
						'optgroup',
						{ label: 'JavaScript Libraries' },
						_libraryList.jsLibs.map(function (lib) {
							return (0, _preact.h)(
								'option',
								{ 'data-type': lib.type, value: lib.url },
								lib.label
							);
						})
					),
					(0, _preact.h)(
						'optgroup',
						{ label: 'CSS Libraries' },
						_libraryList.cssLibs.map(function (lib) {
							return (0, _preact.h)(
								'option',
								{ 'data-type': lib.type, value: lib.url },
								lib.label
							);
						})
					)
				)
			),
			_ref6,
			_ref7,
			_ref8,
			(0, _preact.h)('textarea', {
				onBlur: this.textareaBlurHandler.bind(this),
				'data-lang': 'js',
				'class': 'full-width',
				id: 'externalJsTextarea',
				cols: '30',
				rows: '5',
				placeholder: 'Put each library in new line',
				value: this.state.js
			}),
			_ref9,
			_ref10,
			(0, _preact.h)('textarea', {
				onBlur: this.textareaBlurHandler.bind(this),
				'data-lang': 'css',
				'class': 'full-width',
				id: 'externalCssTextarea',
				cols: '30',
				rows: '5',
				placeholder: 'Put each library in new line',
				value: this.state.css
			})
		);
	};

	return AddLibrary;
}(_preact.Component);

exports.default = AddLibrary;

/***/ }),

/***/ "7vko":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = undefined;

var _preact = __webpack_require__("KM04");

var _UserCodeMirror = __webpack_require__("IaNL");

var _UserCodeMirror2 = _interopRequireDefault(_UserCodeMirror);

var _computes = __webpack_require__("E5zE");

var _codeModes = __webpack_require__("y5h4");

var _utils = __webpack_require__("6Ptt");

var _SplitPane = __webpack_require__("YWKo");

var _analytics = __webpack_require__("qV3Q");

var _CodeMirror = __webpack_require__("c/up");

var _CodeMirror2 = _interopRequireDefault(_CodeMirror);

var _CodeMirrorBox = __webpack_require__("CIHI");

var _CodeMirrorBox2 = _interopRequireDefault(_CodeMirrorBox);

var _deferred = __webpack_require__("3Z4F");

var _CssSettingsModal = __webpack_require__("+ZAi");

var _CssSettingsModal2 = _interopRequireDefault(_CssSettingsModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var minCodeWrapSize = 33;

/* global htmlCodeEl, jsCodeEl, cssCodeEl, logCountEl
*/

var _ref = (0, _preact.h)('span', { 'class': 'caret' });

var _ref2 = (0, _preact.h)(
	'option',
	{ value: 'html' },
	'HTML'
);

var _ref3 = (0, _preact.h)(
	'option',
	{ value: 'markdown' },
	'Markdown'
);

var _ref4 = (0, _preact.h)(
	'option',
	{ value: 'jade' },
	'Pug'
);

var _ref5 = (0, _preact.h)('span', { 'class': 'caret' });

var _ref6 = (0, _preact.h)(
	'option',
	{ value: 'css' },
	'CSS'
);

var _ref7 = (0, _preact.h)(
	'option',
	{ value: 'scss' },
	'SCSS'
);

var _ref8 = (0, _preact.h)(
	'option',
	{ value: 'sass' },
	'SASS'
);

var _ref9 = (0, _preact.h)(
	'option',
	{ value: 'less' },
	'LESS'
);

var _ref10 = (0, _preact.h)(
	'option',
	{ value: 'stylus' },
	'Stylus'
);

var _ref11 = (0, _preact.h)(
	'option',
	{ value: 'acss' },
	'Atomic CSS'
);

var _ref12 = (0, _preact.h)(
	'svg',
	null,
	(0, _preact.h)('use', { xlinkHref: '#settings-icon' })
);

var _ref13 = (0, _preact.h)('span', { 'class': 'caret', style: 'display:none' });

var _ref14 = (0, _preact.h)(
	'option',
	{ value: 'js' },
	'JS'
);

var _ref15 = (0, _preact.h)(
	'option',
	{ value: 'coffee' },
	'CoffeeScript'
);

var _ref16 = (0, _preact.h)(
	'option',
	{ value: 'es6' },
	'ES6 (Babel)'
);

var _ref17 = (0, _preact.h)(
	'option',
	{ value: 'typescript' },
	'TypeScript'
);

var _ref18 = (0, _preact.h)(
	'span',
	{ 'class': 'code-wrap__header-label' },
	'Console (',
	(0, _preact.h)(
		'span',
		{ id: 'logCountEl' },
		'0'
	),
	')'
);

var _ref19 = (0, _preact.h)(
	'svg',
	null,
	(0, _preact.h)('use', { xlinkHref: '#cancel-icon' })
);

var _ref20 = (0, _preact.h)(
	'svg',
	{ width: '18', height: '18', fill: '#346fd2' },
	(0, _preact.h)('use', { xlinkHref: '#chevron-icon' })
);

var ContentWrap = function (_Component) {
	_inherits(ContentWrap, _Component);

	function ContentWrap(props) {
		_classCallCheck(this, ContentWrap);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.state = {
			isConsoleOpen: false,
			isCssSettingsModalOpen: false
		};
		_this.updateTimer = null;
		_this.updateDelay = 500;
		_this.htmlMode = _codeModes.HtmlModes.HTML;
		_this.jsMode = _codeModes.HtmlModes.HTML;
		_this.cssMode = _codeModes.CssModes.CSS;
		_this.jsMode = _codeModes.JsModes.JS;
		_this.prefs = {};
		_this.codeInPreview = { html: null, css: null, js: null };
		_this.cmCodes = { html: props.currentItem.html, css: '', js: '' };
		_this.cm = {};
		_this.logCount = 0;

		window.onMessageFromConsole = _this.onMessageFromConsole.bind(_this);

		window.previewException = _this.previewException.bind(_this);
		// `clearConsole` is on window because it gets called from inside iframe also.
		window.clearConsole = _this.clearConsole.bind(_this);
		return _this;
	}

	ContentWrap.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
		return this.state.isConsoleOpen !== nextState.isConsoleOpen || this.state.isCssSettingsModalOpen !== nextState.isCssSettingsModalOpen || this.state.codeSplitSizes !== nextState.codeSplitSizes || this.state.mainSplitSizes !== nextState.mainSplitSizes || this.props.currentLayoutMode !== nextProps.currentLayoutMode || this.props.currentItem !== nextProps.currentItem || this.props.prefs !== nextProps.prefs;
	};

	ContentWrap.prototype.componentDidUpdate = function componentDidUpdate() {
		// HACK: becuase its a DOM manipulation
		window.logCountEl.textContent = this.logCount;

		// log('🚀', 'didupdate', this.props.currentItem);
		// if (this.isValidItem(this.props.currentItem)) {
		// this.refreshEditor();
		// }
	};

	ContentWrap.prototype.componentDidMount = function componentDidMount() {
		this.props.onRef(this);
	};

	ContentWrap.prototype.onHtmlCodeChange = function onHtmlCodeChange(editor, change) {
		this.cmCodes.html = editor.getValue();
		this.props.onCodeChange('html', this.cmCodes.html, change.origin !== 'setValue');
		this.onCodeChange(editor, change);
	};

	ContentWrap.prototype.onCssCodeChange = function onCssCodeChange(editor, change) {
		this.cmCodes.css = editor.getValue();
		this.props.onCodeChange('css', this.cmCodes.css, change.origin !== 'setValue');
		this.onCodeChange(editor, change);
	};

	ContentWrap.prototype.onJsCodeChange = function onJsCodeChange(editor, change) {
		this.cmCodes.js = editor.getValue();
		this.props.onCodeChange('js', this.cmCodes.js, change.origin !== 'setValue');
		this.onCodeChange(editor, change);
	};

	ContentWrap.prototype.onCodeChange = function onCodeChange(editor, change) {
		var _this2 = this;

		clearTimeout(this.updateTimer);

		this.updateTimer = setTimeout(function () {
			// This is done so that multiple simultaneous setValue don't trigger too many preview refreshes
			// and in turn too many file writes on a single file (eg. preview.html).
			if (change.origin !== 'setValue') {
				// Specifically checking for false so that the condition doesn't get true even
				// on absent key - possible when the setting key hasn't been fetched yet.
				if (_this2.prefs.autoPreview !== false) {
					_this2.setPreviewContent();
				}

				// Track when people actually are working.
				_analytics.trackEvent.previewCount = (_analytics.trackEvent.previewCount || 0) + 1;
				if (_analytics.trackEvent.previewCount === 4) {
					(0, _analytics.trackEvent)('fn', 'usingPreview');
				}
			}
		}, this.updateDelay);
	};

	ContentWrap.prototype.createPreviewFile = function createPreviewFile(html, css, js) {
		var _this3 = this;

		// isNotChrome
		var shouldInlineJs = !window.webkitRequestFileSystem || !window.IS_EXTENSION;
		var contents = (0, _utils.getCompleteHtml)(html, css, shouldInlineJs ? js : null, this.props.currentItem);
		var blob = new Blob([contents], { type: 'text/plain;charset=UTF-8' });
		var blobjs = new Blob([js], { type: 'text/plain;charset=UTF-8' });

		// Track if people have written code.
		if (!_analytics.trackEvent.hasTrackedCode && (html || css || js)) {
			(0, _analytics.trackEvent)('fn', 'hasCode');
			_analytics.trackEvent.hasTrackedCode = true;
		}

		if (shouldInlineJs) {
			if (this.detachedWindow) {
				(0, _utils.log)('✉️ Sending message to detached window');
				this.detachedWindow.postMessage({ contents: contents }, '*');
			} else {
				this.frame.src = this.frame.src;
				setTimeout(function () {
					_this3.frame.contentDocument.open();
					_this3.frame.contentDocument.write(contents);
					_this3.frame.contentDocument.close();
				}, 10);
			}
		} else {
			// we need to store user script in external JS file to prevent inline-script
			// CSP from affecting it.
			(0, _utils.writeFile)('script.js', blobjs, function () {
				(0, _utils.writeFile)('preview.html', blob, function () {
					var origin = chrome.i18n.getMessage() ? 'chrome-extension://' + chrome.i18n.getMessage('@@extension_id') : '' + location.origin;
					var src = 'filesystem:' + origin + '/temporary/preview.html';
					if (_this3.detachedWindow) {
						_this3.detachedWindow.postMessage(src, '*');
					} else {
						_this3.frame.src = src;
					}
				});
			});
		}
	};

	ContentWrap.prototype.cleanupErrors = function cleanupErrors(lang) {
		this.cm[lang].clearGutter('error-gutter');
	};

	ContentWrap.prototype.showErrors = function showErrors(lang, errors) {
		var editor = this.cm[lang];
		errors.forEach(function (e) {
			editor.operation(function () {
				var n = document.createElement('div');
				n.setAttribute('data-title', e.message);
				n.classList.add('gutter-error-marker');
				editor.setGutterMarker(e.lineNumber, 'error-gutter', n);
			});
		});
	};

	/**
  * Generates the preview from the current code.
  * @param {boolean} isForced Should refresh everything without any check or not
  * @param {boolean} isManual Is this a manual preview request from user?
  */


	ContentWrap.prototype.setPreviewContent = function setPreviewContent(isForced, isManual) {
		var _this4 = this;

		if (!this.props.prefs.autoPreview && !isManual) {
			return;
		}

		if (!this.props.prefs.preserveConsoleLogs) {
			this.clearConsole();
		}
		this.cleanupErrors('html');
		this.cleanupErrors('css');
		this.cleanupErrors('js');

		var currentCode = {
			html: this.cmCodes.html,
			css: this.cmCodes.css,
			js: this.cmCodes.js
		};
		(0, _utils.log)('🔎 setPreviewContent', isForced);
		var targetFrame = this.detachedWindow ? this.detachedWindow.document.querySelector('iframe') : this.frame;

		var cssMode = this.props.currentItem.cssMode;
		// If just CSS was changed (and everything shudn't be empty),
		// change the styles inside the iframe.
		if (!isForced && currentCode.html === this.codeInPreview.html && currentCode.js === this.codeInPreview.js) {
			(0, _computes.computeCss)(cssMode === _codeModes.CssModes.ACSS ? currentCode.html : currentCode.css, cssMode, this.props.currentItem.cssSettings).then(function (result) {
				if (cssMode === _codeModes.CssModes.ACSS) {
					_this4.cm.css.setValue(result.code || '');
				}
				if (targetFrame.contentDocument.querySelector('#webmakerstyle')) {
					targetFrame.contentDocument.querySelector('#webmakerstyle').textContent = result.code || '';
				}
			});
		} else {
			var htmlPromise = (0, _computes.computeHtml)(currentCode.html, this.props.currentItem.htmlMode);
			var cssPromise = (0, _computes.computeCss)(cssMode === _codeModes.CssModes.ACSS ? currentCode.html : currentCode.css, cssMode, this.props.currentItem.cssSettings);
			var jsPromise = (0, _computes.computeJs)(currentCode.js, this.props.currentItem.jsMode, true, this.props.prefs.infiniteLoopTimeout);
			Promise.all([htmlPromise, cssPromise, jsPromise]).then(function (result) {
				if (cssMode === _codeModes.CssModes.ACSS) {
					_this4.cm.css.setValue(result[1].code || '');
				}

				_this4.createPreviewFile(result[0].code || '', result[1].code || '', result[2].code || '');
				result.forEach(function (resultItem) {
					if (resultItem.errors) {
						_this4.showErrors(resultItem.errors.lang, resultItem.errors.data);
					}
				});
			});
		}

		this.codeInPreview.html = currentCode.html;
		this.codeInPreview.css = currentCode.css;
		this.codeInPreview.js = currentCode.js;
	};

	ContentWrap.prototype.isValidItem = function isValidItem(item) {
		return !!item.title;
	};

	ContentWrap.prototype.refreshEditor = function refreshEditor() {
		var _this5 = this;

		this.cmCodes.html = this.props.currentItem.html;
		this.cmCodes.css = this.props.currentItem.css;
		this.cmCodes.js = this.props.currentItem.js;
		this.cm.html.setValue(this.cmCodes.html || '');
		this.cm.css.setValue(this.cmCodes.css || '');
		this.cm.js.setValue(this.cmCodes.js || '');
		this.cm.html.refresh();
		this.cm.css.refresh();
		this.cm.js.refresh();

		this.clearConsole();

		// Set preview only when all modes are updated so that preview doesn't generate on partially
		// correct modes and also doesn't happen 3 times.
		Promise.all([this.updateHtmlMode(this.props.currentItem.htmlMode), this.updateCssMode(this.props.currentItem.cssMode), this.updateJsMode(this.props.currentItem.jsMode)]).then(function () {
			return _this5.setPreviewContent(true);
		});
	};

	ContentWrap.prototype.applyCodemirrorSettings = function applyCodemirrorSettings(prefs) {
		var _this6 = this;

		if (!this.cm) {
			return;
		}
		htmlCodeEl.querySelector('.CodeMirror').style.fontSize = cssCodeEl.querySelector('.CodeMirror').style.fontSize = jsCodeEl.querySelector('.CodeMirror').style.fontSize = parseInt(prefs.fontSize, 10) + 'px';
		window.consoleEl.querySelector('.CodeMirror').style.fontSize = parseInt(prefs.fontSize, 10) + 'px';

		// Replace correct css file in LINK tags's href
		window.editorThemeLinkTag.href = 'lib/codemirror/theme/' + prefs.editorTheme + '.css';
		window.fontStyleTag.textContent = window.fontStyleTemplate.textContent.replace(/fontname/g, (prefs.editorFont === 'other' ? prefs.editorCustomFont : prefs.editorFont) || 'FiraCode');
		// window.customEditorFontInput.classList[
		// 	prefs.editorFont === 'other' ? 'remove' : 'add'
		// ]('hide');
		this.consoleCm.setOption('theme', prefs.editorTheme);

		['html', 'js', 'css'].forEach(function (type) {
			_this6.cm[type].setOption('indentWithTabs', prefs.indentWith !== 'spaces');
			_this6.cm[type].setOption('blastCode', prefs.isCodeBlastOn ? { effect: 2, shake: false } : false);
			_this6.cm[type].setOption('indentUnit', +prefs.indentSize);
			_this6.cm[type].setOption('tabSize', +prefs.indentSize);
			_this6.cm[type].setOption('theme', prefs.editorTheme);

			_this6.cm[type].setOption('keyMap', prefs.keymap);
			_this6.cm[type].setOption('lineWrapping', prefs.lineWrap);
			_this6.cm[type].refresh();
		});
	};

	// Check all the code wrap if they are minimized or maximized


	ContentWrap.prototype.updateCodeWrapCollapseStates = function updateCodeWrapCollapseStates() {
		var _this7 = this;

		// This is debounced!
		clearTimeout(this.updateCodeWrapCollapseStates.timeout);
		this.updateCodeWrapCollapseStates.timeout = setTimeout(function () {
			var currentLayoutMode = _this7.props.currentLayoutMode;

			var prop = currentLayoutMode === 2 || currentLayoutMode === 5 ? 'width' : 'height';
			[htmlCodeEl, cssCodeEl, jsCodeEl].forEach(function (el) {
				var bounds = el.getBoundingClientRect();
				var size = bounds[prop];
				if (size < 100) {
					el.classList.add('is-minimized');
				} else {
					el.classList.remove('is-minimized');
				}
				if (el.style[prop].indexOf('100% - ' + minCodeWrapSize * 2 + 'px') !== -1) {
					el.classList.add('is-maximized');
				} else {
					el.classList.remove('is-maximized');
				}
			});
		}, 50);
	};

	ContentWrap.prototype.toggleCodeWrapCollapse = function toggleCodeWrapCollapse(codeWrapEl) {
		if (codeWrapEl.classList.contains('is-minimized') || codeWrapEl.classList.contains('is-maximized')) {
			codeWrapEl.classList.remove('is-minimized');
			codeWrapEl.classList.remove('is-maximized');
			this.codeSplitInstance.setSizes([0, 30, 70]);
		} else {
			var id = parseInt(codeWrapEl.dataset.codeWrapId, 10);
			var arr = [minCodeWrapSize + 'px', minCodeWrapSize + 'px', minCodeWrapSize + 'px'];
			arr[id] = 'calc(100% - ' + minCodeWrapSize * 2 + 'px)';

			this.codeSplitInstance.setSizes(arr);
			codeWrapEl.classList.add('is-maximized');
		}
		this.updateSplits();
	};

	ContentWrap.prototype.collapseBtnHandler = function collapseBtnHandler(e) {
		var codeWrapParent = e.currentTarget.parentElement.parentElement.parentElement;
		this.toggleCodeWrapCollapse(codeWrapParent);
		(0, _analytics.trackEvent)('ui', 'paneCollapseBtnClick', codeWrapParent.dataset.type);
	};

	ContentWrap.prototype.codeWrapHeaderDblClickHandler = function codeWrapHeaderDblClickHandler(e) {
		if (!e.target.classList.contains('js-code-wrap__header')) {
			return;
		}
		var codeWrapParent = e.target.parentElement;
		this.toggleCodeWrapCollapse(codeWrapParent);
		(0, _analytics.trackEvent)('ui', 'paneHeaderDblClick', codeWrapParent.dataset.type);
	};

	ContentWrap.prototype.resetSplitting = function resetSplitting() {
		this.setState({
			codeSplitSizes: this.getCodeSplitSizes(),
			mainSplitSizes: this.getMainSplitSizesToApply()
		});
	};

	ContentWrap.prototype.updateSplits = function updateSplits() {
		this.props.onSplitUpdate();
		// Not using setState to avoid re-render
		this.state.codeSplitSizes = this.props.currentItem.sizes;
		this.state.mainSplitSizes = this.props.currentItem.mainSizes;
	};

	// Returns the sizes of main code & preview panes.


	ContentWrap.prototype.getMainSplitSizesToApply = function getMainSplitSizesToApply() {
		var mainSplitSizes;
		var _props = this.props,
		    currentItem = _props.currentItem,
		    currentLayoutMode = _props.currentLayoutMode;

		if (currentItem && currentItem.mainSizes) {
			// For layout mode 3, main panes are reversed using flex-direction.
			// So we need to apply the saved sizes in reverse order.
			mainSplitSizes = currentLayoutMode === 3 ? [currentItem.mainSizes[1], currentItem.mainSizes[0]] : currentItem.mainSizes;
		} else {
			mainSplitSizes = currentLayoutMode === 5 ? [75, 25] : [50, 50];
		}
		return mainSplitSizes;
	};

	ContentWrap.prototype.getCodeSplitSizes = function getCodeSplitSizes() {
		if (this.props.currentItem && this.props.currentItem.sizes) {
			return this.props.currentItem.sizes;
		}
		return [0, 30, 70];
	};

	ContentWrap.prototype.mainSplitDragEndHandler = function mainSplitDragEndHandler() {
		var _this8 = this;

		if (this.props.prefs.refreshOnResize) {
			// Running preview updation in next call stack, so that error there
			// doesn't affect this dragend listener.
			setTimeout(function () {
				_this8.setPreviewContent(true);
			}, 1);
		}
		this.updateSplits();
	};

	ContentWrap.prototype.codeSplitDragStart = function codeSplitDragStart() {
		document.body.classList.add('is-dragging');
	};

	ContentWrap.prototype.codeSplitDragEnd = function codeSplitDragEnd() {
		this.updateCodeWrapCollapseStates();
		document.body.classList.remove('is-dragging');
		this.updateSplits();
	};
	/**
  * Loaded the code comiler based on the mode selected
  */


	ContentWrap.prototype.handleModeRequirements = function handleModeRequirements(mode) {
		var baseTranspilerPath = 'lib/transpilers';
		// Exit if already loaded
		var d = (0, _deferred.deferred)();
		if (_codeModes.modes[mode].hasLoaded) {
			d.resolve();
			return d.promise;
		}

		function setLoadedFlag() {
			_codeModes.modes[mode].hasLoaded = true;
			d.resolve();
		}

		if (mode === _codeModes.HtmlModes.JADE) {
			(0, _utils.loadJS)(baseTranspilerPath + '/jade.js').then(setLoadedFlag);
		} else if (mode === _codeModes.HtmlModes.MARKDOWN) {
			(0, _utils.loadJS)(baseTranspilerPath + '/marked.js').then(setLoadedFlag);
		} else if (mode === _codeModes.CssModes.LESS) {
			(0, _utils.loadJS)(baseTranspilerPath + '/less.min.js').then(setLoadedFlag);
		} else if (mode === _codeModes.CssModes.SCSS || mode === _codeModes.CssModes.SASS) {
			(0, _utils.loadJS)(baseTranspilerPath + '/sass.js').then(function () {
				window.sass = new Sass(baseTranspilerPath + '/sass.worker.js');
				setLoadedFlag();
			});
		} else if (mode === _codeModes.CssModes.STYLUS) {
			(0, _utils.loadJS)(baseTranspilerPath + '/stylus.min.js').then(setLoadedFlag);
		} else if (mode === _codeModes.CssModes.ACSS) {
			(0, _utils.loadJS)(baseTranspilerPath + '/atomizer.browser.js').then(setLoadedFlag);
		} else if (mode === _codeModes.JsModes.COFFEESCRIPT) {
			(0, _utils.loadJS)(baseTranspilerPath + '/coffee-script.js').then(setLoadedFlag);
		} else if (mode === _codeModes.JsModes.ES6) {
			(0, _utils.loadJS)(baseTranspilerPath + '/babel.min.js').then(setLoadedFlag);
		} else if (mode === _codeModes.JsModes.TS) {
			(0, _utils.loadJS)(baseTranspilerPath + '/typescript.js').then(setLoadedFlag);
		} else {
			d.resolve();
		}

		return d.promise;
	};

	ContentWrap.prototype.updateHtmlMode = function updateHtmlMode(value) {
		this.props.onCodeModeChange('html', value);
		this.props.currentItem.htmlMode = value;
		this.cm.html.setOption('mode', _codeModes.modes[value].cmMode);
		_CodeMirror2.default.autoLoadMode(this.cm.html, _codeModes.modes[value].cmPath || _codeModes.modes[value].cmMode);
		return this.handleModeRequirements(value);
	};

	ContentWrap.prototype.updateCssMode = function updateCssMode(value) {
		this.props.onCodeModeChange('css', value);
		this.props.currentItem.cssMode = value;
		this.cm.css.setOption('mode', _codeModes.modes[value].cmMode);
		this.cm.css.setOption('readOnly', _codeModes.modes[value].cmDisable);
		window.cssSettingsBtn.classList[_codeModes.modes[value].hasSettings ? 'remove' : 'add']('hide');
		_CodeMirror2.default.autoLoadMode(this.cm.css, _codeModes.modes[value].cmPath || _codeModes.modes[value].cmMode);
		return this.handleModeRequirements(value);
	};

	ContentWrap.prototype.updateJsMode = function updateJsMode(value) {
		this.props.onCodeModeChange('js', value);
		this.props.currentItem.jsMode = value;
		this.cm.js.setOption('mode', _codeModes.modes[value].cmMode);
		_CodeMirror2.default.autoLoadMode(this.cm.js, _codeModes.modes[value].cmPath || _codeModes.modes[value].cmMode);
		return this.handleModeRequirements(value);
	};

	ContentWrap.prototype.codeModeChangeHandler = function codeModeChangeHandler(e) {
		var _this9 = this;

		var mode = e.target.value;
		var type = e.target.dataset.type;
		var currentMode = this.props.currentItem[type === 'html' ? 'htmlMode' : type === 'css' ? 'cssMode' : 'jsMode'];
		if (currentMode !== mode) {
			if (type === 'html') {
				this.updateHtmlMode(mode).then(function () {
					return _this9.setPreviewContent(true);
				});
			} else if (type === 'js') {
				this.updateJsMode(mode).then(function () {
					return _this9.setPreviewContent(true);
				});
			} else if (type === 'css') {
				this.updateCssMode(mode).then(function () {
					return _this9.setPreviewContent(true);
				});
			}
			(0, _analytics.trackEvent)('ui', 'updateCodeMode', mode);
		}
	};

	ContentWrap.prototype.detachPreview = function detachPreview() {
		var _this10 = this;

		if (this.detachedWindow) {
			this.detachedWindow.focus();
			return;
		}
		var iframeBounds = this.frame.getBoundingClientRect();
		var iframeWidth = iframeBounds.width;
		var iframeHeight = iframeBounds.height;
		document.body.classList.add('is-detached-mode');
		window.globalConsoleContainerEl.insertBefore(window.consoleEl, null);

		this.detachedWindow = window.open('./preview.html', 'Web Maker', 'width=' + iframeWidth + ',height=' + iframeHeight + ',resizable,scrollbars=yes,status=1');
		// Trigger initial render in detached window
		setTimeout(function () {
			_this10.setPreviewContent(true);
		}, 1500);

		var intervalID = window.setInterval(function (checkWindow) {
			if (_this10.detachedWindow && _this10.detachedWindow.closed) {
				clearInterval(intervalID);
				document.body.classList.remove('is-detached-mode');
				$('#js-demo-side').insertBefore(window.consoleEl, null);
				_this10.detachedWindow = null;
				// Update main frame preview to get latest changes (which were not
				// getting reflected while detached window was open)
				_this10.setPreviewContent(true);
			}
		}, 500);
	};

	ContentWrap.prototype.onMessageFromConsole = function onMessageFromConsole() {
		var _this11 = this;

		/* eslint-disable no-param-reassign */
		[].concat(Array.prototype.slice.call(arguments)).forEach(function (arg) {
			if (arg && arg.indexOf && arg.indexOf('filesystem:chrome-extension') !== -1) {
				arg = arg.replace(/filesystem:chrome-extension.*\.js:(\d+):*(\d*)/g, 'script $1:$2');
			}
			try {
				_this11.consoleCm.replaceRange(arg + ' ' + ((arg + '').match(/\[object \w+]/) ? JSON.stringify(arg) : '') + '\n', {
					line: Infinity
				});
			} catch (e) {
				_this11.consoleCm.replaceRange('🌀\n', {
					line: Infinity
				});
			}
			_this11.consoleCm.scrollTo(0, Infinity);
			_this11.logCount++;
		});
		logCountEl.textContent = this.logCount;

		/* eslint-enable no-param-reassign */
	};

	ContentWrap.prototype.previewException = function previewException(error) {
		console.error('Possible infinite loop detected.', error.stack);
		this.onMessageFromConsole('Possible infinite loop detected.', error.stack);
	};

	ContentWrap.prototype.toggleConsole = function toggleConsole() {
		this.setState({ isConsoleOpen: !this.state.isConsoleOpen });
		(0, _analytics.trackEvent)('ui', 'consoleToggle');
	};

	ContentWrap.prototype.consoleHeaderDblClickHandler = function consoleHeaderDblClickHandler(e) {
		if (!e.target.classList.contains('js-console__header')) {
			return;
		}
		(0, _analytics.trackEvent)('ui', 'consoleToggleDblClick');
		this.toggleConsole();
	};

	ContentWrap.prototype.clearConsole = function clearConsole() {
		this.consoleCm.setValue('');
		this.logCount = 0;
		window.logCountEl.textContent = this.logCount;
	};

	ContentWrap.prototype.clearConsoleBtnClickHandler = function clearConsoleBtnClickHandler() {
		this.clearConsole();
		(0, _analytics.trackEvent)('ui', 'consoleClearBtnClick');
	};

	ContentWrap.prototype.evalConsoleExpr = function evalConsoleExpr(e) {
		// Clear console on CTRL + L
		if ((e.which === 76 || e.which === 12) && e.ctrlKey) {
			this.clearConsole();
			(0, _analytics.trackEvent)('ui', 'consoleClearKeyboardShortcut');
		} else if (e.which === 13) {
			this.onMessageFromConsole('> ' + e.target.value);

			/* eslint-disable no-underscore-dangle */
			this.frame.contentWindow._wmEvaluate(e.target.value);

			/* eslint-enable no-underscore-dangle */

			e.target.value = '';
			(0, _analytics.trackEvent)('fn', 'evalConsoleExpr');
		}
	};

	ContentWrap.prototype.cssSettingsBtnClickHandler = function cssSettingsBtnClickHandler() {
		this.setState({ isCssSettingsModalOpen: true });
		(0, _analytics.trackEvent)('ui', 'cssSettingsBtnClick');
	};

	ContentWrap.prototype.cssSettingsChangeHandler = function cssSettingsChangeHandler(settings) {
		this.props.onCodeSettingsChange('css', settings);
		this.setPreviewContent(true);
	};

	ContentWrap.prototype.getDemoFrame = function getDemoFrame(callback) {
		callback(this.frame);
	};

	ContentWrap.prototype.editorFocusHandler = function editorFocusHandler(editor) {
		this.props.onEditorFocus(editor);
	};

	ContentWrap.prototype.render = function render() {
		var _this12 = this;

		return (0, _preact.h)(
			_SplitPane.SplitPane,
			{
				'class': 'content-wrap  flex  flex-grow',
				sizes: this.state.mainSplitSizes,
				minSize: 150,
				style: '',
				direction: this.props.currentLayoutMode === 2 ? 'vertical' : 'horizontal',
				onDragEnd: this.mainSplitDragEndHandler.bind(this)
			},
			(0, _preact.h)(
				_SplitPane.SplitPane,
				{
					'class': 'code-side',
					id: 'js-code-side',
					sizes: this.state.codeSplitSizes,
					minSize: minCodeWrapSize,
					direction: this.props.currentLayoutMode === 2 || this.props.currentLayoutMode === 5 ? 'horizontal' : 'vertical',
					onDragStart: this.codeSplitDragStart.bind(this),
					onDragEnd: this.codeSplitDragEnd.bind(this),
					onSplit: function onSplit(splitInstance) {
						return _this12.codeSplitInstance = splitInstance;
					}
				},
				(0, _preact.h)(
					'div',
					{
						'data-code-wrap-id': '0',
						id: 'htmlCodeEl',
						'data-type': 'html',
						'class': 'code-wrap',
						style: 'display: none',
						onTransitionEnd: this.updateCodeWrapCollapseStates.bind(this)
					},
					(0, _preact.h)(
						'div',
						{
							'class': 'js-code-wrap__header  code-wrap__header',
							title: 'Double click to toggle code pane',
							onDblClick: this.codeWrapHeaderDblClickHandler.bind(this)
						},
						(0, _preact.h)(
							'label',
							{ 'class': 'btn-group', dropdow: true, title: 'Click to change' },
							(0, _preact.h)(
								'span',
								{ 'class': 'code-wrap__header-label' },
								_codeModes.modes[this.props.currentItem.htmlMode || 'html'].label
							),
							_ref,
							(0, _preact.h)(
								'select',
								{
									'data-type': 'html',
									'class': 'js-mode-select  hidden-select',
									onChange: this.codeModeChangeHandler.bind(this),
									value: this.props.currentItem.htmlMode
								},
								_ref2,
								_ref3,
								_ref4
							)
						),
						(0, _preact.h)(
							'div',
							{ 'class': 'code-wrap__header-right-options' },
							(0, _preact.h)('a', {
								'class': 'js-code-collapse-btn  code-wrap__header-btn  code-wrap__collapse-btn',
								title: 'Toggle code pane',
								onClick: this.collapseBtnHandler.bind(this)
							})
						)
					),
					(0, _preact.h)(_UserCodeMirror2.default, {
						options: {
							mode: 'htmlmixed',
							profile: 'xhtml',
							gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
							noAutocomplete: true,
							matchTags: { bothTags: true },
							emmet: true
						},
						prefs: this.props.prefs,
						onChange: this.onHtmlCodeChange.bind(this),
						onCreation: function onCreation(el) {
							return _this12.cm.html = el;
						},
						onFocus: this.editorFocusHandler.bind(this)
					})
				),
				(0, _preact.h)(
					'div',
					{
						'data-code-wrap-id': '1',
						id: 'cssCodeEl',
						'data-type': 'css',
						'class': 'code-wrap',
						onTransitionEnd: this.updateCodeWrapCollapseStates.bind(this)
					},
					(0, _preact.h)(
						'div',
						{
							'class': 'js-code-wrap__header  code-wrap__header',
							title: 'Double click to toggle code pane',
							onDblClick: this.codeWrapHeaderDblClickHandler.bind(this)
						},
						(0, _preact.h)(
							'label',
							{ 'class': 'btn-group', title: 'Click to change' },
							(0, _preact.h)(
								'span',
								{ 'class': 'code-wrap__header-label' },
								_codeModes.modes[this.props.currentItem.cssMode || 'css'].label
							),
							_ref5,
							(0, _preact.h)(
								'select',
								{
									'data-type': 'css',
									'class': 'js-mode-select  hidden-select',
									onChange: this.codeModeChangeHandler.bind(this),
									value: this.props.currentItem.cssMode
								},
								_ref6,
								_ref7,
								_ref8,
								_ref9,
								_ref10,
								_ref11
							)
						),
						(0, _preact.h)(
							'div',
							{ 'class': 'code-wrap__header-right-options' },
							(0, _preact.h)(
								'a',
								{
									href: '#',
									id: 'cssSettingsBtn',
									title: 'Atomic CSS configuration',
									onClick: this.cssSettingsBtnClickHandler.bind(this),
									'class': 'code-wrap__header-btn hide'
								},
								_ref12
							),
							(0, _preact.h)('a', {
								'class': 'js-code-collapse-btn  code-wrap__header-btn  code-wrap__collapse-btn',
								title: 'Toggle code pane',
								onClick: this.collapseBtnHandler.bind(this)
							})
						)
					),
					(0, _preact.h)(_UserCodeMirror2.default, {
						options: {
							mode: 'css',
							gutters: ['error-gutter', 'CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
							emmet: true
						},
						prefs: this.props.prefs,
						onChange: this.onCssCodeChange.bind(this),
						onCreation: function onCreation(el) {
							return _this12.cm.css = el;
						},
						onFocus: this.editorFocusHandler.bind(this)
					})
				),
				(0, _preact.h)(
					'div',
					{
						'data-code-wrap-id': '2',
						id: 'jsCodeEl',
						'data-type': 'js',
						'class': 'code-wrap',
						onTransitionEnd: this.updateCodeWrapCollapseStates.bind(this)
					},
					(0, _preact.h)(
						'div',
						{
							'class': 'js-code-wrap__header  code-wrap__header',
							title: 'Double click to toggle code pane',
							onDblClick: this.codeWrapHeaderDblClickHandler.bind(this)
						},
						(0, _preact.h)(
							'label',
							{ 'class': 'btn-group', title: 'Click to change' },
							(0, _preact.h)(
								'span',
								{ 'class': 'code-wrap__header-label' },
								_codeModes.modes[this.props.currentItem.jsMode || 'js'].label
							),
							_ref13,
							(0, _preact.h)(
								'select',
								{
									'data-type': 'js',
									'class': 'js-mode-select  hidden-select',
									style: 'display: none',
									onChange: this.codeModeChangeHandler.bind(this),
									value: this.props.currentItem.jsMode
								},
								_ref14,
								_ref15,
								_ref16,
								_ref17
							)
						),
						(0, _preact.h)(
							'div',
							{ 'class': 'code-wrap__header-right-options' },
							(0, _preact.h)('a', {
								'class': 'js-code-collapse-btn  code-wrap__header-btn  code-wrap__collapse-btn',
								title: 'Toggle code pane',
								onClick: this.collapseBtnHandler.bind(this)
							})
						)
					),
					(0, _preact.h)(_UserCodeMirror2.default, {
						options: {
							mode: 'javascript',
							gutters: ['error-gutter', 'CodeMirror-linenumbers', 'CodeMirror-foldgutter']
						},
						prefs: this.props.prefs,
						autoComplete: this.props.prefs.autoComplete,
						onChange: this.onJsCodeChange.bind(this),
						onCreation: function onCreation(el) {
							return _this12.cm.js = el;
						},
						onFocus: this.editorFocusHandler.bind(this)
					})
				)
			),
			(0, _preact.h)(
				'div',
				{ 'class': 'demo-side', id: 'js-demo-side', style: '' },
				(0, _preact.h)('iframe', {
					ref: function ref(el) {
						return _this12.frame = el;
					},
					src: 'about://blank',
					frameborder: '0',
					id: 'demo-frame',
					allowfullscreen: true
				}),
				(0, _preact.h)(
					'div',
					{
						id: 'consoleEl',
						'class': 'console ' + (this.state.isConsoleOpen ? '' : 'is-minimized'),
						style: 'display: none'
					},
					(0, _preact.h)(
						'div',
						{ id: 'consoleLogEl', 'class': 'console__log' },
						(0, _preact.h)(
							'div',
							{
								'class': 'js-console__header  code-wrap__header',
								title: 'Double click to toggle console',
								onDblClick: this.consoleHeaderDblClickHandler.bind(this)
							},
							_ref18,
							(0, _preact.h)(
								'div',
								{ 'class': 'code-wrap__header-right-options' },
								(0, _preact.h)(
									'a',
									{
										'class': 'code-wrap__header-btn',
										title: 'Clear console (CTRL + L)',
										onClick: this.clearConsoleBtnClickHandler.bind(this)
									},
									_ref19
								),
								(0, _preact.h)('a', {
									'class': 'code-wrap__header-btn  code-wrap__collapse-btn',
									title: 'Toggle console',
									onClick: this.toggleConsole.bind(this)
								})
							)
						),
						(0, _preact.h)(_CodeMirrorBox2.default, {
							options: {
								mode: 'javascript',
								lineWrapping: true,
								theme: 'monokai',
								foldGutter: true,
								readOnly: true,
								gutters: ['CodeMirror-foldgutter']
							},
							onCreation: function onCreation(el) {
								return _this12.consoleCm = el;
							}
						})
					),
					(0, _preact.h)(
						'div',
						{
							id: 'consolePromptEl',
							'class': 'console__prompt flex flex-v-center'
						},
						_ref20,
						(0, _preact.h)('input', {
							onKeyUp: this.evalConsoleExpr.bind(this),
							'class': 'console-exec-input'
						})
					)
				),
				(0, _preact.h)(_CssSettingsModal2.default, {
					show: this.state.isCssSettingsModalOpen,
					closeHandler: function closeHandler() {
						return _this12.setState({ isCssSettingsModalOpen: false });
					},
					onChange: this.cssSettingsChangeHandler.bind(this),
					settings: this.props.currentItem.cssSettings,
					editorTheme: this.props.prefs.editorTheme
				})
			)
		);
	};

	return ContentWrap;
}(_preact.Component);

exports.default = ContentWrap;

/***/ }),

/***/ "9VU0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.LibraryAutoSuggest = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__("KM04");

var _analytics = __webpack_require__("qV3Q");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LibraryAutoSuggest = exports.LibraryAutoSuggest = function (_Component) {
	_inherits(LibraryAutoSuggest, _Component);

	function LibraryAutoSuggest() {
		_classCallCheck(this, LibraryAutoSuggest);

		return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	LibraryAutoSuggest.prototype.componentDidMount = function componentDidMount() {
		var _this2 = this;

		this.t = this.wrap.querySelector('input,textarea');
		this.filter = this.props.filter;
		this.selectedCallback = this.props.onSelect;

		// after list is insrted into the DOM, we put it in the body
		// fixed at same position
		setTimeout(function () {
			requestIdleCallback(function () {
				document.body.appendChild(_this2.list);
				_this2.list.style.position = 'fixed';
			});
		}, 100);

		this.t.addEventListener('input', function (e) {
			return _this2.onInput(e);
		});
		this.t.addEventListener('keydown', function (e) {
			return _this2.onKeyDown(e);
		});
		this.t.addEventListener('blur', function (e) {
			return _this2.closeSuggestions(e);
		});
		this.list.addEventListener('mousedown', function (e) {
			return _this2.onListMouseDown(e);
		});
	};

	LibraryAutoSuggest.prototype.componentWillUnmount = function componentWillUnmount() {
		var _this3 = this;

		this.t.removeEventListener('input', function (e) {
			return _this3.onInput(e);
		});
		this.t.removeEventListener('keydown', function (e) {
			return _this3.onKeyDown(e);
		});
		this.t.removeEventListener('blur', function (e) {
			return _this3.closeSuggestions(e);
		});
		this.list.removeEventListener('mousedown', function (e) {
			return _this3.onListMouseDown(e);
		});
	};

	LibraryAutoSuggest.prototype.closeSuggestions = function closeSuggestions() {
		this.list.classList.remove('is-open');
		this.isShowingSuggestions = false;
	};

	LibraryAutoSuggest.prototype.getList = function getList(input) {
		var url = 'https://api.cdnjs.com/libraries?search=';
		return fetch(url + input).then(function (response) {
			return response.json().then(function (json) {
				return json.results;
			});
		});
	};

	LibraryAutoSuggest.prototype.replaceCurrentLine = function replaceCurrentLine(val) {
		var lines = this.t.value.split('\n');
		lines.splice(this.currentLineNumber - 1, 1, val);
		this.t.value = lines.join('\n');
	};

	LibraryAutoSuggest.prototype.onInput = function onInput() {
		var _this4 = this;

		var currentLine = this.currentLine;
		if (currentLine) {
			if (currentLine.indexOf('/') !== -1 || currentLine.match(/https*:\/\//)) {
				return;
			}
			clearTimeout(this.timeout);
			this.timeout = setTimeout(function () {
				_this4.loader.style.display = 'block';
				_this4.getList(currentLine).then(function (arr) {
					_this4.loader.style.display = 'none';
					if (!arr.length) {
						_this4.closeSuggestions();
						return;
					}
					_this4.list.innerHTML = '';
					if (_this4.filter) {
						/* eslint-disable no-param-reassign */
						arr = arr.filter(_this4.filter);
					}
					for (var i = 0; i < Math.min(arr.length, 10); i++) {
						_this4.list.innerHTML += '<li data-url="' + arr[i].latest + '"><a>' + arr[i].name + '</a></li>';
					}
					_this4.isShowingSuggestions = true;
					if (!_this4.textareaBounds) {
						_this4.textareaBounds = _this4.t.getBoundingClientRect();
						_this4.list.style.top = _this4.textareaBounds.bottom + 'px';
						_this4.list.style.left = _this4.textareaBounds.left + 'px';
						_this4.list.style.width = _this4.textareaBounds.width + 'px';
					}
					_this4.list.classList.add('is-open');
				});
			}, 500);
		}
	};

	LibraryAutoSuggest.prototype.onKeyDown = function onKeyDown(event) {
		var selectedItemElement;
		if (!this.isShowingSuggestions) {
			return;
		}

		if (event.keyCode === 27) {
			this.closeSuggestions();
			event.stopPropagation();
		}
		if (event.keyCode === 40 && this.isShowingSuggestions) {
			selectedItemElement = this.list.querySelector('.selected');
			if (selectedItemElement) {
				selectedItemElement.classList.remove('selected');
				selectedItemElement.nextElementSibling.classList.add('selected');
			} else {
				this.list.querySelector('li:first-child').classList.add('selected');
			}
			this.list.querySelector('.selected').scrollIntoView(false);
			event.preventDefault();
		} else if (event.keyCode === 38 && this.isShowingSuggestions) {
			selectedItemElement = this.list.querySelector('.selected');
			if (selectedItemElement) {
				selectedItemElement.classList.remove('selected');
				selectedItemElement.previousElementSibling.classList.add('selected');
			} else {
				this.list.querySelector('li:first-child').classList.add('selected');
			}
			this.list.querySelector('.selected').scrollIntoView(false);
			event.preventDefault();
		} else if (event.keyCode === 13 && this.isShowingSuggestions) {
			selectedItemElement = this.list.querySelector('.selected');
			this.selectSuggestion(selectedItemElement.dataset.url);
			this.closeSuggestions();
		}
	};

	LibraryAutoSuggest.prototype.onListMouseDown = function onListMouseDown(event) {
		var target = event.target;
		if (target.parentElement.dataset.url) {
			this.selectSuggestion(target.parentElement.dataset.url);
		}
	};

	LibraryAutoSuggest.prototype.selectSuggestion = function selectSuggestion(value) {
		// Return back the focus which is getting lost for some reason

		this.t.focus();
		(0, _analytics.trackEvent)('ui', 'autoSuggestionLibSelected', value);
		if (this.selectedCallback) {
			this.selectedCallback.call(null, value);
		} else {
			this.replaceCurrentLine(value);
		}
		this.closeSuggestions();
	};

	LibraryAutoSuggest.prototype.render = function render() {
		var _this5 = this;

		return (0, _preact.h)(
			'div',
			{
				'class': 'btn-group ' + (this.props.fullWidth ? 'flex-grow' : ''),
				ref: function ref(el) {
					return _this5.wrap = el;
				}
			},
			this.props.children,
			(0, _preact.h)('ul', {
				ref: function ref(el) {
					return _this5.list = el;
				},
				'class': 'dropdown__menu autocomplete-dropdown'
			}),
			(0, _preact.h)('div', {
				ref: function ref(el) {
					return _this5.loader = el;
				},
				'class': 'loader autocomplete__loader',
				style: 'display:none'
			})
		);
	};

	_createClass(LibraryAutoSuggest, [{
		key: 'currentLineNumber',
		get: function get() {
			return this.t.value.substr(0, this.t.selectionStart).split('\n').length;
		}
	}, {
		key: 'currentLine',
		get: function get() {
			var line = this.currentLineNumber;
			return this.t.value.split('\n')[line - 1];
		}
	}]);

	return LibraryAutoSuggest;
}(_preact.Component);

/***/ }),

/***/ "BcU7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

__webpack_require__("uXt8");

var _app = __webpack_require__("ZUoI");

var _app2 = _interopRequireDefault(_app);

__webpack_require__("7vHL");

var _deferred = __webpack_require__("3Z4F");

var _analytics = __webpack_require__("qV3Q");

var _utils = __webpack_require__("6Ptt");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

(function () {
	var getDb = function () {
		var _ref = _asyncToGenerator(function* () {
			if (dbPromise) {
				return dbPromise;
			}
			(0, _utils.log)('Initializing firestore');
			dbPromise = new Promise(function (resolve, reject) {
				if (db) {
					return resolve(db);
				}
				return _app2.default.firestore().enablePersistence().then(function () {
					// Initialize Cloud Firestore through firebase
					db = _app2.default.firestore();
					// const settings = {
					// 	timestampsInSnapshots: true
					// };
					// db.settings(settings);
					(0, _utils.log)('firebase db ready', db);
					resolve(db);
				}).catch(function (err) {
					reject(err.code);
					if (err.code === 'failed-precondition') {
						// Multiple tabs open, persistence can only be enabled
						// in one tab at a a time.
						alert("Opening Web Maker web app in multiple tabs isn't supported at present and it seems like you already have it opened in another tab. Please use in one tab.");
						(0, _analytics.trackEvent)('fn', 'multiTabError');
					} else if (err.code === 'unimplemented') {
						// The current browser does not support all of the
						// features required to enable persistence
						// ...
					}
				});
			});
			return dbPromise;
		});

		return function getDb() {
			return _ref.apply(this, arguments);
		};
	}();

	var getUserLastSeenVersion = function () {
		var _ref2 = _asyncToGenerator(function* () {
			var d = (0, _deferred.deferred)();
			// Will be chrome.storage.sync in extension environment,
			// otherwise will fallback to localstorage
			dbSyncAlias.get({
				lastSeenVersion: ''
			}, function (result) {
				d.resolve(result.lastSeenVersion);
			});
			return d.promise;
			// Might consider getting actual value from remote db.
			// Not critical right now.
		});

		return function getUserLastSeenVersion() {
			return _ref2.apply(this, arguments);
		};
	}();

	var setUserLastSeenVersion = function () {
		var _ref3 = _asyncToGenerator(function* (version) {
			// Setting the `lastSeenVersion` in localStorage(sync for extension) always
			// because next time we need to fetch it irrespective of the user being
			// logged in or out quickly from local storage.
			dbSyncAlias.set({
				lastSeenVersion: version
			}, function () {});
			if (window.user) {
				var remoteDb = yield getDb();
				remoteDb.doc('users/' + window.user.uid).update({
					lastSeenVersion: version
				});
			}
		});

		return function setUserLastSeenVersion(_x) {
			return _ref3.apply(this, arguments);
		};
	}();

	var getUser = function () {
		var _ref4 = _asyncToGenerator(function* (userId) {
			var remoteDb = yield getDb();
			return remoteDb.doc('users/' + userId).get().then(function (doc) {
				if (!doc.exists) return remoteDb.doc('users/' + userId).set({}, {
					merge: true
				});
				var user = doc.data();
				_extends(window.user, user);
				return user;
			});
		});

		return function getUser(_x2) {
			return _ref4.apply(this, arguments);
		};
	}();

	// Fetch user settings.
	// This isn't hitting the remote db because remote settings
	// get fetch asynchronously (in user/) and update the envioronment.


	var FAUX_DELAY = 1;

	var db;
	var dbPromise;

	var local = {
		get: function get(obj, cb) {
			var retVal = {};
			if (typeof obj === 'string') {
				retVal[obj] = JSON.parse(window.localStorage.getItem(obj));
				setTimeout(function () {
					return cb(retVal);
				}, FAUX_DELAY);
			} else {
				Object.keys(obj).forEach(function (key) {
					var val = window.localStorage.getItem(key);
					retVal[key] = val === undefined || val === null ? obj[key] : JSON.parse(val);
				});
				setTimeout(function () {
					return cb(retVal);
				}, FAUX_DELAY);
			}
		},
		set: function set(obj, cb) {
			Object.keys(obj).forEach(function (key) {
				window.localStorage.setItem(key, JSON.stringify(obj[key]));
			});
			/* eslint-disable consistent-return */
			setTimeout(function () {
				if (cb) {
					return cb();
				}
			}, FAUX_DELAY);
			/* eslint-enable consistent-return */
		},
		remove: function remove(key, cb) {
			window.localStorage.removeItem(key);
			setTimeout(function () {
				return cb();
			}, FAUX_DELAY);
		}
	};
	var dbLocalAlias = chrome && chrome.storage ? chrome.storage.local : local;
	var dbSyncAlias = chrome && chrome.storage ? chrome.storage.sync : local;

	function getSettings(defaultSettings) {
		var d = (0, _deferred.deferred)();
		// Will be chrome.storage.sync in extension environment,
		// otherwise will fallback to localstorage
		dbSyncAlias.get(defaultSettings, function (result) {
			d.resolve(result);
		});
		return d.promise;
	}

	window.db = {
		getDb: getDb,
		getUser: getUser,
		getUserLastSeenVersion: getUserLastSeenVersion,
		setUserLastSeenVersion: setUserLastSeenVersion,
		getSettings: getSettings,
		local: dbLocalAlias,
		sync: dbSyncAlias
	};
})();

/***/ }),

/***/ "CIHI":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = undefined;

var _preact = __webpack_require__("KM04");

var _CodeMirror = __webpack_require__("c/up");

var _CodeMirror2 = _interopRequireDefault(_CodeMirror);

__webpack_require__("qqFR");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CodeMirrorBox = function (_Component) {
	_inherits(CodeMirrorBox, _Component);

	function CodeMirrorBox() {
		_classCallCheck(this, CodeMirrorBox);

		return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	CodeMirrorBox.prototype.componentDidMount = function componentDidMount() {
		this.initEditor();
	};

	CodeMirrorBox.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
		return false;
	};

	CodeMirrorBox.prototype.initEditor = function initEditor() {
		this.cm = _CodeMirror2.default.fromTextArea(this.textarea, this.props.options);
		if (this.props.onChange) {
			this.cm.on('change', this.props.onChange);
		}
		if (this.props.onBlur) {
			this.cm.on('blur', this.props.onBlur);
		}
		this.props.onCreation(this.cm);
	};

	CodeMirrorBox.prototype.render = function render() {
		var _this2 = this;

		return (0, _preact.h)('textarea', {
			ref: function ref(el) {
				return _this2.textarea = el;
			},
			name: '',
			id: '',
			cols: '30',
			rows: '10'
		});
	};

	return CodeMirrorBox;
}(_preact.Component);

exports.default = CodeMirrorBox;

/***/ }),

/***/ "CbJP":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.Alerts = undefined;

var _preact = __webpack_require__("KM04");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ref = (0, _preact.h)("div", { "class": "alerts-container", id: "js-alerts-container" });

var Alerts = exports.Alerts = function (_Component) {
	_inherits(Alerts, _Component);

	function Alerts() {
		_classCallCheck(this, Alerts);

		return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	Alerts.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
		return false;
	};

	Alerts.prototype.render = function render() {
		return _ref;
	};

	return Alerts;
}(_preact.Component);

/***/ }),

/***/ "E5zE":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.computeHtml = computeHtml;
exports.computeCss = computeCss;
exports.computeJs = computeJs;

var _deferred = __webpack_require__("3Z4F");

var _utils = __webpack_require__("6Ptt");

var _codeModes = __webpack_require__("y5h4");

var esprima = __webpack_require__("4E2n");

// computeHtml, computeCss & computeJs evaluate the final code according
// to whatever mode is selected and resolve the returned promise with the code.
function computeHtml(userCode, mode) {
	var code = '<main id="demo">\n' + '<button id="btnDownloadPng">\n' + '  Export as PNG\n' + '</button>' + ' <div id="diagram">   <seq-diagram></seq-diagram>\n </div>' + '  </main>';

	var d = (0, _deferred.deferred)();
	if (mode === _codeModes.HtmlModes.HTML) {
		d.resolve({
			code: code
		});
	} else if (mode === _codeModes.HtmlModes.MARKDOWN) {
		d.resolve(window.marked ? {
			code: marked(code)
		} : {
			code: code
		});
	} else if (mode === _codeModes.HtmlModes.JADE) {
		d.resolve(window.jade ? {
			code: jade.render(code)
		} : {
			code: code
		});
	}

	return d.promise;
}
function computeCss(userCode, mode, settings) {
	var code = userCode;

	var d = (0, _deferred.deferred)();
	var errors;

	if (mode === _codeModes.CssModes.CSS) {
		d.resolve({
			code: code
		});
	} else if (mode === _codeModes.CssModes.SCSS || mode === _codeModes.CssModes.SASS) {
		if (window.sass && code) {
			window.sass.compile(code, {
				indentedSyntax: mode === _codeModes.CssModes.SASS
			}, function (result) {
				// Something was wrong
				if (result.line && result.message) {
					errors = {
						lang: 'css',
						data: [{
							lineNumber: result.line - 1,
							message: result.message
						}]
					};
				}
				d.resolve({
					code: result.text,
					errors: errors
				});
			});
		} else {
			d.resolve({
				code: code
			});
		}
	} else if (mode === _codeModes.CssModes.LESS) {
		less.render(code).then(function (result) {
			d.resolve({
				code: result.css
			});
		}, function (error) {
			errors = {
				lang: 'css',
				data: [{
					lineNumber: error.line,
					message: error.message
				}]
			};
			d.resolve({
				code: '',
				errors: errors
			});
		});
	} else if (mode === _codeModes.CssModes.STYLUS) {
		stylus(code).render(function (error, result) {
			if (error) {
				window.err = error;
				// Last line of message is the actual message
				var tempArr = error.message.split('\n');
				tempArr.pop(); // This is empty string in the end
				errors = {
					lang: 'css',
					data: [{
						lineNumber: +error.message.match(/stylus:(\d+):/)[1] - 298,
						message: tempArr.pop()
					}]
				};
			}
			d.resolve({
				code: result,
				errors: errors
			});
		});
	} else if (mode === _codeModes.CssModes.ACSS) {
		if (!window.atomizer) {
			d.resolve({
				code: ''
			});
		} else {
			var html = code;
			var foundClasses = atomizer.findClassNames(html);
			var finalConfig;
			try {
				finalConfig = atomizer.getConfig(foundClasses, JSON.parse(settings.acssConfig));
			} catch (e) {
				finalConfig = atomizer.getConfig(foundClasses, {});
			}
			var acss = atomizer.getCss(finalConfig);
			d.resolve({
				code: acss
			});
		}
	}

	return d.promise;
}

/* eslint-disable max-params */
/* eslint-disable complexity */
function computeJs(userCode, mode, shouldPreventInfiniteLoops, infiniteLoopTimeout) {
	// var code = userCode;
	console.log('code:', JSON.stringify(userCode));
	var code = 'app.$store.commit(\'code\', ' + JSON.stringify(userCode) + ');';
	var d = (0, _deferred.deferred)();
	var errors;

	if (!code) {
		d.resolve('');
		return d.promise;
	}

	if (mode === _codeModes.JsModes.JS) {
		try {
			esprima.parse(code, {
				tolerant: true
			});
		} catch (e) {
			errors = {
				lang: 'js',
				data: [{
					lineNumber: e.lineNumber - 1,
					message: e.description
				}]
			};
		} finally {
			if (shouldPreventInfiniteLoops !== false) {
				// If errors are found in last parse, we don't run infinite loop
				// protection otherwise it will again throw error.
				code = errors ? code : (0, _utils.addInfiniteLoopProtection)(code, {
					timeout: infiniteLoopTimeout
				});
			}

			d.resolve({
				code: code,
				errors: errors
			});
		}
	} else if (mode === _codeModes.JsModes.COFFEESCRIPT) {
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
				data: [{
					lineNumber: e.location.first_line,
					message: e.message
				}]
			};
		} finally {
			if (shouldPreventInfiniteLoops !== false) {
				code = errors ? code : (0, _utils.addInfiniteLoopProtection)(code, {
					timeout: infiniteLoopTimeout
				});
			}
			d.resolve({
				code: code,
				errors: errors
			});
		}
	} else if (mode === _codeModes.JsModes.ES6) {
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
				data: [{
					lineNumber: e.lineNumber - 1,
					message: e.description
				}]
			};
		} finally {
			code = Babel.transform(code, {
				presets: ['latest', 'stage-2', 'react']
			}).code;
			if (shouldPreventInfiniteLoops !== false) {
				code = errors ? code : (0, _utils.addInfiniteLoopProtection)(code, {
					timeout: infiniteLoopTimeout
				});
			}
			d.resolve({
				code: code,
				errors: errors
			});
		}
	} else if (mode === _codeModes.JsModes.TS) {
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
					data: [{
						message: code.diagnostics[0].messageText,
						lineNumber: ts.getLineOfLocalPosition(code.diagnostics[0].file, code.diagnostics[0].start) - 1
					}]
				};
			}
			code = code.outputText;
			if (shouldPreventInfiniteLoops !== false && !errors) {
				code = (0, _utils.addInfiniteLoopProtection)(code, {
					timeout: infiniteLoopTimeout
				});
			}
			d.resolve({
				code: code,
				errors: errors
			});
		} catch (e) {}
	}

	return d.promise;
}
/* eslint-enable max-params */
/* eslint-enable complexity */

/***/ }),

/***/ "IaNL":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = undefined;

var _preact = __webpack_require__("KM04");

var _CodeMirror = __webpack_require__("c/up");

var _CodeMirror2 = _interopRequireDefault(_CodeMirror);

__webpack_require__("uQIK");

__webpack_require__("xdvC");

__webpack_require__("pTe4");

__webpack_require__("BVSg");

__webpack_require__("X7my");

__webpack_require__("H+g/");

__webpack_require__("tMLt");

__webpack_require__("1JcR");

__webpack_require__("5gBI");

__webpack_require__("bU21");

__webpack_require__("zs1I");

__webpack_require__("rbVD");

__webpack_require__("6r0S");

__webpack_require__("LiPu");

__webpack_require__("IYZm");

__webpack_require__("SUmx");

__webpack_require__("gPKv");

__webpack_require__("29F7");

__webpack_require__("Jo/m");

__webpack_require__("4e7A");

__webpack_require__("ew/s");

__webpack_require__("HeB0");

__webpack_require__("ggoL");

__webpack_require__("qqFR");

__webpack_require__("AIXc");

__webpack_require__("Xc2M");

__webpack_require__("yLr7");

__webpack_require__("AhD2");

var _codemirrorPlugin = __webpack_require__("/QFk");

var _codemirrorPlugin2 = _interopRequireDefault(_codemirrorPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(0, _codemirrorPlugin2.default)(_CodeMirror2.default);

var UserCodeMirror = function (_Component) {
	_inherits(UserCodeMirror, _Component);

	function UserCodeMirror() {
		_classCallCheck(this, UserCodeMirror);

		return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	UserCodeMirror.prototype.componentDidMount = function componentDidMount() {
		this.initEditor();
	};

	UserCodeMirror.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
		return false;
	};

	UserCodeMirror.prototype.initEditor = function initEditor() {
		var _this2 = this;

		var options = this.props.options;
		this.cm = _CodeMirror2.default.fromTextArea(this.textarea, {
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
				Up: function Up(editor) {
					// Stop up/down keys default behavior when saveditempane is open
					// if (isSavedItemsPaneOpen) {
					// return;
					// }
					_CodeMirror2.default.commands.goLineUp(editor);
				},
				Down: function Down(editor) {
					// if (isSavedItemsPaneOpen) {
					// return;
					// }
					_CodeMirror2.default.commands.goLineDown(editor);
				},
				'Shift-Tab': function ShiftTab(editor) {
					_CodeMirror2.default.commands.indentAuto(editor);
				},
				Tab: function Tab(editor) {
					if (options.emmet) {
						var didEmmetWork = editor.execCommand('emmetExpandAbbreviation');
						if (didEmmetWork === true) {
							return;
						}
					}
					var input = $('[data-setting=indentWith]:checked');
					if (!editor.somethingSelected() && (!input || input.value === 'spaces')) {
						// softtabs adds spaces. This is required because by default tab key will put tab, but we want
						// to indent with spaces if `spaces` is preferred mode of indentation.
						// `somethingSelected` needs to be checked otherwise, all selected code is replaced with softtab.
						_CodeMirror2.default.commands.insertSoftTab(editor);
					} else {
						_CodeMirror2.default.commands.defaultTab(editor);
					}
				},
				Enter: 'emmetInsertLineBreak'
			}
		});
		this.cm.on('focus', function (editor) {
			if (typeof _this2.props.onFocus === 'function') _this2.props.onFocus(editor);
		});
		this.cm.on('change', this.props.onChange);
		this.cm.addKeyMap({
			'Ctrl-Space': 'autocomplete'
		});
		if (!options.noAutocomplete) {
			this.cm.on('inputRead', function (editor, input) {
				if (!_this2.props.prefs.autoComplete || input.origin !== '+input' || input.text[0] === ';' || input.text[0] === ',' || input.text[0] === ' ') {
					return;
				}
				_CodeMirror2.default.commands.autocomplete(_this2.cm, null, {
					completeSingle: false
				});
			});
		}
		this.props.onCreation(this.cm);
	};

	UserCodeMirror.prototype.render = function render() {
		var _this3 = this;

		return (0, _preact.h)('textarea', {
			ref: function ref(el) {
				return _this3.textarea = el;
			},
			name: '',
			id: '',
			cols: '30',
			rows: '10'
		});
	};

	return UserCodeMirror;
}(_preact.Component);

exports.default = UserCodeMirror;

/***/ }),

/***/ "JkW7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _app = __webpack_require__("uv7j");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _app2.default;

/***/ }),

/***/ "MXol":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = undefined;

var _preact = __webpack_require__("KM04");

var _common = __webpack_require__("f66c");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ref = (0, _preact.h)(
	'svg',
	{ viewBox: '0 0 24 24' },
	(0, _preact.h)('path', { d: 'M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z' })
);

var _ref2 = (0, _preact.h)(
	'svg',
	{ style: 'display: none;', xmlns: 'http://www.w3.org/2000/svg' },
	(0, _preact.h)(
		'symbol',
		{ id: 'codepen-logo', viewBox: '0 0 120 120' },
		(0, _preact.h)('path', {
			'class': 'outer-ring',
			d: 'M60.048 0C26.884 0 0 26.9 0 60.048s26.884 60 60 60.047c33.163 0 60.047-26.883 60.047-60.047 S93.211 0 60 0z M60.048 110.233c-27.673 0-50.186-22.514-50.186-50.186S32.375 9.9 60 9.9 c27.672 0 50.2 22.5 50.2 50.186S87.72 110.2 60 110.233z'
		}),
		(0, _preact.h)('path', {
			'class': 'inner-box',
			d: 'M97.147 48.319c-0.007-0.047-0.019-0.092-0.026-0.139c-0.016-0.09-0.032-0.18-0.056-0.268 c-0.014-0.053-0.033-0.104-0.05-0.154c-0.025-0.078-0.051-0.156-0.082-0.232c-0.021-0.053-0.047-0.105-0.071-0.156 c-0.033-0.072-0.068-0.143-0.108-0.211c-0.029-0.051-0.061-0.1-0.091-0.148c-0.043-0.066-0.087-0.131-0.135-0.193 c-0.035-0.047-0.072-0.094-0.109-0.139c-0.051-0.059-0.104-0.117-0.159-0.172c-0.042-0.043-0.083-0.086-0.127-0.125 c-0.059-0.053-0.119-0.104-0.181-0.152c-0.048-0.037-0.095-0.074-0.145-0.109c-0.019-0.012-0.035-0.027-0.053-0.039L61.817 23.5 c-1.072-0.715-2.468-0.715-3.54 0L24.34 46.081c-0.018 0.012-0.034 0.027-0.053 0.039c-0.05 0.035-0.097 0.072-0.144 0.1 c-0.062 0.049-0.123 0.1-0.181 0.152c-0.045 0.039-0.086 0.082-0.128 0.125c-0.056 0.055-0.108 0.113-0.158 0.2 c-0.038 0.045-0.075 0.092-0.11 0.139c-0.047 0.062-0.092 0.127-0.134 0.193c-0.032 0.049-0.062 0.098-0.092 0.1 c-0.039 0.068-0.074 0.139-0.108 0.211c-0.024 0.051-0.05 0.104-0.071 0.156c-0.031 0.076-0.057 0.154-0.082 0.2 c-0.017 0.051-0.035 0.102-0.05 0.154c-0.023 0.088-0.039 0.178-0.056 0.268c-0.008 0.047-0.02 0.092-0.025 0.1 c-0.019 0.137-0.029 0.275-0.029 0.416V71.36c0 0.1 0 0.3 0 0.418c0.006 0 0 0.1 0 0.1 c0.017 0.1 0 0.2 0.1 0.268c0.015 0.1 0 0.1 0.1 0.154c0.025 0.1 0.1 0.2 0.1 0.2 c0.021 0.1 0 0.1 0.1 0.154c0.034 0.1 0.1 0.1 0.1 0.213c0.029 0 0.1 0.1 0.1 0.1 c0.042 0.1 0.1 0.1 0.1 0.193c0.035 0 0.1 0.1 0.1 0.139c0.05 0.1 0.1 0.1 0.2 0.2 c0.042 0 0.1 0.1 0.1 0.125c0.058 0.1 0.1 0.1 0.2 0.152c0.047 0 0.1 0.1 0.1 0.1 c0.019 0 0 0 0.1 0.039L58.277 96.64c0.536 0.4 1.2 0.5 1.8 0.537c0.616 0 1.233-0.18 1.77-0.537 l33.938-22.625c0.018-0.012 0.034-0.027 0.053-0.039c0.05-0.035 0.097-0.072 0.145-0.109c0.062-0.049 0.122-0.1 0.181-0.152 c0.044-0.039 0.085-0.082 0.127-0.125c0.056-0.055 0.108-0.113 0.159-0.172c0.037-0.045 0.074-0.09 0.109-0.139 c0.048-0.062 0.092-0.127 0.135-0.193c0.03-0.049 0.062-0.098 0.091-0.146c0.04-0.07 0.075-0.141 0.108-0.213 c0.024-0.051 0.05-0.102 0.071-0.154c0.031-0.078 0.057-0.156 0.082-0.234c0.017-0.051 0.036-0.102 0.05-0.154 c0.023-0.088 0.04-0.178 0.056-0.268c0.008-0.045 0.02-0.092 0.026-0.137c0.018-0.139 0.028-0.277 0.028-0.418V48.735 C97.176 48.6 97.2 48.5 97.1 48.319z M63.238 32.073l25.001 16.666L77.072 56.21l-13.834-9.254V32.073z M56.856 32.1 v14.883L43.023 56.21l-11.168-7.471L56.856 32.073z M29.301 54.708l7.983 5.34l-7.983 5.34V54.708z M56.856 88.022L31.855 71.4 l11.168-7.469l13.833 9.252V88.022z M60.048 67.597l-11.286-7.549l11.286-7.549l11.285 7.549L60.048 67.597z M63.238 88.022V73.14 l13.834-9.252l11.167 7.469L63.238 88.022z M90.794 65.388l-7.982-5.34l7.982-5.34V65.388z'
		})
	)
);

var _ref3 = (0, _preact.h)(
	'svg',
	null,
	(0, _preact.h)('use', { xlinkHref: '#codepen-logo' })
);

var _ref4 = (0, _preact.h)(
	'svg',
	{ style: 'width:24px;height:24px', viewBox: '0 0 24 24' },
	(0, _preact.h)('path', { d: 'M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z' })
);

var _ref5 = (0, _preact.h)('div', { 'class': 'footer__separator hide-on-mobile' });

var _ref6 = (0, _preact.h)(
	'svg',
	{ viewBox: '0 0 100 100', style: 'transform:rotate(-90deg)' },
	(0, _preact.h)('use', { xlinkHref: '#mode-icon' })
);

var _ref7 = (0, _preact.h)(
	'svg',
	{ viewBox: '0 0 100 100' },
	(0, _preact.h)('use', { xlinkHref: '#mode-icon' })
);

var _ref8 = (0, _preact.h)(
	'svg',
	{ viewBox: '0 0 100 100', style: 'transform:rotate(90deg)' },
	(0, _preact.h)('use', { xlinkHref: '#mode-icon' })
);

var _ref9 = (0, _preact.h)(
	'svg',
	{ viewBox: '0 0 100 100' },
	(0, _preact.h)('use', { xlinkHref: '#vertical-mode-icon' })
);

var _ref10 = (0, _preact.h)(
	'svg',
	{ viewBox: '0 0 100 100' },
	(0, _preact.h)('rect', { x: '0', y: '0', width: '100', height: '100' })
);

var _ref11 = (0, _preact.h)(
	'svg',
	{ viewBox: '0 0 24 24' },
	(0, _preact.h)('path', { d: 'M22,17V7H6V17H22M22,5A2,2 0 0,1 24,7V17C24,18.11 23.1,19 22,19H16V21H18V23H10V21H12V19H6C4.89,19 4,18.11 4,17V7A2,2 0 0,1 6,5H22M2,3V15H0V3A2,2 0 0,1 2,1H20V3H2Z' })
);

var _ref12 = (0, _preact.h)('div', { 'class': 'footer__separator' });

var _ref13 = (0, _preact.h)(
	'svg',
	{ viewBox: '0 0 24 24' },
	(0, _preact.h)('path', { d: 'M14,20A2,2 0 0,1 12,22A2,2 0 0,1 10,20H14M12,2A1,1 0 0,1 13,3V4.08C15.84,4.56 18,7.03 18,10V16L21,19H3L6,16V10C6,7.03 8.16,4.56 11,4.08V3A1,1 0 0,1 12,2Z' })
);

var _ref14 = (0, _preact.h)('span', { 'class': 'notifications-btn__dot' });

var _ref15 = (0, _preact.h)(
	'svg',
	null,
	(0, _preact.h)('use', { xlinkHref: '#settings-icon' })
);

var _ref16 = (0, _preact.h)(
	'a',
	{
		href: 'https://www.ZenUML.com/',
		target: '_blank',
		rel: 'noopener noreferrer'
	},
	(0, _preact.h)('div', { 'class': 'logo' })
);

var _ref17 = (0, _preact.h)(
	'span',
	{ 'class': 'web-maker-with-tag' },
	'ZenUML'
);

var _ref18 = (0, _preact.h)(
	'svg',
	{
		style: 'width:20px; height:20px; vertical-align:text-bottom',
		viewBox: '0 0 24 24'
	},
	(0, _preact.h)('path', { d: 'M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.67 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z' })
);

var _ref19 = (0, _preact.h)('use', { xlinkHref: '#keyboard-icon' });

var _ref20 = (0, _preact.h)('use', { xlinkHref: '#twitter-icon' });

var Footer = function (_Component) {
	_inherits(Footer, _Component);

	function Footer(props) {
		_classCallCheck(this, Footer);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.state = {
			isKeyboardShortcutsModalOpen: false
		};
		return _this;
	}

	Footer.prototype.layoutBtnClickhandler = function layoutBtnClickhandler(layoutId) {
		this.props.layoutBtnClickHandler(layoutId);
	};

	Footer.prototype.render = function render() {
		return (0, _preact.h)(
			'div',
			{ id: 'footer', 'class': 'footer' },
			(0, _preact.h)(
				'div',
				{ 'class': 'footer__right fr' },
				(0, _preact.h)(
					'button',
					{
						onClick: this.props.saveHtmlBtnClickHandler,
						id: 'saveHtmlBtn',
						'class': 'mode-btn  hint--rounded  hint--top-left hide-on-mobile',
						'aria-label': 'Save as HTML file'
					},
					_ref
				),
				_ref2,
				(0, _preact.h)(
					'button',
					{
						onClick: this.props.codepenBtnClickHandler,
						id: 'codepenBtn',
						'class': 'mode-btn  hint--rounded  hint--top-left  hide-on-mobile',
						style: 'display: none',
						'aria-label': 'Edit on CodePen'
					},
					_ref3
				),
				(0, _preact.h)(
					'button',
					{
						id: 'screenshotBtn',
						'class': 'mode-btn  hint--rounded  hint--top-left show-when-extension',
						style: 'display: none',
						onClick: this.props.screenshotBtnClickHandler,
						'aria-label': 'Take screenshot of preview'
					},
					_ref4
				),
				_ref5,
				(0, _preact.h)(
					'button',
					{
						onClick: this.layoutBtnClickhandler.bind(this, 1),
						id: 'layoutBtn1',
						'class': 'mode-btn hide-on-mobile',
						style: 'display: none',
						'aria-label': 'Switch to layout with preview on right'
					},
					_ref6
				),
				(0, _preact.h)(
					'button',
					{
						onClick: this.layoutBtnClickhandler.bind(this, 2),
						id: 'layoutBtn2',
						'class': 'mode-btn hide-on-mobile',
						style: 'display: none',
						'aria-label': 'Switch to layout with preview on bottom'
					},
					_ref7
				),
				(0, _preact.h)(
					'button',
					{
						onClick: this.layoutBtnClickhandler.bind(this, 3),
						id: 'layoutBtn3',
						'class': 'mode-btn hide-on-mobile',
						style: 'display: none',
						'aria-label': 'Switch to layout with preview on left'
					},
					_ref8
				),
				(0, _preact.h)(
					'button',
					{
						onClick: this.layoutBtnClickhandler.bind(this, 5),
						id: 'layoutBtn5',
						'class': 'mode-btn hide-on-mobile',
						style: 'display: none',
						'aria-label': 'Switch to layout with all vertical panes'
					},
					_ref9
				),
				(0, _preact.h)(
					'button',
					{
						onClick: this.layoutBtnClickhandler.bind(this, 4),
						id: 'layoutBtn4',
						'class': 'mode-btn hint--top-left hint--rounded  hide-on-mobile',
						style: 'display: none',
						'aria-label': 'Switch to full screen preview'
					},
					_ref10
				),
				(0, _preact.h)(
					'button',
					{
						'class': 'mode-btn hint--top-left hint--rounded hide-on-mobile',
						'aria-label': 'Detach Preview',
						onClick: this.props.detachedPreviewBtnHandler
					},
					_ref11
				),
				_ref12,
				(0, _preact.h)(
					'button',
					{
						onClick: this.props.notificationsBtnClickHandler,
						id: 'notificationsBtn',
						'class': 'notifications-btn  mode-btn  hint--top-left  hint--rounded ' + (this.props.hasUnseenChangelog ? 'has-new' : ''),
						style: 'display: none',
						'aria-label': 'See Changelog'
					},
					_ref13,
					_ref14
				),
				(0, _preact.h)(
					_common.Button,
					{
						onClick: this.props.settingsBtnClickHandler,
						'data-event-category': 'ui',
						'data-event-action': 'settingsBtnClick',
						'class': 'mode-btn  hint--top-left  hint--rounded',
						'aria-label': 'Settings'
					},
					_ref15
				)
			),
			_ref16,
			'\xA9',
			_ref17,
			' \xA0\xA0',
			(0, _preact.h)(
				_common.Button,
				{
					onClick: this.props.helpBtnClickHandler,
					'data-event-category': 'ui',
					'data-event-action': 'helpButtonClick',
					'class': 'footer__link  hint--rounded  hint--top-right',
					'aria-label': 'Help'
				},
				_ref18
			),
			(0, _preact.h)(
				_common.Button,
				{
					onClick: this.props.keyboardShortcutsBtnClickHandler,
					'data-event-category': 'ui',
					'data-event-action': 'keyboardShortcutButtonClick',
					'class': 'footer__link hint--rounded  hint--top-right hide-on-mobile',
					'aria-label': 'Keyboard shortcuts'
				},
				(0, _preact.h)(
					'svg',
					{
						style: {
							width: '20px',
							height: '20px',
							verticalAlign: 'text-bottom'
						}
					},
					_ref19
				)
			),
			(0, _preact.h)(
				'a',
				{
					'class': 'footer__link  hint--rounded  hint--top-right',
					'aria-label': 'Tweet about \'Web Sequence\'',
					href: 'http://twitter.com/share?url=https://zenuml.com/&text=Web Sequence - A blazing fast %26 offline UML sequence diagram generator! via @ZenUML&related=webmakerApp&hashtags=UML,sequence,playground,offline',
					target: '_blank',
					rel: 'noopener noreferrer'
				},
				(0, _preact.h)(
					'svg',
					{
						style: {
							width: '20px',
							height: '20px',
							verticalAlign: 'text-bottom'
						}
					},
					_ref20
				)
			),
			(0, _preact.h)(
				_common.Button,
				{
					onClick: this.props.supportDeveloperBtnClickHandler,
					'data-event-category': 'ui',
					'data-event-action': 'supportDeveloperFooterBtnClick',
					'class': 'footer__link  ml-1  hint--rounded  hint--top-right hide-on-mobile support-link',
					style: 'display:none',
					'aria-label': 'Support the developer by pledging some amount'
				},
				'Support the developer'
			)
		);
	};

	return Footer;
}(_preact.Component);

exports.default = Footer;

/***/ }),

/***/ "Mo6r":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var hideTimeout;

function addNotification(msg) {
	var noticationContainerEL = $('#js-alerts-container');

	// var n = document.createElement('div');
	// div.textContent = msg;
	// noticationContainerEL.appendChild(n);
	noticationContainerEL.textContent = msg;
	noticationContainerEL.classList.add('is-active');

	clearTimeout(hideTimeout);
	hideTimeout = setTimeout(function () {
		noticationContainerEL.classList.remove('is-active');
	}, 2000);
}

var alertsService = exports.alertsService = {
	add: addNotification
};
window.alertsService = alertsService;

/***/ }),

/***/ "Q8fL":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = undefined;

var _preact = __webpack_require__("KM04");

var _editorThemes = __webpack_require__("kL0g");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function CheckboxSetting(_ref) {
	var title = _ref.title,
	    label = _ref.label,
	    onChange = _ref.onChange,
	    pref = _ref.pref,
	    name = _ref.name,
	    showWhenExtension = _ref.showWhenExtension;

	return (0, _preact.h)(
		'label',
		{
			'class': 'line ' + (showWhenExtension ? 'show-when-extension' : '') + ' ',
			title: title
		},
		(0, _preact.h)('input', {
			type: 'checkbox',
			checked: pref,
			onChange: onChange,
			'data-setting': name
		}),
		' ',
		label
	);
}

var _ref2 = (0, _preact.h)(
	'h1',
	null,
	'Settings'
);

var _ref3 = (0, _preact.h)(
	'h3',
	null,
	'Indentation'
);

var _ref4 = (0, _preact.h)(
	'datalist',
	{ id: 'indentationSizeList' },
	(0, _preact.h)(
		'option',
		null,
		'1'
	),
	(0, _preact.h)(
		'option',
		null,
		'2'
	),
	(0, _preact.h)(
		'option',
		null,
		'3'
	),
	(0, _preact.h)(
		'option',
		null,
		'4'
	),
	(0, _preact.h)(
		'option',
		null,
		'5'
	),
	(0, _preact.h)(
		'option',
		null,
		'6'
	),
	(0, _preact.h)(
		'option',
		null,
		'7'
	)
);

var _ref5 = (0, _preact.h)('hr', null);

var _ref6 = (0, _preact.h)(
	'h3',
	null,
	'Editor'
);

var _ref7 = (0, _preact.h)(
	'label',
	{ 'class': 'line' },
	'Default Preprocessors'
);

var _ref8 = (0, _preact.h)(
	'option',
	{ value: 'html' },
	'HTML'
);

var _ref9 = (0, _preact.h)(
	'option',
	{ value: 'markdown' },
	'Markdown'
);

var _ref10 = (0, _preact.h)(
	'option',
	{ value: 'jade' },
	'Pug'
);

var _ref11 = (0, _preact.h)(
	'option',
	{ value: 'css' },
	'CSS'
);

var _ref12 = (0, _preact.h)(
	'option',
	{ value: 'scss' },
	'SCSS'
);

var _ref13 = (0, _preact.h)(
	'option',
	{ value: 'sass' },
	'SASS'
);

var _ref14 = (0, _preact.h)(
	'option',
	{ value: 'less' },
	'LESS'
);

var _ref15 = (0, _preact.h)(
	'option',
	{ value: 'stylus' },
	'Stylus'
);

var _ref16 = (0, _preact.h)(
	'option',
	{ value: 'acss' },
	'Atomic CSS'
);

var _ref17 = (0, _preact.h)(
	'option',
	{ value: 'js' },
	'JS'
);

var _ref18 = (0, _preact.h)(
	'option',
	{ value: 'coffee' },
	'CoffeeScript'
);

var _ref19 = (0, _preact.h)(
	'option',
	{ value: 'es6' },
	'ES6 (Babel)'
);

var _ref20 = (0, _preact.h)(
	'option',
	{ value: 'typescript' },
	'TypeScript'
);

var _ref21 = (0, _preact.h)(
	'option',
	{ value: 'FiraCode' },
	'Fira Code'
);

var _ref22 = (0, _preact.h)(
	'option',
	{ value: 'Inconsolata' },
	'Inconsolata'
);

var _ref23 = (0, _preact.h)(
	'option',
	{ value: 'Monoid' },
	'Monoid'
);

var _ref24 = (0, _preact.h)(
	'option',
	{ value: 'FixedSys' },
	'FixedSys'
);

var _ref25 = (0, _preact.h)(
	'option',
	{ disabled: 'disabled' },
	'----'
);

var _ref26 = (0, _preact.h)(
	'option',
	{ value: 'other' },
	'Other font from system'
);

var _ref27 = (0, _preact.h)('hr', null);

var _ref28 = (0, _preact.h)(
	'h3',
	null,
	'Fun'
);

var _ref29 = (0, _preact.h)('hr', null);

var _ref30 = (0, _preact.h)(
	'h3',
	null,
	'Advanced'
);

var _ref31 = (0, _preact.h)(
	'div',
	{ 'class': 'help-text' },
	'If any loop iteration takes more than the defined time, it is detected as a potential infinite loop and further iterations are stopped.'
);

var Settings = function (_Component) {
	_inherits(Settings, _Component);

	function Settings() {
		_classCallCheck(this, Settings);

		return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	Settings.prototype.updateSetting = function updateSetting(e) {
		this.props.onChange(e);
	};

	Settings.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
		// TODO: add check on prefs
		return true;
	};

	Settings.prototype.render = function render() {
		return (0, _preact.h)(
			'div',
			null,
			_ref2,
			_ref3,
			(0, _preact.h)(
				'div',
				{
					'class': 'line',
					title: 'I know this is tough, but you have to decide one!'
				},
				(0, _preact.h)(
					'label',
					null,
					(0, _preact.h)('input', {
						type: 'radio',
						name: 'indentation',
						value: 'spaces',
						checked: this.props.prefs.indentation === 'spaces',
						onChange: this.updateSetting.bind(this),
						'data-setting': 'indentWith'
					}),
					' ',
					'Spaces'
				),
				(0, _preact.h)(
					'label',
					{ 'class': 'ml-1' },
					(0, _preact.h)('input', {
						type: 'radio',
						name: 'indentation',
						value: 'tabs',
						checked: this.props.prefs.indentation === 'tabs',
						onChange: this.updateSetting.bind(this),
						'data-setting': 'indentWith'
					}),
					' ',
					'Tabs'
				)
			),
			(0, _preact.h)(
				'label',
				{ 'class': 'line', title: '' },
				'Indentation Size',
				' ',
				(0, _preact.h)('input', {
					type: 'range',
					'class': 'va-m ml-1',
					value: this.props.prefs.indentSize,
					min: '1',
					max: '7',
					list: 'indentationSizeList',
					'data-setting': 'indentSize',
					onChange: this.updateSetting.bind(this)
				}),
				(0, _preact.h)(
					'span',
					{ id: 'indentationSizeValueEl' },
					this.props.prefs.indentSize
				),
				_ref4
			),
			_ref5,
			_ref6,
			(0, _preact.h)(
				'div',
				{ 'class': 'flex block--mobile' },
				(0, _preact.h)(
					'div',
					null,
					_ref7,
					(0, _preact.h)(
						'div',
						{ 'class': 'flex line' },
						(0, _preact.h)(
							'select',
							{
								style: 'flex:1;margin-left:20px',
								'data-setting': 'htmlMode',
								value: this.props.prefs.htmlMode,
								onChange: this.updateSetting.bind(this)
							},
							_ref8,
							_ref9,
							_ref10
						),
						(0, _preact.h)(
							'select',
							{
								style: 'flex:1;margin-left:20px',
								'data-setting': 'cssMode',
								value: this.props.prefs.cssMode,
								onChange: this.updateSetting.bind(this)
							},
							_ref11,
							_ref12,
							_ref13,
							_ref14,
							_ref15,
							_ref16
						),
						(0, _preact.h)(
							'select',
							{
								style: 'flex:1;margin-left:20px',
								'data-setting': 'jsMode',
								value: this.props.prefs.jsMode,
								onChange: this.updateSetting.bind(this)
							},
							_ref17,
							_ref18,
							_ref19,
							_ref20
						)
					),
					(0, _preact.h)(
						'label',
						{ 'class': 'line' },
						'Theme',
						(0, _preact.h)(
							'select',
							{
								style: 'flex:1;margin:0 20px',
								'data-setting': 'editorTheme',
								value: this.props.prefs.editorTheme,
								onChange: this.updateSetting.bind(this)
							},
							_editorThemes.editorThemes.map(function (theme) {
								return (0, _preact.h)(
									'option',
									{ value: theme },
									theme
								);
							})
						)
					),
					(0, _preact.h)(
						'label',
						{ 'class': 'line' },
						'Font',
						(0, _preact.h)(
							'select',
							{
								style: 'flex:1;margin:0 20px',
								'data-setting': 'editorFont',
								value: this.props.prefs.editorFont,
								onChange: this.updateSetting.bind(this)
							},
							_ref21,
							_ref22,
							_ref23,
							_ref24,
							_ref25,
							_ref26
						),
						this.props.prefs.editorFont === 'other' && (0, _preact.h)('input', {
							id: 'customEditorFontInput',
							type: 'text',
							value: this.props.prefs.editorCustomFont,
							placeholder: 'Custom font name here',
							'data-setting': 'editorCustomFont',
							onChange: this.updateSetting.bind(this)
						})
					),
					(0, _preact.h)(
						'label',
						{ 'class': 'line' },
						'Font Size',
						' ',
						(0, _preact.h)('input', {
							style: 'width:70px',
							type: 'number',
							value: this.props.prefs.fontSize,
							'data-setting': 'fontSize',
							onChange: this.updateSetting.bind(this)
						}),
						' ',
						'px'
					),
					(0, _preact.h)(
						'div',
						{ 'class': 'line' },
						'Key bindings',
						(0, _preact.h)(
							'label',
							{ 'class': 'ml-1' },
							(0, _preact.h)('input', {
								type: 'radio',
								name: 'keymap',
								value: 'sublime',
								checked: this.props.prefs.keymap === 'sublime',
								'data-setting': 'keymap',
								onChange: this.updateSetting.bind(this)
							}),
							' ',
							'Sublime'
						),
						(0, _preact.h)(
							'label',
							{ 'class': 'ml-1' },
							(0, _preact.h)('input', {
								type: 'radio',
								name: 'keymap',
								value: 'vim',
								checked: this.props.prefs.keymap === 'vim',
								'data-setting': 'keymap',
								onChange: this.updateSetting.bind(this)
							}),
							' ',
							'Vim'
						)
					)
				),
				(0, _preact.h)(
					'div',
					{ 'class': 'ml-2 ml-0--mobile' },
					(0, _preact.h)(CheckboxSetting, {
						name: 'lineWrap',
						title: 'Toggle wrapping of long sentences onto new line',
						label: 'Line wrap',
						pref: this.props.prefs.lineWrap,
						onChange: this.updateSetting.bind(this)
					}),
					(0, _preact.h)(CheckboxSetting, {
						name: 'refreshOnResize',
						title: 'Your Preview will refresh when you resize the preview split',
						label: 'Refresh preview on resize',
						pref: this.props.prefs.refreshOnResize,
						onChange: this.updateSetting.bind(this)
					}),
					(0, _preact.h)(CheckboxSetting, {
						name: 'autoComplete',
						title: 'Turns on the auto-completion suggestions as you type',
						label: 'Auto-complete suggestions',
						pref: this.props.prefs.autoComplete,
						onChange: this.updateSetting.bind(this)
					}),
					(0, _preact.h)(CheckboxSetting, {
						name: 'autoPreview',
						title: 'Refreshes the preview as you code. Otherwise use the Run button',
						label: 'Auto-preview',
						pref: this.props.prefs.autoPreview,
						onChange: this.updateSetting.bind(this)
					}),
					(0, _preact.h)(CheckboxSetting, {
						name: 'autoSave',
						title: 'Auto-save keeps saving your code at regular intervals after you hit the first save manually',
						label: 'Auto-save',
						pref: this.props.prefs.autoSave,
						onChange: this.updateSetting.bind(this)
					}),
					(0, _preact.h)(CheckboxSetting, {
						name: 'preserveLastCode',
						title: 'Loads the last open creation when app starts',
						label: 'Preserve last written code',
						pref: this.props.prefs.preserveLastCode,
						onChange: this.updateSetting.bind(this)
					}),
					(0, _preact.h)(CheckboxSetting, {
						name: 'replaceNewTab',
						title: 'Turning this on will start showing Web Maker in every new tab you open',
						label: 'Replace new tab page',
						pref: this.props.prefs.replaceNewTab,
						onChange: this.updateSetting.bind(this),
						showWhenExtension: true
					}),
					(0, _preact.h)(CheckboxSetting, {
						name: 'preserveConsoleLogs',
						title: 'Preserves the console logs across your preview refreshes',
						label: 'Preserve console logs',
						pref: this.props.prefs.preserveConsoleLogs,
						onChange: this.updateSetting.bind(this)
					}),
					(0, _preact.h)(CheckboxSetting, {
						name: 'lightVersion',
						title: 'Switch to lighter version for better performance. Removes things like blur etc.',
						label: 'Fast/light version',
						pref: this.props.prefs.lightVersion,
						onChange: this.updateSetting.bind(this)
					})
				)
			),
			_ref27,
			_ref28,
			(0, _preact.h)(
				'p',
				null,
				(0, _preact.h)(CheckboxSetting, {
					title: 'Enjoy wonderful particle blasts while you type',
					label: 'Code blast!',
					name: 'isCodeBlastOn',
					pref: this.props.prefs.isCodeBlastOn,
					onChange: this.updateSetting.bind(this)
				})
			),
			_ref29,
			_ref30,
			(0, _preact.h)(
				'p',
				null,
				(0, _preact.h)(
					'label',
					{
						'class': 'line',
						title: 'This timeout is used to indentify a possible infinite loop and prevent it.'
					},
					'Maximum time allowed in a loop iteration',
					(0, _preact.h)('input', {
						type: 'number',
						value: this.props.prefs.infiniteLoopTimeout,
						'data-setting': 'infiniteLoopTimeout',
						onChange: this.updateSetting.bind(this)
					}),
					' ',
					'ms'
				),
				_ref31
			)
		);
	};

	return Settings;
}(_preact.Component);

exports.default = Settings;

/***/ }),

/***/ "UzHC":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.SupportDeveloperModal = SupportDeveloperModal;

var _preact = __webpack_require__("KM04");

var _Modal = __webpack_require__("inAt");

var _Modal2 = _interopRequireDefault(_Modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref2 = (0, _preact.h)(
	'div',
	{ 'class': 'tac' },
	(0, _preact.h)(
		'h1',
		null,
		'Welcome!'
	),
	(0, _preact.h)(
		'div',
		{ 'class': 'flex', style: 'margin-top: 100px;' },
		(0, _preact.h)(
			'div',
			{ 'class': 'onboard-step' },
			(0, _preact.h)('img', { src: './animation/10s.gif', alt: 'Middleman logo' })
		)
	)
);

function SupportDeveloperModal(_ref) {
	var show = _ref.show,
	    closeHandler = _ref.closeHandler;

	return (0, _preact.h)(
		_Modal2.default,
		{ extraClasses: 'pledge-modal', show: show, closeHandler: closeHandler },
		_ref2
	);
}

/***/ }),

/***/ "VB7N":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = undefined;

var _preact = __webpack_require__("KM04");

var _analytics = __webpack_require__("qV3Q");

var _auth = __webpack_require__("jHnz");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ref = (0, _preact.h)(
	'h2',
	null,
	'Login / Signup'
);

var _ref2 = (0, _preact.h)(
	'svg',
	null,
	(0, _preact.h)('use', { xlinkHref: '#github-icon' })
);

var _ref3 = (0, _preact.h)(
	'svg',
	null,
	(0, _preact.h)('use', { xlinkHref: '#google-icon' })
);

var _ref4 = (0, _preact.h)(
	'svg',
	null,
	(0, _preact.h)('use', { xlinkHref: '#fb-icon' })
);

var _ref5 = (0, _preact.h)(
	'p',
	null,
	'Join a community of 50,000+ Developers'
);

var Login = function (_Component) {
	_inherits(Login, _Component);

	function Login() {
		_classCallCheck(this, Login);

		return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	Login.prototype.login = function login(e) {
		var provider = e.target.dataset.authProvider;
		(0, _analytics.trackEvent)('ui', 'loginProviderClick', provider);
		_auth.auth.login(provider);
	};

	Login.prototype.componentDidMount = function componentDidMount() {
		window.db.local.get({
			lastAuthProvider: ''
		}, function (result) {
			if (result.lastAuthProvider) {
				document.body.classList.add('last-login-' + result.lastAuthProvider);
			}
		});
	};

	Login.prototype.render = function render() {
		return (0, _preact.h)(
			'div',
			null,
			_ref,
			(0, _preact.h)(
				'div',
				null,
				(0, _preact.h)(
					'p',
					null,
					(0, _preact.h)(
						'button',
						{
							type: 'button',
							onClick: this.login.bind(this),
							'class': 'social-login-btn social-login-btn--github  btn btn-icon btn--big full-width hint--right hint--always',
							'data-auth-provider': 'github',
							'data-hint': 'You logged in with Github last time'
						},
						_ref2,
						'Login with Github'
					)
				),
				(0, _preact.h)(
					'p',
					null,
					(0, _preact.h)(
						'button',
						{
							type: 'button',
							onClick: this.login.bind(this),
							'class': 'social-login-btn social-login-btn--google  btn btn-icon btn--big full-width hint--right hint--always',
							'data-auth-provider': 'google',
							'data-hint': 'You logged in with Google last time'
						},
						_ref3,
						'Login with Google'
					)
				),
				(0, _preact.h)(
					'p',
					{ 'class': 'mb-2' },
					(0, _preact.h)(
						'button',
						{
							type: 'button',
							onClick: this.login.bind(this),
							'class': 'social-login-btn social-login-btn--facebook  btn btn-icon btn--big full-width hint--right hint--always',
							'data-auth-provider': 'facebook',
							'data-hint': 'You logged in with Facebook last time'
						},
						_ref4,
						'Login with Facebook'
					)
				),
				_ref5
			)
		);
	};

	return Login;
}(_preact.Component);

exports.default = Login;

/***/ }),

/***/ "W5Uw":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.OnboardingModal = OnboardingModal;

var _preact = __webpack_require__("KM04");

var _Modal = __webpack_require__("inAt");

var _Modal2 = _interopRequireDefault(_Modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref = (0, _preact.h)(
	'div',
	{ 'class': 'tac' },
	(0, _preact.h)(
		'h1',
		{ style: 'margin-top:20px' },
		'Welcome to Web Sequence'
	)
);

var _ref2 = (0, _preact.h)(
	'div',
	{ 'class': 'flex', style: 'margin-top: 100px;' },
	(0, _preact.h)(
		'div',
		{ 'class': 'onboard-step' },
		(0, _preact.h)('img', { src: './animation/10s.gif', alt: 'Middleman logo' })
	)
);

function OnboardingModal(props) {
	return (0, _preact.h)(
		_Modal2.default,
		{ show: props.show, closeHandler: props.closeHandler },
		_ref,
		_ref2
	);
}

/***/ }),

/***/ "YWKo":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.SplitPane = undefined;

var _preact = __webpack_require__("KM04");

var _split = __webpack_require__("mSND");

var _split2 = _interopRequireDefault(_split);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SplitPane = exports.SplitPane = function (_Component) {
	_inherits(SplitPane, _Component);

	function SplitPane() {
		_classCallCheck(this, SplitPane);

		return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	// shouldComponentUpdate(nextProps, nextState) {
	// 	return (
	// 		nextProps.direction !== this.props.direction ||
	// 		nextProps.sizes.join('') !== this.props.sizes.join('')
	// 	);
	// }
	SplitPane.prototype.componentDidMount = function componentDidMount() {
		this.updateSplit();
	};

	SplitPane.prototype.componentWillUpdate = function componentWillUpdate() {
		if (this.splitInstance) {
			this.splitInstance.destroy();
		}
	};

	SplitPane.prototype.componentDidUpdate = function componentDidUpdate() {
		this.updateSplit();
	};

	SplitPane.prototype.updateSplit = function updateSplit() {
		var options = {
			direction: this.props.direction,
			minSize: this.props.minSize,
			gutterSize: 6,
			sizes: this.props.sizes
		};
		if (this.props.onDragEnd) {
			options.onDragEnd = this.props.onDragEnd;
		}
		if (this.props.onDragStart) {
			options.onDragStart = this.props.onDragStart;
		}

		/* eslint-disable new-cap */
		this.splitInstance = (0, _split2.default)(this.props.children.map(function (node) {
			return '#' + node.attributes.id;
		}), options);
		/* eslint-enable new-cap */

		if (this.props.onSplit) {
			this.props.onSplit(this.splitInstance);
		}
	};

	SplitPane.prototype.render = function render() {
		/* eslint-disable no-unused-vars */
		var _props = this.props,
		    children = _props.children,
		    props = _objectWithoutProperties(_props, ['children']);
		/* eslint-enable no-unused-vars */

		return (0, _preact.h)(
			'div',
			props,
			this.props.children
		);
	};

	return SplitPane;
}(_preact.Component);

/***/ }),

/***/ "Zox/":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.takeScreenshot = takeScreenshot;

var _utils = __webpack_require__("6Ptt");

var _analytics = __webpack_require__("qV3Q");

function saveScreenshot(dataURI) {
	// convert base64 to raw binary data held in a string
	// doesn't handle URLEncoded DataURIs
	var byteString = atob(dataURI.split(',')[1]);

	// separate out the mime component
	var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

	// write the bytes of the string to an ArrayBuffer
	var ab = new ArrayBuffer(byteString.length);
	var ia = new Uint8Array(ab);
	for (var i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}

	// create a blob for writing to a file
	var blob = new Blob([ab], {
		type: mimeString
	});
	var size = blob.size + 1024 / 2;

	var d = new Date();
	var fileName = ['web-maker-screenshot', d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()].join('-');
	fileName += '.png';

	function onWriteEnd() {
		var filePath = 'filesystem:chrome-extension://' + chrome.i18n.getMessage('@@extension_id') + '/temporary/' + fileName;

		chrome.downloads.download({
			url: filePath
		}, function () {
			// If there was an error, just open the screenshot in a tab.
			// This happens in incognito mode where extension cannot access filesystem.
			if (chrome.runtime.lastError) {
				window.open(filePath);
			}
		});
	}

	function errorHandler(e) {
		(0, _utils.log)(e);
	}

	// create a blob for writing to a file
	window.webkitRequestFileSystem(window.TEMPORARY, size, function (fs) {
		fs.root.getFile(fileName, {
			create: true
		}, function (fileEntry) {
			fileEntry.createWriter(function (fileWriter) {
				fileWriter.onwriteend = onWriteEnd;
				fileWriter.write(blob);
			}, errorHandler);
		}, errorHandler);
	}, errorHandler);
}

function takeScreenshot(boundRect) {
	(0, _utils.handleDownloadsPermission)().then(function () {
		// Hide tooltips so that they don't show in the screenshot
		var s = document.createElement('style');
		s.textContent = '[class*="hint"]:after, [class*="hint"]:before { display: none!important; }';
		document.body.appendChild(s);

		function onImgLoad(image) {
			var c = document.createElement('canvas');
			var iframeBounds = boundRect;
			c.width = iframeBounds.width;
			c.height = iframeBounds.height;
			var ctx = c.getContext('2d');
			var devicePixelRatio = window.devicePixelRatio || 1;

			ctx.drawImage(image, iframeBounds.left * devicePixelRatio, iframeBounds.top * devicePixelRatio, iframeBounds.width * devicePixelRatio, iframeBounds.height * devicePixelRatio, 0, 0, iframeBounds.width, iframeBounds.height);
			image.removeEventListener('load', onImgLoad);
			saveScreenshot(c.toDataURL());
		}

		setTimeout(function () {
			chrome.tabs.captureVisibleTab(null, {
				format: 'png',
				quality: 100
			}, function (dataURI) {
				s.remove();
				if (dataURI) {
					var image = new Image();
					image.src = dataURI;
					image.addEventListener('load', function () {
						return onImgLoad(image, dataURI);
					});
				}
			});
		}, 50);

		(0, _analytics.trackEvent)('ui', 'takeScreenshotBtnClick');
	});
}

/***/ }),

/***/ "bjFU":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.itemService = undefined;

var _deferred = __webpack_require__("3Z4F");

var _util = __webpack_require__("gfUn");

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var itemService = exports.itemService = {
	getItem: function () {
		var _ref = _asyncToGenerator(function* (id) {
			var remoteDb = yield window.db.getDb();
			return remoteDb.doc('items/' + id).get().then(function (doc) {
				return doc.data();
			});
		});

		function getItem(_x) {
			return _ref.apply(this, arguments);
		}

		return getItem;
	}(),
	getUserItemIds: function () {
		var _ref2 = _asyncToGenerator(function* () {
			if (window.user) {
				return new Promise(function (resolve) {
					resolve(window.user.items || {});
				});
			}
			var remoteDb = yield window.db.getDb();
			return remoteDb.doc('users/' + window.user.uid).get().then(function (doc) {
				if (!doc.exists) {
					return {};
				}
				return doc.data().items;
			});
		});

		function getUserItemIds() {
			return _ref2.apply(this, arguments);
		}

		return getUserItemIds;
	}(),
	getAllItems: function () {
		var _ref3 = _asyncToGenerator(function* () {
			var t = Date.now();
			var d = (0, _deferred.deferred)();
			var itemIds = yield this.getUserItemIds();
			itemIds = Object.getOwnPropertyNames(itemIds || {});
			(0, _util.log)('itemids', itemIds);

			if (!itemIds.length) {
				d.resolve([]);
			}
			var remoteDb = yield window.db.getDb();
			var items = [];
			remoteDb.collection('items').where('createdBy', '==', window.user.uid).onSnapshot(function (querySnapshot) {
				querySnapshot.forEach(function (doc) {
					items.push(doc.data());
				});
				(0, _util.log)('Items fetched in ', Date.now() - t, 'ms');

				d.resolve(items);
			}, function () {
				d.resolve([]);
			});
			return d.promise;
		});

		function getAllItems() {
			return _ref3.apply(this, arguments);
		}

		return getAllItems;
	}(),
	setUser: function () {
		var _ref4 = _asyncToGenerator(function* () {
			var remoteDb = yield window.db.getDb();
			return remoteDb.doc('users/' + window.user.uid).set({
				items: {}
			});
		});

		function setUser() {
			return _ref4.apply(this, arguments);
		}

		return setUser;
	}(),
	setItem: function () {
		var _ref5 = _asyncToGenerator(function* (id, item) {
			var _obj;

			var d = (0, _deferred.deferred)();
			var remotePromise;
			// TODO: check why we need to save locally always?
			var obj = (_obj = {}, _obj[id] = item, _obj);
			db.local.set(obj, function () {
				// Is extension OR is app but logged out OR is logged in but offline
				// If logged in but offline, resolve immediately so
				// that you see the feedback msg immediately and not wait for
				// later sync.
				if (window.IS_EXTENSION || !window.user || !navigator.onLine) {
					d.resolve();
				}
			});

			// If `id` is `code`, this is a call on unloadbefore to save the last open thing.
			// Do not presist that on remote.
			if (id === 'code') {
				// No deferred required here as this gets called on unloadbefore
				return false;
			}
			if (window.user) {
				var remoteDb = yield window.db.getDb();
				(0, _util.log)('Starting to save item ' + id);
				item.createdBy = window.user.uid;
				remotePromise = remoteDb.collection('items').doc(id).set(item, {
					merge: true
				}).then(function (arg) {
					(0, _util.log)('Document written', arg);
					d.resolve();
				}).catch(d.reject);
			}

			return window.user && navigator.onLine ? remotePromise : d.promise;
		});

		function setItem(_x2, _x3) {
			return _ref5.apply(this, arguments);
		}

		return setItem;
	}(),


	/**
  * Saves the passed items in the database.
  * @param {Array} items to be saved in DB
  */
	saveItems: function saveItems(items) {
		var d = (0, _deferred.deferred)();
		// When not logged in
		if (!window.user) {
			// save new items
			window.db.local.set(items, d.resolve);
			// Push in new item IDs
			window.db.local.get({
				items: {}
			}, function (result) {
				/* eslint-disable guard-for-in */
				for (var id in items) {
					result.items[id] = true;
				}
				window.db.local.set({
					items: result.items
				});
				/* eslint-enable guard-for-in */
			});
		} else {
			window.db.getDb().then(function (remoteDb) {
				var batch = remoteDb.batch();
				/* eslint-disable guard-for-in */
				for (var id in items) {
					var _batch$update;

					items[id].createdBy = window.user.uid;
					batch.set(remoteDb.doc('items/' + id), items[id]);
					batch.update(remoteDb.doc('users/' + window.user.uid), (_batch$update = {}, _batch$update['items.' + id] = true, _batch$update));
					// Set these items on our cached user object too
					window.user.items = window.user.items || {};
					window.user.items[id] = true;
				}
				batch.commit().then(d.resolve);
				/* eslint-enable guard-for-in */
			});
		}
		return d.promise;
	},
	removeItem: function () {
		var _ref6 = _asyncToGenerator(function* (id) {
			// When not logged in
			if (!window.user) {
				var d = (0, _deferred.deferred)();
				window.db.local.remove(id, d.resolve);
				return d.promise;
			}
			var remoteDb = yield window.db.getDb();
			(0, _util.log)('Starting to save item ' + id);
			return remoteDb.collection('items').doc(id).delete().then(function (arg) {
				(0, _util.log)('Document removed', arg);
			}).catch(function (error) {
				return (0, _util.log)(error);
			});
		});

		function removeItem(_x4) {
			return _ref6.apply(this, arguments);
		}

		return removeItem;
	}(),
	setItemForUser: function () {
		var _ref7 = _asyncToGenerator(function* (itemId) {
			var _remoteDb$collection$;

			// When not logged in
			if (!window.user) {
				return window.db.local.get({
					items: {}
				}, function (result) {
					result.items[itemId] = true;
					window.db.local.set({
						items: result.items
					});
				});
			}
			var remoteDb = yield window.db.getDb();
			return remoteDb.collection('users').doc(window.user.uid).update((_remoteDb$collection$ = {}, _remoteDb$collection$['items.' + itemId] = true, _remoteDb$collection$)).then(function (arg) {
				(0, _util.log)('Item ' + itemId + ' set for user', arg);
				window.user.items = window.user.items || {};
				window.user.items[itemId] = true;
			}).catch(function (error) {
				return (0, _util.log)(error);
			});
		});

		function setItemForUser(_x5) {
			return _ref7.apply(this, arguments);
		}

		return setItemForUser;
	}(),
	unsetItemForUser: function () {
		var _ref8 = _asyncToGenerator(function* (itemId) {
			var _remoteDb$collection$2;

			// When not logged in
			if (!window.user) {
				return window.db.local.get({
					items: {}
				}, function (result) {
					delete result.items[itemId];
					window.db.local.set({
						items: result.items
					});
				});
			}
			var remoteDb = yield window.db.getDb();
			return remoteDb.collection('users').doc(window.user.uid).update((_remoteDb$collection$2 = {}, _remoteDb$collection$2['items.' + itemId] = firebase.firestore.FieldValue.delete(), _remoteDb$collection$2)).then(function (arg) {
				delete window.user.items[itemId];
				(0, _util.log)('Item ' + itemId + ' unset for user', arg);
			}).catch(function (error) {
				return (0, _util.log)(error);
			});
		});

		function unsetItemForUser(_x6) {
			return _ref8.apply(this, arguments);
		}

		return unsetItemForUser;
	}()
};

/***/ }),

/***/ "c/up":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _codemirror = __webpack_require__("tQq4");

var _codemirror2 = _interopRequireDefault(_codemirror);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Make CodeMirror available globally so the modes' can register themselves.
window.CodeMirror = _codemirror2.default; // Most of the code from this file comes from:
// https://github.com/codemirror/CodeMirror/blob/master/addon/mode/loadmode.js


if (!_codemirror2.default.modeURL) _codemirror2.default.modeURL = 'lib/codemirror/mode/%N/%N.js';

var loading = {};

function splitCallback(cont, n) {
	var countDown = n;
	return function () {
		if (--countDown === 0) cont();
	};
}

function ensureDeps(mode, cont) {
	var deps = _codemirror2.default.modes[mode].dependencies;
	if (!deps) return cont();
	var missing = [];
	for (var i = 0; i < deps.length; ++i) {
		if (!_codemirror2.default.modes.hasOwnProperty(deps[i])) missing.push(deps[i]);
	}
	if (!missing.length) return cont();
	var split = splitCallback(cont, missing.length);
	for (i = 0; i < missing.length; ++i) {
		_codemirror2.default.requireMode(missing[i], split);
	}
}

_codemirror2.default.requireMode = function (mode, cont) {
	if (typeof mode !== 'string') mode = mode.name;
	if (_codemirror2.default.modes.hasOwnProperty(mode)) return ensureDeps(mode, cont);
	if (loading.hasOwnProperty(mode)) return loading[mode].push(cont);

	var file = _codemirror2.default.modeURL.replace(/%N/g, mode);

	var script = document.createElement('script');
	script.src = file;
	var others = document.getElementsByTagName('script')[0];
	var list = loading[mode] = [cont];

	_codemirror2.default.on(script, 'load', function () {
		ensureDeps(mode, function () {
			for (var i = 0; i < list.length; ++i) {
				list[i]();
			}
		});
	});

	others.parentNode.insertBefore(script, others);
};

_codemirror2.default.autoLoadMode = function (instance, mode) {
	if (_codemirror2.default.modes.hasOwnProperty(mode)) return;

	_codemirror2.default.requireMode(mode, function () {
		instance.setOption('mode', instance.getOption('mode'));
	});
};

exports.default = _codemirror2.default;

/***/ }),

/***/ "eNb1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var jsLibs = exports.jsLibs = [{
	url: 'https://code.jquery.com/jquery-3.2.1.min.js',
	label: 'jQuery',
	type: 'js'
}, {
	url: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
	label: 'Bootstrap 3',
	type: 'js'
}, {
	url: 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js',
	label: 'Bootstrap 4',
	type: 'js'
}, {
	url: 'https://cdnjs.cloudflare.com/ajax/libs/foundation/6.4.3/js/foundation.min.js',
	label: 'Foundation',
	type: 'js'
}, {
	url: 'https://semantic-ui.com/dist/semantic.min.js',
	label: 'Semantic UI',
	type: 'js'
}, {
	url: 'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.5/angular.min.js',
	label: 'Angular',
	type: 'js'
}, {
	url: 'https://cdnjs.cloudflare.com/ajax/libs/react/16.2.0/umd/react.production.min.js',
	label: 'React',
	type: 'js'
}, {
	url: 'https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.2.0/umd/react-dom.production.min.js',
	label: 'React DOM',
	type: 'js'
}, {
	url: 'https://unpkg.com/vue/dist/vue.min.js',
	label: 'Vue.js',
	type: 'js'
}, {
	url: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/89/three.min.js',
	label: 'Three.js',
	type: 'js'
}, {
	url: 'https://cdnjs.cloudflare.com/ajax/libs/d3/4.13.0/d3.min.js',
	label: 'D3',
	type: 'js'
}, {
	url: 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js',
	label: 'Underscore',
	type: 'js'
}, {
	url: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.3/TweenMax.min.js',
	label: 'Greensock TweenMax',
	type: 'js'
}, {
	url: 'https://cdnjs.cloudflare.com/ajax/libs/uikit/2.27.5/js/uikit.min.js',
	label: 'UIkit 2',
	type: 'js'
}, {
	url: 'https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-beta.42/js/uikit.min.js',
	label: 'UIkit 3',
	type: 'js'
}, {
	url: 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/p5.min.js',
	label: 'p5.js',
	type: 'js'
}, {
	url: 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/addons/p5.dom.min.js',
	label: 'p5.js DOM',
	type: 'js'
}, {
	url: 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/addons/p5.sound.min.js',
	label: 'p5.js Sound',
	type: 'js'
}];
var cssLibs = exports.cssLibs = [{
	url: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
	label: 'Bootstrap 3',
	type: 'css'
}, {
	url: 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css',
	label: 'Bootstrap 4',
	type: 'css'
}, {
	url: 'https://cdnjs.cloudflare.com/ajax/libs/foundation/6.4.3/css/foundation.min.css',
	label: 'Foundation',
	type: 'css'
}, {
	url: 'https://semantic-ui.com/dist/semantic.min.css',
	label: 'Semantic UI',
	type: 'css'
}, {
	url: 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css',
	label: 'Bulma',
	type: 'css'
}, {
	url: 'https://cdnjs.cloudflare.com/ajax/libs/hint.css/2.5.0/hint.min.css',
	label: 'Hint.css',
	type: 'css'
}, {
	url: 'https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css',
	label: 'Tailwind.css',
	type: 'css'
}, {
	url: 'https://cdnjs.cloudflare.com/ajax/libs/uikit/2.27.5/css/uikit.min.css',
	label: 'UIkit 2',
	type: 'css'
}, {
	url: 'https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-beta.42/css/uikit.min.css',
	label: 'UIkit 3',
	type: 'css'
}, {
	url: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css',
	label: 'Animate.css',
	type: 'css'
}, {
	url: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
	label: 'FontAwesome 4',
	type: 'css'
}, {
	url: 'https://use.fontawesome.com/releases/v5.0.10/css/all.css',
	label: 'FontAwesome 5',
	type: 'css'
}];

/***/ }),

/***/ "f66c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.A = A;
exports.Button = Button;

var _preact = __webpack_require__("KM04");

var _analytics = __webpack_require__("qV3Q");

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Clickable = function (_Component) {
	_inherits(Clickable, _Component);

	function Clickable() {
		_classCallCheck(this, Clickable);

		return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	Clickable.prototype.handleClick = function handleClick(e) {
		var el = e.currentTarget;
		(0, _analytics.trackEvent)(el.getAttribute('data-event-category'), el.getAttribute('data-event-action'));
		this.props.onClick(e);
	};

	Clickable.prototype.render = function render() {
		/* eslint-disable no-unused-vars */
		var _props = this.props,
		    onClick = _props.onClick,
		    Tag = _props.Tag,
		    props = _objectWithoutProperties(_props, ['onClick', 'Tag']);
		/* eslint-enable no-unused-vars */

		return (0, _preact.h)(Tag, _extends({ onClick: this.handleClick.bind(this) }, props));
	};

	return Clickable;
}(_preact.Component);

function A(props) {
	return (0, _preact.h)(Clickable, _extends({ Tag: 'a' }, props));
}

function Button(props) {
	return (0, _preact.h)(Clickable, _extends({ Tag: 'button' }, props));
}

/***/ }),

/***/ "g1Sf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.AskToImportModal = AskToImportModal;

var _preact = __webpack_require__("KM04");

var _Modal = __webpack_require__("inAt");

var _Modal2 = _interopRequireDefault(_Modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref2 = (0, _preact.h)(
	'h2',
	null,
	'Import your creations in your account'
);

var _ref3 = (0, _preact.h)(
	'p',
	null,
	'It\'s okay if you don\'t want to. You can simply logout and access them anytime on this browser.'
);

function AskToImportModal(_ref) {
	var show = _ref.show,
	    closeHandler = _ref.closeHandler,
	    oldSavedCreationsCount = _ref.oldSavedCreationsCount,
	    dontAskBtnClickHandler = _ref.dontAskBtnClickHandler,
	    importBtnClickHandler = _ref.importBtnClickHandler;

	return (0, _preact.h)(
		_Modal2.default,
		{
			extraClasses: 'ask-to-import-modal',
			show: show,
			closeHandler: closeHandler
		},
		_ref2,
		(0, _preact.h)(
			'div',
			null,
			(0, _preact.h)(
				'p',
				null,
				'You have ',
				(0, _preact.h)(
					'span',
					null,
					oldSavedCreationsCount
				),
				' creations saved in your local machine. Do you want to import those creations in your account so they are more secure and accessible anywhere?'
			),
			_ref3,
			(0, _preact.h)(
				'div',
				{ 'class': 'flex flex-h-end' },
				(0, _preact.h)(
					'button',
					{ onClick: dontAskBtnClickHandler, 'class': 'btn' },
					'Don\'t ask me again'
				),
				(0, _preact.h)(
					'button',
					{ onClick: importBtnClickHandler, 'class': 'btn btn--primary ml-1' },
					'Yes, please import'
				)
			)
		)
	);
}

/***/ }),

/***/ "i8IT":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.HelpModal = HelpModal;

var _preact = __webpack_require__("KM04");

var _Modal = __webpack_require__("inAt");

var _Modal2 = _interopRequireDefault(_Modal);

var _common = __webpack_require__("f66c");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref = (0, _preact.h)(
	'h1',
	null,
	(0, _preact.h)(
		'div',
		{ 'class': 'web-maker-with-tag' },
		'Web Sequence (from ZenUML)'
	),
	(0, _preact.h)(
		'small',
		{ style: 'font-size:14px;' },
		' v2.0.0'
	),
	(0, _preact.h)(
		'div',
		{ 'class': 'flex' },
		(0, _preact.h)(
			'div',
			{ 'class': 'onboard-step' },
			(0, _preact.h)('img', { src: './animation/10s.gif', alt: 'Middleman logo' })
		)
	),
	(0, _preact.h)(
		'p',
		null,
		'Get more help from ',
		(0, _preact.h)(
			'a',
			{ href: 'https://www.zenuml.com/help.html' },
			'ZenUML.com'
		)
	)
);

function HelpModal(props) {
	return (0, _preact.h)(
		_Modal2.default,
		{ show: props.show, closeHandler: props.closeHandler },
		_ref
	);
}

/***/ }),

/***/ "inAt":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = undefined;

var _preact = __webpack_require__("KM04");

var _preactPortal = __webpack_require__("q6qL");

var _preactPortal2 = _interopRequireDefault(_preactPortal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Modal = function (_Component) {
	_inherits(Modal, _Component);

	function Modal() {
		_classCallCheck(this, Modal);

		return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	Modal.prototype.componentDidMount = function componentDidMount() {
		window.addEventListener('keydown', this.onKeyDownHandler.bind(this));
	};

	Modal.prototype.componentWillUnmount = function componentWillUnmount() {
		window.removeEventListener('keydown', this.onKeyDownHandler.bind(this));
		if (this.focusGrabber) {
			this.focusGrabber.remove();
			this.focusGrabber = null;
		}
	};

	Modal.prototype.onKeyDownHandler = function onKeyDownHandler(e) {
		if (e.keyCode === 27) {
			this.props.closeHandler();
		}
	};

	Modal.prototype.onOverlayClick = function onOverlayClick(e) {
		if (e.target === this.overlayEl) {
			this.props.closeHandler();
		}
	};

	Modal.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
		var _this2 = this;

		if (this.props.show !== prevProps.show) {
			document.body.classList[this.props.show ? 'add' : 'remove']('overlay-visible');
			if (this.props.show) {
				// HACK: refs will evaluate on next tick due to portals
				setTimeout(function () {
					_this2.overlayEl.querySelector('.js-modal__close-btn').focus();
				}, 0);

				/* We insert a dummy hidden input which will take focus as soon as focus
    escapes the modal, instead of focus going outside modal because modal
    is last focusable element. */
				this.focusGrabber = document.createElement('input');
				this.focusGrabber.setAttribute('style', 'height:0;opacity:0;overflow:hidden;width:0;');
				setTimeout(function () {
					document.body.appendChild(_this2.focusGrabber);
				}, 10);
			} else {
				this.focusGrabber.remove();
				this.focusGrabber = null;
			}
		}
	};

	Modal.prototype.render = function render() {
		var _this3 = this;

		if (!this.props.show) return null;

		return (0, _preact.h)(
			_preactPortal2.default,
			{ into: 'body' },
			(0, _preact.h)(
				'div',
				{
					'class': (this.props.extraClasses || '') + ' modal is-modal-visible',
					ref: function ref(el) {
						return _this3.overlayEl = el;
					},
					onClick: this.onOverlayClick.bind(this)
				},
				(0, _preact.h)(
					'div',
					{ 'class': 'modal__content' },
					(0, _preact.h)(
						'button',
						{
							type: 'button',
							onClick: this.props.closeHandler,
							'aria-label': 'Close modal',
							title: 'Close',
							'class': 'js-modal__close-btn modal__close-btn'
						},
						'Close'
					),
					this.props.children
				)
			)
		);
	};

	return Modal;
}(_preact.Component);

exports.default = Modal;

/***/ }),

/***/ "jHnz":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.auth = undefined;

var _analytics = __webpack_require__("qV3Q");

var _app = __webpack_require__("ZUoI");

var _app2 = _interopRequireDefault(_app);

var _utils = __webpack_require__("6Ptt");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var auth = exports.auth = {
	logout: function logout() {
		_app2.default.auth().signOut();
	},
	login: function login(providerName) {
		var provider;
		if (providerName === 'facebook') {
			provider = new _app2.default.auth.FacebookAuthProvider();
		} else if (providerName === 'twitter') {
			provider = new _app2.default.auth.TwitterAuthProvider();
		} else if (providerName === 'google') {
			provider = new _app2.default.auth.GoogleAuthProvider();
			provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
		} else {
			provider = new _app2.default.auth.GithubAuthProvider();
		}

		return _app2.default.auth().signInWithPopup(provider).then(function () {
			(0, _analytics.trackEvent)('fn', 'loggedIn', providerName);
			// Save to recommend next time
			window.db.local.set({
				lastAuthProvider: providerName
			});
		}).catch(function (error) {
			(0, _utils.log)(error);
			if (error.code === 'auth/account-exists-with-different-credential') {
				alert('You have already signed up with the same email using different social login');
			}
		});
	}
};

/***/ }),

/***/ "kL0g":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var editorThemes = exports.editorThemes = ['3024-day', '3024-night', 'abcdef', 'ambiance', 'base2tone-meadow-dark', 'base16-dark', 'base16-light', 'bespin', 'blackboard', 'cobalt', 'colorforth', 'dracula', 'duotone-dark', 'duotone-light', 'eclipse', 'elegant', 'erlang-dark', 'hopscotch', 'icecoder', 'isotope', 'lesser-dark', 'liquibyte', 'material', 'mbo', 'mdn-like', 'midnight', 'monokai', 'neat', 'neo', 'night', 'panda-syntax', 'paraiso-dark', 'paraiso-light', 'pastel-on-dark', 'railscasts', 'rubyblue', 'seti', 'solarized dark', 'solarized light', 'the-matrix', 'tomorrow-night-bright', 'tomorrow-night-eighties', 'ttcn', 'twilight', 'vibrant-ink', 'xq-dark', 'xq-light', 'yeti', 'zenburn'];

/***/ }),

/***/ "qV3Q":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.trackEvent = trackEvent;

var _utils = __webpack_require__("6Ptt");

/* global ga */

// eslint-disable-next-line max-params
function trackEvent(category, action, label, value) {
	if (window.DEBUG) {
		(0, _utils.log)('trackevent', category, action, label, value);
		return;
	}
	if (window.ga) {
		ga('send', 'event', category, action, label, value);
	}
}

// if online, load after sometime
if (navigator.onLine && !window.DEBUG) {
	/* eslint-disable */

	// prettier-ignore
	setTimeout(function () {
		(function (i, s, o, g, r, a, m) {
			i['GoogleAnalyticsObject'] = r;
			i[r] = i[r] || function () {
				(i[r].q = i[r].q || []).push(arguments);
			}, i[r].l = 1 * new Date();
			a = s.createElement(o), m = s.getElementsByTagName(o)[0];
			a.async = 1;
			a.src = g;
			m.parentNode.insertBefore(a, m);
		})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

		if (location.href.indexOf('chrome-extension://') === -1) {
			ga('create', 'UA-1211588-20');
		} else {
			ga('create', 'UA-1211588-20', {
				'cookieDomain': 'none'
			});
			// required for chrome extension protocol
			ga('set', 'checkProtocolTask', function () {/* nothing */});
		}
		ga('send', 'pageview', 'extension');
	}, 100);

	/* eslint-enable */
}

/***/ }),

/***/ "qoQ6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = undefined;

var _preact = __webpack_require__("KM04");

var _utils = __webpack_require__("6Ptt");

var _analytics = __webpack_require__("qV3Q");

var _itemService = __webpack_require__("bjFU");

var _notifications = __webpack_require__("Mo6r");

var _deferred = __webpack_require__("3Z4F");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ref = (0, _preact.h)(
	'div',
	{ 'class': 'mt-1' },
	'No match found.'
);

var _ref2 = (0, _preact.h)(
	'span',
	{ 'class': 'show-when-selected' },
	'(Ctrl/\u2318 + F)'
);

var _ref3 = (0, _preact.h)(
	'h2',
	{ 'class': 'opacity--30' },
	'Nothing saved here.'
);

var SavedItemPane = function (_Component) {
	_inherits(SavedItemPane, _Component);

	function SavedItemPane(props) {
		_classCallCheck(this, SavedItemPane);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.items = [];
		_this.state = {
			filteredItems: []
		};
		return _this;
	}

	SavedItemPane.prototype.componentWillUpdate = function componentWillUpdate(nextProps) {
		if (this.props.items !== nextProps.items) {
			this.items = Object.values(nextProps.items);
			this.items.sort(function (a, b) {
				return b.updatedOn - a.updatedOn;
			});
			this.setState({
				filteredItems: this.items
			});
		}
	};

	SavedItemPane.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
		if (this.props.isOpen && !prevProps.isOpen) {
			window.searchInput.value = '';
		}
	};

	SavedItemPane.prototype.onCloseIntent = function onCloseIntent() {
		this.props.closeHandler();
	};

	SavedItemPane.prototype.itemClickHandler = function itemClickHandler(item) {
		this.props.itemClickHandler(item);
	};

	SavedItemPane.prototype.itemRemoveBtnClickHandler = function itemRemoveBtnClickHandler(item, e) {
		e.stopPropagation();
		this.props.itemRemoveBtnClickHandler(item);
	};

	SavedItemPane.prototype.itemForkBtnClickHandler = function itemForkBtnClickHandler(item, e) {
		e.stopPropagation();
		this.props.itemForkBtnClickHandler(item);
	};

	SavedItemPane.prototype.keyDownHandler = function keyDownHandler(event) {
		if (!this.props.isOpen) {
			return;
		}

		var isCtrlOrMetaPressed = event.ctrlKey || event.metaKey;
		var isForkKeyPressed = isCtrlOrMetaPressed && event.keyCode === 70;
		var isDownKeyPressed = event.keyCode === 40;
		var isUpKeyPressed = event.keyCode === 38;
		var isEnterKeyPressed = event.keyCode === 13;

		var selectedItemElement = $('.js-saved-item-tile.selected');
		var havePaneItems = $all('.js-saved-item-tile').length !== 0;

		if ((isDownKeyPressed || isUpKeyPressed) && havePaneItems) {
			var method = isDownKeyPressed ? 'nextUntil' : 'previousUntil';

			if (selectedItemElement) {
				selectedItemElement.classList.remove('selected');
				selectedItemElement[method]('.js-saved-item-tile:not(.hide)').classList.add('selected');
			} else {
				$('.js-saved-item-tile:not(.hide)').classList.add('selected');
			}
			$('.js-saved-item-tile.selected').scrollIntoView(false);
		}

		if (isEnterKeyPressed && selectedItemElement) {
			var item = this.props.items[selectedItemElement.dataset.itemId];
			console.log('opening', item);
			this.props.itemClickHandler(item);
			(0, _analytics.trackEvent)('ui', 'openItemKeyboardShortcut');
		}

		// Fork shortcut inside saved creations panel with Ctrl/⌘ + F
		if (isForkKeyPressed) {
			event.preventDefault();
			var _item = this.props.items[selectedItemElement.dataset.itemId];
			this.props.itemForkBtnClickHandler(_item);
			(0, _analytics.trackEvent)('ui', 'forkKeyboardShortcut');
		}
	};

	SavedItemPane.prototype.mergeImportedItems = function mergeImportedItems(items) {
		var existingItemIds = [];
		var toMergeItems = {};
		var d = (0, _deferred.deferred)();
		var savedItems = {};
		this.items.forEach(function (item) {
			return savedItems[item.id] = item;
		});
		items.forEach(function (item) {
			// We can access `savedItems` here because this gets set when user
			// opens the saved creations panel. And import option is available
			// inside the saved items panel.
			if (savedItems[item.id]) {
				// Item already exists
				existingItemIds.push(item.id);
			} else {
				(0, _utils.log)('merging', item.id);
				toMergeItems[item.id] = item;
			}
		});
		var mergedItemCount = items.length - existingItemIds.length;
		if (existingItemIds.length) {
			var shouldReplace = confirm(existingItemIds.length + ' creations already exist. Do you want to replace them?');
			if (shouldReplace) {
				(0, _utils.log)('shouldreplace', shouldReplace);
				items.forEach(function (item) {
					toMergeItems[item.id] = item;
				});
				mergedItemCount = items.length;
			}
		}
		if (mergedItemCount) {
			_itemService.itemService.saveItems(toMergeItems).then(function () {
				d.resolve();
				_notifications.alertsService.add(mergedItemCount + ' creations imported successfully.');
				(0, _analytics.trackEvent)('fn', 'itemsImported', mergedItemCount);
			});
		} else {
			d.resolve();
		}
		this.props.closeHandler();

		return d.promise;
	};

	SavedItemPane.prototype.importFileChangeHandler = function importFileChangeHandler(e) {
		var _this2 = this;

		var file = e.target.files[0];

		var reader = new FileReader();
		reader.addEventListener('load', function (progressEvent) {
			var items;
			try {
				items = JSON.parse(progressEvent.target.result);
				(0, _utils.log)(items);
				_this2.mergeImportedItems(items);
			} catch (exception) {
				(0, _utils.log)(exception);
				alert('Oops! Selected file is corrupted. Please select a file that was generated by clicking the "Export" button.');
			}
		});

		reader.readAsText(file, 'utf-8');
	};

	SavedItemPane.prototype.importBtnClickHandler = function importBtnClickHandler(e) {
		var input = document.createElement('input');
		input.type = 'file';
		input.style.display = 'none';
		input.accept = 'accept="application/json';
		document.body.appendChild(input);
		input.addEventListener('change', this.importFileChangeHandler.bind(this));
		input.click();
		(0, _analytics.trackEvent)('ui', 'importBtnClicked');
		e.preventDefault();
	};

	SavedItemPane.prototype.searchInputHandler = function searchInputHandler(e) {
		var text = e.target.value;
		if (!text) {
			this.setState({
				filteredItems: this.items
			});
		} else {
			this.setState({
				filteredItems: this.items.filter(function (item) {
					return item.title.toLowerCase().indexOf(text) !== -1;
				})
			});
		}
		(0, _analytics.trackEvent)('ui', 'searchInputType');
	};

	SavedItemPane.prototype.render = function render() {
		var _this3 = this;

		return (0, _preact.h)(
			'div',
			{
				id: 'js-saved-items-pane',
				'class': 'saved-items-pane ' + (this.props.isOpen ? 'is-open' : ''),
				onKeyDown: this.keyDownHandler.bind(this)
			},
			(0, _preact.h)(
				'button',
				{
					onClick: this.onCloseIntent.bind(this),
					'class': 'btn  saved-items-pane__close-btn',
					id: 'js-saved-items-pane-close-btn'
				},
				'X'
			),
			(0, _preact.h)(
				'div',
				{ 'class': 'flex flex-v-center', style: 'justify-content: space-between;' },
				(0, _preact.h)(
					'h3',
					null,
					'My Library (',
					this.items.length,
					')'
				),
				(0, _preact.h)(
					'div',
					null,
					(0, _preact.h)(
						'button',
						{
							onClick: this.props.exportBtnClickHandler,
							'class': 'btn--dark hint--bottom-left hint--rounded hint--medium',
							'aria-label': 'Export all your creations into a single importable file.'
						},
						'Export'
					),
					(0, _preact.h)(
						'button',
						{
							onClick: this.importBtnClickHandler.bind(this),
							'class': 'btn--dark hint--bottom-left hint--rounded hint--medium',
							'aria-label': 'Import your creations. Only the file that you export through the \'Export\' button can be imported.'
						},
						'Import'
					)
				)
			),
			(0, _preact.h)('input', {
				id: 'searchInput',
				'class': 'search-input',
				onInput: this.searchInputHandler.bind(this),
				placeholder: 'Search your creations here...'
			}),
			(0, _preact.h)(
				'div',
				{ id: 'js-saved-items-wrap', 'class': 'saved-items-pane__container' },
				!this.state.filteredItems.length && this.items.length ? _ref : null,
				this.state.filteredItems.map(function (item) {
					return (0, _preact.h)(
						'div',
						{
							'class': 'js-saved-item-tile saved-item-tile',
							'data-item-id': item.id,
							onClick: _this3.itemClickHandler.bind(_this3, item)
						},
						(0, _preact.h)(
							'div',
							{ 'class': 'saved-item-tile__btns' },
							(0, _preact.h)(
								'a',
								{
									'class': 'js-saved-item-tile__fork-btn  saved-item-tile__btn hint--left hint--medium',
									'aria-label': 'Creates a duplicate of this creation (Ctrl/\u2318 + F)',
									onClick: _this3.itemForkBtnClickHandler.bind(_this3, item)
								},
								'Fork',
								_ref2
							),
							(0, _preact.h)(
								'a',
								{
									'class': 'js-saved-item-tile__remove-btn  saved-item-tile__btn hint--left',
									'aria-label': 'Remove',
									onClick: _this3.itemRemoveBtnClickHandler.bind(_this3, item)
								},
								'X'
							)
						),
						(0, _preact.h)(
							'h3',
							{ 'class': 'saved-item-tile__title' },
							item.title
						),
						(0, _preact.h)(
							'span',
							{ 'class': 'saved-item-tile__meta' },
							'Last updated: ',
							(0, _utils.getHumanDate)(item.updatedOn)
						)
					);
				}),
				!this.items.length ? _ref3 : null
			)
		);
	};

	return SavedItemPane;
}(_preact.Component);

exports.default = SavedItemPane;

/***/ }),

/***/ "uO6b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.MainHeader = MainHeader;

var _preact = __webpack_require__("KM04");

var _common = __webpack_require__("f66c");

var DEFAULT_PROFILE_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='#ccc' d='M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z' /%3E%3C/svg%3E";

var _ref = (0, _preact.h)(
	'svg',
	{ style: 'width: 14px; height: 14px;' },
	(0, _preact.h)('use', { xlinkHref: '#play-icon' })
);

var _ref2 = (0, _preact.h)(
	'svg',
	{
		style: 'vertical-align:middle;width:14px;height:14px',
		viewBox: '0 0 24 24'
	},
	(0, _preact.h)('path', { d: 'M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z' })
);

var _ref3 = (0, _preact.h)(
	'svg',
	{
		style: 'vertical-align:middle;width:14px;height:14px',
		viewBox: '0 0 24 24'
	},
	(0, _preact.h)('path', { d: 'M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z' })
);

var _ref4 = (0, _preact.h)(
	'svg',
	{ 'class': 'btn-loader', width: '15', height: '15', stroke: '#fff' },
	(0, _preact.h)('use', { xlinkHref: '#loader-icon' })
);

var _ref5 = (0, _preact.h)(
	'svg',
	{
		style: 'width:14px;height:14px;vertical-align:middle;',
		viewBox: '0 0 24 24'
	},
	(0, _preact.h)('path', { d: 'M13,9V3.5L18.5,9M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z' })
);

var _ref6 = (0, _preact.h)(
	'svg',
	{ 'class': 'btn-loader', width: '15', height: '15', stroke: '#fff' },
	(0, _preact.h)('use', { xlinkHref: '#loader-icon' })
);

function MainHeader(props) {
	return (0, _preact.h)(
		'div',
		{ 'class': 'main-header' },
		(0, _preact.h)('input', {
			type: 'text',
			id: 'titleInput',
			title: 'Click to edit',
			'class': 'item-title-input',
			value: props.title,
			onBlur: props.titleInputBlurHandler
		}),
		(0, _preact.h)(
			'div',
			{ 'class': 'main-header__btn-wrap  flex  flex-v-center' },
			(0, _preact.h)(
				'button',
				{
					id: 'runBtn',
					'class': 'hide btn--dark flex flex-v-center hint--rounded hint--bottom-left',
					'aria-label': 'Run preview (Ctrl/\u2318 + Shift + 5)',
					onClick: props.runBtnClickHandler
				},
				_ref,
				'Run'
			),
			(0, _preact.h)(
				_common.Button,
				{
					onClick: props.addLibraryBtnHandler,
					'data-event-category': 'ui',
					'data-event-action': 'addLibraryButtonClick',
					'class': 'btn--dark flex-v-center hint--rounded hint--bottom-left',
					style: 'display: none',
					'aria-label': 'Add a JS/CSS library'
				},
				'Add library',
				' ',
				(0, _preact.h)(
					'span',
					{
						id: 'js-external-lib-count',
						style: 'display:' + (props.externalLibCount ? 'inline' : 'none'),
						'class': 'count-label'
					},
					props.externalLibCount
				)
			),
			(0, _preact.h)(
				'button',
				{
					'class': 'btn--dark flex  flex-v-center hint--rounded hint--bottom-left',
					'aria-label': 'Start a new creation',
					onClick: props.newBtnHandler
				},
				_ref2,
				'New'
			),
			(0, _preact.h)(
				'button',
				{
					id: 'saveBtn',
					'class': 'btn--dark flex  flex-v-center hint--rounded hint--bottom-left ' + (props.isSaving ? 'is-loading' : '') + ' ' + (props.unsavedEditCount ? 'is-marked' : 0),
					'aria-label': 'Save current creation (Ctrl/\u2318 + S)',
					onClick: props.saveBtnHandler
				},
				_ref3,
				_ref4,
				'Save'
			),
			(0, _preact.h)(
				'button',
				{
					id: 'openItemsBtn',
					'class': 'btn--dark flex flex-v-center hint--rounded hint--bottom-left ' + (props.isFetchingItems ? 'is-loading' : ''),
					'aria-label': 'Open a saved creation (Ctrl/\u2318 + O)',
					onClick: props.openBtnHandler
				},
				_ref5,
				_ref6,
				'Open'
			),
			(0, _preact.h)(
				_common.Button,
				{
					onClick: props.loginBtnHandler,
					'data-event-category': 'ui',
					'data-event-action': 'loginButtonClick',
					'class': 'hide-on-login btn--dark flex  flex-v-center  hint--rounded  hint--bottom-left',
					'aria-label': 'Login/Signup'
				},
				'Login/Signup'
			),
			(0, _preact.h)(
				_common.Button,
				{
					onClick: props.profileBtnHandler,
					'data-event-category': 'ui',
					'data-event-action': 'headerAvatarClick',
					'aria-label': 'See profile or Logout',
					'class': 'hide-on-logout btn--dark hint--rounded  hint--bottom-left'
				},
				(0, _preact.h)('img', {
					id: 'headerAvatarImg',
					width: '20',
					src: props.user ? props.user.photoURL || DEFAULT_PROFILE_IMG : '',
					'class': 'main-header__avatar-img'
				})
			)
		)
	);
}

/***/ }),

/***/ "uXt8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _app = __webpack_require__("ZUoI");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import 'firebase/firestore';
var config = {
	apiKey: 'AIzaSyCBEg3VpY6UjXNnDzvXieSYx13Q63Rs-a0',
	authDomain: 'web-sequence-local.firebaseapp.com',
	databaseURL: 'https://web-sequence-local.firebaseio.com/',
	projectId: 'web-sequence-local',
	storageBucket: 'web-sequence-local.appspot.com',
	messagingSenderId: '542187884961'
};
_app2.default.initializeApp(config);

/***/ }),

/***/ "uv7j":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _preact = __webpack_require__("KM04");

var _MainHeader = __webpack_require__("uO6b");

var _ContentWrap = __webpack_require__("7vko");

var _ContentWrap2 = _interopRequireDefault(_ContentWrap);

var _Footer = __webpack_require__("MXol");

var _Footer2 = _interopRequireDefault(_Footer);

var _SavedItemPane = __webpack_require__("qoQ6");

var _SavedItemPane2 = _interopRequireDefault(_SavedItemPane);

var _AddLibrary = __webpack_require__("6Vka");

var _AddLibrary2 = _interopRequireDefault(_AddLibrary);

var _Modal = __webpack_require__("inAt");

var _Modal2 = _interopRequireDefault(_Modal);

var _Login = __webpack_require__("VB7N");

var _Login2 = _interopRequireDefault(_Login);

var _utils = __webpack_require__("6Ptt");

var _itemService = __webpack_require__("bjFU");

__webpack_require__("BcU7");

var _Notifications = __webpack_require__("0lUe");

var _Settings = __webpack_require__("Q8fL");

var _Settings2 = _interopRequireDefault(_Settings);

var _codeModes = __webpack_require__("y5h4");

var _analytics = __webpack_require__("qV3Q");

var _deferred = __webpack_require__("3Z4F");

var _notifications = __webpack_require__("Mo6r");

var _app = __webpack_require__("ZUoI");

var _app2 = _interopRequireDefault(_app);

__webpack_require__("zKjx");

var _Profile = __webpack_require__("18yn");

var _auth = __webpack_require__("jHnz");

var _SupportDeveloperModal = __webpack_require__("UzHC");

var _KeyboardShortcutsModal = __webpack_require__("1IZv");

var _takeScreenshot = __webpack_require__("Zox/");

var _AskToImportModal = __webpack_require__("g1Sf");

var _Alerts = __webpack_require__("CbJP");

var _preactPortal = __webpack_require__("q6qL");

var _preactPortal2 = _interopRequireDefault(_preactPortal);

var _HelpModal = __webpack_require__("i8IT");

var _OnboardingModal = __webpack_require__("W5Uw");

var _Icons = __webpack_require__("0job");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global htmlCodeEl, cssCodeEl, jsCodeEl, runBtn
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

if (false) {
	require('preact/debug');
}

var LocalStorageKeys = {
	LOGIN_AND_SAVE_MESSAGE_SEEN: 'loginAndsaveMessageSeen',
	ASKED_TO_IMPORT_CREATIONS: 'askedToImportCreations'
};
var UNSAVED_WARNING_COUNT = 15;
var version = '3.3.2';

var _ref2 = (0, _preact.h)('div', { 'class': 'global-console-container', id: 'globalConsoleContainerEl' });

var _ref3 = (0, _preact.h)(_Alerts.Alerts, null);

var _ref4 = (0, _preact.h)(
	'form',
	{
		style: 'display:none;',
		action: 'https://codepen.io/pen/define',
		method: 'POST',
		target: '_blank',
		id: 'js-codepen-form'
	},
	(0, _preact.h)('input', {
		type: 'hidden',
		name: 'data',
		value: '{"title": "New Pen!", "html": "<div>Hello, World!</div>"}'
	})
);

var _ref5 = (0, _preact.h)(_Login2.default, null);

var _ref6 = (0, _preact.h)(_Icons.Icons, null);

var _ref7 = (0, _preact.h)(
	'form',
	{
		style: 'display:none;',
		action: 'https://codepen.io/pen/define',
		method: 'POST',
		target: '_blank',
		id: 'codepenForm'
	},
	(0, _preact.h)('input', {
		type: 'hidden',
		name: 'data',
		value: '{"title": "New Pen!", "html": "<div>Hello, World!</div>"}'
	})
);

var App = function (_Component) {
	_inherits(App, _Component);

	function App() {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, _Component.call(this));

		_this.AUTO_SAVE_INTERVAL = 15000; // 15 seconds
		_this.state = {
			isSavedItemPaneOpen: false,
			isModalOpen: false,
			isAddLibraryModalOpen: false,
			isSettingsModalOpen: false,
			isHelpModalOpen: false,
			isNotificationsModalOpen: false,
			isLoginModalOpen: false,
			isProfileModalOpen: false,
			isSupportDeveloperModalOpen: false,
			isKeyboardShortcutsModalOpen: false,
			isAskToImportModalOpen: false,
			isOnboardModalOpen: false,
			prefs: {},
			currentItem: {
				title: '',
				externalLibs: { js: '', css: '' }
			}
		};
		_this.defaultSettings = {
			preserveLastCode: true,
			replaceNewTab: false,
			htmlMode: 'html',
			jsMode: 'js',
			cssMode: 'css',
			isCodeBlastOn: false,
			indentWith: 'spaces',
			indentSize: 2,
			editorTheme: 'monokai',
			keymap: 'sublime',
			fontSize: 16,
			refreshOnResize: false,
			autoPreview: true,
			editorFont: 'FiraCode',
			editorCustomFont: '',
			autoSave: true,
			autoComplete: true,
			preserveConsoleLogs: true,
			lightVersion: false,
			lineWrap: true,
			infiniteLoopTimeout: 1000,
			layoutMode: 2
		};
		_this.prefs = {};

		var firestore = _app2.default.firestore();
		var settings = { timestampsInSnapshots: true };
		firestore.settings(settings);
		_app2.default.auth().onAuthStateChanged(function (user) {
			_this.setState({ isLoginModalOpen: false });
			if (user) {
				(0, _utils.log)('You are -> ', user);
				_notifications.alertsService.add('You are now logged in!');
				_this.setState({ user: user });
				window.user = user;
				if (!window.localStorage[LocalStorageKeys.ASKED_TO_IMPORT_CREATIONS]) {
					_this.fetchItems(false, true).then(function (items) {
						if (!items.length) {
							return;
						}
						_this.oldSavedItems = items;
						_this.oldSavedCreationsCount = items.length;
						_this.setState({
							isAskToImportModalOpen: true
						});
						(0, _analytics.trackEvent)('ui', 'askToImportModalSeen');
					});
				}
				window.db.getUser(user.uid).then(function (customUser) {
					if (customUser) {
						var prefs = _extends({}, _this.state.prefs);
						_extends(prefs, user.settings);
						_this.setState({ prefs: prefs });
						_this.updateSetting();
					}
				});
			} else {
				// User is signed out.
				_this.setState({ user: undefined });
				delete window.user;
			}
			_this.updateProfileUi();
		});
		return _this;
	}

	App.prototype.componentWillMount = function componentWillMount() {
		var _this2 = this;

		var lastCode;
		window.onunload = function () {
			_this2.saveCode('code');
			if (_this2.detachedWindow) {
				_this2.detachedWindow.close();
			}
		};

		db.local.get({
			layoutMode: 1,
			code: ''
		}, function (result) {
			_this2.toggleLayout(result.layoutMode);
			_this2.state.prefs.layoutMode = result.layoutMode;
			if (result.code) {
				lastCode = result.code;
			}
		});
		// Get synced `preserveLastCode` setting to get back last code (or not).
		db.getSettings(this.defaultSettings).then(function (result) {
			if (result.preserveLastCode && lastCode) {
				_this2.setState({ unsavedEditCount: 0 });

				// For web app environment we don't fetch item from localStorage,
				// because the item isn't stored in the localStorage.
				if (lastCode.id && window.IS_EXTENSION) {
					db.local.get(lastCode.id, function (itemResult) {
						if (itemResult[lastCode.id]) {
							(0, _utils.log)('Load item ', lastCode.id);
							_this2.setCurrentItem(itemResult[lastCode.id]).then(function () {
								return _this2.refreshEditor();
							});
						}
					});
				} else {
					(0, _utils.log)('Load last unsaved item', lastCode);
					_this2.setCurrentItem(lastCode).then(function () {
						return _this2.refreshEditor();
					});
				}
			} else {
				_this2.createNewItem();
			}
			_extends(_this2.state.prefs, result);
			_this2.setState({ prefs: _this2.state.prefs });
			_this2.updateSetting();
		});

		// Check for new version notifications
		db.getUserLastSeenVersion().then(function (lastSeenVersion) {
			// Check if new user
			if (!lastSeenVersion) {
				_this2.setState({
					isOnboardModalOpen: true
				});
				if (document.cookie.indexOf('onboarded') === -1) {
					(0, _analytics.trackEvent)('ui', 'onboardModalSeen', version);
					document.cookie = 'onboarded=1';
				}
				window.db.setUserLastSeenVersion(version);
				// set some initial preferences on closing the onboard modal
				// Old onboarding.
				//once(document, 'overlaysClosed', function() {});
			}
			// If its an upgrade
			if (lastSeenVersion && (0, _utils.semverCompare)(lastSeenVersion, version) === -1 && !window.localStorage.pledgeModalSeen) {
				_this2.openSupportDeveloperModal();
				window.localStorage.pledgeModalSeen = true;
			}

			if (!lastSeenVersion || (0, _utils.semverCompare)(lastSeenVersion, version) === -1) {
				_this2.setState({ hasUnseenChangelog: true });
				_this2.hasSeenNotifications = false;
			}
		});
	};

	App.prototype.updateProfileUi = function updateProfileUi() {
		if (this.state.user) {
			document.body.classList.add('is-logged-in');
		} else {
			document.body.classList.remove('is-logged-in');
		}
	};

	App.prototype.refreshEditor = function refreshEditor() {
		this.toggleLayout(this.state.currentItem.layoutMode || this.state.prefs.layoutMode);
		this.updateExternalLibCount();
		this.contentWrap.refreshEditor();
	};
	// Creates a new item with passed item's contents


	App.prototype.forkItem = function forkItem(sourceItem) {
		var _this3 = this;

		if (this.state.unsavedEditCount) {
			var shouldDiscard = confirm('You have unsaved changes in your current work. Do you want to discard unsaved changes and continue?');
			if (!shouldDiscard) {
				return;
			}
		}
		var fork = JSON.parse(JSON.stringify(sourceItem));
		delete fork.id;
		fork.title = '(Forked) ' + sourceItem.title;
		fork.updatedOn = Date.now();
		this.setCurrentItem(fork).then(function () {
			return _this3.refreshEditor();
		});
		_notifications.alertsService.add('"' + sourceItem.title + '" was forked');
		(0, _analytics.trackEvent)('fn', 'itemForked');
	};

	App.prototype.createNewItem = function createNewItem() {
		var _this4 = this;

		var d = new Date();
		this.setCurrentItem({
			title: 'Untitled ' + d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getHours() + ':' + d.getMinutes(),
			html: '',
			css: '',
			js: '',
			externalLibs: { js: '', css: '' },
			layoutMode: this.state.currentLayoutMode
		}).then(function () {
			return _this4.refreshEditor();
		});
		_notifications.alertsService.add('New item created');
	};

	App.prototype.openItem = function openItem(item) {
		var _this5 = this;

		this.setCurrentItem(item).then(function () {
			return _this5.refreshEditor();
		});
		_notifications.alertsService.add('Saved item loaded');
	};

	App.prototype.removeItem = function removeItem(item) {
		var _this6 = this;

		var answer = confirm('Are you sure you want to delete "' + item.title + '"?');
		if (!answer) {
			return;
		}

		// Remove from items list
		_itemService.itemService.unsetItemForUser(item.id);

		// Remove individual item too.
		_itemService.itemService.removeItem(item.id).then(function () {
			_notifications.alertsService.add('Item removed.', item);
			// This item is open in the editor. Lets open a new one.
			if (_this6.state.currentItem.id === item.id) {
				_this6.createNewItem();
			}
		});

		// Remove from cached list
		delete this.state.savedItems[item.id];
		this.setState({
			savedItems: _extends({}, this.state.savedItems)
		});

		(0, _analytics.trackEvent)('fn', 'itemRemoved');
	};

	App.prototype.setCurrentItem = function setCurrentItem(item) {
		var d = (0, _deferred.deferred)();
		// TODO: remove later
		item.htmlMode = item.htmlMode || this.state.prefs.htmlMode || _codeModes.HtmlModes.HTML;
		item.cssMode = item.cssMode || this.state.prefs.cssMode || _codeModes.CssModes.CSS;
		item.jsMode = item.jsMode || this.state.prefs.jsMode || _codeModes.JsModes.JS;

		this.setState({ currentItem: item }, d.resolve);

		// Reset auto-saving flag
		this.isAutoSavingEnabled = false;

		// Reset unsaved count, in UI also.
		this.setState({ unsavedEditCount: 0 });
		return d.promise;
	};

	App.prototype.saveBtnClickHandler = function saveBtnClickHandler() {
		(0, _analytics.trackEvent)('ui', 'saveBtnClick', this.state.currentItem.id ? 'saved' : 'new');
		this.saveItem();
	};

	App.prototype.populateItemsInSavedPane = function populateItemsInSavedPane(items) {
		// TODO: sort desc. by updation date
		this.setState({
			savedItems: _extends({}, this.state.savedItems)
		});

		this.toggleSavedItemsPane();
		// HACK: Set overflow after sometime so that the items can animate without getting cropped.
		// setTimeout(() => $('#js-saved-items-wrap').style.overflowY = 'auto', 1000);
	};

	App.prototype.toggleSavedItemsPane = function toggleSavedItemsPane(shouldOpen) {
		this.setState({ isSavedItemPaneOpen: !this.state.isSavedItemPaneOpen });

		if (this.state.isSavedItemPaneOpen) {
			window.searchInput.focus();
		} else {
			window.searchInput.value = '';
		}
		document.body.classList[this.state.isSavedItemPaneOpen ? 'add' : 'remove']('overlay-visible');
	};

	/**
  * Fetches all items from storage
  * @param  {boolean} shouldSaveGlobally Whether to store the fetched items in global arr for later use.
  * @return {promise}                    Promise.
  */


	App.prototype.fetchItems = function () {
		var _ref = _asyncToGenerator(function* (shouldSaveGlobally, shouldFetchLocally) {
			var _this7 = this;

			var d = (0, _deferred.deferred)();
			this.state.savedItems = {};
			var items = [];
			if (window.user && !shouldFetchLocally) {
				items = yield _itemService.itemService.getAllItems();
				(0, _utils.log)('got items');
				if (shouldSaveGlobally) {
					items.forEach(function (item) {
						_this7.state.savedItems[item.id] = item;
					});
				}
				d.resolve(items);
				return d.promise;
			}
			db.local.get('items', function (result) {
				var itemIds = Object.getOwnPropertyNames(result.items || {});
				if (!itemIds.length) {
					d.resolve([]);
				}

				(0, _analytics.trackEvent)('fn', 'fetchItems', itemIds.length);

				var _loop = function _loop(i) {
					/* eslint-disable no-loop-func */
					db.local.get(itemIds[i], function (itemResult) {
						if (shouldSaveGlobally) {
							_this7.state.savedItems[itemIds[i]] = itemResult[itemIds[i]];
						}
						items.push(itemResult[itemIds[i]]);
						// Check if we have all items now.
						if (itemIds.length === items.length) {
							d.resolve(items);
						}
					});

					/* eslint-enable no-loop-func */
				};

				for (var i = 0; i < itemIds.length; i++) {
					_loop(i);
				}
			});
			return d.promise;
		});

		function fetchItems(_x, _x2) {
			return _ref.apply(this, arguments);
		}

		return fetchItems;
	}();

	App.prototype.openSavedItemsPane = function openSavedItemsPane() {
		var _this8 = this;

		this.setState({
			isFetchingItems: true
		});
		this.fetchItems(true).then(function (items) {
			_this8.setState({
				isFetchingItems: false
			});
			_this8.populateItemsInSavedPane(items);
		});
	};

	App.prototype.openAddLibrary = function openAddLibrary() {
		this.setState({ isAddLibraryModalOpen: true });
	};

	App.prototype.closeSavedItemsPane = function closeSavedItemsPane() {
		this.setState({
			isSavedItemPaneOpen: false
		});
		document.body.classList.remove('overlay-visible');

		if (this.editorWithFocus) {
			this.editorWithFocus.focus();
		}
	};

	App.prototype.componentDidMount = function componentDidMount() {
		var _this9 = this;

		document.body.style.height = window.innerHeight + 'px';

		// Editor keyboard shortucuts
		window.addEventListener('keydown', function (event) {
			// TODO: refactor common listener code
			// Ctrl/⌘ + S
			if ((event.ctrlKey || event.metaKey) && event.keyCode === 83) {
				event.preventDefault();
				_this9.saveItem();
				(0, _analytics.trackEvent)('ui', 'saveItemKeyboardShortcut');
			}
			// Ctrl/⌘ + Shift + 5
			if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.keyCode === 53) {
				event.preventDefault();
				_this9.contentWrap.setPreviewContent(true, true);
				(0, _analytics.trackEvent)('ui', 'previewKeyboardShortcut');
			} else if ((event.ctrlKey || event.metaKey) && event.keyCode === 79) {
				// Ctrl/⌘ + O
				event.preventDefault();
				_this9.openSavedItemsPane();
				(0, _analytics.trackEvent)('ui', 'openCreationKeyboardShortcut');
			} else if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.keyCode === 191) {
				// Ctrl/⌘ + Shift + ?
				event.preventDefault();
				_this9.setState({
					isKeyboardShortcutsModalOpen: !_this9.state.isKeyboardShortcutsModalOpen
				});
				(0, _analytics.trackEvent)('ui', 'showKeyboardShortcutsShortcut');
			} else if (event.keyCode === 27) {
				_this9.closeSavedItemsPane();
			}
		});

		// Basic Focus trapping
		window.addEventListener('focusin', function (e) {
			if (document.body.classList.contains('overlay-visible')) {
				var modal = $('.is-modal-visible');
				if (!modal) {
					return;
				}
				if (!modal.contains(e.target)) {
					e.preventDefault();
					modal.querySelector('.js-modal__close-btn').focus();
				}
			}
		});
	};

	App.prototype.closeAllOverlays = function closeAllOverlays() {
		if (this.state.isSavedItemPaneOpen) {
			this.closeSavedItemsPane();
		}

		this.setState({
			isAddLibraryModalOpen: false,
			isSettingsModalOpen: false,
			isHelpModalOpen: false,
			isNotificationsModalOpen: false,
			isLoginModalOpen: false,
			isProfileModalOpen: false,
			isSupportDeveloperModalOpen: false,
			isKeyboardShortcutsModalOpen: false,
			isAskToImportModalOpen: false,
			isOnboardModalOpen: false
		});
	};

	App.prototype.onExternalLibChange = function onExternalLibChange(newValues) {
		(0, _utils.log)('onExternalLibChange');
		this.state.currentItem.externalLibs = {
			js: newValues.js,
			css: newValues.css
		};
		this.updateExternalLibCount();
		this.setState({
			currentItem: _extends({}, this.state.currentItem)
		});
		this.contentWrap.setPreviewContent(true);
		_notifications.alertsService.add('Libraries updated.');
	};

	App.prototype.updateExternalLibCount = function updateExternalLibCount() {
		// Calculate no. of external libs
		var noOfExternalLibs = 0;
		if (!this.state.currentItem.externalLibs) {
			return;
		}
		noOfExternalLibs += this.state.currentItem.externalLibs.js.split('\n').filter(function (lib) {
			return !!lib;
		}).length;
		noOfExternalLibs += this.state.currentItem.externalLibs.css.split('\n').filter(function (lib) {
			return !!lib;
		}).length;
		this.setState({
			externalLibCount: noOfExternalLibs
		});
	};

	App.prototype.toggleLayout = function toggleLayout(mode) {
		var _this10 = this;

		/* eslint-disable no-param-reassign */
		mode = window.innerWidth < 600 ? 2 : mode;

		if (this.state.currentLayoutMode === mode) {
			this.contentWrap.resetSplitting();
			// mainSplitInstance.setSizes(getMainSplitSizesToApply());
			// codeSplitInstance.setSizes(currentItem.sizes || [33.33, 33.33, 33.33]);
			this.setState({ currentLayoutMode: mode });
			return;
		}
		// Remove all layout classes
		[1, 2, 3, 4, 5].forEach(function (layoutNumber) {
			window['layoutBtn' + layoutNumber].classList.remove('selected');
			document.body.classList.remove('layout-' + layoutNumber);
		});
		$('#layoutBtn' + mode).classList.add('selected');
		document.body.classList.add('layout-' + mode);

		this.setState({ currentLayoutMode: mode }, function () {
			_this10.contentWrap.resetSplitting();
			_this10.contentWrap.setPreviewContent(true);
		});
	};

	App.prototype.layoutBtnClickHandler = function layoutBtnClickHandler(layoutId) {
		this.saveSetting('layoutMode', layoutId);
		(0, _analytics.trackEvent)('ui', 'toggleLayoutClick', layoutId);
		this.toggleLayout(layoutId);
	};

	// Calculates the sizes of html, css & js code panes.


	App.prototype.getCodePaneSizes = function getCodePaneSizes() {
		var sizes;
		var currentLayoutMode = this.state.currentLayoutMode;
		var dimensionProperty = currentLayoutMode === 2 || currentLayoutMode === 5 ? 'width' : 'height';
		try {
			sizes = [htmlCodeEl.style[dimensionProperty], cssCodeEl.style[dimensionProperty], jsCodeEl.style[dimensionProperty]];
		} catch (e) {
			sizes = [0, 30, 70];
		} finally {
			/* eslint-disable no-unsafe-finally */
			return sizes;

			/* eslint-enable no-unsafe-finally */
		}
	};

	// Calculates the current sizes of code & preview panes.


	App.prototype.getMainPaneSizes = function getMainPaneSizes() {
		var sizes;
		var currentLayoutMode = this.state.currentLayoutMode;
		var dimensionProperty = currentLayoutMode === 2 ? 'height' : 'width';
		try {
			sizes = [+$('#js-code-side').style[dimensionProperty].match(/([\d.]+)%/)[1], +$('#js-demo-side').style[dimensionProperty].match(/([\d.]+)%/)[1]];
		} catch (e) {
			sizes = [50, 50];
		} finally {
			/* eslint-disable no-unsafe-finally */
			return sizes;

			/* eslint-enable no-unsafe-finally */
		}
	};

	App.prototype.saveSetting = function saveSetting(setting, value) {
		var _obj;

		var d = (0, _deferred.deferred)();
		var obj = (_obj = {}, _obj[setting] = value, _obj);
		db.local.set(obj, d.resolve);
		return d.promise;
	};

	App.prototype.saveCode = function saveCode(key) {
		this.state.currentItem.updatedOn = Date.now();
		this.state.currentItem.layoutMode = this.state.currentLayoutMode;

		this.state.currentItem.sizes = this.getCodePaneSizes();
		this.state.currentItem.mainSizes = this.getMainPaneSizes();

		(0, _utils.log)('saving key', key || this.state.currentItem.id, this.state.currentItem);

		function onSaveComplete() {
			if (window.user && !navigator.onLine) {
				_notifications.alertsService.add('Item saved locally. Will save to account when you are online.');
			} else {
				_notifications.alertsService.add('Item saved.');
			}
			this.setState({ unsavedEditCount: 0 });
		}

		return _itemService.itemService.setItem(key || this.state.currentItem.id, this.state.currentItem).then(onSaveComplete.bind(this));
	};

	// Save current item to storage


	App.prototype.saveItem = function saveItem() {
		var _this11 = this;

		if (!window.user && !window.localStorage[LocalStorageKeys.LOGIN_AND_SAVE_MESSAGE_SEEN]) {
			var answer = confirm('Saving without signing in will save your work only on this machine and this browser. If you want it to be secure & available anywhere, please login in your account and then save.\n\nDo you still want to continue saving locally?');
			window.localStorage[LocalStorageKeys.LOGIN_AND_SAVE_MESSAGE_SEEN] = true;
			if (!answer) {
				(0, _analytics.trackEvent)('ui', LocalStorageKeys.LOGIN_AND_SAVE_MESSAGE_SEEN, 'login');
				this.closeAllOverlays();
				this.setState({ isLoginModalOpen: true });
				return;
			}
			(0, _analytics.trackEvent)('ui', LocalStorageKeys.LOGIN_AND_SAVE_MESSAGE_SEEN, 'local');
		}
		var isNewItem = !this.state.currentItem.id;
		this.state.currentItem.id = this.state.currentItem.id || 'item-' + (0, _utils.generateRandomId)();
		this.setState({
			isSaving: true
		});
		this.saveCode().then(function () {
			_this11.setState({
				isSaving: false
			});
			// TODO: May be setState with currentItem

			// If this is the first save, and auto-saving settings is enabled,
			// then start auto-saving from now on.
			// This is done in `saveCode()` completion so that the
			// auto-save notification overrides the `saveCode` function's notification.
			if (!_this11.isAutoSavingEnabled && _this11.state.prefs.autoSave) {
				_this11.isAutoSavingEnabled = true;
				_notifications.alertsService.add('Auto-save enabled.');
			}
		});
		// Push into the items hash if its a new item being saved
		if (isNewItem) {
			_itemService.itemService.setItemForUser(this.state.currentItem.id);
		}
	};

	App.prototype.onCodeModeChange = function onCodeModeChange(ofWhat, mode) {
		var item = _extends({}, this.state.currentItem);
		item[ofWhat + 'Mode'] = mode;
		this.setState({ currentItem: item });
	};

	App.prototype.onCodeChange = function onCodeChange(type, code, isUserChange) {
		this.state.currentItem[type] = code;
		if (isUserChange) {
			this.setState({ unsavedEditCount: this.state.unsavedEditCount + 1 });

			if (this.state.unsavedEditCount % UNSAVED_WARNING_COUNT === 0 && this.state.unsavedEditCount >= UNSAVED_WARNING_COUNT) {
				window.saveBtn.classList.add('animated');
				window.saveBtn.classList.add('wobble');
				window.saveBtn.addEventListener('animationend', function () {
					window.saveBtn.classList.remove('animated');
					window.saveBtn.classList.remove('wobble');
				});
			}
		}
	};

	App.prototype.onCodeSettingsChange = function onCodeSettingsChange(type, settings) {
		this.state.currentItem[type + 'Settings'] = {
			acssConfig: settings
		};
	};

	App.prototype.titleInputBlurHandler = function titleInputBlurHandler(e) {
		this.state.currentItem.title = e.target.value;

		if (this.state.currentItem.id) {
			this.saveItem();
			(0, _analytics.trackEvent)('ui', 'titleChanged');
		}
	};

	/**
  * Handles all user triggered preference changes in the UI.
  */


	App.prototype.updateSetting = function updateSetting(e) {
		var _this12 = this;

		// If this was triggered from user interaction, save the setting
		if (e) {
			var settingName = e.target.dataset.setting;
			var obj = {};
			var el = e.target;
			(0, _utils.log)(settingName, el.type === 'checkbox' ? el.checked : el.value);
			var _prefs = _extends({}, this.state.prefs);
			_prefs[settingName] = el.type === 'checkbox' ? el.checked : el.value;
			obj[settingName] = _prefs[settingName];
			this.setState({ prefs: _prefs });

			// We always save locally so that it gets fetched
			// faster on future loads.
			db.sync.set(obj, function () {
				_notifications.alertsService.add('Setting saved');
			});
			if (window.user) {
				window.db.getDb().then(function (remoteDb) {
					var _remoteDb$collection$;

					remoteDb.collection('users').doc(window.user.uid).update((_remoteDb$collection$ = {}, _remoteDb$collection$['settings.' + settingName] = _this12.state.prefs[settingName], _remoteDb$collection$)).then(function (arg) {
						(0, _utils.log)('Setting "' + settingName + '" for user', arg);
					}).catch(function (error) {
						return (0, _utils.log)(error);
					});
				});
			}
			(0, _analytics.trackEvent)('ui', 'updatePref-' + settingName, _prefs[settingName]);
		}

		var prefs = this.state.prefs;
		// Show/hide RUN button based on autoPreview setting.
		runBtn.classList[prefs.autoPreview ? 'add' : 'remove']('hide');

		this.contentWrap.applyCodemirrorSettings(this.state.prefs);

		if (prefs.autoSave) {
			if (!this.autoSaveInterval) {
				this.autoSaveInterval = setInterval(function () {
					_this12.autoSaveLoop();
				}, this.AUTO_SAVE_INTERVAL);
			}
		} else {
			clearInterval(this.autoSaveInterval);
			this.autoSaveInterval = null;
		}

		document.body.classList[prefs.lightVersion ? 'add' : 'remove']('light-version');
	};

	// Keeps getting called after certain interval to auto-save current creation
	// if it needs to be.


	App.prototype.autoSaveLoop = function autoSaveLoop() {
		if (this.isAutoSavingEnabled && this.state.unsavedEditCount) {
			this.saveItem();
		}
	};

	App.prototype.loginBtnClickHandler = function loginBtnClickHandler() {
		this.setState({ isLoginModalOpen: true });
	};

	App.prototype.profileBtnClickHandler = function profileBtnClickHandler() {
		this.setState({ isProfileModalOpen: true });
	};

	App.prototype.logout = function logout() {
		if (this.state.unsavedEditCount) {
			var shouldDiscard = confirm('You have unsaved changes. Do you still want to logout?');
			if (!shouldDiscard) {
				return;
			}
		}
		(0, _analytics.trackEvent)('fn', 'loggedOut');
		_auth.auth.logout();
		this.setState({ isProfileModalOpen: false });
		_notifications.alertsService.add('Log out successfull');
	};

	App.prototype.itemClickHandler = function itemClickHandler(item) {
		var _this13 = this;

		setTimeout(function () {
			_this13.openItem(item);
		}, 350);
		this.toggleSavedItemsPane();
	};

	App.prototype.itemRemoveBtnClickHandler = function itemRemoveBtnClickHandler(item) {
		this.removeItem(item);
	};

	App.prototype.itemForkBtnClickHandler = function itemForkBtnClickHandler(item) {
		var _this14 = this;

		this.toggleSavedItemsPane();
		setTimeout(function () {
			_this14.forkItem(item);
		}, 350);
	};

	App.prototype.newBtnClickHandler = function newBtnClickHandler() {
		(0, _analytics.trackEvent)('ui', 'newBtnClick');
		if (this.state.unsavedEditCount) {
			var shouldDiscard = confirm('You have unsaved changes. Do you still want to create something new?');
			if (shouldDiscard) {
				this.createNewItem();
			}
		} else {
			this.createNewItem();
		}
	};

	App.prototype.openBtnClickHandler = function openBtnClickHandler() {
		(0, _analytics.trackEvent)('ui', 'openBtnClick');
		this.openSavedItemsPane();
	};

	App.prototype.detachedPreviewBtnHandler = function detachedPreviewBtnHandler() {
		(0, _analytics.trackEvent)('ui', 'detachPreviewBtnClick');

		this.contentWrap.detachPreview();
	};

	App.prototype.notificationsBtnClickHandler = function notificationsBtnClickHandler() {
		this.setState({ isNotificationsModalOpen: true });

		if (this.state.isNotificationsModalOpen && !this.hasSeenNotifications) {
			this.hasSeenNotifications = true;
			this.setState({ hasUnseenChangelog: false });
			window.db.setUserLastSeenVersion(version);
		}
		(0, _analytics.trackEvent)('ui', 'notificationButtonClick', version);
		return false;
	};

	App.prototype.codepenBtnClickHandler = function codepenBtnClickHandler(e) {
		if (this.state.currentItem.cssMode === _codeModes.CssModes.ACSS) {
			alert("Oops! CodePen doesn't supports Atomic CSS currently. \nHere is something you can still do -> https://medium.com/web-maker/sharing-your-atomic-css-work-on-codepen-a402001b26ab");
			e.preventDefault();
			return;
		}
		var json = {
			title: 'A Web Maker experiment',
			html: this.state.currentItem.html,
			css: this.state.currentItem.css,
			js: this.state.currentItem.js,

			/* eslint-disable camelcase */
			html_pre_processor: _codeModes.modes[this.state.currentItem.htmlMode].codepenVal,
			css_pre_processor: _codeModes.modes[this.state.currentItem.cssMode].codepenVal,
			js_pre_processor: _codeModes.modes[this.state.currentItem.jsMode].codepenVal,

			css_external: this.state.currentItem.externalLibs.css.split('\n').join(';'),
			js_external: this.state.currentItem.externalLibs.js.split('\n').join(';')

			/* eslint-enable camelcase */
		};
		if (!this.state.currentItem.title.match(/Untitled\s\d\d*-\d/)) {
			json.title = this.state.currentItem.title;
		}
		json = JSON.stringify(json);
		window.codepenForm.querySelector('input').value = json;
		window.codepenForm.submit();
		(0, _analytics.trackEvent)('ui', 'openInCodepen');
		e.preventDefault();
	};

	App.prototype.saveHtmlBtnClickHandler = function saveHtmlBtnClickHandler(e) {
		(0, _utils.saveAsHtml)(this.state.currentItem);
		(0, _analytics.trackEvent)('ui', 'saveHtmlClick');
		e.preventDefault();
	};

	App.prototype.runBtnClickHandler = function runBtnClickHandler() {
		this.contentWrap.setPreviewContent(true, true);
		(0, _analytics.trackEvent)('ui', 'runBtnClick');
	};

	App.prototype.exportItems = function exportItems() {
		var _this15 = this;

		(0, _utils.handleDownloadsPermission)().then(function () {
			_this15.fetchItems().then(function (items) {
				var d = new Date();
				var fileName = ['web-maker-export', d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()].join('-');
				fileName += '.json';
				var blob = new Blob([JSON.stringify(items, false, 2)], {
					type: 'application/json;charset=UTF-8'
				});

				(0, _utils.downloadFile)(fileName, blob);

				(0, _analytics.trackEvent)('fn', 'exportItems');
			});
		});
	};

	App.prototype.exportBtnClickHandler = function exportBtnClickHandler(e) {
		this.exportItems();
		e.preventDefault();
		(0, _analytics.trackEvent)('ui', 'exportBtnClicked');
	};

	App.prototype.screenshotBtnClickHandler = function screenshotBtnClickHandler(e) {
		this.contentWrap.getDemoFrame(function (frame) {
			(0, _takeScreenshot.takeScreenshot)(frame.getBoundingClientRect());
		});
		e.preventDefault();
	};

	App.prototype.openSupportDeveloperModal = function openSupportDeveloperModal() {
		this.closeAllOverlays();
		// this.setState({
		// 	isSupportDeveloperModalOpen: true
		// });
	};

	App.prototype.supportDeveloperBtnClickHandler = function supportDeveloperBtnClickHandler(e) {
		this.openSupportDeveloperModal(e);
	};

	/**
  * Called from inside ask-to-import-modal
  */


	App.prototype.dontAskToImportAnymore = function dontAskToImportAnymore(e) {
		this.setState({ isAskToImportModalOpen: false });
		window.localStorage[LocalStorageKeys.ASKED_TO_IMPORT_CREATIONS] = true;
		if (e) {
			(0, _analytics.trackEvent)('ui', 'dontAskToImportBtnClick');
		}
	};

	/**
  * Called from inside ask-to-import-modal
  */


	App.prototype.importCreationsAndSettingsIntoApp = function importCreationsAndSettingsIntoApp() {
		var _this16 = this;

		this.mergeImportedItems(this.oldSavedItems).then(function () {
			(0, _analytics.trackEvent)('fn', 'oldItemsImported');
			_this16.dontAskToImportAnymore();
		});
	};

	App.prototype.editorFocusHandler = function editorFocusHandler(editor) {
		this.editorWithFocus = editor;
	};

	App.prototype.modalOverlayClickHandler = function modalOverlayClickHandler() {
		this.closeAllOverlays();
	};

	App.prototype.splitUpdateHandler = function splitUpdateHandler(mainSplitInstance, codeSplitInstance) {
		// Not using setState to avoid re-render
		this.state.currentItem.sizes = this.getCodePaneSizes();
		this.state.currentItem.mainSizes = this.getMainPaneSizes();
	};

	App.prototype.render = function render() {
		var _this17 = this;

		return (0, _preact.h)(
			'div',
			null,
			(0, _preact.h)(
				'div',
				{ 'class': 'main-container' },
				(0, _preact.h)(_MainHeader.MainHeader, {
					externalLibCount: this.state.externalLibCount,
					openBtnHandler: this.openBtnClickHandler.bind(this),
					newBtnHandler: this.newBtnClickHandler.bind(this),
					saveBtnHandler: this.saveBtnClickHandler.bind(this),
					loginBtnHandler: this.loginBtnClickHandler.bind(this),
					profileBtnHandler: this.profileBtnClickHandler.bind(this),
					addLibraryBtnHandler: this.openAddLibrary.bind(this),
					runBtnClickHandler: this.runBtnClickHandler.bind(this),
					isFetchingItems: this.state.isFetchingItems,
					isSaving: this.state.isSaving,
					title: this.state.currentItem.title,
					titleInputBlurHandler: this.titleInputBlurHandler.bind(this),
					user: this.state.user,
					unsavedEditCount: this.state.unsavedEditCount
				}),
				(0, _preact.h)(_ContentWrap2.default, {
					currentLayoutMode: this.state.currentLayoutMode,
					currentItem: this.state.currentItem,
					onCodeChange: this.onCodeChange.bind(this),
					onCodeSettingsChange: this.onCodeSettingsChange.bind(this),
					onCodeModeChange: this.onCodeModeChange.bind(this),
					onRef: function onRef(comp) {
						return _this17.contentWrap = comp;
					},
					prefs: this.state.prefs,
					onEditorFocus: this.editorFocusHandler.bind(this),
					onSplitUpdate: this.splitUpdateHandler.bind(this)
				}),
				_ref2,
				(0, _preact.h)(_Footer2.default, {
					layoutBtnClickHandler: this.layoutBtnClickHandler.bind(this),
					helpBtnClickHandler: function helpBtnClickHandler() {
						return _this17.setState({ isHelpModalOpen: true });
					},
					settingsBtnClickHandler: function settingsBtnClickHandler() {
						return _this17.setState({ isSettingsModalOpen: true });
					},
					notificationsBtnClickHandler: this.notificationsBtnClickHandler.bind(this),
					supportDeveloperBtnClickHandler: this.supportDeveloperBtnClickHandler.bind(this),
					detachedPreviewBtnHandler: this.detachedPreviewBtnHandler.bind(this),
					codepenBtnClickHandler: this.codepenBtnClickHandler.bind(this),
					saveHtmlBtnClickHandler: this.saveHtmlBtnClickHandler.bind(this),
					keyboardShortcutsBtnClickHandler: function keyboardShortcutsBtnClickHandler() {
						return _this17.setState({ isKeyboardShortcutsModalOpen: true });
					},
					screenshotBtnClickHandler: this.screenshotBtnClickHandler.bind(this),
					hasUnseenChangelog: this.state.hasUnseenChangelog
				})
			),
			(0, _preact.h)(_SavedItemPane2.default, {
				items: this.state.savedItems,
				isOpen: this.state.isSavedItemPaneOpen,
				closeHandler: this.closeSavedItemsPane.bind(this),
				itemClickHandler: this.itemClickHandler.bind(this),
				itemRemoveBtnClickHandler: this.itemRemoveBtnClickHandler.bind(this),
				itemForkBtnClickHandler: this.itemForkBtnClickHandler.bind(this),
				exportBtnClickHandler: this.exportBtnClickHandler.bind(this)
			}),
			_ref3,
			_ref4,
			(0, _preact.h)(
				_Modal2.default,
				{
					show: this.state.isAddLibraryModalOpen,
					closeHandler: function closeHandler() {
						return _this17.setState({ isAddLibraryModalOpen: false });
					}
				},
				(0, _preact.h)(_AddLibrary2.default, {
					js: this.state.currentItem.externalLibs ? this.state.currentItem.externalLibs.js : '',
					css: this.state.currentItem.externalLibs ? this.state.currentItem.externalLibs.css : '',
					onChange: this.onExternalLibChange.bind(this)
				})
			),
			(0, _preact.h)(
				_Modal2.default,
				{
					show: this.state.isNotificationsModalOpen,
					closeHandler: function closeHandler() {
						return _this17.setState({ isNotificationsModalOpen: false });
					}
				},
				(0, _preact.h)(_Notifications.Notifications, {
					onSupportBtnClick: this.openSupportDeveloperModal.bind(this)
				})
			),
			(0, _preact.h)(
				_Modal2.default,
				{
					extraClasses: 'modal--settings',
					show: this.state.isSettingsModalOpen,
					closeHandler: function closeHandler() {
						return _this17.setState({ isSettingsModalOpen: false });
					}
				},
				(0, _preact.h)(_Settings2.default, {
					prefs: this.state.prefs,
					onChange: this.updateSetting.bind(this)
				})
			),
			(0, _preact.h)(
				_Modal2.default,
				{
					extraClasses: 'login-modal',
					show: this.state.isLoginModalOpen,
					closeHandler: function closeHandler() {
						return _this17.setState({ isLoginModalOpen: false });
					}
				},
				_ref5
			),
			(0, _preact.h)(
				_Modal2.default,
				{
					show: this.state.isProfileModalOpen,
					closeHandler: function closeHandler() {
						return _this17.setState({ isProfileModalOpen: false });
					}
				},
				(0, _preact.h)(_Profile.Profile, {
					user: this.state.user,
					logoutBtnHandler: this.logout.bind(this)
				})
			),
			(0, _preact.h)(_HelpModal.HelpModal, {
				show: this.state.isHelpModalOpen,
				closeHandler: function closeHandler() {
					return _this17.setState({ isHelpModalOpen: false });
				},
				onSupportBtnClick: this.openSupportDeveloperModal.bind(this),
				version: '3.3.1'
			}),
			(0, _preact.h)(_SupportDeveloperModal.SupportDeveloperModal, {
				show: this.state.isSupportDeveloperModalOpen,
				closeHandler: function closeHandler() {
					return _this17.setState({ isSupportDeveloperModalOpen: false });
				}
			}),
			(0, _preact.h)(_KeyboardShortcutsModal.KeyboardShortcutsModal, {
				show: this.state.isKeyboardShortcutsModalOpen,
				closeHandler: function closeHandler() {
					return _this17.setState({ isKeyboardShortcutsModalOpen: false });
				}
			}),
			(0, _preact.h)(_AskToImportModal.AskToImportModal, {
				show: this.state.isAskToImportModalOpen,
				closeHandler: function closeHandler() {
					return _this17.setState({ isAskToImportModalOpen: false });
				},
				oldSavedCreationsCount: this.oldSavedCreationsCount,
				importBtnClickHandler: this.importCreationsAndSettingsIntoApp.bind(this),
				dontAskBtnClickHandler: this.dontAskToImportAnymore.bind(this)
			}),
			(0, _preact.h)(_OnboardingModal.OnboardingModal, {
				show: this.state.isOnboardModalOpen,
				closeHandler: function closeHandler() {
					return _this17.setState({ isOnboardModalOpen: false });
				}
			}),
			(0, _preact.h)(
				_preactPortal2.default,
				{ into: 'body' },
				(0, _preact.h)('div', {
					'class': 'modal-overlay',
					onClick: this.modalOverlayClickHandler.bind(this)
				})
			),
			_ref6,
			_ref7
		);
	};

	return App;
}(_preact.Component);

exports.default = App;

/***/ }),

/***/ "y5h4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var HtmlModes = exports.HtmlModes = {
	HTML: 'html',
	MARKDOWN: 'markdown',
	JADE: 'jade' // unsafe eval is put in manifest for this file
};
var CssModes = exports.CssModes = {
	CSS: 'css',
	SCSS: 'scss',
	SASS: 'sass',
	LESS: 'less',
	STYLUS: 'stylus',
	ACSS: 'acss'
};
var JsModes = exports.JsModes = {
	JS: 'js',
	ES6: 'es6',
	COFFEESCRIPT: 'coffee',
	TS: 'typescript'
};
var modes = exports.modes = {};
modes[HtmlModes.HTML] = {
	label: 'HTML',
	cmMode: 'htmlmixed',
	codepenVal: 'none'
};
modes[HtmlModes.MARKDOWN] = {
	label: 'Markdown',
	cmMode: 'markdown',
	codepenVal: 'markdown'
};
modes[HtmlModes.JADE] = {
	label: 'Pug',
	cmMode: 'pug',
	codepenVal: 'pug'
};
modes[JsModes.JS] = {
	label: 'ZenUML',
	cmMode: 'javascript',
	codepenVal: 'none'
};
modes[JsModes.COFFEESCRIPT] = {
	label: 'CoffeeScript',
	cmMode: 'coffeescript',
	codepenVal: 'coffeescript'
};
modes[JsModes.ES6] = {
	label: 'ES6 (Babel)',
	cmMode: 'jsx',
	codepenVal: 'babel'
};
modes[JsModes.TS] = {
	label: 'TypeScript',
	cmPath: 'jsx',
	cmMode: 'text/typescript-jsx',
	codepenVal: 'typescript'
};
modes[CssModes.CSS] = {
	label: 'CSS',
	cmPath: 'css',
	cmMode: 'css',
	codepenVal: 'none'
};
modes[CssModes.SCSS] = {
	label: 'SCSS',
	cmPath: 'css',
	cmMode: 'text/x-scss',
	codepenVal: 'scss'
};
modes[CssModes.SASS] = {
	label: 'SASS',
	cmMode: 'sass',
	codepenVal: 'sass'
};
modes[CssModes.LESS] = {
	label: 'LESS',
	cmPath: 'css',
	cmMode: 'text/x-less',
	codepenVal: 'less'
};
modes[CssModes.STYLUS] = {
	label: 'Stylus',
	cmMode: 'stylus',
	codepenVal: 'stylus'
};
modes[CssModes.ACSS] = {
	label: 'Atomic CSS',
	cmPath: 'css',
	cmMode: 'css',
	codepenVal: 'notsupported',
	cmDisable: true,
	hasSettings: true
};

/***/ })

},["pwNi"]);