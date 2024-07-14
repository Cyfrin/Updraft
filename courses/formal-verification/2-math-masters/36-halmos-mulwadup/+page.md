---
title: Halmos - mulwadUp
---

---


### Practice with Formal Verification: The mulWadUp Function

In this lesson, we dive into formal verification of the mulWadUp function to enhance the assurance of its correctness. We'll employ the tools and methods discussed to identify potential issues previously detected via fuzzing.

#### Review of the Existing Code and the Issue
We start with the original code base:
- **Code Overview**: Uncover the existing issues that were initially found using fuzzing techniques.
- **Purpose of Formal Verification**: Determine if formal verification can detect the same issues as fuzzing did.

#### Setup for Formal Verification
- **Using Halmos and GitHub**: Follow along in the GitHub repo, specifically in the audit data branch and testcodes t_soul file.
- **Initial Code Modifications**: Adapt the existing fuzz testing code to be compatible with Halmos by:
  - Removing redundant comments.
  - Replacing `assertEq` with `assert` for compatibility with Halmos' verification process.


#### Addressing Verification Challenges
- **Understanding Output**: Analyze the meaning behind the outputs such as "timeout" and "path explosion problem".
- **Handling Complex Code Bases**: Discuss the difficulties formal verification tools face with complex or conditional-heavy code.

#### Optimizing the Verification Process
- **Adjusting Timeouts**: Learn how to modify command line inputs to extend or remove time limits, potentially allowing for more thorough verification.
- **Practical Tips**:
  - Consider running lengthy verification processes during breaks.
  - Use tools like Spotify or YouTube Music to make waiting more enjoyable.

#### Analyzing the Results
- **Interpreting Counterexamples**: Utilize counterexamples provided by Halmos to verify assertions within the code.
- **Comparison with Fuzzing**: Contrast the certainty of results between fuzzing and formal verification, highlighting the binary nature of formal verification outcomes.
