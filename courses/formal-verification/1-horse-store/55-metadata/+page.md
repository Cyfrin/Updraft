---
title: Metadata
---

_Follow along with this video:_

---

### Metadata

Alright! We've gone through all of the contract's `creation code` and `runtime code`. All that's left is the `metadata` ...it kinda looks like a mess at the end of our contract's opcodes.

```js
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

Ultimately, this is inaccessible code that exists to detail things like compiler version, how the contract was compiled or optimized etc. Tools like etherscan utilize metadata like this for verification purposes for example.

Metadata isn't very important for things we'll be covering in this course, but if you'd like to learn more about it. I encourage you to dive into the [Solidity Compiler](https://docs.soliditylang.org/en/latest/metadata.html).
