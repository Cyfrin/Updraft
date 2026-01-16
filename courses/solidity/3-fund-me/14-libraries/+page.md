---
title: Libraries
---

_You can follow along with the video course from here._

### Introduction

In the previous lesson, we used the `getPrice()` function and `getConversionRate`. These methods can be reused multiple times for anyone working with Price Feeds. When a functionality can be _commonly used_, we can create a **library** to efficiently manage repeated parts of codes.

### Libraries

Great examples of Libraries can be found in the [Solidity by example](https://solidity-by-example.org/library/) website.
Solidity libraries are similar to contracts but do not allow the declaration of any **state variables** and **cannot receive ETH**.

> 👀❗**IMPORTANT**:br
> All functions in a library must be declared as `internal` and are embedded in the contract during compilation. If any function is not marked as such, the library cannot be embedded directly, but it must be deployed independently and then linked to the main contract.

We can start by creating a new file called `PriceConverter.sol`, and replace the `contract` keyword with `library`.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
library PriceConverter {}
```

Let's copy `getPrice`, `getConversionRate`, and `getVersion` functions from the `FundMe.sol` contract into our new library, remembering to import the `AggregatorV3Interface` into `PriceConverter.sol`. Finally, we can mark all the functions as `internal`.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

library PriceConverter {
    function getPrice() internal view returns (uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        (, int256 answer, , , ) = priceFeed.latestRoundData();
        return uint256(answer * 10000000000);
    }

    function getConversionRate(uint256 ethAmount) internal view returns (uint256) {
        uint256 ethPrice = getPrice();
        uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1000000000000000000;
        return ethAmountInUsd;
    }
}
```

### Accessing the Library

You can import the library in your contract and attach it to the desired type with the keyword `using`:

```solidity
import {PriceConverter} from "./PriceConverter.sol";
using PriceConverter for uint256;
```

The `PriceConverter` functions can then be called as if they are native to the `uint256` type. For example, calling the `getConversionRate()` function will now be changed into:

```solidity
require(msg.value.getConversionRate() >= minimumUsd, "didn't send enough ETH");
```

Here, `msg.value`, which is a `uint256` type, is extended to include the `getConversionRate()` function. The `msg.value` gets passed as the first argument to the function. If additional arguments are needed, they are passed in parentheses:

```solidity
uint256 result = msg.value.getConversionRate(123);
```

In this case, `123` is passed as the second `uint256` argument to the function.

### Conclusion

In this lesson, we explored the benefits of using _libraries_ to reuse code and add new functionalities. We created a `PriceConverter` library to handle `getPrice`, `getConversionRate`, and `getVersion` functions, demonstrating how to structure and utilize libraries effectively.

### 🧑‍💻 Test yourself

1. 📕 What are the differences between Solidity _libraries_ and _contracts_?
2. 📕 What are the consequences if a library function is not marked as `internal`?
3. 🧑‍💻 Create a simple library called `MathLibrary` that contains a function `sum` to add two `uint256` numbers. Then create a function `calculateSum` inside the `fundMe` contract that uses the `MathLibrary` function.
