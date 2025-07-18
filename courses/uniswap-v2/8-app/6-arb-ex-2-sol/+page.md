## Uniswap V2-R2: Flash Swap

In this lesson, we'll write some Solidity code for a Uniswap V2 arbitrage bot using the `flashSwap` function. This function allows us to borrow tokens from a Uniswap V2 pair, execute a trade on another pair, and repay the borrowed tokens all within the same transaction. We'll write code for both the `flashSwap` function and the `uniswapV2Call` function, which is the callback function for the flash swap. 

Let's get started!

First, we'll import the `UniswapV2Pair` interface:

```solidity
import {IUniswapV2Pair} from
    "../../../src/interfaces/uniswap-v2/IUniswapV2Pair.sol";
```

Next, we'll create a `struct` to represent the data that we'll send to the `flashSwap` function:

```solidity
struct FlashSwapData {
    // Caller of flashSwap (msg.sender inside flashSwap)
    address caller;
    // Pair to flash swap from
    address pair;
    // Pair to swap from
    address pair1;
    // True if flash swap is token0 in and token1 out
    bool isZeroForOne;
    // Amount in to repay flash swap
    uint256 amountIn;
    // Amount to borrow from flash swap
    uint256 amountOut;
    // Amount out of profit is less than this minimum
    uint256 minProfit;
}
```

Now, we'll write the `flashSwap` function:

```solidity
// Exercise 1
// - Flash swap to borrow tokenOut
/**
 * @param pair0 Pair contract to flash swap
 * @param pair1 Pair contract to swap
 * @param isZeroForOne True if flash swap is token0 in and token1 out
 * @param amountIn Amount in to repay flash swap
 * @param minProfit Minimum profit that this arbitrage must make
 */
function flashSwap(
    address pair0,
    address pair1,
    bool isZeroForOne,
    uint256 amountIn,
    uint256 minProfit
) external {
    // Write your code here
    // Don’t change any other code
    (uint112 reserve0, uint112 reserve1,) =
        IUniswapV2Pair(pair0).getReserves();

    // Hint - use getAmountOut to calculate amountOut to borrow
    uint256 amountOut = isZeroForOne
        ? getAmountOut(amountIn, reserve0, reserve1)
        : getAmountOut(amountIn, reserve1, reserve0);

    bytes memory data = abi.encode(
        FlashSwapData({
            caller: msg.sender,
            pair0: pair0,
            pair1: pair1,
            isZeroForOne: isZeroForOne,
            amountIn: amountIn,
            amountOut: amountOut,
            minProfit: minProfit
        })
    );

    IUniswapV2Pair(pair0).swap({
        amount0Out: isZeroForOne ? 0 : amountOut,
        amount1Out: isZeroForOne ? amountOut : 0,
        to: address(this),
        data: data
    });
}
```

Finally, we'll write the `uniswapV2Call` function, which will execute the arbitrage and repay the borrowed tokens:

```solidity
function uniswapV2Call(
    address sender,
    uint256 amount0Out,
    uint256 amount1Out,
    bytes calldata data
) external {
    // Write your code here
    // Don’t change any other code

    // NOTE - anyone can call

    FlashSwapData memory params = abi.decode(data, (FlashSwapData));

    // Token in and token out from flash swap
    address token0 = IUniswapV2Pair(params.pair0).token0();
    address token1 = IUniswapV2Pair(params.pair0).token1();
    (address tokenIn, address tokenOut) =
        params.isZeroForOne ? (token0, token1) : (token1, token0);

    (uint112 reserve0, uint112 reserve1,) =
        IUniswapV2Pair(params.pair1).getReserves();

    uint256 amountOut = params.isZeroForOne
        ? getAmountOut(params.amountOut, reserve1, reserve0)
        : getAmountOut(params.amountOut, reserve0, reserve1);

    IERC20(tokenOut).transfer(params.pair1, params.amountOut);

    IUniswapV2Pair(params.pair1).swap({
        amount0Out: params.isZeroForOne ? amountOut : 0,
        amount1Out: params.isZeroForOne ? 0 : amountOut,
        to: address(this),
        data: ""
    });

    // NOTE - no need to calculate flash swap fee
    IERC20(tokenIn).transfer(params.pair0, params.amountIn);

    uint256 profit = amountOut - params.amountIn;
    if (profit < params.minProfit) {
        revert InsufficientProfit();
    }
    IERC20(tokenIn).transfer(params.caller, profit);
}
```

Now, we can execute the tests in our terminal. We'll start by setting up the fork URL, then execute the tests:

```bash
forge test --fork-url $FORK_URL --mp test/uniswap-v2/exercises/UniswapV2Arb2.test.sol -vvv
```

We should see the tests pass. We can copy the profit from the terminal and divide it by 1e18 to see our profit in ETH. 

Let me know if you have any questions. 
