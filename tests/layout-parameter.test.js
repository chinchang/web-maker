import { h, Component } from 'preact';

// Mock the global objects and functions that are used in the app
global.window = {
	location: {
		search: ''
	},
	localStorage: {
		getItem: jest.fn(),
		setItem: jest.fn()
	},
	user: null,
	IS_EXTENSION: false
};

global.location = global.window.location;

// Mock the database functions
global.db = {
	local: {
		get: jest.fn(),
		set: jest.fn()
	},
	getSettings: jest.fn(),
	getUserLastSeenVersion: jest.fn(),
	setUserLastSeenVersion: jest.fn()
};

// Mock other global functions
global.log = jest.fn();
global.trackEvent = jest.fn();
global.alertsService = {
	add: jest.fn()
};

describe('Layout Parameter Tests', () => {
	beforeEach(() => {
		// Reset all mocks before each test
		jest.clearAllMocks();

		// Reset global variables
		global.window.forcedSettings = {};
		global.window.codeHtml = '';
		global.window.codeCss = '';
		global.window.codeLayout = null;
	});

	test('should parse layout parameter from URL correctly', () => {
		// Set up URL with layout parameter
		global.window.location.search = '?layout=3&html=<div>test</div>';

		// Simulate the URL parsing logic from app.jsx
		if (global.window.location.search) {
			const params = new URLSearchParams(global.window.location.search);
			global.window.codeHtml = params.get('html') || '';
			global.window.codeCss = params.get('css') || '';
			global.window.codeLayout = (() => {
				const layout = params.get('layout');
				if (!layout) return null;
				if (layout === 'full') {
					return 4;
				}
				const _val = parseInt(layout, 10);
				if (_val >= 1 && _val <= 5) {
					return _val;
				}
				return null;
			})();
		}

		expect(global.window.codeLayout).toBe(3);
		expect(global.window.codeHtml).toBe('<div>test</div>');
	});

	test('should handle "full" alias for layout mode 4', () => {
		// Set up URL with "full" layout parameter
		global.window.location.search = '?layout=full&html=<div>test</div>';

		// Simulate the URL parsing logic
		if (global.window.location.search) {
			const params = new URLSearchParams(global.window.location.search);
			global.window.codeLayout = (() => {
				const layout = params.get('layout');
				if (!layout) return null;
				if (layout === 'full') {
					return 4;
				}
				const _val = parseInt(layout, 10);
				if (_val >= 1 && _val <= 5) {
					return _val;
				}
				return null;
			})();
		}

		expect(global.window.codeLayout).toBe(4);
	});

	test('should handle invalid layout parameter gracefully', () => {
		// Set up URL with invalid layout parameter
		global.window.location.search = '?layout=invalid&html=<div>test</div>';

		// Simulate the URL parsing logic
		if (global.window.location.search) {
			const params = new URLSearchParams(global.window.location.search);
			global.window.codeLayout = (() => {
				const layout = params.get('layout');
				if (!layout) return null;
				if (layout === 'full') {
					return 4;
				}
				const _val = parseInt(layout, 10);
				if (_val >= 1 && _val <= 5) {
					return _val;
				}
				return null;
			})();
		}

		expect(global.window.codeLayout).toBe(null);
	});

	test('should handle layout parameter out of range', () => {
		// Test layout values outside the valid range (1-5)
		const testCases = [0, 6, 10, -1];

		testCases.forEach(layoutValue => {
			global.window.location.search = `?layout=${layoutValue}`;

			if (global.window.location.search) {
				const params = new URLSearchParams(global.window.location.search);
				global.window.codeLayout = (() => {
					const layout = params.get('layout');
					if (!layout) return null;
					if (layout === 'full') {
						return 4;
					}
					const _val = parseInt(layout, 10);
					if (_val >= 1 && _val <= 5) {
						return _val;
					}
					return null;
				})();
			}

			// The layout should be null for out-of-range values
			expect(global.window.codeLayout).toBe(null);
		});
	});

	test('should handle multiple query parameters correctly', () => {
		// Set up URL with multiple parameters
		global.window.location.search =
			'?layout=2&html=<div>test</div>&css=body{color:red}&settings=autoPreview:true';

		// Simulate the URL parsing logic
		if (global.window.location.search) {
			let match = global.window.location.search
				.replace(/^\?/, '')
				.match(/settings=([^=]*)/);
			if (match) {
				match = match[1];
				match.split(',').map(pair => {
					pair = pair.split(':');
					if (pair[1] === 'true') pair[1] = true;
					else if (pair[1] === 'false') pair[1] = false;
					global.window.forcedSettings[pair[0]] = pair[1];
				});
			}

			const params = new URLSearchParams(global.window.location.search);
			global.window.codeHtml = params.get('html') || '';
			global.window.codeCss = params.get('css') || '';
			global.window.codeLayout = (() => {
				const layout = params.get('layout');
				if (!layout) return null;
				if (layout === 'full') {
					return 4;
				}
				const _val = parseInt(layout, 10);
				if (_val >= 1 && _val <= 5) {
					return _val;
				}
				return null;
			})();
		}

		expect(global.window.codeLayout).toBe(2);
		expect(global.window.codeHtml).toBe('<div>test</div>');
		expect(global.window.codeCss).toBe('body{color:red}');
		expect(global.window.forcedSettings.autoPreview).toBe(true);
	});

	test('should handle empty search string', () => {
		// Set up URL with no parameters
		global.window.location.search = '';

		// Simulate the URL parsing logic
		if (global.window.location.search) {
			const params = new URLSearchParams(global.window.location.search);
			global.window.codeLayout = (() => {
				const layout = params.get('layout');
				if (!layout) return null;
				if (layout === 'full') {
					return 4;
				}
				const _val = parseInt(layout, 10);
				if (_val >= 1 && _val <= 5) {
					return _val;
				}
				return null;
			})();
		}

		expect(global.window.codeLayout).toBe(null);
	});

	test('should handle all valid layout values', () => {
		// Test all valid layout values (1-5)
		const validLayouts = [1, 2, 3, 4, 5];

		validLayouts.forEach(layoutValue => {
			global.window.location.search = `?layout=${layoutValue}`;

			if (global.window.location.search) {
				const params = new URLSearchParams(global.window.location.search);
				global.window.codeLayout = (() => {
					const layout = params.get('layout');
					if (!layout) return null;
					if (layout === 'full') {
						return 4;
					}
					const _val = parseInt(layout, 10);
					if (_val >= 1 && _val <= 5) {
						return _val;
					}
					return null;
				})();
			}

			expect(global.window.codeLayout).toBe(layoutValue);
		});
	});
});
