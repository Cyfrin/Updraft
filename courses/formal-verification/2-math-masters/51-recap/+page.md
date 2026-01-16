---
title: Recap
---

---


### Overview of MathMasters SOL Codebase Security Review

In this session, we conducted a thorough security review of the `MathMasters.sol` codebase. Our goal was to ensure the integrity and security of the codebase, beginning with the basic understanding that custom errors were introduced in Solidity version 0.8.4, not 0.8.3. This initial realization underscores the importance of understanding compiler versions and their features.

### Key Learnings and Functions Analyzed

#### 1. **Understanding Solidity Versions**
   - Highlighted the crucial role of compiler knowledge in securing codebases.

#### 2. **Analysis of MathMasters SOL Functions**
   - **mulWad**: Functionality involves multiplication followed by rounding down.
   - **mulWadUp**: Similar to mulWad but implements rounding up.
   - **Square Root**: Explored various testing approaches, including fuzzing and formal verification.


### Insights into Assembly and Memory Management

We delved deep into assembly language to understand how operations at the lower level are executed within Solidity. Key points covered included:
   - Usage of the free memory pointer and the hazards of overwriting it.
   - Understanding and interpreting error codes from contract reverts.
   - Memory and storage inspections using the Foundry debugger.

### Advanced Testing Techniques

#### 1. **Formal Verification with Certora**
   - Introduced Certora's approach to formal verification, discussing rules and invariants which are critical for establishing reliable smart contracts.

#### 2. **Modular Verification for Square Root Function**
   - Developed a test harness to compare two halves of the function to ensure correctness, which was crucial in identifying and fixing a subtle bug.


We hope you've enjoyed this course so far, we'll see you on the next occasion, keep learning and Happy Coding!
