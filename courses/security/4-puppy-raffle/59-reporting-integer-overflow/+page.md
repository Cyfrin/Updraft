---
title: Reporting - Integer Overflow
---

_Follow along with this video:_

## 

---

# Understanding Integer Overflow in Puppy Raffle - A Deep Dive

In the dynamic world of programming and security, an auditor's job seldom runs out of thrill. A significant part of the role involves identifying and reporting issues that have a potential to cause considerable harm in the future.

In a recent security audit, we found two major issues — **integer overflow** and **unsafe casting**. Our team dedicated a significant amount of time to understand these, and what follows is our detailed report on the audit findings.

![](https://cdn.videotap.com/tTiu8L4Bi8vsuicWvE2t-27.83.png)

## Issue 1: Overflow

Let's jump straight into the iter details of the overflow issue.

### Severity

When we did an impact analysis, we discovered that if this specific overflow issue occurred, wealthy reserves could be lost. As any venture (or anyone, for that matter), we hate losing money. Hence, we rank the impact of this issue as "high".

The likelihood of this happening might be a tad bit lower, ranging between "low" - "medium". However, given our stake in wanting the protocol to thrive and rake in lots of fees, our argument would tilt the scale towards "medium".

Should this overflow happen when the raffle is being globally used, the severity would shoot up drastically. For the sake of this report, let's assume this scenario. The inference drawn, therefore, is that this issue carries high severity.

![](https://cdn.videotap.com/A4rPHxYf6JE5lHcKRsPu-92.77.png)

### Root Cause

The root cause can be traced back to the **integer overflow in the Puppy Raffle**. Due to this overflow, the total fees get wiped out, which means we lose money. In older Solidity versions (prior to 0.8.0), integers are subject to **integer overflows**. An example of how this could play out can be demonstrated through the following code block. Here, we increment myVar by 1 after it has reached its maximum limit.

```javascript
myVar = typeof myVar(64).max;
// 'myVar' reaches limit
myVar = myVar + 1;
// 'myVar' is incremented by 1 and wraps back to 0, causing overflow
```

![](https://cdn.videotap.com/VNP7SHlx2E2aTLHNFAWN-148.43.png)

### Impact

In the context of our Puppy Raffle, the 'Select Winner' function is responsible for accumulating total fees for the fee address to collect later via the 'Withdraw Fees' function. But if 'total fees' overflows, the amount that the fee address could collect would be incorrect, causing fees to be permanently stuck in the contract.

Here's a proof-of-concept to better understand how this could happen. Let's consider a raffle scenario with four players. If we can get 89 more players to join a new raffle, we can see the overflow playing out. The simplistic theory behind the number 89 is that the number of additional participants required to trigger an overflow in this context calculatively comes out to be 89.

After the raffle concludes, the 'totalFees' should ideally add up correctly. However, due to the overflow, the 'totalFees' end up being far less than the actual value, which is the sum of the previous 'totalFees' and the newly added fee.

#### Note:

```markdown
This overflow is particularly critical as once these 'total fees' overflows, the balance in the contract escalates to a point where it surpasses the limits of uint64. In that event, the 'Withdraw Fees' function fails (as balance != totalFees) and the trapped fees will never be retrievable.
```

![](https://cdn.videotap.com/cDvBxAfeGdyCJqDHfe8B-250.47.png)

### Mitigation

We propose the following strategies:

1. Upgrade to a newer version of Solidity.
2. Use a `uint256` type instead of `uint64` for `puppyRaffle` total fees.
3. Utilize the SafeMath library of OpenZepplin for Solidity v0.7.6.
4. Remove the balance check from `puppyRaffle` withdraw fees function.

An example mitigation strategy would be:

```diff
-   totalFees = totalFees + uint64(fee); // The line to be removed
+   totalFees = totalFees.add(fee); // After mitigation using OpenZepplin's SafeMath library
```

## Issue 2: Unsafe Cast

The second issue that was uncovered in the audit was an unsafe cast.The details of this issue have been built into another report as the problem is closely related to the overflow problem described in this report.

In a nutshell, we now have a better understanding and a mitigation plan for the overflow issue in the Puppy Raffle, addressing an integral issue we had discovered in the audit. Such audits, though complex, provide a platform to demonstrate the real value an auditor brings — ensuring the robustness of systems and detecting vulnerabilities before hitches can occur.

Well, that brings us to the end of our auditing adventures for this time. This was an interesting dive into the pit of overflow and casting vulnerabilities in the Puppy Raffle code, wasn't it?

Stay tuned for more such technical adventures.

![](https://cdn.videotap.com/aUhVkP3XVtdb20yd5YkC-426.72.png)
