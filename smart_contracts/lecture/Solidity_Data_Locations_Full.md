# Solidity Data Locations: `memory`, `calldata`, and `storage`

In Solidity, **data locations** define where reference-type variables (like arrays, structs, and strings) are stored — on the blockchain, in temporary memory, or as read-only call data. Choosing the correct location impacts **gas usage, mutability, and safety** of your contracts.

---

## 🔹 `storage`

- **Location**: Contract’s persistent on-chain storage  
- **Lifetime**: Permanent (until overwritten or deleted)  
- **Mutable**: ✅ Yes  
- **Used For**: State variables, mappings, and arrays stored on the blockchain  

    uint[] public numbers;

    function update(uint index, uint newValue) public {
        uint[] storage nums = numbers;
        nums[index] = newValue; // Changes persist on-chain
    }

---

## 🔹 `memory`

- **Location**: Temporary RAM during function execution  
- **Lifetime**: Exists only during the current function call  
- **Mutable**: ✅ Yes  
- **Used For**: Temporary variables, local arrays, function return values  

    function double(uint[] memory input) public pure returns (uint[] memory) {
        uint[] memory result = new uint[](input.length);
        for (uint i = 0; i < input.length; i++) {
            result[i] = input[i] * 2;
        }
        return result;
    }

---

## 🔹 `calldata`

- **Location**: Read-only external function arguments  
- **Lifetime**: Temporary, tied to the function call  
- **Mutable**: ❌ No (read-only)  
- **Used For**: Parameters in `external` functions (especially arrays, strings)  

    function greet(string[] calldata names) external {
        for (uint i = 0; i < names.length; i++) {
            emit Greeting(names[i]);
        }
    }

---

## 🧠 Why Data Location Matters

For **reference types**, Solidity requires an explicit data location so the compiler knows:
- Whether to read/write from permanent storage
- Allocate a temporary in-memory copy
- Or access external read-only calldata (most gas-efficient)

---

## 🧾 Comparison Table

| Feature       | `storage`         | `memory`              | `calldata`              |
|---------------|-------------------|------------------------|--------------------------|
| Lives in      | Blockchain        | RAM during function    | Call data (stack)        |
| Persistent?   | ✅ Yes            | ❌ No                 | ❌ No                   |
| Modifiable?   | ✅ Yes            | ✅ Yes                | ❌ No (read-only)       |
| Gas Cost      | High              | Moderate               | ✅ Lowest               |
| Use Case      | State variables   | Internal logic         | External inputs          |

---

## ✅ When to Use

| Use Case                             | Best Choice |
|--------------------------------------|-------------|
| Reading or writing state variables   | `storage`   |
| Temporary variables in functions     | `memory`    |
| External function input (e.g. arrays)| `calldata`  |

---

## 🧪 Type Rules: When You Must Specify Data Location

You **must specify** a data location for these reference types:
- `string`, `bytes`
- Arrays like `uint[]`, `string[]`
- Structs
- Mappings inside structs or nested mappings

You **do not need to specify** location for value types:
- `uint`, `int`, `bool`, `address`, `bytes32`, `enum`

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