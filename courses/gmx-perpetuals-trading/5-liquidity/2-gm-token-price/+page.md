## Understanding GMX Market Token (GM Token) Pricing

When you provide liquidity to a GMX Market (GM) pool, such as the ETH/USD market, you receive GM tokens representing your share of that pool. A crucial question arises: how is the price of these GM tokens determined? This lesson delves into the mechanics and smart contract logic behind GM token price calculation within the GMX Synthetics protocol.

## The Core GM Token Price Formula

At its heart, the price of a GM token (often referred to interchangeably as an LP token or market token in this context) is calculated using a straightforward formula:

```
GM Token Price = Pool Value (USD) / Total Supply of GM Tokens
```

This means the value of each GM token reflects its proportional claim on the total adjusted value held within its specific market pool. The complexity lies in understanding how the "Pool Value (USD)" is calculated.

## Calculating the Pool Value (USD)

The Pool Value isn't simply the sum of the raw assets held. It's a dynamic figure adjusted to reflect the pool's current financial state and obligations to traders. The calculation incorporates several key components:

```
Pool Value (USD) = (USD Value of Long Tokens + USD Value of Short Tokens)
                 + (A Fraction of Pending Borrowing Fees)
                 - (Net Profit and Loss (PnL) of Open Positions)
                 - (Position Impact Pool Amount)
```

Let's break down each part:

1.  **USD Value of Long & Short Tokens:** This is the base value derived from the amount of the constituent tokens (e.g., ETH and USD for the ETH/USD market) held by the pool, multiplied by their current oracle prices.
2.  **Pending Borrowing Fees:** Traders pay borrowing fees over time for holding open leveraged positions. A portion of these *accrued but not yet realized* fees, determined by a `borrowingFeePoolFactor`, is added to the pool's value. This reflects income earned by the pool from providing leverage.
3.  **Net PnL of Positions:** This represents the combined profit or loss of all open long and short positions against the pool.
    *   **Important:** If traders are collectively in profit (positive Net PnL), this amount is *subtracted* from the pool value because it represents a liability – the pool owes this profit to the traders.
    *   Conversely, if traders are collectively at a loss (negative Net PnL), subtracting this negative number *increases* the pool value, as these losses are assets retained by the pool.
4.  **Position Impact Pool Amount:** This is a reserve amount (denominated in USD) set aside to account for the potential price impact caused by large trades or position adjustments. It acts as a buffer and is subtracted from the main pool value to ensure the calculated GM token price reflects readily available liquidity, excluding this reserve.

Essentially, the Pool Value represents the net assets attributable to liquidity providers after accounting for the pool's earnings (fees, trader losses) and liabilities (trader profits, impact pool reserve).

## Smart Contract Implementation: `getPoolValueInfo`

The calculation of the Pool Value primarily occurs within the `getPoolValueInfo` function located in the `MarketUtils.sol` contract (`gmx-synthetics/contracts/market/MarketUtils.sol`). Here’s how the contract executes the calculation steps:

1.  **Initialization:** It starts by calculating the USD value of the long and short tokens held by the pool using their respective amounts and oracle prices.

    ```solidity
    // Inside getPoolValueInfo function
    result.longTokenUsd = result.longTokenAmount * longTokenPrice.pickPrice(maximize);
    result.shortTokenUsd = result.shortTokenAmount * shortTokenPrice.pickPrice(maximize);
    result.poolValue = (result.longTokenUsd + result.shortTokenUsd).toInt256();
    ```

2.  **Add Borrowing Fees:** It calculates the total pending borrowing fees for both long and short positions and adds the designated fraction (based on `borrowingFeePoolFactor`) to the `poolValue`.

    ```solidity
    // Inside getPoolValueInfo function (simplified)
    result.totalBorrowingFees = getTotalPendingBorrowingFees(...) + getTotalPendingBorrowingFees(...);
    result.poolValue += Precision.applyFactor(result.totalBorrowingFees, result.borrowingFeePoolFactor).toInt256();
    ```

3.  **Subtract Net PnL:** It determines the capped PnL for long and short positions, sums them to get the `netPnl`, and subtracts this value from `poolValue`. Remember, subtracting a positive PnL decreases pool value, while subtracting a negative PnL (trader losses) increases it.

    ```solidity
    // Inside getPoolValueInfo function (simplified)
    result.longPnl = getCappedPnl(...); // For longs
    result.shortPnl = getCappedPnl(...); // For shorts
    result.netPnl = result.longPnl + result.shortPnl;
    result.poolValue = result.poolValue - result.netPnl;
    ```

4.  **Subtract Impact Pool:** Finally, it calculates the USD value of the amount reserved in the position impact pool and subtracts it from the `poolValue`.

    ```solidity
    // Inside getPoolValueInfo function (simplified)
    result.impactPoolAmount = getNextPositionImpactPoolAmount(...);
    // ... calculate impactPoolUsd ...
    result.poolValue -= impactPoolUsd.toInt256();
    return result;
    ```
    The function then returns the `result`, which contains the final calculated `poolValue` along with other intermediate values.

## Calculating GM Tokens Minted on Deposit: `_executeDeposit`

When you deposit liquidity into a GM pool, the protocol needs to determine how many GM tokens to mint for you. This happens within the internal `_executeDeposit` function in `ExecuteDepositUtils.sol` (`gmx-synthetics/contracts/deposit/ExecuteDepositUtils.sol`).

1.  **Get Current Pool State:** The function first retrieves the current pool value by calling `MarketUtils.getPoolValueInfo`. It also fetches the current total supply of the specific GM token using `MarketUtils.getMarketTokenSupply`.

    ```solidity
    // Inside _executeDeposit function
    MarketPoolValueInfo.Props memory poolValueInfo = MarketUtils.getPoolValueInfo(...);
    uint256 poolValue = poolValueInfo.poolValue.toUint256();
    uint256 marketTokensSupply = MarketUtils.getMarketTokenSupply(...);
    ```

2.  **Calculate Mint Amount:** Using the USD value of your deposit (`usd_value_of_deposit`), the freshly calculated `poolValue`, and the current `marketTokensSupply`, it calls `MarketUtils.usdToMarketTokenAmount`. This utility function effectively applies the core GM token price formula (Pool Value / Supply) in reverse to determine how many new GM tokens correspond to the deposited USD value, ensuring you receive a proportional share of the pool.

    ```solidity
    // Inside _executeDeposit function (simplified concept)
    mintAmount = MarketUtils.usdToMarketTokenAmount(
        usd_value_of_deposit,
        poolValue,
        marketTokensSupply
    );
    ```
    This `mintAmount` is the number of GM tokens transferred to your wallet.

## Directly Querying the GM Token Price: `getMarketTokenPrice`

For direct price discovery, the `MarketUtils.sol` contract also provides a dedicated public function: `getMarketTokenPrice`. This function allows users or other contracts to query the current price of a specific GM token without simulating a deposit.

1.  **Get Supply and Pool Value:** It fetches the current total supply (`supply`) and calls `getPoolValueInfo` to get the latest `poolValueInfo`.
2.  **Calculate Price:** It then divides the `poolValueInfo.poolValue` by the `supply`, using fixed-point arithmetic (`Precision.mulDiv`) for accuracy, to return the current GM token price.

    ```solidity
    // Inside getMarketTokenPrice function
    uint256 supply = getMarketTokenSupply(...);
    MarketPoolValueInfo.Props memory poolValueInfo = getPoolValueInfo(...);
    // ... handle supply == 0 edge case ...
    int256 marketTokenPrice = Precision.mulDiv(Precision.WEI_PRECISION, poolValueInfo.poolValue, supply);
    return (marketTokenPrice, poolValueInfo);
    ```

In summary, the price of a GM token is derived dynamically from the pool's net asset value, which accounts for collateral, accrued fees, trader PnL, and impact reserves. The smart contracts use the `getPoolValueInfo` function as the core component for calculating this value, which in turn determines both the current market price of GM tokens and the amount minted during liquidity deposits.