const { Web3 } = require('web3');

// Private RPC endpoint.
const web3 = new Web3('http://127.0.0.1:8545');

async function getBlockchainInfo() {
    // Get the chain id of the current provider.
    const chainId = await web3.eth.getChainId();
    console.log("Chian id:", chainId);

    // Get the last block number.
    const blockNumber = await web3.eth.getBlockNumber();
    console.log("Block number:", blockNumber);

    // Get the current gas price.
    const gasPrice = await web3.eth.getGasPrice();
    console.log("Gas price:", gasPrice);

    // Get the balance of an address.
    const addr = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
    const balance = await web3.eth.getBalance(addr);
    console.log("Balance of %s: %i", addr, balance);
}

async function getBalances() {
    console.log("All accounts and balances:");

    const accounts = await web3.eth.getAccounts();

    for (let account of accounts) {
        const balance = await web3.eth.getBalance(account);
        console.log(`Account: ${account}, Balance: ${web3.utils.fromWei(balance, 'ether')} ETH`);
    }
}

async function main() {
    await getBlockchainInfo();

    await getBalances();
}

main();
