(function(w) {
	window.loadJS = function(src) {
		var d = deferred();
		var ref = w.document.getElementsByTagName('script')[0];
		var script = w.document.createElement('script');
		script.src = src;
		script.async = true;
		ref.parentNode.insertBefore(script, ref);
		script.onload = function() {
			d.resolve();
		};
		return d.promise;
	};
})(window);
