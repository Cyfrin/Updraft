---
title: Naive Formal Verification With Halmos
---

---

### Formal Verification: The Naive Approach

When approaching formal verification, it’s essential to start by employing a naive method before exploring more sophisticated tools. The first step typically involves basic fuzz testing to determine the robustness of the function under scrutiny.

#### Exploring the Basics with Halmos

In this scenario, the Halmos function is used to illustrate the initial verification steps. Upon pasting the function into the verification tool, we encounter several 'Unknown' results, indicating that the paths have not been fully explored. This is primarily due to a loop unrolling bound of two.

#### Understanding Loop Unrolling Bound

The core of the issue lies in the function's while loop. When the variable `y` is significantly large, the loop executes numerous iterations. The loop unrolling bound, set to a default of two, restricts the depth of exploration, which in turn hampers the tool’s ability to fully analyze the function. To mitigate this, the loop unrolling bound is increased drastically (e.g., to 1000) to enhance the thoroughness of the test.

#### Encountering the Path Explosion Problem

Upon re-running the test with an increased loop unrolling bound, it becomes evident that this approach is impractical for extensive loops. The function execution becomes exceedingly long, potentially infinite, highlighting a significant issue known as the path explosion problem. This occurs when the function contains an overwhelming number of possible execution paths or symbolic variables, making it computationally challenging to explore all paths fully.

