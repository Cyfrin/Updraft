---
title: horseIdToFedTimeStamp
---

_Follow along with this video:_

---

I'll keep a running reminder of our current total contract state at the top of each lesson moving forward as a point of reference.

<details>
<summary>HorseStoreV2.huff</summary>

```js
/* HorseStore Interface */
#define function mintHorse() nonpayable returns()
#define function feedHorse(uint256) nonpayable returns()
#define function isHappyHorse(uint256) view returns(bool)
#define function horseIdToFedTimeStamp(uint256) view returns(uint256)
#define function HORSE_HAPPY_IF_FED_WITHIN() view returns(uint256)

#define constant HORSE_FED_TIMESTAMP_LOCATION = FREE_STORAGE_POINTER()

#define function FEED_HORSE() = takes (0) returns (0) {
    timestamp                       // [timestamp]
    0x04 calldataload               //[horseId, timestamp]
    [HORSE_FED_TIMESTAMP_LOCATION]  // [HORSE_FED_TIMESTAMP_LOCATION, horseId, timestamp]
    STORE_ELEMENT_FROM_KEYS(0x00)   // []
}

#define macro MAIN() = takes (0) returns (0){
    0x00 calldataload 0xE0 shr      //  [function_selector]

    dup1 __FUNC_SIG(mintHorse) eq mintHorse jumpi
    dup1 __FUNC_SIG(feedHorse) eq feedHorse jumpi
    dup1 __FUNC_SIG(isHappyHorse) eq isHappyHorse jumpi
    dup1 __FUNC_SIG(horseIdToFedTimeStamp) eq horseIdToFedTimeStamp jumpi
    dup1 __FUNC_SIG(HORSE_HAPPY_IF_FED_WITHIN) eq horseHappyFedWithin jumpi

    mintHorse:
        MINT_HORSE()
    feedHorse:
        FEED_HORSE()
    isHappyHorse:
        IS_HAPPY_HORSE()
    horseIdToFedTimeStamp:
        HORSE_ID_TO_FED_TIMESTAMP()
    horseHappyFedWithin:
        HORSE_HAPPY_FED_WITHIN()
}
```

</details>


### horseIdToFedTimeStamp

Next we're going to set up `HORSE_ID_TO_FED_TIMESTAMP()`

I don't love this name, so I'm going to change this macro name to better reflect what it actually does.

```js
horseIdToFedTimeStamp:
        GET_HORSE_FED_TIMESTAMP()
```

Now let's define this macro!

```js
#define macro GET_HORSE_FED_TIMESTAMP() = takes (0) returns (0) {
    0x04 calldataload                // [horseId]
    [HORSE_FED_TIMESTAMP_LOCATION]   // [HORSE_FED_TIMESTAMP_LOCATION, horseId]
    LOAD_ELEMENT_FROM_KEYS(0x00)     // [horseFedTimestamp]

    0x00 mstore                      // []    // Memory: [0x00: horseFedTimestamp]
    0x20 0x00 return                 // []
}
```

So, what's this macro doing?

We're first getting the `horseId` from our calldata via `calldataload` at the `0x04` offset.  We then add the `HORSE_FED_TIMESTAMP_LOCATION` storage slot onto our stack.

We next use another `Hashmap.huff` macro `LOAD_ELEMENT_FROM_KEYS`. This functions much like the reverse of our previous `STORE_ELEMENT_FROM_KEYS` in that we are taking the location of the mapping (`HORSE_FED_TIMESTAMP_LOCATION`) and passing it our horseId key. The macro is then returning to our stack the appropriate data mapped to that key - `horseFedTimestamp`.

With our data on our stack, we then need to store it in memory in order for it to be returned. So we call `mstore` at an offset of `0x00` then we execute: `0x20 0x00 return`

`0X20 0X00 return` is a syntax you'll see commonly. It's saying - **return 32 bytes, starting at offset 0x00 from memory.**
