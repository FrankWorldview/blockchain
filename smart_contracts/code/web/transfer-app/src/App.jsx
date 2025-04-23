import './App.css';

import { Web3 } from 'web3';
import { useState, useEffect } from 'react';

import LogoETH from './assets/logo-eth.svg'
import LogoPepe from './assets/logo-pepe.svg';

function App() {
    const [web3, setWeb3] = useState(null);
    const [senderWallet, setSenderWallet] = useState('');
    const [senderBalance, setSenderBalance] = useState(0);
    const [receiverWallet, setReceiverWallet] = useState('Receiver Wallet Address');
    const [transferAmount, setTransferAmount] = useState(1);
    const [receiverBalance, setReceiverBalance] = useState(0);

    const connectWallet = async () => {
        if (!window.ethereum) {
            alert('MetaMask not installed');
            return;
        }
        try {
            const web3Instance = new Web3(window.ethereum);
            setWeb3(web3Instance);

            const userAccounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });

            setSenderWallet(userAccounts[0]);
            setReceiverWallet(userAccounts[0]);
        } catch (error) {
            console.error('User denied account access:', error);
        }
    };

    async function getSenderBalance() {
        try {
            const balanceInWei = await web3.eth.getBalance(senderWallet);

            setSenderBalance(balanceInWei);
        } catch (error) {
            console.error(error);
            alert('Error occurred when getting sender balance');
        }
    }

    async function getReceiverBalance() {
        try {
            const balanceInWei = await web3.eth.getBalance(receiverWallet);

            setReceiverBalance(balanceInWei);
        } catch (error) {
            console.log(error);
            alert('Error occurred when getting receiver balance');
        }
    }

    async function transfer() {
        try {
            const receipt = await web3.eth.sendTransaction({
                from: senderWallet,
                to: receiverWallet,
                value: web3.utils.toWei(transferAmount, 'ether'),
                gas: 21000
            });

            console.log('Receipt:', receipt);

            // Not perfect here. alert() may show beforehand.
            await getSenderBalance();
            await getReceiverBalance();

            alert('Transfer has been successful');
        } catch (error) {
            console.log(error);
            alert('Transfer failed: ' + error.message);
        }
    }

    useEffect(() => {
        console.log('Sender balance:', senderBalance);
    }, [senderBalance]);

    useEffect(() => {
        if (!window.ethereum) return undefined;

        const handleAccountsChanged = (newAccounts) => {
            console.log('Account changed:', newAccounts);
            setSenderWallet(newAccounts[0]);
        };

        window.ethereum.on('accountsChanged', handleAccountsChanged);

        // Without the return function, you would be stacking up listeners every time the component mounts, which causes memory leaks
        // Because [] is passed:
        // The return function runs once when the component unmounts
        // It will not run on re-renders, because the effect never re-runs
        return () => {
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        };
    }, []);

    return (
        <>
            <div>
                <a>
                    <img src={logoETH} className="logo" alt="Ethereum logo" />
                </a>
                <a>
                    <img src={logoPepe} className="logo react" alt="Pepe logo" />
                </a>
            </div>
            <h1>Transfer Ether</h1>
            <div className="card">
                <button onClick={connectWallet}>Connect Metamask Wallet</button>
                <p>My Wallet Address: {senderWallet}</p>
                <button onClick={getSenderBalance}>Get My Balance</button>
                <p>My Balance: {senderBalance} Wei = {(web3 == null) ? 0 : Math.round(web3.utils.fromWei(senderBalance, 'ether') * 100) / 100} Ether</p>
                <button onClick={transfer}>Transfer</button>
                <p>Receiver Wallet Address: <input value={receiverWallet} onChange={(event) => setReceiverWallet(event.target.value)}></input></p>
                <p>Transfer Amount (Ether): <input value={transferAmount} onChange={(event) => setTransferAmount(event.target.value)}></input></p>
                <p>Receiver Balance: {receiverBalance} Wei = {(web3 == null) ? 0 : Math.round(web3.utils.fromWei(receiverBalance, 'ether') * 100) / 100} Ether</p>
            </div>
        </>
    )
}

export default App;
