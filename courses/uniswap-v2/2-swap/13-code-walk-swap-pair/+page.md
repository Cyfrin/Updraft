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

---

This is the implementation process of the `swap` function.


```js
    // this low-level function should be called from a contract which performs important safety checks
    // NOTE: no amount in for input
    // NOTE: data used for flash swap
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external lock {
        require(amount0Out > 0 || amount1Out > 0, 'UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT');
        // NOTE: internal balance of tokens
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
        require(amount0Out < _reserve0 && amount1Out < _reserve1, 'UniswapV2: INSUFFICIENT_LIQUIDITY');

        uint balance0;
        uint balance1;
        // NOTE: stack too deep
        { // scope for _token{0,1}, avoids stack too deep errors
        address _token0 = token0;
        address _token1 = token1;
        require(to != _token0 && to != _token1, 'UniswapV2: INVALID_TO');
        // NOTE: transfer out first
        if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // optimistically transfer tokens
        if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // optimistically transfer tokens
        // NOTE: msg.sender can execute contract at to
        if (data.length > 0) IUniswapV2Callee(to).uniswapV2Call(msg.sender, amount0Out, amount1Out, data);
        balance0 = IERC20(_token0).balanceOf(address(this));
        balance1 = IERC20(_token1).balanceOf(address(this));
        }
        // NOTE: calculate amount in
        // actual balance - (internal balance - amount out)
        // actual balance = actual balance before transfer - amount out
        // actual balance > new internal balance ? balance increased -> amount in > 0 : 0
        // NOTE: example
        // amount in = token 0, amount out = token 1
        // amount0Out = 0
        // amount1Out = 100
        // amount in = 10 token 0
        // balance0 = 1010 
        // reserve0 = 1000
        //                1010       1000     -  0           1010     - (1000 - 0) = 10
        uint amount0In = balance0 > _reserve0 - amount0Out ? balance0 - (_reserve0 - amount0Out) : 0;
        uint amount1In = balance1 > _reserve1 - amount1Out ? balance1 - (_reserve1 - amount1Out) : 0;
        require(amount0In > 0 || amount1In > 0, 'UniswapV2: INSUFFICIENT_INPUT_AMOUNT');
        { // scope for reserve{0,1}Adjusted, avoids stack too deep errors
        // NOTE:
        // amount0In = 0 -> balance0Adjusted = balance0
        // amount0In > 0 -> balance0Adjusted = balance0 * 1000 - 3 * amount0In
        // balance0Adjusted / 1000 = balance0 - 3 / 1000 * amountIn
        // balance0Adjusted = balance0 * 1000 - amount0In * 3
        // balance0Adjusted / 1000 = balance0 - amount0In * 3 / 1000
        uint balance0Adjusted = balance0.mul(1000).sub(amount0In.mul(3));
        uint balance1Adjusted = balance1.mul(1000).sub(amount1In.mul(3));
        // NOTE: 
        // (x0 + dx * (1- f))(y0 - dy) >= x0 * y0
        // balance0Adjusted / 1000 * balance1Adjusted / 1000 = 
        // balance 0 adjusted * balance 1 adjusted
        // --------------------------------------- >= reserve 0 * reserve 1
        //               1000 ** 2
        require(balance0Adjusted.mul(balance1Adjusted) >= uint(_reserve0).mul(_reserve1).mul(1000**2), 'UniswapV2: K');
        }

        _update(balance0, balance1, _reserve0, _reserve1);
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }

```
