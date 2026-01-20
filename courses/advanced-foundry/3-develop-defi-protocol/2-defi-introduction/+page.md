---
title: DeFi Introduction
---

_Follow along the course with this video._

---

### DeFi Introduction

> ❗ **NOTE**
> This is the hardest and most badass project in the entire course. This section is for those who want to go deep into DeFi. If DeFi isn't your thing, feel free to skip and come back to this section.

All the content covered in this section is available through the course [**GitHub Repo**](https://github.com/Cyfrin/foundry-full-course-f23) as well as the section's [**project repo**](https://github.com/Cyfrin/foundry-defi-stablecoin-f23).

Decentralized Finance (DeFi) is an enormous ecosystem, we couldn't hope to offer an exhaustive coverage of everything available, but we are going to provide a thorough rundown of what DeFi is, why it's popular and some of the most popular dApps out there.

A good starting place is [**DeFi Llama**](https://defillama.com/). This website aggregates data from major DeFi protocols and provides a snapshot of what's happening in the space.

![defi-introduction1](/foundry-defi/1-defi-introduction/defi-introduction1.PNG)

DeFi Llama demonstrates the size of various DeFi protocols by ranking them by Total Value Locked (TVL). Some of the biggest include:

**Lido:** Liquid Staking platform. Liquid staking provides the benefits of traditional staking while unlocking the value of staked assets for use as collateral.

**MakerDAO:** Collateralized Debt Position (CDP) protocol for making stablecoins. (This is what we'll be doing in this section!)

**AAVE:** Borrowing/Lending protocol, similar to a decentralized bank.

**Curve Finance:** Decentralized Exchange (DEX), specialized for working with stablecoins.

**Uniswap:** General purposes Decentralized Exchange for swapping tokens and various digital assets.

The beauty of DeFi is that it provides access to sophisticated financial instruments within a decentralized context.

Some additional places that are great to learn about DeFi include:

- [**Bankless**](https://www.bankless.com/)
- [**Metamask Learn**](https://learn.metamask.io/)

### AAVE

I often encourage people to go checkout AAVE and Uniswap to get a feel for what these protocols can offer.

[**AAVE**](https://aave.com/), as mentioned, is a decentralized borrowing and lending platform. By logging into the dApp by connecting a wallet, users can see assets they hold which can be offered as collateral and assets available to borrow.

![defi-introduction2](/foundry-defi/1-defi-introduction/defi-introduction2.PNG)

Each asset has it's own calculated Annual Percentage Yield (APY) which effectively represents the interest a lender to the protocol would make on deposits of a given asset.

### Uniswap

Another massively popular protocol that I like to bring to people's attention is [**Uniswap**](https://uniswap.org/).

![defi-introduction3](/foundry-defi/1-defi-introduction/defi-introduction3.PNG)

Uniswap is a decentralized exchange which allows users to swap tokens for any other token.

Unfortunately, not all of these DeFi protocols work on testnets, but I do have a few videos for you to watch to gain a deeper understanding and context of how things work:

- [**Leveraged Trading in DeFi**](https://www.youtube.com/watch?v=TmNGAvI-RUA)
- [**Become a DeFi QUANT**](https://www.youtube.com/watch?v=x0YDcZly_PU)
- [**Aave Flash Loan Tutorial**](https://www.youtube.com/watch?v=Aw7yvGFtOvI)

> ❗ **IMPORTANT**
> If you do decide to experiment with these protocols, I highly recommend doing so on testnets when possible and Layer 2s (like Polygon, Optimism, or Arbitrum) as the fees on Ethereum Mainnet can be _very_ high.

### MEV

Before we get too deep into DeFi, I do want to bring the concept of Miner/Maximal Extractable Value (MEV) to your attention as a caution.

At a very high-level, MEV is the process by which a node validator or miner orders the transactions of a block they're validating in such as way as to benefit themselves or conspirators.

There are many teams and protocols working hard to mitigate the effects of MEV advantages, but for now, I recommend that anyone looking to get deep into DeFi read through and understand the content on [**flashbots.net's New to MEV guide**](https://docs.flashbots.net/new-to-mev). This content is both an entertaining way to learn about a complex concept and extremely eye-opening to the dangers MEV represents in the DeFi space.

### Wrap Up

The project we're going to be building in this section is a _stablecoin_. Stablecoins may seem simple on their surface, but these are a bit of an advanced concept. If anything is confusing, I encourage you to leverage all of the resources available to you to become unstuck.

- AI gets better each day. Use assistants like [**ChatGPT**](https://chatgpt.com) for insight into your problems (beware hallucinations)
- [**The Discussions Tab**](https://github.com/Cyfrin/foundry-full-course-f23/discussions) of the course is a great place to start dialogues and seek assistance
- [**Cyfrin's Discord Server**](https://discord.gg/cyfrin) contains thousands of likeminded students eager to help each other succeed.

Like I said, there is _a lot_ to DeFi and this is easily going to be the most advanced section in this whole course. If you're able to succeed here you'll have reason to be exceptionally proud.

The core is, DeFi is `permissionless`, `open-source`, finance and to _me_ is the best thing smart contracts enable. Through DeFi we can move away from contemporary financial institutions towards a fairer and more transparent finance system.

Let's get started walking through the project code.

Hello and welcome back. Today we will be delving into Foundry DeFi, taking a look at the code we will be working with throughout this course. It is important to mention that DeFi is an enormous and complex subject that fully deserves an exclusive course, but for now, let's start by delving into the basics of DeFi. Let’s get started!

## I. An Overview of DeFi

If you are new to DeFi, a great starting point is [DeFi Llama](https://defillama.com/), a simple and intuitive website that provides a current snapshot of the DeFi industry, giving insights into total value locked in DeFi, leading apps, and dominant protocols. Top platforms include open-source decentralized banking like Aave, liquid staking platforms like Lido, decentralized exchanges like Uniswap and Curve Finance, and collateralized debt position protocols like MakerDAO which we will be building later in the course.

### The Beauty of DeFi

![defi-introduction1](/foundry-defi/1-defi-introduction/defi-introduction1.PNG)

The beauty of DeFi and the reason for its growing popularity is the access it provides to sophisticated financial products and instruments in a decentralized context.

![defi-introduction2](/foundry-defi/1-defi-introduction/defi-introduction2.PNG)

In my opinion, DeFi is possibly the most exciting and important application of smart contracts. I highly recommend spending some time to become conversant with the basics of DeFi, if not becoming fully fluent. Start with useful resources such as the [Bankless](https://www.bankless.com/) podcast and [MetaMask Learn](https://learn.metamask.io/).

## II. Getting Started with DeFi

I encourage you to begin by playing around with apps such as Aave and Uniswap on their respective websites.

For newcomers, it is advisable to start on testnets. Some platforms, such as Ethereum, have high transaction fees, so beginners might want to consider cheaper alternatives like Polygon Optimism or Arbitrum.

It's crucial to remain aware of the concept of MEV (Miner Extractable Value or Maximal Extractable Value) which is a significant issue in the DeFi industry. In essence, if you are a validator who arranges transactions in a block, you can organize them in a manner that favors you - cultivating fair practices in this area is the focus of several protocols like Flashbots.

For those looking to delve deeper into DeFi, I recommend checking out the [Flashbots.net](https://www.flashbots.net/) website, which houses a wealth of videos and blogs.

## III. The Project: Building A Stablecoin

In this course, we will be building our version of a stablecoin. The concept of stablecoins is advanced and widely misunderstood. To simplify it, they are assets that peg their market value to another stable asset, like gold or a fiat currency.

## IV. Foundry Stablecoin Project is the Most Advanced.

![defi-introduction3](/foundry-defi/1-defi-introduction/defi-introduction3.PNG)

Even though we have following lessons on upgrades, governance, introduction to security, this Foundry Stablecoin project is the most advanced one we're working with, hands down.

Stepping into DeFi and understanding everything in this lesson can be a daunting task. Seek help from [Chat GPT](https://chat.openai.com/), use the [GitHub repo](https://github.com/Cyfrin/foundry-full-course-f23/) discussion tab or even browse the [MakerDAO forum](https://forum.makerdao.com/) to understand how the industry stalwarts are working and implementing DeFi.

You can even check out Coinbase's educational content to get a headstart on DeFi.

In the following section, we will be walking you through the code. Happy learning!
