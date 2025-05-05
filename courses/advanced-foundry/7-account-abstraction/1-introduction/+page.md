# Account Abstraction Lesson 1: Introduction

Welcome to the Account Abstraction course! In this lesson, we will introduce you to account abstraction and its importance in blockchain technology. 

Account abstraction is a fundamental concept of blockchain technology. It offers solutions to some of the common challenges faced by users and developers. In this introductory lesson, you will learn:

- The basic concept of account abstraction and its importance.
- How account abstraction solves common problems related to private key management and transaction validation.
- The two main implementations of account abstraction in Ethereum (`EntryPoint.sol`) and ZKsync.
- The role of alt mempools in handling user operations and transactions.
- Optional components like the Signature Aggregator and Paymaster in Ethereum's `EntryPoint.sol` contract.

## Problems Solved

::image{src='/foundry-account-abstraction/1-introduction/current-wallet-issues.png' style='width: 100%; height: auto;'}

### Use of Private Keys for Signing Transactions
Traditionally, users need to manage and use private keys to sign transactions. This can be annoying, confusing, and risky. Losing a private key means losing access to the account. Even worse, a stolen private key means that you've just lost all the value in that account. Account abstraction solves this problem by allowing users to sign transactions without using private keys. Instead, users can use a different type of key that is more user-friendly and secure. This simplifies the process of signing transactions and reduces the risk of losing access to an account, enhancing both security and user experience.

What's more is that this new type of 'key' can be anything you can think of(as long is it can be coded). This means that you can use your phone, Google account, or even your fingerprint to sign transactions. You can even have a group of your friends collectively approve the data. The possibilities are endless.

### More Flexible Validation Options
Another challenge is that traditional transactions are validated by the sender's private key. This means that only the owner of an account can sign and send a transaction from it. With account abstraction, there is more flexibility in how transactions are validated. This means that you can have others to foot the bill for the gas. Account abstraction addresses this by providing a more flexible and secure framework for transaction validation. 

## Two Entry Points

::image{src='/foundry-account-abstraction/1-introduction/trade-eth-trans.png' style='width: 100%; height: auto;'}

The traditional Ethereum transactions consists of first the signing of the transaction by the sender's private key, and then sending it to an Ethereum node. The node verifies that the signature is valid and if so, adds it to its mempool for later inclusion in a block. Account Abstraction, as we have already mentioned add improvements to this process. There are two entry points that we need to understand - Ethereum's `EntryPoint.sol` and ZKsync's native integration.

### Ethereum – EntryPoint.sol
Ethereum implements account abstraction using a smart contract called `EntryPoint.sol`. This contract acts as a gateway for handling user operations and transactions in a more flexible manner.

If you're interested, you can checkout the code here: [EntryPoint.sol on GitHub](https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/core/EntryPoint.sol)


### ZKsync – Natively Integrated
ZKsync, on the other hand, has account abstraction natively integrated into its codebase. This allows for seamless handling of transactions and operations without the need for additional contracts.

## Account Abstraction Uses Alt-Mempools

::image{src='/foundry-account-abstraction/1-introduction/user-op.png' style='width: 100%; height: auto;'}

### User Operations (Off-Chain)
In Ethereum, user operations are first sent off-chain. This means that the initial handling and validation occur outside the main blockchain network, reducing congestion and improving efficiency. In the above example, the user operation is signed with Google and is sent to the alt-mempool, which then sends it to the main blockchain network. The alt mempool is any nodes which are facilitating this operation. So the user is not sending their transaction to the Ethereum nodes.

### Transactions and Gas Payments (On-Chain)
Once validated, the user operations are sent on-chain as transactions. These transactions are executed and gas fees are paid on behalf of the user, directly from their account, by the alt-mempool nodes. This is managed through the `EntryPoint.sol` contract. From here, the user's smart contract essentially becomes their wallet. If a paymaster is not set up, the funds will be deducted from the account. Finally, the contract is deployed to the blockchain. 

### EntryPoint.sol Optional Add-ons
The `EntryPoint.sol` contract also allows for optional add-ons, such as a Signature Aggregator and a Paymaster. These add-ons can be used to further optimize gas fees and improve user experience.

#### Signature Aggregator
An optional add-on to the EntryPoint.sol contract is the signature aggregator. This add-on lets you define multiple signatures to be aggregated and verified. This means that other users can sign transactions on the same wallet or multi-sign logic can be added, such as requiring multiple signatures before authorizing transactions.

#### Paymaster
Another optional component is the pay master. It handles gas payments, allowing users to pay for transactions in various ways, not limited to the native cryptocurrency.

## ZKsync

::image{src='/foundry-account-abstraction/1-introduction/zksync-entry-point.png' style='width: 100%; height: auto;'}

### Acts as an Alt-Mempool
In ZKsync, the alt-mempool nodes are also the ZKsync nodes. This means that sending the transaction to the alt-mempool can be skipped. The reason ZKsync can do this is because every account (e.g., MetaMask) is by default a smart contract account as it is automatically connected to a [DefaultAccount.sol](https://github.com/matter-labs/era-contracts/blob/main/system-contracts/contracts/DefaultAccount.sol).

By understanding these concepts, you'll have a solid foundation in account abstraction and its implementation in leading blockchain platforms like Ethereum and ZKsync. 

## Questions for Review

Before we move one, here are some questions to help you review what we've covered so far:

- What is account abstraction?
- What are the two entry points in account abstraction?
- What is a mempool
- What are the two optional add-ons for EntryPoint.sol?
- What is the role of a pay master?
- How does it work in Ethereum/ZKsync? What's the difference between the two?

