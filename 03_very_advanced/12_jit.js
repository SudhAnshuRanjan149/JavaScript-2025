/****************************************************************************************
 * JUST-IN-TIME (JIT) COMPILATION IN JAVASCRIPT — COMPLETE & DETAILED GUIDE (BEGINNER → ADV)
 *
 * Covers:
 * ✅ What JIT is
 * ✅ Why JS needs JIT
 * ✅ Interpreter vs Compiler vs JIT
 * ✅ How JS engine executes code
 * ✅ V8 pipeline (Ignition → TurboFan)
 * ✅ Hot code optimization
 * ✅ De-optimization (Deopt)
 * ✅ Inline Caching
 * ✅ Hidden Classes
 * ✅ Performance traps
 * ✅ Interview-level explanations
 ****************************************************************************************/


/*========================================================================================
 1. WHAT IS JIT (JUST-IN-TIME) COMPILATION?
========================================================================================*/
//
// JIT = JUST-IN-TIME COMPILATION
// -----------------------------
// It is a technique where code is:
// ✅ Interpreted first
// ✅ Then compiled into MACHINE CODE at runtime
// ✅ Only for frequently executed ("hot") code
//
// In simple words:
// ----------------
// JavaScript is:
// ❌ NOT purely interpreted
// ❌ NOT purely compiled
// ✅ It is JIT compiled
//
// JIT gives us:
// -------------
// ✅ Fast startup (like interpreter)
// ✅ High performance (like compiler)
//


/*========================================================================================
 2. WHY DOES JAVASCRIPT NEED JIT?
========================================================================================*/
//
// Problems with ONLY INTERPRETER:
// -------------------------------
// ❌ Slow execution (line-by-line every time)
//
// Problems with ONLY COMPILER:
// ----------------------------
// ❌ Slow startup (compile whole program first)
// ❌ Not suitable for dynamic languages
//
// JavaScript is:
// --------------
// ✅ Dynamic
// ✅ Weakly typed
// ✅ Runtime behavior changes
//
// So JS engines use:
// ------------------
// ✅ JIT = Best of both worlds
//


/*========================================================================================
 3. INTERPRETER vs COMPILER vs JIT (INTERVIEW FAVORITE)
========================================================================================*/
//
// INTERPRETER:
// ------------
// ✅ Executes line by line
// ✅ Fast startup
// ❌ Slow execution
// Example: Python (mostly)
//
// COMPILER:
// ---------
// ✅ Compiles whole program first
// ✅ Very fast execution
// ❌ Slow startup
// Example: C, C++
//
// JIT (JavaScript):
// -----------------
// ✅ Interprets first
// ✅ Detects hot code
// ✅ Compiles only hot code
// ✅ Optimizes at runtime
// ✅ De-optimizes if assumptions break
//


/*========================================================================================
 4. HOW JAVASCRIPT CODE IS EXECUTED INTERNALLY
========================================================================================*/
//
// When you run JS code:
//
// 1️⃣ Parsing → Converts JS to AST (Abstract Syntax Tree)
// 2️⃣ Bytecode generation → Interpreter-friendly format
// 3️⃣ Interpretation → Runs code line-by-line
// 4️⃣ Profiling → Detects hot functions/loops
// 5️⃣ Optimization → Converts hot code to machine code
// 6️⃣ Execution → Runs optimized machine code
// 7️⃣ De-optimization → If assumptions break
//


/*========================================================================================
 5. V8 ENGINE JIT PIPELINE (CHROME & NODE.JS)
========================================================================================*/
//
// V8 uses TWO main components:
//
// 1️⃣ IGNITION → Interpreter
// 2️⃣ TURBOFAN → Optimizing Compiler
//
// PIPELINE FLOW:
// --------------
// JS Code
//   ↓
// Parser → AST
//   ↓
// Ignition → Bytecode → Executes code
//   ↓
// Profiler → Detects hot functions
//   ↓
// TurboFan → Converts hot code to MACHINE CODE
//   ↓
// Optimized Machine Code Execution
//


/*========================================================================================
 6. WHAT IS "HOT CODE"?
========================================================================================*/
//
// "Hot code" = Code that runs many times
// --------------------------------------
// Usually:
// ✅ Loops
// ✅ Repeated function calls
// ✅ Critical performance paths
//
// Example:
//
function sum(a, b) {
  return a + b;
}

for (let i = 0; i < 1_000_000; i++) {
  sum(i, i + 1); // ✅ becomes HOT → optimized by JIT
}


/*========================================================================================
 7. WHAT KIND OF OPTIMIZATIONS JIT DOES
========================================================================================*/
//
// JIT performs MANY optimizations such as:
//
// ✅ Inline functions
// ✅ Remove dead code
// ✅ Loop unrolling
// ✅ Constant folding
// ✅ Type specialization
// ✅ Inline caching
// ✅ Hidden class optimization
//

/*----------------------------------------------------------------------------------------
 7.1 INLINE FUNCTION OPTIMIZATION
----------------------------------------------------------------------------------------*/

function add(a, b) {
  return a + b;
}

function calc(x) {
  return add(x, 10); // ✅ add() may get inlined
}


/*========================================================================================
 8. HIDDEN CLASSES (OBJECT SHAPE OPTIMIZATION)
========================================================================================*/
//
// JS objects are dynamic:
// -----------------------
// const obj = {};
// obj.a = 1;
// obj.b = 2;
//
// JIT creates an INTERNAL "HIDDEN CLASS" for object shapes.
//
// If objects are created with SAME property order:
// -------------------------------------------------
// ✅ They share the same hidden class → FAST access
//
// If properties are added randomly:
// ----------------------------------
// ❌ New hidden classes created → SLOW
//

function FastObj() {
  this.x = 10;
  this.y = 20;
}

function SlowObj() {
  this.y = 20;
  this.x = 10;
}
// ❌ Different insertion order → more hidden classes


/*========================================================================================
 9. INLINE CACHING (VERY IMPORTANT FOR INTERVIEWS)
========================================================================================*/
//
// Inline Caching speeds up property access.
//
// Instead of re-looking up this.x every time:
// -------------------------------------------
// ✅ Engine remembers where property lives
// ✅ Next access becomes DIRECT memory access
//

function Point(x, y) {
  this.x = x;
  this.y = y;
}

const p1 = new Point(1, 2);
const p2 = new Point(3, 4);

console.log(p1.x);
console.log(p2.x); // ✅ uses INLINE CACHE


/*========================================================================================
 10. TYPE SPECIALIZATION (Dynamic but Optimized)
========================================================================================*/
//
// JS is dynamically typed, but JIT assumes types:
//
// If this always runs with numbers:
//
function multiply(a, b) {
  return a * b;
}

multiply(2, 3);
multiply(4, 5); // ✅ Optimized for NUMBER × NUMBER

// But if suddenly:
multiply("2", 5); 
// ❌ JIT assumptions break → DE-OPTIMIZATION happens


/*========================================================================================
 11. DE-OPTIMIZATION (VERY IMPORTANT)
========================================================================================*/
//
// If JIT makes wrong assumptions:
// --------------------------------
// ❌ It discards optimized machine code
// ❌ Falls back to interpreter
// ❌ Re-optimizes with new assumptions
//
// Causes of Deopt:
// ----------------
// ✅ Type changes
// ✅ Shape changes in objects
// ✅ Using arguments object
// ✅ Try/catch in hot paths
// ✅ Using eval
//

/*--- Deopt Example ---*/

function deoptExample(x) {
  return x + 1;
}

deoptExample(10);  // optimized as number
deoptExample("A"); // ❌ de-optimization triggered


/*========================================================================================
 12. WHAT BREAKS JIT OPTIMIZATION (PERFORMANCE KILLERS)
========================================================================================*/
//
// ❌ Using eval()
// ❌ Using with()
// ❌ Changing object shapes frequently
// ❌ Deleting properties dynamically
// ❌ Mixing data types in hot loops
// ❌ Using try/catch in tight loops
// ❌ Using arguments object heavily
// ❌ Polymorphic functions with many types
//

/*========================================================================================
 13. JIT & GARBAGE COLLECTION
========================================================================================*/
//
// JIT works WITH garbage collector:
//
// ✅ Optimized code still tracked by GC
// ✅ GC may pause execution briefly
// ✅ Optimized memory layouts improve GC
//

/*========================================================================================
 14. JIT IN DIFFERENT JS ENGINES
========================================================================================*/
//
// V8 (Chrome, Node.js):
// --------------------
// Ignition + TurboFan
//
// SpiderMonkey (Firefox):
// -----------------------
// Interpreter + Baseline JIT + IonMonkey
//
// JavaScriptCore (Safari):
// ------------------------
// LLInt + Baseline JIT + DFG JIT + FTL JIT
//


/*========================================================================================
 15. DOES JIT COMPILE ENTIRE PROGRAM?
========================================================================================*/
//
// ❌ NO
// ✅ Only HOT code is compiled to machine code
// ✅ Cold code stays interpreted
//
// This saves:
// -----------
// ✅ Memory
// ✅ Startup time
//


/*========================================================================================
 16. REAL-WORLD BENEFITS OF JIT
========================================================================================*/
//
// ✅ High-performance web apps
// ✅ Fast Node.js servers
// ✅ Games in browser
// ✅ Data visualization
// ✅ AI & ML in JS
// ✅ Video editing in browser
// ✅ WebAssembly integration
//


/*========================================================================================
 17. INTERVIEW QUESTIONS & TRAPS
========================================================================================*/
//
// Q1: Is JavaScript interpreted or compiled?
// ✅ Both — uses JIT
//
// Q2: What is hot code?
// ✅ Frequently executed code optimized by JIT
//
// Q3: What is de-optimization?
// ✅ When optimized code is discarded due to wrong assumptions
//
// Q4: Does JIT run before execution?
// ❌ No, it runs during execution
//
// Q5: What optimizations does JIT use?
// ✅ Inline caching, hidden classes, type specialization, etc.
//

/*========================================================================================
 18. ONE-PAGE FINAL SUMMARY
========================================================================================*/
//
// ✅ JavaScript uses JIT compilation
// ✅ Code is first interpreted
// ✅ Hot code is compiled into machine code
// ✅ JIT does runtime optimizations
// ✅ De-optimization happens when assumptions break
// ✅ Hidden classes & inline caching are key optimizations
// ✅ Misusing dynamic features can kill performance
//
// If you understand JIT well ✅
// → You understand JS PERFORMANCE INTERNALLY at ENGINE LEVEL 🔥

