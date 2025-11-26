/*
  JAVASCRIPT MODULES (import / export) — DETAILED EXPLANATION
  -----------------------------------------------------------
  ✔ Introduced in ES6
  ✔ Helps structure code into separate files
  ✔ Avoids global namespace pollution
  ✔ Encourages reusable, maintainable code

  Two main keywords:
      export   → make values available outside file
      import   → bring values from another file
*/



/* ============================================================
   1. TYPES OF EXPORTS
   ============================================================
   ✔ Named Export
   ✔ Default Export
*/



/* ============================================================
   2. NAMED EXPORTS
   ============================================================ */
/*
  You can export multiple variables, functions, classes.
  Each must be imported by EXACT NAME.
*/

// file: math.js
export const PI = 3.14;

export function add(a, b) {
  return a + b;
}

export class Calculator {
  multiply(a, b) {
    return a * b;
  }
}

// file: app.js
import { PI, add, Calculator } from "./math.js";

console.log(PI);
console.log(add(2, 3));
console.log(new Calculator().multiply(5, 6));

/*
  RULE:
    - names MUST match exactly
    - order doesn't matter
*/



/* ============================================================
   3. RENAMING NAMED EXPORTS (aliasing)
   ============================================================ */

// file: app.js
import { add as sum, PI as constant } from "./math.js";

console.log(sum(3, 4));
console.log(constant);



/* ============================================================
   4. DEFAULT EXPORT
   ============================================================ */
/*
  Each file can have ONLY ONE default export.
*/

// file: utils.js
export default function greet(name) {
  return `Hello ${name}`;
}

// file: app.js
import greet from "./utils.js";

console.log(greet("Alice"));

/*
  IMPORTANT:
    - default export name can be ANYTHING
    - doesn't need curly braces {}
*/



/* ============================================================
   5. DEFAULT + NAMED EXPORTS TOGETHER
   ============================================================ */

// file: messages.js
// export default "Welcome!";
export const bye = "Goodbye";
export function hello() {
  return "Hello!";
}

// file: app.js
import msg, { bye, hello } from "./messages.js";

console.log(msg);
console.log(hello());
console.log(bye);



/* ============================================================
   6. IMPORT EVERYTHING (namespace import)
   ============================================================ */

// file: app.js
import * as MathUtils from "./math.js";

console.log(MathUtils.PI);
console.log(MathUtils.add(2, 5));

/*
  MathUtils becomes an object:
    {
      PI: 3.14,
      add: function,
      Calculator: class
    }
*/



/* ============================================================
   7. RE-EXPORTING (EXPORT FROM)
   ============================================================ */

// file: constants.js
export const API_URL = "https://api.com";
export const VERSION = "v1";

// file: index.js (re-export everything)
export * from "./constants.js";

// OR re-export specific ones:
export { API_URL } from "./constants.js";



/* ============================================================
   8. MODULE EXECUTION RULES
   ============================================================ */
/*
  ✔ Modules always run in strict mode ("use strict")
  ✔ Code inside a module is scoped (not global)
  ✔ <script type="module"> loads JS as module
  ✔ import/export works ONLY at top level (no conditional import)
*/



/* ============================================================
   9. USING MODULES IN HTML
   ============================================================ */

/*
  HTML:

  <script type="module" src="app.js"></script>

  Notes:
    ✔ Modules are deferred automatically
    ✔ Can use import/export directly
*/



/* ============================================================
   10. DYNAMIC IMPORT (import()) — for lazy loading
   ============================================================ */
/*
  Dynamic import is a FUNCTION that returns a Promise.
*/

async function loadMath() {
  const math = await import("./math.js");
  console.log(math.PI);
  console.log(math.add(5, 10));
}

loadMath();

/*
  USE CASES:
    ✔ load modules only when needed
    ✔ code-splitting for performance
*/



/* ============================================================
   11. HOW MODULES DIFFER FROM SCRIPT TAGS
   ============================================================ */
/*
  ✔ Modules:
      - run in strict mode
      - private scope
      - async loading
      - import/export supported

  ✔ Normal scripts:
      - global scope
      - no import/export
      - synchronous by default
*/



/* ============================================================
   12. CIRCULAR DEPENDENCIES (ADVANCED)
   ============================================================ */
/*
  If module A imports from module B, and B imports from A,
  JS handles it but some values may be "undefined" during load.
  
  Modules are initialized in dependency order.
*/



/* ============================================================
   13. SUMMARY
   ============================================================ */
/*
  ✔ export:
        - export const x
        - export function fn()
        - export class A
        - export default value

  ✔ import:
        - import { x } from ""
        - import fn from ""
        - import * as Utils from ""
        - import { x as y } from ""
        - dynamic import("path")

  ✔ Modules:
        - avoid global variables
        - organize code better
        - improve reusability & maintainability

  MENTAL MODEL:
    → Think of each file as a "box".
      export decides what leaves the box.
      import decides what enters another box.
*/
