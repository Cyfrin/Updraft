## Understanding Ethereum and zkSync Transaction Types

When interacting with Ethereum or Layer 2 solutions like zkSync, you might encounter references to different "transaction types," often indicated by a number or a specific name. You could see `TxType: 113` when deploying a contract using Remix on zkSync, notice a `--legacy` flag when using Foundry, or observe `Txn Type: 2 (EIP-1559)` on a block explorer like Etherscan or a zkSync scanner. Understanding these types is crucial for developers and users navigating the evolving blockchain landscape.

This lesson breaks down the different transaction types used on Ethereum and zkSync, explaining their origins, purpose, key features, and how they differ between the layers. We'll cover the types shared by both networks (Types 0, 1, 2, 3) and those specific to zkSync (Types 113, 255).

## Shared Ethereum & zkSync Transaction Types

These four transaction types originated on Ethereum and are also supported by zkSync for compatibility, although their handling might sometimes differ on Layer 2.

### Transaction Type 0 (0x0): Legacy Transactions

*   **Origin:** This is the original transaction format used by Ethereum since its inception, predating the formal concept of distinct transaction types.
*   **Purpose:** It served as the foundational structure for all Ethereum transactions.
*   **Context:** You might interact with this type when using tools that specifically invoke older formats, such as using the `--legacy` flag with Foundry zkSync.
*   **Key Fields:** Includes standard parameters essential for any transaction:
    *   `nonce`: The sender's transaction count.
    *   `gasPrice`: The price (in wei) per unit of gas the sender is willing to pay.
    *   `gasLimit`: The maximum amount of gas the sender is willing to consume.
    *   `to`: The recipient address (or null for contract creation).
    *   `value`: The amount of ETH to transfer (in wei).
    *   `data`: Input data for contract interaction or contract bytecode for creation.
    *   `v`, `r`, `s`: Components of the ECDSA signature used for verification.
*   **Note:** This type uses the single `gasPrice` field to determine the transaction fee.

### Transaction Type 1 (0x01): Optional Access Lists (EIP-2930)

*   **Origin:** Introduced by Ethereum Improvement Proposal (EIP) 2930, alongside EIP-2929 which repriced certain gas costs.
*   **Purpose:** To mitigate potential contract breakage from gas cost changes and potentially lower gas costs for complex transactions by allowing users to specify accounts and storage slots they intend to access.
*   **Key Fields:** Includes all fields from Type 0 (Legacy) transactions, plus:
    *   `accessList`: A list specifying arrays of addresses and storage keys the transaction plans to access.
*   **Benefit:** By pre-declaring accessed accounts and storage slots, transactions can benefit from lower gas costs for those accesses compared to accessing them "cold" (for the first time within the transaction). This is particularly useful for transactions involving multiple contract interactions.

### Transaction Type 2 (0x02): EIP-1559 Transactions

*   **Origin:** Introduced by the widely discussed EIP-1559, activated during Ethereum's "London" hard fork.
*   **Context:** Commonly seen on block explorers labeled as `Txn Type: 2 (EIP-1559)`.
*   **Purpose:** To reform Ethereum's fee market, making gas prices more predictable, smoothing out fee volatility during congestion, and introducing a mechanism to burn a portion of transaction fees.
*   **Key Changes/Fields:** Replaces the single `gasPrice` field with two new ones:
    *   `maxPriorityFeePerGas`: The maximum "tip" the sender offers to pay validators/miners for including the transaction.
    *   `maxFeePerGas`: The absolute maximum total fee (base fee + priority fee) the sender is willing to pay per gas unit.
    *   It also relies on a `baseFee`, which is algorithmically determined for each block based on network demand and is burned (removed from circulation). The actual fee paid is `(baseFee + priorityFee) * gasUsed`, capped by `maxFeePerGas`.
*   **zkSync Specific Note:** While zkSync accepts Type 2 transactions for compatibility with Ethereum wallets and tools, its underlying gas mechanism currently differs from Ethereum L1. zkSync *does not* utilize the `maxPriorityFeePerGas` or `maxFeePerGas` fields in the same way to prioritize transactions or determine fees based on a fluctuating base fee. The fee logic specific to EIP-1559 is effectively ignored on zkSync at present.

### Transaction Type 3 (0x03): Blob Transactions (EIP-4844 / Proto-Danksharding)

*   **Origin:** Introduced by EIP-4844 (Proto-Danksharding), activated during Ethereum's "Dencun" hard fork.
*   **Purpose:** To dramatically reduce the cost for Layer 2 rollups (like zkSync) to post their transaction data to Ethereum L1. It achieves this by introducing a new data type called "blobs" and a separate fee market for this data.
*   **Key Fields (Additional to Type 2):** Includes the fields from Type 2, plus:
    *   `max_fee_per_blob_gas`: The maximum price the sender is willing to pay per unit of blob gas (which measures blob data size). This operates in a separate fee market from execution gas (`maxFeePerGas`).
    *   `blob_versioned_hashes`: A list of commitments (hashes) to the transaction's associated blobs. The actual blob data is transmitted separately via the consensus layer network, not within the transaction payload itself.
*   **Important Note on Blob Fees:** The fee paid specifically for blob data (`blob_gas_price` * blob gas used, capped by `max_fee_per_blob_gas`) is deducted from the sender's account *before* the transaction executes on L1. This blob fee is **non-refundable**, even if the primary transaction execution fails later (e.g., runs out of execution gas).

## zkSync Specific Transaction Types

These transaction types are unique to the zkSync network and enable its advanced features, such as native account abstraction and L1-L2 communication mechanisms.

### Transaction Type 113 (0x71): EIP-712 Based Transactions

*   **Origin:** Designed by zkSync, leveraging the EIP-712 standard for typed structured data hashing and signing. Its hexadecimal representation is `0x71`.
*   **Context:** This is the type often seen (`TxType: 113`) when deploying contracts or interacting with zkSync-specific features via wallets like MetaMask or tools like Remix.
*   **Purpose:** This is the primary transaction type for interacting with zkSync's advanced capabilities. It is essential for:
    *   **Native Account Abstraction (AA):** Allowing smart contracts to function as user accounts with custom validation logic.
    *   **Paymasters:** Enabling third parties (contracts or EOAs) to sponsor transaction fees for users.
*   **Requirement:** Deploying smart contracts onto the zkSync network *must* be done using a Type 113 transaction.
*   **Key Fields (Additional/Modified):** Includes standard Ethereum fields but adds zkSync-specific ones:
    *   `gasPerPubdata`: The maximum amount the sender is willing to pay per byte of "pubdata." Pubdata is the essential state information from L2 that gets published to L1 for security and data availability.
    *   `factory_deps` (optional): An array containing the bytecode of contracts that this transaction intends to deploy (e.g., deploying a contract via a factory).
    *   `paymasterParams` (optional): Parameters required if a paymaster is sponsoring the transaction's fees, including the paymaster's address and any input data it needs.
    *   `customSignature` (optional): Allows non-standard signatures, crucial for smart contract accounts (AA wallets) which can define their own signature validation logic according to EIP-1271.

### Transaction Type 255 (0xff): Priority Transactions (L1 -> L2 Communication)

*   **Origin:** An internal zkSync transaction type. Its hexadecimal representation is `0xff`.
*   **Purpose:** Represents operations initiated on Layer 1 (Ethereum) that are intended for execution on Layer 2 (zkSync). It's the mechanism by which L1 informs L2 about required actions originating from the base layer.
*   **Use Case:** These transactions are not submitted directly by users on L2. Instead, they are generated internally by the zkSync system when processing L1 -> L2 operations requested via the zkSync L1 contracts. Examples include:
    *   Depositing ETH or ERC20 tokens from Ethereum L1 to zkSync L2.
    *   Executing a message call on an L2 contract initiated from an L1 contract.
    *   These operations enter zkSync's "priority queue" on L1 and are processed as Type 255 transactions on L2.

By understanding these different transaction types, you can better grasp the underlying mechanics of Ethereum and zkSync, interpret information seen in development tools and block explorers, and leverage the unique features offered by zkSync's architecture.