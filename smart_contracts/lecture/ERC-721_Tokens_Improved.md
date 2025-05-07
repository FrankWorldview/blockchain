# ERC-721 Tokens

## What is ERC-721?

ERC-721 is the first widely adopted standard for creating **non-fungible tokens (NFTs)** on the Ethereum blockchain. Unlike ERC-20 tokens, which are identical and interchangeable (fungible), each ERC-721 token is **unique**, **indivisible**, and **distinct**.

This standard provides a structured way to represent ownership of digital assets that are one-of-a-kind—such as digital art, collectibles, game items, and virtual real estate. Each token has its own identifier (`tokenId`) and can link to rich metadata via the `tokenURI` function, allowing developers to assign detailed descriptions, images, and attributes to each asset.

ERC-721 has become the foundation of the modern NFT ecosystem, enabling transparent, verifiable ownership and trading of unique digital content across decentralized marketplaces.


---

## Features of ERC-721 Tokens

- 🎯 **Uniqueness**: Each token has a unique `tokenId` and cannot be replaced or subdivided.
- 👤 **Ownership Tracking**: The Ethereum blockchain maintains a public, tamper-proof record of ownership.
- 🔄 **Transferability**: Tokens can be securely transferred between accounts or smart contracts.
- 🧾 **Metadata Support**: Every token can be linked to a JSON metadata file that describes its properties.
- 🔗 **Interoperability**: Compatible with wallets, marketplaces (like OpenSea), and dApps that support the ERC-721 standard.

---

## Key Functions

ERC-721 defines the following core functions to manage ownership and interactions with NFTs:

```solidity
// Returns the number of NFTs owned by a specific address
function balanceOf(address owner) external view returns (uint256 balance);

// Returns the address currently owning the given tokenId
function ownerOf(uint256 tokenId) external view returns (address owner);

// Safely transfers tokenId from one address to another, checking for ERC721Receiver compliance
function safeTransferFrom(address from, address to, uint256 tokenId) external;

// Overloaded version of safeTransferFrom, allowing additional data to be sent with the transfer
function safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data) external;

// Transfers tokenId from one address to another (unsafe version – may break if recipient is not a smart contract)
function transferFrom(address from, address to, uint256 tokenId) external;

// Grants permission to another address to transfer a specific tokenId
function approve(address to, uint256 tokenId) external;

// Approves or removes another address as an operator for all tokens owned by the caller
function setApprovalForAll(address operator, bool _approved) external;

// Returns the address currently approved to transfer a specific tokenId
function getApproved(uint256 tokenId) external view returns (address operator);

// Checks if an operator is approved to manage all tokens owned by a given address
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

NFTs are more than just ownership—they come with data. Each ERC-721 token can reference metadata, typically returned by the `tokenURI()` function. This metadata is usually a JSON file with information like the name, description, image, and traits:

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

## Static vs Dynamic `tokenURI`

ERC-721 tokens expose metadata through the `tokenURI()` function. This section compares static and dynamic implementations of `tokenURI`.

### Static tokenURI

The `tokenURI` is immutable and stored on IPFS or a centralized server. Once set, it doesn't change over time.

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

### Dynamic tokenURI

In this model, the `tokenURI` is generated at runtime. It can reflect evolving properties—ideal for gamified or upgradable NFTs.

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

## Use Cases for Static and Dynamic tokenURI

| tokenURI Type | Description | Use Cases |
|---------------|-------------|-----------|
| **Static**    | Fixed JSON files stored on IPFS or web server. | Art NFTs, certificates, tickets |
| **Dynamic**   | `tokenURI` computed based on on-chain/off-chain logic. | Game items, evolving artwork, real-world integration |

---

## References

- [ERC-721 Standard – EIP-721](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin ERC721 Documentation](https://docs.openzeppelin.com/contracts/4.x/api/token/erc721)

