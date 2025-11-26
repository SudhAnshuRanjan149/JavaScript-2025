/*
  SCOPE IN JAVASCRIPT — GLOBAL, FUNCTION, BLOCK (DETAILED)
  ---------------------------------------------------------
  Scope = the region of code where a variable is accessible.

  JavaScript has 3 main types of scope:
      1. Global Scope
      2. Function Scope
      3. Block Scope

  Understanding scope is essential for:
      - variable access
      - avoiding bugs
      - writing clean code
*/



/* ============================================================
   1. GLOBAL SCOPE
   ============================================================
   - Variables declared OUTSIDE any function or block.
   - Accessible everywhere in the file.
   - Attached to `window` (in browser) or `global` (in Node.js)
*/

var a = 10;   // global var
let b = 20;   // global let
const c = 30; // global const

console.log(a, b, c); // accessible here

function showGlobals() {
  console.log(a, b, c); // also accessible here
}

showGlobals();

/*
  Important Note:
  - var becomes a property of window in browser.
  - let and const DO NOT become window properties.
*/



/* ============================================================
   2. FUNCTION SCOPE
   ============================================================
   - Each function creates its own scope.
   - Variables declared with var, let, const INSIDE the function
     are available ONLY inside that function.
*/

function testFunctionScope() {
  var x = 100;
  let y = 200;
  const z = 300;

  console.log(x, y, z); // accessible inside function
}

testFunctionScope();

/*
console.log(x);  // ERROR: x is not defined
console.log(y);  // ERROR
console.log(z);  // ERROR
*/

/*
  KEY POINT:
    - var, let, const inside a function are completely private.
*/



/* ============================================================
   3. BLOCK SCOPE
   ============================================================
   - A block is anything inside { }.
   - let and const are block-scoped.
   - var is NOT block-scoped → escapes the block.
*/

{
  let p = 10;
  const q = 20;
  var r = 30;

  console.log(p, q, r); // all accessible here
}

/*
console.log(p); // ERROR: block-scoped
console.log(q); // ERROR: block-scoped
*/

console.log(r); // 30 → var ignores block scope!



/* ============================================================
   4. MODULE SCOPE (ES6 MODULES)
   ============================================================
   - Each ES module (.js file using import/export) has its OWN scope.
   - Variables inside a module are NOT added to global scope.
   - The top-level of a module behaves like its own private world.
   - To share something, you must export it explicitly.
*/

/*
   Example (file: module1.js)
*/

export const message = "Hello from module";

const secret = "Hidden in module"; // not accessible outside

/*
   Example (file: main.js)
*/

import { message } from "./module1.js";

console.log(message); // works
/*
console.log(secret);  // ERROR: secret is not visible
*/

/*
  KEY POINT:
    - Module scope = top-level variables belong to THIS module only.
    - No variable leaks into the global scope.
    - let, const, var inside a module → scoped to that module.
*/



/* ============================================================
   5. WHY MODULE SCOPE EXISTS
   ============================================================
   - Prevents naming conflicts between files.
   - Makes every module independent.
   - Encourages clean architecture.
*/



/* ============================================================
   6. NESTED SCOPE (SCOPE CHAIN)
   ============================================================
   - Inner scopes can access outer scopes.
   - Outer scopes CANNOT access inner scopes.
*/

let globalVar = "Global";

function outer() {
  let outerVar = "Outer";

  function inner() {
    let innerVar = "Inner";
    console.log(globalVar, outerVar, innerVar); 
  }

  inner();
}

outer();

/*
console.log(outerVar); // ERROR
console.log(innerVar); // ERROR
*/



/* ============================================================
   7. HOW var, let, const BEHAVE WITH SCOPE
   ============================================================

   var:
     - function-scoped
     - not block-scoped
     - hoisted with undefined

   let:
     - block-scoped
     - hoisted but in TDZ

   const:
     - block-scoped
     - hoisted but in TDZ
     - must have initial value
*/



/* ============================================================
   8. PRACTICAL DIFFERENCE: var VS let/const
   ============================================================
*/

if (true) {
  var m = "var variable";
  let n = "let variable";
  const o = "const variable";
}

console.log(m);  // works (var escapes block)
/*
console.log(n);  // ERROR: block-scoped
console.log(o);  // ERROR: block-scoped
*/



/* ============================================================
   9. SUMMARY TABLE
   ============================================================

   | Type      | Global Scope | Function Scope | Block Scope |
   |-----------|--------------|----------------|-------------|
   | var       | Yes          | Yes            | No          |
   | let       | Yes          | Yes            | Yes         |
   | const     | Yes          | Yes            | Yes         |

   
   | Scope Type     | Accessible From                                 |
   |----------------|--------------------------------------------------|
   | Global Scope   | Entire program                                   |
   | Function Scope | Inside that function only                        |
   | Block Scope    | Inside the block { } only                        |
   | Module Scope   | Inside the module file only (unless exported)    |

*/



/* ============================================================
   10. SUPER SIMPLE ANALOGY
   ============================================================

   Global Scope:
     - Like the main hall of a house → accessible from everywhere.

   Function Scope:
     - Like a locked room → only people inside can use the items.

   Block Scope:
     - Like a small locker inside the room → accessible only inside
       that specific locker.
    
   Module Scope:
     - Like a separate apartment → fully isolated unless you give someone a key (export).

*/
