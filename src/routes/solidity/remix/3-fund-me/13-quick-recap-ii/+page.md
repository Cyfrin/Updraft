---
title: Quick Recap II
---

*Follow along this chapter with the video bellow*

<iframe width="560" height="315" src="https://www.youtube.com/embed/NLTKk9k8eTE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

# Advanced Solidity: A Comprehensive Refresher

Hey you, welcome back! Having ventured into the depths of Advanced Solidity, We are sure you have been inundated with loads of information, from compiler instructions to price feeds. Let's re-trace our learning path and perform a detailed recap of what we've tackled so far. Remember, every move in the arduous world of Solidity programming counts.

## Starting With a Contract: Address and Abi

The bedrock of any smart contract is the `address` and `Abi` (Application Binary Interface.) Remember, to interact with any contract, you need these two elements ideally. In the most straightforward terms, an `address` is similar to a house number that helps identify the specific contract in the blockchain universe. The `Abi`, on the other hand, is a manual revealing how the contract can be used.

```js
    // In JavaScript
    let contractAddress = "0x....";
    let contractAbi = [...];
```

<img src="/solidity/remix/lesson-4/recap/recap1.png" style="width: 100%; height: auto;">

## Interfacing with the Contract

To get the Abi easily and subsequently interact with another contract, you need to compile an interface. This is a critical step, akin to building a radio set that helps you tune into the contract's frequency. Combining the contract `address` with the interface essentially streamlines calling on the contract's functions.


## Linking Up: Using Chainlink Price Feeds

In our sturdy armor of Solidity programming, [Chainlink Price Feeds](https://docs.chain.link/docs/using-chainlink-reference-contracts/) are the trusty sword. They provide an efficient way to access real-world data, particularly **pricing data**, and inject it into our smart contracts – a process that's as seamless as sipping coffee while going through the morning news!

<img src="/solidity/remix/lesson-4/recap/recap2.png" style="width: 100%; height: auto;">


## Making Math Work in the EVM

When it comes to working with mathematics in Solidity and the Ethereum Virtual Machine (EVM) in general, decimals are a no-go zone - they just don't play well in here. So, make sure you're always using the correct unit conversion when dealing with your contracts.


## Getting to Grips with Global Units in Solidity

Dominated by two players: `msg.value` and `msg.sender`, globally available units in Solidity tell a lot about the transaction at hand. `msg.sender` refers to the account that started the current function call, while `msg.value` represents the number of wei sent with that particular function call.

```js
    function updateValue() public payable {
        require(msg.value >= 1 ether, "Not enough Ether provided.");
    }
```

<img src="/solidity/remix/lesson-4/recap/recap3.png" style="width: 100%; height: auto;">

To wrap it up, I believe you now have a thorough understanding - if not a complete masterclass of what we've learned so far in Advanced Solidity. As we continue our journey, always remember that understanding and mastering the basics create a solid foundation for the complex elements to come as we further demystify Solidity!