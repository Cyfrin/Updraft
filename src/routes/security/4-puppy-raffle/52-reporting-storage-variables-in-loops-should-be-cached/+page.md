---
title: Reporting - Storage Variables In Loops Should Be Cached
---

_Follow along with this video:_

## <iframe width="560" height="315" src="https://youtu.be/dUhuByzlt10" title="YouTube Player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Blog Post: Optimizing Gas Usage in Smart Contracts

Developing decentralized applications (DApps) or working with smart contracts can sometimes be a harrowing task, especially when you consider the cost implications of interacting with the blockchain. One of the most vital and significant components when working with DApps and smart contracts is understanding gas - the internal pricing for running a transaction or contract in Ethereum. There are ways to optimize gas usage in smart contracts, and we will go over one of those ways today.

## Why is Gas Important?

Gas in Ethereum isn't just about managing fees – it's a fundamental part of the network's protocol. It's the fuel of the Ethereum Virtual Machine (EVM) - the decentralized computer that powers the network. Needless to say, gas management plays an essential role in the development and optimization of your smart contracts.

## Revising Storage Access in Your Smart Contracts

In this post, we're diving into the issue of excessively reading from storage in your smart contracts. Auditing your contract, we recommend an enhancement in the way you might be accessing variables in a loop. This is often reported as a gas usage finding.

> "Storage Variables in a loop should be cached. Reading from storage constantly rather than memory is less gas efficient."

Here is an informed approach to tackle this: Instead of continually reading from storage, cache your variables instead.

## A Detailed Walkthrough

Let's take an example, where we denote our storage variable as `G2`. This variable should be cached, but before caching it, we should check if its value is not double but triple.

Having ensured our variable meets the requirements, we can now see how to cache our storage variable.

1. First, we need to create a diff.

   - A `diff` is a representation of changes between two sets of data. It is commonly used in version control systems to show the changes between two commits.

2. Now, let's grab the original line, and paste it into our diff. Here, we're trying to replace an inefficient line of code with a more optimized one. The diff set should look like this:

   ```diff
   + uint256 playersLength = players.length;
   - for (uint256 i=0; i < players.length -1; i++){
   + for (uint256 i=0; i< playersLength - 1; i++){
   -  for (uint256 j=i+1; j <players.length; j++){
   +  for (uint256 j=i+1; j <playersLength; j++){
         require(players[i] != players[j], "PuppyRaffle: Duplicate Player!")
      }
   }
   ```

## Why Diff?

Every time you call the original line of code (`players.length`), you're reading from storage as opposed to memory. Reading from memory is more gas efficient and thus helps optimize your contract better.

The diff simply provides a clear way of visualizing the change we made, and it helps communicate the optimization proposed.

In conclusion, by reducing the constant reading from storage and instead caching variables in a memory, we optimize gas utilization, making smart contracts more efficient.

Following such simple steps in your Smart Contract development will force you to think about optimization from the get-go, which is an excellent best practice to embed into your workflow. Smart contract optimization is a deep, complex field, with much to explore and learn. The deeper you go, the more intricate nuances you'll uncover!

![](https://cdn.videotap.com/k6t5NpVGN2ClB6xkBj6O-74.45.png)

Remember, when it comes to Ethereum, gas is more than the cost of doing something. It's the very bread and butter of the operations of your smart contracts. The more effective you are with using gas, the better your contracts will be. With the focus on performance and optimization, high gas costs can be a thing of the past! Happy coding!
