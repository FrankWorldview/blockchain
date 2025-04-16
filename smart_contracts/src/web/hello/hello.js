// Web3.js library for interacting with the Ethereum blockchain
const { Web3 } = require('web3');

// Node.js built-in module to read from and write to the file system
const fs = require('fs');

async function main() {
    try {
        // Initialize Web3 with a local Ethereum RPC endpoint (e.g., Anvil, Hardhat, or Ganache)
        const rpcUrl = 'http://127.0.0.1:8545';
        const web3 = new Web3(rpcUrl);

        // Load compiled contract ABI (Application Binary Interface)
        const abiPath = 'D:/Solidity/hello/out/Hello.sol/Hello.json';
        const helloABI = require(abiPath).abi;

        // Log ABI for debugging or confirmation
        console.log("Contract ABI loaded successfully");
        // console.log(helloABI);
        // console.log(JSON.stringify(helloABI, null, 2));

        // Dynamically retrieve the most recent deployment address from Foundry's broadcast log
        const broadcastPath = 'D:/Solidity/hello/broadcast/Hello.s.sol/31337/run-latest.json';
        const broadcastData = JSON.parse(fs.readFileSync(broadcastPath, 'utf-8'));
        const helloAddress = broadcastData.transactions[0].contractAddress;

        // Log address for debugging or confirmation
        console.log("Contract address:", helloAddress);

        // Instantiate the contract interface
        const helloContract = new web3.eth.Contract(helloABI, helloAddress);

        // Interact with contract: call greet() function
        const greeting = await helloContract.methods.greet().call();
        console.log("Greeting:", greeting);

        // Call getMyName()
        const name = await helloContract.methods.getMyName().call();
        console.log("Name:", name);

        // Call getMaxUint256()
        const maxUint = await helloContract.methods.getMaxUint256().call();
        console.log("Max uint256:", maxUint);

        // Call sumUpTo(n) with n = 100
        const sum = await helloContract.methods.sumUpTo(100).call();
        console.log("Sum from 1 to 100:", sum);
    } catch (error) {
        console.error("Error interacting with the contract:", error.message);
    }
}

// Run the main function
main();
