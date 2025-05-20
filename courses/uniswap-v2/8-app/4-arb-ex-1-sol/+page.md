In this lesson, we will cover the solution for the first exercise. The first part is to implement the `_swap` function. We will then call this internal function inside the `flashSwap` function. This `_swap` function will first pull tokens from the message center:

```solidity
IERC20(params.tokenIn).transferFrom(
            msg.sender, address(this), params.amountIn
        );
```

Next, we will execute an arbitrage and send the profit back to the message center. This is done by calling another internal function `swap` that we will implement in a later lesson.

```solidity
uint256 amountOut = _swap(params);
IERC20(params.tokenIn).transfer(msg.sender, amountOut);
```

The last part is to check the profit generated from the arbitrage. We will ensure that the profit is greater than or equal to the `minProfit` value, otherwise, the function will revert.

```solidity
if (amountOut - params.amountIn < params.minProfit) {
            revert InsufficientProfit();
        }
```

We will also implement an internal function called `swap` that will execute two swaps: one on `routerZero` and one on `routerOne`. The first swap will send `TokenIn` to `routerZero` and receive `TokenOut`.

```solidity
IERC20(params.tokenIn).approve(address(params.router0), params.amountIn);

address[] memory path = new address[](2);
path[0] = params.tokenIn;
path[1] = params.tokenOut;

uint256[] memory amounts = IUniswapV2Router02(params.router0)
    .swapExactTokensForTokens({
    amountIn: params.amountIn,
    amountOutMin: 0,
    path: path,
    to: address(this),
    deadline: block.timestamp
});
```

The second swap will then send `TokenOut` to `routerOne` and receive `TokenIn`.

```solidity
IERC20(params.tokenOut).approve(address(params.router1), amounts[1]);

path[0] = params.tokenOut;
path[1] = params.tokenIn;

amounts = IUniswapV2Router02(params.router1).swapExactTokensForTokens({
    amountIn: amounts[1],
    amountOutMin: params.amountIn,
    path: path,
    to: address(this),
    deadline: block.timestamp
});
```

Finally, we will return the amount of `TokenIn` received from the second swap.

```solidity
amountOut = amounts[1];
```

Next, we will implement the `flashSwap` function. This function will execute a flash swap on the pair contract. This will involve borrowing tokens from the pair contract and then repaying them after executing an arbitrage. We will use the `swap` function on the pair contract to initiate the flash swap.

```solidity
function flashSwap(address pair, bool isToken0, SwapParams calldata params)
    external
{
    bytes memory data = abi.encode(msg.sender, pair, params);

    IUniswapV2Pair(pair).swap({
        amount0Out: isToken0 ? params.amountIn : 0,
        amount1Out: isToken0 ? 0 : params.amountIn,
        to: address(this),
        data: data
    });
}
```

We will then decode the data that was passed to the `swap` function. This data contains the address of the caller, the address of the pair, and the `SwapParams` struct.

```solidity
(address caller, address pair, SwapParams memory params) =
            abi.decode(data, (address, address, SwapParams));
```

We will then call the internal `_swap` function to execute the arbitrage and generate a profit. The profit will be calculated based on the amount of tokens received from the swaps. We will then repay the borrowed tokens and transfer the profit back to the caller.

```solidity
uint256 amountOut = _swap(params);

uint256 fee = ((params.amountIn * 3) / 997) + 1;
uint256 amountToRepay = params.amountIn + fee;

uint256 profit = amountOut - amountToRepay;
if (profit < params.minProfit) {
    revert InsufficientProfit();
}
IERC20(params.tokenIn).transfer(address(pair), amountToRepay);
IERC20(params.tokenIn).transfer(caller, profit);
```

This concludes the implementation of the `flashSwap` function. We will now test the contract by executing an arbitrage between Uniswap V2 and SushiSwap. We will set the environment variable for the forked chain and then run the tests. The tests should pass if the arbitrage is executed successfully and the profit is calculated correctly. We will then check the profit generated from the arbitrage.

```bash
forge test --fork-url FORK-URL match-path test/uniswap-v2/exercises/uniswapv2Arb1.test.sol -vvv
```

This will execute the tests and display the results. We will also check the amount of profit generated from the arbitrage in the terminal.

We will then implement an authorization mechanism to ensure that the `uniswapV2Call` function can only be called by the pair contract. This will enhance the security of the smart contract.

```solidity
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
