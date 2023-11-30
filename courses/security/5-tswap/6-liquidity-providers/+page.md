---
title: Liquidity Providers - Why AMMs have Fees?
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/KcFGNXYagvM?si=pR5q7bOjIZH00wW6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Untangling Decentralized Finance: Understanding Automated Market Makers (AMMs)

Welcome back to our deep-dive into the bustling world of decentralized finance. Today, we're unraveling the complexity of Automated Market Makers (AMMs) like Uniswap and Sushiswap, explaining how they facilitate trades and generate fees for liquidity providers. Let's get started!

## What Makes An AMM Work?

The heart of an AMM like Uniswap resides in its liquidity pools. For simplicity, let's take an imaginary pool that contains 1000 USDC (United States Digital Coin) and 100 WETH (Wrapped Ether). This pool facilitates trades: for instance, someone could exchange 10 USDC for 1 WETH.

But there's more to it: after the trade, there's a new balance in the pool. With one WETH taken out and 10 USDC added, we now have 1010 USDC and 99 WETH.

IMPORTANT: Remember, almost all AMMs also extract a small fee for each transaction, say, 0.3%. So, to trade 1 WETH, one might actually need to send 1.03 WETH, with the 0.03 WETH fee either going to its designated spot or staying within the pool.

Now, you might be wondering if there's a loophole that allows you to make infinite money by continuously trading, but allow us to dash your dreams. AMMs have mathematical safeguards in place to prevent such abuse.

## The Role Of Liquidity Providers

Who funds these pools full of digital currencies, you ask? Enter the Liquidity Providers (LPs), the unsung heroes of the AMM system. They supply the assets to the protocol so individuals can perform swaps.

When an LP adds their funds - for example, 1000 USDC and 100 WETH - they gain ownership of the pool equivalent to their share of total funds, which is represented by Liquidity Provider Tokens (LP Tokens).

So, by investing their assets into the protocol, LPs not only gain ownership but also earn a share of the transaction fees generated from the trades.

## More About LP Tokens And Fees

Let's investigate further into the LP Tokens and their relationship with fees. Say, a new liquidity provider, C, enters the pool with half of what A and B initially put in, essentially 500 USDC and 50 WETH. This, in turn, increases the total assets in the pool to 2500 USDC and 250 WETH.

In return for their contribution, liquidity provider C receives LP tokens. How many?

Well, we can calculate that by taking the ratio of the funds they've added to the total funds, in this case, 0.2 (or 20%). Multiplying this by the total LP Tokens, we deduce that liquidity provider C will receive 50 LP Tokens, granted their contribution.

Consequently, we now have a total of 250 LP Tokens in circulation. At this juncture, we also have a pool of 2500 USDC and 250 WETH ready for trades.

## How Fees Make Money For Liquidity Providers

The burning question now is: How do liquidity providers make profits? The answer lies with the transaction fees mentioned earlier.

Every trade results in a fee that slightly adjusts the ratio of assets in the pool. For instance, if a user trades 10 USDC for 1 WETH, they're also charged a fee (0.3 USDC in our example), which changes the pool balances to 2510.3 USDC and 249 WETH.

When a liquidity provider chooses to withdraw their funds, they can redeem their LP tokens for an amount of each pool asset proportional to their LP tokens. So, if Liquidity Provider C withdraws their 50 LP Tokens (representing a 20% stake), they'll get back their original investment plus their earned fees.

Let's crunch some numbers:

```markdown
# Assuming 1 WETH is equivalent to 10 USDC

# Initial Deposit: 500 USDC and 50 WETH

# Amount Withdrawn: 502.6 USDC and 49.8 WETH

# Equivalent to: 498 USDC + 502.6 USDC = 1000.6 USDC

# Profit: 1000.6 USDC - 1000 USDC = 0.6 USDC
```

It's by these accruing transaction fees that liquidity providers gain returns on their investments. The more trades executed, the more fees generated and the more money they make, providing an explanation regarding why so many are lured towards becoming liquidity providers.

## Wrapping Up

At a high level, this is the underlying mechanism of an automated market maker like Uniswap. It might seem complex or counterintuitive at first, especially given the novel concepts and the involvement of mathematical models. But with some involvement and time, I assure you, it all starts making more intrinsic sense.

In the end, it's about providing liquidity, facilitating exchanges, and earning fees - all in a decentralized manner on the blockchain.

> "Decentralized finance might seem mesmerising at first, but when you dive into it, you realize it's all about providing liquidity, facilitating exchanges, and earning rewards – all in a decentralized way on the blockchain."

Stay tuned for more deep-dives into the ever-evolving world of decentralized finance!
