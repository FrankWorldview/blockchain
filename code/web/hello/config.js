// Import Node.js core modules
const fs = require('fs'); // File system module (read/write files)

// Path to the compiled contract artifact (ABI + bytecode + metadata)
const abiPath = "D:/Solidity/hello/out/Hello.sol/Hello.json";

// Path to the Foundry broadcast file (deployment info)
const broadcastPath = "D:/Solidity/hello/broadcast/Hello.s.sol/31337/run-latest.json";

/**
 * Load the ABI and deployed address of the Hello contract.
 *
 * @returns {{ helloABI: any, helloAddress: string }}
 * An object containing:
 * - helloABI: the contract ABI
 * - helloAddress: the deployed contract address
 *
 * @throws {Error} If the contract address cannot be found
 */
function loadHelloArtifact() {
    // Read and parse the artifact JSON file
    // so we always get the latest ABI
    const artifactData = JSON.parse(
        fs.readFileSync(abiPath, "utf-8")
    );
    const helloABI = artifactData.abi;

    // Read and parse the broadcast JSON file
    const broadcastData = JSON.parse(
        fs.readFileSync(broadcastPath, "utf-8")
    );

    // Try to get the deployed contract address
    // Foundry output may store it in different places
    const helloAddress =
        broadcastData?.receipts?.[0]?.contractAddress ??
        broadcastData?.transactions?.[0]?.contractAddress;

    // Throw an error if no contract address is found
    if (!helloAddress) {
        throw new Error("Cannot find contractAddress in broadcast JSON");
    }

    // Return ABI and address together
    return { helloABI, helloAddress };
}

// Export the function for use in other files
module.exports = { loadHelloArtifact };
