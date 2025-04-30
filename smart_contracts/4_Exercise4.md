# NCCU Blockchain Course - 2025 Spring
![image](/img/pepe.png)
## Prerequisites
1. Get a Metamask wallet and remember your private key.
    - Do NOT use private keys from Foundry.
2. Go to [Ethereum Sepolia Faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia) to obtain Sepolia ETH.
    - Note: You can obtain 0.05 Sepolia ETH every 24 hours each wallet address.
    - If there is any error, try to use another Google account. 

##  ERC-20
In this lab, you will use your own wallet to deploy your own ERC‑20 token on the Sepolia testnet.

During the lab, if you have any questions or issues, feel free to ask the teacher or TA.

### 1. Initialize a Foundry project
```
forge init erc20-lab
cd erc20-lab
```
### 2. Install OpenZeppelin Library
After installing the OpenZeppelin library, you can import it into your contract.
```
forge install OpenZeppelin/openzeppelin-contracts
```

### 3. Set rpc endpoint in `foundry.toml`
- Add the following content at the bottom of the `foundry.toml`
    ```
    [rpc_endpoints]
    Sepolia = "https://ethereum-sepolia-rpc.publicnode.com"
    ```

### 4. Delete all example contracts
- Delete `Counter.s.sol` in `script` directory
- Delete `Counter.sol` in `src` directory
- Delete `Counter.t.sol` in `test` directory

### 5. Implement ERC-20 contract
- Create a new Solidity file in `src` directory.
- In the file you just created, paste the following code.
    ```
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.20;

    import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
    import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

    contract MyToken is ERC20, Ownable {
        constructor(uint INITIAL_SUPPLY) ERC20("MyToken", "MTK") Ownable(msg.sender) {
            _mint(msg.sender, INITIAL_SUPPLY);
        }

        function mint(address to, uint256 amount) external onlyOwner {
            _mint(to, amount);
        }
    }
    ```
- Try to modify the contract name, initial supply amount, token name and token symbol to whatever you like.

### 6. Local Test
- Activating Anvil environment in bash.
    ```
    anvil
    ```
- In `test` directory, create a new `.t.sol` file with the same name as erc20 contract file in `test` directory (e.g. `MyToken.t.sol`).
- Paste the following code in the test file.
    ```
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    import "forge-std/Test.sol";
    import "../src/MyToken.sol";

    contract MyTokenTest is Test {
        MyToken token;

        function setUp() public {
            token = new MyToken(1_000 * 10**18);
        }

        function testInitialSupply() public {
            assertEq(token.totalSupply(), 1_000 * 10**18);
            assertEq(token.balanceOf(address(this)), 1_000 * 10**18);
        }
    }
    ```
- Modify `MyToken` to the name of your ERC-20 contract.
- Run the test:
    ```
    forge test -vv
    ```

### 7. Deploy ERC-20 contract to Sepolia testnet
- In `script` directory, create a new `.s.sol` file with the same name as erc20 contract file in `script` directory (e.g. `MyToken.s.sol`).
- Paste the following code in the script file.
    ```
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    import "forge-std/Script.sol";
    import "../src/MyToken.sol";

    contract DeployMyToken is Script {
        function run() external {
            uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
            vm.startBroadcast(deployerPrivateKey);

            MyToken token = new MyToken(1_000 * 10**18);

            vm.stopBroadcast();

            console.log("Deployed ERC-20 token at:", address(token));
        }
    }
    ```
- Modify `MyToken` to the name of your ERC-20 contract.

- Set environment variable with your private key. Be aware that you need to add `0x` in front of your private key.
    ```
    export PRIVATE_KEY=0x<PRIVATE_KEY>
    ```
    For example:
    ```
    export PRIVATE_KEY=0xfffffffffffffffffffffff
    ```

- Deploy the contract to Sepolia testnet.
    ```
    forge script script/<SCRIPT_NAME>.s.sol \
        --rpc-url Sepolia \
        --broadcast
    ```

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
