---
title: mulWadUp Where Fuzzing Fails
---

---

## The Paradigm of Rounding Down in Solidity

When we engage in division within the realm of Solidity, or any kind of fixed-point math for that matter, something intriguing happens. By default, Solidity takes the liberty of rounding down the result for us. To illustrate: if you calculate `100 / 109`, the result teeters in the "zero point something" domain. Solidity truncates the decimals, landing us straightforwardly at zero.

This might bring you some sense of relief. Oh, the joys of not needing additional steps! But let's pivot for a second and consider we want to round up, not down. Here's where Solidity shrugs. It doesn’t offer an out-of-the-box functionality to auto-round upwards. Hence, we're venturing into slightly trickier territory.

Let’s take a simple ratio – `3 / 5`. Grip that calculator because we shouldn’t trust eyeballing it. A swift calculation informs us that we have `0.6`. Now, if we have an inclination for optimism, rounding 0.6 to the nearest integer propels us to 1. It's this elevation in rounding we are aiming for, and trust me – it's a deliberate act.

### Rounding Up - The Conundrum

To make sense of how this rounding-up operation unfurls in code, let me guide you through it in the same way I deciphered it initially. It is essential, to begin with, the fundamentals. So, our initial equation sits something like `z + x / y`. A little tip – never lose track of your variables. Here, `z` starts at zero. Thus, we are looking at `0 + x / y`. As we progress, some adjustment is made through a subtraction by one, but only if the previous result equals zero post-rounding. On the surface, it looks quite cryptic. Why this maneuver to add one under such a specific condition?

Rolling further down, we stumble upon something rather clear-cut. We multiply `x` times `y` and mod it by a standard denomination – `1e18` – to grasp the remainder of this operation. An evenly divisible result (remainder zero) implies no need for rounding up. Should this mod result dart from zero, it's our cue to increment by one.

In essence, with these computation tapes unfurling, we nod to the idea that the primary intention is to add one whenever our output isn't cleanly divisible. Easy enough. Yet, an odd piece in the equation looks back at us. It's seemingly unnecessary, and its purpose stands elusive.

### The Litmus Test - Fuzzing To The Rescue?

With a need to validate this setup, I resorted to fuzz tests. They’re the gatekeepers, designed to put this logic through its paces. A meticulously constructed `TestMulUpFuzz` swears by its validation until pushed against the wall by extensive trial runs.

The climax of countless executions hinted at something amiss. A particular set of values, should they cross paths with our calculation, would defiantly scribe an incorrect result. And that, dear reader, fueled our next chapter.

## Precision in Testing: Unraveling the Mystery Value

We dedicated a test to the suspicious duo of values. Crafting a `testMulUpUnit()` where `x` and `y` adopted these precise attributes, we anticipated the outcome. Through the magnifying lens of meticulous calculation, an unexpected figure surfaced - something far denser than our anticipation.

In disbelief of this incongruity, we conducted the test again, this time after erasing the seemingly redundant line of code. The result echoed back, this time harmonious with our expectation. The piece of the puzzle had been found, ousted for its redundancy.

### The nuance of Rounding Down

There was an itch to peek at the other side of the fence - the rounding down scenario. A swift toggle of function, and we shifted from rising to falling numerals. It mirrored perfection. As it turns out, my trusty sidekick, the ordinary calculator, was the perpetrator in truncating significant numbers. Lesson learned - know your tools.

#### A Reflection on Technology

The encounter with this bug uncovered a more profound lesson. Fuzz testing, as robust a tool as it is, can't claim infallibility. We realize that the certainty of bug-free code isn’t guaranteed, as the likelihood of missed outliers remains. A thousand runs might catch a glimpse, but sometimes it's the millionth possibility that evades; this is where formal verification embarks on its shining moment, ensuring mathematical certainty where fuzzing leaves us with educated guesses.

## The Wrap Up: When Fuzzing Falters

So, we circled back to the salient point: that tiny line, an interloper amidst our code, did not have a role to play. Its removal did not cause the structure to crumble; instead, it illuminated the accuracy within. We also absorbed the value of persistent testing and the reality that even a seemingly bulletproof methodology such as fuzz testing can let a sly bug slip through the cracks.

Our journey with Solidity rounding up teaches us the delicate balance of coding and testing. It lays down a marker not just for Solidity or blockchain development, but for all programming disciplines - test rigorously, know your tools, and always be prepared to look deeper. Solidity's arithmetic operations might be peculiar, but as you unchain its mysteries, you'll find that these quirks sit as challenges, eagerly awaiting your knack for problem-solving.

# Fuzzing and Formal Verification: A Love-Hate Story

At the end of the day, we leave with a newfound respect for both fuzzing and formal verification, each a hero in its own right, but with limitations that the other seeks to complement. Remember, in a digital world governed by logic and precision, it's these testing tenets that shepherd us towards clarity and stability, guiding us through the constant evolution of code.
