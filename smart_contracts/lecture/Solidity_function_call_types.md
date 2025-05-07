# Function Call Types in Solidity

Solidity provides three main function call types — `external`, `public`, and `internal`. Understanding their behavior is essential for optimizing gas costs, ensuring correct parameter handling, and defining contract interfaces properly.

## 1. `external` Function Calls
- **ABI-encoded**: Required for interaction from other contracts or externally owned accounts (EOAs).
- **Calldata only**: Parameters must use `calldata` for dynamic types (e.g., `uint[] calldata`).
- **Higher gas cost**: Due to ABI encoding and memory copying.
- **Callable by others**: Designed for inter-contract and EOA interaction.
- ❌ **Cannot** use `memory` or `storage` as parameters.

## 2. `public` Function Calls
- **Dual-use**: Can be called both externally and internally.
  - **Internal call**: Direct jump in bytecode — cheap and efficient.
  - **External-style call**: Using `this.functionName()` triggers an ABI-encoded call — more gas-intensive.
- ✅ **Can** use `memory` and `storage` internally.
- ✅ Callable by other contracts and from within the same contract.

> ⚠ **Important**:
```solidity
doSomething(x);        // Internal call — efficient
this.doSomething(x);   // External-style — ABI-encoded, more gas
```

## 3. `internal` Function Calls

- **No ABI encoding**: Direct jump within the bytecode.
- **Most efficient**: Lowest gas usage.
- ✅ Can use `memory`, `storage`, and pass references.
- ❌ Not callable from external contracts.

---

## Summary Table

| Call Type   | ABI Encoded? | Can Use `memory`/`storage`? | Callable by Other Contracts? | Gas Cost |
|-------------|--------------|-----------------------------|-------------------------------|----------|
| `external`  | ✅ Yes        | ❌ No (only `calldata`)      | ✅ Yes                        | High     |
| `public`    | ✅/❌ Mixed    | ✅ Yes (internally)          | ✅ Yes                        | Medium   |
| `internal`  | ❌ No         | ✅ Yes                       | ❌ No                         | Low      |

---

## Use Cases

- **Use `external`** for interface functions meant to be accessed from dApps or other contracts.
- **Use `public`** when you need both internal and external access.
- **Use `internal`** for helper logic and private computation within the contract.
