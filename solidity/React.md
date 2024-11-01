`useState` and `useEffect` are two of the most commonly used hooks in React, enabling you to add state and manage side effects in functional components. Here’s a quick breakdown of each:

# useState
+ Purpose: useState allows you to create and manage state within functional components.
+ Usage: You use useState to store data that may change over time and needs to trigger re-renders when updated. Examples include form inputs, toggles, counters, or any dynamic content.

Syntax:
```
const [state, setState] = useState(initialValue);
```
+ state: The current state value.
+ setState: A function to update the state value.

Example:
```
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
```

In this example, count is the state variable managed by useState, and setCount updates it. Every time setCount is called, React re-renders the component with the updated count.

# useEffect
+ Purpose: useEffect is used to handle side effects in functional components, which are tasks that need to happen outside of rendering (such as data fetching, subscriptions, timers, or DOM manipulations).
+ Usage: useEffect takes a function that runs after each render. You can control when the effect runs by providing dependencies in an array as the second argument.
  - No dependencies ([]): Runs only once on component mount.
  - With dependencies: Runs whenever specified dependencies change.
  - No array: Runs on every render.

Syntax:
```
useEffect(() => {
  // Your code here (e.g., data fetching, setting up subscriptions)

  return () => {
    // Optional cleanup code (e.g., unsubscribing, clearing timers)
  };
}, [dependencies]);
```

Example:
```
    import React, { useState, useEffect } from 'react';

    function FetchDataComponent() {
      const [data, setData] = useState(null);

      useEffect(() => {
        fetch("https://api.example.com/data")
          .then(response => response.json())
          .then(data => setData(data));
      }, []); // Empty array means this effect runs only once

      return (
        <div>
          <p>Data: {data ? JSON.stringify(data) : "Loading..."}</p>
        </div>
      );
    }
```

In this example, useEffect fetches data from an API only once when the component mounts because the dependency array is empty ([]).

Key Differences Between useState and useEffect

    Purpose: useState is for managing local state, while useEffect is for handling side effects.
    Rerenders: useState triggers a re-render when the state changes, whereas useEffect does not cause re-renders by itself but runs after each render if dependencies have changed.

Together, useState and useEffect enable powerful, flexible control over data and actions in functional components, making them fundamental for managing state and lifecycle effects in React.

















The main difference between useState and useEffect in React lies in their purpose and functionality:

# Purpose
+ `useState`: Used to create and manage state within a functional component. It stores values that can change over time, and when you update these values, React re-renders the component to reflect the new state.
+ `useEffect`: Used to manage side effects in a component, which are operations that don't directly impact the rendered output but might involve asynchronous work, external interactions, or clean-up actions. Examples include fetching data, setting up subscriptions, updating the DOM, or managing timers.

# Usage
+ `useState`: Defines a state variable and a function to update it.
```
const [value, setValue] = useState(initialValue);
```

+ `useEffect`: Runs a function when the component mounts, updates, or unmounts. You can specify dependencies to control when the effect should re-run.
```
useEffect(() => {
  // Code that runs after the component mounts or updates.

  return () => {
    // Optional cleanup code for when the component unmounts or dependencies change.
  };
}, [dependencies]);
```
Setting the dependencies in useEffect to an empty array ([]) is useful when you want the effect to run only once, when the component mounts. By using [] as the dependency array, you ensure that the effect doesn't re-run on any state or prop updates—just once during the component's initial render. So, setting useEffect with [] dependencies is perfect for effects that need to run just once on mount, such as initial setup, data fetching, or attaching event listeners that will remain constant.

# Behavior
+ `useState`: Triggers a re-render of the component each time the state changes. This makes it ideal for dynamic data that should immediately reflect in the UI, like user input.
+ `useEffect`: Does not cause a re-render on its own. It's used to run code after React has already updated the DOM, so you can perform actions in response to state or prop changes without initiating another render loop.

# Examples of When to Use
+ `useState`: For tracking UI changes or data updates within the component, such as a counter, form input, or selection status.
+ `useEffect`: For side effects, like fetching data from an API, setting up event listeners, or manually manipulating the DOM.

# Example Comparison
Here's a component that uses both useState and useEffect:
```
import { useState, useEffect } from 'react';

function ExampleComponent() {
  // useState to manage a counter state.
  const [count, setCount] = useState(0);

  // useEffect to log a message to the console whenever count changes.
  useEffect(() => {
    console.log(`Count updated to: ${count}.`);

    return () => {
      console.log('Cleaning up after count changed.');
    };
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

In this example:
+ `useState` handles the count state, which changes when the button is clicked.
+ `useEffect` logs to the console whenever count updates and cleans up by logging a message just before the next effect.
