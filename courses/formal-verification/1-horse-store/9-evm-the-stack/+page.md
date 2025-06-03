---
title: EVM - A Stack Machine (The Stack)
---

_Follow along with this video:_

---

## Understanding Solidity Variables and the Ethereum Virtual Machine (EVM)

Let's look again at our Horse Store contract:

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

In this example, `numberOfHorses` is a storage variable, it's going to persist on-chain after an execution completes. However, if we were to add a variable like `uint256 hello = 7` to our `updateHorseNumber()` function...

```js
function updateHorseNumber(uint256 newNumberOfHorses) external {
    uint256 hello = 7;
    numberOfHorses = newNumberofHorses;
}
```

...this variable is held in memory while the function is executing and is discarded once execution completes and will be inaccessible.

How does Solidity determine how these variables are handled? Let's reformat our earlier questions:

1. Where did this data come from? How did Remix know to send this data?
   1. 0xe026c0170000000000000000000000000000000000000000000000000000000000000001
   2. How does the EVM know how to interpret/interact with data?
2. How does Remix know to update the number of horses with this data?

As developers, we usually let Solidity handle these complexities automatically. It silently allocates call data, governs memory usage during execution, and seamlessly switches between variable types. But here's the twist: when coding in low-level bytecode, _we_ are responsible for managing memory allocation.

Let's examine this brilliant visual that prominent developer Pascal shared on Twitter:

![evm-the-stack-1](/formal-verification-1/9-evm-the-stack/evm-the-stack-1.png)

For our purposes, our focus will be the areas **Stack**, **Memory**, and **Storage**.

### The Stack

When we want to perform computations on data, we have to consider where the data will be stored and the order of our computations. Of all the spaces in the image above, the cheapest location for this (from the perspective of gas) is going to be on `the stack`.

If we take a look at the `ADD` op code in [**evm.codes**](https://www.evm.codes/?fork=shanghai) we can see how this addition operation actually works.

![evm-the-stack-2](/formal-verification-1/9-evm-the-stack/evm-the-stack-2.png)

`The stack` can quite literally be thought of as a stack. New operations must be placed on the top of the stack and processed or reallocated before operations lower in the stack can be performed. Hopefully this image will help clarifying the concept.

![evm-the-stack-3](/formal-verification-1/9-evm-the-stack/evm-the-stack-3.png)

In the next lesson, we'll take a look at how `memory` and `storage` is handled differently from each other.
