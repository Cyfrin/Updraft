The `burn` function inside the UniswapV2Pair contract allows us to withdraw liquidity from a pair.  

When the `burn` function is called, it will send tokens to the address specified in the `to` input. The actual amount of each token that was withdrawn from the pool will be returned in the `amount0` and `amount1` outputs.

We'll walk through the `burn` function line by line. The function first gets the balance of token0 and token1:
```javascript
address token0 = IERC20(token).balance(address(this));
```
```javascript
address token1 = IERC20(token).balance(address(this));
```
Next, it calls an internal function `mintFee`: 
```javascript
bool feeOn = mintFee(reserve0, reserve1);
```
We've covered `mintFee` in a previous lesson. 

The `burn` function calculates the amount of token0 and token1 to send to the `to` address using this equation: 
```javascript
amount0 = liquidity * mul(balance0 / totalSupply, reserve0);
```
```javascript
amount1 = liquidity * mul(balance1 / totalSupply, reserve1);
```
This formula calculates the proportional share of the total reserves for each token based on the liquidity being withdrawn. 

Next, the `burn` function checks that the amount of each token to send is greater than zero:
```javascript
require(amount0 > 0 && amount1 > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_BURNED');
```
After that, the function burns the liquidity shares that we've withdrawn from the pool.
```javascript
burn(address(this), liquidity);
```
Finally, the `burn` function updates the balance of each token in the pool to reflect the liquidity withdrawal.
```javascript
balance0 = IERC20(token0).balanceOf(address(this));
```
```javascript
balance1 = IERC20(token1).balanceOf(address(this));
```
This ensures that the balances are up-to-date. 

The last step is to update the internal state of the pool:
```javascript
update(balance0, balance1, reserve0, reserve1);
```
This ensures that the `reserve0` and `reserve1` values are updated to reflect the changes in the pool's balances.


---

This is the implementation process of the `burn` function.

```js
    // this low-level function should be called from a contract which performs important safety checks
    function burn(address to) external lock returns (uint amount0, uint amount1) {
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
        address _token0 = token0;                                // gas savings
        address _token1 = token1;                                // gas savings
        uint balance0 = IERC20(_token0).balanceOf(address(this));
        uint balance1 = IERC20(_token1).balanceOf(address(this));
        // NOTE: burning from this contract
        uint liquidity = balanceOf[address(this)];

        // NOTE: protocol fee
        bool feeOn = _mintFee(_reserve0, _reserve1);
        uint _totalSupply = totalSupply; // gas savings, must be defined here since totalSupply can update in _mintFee
        // NOTE:
        // dx = s * x0 / T
        // dy = s * y0 / T
        amount0 = liquidity.mul(balance0) / _totalSupply; // using balances ensures pro-rata distribution
        amount1 = liquidity.mul(balance1) / _totalSupply; // using balances ensures pro-rata distribution
        require(amount0 > 0 && amount1 > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_BURNED');
        _burn(address(this), liquidity);
        _safeTransfer(_token0, to, amount0);
        _safeTransfer(_token1, to, amount1);
        balance0 = IERC20(_token0).balanceOf(address(this));
        balance1 = IERC20(_token1).balanceOf(address(this));

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 and reserve1 are up-to-date
        emit Burn(msg.sender, amount0, amount1, to);
    }
```
