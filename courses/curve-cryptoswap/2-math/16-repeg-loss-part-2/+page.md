# Curve v2 Repeg Loss Part 2

There is another way to visualize how a CurveV2 AMM makes a loss when it repegs to a different price scale.

First let us explain what we did in the previous video. We started with the CurveV2 AMM graph shown in orange. The token balance after the swap is shown in green.

In the previous example, we said that token X came in and token Y went out. CurveV2 collects swap fees from token out. Realistically, the token balance will be somewhere over here. If CurveV2 was to re-peg to this price scale, we would first match the price scale by making the green line and the pink line parallel to each other. Further more, the new CurveV2 AMM's graph, shown in pink must go through this green dot which represents the current token balance.

So, we adjusted the D parameter so that this pink curve goes through this green point.

In the previous video, we said that we can compare the pool values of these two different CurveV2 AMM's at different price scales, by looking at the constant product curve. We also saw that after re-pegging, the pool value decreased. We concluded this by comparing the two constant product curves. The constant product curve after re-pegging, shown in pink, has a smaller liquidity then the liquidity of the constant product curve shown in orange.

But, there is another way to visualize that when a re-peg happens, it will make some loss.
To see this, we first remove the constant product curves. Now we have two graphs of the CurveV2 AMMs at different price scales. We can see the different equilibrium points.
Let us say that a re-peg happens and it is shown in pink, and to show that after the re-pegging the pool value has decreased, we will show that there is no way for the green point to come back to the orange point, while still moving along the pink curve. This will show that there is no way to get some of the tokens back and hence, the AMM has made a loss.

Let us say that our token balance is over here. Let's say a swap happens so that token Y will come in and token X will go out. So this green point will move along this pink curve.
If we look at what happens over here, let us imagine that the token X at this point is equal for both the green point, and the orange point. If the token X balance is five over here, then the token X balance over here is also five.

Let's take a look at the token Y balance. Well, here are the exact numbers. So token X for both the pink curve and the orange curve, are equal to 5.

For the pink curve, the token Y balance is 2.12. Compare this with the token Y balance on the orange curve, which is equal to 2.5.
When we compare these two points, we can see that on this pink curve, there is no way for the AMM to get back 2.5 token Y while also having a token X balance equal to 5.
So this is another way to see how CurveV2 AMMs make a loss when they re-peg.

And, the only way for the token Y balance to be equal to 2.5, while the token X balance is equal to 5, the only way is to increase the liquidity D for this pink curve. We can do this by increasing D1. What you will see is that the pink curve will intersect with this orange point, which means that this AMM described by the pink curve, is now possible to have a token balance of five and 2.5.
However, the only way that we can reach this point, is by increasing the liquidity for the pink curve, and the only way to increase the liquidity for the pink curve, is either to collect a lot of swap fees, or have liquidity providers deposit more tokens.
