---
title: Cheaper Withdraw
---

_Follow along with this video._

<iframe width="560" height="315" src="https://www.youtube.com/embed/TtEdnlZ2NSc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

Hello folks, let's turn our attention to an absolutely interesting aspect of Ethereum smart contracts - Gas. I'm going to show you the smart way of reducing the amount of gas you spend on executing your smart contracts, which turns out to be a beneficial piece of information, right? As most of us know, Ethereum gas is the fuel spent for every transaction we conduct or deploy on the blockchain. The more complicated our contract gets, the more gas we'll have to shell out. But what if there's a way to make this more economical?

## Evaluating the Gas-cost Benchmark

How do you even figure out how much gas a transaction will cost you? For instance, let's consider a test for `withdraw` from multiple funders. What we can do is run `forge snapshot -m`, against this test. This call prompts the creation of a handy file named `Gas Snapshot`, which will reveal the exact amount of gas that this specific test will consume.

**Tip:** You can convert between gas and Ether prices to ascertain how much this gas consumption will financially impact you. Optimization begins with identifying your current spending!

What we did above is merely to establish a benchmark for our testing, i.e., our `withdraw` from multiple funders costs us so much gas.

## Understanding Anvil's Zero Gas-price

While working with Anvil local chains - forked or otherwise - the gas price defaults to zero. So, if we invoke a transaction - say `vm.prank(fundMe.getOwner())`, it should ideally cost us some gas. But when we calculate the final balance (or 'ending owner balance'), gas cost doesn't figure into it, thanks to Anvil's zero gas price. To simulate credible gas prices and consequently, real-world transaction costs, we turn to the helpful cheat code `TX gas price`, which standardizes the gas price for our transaction.

```js
uint256 constant GAS_PRICE = 1;
```

## Calculating Actual Gas Usage

In order to visualize the gas usage, we can leverage Solidity's built-in function `gas left()`. This calculates the remaining gas from a transaction after execution.

```js
uint256 gasStart = gasleft();
```

We can repeat this process with `dash vv` and it will show us how much gas was actually expended in this particular transaction.

## Making Gas Usage Cheaper

Now that we have our gas snapshot and its holistic understanding, the question remains, can we make this cheaper? Yes, we absolutely can and this is where Ethereum's data location - storage - steps in. Long story short, data written in storage is expensive while reading from storage is free. Hence, using storage effectively could significantly reduce your gas usage and consequently, your transaction cost.

Stay tuned as we delve into the world of Ethereum storage optimization in the upcoming posts.
