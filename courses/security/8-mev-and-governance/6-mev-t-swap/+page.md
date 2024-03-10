---
title: MEV - T-Swap
---

_Follow along with this video:_

<!-- TODO -->


---

## Exploring the T Swap Issue

While working with T swap, there was a prominent issue that surfaced - an issue which was rooted right in the `deposit` function. The problematic player at hand was an unused `deadline` parameter.

To find the culprit, we navigated to the `SRC` and inspected the `TswapPool.sol` in T swap, where we saw the troublesome `deadline` input parameter laying idly in the `deposit` function.

```javascript
    function deposit(
        uint256 wethToDeposit,
        uint256 minimumLiquidityTokensToMint,
        uint256 maximumPoolTokensToDeposit,
        uint64 deadline
    )
```

And, you ask, what was the consequence of this unutilized parameter? Well, its existence led to a scenario where a deposited transaction could potentially be delayed without encountering a timeout, thereby enabling 'front running'. 

A node who receives this transaction could hold your deposit transaction until it benefits them to deposit you in!

## Understand the Impact: An Simple Illustration

<img src="/security-section-8/6-tswap-mev/t-swap-mev.png" style="width: 100%; height: auto;" alt="t-swap mev">

Let's understand the implications with an example. Suppose a user, 'User A', initiates a `deposit` call. However, this call was sent to a particular node connected to an MEV bot, let's call this 'User B'.

The node, upon receiving the transaction, realizes that the deposit from 'User A' would dwindle its share in the pool. Just by chance, it also knows of certain larger imminent transactions, which will result in big fees. Therefore, the node chooses to stall the transaction from 'User A' temporarily, permitting 'User B' or the MEV bot to collect the big fees – effectively front running 'User A'.

## Introducing 'Sandwich attacks'

Beyond just front running, there are worst forms of deceiving manoeuvres - one such issue that potentially arises in T swap is known as 'Sandwich attacks'. These are when someone front-runs you, and then also "back runs" you.

```
-> Their Transaction
-> Your Transaction
-> Their Transaction
```

They "sandwich" you between two of their transactions. One such example looks like such:

1. You send a TX to buy 1 ETH for 1,000 DAI
2. An MEV bot sees this:
   1. Buys up all the ETH, pumping the price to 2,000
   2. Your transaction goes through, buying 1 ETH for 2,000 DAI
   3. They then sell their ETH for it's inflated price 

Seeing your big order of 1 ETH come in, the MEV bot manipulated the market so you paid more, and they profited. 