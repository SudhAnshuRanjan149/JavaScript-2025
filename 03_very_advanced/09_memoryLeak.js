/*
  MEMORY LEAKS & PROFILING IN JAVASCRIPT — GREAT DETAIL
  -----------------------------------------------------
  ✔ JavaScript has automatic garbage collection (GC),
    but you can STILL create memory leaks if you keep
    unnecessary references to objects.

  ✔ This explanation covers:
      1) How memory & GC works (high level)
      2) Common memory leak patterns in JS
      3) How to detect & profile leaks (DevTools)
      4) How to fix & prevent leaks
*/



/* ============================================================
   1. HOW MEMORY & GARBAGE COLLECTION WORKS (HIGH LEVEL)
   ============================================================ */
/*
  ✔ JS uses a "reachability" model:
      - Values that are reachable from ROOTS are kept in memory.
      - ROOTS include:
          • Global object (window / globalThis)
          • Currently executing function stack
          • Closures in scope
          • Active event listeners, timers, etc.

  ✔ If an object is NO LONGER REACHABLE from any root,
    GC can reclaim its memory.

  ✔ Memory leak happens when:
      - Objects are no longer needed logically
      - BUT are still reachable (kept by some reference)
      - So GC cannot free them.
*/



/* ============================================================
   2. COMMON MEMORY LEAK PATTERNS
   ============================================================ */
/*
  We'll go through:
    A) Global variables & singletons
    B) Forgotten timers & intervals
    C) Event listeners not removed
    D) DOM nodes kept in JS after removal
    E) Closures capturing large objects
    F) Caches that grow forever
*/



/* ------------------------------------------------------------
   A) LEAK: GLOBAL VARIABLES & SINGLETONS
   ------------------------------------------------------------ */

/// BAD: accidental global (in sloppy mode)
function badGlobal() {
  leaky = []; // missing `let`/`const` → becomes global in non-strict mode
  for (let i = 0; i < 10000; i++) {
    leaky.push(new Array(1000).fill("*"));
  }
}

/*
  ✔ `leaky` is now on window.leaky and NEVER gets collected
    unless you manually set window.leaky = null;
*/

/// GOOD:
function goodGlobal() {
  "use strict";
  let arr = []; // properly scoped
}

/*
  ✔ Always use "use strict" or modules.
  ✔ Avoid unnecessary globals.
*/



/* ------------------------------------------------------------
   B) LEAK: FORGOTTEN TIMERS & INTERVALS
   ------------------------------------------------------------ */

/// BAD:
function startPolling() {
  const bigData = new Array(1e5).fill("x");

  setInterval(() => {
    // interval callback closes over bigData
    console.log("Polling...", bigData[0]);
  }, 1000);
}

/*
  ✔ If you never call clearInterval(), the interval & its closure live forever.
*/

/// GOOD:
function startPollingSafely() {
  const bigData = new Array(1e5).fill("x");
  const id = setInterval(() => {
    console.log("Polling...", bigData[0]);
  }, 1000);

  // later, when not needed:
  setTimeout(() => {
    clearInterval(id);
    // After this, if nothing else references bigData,
    // it can be garbage-collected.
  }, 10000);
}



/* ------------------------------------------------------------
   C) LEAK: EVENT LISTENERS NOT REMOVED
   ------------------------------------------------------------ */

/// BAD:
function attachLeak() {
  const bigObj = { data: new Array(1e5).fill("foo") };
  const btn = document.getElementById("leaky-btn");

  function handleClick() {
    console.log(bigObj.data[0]); // closure over bigObj
  }

  btn.addEventListener("click", handleClick);

  // If the button is removed from DOM without removing the listener
  // some browsers may keep references around (less an issue now, but still a pattern).
}

/*
  Even more common:
    - You add listeners on window/document
    - You never remove them → long-lived references
*/

/// GOOD:
function attachSafe() {
  const bigObj = { data: new Array(1e5).fill("foo") };
  const btn = document.getElementById("safe-btn");

  function handleClick() {
    console.log(bigObj.data[0]);
  }

  btn.addEventListener("click", handleClick);

  // later, when component/view is destroyed:
  function cleanup() {
    btn.removeEventListener("click", handleClick);
    // Now bigObj can be collected (if nothing else references it)
  }

  // e.g., call cleanup() on route change / component unmount
}



/* ------------------------------------------------------------
   D) LEAK: DETACHED DOM NODES
   ------------------------------------------------------------ */
/*
  ✔ A detached DOM node = element removed from DOM tree
    but still referenced in JS → stays in memory.
*/

/// BAD:
let cachedElements = [];

function createAndRemoveNodes() {
  const container = document.getElementById("container");

  for (let i = 0; i < 100; i++) {
    const el = document.createElement("div");
    el.textContent = "Item " + i;
    container.appendChild(el);

    // store reference in long-lived array
    cachedElements.push(el);
  }

  // later:
  container.innerHTML = ""; // removes from DOM, but NOT from cachedElements
}

/*
  ✔ DOM nodes are removed visually,
    but cachedElements keeps them alive → memory leak.
*/

/// GOOD:
function createAndRemoveNodesSafe() {
  const container = document.getElementById("container");
  const localCache = [];

  for (let i = 0; i < 100; i++) {
    const el = document.createElement("div");
    el.textContent = "Item " + i;
    container.appendChild(el);
    localCache.push(el);
  }

  // later, before removal:
  localCache.length = 0;       // drop references
  container.innerHTML = "";    // remove from DOM
}



/* ------------------------------------------------------------
   E) LEAK: CLOSURES CAPTURING LARGE OBJECTS
   ------------------------------------------------------------ */

function heavyClosure() {
  const bigArray = new Array(1e6).fill("data");

  return function () {
    // even if we don't use bigArray, closure keeps it alive
    console.log("I am a closure");
  };
}

const fn = heavyClosure();
// bigArray cannot be GC'ed as long as `fn` is referenced

/// FIX:
function lighterClosure() {
  const bigArray = new Array(1e6).fill("data");

  const valueYouNeed = bigArray[0]; // store only what's necessary

  return function () {
    console.log("Using only:", valueYouNeed);
  };
}



/* ------------------------------------------------------------
   F) LEAK: GROWING CACHES / MAPS / ARRAYS (NO EVICTION)
   ------------------------------------------------------------ */

/// BAD:
const myCache = {};

function cacheData(key, data) {
  myCache[key] = data;  // data never removed
}

/*
  ✔ If keys are user-generated (e.g., search queries),
    cache grows FOREVER → memory leak.
*/

/// GOOD: implement eviction policy (LRU, TTL, max size, etc.)
class SimpleCache {
  constructor(maxSize = 100) {
    this.maxSize = maxSize;
    this.map = new Map();
  }

  set(key, value) {
    if (this.map.size >= this.maxSize) {
      // delete oldest (first inserted)
      const firstKey = this.map.keys().next().value;
      this.map.delete(firstKey);
    }
    this.map.set(key, value);
  }

  get(key) {
    return this.map.get(key);
  }
}



/* ============================================================
   3. MEMORY PROFILING IN CHROME DEVTOOLS (OVERVIEW)
   ============================================================
   We'll outline the main tools & steps (pseudo-instructions in comments).
*/

/*
  TOOLS:
    1) Performance Tab
       - Record CPU & memory usage over time
       - See JS heap size, GC events

    2) Memory Tab
       - Heap Snapshot
       - Allocation instrumentation on timeline
       - Allocation sampling

    3) Performance Monitor
       - Live metrics (JS heap size, DOM nodes, etc.)
*/



/* ------------------------------------------------------------
   A) HEAP SNAPSHOT (Memory Tab)
   ------------------------------------------------------------
   Steps (conceptual, not code):

   1) Open DevTools → "Memory" panel.
   2) Select "Heap snapshot".
   3) Take snapshot.
   4) Perform actions in app (open/close view, route, etc.).
   5) Take another snapshot.
   6) Compare:
        - Objects that should be gone but remain
        - Retainer paths (who is holding reference?)

   Key columns:
      - Constructor / Type
      - Distance (from root)
      - Retained size (memory kept alive by this object)
      - Shallow size
*/



/* ------------------------------------------------------------
   B) ALLOCATION INSTRUMENTATION ON TIMELINE
   ------------------------------------------------------------
   Steps:

   1) Memory panel → "Allocation instrumentation on timeline".
   2) Start recording.
   3) Use app (e.g., open/close chat windows repeatedly).
   4) Stop recording.
   5) Look at allocation timeline:
        - Are allocations constantly increasing without dropping?
        - Are certain functions allocating too much?

   You can drill down to see what code allocated the memory.
*/



/* ------------------------------------------------------------
   C) PERFORMANCE TAB — RECORD + GC
   ------------------------------------------------------------
   Steps:

   1) Open "Performance" tab.
   2) Check "Memory" option to record memory.
   3) Click record, use app, then stop.
   4) Inspect "JS Heap" timeline:
        - Should see a "sawtooth" pattern:
             heap grows → GC → drops → grows → drops
        - If line steadily climbs without coming down:
             likely memory leak.
*/



/* ------------------------------------------------------------
   D) LIVE MONITORING
   ------------------------------------------------------------
   1) Open "Performance monitor" (in DevTools command menu).
   2) Watch:
        - JS heap size
        - DOM nodes
        - Document count, listeners, etc.
   3) Interact with app (open/close modals, routes).
   4) Check if counts return to baseline after closing features.
*/



/* ============================================================
   4. PRACTICAL LEAK DEBUGGING WORKFLOW
   ============================================================
   Example scenario:
     - You have a SPA (Single Page App).
     - Each time you open & close a modal, memory usage goes up.
     - It never goes back down → leak.
*/

/*
  STEP-BY-STEP (conceptual):

  1) Reproduce:
      - Open modal 10 times → watch memory.
      - Confirm steady growth.

  2) Use Performance Monitor:
      - Check DOM node count, listener count.
      - If they increase and never go back → hints.

  3) Take Heap Snapshots:
      - Snapshot A: baseline.
      - Open & close modal several times.
      - Snapshot B.
      - Compare: look for modal-related components still in memory.

  4) Inspect retainer paths:
      - find leaked object (e.g., ModalView)
      - see "Retainers" → which objects keep it alive
      - maybe event listener on window still referencing it
      - or global store

  5) Fix:
      - remove event listeners in cleanup
      - null out references if needed
      - avoid storing DOM nodes globally

  6) Re-measure:
      - Repeat steps, verify memory stabilizes.
*/



/* ============================================================
   5. PREVENTION STRATEGIES (CHECKLIST)
   ============================================================
*/
/*
  ✔ 1) Use strict mode or ES modules to avoid accidental globals.

  ✔ 2) For every addEventListener, plan a removeEventListener:
       - especially on window, document, and long-lived elements.

  ✔ 3) Clear timers:
       - For each setInterval / setTimeout that repeats or may outlive a view,
         ensure you call clearInterval / clearTimeout when done.

  ✔ 4) Avoid retaining DOM nodes in long-lived structures:
       - Don’t store DOM elements in global arrays or caches without eviction.

  ✔ 5) Be careful with closures:
       - Don’t close over huge objects if you only need a small piece.
       - Extract needed values to local variables.

  ✔ 6) Manage caches:
       - Implement max size or time-based eviction.
       - Use WeakMap / WeakSet for cache keyed by objects.

  ✔ 7) Clean up on teardown / unmount:
       - If you're building components (React, vanilla, etc.),
         provide a cleanup function that removes listeners,
         clears intervals, resets references.

  ✔ 8) Use DevTools regularly:
       - Monitor JS heap & DOM nodes while developing.
       - Catch leaks early.
*/



/* ============================================================
   6. WEAKMAP & WEAKSET TO AVOID SOME LEAKS
   ============================================================
*/
/*
  ✔ WeakMap/WeakSet allow their keys (objects) to be GC'ed
    even if they are still in the WeakMap/WeakSet.

  ✔ Useful for associating data with DOM nodes or objects
    without preventing GC.
*/

/// Example:
const metaData = new WeakMap();

function trackElement(el, info) {
  metaData.set(el, info);
  // When el is removed and no other references remain,
  // GC can collect it AND its metadata.
}



/* ============================================================
   7. NODE.JS MEMORY PROFILING (BRIEF)
   ============================================================
*/
/*
  ✔ In Node:
      - Use --inspect flag:
          node --inspect index.js
      - Connect Chrome DevTools → inspect memory.
      - Use process.memoryUsage() for quick checks.
      - Tools like clinic.js, heapdump, etc.

  ✔ Same patterns:
      - Global caches
      - Long-lived timers
      - Never-ending listeners
*/



/* ============================================================
   SUMMARY (CHEAT SHEET)
   ============================================================
*/
/*
  ✔ Memory Leak = data that’s no longer needed but still reachable.

  ✔ Common Causes:
      - Accidental globals
      - Un-cleared intervals/timeouts
      - Event listeners never removed
      - Detached DOM nodes referenced in JS
      - Closures holding large structures
      - Caches with no limits

  ✔ Detection:
      - Chrome DevTools:
          • Memory → Heap snapshots
          • Memory → Allocation instrumentation
          • Performance → JS heap timeline
          • Performance Monitor → live heap & node counts

  ✔ Fix/Prevention:
      - Always clean up listeners & timers
      - Avoid unnecessary global references
      - Limit caches, use WeakMap/WeakSet when appropriate
      - Be mindful of what closures capture
      - Regularly profile in development

  MENTAL MODEL:
    → GC is smart but not magical.
      If you keep references to stuff you don’t use anymore,
      it CANNOT free that memory.
      Your job is to let go of objects when you’re done with them.
*/
