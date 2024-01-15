---
title: Invariant Break Write up and PoC
---



---

# Fuzz Testing: The Key to Proof of Code

This blog post is going to take you on a journey through the layers of code to uncover the details of proof-of-the-coding process, with an emphasis on fuzz testing.

## Fuzz Testing: What it is and why we need it?

According to the [Software Engineering Institute](https://resources.sei.cmu.edu/asset_files/WhitePaper/2016_019_001_466377.pdf) at the Carnegie Mellon University, fuzz testing (or simply fuzzing) is an automated dynamic testing approach that generates and runs many random inputs to a target program. It's efficient and does a great job at highlighting potential errors, but the use of fuzz tests as proof of code is problematic.

> "This is because the sequences that they generate can be quite complex and hard to understand - not to mention, they may not necessarily lead to the most efficient code. It can be downright baffling, especially for less experienced developers."

As a workaround, we need to take the output of the fuzz test and mold it into a more reader-friendly format. The goal here is to convert the fuzz test output into a unit test that clearly illustrates how the protocol should rectify the issue.

## Creating a Universal Proof of Code

Let's illustrate this by trying to rectify a protocol invariant error.

The fuzz test, in this case, shows that it only takes **ten swaps** to break the invariant. Hence, our next step is creating a **new unit test** to replicate these swaps.

## Decoding the Fuzz Test Output

To better understand the issue at hand, frame a `testInvariantBrokenProof` function based on the fuzz test output.

Create a sequence of swaps, replicating the fuzz test output. Start with performing only one swap to verify that the code correctly detects a deviation from the norm. Remember to keep verifying the result at each step.

If all runs smoothly, increase the number of swaps. In this example, we increment it to **nine swaps**.

## Reflect, Retest, Report!

After the completion of your revised unit test, it's time to document the results.

_"Always start your report with a detailed description of the issue at hand. Explain the root cause, provide a description, and elaborate the impact it can cause. This helps provide a comprehensive understanding of the problem."_

Once that is complete, present your Proof of Concept, diligently highlighting all steps and intricacies of your solution. By this point, you should have a detailed and well-stated report laid out.

## Wrap Up!

One of the last yet crucial parts of the report is to provide potential mitigation strategies. They could include removing the incentive or keeping it, but accounting for a change in the protocol invariant. Regardless, it is essential to offer actionable recommendations that work best not only at maintaining the protocol's functionality but also at preventing potential breaking of their core invariant.

By breaking it down into digestible pieces and providing both context and clear instruction, we can transform the cryptic output of fuzz tests into a proof of code that every team member can readily understand.
