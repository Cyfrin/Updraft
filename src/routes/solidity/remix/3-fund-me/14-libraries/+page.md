---
title: Libraries
---

_Follow along this chapter with the video bellow_

<iframe width="560" height="315" src="https://www.youtube.com/embed/HLqimKeA60s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Ever wanted to streamline your code by getting rid of some repeated functions or routine workflows? Is it too tiresome and annoying to rewrite code snippets to maintain pricing information? Well, then, you're in the right place! In this blog post, we will discuss an efficient way to solve these problems using Solidity Libraries.

Solidity Libraries are instrumental for reusing codes and adding functionality to different Solidity types. So, let's dive straight into some code and see how we can significantly refine our workflow.

## What is a Solidity Library?

Solidity Libraries are similar to contracts but do not allow the declaration of any state variables and you can't send ether to them. An important point to note is that a library gets embedded into the contract if all library functions are internal. And in case any library functions are not internal, the library must be deployed and then linked before the contract is deployed.

In this post, we will create a library that will allow us to work with our `getPrice`, `getConversionRate` and `getVersion` functions much more efficiently.

## Creating a New Library

Begin by creating a new file called `PriceConverter.sol`. This is going to accommodate the library we desire to create and we'll call it `PriceConverter`. We kickstart by providing the SPDX license identifier and a specified compiler pragma, in our case `0.8.18`. Be careful to replace the `contract` keyword with `library`.

```js
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.18;
    library PriceConverter {}
```

Remember, library in Solidity won't contain any state variables and must mark all the functions as `internal`.

Let's move our `getPrice`, `getConversionRate` and `getVersion` functions from the `FundMe.sol` contract to our new library. Follow the steps below:

- Go to `FundMe.sol`, and copy `getPrice`, `getConversionRate` and `getVersion` functions.
- Paste them in the `PriceConverter.sol`.
- Import the `AggregatorV3Interface` into `PriceConverter.sol`.

Now, mark all these functions as internal, and you've done setting up your library!

```js
library PriceConverter {
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.18;

    import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

    function getPrice() internal view returns (uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        (, int256 answer, , , ) = priceFeed.latestRoundData();
        return uint256(answer * 10000000000);
    }


    function getConversionRate(
        uint256 ethAmount
    ) internal view returns (uint256) {
        uint256 ethPrice = getPrice();
        uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1000000000000000000;
        return ethAmountInUsd;
    }
}
```

## Make your library functionalities accessible in contract

To use the library functions in your contract, import the library in your contract and attach it to the desired type. Here, we attach the library to `uint256` as follows:

```javascript
import "./PriceConverter.sol";
using PriceConverter for uint256;
```

Now, these library functions act as if they belonged to the `uint256` type. Even though you're not passing any variables in `getPrice()` and `getVersion()` functions, the value will still pass on and get ignored.

Calling the `getConversionRate()` function now looks like this:

```javascript
uint256 conversionRate = msg.value.getConversionRate();
```

Here, `msg.value`, which is a `uint256` type, has been enhanced to include the `getConversionRate()` function. The `msg.value` gets passed as the first argument to the function.

For more than one argument, the additional arguments will be passed after the first argument as demonstrated below:

```javascript
uint256 result = msg.value.getConversionRate(123);
```

Here `123` will be passed as the second `uint256` argument in the function.

## Final Thoughts

Congrats on creating your very first Solidity Library! Now, you can handle even complicated pricing details effortlessly! This process saves time and reduces the redundancy of code reuse across the project. It also helps to provide more clarity to the code by encapsulating some functionalities away from the smart contract.

In conclusion, Solidity libraries are a great way to enhance your contracts with additional functionalities, thereby contributing to more robust and cleanly written smart contracts. Happy coding!
