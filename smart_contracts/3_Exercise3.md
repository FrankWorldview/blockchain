# Exercise 3: Fundraising

## Create, Test, and Deploy the FundraiserFactory Contract
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
  forge install OpenZeppelin/openzeppelin-contracts
  ```
+ Build the contract.
  ```
  forge build
  ```
+ Deploy the contract using deployment script (and using your private key).
  ```
  forge script script/FundraiserFactory.s.sol --rpc-url http://127.0.0.1:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast
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
  npm install react-router-dom @mui/material @emotion/react @emotion/styled ethers cryptocompare
  ```
+ Open Visual Studio Code.
  ```
  code .
  ```
+ Backup `src/App.jsx` to `src/App.jsx.ORIG`.
  ```
  mv src/App.jsx src/App.jsx.ORIG
  ```
+ Backup `src/App.css` to `src/App.css.ORIG`.
  ```
  mv src/App.css src/App.css.ORIG
  ```
+ Backup `src/main.jsx` to `src/main.jsx.ORIG`.
  ```
  mv src/main.jsx src/main.jsx.ORIG
  ```
+ Copy all files from `/smart_contracts/code/web/fundraising-app` to your `fundraising-app` folder.
+ Put `go.cjs` into your app root (i.e., fundraising-app).
  (You can copy this file from `/smart_contracts/code/web/fundraising-app/go.cjs`.)
+ Run `go.cjs` to extract the contract's ABI and address.
  ```
  mkdir src/fundraising/abi
  node go.cjs
  ```
+ View the web page.
  ```
  npm run dev
  ```

Notes:
+ Install the `React Developer Tools` plugin in your browser for advanced debugging.
+ `forge clean` can remove the build artifacts and cache directories.

Think:
How to automatically update fundraiser cards after a fundraising campaign is updated (e.g., donated)?

Credits:
The code of this example is based on the work of [RedSquirrelTech](https://github.com/RedSquirrelTech/hoscdev).

![image](/smart_contracts/image/fundraising.png)
