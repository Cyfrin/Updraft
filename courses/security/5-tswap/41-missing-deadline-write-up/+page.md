---
title: Missing Deadline Write up
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/TNljQB4bPbM?si=pu_XA5XBVXWSpvom" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Addressing Deadlines in TSWAP Pool Deposits

Today, we dive deep into an issue that has surfaced in blockchain tech involving TSWAP, a liquidity pool. The problem here is just like the proverbial time bomb that ticks regardless of one's awareness, in this case, an unused deadline set for pool transactions, which allows for the completion of transactions past the stipulated deadline. We will discuss the issue in detail, the impact it could potentially have, and offer a possible solution. So, let's roll!

## The TSWAP Pool Deposit Deadline Issue

At the center of the storm is an issue where deadlines, when set, are unused in TSWAP pool deposits. If someone sets a deadline(let's say they plan to set it to execute the next block), paradoxically they could still deposit even after that deadline, resulting in a deadline dispute.

The TSWAP pool's function for deposits is missing a functionality check for deadlines. This lapse has graspable consequences, leading to transactions being completed even after the deadline.

## Breakdown of the Issue

The heart of this problem lies within the transaction **deposit function**. This function accepts a **deadline parameter**, as according to the documentation. The purpose of this parameter is to set a deadline to complete a transaction. However, this parameter is never utilized, which leads to unfortunate outcomes.

Transactions that aim to add liquidity to the pool may be executed at unexpected times and under unpredictable market conditions, where the deposit rate may not be favorable. This issue can also make these transactions susceptible to MEV(Maximal Extractable Value) attacks.

Here, the impact could be that transactions get sent when market conditions are not ideal for deposit, even in the presence of a deadline parameter.

## Proof of Concept, and Potential Solution

We could illustrate the issue in a more demonstrable manner by writing a 'Proof of Concept' here, but we'll dive into more about 'Proof of Concepts' in later content.

```markdown
- Consider making the following adjustment to the deposit function.- We'll grab this entire function here:
- Include a revert if the deadline has passed.
```

This revision will cause the function to halt and revert if the deadline is exceeded.

As you can see in the preview, we've successfully included a revert function for an exceeded deadline, marking a critical step towards a viable resolution.

## The Medium versus High Debate

An intriguing query came about while attending to this dilemma: is the urgency of this a high or just a medium?

Discussing the impact of the issue offers some clarity. A likelihood of transactions being executed when market conditions are unfavorable does exist, even in the presence of a deadline parameter. However, remember that this is purely a deposit, not a swap.

We're still acquiring liquidity tokens that signify ownership of the pool. Even if everyone else exited the pool, we'd still have these tokens. Consequently, it could be argued that this issue qualifies as 'medium' in terms of urgency and risk, rather than 'high'. One cannot explicitly overlook the fact, but under the abovementioned circumstances, it's fair to categorize this as a medium.

In conclusion, deadlines exist for a reason and respecting them within the blockchain world, quite like in the real world, ensures smooth transactions and user trust. Ignoring them, as seen in this TSWAP pool deposit issue, can lead to unwanted complications with potentially damaging impacts. Always stick to deadlines, folks!
