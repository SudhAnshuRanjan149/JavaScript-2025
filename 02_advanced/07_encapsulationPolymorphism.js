/*
  ENCAPSULATION & POLYMORPHISM IN JAVASCRIPT (OOP CONCEPTS)
  ---------------------------------------------------------
  ✔ JS is not class-based like Java/C++, but ES6 Classes + Prototype
    allow us to implement OOP concepts clearly.
*/



/* ============================================================
   1. ENCAPSULATION
   ============================================================
   ✔ Encapsulation = binding data + methods inside an object.
   ✔ Hiding internal details and exposing only what is necessary.
   ✔ Helps:
        - protect data
        - control access
        - prevent accidental changes
   ✔ Implemented using:
        - public fields
        - private fields (#)
        - getters & setters
*/



/* ------------------------------------------------------------
   A) PUBLIC FIELDS (anyone can access)
   ------------------------------------------------------------ */

class UserPublic {
  name = "Guest"; // publicly accessible

  show() {
    console.log(`Name: ${this.name}`);
  }
}

const u1 = new UserPublic();
u1.name = "Alice"; // public → freely accessible
u1.show();



/* ------------------------------------------------------------
   B) PRIVATE FIELDS (#field)
   ------------------------------------------------------------
   ✔ Introduced in ES2022
   ✔ Private fields cannot be accessed outside the class.
*/

class BankAccount {
  #balance = 0;  // private

  deposit(amount) {
    if (amount > 0) this.#balance += amount;
  }

  getBalance() {
    return this.#balance; // controlled access
  }
}

const acc = new BankAccount();
acc.deposit(100);
console.log(acc.getBalance()); // 100

// acc.#balance ❌ error (private field)



/* ------------------------------------------------------------
   C) GETTERS & SETTERS — Control access to internal data
   ------------------------------------------------------------ */

class Product {
  #price;

  constructor(price) {
    this.#price = price;
  }

  get price() {
    return this.#price;
  }

  set price(value) {
    if (value < 0) {
      console.log("Invalid price");
      return;
    }
    this.#price = value;
  }
}

const p = new Product(50);
console.log(p.price);

p.price = -20; // Invalid
p.price = 200; // OK
console.log(p.price);



/* ------------------------------------------------------------
   ENCAPSULATION SUMMARY
   ------------------------------------------------------------
   ✔ Encapsulation hides internal data
   ✔ Only exposes controlled interfaces
   ✔ Achieved through:
        - private fields (#)
        - getters/setters
        - methods controlling access
*/





/* ============================================================
   2. POLYMORPHISM
   ============================================================
   ✔ Polymorphism = same method name, different behavior.
   ✔ Two types:
        1. Method Overriding (common & supported)
        2. Method Overloading (NOT natively supported in JS)
*/



/* ------------------------------------------------------------
   A) METHOD OVERRIDING (SUPPORTED)
   ------------------------------------------------------------
   ✔ Child class provides its own version of parent method.
*/

class Animal {
  speak() {
    console.log("Animal speaking...");
  }
}

class Dog extends Animal {
  speak() {
    console.log("Dog barks: Woof!");
  }
}

class Cat extends Animal {
  speak() {
    console.log("Cat meows: Meow!");
  }
}

const animals = [new Dog(), new Cat()];

animals.forEach(a => a.speak());
/*
  Polymorphism:
    → speak() behaves differently depending on object type.
*/



/* ------------------------------------------------------------
   B) METHOD OVERLOADING (NOT TRUE IN JS, but SIMULATED)
   ------------------------------------------------------------
   ✔ JS does NOT support overloading like Java
   ✔ BUT we can simulate using default params & rest params
*/

function sum(a, b, c) {
  return [a, b, c].filter(n => n !== undefined).reduce((x, y) => x + y, 0);
}

console.log(sum(10, 20));     // 30
console.log(sum(10, 20, 30)); // 60

/*
  same function handles different numbers of arguments → pseudo overloading
*/



/* ------------------------------------------------------------
   C) POLYMORPHISM USING PROTOTYPES
   ------------------------------------------------------------ */

function Shape() {}
Shape.prototype.draw = function () {
  console.log("Drawing shape...");
};

function Circle() {}
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.draw = function () {
  console.log("Drawing circle...");
};

function Square() {}
Square.prototype = Object.create(Shape.prototype);
Square.prototype.draw = function () {
  console.log("Drawing square...");
};

const shapes = [new Circle(), new Square()];

shapes.forEach(s => s.draw());
/*
  Each object responds differently to draw() → polymorphism
*/



/* ------------------------------------------------------------
   D) POLYMORPHISM WITH DUCK TYPING (JS STYLE)
   ------------------------------------------------------------
   ✔ JS uses "duck typing":
        If it walks like a duck & quacks like a duck → treat it as a duck.
*/

const printer = {
  print() {
    console.log("Printer printing...");
  }
};

const pdf = {
  print() {
    console.log("PDF printing...");
  }
};

function printDocument(doc) {
  doc.print(); // polymorphic call
}

printDocument(printer);
printDocument(pdf);



/* ============================================================
   3. ENCAPSULATION + POLYMORPHISM TOGETHER
   ============================================================ */

class Employee {
  constructor(name) {
    this.name = name;
  }

  calculateSalary() {
    return 0;
  }
}

class Developer extends Employee {
  calculateSalary() {
    return 5000;
  }
}

class Manager extends Employee {
  calculateSalary() {
    return 8000;
  }
}

const staff = [new Developer("A"), new Manager("B")];

staff.forEach(e => {
  console.log(`${e.name} salary: ${e.calculateSalary()}`);
});

/*
  ✔ Polymorphism: calculateSalary() behaves differently
  ✔ Encapsulation: salary logic is hidden inside each class
*/



/* ============================================================
   SUMMARY
   ============================================================
   ENCAPSULATION:
     ✔ Hide internal details
     ✔ Use:
         - private fields (#field)
         - getters / setters
         - controlled methods

   POLYMORPHISM:
     ✔ One method name → multiple behaviors
     ✔ Achieved through:
         - method overriding (main)
         - simulated overloading (default/rest params)
         - duck typing

   MENTAL MODEL:
     → Encapsulation = “Keep secrets inside the object.”
     → Polymorphism = “Same request, different responses.”
*/
