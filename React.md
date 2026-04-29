# React Hooks

## What is a Functional Component?

A functional component is a JavaScript function that returns JSX describing the UI.

```javascript
function Hello() {
  return <h1>Hello React</h1>;
}
```

👉 When React runs this function, it returns JSX, which React uses to update the screen.

---

## What are Hooks?

Hooks are special React functions that let functional components use features such as state and side effects.

---

## useState

### Purpose

`useState` lets you store and update state inside a functional component.

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
  // Create a state variable
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>

      {/*
        Clicking this button:
        → calls setCount
        → schedules a state update (may be batched)
        → triggers a re-render
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

`useEffect` is used for side effects (something that happens outside rendering), for example:

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
    // When count changes → component re-renders → then this effect runs
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

## Important Concept

Calling setState (setXXX) does NOT immediately update the UI.

React will:

1. Schedule updates (may be batched)
2. Re-render the component
3. Then `useEffect` runs

Multiple setState calls may be batched together, resulting in a single re-render.
```

---

## React Update Flow (Simplified)

setState → schedule updates (may be batched) → re-render → then `useEffect` runs

---

## Summary

| Hook        | Purpose             |
|-------------|---------------------|
| `useState`    | Manage state        |
| `useEffect`   | Handle side effects |

With Hooks, functional components can manage state and side effects.
