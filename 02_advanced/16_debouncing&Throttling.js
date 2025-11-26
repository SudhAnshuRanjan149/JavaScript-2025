/*
  DEBOUNCING & THROTTLING IN JAVASCRIPT — DETAILED EXPLANATION
  ------------------------------------------------------------
  ✔ Both are performance optimization techniques.
  ✔ Used mainly for events that fire VERY frequently:
        - scroll
        - resize
        - mousemove
        - keyup / input
        - window resize
        - API calls on typing

  GOAL:
    → Control how often a function is executed.
*/



/* ============================================================
   1. DEBOUNCING
   ============================================================
   ✔ Ensures a function runs ONLY AFTER a certain time has passed
     WITHOUT being called again.

   ✔ Perfect for:
        - Search box suggestions (API call when typing stops)
        - Window resize end detection
        - Validation after user stops typing
        - Preventing multiple button clicks

   ✔ Behavior:
        User triggers event → wait X ms → if no more events → run function
*/



/* ------------------------------------------------------------
   BASIC DEBOUNCE IMPLEMENTATION
   ------------------------------------------------------------ */

function debounce(func, delay) {
  let timer; // store timeout id

  return function (...args) {
    clearTimeout(timer);  // remove previous timer

    timer = setTimeout(() => {
      func.apply(this, args); // run after full delay
    }, delay);
  };
}



/* ------------------------------------------------------------
   USAGE OF DEBOUNCE
   ------------------------------------------------------------ */

function onSearchInput(event) {
  console.log("API triggered with value:", event.target.value);
}

const debouncedSearch = debounce(onSearchInput, 500);

document.addEventListener("keyup", debouncedSearch);

/*
  ✔ If user types continuously:
        key1 → reset timer
        key2 → reset timer
        key3 → reset timer
        ...
        final key → wait 500ms → run function once
*/



/* ============================================================
   2. THROTTLING
   ============================================================
   ✔ Ensures a function runs AT MOST once every X milliseconds.

   ✔ Perfect for:
        - Scroll animations
        - Infinite scrolling check
        - Window resize handling
        - Mouse movement mapping
        - Limiting API calls over time

   ✔ Behavior:
        User triggers event → function runs → ignore next events
        until the delay period is over.
*/



/* ------------------------------------------------------------
   BASIC THROTTLE IMPLEMENTATION
   ------------------------------------------------------------ */

function throttle(func, delay) {
  let lastTime = 0;

  return function (...args) {
    const now = Date.now();

    if (now - lastTime >= delay) {
      func.apply(this, args);
      lastTime = now;
    }
  };
}



/* ------------------------------------------------------------
   USAGE OF THROTTLE
   ------------------------------------------------------------ */

function onScroll() {
  console.log("Scroll event processed:", Date.now());
}

const throttledScroll = throttle(onScroll, 300);

document.addEventListener("scroll", throttledScroll);

/*
  Even if scroll fires continuously:
    → function runs every 300ms
    → smooth performance
*/



/* ============================================================
   3. DIFFERENCE BETWEEN DEBOUNCE & THROTTLE
   ============================================================ */
/*
  DEBOUNCE:
    ✔ Wait until user stops doing something
    ✔ Great for: search, validation, resizing end

  THROTTLE:
    ✔ Run function at fixed intervals
    ✔ Great for: scroll, resize, mousemove, infinite scroll

  MENTAL MODEL:
    → debounce = “wait”
    → throttle = “limit”
*/



/* ============================================================
   4. ADVANCED DEBOUNCE: immediate option
   ============================================================ */

function debounceAdvanced(fn, delay, immediate = false) {
  let timer;

  return function (...args) {
    const callNow = immediate && !timer;

    clearTimeout(timer);

    timer = setTimeout(() => {
      timer = null;
      if (!immediate) fn.apply(this, args);
    }, delay);

    if (callNow) fn.apply(this, args);
  };
}

/*
  immediate = true:
    → function runs immediately on first call
    → then waits for silence to run again
*/



/* ============================================================
   5. ADVANCED THROTTLE: trailing + leading options
   ============================================================ */

function throttleAdvanced(fn, delay, options = { leading: true, trailing: true }) {
  let lastTime = 0;
  let timer = null;

  return function (...args) {
    const now = Date.now();

    if (!lastTime && options.leading === false) {
      lastTime = now;
    }

    const remaining = delay - (now - lastTime);

    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }

      fn.apply(this, args);
      lastTime = now;
    } else if (!timer && options.trailing !== false) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        lastTime = Date.now();
        timer = null;
      }, remaining);
    }
  };
}

/*
  leading: true  → run immediately
  leading: false → wait first interval

  trailing: true → run at the end
  trailing: false → do NOT run at end
*/



/* ============================================================
   6. EXAMPLES OF WHERE TO USE WHICH
   ============================================================ */
/*
  DEBOUNCE:
    ✔ Search field
    ✔ Auto-save user input
    ✔ Resize event (after user stops resizing window)
    ✔ Prevent accidental double-clicking

  THROTTLE:
    ✔ Scroll animation updates
    ✔ Checking scroll position for “infinite scroll”
    ✔ Updating mouse tracker (game events)
    ✔ Recalculating layout on resize
*/



/* ============================================================
   7. REAL-WORLD DEMO (SCENARIO COMPARISON)
   ============================================================ */

/*
  USER TYPING IN SEARCH BOX:

    Input: A, B, C, D, (stop)
    
    debounce 500ms:
        → triggers ONCE, after 500ms of silence

    throttle 500ms:
        → triggers every 500ms WHILE typing
*/


/*
  WINDOW SCROLL:

    scroll events fire 100 times/sec

    debounce:
        → update scroll position AFTER user stops scrolling

    throttle:
        → update scroll position every 100ms → smooth animations
*/



/* ============================================================
   SUMMARY
   ============================================================ */
/*
  ✔ Debounce:
        Function runs AFTER the event stops.
        → “Wait until done.”

  ✔ Throttle:
        Function runs AT MOST once per interval.
        → “Run regularly.”

  ✔ Both improve performance on high-frequency events.
  ✔ Both prevent unnecessary function calls & API requests.
*/
