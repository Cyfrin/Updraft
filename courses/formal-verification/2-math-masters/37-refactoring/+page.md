---
title: Refactoring for CVL
---

---

## The Crux of Conditional Chaos

So, what's on our troubleshooting radar today? Apparently, a series of aspects that require our attention. You know the drill – those pieces of code that often make us question our choices of "ifs," "elses," and "buts." It turns out that we should steer away from the cumbersome conditional that has overstayed its welcome and, instead, welcome the robust and reliable `require`.

This change isn't just for aesthetics; it's fundamental. Our math, our logic, our code's very soul hinges on these preconditions being met. So, rather than tiptoeing around an `if` statement, we're going full throttle with a `require`. The implication? Every time we run our test, this requirement needs to be at the frontline, ensuring that everything checks out before proceeding.

## Confronting the Compilation Conundrum

Ready for a test drive? I attempted to run our spec, and as anticipated, hiccups ensued. Upon whipping up the `Certora` command to compile, the console was quick to return a glaring error:

A quick dive into the code confirms our miss – the `UN 256` type was assumed, yet it doesn’t exist in `Certora`. Not an issue, we pivot! Instead of using a non-existent type, we adjust our sails and use `max_uint256`, which thankfully, `Certora` recognizes. Adjusting types – it's all in a day's work.

## The Typing Tune-Up

Here lies the distinction – `max_uint256` represents a `math int` type, not `uint256` as we hoped. A fine detail, perhaps, but in coding, the devil's in the details. Now, why is this important? Well, `math ints` have a special power – they're immune to the frustrating phenomena of overflow or underflow. They're an infinite canvas, while `uint256s` are bound by their numerical limits.

So, we pull out our trusty assert statement, ensuring that when `max_uint256` divides by another integer `X`, it responds with a type we expect – a clean `uint256`.

## The Name Game Glitch

But the hurdles aren't over. No, that would be too easy. Running the refactored code prompts a new message, a contract variable named `math masters` isn't located because the real name is `moteup`. Silly mistake, easily remedied, and a reminder to always double-check your references.

```plaintext
Error: Contract variable `math masters` not found.
```

This is where the magic of error messages comes into play; they guide us, much like a compass, showing us the errors of our ways. A quick fix, and we’re back on track.

## Asserting Assumptions and Accepting the Outcome

Facing these setbacks head-on, we assert our expectations, neatly wrapping them in a `UN 256` assertion, guaranteeing that we're dealing with the right type. We hold our breath, run the code one more time, and...

![](https://cdn.videotap.com/618/screenshots/wa7pQ1F5ZVUpzApaweUM-223.62.png)

Success! It connects, it compiles, it computes! The satisfaction of seeing the Certora Prover chug away, executing our formal verification spec, is akin to a maestro conducting a symphony.

## Verification Validation and the Call to Debug

In a delightful twist, our efforts reap dividends as the output sings to us – a conclusive call trace and a noble `assert` highlighting where assumptions met reality and fell short. Bingo! We've captured a false result, an edge case that slipped through the cracks.

Here's where the beauty of Certora shines. It serves us the problematic values on a silver platter, allowing us to mimic the conditions in our test environment using `MathmastersT.sol`.

Running the tests using `forge`, even with hexadecimal numbers (kudos to Foundry for its intellect), we're greeted with the same failing result, confirming Certora's adept identification of that elusive edge case.

![](https://cdn.videotap.com/618/screenshots/jCGTC6Zcbq6JJ7ajwai3-260.21.png)

This dance with debugging may seem tediously technical, but there's an undercurrent of excitement, a rush of adrenaline – it's the heartbeat of software development.

## The Teachable Tech Moment

Friends, our journey through this snippet of code is an homage to the pursuit of perfecting our craft. Errors are more than mere nuisances – they're puzzles, challenges, and, dare I say, treasures. They lead us to insights and understandings that elevate our code, and our prowess, to unprecedented heights.

So, next time you're faced with a conditional too stubborn, a type too baffling, or a variable's name playing hide-and-seek, remember this: it's not just about fixing errors. It's about embracing them, understanding them, and transforming them into bulletproof code that stands the test of time, user demands, and our own relentless quest for excellence.

Thank you for accompanying me on this refactoring revelation. May your code be clean, your bugs be few, and your spirits remain unbreakably high.

Remember, happy coding!
