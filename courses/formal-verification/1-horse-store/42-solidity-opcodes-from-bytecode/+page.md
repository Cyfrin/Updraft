---
title: Solidity Op Codes from Bytecode
---

_Follow along with this video:_

---

### Breaking Down Solidity

In this lesson we're going to breakdown Solidity into it's component bytecode and directly compare the op codes in Solidity with those of Huff.

Start by creating a new folder named `breakdowns`, we'll be compiling our op code breakdowns in here.

Navigate to `out/horseStoreV1/HorseStore.sol/HorseStore.json`. This is the ABI of our deployed HorseStore contract. Within this file you'll find a `bytecode` object with an `object` property. This represents our op codes for the contract in bytecode!

![solidity-opcodes-from-bytecode1](/formal-verification-1/42-solidity-opcodes-from-bytecode/solidity-opcodes-from-bytecode1.png)

Create a new file named `solc-breakdowns.c++`. This won't actually be a C++ file, but some of the syntax highlighting for C++ will make things easier on us. You can paste your bytecode to the top of this file as a comment for reference.

As we know, every 2 digits in this bytecode represents an op code. For example, the very first pair `60` is `PUSH1`. We could absolutely go through the bytecode, pair by pair and break things down that way.

But that's a lot of work.

Let's take our bytecode and paste it into the **[evm.codes playground](https://www.evm.codes/playground)**. By switching the left panel to `mneumonic` via the drop down we'll be given a list of the op codes for this contract! It should look something like this:

<details>
<Summary> Op Codes </summary>
```
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


Paste this into our `solc-breakdowns.c++` files and we'll get started walking through this contract's execution in the next lesson.
