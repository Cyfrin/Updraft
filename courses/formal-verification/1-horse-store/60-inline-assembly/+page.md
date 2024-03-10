---
title: Inline Assembly
---

---

# Diving Into Ethereum Smart Contract Development with Yul: A Beginner's Guide

In the quest for optimally crafted Ethereum smart contracts, we occasionally need to delve underneath the high-level language that is Solidity, and that's where Yul comes into play. Yul? You might ask. Exactly, that's what we're unpacking today. We're going to get hands-on by transforming some Solidity code into its Yul counterpart. Let's roll up our sleeves and dive in!

## Recognizing the Tone and Vocabulary

Before we go any further, let me address the technical tone and vocabulary you're about to encounter. The instructions are conversational—almost as if you're receiving guidance from a buddy who's a coding whiz. Not too formal, not too chatty—just right for keeping things clear and engaging.

This primer is going to be a fun ride for those who already have their feet wet in Solidity and are itching to get a deeper understanding of Ethereum contract programming. We are talking to the curious developers out there, the ones who always ask "what's under the hood?". So, dear coder, even if you haven't yet declared yourself a blockchain buff, you'll fit right in, provided you grasp some basic coding jargon and have the enthusiasm for smart contract development.

## Creating and Testing Our Yul Contract

Alright, let’s start by rolling out our initial Solidity code into a new file we’ll call `horsestore_yule.sol`. We want to keep this simple as we’re only changing parts of the functions `updateHorseNumber` and `readNumberOfHorses`, integrating a bit of assembly language magic.

### Writing with Yul in Solidity

When it's time to work with Yul within Solidity, it's all about wrapping the code block with the `assembly` keyword followed by curly braces. It's like opening a gateway to direct EVM (Ethereum Virtual Machine) interactions. Let's see how we can perform an `sstore` operation, which is a storage-saving function in the EVM.

What we're doing here is storing the `newNumberOfHorses` into the storage slot designated for `numberOfHorses`. In Yul, this looks delightfully straightforward, thanks to its `.slot` syntax, fetching us the first storage slot, effectively zero.

### Reading from Storage with Yul

Moving on to the `readNumberOfHorses` function, we transition from storing to loading with the `sload` command. This operation falls under Yul's domain too:

This line sets a new variable `num` equal to whatever value is stored in `numberOfHorses_slot`. Now that's elegant!

This Yul syntax works synergistically within Solidity, offering a compact way to work with EVM opcodes while still keeping them as recognizable as any high-level language function. Imagine the opcodes as little functions ready to be called with parameters in tow. Isn't that just neat?

## Testing Our Yul-infused Solidity

Yes, you guessed it, it's unit test time. If you're feeling déjà vu, it's because our testing setup is going to look a lot like the one we used in the `huff` smart contract.

### Unit Testing with a Twist

Now, we'll write a fresh test file `HorsestoreYul.t.sol` and replicate the setup we used before, calling on the new `horsestore_yul` imported at the top. Notice the slight twist? To accommodate our unconventional `horsestore_yul` contract, we sneak in a fresh interface, aptly named `IHorseStore`.

```solidity
pragma solidity ^0.8.20;interface IHorseStore {// insert function signatures here}
```

And now the time has come for the final test command:

```shell
forge test
```

For those of you who fancy a little uncertainty in life, we've thrown in fuzz testing. What a thrill to see the Yul and Solidity smart contracts pass with flying colors!

## Wrapping Up and Looking Forward

Whoa, let's pause and take a breath; we just turbocharged our smart contract with some low-level Yul goodness. The mixture of Yul and Solidity within a single contract might feel peculiar at first, but it fits like puzzle pieces in blockchain development. And you just experienced firsthand how opcodes are not the dusty artifacts of the EVM—they are alive and well in the Yul ecosystem.

“Don't dive in too deep too fast, but always keep exploring,” is the axiom of great developers, and it holds even when venturing into the little-explored territories of Solidity and Yul.

Remember those EVM opcodes we just transformed into pseudo-functions? They are the heartbeat of your smart contract, revered not just for their direct power, but also for the understanding they offer about the underlying machine logic.

Congratulations on your baptism by fire into Yul's world. Take a bow, and remember this as a startup guide rather than an exhaustive compendium. And when you're ready, the [Solidity documentation](https://solidity.readthedocs.io) awaits with a treasure trove of Yul syntax and samples to quench your newfound thirst. Happy coding!

_“The great aim of the art of programming is to manage complexity, not to create it.” — Pamela Zave_
