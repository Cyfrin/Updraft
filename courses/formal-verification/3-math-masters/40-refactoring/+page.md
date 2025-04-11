---
title: Refactoring for CVL
---

---

### Precondition Adjustment

In our current code review, it's crucial to refine how we manage conditional checks. Instead of employing a broad conditional statement, we're transitioning to using `require`, which serves as a precondition ensuring that the math operations function correctly only if specific conditions are met. This switch from an `if` statement to `require` establishes clearer prerequisites for our test execution.

```solidity
require(x == 0 || y == 0 || y <= type(uint256).max / x);
```


### Debugging with Certora

Attempting to run the specification through Certora revealed a compilation error. The error message indicated a missing declaration for `Variable uint256`. The suggested fix involved using `sig` for the function selector. Upon further adjustments, another error surfaced concerning type compatibility. 

The term `type(uint256).max` is not something that actually exists in Certora’s context so we need to change it as follows:

```solidity
max_uint256 
```

But it won't work either :c

The reason is because the variable `max_uint256` has a type of `mathint` and not `uint256`, because it cannot underflow nor overflow.

so the solution is actually

```
assert_uint256(max_uint256 / x));
```

This will assert the division is always a `uint256`.

### Learning from Errors

The process of encountering and resolving these errors is invaluable. Each error not only points us towards the necessary corrections but also deepens our understanding of the intricacies involved in type handling between different systems like Solidity, CVL, and the tools we use for testing such as Foundry and Certora.


### Final Adjustments and Testing

Finally, we adjusted our assertions and retested using `forge test` in Foundry, confirming that our code adjustments were effective even under edge cases identified by Certora. 