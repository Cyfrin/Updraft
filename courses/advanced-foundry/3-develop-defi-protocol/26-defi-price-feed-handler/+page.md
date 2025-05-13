---
title: Handler - Price Feed
---

_Follow along the course with this video._

---

### Handler - Price Feed

Our handler looks great at this point, but it doesn't reflect everything. Another powerful feature of this methodology is that we're able to leverage our handler to guide not only our target contract, but any contract we want!

Take price feeds for example. These are external references that our protocol depends upon to function properly. We can use our handler to more realistically emulate how price feeds would behave in real-world scenarios.

Our project should already contain a MockV3Aggregator within the mocks folder, so let's begin by importing it into Handler.t.sol. This file mimics the behaviour of a price feed.

```solidity
import { MockV3Aggregator } from "../mocks/MockV3Aggregator.sol";
```

Then, we can declare a state variable, and in our constructor, we can employ another getter function to acquire the price feed for that token.

```solidity
contract Handler is Test {
    ...
    MockV3Aggregator public ethUsdPriceFeed;
    ...
    constructor(DSCEngine _dscEngine, DecentralizedStableCoin _dsc) {
        dsce = _dscEngine;
        dsc = _dsc;

        address[] memory collateralTokens = dsce.getCollateralTokens();
        weth = ERC20Mock(collateralTokens[0]);
        wbtc = ERC20Mock(collateralTokens[1]);

        ethUsdPriceFeed = MockV3Aggregator(dsce.getCollateralTokenPriceFeed(address(weth)));
    }
    ...
}
```

With this price feed, we can not write a new function which, when called, will update the collateral price, making the calls to our protocol much more dynamic.

```solidity
function updateCollateralPrice(uint96 newPrice) public {
    int256 newPriceInt = int256(uint256(newPrice));
    ethUsdPriceFeed.updateAnswer(newPriceInt);
}
```

With this new function, our test runs will intermittently change the price of our weth collateral as functions are randomly called. Let's run it!

```bash
forge test --mt invariant_ProtocolTotalSupplyLessThanCollateralValue -vvvv
```

::image{src='/foundry-defi/24-defi-handler-price-feed/defi-handler-price-feed1.png' style='width: 100%; height: auto;'}

Our assertion is breaking! If we look more closely at the trace of executions we can obtain a clearer understanding of what actually happened:

::image{src='/foundry-defi/24-defi-handler-price-feed/defi-handler-price-feed2.png' style='width: 100%; height: auto;'}

When updateCollateralPrice was called, the price was updated to a number so low as to break our invariant! The minted DSC was not longer collateralized by the weth which had been deposited.

This is legitimately a concerning vulnerability of this protocol. Effectively, if the USD value of our deposited collateral tanks too quickly, the protocol will become under-collateralized.

Because we've declared our thresholds as a LIQUIDATION_THRESHOLD of 50 and a LIQUIDATION_BONUS of 10, we're defining our protocol's safe operational parameters as being between 200% and 110% over-collateralization. Too rapid a change in the value of our collateral jeopardizes this range.

### Wrap Up

So, we've uncovered a potentially critical vulnerability in this protocol. Either we would go back and adjust the code to account for this, or a developer would accept this as a known bug in hopes that prices are more stable than what our tests imply.

These are the types of scenarios that invariant tests are incredible at spotting.

For now, I'm going to comment out our updateCollateralPrice function. So that it won't affect our future tests.

```solidity
// THIS BREAKS OUR INVARIANT TEST SUITE!!!
// function updateCollateralPrice(uint96 newPrice) public {
//     int256 newPriceInt = int256(uint256(newPrice));
//     ethUsdPriceFeed.updateAnswer(newPriceInt);
// }
```

We're almost done with this section! There are 3 more things we should cover:

1. Proper oracle use
2. Writing more tests
3. Smart Contract Audit Preparation

The finish line is close, let's keep going!
