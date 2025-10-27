# Understanding `decimals` in Ether and ERC-20 Tokens

When dealing with Ether and ERC-20 tokens on Ethereum, values are not stored in fractional form.  
They are **integers** representing the smallest indivisible unit:

- **Ether’s smallest unit:** `wei`
- **ERC-20’s smallest unit:** defined by the `decimals()` function (commonly 18)

In other words, **"1 token"** is just a human-friendly alias for a very large integer.

---

## 💰 Ether Units

Ether uses **18 decimal places**, meaning:

| Unit Name | Equivalent in Wei | Scientific Notation |
|------------|-------------------|---------------------|
| wei        | 1                 | 1e0                |
| gwei       | 1,000,000,000     | 1e9                |
| ether      | 1,000,000,000,000,000,000 | 1e18 |

So, `1 ETH = 10^18 wei`.

All EVM operations and balances are stored in `wei`.  
Human-readable unit conversions are done **off-chain** using libraries such as **ethers.js**.

---

## 🪙 ERC-20 Token Decimals

ERC-20 tokens define their decimal precision via the `decimals()` function:

```solidity
function decimals() public view virtual returns (uint8) {
    return 18; // Default in most tokens, but can vary
}
```

- If `decimals() = 18`, the token behaves like Ether (`1 token = 10^18 base units`).
- Some tokens (like USDC or USDT) use `6` decimals, meaning:
  ```
  1 token = 10^6 base units
  ```

---

## ⚙️ Converting Token Values with `ethers.js`

You can easily convert between human-readable and on-chain formats using `ethers` utilities.

```js
import { ethers } from "ethers";

// Convert 1.5 tokens to smallest unit (on-chain integer)
const amount = ethers.parseUnits("1.5", 18);
console.log(amount.toString());
// Output: 1500000000000000000

// Convert smallest unit (BigInt) to human-readable format
const readable = ethers.formatUnits(amount, 18);
console.log(readable);
// Output: "1.5"
```

---

## 🧮 Example: Handling Tokens with Different Decimals

```js
// USDC-style token (6 decimals)
const usdcAmount = ethers.parseUnits("1.25", 6);
console.log(usdcAmount.toString()); // 1250000

// Display balance for token with 6 decimals
const balance = 2500000n;
console.log(ethers.formatUnits(balance, 6)); // "2.5"
```

---

## 🧠 Summary

| Concept | Ether | ERC-20 Token |
|----------|--------|--------------|
| Base unit | `wei` | smallest indivisible unit |
| Default decimals | 18 | defined by `decimals()` |
| Conversion | `parseUnits()` / `formatUnits()` | same as Ether |
| Stored as | integer | integer |

---

> 💡 **Pro tip:**  
> Always handle values in the smallest unit (integer) when interacting with smart contracts.  
> Perform formatting and user-facing conversions **in JavaScript or your front-end code**, not in Solidity.

---

**References**
- [Ethereum Units and Wei](https://ethereum.org/en/developers/docs/units/)
- [OpenZeppelin ERC20 Implementation](https://docs.openzeppelin.com/contracts/5.x/api/token/erc20)
- [Ethers.js Docs: parseUnits / formatUnits](https://docs.ethers.org/v6/api/utils/function/parseUnits/)
