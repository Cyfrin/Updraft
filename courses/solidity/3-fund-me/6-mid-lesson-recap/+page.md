---
title: Mid Lesson Recap
---

_Follow along this chapter with the video bellow_



<!-- <img src="/solidity/remix/lesson-4/datafeeds/datafeed3.png" style="width: 100%; height: auto;"> -->

Just before we get deeper, let's do a quick review of what we have covered so far. We understand we haven't written that much code, but we've definitely gone over a ton of concepts. We've learned about native blockchain tokens such as Ethereum, as well as crucial elements to incorporate in your smart contract, like marking a function as payable whenever there is a need to receive native blockchain token in a function, among others.

## Payable and Required Statements in Smart Contract Functions

In the decentralized world of blockchain, a transaction does not just occur. This is especially true when you want to force a transaction to do something specific or want it to fail under certain circumstances. One of the requirements for a function to receive a native blockchain token such as Ethereum is to mark it as payable. Here is a simple yet illustrative code showing how to make a function payable.

```js
function deposit() public payable {
    balances[msg.sender] += msg.value;
}
```

The critical bit here is `payable`, which allows the function to accept Ethereum as part of the process. Remember, the function must be marked `payable` in order to receive ether in a transaction.

<img src="/solidity/remix/lesson-4/midlesson/midlesson1.png" style="width: 100%; height: auto;">

But what happens when you would like an operation to fail if a particular condition is not met? This is where `require` statements come in handy. For instance, when making a bank transfer, we want the operation to fail if the sender does not have enough balance. Here's an example;

```js
function transfer(address recipient, uint amount) public {
    require(balances[msg.sender] >= amount);
    balances[msg.sender] -= amount;
    balances[recipient] += amount;
}
```

In this piece of code, if the condition `balances[msg.sender] >= amount` is not met, the transaction will revert. This literally means the operation undoes any work it previously did and returns the initially used gas to the user. In other words, `require` can be viewed as a gatekeeper, only allowing transactions to proceed when certain conditions are met.

Moreover, obtaining values sent with a transaction is achieved via the solidity global `msg.value` property. This comes in handy when you need to handle values within a transaction context.

## Integrating External Data with Chainlink

Chainlink is a revolutionary technology for getting external data and computation into our smart contracts. It provides a decentralized way of injecting data into your smart contract which is particularly useful for assets whose values change over time. For instance, if your smart contract deals with real-world assets such as stocks or commodities, obtaining real-time pricing information is crucial.

This is where the Chainlink data feeds or Chainlink price feeds come in. It helps in sourcing this pricing information in a decentralized manner — hence reflecting the real-world fluctuation of asset prices in your smart contracts.

<img src="/solidity/remix/lesson-4/midlesson/midlesson2.png" style="width: 100%; height: auto;">

To illustrate this, let's consider that we are building a smart contract that deals with commodities like Gold. Chainlink price feeds can give real-time gold prices, allowing your smart contract to reflect the real world market prices.

```js
import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";
contract GoldPriceContract {
    AggregatorV3Interface internal priceFeed;
    //The Chainlink price feed contract address
    constructor() public {priceFeed = AggregatorV3Interface(0x8468b2bDCE073A157E560AA4D9CcF6dB1DB98507);}
    // Get the latest gold price
    function getLatestGoldPrice() public view returns (int) {
        (,int price,,,) = priceFeed.latestRoundData();
        return price;
        }
    }
```

In this example, Chainlink feeds are used to query the latest price of Gold. It can then be used in a more complex calculation according to the logic of your contract.

To summarise, Chainlink is a tool that broadens the capabilities of smart contracts by enabling access to real-world data and computations. By learning how to use it, it's easy to see that the potential applications for smart contracts are virtually limitless!
