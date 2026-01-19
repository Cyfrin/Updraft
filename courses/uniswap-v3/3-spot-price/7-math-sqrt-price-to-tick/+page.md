### Conversion to Tick

Another useful math equation to keep in the back of our heads is the conversion between square root price x 96 and tick. The price ‘P’ is defined to be 1.0001 raised to the tick, which can also be written as:
```
P = 1.0001^tick
```
We also saw that given the square root price x 96 we can calculate the price by using this equation:
```
P = (sqrtPriceX96 / Q96)^2
```
Now, we want to explain, given that we know the square root price x 96 how do we calculate the tick? This math is used inside of the smart contract for Uniswap V3 during a swap to calculate the current tick given the square root price x 96.

So to calculate the tick given that we know the square root price x 96, we'll first take the log of both sides. So, we'll copy the equation and paste it here:

Taking the log on both sides of the equation:
```
log(1.0001^tick) = log((sqrtPriceX96 / Q96)^2)
```
On the left side the tick comes out:
```
tick log(1.0001) = log((sqrtPriceX96 / Q96)^2)
```
On the right side the 2 comes out:
```
tick log(1.0001) = 2 log(sqrtPriceX96 / Q96)
```
Next we’ll divide both sides of the equation by log of 1.0001. Dividing the left side by log of 1.0001 results in 1:
```
tick = 2 log(sqrtPriceX96 / Q96) / log(1.0001)
```
And now we have the equation for the tick. You don’t have to remember this equation, but if you need to find the tick and given that you know the square root price x 96 you can use this equation to calculate the tick.
