/*
  SERVICE WORKERS IN JAVASCRIPT — GREAT DETAIL
  --------------------------------------------
  ✔ Service Worker = a special script that runs in the background,
    separate from the web page.

  ✔ It acts as a programmable network proxy between:
        Browser  ↔  Network  ↔  Cache

  ✔ Main capabilities:
      - Offline support / caching (PWA core)
      - Network request interception
      - Background sync
      - Push notifications
      - Performance optimization (cache-first strategies)

  ✔ IMPORTANT:
      - Runs in its own thread (no direct DOM access)
      - Event-driven (install, activate, fetch, etc.)
      - HTTPS required (except on localhost)
*/



/* ============================================================
   1. BASIC CONCEPT & LIFECYCLE OVERVIEW
   ============================================================
   SERVICE WORKER LIFECYCLE:
     1) register()       → from main JS (in page)
     2) install event    → SW script downloaded & installed
     3) activate event   → old SW is replaced, cleanup
     4) fetch event      → intercept network requests
     5) other events     → push, sync, message, etc.

   STATES:
     - parsed
     - installing
     - installed
     - activating
     - activated
     - redundant
*/



/* ============================================================
   2. REGISTERING A SERVICE WORKER (IN MAIN THREAD)
   ============================================================
   Typically in main.js or index.js (client code, not SW file)
*/

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")  // path to service worker script
      .then(registration => {
        console.log("Service Worker registered:", registration.scope);
      })
      .catch(err => {
        console.log("Service Worker registration failed:", err);
      });
  });
}

/*
  ✔ Must be served over HTTPS (or localhost for dev)
  ✔ registration.scope → controls which URLs SW can handle
  ✔ Scope is usually the directory where sw.js lives and below
*/



/* ============================================================
   3. SERVICE WORKER FILE STRUCTURE (sw.js)
   ============================================================
   sw.js runs in its own context:
     - self refers to ServiceWorkerGlobalScope
     - no window / no DOM
*/

const CACHE_NAME = "my-app-cache-v1";
const ASSETS_TO_CACHE = [
  "/",           // root
  "/index.html",
  "/styles.css",
  "/main.js",
  "/logo.png",
];

/*
  INSTALL EVENT
    - triggered once when SW is first installed
    - best place to pre-cache static assets
*/

self.addEventListener("install", event => {
  console.log("[Service Worker] Install event");

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("[Service Worker] Caching assets");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

/*
  ACTIVATE EVENT
    - triggered after install, when SW becomes active
    - used for cleanup: delete old caches, etc.
*/

self.addEventListener("activate", event => {
  console.log("[Service Worker] Activate event");

  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME) // delete old caches
          .map(key => caches.delete(key))
      );
    })
  );
});

/*
  FETCH EVENT
    - intercept all network requests within scope
    - decide: respond from cache, network, or combination
*/

self.addEventListener("fetch", event => {
  console.log("[Service Worker] Fetch:", event.request.url);

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        // Return from cache if found
        return cachedResponse;
      }

      // Else fetch from network and optionally cache it
      return fetch(event.request).then(networkResponse => {
        // Optionally clone and cache dynamic content
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    })
  );
});



/* ============================================================
   4. event.waitUntil & event.respondWith (VERY IMPORTANT)
   ============================================================
   ✔ event.waitUntil(promise)
       - tells browser: "Don't consider this event finished until promise settles"
       - used in install/activate to keep SW alive while caching, cleaning, etc.

   ✔ event.respondWith(promise)
       - used in fetch events
       - tells browser: "Use this promise result as response"
*/



/* ============================================================
   5. CACHING STRATEGIES (COMMON PATTERNS)
   ============================================================
   A) Cache-First
   B) Network-First
   C) Stale-While-Revalidate
   D) Cache-Only
   E) Network-Only
*/



/* ------------------------------------------------------------
   A) CACHE-FIRST STRATEGY
   ------------------------------------------------------------
   ✔ First: look in cache
   ✔ If found → return cached
   ✔ Else → go to network
   ✔ Good for: assets that rarely change (images, fonts)
*/

function cacheFirst(request) {
  return caches.match(request).then(cached => {
    if (cached) return cached;
    return fetch(request);
  });
}



/* ------------------------------------------------------------
   B) NETWORK-FIRST STRATEGY
   ------------------------------------------------------------
   ✔ First: try network
   ✔ If fails (offline) → fallback to cache
   ✔ Good for: dynamic content, latest data
*/

function networkFirst(request) {
  return fetch(request)
    .then(response => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
      return response;
    })
    .catch(() => caches.match(request));
}



/* ------------------------------------------------------------
   C) STALE-WHILE-REVALIDATE
   ------------------------------------------------------------
   ✔ Return cached version immediately (if exists)
   ✔ In background, fetch from network and update cache
   ✔ Next request gets fresh cache
*/

function staleWhileRevalidate(request) {
  return caches.match(request).then(cached => {
    const fetchPromise = fetch(request).then(networkResponse => {
      caches.open(CACHE_NAME).then(cache => cache.put(request, networkResponse.clone()));
      return networkResponse;
    });

    // If cache exists, return it; else wait for network
    return cached || fetchPromise;
  });
}



/* ============================================================
   6. OFFLINE SUPPORT / FALLBACK PAGE
   ============================================================
   ✔ You can serve a custom offline.html when network unavailable.
*/

const OFFLINE_URL = "/offline.html";

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.add(OFFLINE_URL))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      // If network fails, show offline page for HTML requests
      if (event.request.headers.get("accept")?.includes("text/html")) {
        return caches.match(OFFLINE_URL);
      }
      // For other assets, you might do something else
    })
  );
});



/* ============================================================
   7. SERVICE WORKER SCOPE
   ============================================================
   ✔ Scope determines which pages/requests SW controls.
   ✔ Normally:
        /sw.js  → controls entire origin
        /app/sw.js → controls /app/ and below

   In register():
        navigator.serviceWorker.register("/app/sw.js", { scope: "/app/" });
*/



/* ============================================================
   8. SERVICE WORKER UPDATES
   ============================================================
   FLOW:
     1) Browser checks sw.js for changes (usually on navigation or reload).
     2) If file changed → new SW downloaded in "installing" state.
     3) Existing SW keeps controlling pages.
     4) Once new SW installed, it waits ("waiting" state).
     5) When no pages using old SW → new SW activates.
     6) You can force immediate activation with:
          self.skipWaiting()
*/

self.addEventListener("install", event => {
  self.skipWaiting(); // ⚠️ Force new SW to activate as soon as possible
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

/*
  ✔ clients.claim() → make SW take control of uncontrolled clients (pages).
  ✔ skipWaiting() can be risky; normally you notify users:
      "New version available, refresh?"
*/



/* ============================================================
   9. COMMUNICATION WITH SERVICE WORKER (postMessage)
   ============================================================
   From page → SW:
*/

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.ready.then(reg => {
    if (reg.active) {
      reg.active.postMessage({ type: "PING", time: Date.now() });
    }
  });
}

/*
  In sw.js:
*/

self.addEventListener("message", event => {
  console.log("[SW] Received message from page:", event.data);
});



/* ============================================================
   10. BACKGROUND SYNC (ONE-SHOT) — HIGH LEVEL
   ============================================================
   ✔ Allows you to retry actions when connectivity returns.
   ✔ Scenario:
       - User offline tries to send form
       - You save to IndexedDB and register sync
       - When online again, SW gets "sync" event and sends data
*/

/*
  From page:
    navigator.serviceWorker.ready.then(reg => {
      return reg.sync.register("sync-posts");
    });
*/

/*
  In sw.js:
*/

self.addEventListener("sync", event => {
  if (event.tag === "sync-posts") {
    event.waitUntil(sendPendingPosts());
  }
});

async function sendPendingPosts() {
  // read from IndexedDB and send to server
}



/* ============================================================
   11. PUSH NOTIFICATIONS (HIGH LEVEL)
   ============================================================
   ✔ Requires:
      - Service worker
      - Push API (browser)
      - Subscription to push service
      - Server to send push messages

   SW receives "push" event even when page is closed (if allowed).
*/

/*
  In sw.js:
*/

self.addEventListener("push", event => {
  const data = event.data ? event.data.json() : {};

  event.waitUntil(
    self.registration.showNotification(data.title || "New Message", {
      body: data.body || "You have a new notification",
      icon: "/icon.png",
    })
  );
});

/*
  ✔ When user clicks notification → "notificationclick" event
*/

self.addEventListener("notificationclick", event => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(clientList => {
      const url = "/inbox";
      const existing = clientList.find(client => client.url.includes(url));
      if (existing) {
        return existing.focus();
      }
      return clients.openWindow(url);
    })
  );
});



/* ============================================================
   12. LIMITATIONS OF SERVICE WORKERS
   ============================================================
   ✔ No direct DOM access (must message pages)
   ✔ Limited storage (Cache + IndexedDB; quota depends on browser)
   ✔ Requires HTTPS (except localhost)
   ✔ Not supported in extremely old browsers
   ✔ Debugging can be tricky (multiple versions, cache issues)
   ✔ Background execution can be throttled by browser to save battery
*/



/* ============================================================
   13. COMMON PITFALLS & TIPS
   ============================================================
   1) Stale SW:
      - Old SW file served due to caching
      - Use proper HTTP cache headers (no aggressive cache for sw.js)

   2) Cache busting assets:
      - Change filenames with hash when content changes (main.abc123.js)

   3) Infinite loop of fetch:
      - If SW intercepts its own request for sw.js, be careful

   4) Scope confusion:
      - sw.js location defines scope (be explicit if needed)

   5) Debugging:
      - Use DevTools → Application → Service Workers
      - Options to unregister, update, bypass cache
*/



/* ============================================================
   14. SUMMARY (CHEAT SHEET)
   ============================================================
*/
/*
  ✔ Service Worker
      - Background script
      - Intercepts network (fetch)
      - Controls cache
      - Enables offline / PWA

  ✔ Lifecycle:
      - register() in main JS
      - install → pre-cache assets
      - activate → cleanup old caches
      - fetch → caching strategies
      - other: sync, push, message

  ✔ Key APIs:
      - self.addEventListener("install" | "activate" | "fetch" | "sync" | "push" | "message")
      - caches.open / caches.match / caches.put / caches.keys / caches.delete
      - event.waitUntil()
      - event.respondWith()
      - clients.matchAll()
      - self.registration.showNotification()

  MENTAL MODEL:
    → Service Worker is like a programmable middleman between
      your web app and the network:
         - It can serve cached responses when offline
         - It can cache new content as user browses
         - It can handle background tasks and push events
      turning your website into an app-like, offline-capable PWA.
*/
