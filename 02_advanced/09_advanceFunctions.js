/*
  ADVANCED FUNCTIONS IN JAVASCRIPT
  --------------------------------
  ✔ IIFE (Immediately Invoked Function Expression)
  ✔ Pure Functions
  ✔ Memoization

  These are powerful patterns used in performance,
  functional programming, and avoiding global pollution.
*/



/* =====================================================================
   1. IIFE (IMMEDIATELY INVOKED FUNCTION EXPRESSION)
   =====================================================================
   ✔ Function that runs IMMEDIATELY after its creation.
   ✔ Used to:
        - avoid global variables
        - create private scope
        - initialize code once
   ✔ Syntax:
        (function(){ ... })()
        (() => { ... })()
*/



/* ------------------------------------------------------------
   A) Basic IIFE
   ------------------------------------------------------------ */

(function () {
  console.log("IIFE executed!");
})();

(() => {
  console.log("Arrow IIFE executed!");
})();



/* ------------------------------------------------------------
   B) IIFE WITH VARIABLES (PRIVATE SCOPE)
   ------------------------------------------------------------ */

const counter = (function () {
  let count = 0; // private variable

  return {
    inc() { count++; console.log(count); },
    dec() { count--; console.log(count); }
  };
})();

counter.inc();
counter.inc();
counter.dec();

/*
  ✔ "count" is inaccessible outside
  ✔ Encapsulation using IIFE
*/



/* ------------------------------------------------------------
   C) IIFE WITH PARAMETERS
   ------------------------------------------------------------ */

(function (name) {
  console.log(`Hello, ${name}`);
})("Alice");



/* =====================================================================
   2. PURE FUNCTIONS
   =====================================================================
   ✔ Function that:
        1) Depends only on input
        2) Produces no side effects (no external changes)
        3) Always returns same output for same input
   ✔ Benefits:
        - Predictable
        - Reusable
        - Easy to test
        - Used in functional programming (React)
*/



/* ------------------------------------------------------------
   A) Pure Function Example
   ------------------------------------------------------------ */

function add(a, b) {
  return a + b; // always same result for same input
}

console.log(add(2, 3)); // 5



/* ------------------------------------------------------------
   B) Impure Function Example (BAD)
   ------------------------------------------------------------ */

let x = 10;

function addImpure(y) {
  return x + y;  // depends on external variable (impure)
}

console.log(addImpure(5)); // unpredictable if x changes



/* ------------------------------------------------------------
   C) Pure Functions Do NOT Mutate External Data
   ------------------------------------------------------------ */

function addToArray(arr, value) {
  return [...arr, value]; // returns new array
}

const arr1 = [1, 2];
const arr2 = addToArray(arr1, 3);

console.log(arr1); // original unchanged
console.log(arr2); // [1,2,3]



/* =====================================================================
   3. MEMOIZATION
   =====================================================================
   ✔ Function optimization technique.
   ✔ Stores previous results in cache.
   ✔ Next time same input occurs → return cached result instead of recalculating.
   ✔ Very useful for:
       - expensive calculations
       - recursion (fibonacci)
       - repeated operations
*/



/* ------------------------------------------------------------
   A) Basic Memoization
   ------------------------------------------------------------ */

function memoizedAdd() {
  const cache = {}; // store results

  return function (x, y) {
    const key = `${x},${y}`;

    if (cache[key] !== undefined) {
      console.log("Returning from cache");
      return cache[key];
    }

    console.log("Calculating result...");
    const result = x + y;
    cache[key] = result;
    return result;
  };
}

const addMemo = memoizedAdd();

console.log(addMemo(5, 10)); // calculates
console.log(addMemo(5, 10)); // cached
console.log(addMemo(2, 3));  // calculates



/* ------------------------------------------------------------
   B) Memoized FIBONACCI (expensive)
   ------------------------------------------------------------ */

function memoizedFib() {
  const cache = {};

  function fib(n) {
    if (n < 2) return n;

    if (cache[n] !== undefined) return cache[n];

    cache[n] = fib(n - 1) + fib(n - 2);
    return cache[n];
  }
  return fib;
}

const fib = memoizedFib();

console.log(fib(10)); // fast due to memoization
console.log(fib(40)); // MUCH faster than normal recursion



/* ------------------------------------------------------------
   C) Generic Memoization Helper
   ------------------------------------------------------------ */

function memoize(fn) {
  const cache = {};

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache[key] !== undefined) {
      return cache[key];
    }

    const result = fn(...args);
    cache[key] = result;

    return result;
  };
}

const slowSquare = n => {
  for (let i = 0; i < 1e7; i++) {} // artificial delay
  return n * n;
};

const fastSquare = memoize(slowSquare);

console.log(fastSquare(5)); // slow first time
console.log(fastSquare(5)); // fast (cached)



/* =====================================================================
   SUMMARY
   ===================================================================== */
/*
  IIFE:
    ✔ Runs immediately
    ✔ Creates private scope
    ✔ Prevents global pollution

  Pure Functions:
    ✔ No side effects
    ✔ Depends only on inputs
    ✔ Same input → same output
    ✔ Safe, predictable, testable

  Memoization:
    ✔ Stores results to avoid recalculation
    ✔ Boost performance
    ✔ Useful in recursion & expensive functions

  MENTAL MODEL:
    → IIFE = "Run this code now and keep its variables private".
    → Pure Function = "No surprises".
    → Memoization = "Remember the result so you don’t repeat work".
*/
