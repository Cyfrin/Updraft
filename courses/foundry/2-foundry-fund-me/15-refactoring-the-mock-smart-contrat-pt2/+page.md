---
title: Refactoring the mock smart contract pt.2
---

_Follow along with this video:_

---

### More refactoring

One thing that we should do that would make our `getAnvilEthConfig` more efficient is to check if we already deployed the `mockPriceFeed` before deploying it once more.

Remember how addresses that were declared in state, but weren't attributed a value default to address zero? We can use this to create our check.

Right below the `function getAnvilEthConfig() public returns ...` line add the following:

```solidity
if (activeNetworkConfig.priceFeed != address(0)) {
    return activeNetworkConfig;
}
```

`getAnvilEthConfig` is not necessarily the best name. We are deploying something inside it, which means we are creating a new `mockPriceFeed`. Let's rename the function to `getOrCreateAnvilEthConfig`. Replace the name in the constructor.

Remember how `testPriceFeedVersionIsAccurate` was always failing when we didn't provide the option `--fork-url $SEPOLIA_RPC_URL`? Try running `forge test`. Try running `forge test --fork-url $SEPOLIA_RPC_URL`.

Everything passes! Amazing! Our test just became network agnostic. Next-level stuff!

Take a break, come back in 15 minutes and let's go on!
