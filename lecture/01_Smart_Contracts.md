# Introduction to Smart Contracts

## 1. What is a Smart Contract?

A **smart contract** is:

> A program that automatically executes the terms of an agreement.

According to Nick Szabo:

> "A smart contract is a set of promises, specified in digital form, including protocols within which the parties perform on these promises."

---

## 2. Why Smart Contracts?

Traditional contracts require:

- Trust
- Intermediaries (banks, lawyers)
- Enforcement mechanisms

Smart contracts aim to:

- Reduce **trust**
- Remove **intermediaries**
- Enable **automatic execution**
- Lower **transaction costs**

---

## 3. Core Logic

Smart contracts follow simple logic:

IF condition is met
THEN execute action

Example:

IF payment received
THEN transfer asset

---

## 4. The Vending Machine Analogy

A classic analogy:

> A vending machine is a primitive smart contract.

### How it works:

1. Insert money
2. Select product
3. Machine delivers automatically

No trust required.

---

## 5. Mapping to Smart Contracts

| Vending Machine | Smart Contract |
|----------------|----------------|
| Insert coin | Send transaction |
| Press button | Call function |
| Machine logic | Solidity code |
| Get product | Receive output |
| No refund if broken 😅 | Bug = loss of funds |

---

## 6. Key Properties

### Automation
Execution is automatic.

### Trust Minimization
Trust the code, not people.

### Deterministic
Same input → same output.

### No Intermediaries
No middleman.

---

## 7. Important Clarifications

Smart contracts are:

- NOT smart (no AI)
- NOT legal contracts
- NOT flexible after deployment

They are:

> Programs that enforce rules automatically.

---

## 8. What Blockchain Adds

Without blockchain:

- You must trust a central server

With blockchain:

- Code runs on decentralized nodes
- Execution is transparent
- Data is tamper-resistant

---

## 9. Limitations

### Code is law
Bugs = real financial loss

### No real-world data
Requires oracles

### Irreversible
No undo

### Limited expressiveness
Legal nuance is hard to encode

---

## 10. Why This Matters

Smart contracts enable:

- DeFi
- DAOs
- NFTs
- Token economies

They are the foundation of Web3.
