---
title: Setting up JUMPDEST Program Counters
---

_Follow along with this video:_

---

Alright, let's keep going!

<details>
<Summary> Op Codes </summary>

    bytecode - 0x6080604052348015600e575f80fd5b5060a58061001b5f395ff3fe6080604052348015600e575f80fd5b50600436106030575f3560e01c8063cdfead2e146034578063e026c017146045575b5f80fd5b6043603f3660046059565b5f55565b005b5f5460405190815260200160405180910390f35b5f602082840312156068575f80fd5b503591905056fea2646970667358fe1220fe01fe6c40d0ed98f16c7769ffde7109d5fe9f9dfefe31769a77032ceb92497a64736f6c63430008140033

```js
    PUSH1 0x80 ✅
    PUSH1 0x40 ✅
    MSTORE ✅

    CALLVALUE ✅
    DUP1 ✅
    ISZERO ✅
    PUSH1 0x0e ✅
    JUMPI ✅

    PUSH0 ✅
    DUP1 ✅
    REVERT ✅

    JUMPDEST ✅
    POP ✅
    PUSH1 0xa5 ✅
    DUP1 ✅
    PUSH2 0x001b ✅
    PUSH0 ✅
    CODECOPY ✅
    PUSH0 ✅
    RETURN ✅
    INVALID ✅

    PUSH1 0x80 ✅
    PUSH1 0x40 ✅
    MSTORE ✅

    CALLVALUE ✅
    DUP1 ✅
    ISZERO ✅
    PUSH1 0x0e ✅
    JUMPI ✅

    PUSH0 ✅
    DUP1 ✅
    REVERT ✅

    JUMPDEST ✅
    POP ✅
    PUSH1 0x04 ✅
    CALLDATASIZE ✅
    LT ✅
    PUSH1 0x30 ✅
    JUMPI ✅

    PUSH0 ✅
    CALLDATALOAD ✅
    PUSH1 0xe0 ✅
    SHR ✅

    DUP1 ✅
    PUSH4 0xcdfead2e ✅
    EQ ✅
    PUSH1 0x34 ✅
    JUMPI ✅

    DUP1
    PUSH4 0xe026c017
    EQ
    PUSH1 0x45
    JUMPI

    JUMPDEST ✅
    PUSH0 ✅
    DUP1 ✅
    REVERT ✅

    JUMPDEST      // <--- We are here!
    PUSH1 0x43
    PUSH1 0x3f
    CALLDATASIZE
    PUSH1 0x04
    PUSH1 0x59
    JUMP
    JUMPDEST
    PUSH0
    SSTORE
    JUMP
    JUMPDEST
    STOP
    JUMPDEST
    PUSH0
    SLOAD
    PUSH1 0x40
    MLOAD
    SWAP1
    DUP2
    MSTORE
    PUSH1 0x20
    ADD
    PUSH1 0x40
    MLOAD
    DUP1
    SWAP2
    SUB
    SWAP1
    RETURN
    JUMPDEST
    PUSH0
    PUSH1 0x20
    DUP3
    DUP5
    SUB
    SLT
    ISZERO
    PUSH1 0x68
    JUMPI
    PUSH0
    DUP1
    REVERT
    JUMPDEST
    POP
    CALLDATALOAD
    SWAP2
    SWAP1
    POP
    JUMP
    INVALID
    LOG2
    PUSH5 0x6970667358
    INVALID
    SLT
    KECCAK256
    INVALID
    ADD
    INVALID
    PUSH13 0x40d0ed98f16c7769ffde7109d5
    INVALID
    SWAP16
    SWAP14
    INVALID
    INVALID
    BALANCE
    PUSH23 0x9a77032ceb92497a64736f6c63430008140033
```

</details>


Let's see if we can determine which JUMPDEST we're working with first, based on what it does.

```js
JUMPDEST      // [func_selector]
PUSH1 0x43    // [0x43, func_selector]
PUSH1 0x3f    // [0x3f, 0x43, func_selector]
CALLDATASIZE  // [calldata_size, 0x3f, 0x43, func_selector]
PUSH1 0x04    // [0x04, calldata_size, 0x3f 0x43, func_selector]
PUSH1 0x59    // [0x59, 0x04, calldata_size, 0x3f, 0x43, func_selector]
JUMP          // [0x04, calldata_size, 0x3f, 0x43, func_selector]]
```

Now, this looks like we're pushing a bunch of random things to the stack and then calling a `JUMP`. That's kind of true, but things will seem less random soon, haha! Let's look at JUMP since we've never seen it used before.

![setting-up-jumpdest-program-counters1](/formal-verification-1/50-setting-up-jumpdest-program-counters/setting-up-jumpdest-program-counters1.png)

`JUMP` takes the top item of our stack and continues our execution from that bytes offset location. This chunk of code represents our `updateHorseNumber jump dest 1`. When we reach the `JUMP` operation on this chunk.

Take my word for it, for now, but `0x59` as a bytes offset means the next code to execute pertaining to this function is going to be all the way down at:

```js
// updateNumberOfHorses jump dest 2
JUMPDEST
PUSH0
PUSH1 0x20
DUP3
DUP5
SUB
SLT
ISZERO
PUSH1 0x68
JUMPI
PUSH0
DUP1
REVERT
```

This is our `updateNumberOfHorses()` jump dest 2. A great way to determine these jump destinations would be to copy your opcodes into the [evm.codes playground](https://www.evm.codes/playground) and reference the locations jumped when stepping through the execution.

Let's see what this `JUMPDEST` does in the next lesson!
