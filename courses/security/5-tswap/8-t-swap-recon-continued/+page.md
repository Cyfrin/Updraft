---
title: TSwap Recon Continued
---

---

### TSwap Recon Continued

With a deeper understanding of DEXes and AMMs, let's continue our recon of TSwap by proceeding with the docs.

The next thing our repo's [**README**](https://github.com/Cyfrin/5-t-swap-audit/blob/main/README.md) says is that the protocol begins as a PoolFactory Creating pools of assets, all of the logic handing those assets is contained within the TSwapPool contract that's generated. From the docs:

```
You can think of each TSwapPool contract as it's own exchange between exactly 2 assets. Any ERC20 and the WETH token. These pools allow users to permissionlessly swap between an ERC20 that has a pool and WETH. Once enough pools are created, users can easily "hop" between supported ERC20s
```

The developers here have even provided us an example of how TSwap is supposed to work.

```
Example:

1. User A has 10 USDC
2. They want to use it to buy DAI
3. They swap their 10 USDC -> WETH in the USDC/WETH pool
4. Then they swap their WETH -> DAI in the DAI/WETH pool

Every pool is a pair of TOKEN X & WETH.
```

This may be a great point in our process to go through the code base and make connections to what functions are actually performing these actions described in the docs. We may even create ....

![tswap-recon-cont1](/security-section-5/8-tswap-recon-continued/tswap-recon-cont1.png)

A Protocol Diagram!

These can be super valuable when trying to gain an understanding of how each of the disparate parts of a system work together.

Further down our TSwap docs they detail liquidity providers, which we've already covered.

Great! The next section of the protocol README is going to be integral to how we proceed. Let's look at `invariants` in the next lesson.
