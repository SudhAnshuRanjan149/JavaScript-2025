/*
  DESTRUCTURING IN JAVASCRIPT — DETAILED EXPLANATION
  --------------------------------------------------
  ✔ Destructuring allows you to unpack values from:
        - arrays
        - objects
        - nested structures
        - function parameters
  ✔ Makes code cleaner and reduces repetition.
*/



/* ============================================================
   1. ARRAY DESTRUCTURING
   ============================================================ */

const arr = [10, 20, 30];

const [a, b, c] = arr;
/*
  Meaning:
    a = 10
    b = 20
    c = 30
*/

console.log(a, b, c);



/* ============================================================
   2. SKIPPING VALUES
   ============================================================ */

const [x, , z] = [1, 2, 3];
console.log(x, z);  // 1, 3



/* ============================================================
   3. DEFAULT VALUES
   ============================================================ */

const [p1 = 99, q = 77] = [50];
console.log(p1, q); // 50, 77



/* ============================================================
   4. SWAPPING VARIABLES USING DESTRUCTURING
   ============================================================ */

let n1 = 5, n2 = 10;

[n1, n2] = [n2, n1];

console.log("swapped:", n1, n2); // 10, 5



/* ============================================================
   5. REST OPERATOR IN ARRAY DESTRUCTURING
   ============================================================ */

const [first1, ...others] = [1, 2, 3, 4];

console.log(first1, others);
/*
  others = [2,3,4]
*/



/* ============================================================
   6. NESTED ARRAY DESTRUCTURING
   ============================================================ */

const nestedArr = [1, [2, 3], 4];

const [m, [n, o], p] = nestedArr;
console.log(m, n, o, p);



/* ============================================================
   7. OBJECT DESTRUCTURING
   ============================================================ */

const obj = {
  name: "Alice",
  age: 25,
  city: "London"
};

const { name, age, city } = obj;
/*
  names must match keys (unless renaming)
*/

console.log(name, age, city);



/* ============================================================
   8. RENAMING VARIABLES DURING DESTRUCTURING
   ============================================================ */

const { name: fullName, age: years } = obj;
console.log(fullName, years);
/*
  fullName <- obj.name
  years    <- obj.age
*/



/* ============================================================
   9. DEFAULT VALUES IN OBJECT DESTRUCTURING
   ============================================================ */

const { country = "UK" } = obj;

console.log(country); // UK



/* ============================================================
   10. REST OPERATOR IN OBJECT DESTRUCTURING
   ============================================================ */

const { name: nm, ...restProps } = obj;

console.log(nm);        // "Alice"
console.log(restProps); // {age:25, city:"London"}



/* ============================================================
   11. NESTED OBJECT DESTRUCTURING
   ============================================================ */

const person = {
  id: 1,
  info: {
    first: "John",
    last: "Doe",
    address: {
      city: "Paris",
      pin: 44000
    }
  }
};

const {
  info: {
    first,
    address: { city: cty }
  }
} = person;

console.log(first, cty);



/* ============================================================
   12. FUNCTION PARAMETER DESTRUCTURING
   ============================================================ */

function printUser({ name, age }) {
  /*
    We receive an object and directly extract values.
  */
  console.log("User:", name, age);
}

printUser({ name: "Emma", age: 30 });



/* ============================================================
   13. DEFAULTS IN FUNCTION PARAMETER DESTRUCTURING
   ============================================================ */

function setConfig({ host = "localhost", port = 8080 }) {
  console.log(host, port);
}

setConfig({}); // localhost 8080



/* ============================================================
   14. ARRAY DESTRUCTURING IN FUNCTION PARAMETERS
   ============================================================ */

function sum([a, b, c]) {
  console.log(a + b + c);
}

sum([1, 2, 3]);



/* ============================================================
   15. PRACTICAL USE CASE — API RESPONSE
   ============================================================ */

const apiResponse = {
  status: 200,
  data: {
    user: {
      id: 55,
      name: "Carlos"
    }
  }
};

const {
  data: {
    user: { id, name: username }
  }
} = apiResponse;

console.log(id, username);



/* ============================================================
   16. PRACTICAL USE CASE — REACT PROPS
   ============================================================ */

/*
  const MyComponent = ({title, subtitle, onClick}) => {
      return <div onClick={onClick}>{title} - {subtitle}</div>;
  };
*/



/* ============================================================
   17. MIXED DESTRUCTURING (object + array)
   ============================================================ */

const mixed = {
  coords: [100, 200],
  meta: { active: true }
};

const {
  coords: [lat, long],
  meta: { active }
} = mixed;

console.log(lat, long, active);



/* ============================================================
   18. DESTRUCTURING WITH SPREAD (copying)
   ============================================================ */

const user = { name: "Sam", age: 20, role: "admin" };

const { role, ...userWithoutRole } = user;
console.log(userWithoutRole); // {name: 'Sam', age: 20}



/* ============================================================
   19. DESTRUCTURING WITH COMPUTED PROPERTY NAMES
   ============================================================ */

const dynamicKey = "score";

const student = {
  name: "Leo",
  score: 95
};

const { [dynamicKey]: marks } = student;
console.log(marks);



/* ============================================================
   20. SUMMARY
   ============================================================ */
/*
  ✔ Destructuring = unpacking values from arrays/objects.
  
  ARRAY DESTRUCTURING:
    - extract values by position
    - skip values
    - default values
    - swap variables
    - rest operator
    - nested destructuring

  OBJECT DESTRUCTURING:
    - extract values by key
    - renaming variables
    - default values
    - rest operator {...rest}
    - nested objects
    - function parameter destructuring

  WHY USE IT?
    - cleaner code
    - less repetition
    - easier to work with API data
    - avoids writing long chain: obj.a.b.c

  MENTAL MODEL:
    → Destructuring is like unpacking items from a box into variables.
*/
