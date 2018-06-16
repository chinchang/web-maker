export function deferred() {
	var d = {};
	var promise = new Promise(function (resolve, reject) {
		d.resolve = resolve;
		d.reject = reject;
	});

	// Add the native promise as a key on deferred object.
	d.promise = promise;
	// Also move all props/methods of native promise on the deferred obj.
	return Object.assign(d, promise);
}
