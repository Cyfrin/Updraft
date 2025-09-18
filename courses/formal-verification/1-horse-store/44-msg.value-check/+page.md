---
title: MSG.VALUE Check (Non-Payable Constructor)
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

    CALLVALUE     //<---- We are here!
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


### Non-Payable Constructor Check

When going through opcodes, I like to repeatedly ask myself _What does this chunk do?_. Let's look at the next check and walk through is execution.

I'll typically look out for 'break points', things like `Revert` and `Return` to determine where a "chunk" starts and stops.

```
CALLVALUE    // [msg.value]
DUP1         // [msg.value, msg.value]
ISZERO       // [msg.value == 0, msg.value]
PUSH1 0x0e   // [0x0e, msg.value == 0, msg.value]
JUMPI        // [msg.value]
PUSH0        // [0, msg.value]
DUP1         // [0, 0, msg.value]
REVERT       // [msg.value]
```

I've added our comment notation to our opcode list to keep track of what's on our stack. So, what's happening here?

We've seen many of these opcodes before, but some of them are new. Each time a new opcode is mentioned, I'll include a screenshot of it's details from [evm.codes](https://www.evm.codes/#34?fork=cancun). I encourage you to use this website like a dictionary as we attempt to define what's being executed. `CALLVALUE` adds to the stack, the value included with the current call.

![msg_value-check1](/formal-verification-1/44-msg.value-check/msg_value-check1.png)

We then duplicate this value with `DUP1` and check if it's equal to zero with the conditional `ISZERO`

![msg_value-check2](/formal-verification-1/44-msg.value-check/msg_value-check2.png)

Next it looks like we're setting up the executions response to this `ISZERO` conditional. We push a program counter/jump destination to the stack with PUSH1 0x0e then execute JUMPI.

If the result of ISZERO is true (the msg.value is zero), the execution will jump to 0x0e to continue.

If the result of ISZERO is false (the msg.value is greater than zero), the execution won't jump. We see the next operations queues if we don't jump:

```
PUSH0
PUSH0
REVERT
```

It's going to revert! You can even see this in our foundry script if you try to pass a value to our contract creation, in our test. It won't even let us compile!

![msg_value-check3](/formal-verification-1/44-msg.value-check/msg_value-check3.png)

### Summary

To summarize, what this chunk is doing is:

1. Checks if a value is being sent with our constructor/contract creation
2. reverts if value is being sent
3. jumps over revert to continue logic if no value is sent.

Things really become easier if you break them down one step at a time. Let's see what happens if we don't revert in the next lesson.
