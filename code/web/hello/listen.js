const { ethers } = require("ethers");
const { loadHelloArtifact } = require("./config");

function main() {
    try {
        // Web socket provider
        const wsUrl = "ws://127.0.0.1:8545";
        const provider = new ethers.WebSocketProvider(wsUrl);

        // Load the contract ABI and address
        const { helloABI, helloAddress } = loadHelloArtifact();

        console.log("✅ Contract address:", helloAddress);
        console.log("⏳ Listening for NameChanged events...\n");

        // Create a contract instance to interact with the deployed Hello contract
        const hello = new ethers.Contract(helloAddress, helloABI, provider);

        // Subscribe to the NameChanged event and execute the callback whenever the event is emitted on-chain
        hello.on("NameChanged", (changer, newName, event) => {
            console.log("✅ Event received: NameChanged");
            console.log("   changer:", changer);
            console.log("   newName:", newName);
            console.log("   txHash :", event.log.transactionHash);
            console.log("----------------------------------------");

            // Persist event data to backend systems (e.g., database, message queue, analytics)
        });
    } catch (error) {
        console.error("❌ Error:", error);
    }
}

main();
