# ERC-721 Tokens

## What is ERC-721?

ERC-721 is a widely adopted standard for **non-fungible tokens (NFTs)** on the Ethereum blockchain. Unlike ERC-20 tokens, which are interchangeable and identical (fungible), each ERC-721 token is **unique**, **indivisible**, and **distinguishable** from all others.

This uniqueness makes ERC-721 ideal for representing digital collectibles, art, game assets, domain names, and other **one-of-a-kind digital property**. Each token has its own identifier and can carry its own metadata, giving creators the flexibility to assign rich, meaningful content to each asset.

---

## Features of ERC-721 Tokens

- 🎯 **Uniqueness**: Each token has a unique `tokenId` and cannot be replaced or subdivided.
- 👤 **Ownership Tracking**: The Ethereum blockchain maintains a public, tamper-proof record of ownership.
- 🔄 **Transferability**: Tokens can be securely transferred between accounts or smart contracts.
- 🧾 **Metadata Support**: Each token is associated with a metadata URI pointing to descriptive JSON data.
- 🔗 **Interoperability**: Compatible with wallets, marketplaces (like OpenSea), and dApps that support the ERC-721 standard.

---

## Key Functions

ERC-721 defines the following core functions to manage ownership and interactions with NFTs:

```solidity
// Returns the number of tokens owned by an address
function balanceOf(address owner) external view returns (uint256 balance);

// Returns the current owner of a given tokenId
function ownerOf(uint256 tokenId) external view returns (address owner);

// Safely transfers tokenId from 'from' to 'to' (checks for ERC721Receiver)
function safeTransferFrom(address from, address to, uint256 tokenId) external;

// Same as above, with additional data parameter for extra context
function safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data) external;

// Transfers tokenId from 'from' to 'to' without safety checks
function transferFrom(address from, address to, uint256 tokenId) external;

// Approves another address to transfer the given tokenId
function approve(address to, uint256 tokenId) external;

// Authorizes or revokes an operator to manage all tokens of the caller
function setApprovalForAll(address operator, bool _approved) external;

// Returns the approved address for a particular tokenId
function getApproved(uint256 tokenId) external view returns (address operator);

// Checks if an operator is allowed to manage all of owner's assets
function isApprovedForAll(address owner, address operator) external view returns (bool);
```

These functions form the foundation of ERC-721's programmable ownership model, enabling minting, transferring, and delegating rights over non-fungible tokens.

---

## Example: Minting and Burning NFTs

Here's a minimal ERC-721 contract that allows the contract owner to mint new NFTs and token holders to burn them:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721, Ownable {
    uint256 public nextTokenId;

    constructor() ERC721("MyNFT", "MNFT") {}

    function mint(address to) public onlyOwner {
        _safeMint(to, nextTokenId);
        nextTokenId++;
    }

    function burn(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "You are not the owner");
        _burn(tokenId);
    }
}
```

---

## Metadata in ERC-721

NFTs are more than just ownership—they come with metadata. Each ERC-721 token can reference a metadata URI, typically returned by the `tokenURI()` function. This metadata is usually a JSON file containing fields such as name, description, image, and attributes:

```json
{
  "name": "Pepe NFT #1",
  "description": "A rare digital asset",
  "image": "https://example.com/nft/1.png",
  "attributes": [
    {
      "color": "green",
      "power": "999"
    }
  ]
}
```

---

## Static vs. Dynamic Metadata URI

ERC-721 tokens expose metadata via the `tokenURI()` function. There are two primary approaches to managing metadata URIs: static and dynamic.

### Static Metadata URI

In this model, the metadata URI is immutable and typically stored on IPFS or a web server. Once set, it does not change.

```solidity
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract StaticNFT is ERC721URIStorage {
    constructor() ERC721("StaticNFT", "SNFT") {}

    function mint(address to, string memory uri) public {
        uint256 tokenId = totalSupply();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }
}
```

Here, the `uri` parameter refers to the metadata URI assigned to the token.

### Dynamic Metadata URI

In a dynamic approach, the metadata URI returned by `tokenURI()` is generated at runtime. It can reflect real-time data or evolving states—ideal for interactive or gamified NFTs.

```solidity
import "@openzeppelin/contracts/utils/Strings.sol";

contract DynamicNFT is ERC721 {
    string public baseURI;

    constructor(string memory _baseURI) ERC721("DynamicNFT", "DNFT") {
        baseURI = _baseURI;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "Nonexistent token");
        return string(abi.encodePacked(baseURI, Strings.toString(tokenId), ".json"));
    }
}
```

---

## Use Cases for Static and Dynamic Metadata URI

| Approach          | Description                                             | Use Cases                              |
|-------------------|---------------------------------------------------------|----------------------------------------|
| **Static URI**    | Fixed metadata URI, usually IPFS-hosted                | Art NFTs, certificates, tickets        |
| **Dynamic URI**   | `tokenURI()` computes metadata URI based on conditions | Game items, evolving art, real-world data integration |

---

## References

- [ERC-721 Standard – EIP-721](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin ERC721 Documentation](https://docs.openzeppelin.com/contracts/4.x/api/token/erc721)

---

## Caution: Updating Metadata URIs

While `_setTokenURI()` allows you to define a metadata URI per token, it can be called multiple times for the same `tokenId`, thereby updating the URI.

Although technically permitted, updating a token’s metadata URI after minting can damage trust, especially in cases where immutability is expected (e.g., digital art, certificates, or collectibles). 

**Recommendations:**

- Avoid calling `_setTokenURI()` more than once per token unless your NFT is explicitly meant to evolve.
- Protect any function that calls `_setTokenURI()` with access control (`onlyOwner`, `onlyMinter`, etc.).
- If you need dynamic metadata, consider overriding `tokenURI()` instead of storing mutable URIs.

---


## Best Practices for NFT Storage and Decentralization Pitfalls

Storing your metadata URI on IPFS doesn't automatically make your NFT fully decentralized. It’s common to see IPFS metadata JSON files that reference centralized media files (e.g., images hosted on traditional web servers).

Example of a problematic metadata JSON:
```json
{
  "name": "Partially Decentralized NFT",
  "image": "https://myserver.com/image1.png"
}
```

**Issues:**

- The image can be changed or removed by the server owner.
- The NFT’s visual identity becomes mutable and unreliable.

**Recommendations:**

- Host **both** metadata JSON **and** media files (e.g., images, audio, video) on decentralized storage like IPFS or Arweave.
- Reference media using `ipfs://` URIs for full immutability:
  
```json
{
  "name": "Fully Decentralized NFT",
  "image": "ipfs://Qm.../image1.png"
}
```

- Avoid pointing to assets on centralized servers unless your project explicitly supports dynamic or mutable media.

Fully decentralized NFTs maintain their integrity over time, ensuring collectors and marketplaces see consistent content.

---


