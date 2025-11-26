/*
  ERROR HANDLING IN JAVASCRIPT — DETAILED EXPLANATION
  ---------------------------------------------------
  ✔ JS provides multiple ways to handle errors:
      - try / catch / finally
      - throw
      - Error objects
      - Custom errors
      - Error handling in async/await
      - Error handling in Promises
      - Global error handlers (window.onerror, unhandledrejection)

  ✔ Errors help you stop execution safely and show useful messages.
*/



/* ============================================================
   1. TYPES OF ERRORS IN JS
   ============================================================ */
/*
  ✔ SyntaxError       → wrong JS syntax
  ✔ ReferenceError    → variable not defined
  ✔ TypeError         → wrong type or undefined access
  ✔ RangeError        → invalid range (like infinite recursion)
  ✔ EvalError         → eval() misuse (rare)
  ✔ URIError          → malformed URI

  JS also allows custom errors.
*/



/* ============================================================
   2. try / catch / finally (CORE ERROR HANDLING)
   ============================================================ */

try {
  console.log("Before error");
  nonexistentFunction();  // will throw ReferenceError
  console.log("After error"); // skipped
} catch (err) {
  console.log("Caught error:", err.message);
} finally {
  console.log("Finally always runs");
}



/* ============================================================
   3. throw (MANUALLY THROWING ERRORS)
   ============================================================ */

function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero"); // manual error
  }
  return a / b;
}

try {
  console.log(divide(10, 0));
} catch (err) {
  console.log("Divide error:", err.message);
}



/* ============================================================
   4. CREATING CUSTOM ERROR CLASSES
   ============================================================ */

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError"; // custom name
  }
}

function registerUser(name) {
  if (name.length < 3) {
    throw new ValidationError("Name must be at least 3 characters");
  }
  return `${name} registered`;
}

try {
  console.log(registerUser("Al"));
} catch (e) {
  console.log(e.name, ":", e.message);
}



/* ============================================================
   5. NESTED TRY/CATCH (LOCALIZED ERROR HANDLING)
   ============================================================ */

function process() {
  try {
    try {
      throw new Error("Inner error");
    } catch (inner) {
      console.log("Caught inner:", inner.message);
      throw new Error("Outer error"); // rethrow for final handler
    }
  } catch (outer) {
    console.log("Caught outer:", outer.message);
  }
}

process();



/* ============================================================
   6. ERROR HANDLING WITH PROMISES
   ============================================================ */

const promise = new Promise((_, reject) => {
  reject("Promise failed!");
});

promise
  .then(val => console.log("OK:", val))
  .catch(err => console.log("Promise catch:", err))
  .finally(() => console.log("Promise finally"));



/* ============================================================
   7. ERROR HANDLING WITH async/await
   ============================================================ */

function asyncFail() {
  return new Promise((_, reject) => {
    setTimeout(() => reject("Async failed"), 500);
  });
}

async function testAsync() {
  try {
    const result = await asyncFail();
    console.log(result); // will not run
  } catch (err) {
    console.log("Async caught:", err);
  }
}

testAsync();



/* ============================================================
   8. AWAIT WITHOUT try/catch (WRONG)
   ============================================================ */

async function badAsync() {
  const result = await asyncFail(); // ❌ unhandled rejection
  console.log("Result:", result);
}

badAsync().catch(err => console.log("Fixing outside catch:", err));



/* ============================================================
   9. ERROR HANDLING PATTERN: WRAP IN UTILITY FUNCTION
   ============================================================ */

async function safeAwait(promise) {
  try {
    const data = await promise;
    return [data, null];
  } catch (err) {
    return [null, err];
  }
}

async function testSafe() {
  const [data, err] = await safeAwait(asyncFail());
  console.log("safeAwait:", { data, err });
}

testSafe();



/* ============================================================
   10. GLOBAL ERROR HANDLERS (BROWSER)
   ============================================================ */
/*
  window.onerror = function (msg, url, line) {
    console.log("Global JS error:", msg);
  };

  window.addEventListener("unhandledrejection", (event) => {
    console.log("Unhandled Promise Rejection:", event.reason);
  });
*/



/* ============================================================
   11. ERROR OBJECT DETAILS
   ============================================================ */

try {
  throw new Error("Something broke");
} catch (err) {
  console.log("Message:", err.message);
  console.log("Name:", err.name);
  console.log("Stack trace:", err.stack);
}



/* ============================================================
   12. LOGICAL ERRORS (NO THROW, BUT WRONG RESULT)
   ============================================================ */
/*
  ✔ JS doesn't detect logical errors:
    Example: wrong formula, wrong calculation, wrong condition.
  ✔ Use:
      - console.log
      - breakpoints
      - debugger keyword
*/



/* ============================================================
   13. debugger (PAUSE EXECUTION FOR INSPECTION)
   ============================================================ */

function debugExample() {
  let x = 10;
  debugger; // browser devtools pauses here
  x += 20;
  return x;
}



/* ============================================================
   14. BEST PRACTICES FOR ERROR HANDLING
   ============================================================ */
/*
  ✔ Always use try/catch with async/await
  ✔ Use .catch for Promise chains
  ✔ Create custom error classes for readability
  ✔ Use meaningful error messages
  ✔ Avoid swallowing errors (never empty catch blocks)
  ✔ Use finally for cleanup
  ✔ Validate inputs early to avoid runtime errors
*/



/* ============================================================
   SUMMARY
   ============================================================ */
/*
  ✔ try/catch/finally → core synchronous error handling
  ✔ throw → manually throw errors
  ✔ Error objects → structured way to represent issues
  ✔ Custom errors → domain-specific error types
  ✔ Promises:
        - .catch handles errors
        - rejections must not go unhandled
  ✔ async/await:
        - try/catch around await
        - or use a wrapper like safeAwait()
  ✔ Global handlers:
        - window.onerror
        - unhandledrejection

  MENTAL MODEL:
    → Errors are “exceptions”—signal that something went wrong.
    → Handle them predictably to avoid crashes and undefined behavior.
*/
