---
title: Reporting - Smart Contract Wallet Reverts Winning
---

_Follow along with this video:_

## <iframe width="560" height="315" src="https://youtu.be/YdrTAjzHSjM" title="YouTube Player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

## Understanding The Issue

When it comes to the risky and uncertain world of audits, people can often revert the transaction until they achieve a win. Yes, you got it right. We discussed this topic lightly in our previous talks about randomness; they can be seen as two contrasting findings merged into one.

An intriguing part to note here is that the winner might not get the money if their fallback is messed up. You're thinking the right way if you consider it as a finding; because it most definitely is one!

## The Impact: Medium

Let's delve into the impact of this scenario. Suppose someone wins the lottery but has no fallback function. Or worse, if the winner is a smart contract and they forget to add a fallback or receive function. In such cases, that transaction would simply revert, which is obviously not the end of the world.

However, another person could simply enter and win the lottery. Although this might seem like a simple solution, it could potentially waste a lot of gas. What if most people who entered the lottery were all using smart contract wallets? The process of selecting a winner could possibly take an excruciatingly long amount of time.

#### Breaking Down the Impacts

The situation becomes dire when we consider the instances when manipulations for the winner selection come into play. This issue could seriously hamper the functionality of the protocol leading to a significantly hard start to a new lottery game. The reversion due to all the smart contract wallets makes the situation worse.

This slightly expensive process isn't easy to deal with, mainly because it needs a lot of users who aren't aware of this problem. So, we can safely classify this impact magnitude as medium.

In essence:

> The function, intended to reset the lottery, could revert multiple times thereby making the reset of a lottery a challenging task. This situation could lead to a severe disruption in functionality. Moreover, winners would end up not receiving their payout, and their money could be taken by someone else.

## Detailed Write-up

For those looking for a quick way to understand all that's happening, this write-up is here to help. We have classified this finding as a 'medium-impact' issue.

The major problem occurs when smart contract wallet raffle winners without a receive or fallback function block the start of a new contest. This problem arises if the winner, who happens to be a smart contract wallet, rejects payment. This situation can lead to the lottery not restarting.

However, users can easily call the winner function again, and non-wallet entrants could still enter. But it could increase the cost significantly due to the duplicate check, and consequently, resetting the lottery becomes a challenging task.

## Proposed Mitigation Techniques

Though this situation sounds bleak, there are ways in which this issue can be mitigated. For instance, the protocol could avoid smart contract wallet entrants. That said, this isn't recommended because, for instance, we would still want multisigs to be compatible with the protocol.

A plausible recommendation here would be to create a map of addresses to payout amounts, enabling winners to pullout the funds themselves with a new 'claim prize' function. Essentially, we are shifting the responsibility of claiming the prize to the winner, a method referred as 'pull over push'.

This method is particularly efficient and considered as a best practice. By pulling their money out, users avoid any issues that arise from money being pushed to them, such as reversion.

This audit discovery has been an intriguing journey, one that has strengthened our understanding of blockchain verification and smart contracts. Stay tuned for more!
