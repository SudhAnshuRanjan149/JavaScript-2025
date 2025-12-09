/****************************************************************************************
 * ADVANCED JAVASCRIPT CONCEPTS — COMPLETE & DETAILED EXPLANATIONS
 * All explanations are inside JS comments + examples only.
 *
 * Concepts Covered:
 * ✔ Enumerable
 * ✔ Configurable
 * ✔ Writable
 * ✔ Composition in JS
 * ✔ Promisification
 * ✔ Dynamic Typing
 * ✔ Inversion of Control (IoC)
 * ✔ Shadowing & Illegal Shadowing
 * ✔ Mark-and-Sweep Algorithm (Garbage Collection)
 * ✔ Inlining (JS Engine Optimization)
 * ✔ Copy Elision (JS perspective)
 * ✔ Inline Caching (V8 optimization)
 * ✔ Iterable (Protocols)
 ****************************************************************************************/


/****************************************************************************************
 * 1. ENUMERABLE — WHETHER A PROPERTY SHOWS UP IN LOOPS
 ****************************************************************************************/
//
// Properties have internal descriptors:
//   - enumerable
//   - configurable
//   - writable
//
// enumerable: true → will show up in for...in, Object.keys(), JSON.stringify()
// enumerable: false → hidden from iteration
//

const obj1 = {};
Object.defineProperty(obj1, "secret", {
  value: 42,
  enumerable: false  // hidden
});

Object.defineProperty(obj1, "public", {
  value: 99,
  enumerable: true
});

console.log(Object.keys(obj1)); // ["public"]  → "secret" is hidden


/****************************************************************************************
 * 2. CONFIGURABLE — CAN YOU DELETE OR RECONFIGURE THE PROPERTY?
 ****************************************************************************************/
//
// configurable: true allows:
//   ✔ delete obj.prop
//   ✔ redefining property descriptors
//
// configurable: false makes property PERMANENT (cannot delete or modify descriptors).
//

const obj2 = {};
Object.defineProperty(obj2, "fixed", {
  value: 10,
  configurable: false
});

// delete obj2.fixed;      // ❌ fails silently in non-strict mode
// Object.defineProperty(obj2, "fixed", { value: 20 }); // ❌ TypeError


/****************************************************************************************
 * 3. WRITABLE — CAN YOU CHANGE THE VALUE?
 ****************************************************************************************/
//
// writable: true  → value can change
// writable: false → value is read-only
//

const obj3 = {};
Object.defineProperty(obj3, "constant", {
  value: 100,
  writable: false
});

// obj3.constant = 200; // ❌ ignored or error in strict mode


/****************************************************************************************
 * 4. COMPOSITION IN JS — "HAS-A" INSTEAD OF "IS-A"
 ****************************************************************************************/
//
// Composition builds objects by combining behaviors instead of inheritance.
// Prefer composition over inheritance in JS.
//
// Example: reusable small behavior modules
//

const canWalk = (state) => ({
  walk: () => console.log(`${state.name} is walking`)
});

const canEat = (state) => ({
  eat: () => console.log(`${state.name} is eating`)
});

// Compose behaviors
function Person(name) {
  const state = { name };
  return { ...canWalk(state), ...canEat(state) };
}

const p = Person("Raj");
p.walk();
p.eat();


/****************************************************************************************
 * 5. PROMISIFICATION — CONVERT CALLBACK-STYLE TO PROMISE STYLE
 ****************************************************************************************/
//
// A function uses Node-style callbacks:
// fn(arg, callback)
//
// Promisification converts it to return a Promise.
//

function readFileCb(path, cb) {
  setTimeout(() => cb(null, "file content"), 500);
}

// Promisify utility:
function promisify(fn) {
  return (...args) =>
    new Promise((resolve, reject) => {
      fn(...args, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
}

const readFile = promisify(readFileCb);

readFile("file.txt").then(console.log);


/****************************************************************************************
 * 6. DYNAMIC TYPING — JS VARIABLES HAVE NO FIXED TYPE
 ****************************************************************************************/
//
// In JavaScript:
// ✔ Variables are NOT typed (values are typed)
// ✔ You can reassign with any type
//

let x = 10;    // number
x = "hello";   // string
x = true;      // boolean

// Dynamic typing → more flexible but more runtime errors.


/****************************************************************************************
 * 7. INVERSION OF CONTROL (IoC)
 ****************************************************************************************/
//
// IoC = giving control to external code.
//
// Example: You provide a callback, but YOU don’t control when it runs.
// The system (or library) controls execution.
//
// This can lead to "callback hell".
// Promises solve this by making control more explicit.
//

function doAsync(cb) {
  setTimeout(() => {
    // YOU are not in control here (IoC)
    cb("done");
  }, 1000);
}

doAsync(console.log);


/****************************************************************************************
 * 8. SHADOWING & ILLEGAL SHADOWING
 ****************************************************************************************/

//
// SHADOWING:
// -----------
// When inner scope variable has the same name as outer scope variable.
//

let a = 10;

function test() {
  let a = 20; // shadows outer "a"
  console.log(a);
}
test();

//
// ILLEGAL SHADOWING:
// ------------------
// When using let/const to shadow a var in the same scope chain.
// JS will throw an error.
//

var y = 100;

// function bad() {
//   let y = 200; // ❌ Illegal shadowing (cannot shadow var with let in same scope chain)
// }


/****************************************************************************************
 * 9. MARK-AND-SWEEP ALGORITHM (Garbage Collector)
 ****************************************************************************************/
//
// JS uses automatic memory management.
// The most common GC algorithm is Mark-and-Sweep.
//
// Steps:
// 1️⃣ "Roots" (global variables, call stack variables) are marked as reachable.
// 2️⃣ GC recursively marks all objects reachable from roots.
// 3️⃣ Anything NOT marked = unreachable → memory freed.
//
// Example visual:
//
// root → obj1 → obj2
// orphanObj (unreachable) → removed by GC
//
// No manual deletion needed.
//

let obj = { child: { sub: {} } };
obj = null; // entire chain becomes unreachable → GC cleans it


/****************************************************************************************
 * 10. INLINING (JS Engine Optimization)
 ****************************************************************************************/
//
// Inlining = replacing a function call with the function BODY to avoid call overhead.
//
// Example:
// Instead of calling:
function square(n) { return n * n; }

// The JS engine may inline:
const result = n * n; // faster

//
// Functions optimized for inlining:
// ✔ simple
// ✔ monomorphic parameters (same type)
// ✔ no deoptimization triggers (arguments, eval, try/catch)
//
// Functions that prevent optimization:
// ❌ too large
// ❌ dynamic shape-changing
// ❌ polymorphic calls
//


/****************************************************************************************
 * 11. COPY ELISION — JS CONTEXT
 ****************************************************************************************/
//
// Copy elision is a C++ concept (avoid unnecessary copying).
// JS does NOT copy objects on assignment.
// All objects are reference types.
//
// Example:
//

let original = { value: 10 };
let copy = original; // NO COPYING — just reference sharing

copy.value = 20;
console.log(original.value); // 20

//
// JS automatically avoids copying large structures (copy elision-like behavior).
// Primitives are copied by value; objects by reference.
//


/****************************************************************************************
 * 12. INLINE CACHING (V8 Optimization Technique)
 ****************************************************************************************/
//
// Inline caching = JS engine optimizes repeated property access.
//
// Example:
function getName(obj) {
  return obj.name;
}

const u1 = { name: "A" };
const u2 = { name: "B" };

getName(u1);
getName(u2);

// V8 learns:
//   - getName() always accesses a property with the same hidden class ("shape")
//   - It generates optimized machine code
//
// If shape changes:
//
// u1.age = 30; // shape changed
//
// → engine deoptimizes and recompiles.


/****************************************************************************************
 * 13. ITERABLE — OBJECT THAT WORKS WITH for...of
 ****************************************************************************************/
//
// An object is "iterable" if it implements Symbol.iterator.
//
// Built-in iterables:
// ✔ Array
// ✔ String
// ✔ Map
// ✔ Set
// ✔ NodeList
//
// Custom iterable:
//

const myIterable = {
  nums: [1, 2, 3],
  [Symbol.iterator]() {
    let i = 0;
    return {
      next: () => ({
        value: this.nums[i],
        done: i++ >= this.nums.length
      })
    };
  }
};

for (const x of myIterable) console.log(x);


/****************************************************************************************
 * FINAL MASTER SUMMARY
 ****************************************************************************************/
//
// ✔ enumerable → property visible in loops
// ✔ configurable → delete/redefine allowed
// ✔ writable → value modifiable
// ✔ composition → combine small behaviors over inheritance
// ✔ promisification → convert callback APIs to Promise-based
// ✔ dynamic typing → variables can hold any type anytime
// ✔ inversion of control → callbacks run under external control
// ✔ shadowing → inner variable hides outer one
// ✔ illegal shadowing → var shadowed improperly by let/const
// ✔ mark-and-sweep → JS garbage collector algorithm
// ✔ inlining → engine inserts function code directly (optimization)
// ✔ copy elision → JS avoids copying objects (reference model)
// ✔ inline caching → speeds up property access by caching shapes
// ✔ iterable → object implementing Symbol.iterator