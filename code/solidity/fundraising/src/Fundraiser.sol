// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Fundraiser
 * @dev A smart contract for managing decentralized fundraising campaigns.
 * Each fundraiser tracks donations per donor and allows withdrawal by the owner.
 */
contract Fundraiser is Ownable {
    // Public fundraiser metadata
    string public name;
    string public url;
    string public imageUrl; // mixedCase
    string public description;

    // Beneficiary who will receive the donated funds upon withdrawal
    address payable public beneficiary;

    // Internal struct to store individual donation records
    struct Donation {
        uint256 value; // Amount of ETH donated (in wei)
        uint256 date; // Timestamp of the donation
    }

    mapping(address => Donation[]) private _donations;

    // Aggregate fundraising metrics
    uint256 public totalDonations; // Total ETH received (in wei)
    uint256 public donationsCount; // Total number of donation transactions

    // Events
    event DonationReceived(address indexed donor, uint256 value);
    event Withdraw(uint256 amount);

    /**
     * @dev Constructor to initialise fundraiser data.
     * @param _name Name of the fundraiser
     * @param _url Website or reference URL
     * @param _imageUrl Image representing the fundraiser
     * @param _description Fundraiser description
     * @param _beneficiary Address that will receive the funds
     * @param _custodian Initial owner of the contract
     */
    constructor(
        // Always prefix constructor or setter parameters with _ when they have the same name as state variables.
        string memory _name,
        string memory _url,
        string memory _imageUrl,
        string memory _description,
        address payable _beneficiary,
        address _custodian
    ) Ownable(msg.sender) {
        require(_custodian != address(0), "Invalid custodian address");
        name = _name;
        url = _url;
        imageUrl = _imageUrl;
        description = _description;
        beneficiary = _beneficiary;

        // Transfer ownership from the deployer (FundraiserFactory) to the designated custodian (EOA).
        transferOwnership(_custodian);
    }

    /**
     * @dev Updates the beneficiary address.
     * Only callable by the contract owner (custodian).
     */
    function setBeneficiary(address payable _beneficiary) public onlyOwner {
        beneficiary = _beneficiary;
    }

    /**
     * @dev Returns the number of donations made by the caller.
     */
    function myDonationsCount() public view returns (uint256) {
        return _donations[msg.sender].length;
    }

    /**
     * @dev Accepts ETH donations from users.
     * Records the donation and emits an event.
     */
    function donate() public payable {
        require(msg.value > 0, "Donation must be greater than 0");

        _donations[msg.sender].push(Donation(msg.value, block.timestamp));
        totalDonations += msg.value;
        donationsCount++;

        emit DonationReceived(msg.sender, msg.value);
    }

    /**
     * @dev Returns arrays of values and timestamps for all donations by the caller.
     */
    function myDonations()
        public
        view
        returns (uint256[] memory values, uint256[] memory dates)
    {
        Donation[] storage donations = _donations[msg.sender];
        uint256 count = donations.length;

        values = new uint256[](count);
        dates = new uint256[](count);

        for (uint256 i = 0; i < count; i++) {
            values[i] = donations[i].value;
            dates[i] = donations[i].date;
        }
        return (values, dates);
    }

    /**
     * @dev Allows the owner to withdraw all funds to the beneficiary.
     * Emits a Withdraw event on success.
     */
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds available");

        (bool success, ) = beneficiary.call{value: balance}("");
        require(success, "Withdrawal failed");

        emit Withdraw(balance);
    }

    /**
     * @dev Fallback handler for receiving plain ETH transfers with no calldata.
     */
    receive() external payable {
        totalDonations += msg.value;
        donationsCount++;
        emit DonationReceived(msg.sender, msg.value);
    }

    /**
     * @dev Fallback handler for receiving ETH with unrecognized calldata.
     */
    fallback() external payable {
        totalDonations += msg.value;
        donationsCount++;
        emit DonationReceived(msg.sender, msg.value);
    }
}
