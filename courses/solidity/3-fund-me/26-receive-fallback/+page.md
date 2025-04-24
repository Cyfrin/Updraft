---
title: Receive & Fallback
---

_You can follow along with the video course from here._

### Introduction

In Solidity, if Ether is sent to a contract without a `receive` or `fallback` function, the transaction will be **rejected**, and the Ether will not be transferred. In this lesson, we'll explore how to handle this scenario effectively.

### receive and fallback functions

`receive` and `fallback` are _special functions_ triggered when users send Ether directly to the contract or call non-existent functions. These functions do not return anything and must be declared `external`.

To illustrate, let's create a simple contract:

```solidity
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract FallbackExample {
    uint256 public result;

    receive() external payable {
        result = 1;
    }

    fallback() external payable {
        result = 2;
    }
}
```

In this contract, `result` is initialized to zero. When Ether is sent to the contract, the `receive` function is triggered, setting `result` to one. If a transaction includes **data** but the specified function _does not exist_, the `fallback` function will be triggered, setting `result` to two. For a comprehensive explanation, refer to [SolidityByExample](https://solidity-by-example.org/fallback/).

```text
// Ether is sent to contract
//      is msg.data empty?
//          /   \
//         yes  no
//         /     \
//    receive()?  fallback()
//     /   \
//   yes   no
//  /        \
//receive()  fallback()
```

### Sending Ether to fundMe

When a user sends Ether **directly** to the `fundMe` contract without calling the `fund` function, the `receive` function can be used to _redirect_ the transaction to the `fund` function:

```solidity
receive() external payable {
    fund();
}

fallback() external payable {
    fund();
}
```

To test this functionality, send some Sepolia Ether to the `fundMe` contract using MetaMask. This does not directly call the `fund` function, but the `receive` function will trigger it. After confirming the transaction, you can check the `funders` array to see that it has been updated, reflecting the successful invocation of the `fund` function by the `receive` function.

This approach ensures that all transactions are processed as intended. Although directly calling the `fund` function costs less gas, this method ensures the user's contribution is properly acknowledged and credited.

### Conclusion

By implementing `receive` and `fallback` functions, contracts can handle direct Ether transfers and non-existent function calls effectively, ensuring that transactions are processed as intended and users' contributions are properly tracked.

### 🧑‍💻 Test yourself

1. 📕 How does the `fallback` function differ from the `receive` function?
2. 📕 What does it happen when Ether is sent with _data_ but in the contract only a `receive` function exist?
