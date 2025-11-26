/*
  EVENT LOOP IN JAVASCRIPT — DETAILED EXPLANATION
  -----------------------------------------------
  JavaScript is:
      - single-threaded  (one call stack)
      - non-blocking     (can handle async tasks)

  Question:
    How can JS be single-threaded BUT still handle async operations like:
      - setTimeout
      - fetch / AJAX
      - events (click, input)
      - promises
      - async/await

  Answer:
    → Because of the EVENT LOOP

  The EVENT LOOP coordinates:
      1. Call Stack
      2. Web APIs (or Node APIs)
      3. Callback Queue (Task Queue / Macrotask Queue)
      4. Microtask Queue (Promise jobs)
*/



/* ============================================================
   1. COMPONENTS INVOLVED
   ============================================================

   1) CALL STACK
      - Where functions are executed.
      - LIFO (Last In, First Out).

   2) WEB APIs (BROWSER) / NODE APIs
      - setTimeout, DOM events, fetch, etc.
      - These run outside JS engine in the browser environment.

   3) CALLBACK QUEUE (TASK / MACROTASK QUEUE)
      - Stores callbacks from:
          * setTimeout
          * setInterval
          * DOM events
          * some other async APIs

   4) MICROTASK QUEUE (JOB QUEUE)
      - Stores callbacks from:
          * Promises (then/catch/finally)
          * MutationObserver
      - Has HIGHER PRIORITY than Callback Queue.

   5) EVENT LOOP
      - Continuously checks:
          → Is the Call Stack empty?
          → If yes:
                - First, run all Microtasks
                - Then, take next Macrotask from Callback Queue
*/



/* ============================================================
   2. SIMPLE EXAMPLE: setTimeout VS normal code
   ============================================================
*/

console.log("A");

setTimeout(() => {
  console.log("B (timeout callback)");
}, 0);

console.log("C");

/*
  EXPECTED OUTPUT:
    A
    C
    B (timeout callback)

  WHY?
    1. "A" goes to call stack → logged.
    2. setTimeout(...) goes to call stack:
         - browser registers timer in Web API
         - callback moves to Callback Queue AFTER timer finishes (0ms).
    3. "C" goes to call stack → logged.
    4. Call Stack is now EMPTY.
    5. Event Loop:
         - sees callback in Callback Queue
         - pushes it onto Call Stack
         - logs "B (timeout callback)".
*/



/* ============================================================
   3. MICROTASKS VS MACROTASKS PRIORITY (PROMISE VS setTimeout)
   ============================================================
*/

console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise then");
});

console.log("End");

/*
  EXPECTED OUTPUT:
    Start
    End
    Promise then
    Timeout

  EXPLANATION:
    - "Start" → call stack → logged.
    - setTimeout(...) → Web API → callback → Callback Queue.
    - Promise.then(...) → Microtask Queue.
    - "End" → logged.
    - Call Stack empty →
        1. Event Loop first checks Microtask Queue:
            → executes "Promise then".
        2. Then Callback Queue:
            → executes "Timeout".
*/



/* ============================================================
   4. EVENT LOOP ORDER: DETAILED STEP-BY-STEP
   ============================================================

   PSEUDO-ALGORITHM:

   while (true) {
     if (CallStack is empty) {
       // 1. process all microtasks first
       while (MicrotaskQueue not empty) {
         take next microtask
         push onto CallStack
         execute it
       }

       // 2. then process one macrotask
       if (CallbackQueue not empty) {
         take first callback
         push onto CallStack
         execute it
       }
     }
   }
*/



/* ============================================================
   5. EXAMPLE: MULTIPLE PROMISES & TIMEOUTS
   ============================================================
*/

console.log("1");

setTimeout(() => {
  console.log("2 - setTimeout 0ms");
}, 0);

Promise.resolve().then(() => {
  console.log("3 - first promise");
}).then(() => {
  console.log("4 - second promise");
});

console.log("5");

/*
  EXPECTED OUTPUT:
    1
    5
    3 - first promise
    4 - second promise
    2 - setTimeout 0ms

  WHY?
    - "1" → sync
    - setTimeout → async macrotask
    - Promise chain → microtasks
    - "5" → sync

    Order after stack empty:
      1) Process all microtasks:
           "3 - first promise"
           "4 - second promise"
      2) Then process macrotask:
           "2 - setTimeout 0ms"
*/



/* ============================================================
   6. EVENT LOOP WITH DOM EVENTS
   ============================================================
*/

/*
  HTML:
    <button id="btn">Click me</button>
*/

const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
  console.log("Button clicked");
});

/*
  FLOW:
    - User clicks button.
    - Browser detects event via Web API (Event system).
    - The callback (listener) is pushed to Callback Queue.
    - Event Loop checks:
        → If Call Stack is empty → pushes callback onto stack → executes.
*/



/* ============================================================
   7. LONG-RUNNING TASK BLOCKING EVENT LOOP
   ============================================================
*/

console.log("Before long task");

setTimeout(() => {
  console.log("Timeout after long task");
}, 0);

let start = Date.now();
while (Date.now() - start < 3000) {
  // Simulate heavy synchronous task (3 seconds)
}

console.log("After long task");

/*
  Despite setTimeout(0), output will be:

    Before long task
    After long task
    Timeout after long task

  WHY?
    - While loop blocks Call Stack for ~3 seconds.
    - Event Loop cannot add timeout callback until stack is free.
    - So async tasks are delayed by long sync code.
*/



/* ============================================================
   8. BROWSER VS NODE.JS EVENT LOOP (HIGH LEVEL)
   ============================================================

   BROWSER EVENT LOOP:
     - Provided by browser runtime.
     - Manages:
         * Web APIs (DOM, timers, network)
         * Callback Queue
         * Microtask Queue
         * Rendering pipeline (repaints, reflows)

   NODE.JS EVENT LOOP:
     - Implemented using libuv (C library).
     - Has phases:
         1. timers
         2. pending callbacks
         3. idle/prepare
         4. poll
         5. check
         6. close callbacks
     - Also has:
         * Microtask queue for Promises
         * process.nextTick queue (even higher priority)

   BUT conceptually:
     - both still revolve around:
         → call stack
         → task queues
         → microtasks
         → event loop scheduling
*/



/* ============================================================
   9. EVENT LOOP IN ASYNC/AWAIT
   ============================================================
*/

async function asyncExample() {
  console.log("Async start");

  const result = await new Promise(resolve => {
    setTimeout(() => {
      resolve("Done!");
    }, 1000);
  });

  console.log("Async result:", result);
}

console.log("Before async");
asyncExample();
console.log("After async");

/*
  EXPECTED ORDER:
    Before async
    Async start
    After async
    (after 1s) Async result: Done!

  EXPLANATION:
    - asyncExample() runs until first `await`.
    - At `await`, returns a Promise and pauses the function.
    - When Promise resolves, its then-callback is queued as a microtask.
    - Event loop later resumes async function execution from where it paused.
*/



/* ============================================================
   10. SUMMARY (KEY POINTS)
   ============================================================

   ✔ JavaScript is single-threaded → one Call Stack.
   ✔ Event Loop connects:
        - Call Stack
        - Web/Node APIs
        - Callback Queue (macrotasks)
        - Microtask Queue (promises)
   ✔ Microtasks (Promise jobs) run BEFORE macrotasks (setTimeout).
   ✔ Async tasks are never executed while stack is busy.
   ✔ Long synchronous operations block the Event Loop.
   ✔ Understanding Event Loop is CRITICAL for:
        - async/await
        - Promises
        - performance
        - avoiding UI freezes in browser
*/
