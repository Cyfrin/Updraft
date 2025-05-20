## Introduction to TWAP in Uniswap v2

In this lesson we'll be taking a look at the Uniswap v2 code to understand how TWAP is calculated. 

Specifically, we'll be looking at the `UniswapV2Pair.sol` contract.  This contract is responsible for holding liquidity for a pair of tokens, and it's within this contract that the code for TWAP is implemented.

We'll focus on an internal function called `update`, which is called every time a swap occurs or liquidity is added or removed. This function is responsible for updating the cumulative price of each token in the pair. 

The code snippet below is the section of the `update` function we'll be focused on in this lesson:

```solidity
    // NOTE: TWAP is time-weighted average pricing
    price0CumulativeLast += uint(uq112x112.encode(reserve1).uqdiv(reserve0)) * timeElapsed;
    price1CumulativeLast += uint(uq112x112.encode(reserve0).uqdiv(reserve1)) * timeElapsed;
```

##  Understanding Time-Weighted Average Price (TWAP)

TWAP is a mechanism used to calculate the average price of a token over a certain period.  It's used to help mitigate price manipulation by preventing large, sudden trades from impacting the price too significantly.  

The `update` function we're looking at uses a clever technique involving `uint`s to calculate the spot price of one token in terms of the other, and then multiplies that price by a time elapsed variable to get the time-weighted price.  We'll take a closer look at how this works:

## How Uniswap v2 Calculates TWAP

1. The function first calculates the spot price of one token in terms of the other by dividing the reserve of one token by the reserve of the other token. 

2.  To represent the spot price as decimals (as Solidity doesn't support decimals directly), the function uses a special library, `uq112x112`, which splits the number into two parts. The first 112 bits represent the decimal portion, while the next 112 bits represent the whole number portion.

3.  The function then multiplies the spot price by the `timeElapsed` variable, which represents the time passed since the last time the `update` function was called. 

This process is repeated every time a swap occurs or liquidity is added or removed, effectively accumulating the time-weighted average price.

## Overflow Behavior

You might notice the comment `// overflow is desired` in the code snippet above. This is unusual! Usually, overflow in code is a bad thing. 

However, in this case, it's important for calculating the TWAP. The `update` function uses `uint`s for storing the cumulative price, and because `uint`s have a fixed size, they can overflow. When we calculate the difference between two cumulative prices to determine the average price, it's fine if the cumulative prices have overflowed. This is because the overflow is a consistent factor, and it cancels out when we calculate the difference. 


---

This is the implementation process of the `_update` function.

```solidity
// update reserves and, on the first call per block, price accumulators
function _update(uint balance0, uint balance1, uint112 _reserve0, uint112 _reserve1) private {
    require(balance0 <= uint112(-1) && balance1 <= uint112(-1), 'UniswapV2: OVERFLOW');
    uint32 blockTimestamp = uint32(block.timestamp % 2**32);
    uint32 timeElapsed = blockTimestamp - blockTimestampLast; // overflow is desired
    if (timeElapsed > 0 && _reserve0 != 0 && _reserve1 != 0) {
        // NOTE: TWAP - Time weighted average pricing 
        // * never overflows, and + overflow is desired
        //                                                       224 bits            32 bits = 256 bits
        price0CumulativeLast += uint(UQ112x112.encode(_reserve1).uqdiv(_reserve0)) * timeElapsed;
        price1CumulativeLast += uint(UQ112x112.encode(_reserve0).uqdiv(_reserve1)) * timeElapsed;
    }
    reserve0 = uint112(balance0);
    reserve1 = uint112(balance1);
    blockTimestampLast = blockTimestamp;
    emit Sync(reserve0, reserve1);
}
```
