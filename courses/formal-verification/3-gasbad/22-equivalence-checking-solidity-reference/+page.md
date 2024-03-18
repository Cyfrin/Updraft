---
title: equivalence checking solidity reference
---

## Understanding the Role of Certora in Contract Equivalence

Certora is a name that may resonate with blockchain developers who seek confidence in their smart contracts' behavior. This verification framework underpins our final rule's creation—ensuring contract state equivalence. Imagine you've crafted a beautifully functional NFT marketplace, and now you're gearing up to release a more gas-efficient version, cleverly dubbed the Gas Bad NFT Marketplace. The question that naturally arises is: how can we ensure both the original and the optimized contracts are still in sync after any operation?

### Crafting the Ultimate Verification Rule

Here's where we commence the process of writing what I'd like to describe as not just a rule, but an incredibly powerful one at that. This cornerstone of our verification process is called a parametric rule—a rule that contains an undefined method alongside unfixed variables. This rule will be the magic wand that compares the state of our two contracts post-function call, no matter what that call may be.

Now, let's peek into the construction of this parametric rule. The beauty lies in its simplicity. By introducing a method—let's call it method f—we embark on a journey towards a parametric rule. What's significant here isn't just the undefined method but also the fact that this method could include parameters in various locations, either within the function's parentheses or inside the body itself. If you're curious about the intricacies of parameter placement and randomization, rest assured, the specifics don't matter as much, except for filtering purposes—but more on that later.

## Comparison: The Heart of Our Verification Strategy

Once we've sketched out our parametric rule, the real work begins. The strategy entails calling the same function on both the NFT Marketplace and the Gas Bad equivalent. Subsequently, the state of each contract is scrutinized through getter functions to establish that they mirror each other.

This may lead to an intriguing question: why not compare storage slots directly? Well, given the use of assembly for our gas optimizations, the storage layout could vary, so it's the consistency of getter outputs that truly matters.

Consider the Gas Bad NFT Marketplace as a case study. It possesses functions like `getListing` and `getProceeds`. The mission is clear: call these functions on both contract versions and ensure the return values are identical twins. This is a testament to the elegance of our verification rule—it's about the end result and not the exact internal paths the contracts take.

### The Ceremonious Execution

With the verification stage set, we invoke the designated method on our duo of contracts and hold our breath for the comparison. This is the moment of truth, where we confirm that both contracts, after potentially traversing distinctive roads due to optimizations, arrive at the same destination—a state of unison.

## Diving Deeper: Understanding Parametric Rules

I sense a cloud of curiosity hanging over the audience, eager to understand more about parametric rules. Picture these rules as a master key that has the unique ability to unlock any door—in our case, to test any function of our smart contracts. The parameter, `method f`, stands in symbolically for any conceivable contract function we might wish to test.

One might wonder if it's all just a clever trick, but rest assured, the strength of a parametric rule in our context is matchless. It stands as a guard, ensuring that no matter what function you call on either contract, the state remains steadfast and unaltered.

## Filters: Fine-Tuning Our Verification

We've touched upon the subject of parameters and their placement. But what happens when we introduce filters into the equation? Filters emerge as a pivotal tool when specific conditions or stipulations need to be met. It's akin to having a fine sieve that only allows certain particles, or in our case, parameters, to pass through.

By applying filters to our rule, we confine the testing scope to a curated set of circumstances, thus optimizing our verification process and ensuring we focus on the scenarios that truly matter.

## The Confidence of Equivalence

In our venture to validate contract equivalence, we've delved into parametric rules and witnessed the potency of formal verification with tools like Certora. As a developer in the blockchain ecosystem, one of our paramount goals is instilling trust in our code's reliability—particularly when we venture into the territories of optimization and gas efficiency.

We stood at the crossroads of functionality and optimization, and through rigorous verification, we've ensured that neither path diverges from the essence of the contract’s intended state. The contracts may don different cloaks—one prioritizing gas economy and the other not so much—but beneath those layers, they remain fundamentally the same, and that, my fellow Solidity enthusiasts, is the tranquility that formal verification bestows upon us.

In the mutable landscape of technology, we prepare for the future by not just understanding the capabilities of our tools but also by having the acumen to interrogate their function to the deepest level. As we close this chapter, let us remember this foundational insight: equivalence is the golden standard, and verification is the luminary guide that leads us there.
