---
title: Huff - __FUNC_SIF & INterfaces
---

_Follow along with this video:_

---

### Cleaning Up Our Code

Great! At this point we've written our very own function dispatcher, and when we start breaking down Solidity bytecode, later in the course, you'll see that Solidity is going through this exact same process (with a few extra opcodes we'll explain).

```js
#define macro MAIN() = takes(0) returns(0){
    0x00
    calldataload
    0xe0
    shr        // [function_selector]

    dup1       // [function_selector, function_selector]

    0xcdfead2e // [0xcdfead2e, function_selector, function_selector]
    eq         // [true/false, function_selector]
    updateJump // [updateHorseNumberProgramCounter, true/false, function_selector]
    jumpi      // [function_selector]

    0xe026c017 // [0xe026c017, function_selector]
    eq         // [true/false]
    readJump   // [readHorseNumberProgramCounter, true/false]
    jumpi      // []

    0x00       // [0]
    0x00       // [0,0]
    revert     // []

    updateJump:
        SET_NUMBER_OF_HORSES()
    readJump:
        GET_NUMBER_OF_HORSES()
}

#define macro SET_NUMBER_OF_HORSES() = takes(0) returns(0){}
#define macro GET_NUMBER_OF_HORSES() = takes(0) returns(0){}
```

While effective, our code is starting to look a little unwieldy. Let's clean things up a little bit. First, we can combine a few of our lines to assist with readability.

```js
#define macro MAIN() = takes(0) returns(0){
    0x00 calldataload 0xe0 shr               // [function_selector]

    // updateNumberOfHorses, 0xcdfead2e
    dup1 0xcdfead2e eq updateJump jumpi      // [function_selector]

    // readNumberOfHorses, 0xe026c017
    0xe026c017 eq readJump jumpi             // []

    0x00 0x00 revert

    updateJump:
        SET_NUMBER_OF_HORSES()
    readJump:
        GET_NUMBER_OF_HORSES()
}

#define macro SET_NUMBER_OF_HORSES() = takes(0) returns(0){}
#define macro GET_NUMBER_OF_HORSES() = takes(0) returns(0){}
```

Look how clean and concise everything looks!

There's one more piece that Huff offers us for convenience that we need to go over. You may notice we're hardcoding our function selectors here and typically have to acquire them through a cast command. This can be tedious or impossible for large code bases.

Huff allows us to define an interface and leverage `__FUNC_SIG` in order to calculate the function signature we need. An interface in Huff should look pretty familiar to anyone with knowledge of Solidity syntax.

```js
/*Interface*/
#define function updateHorseNumber(uint256) nonpayable returns()
#define function readNumberOfHorses() view returns(uint256)
```

Now, instead of manually entering in each function signature in our contract, we can use `__FUNC_SIG` in combination with our interface. Putting it all together should look like this:

```js
/*Interface*/
#define function updateHorseNumber(uint256) nonpayable returns()
#define function readNumberOfHorses() view returns(uint256)

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

By compiling our newly formatted code, we can easily confirm that the logic is unchanged.

```
huffc src/horseStoreV1/HorseStore.huff --bin-runtime
5f3560e01c8063cdfead2e1461001d5763e026c0171461001e575f5ffd5b5b
```

Our contract is looking so clean! Let's keep our momentum and go through a refresher on storage next!
