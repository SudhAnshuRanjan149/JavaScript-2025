/*
  CONSTRUCTOR FUNCTIONS IN JAVASCRIPT — DETAILED EXPLANATION
  -----------------------------------------------------------
  ✔ A Constructor Function is a normal function used to create objects.
  ✔ When called with "new", it becomes a blueprint for objects.
  ✔ Before ES6 classes, this was the primary way to create multiple
    similar objects.
*/



/* ============================================================
   1. BASIC CONSTRUCTOR FUNCTION
   ============================================================ */

function Person(name, age) {
  // "this" refers to the newly created object
  this.name = name;
  this.age = age;
}

const p1 = new Person("Alice", 25);
const p2 = new Person("Bob", 30);

console.log(p1, p2);

/*
  When you use "new":
    1. A new empty object is created
    2. "this" is assigned to that object
    3. Properties/methods are added
    4. The object is returned automatically
*/



/* ============================================================
   2. IMPORTANT RULES OF CONSTRUCTOR FUNCTIONS
   ============================================================ */
/*
  ✔ Must start with a Capital letter (convention): Person, Car, User
  ✔ Must be called with "new"
  ✔ "this" refers to the new object
  ✔ No need to explicitly return an object
*/



/* ============================================================
   3. ADDING METHODS USING PROTOTYPE (RECOMMENDED)
   ============================================================ */

Person.prototype.sayHi = function () {
  console.log(`Hi, I am ${this.name}`);
};

p1.sayHi();
p2.sayHi();

/*
  Why add methods to prototype?
    ✔ Methods inside constructor get duplicated for each object
    ✔ Prototype methods are shared → memory efficient
*/



/* ============================================================
   4. WRONG WAY — DEFINING METHODS INSIDE CONSTRUCTOR
   ============================================================ */

function User(name) {
  this.name = name;

  // ❌ Not memory-efficient
  this.show = function () {
    console.log(this.name);
  };
}

const u1 = new User("Sam");
const u2 = new User("Tom");

console.log(u1.show === u2.show); // false, two separate functions

/*
  Instead use:
      User.prototype.show = ...
*/



/* ============================================================
   5. RIGHT WAY — USE PROTOTYPE FOR METHODS
   ============================================================ */

function User2(name) {
  this.name = name;
}

User2.prototype.show = function () {
  console.log(this.name);
};

const a1 = new User2("Leo");
const a2 = new User2("Max");

console.log(a1.show === a2.show); // true



/* ============================================================
   6. CONSTRUCTOR WITH DEFAULT VALUES
   ============================================================ */

function Product(name = "Unknown", price = 0) {
  this.name = name;
  this.price = price;
}

const p = new Product();
console.log(p);



/* ============================================================
   7. ADDING STATIC METHODS (attach to constructor function)
   ============================================================ */

function Car(model) {
  this.model = model;
}

// static method
Car.isCar = function (obj) {
  return obj instanceof Car;
};

const c1 = new Car("Tesla");

console.log(Car.isCar(c1));  // true
console.log(Car.isCar({}));  // false



/* ============================================================
   8. CONSTRUCTOR INHERITANCE (CALLing another constructor)
   ============================================================ */

function Animal(type) {
  this.type = type;
}

function Dog(name) {
  // Inherit properties from Animal
  Animal.call(this, "Dog");
  this.name = name;
}

const d = new Dog("Bruno");
console.log(d);
/*
  d = { type:"Dog", name:"Bruno" }
*/



/* ============================================================
   9. INHERITANCE + PROTOTYPES
   ============================================================ */

function Animal2(type) {
  this.type = type;
}

Animal2.prototype.sound = function () {
  console.log("Some sound...");
};

function Cat(name) {
  Animal2.call(this, "Cat"); // inherit properties
  this.name = name;
}

// inherit prototype methods
Cat.prototype = Object.create(Animal2.prototype);
Cat.prototype.constructor = Cat;

Cat.prototype.meow = function () {
  console.log("Meow!");
};

const kitty = new Cat("Kitty");
kitty.sound();
kitty.meow();

/*
  Prototype Chain:
    kitty
      ↓
    Cat.prototype
      ↓
    Animal2.prototype
      ↓
    Object.prototype
      ↓
    null
*/



/* ============================================================
   10. CHECKING INSTANCE TYPE
   ============================================================ */

console.log(kitty instanceof Cat);      // true
console.log(kitty instanceof Animal2);  // true
console.log(kitty instanceof Object);   // true



/* ============================================================
   11. WHAT HAPPENS IF YOU FORGET "new" ?
   ============================================================ */

function Human(name) {
  this.name = name;
}

const h1 = Human("Ravi"); // ❌ WRONG — no "new"

/*
  In non-strict mode:
    - "this" becomes window/global
    - this.name = "Ravi" sets a global variable
    - returns undefined

  In strict mode:
    - this = undefined → crash: "Cannot set property 'name' of undefined"
*/

console.log(h1);



/* ============================================================
   12. FIX: ALWAYS USE NEW
   ============================================================ */

const h2 = new Human("Ravi"); // correct
console.log(h2);



/* ============================================================
   13. CONSTRUCTOR FUNCTIONS VS CLASSES
   ============================================================ */
/*
  ✔ Constructor Functions are older ES5 way
  ✔ Classes (ES6) are syntactic sugar over prototypes

  class syntax = cleaner + safer, but works the same under the hood
*/



/* ============================================================
   14. SUMMARY
   ============================================================ */
/*
  ✔ Constructor Function:
        function Person(name) {
            this.name = name;
        }

  ✔ Use "new" → creates new object and binds "this"

  ✔ Methods:
      Person.prototype.method = ...

  ✔ Why use constructors?
      - To create multiple similar objects
      - For inheritance
      - For memory efficiency (using prototype)

  ✔ Prototype Chain:
      instance → Constructor.prototype → Object.prototype → null

  MENTAL MODEL:
    → Constructors are factories for objects.
    → Prototype is the shared toolbox for all objects created by them.
*/
