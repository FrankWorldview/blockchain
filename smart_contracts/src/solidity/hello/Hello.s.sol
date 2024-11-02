// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Hello} from "../src/Hello.sol";

contract HelloScript is Script {
    Hello public hello;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        hello = new Hello();

        console.log(hello.greet());

        console.log(hello.getMyName());

        vm.stopBroadcast();
    }
}
