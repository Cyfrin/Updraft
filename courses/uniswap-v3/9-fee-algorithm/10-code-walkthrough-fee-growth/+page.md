### Code Walkthrough of Fee Growth Calculation

In this lesson, we'll explore the code for calculating the fee for a liquidity position. First, we will look at a contract called `Tick.sol`. This contract is found in the repo v3-core, contracts, libraries. Inside this `Tick.sol` contract, we will examine the `update` function.

Scrolling down, we can see that this part of the code contains logic for how `feeGrowthOutside` is initialized. If the tick that is associated with this `feeGrowthOutside` is less than or equal to the current tick, then this `feeGrowthOutside` is initialized to be the current fee growth. The fee growth is tracked for both token 0 and token 1. The `feeGrowthOutside` is initialized as the current fee growth when the current tick is greater than or equal to the tick associated with this fee growth.

```javascript
if(tickCurrent <= tickCurrent){
    info.feeGrowthOutside0X128 = feeGrowthGlobal0X128;
    info.feeGrowthOutside1X128 = feeGrowthGlobal1X128;
}
```

The code we just covered is how the fee growth is initialized. Next, let’s look at what happens when the current tick crosses over the tick and how the `feeGrowthOutside` is updated.

Scrolling down further we will find a function called `cross`. This function is called when the current tick crosses over a tick. When this happens the `feeGrowthOutside` is updated according to the following: The new `feeGrowthOutside` is equal to the current fee growth minus the current `feeGrowthOutside`. This is true for both token 0 and token 1.

```javascript
function cross(){
  info.feeGrowthOutside0X128 = feeGrowthGlobal0X128 - info.feeGrowthOutside0X128;
  info.feeGrowthOutside1X128 = feeGrowthGlobal1X128 - info.feeGrowthOutside1X128;
}
```

Still in the `Tick.sol` contract, let's take a look at the function that calculates the fee growth inside. Scrolling up we can find a function called `getFeeGrowthInside`. The math equation to calculate the `feeGrowthInside` is implemented here in the code.
```javascript
function getFeeGrowthInside()
```
The first part of the code calculates the fee growth below. If the current tick is greater than or equal to the lower tick then the fee growth below is set to be the fee growth outside associated with the lower tick.
```javascript
if(tickCurrent >= tickLower){
  feeGrowthBelow0X128 = lower.feeGrowthOutside0X128;
  feeGrowthBelow1X128 = lower.feeGrowthOutside1X128;
}
```
Otherwise it is equal to the current fee growth minus the fee growth outside. 
```javascript
else{
  feeGrowthBelow0X128 = feeGrowthGlobal0X128 - lower.feeGrowthOutside0X128;
  feeGrowthBelow1X128 = feeGrowthGlobal1X128 - lower.feeGrowthOutside1X128;
}
```
Similarly the fee growth above is calculated as follows: If the current tick is less than the upper tick, then the fee growth above is equal to the fee growth outside associated with the upper tick. 
```javascript
if(tickCurrent < tickUpper){
 feeGrowthAbove0X128 = upper.feeGrowthOutside0X128;
 feeGrowthAbove1X128 = upper.feeGrowthOutside1X128;
 }
```
Otherwise it is equal to the current fee growth minus the fee growth outside.
```javascript
else{
 feeGrowthAbove0X128 = feeGrowthGlobal0X128 - upper.feeGrowthOutside0X128;
 feeGrowthAbove1X128 = feeGrowthGlobal1X128 - upper.feeGrowthOutside1X128;
}
```
Once the fee growth above and fee growth below are calculated, to calculate the fee growth inside, we take the current fee growth and minus the fee growth below and the fee growth above.
```javascript
feeGrowthInside0X128 = feeGrowthGlobal0X128 - feeGrowthBelow0X128 - feeGrowthAbove0X128;
feeGrowthInside1X128 = feeGrowthGlobal1X128 - feeGrowthBelow1X128 - feeGrowthAbove1X128;
```
This is how fee growth inside is calculated.

To see how the fee that can be collected for a liquidity position is calculated, we need to look at another contract. This contract is called `Position.sol` and it is located in the libraries folder. The function we need to look at is called `update`. 

Inside here, we can see how the fee is calculated. For example, for token 0, we take the current fee growth inside, then minus it with the previous fee growth inside associated with this liquidity position and then multiply by the liquidity to calculate the amount of token 0 that is owed as fee.
```javascript
FullMath.mulDiv(
 feeGrowthInside0X128 - _self.feeGrowthInside0X128,
_self.liquidity,
 FixedPoint128.Q128
 )
```
The same goes for token 1. That is how a fee is calculated for each liquidity position in Uniswap V3.
