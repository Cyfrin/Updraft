# Take Profit and Stop Loss Exercises

In this exercise, you'll enhance your understanding of GMX's perpetual DEX by implementing a contract that creates a long position with associated risk management orders. Specifically, you'll learn how to:

1. Open a long ETH position using USDC as collateral
2. Create a stop loss order that executes if prices fall below a threshold
3. Set up a take profit order that executes if prices rise above a target

This exercise builds upon the concepts from the previous long and short exercises but focuses on advanced order types for risk management.

The exercise starter code is provided in `TakeProfitAndStopLoss.sol`.

## Task 1: Receive execution fee refund

Implement the necessary function to receive these ETH refunds.

## Task 2: Create a long position with risk management orders

```solidity
function createTakeProfitAndStopLossOrders(
    uint256 leverage,
    uint256 usdcAmount
) external payable returns (bytes32[] memory keys) {
    uint256 executionFee = 0.1 * 1e18;
    usdc.transferFrom(msg.sender, address(this), usdcAmount);

    // Task 2.1 - Send execution fee to the order vault

    // Task 2.2 - Send USDC to the order vault

    // Task 2.3 - Create a long order to long ETH with USDC collateral

    // Task 2.4 - Send execution fee to the order vault

    // Task 2.5 - Create a stop loss for 90% of current ETH price

    // Task 2.6 - Send execution fee to the order vault

    // Task 2.7 - Create an order to take profit above 110% of current price
}
```

Implement the `createTakeProfitAndStopLossOrders` function which creates three different orders:

1. A market order to open a long ETH position
2. A stop loss order that executes if ETH price falls below 90% of entry price
3. A take profit order that executes if ETH price rises above 110% of entry price

### Task 2.1: Send execution fee for the long position order

Send the execution fee to the order vault for the initial long position order.

### Task 2.2: Send USDC collateral

Send the USDC tokens that will be used as collateral to the order vault.

### Task 2.3: Create the long position order

Call the `exchangeRouter.createOrder` function with the appropriate parameters to create a long position with the specified leverage and collateral amount.

- Set `market` to `GM_TOKEN_ETH_WETH_USDC`

### Task 2.4: Send execution fee for the stop loss order

Send another execution fee to the order vault for the stop loss order.

### Task 2.5: Create the stop loss order

Create a stop loss order that will execute if the ETH price falls below 90% of the current price, closing the position to limit further losses.

> Hints:
>
> - Set the `triggerPrice` to 90% of the current ETH price.
> - `triggerPrice` has 12 decimals (1e12 = 1 USD)

### Task 2.6: Send execution fee for the take profit order

Send a third execution fee to the order vault for the take profit order.

### Task 2.7: Create the take profit order

Create a take profit order that will execute if the ETH price rises above 110% of the current price, closing the position to lock in profits.

> Hints:
>
> - Set the `triggerPrice` to 110% of the current ETH price.
> - `triggerPrice` has 12 decimals (1e12 = 1 USD)

## Hints

### Order types

- **MarketIncrease**: Used to open positions at the current market price
- **StopLossDecrease**: Executes when price moves unfavorably beyond a specified threshold
- **LimitDecrease**: Executes when price moves favorably beyond a specified threshold

### Price considerations

- For a **long position**:
  - When opening: `acceptablePrice` should be higher than current price (willing to pay up to X)
  - For stop loss: `triggerPrice` is below current price (execute when price falls to X)
  - For take profit: `triggerPrice` is above current price (execute when price rises to X)

### Execution fees

- Each order requires its own execution fee
- Fees are sent to the order vault before creating the order

### Return values

- The function should return an array of order keys (one for each created order)
- These keys can be used to track or cancel orders if needed

## Test

```shell
forge test --fork-url $FORK_URL --fork-block-number $FORK_BLOCK_NUM --match-path test/TakeProfitAndStopLoss.test.sol -vvv
```
