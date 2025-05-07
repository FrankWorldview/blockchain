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

### ✅ Web3.js Example: Trigger `receive()`

```javascript
await web3.eth.sendTransaction({
  from: senderWallet,
  to: contractAddress,
  value: web3.utils.toWei("1", "ether")
  // ❌ No data field
});
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

### ✅ Web3.js Example: Trigger `fallback()` with ETH + data

```javascript
await web3.eth.sendTransaction({
  from: senderWallet,
  to: contractAddress,
  value: web3.utils.toWei("0.5", "ether"),
  data: "0x12345678" // Invalid or unrecognized selector
});
```

### ✅ Web3.js Example: Trigger `fallback()` with data only

```javascript
await web3.eth.sendTransaction({
  from: senderWallet,
  to: contractAddress,
  data: "0xdeadbeef" // Garbage data, no value
});
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

Avoid letting `fallback()` silently accept ETH unless you log the transaction or verify the sender. This can prevent hidden or malicious ETH transfers into your contract.