---
title: T-SWAP Recon Continued
---



---

# Decoding the AMM Swapping Process using Pool Factory Contracts

In our last conversation, we delved into the complexities of the AMM (Automated Market Maker) swapping process. This blog post builds on that foundation, unravelling other critical sections and explaining how a pool factory contract fits into the picture.

![](https://cdn.videotap.com/KhZyFmTzPcrusQqCBOsj-8.05.png)

## Diving into a Pool Factory Contract

At its core, the protocol begins as a pool factory contract, which you can use to create new pools of tokens. Glancing through the audit data branch, you'll notice the `poolfactory.sol` that includes this `Create Pool` function. This function is responsible for forming these AMM pools, hallmarking a major component of our swapping process.

```js
function createPool(address tokenA, address tokenB) external returns (address pool) {
    // ...
    return pool;
}
```

Made it more evident, when we zoom into the `poolfactory.sol`, it's seen that various token pairs can be created. For instance, there's a USDC WETH pool being created with the `Create Pool` function. Yes! You just don't create pools; it's also about combining different token pairs to form these pools.

## Understanding the Logic behind Pool Contract

The contract used to create new pools ensures that each pool token adheres to the correct logic. Nonetheless, the real allure of these pool contracts comes alive with each T swap pool contract.

To highlight this point, I navigated the SRC, where I found the `create pool` function in play (highlighted in the `poolfactory.sol`). This function sprung my curiosity, and I began exploring it more.

To my delight, I discovered that the function seemingly calls this new TSWAP pool function. Though information-dense, the sequence makes sense as the `Create Pool` function is being called to create a new pool contract.

After investing some time into exploring the process, I realized that each TSWAP contract operates as an exclusive exchange between two specific assets, as originally depicted in our early diagram with ne ERC 20 and the WETH token.

## Bridging the Gap via Pools and WETH

The magic of WETH lies in its ability to specifically provide pools with the power to allow users to freely swap between an ERC 20 having a pool and WETH (Wrapped Ether). With a sufficient number of pools created, they enable an easy hop between supportive ERC 20s.

If this sounds like a challenge, consider this; if I possess USDC, I could swap from USDC to WETH. Then, switching from WETH to Link becomes feasible because there's likely going to be a USDC WETH pool and a Link WETH pool.

Now, let’s explain the process with an easy example,

> User A has ten USDC. They want to swap it for die. So, they swap their ten USDC for WETH in the USDC WETH pool. They then swap their WETH for die in the Dai WETH pool.

It falls into place now, doesn't it? Every pool designates a unique pair between some tokens and WETH. Not only does it provide functionality for swapping but also gives developers insight into the two functions enabling the swap process.

At the higher level, this is how swapping works, and playing around with the sample codes will only enrich your understanding of the process.

## Role of Liquidity Providers

Hopefully, this article provided you with useful insights into the process of pool creation, swapping, and the essence of LPs. However, there's much more to explore and understand, and it's fascinating to see how these different components intricately work together to enable seamless AMMs.
