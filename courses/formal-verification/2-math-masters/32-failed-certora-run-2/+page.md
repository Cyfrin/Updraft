---
title: Analyzing a failed Certora Run 2
---

---



**Initial Attempt and Discovery of Issue**

- The session begins with a verification process where it's initially suspected that the code would fail. Despite expectations, the decision is made to run the test to see the outcome and identify the missing elements.
- The focus is on the correct setup of storage and whether a specific function can be executed without causing the code to revert.

**Analysis Using Certora**

- Certora, a tool in use, is tasked with examining whether a particular function call reverts and under what circumstances. The expectation is that it should never revert.
- After running the test, it's confirmed through the system checks that while some parts pass, such as the EMV funk static check, the main concern remains with the "hellFunc" function which still reverts.

**Deep Dive into the Failure**

- The debugging continues with a detailed call trace to pinpoint the exact cause of the failure.
- It's observed that the global and storage states, despite being manipulated or ß'havoced', adhere to predefined requirements. This means that the initial setup for the global state is as expected.

**Identification of Specific Errors**

- Attention is then directed to the specific lines of code causing issues. The revert happens due to a failure in a subtraction operation within a multiply function, identified precisely at line 21 where the variables 'a' and 'b' encounter a problem.
- Further exploration reveals that the real issue stems from line 105, which is a critical point where the function fails the test case presented.

**Resolution and Conclusion**

- Ultimately, Certora successfully isolates the bug, proving with a counterexample that under certain conditions, "hellFunc" does indeed revert.
- The session concludes with a successful specification written to demonstrate this behavior, marking a productive debugging session. 

The session illustrates a thorough approach to code debugging, emphasizing the importance of detailed tracing and the utility of specific tools like Certora in isolating and understanding complex code behaviors.