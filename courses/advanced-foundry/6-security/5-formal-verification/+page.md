---
title: Formal Verification
---

_Follow along with this video._



---

# Understanding Symbolic Execution and Formal Verification in Web3

So you're interested in enhancing your security testing toolkit with symbolic execution and formal verification? You've come to the right place. In this post, we're going to break down these complex concepts and equip you with the knowledge to begin incorporating them into your security audits.

This post has been inspired by valuable contributions from [the Trail of Bits team](https://www.trailofbits.com/) - renowned for their expertise in this domain. Thanks to them, we'll be able to delve into the nuances of symbolic execution and formal verification.

Sounds exciting? Let's jump in!

## Deepening Your Understanding of Testing Methodologies

Before we advance to the heart of the matter - symbolic execution and formal verification - let's review the testing methodologies we use in Web3 development. To understand what follows, you'll need a high-level understanding of Solidity and some familiarity with foundational testing approaches like unit testing and fuzzing testing.

### Unit Testing

Unit testing forms the first layer of our testing "onion." It's a method where you test a specific "unit" (like a function) to ensure it performs as expected. In other words, unit testing involves checking whether a function does what it should. But you already knew that, right? we have coded together a lot of tests in the previous videos.

A unit test can catch bugs in the execution of this function. When using Solidity testing frameworks like [Foundry](https://github.com/foundry-rs/foundry).

### Fuzz Testing

<img src="/auditing-intro/5-formal/formal2.png" alt="Auditing Image" style="width: 100%; height: auto;">

Fuzz testing serves as the second layer. In essence, fuzzing is the process of running your program with a range of random inputs to see if it breaks. Here, you need to define your code's invariants - the properties you expect to be true regardless of the program's state.

Let's consider a function that should never return zero. We can create a fuzz test that throws a bunch of random numbers at the function to try to make it return zero.

The fuzz test tries to break our property by passing in random numbers. If it finds something that causes the function to return zero, it means we have an edge case that needs to be addressed.

### Static Analysis

The third layer of our testing onion is Static Analysis. Unlike fuzz and unit testing, static analysis doesn't involve running the code. Instead, it involves inspecting the code as-is, checking for known vulnerabilities.

Static analysis tools can be valuable for rapidly identifying sections of your code that employ bad practices. Besides Slither, the Solidity compiler itself can serve as a static analysis tool.

Now that we have some background on essential testing methodologies, let's delve into formal verification and symbolic execution.

## Formal Verification &amp; Symbolic Execution

Our exploration starts with formal verification - the process of proving or disproving a system property using mathematical models. Various techniques exist for this, including symbolic execution and abstract interpretation. We'll be focusing on symbolic execution.

### Symbolic Execution Demystified

<img src="/auditing-intro/5-formal/formal1.png" alt="Auditing Image" style="width: 100%; height: auto;">

Symbolic execution is a technique wherein you explore the different paths your program can take and create a mathematical representation for each path.

Consider a function we want to verify using symbolic execution. First, we need to identify the invariant - what we want to prove or disprove about the function. For our needs, let's say our invariant is: this function should never revert.

## The Limitations

While symbolic execution is powerful, it's not a magic bullet. It can struggle with a 'path explosion' problem, where there are too many paths for the tool to explore in a reasonable timeframe.

Additionally, symbolic execution requires a deep understanding to use effectively and maintain. This often results in a high skill requirement. However, a sufficiently powerful fuzzer may be adequate for many requirements.

So, there we have it! From unit testing to symbolic execution, we've stepped through the necessary layers to fortify your coding practices. Continue to ask questions, explore, and keep coding safely!

## Wrapping Up

I hope you enjoyed this post and found it useful. If you're interested in learning more about security testing, check out the [Trail of Bits blog](https://blog.trailofbits.com/). They have a ton of great content on this topic.

We are to close to finishing this course. In the next video, we will be looking at the final topic of this course, a huge huge huge congratulations for making it this far!
