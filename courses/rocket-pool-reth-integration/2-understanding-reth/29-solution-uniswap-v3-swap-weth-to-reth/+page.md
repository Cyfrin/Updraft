## Uniswap V3: Swap WETH to rETH

Let's review the solution for swapping WETH into rETH using Uniswap V3. In this case, it's a fairly simple process since we're going to call an internal function that will handle the Uniswap V3 swap. All we have to do is pass in the correct parameters into the internal function.

The parameters to pass are: tokenIn, tokenOut, fee, amountIn, amountOutMin, and the receiver.

In this function, we'll call that internal function, swap. Before that though, we first need to pull the WETH into this contract from the message sender, and then approve the Uniswap V3 router, to pull the WETH from this contract.

First, let’s pull the WETH from message sender:

```solidity
weth.transferFrom(msg.sender, address(this), wethAmountIn);
```

Next, we'll approve the Uniswap V3 router to pull the WETH from this contract over to the router:

```solidity
weth.approve(address(router), wethAmountIn);
```

Then, call the internal function swap, and pass the required parameters. The first input is tokenIn. TokenIn is WETH. TokenOut is rETH. The fee that identifies the pool is declared and imported from the constants:

```solidity
UNISWAP_V3_POOL_FEE_RETH_WETH
```

Next is amountIn.

```solidity
wethAmountIn
```

Next is minAmountOut:

```solidity
rEthAmountOutMin
```

The last parameter is the receiver of rETH:

```solidity
address(this)
```

The full swap function should look like:

```solidity
swap(WETH, RETH, UNISWAP_V3_POOL_FEE_RETH_WETH, wethAmountIn, rEthAmountOutMin, address(this));
```

To execute the test, we'll use the following command:

```bash
forge test --fork-url $FORK_URL --match-path test/exercise-swap-uniswap-v3.sol --match-test test_swapWethToReth -vvv
```

The test passes, and for swapping one WETH to rETH, we get back approximately 0.891 rETH.
