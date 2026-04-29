# Asynchronous Operations in JavaScript

## What are Asynchronous Operations?
Asynchronous operations are tasks that start now but finish later, without blocking the rest of the program.

Start first, finish later — and don’t wait.

Synchronous: wait → then continue
Asynchronous: continue → result comes later

---

## What is a Promise in JavaScript?
A Promise is an object that represents a future value — the result of an asynchronous operation that will arrive later.

A Promise does NOT contain the value immediately.

---

## States of a Promise
A Promise can be in one of three states:

- `Pending`: still running
- `Fulfilled`: succeeded
- `Rejected`: failed

---

## Creating a Promise
```javascript
// Create a Promise object
let myPromise = new Promise((resolve, reject) => {

  // Simulate async task (e.g., API call)
  setTimeout(() => {

    const success = true; // change to false to test failure

    if (success) {
      // ✅ Task succeeded → resolve with value
      resolve("Operation succeeded!");
    } else {
      // ❌ Task failed → reject with error
      reject("Operation failed!");
    }

  }, 3000); // delay 3 seconds
});
```

---

## Consuming a Promise
```javascript
myPromise
  .then(result => {
    // Runs when Promise is fulfilled
    console.log(result); // "Operation succeeded!"
  })
  .catch(error => {
    // Runs when Promise is rejected
    console.log(error); // "Operation failed!"
  });
```

---

## Promise Chaining
```javascript
// Function that returns a Promise (async task)
function fetchData() {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            // Simulate success
            resolve("Fetched data");
        }, 3000);

    });
}

// Normal (synchronous) function
function processFetchedData(data) {
    // Process data and return result
    return `${data} - Processed`;
}

// Chain multiple steps
fetchData()
    .then(data => {
        // Step 1: receive resolved value
        console.log(data);

        // Return value → passed to next .then()
        return processFetchedData(data);
    })
    .then(result => {
        // Step 2: receive processed result
        console.log(result);
    })
    .catch(error => {
        // If ANY step fails → jump here
        console.error(error);
    });
```

👉 Rule:
If ANY step fails → jump directly to `.catch()`

---

## Why async and await?
`.then()` chains can become hard to read.

`async/await` is cleaner syntax for working with Promises.

---

## Key Rule
An `async` function ALWAYS returns a Promise.

---

## Important Example
```javascript
async function hello() {
    // Even though we return a normal value,
    // JavaScript automatically wraps it in a Promise
    return "Hello";
}

// Using .then() to access the result
hello().then(result => {
    console.log(result); // "Hello"
});
```

👉 This is equivalent to:
```javascript
function hello() {
    return Promise.resolve("Hello");
}
```

---

## Example Using async / await
```javascript
// Function that returns a Promise
function fetchData() {
    return new Promise((resolve) => {

        setTimeout(() => {
            resolve("Fetched data");
        }, 3000);

    });
}

// Normal function
function processFetchedData(data) {
    return `${data} - Processed`;
}

// async function → always returns a Promise
async function fetchDataAndProcess() {

    try {
        // ⏳ Wait until Promise resolves
        const data = await fetchData();

        // Now we can use it like synchronous code
        console.log(data);

        const result = processFetchedData(data);
        console.log(result);

    } catch (error) {
        // Handles ANY error (like .catch())
        console.error(error);
    }
}

// Execute the async function
fetchDataAndProcess();
```

---

## Summary

Promise = object representing a future value

States:
- Pending
- Fulfilled
- Rejected

`.then()` → handle success
`.catch()` → handle error

`async` always returns a Promise

`await` pauses execution until Promise resolves

async/await = cleaner syntax for Promises
