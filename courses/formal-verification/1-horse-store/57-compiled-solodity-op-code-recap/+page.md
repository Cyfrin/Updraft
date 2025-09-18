---
title: Compiled Solidity Op Code Recap
---

_Follow along with this video:_

---

### Recap

Ok, we've learn a lot in this section, let's take one more moment to summarize everything we've gone through. This will be the only time we go opcode by opcode - unless we have to 🤷‍♂️

Maybe we're dealing with Assembly, or auditing a compiler or super optimizing a contract - this skill set can be very useful when things get low level or difficult.

We've mentioned it often, but if you want to familiarize yourself even further with all the different opcodes in the EVM absolutely check out [evm.codes](https://www.evm.codes/#34?fork=cancun). If you don't feel comfortable with opcodes yet, the more you play with them the better you will be.

---
In this section we learnt that most smart contracts are compiled into 3 sections:

1. Contract Creation
2. Runtime
3. Metadata

Huff generally omits metadata and just compiles into Contract Creation and Runtime code.

We learnt that in Solidity, all code starts with setting up a `free memory pointer`

```js
PUSH1 0x80
PUSH1 0x40
MSTORE
```

We didn't update it often in our codebase, but we can see that if accessing memory often we would need to consistently keep track of where free memory is located by updating this pointer.

We learnt that Solidity, at the opcode level, performs a bunch of checks, like checking `calldata` for msg.value and assuring `calldata` being passed is of the correct size.

msg.value check:
```js
CALLVALUE ✅
DUP1 ✅
ISZERO ✅
PUSH1 0x0e ✅
JUMPI ✅
```

Call data size check:
```js
JUMPDEST ✅
PUSH1 0x43 ✅
PUSH1 0x3f ✅
CALLDATASIZE ✅
PUSH1 0x04 ✅
PUSH1 0x59 ✅
JUMP ✅
```

We also learnt that our Contract Creation code is going to contain the CODECOPY opcode  which is why executes putting our contract on-chain.

```js
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
```

In Solidity, we determined that the `runtime code` was going to be the entry point of our contract for any `calldata` passed to it, and functions similarly to the `MAIN()` macro we wrote in Huff

We discovered how Solidity's `function dispatching` works, after all the checks are passed! The dispatcher will compare the first 4 bytes of our received calldata to find a match with the known `function selectors` of our contract and will use any found matches to route our execution to the appropriate `JUMPDEST`

```js
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
```

We even learnt how to reference and manipulate the free memory pointer and saving and loading for storage! We've literally walked through every single opcode and disassembled this entire contract and stepped through what each of these opcodes is doing.

I cannot encourage you enough to tinker and explore with how all these works.  Change the contract, write your own, investigate how the bytecode and subsequent opcodes changes.

It's in this discovery that you will make the important mental connections pertaining to how the evm and contracts work together.