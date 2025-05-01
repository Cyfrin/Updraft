## Understanding zkSync Transaction Types: The Type 113 Signature Request

This lesson introduces the concept that not all interactions with a blockchain are the same type of transaction. We'll explore a specific example encountered when deploying smart contracts to zkSync, highlighting how understanding foundational concepts like digital signatures is crucial.

Before diving in, it's important to have a grasp of several key concepts, which likely have been covered previously:

*   **Digital Signatures:** The fundamental cryptographic method used to prove ownership and authorize actions on a blockchain.
*   **ECDSA (Elliptic Curve Digital Signature Algorithm):** The specific algorithm used by Ethereum and zkSync for generating and verifying signatures with private/public key pairs.
*   **EIP-191:** A standard defining how to format messages before signing to prevent them from being misinterpreted as actual transactions.
*   **EIP-712:** A standard for signing *typed structured data*. This makes signature requests more transparent and human-readable in wallets by presenting data in a clear, labeled format instead of opaque hexadecimal strings.
*   **Merkle Trees:** Data structures vital for efficiently verifying data integrity, often used in the underlying mechanisms of systems like zkSync.

Understanding these, especially EIP-712 and the general principle of signing messages, is essential for comprehending the transaction type we will examine.

### Observing a Unique Transaction Type on zkSync

Let's walk through deploying a simple smart contract to zkSync using a common development tool, the Remix IDE, to see this concept in action.

1.  **Setup:** We begin in Remix IDE with the zkSync plugin enabled. We'll use a standard `SimpleStorage.sol` contract.
2.  **Compilation:** Using the zkSync plugin, we compile the contract. It's important to note that the plugin utilizes its specific compiler, `zksolc`, not the standard Ethereum `solc`.
3.  **Deployment Configuration:** In the plugin's "Deploy" tab, we set the environment to "Wallet," connecting Remix to a browser wallet like MetaMask, which is configured for the appropriate zkSync network.
4.  **Initiating Deployment:** We click the "Deploy" button for our compiled `SimpleStorage` contract.

At this point, we might expect MetaMask to pop up with a standard transaction confirmation screen, asking us to approve gas fees and send the transaction. However, something different happens.

### The "Signature Request" - Type 113

Instead of a transaction confirmation, MetaMask presents a "Signature request." This request explicitly asks the user to "Sign this message." Crucially, within the details of the message presented for signing, we can observe a field: `TxType: 113`.

This indicates we are dealing with a specific transaction type designated as 113 within the zkSync ecosystem (or at least for this interaction method). The data presented in the signature request is not an opaque blob but is structured clearly, resembling the user-friendly format defined by EIP-712:

*   `From:` Your wallet address.
*   `To:` An address relevant to the deployment process.
*   `GasLimit:` The gas limit for the operation.
*   `GasPerPubdataByteLimit:` A parameter specific to zkSync's handling of public data costs.
*   `MaxFeePerGas:` Maximum fee per gas unit.
*   `MaxPriorityFeePerGas:` The priority fee (tip).
*   `Paymaster:` Address of a paymaster if used (0 in this case).
*   `Nonce:` The transaction nonce from your account.
*   `Value:` ETH value being sent (0 for contract deployment).
*   `Data:` The contract creation bytecode combined with constructor arguments.
*   `FactoryDeps:` Any contract bytecodes the deployment depends on (including the contract itself).
*   `PaymasterInput:` Input data for the paymaster (empty `0x` here).

By clicking "Sign" in MetaMask, you are not broadcasting a transaction in the traditional sense directly from your wallet. Instead, you are cryptographically signing this structured data payload representing the deployment request. This signature, along with the data, is then used (likely relayed by the Remix plugin infrastructure) to execute the deployment on zkSync. The Remix terminal typically confirms this by logging the signed transaction object, again showing `"type": 113`.

### Setting the Stage

We've observed a contract deployment on zkSync that resulted in signing a Type 113 message instead of confirming a standard transaction. How is it possible to deploy a contract by merely signing a message? Why does zkSync use this specific transaction type (113) in this scenario?

Answering these questions requires a deeper exploration of the different transaction types available on Ethereum and how Layer 2 solutions like zkSync extend or modify them to achieve their goals of scalability and efficiency. This Type 113 transaction is a specific mechanism implemented by zkSync, and understanding its structure and purpose requires examining the broader context of Ethereum and zkSync transaction formats, which will be covered next.