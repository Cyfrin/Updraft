## How to Swap Tokens on the Uniswap DEX

Welcome to this step-by-step guide on performing a token swap using Uniswap, one of the most popular decentralized exchanges (DEXs) in Decentralized Finance (DeFi). In this lesson, we will walk through the entire process on the Sepolia testnet, a safe environment for learning that uses tokens with no real-world monetary value. This allows you to master the mechanics of a DEX without risking any funds.

We will connect a MetaMask wallet, swap Sepolia ETH for USDC, and, most importantly, learn how to verify transaction details to interact with the blockchain safely and securely.

## A Step-by-Step Guide to Your First Uniswap Swap

Follow these steps to connect your wallet and execute a trade on the Uniswap platform. While you can follow along, acquiring testnet ETH can sometimes be difficult, so feel free to simply read through the steps to understand the process.

### 1. Access the Uniswap Application and Connect Your Wallet

First, navigate to the official Uniswap application. It is critical to ensure you are on the correct domain to avoid phishing scams. The official URL is: `app.uniswap.org/swap`.

Once the page loads, locate and click the **"Connect wallet"** button, typically found in the top-right corner. A pop-up will appear listing various wallet options. Select **MetaMask**. Your MetaMask wallet extension will then ask for permission to connect to the Uniswap site. Review the request and click **"Connect"** to approve it. Your wallet address should now be visible on the Uniswap interface.

### 2. Enable Testnet Mode

Since we are practicing without financial risk, we need to enable testnet mode.

1.  Click on your wallet address in the top-right corner to open the wallet overview panel.
2.  Click the **settings icon** (shaped like a cog).
3.  Locate the **"Testnet mode"** option and toggle it on.
4.  A notification will appear explaining that testnet tokens have no real value. You can close this message.

This setting ensures that Uniswap displays balances and networks relevant to testing, such as Sepolia, rather than the Ethereum mainnet.

### 3. Set Up and Review Your Swap

Now you are ready to configure the token swap. The interface presents a "Sell" field and a "Buy" field.

1.  In the "Sell" field, ensure the selected network is **Sepolia** and the token is **ETH**.
2.  Enter the amount you wish to sell. For this demonstration, we will use **0.005 ETH**.
3.  In the "Buy" field, click **"Select token"** and search for or select **USDC**.

Uniswap’s Automated Market Maker (AMM) system will automatically calculate the estimated amount of USDC you will receive based on the current price in the liquidity pool.

Next, click the **"Review"** button to see a detailed summary of the transaction. Pay close attention to these details:
*   **Amounts:** The exact amount of ETH you are selling for the estimated amount of USDC you will receive.
*   **Fee:** The protocol fee charged by Uniswap for facilitating the trade (e.g., 0.25%).
*   **Network Cost:** The estimated gas fee required to process the transaction on the Sepolia network.
*   **Rate:** The current exchange rate between the two tokens (e.g., 1 ETH = X USDC).
*   **Max Slippage:** A crucial safety feature. This is the maximum percentage the price can change between when you submit the transaction and when it is confirmed on the blockchain. If the price moves against you by more than this amount (default is 0.50%), the transaction will automatically fail, protecting you from a bad trade.
*   **Price Impact:** An estimate of how much your trade will affect the price of the assets in the liquidity pool. For small trades, this is usually negligible.

### 4. Confirm the Transaction in Your Wallet

After carefully reviewing the details on Uniswap, click the **"Swap"** button. This action does not execute the trade immediately; instead, it prompts your MetaMask wallet to open a final confirmation window. This is the most critical security checkpoint.

In the MetaMask pop-up, you must verify that you are interacting with the correct application and smart contract. Check the following:
*   **Request From:** The domain should match the site you are on: `app.uniswap.org`.
*   **Interacting With:** This shows the address of the smart contract that will execute your swap. We will cover how to verify this in the next section.
*   **Method:** The function being called should align with your intent. In this case, it is an `execute` function call to Uniswap's Universal Router contract.

Once you have verified these details, scroll down and click **"Confirm"** in MetaMask. This signs the transaction with your private key and broadcasts it to the network for processing.

### 5. Verify Swap Completion

Back on the Uniswap interface, you will see a notification that the transaction is pending, which will change to **"Swapped!"** upon successful completion.

To double-check, open MetaMask:
*   Navigate to the **"Activity"** tab. You should see the `Execute` transaction listed as confirmed.
*   Navigate to the **"Tokens"** tab. You will see that your ETH balance has decreased and your USDC balance has increased accordingly.

## A Crucial Step: Verifying Your Transaction

When your MetaMask wallet prompts you for confirmation, you may see a "Suspicious address" warning. This is a common security feature that flags contracts that are not yet widely recognized or whitelisted. Instead of ignoring it, you should always take the time to manually verify the contract address, especially when dealing with real funds on mainnet.

Here is how to verify the Uniswap Universal Router address we interacted with:

1.  **Copy the Contract Address:** In the MetaMask confirmation window, copy the smart contract address listed under "Interacting With."
2.  **Find an Official Source:** Open a new tab and navigate to the official Uniswap Documentation website. Official documentation is the most reliable source for contract addresses.
3.  **Locate the Address:** In the documentation, find the section detailing contract deployments. Look for the addresses on the **Ethereum Sepolia** network.
4.  **Compare and Confirm:** Find the entry for the **"Universal Router"** contract. The address listed in the documentation should be an exact match for the one in your MetaMask pop-up.

For this lesson, the verified Sepolia Universal Router address is: `0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD`.

This verification process confirms you are sending your funds to the legitimate Uniswap protocol and not to a malicious contract designed to steal them. To build robust security habits, it is highly recommended to explore further education, such as the **Web3 Wallet Security** course available on Cyfrin Updraft, which teaches you how to decode transaction data and interact with smart contracts safely.