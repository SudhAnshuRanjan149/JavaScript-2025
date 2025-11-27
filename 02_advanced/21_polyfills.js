/*
  POLYFILLS & TRANSPILATION IN JAVASCRIPT — GREAT DETAIL
  ------------------------------------------------------
  ✔ These two concepts ensure your JS code runs on older browsers:
        - Polyfills → add missing features
        - Transpilation → convert new syntax → older syntax

  ✔ Essential for:
        - Browser compatibility
        - Production builds
        - Interviews (common topic)
*/



/* ============================================================
   1. WHAT IS A POLYFILL?
   ============================================================ */
/*
  ✔ A polyfill = a piece of code that IMPLEMENTS a missing feature
    when the browser does not support it.

  ✔ Examples:
        - Promise polyfill
        - Array methods (map, filter)
        - Object.assign
        - fetch polyfill

  ✔ Polyfills check first:
        If feature missing → define it
        If already exists → DO NOTHING
*/



/* ============================================================
   2. WHY POLYFILLS ARE NEEDED?
   ============================================================ */
/*
  ✔ Older browsers like IE9/IE11 do not support:
        - ES6 Classes
        - let/const
        - Promises
        - fetch API
        - Array.from()
        - Object.assign()
        - Array.includes()

  ✔ Instead of writing old-style JS manually,
    we use polyfills to “patch” browsers.
*/



/* ============================================================
   3. COMMON POLYFILLS (INTERVIEW IMPORTANT)
   ============================================================ */
/*
  Below are polyfills for the most frequently asked interview topics:

  1) Array.prototype.map
  2) Array.prototype.filter
  3) Array.prototype.reduce
  4) Array.prototype.forEach
  5) Array.prototype.includes
  6) Function.prototype.bind
  7) Promise polyfill (conceptual)
  8) Object.assign
  9) Fetch polyfill (XMLHttpRequest fallback)
*/



/* ------------------------------------------------------------
   3.1 POLYFILL: Array.map()
   ------------------------------------------------------------ */

if (!Array.prototype.map) {
  Array.prototype.map = function (callback, thisArg) {
    const arr = this;
    const result = [];

    for (let i = 0; i < arr.length; i++) {
      if (arr.hasOwnProperty(i)) {
        result.push(callback.call(thisArg, arr[i], i, arr));
      }
    }
    return result;
  };
}



/* ------------------------------------------------------------
   3.2 POLYFILL: Array.filter()
   ------------------------------------------------------------ */

if (!Array.prototype.filter) {
  Array.prototype.filter = function (callback, thisArg) {
    const arr = this;
    const result = [];

    for (let i = 0; i < arr.length; i++) {
      if (arr.hasOwnProperty(i) && callback.call(thisArg, arr[i], i, arr)) {
        result.push(arr[i]);
      }
    }
    return result;
  };
}



/* ------------------------------------------------------------
   3.3 POLYFILL: Array.reduce()
   ------------------------------------------------------------ */

if (!Array.prototype.reduce) {
  Array.prototype.reduce = function (callback, initialValue) {
    const arr = this;
    let accumulator = initialValue !== undefined ? initialValue : arr[0];
    let startIndex = initialValue !== undefined ? 0 : 1;

    for (let i = startIndex; i < arr.length; i++) {
      accumulator = callback(accumulator, arr[i], i, arr);
    }
    return accumulator;
  };
}



/* ------------------------------------------------------------
   3.4 POLYFILL: Array.forEach()
   ------------------------------------------------------------ */

if (!Array.prototype.forEach) {
  Array.prototype.forEach = function (callback, thisArg) {
    const arr = this;
    for (let i = 0; i < arr.length; i++) {
      callback.call(thisArg, arr[i], i, arr);
    }
  };
}



/* ------------------------------------------------------------
   3.5 POLYFILL: Array.includes()
   ------------------------------------------------------------ */

if (!Array.prototype.includes) {
  Array.prototype.includes = function (value) {
    const arr = this;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === value) return true;
    }
    return false;
  };
}



/* ------------------------------------------------------------
   3.6 POLYFILL: Function.bind()
   ------------------------------------------------------------ */

if (!Function.prototype.bind) {
  Function.prototype.bind = function (context, ...args) {
    const fn = this;
    return function (...innerArgs) {
      return fn.apply(context, [...args, ...innerArgs]);
    };
  };
}



/* ------------------------------------------------------------
   3.7 POLYFILL: Object.assign()
   ------------------------------------------------------------ */

if (!Object.assign) {
  Object.assign = function (target, ...sources) {
    if (target == null) throw new Error("Cannot convert null/undefined");
    const to = Object(target);
    for (const src of sources) {
      if (src != null) {
        for (const key in src) {
          if (Object.prototype.hasOwnProperty.call(src, key)) {
            to[key] = src[key];
          }
        }
      }
    }
    return to;
  };
}



/* ------------------------------------------------------------
   3.8 POLYFILL: FETCH (fallback using XMLHttpRequest)
   ------------------------------------------------------------ */

if (!window.fetch) {
  window.fetch = function (url, options = {}) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(options.method || "GET", url);
      xhr.onload = () => resolve({ text: () => Promise.resolve(xhr.responseText) });
      xhr.onerror = () => reject(new Error("Network error"));
      xhr.send(options.body);
    });
  };
}



/* ------------------------------------------------------------
   3.9 POLYFILL: PROMISE (CONCEPT, simplified)
   ------------------------------------------------------------ */
/*
  NOTE:
    True Promise polyfill is long (100–200 lines).
    Below is a conceptual simplistic one.
*/

if (!window.Promise) {
  window.Promise = class {
    constructor(executor) {
      this.callbacks = [];
      const resolve = (value) => {
        this.value = value;
        this.callbacks.forEach((cb) => cb(value));
      };
      executor(resolve, () => {});
    }
    then(cb) {
      this.callbacks.push(cb);
      if (this.value !== undefined) cb(this.value);
      return this;
    }
  };
}



/* ============================================================
   4. WHAT IS TRANSPILATION?
   ============================================================ */
/*
  ✔ Transpilation = converting modern JS → older JS
      (ES6+ → ES5)

  ✔ Tools:
      - Babel
      - SWC
      - TypeScript compiler
      - esbuild

  ✔ WHY?
      - Browsers like IE11 cannot run ES6 syntax:
          • let/const
          • arrow functions
          • classes
          • spread/rest
          • async/await
          • modules (import/export)

  ✔ Transpiling converts these into compatible patterns.
*/



/* ============================================================
   5. EXAMPLE: ES6 → ES5 TRANSPILATION (CONCEPT)
   ============================================================ */

/*
  ES6:
      const sum = (a, b) => a + b;

  ES5 (transpiled):
      var sum = function(a, b) {
        return a + b;
      };
*/

/*
  ES6:
      class User {}

  ES5:
      function User() {}
*/



/* ============================================================
   6. TOOLS USED WITH TRANSPILATION
   ============================================================ */
/*
  A) Babel:
       - Most popular transpiler
       - Converts ES6+ → ES5
       - Works with Webpack/Parcel/Vite

  B) Polyfills in Babel:
       @babel/preset-env
       core-js   ← adds missing features

  C) Browserslist:
       Defines which browsers your code must support
*/



/* ============================================================
   7. POLYFILL vs TRANSPILATION (INTERVIEW ANSWER)
   ============================================================ */
/*
  ✔ TRANSPILATION:
        - Converts syntax
        - let, const, classes → function constructor form
        - arrow functions → normal functions
        - async/await → generator + promises

  ✔ POLYFILL:
        - Adds missing features
        - Promise, fetch, Object.assign, Array methods

  ✔ RULE:
       Syntax → transpile
       Features/API → polyfill
*/



/* ============================================================
   8. IMPORTANT POLYFILLS LIST (INTERVIEW CRITICAL)
   ============================================================
*/
/*
  ✔ Array methods:
      - map
      - filter
      - reduce
      - forEach
      - includes
      - from
      - find
      - findIndex
      - flat

  ✔ Object methods:
      - Object.assign
      - Object.entries
      - Object.values
      - Object.fromEntries

  ✔ Function:
      - Function.prototype.bind

  ✔ Promise (full polyfill)
  ✔ fetch (XHR fallback)
  ✔ Symbol polyfill
  ✔ Performance.now for old browsers
  ✔ requestAnimationFrame polyfill
*/



/* ============================================================
   SUMMARY (CHEAT SHEET)
   ============================================================
*/
/*
  ✔ Polyfill:
        - Add missing JS features & APIs
        - Example: Promise, fetch, Array methods

  ✔ Transpilation:
        - Convert new JS syntax → older syntax
        - Tool: Babel

  ✔ Use BOTH to support older browsers:
        - Babel transpiles syntax
        - core-js provides polyfills

  ✔ Important polyfills for interviews:
        - map, filter, reduce
        - bind
        - assign
        - includes
        - fetch
        - Promise
*/

