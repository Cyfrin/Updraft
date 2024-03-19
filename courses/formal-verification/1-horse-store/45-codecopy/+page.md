---
title: CODECOPY
---

---

## The Nitty-Gritty of Ethereum Code Copying

Ethereum smart contract deployment might sound like wizardry, but once you peel back the layers, it all starts to make sense. Let's kick things off with a casual chat about something we cryptographers and developers fondly refer to as 'message value.' Why start here, you ask? Well, it's the starting point for our contract creation process as well.

Now, imagine you’re midway through a complex code, and you execute the `pop` opcode, simple enough to 'pop it right off'. As we continue, things might get a bit cryptic for the uninitiated, but stick with me. We're talking pushing hexadecimals onto the stack – like `push 0x` (and yes, we prefer lowercase for opcode aesthetics).

And here's where `code copy` makes its grand entrance. We spoke about this opcode before, but seeing it in action is a whole different ball game. The key to understanding `code copy` is to break it down. It takes three stack inputs: 'destination offset', 'offset', and 'size'.

At this moment, envision having four elements on the stack. When `code copy` kicks in, the top three are set for action. First, the 'destination offset' - this is the byte offset in memory where the result headed. In essence, it’s like we’re saying to the code, “Hey, make yourself at home right here in this slice of memory!”

![](https://cdn.videotap.com/618/screenshots/f0dgUAStom77qdwQCHsz-125.82.png)

What follows is a couple of values specifying where in the code we want to start copying from and for how many bytes. It's a clever method to avoid copying unnecessary preambles and streamline the contract to include only what's needed. In our scenario, that starting point is `0x1b`, representing the 27th byte offset.

To get our bearings straight, let's count:

```
1, 2, 3, 4,..., 25, 26, 27!
```

There it is, the threshold between initialization and the runtime code - essentially the real meat of the contract.

## Deploying Ethereum Smart Contracts: The `return` Mystery Decoded

After we nail the `code copy`, we encounter `push 0xa5` followed by a `return`. For those in the know, `return` takes two arguments: offset and size. So what we're doing is preparing to return the entire memory filled with our pristine runtime code, which is then cemented on the blockchain as a smart contract.

Now, an astute observer might interject with a burning question: "Does the `return` opcode deploy the contract?" It's nuanced. In fact, the Ethereum Virtual Machine (EVM) has a specific `create` opcode meant for contract creation, but it's not present here. Instead, we've got this `return` opcode carrying the contract initiation weight. What gives?

There's a phenomenal inquiry on Stack Exchange addressing this very curiosity, and without getting lost in the technical weeds, it boils down to this: Contracts can be birthed by either another contract using `create` or a transaction with a nil 'to' field. No `create` opcode necessary.

> "Creating a contract in Ethereum can happen in multiple ways. Sometimes the most important actions occur behind the scenes, with opcodes like `return` playing a pivotal role."

## A Closer Look at the Transaction Creation Details

Since an important nuance behind contract deployment has been revealed with the explore of `return` vs `create`, it's worthwhile to dig a bit deeper into that tidbit from Stack Exchange - namely, how exactly a transaction that lacks destination can birth a contract.

In Ethereum, there are two primary methods used to create smart contracts programmatically:

1. Calling the `create` or `create2` opcode from an existing contract
2. Sending a transaction without specifying a destination address

The first approach is straightforward. We simply call the `create` or `create2` opcode, provide initialization code and funding, et voila! A shiny new contract is born on chain.

But how does the second approach work exactly? What makes a transaction without a destination capable of such contract-birthing magics?

Here's the key - when you transmit a signed transaction on Ethereum without indicating a destination address in the `to` field, the network recognizes this as special case for contract creation.

It handles it by allocating a brand new account to host the contract, with the supplied initialization code executing to bootstrap that account's state. No destination needed when the very point is creating a new on-chain entity!

And there you have it - send a transaction lacking a destination, supply initialization code, and let the Ethereum network handle the rest, incubating your contract baby and welcoming it to the world of decentralized computation.

## Wait a Second...What Was That `invalid` Opcode Again?

Now that we've covered the return opcode mystery for contract creation, let's rewind a bit and shine some light on another curiosity in the bytecode saga - the `invalid` opcode making a cameo.

You may recall this `invalid` opcode nonchalantly appearing after our `return` friend responsible for deploying the contract. But what gives? Surely there must be some method to this madness.

Well, `invalid` is indeed a valid (or shall we say _invalid_ haha) opcode in EVM lingo. Its core purpose is to denote illegal and invalid instruction exceptions. Solidity uses it specifically to mark the end of the contract creation code.

And if you peer closer at the bytecode layout, you'll notice there is a clear separation between:

**Contract creation code**

- Initializes state
- Deploys contract

**Contract runtime code**

- Actual business logic

So in essence, `invalid` signifies termination of the initialization leg and start of runtime. It's an elegant bytecode bookmark that partitions contract creation logic from runtime application logic, allowing us to easily delineate between the two stages.

Mystery solved! The `invalid` opcode plays an integral role in bytecode choreography and contract deployment ceremony.

## The Crucial Takeaway: Smart Contracts on the Blockchain

This walkthrough has shed light on the opcode choreography behind the scenes of smart contract deployment. It’s not just a series of random operations but a carefully orchestrated sequence that ensures only the necessary bytes make their storied journey onto the blockchain.

By dissecting what initially seems to be a convoluted process, we’ve identified key instructions – `code copy` and `return`, along with understanding where contract creation logic departs from runtime logic. It places the runtime code on chain, ready for interaction.

So there you have it. Through understanding opcodes, bytecode, and the EVM, we unveil the digital alchemy that is deploying a smart contract. It's neither as foreign as you feared nor as simple as you hoped, but it’s undeniably fascinating.

For the code whisperers, blockchain buffs, and aspiring smart contract developers, I hope this peek behind the Ethereum curtain has been enlightening. You now hold the keys to contract creation; whether you're setting out to build the next decentralized application (DApp) or simply satisfying curiosity, may this knowledge be your guide and inspiration.
