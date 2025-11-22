/*
  STRICT MODE IN JAVASCRIPT — DETAILED EXPLANATION
  ------------------------------------------------
  Strict Mode is a special mode introduced in ES5 (2009)
  to make JavaScript more secure, predictable, and error-free.

  You enable it by writing:
      "use strict";

  It applies to:
      → entire script
      → individual functions
*/



/* ============================================================
   1. HOW TO ENABLE STRICT MODE
   ============================================================
*/

/* Global Strict Mode */
"use strict";

/* Function-level Strict Mode */
function demo() {
  "use strict";
  console.log("Strict mode active inside function");
}



/* ============================================================
   2. WHY STRICT MODE EXISTS
   ============================================================
   JavaScript originally allowed many "sloppy" behaviors.
   Strict Mode:
      - removes silent errors
      - fixes unsafe features
      - makes JS behave more consistently
      - helps engines optimize code better
*/



/* ============================================================
   3. STRICT MODE RULES & BEHAVIOR CHANGES
   ============================================================
   Below are the most important changes.
*/



/* ------------------------------------------------------------
   RULE 1: NO UNDECLARED VARIABLES
   ------------------------------------------------------------
*/

try {
  undeclaredVar = 50; // ERROR in strict mode
} catch (e) {
  console.log("ERROR (undeclared variable):", e.message);
}



/* ------------------------------------------------------------
   RULE 2: NO ACCIDENTAL GLOBALS
   ------------------------------------------------------------
   In non-strict mode, assigning to an undeclared variable
   creates a global variable (bad!).
*/

function sloppy() {
  noDeclaration = 10; // would become global (BAD)
}

/*
  In strict mode → ERROR
*/



/* ------------------------------------------------------------
   RULE 3: NO DUPLICATE PARAMETER NAMES
   ------------------------------------------------------------
*/

try {
  function bad(x, x) {} // ERROR in strict mode
} catch (e) {
  console.log("ERROR (duplicate params):", e.message);
}



/* ------------------------------------------------------------
   RULE 4: 'this' STAYS UNDEFINED IN FUNCTIONS
   ------------------------------------------------------------
   In non-strict mode:
      this = global object (window)
   In strict mode:
      this = undefined
*/

function checkThis() {
  "use strict";
  console.log(this); // undefined
}

checkThis();



/* ------------------------------------------------------------
   RULE 5: NO DELETING VARIABLES OR FUNCTIONS
   ------------------------------------------------------------
*/

let num = 10;
try {
  delete num; // ERROR in strict mode
} catch (e) {
  console.log("ERROR (delete variable):", e.message);
}



/* ------------------------------------------------------------
   RULE 6: NO OCTAL LITERALS
   ------------------------------------------------------------
*/

try {
  let x = 010; // ERROR (octal not allowed)
} catch (e) {
  console.log("ERROR (octal literal):", e.message);
}



/* ------------------------------------------------------------
   RULE 7: NO WRITING TO READ-ONLY PROPERTIES
   ------------------------------------------------------------
*/

const obj = {};
Object.defineProperty(obj, "fixed", {
  value: 100,
  writable: false
});

try {
  obj.fixed = 200; // ERROR in strict mode
} catch (e) {
  console.log("ERROR (write to read-only prop):", e.message);
}



/* ------------------------------------------------------------
   RULE 8: SAFER eval()
   ------------------------------------------------------------
   - Variables created inside eval do NOT leak out.
*/

eval("var evalVar = 123;");
/*
  In strict mode:
    evalVar is NOT added to outer scope.
*/

console.log(typeof evalVar); // "undefined"



/* ============================================================
   4. STRICT MODE DOES NOT APPLY AUTOMATICALLY
   ============================================================
   You must explicitly enable it.

   Exceptions:
   - ES6 modules automatically run in strict mode
   - Classes always use strict mode internally
*/



/* ============================================================
   5. STRICT MODE BENEFITS
   ============================================================

   - Prevents silent errors
   - Avoids accidental globals
   - Makes debugging easier
   - Restricts dangerous or confusing features
   - Enables JavaScript engines to optimize code better
*/



/* ============================================================
   6. SUMMARY
   ============================================================

   Strict Mode enforces:
      ✔ No undeclared variables
      ✔ No duplicate function parameters
      ✔ No silent errors
      ✔ No octal numbers
      ✔ No accidental globals
      ✔ eval is safer
      ✔ this stays undefined in normal functions

   Strict Mode is recommended for ALL modern JS code.
*/



/* ============================================================
   7. SUPER SIMPLE ANALOGY
   ============================================================
   → Strict mode is like turning on "safety mode" in JavaScript.
     It prevents bad habits and catches mistakes early.
*/
