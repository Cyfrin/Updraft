---
title: Solidity's Free Memory Pointer
---

_Follow along with this video:_

---

### Starting the Op Code Breakdown

Let's start breaking down what all the opcodes in our `solc-breakdowns.c++` file do.

I'll update this reference as we go through each section of bytecode:

<details>
<Summary> Op Codes </summary>

    bytecode - 0x6080604052348015600e575f80fd5b5060a58061001b5f395ff3fe6080604052348015600e575f80fd5b50600436106030575f3560e01c8063cdfead2e146034578063e026c017146045575b5f80fd5b6043603f3660046059565b5f55565b005b5f5460405190815260200160405180910390f35b5f602082840312156068575f80fd5b503591905056fea2646970667358fe1220fe01fe6c40d0ed98f16c7769ffde7109d5fe9f9dfefe31769a77032ceb92497a64736f6c63430008140033

```js
    PUSH1 0x80    //<---- We're starting here!
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
    PUSH1 0xa5
    DUP1
    PUSH2 0x001b
    PUSH0
    CODECOPY
    PUSH0
    RETURN
    INVALID
    PUSH1 0x80
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


Let's remind ourselves of the 3 sections found in a smart contract's bytecode and start from the top!

1. Contract Creation
2. Runtime
3. Metadata

### Contract Creation Code

```
0x6080604052

Op Codes:
PUSH1 0x80
PUSH1 0x40
MSTORE
```

This section of bytecode is going to be seen in almost every contract you work with and represents the first part of the `Contract Creation Code`. Any time we send a transaction on chain, the entry point of our transaction will be the first couple opcodes.

```
PUSH1 0x80
PUSH1 0x40
MSTORE
```

These opcodes represent Solidity's `Free Memory Pointer`. Their execution, in order will:

1. Push 0x80 to the stack
2. Push 0x40 to the stack
3. Stores the value of 0x80, offset by 0x40 into memory

Previously I'd described memory as an array with slots demarked with indexes. This isn't entirely accurate. Memory is more accurately a string of bytes with sections denoted by 32 byte offsets which represent areas in which we would store 32 byte sized pieces of data.

A part of memory management is keeping track of where in this memory "array" we have free memory available (to avoid overwriting previously stored data!). This is where the `free memory pointer` comes in.

What these opcodes are doing, is making a note of where our free memory is located, at 0x40. The idea being that every time we want to write to memory, we'll do 3 things:

1. Check the value stored at 0x40 to determine where free memory is available
2. write our data to the free memory location
3. update the `free memory pointer` (0x40) with the new location of free memory

In Solidity `0x40` is special and exists as this `free memory pointer`. Not all languages share this feature however, Vyper and Huff being notable examples of not having a `free memory pointer`

As we walk through the solidity opcodes, we'll see the free memory pointer being referenced and updated many times. We'll become very familiar with it's use!
