/*
  BOM (BROWSER OBJECT MODEL) — GREAT DETAIL
  -----------------------------------------
  ✔ BOM = the set of OBJECTS provided by the browser
          that allow JavaScript to INTERACT WITH THE BROWSER WINDOW.

  ✔ DOM = interacts with the DOCUMENT (HTML)
  ✔ BOM = interacts with the BROWSER (window, history, screen, location, navigator)

  ✔ BOM is NOT standard like DOM — each browser implements parts of it,
    but modern browsers are more consistent.

  ✔ KEY BOM OBJECTS:
        1. window
        2. document  (actually part of DOM, but accessed via window)
        3. screen
        4. location
        5. history
        6. navigator
        7. alert / confirm / prompt APIs
        8. timers (setTimeout, setInterval)
        9. cookies (document.cookie)
*/



/* ============================================================
   1. window OBJECT (ROOT OF BOM)
   ============================================================
*/
/*
  ✔ window is the TOP-LEVEL global object in browsers.
  ✔ All global variables, functions become properties of window.

  ✔ IMPORTANT WINDOW PROPERTIES/ METHODS:
      - window.innerHeight / innerWidth
      - window.open()
      - window.close()
      - window.alert()
      - window.setTimeout()
      - window.setInterval()
      - window.location
      - window.history
      - window.navigator
*/

console.log(window.innerWidth);  // width of viewport
console.log(window.innerHeight); // height of viewport

// Opening a new tab/window
// window.open("https://google.com");

// Closing current window
// window.close();



/* ============================================================
   2. LOCATION OBJECT (window.location)
   ============================================================
*/
/*
  ✔ Contains the URL of current page.
  ✔ Allows navigation, reload, redirect.

  IMPORTANT PROPERTIES:
      - location.href
      - location.protocol
      - location.host
      - location.pathname
      - location.search
      - location.hash

  IMPORTANT METHODS:
      - location.assign(url)
      - location.replace(url)
      - location.reload()
*/

console.log(location.href);       // full URL
console.log(location.pathname);   // path
console.log(location.search);     // query params
console.log(location.hash);       // #hash

// Redirect to new page
// location.assign("https://example.com");

// Replace without saving to history
// location.replace("https://example.com");

// Reload the page
// location.reload();



/* ============================================================
   3. HISTORY OBJECT (window.history)
   ============================================================
*/
/*
  ✔ Controls browser's session history.
  ✔ Allows forward/backward navigation.

  METHODS:
      - history.back()
      - history.forward()
      - history.go(n)

  modern SPA (React/Vue/Angular) uses:
      - history.pushState()
      - history.replaceState()
*/

console.log(history.length); // total pages in session history

// Go back one page
// history.back();

// Go forward one page
// history.forward();

// Go 2 pages back
// history.go(-2);



/* ============================================================
   4. NAVIGATOR OBJECT (window.navigator)
   ============================================================
*/
/*
  ✔ Provides browser & device information.

  COMMON PROPERTIES:
      - navigator.userAgent
      - navigator.language
      - navigator.onLine
      - navigator.geolocation   (API)

  ✔ navigator = BOM interface to system.
*/

console.log(navigator.userAgent);  // browser info
console.log(navigator.language);   // browser language
console.log(navigator.onLine);     // true/false (network)

// Geolocation example
/*
navigator.geolocation.getCurrentPosition(pos => {
  console.log(pos.coords.latitude, pos.coords.longitude);
});
*/



/* ============================================================
   5. SCREEN OBJECT (window.screen)
   ============================================================
*/
/*
  ✔ Gives information about the user's screen.

  COMMON PROPERTIES:
      - screen.width
      - screen.height
      - screen.availWidth
      - screen.availHeight
      - screen.colorDepth
*/

console.log(screen.width, screen.height);
console.log(screen.availWidth, screen.availHeight);



/* ============================================================
   6. DIALOG APIs (alert, confirm, prompt)
   ============================================================
*/
/*
  ✔ PART OF BOM — NOT PART OF JS language itself.
*/

/// alert("Hello");

// let ok = confirm("Are you sure?");
// console.log(ok);

// let name = prompt("Enter name:");
// console.log(name);



/* ============================================================
   7. TIMERS: setTimeout & setInterval
   ============================================================
*/
/*
  ✔ Provided by BOM (NOT JavaScript core)
  ✔ Used for scheduling code execution
*/

setTimeout(() => {
  console.log("Runs once after 1 sec");
}, 1000);

let id = setInterval(() => {
  console.log("Runs every 2 sec");
}, 2000);

// clearInterval(id); // STOP interval



/* ============================================================
   8. COOKIES (document.cookie)
   ============================================================
*/
/*
  ✔ BOM manages cookies through document.cookie.

  ✔ Setting a cookie:
      document.cookie = "username=John; expires=Tue, 19 Jan 2038 03:14:07 UTC; path=/";

  ✔ Getting cookies:
      console.log(document.cookie);
*/

document.cookie = "theme=dark; path=/";
console.log(document.cookie);



/* ============================================================
   9. RESIZE & SCROLL EVENTS (WINDOW LEVEL EVENTS)
   ============================================================
*/
/*
  ✔ window provides UI-based events:
      - resize
      - scroll
      - load
      - beforeunload
*/

window.addEventListener("resize", () => {
  console.log("Window resized:", window.innerWidth);
});

window.addEventListener("scroll", () => {
  console.log("Scrolling…", window.scrollY);
});



/* ============================================================
   10. BOM VS DOM (INTERVIEW IMPORTANT)
   ============================================================
*/
/*
  ✔ DOM = Document Object Model
      - Represents HTML structure
      - document.querySelector()
      - document.createElement()
      - Manipulate elements

  ✔ BOM = Browser Object Model
      - Interacts with browser window
      - window, navigator, history, screen, location

  ✔ DOM is inside BOM (via window.document)
*/



/* ============================================================
   11. WHAT IS NOT PART OF BOM?
   ============================================================
*/
/*
  ✔ JavaScript core engine (ECMAScript)
  ✔ Data types, variables, functions
  ✔ Promises, async/await

  ✔ BOM is browser-specific.
*/



/* ============================================================
   12. MODERN USE CASES OF BOM (SPAs)
   ============================================================
*/
/*
  ✔ Single Page Applications use BOM heavily:
      - window.history.pushState() → client-side routing
      - window.location → URL nav
      - navigator.onLine → offline apps
      - geolocation, media devices
      - localStorage/sessionStorage
*/

history.pushState({ page: 1 }, "title", "?page=1");



/* ============================================================
   13. SUMMARY (CHEAT SHEET)
   ============================================================
*/
/*
  ✔ BOM = browser-level APIs for interacting with the browser window.
  
  MAIN OBJECTS:
    window:
      - global object
      - provides alert, timers, size, events

    location:
      - URL manipulation, reload, redirects

    history:
      - back, forward, go, pushState, replaceState

    navigator:
      - browser/system info, geolocation

    screen:
      - screen size, color depth

    timers:
      - setTimeout, setInterval

    dialogs:
      - alert, confirm, prompt

    cookies:
      - document.cookie

  MENTAL MODEL:
    DOM = webpage structure
    BOM = browser environment around the webpage
*/
