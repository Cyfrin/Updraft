### Using `exactInput` to Swap Through Multiple Pools

Let's say we have a Uniswap V3 pool with tokens A and B, another with tokens B and C, and another with tokens C and D.

If we wanted to swap token A for D, we'd need to swap A for B, B for C, and then C for D. To execute a swap that involves multiple pools, we can call a function called `exactInput` on the `SwapRouter02` contract.

So let's say we want to swap token A for B, B for C, and then finally from C to D.

First, a user will call the function `exactInput` on the `SwapRouter02` contract.

The `SwapRouter02` contract will run a loop to execute swaps on multiple pools. For each pool, it will call the function `swap`, receive some tokens, and then send some tokens out.

In our example, it will first call the swap on the Uniswap V3 pool having the tokens A and B. Uniswap V3 pool contract will send token B to the `SwapRouter02` contract.

This token B that is sent to this router contract will be used in the next swap to send the token B over to the Uniswap V3 pool with tokens B and C. After the token is sent over to the `SwapRouter02` contract it will call the callback function, Uniswap V3 swap callback.

Inside the callback, the `SwapRouter02` contract will send token A from the user over to the first pool, the pool with token A and B. And that completes the first swap of putting token A in and receiving token B.

We still have two more swaps to execute. The `SwapRouter02` contract will call the function swap on the next pool having tokens B and C. This second pool will send token C over to the `SwapRouter02` contract. Then again, it will call the callback function, Uniswap V3 swap callback.

Remember the token that was sent over to the `SwapRouter02` contract in step 3, now this token B is transferred over to the pool with token B and C. This completes the second swap of swapping token B for token C.

Then we have one more swap to get to token D. So at the moment, the `SwapRouter02` contract has token C. It calls the function swap on Uniswap V3 pool with tokens C and D. And again, the Uniswap V3 pool contract will send the token out before receiving any token in.

Since this is the last swap, instead of sending the token over to the `SwapRouter02` contract, the Uniswap V3 pool contract will send the token directly over to the user. Then it will call the callback, Uniswap V3 swap callback. Inside the callback, token C is sent from `SwapRouter02` over to the last pool, Uniswap V3 pool with token C and D. This is an example of how tokens are swapped between multiple pools when the function `exactInput` is called on `SwapRouter02`.

Next, we are going to explain what functions are called and what parameters are passed when the `exactInput` function is executed.

When the function `exactInput` is called, we need to pass in the path. For our example, we are swapping from token A, B, C, and then D. So the path will be encoded as:
```javascript
path=[A, fee, B, fee, C, fee, D]
```
followed by the fee that will identify the pool with tokens A and B, followed by token B, then the fee for the pool that has B and C, and token C followed by the fee and lastly token D. 

The payer will be transferring the token in, which will be the user. Next, it will execute a while loop to call swaps on the individual pools.

Starting with pool AB, inside this while loop, it is going to call the internal function called `exactInputInternal`:
```javascript
exactInputInternal(recipient=router)
```
Here, the recipient, the address that is going to be receiving the token out, is set to the router contract. This is because once it receives the intermediate token, it's going to send it over to the next pool. The function swap is called on pool AB.
```javascript
swap(A/B)
```
Token B is transferred over to the recipient. Here, the recipient will be the router contract. This token B that is received by the router contract will be used in the next iteration, to send token B over to the next pool, BC.

Once the token is sent, next, it's going to call `uniswapV3SwapCallback`.
```javascript
uniswapV3SwapCallback
```
This function is inside the router contract. Inside the router contract, it will transfer token A from the payer, and in this case the payer is the user, to pool AB. And to prepare for the next loop, the code will set the payer to the router contract.
```javascript
payer=router
```
And the parameter path is set to token B, C, and D.
```javascript
path=[B, fee, C, fee, D]
```
Here token A is removed from the path, since we are done with that swap. And the first three parameters token B, fee, and token C, will identify the pool to swap on. 

Then we move on to the next iteration of the while loop. Call the internal function `exactInputInternal` again,
```javascript
exactInputInternal(recipient=router)
```
And again, the recipient, the address that will receive token C is set to the router contract.
```javascript
swap(B/C)
```
The function swap is called on pool BC. Token in is token B and token out is token C. The Uniswap V3 pool contract will transfer token C to recipient. Since the recipient is the router contract, this token C is sent over to the router contract. 
Then afterwards, it's going to call `uniswapV3SwapCallback` on the router contract.
```javascript
uniswapV3SwapCallback
```
Inside the callback, the router will transfer token B from the payer, which is the router, to pool BC.
```javascript
transfer B from payer to pool B/C
```
Remember back in this step, token B was transferred over to the router contract, so at this step we still have token B in the router contract. And this is why the router contract can transfer token B over to pool BC. To prepare for the next iteration of the for loop, the payer is set to the router contract:
```javascript
payer=router
```
The path is updated to token C, fee, and D
```javascript
path=[C, fee, D]
```
And from the previous parameter we remove token B and fee. And these last three parameters, token C, fee, and token D, will identify the last pool to execute the swap on.
And for the last iteration, it will call the function `exactInputInternal`:
```javascript
exactInputInternal(recipient=user)
```
Notice that in the previous two iterations, recipient was set to the router contract. But in the last iteration the recipient is set to the user. Here, it means that token D will be sent to the user.
```javascript
swap(C/D)
```
The function swap is called on pool CD. The Uniswap V3 pool contract will transfer token D to recipient, and recipient is set to the user. So token D will be sent over to the user. And the `uniswapV3SwapCallback` is executed on the router contract.
```javascript
uniswapV3SwapCallback
```
The router contract will transfer token C from payer, the router, to pool CD. And that completes the call trace when the function `exactInput` is called.
