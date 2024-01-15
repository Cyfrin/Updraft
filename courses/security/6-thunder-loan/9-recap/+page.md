---
title: Recap
---



---

# Decoding Flash Loans: A Comprehensive Walkthrough

Welcome back! Today we're going to steer the wheel down the crypto lane and dive into a fascinating concept - Flash Loans.

![](https://cdn.videotap.com/e2sbhlbfl9ZreXlI3mzt-12.08.png)

## How Do Flash Loans Work?

A quick rundown of how this all functions is necessary. Picture this: a whale (a large player in the crypto market) deposits $5,000 into the flash loan protocol.

![](https://cdn.videotap.com/ww7stcBKpXeTs9ZF51U1-30.19.png)

### The User Comes In

After this, a user comes in and pulls out a $5,000 loan from the flash loan. This person now needs to repay the $5,000 plus any fees associated; if not, the transaction will revert. The user uses this borrowed amount to purchase $1,000 worth of Ethereum (ETH).

### Trading the ETH

Then comes the interesting part. They sell the $1,000 worth of ETH for $6,000, and then return the originally borrowed amount—keeping $1,000 for themselves, which results in net earnings of $995 after paying a $5 fee.

### Where Does The Money Go?

So, in the course of these transactions, the flash loan protocol ends up with the initial $5,000 plus the $5 fee.

### Withdrawal by the Whale

Lastly, whenever the whale chooses, they can withdraw their initial deposit by trading back in the flash loan token, which signifies their 100% ownership of the pool. So, for their $5,000 deposit, they receive $5,005: a mix of the original deposit amount and the accumulated fees.

## Learning About Arbitrage

Alright, so that was quite a bit to absorb, but it paints a rough picture of how flash loans function. Now, why would someone want to use flash loans? A primary reason is arbitrage.

Arbitrage is a scenario where you exploit a price discrepancy on two different exchanges. For instance, if Exchange A lists ETH at $5 and Exchange B lists ETH at $6, you can buy from A and sell at B to make a profit. This is arbitrage simplified.

## Flash Loans: Breaking Down Their Purpose

Now, let's circle back to flash loans. What makes them unique is the rapidity with which they can be executed. A loan taken out for a single transaction, and if repaid immediately, it completes. If not, the transaction can be coded to automatically revert. This function is only possible in Web 3 platforms.

Pulling these threads together, someone might utilize a flash loan to carry out arbitrage and benefit from a market price discrepancy.

> "Flash loans allow us to take out quick loans for a single transaction. If we don't pay the money back, the transaction can automatically revert."

## Dig into It Yourself!

For those seeking a more hands-on approach, we'll be adding examples of flash loan protocol arbitrage in the audit data branch of our GitHub repositories. All diagrams used in this post, as well as additional resources, can be found there.

In conclusion, flash loans and arbitrage could be a lucrative way to leverage crypto market discrepancies, especially considering the volatility characteristic of this space. Whether you're an aspiring whale or a novice user aiming to dip your feet, understanding this realm can illuminate a whole new way of interacting with cryptocurrency.

The main caveat, as always, is comprehension. Understanding the terms and conditions, and the associated risks, is a prerequisite to success in any financial venture, and flash loans are no exception. Be sure to dig into our other resources if you'd like more of a deep dive!
