In this lesson, we'll continue to explore arbitrage, but this time, we'll explore an alternative way to execute an arbitrage between two Uniswap V2 contracts.

In the previous lesson, we went through an arbitrage example where we borrowed DAI, swapped it for ETH, and then sold that ETH on SushiSwap to get back DAI. We then used that DAI to repay the flash swap.

In this lesson, we'll do a flash swap to borrow ETH. We'll then swap that ETH for DAI, and use that DAI to repay the flash swap. This is possible because we're essentially doing a regular swap in reverse order. With a regular swap, we put the token in and get another token back out. However, with a flash swap, we can get the token out first and then put the token in.

Let's go through an example to illustrate this.

We'll say that ETH is cheaper on Uniswap V2, than on SushiSwap. On Uniswap V2, ETH is selling for 3000 DAI. On SushiSwap, ETH is selling for 3100 DAI.

We'll first do a flash swap to borrow ETH from Uniswap V2.

Next, we'll take that ETH and sell it on SushiSwap, to get some DAI.

Lastly, we'll repay the flash swap on Uniswap V2 with the DAI we just acquired.

We borrowed ETH but repaid with DAI. This is possible because we're simply doing a regular swap in reverse order.

We've now illustrated two different methods for executing arbitrage with different Uniswap V2 contracts.

In the next lesson, we'll start to implement these steps into a smart contract.
