// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

// Import Foundry's Test framework and console for debugging
import {Test, console} from "forge-std/Test.sol";

// Import the contract to be tested
import {Hello} from "../src/Hello.sol";

// Define a test contract inheriting from Foundry's Test contract
contract HelloTest is Test {
    // Declare an instance of the Hello contract
    Hello public hello;

    // Run before each test – deploys a fresh instance of Hello
    function setUp() public {
        hello = new Hello();
    }

    // Test if greet() returns the expected greeting string
    function testGreet() public view {
        assertEq(hello.greet(), "Hello World!");
    }

    // Test if getMyName() returns the hardcoded name "Pepe"
    function testGetMyName() public view {
        assertEq(hello.getMyName(), "Pepe");
    }

    // Test if getMaxUint256() returns the maximum uint256 value
    function testGetMaxUint() public view {
        assertEq(hello.getMaxUint256(), type(uint256).max);
    }

    // Test if sumUpTo(n) correctly returns the sum from 1 to n
    function testSumUpTo() public view {
        uint256 n = 100;
        uint256 sum = 0;

        // Calculate the expected sum manually
        for (uint256 i = 1; i <= n; i++) {
            sum += i;
        }

        // Assert the contract's sumUpTo() returns the same result
        assertEq(hello.sumUpTo(n), sum);
    }
}
