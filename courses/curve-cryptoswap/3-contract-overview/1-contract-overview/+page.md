### Curve v2 Contract Overview

In this lesson, we will discuss Curve v2 contracts. There is only one contract for Curve v2 AMM, which can theoretically create a Curve v2 pool with an arbitrary amount of tokens. However, in practice, Curve v2 pools are gas optimized for either three tokens, or two tokens.

The contract we�ll be performing a code walkthrough for is called `CurveTricryptoOptimizedWETH`. This contract is an AMM for three tokens: USDC, WBTC and ETH.

If we wanted a Curve v2 AMM with separate sets of tokens, for example instead of USDC, DAI, WBTC, and ETH, then we would need to deploy another Curve v2 contract that will hold DAI, WBTC and ETH.

As a user, we can do three things with this Curve v2 contract. The functions that users can call are:
- `exchange` to swap tokens
- `add_liquidity` to add liquidity
- `remove_liquidity` and `remove_liquidity_one_coin`

The difference between `remove_liquidity` and `remove_liquidity_one_coin` is that `remove_liquidity` will remove all three tokens while `remove_liquidity_one_coin` will allow the liquidity provider to choose one of the tokens from the pool to remove all of their liquidity in.
