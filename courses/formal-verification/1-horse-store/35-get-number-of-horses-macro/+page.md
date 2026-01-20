---
title: Get Number of Horses Macro
---

_Follow along with this video:_

---

So, let's add the necessary logic to our Huff contract.

```js
#define macro GET_NUMBER_OF_HORSES() = takes (0) returns (0) {
   [NUMBER_OF_HORSES_STORAGE_SLOT] // [KEY]
   sload                           // [VALUE]
}
```

In the above, we reference the slot we'd assigned to that constant and load it from storage. In order to return this value, we must first add it to memory.

Recall our stack inputs for the `mstore` opcode which we'll be using to accomplish this, `offset` and `value`.  Offset, in this case, can be thought of like 'the index of memory', but it represents the bytes offset of the data we're intending to pull from memory.

Because we don't have anything in memory, we can just `PUSH0` to our stack for this required input.

```js
#define macro GET_NUMBER_OF_HORSES() = takes (0) returns (0) {
   [NUMBER_OF_HORSES_STORAGE_SLOT] // [KEY]
   sload                           // [VALUE]
   0x00                            // [0, VALUE]
   mstore                          // [] / Memory: [VALUE]
}
```

You'll notice that our stack is empty after executing our `mstore` operation.  This is where things can get tricky while working with Assembly and Huff. Our data structures can become difficult to keep track of when they scale.  While our stack may be empty, we now have our value contained in memory.


When working with lots of data, it can be troublesome to keep track of 'what's in the stack?', 'what's in memory?', 'what's in storage?'.  This is precisely why people choose to program in abstracted languages like Solidity.

Alright, now that we have our data in memory - we need to return it, with the `return` opcode.

`Return` takes an `offset` and a `size`. The `offset` is our 'index in memory`, 0x00 (0) in our case. And the size of our return data is going to be 0x20 (32 bytes).  Our macro should look like this now:

```js
#define macro GET_NUMBER_OF_HORSES() = takes (0) returns (0) {
   [NUMBER_OF_HORSES_LOCATION] // [KEY]
   sload                           // [VALUE]
   0x00                            // [0, VALUE]
   mstore                          // [] / Memory: [VALUE]
   0x20                            // [0x20] / Memory: [VALUE]
   0x00                            // [0x20, 0x00] / Memory: [VALUE]
   return                          // [] / Memory: []
}
```

That's all there is to it. This is going to return our requested data from memory and ***exit the current context successfully***

We can compile our contract again now to obtain our new runtime bytecode. Let's head back over to the **[evm.codes playground](https://www.evm.codes/playground)** to test.

```
huffc src/horseStoreV1/HorseStore.huff --bin-runtime
5f3560e01c8063cdfead2e1461001b578063e026c01714610022575b6004355f55005b5f545f5260205ff3
```