---
title: Fallback and Receive
---

_Follow along with the video_

---

In the world of Solidity smart contracts, it's important to understand the fallback and receive functions. By default, Solidity smart contracts reject any Ether (ETH) sent to them. In order to enable your contract to accept ETH, we would implement `fallback` and `receive` functions. Let's look at these more closely.

## What are the Fallback and Receive functions?

These two specific functions - `fallback` and `receive` - enable a contract to accept and react to native ETH sent to it. Both these functions can be made "**external payable**", indicating that they can receive and handle ETH.

So, how do they function? Here's the core logic to give you a better understanding:

![block fee](/security-section-1/9-fallback-receive/fallback-receive1.png)

To put it simply, consider the case of sending ETH to a smart contract without any data. In such an instance, the `receive` function would be called, resorting to `fallback` if the `receive` function does not exist.

On the other hand, if there _is_ data, Solidity will skip straight to the `fallback` function, bypassing the `receive` function entirely.

## Default Settings in Solidity

It is worthwhile to note that the `fallback` function may or may not be payable. If the contract lacks a `receive` function and the `fallback` function isn't payable, then the `fallback` function won't be called when you send ETH to the contract.

```js
fallback() external{}
receive() external payable {}
```

By the same token, a contract that does not contain any of these functions will reject any ETH sent to it. In fact, Solidity will automatically compile this contract to reject ETH - with at least one notable exception we'll go over later.

## Deepening Understanding: Encoding

The next lesson is a clip you might remember from the Foundry Course. We're going to go over encoding and explain how it can be used to call any function on any contract from another contract.

Let's do it.
