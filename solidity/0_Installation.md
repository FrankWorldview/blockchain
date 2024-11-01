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
+ JavaScript: [Node.js](https://nodejs.org/en/download/prebuilt-installer)
+ JavaScript development framework: [React](https://react.dev/)
+ Code editor: [Visual Studio Code](https://code.visualstudio.com/)

# Installation
+ [Git for Windows](https://gitforwindows.org/)
  - (Suggested) Check "Additional icons (On the Desktop)".
  - (Optional) `git config --global user.name "John Doe"`
  - (Required???) `git config --global user.email johndoe@example.com`
+ [Foundry](https://book.getfoundry.sh/)
+ JavaScript
  - Install [Node.js](https://nodejs.org/en/download/prebuilt-installer).
  - Check the installed version: `node -v`
  - Install npm.
  - Check the installed version: `npm -v`
+ Code editor
  - Install [Visual Studio Code](https://code.visualstudio.com/).
  - Install the "solidity" extension by Juan Blanco, which provides syntax highlighting, IntelliSense, and debugging support for Solidity.
  - (Optional) Install the "Mark for VS Code" extension to create and view slides directly within VS Code using Marp Markdown.

# View Blockchain Information
+ Run Git Bash.
+ Start the test blockchain: `anvil`
+ Run another Git Bash.
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

![image](/solidity/img/anvil.png)

![image](/solidity/img/vieweth.png)
