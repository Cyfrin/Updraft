## Exploring the Uniswap V3 Mint Function

Let's explore the mint function in a contract called UniswapV3Pool, which is located in the v3-core repository.

This function is used to add liquidity to a Uniswap V3 pool, and it is a low-level function. As a user adding liquidity, you are actually interacting with another smart contract, called "NonfungiblePositionManager" located in the v3-periphery repository. The NonfungiblePositionManager will call into the Uniswap V3 Pool contract.

In this lesson, we'll briefly explore what's going on inside the mint function.
The mint function can be used both to add liquidity for the first time or increase existing liquidity. The parameters passed are:
-   recipient
-   tickLower
-   tickUpper
-   amount

The recipient will become the owner of the position and tickLower and tickUpper specify the position. Amount indicates the quantity of liquidity to add to the position. There is also a "call data", or arbitrary data, that is passed as a callback to the message sender.

The mint function returns:
-   amount of token zero
-   amount of token one

These are the tokens required to add the given amount of liquidity. The first action of the mint function is to call another internal function named _modifyPosition.

The parameters of the _modifyPosition function are:
-   owner
-   tickLower
-   tickUpper
-   liquidityDelta

Owner will be the recipient from the mint function and the ticks will specify the position, liquidityDelta is derived from the amount parameter of the mint function.

This liquidityDelta will indicate to the _modifyPosition function how to modify the position, or add/remove liquidity, which is specified with the owner and ticks. The liquidityDelta can be positive or negative.

Let's dive deeper into the _modifyPosition function.
This function takes in a struct called modifyPositionParams, and returns the position that has been updated or created, as well as the amounts of token 0 and token 1 required for the update.
```javascript
Position.Info storage position
int256 amount0
int256 amount1
```
The first action in the function is to check that the ticks are valid, with a function named checkTicks, as:
```javascript
checkTicks(params.tickLower, params.tickUpper)
```
Next, memory slot0 is loaded for gas optimization as:
```javascript
Slot0 memory _slot0 = slot;
```
After that, the position is updated via an internal function call named _updatePosition, using the params from the modifyPositionParams struct.
```javascript
position = _updatePosition
(
    params.owner,
    params.tickLower,
    params.tickUpper,
    params.liquidityDelta,
    _slot0.tick
);
```
The _updatePosition function returns, as indicated above, a position, as well as amounts of token zero and token one. The next action is an if statement that checks if the liquidityDelta is not equal to zero. This code block will be described further, but first let's investigate the _updatePosition function.

This function takes the following parameters:
```javascript
address owner,
int24 tickLower,
int24 tickUpper,
int128 liquidityDelta,
int24 tick
```
The function then loads a position based on the owner and ticks.
```javascript
position = positions.get(owner, tickLower, tickUpper)
```
It will then load these state variables into a local variable, both for gas optimization.
```javascript
uint256 feeGrowthGlobal0X128 = feeGrowthGlobal0X128;
uint256 feeGrowthGlobal1X128 = feeGrowthGlobal1X128;
```
These variables are used to track fees for liquidity providers.

After that the following if statement is evaluated:
```javascript
if (liquidityDelta != 0)
```
If the liquidityDelta is not zero, price information is stored for time-weighted average pricing for a price oracle.
```javascript
observations.observeSingle(time, 0, _slot0.tick, _slot0.observationIndex, liquidity, _slot0.observationCardinality);
```
The function will then call the update function on the ticks object to update the ticks. Note, it updates both lower and upper ticks as:
```javascript
flippedLower = ticks.update(tickLower, tick, liquidityDelta, feeGrowthGlobal0X128, feeGrowthGlobal1X128, secondsPerLiquidityCumulativeX128, tickCumulative, time, false, maxLiquidityPerTick);
flippedUpper = ticks.update(tickUpper, tick, liquidityDelta, feeGrowthGlobal0X128, feeGrowthGlobal1X128, secondsPerLiquidityCumulativeX128, tickCumulative, time, true, maxLiquidityPerTick);
```
Let's explore the ticks.update function which is located in a library called Tick.
The parameters of this function are:
```javascript
mapping(int24 => Tick.Info) storage self,
int24 tick,
int24 tickCurrent,
int128 liquidityDelta,
uint256 feeGrowthGlobal0X128,
uint256 feeGrowthGlobal1X128,
uint160 secondsPerLiquidityCumulativeX128,
int56 tickCumulative,
uint32 time,
bool upper,
uint128 maxLiquidity
```
Inside this function the data is loaded from storage.
```javascript
Tick.Info storage info = self[tick];
```
Then, the liquidity of the tick is modified with liquidityDelta.
```javascript
uint128 liquidityGrossBefore = info.liquidityGross;
uint128 liquidityGrossAfter = LiquidityMath.addDelta(liquidityGrossBefore, liquidityDelta);
```
The updated liquidity is checked to not exceed the maximum liquidity allowed, as:
```javascript
require(liquidityGrossAfter <= maxLiquidity, "LO");
```
If the liquidity is zero, and previously was not, then the tick is initialized, and updates the following:
-   feeGrowthOutside
-   secondsPerLiquidityOutside
-   tickCumulativeOutside
-   secondsOutside
-   initialized = true

The core action of this function is the liquidity update with the code block:
```javascript
info.liquidityGross = liquidityGrossAfter;
```
And lastly, the function checks if the current tick is less than or greater than the tick being updated to determine if liquidity needs to be added or removed from the liquidityNet property.

Let's return to the UniswapV3Pool mint function.
After the call to _updatePosition and returning to the mint function we see an if-else statement:
```javascript
 if (_slot0.tick < params.tickLower){
        amount0 = SqrtPriceMath.getAmount0Delta(_slot0.sqrtPriceX96, TickMath.getSqrtRatioAtTick(params.tickLower), params.liquidityDelta);
        TickMath.getSqrtRatioAtTick(params.tickLower),
        TickMath.getSqrtRatioAtTick(params.tickUpper),
        params.liquidityDelta);
    } else if (_slot0.tick < params.tickUpper) {
        uint128 liquidityBefore = liquidity; //SLOAD for gas optimization
        // write an oracle entry
        slot0.observationIndex, slot0.observationCardinality
        amount0 =  SqrtPriceMath.getAmount0Delta(_slot0.sqrtPriceX96, TickMath.getSqrtRatioAtTick(params.tickLower), params.liquidityDelta);
        TickMath.getSqrtRatioAtTick(params.tickLower),
        TickMath.getSqrtRatioAtTick(params.tickUpper),
        params.liquidityDelta);
        amount1 =  SqrtPriceMath.getAmount1Delta(_slot0.sqrtPriceX96, TickMath.getSqrtRatioAtTick(params.tickLower), params.liquidityDelta);
        TickMath.getSqrtRatioAtTick(params.tickLower),
        TickMath.getSqrtRatioAtTick(params.tickUpper),
        params.liquidityDelta);
    }
```
This code calculates the amount of token0 and token1 needed. The next call is made to the callback:
```javascript
    IUniswapV3MintCallback(msg.sender).uniswapV3MintCallback(amount0, amount1, data);
```
This is where tokens are actually transferred. The last check of the mint function is verifying that the balance has increased by the correct amount, and if so it will emit a mint event.

And with that we've now explored what's going on inside the mint function of UniswapV3Pool.
