// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

// Import for Foundry debugging only — remove before deployment to production
import {console} from "forge-std/console.sol";

// Inherits ownership functionality from OpenZeppelin
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Fundraiser
 * @dev A smart contract for managing decentralised fundraising campaigns.
 * Each fundraiser tracks donations per donor and allows withdrawal by the owner.
 */
contract Fundraiser is Ownable {
    // Public fundraiser metadata
    string public name;
    string public url;
    string public imageURL;
    string public description;

    // Beneficiary who will receive the donated funds upon withdrawal
    address payable public beneficiary;

    // Internal struct to store individual donation records
    struct Donation {
        uint256 value; // Amount of ETH donated
        uint256 date; // Timestamp of the donation
    }

    // Mapping from donor address to a list of their donations
    // In Solidity, a leading underscore is often used to indicate: "This is a private/internal variable — don't access it directly from outside."
    mapping(address => Donation[]) private _donations;

    // Aggregate fundraising metrics
    uint256 public totalDonations; // Total ETH received
    uint256 public donationsCount; // Total number of donation transactions

    // Events
    event DonationReceived(address indexed donor, uint256 value);
    event Withdraw(uint256 amount);

    /**
     * @dev Constructor to initialise fundraiser data.
     * @param _name Name of the fundraiser
     * @param _url Website or reference URL
     * @param _imageURL Image representing the fundraiser
     * @param _description Fundraiser description
     * @param _beneficiary Address that will receive the funds
     * @param _custodian Initial owner of the contract
     */
    constructor(
        // Always prefix constructor or setter parameters with _ when they have the same name as state variables. It avoids bugs and improves readability.
        string memory _name,
        string memory _url,
        string memory _imageURL,
        string memory _description,
        address payable _beneficiary,
        address _custodian
    ) Ownable(msg.sender) {
        require(_custodian != address(0), "Invalid custodian address");
        name = _name;
        url = _url;
        imageURL = _imageURL;
        description = _description;
        beneficiary = _beneficiary;

        // Transfer ownership from deployer to designated custodian
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

        // Record the donation
        // You create a struct simply by calling it like a function literal — no new keyword is needed.
        // msg.value: The amount of Ether (in wei) that was sent along with the current transaction or call.
        // block.timestamp: The current UNIX timestamp (in seconds) of the block being mined. It's not perfectly accurate, but is close enough for tracking when things happen.
        _donations[msg.sender].push(Donation(msg.value, block.timestamp));
        totalDonations += msg.value;
        donationsCount++;

        emit DonationReceived(msg.sender, msg.value);
    }

    /**
     * @dev Returns arrays of values and timestamps for all donations by the caller.
     */
    // Solidity does not support returning structs to external callers in a way that is ABI-compatible with most frontends like Web3.js or Ethers.js.
    // Returning a struct internally (within the same contract) is fine.
    // Returning a struct to external callers (e.g., frontends or other contracts) is not currently supported cleanly by the Solidity ABI encoder.
    // Frontends using Ethers/Web3 can't easily decode the result of return MyStruct(...).
    function myDonations()
        public
        view
        returns (uint256[] memory values, uint256[] memory dates)
    {
        // Because _donations[msg.sender] is stored on-chain — it's part of the contract's persistent state.
        // So when you access it and want to reference it directly, you must declare the variable as storage.
        // Any modification to donations is a modification to the actual _donations[msg.sender] data.
        Donation[] storage donations = _donations[msg.sender];
        uint256 count = donations.length;

        values = new uint256[](count);
        dates = new uint256[](count);

        // Copy values into return arrays
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
    // onlyOwner is a modifier from OpenZeppelin's Ownable contract — it ensures that only the address returned by owner() can trigger this function.
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds available");

        // Use low-level call to transfer ETH to beneficiary
        // "Hey EVM, send balance ETH from this contract to the beneficiary address."
        // beneficiary: an address payable, meaning it is allowed to receive ETH.
        // .call{value: balance}(""): a low-level call that sends balance in wei to that address.
        // {value: balance} = this is how much ETH sending.
        // "" = empty data payload, i.e., we are not calling any function on the recipient.
        // (bool success, ) = ...: captures whether the call succeeded (true) or failed (false).

        // In Solidity, low-level calls like .call(), .delegatecall(), and .staticcall() return a tuple:
        // (bool success, bytes memory data) = target.call(...);
        // success: a bool indicating whether the call succeeded.
        // data: raw return data (bytes) — like the function's return value if there is one.
        // I only care about the success value — ignore the return data.
        (bool success, ) = beneficiary.call{value: balance}("");
        require(success, "Withdrawal failed");

        emit Withdraw(balance);
    }

    /**
     * @dev Fallback handler for receiving plain ETH transfers with no calldata.
     * Increments totals and emits a DonationReceived event.
     */
    receive() external payable {
        totalDonations += msg.value;
        donationsCount++;
        emit DonationReceived(msg.sender, msg.value);
    }

    /**
     * @dev Fallback handler for receiving ETH with unrecognized calldata.
     * Also treats it as a donation.
     */
    fallback() external payable {
        totalDonations += msg.value;
        donationsCount++;
        emit DonationReceived(msg.sender, msg.value);
    }
}
