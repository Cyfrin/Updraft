---
title: Section 6 - Recap
---

_Follow along with the video lesson:_

---

### Section 6 - Recap

In section 6 we performed the Thunder Loan audit, and we dove head first into the world of advance DeFi.

We identified ThunderLoan as a borrowing and lending flash loan protocol and subsequently defined and gleaned a better understanding of flashloans.

We learnt that a Flash Loan is a loan which lasts for a single transaction. The catch, is that the loan must be repaid in the same transaction in which it is borrowed. If it isn't, the transaction will revert.

Flash loans are a powerful and important DeFi primitive because they afford any user the ability to act as a 'whale', or someone with a lot of liquidity.

![section-6-recap1](/security-section-6/49-section-6-recap/section-6-recap1.png)

### Additional Research

We also learnt the value of pursuing knowledge of popular existing protocols. Having that knowledge, that context is going to be hugely beneficial when assessing similar code bases. We saw this clearly in the insight we gained by diving into [**Aave**](https://aave.com/) and [**Compound Finance**](https://compound.finance/).

### Vulnerabilities

We were exposed to a whole new batch of vulnerabilities which include:

- **Failure to Initialize** - as showcased by the Parity Wallet case study as well as our [**Remix example**](https://remix.ethereum.org/#url=https://github.com/Cyfrin/sc-exploits-minimized/blob/main/src/failure-to-initialize/FailureToInitialize.sol&lang=en&optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.20+commit.a1b79de6.js). Failure to initialize a protocol leaves it open to these values being initialize at an unexpected time, resulting in unintended protocol behaviour.
- **Storage Collision** - we saw first had, through PoCs and [**Remix examples**](https://remix.ethereum.org/#url=https://github.com/Cyfrin/sc-exploits-minimized/blob/main/src/storage-collision/StorageCollision.sol&lang=en&optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.20+commit.a1b79de6.js) how altering storage slot assignments during a protocol upgrade can have dire implications.
- **Oracle & Price Manipulation** - Using an AMM as an oracle can have unintended consequences with respect to asset price feeds. Dexs/AMMs are susceptible to having their prices manipulated via swaps on the platform. A decentralized oracle like a [**Chainlink Price Feed**](https://data.chain.link/) is a more secure route.

We also learnt about risks associated with using proxies both with regards to programmatic considerations like `storage collision` but also pertaining to concerns around `centralization`.

`Centralization` may be brushed off as expected, or design decisions, but it should be called out. Users should have a chance to know that a `centralized` entity can change things at their discretion.

### Malicious Scope

Something we didn't actually touch on, but I _do_ want to mention briefly, is the concept of `malicious scope`.

It may be the case that a protocol approaches you for an audit and they provide you scope, but intentionally leave malicious code _outside of scope_ - try your best to sniff these out.

Protocols that you audit resulting in rug pulls is going to look bad on you, so defend yourself and be cautious!

### Tooling

We didn't talk about it too much, but [**upgradehub**](https://upgradehub.xyz/) was touched on. It serves as a great place to track upgradeable protocols and how they've changed. Absolutely check it out the next time you're looking through an upgradeable contract.

### Case Studies

Parity Wallet was a protocol which fell victim to a failure-to-initialize vulnerability in 2017. We discussed this case study and how it unfolded real time through a [**GitHub Issue**](https://github.com/openethereum/parity-ethereum/issues/6995).

Parity is _the_ poster child for failing to initialize a protocol once deployed.

Truly a wild time in which many lessons weren't learnt (or not).

In addition to Parity we touched on the [**case of Oasis**](https://medium.com/@observer1/uk-court-ordered-oasis-to-exploit-own-security-flaw-to-recover-120k-weth-stolen-in-wormhole-hack-fcadc439ca9d), in which centralization was leveraged via a UK Court order to have a protocol exploit itself and recover stolen funds.

A win in the eyes of some, and terrifying amounts of control in the eyes of others.

### Wrap Up

Wow, we've learnt a tonne in this section. I know I've said it before, but I really encourage you to jump into the community and get involved.

You can participate in discussions on the [**Course GitHub Repo**](https://github.com/Cyfrin/security-and-auditing-full-course-s23/discussions), or jump into the [**Cyfrin Discord**](https://discord.gg/cyfrin). Updates and exciting things are coming through these channels and you'll be doing yourself a disservice to not be in the middle of them.

We've another audit for our portfolio! 🥳

Take a break, you've earned it - and they're important. When you come back, we'll be ready to dive into Boss Bridge.

See you soon!
