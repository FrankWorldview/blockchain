# 🎓 Ethereum Token Standards: ERC-20 and ERC-721

This tutorial introduces two key Ethereum token standards: **ERC-20** (fungible tokens) and **ERC-721** (non-fungible tokens, aka NFTs). These standards define how tokens behave and interact with smart contracts, wallets, and dApps.

---

## 🔹 ERC-20: The Fungible Token Standard

### 📌 What is ERC-20?

ERC-20 defines a **standard interface** for fungible tokens. Fungible means that **each unit is the same as every other unit** (just like money).

> 🪙 Example: 1 USDC = 1 USDC, no matter who owns it.

### 🔧 Core Functions

| Function | Description |
|---------|-------------|
| `totalSupply()` | Total number of tokens in circulation |
| `balanceOf(address)` | Returns token balance of an address |
| `transfer(address to, uint256 amount)` | Sends tokens to another address |
| `approve(address spender, uint256 amount)` | Authorizes someone to spend tokens on your behalf |
| `allowance(address owner, address spender)` | Shows how much `spender` can spend from `owner` |
| `transferFrom(address from, address to, uint256 amount)` | Sends tokens after approval |

### 📢 Events

- `Transfer(address from, address to, uint256 value)`
- `Approval(address owner, address spender, uint256 value)`

### 📘 Use Cases

- Stablecoins (USDC, USDT)
- DeFi tokens (UNI, AAVE)
- Staking, rewards, and governance

---

## 🎨 ERC-721: The Non-Fungible Token Standard

### 📌 What is ERC-721?

ERC-721 defines a standard for **non-f**
