---
title: Checking If Call Data Is Big Enough To Contain A Uint256
---

_Follow along with this video:_

---

### Checking Call Data Size

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

    JUMPDEST    //<--- We are here!
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


Ok, so what happens in our code when we reach jump dest 2?

```js
// updateNumberOfHorses jump dest 2
JUMPDEST     // [0x04, calldata_size, 0x3f, 0x43, func_selector]
PUSH0        // [0x00, 0x04, calldata_size, 0x3f, 0x43, func_selector]
PUSH1 0x20   // [0x20, 0x00, 0x04, calldata_size, 0x3f, 0x43, func_selector]
DUP3         // [0x04, 0x20, 0x00, 0x04, calldata_size, 0x3f, 0x43, func_selector]
DUP5         // [calldata_size, 0x04, 0x20, 0x00, 0x04, calldata_size, 0x3f, 0x43, func_selector]
SUB          // [(calldata_size - 0x04), 0x20, 0x00, 0x04, calldata_size, 0x3f, 0x43, func_selector]
SLT          // [(calldata_size - 0x04) < 0x20, 0x00, 0x04, calldata_size, 0x3f, 0x43, func_selector]
ISZERO       // [((calldata_size - 0x04) < 0x20) == 0, 0x00, 0x04, calldata_size, 0x3f, 0x43, func_selector]
PUSH1 0x68   // [0x68, ((calldata_size - 0x04) < 0x20) == 0, 0x00, 0x04, calldata_size, 0x3f, 0x43, func_selector]
JUMPI        // [0x00, 0x04, calldata_size, 0x3f, 0x43, func_selector]
```

Our stack is getting a little crazy, but each step should be pretty clear to us, we `PUSH0`, then `PUSH1 0x20` (0x20 == 32, this is important to know!) Then we reach DUP3, which we can speculate about, but haven't actually seen. Here's what [evm.codes](https://www.evm.codes/#34?fork=cancun) has to say:

![checking-call-data-size1](/formal-verification-1/51-Checking-If-Call-Data-Is-Big-Enough-To-Contain-A-Uint256/checking-call-data-size1.png)

In essence the DUP3 opcode is taking the third item from the top of the stack and duplicating it, adding this copy to the top of the stack. Given this, what do you think DUP5 does?

![checking-call-data-size2](/formal-verification-1/51-Checking-If-Call-Data-Is-Big-Enough-To-Contain-A-Uint256/checking-call-data-size2.png)

Shocking, I know.

Next we see two more opcodes we've not come across yet `SUB` and `SLT`

`SUB` is quite simply - subtraction. It's going to take the top item of our stack and subtract from it the second from top item in our stack.

![checking-call-data-size3](/formal-verification-1/51-Checking-If-Call-Data-Is-Big-Enough-To-Contain-A-Uint256/checking-call-data-size3.png)

`SLT` is `signed less than` and compares two signed integer values, returning 1 if the top item of our stack is less than the second from top item in our stack and returning 0 otherwise.

![checking-call-data-size4](/formal-verification-1/51-Checking-If-Call-Data-Is-Big-Enough-To-Contain-A-Uint256/checking-call-data-size4.png)

We can see the steps, but what are these operations actually doing?

Well, when we `DUP3` > `DUP5` we are setting up an assessment of our `calldata` by then calling `SUB` we're performing the operation `calldata_size - 0x04` which gives us a number which represents if our calldata was greater than 4 bytes in size - remember 4 bytes is the size of our `function selector`.

The next operation is `SLT` and here's where `0x20` being 32 is important.

We compare the result of `calldata_size - 0x04` with `0x20`. So we're asking:

**_If we remove what we expect to be the size of a function selector, is the remaining calldata less than 32 bytes?_**

This check is going to assure that calldata being passed to this function is greater than 32 bytes (which is what a uint256 parameter would be!). We then call `ISZERO` and `PUSH1 0x68`, and finally `JUMPI` if the calldata is the appropriate size.

```js
DUP3         // [0x04, 0x20, 0x00, 0x04, calldata_size, 0x3f, 0x43, func_selector]
DUP5         // [calldata_size, 0x04, 0x20, 0x00, 0x04, calldata_size, 0x3f, 0x43, func_selector]
SUB          // [(calldata_size - 0x04), 0x20, 0x00, 0x04, calldata_size, 0x3f, 0x43, func_selector]
SLT          // [(calldata_size - 0x04) < 0x20, 0x00, 0x04, calldata_size, 0x3f, 0x43, func_selector]
ISZERO       // [((calldata_size - 0x04) < 0x20) == 0, 0x00, 0x04, calldata_size, 0x3f, 0x43, func_selector]
PUSH1 0x68   // [0x68, ((calldata_size - 0x04) < 0x20) == 0, 0x00, 0x04, calldata_size, 0x3f, 0x43, func_selector]
JUMPI        // [0x00, 0x04, calldata_size, 0x3f, 0x43, func_selector]
// Jump to jump dest 3 if there is more calldata than function selector + 0x20!
```

If the calldata received, less the size of the function selector is _not_ 32 bytes in size, execution won't jump and we see what happens next - a revert block!

```js
JUMPI; // [0x00, 0x04, calldata_size, 0x3f, 0x43, func_selector]

PUSH0; // [0x00, 0x00, 0x04, calldata_size, 0x3f, 0x43, func_selector]
DUP1; // [0x00, 0x00, 0x00, 0x04, calldata_size, 0x3f, 0x43, func_selector]
REVERT; // []
```

We'll continue from jump dest 3 in the next lesson (spoiler - it's just after the revert we encountered!). See you there!
