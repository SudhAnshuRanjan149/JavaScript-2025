/*
  EVENT DELEGATION IN JAVASCRIPT — DETAILED EXPLANATION
  -----------------------------------------------------
  ✔ Event Delegation is a technique where you attach ONE event listener
    to a PARENT element instead of adding many listeners to CHILD elements.

  WHY USE EVENT DELEGATION?
    ✔ Better performance (less event listeners)
    ✔ Works for dynamically added elements
    ✔ Cleaner & maintainable code
    ✔ Uses Event Bubbling (important concept)
*/



/* ============================================================
   1. EVENT BUBBLING (CORE CONCEPT BEHIND DELEGATION)
   ============================================================
   ✔ When an event occurs on a child element:
        → it bubbles UP through parent → grandparent → document

   Example:
     <div>  ← parent
       <button> Click me </button> ← child
     </div>

   Clicking button triggers:
      button → div → body → document → window
*/



/* ============================================================
   2. WITHOUT EVENT DELEGATION (BAD APPROACH)
   ============================================================ */

const buttons = document.querySelectorAll(".item");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    console.log("Clicked:", btn.textContent);
  });
});

/*
  Problems:
    ❌ Many event listeners → memory + CPU cost
    ❌ Not scalable
    ❌ New buttons added later DO NOT work
*/



/* ============================================================
   3. WITH EVENT DELEGATION (GOOD APPROACH)
   ============================================================ */

document.querySelector(".parent").addEventListener("click", (event) => {
  /*
    event.target → the element that was actually clicked
  */

  if (event.target.matches(".item")) {
    console.log("Delegated click:", event.target.textContent);
  }
});

/*
  ✔ Only ONE listener on parent
  ✔ Works for existing + future .item elements
*/



/* ============================================================
   4. matches() METHOD (IMPORTANT)
   ============================================================
   ✔ event.target.matches(selector)
   ✔ Checks if the clicked element matches a CSS selector
*/

document.body.addEventListener("click", (e) => {
  if (e.target.matches(".delete-btn")) {
    console.log("Delete button clicked!");
  }
});



/* ============================================================
   5. EVENT DELEGATION WITH NESTED ELEMENTS
   ============================================================ */
/*
  Sometimes you need to ensure you capture a SPECIFIC nested element
*/

document.querySelector(".list").addEventListener("click", (e) => {
  const li = e.target.closest("li"); // find nearest <li>

  if (!li) return;

  console.log("Clicked on LI:", li.dataset.id);
});

/*
  closest() moves UP the DOM to find a match:
    event.target.closest("li")
*/



/* ============================================================
   6. HANDLING MULTIPLE ACTIONS FROM ONE LISTENER
   ============================================================ */

document.querySelector(".todo").addEventListener("click", (e) => {
  if (e.target.matches(".edit")) {
    console.log("Edit clicked");
  } else if (e.target.matches(".delete")) {
    console.log("Delete clicked");
  } else if (e.target.matches(".done")) {
    console.log("Done clicked");
  }
});

/*
  ✔ Helps avoid attaching 3 separate listeners
*/



/* ============================================================
   7. EVENT DELEGATION + DYNAMIC ELEMENTS
   ============================================================ */

document.querySelector(".chat").addEventListener("click", (e) => {
  if (e.target.matches(".message")) {
    console.log("Message clicked:", e.target.textContent);
  }
});

// Add new messages dynamically
function addMessage(text) {
  const msg = document.createElement("div");
  msg.className = "message";
  msg.textContent = text;
  document.querySelector(".chat").appendChild(msg);
}

addMessage("Hello!"); // → works because parent listener catches it



/* ============================================================
   8. STOPPING PROPAGATION (IMPORTANT NOTE)
   ============================================================ */

document.querySelector(".box").addEventListener("click", () => {
  console.log("Parent clicked!");
});

document.querySelector(".inner").addEventListener("click", (e) => {
  e.stopPropagation();   // stops bubbling
  console.log("Inner clicked only");
});

/*
  If stopPropagation() is used, delegation on parent will NOT catch it.
*/



/* ============================================================
   9. WHEN TO USE EVENT DELEGATION
   ============================================================ */
/*
  ✔ Lists with many children
  ✔ Dynamic elements added later
  ✔ Menus, dropdowns
  ✔ Tables, grids
  ✔ Chat messages, comments
  ✔ Buttons inside containers (edit/delete)
*/



/* ============================================================
   10. WHEN NOT TO USE EVENT DELEGATION
   ============================================================ */
/*
  ✔ If event doesn’t bubble (like blur, focus) → cannot delegate normally
  ✔ If child elements overlap in weird ways
  ✔ If you need precise event control per child node
*/



/* ============================================================
   SUMMARY
   ============================================================ */
/*
  EVENT DELEGATION:
    ✔ Uses event bubbling
    ✔ One listener handles many elements
    ✔ Better performance & memory usage
    ✔ Works with dynamically created elements

  MENTAL MODEL:
    → Instead of individually listening to every child element,
      listen ONCE on the parent and check which child was clicked.
*/
