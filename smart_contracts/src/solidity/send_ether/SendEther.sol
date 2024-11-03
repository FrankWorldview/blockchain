// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {console} from "forge-std/console.sol";

contract A {
    address b;

    constructor(address _b) payable {
        b = _b;
        console.log("A's address:", address(this));
        console.log("A got:", msg.value);
        console.log("A's balance:", address(this).balance);
    }

    function payHalf() external {
        uint256 balance = address(this).balance;
        (bool success, ) = b.call{value: balance / 2}("");
        require(success);
    }
}

contract B {
    receive() external payable {
        console.log("B's address:", address(this));
        console.log("B got:", msg.value);
        console.log("B's balance:", address(this).balance);
    }
}
