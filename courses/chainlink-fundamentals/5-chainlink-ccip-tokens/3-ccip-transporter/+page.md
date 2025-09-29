# Transporter 

In this lesson, we will use Transporter to bridge USDC cross-chain from Sepolia to Base Sepolia.

## What is Transporter?

Transporter is an application designed to facilitate bridging tokens and messages across blockchains. Transporter is powered by Chainlink’s Cross-Chain Interoperability Protocol (CCIP). Transporter was built in association with the Chainlink Foundation and with support from Chainlink Labs to simplify access to the cross-chain economy. Features include an intuitive UI, 24/7 global support, and a [visual tracker](https://ccip.chain.link/) that allows users to continuously monitor the state of their assets and messages through every step of a transaction.

CCIP achieves the [highest level of cross-chain security](https://blog.chain.link/five-levels-cross-chain-security/) by utilizing Chainlink’s time-tested decentralized oracle networks, which has [enabled over $15 trillion in transaction value](https://chain.link/), and a separate Risk Management Network. Leveraging CCIP’s [defense-in-depth](https://blog.chain.link/ccip-risk-management-network/) security model, Transporter enables secure and decentralized token transfers across a wide range of blockchains.

## Using Transporter

In this lesson, we will use Transported to bridge USDC from Sepolia to Base Sepolia. Note that when bridging USDC using CCIP, CCIP will also leverage Circle's Cross-chain transfer protocol (CCTP) under the hood. To understand more about how CCIP uses CCTP, visit the [CCIP documentation](https://docs.chain.link/ccip/tutorials/usdc).

### Prerequisites

- You have LINK funds on Sepolia. 
- You've added the LINK token to MetaMask on Sepolia and Base Sepolia.
- You've added the USDC token to MetaMask on Sepolia and Base Sepolia. A list of the addresses on different chains can be found in the [Circle documentation](https://developers.circle.com/stablecoins/usdc-on-test-networks).
- You have test USDC on Sepolia., Use the [Circle USDC faucet](https://faucet.circle.com/) to do this.

Visit Section 2 if you need a reminder of how to do this.

### Bridging Using Transporter

1. Open the Transporter testnet app and click on one of the **Connect Wallet** buttons.

![transporter-connect-wallet](/chainlink-fundamentals/5-chainlink-ccip-tokens/assets/transporter-connect-wallet.png)

2. Check the Box to accept the Terms of Service and select your wallet option (e.g., MetaMask). Click **Connect** when prompted in MetaMask to connect your wallet to Transporter.

![terms-of-service](/chainlink-fundamentals/5-chainlink-ccip-tokens/assets/terms-of-service.png)

3. We must now define the source and destination chains and the token we want to transfer.
    - Select Ethereum Sepolia as **From** (the source chain).
    - Select Base Sepolia as **To** (the destination chain).
    - Select USDC as the **Token**.
    - Input the **Amount** as `1` USDC.

![approve-transporter](/chainlink-fundamentals/5-chainlink-ccip-tokens/assets/approve-transporter.png)

4. Click **Approve USDC**
    -  Select the **Approve one-time only** option.

![approve-one-time](/chainlink-fundamentals/5-chainlink-ccip-tokens/assets/approve-one-time.png)

5. In the MetaMask pop-up, check the Spending cap is `1` as the amount to approve. Click **Confirm** to send the approval transaction.

![confirm-approve](/chainlink-fundamentals/5-chainlink-ccip-tokens/assets/confirm-approve.png)

6. Once the approval transaction is confirmed, click **Send** in Transporter to bridge the tokens.
7. Sign the transaction in MetaMask to burn the tokens on Sepolia and send the cross-chain message. This will trigger USDC tokens to be minted on Base Sepolia once finality is reached on Ethereum Sepolia and the message has been received.

![cross-chain-message-steps](/chainlink-fundamentals/5-chainlink-ccip-tokens/assets/cross-chain-message-steps.png)

Click **View transaction** to open the CCIP explorer and see the cross-chain message details, including the status of the message, the source and destination chain transactions hashes, the amount, fees, sender and receiver addresses:

![ccip-explorer-transporter](/chainlink-fundamentals/5-chainlink-ccip-tokens/assets/ccip-explorer-transporter.png)

Once the status moves to **Success**, you will have completed your cross-chain transfer using CCIP! This should take around 20 minutes for Ethereum Sepolia finality.

![transporter-message-success](/chainlink-fundamentals/5-chainlink-ccip-tokens/assets/transporter-message-success.png)

![transporter-message-success-2](/chainlink-fundamentals/5-chainlink-ccip-tokens/assets/transporter-message-success-2.png)

You can now check your USDC balance on Base Sepolia to see if your balance of USDC has increased by `1` and the cross-chain transfer was successful.

![balance-increased](/chainlink-fundamentals/5-chainlink-ccip-tokens/assets/balance-increased.png)
