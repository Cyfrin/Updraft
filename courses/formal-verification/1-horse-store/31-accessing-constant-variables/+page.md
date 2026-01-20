---
title: Huff - Accessing Constant Variables
---

_Follow along with this video:_

---

```js
#define constant NUMBER_OF_HORSES_STORAGE_SLOT = FREE_STORAGE_POINTER()
```

Now, we're going to need to reference this storage slot in our `SET_NUMBER_OF_HORSES()` macro. The syntax for this is something new!

> **Note:** We're doing things a little out of order here, but we'll assure our operations are executed in the correct order by the end.

```js
#define macro SET_NUMBER_OF_HORSES() = takes(0) returns(0){
    // 1. Get the value to store from calldata
    // 2. Give numberOfHorses a storage slot
    [NUMBER_OF_HORSES_STORAGE_SLOT]            // [0]
    // 3. Execute the SSTORE opcode
}
```

The syntax above references our defined constant and pushes its value to the top of our stack. `NUMBER_OF_HORSES_STORAGE_SLOT` is assigned a value of 0, thus 0 is added to the top of our stack. With our storage slot constant defined, we're now going to need the value we're storing.

In the next lesson, we'll dive into how to isolate the function parameters from the `calldata` passed to our contract. See you there!
