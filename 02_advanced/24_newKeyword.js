/****************************************************************************************
 * THE `new` KEYWORD IN JAVASCRIPT — COMPLETE & DETAILED EXPLANATION
 ****************************************************************************************/


/*========================================================================================
 1. WHAT IS THE `new` KEYWORD?
========================================================================================*/
//
// The `new` keyword is used to create an instance (object) from a constructor function
// or a class.
//
// In simple words:
// ----------------
// `new` is used to:
// ✅ Create a brand new object
// ✅ Attach a prototype to it
// ✅ Bind `this` to the new object
// ✅ Return the object automatically
//
// Example:
//
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const p1 = new Person("Alice", 25);


/*========================================================================================
 2. WHAT EXACTLY HAPPENS INTERNALLY WHEN YOU USE `new`
========================================================================================*/
//
// When you write:
// ----------------
// const obj = new Constructor(arg1, arg2);
//
// JavaScript performs these 4 INTERNAL STEPS:
//
// STEP 1 → A new empty object is created:
//
//     const obj = {};
//
// STEP 2 → The prototype of the new object is linked:
//
//     obj.__proto__ = Constructor.prototype
//
// STEP 3 → The constructor function is called with `this` bound to obj:
//
//     Constructor.call(obj, arg1, arg2)
//
// STEP 4 → The newly created object is returned automatically:
//
//     return obj;
//
// If the constructor returns an object manually → that object is returned instead.
// If it returns a primitive → ignored, and `this` is returned.
//

/*----------------------------------------------------------------------------------------
 INTERNAL SIMULATION OF `new`
----------------------------------------------------------------------------------------*/

function customNew(Constructor, ...args) {
  const obj = {}; // Step 1
  Object.setPrototypeOf(obj, Constructor.prototype); // Step 2
  const result = Constructor.apply(obj, args); // Step 3
  return (typeof result === "object" && result !== null) ? result : obj; // Step 4
}


/*========================================================================================
 3. `new` WITH CONSTRUCTOR FUNCTION
========================================================================================*/

function Car(brand, speed) {
  this.brand = brand;
  this.speed = speed;

  this.drive = function () {
    console.log(this.brand + " is driving at " + this.speed + " km/h");
  };
}

const car1 = new Car("BMW", 200);
const car2 = new Car("Tesla", 260);

// Each object gets its own copy of methods (memory inefficient)
car1.drive();
car2.drive();


/*========================================================================================
 4. PROTOTYPE + `new` (MEMORY OPTIMIZATION)
========================================================================================*/
//
// Instead of adding methods inside constructor, add them to prototype
// so all instances share the same function in memory.
//

function User(name) {
  this.name = name;
}

User.prototype.sayHello = function () {
  console.log("Hello, I am " + this.name);
};

const u1 = new User("Rahul");
const u2 = new User("Aman");

// Both u1 and u2 point to the same sayHello method
u1.sayHello();
u2.sayHello();


/*========================================================================================
 5. `new` WITH ES6 CLASSES (Syntactic Sugar)
========================================================================================*/
//
// Classes are just a cleaner way to write constructor + prototype internally.
//

class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(this.name + " makes a sound");
  }
}

const dog = new Animal("Dog");
dog.speak();


/*========================================================================================
 6. WHAT HAPPENS IF YOU FORGET `new`?
========================================================================================*/
//
// If you forget to use `new` when calling a constructor function:
//
// ❌ `this` will point to:
//     → global object (in non-strict mode)
//     → undefined (in strict mode → ERROR)
//
// Example:
//
function Student(name) {
  this.name = name;
}

// ❌ WRONG (forgot new)
const s1 = Student("Rahul"); // `this` = window (or undefined in strict mode)
console.log(window.name);   // Rahul → bug!

// ✅ CORRECT
const s2 = new Student("Aman");


/*========================================================================================
 7. RETURN BEHAVIOR IN `new`
========================================================================================*/
//
// CASE 1 → Constructor returns nothing → `this` is returned automatically ✅
//
// CASE 2 → Constructor returns an object → that object is returned ❗
//
// CASE 3 → Constructor returns a primitive → ignored, `this` is returned ✅
//

function Test1() {
  this.x = 10;
}

function Test2() {
  this.x = 10;
  return { y: 20 };
}

function Test3() {
  this.x = 10;
  return 100; // primitive ignored
}

console.log(new Test1()); // { x: 10 }
console.log(new Test2()); // { y: 20 }
console.log(new Test3()); // { x: 10 }


/*========================================================================================
 8. `new` + PROTOTYPE CHAIN
========================================================================================*/
//
// When you use `new`, the created object gets access to methods via prototype chain.
//
// Example:
//
function A() {}
A.prototype.x = 100;

const a1 = new A();

console.log(a1.x); // 100 (found via prototype)


/*========================================================================================
 9. `new` VS OBJECT LITERALS
========================================================================================*/
//
// OBJECT LITERAL:
const obj1 = { name: "A" };

// CONSTRUCTOR + new:
function Obj(name) {
  this.name = name;
}
const obj2 = new Obj("B");

// Differences:
// -----------
// • `new` creates objects with prototype chaining
// • Object literal creates direct object
// • `new` is used when multiple instances needed


/*========================================================================================
 10. `new` WITH BUILT-IN CONSTRUCTORS
========================================================================================*/
//
// All these internally use `new`:
//
const arr = new Array(1, 2, 3);
const date = new Date();
const map = new Map();
const set = new Set();
const reg = new RegExp("abc");


/*========================================================================================
 11. `new.target` (ADVANCED)
========================================================================================*/
//
// `new.target` tells whether a function was called using `new`.
//

function Demo() {
  if (!new.target) {
    throw new Error("Must be called with new");
  }
  this.value = 10;
}

const d = new Demo(); // OK
// Demo(); ❌ ERROR


/*========================================================================================
 12. COMMON INTERVIEW QUESTIONS ON `new`
========================================================================================*/
//
// Q1: What does `new` do internally?
// ✅ Creates object, sets prototype, binds `this`, returns object
//
// Q2: What happens if constructor returns an object?
// ✅ That object replaces `this`
//
// Q3: Difference between class and constructor?
// ✅ Classes are syntactic sugar over constructor + prototype
//
// Q4: Does `new` work with arrow functions?
// ❌ NO — Arrow functions do NOT have their own `this` or prototype
//
const Arrow = () => {};
// new Arrow(); ❌ TypeError: Arrow is not a constructor


/*========================================================================================
 13. FINAL SUMMARY
========================================================================================*/
//
// ✅ `new` creates a new object
// ✅ Links prototype
// ✅ Binds `this` to the new object
// ✅ Calls constructor
// ✅ Returns the object
//
// ❌ Cannot be used with arrow functions
// ❌ Forgetting `new` causes bugs
// ✅ Classes internally use `new`
//
// `new` is one of the MOST IMPORTANT concepts for:
// ------------------------------------------------
// ✔ Object-oriented JavaScript
// ✔ Prototypes
// ✔ Classes
// ✔ Memory optimization
// ✔ Interview questions

