// SPDX-License-Identifier: MIT
pragma solidity ^0.8.33;

// Only for local debugging with Foundry.
// This import is ignored in normal on-chain execution,
// but console logs should still be removed before production deployment.
import {console} from "forge-std/console.sol";

/**
 * @title Hello
 * @notice A simple Solidity contract for teaching basic concepts.
 * @dev This contract is intentionally permissionless:
 *      anyone can call setName() and update the stored name.
 *      This is useful for demonstrating open/public write access,
 *      but it is NOT appropriate for sensitive production data.
 */
contract Hello {
    /// @notice Emitted whenever the stored name is updated.
    /// @param changer The caller who changed the name.
    /// @param newName The new name stored in the contract.
    event NameChanged(address indexed changer, string newName);

    // The stored name.
    // Note: string is a dynamic type and is more expensive than fixed-size types such as bytes32.
    string private name;

    /**
     * @notice Initializes the contract with a default name.
     * @dev The constructor runs only once, at deployment time.
     */
    constructor() {
        name = "Pepe";

        // For local Foundry debugging only.
        console.log("Constructor: Hello contract deployed");
    }

    /**
     * @notice Returns a greeting message using the stored name.
     * @dev string.concat() is convenient, but working with dynamic strings costs more gas.
     * @return A greeting string such as "Hello, Pepe!"
     */
    function greet() external view returns (string memory) {
        return string.concat("Hello, ", name, "!");
    }

    /**
     * @notice Updates the stored name.
     * @dev This contract is intentionally permissionless:
     *      anyone may call this function.
     *      calldata is used to avoid an unnecessary memory copy for external inputs.
     * @param newName The new name to store.
     */
    function setName(string calldata newName) external {
        require(bytes(newName).length > 0, "New name cannot be empty");

        name = newName;

        emit NameChanged(msg.sender, newName);

        // For local Foundry debugging only.
        console.log("Name updated to:", newName);
    }

    /**
     * @notice Returns the currently stored name.
     * @return The current name.
     */
    function getName() external view returns (string memory) {
        return name;
    }

    /**
     * @notice Returns the maximum value representable by uint256.
     * @dev Useful for demonstrating Solidity built-in type limits.
     * @return The maximum uint256 value.
     */
    function getMaxUint256() external pure returns (uint256) {
        return type(uint256).max;
    }

    /**
     * @notice Returns the sum of integers from 1 to n using Gauss's formula.
     * @dev This avoids a loop, which would cost more gas.
     *      In Solidity 0.8+, arithmetic overflow causes a revert automatically.
     * @param n The upper bound of the summation.
     * @return The sum 1 + 2 + ... + n.
     */
    function sumUpTo(uint256 n) external pure returns (uint256) {
        require(n > 0, "Input must be greater than 0");

        return (n * (n + 1)) / 2;
    }
}
