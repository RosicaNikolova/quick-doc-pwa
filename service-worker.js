
const staticCacheName = 'site-static-v1';
const dynamicCache = 'site-dymanic-v3';
const assets = [
    '/',
    '/index.html',
    '/fallback.html',
    '/js/index.js',
    '/js/install-sw.js',
    '/css/index.css'
];

  //install service worker
  self.addEventListener("install", installing => {
    installing.waitUntil(
          //asynchronous task
      caches.open(staticCacheName).then(cache =>{
        console.log('caching assets');
        cache.addAll(assets)
      })
    );
    console.log("Service Worker: I am being installed, hello world!");
  });
  
  //activate service worker
  self.addEventListener("activate", activating =>{
    activating.waitUntil(
      caches.keys().then(keys => {
        return Promise.all(keys
          .filter(key => key !== staticCacheName && key !== dynamicCache)
          .map(key => caches.delete(key))
          )
      })
    );
    //console.log("Service Worker: All systems online, ready to go!");
  });
  
  //fetch html pages. css files and so on
  self.addEventListener("fetch", fetching => {
    fetching.respondWith(
      caches.match(fetching.request).then(cacheRes => {
        return cacheRes || fetch(fetching.request).then(fetchRes => {
          return caches.open(dynamicCache).then(cache => {
            cache.put(fetching.request.url, fetchRes.clone())
            return fetchRes;
          })
        });
      }).catch(() => caches.match('/fallback.html'))
    );
    //console.log("Service Worker: User threw a ball, I need to fetch it!", fetching);
  });
  
  self.addEventListener("push",(pushing)=>{
      console.log("Service Worker: I received some push data, but because I am still very simple I don't know what to do with it :(");
  })
  