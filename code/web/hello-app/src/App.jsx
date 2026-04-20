import { useEffect, useState, useMemo } from 'react';
import { ethers } from 'ethers';

// 靜態資源（圖片 + CSS）
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';

// ABI（合約介面）與已部署地址
import helloABI from './abi/Hello-abi.json';
import helloAddr from './abi/Hello-addr.json';

// 本地區塊鏈節點（Anvil / Hardhat / Ganache）
const RPC_URL = 'http://127.0.0.1:8545';

function App() {
  // ===== React state（用來存合約回傳資料） =====
  const [text, setText] = useState('');       // greet()
  const [name, setName] = useState('');       // getName()
  const [number, setNumber] = useState('0');  // getMaxUint256()
  const [sum, setSum] = useState('0');        // sumUpTo()
  const [loading, setLoading] = useState(true); // UI loading 狀態

  // ===== 建立 provider（只讀） =====
  // useMemo：避免每次 render 都重新建立 provider
  const provider = useMemo(
    () => new ethers.JsonRpcProvider(RPC_URL),
    []
  );

  // 從 JSON 檔取出合約地址
  const contractAddress = helloAddr?.address;

  // ===== 讀取合約資料 =====
  const fetchContractData = async () => {
    try {
      setLoading(true);

      // 防呆：確保 address 合法
      if (!contractAddress || !ethers.isAddress(contractAddress)) {
        throw new Error(`Invalid contract address: ${contractAddress}`);
      }

      // 建立 contract instance（read-only）
      const hello = new ethers.Contract(
        contractAddress,
        helloABI,
        provider
      );

      // ===== 一個一個呼叫合約 view function =====

      // greet() → string
      const textResult = await hello.greet();
      setText(textResult);

      // getName() → string
      const nameResult = await hello.getName();
      setName(nameResult);

      // getMaxUint256() → uint256 (BigInt in ethers v6)
      const numberResult = await hello.getMaxUint256();
      setNumber(numberResult.toString()); // BigInt → string

      // sumUpTo(100) → uint256
      // 注意：ethers v6 建議用 BigInt (100n)
      const sumResult = await hello.sumUpTo(100n);
      setSum(sumResult.toString());

    } catch (error) {
      // 捕捉錯誤（RPC / ABI / address 錯誤）
      console.error('Error fetching contract data:', error);
    } finally {
      setLoading(false); // 不論成功或失敗都結束 loading
    }
  };

  // ===== component mount 時執行一次 =====
  useEffect(() => {
    fetchContractData();
  }, []);

  // ===== UI rendering =====
  return (
    <section id="center">

      {/* Hero 區塊（純 UI） */}
      <div className="hero">
        <img src={heroImg} className="base" width="170" height="179" alt="Hero" />
        <img src={reactLogo} className="framework" alt="React logo" />
        <img src={viteLogo} className="vite" alt="Vite logo" />
      </div>

      <h2>Hello App</h2>

      <div>
        {/* 顯示合約地址 */}
        <p>
          <strong>Contract address</strong>: {contractAddress}
        </p>

        {/* loading 狀態 */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {/* 顯示合約回傳資料 */}
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
