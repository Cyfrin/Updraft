## A Step-by-Step Guide to Sending Your First Public Testnet Transaction

This lesson will guide you through the fundamental process of interacting with a public blockchain. You will learn how to acquire free test currency from a public faucet, use it to send a transaction between two wallets, and verify your activity on a public block explorer. We will use the Sepolia testnet, the MetaMask wallet, and the Etherscan block explorer.

### Step 1: Acquiring Testnet ETH from a Faucet

Before you can send a transaction, you need currency to pay for it. On a testnet, this currency has no real-world value and can be obtained for free from a service called a **faucet**. A faucet is a developer tool that distributes small amounts of testnet tokens to users for testing purposes.

1.  **Locate a Faucet**: A reliable, curated list of testnet faucets can be found in the `README.md` file of the Cyfrin `blockchain-basics-cu` GitHub repository. We will use the **"Main (Sepolia): Sepolia GCP Faucet"** provided by Google Cloud for this demonstration.
2.  **Request Funds**: Navigate to the faucet's webpage. You will need to provide your wallet address to receive the funds.
    *   Open your MetaMask browser extension and ensure you have "Account 1" selected.
    *   Click on your address (e.g., `0x7c7T2...8987F`) to copy it to your clipboard.
    *   Paste this address into the input field on the faucet website.
    *   Click the button to receive your testnet ETH, which in this case is **"Receive 0.05 Sepolia ETH"**.
3.  **Faucet Requirements**: Please note that this specific Google Cloud faucet requires you to be logged into a Google account. If you prefer not to, the GitHub repository lists several other faucets with different requirements.
4.  **Confirm Receipt**: After the faucet processes your request, you will see a confirmation message like "Drip complete." To see the funds in your wallet, return to MetaMask, click the network dropdown (which may default to "Ethereum Mainnet"), and switch to the **"Sepolia"** network. Your balance for Account 1 should now reflect the **0.05 SepoliaETH** you just received.

### Step 2: Verifying the Faucet Transaction on Etherscan

Every transaction on a public blockchain is recorded on an immutable, public ledger. We can view this ledger using a **block explorer**, which is a web application that allows anyone to search and view all blockchain data, including transactions, addresses, and blocks. For Ethereum and its testnets, the most popular block explorer is Etherscan.

1.  **Navigate to Etherscan**: Go to the Etherscan website specifically for the Sepolia testnet: `sepolia.etherscan.io`.
2.  **Search Your Address**: Copy your "Account 1" wallet address from MetaMask again. Paste this address into the main search bar on the Etherscan homepage and press Enter.
3.  **Analyze the Transaction**: Etherscan will display a page with all the details for your address.
    *   The "Overview" section will confirm your balance of 0.05 ETH.
    *   Under the "Transactions" tab, you will see an entry for the funds you just received. It will show a value of `0.05 ETH` being transferred **from** the faucet's address **to** your address.
    *   Every transaction is identified by a unique **Transaction Hash (TxHash)**. Clicking on this hash will take you to a detailed view of that specific transaction, showing its status, the block number it was included in, the exact timestamp, and the transaction fee paid.

### Step 3: Sending Your Own Transaction

Now that you have testnet ETH, you can perform your own transaction. We will send a portion of these funds from your "Account 1" to your "Account 2".

1.  **Prepare the Transaction**:
    *   In MetaMask, switch to "Account 2". Copy its address (e.g., `0x51d83...AB81D`).
    *   Switch back to "Account 1", which holds the funds.
2.  **Execute the Transaction**:
    *   From Account 1, click the **"Send"** button.
    *   In the recipient field, paste the address for "Account 2".
    *   In the amount field, enter `0.01`. It is crucial to send an amount less than your total balance. Every transaction on the network requires a **transaction fee**, also known as a gas fee, which you must have enough ETH left over to cover.
    *   Click through the next steps in MetaMask, carefully reviewing the details: the sender, the recipient, the amount, and the estimated network fee.
    *   Click **"Confirm"** to broadcast your transaction to the network.
3.  **Confirm the Result**: In the "Activity" tab of MetaMask, the transaction will briefly show as "Pending" before changing to "Confirmed".
    *   The balance of "Account 1" will decrease, now showing approximately **0.04 SepoliaETH**.
    *   Switch to "Account 2" in MetaMask. You will see its balance is now **0.01 SepoliaETH**, confirming the transfer was successful.

### Step 4: Final Verification on the Block Explorer

Finally, let's verify our own transaction on the public ledger, just as we did with the faucet transaction.

1.  **Return to Etherscan**: Go back to the Etherscan page for "Account 1" and refresh it.
2.  **Review the New Transaction**: You will now see two transactions listed. The most recent one will show a transfer of 0.01 ETH. Notice the transaction is marked with an **"OUT"** label, clearly signifying that funds were sent *from* this address.
3.  **Explore the Details**: As before, you can click on the new transaction's unique hash to explore all of its specific details, from the exact gas fee paid to the block it was included in. This confirms your transaction is now a permanent part of the Sepolia testnet's history.