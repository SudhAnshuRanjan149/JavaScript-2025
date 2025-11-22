/*
  CALL STACK IN JAVASCRIPT — DETAILED EXPLANATION
  -----------------------------------------------
  The Call Stack is a data structure used by JavaScript to keep track of
  the order in which functions are executed.

  It follows:
      → LIFO = Last In, First Out

  Meaning:
      - The last function pushed onto the stack is the first to finish.
*/



/* ============================================================
   1. WHAT IS THE CALL STACK?
   ============================================================
   - A stack (vertical structure) that stores execution contexts.
   - Every time a function is called → a new Function Execution Context (FEC)
     is pushed onto the stack.
   - When function finishes → its FEC is popped off the stack.
*/



/* ============================================================
   2. CALL STACK FLOW (EXAMPLE)
   ============================================================
*/

function first() {
  console.log("FIRST function");
  second();
}

function second() {
  console.log("SECOND function");
  third();
}

function third() {
  console.log("THIRD function");
}

first();

/*
  CALL STACK PROCESS:

  Start:
     PUSH Global Execution Context (GEC)

  first() is called:
     PUSH first()

  inside first(), second() is called:
     PUSH second()

  inside second(), third() is called:
     PUSH third()

  third() finishes:
     POP third()

  second() finishes:
     POP second()

  first() finishes:
     POP first()

  Final:
     Stack contains only GEC
*/



/* ============================================================
   3. VISUAL CALL STACK DIAGRAM
   ============================================================

   ┌───────────────────────────┐
   │        third()            │  ← pushed last, popped first
   ├───────────────────────────┤
   │        second()           │
   ├───────────────────────────┤
   │        first()            │
   ├───────────────────────────┤
   │   Global Execution Ctx    │
   └───────────────────────────┘
*/



/* ============================================================
   4. CALL STACK WITH RECURSION
   ============================================================
   Recursion = a function calling itself.
   Each call creates a NEW Execution Context.
*/

function countdown(n) {
  if (n === 0) {
    console.log("Done!");
    return;
  }
  console.log(n);
  countdown(n - 1); // recursive call
}

countdown(3);

/*
  Stack states:

  countdown(3)
  countdown(2)
  countdown(1)
  countdown(0)
  POP... POP... POP... POP...
*/



/* ============================================================
   5. STACK OVERFLOW (IMPORTANT!)
   ============================================================
   Happens when the stack gets too deep.
   Usually caused by:
      - infinite recursion
      - recursive calls without termination
*/

function infinite() {
  infinite();  // calls itself forever
}

try {
  infinite();
} catch (err) {
  console.log("STACK OVERFLOW:", err.message);
}

/*
  Error:
    RangeError: Maximum call stack size exceeded
*/



/* ============================================================
   6. CALL STACK + EVENT LOOP (ASYNC CODE BEHAVIOR)
   ============================================================
   JavaScript is SINGLE-THREADED:
      → only ONE function runs at a time
      → async tasks are handled using the event loop
*/

console.log("Start");

setTimeout(() => {
  console.log("Timeout callback");
}, 0);

console.log("End");

/*
  Output:
    Start
    End
    Timeout callback

  WHY?
    - setTimeout callback is NOT pushed to call stack immediately.
    - It goes to Web APIs → Callback Queue → then Event Loop pushes it
      AFTER the current call stack is empty.
*/



/* ============================================================
   7. CALL STACK SUMMARY
   ============================================================

   ✔ JS executes code using a Call Stack (LIFO).
   ✔ Every function call creates a new Execution Context.
   ✔ When a function finishes → its context is popped off.
   ✔ Too many nested calls = Stack Overflow.
   ✔ Event Loop handles async tasks, NOT the call stack.
*/



/* ============================================================
   8. SUPER SIMPLE ANALOGY
   ============================================================
   → Call Stack is like a stack of plates.
     - You put plates on top (function calls)
     - You can only remove the top plate (LIFO)
     - Too many plates → stack overflow (falling plates)
*/
