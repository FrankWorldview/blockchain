const { ethers } = require("ethers");
const { loadHelloArtifact } = require("./config");
const myNewName = "NewPepe";

async function main() {
    try {
        // HTTP provider
        const rpcUrl = "http://127.0.0.1:8545";
        const provider = new ethers.JsonRpcProvider(rpcUrl);

        const signer = await provider.getSigner(0);
        console.log("Using signer address:", await signer.getAddress());

        // Load config
        const { helloABI, helloAddress } = loadHelloArtifact();

        console.log("✅ Contract address:", helloAddress);

        const hello = new ethers.Contract(helloAddress, helloABI, signer);

        // Read
        console.log("greet():", await hello.greet());
        console.log("getName():", await hello.getName());
        console.log("getMaxUint256():", (await hello.getMaxUint256()).toString());
        console.log("sumUpTo(100):", (await hello.sumUpTo(100n)).toString());

        // Write
        console.log("\n⏳ Sending transaction...");
        const tx = await hello.setName(myNewName);
        console.log("Transaction hash:", tx.hash);

        const receipt = await tx.wait();
        console.log("Mined in block:", receipt.blockNumber);

        const updatedName = await hello.getName();
        console.log("Name updated to:", updatedName);

    } catch (error) {
        console.error("❌ Error:", error);
    }
}

main();
