### Exercise 2: Increasing Liquidity

In this exercise, we will be increasing liquidity for a position. The position is created by calling a helper function, `mint`, which assigns a variable called `tokenID`.

Our goal is to increase liquidity using this `tokenID`. The contract was initially given 3000 DAI and 3 WETH. Some of these tokens were used to mint a new position by calling the `mint` function.

To get the remaining tokens in the contract, we can call `balanceOf` on ERC20. We need to use an amount of tokens that is less than or equal to the remaining tokens inside the contract to increase liquidity. To increase liquidity, we need to call the `increaseLiquidity` function on the non-fungible position manager.

To find this function, you can navigate to `foundry`, `source`, `interfaces`, `uniswap-v3`, and open `INonfungiblePositionManager.sol`. Scrolling down, you will find the `increaseLiquidity` function.

```javascript
    function increaseLiquidity(IncreaseLiquidityParams calldata params) external payable returns (uint128 liquidity, uint256 amount0, uint256 amount1);
```

This function takes a single struct parameter. These parameters need to be passed in when we use this function.

```javascript
    struct IncreaseLiquidityParams {
        uint256 tokenId;
        uint256 amount0Desired;
        uint256 amount1Desired;
        uint256 amount0Min;
        uint256 amount1Min;
        uint256 deadline;
    }
```
