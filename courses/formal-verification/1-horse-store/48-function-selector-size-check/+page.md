---
title: Function selector size check
---

---

# Navigating Ethereum Smart Contracts: Demystifying Opcodes and Call Data

Hey there, fellow coders! Are you ready to dive deep into the nuts and bolts of smart contracts? Whether you're scratching your head wondering what a specific opcode does, or you're just curious about the intricacies of Ethereum smart contracts, buckle up—we've got some exciting stuff to uncover!

Let’s have a little chit-chat about something we stumbled upon recently: pushing "zero X four" onto the stack and the whole shebang about `call data size`. If you're like me, encountering a new opcode in the wild can be both thrilling and slightly intimidating. But don't worry; we're in this together!

## What on Earth is Call Data Size, Anyway?

So, when we start talking about "pushing zero X four onto the stack," we're preparing to measure something super crucial in the context of smart contracts—yeah, you guessed it, the call data. Not sure what this is doing? No problem, we're about to figure it out.

For those unfazed by the mention of the stack and bytes, you might have deduced that when we refer to call data size, we're essentially checking out the byte size of the input data your smart contract is getting. No fuss with stack inputs or anything—it’s all about the output this time, folks.

Imagine a scenario where someone zaps your contract with call data that's as lengthy as "zero x \[insert crazy long string here\]." The call data size will naturally be off the charts. On the flip side, if what they send looks more humble—just one byte—that size gets labeled neatly as "zero x one." Simple enough, right?

But hang on—why is this such a big deal? It's because we need to know the size of the call data to make sense of what comes next. In geek speak, we've just pulled off this line of magic:

Enter the less than comparison, or “LT” for short. For those moments when your brain goes "What was the LT opcode again?" while you're knee-deep in code tabs (we've all been there), here's a quick refresher: `LT` is our trusty shorthand for checking if one value is smaller than the other. This baby takes two inputs, let's call them 'a' and 'b,' and spits out a crystal-clear Boolean – a '1' for true, and a '0' for false.

If 'a' is smaller than 'b,' you get a '1'. If not, well, you get the idea.

## Why We Care About "Less Than"

Now we hit the real question: is our call data size tinier than "zero x four"? If it is, our code's gonna take a scenic route. It's a bit like your GPS rerouting you because of some traffic jam up ahead. This detour involves a 'jump if'— a special place your code zooms off to if conditions are met.

And what's that about a function selector you ask? Oh, Solidity knows all about that. If your call data can't fit a function selector (and we're talking about a teeny requirement of four bytes here), it's going to flag it as a big no-no.

Why four bytes? Because that's the size of a function selector in Solidity—the unique identifier that tells your smart contract which function to execute. So if the data you send to the contract doesn't have that, well, it's off to the dreaded land of Revertsville.

![Screenshot](https://cdn.videotap.com/618/screenshots/VAcs5XaOOb3XaY7XcMgo-187.png)

By the way, this zero x30 that we're talking about, where the jump leads us when the call data is playing shy? It's actually the gatekeeper of Order, making sure things only proceed when they make absolute sense. Otherwise, it's a one-way ticket to Revert Land.

## When Solidity Has Your Back

The really cool part? We didn't have to write any of this in Solidity. Yup, that's right. Solidity's silently got our backs, doing all this under the hood to save us from our mistakes. It's like the best co-pilot ever, making sure you don't veer off course—I mean, who has time to shoot themselves in the foot, right?

So there you have it, our little adventure through the runtime code of Ethereum smart contracts. We set up the stage, checked for message value, and critiqued the call data—all without us having to lift a finger in Solidity. Thanks to our trusty Solidity for weaving this protective web.

## Digging Deeper into Opcodes

Now that we've covered the basics of call data size and function selectors, let's dig a little deeper into some of the specific opcodes that show up in Ethereum smart contract bytecode. As we saw earlier, opcodes like `LT` (less than) and `JUMP` are critical for checking conditions and directing program flow.

But Solidity and the Ethereum Virtual Machine (EVM) contain a whole treasure trove of opcodes for us to explore. Here are a few interesting ones:

**SLOAD**: Retrieves a storage slot value from a contract's storage. This allows contracts to have "memory" that persists between transactions.

**MLOAD**: Loads a word from memory into the stack. Memory in Solidity is temporary and cleared between transactions, unlike storage.

**CALL**: Used to call functions from other contracts. This enables inter-contract communication.

As you can see, some opcodes like `SLOAD` and `MLOAD` deal with a contract's persistent storage and temporary memory respectively. Others like `CALL` enable really cool features like having contracts talk to one another.

Now when you encounter these in the wild bytecode, you'll know what they do under the hood!

## When to Use Assembler

Sometimes it can be useful to drop down to the lower-level EVM assembly language when writing Solidity programs. This allows for finer-grained control and optimization.

For example, you might use assembler when:

- You need tighter gas control for complex algorithms
- You want manual memory management to save gas
- You need to build custom opcodes Solidity doesn't natively support

Here's an example of some assembler code inside Solidity:

```js
assembly {
    let x := mload(0x40)mstore(0x40, add(x, 0x20))
}
```

This manually increments the free memory pointer to allocate some space.

Using inline assembly requires intimate knowledge of EVM opcodes and low-level programming. But sometimes it's a necessary tool for wrangling gas usage or building high-performance contracts.

So while Solidity provides many guardrails and protections, don't be afraid to occasioanlly drop down to assembler when needed!

## Optimizing Gas Usage

Speaking of gas usage, let's talk about optimization. One of the biggest challenges in Ethereum development is designing efficient contracts that don't waste gas needlessly.

Here are some pro tips for optimizing gas:

**Use appropriate data structures**: Mapping vs arrays vs structs, know which fits your use case best.

**Be careful with loops**: Limit them when possible or use efficient iteration patterns.

**Manage storage carefully**: Store only what you need to. Loading/storing costs gas!

**Use events over logs**: Logs are much more expensive.

**Validate input data**: Don't let bad data trigger revert costs.

**Break code into smaller functions**: Helps isolate gas costs.

**Run profiling tools**: Understand where the gas is actually going.

With great optimization comes great gas savings! As Uncle Ben once told Spiderman, "With infinite loops comes infinite costs - use your power responsibly!"

## Closing Thoughts

Phew, that was quite a whirlwind tour de opcodes! But I hope you now feel empowered to explore Ethereum smart contract innards with confidence.

We covered everything from function selectors to gas optimization, peering into the inner workings of this fascinating technology. Whenever you encounter those intriguing opcodes in bytecode, remember today's journey.

Of course in our endless quest to level up as coders, there will always be new opcodes, new paradigms, and new puzzles to solve. But with the fundamentals down, you'll be able to tackle whatever comes next like a true web3 warrior!

Alright folks, that's my epiphany quota filled for the day. Time to get back to building real stuff. Just wanted to share a glimpse behind the Ethereum curtain for other intrepid explorers like us.

Stay curious and keep hacking away my friends! This is just the beginning...
