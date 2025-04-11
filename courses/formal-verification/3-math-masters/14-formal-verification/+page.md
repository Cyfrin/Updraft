---
title: Video Excerpt Formal Verification
---

---

### Introduction to Formal Verification and Symbolic Execution

Formal verification is a powerful concept in software testing, particularly useful for verifying the correctness of functions. It involves using mathematical models to prove or disprove properties of a system. Unlike fuzzers, which apply random inputs to discover bugs, formal verification employs a rigorous mathematical approach to ensure that a system behaves as intended under all possible conditions.

#### Understanding Symbolic Execution

Symbolic execution is a technique used in formal verification that involves exploring different paths in a program. Each path is represented mathematically, transforming the code into a set of mathematical expressions. This method helps in auditing by allowing you to understand how different inputs affect the program's behavior.

### Deep Dive into Testing Methodologies

#### Layer 1: Unit Testing

Unit testing forms the foundation of software testing. In the context of blockchain and smart contracts (e.g., Solidity), a unit test might involve a function that sets a variable and checks if it performs as expected. Tools like Foundry and Truffle provide frameworks for creating and running these tests, ensuring that specific functions operate correctly.

#### Layer 2: Fuzz Testing

Fuzz testing introduces random inputs to a program to test the robustness of its properties or invariants. It's considered essential for security in blockchain applications. By continuously testing how random data affects the program, developers can identify and handle edge cases that may cause the program to fail.

#### Layer 3: Static Analysis

Static analysis involves examining the code without executing it. Tools like Slither, developed by Trail of Bits, automate this process by identifying known vulnerabilities such as reentrancy issues in smart contracts. This method is quick and efficient for spotting common problems in code.

### Formal Verification and Its Techniques

#### High-Level Overview

Formal verification aims to mathematically prove the correctness of a system based on its properties. Techniques like symbolic execution and abstract interpretation are employed to represent different execution paths of the program mathematically.

#### Symbolic Execution in Practice

Symbolic execution systematically explores each path in a program's execution, converting these paths into mathematical expressions. These expressions are then analyzed using solvers to determine if a property holds under all possible conditions. For instance, a function intended never to revert can be tested across various inputs to see if there exists a scenario where it might fail, thereby disproving the invariant.

