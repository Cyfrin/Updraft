# Deploying our Token

Now we have written our permissioned ERC-20 token contract, let's deploy it to a live testnet and then add that token to our MetaMask so we can see our balance and use the UI to perform token transfers. 

## Compile & Deploy

1. Compile your smart contract
    - Make sure you still have the `MyERC20.sol` file open.
    - Head to the **Solidity compiler** tab on the left sidebar.
    - Select the compiler version. Here, we are using version `0.8.19`. Ensure the compiler version is set to `0.8.19` or later, as indicated in the pragma directive (`pragma solidity ^0.8.19;`). The `^` symbol tells the compiler that any version above `0.8.19` can be used. Without the symbol, only version `0.8.19` would be allowed.
    - Hit **Compile MyERC20.sol** to compile the contract

    ![solidity-compiler-tab](/chainlink-fundamentals/2-smart-contract-and-solidity-fundamentals/assets/solidity-compiler-tab.png)

    - You can also compile by hitting `Cmd + S` on your keyboard on Mac or `Ctrl + S` on windows.
    - If there are no errors, the contract will compile successfully, and you’ll see a green checkmark.

2. Deploy your smart contract
    - Head to the **Deploy and run transactions** tab in the left-hand sidebar.
    - We want to deploy our contract with MetaMask. To connect your wallet to Remix, click **Select Environment** dropdown menu and select **Injected Provider - MetaMask**.
    - This will open MetaMask and ask to connect to Remix. Click **Connect**.

    ![metamask-environment](/chainlink-fundamentals/2-smart-contract-and-solidity-fundamentals/assets/metamask-environment.png)

    - In the Contract dropdown, select `MYERC20.sol`.
    
    ![deploy](/chainlink-fundamentals/2-smart-contract-and-solidity-fundamentals/assets/deploy.png)

    - Click **Deploy**.
    - Sign the transaction in Metamask to deploy your smart contract!

You will know if your contract has been successfully deployed if:

- The Remix terminal window (the block at the bottom of your screen) shows a green tick next to the transaction information:

![remix-terminal](/chainlink-fundamentals/2-smart-contract-and-solidity-fundamentals/assets/remix-terminal.png)

- Your MetaMask shows a successful contract deployment transaction:

![contract-deployment](/chainlink-fundamentals/2-smart-contract-and-solidity-fundamentals/assets/contract-deployment.png)

- And your contract is in the **Deployed contracts** section on Remix:

![deployed-contract](/chainlink-fundamentals/2-smart-contract-and-solidity-fundamentals/assets/deployed-contract.png)

**Note** We are going to be using this ERC-20 contract we deployed in the next section so double check you have pinned the contract so you can use it again later. It may also be worth copying the address and keeping a note of it somewhere. 

![copy-address](/chainlink-fundamentals/2-smart-contract-and-solidity-fundamentals/assets/copy-address.png)

## Check Total Token Supply and Balances

1. Once your contract is deployed, you can view it in the **Deployed Contracts** section. Here, you will find all the functions available within the contract, allowing you to interact with them directly.

2. You can pin your contract by clicking on the pin icon. This will save your contracts if you want to close Remix and continue another time. Note that pinning is workspace-specific, so make sure you open the same Remix workspace when you need to access this token contract.

![pin-contract](/chainlink-fundamentals/2-smart-contract-and-solidity-fundamentals/assets/pin-contract.png)

3. To check the total supply of your token, call the `totalSupply` function.
If you want to view the balance of a specific wallet, use the `balanceOf` function and pass the wallet address as a parameter. Currently, your token will not have any tokens minted, so the return value will be `0` for both function calls.

![0-total-supply](/chainlink-fundamentals/2-smart-contract-and-solidity-fundamentals/assets/0-total-supply.png)

## Adding Your Token to MetaMask

If you deployed your contract on a testnet, you can add your token to MetaMask by following these steps:

1.  Copy the token contract address. In Remix, you can find this address in the **Deployed Contracts** section.

![copy-address](/chainlink-fundamentals/2-smart-contract-and-solidity-fundamentals/assets/copy-address.png)

2.  Open your MetaMask wallet and click on the **Tokens Tab**. Hit the three vertical dots icon on the right hand side and click **Import tokens**.

![token-tab](/chainlink-fundamentals/2-smart-contract-and-solidity-fundamentals/assets/token-tab.png)

3.  Enter the token contract address. MetaMask will automatically detect your token and its related information since it follows the ERC-20 standard.

4. Check if the information is correct (Address, Token Symbol, and Decimals).

![import-token](/chainlink-fundamentals/2-smart-contract-and-solidity-fundamentals/assets/import-token.png)

5. Click **Next** to confirm the information. Click **Import** to import your token to MetaMask. This allows you to view your balance and send tokens to others using the MetaMask UI.

## Summary 

In the past two lessons, we wrote a simple ERC-20 smart contract and deployed it to Sepolia using Remix. 

We learned:
- How to use Remix
- How to write a simple ERC-20 contract with permissions
- How to compile and deploy a smart contract 
- How to pin a smart contract in a Remix workspace
- How to call functions on a smart contract in Remix (don't worry, we will revisit this shortly)
- How to add a custom token smart contract to MetaMask

In the next lesson, we will learn how to dive the `MINTER_ROLE` to another address using the `DEFAULT_ADMIN` (the deployer) address to allow another address to mint tokens.
