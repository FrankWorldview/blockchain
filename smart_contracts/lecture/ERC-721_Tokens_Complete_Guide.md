# ERC-721 Tokens

## What is ERC-721?

ERC-721 is a standard interface for non-fungible tokens (NFTs) on the Ethereum blockchain. Unlike fungible tokens (such as those following the ERC-20 standard), each ERC-721 token is unique and distinct. This makes the standard ideal for representing ownership of digital collectibles, artworks, domain names, and other one-of-a-kind assets.

---

## Features of ERC-721 Tokens

- **Uniqueness**: Each token has a distinct identifier (`tokenId`) and cannot be replaced or divided.
- **Ownership Tracking**: The blockchain tracks the owner of each token.
- **Transferability**: Tokens can be transferred between users or smart contracts.
- **Metadata Support**: Each token can point to metadata that describes the asset it represents.
- **Interoperability**: Works seamlessly with wallets, marketplaces, and dApps that support the standard.

---

## Key Functions

```solidity
// Returns the number of tokens owned by `owner`
function balanceOf(address owner) external view returns (uint256 balance);

// Returns the owner of the `tokenId` token
function ownerOf(uint256 tokenId) external view returns (address owner);

// Transfers `tokenId` from `from` to `to` safely
function safeTransferFrom(address from, address to, uint256 tokenId) external;

// Transfers `tokenId` from `from` to `to` with data
function safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data) external;

// Transfers `tokenId` from `from` to `to` without safety checks
function transferFrom(address from, address to, uint256 tokenId) external;

// Approves `to` to transfer the `tokenId` token
function approve(address to, uint256 tokenId) external;

// Approves or revokes `operator` to manage all of caller's tokens
function setApprovalForAll(address operator, bool _approved) external;

// Returns the approved account for `tokenId`
function getApproved(uint256 tokenId) external view returns (address operator);

// Returns whether `operator` is approved to manage all of `owner`'s assets
function isApprovedForAll(address owner, address operator) external view returns (bool);
```

---

## Example: Mint and Burn NFTs

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

## Metadata and Example

ERC-721 tokens support metadata, typically returned via the `tokenURI` function. The metadata is usually a JSON file following this structure:

```json
{
  "name": "Cool NFT #1",
  "description": "A rare digital asset",
  "image": "https://example.com/nft/1.png",
  "attributes": [
    {
      "trait_type": "Rarity",
      "value": "Epic"
    }
  ]
}
```

---

## Dynamic and Static Metadata

### Static Metadata

Stored on IPFS or a centralized server. Each token has a fixed URI set during minting and doesn't change over time.

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

### Dynamic Metadata

Generated on-demand by overriding `tokenURI`. Often used when the token’s properties or visuals may change.

```solidity
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

## Example of Setting and Getting Dynamic tokenURI

```solidity
function setBaseURI(string memory newBaseURI) public onlyOwner {
    baseURI = newBaseURI;
}

function tokenURI(uint256 tokenId) public view override returns (string memory) {
    return string(abi.encodePacked(baseURI, Strings.toString(tokenId), ".json"));
}
```

---

## Example of Setting and Getting Static tokenURI

```solidity
function mintWithURI(address to, string memory tokenURI) public onlyOwner {
    uint256 tokenId = nextTokenId;
    _safeMint(to, tokenId);
    _setTokenURI(tokenId, tokenURI);
    nextTokenId++;
}

function tokenURI(uint256 tokenId) public view override returns (string memory) {
    return super.tokenURI(tokenId);
}
```

---

## References

- [ERC-721 Specification – EIP-721](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin ERC721 Documentation](https://docs.openzeppelin.com/contracts/4.x/api/token/erc721)