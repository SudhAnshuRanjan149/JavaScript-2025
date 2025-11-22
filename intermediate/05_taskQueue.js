/*
  TASK QUEUE & MICROTASK QUEUE IN JAVASCRIPT — DETAILED EXPLANATION
  -----------------------------------------------------------------
  JavaScript's concurrency model uses:
      1. Call Stack
      2. Web/Node APIs
      3. **Microtask Queue** (higher priority)
      4. **Task Queue / Macrotask Queue** (lower priority)
      5. Event Loop (scheduler)

  The Event Loop checks:
      → Is the Call Stack empty?
      → If yes:
           1. Run ALL microtasks
           2. Then run ONE task (macrotask)
*/

 

/* ============================================================
   1. WHAT IS THE TASK QUEUE (MACROTASK QUEUE)?
   ============================================================
   Also called:
      - Callback Queue
      - Macrotask Queue
      - Event Queue

   Stores callbacks from:
      ✔ setTimeout
      ✔ setInterval
      ✔ DOM events (click, input)
      ✔ fetch() final callback (but NOT promise handlers)
      ✔ MessageChannel
      ✔ some I/O tasks in Node.js

   Tasks from this queue run AFTER all microtasks.
*/

console.log("A");

setTimeout(() => {
  console.log("Task Queue → setTimeout");
}, 0);

console.log("B");



/* ============================================================
   2. WHAT IS THE MICROTASK QUEUE?
   ============================================================
   Microtasks are **small, high-priority asynchronous tasks**.

   Sources of microtasks:
      ✔ Promises (then / catch / finally)
      ✔ MutationObserver
      ✔ queueMicrotask() function
      ✔ process.nextTick() in Node.js (even higher priority)

   Characteristics:
     - ALWAYS run BEFORE any macrotask
     - Event Loop empties the entire microtask queue EVERY turn
*/

Promise.resolve().then(() => {
  console.log("Microtask → Promise.resolve().then()");
});

queueMicrotask(() => {
  console.log("Microtask → queueMicrotask()");
});



/* ============================================================
   3. EXECUTION ORDER (VERY IMPORTANT)
   ============================================================

   PRIORITY:
       1. Call Stack
       2. Microtasks (run ALL of them)
       3. Macrotasks (run ONE per loop)

   Example:
*/

console.log("1");

setTimeout(() => console.log("4 - setTimeout (task queue)"), 0);

Promise.resolve().then(() => console.log("2 - microtask (promise)"));
Promise.resolve().then(() => console.log("3 - microtask (promise)"));

/*
  Output:
    1
    2 - microtask
    3 - microtask
    4 - setTimeout
*/



/* ============================================================
   4. DETAILED STEP-BY-STEP EXPLANATION OF ORDER
   ============================================================

   INITIAL:
     - Call Stack runs console.log("1")

   ASYNC ACTIONS:
     - setTimeout callback → Task Queue (macrotask)
     - Promise callbacks → Microtask Queue

   EVENT LOOP TURN:
     1. Call Stack empty? YES
     2. Run ALL microtasks
     3. Run next macrotask
*/



/* ============================================================
   5. MICROTASK QUEUE ALWAYS EMPTIES FIRST
   ============================================================
   Even if new microtasks are added WHILE executing microtasks.
*/

Promise.resolve().then(() => {
  console.log("Microtask 1");
  Promise.resolve().then(() => console.log("Microtask 2"));
});

/*
  Output:
    Microtask 1
    Microtask 2
  WHY?
    - Microtask 1 runs first.
    - While running, it adds Microtask 2.
    - Event Loop continues running microtasks until queue is empty.
*/



/* ============================================================
   6. TASK QUEUE RUNS AFTER MICROTASKS
   ============================================================
*/

setTimeout(() => {
  console.log("Task 1");
  Promise.resolve().then(() => console.log("Microtask inside task"));
}, 0);

/*
  Output:
    Task 1
    Microtask inside task

  WHY?
    - Task 1 runs as macrotask.
    - It schedules a microtask.
    - Microtask runs IMMEDIATELY after the macrotask completes.
*/



/* ============================================================
   7. REAL-LIFE EXAMPLE: UI FREEZE WITH MANY MICROTASKS
   ============================================================
   Too many microtasks can block UI because microtasks must finish
   BEFORE the browser can update the UI.
*/

for (let i = 0; i < 100000; i++) {
  Promise.resolve().then(() => {});
}

/*
  Browsers may freeze because:
    - Microtask queue must be emptied before rendering
*/



/* ============================================================
   8. TASK QUEUE VS MICROTASK QUEUE — KEY DIFFERENCES
   ============================================================

   | Feature              | Microtask Queue            | Task Queue (Macrotask)         |
   |----------------------|-----------------------------|---------------------------------|
   | Priority             | HIGH (runs first)           | LOW                             |
   | Examples             | Promises, queueMicrotask    | setTimeout, DOM events          |
   | Runs per loop        | ALL microtasks              | ONE macrotask                   |
   | Blocks UI?           | YES (if too many)           | Less likely                     |
   | When executed?       | Before rendering            | After microtasks                |
*/



/* ============================================================
   9. VISUAL FLOW OF EVENT LOOP
   ============================================================

   ┌─────────────────────────────┐
   │         CALL STACK          │
   └─────────────────────────────┘
                 ↑
                 │
         Event Loop Checks
                 │
   ┌─────────────────────────────┐
   │     MICROTASK QUEUE         │  ← Runs FIRST (Promises, queueMicrotask)
   └─────────────────────────────┘
                 ↑
                 │ (when empty)
                 ↓
   ┌─────────────────────────────┐
   │      TASK QUEUE (MACRO)     │  ← Runs SECOND (setTimeout, events)
   └─────────────────────────────┘
*/



/* ============================================================
   10. SUMMARY
   ============================================================

   ✔ Task Queue (Macrotasks):
       - setTimeout, setInterval, events
       - lower priority
       - only ONE runs per event loop cycle

   ✔ Microtask Queue:
       - Promise.then, queueMicrotask, MutationObserver
       - higher priority
       - ALL microtasks run before ANY macrotask

   ✔ Event Loop order:
       1. Run current call stack
       2. Empty microtasks
       3. Run one macrotask
       4. Repeat

   ✔ Microtasks can starve macrotasks if many are queued.
*/



/* ============================================================
   11. SUPER SIMPLE ANALOGY
   ============================================================

   TASK QUEUE (macrotasks):
     → Regular customers waiting in line.

   MICROTASK QUEUE:
     → VIP customers — always served FIRST and ALL OF THEM.

   The Event Loop:
     → The manager calling customers one-by-one.
*/
