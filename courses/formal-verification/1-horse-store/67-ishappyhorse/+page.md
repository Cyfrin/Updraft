---
title: isHappyHorse
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

#define macro GET_HORSE_FED_TIMESTAMP() = takes (0) returns (0) {
    0x04 calldataload                // [horseId]
    [HORSE_FED_TIMESTAMP_LOCATION]   // [HORSE_FED_TIMESTAMP_LOCATION, horseId]
    LOAD_ELEMENT_FROM_KEYS(0x00)     // [horseFedTimestamp]

    0x00 mstore                      // []    // Memory: [0x00: horseFedTimestamp]
    0x20 0x00 return                 // []
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
        GET_HORSE_FED_TIMESTAMP()
    horseHappyFedWithin:
        HORSE_HAPPY_FED_WITHIN()
}
```

</details>


Next we'll tackle the `IS_HAPPY_HORSE()` macro. This macro is going to be a little more complicated, and if we remind ourselves of this function is Solidity it will be clear why.

```js
function isHappyHorse(uint256 horseId) external view returns (bool) {
    if (horseIdToFedTimeStamp[horseId] <= block.timestamp - HORSE_HAPPY_IF_FED_WITHIN){
        return false;
    }
    return true;
}
```

There are conditionals and comparisons galore! We're going to have to go through each of these to determine what will be returned by our macro.

The start shouldn't be too complicated, we're going to need the parameter being passed (our horseId from `calldata`), and we use this to load the horseFedTimestamp, just like we did in the `GET_HORSE_FED_TIMESTAMP()` macro. We also need the current timestamp to calculate the value we're comparing.

```js
#define macro IS_HAPPY_HORSE() = takes (0) returns (0) {
    0x04 calldataload                // [horseId]
    [HORSE_FED_TIMESTAMP_LOCATION]   // [HORSE_FED_TIMESTAMP_LOCATION. horseId]
    LOAD_ELEMENT_FROM_KEYS(0x00)     // [horseFedTimestamp]
    timestamp                        // [timestamp, horseFedTimestamp]
}
```
In order to retain some items on the stack before our next operations we're going to execute two `dup2`s. We'll then call `sub` in order to subtract our `horseFedTimestamp` from our current `timestamp`.

```js
#define macro IS_HAPPY_HORSE() = takes (0) returns (0) {
    0x04 calldataload                // [horseId]
    [HORSE_FED_TIMESTAMP_LOCATION]   // [HORSE_FED_TIMESTAMP_LOCATION. horseId]
    LOAD_ELEMENT_FROM_KEYS(0x00)     // [horseFedTimestamp]
    timestamp                        // [timestamp, horseFedTimestamp]
    dup2 dup2                        // [timestamp, horseFedTimestamp, timestamp, horseFedTimestamp]
    sub                              // [timestamp - horseFedTimestamp, timestamp, horseFedTimestamp]
}
```
Now, what are we comparing `timestamp - horseFedTimestamp` to? The Solidity contract has a true constant which defines how long a horse can go without being fed before not being happy.

```js
uint256 public constant HORSE_HAPPY_IF_FED_WITHIN = 1 days;
```

Let's define this in our Huff contract. For convenience, `1 days` in hex is `0x0000000000000000000000000000000000000000000000000000000000015180`.

```js
#define constant HORSE_HAPPY_IF_FED_WITHIN_CONST = 0x0000000000000000000000000000000000000000000000000000000000015180
```

Let's add this constant to our stack, in our macro and finally compare our previous calculation to it using the `gt` opcode. This will perform a greater than comparison taking our top two items on the stack as inputs.

```js
#define macro IS_HAPPY_HORSE() = takes (0) returns (0) {
    0x04 calldataload                 // [horseId]
    [HORSE_FED_TIMESTAMP_LOCATION]    // [HORSE_FED_TIMESTAMP_LOCATION. horseId]
    LOAD_ELEMENT_FROM_KEYS(0x00)      // [horseFedTimestamp]
    timestamp                         // [timestamp, horseFedTimestamp]
    dup2 dup2                         // [timestamp, horseFedTimestamp, timestamp, horseFedTimestamp]
    sub                               // [timestamp - horseFedTimestamp, timestamp, horseFedTimestamp]
    [HORSE_HAPPY_IF_FED_WITHIN_CONST] // [HORSE_HAPPY_IF_FED_WITHIN_CONST, timestamp - horseFedTimestamp, timestamp, horseFedTimestamp]
    gt                                // [horse_has_been_fed_within_1_day, timestamp, horseFedTimestamp]
}
```

How are things handled from this `gt` comparison?

```js
    gt                                // [horse_has_been_fed_within_1_day, timestamp, horseFedTimestamp]
    start_return_true jumpi           // [timestamp, horseFedTimestamp]
    eq                                // [timestamp == horseFedTimestamp]
    start_return jump                 // [timestamp == horseFedTimestamp]

    start_return_true:
    0x01                              // [0x01, timestamp, horseFedTimestamp]

    start_return:                     // [timestamp == horseFedTimestamp] <-- only if `gt` returns false!
    0x00 mstore
    0x20 0x00 return
```

This is a little confusing at first glance, but let's step through it together.

We start with the bool `horse_has_been_fed_within_1_day` on the top of our stack, if this is true, we jump to `start_return_true` and push `0x01` to our stack (this is ultimately our return value saying `IS_HAPPY_HORSE == True`). Execution then continues by storing `0x01` in memory and returning this as our function's result.

If the bool `horse_has_been_fed_within_1_day` is false (or 0) we know the horse hasn't been bed in less than 1 day, we then check to see if the horse was fed at exactly 1 day with the `eq` opcode. When then do a hard jump to `start_return`.

The `start_return` jump destination continues execution by storing the top item of our stack into memory and returning 32 bytes of that item. The item returned is going to be `0x01` or `0x00` depending on if the horse was fed at exactly 1 day.


### Wrap Up

We're doing great! We still having accounted for minting a horse, the getter generated for our `HORSE_HAPPY_IF_FED_WITHIN` constant, and our constructor.

Let's keep going!