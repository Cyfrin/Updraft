---
title: Method Summaries Introduction
---

_Follow along with this video:_

---

### Method Summaries Introduction

We've learnt that the `persistent` keyword could be leveraged in our situation to ignore this `HAVOC` situation when our contract is making external calls. However, we don't necessarily want to write off these contingencies - they may cause genuine issues!

This is where `methods summaries` come into play. We've previously touched on the `methods block`, but we haven't really demonstrated how important this section can be.

![methods-summaries-introduction1](/formal-verification-3/15-method-summaries-introduction/methods-summaries-introduction1.png)

As detailed in the [**Certora Docs**](https://docs.certora.com/en/latest/docs/cvl/methods.html), declarations in the methods block come in two flavours, `non-summary declarations` (these are like the ones we made in our `NftMock.conf`) and `summary declarations`.

Simply put, `non-summary declarations` use the function logic as defined in the code base. There are situations where the function as defined in the code base isn't ideal to be included in our proof however:

- Sometimes the function is too complex
- Sometimes the function is only called by 1 or 2 contracts
- Sometimes we want to provide further assumptions to the prover
  - This allows us to narrow the scope of our verification and avoid a `path explosion`

Alternatively, we have `summary declarations` available to us. These are incredibly powerful in that they allow us to tell the prover to disregard a function as defined by the contract and instead use whatever logic we provide in our declaration.

If we were to apply this methodology to our totalSupply function, in our NftMock.conf, it would look something like this:

```js
function totalSupply() external returns uint256 => ALWAYS(1);
```

The above syntax tells `Certora`, there's a `totalSupply` function, assume it always returns `1`.

There are a number of different summary types we can employ (the above demonstrating the `ALWAYS` type), but more can be read about them in the [**Certora Docs**](https://docs.certora.com/en/latest/docs/cvl/methods.html#summary-types). Important types to keep in mind will include:

- View Summaries
- HAVOC Summaries
- Dipatcher Summaries
- Auto Summaries
- Function Summaries

### Wrap Up

With an understanding of how we can leverage summary declarations, let's apply this methodology to our GasBadNftMarketplace situation in the next lesson!
