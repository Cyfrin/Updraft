---
title: Formal Verification Speedrun (Optional Video)
---

---

### Introduction to Formal Verification

Formal verification transforms code into a mathematical format to ensure its correctness—think of it as an advanced form of unit testing. Historically, this technique was reserved for experts in the web three space, but with tools becoming more accessible, it's crucial for developers to master this skill. The stakes are high; a single error in a smart contract could result in the loss of vast sums of money.

### Demonstration of Three Formal Verification Tools

#### Crafted Example Function

To demonstrate the power of formal verification, I've crafted a function that's intentionally complex and error-prone to audit manually:
- Operations are intentionally mismatched: additions are used for subtractions, divisions for additions, and so on.
- Several similarly named variables (`number`, `nimbur`, `mumbu`, `nimbor`, `nimber`) are used, each with slight differences, adding to the complexity.
- The function `hellFunc` is designed to never revert but contains numerous errors making it difficult to audit manually.

#### Testing with Fuzzing

First, we attempt to identify issues using fuzzing:
- A test is set up to make a static call to `hellFunc`, asserting it does not revert.
- Despite multiple test runs with increased iterations, fuzzing fails to detect any issues, demonstrating its limitations in this context.

### Formal Verification with Halmos, Kontrol, and Certora

#### Halmos

- We take the same test used in fuzzing and apply Halmos for formal verification.
- After running the test, Halmos successfully identifies a problem where the variable `number` set to 99 causes an issue, showcasing the effectiveness of converting the test into a mathematical problem and solving it.

#### Kontrol

- The setup for Kontrol is similar to that for Halmos, with the addition of the `KVM infinite gas cheat code` to handle complex computations.
- The process is time-consuming, requiring potential breaks, but once completed, it allows for detailed inspection of where the test fails or passes.

#### Certora

- Certora requires the use of a special language designed for formal verification, CVL.
- We establish a rule that `hellFunc` must never revert and set conditions to prevent storage randomization.
- Running the Certora command provides a user-friendly interface to review the results, where it also pinpoints `number 99` as the problematic variable.
