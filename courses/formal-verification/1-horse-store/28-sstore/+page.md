---
title: SSTORE
---

---

# Demystifying the S STORE Opcode in Smart Contract Data Storage

Hey everyone! Today we're diving into the interesting world of data storage in smart contracts, and specifically, we're going to focus on a mysterious little thing called the `S STORE` opcode. If you've dabbled in smart contract development or are simply curious about the intricacies of Ethereum's functionality, then you've come to the right place!

## What is the S STORE Opcode?

Alright, let's get straight to the point. The `S STORE` opcode is our go-to guy when we need to store data in a smart contract's storage. Think of it as a handyman whose job is to take your data and tuck it away securely in the storage unit. This opcode is all about action; it grabs the first two items from the stack, pops them right off, and voilà, they’re stored.

The process is quite straightforward. The top of the stack holds a 32-byte key that represents a unique location in storage and directly below it lies the value you want to store. Essentially, it's about matching a 'where' with a 'what'—where you want to place your data and what that data actually is.

## Understanding Stack Inputs and Outputs

To better grasp how `S STORE` operates, think of a stack of plates. You take the top plate (your 32-byte key) and the one below it (your data value), and you put them in their respective places in the cupboard (that's your storage). Now, an interesting part about `S STORE` is that it doesn’t bother returning anything to the stack—no output. It's a one-way trip for those two values.

## Storage Slots and Values

Let's get practical for a moment. Imagine we're keeping track of something fun like the number of horses in a digital stable. Where do we store this piece of information? In slot one, two, three? In the world of bytes and binaries, these slots are distinct locations ready to keep your data safe and sound.

```js
uint256 numberOfHorses = 2;
// Storing the number '2' in the predetermined storage slot for number of horses.
```

In order to actually store the number of horses, we first need to designate a storage slot to hold that value. This slot acts as a key that maps to the value we want to store. We could arbitrarily pick slot 1, slot 2 etc., but it's better practice to keep related data together in adjacent slots.

For example, if we were also storing number of donkeys, number of cows, and number livestock in total, we may structure it like:

```
Slot 1: Number of horses (key: 0x01)
Slot 2: Number of donkeys  (key: 0x02)
Slot 3: Number of cows (key: 0x03)
Slot 4: Total number of livestock (key: 0x04)
```

This keeps all the animal counts neatly organized in adjacent slots, with the total livestock count next in line at slot 4. The keys (0x01, 0x02 etc.) are unique identifiers that let us easily retrieve the corresponding values later.

When it comes time to actually run the `SSTORE` opcode, it simply takes the slot key from the top of the stack, and the value to store from the next item down the stack, and handles the rest.

## Retrieving Values Before Storing

Hold your horses (pun intended)! Before we can store anything, we need the actual value to store. Usually, this value is part of what we call `call data`—data sent along with a function call to a smart contract. We need to fetch the value from this call data, determine the right storage slot, and then proceed with `S STORE`.

> **Pro Tip:** Always make sure to retrieve the latest value from call data before attempting to store it.

## Updating Stored Values

What happens if we try to store a value in an already occupied slot? This is where things get a bit nuanced.

If the slot contains a non-zero value and we store a non-zero value, it costs 20,000 gas to overwrite. However, if we store zero in a non-zero slot, it refunds 15,000 gas as a sort of "cleanup" operation. Additionally, if we store a non-zero value in a slot that's currently zero, it only costs 5,000 gas.

These intricate gas mechanics incentivize efficient usage of storage by encouraging developers to reuse slots instead of continually expanding storage.

Let's look at an example flow for updating the number of horses:

```
Current status:
    Slot 1 (Horses key) = 5 (five horses initially)
    1. User calls updateHorses(uint256 newNumHorses)
    2. newNumHorses comes in from call data as 2
    3. Contract checks slot 1, sees non-zero value (5)
    4. Contract overwrites slot 1 with 2
    5. 20,000 gas charged for writing non-zero (2) over non-zero (5)
    6. Slot 1 now contains 2 horses
```

And that's the gist of updating stored values! By considering these gas stipulations, we can optimize our contracts to stay lean and mean.

## Wrapping Up

So that, my friends, is a basic rundown of the `S STORE` opcode. It's not as daunting as it seems at first glance, right? Remember that when you are programming smart contracts, handling data storage with care is crucial. The `S STORE` opcode is your silent partner in this endeavor—efficiently putting away those valuable bytes where they need to go.

Now, before we part ways, a friendly reminder—using `S STORE` costs gas, so optimize your contract's storage patterns whenever possible to keep those gas fees in check. Efficiency is key in the blockchain realm, after all.

I hope this explanation helps demystify data storage in smart contracts, and gives you a better understanding of how `S STORE` operates under the hood. Go forth and code with confidence, knowing that you've got another snippet of smart contract knowledge in your developer toolkit.

And with that, I wish you happy coding! If you've got thoughts or questions, drop them in the comments. Keep exploring, and keep building those killer dApps!

Stay tuned for more deep dives, and until next time, may your transactions always confirm swiftly, and your contracts be free of bugs!

![screenshot](https://cdn.videotap.com/618/screenshots/IwQWS3EO6FEueC2NTmp8-85.03.png)

Remember to always do your own research and happy developing!
