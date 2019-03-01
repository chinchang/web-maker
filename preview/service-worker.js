const CACHE_NAME = 'webmaker-vfiles';

self.addEventListener('activate', event => {
	clients.claim();
	console.log('Now ready to handle fetches!');
});

self.addEventListener('fetch', function(event) {
	// console.log('fetch event', event.request.url, event.request);
	event.respondWith(
		caches.open(CACHE_NAME).then(function(cache) {
			return cache
				.match(event.request)
				.then(response => {
					// console.log('responding with ', response);
					if (response !== undefined) {
						return response;
					}
					return fetch(event.request);
				})
				.catch(function(e) {
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
	}
	return 'text/html; charset=UTF-8';
}

self.addEventListener('message', function(e) {
	// console.log('message aya sw main', e.data);
	caches.open(CACHE_NAME).then(function(cache) {
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
