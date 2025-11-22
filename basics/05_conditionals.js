/*
  CONDITIONALS IN JAVASCRIPT — if, else if, else, switch (DETAILED)
  -----------------------------------------------------------------
  Conditionals control the flow of a program based on conditions.
  JS provides three main conditional structures:
      1. if
      2. else if / else
      3. switch
*/



/* ============================================================
   1. IF STATEMENT
   ============================================================
   - Executes a block of code only if the condition is TRUE.
*/

let age = 20;

if (age >= 18) {
  console.log("You are an adult");
}

/*
  If condition is false → block is skipped.
*/



/* ============================================================
   2. IF...ELSE
   ============================================================
   - else runs when the IF condition is FALSE.
*/

let temp = 15;

if (temp > 25) {
  console.log("It's hot outside");
} else {
  console.log("It's cool or cold");
}



/* ============================================================
   3. IF...ELSE IF...ELSE
   ============================================================
   - Used when you have multiple conditions to test in sequence.
*/

let score = 85;

if (score >= 90) {
  console.log("Grade A");
} else if (score >= 80) {
  console.log("Grade B");
} else if (score >= 70) {
  console.log("Grade C");
} else {
  console.log("Grade D or below");
}



/* ============================================================
   4. NESTED IF STATEMENTS
   ============================================================
   - Using an if inside another if.
*/

let loggedIn = true;
let isAdmin = false;

if (loggedIn) {
  if (isAdmin) {
    console.log("Welcome Admin");
  } else {
    console.log("Welcome User");
  }
}



/* ============================================================
   5. TRUTHY & FALSY IN IF CONDITIONS
   ============================================================
   JS treats some values as TRUE or FALSE even without booleans.

   FALSY VALUES:
     false, 0, "", null, undefined, NaN

   TRUTHY: everything else
*/

if ("hello") {
  console.log("This is truthy");
}

if (0) {
  console.log("This will NOT run");
}



/* ============================================================
   6. SWITCH STATEMENT
   ============================================================
   - Good for checking the same variable against multiple values.
   - More readable than long else-if chains.
*/

let day = 3;

switch (day) {
  case 1:
    console.log("Monday");
    break;

  case 2:
    console.log("Tuesday");
    break;

  case 3:
    console.log("Wednesday");
    break;

  default:
    console.log("Invalid day");
}

/*
  IMPORTANT:
    - Use break to stop fall-through.
    - default is like else.
*/



/* ============================================================
   7. SWITCH WITH FALL-THROUGH
   ============================================================
   - If break is removed, JS executes the next cases automatically.
*/

let fruit = "apple";

switch (fruit) {
  case "apple":
  case "banana":
    console.log("This is a fruit we have");
    break;

  default:
    console.log("Fruit not found");
}



/* ============================================================
   8. SWITCH VS IF — WHEN TO USE WHAT
   ============================================================

   Use IF when:
     - checking ranges (score > 90)
     - complex conditions (a > b && c < d)
     - comparing different variables

   Use SWITCH when:
     - comparing ONE variable to many possible values
     - cleaner alternative to multiple else-if

*/



/* ============================================================
   9. TERNARY OPERATOR (Short if-else)
   ============================================================
   - Not a separate conditional type, but often used for short decisions.
*/

let isLogged = true;

let msg = isLogged ? "Welcome!" : "Please log in.";
console.log(msg);

/*
  Format:
    condition ? value_if_true : value_if_false
*/



/* ============================================================
   10. SUMMARY
   ============================================================

   if condition:
       runs only if true

   else:
       runs if previous if/else-if was false

   else if:
       chain multiple conditions

   switch:
       clean way to compare a value against many options

   ternary:
       short form of if-else
*/
