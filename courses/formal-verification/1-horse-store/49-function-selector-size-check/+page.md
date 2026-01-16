---
title: Function Selector Size Check
---

_Follow along with this video:_

---

### Function Selector Size Check

Ok! We've reach a section that may finally be new to us. Not sure what's going to be done next, but we'll find out as we go through the operations!

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

    JUMPDEST      //<---- We are Here!
    POP
    PUSH1 0x04
    CALLDATASIZE
    LT
    PUSH1 0x30
    JUMPI
    PUSH0
    CALLDATALOAD
    PUSH1 0xe0
    SHR
    DUP1
    PUSH4 0xcdfead2e
    EQ
    PUSH1 0x34
    JUMPI
    DUP1
    PUSH4 0xe026c017
    EQ
    PUSH1 0x45
    JUMPI
    JUMPDEST
    PUSH0
    DUP1
    REVERT
    JUMPDEST
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


```js
JUMPDEST       // [msg.value]
POP            // []
PUSH1 0x04     // [0x04]
CALLDATASIZE   // [calldata_size, 0x04]
LT             //
```

Continuing from our `JUMPDEST` (this is if `msg.value == 0`), we are then clearing our stack with `POP`. Next we push `0x04` to our stack with `PUSH1`, we'll see why soon. Then we execute an opcode we haven't seen before. `CALLDATASIZE`.

![function-selector-size-check1](/formal-verification-1/48-function-selector-size-check/function-selector-size-check1.png)

We can see that this opcode takes no stack input, but the stack output is the `byte size of the calldata`. A couple examples:

If calldata = 0x04

- CALLDATASIZE = 0x01

if calldata = 0x05284a06

- CALLDATASIZE = 0x04

We then hit another new opcode `LT` this stands for `less than`.

![function-selector-size-check2](/formal-verification-1/48-function-selector-size-check/function-selector-size-check2.png)

The LT opcode will return 1 if the top item of the stack is less than the second from top item in the stack. Functionally, this is checking the calldata being received is long enough to satisfy the required length of a contracts function selector (4 bytes).

```js
JUMPDEST       // [msg.value]
POP            // []
PUSH1 0x04     // [0x04]
CALLDATASIZE   // [calldata_size, 0x04]
LT             // [calldata_size < 0x04]
PUSH1 0x30     // [0x30, calldata_size <0x04]
JUMPI          // []

PUSH0
CALLDATALOAD
```

After our stack has the `LT` conditional, we're then pushing the program counter (effectively our `JUMPDEST`) and executing the `JUMPI` code. This is going to jump our execution to after our `function dispatcher` (more on that coming!):

```js
PUSH1 0x30        // [0x30, calldata_size < 0x04]
JUMPI             // []
// if calldata_size < 0x04, Jump to 0x30

PUSH0
CALLDATALOAD
PUSH1 0xe0
SHR
DUP1
PUSH4 0xcdfead2e
EQ
PUSH1 0x34
JUMPI
DUP1
PUSH4 0xe026c017
EQ
PUSH1 0x45
JUMPI

// this JUMPDEST is 0x30
JUMPDEST          // []
PUSH0             // [0x00]
DUP1              // [0x00, 0x00]
REVERT            // []
```

The summarize all this, we're checking our `CALLDATASIZE`, if it is less than the size of a `function selector` we are jumping our execution to the `0x30` offset and reverting the transaction.

The Solidity compiler again is smart enough to know if a contract possesses a `fallback` function and how to handle `calldata` that can't be processed by a contract's functions by reverting the call when the `calldata` passed is less then 4 bytes long.

In the next lesson, we'll see how `calldata` is handled when it passes this `CALLDATASIZE` check!
