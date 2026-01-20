---
title: Invariant Preserved Blocks
---

---

### Rewriting Tests as Invariants

In our discussion, we explore how to transform a test into an invariant, highlighting the practical differences and the strategic considerations between writing a rule and an invariant. We start by renaming our function to `MulWadUpInvariant` to clarify that it's an invariant, maintaining the parameters `uint256 x` and `uint256 y`, consistent with our original setup.

```solidity
invariant mulWadUpInvariant(uint256 x, uint256 y)
```

#### Defining the Invariant
Our invariant is straightforward:

```solidity
mulWadUP(x,y) == assert_uint256(x + y == 0 ? 0 : (x * y - 1) / WAD() + 1);
```



#### Handling Preconditions with Preserved Blocks
It's crucial to recognize that the validity of our invariant depends on certain preconditions. In Certora, we manage this through what is known as a preserved block. Here’s how we set it up:


```solidity
{
    preserved {
        require(x == 0 || y == 0 || y <= type(uint256).max / x);
    }
}
```
Inside the preserved block, we specify the preconditions that need to be true for the invariant to hold reliably. This approach helps in clearly delineating the dependencies of our invariant.

#### Running and Testing the Invariant
Once the invariant and its preconditions are defined, we proceed to test it alongside our original rule. Both are executed in the context of proving their validity:

We anticipate that both might fail under certain conditions, providing valuable counterexamples that reveal the limitations or errors in our assumptions or logic.

### Analyzing Results
Upon testing, we observe failures in both the invariant and the rule, with specific counterexamples pinpointed in the call trace. These examples are crucial for understanding why the failures occur, offering insights into potential issues within the variables or logic used.
 
