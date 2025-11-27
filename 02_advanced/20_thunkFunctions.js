/*
  THUNK FUNCTION IN JAVASCRIPT — DETAILED EXPLANATION
  ---------------------------------------------------
  ✔ A "thunk" is a function that *delays* computation.
  ✔ It wraps some operation (usually a function call) inside
    another function with **no arguments**.

  ✔ A thunk:
      - takes no parameters
      - returns the result of the wrapped computation *when called*
      - enables lazy evaluation (run later, not now)
      - used in functional programming, Redux, async wrappers

  ✔ Think of it as:
        normal call:  compute()
        thunk call:   () => compute()
*/



/* ============================================================
   1. BASIC EXAMPLE OF A THUNK
   ============================================================ */

function add(a, b) {
  return a + b;
}

// WITHOUT thunk:
const result1 = add(5, 10);   // runs immediately

// WITH thunk:
function addThunk() {
  return add(5, 10);          // not executed yet
}

const result2 = addThunk();   // runs only now

/*
  ✔ addThunk delays the execution of add(5,10).
  ✔ The function itself becomes a "thunk".
*/



/* ============================================================
   2. GENERAL THUNK CREATOR
   ============================================================ */

function makeThunk(fn, ...args) {
  return function () {
    return fn(...args);   // call only when needed
  };
}

const multiply = (a, b) => a * b;

const thunk = makeThunk(multiply, 4, 5);

// heavy computation delayed:
console.log(thunk()); // 20 (runs now)



/* ============================================================
   3. WHY THUNKS? (INTUITION)
   ============================================================
*/
/*
  ✔ Delayed execution — do not evaluate until needed.
  ✔ Useful when:
      - expensive operations (heavy computation)
      - IO operations (reading files, network calls)
      - lazy-loading resources
      - building async wrappers (promises)
      - Redux Thunk middleware

  ✔ Thunk = lazy function.
*/



/* ============================================================
   4. THUNKS IN ASYNC CODE (HISTORICAL USAGE)
   ============================================================
*/
/*
  Before Promises existed, thunks were used to convert
  async operations into callback-based lazy tasks.
*/

function asyncThunk(url) {
  return function (callback) {
    fetch(url)
      .then(res => res.json())
      .then(data => callback(null, data))
      .catch(err => callback(err));
  };
}

// usage:
const thunkRequest = asyncThunk("https://jsonplaceholder.typicode.com/posts/1");

// actual request only runs here:
thunkRequest((err, data) => {
  console.log(data);
});

/*
  ✔ asyncThunk returns a function (the thunk).
  ✔ The thunk executes the async operation only when invoked.
*/



/* ============================================================
   5. THUNK VS FUNCTION CALL
   ============================================================ */
/*
  ✔ normal:   expensiveTask()
  ✔ thunk:    const t = () => expensiveTask()
               ...
               t() // run later
*/



/* ============================================================
   6. THUNKS IN REDUX (VERY POPULAR USE CASE)
   ============================================================ */
/*
  Redux Thunk middleware allows dispatching FUNCTIONS instead of objects.

  Example thunk action:
*/

function fetchUser(id) {
  // THIS function is a thunk because it returns a function
  return async function (dispatch) {
    dispatch({ type: "USER_LOADING" });

    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const data = await res.json();

    dispatch({ type: "USER_SUCCESS", payload: data });
  };
}

/*
  ✔ fetchUser(1) returns a thunk.
  ✔ Redux executes it and passes "dispatch".
*/



/* ============================================================
   7. LAZY EVALUATION USING THUNKS
   ============================================================ */
/*
  Thunks help avoid unnecessary work:
*/

function heavyCalculation() {
  console.log("Heavy computation running...");
  return 999;
}

const heavyThunk = () => heavyCalculation();

// do some other tasks...
// heavy calculation runs ONLY when needed:
console.log(heavyThunk());



/* ============================================================
   8. PARAMETER THUNKING (CURRYING-LIKE)
   ============================================================ */

function thunkify(fn) {
  return function (...args) {
    return function () {
      return fn(...args);
    };
  };
}

const sumThunkified = thunkify((a, b) => a + b);

const tSum = sumThunkified(10, 20); // creates thunk

console.log(tSum()); // runs calculation now → 30



/* ============================================================
   9. CREATING PROMISES USING THUNKS
   ============================================================ */
/*
  ✔ A thunk can be used to wrap async logic inside a promise.
*/

function promiseThunk(fn, ...args) {
  return function () {
    return new Promise((resolve) => {
      resolve(fn(...args));
    });
  };
}

const promiseT = promiseThunk((a, b) => a * 3 + b, 4, 5);

promiseT().then(console.log); // 17



/* ============================================================
   10. SUMMARY (CHEAT SHEET)
   ============================================================ */
/*
  ✔ Thunk = a function that wraps another computation
            so it runs LATER, not now.

  ✔ Uses:
      - Lazy evaluation
      - Delayed execution
      - Async control flow
      - Redux middleware
      - Wrapping expensive operations

  ✔ Patterns:
      () => fn()
      makeThunk(fn, ...args)
      thunkify(fn)

  MENTAL MODEL:
    A thunk is simply "a function that returns work",
    instead of doing the work immediately.
*/
