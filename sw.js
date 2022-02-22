var CACHE_NAME = 'cache';
var urlsToCache = [
  
  'index.html',
  'css/bootstrap.min.css',
  'css/estilos.css',
  'js/app.js',
  'res.png'
];

//Instalación
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Caché abierto!');
        return cache.addAll(urlsToCache);
      })
  );
});

//Activación
self.addEventListener('activate', event =>{
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if(key != CACHE_NAME){
          return caches.delete(key);
        }
      })
    )).then(() => {
    console.log('Ahora está listo para manejar las búsquedas');
  })
  );
});

//Terminated
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            // Cache hit - respuesta de retorno
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});


