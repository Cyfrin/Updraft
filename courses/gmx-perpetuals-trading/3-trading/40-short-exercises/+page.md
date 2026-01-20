# Short Position Exercises

In this exercise, you'll build a contract that interacts with GMX V2 to create and manage short positions. You'll implement the necessary functions to:

1. Handle execution fee refunds
2. Create orders to short ETH with USDC collateral
3. Retrieve position information
4. Close short positions

The exercise starter code is provided in `Short.sol`.

## Task 1: Receive execution fee refund

GMX requires an execution fee for processing orders. When an order is executed, any unused portion of this fee is refunded to the contract. Your first task is to implement a function that can receive this refund.

## Task 2: Create a short position order

```solidity
// Task 2 - Create an order to short ETH with USDC collateral
function createShortOrder(uint256 leverage, uint256 usdcAmount)
    external
    payable
    returns (bytes32 key)
{
    uint256 executionFee = 0.1 * 1e18;
    usdc.transferFrom(msg.sender, address(this), usdcAmount);

    // Task 2.1 - Send execution fee to the order vault

    // Task 2.2 - Send USDC to the order vault

    // Task 2.3 - Create an order to short ETH with USDC collateral
}
```

Implement the `createShortOrder` function to create an order that shorts ETH using USDC as collateral. This task is divided into three subtasks:

### Task 2.1: Send execution fee

You need to send the execution fee to the order vault using the `exchangeRouter.sendWnt` function.

### Task 2.2: Send USDC collateral

Approve the `ROUTER` contract and send USDC to the `ORDER_VAULT` by calling `exchangeRouter.sendTokens`.

### Task 2.3: Create the short order

Call the `exchangeRouter.createOrder` function with the appropriate parameters to create a short position.

- Set `market` to `GM_TOKEN_ETH_WETH_USDC`
- Set the correct `sizeDeltaUsd` based on leverage
  > Hints:
  >
  > - Get the current price of USDC from `oracle.getPrice(CHAINLINK_USDC_USD)`
  > - USDC price returned from this oracle has 8 decimals (1e8 = 1 USD)
  > - USDC has 6 decimals
  > - `sizeDeltaUsd` must have 30 decimals (1e30 = 1 USD)
- Calculate an appropriate `acceptablePrice` (for a short position, this is slightly lower than the current price)
  > Hints:
  >
  > - Get the current price of ETH from `oracle.getPrice(CHAINLINK_ETH_USD)`
  > - ETH price returned from this oracle has 8 decimals (1e8 = 1 USD)
  > - When opening a short: set `acceptablePrice` lower than execution price
  > - When closing a short: set `acceptablePrice` higher than execution price
  > - `acceptablePrice` has 12 decimals (1e12 = 1 USD)
- Set the correct order type (`MarketIncrease` for opening positions)
- Set `isLong` to `false`

Return the order key.

## Task 3: Get position key

```solidity
// Task 3 - Get position key
function getPositionKey() public view returns (bytes32 key) {}
```

Implement the `getPositionKey` function that returns the unique key for the position created by this contract.

> Hints
>
> - Look for the function `Position.getPositionKey` inside [gmx-synthetics](https://github.com/gmx-io/gmx-synthetics/blob/caf3dd8b51ad9ad27b0a399f668e3016fd2c14df/contracts/position/Position.sol#L191-L194)
> - The `Position` library is already imported for this exercise.

## Task 4: Get position information

```solidity
// Task 4 - Get position
function getPosition(bytes32 key)
    public
    view
    returns (Position.Props memory)
{}
```

Implement the `getPosition` function that retrieves detailed information about a position.

> Hint - Call the `reader` contract

## Task 5: Create an order to close the position

```solidity
// Task 5 - Create an order to close the short position created by this contract
function createCloseOrder() external payable returns (bytes32 key) {
    uint256 executionFee = 0.1 * 1e18;

    // Task 5.1 - Send execution fee to the order vault

    // Task 5.2 - Create an order to close the short position
}
```

Finally, implement the `createCloseOrder` function to close the short position.

### Task 5.1: Send execution fee

Similar to Task 2.1, send an execution fee to the order vault.

### Task 5.2: Create the close order

Call the `exchangeRouter.createOrder` function with the appropriate parameters to close the position. You'll need to:

- Get the current position details
- Set the `sizeDeltaUsd` to the full position size to close it completely
- Set the `initialCollateralDeltaAmount` to the full collateral amount of this position to close it completely
- Calculate an appropriate `acceptablePrice` (for closing a short, this is higher than the current price)
  > Hints:
  >
  > - Get the current price of ETH from `oracle.getPrice(CHAINLINK_ETH_USD)`
  > - ETH price returned from this oracle has 8 decimals (1e8 = 1 USD)
  > - When opening a short: set `acceptablePrice` lower than execution price
  > - When closing a short: set `acceptablePrice` higher than execution price
  > - `acceptablePrice` has 12 decimals (1e12 = 1 USD)
- Set the correct order type (`MarketDecrease` for closing positions)

Return the order key.

## Test

```shell
forge test --fork-url $FORK_URL --fork-block-number $FORK_BLOCK_NUM --match-path test/Short.test.sol -vvv
```
