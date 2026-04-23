// Import the Ethers.js library (CommonJS syntax)
// Provides easy interaction with Ethereum nodes via JSON-RPC
const { ethers } = require("ethers");

// RPC endpoint for your local Ethereum test node (Anvil / Hardhat)
const rpcURL = "http://127.0.0.1:8545";

// Create a new provider instance that connects to the RPC endpoint
const provider = new ethers.JsonRpcProvider(rpcURL);

// The target Ethereum address for which we want to check the balance
const targetAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

/**
 * Retrieve and display general blockchain information:
 * - Chain ID (network identifier)
 * - Latest block number
 * - EIP-1559 fee information
 * - ETH balance of a specific target address
 */
async function getBlockchainInfo() {
    try {
        // Get network information (includes chainId)
        const { chainId } = await provider.getNetwork();
        console.log(`Chain ID: ${chainId.toString()}`);

        // Get the most recent block number on the blockchain
        const blockNumber = await provider.getBlockNumber();
        console.log(`Latest Block Number: ${blockNumber}`);

        // Retrieve the latest block from the connected Ethereum node
        // "latest" = the most recently mined block
        const block = await provider.getBlock("latest");

        // baseFeePerGas:
        // - Defined by EIP-1559
        // - Determined by the network, not by the user
        // - Changes dynamically depending on block congestion
        // - Represents the minimum fee required for inclusion
        // - May be null on non-EIP-1559 chains
        console.log(
            "baseFeePerGas:",
            ethers.formatUnits(block.baseFeePerGas ?? 0n, "gwei"),
            "gwei"
        );

        // Retrieve fee suggestions from the provider
        // These are provider-estimated values for submitting a transaction;
        // they are not fee values taken from a specific on-chain transaction
        const feeData = await provider.getFeeData();

        // maxPriorityFeePerGas:
        // - Also called the "tip"
        // - Paid to the validator (or miner on older terminology)
        // - Used to encourage faster transaction inclusion
        console.log(
            "maxPriorityFeePerGas:",
            ethers.formatUnits(feeData.maxPriorityFeePerGas ?? 0n, "gwei"),
            "gwei"
        );

        // maxFeePerGas:
        // - The maximum total fee per gas the sender is willing to pay
        // - Acts as an upper cap for base fee + priority fee
        console.log(
            "maxFeePerGas:",
            ethers.formatUnits(feeData.maxFeePerGas ?? 0n, "gwei"),
            "gwei"
        );

        // Get the ETH balance of the target address (returned as BigInt in wei)
        const balance = await provider.getBalance(targetAddress);

        // Convert balance from wei to ETH for easier reading
        console.log(
            `Balance of ${targetAddress}: ${balance} wei (${ethers.formatEther(
                balance
            )} ETH)`
        );
    } catch (error) {
        // If any call fails (e.g. bad RPC endpoint), log the error
        console.error("Error fetching blockchain information:", error);
    }
}

/**
 * Display all available accounts from the connected Ethereum node
 * and their ETH balances.
 *
 * Works with local development nodes like Anvil, Hardhat, or Ganache,
 * which expose unlocked accounts through the `eth_accounts` RPC method.
 */
async function getAllAccountBalances() {
    try {
        console.log("Accounts and Balances:");

        // Query the node for all known accounts
        const accounts = await provider.send("eth_accounts", []);

        // Handle the case where no accounts are available
        if (accounts.length === 0) {
            console.log("No accounts found");
            return;
        }

        // Loop through each account and print its balance
        for (const account of accounts) {
            const balance = await provider.getBalance(account);
            console.log(
                `${account}: ${balance} wei (${ethers.formatEther(balance)} ETH)`
            );
        }
    } catch (error) {
        // Handle connection or RPC errors gracefully
        console.error("Error fetching account balances:", error);
    }
}

/**
 * Main entry point for the script.
 * - Prints general blockchain information
 * - Then prints all local accounts and balances
 */
async function main() {
    console.log("===== Blockchain Info =====");
    await getBlockchainInfo();

    console.log("\n===== Account Info =====");
    await getAllAccountBalances();
}

// Execute the main function
main();
