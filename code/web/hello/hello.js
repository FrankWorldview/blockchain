// SPDX-License-Identifier: MIT
// Example: Interacting with Hello.sol using Ethers.js v6 + Event Listening

const { ethers } = require("ethers");
const fs = require("fs");

async function main() {
    try {
        // 1) Connect to local RPC (Anvil / Hardhat / Ganache)
        const rpcUrl = "http://127.0.0.1:8545";
        const provider = new ethers.JsonRpcProvider(rpcUrl);
        provider.pollingInterval = 500; // optional: faster polling for events

        // If you prefer near-zero latency and your node exposes WS, use:
        // const provider = new ethers.WebSocketProvider("ws://127.0.0.1:8545");

        // 2) Get signer
        const signer = await provider.getSigner(0);
        console.log("Using signer address:", await signer.getAddress());

        // 3) Load ABI
        const abiPath = "D:/Solidity/hello/out/Hello.sol/Hello.json";
        const helloABI = require(abiPath).abi;
        console.log("✅ Contract ABI loaded successfully");

        // 4) Read deployed address from Foundry broadcast
        const broadcastPath =
            "D:/Solidity/hello/broadcast/Hello.s.sol/31337/run-latest.json";
        const broadcastData = JSON.parse(fs.readFileSync(broadcastPath, "utf-8"));
        const helloAddress =
            broadcastData?.receipts?.[0]?.contractAddress ??
            broadcastData?.transactions?.[0]?.contractAddress;

        if (!helloAddress) throw new Error("❌ Cannot find contractAddress in broadcast JSON");
        console.log("✅ Contract address:", helloAddress);

        // 5) Contract instance
        const hello = new ethers.Contract(helloAddress, helloABI, signer);

        // ---- 🔔 Register event listener BEFORE sending the tx ----
        // event NameChanged(address indexed changer, string newName);
        hello.on("NameChanged", (changer, newName) => {
            console.log("\n✅ Event: NameChanged");
            console.log("  changer   :", changer);
            console.log("  newName   :", newName);
        });

        // ---- Read-only calls ----
        console.log("greet():", await hello.greet());
        console.log("getMyName():", await hello.getMyName());
        console.log("getMaxUint256():", (await hello.getMaxUint256()).toString());
        console.log("sumUpTo(100):", (await hello.sumUpTo(100n)).toString());

        // ---- Write call ----
        console.log("\n⏳ Sending transaction to setMyName('Frank')...");
        const tx = await hello.setMyName("Frank");
        console.log("Transaction hash:", tx.hash);

        const receipt = await tx.wait();
        console.log("✅ Transaction mined in block", receipt.blockNumber);

        const updatedName = await hello.getMyName();
        console.log("Updated name:", updatedName);

        // Keep process alive briefly to ensure event prints (for HTTP polling)
        console.log("\n⏳ Waiting briefly for event logs... Press Ctrl+C to exit.");
        setTimeout(() => process.exit(0), 4000);

    } catch (error) {
        console.error("❌ Error interacting with the contract:", error);
    }
}

main();
