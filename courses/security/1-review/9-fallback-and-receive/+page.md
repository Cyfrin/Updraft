---
title: Fallback and Receive
---

_Follow along with the video_

<iframe width="560" height="315" src="https://www.youtube.com/embed/pTn0Kfp9JHg?si=C_BCMPCQJFhpuCrf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

In the world of Solidity smart contracts, it's important to understand the fallback and receive functions. By default, Solidity smart contracts reject any Ether (ETH) sent to them. Want your smart contract to accept ETH? Let's dive into the functionality and practical instances of the fallback and receive functions.

## What are the Fallback and Receive functions?

These two specific functions - `fallback` and `receive` - enable a contract to accept and react to native ETH sent to it. Both these functions can be made "**external payable**", indicating that they can receive and handle ETH.

So, how do they function? Here's the core logic to give you a better understanding:

1. A call is made to a contract and the message data is empty.
2. Solidity checks if there's a `receive` function.
   - If a `receive` function is present, it gets invoked.
   - If not, the `fallback` function is called.

To put it simply, consider the case of sending ETH to a smart contract without any data. In such an instance, the `receive` function would be called, resorting to `fallback` if the `receive` function does not exist.

On the other hand, if there _is_ data, Solidity will skip straight to the `fallback` function, bypassing the `receive` function entirely.

## Default Settings in Solidity

It is worthwhile to note that the `fallback` function may or may not be payable. If the contract lacks a `receive` function and the `fallback` function isn't payable, then the `fallback` function won't be called when you send ETH to the contract.

By the same token, a contract that does not contain any of these functions will reject any ETH sent to it. In fact, Solidity will automatically compile this contract to reject ETH.

## Deepening Understanding: Encoding

These mechanisms are undeniably crucial when it comes to the functionality of a smart contract. Especially as one ventures deeper into security territory. As such, we decided to take some time to cover encoding - a more complex topic within the same spectrum - in our Foundry course.

> "We're going to watch a clip from the Foundry full course, which explains encoding, and then also explains eventually how to use encoding to call any smart contract from any other smart contract."

In conclusion, learning the ropes of smart contract coding can seem daunting but with the right understanding of key concepts like the fallback and receive functions as well as encoding, it’s surely manageable. By harnessing the power of Solidity, you can create powerful smart contracts that not only accept ETH, but can call other smart contracts leading to the creation of a network of contracts all interacting with each other.
