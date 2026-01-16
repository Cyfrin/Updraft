# Interacting with a Contract - Minting Tokens

We have not yet minted any tokens, which means currently the total available supply of our token is `0` - no tokens currently exist! To increase the supply of tokens, we have to call the function `mint` from our contract:

- Go to the **Deploy & Run Transactions** tab.
- Find your token and expand the tab to see the contract's functions.

![functions-on-contract](/chainlink-fundamentals/2-smart-contract-and-solidity-fundamentals/assets/functions-on-contract.png)

- Find the function `mint` and expand it to check the parameters.
    - `to`: The address receiving the minted tokens. We will create `100` tokens by setting the amount value as `100000000000000000000`. This is because our Token has `18` decimals. 
    - `amount`: The amount to mint.

    ![transact](/chainlink-fundamentals/2-smart-contract-and-solidity-fundamentals/assets/transact.png)

- To send the transaction, click on the **transact** button and confirm the transaction in your Metamask wallet.
- Now, you can check to see if your balance has increased by calling `balanceOf` and passing the address you minted the tokens to.
- You can also check your balance in MetaMask by heading to the **Tokens** tab since we added our token in the previous lesson.

## Allowance and Token Approvals

Token approvals enable another address to spend another address's tokens. This feature is commonly used in DeFi applications that need to transfer ERC20 tokens from your wallet to another wallet or contract via another intermediary smart contract.

To use this feature, you can call the `approve` function, specifying the address that will spend your tokens and the amount they are allowed to spend. 

![approve](/chainlink-fundamentals/2-smart-contract-and-solidity-fundamentals/assets/approve.png)

You can always verify if a contract has permission to spend your tokens by calling the `allowance` function.

![allowance](/chainlink-fundamentals/2-smart-contract-and-solidity-fundamentals/assets/allowance.png)

