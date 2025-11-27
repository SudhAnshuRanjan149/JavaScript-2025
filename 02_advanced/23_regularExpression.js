/*
  REGULAR EXPRESSIONS (RegExp) IN JAVASCRIPT — GREAT DETAIL
  ---------------------------------------------------------
  ✔ Regular Expressions = patterns used to match/search/replace text.
  ✔ Used for:
      - validation (email, password, phone)
      - searching text
      - replacing text
      - parsing strings
      - extracting data (IDs, hashtags, etc.)

  In JavaScript, RegExp is a built-in object.

  TWO WAYS TO CREATE REGEX:
    1) Literal syntax:   /pattern/flags
    2) Constructor:      new RegExp("pattern", "flags")
*/



/* ============================================================
   1. BASIC CREATION & FLAGS
   ============================================================ */

// Literal:
const re1 = /abc/;

// Constructor (be careful with escaping backslashes):
const re2 = new RegExp("abc"); // equivalent to /abc/

/*
  FLAGS:
    g  → global (find all matches, not just first)
    i  → ignore case
    m  → multiline (^ and $ work per line)
    s  → dotAll (dot . matches newline too)
    u  → unicode (treat pattern as Unicode)
    y  → sticky (match from lastIndex only)

  Example:
*/

const regex = /hello/gi; // global + ignore case



/* ============================================================
   2. MAIN STRING + REGEX METHODS
   ============================================================
*/

/*
  1) regex.test(string) → boolean (does it match at least once?)
*/

const rTest = /cat/;
console.log(rTest.test("concatenate")); // true

/*
  2) regex.exec(string) → returns match info or null
     - returns an array: [fullMatch, group1, group2, ...]
     - with .index, .input properties
*/

const rExec = /(\d{2})-(\d{2})-(\d{4})/;
const resultExec = rExec.exec("Today is 10-12-2025.");
console.log(resultExec); 
// [ '10-12-2025', '10', '12', '2025', index: 9, input: 'Today is 10-12-2025.' ]

/*
  3) string.match(regex)
     - with NO g flag → acts like exec (single match + groups)
     - with g flag    → returns array of all matches (no groups)
*/

const text = "cat, catalog, scatter";
console.log(text.match(/cat/g)); // [ 'cat', 'cat' ]

/*
  4) string.matchAll(regex)
     - returns iterator of ALL matches + groups (must use g flag)
*/

const matches = text.matchAll(/(cat)/g);
for (const m of matches) {
  console.log("matchAll:", m[0], "at index", m.index);
}

/*
  5) string.replace(regex, replacement)
     - replace occurrences with replacement string
     - replacement can use special tokens: $1, $2, ..., $& (full match)
*/

const replaced = "2025-12-10".replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1");
console.log("replaced:", replaced); // 10/12/2025

/*
  6) string.split(regex)
     - split string based on pattern
*/

console.log("one,two;three four".split(/[,\s;]/)); 
// ['one', 'two', 'three', 'four']

/*
  7) string.search(regex)
     - returns index of first match or -1
*/

console.log("hello world".search(/world/)); // 6



/* ============================================================
   3. BASIC REGEX SYNTAX
   ============================================================
*/

/*
  3.1 LITERAL CHARACTERS
    - Most characters match themselves
*/

const reLiteral = /hello/;
console.log(reLiteral.test("say hello!")); // true

/*
  3.2 METACHARACTERS (special meaning)
    .  ^  $  *  +  ?  (  )  [  ]  {  }  |  \

  To match them literally, ESCAPE with backslash:
*/

console.log(/\./.test("a.b")); // true (matches the dot)
console.log(/\$/.test("$100")); // true (matches literal $)



/* ============================================================
   4. CHARACTER CLASSES
   ============================================================
*/

/*
  [...]  → match ANY ONE of the characters inside
*/

console.log(/[abc]/.test("apple")); // true ( 'a' matches )
console.log(/[abc]/.test("dog"));   // false

/*
  RANGES:
    [a-z]   lowercase letters
    [A-Z]   uppercase
    [0-9]   digits
    [a-zA-Z0-9]  alphanumeric
*/

console.log(/[0-9]/.test("Age: 20")); // true

/*
  NEGATED CHARACTER CLASS:
    [^...] → match any character NOT in the set
*/

console.log(/[^0-9]/.test("123"));   // false (all digits)
console.log(/[^0-9]/.test("12a3"));  // true  ( 'a' is not digit)



/* ============================================================
   5. PREDEFINED CHARACTER CLASSES (SHORTCUTS)
   ============================================================
*/

/*
  \d  → digit (0-9)
  \D  → non-digit
  \w  → word char [A-Za-z0-9_]
  \W  → non-word char
  \s  → whitespace (space, tab, newline)
  \S  → non-whitespace
*/

console.log(/\d+/.test("abc123")); // true
console.log(/\s/.test("hello world")); // true (space present)



/* ============================================================
   6. QUANTIFIERS
   ============================================================
*/

/*
  *   → 0 or more times
  +   → 1 or more times
  ?   → 0 or 1 time (optional)
  {n}    → exactly n times
  {n,}   → at least n times
  {n,m}  → between n and m times
*/

console.log(/a*/.test("bb"));   // true (0 'a' is allowed)
console.log(/a+/.test("bb"));   // false (must have at least 1 'a')
console.log(/ab?c/.test("ac")); // true (b is optional)
console.log(/\d{3}/.test("12"));     // false
console.log(/\d{3}/.test("1234"));   // true (at least 3 in a row somewhere)
console.log(/^\d{3}$/.test("123"));  // true (exactly 3 digits whole string)



/* ============================================================
   7. ANCHORS (START/END OF STRING OR LINE)
   ============================================================
*/

/*
  ^  → start of string (or line if m flag)
  $  → end of string (or line if m flag)

  Example: validate 3-digit string only
*/

console.log(/^\d{3}$/.test("123"));   // true
console.log(/^\d{3}$/.test("1234"));  // false

/*
  Example: lines starting with # using multiline flag
*/

const multi = `#title
content line
#another`;

console.log(multi.match(/^#.+/gm)); // [ '#title', '#another' ]



/* ============================================================
   8. GROUPS & CAPTURE GROUPS
   ============================================================
*/

/*
  ( ... )   → Capturing group
  (?: ... ) → Non-capturing group

  Capturing groups:
    - allow extraction of parts of match
    - used in replace: $1, $2, etc.
*/

const dateStr = "Today is 10-12-2025";
const dateRegex = /(\d{2})-(\d{2})-(\d{4})/;
const m = dateRegex.exec(dateStr);
console.log(m[0]); // full match "10-12-2025"
console.log(m[1]); // "10"
console.log(m[2]); // "12"
console.log(m[3]); // "2025"

/*
  Non-capturing group (?:...):
    - groups for quantifiers or alternation
    - but does NOT capture as a separate group
*/

const nonCap = /(?:foo|bar){2}/;
console.log(nonCap.test("foobar")); // true



/* ============================================================
   9. ALTERNATION (OR)
   ============================================================
*/

/*
  pattern1|pattern2 → match either pattern1 OR pattern2
*/

console.log(/cat|dog/.test("I love cats")); // true
console.log(/cat|dog/.test("I love birds")); // false

/*
  Use grouping to control scope:
    - foo|barbaz vs (foo|bar)baz
*/

console.log(/foo|barbaz/.test("barbaz"));      // true (matches 'barbaz')
console.log(/(foo|bar)baz/.test("barbaz"));    // true (group bar + 'baz')



/* ============================================================
   10. BACKREFERENCES
   ============================================================
*/

/*
  \1, \2, ... refer to earlier capture groups.

  Example: find repeated word like "hello hello"
*/

const repeatRegex = /\b(\w+)\s+\1\b/;
console.log(repeatRegex.test("hello hello")); // true
console.log(repeatRegex.test("hello world")); // false



/* ============================================================
   11. LOOKAHEAD & LOOKBEHIND (ADVANCED)
   ============================================================
   NOTE: Lookbehind is supported in modern JS engines (not older browsers).

   Lookahead:
      - (?=...)    → positive lookahead (must be followed by...)
      - (?!...)    → negative lookahead (must NOT be followed by...)

   Lookbehind:
      - (?<=...)   → positive lookbehind (must be preceded by...)
      - (?<!...)   → negative lookbehind (must NOT be preceded by...)
*/

/*
  Example: numbers followed by 'px' (positive lookahead)
*/

console.log(/\d+(?=px)/.exec("width: 100px;")[0]); // "100"

/*
  Example: word NOT followed by 'px' (negative lookahead)
*/

console.log(/width(?!:)/.test("width: 100px"));  // false
console.log(/width(?!:)/.test("width 100px"));   // true

/*
  Example: positive lookbehind (modern engines)
    match number preceded by $
*/

const price = "$100 and €200";
console.log(price.match(/(?<=\$)\d+/g)); // ["100"]



/* ============================================================
   12. DOT (.) & DOTALL FLAG
   ============================================================
*/

/*
  .  → matches any character EXCEPT newline by default.
  s  → dotAll flag, then . matches newline too.
*/

console.log(/h.llo/.test("hello"));  // true
console.log(/h.llo/.test("h\nllo")); // false by default

console.log(/h.llo/s.test("h\nllo")); // true with dotAll flag



/* ============================================================
   13. ESCAPING & USING RegExp CONSTRUCTOR
   ============================================================
*/

/*
  When using new RegExp(), you must escape backslash TWICE
  because string literals also use backslash as escape.

  Example: to create /\d+/:
*/

const reLiteral2 = /\d+/;
const reConstructor = new RegExp("\\d+"); // double backslash

console.log(reLiteral2.test("123"));     // true
console.log(reConstructor.test("123"));  // true



/* ============================================================
   14. COMMON REAL-WORLD PATTERNS (HIGH LEVEL)
   ============================================================
*/

/*
  1) Email (simplified):
*/

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
console.log(emailRegex.test("test@example.com")); // true

/*
  2) URL (very simplified):
*/

const urlRegex = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;
console.log(urlRegex.test("https://google.com")); // true

/*
  3) Only digits:
*/

const digitsRegex = /^\d+$/;
console.log(digitsRegex.test("12345")); // true
console.log(digitsRegex.test("123a"));  // false

/*
  4) Trim multiple spaces to single:
*/

const multiSpace = "A   B    C";
console.log(multiSpace.replace(/\s+/g, " ")); // "A B C"

/*
  5) Extract words:
*/

const words = "Hello, World! 123".match(/\b\w+\b/g);
console.log(words); // [ 'Hello', 'World', '123' ]



/* ============================================================
   15. GLOBAL FLAG g, LASTINDEX, AND LOOPING
   ============================================================
*/

/*
  With /g flag:
    - regex.exec() will use regex.lastIndex to remember where to continue.
*/

const rG = /\d+/g;
const strG = "a1b22c333";

let mG;
while ((mG = rG.exec(strG)) !== null) {
  console.log("match:", mG[0], "at index", mG.index);
}

/*
  Output:
    match: 1 at index 1
    match: 22 at index 3
    match: 333 at index 6
*/



/* ============================================================
   16. STICKY FLAG y (ADVANCED)
   ============================================================
*/

/*
  y flag:
    - similar to g but match MUST start at regex.lastIndex
*/

const ry = /\d+/y;
const sy = "1a2b3";

ry.lastIndex = 0;
console.log(ry.exec(sy)); // "1" at index 0

ry.lastIndex = 1;
console.log(ry.exec(sy)); // null, because at index 1 is 'a' not digit



/* ============================================================
   17. PERFORMANCE TIPS & PITFALLS
   ============================================================
*/

/*
  ✔ Avoid catastrophic backtracking patterns like:
      /(a+)+$/  on long 'aaaa....b' — can be very slow.

  ✔ Use specific quantifiers instead of overly greedy wildcards:
      BAD:   /.*foo/
      BETTER: /[^]*foo/ with 's' or more precise patterns.

  ✔ Beware of global regex + .test in loops:
*/

const reg = /foo/g;
console.log(reg.test("foo")); // true
console.log(reg.test("foo")); // false (because lastIndex moved past match)

/*
  Reset lastIndex or remove g if not needed.
*/



/* ============================================================
   18. SUMMARY (CHEAT SHEET)
   ============================================================
*/
/*
  ✔ RegExp creation:
      - /pattern/flags
      - new RegExp("pattern", "flags")

  ✔ Common flags:
      g, i, m, s, u, y

  ✔ Important syntax:
      - .       → any char (except newline)
      - ^, $    → start/end
      - \d, \w, \s  and their uppercase negations
      - [], [^] → character classes & negation
      - *, +, ?, {n,m} → quantifiers
      - ()      → groups, (?:) non-capturing
      - |       → OR
      - \1, \2  → backreferences
      - (?=...), (?!...), (?<=...), (?<!...) → lookarounds

  ✔ Key methods:
      - regex.test(str)
      - regex.exec(str)
      - str.match(regex)
      - str.matchAll(regex)
      - str.replace(regex, replacement)
      - str.search(regex)
      - str.split(regex)

  MENTAL MODEL:
    → Regular expressions are like a mini-language for describing patterns in text.
    → You mix:
        - character sets
        - quantifiers
        - anchors
        - groups
      to express "what kind of text you want to match".
*/
