---
title: More Solidity Math
---

*Follow along this chapter with the video bellow*




In this lesson, we're going to walk through the conversion of the Ethereum value to USD using Solidity. The purpose of this tutorial is to understand how Ethereum contract operations work, using the `getPrice` and `getConversionRate` functions.

## Settling Down with the `getPrice` Function

The `getPrice` function returns the value of Ethereum in terms of USD. This value is returned as a `uint256`. Armed with this handy function, we can convert message value into dollar terms.

## Breaking Down the `getConversionRate` Function

The `getConversionRate` function takes a `uint256` Ethereum (ETH) amount as input. The core objective of this function is to convert ETH into USD dollar value.


### Understanding the Importance of Decimal Places

In Solidity, due to the lack of decimal numbers (only whole numbers work), we should always multiply before dividing. Coupled with the fact that both values have 18 decimal places, we have to divide the final calculated product by `1E18`.

<img src="/solidity/remix/lesson-4/math/math1.png" style="width: 100%; height: auto;">

For instance, let's put $2000 as ETH's value in dollar terms. The calculation would look like this:

1. `ETH_Price`= $2000 (with 18 decimal places)
2. Multiply ETH\_Price by 1 ETH
3. Now we'll have an extra 36 decimal places since 1 ETH also has 18 decimal places
4. Divide the result with `1E18`

This function helps to handle the bulk of the math conversions for us. It takes our ETH amount and returns its equivalent in USD.

## Value Validation

Now, if we want to magnify the application of this function, let's assume we want to check if our users are sending at least $5.

```js   
    getConversionRate(msg.value) >= Minimum_USD
    // In other terms:
    require(PriceConverter.getConversionRate(msg.value) >= MINIMUM_USD, "You need to spend more ETH!");
```

The value returned by `getConversionRate` function are calculated in 18 decimal places, so our $5 threshold would be `5E18` or `5*1E18`.

## Deployment to the Testnet

Let's say we deploy this to a testnet. After a long pause, we get our deployed contract. Using the `getPrice` function, we would get the current value of Ethereum.

Now, if we try to add $5 to the fund, we'll probably get an error saying,

```js
Gas estimation failed. Error execution reverted, didn't send enough ETH.
```
<img src="/solidity/remix/lesson-4/math/math2.png" style="width: 100%; height: auto;">


This error is triggered when the amount in ETH is less than our $5 benchmark.


But if we attempt to fund with at least $5 worth of ETH,

Our transaction gets through probably and shows no sign of the previous gas error.

## Wrapping Up

Solidity is a powerful language for writing smart contracts, and the ability to convert Ethereum into USD is a fundamental task.

As it stands, the `getConversionRate` function is working effectively in routing transactions worth less than $5 and ratifying ones equivalent to or more than $5 worth of ETH.

In our future lessons, the focus will be on withdrawal functions and contract interactions using Solidity. But for now, it's time to move forward!

<img src="/solidity/remix/lesson-4/math/math3.png" style="width: 100%; height: auto;">


Happy Coding!
