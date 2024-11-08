# Example 2: Send Ether to Friends

## Send Ether via MetaMask and React
+ Create or log in to your MetaMask wallet.
+ Open a Git Bash (in Windows) or open a terminal (in Mac).
+ Enter the root folder "Web".
  ```
  cd Web
  ```
+ Create a React app.
  ```
  npx create-react-app transfer-app
  ```
+ Enter the new folder.
  ```
  cd transfer-app
  ```
+ Install Web3.js.
  ```
  npm install web3
  ```
+ Backup "src/App.js" to "src/App.js.ORIG".
  ```
  mv src/App.js src/App.js.ORIG
  ```
+ Edit "src/App.js".
  (You can copy this file from `/smart_contracts/src/web/transfer-app/App.js`.)
  ```
  code .
  ```
+ View the result.
  ```
  npm start
  ```

![image](/smart_contracts/img/Transfer_1.png)

![image](/smart_contracts/img/Transfer_2.png)

![image](/smart_contracts/img/Transfer_3.png)

![image](/smart_contracts/img/Transfer_4.png)

# Note
When you restart anvil, you may need to restart your browser and clear activity and nonce data in MetaMask: `Settings -> Advanced -> Clear activity tab data`. This can make sure the nonce data in anvil and in your MetaMask are consistent.
