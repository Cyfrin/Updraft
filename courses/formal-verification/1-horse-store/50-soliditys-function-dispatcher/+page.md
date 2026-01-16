---
title: Solidity's Function Dispatcher
---

_Follow along with this video:_

---

### Solidity's Function Dispatcher

The next chunk of opcodes we come across is going to represent Solidity's `function dispatcher`. Let's go through how it works together. As always, here's a reference of the opcodes we've covered so far and where we are in the execution:

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
    PUSH0            //<--- We are here!
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

    JUMPDEST ✅
    PUSH0 ✅
    DUP1 ✅
    REVERT ✅

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
PUSH0 0x00        // [0x00]
CALLDATALOAD      // [CALLDATA_32BYTES]
PUSH1 0xe0        // [0xe0, CALLDATA_32BYTES]
SHR               // [calldata[0:4]] // function selector
DUP1              // [func_selector, func_selector]
PUSH4 0xcdfead2e  // [0xcdfead2e, func_selector, func_selector]
EQ                // [0xcdfead2e == func_selector, func_selector]
PUSH1 0x34        // [0x34, 0xcdfead2e == func_selector, func_selector]
JUMPI             // [func_selector]
```

So what's this doing?  We're pushing `0x00` to the stack and executing `CALLDATALOAD`, we've seen this one before. It takes a bytes offset from the top of our stack (`0x00`) and adds to our stack 32 Bytes of calldata beginning at the offset.

We next execute a right shift with `SHR`. If we recall, it takes an amount to shift and the data to be shifted. `cast to-base 0xe0 dec` will tell us we're shifting our `CALLDATA_32BYTES` 224 bits (28 Bytes) to the right. This is going to leave the first 4 bytes of our `calldata`, on the stack - our `function selector`.

What remains will look something like this:
```
0x0000000000000000000000000000000000000000000000000000000xcdfead2e
```

In Solidity the function dispatching is all done under the hood, we didn't have to code any of this, like we did with Huff.  We're going to get to compare how our function dispatcher performs versus Solidity's!

In fact our experience coding this function dispatcher in Huff should make this next chunk fairly familiar to us:

### Update Number of Horses

```js
PUSH4 0xcdfead2e  // [0xcdfead2e, func_selector, func_selector]
EQ                // [0xcdfead2e == func_selector, func_selector]
PUSH1 0x34        // [0x34, 0xcdfead2e == func_selector, func_selector]
JUMPI             // [func_selector]
// if func_selector == 0xcdfead2e jump to set_number_of_horses
```
We're pushing  our known function selector to the stack (this is our `updateNumberOfHorses()` function!), and then comparing it to the `calldata` `function selector` to see if there's a match.

We then push a program counter/`JUMPDEST` to the stack and execute `JUMPI`, jumping to that function's logic if `0xcdfead2e == func_selector`.

We won't jump yet, let's keep going to see how the next function is routed.

### Read Number of Horses

```js
JUMPI             // [func_selector]
// if func_selector == 0xcdfead2e jump to set_number_of_horses

DUP1              // [func_selector, func_selector]
PUSH4 0xe026c017  // [0xe026c017, func_selector, func_selector]
EQ                // [0xe026c017 == func_selector, func_selector]
PUSH1 0x45        // [0x45, 0xe026c017 == func_selector, func_selector]
JUMPI             // [func_selector]
```

Basically the same process is being followed for the second function of our Solidity contract.

- Duplicate the `function selector` from `calldata`
- Push our known `function selector` (0xe026c017 `readNumberOfHorses()`)
- Use `EQ` to determine if they are equal
- Push a program counter/`JUMPDEST` to the stack
- `JUMPI` to the `JUMPDEST` if the `calldata` function selector and the known `function selector` are equal.

Something to note here - In the `function dispatcher` we wrote in Huff, we recognized that our second check wouldn't require duplicating the `func_selector` again. Solidity however *does* still perform this duplication! This is a potential gas optimization we've found already!

If a `function selector` isn't found during this dispatch, we can see we've returned to this revert block we used earlier:
```js
JUMPDEST 
PUSH0 
DUP1 
REVERT 
```

This will prevent calls to our contract from executing arbitrary code if a `function selector` match isn't found.

We're already through over half the opcodes of our contract and you're doing phenomenally. Let's keep going!
