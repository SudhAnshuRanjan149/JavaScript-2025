/*
  FUNCTION CURRYING IN JAVASCRIPT — DETAILED EXPLANATION
  ------------------------------------------------------
  🔹 Definition (informal):
      Currying is transforming a function that takes multiple arguments
      into a sequence of functions, each taking ONE (or fewer) argument(s).

      Example:
        Normal:
          f(a, b, c)

        Curried:
          f(a)(b)(c)

  🔹 Why it's useful:
      - Reuse functions with preset arguments (partial application)
      - Cleaner, more declarative code
      - Better composition in functional programming
*/



/* ============================================================
   1. BASIC EXAMPLE — NON-CURRIED vs CURRIED
   ============================================================ */

// Normal function: sum of 3 numbers
function add(a, b, c) {
  return a + b + c;
}

console.log(add(1, 2, 3)); // 6


// Curried version:
function addCurried(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

console.log(addCurried(1)(2)(3)); // 6

/*
  Here:
    addCurried(1)        → returns a function expecting b
    addCurried(1)(2)     → returns a function expecting c
    addCurried(1)(2)(3)  → returns final sum

  Each inner function "remembers" previous arguments via closures.
*/



/* ============================================================
   2. PARTIAL APPLICATION WITH CURRYING
   ============================================================ */
/*
  Currying lets you "preset" some arguments and reuse the function.
*/

const addTo5 = addCurried(5);        // a = 5
const addTo5And10 = addTo5(10);      // b = 10

console.log(addTo5And10(1));  // 16
console.log(addTo5And10(20)); // 35

/*
  You created specialized functions:
    - addTo5       → (b) => (c) => 5 + b + c
    - addTo5And10  → (c) => 5 + 10 + c
*/



/* ============================================================
   3. CURRYING WITH ARROW FUNCTIONS (CLEANER SYNTAX)
   ============================================================ */

const addCurriedArrow = a => b => c => a + b + c;

console.log(addCurriedArrow(1)(2)(3)); // 6



/* ============================================================
   4. PRACTICAL USE CASE 1: CONFIGURABLE LOGGER
   ============================================================ */

function createLogger(prefix) {
  return function (level) {
    return function (message) {
      console.log(`[${prefix}] [${level}] ${message}`);
    };
  };
}

const appInfoLogger = createLogger("APP")("INFO");
const appErrorLogger = createLogger("APP")("ERROR");

appInfoLogger("Application started");
// [APP] [INFO] Application started

appErrorLogger("Something went wrong");
// [APP] [ERROR] Something went wrong

/*
  Benefits:
    - You "fix" prefix and level, then reuse those loggers.
    - Clean, reusable configuration using currying.
*/



/* ============================================================
   5. PRACTICAL USE CASE 2: DOM EVENT HANDLERS
   ============================================================ */
/*
  Currying is handy when you want:
    - a function that knows some extra data (like id, type, config)
    - plus the event object from addEventListener

  Example (pseudo, requires browser):
*/

function handleClick(id) {
  return function (event) {
    console.log("Clicked element ID:", id);
    console.log("Event type:", event.type);
  };
}

// Usage example:
// document.getElementById("btn1").addEventListener("click", handleClick("btn1"));
// document.getElementById("btn2").addEventListener("click", handleClick("btn2"));

/*
  Here:
    handleClick("btn1") returns a function (event) => { ... }
    That inner function receives the actual event.
*/



/* ============================================================
   6. GENERIC CURRY FUNCTION (AUTO-CURRY ANY FUNCTION)
   ============================================================ */
/*
  We can write a higher-order function `curry` that:
    - takes a normal function: fn(a, b, c, ...)
    - returns a curried version: fn(a)(b)(c)...
*/

function curry(fn) {
  // expectedArgsCount = number of parameters of fn
  const expectedArgsCount = fn.length;

  function curried(...args) {
    if (args.length >= expectedArgsCount) {
      // if we have enough args, call original function
      return fn(...args);
    } else {
      // otherwise, return a function waiting for remaining args
      return function (...nextArgs) {
        return curried(...args, ...nextArgs);
      };
    }
  }

  return curried;
}

// Example function to curry
function multiply(a, b, c) {
  return a * b * c;
}

const curriedMultiply = curry(multiply);

console.log(curriedMultiply(2)(3)(4));   // 24
console.log(curriedMultiply(2, 3)(4));   // 24
console.log(curriedMultiply(2)(3, 4));   // 24

/*
  Note:
    - Our curry() supports partial application of any length:
        curriedMultiply(2,3)(4)
        curriedMultiply(2)(3,4)
        curriedMultiply(2,3,4)
*/



/* ============================================================
   7. INFINITE CURRYING PATTERN
   ============================================================ */
/*
  Sometimes we want something like:

    add(1)(2)(3)(4)...(n)()  → final value

  That is "infinite" currying until we stop with a special value
  (commonly no argument or a sentinel).
*/

function addInfinite(a) {
  let sum = a;

  function inner(b) {
    if (b === undefined) {
      return sum;   // stop when no argument
    }
    sum += b;
    return inner;   // return itself again
  }

  return inner;
}

console.log(addInfinite(1)(2)(3)(4)());  // 10
console.log(addInfinite(5)(5)(5)());     // 15



/* ============================================================
   8. CURRYING VS PARTIAL APPLICATION (DIFFERENCE)
   ============================================================ */
/*
  🔹 Currying:
      - transforms f(a, b, c) → f(a)(b)(c)
      - every function takes exactly ONE parameter at a time (in pure form)

  🔹 Partial application:
      - fixes some arguments of a function, returns new function
      - doesn't require "one argument at a time"

  Example partial (non-strict curry):
*/

function partial(fn, ...fixedArgs) {
  return function (...remainingArgs) {
    return fn(...fixedArgs, ...remainingArgs);
  };
}

function sum4(a, b, c, d) {
  return a + b + c + d;
}

const add10 = partial(sum4, 10);
console.log(add10(1, 2, 3)); // 16 (10 + 1 + 2 + 3)

/*
  partial() doesn't enforce one-argument-per-call.
  curry() generally does (or simulates it).
*/



/* ============================================================
   9. CURRYING + FUNCTION COMPOSITION (BRIEF IDEA)
   ============================================================ */
/*
  Curried functions are easier to compose because:
    - they accept one value at a time
    - output of one function can be passed directly to the next

  For example, imagine functions that operate on strings:
*/

const toUpper = str => str.toUpperCase();
const exclaim = str => str + "!";
const greet = name => "Hello " + name;

// Simple composition manually:
console.log(exclaim(toUpper(greet("world")))); // HELLO WORLD!

/*
  In functional libraries (like Ramda), many functions are curried by default,
  making it easy to use them with .map, .filter, compose, pipe, etc.
*/



/* ============================================================
   10. POTENTIAL PITFALLS / THINGS TO WATCH OUT FOR
   ============================================================ */
/*
  1) Too much currying can hurt readability.
       f(a)(b)(c)(d) can be harder to read than f(a, b, c, d).

  2) this context & currying:
       Curried functions created with arrow functions ignore their own `this`,
       which is usually good, but if you rely on dynamic this, be careful.

  3) Over-currying functions that are rarely reused with partial arguments
       might make code more complex than needed.

  So:
    - Use currying when it gives clear benefits (reuse, config, composition).
    - Avoid over-abstracting for simple cases.
*/



/* ============================================================
   11. SUMMARY OF FUNCTION CURRYING
   ============================================================ */
/*
  ✔ Currying = breaking a multi-arg function into chained single-arg functions.
  ✔ Implemented using closures to remember previous arguments.
  ✔ Helps in:
        - partial application
        - more reusable & configurable functions
        - functional-style composition
  ✔ Can be implemented generically with a curry(fn) helper.
  ✔ Common in functional programming and libraries like Ramda, lodash/fp.

  MENTAL MODEL:
    - Think of a curried function as a question-asking machine:
        f(a)(b)(c)
        → first it asks for a
        → then for b
        → then for c
        → then gives you the final answer.
*/
