---
title: finishing the rule
---

### Understanding the Context

Before diving into the mechanics of the code, let's set the stage. Smart contracts are like unyielding robots - they follow instructions to the T. Given their immutable nature once deployed, it's critical to ensure they behave as expected under every possible scenario. Now, imagine you have two NFT marketplaces. These platforms should function identically when executing the same tasks, despite their separate implementations. To verify this, developers call the same function on both platforms and compare the results. But, as the transcripts reveal, we've hit a snag: due to a nuance in smart contract design, we can't just proceed as initially planned.

---

### The Challenge: A Documentation Discovery

Typically, one would call the same method variable across different contracts to compare their behaviour. However, we learn from the documentation that such an approach is, in fact, a programming faux pas. Every contract needs to communicate through its own set of unique method variables - think of them as individual languages spoken by each contract.

### Crafting a Solution

So, how do we navigate this hiccup? We create two distinct variables, `method f` and `method f2`, each assigned to their respective contract. Nevertheless, for our comparison to be valid, we ensure that both methods effectively perform the same action. This requires a little programming assertion:

> "Essentially, this is a safeguard ensuring that we're comparing apples with apples, and not inadvertently throwing an orange into the mix."

By incorporating this `require` statement, we make sure that while the variables may be labelled differently, they are, in effect, the same function. We're not changing the recipe; we're just using different bowls to whisk our ingredients.

---

### Synchronizing the Starting Line

Our next step is akin to lining up runners on a starting block, making certain they're at the same position before the race begins. This translates to initializing the state of `get listing` and `get proceeds` methods to be identical for both contracts.

To accomplish this, our toolset expands. We introduce new parameters such as `listing address`, `token ID`, and the `seller address`. These are the coordinates we'll use to navigate the terrain of each contract's state and ensure they start from the same set point.

Additionally, the transcript mentioned a struct called `listing`. For those unfamiliar, a struct is essentially a custom data type in Solidity, allowing developers to group related properties together. But for comparisons to work between our two contracts, they both need to understand this 'listing' struct. Cleverly, by referencing a base contract from which both NFT marketplaces inherit, we can achieve this shared understanding.

---

### Zooming In: How Does Code Know About Structs?

The question arises, how do we familiarize our codebase with the structure of `listing`? Here's the catch: contracts imported from an interface share knowledge of their structs by default. Think of it as a family trait passed down through generations. Therefore, by using this shared lineage, known as inheritance in code-speak, both marketplaces can recognize and implement `listing` without confusion.

![](https://cdn.videotap.com/618/screenshots/83tbejODMkKdGq06f5LZ-337.85.png)

What's next? We want to verify that the initial states of our 'getProceeds' and 'getListing' functions are equivalent across both platforms. To quote the source, we must make certain that "all of these view functions return the same values prior to the start." This step is essential. It ensures that any changes observed post-transaction are the result of the function call itself, and not pre-existing discrepancies.

### Putting It to the Test

Armed with our setup, we move on. After calling the same function on both marketplaces, we transform our `require` statements into `asserts`. Why? Because now we're not just setting up. We're validating that our post-transaction outcomes are identical, proving that the optimizations we've made to Gaspad NFT marketplace haven't altered the fundamental functionality.

As we run the test, we encounter an all-too-expected hiccup, the infamous 'variable e has not been declared' error. The corrective measure is straightforward: add back in the environment parameter 'e'. Always a good reminder to double-check even the minute details.

---

### Unraveling Output Mysteries

Our transcript narrator takes us through an output that, at first glance, screams 'something's wrong!' with multiple 'sanity check failed' messages. But there's gold amidst the rubble. On closer inspection, we discover that some functions pass with flying colors. Indeed, our 'getListing' and 'buyItem' functions emerge unscathed, basking in checkmarks.

And then, we uncover the crux of our sanity check issue. Not all function calls were meant to pass - they were never designed to! The 'require' clause we wrote earlier blocks any methods with differing selectors. We unpeel another layer of complexity and realize that certain checks were bound to fail because they didn't meet our predefined conditions. The culprit? Our own code, that which we dutifully inserted to ensure we weren't comparing dissimilar functions.

---

### The Endgame: Refinement

In light of these revelations, the transcript guides us toward a decision point. We could modify our specifications or opt for a config change, setting our rule checks to 'none' to silence false alarms. The path we choose requires caution. Inadvertently bypassing vital verification checks could lead to false positives - essentially, a thumbs-up to potentially flawed code.

Ultimately, the blog post underscores a visceral lesson for blockchain developers and enthusiasts alike: verification is a multifaceted choreography between rigorous testing, meticulous attention to detail, and an unyielding commitment to accuracy. Through this transcript-turned-tutorial, we've navigated a microcosm of smart contract development, a complex yet rewarding endeavour that ensures the integrity of our digital assets and their transactions.
