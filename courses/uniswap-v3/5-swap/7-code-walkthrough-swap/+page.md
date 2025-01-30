# Code Walkthrough of the Swap Function

In this lesson, we’ll do a cold walkthrough of the `swap` function inside of the Uniswap V3 pool contract. This contract resides inside of the `v3-core` repository.

The contract name is `UniswapV3Pool.sol`. The function that we will be explaining is called `swap`, which is a low level function used to swap one token for another token inside of Uniswap V3.

There are four inputs to this function:
- `recipient`: The receiver of tokens
- `zeroForOne`: If set to true, then token zero will be sent in and token one will be sent out, otherwise the opposite.
- `amountSpecified`:  Used to determine whether the swap is an exact input or an exact output swap. An integer with a range of 256 bits meaning that it can be either negative or positive.
  - If this number is positive, it is an exact input swap where the user specifies the amount of tokens going in and Uniswap V3 will calculate the amount of tokens that will be going out.
  - If the number is negative, it means the user has specified the amount of tokens going out and Uniswap V3 will calculate the amount of tokens to send in.
- `sqrtPriceLimitX96`: This is the price limit that the caller is willing to accept.
- `calldata data`: Encodes data to be passed over to the Uniswap V3 swap callback function.

One thing to note is that `sqrtPriceLimitX96` ends in `X96` and that you will see this inside the code for Uniswap V3 a lot. To explain, X96 simply means that we have a variable that we are multiplying by 2 to the power of 96.

```javascript
// x * (2**96)
```

The function `swap` will first verify that the input parameter `amountSpecified` is not equal to zero and also loads `slot0` to memory.

```javascript
Slot0 memory slot0Start = slot0;
```

`slot0` is a struct that stores data about the current state of the pool and is stored inside of the EVM storage.

```javascript
struct Slot0 {
    uint160 sqrtPriceX96;
    int24 tick;
    uint16 observationIndex;
    uint16 observationCardinality;
    uint16 observationCardinalityNext;
    uint8 feeProtocol;
    bool unlocked;
}
```

All of the data of `slot0` is stored inside of the EVM storage to save gas.

Next, there is a check to make sure the function is not re-entered.

```javascript
require(slot0Start.unlocked, 'LOK');
```

After the re-entrancy check, there is a check to ensure that the `sqrtPriceLimitX96` is within the minimum and maximum range.

```javascript
sqrtPriceLimitX96 < slot0Start.sqrtPriceX96 && sqrtPriceLimitX96 > TickMath.MIN_SQRT_RATIO

sqrtPriceLimitX96 > slot0Start.sqrtPriceX96 && sqrtPriceLimitX96 < TickMath.MAX_SQRT_RATIO
```

Then the re-entrancy lock is set to false, which can be re-enabled at the end of the function

```javascript
slot0.unlocked = false;
```

The contract also loads some state variables into memory in a struct called `SwapCache`.

```javascript
SwapCache memory cache = SwapCache {
    liquidityStart: liquidity,
    blockTimestamp: blockTimestamp(),
    feeProtocol: zeroForOne ? (slot0Start.feeProtocol % 16) : (slot0Start.feeProtocol >> 4),
    secondsPerLiquidityCumulativeX128: 0,
    tickCumulative: 0,
    computedLatestObservation: false
    }
```

And it creates a bool variable `exactInput`

```javascript
bool exactInput = amountSpecified > 0;
```

After all this, a struct named `SwapState` is created to store state variables that will be used inside of the upcoming while loop.

```javascript
SwapState memory state = SwapState {
    amountSpecifiedRemaining: amountSpecified,
    amountCalculated: 0,
    sqrtPriceX96: slot0Start.sqrtPriceX96,
    tick: slot0Start.tick,
    feeGrowthGlobalX128: zeroForOne ?  feeGrowthGlobal0X128 : feeGrowthGlobal1X128,
    protocolFee: 0,
    liquidity: cache.liquidityStart
    }
```

Next is a while loop that will continue to execute while the following conditions are true:
- The amount specified remaining is not zero
- The current square root price X96 does not equal to the square root price limit X96
```javascript
while (state.amountSpecifiedRemaining != 0 && state.sqrtPriceX96 != sqrtPriceLimitX96) {
    ...
}
```

Inside the loop, the next tick is computed, then the square root price, the amount of tokens that are going in, the amount of tokens that are going out, and the fee are all computed. If the protocol fee is enabled it will calculate that as well. And then the current liquidity is updated. This all happens inside of the loop, one after the other.

At the end of the swap, tokens are transferred to the recipient, and a callback is called.

```javascript
IUniswapV3SwapCallback(msg.sender).uniswapV3SwapCallback(amount0, amount1, data)
```
The callback will pass in the following parameters:
- `amount0`
- `amount1`
- `data`
  - The data parameter is the data passed into the function.

And finally, after the swap has completed, an event is emitted and the reentrancy lock is set to true.

```javascript
emit Swap(msg.sender, recipient, amount0, amount1, state.sqrtPriceX96, state.liquidity, state.tick);
slot0.unlocked = true;
```