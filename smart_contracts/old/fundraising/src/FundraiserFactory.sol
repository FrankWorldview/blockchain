// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

// Import the Fundraiser contract so the factory can deploy it
import "./Fundraiser.sol";

/**
 * @title FundraiserFactory
 * @dev Deploys and keeps track of multiple Fundraiser contracts.
 */
contract FundraiserFactory {
    // Private dynamic array to store created fundraiser contract instances
    Fundraiser[] private _fundraisers;

    // Max number of fundraisers that can be returned in a single paginated call
    uint256 constant maxLimit = 20;

    // Emitted when a new fundraiser is created
    event FundraiserCreated(address indexed fundraiser, address indexed owner);

    /**
     * @dev Returns the total number of fundraisers created
     */
    function fundraisersCount() public view returns (uint256) {
        return _fundraisers.length;
    }

    /**
     * @dev Creates a new Fundraiser contract and stores it.
     * @param name The name of the fundraiser
     * @param url A link to the campaign website
     * @param imageURL An image representing the campaign
     * @param description A short description of the campaign
     * @param beneficiary The address that will receive withdrawn donations
     *
     * Only addresses marked as `payable` are allowed to receive ETH,
     * so the beneficiary must be declared payable.
     */
    function createFundraiser(
        string memory name,
        string memory url,
        string memory imageURL,
        string memory description,
        address payable beneficiary
    ) public {
        // Deploy a new Fundraiser contract with the given metadata
        Fundraiser fundraiser = new Fundraiser(
            name,
            url,
            imageURL,
            description,
            beneficiary,
            msg.sender // msg.sender becomes the custodian (owner)
        );

        // Store the newly created contract in the array
        _fundraisers.push(fundraiser);

        // Emit an event with the new contract address and creator
        emit FundraiserCreated(address(fundraiser), msg.sender);
    }

    /**
     * @dev Returns a paginated list of fundraiser addresses
     * @param limit Max number of fundraisers to return (capped at maxLimit)
     * @param offset Index to start returning from
     * @return collection Array of fundraiser addresses
     */
    // This is a pagination technique — especially useful when you have a large number of fundraisers and don't want to fetch all of them at once (which could cost gas or overwhelm the frontend).
    function fundraisers(
        uint256 limit, // Give me up to limit fundraiser addresses, starting from position offset in the list.
        uint256 offset // Start from this position in the list
    ) public view returns (address[] memory collection) {
        // Ensure the offset is within bounds (allowing offset == count for empty result)
        require(offset <= fundraisersCount(), "Offset out of bounds");

        // Determine the slice size based on the offset, limit, and maxLimit
        uint256 size = fundraisersCount() - offset;
        size = size < limit ? size : limit;
        size = size < maxLimit ? size : maxLimit;

        // Allocate an array of addresses to return
        collection = new address[](size);

        // Populate the return array
        for (uint256 i = 0; i < size; i++) {
            collection[i] = address(_fundraisers[offset + i]);
        }

        return collection;
    }
}
