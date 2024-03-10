---
title: getNumberOfHorses Macro
---

---

## Understanding Storage with `sload`

First up, we've got storage slots where all persistent contract data lives. To grab data from storage, we often use a handy operation called `sload`. All it requires is a key, which you can think of as an index pointing to where your data's at.

```js
// Fetching the number of horses from storage slot 0
uint number_of_horses = sload(0);
```

When you call `sload` with the index of `0`, you're essentially saying, "Hey, give me the number of horses that's stored right there at the starting gate." Once you've fetched it, the value is now chilling on your stack, ready for the next steps.

## Storing Your Data with `mstore`

But wait, before we can return this value to the outside world, we've got to transfer it to memory using `mstore`. This operation is all about placing data into a temporary workspace that only exists for the duration of a transaction or function call.

```js
// Storing the number of horses into the first slot of memorym
store(0x0, number_of_horses);
```

`mstore` requires two things: an offset and a value. The offset is the address in memory—we're using `0x0` here to indicate the very beginning. Think of it like the front of the line.

## The Challenge with Low-Level Code

Okay, let's pause for a sec. Working with raw opcodes and a language like Huff can be tough. You've got all these balls in the air—stack, memory, storage, and who knows what else. This complexity is exactly why most folks prefer Solidity for writing smart contracts. It handles all these juggled elements under the hood, letting you focus on your killer dApp instead of memory offsets.

## Returning the Value

Back on track—once we've got our data neatly stowed in memory, we're ready to serve it up:

```js
// Returning the 32 bytes of data starting from the 0 offset in memory
return 0x0, 0x20;
```

Here, `return` needs two parameters: an offset and a size. Since we're returning what's at the very beginning of memory, we stick with the `0` offset. For size, `0x20` is the magic number since it represents 32 bytes—just the right amount for an integer in Solidity.

## Wrapping Up the Process

Once you've mastered storing and retrieving data this way, you've unlocked a deeper understanding of how things work behind those high-level functions you're used to. And when you hit compile and everything ticks like a clock—well, that's the sweet sound of success!

Remember, we're diving into the underbelly of the beast here because it's important to understand how things work at a fundamental level. It'll make you a better developer and even help you optimize your smart contracts when gas prices are through the roof. Always think about what's happening under the hood!

## Final Thoughts

![placeholder](https://cdn.videotap.com/618/screenshots/h6w2qveg983JuLVF09Xz-171.06.png)

Dabbling in the world of low-level operations and assembly code isn't for the faint of heart. But it's an adventure that'll give you a new perspective on your Solidity code. When you see your neat high-level functions, you'll appreciate the intricate dance of opcodes and memory allocations happening backstage every time your smart contract executes.

As you continue exploring this realm, never hesitate to experiment and push the boundaries. After all, understanding the guts of Ethereum's EVM is a surefire way to sharpen your programming chops.

And that's all, folks! Here's to compiling great smart contracts without a hitch every time. Keep crafting incredible Ethereum magic!

Happy coding, and until next time.
