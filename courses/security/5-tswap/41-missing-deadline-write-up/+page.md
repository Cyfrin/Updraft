---
title: Missing Deadline Write-up
---

---

### Missing Deadline Write-up

With our informationals out of the way, we're moving on to our first `medium severity` finding write-up.

Since the lesson in which we identified this I had a change of heart about the severity here. Since this isn't a `swap` function and is `deposit` the impact of not having a deadline is less severe than if users were able to remove liquidity from the pool. As such, we're going with `medium`!

Within `TSwapPool::deposit` we identified that the `deadline` parameter wasn't being used! This is a critical oversight as it will allow people to continue to deposit even when it's expected that they'll have been disallowed, severely altering the protocol's expected functionality.

Our write up is going to start with our template as always.

```
### [S-#] TITLE (Root Cause + Impact)

**Description:**

**Impact:**

**Proof of Concept:**

**Recommended Mitigation:**
```

Following our title syntax should be fairly straightforward

```
### [M-1] `TSwapPool::deposit` is missing deadline check causing transactions to complete even after the deadline
```

The description section is an opportunity for us to be more verbose in detailing the vulnerability and it's impact.

```
**Description:** The `deposit` function accepts a deadline parameter, which according to the documentation is "The deadline for the transaction to be completed by". However, this parameter is never used. As a consequence, operations that add liquidity to the pool might be executed at unexpected times, in market conditions where the deposit rate is unfavorable.
```

In addition to the above, this makes the function susceptible to MEV attacked, which we'll learn more about later.

What's our impact?

```
**Impact:** Transactions could be sent when market conditions are unfavorable, even when adding a deadline parameter.
```

For our write-ups `proof of concept`, this would be a great opportunity to show an MEV exploit, but since we're saving that for later, we can simply state the obvious.

```
**Proof of Concept:** The `deadline` parameter is unused.

Warning (5667): Unused function parameter. Remove or comment out the variable name to silence this warning.
  --> src/TSwapPool.sol:96:9:
   |
96 |         uint64 deadline
   |         ^^^^^^^^^^^^^^^
```

Lastly, our `recommended mitigation`. Fortunately TSwap already has a modifier for us to use, it just wasn't implemented here, `revertIfDeadlinePassed`

```
**Recommended Mitigation:** Consider making the following change to the function:
```

```diff
function deposit(
        uint256 wethToDeposit,
        uint256 minimumLiquidityTokensToMint,
        uint256 maximumPoolTokensToDeposit,
        uint64 deadline
    )
        external
+       revertIfDeadlinePassed(deadline)
        revertIfZero(wethToDeposit)
        returns (uint256 liquidityTokensToMint)
    {...}

```

### Wrap Up

Great! This one wasn't too tough. Let's look at what the write-up looks like when we put it all together before moving to the next finding!

<details>
<summary> [M-1] `TSwapPool::deposit` is missing deadline check causing transactions to complete even after the deadline</summary>

### [M-1] `TSwapPool::deposit` is missing deadline check causing transactions to complete even after the deadline

**Description:** The `deposit` function accepts a deadline parameter, which according to the documentation is "The deadline for the transaction to be completed by". However, this parameter is never used. As a consequence, operations that add liquidity to the pool might be executed at unexpected times, in market conditions where the deposit rate is unfavorable.

**Impact:** Transactions could be sent when market conditions are unfavorable, even when adding a deadline parameter.

**Proof of Concept:** The `deadline` parameter is unused.

```
Warning (5667): Unused function parameter. Remove or comment out the variable name to silence this warning.
  --> src/TSwapPool.sol:96:9:
   |
96 |         uint64 deadline
   |         ^^^^^^^^^^^^^^^
```

**Recommended Mitigation:** Consider making the following change to the function:

```diff
function deposit(
        uint256 wethToDeposit,
        uint256 minimumLiquidityTokensToMint,
        uint256 maximumPoolTokensToDeposit,
        uint64 deadline
    )
        external
+       revertIfDeadlinePassed(deadline)
        revertIfZero(wethToDeposit)
        returns (uint256 liquidityTokensToMint)
    {...}

```

</details>


### Wrap Up

Great work as always, let's keep going. See you in the next lesson!
