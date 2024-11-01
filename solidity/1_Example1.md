# Example 1: Hello Contract

## Create, Test, and Deploy the Contract
+ Run Git Bash.
+ Create a root folder "Solidity" and enter it.
  - `md Solidity`
  - `cd Solidity`
+ Initialize a Foundry project: `forge init hello`
+ Enter the new folder: `cd hello`
+ Move src/Counter.sol elsewhere (e.g. the bak folder). Edit src/Hello.sol.
+ Move test/Counter.t.sol elsewhere (e.g. the bak folder). Edit test/Hello.t.sol.
+ Move script/Counter.s.sol elsewhere (e.g. the bak folder).
+ Test the contract: `forge test -vv`
+ Build the contract: `forge build`
+ Deploy the contract: `forge create --rpc-url 127.0.0.1:8545 --private-key <your_private_key> src/Hello.sol:Hello`

## Interact with the Contract via Node.js
+ Enter the root folder "Web": `cd Web`
+ Create a folder "hello" and enter it.
  - md hello
  - cd hello
+ Initialize an npm project: `npm init`
+ Install Web3.js: `npm install web3`
+ Copy the contract's ABI file (i.e. Solidity/hello/out/Hello.sol/Hello.json) to Web/hello/abi.
+ Edit Hello.js.
+ Make sure the "addr" variable refers to the contract's deployed address.
+ View the result: `node Hello`
![image](/solidity/img/hello.png)

## Interact with the Contract via React
+ Enter the root folder "Web": `cd Web`
+ Create a React app: `npx create-react-app hello-app`
+ Enter the new folder: `cd hello-app`
+ Install Web3.js: `npm install web3`
+ Copy the contract's ABI file (i.e. Solidity/hello/out/Hello.sol/Hello.json) to Web/hello-app/src/abi.
+ Backup src/App.js to src/App.js.ORIG.
+ Edit src/App.js.
+ Make sure the "addr" variable refers to the contract's deployed address.
+ View the result: `npm start`
![image](/solidity/img/hello-app.png)

## Exercise 1 (20 Minutes)
+ Add a new function getMaxUint256() in the Hello contract. This function can return the maximal number of uint256 (i.e. type(uint256).max).
+ Modify Hello.js to interact with getMaxUint256().
+ Modity App.js to interact with getMaxUint256().
![image](/solidity/img/hello2.png)
![image](/solidity/img/hello2-app.png)
