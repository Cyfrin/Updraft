---
title: 3 Sections of Solidity Smart Contract Bytecode
---

_Follow along with this video:_

---

### Bytecode Breakdown

Alright! At this point you may notice something funny. We haven't actually coded the `function dispatch` logic yet, so why are we getting an output? Where does this output come from and what is it doing?

Well, if you assess the input `calldata` of a transaction, most compiled contracts have at least 3 distinct sections:

- Contract Creation
- Runtime
- Metadata

<smart-contracts.png>

> The Solidity compiler is nice in that it adds a bit of opcode syntax in the form of an `INVALID` code between each of these distinct sections.

### Contract Creation

The `contract creation` section of the bytecode is what tells the blockchain to actually store a contract in the database. It says **_"Hey, take the binary after me, and stick it on-chain."_**

What we're seeing as an output when we run `huffc src/horseStoreV1/HorseStore.huff` is the bytecode which represents this contract creation in opcodes. Even though we don't have any logic or `Runtime` code in our contract, Huff is smart enough to know that we need these operations in order to create the contract at all.

By the time we complete our Huff implementation, we should have bytecode generated for both contract creation and runtime. We could include metadata, but for our purposes we won't.

> **Note:** Solidity and Vyper natively add metadata to their smart contracts

### Wrap Up

We're easing into our understanding of opcodes and how they govern executions on the blockchain. In this lesson we learnt that the input `calldata` of a contract is broken into 3 distinct sections, one of which-`Contract Creation`- is responsible exclusively for saving our contract on-chain.

In the next lesson, let's look more closely at how this section of `calldata` accomplishes just that!
