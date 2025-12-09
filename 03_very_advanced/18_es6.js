/****************************************************************************************
 * ES6 (ECMAScript 2015) — COMPLETE DETAILED NOTES (BEGINNER → ADVANCED)
 *
 * ES6 is the BIGGEST update in JS history.
 * It introduced modern JavaScript features that define how we write code today.
 *
 * Covers:
 * ✔ let & const
 * ✔ Block scoping
 * ✔ Template literals
 * ✔ Arrow functions
 * ✔ Enhanced object literals
 * ✔ Destructuring
 * ✔ Spread & Rest operators
 * ✔ Default parameters
 * ✔ Classes
 * ✔ Modules (import/export)
 * ✔ Promises
 * ✔ Generators
 * ✔ Iterators
 * ✔ Symbol
 * ✔ Map / Set
 * ✔ WeakMap / WeakSet
 * ✔ Proxy & Reflect (the basics)
 * ✔ new target
 ****************************************************************************************/


/****************************************************************************************
 * 1. let & const (Block Scoped Variables)
 ****************************************************************************************/

// BEFORE ES6 → var (function-scoped, hoisted, buggy)
var x = 10;

// ES6 →
let a = 10;    // mutable, block-scoped
const b = 20;  // immutable, block-scoped

// ❌ var is function scoped:
if (true) {
  var v = 1;
}
console.log(v); // 1 → accessible outside block ❌

// ✅ let/const are block scoped:
if (true) {
  let l = 2;
}
// console.log(l); ❌ ReferenceError


/****************************************************************************************
 * 2. Template Literals (Backticks `)
 ****************************************************************************************/

const name = "Rahul";
const greeting = `Hello, ${name}!`;
console.log(greeting);

// Multi-line strings:
const multi = `
Line 1
Line 2
Line 3
`;


/****************************************************************************************
 * 3. Arrow Functions ( => )
 ****************************************************************************************/

// Shorter syntax:
const add = (a, b) => a + b;

// MULTIPLE things they change:
const obj = {
  value: 42,
  normalFn() {
    return this.value;
  },
  arrowFn: () => this.value // ❌ this refers to global, not obj
};

// Arrow functions DO NOT have:
// -----------------------------
// ❌ their own this
// ❌ arguments object
// ❌ prototype


/****************************************************************************************
 * 4. Enhanced Object Literals
 ****************************************************************************************/

const age = 25;

// Before ES6:
const user1 = {
  age: age,
  greet: function () {
    console.log("Hello");
  }
};

// ES6 shorthand:
const user2 = {
  age,    // age: age
  greet() {
    console.log("Hello");
  }
};


/****************************************************************************************
 * 5. Destructuring (Objects & Arrays)
 ****************************************************************************************/

// Array destructuring:
const arr = [1, 2, 3];
const [x1, x2] = arr;  // x1=1, x2=2

// Object destructuring:
const person = { name: "Aman", age: 22 };
const { name: n, age: ag } = person;

// Default values:
const [val = 10] = []; // val = 10


/****************************************************************************************
 * 6. Spread & Rest Operators (...)
 ****************************************************************************************/

// Spread → expand
const nums = [1, 2, 3];
const more = [...nums, 4, 5];

// Rest → collect
function sum(...values) {
  return values.reduce((a, b) => a + b);
}
sum(1, 2, 3);


/****************************************************************************************
 * 7. Default Parameters
 ****************************************************************************************/

function multiply(a = 1, b = 1) {
  return a * b;
}


/****************************************************************************************
 * 8. Classes (Syntactic Sugar over Prototypes)
 ****************************************************************************************/

class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} speaks.`);
  }
}

class Dog extends Animal {
  speak() {
    console.log(`${this.name} barks.`);
  }
}

const d = new Dog("Tommy");
d.speak(); // Tommy barks.


/****************************************************************************************
 * 9. Modules (import/export)
 ****************************************************************************************/

// ES6 Modules are STATICALLY ANALYZED at compile time
// Browser/Node loads them asynchronously
//
// Example module:
//
// 📁 math.js
export const PI = 3.14;
export function add(a, b) { return a + b; }

// 📁 main.js
import { PI, add } from "./math.js";


/****************************************************************************************
 * 10. Promises (Async Programming)
 ****************************************************************************************/

// Promise represents a value that may arrive in the future

const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("done"), 1000);
});

promise.then(console.log).catch(console.error);


/****************************************************************************************
 * 11. Generators (function* & yield)
 ****************************************************************************************/

// Generators can pause execution!
// They produce values lazily.

function* generator() {
  yield 1;
  yield 2;
  return 3;
}

const gen = generator();
gen.next(); // {value:1, done:false}
gen.next(); // {value:2, done:false}
gen.next(); // {value:3, done:true}


/****************************************************************************************
 * 12. Iterators (Symbol.iterator)
 ****************************************************************************************/

const iterable = {
  data: [10, 20, 30],
  [Symbol.iterator]() {
    let index = 0;
    const arr = this.data;
    return {
      next() {
        return index < arr.length
          ? { value: arr[index++], done: false }
          : { done: true };
      }
    };
  }
};

for (const val of iterable) console.log(val);


/****************************************************************************************
 * 13. Symbol (Unique & Immutable Keys)
 ****************************************************************************************/

const sym = Symbol("desc");

const obj3 = {
  [sym]: "secret",
  public: "visible"
};

console.log(obj3[sym]); // "secret"


/****************************************************************************************
 * 14. Map & Set (Better data structures)
 ****************************************************************************************/

// MAP → Key-value pairs (keys can be any type)
const map = new Map();
map.set("name", "John");
map.set({ id: 1 }, "value");

// SET → Unique values
const set = new Set([1, 2, 2, 3]); // {1,2,3}


/****************************************************************************************
 * 15. WeakMap & WeakSet
 ****************************************************************************************/

// WeakMap keys MUST be objects
// They are garbage-collected automatically

let obj4 = { name: "temp" };
const weakMap = new WeakMap();
weakMap.set(obj4, "data");

obj4 = null; // GC will remove entry automatically


/****************************************************************************************
 * 16. Proxy (Meta-programming)
 ****************************************************************************************/

const target = { msg: "hello" };

const proxy = new Proxy(target, {
  get(obj, prop) {
    console.log("Accessing:", prop);
    return obj[prop];
  }
});

console.log(proxy.msg);


/****************************************************************************************
 * 17. Reflect API
 ****************************************************************************************/

// Provides default low-level operations (like Object.* but more complete)
Reflect.get(target, "msg");
Reflect.set(target, "msg", "updated");


/****************************************************************************************
 * 18. new.target (constructor detection)
 ****************************************************************************************/

function BaseClass() {
  if (!new.target) throw new Error("Must use new");
  console.log("Constructed");
}

new BaseClass(); // OK
// BaseClass(); ❌ error


/****************************************************************************************
 * MASTER SUMMARY (ONE-PAGE)
 ****************************************************************************************/
//
// ES6 introduced MODERN JAVASCRIPT:
//
// ✔ Block scoping → let, const
// ✔ Template literals
// ✔ Arrow functions
// ✔ Object & array destructuring
// ✔ Spread & rest operators
// ✔ Classes & inheritance
// ✔ Modules (import/export)
// ✔ Promises
// ✔ Generators + Iterators
// ✔ Symbol
// ✔ Map + Set
// ✔ WeakMap + WeakSet
// ✔ Proxy + Reflect
// ✔ new.target
//
// ES6 completely modernized JavaScript and is the foundation of ES7–ES14 features.
//
// If you master ES6 → You can write modern JS, React, Node, and advanced frameworks.
// 🚀🔥

