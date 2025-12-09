/****************************************************************************************
 * ACCESSIBILITY (a11y) IN JAVASCRIPT — COMPLETE & DETAILED GUIDE (BEGINNER → ADVANCED)
 *
 * Covers:
 * ✅ What Accessibility (a11y) is
 * ✅ Why Accessibility is critical
 * ✅ WCAG principles (POUR)
 * ✅ Screen readers & assistive technologies
 * ✅ Semantic HTML & JS role
 * ✅ ARIA roles, states & properties
 * ✅ Keyboard accessibility
 * ✅ Focus management
 * ✅ Forms accessibility
 * ✅ Images & media accessibility
 * ✅ Dynamic content & ARIA live regions
 * ✅ Accessibility testing
 * ✅ Common a11y mistakes
 * ✅ Interview-level concepts
 ****************************************************************************************/


/*========================================================================================
 1. WHAT IS ACCESSIBILITY (a11y)?
========================================================================================*/
//
// ACCESSIBILITY (a11y):
// ---------------------
// Making web applications usable by:
// ✅ People with disabilities
// ✅ Screen reader users
// ✅ Keyboard-only users
// ✅ Low-vision users
// ✅ Color-blind users
// ✅ Motor-impaired users
// ✅ Cognitive disabilities
//
// Why "a11y"? → Accessibility
// A + 11 letters + Y = a11y ✅
//
// Accessibility ensures that:
// ----------------------------
// ✅ Everyone can perceive, understand, navigate, and interact with your app
// ✅ Not just mouse users
//

/*========================================================================================
 2. WHY ACCESSIBILITY IS CRITICAL
========================================================================================*/
//
// ✅ Legal requirement in many countries (ADA, WCAG, Section 508)
// ✅ Ethical responsibility
// ✅ Better SEO
// ✅ Better UX for everyone
// ✅ Required in enterprise & government projects
// ✅ Improves mobile usability
//
// Real impact:
// ------------
// ❌ Without a11y → Blind users CANNOT use your app
// ❌ Without a11y → Keyboard users are locked out
// ❌ Without a11y → Screen readers break completely
//

/*========================================================================================
 3. WCAG GUIDELINES (POUR PRINCIPLE)
========================================================================================*/
//
// WCAG = Web Content Accessibility Guidelines
//
// FOUR CORE PRINCIPLES (POUR):
// ----------------------------
// ✅ P → Perceivable  → Users can perceive content
// ✅ O → Operable     → Users can operate UI
// ✅ U → Understandable → Users can understand behavior
// ✅ R → Robust       → Works with assistive technologies
//

/*========================================================================================
 4. ASSISTIVE TECHNOLOGIES
========================================================================================*/
//
// COMMON ASSISTIVE TOOLS:
// ------------------------
// ✅ Screen Readers → NVDA, JAWS, VoiceOver
// ✅ Screen Magnifiers
// ✅ Voice Control Systems
// ✅ Braille Displays
// ✅ Switch Devices
//
// Screen Readers depend on:
// --------------------------
// ✅ Semantic HTML
// ✅ ARIA roles
// ✅ Proper focus control
// ✅ Text alternatives
//

/*========================================================================================
 5. SEMANTIC HTML — FOUNDATION OF ACCESSIBILITY
========================================================================================*/
//
// ❌ BAD (No meaning – only visual)
const badDiv = document.createElement("div");
badDiv.onclick = () => {};
badDiv.innerText = "Click me";

// ✅ GOOD (Semantic meaning)
const goodBtn = document.createElement("button");
goodBtn.innerText = "Click me";
goodBtn.onclick = () => {};
//
// Screen reader understands:
// ✅ It's a BUTTON
// ✅ It is CLICKABLE
// ✅ It has a name
//

/*========================================================================================
 6. ROLE OF JAVASCRIPT IN ACCESSIBILITY
========================================================================================*/
//
// JavaScript is responsible for:
// ------------------------------
// ✅ Managing focus
// ✅ Updating ARIA states dynamically
// ✅ Handling keyboard events
// ✅ Making dynamic content accessible
// ✅ Preventing focus traps
// ✅ Announcing changes to screen readers
//

/*========================================================================================
 7. KEYBOARD ACCESSIBILITY (MOST IMPORTANT)
========================================================================================*/
//
// Every interactive element MUST be usable via keyboard:
// -------------------------------------------------------
// ✅ Tab → Navigate forward
// ✅ Shift + Tab → Navigate backward
// ✅ Enter → Activate
// ✅ Space → Activate buttons & toggles
// ✅ Arrow keys → Sliders, menus, lists
//

/*--- Keyboard Accessible Button ---*/

const kbButton = document.getElementById("kbBtn");

kbButton.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    kbButton.click(); // ✅ keyboard activation
  }
});

/*========================================================================================
 8. TABINDEX — CONTROLLING FOCUS ORDER
========================================================================================*/
//
// tabindex values:
// ----------------
// 0  → Natural tab order (recommended)
// -1 → Focusable programmatically, not via Tab
// >0 → Dangerous! Breaks natural focus order ❌
//

const modal = document.getElementById("modal");
modal.setAttribute("tabindex", "-1"); // ✅ focus programmatically
modal.focus();

/*========================================================================================
 9. FOCUS MANAGEMENT (CRITICAL FOR MODALS & SPAs)
========================================================================================*/
//
// Problems without focus management:
// ----------------------------------
// ❌ Screen reader lost in background
// ❌ Keyboard user trapped
// ❌ Tab goes behind modal
//

/*--- Example: Open Modal with Focus Control ---*/

const openBtn = document.getElementById("open");
const closeBtn = document.getElementById("close");
const dialog = document.getElementById("dialog");

openBtn.onclick = () => {
  dialog.style.display = "block";
  closeBtn.focus(); // ✅ move focus into modal
};

closeBtn.onclick = () => {
  dialog.style.display = "none";
  openBtn.focus(); // ✅ restore focus
};

/*========================================================================================
 10. ARIA — ACCESSIBLE RICH INTERNET APPLICATIONS
========================================================================================*/
//
// ARIA provides extra info for assistive tech:
// -------------------------------------------
// ✅ Roles
// ✅ States
// ✅ Properties
//
// IMPORTANT RULE:
// ---------------
// ❗ Always prefer SEMANTIC HTML over ARIA
// ❗ Use ARIA only when native HTML is insufficient
//

/*========================================================================================
 11. COMMON ARIA ROLES
========================================================================================*/
//
// role="button"
// role="dialog"
// role="alert"
// role="navigation"
// role="menu"
// role="tabpanel"
//

const ariaBtn = document.createElement("div");
ariaBtn.setAttribute("role", "button");
ariaBtn.setAttribute("tabindex", "0"); // ✅ keyboard focusable

/*========================================================================================
 12. ARIA STATES & PROPERTIES
========================================================================================*/
//
// aria-expanded
// aria-checked
// aria-hidden
// aria-disabled
// aria-label
// aria-labelledby
// aria-describedby
//

ariaBtn.setAttribute("aria-label", "Submit Form");

/*========================================================================================
 13. DYNAMIC UPDATES & LIVE REGIONS (SCREEN READER ANNOUNCEMENTS)
========================================================================================*/
//
// Used for:
// ---------
// ✅ Error messages
// ✅ Notifications
// ✅ Chat messages
// ✅ Validation feedback
//

const status = document.getElementById("status");
status.setAttribute("aria-live", "polite"); // ✅ announces changes

status.textContent = "Message sent successfully";

/*========================================================================================
 14. FORMS ACCESSIBILITY
========================================================================================*/
//
// ✅ Every input MUST have a label
// ✅ Error messages must be announced
// ✅ Required fields must be indicated
// ✅ Placeholder is NOT a label
//

const input = document.getElementById("email");
const label = document.getElementById("emailLabel");

input.setAttribute("aria-labelledby", "emailLabel");
input.setAttribute("aria-required", "true");

/*========================================================================================
 15. IMAGE ACCESSIBILITY
========================================================================================*/
//
// ✅ Informative images → MUST have alt text
// ✅ Decorative images → alt=""
//

const img = document.createElement("img");
img.src = "logo.png";
img.alt = "Company Logo"; // ✅ screen reader friendly

/*========================================================================================
 16. VIDEO & AUDIO ACCESSIBILITY
========================================================================================*/
//
// ✅ Captions for deaf users
// ✅ Transcripts for audio
// ✅ Controls for keyboard users
//

/*
<video controls>
  <track kind="captions" src="captions.vtt" srclang="en" label="English">
</video>
*/

/*========================================================================================
 17. COLOR & CONTRAST (VERY IMPORTANT)
========================================================================================*/
//
// ❌ DO NOT rely on color alone to convey info
// ✅ Maintain contrast ratio:
//
// WCAG:
// -----
// ✅ Text contrast ≥ 4.5:1 (normal text)
// ✅ Large text ≥ 3:1
//

/*========================================================================================
 18. DYNAMIC SPAs & ACCESSIBILITY
========================================================================================*/
//
// Single Page Applications problems:
// ----------------------------------
// ❌ Page changes without reload
// ❌ Screen reader not notified
// ❌ Focus stays on old content
//
// MUST:
// -----
// ✅ Update document.title
// ✅ Move focus manually
// ✅ Use aria-live regions
//

document.title = "Dashboard Loaded";

/*========================================================================================
 19. ACCESSIBILITY TESTING TOOLS
========================================================================================*/
//
// AUTOMATED TOOLS:
// ----------------
// ✅ Lighthouse
// ✅ axe DevTools
// ✅ WAVE
//
// MANUAL TESTING:
// ---------------
// ✅ Keyboard only navigation
// ✅ Screen reader testing
// ✅ High contrast mode
// ✅ Zoom upto 200%
//

/*========================================================================================
 20. COMMON ACCESSIBILITY MISTAKES
========================================================================================*/
//
// ❌ Missing labels
// ❌ Non-focusable custom buttons
// ❌ No keyboard support
// ❌ Poor color contrast
// ❌ No focus trap in modals
// ❌ Misuse of ARIA
// ❌ Relying only on mouse interactions
//

/*========================================================================================
 21. ACCESSIBILITY vs USABILITY
========================================================================================*/
//
// USABILITY → How EASY an app is to use
// ACCESSIBILITY → Whether EVERYONE can use it
//
// ✅ An app can be usable but NOT accessible
// ✅ Accessibility is broader than UX
//

/*========================================================================================
 22. INTERVIEW QUESTIONS & TRAPS
========================================================================================*/
//
// Q1: What does a11y mean?
// ✅ Accessibility
//
// Q2: Is ARIA better than semantic HTML?
// ❌ No
//
// Q3: What is tabindex="-1" used for?
// ✅ Programmatic focus
//
// Q4: What is aria-live used for?
// ✅ Announcing dynamic updates
//
// Q5: Does accessibility improve SEO?
// ✅ Yes
//

/*========================================================================================
 23. ONE-PAGE FINAL MASTER SUMMARY
========================================================================================*/
//
// ✅ a11y = Making web usable for everyone
// ✅ Based on WCAG → POUR principles
// ✅ Semantic HTML is MOST IMPORTANT
// ✅ JavaScript controls:
//    • Focus
//    • Keyboard interactions
//    • Dynamic ARIA updates
// ✅ aria-live announces updates
// ✅ Labels, alt text, captions are mandatory
// ✅ Keyboard-only users must navigate everything
// ✅ Accessibility is LEGALLY & ETHICALLY REQUIRED
//
// If you master a11y ✅
// → You become a WORLD-CLASS FRONTEND ENGINEER 🌍🚀

