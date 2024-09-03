---
title: Coverage Report
---

_Follow along with the video_

---

To better identify which lines of code are covered, we can generate a detailed coverage report.

The following command will create a file called `coverage.txt`, containing the specific lines of code that have not been covered yet.

```bash
forge coverage --report debug > coverage.txt
```

Looking into this file, we can see all specific areas that require test coverage. For example, at line 65, we need to verify if all parameters in the constructor are set correctly. Similarly, line 73 lacks a check for the entrance fee value. Line 129 indicates that we also need to verify the `upkeepNotNeeded` revert statement.By systematically addressing these uncovered lines, we can significantly enhance our test coverage.

We should improve our test suite by writing additional tests. Here are some specific tests you might want to write yourself:

- [testCheckUpkeepReturnsFalseIfEnoughTimeHasntPassed](https://github.com/Cyfrin/foundry-smart-contract-lottery-cu/blob/083ebe5843573edfaa52fb002613b87d36d0d466/test/unit/RaffleTest.t.sol#L140)
- [testCheckUpkeepReturnsTrueWhenParametersGood](https://github.com/Cyfrin/foundry-smart-contract-lottery-cu/blob/083ebe5843573edfaa52fb002613b87d36d0d466/test/unit/RaffleTest.t.sol#L153C14-L153C58)

> 🗒️ **NOTE**:br
> You don't need to submit a pull request or make any course-related updates. This exercise is for your benefit to increase your testing skills.
