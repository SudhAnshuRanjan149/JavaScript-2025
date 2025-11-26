/*
  CUSTOM EVENTS IN JAVASCRIPT — DETAILED EXPLANATION
  --------------------------------------------------
  ✔ Custom Events allow developers to create their own event types
    instead of relying only on built-in events like click, input, scroll.

  ✔ Useful for:
      - communication between components
      - decoupling logic
      - notifying different parts of app about state changes
      - custom UI interactions
      - Pub/Sub patterns
*/



/* ============================================================
   1. CREATING A BASIC CUSTOM EVENT
   ============================================================ */

const myEvent = new CustomEvent("userLogin");

document.addEventListener("userLogin", () => {
  console.log("Custom event triggered: userLogin");
});

// Dispatch the event
document.dispatchEvent(myEvent);

/*
  ✔ "userLogin" is a custom event we defined.
  ✔ dispatchEvent() triggers it manually.
*/



/* ============================================================
   2. CUSTOM EVENT WITH DATA (detail)
   ============================================================
   ✔ You can pass ANY data using the `detail` property.
*/

const loginEvent = new CustomEvent("login", {
  detail: {
    user: "John Doe",
    role: "Admin"
  }
});

document.addEventListener("login", (e) => {
  console.log("Login event:", e.detail.user, "| Role:", e.detail.role);
});

document.dispatchEvent(loginEvent);



/* ============================================================
   3. CUSTOM EVENTS ON SPECIFIC ELEMENTS
   ============================================================ */

const box = document.getElementById("box");

box.addEventListener("boxOpened", (e) => {
  console.log("Box opened!", e.detail);
});

const openEvent = new CustomEvent("boxOpened", {
  detail: { openedAt: Date.now() }
});

// Trigger on specific element
box.dispatchEvent(openEvent);

/*
  ✔ Not limited to document — ANY DOM element can dispatch events.
*/



/* ============================================================
   4. BUBBLING CUSTOM EVENTS (VERY IMPORTANT)
   ============================================================
   ✔ Custom events DO NOT BUBBLE by default.
   ✔ To enable bubbling:
        { bubbles: true }
*/

const bubbleEvent = new CustomEvent("childAction", {
  bubbles: true,        // allow event to bubble upwards
  detail: { msg: "Hello from child!" }
});

document.body.addEventListener("childAction", (e) => {
  console.log("Bubbled event reached body:", e.detail.msg);
});

document.getElementById("child").dispatchEvent(bubbleEvent);

/*
  ✔ childAction bubbles from #child → parent → body → document
*/



/* ============================================================
   5. COMPOSED EVENTS (shadow DOM)
   ============================================================
   ✔ composed: true allows custom events to pass through Shadow DOM boundaries.
*/

const composedEvent = new CustomEvent("compEvent", {
  bubbles: true,
  composed: true,     // allows event to exit shadow root
  detail: "Cross-shadow event"
});

/*
  ✔ Useful in Web Components.
*/



/* ============================================================
   6. DISPATCHING EVENTS PROGRAMMATICALLY
   ============================================================ */
/*
  ✔ Useful when:
      - manually triggering UI updates
      - simulating user interactions
      - triggering workflow steps
*/

const btn = document.getElementById("btn");

btn.addEventListener("fakeClick", () => {
  console.log("Button fake clicked!");
});

// simulate the event
btn.dispatchEvent(new CustomEvent("fakeClick"));



/* ============================================================
   7. REUSABLE DISPATCH FUNCTION (UTILITY)
   ============================================================ */

function triggerEvent(element, eventName, detail = {}) {
  const ev = new CustomEvent(eventName, {
    bubbles: true,
    detail
  });
  element.dispatchEvent(ev);
}

document.addEventListener("notify", (e) => {
  console.log("Notification:", e.detail);
});

triggerEvent(document, "notify", { msg: "Hello world" });

/*
  ✔ Now easily trigger custom events anywhere.
*/



/* ============================================================
   8. CUSTOM EVENTS VS CALLBACKS (WHY CUSTOM EVENTS?)
   ============================================================ */
/*
  Callbacks:
    - tightly coupled
    - must pass function references around

  Custom Events:
    - loosely coupled (components don’t know each other)
    - scalable
    - multiple listeners can handle same event
    - can bubble up DOM or through document
*/



/* ============================================================
   9. CUSTOM EVENTS + EVENT DELEGATION
   ============================================================ */

document.body.addEventListener("menuAction", (e) => {
  console.log("Menu action triggered:", e.detail.action);
});

function triggerMenuAction(action) {
  const ev = new CustomEvent("menuAction", {
    bubbles: true,
    detail: { action }
  });
  document.querySelector(".menu").dispatchEvent(ev);
}

triggerMenuAction("open-settings");



/* ============================================================
   10. CREATING A PUB/SUB PATTERN USING CUSTOM EVENTS
   ============================================================ */

const EventBus = {
  emit(event, data) {
    document.dispatchEvent(
      new CustomEvent(event, { detail: data, bubbles: false })
    );
  },
  on(event, handler) {
    document.addEventListener(event, handler);
  }
};

// subscribe
EventBus.on("cart:add", (e) => {
  console.log("Item added to cart:", e.detail);
});

// publish
EventBus.emit("cart:add", { id: 1, name: "Laptop" });



/* ============================================================
   SUMMARY
   ============================================================
   ✔ new CustomEvent(name, options)
        - detail: pass data
        - bubbles: allow bubbling
        - composed: allow shadow DOM escape

   ✔ addEventListener(name, handler)
   ✔ element.dispatchEvent(event)

   ✔ Uses:
        - component communication
        - dynamic UI updates
        - pub/sub patterns
        - plugin & widget architecture
        - decoupled system design

   MENTAL MODEL:
     → A Custom Event is just a "named signal"
       you can fire anywhere and listen anywhere.
*/
