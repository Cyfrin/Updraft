## Uniswap V3 Tick Accumulator Data Storage

In this lesson, we will be examining how Uniswap V3 stores data relating to the accumulation of ticks for every second.

We'll be taking a look at three contracts, the Oracle, the Uniswap V3 pool, and the Oracle library.

The Oracle contract is located in the `v3-core/libraries/Oracle.sol` directory

Here we will see a struct called `Observation`:
```javascript
struct Observation {
    uint32 blockTimestamp;
    int56 tickCumulative;
    uint160 secondsPerLiquidityCumulativeX128;
    bool initialized;
}
```

This struct stores the cumulative tick at some `blockTimestamp`. Whenever the liquidity inside of the Uniswap V3 pool contract changes, or whenever the price changes, this `Observation` struct is stored inside the Uniswap V3 pool contract. 

Inside this struct there is the `secondsPerLiquidityCumulativeX128` and the boolean `initialized`, these will not be covered at this time. 

We will focus on `tickCumulative` and where it is stored, how it is updated, and how we can use it to calculate the TWAP.

A new `Observation` struct is saved whenever the liquidity changes or the price changes by calling the `write` function.

Let's take a look inside the Uniswap V3 pool contract and see where this `write` function is called. We can see on line 341:
```javascript
(slot0.observationIndex, slot0.observationCardinality) = observations.write
```
This is called inside the `modifyPosition` function. This function is called whenever the liquidity changes. We can also see that the `write` function is also called on line 735:
```javascript
observations.write
```
This `write` call is located inside the `swap` function. So when a swap happens, if the current tick changes, the `observations.write` function is called.

The next function we will examine is the `observe` function.
This function is located in the Uniswap V3 pool contract as well. This function is used to get the `tickCumulatives`. It takes in a parameter of an array of seconds ago.
```javascript
function observe(uint32[] calldata secondsAgos)
```

For example, zero means zero seconds ago from the current time, which would be the current tick cumulative. One means one second ago, and so on.

These `secondsAgo` numbers are passed directly into an internal function named `observations.observe`.

That internal `observations.observe` function is located in the Oracle library, and takes in a few different parameters, such as current timestamp, current tick, current liquidity, and the `secondsAgos` array:
```javascript
function observe(Observation storage self, uint32 time, uint32[] memory secondsAgos, int24 tick, uint128 liquidity, uint16 cardinality)
```

This function iterates through the `secondsAgos` array, and calculates the tick cumulative for each value, and does so by calling the `observeSingle` function.

The function `observeSingle`, also located in the Oracle library, performs the following:
```javascript
function observeSingle(Observation storage self, uint32 time, uint32 secondsAgo, int24 tick, uint128 liquidity, uint16 cardinality)
```
If `secondsAgo` is equal to zero, then we're trying to get the current tick cumulative. If the last timestamp stored is not equal to the current time, the function calls the `transform` function which modifies the last observation by factoring in the current time. 
```javascript
if (secondsAgo == 0) {
    Observation memory last = self[index];
    if (last.blockTimestamp != time) last = transform(last, time, tick, liquidity);
    return (last.tickCumulative, last.secondsPerLiquidityCumulativeX128);
  }
```
Otherwise, if `secondsAgo` is not equal to zero, then the function performs other computations to find older values of the cumulative tick.

Let's examine the `transform` function.

This function takes the last observation, as well as the current time, tick, and liquidity:
```javascript
function transform(Observation memory last, uint32 blockTimestamp, int24 tick, uint128 liquidity)
```
The `tickCumulative` is a sum of the ticks per second, but an observation is not recorded every second.

To solve this issue, we take the last `tickCumulative`, and then add the product of the current `tick` multiplied by the `delta`, which represents the elapsed time since the last observation:
```javascript
uint32 delta = blockTimestamp - last.blockTimestamp;
tickCumulative: last.tickCumulative + int56(tick) * delta;
```

The function returns the new updated `Observation` struct which takes into account elapsed time.

That concludes the explanation of how `tickCumulative` is stored. In essence, we pass in time, tick, and liquidity into the `write` function, and the tickCumulative is updated to be stored inside the Uniswap V3 pool contract. The cumulative tick is fetched using the `observe` and `observeSingle` functions, and the values are modified inside of the `transform` function.

Next, we look at `OracleLibrary.sol` inside `v3-periphery/contracts/libraries` which provides an example of how to use the `observe` function.

We see an internal view called `consult` that takes an address to a pool contract and the number of seconds ago:
```javascript
function consult(address pool, uint32 secondsAgo) internal view returns (int24 arithmeticMeanTick, uint128 harmonicMeanLiquidity)
```
This function returns the arithmetic mean of the tick, as well as the harmonic mean liquidity.

This function initializes an array with the current `secondsAgo`, and a zero. It also calls the `observe` function on the pool.
```javascript
uint32[] memory secondsAgos = new uint32[](2);
secondsAgos[0] = secondsAgo;
secondsAgos[1] = 0;
(int56[] memory tickCumulatives, uint160[] memory secondsPerLiquidityCumulatives) = IUniswapV3Pool(pool).observe(secondsAgos);
```
It then uses the information returned by the observe function to derive the `tickCumulativesDelta` which is used to calculate the arithmetic mean tick.
```javascript
int56 tickCumulativesDelta = tickCumulatives[1] - tickCumulatives[0];
arithmeticMeanTick = int24(tickCumulativesDelta / secondsAgo);
```
This value is also checked to avoid dividing by zero.

The next function, `getQuoteAtTick`, is used to calculate the amount of token out based on a tick and a token amount in. This is the function we will use to implement our TWAP price oracle in the future.
```javascript
function getQuoteAtTick(int24 tick, uint128 baseAmount, address baseToken, address quoteToken) internal pure returns (uint256 quoteAmount)
```
It uses the tick to get the price and calculates a quote amount with greater precision by accounting for the potential to overflow.
