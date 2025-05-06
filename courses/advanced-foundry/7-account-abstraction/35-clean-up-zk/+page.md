## Deploying and Using a zkSync Account Abstraction Wallet

This lesson demonstrates how to deploy a minimal Account Abstraction (AA) smart contract wallet to the zkSync Era Sepolia Testnet and subsequently initiate a transaction *from* that smart contract wallet. We'll leverage zkSync's native Account Abstraction capabilities, which uniquely allow smart contracts to be the originator (`From` address) of transactions at the protocol level.

Due to certain limitations with Foundry scripting support for zkSync at the time of writing, we will utilize JavaScript/TypeScript scripts, likely run via Hardhat, for deployment and interaction. While we won't delve into the specifics of setting up a Hardhat environment (as it might not be covered in prerequisite materials), we will focus on the outcomes: deploying the AA contract and sending a transaction initiated by it.

### Preparing the Smart Contract: Essential Fixes

Before deploying our `ZkMinimalAccount.sol` contract, we need to address two crucial points in the Solidity code for correctness and security. These adjustments ensure our smart contract wallet functions as intended on zkSync.

**1. Correcting Transaction Hash Signing**

The initial code incorrectly applied an extra hashing step using `MessageHashUtils.toEthSignedMessageHash()` to a transaction hash that was already correctly formatted according to the EIP-712 standard used by zkSync. The `_transaction.encodeHash()` function (which internally uses `MemoryTransactionHelper.encodeHash`) provides the appropriate EIP-712 compliant hash digest needed for signature verification.

*   **Issue:** Double-hashing the transaction digest before signature recovery.
*   **Location:** Primarily within the `_validateTransaction` function in `ZkMinimalAccount.sol` and potentially in related test helper functions (like `_signTransaction` in `ZkMinimalAccountTest.sol`).
*   **Fix:** Remove the call to `MessageHashUtils.toEthSignedMessageHash()`. Use the raw hash obtained from `_transaction.encodeHash()` directly with `ECDSA.recover`.

**Corrected Logic in `_validateTransaction`:**

```solidity
// Get the EIP-712 compliant hash directly
bytes32 txHash = _transaction.encodeHash();
// Use this hash directly for signature recovery
address signer = ECDSA.recover(txHash, _transaction.signature);
// ... rest of the validation logic
```

This ensures we are verifying the signature against the correct data digest as expected by zkSync's AA implementation.

**2. Adding Essential Validation Check (Security)**

The `executeTransactionFromOutside` function is designed to receive signed transaction requests and execute them. It calls `_validateTransaction` internally, but the initial version neglected to check the return value of this critical function. The `_validateTransaction` function on zkSync is expected to return a specific `bytes4 magic` value (`ACCOUNT_VALIDATION_SUCCESS_MAGIC`) upon successful validation. Failing to check this return value represents a significant security vulnerability, potentially allowing invalid or unauthorized transactions to be executed.

*   **Issue:** The return value of `_validateTransaction` was ignored in `executeTransactionFromOutside`.
*   **Location:** The `executeTransactionFromOutside` function in `ZkMinimalAccount.sol`.
*   **Fix:** Capture the `bytes4 magic` return value from `_validateTransaction` and explicitly check if it equals `ACCOUNT_VALIDATION_SUCCESS_MAGIC`. If it does not match, revert the transaction, preferably with a descriptive custom error.

**Code Addition in `executeTransactionFromOutside`:**

```solidity
function executeTransactionFromOutside(Transaction memory _transaction) external payable {
    // Capture the return value from the validation function
    bytes4 magic = _validateTransaction(_transaction);

    // Check if the validation was successful
    if (magic != ACCOUNT_VALIDATION_SUCCESS_MAGIC) {
        // Revert if the signature or validation logic failed
        revert ZkMinimalAccount__InvalidSignature();
    }

    // Proceed with execution only if validation passed
    _executeTransaction(_transaction);
}
```

This check ensures that only transactions successfully validated by the contract's logic (e.g., having a valid signature from the owner) can be executed.

### Deploying the Account Abstraction Wallet

With the contract code corrected, we proceed to deployment using a pre-configured script.

1.  **Run Deployment Script:** Execute the deployment script (e.g., via `yarn deploy` which might run `ts-node javascript-scripts/DeployZkMinimal.ts`). This script interacts with your wallet (holding testnet funds) and deploys the `ZkMinimalAccount` contract to the zkSync Era Sepolia Testnet.
2.  **Capture Address:** The script output will include the address of the newly deployed smart contract wallet (e.g., `0x19a5...B358`) and the deployment transaction hash. Copy this contract address.
3.  **Verify on Explorer:** Navigate to the zkSync Era Sepolia Testnet Block Explorer (`sepolia.explorer.zksync.io`) and paste the copied address into the search bar. Confirm that the contract deployment transaction is visible and the contract exists on-chain.
    *   **Note:** At times, verifying the source code of contracts that interact deeply with zkSync's system contracts on block explorers might face limitations. This doesn't affect the contract's functionality.

### Funding the Smart Contract Wallet

Our deployed `ZkMinimalAccount` is a smart contract, but for it to initiate transactions *itself* (the core of AA), it needs its own funds to pay for gas.

1.  **Send Funds:** Use a standard wallet (like MetaMask, configured for zkSync Sepolia) to send a small amount of testnet ETH (e.g., 0.001 ETH) directly to the deployed smart contract wallet's address (`0x19a5...B358`).

The smart contract wallet now has its own balance to cover gas fees for future transactions it originates.

### Initiating a Transaction from the Smart Contract Wallet

Now for the key demonstration: making the smart contract wallet send a transaction. We'll use another script (`SendAATx.ts`) for this.

1.  **Configure Script:** Update the interaction script (`SendAATx.ts`) with the address of the deployed `ZkMinimalAccount` contract (`0x19a5...B358`).
2.  **Run Interaction Script:** Execute the script (e.g., via `yarn sendTx` which might run `ts-node javascript-scripts/SendAATx.ts`).
    *   **Behind the Scenes:** This script typically performs these actions:
        *   Connects to the zkSync Sepolia Testnet.
        *   Constructs the details of the transaction the smart contract wallet should execute (e.g., an `approve` call on a mock USDC token contract).
        *   Uses the *owner's* private key (the key associated with the account that deployed and owns the AA wallet) to sign the EIP-712 hash of this transaction data.
        *   Calls the `executeTransactionFromOutside` function on the deployed `ZkMinimalAccount` contract, passing the transaction details and the owner's signature.
        *   The `ZkMinimalAccount` contract receives this call. Its `_validateTransaction` function verifies the owner's signature against the provided transaction data. If valid, it proceeds to execute the actual transaction (the `approve` call) via `_executeTransaction`.
3.  **Observe Output:** The script should execute successfully, logging information like the transaction hash (e.g., `0x8c2c...cda`) and potentially the contract's nonce changing (e.g., from 0 to 1), indicating a successful transaction execution initiated by the contract.
4.  **Verify AA Transaction on Explorer:**
    *   Go back to the zkSync Era Sepolia Testnet Block Explorer and view the page for your deployed smart contract wallet (`0x19a5...B358`).
    *   Refresh the transaction list. You should see the new transaction hash (`0x8c2c...cda`).
    *   Click on this transaction hash to view its details.
    *   **Crucial Observation:** Examine the `From` field for this transaction. You will see it is the address of your **smart contract wallet** (`0x19a5...B358`), not the owner's EOA address. The `To` field will show the target contract (e.g., the mock USDC contract `0x5249F...6620` that received the `approve` call).

This confirms that we have successfully used zkSync's native Account Abstraction. Our deployed smart contract wallet acted as the transaction initiator, validated the request using its internal logic, executed the desired action (an `approve` call), and paid the gas fees from its own ETH balance. This fundamentally differs from standard EVM behavior where the `From` address is always an Externally Owned Account (EOA).