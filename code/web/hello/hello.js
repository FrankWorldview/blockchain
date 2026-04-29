const { ethers } = require("ethers");
const { loadHelloArtifact } = require("./config");

// The new name to set in the contract
const myNewName = "NewPepe";

async function main() {
    try {
        // Create an HTTP provider to connect to the local blockchain node (Anvil / Hardhat)
        const rpcUrl = "http://127.0.0.1:8545";
        const provider = new ethers.JsonRpcProvider(rpcUrl);

        // Get a signer (account) from the provider
        // signer is required for sending transactions (write operations)
        const signer = await provider.getSigner(0);
        console.log("Using signer address:", await signer.getAddress());

        // Load the contract ABI and deployed address from local files
        const { helloABI, helloAddress } = loadHelloArtifact();
        console.log("✅ Contract address:", helloAddress);

        // Create a contract instance
        // Using signer → allows both read and write (transactions)
        const hello = new ethers.Contract(helloAddress, helloABI, signer);

        // ========================================
        // READ (no gas, no transaction)
        // ========================================

        // Call a view function (read-only)
        console.log("greet():", await hello.greet());

        // Read current stored name
        console.log("getName():", await hello.getName());

        // Read a uint256 (BigInt → convert to string for display)
        console.log("getMaxUint256():", (await hello.getMaxUint256()).toString());

        // Call function with BigInt input (ethers v6 requires `n` for big integers)
        console.log("sumUpTo(100):", (await hello.sumUpTo(100n)).toString());

        // ========================================
        // WRITE (transaction → costs gas)
        // ========================================

        console.log("\n⏳ Sending transaction...");

        // 1️⃣ Send transaction (user signs → broadcast)
        const txResponse = await hello.setName(myNewName);

        // 2️⃣ Track transaction
        console.log("Tx hash:", txResponse.hash);

        // 3️⃣ Wait for confirmation (block inclusion)
        const receipt = await txResponse.wait();

        // 4️⃣ Confirm result
        console.log("Confirmed in block:", receipt.blockNumber);

        // Verify the state change by reading again
        const updatedName = await hello.getName();
        console.log("Name updated to:", updatedName);

    } catch (error) {
        // Catch and display any errors (RPC issues, revert, etc.)
        console.error("❌ Error:", error);
    }
}

// Execute the script
main();
