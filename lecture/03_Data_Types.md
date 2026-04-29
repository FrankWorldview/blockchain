# 03 Data Types

## 1. Value Types

Value types are stored directly in memory or on the stack. They are copied when assigned or passed to functions.

| Type         | Description                                 | Example                            |
|--------------|---------------------------------------------|------------------------------------|
| `uint`       | Unsigned integer, from 8 bits to 256 bits, in steps of 8 (default: uint256)         | `uint x = 42;`                     |
| `int`        | Signed integer, from 8 bits to 256 bits, in steps of 8 (default: int256)            | `int y = -42;`                     |
| `bool`       | Boolean value (`true` or `false`)           | `bool isActive = true;`           |
| `address`    | Ethereum address                            | `address owner = msg.sender;`     |
| `bytes1`–`bytes32` | Fixed-size byte arrays               | `bytes32 hash = keccak256(...);`  |
| `enum`       | User-defined enumeration                    | `enum State { Active, Inactive }` |
| `byte`       | Deprecated alias for `bytes1`               |                                    |

👉 Behavior:
- Always copied
- No shared underlying data

---

## 2. Reference Types

Reference types store data indirectly and refer to a data location (`storage`, `memory`, or `calldata`).

| Type         | Description                                 | Example                            |
|--------------|---------------------------------------------|------------------------------------|
| `string`     | Dynamic UTF-8 encoded text                  | `string name = "Alice";`          |
| `bytes`      | Dynamic byte array                          | `bytes data = "0x1234";`          |
| `array`      | Fixed-size or dynamic list of elements      | `uint[] numbers;`                 |
| `mapping`    | Key-value store                             | `mapping(address => uint) balances;` |
| `struct`     | Group of related variables                  | `struct Person { string name; uint age; }` |

> Behavior depends on data location and context.

---

## 3. Data Locations (Not Types)

| Location  | Applies To                          | Description                                     |
|-----------|--------------------------------------|-------------------------------------------------|
| `storage` | State variables, local references    | Persistent, written to blockchain               |
| `memory`  | Function parameters & local variables| Temporary, exists during function execution     |
| `calldata`| External function inputs             | Read-only, non-modifiable input data            |

> Type = what data is  
> Location = where data lives

---

## 4. Memory Behavior

### Modify element → affects caller

```solidity
function foo(uint[] memory arr) internal {
    arr[0] = 999;
}

function test1() public pure returns (uint) {
    uint[] memory a = new uint[](1);
    a[0] = 1;

    foo(a);

    return a[0]; // 999
}
```

### Reassign → does NOT affect caller

```solidity
function foo2(uint[] memory arr) internal {
    arr = new uint[](10);
}

function test2() public pure returns (uint) {
    uint[] memory a = new uint[](1);
    a[0] = 1;

    foo2(a);

    return a[0]; // still 1
}
```

---

## 5. Storage → Memory Copy

```solidity
uint[] public nums;

function foo(uint[] memory arr) internal {
    arr[0] = 999;
}

function bar() public {
    nums.push(1);
    foo(nums);
}
```

👉 nums will NOT change
























# 03 Data Types

## 1. Value Types

Value types store their data directly. Assignments create independent copies.

| Type | Example |
|------|--------|
| `uint` | `uint x = 10;` |
| `bool` | `bool flag = true;` |
| `address` | `address addr = msg.sender;` |
| `bytes1 ~ bytes32` | `bytes32 hash;` |

👉 Behavior:
- Always copied
- Modifying a variable does NOT affect others

---

## 2. Reference Types

Reference types store data **indirectly**, meaning they refer to a data location (`storage`, `memory`, or `calldata`) rather than holding the data itself.

| Type         | Description                                 | Example                            |
|--------------|---------------------------------------------|------------------------------------|
| `string`     | Dynamic UTF-8 encoded text                  | `string name = "Alice";`          |
| `bytes`      | Dynamic byte array                          | `bytes data = "0x1234";`          |
| `array`      | Fixed-size or dynamic list of elements      | `uint[] numbers;`                 |
| `mapping`    | Key-value store                             | `mapping(address => uint) balances;` |
| `struct`     | Group of related variables                  | `struct Person { string name; uint age; }` |

Reference types do not store their data directly. Instead, they refer to a data location.

> ⚠️ Solidity does **not strictly follow** pass-by-value or pass-by-reference. Behavior depends on **data location and context**.

---

## 3. Data Locations *(not data types)*

| Location  | Applies To                          | Description                                     |
|-----------|--------------------------------------|-------------------------------------------------|
| `storage` | State variables, local references    | Persistent, written to blockchain               |
| `memory`  | Function parameters & local variables| Temporary, exists during function execution     |
| `calldata`| External function inputs             | Read-only, non-modifiable input data            |

> Type = what data is  
> Location = where data lives

---

## 4. Important Notes (Memory Behavior)

### 4.1 Memory is NOT simply "by value"

```solidity
uint[] memory a = new uint[](1);
uint[] memory b = a;

b[0] = 999;
```

👉 `a[0]` will also become `999`  
👉 Because both variables refer to the same underlying memory data

---

### 4.2 Function call behavior

```solidity
function foo(uint[] memory arr) internal {
    arr[0] = 999;
}
```

- Modifying elements (e.g., `arr[0]`) may affect the caller

```solidity
function test1() public pure returns (uint) {
    uint[] memory a = new uint[](1);
    a[0] = 1;

    foo(a);

    return a[0]; // 👉 returns 999
}
```

- Reassigning the variable does NOT affect the caller:

```solidity
function foo2(uint[] memory arr) internal {
    arr = new uint[](10);
    arr[0] = 999;
}

function test2() public pure returns (uint) {
    uint[] memory a = new uint[](1);
    a[0] = 1;

    foo2(a);

    return a[0]; // 👉 still 1
}
```

---

### 4.3 Storage → Memory creates a copy

```solidity
uint[] public numbers;

function foo(uint[] memory arr) internal {
    arr[0] = 999;
}

function bar() public {
    numbers.push(1);
    foo(numbers); // storage → memory
}
```

👉 `numbers` will NOT change because the data is copied into memory

---

## Summary

- Value types → always copied  
- Reference types → refer to data location  
- storage → persistent, shared data  
- memory → temporary (may be shared or copied depending on context)  
- calldata → read-only input data















# Data Types in Solidity

## Introduction

Solidity provides a rich set of data types for handling variables in smart contracts. These types are categorized into **Value Types** and **Reference Types**. This document introduces each type and compares them in tables for clarity.

---

## 1. Value Types

Value types are stored directly in memory or on the stack. They are copied when assigned or passed to functions.

| Type         | Description                                 | Example                            |
|--------------|---------------------------------------------|------------------------------------|
| `uint`       | Unsigned integer, from 8 bits to 256 bits, in steps of 8 (default: uint256)         | `uint x = 42;`                     |
| `int`        | Signed integer, from 8 bits to 256 bits, in steps of 8 (default: int256)            | `int y = -42;`                     |
| `bool`       | Boolean value (`true` or `false`)           | `bool isActive = true;`           |
| `address`    | Ethereum address                            | `address owner = msg.sender;`     |
| `bytes1`–`bytes32` | Fixed-size byte arrays               | `bytes32 hash = keccak256(...);`  |
| `enum`       | User-defined enumeration                    | `enum State { Active, Inactive }` |
| `byte`       | Deprecated alias for `bytes1`               |                                    |

---

## 2. Reference Types

Reference types store data **indirectly**, meaning they refer to a data location (`storage`, `memory`, or `calldata`) rather than holding the data itself.

| Type         | Description                                 | Example                            |
|--------------|---------------------------------------------|------------------------------------|
| `string`     | Dynamic UTF-8 encoded text                  | `string name = "Alice";`          |
| `bytes`      | Dynamic byte array                          | `bytes data = "0x1234";`          |
| `array`      | Fixed-size or dynamic list of elements      | `uint[] numbers;`                 |
| `mapping`    | Key-value store                             | `mapping(address => uint) balances;` |
| `struct`     | Group of related variables                  | `struct Person { string name; uint age; }` |

Reference types do not store their data directly. Instead, they refer to a data location. However, Solidity does **not strictly follow** pass-by-value or pass-by-reference semantics. The behavior depends on the **data location and context**.

| Data Location | Behavior | Description |
|----------------|------------|--------------|
| **storage** | 🔗 reference | Points to persistent blockchain data. Modifying it affects the original data. |
| **memory** | 📋 temporary (sometimes shared, sometimes copied) | Used for temporary data during execution. Assignments may share the same underlying data, but copying occurs when converting from `storage`. |
| **calldata** | 🔒 read-only reference | Refers to external input data. Cannot be modified and typically avoids copying. |

### Important Notes

**1. Memory is NOT simply "by value"**

```solidity
uint[] memory a = new uint[](1);
uint[] memory b = a;

b[0] = 999;
```

👉 `a[0]` will also become `999` because both variables refer to the same memory data.

---

**2. Function call behavior**

- Modifying elements may affect the caller:

```solidity
function foo(uint[] memory arr) internal {
    arr[0] = 999;
}
```

```solidity
function test1() public pure returns (uint) {
    uint[] memory a = new uint[](1);
    a[0] = 1;

    foo(a);

    return a[0]; // 👉 returns 999
}
```

---

- Reassigning the variable does NOT affect the caller:

```solidity
function foo2(uint[] memory arr) internal {
    arr = new uint[](10);
    arr[0] = 999;
}
```

```solidity
function test2() public pure returns (uint) {
    uint[] memory a = new uint[](1);
    a[0] = 1;

    foo2(a);

    return a[0]; // 👉 still 1
}
```

### Key Takeaway

- Modifying elements → affects caller (shared underlying memory)
- Reassigning variable → does NOT affect caller (new memory allocated)

---

**3. Storage → Memory creates a copy**

```solidity
uint[] public numbers;

function foo(uint[] memory arr) internal {
    arr[0] = 999;
}

function bar() public {
    numbers.push(1);
    foo(numbers); // storage → memory
}
```

👉 `numbers` will NOT change because the data is copied into memory.

---

## Summary

- Value types → always copied  
- Reference types → refer to data location  
- storage → persistent, shared data  
- memory → temporary (may be shared or copied depending on context)  
- calldata → read-only input data

---

## References

- [Solidity Official Docs](https://docs.soliditylang.org/)
- [Solidity by Example](https://solidity-by-example.org/)
