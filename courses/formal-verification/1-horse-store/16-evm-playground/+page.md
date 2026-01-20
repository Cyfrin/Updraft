---
title: evm.codes playground
---

_Follow along with this video:_

---

### evm.codes Playground

evm.codes provides us a brilliant [**playground**](https://www.evm.codes/playground) to test some this out and perform a sanity check on our math!

We'll consider again our original value `0x0102`. If we `shr` by 4 we expect a hex output of `0x10`, which is `16` in decimal notation.

> **Note:** We're able to convert our returned hex value into its decimal form with the command `cast --to-base 0x10 dec`

Let's see how this works in the evm.codes playground!

Recall what's required on our stack for our `shr` opcode to function. `shr` takes `number of bits to shift` and the `32 bytes to shift`. These items need to be in our stack, in this order (top down). Our order of operations in the playground should look like this:

![evm-playground-1](/formal-verification-1/15-evm-playground/evm-playground-1.png)

By clicking `Run` in the playground we can then step through each opcode and see how it affects our **memory**, **stack**, **storage** and **return values**.

Stepping through our first operation, we can see that 102 is added to our stack.

![evm-playground-2](/formal-verification-1/15-evm-playground/evm-playground-2.png)

The second operation adds 4 to the top of our stack.

![evm-playground-3](/formal-verification-1/15-evm-playground/evm-playground-3.png)

And our final step leaves us with `10` on our stack.

![evm-playground-4](/formal-verification-1/15-evm-playground/evm-playground-4.png)

This is a hex value which we know we can convert using `cast --to-base 0x10 dec`. We indeed get 16!

### A Note On calldataload

It's important to note that `calldataload` will only place **32 bytes** on the stack. This means, in our previous `calldata` example, **_the last 8 digits of our calldata will not be included_**

```
0xe026c0170000000000000000000000000000000000000000000000000000000000000001

Becomes

0xe026c01700000000000000000000000000000000000000000000000000000000
```

Would that we needed to access the data further in the `calldata` string, that's when we would utilize an offset greater than 0!
