// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {console} from "forge-std/console.sol";

contract Hello {
    constructor() {
        console.log("Constructor of the Hello contract.");
    }

    function greet() public pure returns (string memory) {
        console.log("Hello world!");

        return "Hello world!";
    }

    function getMyName() public pure returns (string memory) {
        console.log("Pepe");

        return "Pepe";
    }

    function getMaxUint256() public pure returns (uint256) {
        console.log(type(uint256).max);

        return type(uint256).max;
    }
}
