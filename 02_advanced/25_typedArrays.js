/****************************************************************************************
 * TYPED ARRAYS IN JAVASCRIPT — COMPLETE & DETAILED EXPLANATION (BEGINNER → ADVANCED)
 ****************************************************************************************/


/*========================================================================================
 1. WHAT ARE TYPED ARRAYS?
========================================================================================*/
//
// Typed Arrays are **special array-like objects** used to work with **raw binary data**.
// They allow you to store numbers in a **fixed-size, fixed-type, memory-efficient format**.
//
// Normal JS arrays:
// -----------------
// • Can store mixed types (number, string, object, etc.)
// • Dynamically sized
// • Slower for heavy numeric operations
//
// Typed Arrays:
// -------------
// ✅ Store only ONE specific numeric type
// ✅ Fixed size
// ✅ Very fast
// ✅ Memory efficient
// ✅ Used for binary data, WebGL, audio, video, networking, files, WASM
//
// Typed Arrays do NOT store data directly.
// They are **views** over a memory buffer called an **ArrayBuffer**.
//
// CORE IDEA:
// ----------
// ArrayBuffer → Raw memory
// TypedArray  → View on that memory


/*========================================================================================
 2. ARRAYBUFFER — THE RAW MEMORY BLOCK
========================================================================================*/
//
// ArrayBuffer represents a fixed-length chunk of binary memory.
// You cannot read/write to it directly — you must use a TypedArray or DataView.
//
const buffer = new ArrayBuffer(16); // 16 bytes of raw memory

// At this point, buffer contains 16 bytes of EMPTY memory.
// You cannot do: buffer[0] ❌


// ArrayBuffer Properties:
// ------------------------
// • buffer.byteLength → size in bytes
console.log(buffer.byteLength); // 16


/*========================================================================================
 3. ALL TYPES OF TYPED ARRAYS (VERY IMPORTANT LIST)
========================================================================================*/
//
// SIGNED INTEGER TYPES:
// ---------------------
// Int8Array     → 1 byte   → range:  -128 to 127
// Int16Array    → 2 bytes  → range:  -32,768 to 32,767
// Int32Array    → 4 bytes  → range:  -2^31 to (2^31 - 1)
//
// UNSIGNED INTEGER TYPES:
// ------------------------
// Uint8Array    → 1 byte   → range:  0 to 255
// Uint16Array   → 2 bytes  → range:  0 to 65,535
// Uint32Array   → 4 bytes  → range:  0 to 2^32 - 1
//
// SPECIAL UNSIGNED:
// ------------------
// Uint8ClampedArray → 1 byte → range: 0 to 255 (clamps overflow)
//
// FLOATING POINT TYPES:
// ----------------------
// Float32Array  → 4 bytes → single precision float
// Float64Array  → 8 bytes → double precision float (like JS Number)
//
// BIGINT TYPES (Advanced):
// -------------------------
// BigInt64Array
// BigUint64Array


/*========================================================================================
 4. CREATING A TYPED ARRAY
========================================================================================*/

// METHOD 1: From length (allocates memory)
const intArr = new Int32Array(5); // 5 elements × 4 bytes = 20 bytes

// METHOD 2: From normal array
const floatArr = new Float32Array([1.5, 2.3, 9.8]);

// METHOD 3: From ArrayBuffer
const buf = new ArrayBuffer(8);
const view = new Int16Array(buf); // 8 bytes / 2 bytes = 4 elements

// METHOD 4: From another TypedArray
const copy = new Uint8Array(floatArr.buffer);


/*========================================================================================
 5. READING & WRITING VALUES
========================================================================================*/

const arr = new Int8Array(4);

// Writing values
arr[0] = 10;
arr[1] = -5;
arr[2] = 127;
arr[3] = 50;

// Reading values
console.log(arr[0]); // 10
console.log(arr);    // Int8Array(4) [10, -5, 127, 50]

// Overflow behavior (IMPORTANT):
arr[3] = 130;        // Int8 overflow
console.log(arr[3]); // -126 (wraps due to 8-bit signed range)


/*========================================================================================
 6. UINT8CLAMPEDARRAY (SPECIAL BEHAVIOR)
========================================================================================*/
//
// Unlike other typed arrays, Uint8ClampedArray CLAMPS values:
//  - Below 0  → becomes 0
//  - Above 255 → becomes 255
//
const clamped = new Uint8ClampedArray(3);
clamped[0] = 300;  // becomes 255
clamped[1] = -20;  // becomes 0
clamped[2] = 150;  // stays 150

console.log(clamped); // [255, 0, 150]

// Used heavily in:
// ----------------
// • Image processing
// • Canvas pixel manipulation


/*========================================================================================
 7. BYTE LENGTH & BYTES PER ELEMENT
========================================================================================*/

const x = new Int32Array(10);

console.log(x.length);          // 10 elements
console.log(x.byteLength);      // 40 bytes
console.log(x.BYTES_PER_ELEMENT); // 4 bytes per element


/*========================================================================================
 8. SUBARRAY & SHARED MEMORY
========================================================================================*/
//
// subarray() creates a view on the SAME memory, not a copy.
//
const main = new Int16Array([10, 20, 30, 40]);
const part = main.subarray(1, 3); // [20, 30]

part[0] = 999;

console.log(main); // [10, 999, 30, 40] → MEMORY IS SHARED


/*========================================================================================
 9. CONVERTING BETWEEN TYPED ARRAY & NORMAL ARRAY
========================================================================================*/

// TypedArray → Normal Array
const normal = Array.from(new Int16Array([5, 6, 7]));

// Normal Array → TypedArray
const typed = new Uint16Array([100, 200, 300]);


/*========================================================================================
 10. DATA VIEW (LOW-LEVEL BYTE CONTROL)
========================================================================================*/
//
// DataView lets you read/write different types at specific byte offsets.
//
const buffer2 = new ArrayBuffer(16);
const dataView = new DataView(buffer2);

// Write values
dataView.setInt8(0, 127);
dataView.setFloat32(4, 3.14);

// Read values
console.log(dataView.getInt8(0));     // 127
console.log(dataView.getFloat32(4));  // 3.14


/*========================================================================================
 11. TYPED ARRAYS VS NORMAL ARRAYS
========================================================================================*/
//
// FEATURE                  | TYPED ARRAY         | NORMAL ARRAY
// --------------------------|---------------------|---------------------------
// Type Safety              | Fixed numeric type  | Any data type
// Size                     | Fixed               | Dynamic
// Performance              | Very fast           | Slower for numeric work
// Memory Usage             | Low & predictable   | High & unpredictable
// Mixed Data?              | ❌ No               | ✅ Yes
// Overflow Handling        | Wrap/Clamp          | No overflow
// Binary Data Handling     | ✅ Yes              | ❌ Poor


/*========================================================================================
 12. REAL-WORLD USE CASES
========================================================================================*/
//
// ✅ WebGL & 3D graphics
// ✅ Audio processing
// ✅ Video decoding
// ✅ Image manipulation
// ✅ Network protocols
// ✅ File buffers
// ✅ Cryptography
// ✅ Machine learning
// ✅ WebAssembly memory sharing


/*========================================================================================
 13. WHEN SHOULD YOU USE TYPED ARRAYS?
========================================================================================*/
//
// Use Typed Arrays when:
// ----------------------
// ✔ You are working with large numeric datasets
// ✔ You need predictable memory layout
// ✔ You are handling binary data
// ✔ You need high performance
// ✔ You are using WebGL, Canvas, WASM, or Media APIs
//
// Do NOT use when:
// ----------------
// ❌ You need dynamic sizing
// ❌ You need mixed data types
// ❌ You don’t care about memory efficiency


/*========================================================================================
 14. COMMON INTERVIEW QUESTIONS ON TYPED ARRAYS
========================================================================================*/
//
// Q1: Do TypedArrays store data directly?
// ✅ No, they use ArrayBuffer as memory source
//
// Q2: Are TypedArrays resizable?
// ❌ No, fixed length
//
// Q3: Difference between Uint8Array and Uint8ClampedArray?
// ✅ Uint8 wraps overflow, Clamped clamps overflow
//
// Q4: Are TypedArrays faster than normal arrays?
// ✅ Yes, for numeric and binary operations
//
// Q5: Can different TypedArrays share same memory?
// ✅ Yes, via same ArrayBuffer


/*========================================================================================
 15. FINAL SUMMARY
========================================================================================*/
//
// ✅ Typed Arrays = High-performance numeric arrays
// ✅ Backed by ArrayBuffer
// ✅ Fixed type + fixed size
// ✅ Used for binary data & performance-critical code
// ✅ Shareable memory via subarray()
// ✅ Works great with WebGL, WASM, Media APIs
//
// Core Relationship:
// ------------------
// ArrayBuffer → TypedArray → DataView

