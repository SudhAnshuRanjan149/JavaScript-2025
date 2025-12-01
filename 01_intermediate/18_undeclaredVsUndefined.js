/*
  NULL vs UNDEFINED, UNDECLARED vs UNDEFINED IN JAVASCRIPT — GREAT DETAIL
  ----------------------------------------------------------------------
  There are actually TWO related concepts interviewers love:

    1) null vs undefined
    2) undefined vs undeclared

  We'll break both down with clear examples and mental models.
*/



/* ============================================================
   1. WHAT IS undefined IN JS?
   ============================================================
   ✔ `undefined` is a primitive value.
   ✔ It means: "there is a variable, but it has no value (yet)".
   ✔ It is the DEFAULT VALUE for:
        - uninitialized variables
        - missing function arguments
        - missing properties on objects
        - return value of functions with no explicit return
*/

let a;
console.log(a); // undefined  (declared but not assigned)

function foo(x) {
  console.log(x); // if you call foo() with no args → x = undefined
}

foo(); // x is undefined

const obj = {};
console.log(obj.prop); // undefined (prop does NOT exist on obj)

function bar() {}
console.log(bar()); // undefined (no return → implicitly returns undefined)



/* ============================================================
   2. WHAT IS null IN JS?
   ============================================================
   ✔ `null` is also a primitive value.
   ✔ It means: "explicitly no value" or "intentional absence of value".
   ✔ You (the programmer) must assign it yourself.
*/

let b = null;
console.log(b); // null

/*
  Typical use cases for null:
    - Initialize variables that will later hold an object
    - Represent "nothing found" or "empty result"
    - Explicitly reset a variable to "no value"
*/

let user = null; // user not loaded yet

// later...
user = { name: "Alice" }; // now user has a value

user = null; // clear user (logout, cleanup, etc.)



/* ============================================================
   3. KEY DIFFERENCES: null vs undefined
   ============================================================
   ✔ undefined:
        - assigned by JavaScript (engine)
        - means "variable declared, but value not set"
        - natural default

   ✔ null:
        - assigned by developer
        - means "explicitly nothing / empty / reset"

   SIMPLE MENTAL MODEL:
      - undefined = "not yet defined"
      - null      = "defined, but intentionally empty"
*/



/* ------------------------------------------------------------
   TYPE DIFFERENCES (typeof)
   ------------------------------------------------------------ */

console.log(typeof undefined); // "undefined"
console.log(typeof null);      // "object"  (historical JS bug, but standardized)

/*
  IMPORTANT:
    typeof null === "object" is a long-standing quirk in JS.
    null is NOT really an object, but typeof says "object".
*/



/* ------------------------------------------------------------
   EQUALITY DIFFERENCES (== vs ===)
   ------------------------------------------------------------ */

console.log(undefined == null);  // true   (loose equality)
console.log(undefined === null); // false  (strict equality)

/*
  WHY?
    - With ==, null and undefined are considered equal to each other
      and ONLY to each other. They are not equal to anything else.
    - With ===, type must match → they are different types → false.

  In practice:
    - USE === to avoid confusion.
*/



/* ============================================================
   4. WHEN TO USE null vs undefined IN YOUR CODE
   ============================================================
   Common patterns:

   ✔ Let JS use undefined automatically for:
       - uninitialized variables
       - missing function arguments
       - missing properties

   ✔ Use null WHEN YOU WANT TO SAY EXPLICITLY:
       - "I checked this and there is nothing."
       - "This is intentionally empty."
       - "We reset this value."

   Example use case:
*/

function findUserById(id) {
  const user = /* search DB or API... */ null; // assume not found
  if (!user) return null; // explicit "no user"
}

const userResult = findUserById(123);
if (userResult === null) {
  console.log("User NOT found (explicit)");
}



/* ============================================================
   5. UNDEFINED vs UNDECLARED VARIABLES
   ============================================================
   This is another big interview confusion.

   ✔ DECLARED variable:
       - Introduced using let, const, or var
       - Exists in the scope

   ✔ UNDECLARED variable:
       - No declaration at all in the scope
       - Accessing it directly causes ReferenceError

   ✔ UNDEFINED variable:
       - It IS declared
       - Its value is undefined (either default or set)
*/



/* ------------------------------------------------------------
   EXAMPLES: undefined vs undeclared
   ------------------------------------------------------------ */

let x;
console.log(x); // undefined (DECLARED, but uninitialized)

console.log(y); // ❌ ReferenceError: y is not defined (UNDECLARED)



/*
  Another example:
*/

function demo() {
  let localVar;
  console.log(localVar); // undefined (declared in function)

  // console.log(notDeclared); // ReferenceError (no declaration)
}

demo();



/* ============================================================
   6. HOW UNDECLARED CAN ACCIDENTALLY HAPPEN (IN NON-STRICT MODE)
   ============================================================
   In non-strict mode, ASSIGNING to an undeclared variable creates
   a GLOBAL VARIABLE (on window). This is dangerous.

   Example:
*/

function bad() {
  accidentalGlobal = 10; // NO let/var/const → becomes window.accidentalGlobal in non-strict
}

bad();
console.log(accidentalGlobal); // 10  (global, in non-strict)

/*
  ✔ This is a common source of bugs & memory leaks.

  ✔ In strict mode (or modules), this throws:
        "ReferenceError: accidentalGlobal is not defined"
*/

function good() {
  "use strict";
  // accidentalGlobal = 10; // ❌ ReferenceError in strict mode
}



/* ============================================================
   7. SUMMARY TABLE (null vs undefined vs undeclared)
   ============================================================ */
/*
  1) undefined:
       - Type: "undefined"
       - Set by: JavaScript engine
       - Meaning:
           "variable exists but value not assigned"
       - Examples:
           let a;              // a is undefined
           obj.missingProp;    // undefined
           function f(x) {} f(); // x is undefined
           function g() {} g();  // returns undefined

  2) null:
       - Type: "object" (quirk)
       - Set by: developer
       - Meaning:
           "intentional absence of value"
       - Examples:
           let user = null;
           user = null; // reset/clear

  3) undeclared:
       - No typeof, because any direct access throws error
       - Variable was never declared in the current scope
       - Examples:
           console.log(foo); // ReferenceError: foo is not defined
*/



/* ============================================================
   8. PRACTICAL INTERVIEW PATTERNS & QUESTIONS
   ============================================================
*/

/*
  Q1: What does this log?
*/

let v1;
let v2 = null;

console.log(v1 == v2);  // true  (both treated as "empty" by ==)
console.log(v1 === v2); // false (different types)

/*
  Q2: Difference between undeclared and undefined?

       - undefined:
           variable exists but has no value
           (declared but not assigned)

       - undeclared:
           variable does not exist in that scope at all
           (ReferenceError when accessed)
*/



/*
  Q3: How would you check if a variable is truly not declared?
       You CANNOT safely do `if (someVar === undefined)` because
       that will throw if someVar is undeclared.

       Safe patterns:
*/

if (typeof someVar === "undefined") {
  // will not throw even if someVar isn't declared
  // because typeof on undeclared variable returns "undefined"
}

/*
  Summary:
    - typeof on undeclared variable is safe
    - direct access is not
*/



/* ============================================================
   9. BEST PRACTICES
   ============================================================
*/
/*
  ✔ Always use "use strict" or ES modules to avoid accidental globals.
  ✔ Prefer === over == to avoid confusing equality between null & undefined.
  ✔ Let JS assign undefined automatically; use null when you want to be explicit.
  ✔ Avoid relying on the difference between null and undefined too heavily
    in business logic, unless your team has a clear convention.

  COMMON TEAM CONVENTION:
    - undefined: "not provided / not set internally"
    - null     : "explicitly empty / no value from API or DB"
*/



/* ============================================================
   10. QUICK CHEAT SHEET
   ============================================================
*/
/*
  undefined:
    - JS default
    - variable exists but no value
    - typeof undefined === "undefined"

  null:
    - explicitly set by developer
    - "no value on purpose"
    - typeof null === "object" (weird historical bug)

  undeclared:
    - variable not declared at all
    - accessing → ReferenceError
    - typeof undeclaredVar === "undefined" (safe check)

  MENTAL MODEL:
    - undefined → "not yet assigned"
    - null      → "assigned to be nothing"
    - undeclared → "doesn't exist in this scope"
*/



/* ============================================================
   11. WHAT IS "NOT DEFINED"?
   ============================================================
*/
/*
  ✔ "Not Defined" is NOT a JS value — it is an ERROR message!

  ✔ "Not Defined" happens when:
        - JS tries to READ a variable that was NEVER declared

  ✔ So:
        undeclared variable  → ReferenceError: <name> is not defined

  Example:
*/

console.log(foo); // ❌ ReferenceError: foo is not defined

/*
  ✔ foo is UNDECLARED.
  ✔ That produces the "not defined" error.

  SO:
      undeclared → describes the variable
      not defined → describes the error thrown
*/



/* ============================================================
   12. CLEAR DIFFERENCE TABLE (MOST IMPORTANT)
   ============================================================ */
/*
  +--------------+---------------------------+------------------------------+
  |   TERM       |         MEANING           |      EXAMPLE                |
  +--------------+---------------------------+------------------------------+
  | undefined    | declared, no value        | let x; console.log(x)       |
  | null         | intentional empty value   | let x = null                |
  | undeclared   | never declared            | console.log(y) // error     |
  | not defined  | ReferenceError message    | console.log(y) // same      |
  +--------------+---------------------------+------------------------------+
*/



/* ============================================================
   13. SPECIAL CASES YOU MUST KNOW FOR INTERVIEW
   ============================================================
*/

/* ------------------------------------------------------------
   CASE 1: typeof works safely on undeclared variables
   ------------------------------------------------------------ */

console.log(typeof doesntExist); // "undefined" (NO error)

/*
  ✔ Good interview trick:
      typeof undeclaredVar → “undefined”
      accessing undeclaredVar → ReferenceError
*/



/* ------------------------------------------------------------
   CASE 2: Global variable creation WITHOUT declaration
   (non-strict mode)
   ------------------------------------------------------------ */

function bad() {
  accidental = 10; // ❌ becomes global variable in non-strict mode
}

bad();
console.log(window.accidental); // 10

/*
  ✔ In non-strict mode, assigning to undeclared creates global.
  ✔ In strict mode → ReferenceError.
*/



/* ------------------------------------------------------------
   CASE 3: null used for object initialization
   ------------------------------------------------------------ */

let data = null;

if (data === null) {
  // load data later...
}



/* ------------------------------------------------------------
   CASE 4: undefined used by JavaScript itself
   ------------------------------------------------------------ */

let z;
console.log(z); // undefined

function test(a) { console.log(a); }
test(); // undefined

/*
  ✔ undefined means: JS didn't get a value from you.
*/



/* ============================================================
   14. BEST PRACTICES
   ============================================================ */
/*
  ✔ Use strict equality (===) always, avoid ==.
  ✔ Use null for:
        - resetting values
        - intentional “empty”
  ✔ Do NOT assign undefined manually:
        - let JS handle undefined
  ✔ Always use "use strict" or ES modules to avoid accidental globals.
  ✔ Use typeof for safe checking of undeclared vars.
*/



/* ============================================================
   15. IMPORTANT INTERVIEW Q&A
   ============================================================ */

/*
  Q1: What is the difference between undefined and null?

  A:
    undefined → variable exists but no value
    null      → explicitly no value
*/

/*
  Q2: What is the difference between undefined and not defined?

  A:
    undefined → declared variable with no value
    not defined → ReferenceError for undeclared variables
*/

/*
  Q3: typeof null === "object". Why?

  A:
    A historical bug from early JS implementation,
    preserved for backward compatibility.
*/



/* ============================================================
   16. CHEAT SHEET (REMEMBER THIS FOR INTERVIEWS)
   ============================================================
*/
/*
  undefined  → JS-created, missing value
  null       → developer-created, intentional empty
  undeclared → variable never declared
  not defined → error message when accessing undeclared variable

  USE THIS MENTAL MODEL:
     undefined = “not assigned yet”
     null      = “assigned to be empty”
     undeclared = “variable does not exist”
     not defined = “error for undeclared variable”
*/
