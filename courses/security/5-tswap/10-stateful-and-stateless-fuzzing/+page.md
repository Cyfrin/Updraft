---
title: Stateful and Stateless Fuzzing to Test Invariants
---



---

# Mastering Fuzz Testing to Secure Your Code

Ah, contracts written, tests conducted — time to ship your code, right?

Wrong.

![](https://cdn.videotap.com/tSLOq12UEqMlEKM1ZYUu-34.65.png)

The answer is a straightforward no, as your code can easily fall prey to a flash loan attack. This post will guide you through the complex but fascinating world of Fuzz Testing and how it can help you safeguard your code from unexpected exploits.

## The Notorious Flash Loan Attack

In essence, a flash loan attack could jeopardize your whole system, regardless of how well you've written or tested your code. As intriguing as it may sound, this breach results from already prepared and unthought-of scenarios that lack appropriate tests.

> "Most of the time, hacks will come from a scenario that you didn't think about or write a test for."

## Enter: Fuzz Testing

Fuzz testing (also known as fuzzing) is a robust fix to cope with these random yet deadly exploits. It involves supplying random data to your system with an aim to break it — just like relentlessly trying to pop a balloon until it finally gives in, serving as a metaphor for our system code here.

Sounds a bit odd, huh? Why would we want to break our own system?

![](https://cdn.videotap.com/EkFB4lChiHAsfS8axMsP-150.16.png)

Glad you asked. Here's where the concept of invariants or properties of a system come into play. These are the untouchable rules or the inviolable conditions in our system that should always hold true. For instance, in a function that mandates our variable outcome to always be zero, this condition would be our invariant.

## Testing: Unit Test vs. Fuzz Test

Consider our function called `doStuff` which accepts an integer as an input parameter and promises to always return zero.

This code passes a single data point, calls the function and then asserts that the variable `shouldAlwaysBeZero` is indeed zero. With such a test, our function seems to be covered for the given data input.

### - Fuzz Test:

However, what if the data input is different? What if it’s two, causing `shouldAlwaysBeZero` to become one and thereby breaking our invariant?

In this Fuzz test, we replace the manually selected data in the original unit test parameter with randomized data (commenting out the previous line of code). When you run a test here, the program will automatically randomize the data, resulting in different examples.

Running the aforementioned unit test will pass, but running the equivalent Fuzz test will actually highlight where our system fails. It'll show an output where it says "assertion violated" and provide the data and arguments that caused the fail, all by randomly throwing data at our function.

That said, it's important to understand that Fuzzers won’t cover every single possible input, hence, understanding how your Fuzzers pick the random data is a crucial skill to develop.

## Moving on to Stateful Fuzzing

A Fuzz test is usually a stateless fuzz test, meaning the state of the previous run is discarded for the next run. However, in some cases like our example, we need the outcome of the previous run to influence the next one. For this, we bring in Stateful Fuzzing.

Stateful Fuzzing is where the ending state of our previous fuzz run is the starting state of the next fuzz run. For example, instead of creating a new instance of our contract for each test run, we use the same contract and perform multiple operations on it.

We can use Foundry's invariant keyword to perform stateful fuzzing, but first, we need to import the `STD invariant` contract, let Foundry know which contract to call random functions on, and then, write our invariant.

Upon running this test, we will finally discover a sequence where our assertion fails, providing us with the information to adjust our code accordingly.

While fuzzing with Foundry, an important distinction to keep in mind is between fuzzing or stateless fuzzing and invariants or stateful fuzzing.

## Embedding Fuzz Testing into Your Routine

In a real-world setting, your invariant might not be as simple as our example. It could look something like ensuring new tokens minted are less than the inflation rate or creating a lottery game where there should only be one winner. Although fuzz testing isn't a substitute for expert manual review, it is certainly a critical tool to thwart vulnerabilities in your code.

Finally, we hope you've gained a solid knowledge of the basics of fuzz testing. Fear not, you're not alone in your journey. At [cyfrin](https://www.cyfrin.io/), we use invariants during our audits to identify vulnerabilities that are frequently difficult to catch purely with manual reviews.

Stay tuned for our next post where we'll delve into the advanced fuzzing techniques and help you become a fuzzing pro. Together, let's strive to make Web 3.0 even better! Happy coding!
