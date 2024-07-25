---
title: Tackling the SQRT function - Fuzz it
---

---


#### Approach to the Function

The initial step is to compare our square root function with a reliable, standard square root function. This comparison, ideally, is not performed in assembly to keep things straightforward. Interestingly, the project developers also followed this logic. They've integrated a few test square root functions within their code, choosing unit cases somewhat arbitrarily to facilitate testing.

For the purposes of our discussion, we'll assume both functions are correct. The `uniswap square root` is notably easier to validate given its simplicity. We can readily verify its accuracy, thus, for now, we will trust both are implemented correctly.

#### Fuzzing the Square Root

As part of the development process, it's critical to include fuzz testing for these functions. Typically, if we were to run enough fuzz tests, we'd likely encounter errors. However, for demonstration, let's run a quick test using `forge test --mt`. Paste the command and execute it—our test is highly likely to pass under normal conditions. Even with modifications to extend or intensify the testing process, the outcome usually indicates that everything is functioning as expected.

