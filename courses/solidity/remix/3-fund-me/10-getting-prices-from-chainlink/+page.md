---
title: Getting Prices from Chainlink
---

*Follow along this chapter with the video bellow*

<iframe width="560" height="315" src="https://www.youtube.com/embed/fQVIYzZxv1c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


When it comes to blockchain development and interaction with smart contracts, JSON RPC interfaces and Application Binary Interfaces (ABIs) play an essential role. One such interface is the Aggregator V3, which provides a minimalistic ABI for developers to interact with their contracts. Today, we'll explore how to extract requested pricing information using Solidity.

## Creating a New Contract Instance

The `AggregatorV3` interface encloses the prerequisites like the `latestRoundData` function which is commodious for getting the latest price.

To proceed, we'll initiate declaring the `AggregatorV3` interface and creating a new variable named `priceFeed`. This variable will denote a contract instance at a specific address, which is legit for Sapolia network:

```js
    AggregatorV3Interface priceFeed = AggregatorV3Interface(/*address to your contract*/)

```

The object `priceFeed` now allows us to summon the `latestRoundData` function on it.

## Summoning latestRoundData

In the official documentation on GitHub, `latestRoundData` is described to return multiple results, including the last round ID, price, the time the price started on-chain, timestamp, and the round ID of the last round when the price was answered. However, we'd only be concerned with the price for now, so we'll exclude other return types:

```js
function getLatestPrice() public view returns (int) {
    (,int price,,,) = priceFeed.latestRoundData();
    return price;
}
```

Here, we leave the commas to placeholders for exit variables, which we don't need.

Our new function `getLatestPrice()` now extracts the latest price from the `latestRoundData()` function. This function returns the value of Ether in USD.

Generally, the returned price exists as an integer since Solidity's incompatibility with decimals. This brings us to the tricky part of compatibility between `price` (a `uint256`) and `msg.value` which is an `int256`.

## Dealing with Decimals

Typically, `msg.value` has 18 decimal places. This means that the `price` returned from our `latestRoundData` function isn't compatible with `msg.value`. To make them match, we simply multiply `price` by `1e10`:

```js
return price * 1e10;
```

There's been a little confusion here. `Price` is an `int256` and `msg.value` is a `uint256`. At this juncture, we will perform an operation known as 'typecasting' to convert the 'price' from `int256` to `uint256`.

## Typecasting in Solidity

Typecasting is an operation you can use to convert one datatype into another. It's important to note that not all datatypes can be converted into one another, but for our situation, we can boldly convert an `int` to a `uint`.

```js
return uint(price) * 1e10;
```

So, we've managed to get the same number of decimals for both the variables, and also ensured that they're now of the same type; in other words, made them compatible for mathematical operations.

Being a function that reads storage without modifying any state, our function can be made a `view` function and it should return a `uint256`:

```js
function getLatestPrice() public view returns (uint) {
    (,int price,,,) = priceFeed.latestRoundData();
    return uint(price) * 1e10;
    }
```

By compiling our contract now, we refactor all earlier warnings and errors.

Working with Solidity can be arduous, especially since there aren't any decimal places, but practice makes perfect!

<img src="/solidity/remix/lesson-4/prices/prices1.png" style="width: 100%; height: auto;">


As long as we keep in mind the limitations of Solidity and Ethereum, we can take advantage of what they offer to create compelling smart contracts and applications. And with that, you've now learned how to make sense of `AggregatorV3Interface` to extract useful contract data. We are certain that armed with this knowledge, you can advance your smart contract development skills to greater heights.

But we are just getting started. In the next lesson, we'll explore more Solidity Math, so stay tuned!