# GLV Liquidity Exercises

In this exercise, you will implement a Solidity smart contract for interacting with the GLV pools.

You'll complete 3 main tasks in the `GlvLiquidity.sol` contract:

1. Receive execution fee refunds
2. Create deposit orders to add USDC liquidity to GLV vaults
3. Create withdrawal orders to remove liquidity and receive WETH and USDC tokens

## Task 1: Implement fee refund mechanism

Create a function to receive execution fee refunds from the GMX protocol.

## Task 2: Implement deposit functionality

```solidity
// Task 2 - Create an order to deposit USDC into GLV vault
function createGlvDeposit(uint256 usdcAmount, uint256 minGlvAmount)
    external
    payable
    returns (bytes32 key)
{
    uint256 executionFee = 0.1 * 1e18;
    usdc.transferFrom(msg.sender, address(this), usdcAmount);

    // Task 2.1 - Send execution fee to GLV vault

    // Task 2.2 - Send USDC to GLV vault

    // Task 2.3 - Create an order to deposit USDC
}
```

Complete the `createGlvDeposit` function to create a deposit order for `GLV_VAULT`.

### Task 2.1: Send the execution fee to the GLV vault

Send the execution fee to the GLV vault.

### Task 2.2: Send USDC tokens to the GLV vault

Approve the `ROUTER` contract and send USDC to the GLV vault.

### Task 2.3: Create an order to deposit USDC

Create an order to deposit liquidity into `GM_TOKEN_ETH_WETH_USDC`.

Return the order key.

> Hint:
>
> - Set `glv` to `GLV_TOKEN_WETH_USDC`

## Task 3: Implement withdrawal functionality

```solidity
// Task 3 - Create an order to withdraw liquidity
function createGlvWithdrawal(uint256 minWethAmount, uint256 minUsdcAmount)
    external
    payable
    returns (bytes32 key)
{
    uint256 executionFee = 0.1 * 1e18;

    // 3.1 Send execution fee to GLV vault

    // 3.2 - Send USDC to GLV vault

    // 3.3 Create an order to withdraw liquidity
}
```

Complete the `createGlvWithdrawal` function to:

### Task 3.1: Send the execution fee to the GLV vault

Send the execution fee to the GLV vault.

### Task 3.2: Send GLV tokens to the GLV vault

Approve the `ROUTER` contract and send GLV token to the GLV vault.

### Task 3.3: Create an order to withdraw liquidity and receive WETH and USDC

Create an order to withdraw liquidity from `GM_TOKEN_ETH_WETH_USDC`.

Return the order key.

> Hint:
>
> - Set `glv` to `GLV_TOKEN_WETH_USDC`

## Test

```shell
forge test --fork-url $FORK_URL --fork-block-number $FORK_BLOCK_NUM --match-path test/GlvLiquidity.test.sol -vvv
```
