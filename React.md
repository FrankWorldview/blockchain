# React Hooks (Clean Teaching Version)

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
  // Create state variable
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* Display current count */}
      <p>Count: {count}</p>

      {/* Update state when clicked */}
      <button onClick={() => setCount(count + 1)}>
        Increase
      </button>
    </div>
  );
}

export default Counter;
```

---

## useEffect

### Purpose
useEffect is used for side effects (things outside rendering):

- API calls
- Logging
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
    // Runs after render when count changes
    console.log(`Count changed to ${count}`);
  }, [count]);

  return (
    <div>
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

## ⚠️ Important Concept: React Rendering is NOT Immediate

Calling setState does NOT immediately update the UI.

React follows this process:

```text
schedule → render → commit → paint → effect
```

### Explanation

1. schedule  
   setState(...) is called → React schedules an update

2. render  
   React calculates the new UI (virtual DOM)

3. commit  
   React updates the real DOM

4. paint  
   Browser draws the UI on screen

5. effect  
   useEffect runs AFTER paint

---

## Key Takeaway

```text
setState → NOT immediate
useEffect → runs after render + paint
```

---

## Strict Mode (Development Only)

In React Strict Mode:

- Effects may run twice
- This helps detect bugs

---

## Summary

| Hook       | Purpose             |
|------------|---------------------|
| useState   | Manage state        |
| useEffect  | Handle side effects |

With Hooks, functional components can manage state and side effects, making them as powerful as class components.
