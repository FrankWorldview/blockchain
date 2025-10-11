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
    const [receiverWallet, setReceiverWallet] = useState(''); // use placeholder instead of a fake address
    const [receiverBalance, setReceiverBalance] = useState('0');
    const [transferAmount, setTransferAmount] = useState(1);

    // Helper guards / formatters
    const hasProvider = typeof window !== 'undefined' && !!window.ethereum;
    const isValidAddress = (addr) => ethers.isAddress(addr);
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

            const signerInstance = await ethProvider.getSigner();

            setProvider(ethProvider);
            setSigner(signerInstance);

            const addr = await signerInstance.getAddress();
            setSenderWallet(addr);

            // Auto-refresh sender balance immediately after connecting
            const bal = await ethProvider.getBalance(addr);
            setSenderBalance(bal.toString());
        } catch (error) {
            console.error('MetaMask not connected:', error);
            alert('Failed to connect MetaMask');
        }
    }

    // Refresh balance of sender wallet (used by effects and after tx)
    async function refreshSenderBalance() {
        try {
            if (!provider || !isValidAddress(senderWallet)) return;
            const balance = await provider.getBalance(senderWallet);
            setSenderBalance(balance.toString());
        } catch (error) {
            console.error(error);
            alert('Error occurred when getting sender balance');
        }
    }

    // Refresh balance of receiver wallet (used by effects and after tx)
    async function refreshReceiverBalance() {
        try {
            if (!provider || !isValidAddress(receiverWallet)) return;
            const balance = await provider.getBalance(receiverWallet);
            setReceiverBalance(balance.toString());
        } catch (error) {
            console.error(error);
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
            const txResponse = await signer.sendTransaction({ ...tx, gasLimit: gasEstimate });
            console.log('Transaction sent:', txResponse.hash);

            const receipt = await txResponse.wait();
            console.log('Transaction confirmed:', receipt);

            // Auto-refresh balances after transaction
            await refreshSenderBalance();
            await refreshReceiverBalance();
            alert('Transfer successful!');
        } catch (error) {
            console.error(error);
            alert('Transfer failed: ' + (error?.shortMessage || error?.message || 'Unknown error'));
        }
    }

    // Log sender balance when updated (dev visibility)
    useEffect(() => {
        console.log('Sender balance:', senderBalance);
    }, [senderBalance]);

    // ✅ Robust MetaMask account change handling (fixes "page not updating on account switch")
    // - Register exactly once (empty deps)
    // - Rebuild BrowserProvider and Signer on every account change to avoid stale closures
    // - Always read the address from signer.getAddress() (source of truth)
    // - Also self-sync on page reload if already authorized (eth_accounts)
    useEffect(() => {
        if (!hasProvider) return;

        const handleAccountsChanged = async (accounts) => {
            console.log('Account changed:', accounts);

            // No accounts: MetaMask locked or disconnected
            if (!accounts || accounts.length === 0) {
                setSenderWallet('');
                setSigner(null);
                setSenderBalance('0');
                return;
            }

            // Recreate provider and signer to ensure fresh instances
            const nextProvider = new ethers.BrowserProvider(window.ethereum);
            const nextSigner = await nextProvider.getSigner();
            const addr = await nextSigner.getAddress();

            setProvider(nextProvider);
            setSigner(nextSigner);
            setSenderWallet(addr);

            // Auto-refresh sender balance after account change
            const bal = await nextProvider.getBalance(addr);
            setSenderBalance(bal.toString());
        };

        // Listen for account changes
        window.ethereum.on('accountsChanged', handleAccountsChanged);

        // Self-sync immediately on mount (covers page reload when already connected)
        window.ethereum.request({ method: 'eth_accounts' })
            .then((acc) => handleAccountsChanged(acc))
            .catch(console.warn);

        // Cleanup listener on unmount
        return () => {
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        };
    }, [hasProvider]);

    // Auto-refresh receiver balance whenever a valid address is entered/changed
    useEffect(() => {
        if (!provider) return;
        if (!isValidAddress(receiverWallet)) {
            setReceiverBalance('0');
            return;
        }
        refreshReceiverBalance();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
