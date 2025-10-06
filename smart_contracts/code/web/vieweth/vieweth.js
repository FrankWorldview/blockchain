// Import the Ethers.js library (CommonJS syntax)
// Provides easy interaction with Ethereum nodes via JSON-RPC
const { ethers } = require("ethers");

// RPC endpoint for your local Ethereum test node (e.g., Anvil, Ganache, Hardhat)
const rpcURL = "http://127.0.0.1:8545";

// Create a new provider instance that connects to the RPC endpoint
const provider = new ethers.JsonRpcProvider(rpcURL);

// The target Ethereum address for which we want to check the balance
const targetAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

/**
 * Retrieve and display general blockchain information:
 * - Chain ID (network identifier)
 * - Latest block number
 * - Current gas price (from EIP-1559 fee data)
 * - ETH balance of a specific target address
 */
async function getBlockchainInfo() {
    try {
        // Get the network information (includes chainId)
        const { chainId } = await provider.getNetwork();
        console.log(`Chain ID: ${chainId}`);

        // Get the most recent block number on the blockchain
        const blockNumber = await provider.getBlockNumber();
        console.log(`Latest Block Number: ${blockNumber}`);

        // Get current gas price / fee data
        // Ethers v6 prefers getFeeData() over getGasPrice()
        const feeData = await provider.getFeeData();

        // Pick gas price or max fee per gas, whichever exists
        // The ?? operator (Nullish Coalescing)
        // ?? means “use the next value if the left side is null or undefined.”
        const gasPriceLike = feeData.gasPrice ?? feeData.maxFeePerGas ?? 0n;

        // Display gas price in both wei and gwei units
        console.log(
            `Current Gas Price: ${gasPriceLike} wei (${ethers.formatUnits(
                gasPriceLike,
                "gwei"
            )} gwei)`
        );

        // Get the ETH balance of the target address (returns BigInt in wei)
        const balance = await provider.getBalance(targetAddress);

        // Convert balance from wei → ETH for easier reading
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
 * Works with local development nodes like Anvil, Hardhat, or Ganache
 * which automatically unlock and expose accounts via `eth_accounts`.
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
    console.log("=== Blockchain Info ===");
    await getBlockchainInfo();

    console.log("\n=== Account Info ===");
    await getAllAccountBalances();
}

// Execute the main function
main();
