Welcome to this comprehensive guide on Ethereum and zkSync transaction types. A clear understanding of these different formats is essential for any developer working in the Web3 space, whether you're deploying smart contracts, interacting with decentralized applications, or analyzing on-chain data. You may have already encountered these types when using development tools like Remix with zkSync, Foundry zkSync, or when inspecting transactions on block explorers. This lesson will break down each type, covering its origin, purpose, and key characteristics.

## Shared Transaction Types: Ethereum and zkSync

Ethereum and zkSync share several fundamental transaction types. These form the bedrock of how interactions are structured on both L1 and L2.

### Transaction Type 0 (Legacy Transactions / 0x0)

Type 0, also known as Legacy Transactions or identified by the prefix `0x0`, represents the original transaction format used on Ethereum. This was the standard before the formal introduction of distinct, typed transactions. It embodies the initial method for structuring and processing transactions on the network.

A practical example for developers using Foundry zkSync is the explicit specification of this transaction type during smart contract deployment. By including the `--legacy` flag in your deployment command, you instruct the tool to use this original format. For instance:
`forge create src/MyContract.sol:MyContract --rpc-url http://localhost:8545 --private-key $(DEFAULT_ANVIL_KEY) --broadcast --legacy --zksync`
The `--legacy` flag highlighted here directly indicates the use of a Type 0 transaction.

### Transaction Type 1 (Optional Access Lists / 0x01 / EIP-2930)

Transaction Type 1, denoted as `0x01`, was introduced by EIP-2930, titled "Optional Access Lists." Its primary purpose was to mitigate potential contract breakage risks associated with EIP-2929, an earlier proposal that repriced certain storage-accessing opcodes (SLOAD and EXT\*).

Type 1 transactions maintain the same fields as legacy (Type 0) transactions but introduce a significant addition: an `accessList` parameter. This parameter is an array containing addresses and storage keys that the transaction plans to access during its execution. The main benefit of including an access list is the potential for gas savings on cross-contract calls. By pre-declaring the intended contracts and storage slots, users can offset some of the gas cost increases introduced by EIP-2929, leading to more efficient transactions.

### Transaction Type 2 (EIP-1559 Transactions / 0x02)

Transaction Type 2, or `0x02`, was introduced by EIP-1559 as part of Ethereum's "London" hard fork. This EIP was a major overhaul of Ethereum's fee market, aiming to tackle issues like high network fees, improve the user experience around gas payments, and reduce network congestion.

The key change introduced by EIP-1559 was the replacement of the simple `gasPrice` (used in Type 0 and Type 1 transactions) with two new components:
*   A `baseFee`: This fee is algorithmically determined per block based on network demand and is burned, reducing ETH supply.
*   A `maxPriorityFeePerGas`: This is an optional tip paid directly to the validator (formerly miner) to incentivize transaction inclusion.

Consequently, Type 2 transactions include new parameters:
*   `maxPriorityFeePerGas`: The maximum tip the sender is willing to pay per unit of gas.
*   `maxFeePerGas`: The absolute maximum total fee (baseFee + priorityFee) the sender is willing to pay per unit of gas.

Block explorers often display these as "Txn Type: 2 (EIP-1559)".

**zkSync Note:** While zkSync supports Type 2 transactions, its handling of the fee parameters differs from Ethereum L1. Currently, zkSync *does not* actively use the `maxPriorityFeePerGas` and `maxFeePerGas` parameters to prioritize or price transactions in the same way as Ethereum, due to its distinct gas mechanism and fee structure.

### Transaction Type 3 (Blob Transactions / 0x03 / EIP-4844 / Proto-Danksharding)

Transaction Type 3, also `0x03`, was introduced by EIP-4844, commonly known as "Proto-Danksharding," and implemented during Ethereum's "Dencun" hard fork. This EIP represents an initial, significant step towards scaling Ethereum, particularly for rollups like zkSync. It introduces a new, more cost-effective way for Layer 2 solutions to submit data to Layer 1 via "blobs."

Key features of Type 3 transactions include:
*   A separate fee market specifically for blob data, distinct from regular transaction gas fees.
*   Additional fields on top of those found in Type 2 transactions:
    *   `max_fee_per_blob_gas`: The maximum fee the sender is willing to pay per unit of gas for the blob data.
    *   `blob_versioned_hashes`: A list of versioned hashes corresponding to the data blobs carried by the transaction.

A crucial aspect of the blob fee mechanism is that this fee is deducted from the sender's account and burned *before* the transaction itself is executed. This means that if the transaction fails for any reason during execution, the blob fee is **non-refundable**. For a more in-depth exploration of EIP-4844, Proto-Danksharding, and the mechanics of blobs, a subsequent lesson from Patrick Collins will provide further details.

## zkSync-Specific Transaction Types

Beyond the shared types, zkSync introduces its own transaction types to enable unique functionalities and optimizations specific to its Layer 2 environment.

### Type 113 (EIP-712 Transactions / 0x71)

Type 113, or `0x71`, transactions on zkSync utilize the EIP-712 standard, "Ethereum typed structured data hashing and signing." EIP-712 standardizes the way structured data is hashed and signed, making messages more human-readable and verifiable within wallets like MetaMask.

On zkSync, Type 113 transactions are pivotal for accessing advanced, zkSync-specific features such as native Account Abstraction (AA) and Paymasters.
*   **Account Abstraction:** Allows accounts to have custom validation logic, effectively turning user accounts into smart contracts.
*   **Paymasters:** Smart contracts that can sponsor transaction fees for users, enabling gasless transactions or payment in custom tokens.

A critical requirement for developers is that smart contracts **must** be deployed on zkSync using a Type 113 (0x71) transaction. For example, when deploying a smart contract to zkSync via Remix, the signature request presented by your wallet (e.g., MetaMask) will typically indicate "TxType: 113".

In addition to standard Ethereum transaction fields, Type 113 transactions on zkSync include several custom fields:
*   `gasPerPubData`: The maximum gas the sender is willing to pay for each byte of "pubdata." Pubdata refers to L2 state data that needs to be published to L1 for data availability.
*   `customSignature`: This field is used when the transaction signer is not a standard Externally Owned Account (EOA), such as a smart contract wallet leveraging account abstraction. It allows for custom signature validation logic.
*   `paymasterParams`: Parameters for configuring a custom Paymaster smart contract, detailing how it will cover the transaction fees.
*   `factory_deps`: An array of bytecodes for contracts that the deployed contract might, in turn, deploy. This is crucial for deploying contracts that have dependencies on other contracts or create new contract instances.

### Type 255 (Priority Transactions / 0xff)

Type 255, or `0xff`, transactions on zkSync are known as "Priority Transactions." Their primary purpose is to enable the sending of transactions directly from Ethereum L1 to the zkSync L2 network.

These transactions are essential for facilitating communication and operations that originate on L1 but need to be executed on L2. Common use cases include:
*   Depositing assets from Ethereum L1 to zkSync L2.
*   Triggering L2 smart contract calls or functions from an L1 transaction.

Priority transactions bridge the two layers, ensuring that L1-initiated actions can be reliably processed and reflected on the zkSync rollup.

Understanding these diverse transaction types is fundamental for developers navigating the Ethereum and zkSync ecosystems. Whether you're optimizing for gas costs, deploying complex smart contract systems, or leveraging advanced features like account abstraction and paymasters on zkSync, a solid grasp of each transaction type's purpose and structure will empower you to build more efficient, robust, and innovative Web3 applications.