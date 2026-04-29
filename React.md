# React Hooks

## What are Hooks?
Hooks are special React functions that let functional components use features such as state and side effects.

---

## useState

### Purpose
useState lets you store and update state inside a functional component.

### Syntax
```javascript
const [state, setState] = useState(initialValue);
```

- state → current value
- setState → function to update the value

### Example
```javascript
import { useState } from 'react';

function Counter() {
  // Declare state variable "count" with initial value 0
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* Display current count */}
      <p>Count: {count}</p>

      {/* When clicked, update state */}
      <button onClick={() => setCount(count + 1)}>
        Increase
      </button>
    </div>
  );
}

export default Counter;
```

### Key Idea
- Calling setState does NOT immediately update the UI
- React schedules a re-render

---

## useEffect

### Purpose
useEffect is used for side effects (things outside rendering):

- API calls
- Event listeners
- Timers
- Local storage
- DOM manipulation

---

## Dependency Array (IMPORTANT)

```javascript
useEffect(() => {
  // effect logic
}, [dependencies]);
```

- [] → runs ONCE after mount
- [count] → runs when count changes
- no array → runs after EVERY render

---

## Example 1: Run Once

```javascript
import { useEffect, useState } from 'react';

function FetchDataOnMount() {
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log("Fetching data...");

    // Fetch API data (side effect)
    fetch("https://api.thecatapi.com/v1/images/search")
      .then(res => res.json())
      .then(data => setData(data)); // Update state

    // Empty array → runs once only
  }, []);

  return (
    <div>
      {/* Show loading or data */}
      <p>{data ? JSON.stringify(data) : "Loading..."}</p>
    </div>
  );
}
```

---

## Example 2: Dependency-based Effect

```javascript
import { useState, useEffect } from 'react';

function UpdateMessageOnCountChange() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("Initial message");

  useEffect(() => {
    console.log(`Count changed: ${count}`);

    // Update message based on new count
    setMessage(`Msg: Count is now ${count}`);

    // ⚠️ This logs OLD value!
    // Because this effect sees the message from the current render
    console.log("Message:", message);

  }, [count]); // Runs when count changes

  return (
    <div>
      <p>{message}</p>

      {/* Update count → triggers effect */}
      <button onClick={() => setCount(count + 1)}>
        Increase Count
      </button>
    </div>
  );
}
```

---

## Actual Lifecycle Flow (CRITICAL)

```text
1. User clicks → setCount(...)
2. React schedules a state update
3. React re-renders with new count
4. React updates the DOM (paint)
5. useEffect runs (because count changed)
6. Inside useEffect → setMessage(...)
7. React schedules another update
8. React re-renders with new message
```

### Key Insight
- useEffect runs AFTER render + paint
- setState inside useEffect → causes another render

---

## Common Pitfall

Updating state inside useEffect can cause:

👉 extra render cycles  
👉 potential infinite loops (if not careful)

---

## Strict Mode Note

In React Strict Mode (development only):

- React may run effects twice (setup + cleanup)
- This helps detect bugs with side effects

---

## Summary

| Hook       | Purpose                  |
|------------|--------------------------|
| useState   | Manage state             |
| useEffect  | Handle side effects      |

Together, they let functional components behave like full React components.
