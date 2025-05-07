# ERC-721 Tokens

ERC-721 is a standard interface for non-fungible tokens (NFTs), which are unique and cannot be interchanged like fungible tokens (e.g., ERC-20). Each ERC-721 token has a unique identifier and can represent ownership of a unique asset, such as digital art, collectibles, or even real estate.

## Key Characteristics

- **Non-Fungibility**: Each token has a unique ID.
- **Ownership Tracking**: Ownership is recorded on-chain.
- **Metadata**: Tokens can have associated metadata to describe the asset.
- **Transferable**: Can be transferred between users like other tokens.

## Metadata in ERC-721
Metadata provides descriptive information about a token. ERC-721 supports two types of metadata:

### Static Metadata

- Hardcoded in the contract or stored on IPFS/Arweave.
- Example: A fixed image or description that never changes.

### Dynamic Metadata

- Generated on-the-fly by a web service (e.g., returning JSON from an API).
- Useful for evolving NFTs, game assets, or tokens that reflect real-world states.

Example JSON metadata structure:

```json
{
  "name": "Cool NFT #1",
  "description": "An awesome NFT with dynamic traits.",
  "image": "https://example.com/images/1.png",
  "attributes": [
    {
      "trait_type": "Rarity",
      "value": "Legendary"
    }
  ]
}
```

Smart contracts often expose a `tokenURI(uint256 tokenId)` function that returns a URL pointing to this metadata.

## Use Cases

- **Digital Art**: Each piece has a unique token.
- **Gaming**: Unique in-game items like swords or avatars.
- **Identity**: Representing unique user identities or credentials.
- **Collectibles**: Digital trading cards or badges.

## Example: Using Dynamic Metadata with ERC-721

Dynamic metadata is useful for NFTs whose attributes or visuals may change over time, such as game items, evolving artwork, or on-chain status tokens.

Instead of storing the entire metadata URI on-chain using `ERC721URIStorage`, the contract only stores a base URI. The full metadata URI is generated on the fly using the `tokenId`.

Here’s an example using `ERC721` (not `ERC721URIStorage`) for dynamic metadata:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract DynamicNFT is ERC721, Ownable {
    uint256 public nextTokenId;
    string public baseURI;

    constructor(string memory _baseURI) ERC721("DynamicNFT", "DYN") {
        baseURI = _baseURI;
    }

    function mint(address to) external onlyOwner {
        _safeMint(to, nextTokenId);
        nextTokenId++;
    }

    // Overrides the tokenURI function to construct metadata URI dynamically
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return string(abi.encodePacked(baseURI, Strings.toString(tokenId), ".json"));
    }

    // Allows owner to update base URI
    function setBaseURI(string memory _newBaseURI) external onlyOwner {
        baseURI = _newBaseURI;
    }
}
```

### Notes:

- The contract uses a `baseURI` like `https://api.example.com/metadata/`.
- The `tokenURI()` function appends the token ID to this base path.
- Metadata can be updated off-chain by modifying the server response at the corresponding URL.
- This saves gas and allows metadata to evolve without modifying the smart contract.


## References

- [ERC-721 Specification](https://eips.ethereum.org/EIPS/eip-721



## Metadata in ERC-721
Metadata provides descriptive information about a token. ERC-721 supports two types of metadata:

### Static Metadata

- Hardcoded in the contract or stored on IPFS/Arweave.
- Example: A fixed image or description that never changes.

### Dynamic Metadata

- Generated on-the-fly by a web service (e.g., returning JSON from an API).
- Useful for evolving NFTs, game assets, or tokens that reflect real-world states.

Example JSON metadata structure:

```json
{
  "name": "Cool NFT #1",
  "description": "An awesome NFT with dynamic traits.",
  "image": "https://example.com/images/1.png",
  "attributes": [
    {
      "trait_type": "Rarity",
      "value": "Legendary"
    }
  ]
}
```

Smart contracts often expose a `tokenURI(uint256 tokenId)` function that returns a URL pointing to this metadata.

## Use Cases

- **Digital Art**: Each piece has a unique token.
- **Gaming**: Unique in-game items like swords or avatars.
- **Identity**: Representing unique user identities or credentials.
- **Collectibles**: Digital trading cards or badges.


## Example: Using Dynamic Metadata with ERC-721

Dynamic metadata is useful for NFTs whose attributes or visuals may change over time, such as game items, evolving artwork, or on-chain status tokens.

Instead of storing the entire metadata URI on-chain using `ERC721URIStorage`, the contract only stores a base URI. The full metadata URI is generated on the fly using the `tokenId`.

Here’s an example using `ERC721` (not `ERC721URIStorage`) for dynamic metadata:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract DynamicNFT is ERC721, Ownable {
    uint256 public nextTokenId;
    string public baseURI;

    constructor(string memory _baseURI) ERC721("DynamicNFT", "DYN") {
        baseURI = _baseURI;
    }

    function mint(address to) external onlyOwner {
        _safeMint(to, nextTokenId);
        nextTokenId++;
    }

    // Overrides the tokenURI function to construct metadata URI dynamically
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return string(abi.encodePacked(baseURI, Strings.toString(tokenId), ".json"));
    }

    // Allows owner to update base URI
    function setBaseURI(string memory _newBaseURI) external onlyOwner {
        baseURI = _newBaseURI;
    }
}
```

### Notes:

- The contract uses a `baseURI` like `https://api.example.com/metadata/`.
- The `tokenURI()` function appends the token ID to this base path.
- Metadata can be updated off-chain by modifying the server response at the corresponding URL.
- This saves gas and allows metadata to evolve without modifying the smart contract.


## References

- [ERC-721 Specification](https://eips.ethereum.org/EIPS/eip-721)