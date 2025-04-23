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
    const connectWallet = async () => {
        if (!window.ethereum) {
            alert('MetaMask not installed');
            return;
        }
        try {
            const web3Instance = new Web3(window.ethereum); // Create Web3 instance using MetaMask provider
            setWeb3(web3Instance);

            const userAccounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });

            setSenderWallet(userAccounts[0]); // Set user's wallet address
        } catch (error) {
            console.error('User denied account access:', error);
        }
    };

    // Get balance of sender wallet
    async function getSenderBalance() {
        try {
            const balanceInWei = await web3.eth.getBalance(senderWallet);
            setSenderBalance(balanceInWei);
        } catch (error) {
            console.error(error);
            alert('Error occurred when getting sender balance');
        }
    }

    // Get balance of receiver wallet
    async function getReceiverBalance() {
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
            alert("Please enter a valid transfer amount.");
            return;
        }

        try {
            // Estimate gas for the transaction
            const gas = await web3.eth.estimateGas({
                from: senderWallet,
                to: receiverWallet,
                value: web3.utils.toWei(transferAmount.toString(), 'ether')
            });

            // Send the transaction
            const receipt = await web3.eth.sendTransaction({
                from: senderWallet,
                to: receiverWallet,
                value: web3.utils.toWei(transferAmount.toString(), 'ether'),
                gas: gas
            });

            console.log('Receipt:', receipt);

            // Update balances after transaction
            await getSenderBalance();
            await getReceiverBalance();

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
        return () => {
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        };
    }, []);

    // --- JSX Rendering ---
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

                <button onClick={getSenderBalance} disabled={!senderWallet}>
                    Get My Balance
                </button>
                <p>
                    My Balance: {senderBalance} Wei ={' '}
                    {web3 == null ? 0 : parseFloat(web3.utils.fromWei(senderBalance, 'ether')).toFixed(4)} Ether
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

                <button onClick={getReceiverBalance} disabled={!receiverWallet || !web3}>
                    Get Receiver Balance
                </button>

                <p>
                    Receiver Balance: {receiverBalance} Wei ={' '}
                    {web3 == null ? 0 : parseFloat(web3.utils.fromWei(receiverBalance, 'ether')).toFixed(4)} Ether
                </p>
            </div>
        </>
    );
}

export default App;
