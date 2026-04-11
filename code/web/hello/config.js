const fs = require("fs");

const abiPath = "D:/Solidity/hello/out/Hello.sol/Hello.json";
const broadcastPath = "D:/Solidity/hello/broadcast/Hello.s.sol/31337/run-latest.json";

function loadHelloArtifact() {
    const helloABI = require(abiPath).abi;

    const broadcastData = JSON.parse(
        fs.readFileSync(broadcastPath, "utf-8")
    );

    const helloAddress =
        broadcastData?.receipts?.[0]?.contractAddress ??
        broadcastData?.transactions?.[0]?.contractAddress;

    if (!helloAddress) {
        throw new Error("❌ Cannot find contractAddress in broadcast JSON");
    }

    return { helloABI, helloAddress };
}

module.exports = { loadHelloArtifact };
