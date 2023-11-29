---
title: Stateless Fuzzing
---

_Follow along with the video:_

<iframe width="560" height="315" src="https://www.youtube.com/embed/X_YD4P0HL1U?si=_HfZFJLx2ts3EtXU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

Today, we'll be navigating through the SC exploits minimize codebase, focussing specifically on the `Invariant Break`. We aim to understand, practice, and discuss the power of stateless fuzzing, an essential tool in the world of software testing. Rest assured, we will also provide a minimized example to clarify how it works.

## What is Stateless Fuzzing?

Stateless fuzzing, often referred to simply as fuzzing, is a technique where random data is supplied to a function to break some invariant or property. Remembering our discussion from the video of continuously attempting to pop a balloon serves as an apt analogy. It's all about continuously providing different inputs to a function until it breaks. If you have a function with an invariant that it should never return zero, then fuzz testing might just be the answer.

## Breaking the Invariant: Writing the Test Case

With our codebase ready, and ourselves aware of the functionality we are testing. We need to write the test case to break it. Let's create a new folder named `Invariant Break` to prepare for our first stateless fuzz test. Naming the test `statelessfuzzcatchestest.sol`, we focus on catching the bug automatically using fuzz testing.

This test is more than just a unit test which checks the invariant once. With fuzzing, we apply various random numbers to the function and see if it breaks the invariant or not. The beauty of this strategy is that we can detect issues that can be missed out on during manual checks or basic unit tests.

![](https://cdn.videotap.com/3SkpmLCCBFnsZH2yqkEW-412.31.png)

## Setting the Fuzz Options

Let's take a moment to understand the fuzz options. The number of runs determines the number of different balloons (inputs) we use in a stateless fuzz option. So we need to carefully adjust this value to ensure we're checking for as many edge cases as possible. Another crucial property is the seed, which, when kept the same, will offer the same inputs instead of random ones. This can be extremely helpful in debugging.

![](https://cdn.videotap.com/BjOp2RCvRkPDt2VcD5fL-453.54.png)

With the fuzz options set, our test is ready to run. After a few runs, the test should fail, meaning our fuzz test has successfully caught the bug—great job on creating your first fuzz test. But what if it doesn't fail? Well, you may need to increase the number of runs or change the seed. With randomness at play, there's never a 100% guarantee that you'll catch the bug in a particular run. This makes the fuzzing process a bit of hit or miss, but the advantages outweigh this con, as it helps to ensure the robustness of your functions.

Seeding different values and number of fuzzing runs directly impact how thoroughly the test cases are checked. Adjust these values according to your specific needs, cover as many alleyways as possible - fuzz it till you dust it off! But remember, it's crucial to analyze the balance between the number of runs, seed selection and performance of your testing.

## Wrapping Up Stateless Fuzzing

In conclusion, stateless fuzzing is a powerful tool for catching bugs where you expect a specific invariant. However, it's important to remember its limitations, such as being stateless and so not being able to pick up on issues caused by interactions between different functions. It's also a tool reliant on randomness, which means you can never be sure you've explored every possible scenario. Yet it remains a swift and highly efficient method for bug hunting.

In the upcoming sections, we'll move forward from stateless fuzzing to touch upon more complex and exciting testing methodologies. Until next time, happy fuzzing!

> “It’s not at all important to get it right the first time. It’s vitally important to get it right the last time.” - Andrew Hunt and David Thomas
