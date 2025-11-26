/*
  SPREAD & REST OPERATORS (...) IN JAVASCRIPT — DETAILED EXPLANATION
  ------------------------------------------------------------------
  ✔ Both use the SAME syntax: ...
  ✔ BUT they do OPPOSITE things based on where they are used.

  SPREAD  → expands/unpacks elements
  REST    → collects/packs remaining elements

  Think:
      Spread = "explode"
      Rest   = "gather"
*/



/* ============================================================
   1. SPREAD OPERATOR — EXPANDS VALUES
   ============================================================
   Usage:
      - in arrays
      - in objects
      - in function calls
*/



/* ------------------------------------------------------------
   A) Spread in arrays — copy array (shallow copy)
   ------------------------------------------------------------ */

const arr1 = [1, 2, 3];
const copyArr = [...arr1];

console.log(copyArr); // [1,2,3]

/*
  Spread:
    - creates NEW array
    - does NOT affect original
*/



/* ------------------------------------------------------------
   B) Spread — merge arrays
   ------------------------------------------------------------ */

const arr2 = [4, 5, 6];
const mergedArr = [...arr1, ...arr2];

console.log(mergedArr); // [1,2,3,4,5,6]



/* ------------------------------------------------------------
   C) Spread — insert values in middle
   ------------------------------------------------------------ */

const arr3 = [10, 20, 30];
const newArr = [5, ...arr3, 40];

console.log(newArr); // [5,10,20,30,40]



/* ------------------------------------------------------------
   D) Spread in FUNCTION CALLS (very common!)
   ------------------------------------------------------------ */

function sum(a, b, c) {
  return a + b + c;
}

const nums = [10, 20, 30];

console.log(sum(...nums)); // 60



/* ============================================================
   2. SPREAD WITH OBJECTS
   ============================================================ */



/* ------------------------------------------------------------
   A) Clone an object (shallow copy)
   ------------------------------------------------------------ */

const obj1 = { a: 1, b: 2 };
const copyObj = { ...obj1 };

console.log(copyObj);



/* ------------------------------------------------------------
   B) Merge objects
   ------------------------------------------------------------ */

const obj2 = { c: 3, d: 4 };
const mergedObj = { ...obj1, ...obj2 };

console.log(mergedObj); // {a:1,b:2,c:3,d:4}



/* ------------------------------------------------------------
   C) Overwrite properties when merging
   ------------------------------------------------------------ */

const user = { name: "Alice", age: 25 };
const updatedUser = { ...user, age: 30 };

console.log(updatedUser); // age updated



/* ============================================================
   3. REST OPERATOR — COLLECTS VALUES
   ============================================================
   Usage:
      - in arrays
      - in objects
      - in function parameters
*/



/* ------------------------------------------------------------
   A) REST IN ARRAY DESTRUCTURING
   ------------------------------------------------------------ */

const [first, second, ...others] = [1, 2, 3, 4, 5];

console.log(first);   // 1
console.log(second);  // 2
console.log(others);  // [3,4,5]

/*
  rest (...) collects remaining elements
*/



/* ------------------------------------------------------------
   B) REST IN OBJECT DESTRUCTURING
   ------------------------------------------------------------ */

const fullUser = { name: "John", age: 30, city: "NY", country: "USA" };

const { name, ...details } = fullUser;

console.log(name);    // John
console.log(details); // {age:30, city:"NY", country:"USA"}



/* ------------------------------------------------------------
   C) REST IN FUNCTION PARAMETERS — variable arguments
   ------------------------------------------------------------ */

function sumAll(...nums) {
  /*
    nums becomes an array of all arguments
  */
  return nums.reduce((acc, n) => acc + n, 0);
}

console.log(sumAll(1, 2, 3, 4)); // 10
console.log(sumAll(10, 20));     // 30



/* ============================================================
   4. SPREAD vs REST EXACT DIFFERENCE
   ============================================================ */

/*
  SPREAD (expands):
      [...arr]
      sum(...nums)
      {...obj}

  REST (collects):
      function fn(...args)
      const [a, ...rest] = arr
      const {key, ...rest} = obj

  Same syntax, different behavior based on placement.
*/



/* ============================================================
   5. REAL USE CASES OF SPREAD
   ============================================================ */


/* ------------------------------------------------------------
   A) Convert NodeList / HTMLCollection → Array
   ------------------------------------------------------------ */

// const divs = document.querySelectorAll("div");
// const divArray = [...divs];



/* ------------------------------------------------------------
   B) Immutable updates (React-style)
   ------------------------------------------------------------ */

const state = { count: 10, theme: "light" };

const newState = {
  ...state,
  count: state.count + 1,
};

console.log(newState);



/* ------------------------------------------------------------
   C) Clone deeply nested array levels (shallow only)
   ------------------------------------------------------------ */

const nested = [[1], [2], [3]];
const cloneNested = [...nested];

console.log(cloneNested);



/* ============================================================
   6. REAL USE CASES OF REST
   ============================================================ */


/* ------------------------------------------------------------
   A) Build flexible functions
   ------------------------------------------------------------ */

function multiply(factor, ...nums) {
  return nums.map(n => n * factor);
}

console.log(multiply(2, 5, 10, 15)); // [10,20,30]



/* ------------------------------------------------------------
   B) Remove specific keys from objects
   ------------------------------------------------------------ */

const config = {
  host: "localhost",
  port: 8000,
  debug: true,
  version: "1.0"
};

const { debug, ...safeConfig } = config;

console.log(safeConfig); // debug removed



/* ============================================================
   7. COMBINING SPREAD & REST TOGETHER
   ============================================================ */

function removeFirstTwo(...arr) {
  /*
    arr = array of all arguments
  */
  const [, , ...restItems] = arr;
  return restItems;
}

console.log(removeFirstTwo(10, 20, 30, 40)); // [30,40]



/* ============================================================
   8. SUMMARY
   ============================================================ */
/*
  SPREAD (...):
    ✔ expands arrays/objects
    ✔ passes array items as separate arguments
    ✔ copies arrays/objects (shallow)
    ✔ merges arrays/objects

  REST (...):
    ✔ collects remaining items
    ✔ used in destructuring
    ✔ used in function parameters for infinite arguments

  MENTAL MODEL:
    - Spread is like unpacking a suitcase.
    - Rest is like packing leftover clothes into a bag.
*/
