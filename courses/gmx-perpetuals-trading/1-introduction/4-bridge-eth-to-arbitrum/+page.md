## How to Bridge ETH from Ethereum to Arbitrum One

To interact with decentralized applications (dApps) deployed on Layer 2 networks like Arbitrum One, such as the GMX V2 trading platform, you need the network's native token to pay for transaction fees (gas). On Arbitrum One, this native token is Ether (ETH). If your ETH is currently on the Ethereum mainnet (Layer 1), you'll need to move it to Arbitrum One. This process is called bridging.

This lesson demonstrates how to use the official Arbitrum Bridge at `bridge.arbitrum.io` to transfer ETH from the Ethereum mainnet to the Arbitrum One network.

**Step 1: Navigate to the Arbitrum Bridge and Check Balances**

First, open your web browser and go to the official Arbitrum Bridge interface: `bridge.arbitrum.io`. Ensure your web3 wallet (e.g., MetaMask) is connected and set to the Ethereum Mainnet.

Upon loading, the bridge interface will display your current ETH balances on both networks. For example, you might see:
*   **Ethereum Mainnet Balance:** ~0.02271 ETH
*   **Arbitrum One Balance:** ~0.02114 ETH

**Step 2: Configure the Bridge Transaction**

The bridge interface is typically pre-configured for bridging ETH from Ethereum to Arbitrum One. Verify the following settings:
*   **From:** Ethereum (should be selected)
*   **To:** Arbitrum One (should be selected)
*   **Asset:** ETH (should be selected)

In the amount field, enter the quantity of ETH you wish to bridge. For this example, we will bridge **0.01 ETH**.

**Step 3: Initiate the Bridging Process**

Scroll down to review the transaction summary. It will confirm that you are sending 0.01 ETH from Ethereum and will receive 0.01 ETH on Arbitrum One. It will also display an estimated gas fee required on the Ethereum network to initiate the transaction (e.g., approximately 0.00004 ETH or $0.07 at the time of the example).

Click the button labeled "**Move funds to Arbitrum One**".

**Step 4: Confirm Transaction in Your Wallet**

Your connected web3 wallet (MetaMask) will prompt you to confirm the transaction. Review the details, including the gas fee, and click "**Confirm**". This authorizes the bridge contract to move your specified ETH amount.

**Step 5: Monitor Transaction Progress**

After confirming in your wallet, the Arbitrum Bridge interface will automatically redirect you to the "**Txn History**" tab. Your transaction will appear under "Pending transactions".

You will see details such as:
*   **Time:** A few seconds/minutes ago
*   **Token:** 0.01 ETH
*   **From:** Ethereum
*   **To:** Arbitrum One
*   **Status:** "Pending"

The interface will also provide an estimated time remaining until the funds arrive on Arbitrum One. This waiting period is necessary for the transaction to be processed and confirmed. In the example, the initial estimate was around 14 minutes, later updated to **~13 minutes**. You must wait for this process to complete.

**Step 6: Verify Transaction Completion and Balances**

Once the bridging process is finished, the transaction will move from the "Pending transactions" section to the "**Settled transactions**" section within the "Txn History" tab. The status will update to "**Success**", and a timestamp indicating when it was settled will appear (e.g., "27 minutes ago").

To confirm the balance update, navigate back to the main "**Bridge**" tab. The interface should now reflect the changes:
*   **Ethereum Mainnet Balance:** Approximately **0.01263 ETH** (Original balance minus the 0.01 ETH bridged and the L1 gas fee).
*   **Arbitrum One Balance:** Approximately **0.03114 ETH** (Original balance plus the 0.01 ETH received).

This confirms that your 0.01 ETH has been successfully bridged from the Ethereum mainnet and is now available in your wallet on the Arbitrum One network, ready to be used for gas fees or other interactions within the Arbitrum ecosystem.