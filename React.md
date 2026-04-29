# React Hooks

## What are Hooks?

Hooks are special React functions that let **functional components** use features such as state and side effects.

A **functional component** is a JavaScript function that returns UI.

```javascript
function Hello() {
  return <h1>Hello React</h1>;
}
```

---

## useState

### Purpose

`useState` lets you store and update state inside a functional component.

### Syntax

```javascript
const [state, setState] = useState(initialValue);
```

- `state` → current value
- `setState` → function to update the value

### Example

```javascript
import { useState } from 'react';

function Count() {
  // Create a state variable named "count"
  // Initial value is 0
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* Display current count */}
      <p>Count: {count}</p>

      {/*
        When the button is clicked:
        1. setCount(...) is called
        2. React schedules a state update
        3. React re-renders the component with the new count
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

`useEffect` is used for side effects.

A **side effect** means something that happens outside the normal rendering process.

Examples:

- API calls
- Logging
- Timers
- Event listeners

---

## Dependency Array

```javascript
useEffect(() => {
  // Effect logic
}, [dependencies]);
```

- `[]` → runs once after mount
- `[count]` → runs after mount and whenever `count` changes
- no array → runs after every render

---

## Example: Effect on State Change

This example is intentionally similar to the previous `Count` example.

The only new idea is:

```text
When count changes, useEffect runs.
```

```javascript
import { useState, useEffect } from 'react';

function LogCountChange() {
  // Create a state variable named "count"
  const [count, setCount] = useState(0);

  useEffect(() => {
    // This effect runs after render when count changes
    console.log(`Count changed to ${count}`);
  }, [count]); // Dependency array: run this effect when count changes

  return (
    <div>
      {/* Display current count */}
      <p>{count}</p>

      {/* Trigger state change */}
      <button onClick={() => setCount(count + 1)}>
        Increase
      </button>
    </div>
  );
}

export default LogCountChange;
```

---

## Important Concept: React Rendering is NOT Immediate

Calling `setState` does **not** immediately update the UI.

Instead, React follows this process:

```text
schedule → render → commit → paint → effect
```

### Explanation

1. **schedule**
   `setState(...)` is called → React schedules an update.

2. **render**
   React calculates the new UI in memory.

3. **commit**
   React updates the real DOM.

4. **paint**
   The browser draws the updated UI on the screen.

5. **effect**
   `useEffect` runs after paint.

---

## Virtual DOM vs Real DOM

### Virtual DOM

The **Virtual DOM** is React's in-memory representation of the UI.

It is not directly shown on the screen.

```text
Virtual DOM = React's draft version of the UI
```

### Real DOM

The **Real DOM** is the actual browser DOM that users see on the screen.

```text
Real DOM = the real webpage displayed by the browser
```

React first calculates changes in the Virtual DOM, then updates the Real DOM efficiently.

---

## Key Takeaway

```text
setState → does NOT update immediately
render   → React calculates the UI
commit   → React updates the real DOM
paint    → browser draws the UI
effect   → useEffect runs after paint
```

---

## Summary

| Hook        | Purpose             |
|-------------|---------------------|
| `useState`  | Manage state        |
| `useEffect` | Handle side effects |

With Hooks, functional components can manage state and side effects.
