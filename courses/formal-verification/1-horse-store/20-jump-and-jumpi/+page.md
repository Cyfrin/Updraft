---
title: JUMP & JUMPI
---

_Follow along with this video:_

---

Ok, we're making great progress in our efforts to code our Huff function dispatching! As of now, our stack should have the true/false returned value of our function selector comparison on it. We found this bool by executing the `EQ` opcode and comparing our calldata function selector with our known function selector.

Our next step will be routing this call to the correct `Program Counter` for that function. We'll do this using the `JUMP` or `JUMPI` opcodes, lets look at what they do in [**evm.codes**](https://www.evm.codes/?fork=shanghai).

**JUMP** - alters the `Program Counter`, thus breaking the linear path of the execution to another point in the deployed code. It is used to implement functionalities like functions.

**JUMPI (JUMP IF)** - _may_ alter the program counter, thus breaking the linear path of the execution to another point in the deployed code. It is used to implement functionalities like loops and conditions.

For our purposes, we're going to use `JUMPI` since we want to `JUMP` if our `function selector` comparison returns `True`.

![jump-and-jumpi-1](/formal-verification-1/20-jump-and-jumpi/jump-and-jumpi-1.png)

We can see that `JUMPI` takes two stack inputs. The first is a `counter`, which is the new `program counter` our code execution will continue from. In our example, this is our function location, this is where we want our `calldata` to be processed. The second input simply determines whether or not the `program counter` should be adjusted. If this value is 0, the current `program counter` is incremented, if the value is _anything else_ - the program counter will be set to whatever our first input is.

**Program Counter** - The Program Counter (PC) encodes which instruction, stored in the code, should be next read by the EVM. The program counter is usually incremented by one byte, to point to the following instruction, with some exceptions. For instance, the PUSHx instruction is longer than a single byte, and causes the PC to skip their parameter. The JUMP instruction does not increase the PC's value, instead, it modifies the program counter to a position specified by the top of the stack. JUMPI does this as well, if its condition is true (a nonzero code value), otherwise, it increments the PC like other instructions. - [evm.codes](https://www.evm.codes/about)

With a new understanding of our `JUMPI` opcode and how `program counters` work, we next need to set up 2 things in our `HorseStore.huff` contract.

- Create a macro which represents our updateHorseStore function logic
- Define the `program counter` for this macro

Here's our contract currently.

```js
#define macro MAIN() = takes(0) returns(0){
    0x00
    calldataload
    0xe0
    shr        // [function_selector]
    0xcdfead2e // [0xcdfead2e, function_selector]
    eq         // [true/false]
}
```

We're able to define a new macro, much like how we defined our `MAIN` macro. For now, we'll leave the logic out, our macro won't actually _do_ anything.

```js
#define macro MAIN() = takes(0) returns(0){
    0x00
    calldataload
    0xe0
    shr        // [function_selector]
    0xcdfead2e // [0xcdfead2e, function_selector]
    eq         // [true/false]
}

#define macro SET_NUMBER_OF_HORSES() = takes(0) returns(0){}
```

Now, in our `MAIN` macro, Huff affords us a nice syntax to assign reference to this macro's `program counter` That's going to look like this:

```js
#define macro MAIN() = takes(0) returns(0){
    0x00
    calldataload
    0xe0
    shr        // [function_selector]
    0xcdfead2e // [0xcdfead2e, function_selector]
    eq         // [true/false]
    updateJump // [updateHorseNumberProgramCounter, true/false]

    updateJump:
        SET_NUMBER_OF_HORSES()
}

#define macro SET_NUMBER_OF_HORSES() = takes(0) returns(0){}
```

In what we've added above, `updateJump` is pointing to the `program counter` of `SET_NUMBER_OF_HORSES()`. Now, our `JUMPI` opcode is going to take our `SET_NUMBER_OF_HORSES()` program counter from the top of the stack, and the next value down. We'll _jump_ to the location of the given `program counter` if this second value is **anything other than 0**.

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

Once the `JUMPI` operation is executed, our stack is empty! Let's take a look at what these changes have done to our contracts bytecode. Run `huffc src/horseStoreV1/HorseStore.huff -b`, we should receive an output as below. It keeps growing!

```
60108060093d393df35f3560e01c63cdfead2e1461000f575b
```

Great work so far! Let's keep going, next opcode we'll be working with is `JUMPDEST`
