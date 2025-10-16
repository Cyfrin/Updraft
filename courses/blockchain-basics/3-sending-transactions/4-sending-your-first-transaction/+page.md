## How to Send Your First Blockchain Transaction with a Tenderly Virtual Testnet

Welcome to your practical guide to interacting with a blockchain. In this lesson, you will learn how to set up your own private, simulated blockchain environment, connect it to your MetaMask wallet, and send your very first transaction. We will use a powerful tool called Tenderly to accomplish this, which allows us to experiment safely without spending any real money.

Before we begin the step-by-step process, let's clarify the environment we'll be working in: a testnet.

A testnet is a blockchain that functions as a sandboxed testing ground. It’s a critical tool for developers and learners, allowing you to simulate transactions, deploy smart contracts, and test blockchain features without any financial risk. There are two primary types of testnets:

1.  **Public Testnets (e.g., Sepolia):** These are decentralized blockchains that mimic a mainnet like Ethereum. They are kept running by a global network of volunteer node operators and are publicly accessible to anyone.
2.  **Virtual Testnets (e.g., Tenderly):** These are private, simulated blockchain environments provided as a service. Instead of relying on public volunteers, the service provider (Tenderly) manages the infrastructure. This gives you complete control and allows for incredibly fast setup, letting you create a personal copy, or "fork," of a blockchain in seconds.

For this lesson, we will focus on the speed and convenience of a Tenderly Virtual Testnet.

### Step 1: Create a Tenderly Account

First, you need to sign up for a free Tenderly account. We will start from the official course repository to ensure you are using the correct link.

1.  Navigate to the course's GitHub repository: [https://github.com/Cyfrin/blockchain-basics-cu](https://github.com/Cyfrin/blockchain-basics-cu)
2.  In the main `README.md` file, scroll down to the section titled **"Testnet Faucets"**.
3.  Locate the link next to **"Tenderly Virtual Signup"** and click it. Using this specific link, which contains tracking parameters (`...&mtm_kwd=cyfrin`), signals to Tenderly that you came from this course. This support helps us continue to provide free educational content.
4.  On the Tenderly website, click the **"Build for free"** button and follow the prompts to create your account.

### Step 2: Create Your Virtual TestNet

Once you are logged into your Tenderly dashboard, you can create your own personal blockchain.

1.  From the navigation menu on the left, select **"Virtual TestNets"**.
2.  Click the prominent **"Create Virtual TestNet"** button.
3.  A configuration screen will appear. Set the following options:
    *   **Parent network:** Select **Mainnet**. This instructs Tenderly to create a fork—a direct copy—of the current state of the Ethereum Mainnet.
    *   **Name:** Give your testnet a unique name. For example, `MyFirstChain`.
    *   **Chain ID:** This is a critical security step. Every blockchain network has a unique ID (Ethereum Mainnet is `1`). To prevent transaction conflicts and a security risk known as a "replay attack," you must set a custom ID. A good practice is to prefix the parent network's ID with `7357`. Since we are forking Mainnet (`1`), your custom Chain ID should be `73571`.
4.  Leave all other settings as their default values and click **"Create"**.

Congratulations! You have just created your own private, functioning blockchain.

### Step 3: Connect MetaMask to Your Virtual TestNet

Now, let's connect your new blockchain to a real crypto wallet so you can interact with it.

1.  On your new virtual testnet's dashboard page in Tenderly, look for a small wallet icon labeled **"Add RPC to Wallet"** in the top-right corner and click it.
2.  MetaMask will automatically open with two requests for your approval:
    *   First, it will ask for permission to let `tenderly.co` connect to your wallet. Click **"Connect"**.
    *   Second, it will ask for permission to add your new network (e.g., `MyFirstChain`) to your wallet's list of available networks. Click **"Approve"**.
3.  Your MetaMask wallet is now connected to your private virtual testnet. You can confirm this by looking at the network selector dropdown in the top-left of MetaMask, where your new network should be selected.

### Step 4: Fund Your Wallet with Test Ether

To send a transaction, you need some currency. On our virtual testnet, we can instantly mint test Ether (ETH) with no real-world value.

1.  Open MetaMask and ensure you are on your virtual testnet. Copy your wallet address (e.g., "Account 1") by clicking on it.
2.  Return to your testnet's dashboard in Tenderly and click the **"Fund"** button.
3.  In the pop-up window, fill in the details:
    *   **Wallet:** Paste your copied MetaMask address.
    *   **Token:** Select **Ether (ETH)** from the dropdown.
    *   **Amount:** Enter the amount of test ETH you'd like. For this exercise, enter `1000`.
4.  Click **"Top up account"**.

This funding action is technically your first transaction on this blockchain. Behind the scenes, Tenderly executed a function called `addBalance` to mint 1,000 test ETH and place it directly into your wallet. You can see this transaction appear in the list at the bottom of your Tenderly dashboard. To verify the funds in your wallet, open MetaMask and check your token balance; it should now read 1,000 ETH.

### Step 5: Send a Wallet-to-Wallet Transaction

You are now ready to perform the most fundamental action on a blockchain: sending currency from one wallet to another. We will simulate this by sending ETH from your primary account ("Account 1") to a secondary account in the same MetaMask wallet.

1.  **Get the Recipient Address:** In MetaMask, click the account icon in the top right (next to "Account 1") and select **"Account 2"**. Copy the address for Account 2 to your clipboard.
2.  **Switch Back to Sender:** Switch back to **Account 1**, which holds the 1,000 test ETH.
3.  **Initiate the Transfer:** Click the **"Send"** button in MetaMask.
4.  **Enter Transaction Details:**
    *   In the recipient field, paste the address for **Account 2**.
    *   In the **Amount** field, enter the amount you wish to send. Let's send `50` ETH.
5.  **Confirm the Transaction:** Click **"Continue"**. MetaMask will show you a final review screen detailing the amount and the network fee (gas). Click **"Confirm"** to broadcast the transaction to your virtual blockchain.

In a few moments, the transaction will be confirmed. You can verify the transfer was successful in two ways:

*   In **Account 1**, your ETH balance will now be 950, and the "Activity" tab will show a "Sent" transaction for -50 ETH.
*   Switch to **Account 2**. The token balance will now show **50 ETH**.

You have now successfully created a private blockchain, funded a wallet, and executed a genuine wallet-to-wallet transfer. This process covers the fundamental mechanics of using any blockchain, providing you with a safe and effective foundation for your Web3 journey.