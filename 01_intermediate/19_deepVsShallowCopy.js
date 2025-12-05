/****************************************************************************************
 * DEEP COPY vs SHALLOW COPY IN JAVASCRIPT
 * Covers:
 * ✅ Objects
 * ✅ Arrays
 * ✅ Nested Structures
 * ✅ Functions
 * ✅ Dates, Maps, Sets
 * ✅ Primitives (special case)
 ****************************************************************************************/


/*========================================================================================
 1. WHAT IS A COPY IN JAVASCRIPT?
========================================================================================*/
//
// A COPY means creating a new variable that refers to the same or different memory.
//
// There are TWO types of copy in JS:
// ---------------------------------
// ✅ Shallow Copy  → Copies ONLY the first level
// ✅ Deep Copy     → Copies ALL nested levels recursively
//
// IMPORTANT:
// ----------
// • Primitive types → ALWAYS copied by VALUE
// • Non-primitive types → Copied by REFERENCE unless explicitly cloned
//


/*========================================================================================
 2. PRIMITIVE DATA TYPES (ALWAYS DEEP COPY BY VALUE)
========================================================================================*/
//
// Primitive types:
// ----------------
// • Number
// • String
// • Boolean
// • Undefined
// • Null
// • Symbol
// • BigInt
//
// These are stored directly in stack memory.
//

let a = 10;
let b = a;   // deep copy by value

b = 20;

console.log(a); // 10 ✅ unaffected
console.log(b); // 20

// ✅ No concept of shallow vs deep for primitives
// ✅ Always deep copied


/*========================================================================================
 3. NON-PRIMITIVE TYPES (REFERENCE BASED)
========================================================================================*/
//
// Non-Primitive:
// --------------
// • Object
// • Array
// • Function
// • Date
// • Map
// • Set
//
// These are stored in heap memory and assigned by reference.
//

let obj1 = { x: 10 };
let obj2 = obj1;   // ❌ NOT a copy — same reference

obj2.x = 999;

console.log(obj1.x); // 999 ❌ affected
console.log(obj2.x); // 999


/*========================================================================================
 4. SHALLOW COPY — DEFINITION
========================================================================================*/
//
// SHALLOW COPY:
// -------------
// • Copies ONLY the top-level properties
// • Nested objects/arrays still share the SAME reference
//
// If you modify nested data → original object is affected ❌
//

/*------------------------------
 SHALLOW COPY METHODS
-------------------------------*/
//
// ✅ Object.assign()
// ✅ Spread operator {...}
// ✅ Array slice()
// ✅ Array concat()
// ✅ Array.from()
//


/*========================================================================================
 5. SHALLOW COPY WITH OBJECTS
========================================================================================*/

const originalObj = {
  name: "Rahul",
  address: {
    city: "Delhi"
  }
};

// SHALLOW COPY USING SPREAD
const shallowCopy = { ...originalObj };

// Modify top-level value
shallowCopy.name = "Aman";

// Modify nested value
shallowCopy.address.city = "Mumbai";

console.log(originalObj.name);         // "Rahul" ✅ top-level safe
console.log(originalObj.address.city); // "Mumbai" ❌ nested changed


/*========================================================================================
 6. SHALLOW COPY WITH ARRAYS
========================================================================================*/

const arr1 = [1, 2, [3, 4]];
const arr2 = [...arr1];   // shallow copy

arr2[0] = 100;            // top-level change → safe
arr2[2][0] = 999;         // nested change → affects original ❌

console.log(arr1); // [1, 2, [999, 4]]
console.log(arr2); // [100, 2, [999, 4]]


/*========================================================================================
 7. DEEP COPY — DEFINITION
========================================================================================*/
//
// DEEP COPY:
// ----------
// • Copies ALL levels of data recursively
// • No shared references
// • Completely independent object
//
// If you modify deep copy → original is NEVER affected ✅
//


/*========================================================================================
 8. DEEP COPY USING JSON METHODS (LIMITED BUT COMMON)
========================================================================================*/
//
// ✅ Easiest deep copy method:
// ----------------------------
// JSON.parse(JSON.stringify(obj))
//
// ❌ LIMITATIONS:
// ----------------
// • Loses functions
// • Loses undefined
// • Breaks Date
// • Breaks Map, Set
// • Breaks circular references
//

const deepOriginal = {
  name: "Rahul",
  address: {
    city: "Delhi"
  }
};

const deepCopy = JSON.parse(JSON.stringify(deepOriginal));

deepCopy.address.city = "Mumbai";

console.log(deepOriginal.address.city); // "Delhi" ✅ NOT affected
console.log(deepCopy.address.city);     // "Mumbai"


/*========================================================================================
 9. CUSTOM DEEP COPY USING RECURSION (INTERVIEW LEVEL)
========================================================================================*/

function deepClone(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj; // base case for primitives
  }

  // Handle arrays
  if (Array.isArray(obj)) {
    let copy = [];
    for (let item of obj) {
      copy.push(deepClone(item));
    }
    return copy;
  }

  // Handle objects
  let copy = {};
  for (let key in obj) {
    copy[key] = deepClone(obj[key]);
  }
  return copy;
}

const originalDeep = { a: 1, b: { c: 2 } };
const clonedDeep = deepClone(originalDeep);

clonedDeep.b.c = 999;

console.log(originalDeep.b.c); // 2 ✅ safe
console.log(clonedDeep.b.c);   // 999


/*========================================================================================
 10. DEEP COPY USING STRUCTUREDCLONE (MODERN & BEST)
========================================================================================*/
//
// ✅ structuredClone() is a built-in deep clone method
// ✅ Supports:
//    • Object
//    • Array
//    • Date
//    • Map
//    • Set
//    • Typed Arrays
//    • Circular references ✅
//
// ❌ Does NOT clone:
//    • Functions
//    • DOM nodes
//

const objA = {
  name: "JS",
  date: new Date(),
  map: new Map([["a", 1]])
};

const objB = structuredClone(objA);

objB.map.set("a", 999);

console.log(objA.map.get("a")); // 1 ✅ original intact
console.log(objB.map.get("a")); // 999


/*========================================================================================
 11. FUNCTIONS & COPY BEHAVIOR
========================================================================================*/
//
// Functions are OBJECTS in JS.
// They are always copied by REFERENCE.
//

function greet() {
  console.log("Hello");
}

const g1 = greet;
const g2 = g1;

console.log(g1 === g2); // true ✅ same reference

// ❌ You cannot deep copy a function


/*========================================================================================
 12. DATE COPY
========================================================================================*/
//
// SHALLOW:
const d1 = new Date();
const d2 = d1;        // ❌ same reference

// DEEP:
const d3 = new Date(d1.getTime()); // ✅ deep copy


/*========================================================================================
 13. MAP & SET COPY
========================================================================================*/
//
// SHALLOW:
const map1 = new Map([["a", { x: 10 }]]);
const map2 = new Map(map1);

map2.get("a").x = 999; // affects original ❌

// DEEP:
const map3 = structuredClone(map1); // ✅ safest


/*========================================================================================
 14. SHALLOW vs DEEP — FULL COMPARISON TABLE
========================================================================================*/
//
// FEATURE                     SHALLOW COPY        DEEP COPY
// ------------------------------------------------------------------
// Copies top-level only        ✅ Yes              ✅ Yes
// Copies nested objects        ❌ No               ✅ Yes
// Shared references            ✅ Yes              ❌ No
// Fast                         ✅ Very             ❌ Slower
// Memory usage                 ✅ Low              ❌ Higher
// Safe for nested mutation     ❌ No               ✅ Yes
// JSON method works            ✅ Yes              ✅ Yes (with limits)
// structuredClone works        ✅ Yes              ✅ Yes (best)


/*========================================================================================
 15. WHEN TO USE SHALLOW vs DEEP COPY
========================================================================================*/
//
// USE SHALLOW COPY WHEN:
// ----------------------
// ✅ State update in React (no deep nesting)
// ✅ Top-level object updates only
// ✅ Performance is critical
//
// USE DEEP COPY WHEN:
// -------------------
// ✅ Nested object modification required
// ✅ Immutable data handling
// ✅ Prevent side-effects in apps
// ✅ State management, undo-redo systems
// ✅ Data isolation is required
//


/*========================================================================================
 16. MOST COMMON INTERVIEW TRAPS
========================================================================================*/
//
// ❗ Spread operator DOES NOT deep copy nested objects
// ❗ JSON stringify breaks Date, Map, Set, Functions
// ❗ Object.assign also creates only shallow copy
// ❗ structuredClone is currently the BEST deep copy tool
// ❗ Primitives do NOT need deep copy
//


/*========================================================================================
 17. FINAL SUMMARY (ONE-PAGE REVISION)
========================================================================================*/
//
// ✅ Primitive → always copied by value (deep)
// ✅ Object/Array → copied by reference by default
// ✅ Shallow copy → top-level only
// ✅ Deep copy → recursive cloning
// ✅ JSON.parse(JSON.stringify()) → deep copy with data loss
// ✅ structuredClone() → best modern deep copy
// ✅ Functions cannot be deep copied
// ✅ Date/Map/Set need special handling
//
// If you understand this topic well ✅
// → You will never mess up React state updates or backend data flow again.

