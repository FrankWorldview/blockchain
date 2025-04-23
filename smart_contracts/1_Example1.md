# Example 1: Hello Contract

## Create, Test, and Deploy the Hello Contract
+ Open a Git Bash (in Windows) or a terminal (in Mac).
+ Create a folder `Solidity` and enter it.
  ```
  mkdir Solidity
  cd Solidity
  ```
+ Initialize a Foundry project.
  ```
  forge init hello
  ```
+ Enter the new folder and open Visual Studio Code.
  ```
  cd hello
  code .
  ```
+ Move src/Counter.sol elsewhere (e.g., the `orig` folder). Edit `src/Hello.sol`.
  (You can copy this file from `/smart_contracts/code/solidity/hello/src/Hello.sol`.)
+ Move test/Counter.t.sol elsewhere (e.g., the `orig` folder). Edit `test/Hello.t.sol`.
  (You can copy this file from `/smart_contracts/code/solidity/hello/test/Hello.t.sol`.)
+ Move test/Counter.s.sol elsewhere (e.g., the `orig` folder). Edit `script/Hello.s.sol`.
  (You can copy this file from `/smart_contracts/code/solidity/hello/script/Hello.s.sol`.)

+ Test the contract.
  ```
  forge test -vv
  ```
+ Build the contract.
  ```
  forge build
  ```
+ Deploy the contract using command (and using your private key).
  ```
  forge create src/Hello.sol:Hello --rpc-url 127.0.0.1:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast
  ```
+ Deploy the contract using deployment script (and using your private key).
  ```
  forge script script/Hello.s.sol --rpc-url 127.0.0.1:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast
  ```

## Interact with the Hello Contract via Node.js
+ Open a Git Bash (in Windows) or a terminal (in Mac).
+ Enter the folder `Web`.
  ```
  cd Web
  ```
+ Create a folder `hello` and enter it.
  ```
  mkdir hello
  cd hello
  ```
+ Initialize an npm project.
  ```
  npm init
  ```
+ Install Web3.js.
  ```
  npm install web3
  ```
+ Edit `hello.js`.
  (You can copy this file from `/smart_contracts/code/web/hello/hello.js`.)
  ```
  code .
  ```
+ View the result.
  ```
  node hello
  ```
+ Interact with the contract uisng the `cast` command.
  ```
  cast call <contract-address> "greet()(string)" --rpc-url 127.0.0.1:8545
  cast call <contract-address> "getMaxUint256()(uint256)" --rpc-url 127.0.0.1:8545
  cast call <contract-address> "sumUpTo(uint256)(uint256)" 100 --rpc-url 127.0.0.1:8545
  ```

![image](/smart_contracts/img/hello.png)

## Interact with the Hello Contract via React
+ Open a Git Bash (in Windows) or a terminal (in Mac).
+ Enter the folder `Web`.
  ```
  cd Web
  ```
+ Create a React + Vite app.
  ```
  npm create vite@latest hello-app -- --template react
  ```
+ Enter the new folder and install Vite.
  ```
  cd hello-app
  npm install
  ```
+ Install Web3.js.
  ```
  npm install web3
  ```
+ Backup `src/App.js` to `src/App.js.ORIG`.
+ Edit `src/App.js`.
  (You can copy this file from `/smart_contracts/code/web/hello-app/src/App.js`.)
  ```
  code .
  ```
  (Run the editor at the root folder of hello-app.)
+ Put `go.cjs` into the `src` folder.
  (You can copy this file from `/smart_contracts/code/web/hello-app/go.cjs`.)
+ Run `go.cjs` to extract the contract's ABI and address.
  ```
  node go.cjs
  ```
+ View the web page.
  ```
  npm run dev
  ```

Notes:
+ Install the `React Developer Tools` plugin in your browser for advanced debugging.
+ `forge clean` can remove the build artifacts and cache directories.

![image](/smart_contracts/img/hello-app.png)
