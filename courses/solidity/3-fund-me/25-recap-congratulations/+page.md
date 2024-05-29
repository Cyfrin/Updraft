---
title: Recap & Congratulations
---

### Introduction

In this second part of the `FundMe` section, we have covered the majority of Solidity basics, including special functions, custom errors, immutable variables, modifiers, constructors, arrays, for loops, libraries, and much more.

### Special Functions

We have encountered the special functions `receive`, `fallback`, and `constructor`. These functions do not require the `function` keyword before their name. The `receive` function is triggered when Ether is sent to a contract and the **data** field is empty. The `fallback` function is triggered when data is sent with a transaction, but no matching function is found.

### Saving Gas

To save gas, Solidity provides keywords like `constant` and `immutable` for variables that can only be set once:

```solidity
uint constant minimumUSD = 50 * 1e18;
```

In this example, `minimumUSD` is a constant and cannot be changed, saving gas. Unlike `constant`, which is set at compile time, `immutable` allows a variable to be assigned once during deployment. Attempts to change either `constant` or `immutable` variables will result in a compilation error.

### Sending Ether

Remix offers a simple way to send Ether to a contract. After deploying the contract, you can press the `transact` button without including call data while setting the transaction's value. If no call data is provided, the `receive` function will be triggered (if it exists); otherwise, the `fallback` function will be triggered.

### Conclusion

In the next section, we will move from Remix to a code editor to experiment with more advanced Solidity features. We will explore enums, events, try-catch, function selectors, abi.encode, hashing, Yul, and assembly.

### 🧑‍💻 Test yourself

1. 🏆 Attempt to answer all the theoretical questions from lessons 13 through 25, and then go back again to complete all the coding tasks.

[Back to top](#top)
