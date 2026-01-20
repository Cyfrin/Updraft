---
title: Modular Verification Recap
---

---


### Review of Square Root Function Verification and Methodologies Used

#### Introduction to the Task and Initial Observations
We started with the question: Is this square root function correct? The challenge revolved around analyzing a large amount of assembly code implementing the Babylonian method for computing square roots. This method itself might have been unfamiliar to many, and understanding it was crucial to progressing in our task.

#### Decision Against Direct Analysis
Instead of directly dissecting the assembly code line by line, which likely would have exposed the error in the "two a" (lffff) section, we opted for a more comprehensive testing approach. We believed this would allow us to catch more bugs effectively.

#### Implementation of Fuzz Testing
Our first strategy was fuzz testing. We leveraged existing functions known as "solmate" and "uniswap square root," which had undergone extensive testing previously. By running the test suites `test square root fuzz uni` and `test square root fuzz solmate`, both functions passed, indicating no immediate errors under standard conditions.

#### Advancing to Formal Verification
Not fully satisfied with fuzz testing, we advanced to formal verification to uncover any potential hidden edge cases. We utilized the Certora tool to set up a verification process, initially trying to replicate the fuzz test in a formal environment. However, we faced limitations with the solver, encountering the "path explosion problem" due to the complexity of the function, pushing us to reconsider our approach.

#### Modular Verification of Function Segments
Our next step involved a more segmented approach to verification. We compared equivalent segments of the MathMasters and solmate functions, focusing on the top halves of each. This comparison revealed discrepancies leading to the discovery of a bug in the MathMasters function.

#### Correcting and Re-verifying the Function
Upon correcting the identified issues and re-running the formal verification, Certora confirmed that the revised MathMasters function aligned perfectly with the solmate function, validating our corrections.

### Learning Outcomes and Tools Utilized

- **Understanding Assembly and the Babylonian Method**: Key to tackling the initial problem.
- **Fuzz Testing**: Effective for broad testing but not definitive for edge cases.
- **Formal Verification with Certora**: While challenging due to computational limits, it was crucial for definitive testing.
- **Modular Verification**: Breaking down the code into manageable parts proved essential for isolating and addressing errors.

### Documentation and Community Contributions

The importance of robust documentation was highlighted, encouraging users to contribute to open-source documentation improvements through pull requests. Additionally, the community's role in enhancing security practices through detailed write-ups and reports was emphasized.

### Encouragement and Next Steps

The journey through this verification process was not just about solving a technical problem but also about learning to use sophisticated tools in real-world applications. With the upcoming lessons on advanced formal verification in the GasBad NFT marketplace, the opportunity to deepen these skills awaits. This progression underscores the rarity and value of these capabilities in the tech industry.
