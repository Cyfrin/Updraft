In this lesson, we will learn how to remove liquidity from a Uniswap V2 pool. 

We will utilize the `removeLiquidity()` function within the `UniswapV2Router02` contract to achieve this. 

We will walk through an example in which we will:

* Remove liquidity from a DAI/WETH pool
* Console log the output amounts of DAI and WETH we receive

Let's first take a look at the `removeLiquidity()` function's inputs and outputs:

```javascript
function removeLiquidity(
    address tokenA,
    address tokenB,
    uint liquidity,
    uint amountAMin,
    uint amountBMin,
    address to,
    uint deadline
) public virtual override ensure(deadline) returns (uint amountA, uint amountB)
```

Here are the inputs:

* `tokenA` : The address of the first token in the pool.
* `tokenB` : The address of the second token in the pool.
* `liquidity` : The amount of liquidity pool shares to burn.
* `amountAMin` : The minimum amount of `tokenA` that we would like to receive for burning our `liquidity`.
* `amountBMin` : The minimum amount of `tokenB` that we would like to receive for burning our `liquidity`.
* `to` : The address that we would like to receive the tokens.
* `deadline` : A Unix timestamp that the transaction must be completed before.

Here are the outputs:

* `amountA` : The amount of `tokenA` that we received.
* `amountB` : The amount of `tokenB` that we received.

Now let's write some code to remove liquidity. We will first need to initialize the `UniswapV2Router02` contract.

```javascript
UniswapV2Router02 private constant router = UniswapV2Router02(UNISWAP_V2_ROUTER_02);
```

The `UniswapV2Router02` contract has already been deployed to a test network in this lesson, so we are able to initialize it within our test file. 

To call the `removeLiquidity()` function, we will use the following code:

```javascript
(uint256 amountA, uint256 amountB) = router.removeLiquidity({
    tokenA: DAI,
    tokenB: WETH,
    liquidity: liquidity,
    amountAMin: 1 * 1e18,
    amountBMin: 1 * 1e18,
    to: user,
    deadline: block.timestamp
});
```

We will console log the amounts of DAI and WETH that we receive from calling this function. 

```javascript
console2.log("DAI: %18e", amountA);
console2.log("WETH: %18e", amountB);
```

Now we will execute the test and see the results. 

```bash
forge test --fork-url $FORK_URL --mp test/uniswap-v2/solutions/UniswapV2Liquidity.test.sol --mt test_removeLiquidity -vvv
```

We have successfully removed liquidity from the DAI/WETH pool and received the expected amounts of DAI and WETH. 
