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
let myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve("Operation succeeded!");
    } else {
      reject("Operation failed!");
    }
  }, 3000);
});
```

---

## Consuming a Promise
```javascript
myPromise
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.log(error);
  });
```

---

## Promise Chaining
```javascript
const shouldSucceed = true;

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

function processFetchedData(data) {
    return `${data} - Processed`;
}

fetchData()
    .then(fetchedData => {
        console.log(fetchedData);
        return processFetchedData(fetchedData);
    })
    .then(processedData => {
        console.log(processedData);
    })
    .catch(error => {
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

function processFetchedData(data) {
    return `${data} - Processed`;
}

async function fetchDataAndProcess() {
    try {
        const fetchedData = await fetchData();
        console.log(fetchedData);

        const processedData = processFetchedData(fetchedData);
        console.log(processedData);
    } catch (error) {
        console.error("Error:", error);
    }
}

fetchDataAndProcess();
```

---

## Summary
Promise = future value  
async/await = nicer syntax for Promise

Promises help manage asynchronous operations clearly.  
async/await makes the code easier to read and maintain.



















# Asynchronous Operations in JavaScript

## What are Asynchronous Operations?
Asynchronous operations are tasks that start now but finish later, without blocking the rest of the program. They allow a program to continue running other tasks while waiting for results (e.g., network requests or blockchain calls).

Start first, finish later — and don’t wait.

Asynchronous = non-blocking execution.

## What is a Promise in JavaScript?
A Promise in JavaScript is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value. Promises are a way to handle asynchronous operations more effectively than traditional callback functions, providing a clearer and more manageable approach.

## States of a Promise
A Promise can be in one of three states:
+ `Pending`: The initial state, meaning the operation is still ongoing.
+ `Fulfilled`: The operation completed successfully, resulting in a resolved value.
+ `Rejected`: The operation failed, resulting in a reason for the failure (an error).

## Creating a Promise
You can create a Promise using the Promise constructor:
```javascript
let myPromise = new Promise((resolve, reject) => {
  // Simulate an asynchronous operation (like fetching data)
  setTimeout(() => {
    const success = true; // Change to false to see rejection behavior
    if (success) {
      resolve("Operation succeeded!"); // Resolved
    } else {
      reject("Operation failed!"); // Rejected
    }
  }, 3000);
});
```

## Consuming a Promise
You can handle the outcome of a Promise using .then() for success and .catch() for error handling:
```javascript
myPromise
  .then(result => {
    console.log(result); // success is true: Log "Operation succeeded!" after 3 seconds
  })
  .catch(error => {
    console.log(error); // success is false: Log "Operation failed!" after 3 seconds
  });
```

## Chaining Promises
Promises can be chained to perform multiple asynchronous operations in sequence:
```javascript
// Simulate success or failure by toggling this variable
const shouldSucceed = true;

function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldSucceed) {
                resolve("Fetched data"); // Resolve the Promise
            } else {
                reject("Error: Failed to fetch data"); // Reject the Promise
            }
        }, 3000);
    });
}

function processFetchedData(data) {
    return `${data} - Processed`; // Simulate processing of fetched data
}

// Chaining "4" Promises.
fetchData()
    .then(fetchedData => {
        console.log(fetchedData); // Log "Fetched data" after 3 seconds
        return processFetchedData(fetchedData); // Pass data to the next step
    })
    .then(processedData => {
        console.log(processedData); // Log "Fetched data - Processed"
    })
    .catch(error => {
        console.error("Error:", error); // Handle any error in the chain
    });
```

The final .catch() applies to all preceding .then() calls in the chain. It’s a good way to handle any errors that might arise at any point in the chain without needing to place multiple .catch() statements after each .then().

## Why Do We Need async and await?
While Promises greatly improved handling asynchronous code, using them often resulted in chaining multiple .then() calls, which could become unwieldy and harder to read. This is where async and await come into play.

## Advantages of async and await
+ Simplicity and Readability: async and await allow you to write asynchronous code that looks and behaves like synchronous code, improving readability.
+ Error Handling: You can use try...catch blocks with async functions to handle errors more gracefully, as opposed to chaining .catch() calls.

## Example Using async and await
Here's how you can use async and await with Promises:
```javascript
// Simulate success or failure by toggling this variable.
const shouldSucceed = true;

function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldSucceed) {
                resolve("Fetched data"); // Resolve the Promise
            } else {
                reject("Error: Failed to fetch data"); // Reject the Promise
            }
        }, 3000);
    });
}

function processFetchedData(data) {
    return `${data} - Processed`; // Simulate processing of fetched data
}

async function fetchDataAndProcess() {
    try {
        const fetchedData = await fetchData(); // Wait for fetchData to resolve or reject
        console.log(fetchedData); // Log "Fetched data"

        const processedData = processFetchedData(fetchedData);
        console.log(processedData); // Log "Fetched data - Processed"
    } catch (error) {
        console.error("Error:", error); // Handle any error in the try block
    }
}

// Run the async function
fetchDataAndProcess();
```

## Summary
Promises are objects that represent the outcome of asynchronous operations, providing a way to handle results or errors without deep nesting of callbacks.

async and await are syntactic sugar for working with Promises, making asynchronous code easier to read and write. They allow for cleaner error handling and a more synchronous-like flow in asynchronous programming.

This makes it easier to manage complex asynchronous workflows, improving code maintainability and readability.

