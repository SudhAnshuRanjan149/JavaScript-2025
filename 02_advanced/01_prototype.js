/*
  PROTOTYPE IN JAVASCRIPT — DETAILED EXPLANATION
  -----------------------------------------------
  ✔ Every function in JS has a property called "prototype".
  ✔ Every object in JS has an internal link called [[Prototype]].
  ✔ This link allows objects to inherit properties & methods.

  MENTAL MODEL:
    → Think of prototype as a "backup object".
      If JS cannot find a property in the object,
      it climbs into the prototype chain to look for it.
*/



/* ============================================================
   1. BASIC PROTOTYPE INHERITANCE
   ============================================================ */

const person = {
  eat() {
    console.log("Eating...");
  }
};

const user = {
  name: "Alice"
};

Object.setPrototypeOf(user, person);

console.log(user.name); // "Alice"
user.eat();             // "Eating..." (inherited from person)

/*
  Steps:
    user.eat -> not found in user
    -> goes to prototype (person)
*/



/* ============================================================
   2. PROTOTYPE LINK (INTERNAL)
   ============================================================
   ✔ Every object has a hidden property:
       __proto__  (or [[Prototype]])
*/

console.log(user.__proto__); 
/*
  __proto__ === person
*/



/* ============================================================
   3. FUNCTION PROTOTYPE (VERY IMPORTANT)
   ============================================================
   ✔ Every function has a .prototype property.
   ✔ When you use "new", JS uses that prototype for the new object.
*/

function Person(name) {
  this.name = name;
}

/*
  Adding methods to prototype:
*/
Person.prototype.sayHi = function () {
  console.log(`Hi, I am ${this.name}`);
};

const p1 = new Person("Bob");
p1.sayHi();

/*
  HOW IT WORKS:
    - new Person("Bob") creates:
        {
          name: "Bob",
          [[Prototype]]: Person.prototype
        }
*/



/* ============================================================
   4. PROTOTYPE CHAIN
   ============================================================
   ✔ Object inherits from another object,
   ✔ that inherits from Object.prototype,
   ✔ which inherits from null.
*/

console.log(p1.__proto__);                  // Person.prototype
console.log(p1.__proto__.__proto__);        // Object.prototype
console.log(p1.__proto__.__proto__.__proto__); // null

/*
  Prototype Chain:
    p1 → Person.prototype → Object.prototype → null
*/



/* ============================================================
   5. ADDING METHODS TO BUILT-IN PROTOTYPES (NOT RECOMMENDED)
   ============================================================ */

// Example (Avoid doing this!):

Array.prototype.first = function () {
  return this[0];
};

console.log([10, 20, 30].first()); // 10

/*
  Modifying built-in prototypes can break other code.
*/



/* ============================================================
   6. OBJECT.CREATE() — Create object with specific prototype
   ============================================================ */

const animal = {
  walk() {
    console.log("Walking...");
  }
};

const dog = Object.create(animal);
dog.bark = function () {
  console.log("Barking!");
};

dog.walk(); // inherited
dog.bark();

/*
  dog → animal → Object.prototype → null
*/



/* ============================================================
   7. CLASS SYNTAX IS JUST PROTOTYPE UNDER THE HOOD (ES6)
   ============================================================ */

class Student {
  constructor(name) {
    this.name = name;
  }

  study() {
    console.log(`${this.name} is studying`);
  }
}

const s1 = new Student("John");
s1.study();

/*
  Under the hood:
    Student.prototype.study = function() {}
*/



/* ============================================================
   8. CHECKING PROTOTYPE
   ============================================================ */

console.log(Object.getPrototypeOf(s1) === Student.prototype); // true



/* ============================================================
   9. PROTOTYPAL INHERITANCE VS CLASSICAL INHERITANCE
   ============================================================
   ✔ JS uses "prototypal" inheritance.
   ✔ Objects inherit FROM objects.
   ✔ Classes are syntactic sugar for prototype chains.
*/



/* ============================================================
   10. MULTI-LEVEL INHERITANCE EXAMPLE
   ============================================================ */

const living = {
  breathe() { console.log("Breathing..."); }
};

const creature = Object.create(living);
creature.eat = function () { console.log("Eating..."); };

const human = Object.create(creature);
human.speak = function () { console.log("Speaking..."); };

human.breathe();
human.eat();
human.speak();

/*
  human → creature → living → Object.prototype → null
*/



/* ============================================================
   11. HASOWNPROPERTY VS INHERITED PROPERTIES
   ============================================================ */

console.log(human.hasOwnProperty("speak"));   // true
console.log(human.hasOwnProperty("eat"));     // false (inherited)
console.log(human.hasOwnProperty("breathe")); // false (inherited)



/* ============================================================
   12. SUMMARY
   ============================================================
  ✔ prototype:
        - property of functions
        - used when creating new objects with "new"

  ✔ __proto__:
        - internal link from object → prototype

  ✔ prototype chain:
        object → its prototype → parent's prototype → ... → null

  ✔ methods on prototype:
        - shared across all instances
        - memory-efficient

  ✔ classes:
        - modern syntax for prototype-based inheritance

  MENTAL MODEL:
    → Think of prototype as a “backup object”.
      If JS cannot find a property in the object,
      it climbs up the prototype chain to find it.
*/
