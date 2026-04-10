// Import Node.js core modules for file handling and path resolution
const fs = require('fs');             // Built-in module to read from and write to the file system
const path = require('path');         // Built-in module to work with file and directory paths

// Load the ABI from the compiled smart contract JSON
// This ABI (Application Binary Interface) defines the contract's public methods and events
const abi = require('D:/Solidity/hello/out/Hello.sol/Hello.json').abi;
console.log("Contract ABI loaded successfully");
// Log ABI for debugging or confirmation
console.log(abi);

// Load the deployment result produced by Foundry
// This file includes metadata about where the contract was deployed, gas used, etc.
const deployment = require('D:/Solidity/hello/broadcast/Hello.s.sol/31337/run-latest.json');
// Extract the contract address from the first transaction (assumes single contract deployment)
const address = deployment.transactions[0].contractAddress;
// Log address for debugging or confirmation
console.log("Contract address:", address);

// Write the ABI to a JSON file for frontend use (e.g., React, Web3.js, Ethers.js)
// The ABI file allows your frontend app to understand how to interact with the deployed contract
fs.writeFileSync(
    path.join(__dirname, './src/abi/Hello-abi.json'), // Target path relative to current file
    JSON.stringify(abi, null, 2)                      // Convert ABI object to pretty-printed JSON
);

// Write the contract address to a separate JSON file
// This helps the frontend know which address to use when instantiating the contract
fs.writeFileSync(
    path.join(__dirname, './src/abi/Hello-addr.json'), // Target path for address file
    JSON.stringify({ address }, null, 2)               // Save the address inside an object for clarity and extensibility
);
