---
title: Certora Invariants - Harness - Rules and Types Recap
---

---

### Quick Recap of Certora Usage

#### Using Harnesses for Formal Verification
One of the key strategies we covered is the use of a "harness" to simplify the formal verification of internal functions. This involves creating a wrapper contract around the desired functionality. An example provided was our compact code base, which serves as a formal verification harness. 

#### Defining Variables and Rules
In our code bases, it's possible to:
- Define various types of variables.
- Establish rules with preconditions using `require`.
- Ensure consistency in variable types across the application.

Certora supports a range of types that are equivalent to Solidity's types but also includes unique ones. For instance, a `uint256` differs from a `mathint` primarily because `uint256` is capped by `uint256.max`, while `mathint` can vary in size, necessitating correct conversions between them.

#### Verification Using Keywords and Invariance
Certora leverages the `assert` keyword, similar to other tools like Halmos or Foundry, to check the correctness of functions. Another feature discussed is the concept of "invariance," where you can define one-liners that describe properties that should always hold true within the system. When additional conditions are necessary, `preserve` blocks can be used to enforce these properties.

#### Practical Verification
To demonstrate the effectiveness of the discussed methods, we revisited `MathMasters.sol` and made a critical update by commenting out a specific line. This change aimed to confirm the equivalence of results and the consistency of invariants. By running the prover after this adjustment, we observed:
- The `mulWadUp invariant` passing.
- The rule checks passing.
- An error-free environment check passing.

