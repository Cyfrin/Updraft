---
title: Analyzing a failed Certora Run
---

---

**Understanding Certora: A Casual Walkthrough**

Certora is a powerful tool used for formal verification of smart contracts, which basically means it's like having a super-meticulous friend that double-checks your code to ensure everything is shipshape before it sets sail in the vast ocean of the blockchain. Now, imagine you've just launched a Certora run and, much like waiting for your coffee to brew, you anticipate the results.

In the realm of coding, especially with blockchain technology, we're often at the mercy of the whimsical beast known as uncertainty. Certora stands as our shield — a verification tool ready to ensure that our contract functions are rock-solid and behave exactly as intended. But as we all know, the twist in the tale happens when Certora delivers some unexpected news.

**The Tease of The "env Free Funk Status Check"**

One of those checks is the invitingly named "env free funk status check." It sounds like an escapee from a funky 70's disco track, but trust me, it’s sober as a judge. This check is Certora’s way of confirming that you've adhered to your own rules — specifically, that your function steers clear of the notorious "env" variable.

Then we stumble upon the "hellfunk must never revert" status — a straightforward, no-nonsense rule which tells us that hellfunk shouldn't turn traitorous and rebound in the face of adversity (i.e., it should never "revert").

**The Plot Thickens: Hamos and the Number 99**

Through the lens of Hamos, we've deduced that the number 99 plays the villain — it's the counterexample, the test case that unabashedly breaks the rules. This unruly guest shows up and... boom, our function flips the table and reverts courtesy of an error on line 76.

**Dissecting the Call Trace: A Voyage into the Code's Depths**

So, how do we connect the dots? Let’s embark on an archaeological dig through the call trace. It's this timeline of events within our code run where we can track every footstep our contract took, right up to the point where it stumbled.

When Certora cannot determine if a variable is a fixed monument or a fickle chameleon, it introduces havoc. Once havoc is unleashed upon a variable, think of it as Certora throwing its hands in the air saying, "This could be literally anything, so let's start at ground zero."

This moment of havoc is pivotal; in our case, our variable "Nimbur," which should be a strong, confident 10, is suddenly a meek zero. This act of transformation brings us to line 76, where the code expects "Nimbur" to uphold its customary value but encounters zero instead.

**The Importance of Reading Call Traces**

Understanding the call trace is akin to reading a great detective novel — you need to sift through the details to reach the truth. It shows you not just what went wrong but the breadcrumbs leading up to it.

```plaintext
assert last_reverted = false,Nimbur was havoc to be zero.
```

Here, our "line 76" scenario operates under the assumption that "Nimbur" could change, causing our function to revert incorrectly when faced with the number 99.

**The Misleading Right Answer — The Case of the Counterexample**

In a plot twist worthy of a crime procedural drama, we find that while the counterexample was correct, it was revealed through a scenario that doesn't align with our true code behavior. It's the right answer handed to us for the wrong reasons, like winning a game of Clue because everyone else misread the cards.

**Concluding Thoughts: What Can We Learn From a Failed Certora Run?**

Evaluating a failed Certora run isn't just a technical exercise; it's a strategic learning experience. By dissecting every element, from havoced variables to line-by-line scrutiny in the call trace, we gain a profound appreciation for the intricacies of smart contract behavior and the safeguards that Certora puts in place.

It's an invitation to refine our understanding, to revisit assumptions, and to enshrine even more robust practices in our coding routine. Whether you're a code-slinging veteran or a bug-squashing newbie, there's richness in the process that extends far beyond the immediate rectification of a single function.

So, the next time you encounter a wrinkle in your Certora runs, take a moment to appreciate the complex tapestry you're weaving. With every analysis, you're not just building a codebase — you're crafting a legacy of solidity that can stand the test of time (and the scrutiny of formal verification).

And as we continue to navigate the convoluted corridors of smart contracts, let this be a beacon that guides us through the fog. We know now that vigilance is our strongest ally, and Certora, with all its intricate checks and remarkably detailed reports, remains an essential companion on our coding adventures.

Remember, behind each oddball number like 99 or a havoced variable lies a lesson that’s enriching our journey, one unexpected twist at a time. So, let's keep analyzing, keep verifying, and most importantly, keep coding with curiosity as our compass and clarity as our destination.
