/*
  PROTOTYPE CHAIN IN JAVASCRIPT — DETAILED EXPLANATION
  ----------------------------------------------------
  ✔ JavaScript uses PROTOTYPAL INHERITANCE.
  ✔ Objects inherit from other objects through a chain called:
        → the PROTOTYPE CHAIN.

  ✔ If JS cannot find a property/method on an object,
    it climbs up the prototype chain until:
        - it finds the property
        - OR reaches null (end of chain)
*/



/* ============================================================
   1. BASIC IDEA OF PROTOTYPE CHAIN
   ============================================================ */

const obj = { a: 1 };

console.log(obj.a);          // 1 (own property)
console.log(obj.toString);   // inherited from Object.prototype
/*
  Steps:
    obj.a           → found directly on obj
    obj.toString    → NOT found on obj
                     → JS checks obj.__proto__ (Object.prototype)
                     → found there
*/



/* ============================================================
   2. INTERNAL LINK [[Prototype]]
   ============================================================
   ✔ every object has an internal hidden property:
       [[Prototype]]
   ✔ usually accessible via:
       obj.__proto__
*/

console.log(obj.__proto__); 
/*
  Output: Object.prototype
*/



/* ============================================================
   3. SIMPLE PROTOTYPE CHAIN EXAMPLE
   ============================================================ */

const parent = { parentProp: "I am parent" };
const child = Object.create(parent);
child.childProp = "I am child";

console.log(child.childProp);   // "I am child"
console.log(child.parentProp);  // "I am parent" (from prototype)

/*
  Chain:
      child → parent → Object.prototype → null
*/



/* ============================================================
   4. MULTI-LEVEL PROTOTYPE CHAIN
   ============================================================ */

const grand = { g: "grand" };
const parent2 = Object.create(grand);
parent2.p = "parent";
const child2 = Object.create(parent2);
child2.c = "child";

console.log(child2.c); // own
console.log(child2.p); // from parent2
console.log(child2.g); // from grand

/*
  Chain:
      child2
        ↓
      parent2
        ↓
      grand
        ↓
      Object.prototype
        ↓
      null
*/



/* ============================================================
   5. FUNCTION PROTOTYPE CHAIN (VERY IMPORTANT)
   ============================================================ */
/*
  Every function has a .prototype object.
  When you create an object using "new", that object’s prototype
  is set to the function’s .prototype.
*/

function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = function () {
  console.log(`Hi, I am ${this.name}`);
};

const p = new Person("Alice");

p.sayHi();

/*
  Prototype Chain:
    p
      ↓
    Person.prototype
      ↓
    Object.prototype
      ↓
    null
*/



/* ============================================================
   6. METHODS ARE INHERITED VIA PROTOTYPE CHAIN
   ============================================================ */

console.log(p.hasOwnProperty("name"));   // true
console.log(p.hasOwnProperty("sayHi"));  // false (inherited)
console.log("sayHi" in p);               // true (found in prototype)



/* ============================================================
   7. BUILT-IN PROTOTYPE CHAINS
   ============================================================ */

// Array instance
const arr = [1, 2, 3];

/*
  Chain:
    arr
      ↓
    Array.prototype
      ↓
    Object.prototype
      ↓
    null
*/

console.log(arr.__proto__ === Array.prototype); // true
console.log(Array.prototype.__proto__ === Object.prototype); // true



/* ============================================================
   8. CLASS SYNTAX = PROTOTYPE UNDER THE HOOD
   ============================================================ */

class Animal {
  speak() {
    console.log("Animal speaks");
  }
}

class Dog extends Animal {
  bark() {
    console.log("Dog barks");
  }
}

const d = new Dog();

d.bark();   // own prototype
d.speak();  // inherited from Animal.prototype

/*
  Chain:
    d
      ↓
    Dog.prototype
      ↓
    Animal.prototype
      ↓
    Object.prototype
      ↓
    null
*/



/* ============================================================
   9. HOW PROPERTY LOOKUP WORKS (STEP-BY-STEP)
   ============================================================ */

/*
  When accessing obj.prop:

    1. JS checks the object itself.
    2. If not found, check obj.__proto__.
    3. If not found, check __proto__.__proto__.
    4. Continue until Object.prototype.
    5. If still not found, return undefined.
*/



/* ============================================================
   10. END OF CHAIN = null
   ============================================================ */

console.log(Object.prototype.__proto__); // null



/* ============================================================
   11. DETECTING PROTOTYPE RELATIONSHIP
   ============================================================ */

console.log(grand.isPrototypeOf(child2));      // true
console.log(Object.prototype.isPrototypeOf(p)); // true



/* ============================================================
   12. hasOwnProperty vs "in" — IMPORTANT
   ============================================================ */

const example = { x: 10 };

console.log(example.hasOwnProperty("x"));    // true
console.log(example.hasOwnProperty("toString")); // false → inherited

console.log("toString" in example); // true → exists in prototype chain



/* ============================================================
   13. WHY PROTOTYPE CHAIN EXISTS?
   ============================================================ */
/*
  ✔ Saves memory — methods stored once in prototype
  ✔ Enables inheritance
  ✔ Efficient code reuse
  ✔ Allows JS objects to behave like classes (but more flexible)
*/



/* ============================================================
   14. VISUAL MENTAL MODEL
   ============================================================ */
/*
            +---------------------+
            |     p (object)      |
            +---------------------+
                        |
                        v
            +---------------------+
            | Person.prototype    |
            +---------------------+
                        |
                        v
            +---------------------+
            | Object.prototype    |
            +---------------------+
                        |
                        v
                     null
*/



/* ============================================================
   15. SUMMARY
   ============================================================ */
/*
  ✔ Prototype chain = linked list of objects used for inheritance
  ✔ JS searches up the chain when a property is missing
  ✔ Ends at null
  ✔ Created using:
        - functions (via .prototype)
        - Object.create()
        - classes (syntactic sugar)
  ✔ Inheritance works because of this chain

  MENTAL MODEL:
    → If an object does not know the answer to a property,
      it asks its parent (prototype),
      then parent’s parent,
      until null.
*/
