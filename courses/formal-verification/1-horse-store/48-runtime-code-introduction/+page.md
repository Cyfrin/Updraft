---
title: Runtime Code Introduction
---

_Follow along with this video:_

---

### Runtime Code

With `contract creation` understood, we move onto the runtime section of our opcodes. Remember, Solidity conveniently will break each of theses sections up by adding an `INVALID` opcode between them.

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

    PUSH1 0x80      //<---- We are here!
    PUSH1 0x40
    MSTORE
    CALLVALUE
    DUP1
    ISZERO
    PUSH1 0x0e
    JUMPI
    PUSH0
    DUP1
    REVERT
    JUMPDEST
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


This section of code is the `runtime code` this is what is copied to the blockchain and represents the entry point of all calls sent to its address.

The next chunk we'll assess should look familiar to us! Let's break it down.

```js
// Free Memory Pointer
PUSH1 0x80
PUSH1 0x40
MSTORE

//msg.value check
CALLVALUE    // [msg.value]
DUP1         // [msg.value, msg.value]
ISZERO       // [msg.value == 0, msg.value]
PUSH1 0x0e   // [0x0e, msg.value == 0, msg.value]
JUMPI        // [msg.value]
// Jump to "continue!" if msg.value == 0

PUSH0        // [0x00, msg.value]
DUP1         // [0x00, 0x00, msg.value]
REVERT       // []

// If msg.value == 0, start here!
// continue!
JUMPDEST
POP
```

What's happening above?

The first three codes are Solidity's `free memory pointer` again! We'll get used to seeing this. From there we see another chunk we've seen before - the msg.value check.

The Solidity compiler is smart enough to check all the functions within a contract and determine if any of them are payable. If none of a contract's functions are payable, any calldata sent to the contract's runtime code will be checked for value and the transaction will revert if any is found!

We'll continue from the `JUMPDEST` in the next lesson to see how a call is handled when `msg.value == 0`.
