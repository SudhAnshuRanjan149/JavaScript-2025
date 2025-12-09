/*
  IMPORTANT TOPICS TO STUDY IN JAVASCRIPT (BASIC → ADVANCED)
  -----------------------------------------------------------
  This is a complete roadmap of what you should learn in the 
  correct progression order.
*/

const jsRoadmap = {
  basics: [
    "History of JavaScript",
    "How JS Runs (Browser vs Node.js)",
    "Variables (var, let, const)",
    "Data Types (primitive + reference)",
    "Operators (arith, logical, comparison)",
    "Conditionals (if, else, switch)",
    "Loops (for, while, do-while, for...of, for...in)",
    "Functions (declaration, expression, arrow)",
    "Scope (global, function, block)",
    "Lexical Scope",
    "Hoisting",
    "Strict Mode",
    "DOM Basics (select, modify, events)",
    "JSON Basics",
  ],

  intermediate: [
    "Execution Context",
    "Call Stack",
    "Memory Heap",
    "Event Loop",
    "Task Queue & Microtasks",
    "Closures (very important)",
    "Function Currying",
    "Higher Order Functions",
    "Callback Functions",
    "Array Methods (map, filter, reduce, every, some, sort, etc.)",
    "Objects & Object Methods",
    "Destructuring",
    "Spread & Rest Operators",
    "Template Literals",
    "Default Parameters",
    "Short-circuiting (||, &&, ??)",
    "Modules (import/export)",
    "Undeclared vs Undefined vs Not Defined",
    "Deep vs Shallow Copy",
    "Collection Types (Map, Set, WeakMap, WeakSet)",
  ],

  advanced: [
    "Prototype",
    "Prototype Chain",
    "this Keyword (binding, call, apply, bind)",
    "Constructor Function",
    "ES6 Classes",
    "Inheritance (ES6 + Prototype)",
    "Encapsulation, Polymorphism (OOP concepts)",
    "Symbol, Iterators, Generators",
    "Advanced Functions (IIFE, Pure Functions, Memoization)",
    "Asynchronous JS (very important)",
    "Promises",
    "Async/Await",
    "Promise.all, allSettled, race, any",
    "Fetch API + HTTP Requests",
    "Error Handling",
    "Debouncing & Throttling",
    "Event Delegation",
    "Event Bubbling & Capturing",
    "Custom Events",
    "Thunk Functions",
    "Polyfills & Transpilation",
    "BOM in Browser",
    "Regular Expressions in JS",
    "New Keyword",
    "Typed Arrays",
    "Proxy & Reflect",
    "Memory Management & Garbage Collection",
  ],

  very_advanced: [
    "Event Loop Deep Dive",
    "Shadow DOM",
    "Web Components",
    "Service Workers",
    "IndexedDB",
    "WebSockets",
    "Streams API",
    "Performance Optimization",
    "Memory Leaks & Profiling",
    "V8 Engine Internals",
    "Mutation Observers",
    "Just-In-Time (JIT) Compilation",
    "Meta Programming",
    "Decorators",
    "Internationalization (i18n)",
    "WebAssembly Basics",
    "Web Workers"
  ],

  expert: [
    "Progressive Web Apps (PWAs)",
    "Functional Programming in JS",
    "Reactive Programming Concepts",
    "State Machines",
    "Abstract Syntax Trees (AST)",
    "Writing Compilers/Transpilers Basics",
    "Creating Custom Bundlers",
  ],

  browser: [
    "Accessibility (a11y)",
    "Web APIs (Canvas, WebGL, etc.)",
    "Service Workers", // refer -> very_advanced -> Service Workers
    "WebSockets", // refer -> very_advanced -> WebSockets
    "WebRTC",
    "Intersection Observer",
    "Resize Observer"
  ],

  ecosystem: [
    "Node.js Fundamentals",
    "NPM & Package Management",
    "Express.js",
    "Databases (MongoDB, PostgreSQL)",
    "Frontend Frameworks (React, Vue, Svelte)",
    "Build Tools (Webpack, Vite, Rollup)",
    "Testing (Jest, Mocha, Cypress)",
    "TypeScript",
  ]
};

console.log(jsRoadmap);

