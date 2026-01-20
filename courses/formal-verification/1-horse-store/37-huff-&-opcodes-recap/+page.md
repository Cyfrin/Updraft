---
title: Huff & Op Codes Recap
---

_Follow along with this video:_

---

Wooo! This is very exciting. You've just written your first smart contract in Huff, and in so doing, you learnt a tonne about the deeper machinations of the EVM and how Op Codes work! Let's recap some of the more important things we've covered in this section.

### Function Dispatching

We learnt that, no matter the language you're writing your smart contract in(Solidity, Huff, Vyper..) they all start with a `Function Dispatcher`

A `function dispatcher` is a section of code which is responsible for checking the `function selectors` of passed `calldata` and routing the call to the appropriate logic associate with the `function selector`.

### Op Codes

In addition to working with `function dispatchers`, we learnt how to manage storage slots via Huff's `FREE_STORAGE_POINTER()`! We also learnt a variety of opcodes and they're uses. We learnt:

- PUSH# - Adds items to the stack with # being representative of the number of bytes being pushed.
- CALLDATALOAD - loads received `calldata` into the stack for reference.
- SSTORE - saves values to storage
- SLOAD - loads into the stack, values from storage
- MSTORE - add values to memory
- JUMPI - routes code executing to a particular section of logic based on a conditional.
- STOP - ends execution successfully
- REVERT - ends execution with error, unsuccessfully

### Wrap Up

This is heavy stuff, but you're doing great. If you're feeling a little overwhelmed - now's a great time to take a break. If things aren't quite clicking, I encourage you to come back and tinker with things. Make changes to our Huff contract, experiment with how the different opcodes interact with each other. Additionally, the [Huff Documentation](https://docs.huff.sh/) does a great job helping to understand the EVM and I encourage you to give it a read as supplemental learnings.

In the next lessons we're going to be diving into how to write Foundry tests which are compatible with Huff, allowing us to do all of our Huff debugging in Foundry. Let's go!
