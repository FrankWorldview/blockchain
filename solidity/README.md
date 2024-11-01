# Learning Resources
+ [Learn Solidity](https://www.alchemy.com/university/courses/solidity) & [GitHub](https://github.com/alchemyplatform/learn-solidity-presentations)
+ Development framework: [Foundry](https://book.getfoundry.sh/)
+ Development framework: [Hardhat](https://hardhat.org/)
+ Development framework: [Truffle Suite](https://archive.trufflesuite.com/) (sunset) + [Ganache](https://archive.trufflesuite.com/ganache/)
+ [Ethereum basics](https://docs.alchemy.com/docs/ethereum-basics)
+ [Web3.js documents](https://docs.web3js.org/)
+ [Console logging in Foundry](https://book.getfoundry.sh/reference/forge-std/console-log)
+ JavaScript: [async function & await](https://www.casper.tw/development/2020/10/16/async-await/)
+ React: [useState](https://react.dev/reference/react/useState)
+ React: [userEffect](https://react.dev/reference/react/useEffect)

# Software Used in This Class
+ Solidity: [Foundry](https://book.getfoundry.sh/) + [Git for Windows](https://gitforwindows.org/)
+ JavaScript: [Node.js (including npm)](https://nodejs.org/en/download/prebuilt-installer)
+ JavaScript development framework: [React](https://react.dev/)
+ Code editor: [Visual Studio Code](https://code.visualstudio.com/)

# Installation
+ Solidity
  - Install Git for Windows.
  - `git config --global user.name "John Doe"`
  - `git config --global user.email johndoe@example.com`
+ Foundry
+ JavaScript
  - Install Node.js.
  - Check the installed version: `node -v`
  - Install npm.
  - Check the installed version: `npm -v`
+ Code editor
  - Install Visual Studio Code.
  - Install the "solidity" extension by Juan Blanco, which provides syntax highlighting, IntelliSense, and debugging support for Solidity.
  - (Optional) Install the "Mark for VS Code" extension to create and view slides directly within VS Code using Marp Markdown.

# View Blockchain Information
+ Run Git Bash.
+ Start the test blockchain: `anvil`
+ Create a root folder "Web" and enter it.
  - `md Web`
  - `cd Web`
+ Create a folder "vieweth" and enter it.
  - `md vieweth`
  - `cd vieweth`
+ Initialize an npm project: `npm init`
+ Install Web3.js: `npm install web3`
+ Edit View.js
+ View the result: `node View`

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

## Interact with the Contract via Web3.js.
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
