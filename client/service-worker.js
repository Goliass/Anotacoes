const app = (function() {
  let app = {};

  app.version = 8;
 
  app.caches = {};
  app.caches.appFiles = 'notes-appFiles' + '-v' + app.version;

  app.files = [
    "./",
    "./index.html",
    "./manifest.webmanifest",
    "./favicon.png",
    "./css/bootstrap.min.css",
    "./css/style.css",
    "./css/notesToDo.css",
    "./css/notesDone.css",    
    "./css/notesDeleted.css",    
    "./js/app/polyfills/polyfills.js",
    "./js/app/utils/isValidArrayIndex.js",
    "./js/app/utils/click.js",
    "./js/app/utils/createElement.js",
    "./js/app/utils/createHtmlAttributeObject.js",
    "./js/app/utils/StatusPopup.js",
    "./js/app/config/sw-register.js",
    "./js/app/config/storage.js",
    "./js/app/config/IDBDataBase.js",
    "./js/app/dao/NotesDAO.js",
    "./js/app/models/NotesModel.js",
    "./js/app/models/NotesToDoModel.js",
    "./js/app/views/NotesToDoView.js",
    "./js/app/views/NotesDoneView.js",
    "./js/app/views/NotesDeletedView.js",
    "./js/app/controllers/notesController.js",
    "./js/app/controllers/noteDoneController.js",
    "./js/app/controllers/noteDeletedController.js",
    "./js/app/services/backup.js",
    "./js/app/services/importAsJSObject.js",
    "./js/app/externals/jquery-3.4.1.slim.min.js",
    "./js/app/externals/popper.min.js",
    "./js/app/externals/bootstrap.min.js",
    "./img/notes-192x192.png",
    "./img/notes-512x512.png",
    "./img/add-icon.svg",
    "./img/backup-icon.svg",
    "./img/del-icon.svg",
    "./img/done-icon.svg",
    "./img/edit-icon.svg",
    "./img/import-icon.svg",
    "./img/restore-icon.svg",
    "./img/help-icon.svg",
    "./img/vanish-icon.svg",
    "./img/github-icon.svg",
    "./img/search-icon.svg",
    "./img/linkedin-icon.svg",
    "./img/about-icon.svg"
  ]

  return app;
})();

// service worker (SW) activation (step 2, after install event)
self.addEventListener('activate', (event) => {

  if (event.waitUntil) { 
    event.waitUntil(cacheAppFiles());
  } else {
    console.log('waitUntil not implemented in this browser version. Activating service worker anyway, but without app files complete caching warranty.');
    cacheAppFiles();
  }
});

function cacheAppFiles() {
  return caches.open(app.caches.appFiles).then(cache => {
    // console.log('Caching app files...');

    cache
      .addAll(app.files)
      // .then(console.log('Caching done.'))
      .then(deleteInactiveCaches);
  });  
}

function deleteInactiveCaches() {
  const appCaches = Object.keys(app.caches).map(prop => {
    return app.caches[prop];
  })

  caches.keys().then(function(storageCaches) {
    // console.log('Removing previous app caches...');     

    return Promise.all(storageCaches.map(function(storageCache) {
      if (!appCaches.includes(storageCache)) {
        return caches.delete(storageCache);
      }
    }))
    // .then(console.log('Removing done.'));
  })  
}

self.addEventListener('fetch', function(event) {
  let originalRequest = event.request;

  let promiseResposta = 
    caches
    .match(originalRequest)
    .then(respostaCache => {
      let resposta = respostaCache ? respostaCache : fetch(originalRequest);
      return resposta;
    });

  event.respondWith(promiseResposta);
});