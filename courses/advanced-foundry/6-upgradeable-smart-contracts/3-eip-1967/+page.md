---
title: EIP-1967 Proxy
---

_**Follow along with this video.**_



---

Have you ever wondered how a contract can be used as a singular address, but the underlying code can change? Buckle up, because we'll be exploring this topic by building a simple yet fascinating contract known as a “Proxy Contract”.

## Before we begin

This walkthrough requires some advanced understanding of Ethereum and Solidity. However, if you're passionate about learning the ropes, feel free to tag along. We'll be basing our coding process on the Hardhat upgrades library.

You can find this library in the course repo, `SmallProxy.sol` template. Here's the Code: [Code Link](https://github.com/Cyfrin/foundry-upgrades-f23/blob/main/src/sublesson/SmallProxy.sol)

## Welcome to the world of Proxy Contracts

We start with a minimalistic starting proxy template from OpenZeppelin library called `SmallProxy.sol`. This is a low-level contract built mostly in assembly, Yul.

**Yul, you ask?**

Yul is an intermediate language that can be compiled to bytecode for different backends. It allows developers to write difficult yet super effective low-level code close to the opcodes.

<img src="/upgrades/3-proxy/proxy1.png" style="width: 100%; height: auto;">

In our proxy contract, we have this `delegate()` function that uses inline assembly (Yul). Though it does many things, its main job is to perform delegate call functionality.

The proxy utilizes two generic fallback functions to process unrecognized function calls:

1. **Fallback:** Anytime the proxy contract receives data for an unrecognized function, it triggers a callback that involves our `delegate()` function.
2. **Receive:** Whenever it receives a function it doesn't recognize, it'll call `Fallback` and `Fallback` calls our `delegate()` function.

Through these fallback functions, the contract processes data for an unrecognized function and delegates it to the implementation contract through delegate call.

## Building a Minimalistic Proxy

With our understanding in place, let's take it a step further by setting and reading our implementation addresses.

The proxy we'll be creating will feature a function called `setImplementation()` which "upgrades" the smart contract by changing the delegated calls' recipient.

The `_implementation()` function will be there for us to see where the implementation contract is. There's one thing you need to know though:

<img src="/upgrades/3-proxy/proxy2.png" style="width: 100%; height: auto;">

This is where EIP 1976 comes into play. It’s an Ethereum Improvement Proposal for using certain storage slots specifically for proxies. We'll use EIP 1976 to store our implementation's address by assigning it into a constant storage slot.

The logic of our proxy will operate like this: If any contract calls our proxy contract excluding the `setImplementation` function, it'll be passed over to the stored implementation address from our constant storage slot.

Let's take it step by step though.

1. **Step 1 - Building the Implementation Contract**: We’ll start by creating a dummy contract `implementation A`. This contract will have a uint256 public value and a function to set the value.

```js
contract ImplementationA {
    uint256 public value;

    function setValue(uint256 newValue) public {
        value = newValue;
    }
}
```

2. **Step 2 - Creating a Helper Function**: So that we can easily figure out how to get the data, we'll create a helper function named `getDataToTransact`.

```js
function getDataToTransact(
        uint256 numberToUpdate
    ) public pure returns (bytes memory) {
        return abi.encodeWithSignature("setValue(uint256)", numberToUpdate);
    }
```

3. **Step 3 - Reading the Proxy**: Next up, we create a function in Solidity named `readStorage` to read our storage in small proxy.

```js
function readStorage()
        public
        view
        returns (uint256 valueAtStorageSlotZero)
    {
        assembly {
            valueAtStorageSlotZero := sload(0)
        }
    }
}
```

4. **Step 4 - Deployment and Upgrading**: We'll now go ahead and deploy our small proxy and implementation A. Let’s grab implementation A's address and feed it into the `set implementation` function.
5. **Step 5 - The Core Logic**: When we call the small proxy with data, it's going to delegate our call to implementation A and save the storage in the small proxy address. To process this, the proxy will use the `set value` function selector and update our small proxy's storage.
6. **Step 6 - _Isometrics_**: To ensure that our logic works correctly, we'll read the output from the function `read storage`. To make this test even more exciting, let's create a new implementation contract `Implementation B` and update our code.

Every time someone calls `set value`, the function will return `new value + 2` instead of just the new value. We recompile and redeploy this contract then run `set implementation` with `Implementation B's` address.

The moment of truth? If we call our small proxy using the same data, then `read storage` should now return `779`.

## Wrapping Up

This is just a simple representation of how we can upgrade contracts in Ethereum. With proxy contracts, clients can always interact with a single address (the proxy address) and have their function calls processed correctly even when the underlying logic changes.

Just a heads up though, it is crucial to ensure that you understand who has access to upgrade the contract. If a single person can upgrade it, then we risk making our contract a single point of failure and the contract isn't even decentralized.

The proxy contract I used is simple and comes with its own share of limitations. Notably, it can't process function receiver clashes correctly. For example, if we have a function `set implementation` in the proxy and implementation, the proxy's function is the one that is always called.

To deal with these and other similar issues, there are two popular proxy patterns to consider; `Transparent` and `Universal upgradable proxy`.

Notwithstanding, don't hesitate to make a new discussion about proxies in the discussions thread if you still find them perplexing.

This section is very advanced and requires a deep understanding of the previous sublessons. I strongly recommend that you growth hack your understanding by playing around with Solidity and remix.

Believe it or not, this is one of those areas where seeing is believing. So, don't just read here! Jump into remix and play around with this functionality. Break and fiddle till you get the hang of it.

**Happy learning!**
