---
title: delegateCall
---

_Follow along the course with this video._

---

### Delegate Call

In this section we're going to be learning how to build our own proxies and in order to do this we first need an understanding of the delegateCall function.

At it's core delegateCall is going to be similar to the call function we learnt about earlier. If you need a refresher, I encourage you to go back to the [**NFT lesson**](https://updraft.cyfrin.io/courses/advanced-foundry/how-to-create-an-NFT-collection/evm-opcodes-advanced?lesson_format=video) of this course for valuable context.

Many of the things I'll be going over here will be available through [**Solidity By Example**](https://solidity-by-example.org/delegatecall/) if you want more practice or insight.

Let's consider the two simple contracts provided as examples:

Contract B is very simple, it contains 3 storage variables which are set by the setVars function.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// NOTE: Deploy this contract first
contract B {
    // NOTE: storage layout must be the same as contract A
    uint256 public num;
    address public sender;
    uint256 public value;

    function setVars(uint256 _num) public payable {
        num = _num;
        sender = msg.sender;
        value = msg.value;
    }
}
```

If we recall, storage acts _kind of_ like an array and each storage variable is sequentially assigned a slot in storage, in the order in which the variable is declared in a contract.

![delegatecall1](/foundry-upgrades/2-delegatecall/delegatecall1.png)

Now consider Contract A:

```solidity
contract A {
    uint256 public num;
    address public sender;
    uint256 public value;

    function setVars(address _contract, uint256 _num) public payable {
        // A's storage is set, B is not modified.
        (bool success, bytes memory data) = _contract.delegatecall(
            abi.encodeWithSignature("setVars(uint256)", _num)
        );
    }
}
```

In contract A we're doing much the same thing, the biggest different of course being that we're using `delegateCall`.

This works fundamentally similar to `call`. In the case of `call` we would be calling the `setVars` function on Contract B and this would update the storage on Contract B, as you would expect.

With delegateCall however, we're borrowing the logic from Contract B and referencing the storage of Contract A. This is entirely independent of what the variables are actually named.

![delegatecall2](/foundry-upgrades/2-delegatecall/delegatecall2.png)

### Remix

Let's give this a shot ourselves, in Remix. If you'd like to try this yourself and follow along, you can copy the contract code from [**Solidity by Example**](https://solidity-by-example.org/delegatecall/).

Once the code has been pasted into Remix, we should be able to compile and begin with deploying Contract B. We can see that all of our storage variables begin empty.

![delegatecall3](/foundry-upgrades/2-delegatecall/delegatecall3.png)

By calling setVars and passing an argument, we can see how the storage variables within Contract B are updated as we've come to expect.

![delegatecall4](/foundry-upgrades/2-delegatecall/delegatecall4.png)

Now we can deploy Contract A. This contract should default to empty storage variables as well. When we call `setVars` on Contract A however, it's going to borrow the setVars logic from Contract B and we'll see it update it's own storage, rather than Contract B's.

> ❗ **NOTE**
> We'll need to pass Contract B as an input parameter to Contract A's setVars function so it knows where to delegate to!

![delegatecall5](/foundry-upgrades/2-delegatecall/delegatecall5.png)

Importantly, this behaviour, due to referencing storage slots directly, is independent of any naming conventions used for the variables themselves.

![delegatecall6](/foundry-upgrades/2-delegatecall/delegatecall6.png)

In fact, if Contract A didn't have any of it's own declared variables at all, the appropriate storage slots would _still_ be updated!

Now, this is where things get really interesting. What if we changed the variable type of `number` in Contract A to a `bool`? If we then call delegateCall on Contract B, we'll see it's set our storage slot to `true`. The bool type detects our input as `true`, with `0` being the only acceptable input for `false`.

![delegatecall7](/foundry-upgrades/2-delegatecall/delegatecall7.png)

### Wrap Up

Low-level functions like `call` and `delegateCall` are powerful, but risky. They allow us to send/receive arbitrary function calls, or to route function calls to specific implementation addresses, but as we've seen, a special attention must be paid to how storage is handled or various clashes and unexpected behaviour may arise.
