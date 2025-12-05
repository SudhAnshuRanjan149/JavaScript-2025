/****************************************************************************************
 * MEMORY MANAGEMENT & GARBAGE COLLECTION IN JAVASCRIPT — COMPLETE & DETAILED GUIDE
 *
 * Covers:
 * ✅ Stack vs Heap Memory
 * ✅ Primitive vs Reference Types
 * ✅ How JS Allocates Memory
 * ✅ Reachability Concept
 * ✅ Garbage Collection Algorithms
 * ✅ Mark & Sweep
 * ✅ Reference Counting (historical)
 * ✅ Memory Leaks
 * ✅ Closures & Memory
 * ✅ Event Loop & Memory
 * ✅ WeakMap, WeakSet & GC
 * ✅ Interview Traps
 ****************************************************************************************/


/*========================================================================================
 1. WHAT IS MEMORY MANAGEMENT?
========================================================================================*/
//
// MEMORY MANAGEMENT =
// -------------------
// The process of:
// ✅ Allocating memory when needed
// ✅ Using memory while program runs
// ✅ Freeing memory when no longer needed
//
// JavaScript does this AUTOMATICALLY using:
// ---------------------------------------
// ✅ Garbage Collection (GC)
//
// Unlike C/C++:
// -------------
// ❌ No manual malloc/free
// ❌ No manual delete
// ✅ JS Dev does NOT directly control memory
//

/*========================================================================================
 2. MEMORY AREAS IN JAVASCRIPT
========================================================================================*/
//
// JavaScript primarily uses TWO memory regions:
//
// 1️⃣ STACK MEMORY
// 2️⃣ HEAP MEMORY
//

/*----------------------------------------------------------------------------------------
 STACK MEMORY
----------------------------------------------------------------------------------------*/
//
// ✅ Stores primitive values
// ✅ Stores function call frames
// ✅ Fast access
// ✅ Automatically cleaned when function ends
//
// Stores:
// -------
// • Number
// • String
// • Boolean
// • Undefined
// • Null
// • Symbol
// • BigInt
//

let a = 10;
let b = a; // copied by VALUE (stack)
b = 20;

console.log(a); // 10 ✅ unaffected


/*----------------------------------------------------------------------------------------
 HEAP MEMORY
----------------------------------------------------------------------------------------*/
//
// ✅ Stores objects, arrays, functions
// ✅ Large memory pool
// ✅ Slower than stack
// ✅ Managed by Garbage Collector
//
// Stored by REFERENCE
//

let obj1 = { x: 10 };
let obj2 = obj1; // both point to SAME heap object

obj2.x = 999;

console.log(obj1.x); // 999 ❌ affected


/*========================================================================================
 3. HOW MEMORY IS ALLOCATED IN JS
========================================================================================*/
//
// 1) JS sees a value
// 2) Determines if primitive or object
// 3) Allocates:
//    • Primitive → Stack
//    • Object → Heap + reference on stack
//

function demo() {
  let x = 10;            // stack
  let y = { a: 1 };     // heap + stack reference
}


/*========================================================================================
 4. WHAT IS GARBAGE COLLECTION (GC)?
========================================================================================*/
//
// GARBAGE COLLECTION =
// --------------------
// Automatic removal of unused memory
//
// JS removes memory when objects become:
// --------------------------------------
// ✅ UNREACHABLE
// ✅ NOT ACCESSIBLE from program
//
// KEY CONCEPT:
// ------------
// ❗ GC is based on REACHABILITY
// ❗ NOT based on variable scope alone
//

/*========================================================================================
 5. REACHABILITY (MOST IMPORTANT GC CONCEPT)
========================================================================================*/
//
// A value is REACHABLE if ANY of the following can access it:
//
// ✅ Global variable
// ✅ Local variable in active function
// ✅ Function parameters
// ✅ Objects referenced by other reachable objects
// ✅ Closures
//

let globalObj = { a: 1 }; // reachable ✅

function test() {
  let localObj = { b: 2 }; // reachable ✅ while function runs
}


/*========================================================================================
 6. HOW GARBAGE COLLECTION ACTUALLY WORKS (MARK & SWEEP)
========================================================================================*/
//
// MODERN JS ENGINES USE → MARK & SWEEP ALGORITHM
//
// STEPS:
// ------
// 1️⃣ Mark all ROOT objects (globals, call stack)
// 2️⃣ Traverse all reachable objects
// 3️⃣ Mark them as "in use"
// 4️⃣ Sweep (delete) all unmarked objects
//
// ✅ This happens AUTOMATICALLY
//

let objA = { x: 1 };
let objB = objA;

objA = null;   // obj still reachable via objB ✅

objB = null;   // now unreachable ✅ GC will clean it


/*========================================================================================
 7. OPTIONAL: OLD ALGORITHM — REFERENCE COUNTING
========================================================================================*/
//
// OLD METHOD (NOT USED ANYMORE):
// ------------------------------
// Object is deleted when:
// referenceCount === 0
//
// ❌ FAILED on circular references
//

function oldMethod() {
  let a = {};
  let b = {};

  a.ref = b;
  b.ref = a;

  a = null;
  b = null;

  // ❌ Reference count never reaches 0
  // ❌ MEMORY LEAK (old browsers)
}


/*========================================================================================
 8. MEMORY LEAKS — THE BIGGEST REAL-WORLD PROBLEM
========================================================================================*/
//
// MEMORY LEAK = Memory that should be freed but is NOT
//
// COMMON CAUSES:
// --------------
// ✅ Global variables
// ✅ Uncleared timers
// ✅ Detached DOM elements
// ✅ Closures holding references
// ✅ Event listeners not removed
// ✅ Caches that grow forever
//

/*----------------------------------------------------------------------------------------
 8.1 GLOBAL VARIABLES LEAK
----------------------------------------------------------------------------------------*/

function leak() {
  leakedVar = { data: "memory leak" }; // ❌ no var/let/const → global
}

/*----------------------------------------------------------------------------------------
 8.2 TIMERS NOT CLEARED
----------------------------------------------------------------------------------------*/

setInterval(() => {
  console.log("running forever");
}, 1000); // ❌ never cleared → memory leak

// ✅ Proper cleanup:
const id = setInterval(() => {}, 1000);
clearInterval(id);

/*----------------------------------------------------------------------------------------
 8.3 CLOSURE MEMORY LEAK
----------------------------------------------------------------------------------------*/

function heavy() {
  let bigData = new Array(1_000_000).fill("X");

  return function () {
    console.log("Still holding bigData");
  };
}

const fn = heavy(); // ❌ bigData never removed until fn is removed

/*----------------------------------------------------------------------------------------
 8.4 EVENT LISTENER LEAK
----------------------------------------------------------------------------------------*/

const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  console.log("Clicked");
});

// ❌ If btn is removed but listener not removed → leak
// ✅ Use removeEventListener


/*========================================================================================
 9. WEAKMAP & WEAKSET — MEMORY-SAFE COLLECTIONS
========================================================================================*/
//
// WeakMap & WeakSet hold WEAK REFERENCES
// Meaning:
// --------
// ✅ If object is not referenced elsewhere → GC can delete it
//

let user = { name: "Rahul" };
const wm = new WeakMap();

wm.set(user, "private");
user = null; // ✅ automatically garbage collected

// ❌ Map would NOT allow this auto-cleanup


/*========================================================================================
 10. GARBAGE COLLECTION & CLOSURES
========================================================================================*/
//
// Closures KEEP memory alive even after function ends
//

function outer() {
  let secret = "hidden data";

  return function inner() {
    console.log(secret);
  };
}

const f = outer(); // ❌ secret still in memory because f holds it


/*========================================================================================
 11. GARBAGE COLLECTION & EVENT LOOP
========================================================================================*/
//
// Objects referenced in:
// ---------------------
// ✅ Pending promises
// ✅ Task queue
// ✅ Microtask queue
//
// are STILL considered reachable until executed
//

setTimeout(() => {
  console.log("GC waits until this runs");
}, 3000);


/*========================================================================================
 12. MANUAL MEMORY FREEING? (NOT DIRECTLY POSSIBLE)
========================================================================================*/
//
// ❌ There is NO:
//    free()
//    delete memory
//
// ✅ You can ONLY:
//    • Remove references
//    • Let GC do its job
//

let temp = { a: 1 };
temp = null; // ✅ GC cleans when safe


/*========================================================================================
 13. HOW TO WRITE MEMORY-EFFICIENT JS
========================================================================================*/
//
// ✅ Always remove unused references
// ✅ Clear timers & intervals
// ✅ Remove event listeners
// ✅ Avoid unnecessary global variables
// ✅ Use WeakMap for cache/meta-data
// ✅ Be careful with closures
// ✅ Avoid infinite-growing arrays/objects
// ✅ Null out large objects when done
//

let big = new Array(1_000_000).fill(0);
// use it
big = null; // ✅ release memory


/*========================================================================================
 14. MEMORY PERFORMANCE TOOLS
========================================================================================*/
//
// Browser DevTools:
// -----------------
// ✅ Memory tab → snapshot
// ✅ Performance tab → GC tracking
// ✅ Heap snapshots
// ✅ Allocation instrumentation on timeline
//


/*========================================================================================
 15. INTERVIEW-LEVEL QUESTIONS & TRAPS
========================================================================================*/
//
// Q1: Does setting variable to null free memory?
// ✅ Yes, if no other references exist
//
// Q2: Are primitives garbage collected?
// ✅ Yes, but handled on stack
//
// Q3: Do closures cause memory leaks?
// ✅ Not always, only if holding unnecessary refs
//
// Q4: Does GC run immediately on null?
// ❌ No, GC runs when engine decides
//
// Q5: Does WeakMap prevent memory leaks?
// ✅ Yes, for object-key storage
//

/*========================================================================================
 16. STACK vs HEAP — FINAL COMPARISON
========================================================================================*/
//
// FEATURE            STACK                         HEAP
// -------------------------------------------------------------
// Stores             Primitives + function calls Objects, arrays, functions
// Speed              Very fast                     Slower
// Size               Limited                       Large
// GC involved?       ❌ No                         ✅ Yes
// Manual control     ❌ No                         ❌ No


/*========================================================================================
 17. FINAL MASTER SUMMARY (ONE-PAGE REVISION)
========================================================================================*/
//
// ✅ JS manages memory automatically
// ✅ Stack → primitives, function calls
// ✅ Heap → objects, arrays, functions
// ✅ GC uses → Mark & Sweep
// ✅ Memory freed when unreachable
// ✅ Leaks come from bad references
// ✅ Closures can hold memory
// ✅ WeakMap/WeakSet prevent leaks
// ✅ You cannot force GC
// ✅ You CAN remove references
//
// If you master this ✅
// → You understand JS performance at a PRO LEVEL 🔥


