We're continuing to cover removing liquidity in this lesson. We'll use the `remove_liquidity_one_coin` function to remove a single coin from the pool. 

We can see that the function we'll be calling is `remove_liquidity_one_coin`:

```javascript
function remove_liquidity_one_coin(uint256 lp, int128 i, uint256 min_coin) external;
```

We'll navigate to the `Curve/RemoveLiquidity/test.sol` file and use the `pool` variable to access the function. We'll also declare a variable named `LP_Bal`, which will store the balance of the LP token.

```javascript
uint256 LP_Bal = pool.balanceOf(address(this));
```

Now, we'll call the `remove_liquidity_one_coin` function, passing in the LP token balance, the index of the coin to remove, and a minimum amount of the coin we want to receive.

```javascript
pool.remove_liquidity_one_coin(LP_Bal, 0, 1);
```

The index of the coin is 0 because we'll be removing DAI. We'll set the minimum amount to 1 to avoid receiving 0 coins. 

We'll also use `balanceOf` to get the balances of the other two coins in the pool, USDC and USDT.

```javascript
uint256 bal = dai.balanceOf(address(this));
assertGt(bal, 0, "DAI balance = 0");
console2.log("DAI balance =%", bal);

bal = usdc.balanceOf(address(this));
assertEq(bal, 0, "USDC balance > 0");
console2.log("USDC balance =%", bal);

bal = usdt.balanceOf(address(this));
assertEq(bal, 0, "USDT balance > 0");
console2.log("USDT balance =%", bal);
```

We'll execute the test using Foundry, similar to the previous exercise:

```bash
forge test --fork-url $FORK_URL --match-test "test_remove_liquidity_one_coin" -vvv 
```

We see that our test passed and the results are as expected. We successfully removed liquidity for DAI and received back approximately 999,995 DAI as well as 0 USDC and 0 USDT.