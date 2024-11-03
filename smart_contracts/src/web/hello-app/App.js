import logo from './logo.svg';
import './App.css';

import { useState, useEffect } from 'react';

const { Web3 } = require('web3');
const helloABI = require('./abi/Hello.json').abi;

function App() {
  const [text, setText] = useState(null);
  const [name, setName] = useState(null);

  async function callHello() {
    try {
      // Private RPC endpoint.
      const web3 = new Web3('http://127.0.0.1:8545');

      const addr = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

      const hello = new web3.eth.Contract(helloABI, addr);

      const text = await hello.methods.greet().call();

      const name = await hello.methods.getMyName().call();

      setText(text);

      setName(name);
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    callHello();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>greet(): {text}</p>
        <p>getMyName(): {name}</p>
      </header>
    </div>
  );
}

export default App;
