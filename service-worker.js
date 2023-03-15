
const staticCacheName = 'site-static-v1';
const dynamicCache = 'site-dymanic-v3';
const assets = [
    '/',
    '/index.html',
    '/fallback.html',
    // '/article.html',
    // '/finish.html',
    // '/home.html',
    // '/inqueue.html',
    '/js/index.js',
    // '/js/article-list.js',
    // '/js/finish.js',
    // '/js/timer.js',
     '/js/install-sw.js',
    // '/css/article.css',
    // '/css/finish.css',
    // '/css/home.css',
     '/css/index.css',
    // '/css/inqueue.css',
    // '/images/article1.png',
    // '/images/article2.png',
    // '/images/article3.png',
    // '/images/article4.png',
    // '/images/article5.png',
    // '/images/back-icon.svg',
    // '/images/background1.png',
    // '/images/doctor.jpg',
    // '/images/face-frown-regular.svg',
    // '/images/user-doctor-solid.svg',
    // '/images/pexels-cottonbro-studio-5079274.jpg',
    // 'article.json'
];
//self - refers to the service worker itself

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
  