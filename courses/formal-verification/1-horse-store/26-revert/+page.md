---
title: Revert
---

_Follow along with this video:_

---

## What Happens When We Don't "Jump"?

Now that we've accounted for each of our contract's function in our function dispatcher, we're done, right? Not exactly. Our code won't just stop executing if no valid `JUMPDEST` is found, it'll continue to the next operation (which in our case happens to be a `JUMPDEST`).

We could easily imagine a scenario where `calldata` is sent to our contract, no `function selector` matches are found, and arbitrary code is executed when we don't intend!

We should protect against this by terminating the execution when no matches are found by our dispatcher. We can leverage the `REVERT` opcode to do this.

![revert-1](/formal-verification-1/25-revert/revert-1.png)

The revert opcode takes two stack inputs, the **byte offset** and **byte size**. Both of these are used to return data from memory (like an error code) when the REVERT operation is executed. We haven't dealt with memory and have no errors so we won't worry about this, we'll simply pass 0s.

Our Huff contract with REVERT implemented should look something like this.

```js
#define macro MAIN() = takes(0) returns(0){
    0x00
    calldataload
    0xe0
    shr        // [function_selector]

    dup1       // [function_selector, function_selector]

    0xcdfead2e // [0xcdfead2e, function_selector, function_selector]
    eq         // [true/false, function_selector]
    updateJump // [updateHorseNumberProgramCounter, true/false, function_selector]
    jumpi      // [function_selector]

    0xe026c017 // [0xe026c017, function_selector]
    eq         // [true/false]
    readJump   // [readHorseNumberProgramCounter, true/false]
    jumpi      // []

    0x00       // [0]
    0x00       // [0,0]
    revert     // []

    updateJump:
        SET_NUMBER_OF_HORSES()
    readJump:
        GET_NUMBER_OF_HORSES()
}

#define macro SET_NUMBER_OF_HORSES() = takes(0) returns(0){}
#define macro GET_NUMBER_OF_HORSES() = takes(0) returns(0){}
```

Now, if we head back to the [**evm.codes playground**](https://www.evm.codes/playground) with our new runtime bytecode (`huffc src/horseStoreV1/HorseStore.huff --bin-runtime`), we can send some garbage `calldata` and step through the operations to see how the contract responds.

![revert-2](/formal-verification-1/25-revert/revert-2.png)

It seems our revert works exactly as intended! Our revert code will terminate the execution if hit and return an error!

Great Job!
