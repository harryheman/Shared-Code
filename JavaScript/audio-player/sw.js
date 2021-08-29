const NAME = 'audio-player-v1'

const FILES = [
  './index.html',
  './server.js',
  './css/buttons.css',
  './css/equal.css',
  './css/progress.css',
  './css/main.css',
  './js/buttons.js',
  './js/main.js',
  './img/buttons/backward.png',
  './img/buttons/check.png',
  './img/buttons/download.png',
  './img/buttons/equal.png',
  './img/buttons/fast.png',
  './img/buttons/forward.png',
  './img/buttons/list.png',
  './img/buttons/mute.png',
  './img/buttons/next.png',
  './img/buttons/normal.png',
  './img/buttons/pause.png',
  './img/buttons/play.png',
  './img/buttons/prev.png',
  './img/buttons/reload.png',
  './img/buttons/shuffle.png',
  './img/buttons/stop.png',
  './img/buttons/upload.png',
  './img/buttons/visual.png',
  './img/buttons/volume.png',
  './img/icons/64.png',
  './img/icons/128.png',
  './img/icons/256.png',
  './img/icons/512.png'
]

self.addEventListener('install', (ev) => {
  ev.waitUntil(
    caches.open(NAME).then((cache) => {
      return cache.addAll(FILES)
    })
  )
  self.skipWaiting()
})

self.addEventListener('activate', (ev) => {
  ev.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== NAME) {
            return caches.delete(key)
          }
        })
      )
    })
  )
  self.clients.claim()
})

self.addEventListener('fetch', (ev) => {
  ev.respondWith(
    fetch(ev.request)
      .then((res) => {
        const cacheClone = res.clone()
        caches.open(NAME).then((cache) => {
          cache.put(ev.request, cacheClone)
        })
        return res
      })
      .catch(() => caches.match(ev.request).then((res) => res))
  )
})
