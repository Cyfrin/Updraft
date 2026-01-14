## Your First Transaction on zkSync

Welcome to your guide to completing your first transaction on the zkSync network. In this lesson, we will walk through the entire process of getting testnet funds and bridging them from the Sepolia testnet to the zkSync Sepolia testnet. It's important to note that the terms **zkSync Testnet**, **zkSync Sepolia**, and **zkSync Era Testnet** are often used interchangeably and refer to the same network we will be using today.

## Step 1: Adding the zkSync Sepolia Network to MetaMask

Before we can interact with zkSync, we need to add its testnet configuration to our MetaMask wallet. This allows your wallet to communicate with the network, view your balance, and track transaction history. The simplest way to do this is with Chainlist.

1.  Navigate to [chainlist.org](https://www.chainlist.org/).
2.  Enable the **"Include Testnets"** option, usually a checkbox near the search bar.
3.  In the search bar, type `zkSync`.
4.  From the search results, locate **"zkSync Sepolia Testnet"** (which should have a ChainID of 300) and click on it.
5.  Click the **"Connect Wallet"** button. A MetaMask pop-up will ask for permission to connect; approve it.
6.  MetaMask will then prompt you to add the network. Review the details and click **"Approve"**.
7.  Finally, click **"Switch network"** to make zkSync Sepolia the active network in your wallet.

After these steps, your MetaMask wallet will now be connected to the zkSync Sepolia Testnet, displaying a balance of 0 ETH.

## Step 2: Using the zkSync Block Explorer

A block explorer is an essential tool for inspecting transactions, accounts, and smart contracts on a blockchain. For Ethereum, the most common explorer is Etherscan. For zkSync, we will use the official zkSync Explorer.

1.  Open your browser and navigate to the zkSync Sepolia Testnet Explorer: `https://sepolia.explorer.zksync.io/`.
2.  Copy your wallet address from MetaMask by clicking on it.
3.  Paste your address into the explorer's search bar and press Enter.

At this point, the explorer will display a summary of your account, showing no ETH balance and no transaction history. We will return to this page later to verify our transaction.

## Step 3: Acquiring Testnet Funds

To perform any transaction, you need cryptocurrency to pay for gas fees and to transact with. Since native zkSync faucets can sometimes be unreliable or require API keys, we will use a more consistent method: acquiring funds on the Ethereum Sepolia testnet (L1) and bridging them over to the zkSync Sepolia testnet (L2).

1.  Open MetaMask and switch your network from zkSync Sepolia back to the **Sepolia** testnet.
2.  Navigate to a reliable Sepolia faucet, such as the [Google Cloud Ethereum Sepolia Faucet](https://cloud.google.com/web3/faucet/ethereum/sepolia). (Note: Faucet links can change over time. If this one is unavailable, check the official documentation or community channels for up-to-date links).
3.  Paste your wallet address into the provided input field.
4.  Complete any required verification steps and click the button to receive your testnet ETH. The Google faucet typically sends 0.05 Sepolia ETH.
5.  Wait a few moments. The funds will soon appear in your MetaMask wallet on the Sepolia network.

## Step 4: Bridging Funds from Sepolia to zkSync Sepolia

With testnet ETH secured on the L1 Sepolia network, we can now perform our primary transaction: bridging.

### Understanding Bridging

Bridging is the process of moving assets from one blockchain to another. It doesn't literally transfer the tokens across networks. Instead, it relies on smart contracts to create the illusion of a transfer through one of two common mechanisms:

*   **Lock & Unlock:** Your tokens are locked in a smart contract on the source chain (Ethereum Sepolia). A message is then sent to the destination chain (zkSync Sepolia), which triggers a corresponding smart contract to release or unlock an equivalent amount of tokens to your address. The native zkSync bridge uses this method.
*   **Mint & Burn:** Your tokens are destroyed ("burned") on the source chain. Upon confirmation of the burn, an equal number of new tokens are created ("minted") on the destination chain and sent to your wallet. This mechanism is often used by protocols that control a token's total supply, such as Circle's CCTP for the USDC stablecoin.

### Executing the Bridge Transaction

1.  Navigate to the official zkSync Portal: [portal.zksync.io/bridge/](https://portal.zksync.io/bridge/).
2.  In the top right corner, ensure the portal is set to the **zkSync Sepolia Testnet**.
3.  Click **"Connect wallet"** and approve the connection request from MetaMask.
4.  The bridging interface will be configured to transfer **From** "Ethereum Sepolia Testnet" **To** "zkSync Sepolia Testnet".
5.  Enter the amount of ETH you wish to bridge. For this example, we'll use `0.025`.
6.  Click **"Continue"**.
7.  Acknowledge any wallet security warnings by clicking **"I understand, proceed to bridge"**.
8.  Review the transaction summary, including the estimated fees, and click **"Bridge now"**.
9.  A MetaMask pop-up will appear asking you to confirm the L1 transaction. Click **"Confirm"**.

Once the transaction is confirmed on the Sepolia network, the bridging process will begin.

## Step 5: Verifying the Transaction and Understanding Finality

After a short period, the bridged funds will appear in your MetaMask wallet when you are connected to the zkSync Sepolia network. Now, let's verify this on the block explorer and discuss the important concept of transaction finality.

Return to the zkSync Sepolia Block Explorer and search for your wallet address again. You will now see your updated ETH balance and a record of the incoming transfer transaction. Clicking on this transaction will show that it was a transfer from your L1 address to your L2 address (which are the same).

### Understanding Finality on L1 vs. L2

**Finality** is the guarantee that a transaction is permanent and cannot be reversed or altered. This concept differs between Layer 1 (L1) and Layer 2 (L2) networks.

*   **Finality on Ethereum (L1):** A transaction is considered final after about 13 minutes, once enough blocks have been built on top of it to make a reversal computationally infeasible.
*   **Finality on zkSync (L2):** This is a two-stage process.
    1.  **Instant Confirmation (Processed):** Your transaction is accepted and processed by the zkSync network almost instantly. You can see the funds in your wallet and immediately use them for other L2 activities. On the block explorer, this is indicated by the **"Processed"** status.
    2.  **Full Finality (on L1):** True, irreversible finality is only achieved when the batch of transactions containing yours is submitted to the Ethereum L1 mainnet. A cryptographic proof (a ZK-proof) for this batch is generated and verified on L1, and the L1 state is updated. This complete settlement process can take up to 24 hours.

When you inspect your bridge transaction on the zkSync explorer, you will see a `Status` section reflecting this two-part process. The **zkSync Era** status will quickly show `Processed`, while the **Ethereum** status will cycle through stages like `Sending`, `Validating`, and `Executing` as it moves towards full L1 finality.

Congratulations, you have successfully completed your first transaction on zkSync