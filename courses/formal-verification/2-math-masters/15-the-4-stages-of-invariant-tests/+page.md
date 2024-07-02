---
title: Formal Verification - The 4 stages of Invariant tests
---

---



### Cloning the Repository

To start, we'll clone the repository focused on minimizing smart contract exploits. This repository provides various methods to test, identify, and explore smart contract vulnerabilities using different remix examples and verification techniques. You'll want to clone this repository into your `opcode_FF` folder using `git clone`. Please ensure to open the cloned repository in your text editor to follow along as we delve into different testing methods.

### Setting Up the Environment

Upon entering the repository, head to the `README` file to ensure correct setup:
- Execute the `make` command to install `foundry`.


Expect a warning about the use of `self destruct`, which is a known issue and is part of the educational process.

### Exploring Tests and Verification Types

Navigate to the `test` folder and find the `invariant break` sub-folder, where we will compare fuzzing and formal verification methods, including:
- Stateless fuzzing
- Stateful fuzzing
- Handler fuzzing
- Various forms of formal verification

### Installation and Compilation

Run the `make` command as instructed to ensure all dependencies are correctly installed and compiled. 

### Understanding Fuzzing and Formal Verification

#### Stateless Fuzzing

In the `stateless fuzz` test, observe the `doMath` function within `StatelessFuzzCatches.sol`:
- The function checks if a number equals two. If so, it returns zero; otherwise, it returns one.
- The invariant specifies that the function should never return zero.
- Using the `forge test` command, a stateless fuzz test will quickly identify cases where the input equals two, demonstrating the bug.ß

#### Stateful Fuzzing

Switch to `StatefulFuzzCatches.sol`, where a more complex scenario involves the `changeValue` function to affect the outcome:
- Stateless fuzzing will not detect the issue as the function requires specific state changes to trigger the bug.
- Stateful fuzzing, by making various contract calls including `changeValue`, eventually detects the invariant breach.

#### Advanced Stateful Fuzzing with Handler

For complex contracts, like those in `handlerStatefulFuzzCatches.sol`, stateful fuzzing may still miss edge cases due to numerous potential inputs:
- Implementing a handler in fuzzing reduces the possible inputs to key functions, enhancing the effectiveness of the tests.
- This is demonstrated in the `InvariantFail.t.sol` test, which will, after more extensive testing, identify critical sequence paths that break the invariant.

### Formal Verification

For scenarios where fuzzing may not be sufficient, formal verification provides a more deterministic approach:
- Formal verification guarantees the truth of a specified property.
- It translates high-level code into lower-level representations, which are then processed by a solver to verify the property.
- Although setup can be challenging and not universally applicable, formal verification offers definitive proof of property adherence or violation.

