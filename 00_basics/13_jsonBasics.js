/*
  JSON BASICS IN JAVASCRIPT — DETAILED EXPLANATION
  ------------------------------------------------
  JSON = JavaScript Object Notation
  → A lightweight data format used for data exchange between systems.
  → Used heavily in APIs, databases, and configuration files.

  JSON looks like JavaScript objects, BUT:
      - keys MUST be in double quotes
      - values can be: string, number, boolean, null, array, object
      - NO functions allowed
      - NO comments allowed
*/



/* ============================================================
   1. BASIC JSON STRUCTURE
   ============================================================
*/

const jsonExample = `
{
  "name": "Alice",
  "age": 25,
  "isStudent": false,
  "skills": ["JS", "HTML", "CSS"],
  "address": {
    "city": "New York",
    "zip": 10001
  }
}
`;

console.log(jsonExample);



/* ============================================================
   2. JSON vs JAVASCRIPT OBJECT
   ============================================================

   JSON:
       {
         "name": "John"
       }

   JS Object:
       {
         name: "John"
       }

   Difference:
     - JSON → only double quotes allowed
     - JS Object → quotes optional for keys
*/



/* ============================================================
   3. PARSING JSON (JSON → JS Object)
   ============================================================
   Use: JSON.parse()
   Typically used when receiving data from APIs or files.
*/

const jsonString = `{"product": "Laptop", "price": 1200}`;

const jsObject = JSON.parse(jsonString);
console.log(jsObject.product);  // "Laptop"
console.log(jsObject.price);    // 1200



/* ============================================================
   4. STRINGIFY JSON (JS Object → JSON)
   ============================================================
   Use: JSON.stringify()
   Used when sending data to servers, storing in localStorage, etc.
*/

const productObj = {
  name: "Phone",
  price: 999,
  warranty: true,
  colors: ["black", "white"]
};

const jsonOutput = JSON.stringify(productObj);
console.log(jsonOutput);
/*
  Output:
    {"name":"Phone","price":999,"warranty":true,"colors":["black","white"]}
*/



/* ============================================================
   5. PRETTY PRINT JSON (stringify WITH spacing)
   ============================================================
*/

const prettyJson = JSON.stringify(productObj, null, 2);
console.log(prettyJson);

/*
  Pretty JSON:
  {
    "name": "Phone",
    "price": 999,
    "warranty": true,
    "colors": [
      "black",
      "white"
    ]
  }
*/



/* ============================================================
   6. JSON VALUE TYPES
   ============================================================
   JSON supports:

   ✔ string
   ✔ number
   ✔ boolean
   ✔ null
   ✔ array
   ✔ object

   NOT ALLOWED:

   ✖ functions
   ✖ undefined
   ✖ Date objects (converted to string)
   ✖ comments
*/

const invalidJson = `
{
  "name": "John",
  /* JSON does not allow comments */
  "age": undefined,       // ❌ invalid
  "sayHi": function() {}  // ❌ invalid
}
`;



/* ============================================================
   7. JSON WITH ARRAYS
   ============================================================
*/

const jsonArray = `
[
  { "id": 1, "title": "Post 1" },
  { "id": 2, "title": "Post 2" },
  { "id": 3, "title": "Post 3" }
]
`;

const posts = JSON.parse(jsonArray);

posts.forEach(post => {
  console.log(post.id, "-", post.title);
});



/* ============================================================
   8. JSON IN APIs (MOST COMMON USE)
   ============================================================
   The fetch() API returns JSON from servers.
*/

// Example API call (runs only in browser environment)
async function loadUser() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const user = await res.json(); // parse JSON automatically
  console.log(user);
}

// loadUser();



/* ============================================================
   9. JSON IN LOCALSTORAGE
   ============================================================
   localStorage stores ONLY strings → so use JSON.stringify
*/

// Save object
localStorage.setItem("user", JSON.stringify({ name: "Alex", age: 30 }));

// Retrieve object
const userData = JSON.parse(localStorage.getItem("user"));
console.log(userData);



/* ============================================================
   10. SUMMARY
   ============================================================

   JSON.parse()     → Convert JSON string → JS object
   JSON.stringify() → Convert JS object → JSON string

   JSON RULES:
     - Keys must be in double quotes
     - Only allowed value types: string, number, boolean, null, array, object
     - No functions, undefined, or comments

   JSON is used in:
     - APIs
     - Databases (MongoDB)
     - Config files (.json)
     - Data exchange between frontend & backend
*/
