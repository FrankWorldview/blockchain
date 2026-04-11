// SPDX-License-Identifier: MIT
pragma solidity ^0.8.33;

import {console} from "forge-std/console.sol";

contract Hello {
    /// @notice Emitted when someone updates the stored name.
    /// @param changer The caller who changed the name.
    /// @param newName The new name stored in the contract.
    event NameChanged(address indexed changer, string newName);

    string private name;

    constructor() {
        name = "Pepe";

        console.log("Constructor of the Hello contract");
    }

    function greet() public view returns (string memory) {
        return string.concat("Hello, ", name, "!");
    }

    /// @notice Update the stored name and emit an event.
    function setName(string memory newName) public {
        require(bytes(newName).length > 0, "New name cannot be empty");

        name = newName;

        emit NameChanged(msg.sender, name);

        console.log("Name updated to:", name);
    }

    function getName() public view returns (string memory) {
        return name;
    }

    function getMaxUint256() public pure returns (uint256) {
        return type(uint256).max;
    }

    function sumUpTo(uint256 n) public pure returns (uint256) {
        require(n > 0, "Input must be greater than 0");

        return (n * (n + 1)) / 2;
    }
}
