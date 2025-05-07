# ERC-721 Tokens

ERC-721 is a standard interface for non-fungible tokens (NFTs), meaning each token is unique and can have different value and metadata compared to others. It is used to represent ownership of unique items on the blockchain.

## Key Features of ERC-721

- **Uniqueness**: Every token has a unique identifier.
- **Indivisibility**: ERC-721 tokens cannot be divided like ERC-20 tokens.
- **Ownership**: Ownership and transfer of tokens are handled by the contract.
- **Metadata**: Each token can have associated metadata (e.g., name, image URL, description).

## Essential ERC-721 Functions

```solidity
function balanceOf(address owner) external view returns (uint256 balance);
```
Returns the number of NFTs owned by the given address.

```solidity
function ownerOf(uint256 tokenId) external view returns (address owner);
```
Returns the owner of the specified token ID.

```solidity
function safeTransferFrom(address from, address to, uint256 tokenId) external;
```
Safely transfers the ownership of a given token ID to another address.

```solidity
function transferFrom(address from, address to, uint256 tokenId) external;
```
Transfers ownership of a token from one address to another.

```solidity
function approve(address to, uint256 tokenId) external;
```
Grants or revokes permission to `to` to transfer the token with ID `tokenId`.

```solidity
function setApprovalForAll(address operator, bool _approved) external;
```
Enables or disables approval for a third party ("operator") to manage all of `msg.sender`'s assets.

```solidity
function getApproved(uint256 tokenId) external view returns (address operator);
```
Returns the approved address for a single token.

```solidity
function isApprovedForAll(address owner, address operator) external view returns (bool);
```
Checks if an address is an approved operator for another.

## Example: Simple ERC-721 Contract

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CoolNFT is ERC721, Ownable {
    uint256 public nextTokenId;

    constructor() ERC721("CoolNFT", "COOL") {}

    function mint(address to) external onlyOwner {
        _safeMint(to, nextTokenId);
        nextTokenId++;
    }
}
```

## Summary

ERC-721 provides the foundation for unique digital assets such as art, collectibles, and domain names. Understanding how to mint, transfer, and manage these tokens is essential for building NFT applications.