// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {MyToken} from "../src/MyToken.sol";

contract MyTokenTest is Test {
    MyToken token;
    address owner;
    address user;

    function setUp() public {
        token = new MyToken("CoolToken", "COOL", 1000); // Initial supply to owner
        owner = address(this); // The test contract is the deployer
        user = address(0xABCD); // A dummy user
    }

    function testInitialSupply() public view {
        assertEq(token.totalSupply(), 1000 * 10 ** token.decimals());
        assertEq(token.balanceOf(owner), 1000 * 10 ** token.decimals());
    }

    function testMintByOwner() public {
        uint256 mintAmount = 500 * 10 ** token.decimals();
        token.mint(user, mintAmount);
        assertEq(token.balanceOf(user), mintAmount);
    }

    function testTransfer() public {
        uint256 transferAmount = 100 * 10 ** token.decimals();

        bool ok = token.transfer(user, transferAmount);
        assertTrue(ok, "Transfer should return true");

        assertEq(token.balanceOf(user), transferAmount);
        assertEq(token.balanceOf(owner), 900 * 10 ** token.decimals());
    }
}
