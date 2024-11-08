// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {console} from "forge-std/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Donation is Ownable {
    address public beneficiary; // This is an address that will serve as the beneficiary of the funds in the contract. The beneficiary can be a wallet or a different contract to which funds will be transferred when the owner withdraws from the contract.

    event DonationReceived(address indexed donor, uint256 value);
    event Withdrawal(uint256 value);

    constructor(address _beneficiary) payable Ownable(msg.sender) {
        // Pass msg.sender to Ownable.
        // Ownable(msg.sender) is not a separate argument but rather an inheritance call to the Ownable constructor with msg.sender as its argument. msg.sender is passed to the Ownable constructor to set the contract owner at deployment, ensuring that only the deployer has owner privileges.

        require(
            _beneficiary != address(0),
            "Beneficiary address cannot be zero."
        );

        beneficiary = _beneficiary;

        console.log("Donation contract address:", address(this));
        console.log("Donation contract owner:", owner());
        console.log("Donation contract beneficiary:", beneficiary);
        console.log("Donation contract got:", msg.value);
        console.log("Donation contract balance:", address(this).balance);
    }

    // Define the receive() function to handle incoming Ether.
    receive() external payable {
        console.log("Donation received:", msg.sender, msg.value);

        // Log the donation.
        emit DonationReceived(msg.sender, msg.value);
    }

    // Only the contract owner hsa the privilege to call.
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;

        require(balance > 0, "No funds to withdraw.");

        payable(beneficiary).transfer(balance);

        // Log the withdrawal.
        emit Withdrawal(balance);
    }
}
