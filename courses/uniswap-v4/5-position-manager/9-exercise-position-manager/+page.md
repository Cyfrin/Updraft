# Position Manager Exercises

In this exercise, you'll learn how to use the [`PositionManager`](https://github.com/Uniswap/v4-periphery/blob/main/src/PositionManager.sol) contract.

The starter code for this exercise is provided in [`foundry/src/exercises/Posm.sol`](https://github.com/Cyfrin/defi-uniswap-v4/blob/main/foundry/src/exercises/Posm.sol)

Solution is in [`foundry/src/solutions/Posm.sol`](https://github.com/Cyfrin/defi-uniswap-v4/blob/main/foundry/src/solutions/Posm.sol)

## Task 1 - Increase liquidity

```solidity
function increaseLiquidity(
    uint256 tokenId,
    uint256 liquidity,
    uint128 amount0Max,
    uint128 amount1Max
) external payable {
    // Write your code here
}
```

Complete the function to increase liquidity for the position identified by `tokenId`.

## Task 2 - Decrease liquidity

```solidity
function decreaseLiquidity(
    uint256 tokenId,
    uint256 liquidity,
    uint128 amount0Min,
    uint128 amount1Min
) external {
    // Write your code here
}
```

Complete the function to decrease liquidity for the position identified by `tokenId`.

## Task 3 - Burn

```solidity
function burn(uint256 tokenId, uint128 amount0Min, uint128 amount1Min)
    external
{
    // Write your code here
}
```

Complete the function to burn the position identified by `tokenId`.

## Test

```shell
forge test --fork-url $FORK_URL --match-path test/Posm.test.sol -vvv
```
