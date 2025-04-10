pragma solidity ^0.8.28;

import "./Fundraiser.sol";

contract FundraiserFactory {
    Fundraiser[] private _fundraisers;
    uint256 constant maxLimit = 20;

    event FundraiserCreated(address indexed fundraiser, address indexed owner);

    function fundraisersCount() public view returns (uint256) {
        return _fundraisers.length;
    }

    function createFundraiser(
        string memory name,
        string memory url,
        string memory imageURL,
        string memory description,
        address payable beneficiary
    ) public {
        Fundraiser fundraiser = new Fundraiser(
            name,
            url,
            imageURL,
            description,
            beneficiary,
            msg.sender
        );
        _fundraisers.push(fundraiser);
        emit FundraiserCreated(address(fundraiser), msg.sender);
    }

    function fundraisers(
        uint256 limit,
        uint256 offset
    ) public view returns (address[] memory coll) {
        require(offset <= fundraisersCount(), "Offset out of bounds"); // < or <= ???

        uint256 size = fundraisersCount() - offset;
        size = size < limit ? size : limit;
        size = size < maxLimit ? size : maxLimit;

        coll = new address[](size);
        for (uint256 i = 0; i < size; i++) {
            coll[i] = address(_fundraisers[offset + i]);
        }

        return coll;
    }
}
