---
title: No Slippage Protection Write up
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/TSXuFFB0kVE?si=FkJe7gFG-6WBadrK" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

## Mitigating Slippage Impact in DeFi Protocols

The topic for today's post revolves around a crucial aspect of DeFi (Decentralized Finance) transaction executed through protocols like MetaMask. Specifically, we will be focusing on `slippage` and how a lack of protection can adversely affect the user experience.

### What is Slippage and why should it concern you?

In a nutshell, slippage occurs when the execution price of a transaction is different from when the transaction was originally created. This can be due to market volatility causing rapid price changes. High slippage can result in a user receiving fewer tokens than anticipated, or, conversely, paying more than expected for a specified quantity of tokens.

> If you're new to smart contracts, think of slippage like unwanted change in your transaction, which you'd prefer not to experience.

Both situations can be distressing for users, and are likely to negatively impact the trust and usability of the protocol.

### Why Slippage Protection is Crucial

From the risk perspective, we'd label this as `High` due to the potential impact. Despite the likelihood being categorized as medium to high, the severity of the potential financial loss warrants its high-risk status.

An interesting gateway to delve into this topic is through the study of `swap exact input` and `swap exact output` functions in smart contracts and their associated slippage protection measures.

Take, for example, **TSWAP pool swap exact output** that lacks slippage protection. If market conditions change while a transaction is waiting to be processed, this lack of slippage protection could lead to users receiving far fewer tokens than expected.

A practical manifestation would be when a user attempts to swap 10 WETH (Wrapped Ether) for DAI (a stablecoin pegged to USD). The user is expecting to get a minimum of 100 DAI, but due to the lack of slippage protection, they might end up receiving less than 100 DAI if the price of WETH depreciates before the transaction is completed.

### How to Guard Against Slippage

A smart contract's code can be revised to include slippage protection. This precaution will ensure that the tolerable maximum or minimum amount is strictly adhered to, despite any sudden market price changes for the involved tokens.

The way to do this is through implementing a maximum input or minimum output parameter, effectively giving a safety net for users to not receive less or pay more than expected.

The `maxAmountIn` serves as a limit for how much the user is willing to spend, introducing a safety parameter within the code.

### The Importance of a Proof of Concept (POC)

Having a POC helps a lot when trying to communicate potential risks to a protocol. To illustrate, here's a simple scenario:

- User initiates a `swapExactOutput` for 1 WETH (WETH=1000 USDC) with input token as USDC and output token as WETH.
- No maximum input amount allowed, transaction is pending in mempool.
- Market price of WETH skyrockets to 10,000 USDC.
- User completes the transaction but is charged 10,000 USDC instead of the expected 1,000 USDC.

This excessive charge to the user occurs due to no slippage protection. Creating a POC for this scenario will not only help protocol developers understand the implications but also provide a pathway to tackle the problem.

Having a max input amount parameter ensures that users can predict how much they spend on the protocol.

### Wrapping Up

While some might argue that the user could approve fewer tokens or reject the transaction, the reality is that these aren't foolproof solutions. Protecting against slippage is critical for maintaining user trust and enhancing the protocol's usability.

Understanding slippage and how it affects your transaction can provide significant benefits and prevent unexpected loss. The control it provides the trader can be the difference between a `successful transaction` and a `bad experience`.

Although our focus here was on setting it to high, remember that the risk severity of every case varies, and one could always argue **contextual flexibility** based on each unique situation.
