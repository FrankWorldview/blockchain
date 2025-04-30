# Exercise 4: Create Your Own Tokens

## Create, Test, and Deploy Your ERC‑20 Contract on Anvil
+ Initialize a Foundry project.
   ```
   forge init erc20
   cd erc20
   ```
+ Install OpenZeppelin
  ```
  forge install OpenZeppelin/openzeppelin-contracts --no-commit
  ```
+ Move src/Counter.sol elsewhere (e.g., the `orig` folder).
+ Move test/Counter.t.sol elsewhere (e.g., the `orig` folder).
+ Move test/Counter.s.sol elsewhere (e.g., the `orig` folder).
+ `code .`
+ Copy the contract file from `/smart_contracts/code/solidity/erc20/src/MyToken.sol` to your `src` folder.
+ Copy the test script file from `/smart_contracts/code/solidity/erc20/test/MyToken.t.sol` to your `test` folder.
+ Copy the deployment script file from `/smart_contracts/code/solidity/erc20/script/MyToken.s.sol` to your `script` folder.
+ `anvil`
+ Build the contract.
  ```
  forge build
  ```
+ Test the contract.
  ```
  forge test -vv
  ```
+ Deploy the contract using command (and using your private key).
  ```
  forge create src/MyToken.sol:MyToken --rpc-url http://127.0.0.1:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast --constructor-args "MyToken" "MTK" 1000
  ```
+ Alternatively, deploy the contract using deployment script (and using your private key).
  ```
  forge script script/MyToken.s.sol --rpc-url http://127.0.0.1:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast
  ```
+ Import your tokens into your wallet.
+ Now, you should be able to tranfer your tokens to another account on anvil.

## Deploy Your ERC‑20 Contract on Sepolia (an Ethereum Testnet)
+ Prerequisites
1. Install a MetaMask wallet and generate a new account. (Use THIS account in the follwoing exercise!)
2. Visit [Ethereum Sepolia Faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia) to obtain Sepolia ETH (Ethereum test tokens).
   - You can obtain only 0.05 Sepolia ETH per day.
   - If there is any error, try to use another Google account.

+ For security reasons, do not reveal your private key in commnad line interface. So, set your private key as an environmental varaible.
  `export PRIVATE_KEY=<your_private_key>`

+ Deploy your ERC-20 contract onto Sepolia. (Your could change the RPC URL to other Sepolia RPC URLs, such as Infura and Alchemy.)
  `forge script script/MyToken.s.sol --rpc-url https://ethereum-sepolia-rpc.publicnode.com --private-key $PRIVATE_KEY --broadcast`

  
cast call 0xC92fa3cA7FD3D163147F672300a7d5bfAF374112 "totalSupply()(uint256)" --rpc-url https://ethereum-sepolia-rpc.publicnode.com

cast call 0xC92fa3cA7FD3D163147F672300a7d5bfAF374112 "totalSupply()(uint256)" --rpc-url https://ethereum-sepolia-rpc.publicnode.com

cast send 0xC92fa3cA7FD3D163147F672300a7d5bfAF374112 "mint(address,uint256)" 0x5300447D9A3d35D51E053F84F362Ae47Bf9DEC68 1000000000000000000000 --rpc-url https://ethereum-sepolia-rpc.publicnode.com --private-key $PRIVATE_KEY

cast send 0xC92fa3cA7FD3D163147F672300a7d5bfAF374112 "transfer(address,uint256)" 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 1000000000000000000000 --rpc-url https://ethereum-sepolia-rpc.publicnode.com --private-key $PRIVATE_KEY






### 8. Check the contract
- Goto https://sepolia.etherscan.io/address/<TOKEN_CONTRACT_ADDRESS> to check your contract.
    ![image](/img/etherscan.jpg)
- Check total supply of your token.
    ```
    cast call <CONTRACT_ADDRESS> "totalSupply()" \
        --rpc-url Sepolia
    ```

### 9. Import token in Metamask.

### 10. Transfer token with your classmates!
- Goto [ERC‑20 Collaboration Form](https://docs.google.com/spreadsheets/d/1tCwMNnZe6jjMBQVB9Nb7c0JYvaNeSEe5X2ZiKn6xMJI/edit?usp=sharing). Add you name, wallet address, ERC-20 contract address and token symbol to the form.

- Mint token to specific wallet address.
    ```
    cast send <CONTRACT_ADDRESS> \
        "mint(address,uint256)" <recipient_address> <amount> \
        --rpc-url Sepolia \
        --private-key $PRIVATE_KEY
    ```

- Try to mint or transfer the token to your classmates in the form.
- After you mint token to others, check if the total supply of your token changed?
