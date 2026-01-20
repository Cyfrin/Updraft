---
title: Accessing Function Parameters From Call Data and STOP
---

_Follow along with this video:_

---

Great!  Our goal at this point is going to be deriving the parameters which have been passed to our function from the `calldata` we've received.  Let's remind ourselves what our received `calldata` looks like:

```
0xcdfead2e0000000000000000000000000000000000000000000000000000001
```

In this `calldata`, our function selector is represented by the first four bytes of the hex `0xe026c017`, the remaining digits of this hex string represent the data passed to our function. So, we need to determine two things:

1. How do we access the calldata we received from within our `SET_NUMBER_OF_HORSES()` macro?
2. How do we isolate the function parameters from our `calldata`?

Fortunate, the answer to both of these is effectively the same! We're going to use our friend `calldataload`. As before, you might remember, `calldataload` takes a single stack input - the bytes offset. This is going to allow us to control which section of the `calldata we're referencing. Let's look at this in code:

```js
#define macro SET_NUMBER_OF_HORSES() = takes(0) returns(0){
    // get the opcode from calldata
    0x04                              // [4] - Pushing '4' to the stack to be used as our bytes offset
    calldataload                      // [value] - Takes bytes offset from the stack, adds calldata offset by bytes offset to the stack
    // Assign a storage slot
    [NUMBER_OF_HORSES_STORAGE_SLOT]   // [storage_slot, value]
    // Storage the value in storage at the given storage_slot
    sstore
    stop
}
```

All that remains once our function parameters have been isolated and the storage slot determined is to actually store the value. As seen above, this is easily done by calling the `sstore` opcode.

<sstore img>

The sstore opcode takes 2 stack inputs, the storage slot key, and a value to store. These are ready for us on our stack.  

One important thing I'll mention, that you also see added to the code snippet above is the `stop` code I've added. We add this to explicitly tell our contract to stop executing at this point. If we didn't the code would continue running, line by line which at best is a waste of gas and at worst can execute arbitrary code in our protocol causing unpredictable effects!

>**Note:** The `stop` code *does not* revert, the transaction is considered successful.
