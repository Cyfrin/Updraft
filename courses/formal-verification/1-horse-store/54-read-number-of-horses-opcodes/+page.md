---
title: readNumberOfHorses Opcodes
---

---

# Unpacking the Solidity Function Dispatcher: Demystifying the 'Read Number of Horses'

Welcome back, fellow coders! Today we're diving deep into the magical world of smart contracts — specifically, we'll be picking apart the function dispatcher to better understand how Solidity reads the number of horses.

## A Close Look Under Solidity's Hood

When we last tinkered with our smart contracts, we introduced the function dispatcher and the intriguing art of managing operational codes (opcodes). But today, we’re scratching beneath the surface to see what mystery lies beneath — trust me, we’re in for a fascinating ride!

![Screenshot](https://cdn.videotap.com/618/screenshots/CCy9Ua4RkPM77jr4JGej-189.21.png)

### The Peculiar Case of the `Read Number of Horses` Function

Right off the bat, nestled cozily beneath the final `jumpdest stop` in the function dispatcher, is our target: `read number of horses, jumpdest one`. But hang on, it's not just a single `jumpdest` we are dealing with — there's a whole sequence dedicated to it, though only one specifically named for the `read number of horses`. Seems a tad extra for something seemingly trivial, doesn't it? Let's unravel why that is.

Compared to what we toiled over in our last session with Huff, the way Solidity goes about reading the number of horses is like weaving a more elaborate tapestry. You remember the routine: a push here, an `sload` there, followed by `mstore`, a couple more pushes, and the grand `return`. Nothing too intricate. But now, we have a few more guests at the party: a `swap`, a `dupe`, and even an `add` — what gives? We’re doing so much more just for a simple read operation!

### Decoding the Solidity Routine

Starting off, our function dispatch presents us with the bare essentials: the function selector. From here, we push zero onto the stack for reasons that’ll soon become clear, then follow up with our good ol’ `sload`.

```
functionSelector -> PUSH 0 -> SLOAD
```

Remember `sload`? That nifty opcode that reads from storage using a key to fetch its corresponding value. By pointing it at storage slot zero, we snag the 'num horses', throwing it onto the stack like a pro.

With 'num horses' in hand, our next performer is `PUSH 40`. A new move, since we never danced this step with Huff. But this move has a rhyme to reason: we're about to acquaint ourselves with the concept of memory in Solidity, where `PUSH 40` and `MLOAD` work in tandem to manage the free memory pointer — an essential tool for returning values from a function.

```
PUSH 40 -> MLOAD -> SWAP1 -> DUPE2 -> MSTORE
```

Imagine Solidity as an efficient librarian, asking where to store the 'num horses' before checking it out to a reader. It finds the perfect slot at `0x80`, thanks to our nifty free memory pointer, and tucks the value neatly away.

But like any well-organized system, once you place a book on the shelf, you need to note down where your next free spot is — cue the `add` routine, where `0x20` (32 in hexadecimal, a standard size for a variable) is added to our memory pointer, signifying our next vacancy in the byte-packed memory space.

### Solidity: Thrifty with Memory

What's particularly clever here is Solidity's thrifty nature. It knows when it's about to conclude a call and won’t bother fluffing the nest any further with memory updates. Instead, it focuses on the task at hand: returning the 'num horses' in a splendid finale of `return` opcodes.

```
RETURN
```

The return opcode takes two parameters — an offset and a size — elegantly indicating where in memory we have our precious data and how many bytes it occupies. Lo and behold, we have smoothly returned our value, a neat 32-byte package, snug at `0x80`, which is our 'num horses' all along.

### Wrapping Up

So there you have it! We've unearthed and annotated every nook and cranny of the contract creation code and runtime code.

> "We just learned all of the opcodes Solidity takes for us to return a value from storage."

A little more gas-guzzling than Huff's approach but let’s tip our hats to the Solidity developers. They’ve intelligently coded in a memory check, skirting unnecessary updates when we're wrapping up the call — talk about a smart and efficient library system for our digital assets!

![Screenshot](https://cdn.videotap.com/618/screenshots/CVUi7DaftGmaPiGX3I10-438.17.png)

In our autopsy of Solidity’s mechanics, we discovered not just how it performs its magic — but also got a glimpse into its cautious mentality, always ready to adapt, always efficiently cleaning up after itself. The allure of smart contract coding brims with complexities that demand a keen eye and a patient hand.

Now, take a deep breath, revel in your new understanding, and keep that coding spark alive until our next deep dive into the digital ether.

Happy coding!
