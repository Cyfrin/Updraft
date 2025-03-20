## Solution: Uniswap V3 Swap rEth to wEth

Let's delve into the solution for swapping our rEth back into wEth using Uniswap V3. We'll be using the internal function `swap`, which handles the specifics of interacting with Uniswap V3. Our task is to pass the correct parameters to this internal function. These parameters include `tokenIn`, `tokenOut`, `fee`, `amountIn`, `amountOutMin`, and the `receiver`.

In the process of swapping our rEth back to wEth, we first need to transfer rEth from the message sender into the contract. Then, we approve the Uniswap V3 router to use that rEth from this contract.

```solidity
reth.transferFrom(msg.sender, address(this), rEthAmount);
```

Next, we approve the Uniswap V3 router.

```solidity
reth.approve(address(router), rEthAmount);
```

Following this, we call the internal function `swap`:

```solidity
swap(
);
```

We define `tokenIn` as rEth and `tokenOut` as wEth:

```solidity
swap(
    RETH,
    WETH,
);
```

The pool fee, which identifies the pool, is a constant imported at the top of the file. Let’s copy that, go back down, and paste it.

```solidity
swap(
    RETH,
    WETH,
    UNISWAP_V3_POOL_FEE_RETH_WETH,
);
```

Next, we include the amount in:

```solidity
swap(
    RETH,
    WETH,
    UNISWAP_V3_POOL_FEE_RETH_WETH,
    rEthAmountIn,
);
```

After this, we specify the amount out min:

```solidity
swap(
    RETH,
    WETH,
    UNISWAP_V3_POOL_FEE_RETH_WETH,
    rEthAmountIn,
    wEthAmountOutMin,
);
```

Finally, we define the receiver of wEth:

```solidity
swap(
    RETH,
    WETH,
    UNISWAP_V3_POOL_FEE_RETH_WETH,
    rEthAmountIn,
    wEthAmountOutMin,
    address(this)
);
```

With the code complete, we can now execute the test. The test command is as follows:

```bash
forge test --fork-url $FORK_URL --match-path test/exercise-swap-uniswap-v3.sol --match-test test_swapRethToWeth -vvv
```

In this command, the test file is `exercise-swap-uniswap-v3.sol`, and the function we're calling is `test_swapRethToWeth`.

The execution gives us back approximately 1.120 wEth.
