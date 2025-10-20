# Function Call Types in Solidity

In Solidity, the way a function is called — `external`, `public`, or `internal` — affects **how data is passed, how gas is used, and how accessible** the function is. Understanding these distinctions is essential for writing efficient and secure smart contracts.

---

## 🔹 `external` Function Calls

- **Called by**: External contracts or externally owned accounts (EOAs)
- **Encoding**: ABI-encoded
- **Data Passed Via**: `calldata` (read-only input area, no copying)
- **Gas Cost**: Moderate to high (encoding overhead but no memory copy)
- **Restrictions**:
  - ✅ Must use `calldata` for dynamic parameters (e.g., `uint[] calldata`)
  - ❌ Cannot use `memory` or `storage` as input parameter types

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract ExternalExample {
    // External function — parameters are read directly from calldata
    function sum(uint[] calldata values) external pure returns (uint total) {
        for (uint i = 0; i < values.length; i++) {
            total += values[i];
        }
    }
}
```

### 🧠 Key Insight
- `calldata` is **read-only** and more gas-efficient than `memory` for external calls.
- Ideal for **large arrays** or **structs** that don't need to be modified.

### ⚙️ Ethers.js Example
```javascript
import { ethers } from "ethers";

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();

const contract = new ethers.Contract(contractAddress, abi, signer);
const result = await contract.sum([1, 2, 3, 4, 5]);

console.log("Sum:", result.toString());
```

---

## 🔹 `public` Function Calls

- **Dual Access**: Can be called both **internally** (cheap) and **externally** (ABI-encoded)
- **Internal Call**: Direct jump in bytecode → **no ABI encoding**
- **External Call**: `this.functionName()` → **ABI-encoded**
- **Can Use**:
  - `memory` (for both internal and external calls)
  - `storage` (for internal use only)
  - `calldata` (if explicitly declared for external call optimization)

```solidity
contract PublicExample {
    function double(uint x) public pure returns (uint) {
        return x * 2;
    }

    function testCalls(uint y) public view returns (uint) {
        uint internalResult = double(y);      // internal call (cheap)
        uint externalResult = this.double(y); // external call (ABI-encoded)
        return internalResult + externalResult;
    }
}
```

### 🧩 Notes
- When called externally, `public` behaves like `external` — ABI-encoded.
- When called internally, it’s a direct call — no gas wasted on encoding.

---

## 🔹 `internal` Function Calls

- **Access**: Only from within the same contract or derived contracts
- **Encoding**: No ABI encoding (direct jump)
- **Efficiency**: Most gas-efficient
- **Data Passing**:
  - `memory`: passed by value (copied when calling)
  - `storage`: passed by reference (directly points to state variable)

```solidity
contract InternalExample {
    uint[] internal data = [10, 20, 30];

    function _sum(uint[] storage arr) internal view returns (uint total) {
        for (uint i = 0; i < arr.length; i++) {
            total += arr[i]; // Accesses storage directly
        }
    }

    function getTotal() public view returns (uint) {
        return _sum(data); // Internal call — efficient
    }
}
```

---

## 🧠 Summary Table

| Call Type   | ABI Encoded? | Parameter Location | Callable by Other Contracts? | Mutability | Gas Cost |
|--------------|--------------|--------------------|------------------------------|-------------|----------|
| `external`  | ✅ Yes        | `calldata` (read-only) | ✅ Yes | ❌ Cannot modify inputs | Moderate–High |
| `public`    | ✅ / ❌ Mixed | `memory` / `calldata` / `storage` | ✅ Yes | ✅ Yes (if memory or storage) | Medium |
| `internal`  | ❌ No         | `memory` / `storage` | ❌ No | ✅ Yes | Low |

---

## ✅ Use Cases

- **Use `external`** when exposing functions to dApps, other contracts, or EOAs — especially if passing large arrays or structs (saves gas with `calldata`).
- **Use `public`** when the function must be usable both internally and externally.
- **Use `internal`** for logic encapsulation or reusable internal computations.

---

## ⚠️ Gotcha: ABI Encoding in `this.functionName()`

Using `this.functionName()` always triggers an **external-style ABI-encoded call** — even inside the same contract.

```solidity
doSomething(x);        // internal call — fast
this.doSomething(x);   // external call — ABI-encoded, slower
```

💡 So:
- For **internal logic**, prefer `public` or `internal` direct calls.
- For **external APIs**, use `external` with `calldata` to avoid unnecessary copying.

---
