## Foundations: A Quick Recap for Understanding zkSync Transactions

Before we dive into the specifics of zkSync transaction types, it's essential to remember the foundational concepts that underpin all blockchain interactions. A solid grasp of cryptographic signatures—including standards like EIP-712 (Typed Structured Data Hashing and Signing) and EIP-191 (Signed Data Standard), the Elliptic Curve Digital Signature Algorithm (ECDSA) itself, and even data structures like Merkle Trees (crucial for rollup technologies)—is paramount. These elements are the building blocks that enable secure and verifiable operations in decentralized systems, and they directly inform our understanding of how transactions are constructed, authorized, and processed, especially in advanced Layer 2 solutions like zkSync.

## Unveiling TxType 113: A zkSync-Specific Transaction Signature

In our previous explorations, particularly when deploying smart contracts to the zkSync network, you might have encountered a peculiar detail: a transaction type designated as `113`. This typically appears during the deployment process using tools like the Remix IDE with the zkSync plugin.

When you initiate a contract deployment to a zkSync network (for instance, the Sepolia testnet), instead of the familiar MetaMask transaction confirmation pop-up common for Ethereum Layer 1 interactions, you're presented with a "Signature request." This request meticulously details the transaction parameters, and prominently features a field: `TxType: 113`. This is a clear indicator that we're not dealing with a standard Ethereum L1 transaction submission. Instead, we are being asked to sign a structured message, a process that feels very similar to an EIP-712 signature request due to its human-readable format. This lesson aims to shed light on this specific transaction type and its significance within the zkSync ecosystem.

## Practical Walkthrough: Deploying `SimpleStorage.sol` to zkSync

To illustrate the appearance of `TxType: 113`, let's consider the deployment of a common example smart contract, `SimpleStorage.sol`. This contract, often part of introductory Solidity courses, serves as a perfect vehicle for observing zkSync's unique deployment mechanism.

Here's the `SimpleStorage.sol` contract code:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SimpleStorage {
    uint256 public myFavoriteNumber;

    struct Person {
        uint256 favoriteNumber;
        string name;
    }

    Person[] public listOfPeople;

    mapping(string => uint256) public nameToFavoriteNumber;

    function store(uint256 _favoriteNumber) public {
        myFavoriteNumber = _favoriteNumber;
    }

    function retrieve() public view returns (uint256) {
        return myFavoriteNumber;
    }

    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        listOfPeople.push(Person(_favoriteNumber, _name));
        nameToFavoriteNumber[_name] = _favoriteNumber;
    }
}
```

The deployment process to zkSync using the Remix IDE and its zkSync plugin typically involves these steps:

1.  **Compilation:** The contract is compiled, implicitly using `zksolc`, the zkSync Solidity compiler. The Remix zkSync plugin might request "WRITEFILE" permission for the File Manager to store compilation artifacts.
2.  **Environment Setup:** In Remix's "Deploy & Run Transactions" tab, the environment is set to "Wallet" (or a similar zkSync-enabled provider) to connect with your MetaMask wallet, which should be configured for the target zkSync network.
3.  **Deployment Initiation:** Clicking the "Deploy" button triggers the interaction.
4.  **MetaMask Signature Request:** This is where `TxType: 113` makes its appearance. MetaMask displays a "Signature request" dialog. This dialog doesn't ask you to *send* a transaction in the traditional sense but to *sign* a structured piece of data. The data presented is human-readable, which is a hallmark of EIP-712, allowing you to clearly see what you are authorizing.

The fields shown in this MetaMask signature request will include:

*   `TxType: 113`
*   `From: <your_wallet_address>`
*   `To: <a_zkSync_system_address_for_contract_deployment>` (e.g., `0x0000000000000000000000000000000000008006` or a numeric identifier like `32774` as seen in some interfaces)
*   `GasLimit: <estimated_gas_for_the_operation>`
*   `GasPerPubdataByteLimit: <value>` (A zkSync-specific field related to the cost of publishing data to L1)
*   `MaxFeePerGas: <value>`
*   `MaxPriorityFeePerGas: <value>`
*   `Paymaster: 0` (Indicates no paymaster is being used for this transaction; `0` or `0x00...00` represents the default, meaning you pay the fees)
*   `Nonce: <your_account_nonce_on_zkSync>`
*   `Value: 0` (Typically `0` for contract deployments, unless the constructor is payable and receives funds)
*   `Data: <hex_string_representing_the_contract_bytecode_and_constructor_arguments>`
*   `FactoryDeps: [<bytecode_of_the_contract_being_deployed_and_any_dependencies>]` (A zkSync-specific field for declaring contract dependencies)
*   `PaymasterInput: 0x` (Data for the paymaster, if one were used; `0x` indicates empty input)

Upon signing this request, the Remix IDE's terminal will display a JSON object representing the transaction submitted to the zkSync network. This JSON object also explicitly includes `"type": 113`, confirming the transaction type processed by zkSync.

A conceptual structure of this JSON output would look like:

```json
{
  "type": 113,
  "nonce": 1, // Example nonce
  "maxPriorityFeePerGas": { "type": "BigNumber", "hex": "0x017d7840" },
  "maxFeePerGas": { "type": "BigNumber", "hex": "0x017d7840" },
  "gasLimit": { "type": "BigNumber", "hex": "0x05393e" },
  "to": "0x0000000000000000000000000000000000008006", // Example zkSync system address for deployments
  "value": { "type": "BigNumber", "hex": "0x00" },
  "data": "0x...", // Contract bytecode and constructor arguments
  "from": "0xYourWalletAddress...",
  "customData": {
    "gasPerPubdata": { "type": "BigNumber", "hex": "0x0c350" }, // Example value
    "factoryDeps": [ "0xContractBytecode..." ], // Bytecode of the contract being deployed
    "paymasterParams": null // Or details if a paymaster was used
  },
  "hash": "0xTransactionHash...",
  "confirmations": 0
  // ... other fields may be present
}
```

This entire workflow, from the signature request to the terminal output, highlights that deploying to zkSync involves a distinct mechanism characterized by this specific transaction type.

## Why `TxType: 113`? Connecting the Dots with EIP-712 and zkSync Architecture

The appearance of `TxType: 113` is not arbitrary; it's a deliberate design choice within the zkSync protocol. Ethereum itself has evolved its transaction types over time (e.g., legacy transactions, EIP-2930 access list transactions, EIP-1559 fee market transactions). As a Layer 2 scaling solution, zkSync introduces its own transaction types to support its unique features and optimize for its architecture, including native account abstraction.

The `TxType: 113` is one such zkSync-specific transaction type. Its structured, human-readable presentation in MetaMask strongly suggests it's designed to be compatible with or inspired by EIP-712 (Typed Structured Data Hashing and Signing). EIP-712 enhances security and user experience by displaying exactly what a user is signing in a comprehensible format, rather than an opaque hexadecimal string. This is particularly important for complex L2 transactions.

A key distinction to understand here is the difference between "signing a message" and "sending a transaction." On Ethereum L1, when an Externally Owned Account (EOA) initiates an action, signing and sending are often part of a single step. However, in systems like zkSync, especially those with native Account Abstraction (AA), the process can be decoupled. You first *sign* a structured message (like our `TxType: 113` interaction). This signature then acts as an authorization for a separate entity—such as a zkSync operator or sequencer—to process this intent, potentially batch it with others, and include it in a block on the zkSync network. This model offers greater flexibility, enabling features like paying gas fees in tokens other than ETH (via paymasters) or implementing more complex signature verification schemes, all hallmarks of account abstraction.

Therefore, `TxType: 113` likely represents a transaction that leverages this EIP-712 style signing for enhanced clarity and is tailored for zkSync's specific operational needs, including its native account abstraction capabilities.

## Key Concepts Revisited and Their Role in zkSync Transactions

Let's briefly revisit the important concepts and see how they interrelate in the context of `TxType: 113` and zkSync:

*   **Transaction Types:** The core subject. Just as Ethereum has various transaction types, zkSync implements its own (like `type 113`) to enable specific functionalities like native account abstraction and optimized L2 operations.
*   **zkSync Deployment:** The process of deploying smart contracts to zkSync, as we've seen, can differ from L1. It often involves signing a structured message that authorizes the deployment rather than an EOA sending a traditional transaction.
*   **`TxType: 113`:** This is a specific identifier for a zkSync transaction format. It signifies a transaction that is likely EIP-712 compliant in its signing process, designed for interactions within the zkSync ecosystem, such as contract deployments.
*   **EIP-712 (Typed Structured Data Hashing and Signing):** This Ethereum Improvement Proposal provides a standard for hashing and signing typed structured data. Its application in zkSync's `TxType: 113` makes transactions more transparent and secure for users by clearly outlining what is being approved.
*   **Signature vs. Transaction:** In advanced systems like zkSync, merely signing a message (a "UserOperation" in ERC-4337 terms, or a zkSync EIP-712 transaction) can be the first step. This signature authorizes a bundler or zkSync's sequencer to then package this intent into an actual on-chain L2 transaction.
*   **Account Abstraction (Implied):** zkSync's native account abstraction capabilities are facilitated by flexible transaction types like `113`. This allows any account (not just EOAs) to initiate transactions and define custom validation logic, opening doors for features like social recovery and gas sponsorship.

## What's Next: Exploring the Landscape of Transaction Types

Observing and understanding `TxType: 113` during a zkSync contract deployment serves as a practical entry point into a broader topic: the diverse world of transaction types on both Ethereum and Layer 2 solutions like zkSync. Why do these different types exist? What specific problems do they solve, and what capabilities do they unlock?

The appearance of `TxType: 113` is our cue to delve deeper. Future lessons will explore the evolution of Ethereum transaction types and further detail the various transaction types utilized by zkSync, clarifying the purpose and mechanics behind each. Understanding these nuances is crucial for any developer building on or interacting with these advanced blockchain ecosystems.