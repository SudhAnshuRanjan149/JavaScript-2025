/*
  PERFORMANCE OPTIMIZATION IN JAVASCRIPT — GREAT DETAIL
  -----------------------------------------------------
  ✔ Performance optimization means writing JS that runs faster,
    uses less memory, handles large data efficiently, and improves
    user experience (UX).

  ✔ IMPORTANT AREAS:
      1) Algorithmic optimizations
      2) DOM optimization
      3) Event optimization (throttle, debounce)
      4) Memory optimization / GC behavior
      5) Async + parallelism (Web Workers)
      6) Network optimization (fetch, caching)
      7) Rendering / repaint / reflow
      8) Bundling & code-splitting
*/



/* ============================================================
   1. ALGORITHMIC OPTIMIZATIONS
   ============================================================
*/
/*
  ✔ The biggest speed improvements come from reducing complexity:
       - O(n) vs O(n²)
       - Using maps/sets instead of arrays
*/

/// BAD: O(n²)
function removeDuplicatesBad(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (!result.includes(arr[i])) {
      result.push(arr[i]);
    }
  }
  return result;
}

/// GOOD: O(n)
function removeDuplicatesGood(arr) {
  return [...new Set(arr)];
}



/* ============================================================
   2. DOM PERFORMANCE (VERY IMPORTANT)
   ============================================================
*/
/*
  ✔ DOM is slow — minimize:
      - DOM access
      - DOM modifications
      - Layout recalculations
      - Reflows & repaints
*/

/// BAD: multiple DOM updates
const list = document.querySelector("#list");
for (let i = 0; i < 1000; i++) {
  const item = document.createElement("li");
  item.textContent = "Item " + i;
  list.appendChild(item); // causes reflow each time
}

/// GOOD: use DocumentFragment
const frag = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const item = document.createElement("li");
  item.textContent = "Item " + i;
  frag.appendChild(item);
}
list.appendChild(frag); // ONE reflow



/* ============================================================
   3. BATCH DOM READ/WRITE OPS
   ============================================================
*/
const el = document.querySelector("#box");

/// BAD:
const height = el.offsetHeight;
el.style.width = height + "px"; // forces layout

/// GOOD:
const height2 = el.offsetHeight; // read
requestAnimationFrame(() => {
  el.style.width = height2 + "px"; // write later
});



/* ============================================================
   4. EVENT OPTIMIZATION (DEBOUNCE / THROTTLE)
   ============================================================
*/
// DEBOUNCE
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// THROTTLE
function throttle(fn, delay) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= delay) {
      last = now;
      fn(...args);
    }
  };
}

window.addEventListener("resize", debounce(() => {
  console.log("resize optimized");
}, 250));



/* ============================================================
   5. AVOID MEMORY LEAKS
   ============================================================
*/
/*
  ✔ Common memory leaks:
      - Unremoved event listeners
      - Detached DOM nodes
      - Closures holding references
      - Large arrays never cleared
      - Global variables
*/

/// BAD: event listener never removed
function leak() {
  const el = document.getElementById("btn");
  el.addEventListener("click", () => {});
}

/// GOOD:
function safe() {
  const el = document.getElementById("btn");
  const handler = () => {};
  el.addEventListener("click", handler);

  // later
  el.removeEventListener("click", handler);
}



/* ============================================================
   6. LAZY LOADING / CODE SPLITTING
   ============================================================
*/
/*
  ✔ Load code only when needed.
*/

/// dynamic import:
document.getElementById("load-btn").onclick = async () => {
  const module = await import("./heavy-module.js");
  module.run();
};



/* ============================================================
   7. ASYNC + PARALLELISM WITH WEB WORKERS
   ============================================================
*/
/*
  ✔ Use Web Workers for CPU-heavy work:
      - image processing
      - big JSON parsing
      - encryption
      - compression
*/

/// worker.js
/*
self.onmessage = (e) => {
  const result = heavyCompute(e.data);
  self.postMessage(result);
};
*/

/// main.js
/*
const worker = new Worker("worker.js");
worker.postMessage(largeData);
worker.onmessage = (e) => console.log("Result:", e.data);
*/



/* ============================================================
   8. USE requestAnimationFrame() FOR ANIMATIONS
   ============================================================
*/

function animate() {
  // change position, style ...
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

/// BAD: setInterval animation → janky



/* ============================================================
   9. MINIMIZE LAYOUT THRASHING
   ============================================================
*/
/*
  ✔ Layout thrashing = repeatedly forcing browser layout cycles
  ✔ Avoid alternating reads & writes:
*/

/// BAD:
el.style.height = "100px";
console.log(el.offsetHeight);
el.style.width = "200px";
console.log(el.offsetWidth);

/// GOOD:
const height3 = el.offsetHeight;
const width3 = el.offsetWidth;

requestAnimationFrame(() => {
  el.style.height = height3 + "px";
  el.style.width = width3 + "px";
});



/* ============================================================
   10. OPTIMIZE LOOPS
   ============================================================
*/

/// BAD: recalculating length
for (let i = 0; i < arr.length; i++) {}

/// GOOD:
for (let i = 0, len = arr.length; i < len; i++) {}

/// EVEN BETTER: for-of (if not critical performance)
for (const item of arr) {}



/* ============================================================
   11. USE Map / Set INSTEAD OF OBJECT / ARRAY WHERE NEEDED
   ============================================================
*/

/// faster lookups:
const map = new Map();
map.set("a", 1);
map.get("a"); // O(1)



/* ============================================================
   12. AVOID EXPENSIVE OPERATIONS INSIDE LOOPS
   ============================================================
*/

/// BAD:
for (let i = 0; i < items.length; i++) {
  document.querySelector("#title").textContent = i;
}

/// GOOD:
const title = document.querySelector("#title");
for (let i = 0; i < items.length; i++) {
  title.textContent = i;
}



/* ============================================================
   13. PREFETCHING & PRELOADING (NETWORK OPTIMIZATION)
   ============================================================
*/

/*
  <link rel="preload" href="main.js">
  <link rel="prefetch" href="next-page.js">
*/



/* ============================================================
   14. LOCAL CACHE / MEMORY CACHE
   ============================================================
*/

const cache = {};
function expensiveFn(x) {
  if (cache[x]) return cache[x];
  let result = x * 10000;
  cache[x] = result;
  return result;
}



/* ============================================================
   15. DEFER & ASYNC FOR SCRIPTS
   ============================================================
*/
/*
  ✔ <script defer src="..."> → runs after HTML ready
  ✔ <script async src="..."> → loads in parallel, order not guaranteed
*/



/* ============================================================
   16. WEB VITALS OPTIMIZATION
   ============================================================
*/
/*
  ✔ Optimize:
      - LCP (Largest Contentful Paint)
      - FID (First Input Delay)
      - CLS (Cumulative Layout Shift)
*/



/* ============================================================
   17. PRODUCTION BUILD OPTIMIZATION
   ============================================================
*/
/*
  ✔ Minify JS + CSS
  ✔ Remove dead code (tree shaking)
  ✔ Gzip/brotli compression
  ✔ CDN for static files
*/



/* ============================================================
   18. PERFORMANCE PROFILING TOOLS
   ============================================================
*/
/*
  ✔ Chrome DevTools → Performance tab
  ✔ Memory profiler → find leaks
  ✔ Lighthouse → score & suggestions
  ✔ Web Vitals library
*/



/* ============================================================
   SUMMARY (CHEAT SHEET)
   ============================================================
*/
/*
  ✔ DOM is slow — minimize reads/writes, use fragments, debouncing.
  ✔ Use Web Workers for CPU-heavy tasks.
  ✔ Avoid memory leaks & clear event listeners.
  ✔ Use efficient algorithms (avoid O(n²)).
  ✔ Cache frequently accessed data.
  ✔ Optimize loops & avoid layout thrashing.
  ✔ Use lazy loading & code splitting.
  ✔ Use rAF for animation, not setInterval.
  ✔ Use Streams, IndexedDB, and Service Workers for network performance.
  ✔ Profile performance regularly.

  MENTAL MODEL:
    → Optimize the BIGGEST bottlenecks:
         - Avoid heavy work on main thread
         - Avoid excessive reflows/repaints
         - Reduce JS size & operations
         - Use async & streaming when possible
*/
