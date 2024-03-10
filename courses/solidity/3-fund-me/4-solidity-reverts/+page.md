---
title: Solidity Reverts and Gas
---

*Follow along this chapter with the video bellow*



<!-- <img src="/solidity/remix/lesson-4/transact/transact2.png" style="width: 100%; height: auto;"> -->


# Understanding Reverts and Gas in Ethereum Blockchain

In this lesson will emphasize **reverts** and how **gas** works in transactions.

## What is a Revert?

Reverts can at times be confusing and appear tricky. A revert, in essence, undoes previous actions, sending back the remaining gas associated with that transaction. But what does this mean in context?

Let's illustrate this with an example using our `FundMe` contract. Here's some code to start with:

```javascript
    uint256 public myValue;
    myValue = 1;
    function fund() public {
        myValue = myValue + 2;
    }
```

In our `fund` function, we increase `myValue` by two each time it executes successfully. However, if we encounter a revert statement, the previous action (where we added two to `myValue`) is undone and `myValue` is reset to its original state.

<img src="/solidity/remix/lesson-4/reverts/revert1.png" style="width: 100%; height: auto;">


This means that if the transaction reverts, `myValue` returns to its previous value (in this case, one). Although technically, the line `myValue = myValue + 2;` was executed, the reverting line following it ensures this change never gets confirmed.

## Checking the Gas Usage

Now arises an important question – will the gas used in the transaction be refunded if my transaction didn't go through because it reverted? Unfortunately, no. If a transaction fails, you still consume the gas because computers executed the code before the transaction reverting.


Users, however, can specify how much gas they're willing to allocate to a transaction. For instance, if a function contained lines of computation after the `require` line, a significant quantity of gas would be needed to operate and run this function. However, if a revert is encountered midway, the unused gas is refunded to whoever initiated the transaction.

Here's a simple rule of thumb:

<img src="/solidity/remix/lesson-4/reverts/revert2.png" style="width: 100%; height: auto;">

## A Look at Transaction Fields

<img src="/solidity/remix/lesson-4/reverts/revert3.png" style="width: 100%; height: auto;">


Every transaction includes specific fields, such as nonce (transaction count for the account), gas price, gas limit (seen on Etherscan), the recipient's address, the transaction value, and data. The data field holds the function call or contract deployment information. These transactions also include cryptographic elements in the V, R, and S fields.

If sending value, the gas limit is typically set to 21,000, the data field remains empty, and the recipient's address is filled in.


<img src="/solidity/remix/lesson-4/reverts/revert4.png" style="width: 100%; height: auto;">


In the Remix Ethereum IDE, values can be set in Wei, Gwei or Ether units. Each Ether is worth `1,000,000,000,000,000,000` Wei or `1,000,000,000` Gwei.

## Conclusion

While reverts and gas may seem tricky and can at times be confusing, they help uphold the integrity of the blockchain and its state.In sum, reverts validate integrity by reversing transactions when failures occur. Gas powers transactions, running the EVM, and even when transactions fail, the gas used is not recoverable. To manage this, Ethereum allows users to set the maximum amount of gas they're willing to use for transactions.

Let's keep learning with the next lesson!