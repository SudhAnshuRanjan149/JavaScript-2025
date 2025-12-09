/****************************************************************************************
 * ADVANCED DOM MANIPULATION IN JAVASCRIPT — COMPLETE & DETAILED GUIDE
 *
 * Topics covered (deep):
 *  - Efficient DOM updates & batching
 *  - DocumentFragment & templates
 *  - Virtual DOM concept & reconciliation notes
 *  - Shadow DOM & Web Components (Custom Elements, slots)
 *  - Template content & <template> usage
 *  - Performance: reflow/repaint, layout thrash, minimizing paint
 *  - requestAnimationFrame, requestIdleCallback, microtask vs macrotask
 *  - Efficient event handling: delegation, passive/once/capture, abortable listeners
 *  - Advanced traversal & mutation APIs (TreeWalker, NodeIterator, Range, Selection)
 *  - Observers: MutationObserver, ResizeObserver, IntersectionObserver
 *  - CSSOM: style manipulation, CSS variables, computed styles
 *  - Web Animations API vs CSS transitions
 *  - OffscreenCanvas, canvas optimizations, image decoding
 *  - Accessibility concerns when manipulating DOM
 *  - Memory management with DOM nodes (leaks, detaching, reuse)
 *  - Progressive rendering: virtualization, incremental hydration
 *  - Security: sanitization & CSP while updating DOM
 *  - History & navigation manipulation (pushState, replaceState)
 *  - Clipboard, drag/drop advanced usage
 *  - Testing & debugging tips (Performance API, DevTools)
 *
 * This file mixes explanatory comments and runnable code examples to illustrate patterns.
 ****************************************************************************************/


/*========================================================================================
 0. BASIC GUIDING PRINCIPLE (APPLY TO EVERYTHING)
========================================================================================*/
//
// → Minimize direct DOM writes. Read what you need, compute, then write in as few ops as possible.
// → Prefer declarative approaches (templates, components) for complex UIs.
// → Always consider accessibility & security when injecting HTML.
//
// Example guideline:
//  - READ values first (getBoundingClientRect / offsetHeight) → compute → WRITE (style changes)
//  - Avoid interleaving many reads and writes which cause layout thrashing
//


/*========================================================================================
 1. BATCHING DOM UPDATES & AVOIDING LAYOUT THRASH
========================================================================================*/
//
// Problem: alternating reads and writes forces the browser to flush layout (reflow) repeatedly.
// Good pattern:
//   - collect reads
//   - batch writes inside requestAnimationFrame or microtask (depending on need)
//
// Example: bad vs good
//

// BAD: causes layout thrash
const items = document.querySelectorAll('.item');
items.forEach(el => {
  const h = el.offsetHeight;         // read -> triggers layout
  el.style.height = (h + 10) + 'px'; // write -> may force recalculation
});

// GOOD: batch reads then writes
const heights = [];
items.forEach(el => heights.push(el.offsetHeight)); // all reads first
items.forEach((el, i) => el.style.height = (heights[i] + 10) + 'px'); // then writes


/*========================================================================================
 2. requestAnimationFrame & requestIdleCallback
========================================================================================*/
//
// Use requestAnimationFrame for visual updates synchronized with paint.
// Use requestIdleCallback for non-urgent background work (not in all browsers).
//

// Visual update scheduled before next paint
requestAnimationFrame(() => {
  document.body.classList.add('visible');
});

// Defer low-priority tasks until browser is idle
if ('requestIdleCallback' in window) {
  requestIdleCallback(deadline => {
    while (deadline.timeRemaining() > 0) {
      // do small chunks of work
      break;
    }
  });
}


/*========================================================================================
 3. DocumentFragment (build off-DOM then append once)
========================================================================================*/
//
// Create many nodes off-DOM and append them once to minimize reflows.
//

const frag = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const li = document.createElement('li');
  li.textContent = `Item ${i}`;
  frag.appendChild(li);
}
document.getElementById('bigList').appendChild(frag); // one DOM insertion


/*========================================================================================
 4. <template> ELEMENT (declarative templates)
========================================================================================*/
//
// <template> contains inert DOM — parsing does not execute scripts or render until cloned.
//

/*
<html>
  <body>
    <template id="card-tpl">
      <div class="card">
        <h3 class="title"></h3>
        <p class="desc"></p>
      </div>
    </template>
  </body>
</html>
*/

const tpl = document.getElementById('card-tpl');
function renderCard(data) {
  const clone = tpl.content.cloneNode(true);
  clone.querySelector('.title').textContent = data.title;
  clone.querySelector('.desc').textContent = data.desc;
  return clone;
}
document.body.appendChild(renderCard({ title: 'Hello', desc: 'World' }));


/*========================================================================================
 5. Virtual DOM (conceptual) & reconciliation notes
========================================================================================*/
//
// Concept: keep an in-memory tree representation, diff it against previous tree, and apply minimal DOM patches.
// Libraries implement reconciliation (React, Preact, Vue). If building a simple vdom:
//  - avoid full innerHTML replacement for large trees
//  - target minimal operations: setText, setAttribute, insertBefore, removeChild, replaceChild
//
// Notes:
//  - Keying lists is essential for minimizing node moves.
//  - Prefer stable keys (ids) over indices.
//
// Example pseudo-pattern:
function updateList(container, oldItems, newItems, renderItem, getKey) {
  // simplistic reconciliation mapping by key (not full implementation)
  const oldMap = new Map(oldItems.map(i => [getKey(i), i]));
  const frag = document.createDocumentFragment();
  newItems.forEach(item => frag.appendChild(renderItem(item)));
  container.replaceChildren(frag); // crude but safe
}


/*========================================================================================
 6. Shadow DOM & Web Components (Custom Elements)
========================================================================================*/
//
// Shadow DOM provides encapsulation for markup & styles.
// Custom Elements allow registering new HTML tags.
//
// Key APIs:
//  - class MyEl extends HTMLElement { connectedCallback(){}, disconnectedCallback(){}, attributeChangedCallback(){ } }
//  - customElements.define('my-el', MyEl)
//  - this.attachShadow({mode: 'open'|'closed'})
//
// Example: simple web component with shadow DOM
class MyTimer extends HTMLElement {
  constructor() {
    super();
    this._root = this.attachShadow({ mode: 'open' });
    this._root.innerHTML = `<style>:host{display:block;background:#eee;padding:8px}</style><span class="time"></span>`;
    this._span = this._root.querySelector('.time');
  }
  connectedCallback() {
    this._interval = setInterval(() => {
      this._span.textContent = new Date().toLocaleTimeString();
    }, 1000);
  }
  disconnectedCallback() {
    clearInterval(this._interval);
  }
}
customElements.define('my-timer', MyTimer);

// Usage in HTML: <my-timer></my-timer>
//
// Slots: allow light DOM projection into shadow DOM (use <slot> elements).


/*========================================================================================
 7. Slots & Light DOM projection
========================================================================================*/
//
// <slot name="header"></slot> collects elements with slot="header" attribute from light DOM.
// Useful to build composable components.
//


/*========================================================================================
 8. Styling & CSSOM advanced manipulation
========================================================================================*/
//
// Use CSS variables and update them via style.setProperty for cheap repaint-only updates.
// Read computed styles only when necessary (getComputedStyle).
//

// Update theme color via CSS custom property
document.documentElement.style.setProperty('--accent', '#ff6600');

// Read computed style
const computed = getComputedStyle(document.body);
const fontSize = computed.fontSize;


/*========================================================================================
 9. classList, dataset, attributes vs properties
========================================================================================*/
//
// Prefer classList.toggle/add/remove for class changes.
// Use element.dataset for data-* attributes (string-only).
// Understand difference: element.src (property) vs element.getAttribute('src') (attribute string).
//

const el = document.querySelector('.box');
el.classList.add('active');
el.dataset.id = '42';
const attrValue = el.getAttribute('data-id'); // "42"


/*========================================================================================
 10. Efficient form & input handling (debounce, input coalescing)
========================================================================================*/
//
// For large forms or live-search, debounce input events to reduce work.
// Use passive listeners for touch/scroll to improve performance.
//

function debounce(fn, delay) {
  let id;
  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => fn(...args), delay);
  };
}

document.getElementById('search').addEventListener('input', debounce((e) => {
  // perform search
}, 300));


/*========================================================================================
 11. Event Delegation (advanced usage)
========================================================================================*/
//
// Attach listener high on a container and filter using event.target.matches(selector).
// Use closest() for checking ancestry. This supports dynamic elements and fewer listeners.
//

document.getElementById('list').addEventListener('click', (e) => {
  const li = e.target.closest('li');
  if (!li) return;
  // handle click on li
});


/*========================================================================================
 12. Passive & Once & Capture & Abortable listeners
========================================================================================*/
//
// Passive: { passive: true } -> indicates won't call preventDefault (helpful for touch/scroll).
// Once: { once: true } -> auto remove after first invocation.
// Capture: set when you need pre-bubbling execution.
// Abortable via AbortController: allows grouped removal of listeners.
//

const controller = new AbortController();
const opts = { passive: true, signal: controller.signal };
window.addEventListener('scroll', () => { /* ... */ }, opts);

// later:
controller.abort(); // removes the listener


/*========================================================================================
 13. TreeWalker & NodeIterator (fine-grained traversal)
========================================================================================*/
//
// Useful to iterate text nodes, skip elements, or walk filtered subtrees efficiently.
//

const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
  acceptNode(node) {
    if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
    return NodeFilter.FILTER_ACCEPT;
  }
});
let node;
while ((node = walker.nextNode())) {
  // process text node
}


/*========================================================================================
 14. Range & Selection API (text selection, rich editing)
========================================================================================*/
//
// Range allows programmatic selection, insertions, wrapping nodes.
// Useful for rich text editors and copy/paste manipulations.
//

// Create a range that surrounds node content
const p = document.querySelector('p');
const range = document.createRange();
range.selectNodeContents(p);

// Replace selected content
range.deleteContents();
range.insertNode(document.createTextNode('Replaced!'));

// Selection: window.getSelection()
const sel = window.getSelection();
sel.removeAllRanges();
sel.addRange(range);


/*========================================================================================
 15. ContentEditable & designMode (advanced editing)
========================================================================================*/
//
// contenteditable elements can be used to build editors, but must manage sanitization,
// keyboard handling, selection, and undo/redo logic. Browser execCommand is deprecated.
//
// Alternative: implement custom commands or use document.execCommand cautiously.
//
const editor = document.getElementById('editor');
editor.contentEditable = 'true';
// Listen and sanitize pasted HTML before inserting
editor.addEventListener('paste', (e) => {
  e.preventDefault();
  const text = (e.clipboardData || window.clipboardData).getData('text/plain');
  document.execCommand('insertText', false, text); // simple paste sanitized as plain text
});


/*========================================================================================
 16. MutationObserver (advanced patterns)
========================================================================================*/
//
// Use for reacting to DOM changes from third-party libs, but avoid feedback loops.
// Use options to limit observations (attributeFilter, subtree:false).
//

const mo = new MutationObserver((mutations) => {
  // batch process mutation records
});
mo.observe(document.body, {
  childList: true,
  attributes: true,
  attributeFilter: ['class', 'data-state'],
  subtree: true,
  characterData: false
});
// Disconnect when not needed to avoid memory leaks:
mo.disconnect();


/*========================================================================================
 17. ResizeObserver (observe element size changes)
========================================================================================*/
//
// More efficient than polling getBoundingClientRect. Useful for responsive widgets.
//

if ('ResizeObserver' in window) {
  const ro = new ResizeObserver(entries => {
    for (const entry of entries) {
      const cr = entry.contentRect;
      // handle size change for entry.target
    }
  });
  ro.observe(document.querySelector('.resizable'));
}


/*========================================================================================
 18. IntersectionObserver (lazy loading, infinite scroll, visibility)
========================================================================================*/
//
// Replace expensive scroll handlers. Use threshold to tune visibility triggers.
//

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // load image or start animation
      const img = entry.target;
      img.src = img.dataset.src;
      io.unobserve(img);
    }
  });
}, { root: null, rootMargin: '200px', threshold: 0.1 });

document.querySelectorAll('img[data-src]').forEach(img => io.observe(img));


/*========================================================================================
 19. Web Animations API (WAAPI) vs CSS transitions
========================================================================================*/
//
// WAAPI gives programmatic control, promises, and better performance for complex sequences.
// Example: animate element opacity from 0 → 1
const animEl = document.querySelector('.animate');
const animation = animEl.animate([
  { opacity: 0, transform: 'translateY(10px)' },
  { opacity: 1, transform: 'translateY(0)' }
], {
  duration: 400,
  easing: 'ease-out',
  fill: 'forwards'
});
animation.onfinish = () => { /* animation ended */ };


/*========================================================================================
 20. OffscreenCanvas & worker-driven rendering
========================================================================================*/
//
// For heavy canvas work, create an OffscreenCanvas and transfer it to a Web Worker.
// This avoids main-thread blocking for graphics processing (supported in modern browsers).
//

// main thread:
// if (OffscreenCanvas) {
//   const canvas = document.getElementById('gfx');
//   const off = canvas.transferControlToOffscreen();
//   const worker = new Worker('render-worker.js');
//   worker.postMessage({ canvas: off }, [off]);
// }


/*========================================================================================
 21. Image decoding & performance tips
========================================================================================*/
//
// Use HTMLImageElement.decode() to asynchronously decode images before inserting to avoid layout jank.
//
async function loadImage(url) {
  const img = new Image();
  img.src = url;
  await img.decode(); // ensure decoded (may throw)
  document.body.appendChild(img);
}


/*========================================================================================
 22. Lazy loading & responsive images (loading attr & srcset)
========================================================================================*/
//
// Use <img loading="lazy"> and srcset/sizes to reduce bandwidth & rendering work.
//

/*
<img loading="lazy" data-src="photo.jpg" srcset="small.jpg 480w, medium.jpg 800w, large.jpg 1200w" sizes="(max-width:600px) 480px, 800px">
*/


/*========================================================================================
 23. Accessibility considerations when manipulating DOM
========================================================================================*/
//
// - Update ARIA attributes on dynamic changes (aria-live, aria-hidden, aria-expanded).
// - Manage focus when inserting/removing interactive elements (focus trap in modals).
// - Ensure semantic elements are used; if you create role="button", also add keyboard handlers and tabindex.
// - When removing content, ensure screen readers are informed (aria-live or role=alert).
//

// Example: Announcing success via aria-live
const statusEl = document.getElementById('status');
statusEl.setAttribute('aria-live', 'polite');
statusEl.textContent = 'Saved successfully';


/*========================================================================================
 24. Memory leaks & proper node cleanup
========================================================================================*/
//
// Common leak sources:
//  - Event listeners on removed DOM nodes that keep closures alive
//  - References in global caches/maps to DOM nodes
//  - Timers (setInterval) referencing DOM
//
// Prevention:
//  - Remove listeners in disconnectedCallback (Web Components) or when removing nodes
//  - Use WeakRef/WeakMap for caching metadata keyed by DOM node (if available)
//  - Clear timers and observers
//

// Example: detach listeners before removing node
function removeWidget(el) {
  el.querySelectorAll('*').forEach(child => {
    // if you attached listeners directly, ensure cleanup
  });
  // or use event delegation to minimize per-node listeners
  el.remove();
}


/*========================================================================================
 25. Recycling nodes & list virtualization (for huge lists)
========================================================================================*/
//
// Rendering thousands of DOM nodes kills performance. Use virtualization: render only visible window.
// Libraries: react-window, virtual-scroller etc. Strategy:
//  - compute visible range based on scroll
//  - recycle DOM nodes by repositioning (translateY) and updating content
//

// Simplified idea (pseudo):
//  - container has fixed height and overflow scroll
//  - inner spacer has total height = itemCount * itemHeight
//  - render only items in [startIdx, endIdx] positioned via transform


/*========================================================================================
 26. Security: sanitizing HTML before injecting
========================================================================================*/
//
// NEVER insert untrusted HTML via innerHTML. Use sanitizer libraries (DOMPurify) or construct nodes manually.
//
// Unsafe:
// el.innerHTML = userInput; // XSS risk
//
// Safe approaches:
// - Use textContent for raw text
// - Use DOMPurify.sanitize(userInput) then innerHTML if HTML is required
//


/*========================================================================================
 27. History API & SPAs (pushState, replaceState, popstate)
========================================================================================*/
//
// Use history.pushState to change URL without reload and reflect UI state.
// Listen to window.onpopstate to react to back/forward navigation.
//

// push state
history.pushState({ page: 'profile' }, 'Profile', '/profile');
// handle back
window.addEventListener('popstate', (e) => {
  // restore UI from e.state
});


/*========================================================================================
 28. Clipboard API (async) — copy/paste programmatically
========================================================================================*/
//
// navigator.clipboard.writeText / readText (secure context required). Use permissions API or fallback execCommand.
//
async function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    await navigator.clipboard.writeText(text);
  } else {
    // fallback: temporary textarea + execCommand('copy')
  }
}


/*========================================================================================
 29. Drag & Drop (advanced)
========================================================================================*/
//
// Use DataTransfer and manage drag image, types, allowed effects. For complex UIs consider Pointer Events + custom drag layer.
//

// Simplified:
document.addEventListener('dragstart', (e) => {
  e.dataTransfer.setData('text/plain', e.target.id);
  e.dataTransfer.effectAllowed = 'move';
});
document.addEventListener('drop', (e) => {
  e.preventDefault();
  const id = e.dataTransfer.getData('text/plain');
  // handle drop
});
document.addEventListener('dragover', (e) => e.preventDefault());


/*========================================================================================
 30. Testing & Debugging DOM performance
========================================================================================*/
//
// Tools & APIs:
//  - Chrome DevTools: Performance, Memory, Coverage, Rendering panes
//  - Performance API: performance.now(), performance.mark(), performance.measure()
//  - requestAnimationFrame frame timing & FPS analysis
//  - Heap snapshots to detect retained DOM nodes
//
// Example: measure a function
performance.mark('start-work');
// do DOM work...
performance.mark('end-work');
performance.measure('work', 'start-work', 'end-work');
const measures = performance.getEntriesByName('work');
console.log(measures[0].duration);


/*========================================================================================
 31. Putting it together — recommended architecture patterns
========================================================================================*/
//
// - Prefer declarative UI (components, templates)
// - Use one root container per widget, update via component rather than many global selects
// - Use event delegation for lists/trees
// - Use IntersectionObserver & lazy loading for offscreen resources
// - Use ResizeObserver for responsive widgets
// - Keep DOM updates in requestAnimationFrame for animations
// - Keep heavy CPU work off main thread (Web Workers / OffscreenCanvas)
// - Always properly cleanup observers, timers, listeners when removing nodes
// - Use semantic HTML and update ARIA attributes during dynamic changes
//
// A small component lifecycle example:
class SimpleWidget {
  constructor(root) {
    this.root = root;
    this.onResize = this.onResize.bind(this);
    this.ro = new ResizeObserver(this.onResize);
    this.ro.observe(this.root);
    this.root.addEventListener('click', this.handleClick);
  }
  onResize() {
    // handle resize
  }
  handleClick(e) {
    // handle click
  }
  destroy() {
    this.ro.disconnect();
    this.root.removeEventListener('click', this.handleClick);
    // release other resources
  }
}


/*========================================================================================
 32. Final checklist before manipulating the DOM in production
========================================================================================*/
//
// ✅ Do I need to touch the DOM or can I update state and let framework re-render?
// ✅ Batch DOM reads and writes.
// ✅ Use DocumentFragment / templates for bulk inserts.
// ✅ Use keys when reconciling lists.
// ✅ Avoid innerHTML with untrusted content; sanitize if needed.
// ✅ Update ARIA attributes & manage focus for accessibility.
// ✅ Use observers instead of polling where appropriate.
// ✅ Clean up listeners, observers, timers to prevent leaks.
// ✅ Profile with DevTools and iterate.
//
// End of guide — mastering these patterns enables building performant, accessible,
// and maintainable DOM-heavy applications.

