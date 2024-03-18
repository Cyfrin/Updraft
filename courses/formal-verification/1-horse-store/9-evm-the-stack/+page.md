---
title: EVM - A Stack Machine (The Stack)
---

---

## Understanding Solidity Variables and the Ethereum Virtual Machine (EVM)

Hey fellow blockchain enthusiasts! Are you ready to dive into the intriguing world of smart contracts and uncover the magic behind variable storage in Solidity? If you've ever wondered how it decides which variables stick around and which disappear into the ether after execution, read on.

Let's look at the number of horses in a smart contract. This aptly named "storage variable" is in it for the long haul - its value persists even after the code finishes running.

Now consider `uint256 hello = 7`. This short-lived "memory variable" waves goodbye after the transaction completes, becoming inaccessible and irrelevant. Poof!

Here's the head-scratcher: how does Solidity perform this vanishing act on some variables while keeping others alive indefinitely? And how does the Ethereum Virtual Machine (EVM) juggle all of this behind the scenes?

```js
uint256 number_of_horses;
// Storage variable persists
uint256 hello = 7;
// Memory variable disappears after the transaction
```

As developers, we usually let Solidity handle these complexities automatically. It silently allocates call data, governs memory usage during execution, and seamlessly switches between variable types. But here's the twist: when coding in low-level bytecode, _we_ become the puppet masters, directly pulling the strings of opcodes.

With great power comes great responsibility. Where should we store data? And how do we minimize gas costs when performing computations? Enter one of the EVM's favorite toys..._the stack_.

Let's examine this brilliant visual that prominent developer Pascal shared on Twitter:

![EVM Storage](https://cdn.videotap.com/618/screenshots/RFUsm7dF6BfzgQ1WsPBv-150.17.png)

Notice those fluffy pancakes stacked on top of each other? It perfectly captures how the EVM handles data sequentially in its "stack machine".

The stack offers the cheapest gas fees for most operations. For example:

```assembly
// EVM opcode for additionADD
// Takes two items from the stack and pushes the result back
```

This `ADD` opcode grabs the top two pancakes, combines their values, and places the sum right back on top. At roughly 3 gas, it's the _only_ way to add numbers within EVM's walled garden.

Here are the cluster rules:

- Adding an item? Toss it on the peak
- Want to access something lower down? Remove each layer above first (think excavating buried treasure)
- Most operations shuffle around this pancake stack

Whenever we run code containing opcodes, they do the heavy lifting behind the scenes - dancing with the stack machine at EVM's storage discotheque.

So for efficient smart contracts, memorize this mantra: "Know thy variable's place, measure thy gas with grace."

We've only explored the tip of the iceberg when it comes to Solidity, EVM, and their curious relationship. As we delve further into opcodes, optimization, and blockchain's endless potential in later posts, remember - mastery over variables and storage paves the road to gas savings and enlightenment.

Now go forth and stack those pancakes!

---

### A Peek Behind the Curtain: How Solidity and the EVM Work Their Magic

As aspiring blockchain wizards, understanding the secret inner workings of Solidity and the Ethereum Virtual Machine empowers us to code potent spells and unlock the full potential of smart contracts. Consider this your invitation behind the curtain!

When dealing with variables in Solidity, it seems to "magically" know whether each one belongs in temporary memory or permanent storage. For example:

```js
uint256 number_of_unicorns;
// Stays in storage after execution
uint256 temp = 42;
// Vanishes from memory into the ether
```

But what's actually occurring behind that magical curtain? And how does the EVM juggle these variables under its proverbial top hat?

Today we'll explore the key players that make this magic possible:

- Stack
- Memory
- Storage

Grab your wizard robes and buckle up for a deep dive into the secret inner chambers of Solidity and EVM!

#### The Curious Case of Disappearing Variables

Let's say our smart contract counts the number of magical creatures on the blockchain. Solidity assigns `number_of_unicorns` as a storage variable, meaning its value persists between transactions.

But that temporary `temp` value? _Poof!_ It disappears forever into the void once execution finishes.

This leads to our first mystery:

> How does Solidity determine which variables stick around and which ones disappear?

Making variables vanish might seem like magic, but in reality, it's Solidity's automation that makes it seem effortless. Behind the scenes, it handles tedious tasks like:

- Allocating call data
- Governing memory usage
- Switching variable types seamlessly

No wand waving required! But here comes the plot twist...

When directly using low-level opcodes, _we_ take over Solidity's job. Instead of a magical compiler handling variables, we become the wizards choreographing everything by hand.

> Where should data live? How can we compute things efficiently? Welcome to the potions workshop, where mastering storage and optimization unlocks magic!

#### Inside the Secret Chambers: Stack, Memory, and Storage

To grasp these concepts, let's examine a diagram tweeted by Pascal, an esteemed smart contract sorcerer:

![EVM Storage Chambers](https://cdn.videotap.com/618/screenshots/RFUsm7dF6BfzgQ1WsPBv-150.17.png)

It reveals the hidden nooks and crannies where EVM stores data:

- Stack - Favorite spot for inexpensive operations
- Memory - Temporary working space
- Storage - Permanent home for variables

Out of these secret chambers, the stack boasts the best gas savings for computation. For example, the `ADD` opcode:

```solidity
ADD // Grabs top 2 stack items, combines values, returns sum
```

This thrifty little spell costs around 3 gas. And in EVM's lair, it's the _only_ game in town for adding numbers!

Here's how the mighty stack works its magic:

- Adding something? Toss it on top!
- Accessing lower items? Remove each top layer first!
- Most operations shuffle around the stack

Whenever we invoke opcode rituals, under the hood they're dancing with EVM's favorite stack structure. understanding these secret chambers is key to optimization and gas savings!

#### Preparing for Advanced Potion-making

Today we explored Solidity and EVM's hidden workings—how they make variables appear and disappear like magic tricks. As apprentice sorcerers, knowing where data is stored (and for how long) unlocks the power to create efficient smart contracts that save on magical gas fees!

In future posts, we'll dive deeper into the advanced potion-making of opcodes, gas optimization, and all things blockchain magic. Consider this your formal invitation behind the curtain into secret chambers most wizards never see!
