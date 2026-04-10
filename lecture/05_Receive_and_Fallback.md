# `receive()` and `fallback()` in Solidity

Smart contracts in Solidity can accept Ether (ETH) through two special functions: `receive()` and `fallback()`. These functions define how a contract responds when it receives a transaction that does not explicitly call a known function.

---

## 🔹 `receive()` Function

- **Purpose**: Handles plain ETH transfers with **no calldata**  
- **Trigger**: ETH is sent to the contract with **no function signature or data**

```solidity
receive() external payable {
    // Logic to handle plain ETH transfers
    emit DonationReceived(msg.sender, msg.value);
}
```

### ✅ Ethers.js Example: Trigger `receive()`

```javascript
import { ethers } from "ethers";

// Connect to MetaMask or local RPC
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();

const tx = await signer.sendTransaction({
  to: contractAddress,
  value: ethers.parseEther("1.0") // 1 ETH
  // ❌ No data field
});

console.log("Transaction hash:", tx.hash);
```

---

## 🔹 `fallback()` Function

- **Purpose**: Handles calls with unknown data or incorrect function selectors  
- **Trigger**:  
  - ETH + unrecognized function selector  
  - Data only (e.g., garbage or incorrect input)  
  - No matching function in the ABI  

```solidity
fallback() external payable {
    // Logic for unmatched or unknown function calls
    emit FallbackTriggered(msg.sender, msg.value);
}
```

### ✅ Ethers.js Example: Trigger `fallback()` with ETH + data

```javascript
import { ethers } from "ethers";

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();

const tx = await signer.sendTransaction({
  to: contractAddress,
  value: ethers.parseEther("0.5"),
  data: "0x12345678" // Invalid or unrecognized selector
});

console.log("Fallback with ETH + data:", tx.hash);
```

### ✅ Ethers.js Example: Trigger `fallback()` with data only

```javascript
import { ethers } from "ethers";

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();

const tx = await signer.sendTransaction({
  to: contractAddress,
  data: "0xdeadbeef" // Garbage data, no ETH value
});

console.log("Fallback with data only:", tx.hash);
```

---

## 📊 Comparison Table

| Feature             | `receive()`        | `fallback()`                        |
|---------------------|--------------------|-------------------------------------|
| Triggered by        | ETH, no data       | ETH + invalid data or data only     |
| Needs `payable`?    | ✅ Yes             | ✅ Yes (if it should receive ETH)    |
| Accepts calldata?   | ❌ No              | ✅ Yes                              |
| Can receive ETH?    | ✅ Yes             | ✅ Yes (if `payable`)               |
| Can log events?     | ✅ Yes             | ✅ Yes                              |
| Typical Use Case    | Wallet transfers   | Catch-all logic, proxy contracts    |

---

## ✅ Best Practices

- Use `receive()` when:
  - You want your contract to accept direct ETH transfers
  - You’re creating a donation mechanism

- Use `fallback()` when:
  - You want to handle incorrect or unexpected input
  - You’re building a proxy contract
  - You want to log invalid or unhandled transactions

---

## 🔐 Security Tip

Avoid letting `fallback()` silently accept ETH unless you log the transaction or verify the sender.  
This can prevent hidden or malicious ETH transfers into your contract.

---

## ⚙️ Quick Test Tips (Hardhat or Anvil)

If you’re testing locally with **Anvil**, you can simulate calls like:

```bash
cast send <CONTRACT_ADDR> --value 1ether
# Triggers receive()

cast send <CONTRACT_ADDR> --value 0.5ether --data 0x12345678
# Triggers fallback()
```

Or from your JS test:

```javascript
await signer.sendTransaction({ to: contractAddress, value: ethers.parseEther("1") }); // receive()
await signer.sendTransaction({ to: contractAddress, data: "0x12345678" }); // fallback()
```

---
