const { Web3 } = require('web3');

async function main() {
    try {
        // Private RPC endpoint.
        const web3 = new Web3('http://127.0.0.1:8545');

        const helloABI = require('./abi/Hello.json').abi;

        const helloAddr = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        const hello = new web3.eth.Contract(helloABI, helloAddr);

        const text = await hello.methods.greet().call();

        console.log(text);

        const name = await hello.methods.getMyName().call();

        console.log(name);
    }
    catch (err) {
        console.log(err);
    }
}

main();
