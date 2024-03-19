---
title: Invariant Preserved Blocks
---

---

## What Are Invariants Anyway?

Imagine you're cultivating a beautifully manicured coding garden. Within it, no matter the season, certain laws of nature must always hold true. These unbreakable rules are akin to invariants in our programming environment. In the realm of smart contracts, for example, an invariant is a condition that _must remain consistent_ throughout the lifetime of a contract.

To put it in a relatable context, let's consider a sample piece of code involving mathematical operations. We're dealing with an intriguing function that multiplies two unsigned integer values – let’s call it `modUp`.

Now, we're faced with a challenge: ensuring that this bit of logic stands resilient against all odds, thereby creating an invariant to guarantee this expectation.

## Crafting an Invariant in Solidity

Bear with me as we dive into a bit of code modification. We’ll transition our regular functional test into a hardened, invariant check. Below is how we would turn our `modUp` function test into an invariant:

Notice anything different? Aside from renaming our function to `modUpInvariant`, we boil this potentially complex situation down to a one-liner inside our function body. After all, invariants should ideally be as precise and direct as possible.

However, in programming and life, context is crucial. This line of code presumes that certain preconditions are met. Without them, it’s like expecting your houseplants to thrive without sunlight and water!

## Preserved Blocks: Embedding Context

In the world of Sartora, a specialized prover for smart contracts, we encounter a notion called the `preserved block`. Here, we can state something along the lines of, "Hey, this invariant should always hold true, provided these specific conditions are met."

Let's get hands-on and add a `preserved` clause to our `modUpInvariant`:

```js
function modUpInvariant(uint256 x, uint256 y) private pure {
    assert(uint256(modUp(x, y)) == x * y);
    preserved {
        require(x > 0 && y > 0, "x and y must be positive");
        }
    }
```

By adding this nifty block, we've set preconditions that `x` and `y` should both be positive numbers. It's like telling a story – our invariant has a backstory of these preconditions that need to remain constant, much like a superhero whose strength is contingent on their mystical amulet.

Moving forward, when we run our `modUp` computations, these blocks are not just random snippets of code but guardians that ensure the operation stays within the safe bounds of our intentions.

## Running the Gauntlet: Simulating Failure and Triumph

Upon initiating our test with the prover, tense moments pass by as we anticipate whether our code, both the rule and the invariant, will be proven robust. And there it is – both tests fail, but with our proverbial safety net, the counterexamples provided make it clear why they did.

Importing these counterexamples back into our testing suite would confirm their validity, driving home the importance of comprehensively considering all scenarios where our code might face a duel of wits with the unexpected.

## Why Choose One Over the Other?

With all this talk about invariants and rules, you might wonder, "Why bother with one approach over the other?" The essence lies in simplicity. Invariants, in their compact, assertive glory, serve as sweeping declarations – such as confirming that the total supply of an ERC-20 token should never exceed the total number of shares.

Rules, on the other hand, allow for more nuanced discussions – they whisper the detailed conditions, the when-s and the how-s, offering a narrative that underpins the raw assertiveness of an invariant.

## Conclusion: The Synergy of Structure and Flexibility

Coding, much like craftsmanship, requires precision, foresight, and an appreciation for the structures that support our creations. Invariants and preserved blocks are akin to the load-bearing walls and solid foundations of programming. By understanding and properly implementing these concepts, we fortify our digital edifices against the tremors of uncertainty.

When to deploy a rule, and when to solidify an invariant? That's a strategic choice, a reflection of your broader vision. Every smart contract you breathe life into reverberates the philosophy of balance: between flexibility and ironclad consistency. And as programmers, it's up to us to sculpt this equilibrium with deft hands and an astute mind.

Remember, each line of code has a ripple effect with the potential to cascade through the system, for better or worse. So, as you go forth and script your next masterpiece, consider the humble invariant. Let it guide you like a beacon of unwavering truth, even amidst the stormy seas of programming.

After all, as they say, "A well-written invariant is worth a thousand lines of debug logs."

Happy coding, fellow architects of the virtual landscape! May your invariants always hold strong, and your code remain elegantly preserved.
