/****************************************************************************************
 * PROXY & REFLECT IN JAVASCRIPT — COMPLETE & DETAILED GUIDE (BEGINNER → ADVANCED)
 *
 * Covers:
 * ✅ What is Proxy?
 * ✅ All Proxy Traps
 * ✅ Use Cases
 * ✅ Proxy vs Object.defineProperty
 * ✅ What is Reflect?
 * ✅ Reflect Methods
 * ✅ Why Proxy + Reflect are used together
 * ✅ Real-world patterns
 * ✅ Interview questions & traps
 ****************************************************************************************/


/*========================================================================================
 1. WHAT IS A PROXY IN JAVASCRIPT?
========================================================================================*/
//
// A Proxy is an object that WRAPS another object
// and allows you to:
// ------------------
// ✅ Intercept operations
// ✅ Customize default behavior
// ✅ Add validation
// ✅ Add logging
// ✅ Add security
// ✅ Create reactive systems (Vue 3, MobX, etc.)
//
// Think of a Proxy as a SECURITY GUARD between:
// ---------------------------------------------
//    USER  →  PROXY  →  REAL OBJECT
//

// BASIC SYNTAX:
const proxy = new Proxy(targetObject, handlerObject);


/*========================================================================================
 2. BASIC PROXY EXAMPLE (get & set trap)
========================================================================================*/

const user = {
  name: "Rahul",
  age: 25
};

const proxyUser = new Proxy(user, {
  get(target, property) {
    console.log("Getting:", property);
    return target[property];
  },
  set(target, property, value) {
    console.log("Setting:", property, value);
    target[property] = value;
    return true; // must return true
  }
});

console.log(proxyUser.name);   // Triggers GET trap
proxyUser.age = 30;            // Triggers SET trap


/*========================================================================================
 3. WHY PROXY IS POWERFUL
========================================================================================*/
//
// Without Proxy → JS objects are PASSIVE
// With Proxy → JS objects become ACTIVE & REACTIVE
//
// You can:
// ---------
// ✔ Validate data
// ✔ Prevent illegal access
// ✔ Track changes
// ✔ Simulate private properties
// ✔ Build frameworks
// ✔ Create virtualized objects
// ✔ Secure APIs


/*========================================================================================
 4. ALL PROXY TRAPS (FULL LIST)
========================================================================================*/
//
// property access:
// ----------------
// 1. get
// 2. set
//
// property checking:
// ------------------
// 3. has                  → `in` operator
//
// property deletion:
// ------------------
// 4. deleteProperty
//
// iteration:
// ----------
// 5. ownKeys
//
// property descriptor:
// --------------------
// 6. getOwnPropertyDescriptor
// 7. defineProperty
//
// object control:
// ---------------
// 8. preventExtensions
// 9. isExtensible
//
// prototype control:
// -------------------
// 10. getPrototypeOf
// 11. setPrototypeOf
//
// function control:
// -----------------
// 12. apply
// 13. construct



/*========================================================================================
 5. IMPORTANT PROXY TRAP EXAMPLES
========================================================================================*/


// ✅ GET TRAP (Read Interception)
const getProxy = new Proxy({ x: 10 }, {
  get(target, prop) {
    return prop in target ? target[prop] : "Property not found";
  }
});

console.log(getProxy.x);   // 10
console.log(getProxy.y);   // "Property not found"


// ✅ SET TRAP (Validation)
const validator = new Proxy({}, {
  set(target, prop, value) {
    if (typeof value !== "number") {
      throw new Error("Only numbers allowed");
    }
    target[prop] = value;
    return true;
  }
});

validator.age = 25;    // ✅ OK
// validator.age = "hi"; ❌ Error


// ✅ HAS TRAP (`in` keyword)
const hasProxy = new Proxy({ a: 1 }, {
  has(target, prop) {
    return prop === "a";
  }
});

console.log("a" in hasProxy); // true
console.log("b" in hasProxy); // false


// ✅ DELETE PROPERTY
const deleteProxy = new Proxy({ secret: 123 }, {
  deleteProperty(target, prop) {
    console.log("Deleting:", prop);
    delete target[prop];
    return true;
  }
});

delete deleteProxy.secret;


// ✅ APPLY TRAP (Function Proxy)
function sum(a, b) {
  return a + b;
}

const sumProxy = new Proxy(sum, {
  apply(target, thisArg, args) {
    console.log("Function called with:", args);
    return target(...args);
  }
});

sumProxy(10, 20);


// ✅ CONSTRUCT TRAP (new keyword)
class Person {
  constructor(name) {
    this.name = name;
  }
}

const PersonProxy = new Proxy(Person, {
  construct(target, args) {
    console.log("Creating object with:", args);
    return new target(...args);
  }
});

const p = new PersonProxy("Rahul");


/*========================================================================================
 6. PROXY VS OBJECT.DEFINEPROPERTY (VERY IMPORTANT)
========================================================================================*/
//
// Object.defineProperty:
// ----------------------
// ✅ Works only on EXISTING properties
// ❌ Cannot detect property addition / deletion
// ❌ Needs one call per property
//
// Proxy:
// ------
// ✅ Works on ENTIRE object
// ✅ Detects new properties
// ✅ Detects deletes
// ✅ Cleaner syntax
// ✅ Used in modern frameworks (Vue 3)
//
// Vue 2 used defineProperty ❌
// Vue 3 uses Proxy ✅


/*========================================================================================
 7. REAL-WORLD USE CASES OF PROXY
========================================================================================*/
//
// ✅ Data validation
// ✅ State management
// ✅ Logging & debugging
// ✅ API protection
// ✅ Access control
// ✅ Reactive frameworks
// ✅ ORM modeling
// ✅ Virtual DOM engines
// ✅ Lazy loading objects


/*========================================================================================
 8. WHAT IS REFLECT IN JAVASCRIPT?
========================================================================================*/
//
// Reflect is a built-in object that provides:
// ------------------------------------------
// ✅ Safe, standardized ways to perform object operations
// ✅ Same operations that Proxy traps intercept
//
// Think of Reflect as:
// --------------------
// A STANDARD API for low-level JS operations
//

// Example:
Reflect.get(obj, key);
Reflect.set(obj, key, value);


/*========================================================================================
 9. WHY REFLECT EXISTS?
========================================================================================*/
//
// Before Reflect:
obj[key] = value;          // may silently fail
delete obj[key];           // unclear result
Object.defineProperty();   // throws error
//
// After Reflect:
Reflect.set(obj, key, val);        // returns true/false
Reflect.deleteProperty(obj, key); // returns true/false
//
// ✅ Predictable behavior
// ✅ Functional API
// ✅ Matches Proxy traps exactly
// ✅ Error handling consistency


/*========================================================================================
 10. MOST IMPORTANT REFLECT METHODS
========================================================================================*/
//
// Reflect.get(target, prop)
// Reflect.set(target, prop, value)
// Reflect.has(target, prop)
// Reflect.deleteProperty(target, prop)
// Reflect.construct(Class, args)
// Reflect.apply(fn, thisArg, args)
// Reflect.ownKeys(obj)
// Reflect.getPrototypeOf(obj)
// Reflect.setPrototypeOf(obj)


/*========================================================================================
 11. WHY PROXY + REFLECT ARE USED TOGETHER
========================================================================================*/
//
// ✅ Proxy intercepts
// ✅ Reflect performs the DEFAULT behavior safely
//
// ❗ Best Practice:
//
// Instead of:
target[prop] = value;
//
// Use:
Reflect.set(target, prop, value);
//
// Instead of:
return target[prop];
//
// Use:
return Reflect.get(target, prop);
//

const safeProxy = new Proxy({ x: 1 }, {
  get(target, prop) {
    console.log("GET:", prop);
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    console.log("SET:", prop, value);
    return Reflect.set(target, prop, value);
  }
});


/*========================================================================================
 12. PROXY FOR PRIVATE VARIABLES
========================================================================================*/
//
// JS does not have true private props for objects (without #).
// Proxy can simulate private access.
//

const secureUser = new Proxy(
  { name: "Rahul", password: "12345" },
  {
    get(target, prop) {
      if (prop === "password") {
        throw new Error("Access Denied");
      }
      return target[prop];
    }
  }
);

console.log(secureUser.name);      // ✅ Allowed
// console.log(secureUser.password); ❌ Error


/*========================================================================================
 13. PROXY FOR ARRAY VALIDATION
========================================================================================*/

const safeArray = new Proxy([], {
  set(target, prop, value) {
    if (typeof value !== "number") {
      throw new Error("Only numbers allowed");
    }
    target[prop] = value;
    return true;
  }
});

safeArray.push(10);
// safeArray.push("A"); ❌ Error


/*========================================================================================
 14. REFLECT WITH FUNCTIONS (apply)
========================================================================================*/

function multiply(a, b) {
  return a * b;
}

const result = Reflect.apply(multiply, null, [4, 5]);
console.log(result); // 20


/*========================================================================================
 15. REFLECT WITH CLASSES (construct)
========================================================================================*/

class Car {
  constructor(name) {
    this.name = name;
  }
}

const car = Reflect.construct(Car, ["BMW"]);
console.log(car.name);


/*========================================================================================
 16. PROXY LIMITATIONS & DANGERS
========================================================================================*/
//
// ❌ Performance overhead
// ❌ Debugging can be harder
// ❌ Reference equality breaks
// ❌ JSON.stringify ignores Proxy traps
// ❌ WeakMap cannot use Proxy as weak key safely in some cases


/*========================================================================================
 17. PROXY vs GETTER/SETTER
========================================================================================*/
//
// Getter/Setter:
// --------------
// ✅ Per property
// ❌ Cannot intercept delete
// ❌ Cannot intercept new props
//
// Proxy:
// ------
// ✅ Global interception
// ✅ Intercepts add/delete
// ✅ Applies to entire object


/*========================================================================================
 18. COMMON INTERVIEW QUESTIONS
========================================================================================*/
//
// Q1: What is Proxy used for?
// ✅ To intercept & customize object behavior
//
// Q2: Difference between Map and Proxy?
// ✅ Map stores data, Proxy intercepts operations
//
// Q3: Proxy vs defineProperty?
// ✅ Proxy handles full object operations
//
// Q4: Why do Proxy traps return true?
// ✅ To confirm successful operation
//
// Q5: Why use Reflect inside Proxy?
// ✅ Safe default behavior


/*========================================================================================
 19. FINAL MASTER SUMMARY
========================================================================================*/
//
// ✅ Proxy is an INTERCEPTOR
// ✅ Reflect is a SAFE OPERATOR API
// ✅ Used together → clean, standard behavior
// ✅ Proxy enables:
//    • Validation
//    • Security
//    • Reactivity
//    • Access control
//    • Virtualization
//
// ✅ Reflect prevents silent failures
//
// Proxy + Reflect = LOW-LEVEL POWER TO CONTROL JS ITSELF 🚀

