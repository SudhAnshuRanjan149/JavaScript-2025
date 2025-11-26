/*
  CALLBACK FUNCTIONS IN JAVASCRIPT — DETAILED EXPLANATION
  -------------------------------------------------------
  ✔ A callback function is a function that is passed as an argument
    to another function and executed later.

  ✔ Because functions are FIRST-CLASS CITIZENS in JavaScript,
    they can be:
      - passed as arguments
      - returned from other functions
      - stored in variables
      - used in arrays/objects

  ✔ Callbacks are the foundation of:
      - asynchronous programming
      - event handling
      - array methods (map, filter, reduce)
      - timers (setTimeout, setInterval)
*/



/* ============================================================
   1. BASIC CALLBACK EXAMPLE
   ============================================================ */

function greet(name) {
  console.log("Hello " + name);
}

function processUserInput(callback) {
  const name = "Alice";
  callback(name); // execute callback
}

processUserInput(greet);

/*
  Explanation:
    - greet is passed as a callback to processUserInput
    - processUserInput calls it later
*/



/* ============================================================
   2. INLINE (ANONYMOUS) CALLBACK FUNCTIONS
   ============================================================ */

processUserInput(function (name) {
  console.log("Welcome " + name);
});

/*
  Anonymous callback: we don't give it a name.
*/



/* ============================================================
   3. CALLBACKS IN ARRAY METHODS (VERY COMMON)
   ============================================================ */

/*
  map(): transforms each element
*/
const numbers = [1, 2, 3];

const doubled = numbers.map(function (num) {
  return num * 2;
});

console.log("Doubled:", doubled); // [2,4,6]

/*
  filter(): keeps items that satisfy a condition
*/
const evens = numbers.filter(n => n % 2 === 0);
console.log("Evens:", evens);

/*
  reduce(): reduces to one value
*/
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log("Sum:", sum);



/* ============================================================
   4. CALLBACKS WITH setTimeout (ASYNC CALLBACK)
   ============================================================ */

console.log("Start");

setTimeout(() => {
  console.log("Inside setTimeout callback");
}, 2000);

console.log("End");

/*
  Output:
    Start
    End
    Inside setTimeout callback   (after 2 seconds)

  setTimeout uses a callback to run code later.
*/



/* ============================================================
   5. CALLBACKS WITH EVENT LISTENERS
   ============================================================ */

/*
  HTML:
    <button id="btn">Click</button>
*/

const btn = document.getElementById("btn");

btn.addEventListener("click", function () {
  console.log("Button clicked!");
});

/*
  The second parameter is the callback that runs on click.
*/



/* ============================================================
   6. CALLBACKS CAN CAUSE CALLBACK HELL
   ============================================================ */
/*
  Asynchronous callbacks that depend on each other can cause deep nesting.
*/

setTimeout(() => {
  console.log("Task 1");

  setTimeout(() => {
    console.log("Task 2");

    setTimeout(() => {
      console.log("Task 3");

    }, 1000);
  }, 1000);
}, 1000);

/*
  This deep nesting is called:
      → callback hell
      → pyramid of doom

  Problems:
    - Hard to read
    - Hard to debug
    - Hard to maintain

  Solution:
    - Promises
    - async/await
*/



/* ============================================================
   7. CONVERTING CALLBACK HELL → PROMISES (CLEANER)
   ============================================================ */

function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

wait(1000)
  .then(() => {
    console.log("Task 1");
    return wait(1000);
  })
  .then(() => {
    console.log("Task 2");
    return wait(1000);
  })
  .then(() => {
    console.log("Task 3");
  });



/* ============================================================
   8. CALLBACKS VS PROMISES VS ASYNC/AWAIT
   ============================================================ */
/*
  ✔ Callbacks
      - basic async mechanism
      - can lead to callback hell
      - good for simple operations

  ✔ Promises
      - avoid callback hell
      - chainable
      - can be composed

  ✔ async/await
      - built on top of Promises
      - clean, synchronous-looking async code

  All are important, but callbacks are the foundation.
*/



/* ============================================================
   9. REAL-LIFE EXAMPLE — FUNCTION AS CALLBACK INPUT
   ============================================================ */

function authenticateUser(user, callbackSuccess, callbackError) {
  if (user === "admin") {
    callbackSuccess("Login successful!");
  } else {
    callbackError("Invalid username!");
  }
}

authenticateUser(
  "admin",
  msg => console.log("SUCCESS:", msg),
  err => console.log("ERROR:", err)
);



/* ============================================================
   10. SUMMARY
   ============================================================ */
/*
  ✔ Callback = function passed as argument to be executed later
  ✔ Used in:
        - async programming
        - event handling
        - timers
        - array methods
        - API calls
  ✔ Issues:
        - callback hell
        - deeply nested callbacks
  ✔ Solutions:
        - Promises
        - async/await

  MENTAL MODEL:
    → A callback is like giving someone your phone number and saying:
          "Call me when you're done."
*/
