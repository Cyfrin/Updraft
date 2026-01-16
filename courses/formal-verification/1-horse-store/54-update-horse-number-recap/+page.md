---
title: updateHorseNumber Recap
---

_Follow along with this video:_

---

### updateHorseNumber Recap

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


Take a moment above to appreciate how much low level knowledge you've gleaned from just this one small Solidity smart contract! You should be very proud of yourself!

We just went through the entire execution of the `updateHorseNumber` function, So let's recap what we've learnt.

### Function Dispatch

The first thing our contract does is perform a `function dispatch` to determine where our `calldata` should be appropriately sent.

```js
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
```

If calldata doesn't include a function selector which matches the transaction will revert.

### Program Counters

From here, Solidity is clever enough to prepare our stack with a number of program counters we'll need to jump through as we execute our function call. It also prepares us for our CALLDATASIZE check!

```js
JUMPDEST ✅
PUSH1 0x43 ✅
PUSH1 0x3f ✅
CALLDATASIZE ✅
PUSH1 0x04 ✅
PUSH1 0x59 ✅
JUMP ✅
```

### CALLDATASIZE Check

Next our execution is going to check our `CALLDATASIZE`. We want to be sure that the data received, when the `function selector` is removed, is still large enough to satisfy the requirements of our function parameter - in this case we need a 32 byte integer or our `CALLDATASIZE - func_selector` to be > `0x20`

```js
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
```

### Isolating Passed Data

If the `calldata` passes this size check, we next jump and isolate the parameter from the `calldata` by loading 32 bytes of `calldata` starting at `0x04`:

```js
JUMPDEST ✅
POP ✅
CALLDATALOAD ✅
SWAP2 ✅
SWAP1 ✅
POP ✅
JUMP ✅
```

### Add Data to Storage

Lastly, we take this value and finally store it in storage slot 0 and then stop execution:

```js
JUMPDEST ✅
PUSH0 ✅
SSTORE ✅
JUMP ✅

JUMPDEST ✅
STOP ✅
```

That's it! The transaction is done!

It's easy to see at first glance (if you remember back to our Huff implementation), that we wrote _much less_ Huff code. It's clear why this is the case, now, isn't it? We performed many fewer checks and we didn't have to jump around! If we were focused on hyper gas optimized code, we may want to remove some of these checks that Solidity performs - but this is a double edged sword. These checks are often in place for a reason and to protect against potential vulnerabilities and bugs!

There's more for us to do still! One function down, let's keep going.
