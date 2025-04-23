import './App.css';

import { Web3 } from 'web3';
import { useState, useEffect } from 'react';

import LogoETH from './assets/logo-eth.svg';
import LogoPepe from './assets/logo-pepe.svg';

function App() {
    // React state hooks
    const [web3, setWeb3] = useState(null); // Web3 instance
    const [senderWallet, setSenderWallet] = useState(''); // Current user's wallet address
    const [senderBalance, setSenderBalance] = useState(0); // Sender's balance in Wei
    const [receiverWallet, setReceiverWallet] = useState('Receiver Wallet Address'); // Target address for transfer
    const [transferAmount, setTransferAmount] = useState(1); // ETH amount to transfer
    const [receiverBalance, setReceiverBalance] = useState(0); // Receiver's balance in Wei

    // Connect to MetaMask wallet
    async function connectWallet() {
        // This is the injected Ethereum provider object that MetaMask (or similar wallets) makes available in the browser. If MetaMask is installed, it adds this to the window object.
        if (!window.ethereum) {
            alert('MetaMask not installed');
            return;
        }

        try {
            // This is the standard JSON-RPC call to request access to the user's accounts. It triggers the MetaMask extension to pop up a prompt asking the user to approve the connection.
            const userAccounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });

            if (userAccounts.length > 0) {
                const web3Instance = new Web3(window.ethereum); // Create Web3 instance using MetaMask provider
                setWeb3(web3Instance);
                setSenderWallet(userAccounts[0]); // Set user's wallet address
            } else {
                throw new Error('No accounts returned. MetaMask might be locked or not connected.');
            }
        } catch (error) {
            console.error('MetaMask not connected:', error);
        }
    };

    // Refresh balance of sender wallet
    async function refreshSenderBalance() {
        try {
            const balanceInWei = await web3.eth.getBalance(senderWallet);
            setSenderBalance(balanceInWei);
        } catch (error) {
            console.error(error);
            alert('Error occurred when getting sender balance');
        }
    }

    // Refresh balance of receiver wallet
    async function refreshReceiverBalance() {
        try {
            const balanceInWei = await web3.eth.getBalance(receiverWallet);
            setReceiverBalance(balanceInWei);
        } catch (error) {
            console.log(error);
            alert('Error occurred when getting receiver balance');
        }
    }

    // Send Ether from senderWallet to receiverWallet
    async function transfer() {
        if (!web3 || !senderWallet || !receiverWallet) {
            alert("Wallet not connected or addresses not ready");
            return;
        }

        // Optional: validate input amount
        if (isNaN(transferAmount) || transferAmount <= 0) {
            alert("Please enter a valid transfer amount");
            return;
        }

        try {
            // Estimate gas for the transaction (No signature required)
            const gas = await web3.eth.estimateGas({
                from: senderWallet,
                to: receiverWallet,
                value: web3.utils.toWei(transferAmount.toString(), 'ether')
            });

            // Send the transaction (Signature required)
            const receipt = await web3.eth.sendTransaction({
                from: senderWallet,
                to: receiverWallet,
                value: web3.utils.toWei(transferAmount.toString(), 'ether'),
                gas: gas
            });

            // A transaction receipt is a detailed confirmation returned by the Ethereum network after a transaction is included in a block. It's your proof of execution — your "blockchain receipt."
            console.log('Receipt:', receipt);

            // Refresh balances after transaction
            await refreshSenderBalance();
            await refreshReceiverBalance();

            alert('Transfer has been successful');
        } catch (error) {
            console.log(error);
            alert('Transfer failed: ' + error.message);
        }
    }

    // Log sender balance when it updates
    useEffect(() => {
        console.log('Sender balance:', senderBalance);
    }, [senderBalance]);

    // Handle MetaMask account change events
    useEffect(() => {
        if (!window.ethereum) return undefined;

        const handleAccountsChanged = (newAccounts) => {
            console.log('Account changed:', newAccounts);
            setSenderWallet(newAccounts[0]); // Update wallet address
        };

        // Register listener
        window.ethereum.on('accountsChanged', handleAccountsChanged);

        // Cleanup listener on component unmount
        // Without the return function, you would be stacking up listeners every time the component mounts, which causes memory leaks
        // Because [] is passed:
        // The return function runs once when the component unmounts
        // It will not run on re-renders, because the effect never re-runs
        return () => {
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        };
    }, []);

    // --- JSX rendering ---
    return (
        <>
            {/* Logo section */}
            <div>
                <a>
                    <img src={LogoETH} className="logo" alt="Ethereum logo" />
                </a>
                <a>
                    <img src={LogoPepe} className="logo react" alt="Pepe logo" />
                </a>
            </div>

            <h1>Transfer Ether</h1>

            {/* Main UI Card */}
            <div className="card">
                <button onClick={connectWallet}>Connect MetaMask Wallet</button>

                <p>My Wallet Address: {senderWallet}</p>

                <button onClick={refreshSenderBalance} disabled={!senderWallet || !web3}>
                    Refresh My Balance
                </button>
                <p>
                    {/* {' '} is JSX syntax for explicitly rendering a space character. */}
                    My Balance: {senderBalance} Wei ={' '}
                    {web3 == null ? 0 : parseFloat(web3.utils.fromWei(senderBalance.toString(), 'ether')).toFixed(4)} Ether
                    {/* This is converting the sender's balance from wei (smallest ETH unit) into Ether, then rounding it to 4 decimal places for display. */}
                </p>

                <button onClick={transfer} disabled={!senderWallet || !web3}>
                    Transfer
                </button>

                <p>
                    Receiver Wallet Address:{' '}
                    <input
                        value={receiverWallet}
                        onChange={(event) => setReceiverWallet(event.target.value)}
                    />
                </p>

                <p>
                    Transfer Amount (Ether):{' '}
                    <input
                        value={transferAmount}
                        onChange={(event) => setTransferAmount(Number(event.target.value))}
                    />
                </p>

                <button onClick={refreshReceiverBalance} disabled={!receiverWallet || !web3}>
                    Refresh Receiver Balance
                </button>

                <p>
                    Receiver Balance: {receiverBalance} Wei ={' '}
                    {web3 == null ? 0 : parseFloat(web3.utils.fromWei(receiverBalance.toString(), 'ether')).toFixed(4)} Ether
                </p>
            </div>
        </>
    );
}

export default App;
