/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/FiraCode.ttf","fa1f8c8961adca519738d9518139579c"],["/changelog.html","7f40f4b9a97ca60826e7ad09e401d570"],["/icon-48.png","ca68956f464ed4fd2e09c66d5edaed5f"],["/index.html","f590d32fdec72e184df9a62a69c7d467"],["/lib/atomizer.browser.js","d080c3547a4e431d57bd6252bfe81e1a"],["/lib/babel-polyfill.min.js","6fef55c62df380d41c8f42f8b0c1f4da"],["/lib/babel.min.js","77a1a84bbc2661db874c738f9b3ba375"],["/lib/code-blast.js","48f8f054be45d3ad5054a7c7f87be0ff"],["/lib/codemirror/mode/coffeescript/coffeescript.js","dea87b9f4c669789c4760605d947f1a9"],["/lib/codemirror/mode/css/css.js","6c9ca32a78c120340e588ed3df734138"],["/lib/codemirror/mode/css/gss.html","9afa6e2f3a7daa6127a3f26e2e68005c"],["/lib/codemirror/mode/css/gss_test.js","e40c6fd9abdc6edc2b29e521bda726e1"],["/lib/codemirror/mode/css/less.html","a35ff50857d48bb2f4df8ac737f35d64"],["/lib/codemirror/mode/css/scss.html","8c96251f27727a9b23b45c41511e23a0"],["/lib/codemirror/mode/haml/haml.js","9abc1679e0f54dcdd62d2326ed6133f5"],["/lib/codemirror/mode/htmlembedded/htmlembedded.js","67f745ab3879bf7bc3029ac75ea3e181"],["/lib/codemirror/mode/htmlmixed/htmlmixed.js","2d6915b576f267e93f0e1cf72f31af37"],["/lib/codemirror/mode/javascript/javascript.js","3b2f1591e3175a24846cb182943f2a40"],["/lib/codemirror/mode/javascript/json-ld.html","a2a5069194b78b6b5523cace263cab06"],["/lib/codemirror/mode/javascript/typescript.html","76c2ffb883a133aa0fc5cc75ec0c56f5"],["/lib/codemirror/mode/jsx/jsx.js","7bee6944931c2cc6ccd99b50fca637db"],["/lib/codemirror/mode/markdown/markdown.js","30dd4984e2e929429d70cf5174b35c5d"],["/lib/codemirror/mode/meta.js","6e456ea5fd8920c85d5281bd1efecb4c"],["/lib/codemirror/mode/pug/pug.js","e988fd72c82f3b11836f6a06f7452436"],["/lib/codemirror/mode/sass/sass.js","bd31ac70e9a457abc2789c2b83a21984"],["/lib/codemirror/mode/stylus/stylus.js","81e2d281ecbb1dcf5c86857097ae60a7"],["/lib/codemirror/mode/xml/xml.js","80f64aaafa6af7844d14f32f3219bb26"],["/lib/codemirror/theme/3024-day.css","73c8f41583b4b71dbe1e5eac5c96f1a9"],["/lib/codemirror/theme/3024-night.css","745180be9a932f24c6c0dd4ebdf5a0ed"],["/lib/codemirror/theme/abcdef.css","8004cb71fd65e58bdfa64fdd55241315"],["/lib/codemirror/theme/ambiance-mobile.css","256f2dd130b80c6afaa40fddf700d12a"],["/lib/codemirror/theme/ambiance.css","6a200e1f3976929816cf3ac4675c810a"],["/lib/codemirror/theme/base16-dark.css","84b6347918411d58d7f9b65a7ee87f65"],["/lib/codemirror/theme/base16-light.css","037c7f3d16fe6d5ae2baa532e334172b"],["/lib/codemirror/theme/base2tone-meadow-dark.css","f9dd12e2e51fc1575c57f3e5edc2232f"],["/lib/codemirror/theme/bespin.css","cc414e4ec18bc89b3c79935b0e27fc20"],["/lib/codemirror/theme/blackboard.css","cf9366960ff65c8101793bc64fe13e88"],["/lib/codemirror/theme/cobalt.css","3488b576456693fd7ced2da0e10c8a16"],["/lib/codemirror/theme/colorforth.css","b2ee8d2296277fc2811a7473ee4e9977"],["/lib/codemirror/theme/dracula.css","e514d652ae86bfeaed34237b7d3afe44"],["/lib/codemirror/theme/duotone-dark.css","02ec891b23125aaf625d978a39fd24ca"],["/lib/codemirror/theme/duotone-light.css","608d11459665117d708651ce7f803fde"],["/lib/codemirror/theme/eclipse.css","194369eec66630cfaf662ce5f0a193be"],["/lib/codemirror/theme/elegant.css","0a4227e805a9d5f73a55dd248c1b052d"],["/lib/codemirror/theme/erlang-dark.css","b5543f5273c968449760ab0d6a2af6dc"],["/lib/codemirror/theme/hopscotch.css","b924ed31af30b1c68e5a01fc3c9b0553"],["/lib/codemirror/theme/icecoder.css","576d776abdf7e28ea9f84e2eb161a20d"],["/lib/codemirror/theme/isotope.css","7bb44bff5190c427de5ae750d6369633"],["/lib/codemirror/theme/lesser-dark.css","da2c896bff035cec86fa98b6dc13f7cc"],["/lib/codemirror/theme/liquibyte.css","9f37e7a4f3c02bec9bb735b78ed082d6"],["/lib/codemirror/theme/material.css","11e812a3688805b5c187a6e6852bafe1"],["/lib/codemirror/theme/mbo.css","55ff4bdd8a92c3dcbfd5421c532b3059"],["/lib/codemirror/theme/mdn-like.css","79f8dabc5593d01d27bc824b801f9f05"],["/lib/codemirror/theme/midnight.css","950e76dca6461ee1a2eac39f2d886613"],["/lib/codemirror/theme/monokai.css","31c75ebee6311d49c046ffbbb91028f4"],["/lib/codemirror/theme/neat.css","6b19894b9787c6791c250a95d0d4f8d6"],["/lib/codemirror/theme/neo.css","2886072b53043c167e6f8765606c705c"],["/lib/codemirror/theme/night.css","fe3ce7650a77e7e3887816dd7b6d880d"],["/lib/codemirror/theme/panda-syntax.css","acbf94261e43c1f29c2252eb445de032"],["/lib/codemirror/theme/paraiso-dark.css","3c24cee0dfac767713840b24e8359c99"],["/lib/codemirror/theme/paraiso-light.css","e245bbfd22b4f61efe526ff13903f19e"],["/lib/codemirror/theme/pastel-on-dark.css","48aae1a42733db57bd0a260ce0d83975"],["/lib/codemirror/theme/railscasts.css","a5e7682d89da46244e5464d9572e24d8"],["/lib/codemirror/theme/rubyblue.css","52bb601017a90bca522d66f6e82e73aa"],["/lib/codemirror/theme/seti.css","f71668880eb1625f420ceaad670436f0"],["/lib/codemirror/theme/solarized dark.css","4d05a166d713bb1ac24833061c1522d7"],["/lib/codemirror/theme/solarized light.css","4d05a166d713bb1ac24833061c1522d7"],["/lib/codemirror/theme/the-matrix.css","33c49ceeedafd0a08e712e465e3ad3ce"],["/lib/codemirror/theme/tomorrow-night-bright.css","777d36e1c5bbfeb3bf2ca8dd607eee93"],["/lib/codemirror/theme/tomorrow-night-eighties.css","5ceb5531fbe074d5190b55e8c725051e"],["/lib/codemirror/theme/ttcn.css","d2cb74dfae563a10e9c286357429ea8b"],["/lib/codemirror/theme/twilight.css","684040adf66ef89355cb7ebc6b54b00b"],["/lib/codemirror/theme/vibrant-ink.css","f10004836fb29cc9a08c987d3e18938a"],["/lib/codemirror/theme/xq-dark.css","60f162f0c4240e7352364d436b5598fa"],["/lib/codemirror/theme/xq-light.css","447e80da7fe8c5c2bcf39127200cead2"],["/lib/codemirror/theme/yeti.css","623dc805bc84dd6d25deef376593354e"],["/lib/codemirror/theme/zenburn.css","94ad50bf3d048ed92cc513cd901dc685"],["/lib/coffee-script.js","a43664b71b7b96e90046a605f6fa51a1"],["/lib/emmet.js","6fff639e42ec8c00f4f4ff30b52e60df"],["/lib/esprima.js","dfe041b0a8a5dda5c62ed8d2a1d3a666"],["/lib/hint.min.css","0dc51e410a460622949f927dfda1bc32"],["/lib/inlet.css","8242884724cfac965b53cf0a3d774c0b"],["/lib/inlet.min.js","7e389291ff8decc675a32e376e318660"],["/lib/jade.js","529e365c68f8d5efc4cea18be310bd76"],["/lib/less.min.js","6fd457ee80aaf9aa8758fe8a2345c970"],["/lib/marked.js","9f948a81f35613d44efa9322cbaf450d"],["/lib/sass.js","1263518af3f8b2090c9b08d195bd20d9"],["/lib/screenlog.js","dde029b72748bbc12532b309a717c2ca"],["/lib/split.js","40ac1c1fba622660e3750405b18ab0bf"],["/lib/stylus.min.js","58f6030903ab52f596fb407dcd3df34f"],["/lib/typescript.js","cc0882a3185037052e21fa06a38ef077"],["/script.js","fb4b5d3c1658541fd9f94fbf89c35d84"],["/style.css","dff1608df4d68d26cb01f61240e059b4"],["/vendor.css","6ed94306315b8aaf789c53091c23bb4b"],["/vendor.js","43e7f646f4f0c6043e24a9e958fc7e29"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







