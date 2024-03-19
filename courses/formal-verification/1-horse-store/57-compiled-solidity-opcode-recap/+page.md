---
title: Compiled Solidity Opcode Recap
---

---

# Demystifying EVM Opcodes: A Journey Through Smart Contract Compilation

Alright, folks! We've been through a heck of a journey, diving deep into the world of EVM opcodes, discovering the hidden gears that make smart contracts tick on the blockchain. In this final wrap-up, we're gonna stroll down the memory lane of what we've learned together, but don't worry, we won't be walking you through opcode by opcode again... unless you're into that sort of thing for optimizations or compiler audits. But for now, this is our last stop on this particular trip.

For those enchanted by the magic of Ethereum opcodes and desiring to hone their skills to wizardry levels, the treasure map can be found at [EVM codes](https://www.evm.codes/). It's an incredible resource, spilling the beans on every opcode you might encounter. And for the adventurers out there, why not try getting good at Huff, or even crafting your own smart contracts in opcodes from scratch? If you're still feeling a little shaky on opcodes, the secret is – practice, practice, practice. The more you tinker, the sharper you'll get.

![Screenshot](https://cdn.videotap.com/618/screenshots/Pd3hq2bgeSOSG5XKLc8k-98.31.png)

In our exploration, we've learned that when it comes to smart contracts, they're typically compiled into three major sections: contract creation, runtime, and metadata. Think of these as the beginning, middle, and end of your contract's lifecycle. Different compilers might slice these sections differently, but this is your standard layout. Take Huff, for example, which strips it down to just the creation and runtime.

You see, when we code in Solidity, we always start with the freeing of memory because that's how organized we like to be. Although in this case, we didn't adjust the free memory pointer much since our contract wasn't the memory-hogging type, you’d usually keep tabs on this pointer to avoid a digital mess.

Moving swiftly on, we've seen first-hand that Solidity isn't one to take things lightly. It's all about checks – think message value, call data length, the usual suspects. During contract creation, it's like a magician pulling the entire code out of a hat and onto the blockchain using the `codecopy` opcode. Abracadabra!

Then you've got the runtime section, the "main event" of any smart contract – this is the hotspot where all the action happens. Solidity’s quite the acrobat, flipping through jumps and checks with grace, ensuring everything's in order before settling into function dispatching. It's like a careful bouncer, matching function selectors against the call data that comes knocking. And if things don't add up, Solidity's got its exit strategies, neatly organized into sections with jumps ready to revert back in style.

But, WOW – we've dissected these opcodes like pro surgeons, and if you've been following along, giving yourself a round of applause is the least you can do! Why not experiment a bit more? Change a number here, add a variable there, see how Solidity reacts and how the free memory pointer dances to your tune.

> Tweaking smart contracts and decoding EVM is like unlocking a puzzle box – each change unravels new secrets, beckoning you to explore further.

We've opened up Pandora's box of opcodes, and by now, you're pretty much an Opcode Savant. Apart from the tricky terrains of mappings and arrays, you've basically seen it all. Remember, every new opcode combination that you come across, no matter how baffling it might seem – like those pesky fallback functions or precompiles – they're just puzzles waiting for you to solve.

So that's a wrap, gang! Remember to keep experimenting with EVM codes. Got questions or experiences to share from your opcode odysseys? Hit up the comments – let's keep the geek party going!

## Final Thoughts

As we close this chapter, remember that the blockchain realm is vast and ever-evolving. Delve into forums, read the docs, join communities. The path of an Ethereum developer is both challenging and rewarding. Now, with your newfound opcode expertise, who knows what ingenious contracts you'll conjure up in the etherspace? Here's to the pioneers on the frontier of decentralized technology – forge ahead with curiosity and code!

## Rewinding Our Opcode Journey

Alright, let's take a quick stroll down memory lane, reviewing the key concepts from our deep dive into EVM opcodes.

### The Layout of Smart Contracts

Most smart contracts follow a standard three-part structure when compiled:

1. **Contract Creation** - This section handles deploying the contract code to the blockchain. The `codecopy` opcode does the heavy lifting here.
2. **Runtime** - The business logic and main functions reside in the runtime section. Lots of checks and jumps happen here to validate transactions.
3. **Metadata** - Extra data about the contract like ABI definitions live in the metadata.

Huff and other minimalist compilers may skip the metadata, but the creation and runtime sections are essential.

### Solidity's Careful Checks

Solidity code translates into EVM opcodes that perform rigorous validation checks, including:

- Message value assessment
- Call data length verification
- Confirming function selectors match expected handlers

These guards help ensure the smooth and secure execution of contract logic.

### Function Dispatching

A key job of the runtime section is matching function calls to the appropriate logic. Solidity compares the first 4 bytes of call data (the function selector) to an internal map of available functions, then jumps to the matching one. This "bouncer" system enables dynamic dispatching.

### Optimizing Opcodes

While decoding EVM bytecode gives insight into contracts, don't forget you can also optimize them! Some ideas:

- Analyze gas costs - Are expensive operations needed?
- Reduce contract size to lower deployment fees
- Add sanity checks - Prevent wasted gas from bad input

Get creative and see how tweaking opcodes affects efficiency.

## Unpacking Other Opcode Mysteries

Whew, by now you should have a solid grasp of many EVM opcodes under the hood of smart contracts. But the learning need not stop there! Here are some more advanced topics to dig into:

### Mappings and Arrays

These data structures have tricky implementations at the EVM level. Mappings rely on cryptographic hashes for lookups, while dynamic arrays use special opcodes to resize by copying memory. Mastering these concepts will level up your Solidity skills.

### Precompiles

Precompiles are special contracts handled directly by the EVM for efficiency. Understanding how these work can aid in developing optimized dapps. Study precompiles for cryptographic functions (ECDSA signatures, hashes), arithmetic (BN128 curve), and more.

### Accessing Storage

Smart contracts store data in contract storage slots, accessed via opcodes like `SLOAD` and `SSTORE`. The mapping of storage locations to data types like arrays and structs can be complex. Learn this mapping to directly manipulate storage for advanced optimizations.

### Inline Assembly

Solidity supports dropping down to raw EVM assembly language via inline assembly blocks. This allows fine-grained control and optimization through direct opcode usage. Become an expert here to truly customize the compiled output.

As you can see, there is always more to uncover in EVM and Solidity. Hopefully this post has lit a spark of curiosity to keep studying and experimenting on your journey to mastery!
