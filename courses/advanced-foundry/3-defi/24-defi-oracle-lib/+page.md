---
title: OracleLib
---

_Follow along the course with this video._



# Checking Chainlink Price Feeds with DSC Engine

Let's discuss the process of using Chainlink Price Feeds in our `DSCEngine`. When working with Oracles, an assumption that we often make in our protocol is that these price feeds would work seamlessly. However, price feeds are systems just like any other and therefore can have potential glitches. To ensure that our protocol doesn't end up breaking due to a malfunction in the price feed system, we can put some safety checks in our code. This section will guide you through the process of putting some checks on price feeds using a library methodology we developed.

## Setting Up The Library

<img src="/foundry-defi/24-defi-oracle-lib/defi-oracle-lib1.PNG" style="width: 100%; height: auto;">

Let start by creating a libraries folder. In this folder, we'll make a new contract titled `OracleLib.sol`. The purpose of this contract is to ensure that the prices in the price feed aren't stale. Chainlink price feeds have a unique feature known as the heartbeat, which updates the prices every 3600 seconds.

An essential check we need to enforce in our contract is that these prices should update every 3600 seconds. If not, our contract should pause its functionality. It's worth noting that by freezing our protocol's functionality, if Chainlink were to explode, that money will be frozen on the protocol. For now we'll recognize this as a known issue and move on.

## Creating The Check Function

In a more advanced setting, when shifting towards a production product, even the smallest details start to matter more and more. Effective function creation becomes even more critical.

First, we create a `staleCheckLatestRoundData()` function. The input parameter will take an `AggregatorV3Interface priceFeed`. This will be a public view function and would return different values like `uint80, int256, uint256, uint256`, and `uint80`.

```js
// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
...
library OracleLib {
    function staleCheckLatestRoundData(AggregatorV3Interface priceFeed) public view returns (uint80, int256, uint256, uint256, uint80){...}
}
```

In this function, we will call `priceFeed.latestRoundData()`. Since each price feed has its own heartbeat, we should ask them what their heartbeat is. For simplicity, we hardcode ours for `three hours`.

We calculate the seconds since the last price update, and if it's greater than our timeout, we revert with a new error: `Oraclelib__StalePrice()`.

```js
library OracleLib {
    error OracleLib__StalePrice();

    uint256 private constant TIMEOUT = 3 hours;

    function staleCheckLatestRoundData(AggregatorV3Interface priceFeed) public view returns (uint80, int256, uint256, uint256, uint80){
        (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound) = priceFeed.latestRoundData();

        uint256 secondsSince = block.timestamp - updatedAt;
        if(secondsSince > TIMEOUT) revert OracleLib__StalePrice();
        return (roundId, answer, startedAt, updatedAt, answeredInRound)
    }
}
```

Now, in our `DSCEngine`, every time we call `latestRoundData`, we swap it out for `staleCheckLatestRoundData`, thanks to our library.

Make sure to remember to import `Oraclelib` from libraries and to specify the that we're using it for `AggregatorV3Interface`s.

```js
...
import {OracleLib} from "./libraries/OracleLib.sol";
...
contract DSCEngine is ReentrancyGuard{
    ...
    using OracleLib for AggregatorV3Interface;
    ...
    function getUsdValue(address token, uint256 amount) public view returns (uint256){
        AggregatorV3Interface priceFeed = AggregatorV3Interace(s_priceeFeeds[token]);
        (, int256 price,,,) = priceFeed.staleCheckLatestRoundData();
        ...
    }
    ...
}
```

Note: There are more functions than shown here that will need updating!

Once all of these changes have been done, run the `forge test` which will run the entire test suite, including the new invariant test suite. Following a successful run, we can conclude that our code is functioning as expected!

## Future Considerations

Although we've done a lot of refactoring, there are still several ways the code can be improved. For example, writing additional tests for the contacts. Running `forge coverage` can help identify areas needing improvement.

<img src="/foundry-defi/24-defi-oracle-lib/defi-oracle-lib3.PNG" style="width: 100%; height: auto;">

Let's mark this as our next step — testing these contracts more thoroughly to ensure that we've covered all the possible edge cases and have robust error-checking before pushing it to production. Until then — happy coding!
