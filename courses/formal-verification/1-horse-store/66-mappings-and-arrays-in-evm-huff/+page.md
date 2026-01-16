---
title: Mappings and Arrays in EVM - Huff
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

#define function FEED_HORSE() = takes (0) returns (0) {
    timestamp          // [timestamp]
    0x04 calldataload  //[horseId, timestamp]
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


Now's a good time to go back and reference the Solidity Documentation. We should be reminded that mappings are handled using a very specific algorithm.

![mappings-and-arrays-in-evm-huff1](/formal-verification-1/65-mappings-and-arrays-in-evm-huff/mappings-and-arrays-in-evm-huff1.png)

We cover this in a little more detail in the Foundry Full Course on Updraft, so I won't go over it here, but lets look at how we accomplish this in Huff.

### Huffmate

Now, I don't know about you, but I don't want to write out the `keccak256` algorithm every time we access a mapping. Fortunately, most people don't and a convenient tool has been created to help us out, [Huffmate](https://github.com/huff-language/huffmate).

There are a couple specific things we're going to use from this repo, namely:

- [`ERC721.huff`](https://github.com/huff-language/huffmate/blob/main/src/tokens/ERC721.huff) - we'll leverage this for our NFT implementation a little later on.
- [`Hashmap.huff`](https://github.com/huff-language/huffmate/blob/main/src/data-structures/Hashmap.huff) - this outlines how solidity handles mappings or `hashmaps` under the hood. By installing Huffmate, we can avoid implementing all this from scratch ourselves.

Install Huffmate with:

```bash
forge install huff-language/huffmate --no-commit
```

Now we can import the Hashmap.huff contract into ours with a Huff import statement:

```js
/* Imports */
#include "../../lib/huffmate/src/data-structures/Hashmap.huff"
```

This will allow us to avoid the messy algorithm while working with mappings in storage. But for any variable in storage, it still needs an assiged storage slot. We do this by defining a storage slot constant for this timestamp

```js
#define constant HORSE_FED_TIMESTAMP_LOCATION = FREE_STORAGE_POINTER()
```

As we know, the mapping itself needs a location, but the elements within the mapping are stored at locations determined by using the hashing algorithm.

Now we can access this variable to add this storage slot location to our stack. Our feedHorse macro looks like this now:

```js
#define function FEED_HORSE() = takes (0) returns (0) {
    timestamp                       // [timestamp]
    0x04 calldataload               //[horseId, timestamp]
    [HORSE_FED_TIMESTAMP_LOCATION]  // [HORSE_FED_TIMESTAMP_LOCATION, horseId, timestamp]
}
```

So what the code is saying is - At mapping location HORSE_FED_TIMESTAMP_LOCATION, update index horseId with this timestamp.

We can actually accomplish all of this by using a macro of our imported `Hashmap.huff` called `STORE_ELEMENT_FROM_KEYS`

```js
#define macro STORE_ELEMENT_FROM_KEYS(mem_ptr) = takes (3) returns (0){
    //input stack: [key1, key2, value]
    GET_SLOT_FROM_KEYS(<mem_ptr>)     // [slot, value]
    sstore                            // []
}

#define macro GET_SLOT_FROM_KEY(mem_ptr) = takes (2) returns (1) {
    //input stack: [slot, key]
    // Load data into memory
    <mem_ptr> 0x20 add // [<mem_ptr> +32, slot, key]
    mstore             // [key]
    <mem_ptr>          // [<mem_ptr>, key]
    mstore             // []

    // Hash the data, generating a slot
    0x40        // [64]
    <mem_ptr>   // [<mem_ptr>, 64]
    sha3        // [slot]
}
```

Above we can see what the macros from `Hashmap.huff` are actually doing. We're taking our `mapping location` and `key value` and hashing them to generate a slot for the data we want to store.

We can just call this `STORE_ELEMENT_FROM_KEYS()` macro within our `FEED_HORSE()` macro like so - we're passing it `0x00` as a free memory pointer in this example.

```js
#define function FEED_HORSE() = takes (0) returns (0) {
    timestamp                       // [timestamp]
    0x04 calldataload               //[horseId, timestamp]
    [HORSE_FED_TIMESTAMP_LOCATION]  // [HORSE_FED_TIMESTAMP_LOCATION, horseId, timestamp]
    STORE_ELEMENT_FROM_KEYS(0x00)   // []
}
```

And that's all there is for our `FEED_HORSE()` macro! `Hashmap.huff` made things pretty painless for us, but if you find yourself not quite understanding how things were calculated, I encourage you to go into the macros of `Hashmap.huff` and walk yourself through the opcodes to gain a deeper understanding of what they're doing before continuing.
