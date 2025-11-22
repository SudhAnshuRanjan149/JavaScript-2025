/*
  LOOPS IN JAVASCRIPT — for, while, do-while, for...of, for...in (DETAILED)
  ------------------------------------------------------------------------
  Loops repeat a block of code multiple times.
  JS provides several loop types for different use-cases.
*/



/* ============================================================
   1. FOR LOOP
   ============================================================
   - Most commonly used loop.
   - Syntax: for(initialization; condition; increment)
*/

for (let i = 1; i <= 5; i++) {
  console.log("For loop iteration:", i);
}

/*
  Flow:
    Step 1 → initialize (let i = 1)
    Step 2 → check condition (i <= 5)
    Step 3 → execute block
    Step 4 → increment (i++)
    Step 5 → repeat until condition false
*/



/* ============================================================
   2. WHILE LOOP
   ============================================================
   - Runs as long as the condition is TRUE.
   - Use when you don't know how many repetitions needed.
*/

let count = 1;

while (count <= 5) {
  console.log("While iteration:", count);
  count++;
}

/*
  Be careful to update the counter, otherwise infinite loop.
*/



/* ============================================================
   3. DO-WHILE LOOP
   ============================================================
   - Similar to while loop, but ALWAYS runs at least once.
*/

let j = 1;

do {
  console.log("Do-While iteration:", j);
  j++;
} while (j <= 5);

/*
  Key difference:
    while → checks condition first
    do-while → executes first, checks condition after
*/



/* ============================================================
   4. for...of LOOP
   ============================================================
   - Used for iterating over ITERABLES like:
        * arrays
        * strings
        * maps
        * sets
   - Returns VALUES
*/

const arr = [10, 20, 30];

for (const value of arr) {
  console.log("for...of value:", value);
}

const str = "JS";

for (const char of str) {
  console.log("Character:", char);
}

/*
  for...of is best for arrays & strings.
*/



/* ============================================================
   5. for...in LOOP
   ============================================================
   - Used for OBJECTS (keys).
   - Returns KEYS, not values.
*/

const user = {
  name: "Alice",
  age: 25,
  city: "NY"
};

for (const key in user) {
  console.log("Key:", key, "Value:", user[key]);
}

/*
  for...in is best for objects, NOT recommended for arrays.
*/



/* ============================================================
   6. for...in on ARRAY (NOT RECOMMENDED)
   ============================================================
*/

const nums = [5, 10, 15];

for (const index in nums) {
  console.log("Index:", index, "Value:", nums[index]);
}

/*
  Why not recommended?
    - for...in iterates keys, not values
    - includes inherited properties
    - order is not guaranteed
*/



/* ============================================================
   7. BREAK & CONTINUE
   ============================================================
*/

for (let n = 1; n <= 5; n++) {
  if (n === 3) break;        // exit loop completely
  console.log("Break example:", n);
}

for (let n = 1; n <= 5; n++) {
  if (n === 3) continue;     // skip this iteration
  console.log("Continue example:", n);
}



/* ============================================================
   8. LOOP SUMMARY
   ============================================================

   for:
     - best for known number of iterations

   while:
     - best when condition controls loop (unknown count)

   do-while:
     - best when loop must run at least once

   for...of:
     - best for arrays, strings, iterable structures

   for...in:
     - best for objects (keys)
*/



/* ============================================================
   9. REAL-LIFE PRACTICAL EXAMPLE
   ============================================================
*/

const products = [
  { name: "Phone", price: 500 },
  { name: "Laptop", price: 1200 },
  { name: "Keyboard", price: 40 }
];

for (const item of products) {
  console.log(`Product: ${item.name}, Price: $${item.price}`);
}
