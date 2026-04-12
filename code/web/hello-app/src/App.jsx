import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css';

import helloABI from './abi/Hello-abi.json';
import helloAddr from './abi/Hello-addr.json';

// Local RPC (Anvil / Hardhat / Ganache)
const rpcURL = 'http://127.0.0.1:8545';

function App() {
  // Individual states
  const [text, setText] = useState('');       // greet()
  const [name, setName] = useState('');       // getName()
  const [number, setNumber] = useState('0');  // getMaxUint256() as string
  const [sum, setSum] = useState('0');        // sumUpTo() as string

  // Alternative approach: manage all contract fields in one state object instead of separate useState hooks
  /* const [contractData, setContractData] = useState({
      text: '',   // greet()
      name: '',   // getName()
      number: '0',// getMaxUint256() as string
      sum: '0',   // sumUpTo() as string
  }); */

  const fetchContractData = async () => {
    try {
      // 1) Provider
      const provider = new ethers.JsonRpcProvider(rpcURL);

      // 2) Contract (read-only -> provider is enough)
      const hello = new ethers.Contract(helloAddr.address, helloABI, provider);

      // 3) Sequential read calls (ethers v6 returns BigInt for uint256)
      const textResult = await hello.greet();
      setText(textResult);

      const nameResult = await hello.getName();
      setName(nameResult);

      const numberResult = await hello.getMaxUint256();
      setNumber(numberResult.toString());

      const sumResult = await hello.sumUpTo(100n);
      setSum(sumResult.toString());

      // Alternative approach
      // 3) Parallel read calls (ethers v6 returns BigInt for uint256)
      /* const [textResult, nameResult, numberResult, sumResult] = await Promise.all([
          hello.greet(),
          hello.getName(),
          hello.getMaxUint256(),
          hello.sumUpTo(100n),
      ]);

      setContractData({
        text: textResult,
        name: nameResult,
        number: numberResult.toString(),
        sum: sumResult.toString(),
      }); */
    } catch (error) {
      console.error('Error fetching contract data:', error);
    }
  };

  useEffect(() => {
    fetchContractData();
  }, []);

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>

        <h2>Hello App</h2>

        <div className="card">
          <p><strong>Contract address</strong>: {helloAddr.address}</p>
          <p><strong>greet()</strong>: {text}</p>
          <p><strong>getName()</strong>: {name}</p>
          <p><strong>getMaxUint256()</strong>: {number}</p>
          <p><strong>sumUpTo(100)</strong>: {sum}</p>
        </div>

        {/* <div className="card">
          <p><strong>Contract address</strong>: {helloAddr.address}</p>
          <p><strong>greet()</strong>: {contractData.text}</p>
          <p><strong>getName()</strong>: {contractData.name}</p>
          <p><strong>getMaxUint256()</strong>: {contractData.number}</p>
          <p><strong>sumUpTo(100)</strong>: {contractData.sum}</p>
        </div> */}
      </section>
    </>
  )
}

export default App
