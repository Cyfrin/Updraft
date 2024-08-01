## Uniswap V2 Pair Contract

We're going to take a look at the Uniswap V2 pair contract code and walk through the `mint` function.

The `mint` function is what's used to mint liquidity provider (LP) shares in Uniswap V2. We'll be taking a look at the code inside of the `Uniswap V2 Pair` contract.

```javascript
// this low-level function should be called from a contract which performs important safety checks
function mint(address to) external lock returns (uint liquidity) {
  // gas savings
  (uint112 reserve0, uint112 reserve1,) = getReserves();
  // gas savings
  uint balance0 = IERC20(token0).balanceOf(address(this));
  // gas savings
  uint balance1 = IERC20(token1).balanceOf(address(this));
  // NOTE: amounts are calculated by taking differences from internal balances
  uint amount0 = balance0.sub(reserve0);
  uint amount1 = balance1.sub(reserve1);

  bool feeOn = _mintFee(reserve0, reserve1);
  // gas savings, must be defined here since totalSupply can update in _mintFee
  uint totalSupply = totalSupply; 
  if (totalSupply == 0) {
    // NOTE: pool value function f(x, y) = sqrt(x * y)
    // NOTE: Math.sqrt(amount0 * amount1) = sub MINIMUM_LIQUIDITY
    // NOTE: protection against vault inflation attack
    liquidity = Math.sqrt(amount0.mul(amount1)).sub(MINIMUM_LIQUIDITY);
    _mint(address(0), MINIMUM_LIQUIDITY); // permanently lock the first MINIMUM_LIQUIDITY tokens
  } else {
    // NOTE: Math.min(amount0 * totalSupply / reserve0, amount1 * totalSupply / reserve1)
    liquidity = Math.min(amount0.mul(totalSupply) / reserve0, amount1.mul(totalSupply) / reserve1);
  }
  require(liquidity > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_MINTED');
  _mint(to, liquidity);
  update(balance0, balance1, reserve0, reserve1);
  // NOTE: used for protocol fee xy=k'L^2/xy or k'=K*(1+fee)/ (1+fee)^2
  if (feeOn) kLast = uint(reserve0).mul(reserve1) / totalSupply; // reserve0 and reserve1 are up-to-date
  // NOTE: msg.sender and amount0, amount1 reserve
  emit Mint(msg.sender, amount0, amount1);
}
```

The `mint` function takes in a single input, `to`, which is the address where we want to mint the LP shares to.

The function first gets the internal reserves, `reserve0` and `reserve1`. Next, it gets the actual balance of the tokens, `balance0` and `balance1`.

The `amount0` and `amount1` variables are calculated by taking the difference between the actual balance and the internal reserves.

Next, we call the internal `mintFee` function. We'll take a look at the `mintFee` function a little later.

The function then calculates the `liquidity` based on whether the total supply of LP shares is zero or not. If the total supply is zero, the `liquidity` is calculated as the square root of the amount of token0 multiplied by the amount of token1, minus the `MINIMUM_LIQUIDITY`. This `MINIMUM_LIQUIDITY` is there to help protect against what's called a vault inflation attack. If the total supply is not zero, the `liquidity` is calculated as the minimum of two values. We'll take a look at this equation a little later.

The next step is to check if the calculated `liquidity` is greater than zero, and if it is, then we mint the LP shares. Finally, we call the `update` function, which we looked at in the previous lesson.

```javascript
// this low-level function should be called from a contract which performs important safety checks
function mintFee(uint112 reserve0, uint112 reserve1) private returns (bool feeOn) {
  // NOTE: mint fee on add + remove liquidity to save gas on swap
  // NOTE: mint fee is disabled on ETH mainnet, currently disabled on factory
  address feeTo = IUniswapV2Factory(factory).feeTo();
  // gas savings
  feeOn = feeTo != address(0);
  uint kLast = _kLast; // gas savings
  if (feeOn) {
    if (kLast != 0) {
      // NOTE: xy=k -L^2 so sqrt(xy) * sqrt(k) = sqrt(k-L^2) = e
      // NOTE: Math.sqrt(uint(reserve0).mul(reserve1))
      uint rootK = Math.sqrt(uint(reserve0).mul(reserve1));
      // NOTE: Math.sqrt(kLast)
      uint rootKLast = Math.sqrt(kLast);
      // NOTE: L^2 / (kLast)
      if (rootK > rootKLast) {
        // t * (rootK/rootKlast - 1) * 10
        uint numerator = totalSupply.mul(rootK.sub(rootKLast));
        // 5 + L^2
        uint denominator = rootK.mul(5).add(rootKLast);
        // NOTE: math to capture 1/6 of swap fee
        uint liquidity = numerator / denominator;
        if (liquidity > 0) {
          _mint(feeTo, liquidity);
        }
      }
    }
    kLast = uint(reserve0).mul(reserve1);
  }
}
```

The `mintFee` function collects swap fees for the protocol by calculating the increase in the pool. The way this calculation works is by comparing the current value of the pool, `rootK`, to the last value of the pool, `rootKLast`.

In the next lesson, we'll go over the `burn` function. 
