```javascript
function run() {
  console.log("1"); // sync

  setTimeout(() => console.log("2"), 0); // async (macrotask)
  
  Promise.resolve().then(() => console.log("3")); // async (microtask)

  console.log("4"); // sync
}

run();
```

What will the output be?

1

4

3

2

Asynchronous lines are deferred, so they don’t block the synchronous ones — but how they're deferred (microtask vs. macrotask) affects when they run afterward.

Want a quick memory trick?

"Sync first, microtask next, macrotask last."
