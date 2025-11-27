/*
  WEB COMPONENTS IN JAVASCRIPT — GREAT DETAIL
  -------------------------------------------
  ✔ Web Components = a suite of 4 browser APIs that let you build 
    reusable, encapsulated, custom UI elements.

  ✔ The 4 key technologies:
      1) Custom Elements
      2) Shadow DOM
      3) HTML Templates
      4) ES Modules

  ✔ All modern browsers support Web Components natively.
*/



/* ============================================================
   1. OVERVIEW: WHAT ARE WEB COMPONENTS?
   ============================================================
*/
/*
  ✔ A way to build reusable UI widgets like:
       <my-button>  <my-modal>  <my-slider>  <my-tabs>
  
  ✔ Encapsulation:
       Each component has its own:
         - DOM structure
         - Styles (CSS)
         - Behavior (JS)
         - Lifecycle
  
  ✔ No framework needed (React, Vue, Angular are not required).

  ✔ They work with ANY JS framework — or without one.
*/



/* ============================================================
   2. #1 — CUSTOM ELEMENTS (DEFINE YOUR OWN TAGS)
   ============================================================
   API:
     customElements.define("tag-name", class {});
*/

class MyElement extends HTMLElement {
  constructor() {
    super();
    console.log("MyElement: constructor called");
  }

  connectedCallback() {
    console.log("Element added to DOM");
    this.innerHTML = `<p>Hello from custom element!</p>`;
  }

  disconnectedCallback() {
    console.log("Element removed from DOM");
  }
}

customElements.define("my-element", MyElement);

document.body.innerHTML = `<my-element></my-element>`;

/*
  ✔ Custom tag: <my-element>
  ✔ Must contain a dash (-)
  ✔ Lifecycle methods:
       - constructor()
       - connectedCallback()
       - disconnectedCallback()
       - adoptedCallback()
       - attributeChangedCallback()
*/



/* ============================================================
   3. LIFECYCLE CALLBACKS
   ============================================================
*/
/*
  constructor()              → instance created
  connectedCallback()        → inserted into DOM
  disconnectedCallback()     → removed from DOM
  adoptedCallback()          → moved between documents
  attributeChangedCallback() → attribute changed

  Only attributeChangedCallback requires:
     static get observedAttributes()
*/



/* ------------------------------------------------------------
   Example WITH observedAttributes
   ------------------------------------------------------------ */

class Counter extends HTMLElement {
  static get observedAttributes() {
    return ["count"];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldV, newV) {
    this.render();
  }

  render() {
    this.innerHTML = `<h3>Count is: ${this.getAttribute("count")}</h3>`;
  }
}

customElements.define("my-counter", Counter);

document.body.innerHTML += `<my-counter count="10"></my-counter>`;

/*
  ✔ Anytime "count" attribute updates:
       <my-counter count="20">
     → attributeChangedCallback fires
     → UI re-renders
*/



/* ============================================================
   4. #2 — SHADOW DOM (ISOLATED DOM + CSS SCOPE)
   ============================================================
   attachShadow({mode:"open"|"closed"})
*/

class ShadowCard extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });

    this.root.innerHTML = `
      <style>
        .box {
          background: black;
          color: white;
          padding: 10px;
          border-radius: 6px;
        }
      </style>

      <div class="box">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("shadow-card", ShadowCard);

document.body.innerHTML += `
  <shadow-card>Hello from inside Shadow DOM!</shadow-card>
`;

/*
  ✔ Styles do NOT leak outside
  ✔ Outer styles do NOT affect shadow DOM
*/



/* ============================================================
   5. #3 — HTML TEMPLATES
   ============================================================
*/
/*
  ✔ <template> stores DOM but DOES NOT render.
  ✔ Useful for components that clone repeated UI fragments.
*/

document.body.innerHTML += `
  <template id="user-template">
    <div class="user">
      <strong>Name:</strong> <span class="name"></span>
    </div>
  </template>

  <div id="users"></div>
`;

function addUser(name) {
  const tmpl = document.getElementById("user-template");
  const clone = tmpl.content.cloneNode(true);

  clone.querySelector(".name").textContent = name;

  document.getElementById("users").appendChild(clone);
}

addUser("Alice");
addUser("Bob");

/*
  ✔ Template content is cloned using template.content
  ✔ Works perfectly with Shadow DOM components
*/



/* ============================================================
   6. #4 — ES MODULES (USED FOR ORGANIZED COMPONENT FILES)
   ============================================================
*/
/*
  ✔ Each component can be defined in its own JavaScript file.
  ✔ import/export is used to load them.

  Example:
     <script type="module" src="my-button.js"></script>

  my-button.js:
     export class MyButton extends HTMLElement { ... }
     customElements.define("my-button", MyButton);
*/



/* ============================================================
   7. PUTTING THEM TOGETHER — FULL WEB COMPONENT EXAMPLE
   ============================================================
*/

class MyPopup extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });

    this.root.innerHTML = `
      <style>
        .popup {
          display: none;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          padding: 20px;
          border: 2px solid #333;
          box-shadow: 0 0 10px rgba(0,0,0,0.3);
        }
        .popup.open {
          display: block;
        }
        button {
          margin-top: 10px;
        }
      </style>

      <div class="popup">
        <slot></slot>
        <button id="close-btn">Close</button>
      </div>
    `;

    this.popup = this.root.querySelector(".popup");
    this.closeBtn = this.root.querySelector("#close-btn");

    this.closeBtn.addEventListener("click", () => this.hide());
  }

  show() {
    this.popup.classList.add("open");
  }

  hide() {
    this.popup.classList.remove("open");
  }

  connectedCallback() {
    if (this.hasAttribute("open")) {
      this.show();
    }
  }
}

customElements.define("my-popup", MyPopup);

document.body.innerHTML += `
  <my-popup open>
    <h2>Welcome!</h2>
    <p>This is a custom popup built with Web Components.</p>
  </my-popup>
`;

/*
  ✔ This popup:
      - Has isolated CSS & DOM
      - Uses slots for flexible content
      - Uses lifecycle methods
      - Is reusable anywhere
*/



/* ============================================================
   8. ADVANCED FEATURES
   ============================================================
*/
/*
  ::slotted()     → style projected content
  :host           → style host element
  :host-context() → apply style if host is inside selector
  adoptedStyleSheets → attach CSSStyleSheet objects

  Shadow DOM events:
    - retargeting (event.target becomes host outside)
    - composed: true for custom events that escape shadow DOM
*/



/* ============================================================
   9. ADVANTAGES OF WEB COMPONENTS
   ============================================================
*/
/*
  ✔ Native browser support — no frameworks required
  ✔ True encapsulation (HTML/CSS/JS)
  ✔ Components work everywhere:
        - React
        - Angular
        - Vue
        - Vanilla JS
  ✔ Reusable + portable
  ✔ Great for design systems
  ✔ Shadow DOM avoids CSS conflicts
*/



/* ============================================================
   10. DISADVANTAGES OF WEB COMPONENTS
   ============================================================
*/
/*
  ✔ More boilerplate than React/Vue
  ✔ Harder to manage state + reactivity manually
  ✔ SSR (Server-Side Rendering) challenges
  ✔ No built-in data-binding / JSX / reactivity
  ✔ Some styling limitations (slotted elements, host)
*/



/* ============================================================
   SUMMARY (CHEAT SHEET)
   ============================================================
*/
/*
  ✔ Web Components = Custom Elements + Shadow DOM + Templates + ES Modules

  ✔ Custom Elements
      customElements.define("tag-name", class {})
      lifecycle: constructor, connectedCallback, etc.

  ✔ Shadow DOM
      attachShadow({mode})
      encapsulated DOM + CSS
      uses slot for projection

  ✔ Templates
      <template> for reusable DOM fragments
      cloneNode(true) to use them

  ✔ ES Modules
      import/export component files
      <script type="module">

  MENTAL MODEL:
    → Web Components = Build your own HTML elements
      with isolated DOM + CSS + JS that work ANYWHERE.
*/
