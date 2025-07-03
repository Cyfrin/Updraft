---
title: HorseStoreV2 Huff Function Dispatch
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


### feedHorse Macro

We're going to begin with the feedHorse Macro. It shouldn't be too tough. Let's start by looking at the Solidity.

```js
function feedHorse(uint256 horseId) external {
    horseIdToFedTimeStamp[horseId] = block.timestamp;
}
```

This is going to one of the most important functions we learn about in this section as we'll be touching on `timestamps` _and_ `mappings`!

We're going to need to access the block's timestamp, fortunately there's an op code that does just this `TIMESTAMP`.

![feedhorse_macro1](/formal-verification-1/64-feedhorse-macro/feedhorse_macro1.png)

So, our function takes a `uint256 horseId`, we're going to want to add this to our stack as well. We know how to do this with the op code `calldataload`, which takes an offset, then adds 32 bytes of call data from the offset to our stack.

```js
#define macro FEED_HORSE() = takes(0) returns (0) {
    timestamp          // [timestamp]
    0x04 calldataload  //[horseId, timestamp]
}
```

Things look great, what's our next step? Think of what a mapping is. We're going to need to `sstore` our `timestamp` to our `horseId` key.

We'll look at how that's done in the next lesson!
