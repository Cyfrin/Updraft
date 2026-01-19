# Reposition Exercises

In this exercise, you will write a simple contract to reposition liquidity.

The starter code for this exercise is provided in [`foundry/src/exercises/Reposition.sol`](https://github.com/Cyfrin/defi-uniswap-v4/blob/main/foundry/src/exercises/Reposition.sol)

Solution is in [`foundry/src/solutions/Reposition.sol`](https://github.com/Cyfrin/defi-uniswap-v4/blob/main/foundry/src/solutions/Reposition.sol)

## Task 1 - Reposition

```solidity
function reposition(uint256 tokenId, int24 tickLower, int24 tickUpper)
    external
    returns (uint256 newTokenId) {}
```

This function repositions the liquidity of `tokenId` to the specified `tickLower` and `tickUpper` boundaries.

## Test

```shell
forge test --fork-url $FORK_URL --match-path test/Reposition.test.sol -vvv
```
