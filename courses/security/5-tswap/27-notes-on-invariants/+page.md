---
title: Notes on Invariants and other Types of Tests
---

_Follow along with the video:_



---

# Welcome to the World of Invariants and Fuzzing Tools

Hi all! We've been on quite a journey together, haven't we? We've had our brains whipped into a frenzy learning how to effectively use fuzzing tools and, yes, there were certainly times when we delved into confusing territories. However, we also learned how these powerful tools can help us discover and break invariants, quickly identifying issues in protocols. In this post, we'll build upon these foundational skills, diving deeper into an exploration of ERC20s, core invariants, and much more!

## Unraveling the Mysteries of ERC20s

The world of ERC20s can often seem daunting and puzzling, but do not fret, we're here to unravel its mysteries. We have only just scratched the surface of understanding these tokens in our sessions, but expect to see more of them popping up as we progress through our course.

## Defining Core Invariants and Breaking Them Down

Equally important to our exploration are, of course, core invariants. These are rules that remain unaffected regardless of the system state. Now, if you're still scratching your head over the term "freepy" (or CEI, as others might call it), think of it as a practice of implementing pre and post-checks to uphold certain invariants.

To illustrate this, let's look at two protocols - Uniswap and Euler. The former has an intact core invariant embedded within its codebase; the Euler protocol, unfortunately, does not. This lack of an invariant was a significant contributor to the much-talked-about Euler hack that happened recently.

## Exploring Different Testing Tools and Approaches

While our journey has already spanned areas of forge fuzzing, stateful fuzzing, and invariants, there are still a few facets we're yet to traverse. Say, for example, `Echidna`. In case you're unfamiliar with it – it's a powerful fuzzing tool that pairs excellently with Foundry Fuzzing Consensus's paid tool.

Mutation and differential testing, on the other hand, didn't make the cut for our workshop, so we will discuss them briefly here.

> Mutation testing involves modifying parts of the code to evaluate if these changes break any existing tests.

Let's turn to the git repo attached to this tutorial for reference. Under `audit_data`, you'll find a 'test' folder with a note about differential testing. Also, there is a differential folder where you can perform fuzz testing against the output of `uniswap`.

For mutation testing, imagine altering `Tswappool.sol` in various ways, such as deleting a line, swapping out math, or changing a greater-than operator to a less-than. The objective here is to ensure your tests catch these errors.

Through this practice, you can evaluate the effectiveness of your testing framework. While we didn't perform any mutation testing in our session, it's a valuable tool you should consider implementing.

## Driving the ‘Solodit' Train

We're gearing up to dive into `Solodit` in the upcoming sessions. With `Solodit`, we can learn from historical findings, uncovering a wealth of insights from the peculiarities of ERC-20s to the importance of preserving invariants.

Parsing through the archives of `Solodit`, you'll discover numerous examples of how weird ERC-20s have caused problems. Try a simple search for 'invariants' on Solodit, and you'll unearth a treasure trove of invariant findings, spelling out a wealth of knowledge and learning opportunities.

## Wrapping It Up!

To sum up, we've done a ton of work together; we've navigated unchartered territories, explored protocols, learned about testing and more. On this journey, we've embraced the weirdness of ERC20s, the intriguing world of invariants, and a handful of robust testing tools.

Stay tuned for more exciting stuff coming your way! Remember, we're learning together, we're growing together, and, most importantly - we're making the future of protocols safer, together. Until next time, happy learning!
