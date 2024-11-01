// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Hello} from "../src/Hello.sol";

contract HelloTest is Test {
    Hello public hello;

    function setUp() public {
        hello = new Hello();
    }

    function testHello() public view {
        assertEq(hello.greet(), "Hello world!");

        assertEq(hello.getMyName(), "Pepe");
    }
}
