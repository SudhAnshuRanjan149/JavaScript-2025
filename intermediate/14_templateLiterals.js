/*
  TEMPLATE LITERALS IN JAVASCRIPT — DETAILED EXPLANATION
  -------------------------------------------------------
  ✔ Introduced in ES6
  ✔ Created using backticks:  ` ... `
  ✔ More powerful than normal strings
      - Multi-line strings
      - String interpolation
      - Embedded expressions
      - Tagged templates
*/



/* ============================================================
   1. BASIC SYNTAX OF TEMPLATE LITERALS
   ============================================================ */

const name = "Alice";

const greeting = `Hello, ${name}!`;
/*
  ${ ... } → placeholder for variables or expressions
*/

console.log(greeting);



/* ============================================================
   2. MULTI-LINE STRINGS (NO \n REQUIRED)
   ============================================================ */

const message = `
This is a multi-line text.
No need for \n or string concatenation.
`;

console.log(message);



/* ============================================================
   3. STRING INTERPOLATION WITH EXPRESSIONS
   ============================================================ */

const a = 10;
const b = 20;

const result = `Sum of ${a} + ${b} = ${a + b}`;

console.log(result);



/* ============================================================
   4. EMBEDDING FUNCTION CALLS INSIDE TEMPLATE LITERALS
   ============================================================ */

function toUpper(str) {
  return str.toUpperCase();
}

const output = `Uppercase: ${toUpper("hello")}`;

console.log(output);



/* ============================================================
   5. NESTED TEMPLATE LITERALS
   ============================================================ */

const user = { name: "John", age: 30 };

const details = `
User Details:
  Name: ${user.name}
  Age: ${user.age}
`;

console.log(details);



/* ============================================================
   6. TEMPLATE LITERALS IN OBJECT PROPERTIES
   ============================================================ */

const product = "Laptop";

const obj = {
  [`price_of_${product}`]: 50000   // dynamic property name
};

console.log(obj);



/* ============================================================
   7. TEMPLATE LITERALS + HTML TEMPLATES (Frontend Use Case)
   ============================================================ */

// Example usage in DOM:
const title = "JavaScript Template Literals";
const html = `
  <div class="card">
    <h2>${title}</h2>
    <p>This is generated using template literals.</p>
  </div>
`;

console.log(html);



/* ============================================================
   8. TAGGED TEMPLATE LITERALS — ADVANCED FEATURE
   ============================================================ */
/*
  A tag is a function that processes a template literal.
  It receives:
     - the string parts
     - the interpolated expressions
*/

function tag(strings, ...values) {
  console.log("Strings:", strings);
  console.log("Values:", values);
}

const country = "India";
const lang = "JS";

tag`I live in ${country} and code in ${lang}.`;

/*
  Output:
    Strings: ["I live in ", " and code in ", "."]
    Values:  ["India", "JS"]

  Use cases:
    ✔ sanitizing inputs (XSS protection)
    ✔ creating custom template engines
    ✔ formatting values
*/



/* ============================================================
   9. TEMPLATE LITERALS WITH CONDITIONALS
   ============================================================ */

const isLoggedIn = true;

const msg = `
User Status: ${isLoggedIn ? "Online" : "Offline"}
`;

console.log(msg);



/* ============================================================
   10. TEMPLATE LITERALS WITH LOOPS
   ============================================================ */

const items = ["Apple", "Banana", "Mango"];

const list = `
<ul>
  ${items.map(item => `<li>${item}</li>`).join("")}
</ul>
`;

console.log(list);



/* ============================================================
   11. TEMPLATE LITERALS IN FUNCTIONS (BUILD DYNAMIC TEXT)
   ============================================================ */

function greetUser(name, time) {
  return `Hey ${name}, Good ${time}!`;
}

console.log(greetUser("Sam", "Morning"));



/* ============================================================
   12. SUMMARY
   ============================================================ */
/*
  Template Literals provide:
    ✔ Multi-line strings
    ✔ Variable interpolation with ${}
    ✔ Embedded expressions (math/functions)
    ✔ Dynamic property names
    ✔ HTML templating
    ✔ Tagged templates for advanced processing

  MENTAL MODEL:
    → Template literals are "smart strings"
      that allow JS variables to live INSIDE the string naturally.
*/
