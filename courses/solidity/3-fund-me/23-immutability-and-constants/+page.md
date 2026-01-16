---
title: Immutability and Constants
---

_You can follow along with the video course from here._

### Introduction

In this lesson, we'll explore tools to optimize **gas usage** for variables that are set only _once_.

### Optimizing Variables

The variables `owner` and `minimumUSD` are set one time and they never change their value: `owner` is assigned during contract creation, and `minimumUSD` is initialized at the beginning of the contract.

### Evaluating the FundMe Contract

We can evaluate the gas used to create the contract by deploying it and observing the transaction in the terminal. In the original contract configuration, we spent almost 859,000 gas.

### Constant

To reduce gas usage, we can use the keywords `constant` and `immutable`. These keywords ensure the variable values remain unchanged. For more information, you can refer to the [Solidity documentation](https://solidity.readthedocs.io/).

We can apply these keywords to variables assigned once and never change. For values known at **compile time**, use the `constant` keyword. It prevents the variable from occupying a storage slot, making it cheaper and faster to read.

Using the `constant` keyword can save approximately 19,000 gas, which is close to the cost of sending ETH between two accounts.

> 🗒️ **NOTE**:br
> Naming conventions for `constant` are all caps with underscores in place of spaces (e.g., `MINIMUM_USD`).

> 🚧 **WARNING**:br
> Converting the current ETH gas cost to USD, we see that when ETH is priced at 3000 USD, defining `MINIMUM_USD` as a constant costs 9 USD, nearly 1 USD more than its public equivalent.

### Immutable

While `constant` variables are for values known at compile time, `immutable` can be used for variables set at deployment time that will not change. The naming convention for `immutable` variables is to add the prefix `i_` to the variable name (e.g., `i_owner`).

Comparing gas usage after making `owner` an `immutable` variable, we observe similar gas savings to the `constant` keyword.

> 💡 **TIP**:br
> Don't focus too much on gas optimization at this early stage of learning.

### Conclusion

In this lesson, we have explored the use of `constant` and `immutable` keywords in Solidity to optimize gas usage for variables that are set only once. Understanding how and when to use these keywords can significantly reduce gas costs, making your smart contracts more efficient.

### 🧑‍💻 Test yourself

1. 📕 Why a developer can choose to use `immutable` instead of `constant` for specific variables?
2. 🧑‍💻 Invent one `constant` variable and one `immutable` variable that can be integrated into the current version of the `fundMe` contract.
