---
title: The Methods Block
---

---


#### Implementing the `hellFunc` in Certora

We're now moving beyond the basics to writing a rule in Certora that makes sense. The first variant to consider is ensuring that the `hellFunc` must never revert. To address this, we must determine how to run our `hellFunc` within Certora. Specifically, how do we communicate to Certora to symbolically execute the `hellFunc` amidst its mathematical processes?

#### Adding a Methods Block

One approach is to add a methods block. This is not strictly necessary since Certora is capable of discerning available functions on its own. However, to clarify our intentions, we'll explicitly define a methods block. This block will look similar to a Solidity interface but includes the unique `envfree` keyword.

```js
function hellFunc(uint128) external returns uint256 envfree;
```

### Understanding the `envfree` Keyword

According to Certora's documentation, the methods block can contain two types of method or function declarations: nonsumary and summary. For our purposes, we will ignore summary declarations and focus on nonsumary declarations, which mirror interface definitions in Solidity closely.

The key distinction in our declaration is the `envfree` tag following the returns clause. This tag has two significant implications:

1. **Simplifying Calls**: When using the Certora verification language, there's no need to explicitly pass an environmental value as the first argument during method calls.
2. **Independence from Environment Variables**: The prover ensures that the method’s implementation in the contract being verified does not depend on any environmental variables. This means aspects like message value, message sender, and the broader environment where the function is called are irrelevant.

