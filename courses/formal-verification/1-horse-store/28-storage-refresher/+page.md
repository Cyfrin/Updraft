---
title: Storage Refresher
---

_Follow along with this video:_

---

### Storage Refresher

With our function dispatcher and interfaces set up, we're finally ready to add some logic to our macros! We're going to begin with `SET_NUMBER_OF_HORSES()` as one of our first steps will be assigning a storage slot to our `numberOfHorses` variable.

When we think of storage, we can think of it as a giant, persistent array. When a transaction's execution completes, storage remains and is not cleared.

In Solidity each variable is mapped to a storage slot sequentially as they are defined in the contract. It's important to note however:

- Constant Variables are not saved to storage
- Mappings and arrays are handled uniquely using a hashing algorithm to assign the storage locations of their contents. Specific details on this can be found in the [**Ethereum Documentation**](https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html).
- Memory variables are not saved to storage

So, in order to update storage, there are a few things we need to do.

```js
#define macro SET_NUMBER_OF_HORSES() = takes(0) returns(0){
    // 1. Give numberOfHorses a storage slot
    // 2. Get the value to store from calldata
    // 3. Execute the SSTORE opcode
}
```

Great! Once we've implemented this logic, we're going to be able to write some tests to compare the functionality of our Huff contract with that of our Solidity version, and - hopefully - we'll see they do exactly the same thing. Let's go!
