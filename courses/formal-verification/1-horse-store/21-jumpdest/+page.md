---
title: JUMPDEST
---

_Follow along with this video:_

---

We're going to take a look at how this function in the [**evm.codes playground**](https://www.evm.codes/playground), and there's actually a convenient method, build into Huff, that allows us to retrieve the runtime bytecode of our compiled contract!

```
huffc src/horseStoreV1/HorseStore.huff --bin-runtime
5f3560e01c63cdfead2e1461000f575b
```

Paste the returned runtime bytecode into the evm.codes playground and let's step through what's happening with our contract.

![jumpdest-1](/formal-verification-1/21-jumpdest/jumpdest-1.png)

By adding the runtime bytecode to the playground, we're presented with almost exactly what we wrote in Huff, converted to pure opcodes. Something that's going to stand out is the `JUMPDEST` code. To understand this opcode, let's take one step back.

In the previous lesson we'd set `updateJump` as a pointer to our program counter of `SET_NUMBER_OF_HORSES()`. This is only partially true. When a `JUMP` or `JUMPI` opcode is executed, it requires a stack input of a `valid jump destination`. Huff's syntax allows us to define `updateJump` as a new `valid jump destination` before our `JUMPI` operation is executed.

```js
updateJump: SET_NUMBER_OF_HORSES(); // sets the compiled location of the SET_NUMBER_OF_HORSES macro as a valid jump destination.
```

So, looking again at our playground:

- Op Codes 1-4 - isolating `function selector` from received `calldata`
- PUSH4 - Pushes our known `function selector` to the stack
- EQ - Compares our isolated `function selector` to our known selector and returns 0/1
- PUSH2 - Adds our jump destination to the stack
- JUMPI - Jumps to our destination if the value returned by EQ is anything other than 0
- JUMPDEST - An empty stack at our jump destination

![jumpdest-2](/formal-verification-1/21-jumpdest/jumpdest-2.png)

Currently of course, nothing is going to happen after we jump to our new destination. We haven't added any logic to our macro yet. I encourage you to experiment in the playground before moving on.

What's left on our stack after stepping through the code?
What happens if we provide calldata that doesn't start with our expected `function selector`?

Answer these questions, and I'll see you in the next lesson!
