/*
  HOISTING IN JAVASCRIPT — DETAILED EXPLANATION
  ----------------------------------------------
  Hoisting is JavaScript's behavior of moving declarations 
  (NOT initializations) to the top of their scope 
  before code execution.

  Important:
    - Only DECLARATIONS are hoisted.
    - INITIALIZATIONS are NOT hoisted.
    - Different behaviors for var, let, const, and functions.
*/



/* ============================================================
   1. VAR HOISTING
   ============================================================
   - var is hoisted with a default value of "undefined".
   - The declaration moves to the top, not the assignment.
*/

console.log(a); 
/* Output: undefined (because 'a' is hoisted but not initialized yet) */

var a = 10;

/*
  Internally JS treats the code like:

  var a;       // hoisted
  console.log(a); // undefined
  a = 10;
*/



/* ============================================================
   2. LET & CONST HOISTING (TEMPORAL DEAD ZONE)
   ============================================================
   - let and const are hoisted but NOT initialized.
   - They live in the "Temporal Dead Zone" (TDZ) 
     from start of the block until the declaration line.
*/

console.log(b); 
/* ERROR: Cannot access 'b' before initialization */

let b = 20;

/*
  Same for const:
*/

console.log(c);
/* ERROR: Cannot access 'c' before initialization */

const c = 30;

/*
  TDZ = the period where the variable exists but cannot be used.
*/



/* ============================================================
   3. FUNCTION DECLARATION HOISTING
   ============================================================
   - Full function declarations are hoisted WITH their definitions.
   - You can call them before they appear.
*/

greet(); 
/* Output: "Hello" */

function greet() {
  console.log("Hello");
}

/*
  Why this works:
  
  function greet() { ... }  // entire function is hoisted
*/



/* ============================================================
   4. FUNCTION EXPRESSION HOISTING
   ============================================================
   - Only the variable is hoisted, NOT the function assignment.
*/

sayHi(); 
/* ERROR: sayHi is not a function */

var sayHi = function() {
  console.log("Hi");
};

/*
  Because JS treats it like:

  var sayHi;           // hoisted, value = undefined
  sayHi();             // undefined(), ERROR
  sayHi = function() { ... };
*/



/* ============================================================
   5. ARROW FUNCTIONS HOISTING
   ============================================================
   - Arrow functions behave like function expressions.
   - The variable is hoisted, not the function.
*/

sayHello();
/* ERROR: sayHello is not a function */

let sayHello = () => {
  console.log("Hello");
};



/* ============================================================
   6. CLASS HOISTING
   ============================================================
   - Classes are hoisted BUT NOT initialized.
   - They act like let/const (TDZ applies).
*/

const obj = new Person();
/* ERROR: Cannot access 'Person' before initialization */

class Person {}



/* ============================================================
   7. WHY HOISTING EXISTS
   ============================================================
   - JS executes in two phases:
       1. Creation Phase: 
          → memory is allocated
          → scope is set up
          → declarations are hoisted
       2. Execution Phase:
          → code runs line by line
*/



/* ============================================================
   8. SUMMARY OF HOISTING BEHAVIOR
   ============================================================

   var:
     - Hoisted
     - Initialized with undefined
     - No TDZ

   let:
     - Hoisted
     - Not initialized
     - Has TDZ

   const:
     - Hoisted
     - Not initialized
     - Must be assigned at declaration
     - Has TDZ

   function declaration:
     - Fully hoisted with definition

   function expression (var/let/const):
     - Variable hoisted
     - Function assignment NOT hoisted
     - let/const → TDZ
     - var → undefined

   arrow function:
     - Same rules as function expressions

   class:
     - Hoisted
     - Not initialized
     - TDZ applies
*/



/* ============================================================
   9. SHORT PRACTICAL UNDERSTANDING
   ============================================================
   - Hoisting happens automatically.
   - Declarations move to the top.
   - let, const, class → hoisted but locked (TDZ).
   - var → hoisted as undefined.
   - function declarations → fully hoisted.
*/
