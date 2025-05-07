
# ERC-721 Tokens

The ERC-721 standard defines a minimum interface—owning, transferring, and tracking unique tokens—also known as NFTs (non-fungible tokens).

## Key Functions with Comments

```solidity
// Returns the number of tokens in owner's account
function balanceOf(address owner) external view returns (uint256 balance);

// Returns the owner of the specified token ID
function ownerOf(uint256 tokenId) external view returns (address owner);

// Safely transfers `tokenId` from `from` to `to`
function safeTransferFrom(address from, address to, uint256 tokenId) external;

// Transfers `tokenId` from `from` to `to`
function transferFrom(address from, address to, uint256 tokenId) external;

// Approves `to` to transfer `tokenId` token
function approve(address to, uint256 tokenId) external;

// Returns the approved address for a token
function getApproved(uint256 tokenId) external view returns (address operator);

// Enables or disables approval for a third party ("operator") to manage all of `msg.sender`'s assets
function setApprovalForAll(address operator, bool _approved) external;

// Tells whether `operator` is approved to manage all of `owner`'s assets
function isApprovedForAll(address owner, address operator) external view returns (bool);
```

Each of these functions enables core functionalities for managing NFTs. `safeTransferFrom` is preferred over `transferFrom` because it ensures that the recipient is aware of the ERC-721 protocol to prevent tokens from being locked in contracts that cannot handle them.

## Usage

This interface is typically inherited and implemented by NFT contracts such as those used for digital art, collectibles, or game assets.
