// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

// Import Foundry's console utility for logging (used only in local testing, not on-chain)
import {console} from "forge-std/console.sol";

// A simple smart contract showcasing basic Solidity functions and features
contract Hello {
    // The constructor is executed only once when the contract is deployed
    constructor() {
        // This message appears in the Foundry test console (does not affect the blockchain)
        console.log("Constructor of the Hello contract");
    }

    // Return a static greeting message
    function greet() public pure returns (string memory) {
        return "Hello World!";
    }

    // Return a fixed name for demonstration purposes
    function getMyName() public pure returns (string memory) {
        return "Pepe";
    }

    // Return the largest possible value for the uint256 type
    function getMaxUint256() public pure returns (uint256) {
        return type(uint256).max;
    }

    // Calculate the sum of all integers from 1 to `n` using the formula: n * (n + 1) / 2
    function sumUpTo(uint256 n) public pure returns (uint256) {
        // Require that n is greater than 0 to avoid meaningless computation
        require(n > 0, "Input must be greater than 0");

        // Return the result of the arithmetic series
        return (n * (n + 1)) / 2;
    }
}
