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

    // https://docs.web3js.org/guides/wallet/metamask-react/
    // https://docs.web3js.org/guides/wallet/transactions/
    async function requestAccount() {
        console.log("Requesting account...");

        if (window.ethereum) {
            console.log("Metamask wallet detected.");

            try {
                const w3 = new Web3(window.ethereum);
                setWeb3(w3);

                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });

                setSenderWallet(accounts[0]);
                setReceiverWallet(accounts[0]);

                /* console.log("AAA" + accounts[0]);
                console.log("BBB" + senderWallet);
                console.log("Web3" + web3); */
            } catch (error) {
                console.log(error);
                alert("Error connecting wallet.");
            }
        } else {
            alert("Metamask wallet absent.");
        }
    }

    async function getSenderBalance() {
        try {
            const balanceInWei = await web3.eth.getBalance(senderWallet);

            setSenderBalance(balanceInWei);
        } catch (error) {
            alert("Error getting sender's balance.");
        }
    }

    async function getReceiverBalance() {
        try {
            const balanceInWei = await web3.eth.getBalance(receiverWallet);

            setReceiverBalance(balanceInWei);
        } catch (error) {
            alert("Error getting receiver's balance.");
        }
    }

    async function transfer() {
        try {
            await web3.eth.sendTransaction({
                from: senderWallet,
                to: receiverWallet,
                value: web3.utils.toWei(transferAmount, "ether")
            }).then(function (receipt) {
                console.log(receipt);

                getSenderBalance();

                getReceiverBalance();
            });
        } catch (error) { alert(error); }
    }

    useEffect(() => {
        console.log("Sender's balance has changed to: " + senderBalance);
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
                <p>Receiver's wallet address: <input value={receiverWallet} onChange={(event) => setReceiverWallet(event.target.value)}></input></p>
                <p>Transfer amount (Ether): <input value={transferAmount} onChange={(event) => setTransferAmount(event.target.value)}></input></p>
                <p>Receiver's balance: {receiverBalance.toString()} Wei = {(web3 == null) ? 0 : Math.round(web3.utils.fromWei(receiverBalance, 'ether') * 100) / 100} Ether</p>
            </header>
        </div>
    );
}

export default App;
