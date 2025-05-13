## Calculating the GLV Token Price

Understanding the valuation of a token is fundamental in decentralized finance. For the GLV token, the price is determined by the underlying assets held within the GLV system's vault and the total number of GLV tokens in circulation. This lesson explores the conceptual formula and dives into the Solidity code implementation that calculates the GLV token price.

**The Core Formula**

The price of a single GLV token is derived using a straightforward two-part calculation:

1.  **GLV Token Price = GLV Pool Value / GLV Total Supply**
    This fundamental equation states that the price of one GLV token equals the total US Dollar value of all assets held within the GLV vault (the "Pool Value") divided by the total number of GLV tokens currently issued ("Total Supply").

2.  **GLV Pool Value = Sum of (USD Value of each Market Token owned by GLV)**
    The GLV vault holds a diversified basket of different assets, referred to as "Market Tokens" (often representing specific market positions or assets like GM tokens). To find the total GLV Pool Value, we must determine the current USD value of the quantity of *each* specific Market Token held by the GLV vault and then sum these individual USD values together.

**Code Implementation Walkthrough**

The calculation logic is implemented within the smart contracts, primarily using helper functions for clarity and modularity. Let's trace the execution flow as seen in the Solidity code.

**1. Entry Point: `GlvUtils.getGlvTokenPrice`**

The primary function responsible for initiating the price calculation is `getGlvTokenPrice`, typically found within a utility contract like `GlvUtils.sol`.

```solidity
// Inside GlvUtils.sol
function getGlvTokenPrice(
    DataStore dataStore,
    Oracle oracle,
    address glv, // Address of the GLV token/vault contract
    bool maximize // Parameter likely for choosing min/max price for valuation
) internal view returns (uint256, uint256, uint256) { // Returns price, value, supply
    // Step 1: Calculate the total USD value of the GLV vault
    uint256 value = getGlvValue(dataStore, oracle, glv, maximize);

    // Step 2: Get the total supply of GLV tokens
    uint256 supply = IERC20(glv).totalSupply();

    // Step 3: Call helper function to do the division
    // Note: Actual return might vary, but conceptually passes value and supply
    (uint256 price, , ) = _getGlvTokenPrice(value, supply);
    return (price, value, supply);
}
```

This function orchestrates the process:
*   It first calls `getGlvValue(...)` to compute the total USD value (`value`) of all assets held in the GLV vault.
*   It then fetches the `totalSupply()` (`supply`) directly from the GLV ERC20 token contract.
*   Finally, it passes the `value` and `supply` to an internal helper function, `_getGlvTokenPrice`, to perform the final division.

**2. Division Helper: `_getGlvTokenPrice`**

This internal function executes the core division part of the main formula: `GLV Pool Value / GLV Total Supply`.

```solidity
// Also likely inside GlvUtils.sol (or a related library like Precision)
// Simplified representation of the core logic
function _getGlvTokenPrice(uint256 value, uint256 supply) internal pure returns (uint256 price, uint256 valueOut, uint256 supplyOut) {
    // Handle edge cases like supply == 0 or value == 0
    if (supply == 0 || value == 0) {
        // Return zero price or handle as appropriate
        return (0, value, supply);
    }

    // Perform the division: (value * PRECISION_FACTOR) / supply
    // Uses safe math library (Precision) for fixed-point arithmetic
    uint256 calculatedPrice = Precision.mulDiv(Precision.WEI_PRECISION, value, supply);
    return (calculatedPrice, value, supply);
}
```

Key aspects:
*   It takes the total `value` and `supply` as inputs.
*   It employs `Precision.mulDiv` (or a similar safe math function) to perform the division. This function typically scales the numerator (`value`) by a large precision factor (like `Precision.WEI_PRECISION`, often 10^18) before dividing by the `supply`. This technique maintains precision when dealing with integer arithmetic, which is standard in Solidity.
*   It returns the calculated price per GLV token.

**3. Calculating Total Vault Value: `getGlvValue`**

To get the `value` needed by `getGlvTokenPrice`, the `getGlvValue` function is called. This function implements the second part of our core formula: `GLV Pool Value = Sum (USD Value of Market Tokens owned by GLV)`.

```solidity
// Inside GlvUtils.sol
function getGlvValue(
    DataStore dataStore,
    address[] memory marketAddresses, // List of market tokens GLV holds
    Oracle oracle, // Assuming oracle is needed here or in helpers
    address glv,    // GLV contract address
    bool maximize // Price selection parameter
    // ... other potential args ...
) public view returns (uint256) { // Returns total USD value
    uint256 totalGlvValue = 0; // Use a simple accumulator variable

    // Loop through all market tokens held by GLV
    for (uint256 i = 0; i < marketAddresses.length; i++) {
        address marketAddress = marketAddresses[i];
        // ... potentially fetch specific prices/data for this market ...

        // Calculate USD value of GLV's holdings of *this* market token
        // and add it to the total GLV value
        totalGlvValue += _getGlvMarketValue(
            dataStore,
            oracle, // Pass oracle if needed by helper
            glv,
            marketAddress, // Current market token address
            // ... pass necessary prices/params ...
            maximize
        );
    }
    // Return the total summed value
    return totalGlvValue;
}
```

Logic breakdown:
*   It accepts a list (`marketAddresses`) of all the distinct Market Tokens held within the GLV vault.
*   It iterates through this list using a `for` loop.
*   Inside the loop, for each `marketAddress`, it invokes another helper, `_getGlvMarketValue`. This helper calculates the specific USD value contributed by the GLV vault's holdings of *that single* Market Token.
*   The value returned by `_getGlvMarketValue` is added (`+=`) to a running total (`totalGlvValue`).
*   After iterating through all market addresses, the function returns the final accumulated `totalGlvValue`.

**4. Calculating Individual Market Token Value for GLV: `_getGlvMarketValue`**

This internal helper function determines the USD value of the GLV vault's holdings for *one specific* type of Market Token.

```solidity
// Likely inside GlvUtils.sol
function _getGlvMarketValue(
    DataStore dataStore,
    Oracle oracle, // Assuming oracle is used here or in MarketUtils
    address glv, // GLV contract address
    address marketAddress, // The specific market token to value
    // ... price props, maximize ...
) internal view returns (uint256) { // Returns USD value of GLV's holdings of this market token
    // ... retrieve market properties using dataStore, marketAddress ...

    // Get total supply of this specific market token
    // Placeholder for actual call, likely involving MarketUtils or the token contract
    uint256 marketTokenSupply = MarketUtils.getMarketTokenSupply(dataStore, marketAddress /* ... */);

    // Get how much of this market token GLV holds
    // Assumes GlvToken contract has a mapping or similar structure
    // Note: The exact interface might differ (e.g., might be a direct ERC20 balanceOf call)
    uint256 balance = IERC20(marketAddress).balanceOf(glv); // More standard approach shown

    // Optimization: If GLV holds none of this token, its value contribution is zero
    if (balance == 0) { return 0; }

    // Get the total USD value of the *entire* pool for this specific market token
    // This relies on MarketUtils to value the underlying assets of the market pool
    MarketPoolValueInfo.Props memory marketPoolValueInfo = MarketUtils.getPoolValueInfo(dataStore, oracle, marketAddress, maximize /* ... */);

    // Handle potential negative pool values if applicable
    if (marketPoolValueInfo.poolValue < 0) {
       // Decide handling: return 0 or propagate error/negative value if system allows
       return 0;
    }

    // Calculate the USD value of GLV's balance proportionally
    // Formula: (GLV's balance / Total Supply of Market Token) * Total USD Value of Market Pool
    // This function encapsulates the proportional calculation using safe math
    return MarketUtils.marketTokenAmountToUsd(
        balance,                            // Amount GLV holds
        marketPoolValueInfo.poolValue,      // Total USD value of the market pool (ensure type compatibility)
        marketTokenSupply                   // Total supply of this market token
    );
}
```

Steps involved:
*   Fetch the total supply (`marketTokenSupply`) of the specific Market Token being evaluated.
*   Retrieve the amount (`balance`) of this Market Token held by the GLV vault (`glv`). An efficient check returns 0 immediately if the balance is zero.
*   Utilize a function like `MarketUtils.getPoolValueInfo(...)` to get the total USD value (`marketPoolValueInfo.poolValue`) of the *entire* pool associated with this Market Token. This value represents the collective worth of all underlying assets backing this specific Market Token.
*   Finally, call a function like `MarketUtils.marketTokenAmountToUsd(...)`. This function calculates the USD value of GLV's `balance` proportionally. It effectively computes: `(balance / marketTokenSupply) * marketPoolValueInfo.poolValue`, using safe math for precision.

**Calculation Flow Summary**

1.  `getGlvTokenPrice` is the entry point.
2.  It calls `getGlvValue` to find the total USD value of all assets in the vault.
3.  `getGlvValue` loops through each Market Token held by GLV.
4.  Inside the loop, `getGlvValue` calls `_getGlvMarketValue` for each Market Token.
5.  `_getGlvMarketValue` calculates the USD value of GLV's holdings of that *single* Market Token based on GLV's balance relative to the token's total supply and the token's total pool value (using `marketTokenAmountToUsd`).
6.  `getGlvValue` sums the results from all `_getGlvMarketValue` calls.
7.  `getGlvTokenPrice` receives the total summed value from `getGlvValue`.
8.  `getGlvTokenPrice` fetches the total supply of GLV tokens.
9.  `getGlvTokenPrice` calls `_getGlvTokenPrice` to perform the final division: `Total Value / Total Supply`.
10. The result is the price per GLV token.

This structured approach, utilizing helper functions and safe math libraries like `Precision`, ensures that the GLV token price is calculated accurately and efficiently based on the real-time value of its underlying asset pool and its circulating supply.