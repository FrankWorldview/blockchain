# ERC-20 vs. ERC-721 Tokens

## Overview

Ethereum supports various token standards to represent digital assets. Two of the most widely used are **ERC-20** and **ERC-721**. Understanding their differences is crucial for building or investing in decentralized applications (dApps), DeFi, NFTs, and blockchain games.

---

## ERC-20 Tokens

ERC-20 is the technical standard for **fungible tokens**, meaning each token unit is identical and interchangeable.

### Key Characteristics

- 🔁 Fungible (1 token = 1 token)
- 💳 Used for currencies, utility tokens, staking, and governance
- 📥 Standard interface: `balanceOf()`, `transfer()`, `approve()`, `transferFrom()`

### Common Use Cases

- Stablecoins (e.g., USDC, DAI)
- Governance tokens (e.g., UNI, COMP)
- Staking and yield farming
- In-app or in-game currencies
- Tokenized shares or commodities

---

## ERC-721 Tokens

ERC-721 is the standard for **non-fungible tokens (NFTs)** — each token is unique and identifiable by a `tokenId`.

### Key Characteristics

- 🧬 Non-fungible (each token is unique)
- 🖼️ Used for digital art, collectibles, gaming assets, and certificates
- 🌐 Supports metadata and media via `tokenURI()`

### Common Use Cases

- Digital collectibles (e.g., CryptoPunks, Bored Apes)
- NFT art and music
- Virtual land and in-game items
- Event tickets and digital credentials
- Real-world assets (tokenized real estate, diplomas)

---

## Comparison Table

| Feature                   | ERC-20                         | ERC-721                        |
|--------------------------|----------------------------------|--------------------------------|
| Fungibility              | Yes                            | No                             |
| Token Type               | Fungible                       | Non-Fungible                   |
| Token ID                 | None (just balances)           | Unique `tokenId`               |
| Metadata Support         | Optional                       | Built-in (`tokenURI`)          |
| Transfer Method          | `transfer()`                   | `safeTransferFrom()`           |
| Ownership Tracking       | `balanceOf(address)`           | `ownerOf(tokenId)`             |
| Gas Cost (Transfer)      | Lower                          | Higher                         |
| Use Case Type            | Value transfer, DeFi           | NFTs, collectibles, uniqueness |
| Examples                 | USDC, LINK, AAVE               | CryptoKitties, Decentraland    |

---

## Summary

- Use **ERC-20** for interchangeable assets like currencies and voting power.
- Use **ERC-721** when each asset needs to be unique, verifiable, and traceable.
- Both standards are supported by major wallets, exchanges, and dApps.

---

## References

- [ERC-20: Token Standard](https://eips.ethereum.org/EIPS/eip-20)
- [ERC-721: Non-Fungible Token Standard](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin ERC-20 Guide](https://docs.openzeppelin.com/contracts/4.x/erc20)
- [OpenZeppelin ERC-721 Guide](https://docs.openzeppelin.com/contracts/4.x/erc721)
