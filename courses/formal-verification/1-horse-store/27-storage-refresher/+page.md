---
title: Storage Refresher
---

---

## Understanding Function Dispatching

So, picture this: we've got these two main functions, like launchpads ready for blastoff. They're our beacon, the destination our opcode has been eager to work with. Let's tackle `setNumberOfHorses` or as I like to call it, the horse-power update, first up on our coding playlist. Why this, you ask? Well, it's the whole storage shebang that makes it the prime candidate.

### The Storage Saga—Array of Possibilities

Now, hold up, let's take a sec for a quick refresher on _storage_. Think of it as this colossal array, an eternal vault that immortalizes the outcome of our transactions. Our beloved variables in Solidity contracts are mapped to storage slots that stick around for the long haul—they're there to stay. Everything from good ol' booleans to your cherished digits gets a cozy bytes32 structured home.

![Mapping Magic and Hashing Hocus Pocus](https://cdn.videotap.com/618/screenshots/vf8rw9vA3Gg1oA7Gd6ik-53.67.png)

Now, mappings, oh, they're a crafty bunch. They don't just claim any slot; instead, they've got this hash wizardry that stashes their values in slots based on the assortment of the array. Take my setup here: if my array's got dibs on slot two in storage, the opening act, aka the value in slot zero of said array, lands at `keccak256(slot, index)`. This sorcery ensures each bit of data finds its unique spot in the storage cosmos—no trespassers!

### Constants and Memories—The Unstorageables

Before I forget, let's clear the air—constants and memory variables, they don't set up camp in storage, no sir.

## Upgrading Horsepower: `setNumberOfHorses`

Alright, enough with the side quests; back to boosting those numbers of horses. To update our stable strength in storage, we gotta roll up our sleeves and:

1. Assign a VIP storage slot
2. Summon the `SSTORE` opcode to save the value

Simple as that. We'll bookmark a spot in the eternal storage ledger for `numOfHorses`.

Once we've carved out its place in the blockchain realm, we'll forever have `numOfHorses` safe and sound at its designated slot. How cool is that?

### Testing the Code—Huff vs. Solidity Showdown

Here’s where the rubber meets the road. Once we've coded our hearts out, it's test time. We'll pit our Huff masterpiece against the Solidity counterpart to see if they're two peas in a pod, doing the exact same magic. Spoiler alert: they will, and we’ll be doing victory laps before you know it.

![Testing the Code—Huff vs. Solidity Showdown](https://cdn.videotap.com/618/screenshots/G7lCV1MCl8BcHIRSbW4N-126.5.png)

### Closing In—A Huff Journey Nears Its End

Guess what? We're zooming towards the finish line with our Huff codebase. Crafting `setNumberOfHorses` brings us just a heartbeat away from the grand finale. So let's power through and update those horses' stats, shall we?

---

Well, that's a wrap for now, code wranglers! Stay tuned for more smart contract escapades and remember—each line of code is a step closer to blockchain mastery. Happy coding!
