# ERC-721 Tokens

ERC-721 is a standard for representing ownership of non-fungible tokens (NFTs), meaning each token is unique. It is widely used for assets like digital art, collectibles, and in-game items on the Ethereum blockchain.

## Key Features

- **Non-fungible**: Each token is distinct and cannot be exchanged one-for-one with another ERC-721 token.
- **Ownership Tracking**: Tracks ownership and transfers on-chain.
- **Interoperable**: ERC-721 tokens can be used across various platforms that support the standard.
- **Metadata**: Each token can point to metadata (e.g., image, traits) using `tokenURI`.

## ERC-721 Interface

Here is the basic ERC-721 interface as defined in the EIP:

```solidity
interface ERC721 {
    function balanceOf(address owner) external view returns (uint256 balance);
    function ownerOf(uint256 tokenId) external view returns (address owner);
    function safeTransferFrom(address from, address to, uint256 tokenId) external;
    function transferFrom(address from, address to, uint256 tokenId) external;
    function approve(address to, uint256 tokenId) external;
    function getApproved(uint256 tokenId) external view returns (address operator);
    function setApprovalForAll(address operator, bool _approved) external;
    function isApprovedForAll(address owner, address operator) external view returns (bool);
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data) external;
}
```

## Example: Creating an ERC-721 Token

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract CoolCollectible is ERC721 {
    uint256 public nextTokenId;
    address public admin;

    constructor() ERC721("CoolCollectible", "COOL") {
        admin = msg.sender;
    }

    // Mint a new NFT to the specified address
    function mint(address to) external {
        require(msg.sender == admin, "Only admin can mint");
        _safeMint(to, nextTokenId);
        nextTokenId++;
    }

    // Override base URI to return custom metadata URL prefix
    function _baseURI() internal pure override returns (string memory) {
        return "https://api.coolcollectible.io/metadata/";
    }
}
```

### Function Comments:

- `constructor`: Sets the name and symbol for the NFT, and stores the admin address.
- `mint`: Mints a new token to the `to` address and increments `nextTokenId`.
- `_baseURI`: Customizes the base URL used for token metadata.

## References

- [EIP-721: ERC-721 Non-Fungible Token Standard](https://eips.ethereum.org/EIPS/eip-721)
