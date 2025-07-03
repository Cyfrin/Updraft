---
title: T-Swap Manual Review Slither
---

---

### Manual Review - Slither

The first step in our manual review should be to run some of our static analyzers. Fortunately it looks like the TSwap team has already set up a `slither.config.json`, so we can start there.

The protocol team has already configured a make command for `Slither`, using this config, so let's just run `make slither` and assess the output.

![t-swap-manual-review-slither1](/security-section-5/29-t-swap-manual-review-slither/t-swap-manual-review-slither1.png)

### Red Detectors

Ok! It looks like `Slither` found a few things to consider. Best to start with the scary red ones at the top.

```
PoolFactory.s_pools (src/PoolFactory.sol#27) is never initialized.

and

PoolFactory.s_tokens (src/PoolFactory.sol#28) is never initialized.

```

If we look into `PoolFactory.sol`, we can see what these variables are and what's happening.

```js
mapping(address token => address pool) private s_pools;
mapping(address pool => address token) private s_tokens;
```

It looks like these variables are mappings which are uninitialized. This could be a concern, but the only function they're being used in is performing expected checks, so despite being a red warning in `Slither`, these are very likely fine.

### Green Detectors

Moving into the green section of our `Slither` report now.

```bash
PoolFactory.constructor(address).wethToken (src/PoolFactory.sol#40) lacks a zero-check on :
    - i_wethToken = wethToken (src/PoolFactory.sol#41)
```

This might be informational (most of these likely are), but this could be a legitimate finding. If we check the constructor of `PoolFactor`, sure enough, we neglect to check for a zero address input. Let's note this as an audit finding right in the code base.

```js
//@Audit: No Zero Address Check on wethToken
constructor(address wethToken) {
        i_wethToken = wethToken;
    }
```

The next issue detected by `Slither` is really interesting.

```bash
Reentrancy in TSwapPool._swap(IERC20,uint256,IERC20,uint256) (src/TSwapPool.sol#318-332):
External calls:
- outputToken.safeTransfer(msg.sender,1_000_000_000_000_000_000) (src/TSwapPool.sol#326)
Event emitted after the call(s):
- Swap(msg.sender,inputToken,inputAmount,outputToken,outputAmount) (src/TSwapPool.sol#328)
```

This is a _green_ reentrancy that's been detected. How's that possible? We're going to come back to this as we'll need valuable context to understand if it's truly a concern.

Finally, the last thing pointed out by `Slither` is that our protocol is using a wide variety of Solidity Versions. This _could_ be a concern, but our primary contracts `TSwapPool` and `PoolFactory` look good, so we'll give this a pass.

### Wrap Up

This was a quick review of what `Slither` brought to our process in TSwap. Not a lot of juicy findings from `Slither`, but this is a good habit to get into.

Next, we'll run Aderyn.
