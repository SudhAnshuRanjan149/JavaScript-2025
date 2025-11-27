/*
  V8 ENGINE INTERNALS (DETAILED, EASY TO UNDERSTAND)
  --------------------------------------------------
  ✔ V8 = JavaScript engine used by:
        - Google Chrome
        - Node.js
        - Deno
        - Electron
        - Cloudflare Workers

  ✔ V8 takes **JavaScript code → Executes it efficiently** using:
        - Parsers
        - Ignition Interpreter
        - TurboFan JIT Compiler
        - Orinoco & Oilpan (Garbage Collectors)
        - Hidden Classes + Inline Caches
        - Heaps + Memory Spaces

  ✔ LET’S DEEP DIVE INTO ITS INTERNALS:
        1) Parsing & AST
        2) Bytecode (Ignition)
        3) JIT Optimization (TurboFan)
        4) Hidden Classes
        5) Inline Caches (ICs)
        6) Memory Layout (Heap Spaces)
        7) Garbage Collection (GC)
*/



/* ============================================================
   1. PARSING → AST (ABSTRACT SYNTAX TREE)
   ============================================================
*/
/*
  ✔ Step 1: Source code is parsed by IGNITION parser
  ✔ V8 compiles JS in 2 phases:
      - Pre-parser (for lazy functions)
      - Full parser

  ✔ Output:
      - AST (tree of JS structure)
      - Scope information
      - Variable / function declarations
*/



/* ============================================================
   2. IGNITION → BYTECODE GENERATOR
   ============================================================
*/
/*
  ✔ V8 converts AST → Bytecode (NOT machine code)
  ✔ Bytecode runs on Ignition Interpreter
  ✔ Example:
      const x = a + b;

  Ignition creates bytecode instructions like:
      LdaGlobal a
      Add b
      StaGlobal x

  ✔ Interpreter executes this bytecode step-by-step
*/



/* ============================================================
   3. TURBOFAN (JIT OPTIMIZER — JUST IN TIME COMPILER)
   ============================================================
*/
/*
  ✔ While Ignition runs code, it *monitors* performance:
      - types observed
      - stable shapes (hidden classes)
      - repeated function calls

  ✔ When function becomes "hot" (often called):
        TurboFan compiles it to optimized machine code.

  ✔ If assumptions fail → deoptimization:
        optimized code → fallback to interpreter

  ✔ This dynamic optimization is KEY for performance.
*/



/* ============================================================
   4. HIDDEN CLASSES (VERY IMPORTANT)
   ============================================================
*/
/*
  ✔ JS is dynamic, but V8 tries to treat objects like C++ structs.

  Example:
      const user = { name: "A", age: 20 };

  ✔ Internally V8 creates a HIDDEN CLASS:
      Class0:
        - name @ offset 0
        - age  @ offset 1

  ✔ If you *add properties in same order* every time →
        hidden classes are shared → very fast.

  ✔ If you mutate objects inconsistently → hidden class changes
        → slow performance (shape transitions)
*/

/// BAD (creates many hidden classes)
const obj = {};
obj.x = 1;
obj.y = 2;

/// GOOD (one hidden class)
const obj2 = { x: 1, y: 2 };



/* ============================================================
   5. INLINE CACHES (IC) — SPEED UP PROPERTY ACCESS
   ============================================================
*/
/*
  ✔ V8 stores results of previous lookups.
  ✔ If object types remain the same → property access becomes extremely fast.
  ✔ Inline Cache states:
        - uninitialized
        - monomorphic (fastest)
        - polymorphic
        - megamorphic (slow)

  Example:
      obj.name
      obj.name
      obj.name

  ✔ After first few calls → monomorphic IC → blazing fast.
*/

function greet(u) {
  return u.name;
}

greet({ name: "A" });
greet({ name: "B" });
greet({ name: "C" });

/*
  ✔ All objects have SAME hidden class → monomorphic IC.
*/



/* ============================================================
   6. V8 MEMORY STRUCTURE (HEAP SPACES)
   ============================================================
*/
/*
  V8 manages memory in structured regions called "spaces":

  1) NEW SPACE (Young Gen)
      - Small, fast allocation
      - Objects die quickly
      - GC happens often (minor GC)

  2) OLD SPACE
      - Long-lived objects promoted from new space

  3) CODE SPACE
      - Machine code from TurboFan

  4) MAP SPACE
      - Hidden classes stored here

  5) LARGE OBJECT SPACE
      - Huge arrays, large strings → allocated separately

  ---------------------------------------------------
  MEMORY FLOW:
    new object → New Space
      ↑ many survive? → promoted → Old Space
*/



/* ============================================================
   7. GARBAGE COLLECTION (GC) — ORINOCO + OILPAN
   ============================================================
*/
/*
  ✔ Young Generation → Scavenger (copying GC)
      - Semi-space algorithm
      - Fast, frequent

  ✔ Old Generation → Mark-Sweep & Mark-Compact
      - Slower, less frequent
      - V8 uses incremental + parallel + concurrent GC to avoid blocking UI

  ✔ Steps:
      1) Mark reachable objects
      2) Sweep unmarked ones
      3) Compact memory (avoid fragmentation)

  ✔ Oilpan = C++ heap garbage collector used by Blink (DOM engine).
*/



/* ============================================================
   8. OPTIMIZATION TIPS BASED ON V8 INTERNALS
   ============================================================
*/
/*
  ✔ 1. Keep object shapes consistent
      - add properties in same order

  ✔ 2. Avoid deleting object properties
      → causes hidden class invalidations

  ✔ 3. Avoid polymorphism
      function foo(a) { return a.x }
      foo({x:1}) → OK
      foo({x:1,y:2}) → still OK
      foo(5)       → breaks IC

  ✔ 4. Avoid try/catch in hot functions
      → keeps function un-optimizable

  ✔ 5. Keep arrays monomorphic & packed
      - avoid sparse arrays
      - avoid mixing types (numbers + strings)
*/

/// BAD (sparse array)
const arr = [];
arr[0] = 1;
arr[1000] = 2;

/// BAD (mixed types)
const arr2 = [1, "text", true];

/// GOOD
const arr3 = [1, 2, 3, 4];



/* ============================================================
   9. OPTIMIZATION PIPELINE (HIGH LEVEL SUMMARY)
   ============================================================
*/
/*
  1) Parsing → AST
  2) Bytecode generation (Ignition)
  3) Interpreter executes bytecode
  4) Gather runtime feedback
  5) If function hot → TurboFan optimizes to machine code
  6) If type assumptions break → deoptimizes
*/



/* ============================================================
   10. V8 DEBUGGING & PROFILING TOOLS
   ============================================================
*/
/*
  ✔ Chrome DevTools
        - Performance tab (JIT info)
        - Memory → heap snapshots
        - Sources → deoptimizations (enable "show debugger scripts")

  ✔ V8 Flags (Node.js)
        node --trace-opt script.js
        node --trace-deopt script.js
        node --print-opt-code script.js

  ✔ Useful flags:
        --allow-natives-syntax
        --trace-gc
        --max-old-space-size=4096
*/



/* ============================================================
   SUMMARY (CHEAT SHEET)
   ============================================================
*/
/*
  ✔ V8 Architecture:
      Parsing → Bytecode → Optimized Machine Code

  ✔ Key Components:
      - Ignition interpreter
      - TurboFan JIT compiler
      - Hidden classes
      - Inline caches
      - Garbage collectors (oilpan, orinoco)

  ✔ Memory:
      - New/Old Space
      - Code Space
      - Large Object Space
      - Map Space

  ✔ Performance Tips:
      - Keep hidden classes stable
      - Avoid sparse arrays & mixed types
      - Clean code for JIT friendliness
      - Avoid deoptimization triggers

  MENTAL MODEL:
    → V8 is like a smart pipeline:
         JS → AST → Bytecode → Optimized Machine Code
      It learns your code over time and makes it faster,
      as long as you keep objects & types predictable.
*/
