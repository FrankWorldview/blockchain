# Data Locations in Solidity

> Data location is not just syntax — it reflects how the EVM manages data and gas.

---

## 🧠 Why Does Solidity Require Data Location?

Solidity requires a data location for **reference types** to determine whether to:

- Read from **calldata** (input, read-only)
- Allocate **memory** (temporary, mutable)
- Access **storage** (persistent, on-chain state)

---

## 1. `calldata`

**Definition**
**calldata** is a read-only area where function arguments are stored.

**Key Features**
- Read-only (immutable)
- No additional memory allocation
- Cheapest option
- Commonly used for read-only function parameters, especially in external functions

**Example**
```solidity
function setName(string calldata newName) external {
    // newName lives in calldata
}
```

**Why it exists:**
**calldata** avoids unnecessary copying and reduces gas usage. `calldata` is ideal for large arrays or structs that do not need modification.

---

## 2. Memory

**Definition**
Memory is a temporary area used during contract execution.

**Key Features**
- Mutable (can modify)
- Exists only during execution
- Automatically cleared after execution
- Medium gas cost

**Example**
```solidity
function process(string calldata input) external {
    string memory temp = input; // copy from calldata
}
```

**Why it exists**
Memory allows modification of data during execution.

---

## 3. Storage

**Definition**
Storage is the persistent data area on the blockchain.

**Key Features**
- Permanent
- Stored on-chain
- Most expensive
- Shared across transactions

**Example**
```solidity
string public name;

function setName(string calldata newName) external {
    name = newName; // write to storage
}
```

**Why it exists**
Storage maintains contract state across transactions.

---

## Gas Cost Summary

calldata < memory << storage

---

## Execution Flow (Simplified)

calldata → (copy if needed) → memory → (write if needed) → storage

---

## 🧾 Comparison Table

| Feature        | `calldata`                          | `memory`                          | `storage`              |
|----------------|--------------------------------------|------------------------------------|------------------------|
| Lives in       | Call data (read-only input area)     | RAM (temporary, during execution) | Blockchain (persistent)|
| Persistent?    | ❌ No                                | ❌ No                             | ✅ Yes                 |
| Modifiable?    | ❌ No (read-only)                    | ✅ Yes                            | ✅ Yes                 |
| Gas Cost       | ✅ Lowest                            | Moderate                          | High                   |
| Use Case       | External function inputs             | Internal computation              | State variables        |

---

## ✅ When to Use Each Location

| Use Case                               | Best Choice |
|----------------------------------------|-------------|
| External function input (e.g., arrays) | `calldata`  |
| Temporary data inside a function       | `memory`    |
| Reading/writing state variables        | `storage`   |

---

## 🧪 Type Rules: When You Must Specify Data Location

You **must specify** a data location for all **reference types**.
- `string`
- `bytes`
- Arrays: `uint[]`, `string[]`, etc.
- Structs
- Mappings (when applicable inside structs/storage references)

You **do not need to specify** location for value types:
- `uint`, `int`, `bool`, `address`, `bytes32`, `enum`

**Incorrect:**
```solidity
function setName(string name) public { ... } // Compiler error!
```

**Correct:**
```solidity
function setName(string memory name) public { ... }
```

---

## 🧠 Real-World Analogy

| Solidity Location | Analogy                     |
|-------------------|------------------------------|
| `calldata`        | Read-only request input     |
| `memory`          | RAM (temporary, fast)       |
| `storage`         | Writing to disk (permanent) |
