```
function run() {
  console.log("1"); // sync

  setTimeout(() => console.log("2"), 0); // async (macrotask)
  
  Promise.resolve().then(() => console.log("3")); // async (microtask)

  console.log("4"); // sync
}

run();
```

What will be the output?
