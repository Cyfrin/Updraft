---
title: Gas Part II
---

_Follow along with this video:_

---

### Transactions and Gas

In this lesson we're going to take an even closer look at `gas`, how it functions and the purpose it serves on the blockchain.

Don't stress if this topic sounds complex; gas can absolutely be a confusing topic, but the more experience you gain and more examples we go through, it'll start to become clear.

**Note:** What we're covering here is applicable to Ethereum post implementation of [**EIP-1559**](https://eips.ethereum.org/EIPS/eip-1559) wherein gas limits, priority fees and the discussed burn mechanism were all introduced.

### Transaction Breakdown

Before we continue, there are a couple important terms to understand.

    Wei:  1,000,000,000 Wei  = 1 Gwei (Gigawei)
    Gwei: 1,000,000,000 Gwei = 1 Eth

::image{src='/blockchain-basics/09-gas-II/gas-II1.png' style='width: 75%; height: auto;'}

_Reference the above image, the labelled sections will be detailed below_

**1. Transaction Fee:** This is calculated as Total `Gas Used * Gas Price` where `Gas Used` represents the computational units required to perform the work and `Gas Price` is comprised of a `Base` and `Priority Fee`

**2. Gas Limit:** This is the maximum amount of gas allowed for the transaction. This can be set by the user prior to sending a transaction.

In Metamask, you can navigate to `Market > Advanced > Edit Gas Limit` in order to set this value.

::image{src='/blockchain-basics/09-gas-II/gas-II2.png' style='width: 75%; height: auto;'}

**3. Base Gas Fee:** The base fee of a transaction, represented in Gwei. Remember, this is cost per gas.

There are a couple important points to note regarding the Base Fee

- The fee is burnt as of EIP-1559. Burning serves to remove the value from circulation, combating inflation on the protocol. The amount burnt can be seen beneath the `Base Fee` in the image above.
- The fee is dynamic, under EIP-1559, if a block is more than 50% full, the `Base Gas Fee` is increased for the next block. Likewise, if a block is less then 50% full, the fee decreases. This serves to balance network demand and capacity.

**4. Max Gas Fee:** This is the maximum cost per cast the transaction has been configured to allow. This can again be configured prior to sending a transaction.

**5. Max Priority Fee:** Again, configurable prior to sending a transaction, this represents the maximum `tip` we're willing to give miners. This incentivizes the inclusion of our transaction within a block.

**6. Block Confirmations:** These are he number of blocks which have been mined or validated which have been confirmed to contain your transaction. The more confirmations the more sure we can be of the transaction's validity.

### Wrap Up

Lets recap some of what we've learnt about transactions on the blockchain!

We learnt that every transaction has a unique `transaction hash` that uniquely identifies the transaction on chain.

Pulling up a transaction in a block explorer like Etherscan can provide us a tonne of additional information, including:

- The block which contains the transaction
- The time stamp of when the transaction was requested
- Where the transaction is originating
- Where the transaction is being sent
- The value included in a transaction

From here we can also see details about the `transactions fees` and `gas` costs.

`Gas` is a measure of computation required to perform a task, the cost of a transaction is derived from a `Gas Price` (made of `Base` and `Priority Fees`) and the amount of `gas` used.

We learnt that a `Gas Limit` can be set before a transaction is set and that the `Base Fee` on all Ethereum transactions is actually `burnt`, in order to reduce inflation and stabilize the network economy.

We also discovered that the Base Fee goes up and down depending on the congestion of a block. If a block is >50% full, the fee goes up, <50% and the fee goes down.

Wow, we've learnt a lot. I think we might need a whole lesson to review everything properly. Coming up!
