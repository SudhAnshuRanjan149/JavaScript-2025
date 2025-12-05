/*
  EVENT BUBBLING & CAPTURING IN JAVASCRIPT — DETAILED EXPLANATION
  ----------------------------------------------------------------
  ✔ When you click an element in the DOM, the event does NOT stay only there.
  ✔ It travels through the DOM in PHASES:

      1) CAPTURING PHASE   (top → down)
      2) TARGET PHASE      (on the clicked element)
      3) BUBBLING PHASE    (bottom → up)

  ✔ Event listeners can run:
      - during capturing (capture: true)
      - during bubbling (default, capture: false)
*/



/* ============================================================
   1. SIMPLE STRUCTURE (FOR EXPLANATION)
   ============================================================
   HTML:

    <body>
      <div id="parent">
        <button id="child">Click me</button>
      </div>
    </body>

   When button is clicked, event path is:

     CAPTURE:   window → document → html → body → div#parent → button#child
     TARGET:    button#child
     BUBBLE:    button#child → div#parent → body → html → document → window
*/



/* ============================================================
   2. ADDING LISTENERS IN BUBBLING PHASE (DEFAULT)
   ============================================================ */

const parent = document.getElementById("parent");
const child = document.getElementById("child");

parent.addEventListener("click", function () {
  console.log("PARENT BUBBLE listener");
});

child.addEventListener("click", function () {
  console.log("CHILD BUBBLE listener");
});

/*
  When clicking the child button:
    1) CHILD BUBBLE listener  (target phase)
    2) PARENT BUBBLE listener (bubbling up)
*/



/* ============================================================
   3. ADDING LISTENERS IN CAPTURING PHASE
   ============================================================
   Syntax:
      element.addEventListener(type, listener, useCapture);

   OR with options object:
      element.addEventListener(type, listener, { capture: true });
*/

parent.addEventListener(
  "click",
  function () {
    console.log("PARENT CAPTURE listener");
  },
  true // capture: true
);

child.addEventListener(
  "click",
  function () {
    console.log("CHILD CAPTURE listener");
  },
  true
);

/*
  When clicking the child button now (considering ALL listeners we added):

  ORDER:
    1) PARENT CAPTURE listener
    2) CHILD CAPTURE listener
    3) CHILD BUBBLE listener
    4) PARENT BUBBLE listener

  WHY?
    - CAPTURING: parent → child
    - TARGET: child (both capture+ bubble attached)
    - BUBBLING: child → parent
*/



/* ============================================================
   4. FULL EVENT FLOW — COMBINED EXAMPLE
   ============================================================ */

// for clarity, imagine this HTML:
// <div id="outer">
//   <div id="inner">
//     <button id="btn">Click</button>
//   </div>
// </div>

const outer = document.getElementById("outer");
const inner = document.getElementById("inner");
const btn = document.getElementById("btn");

outer.addEventListener(
  "click",
  () => console.log("outer CAPTURE"),
  true
);
inner.addEventListener(
  "click",
  () => console.log("inner CAPTURE"),
  true
);
btn.addEventListener(
  "click",
  () => console.log("btn CAPTURE"),
  true
);

outer.addEventListener("click", () => console.log("outer BUBBLE"));
inner.addEventListener("click", () => console.log("inner BUBBLE"));
btn.addEventListener("click", () => console.log("btn BUBBLE"));

/*
  Click on the button:
    CAPTURE PHASE:
      outer CAPTURE
      inner CAPTURE
      btn CAPTURE

    TARGET PHASE (btn):
      btn BUBBLE  (target handlers of non-capture run here)

    BUBBLING PHASE:
      inner BUBBLE
      outer BUBBLE
*/



/* ============================================================
   5. stopPropagation() — STOP FURTHER PROPAGATION
   ============================================================
   ✔ Prevents event from continuing to bubble or capture further.
*/

btn.addEventListener("click", function (e) {
  console.log("btn BUBBLE with stopPropagation");
  e.stopPropagation(); // prevents it from going to inner/outer in bubble phase
});

/*
  Now clicking btn:
    - capturing handlers still run
    - this btn BUBBLE runs
    - inner BUBBLE & outer BUBBLE will NOT run
*/



/* ============================================================
   6. stopImmediatePropagation() — STOP + block other handlers
   ============================================================
   ✔ Prevents:
       1) further propagation
       2) other listeners on the SAME element from running
*/

btn.addEventListener("click", function (e) {
  console.log("First btn handler");
  e.stopImmediatePropagation();
});

btn.addEventListener("click", function () {
  console.log("Second btn handler (will NOT run)");
});

/*
  Clicking btn:
    → "First btn handler"
    → event stops there: no more listeners on btn or ancestors
*/



/* ============================================================
   7. preventDefault() vs stopPropagation()
   ============================================================
   ✔ preventDefault():
        - prevents the default browser action
        - e.g., form submit, link navigation, checkbox toggle
   ✔ stopPropagation():
        - stops event from propagating to other elements
   ✔ Often used together, but they are DIFFERENT.
*/

const link = document.querySelector("a.prevent");

link.addEventListener("click", function (e) {
  e.preventDefault(); // no navigation
  e.stopPropagation(); // no bubbling to parents
  console.log("Link clicked, but no navigation and no bubbling");
});



/* ============================================================
   8. WHY USE CAPTURING?
   ============================================================
   ✔ Most common: BUBBLING phase (default).
   ✔ Capturing is useful when:
        - You want parent to handle event BEFORE child
        - Implement custom low-level libraries
        - Rarely used in day-to-day app code

   Often:
     addEventListener("click", handler); // bubble (normal)
*/



/* ============================================================
   9. EVENT DELEGATION (USING BUBBLING)
   ============================================================
   ✔ Attach one listener on a parent; handle clicks of all children.

   Assume HTML:
    <ul id="menu">
      <li data-id="home">Home</li>
      <li data-id="about">About</li>
      <li data-id="contact">Contact</li>
    </ul>
*/

const menu = document.getElementById("menu");

menu.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    console.log("Clicked menu item:", e.target.dataset.id);
  }
});

/*
  ✔ Uses bubbling:
    - click on LI → event bubbles to UL
    - UL handler checks event.target
*/



/* ============================================================
   10. EVENT PHASE PROPERTY
   ============================================================
   ✔ event.eventPhase tells which phase the event is in:
        1 → CAPTURING_PHASE
        2 → AT_TARGET
        3 → BUBBLING_PHASE
*/

btn.addEventListener(
  "click",
  function (e) {
    console.log("btn CAPTURE phase:", e.eventPhase); // 1 or 2
  },
  true
);

btn.addEventListener("click", function (e) {
  console.log("btn BUBBLE phase:", e.eventPhase); // 2 or 3
});

/*
  When target is btn:
    - capture listener on btn sees phase 2 (AT_TARGET)
    - bubble listener on btn also sees phase 2 (AT_TARGET)
*/


/* ============================================================
   11. CASES WHERE BUBBLING / CAPTURING DOES NOT APPLY
   ============================================================
   Not all DOM events bubble. Also, some events behave differently
   across Shadow DOM boundaries or are retargeted. Here are common
   cases you should know about.

   1) Events that do NOT bubble (common list):
        - focus, blur              (use focusin/focusout to get bubbling)
        - load, unload, beforeunload
        - error                    (does not bubble from elements)
        - mouseenter, mouseleave   (use mouseover/mouseout to bubble)
        - pointerenter, pointerleave
        - scroll                   (does not bubble)

   2) Alternatives that do bubble:
        - focusin / focusout  — bubble equivalents of focus/blur
        - mouseover / mouseout — bubble equivalents of mouseenter/leave

   3) Shadow DOM / composed events:
        - Events inside shadow roots may be "retargeted" when seen
          outside the shadow boundary. Some events have `composed`
          set to false by default and won't cross shadow boundaries.

   4) Programmatic and default prevention:
        - Calling element.dispatchEvent(...) will follow event's
          defined bubbling behavior (bubbles: true/false) based on
          the Event init options.
        - stopPropagation() and stopImmediatePropagation() (covered
          earlier) explicitly stop propagation even for bubbling events.

   Examples (assume elements exist in the page):

   — focus vs focusin (focus does NOT bubble)
*/

parent.addEventListener("focus", function () {
  console.log("parent focus listener (will NOT run when child focuses)");
});

parent.addEventListener("focusin", function () {
  console.log("parent focusin listener (bubbles from child)");
});

child.addEventListener("focus", function () {
  console.log("child focused");
});

// programmatically focus the child to demonstrate behaviour (if focusable)
try {
  if (typeof child.focus === "function") child.focus();
} catch (err) {}


/*
  Output when child is focused:
    - "child focused"
    - "parent focusin listener (bubbles from child)"
    - NOT: "parent focus listener (will NOT run...)"

  — mouseenter / mouseover difference (mouseenter does NOT bubble)
*/

parent.addEventListener("mouseenter", () =>
  console.log("parent mouseenter (does NOT bubble from child)")
);

child.addEventListener("mouseenter", () => console.log("child mouseenter"));

/*
  If the mouse enters the child, you will see "child mouseenter" but
  NOT the parent's mouseenter. For a bubbling alternative use
  mouseover / mouseout on the parent and inspect event.target.

  — load / error / scroll
    - window.addEventListener('load', ...) is the proper use; load
      doesn't bubble from elements up the tree.
    - scroll events do not bubble; listen on the element that scrolls
      (or use capturing on ancestors where supported).

  — Shadow DOM note:
    Events with `composed: false` will not cross shadow boundaries.
    Use `composed: true` or the appropriate composed events when
    communicating out of a shadow root.
*/



/* ============================================================
   12. SUMMARY
   ============================================================
   ✔ Event flow has 3 phases:
        1) Capturing  (top → down)
        2) Target     (element itself)
        3) Bubbling   (bottom → up)

   ✔ addEventListener 3rd parameter / {capture:true} decides:
        - true  → capture phase
        - false → bubble phase (default)

   ✔ stopPropagation() halts further travel.
   ✔ stopImmediatePropagation() halts further travel + other listeners on same element.
   ✔ preventDefault() cancels default browser behavior (not propagation).
   ✔ Event Delegation heavily relies on BUBBLING.

   MENTAL MODEL:
     → Think of an event as a ripple:
          - It starts from the outer DOM (capturing downwards),
          - Hits the target,
          - Then bubbles back up through ancestors.
*/
