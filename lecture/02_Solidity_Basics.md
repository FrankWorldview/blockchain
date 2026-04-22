# Solidity Basics

This page is based on [DeFi Learning](https://rdi.berkeley.edu/berkeley-defi/assets/material/Lecture%203%20Slides.pdf), P17-P25.

## 1. Overview

This section introduces the core components of Solidity programming:

- Solidity vs EVM
- Data types
- Functions
- Constructors
- Visibility modifiers
- Mutability modifiers
- Events

---

## 2. Solidity and EVM

Solidity is a **high-level language**.

It is compiled into:

→ **Ethereum Virtual Machine (EVM) bytecode**

Flow:

Solidity code → Compiler → EVM bytecode → Execution on blockchain

Key idea:

> Smart contracts are programs executed by the EVM.

---

## 3. Data Types

Solidity is:

- **Statically typed**
- Similar to **Java / C / Rust**
- Unlike **Python / JavaScript**

### Basic Types

- `uint` → unsigned 256-bit integer  
- `int` → signed 256-bit integer  

---

## 4. Function Structure

A Solidity function includes:

- Name
- Parameters
- Visibility modifier
- Mutability modifier
- Return types

Example:

```solidity
function getPrice(uint x) public view returns (uint) {
    return x;
}
```

---

## 5. Constructor

A constructor is:

> Executed only once when the contract is deployed

Used to:

- Initialize state
- Set initial parameters

Example:

```solidity
constructor(address initialOwner) {
    owner = initialOwner;
}
```

---

## 6. Visibility Modifiers

### For Functions

- `public` → anyone can call  
- `internal` → only inside contract  

### For Variables

- `public` → auto-generated getter  
- `private` → no getter  

⚠️ Important:

> "private" does NOT mean secret  
> Data is still visible on-chain

---

## 7. Mutability Modifiers

Define whether a function can modify state:

### `public`
- Can modify state

### `view`
- Cannot modify state
- Can read blockchain data

### `pure`
- Cannot read or modify state
- Pure computation only

Example:

```solidity
function f1() public { ... }  // can modify state
function f2() public view {  ... }  // read only
function f3() public pure { ... }  // no state access
```

---

## 8. Mapping

Mapping is:

> A key-value storage (like a hash table)

Example:

```solidity
mapping(address => uint256) balances;
```

Key properties:

- Every key has a default value (e.g., 0)
- No built-in way to:
  - get length
  - iterate over keys

👉 You must track keys manually

---

## 9. Events

Two ways to observe contract state:

1. View functions (read state)
2. Event logs (listen to activity)

### Event Example

```solidity
event Registered(address user, string domain);

function register(string memory name) public {
    emit Registered(msg.sender, name);
}
```

Key idea:

> Events are used for off-chain applications (frontend, indexing, etc.)

---

## 10. Key Takeaways

- Solidity is compiled → EVM bytecode
- It is statically typed
- Functions have visibility & mutability
- Constructor runs only once
- Mapping is NOT iterable
- Events are critical for off-chain interaction
