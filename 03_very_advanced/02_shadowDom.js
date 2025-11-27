/*
  SHADOW DOM IN JAVASCRIPT — GREAT DETAIL
  ---------------------------------------
  ✔ Shadow DOM is a browser technology that allows you to create
    **encapsulated**, **isolated**, and **scoped** DOM trees.

  ✔ Part of Web Components API:
        - Templates
        - Custom Elements
        - Shadow DOM
        - ES Modules

  ✔ Shadow DOM solves:
        - CSS conflicts
        - DOM structure conflicts
        - Style leakage (in or out)
        - Component encapsulation
*/



/* ============================================================
   1. WHAT IS SHADOW DOM?
   ============================================================
   ✔ A mechanism to create a "hidden" DOM subtree inside a component.
   ✔ It has:
        - Its own DOM tree
        - Its own scoped CSS
        - Its own event boundary (with some details)
   ✔ Browsers use it internally:
        - <input>, <video>, <select>, <details>, etc.
*/



/*
  NORMAL DOM (Light DOM):
    <div class="card">
      <h2>Title</h2>
      <p>Description...</p>
    </div>

  SHADOW DOM:
    <my-card>
      #shadow-root
        <style> ... </style>
        <div class="box">
          <slot></slot>
        </div>
    </my-card>
*/



/* ============================================================
   2. ATTACHING A SHADOW ROOT
   ============================================================
   ✔ shadowRoot can be:
        mode: "open"  → JS can access element.shadowRoot
        mode: "closed" → JS cannot access element.shadowRoot

   Syntax:
     element.attachShadow({ mode: "open" })
*/

const host = document.querySelector("#host");

const shadow = host.attachShadow({ mode: "open" });

shadow.innerHTML = `
  <style>
    div { background: #222; color: white; padding: 10px; }
  </style>

  <div>Shadow DOM content</div>
`;

/*
  ✔ host is in Light DOM
  ✔ shadowRoot is inside host
*/



/* ============================================================
   3. SHADOW DOM STYLES ARE SCOPED
   ============================================================
   ✔ CSS in shadow DOM does NOT leak outside.
   ✔ Normal CSS outside does NOT affect shadow DOM.
*/

document.body.innerHTML = `
  <style>
    div { color: red; }  // will NOT affect shadow DOM div
  </style>

  <div id="host"></div>
`;

/*
  Shadow DOM is isolated from global CSS.
*/



/* ============================================================
   4. SLOT — PROJECT LIGHT DOM INTO SHADOW DOM
   ============================================================
   ✔ <slot> acts like a placeholder where light DOM content appears.
*/

class MyCard extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({ mode: "open" });

    root.innerHTML = `
      <style>
        .card { border: 2px solid #333; padding: 8px; }
      </style>

      <div class="card">
        <slot name="title"></slot>
        <slot name="content"></slot>
      </div>
    `;
  }
}

customElements.define("my-card", MyCard);

document.body.innerHTML = `
  <my-card>
    <h2 slot="title">Hello World</h2>
    <p slot="content">Shadow DOM with slots!</p>
  </my-card>
`;

/*
  ✔ Light DOM passes content into the Shadow DOM through <slot>.
  ✔ Parent markup stays clean and flexible.
*/



/* ============================================================
   5. CLOSED SHADOW ROOT (NOT ACCESSIBLE)
   ============================================================
*/

const closed = document.querySelector("#closed-root")
  .attachShadow({ mode: "closed" });

console.log(closed.shadowRoot); // null (you cannot access)

/*
  ✔ Used in libraries for strict encapsulation
  ✔ Developer cannot inspect or modify DOM from JS
*/



/* ============================================================
   6. EVENTS & SHADOW DOM (RETARGETING)
   ============================================================
   ✔ Events inside Shadow DOM bubble OUT but get "retargeted".

   Example:
     Inside shadow: click <button> → event.target = <button>
     Outside shadow (light DOM): event.target becomes <my-card>
*/

class MyButton extends HTMLElement {
  constructor() {
    super();

    const root = this.attachShadow({ mode: "open" });

    root.innerHTML = `<button>Click inside shadow</button>`;

    root.querySelector("button").addEventListener("click", (e) => {
      console.log("Inside shadow:", e.target.tagName); // BUTTON
    });
  }
}

customElements.define("my-btn", MyButton);

document.body.innerHTML = `<my-btn></my-btn>`;

document.addEventListener("click", (e) => {
  console.log("Outside shadow:", e.target.tagName); // MY-BTN (retargeted)
});

/*
  ✔ Shadow DOM hides internal structure from external code.
  ✔ e.target is retargeted to the host element.
*/



/* ============================================================
   7. COMPOSED EVENTS — ESCAPING SHADOW DOM
   ============================================================
   ✔ Some events DO NOT leave shadow DOM by default.
   ✔ To allow custom events to bubble OUT:
        composed: true
*/

const customEv = new CustomEvent("my-event", {
  detail: "Hello",
  bubbles: true,
  composed: true,  // <--- allows crossing shadow boundary
});

/*
  Useful for communication with parent components.
*/



/* ============================================================
   8. SHADOW DOM IN BROWSER COMPONENTS
   ============================================================
   ✔ Native elements use Shadow DOM:

      <video>        contains shadow DOM for native controls
      <input>        has internal <div> for text
      <details>      uses shadow DOM for disclosure widget
*/



/* ============================================================
   9. SHADOW DOM CSS SCOPING RULES
   ============================================================
   ✔ Global CSS cannot style inside shadow DOM.
   ✔ Shadow DOM CSS cannot leak out.

   ✔ Special selectors:
        ::slotted(selector)    → style projected light DOM
        :host                  → style host element
        :host([attr])          → conditional style host
*/

const styleExample = `
  <style>
    :host { display: block; padding: 10px; }
    ::slotted(p) { color: blue; }  // styles light DOM children
  </style>
`;



/* ============================================================
   10. SHADOW DOM LIFECYCLE (Web Components)
   ============================================================
   ✔ Created inside:
        constructor() { this.attachShadow({mode: "open"}); }

   ✔ Render inside connectedCallback()

   ✔ Cleanup inside disconnectedCallback()
*/

class MyComp extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.root.innerHTML = `<p>Connected!</p>`;
  }

  disconnectedCallback() {
    console.log("Component removed");
  }
}



/* ============================================================
   11. USE CASES OF SHADOW DOM
   ============================================================
   ✔ UI libraries: fully isolated components
   ✔ Design systems: buttons, modals, tabs, sliders
   ✔ Widgets you embed anywhere:
        - date pickers
        - media players
        - chat widgets
   ✔ Avoid CSS conflicts between apps
   ✔ CSS isolation for large teams
*/



/* ============================================================
   12. BENEFITS OF SHADOW DOM
   ============================================================
*/
/*
  ✔ Encapsulation (DOM + CSS)
  ✔ Prevents style bleeding
  ✔ Hidden internal structure
  ✔ Clean component API
  ✔ Reusable widgets
  ✔ Encourages component-based architecture
*/



/* ============================================================
   13. DRAWBACKS OF SHADOW DOM
   ============================================================
*/
/*
  ✔ Harder debugging (internal DOM not obvious)
  ✔ Styling becomes trickier (need :host, ::slotted)
  ✔ Some global CSS (e.g., CSS frameworks) cannot style inside
  ✔ Not always SSR-friendly for some frameworks
*/



/* ============================================================
   SUMMARY (CHEAT SHEET)
   ============================================================
*/
/*
  SHADOW DOM:
    ✔ attachShadow({mode})
    ✔ mode: open | closed
    ✔ Internal DOM is isolated
    ✔ Styles are scoped
    ✔ Events are retargeted
    ✔ Use <slot> to project light DOM content
    ✔ Use ::slotted() for styling slotted elements
    ✔ Use :host for styling host element
    ✔ composed: true for custom events that must escape shadow tree

  MENTAL MODEL:
    → Think of Shadow DOM as a "mini-DOM" inside an element:
         - Its own markup
         - Its own style rules
         - Protected from outside interference
         - Clean, modular, and encapsulated
*/
