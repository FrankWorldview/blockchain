import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import helloABI from './abi/Hello-abi.json';
import helloAddr from './abi/Hello-addr.json';

// Local RPC (Anvil / Hardhat / Ganache)
const rpcURL = 'http://127.0.0.1:8545';

function App() {
    const [contractData, setContractData] = useState({
        text: '',   // greet()
        name: '',   // getMyName()
        number: '0',// getMaxUint256() as string
        sum: '0',   // sumUpTo() as string
    });

    useEffect(() => {
        const fetchContractData = async () => {
            try {
                // 1) Provider
                const provider = new ethers.JsonRpcProvider(rpcURL);

                // 2) Contract (read-only -> provider is enough)
                const hello = new ethers.Contract(helloAddr.address, helloABI, provider);

                // 3) Parallel read calls (ethers v6 returns BigInt for uint256)
                const [text, name, numberBN, sumBN] = await Promise.all([
                    hello.greet(),
                    hello.getMyName(),
                    hello.getMaxUint256(),
                    hello.sumUpTo(100n),
                ]);

                setContractData({
                    text,
                    name,
                    number: numberBN.toString(),
                    sum: sumBN.toString(),
                });
            } catch (err) {
                console.error('Error fetching contract data (ethers v6):', err);
            }
        };

        fetchContractData();
    }, []);

    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank" rel="noreferrer">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank" rel="noreferrer">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>

            <h1>Vite + React</h1>

            <div className="card">
                <p><strong>Contract address</strong>: {helloAddr.address}</p>
                <p><strong>greet()</strong>: {contractData.text}</p>
                <p><strong>getMyName()</strong>: {contractData.name}</p>
                <p><strong>getMaxUint256()</strong>: {contractData.number}</p>
                <p><strong>sumUpTo(100)</strong>: {contractData.sum}</p>
            </div>
        </>
    );
}

export default App;
