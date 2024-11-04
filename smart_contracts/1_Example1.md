# Example 1: Hello Contract

## Create, Test, and Deploy the Contract
+ Open Git Bash (in Windows) or open a terminal (in Mac).
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
+ Move src/Counter.sol elsewhere (e.g. the bak folder). Edit "src/Hello.sol".
+ Move test/Counter.t.sol elsewhere (e.g. the bak folder). Edit "test/Hello.t.sol".
+ Move script/Counter.s.sol elsewhere (e.g. the bak folder).
+ Test the contract.
  ```
  forge test -vv
  ```
+ Build the contract.
  ```
  forge build
  ```
+ Deploy the contract.
  ```
  forge create --rpc-url 127.0.0.1:8545 --private-key <your_private_key> src/Hello.sol:Hello
  ```

## Interact with the Contract via Node.js
+ Open Git Bash (in Windows) or open a terminal (in Mac).
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
+ Copy the contract's ABI file (i.e. "Solidity/hello/out/Hello.sol/Hello.json") to the new folder "Web/hello/abi".
+ Edit "Hello.js".
  ```
  code .
  ```
+ Make sure the "addr" variable refers to the contract's deployed address.
+ View the result.
  ```
  node Hello
  ```

![image](/smart_contracts/img/hello.png)

## Interact with the Contract via React
+ Open Git Bash (in Windows) or open a terminal (in Mac).
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
+ Copy the contract's ABI file (i.e. "Solidity/hello/out/Hello.sol/Hello.json") to the new folder "Web/hello-app/src/abi".
+ Backup "src/App.js" to "src/App.js.ORIG".
  ```
  mv src/App.js src/App.js.ORIG
  ```
+ Edit "src/App.js".
  ```
  code .
  ```
+ Make sure the "addr" variable refers to the contract's deployed address.
+ View the result.
  ```
  npm start
  ```

![image](/smart_contracts/img/hello-app.png)

## Exercise 1
+ Add a new function `getMaxUint256()` in the Hello contract. This function can return the maximal number of uint256 (i.e. `type(uint256).max`).
+ Modify "Hello.js" to interact with getMaxUint256().
+ Modity "App.js" to interact with getMaxUint256().
+ Hint:
```javascript
number == null ? number : number.toString()
```

![image](/smart_contracts/img/hello2.png)

![image](/smart_contracts/img/hello2-app.png)
