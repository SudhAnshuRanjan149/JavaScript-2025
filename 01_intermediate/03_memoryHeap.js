/*
  MEMORY HEAP IN JAVASCRIPT — DETAILED EXPLANATION
  ------------------------------------------------
  The Memory Heap is where JavaScript stores:
      ✔ objects
      ✔ arrays
      ✔ functions
      ✔ reference types
      ✔ closures
      ✔ large data structures

  JavaScript has TWO main memory areas:
      1. CALL STACK  → stores execution contexts (primitive values, frames)
      2. MEMORY HEAP → stores dynamic memory (objects, arrays, functions)

  The heap is an unstructured memory region used for allocating
  and freeing memory for reference-type values.
*/



/* ============================================================
   1. WHAT IS THE MEMORY HEAP?
   ============================================================
   - A large, free memory area (unstructured).
   - JS engine allocates memory here for objects & reference values.
   - Unlike the stack, the heap does NOT follow any order.
   - Memory allocation in the heap is *dynamic*.
*/

const obj = { name: "Alice", age: 25 };
const arr = [1, 2, 3];
function greet() { console.log("Hello"); }

/*
  obj, arr, greet → stored in HEAP
  their references (memory addresses) → stored in STACK
*/



/* ============================================================
   2. STACK VS HEAP — HOW THEY WORK TOGETHER
   ============================================================

   EXAMPLE:
*/

let x = 10;              // primitive → stored in STACK
let user = { name: "Bob" }; // object → stored in HEAP

/*
  STACK:
      x = 10
      user → (pointer/ref to heap)

  HEAP:
      { name: "Bob" }
*/



/* ============================================================
   3. WHY OBJECTS/ARRAYS ARE STORED IN HEAP?
   ============================================================

   Objects & arrays:
      - can grow dynamically
      - need flexible memory allocation
      - sizes are not fixed

   Heap memory supports:
      ✔ dynamic allocation
      ✔ resizing
      ✔ non-sequential storage
*/



/* ============================================================
   4. EXAMPLE — MULTIPLE VARIABLES POINTING TO SAME HEAP OBJECT
   ============================================================
*/

let personA = { name: "Chris" };  // stored in heap
let personB = personA;            // copy reference, NOT object

personB.name = "John";

console.log(personA.name);  // "John" (same heap object)


// MEMORY DIAGRAM:

/*
  STACK:
    personA → reference #1001
    personB → reference #1001

  HEAP:
    #1001 → { name: "John" }
*/



/* ============================================================
   5. GARBAGE COLLECTION (VERY IMPORTANT)
   ============================================================
   JavaScript automatically frees memory using Garbage Collector (GC).
   It removes objects in the heap that are NO LONGER REFERENCED.

   JS uses:
      - Mark-and-Sweep algorithm
      - Reachability analysis
*/

let data = { value: 50 };  // allocated in heap

data = null;               // original object becomes unreachable
/* 
  GC will remove the old { value: 50 } from heap
*/



/* ============================================================
   6. MEMORY LEAKS (HEAP PROBLEMS)
   ============================================================
   Memory leaks occur when unused objects remain in memory.

   Common causes:
      ✔ global variables
      ✔ forgotten timers (setInterval)
      ✔ unused event listeners
      ✔ closures holding unnecessary data
*/

function memoryLeak() {
  let hugeArray = new Array(1000000).fill("data");

  // accidental global:
  leaked = hugeArray; // BAD (no var/let/const)
}



/* ============================================================
   7. HEAP ALLOCATION EXAMPLES
   ============================================================
*/

// objects
const car = { brand: "BMW" };

// arrays
const numbers = [10, 20, 30];

// functions
const hello = function () {
  return "Hello!";
};

// nested objects → deeper heap allocation
const company = {
  name: "Tech Corp",
  employees: [
    { id: 1, name: "A" },
    { id: 2, name: "B" }
  ]
};



/* ============================================================
   8. HOW CLOSURES AFFECT HEAP
   ============================================================
   Closures keep variables alive in memory even after parent
   execution context has finished.
*/

function outer() {
  let counter = 0; // stored in heap because closure keeps it alive

  return function () {
    counter++;
    console.log(counter);
  };
}

const inc = outer();
inc(); // 1
inc(); // 2

/*
  The variable `counter` stays in HEAP due to closure.
*/



/* ============================================================
   9. SUMMARY OF MEMORY HEAP
   ============================================================

   ✔ Heap stores:
       - objects, arrays, functions, closures
       - dynamic & reference data

   ✔ Stack stores:
       - primitive values
       - references to heap objects
       - execution contexts

   ✔ Heap memory is:
       - large
       - unstructured
       - dynamic

   ✔ Garbage Collector automatically removes unused heap objects.

   ✔ Memory leaks happen when references remain accidentally.
*/



/* ============================================================
   10. SUPER SIMPLE ANALOGY
   ============================================================
   → The Stack is like a neat stack of plates (ordered, small items)
   → The Heap is like a big messy table (large items placed randomly)
   → Garbage Collector is like a cleaner who removes unused items
*/
