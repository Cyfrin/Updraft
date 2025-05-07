## Unpacking zkSync Type 113 Transactions: The Magic Behind EIP-712 Signatures in Remix

You might have recently experienced sending a transaction or deploying a contract on zkSync via Remix, perhaps by simply signing a message—specifically, an EIP-712 message. This leads to a crucial question: "What actually is the mechanism or format that allowed Remix to be able to send a transaction for us by signing a message?" The answer lies in zkSync's innovative approach to transactions, particularly **Type 113 transactions**, which are deeply intertwined with the concept of **Account Abstraction (AA)**. This lesson will demystify these concepts and show how they work together.

## What is Account Abstraction? Smart Contracts as Your User Account

Account Abstraction (AA) is a transformative concept in the blockchain space. At its core, AA allows users to **use smart contracts as their primary user accounts** instead of traditional Externally Owned Accounts (EOAs). This means your assets are stored and managed by the logic embedded within a smart contract, rather than being solely controlled by a private key.

The primary benefit of Account Abstraction is the enablement of **programmable accounts**. This unlocks a host of features and functionalities far beyond what standard EOAs can offer. Think of it with this slogan: "Use smart contracts as a user account!"

## Traditional Ethereum Accounts: EOAs vs. Smart Contracts

To appreciate the innovation of Account Abstraction on zkSync, let's quickly recap the traditional types of accounts on Ethereum:

1.  **Externally Owned Accounts (EOAs):**
    *   These are controlled by a private key.
    *   Users directly initiate and sign transactions from their EOAs.
    *   A standard MetaMask account is a prime example of an EOA.

2.  **Smart Contract Accounts (or Contract Accounts):**
    *   These are essentially pieces of code deployed on the blockchain.
    *   On traditional Ethereum, smart contract accounts *cannot* initiate transactions on their own. They only react to transactions sent *to* them.
    *   They can house arbitrary logic, enabling complex systems like multisig wallets or Decentralized Autonomous Organizations (DAOs).

The key distinction here is that, traditionally, only EOAs could start a transaction sequence.

## zkSync's Native Account Abstraction: A Paradigm Shift

zkSync fundamentally changes this dynamic with its **native Account Abstraction**. This isn't an add-on or a layer built on top; it's integrated into the core protocol of zkSync.

The most significant shift is that on zkSync, **all accounts are, by default, smart contract accounts**. This means that even if you're interacting with zkSync using what feels like your regular Ethereum EOA, on zkSync, that address represents a smart contract account.

These zkSync smart contract accounts uniquely blend the capabilities of both traditional account types:
*   They can **initiate transactions**, just like EOAs.
*   They can contain **arbitrary custom logic** for validation, execution, and more, just like smart contracts.

This inherent programmability at the account level unlocks powerful benefits:
*   **Custom Signature Schemes:** Go beyond the standard ECDSA; use different cryptographic signatures if needed.
*   **Native Multisig Capabilities:** Implement multi-signature requirements directly at the account level.
*   **Spending Limits:** Program your account to enforce daily or per-transaction spending limits.
*   **Social Recovery:** Design mechanisms for account recovery that don't solely rely on a seed phrase (e.g., through trusted friends or services).
*   **Gas Fee Abstraction (via Paymasters):** Allow third parties (paymasters) to cover gas fees for users, enabling smoother onboarding and user experiences.

## Introducing Type 113 Transactions: zkSync's Engine for Account Abstraction

This brings us to **Type 113 transactions**. This is the specific transaction type that zkSync utilizes to enable its native Account Abstraction features.

Remember that scenario in Remix where you signed an EIP-712 message and a transaction was sent? Here's what happened:
1.  Your Ethereum address, when used on the zkSync network, is already treated as a smart contract account.
2.  Remix, understanding zkSync's architecture, took the EIP-712 signature you provided.
3.  It then packaged this authorization into a **Type 113 transaction**.
4.  This Type 113 transaction instructed your smart contract account on zkSync to perform the desired action, such as deploying another contract or interacting with an existing one.

The EIP-712 signature provides the necessary authorization for your smart contract account to act on your behalf.

## Decoding a Type 113 Transaction: A Look Inside the Remix Console

If you were to inspect the transaction details in the Remix console after such an operation (for instance, deploying a `SimpleStorage` contract on zkSync), you'd see a JSON object representing the transaction. This is an example of what a Type 113 transaction might look like:

```json
{
  "type": 113,
  "nonce": 1,
  "maxPriorityFeePerGas": "0x0ee7600",
  "maxFeePerGas": "0x0ee7600",
  "gasLimit": "0x00635c9e",
  "to": "0x0d55504000000000000000000000000000008126...",
  "value": "0x0",
  "data": "0x...",
  "from": "0x5b38da6a701c568545dcfcb03fcb873f829e051b97",
  "customData": {
    "gasPerPubdata": "0xBigNumber",
    "factoryDeps": [
      "0x..."
    ],
    "paymasterParams": null
  },
  "hash": "0x0e4c59d6a57f7c3ce83bffb2f26df902786b6bfb85dc2e5c6ec6885ba3",
  "confirmations": 0
}
```

Let's break down the key fields:

*   `"type": 113`: This is the crucial identifier. It explicitly tells the zkSync network that this is a native Account Abstraction transaction.
*   `"from"`: This address represents the EOA (e.g., your MetaMask account) that provided the signature which authorizes this transaction. Even though all accounts on zkSync are smart contracts, this field links the authorization back to an EOA's signature.
*   `"customData"`: This object contains fields specific to zkSync's L2 functionality:
    *   `"gasPerPubdata"`: A zkSync-specific field related to the cost of publishing data to Layer 1 (Ethereum).
    *   `"factoryDeps"`: This array contains bytecodes of contracts that this transaction depends on or will deploy. For example, if this transaction deploys your account contract for the first time, its bytecode would be here. It can also include bytecodes of other contracts this transaction deploys or interacts with.
    *   `"paymasterParams": null`: This field indicates whether a paymaster is being used to cover gas fees for this transaction. In this example, `null` means no paymaster is involved; the user's account is paying the fees. If a paymaster *were* used, this field would contain parameters specifying the paymaster contract and any necessary input data for it.
*   Other fields like `nonce`, `maxPriorityFeePerGas`, `maxFeePerGas`, `gasLimit`, `to` (often a system address for contract deployment or interaction in AA contexts), `value`, `data`, and `hash` are similar to standard Ethereum transaction fields, adapted for zkSync's architecture.

## The Bigger Picture: Type 113 and Native AA

In essence, Type 113 transactions are zkSync's native mechanism for realizing the benefits of Account Abstraction, often compared to what EIP-4337 aims to achieve on Ethereum L1 but implemented directly at the protocol level on zkSync. They allow every user account to be a powerful, programmable smart contract, triggered by user signatures (like EIP-712) and capable of sophisticated custom logic.

While this provides a foundational understanding, Account Abstraction is a rich topic. Don't worry if not all details are crystal clear yet; a more in-depth exploration of Account Abstraction will be covered in a future lesson by Patrick. For now, understand that Type 113 transactions are the key enablers for the seamless and powerful user experiences on zkSync.