# Subscriber Exercises

In this exercise, you'll learn how to write a subscriber contract for the [`PositionManager`](https://github.com/Uniswap/v4-periphery/blob/main/src/PositionManager.sol) contract.

The starter code for this exercise is provided in [`foundry/src/exercises/Subscriber.sol`](https://github.com/Cyfrin/defi-uniswap-v4/blob/main/foundry/src/exercises/Subscriber.sol)

Solution is in [`foundry/src/solutions/Subscriber.sol`](https://github.com/Cyfrin/defi-uniswap-v4/blob/main/foundry/src/solutions/Subscriber.sol)

The `Subscriber` contract mints and burns non-transferable tokens corresponding to the amount of liquidity a user adds or removes.

## Task 1 - Notify subscribe

```solidity
function notifySubscribe(uint256 tokenId, bytes memory data)
    external
    onlyPositionManager
{
    // Write your code here
}
```

- Mint the amount of liquidity locked in `tokenId`, to the owner of `tokenId`.
- Store the `PoolId` and the owner of `tokenId` into the state variables `poolIds` and `ownerOf`. These data will be later used by `notifyUnsubscribe` and `notifyBurn`.

## Task 2 - Notify unsubscribe

```solidity
function notifyUnsubscribe(uint256 tokenId) external onlyPositionManager {
    // Write your code here
}
```

- Burn all the non-transferable token for `tokenId`
- Delete data in `poolIds` and `ownerOf` for `tokenId`.

## Task 3 - Notify burn

```solidity
function notifyBurn(
    uint256 tokenId,
    address owner,
    uint256 info,
    uint256 liquidity,
    int256 feesAccrued
) external onlyPositionManager {
    // Write your code here
}
```

- Burn all the non-transferable token for `tokenId`
- Delete data in `poolIds` and `ownerOf` for `tokenId`.

## Task 4 - Notify modify liquidity

```solidity
function notifyModifyLiquidity(
    uint256 tokenId,
    int256 liquidityChange,
    int256 feesAccrued
) external onlyPositionManager {
    // Write your code here
}
```

- Mint additional non-transferable token if `liquidityChange` is positive, otherwise burn.

## Test

```shell
forge test --fork-url $FORK_URL --match-path test/Subscriber.test.sol -vvv
```
