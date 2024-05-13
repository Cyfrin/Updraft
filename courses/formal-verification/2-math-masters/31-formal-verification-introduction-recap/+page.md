---
title: Formal Verification Introduction Recap
---

---

 ### Introduction to Formal Verification

Formal verification involves transforming code into mathematical expressions and then proving certain invariants or properties about the system. This process is essential for ensuring that the code performs as expected under various conditions.

#### Tools for Formal Verification: Halmos and Certora

- **Halmos**: This tool integrates with foundry fuzz tests to facilitate symbolic execution. It allows developers to run analyses directly on their tests, though it has some limitations when dealing with more complex or creative coding scenarios.
  
- **Certora**: Certora offers a Comprehensive Verification Language (CVL) that enables extensive customization for writing formal verification specifications. Its robust language features support a wide range of verification needs.

#### Working with Certora

Certora operates without making assumptions about the underlying codebase, considering possibilities like value transactions and storage modifications. This flexibility is crucial when proving or disproving rules or invariants specified by the developer.

##### Example of a Basic Rule in Certora

We explored a simple rule to understand Certora's capabilities:
- **Rule**: Does the function `hellFunc` ever revert?
- **Process**: We started by defining preconditions, checking if the function reverted, and then asserting to verify our findings. This helped us identify an edge case where the function reverted under specific conditions.

