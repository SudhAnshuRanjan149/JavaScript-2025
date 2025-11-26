/*
  DEFAULT PARAMETERS IN JAVASCRIPT — DETAILED EXPLANATION
  --------------------------------------------------------
  ✔ Default Parameters allow functions to assign DEFAULT VALUES
    to parameters when arguments are missing or undefined.

  ✔ Introduced in ES6 (2015)

  ✔ Syntax:
        function fn(a = defaultValue) { ... }

  ✔ Works ONLY when:
        - the argument is missing
        - OR the argument is explicitly undefined
*/



/* ============================================================
   1. BASIC DEFAULT PARAMETER
   ============================================================ */

function greet(name = "Guest") {
  console.log(`Hello, ${name}!`);
}

greet("Alice"); // Hello, Alice!
greet();        // Hello, Guest!



/* ============================================================
   2. DEFAULT PARAMETER ONLY IF ARGUMENT IS UNDEFINED
   ============================================================ */

function show(x = 100) {
  console.log(x);
}

show(undefined); // 100 (default used)
show(null);      // null (default NOT used)
show("");        // "" (default NOT used)
show(0);         // 0 (default NOT used)



/* ============================================================
   3. DEFAULT VALUES CAN BE EXPRESSIONS
   ============================================================ */

function calc(a, b = a * 2) {
  console.log(a, b);
}

calc(5);      // 5 10
calc(5, 20);  // 5 20



/* ============================================================
   4. DEFAULT VALUES CAN CALL FUNCTIONS
   ============================================================ */

function randomValue() {
  return Math.floor(Math.random() * 100);
}

function generate(val = randomValue()) {
  console.log("Generated:", val);
}

generate();     // random number
generate(50);   // 50



/* ============================================================
   5. DEFAULT PARAMETERS + DESTRUCTURING
   ============================================================ */

function printUser({ name = "Unknown", age = 0 } = {}) {
  /*
    {name,age} = {} → prevents error if argument is missing
  */
  console.log(name, age);
}

printUser({ name: "John", age: 30 }); // John 30
printUser({ name: "Sam" });           // Sam 0
printUser();                          // Unknown 0



/* ============================================================
   6. DEFAULT PARAMETERS WITH ARRAYS (DESTRUCTURING)
   ============================================================ */

function showCoords([x = 0, y = 0] = []) {
  console.log(`X: ${x}, Y: ${y}`);
}

showCoords([10, 20]); // X: 10, Y: 20
showCoords([10]);     // X: 10, Y: 0
showCoords();         // X: 0, Y: 0



/* ============================================================
   7. ORDER MATTERS FOR DEFAULT PARAMETERS
   ============================================================ */

function test(a, b = 10, c = b + 5) {
  console.log(a, b, c);
}

test(1);        // 1, 10, 15
test(1, 20);    // 1, 20, 25



/* ============================================================
   8. DEFAULT PARAMETER DEPENDING ON PREVIOUS PARAMETER
   ============================================================ */

function multiply(a = 2, b = a * 5) {
  console.log(a * b);
}

multiply();         // 2 * 10 = 20
multiply(3);        // 3 * 15 = 45
multiply(3, 4);     // 3 * 4 = 12



/* ============================================================
   9. PARAMETERS WITHOUT DEFAULTS MUST COME FIRST (BEST PRACTICE)
   ============================================================ */

function bad(a = 1, b) {
  console.log(a, b);
}

bad();   // a = 1, b = undefined
/*
  JS allows this, but it's confusing.
  Better:
      function good(a, b = 1) { ... }
*/



/* ============================================================
   10. DEFAULT PARAMETERS + REST PARAMETERS
   ============================================================ */

function log(level = "INFO", ...messages) {
  console.log(`[${level}]`, messages.join(" "));
}

log("ERROR", "Something", "went", "wrong");
// [ERROR] Something went wrong

log(undefined, "System", "OK");
// [INFO] System OK



/* ============================================================
   11. DEFAULT PARAMETERS ARE LOCAL TO THE FUNCTION SCOPE
   ============================================================ */

let value = 50;

function showValue(x = value) {
  let value = 100;
  console.log(x);
}

showValue(); // 50
/*
  Because default parameter uses OUTER value (50),
  not inner shadowed value (100).
*/



/* ============================================================
   12. SUMMARY
   ============================================================ */
/*
  ✔ Default parameters assign fallback values to function arguments.

  Trigger default when:
      - argument is missing
      - argument is undefined

  Can use:
      ✔ primitive values
      ✔ variables
      ✔ expressions
      ✔ function calls
      ✔ destructuring + defaults

  Useful for:
      - cleaner APIs
      - avoiding undefined checks
      - preventing errors with missing arguments

  MENTAL MODEL:
    → Default parameters act like safety nets for functions.
*/
