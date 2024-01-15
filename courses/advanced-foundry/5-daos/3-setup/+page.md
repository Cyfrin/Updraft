---
title: Setup
---

_Follow along with this video._



---

Today, I'm going to take you deeper into the captivating world of DAOs, Decentralized Autonomous Organizations. More specifically, I'll be throwing light on plutocracy DAOs, which are based on ERC 20 tokens, and show you how to create one from scratch using FOUNDATION.

Be warned though, gaining a solid conceptual understanding of these inside-out is of paramount importance before jumping to establish your DAO. Let's keep our journey enlightening and error-free, shall we?

## The Caveat About Plutocracy DAOs

A word of caution before we take the leap: launching a DAO is no casual affair. Many newbies hurry into launching their governance tokens and find themselves neck-deep in problems down the line.

<img src="/daos/3-setup/setup1.png" alt="Dao Image" style="width: 100%; height: auto;">

Therefore, it's essential to have a foolproof white paper justifying your need for a governance token. In short, do not make DAO creation decisions in haste, lest they come back to haunt your project.

## Let's Get Our Hands Dirty with Code

To jump-start this process, we will look at the most popular DAO model currently in use across major platforms like Compound, Uniswap, and Aave.

Please bear in mind, just because it's "popular", doesn't mean it's the best fit for every situation or the only available model. Always strive for improving and optimizing the web3 ecosystem.

### Stage 1: Creating a Contract Controlled by DAO

First things first, we'll make a contract fully controlled by our DAO.

```shell
mkdir foundry-dao-f23
cd foundry-dao-f23

```

Open your code editor (VS Code in this case).

```bash
forge init
```

Then, set up a README for outlining what you'll be doing.

### Here are our main objectives:

1. Establish a contract completely controlled by our DAO.
2. Every transaction the DAO wants to send will need to be voted on.
3. For voting, we'll utilize ERC 20 tokens.

<img src="/daos/3-setup/setup2.png" alt="Dao Image" style="width: 100%; height: auto;">

Let's get down to business.

### Stage 2: Creating a Minimal Contract

Let's create a minimal contract that we can vote on. Our contract will look somewhat similar to the contracts we've worked on before.

```bash
touch src/Box.sol
```

This is how `Box.sol` should look like:

```js
// contracts/Box.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Box is Ownable {
    uint256 private value;

    // Emitted when the stored value changes
    event ValueChanged(uint256 newValue);

    // Stores a new value in the contract
    function store(uint256 newValue) public onlyOwner {
        value = newValue;
        emit ValueChanged(newValue);
    }

    // Reads the last stored value
    function retrieve() public view returns (uint256) {
        return value;
    }
}
```

In the code block above, the `value` variable can only be modified by the DAO itself. The moment a new value is stored, an event of number change gets emitted notifying the updated number.

And there we have our minimal contract. This contract somewhat echoes a project I have previously worked on, known as `Box.sol`, a simple storage contract.

Remember to test your code to make sure everything compiles as expected:

```bash
forge compile
```

### Stage 3: Creating a Voting Token

Now we get to the exciting part. Using ERC 20 tokens for voting means we'll have to create our very own voting token.

Stay tuned for my next blog post where we'll dive into creating your unique voting token.

Happy experimenting until then!
