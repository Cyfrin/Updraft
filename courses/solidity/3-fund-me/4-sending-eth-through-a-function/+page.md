---
title: Sending ETH through a function
---

_You can follow along with the video course from here._

### Introduction

In this part, we'll explore how to transfer Ethereum (ETH) to a smart contract by creating a `fund` function. This function will require a _minimum amount of ETH_ to ensure proper transaction handling.

### value and payable

When a transaction it's sent to the blockchain, a **value** field is always included in the _transaction data_. This field indicates the **amount** of the native cryptocurrency being transferred in that particular transaction.
For the function `fund` to be able to receive Ethereum, it must be declared **`payable`**. In the Remix UI, this keyword will turn the function red, signifying that it can accept cryptocurrency.

_Wallet addresses_ and _smart contracts_ are capable of **holding** and **managing** cryptocurrency funds. These entities can interact with the funds, perform transactions, and maintain balance records, just like a wallet.

```js
function fund() public payable {
    // allow users to send $
    // have a minimum of $ sent
    // How do we send ETH to this contract?
    msg.value;

    //function withdraw() public {}
}
```

In Solidity, the **value** of a transaction is accessible through the [`msg.value`](https://docs.soliditylang.org/en/develop/units-and-global-variables.html#special-variables-and-functions) **property**. This property is part of the _global object_ `msg`. It represents the amount of **Wei** transferred in the current transaction, where _Wei_ is the smallest unit of Ether (ETH).

### Reverting transactions

We can use the`require` keyword as a checker, to enforce our function to receive a minimum `value` of one (1) whole ether:

```js
require(msg.value > 1e18); // 1e18 = 1 ETH = 1 * 10 ** 18
```

This `require` condition ensures that the transaction meets the minimum ether requirements, allowing the function to execute only if this threshold is satisfied. If the specified requirement is not met, the transaction will **revert**.

The require statement in Solidity can include a custom error message, which is displayed if the condition isn't met, clearly explaining the cause of the transaction failure:

```js
require(msg.value > 1 ether, "Didn't send enough ETH"); //if the condition is false, revert with the error message
```

An online tool like [Ethconverter](https://eth-converter.com/) can be useful for executing conversions between _Ether_, _Wei_, and _Gwei_.

> 👀❗**IMPORTANT**:br
> 1 Ether = 1e9 Gwei = 1e18 Wei

> 🗒️ **NOTE**:br
> Gas costs are usually expressed in Gwei

If a user attempts to send less Ether than the required amount, the transaction will **fail** and a _message_ will be displayed. For example, if a user attempts to send 1000 Wei, which is significantly less than one Ether, the function will revert and does not proceed.

### Conclusion

In this lesson, we explored how to use the `value` field of a transaction to transfer Ether to a contract. We also learned how to generate an **error message** when the user sends insufficient Ether to the `FundMe` contract.

### 🧑‍💻 Test yourself

1. 📕 Describe the role of the `payable` keyword. How does it affect the functionality of a function?
2. 📕 Explain how the `require` statement works in Solidity and what prevents.
3. 📕 What's the difference between Wei, Gwei and Ether?
4. 🧑‍💻 Create a `tinyTip` function that requires the user to send less than 1 Gwei.
