/*
  EVENT LOOP DEEP DIVE IN JAVASCRIPT
  ----------------------------------
  ✔ JavaScript is SINGLE-THREADED (one call stack).
  ✔ But it can handle ASYNC tasks without blocking.
  ✔ The "Event Loop" is the mechanism that coordinates:
        - Call Stack
        - Web APIs / Node APIs
        - Task Queue (Macrotask Queue)
        - Microtask Queue (Jobs Queue)

  GOAL OF EVENT LOOP:
    → Keep JS responsive by scheduling when callbacks run.
*/



/* ============================================================
   1. HIGH-LEVEL ARCHITECTURE
   ============================================================
   Conceptual model (Browser):

      +---------------------------+
      |       JS ENGINE           |
      |                           |
      |   +-------------------+   |
      |   | Call Stack        |   |
      |   +-------------------+   |
      |   | Heap (Memory)     |   |
      |   +-------------------+   |
      +---------------------------+
                  |
                  v
      +---------------------------+
      | Web APIs (Timers, DOM,   |
      |   Fetch, Events, etc.)   |
      +---------------------------+
                  |
         Tasks/Microtasks created
                  |
          +------------------+       +------------------+
          | Task Queue       |       | Microtask Queue  |
          | (Macrotasks)     |       | (Microtasks)     |
          +------------------+       +------------------+
                  |                          |
                  +-----------+--------------+
                              v
                         EVENT LOOP
                     (decides what to run next)

  VERY IMPORTANT:
    ✔ Only ONE thing runs on the CALL STACK at a time.
    ✔ Asynchronous operations are offloaded to Web APIs/Node APIs.
    ✔ When they finish, callbacks are put into the appropriate queue.
    ✔ Event Loop moves them from queues → call stack.
*/



/* ============================================================
   2. CALL STACK — WHERE JS EXECUTES
   ============================================================
   ✔ Stack of function calls.
   ✔ LIFO (Last In, First Out)
*/

function c() {
  console.log("Inside c");
}

function b() {
  c(); // c pushed on top of b
}

function a() {
  b(); // b pushed on top of a
}

a();

/*
  Call Stack flow:
    - global() enters
    - a() pushed
    - b() pushed
    - c() pushed
    - c() finishes → popped
    - b() finishes → popped
    - a() finishes → popped
*/



/* ============================================================
   3. SYNCHRONOUS VS ASYNCHRONOUS CODE
   ============================================================
*/

console.log("1 - sync start");

setTimeout(() => {
  console.log("3 - from setTimeout (async)");
}, 0);

console.log("2 - sync end");

/*
  Output:
    1 - sync start
    2 - sync end
    3 - from setTimeout (async)

  EXPLANATION:
    - setTimeout callback is scheduled via Web API
    - After delay (0ms), its callback is pushed into Task Queue
    - Event Loop waits until Call Stack is EMPTY
    - Then moves callback from Task Queue → Call Stack
*/



/* ============================================================
   4. MACROTASKS (TASK QUEUE) VS MICROTASKS (MICROTASK QUEUE)
   ============================================================
   ✔ Macrotasks examples:
       - setTimeout
       - setInterval
       - setImmediate (Node)
       - I/O callbacks
       - messageChannel, postMessage, some DOM events

   ✔ Microtasks examples:
       - Promise .then / .catch / .finally
       - queueMicrotask()
       - MutationObserver callbacks
       - process.nextTick (Node, though special)

   ORDER OF EXECUTION:
     1) Run current call stack
     2) Run ALL microtasks in Microtask Queue
     3) Run ONE macrotask (Task Queue)
     4) Go back to step 1
*/



/* ------------------------------------------------------------
   DEMO: PROMISE (MICROTASK) VS setTimeout (MACROTASK)
   ------------------------------------------------------------ */

console.log("A - start");

setTimeout(() => {
  console.log("C - setTimeout");
}, 0);

Promise.resolve()
  .then(() => console.log("B - Promise microtask"))
  .then(() => console.log("B2 - Promise microtask chain"));

console.log("D - end");

/*
  Output:
    A - start      (sync)
    D - end        (sync)
    B - Promise microtask      (microtask)
    B2 - Promise microtask     (microtask, same job chain)
    C - setTimeout             (macrotask)

  WHY?
    - All synchronous code first: A, D
    - Event loop: call stack empty → run ALL microtasks:
         B, then B2
    - Only AFTER microtasks → run macrotask (setTimeout callback)
*/



/* ============================================================
   5. EVENT LOOP CYCLE (TICK)
   ============================================================
   One "tick" of event loop:

     WHILE true:
       - If Call Stack is empty:
            - Run ALL jobs from Microtask Queue
            - If Call Stack still empty:
                - Take 1 task from Task Queue (macrotask)
                - Push its callback to Call Stack
       - Execute...

   KEY:
     ✔ Microtasks have HIGHER priority than macrotasks.
*/



/* ============================================================
   6. queueMicrotask (MANUAL MICROTASK)
   ============================================================
*/

console.log("1 - start microtask demo");

setTimeout(() => {
  console.log("4 - setTimeout (macrotask)");
}, 0);

queueMicrotask(() => {
  console.log("2 - queueMicrotask (microtask)");
});

Promise.resolve().then(() => {
  console.log("3 - Promise microtask");
});

console.log("5 - end microtask demo");

/*
  Likely Output:
    1 - start microtask demo
    5 - end microtask demo
    2 - queueMicrotask (microtask)
    3 - Promise microtask
    4 - setTimeout (macrotask)

  ORDER:
    - sync: 1,5
    - microtasks: queueMicrotask, Promise then
    - macrotask: setTimeout
*/



/* ============================================================
   7. LONG-RUNNING TASK BLOCKS EVERYTHING
   ============================================================
*/

console.log("Blocking demo - start");

setTimeout(() => {
  console.log("This setTimeout is delayed by blocking code");
}, 0);

const start = Date.now();
while (Date.now() - start < 2000) {
  // busy wait 2s → blocks the call stack
}

console.log("Blocking demo - end");

/*
  Output:
    Blocking demo - start
    Blocking demo - end
    This setTimeout is delayed by blocking code   (after ~2s)

  REASON:
    - While loop blocks the stack for 2s
    - Event loop cannot run tasks or microtasks until stack is free
*/



/* ============================================================
   8. ASYNC / AWAIT & THE EVENT LOOP
   ============================================================
   ✔ async/await is syntactic sugar over Promises.
   ✔ await causes the async function to pause
     and resumes in a microtask.
*/

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function asyncDemo() {
  console.log("asyncDemo start");

  await wait(0); // yields control

  console.log("asyncDemo after await");
}

console.log("Before asyncDemo");
asyncDemo();
console.log("After asyncDemo");

/*
  Possible Output:
    Before asyncDemo
    asyncDemo start
    After asyncDemo
    asyncDemo after await

  WHY?
    - "asyncDemo start" is synchronous before first await
    - await wait(0):
        -> wait(0) returns Promise that resolves via setTimeout (macrotask)
        -> after timer, Promise resolves; its .then is enqueued as microtask
    - "After asyncDemo" runs (still in same tick)
    - Then microtask queue runs → logs "asyncDemo after await"
*/



/* ============================================================
   9. PROMISE CHAINING & MICROTASK FLUSHING
   ============================================================
   ✔ Each .then creates microtask(s).
   ✔ ALL microtasks in queue are processed before any macrotask.
*/

console.log("=== Microtask chain demo ===");

setTimeout(() => console.log("Macrotask: setTimeout"), 0);

Promise.resolve()
  .then(() => {
    console.log("Microtask 1");
    return "from 1";
  })
  .then(val => {
    console.log("Microtask 2:", val);
  })
  .then(() => {
    console.log("Microtask 3");
  });

/*
  Output:
    === Microtask chain demo ===
    Microtask 1
    Microtask 2: from 1
    Microtask 3
    Macrotask: setTimeout
*/



/* ============================================================
   10. BROWSER VS NODE.JS EVENT LOOP (HIGH LEVEL)
   ============================================================
   BROWSER:
     ✔ Task Queue & Microtask Queue (as above)
     ✔ Web APIs: DOM, timers, fetch, etc.

   NODE.JS (simplified):
     ✔ Uses libuv + its own event loop phases:
         1) timers          → setTimeout, setInterval
         2) pending callbacks
         3) idle, prepare
         4) poll            → I/O
         5) check           → setImmediate
         6) close callbacks
       Between ticks: process microtasks (promises, nextTick)

   Node microtask-like API:
     - process.nextTick (higher priority than Promise microtasks)
     - Promise.then (microtasks)

   EXAMPLE SIMPLE NODE ORDER (conceptual):
     - process.nextTick callbacks
     - Promise microtasks
     - then event loop phases
*/



/* ============================================================
   11. PRACTICAL SCENARIO: UI + EVENT LOOP
   ============================================================
   Suppose you are scrolling and there's an onscroll handler:

   window.addEventListener("scroll", () => {
     // heavy calc
   });

   If heavy calc is synchronous & slow:
     ✔ UI stutters because event handlers block call stack.

   Solution:
     ✔ throttle / debounce scroll handlers
     ✔ break big tasks into smaller chunks using:
          - setTimeout(fn, 0)
          - requestIdleCallback
          - web workers (different thread)
*/



/* ============================================================
   12. STARVATION RISK: MICROTASKS LOOPING FOREVER
   ============================================================
   If you KEEP queuing microtasks inside microtasks,
   they can starve the macrotask queue.
*/

Promise.resolve().then(function chain() {
  console.log("microtask loop...");
  // queue another microtask:
  Promise.resolve().then(chain);
});

/*
  This pattern (in theory) can:
    ✔ Keep microtask queue non-empty
    ✔ Prevent macrotasks (like setTimeout) from running
  In practice, browsers may have safeguards, but it's a bad pattern.
*/



/* ============================================================
   13. SIMPLE MENTAL TIMELINE EXAMPLE
   ============================================================
*/

console.log("1");

setTimeout(() => console.log("6 - timeout 0"), 0);

Promise.resolve()
  .then(() => console.log("3 - promise then 1"))
  .then(() => console.log("4 - promise then 2"));

console.log("2");

setTimeout(() => console.log("7 - timeout 0 #2"), 0);

queueMicrotask(() => console.log("5 - queueMicrotask"));

/*
  Order:
    sync: 1,2
    microtasks:
        3 (promise then 1)
        4 (promise then 2)
        5 (queueMicrotask)
    macrotasks:
        6 (timeout 0)
        7 (timeout 0 #2)

  So:
    1
    2
    3
    4
    5
    6
    7
*/



/* ============================================================
   14. KEY TAKEAWAYS (CHEAT SHEET)
   ============================================================
*/
/*
  ✔ JS is single-threaded (one call stack).
  ✔ Asynchronous behavior is coordinated by:
        - Web APIs / Node APIs
        - Task (Macrotask) Queue
        - Microtask Queue
        - Event Loop

  ✔ Microtasks (Promises, queueMicrotask, MutationObserver):
        - Higher priority than macrotasks
        - All microtasks are drained before next macrotask

  ✔ Macrotasks (setTimeout, setInterval, I/O, setImmediate, etc.)
        - Executed one per event loop iteration after microtasks

  ✔ async/await:
        - Built on top of Promises
        - await yields execution; continuation goes to microtask queue

  ✔ Heavy synchronous work blocks EVERYTHING:
        - Avoid large blocking loops on main thread
        - Use chunking, async patterns, or web workers

  MENTAL MODEL:
    → Think of the Event Loop as a traffic controller:
        - Call Stack = what’s running now
        - Web APIs = background workers
        - Microtask Queue = VIP fast lane
        - Task Queue = normal lane
      The Event Loop ALWAYS lets VIP (microtasks) go first
      once the road (call stack) is free.
*/
