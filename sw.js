var __wpo = {"assets":{"main":["./app.d1fd32b7bfd1a3dda075.js","./app-d1fd32b7bfd1a3dda075.css","./"],"additional":["./0.46b10125008c20402822.chunk.js","./sw.d1fd32b7bfd1a3dda075.js","./about.html","./icons-acb1a5ac5c904b186686f2860097fb68favicon-16x16.png","./icons-acb1a5ac5c904b186686f2860097fb68favicon-32x32.png","./icons-acb1a5ac5c904b186686f2860097fb68favicon-96x96.png","./icons-acb1a5ac5c904b186686f2860097fb68favicon-230x230.png","./icons-acb1a5ac5c904b186686f2860097fb68favicon.ico","./icons-acb1a5ac5c904b186686f2860097fb68.cache","./iconstats-ea0940c0a9c86b6a4e97.json","./fontello-3SiN21K.eot","./fontello-2M75J1N.ttf","./fontello-34uihGh.woff2","./fontello-3oSFvmo.woff","./logo-39iMiAh.svg","./0.46b10125008c20402822.chunk.js.gz","./manifest.json"],"optional":[]},"externals":[],"hashesMap":{"aa9a516b2a0abf668716faf577f8257a47580514":"./icons-acb1a5ac5c904b186686f2860097fb68favicon-16x16.png","a2ee28a08e9908078da168d165a0057723f3090d":"./icons-acb1a5ac5c904b186686f2860097fb68favicon-32x32.png","5ddd3ef5b6d7721ca4f37825dbbd63f0bd54ad2e":"./icons-acb1a5ac5c904b186686f2860097fb68favicon-96x96.png","7f92dc1aa9cf2fa8c814ac148e5a923af24e0d5c":"./icons-acb1a5ac5c904b186686f2860097fb68favicon-230x230.png","2845308abd298acd6b9878b6a976ce3fa55f2f05":"./icons-acb1a5ac5c904b186686f2860097fb68favicon.ico","5c8541dcfccf270a83a1ff667c0a6b8841c60f71":"./icons-acb1a5ac5c904b186686f2860097fb68.cache","b470a723e0730af3fadb53ec0ed0379436937342":"./iconstats-ea0940c0a9c86b6a4e97.json","e2088638b0d3c76dde310ada165987866c183260":"./fontello-3SiN21K.eot","c4e29c4e6aaff6f2a06286184a8750cc8f17761f":"./fontello-2M75J1N.ttf","93424deb2c4a9d4b21e1e0c767438a9e05c3b9cb":"./fontello-34uihGh.woff2","a9cac8b0dfc523ae0a6a809fae8c3c561cd7f3a0":"./fontello-3oSFvmo.woff","3ef21f95da85e57fe54afb597d45680a345ea904":"./logo-39iMiAh.svg","e2ec52c97f9317d061ff76b6398aa05510cfa31d":"./0.46b10125008c20402822.chunk.js","25e3a75b79d2159e0ffb88932d13940973258436":"./sw.d1fd32b7bfd1a3dda075.js","411c67dedef240f50f51bb139a5299116f2f3044":"./app.d1fd32b7bfd1a3dda075.js","0b3359e0373820a6b1f76c16e4b1161535f65f91":"./app-d1fd32b7bfd1a3dda075.css","2370030a3685a4e1996bc02c07dd78a79ed108ab":"./0.46b10125008c20402822.chunk.js.gz","812964f6e008cbfd395d0920a31d924863112e0a":"./","2ad051fc3b301779c981ad919d68bb6d3bfd1fbd":"./about.html","af3d598fccc1e4a369feaf09de4c2a8f5f2d4fe9":"./manifest.json"},"strategy":"changed","responseStrategy":"cache-first","version":"3/7/2017, 9:45:23 PM","name":"webpack-offline","pluginVersion":"4.6.1","relativePaths":true};

!function(e){function __webpack_require__(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,__webpack_require__),r.l=!0,r.exports}var n={};return __webpack_require__.m=e,__webpack_require__.c=n,__webpack_require__.i=function(e){return e},__webpack_require__.d=function(e,n,t){__webpack_require__.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:t})},__webpack_require__.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return __webpack_require__.d(n,"a",n),n},__webpack_require__.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s="../node_modules/offline-plugin/lib/misc/sw-loader.js?json=%7B%22data_var_name%22%3A%22__wpo%22%2C%22loaders%22%3A%5B%5D%2C%22cacheMaps%22%3A%5B%5D%7D!../node_modules/offline-plugin/empty-entry.js")}({"../node_modules/offline-plugin/empty-entry.js":function(e,n){},"../node_modules/offline-plugin/lib/misc/sw-loader.js?json=%7B%22data_var_name%22%3A%22__wpo%22%2C%22loaders%22%3A%5B%5D%2C%22cacheMaps%22%3A%5B%5D%7D!../node_modules/offline-plugin/empty-entry.js":function(e,n,t){"use strict";function WebpackServiceWorker(e,n){function cacheAdditional(){if(!i.additional.length)return Promise.resolve();r&&console.log("[SW]:","Caching additional");var e=void 0;return e="changed"===a?cacheChanged("additional"):cacheAssets("additional"),e.catch(function(e){console.error("[SW]:","Cache section `additional` failed to load")})}function cacheAssets(n){var t=i[n];return caches.open(d).then(function(n){return addAllNormalized(n,t,{bust:e.version,request:e.prefetchRequest})}).then(function(){logGroup("Cached assets: "+n,t)}).catch(function(e){throw console.error(e),e})}function cacheChanged(n){return getLastCache().then(function(t){if(!t)return cacheAssets(n);var r=t[0],o=t[1],a=t[2],c=a.hashmap,s=a.version;if(!a.hashmap||s===e.version)return cacheAssets(n);var l=Object.keys(c).map(function(e){return c[e]}),f=o.map(function(e){var n=new URL(e.url);return n.search="",n.toString()}),h=i[n],p=[],_=h.filter(function(e){return f.indexOf(e)===-1||l.indexOf(e)===-1});Object.keys(u).forEach(function(e){var n=u[e];if(h.indexOf(n)!==-1&&_.indexOf(n)===-1&&p.indexOf(n)===-1){var t=c[e];t&&f.indexOf(t)!==-1?p.push([t,n]):_.push(n)}}),logGroup("Changed assets: "+n,_),logGroup("Moved assets: "+n,p);var v=Promise.all(p.map(function(e){return r.match(e[0]).then(function(n){return[e[1],n]})}));return caches.open(d).then(function(n){var t=v.then(function(e){return Promise.all(e.map(function(e){return n.put(e[0],e[1])}))});return Promise.all([t,addAllNormalized(n,_,{bust:e.version,request:e.prefetchRequest})])})})}function deleteObsolete(){return caches.keys().then(function(e){var n=e.map(function(e){if(0===e.indexOf(f)&&0!==e.indexOf(d))return console.log("[SW]:","Delete cache:",e),caches.delete(e)});return Promise.all(n)})}function getLastCache(){return caches.keys().then(function(e){for(var n=e.length,t=void 0;n--&&(t=e[n],0!==t.indexOf(f)););if(t){var r=void 0;return caches.open(t).then(function(e){return r=e,e.match(new URL(p,location).toString())}).then(function(e){if(e)return Promise.all([r,r.keys(),e.json()])})}})}function storeCacheData(){return caches.open(d).then(function(n){var t=new Response(JSON.stringify({version:e.version,hashmap:u}));return n.put(new URL(p,location).toString(),t)})}function cacheFirstResponse(e,n,t){return cachesMatch(t,d).then(function(o){if(o)return r&&console.log("[SW]:","URL ["+t+"]("+n+") from cache"),o;var a=fetch(e.request).then(function(e){return e.ok?(r&&console.log("[SW]:","URL ["+n+"] from network"),t===n&&!function(){var t=e.clone();caches.open(d).then(function(e){return e.put(n,t)}).then(function(){console.log("[SW]:","Cache asset: "+n)})}(),e):(r&&console.log("[SW]:","URL ["+n+"] wrong response: ["+e.status+"] "+e.type),e)});return a})}function networkFirstResponse(e,n,t){return fetch(e.request).then(function(e){if(e.ok)return r&&console.log("[SW]:","URL ["+n+"] from network"),e;throw new Error("response is not ok")}).catch(function(){return r&&console.log("[SW]:","URL ["+n+"] from cache if possible"),cachesMatch(t,d)})}function handleNavigateFallback(e){return e.catch(function(){}).then(function(e){return e&&e.ok?e:(r&&console.log("[SW]:","Loading navigation fallback ["+v+"] from cache"),cachesMatch(v,d))})}function mapAssets(){Object.keys(i).forEach(function(e){i[e]=i[e].map(function(e){var n=new URL(e,location);return l.indexOf(e)===-1?n.search="":n.hash="",n.toString()})}),Object.keys(s).forEach(function(e){s[e]=s[e].map(function(e){var n=new URL(e,location);return l.indexOf(e)===-1?n.search="":n.hash="",n.toString()})}),u=Object.keys(u).reduce(function(e,n){var t=new URL(u[n],location);return t.search="",e[n]=t.toString(),e},{}),l=l.map(function(e){var n=new URL(e,location);return n.hash="",n.toString()})}function addAllNormalized(e,n,t){var r=t.allowLoaders!==!1,o=t&&t.bust,a=t.request||{credentials:"omit",mode:"cors"};return Promise.all(n.map(function(e){return o&&(e=applyCacheBust(e,o)),fetch(e,a)})).then(function(o){if(o.some(function(e){return!e.ok}))return Promise.reject(new Error("Wrong response status"));var a=[],c=o.map(function(t,o){return r&&a.push(extractAssetsWithLoaders(n[o],t)),e.put(n[o],t)});return a.length?!function(){var r=copyObject(t);r.allowLoaders=!1;var o=c;c=Promise.all(a).then(function(t){var a=[].concat.apply([],t);return n.length&&(o=o.concat(addAllNormalized(e,a,r))),Promise.all(o)})}():c=Promise.all(c),c})}function extractAssetsWithLoaders(e,n){var r=Object.keys(s).map(function(r){var o=s[r];if(o.indexOf(e)!==-1&&t[r])return t[r](n.clone())}).filter(function(e){return!!e});return Promise.all(r).then(function(e){return[].concat.apply([],e)})}function matchCacheMap(e){var n=e.url,t=new URL(n),r=void 0;r="navigate"===e.mode?"navigate":t.origin===location.origin?"same-origin":"cross-origin";for(var a=0;a<o.length;a++){var c=o[a];if(c&&(!c.requestTypes||c.requestTypes.indexOf(r)!==-1)){var i=void 0;if(i="function"==typeof c.match?c.match(t,e):n.replace(c.match,c.to),i&&i!==n)return i}}}var t=n.loaders,o=n.cacheMaps,a=e.strategy,c=e.responseStrategy,i=e.assets,s=e.loaders||{},u=e.hashesMap,l=e.externals,f=e.name,h=e.version,d=f+":"+h,p="__offline_webpack__data";mapAssets();var _=[].concat(i.main,i.additional,i.optional),v=e.navigateFallbackURL;self.addEventListener("install",function(e){console.log("[SW]:","Install event");var n=void 0;n="changed"===a?cacheChanged("main"):cacheAssets("main"),e.waitUntil(n)}),self.addEventListener("activate",function(e){console.log("[SW]:","Activate event");var n=cacheAdditional();n=n.then(storeCacheData),n=n.then(deleteObsolete),n=n.then(function(){if(self.clients&&self.clients.claim)return self.clients.claim()}),e.waitUntil(n)}),self.addEventListener("fetch",function(e){var n=e.request.url,t=new URL(n),r=void 0;l.indexOf(n)!==-1?r=n:(t.search="",r=t.toString());var o="GET"===e.request.method,a=_.indexOf(r)!==-1,i=r;if(!a){var s=matchCacheMap(e.request);s&&(i=s,a=!0)}if(!a&&o&&v&&isNavigateRequest(e.request))return void e.respondWith(handleNavigateFallback(fetch(e.request)));if(!a||!o)return void(t.origin!==location.origin&&navigator.userAgent.indexOf("Firefox/44.")!==-1&&e.respondWith(fetch(e.request)));var u=void 0;u="network-first"===c?networkFirstResponse(e,r,i):cacheFirstResponse(e,r,i),v&&isNavigateRequest(e.request)&&(u=handleNavigateFallback(u)),e.respondWith(u)}),self.addEventListener("message",function(e){var n=e.data;if(n)switch(n.action){case"skipWaiting":self.skipWaiting&&self.skipWaiting()}})}function cachesMatch(e,n){return caches.match(e,{cacheName:n}).catch(function(){})}function applyCacheBust(e,n){var t=e.indexOf("?")!==-1;return e+(t?"&":"?")+"__uncache="+encodeURIComponent(n)}function isNavigateRequest(e){return"navigate"===e.mode||e.headers.get("Upgrade-Insecure-Requests")||(e.headers.get("Accept")||"").indexOf("text/html")!==-1}function copyObject(e){return Object.keys(e).reduce(function(n,t){return n[t]=e[t],n},{})}function logGroup(e,n){console.groupCollapsed("[SW]:",e),n.forEach(function(e){console.log("Asset:",e)}),console.groupEnd()}if("undefined"==typeof r)var r=!1;WebpackServiceWorker(__wpo,{loaders:{},cacheMaps:[]}),e.exports=t("../node_modules/offline-plugin/empty-entry.js")}});