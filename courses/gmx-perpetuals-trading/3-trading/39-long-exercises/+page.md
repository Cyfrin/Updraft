# Long Position Exercises

In this exercise, you'll implement a smart contract that interacts with GMX V2 to create and manage leveraged long positions for ETH using WETH as collateral. These exercises will cover opening positions, querying position details, calculating profit and loss, and closing positions.

You need to complete the implementation of the `Long.sol` contract.

This exercise consists of six tasks:

1. Implementing the `receive` function
2. Creating a long position
3. Getting the position key
4. Retrieving position details
5. Calculating position profit and loss
6. Closing a long position

## Task 1: Receive execution fee refund

Implement the `receive` function to accept ETH refunds from GMX.

## Task 2: Create a long position

```solidity
// Task 2 - Create an order to long ETH with WETH collateral
function createLongOrder(uint256 leverage, uint256 wethAmount)
    external
    payable
    returns (bytes32 key)
{
    uint256 executionFee = 0.1 * 1e18;
    weth.transferFrom(msg.sender, address(this), wethAmount);

    // Task 2.1 - Send execution fee to the order vault

    // Task 2.2 - Send WETH to the order vault

    // Task 2.3 - Create an order
}
```

Implement the `createLongOrder` function, which allows a user to open a leveraged long position on ETH using WETH as collateral

This function is broken down into three subtasks:

### Task 2.1: Send execution fee to the order vault

Send the execution fee (0.1 ETH) to the order vault.

### Task 2.2: Send WETH to the order vault

Approve the `ROUTER` contract and send WETH to the order vault.

### Task 2.3: Create a long order

Create a market increase order with the following requirements:

- Set `market` to `GM_TOKEN_ETH_WETH_USDC`
- Set `isLong` to `true`
- Calculate the position size based on the leverage and WETH amount
  > Hints:
  >
  > - Get the current price of ETH from `oracle.getPrice(CHAINLINK_ETH_USD)`
  > - ETH price returned from this oracle has 8 decimals (1e8 = 1 USD)
  > - `sizeDeltaUsd` must have 30 decimals (1e30 = 1 USD)
- Set `acceptablePrice` at 1% above current price of ETH
  > Hints:
  >
  > - When opening a long: set `acceptablePrice` higher than execution price
  > - When closing a long: set `acceptablePrice` lower than execution price
  > - `acceptablePrice` has 12 decimals (1e12 = 1 USD)
- Set the correct order type (`MarketIncrease` for opening positions)

Return the order key.

## Task 3: Get position key

```solidity
// Task 3 - Get position key
function getPositionKey() public view returns (bytes32 key) {}
```

Implement the `getPositionKey` function to calculate the unique key for the position.

> Hints
>
> - Look for the function `Position.getPositionKey` inside [gmx-synthetics](https://github.com/gmx-io/gmx-synthetics/blob/caf3dd8b51ad9ad27b0a399f668e3016fd2c14df/contracts/position/Position.sol#L191-L194)
> - The `Position` library is already imported for this exercise.

## Task 4: Get position details

```solidity
// Task 4 - Get position
function getPosition(bytes32 key)
    public
    view
    returns (Position.Props memory)
{}
```

Implement the `getPosition` function to fetch the position details using the position key.

> Hint - Call the `reader` contract

## Task 5: Calculate position profit and loss

```solidity
// Task 5 - Get position profit and loss
function getPositionPnlUsd(bytes32 key, uint256 ethPrice)
    external
    view
    returns (int256)
{}
```

Implement the `getPositionPnlUsd` function to calculate the profit and loss of the position in USD. USD value that is returns has 30 decimals (1e30 = 1 USD).

- `key` is the position key
- `ethPrice` is the price of ETH used to calculate the profit and loss. `ethPrice` has 8 decimals (1e8 = 1 USD).

> Hints:
>
> - Call `reader.getPositionPnlUsd`
> - Get the position identified by `key`
> - For each prices in `MarketUtils.MarketPrices`, set the min price to -1% and max price to +1% of the current price of the token
> - `indexTokenPrice` for `MarketUtils.MarketPrices` is the price of `WETH`. Use `ethPrice`.
> - `longTokenPrice` for `MarketUtils.MarketPrices` is the price of `WETH`. Use `ethPrice`.
> - `shortTokenPrice` for `MarketUtils.MarketPrices` is the price of `USDC`, assume 1 USDC = 1 USD
> - The prices above must have decimals so that when multiplied by the token decimals, it will have 30 decimals.
> - Set `marketToken` to `GM_TOKEN_ETH_WETH_USDC`
> - Set `sizeDeltaUsd` to `position.numbers.sizeInUsd`

## Task 6: Close the long position

```solidity
// Task 6 - Create an order to close the long position created by this contract
function createCloseOrder() external payable returns (bytes32 key) {
    uint256 executionFee = 0.1 * 1e18;

    // Task 6.1 - Get position

    // Task 6.2 - Send execution fee to the order vault

    // Task 6.3 - Create an order
}
```

Implement the `createCloseOrder` function to close an existing long position.

This function is broken down into three subtasks:

### Task 6.1: Get position

Retrieve the current position details.

### Task 6.2: Send execution fee to the order vault

Send the execution fee to the order vault for the closing order.

### Task 6.3: Create a close order

Create a market decrease order to close the position with:

- The full size of the position
- Withdrawal of all collateral
- `acceptablePrice` at 1% below current price of ETH
  > Hints:
  >
  > - Get the current price of ETH from `oracle.getPrice(CHAINLINK_ETH_USD)`. Price is returned with 8 decimals (1e8 = 1 USD).
  > - When opening a long: set `acceptablePrice` higher than execution price
  > - When closing a long: set `acceptablePrice` lower than execution price
  > - `acceptablePrice` has 12 decimals (1e12 = 1 USD)
- Set the correct order type (`MarketDecrease` for closing positions)

Return the order key.

## Price calculations and decimals

When working with prices and calculations, be aware of the following:

- ETH price from Chainlink is in 8 decimals (1e8 = 1 USD)
- WETH has 18 decimals
- `sizeDeltaUsd` has 30 decimals (1e30 = 1 USD)
- `acceptablePrice` has 12 decimals (1e12 = 1 USD)

## Test

```shell
forge test --fork-url $FORK_URL --fork-block-number $FORK_BLOCK_NUM --match-path test/Long.test.sol -vvv
```
