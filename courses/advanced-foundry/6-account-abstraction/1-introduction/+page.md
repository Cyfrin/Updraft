# Account Abstraction Lesson 1: Introduction

Welcome to the Account Abstraction course! In this lesson, we will introduce you to account abstraction and its importance in blockchain technology. 

Account abstraction is a fundamental concept of blockchain technology. It offers solutions to some of the common challenges faced by users and developers. In this introductory lesson, you will learn:

- The basic concept of account abstraction and its importance.
- How account abstraction solves common problems related to private key management and transaction validation.
- The two main implementations of account abstraction in Ethereum (`EntryPoint.sol`) and zkSync.
- The role of alt mempools in handling user operations and transactions.
- Optional components like the Signature Aggregator and Paymaster in Ethereum's `EntryPoint.sol` contract.

## Problems Solved

![Current Wallet Issues](/6-account-abstraction/1-introduction/currentWalletIssues.png)

### Use of Private Keys for Signing Transactions
Traditionally, users need to manage and use private keys to sign transactions. This can be annoying, confusing, and risky. Losing a private key means losing access to the account. Even worse, a stolen private key means that you've just lost all the value in that account. Account abstraction solves this problem by allowing users to sign transactions without using private keys. Instead, users can use a different type of key that is more user-friendly and secure. This simplifies the process of signing transactions and reduces the risk of losing access to an account, enhancing both security and user experience.

What's more is that this new type of 'key' can be anything you can think of(as long is it can be coded). This means that you can use your phone, Google account, or even your fingerprint to sign transactions. You can even have a group of your friends collectively approve the data. The possibilities are endless.

### More Flexible Validation Options
Another challenge is that traditional transactions are validated by the sender's private key. This means that only the owner of an account can sign and send a transaction from it. With account abstraction, there is more flexibility in how transactions are validated. This means that you can have others to foot the bill for the gas. Account abstraction addresses this by providing a more flexible and secure framework for transaction validation. 

## Two Entry Points

![Traditional Transactions](/6-account-abstraction/1-introduction/tradEthTrans.png)

The traditional Ethereum transactions consists of first the signing of the transaction by the sender's private key, and then sending it to an Ethereum node. The node verifies that the signature is valid and if so, adds it to its mempool for later inclusion in a block. Account Absctraction, as we have already mentioned add improvemnts to this process. There are two entry points that we need to understand - Ethereum's `EntryPoint.sol` and zkSync's native integration.

### Ethereum – EntryPoint.sol
Ethereum implements account abstraction using a smart contract called `EntryPoint.sol`. This contract acts as a gateway for handling user operations and transactions in a more flexible manner.

If you're interested, you can checkout the code here: [EntryPoint.sol on GitHub](https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/core/EntryPoint.sol)


### zkSync – Natively Integrated
zkSync, on the other hand, has account abstraction natively integrated into its codebase. This allows for seamless handling of transactions and operations without the need for additional contracts.

## Account Abstraction Uses Alt-Mempools

![Current Wallet Issues](/6-account-abstraction/1-introduction/userOp.png)

### User Operations (Off-Chain)
In Ethereum, user operations are first sent off-chain. This means that the initial handling and validation occur outside the main blockchain network, reducing congestion and improving efficiency. In the above example, the user operation is signed with Google and is sent to the alt-mempool, which then sends it to the main blockchain network.

### Transactions and Gas Payments (On-Chain)
Once validated, the user operations are sent on-chain as transactions. These transactions are executed and gas fees are paid on behalf of the user, directly from their account. This is managed through the `EntryPoint.sol` contract. From here, the user's smart contract essentially becomes their wallet. If gas has not yet been settled, it is paid for by the user's account. Finally, the contract is deployed to the blockchain. 

### EntryPoint.sol Optional Add-ons
The `EntryPoint.sol` contract also allows for optional add-ons, such as a Signature Aggregator and a Pay Master. These add-ons can be used to further optimize gas fees and improve user experience.

#### Signature Aggregator
An optional add-on to the `EntryPoint.sol` contract is the signature aggregator. This component collects and verifies multiple signatures, ensuring that only authorized transactions are processed.

#### Pay Master
Another optional component is the pay master. It handles gas payments, allowing users to pay for transactions in various ways, not limited to the native cryptocurrency.

## zkSync

![zkSync Enrty Point](/6-account-abstraction/1-introduction/zksyncEntryPoint.png)

### Acts as an Alt-Mempool
In zkSync, the account abstraction mechanism acts similarly to an alt-mempool. It efficiently manages user operations and transactions, ensuring that they are processed securely and promptly.

By understanding these concepts, you'll have a solid foundation in account abstraction and its implementation in leading blockchain platforms like Ethereum and zkSync. 

## Questions for Review

Before we move one, here are some questions to help you review what we've covered so far **(Watch Video Lesson firts!)**:

- What is account abstraction?
- What are the two entry points in account abstraction?
- What is a mempool
- What are the two optional add-ons for EntryPoint.sol?
- What is the role of a pay master?
- How does it work in Ethereum/zkSync? What's the difference between the two?
  