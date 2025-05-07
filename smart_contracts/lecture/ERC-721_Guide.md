# ERC-721 Tokens

ERC-721 is a standard for **non-fungible tokens (NFTs)** on the Ethereum blockchain. Unlike ERC-20 tokens, each ERC-721 token is unique and indivisible.

---

## 🔑 Key Features

- **Uniqueness**: Each token has a unique ID.
- **Non-divisible**: Cannot be split like ERC-20 tokens.
- **Ownership**: Ownership can be transferred and tracked on-chain.

---

## 📜 Interface Overview

```solidity
interface IERC721 {
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);

    function balanceOf(address owner) external view returns (uint256 balance);
    function ownerOf(uint256 tokenId) external view returns (address owner);

    function safeTransferFrom(address from, address to, uint256 tokenId) external;
    function transferFrom(address from, address to, uint256 tokenId) external;

    function approve(address to, uint256 tokenId) external;
    function getApproved(uint256 tokenId) external view returns (address operator);

    function setApprovalForAll(address operator, bool _approved) external;
    function isApprovedForAll(address owner, address operator) external view returns (bool);
}
```

---

## 🎯 Use Cases

- Digital Art
- Collectibles
- Game Items
- Virtual Real Estate

---

## 💡 Example Contract

```solidity
// Basic ERC-721 implementation
contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") {}

    function mint(address to, uint256 tokenId) public {
        _mint(to, tokenId);
    }
}
```
