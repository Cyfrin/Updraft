This is the second exercise in Uniswap V2 arbitrage. In this exercise, we'll implement a smart contract that will execute an arbitrage between two Uniswap V2 contracts. This time to execute an arbitrage, this contract will first do a flash swap and then swap with another pair contract. In this exercise, we'll need to directly call the pair contract instead of calling the router contract. So, this will be a good exercise in working with the pair contract at a low level.

We will implement two functions in this exercise:

* `flashSwap`: This function will initiate a flash swap.
* `uniswapV2Call`: This function will be the callback of the flash swap and we'll implement our arbitrage logic inside this function.

To help us write these functions, we'll also be using a helper function: `getAmountOut` which will calculate the amount of token out given the amount in, reserve in, and reserve out.  This function is already provided for us and is based on Uniswap's V2 library.  We'll also be using a struct called `FlashSwapData` which we defined to organize the parameters of our flash swap.

We'll start by implementing the `flashSwap` function.  The parameters that we'll be passing in to this function are:

* `pair0`: The address of the Uniswap V2 pair contract that we want to execute a flash swap on.
* `isZeroForOne`: A boolean value which will be true if during the flash swap, tokenZero is the token that goes in and tokenOne is the token that goes out. If we are borrowing tokenOne and repaying tokenZero, then `isZeroForOne` will be true, otherwise it will be false. 
* `amountIn`: The amount of tokens that we need to repay the flash swap.
* `minProfit`: The minimum profit that this arbitrage must make. If the profit is less than this value, the arbitrage should fail.

```javascript
function flashSwap(
    address pair0,
    bool isZeroForOne,
    uint256 amountIn,
    uint256 minProfit
) external {
    // Write your code here
    // Don't change any other code
    // Hint - use getAmountOut to calculate amountOut to borrow
}
```

We'll also need to implement the `uniswapV2Call` function. The parameters that this function will be passing in are:

* `sender`: The address of the caller of the `flashSwap` function.
* `amount0Out`: The amount of tokenZero that we received from the flash swap.
* `amount1Out`: The amount of tokenOne that we received from the flash swap.
* `data`: The data that was passed to the flash swap, this data will be useful to execute our arbitrage logic.

```javascript
function uniswapV2Call(
    address sender,
    uint256 amount0Out,
    uint256 amount1Out,
    bytes calldata data
) external {
    // Write your code here
    // Don't change any other code
}
```

Inside the `flashSwap` function, the value of `msg.sender` will be the same as the address of the caller. This address will be saved in a variable `caller`. Also inside this function we'll define the value `pair0` which will be the Uniswap V2 pair contract that we are using to execute our flash swap. And finally, we will define a variable `pair1` which will be the Uniswap V2 pair contract that we'll use to execute our regular swap.

```javascript
struct FlashSwapData {
    address caller; // Caller of flashSwap (msg.sender inside flashSwap)
    address pair0; // Pair to flash swap from
    address pair1; // Pair to swap from
    bool isZeroForOne; // True if flash swap is token0 in and token1 out
    uint256 amountIn; // Amount to repay flash swap
    uint256 amountOut; // Amount to borrow from flash swap
    uint256 revertProfit; // Revert if profit is less than this minimum
    uint256 minProfit;
}
```

The `getAmountOut` function is already provided for us. It takes in the amountIn, reserveIn, and reserveOut as parameters and returns the calculated amountOut.  We can use this function to calculate the amountOut to borrow from our flash swap.  

```javascript
function getAmountOut(
    uint256 amountIn,
    uint256 reserveIn,
    uint256 reserveOut
) internal pure returns (uint256 amountOut) {
    uint256 amountWithFee = amountIn * 997;
    uint256 numerator = amountWithFee * reserveOut;
    uint256 denominator = reserveIn * 1000 + amountWithFee;
    amountOut = numerator / denominator;
}
```

We will be implementing our arbitrage logic inside the `uniswapV2Call` function.  We will need to take advantage of the data that was passed in to this function. We can use this data to determine the amount of tokens that were borrowed, the amount of tokens that were repaid, and the profit we made.  We will then compare this profit to our `minProfit` value. If the profit is greater than or equal to the minimum profit, we will execute our regular swap using the `pair1` Uniswap V2 pair contract. Otherwise, we will revert the transaction.