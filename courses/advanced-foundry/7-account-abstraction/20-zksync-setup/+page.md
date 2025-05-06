## Understanding Minimal Account Abstraction Implementations

Welcome to this code overview where we'll explore minimal implementations of Account Abstraction (AA). Our goal is to walk through the process of building these foundational smart contract accounts, setting the stage for more complex functionalities.

## Ethereum vs. zkSync: Two Paths to Account Abstraction

This project demonstrates two distinct approaches to building Account Abstraction accounts:

1.  **Ethereum (ERC-4337 Style):** This implementation follows the principles outlined in ERC-4337, making it suitable for Ethereum and other EVM-compatible chains adopting this standard.
2.  **zkSync Native:** This implementation leverages zkSync's built-in, protocol-level Account Abstraction features.

We examine both because their underlying mechanisms and transaction flows differ significantly. Understanding these differences is crucial for developers working across various EVM environments.

## The Ethereum ERC-4337 Approach

When a user initiates a transaction using an ERC-4337 style account, the process deviates from standard Ethereum transactions.

1.  **UserOperation and the Alt-Mempool:** Instead of sending a traditional transaction to the main mempool, the user signs a data package called a `UserOperation` (UserOp). This UserOp is sent to a separate, alternative mempool (alt-mempool).
2.  **Bundlers:** Specialized nodes, known as "Bundlers," monitor the alt-mempool. They collect multiple UserOps, bundle them together, and submit them as a single, standard Ethereum transaction to a global singleton contract called the `EntryPoint.sol`.
3.  **EntryPoint Execution:** The `EntryPoint` contract acts as the central orchestrator. It verifies the bundled UserOps (including signatures and gas payments) and then makes calls to the respective target smart contract accounts (like your `MinimalAccount.sol`) to execute the actions defined within each UserOp. The smart contract account then interacts with the target Dapp or performs the desired on-chain operation. Optional components like Paymasters (for gas sponsorship) and Signature Aggregators can integrate with this flow via the EntryPoint.

## zkSync's Native Account Abstraction

zkSync implements Account Abstraction directly at the protocol layer, leading to a more streamlined flow compared to ERC-4337.

1.  **No Alt-Mempool or Bundlers:** Because AA is native, there's no requirement for a separate alt-mempool or the specific Bundler infrastructure seen in ERC-4337.
2.  **Special Transaction Type (TxType 113):** AA transactions on zkSync are submitted through the standard transaction pool but must be designated as a specific type: `EIP712_TX_TYPE` (represented numerically as `113` or `0x71` in hexadecimal).
3.  **Direct Protocol Handling:** The zkSync protocol itself recognizes these `TxType 113` transactions. It natively handles the validation (checking signatures, nonces, paying fees) and execution logic defined within the smart contract account. Crucially, the `from` address of such a transaction *is the address of the smart contract account itself*. The account directly initiates the on-chain interaction with the target Dapp (e.g., `Dapp.sol`). Optional Paymasters and Signature Aggregators interact directly with the account contract as part of its validation logic.

## Code Repository and Structure

You can find the complete code for these minimal implementations on GitHub:

`github.com/Cyfrin/minimal-account-abstraction`

The core smart contracts reside within the `src` directory, organized by chain type:

*   `src/ethereum/MinimalAccount.sol`: Contains the AA implementation for the Ethereum/ERC-4337 style.
*   `src/zkSync/ZkMinimalAccount.sol`: Contains the AA implementation leveraging zkSync's native features.

Both `MinimalAccount.sol` and `ZkMinimalAccount.sol` are intentionally kept **minimal**. They include only the essential functions required for Account Abstraction, such as validation and execution logic, deliberately omitting complex, application-specific features.

## Extensibility: Building on the Minimal Base

This minimalist design serves as a robust foundation. Developers can readily extend these base contracts to incorporate sophisticated features by adding custom logic within specific functions (primarily validation and execution). This allows for the implementation of:

*   **Paymasters:** Enabling gas sponsorship or payment in ERC-20 tokens.
*   **Signature Aggregators:** Facilitating multi-signature schemes.
*   **Spending Limits:** Enforcing rules on transaction values or frequencies.
*   **Session Keys:** Granting temporary, scoped permissions (e.g., linking to a Web2 login like Google for a limited time).
*   **Custom Multi-Sig:** Designing unique multi-signature rules beyond simple M-of-N schemes.

## Illustrating the Differences: Testnet Examples

The repository's README file includes links to live contract examples deployed on testnets, which clearly demonstrate the distinct behaviors.

**zkSync Example (Sepolia Testnet):**

*   **Contract:** `ZkMinimalAccount`
*   **Action:** An `approve` call on a USDC token contract.
*   **Key Observation:** Examining the transaction on a block explorer reveals that the **`from` address is the smart contract account's address** (e.g., `0xCB38...`). This directly showcases zkSync's native AA, where the smart contract account itself is the originator of the on-chain transaction.

**Ethereum Example (Arbitrum Sepolia Testnet):**

*   **Contract:** `MinimalAccount` (interacting via the EntryPoint)
*   **Action:** An `approve` call on a USDC token contract.
*   **Key Observation:** In this case, the **`from` address is an Externally Owned Account (EOA)** (e.g., `0x9EA9...`). This EOA belongs to the **Bundler** that submitted the UserOperation to the `EntryPoint` contract. The smart contract account's address does *not* appear as the transaction originator (`from` field) on the block explorer.
*   **Internal Execution:** While the Bundler initiates the transaction, the execution logic occurs *within* the context of the `EntryPoint` and the `MinimalAccount`. During the internal execution phase where the USDC `approve` happens, the effective `msg.sender` *is* the `MinimalAccount` smart contract address, ensuring the action is performed by the intended account.

Understanding this difference in the `from` address is fundamental to distinguishing between native AA (like zkSync's) and standard-based AA (like ERC-4337).

## Empowering Developers with Custom Logic

Grasping these AA patterns empowers developers to move beyond standard EOA limitations and craft highly customized user experiences and security models. You can build wallets with unique rules, such as:

*   Session keys that grant specific Dapps permission to act on your behalf for a limited duration.
*   Complex multi-signature wallets requiring approvals from multiple friends *plus* a hardware key or a specific passcode for high-value transactions.

## What's Next in This Tutorial

In the upcoming sections, we will dive deeper into the code:

1.  First, we will build the **Ethereum `MinimalAccount.sol`** contract, exploring the ERC-4337 interaction patterns.
2.  Second, we will build the **zkSync `ZkMinimalAccount.sol`** contract, highlighting its native AA features and how they differ from the ERC-4337 approach.

This sequence will solidify your understanding of both methods and showcase the unique capabilities offered by zkSync's native implementation.