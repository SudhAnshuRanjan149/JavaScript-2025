/****************************************************************************************
 * ALL IMPORTANT DOM EVENT LISTENERS IN JAVASCRIPT — COMPLETE DETAILED NOTES
 *
 * Covers:
 * ✔ What DOM Events Are
 * ✔ addEventListener() Deep Explanation
 * ✔ Mouse Events
 * ✔ Keyboard Events
 * ✔ Form Events
 * ✔ Input Events
 * ✔ Focus Events
 * ✔ Clipboard Events
 * ✔ Touch & Mobile Events
 * ✔ Drag & Drop Events
 * ✔ Scroll & Resize Events
 * ✔ Mutation Events (deprecated but important)
 * ✔ Custom Events
 * ✔ Event Bubbling, Capturing, Delegation
 * ✔ Passive Listeners
 * ✔ Once & Abortable Listeners
 ****************************************************************************************/


/****************************************************************************************
 * 1. WHAT IS A DOM EVENT?
 ****************************************************************************************/
//
// DOM events are signals that something happened in the browser:
// ---------------------------------------------------------------
// ✔ user clicked
// ✔ key pressed
// ✔ text typed
// ✔ form submitted
// ✔ page loaded
//
// JavaScript listens to those events via:
// ---------------------------------------
// element.addEventListener(eventName, callback, options)
//


/****************************************************************************************
 * 2. addEventListener() — HOW IT WORKS
 ****************************************************************************************/

const btn = document.getElementById("btn");

btn.addEventListener("click", function (e) {
  console.log("Button clicked");
}, {
  capture: false,  // event phase
  once: false,     // remove after first run
  passive: false   // listener won't call preventDefault()
});


/****************************************************************************************
 * 3. EVENT PHASES (VERY IMPORTANT)
 ****************************************************************************************/
//
// Event travels in 3 phases:
// --------------------------
// 1️⃣ Capturing Phase (top → down)
// 2️⃣ Target Phase     (exact element)
// 3️⃣ Bubbling Phase   (bottom → up)
//
// Default event listener fires during bubbling phase.
// set capture:true to listen during capturing.
//


/****************************************************************************************
 * 4. MOUSE EVENTS (Desktop interactions)
 ****************************************************************************************/

btn.addEventListener("click", () => {});        // left click
btn.addEventListener("dblclick", () => {});     // double click
btn.addEventListener("contextmenu", () => {});  // right click

btn.addEventListener("mousedown", () => {});    // button pressed
btn.addEventListener("mouseup", () => {});      // button released

btn.addEventListener("mouseover", () => {});    // entered element or children
btn.addEventListener("mouseenter", () => {});   // entered ONLY element (no bubbling)
btn.addEventListener("mouseout", () => {});     // left element or children
btn.addEventListener("mouseleave", () => {});   // left ONLY element (no bubbling)

btn.addEventListener("mousemove", () => {});    // moved mouse inside element


/****************************************************************************************
 * 5. KEYBOARD EVENTS (keydown, keypress, keyup)
 ****************************************************************************************/

document.addEventListener("keydown", (e) => {
  console.log(e.key);    // "a", "Enter", "Escape"
  console.log(e.code);   // "KeyA", "Enter"
});

document.addEventListener("keyup", () => {});
document.addEventListener("keypress", () => {}); // deprecated (avoid)


/* Keyboard Event Tips:
------------------------
✔ e.key → actual character
✔ e.code → physical button on keyboard
✔ keydown → fires continuously when holding a key
✔ keyup   → fires once when released
*/


/****************************************************************************************
 * 6. FORM EVENTS (submit, reset)
 ****************************************************************************************/

const form = document.getElementById("myForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();  // stop page reload
  console.log("Form submitted");
});

form.addEventListener("reset", () => {
  console.log("Form reset");
});


/****************************************************************************************
 * 7. INPUT EVENTS (real-time input change)
 ****************************************************************************************/

const input = document.getElementById("name");

input.addEventListener("input", () => {});       // fires on ANY change
input.addEventListener("change", () => {});      // fires on blur (finish editing)
input.addEventListener("focus", () => {});       // input field selected
input.addEventListener("blur", () => {});        // input field deselected


/****************************************************************************************
 * 8. FOCUS EVENTS (focus, blur, focusin, focusout)
 ****************************************************************************************/
//
// DIFFERENCES:
// ------------
// focus & blur DO NOT bubble
// focusin & focusout DO bubble
//

input.addEventListener("focusin", () => {});
input.addEventListener("focusout", () => {});


/****************************************************************************************
 * 9. CLIPBOARD EVENTS (copy, cut, paste)
 ****************************************************************************************/

document.addEventListener("copy", (e) => {
  console.log("Copied");
});

document.addEventListener("paste", (e) => {
  console.log("Pasted:", e.clipboardData.getData("text"));
});


/****************************************************************************************
 * 10. TOUCH EVENTS (for mobile)
 ****************************************************************************************/

const box = document.getElementById("box");

box.addEventListener("touchstart", (e) => {
  console.log("Finger touched:", e.touches);
});

box.addEventListener("touchmove", (e) => {
  console.log("Moving…");
});

box.addEventListener("touchend", () => {
  console.log("Finger lifted");
});


/****************************************************************************************
 * 11. POINTER EVENTS (recommended for cross-device)
 ****************************************************************************************/
//
// POINTER EVENTS unify:
// ----------------------
// ✔ mouse
// ✔ touch
// ✔ stylus
//

box.addEventListener("pointerdown", () => {});
box.addEventListener("pointermove", () => {});
box.addEventListener("pointerup", () => {});
box.addEventListener("pointerenter", () => {});
box.addEventListener("pointerleave", () => {});


/****************************************************************************************
 * 12. DRAG & DROP EVENTS
 ****************************************************************************************/

const draggable = document.getElementById("dragItem");

draggable.addEventListener("dragstart", () => {});
draggable.addEventListener("dragend", () => {});

const dropArea = document.getElementById("dropArea");

dropArea.addEventListener("dragover", (e) => e.preventDefault());
dropArea.addEventListener("drop", () => {});


/****************************************************************************************
 * 13. SCROLL & RESIZE EVENTS
 ****************************************************************************************/

window.addEventListener("scroll", () => {
  console.log("User scrolled");
});

window.addEventListener("resize", () => {
  console.log("Window resized");
});


/****************************************************************************************
 * 14. LOAD & UNLOAD EVENTS
 ****************************************************************************************/

window.addEventListener("load", () => {
  console.log("Page fully loaded");
});

// WARNING: beforeunload blocks navigation → annoy users
window.addEventListener("beforeunload", (e) => {
  e.preventDefault();
  e.returnValue = "";
});


/****************************************************************************************
 * 15. MUTATION OBSERVER EVENTS (modern replacement for mutation events)
 ****************************************************************************************/

// Detect element changes (DOM modifications)
const observer = new MutationObserver((mutations) => {
  console.log(mutations);
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});


/****************************************************************************************
 * 16. CUSTOM EVENTS (super important)
 ****************************************************************************************/

// Create custom event:
const myEvent = new CustomEvent("cartUpdated", {
  detail: { items: 3 }
});

// Listen:
document.addEventListener("cartUpdated", (e) => {
  console.log(e.detail.items);
});

// Dispatch:
document.dispatchEvent(myEvent);


/****************************************************************************************
 * 17. EVENT DELEGATION (VERY IMPORTANT)
 ****************************************************************************************/
//
// Instead of attaching listeners to every child:
//
// <ul id="list">
//   <li>Item 1</li>
//   <li>Item 2</li>
//   <li>Item 3</li>
// </ul>
//

const list = document.getElementById("list");

list.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    console.log("Clicked:", e.target.textContent);
  }
});

// BENEFITS:
// ---------
// ✔ fewer listeners
// ✔ works for dynamic elements
// ✔ better performance


/****************************************************************************************
 * 18. PASSIVE EVENT LISTENERS (performance optimization)
 ****************************************************************************************/
//
// Used in scrolling for smoother experience.
//

window.addEventListener("scroll", (e) => {
  console.log("scrolling");
}, {
  passive: true  // tells browser "I WILL NOT call preventDefault()"
});


/****************************************************************************************
 * 19. ONCE LISTENERS (auto-remove after first call)
 ****************************************************************************************/

btn.addEventListener("click", () => {
  console.log("This will run only once");
}, { once: true });


/****************************************************************************************
 * 20. ABORTABLE EVENT LISTENERS (using AbortController)
 ****************************************************************************************/

const controller = new AbortController();

btn.addEventListener("click", () => {
  console.log("clicked");
}, { signal: controller.signal });

// Remove listener:
controller.abort();


/****************************************************************************************
 * FINAL MASTER SUMMARY (ONE PAGE)
 ****************************************************************************************/
/*
// ✔ Mouse Events → click, dblclick, contextmenu, mouseover, mousemove…
– Keyboard Events → keydown, keyup
✔ Form Events → submit, reset
✔ Input Events → input, change, focus, blur
✔ Clipboard → copy, paste
✔ Touch → touchstart, touchmove
✔ Pointer → universal input handling
✔ Drag & Drop → dragstart, dragover, drop
✔ Scroll & Resize
✔ Load & BeforeUnload
✔ MutationObserver → DOM changes
✔ Custom Events → create your own events
✔ addEventListener options:
//    • capture
//    • once
//    • passive
//    • signal (abortable)
// ✔ Event Delegation → best practice for lists & dynamic UIs

*/
