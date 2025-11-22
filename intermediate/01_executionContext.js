/*
  EXECUTION CONTEXT IN JAVASCRIPT — DETAILED EXPLANATION
  -------------------------------------------------------
  Execution Context = the environment where JavaScript code runs.
  It defines:
      - HOW variables are stored
      - WHERE functions execute
      - WHAT values `this` refers to
      - HOW scope works
      - HOW code is evaluated

  Two phases inside every execution context:
      1. Creation Phase
      2. Execution Phase

  There are 3 types of Execution Context:
      1. Global Execution Context (GEC)
      2. Function Execution Context (FEC)
      3. Eval Execution Context (rarely used)
*/



/* ============================================================
   1. GLOBAL EXECUTION CONTEXT (GEC)
   ============================================================
   - Created when JS file starts execution.
   - The global scope (window in browser, global in Node).
   - Creates two things:

     a) Global Object  (window/global)
     b) global this
     c) Memory for variables & functions declared globally

   Example:
*/

var a = 10;
function foo() {
  console.log("Inside foo");
}

console.log("Global context running");

/*
  Behind the scenes:

  CREATION PHASE:
    - a → undefined
    - foo → function code
    - this → window (browser)

  EXECUTION PHASE:
    - a = 10
    - foo() can run when called
*/



/* ============================================================
   2. FUNCTION EXECUTION CONTEXT (FEC)
   ============================================================
   A new execution context is created EACH TIME a function is called.

   FEC has:
      1. Local Variable Environment
      2. Lexical Environment
      3. Arguments object
      4. this binding
*/

function add(x, y) {
  let z = x + y;
  return z;
}

add(5, 10);

/*
  Behind the scenes (when add(5,10) runs):

  CREATION PHASE:
    - arguments = {0: 5, 1: 10}
    - x = undefined
    - y = undefined
    - z = undefined
    - this binding depends on call method

  EXECUTION PHASE:
    - x = 5
    - y = 10
    - z = 15
*/



/* ============================================================
   3. MEMORY CREATION PHASE (VERY IMPORTANT)
   ============================================================
   Happens before code executes.
   JS allocates memory for all variables & functions.

   var → initialized as undefined
   let, const → allocated but NOT initialized (TDZ)
   function declarations → full function stored
*/

console.log(testVar);  // undefined
var testVar = 20;

/*
console.log(testLet);  // ERROR (TDZ)
let testLet = 30;
*/



/* ============================================================
   4. EXECUTION PHASE
   ============================================================
   - Code runs line-by-line.
   - Variables get actual values.
*/



/* ============================================================
   5. EXECUTION CONTEXT STACK (CALL STACK)
   ============================================================
   JS uses a stack structure:

   1. First, Global Execution Context is pushed.
   2. When a function is called → new FEC pushed.
   3. When function ends → FEC popped.

   Example:
*/

function one() {
  console.log("One");
  two();
}

function two() {
  console.log("Two");
  three();
}

function three() {
  console.log("Three");
}

one();

/*
  CALL STACK:
    push GEC
    push FEC(one)
    push FEC(two)
    push FEC(three)
    pop FEC(three)
    pop FEC(two)
    pop FEC(one)
*/



/* ============================================================
   6. LEXICAL ENVIRONMENT INSIDE EXECUTION CONTEXT
   ============================================================
   Lexical Environment = local memory + reference to parent scope.
*/

let globalVar = "GLOBAL";

function outer() {
  let outerVar = "OUTER";

  function inner() {
    let innerVar = "INNER";
    console.log(globalVar, outerVar, innerVar);
  }

  inner();
}

outer();

/*
  inner() Execution Context:
     - has innerVar
     - references outer()
     - references global scope
*/



/* ============================================================
   7. EXECUTION CONTEXT VS SCOPE
   ============================================================

   Execution Context:
     - Created each time code runs.
     - Controls HOW code runs.

   Scope:
     - Created when code is written.
     - Controls WHAT variables you can access.

   → Execution context USES scope to resolve variables.
*/



/* ============================================================
   8. WHAT IS INSIDE AN EXECUTION CONTEXT?
   ============================================================

   1. Variable Environment
      → var variables
      → function declarations
      → arguments object

   2. Lexical Environment
      → let & const
      → reference to outer scope

   3. this binding

   Global EC:
      this → window/global

   Function EC:
      this depends on how the function is called.
*/



/* ============================================================
   9. FULL SIMPLE EXAMPLE SHOWING BOTH PHASES
   ============================================================
*/

function example(a, b) {
  var x = 10;
  let y = 20;
  const z = 30;

  function child() {
    console.log(a, b, x, y, z);
  }

  child();
}

example(1, 2);

/*
  Example Execution Context (CREATION PHASE):

    arguments: {0:1, 1:2}
    a: undefined
    b: undefined
    x: undefined
    y: TDZ
    z: TDZ
    child: function

  EXECUTION PHASE:

    a = 1
    b = 2
    x = 10
    y = 20
    z = 30
*/



/* ============================================================
   10. SUMMARY
   ============================================================

   Execution Context:
     - Environment where JS runs

   Types:
     ✔ Global Execution Context
     ✔ Function Execution Context
     ✔ Eval Execution Context

   Each EC has:
     - Memory creation phase
     - Execution phase

   Created:
     - GEC → when JS starts
     - FEC → when function is called

   Contains:
     - Variable Environment
     - Lexical Environment
     - this binding
     - arguments object
     - reference to outer scope (scope chain)

   Call Stack:
     - Manages execution contexts in LIFO order
*/



/* ============================================================
   11. SUPER SIMPLE ANALOGY
   ============================================================
   → Execution Context is like a room created when code runs.
     Inside, JS prepares tables (variables, functions),
     sets rules (scope, this),
     and then executes the instructions step-by-step.
*/
