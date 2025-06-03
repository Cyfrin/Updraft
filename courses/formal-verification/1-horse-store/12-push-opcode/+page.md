---
title: Push Opcode in Huff
---

_Follow along with this video:_

---

### Applying Things in Huff

Let's jump back into our Huff contract, `HorseStore.huff`.

```
#define macro MAIN() = takes(0) returns(0) {}
```

Alright! Now, how do we make this contract dispatch our `calldata` such that when we `updateHorseNumber` the number is actually updated?

We know now that when we call our `updateHorseNumber()` function, we're sending this blob of data:

```
0xe026c0170000000000000000000000000000000000000000000000000000000000000001
```

Our next step is going to be finding the function selector in this data and routing it to the code that updates horses.

I'll mention here, so you're aware moving forward, Huff is smart enough to infer `PUSH` op codes from the data being passed.

What this means is, in Huff, these two methods are effectively equal:

```
#define macro MAIN() = takes(0) returns(0) {
    PUSH0 0x00
}
```

```
#define macro MAIN() = takes(0) returns(0) {
    0x00
}
```

Our first operation, is going to be pushing 0 to the stack with `0x00` as shown above. The reason for this will be made more clear as we continue.

Currently our contract will push 0 to the stack, no matter what `calldata` is sent to it. Let's look at how this change in our contract is reflected in the contract's bytecode.

If you remember, our empty `MAIN` macro returned `60008060093d393df3` as the `Contract Creation` section of it's bytecode. If we run `huffc -b src/horseStoreV1/HorseStore.huff` on our new contract we should see something like this:

```bash
60008060093d393df35F
```

Looking closely, we see `5F` appended to the end of our previous bytecode string. [**evm.codes**](https://www.evm.codes/?fork=shanghai) will show us that indeed, this hex represents PUSH0!

![push-opcode-1](/formal-verification-1/12-push-opcode/push-opcode-1.png)

We did it!
