---
title: Small Proxy Example
---

_Follow along with the video_

---

# Working with Small Proxies in Ethereum Smart Contracts: A Mini Guide

In today's post, we are going to heat things up by looking into a minimal proxy example in Ethereum smart contracts. We'll show you how a contract can be used as a singular address, yet the underlying code can change significantly. All the code we will be diving into can be found in the `hardhut upgrades, FCC sublesson, smallproxy.sol` file which you can use for a seamless follow-along.

![](https://cdn.videotap.com/EtT6EPapjkwEGHmyVGsd-18.85.png)## A complex but necessary guide to Proxies

Consider this a fair warning as this blog post might get a bit complex for some, even for seasoned developers. However, don't let this intimidate you as you can guide yourself through this process and perhaps discover for yourself the core mechanisms on how actually to build these proxies.

![](https://cdn.videotap.com/IdPEWc2Jhf5t5vm04mpv-47.12.png)**Note: If you feel like skipping this entirely, it's for you to decide. However, the understanding of the mechanisms behind these scenes can be remarkably enlightening, hence worth a try.**

## Getting Started with Small Proxy

Let's kick things off with my minimalistic starting position. We start with a small proxy known as `is proxy` and to facilitate getting into the proxy, we import this Proxy.sol from OpenZeppelin. OpenZeppelin has a minimalistic proxy contract that comes in handy to start working on this delegate call.

![](https://cdn.videotap.com/NboihfPIxMCRMCj2gkhn-84.82.png)Our contract will rely a lot on assembly language (an intermediate language also known as Yule), which compiles bytecode for different backends. It, in essence, is a form of inline assembly inside solidity which allows you to write code that is extremely low level - as close to the opcodes as you can get.

I am not going to digress into how Yule works, but having even an advanced understanding isn't going to simplify it much. Because of its low-level nature, it's relatively easy to make mistakes, so I recommend using as little Yule as possible.

## Diving Deeper in Small Proxy

Our delegate function can be found in the inline assembly which is Yule. It performs various low-level tasks, but primarily it handles the delegate call functionality.

The Fallback and receive functions are used extensively. Whenever it encounters a function it can't recognize, it resorts to Fallback and the Fallback brings in our delegate function into play. This means that anytime a proxy contract receives data for a function it doesn't recognize, it sends it over to an implementation contract where it will call it with delegate call.

We also have setImplementation that modifies where those delegate calls are sent to. This is analogous to upgrading your smart contract. We can also read where the implementation contract is in case of implementation here if need be.

It's crucial to note that when working with proxies, it's better to have nothing in storage since it could contradict with a delegate call that alters some storage. However, there will be instances when we will need to store the implementation's address to initiate a call.

This is where EIP 1976 (or standard proxy storage slot) comes into play. The EIP, an Ethereum Improvement Proposal, reserves certain storage slots explicitly for proxies.

In our minimalistic case here, we allocate byte 32 private constant implementation_slot to that storage slot. And it will ascertain the location of the implementation address. The function of the proxy is to pass over to whatever is inside the implementation_slot address, any contract that calls this proxy contract.

> "That's how our proxy works. Any contract that calls this proxy contract, if it's not this setImplementation function, it's going to pass it over to whatever is inside the implementation_slot address."

Here's an example of how Yule (inline assembly) is used in our contract to change the logic:

```shell
assembly {sstore(implementation_slot, _new_implementation)}
```

## A Quick Demo

To demonstrate the effectiveness of this technique, We will create a simple contract, say `contract implementation A`, with a simple function that changes some public value.

Now, anytime someone calls our `smallProxy.sol`, our small proxy contract, it's going to delegate the call over to our implementation A and save the storage into our small proxy address. Consequently, we will call our small proxy with the data to use this set value function selector to implement this scenario.

To simplify the process, we can define a helper function `getDatatoTransact().` Here's a quick look at the function:

```js
function getDatatoTransact(address _implementation_address, uint256 numberToUpdate) public pure returns (bytes memory) {return abi.encodeWithSignature("setData(uint256)", numberToUpdate);}
```

We will carry forward the data to transact, and we know for sure that when `implementation A` is called from our `smallProxy.sol`, it will update the small proxy's storage.

To verify the update, we can write a function in solidity to read our storage in small proxy. Here's the implementation of the function:

```js
function readStorage() public view returns (uint256) {uint256 valueAtStorageSlot0;assembly {valueAtStorageSlot0 := sload(0)}return valueAtStorageSlot0;}
```

This function reads directly from storage. However, please remember that we are dealing with inline assembly her as we are doing all this low-level stuff.

After setting up the contract, we can move forward and deploy our `smallProxy.sol` and set our implementation A. Now our `smallProxy.sol` has a function called `setImplementation()`.

So, we tell our proxy contract that anytime it receives a call, it should delegate the call to our `implementation A`. We do this by simply grabbing `implementation A's ` address and pasting it into `setImplementation()`. What will happen next is fascinating.

Using 777 as a dummy input, we call the `smallProxy.sol` with it, and the proxy contract doesn't recognize the function within its code and therefore calls our `fallback()` function.

> "The `fallback()` function is borrowed from `OpenZeppelin`, and what it essentially does is delegate calling."

In simpler terms, when our `smallProxy.sol` doesn't recognize a function, it borrows that function from `implementation A` and uses it on itself.

Once I execute this setup in the Ethereum environment, I can successfully call the `readStorage()` function and witness the magic. The value returned would be indeed 777, as intended. Now here's where the true power of proxy contracts and delegate calls shines.

## Upgrading our Proxy Contract

Let's consider a scenario where we want to update our code. We don't like contract `implementation A` anymore. To solve this, we can create another contract named `implementation B`. Let's say whenever someone calls `setValue()`, we add 2 to the `newValue`.

To implement this scenario, we can save, compile, and deploy `implementation B`. Subsequently, we can call `setImplementation()` in our proxy with `implementation B's` address instead of `implementation A's`. Suddenly, we have now upgraded from `implementation A` to `implementation B`.

![](https://cdn.videotap.com/GI66Ar4UVHZaJYHkqphA-537.21.png)Now when we are still going to call `setValue()` with 777, but we will be delegate calling to `implementation B` instead of `implementation A`. When I put the same data into the low-level call data, the delegate call goes through. Now when I read the storage, the value returned will be 779 since the function in `implementation B` does `value = newValue + 2`.

So this is a simplistic example of how the upgrading process works. With this setup, now we can ask users to make all function calls to `smallProxy.sol`, and they'll be good to go. However, it does mean that the developers of the protocol can change the underlying logic anytime.

> "That's why it's of utmost importance to go through the code and check who holds the developer keys and whether a contract can be updated. Always remember, if a contract can be updated and a single person can do so, you have a single centralized point of failure, and technically, the contract isn't decentralized."

## Function Selector Clashes

In this post, I've also spoken about function selector clashes. For instance, when we call set `Implementation()`, the proxy function, `setImplementation()` gets called because the fallback is not triggered as it can see the function is present. However, if we have a function called `setImplementation()` in our implementation, this can never be executed.

This is because every time we send a function signature of `setImplementation()`, it's always going to call the one on the proxy. These selector clashes can be avoided using transparent and universal upgradable proxies.

![](https://cdn.videotap.com/7HtWzbHZ67j8eDeuCcfQ-622.03.png)## Wrapping it up

This post has been quite a deep dive into proxies, assembly and low-level stuff and may require going through it a couple of times, playing around with Solidity and Remix. But I hope the concept is clearer now.

This is a section where seeing really is believing. So, I urge you to jump into remix, test this and play around with it and see what you can break and fiddle with.

Feel free to share your thoughts in the discussion thread or form a new discussion about proxies, Yule, setImplemenation etc. Connect with others taking the course, and share your experiences.

I know this is a really advanced section and requires you to have gone through a lot of the sublessons before, maybe even more than once. But I promise, your hard work will pay off.

Happy coding!

<img src="/security-section-1/12-upgradeable/upgrades1.png" style="width: 100%; height: auto;" alt="block fee">
