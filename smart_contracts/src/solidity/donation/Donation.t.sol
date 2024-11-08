// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Donation} from "../src/Donation.sol";

contract DonationTest is Test {
    Donation public donation;

    address beneficiary = address(0x70997970C51812dc3A010C7d01b50e0d17dc79C8);

    function setUp() public {
        donation = new Donation{value: 1 ether}(beneficiary);

        // Use the owner() function from Ownable to get the initial owner.
        console.log("*** Contract owner:", donation.owner());

        console.log("*** Contract beneficiary:", beneficiary);

        console.log("*** Contract balance:", address(donation).balance);
    }

    function testDonation() public {
        // Check the contract balance.
        assertEq(address(donation).balance, 1 ether);

        // Check that the custodian is set correctly.
        assertEq(donation.beneficiary(), beneficiary);

        console.log("*** Call withdraw():");

        donation.withdraw();

        console.log("*** Beneficiary balance:", beneficiary.balance);

        console.log("*** Contract balance:", address(donation).balance);
    }
}
