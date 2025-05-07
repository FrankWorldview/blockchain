# ERC-721 Tokens

ERC-721 is a standard interface for non-fungible tokens (NFTs), which are unique and cannot be interchanged like fungible tokens (e.g., ERC-20). Each ERC-721 token has a unique identifier and can represent ownership of a unique asset, such as digital art, collectibles, or even real estate.

## Key Characteristics

- **Non-Fungibility**: Each token has a unique ID.
- **Ownership Tracking**: Ownership is recorded on-chain.
- **Metadata**: Tokens can have associated metadata to describe the asset.
- **Transferable**: Can be transferred between users like other tokens.



## Example: Minting and Burning NFTs

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




## Example: Minting and Burning NFTs

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


## ERC-721 Interface Functions

Below are the standard ERC-721 interface functions with explanations:

```solidity
// Returns the number of tokens owned by `owner`
function balanceOf(address owner) external view returns (uint256 balance);

// Returns the owner of the `tokenId` token
function ownerOf(uint256 tokenId) external view returns (address owner);

// Transfers `tokenId` token from `from` to `to` safely, checking contract compatibility
function safeTransferFrom(address from, address to, uint256 tokenId) external;

// Same as above but includes additional data to send along with the transfer
function safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data) external;

// Transfers `tokenId` from `from` to `to` without safety checks
function transferFrom(address from, address to, uint256 tokenId) external;

// Gives permission to `to` to transfer `tokenId` token to another account
function approve(address to, uint256 tokenId) external;

// Approve or remove `operator` as an operator for the caller
function setApprovalForAll(address operator, bool _approved) external;

// Returns the account approved for `tokenId` token
function getApproved(uint256 tokenId) external view returns (address operator);

// Returns if the `operator` is allowed to manage all of the assets of `owner`
function isApprovedForAll(address owner, address operator) external view returns (bool);
```



## Understanding `ERC721URIStorage`

`ERC721URIStorage` is an extension of the ERC-721 standard provided by OpenZeppelin.
It allows storing a unique URI for each token ID directly on-chain.

This is particularly useful when using **static metadata**, where each token's metadata (name, image, traits, etc.) is fixed and hosted at a permanent location (e.g., IPFS or Arweave). The URI is stored in the contract and can be retrieved via `tokenURI(uint256 tokenId)`.

While this approach is simpler and transparent, it may be more expensive in gas since each token stores its own URI on-chain.

Use this extension when:

- You want to assign different fixed URIs per token.
- You are minting NFTs with metadata already uploaded to IPFS or a web server.


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
