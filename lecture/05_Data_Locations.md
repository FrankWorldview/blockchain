# Data Locations in Solidity

In Solidity, data locations tell the compiler where variables reside — whether they are stored persistently on the blockchain or temporarily in memory. Choosing the right location affects **gas efficiency, mutability**, and **security**. Solidity requires that reference types (like arrays, structs, and strings) specify a data location explicitly.

---

## EVM Data Areas (Conceptual View)

```
Transaction
     ↓
[ calldata ]   ← your input parameters live here (read-only)
[  memory  ]   ← temporary execution space (allocated when needed)
[  storage ]   ← persistent data on the blockchain
```

- **calldata**: input data, read-only, cheapest  
- **memory**: temporary, mutable, medium cost  
- **storage**: persistent, most expensive  

### Execution Flow (Simplified)

calldata → (copy if needed) → memory → (write if needed) → storage

---

## 🔹 `calldata`

- **Location**: Read-only, external function arguments
- **Lifetime**: Temporary, tied to the function call
- **Mutable**: ❌ No (read-only)
- **Used For**: `external` function parameters, especially arrays and strings

```solidity
function greet(string[] calldata names) external {
    for (uint i = 0; i < names.length; i++) {
        emit Greeting(names[i]);
    }
}
```

---

## 🔹 `memory`

- **Location**: Temporary RAM during function execution
- **Lifetime**: Exists only during the current function call
- **Mutable**: ✅ Yes
- **Used For**: Temporary variables and return values

```solidity
function double(uint[] memory input) public pure returns (uint[] memory) {
    uint[] memory result = new uint[](input.length);
    for (uint i = 0; i < input.length; i++) {
        result[i] = input[i] * 2;
    }
    return result;
}
```

---

## 🔹 `storage`

- **Location**: Contract’s persistent on-chain storage
- **Lifetime**: Permanent (until modified or deleted)
- **Mutable**: ✅ Yes
- **Used For**: State variables and persistent data structures

```solidity
uint[] public numbers;

function update(uint index, uint newValue) public {
    uint[] storage nums = numbers;
    nums[index] = newValue; // changes on-chain
}
```

---

## 🧠 Why Does Solidity Require Data Location?

Solidity needs data location for **reference types** to determine:
- Whether to **allocate memory** (temporary copy)
- **Access storage** (permanent state)
- Or **read from calldata** (cheapest, read-only)

---

## 🧾 Comparison Table

| Feature        | `storage`              | `memory`                          | `calldata`                          |
|----------------|------------------------|------------------------------------|--------------------------------------|
| Lives in       | Blockchain (persistent)| RAM (temporary, during execution) | Call data (read-only input area)     |
| Persistent?    | ✅ Yes                 | ❌ No                             | ❌ No                                |
| Modifiable?    | ✅ Yes                 | ✅ Yes                            | ❌ No (read-only)                    |
| Gas Cost       | High                   | Moderate                          | ✅ Lowest                            |
| Use Case       | State variables        | Internal computation              | External function inputs             |

---

## ✅ When to Use Each Location

| Use Case                               | Best Choice |
|----------------------------------------|-------------|
| Reading/writing state variables        | `storage`   |
| Temporary data inside a function       | `memory`    |
| External function input (e.g., arrays) | `calldata`  |

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
| `storage`         | Writing to disk (permanent) |
| `memory`          | RAM (temporary, fast)       |
| `calldata`        | Read-only request input     |
