/*
  OBJECTS & OBJECT METHODS IN JAVASCRIPT — DETAILED EXPLANATION
  --------------------------------------------------------------
  ✔ Objects store key–value pairs
  ✔ Most powerful data structure in JS
  ✔ Used for:
      - data modeling
      - configurations
      - OOP
      - JSON
      - APIs
      - DOM manipulation
*/



/* ============================================================
   1. CREATING OBJECTS
   ============================================================ */

// A) Object Literal (most common)
const user1 = {
  name: "Alice",
  age: 25,
  isAdmin: false,
  greet() {
    console.log("Hello " + this.name);
  }
};

// B) Using new Object()
const user2 = new Object();
user2.name = "Bob";
user2.age = 30;

// C) Using Object.create()
const prototypeObj = { type: "Human" };
const user3 = Object.create(prototypeObj);
user3.name = "Charlie";

// D) Constructor Function
function Person(name, age) {
  this.name = name;
  this.age = age;
}
const p1 = new Person("David", 40);



/* ============================================================
   2. ACCESSING PROPERTIES
   ============================================================ */
console.log(user1.name);        // dot notation
console.log(user1["age"]);      // bracket notation

/*
  dot notation:
      obj.key
  bracket notation:
      obj["key"]   ← useful when keys have spaces, numbers, variables
*/



/* ============================================================
   3. ADDING / MODIFYING PROPERTIES
   ============================================================ */

user1.email = "alice@mail.com";     // add new
user1.age = 26;                     // modify existing

/* dynamic keys */
const key = "hobby";
user1[key] = "Reading";             // set using variable key



/* ============================================================
   4. DELETING PROPERTIES
   ============================================================ */

delete user1.isAdmin;



/* ============================================================
   5. CHECK IF PROPERTY EXISTS
   ============================================================ */

console.log("name" in user1);       // true
console.log(user1.hasOwnProperty("email")); // true
console.log(Object.hasOwn(user1, "email")); // modern alternative



/* ============================================================
   6. LOOPING THROUGH OBJECTS
   ============================================================ */

const obj = { a: 1, b: 2, c: 3 };

for (let key in obj) {
  console.log("key:", key, "value:", obj[key]);
}

/*
  for...in:
    - loops enumerable properties
    - includes inherited props → usually combine with hasOwnProperty()
*/



/* ============================================================
   7. OBJECT METHODS (VERY IMPORTANT)
   ============================================================ */



/* ------------------------------------------------------------
   Object.keys() — get array of keys
   ------------------------------------------------------------ */

console.log(Object.keys(obj));   // ["a","b","c"]



/* ------------------------------------------------------------
   Object.values() — get array of values
   ------------------------------------------------------------ */

console.log(Object.values(obj)); // [1,2,3]



/* ------------------------------------------------------------
   Object.entries() — array of [key, value] pairs
   ------------------------------------------------------------ */

console.log(Object.entries(obj)); // [["a",1],["b",2],["c",3]]

/*
  Useful for loops, converting to Map, converting to arrays
*/



/* ------------------------------------------------------------
   Object.fromEntries() — reverse of entries()
   ------------------------------------------------------------ */

const arrEntries = [["x", 10], ["y", 20]];
console.log(Object.fromEntries(arrEntries)); // {x:10,y:20}



/* ------------------------------------------------------------
   Object.assign() — copy object or merge objects
   ------------------------------------------------------------ */

const target = { a: 1 };
const source = { b: 2, c: 3 };

Object.assign(target, source);
console.log(target); // {a:1, b:2, c:3}

/*
  Note:
    - MUTATES target
    - shallow copy
*/



/* ------------------------------------------------------------
   Object.freeze() — make object immutable
   ------------------------------------------------------------ */

const frozen = Object.freeze({ x: 10 });

/*
  frozen.x = 20;  // ignored (cannot modify)
  frozen.y = 30;  // cannot add
*/



/* ------------------------------------------------------------
   Object.seal() — prevent adding/removing props, allow modifying
   ------------------------------------------------------------ */

const sealed = Object.seal({ a: 10 });
sealed.a = 99;  // OK
/*
  delete sealed.a;  // NOT allowed
*/



/* ------------------------------------------------------------
   Object.create() — create object with prototype
   ------------------------------------------------------------ */

const proto = { kind: "Animal" };
const dog = Object.create(proto);
dog.name = "Tommy";

console.log(dog.kind); // from prototype


/* ------------------------------------------------------------
   Object.hasOwn() — modern property check
   ------------------------------------------------------------ */

console.log(Object.hasOwn(dog, "name")); // true
console.log(Object.hasOwn(dog, "kind")); // false (from prototype)



/* ============================================================
   8. OBJECT DESTRUCTURING
   ============================================================ */

const person = { name: "Mark", age: 35, city: "NY" };

const { name, age } = person; // extract values
console.log(name, age);

/* rename variable */
const { city: location } = person;
console.log(location);



/* ============================================================
   9. SPREAD OPERATOR WITH OBJECTS (...)
   ============================================================ */

const objA = { x: 1, y: 2 };
const objB = { y: 99, z: 3 };

const merged = { ...objA, ...objB };
/*
  spread:
    - merges
    - shallow copy
    - last property overwrites earlier
*/

console.log("merged:", merged);



/* ============================================================
   10. NESTED OBJECTS
   ============================================================ */

const nestedUser = {
  name: "John",
  address: {
    city: "Paris",
    zip: 44000
  }
};

console.log(nestedUser.address.city);



/* ============================================================
   11. OPTIONAL CHAINING (?.)
   ============================================================ */

console.log(nestedUser?.address?.city); // safe access
console.log(nestedUser?.job?.title);    // undefined, no error



/* ============================================================
   12. OBJECT METHODS & THIS
   ============================================================ */

const car = {
  brand: "Tesla",
  model: "S",
  fullName() {
    return this.brand + " " + this.model;
  }
};

console.log(car.fullName());



/* ============================================================
   13. OBJECT SHORT SYNTAX
   ============================================================ */

const a = 10, b = 20;

const shortObj = { a, b };
console.log(shortObj); // {a:10, b:20}



/* ============================================================
   14. COMPUTED PROPERTY NAMES
   ============================================================ */

const prop = "score";

const student = {
  name: "Sam",
  [prop]: 95,   // dynamic key
};

console.log(student.score);



/* ============================================================
   15. OBJECT CLONING METHODS
   ============================================================ */

/*
  Shallow copy:
    1. {...obj}
    2. Object.assign({}, obj)
*/

const original = { a: 1, b: { c: 2 } };

const shallow1 = { ...original };
const shallow2 = Object.assign({}, original);

/*
  Deep copy:
*/

const deepCopy = structuredClone(original);
// OR JSON-based method (not recommended for functions, Dates)
const deepCopyJSON = JSON.parse(JSON.stringify(original));



/* ============================================================
   16. SUMMARY OF IMPORTANT OBJECT METHODS
   ============================================================ */
/*
  ACCESS & INFO:
    - Object.keys()
    - Object.values()
    - Object.entries()
    - Object.hasOwn()

  TRANSFORM:
    - Object.fromEntries()
    - Object.assign()
    - structuredClone()
    - JSON.parse(JSON.stringify())

  CREATE:
    - Object.create()

  CONTROL:
    - Object.freeze()
    - Object.seal()
    - Object.preventExtensions()

  ACCESS:
    - dot notation
    - bracket notation
    - optional chaining (?.)

  UTILITIES:
    - spread operator {...obj}
    - destructuring {a, b}
    - computed keys [key]
*/



/* ============================================================
   MENTAL MODEL
   ============================================================ */
/*
  ✔ Objects are like dictionaries storing key-value pairs.
  ✔ They support dynamic keys, nested structures, and custom methods.
  ✔ Object methods help:
      - transform objects
      - copy objects
      - lock objects
      - merge objects
      - extract data

  ✔ Objects + functions = foundation of everything in JS.
*/
