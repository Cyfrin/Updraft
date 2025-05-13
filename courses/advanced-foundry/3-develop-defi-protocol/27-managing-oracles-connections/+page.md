---
title: OracleLib
---

_Follow along the course with this video._

---

### OracleLib

There are a few assumptions that the `DecentralizedStableCoin` protocol is making that may lead to unexpected vulnerabilities. One of which is our use of an oracle for price feeds.

Much of our protocol relies on `Chainlink price feeds` for accurate value calculations. While a very dependable service, we would still want to protect against the impact of issues that could arise from the reliance on this system. We're going to do this by writing our own `library`!

Create the file `src/libraries/OracleLib.sol`.

Taking a look at the [**Chainlink price feeds**](https://docs.chain.link/data-feeds/price-feeds/addresses) available, we can see that each of these feeds as a configured `heartbeat`. The `heartbeat` of a price feed represents the maximum amount of time that can pass before the feed is meant to update, otherwise the price is said to be come `stale`.

In our `OracleLib`, let's write some checks to ensure the prices `DSCEngine` are using aren't `stale`. If prices being received by our protocol become stale, we hope to pause the functionality of our contract.

```solidity
//SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

/**
 * @title OracleLib
 * @author Patrick Collins
 * @notice This library is used to check the Chainlink Oracle for stale data.
 * If a price is stale, functions will revert, and render the DSCEngine unusable - this is by design.
 * We want the DSCEngine to freeze if prices become stale.
 *
 * So if the Chainlink network explodes and you have a lot of money locked in the protocol... too bad.
 */
library OracleLib {
    function staleCheckLatestRoundData() public view returns () {}
```

With our _beautiful_ `NATSPEC` in place detailing the `library` and its purposes, our main function here is going to be `stalePriceCheck`. Since we'll be checking `Chainlink's price feeds`, we know we'll need the `AggregatorV3Interface`, lets be sure to import that. The return types of our function are going to be those of the `latestRoundData` function within `AggregatorV3Interface`. Let's start by getting those values.

```solidity
...
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
...
library OracleLib {
    function staleCheckLatestRoundData(AggregatorV3Interface pricefeed) public view returns (uint80, int256, uint256, uint256, uint80) {
        (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound) = pricefeed.latestRoundData();
    }
}
```

Now, we just need to calculate the time since the last update, and if it's over a threshold, we'll revert and return our variables. `Chainlink` sets a `heartbeat` of `3600 seconds for the ETH/USD` price feed, we'll give it even more time and set a `TIMEOUT` of `3 hours`. We can add a custom error to handle timeouts at this step as well.

> ❗ **PROTIP** > `hours` is a keyword in solidity that is effectively `*60*60 seconds` .
>
> `3 hours` == `3 * 60 * 60` == `10800 seconds`.

```solidity
...
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
...
library OracleLib {

    error OracleLib__StalePrice();
    uint256 private constant TIMEOUT = 3 hours;

    function staleCheckLatestRoundData(AggregatorV3Interface pricefeed) public view returns (uint80, int256, uint256, uint256, uint80) {
        (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound) = pricefeed.latestRoundData();

        uint256 secondsSince = block.timestamp - updatedAt;
        if (secondsSince > TIMEOUT) revert OracleLib__StalePrice();

        return (roundId, answer, startedAt, updatedAt, answeredInRound);
    }
}
```

We should now be able to use this `library` for `AggregatorV3Interfaces` to automatically check if the price being supplied is stale.

In `DSCEngine.sol`, we can import `OracleLib`, as our using statement under a new types header, and then replace all our calls to `latestRoundData` with `staleCheckLatestRoundData`.

```solidity
...
import {OracleLib} from "./libraries/OracleLib.sol";
...

contract DSCEngine is Reentrancy Guard {

    ///////////
    // Types //
    ///////////

    using OracleLib for AggregatorV3Interface;

    function _getUsdValue(address token, uint256 amount) private view returns (uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(s_priceFeeds[token]);
        (, int256 price,,,) = priceFeed.staleCheckLatestRoundData();
        // 1 ETH = 1000 USD
        // The returned value from Chainlink will be 1000 * 1e8
        // Most USD pairs have 8 decimals, so we will just pretend they all do
        // We want to have everything in terms of WEI, so we add 10 zeros at the end
        return ((uint256(price) * ADDITIONAL_FEED_PRECISION) * amount) / PRECISION;
    }
    ...
    function getTokenAmountFromUsd(address token, uint256 usdAmountInWei) public view returns (uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(s_priceFeeds[token]);
        (, int256 price,,,) = priceFeed.staleCheckLatestRoundData();
        // $100e18 USD Debt
        // 1 ETH = 2000 USD
        // The returned value from Chainlink will be 2000 * 1e8
        // Most USD pairs have 8 decimals, so we will just pretend they all do
        return ((usdAmountInWei * PRECISION) / (uint256(price) * ADDITIONAL_FEED_PRECISION));
    }
}
```

### Wrap Up

We've done a tonne of refactoring, and we're very nearly done. We should run `forge test` just to ensure everything is working as expected!

::image{src='/foundry-defi/25-defi-oracle-lib/defi-oracle-lib1.png' style='width: 100%; height: auto;'}

Beautiful.

1. Proper oracle use ✅
2. Writing more tests ❌
3. Smart Contract Audit Preparation 🔜

I'll be transparent, we aren't going to write additional tests together. This is something I encourage you to do, this is a great way to challenge yourself to improve. Use `forge coverage` as your guide and write additional tests, especially for our new `OracleLib`.

In the next lesson we'll look at what's needed to prepare a protocol for a smart contract audit!
