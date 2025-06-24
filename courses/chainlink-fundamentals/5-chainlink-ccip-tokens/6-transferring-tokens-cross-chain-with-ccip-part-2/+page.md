# Transferring Tokens Cross-chain in a Smart Contract Part 2

In the previous lesson, we wrote and deployed a smart contract to send USDC from Sepolia to Base Sepolia. In this lesson, we will perform that cross-chain transfer using Chainlink CCIP.

## Funding the contract with LINK

To send tokens cross-chain, we need to fund our `CCIPTokenSender` function with LINK tokens to pay for the cross-chain transfer.

This is a recap of what you learned in Section 2, Lesson 3, so we are going to go pretty quickly. Revisit that lesson if you'd like a more detailed breakdown. 

- In MetaMask, click on the **Tokens** tab and click the **LINK** token:

::image{src='/chainlink-fundamentals/5-chainlink-ccip-tokens/assets/mm-link-token.png' style='width: 100%; height: auto;' alt='mm-link-token'}

- Click the **Send** button:

::image{src='/chainlink-fundamentals/5-chainlink-ccip-tokens/assets/send-link.png' style='width: 100%; height: auto;' alt='send-link'}

- For the **Send to** address, paste the address of the `CCIPTokenSender` contract we deployed in the previous lesson:

::image{src='/chainlink-fundamentals/5-chainlink-ccip-tokens/assets/send-to.png' style='width: 100%; height: auto;' alt='send-to'}

- Enter the **Amount** of LINK to send to the contract. `3` LINK will be sufficient.
- Click **Continue**:

::image{src='/chainlink-fundamentals/5-chainlink-ccip-tokens/assets/send-amount.png' style='width: 100%; height: auto;' alt='send-amount'}

- Click **Confirm** to sign the transaction and send the LINK tokens to the `CCIPTokenSender` contract:

::image{src='/chainlink-fundamentals/5-chainlink-ccip-tokens/assets/confirm-transaction.png' style='width: 100%; height: auto;' alt='confirm-transaction'}

### Check the contract balance

Let's check the LINK tokens successfully transferred to the `CCIPTokenSender` contract by checking its LINK balance.

- Navigate to [Etherscan Sepolia](https://sepolia.etherscan.io/) and search the LINK token address on Sepolia: `0x779877A7B0D9E8603169DdbD7836e478b4624789`.
- Clic **Connect to Web3** and connect MetaMask to Etherscan.
- Click on the **Contract** tabs and then **Read Contract** and find the `balanceOf` function
- For the `account`, enter the `CCIPTokenSender` address:

::image{src='/chainlink-fundamentals/5-chainlink-ccip-tokens/assets/link-etherscan.png' style='width: 100%; height: auto;' alt='link-etherscan'}

If the transfer is successful, it will produce an output of `300000000000000`, which is 3 LINK in WEI.

## Approve CCIPTokenSender to spend USDC

When calling `transferTokens`, the function transfers tokens from the user (represented by `msg.sender`) to the `CCIPTokenSender` contract using the `safeTransferFrom` function, enabling those tokens to be sent cross-chain.

Before this can work, the user must first grant permission to the `CCIPTokenSender` contract to transfer their USDC tokens. This permission is given through an "approval" transaction on the USDC contract, which authorizes the `CCIPTokenSender` contract to spend a specific amount of the user's tokens on their behalf.

To do this token approval, we are going to interact with the USDC contract on Etherscan Sepolia, as we did the LINK token.

- Navigate to [Etherscan Sepolia](https://sepolia.etherscan.io/) and search the USDC token address on Sepolia: `0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238`
- Click on the **Contract** tabs and then **Write as Proxy**, (**Write** since we want to send a transaction that modifies state and **as Proxy** since we want to be calling functions on the implementation contract, and this is a proxy. Don't worry about what this means - it's pretty advanced stuff).
- Connect your wallet by clicking the **Connect to Web3** button.
- Find the `approve` function and click on it to expand it.
- For the `spender`, enter the `CCIPTokenSender` address; for the `value`, enter the number of tokens you want to send cross-chain; we will be sending `1 USDC` or `1000000` since USDC has 6 decimal places:

::image{src='/chainlink-fundamentals/5-chainlink-ccip-tokens/assets/usdc-etherscan.png' style='width: 100%; height: auto;' alt='usdc-etherscan'}

- Click **Write** to initiate the transaction.
- Sign the transaction in MetaMask to send the transaction.
- To confirm the approval was successful, click the **Read as Proxy** tab and click the `allowance` function. Enter your address as the `owner` and the `CCIPTokenSender` contract address as the `spender`. Then, click **Query**:

::image{src='/chainlink-fundamentals/5-chainlink-ccip-tokens/assets/allowance-usdc.png' style='width: 100%; height: auto;' alt='allowance-usdc'}

- If the approval was successful, you will see an output of `1000000`. 

## Executing the Cross-chain Transfer of USDC

Let's FINALLY send some USDC from Sepolia to Base Sepolia using CCIP!

- Return to Remix and click the **Deploy and run transactions** tab. 
- Click on the `transferTokens` function and fill out the following inputs:
    - `_receiver`: paste your wallet address since you will send yourself USDC on the destination chain. Note that, on some blockchains, you are not guaranteed to have the same address.
    - `_amount`: we are sending `1` USDC cross-chain, so put `1000000`(USDC has 6 decimal places).

    ::image{src='/chainlink-fundamentals/5-chainlink-ccip-tokens/assets/transfer-usdc-inputs.png' style='width: 100%; height: auto;' alt='transfer-usdc-inputs'}

- Click **transact** to initiate the transaction. 
- Sign the message in MetaMask by clicking **Confirm**.

::image{src='/chainlink-fundamentals/5-chainlink-ccip-tokens/assets/confirm-cross-chain.png' style='width: 100%; height: auto;' alt='confirm-cross-chain'}

- In Remix, we will see a log in the terminal confirming the transfer has been initiated on Sepolia.

::image{src='/chainlink-fundamentals/5-chainlink-ccip-tokens/assets/confirmed-transaction-terminal.png' style='width: 100%; height: auto;' alt='confirmed-transaction-terminal'}

- Copy the transaction hash! We will be using this shortly.

You have now successfully initiated a cross-chain transfer from Sepolia to Base Sepolia!
Now, we want to track the cross-chain message, see if the minting transaction has occurred on the destination chain, and when we received our bridged tokens. To do this, we will use the CCIP explorer.

## Using the CCIP Explorer

After sending a transaction, you can access the [CCIP Explorer](https://ccip.chain.link/) to check the progression of the coss-chain message.

Paste the Sepolia transaction hash into the CCIP Explorer search bar:

::image{src='/chainlink-fundamentals/5-chainlink-ccip-tokens/assets/ccip-explorer.png' style='width: 100%; height: auto;' alt='ccip-explorer'}

This will bring up the transaction details for your cross-chain transfer. Here, you will be able to see an overview of the transaction, including the source and destination transactions to burn and mint the tokens, respectively.

It will also show the **Status** of the cross-chain message. The tokens are only received on the destination chain after full finality is reached on the source chain. For Ethereum Sepolia, this is approximately 20 minutes, but the times for different chains can be found in the Chainlink documentation.

::image{src='/chainlink-fundamentals/5-chainlink-ccip-tokens/assets/ccip-tx-details.png' style='width: 100%; height: auto;' alt='ccip-tx-details'}

When the message's status changes from **Waiting for finality** to **Success**, you will have received your tokens on the destination chain:

::image{src='/chainlink-fundamentals/5-chainlink-ccip-tokens/assets/message-success.png' style='width: 100%; height: auto;' alt='message-success'}

To check your USDC balance, switch your network inside MetaMask to Base Sepolia and then check your USDC balance in the **Tokens** tab (assuming you have imported the USDC token on Base Sepolia).

::image{src='/chainlink-fundamentals/5-chainlink-ccip-tokens/assets/balance-increased.png' style='width: 100%; height: auto;' alt='balance-increased'}

Awesome! You successfully sent your first cross-chain message to bridge tokens from Sepolia to Base Sepolia using CCIP integrated into a smart contract!

## Challenge!

So now you know how to write a smart contract to bridge USDC tokens from Sepolia to Base Sepolia, the next challenge is to use this same smart contract to transfer [CCIP-BnM](https://sepolia.etherscan.io/token/0xfd57b4ddbf88a4e07ff4e34c487b99af2fe82a05#writeContract) tokens to ZKsync Sepolia!

To do this you will need to:

1. Add the ZKsync Sepolia chain to MetaMask. 
2. Add the CCIP-BnM token on Sepolia and ZKsync Sepolia to Metamask.
3. Modify and re-deploy the smart contract to Sepolia:
    - `DESTINATION_CHAIN_SELECTOR` to be the [selector for ZKsync Sepolia](https://docs.chain.link/ccip/directory/testnet/chain/ethereum-testnet-sepolia-zksync-1).
    - Change the token to be CCIP-BnM rather than USDC.
    - (devs-only): Can you moify the smart contracts to be adaptable for multiple chains by allowing the function caller to specify the token and destination chain?
4. Get some test CCIP tokens (CCIP-BnM) by [calling `drip()` on the token contract using Etherscan](https://sepolia.etherscan.io/token/0xfd57b4ddbf88a4e07ff4e34c487b99af2fe82a05#writeContract).
5. Call `transferTokens` as before and check the CCIP explorer to check the status of your cross-chain transfer.
6. Check your balance of ZKsync Sepolia CCIP-BnM tokens has now increased!

If you do this, make sure to let us know on Twitter/X using [this link](https://twitter.com/intent/post?text=I%20just%20transferred%20tokens%20cross-chain%20using%20%40chainlink%20CCIP%20to%20%40zksync%20testnet!%20Thanks%20%40ciaranightingal%20and%20%40cyfrinupdraft!) to send the following message:

"I just transferred tokens cross-chain using @chainlink CCIP to @zksync testnet! Thanks @ciaranightingal and @cyfrinupdraft!"

See how easy it is to transfer your tokens cross-chain to ZKsync? Cool right! 