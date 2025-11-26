/*
  PROMISES IN JAVASCRIPT — VERY DETAILED EXPLANATION
  --------------------------------------------------
  ✔ A Promise represents the eventual RESULT of an ASYNCHRONOUS operation.
  ✔ It acts like a placeholder for a value that you’ll get:
        - now
        - later
        - or never (error)

  STATES OF A PROMISE:
    1) pending   → initial state, neither fulfilled nor rejected
    2) fulfilled → operation completed successfully (resolved)
    3) rejected  → operation failed (error)

  Once a promise is fulfilled or rejected, it becomes "settled" and CANNOT change again.
*/



/* ============================================================
   1. CREATING A PROMISE
   ============================================================
   new Promise(executor)

   executor = function (resolve, reject) { ... }
      - use resolve(value) to mark as fulfilled
      - use reject(error) to mark as rejected
*/

const myPromise = new Promise((resolve, reject) => {
  // simulate async work (like network call)
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve("Operation successful");
    } else {
      reject("Something went wrong");
    }
  }, 1000);
});



/* ============================================================
   2. CONSUMING A PROMISE: .then(), .catch(), .finally()
   ============================================================ */

myPromise
  .then((result) => {
    /*
      .then() is called when promise is fulfilled
      result → value passed to resolve(...)
    */
    console.log("THEN:", result);
  })
  .catch((error) => {
    /*
      .catch() is called when promise is rejected
      error → value passed to reject(...)
    */
    console.log("CATCH:", error);
  })
  .finally(() => {
    /*
      .finally() runs regardless of success or error
      often used for cleanup (stop loader, close dialog, etc.)
    */
    console.log("FINALLY: promise settled");
  });



/* ============================================================
   3. PROMISE STATES ILLUSTRATION
   ============================================================ */
/*
  const p = new Promise((resolve, reject) => {
    // p is in "pending" state
    if (everythingOK) {
      resolve("OK");  // p becomes "fulfilled"
    } else {
      reject("ERROR"); // p becomes "rejected"
    }
  });

  p.then(...).catch(...);
*/



/* ============================================================
   4. WRAPPING CALLBACK-STYLE ASYNC CODE INTO A PROMISE
   ============================================================
   Example: converting a fake callback-based API to a Promise.
*/

function fakeRequestCallback(url, cb) {
  setTimeout(() => {
    cb(null, { url, data: "Some data" });
  }, 1000);
}

function fakeRequestPromise(url) {
  return new Promise((resolve, reject) => {
    fakeRequestCallback(url, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

fakeRequestPromise("/user/1")
  .then((data) => console.log("Data from promise:", data))
  .catch((err) => console.log("Error from promise:", err));



/* ============================================================
   5. PROMISE CHAINING (VERY IMPORTANT)
   ============================================================
   You can chain multiple .then() calls to handle sequential async steps.
*/

function getUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, name: "Alice" }), 500);
  });
}

function getPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve([`Post1 by ${userId}`, `Post2 by ${userId}`]), 500);
  });
}

function getComments(post) {
  return new Promise((resolve) => {
    setTimeout(() => resolve([`Comment on ${post}`]), 500);
  });
}

getUser(1)
  .then((user) => {
    console.log("User:", user);
    return getPosts(user.id);   // returns a new Promise
  })
  .then((posts) => {
    console.log("Posts:", posts);
    return getComments(posts[0]);
  })
  .then((comments) => {
    console.log("Comments of first post:", comments);
  })
  .catch((err) => {
    console.log("Error in chain:", err);
  });

/*
  KEY POINT:
    - Whatever you RETURN inside .then() is wrapped into a Promise:
        • If you return a value → becomes resolved Promise
        • If you return a Promise → chain waits for it
*/



/* ============================================================
   6. ERROR PROPAGATION IN PROMISE CHAINS
   ============================================================
   If any .then handler throws an error or returns a rejected Promise,
   the chain jumps to the nearest .catch.
*/

new Promise((resolve) => resolve(10))
  .then((val) => {
    console.log("First then:", val);
    return val * 2;
  })
  .then((val) => {
    console.log("Second then:", val);
    throw new Error("Something broke");
  })
  .then((val) => {
    // This will NOT run because previous then threw an error
    console.log("Third then:", val);
  })
  .catch((err) => {
    console.log("Caught error:", err.message);
    // you can recover and return a fallback value
    return 0;
  })
  .then((val) => {
    console.log("After catch, chain continues with:", val);
  });



/* ============================================================
   7. PROMISE RESOLUTION RULES
   ============================================================
   new Promise(...) gives you a Promise, BUT there are helpers:

   - Promise.resolve(value)
   - Promise.reject(error)
*/

const pResolved = Promise.resolve(42);
pResolved.then((v) => console.log("Promise.resolve:", v));

const pRejected = Promise.reject("Something failed");
pRejected.catch((e) => console.log("Promise.reject:", e));

/*
  If the value passed to Promise.resolve is itself a Promise,
  it returns the same Promise (or one that adopts its state).
*/



/* ============================================================
   8. STATIC METHODS: Promise.all, race, allSettled, any
   ============================================================ */

/* -------------------- Promise.all --------------------------
   Runs promises in parallel and waits for ALL of them to fulfill.
   If ANY fails → the entire Promise.all REJECTS.
*/

const p1 = new Promise((res) => setTimeout(() => res("P1 done"), 500));
const p2 = new Promise((res) => setTimeout(() => res("P2 done"), 1000));
const p3 = new Promise((_, rej) => setTimeout(() => rej("P3 failed"), 800));

Promise.all([p1, p2])
  .then((results) => {
    console.log("Promise.all results:", results); // ["P1 done","P2 done"]
  })
  .catch((err) => {
    console.log("Promise.all error:", err);
  });

Promise.all([p1, p3, p2])
  .then((results) => {
    console.log("This will NOT run if any fails");
  })
  .catch((err) => {
    console.log("Promise.all rejected because:", err); // "P3 failed"
  });



/* -------------------- Promise.race --------------------------
   Resolves or rejects as soon as the FIRST promise settles
   (either fulfilled or rejected).
*/

Promise.race([p1, p3])
  .then((val) => {
    console.log("race resolved with:", val);
  })
  .catch((err) => {
    console.log("race rejected with:", err);
  });



/* -------------------- Promise.allSettled --------------------
   Waits for ALL promises to settle (either fulfilled or rejected).
   Never rejects. Result is an array of { status, value OR reason }.
*/

Promise.allSettled([p1, p3, p2]).then((results) => {
  console.log("allSettled results:", results);
  /*
    [
      {status:"fulfilled", value: ...},
      {status:"rejected", reason: ...},
      {status:"fulfilled", value: ...},
    ]
  */
});



/* -------------------- Promise.any ---------------------------
   Resolves as soon as the FIRST promise FULFILLS.
   Ignores rejections unless ALL fail (then it rejects with
   AggregateError).
*/

Promise.any([p3, p1]) // p3 fails, p1 resolves
  .then((val) => {
    console.log("any resolved with:", val);
  })
  .catch((err) => {
    console.log("any rejected (all failed):", err);
  });



/* ============================================================
   9. MICROTASK QUEUE: PROMISES VS setTimeout
   ============================================================
   ✔ Promise callbacks (.then/.catch/.finally) go to MICROTASK QUEUE
   ✔ setTimeout callbacks go to MACROTASK (TASK) QUEUE

   Microtasks ALWAYS run BEFORE macrotasks when the call stack is empty.
*/

console.log("1 - start");

setTimeout(() => {
  console.log("4 - setTimeout callback");
}, 0);

Promise.resolve()
  .then(() => {
    console.log("2 - promise then");
  })
  .then(() => {
    console.log("3 - second then");
  });

console.log("5 - end");

/*
  Output order:
    1 - start
    5 - end
    2 - promise then
    3 - second then
    4 - setTimeout callback

  Why?
    - Synchronous code executes first (1, 5)
    - Then microtasks (2, 3)
    - Then macrotasks (4)
*/



/* ============================================================
   10. PROMISES + async/await (BRIEF LINK)
   ============================================================
   async/await is built on top of Promises.
   Using await "pauses" inside an async function until the Promise settles.
*/

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function demoAsync() {
  console.log("Before await");
  await delay(500);   // waits for the promise
  console.log("After await");
}

demoAsync();

/*
  The function demoAsync() still returns a Promise.
  async/await is just a prettier way to write Promise chains.
*/



/* ============================================================
   11. COMMON PROMISE PITFALLS
   ============================================================ */


/* 1) FORGOT TO RETURN PROMISE IN .then()  */

function badExample() {
  return getUser(1)
    .then((user) => {
      console.log("Got user:", user);
      getPosts(user.id);  // ❌ missing return
    })
    .then((posts) => {
      // posts will be undefined here!
      console.log("Posts:", posts);
    });
}

/*
  FIX:
    return getPosts(user.id);
*/


/* 2) MIXING CALLBACKS AND PROMISES WITHOUT NEED  */

function doubleAsync(n, cb) {
  setTimeout(() => cb(n * 2), 500);
}

function doubleAsyncPromise(n) {
  return new Promise((res) => setTimeout(() => res(n * 2), 500));
}

/*
  Prefer using Promises OR callbacks clearly, not mixing both for same flow.
*/


/* 3) NOT HANDLING REJECTION */

const faulty = new Promise((_, reject) => {
  reject("Failure");
});

// If you don't add .catch, in real environments you'll get
// "UnhandledPromiseRejectionWarning"

/*
  Always attach .catch or use try/catch with async/await.
*/



/* ============================================================
   12. BUILDING A SIMPLE PROMISE-BASED API WRAPPER (EXAMPLE)
   ============================================================
   (This assumes fetch is available in the environment)
*/

function getJson(url) {
  return fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("HTTP error " + res.status);
    }
    return res.json();
  });
}

/*
  Usage:

  getJson("https://jsonplaceholder.typicode.com/users/1")
    .then(user => console.log("User:", user))
    .catch(err => console.log("Error:", err.message));
*/



/* ============================================================
   13. SUMMARY OF PROMISE CONCEPTS
   ============================================================
   ✔ Promise = object representing future value.
   ✔ States: pending → fulfilled OR rejected (then settled).
   ✔ Methods:
        - .then(onFulfilled, onRejected?)
        - .catch(onRejected)
        - .finally(callback)

   ✔ Static helpers:
        - Promise.resolve(value)
        - Promise.reject(error)
        - Promise.all([...])
        - Promise.race([...])
        - Promise.allSettled([...])
        - Promise.any([...])

   ✔ Promises use Microtask Queue, run before macrotask callbacks.

   ✔ Use Promises to:
        - avoid "callback hell"
        - chain async operations cleanly
        - write clearer async code using async/await

   MENTAL MODEL:
     → A Promise is like a "delivery token".
       When you order something async:
         - You get a token (Promise)
         - You attach handlers (.then/.catch) to know what to do
           when the delivery either arrives or fails.
*/
