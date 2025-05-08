# Solidity Data Types Overview

## Introduction

Solidity provides a rich set of data types for handling variables in smart contracts. These types are categorized into **Value Types**, **Reference Types**, and **Complex/User-Defined Types**. This document introduces each type and compares them in tables for clarity.

---

## 1. Value Types

Value types are stored directly in memory or on the stack. They are copied when assigned or passed to functions.

| Type         | Description                                 | Example                            |
|--------------|---------------------------------------------|------------------------------------|
| `uint`       | Unsigned integer (default: uint256)         | `uint x = 42;`                     |
| `int`        | Signed integer (default: int256)            | `int y = -42;`                     |
| `bool`       | Boolean value (`true` or `false`)           | `bool isActive = true;`           |
| `address`    | Ethereum address                            | `address owner = msg.sender;`     |
| `bytes1`–`bytes32` | Fixed-size byte arrays               | `bytes32 hash = keccak256(...);`  |
| `enum`       | User-defined enumeration                    | `enum State { Active, Inactive }` |
| `byte`       | Deprecated alias for `bytes1`               |                                    |

---

## 2. Reference Types

Reference types store references to the actual data in memory or storage.

| Type         | Description                                 | Example                            |
|--------------|---------------------------------------------|------------------------------------|
| `string`     | Dynamic UTF-8 encoded text                  | `string name = "Alice";`          |
| `bytes`      | Dynamic byte array                          | `bytes data = "0x1234";`          |
| `array`      | Fixed-size or dynamic list of elements      | `uint[] numbers;`                 |
| `mapping`    | Key-value store                             | `mapping(address => uint) balances;` |
| `struct`     | Group of related variables                  | `struct Person { string name; uint age; }` |

---

## 3. Complex/User-Defined Types

These are composed of other types and are created by developers.

| Type     | Description                                     | Example                          |
|----------|-------------------------------------------------|----------------------------------|
| `struct` | Combines multiple variables into one type       | `struct Car { string model; uint year; }` |
| `enum`   | Custom defined states or choices                | `enum Phase { Init, Ready, Done }` |

---

## 4. Data Location

In functions, variables can be stored in one of the following locations:

| Location  | Applies To            | Description                                     |
|-----------|------------------------|-------------------------------------------------|
| `storage` | State variables        | Persistent, written to blockchain               |
| `memory`  | Temporary variables    | Exists only during function execution           |
| `calldata`| Function inputs (external)| Read-only, non-modifiable input data        |

---

## Summary Table

| Category             | Types                                           |
|----------------------|-------------------------------------------------|
| **Value Types**      | `uint`, `int`, `bool`, `address`, `bytes1`–`32`, `enum` |
| **Reference Types**  | `string`, `bytes`, `array`, `mapping`, `struct` |
| **User-Defined**     | `struct`, `enum`                                 |
| **Data Locations**   | `storage`, `memory`, `calldata`                 |

---

## Conclusion

Choosing the correct data type in Solidity is essential for efficient and secure smart contract development. Understanding how data is stored and manipulated enables better gas optimization and contract logic design.

---

## References

- [Solidity Official Docs](https://docs.soliditylang.org/)
- [Solidity by Example](https://solidity-by-example.org/)
