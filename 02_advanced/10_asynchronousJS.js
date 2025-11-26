/*
  ASYNCHRONOUS JAVASCRIPT — VERY DETAILED EXPLANATION
  ---------------------------------------------------
  GOAL:
    Understand how JS does things "in the background" without blocking:
      - setTimeout / setInterval
      - DOM events (click, input, etc.)
      - fetch / APIs / network calls
      - Promises
      - async / await

  IMPORTANT REMINDER:
    JavaScript is SINGLE-THREADED:
      → Only one thing runs on the CALL STACK at a time.
    Asynchronous behavior is achieved using:
      → Browser / Node APIs
      → Event Loop
      → Task Queue (macrotasks) & Microtask Queue
*/



/* ============================================================
   1. SYNCHRONOUS JS (BLOCKING)
   ============================================================
   In normal JS, code runs top → bottom, line by line.
*/

console.log("A");

function longTask() {
  const start = Date.now();
  while (Date.now() - start < 2000) {
    // block for ~2 seconds
  }
  console.log("Long task done");
}

longTask();
console.log("B");

/*
  Output:
    A
    Long task done   (after ~2 seconds)
    B

  During longTask(), NOTHING ELSE can run:
    - no clicks processed
    - no timers fired
    - UI can freeze
*/



/* ============================================================
   2. NON-BLOCKING ASYNC EXAMPLE (setTimeout)
   ============================================================
   Asynchronous APIs allow delays WITHOUT blocking the thread.
*/

console.log("Start");

setTimeout(() => {
  console.log("Timeout callback executed");
}, 2000);

console.log("End");

/*
  Output:
    Start
    End
    Timeout callback executed   (after 2s)

  Flow:
    1. "Start" logs.
    2. setTimeout tells Browser: "run this callback after 2000ms".
    3. setTimeout returns immediately (no blocking).
    4. "End" logs.
    5. After 2 seconds, Browser puts callback in Task Queue.
    6. Event Loop pushes it to Call Stack when stack is empty.
*/



/* ============================================================
   3. ASYNC BUILDING BLOCKS (in BROWSER)
   ============================================================

   - setTimeout / setInterval
   - DOM events (click, input, submit, etc.)
   - fetch / XMLHttpRequest
   - WebSockets
   - MessageChannel, etc.

   All of these:
     ✔ Start in JS
     ✔ Hand work off to Browser APIs
     ✔ When done, push callbacks into queues
     ✔ Event Loop schedules them
*/



/* ============================================================
   4. CALLBACK-BASED ASYNC CODE
   ============================================================
   The old school way: pass a function (callback) to run later.
*/

function fakeRequestCallback(url, callback) {
  console.log("Starting request to", url);
  setTimeout(() => {
    // simulate response
    const data = { url, result: "OK" };
    callback(null, data); // (error, data)
  }, 1000);
}

fakeRequestCallback("/api/user", (err, data) => {
  if (err) {
    console.log("Error:", err);
  } else {
    console.log("Received:", data);
  }
});

/*
  PROBLEM:
    For multiple async steps, callbacks become nested:
      - "callback hell"
*/



/* ============================================================
   5. CALLBACK HELL EXAMPLE (NESTED ASYNC FLOWS)
   ============================================================
*/

function getUser(id, cb) {
  setTimeout(() => cb(null, { id, name: "Alice" }), 1000);
}

function getPosts(userId, cb) {
  setTimeout(() => cb(null, [`Post1 by ${userId}`, `Post2 by ${userId}`]), 1000);
}

function getComments(post, cb) {
  setTimeout(() => cb(null, [`Comment on ${post}`]), 1000);
}

getUser(1, (err, user) => {
  if (err) return console.log(err);

  getPosts(user.id, (err, posts) => {
    if (err) return console.log(err);

    getComments(posts[0], (err, comments) => {
      if (err) return console.log(err);

      console.log("User:", user);
      console.log("Posts:", posts);
      console.log("Comments on first post:", comments);
    });
  });
});

/*
  Issues:
    - Deep nesting
    - Hard to read & maintain
    - Error handling repeated
  SOLUTION:
    → PROMISES
*/



/* ============================================================
   6. PROMISES — CORE ASYNC ABSTRACTION
   ============================================================
   A Promise represents a value that may be available:
     - now
     - later
     - never (error)

   Promise has 3 states:
     - pending
     - fulfilled (resolved)
     - rejected
*/

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    if (success) resolve("Data loaded");
    else reject("Error while loading");
  }, 1000);
});

p.then(result => {
  console.log("Success:", result);
}).catch(err => {
  console.log("Error:", err);
}).finally(() => {
  console.log("Finished (success or fail)");
});

/*
  .then → handles resolved value
  .catch → handles error
  .finally → runs in both cases
*/



/* ============================================================
   7. PROMISE WRAPPERS FOR ASYNC FUNCTIONS (PROMISIFY)
   ============================================================
   Let's convert our callback-style fakeRequest to Promise-based.
*/

function fakeRequestPromise(url) {
  return new Promise((resolve, reject) => {
    console.log("Requesting", url);
    setTimeout(() => {
      const ok = true;
      if (ok) resolve({ url, result: "OK" });
      else reject("Network error");
    }, 1000);
  });
}

fakeRequestPromise("/api/data")
  .then(res => {
    console.log("Response:", res);
  })
  .catch(err => {
    console.log("Error:", err);
  });



/* ============================================================
   8. PROMISE CHAINING (AVOID CALLBACK HELL)
   ============================================================
*/

function getUserP(id) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ id, name: "Alice" }), 800);
  });
}

function getPostsP(userId) {
  return new Promise(resolve => {
    setTimeout(() => resolve([`Post1 by ${userId}`, `Post2 by ${userId}`]), 800);
  });
}

function getCommentsP(post) {
  return new Promise(resolve => {
    setTimeout(() => resolve([`Comment on ${post}`]), 800);
  });
}

getUserP(1)
  .then(user => {
    console.log("User:", user);
    return getPostsP(user.id);
  })
  .then(posts => {
    console.log("Posts:", posts);
    return getCommentsP(posts[0]);
  })
  .then(comments => {
    console.log("Comments on first:", comments);
  })
  .catch(err => {
    console.log("Error in chain:", err);
  });



/* ============================================================
   9. PROMISE COMBINATORS (all, race, allSettled, any)
   ============================================================
*/

const p1 = new Promise(res => setTimeout(() => res("P1 done"), 1000));
const p2 = new Promise(res => setTimeout(() => res("P2 done"), 1500));
const p3 = new Promise((_, rej) => setTimeout(() => rej("P3 error"), 1200));

/* Promise.all → waits all, fails if any fail */
Promise.all([p1, p2]).then(values => {
  console.log("Promise.all:", values);
});

/* Promise.race → first settled (resolved or rejected) */
Promise.race([p1, p3]).then(
  value => console.log("race resolved:", value),
  err => console.log("race rejected:", err)
);

/* Promise.allSettled → all, never rejects */
Promise.allSettled([p1, p2, p3]).then(results => {
  console.log("allSettled:", results);
});

/* Promise.any → first resolved, ignored rejects (throws if all reject) */
Promise.any([p3, p1]).then(
  value => console.log("any resolved:", value)
);



/* ============================================================
   10. ASYNC / AWAIT — SYNTAX SUGAR OVER PROMISES
   ============================================================
   async function always returns a Promise.
   await pauses INSIDE that function until Promise settles.
*/

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function loadData() {
  try {
    console.log("Loading 1...");
    await wait(1000);
    console.log("Step 1 done");

    console.log("Loading 2...");
    await wait(1000);
    console.log("Step 2 done");

    return "All done";
  } catch (err) {
    console.log("Error:", err);
    throw err;
  } finally {
    console.log("Cleanup if needed");
  }
}

(async () => {
  const result = await loadData();
  console.log("Result from loadData:", result);
})();

/*
  BENEFITS:
    - Reads like synchronous code
    - Easier to handle errors with try/catch
*/



/* ============================================================
   11. SEQUENTIAL vs PARALLEL AWAIT
   ============================================================
*/

function task(name, ms) {
  return new Promise(res => setTimeout(() => res(name), ms));
}

async function sequential() {
  console.log("Sequential start");
  const a = await task("A", 1000);
  const b = await task("B", 1000);
  console.log("Sequential:", a, b);
  console.log("Time ~ 2s");
}

async function parallel() {
  console.log("Parallel start");
  const pa = task("A", 1000); // start both
  const pb = task("B", 1000);

  // wait both in parallel
  const [a, b] = await Promise.all([pa, pb]);
  console.log("Parallel:", a, b);
  console.log("Time ~ 1s");
}

sequential();
parallel();

/*
  PATTERN:
    - sequential when each depends on previous result
    - parallel when independent
*/



/* ============================================================
   12. ASYNC + FETCH (API CALLS)
   ============================================================
   Example valid in browser / environments with fetch.
*/

async function fetchUser() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
    if (!res.ok) throw new Error("Network error: " + res.status);
    const user = await res.json();
    console.log("Fetched user:", user);
  } catch (err) {
    console.log("Fetch error:", err.message);
  }
}

// fetchUser();



/* ============================================================
   13. EVENT LOOP + ASYNC (QUICK RECAP)
   ============================================================
   - Call Stack: normal JS execution
   - Web APIs: timers, fetch, DOM events
   - Task Queue (Macrotask Queue): setTimeout, setInterval, events
   - Microtask Queue: Promise .then/.catch/.finally callbacks

   ORDER EACH TICK:
     1. Run current call stack
     2. Run ALL microtasks
     3. Run ONE macrotask (if any)
*/

console.log("Event loop demo start");

setTimeout(() => {
  console.log("Macrotask (setTimeout)");
}, 0);

Promise.resolve()
  .then(() => console.log("Microtask 1"))
  .then(() => console.log("Microtask 2"));

console.log("Event loop demo end");

/*
  Output:
    Event loop demo start
    Event loop demo end
    Microtask 1
    Microtask 2
    Macrotask (setTimeout)
*/



/* ============================================================
   14. COMMON ASYNC PITFALLS
   ============================================================ */


/*  A) FORGOTTEN await  */

async function bugExample() {
  function delayedValue() {
    return new Promise(res => setTimeout(() => res(42), 500));
  }

  const val = delayedValue(); // ❌ missing await
  console.log("val:", val);   // Promise, not 42
}

bugExample();

/*  B) await inside regular forEach (does NOT wait)  */

async function badLoop() {
  const arr = [1, 2, 3];
  arr.forEach(async (n) => {
    await wait(500);
    console.log("forEach:", n);
  });
  console.log("badLoop done (before async logs!)");
}

badLoop();

/*
  BETTER:
*/

async function goodLoop() {
  const arr = [1, 2, 3];
  for (const n of arr) {
    await wait(500);
    console.log("for-of:", n);
  }
  console.log("goodLoop done (after logs)");
}

goodLoop();



/* ============================================================
   15. UNHANDLED REJECTIONS (IMPORTANT)
   ============================================================
*/

function failPromise() {
  return new Promise((_, reject) => reject("Oops"));
}

async function causeUnhandled() {
  // if we don't catch:
  failPromise(); // ❌ unhandled rejection (in real environment)
}

async function handled() {
  try {
    await failPromise();
  } catch (e) {
    console.log("Handled error:", e);
  }
}

handled();



/* ============================================================
   16. SUMMARY OF ASYNCHRONOUS JS
   ============================================================
   ✔ JS is single-threaded, but async via:
       - Browser/Node APIs
       - Event Loop
       - Queues (macrotask / microtask)

   ✔ Main async patterns:
       1) Callbacks
       2) Promises
       3) async / await (on top of Promises)

   ✔ Promises:
       - handle future values
       - chainable
       - .then / .catch / .finally
       - Promise.all / race / allSettled / any

   ✔ async / await:
       - make async code look synchronous
       - use try/catch for errors
       - combine with Promise.all for parallel work

   ✔ Always think:
       - Does this block the main thread?
       - Can I make it async without freezing UI?
       - Are my errors handled?

   MENTAL MODEL:
     → JS runs one thing at a time.
     → Async APIs schedule work for “later”.
     → Event Loop decides WHEN that "later" happens.
*/
