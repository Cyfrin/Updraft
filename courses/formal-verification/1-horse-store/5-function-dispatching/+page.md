---
title: What is function dispatching
---

_Follow along with this video:_

---

## A Closer Look at Call Data with Huff

Lets start by taking a closer look at what's happening during transactions on the blockchain. I'll remind you of the code for `HorseStore.sol` below.

```js

// SPDX-License-Identifier: GPL-3.0-only
pragma solidity 0.8.20;

contract HorseStore {
    uint256 numberOfHorses;

    function updateHorseNumber(uint256 newNumberOfHorses) external {
        numberOfHorses = newNumberOfHorses;
    }

    function readNumberOfHorses() external view returns (uint256) {
        return numberOfHorses;
    }
}

```

By deploying this contract in remix and calling the `updateNumberOfHorses()` function, we're provided an output that looks like this:

![function-dispatching-1](/formal-verification-1/4-function-dispatching/function-dispatching-1.png)

We're most interested in the `input` data.

```
0xe026c0170000000000000000000000000000000000000000000000000000000000000001
```

## How Call Data Works

At first glance this input data may seem like a "jumble of numbers". This input is called the **calldata**, and it is crucial because it tells the smart contract what task to perform.

So, we're left with a few questions

1. Where did this data come from? How did Remix know to send this data?
2. How does Remix know to update the number of horses with this data?

We're going to answer these questions with Huff!

## Function Selectors

_Where did this data come from?_

For those who have taken the Foundry Advance course, you know what a function selector is (for those who haven't go do that [**HERE**](https://updraft.cyfrin.io/courses/advanced-foundry)!)

In short, every function in Solidity has a **signature** - a unique identifier formed by hashing its name and input types. The first 4 bytes of the calldata correspond to the function selector.

So when you call `updateNumberOfHorses`, Remix sends the selector `0xe026c017` at the start of the calldata. This acts like an address, telling Solidity which specific function you want to call.

You can confirm this function selector in Foundry with the command:

```bash
cast sig "updateHorseNumber(uint256)"
0xe026c017
```

## Function Dispatching

Behind the scenes, Solidity has a **function dispatcher** that matches the selector to the intended function and routes the call accordingly. This dispatching is handled natively when the solidity is compiled.

However, if writing in a lower-level language like Huff, you have to manually set up the dispatcher yourself to connect calldata to functions. This gives more control but requires extra work.

![function-dispatching-2](/formal-verification-1/4-function-dispatching/function-dispatching-2.png)

## Putting It Together

In summary, here is the full process when calling a function:

1. Your calldata is sent to the smart contract
2. Smart contract sees the function selector in the first 4 bytes
3. Dispatcher uses selector to route call to correct function
4. Function executes based on the calldata

So while calling functions may seem magical, there are underlying mechanisms that enable this to work.

## Huff vs Solidity

The core concepts around calldata and dispatching apply whether using Huff or Solidity. The key difference is Huff operates at a lower level so you manage more of these details directly.

Remix and Solidity handle a lot of this complexity behind the scenes. But understanding what's happening underneath is valuable for any blockchain developer.

## Conclusion

Through exploring calldata, function selectors, and dispatching, the "magic" of interacting with smart contracts is demystified. These crucial pieces enable our function calls to execute properly.

While Remix and Solidity simplify things, seeing the lower-level mechanics gives deeper insight into blockchain development. This knowledge empowers you to build more advanced smart contract systems.

So next time you call a function, remember the intricate mechanisms working to make it happen!

Let's look at how Huff manages all of this in a more manual way, in the next lesson.
