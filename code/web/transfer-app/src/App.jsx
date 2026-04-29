import './App.css';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import LogoETH from './assets/logo-eth.svg';
import LogoPepe from './assets/logo-pepe.svg';

function App() {
    // ===== State: blockchain connection =====
    const [provider, setProvider] = useState(null); // Read-only wallet provider
    const [signer, setSigner] = useState(null); // Signer can send transactions

    // ===== State: sender =====
    const [senderWallet, setSenderWallet] = useState('');
    const [senderBalance, setSenderBalance] = useState('0'); // Wei as string

    // ===== State: receiver =====
    const [receiverWallet, setReceiverWallet] = useState('');
    const [receiverBalance, setReceiverBalance] = useState('0'); // Wei as string

    // ===== State: transaction input =====
    // Use string, not number, to avoid floating-point precision problems
    const [transferAmount, setTransferAmount] = useState('1');

    // ===== State: transaction status =====
    const [isTransferring, setIsTransferring] = useState(false);
    const [txHash, setTxHash] = useState('');
    const [txStatus, setTxStatus] = useState('');

    // ===== Check if MetaMask / wallet provider exists =====
    const hasProvider =
        typeof window !== 'undefined' && !!window.ethereum;

    // ===== Validate Ethereum address =====
    const isValidAddress = (addr) => ethers.isAddress(addr);

    // ===== Convert Wei -> ETH for display =====
    const fmtEth = (weiStr) => {
        try {
            return parseFloat(ethers.formatEther(weiStr)).toFixed(4);
        } catch {
            return '0.0000';
        }
    };

    // ===== Validate ETH amount =====
    function isValidEthAmount(value) {
        try {
            if (!value) return false;

            // parseEther throws if the string format is invalid
            ethers.parseEther(value);

            return true;
        } catch {
            return false;
        }
    }

    // ===== Connect MetaMask wallet =====
    async function connectWallet() {
        if (!hasProvider) {
            alert('MetaMask not installed');
            return;
        }

        try {
            // Create provider connected to MetaMask
            const ethProvider = new ethers.BrowserProvider(window.ethereum);

            // Ask user to connect wallet
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            // Get signer from currently selected MetaMask account
            const newSigner = await ethProvider.getSigner();
            const addr = await newSigner.getAddress();

            // Save connection state
            setProvider(ethProvider);
            setSigner(newSigner);
            setSenderWallet(addr);

            // Fetch sender balance immediately
            const balance = await ethProvider.getBalance(addr);
            setSenderBalance(balance.toString());
        } catch (error) {
            console.error('Connect wallet failed:', error);
            alert('Failed to connect wallet');
        }
    }

    // ===== Refresh sender balance =====
    async function refreshSenderBalance() {
        if (!provider || !isValidAddress(senderWallet)) return;

        const balance = await provider.getBalance(senderWallet);
        setSenderBalance(balance.toString());
    }

    // ===== Refresh receiver balance =====
    async function refreshReceiverBalance() {
        if (!provider || !isValidAddress(receiverWallet)) return;

        const balance = await provider.getBalance(receiverWallet);
        setReceiverBalance(balance.toString());
    }

    // ===== Send ETH transaction =====
    async function transfer() {
        if (!signer) {
            alert('Wallet not connected');
            return;
        }

        if (!isValidAddress(receiverWallet)) {
            alert('Invalid receiver address');
            return;
        }

        if (!isValidEthAmount(transferAmount)) {
            alert('Invalid amount');
            return;
        }

        try {
            setIsTransferring(true);
            setTxHash('');
            setTxStatus('Preparing transaction...');

            // 1️⃣ Prepare transaction request
            // This object describes the transaction, but it has NOT been sent yet.
            const txRequest = {
                to: receiverWallet,
                value: ethers.parseEther(transferAmount), // ETH string -> Wei bigint
            };

            setTxStatus('Waiting for wallet confirmation...');

            // 2️⃣ Send transaction
            // txResponse means the transaction has been signed and broadcast.
            const txResponse = await signer.sendTransaction(txRequest);

            setTxHash(txResponse.hash);
            setTxStatus('Transaction sent. Waiting to be mined...');

            console.log('Transaction hash:', txResponse.hash);

            // 3️⃣ Wait for confirmation
            // receipt means the transaction has been included in a block.
            const receipt = await txResponse.wait();

            console.log('Transaction receipt:', receipt);
            console.log('Confirmed in block:', receipt.blockNumber);

            setTxStatus(`Confirmed in block ${receipt.blockNumber}`);

            // Balances should be refreshed after the transaction is mined.
            await refreshSenderBalance();
            await refreshReceiverBalance();

            alert('Transfer successful');
        } catch (error) {
            console.error('Transfer failed:', error);
            setTxStatus('Transaction failed or rejected');
            alert('Transfer failed or rejected');
        } finally {
            setIsTransferring(false);
        }
    }

    // ===== Handle MetaMask account / chain changes =====
    useEffect(() => {
        if (!hasProvider) return;

        const handleAccountsChanged = async (accounts) => {
            console.log('Accounts changed:', accounts);

            // User disconnected wallet or locked MetaMask
            if (!accounts || accounts.length === 0) {
                setProvider(null);
                setSigner(null);
                setSenderWallet('');
                setSenderBalance('0');
                setTxHash('');
                setTxStatus('');
                return;
            }

            // Re-create provider and signer to avoid stale wallet state
            const newProvider = new ethers.BrowserProvider(window.ethereum);
            const newSigner = await newProvider.getSigner();
            const addr = await newSigner.getAddress();

            setProvider(newProvider);
            setSigner(newSigner);
            setSenderWallet(addr);

            const balance = await newProvider.getBalance(addr);
            setSenderBalance(balance.toString());
        };

        const handleChainChanged = (chainId) => {
            console.log('Chain changed:', chainId);

            // Reload is the safest beginner-friendly approach.
            // It clears stale provider/signer/network state.
            window.location.reload();
        };

        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', handleChainChanged);

        return () => {
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            window.ethereum.removeListener('chainChanged', handleChainChanged);
        };
    }, [hasProvider]);

    // ===== Auto-refresh receiver balance when receiver address changes =====
    useEffect(() => {
        if (!provider) return;

        if (!isValidAddress(receiverWallet)) {
            setReceiverBalance('0');
            return;
        }

        refreshReceiverBalance();
    }, [receiverWallet, provider]);

    return (
        <section id="center">
            {/* Logos */}
            <div>
                <img src={LogoETH} width="120" alt="Ethereum logo" />
                <img src={LogoPepe} width="120" alt="Pepe logo" />
            </div>

            <h2>Transfer Ether</h2>

            {/* Connect wallet */}
            <button onClick={connectWallet} disabled={isTransferring}>
                {signer ? 'Connected' : 'Connect MetaMask'}
            </button>

            {/* Sender info */}
            <p>My Wallet Address: {senderWallet || 'Not connected'}</p>

            <p>
                My Balance: {senderBalance} Wei = {fmtEth(senderBalance)} ETH
            </p>

            {/* Receiver address input */}
            <p>
                <span>Receiver Wallet Address: </span>
                <input
                    value={receiverWallet}
                    onChange={(e) => setReceiverWallet(e.target.value.trim())}
                    placeholder="0x..."
                    disabled={isTransferring}
                />
            </p>

            {/* Amount input */}
            <p>
                <span>Transfer Amount (Ether): </span>
                <input
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    type="text"
                    inputMode="decimal"
                    placeholder="0.01"
                    disabled={isTransferring}
                />
            </p>

            {/* Transfer button */}
            <button
                onClick={transfer}
                disabled={
                    isTransferring ||
                    !signer ||
                    !isValidAddress(receiverWallet) ||
                    !isValidEthAmount(transferAmount)
                }
            >
                {isTransferring ? 'Processing...' : 'Transfer'}
            </button>

            {/* Receiver balance */}
            <p>
                Receiver Balance: {receiverBalance} Wei = {fmtEth(receiverBalance)} ETH
            </p>

            {/* Transaction status */}
            {txStatus && (
                <p>
                    Transaction Status: {txStatus}
                </p>
            )}

            {/* Transaction hash */}
            {txHash && (
                <p>
                    Transaction Hash: {txHash}
                </p>
            )}
        </section>
    );
}

export default App;
