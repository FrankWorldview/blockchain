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
    const [receiverWallet, setReceiverWallet] = useState('');
    const [receiverBalance, setReceiverBalance] = useState('0');
    const [transferAmount, setTransferAmount] = useState(1);

    // typeof window !== 'undefined':
    // Ensure we're running in a browser.
    // !!window.ethereum:
    // Coerce the presence of an injected Ethereum provider into a boolean (true if available, false if not).
    const hasProvider = (typeof window !== 'undefined') && (!!window.ethereum);

    // Helper guards
    const isValidAddress = (addr) => ethers.isAddress(addr);

    // Formatters
    const fmtEth = (weiStr) => {
        try { return parseFloat(ethers.formatEther(weiStr)).toFixed(4); }
        catch { return '0.0000'; }
    };

    // Connect to MetaMask wallet
    async function connectWallet() {
        if (!hasProvider) {
            alert('MetaMask not installed');
            return;
        }

        try {
            const ethProvider = new ethers.BrowserProvider(window.ethereum);
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

            if (!accounts || accounts.length === 0) {
                throw new Error('No accounts found. MetaMask might be locked.');
            }

            const signer = await ethProvider.getSigner();

            setProvider(ethProvider);
            setSigner(signer);

            const addr = await signer.getAddress();
            setSenderWallet(addr);

            // Auto-refresh sender balance immediately after connecting
            const bal = await ethProvider.getBalance(addr);
            setSenderBalance(bal.toString());
        } catch (err) {
            console.error('MetaMask not connected:', err);
            alert('Failed to connect MetaMask');
        }
    }

    // Refresh balance of sender wallet (used by effects and after tx)
    async function refreshSenderBalance() {
        try {
            if (!provider || !isValidAddress(senderWallet)) return;

            const balance = await provider.getBalance(senderWallet);
            setSenderBalance(balance.toString());
        } catch (err) {
            console.error(err);
            alert('Error occurred when getting sender balance');
        }
    }

    // Refresh balance of receiver wallet (used by effects and after tx)
    async function refreshReceiverBalance() {
        try {
            if (!provider || !isValidAddress(receiverWallet)) return;

            const balance = await provider.getBalance(receiverWallet);
            setReceiverBalance(balance.toString());
        } catch (err) {
            console.error(err);
            alert('Error occurred when getting receiver balance');
        }
    }

    // Send Ether
    async function transfer() {
        if (!signer || !senderWallet) {
            alert('Wallet not connected');
            return;
        }
        if (!isValidAddress(receiverWallet)) {
            alert('Receiver address is invalid');
            return;
        }
        if (typeof transferAmount !== 'number' || !isFinite(transferAmount) || transferAmount <= 0) {
            alert('Please enter a valid transfer amount');
            return;
        }

        try {
            const tx = {
                to: receiverWallet,
                value: ethers.parseEther(transferAmount.toString()),
            };

            // Estimate gas (simulation requires explicit `from`)
            const gasEstimate = await (provider ?? new ethers.BrowserProvider(window.ethereum)).estimateGas({
                ...tx,
                from: senderWallet,
            });
            console.log('Estimated gas:', gasEstimate.toString());

            // Send transaction via signer
            const txResponse = await signer.sendTransaction({ ...tx, gasLimit: gasEstimate }); // 交易已送出，但未確認
            console.log('Transaction sent:', txResponse.hash);

            const receipt = await txResponse.wait(); // 交易已確認上鏈
            console.log('Transaction confirmed:', receipt);

            // Auto-refresh balances after transaction
            await refreshSenderBalance();
            await refreshReceiverBalance();
            alert('Transfer successful!');
        } catch (err) {
            console.error(err);
            alert('Transfer failed: ' + (err?.shortMessage || err?.message || 'Unknown error'));
        }
    }

    // Log sender balance when updated
    useEffect(() => {
        console.log('Sender balance:', senderBalance);
    }, [senderBalance]);

    // Listen for MetaMask account changes and sync app state accordingly
    useEffect(() => {
        // If there is no injected provider (e.g., no MetaMask), do nothing
        if (!hasProvider) return;

        // Handler runs whenever MetaMask emits "accountsChanged"
        const handleAccountsChanged = async (accounts) => {
            try {
                console.log('Account changed:', accounts);

                // If no accounts are connected to this site (locked / disconnected),
                // reset local app state back to "not connected"
                if (!accounts || accounts.length === 0) {
                    setSigner(null);
                    setSenderWallet('');
                    setSenderBalance('0');
                    return;
                }

                // Recreate fresh provider/signer each time to avoid stale references
                const newProvider = new ethers.BrowserProvider(window.ethereum);
                const newSigner = await newProvider.getSigner();

                // Use signer as the single source of truth for the active address
                const addr = await newSigner.getAddress();

                // Update app state with the new provider/signer/address
                setProvider(newProvider);
                setSigner(newSigner);
                setSenderWallet(addr);

                // Fetch and store the latest balance for the new address
                const bal = await newProvider.getBalance(addr);
                setSenderBalance(bal.toString());
            } catch (err) {
                // Don’t crash the app if the RPC/provider hiccups; just log a warning
                console.warn('accountsChanged handler error:', err);
            }
        };

        // Subscribe to MetaMask account change events
        window.ethereum.on('accountsChanged', handleAccountsChanged);

        // Unsubscribe on cleanup to avoid memory leaks / duplicate handlers
        return () => {
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        };

        // Depend on hasProvider so we (re)register if the provider appears after mount
    }, [hasProvider]);

    // Auto-refresh receiver balance whenever a valid address is entered/changed
    useEffect(() => {
        if (!provider) return;

        if (!isValidAddress(receiverWallet)) {
            setReceiverBalance('0');
            return;
        }

        refreshReceiverBalance();
    }, [receiverWallet, provider]);

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

                <p>My Wallet Address: {senderWallet || '(not connected)'}</p>

                <p>
                    My Balance: {senderBalance} Wei = {fmtEth(senderBalance)} ETH
                </p>

                <button
                    onClick={transfer}
                    disabled={!signer || !isValidAddress(receiverWallet) || !(transferAmount > 0)}
                >
                    Transfer
                </button>

                <p>
                    Receiver Wallet Address:{' '}
                    <input
                        value={receiverWallet}
                        onChange={(e) => setReceiverWallet(e.target.value.trim())}
                        placeholder="0x… receiver address"
                    />
                </p>

                <p>
                    Transfer Amount (Ether):{' '}
                    <input
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(Number(e.target.value))}
                        type="number"
                        min="0"
                        step="0.0001"
                    />
                </p>

                <p>
                    Receiver Balance: {receiverBalance} Wei = {fmtEth(receiverBalance)} ETH
                </p>
            </div>
        </>
    );
}

export default App;
