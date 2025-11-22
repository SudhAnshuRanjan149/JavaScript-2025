/* 
  JS CLOSURE EXPLANATION
  -----------------------
  A closure happens when an inner function "remembers" variables 
  from its outer function even after the outer function has finished executing.
*/

/* 
  BASIC EXAMPLE
*/
function outer() {
  /* outerVariable is created inside outer() */
  let outerVariable = 10;

  /* 
    The inner function uses outerVariable.
    This inner function forms a *closure* over outerVariable.
  */
  function inner() {
    /* inner still has access to outerVariable */
    console.log(outerVariable);
  }

  /* returning inner allows it to live even after outer() is done */
  return inner;
}

const fn = outer();   /* outer() finishes but its variables live via closure */
fn();                 /* logs 10 */


/*
  PRACTICAL USE: PRIVATE VARIABLES
*/
function counter() {
  /* count is private and only accessible via returned functions */
  let count = 0;

  return {
    increment() {
      count++;
      console.log(count);
    },
    decrement() {
      count--;
      console.log(count);
    }
  };
}

const c = counter();
c.increment();  // 1
c.increment();  // 2
c.decrement();  // 1


/*
  CLOSURE TRAP & FIX USING let
  ----------------------------
  var does not have block scope → causes unexpected behavior in loops.
*/

for (var i = 1; i <= 3; i++) {
  setTimeout(() => {
    /* all callbacks print 4 because i ends at 4 before they run */
    console.log("var loop:", i);
  }, 100);
}

/*
  FIX → use let which creates a new binding each iteration.
*/
for (let j = 1; j <= 3; j++) {
  setTimeout(() => {
    /* each callback remembers its own j value through closure */
    console.log("let loop:", j);
  }, 100);
}


/*
  ADVANCED: FUNCTION FACTORY
  Each call creates a new closure environment.
*/
function multiplier(m) {
  return function (n) {
    /* inner function remembers 'm' */
    return m * n;
  };
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
