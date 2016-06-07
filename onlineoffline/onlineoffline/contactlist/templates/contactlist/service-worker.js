// Generated by CoffeeScript 1.10.0

/*
{% load static %}
 */

(function() {
  var CACHE_NAME, REQUIRED_FILES;

  CACHE_NAME = 'dependencies-cache';

  REQUIRED_FILES = ["/contactlist/offline/", "/static/riot/riot+compiler.min.js", "{% static 'js/riotcontrol.js' %}", "{% static 'js/personstore.js' %}", "{% static 'js/requeststore.js' %}", "{% static 'jquery/dist/jquery.min.js' %}", "{% static 'lawnchair/src/Lawnchair.js' %}", "{% static 'lawnchair/src/adapters/indexed-db.js' %}", "{% static 'bootstrap/dist/css/bootstrap.min.css' %}"];

  self.addEventListener('install', function(event) {
    event.waitUntil(caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(REQUIRED_FILES);
    }).then(function() {
      return self.skipWaiting();
    }));
  });

  self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
  });

  self.addEventListener('fetch', function(event) {
    var fail_503;
    fail_503 = function() {
      return new Response('<h1>Service Unavailable</h1>', {
        status: 503,
        statusText: 'Service Unavailable',
        headers: new Headers({
          'Content-Type': 'text/html'
        })
      });
    };
    console.log(event);
    console.log('WORKER: fetch event in progress.');
    return event.respondWith(caches.match(event.request).then(function(cached) {
      var fetchedFromNetwork, networked, unableToResolve;
      networked = fetch(event.request).then(fetchedFromNetwork, unableToResolve)["catch"](unableToResolve);
      fetchedFromNetwork = function(response) {
        var cacheCopy;
        cacheCopy = response.clone();
        console.log('WORKER: fetch response from network.', event.request.url);
        caches.open('dependencies-cache').then(function(cache) {
          cache.put(event.request, cacheCopy);
        }).then(function() {
          console.log('WORKER: fetch response stored in cache.', event.request.url);
        });
        return response;
      };
      unableToResolve = function() {
        console.log('WORKER: fetch request failed in both cache and network.');
        return fail_503();
      };
      console.log('WORKER: fetch event' + (cached ? '(cached)' : '(network)' + event.request.url));
      return cached || networked;
    }));
  });

}).call(this);
