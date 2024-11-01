# Example 1: Hello Contract
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

## Interact with the Contract via Node.js.
+ Enter the root folder "Web": `cd Web`
+ Create a folder "hello" and enter it.
  - md hello
  - cd hello
+ Initialize an npm project: `npm init`
+ Install Web3.js: `npm install web3`
+ Edit Hello.js
+ View the result: `node Hello`

## Interact with the Contract via React.
+ Enter the root folder "Web": `cd Web`
+ Create a React app: `npx create-react-app hello-app`
+ Enter the new folder: `cd hello-app`
+ Install Web3.js: `npm install web3`
+ Copy the contract's ABI file (i.e. Solidity/hello/out/Hello.sol/Hello.json) to Web/hello-app/src/abi.
+ Backup src/App.js to src/App.js.ORIG.
+ Edit src/App.js.
+ Make sure the addr variable refers to the contract's deployed address.
+ View the result: `npm start`

## Exercise 1 (20 Minutes)
+ Add a new function getMyName() in the Hello contract. This function can return a string of your name.
+ Modify Hello.js to interact with getMyName().
+ Modity App.js to interact with getMyName().

![image](https://myoctocat.com/assets/images/base-octocat.svg)
