---
title: CODECOPY
---

_Follow along with this video:_

---

### CODECOPY

Let's continue from our `JUMPDEST`. Our constructor wasn't sent any value and we avoided the initial `REVERT`.

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

    JUMPDEST       //<---- We are here!
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


```
JUMPDEST      // [msg.value]
POP           // []
PUSH1 0xa5    // [0xa5]
DUP1          // [0xa5, 0xa5]
PUSH2 0x001b  // [0x001b, 0xa5, 0xa5]
PUSH0         // [0x00, 0x001b, 0xa5, 0xa5]
CODECOPY      // ???
PUSH0
RETURN
INVALID
```

The first several op codes are examples of things we've seen before. Without getting into the specifics of what the data being added to the stack is, we can easily follow along with how the stack is being manipulated.

This continues until we reach the `CODECOPY` operation. We'd mentioned it briefly before, but now we're going to see it in action. Let see what it does.

![CODECOPY1](/formal-verification-1/45-CODECOPY/CODECOPY1.png)

Now, what's this doing in the context of our contract?

Here's our stack input:

- `destOffset`: byte offset in the memory where the result will be copied - for us we've set 0x00, so we're starting at the beginning of memory
- `offset`: byte offset in the code to copy - where in the code being copied, do we start copying? The value in our stack is 0x001b.

```bash
cast to-base 0x001b dec
27
```

This is literally saying 'start my copy at the 27th op code of the code being copied'.

I can tell you from experience - this is where our `runtime` bytecode begins and it is omitting the `creation code` seen at the start of our deployment! The copy will begin immediately after the `INVALID` op code coming up.

- `size`: byte size to copy - how much of the code to copy into memory. The value in our stack is 0xa5.

```
cast to-base 0xa5 dec
165
```

What we're passing turns out to bed 165 bytes of data, which represents the rest of our contract. Once that's copied into memory we can continue along with our next op codes...

```
JUMPDEST      // [msg.value]
POP           // []
PUSH1 0xa5    // [0xa5]
DUP1          // [0xa5, 0xa5]
PUSH2 0x001b  // [0x001b, 0xa5, 0xa5]
PUSH0         // [0x00, 0x001b, 0xa5, 0xa5]
CODECOPY      // [0xa5]   Memory: [Runtime Code]
PUSH0         // [0x00, 0xa5] Memory: [Runtime Code]
RETURN        // []
INVALID       // []
```

After copying our `runtime code` to memory we `PUSH0` and call `RETURN`.

![CODECOPY2](/formal-verification-1/45-CODECOPY/CODECOPY2.png)

`RETURN` takes a bytes offset and a size to be returned from memory. We're passing `0x00` and `0xa5` which represents the whole size of the `runtime code` we've copied into memory. This is what our transaction is returning and is being copied to the blockchain!

The astute among you may be asking - **_What about the `CREATE` and `CREATE2` op codes? Shouldn't they be called to save a contract on chain?_** - The short answer is, there are a few ways to save a contract to the blockchain.

`CREATE`/`CREATE2` are used by contracts to create other contracts. Another way to create a contract on chain is by passing `nil` in the `to` field of a transaction, which is what's done through the `RETURN` method we're leveraging here.

And with that - you now know how `contract creation code` works!
