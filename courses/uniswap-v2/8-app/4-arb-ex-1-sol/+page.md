In this lesson, we will cover the solution for the first exercise. The first part is to implement the `_swap` function. We will then call this internal function inside the `flashSwap` function. This `_swap` function will first pull tokens from the message center:

```javascript
IERC20.tokenIn.transferFrom(msg.sender, address(this), params.amountIn);
```

Next, we will execute an arbitrage and send the profit back to the message center. This is done by calling another internal function `swap` that we will implement in a later lesson.

```javascript
uint amountOut = swap(params);
IERC20.tokenIn.transfer(msg.sender, amountOut);
```

The last part is to check the profit generated from the arbitrage. We will ensure that the profit is greater than or equal to the `minProfit` value, otherwise, the function will revert.

```javascript
require(profit >= params.minProfit, "profit < min");
```

We will also implement an internal function called `swap` that will execute two swaps: one on `routerZero` and one on `routerOne`. The first swap will send `TokenIn` to `routerZero` and receive `TokenOut`.

```javascript
IERC20.tokenIn.approve(params.router0, params.amountIn);
uint256[] memory amounts = IUniswapV2Router02(params.router0).swapExactTokensForTokens(
    params.amountIn,
    0,
    path,
    address(this),
    block.timestamp
);
```

The second swap will then send `TokenOut` to `routerOne` and receive `TokenIn`.

```javascript
IERC20.tokenOut.approve(params.router1, amounts[1]);
amounts = IUniswapV2Router02(params.router1).swapExactTokensForTokens(
    amounts[1],
    0,
    path,
    address(this),
    block.timestamp
);
```

Finally, we will return the amount of `TokenIn` received from the second swap.

```javascript
amountOut = amounts[1];
```

Next, we will implement the `flashSwap` function. This function will execute a flash swap on the pair contract. This will involve borrowing tokens from the pair contract and then repaying them after executing an arbitrage. We will use the `swap` function on the pair contract to initiate the flash swap.

```javascript
function flashSwap(address pair, bool isToken0, SwapParams calldata params) external {
    bytes memory data = abi.encode(msg.sender, pair, params);
    IUniswapV2Pair(pair).swap(
        isToken0 ? 0 : params.amountIn,
        isToken0 ? params.amountIn : 0,
        address(this),
        data
    );
}
```

We will then decode the data that was passed to the `swap` function. This data contains the address of the caller, the address of the pair, and the `SwapParams` struct.

```javascript
(address caller, address pair, SwapParams memory params) = abi.decode(data, (address, address, SwapParams));
```

We will then call the internal `_swap` function to execute the arbitrage and generate a profit. The profit will be calculated based on the amount of tokens received from the swaps. We will then repay the borrowed tokens and transfer the profit back to the caller.

```javascript
uint256 amountOut = swap(params);
uint256 fee = ((params.amountIn * 3) / 997) + 1;
uint256 amountToRepay = params.amountIn + fee;
uint256 profit = amountOut - amountToRepay;
require(profit >= params.minProfit, "profit < min");
IERC20(params.tokenIn).transfer(address(pair), amountToRepay);
IERC20(params.tokenIn).transfer(caller, profit);
```

This concludes the implementation of the `flashSwap` function. We will now test the contract by executing an arbitrage between Uniswap V2 and SushiSwap. We will set the environment variable for the forked chain and then run the tests. The tests should pass if the arbitrage is executed successfully and the profit is calculated correctly. We will then check the profit generated from the arbitrage.

```bash
forge test --fork-url FORK-URL match-path test/uniswap-v2/exercises/uniswapv2Arb1.test.sol -vv
```

This will execute the tests and display the results. We will also check the amount of profit generated from the arbitrage in the terminal.

We will then implement an authorization mechanism to ensure that the `uniswapV2Call` function can only be called by the pair contract. This will enhance the security of the smart contract.

```javascript
function uniswapV2Call(
    address sender,
    uint256 amount0Out,
    uint256 amount1Out,
    bytes calldata data
) external {
    // Write your code here
    // Don't change any other code
    (address caller, address pair, SwapParams memory params) = abi.decode(
        data,
        (address, address, SwapParams)
    );
    swap(params);
}
```

The `uniswapV2Call` function can only be called by the pair contract. This will ensure that the contract is not vulnerable to attacks from unauthorized parties.