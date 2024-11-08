# Send Ether to a Contract

## Create, Test, and Deploy the Donation Contract
+ Open a Git Bash (in Windows) or open a terminal (in Mac).
+ Enter the root folder "Solidity".
  ```
  cd Solidity
  ```
+ Initialize a Foundry project.
  ```
  forge init donation
  ```
+ Enter the new folder and open Visual Studio Code.
  ```
  cd donation
  code .
  ```
+ Move src/Counter.sol elsewhere (e.g. the bak folder). Edit "src/Donation.sol".
  (You can copy this file from `/smart_contracts/src/solidity/donation/Donation.sol`.)
+ Move test/Counter.t.sol elsewhere (e.g. the bak folder). Edit "test/Donation.t.sol".
  (You can copy this file from `/smart_contracts/src/solidity/donation/Donation.t.sol`.)
+ Move script/Counter.s.sol elsewhere (e.g. the bak folder).
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
  forge create --rpc-url 127.0.0.1:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 src/Donation.sol:Donation --value 10ether --constructor-args 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
  ```
  (Note: Replace 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 with the beneficiary address you like.)

## Interact with the Hello Contract via React
+ Open a Git Bash (in Windows) or open a terminal (in Mac).
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
  (You can copy this file from `/smart_contracts/src/web/hello-app/App.js`.)
  ```
  code .
  ```
+ Make sure the "addr" variable refers to the contract's deployed address.
+ View the result.
  ```
  npm start
  ```

![image](/smart_contracts/img/transfer-4.png)