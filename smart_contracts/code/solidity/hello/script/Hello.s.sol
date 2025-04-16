// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

// Import Foundry's scripting utilities and console for logging
import {Script, console} from "forge-std/Script.sol";

// Import the Hello contract to be deployed
import {Hello} from "../src/Hello.sol";

// Script contract used for deploying the Hello contract with Foundry
contract HelloScript is Script {
    // Declare a public Hello contract instance
    Hello public hello;

    // Optional setup logic (not used here, but included for completeness)
    function setUp() public {}

    // Main deployment function
    function run() public {
        // Begin broadcasting transactions to the network (e.g. Anvil, testnet, etc.)
        vm.startBroadcast();

        // Deploy a new Hello contract and assign its address to `hello`
        hello = new Hello();

        // Stop broadcasting to end the deployment
        vm.stopBroadcast();
    }
}
