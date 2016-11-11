(function () {
	window.$ = document.querySelector.bind(document);
	window.$all = document.querySelectorAll.bind(document);

	// https://github.com/substack/semver-compare/blob/master/index.js
	function semverCompare(a, b) {
		var pa = a.split('.');
		var pb = b.split('.');
		for (var i = 0; i < 3; i++) {
			var na = Number(pa[i]);
			var nb = Number(pb[i]);
			if (na > nb) { return 1; }
			if (nb > na) { return -1; }
			if (!isNaN(na) && isNaN(nb)) { return 1; }
			if (isNaN(na) && !isNaN(nb)) { return -1; }
		}
		return 0;
	}

	function generateRandomId(len) {
		len = len || 10;
		var id = '';
		for (var i = len; i--;) {
			id += String.fromCharCode(~~(Math.random() * 52) + 65);
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
			console.log.apply(console, [].splice.call(arguments, 0));
		}
	}

	window.utils = {
		semverCompare: semverCompare,
		generateRandomId: generateRandomId,
		onButtonClick: onButtonClick,
		log: log
	};
})();
