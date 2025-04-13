# Animation of Fee Growth

In this example we will discuss and show an animation of fee growth on token X. When a swap happens from token X to token Y the fee growth increases, however, when there's a swap from token Y to token X, fee growth will stay the same.

Let's say we have a Uniswap V3 pool where liquidity is spread out like so.
```javascript
L0 = [10, 15, 20, 20, 10, 5]
L1 = [2, 5, 10, 15, 20, 10]
```
Keep in mind that over time the shape of the liquidity may change. Here is an example of the liquidity changing over time. Over time, there will be swaps, swapping from token X to token Y and token Y to token X. This will swing the current tick from left to right and from right to left.

So far we have seen the liquidity change and the current tick move from left to right and right to left over time. Let's put this all together to see an animation of fee growth. 

Again, over time, liquidity will change, and also over time, there will be multiple swaps swinging the current tick from left to right and right to left. Let's map fee growth. As the current tick swaps from left to right, fee growth increases. Since this is an example of fee growth on token X, the fee growth increases when there is a swap from token X to token Y, and fee growth will remain the same when there is a swap from token Y to token X.
