/****************************************************************************************
 * JAVASCRIPT COLLECTIONS — COMPLETE & DETAILED GUIDE
 * Covers:
 * ✅ Map
 * ✅ Set
 * ✅ WeakMap
 * ✅ WeakSet
 * ✅ Comparison with Objects & Arrays
 * ✅ Memory behavior
 * ✅ Use cases
 * ✅ Interview traps
 ****************************************************************************************/


/*========================================================================================
 1. WHAT ARE COLLECTIONS IN JAVASCRIPT?
========================================================================================*/
//
// Collections are special data structures designed to store and manage groups of values
// efficiently.
//
// JS COLLECTION TYPES:
// ---------------------
// ✅ Map      → Key-value pairs (ANY type as key)
// ✅ Set      → Unique values only
// ✅ WeakMap  → Weakly held object keys (no memory leaks)
// ✅ WeakSet  → Weakly held object values
//
// These were introduced in ES6 to fix the limitations of Objects & Arrays.
//

/*========================================================================================
 2. WHY NOT JUST USE OBJECTS & ARRAYS?
========================================================================================*/
//
// OBJECT LIMITATIONS:
// -------------------
// ❌ Keys can ONLY be strings or symbols
// ❌ Insertion order is not reliable in older JS
// ❌ No direct size property
// ❌ Not optimized for frequent add/delete
// ❌ Prototype pollution risk
//
// ARRAY LIMITATIONS:
// ------------------
// ❌ Slow lookup (O(n))
// ❌ Allows duplicates
// ❌ Index-based only
//
// MAP & SET SOLVE THESE PROBLEMS ✅
//


/*========================================================================================
 3. MAP — KEY-VALUE COLLECTION
========================================================================================*/
//
// A Map stores key-value pairs where:
// ✅ Keys can be ANY data type: object, array, function, number, string
// ✅ Maintains insertion order
// ✅ Fast lookup
// ✅ Safe from prototype pollution
//

const map = new Map();

/*------------------------------
 MAP CRUD OPERATIONS
-------------------------------*/

// CREATE → set()
map.set("name", "Rahul");
map.set(1, "one");
map.set(true, "boolean");
map.set({ x: 1 }, "object-key");

// READ → get()
console.log(map.get("name"));   // Rahul

// UPDATE → set() again
map.set("name", "Aman");

// DELETE → delete()
map.delete(1);

// CHECK → has()
console.log(map.has("name")); // true

// SIZE
console.log(map.size);


/*========================================================================================
 4. MAP ITERATION
========================================================================================*/

// Iterate over entries
for (let [key, value] of map) {
  console.log(key, value);
}

// Keys only
for (let key of map.keys()) {}

// Values only
for (let val of map.values()) {}

// forEach
map.forEach((value, key) => {});


/*========================================================================================
 5. MAP VS OBJECT (CRITICAL INTERVIEW COMPARISON)
========================================================================================*/
//
// FEATURE                MAP                        OBJECT
// ---------------------------------------------------------------
// Key types              Any type                   Only string/symbol
// Order preserved        ✅ Yes                     ❌ Not guaranteed old JS
// Size                   ✅ map.size               ❌ Manual count
// Performance            ✅ Optimized               ❌ Slower delete
// JSON support           ❌ No                      ✅ Yes
// Prototype safe         ✅ Yes                     ❌ Prototype pollution


/*========================================================================================
 6. SET — UNIQUE VALUE COLLECTION
========================================================================================*/
//
// A Set stores ONLY UNIQUE values.
// ❌ No duplicates allowed
// ✅ Values can be any data type
// ✅ Fast lookup
// ✅ Preserves insertion order
//

const set = new Set();

/*------------------------------
 SET CRUD OPERATIONS
-------------------------------*/

// CREATE → add()
set.add(10);
set.add(20);
set.add(10); // duplicate ignored ✅

// READ → has()
console.log(set.has(10)); // true

// DELETE → delete()
set.delete(20);

// SIZE
console.log(set.size);

// CLEAR
set.clear();


/*========================================================================================
 7. SET ITERATION
========================================================================================*/

for (let value of set) {}

set.forEach((value) => {});


/*========================================================================================
 8. SET USE CASES
========================================================================================*/
//
// ✅ Remove duplicates from an array
// ✅ Fast lookup table
// ✅ Unique ID tracking
// ✅ Visited node tracking in Graphs
//

const nums = [1, 2, 2, 3, 4, 4];
const unique = [...new Set(nums)]; // [1,2,3,4]


/*========================================================================================
 9. WEAKMAP — WEAKLY HELD KEY-VALUE PAIRS
========================================================================================*/
//
// A WeakMap is similar to Map BUT:
// -------------------------------
// ✅ Keys MUST be objects only
// ✅ Keys are weakly referenced
// ✅ Garbage-collected automatically
// ❌ Not iterable
// ❌ No size property
//
// Used for:
// ---------
// ✅ Private data storage
// ✅ Caching
// ✅ Preventing memory leaks
//

const wm = new WeakMap();

let user = { name: "Rahul" };

wm.set(user, "private-data");
console.log(wm.get(user)); // private-data

user = null; // ✅ now garbage collected automatically


/*========================================================================================
 10. WEAKMAP LIMITATIONS (VERY IMPORTANT)
========================================================================================*/
//
// ❌ Only object keys allowed
// ❌ No forEach()
// ❌ No iteration
// ❌ No .size
// ❌ No clear()
//
// ✅ This is intentional for memory safety
//


/*========================================================================================
 11. WEAKSET — WEAKLY HELD UNIQUE OBJECTS
========================================================================================*/
//
// A WeakSet only stores OBJECTS and holds them weakly.
// -----------------------------
// ✅ Auto garbage collection
// ❌ No size
// ❌ No iteration
// ❌ Only objects allowed
//

const ws = new WeakSet();

let obj = { x: 10 };
ws.add(obj);

console.log(ws.has(obj)); // true

obj = null; // ✅ garbage collected automatically


/*========================================================================================
 12. WEAKMAP vs WEAKSET
========================================================================================*/
//
// WEAKMAP                          WEAKSET
// ----------------------------------------------------------
// Stores key-value pairs          Stores unique objects only
// Keys must be objects           Values must be objects
// Used for private data          Used for object tracking
// Not iterable                   Not iterable


/*========================================================================================
 13. MAP vs SET vs WEAKMAP vs WEAKSET (MASTER TABLE)
========================================================================================*/
//
// FEATURE        MAP        SET        WEAKMAP        WEAKSET
// ----------------------------------------------------------------
// Stores pairs   ✅ Yes     ❌ No      ✅ Yes         ❌ No
// Stores values  ✅ Yes     ✅ Yes     ✅ Yes         ✅ Yes
// Unique values  ❌ No      ✅ Yes     ❌ No          ✅ Yes
// Object keys    ✅ Yes     ✅ Yes     ✅ Yes         ✅ Yes
// Primitive key  ✅ Yes     ✅ Yes     ❌ No          ❌ No
// Iterable       ✅ Yes     ✅ Yes     ❌ No          ❌ No
// size property  ✅ Yes     ✅ Yes     ❌ No          ❌ No
// Garbage safe   ❌ No      ❌ No      ✅ Yes         ✅ Yes


/*========================================================================================
 14. COMMON INTERVIEW USE CASES
========================================================================================*/
//
// MAP:
// ✅ Caching API responses
// ✅ Grouping data
// ✅ Frequency counting
// ✅ Graph adjacency list
//
// SET:
// ✅ Duplicate removal
// ✅ Visited node tracking
// ✅ Unique constraint enforcement
//
// WEAKMAP:
// ✅ Storing private object data
// ✅ Metadata storage
// ✅ Avoiding memory leaks
//
// WEAKSET:
// ✅ Tracking DOM elements
// ✅ Tracking active objects
// ✅ Avoid memory leaks
//


/*========================================================================================
 15. COLLECTIONS & GARBAGE COLLECTION (VERY IMPORTANT)
========================================================================================*/
//
// Map & Set → STRONG REFERENCES
// WeakMap & WeakSet → WEAK REFERENCES
//
// Strong reference → Object stays in memory
// Weak reference   → Object can be garbage collected
//
// Example:
//
let a = { x: 1 };
const map2 = new Map();
const wm2 = new WeakMap();

map2.set(a, "data");
wm2.set(a, "data");

a = null;

// map2 STILL holds reference ❌ memory leak possible
// wm2 loses reference ✅ garbage collected


/*========================================================================================
 16. COMMON INTERVIEW TRAPS
========================================================================================*/
//
// ❌ WeakMap is NOT iterable
// ❌ WeakSet does NOT store primitives
// ❌ Map keys are compared by reference, not value
// ❌ Set treats NaN as unique value but allows only one
//

const s = new Set();
s.add(NaN);
s.add(NaN); // Only one NaN stored ✅


/*========================================================================================
 17. FINAL SUMMARY (ONE-PAGE REVISION)
========================================================================================*/
//
// ✅ MAP → Key-value storage with ANY key type
// ✅ SET → Unique value storage
// ✅ WEAKMAP → Memory-safe object-key storage
// ✅ WEAKSET → Memory-safe object tracking
// ✅ Use Map instead of Object for large dynamic datasets
// ✅ Use Set for duplicates removal & tracking
// ✅ Use WeakMap/WeakSet for private memory-safe metadata
//
// If you master this ✅
// → You will outperform most JS developers in interviews.

