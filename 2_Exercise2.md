# Exercise 2: Send Ether

## Send Ether via MetaMask and React
+ Create or log in to your MetaMask wallet. Create a test network and connect to it:
  ![image](/image/testnet.png)
+ Open a Git Bash (in Windows) or a terminal (in Mac).
+ Enter the folder `Web`.
  ```
  cd Web
  ```
+ Create a React + Vite app. (Install with npm and start now? Choose "No".)
  ```
  npm create vite@latest transfer-app -- --template react
  ```
+ Enter the new folder and install Vite.
  ```
  cd transfer-app
  npm install
  ```
+ Install Ethers.js.
  ```
  npm install ethers
  ```
+ Backup "src/App.jsx" to "src/App.jsx.ORIG".
  ```
  mv src/App.jsx src/App.jsx.ORIG
  ```
+ Edit "src/App.jsx".
  (You can copy this file from `/code/web/transfer-app/src/App.jsx`.)
  ```
  code .
  ```
+ Copy images assets to "src". (You can copy the assets from `/code/web/transfer-app/src/assets`.)
+ View the web page.
  ```
  npm run dev
  ```
+ Change the receiver address.
+ "Transfer" Ether to the receiver address.
+ Use the utility program `vieweth` to examine account balances.

![image](/image/transfer.png)

## Note
When you restart anvil, you may need to restart your browser and clear activity and nonce data in MetaMask.

+ `Settings -> Advanced -> Clear activity tab data`.
+ `Settings -> Developer tools -> Delete activity and nonce data`.

This can make sure the nonce data in anvil and in your MetaMask are consistent.
