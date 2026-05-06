# Function Call Types in Solidity

## 📘 Introduction

In Solidity, the way a function is called — **external, internal, or public** — affects:

- how data is passed
- how gas is consumed
- how accessible the function is

Understanding these distinctions is essential for writing **efficient and secure smart contracts**.

---

## 🧠 Overview

Solidity provides three main function visibility types:

- `external`（外部呼叫）
- `internal`（內部呼叫）
- `public`（公開函式，兼具兩者特性）

---

## 🔹 `external` Function Calls（外部呼叫）

### 📌 Definition

An **external call** occurs when a function is invoked via:

- an externally owned account (EOA)
- another contract
- a frontend (dApp)
- RPC tools (e.g., `cast call`)
- or via `this.functionName()`

```solidity
function A() public {
    this.B(); // external call
}
```

### ⚙️ How It Works

- Executed via EVM **CALL opcode**
- Creates a **new execution context**
- Requires **ABI encoding/decoding**

An **execution context** is the complete environment in which a function or contract call is executed. It includes:
- `msg.sender`
- `msg.value`
- calldata
- memory
- stack
- gas
- the currently executing contract (`address(this)`)

**ABI encoding** converts function calls and parameters into a standardized binary format that the EVM can understand.

### 🔑 Key Properties

| Property | Description |
|----------|------------|
| Context | New execution context |
| msg.sender | Changes |
| ABI | Required |
| Gas | Higher |

### ⚙️ Data Passing with `calldata`

- Read-only
- Not copied into memory
- More gas-efficient

👉 `calldata` is ideal for large arrays or structs that do not need modification.

### Example

```solidity
contract ExternalExample {
    function sum(uint[] calldata values) external pure returns (uint total) {
        for (uint i = 0; i < values.length; i++) {
            total += values[i];
        }
    }
}
```

---

## 🔹 `internal` Function Calls（內部呼叫）

### 📌 Definition

An **internal call** occurs when a function is invoked:

- within the same contract
- or from inherited contracts

```solidity
function A() public {
    B(); // internal call
}
```

Internal calls are executed internally by the contract without creating an external transaction.

An EOA (Externally Owned Account) cannot directly perform internal calls because EOAs do not contain executable smart contract code.

### ⚙️ How It Works

- Compiled into EVM **JUMP**
- Same execution context
- No ABI encoding

### 🔑 Key Properties

| Property | Description |
|----------|------------|
| Context | Same |
| msg.sender | Unchanged |
| ABI | Not used |
| Gas | Lower |

### ⚙️ Data Passing

| Type | Behavior |
|------|--------|
| memory | Passed as a copy (shallow copy for memory-to-memory, deep copy for storage-to-memory) |
| storage | Passed by reference to persistent contract storage |

### Example

```solidity
contract InternalExample {
    uint[] internal data = [10, 20, 30];

    function _sum(uint[] storage arr) internal view returns (uint total) {
        for (uint i = 0; i < arr.length; i++) {
            total += arr[i];
        }
    }

    function getTotal() public view returns (uint) {
        return _sum(data);
    }
}
```

---

## 🔹 `public` Function Calls（公開函式）

### 📌 Definition

A **public function** can be called:

- internally (like an internal call)
- externally (like an external call)

👉 It behaves differently depending on how it is invoked.


### 🔑 Key Insight

> A `public` function has **dual behavior**

| Call Type | Behavior |
|----------|--------|
| Internal (`f(x)`) | JUMP (cheap) |
| External (`this.f(x)`) | CALL (ABI-encoded) |


### ⚙️ Behavior Breakdown

#### ✅ Internal Call

```solidity
double(y);
```

- Same execution context
- No ABI encoding
- Lower gas cost

#### ✅ External Call

```solidity
this.double(y);
```

- New execution context
- ABI encoding required
- Higher gas cost

### Example

```solidity
contract PublicExample {
    function double(uint x) public pure returns (uint) {
        return x * 2;
    }

    function testCalls(uint y) public view returns (uint) {
        uint internalResult = double(y);      // internal call
        uint externalResult = this.double(y); // external call
        return internalResult + externalResult;
    }
}
```

### ⚙️ Data Passing

| Location | Supported |
|----------|----------|
| memory | ✅ yes |
| calldata | ✅ yes |
| storage | ❌ not allowed for public/external function parameters |

---

## 🔥 Key Difference: `msg.sender`

```solidity
contract Test {
    function A() public {
        B();          // internal call
        this.B();     // external call
    }

    function B() public view returns (address) {
        return msg.sender;
    }
}
```

### Internal call

```text
msg.sender = EOA
```

### External call

```text
msg.sender = address(this)
```

👉 Because a new execution context is created, the contract becomes the caller.

👉 Because a new message call (CALL opcode) is created, the caller becomes address(this).

---

## Cross-Contract Calls and `msg.sender`

Consider the call chain:

```text
EOA → A → B → C
```

When execution reaches contract **C**:

```text
msg.sender = B
```

👉 Not A
👉 Not the original EOA

### ⚙️ What’s Happening Under the Hood

Each step creates a new **message call (CALL opcode)**:

1. EOA calls A: In contract A → `msg.sender = EOA`
2. A calls B: In contract B → `msg.sender = A`
3. B calls C: In contract C → `msg.sender = B`

At each step, the caller changes.

### 🔑 Key Insight

> `msg.sender` is always the **immediate caller**, not the original transaction sender.

---

## ✅ Use Cases

### 🔹 Use `external`

- For:
  - dApps
  - other contracts
  - EOAs

### 🔹 Use `internal`

- For:
  - internal logic
  - helper functions
  - encapsulation

### 🔹 Use `public`

- When a function must be:
  - internally reusable
  - externally accessible

---

## ⛽ Gas Cost Summary

### Data Locations
`calldata` < `memory` << `storage`

### Function Call Execution
internal call (`X()`) < external call (`this.X()` or cross-contract calls)

---

## 中文解釋

### External Calls

指透過「`cast call`、前端 dApp、或其他合約」等外部介面呼叫函式。這類呼叫必須經過 **ABI 編碼與解碼**，因為它是透過以太坊的 **RPC 介面** 或 **跨合約訊息傳遞** 進行的。**External call** 會建立新的呼叫上下文（context），因此 `msg.sender` 會變成這次呼叫的發出者（例如外部帳戶 EOA 或另一個合約）。

### Internal Calls

指「由本合約自身或繼承的合約」在程式內部直接呼叫函式。這種呼叫不經過 **ABI** 處理，而是以 **EVM 的跳轉指令（JUMP）** 在同一個執行上下文中執行，速度較快，也不會改變 `msg.sender`。Internal 呼叫 **只能在合約內部或繼承的合約之間發生，外部帳戶（EOA）無法直接進行 internal call**。

### Summary
> **External calls**：建立新上下文，`msg.sender` 變成呼叫者。
> **Internal calls**：同上下文執行，`msg.sender` 保持不變。
