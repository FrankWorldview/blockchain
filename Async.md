# Asynchronous Operations in JavaScript

## What are Asynchronous Operations?
Asynchronous operations are tasks that start now but finish later, without blocking the rest of the program.

Start first, finish later — and don’t wait.

Synchronous: wait → then continue
Asynchronous: continue → result comes later

---

## What is a Promise in JavaScript?
A Promise represents a future value — the result of an asynchronous operation that will arrive later.

---

## States of a Promise
A Promise can be in one of three states:
- `Pending`: The operation is still ongoing
- `Fulfilled`: The operation completed successfully
- `Rejected`: The operation failed

---

## Creating a Promise
```javascript
// Create a Promise object
let myPromise = new Promise((resolve, reject) => {

  // Simulate an asynchronous task (e.g., API call)
  setTimeout(() => {

    const success = true; // change to false to simulate failure

    if (success) {
      // ✅ Task succeeded → resolve the Promise with a value
      resolve("Operation succeeded!");
    } else {
      // ❌ Task failed → reject the Promise with an error
      reject("Operation failed!");
    }

  }, 3000); // wait 3 seconds
});
```

---

## Consuming a Promise
```javascript
myPromise
  .then(result => {
    // Runs if Promise is fulfilled (resolve)
    console.log(result);
  })
  .catch(error => {
    // Runs if Promise is rejected
    console.log(error);
  });
```

---

## Promise Chaining
```javascript
const shouldSucceed = true;

// Function that returns a Promise
function fetchData() {
    return new Promise((resolve, reject) => {

        // Simulate async operation
        setTimeout(() => {

            if (shouldSucceed) {
                // ✅ Resolve with data
                resolve("Fetched data");
            } else {
                // ❌ Reject with error
                reject("Error: Failed to fetch data");
            }

        }, 3000);
    });
}

// Normal (synchronous) function
function processFetchedData(data) {
    return `${data} - Processed`;
}

// Chain multiple steps
fetchData()
    .then(fetchedData => {
        // Step 1: handle fetched data
        console.log(fetchedData);

        // Return value → passed to next .then()
        return processFetchedData(fetchedData);
    })
    .then(processedData => {
        // Step 2: receive processed data
        console.log(processedData);
    })
    .catch(error => {
        // If ANY step fails → jump here
        console.error("Error:", error);
    });
```

Important:
If any step throws an error, the chain jumps directly to `.catch()`.

---

## Why async and await?
Promise chains can become hard to read when there are many `.then()` calls.

async/await is a cleaner way to write Promise chains.

---

## Key Rule
An `async` function ALWAYS returns a Promise.

---

## Example Using async and await
```javascript
const shouldSucceed = true;

// Same Promise-based function
function fetchData() {
    return new Promise((resolve, reject) => {

        setTimeout(() => {

            if (shouldSucceed) {
                resolve("Fetched data");
            } else {
                reject("Error: Failed to fetch data");
            }

        }, 3000);
    });
}

// Synchronous processing function
function processFetchedData(data) {
    return `${data} - Processed`;
}

// async function → ALWAYS returns a Promise
async function fetchDataAndProcess() {

    try {
        // ⏳ Wait for Promise to resolve
        const fetchedData = await fetchData();
        console.log(fetchedData);

        // Continue like normal synchronous code
        const processedData = processFetchedData(fetchedData);
        console.log(processedData);

    } catch (error) {
        // Handle error (same as .catch())
        console.error("Error:", error);
    }
}

// Run the async function
fetchDataAndProcess();
```

---

## Summary
Promise = future value
async/await = nicer syntax for Promise

Promises help manage asynchronous operations clearly.
async/await makes the code easier to read and maintain.
