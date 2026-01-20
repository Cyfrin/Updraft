---
title: Summary Declaration Examples
---

_Follow along with this video:_

---

### Summary Declaration Examples

A simple way to think of `summary declarations` in `Certora` is as function `override`, like we see in Solidity. Their logic `overrides` the expected behaviour of the contract's function. This is symbolized by the `=>` syntax within a spec file.

So far we've seen an example of a `view summary` in our demonstrations of the `ALWAYS` summary, but there are [**many others**](https://docs.certora.com/en/latest/docs/cvl/methods.html#summary-types) available to us!

`View summaries` themselves are broken into a few different flavours:

![summary-declaration-examples1](/formal-verification-3/17-summary-declaration-examples/summary-declaration-examples1.png)

We also have `HAVOC summaries` available to us, which allow us to control, with greater specificity, how the prover responds to particular function calls.

> ❗ **NOTE** > `HAVOC'd` verifications may result in undesirable levels of restriction with regards to the soundness and validity of your proof. Use things like `HAVOC_ALL` with restraint and purpose.

![summary-declaration-examples2](/formal-verification-3/17-summary-declaration-examples/summary-declaration-examples2.png)

Lastly, for the scope of this course, and most applicably to our GasBad solution, we have `DISPATCHER summaries`.

A `DISPATCHER summary` set to true tells the prover that a given function can only execute logic as defined by another contract within our scope. This restricts the behaviour of the function calls in the prover to something predictable and thus validatable.

![summary-declaration-examples3](/formal-verification-3/17-summary-declaration-examples/summary-declaration-examples3.png)

### Wrap Up

Wow, we've got way more flexibility within the `methods block` than we originally thought! We're going to be employing a `DISPATCHER summary` as means to solve our GasBad prover error. Don't worry if this summary type is hard to grasp as first. Let's apply it to our situation and hopefully come away with a clearer understanding of how it works.

See you in the next lesson!
