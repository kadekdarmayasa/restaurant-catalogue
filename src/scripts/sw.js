import CacheHelper from './utils/cache-helper';

const assetsToCache = [
  './',
  './icons/apple-touch-icon.png',
  './icons/icon-512x512.png',
  './icons/icon-192x192.png',
  './icons/icon-32x32.png',
  './icons/icon-16x16.png',
  './icons/favicon.ico',
  './app.webmanifest',
  './images/heros/hero-image_1.jpg',
  './images/no-data.svg',
  './images/not-found.svg',
  './images/star.svg',
  './index.html',
  './app.bundle.js',
  './sw.bundle.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(CacheHelper.cachingAppShell([...assetsToCache]));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(CacheHelper.deleteOldCache());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(CacheHelper.revalidateCache(event.request));
});
