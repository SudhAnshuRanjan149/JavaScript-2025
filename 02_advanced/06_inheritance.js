/*
  INHERITANCE IN JAVASCRIPT (ES6 CLASSES + PROTOTYPE) — DETAILED EXPLANATION
  -------------------------------------------------------------------------
  ✔ JavaScript uses PROTOTYPAL INHERITANCE
  ✔ ES6 classes provide a cleaner syntax for the same mechanism
  ✔ Inheritance = one object/class gets properties & methods from another
*/



/* ========================================================================
   1. PROTOTYPAL INHERITANCE (OLD / CORE JS)
   ======================================================================== */
/*
  ✔ Every object has a hidden link: [[Prototype]]
  ✔ If a property is not found in the object → JS looks in the prototype
*/

const animal = {
  eat() { console.log("Eating..."); }
};

const dog = Object.create(animal);
dog.bark = function () { console.log("Barking..."); };

dog.eat();  // inherited from animal
dog.bark();



/* ========================================================================
   2. CHAINING MULTIPLE PROTOTYPES
   ======================================================================== */

const living = {
  breathe() { console.log("Breathing..."); }
};

const creature = Object.create(living);
creature.walk = function () { console.log("Walking..."); };

const human = Object.create(creature);
human.talk = function () { console.log("Talking..."); };

human.breathe();  // from living
human.walk();     // from creature
human.talk();     // own



/* ========================================================================
   3. INHERITANCE USING CONSTRUCTOR FUNCTIONS (ES5 STYLE)
   ======================================================================== */

function Animal(type) {
  this.type = type;
}

Animal.prototype.makeSound = function () {
  console.log("Some sound...");
};

function Dog(name) {
  Animal.call(this, "Dog");   // inherit properties
  this.name = name;
}

Dog.prototype = Object.create(Animal.prototype); // inherit methods
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function () {
  console.log("Woof!");
};

const d1 = new Dog("Bruno");

d1.makeSound(); // inherited
d1.bark();



/* ========================================================================
   4. HOW THE PROTOTYPE CHAIN LOOKS HERE
   ======================================================================== */
/*
    d1
      ↓
    Dog.prototype
      ↓
    Animal.prototype
      ↓
    Object.prototype
      ↓
    null
*/



/* ========================================================================
   5. ES6 CLASS INHERITANCE (MODERN & CLEAN)
   ======================================================================== */

class Animal2 {
  constructor(type) {
    this.type = type;
  }

  makeSound() {
    console.log("Animal making sound...");
  }
}

class Dog2 extends Animal2 {
  constructor(name) {
    super("Dog");     // call parent constructor
    this.name = name;
  }

  bark() {
    console.log(`${this.name} says Woof!`);
  }
}

const d2 = new Dog2("Tommy");

d2.makeSound(); // inherited
d2.bark();



/* ========================================================================
   6. super() KEYWORD IN DETAIL
   ======================================================================== */
/*
  ✔ super() inside constructor calls the parent constructor
  ✔ super.method() calls the parent method
*/

class Parent {
  greet() {
    console.log("Hello from parent");
  }
}

class Child extends Parent {
  greet() {
    super.greet(); // parent method
    console.log("Hello from child");
  }
}

new Child().greet();



/* ========================================================================
   7. METHOD OVERRIDING (ES6)
   ======================================================================== */

class Vehicle {
  start() { console.log("Vehicle starting..."); }
}

class Car extends Vehicle {
  start() { console.log("Car starting..."); } // override
}

new Car().start();



/* ========================================================================
   8. STATIC INHERITANCE
   ======================================================================== */

class A {
  static hello() { console.log("Hello from A"); }
}

class B extends A {}

B.hello(); // B inherits static methods too



/* ========================================================================
   9. PRIVATE FIELDS + INHERITANCE
   ======================================================================== */

class Animal3 {
  #id = 101; // private

  getId() {
    return this.#id;
  }
}

class Dog3 extends Animal3 {}

const d3 = new Dog3();
console.log(d3.getId());
// d3.#id ❌ cannot access private



/* ========================================================================
   10. MIXINS – MULTIPLE INHERITANCE (WORK-AROUND)
   ======================================================================== */
/*
  ✔ JS does NOT support multiple inheritance
  ✔ Mixins allow combining multiple behaviors
*/

const CanFly = Base => class extends Base {
  fly() { console.log("Flying..."); }
};

const CanSwim = Base => class extends Base {
  swim() { console.log("Swimming..."); }
};

class AnimalX {}

class Duck extends CanSwim(CanFly(AnimalX)) {}

const duck = new Duck();
duck.fly();
duck.swim();



/* ========================================================================
   11. KEY DIFFERENCES — CLASS vs PROTOTYPE INHERITANCE
   ======================================================================== */
/*
  ✔ ES6 classes are syntax sugar for prototypes
  ✔ Under the hood: class Dog extends Animal → uses prototype chain

  PROTOTYPE:
      - very flexible
      - can inherit from any object
      - uses Object.create()

  CLASS:
      - cleaner syntax
      - uses extends + super
      - built for readability
*/



/* ========================================================================
   12. SUMMARY
   ======================================================================== */
/*
  ✔ JS inheritance is ALWAYS prototype-based.
  ✔ ES6 classes make inheritance easier to write.
  ✔ Prototype chain = object → parent → grandparent → ... → null

  INHERITANCE TYPES:
    1. Object.create()                   → direct prototypal inheritance
    2. Constructor functions + prototype → ES5 OOP
    3. ES6 classes + extends             → modern inheritance
    4. Mixins                            → pseudo-multiple inheritance

  MENTAL MODEL:
    → Objects in JavaScript don’t copy behavior.
    → They reference behavior through their prototype chain.
*/
