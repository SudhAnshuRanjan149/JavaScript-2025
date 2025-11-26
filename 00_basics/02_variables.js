/*
  VARIABLES IN JAVASCRIPT — var, let, const (DETAILED)
  ----------------------------------------------------
  Variables store data. JavaScript gives us 3 keywords for declaring them:
      → var
      → let
      → const
  Each behaves differently in terms of:
      - scope
      - hoisting
      - re-declaration
      - re-assignment
*/


/*
  Important Note:
  - var becomes a property of window in browser.
  - let and const DO NOT become window properties.
*/


/* ============================================================
   1. var — FUNCTION-SCOPED, OLD & AVOIDED IN MODERN JS
   ============================================================
   CHARACTERISTICS:
     - function-scoped
     - can be re-declared
     - can be re-assigned
     - hoisted with default value "undefined"
     - does NOT follow block scope

   PROBLEMS:
     - causes bugs due to hoisting + no block scope
*/

var a = 10;
var a = 20;   // allowed (re-declaration)
a = 30;       // allowed (re-assignment)

console.log(a); // 30

{
  var x = 50;
}

console.log(x); 
/* prints 50 — var ignores block scope */



/* ============================================================
   2. let — BLOCK-SCOPED, MODERN, BETTER THAN var
   ============================================================
   CHARACTERISTICS:
     - block-scoped
     - cannot be re-declared in same scope
     - can be re-assigned
     - hoisted but stays in TDZ (Temporal Dead Zone)

   USE CASE:
     - when you need a variable whose value will change
*/

/* console.log(b);  // ERROR: ReferenceError: cannot access before initialization */

let b = 10;
/* let b = 20; // ERROR: SyntaxError: cannot re-declare */

b = 30; // allowed

{
  let y = 40;
  console.log(y); // 40
}

/* console.log(y); // ERROR: ReferenceError: y is block-scoped */



/* ============================================================
   3. const — BLOCK-SCOPED, CANNOT BE REASSIGNED
   ============================================================
   CHARACTERISTICS:
     - block-scoped
     - cannot be re-declared
     - cannot be re-assigned
     - must be initialized at declaration
     - value inside objects/arrays CAN be mutated (not frozen)

   USE CASE:
     - for values that should NOT be reassigned
*/

const c = 100;
/* c = 200; // ERROR: TypeError: cannot reassign */
/* const d; // ERROR: SyntaxError: must initialize immediately */

{
  const z = 70;
  console.log(z);
}

/* console.log(z); // ERROR: ReferenceError: z is block-scoped */



/* ============================================================
   IMPORTANT: const DOES NOT MAKE OBJECTS IMMUTABLE
   ============================================================
*/

const person = { name: "John" };
person.name = "Alice"; // allowed (object mutated)

console.log(person); // { name: "Alice" }

/* person = {}; // ERROR: reassignment not allowed */



/* ============================================================
   4. HOISTING DIFFERENCE
   ============================================================

   var:
     - hoisted
     - initialized with undefined

   let:
     - hoisted
     - NOT initialized (TDZ)

   const:
     - hoisted
     - NOT initialized (TDZ)
     - must have initial value
*/

console.log(v);   // undefined
var v = 10;

/*
console.log(l);   // ERROR (TDZ)
let l = 20;

console.log(k);   // ERROR (TDZ)
const k = 30;
*/



/* ============================================================
   5. SUMMARY TABLE
   ============================================================

   | Feature          | var             | let              | const               |
   |------------------|-----------------|------------------|----------------------|
   | Scope            | function        | block            | block               |
   | Re-declare       | Yes             | No               | No                  |
   | Re-assign        | Yes             | Yes              | No                  |
   | Hoisting         | Yes (undefined) | Yes (TDZ)        | Yes (TDZ)           |
   | Must initialize? | No              | No               | Yes                 |

*/



/* ============================================================
   6. WHICH TO USE?
   ============================================================

   - Prefer const by default
   - Use let only when value must change
   - Avoid var completely (legacy)
*/
