/****************************************************************************************
 * JAVASCRIPT CONCURRENCY MODEL — COMPLETE & DETAILED NOTES (BEGINNER → ADVANCED)
 * Everything explained using ONLY comments + JavaScript examples.
 *
 * Covers:
 * ✔ Why JS is single-threaded
 * ✔ Call Stack
 * ✔ Heap
 * ✔ Event Loop (HARDCORE DEEP DIVE)
 * ✔ Microtasks vs Macrotasks
 * ✔ Job Queue vs Callback Queue
 * ✔ Promise jobs ordering
 * ✔ Rendering pipeline timing
 * ✔ Web APIs (async browser features)
 * ✔ Message Queue, Task Queue, Microtask Queue
 * ✔ Worker Threads (NOT multithreaded JS, but concurrency)
 * ✔ Atomics & SharedArrayBuffer (true shared memory)
 * ✔ Concurrency vs Parallelism
 * ✔ Blocking the main thread
 * ✔ requestAnimationFrame, requestIdleCallback scheduling
 *
 ****************************************************************************************/


/****************************************************************************************
 * 1. WHY JAVASCRIPT IS SINGLE-THREADED
 ****************************************************************************************/
//
// JS was originally designed for browsers.
// Browsers execute JS in ONE thread to avoid race conditions in DOM updates.
//
// ✔ Only ONE piece of JS runs at a time
// ✔ There is ONLY ONE call stack
//
// So how does JS do async operations?
// → Using the EVENT LOOP + Web APIs + task queues.
//


/****************************************************************************************
 * 2. THE JS RUNTIME = CALL STACK + HEAP + EVENT LOOP + QUEUES
 ****************************************************************************************/
//
// ▢ HEAP → memory allocation area
// ▢ CALL STACK → where functions run (LIFO)
// ▢ WEB APIs → browser-provided async operations (fetch, timer, DOM events)
// ▢ TASK QUEUES → FIFO queues for scheduling callbacks
// ▢ EVENT LOOP → traffic controller between stack & queues
//
// Everything revolves around the *Event Loop*.
//


/****************************************************************************************
 * 3. CALL STACK — One thread runs all JS
 ****************************************************************************************/

function a() { b(); }
function b() { c(); }
function c() { console.log("hello"); }

a();

/*
Stack sequence:
push a
push b
push c
log
pop c
pop b
pop a
*/


/****************************************************************************************
 * 4. EVENT LOOP — The heart of JS concurrency model
 ****************************************************************************************/
//
// The event loop constantly checks:
//
// 1️⃣ Is the call stack empty?
//     - If NO → wait
//     - If YES → push next task from queue
//
// 2️⃣ Which queue has priority?
//     - Microtask queue (highest priority)
//     - Macrotask queue
//     - Rendering tasks
//


/****************************************************************************************
 * 5. MACROTASKS vs MICROTASKS (EXTREMELY IMPORTANT)
 ****************************************************************************************/
//
// ▣ MACROTASKS include:
//   - setTimeout
//   - setInterval
//   - setImmediate (Node)
//   - I/O
//   - script execution
//   - UI events (click, scroll)
//
// ▣ MICROTASKS include:
//   - Promise.then()
//   - async/await (after await)
//   - MutationObserver
//   - queueMicrotask()
//
// RULES:
// ------
// ✔ After EVERY macrotask, JS empties ALL microtasks BEFORE rendering.
// ✔ Microtasks always run BEFORE next paint.
// ✔ Promise callbacks have higher priority over setTimeout.
//
// Example:
console.log("1");

setTimeout(() => console.log("timeout"), 0);

Promise.resolve().then(() => console.log("promise"));

console.log("2");

/*
Output:
1
2
promise
timeout
*/


/****************************************************************************************
 * 6. WHY PROMISES RUN BEFORE TIMEOUTS
 ****************************************************************************************/
//
// Because Promises use MICROTASK queue, while setTimeout uses MACROTASK queue.
// Microtasks are ALWAYS drained before the event loop checks macrotasks.
//


/****************************************************************************************
 * 7. VISUAL DIAGRAM OF EVENT LOOP ORDER (TEXT VERSION)
 ****************************************************************************************/

/*
┌───────────────────────────────┐
│          Call Stack           │
└──────────────┬────────────────┘
               │
               ▼
    Is stack empty?
               │
       YES     ▼
┌───────────────────────────────┐
│     Process ALL Microtasks     │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│       Do Browser Rendering     │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│      Take next Macrotask       │
└───────────────────────────────┘
*/



/****************************************************************************************
 * 8. queueMicrotask() — direct access to microtask queue
 ****************************************************************************************/

queueMicrotask(() => console.log("microtask"));

console.log("sync");

/*
Output:
sync
microtask
*/


/****************************************************************************************
 * 9. WEB APIs — async features NOT part of JS
 ****************************************************************************************/
//
// Timer API → setTimeout, setInterval
// DOM Events → click, keydown
// Network API → fetch(), XHR
//
// They run OUTSIDE the JS thread.
// JS receives callbacks ONLY after event loop approves.
//


/****************************************************************************************
 * 10. EXAMPLE OF Web APIs + Event Loop
 ****************************************************************************************/

console.log("start");

setTimeout(() => {
  console.log("timer done");
}, 0);

fetch("https://api").then(() => console.log("fetch done"));

console.log("end");

/*
Output:
start
end
fetch done    (microtask from Promise)
timer done    (macrotask)
*/


/****************************************************************************************
 * 11. requestAnimationFrame() — Runs BEFORE next repaint
 ****************************************************************************************/

requestAnimationFrame(() => {
  // perfect for animations
});


/****************************************************************************************
 * 12. requestIdleCallback() — LOW-PRIORITY TASKS
 ****************************************************************************************/

requestIdleCallback((deadline) => {
  while (deadline.timeRemaining() > 0) {
    // do small background work
  }
});


/****************************************************************************************
 * 13. WORKER THREADS — NOT shared JS thread
 ****************************************************************************************/
//
// Workers run in parallel threads but:
// ❌ They CANNOT access DOM.
// ✔ Communicate via postMessage()
// ✔ Are ideal for CPU-heavy tasks.
//

// main.js
const worker = new Worker("worker.js");
worker.postMessage({ task: "compute" });
worker.onmessage = (e) => console.log("result:", e.data);

// worker.js
onmessage = (e) => {
  // heavy computation
  postMessage(42);
};


/****************************************************************************************
 * 14. TRUE SHARED MEMORY — SharedArrayBuffer + Atomics
 ****************************************************************************************/
//
// Allows REAL shared memory concurrency (not copying messages).
// Requires knowledge of low-level memory & atomic operations.
//

const shared = new SharedArrayBuffer(4);
const view = new Int32Array(shared);

Atomics.store(view, 0, 100);
Atomics.add(view, 0, 1);


/****************************************************************************************
 * 15. CONCURRENCY vs PARALLELISM
 ****************************************************************************************/
//
// ✔ CONCURRENCY (JS model):
//   Multiple tasks *progress* together but NOT simultaneously executed on main thread.
//
// ✔ PARALLELISM (Workers):
//   Tasks run *physically at same time* on multiple threads.
//
// Single JS thread = concurrency
// Workers = parallelism
// Atomics = true low-level parallel shared memory
//


/****************************************************************************************
 * 16. BLOCKING THE MAIN THREAD
 ****************************************************************************************/
//
// Anything CPU-heavy blocks rendering & interactions:
// --------------------------------------------------
// ❌ while(true)
// ❌ huge loops
// ❌ big sync JSON.parse
// ❌ DOM-heavy operations
//
// Fix:
// ----
// ✔ Move work to Web Workers
// ✔ Split work using requestIdleCallback
// ✔ Use chunking or microtasks
//


/****************************************************************************************
 * 17. Putting it all together — Example Execution Order
 ****************************************************************************************/

console.log("1");

setTimeout(() => console.log("timeout"), 0);

Promise.resolve().then(() => console.log("promise1"));
queueMicrotask(() => console.log("microtask"));

Promise.resolve().then(() => console.log("promise2"));

console.log("2");

/*
Output:
1
2
promise1
microtask
promise2
timeout
*/


/****************************************************************************************
 * FINAL MASTER SUMMARY
 ****************************************************************************************/
//
// ✔ JS is single-threaded but ASYNC thanks to EVENT LOOP
// ✔ Microtasks (Promises) run BEFORE macrotasks (setTimeout)
// ✔ Web APIs handle async operations outside JS thread
// ✔ Event loop processes:
//      1. Stack empty?
//      2. Run all microtasks
//      3. Render
//      4. Process next macrotask
//
// ✔ requestAnimationFrame → before paint
// ✔ requestIdleCallback → low priority async
//
// ✔ Workers = parallel threads (no DOM access)
// ✔ SharedArrayBuffer + Atomics = real shared memory
//
// If you master the JS concurrency model → you understand EVERYTHING about async JS,
// including Promises, async/await, timers, rendering, and performance.
// 🚀🔥
 ****************************************************************************************/
