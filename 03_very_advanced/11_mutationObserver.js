/****************************************************************************************
 * MUTATION OBSERVER IN JAVASCRIPT — COMPLETE & DETAILED GUIDE (BEGINNER → ADVANCED)
 *
 * Covers:
 * ✅ What is MutationObserver?
 * ✅ Why it exists
 * ✅ What problems it solves
 * ✅ All observer options
 * ✅ All mutation record types
 * ✅ Real-world use cases
 * ✅ Performance considerations
 * ✅ Interview-level traps
 ****************************************************************************************/


/*========================================================================================
 1. WHAT IS A MUTATION OBSERVER?
========================================================================================*/
//
// A MutationObserver is a built-in JavaScript API that allows you to:
// -------------------------------------------------------------------
// ✅ Watch for changes in the DOM
// ✅ Detect when:
//    • Nodes are added or removed
//    • Attributes change
//    • Text content changes
//
// It is the MODERN replacement for:
// ---------------------------------
// ❌ DOMNodeInserted
// ❌ DOMNodeRemoved
// ❌ DOMSubtreeModified
//
// Those old events were:
// ----------------------
// ❌ Slow
// ❌ Unreliable
// ❌ Deprecated
//
// MutationObserver is:
// --------------------
// ✅ Fast
// ✅ Asynchronous
// ✅ Batch-based
// ✅ Highly configurable
//

/*========================================================================================
 2. WHY MUTATION OBSERVER EXISTS
========================================================================================*/
//
// Problem before MutationObserver:
// --------------------------------
// • No efficient way to detect DOM changes
// • Event listeners were slow
// • Infinite loops possible
// • Performance disasters for dynamic apps
//
// MutationObserver fixes this with:
// ---------------------------------
// ✅ Microtask-based updates
// ✅ Batched mutation records
// ✅ Precise filtering
// ✅ Non-blocking detection
//

/*========================================================================================
 3. BASIC SYNTAX
========================================================================================*/
//
// STEP 1 → Create an observer with a callback
// STEP 2 → Observe a target with options
// STEP 3 → Stop observing when done
//

const observer = new MutationObserver((mutationsList, observerInstance) => {
  // This callback runs when DOM changes happen
});

observer.observe(targetNode, options);

// Stop observing
observer.disconnect();


/*========================================================================================
 4. SIMPLE WORKING EXAMPLE
========================================================================================*/

const target = document.getElementById("app");

const observer1 = new MutationObserver((mutations) => {
  console.log("DOM changed:", mutations);
});

observer1.observe(target, {
  childList: true   // watch for added/removed child nodes
});

// Example trigger
target.appendChild(document.createElement("p"));


/*========================================================================================
 5. OBSERVER OPTIONS (VERY IMPORTANT)
========================================================================================*/
//
// These options control WHAT kind of changes you want to detect:
//
// {
//   childList: true,        // ✅ detects child add/remove
//   attributes: true,      // ✅ detects attribute changes
//   characterData: true,   // ✅ detects text changes
//   subtree: true,         // ✅ watch entire subtree
//   attributeOldValue: true,
//   characterDataOldValue: true,
//   attributeFilter: ["class", "id"]
// }
//

/*----------------------------------------------------------------------------------------
 OPTION BREAKDOWN
----------------------------------------------------------------------------------------*/
//
// ✅ childList
//    → Detects node addition or removal
//
// ✅ attributes
//    → Detects changes to attributes like class, id, src
//
// ✅ characterData
//    → Detects text content changes
//
// ✅ subtree
//    → Applies observation to all descendants
//
// ✅ attributeOldValue
//    → Stores previous attribute value
//
// ✅ characterDataOldValue
//    → Stores old text value
//
// ✅ attributeFilter
//    → Only watch specific attributes
//


/*========================================================================================
 6. ALL TYPES OF MUTATION RECORDS
========================================================================================*/
//
// The 'mutationsList' array contains objects of type MutationRecord:
//
// mutation.type can be:
// ---------------------
// • "childList"
// • "attributes"
// • "characterData"
//
// Each mutation object includes useful info:
// ------------------------------------------
// • target        → node affected
// • addedNodes    → newly added nodes
// • removedNodes  → removed nodes
// • attributeName → which attribute changed
// • oldValue      → old value (if enabled)
//

const observer2 = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    console.log("Type:", mutation.type);
    console.log("Target:", mutation.target);
    console.log("Added:", mutation.addedNodes);
    console.log("Removed:", mutation.removedNodes);
    console.log("Attribute:", mutation.attributeName);
    console.log("Old value:", mutation.oldValue);
  });
});


/*========================================================================================
 7. WATCHING ATTRIBUTE CHANGES
========================================================================================*/

const box = document.getElementById("box");

const attrObserver = new MutationObserver((mutations) => {
  mutations.forEach((m) => {
    console.log(`Attribute ${m.attributeName} changed`);
  });
});

attrObserver.observe(box, {
  attributes: true,
  attributeFilter: ["class"]
});

// Trigger
box.classList.add("active");


/*========================================================================================
 8. WATCHING TEXT (CHARACTER DATA) CHANGES
========================================================================================*/

const textNode = document.getElementById("text");

const textObserver = new MutationObserver((mutations) => {
  mutations.forEach((m) => {
    console.log("Text changed from:", m.oldValue);
  });
});

textObserver.observe(textNode, {
  characterData: true,
  characterDataOldValue: true,
  subtree: true
});

// Trigger
textNode.textContent = "New text";


/*========================================================================================
 9. WATCHING ENTIRE SUBTREE (VERY COMMON)
========================================================================================*/

const root = document.body;

const subtreeObserver = new MutationObserver((mutations) => {
  console.log("Something changed in DOM tree");
});

subtreeObserver.observe(root, {
  childList: true,
  subtree: true
});


/*========================================================================================
 10. STOPPING THE OBSERVER (IMPORTANT FOR MEMORY)
========================================================================================*/
//
// If you do NOT disconnect observers:
// -----------------------------------
// ❌ Memory leaks
// ❌ Performance issues
// ❌ Background observers running forever
//

subtreeObserver.disconnect(); // ✅ stops observing


/*========================================================================================
 11. MUTATION OBSERVER IS ASYNCHRONOUS (IMPORTANT CONCEPT)
========================================================================================*/
//
// MutationObserver callbacks run:
// -------------------------------
// ✅ After the DOM mutation happens
// ✅ In the microtask queue
// ✅ Before repaint
//
// This means:
// -----------
// • Multiple mutations are batched together
// • Callback does NOT run immediately per change
//

const target2 = document.getElementById("demo");

const asyncObserver = new MutationObserver(() => {
  console.log("Observed AFTER mutation");
});

asyncObserver.observe(target2, { childList: true });

target2.appendChild(document.createElement("p"));
console.log("Append executed first, observer later");


/*========================================================================================
 12. COMMON REAL-WORLD USE CASES
========================================================================================*/
//
// ✅ Detect when SPA frameworks add new components
// ✅ Track dynamic form field creation
// ✅ Auto-apply styles to new elements
// ✅ Detect injected ads or 3rd party scripts
// ✅ Build browser extensions
// ✅ Auto-scroll chat apps
// ✅ Validate dynamic pages
// ✅ Observe infinite scrolling updates
// ✅ Track content editing tools
// ✅ UI testing automation
//


/*========================================================================================
 13. MUTATION OBSERVER vs EVENT LISTENERS
========================================================================================*/
//
// EVENT LISTENERS:
// ----------------
// ❌ Only catch user-triggered changes
// ❌ Cannot detect programmatic DOM changes reliably
//
// MUTATION OBSERVER:
// ------------------
// ✅ Detects ANY DOM change (user or script)
// ✅ Can observe the entire subtree
// ✅ Batch processing for performance
//


/*========================================================================================
 14. PERFORMANCE CONSIDERATIONS (VERY IMPORTANT)
========================================================================================*/
//
// ❗ Avoid observing the entire document without filters
// ❗ Always use attributeFilter where possible
// ❗ Disconnect observer when no longer needed
// ❗ Avoid heavy logic inside callback
// ❗ Avoid infinite mutation loops (observer triggering its own changes)
//

/*--- Example Infinite Loop Trap ---*/

const loopObserver = new MutationObserver(() => {
  target.setAttribute("data-test", Math.random());
});

loopObserver.observe(target, { attributes: true });

// ❌ This causes infinite mutations if not controlled


/*========================================================================================
 15. MUTATION OBSERVER & FRAMEWORKS
========================================================================================*/
//
// Frameworks using MutationObserver internally:
// ---------------------------------------------
// ✅ Vue (before Proxy)
// ✅ React DevTools
// ✅ Angular DevTools
// ✅ Testing libraries
// ✅ Browser extensions
// ✅ Custom reactivity systems
//


/*========================================================================================
 16. INTERVIEW QUESTIONS & TRAPS
========================================================================================*/
//
// Q1: Is MutationObserver synchronous?
// ❌ No, asynchronous (microtask based)
//
// Q2: Does it work for all DOM changes?
// ✅ Yes, if configured properly
//
// Q3: Can MutationObserver cause memory leaks?
// ✅ Yes, if not disconnected
//
// Q4: Difference between MutationObserver & Event Listener?
// ✅ Observer watches automatic DOM changes
//
// Q5: Does it work with Shadow DOM?
// ✅ Yes (with proper root selection)
//

/*========================================================================================
 17. ONE-PAGE FINAL SUMMARY
========================================================================================*/
//
// ✅ MutationObserver watches DOM changes
// ✅ Replaces deprecated mutation events
// ✅ Works asynchronously using microtasks
// ✅ Detects:
//    • Node additions/removals
//    • Attribute changes
//    • Text changes
// ✅ Must always be disconnected after use
// ✅ Used heavily in:
//    • SPAs
//    • Browser extensions
//    • DevTools
//    • Dynamic UI logic
//
// If you master this ✅
// → You can build framework-level tools in pure JS 🚀

