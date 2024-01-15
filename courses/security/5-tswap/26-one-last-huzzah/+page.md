---
title: One Last Huzzah
---



---

# Unveiling the Power of a Stellar Stateful Fuzzing Test Suite

Ever experienced one of those situations when you felt like capitulating because nothing seems to work? Only to find that, against your better judgment, you gave one last attempt and everything fell into place? That's exactly the kind of journey we are about to hop on. What started as a simple methodical troubleshooting transmogrified into an exploration of the ever-useful, indispensable tool – the stateful fuzzing test suite.

## EQ. X vs. Y Test Runs

Sometimes, when we're stuck with a challenging bug and can't seem to point out why it exists, we need to remain resolute and alter our approach. This was exactly the case when I was working with a piece of code and an assertion failed.

Changing our test from X to Y and modifying the stats gave a rather perplexing output - the core invariant seemed to be breaking.

## Spelunking Through the Log Files

Like seasoned detectives, we read through the log files for some answers. This particular log file was teeming with `deposits` and `swaps`, a lot of balance adjustments, and, in the last section, things seemed to head south. Something was going awry in the last swap which led to an unexpected disparity between the left and right results.

> "...usually there's a lot of alpha in this last section, like what happened in this last swap, which caused this to get way out of whack because everything was fine right beforehand..."

While digging further into the function call in the `handler`, my attention was drawn to multiple `transfers` being emitted - one more than was expected.

## Unearthing the Rogue Code

Upon close inspection of these transfers, I discovered some discrepancies:

1. There was an unusual `transfer` from the `TSWAP pool` to the `swapper`
2. Subsequently, another weird `transfer `was being emitted from the `swapper` to the `TSWAP pool`
3. Then again, there was another `transfer` from the `TSWAP pool` to the `swapper`

Needless to say, this wasn't what I was expecting. Recognizing that my stateful fuzzing tests were pointing towards a peculiarity, I decided to dive deep into the code base.

## AHA - The Bug!

As I ventured into the low-level swap function, I unraveled the mystery - I discovered we'd included an extra incentive in the swap function where for every 10 swaps, an extra token is awarded to the user.

This was the heart of the issue. It was resulting in the protocol breaking because:

- There was an unexpected increase in the swapper's balance
- For any fee transfer token, the internal function would transfer excessive tokens, thus breaking the protocol invariance

It dawned upon me that the violation of the protocol invariant, in this case, the `XxY=K formula` was generating this bug.

## Significance of Stateful Fuzzing tool

Despite all these findings, it was the fruit of a good deal of work. Finding the code-breaking bug involved meticulous editing and testing using the stateful fuzzing tool. However, it was unequivocally worth it.

Manual review, despite its efficiency, can be laborious to discover all bugs. Therefore, it becomes essential to leverage automation as a means to make our jobs simpler. That's where the role of stateful fuzzing comes to the forefront. It allows us to comprehend protocol invariants on a superior level while giving us an inexpensive way of finding bugs and breaking protocols.

It's pivotal to understand how this powerful tool works, even if you're unable to grasp the complexities of the TSWEAP handler.

Ultimately, the ability to discover potential bugs by writing an effective test suite is an indispensable instrument in your toolkit. Once the protocol's invariance is identified and it is discovered that no tests are being run for it, it is a clear indicator that a bug lurks somewhere around. For instance, for a codebase comprising 10,000 lines of code, conducting an audit could consume abundant resources, but a stateful fuzzing test suite can accomplish the task in a day or two.

## Learning and Adaptation

Through this experience, I understood that weird ERC-20s, rebase, and fee-transfer tokens can disrupt our protocols. These conditions, along with our naive incentive for swappers, can violate protocol invariance, causing a breakthrough for bugs. It underlines the importance of knowing the specifics of the tokens we are working with - their advantages, drawbacks, and the protocol invariants they obey.

Ultimately, establishing a protocol invariance pattern in the writing of functions or applying checks using the "checks, effects, interactions" paradigm can be the game-changer in reinforcing your code against bugs.

In all, spending a bit of time setting up the stateful fuzzing test suite can help you detect bugs early, maintain your invariances and ensure the code you wrote stays robust, performant, and error-free.
