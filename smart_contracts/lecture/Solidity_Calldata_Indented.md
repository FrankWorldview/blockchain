## 🔹 `calldata`

- **Location**: Read-only input data attached to external function calls  
- **Lifetime**: Temporary, tied to the call  
- **Mutable**: ❌ No (read-only)  
- **Use Case**: External function parameters (arrays, strings, etc.)

    function greet(string[] calldata names) external {
        for (uint i = 0; i < names.length; i++) {
            emit Greeting(names[i]);
        }
    }

---

## 🧾 Comparison Table

| Feature        | `storage`       | `memory`           | `calldata`         |
|----------------|------------------|---------------------|---------------------|
| Location        | Blockchain        | RAM during function | External call input |
| Persistent?     | ✅ Yes             | ❌ No                | ❌ No               |
| Modifiable?     | ✅ Yes             | ✅ Yes               | ❌ No (read-only)   |
| Gas Cost        | High              | Moderate            | ✅ Lowest           |
| Typical Use     | State variables   | Internal logic       | External inputs     |

---

## ✅ When to Use

| Use Case                            | Best Choice |
|-------------------------------------|-------------|
| Reading/writing state variables     | `storage`   |
| Temporary computation in a function | `memory`    |
| External function inputs            | `calldata`  |

---

## 🧪 Data Location Requirements

You **must** specify the location for **reference types**:

- `string`
- `bytes`
- Arrays: `uint[]`, `string[]`, etc.
- Structs: `MyStruct`
- Mappings inside structs or nested mappings

You **do not** need to specify location for **value types**:

- `uint`, `int`
- `bool`, `address`, `bytes32`
- `enum`

**Incorrect:**

    function setName(string name) public { ... } // Compiler error!

**Correct:**

    function setName(string memory name) public { ... }

---

## 🧠 Real-World Analogy

| Solidity Location | Analogy                     |
|-------------------|------------------------------|
| `storage`         | Writing to disk (permanent) |
| `memory`          | RAM (temporary, fast)       |
| `calldata`        | Read-only request input     |