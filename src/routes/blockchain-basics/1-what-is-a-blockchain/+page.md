<!-- TODO: How do we put the "next" button at the top of the page??? -->

# What is a Blockchain? 

You can follow along with this section of the course here. 

<!-- TODO update these all with their respective YouTube video -->
You can follow along with this section of the course here. 

<iframe width="560" height="315" src="https://www.youtube.com/embed/bbBbq7T9Jjs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="what is a blockchain?"></iframe>

Or watch the [full video](https://www.youtube.com/watch?v=umepbfKp5rI).


## Bitcoin and Blockchain

You might be familiar with **Bitcoin**, which is one of the first protocols to utilize the revolutionary blockchain technology. The Bitcoin Whitepaper, authored by the pseudonymous Satoshi Nakamoto, described how Bitcoin could facilitate peer-to-peer transactions within a decentralized network using cryptography. This gave rise to censorship-resistant finance and presented Bitcoin as a superior digital store of value, often referred to as *digital gold*. There is a fixed amount of Bitcoin, similar to the scarcity of gold. You can learn more about this in the <a href="https://bitcoin.org/bitcoin.pdf" target="_blank" style="color: blue; text-decoration: underline;">Bitcoin Whitepaper</a> available in the course's GitHub repository.

## Ethereum and Smart Contracts

A few years after Bitcoin's creation, Vitalik Buterin and others founded **Ethereum**, which builds upon the blockchain infrastructure, but with additional capabilities. With Ethereum, you can create decentralized transactions, organizations, and agreements without a centralized intermediary. This was achieved through the addition of **smart contracts**.

Though the concept of smart contracts was originally conceived in 1994 by Nick Szabo, Ethereum made it a reality. Smart contracts are essentially code that executes instructions in a decentralized manner without needing a centralized authority. They are similar to traditional contracts but are executed on blockchain platforms.

## The Oracle Problem

However, smart contracts face a significant limitation – they cannot interact with or access data from the real world. This is known as the **Oracle Problem**. Blockchains are deterministic systems, so everything happens within their ecosystem. To make smart contracts more useful and capable of handling real-world data, they need external data and computation.

Oracles serve this purpose. They are devices or services that provide data to blockchains. To maintain decentralization, it's necessary to use a decentralized Oracle network rather than relying on a single source. This combination of on-chain logic with off-chain data leads to **hybrid smart contracts**.

## Chainlink

**Chainlink** is a popular decentralized Oracle network that enables smart contracts to access external data and computation. It is modular and blockchain-agnostic, meaning it can be used with Ethereum, Avalanche, Polygon, Solana, or any other blockchain.

## Layer 2 Scaling Solutions

As blockchains grow, they face scaling issues. Layer 2, or L2, solutions have been developed to address this. L2 solutions involve other blockchains hooking into the main blockchain, essentially allowing it to scale. There are two primary types of L2 solutions: optimistic rollups and zero-knowledge rollups. We will explore these more in the later sections of this course.

## Decentralized Applications (DApps)

Throughout this course, you'll frequently encounter terms like DApp, decentralized protocol, or smart contract protocol, which essentially refer to the same concept. A **Decentralized Application (DApp)** usually comprises multiple smart contracts.

## Web 3.0

Web 3.0, or **web3**, is a term used to describe the new paradigm of the internet powered by blockchain and smart contracts. Unlike the previous versions of the web, web3 is permissionless and relies on decentralized networks rather than centralized servers. This ushers in an era of censorship-resistant and transparent agreements and transactions, often called an ownership economy.

## The Value of Smart Contracts

Now, let's address what smart contracts truly represent. At their core, they enable *trust-minimized agreements* or, simply put, *unbreakable promises*. Additionally, they offer speed, efficiency, transparency, and several other benefits.

The technologies such as smart contracts, blockchain, web3, and cryptocurrencies encapsulate a revolutionary paradigm. They solve real-world problems and are instrumental in the creation of a more open, decentralized world.

In the next sections, we will dive into the technical aspects to understand how these technologies work under the hood. But before we get technical, let's understand the underlying value they bring.

Why are smart contracts a big deal? They solve genuine problems, and as the saying goes, a technology is only as good as the problem it solves.

## Trust-Minimized Agreements
Think of smart contracts as giving rise to unbreakable promises. Imagine an environment where agreements are executed exactly as intended without any party being able to alter or evade them post-commitment. This eliminates the necessity for trust among parties, which has immense implications across various sectors.

## Speed and Efficiency
Smart contracts execute automatically based on predetermined conditions. This automation allows for operations that would traditionally take days or even weeks to be completed in a matter of minutes or seconds.

## Transparency and Security
Blockchain’s immutable and transparent nature means that once a smart contract is deployed, its code can be seen by all, but it can't be changed. This openness can create a new level of accountability.

## Bringing Real-world Data to Blockchain
With the integration of Oracles like Chainlink, smart contracts can interact with data outside their network. This feature is crucial for the adoption of smart contracts in various industries, including finance, supply chain, and insurance.

## In Conclusion
We've taken a high-level view of the blockchain landscape, including its history and the problems that smart contracts solve. As we move forward, we'll delve into how these technologies work technically, how to create smart contracts, and how to deploy them on networks like Ethereum.

The knowledge you acquire here will not only be applicable to Ethereum but also to other blockchains like Avalanche, Polygon, Phantom Harmony, etc. Whether you are an aspiring developer, an entrepreneur, or just a technology enthusiast, understanding the fundamental concepts behind smart contracts and blockchain technology can be enormously beneficial.

So, let's embark on this journey to explore the world of decentralized applications and the boundless opportunities they present.

In the next section, we will start by setting up the development environment for smart contract creation. Stay tuned!