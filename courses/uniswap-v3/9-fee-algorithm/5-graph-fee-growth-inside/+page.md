**This video is an animated example of fee growth inside**

### Fee Growth Inside

Let's say that we have some liquidity position between two ticks, tick equal to -5 and tick equal to 5. The vertical purple line will represent the current tick.

Now, let's run the animation to see what fee growth inside would look like for this liquidity position.

Okay, so let's say that there was a swap and it swung the current tick over to the left, and at some point, the current tick crossed below the lower tick. The fee growth inside is highlighted in green and the fee growth below is highlighted in red.

When the current tick crossed over the lower tick of the liquidity position, the fee growth inside stopped increasing and the fee growth below started increasing.

Next, let's say that there was another swap that brought the current tick from being below the lower tick and into this liquidity position, into the price ranges of the two ticks. Since this example shows the fee growth of Token X, when Token Y is coming in, the fee growth does not increase. However, since this is a swap from Token Y to Token X, the tick will move from left to right.

Again, let's say there was another swap from Token X to Token Y, and in this case we can see that the fee growth increase. After the swap, the current tick still remains inside this liquidity position. Hence the fee growth inside also increases, and we can see this, that the highlighted green rectangle increased.

Okay and after that, let's say that there was a swap that brought the current tick above the upper tick. Now the current tick is above the upper tick. So as long as the current tick is above the upper tick, the fee growth inside will remain the same, and the fee growth above will increase. And you'll see that this red rectangle, which represents fee growth above, increased.

Now the current tick is inside the liquidity position again, and so you see that the fee growth increased again. On the next swap, the current tick remained inside this liquidity position for part of the swap. You can see here that the fee growth inside increased until here, until the current tick went below the lower tick, and then from there, the fee growth below started to increase.

Next there was another swap from Token Y to Token X. No fee is collected on Token X, so the fee growth remains flat. At this point, the current tick is outside the liquidity position, and on the next swap, the current tick moved inside the liquidity position. So during this swap, part of the fee growth was above the upper tick, and then the remaining fee growth was inside the liquidity position.

I'll play this animation again.

I hope this gave you a better intuition for how to visualize fee growth inside.
