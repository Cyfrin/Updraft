---
title: shr (Right Shift)
---

_Follow along with this video:_

---

The next part can be a little tough to grasp at first, and that's ok. Take your time and work through a few examples to really help this stick.

### Slicing Bits

Our ultimate goal is to access the `function selector` of the `calldata` sent to our contract. This is represented by the first 8 bytes of our `calldata`.

```
0xe026c0170000000000000000000000000000000000000000000000000000000000000001
```

In order to achieve this, there's an op code we can use! 😲

In [**evm.codes**](https://www.evm.codes/?fork=shanghai) search for `shr`. This stands for `Shift Right` and is precisely the tool we need.

![shr-1](/formal-verification-1/14-shr/shr-1.png)

In order to use this op code, we need 2 items on the stack

- shift: number of bits to shift to the right
- value: 32 bytes to shift

Let's look at a simpl example!

Consider below:

```
0x0102 (2 bytes)
1 byte = 8 bits
```

It's important to remember that the `shr` op code is how many _bits_ we're shifting to the right, _not bytes_.

This means we can rewrite our hex in binary to see it's bits representation. We can use the command `cast --to-base 0x0102 bin` to have the binary output for us.

```
0b100000010
```

In the above `1` represents `01` and `00000010` represents `02`.

> **Note:** It may seem like we're only having 9 bits returned to us, but the value of `1` is being truncated. `1` in this circumstance is equivalent to `00000001`

So, let's say we want to `shr` 2 bits from our value of `0b100000010`. This is going to remove the two right most digits and shift everything else to the right. Our output should be `0b001000000`

We can then use Foundry once more to see what this value would be in hex:

```
cast --to-base 0b001000000 hex
```

The output we receive is `0x40`!

I encourage you to test this out further yourself. Try shifting a variety of decimal places and experiment with how this affects your output.
