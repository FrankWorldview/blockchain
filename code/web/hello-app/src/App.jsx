import { useEffect, useState, useMemo } from 'react';
import { ethers } from 'ethers';

// Static assets (images + CSS)
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';

// Contract ABI and deployed address
import helloABI from './abi/Hello-abi.json';
import helloAddr from './abi/Hello-addr.json';

// Local blockchain node (Anvil / Hardhat)
const RPC_URL = 'http://127.0.0.1:8545';

function App() {
  // ===== React state (stores data returned from the contract) =====
  const [text, setText] = useState(''); // greet()
  const [name, setName] = useState(''); // getName()
  const [number, setNumber] = useState('0'); // getMaxUint256()
  const [sum, setSum] = useState('0'); // sumUpTo()
  const [loading, setLoading] = useState(true); // UI loading state

  // ===== Create provider (read-only) =====
  // useMemo prevents re-creating the provider on every render
  const provider = useMemo(
    () => new ethers.JsonRpcProvider(RPC_URL),
    []
  );

  // Extract contract address from JSON file
  const contractAddress = helloAddr?.address;

  // ===== Fetch data from the contract =====
  const fetchContractData = async () => {
    try {
      setLoading(true);

      // Guard: ensure the contract address is valid
      if (!contractAddress || !ethers.isAddress(contractAddress)) {
        throw new Error(`Invalid contract address: ${contractAddress}`);
      }

      // Create contract instance (read-only, using provider)
      const hello = new ethers.Contract(
        contractAddress,
        helloABI,
        provider
      );

      // ===== Call contract view functions =====

      // greet() → string
      const textResult = await hello.greet();
      setText(textResult);

      // getName() → string
      const nameResult = await hello.getName();
      setName(nameResult);

      // getMaxUint256() → uint256 (BigInt in ethers v6)
      const numberResult = await hello.getMaxUint256();
      setNumber(numberResult.toString()); // Convert BigInt → string

      // sumUpTo(100) → uint256
      // Note: ethers v6 prefers BigInt (e.g., 100n)
      const sumResult = await hello.sumUpTo(100n);
      setSum(sumResult.toString());

    } catch (error) {
      // Handle errors (RPC / ABI / invalid address, etc.)
      console.error('Error fetching contract data:', error);
    } finally {
      // End loading state regardless of success or failure
      setLoading(false);
    }
  };

  // ===== Run once when the component mounts =====
  useEffect(() => {
    fetchContractData();
  }, []);

  // ===== UI rendering =====
  return (
    <section id="center">

      {/* Hero section (UI only) */}
      <div className="hero">
        <img src={heroImg} className="base" width="170" height="179" alt="Hero" />
        <img src={reactLogo} className="framework" alt="React logo" />
        <img src={viteLogo} className="vite" alt="Vite logo" />
      </div>

      <h2>Hello App</h2>

      <div>
        {/* Display contract address */}
        <p>
          <strong>Contract address</strong>: {contractAddress}
        </p>

        {/* Loading state */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {/* Display contract data */}
            <p><strong>greet()</strong>: {text}</p>
            <p><strong>getName()</strong>: {name}</p>
            <p><strong>getMaxUint256()</strong>: {number}</p>
            <p><strong>sumUpTo(100)</strong>: {sum}</p>
          </>
        )}
      </div>
    </section>
  );
}

export default App;
