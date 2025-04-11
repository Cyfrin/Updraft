---
title: SSTORE
---

_Follow along with this video:_

---

### Adding Things to Storage

```js
#define macro SET_NUMBER_OF_HORSES() = takes(0) returns(0){
    // 1. Get the value to store from call data
    // 2. Give numberOfHorses a storage slot
    // 3. Execute the SSTORE op code
}
```

These are the steps, determined in our previous lesson, that we need to take in order to add the necessary logic to our Huff macro. For our first step, we're going to leverage the `SSTORE` op code.

::image{src='/formal-verification-1/28-sstore/sstore-1.png' style='width: 50%; height: auto;'}

The stack inputs required are a **key** and a **value**

- **Key** - 32 byte key - this is **where** in storage our data will be saved
- **Value** - 32 byte value - this is **what** will be saved at our key's location in storage

Note as well that this op code doesn't have any stack outputs. Executing this operation will pop the top two items off our stack and return nothing to it.

Now that we understand how the `SSTORE` op code functions, we'll employ it in our contract in the next lesson.
