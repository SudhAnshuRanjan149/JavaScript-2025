/*
  HIGHER-ORDER FUNCTIONS (HOFs) IN JAVASCRIPT — DETAILED EXPLANATION
  ------------------------------------------------------------------
  ✔ A Higher-Order Function is a function that does AT LEAST one of:
      1. Accept another function as an argument
      2. Return a function

  ✔ This is possible because JavaScript treats functions as FIRST-CLASS citizens.
    (Functions can be stored in variables, passed as args, returned, etc.)

  ✔ HOFs enable:
      - abstraction
      - cleaner logic
      - functional programming patterns
      - composition
      - reusable behaviors
*/



/* ============================================================
   1. FUNCTIONS AS FIRST-CLASS CITIZENS
   ============================================================
   Meaning:
     - You can store functions in variables
     - You can pass functions as parameters
     - You can return functions
*/

const greet = function (name) {
  return "Hello " + name;
};

console.log(greet("Alice"));



/* ============================================================
   2. HOF EXAMPLE 1 — FUNCTION PASSED AS ARGUMENT
   ============================================================ */

function multiplyByTwo(n) {
  return n * 2;
}

function doOperation(fn, value) {
  // fn is a function → HIGHER-ORDER FUNCTION
  return fn(value);
}

console.log(doOperation(multiplyByTwo, 5)); // 10

/*
  HOF: doOperation()
  Callback: multiplyByTwo()
*/



/* ============================================================
   3. HOF EXAMPLE 2 — FUNCTION RETURNING A FUNCTION
   ============================================================ */

function greeter(prefix) {
  return function (name) {
    return prefix + " " + name;
  };
}

const helloGreeter = greeter("Hello");
console.log(helloGreeter("John")); // "Hello John"

const welcomeGreeter = greeter("Welcome");
console.log(welcomeGreeter("Sarah")); // "Welcome Sarah"

/*
  greeter() RETURNS another function → HOF.
  This also uses closures.
*/



/* ============================================================
   4. ARRAY METHODS (map, filter, reduce) ARE HOFs
   ============================================================
   These built-in methods take callback functions, so they are HOFs.
*/



/*
  map() → transforms each element
*/

const numbers = [1, 2, 3, 4];

const doubled = numbers.map(function (n) {
  return n * 2;
});

console.log("map:", doubled); // [2,4,6,8]



/*
  filter() → keeps items based on condition
*/

const even = numbers.filter(n => n % 2 === 0);

console.log("filter:", even); // [2,4]



/*
  reduce() → reduces array to single value
*/

const sum = numbers.reduce((acc, n) => acc + n, 0);

console.log("reduce:", sum); // 10



/*
  All of these are Higher-Order Functions:
    - They take other functions (callbacks)
    - They apply logic using those functions
*/



/* ============================================================
   5. PRACTICAL USE CASE 1 — CUSTOM EVENT HANDLER CREATOR
   ============================================================ */

function createClickLogger(id) {
  return function () {
    console.log("Clicked element:", id);
  };
}

// Example usage in browser:
// document.getElementById("btn").addEventListener("click", createClickLogger("btn"));

/*
  createClickLogger returns a function → HOF
*/



/* ============================================================
   6. PRACTICAL USE CASE 2 — RATE LIMITING (Throttling)
   ============================================================ */
/*
  A throttled function only runs once per interval.
*/

function throttle(fn, delay) {
  let lastCall = 0;

  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
}

function log() {
  console.log("Throttled log:", Date.now());
}

const throttledLog = throttle(log, 1000);

// browser: window.addEventListener("scroll", throttledLog);



/* ============================================================
   7. PRACTICAL USE CASE 3 — DEBOUNCING
   ============================================================ */
/*
  Debounced function runs only AFTER the user stops triggering it.
*/

function debounce(fn, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function searchQuery(q) {
  console.log("Searching:", q);
}

const debouncedSearch = debounce(searchQuery, 500);

// Example (browser):
// input.addEventListener("input", (e) => debouncedSearch(e.target.value));



/* ============================================================
   8. PRACTICAL USE CASE 4 — FUNCTION COMPOSITION
   ============================================================ */

const toUpper = str => str.toUpperCase();
const exclaim = str => str + "!";
const shout = str => exclaim(toUpper(str));

console.log(shout("hello")); // HELLO!



/*
  HOF-based composition:
*/

function compose(f, g) {
  return function (x) {
    return f(g(x));
  };
}

const shout2 = compose(exclaim, toUpper);

console.log(shout2("hello")); // HELLO!



/* ============================================================
   9. ADVANCED USE CASE — PIPELINE CREATION (Multiple Functions)
   ============================================================ */

function pipe(...fns) {
  return function (value) {
    return fns.reduce((acc, fn) => fn(acc), value);
  };
}

const pipeline = pipe(
  x => x + 1,
  x => x * 2,
  x => x - 3
);

console.log(pipeline(5)); // (5+1) * 2 - 3 = 9



/* ============================================================
   10. WHY HIGHER-ORDER FUNCTIONS ARE IMPORTANT
   ============================================================ */
/*
  ✔ Code reusability
  ✔ Functional programming patterns
  ✔ Cleaner async handling (callbacks, promises)
  ✔ Custom behavior injection
  ✔ Abstraction (hide internal details)
  ✔ Extensible logic
*/



/* ============================================================
   11. SUMMARY (KEY POINTS)
   ============================================================ */
/*
  ✔ HOF = function that accepts or returns another function
  ✔ map, filter, reduce = classic HOF examples
  ✔ HOFs enable:
        - closures
        - currying
        - composition
        - async patterns
  ✔ Extremely powerful for modern JS and functional-style coding

  MENTAL MODEL:
    → Higher-Order Functions are "functions that operate on other functions".
    → They treat functions the same way normal values are treated.
*/
