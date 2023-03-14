if("serviceWorker" in navigator){
    //register - asynchronous task which means it will take some time to execute and it returns to us a promise (speacial value in js)
      navigator.serviceWorker.register("./service-worker.js")
      .then(function(registering){
        // Registration was successful
        console.log("Browser: Service Worker registration is successful with the scope",registering.scope);
      }).catch(function(error){
        //The registration of the service worker failed
        console.log("Browser: Service Worker registration failed with the error",error);
      });
    } else {
      //The registration of the service worker failed
      console.log("Browser: I don't support Service Workers :(");
    }