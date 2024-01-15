---
title: What is a Transaction? But Actually
---

_Follow along the course with this video._



---

## Deep Dive into Blockchain Transactions

Let's take a moment to really get to grips with what we're doing when we script and execute blockchain transactions. Many people find this element of blockchain to be a bit of a mystery, so let's pull the curtain back and lay out the steps and elements involved.

## Exploring the Terminal

In your terminal, you'll see a few different directories. One of which is `dry run` - this is where files end up when there's no active blockchain. When a blockchain is running, the directories are divided by chain ID. Within these directories, such as `dry run` or `run latest`, you'll find detailed information about each transaction that has been executed. This includes information such as the transaction's hash, type, contract, name, address, and more.

In this section, we can see exactly what's being sent on the chain whenever we use our scripting commands - `forge script` or `forge create`.

This is the transaction we send to the RPC URL and it contains the relevant API data packaged for https POSTS. In this case, our transaction type is `2`. The `from` address refers to where the transaction is initiated from, and the `gas` is the hex value representing the computational effort the transaction requires.

<img src="/foundry/14-transactions/transtactions1.png" style="width: 100%; height: auto;">

Included in the transaction is a `value` field. When you're deploying a contract, this is just another transaction; we can therefore add a value to it if we want. This value can be in the form of the Ethereum blockchain's native currency - Ether. To do this, you just add a `value` field followed by the amount you wish to transact. Note though, in solidity, the `value` option can't be set if the constructor isn't payable.

## Contract Deployment and the Data Field

Let's now focus on the data part of this transaction. In reality, this is the contract deployment code. But there's a bit more to it than that! It also contains the `nonce` value - a unique identifier that's used once for each transaction, and an access list (but we're not going to cover that in this post).

In addition to the details stored in the transaction, a couple of other values play a part that aren't stored here. These are the `r` and `s` values which are used to generate a signature that makes the transaction valid. When a transaction is sent, it is signed using your private key. This signature then forms part of the transaction data.

<img src="/foundry/14-transactions/transactions2.png" style="width: 100%; height: auto;">

In terms of the `nonce` or nonce value mentioned earlier, this is managed by your chosen blockchain wallet. Every time a transaction is sent, it is given a nonce that increments after each transaction is sent. Finally, and critically, remember that any time you change the state of the blockchain you do so through a transaction. Each transaction contains an all-important data field, which includes 'opcodes' that tell the blockchain what you'd like it to do. In some cases, this might mean the creation of a new contract. In others, the data is merely associated with a basic transaction.

## Conclusion

The world of blockchain transactions can seem complicated. By understanding these underlying processes, however, we can get a much richer understanding of how it functions. The powerful part comes when we understand the way transactions work when executing them with tools like Remix. It all comes down to that pivotal data field of a transaction!
