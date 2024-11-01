# Learning Resources
+ [Learn Solidity](https://www.alchemy.com/university/courses/solidity) & [GitHub](https://github.com/alchemyplatform/learn-solidity-presentations)
+ Development framework: [Foundry](https://book.getfoundry.sh/)
+ Development framework: [Hardhat](https://hardhat.org/)
+ Development framework: [Truffle Suite](https://archive.trufflesuite.com/) (sunset) + [Ganache](https://archive.trufflesuite.com/ganache/)
+ [Ethereum basics](https://docs.alchemy.com/docs/ethereum-basics)
+ [Web3.js documents](https://docs.web3js.org/)
+ [Console logging in Foundry](https://book.getfoundry.sh/reference/forge-std/console-log)
* https://www.casper.tw/development/2020/10/16/async-await/
* https://react.dev/reference/react/useEffect

# Software Used in This Class
+ Solidity: [Foundry](https://book.getfoundry.sh/) + [Git for Windows](https://gitforwindows.org/)
+ JavaScript: [Node.js (including npm)](https://nodejs.org/en/download/prebuilt-installer)
+ JavaScript development framework: [React](https://react.dev/)
+ Code editor: [Visual Studio Code](https://code.visualstudio.com/)


Installation
1.	Solidity
	Install Git for Windows
	git config --global user.name "John Doe"
	git config --global user.email johndoe@example.com
	Install Foundry
2.	JavaScript
	Install Node.js
	node -v
	Install npm: 
	npm -v
3.	Code editor
	Install Visual Studio Code
	Install the “solidity” extension by Juan Blanco, which provides syntax highlighting, IntelliSense, and debugging support for Solidity.
	Install the “Mark for VS Code” extension to create and view slides directly within VS Code using Marp Markdown.
 
View blockchain information
	Run Git Bash.
	Start the test blockchain: anvil
	Create a folder “Web” and enter this folder.
	md vieweth
	cd vieweth
	Initialize an npm project: npm init
	Install Web3.js: npm install web3
	Edit View.js
	View the result: node View

 
Example 1: Hello Contract
1.	Run Git Bash.
2.	Create a folder “Solidity” and enter this folder.
	md Solidity
	cd Solidity
3.	Initialize a Foundry project.
	forge init hello
4.	Move script/Counter.s.sol elsewhere (e.g. the bak folder).
5.	Copy src/Counter.sol to Hello.sol. Move Counter.sol elsewhere (e.g. the bak folder) and edit Hello.sol.
6.	Copy test/Counter.t.sol to Hello.t.sol. Move Counter.t.sol elsewhere (e.g. the bak folder) and edit Hello.t.sol.
7.	Test the contract.
	forge test -vv
8.	Build the contract.
	forge build
9.	Deploy the contract.
	forge create --rpc-url 127.0.0.1:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 src/Hello.sol:Hello
10.	Interact with the contract via Node.js.
	Enter the “Web” folder.
	md hello
	cd hello
	Initialize an npm project: npm init
	Install Web3.js: npm install web3
	Edit Hello.js
	View the result: node Hello
11.	Interact with the contract via Web3.js.
	Enter the “Web” folder.
	npx create-react-app hello-app
	cd hello-app
	Install Web3.js: npm install web3
	Copy the ABI file (i.e. Solidity/hello/out/Hello.sol/Hello.json) to React/hello-app/src/abi.
	Backup src/App.js to src/App.js.ORIG.
	Edit src/App.js.
	Make sure the addr variable refers to the contract’s deployed address.
	View the result: npm start

 
Exercise 1

