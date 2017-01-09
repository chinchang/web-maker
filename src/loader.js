(function(w) {

	window.loadJS = function(src) {
		return new Promise(function (resolve) {
			var ref = w.document.getElementsByTagName("script")[0];
			var script = w.document.createElement("script");
			script.src = src;
			script.async = true;
			ref.parentNode.insertBefore(script, ref);
			script.onload = function () {
				resolve();
			};
		});
	};

})(window);
