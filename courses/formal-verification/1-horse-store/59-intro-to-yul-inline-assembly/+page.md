---
title: Introduction to Yul/Inline Assembly
---

_Follow along with this video:_

---

### Yul/Julia

`Huff` and `binary/op codes` aren't the only ways available to us to do low level programming in `Solidity`. `Solidity` has compatibility with `Yul` built in, the strength of which is that is allows us to write `inline assembly`, directly into our smart contracts.

This allows us to largely take advanges of the abstactions of a language like `Solidity`, but retain the ability to get really granular/optimized when the case calls for it.

Taking a look at the [Yul Documentation](https://docs.soliditylang.org/en/latest/yul.html), you can find a list of op codes which can be used in-line via `Yul`. You're going to see lots of familiar things from what we used in Huff `add(x,y)`, `mul(x,y)`, `iszero(x,y)`, to name a few, are examples of the op codes made available to us in-line through `Yul` to optimize or granularly contract our smart contract's performance.

Let's look at `Inline Assembly` in more detail in the next lesson.