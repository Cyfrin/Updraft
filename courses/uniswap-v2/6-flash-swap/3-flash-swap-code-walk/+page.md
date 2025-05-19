Let's do a quick walk-through of the code for the UniswapV2Pair contract. This is the function that is called when we do a flash swap.  

The function has six inputs:

- **amount0Out**: The amount of token 0 we want to borrow.
- **amount1Out**: The amount of token 1 we want to borrow.
- **address2**: The address of the smart contract we will call with the function UniswapV2Call.
- **data**: The data that will be passed to the UniswapV2Call function. 
- **token0**: This refers to the first token that is included in the liquidity pool.
- **token1**: This refers to the second token that is included in the liquidity pool. 

After we call the UniswapV2Call function, the function must repay the amount of tokens borrowed plus the fees. 

The only condition required for this code to execute is that the "data" input must not be empty. 


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
