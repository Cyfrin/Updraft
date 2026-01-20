---
title: Where fuzzing fails - Or at least, needs more runs
---

---

### Understanding Fuzz Testing and Formal Verification

#### The Limits of Fuzz Testing
Fuzz testing, as demonstrated in the example of the math masters, can initially provide a false sense of security by indicating no bugs in the code. It was only after increasing the fuzz testing iterations that a counterexample was found. This example illustrates that even extensive fuzz testing might not always be sufficient to detect all potential issues.

#### Exploring a Complex Codebase
In our case study, we delve into a specific `Sol` file within the `src` directory. The codebase is intentionally convoluted to challenge manual auditing processes:

- **Function Mapping Confusion:** Common mathematical operations are intentionally mislabeled:
  - `add` performs subtraction.
  - `div` performs addition.
  - `mole` (presumably meant to be `mul`) performs division.
  - `sub` performs multiplication.

This approach creates a nonsensical set of functions that defy standard mathematical logic, complicating the audit process.

#### The Cursed Code Example
The example further complicates the already chaotic environment by misusing these operations. For instance, using `add` not just for subtraction but also wrapping and dividing integers, creating a highly irregular and error-prone scenario. This kind of coding practice is referred to as "cursed code," designed to be difficult to audit manually.

#### Real-World Coding Practices
Despite the exaggerated example, it reflects real challenges in software development where complex or unconventional coding can exist, sometimes as seen in other notorious codebases like "make or die."

#### Formal Verification and Its Necessity
The session then shifts focus to formal verification, an essential method to ensure code correctness, especially in complex or critical systems. This method is applied to a specific function:

- **Function Name:** `hellfunk`
- **Invariant:** This function must never revert.
- **Behavior:** The function's behavior is illogical and complex, making it a prime candidate for formal verification rather than traditional auditing.

#### Testing the Codebase
The demonstration concludes with a test setup:
- **Test Objective:** Ensure that `hellfunk` never reverts.
- **Method:** A stateless fuzz test is utilized, as the function does not interact with or alter any state.
- **Outcome:** Initial tests pass, suggesting the function upholds its invariant under the current testing conditions.

In a hypothetical scenario, even escalating the number of fuzz test runs extraordinarily high fails to identify further issues, emphasizing the limits and challenges of relying solely on fuzz testing for certain types of code verification.

By dissecting this intricate example, the lesson aims to highlight the significance of robust testing and verification techniques in software development, particularly when dealing with complex or potentially misleading codebases.