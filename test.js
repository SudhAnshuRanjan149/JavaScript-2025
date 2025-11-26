const obj = {
  value: 42,
  method: function() {
    (() => {
      // arrow function captures `this` lexically (from method)
      console.log("Value with arrow + closure:", this.value);
    })()
  }
};

obj.method();