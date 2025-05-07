# 🔄 ERC-20 vs. ERC-721 Token Standards

## Overview

| Feature            | ERC-20                         | ERC-721                          |
|--------------------|--------------------------------|----------------------------------|
| Type               | Fungible                       | Non-fungible                     |
| Uniqueness         | All tokens are identical       | Each token is unique             |
| Use Cases          | Currencies, utility tokens     | NFTs, digital art, game items    |
| Transfer Function  | `transfer()`                   | `safeTransferFrom()`             |
| Balance Function   | `balanceOf(address)`           | `balanceOf(address)`             |
| Ownership Function | N/A (all tokens are equal)     | `ownerOf(tokenId)`               |
| Metadata           | Optional via symbol/name       | Typically uses `tokenURI()`      |
| Token ID           | Not used                       | Required (`uint256 tokenId`)     |
| Events             | `Transfer`, `Approval`         | `Transfer`, `Approval`, `ApprovalForAll` |
| Batch Transfer     | Not supported                  | Not supported (see ERC-1155)     |

---

## Key Differences

### 🔁 Fungibility

- **ERC-20**: Every token unit is exactly the same (e.g., 1 USDC = 1 USDC).
- **ERC-721**: Each token has a unique ID and potentially unique metadata.

### 🧾 Identification

- **ERC-20**: Tokens are tracked by balances in an address.
- **ERC-721**: Tokens are tracked by their unique token IDs and owners.

### 🎯 Target Use Cases

- **ERC-20**: Ideal for ICOs, stablecoins, governance tokens.
- **ERC-721**: Ideal for digital ownership—NFTs like collectibles, virtual land, and certificates.

---

## When to Use

- Use **ERC-20** when tokens are interchangeable and divisible.
- Use **ERC-721** when each token needs to be distinct and individually tracked.

