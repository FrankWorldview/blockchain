// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {A} from "../src/SendEther.sol";
import {B} from "../src/SendEther.sol";

contract SendEtherTest is Test {
    A public a;
    B public b;

    function setUp() public {
        b = new B();
        a = new A{value: 1 ether}(address(b));
    }

    function testExample() public {
        assertEq(address(a).balance, 1 ether);
        assertEq(address(b).balance, 0 ether);
        a.payHalf();
        assertEq(address(a).balance, 0.5 ether);
        assertEq(address(b).balance, 0.5 ether);
        a.payHalf();
        assertEq(address(a).balance, 0.25 ether);
        assertEq(address(b).balance, 0.75 ether);
        a.payHalf();
        assertEq(address(a).balance, 0.125 ether);
        assertEq(address(b).balance, 0.875 ether);
    }
}
