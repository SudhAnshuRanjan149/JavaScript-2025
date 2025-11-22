/*
  OPERATORS IN JAVASCRIPT — ARITHMETIC, LOGICAL, COMPARISON (DETAILED)
  ---------------------------------------------------------------------
  Operators are symbols that perform operations on values/variables.
  This explanation covers the 3 most important groups:
      1. Arithmetic Operators
      2. Logical Operators
      3. Comparison Operators
*/



/* ============================================================
   1. ARITHMETIC OPERATORS
   ============================================================
   Used to perform mathematical operations.
*/

let x = 10;
let y = 3;

console.log(x + y);   // Addition → 13
console.log(x - y);   // Subtraction → 7
console.log(x * y);   // Multiplication → 30
console.log(x / y);   // Division → 3.3333...
console.log(x % y);   // Modulus (remainder) → 1
console.log(x ** y);  // Exponentiation → 10^3 = 1000



/*
  INCREMENT & DECREMENT
*/

let a = 5;

console.log(a++);  // Post-increment → prints 5, then a becomes 6
console.log(a);    // 6

let b = 5;
console.log(++b);  // Pre-increment → a becomes 6, prints 6



/*
  SHORT SUMMARY (ARITHMETIC):
    +   add
    -   subtract
    *   multiply
    /   divide
    %   remainder
    **  power
    ++  increment
    --  decrement
*/



/* ============================================================
   2. COMPARISON OPERATORS
   ============================================================
   Used to compare values.
   They return BOOLEAN values: true or false.
*/

console.log(5 > 3);    // true
console.log(5 < 3);    // false
console.log(5 >= 5);   // true
console.log(5 <= 4);   // false



/*
  EQUALITY OPERATORS
  ------------------
  ==  → loose equality (performs type coercion)
  === → strict equality (NO type coercion)
*/

console.log(5 == "5");   // true  (values are converted before comparison)
console.log(5 === "5");  // false (different types)



/*
  NOT EQUAL OPERATORS
*/

console.log(5 != "5");   // false (because values are coerced)
console.log(5 !== "5");  // true  (types are different)



/*
  SPECIAL CASES:
*/

console.log(null == undefined);  // true   (loose equality treats them similar)
console.log(null === undefined); // false  (different types)

console.log(NaN == NaN);         // false
console.log(NaN === NaN);        // false

/*
  NaN is NEVER equal to anything — not even itself.
*/

console.log(Number.isNaN(NaN)); // true (correct way to check NaN)



/* ============================================================
   3. LOGICAL OPERATORS
   ============================================================
   Used with boolean values.
*/

let p = true;
let q = false;

console.log(p && q);  // AND → false
console.log(p || q);  // OR  → true
console.log(!p);      // NOT → false



/*
  AND (&&)
  --------
    true && true   → true
    true && false  → false
    false && any   → false (short-circuits)
*/

console.log(0 && "hello");   // 0  (stops at first falsy value)
console.log("hi" && 123);    // 123 (returns last truthy value)



/*
  OR (||)
  -------
    true || anything → true (short-circuits)
    false || value   → value
*/

console.log("" || "default");  // "default" (useful for fallbacks)
console.log("text" || "fallback"); // "text"



/*
  NOT (!)
*/

console.log(!0);    // true
console.log(!1);    // false



/* ============================================================
   LOGICAL OPERATOR TRUTHINESS
   ------------------------------------------------------------
   JS treats values as TRUTHY or FALSY.

   FALSY VALUES:
      - 0
      - ""
      - null
      - undefined
      - NaN
      - false

   Everything else = TRUTHY
*/



/* ============================================================
   4. COMBINED EXAMPLE: VALIDATION LOGIC
   ============================================================
*/

let username = "admin";
let password = "123";

if (username === "admin" && password === "123") {
  console.log("Login success");
} else {
  console.log("Login failed");
}



/* ============================================================
   5. SUMMARY
   ============================================================

   ARITHMETIC:
     +, -, *, /, %, **, ++, --

   COMPARISON:
     >, <, >=, <=, ==, ===, !=, !==

   LOGICAL:
     &&, ||, !

   STRICT equality (===) is always recommended.
*/
