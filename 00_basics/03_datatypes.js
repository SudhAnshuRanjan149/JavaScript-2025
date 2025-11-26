/*
  DATA TYPES IN JAVASCRIPT — PRIMITIVE & REFERENCE (DETAILED)
  -----------------------------------------------------------
  JavaScript has TWO categories of data types:
    1. Primitive Types       (stored by VALUE)
    2. Reference Types       (stored by REFERENCE / ADDRESS)

  Understanding the difference is CRITICAL for memory behavior,
  comparison, copying, and performance.
*/



/* ============================================================
   1. PRIMITIVE DATA TYPES (7 TYPES)
   ============================================================
   Primitive types are:
     - Immutable (cannot be changed)
     - Stored directly in the stack (value stored directly)
     - Compared by VALUE    
*/

const primitives = [
  "Number",
  "String",
  "Boolean",
  "Null",
  "Undefined",
  "Symbol",
  "BigInt"
];

console.log(primitives);



/* ============================================================
   PRIMITIVE TYPE EXAMPLES
   ============================================================
*/

let num = 42;            // Number
let str = "Hello";       // String
let bool = true;         // Boolean
let nothing = null;      // Null (intentional empty value)
let notDefined;          // Undefined (default for unassigned variables)
let unique = Symbol();   // Symbol (unique identifiers)
let big = 12345678901234567890n; // BigInt for large integers



/* ============================================================
   PRIMITIVE — IMMUTABILITY
   ============================================================
   You cannot modify a primitive value directly.
*/

let x = "hello";
x[0] = "H";  // DOES NOTHING

console.log(x); // still "hello"



/* ============================================================
   PRIMITIVE — COPIED BY VALUE
   ============================================================
*/

let a = 10;
let b = a; // copy of the value

b = 20;

console.log(a); // 10
console.log(b); // 20

/* a and b are NOT linked */



/* ============================================================
   2. REFERENCE DATA TYPES
   ============================================================
   Reference types are:
     - Mutable
     - Stored in the heap
     - Variables store a REFERENCE (address), NOT the value
     - Compared by REFERENCE (not by content)

   They include:
     - Objects
     - Arrays
     - Functions
     - Dates
     - Maps
     - Sets
     - WeakMap, WeakSet
*/

const referenceTypes = [
  "Object",
  "Array",
  "Function",
  "Date",
  "Map",
  "Set",
  "WeakMap",
  "WeakSet"
];

console.log(referenceTypes);



/* ============================================================
   REFERENCE EXAMPLES
   ============================================================
*/

let obj = { name: "John" };
let arr = [1, 2, 3];
function greet() { console.log("Hello"); }

console.log(obj, arr, greet);



/* ============================================================
   REFERENCE — MUTABLE DATA
   ============================================================
*/

let user = { name: "Alice" };
user.name = "Bob";   // allowed

console.log(user);   // { name: "Bob" }



/* ============================================================
   REFERENCE — COPIED BY REFERENCE, NOT VALUE
   ============================================================
*/

let p = { age: 25 };
let q = p; // Both point to the SAME object in memory

q.age = 30;

console.log(p.age); // 30
console.log(q.age); // 30

/* p and q share the same memory address */



/* ============================================================
   3. IMPORTANT DIFFERENCES (PRIMITIVE vs REFERENCE)
   ============================================================

   PRIMITIVE:
     - stored on stack
     - copying → creates NEW value
     - direct comparison of value
     - immutable

   REFERENCE:
     - stored on heap
     - copying → copies ADDRESS, not value
     - comparison checks memory address
     - mutable
*/



/* ============================================================
   4. HOW COMPARISON WORKS
   ============================================================

   PRIMITIVES:
*/

console.log(10 === 10);         // true
console.log("hi" === "hi");     // true

/* same value = equal */



/* REFERENCE TYPES:
*/

let obj1 = { a: 1 };
let obj2 = { a: 1 };

console.log(obj1 === obj2); 
/* false → because they are DIFFERENT memory locations */



/* ============================================================
   5. PASSING TO FUNCTIONS
   ============================================================

   Primitives → passed by value
   Reference → passed by reference
*/

function modifyPrimitive(v) {
  v = 999;
}

let n = 100;
modifyPrimitive(n);
console.log(n); // 100 (unchanged)



function modifyReference(o) {
  o.value = 999;
}

let ref = { value: 50 };
modifyReference(ref);
console.log(ref.value); // 999 (changed)



/* ============================================================
   6. SUMMARY TABLE
   ============================================================

   | Feature            | Primitive           | Reference                   |
   |--------------------|----------------------|------------------------------|
   | Location           | Stack               | Heap                         |
   | Stored as          | Value               | Memory address / pointer     |
   | Copy behavior      | Copy value          | Copy reference               |
   | Mutability         | Immutable           | Mutable                      |
   | Comparison         | By value            | By reference (address)       |

*/



/* ============================================================
   7. QUICK ANALOGY
   ============================================================

   Primitive:
     - Like photocopying a document → each copy is independent.

   Reference:
     - Like sharing a Google Doc link → multiple people edit the SAME file.

*/

