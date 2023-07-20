---
title: Interfaces
---

*Follow along this chapter with the video bellow*

<iframe width="560" height="315" src="https://www.youtube.com/embed/4tTBhEYgm-E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


Making transactions with Ethereum has become quite straightforward. But converting Ethereum into dollars or other currencies is where things get a little tricky. So today, we're going to take a deep dive into converting Ethereum into USD and interacting with other contracts lodged within the Ethereum blockchain.

## Converting Ethereum into USD

When it comes to determining whether the amount of Ethereum sent via a transaction meets a minimum USD value (e.g., $5), the conversion from Ethereum into USD becomes necessary. This conversion requires us to identify the price of Ethereum (or any other native blockchain token we're working with) in terms of USD; after which, we apply a conversion rate to ascertain its USD equivalent.

Now, let’s see how to implement these steps in code.

```js
    // Function to get the price of Ethereum in USD
    function getPrice() public {}
    // Function to convert a value based on the price
    function getConversionRate() public {}
```

The two functions we're going to create here, `getPrice()` and `getConversionRate()`, will serve our purposes. For the time being, we're making them public so we can easily test, play with, and fine-tune them as we see fit.

## Leveraging Chainlink for Ethereum Prices

Our primary source for Ethereum prices will be a Chainlink data feed. Chainlink documentation provides a basic example written in Solidity that demonstrates how to interact with their price feed. Take a look at it [here](https://docs.chain.link/docs/get-the-latest-price/).

This example makes use of the `latestRoundData` function of a contract at a given address, returning a multitude of data points. However, our interest is solely in the Ethereum price for the time being.

## Interfacing with the Contract

The process of interfacing with this contract (and subsequently getting the Ethereum price) requires us to know two essentials: the contract's address and its Application Binary Interface (ABI). The address is easy to access via the Chainlink documentation, specifically under the 'Price Feed Contracts' section.

As noted in Chainlink's contract addresses for Ethereum (ETH), we only need to obtain the Ethereum to USD price feed (ETH/USD!). You can access it [here](https://docs.chain.link/data-feeds/price-feeds/addresses).

Next, we tackle the ABI.

The simplest way to obtain the ABI is by importing, compiling, and deploying the entire contract — a somewhat cumbersome method for our current task, especially considering that we don't need to comprehend the whole contract. We only need a key: what methods (functions) can be called on this contract, their inputs, whether they're payable or view functions, and other similar details.

An alternate approach relies on the concept of `Interface`.

## Solidity Interface: A Mode of Interaction

In Solidity, an interface essentially is a declaration of methods without implemented logic — merely a list of possible interactions with a contract. The interface allows us to call these functions on the contract without needing the contract code. If the contract is deployed, the logic is also automatically included with it.

Chainlink's GitHub repository provides a detailed rundown of different contracts, and our focus is on the Aggregator V3 Interface. You can review it [here](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol). This interface is what we need to interact with the contract for our task. It contains the `getVersion()` function, among others, key for our usage.

By copying the interface and employing Remix, Solidity's online compiler, we can test the `getVersion()` function. Testing on testnets can be time-consuming; hence, it is best to defer full deployment until the end.

```js
    // Copy the Aggregator V3 Interface from Chainlink's GitHub
    AggregatorV3Interface interface = AggregatorV3Interface(0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419);
    // Create a function to call the getVersion() function in the interface
    function getVersion() public view returns (uint256) {
        return interface.version();
    }
```

These code snippets allow us to interact with the Chainlink Price Feed contract and retrieve the current version.

It's beneficial to remember that in the dynamic field of blockchain and Ethereum, learning is an ongoing cycle. Patience, persistence, and practice are your allies in harnessing the power of Ethereum and Solidity.

Join us in exploring this exciting technology, and together, let's keep coding!

<img src="/solidity/remix/lesson-4/interfaceslesson/interfaces1.png" style="width: 100%; height: auto;">
