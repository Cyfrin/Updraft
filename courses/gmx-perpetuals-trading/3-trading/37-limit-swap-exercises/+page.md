# Limit Swap Exercises

In this exercise, you'll implement a smart contract that interacts with GMX V2 to create a limit swap order.

You need to complete the implementation of the `LimitSwap.sol` contract.

## Task 1: Implement the `receive` function

GMX will refund any unused execution fees to your contract, so you need to implement a `receive()` function to accept these ETH refunds.

## Task 2: Implement the `createLimitOrder` function

```solidity
// Task 2 - Create a limit order to swap USDC to WETH
function createLimitOrder(uint256 usdcAmount, uint256 maxEthPrice)
    external
    payable
    returns (bytes32 key)
{
    uint256 executionFee = 0.1 * 1e18;
    usdc.transferFrom(msg.sender, address(this), usdcAmount);

    // Task 2.1 - Send execution fee to the order vault

    // Task 2.2 - Send USDC to the order vault

    // Task 2.3 - Create an order to swap USDC to WETH
}
```

This function already has the initial setup where it:

- Takes in a USDC amount and maximum ETH price
- Sets the execution fee to 0.1 ETH
- Transfers USDC from the caller to the contract

You need to implement the following subtasks:

### Task 2.1: Send execution fee to the order vault

GMX requires an execution fee to be sent to the order vault. This fee is used to pay keepers who execute orders in the GMX system.

Send execution fee to `ORDER_VAULT` by calling `exchangeRouter.sendWnt`.

### Task 2.2: Send USDC to the order vault

Approve USDC transfer for `ROUTER` and then sent to the order vault by calling `exchangeRouter.sendTokens`.

### Task 2.3: Create a limit order to swap USDC to WETH

Use the GMX exchange router to create a limit swap order that:

- Uses the USDC in the order vault to buy WETH
  > Hint
  >
  > - Set `initialCollateralToken` to `USDC`
- Swap path can be any GM token that has WETH and USDC
- Calculates the appropriate `minOutputAmount` based on the price limit `maxEthPrice`
  > Hints
  >
  > - `maxEthPrice` has 8 decimals (1e8 = 1 USD)
  > - USDC has 6 decimals
  > - Assume 1 USDC = 1 USD
  > - WETH has 18 decimals Use the hints above to calculate `minOutputAmount`
- Returns the order key (ID) for future reference

## Test

```shell
forge test --fork-url $FORK_URL --fork-block-number $FORK_BLOCK_NUM --match-path test/LimitSwap.test.sol -vvv
```
