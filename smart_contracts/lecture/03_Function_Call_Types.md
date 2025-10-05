# Function Call Types in Solidity

In Solidity, the way a function is called — `external`, `public`, or `internal` — affects how data is passed, how gas is used, and how the function is accessed. This distinction is crucial for writing efficient and secure smart contracts.

---

## 🔹 `external` Function Calls

- **Called by**: External contracts or externally owned accounts (EOAs)
- **Encoding**: ABI-encoded
- **Data Passed Via**: `calldata`
- **Gas Cost**: High (due to encoding and memory copying)
- **Restrictions**:
  - ✅ Must use `calldata` for dynamic parameters (e.g., `uint[] calldata`)
  - ❌ Cannot use `memory` or `storage` as input parameter types

```solidity
receive() external payable {
    // Accepts plain ETH transfers
}
```

---

## 🔹 `public` Function Calls

- **Dual Access**: Can be called internally or externally
- **Internal Call**:
  - Direct jump in bytecode (cheap)
- **External Call via `this.`**:
  - ABI-encoded, higher gas cost
- **Can Use**: `memory`, `storage`, `calldata` (internally only)

```solidity
function doSomething(uint x) public {
    // Logic
}

// Internal call: efficient
doSomething(123);

// External call: ABI-encoded
this.doSomething(123);
```

---

## 🔹 `internal` Function Calls

- **Access**: Only from within the same contract or derived contracts
- **Encoding**: No ABI encoding
- **Efficiency**: Most gas-efficient
- **Can Use**: `memory`, `storage`, and pass references

```solidity
function internalProcess(uint[] memory input) internal pure returns (uint) {
    return input[0];
}
```

---

## 🧠 Summary Table

| Call Type   | ABI Encoded? | Can use `memory`/`storage`? | Callable by Other Contracts? | Gas Cost |
|-------------|--------------|------------------------------|-------------------------------|----------|
| `external`  | ✅ Yes        | ❌ No (must use `calldata`)  | ✅ Yes                        | High     |
| `public`    | ✅ / ❌ Mixed | ✅ Yes (if internal)         | ✅ Yes                        | Medium   |
| `internal`  | ❌ No         | ✅ Yes                       | ❌ No                         | Low      |

---

## ✅ Use Cases

- **Use `external`** for public-facing APIs, especially if called by dApps or other contracts.
- **Use `public`** if the function needs to be available both internally and externally.
- **Use `internal`** for library-style logic or internal business rules that should not be exposed.

---

## ⚠️ Gotcha: ABI Encoding in `this.functionName()`

Using `this.functionName()` triggers an **external-style ABI-encoded call**:

```solidity
doSomething(x);        // internal call — fast
this.doSomething(x);   // external call — ABI-encoded, more gas
```