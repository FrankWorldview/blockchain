// React hooks for managing component state and lifecycle
import { useState, useEffect } from 'react';
// Web3.js library for interacting with the Ethereum blockchain
import { Web3 } from 'web3';

// Static assets and styles
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

// Smart contract ABI and deployed addresses
import helloABI from './abi/Hello-abi.json';
import helloAddr from './abi/Hello-addr.json';

// RPC endpoint for local Ethereum development node (e.g. Anvil, Ganache, Hardhat)
const rpcURL = 'http://127.0.0.1:8545';

function App() {
  // Initialize state variables to hold values returned by smart contract functions
  const [text, setText] = useState('');     // greet()
  const [name, setName] = useState('');     // getMyName()
  const [number, setNumber] = useState(''); // getMaxUint256()
  const [sum, setSum] = useState('');       // sumUpTo()

  // Async function to load data from the smart contrac
  async function fetchContractData() {
    try {
      // Create a Web3 instance connected to the local RPC
      const web3 = new Web3(rpcURL);

      // Create a contract instance using ABI and deployed addresses
      const hello = new web3.eth.Contract(helloABI, helloAddr.address);

      // Call view/pure functions from the smart contract (read-only)
      const text = await hello.methods.greet().call();            // Returns greeting string
      const name = await hello.methods.getMyName().call();        // Returns name string
      const number = await hello.methods.getMaxUint256().call();  // Returns uint256 max value
      const sum = await hello.methods.sumUpTo(100).call();        // Returns sum from 1 to 100

      // Update component state with values from the contract
      setText(text);
      setName(name);
      setNumber(number);
      setSum(sum);
    } catch (error) {
      // Catch and log any errors during RPC or contract interaction
      console.error('Error fetching contract data:', error);
    }
  }

  // useEffect() to trigger contract data fetching when the component mounts
  useEffect(() => {
    fetchContractData();
  }, []);

  // Render UI with data from the smart contract
  return (
    <>
      <div>
        {/* Framework logos */}
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React</h1>

      <div className="card">
        {/* Display contract address */}
        <p><strong>Contract address</strong>: {helloAddr.address}</p>
        {/* Display values returned from smart contract functions */}
        <p><strong>greet()</strong>: {text}</p>
        <p><strong>getMyName()</strong>: {name}</p>
        <p><strong>getMaxUint256()</strong>: {number}</p>
        <p><strong>sumUpTo(100)</strong>: {sum}</p>
      </div>
    </>
  );
}

export default App;
