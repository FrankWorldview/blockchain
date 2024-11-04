# Learning Resources
+ [Learn Solidity](https://www.alchemy.com/university/courses/solidity) & [GitHub](https://github.com/alchemyplatform/learn-solidity-presentations)
+ [Solidity cheetsheet](https://docs.soliditylang.org/en/v0.8.28/cheatsheet.html)
+ Development framework: [Foundry](https://book.getfoundry.sh/)
+ [Web3.js documents](https://docs.web3js.org/)
+ [Console logging in Foundry](https://book.getfoundry.sh/reference/forge-std/console-log)
+ React: [useState](https://react.dev/reference/react/useState)
+ React: [userEffect](https://react.dev/reference/react/useEffect)

# Supplements
+ [Ethereum basics](https://docs.alchemy.com/docs/ethereum-basics)
+ [How do smart contracts communicate?](https://docs.alchemy.com/docs/smart-contract-communication)
+ [What are multi-signature contracts?](https://docs.alchemy.com/docs/multi-sig-contracts)
+ [What is an ERC-20 token?](https://docs.alchemy.com/docs/what-is-erc-20)
+ [Foundry](https://medium.com/imtoken/foundry-introduction-and-our-experience-sharing-d9d82bf012ae)
+ JavaScript: [async function & await](https://www.casper.tw/development/2020/10/16/async-await/)

# Software Used in This Class
+ Solidity: [Foundry](https://book.getfoundry.sh/)
+ Git: [Git for Windows](https://gitforwindows.org/) (Mac already has Git and thus does not need to install this.)
+ JavaScript: [Node.js](https://nodejs.org/en/download/prebuilt-installer)
+ JavaScript development framework: [React](https://react.dev/)
+ Code editor: [Visual Studio Code](https://code.visualstudio.com/)

# Installation
+ [Git for Windows](https://gitforwindows.org/)
  - (Suggested) Check "Additional icons (On the Desktop)".
  - (Optional) Set your name for Git.
    ```
    git config --global user.name "John Doe"
    ```
  - (Suggested) Set your email for Git.
    ```
    git config --global user.email johndoe@example.com
    ```
+ [Foundry](https://book.getfoundry.sh/)
+ JavaScript
  - Install [Node.js](https://nodejs.org/en/download/prebuilt-installer).
  - Check the installed version.
    ```
    node -v
    npm -v
    ```
+ Code editor
  - Install [Visual Studio Code](https://code.visualstudio.com/).
  - Install the "solidity" extension by Juan Blanco, which provides syntax highlighting, IntelliSense, and debugging support for Solidity.
  - (Optional) Install the "Mark for VS Code" extension to create and view slides directly within VS Code using Marp Markdown.

# View Blockchain Information
+ Run Git Bash (in Windows) or open a terminal (in Mac).
+ Start the test blockchain.
  ```
  anvil
  ```
+ Run another Git Bash (in Windows) or open another terminal (in Mac).
+ Create a root folder "Web" and enter it.
  ```
  mkdir Web
  cd Web
  ```
+ Create a folder "vieweth" and enter it.
  ```
  mkdir vieweth
  cd vieweth
  ```
+ Initialize an npm project.
  ```
  npm init
  ```
+ Install Web3.js.
  ```
  npm install web3
  ```
+ Edit View.js.
  (You could copy this file from smart_contracts/src/web/vieweth/.)
+ View the result.
  ```
  node View
  ```

![image](/smart_contracts/img/anvil.png)

![image](/smart_contracts/img/vieweth.png)
