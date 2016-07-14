(function() {
	window.deferred = function () {
		var d = {};
		var promise = new Promise(function (resolve, reject) {
			d.resolve = resolve;
			d.reject = reject;
		});

		d.promise = promise;
		return Object.assign(d, promise);
	};
})();