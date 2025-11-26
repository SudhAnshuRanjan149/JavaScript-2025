/*
  ASYNC / AWAIT IN JAVASCRIPT — VERY DETAILED EXPLANATION
  -------------------------------------------------------
  ✔ async/await is built on top of PROMISES
  ✔ It makes asynchronous code look like synchronous code
  ✔ It improves readability, error handling, and control flow

  KEY POINTS:
    - async turns a function into one that returns a Promise
    - await pauses inside an async function until a Promise settles
*/



/* ============================================================
   1. BASIC async FUNCTION
   ============================================================
   ✔ Any function declared with async will ALWAYS return a Promise
*/

async function hello() {
  return "Hello"; // actually returns Promise.resolve("Hello")
}

const p = hello();
console.log(p); // Promise

p.then((v) => console.log("Value from async:", v));

/*
  Behind the scenes:
    async function hello() {
      return Promise.resolve("Hello");
    }
*/



/* ============================================================
   2. BASIC await USAGE
   ============================================================
   ✔ await can ONLY be used inside async functions (in normal JS)
   ✔ It pauses execution until the Promise resolves/rejects
*/

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function demoAwait() {
  console.log("Before wait");
  await wait(1000); // pause here (async, non-blocking for rest of JS)
  console.log("After 1 second");
}

demoAwait();

/*
  Flow:
    1. Enter demoAwait()
    2. Log "Before wait"
    3. hit await wait(1000)
        - demoAwait is paused
        - event loop continues running other code
    4. after 1000ms → promise resolves
    5. demoAwait continues from after await line
*/



/* ============================================================
   3. async FUNCTION RETURN VALUES
   ============================================================
   ✔ Whatever you RETURN from async becomes a resolved Promise
   ✔ If you THROW inside async, it becomes a rejected Promise
*/

async function getNumber() {
  return 42; // => Promise.resolve(42)
}

async function failFunction() {
  throw new Error("Something went wrong");
}

getNumber().then((v) => console.log("Number:", v));

failFunction()
  .then(() => console.log("Will not run"))
  .catch((err) => console.log("Caught error:", err.message));



/* ============================================================
   4. A REALISTIC EXAMPLE WITH await
   ============================================================
   Imagine three async tasks that depend on each other.
*/

function task(name, ms, value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Task ${name} done`);
      resolve(value);
    }, ms);
  });
}

async function runTasksSequential() {
  console.log("Sequential start");

  const a = await task("A", 1000, 10);  // wait 1s
  console.log("Value A:", a);

  const b = await task("B", 1000, a * 2);  // wait another 1s
  console.log("Value B:", b);

  const c = await task("C", 1000, b * 3);  // wait another 1s
  console.log("Value C:", c);

  console.log("Sequential end");
}

runTasksSequential();

/*
  Total time ≈ 3 seconds (tasks run one after another)
*/



/* ============================================================
   5. SEQUENTIAL vs PARALLEL WITH async/await
   ============================================================
   ✔ If tasks are independent, you can run them in parallel to save time
*/

function job(name, ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Job ${name} finished`);
      resolve(name);
    }, ms);
  });
}

async function sequentialJobs() {
  console.log("Sequential jobs start");
  console.time("sequential");

  const r1 = await job("A", 1000);
  const r2 = await job("B", 1000);
  const r3 = await job("C", 1000);

  console.log("Sequential results:", r1, r2, r3);
  console.timeEnd("sequential"); // ~3 seconds
}

async function parallelJobs() {
  console.log("Parallel jobs start");
  console.time("parallel");

  // start all jobs WITHOUT awaiting immediately
  const p1 = job("A", 1000);
  const p2 = job("B", 1000);
  const p3 = job("C", 1000);

  // wait for all in parallel
  const results = await Promise.all([p1, p2, p3]);

  console.log("Parallel results:", results);
  console.timeEnd("parallel"); // ~1 second
}

sequentialJobs();
parallelJobs();

/*
  PATTERN:
    - For dependent tasks → use sequential awaits
    - For independent tasks → launch them first, then await Promise.all()
*/



/* ============================================================
   6. ERROR HANDLING WITH async/await (try / catch)
   ============================================================
*/

function mayFail(shouldFail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject("Error: failed!");
      else resolve("Success!");
    }, 500);
  });
}

async function handleErrors() {
  try {
    const result = await mayFail(false);
    console.log("Result 1:", result);

    const result2 = await mayFail(true); // this will reject
    console.log("Result 2:", result2);   // won't run
  } catch (err) {
    console.log("Caught in try/catch:", err);
  } finally {
    console.log("Cleanup / finally block");
  }
}

handleErrors();

/*
  KEY POINT:
    - await inside try/catch allows normal synchronous-like error handling
*/



/* ============================================================
   7. MIXING async/await WITH .then() (WHAT & WHEN)
   ============================================================
   ✔ Typically pick one style for clarity.
   ✔ But sometimes you mix for composition.
*/

async function mixExample() {
  const num = await Promise.resolve(10);
  console.log("num:", num);

  return num * 2;
}

mixExample()
  .then((result) => {
    console.log("Result from mixExample:", result);
  })
  .catch((err) => {
    console.log("Error:", err);
  });



/* ============================================================
   8. LOOPING WITH await — for, for...of vs forEach
   ============================================================
   IMP: Array.prototype.forEach does NOT work nicely with async/await
*/

function delayVal(val, ms) {
  return new Promise((res) => setTimeout(() => res(val), ms));
}

// ❌ BAD: forEach does not await properly
async function badLoop() {
  const nums = [1, 2, 3];
  nums.forEach(async (n) => {
    const v = await delayVal(n, 500);
    console.log("forEach:", v);
  });
  console.log("badLoop done (logs BEFORE async finishes)");
}

// ✅ GOOD: for...of handles await as expected
async function goodLoop() {
  const nums = [1, 2, 3];
  for (const n of nums) {
    const v = await delayVal(n, 500);
    console.log("for-of:", v);
  }
  console.log("goodLoop done (logs AFTER async finishes)");
}

badLoop();
goodLoop();

/*
  WHY BAD?
    - forEach does not wait for async callback
    - goodLoop ensures each iteration awaits properly
*/



/* ============================================================
   9. PARALLEL WORK IN LOOPS WITH async/await
   ============================================================
   ✔ To parallelize, collect promises, then await Promise.all
*/

async function parallelLoop() {
  const nums = [1, 2, 3, 4];
  const promises = nums.map((n) => delayVal(n * 2, 500));

  const results = await Promise.all(promises);
  console.log("Parallel loop results:", results);
}

parallelLoop();

/*
  PATTERN:
    - use map to build array of Promises
    - await Promise.all for parallel performance
*/



/* ============================================================
   10. async/await WITH fetch (BROWSER / ENV WITH fetch)
   ============================================================
   Note: In Node you may need a fetch polyfill or built-in fetch (v18+)
*/

// Example (will work in environments where fetch is available)
async function fetchUser() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1");

    if (!response.ok) {
      throw new Error("HTTP error: " + response.status);
    }

    const data = await response.json();
    console.log("User fetched:", data);
  } catch (err) {
    console.log("Fetch error:", err.message);
  }
}

// fetchUser();



/* ============================================================
   11. NESTED async FUNCTIONS
   ============================================================
*/

async function innerTask() {
  await wait(500);
  return "Inner done";
}

async function outerTask() {
  console.log("Outer start");
  const msg = await innerTask(); // await another async
  console.log("Outer got:", msg);
  console.log("Outer end");
}

outerTask();

/*
  async functions can call each other easily with await
*/



/* ============================================================
   12. async FUNCTION ALWAYS RETURNS A PROMISE
   ============================================================
   Even if you don't use "await" inside, it's still async → Promise
*/

async function noAwait() {
  console.log("No await here");
}

const resultNoAwait = noAwait();
console.log("noAwait returns:", resultNoAwait); // Promise



/* ============================================================
   13. COMMON PITFALLS WITH async/await
   ============================================================
*/

/*
  ❌ Pitfall 1: Missing await
*/

async function missingAwait() {
  function getValue() {
    return new Promise((res) => setTimeout(() => res(100), 300));
  }

  const val = getValue(); // ❌ forgot await
  console.log("Val:", val); // logs Promise object, not 100
}

missingAwait();

/*
  ✔ Fix:
      const val = await getValue();
*/


/*
  ❌ Pitfall 2: Using await in places where parallel is better
*/

async function slowVersion() {
  const a = await delayVal("A", 1000);
  const b = await delayVal("B", 1000);
  console.log("slowVersion:", a, b); // total ~2s
}

async function fastVersion() {
  const pa = delayVal("A", 1000);
  const pb = delayVal("B", 1000);

  const [a, b] = await Promise.all([pa, pb]); // total ~1s
  console.log("fastVersion:", a, b);
}

slowVersion();
fastVersion();



/*
  ❌ Pitfall 3: Not handling rejections
*/

async function unhandled() {
  // In real environment, if this rejects and no catch, leads to unhandled rejection
  Promise.reject("Some error"); // no await, no catch
}

unhandled();

/*
  ✔ Always:
        - await inside try/catch
        - OR return promise and handle with .catch()
*/



/* ============================================================
   14. async/await + Promise helpers
   ============================================================
*/

async function withAll() {
  const promises = [
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3),
  ];

  try {
    const results = await Promise.all(promises);
    console.log("Promise.all results:", results);
  } catch (err) {
    console.log("Errors:", err);
  }
}

async function withRace() {
  const p1 = new Promise((res) => setTimeout(() => res("Fast"), 500));
  const p2 = new Promise((res) => setTimeout(() => res("Slow"), 1000));

  const result = await Promise.race([p1, p2]);
  console.log("Race result:", result);
}

withAll();
withRace();



/* ============================================================
   15. SUMMARY OF async/await
   ============================================================
/*
  ✔ async:
      - marks function as asynchronous
      - function returns a Promise
      - return value becomes resolved value
      - thrown error becomes rejection

  ✔ await:
      - pauses execution inside async function
      - waits for Promise to settle
      - yields resolved value
      - throws error if Promise rejected (to be caught by try/catch)

  ✔ Use async/await for:
      - cleaner async code
      - easier error handling
      - avoiding callback hell / complex .then chains
      - sequential & parallel flows (with Promise.all)

  ✔ Patterns:
      - sequential:
          const a = await step1();
          const b = await step2(a);
      - parallel:
          const p1 = step1();
          const p2 = step2();
          const [a, b] = await Promise.all([p1, p2]);

  MENTAL MODEL:
    → async marks a function as "promise-returning".
    → await says "pause here until I get the value from this promise".
    → The rest of JS continues running thanks to the event loop.
*/
