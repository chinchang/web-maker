self.addEventListener('fetch', function(event) {
	// console.log("fetch event", event.request.url);
	if (event.request.url.indexOf('/user/') !== -1) {
		event.respondWith(
			caches.match(event.request).then(response => {
				// console.log("responding with ", response);
				if (response !== undefined) {
					return response;
				}
				return '';
			})
		);
	}
});

function getContentType(url) {
	if (url.match(/\.html$/)) {
		return 'text/html; charset=UTF-8';
	} else if (url.match(/\.css$/)) {
		return 'text/css; charset=UTF-8';
	}
	if (url.match(/\.js$/)) {
		return 'application/javascript; charset=UTF-8';
	}
	return 'text/html; charset=UTF-8';
}
self.addEventListener('message', function(e) {
	// console.log("message aya sw main", e.data);
	caches.open('webmaker-files').then(function(cache) {
		for (const url in e.data) {
			if (Object.prototype.hasOwnProperty.call(e.data, url)) {
				// console.log('Received data', url, e.data[url])
				cache.put(
					url,
					new Response(e.data[url], {
						headers: {
							'Content-Type': getContentType(url)
						}
					})
				);
			}
		}
	});
});
