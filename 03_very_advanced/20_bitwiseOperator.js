/****************************************************************************************
 * BITWISE OPERATORS IN JAVASCRIPT — COMPLETE DETAILED NOTES (BEGINNER → ADVANCED)
 *
 * Covers:
 * ✔ Why bitwise operators exist
 * ✔ Binary representation in JS
 * ✔ Signed 32-bit integers (VERY IMPORTANT)
 * ✔ Bitwise Operators:
 *      & (AND)
 *      | (OR)
 *      ^ (XOR)
 *      ~ (NOT)
 *      << (Left Shift)
 *      >> (Signed Right Shift)
 *      >>> (Unsigned Right Shift)
 * ✔ Common bit tricks
 * ✔ Performance notes
 * ✔ Interview questions
 *
 ****************************************************************************************/


/****************************************************************************************
 * 1. WHY DO BITWISE OPERATORS EXIST?
 ****************************************************************************************/
//
// JS is a high-level language, but sometimes you need LOW-LEVEL manipulation:
// ---------------------------------------------------------------------------
// ✔ Graphics & game development
// ✔ Compression algorithms
// ✔ Cryptography
// ✔ Network protocols
// ✔ Permissions & flags
// ✔ Fast math operations
//
// Bitwise operators treat numbers as:
// ----------------------------------
// ✔ 32-bit signed integers (two's complement)
// ✔ Operate on binary bits directly
//


/****************************************************************************************
 * 2. HOW JAVASCRIPT STORES NUMBERS (IMPORTANT)
 ****************************************************************************************/
//
// JavaScript normally uses:
// --------------------------
// ✔ 64-bit floating point numbers (IEEE-754)
//
// BUT bitwise operators convert them into:
// ----------------------------------------
// ✔ 32-bit signed integers internally
// ✔ Perform the operation
// ✔ Convert back to 64-bit number
//
// Example:
console.log(5 & 3);
/*
5  → 00000000000000000000000000000101
3  → 00000000000000000000000000000011
&    --------------------------------
     00000000000000000000000000000001  → 1
*/


/****************************************************************************************
 * 3. BITWISE AND (&)
 ****************************************************************************************/
//
// Rule:
// -----
// 1 & 1 = 1
// Otherwise = 0
//

/*
1010 (10)
1100 (12)
= 1000 (8)
*/

console.log(10 & 12); // 8


/****************************************************************************************
 * 4. BITWISE OR (|)
 ****************************************************************************************/
//
// Rule:
// -----
// 1 | 1 = 1
// 1 | 0 = 1
// 0 | 0 = 0
//

console.log(10 | 12); // 14


/****************************************************************************************
 * 5. BITWISE XOR (^)
 ****************************************************************************************/
//
// XOR = Exclusive OR
// --------------------
// 1 ^ 1 = 0
// 0 ^ 0 = 0
// 1 ^ 0 = 1   (different = 1)
//

console.log(10 ^ 12); // 6


/****************************************************************************************
 * 6. BITWISE NOT (~)
 ****************************************************************************************/
//
// ~x = -(x + 1)
// Because JS uses two’s complement
//

console.log(~5);  // -6
console.log(~0);  // -1


/****************************************************************************************
 * 7. LEFT SHIFT (<<)
 ****************************************************************************************/
//
// x << n  → shifts bits LEFT by n places
// Effect:
// -------
// ✔ Multiply by 2^n
//

console.log(5 << 1); // 10
console.log(5 << 2); // 20


/*========================================================================================
 8. SIGNED RIGHT SHIFT (>>)
========================================================================================*/
//
// x >> n  → shift RIGHT while preserving sign (MSB/pre-sign bit)
// Effect:
// -------
// ✔ Divide by 2^n (floor for positive)
// ✔ Negative numbers keep the sign bit
//

console.log(20 >> 1); // 10
console.log(-20 >> 1); // -10 (preserves sign)


/*========================================================================================
 9. UNSIGNED RIGHT SHIFT (>>>)
========================================================================================*/
//
// x >>> n → shift RIGHT, filling left side with 0
// -----------------------------------------------
// ✔ Always returns POSITIVE number
// ✔ Even for negative inputs
//

console.log(-5 >>> 1); // 2147483645  (massive positive number)


/****************************************************************************************
 * 10. OPERATOR SUMMARY TABLE (IMPORTANT)
 ****************************************************************************************/

/*
OPERATOR   MEANING                   EXAMPLE       USE
---------------------------------------------------------------------------
&          AND                        a & b        mask bits
|          OR                         a | b        set bits
^          XOR                        a ^ b        toggle bits
~          NOT                        ~a           invert bits
<<         Left shift                 a << n       multiply by 2^n
>>         Signed right shift         a >> n       divide by 2^n (preserve sign)
>>>        Unsigned right shift       a >>> n      force positive
*/


/****************************************************************************************
 * 11. BIT MASKS (VERY IMPORTANT)
 ****************************************************************************************/
//
// FLAGS stored as bits (super fast):
//
const READ = 1 << 0;   // 0001
const WRITE = 1 << 1;  // 0010
const EXEC = 1 << 2;   // 0100

let permissions = READ | WRITE; // add flags

// Check flag:
console.log((permissions & READ) > 0);  // true
console.log((permissions & EXEC) > 0);  // false

// Add permission:
permissions |= EXEC;

// Remove permission:
permissions &= ~WRITE;  // clear bit


/****************************************************************************************
 * 12. BITWISE TRICKS (INTERVIEW FAVORITES)
 ****************************************************************************************/


/*------------------------------
 1. Check if number is even
------------------------------*/

console.log((10 & 1) === 0); // even
console.log((11 & 1) === 1); // odd


/*------------------------------
 2. Swap values WITHOUT temp
------------------------------*/

let p = 5, q = 7;

p ^= q;
q ^= p;
p ^= q;

/*------------------------------
 3. Multiply / Divide by powers of 2
------------------------------*/

console.log(5 << 1);  // 10
console.log(20 >> 1); // 10


/*------------------------------
 4. Clear lowest set bit
------------------------------*/

let n = 12; // 1100
console.log(n & (n - 1)); // 1000 → 8


/*------------------------------
 5. Get lowest set bit
------------------------------*/

console.log(n & -n); // 4 (binary: 0100)


/****************************************************************************************
 * 13. BITWISE WITH BOOLEANS (Common trick)
 ****************************************************************************************/

// Convert boolean → number:
console.log(+true);  // 1
console.log(+false); // 0

// OR using bitwise:
console.log(true | 0); // 1


/****************************************************************************************
 * 14. PERFORMANCE NOTES
 ****************************************************************************************/
//
// ✔ Bitwise ops are extremely fast
// ✔ But JS converts numbers to 32-bit, which can cause:
//     • Overflow
//     • Loss of large integers
//
// BigInt CANNOT be used with bitwise operators ❌
// (They only work on 32-bit ints).
//


/****************************************************************************************
 * 15. COMMON INTERVIEW QUESTIONS
 ****************************************************************************************/
//
// Q1: Why does ~5 give -6?
// → Because ~x = -(x + 1)
//
// Q2: What's the difference between >> and >>> ?
// → >> keeps sign, >>> forces unsigned positive
//
// Q3: How to check if number is a power of 2?
// → (n & (n - 1)) === 0
//
// Q4: Why bitwise operations are fast?
// → Operate directly on binary CPU instructions
//
// Q5: Why JS uses 32-bit for bitwise ops?
// → Faster + predictable bitwise behavior
//


/****************************************************************************************
 * 16. FINAL MASTER SUMMARY
 ****************************************************************************************/
//
// ✔ JS converts numbers → 32-bit signed ints for bitwise ops
// ✔ Operators:
//    & (AND) → mask bits
//    | (OR) → set bits
//    ^ (XOR) → toggle bits
//    ~ (NOT) → invert bits (-(x+1))
//    << → multiply by 2^n
//    >> → divide by 2^n (keeps sign)
//    >>> → unsigned right shift (zero-fill)
//
// ✔ Useful for:
//    • CPU optimizations
//    • Flags & permissions
//    • Math tricks
//    • Compression
//    • Graphics
//    • Cryptography
//
