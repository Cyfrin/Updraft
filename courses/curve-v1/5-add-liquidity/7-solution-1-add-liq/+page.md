In this lesson, we'll learn how to add liquidity to the Curve V1 pool.

We'll need to call the addLiquidity function. To call this function, we'll navigate to the IStableSwap3Pool interface and copy the addLiquidity function. 

We'll then paste the function into our code.

```javascript
add_liquidity(uint256[3] calldata coins, uint256 min_lp);
```

We'll need to pass in parameters for the function. We'll start by creating a uint256 array of size three with the balances of the coins to add liquidity.

We'll call this array coins and set the first element to 1 million DAI. The other two elements will be zero, since we're only adding DAI. 

```javascript
uint256[3] memory coins = [uint256(1e6 * 1e18), uint256(0), uint256(0)]; 
```

We'll also need to prepare a minimum LP (min_lp) parameter. This is the minimum amount of LP tokens we want to receive in return for the liquidity we provide. For simplicity, we'll set this value to one. 

```javascript
pool.add_liquidity(coins, 1);
```

Now we can call our function to add liquidity to the Curve V1 pool. 

In the terminal, we'll run the command:

```bash
forge test --fork-url $FORK_URL --match-path test/curve-v1/exercises/CurveV1AddLiquidity.test.sol --vvv
```

This will run our test and show us any console logs that are printed. 
