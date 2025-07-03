---
title: DUP1
---

_Follow along with this video:_

---

### Duplicating Stack Items

At this point, what we've written will handle call data which pertains to the updateHorseNumber function selector. We need to ask ourselves - _"How are we going to handle if a different selector is passed with our received `call data`?"_

We could do another comparison, but if we haven't jumped anywhere, our stack is empty. We would have to again derive what the call data's function selector is from scratch, implementing another round of `calldataload` and `shr`. There may be a better way...

```js
#define macro MAIN() = takes(0) returns(0){
    0x00
    calldataload
    0xe0
    shr        // [function_selector]
    0xcdfead2e // [0xcdfead2e, function_selector]
    eq         // [true/false]
    updateJump // [updateHorseNumberProgramCounter, true/false]
    jumpi      // []

    updateJump:
        SET_NUMBER_OF_HORSES()
}

#define macro SET_NUMBER_OF_HORSES() = takes(0) returns(0){}
```

An op code is available to us which will help us achieve a cleaner and more gas efficient path to our goal, `DUP1`

![dup1-1](/formal-verification-1/22-dup1/dup1-1.png)

`DUP1` simply takes the top item of the stack, copies it and adds both items back to the stack. By executing this op code directly after the first time we accessed the `call data`'s `function selector`, it would keep a copy of this selector for us to access, on the bottom of our stack. How does this look in our code?

```js
#define macro MAIN() = takes(0) returns(0){
    0x00
    calldataload
    0xe0
    shr        // [function_selector]

    dup1       // [function_selector, function selector]

    0xcdfead2e // [0xcdfead2e, function_selector, function selector]
    eq         // [true/false, function selector]
    updateJump // [updateHorseNumberProgramCounter, true/false, function selector]
    jumpi      // [function selector]

    updateJump:
        SET_NUMBER_OF_HORSES()
}

#define macro SET_NUMBER_OF_HORSES() = takes(0) returns(0){}
```

I've updated the comments in the code above to visualize how our duplicated `function selector` is carried through each step of execution. We see resultingly that, if we don't jump to `updateJump`, our stack still retains the `function selector` that was passed with the received `call data`.

Now that we have access to this function selector again, we're prepared to start handling calls to `readNumberOfHorses()`. Let's look at that in the next lesson!
