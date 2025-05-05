# Market Liquidity Exercises

This contract interacts with GMX market pools, allowing users to deposit and withdraw tokens.

You'll complete 4 main tasks in the `GmLiquidity.sol` contract:

1. Implement a function to receive execution fee refunds from GMX
2. Complete the market token price calculation function
3. Implement deposit functionality for USDC into a BTC index, WBTC long, USDC short pool
4. Implement withdrawal functionality from the BTC/WBTC/USDC pool

## Task 1: Receive execution fee refund

Implement a way for the contract to receive ETH refunds from GMX.

## Task 2: Get market token price

```solidity
// Task 2 - Get market token price
function getMarketTokenPriceUsd() public view returns (uint256) {
    // 1 USD = 1e8
    uint256 btcPrice = oracle.getPrice(CHAINLINK_BTC_USD);
}
```

Complete the `getMarketTokenPriceUsd` function to fetch and calculate the market token price of `GMX_TOKEN_BTC_WBTC_USDC` in USD.

Market token price has 30 decimals (1e30 = 1 USD).

- Call `reader.getMarketTokenPrices` to get market token price information
  > Hints:
  >
  > - Market is `GMX_TOKEN_BTC_WBTC_USDC`
  > - Index token is `GMX_BTC_WBTC_USDC_INDEX`
  > - Long token is `WBTC`
  > - Short token is `USDC`
  > - Set `indexTokenPrice` and `longTokenPrice` to +/- 1% of `btcPrice`
  > - Set `shortTokenPrice` to +/- 1% of USDC price. Assume 1 USDC = 1 USD
  > - The prices above must have decimals so that when multiplied by the token decimals, it will have 30 decimals.
  > - `WBTC` has 8 decimals
  > - Set `pnlFactorType` to `Keys.MAX_PNL_FACTOR_FOR_DEPOSITS`
  > - Set `maximized` to `true`
- Return the price in the correct format (`uint256`)

## Task 3: Create deposit function

```solidity
// Task 3 - Create an order to deposit USDC into GM_TOKEN_BTC_WBTC_USDC
function createDeposit(uint256 usdcAmount)
    external
    payable
    returns (bytes32 key)
{
    uint256 executionFee = 0.1 * 1e18;
    usdc.transferFrom(msg.sender, address(this), usdcAmount);

    // Task 3.1 - Send execution fee to the deposit vault

    // Task 3.2 - Send USDC to the deposit vault

    // Task 3.3 - Create an order to deposit USDC into GM_TOKEN_BTC_WBTC_USDC
    // Assume 1 USDC = 1 USD
    // USDC has 6 decimals
    // Market token has 18 decimals
}
```

Complete the `createDeposit` function to:

1. Send execution fee to the deposit vault
2. Send USDC to the deposit vault
3. Create an order to deposit USDC into GM_TOKEN_BTC_WBTC_USDC pool
   - Calculate minimum expected market tokens based on price
   - Handle decimals correctly (USDC: 6 decimals, Market token: 18 decimals)

### Task 3.1 Send execution fee to the deposit vault

Send the execution fee to `DEPOSIT_VAULT`.

### Task 3.2: Send USDC to the deposit vault

Approve the `ROUTER` contract and send USDC to `DEPOSIT_VAULT`.

### Task 3.3: Create a deposit order

Create an order to deposit liquidity into `GM_TOKEN_BTC_WBTC_USDC`. Return the order key.

Optionally calculate `minMarketToken` based on the price of the market token (`getMarketTokenPriceUsd`).

Market tokens have 18 decimals.

## Task 4: Create withdrawal function

```solidity
// Task 4 - Create an order to withdraw liquidity from GM_TOKEN_BTC_WBTC_USDC
function createWithdrawal() external payable returns (bytes32 key) {
    uint256 executionFee = 0.1 * 1e18;

    // Task 4.1 - Send execution fee to the withdrawal vault

    // Task 4.2 - Send GM_TOKEN_BTC_WBTC_USDC to the withdrawal vault

    // Task 4.3 - Create an order to withdraw WBTC and USDC from GM_TOKEN_BTC_WBTC_USDC
    // Assume 1 USD = 1 USDC
}
```

Complete the `createWithdrawal` function to:

1. Send execution fee to the withdrawal vault
2. Send GM tokens to the withdrawal vault
3. Create an order to withdraw WBTC and USDC from the pool
   - Calculate minimum expected token amounts based on prices
   - Handle different token decimals correctly

### Task 4.1 Send execution fee to the withdrawal vault

Send the execution fee to `WITHDRAWAL_VAULT`.

### Task 4.2: Send market token to the withdrawal vault

Approve the `ROUTER` contract and send all of `GM_TOKEN_BTC_WBTC_USDC` owned by this contract to `WITHDRAWAL_VAULT`.

### Task 4.3: Create a withdrawal order

Create an order to withdraw liquidity from `GM_TOKEN_BTC_WBTC_USDC`. Return the order key.

Optionally calculate `minLongTokenAmount` and `minShortTokenAmount`.

> Hints:
>
> - Get market token price by calling `getMarketTokenPriceUsd`
> - Market token price has 30 decimals
> - Half of the USD value of the market token owned by this contract will be paid out as BTC. The other half in USDC.
> - Set `minLongTokenAmount` and `minShortTokenAmount` to less than 50% of the USD value of market tokens owned by this contract.
> - Get BTC price by calling `oracle.getPrice(CHAINLINK_BTC_USD)`
> - Assume 1 USDC = 1 USD
> - WBTC has 8 decimals
> - USDC has 6 decimals

Market tokens have 18 decimals.

## Test

```shell
forge test --fork-url $FORK_URL --fork-block-number $FORK_BLOCK_NUM --match-path test/GmLiquidity.test.sol -vvv
```
