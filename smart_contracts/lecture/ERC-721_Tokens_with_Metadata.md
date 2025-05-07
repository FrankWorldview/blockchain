# ERC-721 Tokens

ERC-721 is a standard interface for non-fungible tokens (NFTs), which are unique and cannot be interchanged like fungible tokens (e.g., ERC-20). Each ERC-721 token has a unique identifier and can represent ownership of a unique asset, such as digital art, collectibles, or even real estate.

## Key Characteristics

- **Non-Fungibility**: Each token has a unique ID.
- **Ownership Tracking**: Ownership is recorded on-chain.
- **Metadata**: Tokens can have associated metadata to describe the asset.
- **Transferable**: Can be transferred between users like other tokens.

## Functions and Comments

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    constructor() ERC721("MyNFT", "MNFT") {}

    // Mint function that allows the contract owner to create a new token.
    function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId;
        _mint(recipient, tokenId);          // Mints the token to the recipient.
        _setTokenURI(tokenId, tokenURI);    // Sets the token metadata URI.
        _nextTokenId++;
        return tokenId;
    }

    // Function to burn (destroy) a token.
    function burnNFT(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "Not the token owner");
        _burn(tokenId);  // Burns the token, removing it from circulation.
    }
}
```

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

## References

- [ERC-721 Specification](https://eips.ethereum.org/EIPS/eip-721)
