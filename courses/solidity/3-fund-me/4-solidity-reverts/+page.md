---
title: Solidity Reverts and Gas
---

_You can follow along with the video course from here._

### Introduction

In this lesson, we will delve into how do _transaction reverts_ work, what is _gas_ where is used.

### Revert

Let's start by adding some logic to the `fund` function:

```js
 uint256 public myValue = 1;
 function fund() public {
    myValue = myValue + 2;
 }
```

A _revert_ action **undoes** all prior operations and returns the remaining gas to the transaction's sender. In this `fund` function, `myValue` increases by two (2) units with each successful execution. However, if a revert statement is encountered right after, all actions performed from the start of the function are undone. `myValue` will then reset to its initial state value, or one.

```js
 uint256 public myValue = 1;
 function fund() public {
    myValue = myValue + 2;
    require(msg.value > 1e18, "didn't send enough ETH");
    // a function revert will undo any actions that have been done.
    // It will send the remaining gas back
 }
```

### Gas Usage

> 🔥 **CAUTION**:br
> The gas used in the transaction will not be refunded if the transaction fails due to a revert statement. The gas has already been **consumed** because the code was executed by the computers, even though the transaction was ultimately reverted.

Users can specify how much gas they're willing to allocate for a transaction. In the case where the `fund` function will contain a lot of lines of code after the `require` and we did indeed set a limit, the gas which was previously allocated but not used will not be charged to the user

> 🗒️ **NOTE**:br
> If a transaction reverts, is defined as failed

### Transaction Fields

During a **value** transfer, a transaction will contain the following fields:

- **Nonce**: transaction counter for the account
- **Gas price (wei)**: maximum price that the sender is willing to pay _per unit of gas_
- **Gas Limit**: maximum amount of gas the sender is willing to use for the transaction. A common value could be around 21000.
- **To**: _recipient's address_
- **Value (Wei)**: amount of cryptocurrency to be transferred to the recipient
- **Data**: 🫙 _empty_
- **v,r,s**: components of the transaction signature. They prove that the transaction is authorised by the sender.

During a **_contract interaction transaction_**, it will instead be populated with:

- **Nonce**: transaction counter for the account
- **Gas price (wei)**: maximum price that the sender is willing to pay _per unit of gas_
- **Gas Limit**: maximum amount of gas the sender is willing to use for the transaction. A common value could be around 21000.
- **To**: _address the transaction is sent to (e.g. smart contract)_
- **Value (Wei)**: amount of cryptocurrency to be transferred to the recipient
- **Data**: 📦 _the content to send to the **To** address_, e.g. a function and its parameters.
- **v,r,s**: components of the transaction signature. They prove that the transaction is authorised by the sender.

### Conclusion

**Reverts** and **gas usage** help maintain the integrity of the blockchain state. _Reverts_ will undo transactions when failures occur, while _gas_ enables transactions execution and runs the EVM. When a transaction fails, the gas consumed is not recoverable. To manage this, Ethereum allows users to set the maximum amount of gas they're willing to pay for each transaction.

### 🧑‍💻 Test yourself

1. 📕 Describe the two types of transactions listed in this lesson.
2. 📕 Why are reverts used?
3. 🧑‍💻 Bob sets his gas price to 20 Gwei and his gas limit to 50,000 units. The transaction consumes 30,000 units of gas before a revert occurs. How much ETH will be effectively charged?
