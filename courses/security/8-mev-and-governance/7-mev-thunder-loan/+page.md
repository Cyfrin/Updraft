---
title: MEV - Thunder Loan
---

_Follow along with this video:_

<!-- TODO -->


---

Speaking of Sandwich Attacks, that's exactly what happens in the Thunder Loan protocol. 

## An Introduction to Thunderloan and Potential MEV Issues

The Thunderloan protocol is a platform where users can take out flash loans, with a fee currently standing at ten USDC. These fees are directly withdrawn from TSWAP pools. However, the protocol's design makes it susceptible to MEV strategies. 

## The Sandwich Attack: A Closer Look

<img src="/security-section-8/7-mev-thunder-loan/thunder-loan-mev.png" style="width: 100%; height: auto;" alt="t-swap mev">


Here's how it goes:

1. User A makes a request to the Thunderloan protocol for a flash loan.
2. Seeing the incoming flash loan request, User B, decides to exploit the situation. User B doesn't just want the fee to be high, they want it way higher!
3. User B then front runs the flash loan function, and spikes the price on Uniswap by taking out a flash loan *themselves* to make the price go higher. Effectively, this swap alters the balances from the initial ten USDC and one ETH to highly skewed figures: perhaps 0.1 ETH and an astronomical amount of USDC (let's say a billion). Since the fee is derived from the T-Swap pool, the Thunder Loan platform now has a way bigger fee, that the user wasn't aware of. 
4. Then, after collecting the fee, User B swaps back to the original ratio of 10 USDC and 1 ETH.

## The Takeaway

> "Understanding the landscape of MEV vulnerabilities, and how it can lead to 'Sandwich Attacks,' is paramount for DeFi users. Only by identifying potential threats can we begin to devise methods to avoid being sandwiched."

The above exploration of the potential MEV issue in Thunderloan paints a broader picture of potential vulnerabilities in DeFi protocols. By shining light on this issue, we can aspire to ensure safer transactions and reduce the adverse impacts of MEV exploits.
