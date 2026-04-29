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
