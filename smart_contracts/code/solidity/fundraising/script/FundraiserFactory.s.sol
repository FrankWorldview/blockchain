// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Script, console} from "forge-std/Script.sol";
import {FundraiserFactory} from "../src/FundraiserFactory.sol";

contract FundraiserFactoryScript is Script {
    FundraiserFactory public ff;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        ff = new FundraiserFactory();

        vm.stopBroadcast();
    }
}
