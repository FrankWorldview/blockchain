# Introduction to ERC-20 Tokens

ERC-20 is a technical standard for tokens on the Ethereum blockchain. It defines a set of rules that all Ethereum tokens must follow, enabling interoperability between different tokens and platforms. It is the most widely adopted standard for fungible tokens.

## Key Features

- **Fungibility**: Each token is identical in type and value.
- **Interoperability**: Can be used across various platforms like wallets, exchanges, and dApps.
- **Standardization**: Ensures consistent functionality and integration.

## Standard ERC-20 Functions

```solidity
function totalSupply() external view returns (uint256);
function balanceOf(address account) external view returns (uint256);
function transfer(address to, uint256 amount) external returns (bool);
function allowance(address owner, address spender) external view returns (uint256);
function approve(address spender, uint256 amount) external returns (bool);
function transferFrom(address from, address to, uint256 amount) external returns (bool);
```

## Standard ERC-20 Events

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
event Approval(address indexed owner, address indexed spender, uint256 value);
```

## Example Use Cases

- **Stablecoins** like USDC, DAI
- **Utility Tokens** for platform-specific services
- **Governance Tokens** in DAOs

## Limitations

- **No built-in support for token metadata**
- **Does not prevent accidental transfers to contracts without `onERC20Received`**

## Real-World Analogy

ERC-20 tokens are like arcade tokens: each one is interchangeable, and they follow a common system so all machines can accept them.

---

*This content is intended for student instruction and follows American English conventions.*
