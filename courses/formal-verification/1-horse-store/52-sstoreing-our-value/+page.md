---
title: SSTOREing Our Value
---

_Follow along with this video:_

---

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

    DUP1 ✅
    PUSH4 0xe026c017 ✅
    EQ ✅
    PUSH1 0x45 ✅
    JUMPI ✅

    JUMPDEST ✅
    PUSH0 ✅
    DUP1 ✅
    REVERT ✅

    JUMPDEST ✅
    PUSH1 0x43 ✅
    PUSH1 0x3f ✅
    CALLDATASIZE ✅
    PUSH1 0x04 ✅
    PUSH1 0x59 ✅
    JUMP ✅

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

    JUMPDEST ✅
    PUSH0 ✅
    PUSH1 0x20 ✅
    DUP3 ✅
    DUP5 ✅
    SUB ✅
    SLT ✅
    ISZERO ✅
    PUSH1 0x68 ✅
    JUMPI ✅

    PUSH0 ✅
    DUP1 ✅
    REVERT ✅

    JUMPDEST // <-- We are here!
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


We're really getting into the flow of things now, let's keep our momentum and look at the next chunk at jump dest 3.

```js
JUMPDEST; // [0x00, 0x04, calldata_size, 0x3f, 0x43, func_selector]
POP; // [0x04, calldata_size, 0x3f, 0x43, func_selector]
CALLDATALOAD; // [CALLDATA[4:], calldata_size, 0x3f, 0x43, func_selector]
SWAP2;
SWAP1;
POP;
JUMP;
```

The first thing we do at jump dest 3 is execute `POP`. This just removes the top item of our stack `0x00`. We then perform `CALLDATALOAD`, which we've seen before.

`CALLDATALOAD` takes a bytes offset as a stack input, and outputs 32 Bytes of data from our calldata, starting at the bytes offset.

In our example, we're providing `0x04` (the size of our `function selector`) and adding our calldata, less this `function selector`, to the top of our stack.

Now we see a new opcode, `SWAP2`!

![sstoreing-our-value1](/formal-verification-1/52-sstoreing-our-value/sstoreing-our-value1.png)

`SWAP2` simply exchanges the position with the top item of our stack, with the 3rd item from the top of our stack. You can imagine it like swapping our top item, with the second index from the top.

```
[0]  <- Swap
[1]
[2]  <- Swap
[3]
```

This is going to make our stack look something like this:

```js
CALLDATALOAD; // [CALLDATA[4:], calldata_size, 0x3f, 0x43, func_selector]
SWAP2; // [0x3f, calldata_size, CALLDATA[4:], 0x43, func_selector]
SWAP1; // [calldata_size, 0x3f, CALLDATA[4:], 0x43, func_selector]
POP; // [0x3f, CALLDATA[4:], 0x43, func_selector]
JUMP; // [CALLDATA[4:], 0x43, func_selector]
```

And, given what we've seen with `SWAP2`, I'm sure we can speculate what `SWAP1` is going to do! That's right, it will swap the top item of our stack with the second from the top (or first index) item.

Next we `POP` our `calldata_size` off of our stack and then call `JUMP`. The `JUMPDEST` is going to be what's at the top of our stack currently, which is `0x3f`, and we're bringing our `calldata` with us!

Look at our updated opcode list to see where we've jumped to now, we're about to finally call `SSTORE` to save our new horse number to storage!

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

    JUMPDEST ✅
    PUSH1 0x43 ✅
    PUSH1 0x3f ✅
    CALLDATASIZE ✅
    PUSH1 0x04 ✅
    PUSH1 0x59 ✅
    JUMP ✅

    JUMPDEST    // <---- We are here!
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

    JUMPDEST ✅
    PUSH0 ✅
    PUSH1 0x20 ✅
    DUP3 ✅
    DUP5 ✅
    SUB ✅
    SLT ✅
    ISZERO ✅
    PUSH1 0x68 ✅
    JUMPI ✅

    PUSH0 ✅
    DUP1 ✅
    REVERT ✅

    JUMPDEST ✅
    POP ✅
    CALLDATALOAD ✅
    SWAP2 ✅
    SWAP1 ✅
    POP ✅
    JUMP ✅
    INVALID ✅

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


From jump dest 4, we're able to finally save our value to storage, but we've only been able to here if:

1. Our `function selector` matched and our function was dispatched
2. We passed the `msg.value check`
3. Our `calldata` was long enough to possibly include a valid value for storage (32 bytes)
4. we've isolated our passed parameter data from our total `calldata`

```js
JUMPDEST; // [CALLDATA[4:], 0x43, func_selector]
PUSH0; // [0x00, CALLDATA[4:], 0x43, func_selector]
SSTORE; // [0x43, func_selector]     // Storage Slot 0: [CALLDATA[4:]]
JUMP; // [func_selector]           // Storage Slot 0: [CALLDATA[4:]]

JUMPDEST;
STOP;
```

Here we can see we're using `PUSH0` and calling `SSTORE`. This takes the `0x00` as our storage slot, and stores the data from the second item in our stack at that location.

We're finally calling `JUMP` to our final destination `0x43`

```js
JUMPDEST; // [func_selector]
STOP; // []
```

This final chunk of this transaction simply ends execution. This is great! We've walk through every opcode, end to end when calling the `updateNumberOfHorses()` function!
