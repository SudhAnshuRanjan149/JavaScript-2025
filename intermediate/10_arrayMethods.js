/*
  ALL IMPORTANT ARRAY METHODS IN JAVASCRIPT — DETAILED EXPLANATION
  ----------------------------------------------------------------
  Rules:
    ✔ All explanations inside code comments
    ✔ No normal text outside code
*/



/* ============================================================
   1. forEach() — iterate over array (no return)
   ============================================================ */

const arr1 = [1, 2, 3];

arr1.forEach(function (item, index) {
  /*
    forEach:
      - loops through each element
      - DOES NOT return a new array
      - used for side effects (logging, DOM ops)
  */
  console.log("forEach:", index, item);
});



/* ============================================================
   2. map() — transform array (returns NEW array)
   ============================================================ */

const arr2 = [1, 2, 3];

const doubled = arr2.map(function (num) {
  /*
    map:
      - transforms each element
      - must RETURN a value
      - returns a NEW array (original not mutated)
  */
  return num * 2;
});

console.log("map:", doubled);



/* ============================================================
   3. filter() — filter array (returns NEW array)
   ============================================================ */

const arr3 = [1, 2, 3, 4, 5];

const evens = arr3.filter(n => {
  /*
    filter:
      - keeps elements where callback returns TRUE
      - returns NEW filtered array
  */
  return n % 2 === 0;
});

console.log("filter:", evens);



/* ============================================================
   4. reduce() — reduce array to a single value
   ============================================================ */

const arr4 = [1, 2, 3, 4];

const sum = arr4.reduce(function (acc, curr) {
  /*
    reduce:
      - accumulator pattern
      - returns ONE value (number/string/object)
      - good for:
          ✔ sums
          ✔ averages
          ✔ counting
          ✔ grouping
          ✔ flattening arrays
  */
  return acc + curr;
}, 0);

console.log("reduce sum:", sum);



/* ============================================================
   5. find() — returns FIRST matching element
   ============================================================ */

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

const foundUser = users.find(u => u.id === 2);
/*
  find:
    - returns FIRST element that matches
    - returns undefined if not found
*/
console.log("find:", foundUser);



/* ============================================================
   6. findIndex() — returns index of first match
   ============================================================ */

const idx = users.findIndex(u => u.name === "Bob");
/*
  findIndex:
    - returns index or -1
*/
console.log("findIndex:", idx);



/* ============================================================
   7. some() — checks if ANY element matches (boolean)
   ============================================================ */

const arr5 = [10, 20, 30];

const hasAbove25 = arr5.some(n => n > 25);
/*
  some:
    - returns TRUE if at least ONE element matches
*/
console.log("some:", hasAbove25);



/* ============================================================
   8. every() — checks if ALL elements match (boolean)
   ============================================================ */

const allAbove5 = arr5.every(n => n > 5);
/*
  every:
    - returns TRUE if ALL elements satisfy condition
*/
console.log("every:", allAbove5);



/* ============================================================
   9. sort() — sort array IN PLACE (mutates original)
   ============================================================ */

const arr6 = [10, 5, 7, 30];

arr6.sort((a, b) => a - b);
/*
  sort:
    - MUTATES original array
    - for numbers: MUST provide compare function
*/
console.log("sort:", arr6);

const words = ["banana", "apple", "cherry"];
words.sort(); // alphabetical
console.log("sort strings:", words);



/* ============================================================
   10. reverse() — reverse array (mutates)
   ============================================================ */

const arr7 = [1, 2, 3];
arr7.reverse();
/*
  reverse:
    - MUTATES original
*/
console.log("reverse:", arr7);



/* ============================================================
   11. includes() — check if value exists
   ============================================================ */

const arr8 = ["a", "b", "c"];

console.log("includes:", arr8.includes("b")); // true



/* ============================================================
   12. indexOf() — find index of element
   ============================================================ */

console.log("indexOf:", arr8.indexOf("b")); // 1



/* ============================================================
   13. flat() — flatten nested arrays
   ============================================================ */

const nested = [1, [2, [3, [4]]]];

console.log("flat depth 1:", nested.flat());
console.log("flat depth Infinity:", nested.flat(Infinity));



/* ============================================================
   14. flatMap() — map + flat (one level)
   ============================================================ */

const arr9 = [1, 2, 3];

const mappedFlat = arr9.flatMap(n => [n, n * 2]);
/*
  flatMap:
    - applies map then flat(1)
*/
console.log("flatMap:", mappedFlat);



/* ============================================================
   15. concat() — merge arrays (returns NEW)
   ============================================================ */

const a = [1, 2];
const b = [3, 4];

console.log("concat:", a.concat(b));



/* ============================================================
   16. slice() — get portion of array (non-mutating)
   ============================================================ */

const arr10 = [10, 20, 30, 40];

console.log("slice:", arr10.slice(1, 3));
/*
  slice(start, end):
    - returns NEW array
    - end not included
*/



/* ============================================================
   17. splice() — add/remove items (mutates)
   ============================================================ */

const arr11 = [1, 2, 3, 4];

arr11.splice(1, 2);
/*
  splice(start, deleteCount):
    - removes items
    - MUTATES array
*/
console.log("splice remove:", arr11);

const arr12 = [1, 2, 3];

arr12.splice(1, 0, "inserted");
/*
  splice to insert:
    - second param = 0
*/
console.log("splice insert:", arr12);



/* ============================================================
   18. push() — add to end (mutates)
   ============================================================ */

const arr13 = [1, 2];
arr13.push(3);
/*
  push:
    - returns new length
*/
console.log("push:", arr13);



/* ============================================================
   19. pop() — remove last (mutates)
   ============================================================ */

arr13.pop();
console.log("pop:", arr13);



/* ============================================================
   20. unshift() — add to start (mutates)
   ============================================================ */

const arr14 = [2, 3];
arr14.unshift(1);
console.log("unshift:", arr14);



/* ============================================================
   21. shift() — remove from start (mutates)
   ============================================================ */

arr14.shift();
console.log("shift:", arr14);



/* ============================================================
   22. join() — convert array → string
   ============================================================ */

const arr15 = ["a", "b", "c"];
console.log("join default:", arr15.join());
console.log("join custom:", arr15.join("-"));



/* ============================================================
   23. from() — create array from iterable
   ============================================================ */

console.log("Array.from:", Array.from("ABC"));



/* ============================================================
   24. isArray() — check if something is array
   ============================================================ */

console.log("isArray:", Array.isArray([1, 2, 3]));



/* ============================================================
   25. keys(), values(), entries() — iterators
   ============================================================ */

const arr16 = ["x", "y", "z"];

console.log("keys:");
for (let k of arr16.keys()) console.log(k);

console.log("values:");
for (let v of arr16.values()) console.log(v);

console.log("entries:");
for (let [i, val] of arr16.entries()) console.log(i, val);



/* ============================================================
   SUMMARY TABLE
   ============================================================ */
/*
  Iteration:
    - forEach()

  Transform:
    - map()
    - flatMap()

  Filter / Search:
    - filter()
    - find()
    - findIndex()
    - some()
    - every()
    - includes()
    - indexOf()

  Reduce:
    - reduce()
    - reduceRight()

  Mutating:
    - sort()
    - reverse()
    - splice()
    - push()
    - pop()
    - shift()
    - unshift()

  Non-mutating:
    - map()
    - filter()
    - slice()
    - concat()
    - flat()

  Conversion:
    - join()
    - Array.from()
    - isArray()

  Iterators:
    - keys()
    - values()
    - entries()
*/




/*
  ADDITIONAL (LESS COMMON / MISSING) ARRAY METHODS IN JAVASCRIPT
  --------------------------------------------------------------
  These methods were not covered earlier:
    ✔ toString()
    ✔ toLocaleString()
    ✔ fill()
    ✔ copyWithin()
    ✔ with() (ES2023)
    ✔ at()
    ✔ of()
    ✔ reduceRight()
    ✔ every(), some(), entries(), keys(), values() already explained
*/



/* ============================================================
   1. toString() — convert array → string
   ============================================================ */

const arr17 = [1, 2, 3];

console.log(arr17.toString());
/*
  toString():
    - joins items with commas
    - similar to join(",")
    - returns string
*/



/* ============================================================
   2. toLocaleString() — localized string conversion
   ============================================================ */

const arr18 = [1000, new Date("2024-01-01")];

console.log(arr18.toLocaleString());
/*
  toLocaleString():
    - returns string formatted using user's locale settings
    - numbers, dates are formatted locally
*/



/* ============================================================
   3. fill() — fill array with a value (mutates)
   ============================================================ */

const arr19 = [1, 2, 3, 4];

arr19.fill(0);
/*
  fill(value, start?, end?):
    - replaces all elements with given value
    - mutates original array
*/

console.log("fill:", arr19);

const arr20 = [1, 2, 3, 4, 5];
arr20.fill(9, 1, 4);
console.log("fill partial:", arr20);



/* ============================================================
   4. copyWithin() — copy a chunk INSIDE the same array (mutates)
   ============================================================ */

const arr21 = [10, 20, 30, 40, 50];

arr21.copyWithin(2, 0, 2);
/*
  copyWithin(targetIndex, start, end):
    - copies [start, end) → to targetIndex
    - mutates original array
*/

console.log("copyWithin:", arr21);



/* ============================================================
   5. with() — immutable element replacement (NEW, ES2023)
   ============================================================ */

const arr22 = ["a", "b", "c"];

const newArr22 = arr22.with(1, "X");
/*
  with(index, newValue):
    - returns NEW array with updated value
    - DOES NOT mutate original
*/

console.log("with() original:", arr22);
console.log("with() new:", newArr22);



/* ============================================================
   6. at() — access array using positive/negative index
   ============================================================ */

const arr23 = [100, 200, 300, 400];

console.log(arr23.at(0));   // 100
console.log(arr23.at(-1));  // 400 (last element)
console.log(arr23.at(-2));  // 300

/*
  at(index):
    - supports negative indexes
    - safer alternative to arr[arr.length-1]
*/



/* ============================================================
   7. Array.of() — create array from arguments
   ============================================================ */

const arr24 = Array.of(10);
console.log("Array.of:", arr24);

/*
  Array.of():
    - creates array with given values
    - fixes ambiguity of Array(10) which creates empty array of length 10
*/



/* ============================================================
   8. reduceRight() — reduce from RIGHT → LEFT
   ============================================================ */

const arr25 = ["a", "b", "c"];

const resultRight = arr25.reduceRight((acc, curr) => acc + curr, "");
/*
  reduceRight:
    - similar to reduce()
    - but iterates from RIGHT to LEFT
*/

console.log("reduceRight:", resultRight);



/* ============================================================
   9. Array.isArray() — check if value is array
   (Already covered but included for completeness)
   ============================================================ */

console.log("isArray:", Array.isArray([1, 2, 3]));
console.log("isArray (object):", Array.isArray({}));



/* ============================================================
   10. flatMap() — map + flatten (covered earlier)
   11. flat() — flatten nested arrays (covered earlier)
   ============================================================ */



/* ============================================================
   SUMMARY OF ALL EXTRA METHODS
   ============================================================ */
/*
  ✔ toString()         → array → string
  ✔ toLocaleString()   → localized string conversion
  ✔ fill()             → fill array with value (mutates)
  ✔ copyWithin()       → copy part of array inside itself
  ✔ with()             → immutable replacement (NEW)
  ✔ at()               → negative index access
  ✔ Array.of()         → create array from values
  ✔ reduceRight()      → reduce from right side

  Already covered elsewhere:
    - forEach, map, filter, reduce
    - find, findIndex
    - some, every
    - sort, reverse
    - includes, indexOf
    - slice, splice, concat
    - push, pop, shift, unshift
    - flat, flatMap
    - entries, keys, values
*/
