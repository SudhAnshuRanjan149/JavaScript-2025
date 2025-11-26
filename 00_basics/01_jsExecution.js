/*
  HOW JAVASCRIPT RUNS — BROWSER VS NODE.JS (DETAILED)
  ---------------------------------------------------
  JavaScript does NOT run by itself.
  It needs an environment that provides:
    → Engine (to execute JS code)
    → APIs (extra features JS alone does not have)
    → Event Loop (to handle async behavior)

  JS in Browser and JS in Node.js share the *same language*,
  but run in DIFFERENT environments with different capabilities.
*/



/* ============================================================
   1. JAVASCRIPT ENGINE (COMMON IN BOTH)
   ============================================================
   - Most browsers and Node.js use **Google’s V8** engine.
   - A JS Engine has TWO main parts:

       1. **Memory Heap**
          → stores variables, objects, functions

       2. **Call Stack**
          → executes code line by line
          → follows LIFO (Last In First Out)

   - The engine runs only PURE JavaScript.
   - Anything else (DOM, timers, filesystem) is NOT part of JS!
*/



/* ============================================================
   2. HOW JAVASCRIPT RUNS IN BROWSER
   ============================================================
   The browser provides:
     → JS Engine (V8 for Chrome, SpiderMonkey for Firefox)
     → Web APIs (NOT part of JS)
     → Event Loop & Callback Queue
     → Rendering engine (paints UI)

   BROWSER WEB APIs include:
     - DOM (document, window, querySelector, events)
     - BOM (navigator, location, history)
     - Timers (setTimeout, setInterval)
     - Fetch API, XMLHttpRequest
     - LocalStorage, SessionStorage
     - WebSockets
     - Canvas API
     - Geolocation
     - WebRTC

   These features DO NOT exist in pure JavaScript.
   The browser provides them.
*/

document.addEventListener("click", () => console.log("Clicked"));
/*
  'document' is NOT JavaScript.
  It is a Web API provided by the browser.
*/



/* ============================================================
   3. HOW JAVASCRIPT RUNS IN NODE.JS
   ============================================================
   Node.js also uses the V8 engine but provides DIFFERENT APIs.

   Node.js provides:
     → File System access (fs module)
     → Operating System access (os module)
     → Networking (http, net)
     → Process control (process object)
     → Timers (setTimeout, setImmediate)
     → Modules (CommonJS and ES Modules)
     → Streams, Buffers
     → Crypto library

   What Node.js does NOT have:
     - DOM
     - window object
     - document
     - CSSOM
     - Web-specific APIs
*/

const fs = require("fs");
fs.writeFileSync("data.txt", "Hello Node");
/*
  'fs' is NOT JavaScript.
  It is a Node.js API.
*/



/* ============================================================
   4. EVENT LOOP — BOTH USE IT BUT IMPLEMENT IT DIFFERENTLY
   ============================================================
   The event loop handles asynchronous tasks.

   BROWSER EVENT LOOP:
     - Task Queue
     - Microtask Queue
     - Rendering pipeline (frames, layout, paint)
     - Web APIs produce callbacks

   NODE.JS EVENT LOOP:
     - Provided by libuv (C library)
     - Handles:
         → File IO
         → Network IO
         → Timers
         → Threadpool
     - More queues/phases:
         → timers
         → I/O callbacks
         → idle/prepare
         → poll
         → check
         → close callbacks
*/



/* ============================================================
   5. KEY DIFFERENCES — BROWSER VS NODE
   ============================================================
   BROWSER:
     - Focus: User interface + interactions
     - Has DOM
     - Has window, document
     - No file system access (for security)
     - APIs like fetch, storage, canvas

   NODE.JS:
     - Focus: Server-side programming
     - No DOM
     - Direct OS/file/network access
     - Built for backend performance
*/



/* ============================================================
   6. WHAT IS COMMON BETWEEN BOTH
   ============================================================
   - JavaScript syntax
   - Variables, functions, loops
   - Promises
   - Async/await
   - Arrays, Objects
   - Classes
   - Modules (ESM)

   Because both use the same JavaScript engine.
*/



/* ============================================================
   7. EXECUTION FLOW (BOTH ENVIRONMENTS)
   ============================================================
   1. JS Engine reads the code
   2. Creates Global Execution Context
   3. Hoists declarations
   4. Executes code line-by-line
   5. Sends async tasks to Event Loop
   6. Event Loop puts callbacks back into Call Stack when ready
*/



/* ============================================================
   8. SUMMARY (BROWSER vs NODE)
   ============================================================

   Browser:
     - JavaScript + DOM + Web APIs
     - Focus on UI and interaction
     - No filesystem/network-level access

   Node.js:
     - JavaScript + Node APIs + libuv
     - Focus on backend logic and server development
     - No DOM or window, full OS access
*/



/* ============================================================
   9. SUPER SIMPLE REAL-LIFE ANALOGY
   ============================================================
   - JavaScript = the language (English)
   - Browser = Government of USA (provides US-specific services)
   - Node.js = Government of Japan (provides Japan-specific services)
   The language is the same, but environments are different.
*/
