---
title: Inline Assembly
---

_Follow along with this video:_

---

### Inline Assembly

Let's look at a simple example of how `Yul` can be used as inline assembly in Solidity. We'll do this by converting our `HorseStore.sol` contract function logic!

```js
// SPDX-License-Identifier: GPL-3.0-only
pragma solidity 0.8.20;

contract HorseStore {
    uint256 numberOfHorses;

    function updateHorseNumber(uint256 newNumberOfHorses) external {
        assembly {
            // YUL GOES HERE
        }
    }

    function readNumberOfHorses() external view returns (uint256) {
        assembly {
            // YUL GOES HERE
        }
    }
}
```

In order to access Yul, we just need to wrap our operations in an `assembly` object, as shown above. From here we can access opcodes almost like functions, with the stack layer of consideration abstracted away for us.

```js
function updateHorseNumber(uint256 newNumberOfHorses) external {
    assembly {
        sstore(numberOfHorses.slot, newNumberOfHorses)
    }
}
```

In this example we see `sstore()` being used like our SSTORE opcode, with the stack inputs being passed as parameters. The first input is the storage slot we're storing our data to, and the second input is the data we're storing. That's all it takes to `updateHorseNumber`!

```js
function readNumberOfHorses() external view returns (uint256) {
        assembly {
            let num := sload(numberOfHorses.slot)
            mstore(0, num)
            return(0,0x20)
        }
    }
```

We have to remember that we can't return or manipulate data in storage, it needs to be in memory for this. In the above function we load the `numberOfHorses` storage slot, store it in memory, and then return the number from memory!

We can see `Yul` is a little bit different from working with Huff or working directly with the stack. It almost abstracts out the stack from our work, taking stack items as 'parameters'.
