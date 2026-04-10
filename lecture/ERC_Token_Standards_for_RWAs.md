# Key ERC Standards for Tokenized Real-World Assets (RWAs)

## Introduction

Tokenizing real-world assets (RWAs) — such as real estate, commodities, securities, and physical goods — is one of the most promising applications of blockchain technology. Several Ethereum token standards have been designed or adapted to support this effort. This document introduces the most important ERC standards for RWAs.

---

## Major ERC Standards for RWAs

### ✅ ERC-20: Fungible Token Standard
- **Use Case**: Fractional ownership of assets (e.g., tokenized shares or gold)
- **Characteristics**: All tokens are identical and interchangeable.
- **Examples**:
  - Tokenized fiat currencies (e.g., USDC)
  - Gold-backed tokens (e.g., PAXG)
  - Real estate investment pools

### ✅ ERC-721: Non-Fungible Token Standard
- **Use Case**: Unique asset tokenization (e.g., a specific property or certificate)
- **Characteristics**: Each token has a unique `tokenId`.
- **Examples**:
  - Land deeds
  - Artwork certificates
  - Individual items in luxury goods

### ✅ ERC-1155: Multi-Token Standard
- **Use Case**: Efficient transfer and management of both fungible and non-fungible tokens in a single contract
- **Characteristics**: Batch operations and mixed asset types
- **Examples**:
  - Warehousing receipts (same product, different lots)
  - Semi-fungible tokenized items like event tickets

### ✅ ERC-4626: Tokenized Vault Standard
- **Use Case**: Asset-backed vaults with yield strategies
- **Characteristics**: Standardized deposit/withdrawal accounting
- **Examples**:
  - Real estate yield vaults
  - Tokenized investment funds (e.g., REITs)

### ✅ ERC-3643: Permissioned Token Standard (a.k.a. T-REX)
- **Use Case**: Regulatory-compliant RWA tokenization
- **Characteristics**: Role-based access, KYC/AML checks, transfer restrictions
- **Examples**:
  - Tokenized securities (e.g., equity or debt)
  - Compliant real estate tokens

---

## Summary Table

| ERC Standard | Token Type      | Supports Fungibility | RWA Use Cases                          | Notable Features                          |
|--------------|------------------|-----------------------|----------------------------------------|--------------------------------------------|
| ERC-20       | Fungible         | ✅ Yes                | Shares, stablecoins, gold              | Simple, widely supported                  |
| ERC-721      | Non-Fungible     | ❌ No                 | Property, certificates, luxury items   | Unique metadata via `tokenURI()`          |
| ERC-1155     | Multi-Token      | ✅ Partial            | Batch logistics, multi-asset products  | Mixed fungible & non-fungible             |
| ERC-4626     | Vaults           | ✅ Yes                | Real estate funds, asset yield vaults  | Standardized yield-bearing vault interface |
| ERC-3643     | Permissioned     | ✅ Yes                | Regulated securities, tokenized equity | Compliance built into token logic         |

---

## Conclusion

The rise of tokenized real-world assets has driven the adoption and development of various ERC standards, each tailored to specific asset types and regulatory requirements. When choosing an ERC standard, developers and issuers must consider:
- Fungibility
- Regulatory compliance
- Metadata and asset traceability
- Integration with DeFi and existing platforms

---

## References

- [ERC-20: Fungible Token Standard](https://eips.ethereum.org/EIPS/eip-20)
- [ERC-721: Non-Fungible Token Standard](https://eips.ethereum.org/EIPS/eip-721)
- [ERC-1155: Multi-Token Standard](https://eips.ethereum.org/EIPS/eip-1155)
- [ERC-4626: Tokenized Vaults](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-3643: T-REX Standard](https://eips.ethereum.org/EIPS/eip-3643)
