## Uniswap V3 Liquidity Net

To understand how Uniswap V3 tracks current active liquidity, we must understand what is called the liquidity net. Liquidity net means when the price changes, it will eventually cross over a tick, and when it does, it will either plus or minus some number to the current liquidity. This number is the liquidity net.

Let's start with a simple example. We have a single position with current liquidity equal to L, represented by the height of a rectangle. We have the current tick at `t`, and two ticks `t lower`, and `t upper`, which define the price range for this position. For this example, we have one position with a liquidity of `L` between the price ranges of `t lower` and `t upper`.

When a position is created, at the lower tick, it will assign a positive liquidity net. At the upper tick, it will assign a negative liquidity net. If two positions overlap, or intersect at these boundaries (`t lower` and `t upper`), the liquidity net is calculated by summing up all the individual liquidity nets.

We also need to understand the direction of the price. If the price increases, it is associated with a positive number, `+1`. If the price decreases, it is associated with a negative number `-1`. With these two numbers, the direction of the price change, and these liquidity nets at the boundaries of `t lower` and `t upper`, we can keep track of current liquidity.

Let's say that the current tick associated with the current price, moves to the left. When the current tick crosses over `t lower`, we need to update the active liquidity. Let's call this next liquidity. Next liquidity will equal to current liquidity `L`. To this, we add a number which is a multiplication of two numbers: The direction of `P`, and we multiply this by `plus` or `minus` the liquidity net.

For example, in this case, let's start with the price direction. The price decreased from the right to the left, so the direction of the price will be `-1`. Then we need to multiply this by `plus` or `minus` delta L (the liquidity net).

In this case, at the lower tick, we have `plus` delta L that is stored. So, the direction of P is `-1`. To `-1`, we multiply this number, `-1` times `plus` delta L. And the current liquidity is equal to `L`.
So what do we get?
We would get `L + -1 * L`, which equals zero. Let's look at an example going the other way.

Let's say that the current price is somewhere to the right and the current liquidity is L. Let's say there was a swap and it increased the price, so the tick crossed over to `t upper`. When the tick crossed over `t upper`, we need to apply the algorithm. So current liquidity is L. The direction of the change in price is positive, so we will do `+1`. The liquidity net stored at this `t upper` is a `minus` delta L. In this example, there is only one position, so the liquidity net is equal to the liquidity of the single position which is L. We have a minus.
Single position, so the liquidity net is equal to the liquidity of the position. And we keep the minus over here.

So let's do the math:

This is equal to `L` plus `+1` times `-L`. Or this simplifies to `L - L`, which is equal to zero.

In summary, the way that the current liquidity is updated is when the current tick crosses over either `t lower` or `t upper`. It will apply this algorithm.
The algorithm is to take the current liquidity, multiply by the price direction. If the price increases we multiply by `+1`, and if the price decreases, we multiply by `-1`. We multiply the price direction by the liquidity net which is stored at `t lower` and `t upper`.

```
next liquidity = current liquidity + direction of P * (± ΔL)
```
