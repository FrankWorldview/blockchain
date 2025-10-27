# ERC-20 Tokens

## What is ERC-20?

ERC-20 is a technical standard for fungible tokens on the Ethereum blockchain. It defines a set of rules that all compliant tokens must follow, making it easier for wallets, exchanges, and other smart contracts to interact with them in a consistent way.

---

## Features of ERC-20 Tokens

- **Fungibility**: Each token is identical and interchangeable with another token of the same type.
- **Interoperability**: Compatible with wallets, decentralized exchanges (DEXs), and DeFi platforms.
- **Standardization**: Simplifies token creation and ensures uniform behavior across applications.
- **Event Tracking**: Emits events (`Transfer` and `Approval`) for off-chain monitoring and UI updates.
- **Allowance Mechanism**: Enables delegated token transfers via `approve` and `transferFrom`.

---

## Key Functions

ERC-20 tokens must implement the following functions:

```solidity
// Returns the total number of tokens in circulation
// 回傳目前整個代幣（token）的 總發行量。也就是合約中「所有存在的 token 數量」，通常在部署時就被設定，或透過 mint / burn 動態改變。
// 💡 任何人皆可查央行公布的「流通中貨幣總量」。
function totalSupply() external view returns (uint256);

// Returns the balance of a specific address
// 查詢某個地址（account）目前擁有多少 token。這是最常被前端 dApp 呼叫的函式之一。
// 💡 任何人皆可某 account 的銀行帳戶餘額。
function balanceOf(address account) external view returns (uint256);

// Transfers tokens from the caller to a specified recipient
// 從「呼叫者自己」（msg.sender）的帳戶，把 amount 數量的 token 轉給目標地址 recipient。執行成功會回傳 true。
// 💡 你自己轉錢給別人。
function transfer(address recipient, uint256 amount) external returns (bool);

// Returns how many tokens a spender is still allowed to spend on behalf of the owner
// 查詢某個 spender 目前還能代替 owner 花多少 token。這是配合 approve / transferFrom 一起使用的「授權額度機制」。
// 💡 任何人都可查 spender 的剩餘可用額度。
function allowance(address owner, address spender) external view returns (uint256);

// Sets an allowance so that the spender can transfer tokens on the owner’s behalf
// 授權 spender 可以代替你（msg.sender）花費最多 amount 的 token。成功後會觸發 Approval 事件，供前端追蹤。
// 💡 你告訴銀行：「我允許 spender 代我支付最高 X 元。」
function approve(address spender, uint256 amount) external returns (bool);

// Transfers tokens from one address to another using the allowance mechanism
// 讓 spender（呼叫這個函式的人）代表 sender，把 amount token 從 sender 帳戶轉給 recipient。這必須在 sender 先用 approve() 授權後才能進行。
// 💡 Spender 代花別人的錢，但前提是已得到對方授權。
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

These functions provide a standardized way of transferring tokens, checking balances, and managing allowances.

---

## Events

ERC-20 also includes the following events to track token movements and approvals:

```solidity
// Emitted when tokens are transferred from one account to another
event Transfer(address indexed from, address indexed to, uint256 value);

// Emitted when a new allowance is set via approve()
event Approval(address indexed owner, address indexed spender, uint256 value);
```

---

## Example: Creating Your Own ERC-20 Token

Here is an example of a basic ERC-20 token using OpenZeppelin’s library:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// A simple ERC-20 token called CoolToken with symbol COOL
contract CoolToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("CoolToken", "COOL") {
        _mint(msg.sender, initialSupply); // Mint the initial supply to the deployer
    }
}
```

### How It Works

- `ERC20("CoolToken", "COOL")` sets the name and symbol.
- `_mint(msg.sender, initialSupply)` creates an initial supply of tokens and assigns them to the contract deployer.

You can deploy this contract and use it as your own custom cryptocurrency.

---

## Summary

- ERC-20 tokens are fungible and interoperable across the Ethereum ecosystem.
- They follow a standardized interface for ease of use.
- You can create your own token with just a few lines of code using OpenZeppelin’s library.

---

## References

- [ERC-20: Non-Fungible Token Standard](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin ERC-20 Implementation](https://docs.openzeppelin.com/contracts/5.x/api/token/erc20)
