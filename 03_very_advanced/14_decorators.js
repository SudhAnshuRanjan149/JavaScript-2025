/****************************************************************************************
 * DECORATORS IN JAVASCRIPT — COMPLETE & DETAILED GUIDE (BEGINNER → ADVANCED)
 *
 * Covers:
 * ✅ What decorators are
 * ✅ Why decorators exist
 * ✅ Decorator concept vs proposal
 * ✅ Function decorators (pattern)
 * ✅ Class decorators
 * ✅ Method decorators
 * ✅ Property decorators
 * ✅ Parameter decorators (concept)
 * ✅ How decorators work internally
 * ✅ Real-world use cases
 * ✅ TypeScript & JS decorators
 * ✅ Interview traps
 ****************************************************************************************/


/*========================================================================================
 1. WHAT IS A DECORATOR?
========================================================================================*/
//
// A DECORATOR is a special function that:
// ---------------------------------------
// ✅ Wraps another function, class, or property
// ✅ Modifies or enhances its behavior
// ✅ Without changing the original source code
//
// In simple words:
// ----------------
// 👉 A decorator ADDS EXTRA POWER to existing code
//
// Example in real life:
// ---------------------
// Coffee → plain
// Coffee + milk → decorated coffee
// Coffee + milk + sugar → further decorated
//
// Same idea in JavaScript 🚀
//


// NORMAL FUNCTION:
function add(a, b) {
  return a + b;
}

// DECORATED FUNCTION:
function addWithLogging(a, b) {
  console.log("Calling add");
  return add(a, b);
}


/*========================================================================================
 2. WHY DECORATORS EXIST
========================================================================================*/
//
// Without decorators, we must:
// ----------------------------
// ❌ Manually add logging everywhere
// ❌ Repeat validation logic
// ❌ Repeat authorization checks
// ❌ Repeat performance tracking
//
// With decorators, we can:
// -------------------------
// ✅ Add behavior ONCE
// ✅ Reuse everywhere
// ✅ Keep original logic clean
//
// Used heavily in:
// ----------------
// ✅ Frameworks (Angular, NestJS)
// ✅ ORMs (TypeORM, Sequelize)
// ✅ Validation systems
// ✅ Logging systems
// ✅ Security systems
// ✅ Dependency Injection
//


/*========================================================================================
 3. DECORATORS IN JAVASCRIPT — STATUS (IMPORTANT)
========================================================================================*/
//
// ⚠️ As of now:
// -------------
// ✅ Decorators are a PROPOSAL in JavaScript
// ✅ Fully supported in TypeScript
// ✅ Used in frameworks via transpilers (Babel, TS)
//
// That means:
// -----------
// ❌ You cannot safely use decorators in pure vanilla JS without build tools
// ✅ But the CONCEPT & PATTERN is heavily tested in interviews
//


/*========================================================================================
 4. FUNCTION DECORATORS (PURE JAVASCRIPT PATTERN)
========================================================================================*/
//
// This is the MOST IMPORTANT decorator pattern for JS interviews.
//

function withLogging(fn) {
  return function (...args) {
    console.log("Arguments:", args);
    const result = fn(...args);
    console.log("Result:", result);
    return result;
  };
}

function multiply(a, b) {
  return a * b;
}

const decoratedMultiply = withLogging(multiply);

decoratedMultiply(3, 4);
// Logs args + result without changing original function ✅


/*========================================================================================
 5. MULTIPLE DECORATORS (DECORATOR COMPOSITION)
========================================================================================*/

function withTiming(fn) {
  return function (...args) {
    console.time("Execution Time");
    const result = fn(...args);
    console.timeEnd("Execution Time");
    return result;
  };
}

const smartMultiply = withTiming(withLogging(multiply));

smartMultiply(5, 6);


/*========================================================================================
 6. DECORATORS FOR VALIDATION
========================================================================================*/

function requireNumber(fn) {
  return function (...args) {
    if (args.some((x) => typeof x !== "number")) {
      throw new Error("Only numbers allowed");
    }
    return fn(...args);
  };
}

const safeAdd = requireNumber(add);

safeAdd(2, 3);     // ✅ ok
// safeAdd(2, "A"); ❌ error


/*========================================================================================
 7. CLASS DECORATORS (CONCEPT)
========================================================================================*/
//
// A CLASS DECORATOR receives the class constructor and can:
// ---------------------------------------------------------
// ✅ Modify it
// ✅ Replace it
// ✅ Extend it
//
// TypeScript-style:
// -----------------
// @sealed
// class User {}
//
// Pure JS Pattern:
//

function sealed(ClassConstructor) {
  Object.seal(ClassConstructor);
  Object.seal(ClassConstructor.prototype);
}

class Demo {}

sealed(Demo);  // Now Demo class is sealed ✅

Demo.prototype.x = 10; // ❌ not allowed in strict mode


/*========================================================================================
 8. METHOD DECORATORS (CONCEPT USING DESCRIPTORS)
========================================================================================*/
//
// A method decorator modifies class methods using property descriptors
//

function logMethod(target, methodName, descriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args) {
    console.log("Calling:", methodName);
    return originalMethod.apply(this, args);
  };

  return descriptor;
}

/*--- TypeScript Equivalent ---
class User {
  @logMethod
  login() {
    console.log("User logged in");
  }
}
---*/

/*--- Pure JS Descriptor Simulation ---*/

class User {
  login() {
    console.log("User logged in");
  }
}

const descriptor = Object.getOwnPropertyDescriptor(User.prototype, "login");
logMethod(User.prototype, "login", descriptor);
Object.defineProperty(User.prototype, "login", descriptor);

const u = new User();
u.login();


/*========================================================================================
 9. PROPERTY DECORATORS (CONCEPT)
========================================================================================*/
//
// Used for:
// ---------
// ✅ Validation
// ✅ Read-only fields
// ✅ Dependency Injection
//

function readOnly(target, key) {
  Object.defineProperty(target, key, {
    writable: false
  });
}

class Config {
  constructor() {
    this.apiKey = "SECRET";
  }
}

readOnly(Config.prototype, "apiKey");

const cfg = new Config();
cfg.apiKey = "HACK"; // ❌ ignored


/*========================================================================================
 10. PARAMETER DECORATORS (CONCEPT)
========================================================================================*/
//
// Used mostly in frameworks for:
// -------------------------------
// ✅ Dependency Injection
// ✅ Validation metadata
//
// Not directly usable in pure JS without frameworks
//


/*========================================================================================
 11. HOW DECORATORS WORK INTERNALLY
========================================================================================*/
//
// Internally, decorators:
// ------------------------
// ✅ Receive target (class, prototype, method)
// ✅ Receive metadata (property name, descriptor)
// ✅ Modify descriptor or constructor
// ✅ Return modified version
//
// In short:
// ---------
// DECORATOR = FUNCTION THAT MODIFIES DESCRIPTORS
//


/*========================================================================================
 12. REAL-WORLD USE CASES
========================================================================================*/
//
// ✅ Angular → @Component, @Injectable
// ✅ NestJS → @Controller, @Get, @Post
// ✅ TypeORM → @Entity, @Column
// ✅ Validation → @Required, @Min, @Max
// ✅ Authorization → @AdminOnly
// ✅ Caching → @Cache
// ✅ Logging → @LogExecution
// ✅ Throttling → @Throttle
//


/*========================================================================================
 13. COMMON DECORATOR EXAMPLES (FRAMEWORK STYLE)
========================================================================================*/
//
// @Log()
// @Authorize("admin")
// @Cache(10)
// @Throttle(1000)
// @Inject()
// @Validate()
//


/*========================================================================================
 14. DECORATORS vs HIGHER ORDER FUNCTIONS
========================================================================================*/
//
// HOF (Higher Order Function):
// -----------------------------
// ✅ Wraps functions manually
// ✅ Explicit usage
//
// Decorator:
// ----------
// ✅ Wraps functions/classes automatically
// ✅ Declarative syntax (@Log)
// ✅ Used by frameworks
//


/*========================================================================================
 15. DECORATORS & META PROGRAMMING
========================================================================================*/
//
// Decorators are a FORM of Meta Programming because:
// -------------------------------------------------
// ✅ They modify behavior at runtime
// ✅ They add cross-cutting concerns
// ✅ They hook into class internals
//


/*========================================================================================
 16. PERFORMANCE CONSIDERATIONS
========================================================================================*/
//
// ❌ Too many decorators = slower execution
// ❌ Multiple wrapper layers add stack overhead
// ❌ Heavy reflection hurts JIT optimizations
//
// ✅ But cost is usually acceptable in enterprise apps
//


/*========================================================================================
 17. SECURITY CONSIDERATIONS
========================================================================================*/
//
// ❌ Bad decorators can:
//    • Leak private data
//    • Execute unauthorized logic
//    • Expose internal methods
//
// ✅ Only use trusted decorator libraries
//


/*========================================================================================
 18. INTERVIEW QUESTIONS & TRAPS
========================================================================================*/
//
// Q1: Are decorators native in JavaScript?
// ✅ Currently a proposal, fully in TypeScript
//
// Q2: What problem do decorators solve?
// ✅ Code reusability & behavior injection
//
// Q3: Difference between decorator & HOF?
// ✅ Declarative vs manual wrapping
//
// Q4: Are decorators meta programming?
// ✅ Yes
//
// Q5: Can decorators change class behavior?
// ✅ Yes
//


/*========================================================================================
 19. ONE-PAGE FINAL MASTER SUMMARY
========================================================================================*/
//
// ✅ Decorators enhance behavior without modifying original code
// ✅ Act as wrappers for:
//    • Classes
//    • Methods
//    • Properties
// ✅ Built using functions & descriptors
// ✅ Widely used in:
//    • Angular
//    • NestJS
//    • TypeORM
// ✅ Part of Meta Programming
// ✅ Currently a proposal in JS, stable in TypeScript
// ✅ Extremely common in enterprise backend systems
//
// If you master decorators ✅
// → You unlock BACKEND FRAMEWORK-LEVEL JavaScript understanding 🚀

