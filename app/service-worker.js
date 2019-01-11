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

var precacheConfig = [["FiraCode.ttf","fa1f8c8961adca519738d9518139579c"],["FixedSys.ttf","43cc87e8f9adba81b9d63b6e2d15db57"],["Inconsolata.ttf","b0639eb725c0df94f68b779889679457"],["Monoid.ttf","9b27db986ad2a74c522e9d3b6f7e2a63"],["animation/10s.gif","36ad6e1df99af289c2f23963e44c11bd"],["animation/open-up-stage.gif","a299382c43208809e1cd05de5b217ccb"],["assets/advanced-icon.png","784c0014f70f2dee7989848b29aa1f9c"],["assets/basic-icon.png","184ca7e5a4be8df84fd5699f776975be"],["assets/html5-logo.svg","1f4630ca7f4e95a6cb2c95d3ac3e7947"],["assets/js13kgames-square-logo.png","7c1400c0a7fd6b771b8cb0c6d9602f03"],["assets/js13kgames.png","cf8232690591545e25afe952ada8fdeb"],["assets/patreon.png","8b4321f782e84764e556af3dee32a131"],["assets/preact-logo.svg","d2f74a71aff2483afe4a24f4477d308e"],["assets/react-logo.svg","694d5c5f07c96175602ca23218057649"],["assets/star-icon.png","c768d6788e2fcd10c74d2575c5ae7fbb"],["assets/vue-logo.svg","81e82ce71855df1ca49d6dffdbfceec8"],["detached-window.js","f05b0a0f2a8cc967028fb4f95f4a9614"],["icon-16.png","53e877e590fe798e6c738970121666e4"],["icon-48.png","d8b84ed54fff85c852cf1f54259a572c"],["icons/icon-128x128.png","bfdc132184384bf5bf6cf34835cbce20"],["icons/icon-144x144.png","252be3837441f79208237747f9174af2"],["icons/icon-152x152.png","d1767dc31f2185979739273633468373"],["icons/icon-192x192.png","e6150ca4a84d684e02ee60cc2708131f"],["icons/icon-384x384.png","056a746d18fa943ea1a773325559d671"],["icons/icon-512x512.png","13e470b61e539649e0567687c597c792"],["icons/icon-72x72.png","f336e8ae87d17759eb3235a9186e6e7b"],["icons/icon-96x96.png","259cc1f173cf5e8bdbff4b84e1193b89"],["index.html","90ae8f42f7baae403cfa898c52e80f3f"],["lib/bundle.js","2e88f06b8405cead4d24d4b974b5da22"],["lib/code-blast.js","48f8f054be45d3ad5054a7c7f87be0ff"],["lib/codemirror/addon/comment/comment.js","a9274c537d40a25aa372ff4a511b6857"],["lib/codemirror/addon/comment/continuecomment.js","2bad52d5a0b57d8f43e0e5b90bb25725"],["lib/codemirror/addon/dialog/dialog.css","c89dce10b44d2882a024e7befc2b63f5"],["lib/codemirror/addon/dialog/dialog.js","eb78922db190627d63be39f54b6ae864"],["lib/codemirror/addon/display/autorefresh.js","5acf6d9221a489bbd0a1d5868eeeaa6f"],["lib/codemirror/addon/display/fullscreen.css","1a278e72b51528270f8ce9ec991929a1"],["lib/codemirror/addon/display/fullscreen.js","fb86184c4fb36398188f2199fd28f167"],["lib/codemirror/addon/display/panel.js","56e9558f431d1dffd85bf18ff2c9cd8d"],["lib/codemirror/addon/display/placeholder.js","d11008c6283fa41c5aab8cd99ac78975"],["lib/codemirror/addon/display/rulers.js","ff4f724e824fe42d72404a4fe4a756fe"],["lib/codemirror/addon/edit/closebrackets.js","16b8a913cb345f7105b1e5df9990bf0a"],["lib/codemirror/addon/edit/closetag.js","c85e0e28f335f2e00c993ae90cee18a2"],["lib/codemirror/addon/edit/continuelist.js","1f902d5931a4c5d75b3d2b13aff71168"],["lib/codemirror/addon/edit/matchbrackets.js","94c58e98823144e56932aa2611c51dff"],["lib/codemirror/addon/edit/matchtags.js","545127ffedea5d77c0f68c809c75c5b6"],["lib/codemirror/addon/edit/trailingspace.js","650f095b187881451b0166d16ffd4091"],["lib/codemirror/addon/fold/brace-fold.js","13f986f14247d953551bdfe93b27699e"],["lib/codemirror/addon/fold/comment-fold.js","418aa5a8cc030ec09fdbf3d3f91e79d1"],["lib/codemirror/addon/fold/foldcode.js","76c21fd4c3f14d1a61765324ec82266b"],["lib/codemirror/addon/fold/foldgutter.css","38bb68770b6f7ebaa7adea770a68e0b1"],["lib/codemirror/addon/fold/foldgutter.js","f7933de4d024fe89401a12ec7652627e"],["lib/codemirror/addon/fold/indent-fold.js","b17f35bdd388f737113271b9e9070ea3"],["lib/codemirror/addon/fold/markdown-fold.js","c8783b56c820030045a57f291660ea20"],["lib/codemirror/addon/fold/xml-fold.js","f173dec3ccb5d6df5f37b9a99ecc438a"],["lib/codemirror/addon/hint/anyword-hint.js","6b1df80699158516007e9172861f5ba3"],["lib/codemirror/addon/hint/css-hint.js","0331f17931864c79688b80c3a8fcf0bf"],["lib/codemirror/addon/hint/html-hint.js","6b398a6ef3473b9f889092495fcc1545"],["lib/codemirror/addon/hint/javascript-hint.js","8febf4d6664e133fac9da1da672564cd"],["lib/codemirror/addon/hint/show-hint.css","630e320a614e7732f6ce1bf37147f27f"],["lib/codemirror/addon/hint/show-hint.js","1bfbe68cfd92aad65aa1e49d54fd0c3e"],["lib/codemirror/addon/hint/sql-hint.js","1513156d6c3bb094e19f4759fbabd7cf"],["lib/codemirror/addon/hint/xml-hint.js","21d019d58516804262957d8879576908"],["lib/codemirror/addon/lint/coffeescript-lint.js","a867c61ab04b4309206ba371bdde9fb7"],["lib/codemirror/addon/lint/css-lint.js","fd09f81d97cf3eb681cc5742d76ec47f"],["lib/codemirror/addon/lint/html-lint.js","ebc76e3d7446c73104fae7d143261a9e"],["lib/codemirror/addon/lint/javascript-lint.js","5576a5092afdae4e7990abcbc92d0425"],["lib/codemirror/addon/lint/json-lint.js","49afe4d1a791c115de21553c28f1a6cf"],["lib/codemirror/addon/lint/lint.css","5f5d243947ec3ae1b8f37d85f0fa2a2d"],["lib/codemirror/addon/lint/lint.js","e937b42165f6ac84a30182c1a93ac878"],["lib/codemirror/addon/lint/yaml-lint.js","117815f724aa2c3d671801ccedaa86ac"],["lib/codemirror/addon/mode/loadmode.js","bc3c29fecceff0785b086b6e1c6f6b7c"],["lib/codemirror/addon/mode/multiplex.js","5bd0e78901200adb66a095501bffe61a"],["lib/codemirror/addon/mode/multiplex_test.js","f517110cde96b5b4356557a7792fdcf3"],["lib/codemirror/addon/mode/overlay.js","7abff7c501c40008fc541414e803d954"],["lib/codemirror/addon/mode/simple.js","aebf64be9a16aa3dfe45ab91b5b0b588"],["lib/codemirror/addon/runmode/colorize.js","b0d93d54ee9bf76b246ea7cae39d6e75"],["lib/codemirror/addon/runmode/runmode-standalone.js","54b1bc5448bbdfb53fdb3cbdc6740ef7"],["lib/codemirror/addon/runmode/runmode.js","44916ba81dd868098922bdb8e6874e80"],["lib/codemirror/addon/runmode/runmode.node.js","c9af1698167e3de82a5e590e6ae23a73"],["lib/codemirror/addon/scroll/annotatescrollbar.js","7206739f16151e2b54468fc9b8cea190"],["lib/codemirror/addon/scroll/scrollpastend.js","68e06dd3d77a87661790bbb7ebe2f080"],["lib/codemirror/addon/scroll/simplescrollbars.css","0352ba51fd6a422fe6cc44925e33ad88"],["lib/codemirror/addon/scroll/simplescrollbars.js","19ac106aee495b013b170a8ff82ac532"],["lib/codemirror/addon/search/jump-to-line.js","3299737b0d8205f1e67d112de17a9b2d"],["lib/codemirror/addon/search/match-highlighter.js","4d39f82e7181fa156b171b576f631efc"],["lib/codemirror/addon/search/matchesonscrollbar.css","00ea2770c568a848190bcf52e4241276"],["lib/codemirror/addon/search/matchesonscrollbar.js","2cece6de1e3ad73489c170c8f08dd561"],["lib/codemirror/addon/search/search.js","f0ee6a4ceb2ae7a0d112af53f98c40d1"],["lib/codemirror/addon/search/searchcursor.js","a11e9186f471515209a5583f1af6421c"],["lib/codemirror/addon/selection/active-line.js","b855254be1455e111bdbc6916552e8d7"],["lib/codemirror/addon/selection/mark-selection.js","49df440e41a6f54264bce4f7ed7d7d05"],["lib/codemirror/addon/selection/selection-pointer.js","394ed7c792ed1954c6473d72e17156f9"],["lib/codemirror/addon/wrap/hardwrap.js","c256c76283cc03d9b9a7a3c746894bb2"],["lib/codemirror/keymap/sublime.js","7f37a7f645078f468e841247520a727b"],["lib/codemirror/keymap/vim.js","4d173a7373b9f663d2968106f2bb6e3f"],["lib/codemirror/lib/codemirror.css","3109cdca46ea5a059ba1a641e2ea7505"],["lib/codemirror/lib/codemirror.js","df6c3ef00c527b89ae73a0cf7d669d7e"],["lib/codemirror/mode/coffeescript/coffeescript.js","dea87b9f4c669789c4760605d947f1a9"],["lib/codemirror/mode/css/css.js","6c9ca32a78c120340e588ed3df734138"],["lib/codemirror/mode/css/gss.html","9afa6e2f3a7daa6127a3f26e2e68005c"],["lib/codemirror/mode/css/gss_test.js","e40c6fd9abdc6edc2b29e521bda726e1"],["lib/codemirror/mode/css/less.html","a35ff50857d48bb2f4df8ac737f35d64"],["lib/codemirror/mode/css/scss.html","8c96251f27727a9b23b45c41511e23a0"],["lib/codemirror/mode/haml/haml.js","9abc1679e0f54dcdd62d2326ed6133f5"],["lib/codemirror/mode/htmlembedded/htmlembedded.js","67f745ab3879bf7bc3029ac75ea3e181"],["lib/codemirror/mode/htmlmixed/htmlmixed.js","2d6915b576f267e93f0e1cf72f31af37"],["lib/codemirror/mode/javascript/javascript.js","3b2f1591e3175a24846cb182943f2a40"],["lib/codemirror/mode/javascript/json-ld.html","a2a5069194b78b6b5523cace263cab06"],["lib/codemirror/mode/javascript/typescript.html","76c2ffb883a133aa0fc5cc75ec0c56f5"],["lib/codemirror/mode/jsx/jsx.js","7bee6944931c2cc6ccd99b50fca637db"],["lib/codemirror/mode/markdown/markdown.js","30dd4984e2e929429d70cf5174b35c5d"],["lib/codemirror/mode/meta.js","6e456ea5fd8920c85d5281bd1efecb4c"],["lib/codemirror/mode/pug/pug.js","e988fd72c82f3b11836f6a06f7452436"],["lib/codemirror/mode/sass/sass.js","bd31ac70e9a457abc2789c2b83a21984"],["lib/codemirror/mode/stylus/stylus.js","81e2d281ecbb1dcf5c86857097ae60a7"],["lib/codemirror/mode/xml/xml.js","80f64aaafa6af7844d14f32f3219bb26"],["lib/codemirror/theme/3024-day.css","73c8f41583b4b71dbe1e5eac5c96f1a9"],["lib/codemirror/theme/3024-night.css","745180be9a932f24c6c0dd4ebdf5a0ed"],["lib/codemirror/theme/abcdef.css","8004cb71fd65e58bdfa64fdd55241315"],["lib/codemirror/theme/ambiance-mobile.css","256f2dd130b80c6afaa40fddf700d12a"],["lib/codemirror/theme/ambiance.css","6a200e1f3976929816cf3ac4675c810a"],["lib/codemirror/theme/base16-dark.css","84b6347918411d58d7f9b65a7ee87f65"],["lib/codemirror/theme/base16-light.css","037c7f3d16fe6d5ae2baa532e334172b"],["lib/codemirror/theme/base2tone-meadow-dark.css","f9dd12e2e51fc1575c57f3e5edc2232f"],["lib/codemirror/theme/bespin.css","cc414e4ec18bc89b3c79935b0e27fc20"],["lib/codemirror/theme/blackboard.css","cf9366960ff65c8101793bc64fe13e88"],["lib/codemirror/theme/cobalt.css","3488b576456693fd7ced2da0e10c8a16"],["lib/codemirror/theme/colorforth.css","b2ee8d2296277fc2811a7473ee4e9977"],["lib/codemirror/theme/dracula.css","e514d652ae86bfeaed34237b7d3afe44"],["lib/codemirror/theme/duotone-dark.css","02ec891b23125aaf625d978a39fd24ca"],["lib/codemirror/theme/duotone-light.css","608d11459665117d708651ce7f803fde"],["lib/codemirror/theme/eclipse.css","194369eec66630cfaf662ce5f0a193be"],["lib/codemirror/theme/elegant.css","0a4227e805a9d5f73a55dd248c1b052d"],["lib/codemirror/theme/erlang-dark.css","b5543f5273c968449760ab0d6a2af6dc"],["lib/codemirror/theme/hopscotch.css","b924ed31af30b1c68e5a01fc3c9b0553"],["lib/codemirror/theme/icecoder.css","576d776abdf7e28ea9f84e2eb161a20d"],["lib/codemirror/theme/isotope.css","7bb44bff5190c427de5ae750d6369633"],["lib/codemirror/theme/lesser-dark.css","da2c896bff035cec86fa98b6dc13f7cc"],["lib/codemirror/theme/liquibyte.css","9f37e7a4f3c02bec9bb735b78ed082d6"],["lib/codemirror/theme/material.css","11e812a3688805b5c187a6e6852bafe1"],["lib/codemirror/theme/mbo.css","55ff4bdd8a92c3dcbfd5421c532b3059"],["lib/codemirror/theme/mdn-like.css","79f8dabc5593d01d27bc824b801f9f05"],["lib/codemirror/theme/midnight.css","950e76dca6461ee1a2eac39f2d886613"],["lib/codemirror/theme/monokai.css","31c75ebee6311d49c046ffbbb91028f4"],["lib/codemirror/theme/neat.css","6b19894b9787c6791c250a95d0d4f8d6"],["lib/codemirror/theme/neo.css","2886072b53043c167e6f8765606c705c"],["lib/codemirror/theme/night.css","fe3ce7650a77e7e3887816dd7b6d880d"],["lib/codemirror/theme/panda-syntax.css","acbf94261e43c1f29c2252eb445de032"],["lib/codemirror/theme/paraiso-dark.css","3c24cee0dfac767713840b24e8359c99"],["lib/codemirror/theme/paraiso-light.css","e245bbfd22b4f61efe526ff13903f19e"],["lib/codemirror/theme/pastel-on-dark.css","48aae1a42733db57bd0a260ce0d83975"],["lib/codemirror/theme/railscasts.css","a5e7682d89da46244e5464d9572e24d8"],["lib/codemirror/theme/rubyblue.css","52bb601017a90bca522d66f6e82e73aa"],["lib/codemirror/theme/seti.css","f71668880eb1625f420ceaad670436f0"],["lib/codemirror/theme/solarized dark.css","4d05a166d713bb1ac24833061c1522d7"],["lib/codemirror/theme/solarized light.css","4d05a166d713bb1ac24833061c1522d7"],["lib/codemirror/theme/the-matrix.css","33c49ceeedafd0a08e712e465e3ad3ce"],["lib/codemirror/theme/tomorrow-night-bright.css","777d36e1c5bbfeb3bf2ca8dd607eee93"],["lib/codemirror/theme/tomorrow-night-eighties.css","5ceb5531fbe074d5190b55e8c725051e"],["lib/codemirror/theme/ttcn.css","d2cb74dfae563a10e9c286357429ea8b"],["lib/codemirror/theme/twilight.css","684040adf66ef89355cb7ebc6b54b00b"],["lib/codemirror/theme/vibrant-ink.css","f10004836fb29cc9a08c987d3e18938a"],["lib/codemirror/theme/xq-dark.css","60f162f0c4240e7352364d436b5598fa"],["lib/codemirror/theme/xq-light.css","447e80da7fe8c5c2bcf39127200cead2"],["lib/codemirror/theme/yeti.css","623dc805bc84dd6d25deef376593354e"],["lib/codemirror/theme/zenburn.css","94ad50bf3d048ed92cc513cd901dc685"],["lib/emmet.js","8e781cd551cda534eec6e8f789cc5442"],["lib/esprima.js","dfe041b0a8a5dda5c62ed8d2a1d3a666"],["lib/firebase-firestore.js","891f0df03133590fda6de8a8e60a99be"],["lib/firebase.js","1e7fcd644740ffc7f3ef0bc30e78920f"],["lib/hint.min.css","0dc51e410a460622949f927dfda1bc32"],["lib/inlet.css","8242884724cfac965b53cf0a3d774c0b"],["lib/inlet.min.js","7e389291ff8decc675a32e376e318660"],["lib/jquery-3.3.1.min.js","a09e13ee94d51c524b7e2a728c7d4039"],["lib/prettier-worker.js","f6cf61913a9012ac24a49ad821b7d2a5"],["lib/prettier/parser-babylon.js","a1f0b8a04b1c9d3a990b48fe716edb37"],["lib/prettier/parser-html.js","af05f895b0da344b48c2e15531c9f1fd"],["lib/prettier/parser-postcss.js","7198a258311de8ab6dfe4ad5f45ea538"],["lib/prettier/standalone.js","7aed2660b4fdeb5dfdd486d238719d01"],["lib/screenlog.js","974cb1ec0473b11ae4834028c1820816"],["lib/split.js","40ac1c1fba622660e3750405b18ab0bf"],["lib/transpilers/atomizer.browser.js","c2925b84a627b017797664530f284618"],["lib/transpilers/babel-polyfill.min.js","6fef55c62df380d41c8f42f8b0c1f4da"],["lib/transpilers/babel.min.js","77a1a84bbc2661db874c738f9b3ba375"],["lib/transpilers/coffee-script.js","df68698ca5d438d7fb70c3c259155a37"],["lib/transpilers/jade.js","529e365c68f8d5efc4cea18be310bd76"],["lib/transpilers/less.min.js","6fd457ee80aaf9aa8758fe8a2345c970"],["lib/transpilers/marked.js","93163e72d380637970dc957c6cf75a77"],["lib/transpilers/sass.js","1263518af3f8b2090c9b08d195bd20d9"],["lib/transpilers/sass.worker.js","0d6c944b36008580fbedc09642f7f656"],["lib/transpilers/stylus.min.js","58f6030903ab52f596fb407dcd3df34f"],["lib/transpilers/typescript.js","cc0882a3185037052e21fa06a38ef077"],["lib/vue-sequence-ext.css","4e045110774067431a009338d9ef6059"],["partials/help-modal.html","531dbb5bd9282d067eda17878712bf61"],["partials/login-modal.html","d41d8cd98f00b204e9800998ecf8427e"],["partials/onboard-modal.html","82d68229c9cb3238416c231f8ae93685"],["patreon.png","8b4321f782e84764e556af3dee32a131"],["preview.html","98e82cdc9c831b9a716d85d5548a561b"],["script.js","eb3ca987453cb9015fb71272b817c419"],["style.css","54a2bace3ea6be89ce224f1d06c5e10e"],["vendor.css","6ed94306315b8aaf789c53091c23bb4b"],["vendor.js","67f64e377a046c689bf8b6b49a7fc2ca"]];
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







