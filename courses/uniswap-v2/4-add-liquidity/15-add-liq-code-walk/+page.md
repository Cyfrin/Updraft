We're going to learn about how Uniswap V2 Router handles adding liquidity. The `addLiquidity` function takes the address of two ERC20 contracts, the amount of each token desired, and the minimum amount of each token that must be added. It also takes a deadline parameter which represents the latest timestamp at which the function can be executed. If the deadline has passed, the function call will fail.

The `addLiquidity` function has two modes of operation:
* `addLiquidity`, which is called for all ERC20 pairs
* `addLiquidityETH`, which is called for pairs where one of the ERC20 tokens is ETH

We'll focus on `addLiquidityETH`.

## How `addLiquidityETH` works

When you call `addLiquidityETH`, the function first checks if the pair contract has already been deployed. If not, the function deploys the contract.

Next, the function calculates the optimal amounts of each token to be added to the liquidity pool. This is done based on the current price of the pair and the amount of each token the user has provided.

Finally, the function transfers the tokens to the pair contract, and calls the `mint` function to mint liquidity tokens.

Here are the steps the `addLiquidityETH` function takes:

1. **Check if the pair contract exists.** The function first calls the `getPair` function on the Uniswap factory contract. If the function returns address zero, then the pair contract hasn't been deployed yet. 
   ```javascript
   if (UniswapV2Factory(factory).getPair(tokenA, tokenB) == address(0)) {
       UniswapV2Factory(factory).createPair(tokenA, tokenB);
   }
   ```
2. **Calculate the optimal amounts.** The function calls the `quote` function in the Uniswap V2 library to calculate the optimal amount of token B to be added for the amount of token A the user has provided.
   ```javascript
   uint amountBOptimal = UniswapV2Library.quote(amountADesired, reserveA, reserveB);
   ```
3. **Check the minimum amounts.** The function then checks that the optimal amounts are greater than or equal to the minimum amounts specified by the user.
   ```javascript
   require(amountBOptimal >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
   ```
4. **Transfer the tokens.** The function then transfers the calculated amounts of token A and token B to the pair contract.
   ```javascript
   TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
   TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
   ```
5. **Mint liquidity tokens.** Finally, the function calls the `mint` function on the pair contract.
   ```javascript
   liquidity = IUniswapV2Pair(pair).mint(to);
   ```

## `quote` function

The `quote` function in the Uniswap V2 library is used to calculate the optimal amount of one token that can be swapped for a given amount of another token. 
It uses the following formula: 

```javascript
amountB = (amountA * reserveB) / reserveA
```

This formula is based on the constant product formula of Uniswap V2, which states that the product of the reserves of two tokens in a liquidity pool must always remain constant.

The `quote` function is used in the `addLiquidityETH` function to determine the optimal amount of WETH to be added for a given amount of the other token.

## Summary

The `addLiquidityETH` function is a key part of the Uniswap V2 Router contract that allows users to add liquidity to a liquidity pool. It's a complex function with several steps, but ultimately, it ensures that the user's tokens are used to create a new liquidity position in a way that is fair and balanced.

