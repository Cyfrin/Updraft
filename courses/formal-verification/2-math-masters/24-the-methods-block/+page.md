---
title: The Methods Block
---

---

## Why We Need the Methods Block

Consider this scenario: you've got a function – let’s call it `healthunk`. It's crucial this bad boy doesn't revert unexpectedly. Now, you’re scratching your head, wondering, "How on earth do I ensure that `healthunk` won't throw a fit during a verification run?" The answer lies in instructing Certora on how to handle this function's execution, symbolically speaking.

The question at hand: how do you tell Certora to do its mathematical magic and simulate running the `healthunk`? Here's the simple yet sophisticated trick: adding a methods block!

### Certora's Hidden Talent

Surprisingly, you might not always need a methods block. Yep, you heard it right. Certora is quite the intelligent tool and can figure out which functions are callable even without a methods block. But, if you're someone who likes to specify things clearly (I mean, who doesn't?), being explicit might just be your thing.

Look familiar? That’s because it's similar to an interface in Solidity, with a twist! See that nifty `env_free` keyword? It's not something you’d find in Solidity, but in Certora, it's a cue to the verifier.

## Understand the Env-Free Magic

When you tag a method as `env_free` following the `returns` clause, here's what happens:

1. You can call the method without needing to pass an "environment" as the first argument – simplifies things, doesn’t it?
2. It ensures that the method’s behavior in the smart contract being verified is independent of any environmental variables – meaning things like `msg.value` or `msg.sender` are irrelevant to its operation.

This assures the "environment neutrality" of the function, making your smart contract verification process a lot smoother.

As you can tell, the `env_free` addition elevates your typical Solidity interface to something more suited for the unpredictable world of smart contract analyses.

## Method Declarations: Nonsummary vs. Summary

In the Certora universe, you'll stumble across two flavors of function declarations: nonsummary and summary. But, you know what, let's not complicate life. For now, act as if summary declarations are just a myth. The methods block? It’s basically an interface from our good ol' Solidity world, with a dash of extra Certora-specific seasoning.

When you're typing out a methods block, you’re essentially mapping out the landscape of functions that Certora needs to consider during formal verification. And that small addition — the `env_free` keyword — is your secret ingredient to ensuring a well-behaved function.

BLOCKQUOTE: Methods blocks in Certora are like the Solidity interfaces you know and love, with a special touch that simplifies the verification process and clarifies function behavior.

## Wrapping It Up

The methods block might seem like a minor detail in the grand scheme of things, but it can drastically optimize the verification process. By being explicit with Certora, you avoid potential hiccups and gain better control over how your smart contracts are analyzed.

So, what have we learned today? The methods block – though technically optional – is a powerful ally in ensuring that your smart contracts behave just as intended during formal verification. That seemingly peculiar `env_free` keyword is not so odd after all; it keeps the verification environment-agnostic and straightforward.

The next time you're about to run a verification on your smart contracts, remember to give the methods block the attention it deserves. It might just save you from a headache or two down the road.

And there you have it, friends – a casual yet comprehensive look at the methods block in Certora. As with all things in the realm of programming, practice makes perfect. So don’t be afraid to experiment. Write that methods block, secure in the knowledge that you're wielding a tool designed to tighten the bolts and nuts of your smart contract with precision.

Until next time, happy coding and may your smart contracts be ever in your favor!
