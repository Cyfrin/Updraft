## Transaction Types (Optional)

We're going to talk about transaction types, which are an important part of working with zkSync.

There are four main transaction types in Ethereum and zkSync:

1. **Transaction Type 0 (Legacy Transactions)**: This was the original transaction type used in Ethereum before transaction types were introduced. When we deploy a smart contract using Foundry zkSync, we can specify `--legacy` which sets the transaction type to zero.

2. **Transaction Type 1 (0x01 Transactions)**: This transaction type was introduced to address certain contract breakage risks. It includes the same fields as legacy transactions, but adds an access list parameter. This parameter allows us to pre-declare allowed contracts and storage slots, which can save gas on cross-contract calls.

3. **Transaction Type 2 (0x02 Transactions)**: Introduced by EIP-1559, this transaction type aimed to address high network fees and congestion. It replaced the `gasPrice` parameter with a `baseFee`, which is dynamically adjusted for each block. It also introduced `maxPriorityFeePerGas`, which is the maximum fee the sender is willing to pay for priority processing, and `maxFeePerGas`, which is the maximum total fee the sender is willing to pay. While zkSync supports type two transactions, it doesn't utilize the `maxFee` parameters because its gas mechanism works differently.

4. **Transaction Type 3 (0x03 Transactions)**: Introduced by EIP-4844, this transaction type is related to Proto-DankSharding and blobs. It adds two new fields: `max_blob_fee_per_gas`, which is the maximum fee the sender is willing to pay for the blob gas, and `blob_versioned_hashes`, which is a list of the versioned blob hashes. This type is a separate market from regular gas. This type of transaction is non-refundable.

We are going to learn more about blobs and EIP-4844 in a later video.

zkSync has two more specific transaction types, which are:

1. **EIP-712 Transactions**: This type of transaction is identified as type 113 or 0x71 and defines typed structured data hashing and signing. It enables us to use zkSync-specific features such as account abstraction and paymasters. This transaction type also requires that smart contracts be deployed with it. The fields are similar to standard Ethereum transactions, but include a couple of additional fields: `gasPerPubData`, which is the maximum gas the sender is willing to pay for a single byte of `pubData`, `customSignature`, which is a field for when the signer's account is not an EOA, `paymasterParams`, which are parameters for configuring a custom paymaster, and `factory_deps`, which contains the bytecode of the smart contract being deployed.

2. **Priority Transactions**: This type of transaction is identified as type 5 or 0xff and enables us to send transactions directly from the L1 to the L2 in zkSync.

It's important to understand these transaction types because they are used in different ways by zkSync and other tools. For example, when we run a deployment command with Titanoboa, it defaults to using type two transactions (EIP-1559) because most current tooling automatically defaults to them. However, zkSync doesn't support this type of transaction. As a result, when we deploy our smart contract, we get a warning stating that no EIP-1559 transaction is available and that it is falling back to the legacy transaction. zkSync doesn't need these EIP-1559 transactions because it has its own specific gas mechanisms. It's important to remember that zkSync will always default to using type zero transactions if other transaction types aren't supported. 

```bash
mox run deploy merkle_airdrop --network eravm
```