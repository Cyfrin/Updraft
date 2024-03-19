---
title: Your first Certora Invariant
---

---

## Delving into Certora and Invariants: A Primer

Let's cut to the chase. Why bother understanding Certora and, more specifically, the concept of invariants? The simple answer: these components are crucial for robust smart contract development. So hang tight as we delve deeper.

To paint a clearer picture, imagine Certora as your trustworthy sidekick in the realm of smart contracts—an environment where absolute certainty is more precious than gold. Within Certora lies a treasure trove of constructs; among them are rules and invariants.

"Rules" and "invariants" might sound synonymous, but in the language of Certora, they have separate identities. The Certora lingo recognizes "invariant" as a unique keyword, one that's slightly divergent in meaning from the general "invariants." You'll find a whole page dedicated to it in the documentation. Take a dive into it for an elaborate understanding.

Consider this scenario: we wrote a rule earlier, an excellent specimen that could masquerade as an invariant. Why does it matter? Well, when it comes to smart contracts, consistency is king. We yearn for our library's `moleup` function to reflect a specific outcome unfailingly.

Picture this: rewriting our rule into an invariant. Swap out "rule" for "invariant," and voilà, we're onto something. Let me guide you through this metamorphosis.

## The Rule-Invariant Transformation: One Step at a Time

The spell we've woven above? It's the kernel of our new invariant's soul. It's here where we declare our undying pledge to uphold our contract's inviolable truths. And hey, maintaining these truths could be as distilled as the age-old certainty that `true == true`.

### Crafting Invariants with Certora

When jotting down an invariant, the skeleton is straightforward: an `invariant` keyword, followed by a property's name and definition, and crowned with a boolean expression that epitomizes the property.

Should you ever stumble upon a property so elegantly simplistic, encapsulating it within a single boolean expression is trivial; Certora's true might shines through.

### A Real-World Example: Ensuring Total Supply Never Hits Zero

In this snippet, we're showcasing Certora's prowess. You're witnessing how a simple yet quintessential aspect of a token—its total supply never blinking out of existence—isn't just stated but enshrined.

Crafting invariants hits the mark when it comes to clarity and precision. If you're able to distill a property into a crystalline expression like the example above, you're granting yourself the power to have Certora Prover mathematically validate—or refute—the strength of that property. That's a game-changer, right?

### What's the Gist: Rules vs. Invariants

You may find yourself pondering the rift between rules and invariants. Is it a chasm or a mere crack? Here's the deal — all invariants can don the mask of a rule, but the reverse isn't a universal truth. If you can squeeze a rule into a single expression, it's primed for an invariant debut, which translates to a smoother read.

In truth, both constructs serve the same fundamental purpose. If the distinction rattles your brain, bear this mantra: Invariants are simply another flavor of writing rules. A property neatly encapsulated by a singular assertion makes for a prime invariant candidate in the Certora realm.

### Putting Our Invariant to the Test

Let's get our hands dirty and watch our freshly-minted invariant in action. I'll trigger a Certora run and we'll bask in the glow of its workings:

```shell
$ certora run myContract.spec
```

As the gears turn and the output unfurls, keep in mind: multi-tasking is Certora's forte. It juggles numerous rules and invariants in one go, streamlining the verification process.

Upon reviewing the results, we glance at our invariant passing with flying colors—right as anticipated, since it's the embodiment of simplicity. But let's remember, Certora, equipped with the savvy `rule sanity` feature, has the wits to call us out on rules that may seem trite or redundant.

### Reflecting on the Invariant Journey

In the ecosystem of rules and invariants, discerning when to use which is more of an art than a science. The distinction can sometimes blur, but with practice, you'll gain a sixth sense for it.

In our adventure through Certora's invariants, we've unraveled the intricacies that set apart rules from invariants, explored how to define bulletproof smart contract properties, and even admired the elegant simplicity that Certora brings to the table.

May this knowledge empower you to weave stronger, more resilient smart contracts. The path ahead is complex, yet bursting with promise—as is the way of blockchain technology. Keep experimenting, iterating, and, above all, learning. The world waits for no one, and it's up to us to stay at the forefront of innovation.
