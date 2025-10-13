// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Fundraiser} from "./Fundraiser.sol";

/**
 * @title FundraiserFactory
 * @dev Deploys and keeps track of multiple Fundraiser contracts.
 */
contract FundraiserFactory {
    Fundraiser[] private _fundraisers;

    // SCREAMING_SNAKE_CASE for constants
    uint256 internal constant MAX_LIMIT = 20;

    event FundraiserCreated(address indexed fundraiser, address indexed owner);

    function fundraisersCount() public view returns (uint256) {
        return _fundraisers.length;
    }

    /**
     * @dev Creates a new Fundraiser contract and stores it.
     */
    function createFundraiser(
        string memory name,
        string memory url,
        string memory imageUrl, // mixedCase
        string memory description,
        address payable beneficiary
    ) public {
        Fundraiser fundraiser = new Fundraiser(
            name,
            url,
            imageUrl,
            description,
            beneficiary,
            msg.sender // custodian/owner
        );

        _fundraisers.push(fundraiser);
        emit FundraiserCreated(address(fundraiser), msg.sender);
    }

    /**
     * @dev Returns a paginated list of fundraiser addresses
     */
    function fundraisers(
        uint256 limit,
        uint256 offset
    ) public view returns (address[] memory collection) {
        uint256 count = fundraisersCount();
        require(offset <= count, "Offset out of bounds");

        uint256 size = count - offset;
        if (size > limit) size = limit;
        if (size > MAX_LIMIT) size = MAX_LIMIT;

        collection = new address[](size);
        for (uint256 i = 0; i < size; i++) {
            collection[i] = address(_fundraisers[offset + i]);
        }
        return collection;
    }
}
