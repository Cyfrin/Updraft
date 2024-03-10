---
title: OracleUpgradeable.sol (Continued)
---

# Oracle Upgradable: A Thorough Review

Welcome back, Code Critiques! We’re continuing our journey through the world of blockchain programming and today, we're examining the Oracle Upgradable back-end.

## When It Gets Interesting - getPrice in WETH

One striking feature that piqued our interest is the `getPrice in WETH`. It is an external public view. Here’s how it works:

- An address swap of pool tokens is initiated.
- A specific token is passed through, utilizing the command `Ipool_factory_s_pool_token`.
- To round this up, `Getpool pool` is then invoked, which is where `get pool tokens` comes in.

![](https://cdn.videotap.com/wbYYfuMAg04eG7LYpZp8-48.15.png)

To be put simply, we capture the pool swap token, call on `getPrice of one pool token in WETH`, and voila!

Interestingly, this entire process could be completed sans any knowledge of TSWAP. We could still continue with our security review and audit, completely ignoring TSWAP. That being said, it invariably adds value to understand the inner workings of TSWAP.

> If we can identify a loophole or break in this function on TSWAP, it could potentially lead us to finding cracks in Oracle Upgradable as well.

In essence, whenever we invoke an external contract, one should instantly scan for attack vectors. Questions to ask include: could the price be manipulated? Is there potential for reentrancy attacks?

## The Mystery of TSWAP

Having explored the intriguing aspects of getPrice in WETH, let's unravel TSWAP. Within TSWAP, the main operational functions appear to be `getPrice of pool token in WETH` and `getPool`.

![](https://cdn.videotap.com/5cZTXH0KnXV4ii8uCDjE-96.3.png)

To an unskilled eye, it might seem as though the getPrice command redundantly repeats itself. That might be true. Nevertheless, it is doing two distinctly separate tasks — it computes the output amount based on an input utilising reserves to ascertain the asset price and pulls out the pool.

## Tests Evaluation

Now let's move to testing, using `units thunderloane test sol` or `Oracleupgradable sol`. If we individualise each point, we can see they are using a mock pool factory for interaction.

Upon closer examination, we can ascertain they are using constraints, which might be a potential issue. An audit informational note would be to recommend them to use forked tests for live protocols.

Why you may ask? Forked tests simply offer higher guarantees of successful operation.

![](https://cdn.videotap.com/fEeOEcrvj5RmWqYZn9Sd-128.4.png)

## Attack Vector Investigation

Let's take potential attack vectors as an example.

The `getPrice in WETH` function poses few directly observable issues. However, as we dig deeper, doubts start to emerge. What if someone could break this function? Could the priveleges be misused?

A seemingly harmless function like `getPool, factory address` also needs to be observed closely. On the surface, it looks quite uncomplicated, with a private variable being used to extract the address — all good so far.

## Initializer Front Run – A Possibility?

Nevertheless, while reviewing the `getPrice in WETH` function, we stumble upon an issue - the possibility of initializer front runs. Although in competitive audits such threats are usually overlooked, protocols still need to be warned of this possibility.

Remembering the infamous attack: What delicate maneuvers are being employed to ensure there's no front run?

## Wrapping it Up

![](https://cdn.videotap.com/4CT0yiquS1CTN2jjVFe4-176.55.png)

Our intense review journey culminates here, having done a fairly comprehensive review, exploring the Oracle Upgradable in its entirety, bringing potential lows to light, such as the chance of initializer front-runs.

But nonetheless, completing yet another successful review delivers a sense of accomplishment. And so, Oracle Upgradable – ticked off and aced!

Our checklist continues to shorten. Stay tuned for the next fascinating code critique in our series. Happy coding!

> "Security is a process, not a product. Let's continue this journey together!"
