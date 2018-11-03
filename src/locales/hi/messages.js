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
		'Add a JS/CSS library':
			'JS/CSS \u0932\u093E\u0907\u092C\u094D\u0930\u0947\u0930\u0940 \u091C\u094B\u0921\u093C\u0947\u0902',
		'Add library':
			'\u0932\u093E\u0907\u092C\u094D\u0930\u0947\u0930\u0940 \u091C\u094B\u0921\u093C\u0947\u0902',
		Console: '\u0915\u0902\u0938\u094B\u0932',
		Login: '\u0932\u094B\u0917\u093F\u0928 \u0915\u0930\u0947\u0902',
		New: '\u0928\u092F\u0940 \u092C\u0928\u093E\u090F\u0901',
		Open: '\u0916\u094B\u0932\u0947\u0902',
		Run: '\u091A\u0932\u093E\u090F\u0901',
		Save: '\u0938\u0947\u0935 \u0915\u0930\u0947\u0902',
		Signup: '\u0938\u093E\u0907\u0928\u0905\u092A \u0915\u0930\u0947\u0902'
	}
};
