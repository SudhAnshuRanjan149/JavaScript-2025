/*
  DOM BASICS IN JAVASCRIPT — SELECT, MODIFY, EVENTS (DETAILED)
  ------------------------------------------------------------
  DOM = Document Object Model
  → JavaScript's way to see and manipulate the HTML page as a tree of objects.

  Core things you must know:
    1. Selecting elements (find elements in the page)
    2. Modifying elements (content, attributes, styles)
    3. Handling events (click, input, submit, etc.)

  Assume we have this sample HTML:

    <body>
      <h1 id="title" class="heading">Hello DOM</h1>
      <p class="desc">Some description</p>
      <button id="btn">Click Me</button>

      <ul id="list">
        <li class="item">Item 1</li>
        <li class="item">Item 2</li>
      </ul>

      <form id="myForm">
        <input type="text" id="nameInput" />
        <button type="submit">Submit</button>
      </form>
    </body>
*/



/* ============================================================
   1. SELECTING ELEMENTS
   ============================================================
   Most commonly used DOM selection methods:
     - document.getElementById()
     - document.getElementsByClassName()
     - document.getElementsByTagName()
     - document.querySelector()
     - document.querySelectorAll()
*/

// By ID → returns a single element or null
const title = document.getElementById("title");
console.log(title);

// By class name → returns HTMLCollection (array-like)
const descs = document.getElementsByClassName("desc");
console.log(descs[0]);

// By tag name → returns HTMLCollection
const listItems = document.getElementsByTagName("li");
console.log(listItems.length);

// querySelector → returns first match (CSS selector style)
const firstItem = document.querySelector(".item");  // first .item
console.log(firstItem);

// querySelectorAll → returns NodeList (can use forEach)
const allItems = document.querySelectorAll(".item");
allItems.forEach((li, index) => {
  console.log("Item", index + 1, ":", li.textContent);
});



/* ============================================================
   2. MODIFYING CONTENT
   ============================================================
   Two very common properties:
     - textContent  → plain text
     - innerHTML    → HTML (can contain tags)
*/

// Change text
title.textContent = "Updated DOM Title";

// Change HTML inside element
const list = document.getElementById("list");
list.innerHTML = `
  <li class="item">New Item A</li>
  <li class="item">New Item B</li>
`;

/*
  textContent vs innerHTML:
    - textContent → safe, no HTML parsing
    - innerHTML   → can add/remove HTML, but be careful with user input
*/



/* ============================================================
   3. MODIFYING ATTRIBUTES
   ============================================================
   You can get, set and remove attributes on elements.
*/

const btn = document.getElementById("btn");

// Set attribute
btn.setAttribute("data-role", "primary");

// Get attribute
const role = btn.getAttribute("data-role");
console.log("Button role:", role);

// Remove attribute
btn.removeAttribute("data-role");



/* ============================================================
   4. MODIFYING STYLES
   ============================================================
   You can modify CSS styles directly via the style property,
   or by toggling CSS classes.
*/

// Inline style (JS style property uses camelCase)
title.style.color = "blue";
title.style.backgroundColor = "lightyellow";

// Better: use classList to add/remove/toggle CSS classes

/*
  Suppose CSS:

  .highlight {
    color: white;
    background-color: green;
    font-weight: bold;
  }
*/

title.classList.add("highlight");     // add class
title.classList.remove("heading");    // remove class
title.classList.toggle("highlight");  // toggle on/off



/* ============================================================
   5. CREATING & ADDING ELEMENTS
   ============================================================
   Steps:
     1. document.createElement()
     2. set properties / attributes / content
     3. appendChild() / prepend() / before() / after()
*/

const newItem = document.createElement("li"); // create <li>
newItem.textContent = "Dynamically added item"; // set text
newItem.classList.add("item");                 // add class

list.appendChild(newItem); // adds as the last child of <ul id="list">

// Other ways:
// list.prepend(newItem);
// list.before(newItem);
// list.after(newItem);



/* ============================================================
   6. REMOVING ELEMENTS
   ============================================================
*/

const firstLi = document.querySelector("#list li");
firstLi.remove();  // removes the first <li>



/* ============================================================
   7. EVENTS — BASIC IDEA
   ============================================================
   Events are actions that happen in the browser:
     - click
     - submit
     - keydown
     - input
     - mouseover
     - change
     - etc.

   To react to events, you use:
     element.addEventListener("eventName", callback);
*/

// Click event on button
btn.addEventListener("click", function () {
  console.log("Button clicked!");
  alert("You clicked the button!");
});



/* ============================================================
   8. EVENT OBJECT
   ============================================================
   The callback of addEventListener receives an EVENT OBJECT
   with details about the event (target, key pressed, mouse position, etc.)
*/

btn.addEventListener("click", function (event) {
  console.log("Event object:", event);
  console.log("Clicked element:", event.target);
});



/* ============================================================
   9. FORM SUBMIT EVENT + preventDefault()
   ============================================================
   For forms, by default, the page reloads on submit.
   We can prevent that using event.preventDefault().
*/

const myForm = document.getElementById("myForm");
const nameInput = document.getElementById("nameInput");

myForm.addEventListener("submit", function (event) {
  event.preventDefault(); // stop page reload

  const name = nameInput.value;
  console.log("Form submitted with name:", name);

  // You can now send data via fetch(), show a message, etc.
});



/* ============================================================
   10. KEYBOARD EVENTS
   ============================================================
   For listening to key presses.
*/

nameInput.addEventListener("keydown", function (event) {
  console.log("Key pressed:", event.key);
});



/* ============================================================
   11. EVENT BUBBLING (BASICS)
   ============================================================
   - Events bubble from the inner element up through its parents.
   - Clicking on a <li> inside ul triggers:
       li → ul → body → document → window
*/

list.addEventListener("click", function (event) {
  /*
    event.target = actual element clicked inside the list
    event.currentTarget = the element with the listener (list)
  */
  console.log("Clicked inside UL");
  console.log("Actual clicked element (event.target):", event.target);
});



/* ============================================================
   12. EVENT DELEGATION (USEFUL PATTERN)
   ============================================================
   Instead of adding a click event to EVERY <li>, you add ONE
   listener on <ul> and check which child was clicked.
*/

list.addEventListener("click", function (event) {
  if (event.target && event.target.matches("li.item")) {
    console.log("You clicked on item:", event.target.textContent);
  }
});



/* ============================================================
   13. SUMMARY
   ============================================================

   SELECT:
     - getElementById, getElementsByClassName, getElementsByTagName
     - querySelector, querySelectorAll

   MODIFY:
     - textContent, innerHTML
     - setAttribute, getAttribute, removeAttribute
     - style, classList (add, remove, toggle)
     - createElement, appendChild, remove

   EVENTS:
     - addEventListener("event", handler)
     - event object (event.target, event.key, event.preventDefault())
     - form submit, click, keydown, etc.
     - bubbling & event delegation
*/
