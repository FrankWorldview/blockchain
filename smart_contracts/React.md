`useState` and `useEffect` are two of the most commonly used hooks in React, enabling you to add state and manage side effects in functional components. Here’s a quick breakdown of each:

# useState
+ Purpose: useState allows you to create and manage state within functional components.
+ Usage: You use useState to store data that may change over time and needs to trigger re-renders when updated. Examples include form inputs, toggles, counters, or any dynamic content.

Syntax:
```javascript
const [state, setState] = useState(initialValue);
```
+ state: The current state value.
+ setState: A function to update the state value.

Example:
```javascript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}

export default Counter;
```

In this example, count is the state variable managed by useState, and setCount updates it. Every time setCount is called, React re-renders the component with the updated count.

# useEffect
+ Purpose: useEffect is used to handle side effects in functional components, which are tasks that need to happen outside of rendering (such as fetching data from an API, subscribing to events (like WebSocket or keyboard listeners), setting a timer, manipulating DOM elements, or interacting with local storage).
+ Usage: useEffect takes a function that runs "after" each render. You can control when the effect runs by providing dependencies in an array as the second argument.
  - No dependencies ([]): Runs only once on component mount.
  - With dependencies: Runs whenever specified dependencies change.
  - No array: Runs on every render.

Syntax:
```javascript
useEffect(() => {
  // Your code here (e.g., data fetching, setting up subscriptions)

  return () => {
    // Optional cleanup code (e.g., unsubscribing, clearing timers)
  };
}, [dependencies]);
```

Example 1:
```javascript
import { useEffect, useState } from 'react';

function FetchDataOnMount() {
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log("Fetching data on component mount...");
    fetch("https://api.thecatapi.com/v1/images/search") // An API to get random cat images
      .then(response => response.json())
      .then(data => setData(data));

    // No dependencies: this effect runs only once when the component mounts
  }, []); 

  return (
    <div>
      <p>Data: {data ? JSON.stringify(data) : "Loading..."}</p>
    </div>
  );
}

export default FetchDataOnMount;
```
In this example:
+ useEffect fetches data from an API only once when the component mounts.
+ Since the dependency array is empty ([]), this effect will not run again, even if the component re-renders.

Example 2:
```javascript
import { useState, useEffect } from 'react';

function UpdateMessageOnCountChange() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("Initial message");

  useEffect(() => {
    console.log(`Count changed to ${count}`);
    setMessage(`Msg: Count is now ${count}`);
    console.log(message); // Show the old message!
  }, [count]); // Effect depends on `count`

  return (
    <div>
      <p>{message}</p>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
    </div>
  );
}

export default UpdateMessageOnCountChange;
```
In this example:
+ useEffect has count as a dependency. This means the effect will run whenever count changes.
+ When the "Increase Count" button is clicked, count is updated, which triggers useEffect to run again, updating the message state.

The actual lifecycle flow:
1. User clicks -> setCount(...)
2. React re-renders with new count
3. useEffect runs after paint (count changed)
4. Inside useEffect: setMessage(...) is called
5. React re-renders again with new message

# Key Differences Between useState and useEffect
+ Purpose: useState is for managing local state, while useEffect is for handling side effects.
+ Re-renders: useState triggers a re-render when the state changes, whereas useEffect does not cause re-renders by itself but runs after each render if dependencies have changed.
+ Together, useState and useEffect enable powerful, flexible control over data and actions in functional components, making them fundamental for managing state and lifecycle effects in React.

# Note
In React’s [Strict Mode](https://react.dev/reference/react/StrictMode), certain functions—particularly lifecycle methods and those associated with hooks like useState and useEffect—are intentionally invoked twice to help identify potential issues within your application. This double invocation serves as a stress test and is designed not to break your code. Instead, it enhances the reliability and predictability of your components by encouraging developers to write code that can handle multiple executions without unexpected side effects.
