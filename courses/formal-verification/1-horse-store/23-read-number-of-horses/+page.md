---
title: readNumbersOfHorses function dispatch
---

_Follow along with this video:_

---

### Function Dispatching to readNumberOfHorses

Now that our `calldata`'s `function selector` is available to us on the stack again, we can progress, just like before in our comparison to a known `function selector` and jumping to that `program counter`.

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

    updateJump:
        SET_NUMBER_OF_HORSES()
    readJump:
        GET_NUMBER_OF_HORSES()
}

#define macro SET_NUMBER_OF_HORSES() = takes(0) returns(0){}
#define macro GET_NUMBER_OF_HORSES() = takes(0) returns(0){}
```

So, what's happening in the code above?

Continuing from where our code had previously left off, we're performing the same operations as before though with our new `function selector`. We `PUSH` `0xe026c017` to the stack and compare it to our duplicated `function selector`. This time, if a match is found, we jump to the location of the new macro we created `GET_NUMBER_OF_HORSES()`.

Notice how we didn't execute `DUP1` a second time. We've omitted it this time as we know we won't need to perform further checks. What's especially cool about this is you've just written a function dispatcher this is **_more gas efficient_** than Solidity's! Solidity's function dispatching process would have unnecessarily duplicated our `calldata` bytecode a second time - wasting gas!

In the next lesson, we'll look more closely at JUMPDEST in [**evm.codes**](https://www.evm.codes/?fork=shanghai).
