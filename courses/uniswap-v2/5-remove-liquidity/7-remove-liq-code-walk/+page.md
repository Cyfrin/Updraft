## Uniswap V2 Remove Liquidity

We're going to take a look at the `removeLiquidity` function, which allows users to withdraw their liquidity from a Uniswap V2 pair contract. This function is part of the UniswapV2Router02 contract, which is located within the V2-periphery repository. 

The `removeLiquidity` function accepts six inputs:

- `tokenA`: The address of the first token in the pair contract.
- `tokenB`: The address of the second token in the pair contract.
- `liquidity`: The amount of liquidity shares to burn.
- `amountAMin`: The minimum amount of tokenA the user expects to receive.
- `amountBMin`: The minimum amount of tokenB the user expects to receive.
- `to`: The address where the tokens will be sent.

The function returns two outputs:

- `amountA`: The actual amount of tokenA received.
- `amountB`: The actual amount of tokenB received.

The `removeLiquidity` function first computes the address of the pair contract using the `pairFor` function from the UniswapV2Library contract. 

```javascript
pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
```

The code then checks if the pair contract exists by calling the `transferFrom` function on the pair contract. 

```javascript
UniswapV2Pair(pair).transferFrom(msg.sender, pair, liquidity);
```

If the pair contract does not exist, this line of code will fail.

Next, the function transfers the liquidity shares from the user to the pair contract. 

```javascript
UniswapV2Pair(pair).transferFrom(msg.sender, pair, liquidity);
```

The function then calls the `burn` function on the pair contract to burn the liquidity shares. 

```javascript
UniswapV2Pair(pair).burn(to);
```

The `burn` function returns the actual amounts of tokenA and tokenB received, which are stored in the `amount0` and `amount1` variables. The code then sorts the tokens to determine which one is `amount0` and which one is `amount1`.

```javascript
(amount0, amount1) = UniswapV2Library.sortTokens(tokenA, tokenB);
```

Finally, the code checks that the actual amounts received are greater than or equal to the minimum amounts specified by the user.

```javascript
require(amount0 >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
require(amount1 >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
```

This ensures that the user receives at least the minimum amount of each token that they expected. 

The `removeLiquidity` function is an important part of the Uniswap V2 protocol, as it allows users to withdraw their liquidity from a pair contract and receive their underlying tokens. 
