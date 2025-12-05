/****************************************************************************************
 * META PROGRAMMING IN JAVASCRIPT — COMPLETE & DETAILED GUIDE (BEGINNER → ADVANCED)
 *
 * Covers:
 * ✅ What Metaprogramming is
 * ✅ Why it exists
 * ✅ Core Metaprogramming Tools in JS
 * ✅ Proxy
 * ✅ Reflect
 * ✅ Symbols
 * ✅ Object Descriptors
 * ✅ eval() & Function Constructor
 * ✅ Decorators (Concept & Pattern)
 * ✅ Real-world use cases
 * ✅ Performance & Security risks
 * ✅ Interview-level traps
 ****************************************************************************************/


/*========================================================================================
 1. WHAT IS META PROGRAMMING?
========================================================================================*/
//
// META PROGRAMMING = "Programs that can CONTROL, MODIFY, or OBSERVE other programs"
//
// In simple words:
// ----------------
// ✅ Code that manipulates code behavior at runtime
// ✅ Code that controls object behavior dynamically
// ✅ Code that hooks into JavaScript’s internal operations
//
// Normal Programming:
// -------------------
// You write logic to solve a problem.
//
// Meta Programming:
// -----------------
// You write logic to CONTROL HOW that logic works.
//

/*========================================================================================
 2. WHY META PROGRAMMING EXISTS
========================================================================================*/
//
// Without Metaprogramming:
// ------------------------
// ❌ No global interception
// ❌ No validation at runtime for all properties
// ❌ No reactivity frameworks
// ❌ No API protection
// ❌ No monitoring/logging hooks
//
// With Metaprogramming:
// ---------------------
// ✅ Dynamic validation
// ✅ Access control
// ✅ Logging
// ✅ Framework reactivity (Vue 3, MobX, etc.)
// ✅ Auto-tracking
// ✅ ORM systems
// ✅ Testing tools
// ✅ Runtime code generation
//

/*========================================================================================
 3. MAIN META PROGRAMMING TOOLS IN JAVASCRIPT
========================================================================================*/
//
// CORE TOOLS:
// -----------
// ✅ Proxy        → Intercepts operations
// ✅ Reflect      → Performs low-level object operations
// ✅ Symbols      → Hidden, non-colliding properties
// ✅ Property Descriptors → Control property behavior
// ✅ eval()       → Executes code dynamically
// ✅ Function()   → Creates functions dynamically
// ✅ Decorator Pattern → Runtime behavior extension
//

/*========================================================================================
 4. PROXY — THE MOST POWERFUL META TOOL
========================================================================================*/
//
// Proxy lets you INTERCEPT almost EVERYTHING:
//
// ✅ Property read
// ✅ Property write
// ✅ Property delete
// ✅ "in" operator
// ✅ Object creation
// ✅ Function execution
//

const target = { name: "Rahul", age: 25 };

const metaUser = new Proxy(target, {
  get(obj, prop) {
    console.log("GET:", prop);
    return obj[prop];
  },
  set(obj, prop, value) {
    console.log("SET:", prop, value);
    obj[prop] = value;
    return true;
  },
  deleteProperty(obj, prop) {
    console.log("DELETE:", prop);
    delete obj[prop];
    return true;
  },
  has(obj, prop) {
    console.log("HAS:", prop);
    return prop in obj;
  }
});

metaUser.name;          // GET intercepted
metaUser.age = 30;      // SET intercepted
delete metaUser.age;   // DELETE intercepted
"name" in metaUser;    // HAS intercepted


/*========================================================================================
 5. REFLECT — THE SAFE META OPERATOR API
========================================================================================*/
//
// Reflect provides DEFAULT behavior of JS internal operations in function form.
//
// ✅ Predictable
// ✅ Safe (returns true/false)
// ✅ Used with Proxy
// ✅ Matches Proxy traps exactly
//

const obj = { x: 10 };

Reflect.get(obj, "x");       // safer than obj.x
Reflect.set(obj, "x", 99);  // safer than obj.x = 99
Reflect.has(obj, "x");      // same as "x" in obj
Reflect.deleteProperty(obj, "x");


/*========================================================================================
 6. PROXY + REFLECT TOGETHER (BEST PRACTICE)
========================================================================================*/
//
// Use Proxy to intercept
// Use Reflect to perform default behavior
//

const safeMeta = new Proxy({ count: 0 }, {
  get(target, prop) {
    console.log("Accessing:", prop);
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    console.log("Updating:", prop, value);
    return Reflect.set(target, prop, value);
  }
});


/*========================================================================================
 7. SYMBOLS — HIDDEN META PROPERTIES
========================================================================================*/
//
// Symbol creates UNIQUE, NON-COLLIDING property keys.
// Used for:
// ---------
// ✅ Internal metadata
// ✅ Framework internals
// ✅ Avoiding name conflicts
//

const secretKey = Symbol("secret");

const user = {
  name: "Aman",
  [secretKey]: "private-data"
};

console.log(user.name);          // Aman
console.log(user[secretKey]);   // private-data

// ❌ Not visible in normal loops
for (let key in user) {
  console.log(key); // only "name"
}


/*========================================================================================
 8. WELL-KNOWN SYMBOLS (BUILT-IN META HOOKS)
========================================================================================*/
//
// These symbols allow JS engine-level customization:
// --------------------------------------------------
// Symbol.iterator        → Custom iteration
// Symbol.toPrimitive     → Type conversion
// Symbol.toStringTag     → Custom object tag
// Symbol.hasInstance     → Custom instanceof behavior
// Symbol.match, split   → Regex behavior override
// Symbol.asyncIterator  → Async iteration
//

/*--- Custom Iteration ---*/

const iterableObj = {
  data: [1, 2, 3],
  [Symbol.iterator]() {
    let i = 0;
    return {
      next: () => ({
        value: this.data[i],
        done: i++ >= this.data.length
      })
    };
  }
};

for (let x of iterableObj) console.log(x);


/*========================================================================================
 9. PROPERTY DESCRIPTORS — META CONTROL OVER OBJECT PROPERTIES
========================================================================================*/
//
// Property descriptors define HOW properties behave.
//

const metaObj = {};

Object.defineProperty(metaObj, "id", {
  value: 101,
  writable: false,      // ❌ cannot modify
  enumerable: true,
  configurable: false  // ❌ cannot delete
});

metaObj.id = 999;       // ❌ ignored
delete metaObj.id;     // ❌ ignored

console.log(metaObj.id); // 101


/*========================================================================================
 10. EVAL — DANGEROUS META PROGRAMMING TOOL
========================================================================================*/
//
// eval() executes string as JavaScript code at runtime.
// ❌ EXTREMELY dangerous
// ❌ Security risk
// ❌ Performance killer
//

const code = "2 + 2";
console.log(eval(code)); // 4

// ❌ DO NOT use in production frameworks


/*========================================================================================
 11. FUNCTION CONSTRUCTOR — SAFER THAN eval (But still risky)
========================================================================================*/
//
// Function constructor dynamically creates functions.
//

const sum = new Function("a", "b", "return a + b;");
console.log(sum(2, 3)); // 5

// ❌ Still slow & potentially unsafe


/*========================================================================================
 12. DECORATOR PATTERN (BEHAVIOR MODIFICATION)
========================================================================================*/
//
// Decorators modify behavior at runtime without changing original code.
//

function withLogging(fn) {
  return function (...args) {
    console.log("Calling with:", args);
    return fn(...args);
  };
}

function add(a, b) {
  return a + b;
}

const decoratedAdd = withLogging(add);
decoratedAdd(5, 6);


/*========================================================================================
 13. META PROGRAMMING FOR VALIDATION
========================================================================================*/

const validatedUser = new Proxy({}, {
  set(target, prop, value) {
    if (prop === "age" && typeof value !== "number") {
      throw new Error("Age must be number");
    }
    target[prop] = value;
    return true;
  }
});

validatedUser.age = 25;     // ✅ ok
// validatedUser.age = "A"; ❌ error


/*========================================================================================
 14. META PROGRAMMING FOR PRIVATE DATA
========================================================================================*/
//
// Emulates private fields without # syntax.
//

const privateData = new WeakMap();

class SecureUser {
  constructor(name, password) {
    this.name = name;
    privateData.set(this, { password });
  }

  checkPassword(pwd) {
    return privateData.get(this).password === pwd;
  }
}

const su = new SecureUser("Rahul", "1234");
console.log(su.checkPassword("1234")); // true
// console.log(su.password); ❌ undefined


/*========================================================================================
 15. META PROGRAMMING & FRAMEWORKS
========================================================================================*/
//
// Vue 3 → uses Proxy for reactivity ✅
// MobX → uses Proxy ✅
// Angular → uses decorators ✅
// ORM tools → Proxy + Reflect ✅
// Testing libraries → Proxy ✅
// Browser tools → MutationObserver + Proxy ✅
//


/*========================================================================================
 16. PERFORMANCE COST OF META PROGRAMMING
========================================================================================*/
//
// ❌ Proxies are slower than direct access
// ❌ Excessive traps hurt JIT optimization
// ❌ eval breaks all optimizations
// ❌ Function constructor bypasses JIT assumptions
// ❌ Overuse causes de-optimization
//


/*========================================================================================
 17. SECURITY RISKS
========================================================================================*/
//
// ❌ eval() → code injection
// ❌ Function() → sandbox escape risks
// ❌ Proxies can hide malicious behavior
// ❌ Reflect misuse can bypass access control
// ✅ Always sanitize inputs
// ✅ Never eval user input
//


/*========================================================================================
 18. INTERVIEW QUESTIONS & TRAPS
========================================================================================*/
//
// Q1: What is Metaprogramming?
// ✅ Writing code that modifies code behavior
//
// Q2: What is the most powerful meta tool in JS?
// ✅ Proxy
//
// Q3: Difference between Proxy & Reflect?
// ✅ Proxy intercepts, Reflect executes
//
// Q4: Are Symbols enumerable?
// ❌ No, by default they are hidden
//
// Q5: Is eval metaprogramming?
// ✅ Yes, but dangerous
//
// Q6: Does Proxy affect JIT?
// ✅ Yes, may slow performance
//


/*========================================================================================
 19. ONE-PAGE FINAL MASTER SUMMARY
========================================================================================*/
//
// ✅ Meta Programming = Code that controls code
// ✅ Proxy → Intercepts everything
// ✅ Reflect → Safe default operations
// ✅ Symbol → Hidden metadata keys
// ✅ Descriptors → Property behavior control
// ✅ eval & Function → Runtime code execution
// ✅ Decorators → Extend behavior dynamically
// ✅ Used heavily in:
//    • Frameworks
//    • ORMs
//    • Security systems
//    • Tooling
// ✅ Comes with performance + security risks
//
// If you master Meta Programming ✅
// → You reach FRAMEWORK-LEVEL JavaScript mastery 🚀


