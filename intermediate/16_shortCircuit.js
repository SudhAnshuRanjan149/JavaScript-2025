/*
  SHORT-CIRCUITING (||, &&, ??) IN JAVASCRIPT — DETAILED EXPLANATION
  ------------------------------------------------------------------
  ✔ Short-circuiting means:
        → An operator stops evaluating as soon as the result is known.

  ✔ Applies to:
        - OR operator        ||
        - AND operator       &&
        - Nullish Coalescing ??
*/



/* ============================================================
   1. OR OPERATOR (||) — RETURNS FIRST TRUTHY VALUE
   ============================================================ */
/*
  Rule:
      a || b
      → returns a if a is truthy
      → otherwise returns b

  Uses:
      ✔ providing default values
      ✔ fallback logic
*/

console.log(0 || "default");        // "default"
console.log("" || "fallback");      // "fallback"
console.log(null || "guest");       // "guest"
console.log("Admin" || "Guest");    // "Admin" (truthy → stops here)

/*
  Short-circuiting:
    - If left value is truthy → JS does NOT check the right value.
*/

function fn() {
  console.log("I am executed");
  return 100;
}

console.log("Hello" || fn());  
// "Hello"
// fn() NOT executed because "Hello" is truthy → short-circuiting



/* ============================================================
   2. AND OPERATOR (&&) — RETURNS FIRST FALSY VALUE
   ============================================================ */
/*
  Rule:
      a && b
      → returns a if a is falsy
      → otherwise returns b

  Uses:
      ✔ conditional execution
      ✔ check existence before accessing properties
*/

console.log(0 && 5);          // 0
console.log("" && 5);         // ""
console.log("Hi" && 5);       // 5 (because "Hi" truthy → evaluate right)

console.log(false && fn()); 
// false
// fn() NOT executed because false is falsy → short-circuiting

/*
  Common pattern:
*/

const user = { isLoggedIn: true, name: "Alice" };

user.isLoggedIn && console.log(user.name);
// prints "Alice"
// second part runs only if first is truthy



/* ============================================================
   3. NULLISH COALESCING (??) — RETURNS FIRST DEFINED VALUE
   ============================================================ */
/*
  Rule:
      a ?? b
      → returns a unless a is null or undefined
      → only checks null or undefined (NOT falsy values)

  Meaning:
      null ?? something → something
      undefined ?? something → something
      0 ?? something → 0
      "" ?? something → ""
      false ?? something → false

  Uses:
      ✔ safe defaults without treating 0, "", false as missing
*/

console.log(null ?? "default");      // "default"
console.log(undefined ?? "fallback");// "fallback"
console.log(0 ?? 99);                // 0 (not null/undefined)
console.log("" ?? "hello");          // "" (not null/undefined)



/* ============================================================
   4. DIFFERENCE BETWEEN || AND ??
   ============================================================ */

/*
  OR (||):
    - treats ALL falsy values as missing:
        0, "", false, null, undefined, NaN

  NULLISH (??):
    - ONLY treats null and undefined as missing
*/

console.log(0 || 100);   // 100  (0 is falsy)
console.log(0 ?? 100);   // 0    (0 is a VALID value)

console.log("" || "X");  // "X"
console.log("" ?? "X");  // ""

console.log(false || true); // true
console.log(false ?? true); // false



/* ============================================================
   5. REAL USE CASES — DEFAULT PARAMETERS WITH SHORT-CIRCUITING
   ============================================================ */

/* OR (||) — Not recommended for numbers/booleans */
const items = 0;
const total1 = items || 10;
console.log(total1);      // 10 (wrong if 0 is valid)

/* Nullish (??) — safer */
const total2 = items ?? 10;
console.log(total2);      // 0 (correct)



/* ============================================================
   6. SHORT-CIRCUITING FOR CONDITIONAL EXECUTION
   ============================================================ */

let ready = true;
ready && console.log("Start process"); 
/*
  Output → "Start process"
  Because ready is truthy, second expression executes.
*/

ready = false;
ready && console.log("You won't see this");
/*
  Because ready is false, console.log is never executed.
*/



/* ============================================================
   7. SHORT-CIRCUITING WITH FUNCTIONS
   ============================================================ */

function expensive() {
  console.log("Called expensive function");
  return "DONE";
}

console.log(true && expensive());  
// expensive() executed because left is truthy

console.log(false && expensive()); 
// NOT executed because false short-circuits



/* ============================================================
   8. COMBINING OPERATORS
   ============================================================ */

const val = null;

// First ?? runs:
const result1 = val ?? "fallback" || "other";
console.log(result1);   // "fallback"

// First || runs:
const result2 = val || undefined ?? "yes";
console.log(result2);   // "yes"



/* ============================================================
   9. SUMMARY
   ============================================================ */
/*
  OPERATOR:     RETURNS:
  -----------------------------------------
  ||  (OR)      first truthy value
  &&  (AND)     first falsy value
  ?? (Nullish)  first defined value (not null/undefined)

  SHORT-CIRCUITING:
    - Stops evaluating as soon as output is determined
    - Useful for:
        ✔ default values
        ✔ conditional function calls
        ✔ safe property access
        ✔ fallback logic
        ✔ cleaner conditions
  
  MENTAL MODEL:
    → ||
        "Give me the first value that is GOOD."

    → &&
        "Give me FALSE immediately if anything is bad."

    → ??
        "Give me the first value that actually EXISTS."
*/
