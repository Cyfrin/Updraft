## How Liquidity is Updated Using the Liquidity Net

In this lesson, we'll explore how the current liquidity is updated using the liquidity net. 

First, we establish that the vertical dotted line in black represents the initial tick before a price change, which we will call tick zero. A purple dotted line is then used to represent the location of the tick after a price change. The difference between the initial tick and the tick after the price change is referred to as "tick delta".

If the price increases, the ticks increase, and “tick delta” will be a positive number. In contrast, if the price decreases from the initial tick, “tick delta” is a negative number. 

When there are multiple positions, we can determine the liquidity at each tick by stacking all the overlapping liquidity positions. The resulting graph shows positions to the left of the current tick, which are all in token Y and colored blue, and positions to the right of the current tick which are all in token X and colored red.

The liquidity at each price is highlighted with a pink line and also displays a label. As the tick moves, the current liquidity will also change.

To understand the liquidity net, remember that each time we create a position to the tick lower, we will associate a positive number. For instance, if a position has a liquidity of four, we associate +4 to the lower tick. Note, there can be overlapping positions.

For each upper tick, we associate a negative number of the same magnitude. So a position with a liquidity of 4, would get a -4 on the upper tick.

To calculate the liquidity net, add all the pluses and minuses at each tick. For a simple case where there is a single position, the liquidity net will be +4. When positions overlap, such as one with 10 liquidity and another with three liquidity, we add them up, for a liquidity net of +13.

The same approach is used for the upper ticks, and if we have a single position with a liquidity of 4, the liquidity net at the upper tick will be -4.

In a more complex example, the lower tick can have a +13, and at the same liquidity height, when the liquidity deactivates, we have a -10. The net liquidity at the tick is -10. This is because the only purple number on the upper tick is -10

Let's look at how the current liquidity will change with this in mind. We'll start with a single position. We'll move the initial price and current price to the same position. The active liquidity here is 4, which matches the position's liquidity.

As the price increases, and crosses the tick, the liquidity updates to zero. This is calculated by taking the liquidity net, which is -4, and adding the direction of the price, which is +1. The liquidity at this point becomes 0.

If the price decreases, making the direction -1, that gets multiplied by the +4 and added to the current liquidity to get zero.

We'll go over another example with multiple positions, and we'll set the initial price to the tick, and also match the current price to the initial tick.

We can start with the simple case where the price decreases and crosses the current tick. The direction of the price is then -1.  As this tick is crossed the current liquidity updates to 13. We'll use this 13 as the new active liquidity. Using this data the new active liquidity is calculated as 13 + (-1)*(-10) which equals 0.

When the price increases and crosses a tick the current liquidity is equal to 13 and when the price decreases the current liquidity will update to 0. 

When the price increases, the direction of the price is positive, which we multiply by the liquidity net (-10) and then add to current liquidity 13 which is 13 + 1 * (-10) which equals 3.

Then, when the tick crosses another tick with -3, the new liquidity updates to zero.

So to reiterate, the liquidity nets which are stored at the ticks keep track of the current liquidity. Each time the current tick crosses a tick, it will add or subtract some liquidity net to update the current liquidity.
