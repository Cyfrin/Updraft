### Exercise 4 Solution: Remove All Liquidity

In this lesson, we will learn to remove all liquidity, including fees, from a position by calling the `collect()` function.  We will accomplish this by decreasing all liquidity for the position with a given `tokenId` and then transferring the tokens from the Nonfungible Position Manager to this contract by calling `collect()`. We will be using a function that we have previously written:

```javascript
function test_decreaseLiquidity() public {
  uint256 tokenId = mint();
  Position memory p0 = getPosition(tokenId);
  
  // Write your code here
  (uint256 amount0, uint256 amount1) = manager.decreaseLiquidity(
    INonfungiblePositionManager.DecreaseLiquidityParams({
      tokenId: tokenId,
      liquidity: p0.liquidity,
      amount0Min: 0,
      amount1Min: 0,
      deadline: block.timestamp
    })
  );
    
  console2.log("Amount 0 decreased %e", amount0);
  console2.log("Amount 1 decreased %e", amount1);
    
  Position memory p1 = getPosition(tokenId);
    
  assertEq(p1.liquidity, 0);
  assertGt(p1.tokensOwed0, 0);
  assertGt(p1.tokensOwed1, 0);
  
}
```

So let's start by copying that function into our current exercise.

```javascript
function test_collect() public {
    uint256 tokenId = mint();
    Position memory p0 = getPosition(tokenId);

    // Write your code here
    (uint256 amount0, uint256 amount1) = (0, 0);
    
    console2.log("--- collect ---");
    console2.log("Amount 0 collected %e", amount0);
    console2.log("Amount 1 collected %e", amount1);
    
    Position memory p1 = getPosition(tokenId);
    
    assertEq(p1.liquidity, 0);
    assertEq(p1.tokensOwed0, 0);
    assertEq(p1.tokensOwed1, 0);
  }
```

First, we need to call `decreaseLiquidity()`.  We'll copy over the code that calls it from the previous exercise.

```javascript
    (uint256 amount0, uint256 amount1) = manager.decreaseLiquidity(
        INonfungiblePositionManager.DecreaseLiquidityParams({
            tokenId: tokenId,
            liquidity: p0.liquidity,
            amount0Min: 0,
            amount1Min: 0,
            deadline: block.timestamp
        })
    );
```

We do not need the output from this, so we can remove it from the variable declaration.

```javascript
    manager.decreaseLiquidity(
        INonfungiblePositionManager.DecreaseLiquidityParams({
            tokenId: tokenId,
            liquidity: p0.liquidity,
            amount0Min: 0,
            amount1Min: 0,
            deadline: block.timestamp
        })
    );
```

Next, we must call the `collect()` function, but first, we have to determine what parameters to pass in, so we will open `INonfungiblePositionManager.sol` and look for the `collect` function parameters.  Here we can see that we need to pass in a `CollectParams` struct, so we will copy the struct into our current exercise.

```javascript
        INonfungiblePositionManager.CollectParams({
          uint256 tokenId;
          address recipient;
          uint128 amount0Max;
          uint128 amount1Max;
        })
```

Before we can use this struct, we must declare the struct using the interface name:

```javascript
    (uint256 amount0, uint256 amount1) = manager.collect(
    INonfungiblePositionManager.CollectParams({
      tokenId: tokenId,
      address recipient;
      uint128 amount0Max;
      uint128 amount1Max;
    })
  );
```

Now, let's populate the parameters.  The `tokenId` will be the `tokenId` from the function. The `recipient` will be `address(this)`, which is the current contract.  The maximum amount will be `type(uint128).max`.

```javascript
    (uint256 amount0, uint256 amount1) = manager.collect(
    INonfungiblePositionManager.CollectParams({
      tokenId: tokenId,
      recipient: address(this),
      amount0Max: type(uint128).max,
      amount1Max: type(uint128).max
    })
  );
```

This completes the exercise for removing liquidity and collecting the tokens.  Let's try running our test.

```bash
forge test --fork-url $FORK_URL --match-path test/uniswap-v3/exercises/UniswapV3Liquidity.test.sol --match-test test_collect -vvv
```

The test passed!
