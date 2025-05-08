# ERC-20 vs. ERC-721 Tokens

## Introduction

Ethereum supports several token standards to represent assets digitally. Among these, **ERC-20** and **ERC-721** are the most widely adopted. While ERC-20 is used for fungible tokens, ERC-721 is used for non-fungible tokens (NFTs). This document compares the two standards and presents common use cases.

---

## Comparison Table

| Feature                | ERC-20                         | ERC-721                         |
|------------------------|----------------------------------|----------------------------------|
| Token Type            | Fungible                       | Non-Fungible                    |
| Fungibility           | Yes                            | No                              |
| Unique Identifier     | No                             | Yes (`tokenId`)                 |
| Metadata              | Optional                       | Required (`tokenURI`)           |
| Transfer Function     | `transfer()`                   | `safeTransferFrom()`            |
| Ownership Tracking    | `balanceOf(address)`           | `ownerOf(tokenId)`              |
| Standard Interfaces   | Simple                         | More complex                    |
| Gas Efficiency        | More efficient                 | More expensive                  |

---

## Use Case Examples

| Use Case                    | ERC-20 Example           | ERC-721 Example                 |
|-----------------------------|---------------------------|----------------------------------|
| Stablecoin                  | USDC, DAI                 | ❌ Not suitable                  |
| Governance Token            | UNI, COMP                 | ❌ Not suitable                  |
| NFT Collectibles            | ❌ Not applicable          | CryptoPunks, Bored Apes         |
| Gaming Assets               | In-game currency          | Unique weapons, characters      |
| Domain Names                | ❌ Not applicable          | ENS (Ethereum Name Service)     |
| Event Tickets               | ❌ Not ideal               | Tokenized event access passes   |
| Real Estate Tokenization    | Shares in REIT-like model | Unique property ownership        |

---

## Conclusion

- **ERC-20** is best suited for fungible assets like currencies, utility tokens, and voting rights.
- **ERC-721** is ideal for unique, indivisible assets such as collectibles, tickets, and certificates.
- The choice of token standard depends on the nature of the asset and the application's requirements.

---

## References

- [ERC-20 Specification](https://eips.ethereum.org/EIPS/eip-20)
- [ERC-721 Specification](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin Documentation](https://docs.openzeppelin.com/contracts/)
