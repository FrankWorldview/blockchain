import './App.css';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import LogoETH from './assets/logo-eth.svg';
import LogoPepe from './assets/logo-pepe.svg';

function App() {
    // React state hooks
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [senderWallet, setSenderWallet] = useState('');
    const [senderBalance, setSenderBalance] = useState('0');
    const [receiverWallet, setReceiverWallet] = useState('Receiver Wallet Address');
    const [transferAmount, setTransferAmount] = useState(1);
    const [receiverBalance, setReceiverBalance] = useState('0');

    // Connect to MetaMask wallet
    async function connectWallet() {
        if (!window.ethereum) {
            alert('MetaMask not installed');
            return;
        }

        try {
            const ethProvider = new ethers.BrowserProvider(window.ethereum);
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

            if (accounts.length === 0) {
                throw new Error('No accounts found. MetaMask might be locked.');
            }

            const signerInstance = await ethProvider.getSigner();
            setProvider(ethProvider);
            setSigner(signerInstance);
            setSenderWallet(await signerInstance.getAddress());
        } catch (error) {
            console.error('MetaMask not connected:', error);
            alert('Failed to connect MetaMask');
        }
    }

    // Refresh balance of sender wallet
    async function refreshSenderBalance() {
        try {
            const balance = await provider.getBalance(senderWallet);
            setSenderBalance(balance.toString());
        } catch (error) {
            console.error(error);
            alert('Error occurred when getting sender balance');
        }
    }

    // Refresh balance of receiver wallet
    async function refreshReceiverBalance() {
        try {
            const balance = await provider.getBalance(receiverWallet);
            setReceiverBalance(balance.toString());
        } catch (error) {
            console.error(error);
            alert('Error occurred when getting receiver balance');
        }
    }

    // Send Ether
    async function transfer() {
        if (!signer || !senderWallet || !receiverWallet) {
            alert("Wallet not connected or addresses not ready");
            return;
        }

        if (isNaN(transferAmount) || transferAmount <= 0) {
            alert("Please enter a valid transfer amount");
            return;
        }

        try {
            const tx = {
                to: receiverWallet,
                value: ethers.parseEther(transferAmount.toString())
            };

            // Estimate gas
            const gasEstimate = await provider.estimateGas({
                ...tx,
                from: senderWallet
            });

            console.log('Estimated gas:', gasEstimate.toString());

            // Send transaction
            const txResponse = await signer.sendTransaction({ ...tx, gasLimit: gasEstimate });
            console.log('Transaction sent:', txResponse.hash);

            const receipt = await txResponse.wait();
            console.log('Transaction confirmed:', receipt);

            await refreshSenderBalance();
            await refreshReceiverBalance();
            alert('Transfer successful!');
        } catch (error) {
            console.error(error);
            alert('Transfer failed: ' + error.message);
        }
    }

    // Log sender balance when updated
    useEffect(() => {
        console.log('Sender balance:', senderBalance);
    }, [senderBalance]);

    // Handle MetaMask account changes
    useEffect(() => {
        if (!window.ethereum) return;

        const handleAccountsChanged = async (newAccounts) => {
            console.log('Account changed:', newAccounts);
            setSenderWallet(newAccounts[0]);
            if (provider) {
                const signerInstance = await provider.getSigner();
                setSigner(signerInstance);
            }
        };

        window.ethereum.on('accountsChanged', handleAccountsChanged);
        return () => {
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        };
    }, [provider]);

    return (
        <>
            <div>
                <a>
                    <img src={LogoETH} className="logo" alt="Ethereum logo" />
                </a>
                <a>
                    <img src={LogoPepe} className="logo react" alt="Pepe logo" />
                </a>
            </div>

            <h1>Transfer Ether</h1>

            <div className="card">
                <button onClick={connectWallet}>Connect MetaMask Wallet</button>

                <p>My Wallet Address: {senderWallet}</p>

                <button onClick={refreshSenderBalance} disabled={!senderWallet || !provider}>
                    Refresh My Balance
                </button>
                <p>
                    My Balance: {senderBalance} Wei ={' '}
                    {provider == null ? 0 : parseFloat(ethers.formatEther(senderBalance)).toFixed(4)} ETH
                </p>

                <button onClick={transfer} disabled={!signer}>
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

                <button onClick={refreshReceiverBalance} disabled={!receiverWallet || !provider}>
                    Refresh Receiver Balance
                </button>

                <p>
                    Receiver Balance: {receiverBalance} Wei ={' '}
                    {provider == null ? 0 : parseFloat(ethers.formatEther(receiverBalance)).toFixed(4)} ETH
                </p>
            </div>
        </>
    );
}

export default App;
