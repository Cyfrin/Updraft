## Flash Swap Fee

We'll learn about flash swap fees, how they're derived, and how they work within the Uniswap V2 protocol.

### Flash Swap Fee Equation

Uniswap V2 supports flash swaps, which allow smart contracts to borrow tokens, execute a trade, and then repay the borrowed tokens all in the same transaction. Uniswap V2 requires a minimum fee to be paid for flash swaps, and this fee is a function of the amount of tokens borrowed.

The equation used to calculate the minimum fee for a flash swap is as follows:

```javascript
x0 - dx0 + 0.997 dx1 >= x0
```

Where:

* **x0** is the amount of token X in the pair contract before the flash swap
* **dx0** is the amount of token X borrowed
* **dx1** is the amount of token X repaid

### Deriving the Flash Swap Fee Equation

We'll use an analogy to understand how this equation is derived. Let's say we are swapping some amount of token X for token Y.  If we put in dx tokens, then we will receive back dy tokens, and the fee taken from the trade will be 0.003 dx:

**Swap dx for dy**
* amount in = dx
* amount in - fee = 0.997 dx
* amount out = dy

Now, let's consider a flash swap where we borrow dx0 tokens, execute a trade, and repay dx1 tokens. We can think of this flash swap as being like the regular swap scenario above, but with some key differences:

**Flash Swap**
* amount out = borrow dx0
* amount in = repay dx1 = dx0 + fee 
* amount in - fee = 0.997 dx1

The difference in a flash swap is that the amount of token X that we repay, dx1, is not the same as the amount that we initially borrowed, dx0. Instead, dx1 is equal to dx0 plus the fee.

### Solving for Fee

We will now solve for the fee using the two equations we have:

```javascript
x0 - dx0 + 0.997 dx1 >= x0
dx1 = dx0 + fee
```

Let's rewrite the first equation, then cancel out the x0:

```javascript
x0 - dx0 + 0.997 dx1 >= x0
- dx0 + 0.997 dx1 >= 0
```

Now, let's replace dx1 in the equation above using the second equation:

```javascript
0.997 dx1 >= dx0
0.997 (dx0 + fee) >= dx0
```

Next, let's rearrange this equation and solve for fee:

```javascript
0.997 dx0 + 0.997 fee >= dx0
0.997 fee >= dx0 - 0.997 dx0
0.997 fee >= (1 - 0.997) dx0
0.997 fee >= 0.003 dx0
fee >= 0.003/0.997 dx0
```

This equation is the same as the one we started with at the beginning of the lesson, but we have now derived it using our analogy!


### Conclusion

The flash swap fee ensures that the amount of token X in the pair contract is not depleted below the level it was before the flash swap.  This helps to prevent attacks where a malicious actor could borrow a large amount of tokens and then drain the liquidity of the pool. 
