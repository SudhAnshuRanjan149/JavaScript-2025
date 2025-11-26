/*
  FUNCTIONS IN JAVASCRIPT — DECLARATION, EXPRESSION, ARROW (DETAILED)
  -------------------------------------------------------------------
  Functions are reusable blocks of code.
  JS has 3 main ways to create functions:
      1. Function Declaration
      2. Function Expression
      3. Arrow Function
  Each has different behavior regarding:
      - hoisting
      - this binding
      - syntax
*/



/* ============================================================
   1. FUNCTION DECLARATION
   ============================================================
   - Uses the `function` keyword.
   - Hoisted completely (you can call before declaring).
   - Has its own `this` context (dynamic binding).
*/

greet();  // works (HOISTED)

function greet() {
  console.log("Hello from a Function Declaration");
}

/*
  Characteristics:
    - Named function
    - Fully hoisted
    - Best for defining standalone functions
*/



/* ============================================================
   2. FUNCTION EXPRESSION
   ============================================================
   - Function stored in a variable.
   - NOT fully hoisted (variable hoisted as undefined).
   - Can be named or anonymous.
*/

try {
  sayHi(); // ERROR: Cannot access before initialization
} catch (err) {
  console.log(err.message);
}

const sayHi = function () {
  console.log("Hello from a Function Expression");
};

sayHi();

/*
  Characteristics:
    - Not hoisted (TDZ if let/const)
    - Useful for callbacks, event handlers
*/



/* ============================================================
   3. ARROW FUNCTION (ES6)
   ============================================================
   - Short and modern syntax.
   - Does NOT have its own `this`, `arguments`, `super`, or `new.target`.
   - Cannot be used as a constructor.
*/

const arrow = () => {
  console.log("Hello from an Arrow Function");
};

arrow();

/*
  BEST FOR:
    - Callbacks
    - Array methods (map, filter, reduce)
    - Short inline functions

  NOT GOOD FOR:
    - Object methods that use `this`
    - Constructor functions
*/



/* ============================================================
   4. DIFFERENCES IN HOISTING
   ============================================================

   FUNCTION DECLARATION:
       - fully hoisted with body
       - safe to call before declaration

   FUNCTION EXPRESSION (let/const):
       - variable hoisted but not initialized
       - calling before assignment → TDZ error

   ARROW FUNCTION (let/const):
       - same hoisting rules as function expression
*/

console.log("Hoisting Example:");

try {
  test(); // Works
} catch (err) {
  console.log(err.message);
}

function test() {
  console.log("Function Declaration Works Before Defining");
}

try {
  exp(); // ERROR
} catch (err) {
  console.log(err.message);
}

const exp = function () {
  console.log("Function Expression");
};



/* ============================================================
   5. this BEHAVIOR DIFFERENCE
   ============================================================
   FUNCTION DECLARATION / EXPRESSION:
     - `this` depends on how function is CALLED.
*/

const obj1 = {
  name: "Alice",
  show: function () {
    console.log("Using normal function:", this.name);
  }
};

obj1.show(); // "Alice"



/*
   ARROW FUNCTION:
     - No own `this`
     - Inherits `this` from outer lexical scope
*/

const obj2 = {
  name: "Bob",
  show: () => {
    console.log("Using arrow:", this.name);
  }
};

obj2.show();
/*
  Output: undefined
  Because arrow function does NOT bind its own `this`
*/



/* ============================================================
   6. USING FUNCTIONS AS CALLBACKS
   ============================================================
*/

const numbers = [1, 2, 3, 4];

/* Function Expression */
const doubled1 = numbers.map(function (n) {
  return n * 2;
});

/* Arrow Function */
const doubled2 = numbers.map(n => n * 2);

console.log(doubled1, doubled2);



/* ============================================================
   7. NAMED vs ANONYMOUS FUNCTION EXPRESSIONS
   ============================================================
*/

const namedFunc = function multiply(a, b) {
  return a * b;
};

console.log(namedFunc(3, 5));

/*
  Named functions:
    - useful for debugging stack traces
    - but still behave like expressions
*/

const anonymousFunc = function (a, b) {
  return a * b;
};

console.log(anonymousFunc(4, 6));



/* ============================================================
   8. DEFAULT PARAMETERS
   ============================================================
*/

function welcome(user = "Guest") {
  console.log("Welcome", user);
}

welcome();        // Guest
welcome("John");  // John



/* ============================================================
   9. REST PARAMETERS
   ============================================================
*/

function sum(...nums) {
  return nums.reduce((acc, n) => acc + n, 0);
}

console.log(sum(1, 2, 3, 4)); // 10



/* ============================================================
   10. SUMMARY TABLE
   ============================================================

   | Type                   | Hoisted | Own this? | Syntax         | Use Case                    |
   |------------------------|---------|-----------|----------------|-----------------------------|
   | Function Declaration   | Yes     | Yes       | function name  | Main functions              |
   | Function Expression    | No      | Yes       | const fn =...  | Callbacks, conditional      |
   | Arrow Function         | No      | No        | () => {}       | Short, callbacks, array ops |

*/



/* ============================================================
   11. SUPER SIMPLE ANALOGY
   ============================================================

   Function Declaration:
     - Like a public tool available everywhere from the start.

   Function Expression:
     - Like a tool stored in a labeled box → available only after box is created.

   Arrow Function:
     - Like a minimal tool with no extra behavior → simple and lightweight.

*/
