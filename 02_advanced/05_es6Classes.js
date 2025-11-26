/*
  ES6 CLASSES IN JAVASCRIPT — DETAILED EXPLANATION
  -------------------------------------------------
  ✔ Introduced in ES6 (2015)
  ✔ Syntactic sugar over constructor functions + prototypes
  ✔ Provides a cleaner, more readable way of creating objects & inheritance
*/



/* ============================================================
   1. BASIC CLASS DECLARATION
   ============================================================ */

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hello, I am ${this.name}`);
  }
}

const p1 = new Person("Alice", 25);
p1.greet();



/* ============================================================
   2. HOW CLASSES WORK UNDER THE HOOD
   ============================================================ */
/*
  ✔ constructor() = constructor function
  ✔ methods = added to prototype automatically
*/

console.log(Person.prototype.greet);     
// function greet() { ... }



/* ============================================================
   3. CLASS EXPRESSIONS
   ============================================================ */

// unnamed class
const Car = class {
  constructor(model) {
    this.model = model;
  }
};

// named class expression
const Bike = class TwoWheeler {
  constructor(name) {
    this.name = name;
  }
};

const b = new Bike("Honda");
console.log(b);



/* ============================================================
   4. GETTERS & SETTERS
   ============================================================ */

class Product {
  constructor(price) {
    this._price = price;
  }

  get price() {
    return this._price;
  }

  set price(value) {
    if (value <= 0) {
      console.log("Invalid price");
      return;
    }
    this._price = value;
  }
}

const item = new Product(100);
console.log(item.price);

item.price = -5;  // invalid
item.price = 150; // valid
console.log(item.price);



/* ============================================================
   5. STATIC METHODS (NOT ON INSTANCE)
   ============================================================ */

class MathUtil {
  static add(a, b) {
    return a + b;
  }
}

console.log(MathUtil.add(10, 5));
// p1.add() ❌ error → static methods not available on objects



/* ============================================================
   6. CLASS FIELDS (PUBLIC FIELDS)
   ============================================================ */

class User {
  name = "Guest";     // public field
  age = 0;

  constructor(name, age) {
    if (name) this.name = name;
    if (age) this.age = age;
  }
}

const u = new User("Sam", 22);
console.log(u.name);



/* ============================================================
   7. PRIVATE FIELDS (# private)
   ============================================================ */

class Account {
  #balance = 0;  // private

  deposit(amount) {
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const acc = new Account();
acc.deposit(100);
console.log(acc.getBalance());
// acc.#balance ❌ error (can't access private)



/* ============================================================
   8. INHERITANCE USING "extends"
   ============================================================ */

class Animal {
  constructor(type) {
    this.type = type;
  }

  makeSound() {
    console.log("Some sound...");
  }
}

class Dog extends Animal {
  constructor(name) {
    super("Dog");  // calls parent constructor
    this.name = name;
  }

  bark() {
    console.log("Woof!");
  }
}

const d = new Dog("Tommy");

d.makeSound(); // inherited
d.bark();      // own



/* ============================================================
   9. SUPER KEYWORD
   ============================================================ */

class Parent {
  greet() {
    console.log("Hello from parent");
  }
}

class Child extends Parent {
  greet() {
    super.greet(); // call parent method
    console.log("Hello from child");
  }
}

new Child().greet();



/* ============================================================
   10. OVERRIDING METHODS
   ============================================================ */

class Vehicle {
  start() {
    console.log("Vehicle starting...");
  }
}

class Car2 extends Vehicle {
  start() {
    console.log("Car starting...");
  }
}

new Car2().start();



/* ============================================================
   11. USING CLASSES WITH STATIC PROPERTIES
   ============================================================ */

class Counter {
  static count = 0;

  static increment() {
    this.count++;
  }
}

Counter.increment();
Counter.increment();
console.log(Counter.count);



/* ============================================================
   12. CLASSES ARE NOT HOISTED LIKE FUNCTIONS
   ============================================================ */

/*
  new MyClass(); // ❌ Cannot access before declaration

  class MyClass {}
*/



/* ============================================================
   13. CLASSES IN STRICT MODE
   ============================================================ */
/*
  ✔ Classes ALWAYS run in strict mode internally
  ✔ Meaning:
     - this is undefined in functions by default
     - silent errors become real errors
*/



/* ============================================================
   14. MIXINS (ADVANCED REUSE)
   ============================================================ */

const Flyable = Base => class extends Base {
  fly() {
    console.log("Flying...");
  }
};

class Bird {}
class Eagle extends Flyable(Bird) {}

new Eagle().fly();



/* ============================================================
   15. UNDER THE HOOD: CLASS vs CONSTRUCTOR
   ============================================================ */
/*
  class Person { ... }
  
  is roughly equal to:

  function Person(name, age) {
    this.name = name;
    this.age = age;
  }
  Person.prototype.greet = function() {};
  
  ✔ Class is just cleaner syntax, but uses prototypes.
*/



/* ============================================================
   16. SUMMARY
   ============================================================ */
/*
  ✔ class = blueprint for objects (syntactic sugar)
  ✔ constructor() runs when creating instance
  ✔ methods go to prototype automatically
  ✔ static methods belong to the class (not object)
  ✔ extends → inheritance
  ✔ super() → call parent constructor/method
  ✔ private fields (#field)
  ✔ public fields
  ✔ getter & setter support
  ✔ classes = always strict mode

  MENTAL MODEL:
    → Classes are prettier wrappers around prototype-based inheritance.
    → Instances store data, prototypes store shared methods.
*/
