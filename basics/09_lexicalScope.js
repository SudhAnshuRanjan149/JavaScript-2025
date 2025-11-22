/*
  LEXICAL SCOPE IN JAVASCRIPT — DETAILED EXPLANATION
  --------------------------------------------------
  Lexical Scope = "Scope determined by the physical placement of code."
  In simple terms:
      → Where a variable is written in the code decides where it is accessible.
      → JS looks OUTWARD (not inward) for variables.
  
  JavaScript uses LEXICAL SCOPING (also called STATIC SCOPING),
  meaning scope is decided at WRITE-TIME, not at RUN-TIME.
*/



/* ============================================================
   1. HOW LEXICAL SCOPE WORKS
   ============================================================
   - When you write a function inside another function:
       → inner function has access to outer function variables.
   - This access happens because of the code's position.
   - This chain is created during compilation (before execution).
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
  Explanation:
    - inner() is lexically inside outer().
    - inner() can access:
        → innerVar (its own)
        → outerVar (in parent)
        → globalVar (in global)
*/



/* ============================================================
   2. SCOPE CHAIN (RESULT OF LEXICAL SCOPE)
   ============================================================
   When a variable is used:
     - JS looks in the current function scope.
     - If not found → looks in its outer scope.
     - Repeats until global scope.
*/

function A() {
  let x = 10;

  function B() {
    let y = 20;

    function C() {
      let z = 30;
      console.log(x, y, z);
    }

    C();
  }

  B();
}

A();

/*
  C() can access:
    z → inside C
    y → inside B
    x → inside A

  This is the lexical scope chain.
*/



/* ============================================================
   3. IMPORTANT: CALL LOCATION DOES NOT MATTER
   ============================================================
   Lexical scope is based on WHERE the function is WRITTEN,
   NOT where the function is CALLED.
*/

let value = "Global Value";

function parent() {
  let value = "Parent Value";

  return child;  // return child function
}

function child() {
  console.log(value);
}

parent()(); 
/*
  Output: "Global Value"
  
  WHY?
    - child() is written in global scope.
    - NOT inside parent().
    - So its lexical parent is GLOBAL SCOPE.
*/



/* ============================================================
   4. LEXICAL SCOPE IS THE FOUNDATION OF CLOSURES
   ============================================================
   Closures work because the inner function REMEMBERS the
   variables where it was lexically created.
*/

function counter() {
  let count = 0;

  return function () {
    count++;
    console.log(count);
  };
}

const inc = counter();
inc(); // 1
inc(); // 2

/*
  Even after counter() finished, the inner function
  STILL has access to count because of lexical scope.
*/



/* ============================================================
   5. LEXICAL SCOPE VS DYNAMIC SCOPE
   ============================================================
   JavaScript uses LEXICAL scope, not DYNAMIC scope.

   LEXICAL SCOPE:
     - scope determined by WHERE the function is WRITTEN

   DYNAMIC SCOPE:
     - scope depends on WHERE the function is CALLED (NOT JS)

   Example to show difference:
*/

let n = "Global";

function func1() {
  console.log(n);
}

function func2() {
  let n = "Local";
  func1();  // called inside func2
}

func2();

/*
  Output: "Global"
  Because lexical scope → func1 is written in global scope.
*/



/* ============================================================
   6. SUMMARY OF LEXICAL SCOPE
   ============================================================

   - Lexical scope = scope defined by source code structure.
   - Inner functions can access outer functions' variables.
   - Scope chain created at compile time.
   - Function call location DOES NOT affect lexical scope.
   - Closures exist because of lexical scoping.
*/



/* ============================================================
   7. SUPER SIMPLE ANALOGY
   ============================================================
   → "Lexical scope is like a house with rooms placed inside each other.
      A person in the inner room can walk out and access items,
      but someone in the outer room cannot see inside."
*/
