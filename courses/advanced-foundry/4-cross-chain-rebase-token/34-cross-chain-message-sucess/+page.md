## Confirming Your Cross-Chain Token Transfer with CCIP

After initiating a token transfer using Chainlink's Cross-Chain Interoperability Protocol (CCIP), the next crucial step is verifying its successful completion. This involves checking the transaction status on the CCIP Explorer and confirming the token balance arrival in your wallet on the destination chain. This lesson walks through verifying a transfer of a custom "Rebase Token" (RBT) from the Ethereum Sepolia testnet to the ZkSync Sepolia testnet.

## Using the CCIP Explorer for Confirmation

The primary tool for monitoring CCIP transactions is the CCIP Explorer (`ccip.chain.link`). Once your source chain transaction is confirmed, you can usually find your CCIP transaction details here using the source transaction hash or the unique Message ID.

Key information to check on the CCIP Explorer page includes:

1.  **Status:** Look for a green checkmark and the word "Success". This indicates that CCIP has processed the message and executed the corresponding action on the destination chain.
2.  **Source Chain & Destination Chain:** Verify these match your intended transfer route (e.g., Ethereum Sepolia to ZkSync Sepolia).
3.  **Identifiers:** Note the Message ID, Source Transaction Hash, and Destination Transaction Hash. These are useful for debugging or cross-referencing with block explorers.
4.  **Tokens and Amounts:** Confirm the correct token (e.g., RBT) and the precise amount transferred are displayed.
5.  **Fees:** Observe the amount of LINK paid for the CCIP transaction execution and network fees.
6.  **Addresses:** Check the Origin (initiator), From (sender on source), and To (recipient on destination) addresses. Often, for simple transfers, these might be the same user address.
7.  **Sender Nonce:** This number indicates the sequence of CCIP messages sent from the origin address on the source chain. It helps ensure message ordering.
8.  **Gas Limit:** This refers to the gas allocated for *execution on the destination chain*. A value of `0` typically means the transfer was configured only to move tokens, without triggering additional custom logic (like a `ccipReceive` function) in the destination contract. If extra computation was requested, a non-zero gas limit would have been specified initially.
9.  **Sequence Number:** An internal CCIP sequence number for the lane.

Seeing the "Success" status on the CCIP Explorer is the first strong indication that your cross-chain transfer has completed as intended by the protocol.

## Locating the Destination Token Contract Address

To verify the token arrival in your wallet (like MetaMask), you need the contract address of the token *on the destination chain*. This address is different from the token's address on the source chain.

How you find this address depends on how the token was deployed and enabled for CCIP:

*   **Deployment Logs:** If you deployed the token contract yourself, the address is often printed in the terminal output of your deployment script (as shown in the video example, where the ZkSync RBT address `0x249...532d` was found in VS Code terminal history).
*   **User Interface:** If using a dApp or platform that facilitates CCIP transfers, the destination token address might be displayed in the UI.
*   **Documentation:** For widely used tokens, the official documentation or the CCIP Directory might list the addresses on supported chains.

Ensure you copy the correct address for the token on the specific destination network (e.g., ZkSync Sepolia).

## Verifying Token Arrival in Your Wallet (MetaMask)

With the destination token contract address copied, you can add the token to your wallet to see the balance:

1.  **Open Wallet:** Access your browser extension wallet (e.g., MetaMask).
2.  **Switch Network:** Ensure your wallet is connected to the correct *destination network* (e.g., "ZkSync Sepolia Testnet").
3.  **Import Token:** Navigate to the asset or token list and find the "Import tokens" option.
4.  **Paste Address:** Paste the destination token contract address you located earlier into the "Token contract address" field.
5.  **Auto-Detection:** The wallet should automatically detect the Token Symbol (e.g., RBT) and Token Decimal places (e.g., 18).
6.  **Observe Balance:** **Critically**, even before finalizing the import, the wallet should display your current balance of that token. In the video example, the tiny balance `0.000000000000003956 RBT` was visible at this stage, confirming the tokens had arrived.
    *   *Note:* For extremely small balances, some wallets might display '0' in the main asset list due to rounding or display limits. However, the import screen or the token's specific details page usually shows the precise, non-zero balance. Transferring a very small amount is perfectly valid for testing on testnets.
7.  **Complete Import:** Proceed with the import prompts (e.g., "Next", "Import").

The token will now appear in your asset list on the destination network, with the transferred balance visible. This confirms the end-to-end success of the CCIP token transfer.

## Understanding Key CCIP Concepts in Verification

The verification process touches upon several core CCIP concepts:

*   **CCIP (Cross-Chain Interoperability Protocol):** The secure infrastructure enabling the message (and token) transfer.
*   **Cross-Chain Token Transfer:** The specific action of moving tokens between blockchains, often involving lock/burn mechanisms on the source and mint/release on the destination.
*   **CCIP Explorer:** The dedicated tool for observing the status and details of these cross-chain operations.
*   **Source & Destination Chains:** The specific blockchains involved in the transfer.
*   **Transaction Hashes (Source/Destination):** Links to the on-chain transactions that initiated and finalized the transfer steps on the respective blockchains.
*   **Message ID:** The unique identifier linking the source and destination parts of a single CCIP operation.
*   **LINK Fees:** The payment mechanism required to compensate CCIP service providers (DONs, RMN) and cover destination gas costs.
*   **Sender Nonce:** A per-sender, per-source-chain counter ensuring CCIP messages are processed in the order they were sent.
*   **Gas Limit (CCIP Context):** The maximum gas allocated for execution *on the destination chain*, specified during the initial CCIP call on the source chain. A value of `0` implies a simple token transfer with no extra receiver logic invoked.

## Essential CCIP Resources

Two key resources are vital when working with CCIP:

1.  **CCIP Explorer (`ccip.chain.link`):** Use this to monitor live transactions, check their status (Pending, Success, Failure), and view detailed information about the cross-chain message and execution.
2.  **CCIP Directory (`docs.chain.link/ccip/directory`):** Consult this documentation page *before* initiating transfers. It lists all networks supported by CCIP (mainnet and testnet), the specific tokens enabled for transfer on each network, and the available "lanes" (supported transfer routes between chains). This helps confirm if your desired token transfer between specific chains is currently supported.