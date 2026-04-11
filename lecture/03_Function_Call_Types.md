# Function Call Types in Solidity

## 📘 Introduction

In Solidity, the way a function is called — **external, public, or internal** — affects:

- how data is passed  
- how gas is consumed  
- how accessible the function is  

Understanding these distinctions is essential for writing **efficient and secure smart contracts**.

---

## 🧠 Overview

Solidity provides three main function visibility types:

- External（外部呼叫）
- Internal（內部呼叫）
- Public（公開函式，兼具兩者特性）

---

# 🔹 1. External Function Calls（外部呼叫）

### 📌 Definition（定義）

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

---

### ⚙️ How it works（運作方式）

- Executed via EVM **CALL opcode**
- Creates a **new execution context**
- Requires **ABI encoding/decoding**

---

### 🔑 Key Properties（特性）

| Property | Description |
|----------|------------|
| Context | New execution context |
| msg.sender | Changes |
| ABI | Required |
| Gas | Higher |

---

### ⚙️ Data Location: `calldata`

- Read-only
- Not copied into memory
- More gas-efficient

👉 Ideal for large arrays or structs that do not need modification

---

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

# 🔹 2. Internal Function Calls（內部呼叫）

### 📌 Definition（定義）

An **internal call** occurs when a function is invoked:

- within the same contract
- or from inherited contracts

```solidity
function A() public {
    B(); // internal call
}
```

---

### ⚙️ How it works（運作方式）

- Compiled into EVM **JUMP**
- Same execution context
- No ABI encoding

---

### 🔑 Key Properties（特性）

| Property | Description |
|----------|------------|
| Context | Same |
| msg.sender | Unchanged |
| ABI | Not used |
| Gas | Lower |

---

### ⚙️ Data Passing

| Type | Behavior |
|------|--------|
| memory | Passed by value (copied) |
| storage | Passed by reference |

---

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

# 🔹 3. Public Function Calls（公開函式）

### 📌 Definition（定義）

A **public function** can be called:

- internally (like an internal call)
- externally (like an external call)

👉 It behaves differently depending on how it is invoked.

---

### 🔑 Key Insight

> A `public` function has **dual behavior**

| Call Type | Behavior |
|----------|--------|
| Internal (`f(x)`) | JUMP (cheap) |
| External (`this.f(x)`) | CALL (ABI-encoded) |

---

### ⚙️ Behavior Breakdown

#### ✅ Internal Call

```solidity
double(y);
```

- Same execution context  
- No ABI encoding  
- Low gas cost  

---

#### ✅ External Call

```solidity
this.double(y);
```

- New execution context  
- ABI encoding required  
- Higher gas cost  

---

### ⚙️ Data Location Rules

| Location | Supported |
|----------|----------|
| memory | ✅ yes |
| calldata | ✅ yes |
| storage | ❌ not for parameters |

---

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

---

# 🔥 4. Key Difference: `msg.sender`

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

---

### 🧪 Scenario: EOA calls `A()`

#### Internal call

```text
msg.sender = EOA
```

---

#### External call

```text
msg.sender = address(this)
```

👉 Because a new execution context is created  
👉 The contract becomes the caller  

---

# 🧠 5. Intuition（直覺）

- Internal call → same program flow  
- External call → message passing  

---

# 🧠 6. Final Comparison（總結）

| Feature | Internal | External | Public |
|--------|---------|---------|--------|
| Context | Same | New | Both |
| msg.sender | Same | Changes | Depends |
| ABI | No | Yes | Depends |
| Gas | Low | High | Depends |

---

# ✅ 7. Use Cases（使用情境）

### 🔹 Use `external`

- For:
  - dApps
  - other contracts
  - EOAs  

- Especially when:
  - passing large arrays or structs  

👉 More efficient with `calldata`

---

### 🔹 Use `public`

- When a function must be:
  - internally reusable  
  - externally accessible  

---

### 🔹 Use `internal`

- For:
  - internal logic
  - helper functions
  - encapsulation  

---

# ⚠️ 8. Gotcha: `this.functionName()`

```solidity
doSomething(x);        // internal call — fast
this.doSomething(x);   // external call — slower
```

---

### 🧠 What happens?

- `doSomething(x)`  
  → JUMP → same context  

- `this.doSomething(x)`  
  → CALL → new context  
  → msg.sender = address(this)  

---

# 🎯 Final Takeaway

> Internal call = JUMP  
> External call = CALL  
> Public = both behaviors depending on usage  

---

# 💡 Teaching One-Liner

> “Public is flexible — it can behave like internal or external depending on how you call it.”

---

# 🚀 Pro Tip

> If you see `this.` in Solidity,  
> 🚨 you are making an external call — and changing `msg.sender`

---

## 中文解釋

### `external` Calls

指透過「`cast call`、前端 dApp、或其他合約」等外部介面呼叫函式。這類呼叫必須經過 **ABI 編碼與解碼**，因為它是透過以太坊的 **RPC 介面** 或 **跨合約訊息傳遞** 進行的。**External call** 會建立新的呼叫上下文（context），因此 `msg.sender` 會變成這次呼叫的發出者（例如外部帳戶 EOA 或另一個合約）。

### `internal` Calls

指「由本合約自身或繼承的合約」在程式內部直接呼叫函式。這種呼叫不經過 **ABI** 處理，而是以 **EVM 的跳轉指令（JUMP）** 在同一個執行上下文中執行，速度較快，也不會改變 `msg.sender`。Internal 呼叫 **只能在合約內部或繼承的合約之間發生，外部帳戶（EOA）無法直接進行 internal call**。

### Summary
> **External call**：建立新上下文，`msg.sender` 變成呼叫者。  
> **Internal call**：同上下文執行，`msg.sender` 保持不變。
