---
title: Huff - FREE_STORAGE_POINTER
---

_Follow along with this video:_

---

### Assigning Storage Slots

Our numberOfHorses variable requires a storage slot, and there's a number of ways we could approach this. We could absolutely hardcode a storage slot for example.

Fortunately, Huff makes working with storage slots a little bit easier through a convenient abstraction: `FREE_STORAGE_POINTER()`. `FREE_STORAGE_POINTER()` effectively works as a counter for available storage slots. Let's add this to our code base.

```js
/*Interface*/
#define function updateHorseNumber(uint256) nonpayable returns()
#define function readNumberOfHorses() view returns(uint256)

#define constant NUMBER_OF_HORSES_STORAGE_SLOT = FREE_STORAGE_POINTER()

#define macro MAIN() = takes(0) returns(0){
    0x00 calldataload 0xe0 shr                                  // [function_selector]

    // updateHorseNumber, 0xcdfead2e
    dup1 __FUNC_SIG(updateHorseNumber) eq updateJump jumpi      // [function_selector]

    // readNumberOfHorses, 0xe026c017
    __FUNC_SIG(readNumberOfHorses) eq readJump jumpi            // []

    0x00 0x00 revert

    updateJump:
        SET_NUMBER_OF_HORSES()
    readJump:
        GET_NUMBER_OF_HORSES()
}

#define macro SET_NUMBER_OF_HORSES() = takes(0) returns(0){}
#define macro GET_NUMBER_OF_HORSES() = takes(0) returns(0){}
```

What the line `#define constant NUMBER_OF_HORSES_STORAGE_SLOT = FREE_STORAGE_POINTER()` is doing is defining a particular storage slot to be used for this constant variable. `FREE_STORAGE_POINTER()` will return the next sequentially available storage slot, assigning our constant, in this case, to 0. The next time `FREE_STORAGE_POINTER()` is called it will assign 1.

This is exactly how Solidity handles things as well!

![free-storage-pointer-1](/formal-verification-1/29-free-storage-pointer/free-storage-pointer-1.png)

With our above implementation, any time somebody looks at storage slot 0, that's where numberOfHorses will be found. Great work!
