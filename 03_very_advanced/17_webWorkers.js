/****************************************************************************************
 * WEB WORKERS IN JAVASCRIPT — COMPLETE & DETAILED GUIDE (BEGINNER → ADVANCED)
 * INCLUDING DIFFERENCE WITH SERVICE WORKERS
 ****************************************************************************************/


/*========================================================================================
 1. WHAT ARE WEB WORKERS?
========================================================================================*/
//
// JavaScript is SINGLE-THREADED by default.
// ----------------------------------------
// This means:
//
// ❌ One task at a time
// ❌ Heavy computation blocks UI
// ❌ Page becomes unresponsive during CPU-heavy tasks
//
// WEB WORKERS solve this by providing:
// ------------------------------------
// ✅ Background threads
// ✅ Parallel execution
// ✅ Non-blocking computation
//
// In simple words:
// ----------------
// 👉 Web Workers allow JavaScript to run MULTI-THREADED code
// 👉 Without blocking the main UI thread
//


/*========================================================================================
 2. TYPES OF WORKERS IN JAVASCRIPT
========================================================================================*/
//
// 1️⃣ DEDICATED WEB WORKER
//    → Used by ONE script only
//
// 2️⃣ SHARED WORKER
//    → Used by MULTIPLE browser tabs
//
// 3️⃣ SERVICE WORKER
//    → Special worker for NETWORK, CACHING, OFFLINE SUPPORT
//
// NOTE:
// -----
// When we say "Web Worker", we usually mean:
// ✅ Dedicated Worker
//


/*========================================================================================
 3. BASIC WEB WORKER ARCHITECTURE
========================================================================================*/
//
// MAIN THREAD (UI THREAD)
// ------------------------
// • Handles:
//   ✅ DOM
//   ✅ Events
//   ✅ Rendering
//
// WORKER THREAD (BACKGROUND)
// --------------------------
// • Handles:
//   ✅ Heavy computation
//   ✅ Data processing
//   ✅ Parsing
//   ✅ Encryption
//
// Communication happens using:
// -----------------------------
// ✅ postMessage()
// ✅ onmessage
// ✅ Message Passing (NO shared memory by default)
//


/*========================================================================================
 4. CREATING A WEB WORKER
========================================================================================*/
//
// STEP 1 → Create a worker file (worker.js)
// STEP 2 → Load it using new Worker()
// STEP 3 → Communicate using postMessage()
//


// -------------------------------
// 📁 worker.js
// -------------------------------

self.onmessage = function (event) {
  const data = event.data;

  let result = 0;
  for (let i = 0; i < data; i++) {
    result += i; // heavy computation
  }

  self.postMessage(result);
};


// -------------------------------
// 📁 main.js
// -------------------------------

const worker = new Worker("worker.js");

worker.postMessage(1000000000); // send data to worker

worker.onmessage = function (event) {
  console.log("Result from worker:", event.data);
};


/*========================================================================================
 5. WHY UI DOES NOT FREEZE WITH WEB WORKERS
========================================================================================*/
//
// Because:
//
// ✅ Worker runs in a SEPARATE THREAD
// ✅ Main thread remains free for UI
// ✅ No blocking of:
//    • Click events
//    • Animations
//    • Rendering
//    • Scrolling
//


/*========================================================================================
 6. WHAT A WEB WORKER CAN DO
========================================================================================*/
//
// ✅ Heavy mathematical calculations
// ✅ Parsing large JSON
// ✅ Image processing
// ✅ Video/audio processing
// ✅ Machine learning
// ✅ Encryption / Compression
// ✅ Data transformation


/*========================================================================================
 7. WHAT A WEB WORKER CANNOT DO
========================================================================================*/
//
// ❌ NO direct DOM access
// ❌ NO document object
// ❌ NO window object
// ❌ NO alert(), prompt()
// ❌ NO direct UI updates
//
// ✅ It only works with:
//    • self
//    • postMessage
//    • fetch
//    • timers
//    • IndexedDB
//    • WebSockets
//


/*========================================================================================
 8. DATA TRANSFER TO WORKER (COPY vs TRANSFER)
========================================================================================*/
//
// By default:
// -----------
// ✅ Data is COPIED using structured cloning
//
// This is slow for large data ❌
//
// TRANSFERABLE OBJECTS:
// ----------------------
// ✅ ArrayBuffer
// ✅ MessagePort
// ✅ ImageBitmap
//
// These are MOVED, not copied
//

const buffer = new ArrayBuffer(1024);

worker.postMessage(buffer, [buffer]); // ✅ transferred (zero-copy)


/*========================================================================================
 9. TERMINATING A WEB WORKER
========================================================================================*/
//
// From Main Thread:
worker.terminate(); // ✅ instantly stops worker
//
// From Worker:
self.close(); // ✅ stops itself


/*========================================================================================
 10. SHARED WORKERS (MULTI-TAB COMMUNICATION)
========================================================================================*/
//
// A SharedWorker can be used by:
// ------------------------------
// ✅ Multiple browser tabs
// ✅ Multiple iframes
//
// Used for:
// ---------
// ✅ Shared sockets
// ✅ Shared state
// ✅ Multi-tab coordination
//

const shared = new SharedWorker("sharedWorker.js");

shared.port.postMessage("Hello");
shared.port.onmessage = (e) => console.log(e.data);


/*========================================================================================
 11. WEB WORKERS & ERROR HANDLING
========================================================================================*/
//
// Worker error handling:
worker.onerror = function (error) {
  console.log("Worker Error:", error.message);
};


/*========================================================================================
 12. PERFORMANCE BENEFITS OF WEB WORKERS
========================================================================================*/
//
// ✅ True parallel execution
// ✅ Better CPU utilization
// ✅ Responsive UI
// ✅ Prevents long task blocking
// ✅ Enables multi-core usage


/*========================================================================================
 13. REAL-WORLD USE CASES OF WEB WORKERS
========================================================================================*/
//
// ✅ Image editors (Photoshop Web)
// ✅ Video encoding
// ✅ PDF processing
// ✅ AI & ML models
// ✅ Code compilers (Monaco Editor)
// ✅ Large data analytics
// ✅ Games
// ✅ Financial simulations
// ✅ Encryption systems


/*========================================================================================
 14. LIMITATIONS OF WEB WORKERS
========================================================================================*/
//
// ❌ No DOM access
// ❌ Communication overhead
// ❌ Not useful for small tasks
// ❌ Debugging is harder
// ❌ Separate file required
// ❌ No access to global UI state directly


/****************************************************************************************
 * SERVICE WORKER — COMPLETE THEORY
 ****************************************************************************************/

/*========================================================================================
 15. WHAT IS A SERVICE WORKER?
========================================================================================*/
//
// A SERVICE WORKER is a special type of worker that:
//
// ✅ Runs in the BACKGROUND
// ✅ Acts as a NETWORK PROXY
// ✅ Intercepts HTTP requests
// ✅ Handles caching
// ✅ Enables OFFLINE support
// ✅ Enables PUSH notifications
// ✅ Enables BACKGROUND SYNC
//
// Service Worker is NOT for computation ❌
// It is for:
// ---------
// ✅ NETWORK CONTROL
// ✅ APPLICATION LIFECYCLE CONTROL
//


/*========================================================================================
 16. SERVICE WORKER LIFECYCLE
========================================================================================*/
//
// 1️⃣ Register
// 2️⃣ Install
// 3️⃣ Activate
// 4️⃣ Fetch Interception
// 5️⃣ Terminate & Restart automatically
//

navigator.serviceWorker.register("sw.js");


/*========================================================================================
 17. SERVICE WORKER CORE FEATURES
========================================================================================*/
//
// ✅ Offline mode
// ✅ Cache API
// ✅ Push notifications
// ✅ Network intercept
// ✅ Background sync
// ✅ PWA support
// ✅ Works even when tab is closed
//


/*========================================================================================
 18. WHAT SERVICE WORKER CANNOT DO
========================================================================================*/
//
// ❌ No direct DOM access
// ❌ No window access
// ❌ Cannot block UI
// ✅ Lives independent of pages


/*========================================================================================
 19. WEB WORKER vs SERVICE WORKER (MASTER COMPARISON)
========================================================================================*/
//
// FEATURE                    WEB WORKER                    SERVICE WORKER
// -------------------------------------------------------------------------------------
// Purpose                    Heavy computation             Network + Offline + PWA
// Runs in background         ✅ Yes                         ✅ Yes
// Has UI access              ❌ No                          ❌ No
// Can access DOM             ❌ No                          ❌ No
// Can intercept fetch        ❌ No                          ✅ Yes
// Used for CPU tasks         ✅ Yes                         ❌ No
// Used for caching           ❌ No                          ✅ Yes
// Used for push notifications ❌ No                         ✅ Yes
// Lifetime                   While page is open            Independent of page
// Offline support            ❌ No                          ✅ Yes
// Runs even after tab closes ❌ No                          ✅ Yes
// Registers via              new Worker()                  navigator.serviceWorker
// Use-case                   Computation                   Network/PWA
// Can be terminated manually ✅ Yes                         ❌ Browser controlled
// Multithreading             ✅ Yes                         ❌ Not for parallel compute


/*========================================================================================
 20. WHEN TO USE WEB WORKER vs SERVICE WORKER
========================================================================================*/
//
// USE WEB WORKER WHEN:
// --------------------
// ✅ Heavy calculations
// ✅ Data processing
// ✅ Image/video processing
// ✅ ML workloads
// ✅ Parsing
//
// USE SERVICE WORKER WHEN:
// ------------------------
// ✅ Offline applications
// ✅ Caching assets
// ✅ API request interception
// ✅ Push notifications
// ✅ Background sync
// ✅ Progressive Web Apps (PWA)
//


/*========================================================================================
 21. INTERVIEW QUESTIONS & TRAPS
========================================================================================*/
//
// Q1: Can Web Worker access the DOM?
// ❌ No
//
// Q2: Can Service Worker do computation?
// ❌ No (not meant for that)
//
// Q3: Which one enables offline apps?
// ✅ Service Worker
//
// Q4: Which one enables multi-core usage?
// ✅ Web Worker
//
// Q5: Which one is used in PWAs?
// ✅ Service Worker
//
// Q6: Which one runs after tab is closed?
// ✅ Service Worker
//


/*========================================================================================
 22. ONE-PAGE FINAL MASTER SUMMARY
========================================================================================*/
//
// ✅ Web Worker = Multi-threaded computation
// ✅ Web Worker = Background CPU processing
// ✅ No DOM access
// ✅ Communication via postMessage
//
// ✅ Service Worker = Network proxy
// ✅ Enables offline, caching, push
// ✅ Independent of page lifecycle
// ✅ Backbone of PWA
//
// ✅ Web Worker → Performance
// ✅ Service Worker → Network + Offline
//
// If you master both ✅
// → You unlock HIGH-PERFORMANCE + OFFLINE-FIRST web architecture 🚀🔥

