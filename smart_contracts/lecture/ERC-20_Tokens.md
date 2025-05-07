# ERC-20 Tokens

## What is ERC-20?

ERC-20 is a technical standard for fungible tokens on the Ethereum blockchain. It defines a set of rules that all compliant tokens must follow, making it easier for wallets, exchanges, and other smart contracts to interact with them in a consistent way.

---

## Key Functions

ERC-20 tokens must implement the following functions:

```solidity
// Returns the total number of tokens in circulation
function totalSupply() external view returns (uint256);

// Returns the balance of a specific address
function balanceOf(address account) external view returns (uint256);

// Transfers tokens from the caller to a specified recipient
function transfer(address recipient, uint256 amount) external returns (bool);

// Returns how many tokens a spender is still allowed to spend on behalf of the owner
function allowance(address owner, address spender) external view returns (uint256);

// Sets an allowance so that the spender can transfer tokens on the owner’s behalf
function approve(address spender, uint256 amount) external returns (bool);

// Transfers tokens from one address to another using the allowance mechanism
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