## The Uniswap V2 Pair Contract

In this lesson, we will be walking through the code for the Uniswap V2 Pair Contract, which is responsible for managing the exchange of tokens.

The Pair contract is located inside the V2-core repo under the contracts folder. We can access it by navigating to the following directory:

```bash
Uniswap/v2-core/contracts/UniswapV2Pair.sol
```

The `swap` function is the core functionality of this contract, responsible for swapping tokens. 

We will focus our attention on the `swap` function and explore its different parts.

The first part of the `swap` function checks for the invariant: *x* *y* after the swap must be greater than or equal to *x* *y* before the swap.

This check ensures that the price of the tokens does not change drastically due to a swap.

Let's break down how this check is implemented in the code.

The variables $x_0$ and $y_0$ represent the amount of tokens in the contract before the swap.

The calculation of the amount of tokens that came in, `dx` and `dy`, is also important. This is calculated by taking the difference between the actual balance of the tokens and the internal balance of the tokens.

The code snippet demonstrates the calculation of `balance0Adjusted`, which is a key component of the invariant check:

```javascript
uint balance0Adjusted = balance0.mul(1000).sub(amount0In.mul(3));
```

The `balance0Adjusted` is calculated by multiplying the actual balance of token0, `balance0`, by 1,000 and then subtracting the amount of token0 that came in, `amount0In`, multiplied by 3. This step adjusts the balance to account for the swap fees.

Next, the code checks if the product of `balance0Adjusted` and `balance1Adjusted` is greater than or equal to the product of `reserve0` and `reserve1`, multiplied by 1,000 squared. This verifies the invariant condition.

```javascript
require(balance0Adjusted.mul(balance1Adjusted) >= reserve0.mul(reserve1).mul(1000 ** 2), 'UniswapV2: INSUFFICIENT_INPUT_AMOUNT');
```

This step ensures that the price of the tokens remains stable after the swap.

We will cover more details about the Uniswap V2 Pair Contract, including its implementation of flash swaps and the time-weighted average pricing, in future lessons.
