---
title: Analyzing a failed Certora Run
---

---



### Running make Certora and Monitoring the Process

When you initiate the execution of make Certora, it requires some patience as the output generation and processing might take a little time. The UI displays the progress, and you can track the status through various indicators.

#### Understanding the Output

Once the process concludes, you'll notice specific indicators like:
- A checkmark next to envfree funk status check," signifying that no environmental variables (`env`) were used in the function, aligning with the constraints set by using the keyword `envfree`.
- A failure or violation mark next to hellFunc must never revert," indicating an issue where the conditions set by the function did not hold up as expected.

### Delving Deeper with Formal Verification

Using the tool’s formal verification capabilities, you can explore why specific checks failed. For instance, with the hellFunc must never revert" check failing, formal verification reveals that the input `99` serves as a counterexample to the expected function behavior.

### Navigating the UI for More Insights

By interacting with the UI, you can:
- Select different rules and explore associated variables or call resolutions.
- Dive into the call trace to see the sequence of operations and state changes leading up to the failure.

### Analyzing the Call Trace

The call trace provides a detailed breakdown of the execution steps:
1. **Initial Setup**: Variables like `Numbir` might be set to unpredictable values, a process known as "havocing." This is crucial when external factors could alter state variables unpredictably.
2. **Execution Flow**: After setting up, the function attempts to execute and validate assertions. If `Numbir` is havoced to `0` instead of its typical `10`, it might trigger unexpected behaviors or reverts in the code.

### Relevance of Havocing

Havocing is a crucial concept in Certora where variables may assume any value due to external influences, thus impacting the function's behavior. In this scenario, even though `Numbir` was set to `10`, the assumption that it could be altered led to a reevaluation to `0`.

