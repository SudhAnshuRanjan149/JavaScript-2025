/*
  "this" KEYWORD IN JAVASCRIPT (binding, call, apply, bind) — DETAILED EXPLANATION
  --------------------------------------------------------------------------------
  ✔ "this" refers to the object that is executing the current function.
  ✔ The value of "this" depends on HOW a function is called (not where it's written).
*/



/* ============================================================
   1. GLOBAL CONTEXT (NON-STRICT vs STRICT)
   ============================================================ */

console.log(this); 
/*
  In browser (non-strict): this === window
  In Node.js (top-level): this === {}
*/

function test1() {
  console.log(this);
}

test1();
/*
  Non-strict: window
  Strict: undefined
*/



/* ============================================================
   2. "this" INSIDE AN OBJECT METHOD
   ============================================================ */

const user = {
  name: "Alice",
  greet() {
    console.log(this.name);
  }
};

user.greet(); // "Alice"
/*
  this → user
*/



/* ============================================================
   3. "this" INSIDE A NESTED FUNCTION (COMMON MISTAKE)
   ============================================================ */

const obj = {
  name: "Bob",
  outer() {
    console.log("outer this:", this.name);

    function inner() {
      console.log("inner this:", this);
    }

    inner(); // "this" inside inner = window / undefined
  }
};

obj.outer();

/*
  Why?
    inner() is a normal function call → default binding
*/



/* ============================================================
   4. FIXING NESTED "this" USING ARROW FUNCTIONS
   ============================================================ */

const obj2 = {
  name: "Charlie",
  outer() {
    const inner = () => {
      console.log("arrow this:", this.name);
    };
    inner();
  }
};

obj2.outer();
/*
  Arrow functions do NOT have their own "this".
  They inherit "this" from their lexical scope.
*/



/* ============================================================
   5. "this" INSIDE CONSTRUCTOR FUNCTIONS
   ============================================================ */

function Person(name) {
  this.name = name;
}

const p1 = new Person("David");

console.log(p1.name);
/*
  With "new":
    - creates an empty object
    - sets this = new object
    - returns the object automatically
*/



/* ============================================================
   6. "this" IN CLASSES (SAME AS CONSTRUCTOR)
   ============================================================ */

class Car {
  constructor(brand) {
    this.brand = brand;
  }
  show() {
    console.log(this.brand);
  }
}

const c1 = new Car("Tesla");
c1.show(); // Tesla



/* ============================================================
   7. IMPLICIT BINDING (MOST COMMON)
   ============================================================ */

const laptop = {
  brand: "Apple",
  info() {
    console.log(this.brand);
  }
};

laptop.info(); // this → laptop



/* ============================================================
   8. EXPLICIT BINDING (call, apply, bind)
   ============================================================ */
/*
  These methods LET YOU CHOOSE what "this" should be.
*/



/* ------------------------------------------------------------
   A) call() — invoke function with chosen "this" + arguments
   ------------------------------------------------------------ */

function intro(lang) {
  console.log(`${this.name} codes in ${lang}`);
}

const dev = { name: "John" };

intro.call(dev, "JavaScript");
/*
  call(thisArg, arg1, arg2...)
*/



/* ------------------------------------------------------------
   B) apply() — same as call(), but args as an ARRAY
   ------------------------------------------------------------ */

intro.apply(dev, ["Python"]);
/*
  apply(thisArg, [args])
*/



/* ------------------------------------------------------------
   C) bind() — returns a NEW function with fixed "this"
   ------------------------------------------------------------ */

const introJS = intro.bind(dev, "C++");

introJS();  // John codes in C++

/*
  bind does not call the function immediately.
  It returns a new version with preset this + args.
*/



/* ============================================================
   9. EXPLICIT BINDING USE CASE: setTimeout()
   ============================================================ */

const counter = {
  count: 0,
  inc() {
    this.count++;
    console.log(this.count);
  }
};

setTimeout(counter.inc, 500); 
/*
  WRONG:
    this → window (not counter)
    result: NaN or error
*/

setTimeout(counter.inc.bind(counter), 1000);
/*
  bind fixes "this"
*/



/* ============================================================
   10. ARROW FUNCTIONS AND "this"
   ============================================================ */
/*
  ✔ Arrow functions DO NOT have their own "this".
  ✔ They capture "this" from their lexical parent.
*/

const team = {
  name: "Warriors",
  show: function () {
    const arrow = () => console.log(this.name);
    arrow();  // uses parent's this
  }
};

team.show(); // Warriors



/* ============================================================
   11. DIFFERENCE BETWEEN call(), apply(), bind()
   ============================================================ */
/*
  call():
      fn.call(this, a, b, c)

  apply():
      fn.apply(this, [a, b, c])  ← array

  bind():
      const newFn = fn.bind(this, a, b);
      newFn();
  
  call/apply → invoke immediately
  bind → returns NEW function
*/



/* ============================================================
   12. "this" IN EVENT LISTENERS
   ============================================================ */

// Example (browser):
// const btn = document.querySelector("button");
// btn.addEventListener("click", function () {
//   console.log(this); // this → the button element
// });

// Arrow function version:
// btn.addEventListener("click", () => {
//   console.log(this); // lexical this (usually window)
// });



/* ============================================================
   13. SUMMARY
   ============================================================ */
/*
  ✔ this depends on HOW a function is called, not where it’s written.

  BINDING RULES:
    1. DEFAULT BINDING
          function fn() { console.log(this); }
          fn(); → window / undefined

    2. IMPLICIT BINDING
          obj.fn(); → this = obj

    3. NEW BINDING
          new Fn(); → this = new object

    4. EXPLICIT BINDING
          fn.call(obj)
          fn.apply(obj)
          fn.bind(obj)

  ✔ Arrow functions ignore all these rules → they inherit this lexically.

  MENTAL MODEL:
    → “this” is a reference to the object that owns the function call AT RUNTIME.
    → call/apply/bind let you MANUALLY choose that object.
*/
