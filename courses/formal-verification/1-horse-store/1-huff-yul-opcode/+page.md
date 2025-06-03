---
title: Huff, Yul, and Contract Opcode Disassembly
---

_Follow along with this video:_

---

I'm excited to get started! I'll first mention, I am coding with GitHub co-pilot installed. I highly recommend doing the same (or using a comparable AI extension). I promise this is going to make you much faster. AI agents have come a long way in such a short time, and we should be leveraging every tool at our disposal.

Let's get down to business and create a new project environment!

We can start by creating a project directory and opening it with the commands:

```
mkdir 1-horse-store
code 1-horse-store/
```

Now, let's initiate our Foundry project, should all be standard to us here:

```
forge init
```

Proceed with cleaning up the workspace by deleting `src/Counter.sol`, `test/Counter.t.sol`, and `script/Counter.s.sol`. Let's begin with setting up `HorseStore.sol`.

Create a new folder within `src` named `horseStoreV1` and within that folder create the file `HorseStore.sol`

![huff-yul-opcodes-1](/formal-verification-1/1-huff-yul-opcodes/huff-yul-opcodes-1.png)

It's a fairly simple contract, feel free to copy it from the [**GitHub**](https://github.com/Cyfrin/1-horse-store-s23/blob/main/src/horseStoreV1/HorseStore.sol) associated with this lesson, or copy it below:

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

If you find yourself investigating the codebase, you may come across `HorseStoreSymbolic.t.sol`. I urge you not to worry too much about it currently as we're going to be coming back to HorseStore in a later section as we learn more about `Symbolic Execution/Formal Verification`.

If the code's looking alien, it's your cue to brush up on the skills taught in the Advanced Foundry or Basic Solidity courses. Everything we're doing here should be very familiar to you.

As you can see, our smart contract is very simple. There's a storage variable, `numberOfHorses`, and function to update it, `updateHorseNumber()` and a view function to read the number `readNumberOfHorses()`

We should be able to...

```bash
forge build
```

Success should grace your screen, and with it, confirmation of a job well done.

Once built, you should be able to navigate to `out/HorseStore.sol/HorseStore.json`. I recommend utilizing your command pallet in VS Code to format the document and toggle word-wrap, to assist in readability.

![huff-yul-opcodes-2](/formal-verification-1/1-huff-yul-opcodes/huff-yul-opcodes-2.png)

This json is going to have a _lot_ of stuff in it, and much of it isn't important to us right now. Minimize the `abi` and locate the outputs `bytecode` and `deployedBytecode` This is going to be our focus in the coming lesson!

See you there!
