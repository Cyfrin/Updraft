---
title: Dispatching
---

_Follow along with this video:_

---

### Routing The Call

We've done it! We have the function selector on our stack. Now we want to route the `calldata` to the correct function. In Solidity, this is handled for us, but when we're programming in byte code we need to explicitly tell the EVM what's being done.

Alright, now that we have the function selector, we're going to proceed by doing a couple of comparisons and `jump` to the data associated with the selector.

In `HorseStore.sol` we've got two functions `updateHorseNumber()` and `readNumberOfHorses()`. Simple put, we're going to say:

If f_select == updateHorseNumber -> jump to that data in the contract
If f_select == readNumberOfHorses -> jump to that data in the contract

Let's see how that looks in practice in the next lessons.
