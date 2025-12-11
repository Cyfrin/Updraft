---
title: Your first Certora Invariant
---

---

### Writing Invariants in Certora

A rule we previously discussed can serve as an example of what might be a good invariant. Essentially, this involves ensuring a consistent condition across the smart contract, such as ensuring a function always returns a specific value. To demonstrate this, you can transform a rule into an invariant by simply using the `invariant` keyword.

**Example of an Invariant:**

```solidity
invariant check_testMulWadUp()
    tue == true;
```

This format includes:
- The `invariant` keyword.
- A function-like naming for the invariant.
- Input parameters (if any).
- A boolean expression stating the invariant condition.
- Optional prechecks or preserved blocks following the boolean expression.


#### Differences Between Rules and Invariants

While both rules and invariants aim to ensure conditions within smart contracts, they are used slightly differently:
- **Rules** are generally more complex and may involve multiple conditions or steps.
- **Invariants** are best suited for conditions that can be expressed as a single boolean statement, enhancing readability and ease of understanding.

### Conclusion

The transition from rules to invariants, and understanding when to use each, becomes clearer with practice. The distinction, while nuanced, helps in writing clearer, more effective smart contract specifications. As you continue to work with these tools, the concepts and their applications will become more intuitive.
