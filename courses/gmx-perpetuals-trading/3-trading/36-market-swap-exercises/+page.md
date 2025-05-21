# Market Swap Exercises

In this exercise, you'll implement a smart contract that interacts with GMX V2 to create a market swap order converting WETH to DAI.

You need to complete the implementation of the `MarketSwap.sol` contract.

## Task 1: Implement the `receive` function

The contract needs to be able to receive ETH when GMX refunds execution fees.

Enable this contract to receive ETH.

## Task 2: Implement the `createOrder` function

```solidity
// Task 2 - Create an order to swap WETH to DAI
function createOrder(uint256 wethAmount)
    external
    payable
    returns (bytes32 key)
{
    uint256 executionFee = 0.1 * 1e18;
    weth.transferFrom(msg.sender, address(this), wethAmount);

    // Task 2.1 - Send execution fee to the order vault

    // Task 2.2 - Send WETH to the order vault

    // Task 2.3 - Create an order to swap WETH to DAI
}
```

This function should:

1. Accept WETH from the caller
2. Send an execution fee to the GMX order vault
3. Send WETH to the order vault
4. Create a market swap order to convert WETH to DAI

The function is partially implemented. You need to complete tasks 2.1, 2.2, and 2.3:

### Task 2.1: Send execution fee to order vault

1. Send ETH (the execution fee) to the `ORDER_VAULT` using the function `exchangeRouter.sendWnt`
2. The execution fee is already set as 0.1 ETH

### Task 2.2: Send WETH to order vault

1. Approve the `ROUTER` to spend `WETH`
2. Use `exchangeRouter.sendTokens` to send `WETH` to the `ORDER_VAULT`

### Task 2.3: Create an order to swap WETH to DAI

1. Define the swap path that the order will take (using GM tokens `GM_TOKEN_ETH_WETH_USDC` and `GM_TOKEN_SWAP_ONLY_USDC_DAI`)
2. Call `exchangeRouter.createOrder` with the appropriate parameters
3. Return the key (order ID) that is generated

> Hint: Set `initialCollateralToken` to `WETH`

## Task 3: Implement the `getOrder` function

```solidity
// Task 3 - Get order
function getOrder(bytes32 key) external view returns (Order.Props memory) {}
```

This function should retrieve order details from the GMX reader contract:

## Test

```shell
forge test --fork-url $FORK_URL --fork-block-number $FORK_BLOCK_NUM --match-path test/MarketSwap.test.sol -vvv
```
