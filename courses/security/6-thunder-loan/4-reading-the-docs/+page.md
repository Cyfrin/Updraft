---
title: Phase 2 Recon - Reading the Docs
---

---

### Phase 2 Recon - Reading the Docs

Let's continue gaining context of Thunder Loan in this lesson by proceeding to read through more of the provided documentation.

The README has more contextual information about the project that we should take advantage of as well. The team states that Thunder Loan is:

> _A flash loan protocol based on [Aave](https://aave.com/) and [Compound](https://compound.finance/)._

If we're unfamiliar with Aave, we're even directed to a [**short explainer video**](https://www.youtube.com/watch?v=dTCwssZ116A) by Whiteboard Crypto that I encourage you to take a moment to watch for a high-level understanding of things.

We'll be doing a much more comprehensive dive into these DeFi systems in this section of course! It's just good to be prepared.

### About Section

The about section of the README gives us some explicit detail about the protocol and its intended functionality.

```
The ⚡️ThunderLoan⚡️ protocol is meant to do the following:

1. Give users a way to create flash loans
2. Give liquidity providers a way to earn money off their capital
```

We learnt about Liquidity Providers in the TSwap section of this course, but flash loans may be new. Let's define some of these terms explicitly in our notes for reference.

```
Liquidity Provider - Someone who deposits money into a protocol to earn interest.

    - Something we should always ask is - where's the interest coming from? In TSwap this was coming from swap fees.

    - In Thunder Loan - Liquidity providers can `deposit` assets into `ThunderLoan` and be given `AssetTokens` in return. These `AssetTokens` gain interest over time depending on how often people take out flash loans

Flash Loan - A flash loan is a loan that exists for exactly 1 transaction. A user can borrow any amount of assets from the protocol as long as they pay it back in the same transaction. If they don't pay it back, the transaction reverts and the loan is cancelled.
```

Something of note by the Thunder Loan protocol:

- Users additionally have to pay a small fee to the protocol depending on how much money they borrow. To calculate the fee, we're using the famous on-chain TSwap price oracle.

This fee must be where the interest for Liquidity Providers is coming from, I'm sure we'll soon confirm. Additionally, we see that Thunder Loan is leveraging a price oracle.

### Wrap Up

These are all important considerations as we approach this code base. Our first step should be to gain a deeper understanding of flash loans and how they work within a borrowing and lending protocol. We may even choose the start with some protocol diagrams to better visualize Thunder Loan.

What's certain is that we're just getting started. Let's take a closer look at flash loans in the next lesson.
