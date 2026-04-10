// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {console} from "forge-std/console.sol";

contract Hello {
    /// @notice Emitted when someone updates the stored name.
    /// @param changer The caller who changed the name.
    /// @param newName The new name stored in the contract.
    event NameChanged(address indexed changer, string newName);

    string private myName;

    constructor() {
        myName = "Pepe";
        console.log("Constructor of the Hello contract");
    }

    function greet() public pure returns (string memory) {
        return "Hello World!";
    }

    /// @notice Update the stored name and emit an event.
    function setMyName(string memory newName) public {
        require(bytes(newName).length > 0, "Name cannot be empty");
        myName = newName;

        emit NameChanged(msg.sender, newName);
        console.log("Name updated to:", newName);
    }

    function getMyName() public view returns (string memory) {
        return myName;
    }

    function getMaxUint256() public pure returns (uint256) {
        return type(uint256).max;
    }

    function sumUpTo(uint256 n) public pure returns (uint256) {
        require(n > 0, "Input must be greater than 0");
        return (n * (n + 1)) / 2;
    }
}
