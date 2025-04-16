import logo from './logo.svg';
import './App.css';

import { useState, useEffect } from 'react';

const { Web3 } = require('web3');

function App() {
    const [web3, setWeb3] = useState(null);
    const [senderWallet, setSenderWallet] = useState(null);
    const [senderBalance, setSenderBalance] = useState(0);
    const [receiverWallet, setReceiverWallet] = useState("Receiver's wallet address");
    const [transferAmount, setTransferAmount] = useState(0.01);
    const [receiverBalance, setReceiverBalance] = useState(0);

    async function requestAccount() {
        console.log("Requesting account...");

        if (window.ethereum) {
            console.log("MetaMask wallet detected.");

            try {
                const w3 = new Web3(window.ethereum);
                setWeb3(w3);

                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });

                setSenderWallet(accounts[0]);
                setReceiverWallet(accounts[0]);
            } catch (err) {
                console.log(err);
                alert("Error occurred when connecting MetaMask wallet.");
            }
        } else {
            alert("MetaMask wallet absent.");
        }
    }

    async function getSenderBalance() {
        try {
            const balanceInWei = await web3.eth.getBalance(senderWallet);

            setSenderBalance(balanceInWei);
        } catch (err) {
            console.log(err);
            alert("Error occurred when getting sender balance.");
        }
    }

    async function getReceiverBalance() {
        try {
            const balanceInWei = await web3.eth.getBalance(receiverWallet);

            setReceiverBalance(balanceInWei);
        } catch (err) {
            console.log(err);
            alert("Error occurred when getting receiver balance.");
        }
    }

    async function transfer() {
        try {
            const receipt = await web3.eth.sendTransaction({
                from: senderWallet,
                to: receiverWallet,
                value: web3.utils.toWei(transferAmount, "ether"),
                gas: 100000
            });

            console.log(receipt);

            // Not perfect here. alert() may show beforehand.
            await getSenderBalance();
            await getReceiverBalance();

            alert("Transfer has been successful.");
        } catch (err) {
            console.log(err);
            alert("Transfer failed: " + err.message);
        }
    }

    async function withdraw() {
        try {
            const donationAddr = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

            // Check if the Donation contract exists.
            const code = await web3.eth.getCode(donationAddr);
            if (code === '0x') {
                alert("No donation contract deployed.");
                return;
            }

            const donationABI = require('./abi/Donation.json').abi;

            const donation = new web3.eth.Contract(donationABI, donationAddr);

            // Simulate the call first to check for revert reasons.
            await donation.methods.withdraw().call({ from: senderWallet });

            // If no error, send the actual transaction.
            await donation.methods.withdraw().send({ from: senderWallet });

            alert("Withdrawal from the Donation contract has been successful.");
        }
        catch (err) {
            // Handle error and check for revert reason within error.data.
            if (err.data) {
                const revertReason = err.data.message;

                if (revertReason.includes("No funds to withdraw.")) {
                    alert("Error: No funds available for withdrawal.");
                } else {
                    console.log("Revert reason:", revertReason);
                    alert("Unknown revert error: " + revertReason);
                }
            } else {
                console.log(err);
                alert("Unexpected error: " + err.message);
            }
        }
    }

    useEffect(() => {
        console.log("Sender balance has changed to:", senderBalance);
    }, [senderBalance]);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <button onClick={requestAccount}>Connect Metamask wallet</button>
                <p>My wallet address: {senderWallet}</p>
                <button onClick={getSenderBalance}>Get my balance</button>
                <p>My balance: {senderBalance.toString()} Wei = {(web3 == null) ? 0 : Math.round(web3.utils.fromWei(senderBalance, 'ether') * 100) / 100} Ether</p>
                <button onClick={transfer}>Transfer</button>
                <p>Receiver wallet address: <input value={receiverWallet} onChange={(event) => setReceiverWallet(event.target.value)}></input></p>
                <p>Transfer amount (Ether): <input value={transferAmount} onChange={(event) => setTransferAmount(event.target.value)}></input></p>
                <p>Receiver balance: {receiverBalance.toString()} Wei = {(web3 == null) ? 0 : Math.round(web3.utils.fromWei(receiverBalance, 'ether') * 100) / 100} Ether</p>
                <button onClick={withdraw}>Withdraw</button>
            </header>
        </div>
    );
}

export default App;
