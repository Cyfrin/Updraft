---
title: Opcodes and Stack Machine Introduction Recap
---

_Follow along with this video:_

---

### Recap

We've learnt a _tonne_ already. I think it's time we did a recap of everything so far.

### EVM and Memory

We started by diving into the EVM and learning more about how it works and processes memory. One of our biggest takeaways is that there are multiple locations that data can be stored.

- **The Stack**: Think of it as a pile of plates where you only have access to the topmost plate. In programming terms, it's where temporary variables are stored, and it's the main data structure for manipulating data in the EVM.
- **Memory**: This is a temporary place to store data. It's volatile, meaning the data is lost when a transaction finishes.
- **Storage**: The EVM's version of a hard drive. It's persistent and is used to store data across transactions.

The **stack**, **memory**, and **storage** each serve important and distinct purposes within the EVM architecture. Having a solid grasp of how they function and interact empowers developers to build efficient smart contracts that make optimal use of available resources.

For example, understanding that data stored only in memory will not persist across transactions could influence a developer to store critical data in storage instead.

Most of the time we're manipulating data, it's going to be on the stack and we'll be storing it in memory or storage for recall later.

### Op Codes

We also learnt that the EVM is effectively comprised of `op codes` which denote the operations we want executed. [**evm.codes**](https://www.evm.codes/?fork=shanghai) has been incredibly useful for us in our learning about the specifics of each `op code`!

When sending data to a smart contract, we introduced the concept of `calldata`. When Solidity compiles, through it's use op codes it's able to understand the provided `calldata`, and one of the first things it attempts to determine is **_"What am I supposed to do with this data?"_**. The EVM accomplishes this through referencing a `calldata's` `function selector` and a process called `function dispatching` in which case the rest of the `call data` is routed to the function associated with this `function selector`.

### Huff

What's really exciting is we accomplished the above (sans dispatching, that's coming next!), using Huff and raw `op codes`.

```js
#define macro MAIN() = takes(0) returns(0){
    0x00 calldataload 0xe0 shr   // [function_selector]
}
```

- **0x00** - **PUSH0** - Adds 0 to the stack
- **calldataload** - Takes the top stack item as an offset value and adds the next 32 bytes of `calldata` to the stack
- **0xe0** - **PUSH1** - Adds 224 to the top of the stack
- **shr** - Takes the top stack item as `number to shift` and the following stack item as `32 bytes of data to shift`

Performing the above operations leaves us with our 4 byte `function selector`!

We can check how the byte code of our contract is doing so far with `huffc src/horseStoreV1/HorseStore.huff -b`, we should receive this:

```bash
60058060093d393df35f3560e01c
```

We were also introduced to the evm.codes playground, wherein we can experiment with byte code and op code inputs to walk through each operation being executed. In the screenshot below, I've included the runtime byte code and we can see that it is indeed exactly what we've coded in our Huff contract!

::image{src='/formal-verification-1/17-opcodes-recap/opcodes-recap-1.png' style='width: 100%; height: auto;'}

In the next lesson we'll try our luck at function dispatching and routing the `call data` to where it needs to be. Let's go!
