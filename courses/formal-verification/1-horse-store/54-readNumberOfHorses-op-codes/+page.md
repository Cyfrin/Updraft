---
title: readNumberOfHorses Op Codes
---

_Follow along with this video:_

---

### readNumberOfHorses

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

    JUMPDEST ✅
    PUSH0 ✅
    SSTORE ✅
    JUMP ✅

    JUMPDEST ✅
    STOP ✅

    JUMPDEST     //<--- We are here!
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


So, in order to walk through the execution of a `readNumberOfHorses` call, we'll need to go back to our `function dispatcher`:

```js
DUP1 ✅               // [func_selector, func_selector]
PUSH4 0xcdfead2e ✅   // [0xcdfead2e, func_selector, func_selector]
EQ ✅                 // [0xcdfead2e == func_selector, func_selector]
PUSH1 0x34 ✅         // [0x34, 0xcdfead2e == func_selector, func_selector]
JUMPI ✅              // [func_selector]

DUP1
PUSH4 0xe026c017
EQ
PUSH1 0x45
JUMPI
```

How the `function dispatcher` handles calls with our `readNumberOfHorses` function signature is going to be identical to how it handled things for `setNumberOfHorses`.

`DUP1` is used to duplicate the `function selector`, we `PUSH4` the known `function signature` to the stack, then we use `EQ` to check if they are equal.

```js
DUP1               // [func_selector, func_selector]
PUSH4 0xe026c017   // [0xe026c017, func_selector, func_selector]
EQ                 // [0xe026c017 == func_selector, func_selector]
PUSH1 0x45         // [0x45, 0xe026c017 == func_selector, func_selector]
JUMPI              // [func_selector]
```

`PUSH1 0x45` is pushing a `JUMPDEST` to the top of our stack, and finally `JUMPI` is jumping if the `calldata` `function selector` is found to be equal to the known `function selector`.

There's just one `JUMPDEST` for `readNumberOfHorses`, but it's a lot.

```js
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
```

*All* of this is required to readNumberOfHorses. This is quite a bit different to what we saw with Huff:

```js
#define macro GET_NUMBER_OF_HORSES() = takes (0) returns (0) {
   [NUMBER_OF_HORSES_LOCATION] // [KEY]
   sload                           // [VALUE]
   0x00                            // [0, VALUE]
   mstore                          // [] / Memory: [VALUE]
   0x20                            // [0x20] / Memory: [VALUE]
   0x00                            // [0x20, 0x00] / Memory: [VALUE]
   return                          // [] / Memory: []
}
```

Let's find out what's going on.

```js
JUMPDEST   // [func_selector]
PUSH0      // [0x00, func_selector]
SLOAD      // [numHorses, func_selector]
```

This first bit should be pretty clear! We begin by `PUSH0`ing and then executing `SLOAD`. `SLOAD`, we recall takes a stack input `key` and returns the data in storage from that location. We have our horse number on top of our stack! What's happening next?

```js
SLOAD        // [numHorses, func_selector]
PUSH1 0x40   // [0x40, numHorses, func_selector]
MLOAD        // [0x80, numHorses, func_selector]    Memory: 0x40:0x80
SWAP1        // [numHorses, 0x80, func_selector]
DUP2         // [0x80, numHorses, 0x80, func_selector]
MSTORE       // [0x80, func_selector]               Memory: 0x40:0x80, 0x80:numHorses
```
We need to remember that we can't return or do anything with data that exists on our stack, or in storage. It needs to be in memory for this. Unlike Huff, Solidity, we recall, utilizes a `free memory pointer` which we configured at the very start of our byte code!

```js
PUSH1 0x80 ✅
PUSH1 0x40 ✅
MSTORE ✅
```
So, what we're doing is using `PUSH1 0x40` to push this pointer location to the top of our stack, and then we execute `MLOAD` to load the data at this location. This is where we have free memory allocated (`0x80`)!

We're then reordering our stack a little bit using `SWAP1` and `DUP2`. This is necessary to pass the correct stack inputs to our final call in this chunk `MSTORE`.  

`MSTORE` takes the top item of our stack (the memory offset, or location of free memory that our pointer gave us), and stores there the second from the top item in our stack - numHorses. We now have `0x40:0x80` and `0x80:numHorses` as items at their respective locations in memory!

Our next step would normally be updating our `free memory pointer` with the next location of free memory, but Solidity is actually smart enough to know the call is about to end and memory won't be accessed anymore, so `MLOAD` is never called!

Let's see how the call completes it's return though:

```js
PUSH1 0x20      // [0x20, 0x80, func_selector]
ADD             // [0xa0, func_selector]
PUSH1 0x40      // [0x40, 0xa0, func_selector]
MLOAD           // [0x80, 0xa0, func_selector]
DUP1            // [0x80, 0x80, 0xa0, func_selector]
SWAP2           // [0xa0, 0x80, 0x80, func_selector]
SUB             // [0xa0 - 0x80, 0x80, func_selector]
SWAP1           // [0x80, 0xa0 - 0x80, func_selector]
RETURN          // [func_selector]
```

This seems like a lot but it makes sense when broken down a bit. We first `PUSH1 0x20`, then execute `ADD` this adds the size of the data (32 bytes) to the location of our last recorded free memory (`0x80`).

`PUSH1 0x40` then `MLOAD` are used to access the last recorded offset of free memory again (0x80), and then `DUP1` duplicates this. We `SWAP2` and `SUB` as a means to calculate the size of our data being returned `0xa0 - 0x80 = 0x20` or `32 bytes`. 

`SWAP1` then positions our desired memory offset, where `numHorses`, was stored to the top of our stack and we call `RETURN`.

`RETURN` takes a memory offset and a size in bytes as stack inputs, so we're returning 32 bytes of data located at `0x80` in memory aka `numHorses`!

### Wrap Up

With that we have walked through every single opcode in this contract's creation and runtime bytecode! We noticed that our Huff implementation can definitely be more efficient than Solidity because we by pass a few checks (for better or worse) and don't have to manage a `free memory pointer`!

Here's where we've come so far:

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

    JUMPDEST ✅
    PUSH0 ✅
    SSTORE ✅
    JUMP ✅

    JUMPDEST ✅
    STOP ✅

    JUMPDEST ✅
    PUSH0 ✅
    SLOAD ✅
    PUSH1 0x40 ✅
    MLOAD ✅
    SWAP1 ✅
    DUP2 ✅
    MSTORE ✅
    PUSH1 0x20 ✅
    ADD ✅
    PUSH1 0x40 ✅
    MLOAD ✅
    DUP1 ✅
    SWAP2 ✅
    SUB ✅
    SWAP1 ✅
    RETURN ✅

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


The last section of our bytecode is going to be Metadata. We're almost done!
