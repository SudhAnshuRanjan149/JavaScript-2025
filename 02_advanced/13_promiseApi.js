/*
  ALL PROMISE APIs IN JAVASCRIPT — VERY DETAILED EXPLANATION
  ----------------------------------------------------------
  This includes:
    ✔ Promise.all
    ✔ Promise.allSettled
    ✔ Promise.race
    ✔ Promise.any
    ✔ Promise.resolve
    ✔ Promise.reject
    ✔ Promise.finally
    ✔ Promise.then
    ✔ Promise.catch

  Each API is explained with:
    - How it works
    - When to use it
    - Important pitfalls
*/



/* ============================================================
   1. Promise.resolve(value)
   ============================================================ */
/*
  ✔ Creates a PROMISE that resolves immediately with the given value.
  ✔ If value is a Promise → returned Promise adopts its state.
*/

const p_resolve = Promise.resolve(10);
p_resolve.then(v => console.log("resolve:", v)); // 10



/* ============================================================
   2. Promise.reject(error)
   ============================================================ */
/*
  ✔ Creates a PROMISE that rejects immediately with given error.
*/

const p_reject = Promise.reject("Something went wrong");
p_reject.catch(err => console.log("reject:", err));



/* ============================================================
   3. Promise.prototype.then()
   ============================================================ */
/*
  ✔ Used to handle resolved values.
  ✔ Returns a NEW Promise (VERY IMPORTANT)
*/

Promise.resolve(5)
  .then(v => {
    console.log("then got:", v);
    return v * 2;   // automatically wrapped in Promise.resolve
  })
  .then(v => console.log("then after chain:", v));



/* ============================================================
   4. Promise.prototype.catch()
   ============================================================ */
/*
  ✔ Handles rejected Promises.
  ✔ Also returns a new Promise.
*/

Promise.reject("error")
  .catch(err => {
    console.log("caught:", err);
    return "fixed";
  })
  .then(v => console.log("after catch:", v));



/* ============================================================
   5. Promise.prototype.finally()
   ============================================================ */
/*
  ✔ Runs whether promise resolves or rejects.
  ✔ Does NOT receive the resolved value or error.
  ✔ Useful for cleanup (stop loader, close popup, etc.)
*/

Promise.resolve("done")
  .finally(() => console.log("finally: executed"))
  .then(v => console.log("value:", v));



/* ============================================================
   6. Promise.all(promises)
   ============================================================ */
/*
  ✔ Runs ALL promises in parallel
  ✔ FULFILLS when ALL promises fulfill
  ✔ REJECTS if ANY promise rejects (fail-fast behavior)
  ✔ Returns array of values in order of input, not completion order

  BEST USE CASE:
    - When all async tasks MUST succeed
    - When results depend on each other
*/

const pa = new Promise(res => setTimeout(() => res("A"), 1000));
const pb = new Promise(res => setTimeout(() => res("B"), 500));
const pc = new Promise(res => setTimeout(() => res("C"), 1500));

Promise.all([pa, pb, pc])
  .then(values => console.log("all values:", values))
  .catch(err => console.log("all rejected:", err));

/*
  If ANY promise rejects:
    Promise.all → REJECTS immediately
*/

const bad = new Promise((_, rej) => setTimeout(() => rej("Failed!"), 700));

Promise.all([pa, bad, pb])
  .then(v => console.log(v))
  .catch(err => console.log("all error:", err)); // "Failed!"



/* ============================================================
   7. Promise.allSettled(promises)
   ============================================================ */
/*
  ✔ Runs ALL promises in parallel
  ✔ NEVER rejects → always resolves
  ✔ Returns array with results for ALL promises:
        {status:"fulfilled", value: ...}
        {status:"rejected", reason: ...}

  BEST USE CASE:
    - When you want results from ALL tasks (even if some fail)
*/

Promise.allSettled([pa, pb, bad]).then(results => {
  console.log("allSettled results:", results);
});

/*
  Output Example:
    [
      {status: "fulfilled", value: "A"},
      {status: "fulfilled", value: "B"},
      {status: "rejected", reason: "Failed!"}
    ]
*/



/* ============================================================
   8. Promise.race(promises)
   ============================================================ */
/*
  ✔ Resolves or rejects as soon as the FIRST promise settles
  ✔ Faster one wins
  ✔ Useful for:
      - timeout behavior
      - cancel slow requests
*/

const slow = new Promise(res => setTimeout(() => res("Slow done"), 1500));
const fast = new Promise(res => setTimeout(() => res("Fast done"), 500));

Promise.race([slow, fast])
  .then(v => console.log("race winner:", v))
  .catch(err => console.log("race error:", err));

/*
  If the first settled promise rejects → race rejects!
*/

const failFast = new Promise((_, rej) => setTimeout(() => rej("Failed quickly!"), 300));

Promise.race([slow, failFast])
  .then(v => console.log(v))
  .catch(err => console.log("race rejected:", err)); // "Failed quickly!"



/* ============================================================
   9. Promise.any(promises)
   ============================================================ */
/*
  ✔ Resolves as soon as ANY promise FULFILLS
  ✔ Ignores rejections
  ✔ If ALL reject → rejects with AggregateError

  BEST USE CASE:
    - You only need ONE successful result
    - Fetching from multiple mirrors, fallback servers, etc.
*/

const p1_fail = Promise.reject("Fail1");
const p2_fail = Promise.reject("Fail2");
const p3_ok = Promise.resolve("Success!");

Promise.any([p1_fail, p2_fail, p3_ok])
  .then(v => console.log("any resolved:", v)) // "Success!"
  .catch(err => console.log("any error:", err));

/*
  If ALL fail:
*/

Promise.any([p1_fail, p2_fail])
  .then(v => console.log(v))
  .catch(err => console.log("any AggregateError:", err));



/* ============================================================
   10. Promise.race vs Promise.any DIFFERENCE
   ============================================================ */
/*
  race → first to settle (resolve OR reject)
  any  → first to resolve (ONLY resolve)

  Example:
    If first promise rejects and second resolves:
      - race → rejects
      - any  → resolves
*/



/* ============================================================
   11. Promise.all vs Promise.allSettled DIFFERENCE
   ============================================================ */
/*
  all         → stops early on FIRST failure, and rejects
  allSettled  → waits for ALL, and never rejects
*/



/* ============================================================
   12. CHAINING PROMISE API FUNCTIONS TOGETHER
   ============================================================ */

const url1 = Promise.resolve("User data loaded");
const url2 = Promise.resolve("Posts loaded");

Promise.all([url1, url2])
  .then(res => {
    console.log("all OK:", res);
    return Promise.race([
      new Promise(res => setTimeout(() => res("Fast!"), 300)),
      new Promise(res => setTimeout(() => res("Slow!"), 800)),
    ]);
  })
  .then(raceResult => {
    console.log("race result:", raceResult);
    return Promise.any([
      Promise.reject("Bad"),
      Promise.resolve("Good"),
    ]);
  })
  .then(anyResult => {
    console.log("any result:", anyResult);
  })
  .catch(err => {
    console.log("error somewhere:", err);
  })
  .finally(() => {
    console.log("all tasks done");
  });



/* ============================================================
   13. SUMMARY OF ALL PROMISE APIs (SUPER IMPORTANT)
   ============================================================ */
/*
  Promise.resolve(value)
    → create a resolved promise

  Promise.reject(error)
    → create a rejected promise

  promise.then(fn)
    → handle resolve

  promise.catch(fn)
    → handle reject

  promise.finally(fn)
    → always run, regardless of state

  Promise.all(promises)
    → wait all, reject if ANY fails

  Promise.allSettled(promises)
    → wait all, never rejects, return statuses

  Promise.race(promises)
    → first settle wins (resolve OR reject)

  Promise.any(promises)
    → first resolve wins (ignores rejects, except if ALL reject)
*/



/* ============================================================
   MENTAL MODEL:
   ============================================================
/*
  ✔ Promise.all:
        "All must succeed"

  ✔ Promise.allSettled:
        "Give me every result, I don’t care if some fail"

  ✔ Promise.race:
        "Whichever finishes first wins — even errors!"

  ✔ Promise.any:
        "Give me the FIRST successful result"
*/
