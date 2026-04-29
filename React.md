# React Hooks

## What is a Functional Component?

A functional component is a JavaScript function that returns UI (JSX).

```javascript
function Hello() {
  return <h1>Hello React</h1>;
}
```

👉 When React runs this function, it returns UI and displays it on the screen.

---

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

function Count() {
  // Create state variable
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>

      {/* 
        Clicking this:
        → calls setCount
        → schedules an update
        → triggers re-render
      */}
      <button onClick={() => setCount(count + 1)}>
        Increase
      </button>
    </div>
  );
}

export default Count;
```

---

## useEffect

### Purpose

useEffect is used for side effects:

- Logging
- API calls
- Timers
- Event listeners

---

## Dependency Array

```javascript
useEffect(() => {
  // effect logic
}, [dependencies]);
```

- [] → runs once after mount  
- [count] → runs when count changes  
- no array → runs after every render  

---

## Example: Effect on State Change

```javascript
import { useState, useEffect } from 'react';

function LogCountChange() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Runs after re-render when count changes
    console.log(`Count changed to ${count}`);
  }, [count]);

  return (
    <div>
      <p>{count}</p>

      <button onClick={() => setCount(count + 1)}>
        Increase
      </button>
    </div>
  );
}

export default LogCountChange;
```

---

## Important Concept (Simplified)

Calling setState (setXXX) does NOT immediately update the UI.

React will:

```text
1. schedule updates (may batch multiple updates)
2. re-render the component
3. run useEffect
```

---

## Key Idea

```text
Multiple setState calls may be batched together,
resulting in a single re-render.
```

---

## One-line Takeaway

```text
setState → schedule (batched) → re-render → useEffect
```

---

## Summary

| Hook        | Purpose             |
|-------------|---------------------|
| useState    | Manage state        |
| useEffect   | Handle side effects |

With Hooks, functional components can manage state and side effects.
