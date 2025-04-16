// Web3.js library for interacting with the Ethereum blockchain
const { Web3 } = require('web3');

// RPC endpoint for local Ethereum development node (e.g. Anvil, Ganache, Hardhat)
const rpcURL = 'http://127.0.0.1:8545';

// Target Ethereum address for balance inspection (can be changed as needed)
const targetAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';

// Initialize a new Web3 instance
const web3 = new Web3(rpcURL);

/**
 * Display general blockchain information:
 * - Network chain ID
 * - Latest block number
 * - Current gas price
 * - ETH balance of a specific target address
 */
async function getBlockchainInfo() {
    try {
        const chainId = await web3.eth.getChainId();
        console.log(`Chain ID: ${chainId}`);

        const blockNumber = await web3.eth.getBlockNumber();
        console.log(`Latest Block Number: ${blockNumber}`);

        const gasPrice = await web3.eth.getGasPrice();
        console.log(`Current Gas Price: ${gasPrice} wei (${web3.utils.fromWei(gasPrice, 'gwei')} gwei)`);

        const balance = await web3.eth.getBalance(targetAddress);
        console.log(`Balance of ${targetAddress}: ${balance} wei (${web3.utils.fromWei(balance, 'ether')} ETH)`);
    } catch (error) {
        console.error("Error fetching blockchain information:", error.message);
    }
}

/**
 * Display all available accounts from the connected node and their ETH balances
 */
async function getAllAccountBalances() {
    try {
        console.log("Accounts and Balances:");

        const accounts = await web3.eth.getAccounts();

        if (accounts.length === 0) {
            console.log("No accounts found");
            return;
        }

        for (const account of accounts) {
            const balance = await web3.eth.getBalance(account);
            console.log(`${account}: ${balance} wei (${web3.utils.fromWei(balance, 'ether')} ETH)`);
        }
    } catch (error) {
        console.error("Error fetching account balances:", error.message);
    }
}

/**
 * Entry point – retrieves blockchain and account data
 */
async function main() {
    console.log("=== Blockchain Info ===");
    await getBlockchainInfo();

    console.log('\n=== Account Info ===');
    await getAllAccountBalances();
}

// Run the main function
main();
