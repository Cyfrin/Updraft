---
title: Foundry Op Code Debugger
---

_Follow along with this video:_

---

### Foundry Op Code Debugger

Alright! All that we've done has lead to this! We've proved .. something fairly minor. Both our Huff and Solidity contracts initialize storage slot 0 with 0. This is just a start however, we've been able to verify that our contracts are both functioning the same way - this is great!

Often when coding in a low level language like Assembly or Huff it can be difficult to pinpoint where things are going wrong when errors are received. Foundry, fortunately, has a built in debugger we can use!

Try the command:

```bash
forge test --debug testReadHuffValue
```

This should launch Foundry's debugger.

The trickiest part of the debugger could easily be navigation to the correct pieces of code. Foundry itself has a bunch of operations executing as a product of running its test suites, this muddies the waters a little bit in our debugger.

Utilize the commands along the bottom of the screen to navigate, you're looking for our `calldataload` or our `function selector` checks. These are clear indicators that we're looking at our contracts implementation.

Foundry's debugger allows us to step through execution op code by op code very similarly to how the evm.codes playground works! We've seen this a few times before in our experiments learning about op codes, but I encourage you to play with this debugger until you're familiar with it. Trying things out is the best way to learn.

With the read functionality tested, we can move on to the write functionality, the ability to set a number of horses through `SET_NUMBER_OF_HORSES()`. Putting things together, I'll remind you how our `Base_TestV1.t.sol` should look.

```js
// SPDX-License-Identifier:MIT

pragma solidity 0.8.20;

import {HorseStore} from "../../src/horseStoreV1/HorseStore.sol";
import {Test, console2} from "forge-std/Test.sol";

abstract contract Base_TestV1 is Test{
    HorseStore public horseStore;

    function setUp() public virtual {
        horseStore = new HorseStore();
    }

    function testReadValue() public {
        uint256 initialValue = horseStore.readNumberOfHorses();
        assertEq(initialValue, 0);
    }

    function testWriteValue() public {
        uint256 numberOfHorses = 777;
        horseStore.updateHorseNumber(numberOfHorses);
        assertEq(horseStore.readNumberOfHorses(), numberOfHorses);
    }
}
```

Our test looks great! It's very simple, we're assigning 777 to a variable, updating the number of courses in horseStore, then our assert reads from the contract to verify that the updating number was in fact stored!

Let's run `forge test --debug testWriteValue` and see how it looks in the debugger. Before hand, it's good to get an idea of what you're looking out for amidst all the debugger op codes so as not to get lost.

```bash
cast to-base 777 hex
0x309
```

With the above, we can see that 0x309 should be expected to pop up as we walk through the op code execution in our debugger, and indeed it does.

![foundry-opcode-debugger1](/formal-verification-1/39-foundry-opcode-debugger/foundry-opcode-debugger1.png)

I can't encourage you enough to practice and experiment with this debugger. Being able to read through op code executions will be an invaluable low level skill for those serious about a deep understanding of the EVM.
