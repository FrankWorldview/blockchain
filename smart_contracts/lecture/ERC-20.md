# 📘 Introduction to ERC-20 Tokens

## 1. What is an ERC-20 Token?

**ERC-20** is the most widely adopted standard for fungible tokens on the Ethereum blockchain. Proposed by Fabian Vogelsteller and Vitalik Buterin in 2015, it defines a common interface for tokens that are:

- **Fungible**: Every token is identical in type and value.
- **Interoperable**: Can be used in wallets, exchanges, and dApps without custom integration.
- **Trackable**: All balances and transfers are recorded on-chain.

## 2. Why Use ERC-20?

- ✅ **Standardization**: Promotes compatibility across the Ethereum ecosystem.
- 🔐 **Security**: Well-audited implementations (like OpenZeppelin’s) reduce vulnerabilities.
- 🔁 **Reusability**: Developers can inherit a battle-tested contract.

## 3. Key Components of the ERC-20 Interface

The **OpenZeppelin** implementation of ERC-20 includes the following functions and events, as specified by [EIP-20](https://eips.ethereum.org/EIPS/eip-20).

### ✅ Functions

| Function | Description |
|----------|-------------|
| `totalSupply()` | Returns the total number of tokens in existence. |
| `balanceOf(address account)` | Returns the token balance of an account. |
| `transfer(address to, uint256 amount)` | Transfers tokens from the caller to another address. |
| `approve(address spender, uint256 amount)` | Approves another address to spend tokens on behalf of the caller. |
| `allowance(address owner, address spender)` | Returns the remaining tokens a spender is allowed to withdraw from the owner. |
| `transferFrom(address from, address to, uint256 amount)` | Transfers tokens using the allowance mechanism. |

### 📢 Events

| Event | Description |
|-------|-------------|
| `Transfer(address indexed from, address indexed to, uint256 value)` | Emitted when tokens are transferred. |
| `Approval(address indexed owner, address indexed spender, uint256 value)` | Emitted when an approval is made. |

## 4. Example: Using OpenZeppelin’s ERC20 Contract

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("CoolToken", "COOL") {
        _mint(msg.sender, initialSupply);
    }
}
```

### 🛠️ Explanation

- `ERC20("CoolToken", "COOL")`: Sets the token name and symbol.
- `_mint(msg.sender, initialSupply)`: Mints the initial supply to the deployer's address.

---

## 5. Best Practices

- Use **OpenZeppelin Contracts** to avoid security issues.
- Avoid overriding core functions unless absolutely necessary.
- Add functionality (e.g., pausing, burning) via extensions like `ERC20Burnable`, `Pausable`.

---

## 6. Common Pitfalls

| Pitfall | Consequence |
|--------|-------------|
| Not emitting `Transfer` or `Approval` events | Breaks compatibility with dApps and explorers. |
| Incorrect use of `approve()` | Can lead to double-spending. Use `increaseAllowance()` / `decreaseAllowance()` instead. |
| Manually tracking balances | Prone to bugs and security issues. Let OpenZeppelin handle it. |

## Reference
- [ERC-20: Token Standard](https://eips.ethereum.org/EIPS/eip-20)
