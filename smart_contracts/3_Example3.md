# Example 3: Fundraising

## Create, Test, and Deploy the Hello Contract
+ Open a Git Bash (in Windows) or a terminal (in Mac).
+ Create a folder `Solidity` and enter it.
  ```
  mkdir Solidity
  cd Solidity
  ```
+ Initialize a Foundry project.
  ```
  forge init fundraising
  ```
+ Enter the new folder and open Visual Studio Code.
  ```
  cd fundraising
  code .
  ```
+ Move src/Counter.sol elsewhere (e.g., the `orig` folder).
+ Move test/Counter.t.sol elsewhere (e.g., the `orig` folder).
+ Move test/Counter.s.sol elsewhere (e.g., the `orig` folder).
+ Copy all files from `/smart_contracts/code/solidity/fundraising` to your `fundraising` folder.
+ Install OpenZeppelin
  ```
  forge install OpenZeppelin/openzeppelin-contracts --no-commit
  ```
+ Test the contract.
  ```
  forge test -vv
  ```
+ Build the contract.
  ```
  forge build
  ```
+ Deploy the contract using deployment script (and using your private key).
  ```
  forge script script/FundraiserFactory.s.sol --rpc-url 127.0.0.1:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast
  ```

## Interact with the FundraiserFactory and Fundraiser Contracts via React
+ Open a Git Bash (in Windows) or a terminal (in Mac).
+ Create a folder `Web` and enter it.
  ```
  mkdir Web
  cd Web
  ```
+ Create a React + Vite app.
  ```
  npm create vite@latest fundraising-app -- --template react
  ```
+ Enter the new folder and install Vite.
  ```
  cd fundraising-app
  npm install
  ```
+ Install reuqired libraries.
  ```
  npm install react-router-dom @mui/material @emotion/react @emotion/styled web3 cryptocompare big-integer
  ```
+ Open Visual Studio Code.
  ```
  code .
  ```
+ Backup `src/App.js` to `src/App.js.ORIG`.
+ Copy all files from `/smart_contracts/code/web/fundraising-app` to your `fundraising-app` folder.
+ Put `go.cjs` into your `src` folder.
  (You can copy this file from `/smart_contracts/code/web/fundraising-app/go.cjs`.)
+ Run `go.cjs` to extract the contract's ABI and address.
  ```
  mkdir src/abi
  node go.cjs
  ```
+ View the web page.
  ```
  npm run dev
  ```

Notes:
+ Install the `React Developer Tools` plugin in your browser for advanced debugging.
+ `forge clean` can remove the build artifacts and cache directories.

Creidts:
The code of this example is based on the work of [RedSquirrelTech](https://github.com/RedSquirrelTech/hoscdev).

![image](/smart_contracts/img/fundraising-1.png)

![image](/smart_contracts/img/fundraising-2.png)

