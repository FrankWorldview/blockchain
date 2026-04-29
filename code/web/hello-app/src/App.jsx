import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

// Static assets (UI only)
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';

// Contract ABI and deployed address
import helloABI from './abi/Hello-abi.json';
import helloAddr from './abi/Hello-addr.json';

// Local blockchain node (Anvil / Hardhat)
const RPC_URL = 'http://127.0.0.1:8545';

/**
 * ✅ Create provider at module level (outside React component)
 *
 * Why?
 * - Only created once when the file is loaded
 * - NOT re-created on every render
 *
 * Think:
 * 👉 provider = long-lived connection object
 */
const provider = new ethers.JsonRpcProvider(RPC_URL);

function App() {
  /**
   * ===== React State =====
   * These store data fetched from the smart contract
   */
  const [text, setText] = useState(''); // greet()
  const [name, setName] = useState(''); // getName()
  const [number, setNumber] = useState('0'); // getMaxUint256()
  const [sum, setSum] = useState('0'); // sumUpTo()
  const [loading, setLoading] = useState(true); // loading indicator

  /**
   * Extract contract address from JSON
   */
  const contractAddress = helloAddr?.address;

  /**
   * ===== Fetch data from contract =====
   * This is an async function (calls blockchain)
   */
  const fetchContractData = async () => {
    try {
      setLoading(true);

      /**
       * 🛑 Guard: ensure address is valid
       * Prevents runtime errors when creating contract
       */
      if (!contractAddress || !ethers.isAddress(contractAddress)) {
        throw new Error(`Invalid contract address: ${contractAddress}`);
      }

      /**
       * Create contract instance (read-only)
       *
       * - Uses provider (no MetaMask / signer needed)
       * - Safe for calling view functions
       */
      const hello = new ethers.Contract(
        contractAddress,
        helloABI,
        provider
      );

      /**
       * ===== Call contract view functions =====
       * These are read-only (no gas, no transaction)
       */

      // greet() → string
      const textResult = await hello.greet();
      setText(textResult);

      // getName() → string
      const nameResult = await hello.getName();
      setName(nameResult);

      // getMaxUint256() → BigInt (ethers v6)
      const numberResult = await hello.getMaxUint256();
      setNumber(numberResult.toString()); // convert BigInt → string for UI

      // sumUpTo(100) → BigInt
      const sumResult = await hello.sumUpTo(100n); // note: 100n = BigInt
      setSum(sumResult.toString());

    } catch (error) {
      /**
       * Error handling (very important in dApp)
       * Could be:
       * - RPC error
       * - wrong ABI
       * - invalid contract
       */
      console.error('Error fetching contract data:', error);
    } finally {
      /**
       * Always stop loading (success or fail)
       */
      setLoading(false);
    }
  };

  /**
   * ===== React Lifecycle =====
   * useEffect runs AFTER first render (mount)
   *
   * [] means:
   * 👉 run only once
   */
  useEffect(() => {
    fetchContractData();
  }, []);

  /**
   * ===== UI Rendering =====
   */
  return (
    <section id="center">
      {/* UI decoration (no logic) */}
      <div className="hero">
        <img src={heroImg} className="base" width="170" height="179" alt="Hero" />
        <img src={reactLogo} className="framework" alt="React logo" />
        <img src={viteLogo} className="vite" alt="Vite logo" />
      </div>

      <h2>Hello App</h2>

      <div>
        {/* Show contract address */}
        <p>
          <strong>Contract address</strong>: {contractAddress}
        </p>

        {/* Conditional rendering */}
        {loading ? (
          /**
           * Loading state
           */
          <p>Loading...</p>
        ) : (
          /**
           * Data display (after fetch)
           */
          <>
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
