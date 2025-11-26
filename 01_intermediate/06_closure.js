/*
  CLOSURES IN JAVASCRIPT — VERY DETAILED EXPLANATION
  --------------------------------------------------
  🔹 Core idea:
      A CLOSURE is created when an inner function REMEMBERS variables
      from its outer (lexical) scope, even AFTER the outer function has
      finished executing.

  🔹 In other words:
      "Function + its surrounding lexical environment" = Closure

  🔹 Why it matters:
      - Private variables
      - Function factories
      - Callbacks & event handlers
      - Modules & encapsulation
      - async code with setTimeout, promises, etc.
*/



/* ============================================================
   1. BASIC CLOSURE EXAMPLE
   ============================================================ */

function outer() {
  let counter = 0; // local variable in outer()

  function inner() {
    // inner() uses counter → forms a closure over it
    counter++;
    console.log("Counter:", counter);
  }

  return inner; // return the inner function
}

const fn = outer();  // outer() finishes here, BUT...

/*
  At this point:
    - Normally, you'd expect counter to be gone (outer finished).
    - BUT because inner() still references counter,
      JS keeps counter ALIVE in memory.

  That preserved environment is the CLOSURE.
*/

fn(); // Counter: 1
fn(); // Counter: 2
fn(); // Counter: 3



/* ============================================================
   2. HOW CLOSURES WORK IN TERMS OF LEXICAL SCOPE
   ============================================================ */
/*
  - inner() is defined INSIDE outer().
  - Because of LEXICAL SCOPE, inner() has access to:
      1. its own variables
      2. outer() variables
      3. global variables
  - When we RETURN inner(), we also return the connection
    to outer()'s variables, not just the code.
*/

let globalVar = "GLOBAL";

function outerExample() {
  let outerVar = "OUTER";

  function innerExample() {
    let innerVar = "INNER";
    console.log(globalVar, outerVar, innerVar);
  }

  return innerExample;
}

const closureFn = outerExample(); // outerExample() returns innerExample
closureFn(); // logs: GLOBAL OUTER INNER



/* ============================================================
   3. CLOSURES AS "PRIVATE VARIABLES"
   ============================================================ */
/*
  There is no built-in "private" keyword in JS (ignoring #fields for now),
  but closures let us emulate private state.
*/

function createCounter() {
  let count = 0; // private variable

  return {
    increment() {
      count++;
      console.log("Increment:", count);
    },
    decrement() {
      count--;
      console.log("Decrement:", count);
    },
    getValue() {
      console.log("Current value:", count);
    }
  };
}

const counter1 = createCounter();
counter1.increment(); // 1
counter1.increment(); // 2
counter1.getValue();  // 2

const counter2 = createCounter();
counter2.decrement(); // -1 (separate closure, separate count)

/*
  KEY POINT:
    - count is NOT accessible directly:
        console.log(count); // ERROR: count is not defined
    - Only the returned methods can access count via closure.
*/



/* ============================================================
   4. FUNCTION FACTORY USING CLOSURES
   ============================================================ */
/*
  We can write a function that creates specialized functions.
*/

function makeMultiplier(factor) {
  // factor is captured in closure
  return function (n) {
    return n * factor;
  };
}

const double = makeMultiplier(2); // factor = 2
const triple = makeMultiplier(3); // factor = 3

console.log(double(5)); // 10
console.log(triple(5)); // 15

/*
  Each returned function has its own closure with its own "factor".
*/



/* ============================================================
   5. CLOSURES WITH setTimeout (CLASSIC INTERVIEW EXAMPLE)
   ============================================================ */

function classicLoopIssue() {
  for (var i = 1; i <= 3; i++) {
    setTimeout(function () {
      console.log("var i:", i);
    }, 1000);
  }
}

// classicLoopIssue();
/*
  After 1 second:
    var i: 4
    var i: 4
    var i: 4

  WHY?
    - var is function-scoped, NOT block-scoped.
    - One shared 'i' for all iterations.
    - After loop finishes, i = 4.
    - All timeouts reference SAME i in closure → print 4.
*/


/*
  FIX 1: use let for block scope (simplest)
*/

function fixedLoopWithLet() {
  for (let i = 1; i <= 3; i++) {
    setTimeout(function () {
      console.log("let i:", i);
    }, 1000);
  }
}

// fixedLoopWithLet();
/*
  After 1 second:
    let i: 1
    let i: 2
    let i: 3

  WHY?
    - let creates NEW 'i' for each iteration.
    - Each callback closes over different i.
*/


/*
  FIX 2: IIFE (Immediately Invoked Function Expression) with var
  (Old pattern before let existed)
*/

function fixedLoopWithIIFE() {
  for (var i = 1; i <= 3; i++) {
    (function (j) {
      setTimeout(function () {
        console.log("IIFE j:", j);
      }, 1000);
    })(i);
  }
}

// fixedLoopWithIIFE();
/*
  Explanation:
    - We pass i as j to the IIFE.
    - j is a parameter, new for every call.
    - Each timeout callback closes over its own j.
*/



/* ============================================================
   6. CLOSURES IN EVENT HANDLERS
   ============================================================ */
/*
  Closures often appear in event listeners.
  (Assume the HTML has buttons with class="btn", for example.)
*/

function setupButtons() {
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button, index) => {
    // index is captured by closure
    button.addEventListener("click", function () {
      console.log("Button index:", index);
    });
  });
}

/*
  Each click handler remembers its own "index" because of closure.
*/



/* ============================================================
   7. CLOSURES & MEMORY (POTENTIAL LEAKS)
   ============================================================ */
/*
  Closures keep variables "alive".
  This is powerful but can also keep unnecessary data in memory
  if you are not careful.
*/

function createHugeClosure() {
  const hugeData = new Array(1000000).fill("some large data");

  return function () {
    console.log("Using hugeData length:", hugeData.length);
  };
}

const heavy = createHugeClosure();
heavy(); // still can access hugeData

/*
  If 'heavy' lives for a long time, hugeData stays in memory.
  Avoid capturing large objects in closures unless necessary.
*/



/* ============================================================
   8. CLOSURES & MODULE PATTERN
   ============================================================ */
/*
  Before ES modules, closures were used to create modules
  with private state.
*/

const myModule = (function () {
  // private
  let _hidden = 0;

  function _log() {
    console.log("Hidden value:", _hidden);
  }

  // public API
  return {
    increment() {
      _hidden++;
      _log();
    },
    reset() {
      _hidden = 0;
      _log();
    }
  };
})();

myModule.increment(); // Hidden value: 1
myModule.increment(); // Hidden value: 2
myModule.reset();     // Hidden value: 0
/*
  _hidden and _log are not accessible directly:
    console.log(_hidden); // ERROR
*/



/* ============================================================
   9. CLOSURES & THIS (IMPORTANT NOTE)
   ============================================================ */
/*
  Closures capture variables, but `this` is NOT lexically captured
  in normal functions (only in arrow functions).

  In many cases, we combine closures with arrow functions to capture both
  outer variables and outer `this`.
*/

const obj = {
  value: 42,
  method() {
    setTimeout(() => {
      // arrow function captures `this` lexically (from method)
      console.log("Value with arrow + closure:", this.value);
    }, 1000);
  }
};

obj.method();

/*
  Here:
    - inner arrow uses closure to remember `this` from method()
*/



/* ============================================================
   10. CLOSURE SUMMARY (CORE POINTS)
   ============================================================ */
/*
  ✔ Closure = inner function + its lexical environment.
  ✔ Created automatically whenever:
        - a function is defined inside another function
        - and the inner function uses variables from the outer function
  ✔ Lets you:
        - maintain state between function calls
        - create private variables
        - build function factories
        - manage async callbacks (setTimeout, events, promises)
  ✔ Common patterns:
        - counters
        - modules
        - iterators
        - UI components

  MENTAL MODEL:
    - Imagine a function carrying a backpack.
    - The backpack contains all variables from its outer scopes
      that it uses.
    - That backpack = CLOSURE.
*/
