/* eslint-disable */ export default {
	languageData: {
		plurals: function(n, ord) {
			if (ord)
				return n == 1
					? 'one'
					: n == 2 || n == 3
					? 'two'
					: n == 4
					? 'few'
					: n == 6
					? 'many'
					: 'other';
			return n >= 0 && n <= 1 ? 'one' : 'other';
		}
	},
	messages: {
		'Add a JS/CSS library': 'Add a JS/CSS library',
		'Add library': 'Add library',
		Console: 'Console',
		Login: '\u0932\u0949\u0917\u093F\u0928',
		New: '\u0928\u092F\u093E \u092C\u0928\u093E\u090F\u0901',
		Open: 'Open',
		Run: 'Run',
		Save: 'Save',
		Signup: 'Signup'
	}
};
