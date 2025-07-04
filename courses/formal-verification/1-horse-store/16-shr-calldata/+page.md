---
title: shr on calldataload
---

_Follow along with this video:_

---

### Bringing It Back To HorseStore

Ok! With everything we've just learnt firmly understood, lets return to our `HorseStore.huff` contract.

```js
#define macro MAIN() = takes(0) returns(0) {
    0x00             // [0]
    calldataload     // [calldata (32)]
}
```

The `calldata` we've added to our stack is the first 32 bytes of the `calldata` sent to our contract.

```
0xe026c01700000000000000000000000000000000000000000000000000000000
```

We only need the `function selector`, or the first 4 bytes. In order to isolate this section of the `calldata` we will need to utilize `shr` to shift 28 bytes to the right.

> **Remember:** `shr` takes the number of _bits_ to shift. 28 x 8 = 224 bits. Use `cast --to-base 224 hex` to glean that this number is `0xe0` in hexadecimal format.

With that determined, let's add what we need to our contract.

```js
#define macro MAIN() = takes(0) returns(0) {
    0x00             // [0]
    calldataload     // [calldata (32)]
    0xe0             // [0xe0, calldata (32)]
}
```

And our stack should look like this:

![shr-calldata-1](/formal-verification-1/16-shr-calldata/shr-calldata-1.png)

Our final step to isolate the `function selector` from our received `call data` is going to be executing the `shr` operation, exciting!

```js
#define macro MAIN() = takes(0) returns(0) {
    0x00             // [0]
    calldataload     // [calldata (32)]
    0xe0             // [0xe0, calldata (32)]
    shr              // [function_selector]
}
```

The stack now:

![shr-calldata-2](/formal-verification-1/16-shr-calldata/shr-calldata-2.png)

This is great! We finally have our `function selector` on the stack and we can finally start to do some function dispatching!

See you in the next one!
