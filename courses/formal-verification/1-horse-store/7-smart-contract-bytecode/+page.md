---
title: 3 Sections of Solidity Smart Contract Bytecode
---

---

# Unraveling Smart Contract Compilation: A Peek into Function Dispatch &amp; Creation Code

Hey, fellow blockchain enthusiasts! Ready to dive deeper into the world of smart contract development? If you've been following along, you know that we're in the middle of crafting the almighty function dispatcher. This little piece of coding magic is what says, "Hey function selector, you're up—time to shine!" It's essential, but guess what? We haven't finished it just yet! We've got the main function down, but let's take a moment to peek at our progress.

## Understanding the Compilation Output of a Smart Contract

When we compile a smart contract, it's like piecing together a jigsaw puzzle. Each compiled contract usually splits into three or four sections:

```
1. Contract creation code2. Runtime code3. Metadata4. And sometimes additional bits like constructors or other compiler treats
```

Solidity compilers have a neat trick where they drop an "invalid opcode" between sections to make it easier to tell which is which. It's like leaving breadcrumbs to find our way home in the contract-creation forest.

## Decoding the Different Sections of a Smart Contract

Starting off, we have the contract creation code. Think of this as the smart contract's birth certificate—it's the ledger entry that tells the blockchain, "Hey, make room! We've got a new resident!" Even if we have zero runtime code (that's the part that actually makes our contract do something), we still need this contract creation bytecode when we fire up our projects in Huff.

```solidity
// Contract creation bytecode example<screenshot src="https://cdn.videotap.com/618/screenshots/MEaEO2M3ll7pvocoagRI-109.26.png"></screenshot>
```

_Our mission_, once these Huff scripts are complete, is to have both the contract creation bytecode and the runtime code coexisting harmoniously—minus the metadata (because, let's face it, we're minimalists).

> "All the contract creation bytecode does is essentially say, 'Take the binary after me and stick it on chain'."

In its essence, when you deploy a smart contract, you're tossing a big ol' blob of binary code at Ethereum. The conversation goes something like this: "Blockchain, dear, take this chunk of the binary and, could you kindly save it on-chain? Thanks!"

## The Journey of Deploying a Smart Contract

Check out this transaction example where a spanking new smart contract gets created:

```plaintext
// Sample transaction<screenshot src="https://cdn.videotap.com/618/screenshots/X3WCio3kn9jfTokptJRk-149.72.png"></screenshot>
```

That first bit of the call data, that's your contract creation bytecode. It's like the manager who instructs the system to copy the following code and secure it right where it needs to be—in the immutable world of the blockchain.

So, even if we're still in the draft phase with a Huff smart contract that doesn't do much, the system is smart enough to provide us with the starting block—the contract creation bytecode.

## Bringing Huff Smart Contracts to Life

As we wrap up this section of our programming adventure and look ahead, it's exciting to think about bringing our huffing and puffing to life. Are you ready to continue building out our smart contracts, diving into the runtime code and, perhaps, even flirting with adding metadata?

The journey so far has illuminated key concepts around smart contract compilation and deployment. We've explored the distinct sections of compiled code, focusing on contract creation bytecode and how it births new smart contracts on the blockchain.

Our mission is within reach: crafting complete Huff scripts with runtime logic and the starting blocks to implant them on-chain. It's like raising a newborn contract—we guide its first steps to launch it safely into the blockchain wilderness.

### Why Huff for Smart Contracts?

Before charging ahead, it's worth reflecting on _why_ the Huff language matters in the realm of smart contracts.

Huff provides a minimalist, flexible approach for creating decentralized applications. The stripped-down syntax empowers developers to build custom contracts from scratch, without bulky interfaces or unnecessary frills.

It's like cooking in a rustic cabin kitchen rather than a high-tech modern smart home. We have the essential ingredients and tools to whip up functional code that does exactly what we want.

For blockchain pioneers who value transparency and control, Huff strikes the right balance. We operate close to the metal, inspecting compilation outputs and fine-tuning our concoctions line-by-line.

### Huff vs Solidity: A Comparison

If you're new to Huff, you may be more familiar with the Solidity language for Ethereum contracting. How exactly does Huff compare?

A key distinction is that **Huff has no native metadata**. Solidity and other languages embed information about the contract's name, authors, version, etc right in the code itself. Huff eschews this metadata for pure focus on execution logic.

Huff is also more flexible in deployment, with portable bytecode that can launch on different blockchain networks. Solidity ties contracts to Ethereum and lacks native support for other chains.

Lastly, Huff provides granular control over compilation and optimizations. Default Solidity compilations may contain excess bytecode and constructs like libraries that are unnecessary for simple use cases. Huff empowers developers to craft tight, gas-efficient code.

So in summary:

**Huff**

- No native metadata
- Portable across blockchains
- Granular compilation control

**Solidity**

- Contains metadata
- Ethereum-specific
- Fixed compiler optimizations

Which language is "better" depends on the use case. For getting started and prototyping ideas, Solidity undoubtedly provides more hand-holding. Huff excels when you want more customization or cross-chain applications.

The choice between tools depends wholly on the architect envisioning the structure.

### Mapping Out Next Steps

We've explored contract creation bytecode, the genesis of smart contract deployment. This foundation sets the stage for our next milestone...**runtime code**.

Runtime logic is what brings a contract to life, allowing it to receive inputs and execute functions. Coding a fully operational Huff contract requires stitching together both creation and runtime components.

My friends, we are so close! Our function dispatcher construction project remains unfinished, but the path ahead looks bright. Let's take a breath, appreciate how far we've come, and gear up to step across the threshold into runtime territory.

This concludes our deep dive into early compilation outputs. The journey continues as we inch toward fully functional Huff smart contracts that can dance across blockchains. Stick around for the next captivating chapter!
