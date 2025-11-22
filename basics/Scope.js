/*
  SHORT ANSWER:
  Scope and Lexical Scope are related but NOT the same thing.
*/

/*
  SCOPE:
  ------
  - Scope = "Where a variable can be accessed."
  - There are different kinds of scope: 
      * Global scope
      * Function scope
      * Block scope
      * Module scope
  - Scope describes the *visibility* of variables during execution.
*/

/*
  LEXICAL SCOPE:
  --------------
  - Lexical Scope = "How JavaScript determines scope."
  - JS uses *lexical scoping*, meaning scope is decided by where 
    code is written (not by where functions are called).
  - It is a *rule* that defines scope creation.
*/

/*
  RELATIONSHIP:
  -------------
  - Scope = the result.
  - Lexical scope = the rule that creates that result.

  Think of it like this:

  Lexical Scope (rule) → produces → Scope (the actual accessible variables)
*/

/*
  EXAMPLE:
*/
let a = 1;

function outer() {
  let b = 2;

  function inner() {
    let c = 3;
    console.log(a, b, c); 
    /* inner has access to a + b + c due to lexical scope */
  }

  inner();
}

outer();

/*
  KEY POINT:
  ----------
  Lexical scope defines HOW scope works.
  Scope defines WHAT variables you can access at a given line.
*/




// ----------------------------------------------------------------------------------
// ***********************************************************************************
// ----------------------------------------------------------------------------------




/*
  SCOPE IN JAVASCRIPT — DETAILED EXPLANATION
  ------------------------------------------
  Scope determines:
    → Which variables are accessible
    → From which part of the code
  It defines the visibility and lifetime of variables and functions.
*/


/* ============================================================
   1. GLOBAL SCOPE
   ============================================================
   - Variables declared outside any function/block.
   - Accessible everywhere in the code.
*/

let globalVar2 = "I am global";

function showGlobal() {
  console.log(globalVar); 
  /* accessible because global scope is always outermost */
}

showGlobal();



/* ============================================================
   2. FUNCTION SCOPE
   ============================================================
   - Each function creates a new scope.
   - Variables declared with var, let, const inside a function
     are accessible only inside that function.
*/

function funcScopeDemo() {
  let x = 10;   // function-scoped
  var y = 20;   // also function-scoped
  const z = 30; // also function-scoped

  console.log(x, y, z);
}

funcScopeDemo();

/* console.log(x); // ERROR: x is not defined */



/* ============================================================
   3. BLOCK SCOPE
   ============================================================
   - Introduced in ES6.
   - let and const create block-scoped variables.
   - var DOES NOT respect block scope.
*/

{
  let a = 1;
  const b = 2;
  var c = 3;
}

/* console.log(a); // ERROR: a not defined */
/* console.log(b); // ERROR: b not defined */
console.log(c); // OK → 3 (var is not block scoped)



/* ============================================================
   4. NESTED SCOPE (SCOPE CHAIN)
   ============================================================
   - Inner scopes can access outer scopes.
   - Outer scopes CANNOT access inner scopes.
*/

let outerVar = "outer";

function outerFunction() {
  let midVar = "mid";

  function innerFunction() {
    let innerVar = "inner";

    console.log(outerVar); // accessible
    console.log(midVar);   // accessible
    console.log(innerVar); // accessible
  }

  innerFunction();
}

outerFunction();

/*
console.log(midVar);   // ERROR
console.log(innerVar); // ERROR
*/



/* ============================================================
   5. LEXICAL SCOPE (HOW SCOPE IS DETERMINED)
   ============================================================
   - Scope is determined by where code is written, not called.
   - JS uses lexical scoping.
   - This rule creates the "scope chain".
*/

function A() {
  let x = 5;

  function B() {
    console.log(x); 
    /* B can access x because it is lexically inside A */
  }

  return B;
}

const fn = A(); 
fn(); 
/* even after A finishes, B still remembers x (closure) */



/* ============================================================
   6. MODULE SCOPE (ES6 MODULES)
   ============================================================
   - Each module file has its own top-level scope.
   - Variables are not global unless exported.
*/

/*
  // example.js
  let secret = 123; // module scoped

  // main.js
  console.log(secret); // ERROR unless exported
*/



/* ============================================================
   7. SUMMARY
   ============================================================
   - Global Scope: accessible everywhere.
   - Function Scope: created by functions.
   - Block Scope: created by { } with let/const.
   - Lexical Scope: rule that determines variable visibility.
   - Scope Chain: inner → outer variable lookup.
   - Module Scope: top-level of ES modules.

   Scope = WHAT variables you can access.
   Lexical Scope = HOW that access is determined.
*/



// ----------------------------------------------------------------------------------
// ***********************************************************************************
// ----------------------------------------------------------------------------------



/* 
  LEXICAL SCOPE IN JAVASCRIPT
  ---------------------------
  Lexical Scope means: 
  "A variable is accessible based on where it was declared in the code,
  not where it's used or called."

  JS determines variable scope at *write time* (when you write the code),
  not at runtime.
*/

/* 
  EXAMPLE 1: BASIC LEXICAL SCOPE
*/
let globalVar = "I am global";

function outer() {
  let outerVar = "I am in outer";

  function inner() {
    /* inner can access outerVar + globalVar because it is written inside them */
    console.log(globalVar);
    console.log(outerVar);
  }

  inner();
}

outer();


/*
  EXAMPLE 2: FUNCTIONS CANNOT ACCESS INNER SCOPE UPWARDS
*/
function a() {
  let x = 100;

  function b() {
    /* b has access to x (lexical scope) */
    console.log(x);
  }

  b();
}

a();

/*
  But the reverse is NOT allowed:
  outer code cannot access inner variables.
*/

function test() {
  let secret = 42;
}

console.log(secret); 
/* ERROR: secret is not defined */



/*
  EXAMPLE 3: LEXICAL SCOPE + CLOSURE RELATION
  innerFunction remembers the lexical environment where it was created.
*/
function makeGreeter(name) {
  /* name is part of this function's lexical scope */
  return function() {
    console.log("Hello " + name);
  };
}

const greetJohn = makeGreeter("John");
const greetAnna = makeGreeter("Anna");

greetJohn(); // "Hello John"
greetAnna(); // "Hello Anna"


/*
  PRACTICAL SUMMARY:
  ------------------
  - JS uses lexical scoping (scope determined by position of code).
  - Inner functions can access variables of outer functions.
  - Outer functions cannot access inner function variables.
  - Closures depend on lexical scope.
*/
