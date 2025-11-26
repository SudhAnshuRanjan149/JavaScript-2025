/*
  SYMBOL, ITERATORS & GENERATORS IN JAVASCRIPT — DETAILED EXPLANATION
  -------------------------------------------------------------------
  ✔ These are advanced ES6+ features.
  ✔ They power behind-the-scenes behaviors like iteration (for..of),
    custom objects, private-like properties, async workflows, etc.
*/



/* =====================================================================
   1. SYMBOL IN JAVASCRIPT
   =====================================================================
   ✔ Symbol is a primitive type.
   ✔ Every symbol is UNIQUE.
   ✔ Used for:
        - avoiding property name collisions
        - creating hidden object properties
        - customizing built-in behaviors (iterator, toStringTag, etc.)
*/



/* ------------------------------------------------------------
   A) Creating Symbols
   ------------------------------------------------------------ */

const s1 = Symbol();
const s2 = Symbol("desc");

console.log(s1 === s2); // false (always unique)



/* ------------------------------------------------------------
   B) Using Symbol as object keys
   ------------------------------------------------------------ */

const user = {
  name: "Alice"
};

const secretKey = Symbol("id");
user[secretKey] = 101;

console.log(user.name);        // Alice
console.log(user[secretKey]);  // 101
console.log(Object.keys(user)); // ["name"] (symbol hidden)
console.log(user);             // symbol is not enumerable



/* ------------------------------------------------------------
   C) Global Symbols (Symbol.for)
   ------------------------------------------------------------ */

const a = Symbol.for("shared");
const b = Symbol.for("shared");

console.log(a === b); // true (same global registry symbol)



/* ------------------------------------------------------------
   D) Well-Known Symbols (VERY IMPORTANT)
   ------------------------------------------------------------
   JS uses special built-in symbols to customize behavior:
      Symbol.iterator
      Symbol.toStringTag
      Symbol.toPrimitive
      Symbol.hasInstance
      etc.
*/



/* =====================================================================
   2. ITERATORS IN JAVASCRIPT
   =====================================================================
   ✔ Iterator is an object with a .next() method
        → returns { value, done }
   ✔ Used by for...of, spread [...], Array.from(), etc.
*/



/* ------------------------------------------------------------
   A) Manual Iterator Example
   ------------------------------------------------------------ */

const myIterator = {
  current: 1,
  end: 5,

  next() {
    if (this.current <= this.end) {
      return { value: this.current++, done: false };
    }
    return { done: true };
  }
};

console.log(myIterator.next());
console.log(myIterator.next());
console.log(myIterator.next());



/* ------------------------------------------------------------
   B) Making an object iterable using Symbol.iterator
   ------------------------------------------------------------ */

const range = {
  start: 1,
  end: 4,

  [Symbol.iterator]() {
    let current = this.start;
    let end = this.end;

    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        }
        return { done: true };
      }
    };
  }
};

for (const num of range) {
  console.log(num); // 1,2,3,4
}



/* ------------------------------------------------------------
   WHY THIS WORKS?
   ------------------------------------------------------------
   for…of checks:
        object[Symbol.iterator] → must return iterator
*/



/* =====================================================================
   3. GENERATORS IN JAVASCRIPT
   =====================================================================
   ✔ Special functions that can pause & resume.
   ✔ Declared using:
          function* name() {}
   ✔ yield keyword produces values one at a time.
   ✔ Automatically create iterators.
*/



/* ------------------------------------------------------------
   A) Simple Generator Example
   ------------------------------------------------------------ */

function* genNumbers() {
  yield 10;
  yield 20;
  yield 30;
}

const gen = genNumbers();

console.log(gen.next()); // {value:10, done:false}
console.log(gen.next()); // {value:20, done:false}
console.log(gen.next()); // {value:30, done:false}
console.log(gen.next()); // {value:undefined, done:true}



/* ------------------------------------------------------------
   B) Generators are iterable
   ------------------------------------------------------------ */

for (const n of genNumbers()) {
  console.log(n); // 10, 20, 30
}



/* ------------------------------------------------------------
   C) Infinite Sequences with Generators
   ------------------------------------------------------------ */

function* infiniteCounter() {
  let i = 1;
  while (true) {
    yield i++;
  }
}

const counter = infiniteCounter();

console.log(counter.next().value);
console.log(counter.next().value);
// can go forever...



/* ------------------------------------------------------------
   D) Passing values back INTO the generator
   ------------------------------------------------------------ */

function* adder() {
  const x = yield "First number?";
  const y = yield "Second number?";
  yield x + y;
}

const it = adder();

console.log(it.next());        // asks first number
console.log(it.next(10));      // pass 10
console.log(it.next(20));      // pass 20 → yields 30



/* ------------------------------------------------------------
   E) Using Generators to replace Callback Hell
   ------------------------------------------------------------ */

function* steps() {
  console.log("Start");
  yield;
  console.log("Middle");
  yield;
  console.log("End");
}

const s = steps();
s.next(); // Start
s.next(); // Middle
s.next(); // End



/* =====================================================================
   SYMBOL + GENERATOR + ITERATOR COMBO
   ===================================================================== */

const myObject = {
  items: ["a", "b", "c"],

  *[Symbol.iterator]() {
    for (const item of this.items) {
      yield item;
    }
  }
};

for (const i of myObject) {
  console.log(i); // a, b, c
}



/* =====================================================================
   SUMMARY
   ===================================================================== */
/*
  SYMBOL:
    ✔ Unique primitive values
    ✔ Used for hidden properties
    ✔ Used for customizing built-in behaviors (Symbol.iterator, etc.)

  ITERATORS:
    ✔ Objects with next() → {value, done}
    ✔ Power for...of, spread, Array.from
    ✔ Implemented manually or via Symbol.iterator

  GENERATORS:
    ✔ function* + yield
    ✔ Create iterators automatically
    ✔ Pausable, resumable functions
    ✔ Useful for async flows, infinite sequences, custom iteration

  MENTAL MODEL:
    → Symbol is a unique key.
    → Iterator is a "remote control" to get values one-by-one.
    → Generator is a "smart iterator" that can pause & resume work.
*/
