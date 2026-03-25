const CACHE_NAME = 'webmaker-vfiles';

self.addEventListener('activate', event => {
	clients.claim();
	console.log('Now ready to handle fetches!');
});

self.addEventListener('fetch', function (event) {
	console.log('fetch event', event.request.url, event.request);
	event.respondWith(
		caches.open(CACHE_NAME).then(function (cache) {
			return cache
				.match(event.request)
				.then(response => {
					// console.log('responding with ', response);
					if (response !== undefined) {
						return response;
					}
					return fetch(event.request);
				})
				.catch(function (e) {
					// Fall back to just fetch()ing the request if some unexpected error
					// prevented the cached response from being valid.
					console.warn(
						'Couldn\'t serve response for "%s" from cache: %O',
						event.request.url,
						e
					);
					return fetch(event.request);
				});
		})
	);
	// }
});

function getContentType(url) {
	if (url.match(/\.html$/)) {
		return 'text/html; charset=UTF-8';
	} else if (url.match(/\.css$/)) {
		return 'text/css; charset=UTF-8';
	} else if (url.match(/\.js$/)) {
		return 'application/javascript; charset=UTF-8';
	} else if (url.match(/\.json$/)) {
		return 'application/json; charset=UTF-8';
	} else if (url.match(/\.png$/)) {
		return 'image/png';
	} else if (url.match(/\.jpe?g$/)) {
		return 'image/jpeg';
	} else if (url.match(/\.gif$/)) {
		return 'image/gif';
	} else if (url.match(/\.svg$/)) {
		return 'image/svg+xml';
	} else if (url.match(/\.webp$/)) {
		return 'image/webp';
	}
	return 'text/html; charset=UTF-8';
}

self.addEventListener('message', function (e) {
	// console.log('message aya sw main', e.data);
	caches.open(CACHE_NAME).then(function (cache) {
		for (const url in e.data) {
			if (Object.prototype.hasOwnProperty.call(e.data, url)) {
				var value = e.data[url];
				var contentType = getContentType(url);
				var response;
				if (value instanceof Blob || value instanceof ArrayBuffer) {
					console.log('Put in cache', url);
					response = new Response(value, {
						headers: { 'Content-Type': contentType }
					});
				} else {
					response = new Response(value, {
						headers: { 'Content-Type': contentType }
					});
				}
				cache.put(url, response);
			}
		}
	});
});
