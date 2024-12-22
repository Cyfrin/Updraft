---
title: Invariant/Properties Introduction
---

---

### Invariant/Properties Introduction

> Invariant - A property or condition of a system which must always hold true.

We now should have a tonne of context of what TSwap is supposed to do and how it's supposed to function.

One of the last sections of the TSwap [**README**](https://github.com/Cyfrin/5-t-swap-audit/blob/main/README.md) details the protocols `core invariant`.

Most protocols are going to have some type of invariant, even something as simple as an ERC20 will have some condition which must always be true.

There's a great [**repo by the Trail of Bits**](https://github.com/crytic/properties) team that catalogs invariant/property examples for a number of tokens and Ethereum operations.

In TSwap, we're fortunate enough that the developers have provided us their core invariant to read through and understand:

```
## Core Invariant

Our system works because the ratio of Token A & WETH will always stay the same. Well, for the most part. Since we add fees, our invariant technically increases.

`x * y = k`
- x = Token Balance X
- y = Token Balance Y
- k = The constant ratio between X & Y

y = Token Balance Y
x = Token Balance X
x * y = k
x * y = (x + ∆x) * (y − ∆y)
∆x = Change of token balance X
∆y = Change of token balance Y
β = (∆y / y)
α = (∆x / x)

Final invariant equation without fees:
∆x = (β/(1-β)) * x
∆y = (α/(1+α)) * y

Invariant with fees
ρ = fee (between 0 & 1, aka a percentage)
γ = (1 - p) (pronounced gamma)
∆x = (β/(1-β)) * (1/γ) * x
∆y = (αγ/1+αγ) * y


Our protocol should always follow this invariant in order to keep swapping correctly!
```

I'll stress that this is not the norm! Typically we're provided documentation and it's our job to determine, through recon, which properties of a protocol qualify as invariants.

We've touched on invariants in the past, so in the next lesson we'll be watching a refresher which walks us through fuzz tests and how they relate to invariants.
