---
title: Transfer, Send and Call
---

_Follow along this chapter with the video bellow_

<iframe width="560" height="315" src="https://www.youtube.com/embed/Z_HPzbzZ-k4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

One important aspect is understanding how to securely and effectively withdraw funds from a smart contract. This tutorial explores three different methods of doing this – `transfer`, `send`, and `call`. We will examine their differences, understand how each one works, and determine when to use each strategy.

## Transfer Function In Ethereum

We start by discussing the `transfer` function, mostly due to its simplicity and straightforwardness. Here is a basic representation of how to use this function:

```js
payable(msg.sender).transfer(address(this).balance);
```

We utilize `msg.sender` which refers to the address initiating the transaction. The `transfer` function is used to send the specified amount of Ether (or the native cryptocurrency on the current blockchain).

It is worth noting the necessity of converting the `msg.sender` to a payable address to facilitate the transfer. This is achieved by wrapping the `msg.sender` with the `payable` keyword.

However, `transfer` has a significant limitation. It can only use up to 2300 gas and it reverts any transaction that exceeds the gas limit. When your transaction requires more gas, this function fails and reverts the transaction entirely. Additionally, [Solidity by example](https://solidity-by-example.org/sending-ether/) offers an excellent reference point for this discussion.

## Send Function

Our second method is the `send` function. Syntax-wise, it is similar to `transfer`, but it has a slightly different behavior. Here is how you would write it:

```js
bool success = payable(msg.sender).send(address(this).balance);
equire(success, "Send failed");
```

Similar to the `transfer` function, `send` also has a gas limit of 2300. However, instead of completely reverting the transaction, it returns a Boolean value (`true` or `false`) to indicate the success or failure of the transaction. In case of failure, the contract is still intact. It is your responsibility as a developer to ensure that errors are caught, which is the purpose of `require(success, "Send failed");`. This line of code enforces that the send operation must be successful.

## Call Function

Finally, the `call` function is the most flexible and powerful of the three. It can be used to call virtually any function in Ethereum without requiring the function's abi (application binary interface). More importantly, it does not have a capped gas limit. It forwards all available gas to the transaction.

```js
(bool success, ) = payable(msg.sender).call{value: address(this).balance}("");
require(success, "Call failed");
```

To send funds using the `call` function, we modify our syntax slightly by including squiggly brackets `{'{'}...{'}'}`, where we can add details about the transaction, such as the value being transacted.

The `call` function also returns two variables: a Boolean for success or failure, and a byte object which stores returned data if any. The code `require(success, "Call failed");` ensures that the transaction must succeed, similar to the `send` method.

<img src="/solidity/remix/lesson-4/transfer/transfer1.png" style="width: 100%; height: auto;">

However, understanding the difference between these three functions may be challenging initially. Don't worry! Continue experimenting and learning about lower-level functions and the concept of gas. Go back to this tutorial when you have a broader understanding of these topics.

Feel free to refer to [Solidity, by example](http://solidity-by-example.org), which provides a comprehensive comparison among these three functions. To summarize, `transfer` throws errors when transactions fail and is capped at 2300 gas. `send` operates similarly but returns a Boolean value instead of reverting the entire transaction. `call`, on the other hand, forwards any available gas and is therefore not capped, returning a Boolean value similar to `send`.

Hopefully, this tutorial makes it clear how to use these three functions to send and transfer Ethereum or other blockchain native currency tokens.

Keep Learning and we will see you in the next chapter!
