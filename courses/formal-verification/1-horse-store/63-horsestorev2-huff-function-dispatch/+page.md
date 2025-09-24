---
title: HorseStoreV2 Huff Function Dispatch
---

_Follow along with this video:_

---

### Starting in Huff

Now that we've been through this once before, we should be a little more familiar with how to get started. We know we need to define our `MAIN()` macro as our entry point.

```js
#define macro MAIN() = takes (0) returns (0) {

}
```

> **Protip:**With a little deeper understanding of opcodes now, I can further highlight what `takes (0) returns (0)` is doing.  These values are what we are taking off the stack and returning to the stack if we wanted our contract to do anything like this, this is where it would happen!

Now let's consider what we need to set up our function dispatcher in Huff for this contract. We know that getting the function selector from calldata is going to be the exact same as we did before:

```js
#define macro MAIN() = takes (0) returns (0){
    0x00 calldataload 0xE0 shr      //  [function_selector]
}
```

What else do we need?

Well, we're going to need the function selectors of each of the functions in our contract to which we will compare the calldata received to. These should be:

- `mintHorse()`
- `feedHorse()`
- `isHappyHorse()`

There are all of our functions, BUT - we also have public variables, `horseIdToFedTimeStamp(uint256 horseId)` and `HORSE_HAPPY_IF_FED_WITHIN`. It's interesting to note that Solidity, on the back end, effectively creates a getter function for any public variables that are declared. So we're going to need a function selector for that too!

- `mintHorse()`
- `feedHorse()`
- `isHappyHorse()`
- `horseIdToFedTimeStamp(uint256 horseId)`
- `HORSE_HAPPY_IF_FED_WITHIN`

Let's add these to our function dispatcher, just like we did before. We could use `cast` to determine what the function signatures would be, but we also learnt previously that we can define an interface, right in our Huff contract, and derive our signatures from there!

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

As you can see, this is all the same as we've done in our simple `HorseStoreV1` contract, it's just dialed up a bit. We've created an interface which references all of our functions and added the checks for each of their `function signatures` vs the received `calldata` of our `MAIN macro`.

Finally, we've set up jump destinations which will be jumped to when a match is found with one of our `function selectors`!  Each of these jump destinations pertains to a specific `macro`, which we have yet to write.  

Let's keep going to see how that looks!
