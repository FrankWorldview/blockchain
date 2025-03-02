# Example 1: Hello Contract

## Create, Test, and Deploy the Hello Contract
+ Open a Git Bash (in Windows) or a terminal (in Mac).
+ Create a root folder "Solidity" and enter it.
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
+ Move src/Counter.sol elsewhere (e.g., the bak folder). Edit "src/Hello.sol".
  (You can copy this file from `/smart_contracts/src/solidity/hello/Hello.sol`.)
+ Move test/Counter.t.sol elsewhere (e.g., the bak folder). Edit "test/Hello.t.sol".
  (You can copy this file from `/smart_contracts/src/solidity/hello/Hello.t.sol`.)
+ Move script/Counter.s.sol elsewhere (e.g., the bak folder).
+ Test the contract.
  ```
  forge test -vv
  ```
+ Build the contract.
  ```
  forge build
  ```
+ Deploy the contract (with your private key).
  ```
  forge create --rpc-url 127.0.0.1:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 src/Hello.sol:Hello
  ```

## Interact with the Hello Contract via Node.js
+ Open a Git Bash (in Windows) or a terminal (in Mac).
+ Enter the root folder "Web".
  ```
  cd Web
  ```
+ Create a folder "hello" and enter it.
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
+ Copy the contract's ABI file (i.e. "Solidity/hello/out/hello.sol/hello.json") to the new folder "Web/hello/abi".
+ Edit "hello.js".
  (You can copy this file from `/smart_contracts/src/web/hello/hello.js`.)
  ```
  code .
  ```
+ Make sure the "helloAddr" variable refers to the contract's deployed address.
+ View the result.
  ```
  node hello
  ```

![image](/smart_contracts/img/hello.png)

## Interact with the Hello Contract via React
+ Open a Git Bash (in Windows) or a terminal (in Mac).
+ Enter the root folder "Web".
  ```
  cd Web
  ```
+ Create a React app.
  ```
  npx create-react-app hello-app
  ```
+ Enter the new folder.
  ```
  cd hello-app
  ```
+ Install Web3.js.
  ```
  npm install web3
  ```
+ Copy the contract's ABI file (i.e. "Solidity/hello/out/hello.sol/hello.json") to the new folder "Web/hello-app/src/abi".
+ Backup "src/App.js" to "src/App.js.ORIG".
  ```
  mv src/App.js src/App.js.ORIG
  ```
+ Edit "src/App.js".
  (You can copy this file from `/smart_contracts/src/web/hello-app/App.js`.)
  ```
  code .
  ```
+ Make sure the "helloAddr" variable refers to the contract's deployed address.
+ View the web page.
  ```
  npm start
  ```

![image](/smart_contracts/img/hello-app.png)

## Exercise 1
+ Add a new function `getMaxUint256()` in the Hello contract. This function can return the maximal number of uint256 (i.e., `type(uint256).max`).
+ Modify "hello.js" to interact with getMaxUint256().
+ Modity "App.js" to interact with getMaxUint256().
+ Hint:
```javascript
number == null ? number : number.toString()
```

![image](/smart_contracts/img/hello2.png)

![image](/smart_contracts/img/hello2-app.png)
