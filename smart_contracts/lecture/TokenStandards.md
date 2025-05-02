# 🚀 Ethereum Token Standards Tutorial: ERC-20 & ERC-721

Welcome to this tutorial on Ethereum's two most widely-used token standards: **ERC-20** for fungible tokens and **ERC-721** for non-fungible tokens (NFTs). This guide is designed for students and developers looking to understand how these standards work and how they are used in decentralised applications.

---

## 🪙 Part 1: ERC-20 — The Fungible Token Standard

### 🔍 What is ERC-20?

ERC-20 defines a **standard interface** for fungible tokens on Ethereum. Each token unit is **identical, divisible, and interchangeable**.

> 📌 Example: 1 USDC = 1 USDC, regardless of who owns it.

### 🛠️ Key Functions

| Function | Description |
|----------|-------------|
| `totalSupply()` | Total number of tokens in circulation |
| `balanceOf(address)` | Token balance of a specific address |
| `transfer(address to, uint256 amount)` | Send tokens to another address |
| `approve(address spender, uint256 amount)` | Authorise another address to spend tokens |
| `allowance(owner, spender)` | View remaining allowance for a spender |
| `transferFrom(from, to, amount)` | Send tokens on someone’s behalf (after approval) |

### 🪄 Events

- `Transfer(from, to, value)`
- `Approval(owner, spender, value)`

### 📦 Use Cases

- Stablecoins like USDC, USDT
- DeFi tokens for lending, liquidity
- Governance tokens for voting

---

## 🎨 Part 2: ERC-721 — The Non-Fungible Token Standard

### 🔍 What is ERC-721?

ERC-721 defines a standard for **non-fungible tokens** — each token is **unique**, **indivisible**, and represents something specific.

> 📌 Example: An NFT artwork or a CryptoKitty collectible.

### 🛠️ Key Functions

| Function | Description |
|----------|-------------|
| `balanceOf(owner)` | Number of NFTs owned |
| `ownerOf(tokenId)` | Returns owner of a specific token |
| `safeTransferFrom(from, to, tokenId)` | Securely transfers ownership |
| `transferFrom(from, to, tokenId)` | Basic transfer (less safe) |
| `approve(to, tokenId)` | Approves someone to transfer a specific token |
| `setApprovalForAll(operator, approved)` | Grants or revokes access to all tokens |
| `getApproved(tokenId)` | Approved address for single token |
| `isApprovedForAll(owner, operator)` | Checks global approval status |

### 🪄 Events

- `Transfer(from, to, tokenId)`
- `Approval(owner, approved, tokenId)`
- `ApprovalForAll(owner, operator, approved)`

---

## 🖼️ ERC-721 Metadata Extension

Allows each NFT to carry descriptive metadata like images and attributes.

### Functions

```solidity
function name() external view returns (string memory);
function symbol() external view returns (string memory);
function tokenURI(uint256 tokenId) external view returns (string memory);
