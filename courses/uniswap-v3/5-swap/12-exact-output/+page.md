# Exact Output

When a user wants a specific amount of token out from a swap, and the swap involves swapping between multiple pools, then they would call a function called `exact output`.

For example, let’s say that a user wants 100 of token D. To get 100 token D, they first need to figure out how much token C they need. To figure out how much token C that they need for the swap, they first need to figure out how much token B that they will need. Again, to figure out how much token B they will need, they first need to calculate the amount of token A that they need to put in.

To execute the swap, where the user puts in token A, and it will be swapped for token B, this token B will be swapped for token C, and finally this token C will be swapped for token D. The order of the swaps will be reversed. We first execute a swap from C to D, and then we execute a swap from B to C, and finally, we execute a swap from A to B.

So first, the user will initiate the swap by calling `exact output`. Again, the swaps will happen in the reversed order that is shown. So the first swap will happen with the pool having token C and D. The Uniswap V3 pool with tokens C and D will first transfer token D to the user. Then, it will call the Uniswap V3 swap callback on the SwapRouter02 contract. At this point token D has left the Uniswap V3 Pool contract, and the SwapRouter02 contract owes token C to this pool. To pay for this token C that the SwapRouter02 owes to this Uniswap V3 pool contract, it will call a swap on the Uniswap V3 pool with tokens B and C. This will transfer the token C over to the Uniswap V3 pool contract.

So, the SwapRouter02 will call the function swap on Uniswap V3 Pool with tokens B and C. Token C will be sent over to the Uniswap V3 pool with tokens C and D. And this completes the swap from token C to token D.

However, for the pool with tokens B and C, token C has left, so the SwapRouter02 now has to pay this pool with token B. After token C is transferred, this pool will call the Uniswap V3 swap callback on the SwapRouter02. Now remember again that currently this SwapRouter02 owes token B to the Uniswap V3 pool with token B and C. To pay this pool with token B, the SwapRouter02 will call a swap on Uniswap V3 Pool with token A and B. This will transfer token B from the Uniswap V3 pool with token A and B to the pool with B and C. And this completes the swap from token B to C in this pool.

But now we still have token A, that we need to pay to this pool. This pool will call the Uniswap V3 swap callback on the SwapRouter02 contract. Inside the callback, token A will be transferred over from the user to the Uniswap V3 pool contract. And this completes the last swap. Putting token A, and transferring token D out.

Next, let’s examine the call trace when the function `exactOutput` is called.
When the function `exactOutput` is called, it will make a recursive call into the internal function `exactOutputInternal`. The path is encoded in the reverse order of the swap. If you wanted to swap from token A to B, and then from B to C, and then from C to D, the path will be encoded as:
```javascript
path = [D, fee, C, fee, B, fee, A]
```
These three parameters specify the pool to swap from token C to D. Then we follow that by fee, and then the address of token B. These three parameters specify the pool to swap from token B to C. And finally the last three parameter: address of token B, fee, and address of token A specify the pool to swap from token A to B.

The function `exactOutput` will call the internal function called `exactOutputInternal`. One of the parameters that is passed into this function is the recipient. For the first call, the recipient is set to the user. This recipient will be the receiver of the token out. Inside this function, it will call the swap function on the pool contract. The pool contract that we first call is the pool for token C and D. Token C will come in and token D will go out. Inside the swap function, it would transfer token D to the recipient. Here, the recipient is the user. So, token D will be transferred over to the user. The amount of token that will be transferred here is the amount that the user specified. And then it will call the Uniswap V3 swap callback on the swap router contract.

Inside the callback, it updates the path parameter. We did a swap from token C to D, so we update it by removing token D. The new path will encode that we’ll need to swap from token B to C, and then from A to B. And then it will call the function `exactOutputInternal` again.

Notice here, that we call the `exactOutputInternal` over here and before this is done executing, inside it we call the function `exactOutputInternal` again. In other words, it's making a recursive call into the function `exactOutputInternal`.

Notice that for the first call to `exactOutputInternal`, the recipient was the user. This user received token D. This time, the recipient is set to the pool with token C and D.

And then we will call the function swap on the pool BC. Token B is coming in, and token C is going out. The recipient, here, this will be pool CD will receive token C.
Inside this function swap, token C will be transferred over to the recipient. And again, this recipient is the pool CD. And then it's going to call the Uniswap V3 swap callback.

Notice that last time the Uniswap V3 swap callback was called, it updated the path and then called the internal function `exactOutputInternal`. And again, the code will execute in a similar manner. At this point the swap from token B to C is completed.
So, we update the path for our final pool from token A to B.
And then we call the internal function `exactOutputInternal` again. This time the recipient will be pool B/C.

`exactOutputInternal` will call the function swap on pool with tokens A and B.
Token A will come in and token B will go out.
The recipient will receive token B. In this case, the recipient is pool B/C.
And this transfer of token A from the user to the pool A/B will terminate this recursive call. And this is an example of what the call trace would look like for `exact output`.
