# Data Locations in Solidity

> Data location is not just syntax — it reflects how the EVM manages data and gas.

---

## 🧠 Why Does Solidity Require Data Location?

Solidity needs data location for **reference types** to determine:
- Whether to **allocate memory** (temporary copy)
- **Access storage** (permanent state)
- Or **read from calldata** (cheapest, read-only)

---

## Data Flow in EVM

```
Transaction
   ↓
calldata (input, read-only)
   ↓
memory (temporary, mutable)
   ↓
storage (persistent, expensive)
```

> Data flows only when necessary to minimize gas usage.

---

## 1. Calldata

**Definition**  
Calldata is a read-only area where function arguments are stored.

**Key Features**
- Read-only (immutable)
- No additional memory allocation
- Cheapest option
- Used in external function parameters

**Example**
```solidity
function setName(string calldata newName) external {
    // newName lives in calldata
}
```

**Why it exists**  
Calldata avoids unnecessary copying and reduces gas usage.

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

You **must specify** location for these reference types:
- `string`, `bytes`
- Arrays: `uint[]`, `string[]`, etc.
- Structs like `MyStruct`
- Mappings inside structs or nested mappings

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
