---
title: Intro to Deconstructing a Solidity Smart Contract
---

_Follow along with this video:_

---

### Primer

Wow, we've learnt a lot.

- We wrote the HorseStore contract in Huff
- We learnt about calldata and where it comes from and how it's used
- We also learnt how the EVM interprets the data being sent to it

With our experience with Huff and opcodes our next goal is going to be much more in reach. We're going to crack open our solidity contract and walk through it opcode by opcode to understand what it does and why's it does it.  If you'd like to see the opcode breakdowns for Huff and Solidity, I've included breakdown references in the **[GitHub Repo](https://github.com/Cyfrin/1-horse-store-s23/tree/main/breakdowns)**

Let's remind ourselves what the Solidity version of this contract looks like:

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

This is the part of the course where we will literally be ripping through binary. It's going to be heavy, but it's also going to be a lot of fun.  When you're ripping apart the binary of a contract you should always be asking yourself *What is this doing?* and *Why is this here?* By the end of this you'll be a gas optimizing monster and you'll be able to critique compilers (though gas optimizoors dunking on compilers is a bit of a Twitter meme - don't go too hard haha).

A lot of smart contract developers really want performant and efficient code - this power will only unlock for you when you've got through the assembly and gained a deeper understanding and familiarity with the opcodes available.

Go get a coffee things are about to get intense!