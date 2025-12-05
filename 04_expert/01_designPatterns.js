/****************************************************************************************
 * ADVANCED JAVASCRIPT DESIGN PATTERNS — COMPLETE & DETAILED GUIDE
 * (Module, Revealing Module, Observer, Singleton, Factory, Strategy, Decorator, etc.)
 ****************************************************************************************/


/*========================================================================================
 1. WHAT ARE DESIGN PATTERNS?
========================================================================================*/
//
// DESIGN PATTERNS = Reusable solutions to COMMON software problems.
//
// They provide:
// -------------
// ✅ Clean architecture
// ✅ Code reusability
// ✅ Maintainability
// ✅ Scalability
// ✅ Separation of concerns
//
// Categories:
// -----------
// ✅ Creational   → Object creation
// ✅ Structural   → Object composition
// ✅ Behavioral   → Communication between objects
//


/*========================================================================================
 2. MODULE PATTERN (FOUNDATION OF MODERN JS)
========================================================================================*/
//
// PROBLEM:
// --------
// Global variables cause:
// ❌ Name collisions
// ❌ Security issues
//
// MODULE PATTERN SOLUTION:
// ------------------------
// ✅ Data encapsulation
// ✅ Private variables
// ✅ Public API exposure
//
// Uses:
// -----
// ✅ Closures
//

const Module = (function () {
  // Private variables
  let counter = 0;

  // Private function
  function log(msg) {
    console.log("LOG:", msg);
  }

  // Public API
  return {
    increment() {
      counter++;
      log(counter);
    },
    reset() {
      counter = 0;
      log("reset");
    }
  };
})();

Module.increment();
Module.increment();
Module.reset();


/*========================================================================================
 3. REVEALING MODULE PATTERN
========================================================================================*/
//
// A cleaner version of Module Pattern
// -----------------------------------
// ✅ All logic defined privately
// ✅ Only selected functions are revealed
//

const RevealingModule = (function () {
  let count = 0;

  function increment() {
    count++;
    console.log(count);
  }

  function reset() {
    count = 0;
  }

  return {
    inc: increment,
    resetCounter: reset
  };
})();

RevealingModule.inc();
RevealingModule.resetCounter();


/*========================================================================================
 4. SINGLETON PATTERN (ONE INSTANCE ONLY)
========================================================================================*/
//
// Ensures:
// --------
// ✅ Only ONE instance exists
// ✅ Global access point
//

const Singleton = (function () {
  let instance;

  function createInstance() {
    return { name: "SingletonInstance" };
  }

  return {
    getInstance() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

const s1 = Singleton.getInstance();
const s2 = Singleton.getInstance();

console.log(s1 === s2); // true ✅


/*========================================================================================
 5. FACTORY PATTERN (OBJECT CREATION ABSTRACTION)
========================================================================================*/
//
// Used to create objects without exposing creation logic.
//

function UserFactory(type) {
  if (type === "admin") {
    return { role: "admin", permissions: ["all"] };
  } else if (type === "guest") {
    return { role: "guest", permissions: ["read"] };
  }
}

const admin = UserFactory("admin");
const guest = UserFactory("guest");


/*========================================================================================
 6. OBSERVER PATTERN (EVENT-BASED COMMUNICATION)
========================================================================================*/
//
// Used when:
// ----------
// ✅ Many listeners depend on ONE data source
//
// Example: State management, UI updates
//

class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(fn) {
    this.observers.push(fn);
  }

  unsubscribe(fn) {
    this.observers = this.observers.filter(o => o !== fn);
  }

  notify(data) {
    this.observers.forEach(fn => fn(data));
  }
}

const store = new Subject();

function logger(data) {
  console.log("Logger received:", data);
}

function uiUpdater(data) {
  console.log("UI updated with:", data);
}

store.subscribe(logger);
store.subscribe(uiUpdater);

store.notify("User Logged In");


/*========================================================================================
 7. PUB-SUB PATTERN (DECOUPLED OBSERVER)
========================================================================================*/
//
// Like Observer, but:
// -------------------
// ✅ Subscribers don't know the publisher
// ✅ Fully decoupled
//

const PubSub = {
  events: {},

  subscribe(event, fn) {
    this.events[event] = this.events[event] || [];
    this.events[event].push(fn);
  },

  publish(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(fn => fn(data));
    }
  }
};

PubSub.subscribe("login", data => console.log("Login detected:", data));
PubSub.publish("login", { user: "Rahul" });


/*========================================================================================
 8. STRATEGY PATTERN (DYNAMIC BEHAVIOR SELECTION)
========================================================================================*/
//
// Used when:
// ----------
// ✅ Multiple algorithms exist
// ✅ Behavior chosen at runtime
//

const PaymentStrategy = {
  creditCard: amount => amount + 20,
  paypal: amount => amount + 10,
  crypto: amount => amount - 5
};

function checkout(strategy, amount) {
  return strategy(amount);
}

console.log(checkout(PaymentStrategy.creditCard, 100));
console.log(checkout(PaymentStrategy.crypto, 100));


/*========================================================================================
 9. DECORATOR PATTERN (BEHAVIOR AUGMENTATION)
========================================================================================*/
//
// Adds new behavior without changing original function
//

function withAuth(fn) {
  return function (...args) {
    console.log("Auth checked");
    return fn(...args);
  };
}

function dashboard() {
  console.log("Dashboard Loaded");
}

const secureDashboard = withAuth(dashboard);
secureDashboard();


/*========================================================================================
 10. PROXY PATTERN (CONTROL ACCESS)
========================================================================================*/
//
// Used for:
// ---------
// ✅ Validation
// ✅ Logging
// ✅ Security
//

const user = { name: "Rahul", age: 25 };

const userProxy = new Proxy(user, {
  set(target, prop, value) {
    if (prop === "age" && value < 18) {
      throw new Error("Age must be 18+");
    }
    target[prop] = value;
    return true;
  }
});

userProxy.age = 30; // ✅ ok
// userProxy.age = 12; ❌ error


/*========================================================================================
 11. COMMAND PATTERN (ACTION ENCAPSULATION)
========================================================================================*/
//
// Encapsulates:
// -------------
// ✅ An action
// ✅ Its parameters
//

function Light() {
  this.on = () => console.log("Light ON");
  this.off = () => console.log("Light OFF");
}

function Switch(command) {
  this.run = command;
}

const light = new Light();
const switchOn = new Switch(light.on);
const switchOff = new Switch(light.off);

switchOn.run();
switchOff.run();


/*========================================================================================
 12. CHAIN OF RESPONSIBILITY PATTERN
========================================================================================*/
//
// Passes request through multiple handlers
//

function Handler(fn, next) {
  this.handle = function (data) {
    fn(data);
    if (next) next.handle(data);
  };
}

const h1 = new Handler(d => console.log("Auth:", d),
           new Handler(d => console.log("Log:", d),
           new Handler(d => console.log("Response:", d))));

h1.handle("Request Incoming");


/*========================================================================================
 13. MVC / MVVM (ARCHITECTURAL PATTERNS)
========================================================================================*/
//
// MVC:
// ----
// Model → Data
// View → UI
// Controller → Business logic
//
// MVVM:
// -----
// Model → Data
// View → UI
// ViewModel → Data binding layer
//
// Used by:
// --------
// ✅ React → MVVM pattern
// ✅ Angular → MVC + MVVM mix
// ✅ Vue → MVVM
//


/*========================================================================================
 14. COMMON INTERVIEW COMPARISON
========================================================================================*/
//
// MODULE vs REVEALING MODULE:
// ----------------------------
// Module → Manual exposure
// Revealing Module → Cleaner API mapping
//
// OBSERVER vs PUB-SUB:
// --------------------
// Observer → Tightly coupled
// Pub-Sub → Fully decoupled
//
// FACTORY vs SINGLETON:
// ---------------------
// Factory → Object creation
// Singleton → Single instance control
//


/*========================================================================================
 15. WHEN TO USE WHICH PATTERN
========================================================================================*/
//
// MODULE → Encapsulation
// SINGLETON → Global config, DB connection
// FACTORY → Object creation
// OBSERVER → State updates
// PUB-SUB → Event systems
// STRATEGY → Payment methods, sorting algorithms
// DECORATOR → Logging, auth, validation
// PROXY → Security, validation, tracking
// COMMAND → Undo/Redo systems
//


/*========================================================================================
 16. PERFORMANCE CONSIDERATIONS
========================================================================================*/
//
// ❌ Too many patterns → Over-engineering
// ❌ Proxy & Decorators → JIT deoptimization
// ✅ Patterns improve maintainability more than raw performance
//


/*========================================================================================
 17. FINAL MASTER SUMMARY
========================================================================================*/
//
// ✅ Module → Encapsulation
// ✅ Revealing Module → Cleaner encapsulation
// ✅ Singleton → One instance only
// ✅ Factory → Object creation abstraction
// ✅ Observer → Reactive updates
// ✅ Pub-Sub → Fully decoupled messaging
// ✅ Strategy → Algorithm swapping
// ✅ Decorator → Behavior enhancement
// ✅ Proxy → Access control
// ✅ Command → Action encapsulation
// ✅ MVC/MVVM → Architectural separation
//
// If you master these ✅
// → You can design FRAMEWORK-LEVEL & ENTERPRISE-SCALE JavaScript systems 🚀

